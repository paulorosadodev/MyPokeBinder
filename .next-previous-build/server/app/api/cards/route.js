"use strict";
(() => {
    var a = {};
    ((a.id = 9731),
        (a.ids = [9731]),
        (a.modules = {
            261: (a) => {
                a.exports = require("next/dist/shared/lib/router/utils/app-paths");
            },
            3295: (a) => {
                a.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
            },
            3896: (a, b, c) => {
                (Object.defineProperty(b, "__esModule", { value: !0 }),
                    !(function (a, b) {
                        for (var c in b) Object.defineProperty(a, c, { enumerable: !0, get: b[c] });
                    })(b, {
                        INTERCEPTION_ROUTE_MARKERS: function () {
                            return e;
                        },
                        extractInterceptionRouteInformation: function () {
                            return g;
                        },
                        isInterceptionRouteAppPath: function () {
                            return f;
                        },
                    }));
                let d = c(48723),
                    e = ["(..)(..)", "(.)", "(..)", "(...)"];
                function f(a) {
                    return void 0 !== a.split("/").find((a) => e.find((b) => a.startsWith(b)));
                }
                function g(a) {
                    let b, c, f;
                    for (let d of a.split("/"))
                        if ((c = e.find((a) => d.startsWith(a)))) {
                            [b, f] = a.split(c, 2);
                            break;
                        }
                    if (!b || !c || !f) throw Object.defineProperty(Error("Invalid interception route: " + a + ". Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>"), "__NEXT_ERROR_CODE", { value: "E269", enumerable: !1, configurable: !0 });
                    switch (((b = (0, d.normalizeAppPath)(b)), c)) {
                        case "(.)":
                            f = "/" === b ? "/" + f : b + "/" + f;
                            break;
                        case "(..)":
                            if ("/" === b) throw Object.defineProperty(Error("Invalid interception route: " + a + ". Cannot use (..) marker at the root level, use (.) instead."), "__NEXT_ERROR_CODE", { value: "E207", enumerable: !1, configurable: !0 });
                            f = b.split("/").slice(0, -1).concat(f).join("/");
                            break;
                        case "(...)":
                            f = "/" + f;
                            break;
                        case "(..)(..)":
                            let g = b.split("/");
                            if (g.length <= 2) throw Object.defineProperty(Error("Invalid interception route: " + a + ". Cannot use (..)(..) marker at the root level or one level up."), "__NEXT_ERROR_CODE", { value: "E486", enumerable: !1, configurable: !0 });
                            f = g.slice(0, -2).concat(f).join("/");
                            break;
                        default:
                            throw Object.defineProperty(Error("Invariant: unexpected marker"), "__NEXT_ERROR_CODE", { value: "E112", enumerable: !1, configurable: !0 });
                    }
                    return { interceptingRoute: b, interceptedRoute: f };
                }
            },
            10846: (a) => {
                a.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
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
            41201: (a, b, c) => {
                (c.r(b), c.d(b, { handler: () => K, patchFetch: () => J, routeModule: () => F, serverHooks: () => I, workAsyncStorage: () => G, workUnitAsyncStorage: () => H }));
                var d = {};
                (c.r(d), c.d(d, { GET: () => D, POST: () => E }));
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
                    y = c(41495),
                    z = c(44278),
                    A = c(96327),
                    B = c(23673),
                    C = c(43416);
                async function D(a) {
                    let b = await (0, v.v)(a);
                    if (b.response) return b.response;
                    let { user: c, supabase: d } = b;
                    if ("true" === a.nextUrl.searchParams.get("grouped")) {
                        let b = a.nextUrl.searchParams.get("page") ?? "1",
                            e = a.nextUrl.searchParams.get("limit") ?? "36",
                            f = a.nextUrl.searchParams.get("search") ?? "",
                            g = a.nextUrl.searchParams.get("status") ?? "all",
                            h = a.nextUrl.searchParams.get("language") ?? "all",
                            i = a.nextUrl.searchParams.get("rarity") ?? "all",
                            j = a.nextUrl.searchParams.get("expansion") ?? "all",
                            k = a.nextUrl.searchParams.get("sort") ?? "dex",
                            l = a.nextUrl.searchParams.get("direction") ?? "asc",
                            m = a.nextUrl.searchParams.get("variant") ?? "all",
                            n = a.nextUrl.searchParams.get("artist") ?? "all",
                            o = parseInt(b, 10),
                            p = parseInt(e, 10);
                        if (isNaN(o) || o < 1 || isNaN(p) || p < 1 || p > 100) return u.NextResponse.json({ error: "Par\xe2metros de pagina\xe7\xe3o inv\xe1lidos" }, { status: 400 });
                        if (!["all", "in_binder", "stored"].includes(g)) return u.NextResponse.json({ error: "Filtro de status inv\xe1lido" }, { status: 400 });
                        if (!["all", "pt-br", "en", "ja"].includes(h)) return u.NextResponse.json({ error: "Filtro de idioma inv\xe1lido" }, { status: 400 });
                        if (!["all", "normal", "holo", "reverse"].includes(m)) return u.NextResponse.json({ error: "Filtro de vers\xe3o inv\xe1lido" }, { status: 400 });
                        if (!["dex", "name", "recent"].includes(k)) return u.NextResponse.json({ error: "Campo de ordena\xe7\xe3o inv\xe1lido" }, { status: 400 });
                        if (!["asc", "desc"].includes(l)) return u.NextResponse.json({ error: "Dire\xe7\xe3o de ordena\xe7\xe3o inv\xe1lida" }, { status: 400 });
                        if (f.length > 100 || i.length > 50 || j.length > 100 || n.length > 100) return u.NextResponse.json({ error: "Tamanho de filtro excede o limite permitido" }, { status: 400 });
                        let q = (o - 1) * p,
                            { data: r, error: s } = await d.rpc("get_user_collection_groups", { p_user_id: c.id, p_search: f.trim() ? f.trim() : null, p_status: g, p_language: h, p_rarity: i, p_expansion: j, p_variant: m, p_artist: n, p_sort_field: k, p_sort_direction: l, p_limit: p, p_offset: q });
                        if (s) return u.NextResponse.json({ error: s.message }, { status: 500 });
                        let t = r ?? [],
                            v = t.length > 0 ? Number(t[0].total_filtered_count) : 0,
                            w = t.map((a) => ({
                                key: `${a.tcgdex_card_id}::${a.card_language}::${a.card_variant}::${a.card_condition}`,
                                card: {
                                    id: a.representative_id,
                                    user_id: a.user_id,
                                    pokemon_dex_id: a.pokemon_dex_id,
                                    tcgdex_card_id: a.tcgdex_card_id,
                                    card_name: a.card_name,
                                    card_image_url: a.card_image_url,
                                    card_set_name: a.card_set_name,
                                    card_rarity: a.card_rarity,
                                    card_types: a.card_types,
                                    card_language: a.card_language,
                                    card_variant: a.card_variant,
                                    card_artist: a.card_artist,
                                    card_condition: a.card_condition,
                                    is_in_binder: a.is_in_binder,
                                    created_at: a.created_at,
                                    updated_at: a.updated_at,
                                },
                                copies: (a.copy_ids ?? []).map((b) => ({
                                    id: b,
                                    user_id: a.user_id,
                                    pokemon_dex_id: a.pokemon_dex_id,
                                    tcgdex_card_id: a.tcgdex_card_id,
                                    card_name: a.card_name,
                                    card_image_url: a.card_image_url,
                                    card_set_name: a.card_set_name,
                                    card_rarity: a.card_rarity,
                                    card_types: a.card_types,
                                    card_language: a.card_language,
                                    card_variant: a.card_variant,
                                    card_artist: a.card_artist,
                                    card_condition: a.card_condition,
                                    is_in_binder: a.has_in_binder,
                                    created_at: a.created_at,
                                    updated_at: a.updated_at,
                                })),
                                totalCount: a.group_total_count,
                                hasInBinder: a.has_in_binder,
                            }));
                        return u.NextResponse.json({ groups: w, total: v, page: o, pageSize: p, hasMore: q + w.length < v });
                    }
                    let e = a.nextUrl.searchParams.get("pokemon_dex_id"),
                        f = d.from("user_cards").select("*").eq("user_id", c.id).order("created_at", { ascending: !1 }).limit(5e3);
                    if (e) {
                        let a = parseInt(e, 10);
                        isNaN(a) || (f = f.eq("pokemon_dex_id", a));
                    }
                    let { data: g, error: h } = await f;
                    return h ? u.NextResponse.json({ error: h.message }, { status: 500 }) : u.NextResponse.json({ cards: g ?? [] });
                }
                async function E(a) {
                    let b = await (0, v.v)(a);
                    if (b.response) return b.response;
                    let { user: c, supabase: d } = b;
                    try {
                        let { tcgdex_card_id: b, pokemon_dex_id: e, card_name: f, card_image_url: g, card_set_name: h = "", card_rarity: i = "", card_artist: j = "", card_condition: k = "NM", card_types: l, card_language: m = "pt-br", card_variant: n = "normal" } = await a.json(),
                            o = null != e,
                            p = !o || ("number" == typeof e && Number.isInteger(e) && e >= 1 && e <= 1025);
                        if ("string" != typeof b || 0 === b.trim().length || b.length > 100 || !p || "string" != typeof f || 0 === f.trim().length || f.length > 100 || "string" != typeof g || (!g.startsWith("https://") && !g.startsWith("/")) || g.length > 1e3 || "string" != typeof h || h.length > 100 || "string" != typeof i || i.length > 100 || "string" != typeof j || j.length > 100) return u.NextResponse.json({ error: "Campos obrigat\xf3rios ausentes ou inv\xe1lidos" }, { status: 400 });
                        if ("string" != typeof m || !["pt-br", "en", "ja"].includes(m.toLowerCase())) return u.NextResponse.json({ error: "Idioma inv\xe1lido" }, { status: 400 });
                        let q = "string" == typeof n ? n.toLowerCase() : "normal";
                        if (!(0, z.eY)(q)) return u.NextResponse.json({ error: "Vers\xe3o inv\xe1lida" }, { status: 400 });
                        if ("string" != typeof k || !(0, C.C6)(k)) return u.NextResponse.json({ error: "Condi\xe7\xe3o da carta inv\xe1lida" }, { status: 400 });
                        if ((0, w.jF)({ id: b, image: g })) return u.NextResponse.json({ error: "Cartas do Pok\xe9mon TCG Pocket n\xe3o s\xe3o permitidas" }, { status: 400 });
                        let r = o ? e : null;
                        if (null !== r && !(0, A.R)(f, r)) return u.NextResponse.json({ error: "A carta selecionada n\xe3o corresponde ao Pok\xe9mon indicado" }, { status: 400 });
                        if (void 0 !== l && !(0, B.iz)(l)) return u.NextResponse.json({ error: "Tipos elementais inv\xe1lidos" }, { status: 400 });
                        let s = void 0 === l ? (0, B.Mr)(void 0, r) : l,
                            t = (0, w.HO)(g.trim());
                        if (!(0, w.ij)(t)) {
                            let a = await (0, x._)(b.trim());
                            a && (t = (0, w.HO)(a));
                        }
                        let { data: v, error: D } = await d
                            .from("user_cards")
                            .insert({ user_id: c.id, tcgdex_card_id: b.trim(), pokemon_dex_id: r, card_name: f.trim(), card_image_url: t, card_set_name: "string" == typeof h ? h.trim() : "", card_rarity: "string" == typeof i ? i.trim() : "", card_artist: "string" == typeof j ? j.trim() : "", card_condition: k, card_types: s, card_language: m.toLowerCase(), card_variant: q, is_in_binder: !1 })
                            .select()
                            .single();
                        if (D) return u.NextResponse.json({ error: D.message }, { status: 500 });
                        return (await (0, y.dy)(d, c.id), u.NextResponse.json({ card: v }, { status: 201 }));
                    } catch (b) {
                        let a = b instanceof Error ? b.message : "Erro interno";
                        return u.NextResponse.json({ error: a }, { status: 500 });
                    }
                }
                let F = new e.AppRouteRouteModule({ definition: { kind: f.RouteKind.APP_ROUTE, page: "/api/cards/route", pathname: "/api/cards", filename: "route", bundlePath: "app/api/cards/route" }, distDir: ".next", relativeProjectDir: "", resolvedPagePath: "/home/paulo_rosado/MyPokeBinder/src/app/api/cards/route.ts", nextConfigOutput: "", userland: d }),
                    { workAsyncStorage: G, workUnitAsyncStorage: H, serverHooks: I } = F;
                function J() {
                    return (0, g.patchFetch)({ workAsyncStorage: G, workUnitAsyncStorage: H });
                }
                async function K(a, b, c) {
                    var d;
                    let e = "/api/cards/route";
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
            44870: (a) => {
                a.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");
            },
            48723: (a, b, c) => {
                (Object.defineProperty(b, "__esModule", { value: !0 }),
                    !(function (a, b) {
                        for (var c in b) Object.defineProperty(a, c, { enumerable: !0, get: b[c] });
                    })(b, {
                        normalizeAppPath: function () {
                            return f;
                        },
                        normalizeRscURL: function () {
                            return g;
                        },
                    }));
                let d = c(51506),
                    e = c(96896);
                function f(a) {
                    return (0, d.ensureLeadingSlash)(a.split("/").reduce((a, b, c, d) => (!b || (0, e.isGroupSegment)(b) || "@" === b[0] || (("page" === b || "route" === b) && c === d.length - 1) ? a : a + "/" + b), ""));
                }
                function g(a) {
                    return a.replace(/\.rsc($|\?)/, "$1");
                }
            },
            51506: (a, b) => {
                function c(a) {
                    return a.startsWith("/") ? a : "/" + a;
                }
                (Object.defineProperty(b, "__esModule", { value: !0 }),
                    Object.defineProperty(b, "ensureLeadingSlash", {
                        enumerable: !0,
                        get: function () {
                            return c;
                        },
                    }));
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
            96896: (a, b) => {
                function c(a) {
                    return "(" === a[0] && a.endsWith(")");
                }
                function d(a) {
                    return a.startsWith("@") && "@children" !== a;
                }
                function e(a, b) {
                    if (a.includes(f)) {
                        let a = JSON.stringify(b);
                        return "{}" !== a ? f + "?" + a : f;
                    }
                    return a;
                }
                (Object.defineProperty(b, "__esModule", { value: !0 }),
                    !(function (a, b) {
                        for (var c in b) Object.defineProperty(a, c, { enumerable: !0, get: b[c] });
                    })(b, {
                        DEFAULT_SEGMENT_KEY: function () {
                            return g;
                        },
                        PAGE_SEGMENT_KEY: function () {
                            return f;
                        },
                        addSearchParamsIfPageSegment: function () {
                            return e;
                        },
                        isGroupSegment: function () {
                            return c;
                        },
                        isParallelRouteSegment: function () {
                            return d;
                        },
                    }));
                let f = "__PAGE__",
                    g = "__DEFAULT__";
            },
        }));
    var b = require("../../../webpack-runtime.js");
    b.C(a);
    var c = b.X(0, [8301, 991, 1692, 6780, 8372, 1495, 8278], () => b((b.s = 41201)));
    module.exports = c;
})();
