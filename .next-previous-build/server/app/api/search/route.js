"use strict";
(() => {
    var a = {};
    ((a.id = 6202),
        (a.ids = [6202]),
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
            12003: (a, b, c) => {
                (c.r(b), c.d(b, { handler: () => K, patchFetch: () => J, routeModule: () => F, serverHooks: () => I, workAsyncStorage: () => G, workUnitAsyncStorage: () => H }));
                var d = {};
                (c.r(d), c.d(d, { GET: () => E }));
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
                    w = c(55719),
                    x = c(91557),
                    y = c(58075),
                    z = c(44278),
                    A = c(23673),
                    B = c(38372),
                    C = c(96327);
                let D = /^[A-Za-z]{0,4}\d+[A-Za-z]?$/;
                async function E(a) {
                    let b,
                        c = await (0, v.v)(a);
                    if (c.response) return c.response;
                    let d = a.nextUrl.searchParams.get("name"),
                        e = a.nextUrl.searchParams.get("dexId"),
                        f = a.nextUrl.searchParams.get("page"),
                        g = a.nextUrl.searchParams.get("pageSize");
                    if (!d || "string" != typeof d || 0 === d.trim().length || d.trim().length > 50) return u.NextResponse.json({ error: "O par\xe2metro name \xe9 obrigat\xf3rio e deve ter no m\xe1ximo 50 caracteres" }, { status: 400 });
                    let h = d.trim(),
                        { nameQuery: i, localIdHint: j } = (function (a) {
                            let b = a.match(/\(([^)]+)\)/);
                            if (b) {
                                let c = b[1].trim();
                                if (D.test(c)) return { localIdHint: c, nameQuery: a.replace(b[0], "").trim() || null };
                            }
                            if (a.includes("/")) {
                                let b = a
                                    .split("/")
                                    .map((a) => a.trim())
                                    .filter(Boolean);
                                if (b.length >= 2) {
                                    if (D.test(b[0])) return { localIdHint: b[0], nameQuery: b.slice(1).join(" ") || null };
                                    let a = b[b.length - 1];
                                    if (D.test(a)) return { localIdHint: a, nameQuery: b.slice(0, -1).join(" ") || null };
                                }
                                return { nameQuery: a, localIdHint: null };
                            }
                            if (a.includes(" ")) {
                                let b = a.split(/\s+/),
                                    c = b[b.length - 1],
                                    d = b[0];
                                return D.test(c) ? { nameQuery: b.slice(0, -1).join(" "), localIdHint: c } : D.test(d) ? { nameQuery: b.slice(1).join(" "), localIdHint: d } : { nameQuery: a, localIdHint: null };
                            }
                            return D.test(a) ? { nameQuery: null, localIdHint: a } : { nameQuery: a, localIdHint: null };
                        })(h);
                    if (e) {
                        let a = parseInt(e, 10);
                        if (isNaN(a) || a < 1 || a > 1025) return u.NextResponse.json({ error: "O par\xe2metro dexId deve ser um n\xfamero entre 1 e 1025" }, { status: 400 });
                        b = a;
                    } else if (h.startsWith("#")) {
                        let a = parseInt(h.replace(/^#\s*/, ""), 10);
                        !isNaN(a) && a >= 1 && a <= 1025 && (b = a);
                    } else if (i) {
                        let a = i.replace(/[♀♂]/g, "").trim().toLowerCase(),
                            c = B.VL.find((b) => b.name.toLowerCase().replace(/[♀♂]/g, "").trim() === a);
                        c && (b = c.dexId);
                    }
                    let k = parseInt(f || "1", 10),
                        l = parseInt(g || "36", 10),
                        m = !isNaN(k) && k > 0 ? k : 1,
                        n = !isNaN(l) && l > 0 && l <= 100 ? l : 36;
                    try {
                        let a = b ? `search_dex_${b}` : j ? `search_lid_${j}${i ? `_n_${encodeURIComponent(i)}` : ""}` : `search_${encodeURIComponent(i ?? h)}`,
                            c = await (0, y.Fz)(a, async () => {
                                let a = async (a) => {
                                    let b = await fetch(a, { headers: { Accept: "application/json" }, next: { revalidate: 3600 } });
                                    if (!b.ok) return [];
                                    let c = await b.json();
                                    return Array.isArray(c) ? c : [];
                                };
                                if (b) {
                                    let c = (0, B.Z3)(b),
                                        d = c ? encodeURIComponent(c.name) : encodeURIComponent(i ?? h),
                                        [e, f] = await Promise.all([a(`https://api.tcgdex.net/v2/en/cards?name=${d}`), a(`https://api.tcgdex.net/v2/en/cards?dexId=eq:${b}`)]);
                                    return [...e, ...f];
                                }
                                if (j && i) {
                                    let [b, c] = await Promise.all([a(`https://api.tcgdex.net/v2/en/cards?localId=${encodeURIComponent(j)}`), a(`https://api.tcgdex.net/v2/en/cards?name=${encodeURIComponent(i)}`)]);
                                    return [...b, ...c];
                                }
                                return j ? await a(`https://api.tcgdex.net/v2/en/cards?localId=${encodeURIComponent(j)}`) : await a(`https://api.tcgdex.net/v2/en/cards?name=${encodeURIComponent(i ?? h)}`);
                            });
                        if (!Array.isArray(c)) return u.NextResponse.json({ cards: [], hasMore: !1, totalCount: 0 }, { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
                        let d = [],
                            e = new Set();
                        for (let a of c)
                            if (!((0, w.jF)(a) || e.has(a.id)) && (!b || (0, C.R)(a.name, b))) {
                                if (j) {
                                    let b = /^\d+$/.test(j),
                                        c = b ? j.replace(/^0+/, "") || "0" : j;
                                    if (!(a.localId === j || a.localId === c || a.id.endsWith(`-${j}`) || (b && a.id.endsWith(`-${c}`)))) continue;
                                }
                                (e.add(a.id), d.push({ ...a, image: "string" == typeof a.image && a.image.trim().length > 0 ? a.image : w.bE }));
                            }
                        let f = d.length,
                            g = (m - 1) * n,
                            k = d.slice(g, g + n),
                            l = await Promise.all(
                                k.map(async (a) => {
                                    let c = (0, y.Ai)(`detail_${a.id}`);
                                    if (c) return { id: a.id, localId: a.localId, name: a.name, image: (0, w.HO)(c.image || a.image), setName: c.setName, rarity: c.rarity, artist: c.artist || "", types: c.types ?? [], variants: c.variants, dexId: c.dexId };
                                    let d = "",
                                        e = "",
                                        f = "",
                                        g = [],
                                        h = (0, z.Xf)({ normal: !0 }),
                                        i = a.image,
                                        j = null;
                                    try {
                                        let b = await (0, y.Fz)(`fetch_detail_${a.id}`, async () => {
                                            let b = await fetch(`https://api.tcgdex.net/v2/en/cards/${a.id}`, { headers: { Accept: "application/json" }, next: { revalidate: 86400 } });
                                            return b.ok ? await b.json() : null;
                                        });
                                        b && ((d = b.set?.name || ""), (e = b.rarity || ""), (f = (b.illustrator || "").trim()), (g = (0, A.xV)(b.types)), (h = (0, z.Xf)(b.variants)).normal || h.holo || h.reverse || (h = (0, z.Xf)({ normal: !0 })), !(0, w.ij)(i) && "string" == typeof b.image && b.image.trim().length > 0 && (i = b.image), Array.isArray(b.dexIds) && "number" == typeof b.dexIds[0] && b.dexIds[0] >= 1 && b.dexIds[0] <= 1025 && (j = b.dexIds[0]));
                                    } catch {}
                                    if (!(0, w.ij)(i)) {
                                        let b = await (0, x._)(a.id);
                                        b && (i = b);
                                    }
                                    if (!j)
                                        if (b) j = b;
                                        else {
                                            let b = B.VL.find((b) => (0, C.R)(a.name, b.dexId));
                                            j = b ? b.dexId : null;
                                        }
                                    return ((0, y.J8)(`detail_${a.id}`, { setName: d, rarity: e, artist: f, types: g, variants: h, dexId: j, image: i }, 864e5), { id: a.id, localId: a.localId, name: a.name, image: (0, w.HO)(i), setName: d, rarity: e, artist: f, types: g, variants: h, dexId: j });
                                }),
                            );
                        return u.NextResponse.json({ cards: l, hasMore: g + n < f, totalCount: f }, { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
                    } catch (b) {
                        let a = b instanceof Error ? b.message : "Erro ao buscar cartas";
                        return u.NextResponse.json({ error: a }, { status: 500 });
                    }
                }
                let F = new e.AppRouteRouteModule({ definition: { kind: f.RouteKind.APP_ROUTE, page: "/api/search/route", pathname: "/api/search", filename: "route", bundlePath: "app/api/search/route" }, distDir: ".next", relativeProjectDir: "", resolvedPagePath: "/home/paulo_rosado/MyPokeBinder/src/app/api/search/route.ts", nextConfigOutput: "", userland: d }),
                    { workAsyncStorage: G, workUnitAsyncStorage: H, serverHooks: I } = F;
                function J() {
                    return (0, g.patchFetch)({ workAsyncStorage: G, workUnitAsyncStorage: H });
                }
                async function K(a, b, c) {
                    var d;
                    let e = "/api/search/route";
                    "/index" === e && (e = "/");
                    let g = await F.prepare(a, b, { srcPage: e, multiZoneDraftMode: !1 });
                    if (!g) return ((b.statusCode = 400), b.end("Bad Request"), null == c.waitUntil || c.waitUntil.call(c, Promise.resolve()), null);
                    let { buildId: u, params: v, nextConfig: w, isDraftMode: x, prerenderManifest: y, routerServerContext: z, isOnDemandRevalidate: A, revalidateOnlyGenerated: B, resolvedPathname: C } = g,
                        D = (0, j.normalizeAppPath)(e),
                        E = !!(y.dynamicRoutes[D] || y.routes[C]);
                    if (E && !x) {
                        let a = !!y.routes[C],
                            b = y.dynamicRoutes[D];
                        if (b && !1 === b.fallback && !a) throw new s.NoFallbackError();
                    }
                    let G = null;
                    !E || F.isDev || x || (G = "/index" === (G = C) ? "/" : G);
                    let H = !0 === F.isDev || !E,
                        I = E && !H,
                        J = a.method || "GET",
                        K = (0, i.getTracer)(),
                        L = K.getActiveScopeSpan(),
                        M = {
                            params: v,
                            prerenderManifest: y,
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
                                onInstrumentationRequestError: (b, c, d) => F.onRequestError(a, b, d, z),
                            },
                            sharedContext: { buildId: u },
                        },
                        N = new k.NodeNextRequest(a),
                        O = new k.NodeNextResponse(b),
                        P = l.NextRequestAdapter.fromNodeNextRequest(N, (0, l.signalFromNodeResponse)(b));
                    try {
                        let d = async (c) =>
                                F.handle(P, M).finally(() => {
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
                                            if (!(0, h.getRequestMeta)(a, "minimalMode") && A && B && !f) return ((b.statusCode = 404), b.setHeader("x-nextjs-cache", "REVALIDATED"), b.end("This page could not be found"), null);
                                            let e = await d(g);
                                            a.fetchMetrics = M.renderOpts.fetchMetrics;
                                            let i = M.renderOpts.pendingWaitUntil;
                                            i && c.waitUntil && (c.waitUntil(i), (i = void 0));
                                            let j = M.renderOpts.collectedTags;
                                            if (!E) return (await (0, o.I)(N, O, e, M.renderOpts.pendingWaitUntil), null);
                                            {
                                                let a = await e.blob(),
                                                    b = (0, p.toNodeOutgoingHttpHeaders)(e.headers);
                                                (j && (b[r.NEXT_CACHE_TAGS_HEADER] = j), !b["content-type"] && a.type && (b["content-type"] = a.type));
                                                let c = void 0 !== M.renderOpts.collectedRevalidate && !(M.renderOpts.collectedRevalidate >= r.INFINITE_CACHE) && M.renderOpts.collectedRevalidate,
                                                    d = void 0 === M.renderOpts.collectedExpire || M.renderOpts.collectedExpire >= r.INFINITE_CACHE ? void 0 : M.renderOpts.collectedExpire;
                                                return { value: { kind: t.CachedRouteKind.APP_ROUTE, status: e.status, body: Buffer.from(await a.arrayBuffer()), headers: b }, cacheControl: { revalidate: c, expire: d } };
                                            }
                                        } catch (b) {
                                            throw ((null == f ? void 0 : f.isStale) && (await F.onRequestError(a, b, { routerKind: "App Router", routePath: e, routeType: "route", revalidateReason: (0, n.c)({ isRevalidate: I, isOnDemandRevalidate: A }) }, z)), b);
                                        }
                                    },
                                    l = await F.handleResponse({ req: a, nextConfig: w, cacheKey: G, routeKind: f.RouteKind.APP_ROUTE, isFallback: !1, prerenderManifest: y, isRoutePPREnabled: !1, isOnDemandRevalidate: A, revalidateOnlyGenerated: B, responseGenerator: k, waitUntil: c.waitUntil });
                                if (!E) return null;
                                if ((null == l || null == (i = l.value) ? void 0 : i.kind) !== t.CachedRouteKind.APP_ROUTE) throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null == l || null == (j = l.value) ? void 0 : j.kind}`), "__NEXT_ERROR_CODE", { value: "E701", enumerable: !1, configurable: !0 });
                                ((0, h.getRequestMeta)(a, "minimalMode") || b.setHeader("x-nextjs-cache", A ? "REVALIDATED" : l.isMiss ? "MISS" : l.isStale ? "STALE" : "HIT"), x && b.setHeader("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate"));
                                let m = (0, p.fromNodeOutgoingHttpHeaders)(l.value.headers);
                                return (((0, h.getRequestMeta)(a, "minimalMode") && E) || m.delete(r.NEXT_CACHE_TAGS_HEADER), !l.cacheControl || b.getHeader("Cache-Control") || m.get("Cache-Control") || m.set("Cache-Control", (0, q.getCacheControlHeader)(l.cacheControl)), await (0, o.I)(N, O, new Response(l.value.body, { headers: m, status: l.value.status || 200 })), null);
                            };
                        L ? await g(L) : await K.withPropagatedContext(a.headers, () => K.trace(m.BaseServerSpan.handleRequest, { spanName: `${J} ${a.url}`, kind: i.SpanKind.SERVER, attributes: { "http.method": J, "http.target": a.url } }, g));
                    } catch (b) {
                        if ((b instanceof s.NoFallbackError || (await F.onRequestError(a, b, { routerKind: "App Router", routePath: D, routeType: "route", revalidateReason: (0, n.c)({ isRevalidate: I, isOnDemandRevalidate: A }) })), E)) throw b;
                        return (await (0, o.I)(N, O, new Response(null, { status: 500 })), null);
                    }
                }
            },
            19121: (a) => {
                a.exports = require("next/dist/server/app-render/action-async-storage.external.js");
            },
            23673: (a, b, c) => {
                c.d(b, { Mr: () => k, iz: () => j, xV: () => i });
                var d = c(38372);
                let e = new Set(["Colorless", "Darkness", "Dragon", "Fairy", "Fighting", "Fire", "Grass", "Lightning", "Metal", "Psychic", "Water"]),
                    f = { colorless: "Colorless", normal: "Colorless", dark: "Darkness", darkness: "Darkness", dragon: "Dragon", fairy: "Fairy", fighting: "Fighting", fire: "Fire", grass: "Grass", electric: "Lightning", lightning: "Lightning", metal: "Metal", steel: "Metal", psychic: "Psychic", water: "Water" },
                    g = { grass: "Grass", fire: "Fire", water: "Water", electric: "Lightning", bug: "Grass", normal: "Colorless", poison: "Psychic", ground: "Fighting", rock: "Fighting", fighting: "Fighting", psychic: "Psychic", ghost: "Psychic", ice: "Water", dragon: "Dragon", fairy: "Fairy", steel: "Metal", dark: "Darkness", flying: "Colorless" };
                function h(a) {
                    return "string" == typeof a && e.has(a);
                }
                function i(a) {
                    if (!Array.isArray(a)) return [];
                    let b = [];
                    for (let c of a) {
                        if ("string" != typeof c) continue;
                        let a = f[c.trim().toLowerCase()];
                        if ((a && !b.includes(a) && b.push(a), 2 === b.length)) break;
                    }
                    return b;
                }
                function j(a) {
                    return Array.isArray(a) && a.length <= 2 && a.every(h) && new Set(a).size === a.length;
                }
                function k(a, b) {
                    let c = i(a);
                    if (c.length > 0) return c;
                    if (!b) return ["Colorless"];
                    let e = (0, d.Z3)(b);
                    return e ? [g[e.type]] : ["Colorless"];
                }
            },
            29294: (a) => {
                a.exports = require("next/dist/server/app-render/work-async-storage.external.js");
            },
            44870: (a) => {
                a.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");
            },
            55719: (a, b, c) => {
                c.d(b, { HO: () => e, bE: () => d, ij: () => f, jF: () => h });
                let d = "/pokemon-card-back.png";
                function e(a, b = "high") {
                    if (!a || "string" != typeof a) return d;
                    let c = a.trim();
                    if (!c) return d;
                    if (c.startsWith("/") || c.endsWith(".webp") || c.endsWith(".png") || c.endsWith(".jpg") || c.endsWith(".jpeg")) return c;
                    let f = c.replace(/\/+$/, "");
                    return `${f}/${b}.webp`;
                }
                function f(a) {
                    if (!a || "string" != typeof a) return !1;
                    let b = a.trim();
                    return !(!b || b === d || b.includes("pokemon-card-back") || b.includes("tcg-card-back"));
                }
                let g = /^(A\d+[a-z]?|B\d+[a-z]?|P-A)-/i;
                function h(a) {
                    return !!a && !!(("string" == typeof a.image && a.image.includes("/tcgp/")) || ("string" == typeof a.id && g.test(a.id.trim())));
                }
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
            58075: (a, b, c) => {
                c.d(b, { Ai: () => g, Fz: () => e, J8: () => h });
                let d = new Map();
                async function e(a, b) {
                    let c = d.get(a);
                    if (c) return c;
                    let e = b().finally(() => {
                        d.delete(a);
                    });
                    return (d.set(a, e), e);
                }
                let f = new Map();
                function g(a) {
                    let b = f.get(a);
                    return b ? (Date.now() > b.expiresAt ? (f.delete(a), null) : b.data) : null;
                }
                function h(a, b, c) {
                    f.set(a, { data: b, expiresAt: Date.now() + c });
                }
            },
            63033: (a) => {
                a.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
            },
            86439: (a) => {
                a.exports = require("next/dist/shared/lib/no-fallback-error.external");
            },
            91557: (a, b, c) => {
                c.d(b, { _: () => e });
                var d = c(58075);
                async function e(a) {
                    if (!a || "string" != typeof a) return null;
                    let b = a.trim();
                    return b
                        ? (0, d.Fz)(`fallback_img_${b}`, async () => {
                              let a = async (a) => {
                                      try {
                                          let c = await fetch(`https://api.tcgdex.net/v2/${a}/cards/${encodeURIComponent(b)}`, { headers: { Accept: "application/json" }, next: { revalidate: 86400 } });
                                          if (!c.ok) return null;
                                          let d = await c.json();
                                          if ("string" == typeof d.image && d.image.trim().length > 0) return d.image.trim();
                                          return null;
                                      } catch {
                                          return null;
                                      }
                                  },
                                  [c, d, e] = await Promise.all([a("pt"), a("es"), a("it")]);
                              return c || d || e || null;
                          })
                        : null;
                }
            },
            96327: (a, b, c) => {
                c.d(b, { R: () => e });
                var d = c(38372);
                function e(a, b) {
                    if (!a || "string" != typeof a) return !1;
                    let c = a.trim();
                    if (!c) return !1;
                    if (151 === b) {
                        let a = c.replace(/mewtwo/gi, " ");
                        return /\bmew\b/i.test(a);
                    }
                    if (150 === b) return /\bmewtwo\b/i.test(c);
                    if (16 === b) return /\bpidgey\b/i.test(c);
                    if (17 === b) return /\bpidgeotto\b/i.test(c);
                    if (18 === b) {
                        let a = c.replace(/pidgeotto/gi, " ");
                        return /\bpidgeot\b/i.test(a);
                    }
                    if (79 === b) return /\bslowpoke\b/i.test(c);
                    if (80 === b) return /\bslowbro\b/i.test(c);
                    if (29 === b) return !(/nidorino|nidoking|nidorina|nidoqueen/i.test(c) || /[♂]|male\b/i.test(c)) && /nidoran/i.test(c);
                    if (32 === b) return !(/nidorina|nidoqueen|nidorino|nidoking/i.test(c) || /[♀]|female\b/i.test(c)) && /nidoran/i.test(c);
                    let e = (0, d.Z3)(b);
                    if (!e) return !0;
                    let f = e.name.toLowerCase().replace(/[♀♂]/g, "").trim();
                    if (f.includes("'") || f.includes("’")) {
                        let a = f.replace(/['’]/g, "");
                        return c.toLowerCase().replace(/['’]/g, "").includes(a);
                    }
                    if (f.includes(".")) {
                        let a = f.replace(/\./g, "");
                        return c.toLowerCase().replace(/\./g, "").includes(a);
                    }
                    return RegExp(`\\b${f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(c);
                }
            },
        }));
    var b = require("../../../webpack-runtime.js");
    b.C(a);
    var c = b.X(0, [8301, 991, 1692, 8372, 8278], () => b((b.s = 12003)));
    module.exports = c;
})();
