(() => {
    var a = {};
    ((a.id = 3662),
        (a.ids = [3662]),
        (a.modules = {
            261: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/router/utils/app-paths");
            },
            982: (a, b, c) => {
                Promise.resolve().then(c.bind(c, 37731));
            },
            3295: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
            },
            6588: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { default: () => f }));
                var d = c(75338),
                    e = c(52341);
                function f() {
                    return (0, d.jsx)(e.RouteLoading, { message: "Carregando binder...", className: "flex min-h-screen flex-col items-center justify-center bg-[#0a0c10]" });
                }
            },
            10846: (a) => {
                "use strict";
                a.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
            },
            19121: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/action-async-storage.external.js");
            },
            22115: (a, b, c) => {
                "use strict";
                c.d(b, { UniversalBinderViewer: () => d });
                let d = (0, c(97954).registerClientReference)(
                    function () {
                        throw Error("Attempted to call UniversalBinderViewer() from the server but UniversalBinderViewer is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
                    },
                    "/home/paulo_rosado/MyPokeBinder/src/components/binder/UniversalBinderViewer.tsx",
                    "UniversalBinderViewer",
                );
            },
            26034: (a, b, c) => {
                Promise.resolve().then(c.bind(c, 22115));
            },
            26713: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/router/utils/is-bot");
            },
            27616: (a, b, c) => {
                "use strict";
                function d(a) {
                    let b = Math.max(1, Math.trunc(a) || 1);
                    return b + (b % 2);
                }
                function e(a) {
                    let b = Math.max(1, Math.trunc(a) || 1);
                    return b % 2 == 1 ? b + 1 : null;
                }
                c.d(b, { m: () => e, r: () => d });
            },
            28354: (a) => {
                "use strict";
                a.exports = require("util");
            },
            29294: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/work-async-storage.external.js");
            },
            33873: (a) => {
                "use strict";
                a.exports = require("path");
            },
            36965: (a, b, c) => {
                "use strict";
                c.d(b, { B8: () => g, ZK: () => f, m$: () => h });
                var d = c(4408),
                    e = c(79281);
                function f(a) {
                    if (
                        !(function (a) {
                            if ("string" != typeof a) return !1;
                            try {
                                let b = new URL(a, "https://mypokebinder.local");
                                return "/api/cards" === b.pathname && ("" === b.search || "true" === b.searchParams.get("grouped"));
                            } catch {
                                return !1;
                            }
                        })(a)
                    )
                        return !1;
                    try {
                        return "true" === new URL(a, "https://mypokebinder.local").searchParams.get("grouped");
                    } catch {
                        return !1;
                    }
                }
                function g(a) {
                    if ("string" != typeof a || !a.startsWith("/api/cards")) return !1;
                    try {
                        let b = new URL(a, "https://mypokebinder.local");
                        return "/api/cards" === b.pathname && "true" !== b.searchParams.get("grouped");
                    } catch {
                        return !1;
                    }
                }
                function h(a, b, c) {
                    let f = (function (a) {
                        try {
                            let b = new URL(a, "https://mypokebinder.local");
                            if ("/api/cards" !== b.pathname || "true" !== b.searchParams.get("grouped")) return null;
                            return {
                                searchTerm: b.searchParams.get("search") ?? "",
                                statusFilter: b.searchParams.get("status") ?? "all",
                                languageFilter: b.searchParams.get("language") ?? "all",
                                rarityFilter: b.searchParams.get("rarity") ?? "all",
                                expansionFilter: b.searchParams.get("expansion") ?? "all",
                                variantFilter: b.searchParams.get("variant") ?? "all",
                                artistFilter: b.searchParams.get("artist") ?? "all",
                                sortField: b.searchParams.get("sort") ?? "dex",
                                sortDirection: b.searchParams.get("direction") ?? "asc",
                            };
                        } catch {
                            return null;
                        }
                    })(a);
                    if (!f) return b;
                    let g = new Map(c.updatedCards?.map((a) => [a.id, a])),
                        h = new Set(c.deletedCardIds),
                        i = new Set(c.addedCards?.map(e.qe));
                    if (!b.groups.some((a) => i.has(a.key) || a.copies.some((a) => g.has(a.id) || h.has(a.id) || c.clearBinderForPokemonDexId === a.pokemon_dex_id))) return b;
                    let j = b.groups
                        .flatMap((a) => a.copies)
                        .filter((a) => !h.has(a.id))
                        .map((a) => {
                            let b = c.clearBinderForPokemonDexId === a.pokemon_dex_id ? { ...a, is_in_binder: !1 } : a;
                            return g.get(a.id) ?? b;
                        });
                    for (let a of c.addedCards ?? []) !b.groups.some((b) => b.key === (0, e.qe)(a)) || h.has(a.id) || j.some((b) => b.id === a.id) || j.push(a);
                    let k = (0, d.a)((0, d.rM)(j), f);
                    return { ...b, groups: k, total: Math.max(0, b.total + k.length - b.groups.length) };
                }
            },
            37731: (a, b, c) => {
                "use strict";
                c.d(b, { RouteLoading: () => f });
                var d = c(21124),
                    e = c(59535);
                function f({ message: a = "Carregando...", className: b }) {
                    return (0, d.jsx)("main", { className: b || "flex flex-1 items-start justify-center pt-10 sm:pt-14 md:pt-18 pb-16", children: (0, d.jsx)(e.i, { message: a, size: "lg" }) });
                }
            },
            37934: (a, b, c) => {
                Promise.resolve().then(c.bind(c, 52341));
            },
            40029: (a, b, c) => {
                "use strict";
                c.d(b, { v: () => e, wZ: () => d });
                let d = {
                    classic_red: { id: "classic_red", name: "Vermelho Cl\xe1ssico", primaryColor: "#ef4444", glowColor: "rgba(239, 68, 68, 0.4)", bgGradient: "from-[#2b0f14] via-[#1a0c10] to-[#0c0608]", borderAccent: "#ef4444", leatherClass: "border-red-900/40 bg-[#160b0e]", ballType: "pokeball", material: "Couro granulado" },
                    ocean_blue: { id: "ocean_blue", name: "Azul Oceano", primaryColor: "#3b82f6", glowColor: "rgba(59, 130, 246, 0.4)", bgGradient: "from-[#0f1d2e] via-[#0c1524] to-[#060a12]", borderAccent: "#3b82f6", leatherClass: "border-blue-900/40 bg-[#0a111c]", ballType: "greatball", material: "Tecido t\xe9cnico" },
                    forest_green: { id: "forest_green", name: "Verde Floresta", primaryColor: "#10b981", glowColor: "rgba(16, 185, 129, 0.4)", bgGradient: "from-[#0e241b] via-[#091a13] to-[#050e0a]", borderAccent: "#10b981", leatherClass: "border-emerald-900/40 bg-[#07130e]", ballType: "safariball", material: "Lona encerada" },
                    electric_yellow: { id: "electric_yellow", name: "Amarelo El\xe9trico", primaryColor: "#eab308", glowColor: "rgba(234, 179, 8, 0.4)", bgGradient: "from-[#2b240f] via-[#1c170a] to-[#0d0b05]", borderAccent: "#eab308", leatherClass: "border-yellow-900/40 bg-[#141107]", ballType: "ultraball", material: "Vinil texturizado" },
                    shadow_purple: { id: "shadow_purple", name: "Roxo Noturno", primaryColor: "#a855f7", glowColor: "rgba(168, 85, 247, 0.4)", bgGradient: "from-[#23102d] via-[#180a20] to-[#0b040f]", borderAccent: "#a855f7", leatherClass: "border-purple-900/40 bg-[#120718]", ballType: "masterball", material: "Couro escovado" },
                    charcoal_black: { id: "charcoal_black", name: "Couro Preto \xd4nix", primaryColor: "#94a3b8", glowColor: "rgba(148, 163, 184, 0.3)", bgGradient: "from-[#1c202a] via-[#13161e] to-[#090b0e]", borderAccent: "#cbd5e1", leatherClass: "border-slate-800 bg-[#0d0f14]", ballType: "duskball", material: "Couro liso" },
                    golden_luxury: { id: "golden_luxury", name: "Dourado Nobre", primaryColor: "#f59e0b", glowColor: "rgba(245, 158, 11, 0.45)", bgGradient: "from-[#33220e] via-[#211508] to-[#0f0904]", borderAccent: "#f59e0b", leatherClass: "border-amber-900/40 bg-[#170f06]", ballType: "luxuryball", material: "Couro acetinado" },
                };
                function e(a) {
                    return d[a || "classic_red"] || d.classic_red;
                }
                Object.keys(d);
            },
            41025: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/dynamic-access-async-storage.external.js");
            },
            52341: (a, b, c) => {
                "use strict";
                c.d(b, { RouteLoading: () => d });
                let d = (0, c(97954).registerClientReference)(
                    function () {
                        throw Error("Attempted to call RouteLoading() from the server but RouteLoading is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
                    },
                    "/home/paulo_rosado/MyPokeBinder/src/components/loading/RouteLoading.tsx",
                    "RouteLoading",
                );
            },
            53197: (a, b, c) => {
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
                            { children: ["binders", { children: ["[id]", { children: ["__PAGE__", {}, { page: [() => Promise.resolve().then(c.bind(c, 75223)), "/home/paulo_rosado/MyPokeBinder/src/app/binders/[id]/page.tsx"] }] }, { loading: [() => Promise.resolve().then(c.bind(c, 6588)), "/home/paulo_rosado/MyPokeBinder/src/app/binders/[id]/loading.tsx"] }] }, {}] },
                            {
                                layout: [() => Promise.resolve().then(c.bind(c, 51472)), "/home/paulo_rosado/MyPokeBinder/src/app/layout.tsx"],
                                "global-error": [() => Promise.resolve().then(c.t.bind(c, 81170, 23)), "next/dist/client/components/builtin/global-error.js"],
                                "not-found": [() => Promise.resolve().then(c.bind(c, 59732)), "/home/paulo_rosado/MyPokeBinder/src/app/not-found.tsx"],
                                forbidden: [() => Promise.resolve().then(c.t.bind(c, 90461, 23)), "next/dist/client/components/builtin/forbidden.js"],
                                unauthorized: [() => Promise.resolve().then(c.t.bind(c, 32768, 23)), "next/dist/client/components/builtin/unauthorized.js"],
                            },
                        ],
                    }.children,
                    J = ["/home/paulo_rosado/MyPokeBinder/src/app/binders/[id]/page.tsx"],
                    K = { require: c, loadChunk: () => Promise.resolve() },
                    L = new d.AppPageRouteModule({ definition: { kind: e.RouteKind.APP_PAGE, page: "/binders/[id]/page", pathname: "/binders/[id]", bundlePath: "", filename: "", appPaths: [] }, userland: { loaderTree: I }, distDir: ".next", relativeProjectDir: "" });
                async function M(a, b, d) {
                    var D;
                    let H = "/binders/[id]/page";
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
            63033: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
            },
            72890: (a, b, c) => {
                Promise.resolve().then(c.bind(c, 90504));
            },
            75223: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { default: () => l, generateMetadata: () => k }));
                var d = c(75338),
                    e = c(74515),
                    f = c(82161),
                    g = c(48152),
                    h = c(90664),
                    i = c(22115);
                let j = (0, e.cache)(async (a) => (await (0, g.U)()).from("binders").select("*").eq("id", a).maybeSingle());
                async function k({ params: a }) {
                    let b = await a,
                        c = (0, h.rO)(b?.id);
                    if (!c || !h.Ii.test(c)) return { title: "Binder n\xe3o encontrado | MyPokeBinder" };
                    let { data: d } = await j(c);
                    return d ? { title: `${d.name} | MyPokeBinder`, description: d.description || `Visualizador do binder ${d.name} no MyPokeBinder.` } : { title: "Binder n\xe3o encontrado | MyPokeBinder" };
                }
                async function l({ params: a }) {
                    let b = await a,
                        c = (0, h.rO)(b?.id);
                    (c && h.Ii.test(c)) || (0, f.notFound)();
                    let e = await (0, g.U)(),
                        [k, l, m] = await Promise.all([e.auth.getUser(), j(c), e.from("binder_slots").select("*").eq("binder_id", c).order("page_number", { ascending: !0 }).order("slot_index", { ascending: !0 })]),
                        n = k.data?.user,
                        { data: o, error: p } = l;
                    (p || !o) && (0, f.notFound)();
                    let q = !!(n && n.id === o.user_id);
                    q || o.is_public || (0, f.notFound)();
                    let r = m.data ?? [],
                        s = r.map((a) => a.user_card_id).filter((a) => "string" == typeof a && !!a),
                        [t, u] = await Promise.all([s.length > 0 ? e.from("user_cards").select("*").in("id", s) : Promise.resolve({ data: [] }), n && q ? e.from("binders").select("id, name, grid_type").eq("user_id", n.id).order("created_at", { ascending: !0 }) : Promise.resolve({ data: [] })]),
                        v = new Map();
                    for (let a of t.data ?? []) v.set(a.id, a);
                    let w = r.map((a) => ({ ...a, card: (a.user_card_id && v.get(a.user_card_id)) || null })),
                        x = u.data ?? [];
                    return (0, d.jsx)(i.UniversalBinderViewer, { binder: o, initialSlots: w, otherBinders: x, isOwner: q });
                }
            },
            82382: (a, b, c) => {
                "use strict";
                (c.d(b, { B_: () => k, DS: () => f, Q4: () => i, SJ: () => l, Wn: () => e, h4: () => g, lz: () => h, s2: () => d, vf: () => j }), c(37108));
                let d = 650,
                    e = 0.65,
                    f = 320,
                    g = 384,
                    h = 560,
                    i = 480,
                    j = 676,
                    k = 56,
                    l = 999999;
            },
            86439: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/no-fallback-error.external");
            },
            90504: (a, b, c) => {
                "use strict";
                c.d(b, { UniversalBinderViewer: () => aM });
                var d = c(21124),
                    e = c(38301),
                    f = c(3991),
                    g = c.n(f),
                    h = c(42378),
                    i = c(21296),
                    j = c(79944),
                    k = c(85351),
                    l = c(71613),
                    m = c(23339);
                let n = (0, m.A)("ChartNoAxesColumn", [
                    ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
                    ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
                    ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }],
                ]);
                var o = c(94684);
                let p = (0, m.A)("ChevronLeft", [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]),
                    q = (0, m.A)("ChevronRight", [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]);
                var r = c(19463),
                    s = c(42830),
                    t = c(24515),
                    u = c(7401),
                    v = c(37108),
                    w = c(68686),
                    x = c(59535),
                    y = c(72937),
                    z = c(55716),
                    A = c(56849),
                    B = c(65687),
                    C = c(66088),
                    D = c(72190),
                    E = c(79281),
                    F = c(43157),
                    G = c(38984),
                    H = c(4408),
                    I = c(14153),
                    J = c(76186),
                    K = c(42593),
                    L = c(69587),
                    M = c(74097),
                    N = c(47089),
                    O = c(80196),
                    P = c(91942),
                    Q = c(75234),
                    R = c(65783),
                    S = c(28074),
                    T = c(86773),
                    U = c(70584),
                    V = c(24417),
                    W = c(88285),
                    X = c(8849),
                    Y = c(14263),
                    Z = c(78460);
                function $({ card: a, sizes: b = "(max-width: 768px) 50vw, 200px", maxTilt: c = 8, scale: f = 1, glareOpacity: g = 0.2, perspective: h = 900 }) {
                    let i = (0, u.HO)(a.card_image_url),
                        [j, k] = (0, e.useState)(() => (0, B.y7)(i)),
                        l = (0, E.WE)(a.card_variant, a.card_rarity, a.card_image_url, a.card_name),
                        m = (0, L.Mr)(a.card_types, a.pokemon_dex_id);
                    return (0, d.jsx)(A.LW, { className: "relative h-full w-full overflow-hidden rounded-lg", maxTilt: c, maxMove: 3, scale: f, glareOpacity: g, perspective: h, shineMode: l, elementTypes: m, isLoading: !j, children: (0, d.jsx)(B.MH, { src: i, alt: a.card_name, sizes: b, className: "object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]", onLoadingChange: k }) });
                }
                let _ = [
                        { value: "all", label: "Todos os idiomas" },
                        { value: "pt-br", label: "Portugu\xeas (PT-BR)", icon: (0, d.jsx)(y.i, { country: "pt-br" }) },
                        { value: "en", label: "Ingl\xeas (EN)", icon: (0, d.jsx)(y.i, { country: "en" }) },
                        { value: "ja", label: "Japon\xeas (JA)", icon: (0, d.jsx)(y.i, { country: "ja" }) },
                    ],
                    aa = [
                        { value: "name", label: "Nome" },
                        { value: "recent", label: "Data de adi\xe7\xe3o" },
                        { value: "dex", label: "Pok\xe9dex" },
                    ];
                function ab({ isOpen: a, dexId: b, pokemonName: c, activeCardId: f, activeCard: g, activeCardAllocation: j, targetCardId: k, matchesDexIdExactly: m = !1, onlyUnallocatedCards: n = !1, title: o, description: p, editSearchParams: q, onClose: r, onCardSelected: s, onCardRemoved: u, onOpenCatalogSearch: A }) {
                    let B = (0, h.useRouter)(),
                        { mutate: L } = (0, i.iX)(),
                        { cards: ab, isLoading: ac } = (0, w.Z$)(a ? b : null, a && !b),
                        [ad, ae] = (0, e.useState)(f),
                        [af, ag] = (0, e.useState)(g),
                        [ah, ai] = (0, e.useState)(!1),
                        [aj, ak] = (0, e.useState)(null),
                        [al, am] = (0, e.useState)(""),
                        [an, ao] = (0, e.useState)("all"),
                        [ap, aq] = (0, e.useState)("all"),
                        [ar, as] = (0, e.useState)("all"),
                        [at, au] = (0, e.useState)(H.Ig),
                        [av, aw] = (0, e.useState)(H.ej),
                        [ax, ay] = (0, e.useState)("name"),
                        [az, aA] = (0, e.useState)("asc"),
                        [aB, aC] = (0, e.useState)(!1);
                    (0, J.m)(a, r, null !== aj);
                    let { isPresent: aD, state: aE } = (0, K.v)(a),
                        aF = (0, e.useMemo)(() => ab.filter((a) => (!b || (m ? a.pokemon_dex_id === b : !!(0, I.R)(a.card_name, b))) && (!k || a.tcgdex_card_id === k) && (!n || a.id === f || !a.is_in_binder)), [f, ab, b, m, n, k]),
                        aG = (0, e.useMemo)(() => {
                            let a = new Map();
                            return (
                                aF.forEach((b) => {
                                    let c = (0, E.qe)(b),
                                        d = a.get(c),
                                        e = b.id === ad;
                                    d ? ((d.totalCount += 1), e && ((d.hasInBinder = !0), (d.activeCard = b), (d.card = b))) : a.set(c, { key: c, card: b, totalCount: 1, hasInBinder: e, activeCard: b });
                                }),
                                Array.from(a.values())
                            );
                        }, [aF, ad]),
                        aH = (0, e.useMemo)(() => (0, H.SI)(aF.map((a) => a.card_set_name)), [aF]),
                        aI = (0, e.useMemo)(() => (0, H.ay)(aF.map((a) => a.card_artist)), [aF]),
                        aJ = (0, e.useMemo)(() => {
                            let a = (0, H.a)(
                                    aG.map((a) => ({ key: a.key, card: a.card, copies: [a.card], totalCount: a.totalCount, hasInBinder: a.hasInBinder })),
                                    { searchTerm: al, statusFilter: "all", languageFilter: an, rarityFilter: ap, expansionFilter: at, artistFilter: av, variantFilter: ar, sortField: ax, sortDirection: az },
                                ),
                                b = new Map(aG.map((a) => [a.key, a]));
                            return a.flatMap((a) => {
                                let c = b.get(a.key);
                                return c ? [c] : [];
                            });
                        }, [aG, al, an, ap, at, av, ar, ax, az]),
                        aK = !!al.trim() || "all" !== an || "all" !== ap || "all" !== ar || at !== H.Ig || av !== H.ej,
                        aL = +("all" !== an) + +("all" !== ap) + +("all" !== ar) + +(at !== H.Ig) + +(av !== H.ej),
                        aM = (a) => {
                            a.id !== ad && (ai(!1), ae(a.id), ag(a), s(a));
                        },
                        aN = (a) => {
                            (ai(!0), ae(void 0), ag(void 0), u?.(a));
                        },
                        aO = (a, b) => {
                            let c = new URLSearchParams({ from: "binder" });
                            for (let [a, d] of (b && c.set("dexId", String(b)), Object.entries(q ?? {}))) void 0 !== d && c.set(a, String(d));
                            return `/cards/${a}?${c.toString()}`;
                        },
                        aP = (a, b) => {
                            B.prefetch(aO(a, b));
                        };
                    return aD
                        ? (0, d.jsx)("div", {
                              className: "modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-md",
                              "data-overlay-state": aE,
                              role: "dialog",
                              "aria-modal": "true",
                              "aria-label": `Selecionar carta para ${o ?? c}`,
                              onClick: (a) => {
                                  aj || a.target !== a.currentTarget || r();
                              },
                              children: (0, d.jsxs)("div", {
                                  className: "modal-surface flex h-dvh max-h-none w-full max-w-none flex-col items-center justify-center gap-0 sm:h-[85vh] sm:max-h-[820px] sm:max-w-2xl sm:gap-5 lg:max-w-4xl lg:flex-row lg:items-center xl:max-w-5xl 2xl:max-w-6xl",
                                  children: [
                                      (0, d.jsx)("div", {
                                          className: "hidden lg:flex lg:w-[240px] xl:w-[300px] 2xl:w-[340px] shrink-0 flex-col items-center justify-center transition-all duration-200",
                                          children: af
                                              ? (0, d.jsxs)(d.Fragment, {
                                                    children: [
                                                        (0, d.jsx)("div", { className: "relative aspect-[8/11] w-full select-none", children: (0, d.jsx)($, { card: af, sizes: "(max-width: 1280px) 240px, 340px", maxTilt: 10, perspective: 1e3, glareOpacity: 0.25 }, af.id) }),
                                                        (0, d.jsxs)("div", {
                                                            className: "mt-3 flex flex-col items-center gap-0.5 text-center",
                                                            children: [
                                                                (0, d.jsxs)("div", { className: "flex items-center justify-center gap-1.5", children: [(0, d.jsx)("span", { className: "truncate max-w-[200px] xl:max-w-[260px] text-sm font-bold text-white", children: af.card_name }), af.card_condition && (0, d.jsx)(G.J, { condition: af.card_condition, size: "sm" })] }),
                                                                (0, d.jsx)("span", { className: "truncate max-w-[240px] xl:max-w-[300px] text-xs text-slate-400", children: af.card_artist ? `${af.card_set_name || "Cole\xe7\xe3o"} \xb7 ${af.card_artist}` : af.card_set_name || "Cole\xe7\xe3o" }),
                                                            ],
                                                        }),
                                                    ],
                                                })
                                              : (0, d.jsxs)(d.Fragment, {
                                                    children: [
                                                        (0, d.jsxs)("div", {
                                                            className: "relative flex aspect-[8/11] w-full select-none flex-col items-center justify-between rounded-2xl border-2 border-dashed border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5 shadow-2xl backdrop-blur-md",
                                                            children: [
                                                                (0, d.jsxs)("div", {
                                                                    className: "flex w-full items-center justify-between",
                                                                    children: [
                                                                        b ? (0, d.jsxs)("span", { className: "rounded bg-black/40 px-2 py-0.5 text-xs font-bold text-slate-400 backdrop-blur-sm", children: ["#", String(b).padStart(3, "0")] }) : (0, d.jsx)("span", { className: "rounded bg-black/40 px-2 py-0.5 text-xs font-bold text-slate-400 backdrop-blur-sm", children: "Livre" }),
                                                                        (0, d.jsx)("span", { className: "rounded bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-slate-400", children: "Vazio" }),
                                                                    ],
                                                                }),
                                                                b ? (0, d.jsx)("div", { className: "relative flex h-36 w-36 items-center justify-center", children: (0, d.jsx)(t.default, { src: (0, v.Xw)(b), alt: c, fill: !0, sizes: "(max-width: 1280px) 150px, 180px", className: "object-contain opacity-25", unoptimized: !0, onLoad: () => (0, v.nQ)(b) }) }) : (0, d.jsx)(M.A, { size: 72, className: "text-slate-600" }),
                                                                (0, d.jsxs)("div", { className: "flex flex-col items-center text-center", children: [(0, d.jsx)("span", { className: "text-xs font-semibold text-slate-300", children: c }), (0, d.jsx)("span", { className: "text-[11px] text-slate-500", children: "Nenhuma carta no binder" })] }),
                                                            ],
                                                        }),
                                                        (0, d.jsx)("div", { className: "mt-3 flex flex-col items-center gap-0.5 text-center", children: (0, d.jsx)("span", { className: "text-xs text-slate-400", children: "Selecione uma carta ao lado para exibir" }) }),
                                                    ],
                                                }),
                                      }),
                                      (0, d.jsxs)("div", {
                                          className: "relative flex h-full w-full min-w-0 flex-1 flex-col overflow-hidden rounded-none border-0 bg-[#12151d] shadow-2xl sm:rounded-2xl sm:border sm:border-white/10",
                                          children: [
                                              aj && (0, d.jsx)("div", { className: "absolute top-0 inset-x-0 h-1 overflow-hidden rounded-t-2xl bg-white/5 z-30", children: (0, d.jsx)("div", { className: "h-full w-full bg-poke-blue animate-pulse" }) }),
                                              (0, d.jsxs)("div", {
                                                  className: "flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6",
                                                  children: [
                                                      (0, d.jsxs)("div", {
                                                          children: [
                                                              (0, d.jsxs)("div", { className: "flex items-center gap-2.5", children: [(0, d.jsx)("h2", { className: "text-xl font-bold text-white tracking-tight", children: o ?? c }), b ? (0, d.jsxs)("span", { className: "rounded-md border border-white/10 bg-white/10 px-2 py-0.5 font-mono text-xs font-semibold text-slate-300", children: ["#", String(b).padStart(3, "0")] }) : null] }),
                                                              (0, d.jsx)("p", { className: "mt-0.5 text-xs text-slate-400", children: p ?? "Selecione uma carta da sua cole\xe7\xe3o para exibir no binder" }),
                                                          ],
                                                      }),
                                                      (0, d.jsx)("button", { type: "button", onClick: r, disabled: !!aj, "aria-label": "Fechar", className: `flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition-colors ${aj ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:bg-white/10 hover:text-white"}`, children: (0, d.jsx)(N.A, { size: 18 }) }),
                                                  ],
                                              }),
                                              aG.length > 0
                                                  ? (0, d.jsx)("div", {
                                                        className: "flex shrink-0 flex-col border-b border-white/5 bg-black/20 px-3 py-2.5 sm:px-6 sm:py-3",
                                                        children: (0, d.jsx)(z.h, {
                                                            searchTerm: al,
                                                            onSearchChange: am,
                                                            showFilters: aB,
                                                            onToggleFilters: () => aC((a) => !a),
                                                            activeFilterCount: aL,
                                                            filterButtonAriaLabel: "Alternar filtros de idioma, raridade, vers\xe3o, expans\xe3o, ilustrador e ordena\xe7\xe3o",
                                                            children: (0, d.jsxs)("div", {
                                                                className: "grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2.5 w-full pt-0.5",
                                                                children: [
                                                                    (0, d.jsx)(C.l, { value: an, onChange: ao, options: _, icon: (0, d.jsx)(O.A, { size: 13 }), ariaLabel: "Filtrar por idioma da carta", className: "w-full min-w-0", size: "sm" }),
                                                                    (0, d.jsx)(C.l, { value: ap, onChange: aq, options: F.OI, icon: (0, d.jsx)(P.A, { size: 13 }), ariaLabel: "Filtrar por raridade", className: "w-full min-w-0", size: "sm" }),
                                                                    (0, d.jsx)(C.l, { value: ar, onChange: as, options: E.ye, icon: (0, d.jsx)(Q.A, { size: 13 }), ariaLabel: "Filtrar por vers\xe3o", className: "w-full min-w-0", size: "sm" }),
                                                                    (0, d.jsx)(C.l, { value: at, onChange: au, options: aH, icon: (0, d.jsx)(R.A, { size: 13 }), ariaLabel: "Filtrar por expans\xe3o", className: "w-full min-w-0", size: "sm" }),
                                                                    (0, d.jsx)(C.l, { value: av, onChange: aw, options: aI, icon: (0, d.jsx)(S.A, { size: 13 }), ariaLabel: "Filtrar por ilustrador", className: "w-full min-w-0", size: "sm" }),
                                                                    (0, d.jsxs)("div", {
                                                                        className: "flex w-full min-w-0 items-center gap-1.5",
                                                                        children: [
                                                                            (0, d.jsx)(C.l, { value: ax, onChange: ay, options: aa, icon: (0, d.jsx)(T.A, { size: 13 }), ariaLabel: "Ordenar cartas", className: "flex-1 min-w-0", size: "sm", align: "right" }),
                                                                            (0, d.jsx)("button", {
                                                                                type: "button",
                                                                                onClick: () => aA((a) => ("asc" === a ? "desc" : "asc")),
                                                                                "aria-label": "asc" === az ? "Ordem crescente. Clique para inverter para decrescente." : "Ordem decrescente. Clique para inverter para crescente.",
                                                                                title: "asc" === az ? "Crescente (Clique para inverter)" : "Decrescente (Clique para inverter)",
                                                                                className: "flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg sm:rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-poke-blue/50 hover:bg-white/10 hover:text-white active:scale-95",
                                                                                children: "asc" === az ? (0, d.jsx)(U.A, { size: 14 }) : (0, d.jsx)(V.A, { size: 14 }),
                                                                            }),
                                                                        ],
                                                                    }),
                                                                ],
                                                            }),
                                                        }),
                                                    })
                                                  : null,
                                              (0, d.jsx)("div", {
                                                  className: "flex-1 overflow-y-auto p-4 sm:p-6",
                                                  children: ac
                                                      ? (0, d.jsx)("div", { className: "flex h-full min-h-[250px] flex-col items-center justify-center", children: (0, d.jsx)(x.i, { message: "Buscando suas cartas na cole\xe7\xe3o...", size: "md" }) })
                                                      : 0 === aG.length
                                                        ? (0, d.jsxs)("div", {
                                                              className: "flex h-full min-h-[250px] flex-col items-center justify-center gap-4 text-center",
                                                              children: [
                                                                  (0, d.jsx)("div", { className: "flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400", children: (0, d.jsx)(W.A, { size: 22 }) }),
                                                                  (0, d.jsxs)("div", { children: [(0, d.jsx)("p", { className: "text-sm font-semibold text-white", children: "Nenhuma carta encontrada" }), (0, d.jsxs)("p", { className: "mt-1 text-xs text-slate-400", children: ["Voc\xea ainda n\xe3o tem exemplares de ", c, " cadastrados na sua cole\xe7\xe3o."] })] }),
                                                                  (0, d.jsxs)("button", {
                                                                      type: "button",
                                                                      disabled: !!aj,
                                                                      onClick: () => {
                                                                          aj || (r(), A());
                                                                      },
                                                                      className: `flex items-center gap-2 rounded-xl bg-poke-blue px-4 py-2.5 text-xs font-semibold text-white shadow-md transition-opacity ${aj ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:opacity-90"}`,
                                                                      children: [(0, d.jsx)(X.A, { size: 15 }), (0, d.jsx)("span", { children: "Buscar no cat\xe1logo" })],
                                                                  }),
                                                              ],
                                                          })
                                                        : 0 === aJ.length
                                                          ? (0, d.jsxs)("div", {
                                                                className: "flex h-full min-h-[250px] flex-col items-center justify-center gap-3 text-center",
                                                                children: [
                                                                    (0, d.jsx)(W.A, { size: 28, className: "text-slate-600" }),
                                                                    (0, d.jsxs)("div", { children: [(0, d.jsx)("p", { className: "text-sm font-semibold text-white", children: "Nenhuma carta encontrada" }), (0, d.jsx)("p", { className: "mt-1 text-xs text-slate-400", children: "Tente ajustar a busca ou os filtros." })] }),
                                                                    aK
                                                                        ? (0, d.jsx)("button", {
                                                                              type: "button",
                                                                              onClick: () => {
                                                                                  (am(""), ao("all"), aq("all"), as("all"), au(H.Ig), aw(H.ej), ay("name"), aA("asc"));
                                                                              },
                                                                              className: "rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white",
                                                                              children: "Limpar filtros",
                                                                          })
                                                                        : null,
                                                                ],
                                                            })
                                                          : (0, d.jsx)("div", {
                                                                className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3",
                                                                children: aJ.map((a, c) => {
                                                                    let g = a.card,
                                                                        h = a.hasInBinder,
                                                                        i = aj === a.activeCard.id,
                                                                        k = !!aj,
                                                                        m = (0, D.O)(c);
                                                                    return (0, d.jsxs)(
                                                                        "div",
                                                                        {
                                                                            className: `group relative flex flex-col justify-between gap-2 rounded-xl border p-2.5 transition-all duration-200 ${h ? "border-poke-blue bg-poke-blue/10 ring-2 ring-poke-blue/40" : "border-white/10 bg-white/[0.03] hover:border-poke-blue/50 hover:bg-white/[0.06]"} ${m.className}`,
                                                                            style: m.style,
                                                                            children: [
                                                                                (0, d.jsxs)("div", {
                                                                                    className: "z-10 flex min-h-[22px] items-center justify-between",
                                                                                    children: [
                                                                                        (0, d.jsxs)("span", { className: "rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-slate-300 backdrop-blur-sm", children: ["#", String(g.pokemon_dex_id).padStart(3, "0")] }),
                                                                                        (0, d.jsxs)("div", {
                                                                                            className: "flex items-center gap-1",
                                                                                            children: [
                                                                                                g.card_condition && (0, d.jsx)(G.J, { condition: g.card_condition, size: "sm" }),
                                                                                                h && (0, d.jsx)("span", { title: "No Binder", "aria-label": "No Binder", className: "flex items-center justify-center rounded border border-poke-blue/40 bg-poke-blue/20 p-1 text-poke-blue", children: (0, d.jsx)(M.A, { size: 13 }) }),
                                                                                                a.totalCount > 1 && (0, d.jsxs)("span", { title: `${a.totalCount} c\xf3pias id\xeanticas`, className: "rounded bg-poke-blue px-1.5 py-0.5 text-[10px] font-extrabold text-white", children: ["x", a.totalCount] }),
                                                                                            ],
                                                                                        }),
                                                                                    ],
                                                                                }),
                                                                                (0, d.jsx)("div", {
                                                                                    role: "button",
                                                                                    tabIndex: k ? -1 : 0,
                                                                                    onClick: () => {
                                                                                        k || (h ? aN(a.activeCard) : aM(a.activeCard));
                                                                                    },
                                                                                    className: `relative aspect-[8/11] w-full ${k ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`,
                                                                                    children: (0, d.jsx)($, { card: g }),
                                                                                }),
                                                                                (0, d.jsxs)("div", {
                                                                                    className: "flex flex-col gap-0.5",
                                                                                    children: [
                                                                                        (0, d.jsx)("span", { className: "truncate text-xs font-semibold text-white group-hover:text-poke-blue transition-colors", children: g.card_name }),
                                                                                        (0, d.jsxs)("div", {
                                                                                            className: "flex items-center justify-between gap-1 text-[11px] text-slate-400",
                                                                                            children: [
                                                                                                (0, d.jsx)("span", { className: "truncate min-w-0 text-[10px] sm:text-[11px]", title: g.card_artist ? `${g.card_set_name || "Cole\xe7\xe3o"} \xb7 ${g.card_artist}` : g.card_set_name || "Cole\xe7\xe3o", children: g.card_set_name || "Cole\xe7\xe3o" }),
                                                                                                (0, d.jsxs)("div", {
                                                                                                    className: "flex shrink-0 items-center gap-1 whitespace-nowrap",
                                                                                                    children: [(0, d.jsx)("span", { className: "rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[9px] font-bold text-slate-300", children: (0, E.FB)(g.card_variant) }), (0, d.jsx)(y.i, { country: g.card_language }), (0, d.jsx)("span", { className: "hidden uppercase text-[9px] font-bold whitespace-nowrap sm:inline sm:text-[10px]", children: g.card_language })],
                                                                                                }),
                                                                                            ],
                                                                                        }),
                                                                                    ],
                                                                                }),
                                                                                (0, d.jsxs)("div", {
                                                                                    className: "mt-1 flex items-center gap-1.5",
                                                                                    children: [
                                                                                        (0, d.jsx)("button", {
                                                                                            type: "button",
                                                                                            disabled: k,
                                                                                            onClick: () => (h ? aN(a.activeCard) : aM(a.activeCard)),
                                                                                            className: `group/btn flex flex-1 min-w-0 items-center justify-center gap-1.5 rounded-lg py-2 px-2 text-xs font-semibold leading-none transition-colors duration-150 ${k ? "cursor-not-allowed opacity-50 bg-white/5 text-slate-500 border border-white/5" : h ? "cursor-pointer border border-poke-blue/40 bg-poke-blue/20 text-poke-blue hover:border-red-500/40 hover:bg-red-500/20 hover:text-red-300" : "cursor-pointer bg-white/10 text-white hover:bg-poke-blue hover:shadow-md hover:shadow-poke-blue/20"}`,
                                                                                            title: h ? "Clique para remover do binder" : "Exibir no binder",
                                                                                            children: h
                                                                                                ? (0, d.jsxs)(d.Fragment, {
                                                                                                      children: [
                                                                                                          (0, d.jsxs)("span", { className: "flex items-center gap-1.5 group-hover/btn:hidden", children: [(0, d.jsx)(l.A, { size: 13, className: "shrink-0" }), (0, d.jsx)("span", { className: "truncate whitespace-nowrap leading-none", children: "Em exibi\xe7\xe3o" })] }),
                                                                                                          (0, d.jsxs)("span", { className: "hidden items-center gap-1.5 group-hover/btn:flex", children: [(0, d.jsx)(N.A, { size: 13, className: "shrink-0" }), (0, d.jsx)("span", { className: "truncate whitespace-nowrap leading-none", children: "Remover" })] }),
                                                                                                      ],
                                                                                                  })
                                                                                                : (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)(M.A, { size: 13, className: "shrink-0" }), (0, d.jsx)("span", { className: "truncate whitespace-nowrap leading-none", children: "Exibir" })] }),
                                                                                        }),
                                                                                        (0, d.jsx)("button", {
                                                                                            type: "button",
                                                                                            title: i ? "Abrindo edi\xe7\xe3o..." : "Editar exemplar",
                                                                                            "aria-label": i ? "Abrindo edi\xe7\xe3o..." : "Editar exemplar",
                                                                                            disabled: k,
                                                                                            onMouseEnter: () => aP(a.activeCard.id, b),
                                                                                            onPointerDown: () => aP(a.activeCard.id, b),
                                                                                            onFocus: () => aP(a.activeCard.id, b),
                                                                                            onClick: () => {
                                                                                                var c, d;
                                                                                                return (
                                                                                                    (c = a.activeCard),
                                                                                                    (d = a.key),
                                                                                                    void (
                                                                                                        !aj &&
                                                                                                        (ak(c.id),
                                                                                                        L(`/api/cards/${c.id}`, { card: c, copies: ab.filter((a) => (0, E.qe)(a) === d), availableVariants: E.ab, allocation: c.id === f ? j : null }, !1),
                                                                                                        (0, e.startTransition)(() => {
                                                                                                            B.push(aO(c.id, b));
                                                                                                        }))
                                                                                                    )
                                                                                                );
                                                                                            },
                                                                                            className: `flex shrink-0 items-center justify-center gap-1 rounded-lg border px-2 py-2 text-xs font-semibold leading-none transition-colors duration-150 ${i ? "border-poke-blue/40 bg-poke-blue/20 text-poke-blue cursor-wait" : k ? "border-white/5 bg-white/[0.02] text-slate-600 cursor-not-allowed opacity-50" : "border-white/10 bg-white/5 text-slate-300 transition-colors duration-150 hover:border-white/20 hover:bg-white/15 hover:text-white cursor-pointer"}`,
                                                                                            children: i
                                                                                                ? (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)(Y.A, { size: 13, className: "shrink-0 animate-spin text-poke-blue" }), (0, d.jsx)("span", { className: "hidden sm:inline leading-none text-poke-blue", children: "Abrindo..." })] })
                                                                                                : (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)(Z.A, { size: 13, className: "shrink-0" }), (0, d.jsx)("span", { className: "hidden sm:inline leading-none", children: "Editar" })] }),
                                                                                        }),
                                                                                    ],
                                                                                }),
                                                                            ],
                                                                        },
                                                                        a.key,
                                                                    );
                                                                }),
                                                            }),
                                              }),
                                              ab.length > 0 &&
                                                  (0, d.jsxs)("div", {
                                                      className: "flex shrink-0 items-center justify-between border-t border-white/10 bg-black/30 px-5 py-3.5 sm:px-6",
                                                      children: [
                                                          (0, d.jsx)("span", { className: "text-xs text-slate-400", children: 1 === ab.length ? "1 exemplar cadastrado" : `${ab.length} exemplares cadastrados` }),
                                                          (0, d.jsxs)("button", {
                                                              type: "button",
                                                              disabled: !!aj,
                                                              onClick: () => {
                                                                  aj || (r(), A());
                                                              },
                                                              className: `flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors ${aj ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:bg-white/10 hover:text-white"}`,
                                                              children: [(0, d.jsx)(X.A, { size: 14 }), (0, d.jsx)("span", { children: "Adicionar Carta" })],
                                                          }),
                                                      ],
                                                  }),
                                          ],
                                      }),
                                  ],
                              }),
                          })
                        : null;
                }
                function ac({ isOpen: a, onClose: b, slot: c, binderId: f, binderName: g, binderGrid: h, onAssignSuccess: i, onUnassignSuccess: j, onOpenCatalogSearch: k }) {
                    let [l, m] = (0, e.useState)(!1);
                    if (!c) return null;
                    let n = c.target_dex_id ?? void 0,
                        o = n ? v.FV.get(n)?.name || `Pok\xe9mon #${n}` : c.target_card_name || "Compartimento livre",
                        p = "free" === c.slot_type ? "Compartimento livre" : o,
                        q = "free" === c.slot_type ? "Selecione uma carta guardada na sua cole\xe7\xe3o para exibir neste compartimento" : "Selecione uma carta da sua cole\xe7\xe3o para exibir no binder",
                        r = async (a) => {
                            if (!l) {
                                m(!0);
                                try {
                                    let d = await fetch(`/api/binders/${f}/slots/${c.id}/assign`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user_card_id: a.id }) });
                                    if (!d.ok) {
                                        let a = await d.json().catch(() => ({}));
                                        s.oR.error(a.error || "Erro ao alocar carta no compartimento");
                                        return;
                                    }
                                    (s.oR.success("Carta alocada no binder!"), i(c.id, a), b());
                                } catch {
                                    s.oR.error("Erro inesperado ao alocar carta");
                                } finally {
                                    m(!1);
                                }
                            }
                        },
                        t = async () => {
                            if (!l) {
                                m(!0);
                                try {
                                    let a = await fetch(`/api/binders/${f}/slots/${c.id}/assign`, { method: "DELETE" });
                                    if (!a.ok) {
                                        let b = await a.json().catch(() => ({}));
                                        s.oR.error(b.error || "Erro ao remover carta do compartimento");
                                        return;
                                    }
                                    (s.oR.success("Carta devolvida para guardadas na cole\xe7\xe3o!"), j(c.id), b());
                                } catch {
                                    s.oR.error("Erro inesperado ao remover carta");
                                } finally {
                                    m(!1);
                                }
                            }
                        };
                    return (0, d.jsx)(ab, {
                        isOpen: a,
                        dexId: n,
                        pokemonName: o,
                        title: p,
                        description: q,
                        targetCardId: c.target_tcgdex_id ?? void 0,
                        matchesDexIdExactly: !0,
                        onlyUnallocatedCards: !0,
                        activeCardId: c.user_card_id ?? void 0,
                        activeCard: c.card ?? void 0,
                        activeCardAllocation: c.card ? { slot_id: c.id, binder_id: f, page_number: c.page_number, slot_index: c.slot_index, binder_name: g, binder_grid: h } : null,
                        editSearchParams: { binderId: f, slotId: c.id, page: c.page_number, openSlot: "true" },
                        onClose: b,
                        onCardSelected: r,
                        onCardRemoved: t,
                        onOpenCatalogSearch: () => {
                            k("pokemon" === c.slot_type ? o : c.target_card_name || void 0, n);
                        },
                    });
                }
                var ad = c(27616);
                function ae(a, b, c) {
                    let d = 2 + b,
                        e = Math.trunc(a) || 0;
                    if (e <= 0) return 0;
                    if (e >= b + 2) return d + +(b % 2 != 0) + 1;
                    if (e === b + 1) return d;
                    let f = Math.min(b, Math.max(1, e)),
                        g = 2 + f - 1;
                    return c || 1 === f ? g : g % 2 == 0 ? g - 1 : g;
                }
                function af(a, b, c) {
                    let d = 2 + b,
                        e = b + 1;
                    if (a <= 0) return 0;
                    if (a >= d + +(b % 2 != 0) + 1) return b + 2;
                    if (c) return 1 === a ? 1 : a >= d ? e : Math.min(b, Math.max(1, a - 2 + 1));
                    let f = a % 2 == 0 ? a - 1 : a;
                    return 1 === f ? 1 : f >= d ? e : Math.min(b, Math.max(1, f - 1));
                }
                function ag(a, b) {
                    if (a <= 0) return 0;
                    let c = 2 + b + +(b % 2 != 0) + 1;
                    return a >= c ? c : a % 2 == 1 ? a : a - 1;
                }
                var ah = c(36965);
                let ai = (0, m.A)("Trophy", [
                        ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
                        ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
                        ["path", { d: "M4 22h16", key: "57wxv0" }],
                        ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
                        ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
                        ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }],
                    ]),
                    aj = (0, m.A)("Target", [
                        ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
                        ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
                        ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
                    ]);
                var ak = c(40029);
                function al({ isOpen: a, onClose: b, binder: c, slots: f, onSlotNavigate: g }) {
                    (0, J.m)(a, b);
                    let { isPresent: h, state: i } = (0, K.v)(a),
                        j = (0, e.useMemo)(() => (0, ak.v)(c.cover_theme), [c.cover_theme]),
                        k = (0, e.useMemo)(() => {
                            let a = f.length,
                                b = f.filter((a) => !!(a.user_card_id || a.card)).length,
                                c = f.filter((a) => "pokemon" === a.slot_type || "card" === a.slot_type),
                                d = c.length > 0,
                                e = c.filter((a) => !!(a.user_card_id || a.card)).length,
                                g = a > 0 ? Math.round((b / a) * 100) : 0,
                                h = d ? Math.round((e / c.length) * 100) : 0;
                            return { totalSlots: a, filledSlots: b, hasGoals: d, totalGoals: c.length, filledGoals: e, occupancyPercentage: g, goalsPercentage: h };
                        }, [f]),
                        l = (0, e.useMemo)(() => {
                            let a = new Map();
                            for (let b = 1; b <= (0, ad.r)(c.total_pages); b++) a.set(b, []);
                            for (let b of f) {
                                let c = a.get(b.page_number) || [];
                                (c.push(b), a.set(b.page_number, c));
                            }
                            return a;
                        }, [c.total_pages, f]);
                    if (!h) return null;
                    let m = "1x1" === c.grid_type ? "grid-cols-1" : "2x2" === c.grid_type ? "grid-cols-2" : "grid-cols-3";
                    return (0, d.jsx)("div", {
                        className: "modal-backdrop fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm",
                        "data-overlay-state": i,
                        role: "dialog",
                        "aria-modal": "true",
                        "aria-label": "Estat\xedsticas do binder",
                        onClick: (a) => {
                            a.target === a.currentTarget && b();
                        },
                        children: (0, d.jsxs)("div", {
                            className: "drawer-surface flex h-[100dvh] w-screen max-w-none flex-col bg-[#0e121a] shadow-2xl md:h-full md:w-full md:max-w-md md:border-l md:border-white/10",
                            children: [
                                (0, d.jsxs)("div", {
                                    className: "flex items-center justify-between border-b border-white/10 px-5 py-4",
                                    children: [
                                        (0, d.jsxs)("div", {
                                            className: "flex items-center gap-2.5",
                                            children: [(0, d.jsx)("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg shadow-sm", style: { backgroundColor: `${j.primaryColor}25`, color: j.primaryColor }, children: (0, d.jsx)(ai, { size: 16 }) }), (0, d.jsxs)("div", { children: [(0, d.jsx)("h2", { className: "text-sm font-bold text-white", children: "Estat\xedsticas do Binder" }), (0, d.jsx)("p", { className: "text-[11px] text-slate-400", children: c.name })] })],
                                        }),
                                        (0, d.jsx)("button", { type: "button", onClick: b, className: "flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white", children: (0, d.jsx)(N.A, { size: 16 }) }),
                                    ],
                                }),
                                (0, d.jsxs)("div", {
                                    className: "flex-1 overflow-y-auto p-5 flex flex-col gap-6",
                                    children: [
                                        (0, d.jsx)("div", {
                                            className: "grid grid-cols-2 gap-3",
                                            children: k.hasGoals
                                                ? (0, d.jsxs)(d.Fragment, {
                                                      children: [
                                                          (0, d.jsxs)("div", {
                                                              className: "flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3.5",
                                                              children: [
                                                                  (0, d.jsxs)("div", { className: "flex items-center justify-between text-xs text-slate-400", children: [(0, d.jsxs)("span", { className: "flex items-center gap-1 font-medium", children: [(0, d.jsx)(aj, { size: 13, className: "text-poke-blue" }), "Metas"] }), (0, d.jsxs)("span", { className: "font-mono font-bold text-white", children: [k.goalsPercentage, "%"] })] }),
                                                                  (0, d.jsxs)("div", { className: "flex items-baseline gap-1", children: [(0, d.jsx)("span", { className: "text-2xl font-black text-white", children: k.filledGoals }), (0, d.jsxs)("span", { className: "text-xs text-slate-500", children: ["/ ", k.totalGoals] })] }),
                                                                  (0, d.jsx)("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-white/10", children: (0, d.jsx)("div", { className: "h-full rounded-full bg-poke-blue transition-all", style: { width: `${k.goalsPercentage}%` } }) }),
                                                              ],
                                                          }),
                                                          (0, d.jsxs)("div", {
                                                              className: "flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3.5",
                                                              children: [
                                                                  (0, d.jsxs)("div", { className: "flex items-center justify-between text-xs text-slate-400", children: [(0, d.jsxs)("span", { className: "flex items-center gap-1 font-medium", children: [(0, d.jsx)(R.A, { size: 13, className: "text-emerald-400" }), "Ocupa\xe7\xe3o"] }), (0, d.jsxs)("span", { className: "font-mono font-bold text-white", children: [k.occupancyPercentage, "%"] })] }),
                                                                  (0, d.jsxs)("div", { className: "flex items-baseline gap-1", children: [(0, d.jsx)("span", { className: "text-2xl font-black text-white", children: k.filledSlots }), (0, d.jsxs)("span", { className: "text-xs text-slate-500", children: ["/ ", k.totalSlots] })] }),
                                                                  (0, d.jsx)("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-white/10", children: (0, d.jsx)("div", { className: "h-full rounded-full bg-emerald-500 transition-all", style: { width: `${k.occupancyPercentage}%` } }) }),
                                                              ],
                                                          }),
                                                      ],
                                                  })
                                                : (0, d.jsxs)("div", {
                                                      className: "col-span-2 flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4",
                                                      children: [
                                                          (0, d.jsxs)("div", { className: "flex items-center justify-between text-xs text-slate-400", children: [(0, d.jsxs)("span", { className: "flex items-center gap-1 font-medium", children: [(0, d.jsx)(R.A, { size: 14, className: "text-poke-blue" }), "Ocupa\xe7\xe3o F\xedsica (Binder Livre)"] }), (0, d.jsxs)("span", { className: "font-mono font-bold text-white", children: [k.occupancyPercentage, "%"] })] }),
                                                          (0, d.jsxs)("div", { className: "flex items-baseline gap-1.5", children: [(0, d.jsx)("span", { className: "text-3xl font-black text-white", children: k.filledSlots }), (0, d.jsxs)("span", { className: "text-sm text-slate-500", children: ["/ ", k.totalSlots, " compartimentos preenchidos"] })] }),
                                                          (0, d.jsx)("div", { className: "mt-1 h-2 w-full overflow-hidden rounded-full bg-white/10", children: (0, d.jsx)("div", { className: "h-full rounded-full bg-poke-blue transition-all", style: { width: `${k.occupancyPercentage}%` } }) }),
                                                      ],
                                                  }),
                                        }),
                                        (0, d.jsxs)("div", {
                                            className: "flex flex-col gap-3",
                                            children: [
                                                (0, d.jsxs)("div", { className: "flex items-center justify-between", children: [(0, d.jsx)("span", { className: "text-xs font-bold uppercase tracking-wider text-slate-400", children: "Mapa Visual das Folhas" }), (0, d.jsx)("span", { className: "text-[11px] text-slate-500", children: "Clique para ir direto \xe0 p\xe1gina" })] }),
                                                (0, d.jsx)("div", {
                                                    className: "flex flex-col gap-4",
                                                    children: Array.from(l.entries()).map(([a, c]) =>
                                                        (0, d.jsxs)(
                                                            "div",
                                                            {
                                                                className: "flex flex-col gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-3",
                                                                children: [
                                                                    (0, d.jsxs)("div", { className: "flex items-center justify-between text-[11px] font-medium text-slate-400", children: [(0, d.jsxs)("span", { className: "text-slate-300 font-semibold", children: ["P\xe1gina ", a] }), (0, d.jsxs)("span", { children: [c.filter((a) => a.user_card_id || a.card).length, " / ", c.length] })] }),
                                                                    (0, d.jsx)("div", {
                                                                        className: `grid gap-1.5 ${m}`,
                                                                        children: c.map((a) => {
                                                                            let c = !!(a.user_card_id || a.card),
                                                                                e = a.card?.card_image_url;
                                                                            return (0, d.jsx)(
                                                                                "button",
                                                                                {
                                                                                    type: "button",
                                                                                    onClick: () => {
                                                                                        (g(a.page_number, a.id), b());
                                                                                    },
                                                                                    className: `group relative flex aspect-[8/11] items-center justify-center overflow-hidden rounded-lg border text-left transition-all ${c ? "border-poke-blue/50 bg-[#141b2b] hover:border-poke-blue hover:scale-105" : "free" === a.slot_type ? "border-dashed border-white/15 bg-black/30 hover:border-white/40" : "border-white/10 bg-[#0d1017] hover:border-white/30"}`,
                                                                                    children:
                                                                                        c && e
                                                                                            ? (0, d.jsx)(t.default, { src: (0, u.HO)(e), alt: "", fill: !0, sizes: "40px", className: "object-contain p-0.5", unoptimized: !0 })
                                                                                            : "pokemon" === a.slot_type && a.target_dex_id
                                                                                              ? (0, d.jsx)(t.default, { src: (0, v.Xw)(a.target_dex_id), alt: "", fill: !0, sizes: "40px", className: "object-contain p-1 opacity-40 group-hover:opacity-70", unoptimized: !0 })
                                                                                              : "card" === a.slot_type && a.target_card_image_url
                                                                                                ? (0, d.jsx)(t.default, { src: (0, u.HO)(a.target_card_image_url), alt: "", fill: !0, sizes: "40px", className: "object-contain p-0.5 opacity-25 grayscale group-hover:opacity-50", unoptimized: !0 })
                                                                                                : (0, d.jsx)("span", { className: "text-[9px] font-mono text-slate-500", children: a.slot_index }),
                                                                                },
                                                                                a.id,
                                                                            );
                                                                        }),
                                                                    }),
                                                                ],
                                                            },
                                                            a,
                                                        ),
                                                    ),
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    });
                }
                var am = c(29589);
                function an({ onSearch: a }) {
                    let [b, c] = (0, e.useState)(""),
                        [f, g] = (0, e.useState)(!1),
                        h = (0, e.useRef)(null),
                        i = b.trim().toLowerCase(),
                        j = i.startsWith("#"),
                        k = (0, H.LQ)(i),
                        l = i
                            ? v.GS.filter((a) => {
                                  let b = j && null !== k && a.dexId === k,
                                      c = !j && a.name.toLowerCase().includes(i);
                                  return b || c;
                              }).slice(0, 6)
                            : [],
                        m = (b) => {
                            (a && a(b), c(""), g(!1));
                        };
                    return a
                        ? (0, d.jsxs)("div", {
                              ref: h,
                              className: "relative w-full",
                              children: [
                                  (0, d.jsxs)("div", {
                                      className: "flex h-10 w-full items-center gap-2 rounded-xl border border-white/10 bg-[#121620]/85 px-3.5 shadow-lg backdrop-blur-md transition-all focus-within:border-poke-blue/60 focus-within:bg-[#151a26]",
                                      children: [
                                          (0, d.jsx)(W.A, { size: 15, className: "flex-shrink-0 text-slate-400" }),
                                          (0, d.jsx)(am.D, {
                                              type: "text",
                                              value: b,
                                              onChange: (a) => {
                                                  (c(a.target.value), g(!0));
                                              },
                                              onFocus: () => g(!0),
                                              onKeyDown: (a) => {
                                                  "Enter" === a.key && l.length > 0 ? m(l[0].dexId) : "Escape" === a.key && g(!1);
                                              },
                                              placeholder: "Buscar por nome ou pok\xe9dex...",
                                              placeholderClassName: "left-0 right-0",
                                              "aria-label": "Buscar Pok\xe9mon no binder",
                                              className: "w-full bg-transparent text-xs text-white placeholder-slate-500 outline-none",
                                          }),
                                          b &&
                                              (0, d.jsx)("button", {
                                                  type: "button",
                                                  onClick: () => {
                                                      (c(""), g(!1));
                                                  },
                                                  "aria-label": "Limpar busca",
                                                  className: "flex-shrink-0 text-slate-400 hover:text-white",
                                                  children: (0, d.jsx)(N.A, { size: 14 }),
                                              }),
                                      ],
                                  }),
                                  f &&
                                      l.length > 0 &&
                                      (0, d.jsx)("div", {
                                          className: "absolute top-11 left-0 z-40 w-full overflow-hidden rounded-xl border border-white/10 bg-[#161a26] py-1 shadow-2xl backdrop-blur-xl",
                                          children: l.map((a) => (0, d.jsxs)("button", { type: "button", onClick: () => m(a.dexId), className: "flex w-full items-center justify-between px-3 py-2 text-left text-xs transition-colors hover:bg-white/10", children: [(0, d.jsx)("span", { className: "font-medium text-white", children: a.name }), (0, d.jsxs)("span", { className: "font-mono text-[11px] text-amber-400", children: ["#", String(a.dexId).padStart(3, "0")] })] }, a.dexId)),
                                      }),
                                  f && i && 0 === l.length && (0, d.jsx)("div", { className: "absolute top-11 left-0 z-40 w-full overflow-hidden rounded-xl border border-white/10 bg-[#161a26] p-3 text-center shadow-2xl backdrop-blur-xl", children: (0, d.jsx)("span", { className: "text-xs text-slate-400", children: "Nenhum Pok\xe9mon dos 151 encontrado" }) }),
                              ],
                          })
                        : null;
                }
                var ao = c(63640),
                    ap = c(93178),
                    aq = c(46313),
                    ar = c(86965),
                    as = c(82382);
                c(95793);
                let at = {
                        grass: { ringColor: "#22c55e", ringGlow: "rgba(34, 197, 94, 0.6)", palette: ["#22c55e", "#16a34a", "#86efac", "#4ade80", "#a3e635"], shapes: ["leaf", "orb", "leaf", "star"] },
                        fire: { ringColor: "#f97316", ringGlow: "rgba(249, 115, 22, 0.7)", palette: ["#f97316", "#ef4444", "#fbbf24", "#ea580c", "#fed7aa"], shapes: ["ember", "shard", "ember", "star"] },
                        water: { ringColor: "#38bdf8", ringGlow: "rgba(56, 189, 248, 0.7)", palette: ["#38bdf8", "#0284c7", "#67e8f9", "#0ea5e9", "#e0f2fe"], shapes: ["droplet", "orb", "droplet", "diamond"] },
                        electric: { ringColor: "#eab308", ringGlow: "rgba(234, 179, 8, 0.8)", palette: ["#eab308", "#facc15", "#fef08a", "#f59e0b", "#ffffff"], shapes: ["bolt", "shard", "bolt", "star"] },
                        bug: { ringColor: "#84cc16", ringGlow: "rgba(132, 204, 22, 0.6)", palette: ["#84cc16", "#a3e635", "#65a30d", "#bef264", "#ecfccb"], shapes: ["leaf", "orb", "shard", "leaf"] },
                        normal: { ringColor: "#e2e8f0", ringGlow: "rgba(226, 232, 240, 0.6)", palette: ["#e2e8f0", "#cbd5e1", "#ffffff", "#94a3b8", "#f8fafc"], shapes: ["star", "shard", "orb", "diamond"] },
                        poison: { ringColor: "#a855f7", ringGlow: "rgba(168, 85, 247, 0.7)", palette: ["#a855f7", "#9333ea", "#d8b4fe", "#c084fc", "#4ade80"], shapes: ["droplet", "orb", "droplet", "shard"] },
                        ground: { ringColor: "#d97706", ringGlow: "rgba(217, 119, 6, 0.7)", palette: ["#d97706", "#b45309", "#fcd34d", "#78350f", "#fef3c7"], shapes: ["shard", "orb", "shard", "diamond"] },
                        rock: { ringColor: "#b45309", ringGlow: "rgba(180, 83, 9, 0.7)", palette: ["#b45309", "#92400e", "#78716c", "#d6d3d1", "#a8a29e"], shapes: ["shard", "diamond", "shard", "orb"] },
                        fighting: { ringColor: "#ef4444", ringGlow: "rgba(239, 68, 68, 0.7)", palette: ["#ef4444", "#dc2626", "#f87171", "#fb923c", "#fca5a5"], shapes: ["shard", "star", "shard", "diamond"] },
                        psychic: { ringColor: "#ec4899", ringGlow: "rgba(236, 72, 153, 0.7)", palette: ["#ec4899", "#d946ef", "#f472b6", "#c084fc", "#fdf2f8"], shapes: ["orb", "star", "diamond", "orb"] },
                        ghost: { ringColor: "#8b5cf6", ringGlow: "rgba(139, 92, 246, 0.7)", palette: ["#8b5cf6", "#7c3aed", "#c084fc", "#38bdf8", "#ddd6fe"], shapes: ["ember", "orb", "star", "ember"] },
                        ice: { ringColor: "#06b6d4", ringGlow: "rgba(6, 182, 212, 0.7)", palette: ["#06b6d4", "#67e8f9", "#e0f2fe", "#ffffff", "#a5f3fc"], shapes: ["diamond", "shard", "star", "diamond"] },
                        dragon: { ringColor: "#6366f1", ringGlow: "rgba(99, 102, 241, 0.7)", palette: ["#6366f1", "#4f46e5", "#818cf8", "#f43f5e", "#c7d2fe"], shapes: ["orb", "star", "shard", "ember"] },
                        fairy: { ringColor: "#f472b6", ringGlow: "rgba(244, 114, 182, 0.7)", palette: ["#f472b6", "#f9a8d4", "#fdf2f8", "#e879f9", "#ffffff"], shapes: ["star", "orb", "star", "diamond"] },
                        steel: { ringColor: "#94a3b8", ringGlow: "rgba(148, 163, 184, 0.7)", palette: ["#94a3b8", "#cbd5e1", "#e2e8f0", "#64748b", "#ffffff"], shapes: ["shard", "diamond", "shard", "star"] },
                        dark: { ringColor: "#64748b", ringGlow: "rgba(100, 116, 139, 0.7)", palette: ["#64748b", "#475569", "#334155", "#94a3b8", "#1e293b"], shapes: ["shard", "orb", "ember", "diamond"] },
                        flying: { ringColor: "#cbd5e1", ringGlow: "rgba(203, 213, 225, 0.7)", palette: ["#cbd5e1", "#f1f5f9", "#e2e8f0", "#94a3b8", "#ffffff"], shapes: ["leaf", "orb", "droplet", "star"] },
                    },
                    au = ["#ff4b4b", "#ff8c00", "#ffd700", "#22c55e", "#00f0ff", "#6366f1", "#a855f7", "#ff3b94"],
                    av = ["#ffd700", "#f59e0b", "#fbbf24", "#ffffff", "#00f0ff", "#a855f7", "#ff3b94", "#38bdf8"],
                    aw = [
                        { angle: 0, dist: 52, rot: 180, size: 12 },
                        { angle: 24, dist: 46, rot: -140, size: 10 },
                        { angle: 48, dist: 56, rot: 210, size: 14 },
                        { angle: 75, dist: 48, rot: -90, size: 10 },
                        { angle: 102, dist: 50, rot: 160, size: 11 },
                        { angle: 128, dist: 54, rot: -220, size: 13 },
                        { angle: 154, dist: 46, rot: 130, size: 10 },
                        { angle: 180, dist: 52, rot: -180, size: 12 },
                        { angle: 206, dist: 44, rot: 150, size: 10 },
                        { angle: 232, dist: 58, rot: -240, size: 14 },
                        { angle: 258, dist: 50, rot: 110, size: 11 },
                        { angle: 284, dist: 52, rot: -170, size: 12 },
                        { angle: 310, dist: 56, rot: 200, size: 13 },
                        { angle: 336, dist: 46, rot: -120, size: 10 },
                        { angle: 60, dist: 60, rot: 270, size: 15 },
                        { angle: 240, dist: 58, rot: -280, size: 14 },
                        { angle: 15, dist: 62, rot: 190, size: 13 },
                        { angle: 90, dist: 64, rot: -160, size: 12 },
                        { angle: 165, dist: 60, rot: 230, size: 14 },
                        { angle: 270, dist: 62, rot: -190, size: 13 },
                        { angle: 35, dist: 68, rot: 310, size: 15 },
                        { angle: 115, dist: 66, rot: -250, size: 14 },
                        { angle: 195, dist: 70, rot: 280, size: 16 },
                        { angle: 300, dist: 68, rot: -300, size: 15 },
                        { angle: 10, dist: 74, rot: 340, size: 16 },
                        { angle: 80, dist: 72, rot: -320, size: 15 },
                        { angle: 140, dist: 76, rot: 360, size: 17 },
                        { angle: 215, dist: 74, rot: -340, size: 16 },
                        { angle: 260, dist: 72, rot: 320, size: 15 },
                        { angle: 325, dist: 75, rot: -350, size: 17 },
                        { angle: 45, dist: 78, rot: 380, size: 18 },
                        { angle: 225, dist: 78, rot: -380, size: 18 },
                    ];
                function ax({ pokemonType: a, rarity: b, tier: c }) {
                    let f = at[a] || at.normal,
                        g = void 0 !== c ? c : (0, F.wM)(b);
                    (0, e.useRef)(g).current = g;
                    let h = g >= 2,
                        i = aw.slice(0, 3 === g ? 32 : 2 === g ? 24 : 1 === g ? 20 : 16).map((a, b) => {
                            let c,
                                d,
                                e = (a.angle * Math.PI) / 180,
                                h = Math.round(Math.cos(e) * a.dist),
                                i = Math.round(Math.sin(e) * a.dist);
                            if (3 === g) ((c = av[b % av.length]), (d = b % 2 == 0 ? "star" : "diamond"));
                            else if (2 === g) ((c = au[b % au.length]), (d = b % 3 == 0 ? "star" : b % 3 == 1 ? "diamond" : "shard"));
                            else if (1 === g) {
                                let a = [...f.palette, "#c084fc", "#e879f9"];
                                ((c = a[b % a.length]), (d = b % 4 == 0 ? "diamond" : f.shapes[b % f.shapes.length]));
                            } else ((c = f.palette[b % f.palette.length]), (d = f.shapes[b % f.shapes.length]));
                            let j = 3 === g ? 1.25 : 2 === g ? 1.15 : 1 === g ? 1.06 : 1,
                                k = 3 === g ? 1.05 : 2 === g ? 0.95 : 1 === g ? 0.88 : 0.82;
                            return { x: h, y: i, rot: a.rot, delay: 0.36 + (b % 4) * 0.02, duration: k, size: Math.round(a.size * j), color: c, shape: d };
                        });
                    return (0, d.jsxs)("div", {
                        className: "pointer-events-none absolute inset-0 z-50 flex items-center justify-center overflow-visible",
                        children: [
                            g >= 2
                                ? (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("div", { className: "fullart-impact-shockwave absolute -inset-2 rounded-xl" }), (0, d.jsx)("div", { className: "fullart-impact-glow absolute -inset-3 rounded-full" })] })
                                : 1 === g
                                  ? (0, d.jsx)(d.Fragment, { children: (0, d.jsx)("div", { className: "card-impact-shockwave absolute -inset-2 rounded-xl", style: { borderColor: f.ringColor, boxShadow: `0 0 20px ${f.ringGlow}, 0 0 30px #c084fc, inset 0 0 14px ${f.ringGlow}` } }) })
                                  : (0, d.jsx)("div", { className: "card-impact-shockwave absolute -inset-2 rounded-xl", style: { borderColor: f.ringColor, boxShadow: `0 0 16px ${f.ringGlow}, inset 0 0 12px ${f.ringGlow}` } }),
                            i.map((a, b) => {
                                var c, e;
                                let f = { "--particle-x": `${a.x}px`, "--particle-y": `${a.y}px`, "--particle-rot": `${a.rot}deg`, width: `${a.size}px`, height: `${a.size}px`, animationDuration: `${a.duration}s`, animationDelay: `${a.delay}s`, filter: h ? `drop-shadow(0 0 6px ${a.color}) drop-shadow(0 0 12px #ffffff)` : `drop-shadow(0 0 4px ${a.color})` };
                                return (0, d.jsx)(
                                    "div",
                                    {
                                        style: f,
                                        className: `absolute flex items-center justify-center opacity-0 ${h ? "fullart-sparkle-particle" : "card-impact-particle"}`,
                                        children:
                                            ((c = a.shape),
                                            (e = a.color),
                                            "leaf" === c
                                                ? (0, d.jsx)("svg", { viewBox: "0 0 24 24", fill: e, className: "h-full w-full", children: (0, d.jsx)("path", { d: "M17 3C10 3 5 8 5 15C5 18 7 20 9 20C16 20 21 15 21 8C21 5 19 3 17 3ZM15.5 8.5C13.5 10.5 10.5 13.5 8 16", stroke: "#ffffff", strokeWidth: "1", strokeLinecap: "round", opacity: "0.4" }) })
                                                : "droplet" === c
                                                  ? (0, d.jsx)("svg", { viewBox: "0 0 24 24", fill: e, className: "h-full w-full", children: (0, d.jsx)("path", { d: "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" }) })
                                                  : "ember" === c
                                                    ? (0, d.jsx)("svg", { viewBox: "0 0 24 24", fill: e, className: "h-full w-full", children: (0, d.jsx)("path", { d: "M12 2C11 7 7 9 7 14C7 17.87 10.13 21 14 21C16.8 21 19.2 19.36 20.3 17C18 17 16 15 16 13C16 10.5 17.5 8.5 18.5 7C16 8 13.5 5 12 2Z" }) })
                                                    : "bolt" === c
                                                      ? (0, d.jsx)("svg", { viewBox: "0 0 24 24", fill: e, className: "h-full w-full", children: (0, d.jsx)("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" }) })
                                                      : "star" === c || h
                                                        ? (0, d.jsx)("svg", { viewBox: "0 0 24 24", fill: e, className: "h-full w-full", children: (0, d.jsx)("path", { d: "M12 0L14.4 8.6L23 11L14.4 13.4L12 22L9.6 13.4L1 11L9.6 8.6Z" }) })
                                                        : "diamond" === c
                                                          ? (0, d.jsx)("svg", { viewBox: "0 0 24 24", fill: e, className: "h-full w-full", children: (0, d.jsx)("polygon", { points: "12 2 22 12 12 22 2 12" }) })
                                                          : "shard" === c
                                                            ? (0, d.jsx)("svg", { viewBox: "0 0 24 24", fill: e, className: "h-full w-full", children: (0, d.jsx)("polygon", { points: "12 2 20 9 16 22 6 18 4 8" }) })
                                                            : (0, d.jsx)("div", { className: "h-full w-full rounded-full", style: { backgroundColor: e, boxShadow: `0 0 8px ${e}` } })),
                                    },
                                    b,
                                );
                            }),
                        ],
                    });
                }
                function ay(a) {
                    a.stopPropagation();
                }
                function az() {
                    return (0, e.useRef)(null);
                }
                function aA({ slot: a, card: b, availableCount: c = 0, isHighlighted: f = !1, isDropping: g = !1, mountImage: h = !0, priority: i = !1, pauseTilt: j = !1, onClick: k }) {
                    let l = (0, e.useContext)(ar.cm),
                        m = !l || l.animationsEnabled,
                        n = g && m,
                        o = az(),
                        p = az();
                    (0, e.useRef)(!1);
                    let q = !!b,
                        r = !q && c > 0,
                        s = f && !j,
                        w = s ? "slot-glow" : "",
                        x = a.target_dex_id ?? b?.pokemon_dex_id ?? null,
                        y = s && x ? (0, v.bl)(x) : void 0,
                        z = y ? { "--glow-ring": y.ring, "--glow-bright": y.bright, "--glow-soft": y.soft } : void 0,
                        B = (a) => {
                            ("Enter" === a.key || " " === a.key) && (a.preventDefault(), k());
                        },
                        [C, D] = (0, e.useState)(!1);
                    if (q && b) {
                        let c = x ? v.FV.get(x) : null,
                            e = c?.type ?? "normal",
                            f = (0, E.WE)(b.card_variant, b.card_rarity, b.card_image_url, b.card_name),
                            g = (0, L.Mr)(b.card_types, b.pokemon_dex_id);
                        return (0, d.jsxs)("div", {
                            ref: o,
                            className: `relative flex h-full min-h-0 w-full min-w-0 items-center justify-center binder-filled-slot [container-type:size] hover:z-30 focus-within:z-30 ${n ? "z-40" : ""} ${s ? "z-30" : ""}`,
                            children: [
                                (0, d.jsx)("div", {
                                    className: `relative aspect-[8/11] h-[min(100%,calc(100cqw*11/8))] w-[min(100%,calc(100cqh*8/11))] rounded-lg ${s ? "z-20" : ""} ${w}`,
                                    style: z,
                                    children: (0, d.jsx)("div", {
                                        className: `relative h-full w-full ${n ? "card-drop" : ""}`,
                                        children: (0, d.jsx)(
                                            A.LW,
                                            {
                                                className: "relative h-full w-full overflow-hidden rounded-lg bg-transparent",
                                                maxTilt: 12,
                                                scale: 1.15,
                                                glareOpacity: 0.25,
                                                shineMode: f,
                                                elementTypes: g,
                                                paused: j,
                                                isLoading: !C,
                                                children: (0, d.jsx)("button", {
                                                    type: "button",
                                                    id: `binder-slot-${a.id}`,
                                                    onClick: k,
                                                    onMouseDownCapture: ay,
                                                    onPointerDownCapture: ay,
                                                    onTouchStartCapture: ay,
                                                    onKeyDown: B,
                                                    "aria-label": `${b.card_name}${x ? `, #${x}` : ""}`,
                                                    className: "relative flex h-full min-h-0 w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-poke-blue",
                                                    children: h ? (0, d.jsx)(t.default, { src: (0, u.HO)(b.card_image_url), alt: b.card_name, fill: !0, sizes: "(max-width: 768px) 30vw, 15vw", className: "pointer-events-none object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]", unoptimized: !0, priority: i, onLoad: () => D(!0) }) : null,
                                                }),
                                            },
                                            b.id,
                                        ),
                                    }),
                                }),
                                n && (0, d.jsx)(ax, { pokemonType: e, rarity: b.card_rarity }),
                            ],
                        });
                    }
                    if ("free" === a.slot_type)
                        return (0, d.jsxs)("button", {
                            type: "button",
                            ref: p,
                            id: `binder-slot-${a.id}`,
                            onClick: k,
                            onKeyDown: B,
                            "aria-label": `Compartimento livre ${a.slot_index}, vazio`,
                            style: z,
                            onMouseDownCapture: ay,
                            onPointerDownCapture: ay,
                            onTouchStartCapture: ay,
                            className: `group relative h-full min-h-0 w-full cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-white/15 bg-[#090c13]/80 p-2 text-left outline-none transition-all duration-200 hover:border-poke-blue/50 hover:bg-[#0f1422] focus-visible:ring-2 focus-visible:ring-poke-blue ${s ? "z-30" : ""} ${w}`,
                            children: [
                                (0, d.jsx)("div", { className: "pointer-events-none absolute top-2 left-2 z-10", children: (0, d.jsx)("span", { className: "rounded bg-black/40 px-1.5 py-0.5 text-[10px] font-medium text-slate-400", children: "Livre" }) }),
                                (0, d.jsxs)("div", {
                                    className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5",
                                    children: [(0, d.jsx)("div", { className: "flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all duration-200 group-hover:border-poke-blue/40 group-hover:bg-poke-blue/20 group-hover:text-white", children: (0, d.jsx)(X.A, { size: 16 }) }), (0, d.jsx)("span", { className: "text-[10px] font-semibold text-slate-400 group-hover:text-slate-200", children: "Inserir Carta" })],
                                }),
                            ],
                        });
                    if ("card" === a.slot_type)
                        return (0, d.jsxs)("button", {
                            type: "button",
                            ref: p,
                            id: `binder-slot-${a.id}`,
                            onClick: k,
                            onKeyDown: B,
                            "aria-label": a.target_card_name ? `Meta de carta: ${a.target_card_name}, vazia` : "Meta de carta, vazia",
                            style: z,
                            onMouseDownCapture: ay,
                            onPointerDownCapture: ay,
                            onTouchStartCapture: ay,
                            className: `group relative h-full min-h-0 w-full cursor-pointer overflow-hidden rounded-lg border border-amber-500/30 bg-[#0c1017] p-2 text-left outline-none transition-all duration-200 hover:border-amber-400/60 hover:bg-[#131926] focus-visible:ring-2 focus-visible:ring-poke-blue ${s ? "z-30" : ""} ${w}`,
                            children: [
                                a.target_card_image_url && h && (0, d.jsx)("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: (0, d.jsx)(t.default, { src: (0, u.HO)(a.target_card_image_url), alt: a.target_card_name || "Carta", fill: !0, sizes: "(max-width: 768px) 30vw, 15vw", className: "object-contain opacity-25 grayscale transition-opacity duration-200 group-hover:opacity-40", unoptimized: !0 }) }),
                                (0, d.jsx)("div", { className: "pointer-events-none absolute top-2 left-2 z-10", children: (0, d.jsx)("span", { className: "rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-amber-300 backdrop-blur-sm", children: "TCG Card" }) }),
                                (0, d.jsx)("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: (0, d.jsx)("div", { className: "flex h-8 w-8 items-center justify-center rounded-full border border-amber-500/40 bg-black/60 text-amber-300 shadow-md backdrop-blur-sm transition-all duration-200", children: (0, d.jsx)(X.A, { size: 16 }) }) }),
                                a.target_card_name && (0, d.jsx)("div", { className: "pointer-events-none absolute bottom-2 left-2 right-2 z-10", children: (0, d.jsx)("span", { className: "block truncate rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-slate-200 backdrop-blur-sm", children: a.target_card_name }) }),
                            ],
                        });
                    let F = a.target_dex_id || 1,
                        G = v.FV.get(F)?.name || a.target_card_name || `Pok\xe9mon #${F}`,
                        H = `#${String(F).padStart(3, "0")}`,
                        I = r ? `border-[var(--theme-primary)]/25 bg-[#0b0e15] ${j ? "" : "hover:border-[var(--theme-primary)]/45 hover:bg-[#10141f] hover:z-20"}` : `border-[#1a2130] bg-[#0c1017] shadow-sm ${j ? "" : "hover:border-white/15 hover:bg-[#121722] hover:z-20"}`;
                    return (0, d.jsxs)("button", {
                        type: "button",
                        ref: p,
                        id: `binder-slot-${a.id}`,
                        onClick: k,
                        onKeyDown: B,
                        "aria-label": r ? `${G}, ${H}, vazio, ${c} ${c > 1 ? "cartas dispon\xedveis" : "carta dispon\xedvel"} na cole\xe7\xe3o` : `${G}, ${H}, vazio`,
                        style: z,
                        onMouseDownCapture: ay,
                        onPointerDownCapture: ay,
                        onTouchStartCapture: ay,
                        className: `group relative h-full min-h-0 w-full cursor-pointer overflow-hidden rounded-lg p-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-poke-blue binder-empty-slot ${I} ${s ? "z-30" : ""} ${w}`,
                        children: [
                            (0, d.jsx)("div", { className: "pointer-events-none absolute top-2 left-2 z-10", children: (0, d.jsx)("span", { className: `rounded px-1.5 py-0.5 text-[11px] font-bold leading-none ${r ? "bg-black/50 text-slate-300" : "bg-black/40 text-slate-500"}`, children: H }) }),
                            r && (0, d.jsx)("div", { className: "pointer-events-none absolute top-2.5 right-2.5 z-10 flex items-center justify-center", children: (0, d.jsx)("span", { className: "h-2 w-2 rounded-full bg-[var(--theme-primary)] opacity-85 shadow-[0_0_6px_var(--theme-primary-glow)]" }) }),
                            (0, d.jsxs)("div", {
                                className: "pointer-events-none absolute inset-2 bottom-7",
                                children: [
                                    h ? (0, d.jsx)(t.default, { src: (0, v.Xw)(F), alt: G, fill: !0, sizes: "(max-width: 768px) 30vw, 15vw", className: `silhouette-img object-contain ${r ? "opacity-30" : "opacity-25"} ${j ? "" : r ? "transition-opacity duration-200 group-hover:opacity-50" : "transition-opacity duration-200 group-hover:opacity-45"}`, unoptimized: !0, priority: i, onLoad: () => (0, v.nQ)(F) }) : null,
                                    (0, d.jsx)("div", {
                                        className: "binder-slot-plus absolute inset-0 flex items-center justify-center",
                                        children: (0, d.jsx)("div", {
                                            className: `flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 ${r ? `border border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] ${j ? "" : "group-hover:border-[var(--theme-primary)]/50 group-hover:bg-[var(--theme-primary)]/20"}` : `bg-white/5 text-slate-400 ${j ? "" : "transition-colors group-hover:bg-white/10 group-hover:text-white"}`}`,
                                            children: (0, d.jsx)(X.A, { size: 16 }),
                                        }),
                                    }),
                                ],
                            }),
                            (0, d.jsx)("div", { className: "binder-slot-name pointer-events-none absolute bottom-2 left-2 right-2 z-10", children: (0, d.jsx)("span", { className: `text-[11px] font-semibold transition-colors ${r ? "text-slate-300 group-hover:text-white" : "text-slate-400"}`, children: G }) }),
                        ],
                    });
                }
                let aB = { "1x1": "grid-cols-1 grid-rows-1 p-3", "2x2": "grid-cols-2 grid-rows-2 gap-2.5 sm:gap-3 p-2", "3x3": "grid-cols-3 grid-rows-3 gap-2 sm:gap-2.5 p-1.5", "3x4": "grid-cols-3 grid-rows-4 gap-1.5 sm:gap-2 p-1" },
                    aC = { "1x1": 1, "2x2": 4, "3x3": 9, "3x4": 12 };
                function aD(a, b) {
                    return Math.min(b, Math.max(1, Math.trunc(a) || 1));
                }
                function aE(a, b, c) {
                    return Array.from({ length: aC[a.grid_type] }, (d, e) => {
                        var f;
                        return b.get(`${c}-${e + 1}`) ?? ((f = e + 1), { id: `virtual-${c}-${f}`, binder_id: a.id, page_number: c, slot_index: f, slot_type: "free", created_at: "", updated_at: "" });
                    });
                }
                let aF = (0, e.forwardRef)(function ({ binder: a, back: b = !1, onClick: c }, e) {
                        return (0, d.jsx)("div", { ref: e, "data-density": "hard", onClick: c, className: `binder-book-page ${b ? "binder-cover-back" : "binder-cover-front cursor-pointer"} h-full w-full overflow-hidden rounded-xl`, children: (0, d.jsx)(ap.l, { name: a.name, coverTheme: a.cover_theme, coverPokemonDexId: b ? null : a.cover_pokemon_dex_id, back: b, className: "h-full" }) });
                    }),
                    aG = (0, e.forwardRef)(function ({ binder: a }, b) {
                        let c = (0, ak.v)(a.cover_theme);
                        return (0, d.jsx)("div", {
                            ref: b,
                            "data-density": "hard",
                            className: "binder-book-page relative h-full w-full overflow-hidden rounded-xl border border-white/5 bg-[#0c1017]",
                            style: { backgroundImage: `radial-gradient(circle at 50% 50%, ${c.primaryColor}22, transparent 44%), repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 8px)` },
                            children: (0, d.jsx)("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: (0, d.jsx)(aq.z, { ballType: c.ballType, size: 260, className: "h-[52%] w-[52%] max-h-[260px] max-w-[260px] opacity-[0.09]", style: { filter: "none" } }) }),
                        });
                    }),
                    aH = (0, e.createContext)({ slotsMap: new Map(), highlightedSlotId: null, droppingSlotId: null, pauseTilt: !1, onSlotClick: () => {} }),
                    aI = (0, e.memo)(
                        (0, e.forwardRef)(function ({ binder: a, pageNumber: b }, c) {
                            let { slotsMap: f, highlightedSlotId: g, droppingSlotId: h, pauseTilt: i, onSlotClick: j } = (0, e.useContext)(aH),
                                k = aE(a, f, b),
                                l = k.filter((a) => a.card).length;
                            return (0, d.jsx)("div", {
                                ref: c,
                                "data-density": "soft",
                                className: "binder-book-page relative h-full w-full rounded-xl bg-[#0d111a]",
                                children: (0, d.jsxs)("div", {
                                    className: "flex h-full min-h-0 w-full flex-col rounded-xl border border-white/5 bg-gradient-to-br from-[#141824] via-[#10131d] to-[#0a0d14] px-3 pt-3 pb-2 text-white sm:px-3.5 sm:pt-3.5",
                                    children: [
                                        (0, d.jsxs)("div", { className: "mb-1.5 flex shrink-0 items-center justify-between border-b border-white/5 pb-1.5 text-xs font-semibold text-slate-400", children: [(0, d.jsxs)("span", { className: "font-medium text-slate-300", children: ["P\xe1gina ", b, " de ", (0, ad.r)(a.total_pages)] }), (0, d.jsxs)("span", { className: "font-mono text-[11px] text-slate-500", children: [l, "/", k.length, " cartas"] })] }),
                                        (0, d.jsx)("div", { className: `grid min-h-0 flex-1 rounded-xl border border-[#161b26] bg-[#0b0e15] shadow-inner ${aB[a.grid_type]}`, children: k.map((a) => (0, d.jsx)(aA, { slot: a, card: a.card, isHighlighted: g === a.id, isDropping: h === a.id, pauseTilt: i, onClick: () => j(a) }, a.id)) }),
                                    ],
                                }),
                            });
                        }),
                    );
                function aJ({ binder: a, slotsMap: b, currentPage: c, highlightedSlotId: f, droppingSlotId: g, onPageChange: h, onSlotClick: i }) {
                    let j = (0, e.useContext)(ar.cm),
                        k = j?.animationsEnabled ?? !0,
                        [l, m] = (0, e.useState)("idle"),
                        [n, o] = (0, e.useState)(c),
                        p = (0, e.useRef)(1),
                        q = (0, e.useRef)(null),
                        r = (0, e.useRef)(!1),
                        s = "idle" !== l,
                        t = (0, ad.r)(a.total_pages),
                        u = aE(a, b, n),
                        v = (0, e.useCallback)(
                            (a) => {
                                let b = aD(a, t);
                                if (!s && b !== n) {
                                    if (((p.current = b > n ? 1 : -1), !k || window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
                                        (o(b), h(b));
                                        return;
                                    }
                                    (m("exit"),
                                        window.setTimeout(() => {
                                            (o(b), h(b), m("enter"), window.setTimeout(() => m("idle"), 180));
                                        }, 140));
                                }
                            },
                            [k, s, n, h, t],
                        );
                    return (0, d.jsxs)("div", {
                        className: `binder-mobile binder-mobile--entrance ${s ? "pointer-events-none" : ""}`,
                        onPointerDownCapture: (a) => {
                            ((r.current = !1), (q.current = a.isPrimary && !s ? { id: a.pointerId, x: a.clientX, y: a.clientY } : null));
                        },
                        onPointerUpCapture: (a) => {
                            let b = q.current;
                            if (((q.current = null), !b || b.id !== a.pointerId)) return;
                            let c = a.clientX - b.x,
                                d = a.clientY - b.y;
                            Math.abs(c) < as.B_ || Math.abs(c) <= Math.abs(d) || ((r.current = !0), v(n + (c < 0 ? 1 : -1)));
                        },
                        onClickCapture: (a) => {
                            r.current && (a.preventDefault(), a.stopPropagation(), (r.current = !1));
                        },
                        children: [
                            (0, d.jsxs)("div", { className: "mb-1.5 flex shrink-0 items-center justify-between border-b border-white/5 pb-1.5 text-xs font-semibold text-slate-400", children: [(0, d.jsxs)("span", { className: "font-medium text-slate-300", children: ["P\xe1gina ", n, " de ", t] }), (0, d.jsxs)("span", { className: "font-mono text-[11px] text-slate-500", children: [u.filter((a) => a.card).length, "/", u.length, " cartas"] })] }),
                            (0, d.jsx)("div", { className: "min-h-0 flex-1 overflow-hidden rounded-xl border border-[#161b26] bg-[#0b0e15] p-1.5 shadow-inner", children: (0, d.jsx)("div", { className: `binder-mobile-grid grid h-full min-h-0 ${aB[a.grid_type]}`, "data-phase": l, style: { "--binder-slide-x": `${-18 * p.current}px` }, children: u.map((a) => (0, d.jsx)(aA, { slot: a, card: a.card, isHighlighted: f === a.id, isDropping: g === a.id, pauseTilt: s, onClick: () => i(a) }, a.id)) }) }),
                        ],
                    });
                }
                let aK = (0, e.forwardRef)(function ({ binder: a, slots: b, currentPage: c, entryTargetPage: f, isMobile: g, highlightedSlotId: h, droppingSlotId: i, onPageChange: j, onSlotClick: k }, l) {
                    let m = (0, e.useContext)(ar.cm),
                        n = m?.animationsEnabled ?? !0,
                        [o, p] = (0, e.useState)(!1),
                        [q, r] = (0, e.useState)(!1),
                        [s, t] = (0, e.useState)(!1),
                        [u, v] = (0, e.useState)(!1),
                        w = (0, e.useRef)(null),
                        x = (0, e.useRef)(null),
                        y = (0, e.useRef)(0),
                        z = (0, e.useRef)(!1),
                        A = (0, ad.r)(a.total_pages),
                        B = (0, ad.m)(a.total_pages),
                        C = (0, e.useMemo)(() => new Map(b.map((a) => [`${a.page_number}-${a.slot_index}`, a])), [b]),
                        D = (0, e.useMemo)(() => (0, ak.v)(a.cover_theme), [a.cover_theme]),
                        E = (0, e.useMemo)(() => ({ slotsMap: C, highlightedSlotId: h, droppingSlotId: i, pauseTilt: s, onSlotClick: k }), [i, h, s, k, C]);
                    (0, e.useLayoutEffect)(() => {
                        if (g) return;
                        let a = w.current;
                        if (!a) return;
                        let b = () => !(a.getBoundingClientRect().width < 160) && (p(!0), !0);
                        if (b()) return;
                        let c = new ResizeObserver(() => {
                            b() && c.disconnect();
                        });
                        return (c.observe(a), () => c.disconnect());
                    }, [g]);
                    let F = (0, e.useRef)(null),
                        G = (0, e.useRef)(null),
                        H = (0, e.useCallback)(() => {
                            (G.current && (window.clearTimeout(G.current), (G.current = null)), (F.current = null));
                        }, []);
                    (0, e.useEffect)(
                        () => () => {
                            H();
                        },
                        [H],
                    );
                    let I = (0, e.useCallback)((b) => ae(b, a.total_pages, g), [a.total_pages, g]),
                        J = (0, e.useCallback)((b) => af(b, a.total_pages, g), [a.total_pages, g]),
                        K = (0, e.useCallback)(
                            (b) => {
                                var c;
                                if (g) return void j(aD(b, A));
                                let d = x.current?.pageFlip();
                                if (!d || s || null !== F.current) return;
                                let e = I(b),
                                    f = y.current;
                                if (ag(f, (c = a.total_pages)) === ag(e, c)) return;
                                if (!n || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                                    (H(), d.turnToPage(e));
                                    return;
                                }
                                let h = (function (a, b, c) {
                                    let d = ag(a, c),
                                        e = Math.abs((ag(b, c) - d) / 2),
                                        f = e >= 4 ? 2 : +(e >= 2);
                                    if (0 === f) return { mode: "direct", targetPhysical: b };
                                    let g = b > a ? 2 : -2;
                                    return { mode: "sequence", targetPhysical: b, intermediatePhysicalTargets: Array.from({ length: f }, (b, c) => a + g * (c + 1)) };
                                })(f, e, a.total_pages);
                                if ("direct" === h.mode) {
                                    (H(), (d.getSettings().flippingTime = as.s2), d.flip(h.targetPhysical));
                                    return;
                                }
                                ((F.current = { remainingPhysicalTargets: h.intermediatePhysicalTargets.slice(1), targetPhysical: h.targetPhysical }), t(!0), (d.getSettings().flippingTime = as.DS), d.flip(h.intermediatePhysicalTargets[0]));
                            },
                            [n, a.total_pages, s, g, j, I, H, A],
                        ),
                        L = (0, e.useCallback)(() => {
                            if (g) return void j(aD(c + 1, A));
                            if (F.current) return;
                            let a = x.current?.pageFlip();
                            a && !s && (H(), (a.getSettings().flippingTime = as.s2), a.flipNext());
                        }, [c, s, g, j, H, A]),
                        M = (0, e.useCallback)(() => {
                            if (g) return void j(aD(c - 1, A));
                            if (F.current) return;
                            let a = x.current?.pageFlip();
                            a && !s && (H(), (a.getSettings().flippingTime = as.s2), a.flipPrev());
                        }, [c, s, g, j, H, A]);
                    (0, e.useImperativeHandle)(l, () => ({ flipNext: L, flipPrev: M, turnToPage: K, isBusy: () => s || null !== F.current }), [L, M, s, K]);
                    let N = (0, e.useCallback)(() => {
                        if (g || u || s) return;
                        let a = x.current?.pageFlip();
                        a && (v(!0), t(!0), n && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? a.flipNext() : a.turnToPage(2));
                    }, [n, u, s, g]);
                    ((0, e.useEffect)(() => {
                        if (g || !q || !o || u) return;
                        let a = window.setTimeout(N, 820);
                        return () => window.clearTimeout(a);
                    }, [o, q, u, g, N]),
                        (0, e.useEffect)(() => {
                            if (g || !u || s) return;
                            let a = I(c);
                            J(y.current) !== J(a) && K(c);
                        }, [c, u, s, g, J, I, K]),
                        (0, e.useEffect)(() => {
                            g || !u || s || z.current || ((z.current = !0), 1 !== f && K(f));
                        }, [f, u, s, g, K]));
                    let O = (0, e.useMemo)(() => {
                        let b = [(0, d.jsx)(aF, { binder: a, onClick: N }, "front"), (0, d.jsx)(aG, { binder: a }, "inside-front")];
                        for (let c = 1; c <= a.total_pages; c++) b.push((0, d.jsx)(aI, { binder: a, pageNumber: c }, `catalog-${c}`));
                        return (null !== B && b.push((0, d.jsx)(aI, { binder: a, pageNumber: B }, "trailing-slots")), b.push((0, d.jsx)(aG, { binder: a }, "inside-back"), (0, d.jsx)(aF, { binder: a, back: !0 }, "back")), b);
                    }, [a, N, B]);
                    return g
                        ? (0, d.jsx)("div", { className: "w-full", style: { "--theme-primary": D.primaryColor, "--theme-primary-glow": D.glowColor }, children: (0, d.jsx)(aJ, { binder: a, slotsMap: C, currentPage: c, highlightedSlotId: h, droppingSlotId: i, onPageChange: j, onSlotClick: k }) })
                        : (0, d.jsx)(aH.Provider, {
                              value: E,
                              children: (0, d.jsx)("div", {
                                  className: `relative flex h-full min-h-0 w-full flex-col items-center ${q ? "binder-stage-entrance" : "invisible"}`,
                                  style: { "--binder-entrance-duration": "720ms", "--theme-primary": D.primaryColor, "--theme-primary-glow": D.glowColor },
                                  children: (0, d.jsx)("div", {
                                      ref: w,
                                      className: `binder-book-stage ${s ? "binder-book-stage--busy" : ""}`,
                                      children: o
                                          ? (0, d.jsx)(ao.A, {
                                                ref: x,
                                                width: as.Q4,
                                                height: as.vf,
                                                size: "stretch",
                                                minWidth: as.h4,
                                                maxWidth: as.lz,
                                                minHeight: 540,
                                                maxHeight: 820,
                                                maxShadowOpacity: as.Wn,
                                                showCover: !0,
                                                mobileScrollSupport: !0,
                                                swipeDistance: as.SJ,
                                                clickEventForward: !0,
                                                disableFlipByClick: !n,
                                                flippingTime: as.s2,
                                                usePortrait: !1,
                                                startPage: 0,
                                                onInit: () => r(!0),
                                                onChangeState: (a) => {
                                                    t(["flipping", "user_fold", "fold_corner"].includes(String(a.data)) || null !== F.current);
                                                },
                                                onFlip: (a) => {
                                                    let b = Number(a.data) || 0;
                                                    y.current = b;
                                                    let c = F.current;
                                                    if (c) {
                                                        let a = c.remainingPhysicalTargets.shift();
                                                        null != a
                                                            ? (G.current = window.setTimeout(() => {
                                                                  let b = x.current?.pageFlip();
                                                                  b && b.flip(a);
                                                              }, 20))
                                                            : (G.current = window.setTimeout(() => {
                                                                  let a = x.current?.pageFlip();
                                                                  a && ((a.getSettings().flippingTime = as.s2), a.flip(c.targetPhysical), (F.current = null));
                                                              }, 20));
                                                        return;
                                                    }
                                                    j(J(b));
                                                },
                                                drawShadow: n,
                                                startZIndex: 0,
                                                autoSize: !0,
                                                useMouseEvents: !1,
                                                showPageCorners: !1,
                                                renderOnlyPageLengthChange: !0,
                                                className: `binder-flipbook-root ${!n ? "binder-flipbook-root--static" : ""}`,
                                                style: {},
                                                children: O,
                                            })
                                          : null,
                                  }),
                              }),
                          });
                });
                function aL(a, b) {
                    return Math.min(b, Math.max(1, Math.trunc(a) || 1));
                }
                function aM({ binder: a, initialSlots: b, otherBinders: c = [], isOwner: f = !0 }) {
                    let m = (0, h.useRouter)(),
                        s = (0, h.useSearchParams)(),
                        { mutate: t, cache: u } = (0, i.iX)(),
                        v = (0, ad.r)(a.total_pages),
                        w = aL(Number(s.get("page")), v),
                        x = (0, e.useRef)(null),
                        [y, z] = (0, e.useState)(1),
                        [A, B] = (0, e.useState)(b),
                        [C, D] = (0, e.useState)(!1),
                        [E, F] = (0, e.useState)(null),
                        [G, H] = (0, e.useState)(!1),
                        [I, J] = (0, e.useState)(!1),
                        [K, L] = (0, e.useState)(null),
                        [M, N] = (0, e.useState)(!1),
                        [O, P] = (0, e.useState)(!1),
                        [Q, R] = (0, e.useState)(),
                        [S, T] = (0, e.useState)(),
                        [U, V] = (0, e.useState)(null),
                        [W, X] = (0, e.useState)(null),
                        [Y, Z] = (0, e.useState)(null),
                        $ = (0, e.useRef)(0),
                        _ = (0, e.useRef)(null);
                    (0, e.useRef)(null);
                    let aa = (0, e.useRef)(null),
                        ab = (0, e.useRef)(null),
                        ag = (0, e.useRef)(null),
                        ai = (0, e.useCallback)(
                            (b) => {
                                let c = C ? aL(b, v) : Math.min(a.total_pages + 2, Math.max(0, Math.trunc(b) || 0));
                                z(c);
                                let d = new URL(window.location.href);
                                (d.searchParams.set("page", String(c)), window.history.replaceState(window.history.state, "", d.toString()));
                            },
                            [a.total_pages, C, v],
                        ),
                        aj = (0, e.useCallback)(
                            (a) => {
                                let b = aL(a, v);
                                b !== y && x.current?.turnToPage(b);
                            },
                            [y, v],
                        ),
                        ak = (0, e.useCallback)(
                            (a, b) => {
                                $.current += 1;
                                let c = $.current;
                                (null !== _.current && (window.clearTimeout(_.current), (_.current = null)), V(null), X({ slotId: b, pageNumber: a, requestId: c }), aj(a));
                            },
                            [aj],
                        ),
                        am = (0, e.useMemo)(() => {
                            let a = new Map();
                            for (let b = 1; b <= v; b++) a.set(b, { filled: 0, total: 0 });
                            for (let b of A) {
                                let c = a.get(b.page_number);
                                c && ((c.total += 1), b.card && (c.filled += 1));
                            }
                            return a;
                        }, [v, A]),
                        ao = (0, e.useMemo)(() => {
                            if (C || null === E) return null;
                            let b = af(ae(E, a.total_pages, !1), a.total_pages, !1);
                            return new Set([b, b + 1]);
                        }, [a.total_pages, E, C]),
                        ap = (0, e.useCallback)(
                            (a) => {
                                f && (L(a), N(!0));
                            },
                            [f],
                        ),
                        aq = (0, e.useCallback)((a, b) => {
                            (B((c) => c.map((c) => (c.id === a ? { ...c, user_card_id: b.id, card: b } : c))), Z(a), window.setTimeout(() => Z(null), 1400));
                        }, []),
                        ar = (0, e.useCallback)((a) => {
                            B((b) => b.map((b) => (b.id === a ? { ...b, user_card_id: null, card: null } : b)));
                        }, []),
                        as = (0, e.useCallback)(
                            (a) => {
                                for (let b of u.keys()) {
                                    if (!(0, ah.B8)(b)) continue;
                                    let c = u.get(b)?.data;
                                    c?.cards && t(b, { cards: [...c.cards, a] }, !1);
                                }
                            },
                            [u, t],
                        ),
                        at = (0, e.useCallback)(() => {
                            let a = aa.current;
                            (P(!1),
                                null !== ab.current && window.clearTimeout(ab.current),
                                (ab.current = window.setTimeout(() => {
                                    ab.current = null;
                                    let b = A.find((b) => b.id === a);
                                    if (!b) return void L(null);
                                    (L(b), N(!0));
                                }, 300)));
                        }, [A]),
                        au = (0, e.useCallback)(
                            (a, b) => {
                                ak(a, b);
                            },
                            [ak],
                        ),
                        av = (0, e.useCallback)(
                            (a) => {
                                let b = A.find((b) => b.target_dex_id === a || b.card?.pokemon_dex_id === a);
                                b && ak(b.page_number, b.id);
                            },
                            [ak, A],
                        ),
                        aw = y > +!!C,
                        ax = y < (C ? v : a.total_pages + 2);
                    return (0, d.jsxs)("div", {
                        className: "flex min-h-screen flex-col overflow-x-clip bg-[#0a0c10] text-slate-100",
                        children: [
                            (0, d.jsx)("header", {
                                className: "sticky top-0 z-40 border-b border-white/10 bg-[#0a0c10]/90 backdrop-blur-md",
                                children: (0, d.jsxs)("div", {
                                    className: "mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2.5 sm:px-6",
                                    children: [
                                        (0, d.jsxs)("div", {
                                            className: "flex min-w-0 items-center gap-2 sm:gap-3",
                                            children: [
                                                (0, d.jsxs)(g(), { href: "/", prefetch: !0, className: "flex shrink-0 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white sm:px-3 sm:py-2", children: [(0, d.jsx)(j.A, { size: 15 }), (0, d.jsx)("span", { className: "hidden sm:inline", children: "Estante" })] }),
                                                (0, d.jsxs)("div", {
                                                    className: "relative min-w-0",
                                                    children: [
                                                        (0, d.jsxs)("button", {
                                                            type: "button",
                                                            onClick: () => J((a) => !a),
                                                            className: "flex min-w-0 items-center gap-2 rounded-xl border border-transparent px-2 py-1.5 text-left transition-colors hover:border-white/10 hover:bg-white/5",
                                                            children: [
                                                                (0, d.jsxs)("div", {
                                                                    className: "min-w-0",
                                                                    children: [
                                                                        (0, d.jsxs)("div", { className: "flex items-center gap-2", children: [(0, d.jsx)("h1", { className: "truncate text-sm font-extrabold text-white sm:text-base", children: a.name }), (0, d.jsx)("span", { className: "hidden rounded bg-black/40 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-300 sm:inline", children: a.grid_type })] }),
                                                                        (0, d.jsxs)("span", { className: "text-[10px] text-slate-400", children: ["P\xe1gina ", y, " de ", v] }),
                                                                    ],
                                                                }),
                                                                c.length > 1 ? (0, d.jsx)(k.A, { size: 14, className: "shrink-0 text-slate-400" }) : null,
                                                            ],
                                                        }),
                                                        I && c.length > 1
                                                            ? (0, d.jsxs)("div", {
                                                                  className: "absolute top-full left-0 z-50 mt-1.5 w-64 rounded-2xl border border-white/10 bg-[#121622] p-1.5 shadow-2xl backdrop-blur-xl",
                                                                  children: [
                                                                      (0, d.jsx)("div", { className: "px-2.5 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase", children: "Seus binders" }),
                                                                      (0, d.jsx)("div", {
                                                                          className: "flex max-h-60 flex-col gap-1 overflow-y-auto",
                                                                          children: c.map((b) => {
                                                                              let c = b.id === a.id;
                                                                              return (0, d.jsxs)(
                                                                                  "button",
                                                                                  {
                                                                                      type: "button",
                                                                                      onClick: () => {
                                                                                          (J(!1), c || m.push(`/binders/${b.id}`));
                                                                                      },
                                                                                      className: `flex items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs font-semibold transition-colors ${c ? "bg-poke-blue/20 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`,
                                                                                      children: [(0, d.jsx)("span", { className: "truncate", children: b.name }), (0, d.jsxs)("div", { className: "flex items-center gap-1.5", children: [(0, d.jsx)("span", { className: "rounded bg-black/40 px-1 py-0.5 font-mono text-[9px] text-slate-400", children: b.grid_type }), c ? (0, d.jsx)(l.A, { size: 13, className: "text-poke-blue" }) : null] })],
                                                                                  },
                                                                                  b.id,
                                                                              );
                                                                          }),
                                                                      }),
                                                                  ],
                                                              })
                                                            : null,
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, d.jsxs)("div", {
                                            className: "flex shrink-0 items-center gap-2",
                                            children: [
                                                (0, d.jsxs)("button", { type: "button", onClick: () => H(!0), className: "flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-white/20 hover:bg-white/10 sm:px-3 sm:py-2", children: [(0, d.jsx)(n, { size: 15, className: "text-poke-blue" }), (0, d.jsx)("span", { className: "hidden sm:inline", children: "Estat\xedsticas" })] }),
                                                f ? (0, d.jsx)(g(), { href: `/binders/${a.id}/edit`, title: "Editar estrutura", className: "flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white sm:h-9 sm:w-9", children: (0, d.jsx)(o.A, { size: 15 }) }) : null,
                                            ],
                                        }),
                                    ],
                                }),
                            }),
                            (0, d.jsx)("main", {
                                className: "mx-auto flex w-full max-w-7xl flex-1 flex-col items-center overflow-x-clip px-0 pt-2 pb-28 sm:pt-3 md:px-4 md:pb-14",
                                children: (0, d.jsxs)("div", {
                                    className: "flex min-h-0 w-full flex-1 flex-col items-center",
                                    children: [
                                        (0, d.jsxs)("div", {
                                            className: "mb-2 flex w-full max-w-md shrink-0 items-center justify-between gap-2 px-2 md:hidden",
                                            children: [
                                                (0, d.jsx)("button", { type: "button", disabled: !aw, onClick: () => x.current?.flipPrev(), "aria-label": "P\xe1gina anterior", className: `flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all ${aw ? "border-white/10 bg-[#121620]/85 text-white shadow-lg active:scale-95" : "border-white/5 bg-white/[0.02] text-slate-600 opacity-25"}`, children: (0, d.jsx)(p, { size: 20 }) }),
                                                (0, d.jsx)("div", { className: "min-w-0 flex-1", children: (0, d.jsx)(an, { onSearch: av }) }),
                                                (0, d.jsx)("button", { type: "button", disabled: !ax, onClick: () => x.current?.flipNext(), "aria-label": "Pr\xf3xima p\xe1gina", className: `flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all ${ax ? "border-white/10 bg-[#121620]/85 text-white shadow-lg active:scale-95" : "border-white/5 bg-white/[0.02] text-slate-600 opacity-25"}`, children: (0, d.jsx)(q, { size: 20 }) }),
                                            ],
                                        }),
                                        (0, d.jsx)("div", { className: "mb-5 hidden w-full max-w-sm shrink-0 justify-center md:flex", children: (0, d.jsx)(an, { onSearch: av }) }),
                                        (0, d.jsxs)("div", {
                                            className: "relative flex min-h-0 w-full flex-1 items-center justify-center gap-2 max-md:flex-none lg:gap-4 xl:gap-5",
                                            children: [
                                                (0, d.jsx)("button", {
                                                    type: "button",
                                                    disabled: !aw,
                                                    onClick: () => x.current?.flipPrev(),
                                                    "aria-label": "P\xe1gina anterior",
                                                    className: `hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-200 md:flex xl:h-14 xl:w-14 ${aw ? "border-white/10 bg-[#121620]/85 text-white shadow-xl hover:border-white/25 hover:bg-white/15 hover:scale-105 active:scale-95" : "border-white/5 bg-white/[0.02] text-slate-600 opacity-25"}`,
                                                    children: (0, d.jsx)(p, { size: 24 }),
                                                }),
                                                (0, d.jsx)("div", { className: "relative flex h-full min-h-0 w-full max-w-6xl flex-1 items-center justify-center max-md:h-auto max-md:flex-none", children: (0, d.jsx)(aK, { ref: x, binder: a, slots: A, currentPage: y, entryTargetPage: w, isMobile: C, highlightedSlotId: U, droppingSlotId: Y, onPageChange: ai, onSlotClick: ap }) }),
                                                (0, d.jsx)("button", {
                                                    type: "button",
                                                    disabled: !ax,
                                                    onClick: () => x.current?.flipNext(),
                                                    "aria-label": "Pr\xf3xima p\xe1gina",
                                                    className: `hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-200 md:flex xl:h-14 xl:w-14 ${ax ? "border-white/10 bg-[#121620]/85 text-white shadow-xl hover:border-white/25 hover:bg-white/15 hover:scale-105 active:scale-95" : "border-white/5 bg-white/[0.02] text-slate-600 opacity-25"}`,
                                                    children: (0, d.jsx)(q, { size: 24 }),
                                                }),
                                            ],
                                        }),
                                        (0, d.jsx)("nav", {
                                            "aria-label": "Navega\xe7\xe3o r\xe1pida de p\xe1ginas",
                                            className: "relative z-20 mt-2 w-full max-w-6xl shrink-0 px-2 md:mt-5",
                                            children: (0, d.jsx)("div", {
                                                onMouseLeave: () => F(null),
                                                className: "flex max-h-28 flex-wrap justify-center gap-1 overflow-y-auto rounded-2xl border border-white/10 bg-[#10131b]/90 p-1.5 shadow-2xl backdrop-blur-xl sm:p-2.5",
                                                children: Array.from({ length: v }, (a, b) => {
                                                    let c = b + 1,
                                                        e = am.get(c) ?? { filled: 0, total: 0 },
                                                        f = c === y || (!C && c === y + 1),
                                                        g = ao ? ao.has(c) : f;
                                                    return (0, d.jsxs)(
                                                        "button",
                                                        {
                                                            type: "button",
                                                            onClick: () => aj(c),
                                                            onMouseEnter: () => F(c),
                                                            onFocus: () => F(c),
                                                            onBlur: () => F(null),
                                                            "aria-current": f ? "page" : void 0,
                                                            className: `relative flex h-9 min-w-10 flex-col items-center justify-center overflow-hidden rounded-lg border px-1 text-xs transition-[background-color,border-color,color,box-shadow] duration-200 ease-out motion-reduce:transition-none ${g ? "border-[var(--theme-primary)]/40 bg-[var(--theme-primary)]/20 text-white shadow-[0_0_12px_var(--theme-primary-glow)]" : "border-transparent bg-white/[0.02] text-slate-400 hover:bg-white/[0.07] hover:text-slate-200"}`,
                                                            children: [(0, d.jsx)("span", { className: "font-bold", children: c }), (0, d.jsxs)("span", { className: "font-mono text-[9px]", children: [e.filled, "/", e.total] }), (0, d.jsx)("span", { className: "absolute bottom-0 left-0 h-0.5 bg-[var(--theme-primary)]", style: { width: `${e.total ? (e.filled / e.total) * 100 : 0}%` } })],
                                                        },
                                                        c,
                                                    );
                                                }),
                                            }),
                                        }),
                                    ],
                                }),
                            }),
                            (0, d.jsx)(al, { isOpen: G, onClose: () => H(!1), binder: a, slots: A, onSlotNavigate: au }),
                            (0, d.jsx)(ac, {
                                isOpen: M,
                                onClose: () => {
                                    (N(!1), L(null));
                                },
                                slot: K,
                                binderId: a.id,
                                binderName: a.name,
                                binderGrid: a.grid_type,
                                onAssignSuccess: aq,
                                onUnassignSuccess: ar,
                                onOpenCatalogSearch: (a, b) => {
                                    ((aa.current = K?.id ?? null),
                                        R(a),
                                        T(b),
                                        N(!1),
                                        null !== ag.current && window.clearTimeout(ag.current),
                                        (ag.current = window.setTimeout(() => {
                                            ((ag.current = null), P(!0));
                                        }, 300)));
                                },
                            }),
                            (0, d.jsx)(r.g, {
                                isOpen: O,
                                onClose: () => {
                                    (null !== ag.current && (window.clearTimeout(ag.current), (ag.current = null)), P(!1), (aa.current = null), L(null));
                                },
                                onBack: at,
                                pokemonName: Q,
                                dexId: S,
                                onCardAdded: as,
                            }),
                        ],
                    });
                }
            },
            90664: (a, b, c) => {
                "use strict";
                c.d(b, { DY: () => i, G4: () => k, Ii: () => e, TU: () => j, Xu: () => g, rO: () => f, xV: () => l, xt: () => h });
                let d = /^[a-z][a-z0-9_]{2,19}$/,
                    e = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
                function f(a) {
                    if (null == a) return null;
                    let b = a.trim();
                    if (!b) return "";
                    try {
                        return decodeURIComponent(b).trim();
                    } catch {
                        return null;
                    }
                }
                function g(a) {
                    if (!a) return !1;
                    let b = a.trim();
                    if (!b) return !1;
                    if (e.test(b)) return !0;
                    let c = (b.startsWith("@") ? b.slice(1) : b).toLowerCase();
                    return d.test(c);
                }
                let h = new Set(["api", "auth", "login", "logout", "perfil", "profile", "configuracoes", "settings", "collection", "colecao", "dashboard", "cards", "inicio", "home", "admin", "me", "termos", "terms", "privacy", "privacidade", "mypokebinder"]);
                function i(a) {
                    let b;
                    return (b = ((a || "treinador").split("@")[0] || "treinador")
                        .trim()
                        .toLowerCase()
                        .replace(/[^a-z0-9_]/g, ""))
                        ? (/^[a-z]/.test(b) || (b = `t${b}`), b.length > 20 && (b = b.slice(0, 20)), b.length < 3 && (b = `${b}xxx`.slice(0, 3)), h.has(b) && (b = `treinador_${b}`.slice(0, 20)), b)
                        : "treinador";
                }
                function j(a) {
                    let b = a.trim().toLowerCase();
                    return d.test(b) ? (h.has(b) ? { ok: !1, error: "Este username n\xe3o est\xe1 dispon\xedvel." } : { ok: !0, username: b }) : { ok: !1, error: "Use 3–20 caracteres: comece com letra; s\xf3 letras min\xfasculas, n\xfameros e _." };
                }
                function k(a) {
                    let b = a.trim().replace(/\s+/g, " ");
                    return b.length < 1 || b.length > 40 ? { ok: !1, error: "O nome deve ter entre 1 e 40 caracteres." } : { ok: !0, displayName: b };
                }
                function l(a) {
                    let b = a.trim().replace(/\s+/g, " ");
                    return 0 === b.length ? { ok: !0, bio: null } : b.length > 160 ? { ok: !1, error: `A descri\xe7\xe3o deve ter no m\xe1ximo 160 caracteres.` } : { ok: !0, bio: b };
                }
            },
            93178: (a, b, c) => {
                "use strict";
                c.d(b, { l: () => i });
                var d = c(21124),
                    e = c(24515),
                    f = c(46313),
                    g = c(40029),
                    h = c(37108);
                function i({ name: a, coverTheme: b, coverPokemonDexId: c = null, className: i = "", back: j = !1 }) {
                    let k = (0, g.v)(b);
                    return (0, d.jsxs)("div", {
                        className: `relative isolate flex aspect-[480/676] min-h-0 w-full flex-col overflow-hidden rounded-[inherit] border border-white/[0.14] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_0_42px_rgba(0,0,0,0.58)] ${i}`,
                        style: { backgroundColor: k.primaryColor, backgroundImage: `radial-gradient(circle at 12% 8%, rgba(255,255,255,0.2), transparent 24%), radial-gradient(circle at 88% 95%, rgba(0,0,0,0.62), transparent 42%), repeating-linear-gradient(112deg, rgba(255,255,255,0.055) 0 1px, transparent 1px 5px), linear-gradient(145deg, ${k.primaryColor} 0%, #11131a 58%, #07090d 100%)`, containerType: "inline-size" },
                        children: [
                            (0, d.jsx)("div", { className: "pointer-events-none absolute inset-[1.1%] rounded-[inherit] border border-white/[0.13]" }),
                            (0, d.jsx)("div", { className: "pointer-events-none absolute top-0 right-[17%] bottom-0 w-px bg-black/35 shadow-[1px_0_rgba(255,255,255,0.12)]" }),
                            (0, d.jsx)("div", { className: "pointer-events-none absolute top-0 right-[17%] bottom-0 w-[7%] translate-x-1/2 bg-gradient-to-l from-black/30 to-transparent blur-md" }),
                            (0, d.jsxs)("div", {
                                className: "relative flex h-full min-h-0 flex-col p-[6%]",
                                children: [
                                    (0, d.jsxs)("div", { className: "flex items-center justify-between gap-2", children: [(0, d.jsx)("span", {}), !j && (0, d.jsx)(f.z, { ballType: k.ballType, size: 100, className: "h-auto w-[9%]" })] }),
                                    (0, d.jsxs)("div", {
                                        className: "relative flex min-h-0 flex-1 flex-col items-center justify-center py-[3%] text-center",
                                        children: [
                                            !j && c
                                                ? (0, d.jsx)("div", { className: "relative flex aspect-square w-[48%] items-center justify-center rounded-full border border-white/25 bg-black/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_12px_30px_rgba(0,0,0,0.28)]", children: (0, d.jsx)(e.default, { src: (0, h.AU)(c), alt: "", width: 320, height: 320, unoptimized: !0, className: "h-[92%] w-[92%] object-contain drop-shadow-[0_6px_8px_rgba(0,0,0,0.56)] [image-rendering:pixelated]" }) })
                                                : j
                                                  ? null
                                                  : (0, d.jsx)(f.z, { ballType: k.ballType, size: 320, className: "h-auto w-[27%] opacity-80" }),
                                            !j && (0, d.jsx)("div", { className: "mt-[4%] w-full px-[4%]", children: (0, d.jsx)("h2", { className: "max-w-full break-words font-black leading-tight uppercase text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)]", style: { fontSize: "clamp(0.7rem, 5cqw, 1.5rem)" }, children: a }) }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    });
                }
            },
        }));
    var b = require("../../../webpack-runtime.js");
    b.C(a);
    var c = b.X(0, [8301, 991, 582, 708, 7633, 8139, 9321, 1160, 6849, 1072, 323, 3888], () => b((b.s = 53197)));
    module.exports = c;
})();
