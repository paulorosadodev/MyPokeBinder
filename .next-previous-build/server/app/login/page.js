(() => {
    var a = {};
    ((a.id = 4520),
        (a.ids = [4520]),
        (a.modules = {
            261: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/router/utils/app-paths");
            },
            3295: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
            },
            10846: (a) => {
                "use strict";
                a.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
            },
            15109: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { default: () => d }));
                let d = (0, c(97954).registerClientReference)(
                    function () {
                        throw Error("Attempted to call the default export of \"/home/paulo_rosado/MyPokeBinder/src/app/login/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
                    },
                    "/home/paulo_rosado/MyPokeBinder/src/app/login/page.tsx",
                    "default",
                );
            },
            19121: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/action-async-storage.external.js");
            },
            20723: (a, b, c) => {
                Promise.resolve().then(c.bind(c, 15109));
            },
            26713: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/router/utils/is-bot");
            },
            28354: (a) => {
                "use strict";
                a.exports = require("util");
            },
            29294: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/work-async-storage.external.js");
            },
            30311: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { default: () => q }));
                var d = c(21124),
                    e = c(38301),
                    f = c(42378),
                    g = c(3991),
                    h = c.n(g),
                    i = c(24515),
                    j = c(42830),
                    k = c(20814),
                    l = c(26769),
                    m = c(67685),
                    n = c(56849);
                let o = [
                    { dex: 136, name: "Flareon", image: "https://assets.tcgdex.net/en/sv/sv08.5/146/high.webp", shineMode: "prismatic" },
                    { dex: 135, name: "Jolteon", image: "https://assets.tcgdex.net/en/sv/sv08.5/153/high.webp", shineMode: "prismatic" },
                    { dex: 134, name: "Vaporeon", image: "https://assets.tcgdex.net/en/sv/sv08.5/149/high.webp", shineMode: "prismatic" },
                ];
                function p() {
                    let [a, b] = (0, e.useState)(!1),
                        c = (0, f.useSearchParams)().get("error"),
                        g = async () => {
                            try {
                                b(!0);
                                let a = (0, k.U)();
                                await a.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/auth/callback` } });
                            } catch {
                                (b(!1), j.oR.error("Erro ao autenticar", { description: "N\xe3o foi poss\xedvel iniciar o login com o Google. Tente novamente." }));
                            }
                        };
                    return (0, d.jsxs)("div", {
                        className: "relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-[#07090e] lg:flex-row",
                        children: [
                            (0, d.jsx)("div", { className: "pointer-events-none absolute inset-0 opacity-[0.18] md:opacity-40", "aria-hidden": !0, children: (0, d.jsx)(m.E, { intensity: "quiet" }) }),
                            (0, d.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-b from-[#07090e]/80 via-[#07090e]/55 to-[#07090e] lg:bg-gradient-to-r lg:from-[#07090e]/70 lg:via-[#07090e]/40 lg:to-[#07090e]", "aria-hidden": !0 }),
                            (0, d.jsx)("div", {
                                className: "relative z-10 hidden min-h-[100dvh] flex-1 flex-col items-center justify-center p-10 lg:flex lg:p-16 xl:p-20",
                                children: (0, d.jsxs)("div", {
                                    className: "w-full max-w-2xl xl:max-w-3xl",
                                    children: [
                                        (0, d.jsxs)("div", {
                                            className: "max-w-xl text-left",
                                            children: [
                                                (0, d.jsx)("p", { className: "landing-enter landing-enter-d1 text-5xl font-extrabold tracking-tight xl:text-6xl bg-gradient-to-r from-[#f87171] to-[#b91c1c] bg-clip-text text-transparent", children: "MyPokeBinder" }),
                                                (0, d.jsx)("h1", { className: "landing-enter landing-enter-d2 mt-4 text-3xl font-semibold tracking-tight text-white xl:text-4xl", children: "Seu binder 3\xd73 dos 151 de Kanto" }),
                                                (0, d.jsx)("p", { className: "landing-enter landing-enter-d3 mt-4 max-w-[40ch] text-base leading-relaxed text-slate-400 xl:text-lg", children: "Entre para sincronizar cartas e folhear o binder em qualquer dispositivo." }),
                                            ],
                                        }),
                                        (0, d.jsx)("div", {
                                            className: "mt-14 flex w-full max-w-lg items-end justify-end gap-3 self-end xl:ml-auto xl:max-w-xl xl:gap-4",
                                            children: o.map((a, b) =>
                                                (0, d.jsx)(
                                                    "div",
                                                    {
                                                        className: `landing-enter landing-enter-d${b + 4} relative aspect-[8/11] w-[34%] shrink-0 ${1 === b ? "z-20 -translate-y-5 scale-110" : 0 === b ? "z-10 origin-bottom rotate-[-8deg]" : "z-10 origin-bottom rotate-[8deg]"}`,
                                                        children: (0, d.jsx)(n.LW, { className: "relative h-full w-full overflow-hidden rounded-lg", maxTilt: 18, scale: 1.04, glareOpacity: 0.4, perspective: 700, shineMode: a.shineMode, children: (0, d.jsx)(i.default, { src: a.image, alt: a.name, fill: !0, priority: 1 === b, sizes: "(max-width: 1280px) 18vw, 220px", className: "object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.75)]", unoptimized: !0 }) }),
                                                    },
                                                    a.dex,
                                                ),
                                            ),
                                        }),
                                    ],
                                }),
                            }),
                            (0, d.jsx)("div", {
                                className: "relative z-20 flex min-h-[100dvh] w-full shrink-0 flex-col items-center justify-center border-t border-white/10 bg-[#0c101a] p-8 sm:p-12 lg:w-[500px] lg:border-t-0 lg:border-l lg:p-14 xl:w-[560px]",
                                children: (0, d.jsxs)("div", {
                                    className: "profile-enter flex w-full max-w-md flex-col items-center text-center",
                                    children: [
                                        (0, d.jsx)("div", { className: "mb-6 flex justify-center", children: (0, d.jsx)(l.PokeballLogo, { size: "lg", animated: !0, color: "#ef4444" }) }),
                                        (0, d.jsx)("h2", { className: "text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent", children: "MyPokeBinder" }),
                                        (0, d.jsx)("p", { className: "mt-3 mb-8 max-w-[36ch] text-sm leading-relaxed text-slate-400 sm:text-base", children: "Seu binder digital 3\xd73 dos 151 originais." }),
                                        c && (0, d.jsx)("div", { className: "mb-6 w-full rounded-xl border border-red-500/30 bg-red-500/15 p-3.5 text-xs text-red-200", children: "Ocorreu uma falha na autentica\xe7\xe3o. Por favor, tente novamente." }),
                                        (0, d.jsxs)("button", {
                                            type: "button",
                                            onClick: g,
                                            disabled: a,
                                            className: "flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#ef4444] py-4 px-6 text-base font-semibold text-white transition-all hover:bg-[#dc2626] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70",
                                            children: [
                                                (0, d.jsxs)("svg", {
                                                    width: "22",
                                                    height: "22",
                                                    viewBox: "0 0 24 24",
                                                    "aria-hidden": !0,
                                                    children: [
                                                        (0, d.jsx)("path", { fill: "currentColor", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }),
                                                        (0, d.jsx)("path", { fill: "currentColor", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
                                                        (0, d.jsx)("path", { fill: "currentColor", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" }),
                                                        (0, d.jsx)("path", { fill: "currentColor", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" }),
                                                    ],
                                                }),
                                                a ? "Conectando ao Google..." : "Entrar com Google",
                                            ],
                                        }),
                                        (0, d.jsx)("p", { className: "mt-8 text-xs leading-relaxed text-slate-500", children: "Ao entrar, voc\xea sincroniza e gerencia suas cartas com seguran\xe7a em qualquer dispositivo." }),
                                        (0, d.jsxs)("div", {
                                            className: "mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-white/10 pt-4 text-xs text-slate-400",
                                            children: [
                                                (0, d.jsx)(h(), { href: "/inicio", className: "transition-colors hover:text-white", children: "P\xe1gina Inicial" }),
                                                (0, d.jsx)("span", { className: "text-slate-600", children: "-" }),
                                                (0, d.jsx)(h(), { href: "/termos", className: "transition-colors hover:text-white", children: "Termos de Servi\xe7o" }),
                                                (0, d.jsx)("span", { className: "text-slate-600", children: "-" }),
                                                (0, d.jsx)(h(), { href: "/privacidade", className: "transition-colors hover:text-white", children: "Pol\xedtica de Privacidade" }),
                                            ],
                                        }),
                                    ],
                                }),
                            }),
                        ],
                    });
                }
                function q() {
                    return (0, d.jsx)(e.Suspense, { fallback: (0, d.jsx)("div", { className: "min-h-[100dvh] bg-[#07090e]" }), children: (0, d.jsx)(p, {}) });
                }
            },
            33873: (a) => {
                "use strict";
                a.exports = require("path");
            },
            41025: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/dynamic-access-async-storage.external.js");
            },
            63033: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
            },
            67685: (a, b, c) => {
                "use strict";
                c.d(b, { E: () => h });
                var d = c(21124),
                    e = c(38301),
                    f = c(37108);
                let g = [
                        { dexId: 6, name: "Charizard", style: { top: "3%", left: "2%", width: "240px", height: "240px", animationDelay: "0s" }, floatClass: "animate-pokemon-float-1", opacityQuiet: "opacity-35", opacityFull: "opacity-50", glowFull: "drop-shadow-[0_0_40px_rgba(239,68,68,0.5)]" },
                        { dexId: 144, name: "Articuno", style: { top: "6%", left: "28%", width: "190px", height: "190px", animationDelay: "-15s" }, floatClass: "animate-pokemon-float-1", opacityQuiet: "opacity-30", opacityFull: "opacity-45", glowFull: "drop-shadow-[0_0_35px_rgba(56,189,248,0.5)]" },
                        { dexId: 151, name: "Mew", style: { top: "4%", left: "54%", width: "180px", height: "180px", animationDelay: "-8s" }, floatClass: "animate-pokemon-drift", opacityQuiet: "opacity-40", opacityFull: "opacity-70", glowFull: "drop-shadow-[0_0_40px_rgba(244,114,182,0.6)]" },
                        { dexId: 149, name: "Dragonite", style: { top: "2%", right: "3%", width: "230px", height: "230px", animationDelay: "-11s" }, floatClass: "animate-pokemon-float-2", opacityQuiet: "opacity-30", opacityFull: "opacity-45", glowFull: "drop-shadow-[0_0_35px_rgba(245,158,11,0.4)]" },
                        { dexId: 3, name: "Venusaur", style: { top: "24%", left: "8%", width: "200px", height: "200px", animationDelay: "-9s" }, floatClass: "animate-pokemon-float-2", opacityQuiet: "opacity-28", opacityFull: "opacity-40", glowFull: "drop-shadow-[0_0_35px_rgba(34,197,94,0.4)]" },
                        { dexId: 65, name: "Alakazam", style: { top: "22%", left: "38%", width: "170px", height: "170px", animationDelay: "-14s" }, floatClass: "animate-pokemon-float-3", opacityQuiet: "opacity-25", opacityFull: "opacity-35", glowFull: "drop-shadow-[0_0_30px_rgba(234,179,8,0.4)]" },
                        { dexId: 145, name: "Zapdos", style: { top: "20%", right: "18%", width: "200px", height: "200px", animationDelay: "-10s" }, floatClass: "animate-pokemon-float-1", opacityQuiet: "opacity-30", opacityFull: "opacity-45", glowFull: "drop-shadow-[0_0_35px_rgba(234,179,8,0.45)]" },
                        { dexId: 25, name: "Pikachu", style: { top: "32%", right: "4%", width: "160px", height: "160px", animationDelay: "-2s" }, floatClass: "animate-pokemon-float-3", opacityQuiet: "opacity-40", opacityFull: "opacity-65", glowFull: "drop-shadow-[0_0_35px_rgba(250,204,21,0.55)]" },
                        { dexId: 94, name: "Gengar", style: { top: "48%", left: "3%", width: "210px", height: "210px", animationDelay: "-4s" }, floatClass: "animate-pokemon-float-2", opacityQuiet: "opacity-35", opacityFull: "opacity-55", glowFull: "drop-shadow-[0_0_40px_rgba(168,85,247,0.5)]" },
                        { dexId: 93, name: "Haunter", style: { top: "52%", left: "30%", width: "170px", height: "170px", animationDelay: "-12s" }, floatClass: "animate-pokemon-float-2", opacityQuiet: "opacity-32", opacityFull: "opacity-50", glowFull: "drop-shadow-[0_0_35px_rgba(147,51,234,0.45)]" },
                        { dexId: 150, name: "Mewtwo", style: { top: "46%", right: "22%", width: "210px", height: "210px", animationDelay: "-7s" }, floatClass: "animate-pokemon-drift", opacityQuiet: "opacity-28", opacityFull: "opacity-40", glowFull: "drop-shadow-[0_0_40px_rgba(192,132,252,0.45)]" },
                        { dexId: 133, name: "Eevee", style: { top: "55%", right: "5%", width: "150px", height: "150px", animationDelay: "-3s" }, floatClass: "animate-pokemon-float-3", opacityQuiet: "opacity-38", opacityFull: "opacity-60", glowFull: "drop-shadow-[0_0_30px_rgba(217,119,6,0.4)]" },
                        { dexId: 9, name: "Blastoise", style: { bottom: "4%", left: "10%", width: "230px", height: "230px", animationDelay: "-6s" }, floatClass: "animate-pokemon-float-1", opacityQuiet: "opacity-32", opacityFull: "opacity-50", glowFull: "drop-shadow-[0_0_40px_rgba(59,130,246,0.45)]" },
                        { dexId: 130, name: "Gyarados", style: { bottom: "6%", left: "42%", width: "230px", height: "230px", animationDelay: "-5s" }, floatClass: "animate-pokemon-drift", opacityQuiet: "opacity-28", opacityFull: "opacity-40", glowFull: "drop-shadow-[0_0_40px_rgba(56,189,248,0.45)]" },
                        { dexId: 143, name: "Snorlax", style: { bottom: "3%", right: "8%", width: "220px", height: "220px", animationDelay: "-13s" }, floatClass: "animate-pokemon-float-1", opacityQuiet: "opacity-25", opacityFull: "opacity-35", glowFull: "drop-shadow-[0_0_35px_rgba(100,116,139,0.35)]" },
                    ],
                    h = (0, e.memo)(function ({ intensity: a = "full" }) {
                        let b = "quiet" === a;
                        return (0, d.jsxs)("div", {
                            className: "pointer-events-none absolute inset-0 overflow-hidden select-none",
                            children: [
                                (0, d.jsx)("div", { className: "absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full bg-red-600/12 blur-[150px]" }),
                                (0, d.jsx)("div", { className: "absolute top-[12%] right-[-10%] h-[560px] w-[560px] rounded-full bg-amber-500/10 blur-[150px]" }),
                                !b && (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("div", { className: "absolute top-1/2 left-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/12 blur-[150px]" }), (0, d.jsx)("div", { className: "absolute -bottom-40 right-[8%] h-[650px] w-[650px] rounded-full bg-purple-600/12 blur-[160px]" })] }),
                                b && (0, d.jsx)("div", { className: "absolute -bottom-40 right-[8%] h-[650px] w-[650px] rounded-full bg-red-600/8 blur-[160px]" }),
                                (0, d.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-50" }),
                                g.map((a) => {
                                    let c = b ? a.opacityQuiet : a.opacityFull,
                                        e = b ? "drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]" : a.glowFull;
                                    return (0, d.jsx)("div", { style: a.style, className: `absolute transition-transform duration-1000 filter ${a.floatClass} ${c} ${e}`, children: (0, d.jsx)("img", { src: (0, f.Xw)(a.dexId), alt: a.name, loading: "lazy", draggable: !1, className: "h-full w-full object-contain select-none" }) }, a.dexId);
                                }),
                            ],
                        });
                    });
            },
            68735: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { GlobalError: () => E.a, __next_app__: () => K, handler: () => M, pages: () => J, routeModule: () => L, tree: () => I }));
                var d = c(49754),
                    e = c(9117),
                    f = c(46595),
                    g = c(32324),
                    h = c(39326),
                    i = c(38928),
                    j = c(20175),
                    k = c(12),
                    l = c(54290),
                    m = c(12696),
                    n = c(52574),
                    o = c(82802),
                    p = c(77533),
                    q = c(45229),
                    r = c(32822),
                    s = c(261),
                    t = c(26453),
                    u = c(52474),
                    v = c(26713),
                    w = c(51356),
                    x = c(62685),
                    y = c(36225),
                    z = c(63446),
                    A = c(2762),
                    B = c(45742),
                    C = c(86439),
                    D = c(81170),
                    E = c.n(D),
                    F = c(62506),
                    G = c(91203),
                    H = {};
                for (let a in F) 0 > ["default", "tree", "pages", "GlobalError", "__next_app__", "routeModule", "handler"].indexOf(a) && (H[a] = () => F[a]);
                c.d(b, H);
                let I = {
                        children: [
                            "",
                            { children: ["login", { children: ["__PAGE__", {}, { page: [() => Promise.resolve().then(c.bind(c, 15109)), "/home/paulo_rosado/MyPokeBinder/src/app/login/page.tsx"] }] }, {}] },
                            {
                                layout: [() => Promise.resolve().then(c.bind(c, 51472)), "/home/paulo_rosado/MyPokeBinder/src/app/layout.tsx"],
                                "global-error": [() => Promise.resolve().then(c.t.bind(c, 81170, 23)), "next/dist/client/components/builtin/global-error.js"],
                                "not-found": [() => Promise.resolve().then(c.bind(c, 59732)), "/home/paulo_rosado/MyPokeBinder/src/app/not-found.tsx"],
                                forbidden: [() => Promise.resolve().then(c.t.bind(c, 90461, 23)), "next/dist/client/components/builtin/forbidden.js"],
                                unauthorized: [() => Promise.resolve().then(c.t.bind(c, 32768, 23)), "next/dist/client/components/builtin/unauthorized.js"],
                            },
                        ],
                    }.children,
                    J = ["/home/paulo_rosado/MyPokeBinder/src/app/login/page.tsx"],
                    K = { require: c, loadChunk: () => Promise.resolve() },
                    L = new d.AppPageRouteModule({ definition: { kind: e.RouteKind.APP_PAGE, page: "/login/page", pathname: "/login", bundlePath: "", filename: "", appPaths: [] }, userland: { loaderTree: I }, distDir: ".next", relativeProjectDir: "" });
                async function M(a, b, d) {
                    var D;
                    let H = "/login/page";
                    "/index" === H && (H = "/");
                    let N = (0, h.getRequestMeta)(a, "postponed"),
                        O = (0, h.getRequestMeta)(a, "minimalMode"),
                        P = await L.prepare(a, b, { srcPage: H, multiZoneDraftMode: !1 });
                    if (!P) return ((b.statusCode = 400), b.end("Bad Request"), null == d.waitUntil || d.waitUntil.call(d, Promise.resolve()), null);
                    let { buildId: Q, query: R, params: S, parsedUrl: T, pageIsDynamic: U, buildManifest: V, nextFontManifest: W, reactLoadableManifest: X, serverActionsManifest: Y, clientReferenceManifest: Z, subresourceIntegrityManifest: $, prerenderManifest: _, isDraftMode: aa, resolvedPathname: ab, revalidateOnlyGenerated: ac, routerServerContext: ad, nextConfig: ae, interceptionRoutePatterns: af } = P,
                        ag = T.pathname || "/",
                        ah = (0, s.normalizeAppPath)(H),
                        { isOnDemandRevalidate: ai } = P,
                        aj = L.match(ag, _),
                        ak = !!_.routes[ab],
                        al = !!(aj || ak || _.routes[ah]),
                        am = a.headers["user-agent"] || "",
                        an = (0, v.getBotType)(am),
                        ao = (0, q.isHtmlBotRequest)(a),
                        ap = (0, h.getRequestMeta)(a, "isPrefetchRSCRequest") ?? "1" === a.headers[u.NEXT_ROUTER_PREFETCH_HEADER],
                        aq = (0, h.getRequestMeta)(a, "isRSCRequest") ?? (0, n.f)(a.headers[u.RSC_HEADER]),
                        ar = (0, t.getIsPossibleServerAction)(a),
                        as = (0, m.checkIsAppPPREnabled)(ae.experimental.ppr) && (null == (D = _.routes[ah] ?? _.dynamicRoutes[ah]) ? void 0 : D.renderingMode) === "PARTIALLY_STATIC",
                        at = !1,
                        au = !1,
                        av = as ? N : void 0,
                        aw = as && aq && !ap,
                        ax = (0, h.getRequestMeta)(a, "segmentPrefetchRSCRequest"),
                        ay = !am || (0, q.shouldServeStreamingMetadata)(am, ae.htmlLimitedBots);
                    ao && as && ((al = !1), (ay = !1));
                    let az = !0 === L.isDev || !al || "string" == typeof N || aw,
                        aA = ao && as,
                        aB = null;
                    aa || !al || az || ar || av || aw || (aB = ab);
                    let aC = aB;
                    (!aC && L.isDev && (aC = ab), L.isDev || aa || !al || !aq || aw || (0, k.d)(a.headers));
                    let aD = { ...F, tree: I, pages: J, GlobalError: E(), handler: M, routeModule: L, __next_app__: K };
                    Y && Z && (0, p.setReferenceManifestsSingleton)({ page: H, clientReferenceManifest: Z, serverActionsManifest: Y, serverModuleMap: (0, r.createServerModuleMap)({ serverActionsManifest: Y }) });
                    let aE = a.method || "GET",
                        aF = (0, g.getTracer)(),
                        aG = aF.getActiveScopeSpan();
                    try {
                        let f = L.getVaryHeader(ab, af);
                        b.setHeader("Vary", f);
                        let k = async (c, d) => {
                                let e = new l.NodeNextRequest(a),
                                    f = new l.NodeNextResponse(b);
                                return L.render(e, f, d).finally(() => {
                                    if (!c) return;
                                    c.setAttributes({ "http.status_code": b.statusCode, "next.rsc": !1 });
                                    let d = aF.getRootSpanAttributes();
                                    if (!d) return;
                                    if (d.get("next.span_type") !== i.BaseServerSpan.handleRequest) return void console.warn(`Unexpected root span type '${d.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);
                                    let e = d.get("next.route");
                                    if (e) {
                                        let a = `${aE} ${e}`;
                                        (c.setAttributes({ "next.route": e, "http.route": e, "next.span_name": a }), c.updateName(a));
                                    } else c.updateName(`${aE} ${a.url}`);
                                });
                            },
                            m = async ({ span: e, postponed: f, fallbackRouteParams: g }) => {
                                let i = {
                                        query: R,
                                        params: S,
                                        page: ah,
                                        sharedContext: { buildId: Q },
                                        serverComponentsHmrCache: (0, h.getRequestMeta)(a, "serverComponentsHmrCache"),
                                        fallbackRouteParams: g,
                                        renderOpts: {
                                            App: () => null,
                                            Document: () => null,
                                            pageConfig: {},
                                            ComponentMod: aD,
                                            Component: (0, j.T)(aD),
                                            params: S,
                                            routeModule: L,
                                            page: H,
                                            postponed: f,
                                            shouldWaitOnAllReady: aA,
                                            serveStreamingMetadata: ay,
                                            supportsDynamicResponse: "string" == typeof f || az,
                                            buildManifest: V,
                                            nextFontManifest: W,
                                            reactLoadableManifest: X,
                                            subresourceIntegrityManifest: $,
                                            serverActionsManifest: Y,
                                            clientReferenceManifest: Z,
                                            setIsrStatus: null == ad ? void 0 : ad.setIsrStatus,
                                            dir: c(33873).join(process.cwd(), L.relativeProjectDir),
                                            isDraftMode: aa,
                                            isRevalidate: al && !f && !aw,
                                            botType: an,
                                            isOnDemandRevalidate: ai,
                                            isPossibleServerAction: ar,
                                            assetPrefix: ae.assetPrefix,
                                            nextConfigOutput: ae.output,
                                            crossOrigin: ae.crossOrigin,
                                            trailingSlash: ae.trailingSlash,
                                            previewProps: _.preview,
                                            deploymentId: ae.deploymentId,
                                            enableTainting: ae.experimental.taint,
                                            htmlLimitedBots: ae.htmlLimitedBots,
                                            devtoolSegmentExplorer: ae.experimental.devtoolSegmentExplorer,
                                            reactMaxHeadersLength: ae.reactMaxHeadersLength,
                                            multiZoneDraftMode: !1,
                                            incrementalCache: (0, h.getRequestMeta)(a, "incrementalCache"),
                                            cacheLifeProfiles: ae.experimental.cacheLife,
                                            basePath: ae.basePath,
                                            serverActions: ae.experimental.serverActions,
                                            ...(at ? { nextExport: !0, supportsDynamicResponse: !1, isStaticGeneration: !0, isRevalidate: !0, isDebugDynamicAccesses: at } : {}),
                                            experimental: {
                                                isRoutePPREnabled: as,
                                                expireTime: ae.expireTime,
                                                staleTimes: ae.experimental.staleTimes,
                                                cacheComponents: !!ae.experimental.cacheComponents,
                                                clientSegmentCache: !!ae.experimental.clientSegmentCache,
                                                clientParamParsing: !!ae.experimental.clientParamParsing,
                                                dynamicOnHover: !!ae.experimental.dynamicOnHover,
                                                inlineCss: !!ae.experimental.inlineCss,
                                                authInterrupts: !!ae.experimental.authInterrupts,
                                                clientTraceMetadata: ae.experimental.clientTraceMetadata || [],
                                            },
                                            waitUntil: d.waitUntil,
                                            onClose: (a) => {
                                                b.on("close", a);
                                            },
                                            onAfterTaskError: () => {},
                                            onInstrumentationRequestError: (b, c, d) => L.onRequestError(a, b, d, ad),
                                            err: (0, h.getRequestMeta)(a, "invokeError"),
                                            dev: L.isDev,
                                        },
                                    },
                                    l = await k(e, i),
                                    { metadata: m } = l,
                                    { cacheControl: n, headers: o = {}, fetchTags: p } = m;
                                if ((p && (o[z.NEXT_CACHE_TAGS_HEADER] = p), (a.fetchMetrics = m.fetchMetrics), al && (null == n ? void 0 : n.revalidate) === 0 && !L.isDev && !as)) {
                                    let a = m.staticBailoutInfo,
                                        b = Object.defineProperty(
                                            Error(`Page changed from static to dynamic at runtime ${ab}${(null == a ? void 0 : a.description) ? `, reason: ${a.description}` : ""}
see more here https://nextjs.org/docs/messages/app-static-to-dynamic-error`),
                                            "__NEXT_ERROR_CODE",
                                            { value: "E132", enumerable: !1, configurable: !0 },
                                        );
                                    if (null == a ? void 0 : a.stack) {
                                        let c = a.stack;
                                        b.stack = b.message + c.substring(c.indexOf("\n"));
                                    }
                                    throw b;
                                }
                                return { value: { kind: w.CachedRouteKind.APP_PAGE, html: l, headers: o, rscData: m.flightData, postponed: m.postponed, status: m.statusCode, segmentData: m.segmentData }, cacheControl: n };
                            },
                            n = async ({ hasResolved: c, previousCacheEntry: f, isRevalidating: g, span: i }) => {
                                let j,
                                    k = !1 === L.isDev,
                                    l = c || b.writableEnded;
                                if (ai && ac && !f && !O) return ((null == ad ? void 0 : ad.render404) ? await ad.render404(a, b) : ((b.statusCode = 404), b.end("This page could not be found")), null);
                                if ((aj && (j = (0, x.parseFallbackField)(aj.fallback)), j === x.FallbackMode.PRERENDER && (0, v.isBot)(am) && (!as || ao) && (j = x.FallbackMode.BLOCKING_STATIC_RENDER), (null == f ? void 0 : f.isStale) === -1 && (ai = !0), ai && (j !== x.FallbackMode.NOT_FOUND || f) && (j = x.FallbackMode.BLOCKING_STATIC_RENDER), !O && j !== x.FallbackMode.BLOCKING_STATIC_RENDER && aC && !l && !aa && U && (k || !ak))) {
                                    let b;
                                    if ((k || aj) && j === x.FallbackMode.NOT_FOUND) throw new C.NoFallbackError();
                                    if (as && !aq) {
                                        let c = "string" == typeof (null == aj ? void 0 : aj.fallback) ? aj.fallback : k ? ah : null;
                                        if (((b = await L.handleResponse({ cacheKey: c, req: a, nextConfig: ae, routeKind: e.RouteKind.APP_PAGE, isFallback: !0, prerenderManifest: _, isRoutePPREnabled: as, responseGenerator: async () => m({ span: i, postponed: void 0, fallbackRouteParams: k || au ? (0, o.u)(ah) : null }), waitUntil: d.waitUntil })), null === b)) return null;
                                        if (b) return (delete b.cacheControl, b);
                                    }
                                }
                                let n = ai || g || !av ? void 0 : av;
                                if (at && void 0 !== n) return { cacheControl: { revalidate: 1, expire: void 0 }, value: { kind: w.CachedRouteKind.PAGES, html: y.default.EMPTY, pageData: {}, headers: void 0, status: void 0 } };
                                let p = U && as && ((0, h.getRequestMeta)(a, "renderFallbackShell") || au) ? (0, o.u)(ag) : null;
                                return m({ span: i, postponed: n, fallbackRouteParams: p });
                            },
                            p = async (c) => {
                                var f, g, i, j, k;
                                let l,
                                    o = await L.handleResponse({ cacheKey: aB, responseGenerator: (a) => n({ span: c, ...a }), routeKind: e.RouteKind.APP_PAGE, isOnDemandRevalidate: ai, isRoutePPREnabled: as, req: a, nextConfig: ae, prerenderManifest: _, waitUntil: d.waitUntil });
                                if ((aa && b.setHeader("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate"), L.isDev && b.setHeader("Cache-Control", "no-store, must-revalidate"), !o)) {
                                    if (aB) throw Object.defineProperty(Error("invariant: cache entry required but not generated"), "__NEXT_ERROR_CODE", { value: "E62", enumerable: !1, configurable: !0 });
                                    return null;
                                }
                                if ((null == (f = o.value) ? void 0 : f.kind) !== w.CachedRouteKind.APP_PAGE) throw Object.defineProperty(Error(`Invariant app-page handler received invalid cache entry ${null == (i = o.value) ? void 0 : i.kind}`), "__NEXT_ERROR_CODE", { value: "E707", enumerable: !1, configurable: !0 });
                                let p = "string" == typeof o.value.postponed;
                                al && !aw && (!p || ap) && (O || b.setHeader("x-nextjs-cache", ai ? "REVALIDATED" : o.isMiss ? "MISS" : o.isStale ? "STALE" : "HIT"), b.setHeader(u.NEXT_IS_PRERENDER_HEADER, "1"));
                                let { value: q } = o;
                                if (av) l = { revalidate: 0, expire: void 0 };
                                else if (O && aq && !ap && as) l = { revalidate: 0, expire: void 0 };
                                else if (!L.isDev)
                                    if (aa) l = { revalidate: 0, expire: void 0 };
                                    else if (al) {
                                        if (o.cacheControl)
                                            if ("number" == typeof o.cacheControl.revalidate) {
                                                if (o.cacheControl.revalidate < 1) throw Object.defineProperty(Error(`Invalid revalidate configuration provided: ${o.cacheControl.revalidate} < 1`), "__NEXT_ERROR_CODE", { value: "E22", enumerable: !1, configurable: !0 });
                                                l = { revalidate: o.cacheControl.revalidate, expire: (null == (j = o.cacheControl) ? void 0 : j.expire) ?? ae.expireTime };
                                            } else l = { revalidate: z.CACHE_ONE_YEAR, expire: void 0 };
                                    } else b.getHeader("Cache-Control") || (l = { revalidate: 0, expire: void 0 });
                                if (((o.cacheControl = l), "string" == typeof ax && (null == q ? void 0 : q.kind) === w.CachedRouteKind.APP_PAGE && q.segmentData)) {
                                    b.setHeader(u.NEXT_DID_POSTPONE_HEADER, "2");
                                    let c = null == (k = q.headers) ? void 0 : k[z.NEXT_CACHE_TAGS_HEADER];
                                    O && al && c && "string" == typeof c && b.setHeader(z.NEXT_CACHE_TAGS_HEADER, c);
                                    let d = q.segmentData.get(ax);
                                    return void 0 !== d ? (0, B.sendRenderResult)({ req: a, res: b, generateEtags: ae.generateEtags, poweredByHeader: ae.poweredByHeader, result: y.default.fromStatic(d, u.RSC_CONTENT_TYPE_HEADER), cacheControl: o.cacheControl }) : ((b.statusCode = 204), (0, B.sendRenderResult)({ req: a, res: b, generateEtags: ae.generateEtags, poweredByHeader: ae.poweredByHeader, result: y.default.EMPTY, cacheControl: o.cacheControl }));
                                }
                                let r = (0, h.getRequestMeta)(a, "onCacheEntry");
                                if (r && (await r({ ...o, value: { ...o.value, kind: "PAGE" } }, { url: (0, h.getRequestMeta)(a, "initURL") }))) return null;
                                if (p && av) throw Object.defineProperty(Error("Invariant: postponed state should not be present on a resume request"), "__NEXT_ERROR_CODE", { value: "E396", enumerable: !1, configurable: !0 });
                                if (q.headers) {
                                    let a = { ...q.headers };
                                    for (let [c, d] of ((O && al) || delete a[z.NEXT_CACHE_TAGS_HEADER], Object.entries(a)))
                                        if (void 0 !== d)
                                            if (Array.isArray(d)) for (let a of d) b.appendHeader(c, a);
                                            else ("number" == typeof d && (d = d.toString()), b.appendHeader(c, d));
                                }
                                let s = null == (g = q.headers) ? void 0 : g[z.NEXT_CACHE_TAGS_HEADER];
                                if ((O && al && s && "string" == typeof s && b.setHeader(z.NEXT_CACHE_TAGS_HEADER, s), !q.status || (aq && as) || (b.statusCode = q.status), !O && q.status && G.RedirectStatusCode[q.status] && aq && (b.statusCode = 200), p && b.setHeader(u.NEXT_DID_POSTPONE_HEADER, "1"), aq && !aa)) {
                                    if (void 0 === q.rscData) {
                                        if (q.postponed) throw Object.defineProperty(Error("Invariant: Expected postponed to be undefined"), "__NEXT_ERROR_CODE", { value: "E372", enumerable: !1, configurable: !0 });
                                        return (0, B.sendRenderResult)({ req: a, res: b, generateEtags: ae.generateEtags, poweredByHeader: ae.poweredByHeader, result: q.html, cacheControl: aw ? { revalidate: 0, expire: void 0 } : o.cacheControl });
                                    }
                                    return (0, B.sendRenderResult)({ req: a, res: b, generateEtags: ae.generateEtags, poweredByHeader: ae.poweredByHeader, result: y.default.fromStatic(q.rscData, u.RSC_CONTENT_TYPE_HEADER), cacheControl: o.cacheControl });
                                }
                                let t = q.html;
                                if (!p || O || aq) return (0, B.sendRenderResult)({ req: a, res: b, generateEtags: ae.generateEtags, poweredByHeader: ae.poweredByHeader, result: t, cacheControl: o.cacheControl });
                                if (at)
                                    return (
                                        t.push(
                                            new ReadableStream({
                                                start(a) {
                                                    (a.enqueue(A.ENCODED_TAGS.CLOSED.BODY_AND_HTML), a.close());
                                                },
                                            }),
                                        ),
                                        (0, B.sendRenderResult)({ req: a, res: b, generateEtags: ae.generateEtags, poweredByHeader: ae.poweredByHeader, result: t, cacheControl: { revalidate: 0, expire: void 0 } })
                                    );
                                let v = new TransformStream();
                                return (
                                    t.push(v.readable),
                                    m({ span: c, postponed: q.postponed, fallbackRouteParams: null })
                                        .then(async (a) => {
                                            var b, c;
                                            if (!a) throw Object.defineProperty(Error("Invariant: expected a result to be returned"), "__NEXT_ERROR_CODE", { value: "E463", enumerable: !1, configurable: !0 });
                                            if ((null == (b = a.value) ? void 0 : b.kind) !== w.CachedRouteKind.APP_PAGE) throw Object.defineProperty(Error(`Invariant: expected a page response, got ${null == (c = a.value) ? void 0 : c.kind}`), "__NEXT_ERROR_CODE", { value: "E305", enumerable: !1, configurable: !0 });
                                            await a.value.html.pipeTo(v.writable);
                                        })
                                        .catch((a) => {
                                            v.writable.abort(a).catch((a) => {
                                                console.error("couldn't abort transformer", a);
                                            });
                                        }),
                                    (0, B.sendRenderResult)({ req: a, res: b, generateEtags: ae.generateEtags, poweredByHeader: ae.poweredByHeader, result: t, cacheControl: { revalidate: 0, expire: void 0 } })
                                );
                            };
                        if (!aG) return await aF.withPropagatedContext(a.headers, () => aF.trace(i.BaseServerSpan.handleRequest, { spanName: `${aE} ${a.url}`, kind: g.SpanKind.SERVER, attributes: { "http.method": aE, "http.target": a.url } }, p));
                        await p(aG);
                    } catch (b) {
                        throw (b instanceof C.NoFallbackError || (await L.onRequestError(a, b, { routerKind: "App Router", routePath: H, routeType: "render", revalidateReason: (0, f.c)({ isRevalidate: al, isOnDemandRevalidate: ai }) }, ad)), b);
                    }
                }
            },
            80971: (a, b, c) => {
                Promise.resolve().then(c.bind(c, 30311));
            },
            86439: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/no-fallback-error.external");
            },
        }));
    var b = require("../../webpack-runtime.js");
    b.C(a);
    var c = b.X(0, [8301, 991, 582, 1160, 6849], () => b((b.s = 68735)));
    module.exports = c;
})();
