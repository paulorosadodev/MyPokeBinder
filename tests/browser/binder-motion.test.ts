import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { chromium, type Browser, type Locator, type Page } from "playwright";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import { cards, catalogCards, createAddedCard } from "./fixtures/cards";

let browser: Browser;
let server: ReturnType<typeof Bun.serve>;
let desktopChunkPaths: string[];

beforeAll(async () => {
    const [css, build] = await Promise.all([
        postcss([tailwind()]).process(await Bun.file("src/app/globals.css").text(), { from: "src/app/globals.css" }),
        Bun.build({
            entrypoints: ["tests/browser/fixtures/binder.tsx"],
            target: "browser",
            splitting: true,
            naming: { entry: "app.js", chunk: "chunk-[hash].js" },
            define: {
                "process.env.NODE_ENV": '"development"',
                "process.env.NEXT_PUBLIC_SUPABASE_URL": '"http://localhost:54321"',
                "process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY": '"test"',
            },
            plugins: [
                {
                    name: "navegacao-de-teste",
                    setup(build) {
                        build.onResolve({ filter: /^next\/navigation$/ }, () => ({ path: "navigation", namespace: "teste" }));
                        build.onResolve({ filter: /^next\/link$/ }, () => ({ path: "link", namespace: "teste" }));
                        build.onLoad({ filter: /.*/, namespace: "teste" }, (args) => ({
                            contents: args.path === "link" ? 'import { createElement } from "react"; export default function Link({ href, children, ...props }) { return createElement("a", { href, ...props }, children); }' : 'export const useSearchParams = () => new URLSearchParams(location.search); export const useRouter = () => ({replace(){},push(){}}); export const usePathname = () => "/";',
                            loader: "js",
                        }));
                    },
                },
            ],
        }),
    ]);
    if (!build.success) throw new AggregateError(build.logs);
    const scripts = new Map(await Promise.all(build.outputs.map(async (output) => [new URL(output.path, "file:///").pathname.split("/").at(-1)!, output] as const)));
    desktopChunkPaths = [];
    for (const [name, output] of scripts) {
        if ((await output.text()).includes("node_modules/react-pageflip/")) desktopChunkPaths.push(name);
    }
    server = Bun.serve({
        port: 0,
        async fetch(request) {
            const { pathname } = new URL(request.url);
            const script = scripts.get(pathname.slice(1));
            if (script) return new Response(script);
            if (pathname === "/app.css") return new Response(css.css, { headers: { "Content-Type": "text/css" } });
            if (pathname === "/pokemon-card-back.png") return new Response(Bun.file("public/pokemon-card-back.png"), { headers: { "Content-Type": "image/png" } });
            if (/^\/pokemon\/gen1\/\d+\.png$/.test(pathname)) return new Response(Bun.file(`public${pathname}`));
            if (pathname === "/api/search") {
                const term = (new URL(request.url).searchParams.get("name") ?? "").toLowerCase();
                const results = term.includes("charm") ? [catalogCards[2]] : catalogCards;
                return Response.json({ cards: results, hasMore: false, totalCount: results.length });
            }
            if (pathname === "/api/cards/ownership") {
                const ids = (new URL(request.url).searchParams.get("ids") ?? "").split(",").filter(Boolean);
                const counts = ids.includes("catalogo-3") ? { "catalogo-3_pt-br_normal_NM": 2, "catalogo-3_en_normal_NM": 3 } : {};
                return Response.json({ counts });
            }
            if (pathname === "/api/cards" && request.method === "POST") return Response.json({ card: createAddedCard(await request.json()) });
            if (pathname === "/api/binders") {
                return Response.json({ binders: [{ id: "teste", user_id: "teste", name: "Kanto 151 Original", description: "", grid_type: "3x3", total_pages: 1, cover_theme: "red", cover_pokemon_dex_id: 94, is_public: false, is_featured: false, total_cards: 89, total_slots: 160, created_at: "", updated_at: "" }] });
            }
            if (pathname === "/api/binder/available") return Response.json({ availableCounts: { 3: 2 } });
            if (pathname.startsWith("/api/")) return Response.json({ cards, availableCounts: {} });
            return new Response('<html><head><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="/app.css"></head><body><div id="root"></div><script>window.process={env:{}}</script><script type="module" src="/app.js"></script></body></html>', { headers: { "Content-Type": "text/html" } });
        },
    });
    browser = await chromium.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
}, 60000);

afterAll(async () => {
    await browser?.close();
    await server?.stop(true);
});

async function waitForPage(page: Page, catalogPage: number) {
    await page.waitForFunction((target) => {
        const mobile = document.querySelector(".binder-mobile");
        if (mobile) return mobile.getAttribute("data-page") === String(target) && mobile.getAttribute("data-phase") === "idle" && mobile.getAttribute("aria-busy") === "false";
        const stage = document.querySelector(".binder-book-stage");
        return !stage?.classList.contains("binder-book-stage--busy") && [...document.querySelectorAll(".stf__item.--simple")].some((sheet) => getComputedStyle(sheet).display !== "none" && sheet.textContent?.startsWith(`Página ${target} de`));
    }, catalogPage);
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
}

async function activePages(page: Page) {
    const mobile = page.locator(".binder-mobile");
    if (await mobile.count()) return [await mobile.getAttribute("data-page")];
    return page.locator(".stf__item.--simple").evaluateAll((sheets) =>
        sheets
            .filter((sheet) => getComputedStyle(sheet).display !== "none")
            .map((sheet) => sheet.textContent?.match(/^Página (\d+) de/)?.[1])
            .filter(Boolean),
    );
}

async function waitForOpacity(page: Page, locator: Locator, expected = 0.6, timeout = 3000) {
    const startedAt = Date.now();
    let opacity = Number(await locator.evaluate((element) => getComputedStyle(element).opacity));
    while (opacity !== expected && Date.now() - startedAt < timeout) {
        await page.waitForTimeout(50);
        opacity = Number(await locator.evaluate((element) => getComputedStyle(element).opacity));
    }
    return opacity;
}

async function recordMobileTransition(page: Page) {
    await page.locator(".binder-mobile").evaluate((mobile) => {
        const frames: { phase: string | null; ids: string[]; images: (string | null)[] }[] = [];
        const observer = new MutationObserver(() => {
            const slots = [...mobile.querySelectorAll('[id^="binder-slot-"]')];
            frames.push({ phase: mobile.getAttribute("data-phase"), ids: slots.map((slot) => slot.id), images: slots.map((slot) => slot.querySelector("img")?.getAttribute("src") ?? null) });
            mobile.setAttribute("data-test-frames", JSON.stringify(frames));
            if (mobile.getAttribute("data-phase") === "idle") observer.disconnect();
        });
        observer.observe(mobile, { attributes: true, attributeFilter: ["data-phase"] });
    });
}

async function transitionFrames(page: Page): Promise<{ phase: string; ids: string[]; images: string[] }[]> {
    return JSON.parse((await page.locator(".binder-mobile").getAttribute("data-test-frames")) ?? "[]");
}

type OverlayProbeFrame = { count: number; opacity: number; animations: string[] };

async function recordOverlayPresence(page: Page, durationMs = 900) {
    await page.evaluate((duration) => {
        const frames: OverlayProbeFrame[] = [];
        Object.assign(window, { overlayProbe: frames });
        const sample = () => {
            const backdrops = [...document.querySelectorAll<HTMLElement>(".modal-backdrop")];
            frames.push({
                count: backdrops.length,
                opacity: backdrops.length ? Math.min(...backdrops.map((element) => Number(getComputedStyle(element).opacity))) : 0,
                animations: backdrops.flatMap((element) => [getComputedStyle(element).animationName, ...[...element.querySelectorAll<HTMLElement>(".modal-surface, .drawer-surface")].map((surface) => getComputedStyle(surface).animationName)]),
            });
        };
        sample();
        const timer = window.setInterval(sample, 16);
        window.setTimeout(() => window.clearInterval(timer), duration);
    }, durationMs);
}

async function readOverlayPresence(page: Page): Promise<OverlayProbeFrame[]> {
    return page.evaluate(() => (window as typeof window & { overlayProbe?: OverlayProbeFrame[] }).overlayProbe ?? []);
}

describe("Animação real do binder no navegador", () => {
    it("mantém a capa presente desde o primeiro frame ao entrar e voltar para a Estante", async () => {
        const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
        try {
            await page.addInitScript(() => {
                const mounts: { animatedOnMount: boolean; coverOnMount: boolean; rawEngineHiddenOnMount: boolean }[] = [];
                Object.assign(window, { shelfMounts: mounts });
                const inspect = (node: Node) => {
                    if (!(node instanceof Element)) return;
                    const cards = node.matches('[aria-label^="Abrir Binder"]') ? [node] : [...node.querySelectorAll('[aria-label^="Abrir Binder"]')];
                    for (const card of cards) {
                        mounts.push({
                            animatedOnMount: card.classList.contains("card-list-appear"),
                            coverOnMount: Boolean(card.querySelector("[data-shelf-cover-fallback]")),
                            rawEngineHiddenOnMount: getComputedStyle(card.querySelector(".binder-shelf-engine")!).visibility === "hidden",
                        });
                    }
                };
                const observer = new MutationObserver((records) => {
                    for (const record of records) {
                        for (const node of record.addedNodes) inspect(node);
                    }
                });
                const start = () => observer.observe(document.documentElement, { childList: true, subtree: true });
                if (document.documentElement) start();
                else document.addEventListener("DOMContentLoaded", start, { once: true });
            });

            await page.goto(new URL("?shelfLifecycle", server.url).toString(), { waitUntil: "domcontentloaded" });
            await page.locator('[aria-label="Abrir Binder Kanto 151 Original"]').waitFor({ state: "visible" });
            await page.waitForFunction(() => document.querySelector(".binder-shelf-stage .stf__item"));
            expect(await page.locator("[data-shelf-cover-fallback]").count()).toBe(1);

            await page.locator("#leave-shelf").click();
            await page.locator("#other-page").waitFor({ state: "visible" });
            await page.locator("#return-shelf").click();
            await page.locator('[aria-label="Abrir Binder Kanto 151 Original"]').waitFor({ state: "visible" });
            await page.waitForFunction(() => document.querySelector(".binder-shelf-stage .stf__item"));

            const mounts = await page.evaluate(() => (window as typeof window & { shelfMounts: { animatedOnMount: boolean; coverOnMount: boolean; rawEngineHiddenOnMount: boolean }[] }).shelfMounts);
            expect(mounts).toHaveLength(2);
            expect(mounts).toEqual([
                { animatedOnMount: true, coverOnMount: true, rawEngineHiddenOnMount: true },
                { animatedOnMount: true, coverOnMount: true, rawEngineHiddenOnMount: true },
            ]);
            expect(await page.locator("[data-shelf-cover-fallback]").count()).toBe(1);
        } finally {
            await page.close();
        }
    }, 20000);

    it("revela a prévia da estante com a capa entreaberta sem ampliar o binder nem virar a página inteira", async () => {
        const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
        try {
            await page.goto(new URL("?shelf", server.url).toString(), { waitUntil: "domcontentloaded" });
            const card = page.locator("#shelf-card");
            const stage = card.locator(".binder-shelf-stage");
            await stage.waitFor({ state: "visible" });
            const cover = stage.locator(".binder-shelf-cover");
            await cover.waitFor({ state: "visible" });

            const initialScale = await stage.evaluate((element) => {
                const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
                return Math.hypot(matrix.a, matrix.b);
            });
            expect(initialScale).toBe(1);

            await card.hover();
            await page.waitForTimeout(150);

            const hoveredScale = await stage.evaluate((element) => {
                const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
                return Math.hypot(matrix.a, matrix.b);
            });
            expect(hoveredScale).toBe(1);

            await page.waitForFunction(() => {
                const coverEl = document.querySelector(".binder-shelf-cover");
                if (!coverEl) return false;
                const transform = getComputedStyle(coverEl).transform;
                return transform !== "none" && transform !== "matrix(1, 0, 0, 1, 0, 0)";
            });

            expect(await stage.getByText("Página 1").isVisible()).toBe(true);

            await page.mouse.move(1200, 820);
            await page.waitForTimeout(300);

            const resetScale = await stage.evaluate((element) => {
                const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
                return Math.hypot(matrix.a, matrix.b);
            });
            expect(resetScale).toBe(1);
        } finally {
            await page.close();
        }
    }, 15000);

    it("mantém a entrada do modal estável e alinha os sliders durante todo o ciclo", async () => {
        const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
        try {
            await page.goto(new URL("?cardSearch", server.url).toString(), { waitUntil: "domcontentloaded" });
            await page.locator("#open-card-search").click();

            const modal = page.getByRole("dialog", { name: "Buscar carta" });
            await modal.waitFor({ state: "visible" });
            await page.waitForTimeout(80);
            expect(await modal.getAttribute("data-overlay-state")).toBe("opening");

            const openingScales = await modal.locator(".modal-surface").evaluate(
                (surface) =>
                    new Promise<number[]>((resolve) => {
                        const scales: number[] = [];
                        const sample = () => {
                            const matrix = new DOMMatrixReadOnly(getComputedStyle(surface).transform);
                            scales.push(Math.hypot(matrix.a, matrix.b));
                            const state = surface.closest("[data-overlay-state]")?.getAttribute("data-overlay-state");
                            if (state === "opening") {
                                requestAnimationFrame(sample);
                                return;
                            }
                            resolve(scales);
                        };
                        requestAnimationFrame(sample);
                    }),
            );

            expect(Math.max(...openingScales)).toBeLessThanOrEqual(1.0001);

            const readSliderAlignment = () =>
                modal.locator('[role="radiogroup"]').evaluateAll((sliders) =>
                    sliders.map((slider) => {
                        const selected = slider.querySelector<HTMLElement>('[aria-checked="true"]')!;
                        const indicator = slider.querySelector<HTMLElement>("[data-slider-indicator]")!;
                        const selectedRect = selected.getBoundingClientRect();
                        const indicatorRect = indicator.getBoundingClientRect();
                        return {
                            leftDelta: Math.abs(selectedRect.left - indicatorRect.left),
                            widthDelta: Math.abs(selectedRect.width - indicatorRect.width),
                        };
                    }),
                );
            const expectSlidersAligned = (alignments: { leftDelta: number; widthDelta: number }[]) => {
                expect(alignments).toHaveLength(3);
                for (const alignment of alignments) {
                    expect(alignment.leftDelta).toBeLessThan(1);
                    expect(alignment.widthDelta).toBeLessThan(1);
                }
            };

            expectSlidersAligned(await readSliderAlignment());
            await page.waitForFunction(() => document.querySelector('[aria-label="Buscar carta"]')?.getAttribute("data-overlay-state") === "open");
            expectSlidersAligned(await readSliderAlignment());

            await modal.getByRole("button", { name: "Fechar" }).click();
            await page.waitForFunction(() => document.querySelector('[aria-label="Buscar carta"]')?.getAttribute("data-overlay-state") === "closing");
            expect(await modal.locator(".modal-transient-content").evaluate((element) => getComputedStyle(element).visibility)).toBe("hidden");
            await modal.waitFor({ state: "detached" });
        } finally {
            await page.close();
        }
    }, 10000);

    it("mantém o catálogo aberto após cada carta adicionada e agrupa cópias idênticas", async () => {
        const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
        try {
            await page.goto(new URL("?cardSearch", server.url).toString(), { waitUntil: "domcontentloaded" });
            await page.locator("#open-card-search").click();

            const modal = page.getByRole("dialog", { name: "Buscar carta" });
            await modal.waitFor({ state: "visible" });
            await modal.locator("input[aria-placeholder]").fill("bulba");
            await modal
                .getByRole("button", { name: /^Adicionar Bulbasaur \(PT-BR · Normal · NM\) à Coleção$/ })
                .first()
                .waitFor({ state: "visible" });
            await modal
                .getByRole("button", { name: /^Adicionar Bulbasaur \(PT-BR · Normal · NM\) à Coleção$/ })
                .first()
                .click();
            await modal
                .getByRole("button", { name: /Adicionar mais 1 cópia de Bulbasaur/ })
                .first()
                .waitFor({ state: "visible" });
            expect(await modal.getAttribute("data-overlay-state")).toBe("open");
            await modal.getByText("1 adicionada").waitFor({ state: "visible" });
            await modal
                .getByRole("button", { name: /Adicionar mais 1 cópia de Bulbasaur/ })
                .first()
                .click();
            await modal.getByText("2 adicionadas").waitFor({ state: "visible" });
            await modal
                .getByRole("button", { name: /Adicionar mais 1 cópia de Bulbasaur/ })
                .first()
                .waitFor({ state: "visible" });
            expect(await modal.getByRole("button", { name: /Adicionar mais 1 cópia de Bulbasaur/ }).count()).toBe(1);
            await modal.getByRole("button", { name: /^Adicionar Bulbasaur Holo \(PT-BR · Normal · NM\) à Coleção$/ }).click();
            await modal.getByText("3 adicionadas").waitFor({ state: "visible" });
            await modal
                .getByRole("button", { name: /Adicionar mais 1 cópia de Bulbasaur Holo/ })
                .first()
                .waitFor({ state: "visible" });
            expect(await modal.getByRole("button", { name: /Adicionar mais 1 cópia de Bulbasaur/ }).count()).toBe(2);
            expect(await modal.getAttribute("data-overlay-state")).toBe("open");

            const addedIds = await page.locator("#added-cards").textContent();
            expect(addedIds?.split(",")).toEqual(["carta-adicionada-catalogo-1-pt-br-normal-NM", "carta-adicionada-catalogo-1-pt-br-normal-NM", "carta-adicionada-catalogo-2-pt-br-normal-NM"]);
        } finally {
            await page.close();
        }
    }, 20000);

    it("esmaece as cartas que ainda não constam na Coleção e troca a quantidade conforme idioma e estado", async () => {
        const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
        try {
            await page.goto(new URL("?cardSearch", server.url).toString(), { waitUntil: "domcontentloaded" });
            await page.locator("#open-card-search").click();

            const modal = page.getByRole("dialog", { name: "Buscar carta" });
            await modal.waitFor({ state: "visible" });
            await modal.locator("input[aria-placeholder]").fill("bulba");

            const missingArtwork = modal.locator('[data-missing="true"]');
            await missingArtwork.first().waitFor({ state: "attached" });
            await modal.locator('[data-owned-count="matching"]').waitFor({ state: "visible" });
            expect(await missingArtwork.count()).toBe(2);
            expect(await missingArtwork.first().evaluate((element) => getComputedStyle(element).opacity)).toBe("0.6");
            expect(await missingArtwork.first().evaluate((element) => getComputedStyle(element).filter)).toContain("saturate");

            await modal.locator("input[aria-placeholder]").fill("charm");

            await missingArtwork.first().waitFor({ state: "detached" });
            expect(await modal.locator("[data-owned-count]").count()).toBe(1);

            const badge = modal.locator('[data-owned-count="matching"]');
            await badge.waitFor({ state: "visible" });
            expect(await badge.textContent()).toBe("x2");
            expect(await modal.getByRole("button", { name: /Adicionar mais 1 cópia de Charmander \(PT-BR · Normal · NM\).*você já tem 2 exemplares/ }).count()).toBe(1);

            await modal.getByRole("radio", { name: "EN", exact: true }).click();
            await modal.locator('[data-owned-count="matching"]').filter({ hasText: "x3" }).waitFor({ state: "visible" });

            await modal.getByRole("radio", { name: /^Mint$/ }).click();
            await modal.locator('[data-owned-count="matching"]').waitFor({ state: "detached" });
            expect(await modal.locator("[data-owned-count]").count()).toBe(0);
            const fadedArtwork = modal.locator('[data-missing="true"]');
            await fadedArtwork.waitFor({ state: "attached" });
            expect(await waitForOpacity(page, fadedArtwork)).toBe(0.6);
            expect(await modal.getByRole("button", { name: /^Adicionar Charmander \([^)]*\) à Coleção$/ }).count()).toBe(1);
        } finally {
            await page.close();
        }
    }, 20000);

    it("mantém o loading mobile visível e revela o binder com uma entrada própria", async () => {
        const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
        try {
            await page.addInitScript(() => {
                const timing = { shownAt: null as number | null, hiddenAt: null as number | null, wasVisible: false };
                Object.assign(window, { binderLoaderTiming: timing });
                const measure = () => {
                    const visible = document.querySelector(".binder-opening-loader--visible") !== null;
                    if (visible && timing.shownAt === null) timing.shownAt = performance.now();
                    if (!visible && timing.wasVisible && timing.hiddenAt === null) timing.hiddenAt = performance.now();
                    timing.wasVisible = visible;
                };
                new MutationObserver(measure).observe(document, { attributes: true, attributeFilter: ["class"], childList: true, subtree: true });
            });
            await page.goto(server.url.toString(), { waitUntil: "domcontentloaded" });
            await waitForPage(page, 1);
            await page.waitForFunction(() => (window as typeof window & { binderLoaderTiming?: { hiddenAt: number | null } }).binderLoaderTiming?.hiddenAt !== null);
            const timing = await page.evaluate(() => (window as typeof window & { binderLoaderTiming: { shownAt: number; hiddenAt: number } }).binderLoaderTiming);
            expect(timing.shownAt).toBeGreaterThan(0);
            expect(timing.hiddenAt - timing.shownAt).toBeGreaterThanOrEqual(395);
            const mobile = page.locator(".binder-mobile");
            expect(await mobile.evaluate((element) => getComputedStyle(element).animationName)).toBe("binder-mobile-entrance");
            expect(await mobile.evaluate((element) => getComputedStyle(element).animationDuration)).toBe("0.28s");
        } finally {
            await page.close();
        }
    }, 10000);

    it("mantém as imagens da folha durante um salto de retorno para uma página ainda não visitada", async () => {
        const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
        try {
            await page.goto(new URL("?dexId=150&openSelect=true", server.url).toString());
            await page.getByRole("button", { name: "Fechar", exact: true }).click();
            await waitForPage(page, 17);
            await recordMobileTransition(page);
            await page.getByRole("button", { name: "Ir para Página 1,", exact: false }).click();
            await waitForPage(page, 1);
            const frames = await transitionFrames(page);
            expect(frames.map((frame) => frame.phase)).toEqual(["exit", "enter", "idle"]);
            expect(frames[1].images[0]).toBe("/pokemon/gen1/1.png");
            expect(await page.locator("#binder-slot-1").count()).toBe(1);
        } finally {
            await page.close();
        }
    }, 10000);

    it("aguarda as imagens iniciais antes de abrir e não volta ao loader ao navegar", async () => {
        const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
        try {
            await page.route("**/pokemon/**", async (route) => {
                await Bun.sleep(1800);
                await route.continue();
            });
            await page.goto(server.url.toString(), { waitUntil: "domcontentloaded" });
            await page.waitForTimeout(250);
            expect(await page.locator(".binder-stage-entrance, .binder-mobile").count()).toBe(0);
            expect(await page.locator(".binder-opening-loader--visible").count()).toBe(1);
            await waitForPage(page, 1);
            await page.getByRole("button", { name: "Próxima página", exact: true }).first().click();
            await waitForPage(page, 2);
            expect(await page.locator(".binder-opening-loader--visible").count()).toBe(0);
            expect(await activePages(page)).toEqual(["2"]);
        } finally {
            await page.close();
        }
    }, 15000);

    for (const width of [390, 1280]) {
        it(`preserva a virada em andamento diante de comandos seguidos em ${width}px`, async () => {
            const page = await browser.newPage({ viewport: { width, height: 900 } });
            try {
                const scripts: string[] = [];
                page.on("request", (request) => scripts.push(new URL(request.url()).pathname.slice(1)));
                await page.goto(server.url.toString());
                await waitForPage(page, 1);
                expect(desktopChunkPaths.length).toBeGreaterThan(0);
                expect(scripts.some((path) => desktopChunkPaths.includes(path))).toBe(width >= 768);
                expect(await page.locator(".stf__block").count()).toBe(width < 768 ? 0 : 1);
                const next = page.getByRole("button", { name: "Próxima página", exact: true }).last();
                const mobileNext = page.getByRole("button", { name: "Próxima página", exact: true }).first();
                await (width < 768 ? mobileNext : next).evaluate((button: HTMLButtonElement) => {
                    button.click();
                    button.click();
                    document.querySelector<HTMLButtonElement>('button[aria-label="Página anterior"]')?.click();
                    document.querySelector<HTMLButtonElement>('button[aria-label^="Ir para Página 17,"]')?.click();
                });
                await page.waitForFunction(() => !document.querySelector('.binder-book-stage--busy, .binder-mobile[data-phase="exit"], .binder-mobile[data-phase="enter"]'));
                await page.waitForTimeout(60);
                expect(await activePages(page)).toEqual(width < 768 ? ["2"] : ["2", "3"]);
                expect(await page.locator("#binder-slot-1").count()).toBe(width < 768 ? 0 : 1);
                await page
                    .getByRole("button", { name: "Página anterior", exact: true })
                    .first()
                    .evaluate((button: HTMLButtonElement) => {
                        button.click();
                        button.click();
                    });
                await waitForPage(page, 1);
                expect(await activePages(page)).toEqual(["1"]);
                await page.getByRole("button", { name: "Ir para Página 17,", exact: false }).evaluate((button: HTMLButtonElement) => {
                    button.click();
                    document.querySelector<HTMLButtonElement>('button[aria-label^="Ir para Página 5,"]')?.click();
                });
                await waitForPage(page, 17);
                expect(await activePages(page)).toContain("17");
            } finally {
                await page.close();
            }
        }, 15000);
    }

    it("navega por swipe e busca sem sobrepor cartas nem abrir o seletor após o gesto", async () => {
        const page = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
        try {
            await page.goto(server.url.toString());
            await waitForPage(page, 1);
            expect(await page.getByRole("button", { name: "Página anterior", exact: true }).first().isDisabled()).toBe(true);
            await recordMobileTransition(page);
            await page.locator("#binder-slot-1").evaluate((slot) => {
                slot.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 1, isPrimary: true, clientX: 240, clientY: 200 }));
                slot.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 1, isPrimary: true, clientX: 100, clientY: 205 }));
                (slot as HTMLButtonElement).click();
            });
            await waitForPage(page, 2);
            const frames = await transitionFrames(page);
            expect(frames.map((frame) => frame.phase)).toEqual(["exit", "enter", "idle"]);
            expect(frames.every((frame) => frame.ids.length === 9)).toBe(true);
            expect(frames[0].ids).toContain("binder-slot-1");
            expect(frames[0].ids).not.toContain("binder-slot-10");
            expect(frames[1].ids).toContain("binder-slot-10");
            expect(frames[1].ids).not.toContain("binder-slot-1");
            expect(await page.locator('[id^="binder-slot-"]').count()).toBe(9);
            expect(await page.getByRole("button", { name: "Fechar", exact: true }).count()).toBe(0);
            await page.locator(".binder-mobile").evaluate((stage) => {
                stage.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 2, isPrimary: true, clientX: 200, clientY: 200 }));
                stage.dispatchEvent(new PointerEvent("pointercancel", { bubbles: true, pointerId: 2, isPrimary: true, clientX: 50, clientY: 205 }));
                stage.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 2, isPrimary: true, clientX: 50, clientY: 205 }));
                stage.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 3, isPrimary: true, clientX: 200, clientY: 200 }));
                stage.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 3, isPrimary: true, clientX: 180, clientY: 350 }));
            });
            expect(await activePages(page)).toEqual(["2"]);
            expect(await page.locator(".binder-mobile").getAttribute("data-phase")).toBe("idle");
            const search = page.getByRole("textbox", { name: "Buscar Pokémon no binder", exact: true }).first();
            await search.fill("#151");
            await search.press("Enter");
            await waitForPage(page, 17);
            await page.waitForSelector("#binder-slot-151.slot-glow, .slot-glow:has(#binder-slot-151)");
            expect(await page.getByRole("button", { name: "Próxima página", exact: true }).first().isDisabled()).toBe(true);
            await page.locator("#binder-slot-151").click();
            expect(await page.getByRole("button", { name: "Fechar", exact: true }).count()).toBe(1);
        } finally {
            await page.close();
        }
    }, 15000);

    it("destaca o slot universal desktop pela busca e pelo mapa de estatísticas", async () => {
        const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
        try {
            await page.goto(new URL("?universal&universalViewer", server.url).toString());
            await page.locator(".binder-book-stage").waitFor({ state: "visible" });
            const search = page.getByRole("textbox", { name: "Buscar Pokémon no binder", exact: true }).first();
            await search.fill("#151");
            await search.press("Enter");
            await page.waitForSelector("#binder-slot-slot-36.slot-glow, .slot-glow:has(#binder-slot-slot-36)", { timeout: 6000 });
            await page.waitForTimeout(2600);
            await page.getByRole("button", { name: "Estatísticas", exact: true }).click();
            const statisticsDrawer = page.locator(".fixed.inset-0.z-50");
            await statisticsDrawer.waitFor({ state: "visible" });
            await statisticsDrawer.getByRole("button").last().click();
            await page.waitForSelector("#binder-slot-slot-36.slot-glow, .slot-glow:has(#binder-slot-slot-36)", { timeout: 6000 });
        } finally {
            await page.close();
        }
    }, 20000);

    it("sinaliza com o ícone de carta guardada o slot de Pokémon que pode ser preenchido", async () => {
        const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
        try {
            await page.goto(new URL("?universal&universalViewer&opened=1", server.url).toString());
            const availableSlot = page.locator("#binder-slot-slot-3");
            await availableSlot.waitFor({ state: "visible" });

            const badge = availableSlot.locator("span[title$='para preencher este compartimento']");
            await badge.waitFor({ state: "visible" });
            expect(await availableSlot.getAttribute("aria-label")).toBe("Venusaur, #003, vazio, 2 cartas disponíveis na coleção");
            expect(await badge.locator("svg").count()).toBe(1);
            expect(await badge.getAttribute("title")).toBe("2 cartas disponíveis para preencher este compartimento");

            const untouchedSlot = page.locator("#binder-slot-slot-4");
            expect(await untouchedSlot.locator("span[title$='para preencher este compartimento']").count()).toBe(0);
            expect(await untouchedSlot.getAttribute("aria-label")).toBe("Charmander, #004, vazio");
        } finally {
            await page.close();
        }
    }, 20000);

    it("folheia páginas internas sem comprimir cartas nem deslocar ações verticalmente", async () => {
        const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
        try {
            await page.goto(new URL("?universal&universalMotion", server.url).toString());
            await waitForPage(page, 1);
            await page.getByRole("button", { name: "Avançar teste" }).click();
            await waitForPage(page, 2);
            await page.getByRole("button", { name: "Avançar teste" }).click();
            await waitForPage(page, 4);

            const card = page.locator("#binder-slot-motion-4-1").locator("xpath=ancestor::*[contains(@class, 'card-3d-tilt')]");
            const action = page.locator("#binder-slot-motion-4-2").getByText("Inserir Carta", { exact: true });
            await card.evaluate((element: HTMLElement) => {
                element.style.background = "#00ff00";
                element.querySelector("img")!.style.visibility = "hidden";
            });
            const settledCard = await card.boundingBox();
            const settledAction = await action.boundingBox();
            await page.screenshot({ path: "/tmp/binder-settled.png" });
            expect(settledCard).not.toBeNull();
            expect(settledAction).not.toBeNull();

            await page.getByRole("button", { name: "Voltar teste" }).click();
            await waitForPage(page, 2);
            await page.getByRole("button", { name: "Avançar teste" }).click();
            await page.waitForFunction(() => document.querySelector(".binder-book-stage--busy"));
            await page.waitForTimeout(180);
            expect(await page.locator(".stf__item.--soft:not(.--simple):has(#binder-slot-motion-4-1)").count()).toBeGreaterThan(0);

            await page.evaluate(() => {
                window.requestAnimationFrame = () => 0;
            });
            await page.waitForTimeout(50);
            await page.screenshot({ path: "/tmp/binder-turning.png" });
            const turningCard = await card.boundingBox();
            const turningAction = await action.boundingBox();
            expect(turningCard).not.toBeNull();
            expect(turningAction).not.toBeNull();
            expect(Math.abs(turningCard!.width - settledCard!.width)).toBeLessThan(1);
            expect(Math.abs(turningCard!.height - settledCard!.height)).toBeLessThan(1);
            expect(Math.abs(turningAction!.y - settledAction!.y)).toBeLessThan(1);
            expect(await action.evaluate((element) => getComputedStyle(element).visibility)).toBe("visible");
        } finally {
            await page.close();
        }
    }, 15000);

    it("abre a capa sem comprimir a primeira página nem deslocar suas ações", async () => {
        const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
        try {
            await page.goto(new URL("?universal&universalMotion", server.url).toString());
            await waitForPage(page, 1);
            await page.waitForTimeout(800);

            const card = page.locator("#binder-slot-motion-1-1").locator("xpath=ancestor::*[contains(@class, 'card-3d-tilt')]");
            const action = page.locator("#binder-slot-motion-1-2").getByText("Inserir Carta", { exact: true });
            const settledCard = await card.boundingBox();
            const settledAction = await action.boundingBox();
            expect(settledCard).not.toBeNull();
            expect(settledAction).not.toBeNull();

            await page.getByRole("button", { name: "Voltar teste" }).click();
            await page.waitForFunction(() => !document.querySelector(".binder-book-stage--busy") && document.querySelector(".binder-cover-front.--simple"));
            await page.getByRole("button", { name: "Avançar teste" }).click();
            await page.waitForFunction(() => document.querySelector(".binder-book-stage--busy"));
            await page.waitForTimeout(180);
            expect(await page.locator(".stf__item:not(.--simple):has(#binder-slot-motion-1-1)").count()).toBeGreaterThan(0);

            const openingCard = await card.boundingBox();
            const openingAction = await action.boundingBox();
            expect(openingCard).not.toBeNull();
            expect(openingAction).not.toBeNull();
            expect(Math.abs(openingCard!.width - settledCard!.width)).toBeLessThan(2);
            expect(Math.abs(openingCard!.height - settledCard!.height)).toBeLessThan(2);
            expect(Math.abs(openingAction!.y - settledAction!.y)).toBeLessThan(2);
            expect(await action.evaluate((element) => getComputedStyle(element).visibility)).toBe("visible");
            await page.waitForFunction(() => !document.querySelector(".binder-book-stage--busy"));
        } finally {
            await page.close();
        }
    }, 15000);

    it("mantém um overlay presente ao alternar entre seletor de slot e catálogo", async () => {
        const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
        try {
            await page.goto(new URL("?universal&universalViewer", server.url).toString());
            await page.locator(".binder-book-stage").waitFor({ state: "visible" });
            await page.locator("#binder-slot-slot-2").click();

            const slotModal = page.getByRole("dialog", { name: /^Selecionar carta para/ });
            await slotModal.waitFor({ state: "visible" });
            await page.waitForFunction(() => document.querySelector('[data-overlay-state="open"]'));

            await recordOverlayPresence(page);
            await slotModal
                .getByRole("button", { name: /^(Adicionar Carta|Buscar no catálogo)$/ })
                .first()
                .click();
            const catalogModal = page.getByRole("dialog", { name: "Buscar carta" });
            await catalogModal.waitFor({ state: "visible" });
            await page.waitForTimeout(950);
            const toCatalog = await readOverlayPresence(page);

            await recordOverlayPresence(page);
            await catalogModal.getByRole("button", { name: "Voltar ao seletor do binder" }).click();
            await slotModal.waitFor({ state: "visible" });
            await page.waitForTimeout(950);
            const toSlotModal = await readOverlayPresence(page);

            for (const frames of [toCatalog, toSlotModal]) {
                expect(frames.length).toBeGreaterThan(10);
                expect(Math.min(...frames.map((frame) => frame.count))).toBe(1);
                expect(Math.min(...frames.map((frame) => frame.opacity))).toBe(1);
                expect(frames.flatMap((frame) => frame.animations).filter((name) => name !== "none")).toEqual([]);
            }
        } finally {
            await page.close();
        }
    }, 25000);

    it("exibe o seletor de slot já aberto ao voltar da página de detalhe da carta", async () => {
        const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
        try {
            await page.addInitScript(() => {
                const states: string[] = [];
                const animations: string[] = [];
                Object.assign(window, { entryProbe: { states, animations } });
                const sample = () => {
                    const dialog = document.querySelector<HTMLElement>('[aria-label^="Selecionar carta para"]');
                    if (dialog) {
                        const state = dialog.getAttribute("data-overlay-state") ?? "";
                        if (states.at(-1) !== state) states.push(state);
                        const surface = dialog.querySelector<HTMLElement>(".modal-surface");
                        if (surface) animations.push(getComputedStyle(surface).animationName, getComputedStyle(dialog).animationName);
                    }
                    requestAnimationFrame(sample);
                };
                requestAnimationFrame(sample);
            });

            await page.goto(new URL("?dexId=150&openSelect=true", server.url).toString());
            const slotModal = page.getByRole("dialog", { name: /^Selecionar carta para/ });
            await slotModal.waitFor({ state: "visible" });
            await page.waitForTimeout(300);

            const probe = await page.evaluate(() => (window as typeof window & { entryProbe: { states: string[]; animations: string[] } }).entryProbe);
            expect(probe.states.length).toBeGreaterThan(0);
            expect(probe.states).not.toContain("opening");
            expect(probe.animations.filter((name) => name !== "none")).toEqual([]);
            expect(await slotModal.getAttribute("data-overlay-state")).toBe("open");
        } finally {
            await page.close();
        }
    }, 20000);

    it("navega diretamente para a primeira e última página através dos atalhos laterais", async () => {
        const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
        try {
            await page.goto(new URL("?universal&universalViewer&opened=1", server.url).toString());
            await waitForPage(page, 1);
            const goToLastButton = page.getByRole("button", { name: "Ir para a última página" });
            const goToFirstButton = page.getByRole("button", { name: "Ir para a primeira página" });
            expect(await goToFirstButton.isDisabled()).toBe(true);
            expect(await goToLastButton.isDisabled()).toBe(false);
            await goToLastButton.click();
            await waitForPage(page, 4);
            expect(await goToLastButton.isDisabled()).toBe(true);
            expect(await goToFirstButton.isDisabled()).toBe(false);
            await goToFirstButton.click();
            await waitForPage(page, 1);
            expect(await goToFirstButton.isDisabled()).toBe(true);
        } finally {
            await page.close();
        }
    }, 15000);

    it("mantém a geometria e consistência de bordas dos botões de navegação lateral", async () => {
        const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
        try {
            await page.goto(new URL("?universal&universalViewer&opened=1", server.url).toString());
            const navButtons = [page.getByRole("button", { name: "Ir para a primeira página" }), page.getByRole("button", { name: "Página anterior" }), page.getByRole("button", { name: "Próxima página" }), page.getByRole("button", { name: "Ir para a última página" })];
            for (const button of navButtons) {
                const box = await button.boundingBox();
                expect(box).not.toBeNull();
                expect(box!.width).toBeGreaterThanOrEqual(36);
                expect(box!.height).toBeGreaterThanOrEqual(36);
            }
        } finally {
            await page.close();
        }
    }, 10000);

    it("preserva a página ao alternar entre mobile e desktop", async () => {
        const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
        try {
            await page.goto(server.url.toString());
            await waitForPage(page, 1);
            await page.getByRole("button", { name: "Ir para Página 5,", exact: false }).click();
            await waitForPage(page, 5);
            await page.setViewportSize({ width: 1280, height: 900 });
            await page.waitForSelector(".stf__block");
            await waitForPage(page, 5);
            expect(await page.locator(".binder-mobile").count()).toBe(0);
            expect(await page.locator(".stf__block").count()).toBe(1);
            await page.setViewportSize({ width: 390, height: 844 });
            await page.waitForSelector(".binder-mobile");
            await page.waitForFunction(() => document.querySelector(".binder-mobile")?.getAttribute("aria-busy") === "false");
            expect(await page.locator(".stf__item").count()).toBe(0);
            expect(await page.locator('[id^="binder-slot-"]').count()).toBe(9);
        } finally {
            await page.close();
        }
    }, 10000);

    for (const mode of ["reduced", "static"] as const) {
        it(`troca de página sem animação no modo ${mode}`, async () => {
            const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: mode === "reduced" ? "reduce" : "no-preference" });
            try {
                await page.goto(new URL(mode === "static" ? "?static=true" : "", server.url).toString());
                await waitForPage(page, 1);
                await recordMobileTransition(page);
                await page.getByRole("button", { name: "Próxima página", exact: true }).first().click();
                await waitForPage(page, 2);
                expect(await activePages(page)).toEqual(["2"]);
                expect(await transitionFrames(page)).toEqual([]);
            } finally {
                await page.close();
            }
        }, 10000);
    }
});

describe("Capas sólidas do binder universal", () => {
    it("mantém capa, contracapa e forros opacos durante as viradas", async () => {
        const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
        try {
            await page.goto(new URL("?universal", server.url).toString());
            await page.locator(".binder-cover-front.stf__item").waitFor({ state: "visible" });
            await page.waitForTimeout(800);
            const covers = page.locator(".stf__item");
            const surfaces = await covers.evaluateAll((sheets) => sheets.map((sheet) => ({ color: getComputedStyle(sheet).backgroundColor, density: sheet.getAttribute("data-density") })));
            expect(surfaces.map((surface) => surface.color)).not.toContain("rgba(0, 0, 0, 0)");
            expect([surfaces[0].density, surfaces[1].density, surfaces.at(-2)?.density, surfaces.at(-1)?.density]).toEqual(["hard", "hard", "hard", "hard"]);
            for (let turn = 0; turn < 3; turn++) {
                await page.getByRole("button", { name: "Avançar teste" }).click();
                await page.waitForFunction(() => document.querySelector(".binder-book-stage--busy") !== null);
                const turning = await page.locator(".stf__item.--hard:not(.--simple)").evaluateAll((sheets) => sheets.map((sheet) => ({ color: getComputedStyle(sheet).backgroundColor, opacity: getComputedStyle(sheet).opacity })));
                if (turn !== 1) expect(turning.length).toBeGreaterThan(0);
                for (const surface of turning) {
                    expect(surface.color).not.toBe("rgba(0, 0, 0, 0)");
                    expect(surface.opacity).toBe("1");
                }
                await page.waitForFunction(() => !document.querySelector(".binder-book-stage--busy"));
            }
        } finally {
            await page.close();
        }
    }, 15000);
});
