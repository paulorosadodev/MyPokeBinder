(() => {
    var a = {};
    ((a.id = 2945),
        (a.ids = [2945]),
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
            17815: (a, b, c) => {
                "use strict";
                c.d(b, { yD: () => d });
                let d = ["classic_red", "ocean_blue", "forest_green", "electric_yellow", "shadow_purple", "charcoal_black", "golden_luxury"];
            },
            19121: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/action-async-storage.external.js");
            },
            29277: (a, b, c) => {
                "use strict";
                function d(a, b, c) {
                    let d = new Map(c.map((a) => [a.id, a])),
                        e = new Map();
                    for (let a of b) {
                        let b = e.get(a.binder_id) ?? [];
                        (b.push(a), e.set(a.binder_id, b));
                    }
                    return a.map((a) => {
                        let b = e.get(a.id) ?? [],
                            c = b.length,
                            f = b.filter((a) => !!a.user_card_id).length,
                            g = b.filter((a) => "pokemon" === a.slot_type || "card" === a.slot_type),
                            h = g.filter((a) => !!a.user_card_id).length,
                            i = b
                                .filter((a) => 1 === a.page_number)
                                .filter((a) => !!a.user_card_id)
                                .sort((a, b) => a.slot_index - b.slot_index)
                                .flatMap((a) => {
                                    let b = a.user_card_id ? d.get(a.user_card_id) : void 0;
                                    return b ? [{ ...b, slot_index: a.slot_index }] : [];
                                })
                                .slice(0, 3),
                            j = g.length > 0 ? Math.round((h / g.length) * 100) : c > 0 ? Math.round((f / c) * 100) : 0;
                        return { ...a, total_slots: c, total_cards: f, total_goals: g.length, filled_goals: h, completion_percentage: j, preview_cards: i };
                    });
                }
                async function e(a, b) {
                    let { data: c, error: e } = await a.from("binders").select("*").eq("user_id", b).order("created_at", { ascending: !0 });
                    if (e) return { binders: [], error: e.message };
                    let f = c ?? [];
                    if (0 === f.length) return { binders: f, error: null };
                    let g = f.map((a) => a.id),
                        { data: h, error: i } = await a.from("binder_slots").select("binder_id, page_number, slot_index, slot_type, user_card_id").in("binder_id", g).order("page_number", { ascending: !0 }).order("slot_index", { ascending: !0 });
                    if (i) return { binders: [], error: i.message };
                    let j = h ?? [],
                        k = j.flatMap((a) => (a.user_card_id ? [a.user_card_id] : []));
                    if (0 === k.length) return { binders: d(f, j, []), error: null };
                    let { data: l, error: m } = await a.from("user_cards").select("id, card_name, card_image_url").in("id", k);
                    return m ? { binders: [], error: m.message } : { binders: d(f, j, l ?? []), error: null };
                }
                c.d(b, { h: () => e });
            },
            29294: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/work-async-storage.external.js");
            },
            44870: (a) => {
                "use strict";
                a.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");
            },
            48152: (a, b, c) => {
                "use strict";
                c.d(b, { U: () => f });
                var d = c(4410),
                    e = c(86802);
                async function f() {
                    let a;
                    try {
                        a = await (0, e.UL)();
                    } catch {
                        a = void 0;
                    }
                    return (0, d.createServerClient)("https://cauuttzkxcmqwlsfoeib.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhdXV0dHpreGNtcXdsc2ZvZWliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4NDgxMzMsImV4cCI6MjEwNTQyNDEzM30.Zhqn9Xedk54YPfsmqgrCfSZv0hHF4YOIzNJxUnwUIrk", {
                        cookies: {
                            getAll: () => a?.getAll() ?? [],
                            setAll(b) {
                                try {
                                    b.forEach(({ name: b, value: c, options: d }) => {
                                        a?.set(b, c, d);
                                    });
                                } catch {}
                            },
                        },
                    });
                }
            },
            56834: (a, b, c) => {
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
            63033: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
            },
            78335: () => {},
            81377: (a, b, c) => {
                "use strict";
                function d(a) {
                    return void 0 === a ? void 0 : null === a ? null : "number" == typeof a && Number.isInteger(a) && !(a < 1) && !(a > 1025) ? a : void 0;
                }
                (c.d(b, { MN: () => d }), c(38372));
            },
            86439: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/no-fallback-error.external");
            },
            91149: (a, b, c) => {
                "use strict";
                c.d(b, { v: () => f });
                var d = c(10641),
                    e = c(48152);
                async function f(a) {
                    let b = await (0, e.U)(),
                        {
                            data: { user: c },
                            error: f,
                        } = await b.auth.getUser();
                    return f || !c ? { user: null, supabase: b, response: d.NextResponse.json({ error: "Unauthorized" }, { status: 401 }) } : { user: c, supabase: b, response: null };
                }
            },
            91973: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { handler: () => I, patchFetch: () => H, routeModule: () => D, serverHooks: () => G, workAsyncStorage: () => E, workUnitAsyncStorage: () => F }));
                var d = {};
                (c.r(d), c.d(d, { GET: () => B, POST: () => C }));
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
                    w = c(17815),
                    x = c(81377),
                    y = c(56834),
                    z = c(29277);
                let A = { "1x1": 1, "2x2": 4, "3x3": 9, "3x4": 12 };
                async function B(a) {
                    let b = await (0, v.v)(a);
                    if (b.response) return b.response;
                    let { user: c, supabase: d } = b,
                        { binders: e, error: f } = await (0, z.h)(d, c.id);
                    return f ? u.NextResponse.json({ error: f }, { status: 500 }) : u.NextResponse.json({ binders: e });
                }
                async function C(a) {
                    let b,
                        c = await (0, v.v)(a);
                    if (c.response) return c.response;
                    let { user: d, supabase: e } = c;
                    try {
                        b = await a.json();
                    } catch {
                        return u.NextResponse.json({ error: "Payload JSON inv\xe1lido" }, { status: 400 });
                    }
                    let f = "string" == typeof b?.name ? b.name.trim() : "";
                    if (f.length < 1 || f.length > 60) return u.NextResponse.json({ error: "O nome do binder \xe9 obrigat\xf3rio e deve ter entre 1 e 60 caracteres" }, { status: 400 });
                    let g = "string" == typeof b?.description ? b.description.trim() : "";
                    if (g.length > 200) return u.NextResponse.json({ error: "A descri\xe7\xe3o n\xe3o pode exceder 200 caracteres" }, { status: 400 });
                    let h = b?.grid_type;
                    if (!h || !["1x1", "2x2", "3x3", "3x4"].includes(h)) return u.NextResponse.json({ error: "Grid inv\xe1lido. Permitidos: 1x1, 2x2, 3x3, 3x4" }, { status: 400 });
                    let i = Number(b?.total_pages);
                    if (!Number.isInteger(i) || i < 1 || i > 50) return u.NextResponse.json({ error: "O n\xfamero total de p\xe1ginas deve ser um inteiro entre 1 e 50" }, { status: 400 });
                    let j = "string" == typeof b?.cover_theme ? b.cover_theme.trim() : "classic_red";
                    w.yD.includes(j) || (j = "classic_red");
                    let k = (0, x.MN)(b?.cover_pokemon_dex_id);
                    if (b?.cover_pokemon_dex_id !== void 0 && void 0 === k) return u.NextResponse.json({ error: "Pok\xe9mon da capa inv\xe1lido. Escolha um Pok\xe9mon entre #001 e #1025" }, { status: 400 });
                    let l = !!b?.is_public,
                        { data: m, error: n } = await e
                            .from("binders")
                            .insert({ user_id: d.id, name: f, description: g, grid_type: h, total_pages: i, cover_theme: j, cover_pokemon_dex_id: k ?? null, is_public: l })
                            .select()
                            .single();
                    if (n || !m) return u.NextResponse.json({ error: n?.message || "Erro ao criar binder" }, { status: 500 });
                    let o = A[h],
                        p = (0, y.r)(i),
                        q = [],
                        r = new Map();
                    if (Array.isArray(b?.slots)) for (let a of b.slots) a && a.page_number && a.slot_index && r.set(`${a.page_number}-${a.slot_index}`, a);
                    for (let a = 1; a <= p; a++)
                        for (let b = 1; b <= o; b++) {
                            let c = `${a}-${b}`,
                                d = a <= i ? r.get(c) : void 0;
                            if (d) {
                                let c = ["free", "pokemon", "card"].includes(d.slot_type) ? d.slot_type : "free";
                                q.push({ binder_id: m.id, page_number: a, slot_index: b, slot_type: c, target_dex_id: "pokemon" === c && "number" == typeof d.target_dex_id ? d.target_dex_id : null, target_tcgdex_id: "card" === c && "string" == typeof d.target_tcgdex_id ? d.target_tcgdex_id : null, target_card_name: "string" == typeof d.target_card_name ? d.target_card_name : null, target_card_image_url: "string" == typeof d.target_card_image_url ? d.target_card_image_url : null });
                            } else q.push({ binder_id: m.id, page_number: a, slot_index: b, slot_type: "free", target_dex_id: null, target_tcgdex_id: null, target_card_name: null, target_card_image_url: null });
                        }
                    for (let a = 0; a < q.length; a += 100) {
                        let b = q.slice(a, a + 100),
                            { error: c } = await e.from("binder_slots").insert(b);
                        if (c) return (await e.from("binders").delete().eq("id", m.id), u.NextResponse.json({ error: c.message }, { status: 500 }));
                    }
                    return u.NextResponse.json({ binder: { ...m, total_slots: q.length, total_cards: 0, total_goals: q.filter((a) => "free" !== a.slot_type).length, filled_goals: 0, completion_percentage: 0 } }, { status: 201 });
                }
                let D = new e.AppRouteRouteModule({ definition: { kind: f.RouteKind.APP_ROUTE, page: "/api/binders/route", pathname: "/api/binders", filename: "route", bundlePath: "app/api/binders/route" }, distDir: ".next", relativeProjectDir: "", resolvedPagePath: "/home/paulo_rosado/MyPokeBinder/src/app/api/binders/route.ts", nextConfigOutput: "", userland: d }),
                    { workAsyncStorage: E, workUnitAsyncStorage: F, serverHooks: G } = D;
                function H() {
                    return (0, g.patchFetch)({ workAsyncStorage: E, workUnitAsyncStorage: F });
                }
                async function I(a, b, c) {
                    var d;
                    let e = "/api/binders/route";
                    "/index" === e && (e = "/");
                    let g = await D.prepare(a, b, { srcPage: e, multiZoneDraftMode: !1 });
                    if (!g) return ((b.statusCode = 400), b.end("Bad Request"), null == c.waitUntil || c.waitUntil.call(c, Promise.resolve()), null);
                    let { buildId: u, params: v, nextConfig: w, isDraftMode: x, prerenderManifest: y, routerServerContext: z, isOnDemandRevalidate: A, revalidateOnlyGenerated: B, resolvedPathname: C } = g,
                        E = (0, j.normalizeAppPath)(e),
                        F = !!(y.dynamicRoutes[E] || y.routes[C]);
                    if (F && !x) {
                        let a = !!y.routes[C],
                            b = y.dynamicRoutes[E];
                        if (b && !1 === b.fallback && !a) throw new s.NoFallbackError();
                    }
                    let G = null;
                    !F || D.isDev || x || (G = "/index" === (G = C) ? "/" : G);
                    let H = !0 === D.isDev || !F,
                        I = F && !H,
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
                                onInstrumentationRequestError: (b, c, d) => D.onRequestError(a, b, d, z),
                            },
                            sharedContext: { buildId: u },
                        },
                        N = new k.NodeNextRequest(a),
                        O = new k.NodeNextResponse(b),
                        P = l.NextRequestAdapter.fromNodeNextRequest(N, (0, l.signalFromNodeResponse)(b));
                    try {
                        let d = async (c) =>
                                D.handle(P, M).finally(() => {
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
                                            throw ((null == f ? void 0 : f.isStale) && (await D.onRequestError(a, b, { routerKind: "App Router", routePath: e, routeType: "route", revalidateReason: (0, n.c)({ isRevalidate: I, isOnDemandRevalidate: A }) }, z)), b);
                                        }
                                    },
                                    l = await D.handleResponse({ req: a, nextConfig: w, cacheKey: G, routeKind: f.RouteKind.APP_ROUTE, isFallback: !1, prerenderManifest: y, isRoutePPREnabled: !1, isOnDemandRevalidate: A, revalidateOnlyGenerated: B, responseGenerator: k, waitUntil: c.waitUntil });
                                if (!F) return null;
                                if ((null == l || null == (i = l.value) ? void 0 : i.kind) !== t.CachedRouteKind.APP_ROUTE) throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null == l || null == (j = l.value) ? void 0 : j.kind}`), "__NEXT_ERROR_CODE", { value: "E701", enumerable: !1, configurable: !0 });
                                ((0, h.getRequestMeta)(a, "minimalMode") || b.setHeader("x-nextjs-cache", A ? "REVALIDATED" : l.isMiss ? "MISS" : l.isStale ? "STALE" : "HIT"), x && b.setHeader("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate"));
                                let m = (0, p.fromNodeOutgoingHttpHeaders)(l.value.headers);
                                return (((0, h.getRequestMeta)(a, "minimalMode") && F) || m.delete(r.NEXT_CACHE_TAGS_HEADER), !l.cacheControl || b.getHeader("Cache-Control") || m.get("Cache-Control") || m.set("Cache-Control", (0, q.getCacheControlHeader)(l.cacheControl)), await (0, o.I)(N, O, new Response(l.value.body, { headers: m, status: l.value.status || 200 })), null);
                            };
                        L ? await g(L) : await K.withPropagatedContext(a.headers, () => K.trace(m.BaseServerSpan.handleRequest, { spanName: `${J} ${a.url}`, kind: i.SpanKind.SERVER, attributes: { "http.method": J, "http.target": a.url } }, g));
                    } catch (b) {
                        if ((b instanceof s.NoFallbackError || (await D.onRequestError(a, b, { routerKind: "App Router", routePath: E, routeType: "route", revalidateReason: (0, n.c)({ isRevalidate: I, isOnDemandRevalidate: A }) })), F)) throw b;
                        return (await (0, o.I)(N, O, new Response(null, { status: 500 })), null);
                    }
                }
            },
            96487: () => {},
        }));
    var b = require("../../../webpack-runtime.js");
    b.C(a);
    var c = b.X(0, [8301, 991, 1692, 8372], () => b((b.s = 91973)));
    module.exports = c;
})();
