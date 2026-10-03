(() => {
    var a = {};
    ((a.id = 5177),
        (a.ids = [5177]),
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
            19121: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/action-async-storage.external.js");
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
            63033: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
            },
            69589: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { handler: () => G, patchFetch: () => F, routeModule: () => B, serverHooks: () => E, workAsyncStorage: () => C, workUnitAsyncStorage: () => D }));
                var d = {};
                (c.r(d), c.d(d, { GET: () => z, PATCH: () => A }));
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
                    w = c(38372),
                    x = c(41495);
                let y = { theme_color: "#ef4444" };
                async function z(a) {
                    let b = await (0, v.v)(a);
                    if (b.response) return b.response;
                    let { user: c, supabase: d } = b,
                        { data: e, error: f } = await d.from("user_settings").select("*").eq("user_id", c.id).maybeSingle();
                    return f ? u.NextResponse.json({ error: f.message }, { status: 500 }) : e ? u.NextResponse.json({ settings: e }) : u.NextResponse.json({ settings: { user_id: c.id, ...y } });
                }
                async function A(a) {
                    let b = await (0, v.v)(a);
                    if (b.response) return b.response;
                    let { user: c, supabase: d } = b;
                    try {
                        let b = await a.json(),
                            e = { user_id: c.id, updated_at: new Date().toISOString() };
                        if ("string" == typeof b.theme_color) {
                            let a = b.theme_color.trim();
                            if (!(0, w.kT)(a)) return u.NextResponse.json({ error: "Cor inv\xe1lida. Escolha um dos 6 temas oficiais Pok\xe9mon." }, { status: 400 });
                            e.theme_color = a;
                        }
                        let { data: f, error: g } = await d.from("user_settings").upsert(e, { onConflict: "user_id" }).select().single();
                        if (g) return u.NextResponse.json({ error: g.message }, { status: 500 });
                        return (e.theme_color && (await d.from("profiles").update({ theme_color: e.theme_color, updated_at: new Date().toISOString() }).eq("id", c.id), await (0, x.dy)(d, c.id)), u.NextResponse.json({ settings: f }));
                    } catch (b) {
                        let a = b instanceof Error ? b.message : "Erro interno";
                        return u.NextResponse.json({ error: a }, { status: 500 });
                    }
                }
                let B = new e.AppRouteRouteModule({ definition: { kind: f.RouteKind.APP_ROUTE, page: "/api/settings/route", pathname: "/api/settings", filename: "route", bundlePath: "app/api/settings/route" }, distDir: ".next", relativeProjectDir: "", resolvedPagePath: "/home/paulo_rosado/MyPokeBinder/src/app/api/settings/route.ts", nextConfigOutput: "", userland: d }),
                    { workAsyncStorage: C, workUnitAsyncStorage: D, serverHooks: E } = B;
                function F() {
                    return (0, g.patchFetch)({ workAsyncStorage: C, workUnitAsyncStorage: D });
                }
                async function G(a, b, c) {
                    var d;
                    let e = "/api/settings/route";
                    "/index" === e && (e = "/");
                    let g = await B.prepare(a, b, { srcPage: e, multiZoneDraftMode: !1 });
                    if (!g) return ((b.statusCode = 400), b.end("Bad Request"), null == c.waitUntil || c.waitUntil.call(c, Promise.resolve()), null);
                    let { buildId: u, params: v, nextConfig: w, isDraftMode: x, prerenderManifest: y, routerServerContext: z, isOnDemandRevalidate: A, revalidateOnlyGenerated: C, resolvedPathname: D } = g,
                        E = (0, j.normalizeAppPath)(e),
                        F = !!(y.dynamicRoutes[E] || y.routes[D]);
                    if (F && !x) {
                        let a = !!y.routes[D],
                            b = y.dynamicRoutes[E];
                        if (b && !1 === b.fallback && !a) throw new s.NoFallbackError();
                    }
                    let G = null;
                    !F || B.isDev || x || (G = "/index" === (G = D) ? "/" : G);
                    let H = !0 === B.isDev || !F,
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
                                onInstrumentationRequestError: (b, c, d) => B.onRequestError(a, b, d, z),
                            },
                            sharedContext: { buildId: u },
                        },
                        N = new k.NodeNextRequest(a),
                        O = new k.NodeNextResponse(b),
                        P = l.NextRequestAdapter.fromNodeNextRequest(N, (0, l.signalFromNodeResponse)(b));
                    try {
                        let d = async (c) =>
                                B.handle(P, M).finally(() => {
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
                                            if (!(0, h.getRequestMeta)(a, "minimalMode") && A && C && !f) return ((b.statusCode = 404), b.setHeader("x-nextjs-cache", "REVALIDATED"), b.end("This page could not be found"), null);
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
                                            throw ((null == f ? void 0 : f.isStale) && (await B.onRequestError(a, b, { routerKind: "App Router", routePath: e, routeType: "route", revalidateReason: (0, n.c)({ isRevalidate: I, isOnDemandRevalidate: A }) }, z)), b);
                                        }
                                    },
                                    l = await B.handleResponse({ req: a, nextConfig: w, cacheKey: G, routeKind: f.RouteKind.APP_ROUTE, isFallback: !1, prerenderManifest: y, isRoutePPREnabled: !1, isOnDemandRevalidate: A, revalidateOnlyGenerated: C, responseGenerator: k, waitUntil: c.waitUntil });
                                if (!F) return null;
                                if ((null == l || null == (i = l.value) ? void 0 : i.kind) !== t.CachedRouteKind.APP_ROUTE) throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null == l || null == (j = l.value) ? void 0 : j.kind}`), "__NEXT_ERROR_CODE", { value: "E701", enumerable: !1, configurable: !0 });
                                ((0, h.getRequestMeta)(a, "minimalMode") || b.setHeader("x-nextjs-cache", A ? "REVALIDATED" : l.isMiss ? "MISS" : l.isStale ? "STALE" : "HIT"), x && b.setHeader("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate"));
                                let m = (0, p.fromNodeOutgoingHttpHeaders)(l.value.headers);
                                return (((0, h.getRequestMeta)(a, "minimalMode") && F) || m.delete(r.NEXT_CACHE_TAGS_HEADER), !l.cacheControl || b.getHeader("Cache-Control") || m.get("Cache-Control") || m.set("Cache-Control", (0, q.getCacheControlHeader)(l.cacheControl)), await (0, o.I)(N, O, new Response(l.value.body, { headers: m, status: l.value.status || 200 })), null);
                            };
                        L ? await g(L) : await K.withPropagatedContext(a.headers, () => K.trace(m.BaseServerSpan.handleRequest, { spanName: `${J} ${a.url}`, kind: i.SpanKind.SERVER, attributes: { "http.method": J, "http.target": a.url } }, g));
                    } catch (b) {
                        if ((b instanceof s.NoFallbackError || (await B.onRequestError(a, b, { routerKind: "App Router", routePath: E, routeType: "route", revalidateReason: (0, n.c)({ isRevalidate: I, isOnDemandRevalidate: A }) })), F)) throw b;
                        return (await (0, o.I)(N, O, new Response(null, { status: 500 })), null);
                    }
                }
            },
            78335: () => {},
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
    var b = require("../../../webpack-runtime.js");
    b.C(a);
    var c = b.X(0, [8301, 991, 1692, 6780, 8372, 1495], () => b((b.s = 69589)));
    module.exports = c;
})();
