(() => {
    var a = {};
    ((a.id = 5305),
        (a.ids = [5305]),
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
            13075: (a, b, c) => {
                Promise.resolve().then(c.bind(c, 53336));
            },
            19121: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/action-async-storage.external.js");
            },
            20503: (a, b, c) => {
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
                            { children: ["binders", { children: ["new", { children: ["__PAGE__", {}, { page: [() => Promise.resolve().then(c.bind(c, 53336)), "/home/paulo_rosado/MyPokeBinder/src/app/binders/new/page.tsx"] }] }, {}] }, {}] },
                            {
                                layout: [() => Promise.resolve().then(c.bind(c, 51472)), "/home/paulo_rosado/MyPokeBinder/src/app/layout.tsx"],
                                "global-error": [() => Promise.resolve().then(c.t.bind(c, 81170, 23)), "next/dist/client/components/builtin/global-error.js"],
                                "not-found": [() => Promise.resolve().then(c.bind(c, 59732)), "/home/paulo_rosado/MyPokeBinder/src/app/not-found.tsx"],
                                forbidden: [() => Promise.resolve().then(c.t.bind(c, 90461, 23)), "next/dist/client/components/builtin/forbidden.js"],
                                unauthorized: [() => Promise.resolve().then(c.t.bind(c, 32768, 23)), "next/dist/client/components/builtin/unauthorized.js"],
                            },
                        ],
                    }.children,
                    J = ["/home/paulo_rosado/MyPokeBinder/src/app/binders/new/page.tsx"],
                    K = { require: c, loadChunk: () => Promise.resolve() },
                    L = new d.AppPageRouteModule({ definition: { kind: e.RouteKind.APP_PAGE, page: "/binders/new/page", pathname: "/binders/new", bundlePath: "", filename: "", appPaths: [] }, userland: { loaderTree: I }, distDir: ".next", relativeProjectDir: "" });
                async function M(a, b, d) {
                    var D;
                    let H = "/binders/new/page";
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
            33873: (a) => {
                "use strict";
                a.exports = require("path");
            },
            41025: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/dynamic-access-async-storage.external.js");
            },
            47089: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("X", [
                    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
                    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
                ]);
            },
            53336: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { default: () => d }));
                let d = (0, c(97954).registerClientReference)(
                    function () {
                        throw Error("Attempted to call the default export of \"/home/paulo_rosado/MyPokeBinder/src/app/binders/new/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
                    },
                    "/home/paulo_rosado/MyPokeBinder/src/app/binders/new/page.tsx",
                    "default",
                );
            },
            63033: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
            },
            67402: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { default: () => w }));
                var d = c(21124),
                    e = c(38301),
                    f = c(42378),
                    g = c(3991),
                    h = c.n(g),
                    i = c(79944),
                    j = c(71613),
                    k = c(80196),
                    l = c(22842),
                    m = c(74097),
                    n = c(75234),
                    o = c(65783),
                    p = c(75535),
                    q = c(93178),
                    r = c(51846),
                    s = c(40029),
                    t = c(27616);
                let u = { "1x1": 1, "2x2": 4, "3x3": 9, "3x4": 12 },
                    v = [
                        { id: 1, name: "Gera\xe7\xe3o 1 (Kanto)", start: 1, end: 151, count: 151 },
                        { id: 2, name: "Gera\xe7\xe3o 2 (Johto)", start: 152, end: 251, count: 100 },
                        { id: 3, name: "Gera\xe7\xe3o 3 (Hoenn)", start: 252, end: 386, count: 135 },
                        { id: 4, name: "Gera\xe7\xe3o 4 (Sinnoh)", start: 387, end: 493, count: 107 },
                        { id: 5, name: "Gera\xe7\xe3o 5 (Unova)", start: 494, end: 649, count: 156 },
                        { id: 6, name: "Gera\xe7\xe3o 6 (Kalos)", start: 650, end: 721, count: 72 },
                        { id: 7, name: "Gera\xe7\xe3o 7 (Alola)", start: 722, end: 809, count: 88 },
                        { id: 8, name: "Gera\xe7\xe3o 8 (Galar)", start: 810, end: 905, count: 96 },
                        { id: 9, name: "Gera\xe7\xe3o 9 (Paldea)", start: 906, end: 1025, count: 120 },
                    ];
                function w() {
                    let a = (0, f.useRouter)(),
                        [b, c] = (0, e.useState)(1),
                        [g, w] = (0, e.useState)(""),
                        [x, y] = (0, e.useState)(""),
                        [z, A] = (0, e.useState)("classic_red"),
                        [B, C] = (0, e.useState)(null),
                        [D, E] = (0, e.useState)(!1),
                        [F, G] = (0, e.useState)("3x3"),
                        [H, I] = (0, e.useState)(10),
                        [J, K] = (0, e.useState)("blank"),
                        [L, M] = (0, e.useState)(1),
                        [N, O] = (0, e.useState)(!1),
                        [P, Q] = (0, e.useState)(null),
                        R = u[F],
                        S = (0, t.r)(H) * R,
                        T = (a, b = 1) => {
                            if ((K(a), "kanto151" === a)) (G("3x3"), I(17), g.trim() || w("Kanto 151 Pok\xe9dex"));
                            else if ("generation" === a) {
                                M(b);
                                let a = v.find((a) => a.id === b) || v[0];
                                (I(Math.min(50, Math.max(1, Math.ceil(a.count / R)))), g.trim() || w(`Pok\xe9dex ${a.name}`));
                            }
                        },
                        U = async () => {
                            let b = g.trim();
                            if (!b) {
                                (Q("Por favor, informe um nome para o seu binder."), c(1));
                                return;
                            }
                            (O(!0), Q(null));
                            try {
                                let c;
                                if ("kanto151" === J) {
                                    c = [];
                                    let a = 1;
                                    for (let b = 1; b <= H; b++) for (let d = 1; d <= R; d++) a <= 151 ? (c.push({ page_number: b, slot_index: d, slot_type: "pokemon", target_dex_id: a }), a++) : c.push({ page_number: b, slot_index: d, slot_type: "free" });
                                } else if ("generation" === J) {
                                    c = [];
                                    let a = v.find((a) => a.id === L) || v[0],
                                        b = a.start;
                                    for (let d = 1; d <= H; d++) for (let e = 1; e <= R; e++) b <= a.end ? (c.push({ page_number: d, slot_index: e, slot_type: "pokemon", target_dex_id: b }), b++) : c.push({ page_number: d, slot_index: e, slot_type: "free" });
                                }
                                let d = await fetch("/api/binders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: b, description: x.trim(), cover_theme: z, cover_pokemon_dex_id: B, grid_type: F, total_pages: H, is_public: D, slots: c }) });
                                if (!d.ok) {
                                    let a = await d.json().catch(() => ({}));
                                    throw Error(a.error || "Falha ao criar binder");
                                }
                                let e = await d.json();
                                a.push(`/binders/${e.binder.id}`);
                            } catch (a) {
                                (Q(a.message || "Erro inesperado ao criar o binder"), O(!1));
                            }
                        };
                    return (0, d.jsx)("div", {
                        className: "flex min-h-screen flex-col bg-[#0a0c10] text-slate-100",
                        children: (0, d.jsxs)("main", {
                            className: "mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16",
                            children: [
                                (0, d.jsxs)("div", {
                                    className: "flex items-center justify-between border-b border-white/10 pb-4",
                                    children: [
                                        (0, d.jsxs)(h(), { href: "/", prefetch: !0, className: "flex items-center gap-2 text-xs font-semibold text-slate-400 transition-colors hover:text-white", children: [(0, d.jsx)(i.A, { size: 16 }), (0, d.jsx)("span", { children: "Voltar para a Estante" })] }),
                                        (0, d.jsxs)("div", { className: "flex items-center gap-2", children: [(0, d.jsxs)("span", { className: "text-xs text-slate-500", children: ["Passo ", b, " de 3"] }), (0, d.jsx)("div", { className: "flex gap-1.5", children: [1, 2, 3].map((a) => (0, d.jsx)("div", { className: `h-1.5 w-6 rounded-full transition-all ${b >= a ? "bg-poke-blue" : "bg-white/10"}` }, a)) })] }),
                                    ],
                                }),
                                P && (0, d.jsx)("div", { className: "rounded-xl border border-red-500/40 bg-red-500/10 p-3.5 text-xs text-red-300", children: P }),
                                (0, d.jsxs)("div", {
                                    className: "grid grid-cols-1 gap-8 lg:grid-cols-12",
                                    children: [
                                        (0, d.jsxs)("div", {
                                            className: "lg:col-span-7 flex flex-col gap-6",
                                            children: [
                                                1 === b &&
                                                    (0, d.jsxs)("div", {
                                                        className: "flex flex-col gap-5",
                                                        children: [
                                                            (0, d.jsxs)("div", { children: [(0, d.jsx)("h1", { className: "text-xl font-black text-white sm:text-2xl", children: "Identidade e Capa" }), (0, d.jsx)("p", { className: "mt-1 text-xs text-slate-400", children: "D\xea um t\xedtulo especial ao seu binder e escolha a textura da capa." })] }),
                                                            (0, d.jsxs)("div", {
                                                                className: "flex flex-col gap-2",
                                                                children: [
                                                                    (0, d.jsxs)("label", { className: "text-xs font-bold text-slate-300", children: ["Nome do Binder ", (0, d.jsx)("span", { className: "text-red-400", children: "*" })] }),
                                                                    (0, d.jsx)("input", { type: "text", maxLength: 60, value: g, onChange: (a) => w(a.target.value), placeholder: "Ex: Minha Cole\xe7\xe3o Rara, Masterset 151, Johto...", className: "h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none", autoFocus: !0 }),
                                                                    (0, d.jsxs)("span", { className: "text-right text-[10px] text-slate-500", children: [g.length, "/60 caracteres"] }),
                                                                ],
                                                            }),
                                                            (0, d.jsxs)("div", {
                                                                className: "flex flex-col gap-2",
                                                                children: [
                                                                    (0, d.jsx)("label", { className: "text-xs font-bold text-slate-300", children: "Descri\xe7\xe3o (Opcional)" }),
                                                                    (0, d.jsx)("textarea", { rows: 3, maxLength: 200, value: x, onChange: (a) => y(a.target.value), placeholder: "Conte brevemente sobre o foco ou tema deste binder...", className: "w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white placeholder-slate-500 transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none" }),
                                                                    (0, d.jsxs)("span", { className: "text-right text-[10px] text-slate-500", children: [x.length, "/200 caracteres"] }),
                                                                ],
                                                            }),
                                                            (0, d.jsxs)("div", {
                                                                className: "flex flex-col gap-2.5",
                                                                children: [
                                                                    (0, d.jsx)("label", { className: "text-xs font-bold text-slate-300", children: "Cor e Estilo da Capa" }),
                                                                    (0, d.jsx)("div", {
                                                                        className: "grid grid-cols-2 gap-2.5 sm:grid-cols-3",
                                                                        children: Object.values(s.wZ).map((a) => {
                                                                            let b = z === a.id;
                                                                            return (0, d.jsxs)(
                                                                                "button",
                                                                                {
                                                                                    type: "button",
                                                                                    onClick: () => A(a.id),
                                                                                    className: `flex cursor-pointer items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all ${b ? "border-white bg-white/10 shadow-md" : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"}`,
                                                                                    children: [(0, d.jsx)("div", { className: "h-6 w-6 shrink-0 rounded-full border border-white/20 shadow-inner", style: { backgroundColor: a.primaryColor } }), (0, d.jsx)("div", { className: "min-w-0 flex-1", children: (0, d.jsx)("span", { className: "block truncate text-xs font-semibold text-white", children: a.name }) }), b && (0, d.jsx)(j.A, { size: 14, className: "text-white" })],
                                                                                },
                                                                                a.id,
                                                                            );
                                                                        }),
                                                                    }),
                                                                ],
                                                            }),
                                                            (0, d.jsx)(r.y, { value: B, onChange: C }),
                                                            (0, d.jsxs)("div", {
                                                                className: "flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3.5",
                                                                children: [
                                                                    (0, d.jsxs)("div", {
                                                                        className: "flex flex-col gap-0.5",
                                                                        children: [
                                                                            (0, d.jsxs)("div", { className: "flex items-center gap-1.5", children: [D ? (0, d.jsx)(k.A, { size: 14, className: "text-emerald-400" }) : (0, d.jsx)(l.A, { size: 14, className: "text-slate-400" }), (0, d.jsx)("span", { className: "text-xs font-bold text-white", children: "Binder P\xfablico" })] }),
                                                                            (0, d.jsx)("span", { className: "text-[11px] text-slate-400", children: "Outros treinadores poder\xe3o visualizar seu binder atrav\xe9s do seu perfil p\xfablico." }),
                                                                        ],
                                                                    }),
                                                                    (0, d.jsx)("button", {
                                                                        type: "button",
                                                                        onClick: () => E(!D),
                                                                        className: `relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${D ? "bg-emerald-500" : "bg-white/15"}`,
                                                                        children: (0, d.jsx)("span", { className: `pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${D ? "translate-x-5" : "translate-x-0"}` }),
                                                                    }),
                                                                ],
                                                            }),
                                                        ],
                                                    }),
                                                2 === b &&
                                                    (0, d.jsxs)("div", {
                                                        className: "flex flex-col gap-5",
                                                        children: [
                                                            (0, d.jsxs)("div", { children: [(0, d.jsx)("h1", { className: "text-xl font-black text-white sm:text-2xl", children: "Formato do Grid e P\xe1ginas" }), (0, d.jsx)("p", { className: "mt-1 text-xs text-slate-400", children: "Escolha a disposi\xe7\xe3o visual das cartas em cada folha e a quantidade de p\xe1ginas." })] }),
                                                            (0, d.jsxs)("div", {
                                                                className: "flex flex-col gap-3",
                                                                children: [
                                                                    (0, d.jsx)("label", { className: "text-xs font-bold text-slate-300", children: "Formato das Folhas (Grid)" }),
                                                                    (0, d.jsx)("div", {
                                                                        className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
                                                                        children: ["1x1", "2x2", "3x3", "3x4"].map((a) => {
                                                                            let b = F === a;
                                                                            return (0, d.jsxs)(
                                                                                "button",
                                                                                {
                                                                                    type: "button",
                                                                                    onClick: () =>
                                                                                        ((a) => {
                                                                                            G(a);
                                                                                            let b = u[a];
                                                                                            "kanto151" === J ? I(Math.min(50, Math.max(1, Math.ceil(151 / b)))) : "generation" === J && I(Math.min(50, Math.max(1, Math.ceil((v.find((a) => a.id === L) || v[0]).count / b))));
                                                                                        })(a),
                                                                                    className: `flex flex-col items-center gap-2 rounded-xl border p-3.5 text-center transition-all ${b ? "border-poke-blue bg-poke-blue/15 shadow-[0_0_15px_rgba(59,130,246,0.3)]" : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"}`,
                                                                                    children: [(0, d.jsx)("span", { className: "font-mono text-base font-extrabold text-white", children: a }), (0, d.jsxs)("span", { className: "text-[11px] text-slate-400", children: [u[a], " ", 1 === u[a] ? "carta/p\xe1g" : "cartas/p\xe1g"] })],
                                                                                },
                                                                                a,
                                                                            );
                                                                        }),
                                                                    }),
                                                                ],
                                                            }),
                                                            (0, d.jsxs)("div", {
                                                                className: "flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4",
                                                                children: [
                                                                    (0, d.jsxs)("div", { className: "flex items-center justify-between", children: [(0, d.jsx)("label", { className: "text-xs font-bold text-slate-300", children: "Quantidade de P\xe1ginas" }), (0, d.jsxs)("span", { className: "font-mono text-sm font-bold text-poke-blue", children: [H, " ", 1 === H ? "p\xe1gina" : "p\xe1ginas"] })] }),
                                                                    (0, d.jsx)("input", { type: "range", min: 1, max: 50, value: H, onChange: (a) => I(Number(a.target.value)), className: "h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-poke-blue" }),
                                                                    (0, d.jsxs)("div", { className: "flex items-center justify-between text-[11px] text-slate-400", children: [(0, d.jsx)("span", { children: "M\xednimo: 1 p\xe1gina" }), (0, d.jsxs)("span", { className: "font-mono", children: ["Capacidade: ", (0, d.jsx)("strong", { className: "text-white", children: S }), " cartas"] }), (0, d.jsx)("span", { children: "M\xe1ximo: 50 p\xe1ginas" })] }),
                                                                ],
                                                            }),
                                                        ],
                                                    }),
                                                3 === b &&
                                                    (0, d.jsxs)("div", {
                                                        className: "flex flex-col gap-5",
                                                        children: [
                                                            (0, d.jsxs)("div", { children: [(0, d.jsx)("h1", { className: "text-xl font-black text-white sm:text-2xl", children: "Estrutura Inicial dos Slots" }), (0, d.jsx)("p", { className: "mt-1 text-xs text-slate-400", children: "Pr\xe9-configure as metas de cada slot ou comece com um binder livre." })] }),
                                                            (0, d.jsxs)("div", {
                                                                className: "flex flex-col gap-3",
                                                                children: [
                                                                    (0, d.jsxs)("button", {
                                                                        type: "button",
                                                                        onClick: () => T("blank"),
                                                                        className: `flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 text-left transition-all ${"blank" === J ? "border-poke-blue bg-poke-blue/15 shadow-[0_0_15px_rgba(59,130,246,0.25)]" : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"}`,
                                                                        children: [
                                                                            (0, d.jsx)("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300", children: (0, d.jsx)(m.A, { size: 18 }) }),
                                                                            (0, d.jsxs)("div", { className: "flex-1", children: [(0, d.jsx)("h3", { className: "text-sm font-bold text-white", children: "Binder Livre (Em Branco)" }), (0, d.jsx)("p", { className: "mt-0.5 text-xs text-slate-400", children: "Todos os slots come\xe7am vazios com bordas tracejadas. Voc\xea pode inserir qualquer carta da sua cole\xe7\xe3o sem metas pr\xe9-fixadas." })] }),
                                                                            "blank" === J && (0, d.jsx)(j.A, { size: 18, className: "text-poke-blue shrink-0" }),
                                                                        ],
                                                                    }),
                                                                    (0, d.jsxs)("button", {
                                                                        type: "button",
                                                                        onClick: () => T("kanto151"),
                                                                        className: `flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 text-left transition-all ${"kanto151" === J ? "border-poke-blue bg-poke-blue/15 shadow-[0_0_15px_rgba(59,130,246,0.25)]" : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"}`,
                                                                        children: [
                                                                            (0, d.jsx)("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-amber-300", children: (0, d.jsx)(n.A, { size: 18 }) }),
                                                                            (0, d.jsxs)("div", { className: "flex-1", children: [(0, d.jsx)("h3", { className: "text-sm font-bold text-white", children: "Kanto 151 Original (Pok\xe9dex Cl\xe1ssica)" }), (0, d.jsx)("p", { className: "mt-0.5 text-xs text-slate-400", children: "17 p\xe1ginas em grid 3\xd73 com as silhuetas oficiais dos 151 Pok\xe9mon de Kanto (#001 a #151) para colecionar suas cartas f\xedsicas." })] }),
                                                                            "kanto151" === J && (0, d.jsx)(j.A, { size: 18, className: "text-poke-blue shrink-0" }),
                                                                        ],
                                                                    }),
                                                                    (0, d.jsxs)("div", {
                                                                        className: `flex flex-col gap-3 rounded-xl border p-4 transition-all ${"generation" === J ? "border-poke-blue bg-poke-blue/15 shadow-[0_0_15px_rgba(59,130,246,0.25)]" : "border-white/10 bg-white/[0.02]"}`,
                                                                        children: [
                                                                            (0, d.jsxs)("div", {
                                                                                className: "flex cursor-pointer items-start gap-3.5",
                                                                                onClick: () => T("generation", L),
                                                                                children: [
                                                                                    (0, d.jsx)("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-emerald-300", children: (0, d.jsx)(o.A, { size: 18 }) }),
                                                                                    (0, d.jsxs)("div", { className: "flex-1", children: [(0, d.jsx)("h3", { className: "text-sm font-bold text-white", children: "Gera\xe7\xe3o Espec\xedfica da Pok\xe9dex" }), (0, d.jsx)("p", { className: "mt-0.5 text-xs text-slate-400", children: "Gera metas sequenciais para qualquer uma das 9 gera\xe7\xf5es oficiais com silhuetas pr\xe9-carregadas." })] }),
                                                                                    "generation" === J && (0, d.jsx)(j.A, { size: 18, className: "text-poke-blue shrink-0" }),
                                                                                ],
                                                                            }),
                                                                            "generation" === J &&
                                                                                (0, d.jsxs)("div", {
                                                                                    className: "mt-2 pt-3 border-t border-white/10 flex flex-col gap-2",
                                                                                    children: [
                                                                                        (0, d.jsx)("label", { className: "text-xs font-semibold text-slate-300", children: "Selecione a Gera\xe7\xe3o Desejada:" }),
                                                                                        (0, d.jsx)("select", {
                                                                                            value: L,
                                                                                            onChange: (a) =>
                                                                                                ((a) => {
                                                                                                    M(a);
                                                                                                    let b = v.find((b) => b.id === a) || v[0];
                                                                                                    (I(Math.min(50, Math.max(1, Math.ceil(b.count / R)))), (!g.trim() || g.startsWith("Pok\xe9dex Gera\xe7\xe3o")) && w(`Pok\xe9dex ${b.name}`));
                                                                                                })(Number(a.target.value)),
                                                                                            className: "h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-xs text-white focus:border-poke-blue/60 focus:outline-none",
                                                                                            children: v.map((a) => (0, d.jsxs)("option", { value: a.id, className: "bg-[#121622] text-white", children: [a.name, " (#", String(a.start).padStart(3, "0"), " a #", String(a.end).padStart(3, "0"), " \xb7 ", a.count, " pok\xe9mon)"] }, a.id)),
                                                                                        }),
                                                                                    ],
                                                                                }),
                                                                        ],
                                                                    }),
                                                                ],
                                                            }),
                                                        ],
                                                    }),
                                                (0, d.jsxs)("div", {
                                                    className: "flex items-center justify-between pt-4 border-t border-white/10",
                                                    children: [
                                                        b > 1 ? (0, d.jsxs)("button", { type: "button", onClick: () => c((a) => a - 1), className: "flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10", children: [(0, d.jsx)(i.A, { size: 14 }), (0, d.jsx)("span", { children: "Anterior" })] }) : (0, d.jsx)("div", {}),
                                                        b < 3
                                                            ? (0, d.jsxs)("button", {
                                                                  type: "button",
                                                                  onClick: () => {
                                                                      if (1 === b && !g.trim()) return void Q("Por favor, preencha o nome do binder antes de prosseguir.");
                                                                      (Q(null), c((a) => a + 1));
                                                                  },
                                                                  className: "flex items-center gap-1.5 rounded-xl bg-poke-blue px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-poke-blue/90",
                                                                  children: [(0, d.jsx)("span", { children: "Pr\xf3ximo" }), (0, d.jsx)(p.A, { size: 14 })],
                                                              })
                                                            : (0, d.jsx)("button", {
                                                                  type: "button",
                                                                  disabled: N,
                                                                  onClick: U,
                                                                  className: "flex items-center gap-2 rounded-xl bg-poke-blue px-6 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all hover:bg-poke-blue/90 disabled:opacity-50",
                                                                  children: N ? (0, d.jsx)("span", { children: "Criando Binder..." }) : (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)(n.A, { size: 15 }), (0, d.jsx)("span", { children: "Concluir e Abrir Binder" })] }),
                                                              }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, d.jsx)("div", {
                                            className: "lg:col-span-5 flex flex-col gap-4",
                                            children: (0, d.jsxs)("div", {
                                                className: "rounded-2xl border border-white/10 bg-[#121520]/80 p-5 shadow-xl backdrop-blur-md",
                                                children: [
                                                    (0, d.jsx)("span", { className: "text-xs font-bold uppercase tracking-wider text-slate-400", children: "Pr\xe9-visualiza\xe7\xe3o da Capa" }),
                                                    (0, d.jsx)(q.l, { name: g.trim() || "Nome do Binder", coverTheme: z, coverPokemonDexId: B, className: "mx-auto mt-4 w-full max-w-[305px]" }),
                                                    (0, d.jsxs)("div", {
                                                        className: "mt-4 flex flex-col gap-2 rounded-xl border border-white/5 bg-black/30 p-3 text-xs text-slate-400",
                                                        children: [
                                                            (0, d.jsxs)("div", { className: "flex justify-between", children: [(0, d.jsx)("span", { children: "Formato:" }), (0, d.jsxs)("strong", { className: "text-white", children: ["Grid ", F, " (", R, " slots/p\xe1gina)"] })] }),
                                                            (0, d.jsxs)("div", { className: "flex justify-between", children: [(0, d.jsx)("span", { children: "Total de Folhas:" }), (0, d.jsxs)("strong", { className: "text-white", children: [H, " p\xe1ginas"] })] }),
                                                            (0, d.jsxs)("div", { className: "flex justify-between", children: [(0, d.jsx)("span", { children: "Capacidade Total:" }), (0, d.jsxs)("strong", { className: "text-white", children: [S, " cartas"] })] }),
                                                            (0, d.jsxs)("div", { className: "flex justify-between", children: [(0, d.jsx)("span", { children: "Estrutura:" }), (0, d.jsx)("strong", { className: "text-white", children: "blank" === J ? "Slots Livres" : "kanto151" === J ? "Kanto 151 Metas" : `Metas ${v.find((a) => a.id === L)?.name}` })] }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    });
                }
            },
            75234: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("Sparkles", [
                    ["path", { d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z", key: "4pj2yx" }],
                    ["path", { d: "M20 3v4", key: "1olli1" }],
                    ["path", { d: "M22 5h-4", key: "1gvqau" }],
                    ["path", { d: "M4 17v2", key: "vumght" }],
                    ["path", { d: "M5 18H3", key: "zchphs" }],
                ]);
            },
            75535: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("ArrowRight", [
                    ["path", { d: "M5 12h14", key: "1ays0h" }],
                    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
                ]);
            },
            86439: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/no-fallback-error.external");
            },
            88285: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("Search", [
                    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
                    ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
                ]);
            },
            99008: (a, b, c) => {
                Promise.resolve().then(c.bind(c, 67402));
            },
        }));
    var b = require("../../../webpack-runtime.js");
    b.C(a);
    var c = b.X(0, [8301, 991, 582, 1160, 3536], () => b((b.s = 20503)));
    module.exports = c;
})();
