(() => {
    var a = {};
    ((a.id = 3440),
        (a.ids = [3440]),
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
            19121: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/action-async-storage.external.js");
            },
            19429: (a, b, c) => {
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
                            { children: ["colecao", { children: ["[username]", { children: ["__PAGE__", {}, { page: [() => Promise.resolve().then(c.bind(c, 26833)), "/home/paulo_rosado/MyPokeBinder/src/app/colecao/[username]/page.tsx"] }] }, {}] }, {}] },
                            {
                                layout: [() => Promise.resolve().then(c.bind(c, 51472)), "/home/paulo_rosado/MyPokeBinder/src/app/layout.tsx"],
                                "global-error": [() => Promise.resolve().then(c.t.bind(c, 81170, 23)), "next/dist/client/components/builtin/global-error.js"],
                                "not-found": [() => Promise.resolve().then(c.bind(c, 59732)), "/home/paulo_rosado/MyPokeBinder/src/app/not-found.tsx"],
                                forbidden: [() => Promise.resolve().then(c.t.bind(c, 90461, 23)), "next/dist/client/components/builtin/forbidden.js"],
                                unauthorized: [() => Promise.resolve().then(c.t.bind(c, 32768, 23)), "next/dist/client/components/builtin/unauthorized.js"],
                            },
                        ],
                    }.children,
                    J = ["/home/paulo_rosado/MyPokeBinder/src/app/colecao/[username]/page.tsx"],
                    K = { require: c, loadChunk: () => Promise.resolve() },
                    L = new d.AppPageRouteModule({ definition: { kind: e.RouteKind.APP_PAGE, page: "/colecao/[username]/page", pathname: "/colecao/[username]", bundlePath: "", filename: "", appPaths: [] }, userland: { loaderTree: I }, distDir: ".next", relativeProjectDir: "" });
                async function M(a, b, d) {
                    var D;
                    let H = "/colecao/[username]/page";
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
            24417: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("ArrowDown", [
                    ["path", { d: "M12 5v14", key: "s699le" }],
                    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }],
                ]);
            },
            26713: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/router/utils/is-bot");
            },
            26833: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { default: () => k }));
                var d = c(75338),
                    e = c(74515),
                    f = c(48152),
                    g = c(57769),
                    h = c(51771),
                    i = c(41495),
                    j = c(90664);
                function k({ params: a }) {
                    return (0, d.jsx)(e.Suspense, { fallback: (0, d.jsx)(h.ProfileRouteLoading, { message: "Carregando cole\xe7\xe3o...", type: "collection" }), children: (0, d.jsx)(l, { params: a }) });
                }
                async function l({ params: a }) {
                    let { username: b } = await a,
                        c = ((0, j.rO)(b) ?? b ?? "").trim().toLowerCase(),
                        e = (0, f.U)(),
                        h = (0, i.x4)(c),
                        [k, l] = await Promise.all([e, h]),
                        {
                            data: { user: m },
                        } = await k.auth.getUser();
                    return (0, d.jsx)(g.PublicCollectionView, { username: c, fallbackData: l ? (0, i.vZ)((0, i.L6)(l), m) : void 0 });
                }
            },
            28074: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("Palette", [
                    ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
                    ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
                    ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }],
                    ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
                    ["path", { d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z", key: "12rzf8" }],
                ]);
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
            37912: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("SlidersHorizontal", [
                    ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
                    ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
                    ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
                    ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
                    ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
                    ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
                    ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
                    ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
                    ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }],
                ]);
            },
            41025: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/dynamic-access-async-storage.external.js");
            },
            57769: (a, b, c) => {
                "use strict";
                c.d(b, { PublicCollectionView: () => d });
                let d = (0, c(97954).registerClientReference)(
                    function () {
                        throw Error("Attempted to call PublicCollectionView() from the server but PublicCollectionView is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
                    },
                    "/home/paulo_rosado/MyPokeBinder/src/components/profile/PublicCollectionView.tsx",
                    "PublicCollectionView",
                );
            },
            63033: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
            },
            70584: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("ArrowUp", [
                    ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
                    ["path", { d: "M12 19V5", key: "x0mq9r" }],
                ]);
            },
            71613: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
            },
            75663: (a, b, c) => {
                (Promise.resolve().then(c.bind(c, 51771)), Promise.resolve().then(c.bind(c, 57769)));
            },
            79303: (a, b, c) => {
                "use strict";
                c.d(b, { PublicCollectionView: () => U });
                var d = c(21124),
                    e = c(38301),
                    f = c(24515),
                    g = c(3991),
                    h = c.n(g),
                    i = c(59535),
                    j = c(34615),
                    k = c(59265),
                    l = c(56849),
                    m = c(65687),
                    n = c(28265),
                    o = c(72937),
                    p = c(29589),
                    q = c(66088),
                    r = c(7401),
                    s = c(43157),
                    t = c(79281),
                    u = c(69587),
                    v = c(38984),
                    w = c(4408),
                    x = c(51155),
                    y = c(72190),
                    z = c(20450),
                    A = c(68686),
                    B = c(74097),
                    C = c(79944),
                    D = c(65783),
                    E = c(88285),
                    F = c(47089),
                    G = c(37912),
                    H = c(80196),
                    I = c(91942),
                    J = c(75234),
                    K = c(28074),
                    L = c(86773),
                    M = c(70584),
                    N = c(24417),
                    O = c(62832),
                    P = c(25345);
                let Q = [
                        { value: "all", label: "Todas as cartas" },
                        { value: "in_binder", label: "No Binder" },
                        { value: "stored", label: "Guardadas" },
                    ],
                    R = [
                        { value: "all", label: "Todos os idiomas" },
                        { value: "pt-br", label: "Portugu\xeas (PT-BR)", icon: (0, d.jsx)(o.i, { country: "pt-br" }) },
                        { value: "en", label: "Ingl\xeas (EN)", icon: (0, d.jsx)(o.i, { country: "en" }) },
                        { value: "ja", label: "Japon\xeas (JA)", icon: (0, d.jsx)(o.i, { country: "ja" }) },
                    ],
                    S = [
                        { value: "dex", label: "Pok\xe9dex" },
                        { value: "name", label: "Nome" },
                        { value: "recent", label: "Data de adi\xe7\xe3o" },
                    ];
                function T({ card: a, imageSrc: b, shineMode: c, elementTypes: f, priority: g = !1 }) {
                    let [h, i] = (0, e.useState)(() => (0, m.y7)(b));
                    return (0, d.jsx)(l.LW, { className: "relative h-full w-full overflow-hidden rounded-lg", maxTilt: 8, maxMove: 3, scale: 1, glareOpacity: 0.2, perspective: 900, shineMode: c, elementTypes: f, isLoading: !h, children: (0, d.jsx)(m.MH, { src: b, alt: a.card_name, sizes: "(max-width: 640px) 30vw, (max-width: 768px) 33vw, 200px", className: "object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]", priority: g, onLoadingChange: i }) });
                }
                function U({ username: a, fallbackData: b }) {
                    let [c, g] = (0, e.useState)(!1),
                        [l, m] = (0, e.useState)(""),
                        [U, V] = (0, e.useState)(""),
                        [W, X] = (0, e.useState)("all"),
                        [Y, Z] = (0, e.useState)("all"),
                        [$, _] = (0, e.useState)("all"),
                        [aa, ab] = (0, e.useState)("all"),
                        [ac, ad] = (0, e.useState)(w.Ig),
                        [ae, af] = (0, e.useState)(w.ej),
                        [ag, ah] = (0, e.useState)("dex"),
                        [ai, aj] = (0, e.useState)("asc"),
                        [ak, al] = (0, e.useState)(null),
                        [am, an] = (0, e.useState)(!1),
                        [ao, ap] = (0, e.useState)(!1),
                        aq = (0, e.useMemo)(() => {
                            let a = 0;
                            return ("all" !== W && a++, "all" !== Y && a++, "all" !== $ && a++, "all" !== aa && a++, ac !== w.Ig && a++, ae !== w.ej && a++, a);
                        }, [W, Y, $, aa, ac, ae]),
                        ar = (0, e.useCallback)((a, b, c = "none", d = ["Colorless"]) => {
                            al({ src: a, alt: b, shineMode: c, elementTypes: d });
                        }, []),
                        as = (0, e.useCallback)(() => {
                            al(null);
                        }, []),
                        { expansions: at } = (0, A.K_)(a),
                        au = (0, e.useMemo)(() => (0, w.SI)(at), [at]),
                        { artists: av } = (0, A.CV)(a),
                        aw = (0, e.useMemo)(() => (0, w.ay)(av), [av]),
                        { groups: ax, total: ay, owner: az, isOwner: aA, isLoading: aB, isLoadingMore: aC, hasMore: aD, loadMore: aE, isError: aF } = (0, A.n9)(a, { searchTerm: U, statusFilter: W, languageFilter: Y, rarityFilter: $, expansionFilter: ac, artistFilter: ae, variantFilter: aa, sortField: ag, sortDirection: ai }),
                        aG = az || b?.owner,
                        aH = "boolean" == typeof aA ? aA : (b?.isOwner ?? !1),
                        aI = (0, e.useMemo)(() => (0, w.tF)({ searchTerm: U, statusFilter: W, languageFilter: Y, rarityFilter: $, expansionFilter: ac, artistFilter: ae, variantFilter: aa, sortField: ag, sortDirection: ai }), [U, W, Y, $, ac, ae, aa, ag, ai]),
                        aJ = (0, x.X)({ hasMore: aD, onLoadMore: aE, enabled: !aB && ax.length > 0 });
                    if (aF)
                        return aF.message?.includes("Perfil n\xe3o encontrado") || "not_found" === aF.message
                            ? (0, d.jsx)(j.L, { username: a, type: "collection" })
                            : (0, d.jsx)("div", {
                                  className: "flex min-h-screen flex-col bg-[#0a0c10]",
                                  children: (0, d.jsx)("main", {
                                      className: "mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center p-6 text-center",
                                      children: (0, d.jsxs)("div", {
                                          className: "rounded-2xl border border-white/10 bg-[#12151d] p-8 shadow-xl",
                                          children: [(0, d.jsx)("p", { className: "text-base font-bold text-white", children: "N\xe3o foi poss\xedvel carregar a cole\xe7\xe3o." }), (0, d.jsxs)(h(), { href: "/", className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-poke-blue px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90", children: [(0, d.jsx)(B.A, { size: 14 }), (0, d.jsx)("span", { children: "Voltar ao Binder" })] })],
                                      }),
                                  }),
                              });
                    if (aB && !aG) return (0, d.jsx)(k.ProfileRouteLoading, { message: "Carregando cole\xe7\xe3o...", type: "collection" });
                    if (!aG) return (0, d.jsx)(j.L, { username: a, type: "collection" });
                    let aK = (0, z.jl)(aG.themeColor || "#ef4444"),
                        aL = !!l.trim() || "all" !== W || "all" !== Y || "all" !== $ || "all" !== aa || ac !== w.Ig || ae !== w.ej,
                        aM = aG.name || `@${aG.username}`;
                    return (0, d.jsxs)("div", {
                        className: "flex min-h-screen flex-col bg-[#0a0c10]",
                        children: [
                            (0, d.jsx)("div", {
                                style: aK,
                                children: (0, d.jsxs)(
                                    "main",
                                    {
                                        className: "mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16",
                                        children: [
                                            (0, d.jsxs)("header", {
                                                className: "profile-enter flex flex-col gap-4",
                                                children: [
                                                    (0, d.jsxs)(h(), { href: `/perfil/${aG.username}`, prefetch: !0, className: "inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-slate-400 transition-colors hover:text-white", children: [(0, d.jsx)(C.A, { size: 14 }), (0, d.jsx)("span", { children: "Perfil" })] }),
                                                    (0, d.jsxs)("div", {
                                                        className: "flex items-center gap-3.5 sm:gap-4",
                                                        children: [
                                                            aG.avatarUrl && !c
                                                                ? (0, d.jsx)(f.default, { src: aG.avatarUrl, alt: aG.username, width: 56, height: 56, className: "h-12 w-12 shrink-0 rounded-full border border-white/20 object-cover sm:h-14 sm:w-14", referrerPolicy: "no-referrer", onError: () => g(!0), unoptimized: !0 })
                                                                : (0, d.jsx)("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-base font-bold text-white sm:h-14 sm:w-14", children: (aG.username[0] || "T").toUpperCase() }),
                                                            (0, d.jsxs)("div", {
                                                                className: "min-w-0 flex-1",
                                                                children: [
                                                                    (0, d.jsx)("p", { className: "text-[11px] font-medium text-slate-500", children: "Cole\xe7\xe3o" }),
                                                                    (0, d.jsx)("h1", { className: "truncate text-lg font-extrabold tracking-tight text-white sm:text-xl", children: aM }),
                                                                    (0, d.jsxs)("div", {
                                                                        className: "mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs",
                                                                        children: [
                                                                            (0, d.jsxs)("span", { className: "font-mono font-semibold text-poke-blue", children: ["@", aG.username] }),
                                                                            (0, d.jsx)("span", { className: "text-slate-600", "aria-hidden": !0, children: "/" }),
                                                                            aB
                                                                                ? (0, d.jsxs)("span", { className: "inline-flex items-center gap-1.5 text-slate-400", children: [(0, d.jsx)(D.A, { size: 12, className: "text-poke-blue animate-pulse" }), (0, d.jsx)("span", { className: "h-3.5 w-6 animate-pulse rounded bg-white/10", "aria-label": "Carregando total de cartas" }), (0, d.jsx)("span", { className: "text-slate-400", children: "cartas" })] })
                                                                                : (0, d.jsxs)("span", { className: "inline-flex items-center gap-1 text-slate-400", children: [(0, d.jsx)(D.A, { size: 12, className: "text-poke-blue" }), (0, d.jsx)("span", { className: "font-mono font-bold text-white", children: ay }), (0, d.jsx)("span", { children: aL ? (1 === ay ? "carta encontrada" : "cartas encontradas") : 1 === ay ? "carta na cole\xe7\xe3o" : "cartas na cole\xe7\xe3o" })] }),
                                                                        ],
                                                                    }),
                                                                ],
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            (0, d.jsxs)("div", {
                                                className: `profile-enter profile-enter-d1 relative z-30 flex flex-col ${ao ? "gap-2.5 sm:gap-3" : "gap-0"} rounded-2xl border border-white/10 bg-[#121520]/80 p-2.5 shadow-xl backdrop-blur-md transition-all sm:p-3.5`,
                                                children: [
                                                    (0, d.jsxs)("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            (0, d.jsxs)("div", {
                                                                className: "relative min-w-0 flex-1",
                                                                children: [
                                                                    (0, d.jsx)(E.A, { size: 15, className: "pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-slate-500 z-20 sm:left-3.5 sm:h-4 sm:w-4" }),
                                                                    (0, d.jsx)(p.D, {
                                                                        type: "text",
                                                                        value: l,
                                                                        onChange: (a) => m(a.target.value),
                                                                        placeholder: am ? "Buscar cartas..." : "Buscar por pok\xe9mon, n\xfamero, cole\xe7\xe3o ou pok\xe9dex...",
                                                                        placeholderClassName: "left-8.5 right-8 text-xs sm:left-10 sm:right-9 sm:text-sm",
                                                                        className: "w-full h-9 sm:h-10 rounded-xl border border-white/10 bg-white/5 py-2 sm:py-2.5 pr-8 sm:pr-9 pl-8.5 sm:pl-10 text-xs sm:text-sm text-white transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none",
                                                                    }),
                                                                    l ? (0, d.jsx)("button", { type: "button", onClick: () => m(""), "aria-label": "Limpar busca", className: "absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-500 hover:text-white z-20 sm:right-3", children: (0, d.jsx)(F.A, { size: 14, className: "sm:h-[15px] sm:w-[15px]" }) }) : null,
                                                                ],
                                                            }),
                                                            (0, d.jsxs)("button", {
                                                                type: "button",
                                                                onClick: () => ap((a) => !a),
                                                                "aria-label": "Alternar filtros",
                                                                "aria-expanded": ao,
                                                                className: `flex h-9 sm:h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border px-2.5 sm:px-3 text-xs font-semibold transition-colors ${ao || aq > 0 ? "border-poke-blue/60 bg-poke-blue/20 text-white" : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"}`,
                                                                children: [(0, d.jsx)(G.A, { size: 13, className: aq > 0 ? "text-poke-blue" : "text-slate-400" }), (0, d.jsx)("span", { className: "inline", children: "Filtros" }), aq > 0 && (0, d.jsx)("span", { className: "flex h-4 min-w-4 items-center justify-center rounded-full bg-poke-blue px-1 text-[10px] font-bold text-white", children: aq })],
                                                            }),
                                                        ],
                                                    }),
                                                    (0, d.jsx)("div", {
                                                        className: `grid transition-all duration-300 ease-in-out ${ao ? "grid-rows-[1fr] opacity-100 border-t border-white/10 pt-3" : "grid-rows-[0fr] opacity-0 border-t-0 pt-0 pointer-events-none"}`,
                                                        children: (0, d.jsx)("div", {
                                                            className: "overflow-hidden",
                                                            children: (0, d.jsxs)("div", {
                                                                className: "grid grid-cols-2 gap-1.5 sm:flex sm:flex-wrap sm:items-center sm:gap-2.5 w-full",
                                                                children: [
                                                                    (0, d.jsx)(q.l, { value: W, onChange: X, options: Q, icon: (0, d.jsx)(B.A, { size: 13 }), ariaLabel: "Filtrar por status no binder", className: "w-full min-w-0 sm:flex-1 sm:min-w-[140px]", size: "sm" }),
                                                                    (0, d.jsx)(q.l, { value: Y, onChange: Z, options: R, icon: (0, d.jsx)(H.A, { size: 13 }), ariaLabel: "Filtrar por idioma", className: "w-full min-w-0 sm:flex-1 sm:min-w-[145px]", menuClassName: "sm:left-0 sm:right-auto", align: "right", size: "sm" }),
                                                                    (0, d.jsx)(q.l, { value: $, onChange: _, options: s.OI, icon: (0, d.jsx)(I.A, { size: 13 }), ariaLabel: "Filtrar por raridade", className: "w-full min-w-0 sm:flex-1 sm:min-w-[155px]", size: "sm" }),
                                                                    (0, d.jsx)(q.l, { value: aa, onChange: ab, options: t.ye, icon: (0, d.jsx)(J.A, { size: 13 }), ariaLabel: "Filtrar por vers\xe3o", className: "w-full min-w-0 sm:flex-1 sm:min-w-[185px]", size: "sm" }),
                                                                    (0, d.jsx)(q.l, { value: ac, onChange: ad, options: au, icon: (0, d.jsx)(D.A, { size: 13 }), ariaLabel: "Filtrar por expans\xe3o", className: "w-full min-w-0 sm:col-span-1 sm:flex-1 sm:min-w-[170px]", size: "sm" }),
                                                                    (0, d.jsx)(q.l, { value: ae, onChange: af, options: aw, icon: (0, d.jsx)(K.A, { size: 13 }), ariaLabel: "Filtrar por ilustrador", className: "w-full min-w-0 sm:col-span-1 sm:flex-1 sm:min-w-[170px]", size: "sm" }),
                                                                    (0, d.jsxs)("div", {
                                                                        className: "col-span-2 flex w-full min-w-0 items-center gap-1.5 sm:col-span-1 sm:flex-1 sm:min-w-[190px]",
                                                                        children: [
                                                                            (0, d.jsx)(q.l, { value: ag, onChange: ah, options: S, icon: (0, d.jsx)(L.A, { size: 13 }), ariaLabel: "Ordenar cole\xe7\xe3o", className: "min-w-0 flex-1", size: "sm", align: "right" }),
                                                                            (0, d.jsx)("button", {
                                                                                type: "button",
                                                                                onClick: () => aj((a) => ("asc" === a ? "desc" : "asc")),
                                                                                "aria-label": "asc" === ai ? "Ordem crescente" : "Ordem decrescente",
                                                                                className: "flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg sm:rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-poke-blue/50 hover:bg-white/10 hover:text-white active:scale-95",
                                                                                children: "asc" === ai ? (0, d.jsx)(M.A, { size: 14 }) : (0, d.jsx)(N.A, { size: 14 }),
                                                                            }),
                                                                        ],
                                                                    }),
                                                                ],
                                                            }),
                                                        }),
                                                    }),
                                                ],
                                            }),
                                            aB
                                                ? (0, d.jsx)("div", { className: "flex h-64 flex-col items-center justify-center", children: (0, d.jsx)(i.i, { message: "Carregando cole\xe7\xe3o...", size: "lg" }) })
                                                : 0 !== ay || aL || U.trim()
                                                  ? 0 === ax.length
                                                      ? (0, d.jsxs)("div", {
                                                            className: "profile-enter profile-enter-d2 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#12151d] p-10 text-center",
                                                            children: [
                                                                (0, d.jsx)(E.A, { size: 28, className: "text-slate-600" }),
                                                                (0, d.jsx)("p", { className: "mt-2 text-sm font-bold text-white", children: "Nenhuma carta encontrada" }),
                                                                (0, d.jsx)("p", { className: "mt-0.5 text-xs text-slate-400", children: "Tente ajustar a busca ou os filtros." }),
                                                                aL
                                                                    ? (0, d.jsx)("button", {
                                                                          type: "button",
                                                                          onClick: () => {
                                                                              (m(""), V(""), X("all"), Z("all"), _("all"), ad(w.Ig), af(w.ej), ap(!1));
                                                                          },
                                                                          className: "mt-3 rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10",
                                                                          children: "Limpar filtros",
                                                                      })
                                                                    : null,
                                                            ],
                                                        })
                                                      : (0, d.jsxs)("div", {
                                                            className: "profile-enter profile-enter-d2 flex flex-col gap-4",
                                                            children: [
                                                                (0, d.jsx)(
                                                                    "div",
                                                                    {
                                                                        className: "relative z-0 isolate grid auto-rows-fr grid-cols-3 gap-2 sm:grid-cols-3 sm:gap-3.5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
                                                                        children: ax.map((a, b) => {
                                                                            let c = a.card,
                                                                                e = (0, y.O)(b),
                                                                                f = (0, s._I)(c.card_rarity, c.card_name),
                                                                                g = (0, r.HO)(c.card_image_url),
                                                                                h = (0, t.WE)(c.card_variant, c.card_rarity, c.card_image_url, c.card_name),
                                                                                i = (0, u.Mr)(c.card_types, c.pokemon_dex_id);
                                                                            return (0, d.jsxs)(
                                                                                "button",
                                                                                {
                                                                                    type: "button",
                                                                                    onClick: () => ar(g, c.card_name, h, i),
                                                                                    className: `group relative flex cursor-zoom-in flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-1.5 text-left transition-all duration-200 hover:border-poke-blue/50 hover:bg-white/[0.06] sm:p-2.5 ${e.className}`,
                                                                                    style: e.style,
                                                                                    "aria-label": `Ampliar ${c.card_name}`,
                                                                                    children: [
                                                                                        (0, d.jsxs)("div", {
                                                                                            className: "z-10 flex min-h-[20px] items-center justify-between gap-1 sm:min-h-[26px]",
                                                                                            children: [
                                                                                                (0, d.jsxs)("span", { className: "flex h-4.5 sm:h-5 items-center shrink-0 rounded bg-black/60 px-1 text-[9px] font-bold text-slate-300 backdrop-blur-sm sm:px-1.5 sm:text-[10px]", children: ["#", String(c.pokemon_dex_id).padStart(3, "0")] }),
                                                                                                (0, d.jsxs)("div", {
                                                                                                    className: "flex items-center gap-0.5 sm:gap-1",
                                                                                                    children: [
                                                                                                        c.card_condition && (0, d.jsx)(v.J, { condition: c.card_condition }),
                                                                                                        "holo" === c.card_variant && (0, d.jsx)("span", { title: "Foil", "aria-label": "Foil", className: "flex h-4.5 sm:h-5 w-4.5 sm:w-5 items-center justify-center rounded border border-amber-500/40 bg-amber-500/20 text-amber-300", children: (0, d.jsx)(J.A, { size: 11, className: "sm:h-3 sm:w-3" }) }),
                                                                                                        "reverse" === c.card_variant && (0, d.jsx)("span", { title: "Reverse Foil", "aria-label": "Reverse Foil", className: "flex h-4.5 sm:h-5 w-4.5 sm:w-5 items-center justify-center rounded border border-cyan-500/40 bg-cyan-500/20 text-cyan-300", children: (0, d.jsx)(P.A, { size: 11, className: "sm:h-3 sm:w-3" }) }),
                                                                                                        a.hasInBinder && (0, d.jsx)("span", { title: "No Binder", "aria-label": "No Binder", className: "flex h-4.5 sm:h-5 w-4.5 sm:w-5 items-center justify-center rounded border border-poke-blue/40 bg-poke-blue/20 text-poke-blue", children: (0, d.jsx)(B.A, { size: 11, className: "sm:h-3 sm:w-3" }) }),
                                                                                                        a.totalCount > 1 && (0, d.jsxs)("span", { className: "flex h-4.5 sm:h-5 items-center rounded bg-poke-blue px-1 font-mono text-[8px] font-extrabold text-white shadow-md sm:px-1.5 sm:text-[10px]", children: ["x", a.totalCount] }),
                                                                                                    ],
                                                                                                }),
                                                                                            ],
                                                                                        }),
                                                                                        (0, d.jsx)("div", { className: "relative my-1 aspect-[8/11] w-full sm:my-2", children: (0, d.jsx)(T, { card: c, imageSrc: g, shineMode: h, elementTypes: i, priority: 0 === b }) }),
                                                                                        (0, d.jsxs)("div", {
                                                                                            className: "flex min-h-[30px] flex-col justify-center gap-0.5 sm:min-h-[38px] sm:gap-1",
                                                                                            children: [
                                                                                                (0, d.jsxs)("div", { className: "flex items-center justify-between gap-1", children: [(0, d.jsx)("span", { className: "truncate text-[10px] font-semibold text-white sm:text-xs", children: c.card_name }), (0, d.jsx)("span", { className: `shrink-0 rounded border px-1 text-[7px] font-semibold sm:text-[8px] ${f.badgeClasses}`, children: f.label })] }),
                                                                                                (0, d.jsxs)("div", {
                                                                                                    className: "flex items-center justify-between text-[8px] text-slate-400 sm:text-[10px]",
                                                                                                    children: [(0, d.jsx)("span", { className: "max-w-[65%] truncate", title: c.card_artist ? `${c.card_set_name || "Cole\xe7\xe3o"} \xb7 ${c.card_artist}` : c.card_set_name || "Cole\xe7\xe3o", children: c.card_set_name || "Cole\xe7\xe3o" }), (0, d.jsx)("div", { className: "flex items-center gap-0.5 sm:gap-1", children: (0, d.jsx)(o.i, { country: c.card_language }) })],
                                                                                                }),
                                                                                            ],
                                                                                        }),
                                                                                    ],
                                                                                },
                                                                                `${aI}-${a.key}`,
                                                                            );
                                                                        }),
                                                                    },
                                                                    aI,
                                                                ),
                                                                aC && (0, d.jsx)("div", { className: "flex justify-center py-4", children: (0, d.jsx)(i.i, { message: "Carregando mais cartas...", size: "sm" }) }),
                                                                (0, d.jsx)("div", { ref: aJ, className: "flex min-h-8 items-center justify-center", "aria-hidden": !aD }),
                                                            ],
                                                        })
                                                  : (0, d.jsxs)("div", {
                                                        className: "profile-enter profile-enter-d2 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#12151d] p-10 text-center",
                                                        children: [(0, d.jsx)(O.A, { size: 32, className: "text-slate-600" }), (0, d.jsx)("p", { className: "mt-2 text-sm font-bold text-white", children: "Cole\xe7\xe3o vazia" }), (0, d.jsx)("p", { className: "mt-0.5 text-xs text-slate-400", children: aH ? "Adicione cartas na sua Cole\xe7\xe3o para exibi-las aqui." : "Este treinador ainda n\xe3o cadastrou cartas." })],
                                                    }),
                                        ],
                                    },
                                    a,
                                ),
                            }),
                            (0, d.jsx)(n.O, { src: ak?.src ?? null, alt: ak?.alt, shineMode: ak?.shineMode, elementTypes: ak?.elementTypes, onClose: as }),
                        ],
                    });
                }
            },
            83911: (a, b, c) => {
                (Promise.resolve().then(c.bind(c, 59265)), Promise.resolve().then(c.bind(c, 79303)));
            },
            85351: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("ChevronDown", [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]);
            },
            86439: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/no-fallback-error.external");
            },
            86773: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("ArrowUpDown", [
                    ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
                    ["path", { d: "M17 20V4", key: "1ejh1v" }],
                    ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
                    ["path", { d: "M7 4v16", key: "1glfcx" }],
                ]);
            },
            91942: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("Gem", [
                    ["path", { d: "M6 3h12l4 6-10 13L2 9Z", key: "1pcd5k" }],
                    ["path", { d: "M11 3 8 9l4 13 4-13-3-6", key: "1fcu3u" }],
                    ["path", { d: "M2 9h20", key: "16fsjt" }],
                ]);
            },
        }));
    var b = require("../../../webpack-runtime.js");
    b.C(a);
    var c = b.X(0, [8301, 991, 582, 6780, 708, 7633, 1160, 8372, 1495, 6849, 1072, 323, 7936], () => b((b.s = 19429)));
    module.exports = c;
})();
