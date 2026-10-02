import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { chromium, type Browser, type Page } from "playwright";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import { cards } from "./fixtures/cards";

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
            if (pathname.startsWith("/api/")) return Response.json({ cards, availableCounts: {} });
            return new Response('<html><head><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="/app.css"></head><body><div id="root"></div><script>window.process={env:{}}</script><script type="module" src="/app.js"></script></body></html>', { headers: { "Content-Type": "text/html" } });
        },
    });
    browser = await chromium.launch({ headless: true });
}, 30000);

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

describe("Animação real do binder no navegador", () => {
    it("abre a prévia da estante com o PageFlip depois de ampliar o binder sem mudar sua posição", async () => {
        const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
        try {
            await page.goto(new URL("?shelf", server.url).toString(), { waitUntil: "domcontentloaded" });
            const card = page.locator("#shelf-card");
            const stage = card.locator(".binder-shelf-stage");
            await stage.waitFor({ state: "visible" });
            await page.waitForFunction(() => document.querySelector(".binder-shelf-stage")?.querySelector(".stf__item"));
            await stage.evaluate((element) => {
                const frames: { state: string | null; insideLeft: number }[] = [];
                let started = false;
                const sample = () => {
                    const state = element.getAttribute("data-shelf-state");
                    if (state === "flipping") started = true;
                    if (started) {
                        const inside = element.querySelectorAll(".binder-book-page")[1]?.closest(".stf__item");
                        const insideRect = inside?.getBoundingClientRect();
                        frames.push({
                            state,
                            insideLeft: insideRect?.left ?? 0,
                        });
                    }
                    if (!started || state !== "read") {
                        requestAnimationFrame(sample);
                        return;
                    }
                    element.setAttribute("data-test-flip-frames", JSON.stringify(frames));
                };
                requestAnimationFrame(sample);
                element.addEventListener("transitionend", (event) => {
                    if (event.propertyName === "transform" && !element.getAttribute("data-test-scale-ended-at")) {
                        element.setAttribute("data-test-scale-ended-at", String(performance.now()));
                    }
                });
                new MutationObserver(() => {
                    if (element.getAttribute("data-shelf-state") === "flipping" && !element.getAttribute("data-test-flip-started-at")) {
                        element.setAttribute("data-test-flip-started-at", String(performance.now()));
                    }
                }).observe(element, { attributes: true, attributeFilter: ["data-shelf-state"] });
            });
            const stageCenterX = await stage.evaluate((element) => {
                const rect = element.getBoundingClientRect();
                return rect.left + rect.width / 2;
            });
            const closedPageWidth = await stage.locator(".binder-cover-front").evaluate((element) => element.getBoundingClientRect().width);
            const restingCenterX = await stage.locator(".binder-cover-front").evaluate((element) => {
                const rect = element.getBoundingClientRect();
                return rect.left + rect.width / 2;
            });
            expect(Math.abs(restingCenterX - stageCenterX)).toBeLessThan(2);

            await card.hover();
            await page.waitForTimeout(180);
            expect(await stage.getAttribute("data-shelf-page")).toBe("0");
            expect(await card.evaluate((element) => getComputedStyle(element).zIndex)).toBe("60");
            const engineClosedCenterX = await stage.locator(".binder-cover-front").evaluate((element) => {
                const rect = element.getBoundingClientRect();
                return rect.left + rect.width / 2;
            });
            expect(Math.abs(engineClosedCenterX - restingCenterX)).toBeLessThan(2);

            await page.waitForFunction(() => document.querySelector(".binder-shelf-stage")?.getAttribute("data-shelf-state") === "flipping");
            await page.waitForFunction(() => document.querySelector(".binder-shelf-stage")?.getAttribute("data-test-scale-ended-at"));
            const transitionTiming = await stage.evaluate((element) => ({
                scaleEndedAt: Number(element.getAttribute("data-test-scale-ended-at")),
                flipStartedAt: Number(element.getAttribute("data-test-flip-started-at")),
            }));
            expect(transitionTiming.flipStartedAt).toBeGreaterThanOrEqual(transitionTiming.scaleEndedAt);
            await page.waitForFunction(() => document.querySelector(".binder-shelf-stage")?.getAttribute("data-shelf-page") !== "0" && document.querySelector(".binder-shelf-stage")?.getAttribute("data-shelf-state") === "read");
            const flipFrames = JSON.parse((await stage.getAttribute("data-test-flip-frames")) ?? "[]") as { state: string; insideLeft: number }[];
            const settledFrame = flipFrames.at(-1)!;
            const lastTurningFrame = flipFrames.findLast((frame) => frame.state === "flipping")!;
            expect(Math.abs(lastTurningFrame.insideLeft - settledFrame.insideLeft)).toBeLessThan(4);

            const openGeometry = await stage.locator(".stf__item").evaluateAll((items) => {
                const rects = items.filter((item) => getComputedStyle(item).display !== "none").map((item) => item.getBoundingClientRect());
                return { widths: rects.map((rect) => rect.width) };
            });
            expect(openGeometry.widths.length).toBeGreaterThanOrEqual(2);
            expect(Math.min(...openGeometry.widths)).toBeGreaterThan(closedPageWidth);
            const catalogCenterX = await stage.getByText("Página 1").evaluate((element) => {
                const rect = element.closest(".stf__item")!.getBoundingClientRect();
                return rect.left + rect.width / 2;
            });
            expect(Math.abs(catalogCenterX - restingCenterX)).toBeLessThan(2);
            expect(await stage.getByText("Página 1").isVisible()).toBe(true);

            await page.mouse.move(1200, 820);
            await page.waitForFunction(() => document.querySelector(".binder-shelf-stage")?.getAttribute("data-shelf-state") === "flipping");
            expect(await card.evaluate((element) => getComputedStyle(element).zIndex)).toBe("60");
            await page.waitForFunction(() => document.querySelector(".binder-shelf-stage")?.getAttribute("data-shelf-page") === "0" && document.querySelector(".binder-shelf-stage")?.getAttribute("data-shelf-state") === "read");
        } finally {
            await page.close();
        }
    }, 10000);

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

    it("mantém a prévia do spread ao mover o cursor entre botões vizinhos", async () => {
        const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
        try {
            await page.goto(new URL("?universal&universalViewer", server.url).toString());
            const selector = page.getByRole("navigation", { name: "Navegação rápida de páginas" });
            const pageOne = selector.locator("button").nth(0);
            const pageTwo = selector.locator("button").nth(1);
            const pageThree = selector.locator("button").nth(2);
            await pageTwo.hover();
            await selector.evaluate((element) => {
                const pageOneButton = element.querySelectorAll("button")[0];
                let mutations = 0;
                const observer = new MutationObserver((entries) => {
                    mutations += entries.filter((entry) => entry.target === pageOneButton && entry.attributeName === "class").length;
                });
                observer.observe(element, { attributes: true, attributeFilter: ["class"], subtree: true });
                element.setAttribute("data-page-one-hover-mutations", String(mutations));
                window.setTimeout(() => {
                    observer.disconnect();
                    element.setAttribute("data-page-one-hover-mutations", String(mutations));
                }, 250);
            });
            const pageTwoBox = await pageTwo.boundingBox();
            const pageThreeBox = await pageThree.boundingBox();
            if (!pageTwoBox || !pageThreeBox) throw new Error("Botões de página não renderizados");
            await page.mouse.move((pageTwoBox.x + pageTwoBox.width + pageThreeBox.x) / 2, pageTwoBox.y + pageTwoBox.height / 2);
            await page.waitForTimeout(30);
            await pageThree.hover();
            await page.waitForTimeout(300);
            expect(await selector.getAttribute("data-page-one-hover-mutations")).toBe("0");
        } finally {
            await page.close();
        }
    }, 10000);

    it("faz a troca de brilho do seletor sem alterar a geometria dos botões", async () => {
        const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
        try {
            await page.goto(new URL("?universal&universalViewer", server.url).toString());
            const selector = page.getByRole("navigation", { name: "Navegação rápida de páginas" });
            const styles = await selector.locator("button").evaluateAll((buttons) =>
                buttons.map((button) => {
                    const style = getComputedStyle(button);
                    return { borderWidth: style.borderTopWidth, transitionProperty: style.transitionProperty };
                }),
            );
            expect(styles.every((style) => style.borderWidth === "1px")).toBe(true);
            expect(styles.every((style) => style.transitionProperty === "all" || style.transitionProperty.includes("box-shadow"))).toBe(true);
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
