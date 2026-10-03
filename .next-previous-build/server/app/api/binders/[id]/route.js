(() => {
    var a = {};
    ((a.id = 3673),
        (a.ids = [3673]),
        (a.modules = {
            261: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/router/utils/app-paths");
            },
            3295: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
            },
            3896: (a, b, c) => {
                "use strict";
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
            29294: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/work-async-storage.external.js");
            },
            37185: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { handler: () => K, patchFetch: () => J, routeModule: () => F, serverHooks: () => I, workAsyncStorage: () => G, workUnitAsyncStorage: () => H }));
                var d = {};
                (c.r(d), c.d(d, { DELETE: () => E, GET: () => C, PATCH: () => D }));
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
                    w = c(90664),
                    x = c(17815),
                    y = c(81377),
                    z = c(56834),
                    A = c(41495);
                let B = { "1x1": 1, "2x2": 4, "3x3": 9, "3x4": 12 };
                async function C(a, b) {
                    let c = await b.params,
                        d = c?.id,
                        e = (0, w.rO)(d);
                    if (!e || !w.Ii.test(e)) return u.NextResponse.json({ error: "Identificador de binder inv\xe1lido" }, { status: 400 });
                    let { user: f, supabase: g } = await (0, v.v)(a),
                        { data: h, error: i } = await g.from("binders").select("*").eq("id", e).maybeSingle();
                    if (i) return u.NextResponse.json({ error: i.message }, { status: 500 });
                    if (!h) return u.NextResponse.json({ error: "Binder n\xe3o encontrado" }, { status: 404 });
                    let j = f && f.id === h.user_id;
                    if (!j && !h.is_public) return u.NextResponse.json({ error: "Binder privado ou n\xe3o encontrado" }, { status: 404 });
                    let { data: k, error: l } = await g.from("binder_slots").select("*").eq("binder_id", e).order("page_number", { ascending: !0 }).order("slot_index", { ascending: !0 });
                    if (l) return u.NextResponse.json({ error: l.message }, { status: 500 });
                    let m = (k ?? []).map((a) => a.user_card_id).filter((a) => "string" == typeof a && !!a),
                        n = new Map();
                    if (m.length > 0) {
                        let { data: a } = await g.from("user_cards").select("*").in("id", m);
                        for (let b of a ?? []) n.set(b.id, b);
                    }
                    let o = (k ?? []).map((a) => ({ ...a, card: (a.user_card_id && n.get(a.user_card_id)) || null })),
                        p = [];
                    if (f) {
                        let { data: a } = await g.from("binders").select("id, name, grid_type").eq("user_id", h.user_id).order("created_at", { ascending: !0 });
                        p = a ?? [];
                    }
                    return u.NextResponse.json({ binder: h, slots: o, otherBinders: p, isOwner: j });
                }
                async function D(a, b) {
                    let c,
                        d = await b.params,
                        e = d?.id,
                        f = (0, w.rO)(e);
                    if (!f || !w.Ii.test(f)) return u.NextResponse.json({ error: "Identificador de binder inv\xe1lido" }, { status: 400 });
                    let g = await (0, v.v)(a);
                    if (g.response) return g.response;
                    let { user: h, supabase: i } = g;
                    try {
                        c = await a.json();
                    } catch {
                        return u.NextResponse.json({ error: "Payload JSON inv\xe1lido" }, { status: 400 });
                    }
                    let { data: j, error: k } = await i.from("binders").select("*").eq("id", f).eq("user_id", h.id).maybeSingle();
                    if (k) return u.NextResponse.json({ error: k.message }, { status: 500 });
                    if (!j) return u.NextResponse.json({ error: "Binder n\xe3o encontrado" }, { status: 404 });
                    let l = { updated_at: new Date().toISOString() };
                    if (void 0 !== c.name) {
                        let a = "string" == typeof c.name ? c.name.trim() : "";
                        if (a.length < 1 || a.length > 60) return u.NextResponse.json({ error: "O nome do binder deve ter entre 1 e 60 caracteres" }, { status: 400 });
                        l.name = a;
                    }
                    if (void 0 !== c.description) {
                        let a = "string" == typeof c.description ? c.description.trim() : "";
                        if (a.length > 200) return u.NextResponse.json({ error: "A descri\xe7\xe3o n\xe3o pode exceder 200 caracteres" }, { status: 400 });
                        l.description = a;
                    }
                    if (void 0 !== c.cover_theme) {
                        let a = "string" == typeof c.cover_theme ? c.cover_theme.trim() : "classic_red";
                        if (!x.yD.includes(a)) return u.NextResponse.json({ error: "Tema de capa inv\xe1lido" }, { status: 400 });
                        l.cover_theme = a;
                    }
                    if (void 0 !== c.cover_pokemon_dex_id) {
                        let a = (0, y.MN)(c.cover_pokemon_dex_id);
                        if (void 0 === a) return u.NextResponse.json({ error: "Pok\xe9mon da capa inv\xe1lido. Escolha um Pok\xe9mon entre #001 e #1025" }, { status: 400 });
                        l.cover_pokemon_dex_id = a;
                    }
                    if ((void 0 !== c.is_public && (l.is_public = !!c.is_public), void 0 !== c.is_featured)) {
                        let a = !!c.is_featured;
                        ((l.is_featured = a), a && (await i.from("binders").update({ is_featured: !1 }).eq("user_id", h.id).neq("id", f)));
                    }
                    if (void 0 !== c.total_pages) {
                        let a = Number(c.total_pages);
                        if (!Number.isInteger(a) || a < 1 || a > 50) return u.NextResponse.json({ error: "O total de p\xe1ginas deve ser um n\xfamero inteiro entre 1 e 50" }, { status: 400 });
                        let b = j.total_pages,
                            d = (0, z.r)(b),
                            e = (0, z.r)(a);
                        if (e > d) {
                            let a = B[j.grid_type],
                                b = [];
                            for (let c = d + 1; c <= e; c++) for (let d = 1; d <= a; d++) b.push({ binder_id: f, page_number: c, slot_index: d, slot_type: "free", target_dex_id: null, target_tcgdex_id: null, target_card_name: null, target_card_image_url: null });
                            let { error: c } = await i.from("binder_slots").insert(b);
                            if (c) return u.NextResponse.json({ error: c.message }, { status: 500 });
                        } else if (e < d) {
                            let { error: a } = await i.from("binder_slots").delete().eq("binder_id", f).gt("page_number", e);
                            if (a) return u.NextResponse.json({ error: a.message }, { status: 500 });
                        }
                        let g = (0, z.m)(a);
                        if (null !== g) {
                            let { error: a } = await i.from("binder_slots").update({ slot_type: "free", target_dex_id: null, target_tcgdex_id: null, target_card_name: null, target_card_image_url: null }).eq("binder_id", f).eq("page_number", g);
                            if (a) return u.NextResponse.json({ error: a.message }, { status: 500 });
                        }
                        l.total_pages = a;
                    }
                    let { data: m, error: n } = await i.from("binders").update(l).eq("id", f).select().single();
                    return n || !m ? u.NextResponse.json({ error: n?.message || "Erro ao atualizar binder" }, { status: 500 }) : (await (0, A.dy)(i, h.id), u.NextResponse.json({ binder: m }));
                }
                async function E(a, b) {
                    let c = await b.params,
                        d = c?.id,
                        e = (0, w.rO)(d);
                    if (!e || !w.Ii.test(e)) return u.NextResponse.json({ error: "Identificador de binder inv\xe1lido" }, { status: 400 });
                    let f = await (0, v.v)(a);
                    if (f.response) return f.response;
                    let { user: g, supabase: h } = f,
                        { error: i } = await h.from("binders").delete().eq("id", e).eq("user_id", g.id);
                    return i ? u.NextResponse.json({ error: i.message }, { status: 500 }) : (await (0, A.dy)(h, g.id), u.NextResponse.json({ success: !0 }));
                }
                let F = new e.AppRouteRouteModule({ definition: { kind: f.RouteKind.APP_ROUTE, page: "/api/binders/[id]/route", pathname: "/api/binders/[id]", filename: "route", bundlePath: "app/api/binders/[id]/route" }, distDir: ".next", relativeProjectDir: "", resolvedPagePath: "/home/paulo_rosado/MyPokeBinder/src/app/api/binders/[id]/route.ts", nextConfigOutput: "", userland: d }),
                    { workAsyncStorage: G, workUnitAsyncStorage: H, serverHooks: I } = F;
                function J() {
                    return (0, g.patchFetch)({ workAsyncStorage: G, workUnitAsyncStorage: H });
                }
                async function K(a, b, c) {
                    var d;
                    let e = "/api/binders/[id]/route";
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
            48723: (a, b, c) => {
                "use strict";
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
                "use strict";
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
            96487: () => {},
            96896: (a, b) => {
                "use strict";
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
    var b = require("../../../../webpack-runtime.js");
    b.C(a);
    var c = b.X(0, [8301, 991, 1692, 6780, 8372, 1495], () => b((b.s = 37185)));
    module.exports = c;
})();
