import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { chromium, type Browser, type Page } from "playwright";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import { cards } from "./fixtures/cards";

let browser: Browser;
let server: ReturnType<typeof Bun.serve>;

beforeAll(async () => {
    const [css, build] = await Promise.all([
        postcss([tailwind()]).process(await Bun.file("src/app/globals.css").text(), { from: "src/app/globals.css" }),
        Bun.build({
            entrypoints: ["tests/browser/fixtures/binder.tsx"],
            target: "browser",
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
    server = Bun.serve({
        port: 0,
        async fetch(request) {
            const { pathname } = new URL(request.url);
            if (pathname === "/app.js") return new Response(build.outputs[0]);
            if (pathname === "/app.css") return new Response(css.css, { headers: { "Content-Type": "text/css" } });
            if (/^\/pokemon\/gen1\/\d+\.png$/.test(pathname)) return new Response(Bun.file(`public${pathname}`));
            if (pathname.startsWith("/api/")) return Response.json({ cards, availableCounts: {} });
            return new Response('<html><head><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="/app.css"></head><body><div id="root"></div><script>window.process={env:{}}</script><script src="/app.js"></script></body></html>', { headers: { "Content-Type": "text/html" } });
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
        const stage = document.querySelector(".binder-book-stage");
        return !stage?.classList.contains("binder-book-stage--busy") && [...document.querySelectorAll(".stf__item.--simple")].some((sheet) => getComputedStyle(sheet).display !== "none" && sheet.textContent?.startsWith(`Página ${target} de`));
    }, catalogPage);
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
}

async function activePages(page: Page) {
    return page.locator(".stf__item.--simple").evaluateAll((sheets) =>
        sheets
            .filter((sheet) => getComputedStyle(sheet).display !== "none")
            .map((sheet) => sheet.textContent?.match(/^Página (\d+) de/)?.[1])
            .filter(Boolean),
    );
}

describe("Animação real do binder no navegador", () => {
    it("mantém as imagens da folha durante um salto de retorno para uma página ainda não visitada", async () => {
        const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
        try {
            await page.goto(new URL("?dexId=150&openSelect=true", server.url).toString());
            await page.getByRole("button", { name: "Fechar", exact: true }).click();
            await waitForPage(page, 17);
            await page.getByRole("button", { name: "Ir para Página 1,", exact: false }).click();
            await page.waitForSelector(".binder-book-stage--busy");
            const images = await page.locator("#binder-slot-1").evaluateAll((slots) => slots.map((slot) => slot.querySelector("img")?.getAttribute("src") ?? null));
            expect(images.length).toBeGreaterThan(0);
            expect(images.every((src) => src === "/pokemon/gen1/1.png")).toBe(true);
            await waitForPage(page, 1);
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
            await page.waitForTimeout(1400);
            expect(await page.locator(".binder-stage-entrance").count()).toBe(0);
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
                await page.goto(server.url.toString());
                await waitForPage(page, 1);
                const next = page.getByRole("button", { name: "Próxima página", exact: true }).last();
                const mobileNext = page.getByRole("button", { name: "Próxima página", exact: true }).first();
                await (width < 768 ? mobileNext : next).evaluate((button: HTMLButtonElement) => {
                    button.click();
                    button.click();
                    document.querySelector<HTMLButtonElement>('button[aria-label="Página anterior"]')?.click();
                    document.querySelector<HTMLButtonElement>('button[aria-label^="Ir para Página 17,"]')?.click();
                });
                await page.waitForFunction(() => !document.querySelector(".binder-book-stage--busy"));
                await page.waitForTimeout(60);
                expect(await activePages(page)).toEqual(width < 768 ? ["2"] : ["2", "3"]);
                expect(await page.locator("#binder-slot-1").count()).toBe(1);
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

    it("libera a navegação após abrir com movimento reduzido", async () => {
        const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
        try {
            await page.goto(server.url.toString());
            await waitForPage(page, 1);
            await page.getByRole("button", { name: "Próxima página", exact: true }).first().click();
            await waitForPage(page, 2);
            expect(await activePages(page)).toEqual(["2"]);
        } finally {
            await page.close();
        }
    }, 10000);
});
