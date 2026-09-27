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
                        build.onLoad({ filter: /.*/, namespace: "teste" }, () => ({
                            contents: 'export const useSearchParams = () => new URLSearchParams(location.search); export const useRouter = () => ({replace(){},push(){}}); export const usePathname = () => "/";',
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
