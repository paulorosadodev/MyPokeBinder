(() => {
    var a = {};
    ((a.id = 3921),
        (a.ids = [3921]),
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
            18765: (a, b, c) => {
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
                            { children: ["perfil", { children: ["__PAGE__", {}, { page: [() => Promise.resolve().then(c.bind(c, 53072)), "/home/paulo_rosado/MyPokeBinder/src/app/perfil/page.tsx"] }] }, {}] },
                            {
                                layout: [() => Promise.resolve().then(c.bind(c, 51472)), "/home/paulo_rosado/MyPokeBinder/src/app/layout.tsx"],
                                "global-error": [() => Promise.resolve().then(c.t.bind(c, 81170, 23)), "next/dist/client/components/builtin/global-error.js"],
                                "not-found": [() => Promise.resolve().then(c.bind(c, 59732)), "/home/paulo_rosado/MyPokeBinder/src/app/not-found.tsx"],
                                forbidden: [() => Promise.resolve().then(c.t.bind(c, 90461, 23)), "next/dist/client/components/builtin/forbidden.js"],
                                unauthorized: [() => Promise.resolve().then(c.t.bind(c, 32768, 23)), "next/dist/client/components/builtin/unauthorized.js"],
                            },
                        ],
                    }.children,
                    J = ["/home/paulo_rosado/MyPokeBinder/src/app/perfil/page.tsx"],
                    K = { require: c, loadChunk: () => Promise.resolve() },
                    L = new d.AppPageRouteModule({ definition: { kind: e.RouteKind.APP_PAGE, page: "/perfil/page", pathname: "/perfil", bundlePath: "", filename: "", appPaths: [] }, userland: { loaderTree: I }, distDir: ".next", relativeProjectDir: "" });
                async function M(a, b, d) {
                    var D;
                    let H = "/perfil/page";
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
            19121: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/action-async-storage.external.js");
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
            29564: (a, b, c) => {
                Promise.resolve().then(c.bind(c, 53072));
            },
            33873: (a) => {
                "use strict";
                a.exports = require("path");
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
            41025: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/dynamic-access-async-storage.external.js");
            },
            41890: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { default: () => h }));
                var d = c(21124);
                c(38301);
                var e = c(42378),
                    f = c(55709),
                    g = c(59265);
                function h() {
                    (0, e.useRouter)();
                    let { user: a, isLoading: b } = (0, f.A)();
                    return (0, d.jsx)(g.ProfileRouteLoading, {});
                }
                c(20450);
            },
            46313: (a, b, c) => {
                "use strict";
                c.d(b, { z: () => f });
                var d = c(21124),
                    e = c(38301);
                function f({ ballType: a = "pokeball", customColor: b = "#ef4444", size: c = 40, className: f = "", isActive: g = !1, style: h }) {
                    let i = `grad-bottom-${a}-${(0, e.useId)().replaceAll(":", "")}`,
                        j = "custom" === a ? b : "greatball" === a ? "#3b82f6" : "ultraball" === a ? "#f59e0b" : "masterball" === a ? "#ec4899" : "safariball" === a ? "#10b981" : "loveball" === a ? "#ec4899" : "quickball" === a ? "#0ea5e9" : "duskball" === a ? "#14b8a6" : "luxuryball" === a ? "#eab308" : b || "#ef4444",
                        k = g ? `drop-shadow(0 0 10px ${j})` : "drop-shadow(0 2px 5px rgba(0,0,0,0.4))";
                    return (0, d.jsxs)("svg", {
                        viewBox: "0 0 100 100",
                        width: c,
                        height: c,
                        className: `shrink-0 select-none overflow-visible ${f}`,
                        style: { colorScheme: "only light", forcedColorAdjust: "none", WebkitForcedColorAdjust: "none", filter: k, ...h },
                        children: [
                            (0, d.jsx)("defs", { children: (0, d.jsxs)("linearGradient", { id: i, x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [(0, d.jsx)("stop", { offset: "0%", stopColor: "#ffffff" }), (0, d.jsx)("stop", { offset: "100%", stopColor: "#cbd5e1" })] }) }),
                            (() => {
                                switch (a) {
                                    case "greatball":
                                        return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#3b82f6" }), (0, d.jsx)("path", { d: "M 22 24 C 28 32 30 42 30 50 L 38 50 C 38 40 35 28 28 17 Z", fill: "#ef4444" }), (0, d.jsx)("path", { d: "M 78 24 C 72 32 70 42 70 50 L 62 50 C 62 40 65 28 72 17 Z", fill: "#ef4444" })] });
                                    case "ultraball":
                                        return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#1e293b" }), (0, d.jsx)("path", { d: "M 24 16 L 36 24 L 32 50 L 22 50 Z", fill: "#f59e0b" }), (0, d.jsx)("path", { d: "M 76 16 L 64 24 L 68 50 L 78 50 Z", fill: "#f59e0b" }), (0, d.jsx)("path", { d: "M 36 16 Q 50 10 64 16 L 62 23 Q 50 18 38 23 Z", fill: "#f59e0b" })] });
                                    case "masterball":
                                        return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#8b5cf6" }), (0, d.jsx)("ellipse", { cx: "28", cy: "30", rx: "9", ry: "8", fill: "#ec4899" }), (0, d.jsx)("ellipse", { cx: "72", cy: "30", rx: "9", ry: "8", fill: "#ec4899" }), (0, d.jsx)("path", { d: "M 43 28 L 47 18 L 50 23 L 53 18 L 57 28 L 54 28 L 52 22 L 50 26 L 48 22 L 46 28 Z", fill: "#ffffff" })] });
                                    case "safariball":
                                        return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#10b981" }), (0, d.jsx)("path", { d: "M 18 32 Q 28 20 42 26 Q 34 38 24 44 Z", fill: "#047857", opacity: "0.8" }), (0, d.jsx)("path", { d: "M 58 14 Q 72 18 78 30 Q 66 32 58 24 Z", fill: "#047857", opacity: "0.8" }), (0, d.jsx)("circle", { cx: "50", cy: "34", r: "7", fill: "#34d399", opacity: "0.8" })] });
                                    case "loveball":
                                        return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#ec4899" }), (0, d.jsx)("path", { d: "M 50 36 C 47 30 40 30 40 24 C 40 19 45 17 50 22 C 55 17 60 19 60 24 C 60 30 53 30 50 36 Z", fill: "#ffffff" })] });
                                    case "quickball":
                                        return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#0ea5e9" }), (0, d.jsx)("path", { d: "M 50 6 L 56 22 L 68 22 L 58 32 L 64 48 L 50 38 L 36 48 L 42 32 L 32 22 L 44 22 Z", fill: "#facc15" })] });
                                    case "duskball":
                                        return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#1e293b" }), (0, d.jsx)("circle", { cx: "28", cy: "30", r: "9", fill: "#14b8a6" }), (0, d.jsx)("circle", { cx: "72", cy: "30", r: "9", fill: "#14b8a6" }), (0, d.jsx)("circle", { cx: "50", cy: "22", r: "7", fill: "#f97316" })] });
                                    case "luxuryball":
                                        return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#0f172a" }), (0, d.jsx)("path", { d: "M 20 20 Q 50 12 80 20 L 78 26 Q 50 18 22 26 Z", fill: "#eab308" }), (0, d.jsx)("path", { d: "M 24 32 Q 50 24 76 32 L 74 38 Q 50 30 26 38 Z", fill: "#f43f5e" })] });
                                    case "custom":
                                        return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: b }), (0, d.jsx)("ellipse", { cx: "32", cy: "24", rx: "14", ry: "6", fill: "#ffffff", opacity: "0.3", transform: "rotate(-20 32 24)" })] });
                                    default:
                                        return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: b || "#ef4444" }), (0, d.jsx)("ellipse", { cx: "32", cy: "24", rx: "14", ry: "6", fill: "#ffffff", opacity: "0.3", transform: "rotate(-20 32 24)" })] });
                                }
                            })(),
                            (0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 0 96 50 Z", fill: `url(#${i})` }),
                            (0, d.jsx)("line", { x1: "4", y1: "50", x2: "96", y2: "50", stroke: "#0f172a", strokeWidth: "7" }),
                            (0, d.jsx)("circle", { cx: "50", cy: "50", r: "46", fill: "none", stroke: "#0f172a", strokeWidth: "6" }),
                            (0, d.jsx)("circle", { cx: "50", cy: "50", r: "16", fill: "#0f172a" }),
                            (0, d.jsx)("circle", { cx: "50", cy: "50", r: "10", fill: "#f8fafc" }),
                            (0, d.jsx)("circle", { cx: "50", cy: "50", r: "5", fill: j, className: g ? "animate-pulse" : "" }),
                        ],
                    });
                }
            },
            53072: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { default: () => d }));
                let d = (0, c(97954).registerClientReference)(
                    function () {
                        throw Error("Attempted to call the default export of \"/home/paulo_rosado/MyPokeBinder/src/app/perfil/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
                    },
                    "/home/paulo_rosado/MyPokeBinder/src/app/perfil/page.tsx",
                    "default",
                );
            },
            59265: (a, b, c) => {
                "use strict";
                c.d(b, { ProfileRouteLoading: () => g });
                var d = c(21124),
                    e = c(79944),
                    f = c(37731);
                function g({ message: a = "Carregando perfil do treinador...", type: b = "profile" }) {
                    return "collection" === b || a.includes("cole\xe7\xe3o")
                        ? (0, d.jsx)("div", {
                              className: "flex min-h-screen flex-col bg-[#0a0c10]",
                              children: (0, d.jsxs)("main", {
                                  className: "mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16",
                                  children: [
                                      (0, d.jsxs)("header", {
                                          className: "flex flex-col gap-4",
                                          children: [
                                              (0, d.jsxs)("div", { className: "inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-slate-400", children: [(0, d.jsx)(e.A, { size: 14 }), (0, d.jsx)("span", { children: "Perfil" })] }),
                                              (0, d.jsxs)("div", {
                                                  className: "flex items-center gap-3.5 sm:gap-4",
                                                  children: [
                                                      (0, d.jsx)("div", { className: "h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-full border border-white/20 bg-white/10 animate-pulse" }),
                                                      (0, d.jsxs)("div", { className: "min-w-0 flex-1 space-y-1.5", children: [(0, d.jsx)("div", { className: "h-2.5 w-12 rounded bg-white/10 animate-pulse" }), (0, d.jsx)("div", { className: "h-5 sm:h-6 w-36 sm:w-48 rounded-lg bg-white/10 animate-pulse" }), (0, d.jsx)("div", { className: "h-3 w-28 rounded bg-white/5 animate-pulse" })] }),
                                                  ],
                                              }),
                                          ],
                                      }),
                                      (0, d.jsx)("div", {
                                          className: "relative z-30 flex flex-col rounded-2xl border border-white/10 bg-[#121520]/80 p-2.5 sm:p-3.5 shadow-xl backdrop-blur-md",
                                          children: (0, d.jsxs)("div", { className: "flex items-center gap-2", children: [(0, d.jsx)("div", { className: "h-9 sm:h-10 flex-1 rounded-xl border border-white/10 bg-white/5 animate-pulse" }), (0, d.jsx)("div", { className: "h-9 sm:h-10 w-20 sm:w-24 shrink-0 rounded-xl border border-white/10 bg-white/5 animate-pulse" })] }),
                                      }),
                                      (0, d.jsx)("div", { className: "flex h-64 flex-col items-center justify-center", children: (0, d.jsx)(f.RouteLoading, { message: a, className: "flex flex-col items-center justify-center" }) }),
                                  ],
                              }),
                          })
                        : (0, d.jsx)("div", { className: "flex flex-1 min-h-[calc(100dvh-4rem)] flex-col bg-[#0a0c10]", children: (0, d.jsx)(f.RouteLoading, { message: a }) });
                }
            },
            59535: (a, b, c) => {
                "use strict";
                c.d(b, { i: () => h });
                var d = c(21124),
                    e = c(38301),
                    f = c(86965),
                    g = c(46313);
                function h({ size: a = "md", message: b, className: c = "", ballType: h, color: i }) {
                    let j = (0, e.useContext)(f.cm),
                        k = i || j?.themeColor || "var(--theme-primary, #ef4444)",
                        l = h || (i ? (0, f.w2)(i) : j?.ballType || "pokeball"),
                        m = { sm: { box: "w-8 h-8", px: 32 }, md: { box: "w-16 h-16", px: 64 }, lg: { box: "w-24 h-24", px: 96 } }[a];
                    return (0, d.jsxs)("div", { className: `flex flex-col items-center justify-center gap-3 ${c}`, children: [(0, d.jsx)("div", { className: `relative ${m.box} animate-pokeball-spin`, children: (0, d.jsx)(g.z, { ballType: l, customColor: k, size: m.px, style: { filter: "drop-shadow(0 0 14px var(--theme-primary-glow))" }, className: "overflow-visible" }) }), b && (0, d.jsx)("p", { className: "text-sm font-medium tracking-wide text-slate-300 animate-pulse", children: b })] });
                }
            },
            63033: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
            },
            86439: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/no-fallback-error.external");
            },
            87708: (a, b, c) => {
                Promise.resolve().then(c.bind(c, 41890));
            },
        }));
    var b = require("../../webpack-runtime.js");
    b.C(a);
    var c = b.X(0, [8301, 991, 582, 1160], () => b((b.s = 18765)));
    module.exports = c;
})();
