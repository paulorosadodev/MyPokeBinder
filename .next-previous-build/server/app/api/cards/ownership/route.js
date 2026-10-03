"use strict";
(() => {
    var a = {};
    ((a.id = 9585),
        (a.ids = [9585]),
        (a.modules = {
            261: (a) => {
                a.exports = require("next/dist/shared/lib/router/utils/app-paths");
            },
            3295: (a) => {
                a.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
            },
            10846: (a) => {
                a.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
            },
            19121: (a) => {
                a.exports = require("next/dist/server/app-render/action-async-storage.external.js");
            },
            29294: (a) => {
                a.exports = require("next/dist/server/app-render/work-async-storage.external.js");
            },
            37750: (a, b, c) => {
                (c.r(b), c.d(b, { handler: () => D, patchFetch: () => C, routeModule: () => y, serverHooks: () => B, workAsyncStorage: () => z, workUnitAsyncStorage: () => A }));
                var d = {};
                (c.r(d), c.d(d, { GET: () => x }));
                var e = c(95736),
                    f = c(9117),
                    g = c(4044),
                    h = c(39326),
                    i = c(32324),
                    j = c(261),
                    k = c(54290),
                    l = c(85328),
                    m = c(38928),
                    n = c(46595),
                    o = c(3421),
                    p = c(17679),
                    q = c(41681),
                    r = c(63446),
                    s = c(86439),
                    t = c(51356),
                    u = c(10641),
                    v = c(91149),
                    w = c(44278);
                async function x(a) {
                    let b = await (0, v.v)(a);
                    if (b.response) return b.response;
                    let { user: c, supabase: d } = b,
                        e = a.nextUrl.searchParams.get("ids");
                    if (!e || !e.trim()) return u.NextResponse.json({ error: "Informe as cartas consultadas" }, { status: 400 });
                    let f = [
                        ...new Set(
                            e
                                .split(",")
                                .map((a) => a.trim())
                                .filter(Boolean),
                        ),
                    ];
                    if (0 === f.length) return u.NextResponse.json({ error: "Nenhuma carta informada" }, { status: 400 });
                    if (f.length > 100) return u.NextResponse.json({ error: `M\xe1ximo de 100 cartas por consulta` }, { status: 400 });
                    if (f.some((a) => a.length > 100)) return u.NextResponse.json({ error: "Identificador de carta inv\xe1lido" }, { status: 400 });
                    let { data: g, error: h } = await d.from("user_cards").select("tcgdex_card_id, card_language, card_variant, card_condition").eq("user_id", c.id).in("tcgdex_card_id", f);
                    if (h) return u.NextResponse.json({ error: h.message }, { status: 500 });
                    let i = {};
                    for (let a of g ?? []) {
                        let b = (0, w.qe)({ tcgdex_card_id: a.tcgdex_card_id, card_language: a.card_language, card_variant: a.card_variant, card_condition: a.card_condition });
                        i[b] = (i[b] ?? 0) + 1;
                    }
                    return u.NextResponse.json({ counts: i });
                }
                let y = new e.AppRouteRouteModule({ definition: { kind: f.RouteKind.APP_ROUTE, page: "/api/cards/ownership/route", pathname: "/api/cards/ownership", filename: "route", bundlePath: "app/api/cards/ownership/route" }, distDir: ".next", relativeProjectDir: "", resolvedPagePath: "/home/paulo_rosado/MyPokeBinder/src/app/api/cards/ownership/route.ts", nextConfigOutput: "", userland: d }),
                    { workAsyncStorage: z, workUnitAsyncStorage: A, serverHooks: B } = y;
                function C() {
                    return (0, g.patchFetch)({ workAsyncStorage: z, workUnitAsyncStorage: A });
                }
                async function D(a, b, c) {
                    var d;
                    let e = "/api/cards/ownership/route";
                    "/index" === e && (e = "/");
                    let g = await y.prepare(a, b, { srcPage: e, multiZoneDraftMode: !1 });
                    if (!g) return ((b.statusCode = 400), b.end("Bad Request"), null == c.waitUntil || c.waitUntil.call(c, Promise.resolve()), null);
                    let { buildId: u, params: v, nextConfig: w, isDraftMode: x, prerenderManifest: z, routerServerContext: A, isOnDemandRevalidate: B, revalidateOnlyGenerated: C, resolvedPathname: D } = g,
                        E = (0, j.normalizeAppPath)(e),
                        F = !!(z.dynamicRoutes[E] || z.routes[D]);
                    if (F && !x) {
                        let a = !!z.routes[D],
                            b = z.dynamicRoutes[E];
                        if (b && !1 === b.fallback && !a) throw new s.NoFallbackError();
                    }
                    let G = null;
                    !F || y.isDev || x || (G = "/index" === (G = D) ? "/" : G);
                    let H = !0 === y.isDev || !F,
                        I = F && !H,
                        J = a.method || "GET",
                        K = (0, i.getTracer)(),
                        L = K.getActiveScopeSpan(),
                        M = {
                            params: v,
                            prerenderManifest: z,
                            renderOpts: {
                                experimental: { cacheComponents: !!w.experimental.cacheComponents, authInterrupts: !!w.experimental.authInterrupts },
                                supportsDynamicResponse: H,
                                incrementalCache: (0, h.getRequestMeta)(a, "incrementalCache"),
                                cacheLifeProfiles: null == (d = w.experimental) ? void 0 : d.cacheLife,
                                isRevalidate: I,
                                waitUntil: c.waitUntil,
                                onClose: (a) => {
                                    b.on("close", a);
                                },
                                onAfterTaskError: void 0,
                                onInstrumentationRequestError: (b, c, d) => y.onRequestError(a, b, d, A),
                            },
                            sharedContext: { buildId: u },
                        },
                        N = new k.NodeNextRequest(a),
                        O = new k.NodeNextResponse(b),
                        P = l.NextRequestAdapter.fromNodeNextRequest(N, (0, l.signalFromNodeResponse)(b));
                    try {
                        let d = async (c) =>
                                y.handle(P, M).finally(() => {
                                    if (!c) return;
                                    c.setAttributes({ "http.status_code": b.statusCode, "next.rsc": !1 });
                                    let d = K.getRootSpanAttributes();
                                    if (!d) return;
                                    if (d.get("next.span_type") !== m.BaseServerSpan.handleRequest) return void console.warn(`Unexpected root span type '${d.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);
                                    let e = d.get("next.route");
                                    if (e) {
                                        let a = `${J} ${e}`;
                                        (c.setAttributes({ "next.route": e, "http.route": e, "next.span_name": a }), c.updateName(a));
                                    } else c.updateName(`${J} ${a.url}`);
                                }),
                            g = async (g) => {
                                var i, j;
                                let k = async ({ previousCacheEntry: f }) => {
                                        try {
                                            if (!(0, h.getRequestMeta)(a, "minimalMode") && B && C && !f) return ((b.statusCode = 404), b.setHeader("x-nextjs-cache", "REVALIDATED"), b.end("This page could not be found"), null);
                                            let e = await d(g);
                                            a.fetchMetrics = M.renderOpts.fetchMetrics;
                                            let i = M.renderOpts.pendingWaitUntil;
                                            i && c.waitUntil && (c.waitUntil(i), (i = void 0));
                                            let j = M.renderOpts.collectedTags;
                                            if (!F) return (await (0, o.I)(N, O, e, M.renderOpts.pendingWaitUntil), null);
                                            {
                                                let a = await e.blob(),
                                                    b = (0, p.toNodeOutgoingHttpHeaders)(e.headers);
                                                (j && (b[r.NEXT_CACHE_TAGS_HEADER] = j), !b["content-type"] && a.type && (b["content-type"] = a.type));
                                                let c = void 0 !== M.renderOpts.collectedRevalidate && !(M.renderOpts.collectedRevalidate >= r.INFINITE_CACHE) && M.renderOpts.collectedRevalidate,
                                                    d = void 0 === M.renderOpts.collectedExpire || M.renderOpts.collectedExpire >= r.INFINITE_CACHE ? void 0 : M.renderOpts.collectedExpire;
                                                return { value: { kind: t.CachedRouteKind.APP_ROUTE, status: e.status, body: Buffer.from(await a.arrayBuffer()), headers: b }, cacheControl: { revalidate: c, expire: d } };
                                            }
                                        } catch (b) {
                                            throw ((null == f ? void 0 : f.isStale) && (await y.onRequestError(a, b, { routerKind: "App Router", routePath: e, routeType: "route", revalidateReason: (0, n.c)({ isRevalidate: I, isOnDemandRevalidate: B }) }, A)), b);
                                        }
                                    },
                                    l = await y.handleResponse({ req: a, nextConfig: w, cacheKey: G, routeKind: f.RouteKind.APP_ROUTE, isFallback: !1, prerenderManifest: z, isRoutePPREnabled: !1, isOnDemandRevalidate: B, revalidateOnlyGenerated: C, responseGenerator: k, waitUntil: c.waitUntil });
                                if (!F) return null;
                                if ((null == l || null == (i = l.value) ? void 0 : i.kind) !== t.CachedRouteKind.APP_ROUTE) throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null == l || null == (j = l.value) ? void 0 : j.kind}`), "__NEXT_ERROR_CODE", { value: "E701", enumerable: !1, configurable: !0 });
                                ((0, h.getRequestMeta)(a, "minimalMode") || b.setHeader("x-nextjs-cache", B ? "REVALIDATED" : l.isMiss ? "MISS" : l.isStale ? "STALE" : "HIT"), x && b.setHeader("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate"));
                                let m = (0, p.fromNodeOutgoingHttpHeaders)(l.value.headers);
                                return (((0, h.getRequestMeta)(a, "minimalMode") && F) || m.delete(r.NEXT_CACHE_TAGS_HEADER), !l.cacheControl || b.getHeader("Cache-Control") || m.get("Cache-Control") || m.set("Cache-Control", (0, q.getCacheControlHeader)(l.cacheControl)), await (0, o.I)(N, O, new Response(l.value.body, { headers: m, status: l.value.status || 200 })), null);
                            };
                        L ? await g(L) : await K.withPropagatedContext(a.headers, () => K.trace(m.BaseServerSpan.handleRequest, { spanName: `${J} ${a.url}`, kind: i.SpanKind.SERVER, attributes: { "http.method": J, "http.target": a.url } }, g));
                    } catch (b) {
                        if ((b instanceof s.NoFallbackError || (await y.onRequestError(a, b, { routerKind: "App Router", routePath: E, routeType: "route", revalidateReason: (0, n.c)({ isRevalidate: I, isOnDemandRevalidate: B }) })), F)) throw b;
                        return (await (0, o.I)(N, O, new Response(null, { status: 500 })), null);
                    }
                }
            },
            44870: (a) => {
                a.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");
            },
            57763: (a, b, c) => {
                function d(a) {
                    if (!a || "string" != typeof a || !a.trim()) return "Comum";
                    let b = a.trim(),
                        c = b.toLowerCase();
                    return c.includes("special illustration rare") || "ilustra\xe7\xe3o rara especial" === c
                        ? "Ilustra\xe7\xe3o Rara Especial"
                        : c.includes("illustration rare") || "ilustra\xe7\xe3o rara" === c
                          ? "Ilustra\xe7\xe3o Rara"
                          : c.includes("shiny ultra rare") || "rara ultra brilhante" === c || "brilhante rara ultra" === c
                            ? "Rara Ultra Brilhante"
                            : c.includes("shiny rare vmax") || "rara brilhante vmax" === c
                              ? "Rara Brilhante VMAX"
                              : (c.includes("shiny rare") || "rara brilhante" === c || "brilhante rara" === c) && !c.includes("ultra")
                                ? "Rara Brilhante"
                                : c.includes("hyper rare") || "hiper-rara" === c || "rara hiper" === c
                                  ? "Hiper-rara"
                                  : c.includes("secret rare") || "rara secreta" === c
                                    ? "Rara Secreta"
                                    : c.includes("full art trainer") || "treinador arte completa" === c
                                      ? "Treinador Arte Expandida"
                                      : c.includes("ultra rare") || "rara ultra" === c
                                        ? "Rara Ultra"
                                        : c.includes("double rare") || "rara dupla" === c
                                          ? "Rara Dupla"
                                          : c.includes("radiant") || "rara radiante" === c
                                            ? "Rara Radiante"
                                            : c.includes("amazing") || "rara incr\xedvel" === c || "incr\xedvel" === c
                                              ? "Rara Incr\xedvel"
                                              : c.includes("ace spec") || "rara ace spec" === c
                                                ? "Rara ACE SPEC"
                                                : "holo rare" === c || "rare holo" === c || c.includes("rara hologr\xe1fica") || c.includes("rara holografica")
                                                  ? "Rara Hologr\xe1fica"
                                                  : "rare" === c || "rara" === c
                                                    ? "Rara"
                                                    : "uncommon" === c || "incomum" === c
                                                      ? "Incomum"
                                                      : "common" === c || "comum" === c
                                                        ? "Comum"
                                                        : "promo" === c || c.includes("promotional") || "promocional" === c
                                                          ? "Promocional"
                                                          : b;
                }
                function e(a, b) {
                    if (!a && !b) return 0;
                    let c = (a || "").trim().toLowerCase(),
                        d = (b || "").trim().toLowerCase();
                    return c.includes("special illustration rare") || c.includes("ilustra\xe7\xe3o rara especial")
                        ? 100
                        : c.includes("hyper rare") || c.includes("hiper-rara") || c.includes("rara hiper")
                          ? 90
                          : c.includes("illustration rare") || c.includes("ilustra\xe7\xe3o rara")
                            ? 80
                            : c.includes("shiny ultra rare") || c.includes("rara ultra brilhante") || c.includes("brilhante rara ultra") || c.includes("shiny rare vmax")
                              ? 75
                              : c.includes("secret rare") || c.includes("rara secreta")
                                ? 70
                                : c.includes("ultra rare") || c.includes("rara ultra") || c.includes("full art trainer")
                                  ? 65
                                  : c.includes("vmax") || c.includes("vstar") || c.includes("v-union") || c.includes("vunion") || c.includes("rare holo v") || c.includes("rare v") || c.includes("rara v") || c.includes("rara holo v") || c.includes("holo v") || /\b(v|vmax|vstar|v-union|vunion)\b/i.test(c) || (d && /\b(v|vmax|vstar|v-union|vunion)\b/i.test(d))
                                    ? 60
                                    : c.includes("radiant") || c.includes("radiante") || c.includes("amazing") || c.includes("incr\xedvel") || c.includes("incrivel")
                                      ? 50
                                      : c.includes("double rare") || c.includes("rara dupla")
                                        ? 40
                                        : c.includes("holo") || c.includes("hologr\xe1fic") || c.includes("holografic")
                                          ? 30
                                          : c.includes("rare") || "rara" === c
                                            ? 20
                                            : c.includes("uncommon") || c.includes("incomum")
                                              ? 10
                                              : 1;
                }
                c.d(b, { Iu: () => e, RQ: () => d });
            },
            63033: (a) => {
                a.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
            },
            86439: (a) => {
                a.exports = require("next/dist/shared/lib/no-fallback-error.external");
            },
        }));
    var b = require("../../../../webpack-runtime.js");
    b.C(a);
    var c = b.X(0, [8301, 991, 1692, 8278], () => b((b.s = 37750)));
    module.exports = c;
})();
