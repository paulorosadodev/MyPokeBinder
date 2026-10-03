(() => {
    var a = {};
    ((a.id = 9895),
        (a.ids = [9895]),
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
            5953: (a, b, c) => {
                Promise.resolve().then(c.bind(c, 83553));
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
            24491: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { default: () => f }));
                var d = c(75338),
                    e = c(52341);
                function f() {
                    return (0, d.jsx)(e.RouteLoading, { message: "Carregando editor...", className: "flex min-h-screen flex-col items-center justify-center bg-[#0a0c10]" });
                }
            },
            25799: (a, b, c) => {
                "use strict";
                (Object.defineProperty(b, "__esModule", { value: !0 }),
                    Object.defineProperty(b, "unstable_rethrow", {
                        enumerable: !0,
                        get: function () {
                            return function a(b) {
                                if ((0, g.isNextRouterError)(b) || (0, f.isBailoutToCSRError)(b) || (0, i.isDynamicServerError)(b) || (0, h.isDynamicPostpone)(b) || (0, e.isPostpone)(b) || (0, d.isHangingPromiseRejectionError)(b)) throw b;
                                b instanceof Error && "cause" in b && a(b.cause);
                            };
                        },
                    }));
                let d = c(82831),
                    e = c(43740),
                    f = c(29305),
                    g = c(61981),
                    h = c(26906),
                    i = c(69168);
                ("function" == typeof b.default || ("object" == typeof b.default && null !== b.default)) && void 0 === b.default.__esModule && (Object.defineProperty(b.default, "__esModule", { value: !0 }), Object.assign(b.default, b), (a.exports = b.default));
            },
            26713: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/router/utils/is-bot");
            },
            28354: (a) => {
                "use strict";
                a.exports = require("util");
            },
            29088: (a, b, c) => {
                "use strict";
                function d() {
                    throw Object.defineProperty(Error("`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", { value: "E411", enumerable: !1, configurable: !0 });
                }
                (Object.defineProperty(b, "__esModule", { value: !0 }),
                    Object.defineProperty(b, "unauthorized", {
                        enumerable: !0,
                        get: function () {
                            return d;
                        },
                    }),
                    c(98541).HTTP_ERROR_FALLBACK_ERROR_CODE,
                    ("function" == typeof b.default || ("object" == typeof b.default && null !== b.default)) && void 0 === b.default.__esModule && (Object.defineProperty(b.default, "__esModule", { value: !0 }), Object.assign(b.default, b), (a.exports = b.default)));
            },
            29294: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/work-async-storage.external.js");
            },
            30733: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("Star", [["path", { d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z", key: "r04s7s" }]]);
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
            37934: (a, b, c) => {
                Promise.resolve().then(c.bind(c, 52341));
            },
            40284: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("Trash2", [
                    ["path", { d: "M3 6h18", key: "d0wm0j" }],
                    ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
                    ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
                    ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
                    ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
                ]);
            },
            41025: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/dynamic-access-async-storage.external.js");
            },
            47614: (a, b, c) => {
                "use strict";
                (Object.defineProperty(b, "__esModule", { value: !0 }),
                    !(function (a, b) {
                        for (var c in b) Object.defineProperty(a, c, { enumerable: !0, get: b[c] });
                    })(b, {
                        getRedirectError: function () {
                            return g;
                        },
                        getRedirectStatusCodeFromError: function () {
                            return l;
                        },
                        getRedirectTypeFromError: function () {
                            return k;
                        },
                        getURLFromRedirectError: function () {
                            return j;
                        },
                        permanentRedirect: function () {
                            return i;
                        },
                        redirect: function () {
                            return h;
                        },
                    }));
                let d = c(91203),
                    e = c(92781),
                    f = c(19121).actionAsyncStorage;
                function g(a, b, c) {
                    void 0 === c && (c = d.RedirectStatusCode.TemporaryRedirect);
                    let f = Object.defineProperty(Error(e.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", { value: "E394", enumerable: !1, configurable: !0 });
                    return ((f.digest = e.REDIRECT_ERROR_CODE + ";" + b + ";" + a + ";" + c + ";"), f);
                }
                function h(a, b) {
                    var c;
                    throw (null != b || (b = (null == f || null == (c = f.getStore()) ? void 0 : c.isAction) ? e.RedirectType.push : e.RedirectType.replace), g(a, b, d.RedirectStatusCode.TemporaryRedirect));
                }
                function i(a, b) {
                    throw (void 0 === b && (b = e.RedirectType.replace), g(a, b, d.RedirectStatusCode.PermanentRedirect));
                }
                function j(a) {
                    return (0, e.isRedirectError)(a) ? a.digest.split(";").slice(2, -2).join(";") : null;
                }
                function k(a) {
                    if (!(0, e.isRedirectError)(a)) throw Object.defineProperty(Error("Not a redirect error"), "__NEXT_ERROR_CODE", { value: "E260", enumerable: !1, configurable: !0 });
                    return a.digest.split(";", 2)[1];
                }
                function l(a) {
                    if (!(0, e.isRedirectError)(a)) throw Object.defineProperty(Error("Not a redirect error"), "__NEXT_ERROR_CODE", { value: "E260", enumerable: !1, configurable: !0 });
                    return Number(a.digest.split(";").at(-2));
                }
                ("function" == typeof b.default || ("object" == typeof b.default && null !== b.default)) && void 0 === b.default.__esModule && (Object.defineProperty(b.default, "__esModule", { value: !0 }), Object.assign(b.default, b), (a.exports = b.default));
            },
            49858: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { default: () => j, metadata: () => i }));
                var d = c(75338),
                    e = c(82161),
                    f = c(48152),
                    g = c(90664),
                    h = c(71150);
                let i = { title: "Editar Binder | MyPokeBinder", description: "Edite as configura\xe7\xf5es, capas e quantidade de p\xe1ginas do seu binder." };
                async function j({ params: a }) {
                    let b = await a,
                        c = (0, g.rO)(b?.id);
                    (c && g.Ii.test(c)) || (0, e.notFound)();
                    let i = await (0, f.U)(),
                        {
                            data: { user: j },
                        } = await i.auth.getUser();
                    j || (0, e.redirect)("/login");
                    let [k, l] = await Promise.all([i.from("binders").select("*").eq("id", c).eq("user_id", j.id).maybeSingle(), i.from("binder_slots").select("id, binder_id, page_number, slot_index, slot_type, user_card_id").eq("binder_id", c)]),
                        { data: m, error: n } = k;
                    return ((n || !m) && (0, e.notFound)(), (0, d.jsx)(h.BinderEditClient, { binder: m, initialSlots: l.data ?? [] }));
                }
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
            64404: (a, b, c) => {
                "use strict";
                (Object.defineProperty(b, "__esModule", { value: !0 }),
                    Object.defineProperty(b, "notFound", {
                        enumerable: !0,
                        get: function () {
                            return e;
                        },
                    }));
                let d = "" + c(98541).HTTP_ERROR_FALLBACK_ERROR_CODE + ";404";
                function e() {
                    let a = Object.defineProperty(Error(d), "__NEXT_ERROR_CODE", { value: "E394", enumerable: !1, configurable: !0 });
                    throw ((a.digest = d), a);
                }
                ("function" == typeof b.default || ("object" == typeof b.default && null !== b.default)) && void 0 === b.default.__esModule && (Object.defineProperty(b.default, "__esModule", { value: !0 }), Object.assign(b.default, b), (a.exports = b.default));
            },
            64712: (a, b, c) => {
                "use strict";
                (Object.defineProperty(b, "__esModule", { value: !0 }),
                    Object.defineProperty(b, "unstable_rethrow", {
                        enumerable: !0,
                        get: function () {
                            return d;
                        },
                    }));
                let d = c(25799).unstable_rethrow;
                ("function" == typeof b.default || ("object" == typeof b.default && null !== b.default)) && void 0 === b.default.__esModule && (Object.defineProperty(b.default, "__esModule", { value: !0 }), Object.assign(b.default, b), (a.exports = b.default));
            },
            67837: (a, b, c) => {
                "use strict";
                function d() {
                    throw Object.defineProperty(Error("`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", { value: "E488", enumerable: !1, configurable: !0 });
                }
                (Object.defineProperty(b, "__esModule", { value: !0 }),
                    Object.defineProperty(b, "forbidden", {
                        enumerable: !0,
                        get: function () {
                            return d;
                        },
                    }),
                    c(98541).HTTP_ERROR_FALLBACK_ERROR_CODE,
                    ("function" == typeof b.default || ("object" == typeof b.default && null !== b.default)) && void 0 === b.default.__esModule && (Object.defineProperty(b.default, "__esModule", { value: !0 }), Object.assign(b.default, b), (a.exports = b.default)));
            },
            69505: (a, b, c) => {
                Promise.resolve().then(c.bind(c, 71150));
            },
            71150: (a, b, c) => {
                "use strict";
                c.d(b, { BinderEditClient: () => d });
                let d = (0, c(97954).registerClientReference)(
                    function () {
                        throw Error("Attempted to call BinderEditClient() from the server but BinderEditClient is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
                    },
                    "/home/paulo_rosado/MyPokeBinder/src/app/binders/[id]/edit/BinderEditClient.tsx",
                    "BinderEditClient",
                );
            },
            82161: (a, b, c) => {
                "use strict";
                var d = c(93045);
                (c.o(d, "RedirectType") &&
                    c.d(b, {
                        RedirectType: function () {
                            return d.RedirectType;
                        },
                    }),
                    c.o(d, "notFound") &&
                        c.d(b, {
                            notFound: function () {
                                return d.notFound;
                            },
                        }),
                    c.o(d, "redirect") &&
                        c.d(b, {
                            redirect: function () {
                                return d.redirect;
                            },
                        }));
            },
            83553: (a, b, c) => {
                "use strict";
                c.d(b, { BinderEditClient: () => x });
                var d = c(21124),
                    e = c(38301),
                    f = c(42378),
                    g = c(3991),
                    h = c.n(g),
                    i = c(21296),
                    j = c(79944),
                    k = c(22842),
                    l = c(80196),
                    m = c(30733),
                    n = c(40284);
                let o = (0, c(23339).A)("TriangleAlert", [
                    ["path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3", key: "wmoenq" }],
                    ["path", { d: "M12 9v4", key: "juzpu7" }],
                    ["path", { d: "M12 17h.01", key: "p32p05" }],
                ]);
                var p = c(42830),
                    q = c(93178),
                    r = c(51846),
                    s = c(40029),
                    t = c(27616),
                    u = c(76186),
                    v = c(42593);
                let w = { "1x1": 1, "2x2": 4, "3x3": 9, "3x4": 12 };
                function x({ binder: a, initialSlots: b }) {
                    let c = (0, f.useRouter)(),
                        { mutate: g } = (0, i.iX)(),
                        [x, y] = (0, e.useState)(a.name),
                        [z, A] = (0, e.useState)(a.description || ""),
                        [B, C] = (0, e.useState)(a.cover_theme || "classic_red"),
                        [D, E] = (0, e.useState)(a.cover_pokemon_dex_id ?? null),
                        [F, G] = (0, e.useState)(a.is_public),
                        [H, I] = (0, e.useState)(a.is_featured),
                        [J, K] = (0, e.useState)(a.total_pages),
                        [L, M] = (0, e.useState)(!1),
                        [N, O] = (0, e.useState)(!1),
                        [P, Q] = (0, e.useState)(!1),
                        [R, S] = (0, e.useState)(!1),
                        [T, U] = (0, e.useState)(null);
                    ((0, u.m)(P, () => Q(!1), L), (0, u.m)(R, () => S(!1), N));
                    let { isPresent: V, state: W } = (0, v.v)(P),
                        { isPresent: X, state: Y } = (0, v.v)(R),
                        Z = w[a.grid_type],
                        $ = (0, t.r)(J) * Z,
                        _ = (0, e.useMemo)(() => (J >= a.total_pages ? [] : b.filter((a) => a.page_number > (0, t.r)(J) && !!a.user_card_id)), [J, a.total_pages, b]),
                        aa = (0, e.useMemo)(() => b.filter((a) => !!a.user_card_id).length, [b]),
                        ab = async () => {
                            (M(!0), U(null));
                            try {
                                let b = await fetch(`/api/binders/${a.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: x.trim(), description: z.trim(), cover_theme: B, cover_pokemon_dex_id: D, is_public: F, is_featured: H, total_pages: J }) });
                                if (!b.ok) {
                                    let a = await b.json().catch(() => ({}));
                                    throw Error(a.error || "Erro ao salvar altera\xe7\xf5es");
                                }
                                (await g("/api/binders"), p.oR.success("Estrutura do binder atualizada!"), c.push(`/binders/${a.id}`));
                            } catch (a) {
                                (U(a.message || "Erro inesperado ao salvar"), M(!1), Q(!1));
                            }
                        },
                        ac = async () => {
                            O(!0);
                            try {
                                let b = await fetch(`/api/binders/${a.id}`, { method: "DELETE" });
                                if (!b.ok) {
                                    let a = await b.json().catch(() => ({}));
                                    throw Error(a.error || "Erro ao excluir binder");
                                }
                                (p.oR.success("Binder exclu\xeddo. As cartas voltaram para a cole\xe7\xe3o!"), c.push("/"), c.refresh());
                            } catch (a) {
                                (p.oR.error(a.message || "Erro ao excluir o binder"), O(!1), S(!1));
                            }
                        };
                    return (0, d.jsxs)("div", {
                        className: "flex min-h-screen flex-col bg-[#0a0c10] text-slate-100",
                        children: [
                            (0, d.jsxs)("main", {
                                className: "mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16",
                                children: [
                                    (0, d.jsxs)("div", {
                                        className: "flex items-center justify-between border-b border-white/10 pb-4",
                                        children: [(0, d.jsxs)(h(), { href: `/binders/${a.id}`, className: "flex items-center gap-2 text-xs font-semibold text-slate-400 transition-colors hover:text-white", children: [(0, d.jsx)(j.A, { size: 16 }), (0, d.jsx)("span", { children: "Voltar ao Binder" })] }), (0, d.jsxs)("h1", { className: "text-sm font-bold text-slate-300", children: ["Editar Estrutura: ", (0, d.jsx)("span", { className: "text-white", children: a.name })] })],
                                    }),
                                    T && (0, d.jsx)("div", { className: "rounded-xl border border-red-500/40 bg-red-500/10 p-3.5 text-xs text-red-300", children: T }),
                                    (0, d.jsxs)("div", {
                                        className: "grid grid-cols-1 gap-8 lg:grid-cols-12",
                                        children: [
                                            (0, d.jsxs)("form", {
                                                onSubmit: (a) => ((a.preventDefault(), x.trim()) ? (_.length > 0 ? void Q(!0) : void ab()) : void U("O nome do binder \xe9 obrigat\xf3rio.")),
                                                className: "flex flex-col gap-6 lg:col-span-7",
                                                children: [
                                                    (0, d.jsxs)("div", {
                                                        className: "flex flex-col gap-2",
                                                        children: [
                                                            (0, d.jsxs)("label", { className: "text-xs font-bold text-slate-300", children: ["Nome do Binder ", (0, d.jsx)("span", { className: "text-red-400", children: "*" })] }),
                                                            (0, d.jsx)("input", { type: "text", maxLength: 60, value: x, onChange: (a) => y(a.target.value), className: "h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 text-sm text-white placeholder-slate-500 focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none" }),
                                                        ],
                                                    }),
                                                    (0, d.jsxs)("div", {
                                                        className: "flex flex-col gap-2",
                                                        children: [(0, d.jsx)("label", { className: "text-xs font-bold text-slate-300", children: "Descri\xe7\xe3o" }), (0, d.jsx)("textarea", { rows: 3, maxLength: 200, value: z, onChange: (a) => A(a.target.value), className: "w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white placeholder-slate-500 focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none" })],
                                                    }),
                                                    (0, d.jsxs)("div", {
                                                        className: "flex flex-col gap-2.5",
                                                        children: [
                                                            (0, d.jsx)("label", { className: "text-xs font-bold text-slate-300", children: "Tema da Capa" }),
                                                            (0, d.jsx)("div", {
                                                                className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
                                                                children: Object.values(s.wZ).map((a) => {
                                                                    let b = B === a.id;
                                                                    return (0, d.jsxs)(
                                                                        "button",
                                                                        {
                                                                            type: "button",
                                                                            onClick: () => C(a.id),
                                                                            className: `flex cursor-pointer items-center gap-2 rounded-xl border p-2 text-left transition-all ${b ? "border-white bg-white/10" : "border-white/10 bg-white/[0.02] hover:border-white/20"}`,
                                                                            children: [(0, d.jsx)("div", { className: "h-5 w-5 shrink-0 rounded-full border border-white/20", style: { backgroundColor: a.primaryColor } }), (0, d.jsx)("span", { className: "block truncate text-xs font-semibold text-white", children: a.name })],
                                                                        },
                                                                        a.id,
                                                                    );
                                                                }),
                                                            }),
                                                        ],
                                                    }),
                                                    (0, d.jsx)(r.y, { value: D, onChange: E }),
                                                    (0, d.jsxs)("div", {
                                                        className: "flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-4",
                                                        children: [
                                                            (0, d.jsxs)("div", {
                                                                className: "flex items-center justify-between",
                                                                children: [(0, d.jsx)("span", { className: "text-xs font-bold text-slate-300", children: "Formato do Grid" }), (0, d.jsxs)("div", { className: "flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/40 px-2 py-0.5 text-xs font-mono text-slate-300", children: [(0, d.jsx)(k.A, { size: 12, className: "text-slate-400" }), (0, d.jsxs)("span", { children: ["Grid ", a.grid_type, " (Imut\xe1vel)"] })] })],
                                                            }),
                                                            (0, d.jsx)("p", { className: "text-[11px] text-slate-400", children: "O formato do grid \xe9 fixo para manter a consist\xeancia f\xedsica e a propor\xe7\xe3o dos compartimentos." }),
                                                        ],
                                                    }),
                                                    (0, d.jsxs)("div", {
                                                        className: "flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4",
                                                        children: [
                                                            (0, d.jsxs)("div", { className: "flex items-center justify-between", children: [(0, d.jsx)("label", { className: "text-xs font-bold text-slate-300", children: "Total de P\xe1ginas (1 a 50)" }), (0, d.jsxs)("span", { className: "font-mono text-sm font-bold text-poke-blue", children: [J, " ", 1 === J ? "p\xe1gina" : "p\xe1ginas"] })] }),
                                                            (0, d.jsx)("input", { type: "range", min: 1, max: 50, value: J, onChange: (a) => K(Number(a.target.value)), className: "h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-poke-blue" }),
                                                            (0, d.jsxs)("div", { className: "flex items-center justify-between text-[11px] text-slate-400", children: [(0, d.jsx)("span", { children: "M\xednimo: 1 p\xe1gina" }), (0, d.jsxs)("span", { className: "font-mono", children: ["Capacidade: ", (0, d.jsx)("strong", { className: "text-white", children: $ }), " cartas"] }), (0, d.jsx)("span", { children: "M\xe1ximo: 50 p\xe1ginas" })] }),
                                                        ],
                                                    }),
                                                    (0, d.jsxs)("div", {
                                                        className: "flex flex-col gap-3",
                                                        children: [
                                                            (0, d.jsxs)("div", {
                                                                className: "flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3.5",
                                                                children: [
                                                                    (0, d.jsxs)("div", {
                                                                        className: "flex flex-col gap-0.5",
                                                                        children: [
                                                                            (0, d.jsxs)("div", { className: "flex items-center gap-1.5", children: [F ? (0, d.jsx)(l.A, { size: 14, className: "text-emerald-400" }) : (0, d.jsx)(k.A, { size: 14, className: "text-slate-400" }), (0, d.jsx)("span", { className: "text-xs font-bold text-white", children: "Binder P\xfablico" })] }),
                                                                            (0, d.jsx)("span", { className: "text-[11px] text-slate-400", children: "Outros treinadores poder\xe3o visualizar seu binder atrav\xe9s do seu perfil p\xfablico." }),
                                                                        ],
                                                                    }),
                                                                    (0, d.jsx)("button", {
                                                                        type: "button",
                                                                        onClick: () => G(!F),
                                                                        className: `relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${F ? "bg-emerald-500" : "bg-white/15"}`,
                                                                        children: (0, d.jsx)("span", { className: `pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${F ? "translate-x-5" : "translate-x-0"}` }),
                                                                    }),
                                                                ],
                                                            }),
                                                            (0, d.jsxs)("div", {
                                                                className: "flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3.5",
                                                                children: [
                                                                    (0, d.jsxs)("div", {
                                                                        className: "flex flex-col gap-0.5",
                                                                        children: [
                                                                            (0, d.jsxs)("div", { className: "flex items-center gap-1.5", children: [(0, d.jsx)(m.A, { size: 14, className: H ? "text-amber-400 fill-amber-400" : "text-slate-400" }), (0, d.jsx)("span", { className: "text-xs font-bold text-white", children: "Binder em Destaque no Perfil" })] }),
                                                                            (0, d.jsx)("span", { className: "text-[11px] text-slate-400", children: "Exibido no topo da sua p\xe1gina de perfil de treinador." }),
                                                                        ],
                                                                    }),
                                                                    (0, d.jsx)("button", {
                                                                        type: "button",
                                                                        onClick: () => I(!H),
                                                                        className: `relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${H ? "bg-amber-500" : "bg-white/15"}`,
                                                                        children: (0, d.jsx)("span", { className: `pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${H ? "translate-x-5" : "translate-x-0"}` }),
                                                                    }),
                                                                ],
                                                            }),
                                                        ],
                                                    }),
                                                    (0, d.jsxs)("div", {
                                                        className: "flex items-center justify-between pt-4 border-t border-white/10",
                                                        children: [
                                                            (0, d.jsxs)("button", { type: "button", onClick: () => S(!0), className: "flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300", children: [(0, d.jsx)(n.A, { size: 14 }), (0, d.jsx)("span", { children: "Excluir Binder" })] }),
                                                            (0, d.jsx)("button", { type: "submit", disabled: L, className: "flex items-center gap-2 rounded-xl bg-poke-blue px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-poke-blue/90 disabled:opacity-50", children: L ? (0, d.jsx)("span", { children: "Salvando..." }) : (0, d.jsx)("span", { children: "Salvar Altera\xe7\xf5es" }) }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            (0, d.jsx)("div", {
                                                className: "lg:col-span-5 flex flex-col gap-4",
                                                children: (0, d.jsxs)("div", { className: "rounded-2xl border border-white/10 bg-[#121520]/80 p-5 shadow-xl backdrop-blur-md", children: [(0, d.jsx)("span", { className: "text-xs font-bold uppercase tracking-wider text-slate-400", children: "Pr\xe9-visualiza\xe7\xe3o da Capa" }), (0, d.jsx)(q.l, { name: x.trim() || a.name, coverTheme: B, coverPokemonDexId: D, className: "mx-auto mt-4 w-full max-w-[305px]" })] }),
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            V &&
                                (0, d.jsx)("div", {
                                    className: "modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-sm",
                                    "data-overlay-state": W,
                                    role: "dialog",
                                    "aria-modal": "true",
                                    "aria-label": "Confirmar desaloca\xe7\xe3o de cartas",
                                    onClick: (a) => {
                                        a.target !== a.currentTarget || L || Q(!1);
                                    },
                                    children: (0, d.jsxs)("div", {
                                        className: "modal-surface flex h-dvh max-h-none w-full max-w-none flex-col overflow-y-auto rounded-none border-0 border-amber-500/40 bg-[#161a24] p-6 shadow-2xl sm:h-auto sm:max-w-md sm:rounded-2xl sm:border",
                                        children: [
                                            (0, d.jsxs)("div", {
                                                className: "flex items-center gap-3 text-amber-400",
                                                children: [(0, d.jsx)("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20", children: (0, d.jsx)(o, { size: 20 }) }), (0, d.jsxs)("div", { children: [(0, d.jsx)("h3", { className: "text-base font-bold text-white", children: "Desaloca\xe7\xe3o de Cartas" }), (0, d.jsx)("p", { className: "text-xs text-amber-300", children: "Resumo de Impacto nas P\xe1ginas" })] })],
                                            }),
                                            (0, d.jsxs)("p", { className: "mt-4 text-xs text-slate-300", children: ["Voc\xea reduziu a quantidade de p\xe1ginas de ", a.total_pages, " para ", J, ". As p\xe1ginas removidas cont\xeam ", (0, d.jsxs)("strong", { className: "text-white font-bold", children: [_.length, " cartas alocadas"] }), "."] }),
                                            (0, d.jsxs)("div", { className: "mt-3 rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-slate-400", children: ["Nenhuma carta ser\xe1 perdida! Elas ser\xe3o desalocadas dos compartimentos removidos e permanecer\xe3o na sua conta como cartas ", (0, d.jsx)("strong", { className: "text-emerald-400", children: "guardadas na cole\xe7\xe3o" }), "."] }),
                                            (0, d.jsxs)("div", {
                                                className: "mt-6 flex items-center justify-end gap-3",
                                                children: [
                                                    (0, d.jsx)("button", { type: "button", onClick: () => Q(!1), className: "rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10", children: "Cancelar" }),
                                                    (0, d.jsx)("button", { type: "button", disabled: L, onClick: ab, className: "rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-black hover:bg-amber-400 disabled:opacity-50", children: L ? "Desalocando..." : "Confirmar e Desalocar" }),
                                                ],
                                            }),
                                        ],
                                    }),
                                }),
                            X &&
                                (0, d.jsx)("div", {
                                    className: "modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-sm",
                                    "data-overlay-state": Y,
                                    role: "dialog",
                                    "aria-modal": "true",
                                    "aria-label": "Confirmar exclus\xe3o do binder",
                                    onClick: (a) => {
                                        a.target !== a.currentTarget || N || S(!1);
                                    },
                                    children: (0, d.jsxs)("div", {
                                        className: "modal-surface flex h-dvh max-h-none w-full max-w-none flex-col overflow-y-auto rounded-none border-0 border-red-500/40 bg-[#181216] p-6 shadow-2xl sm:h-auto sm:max-w-md sm:rounded-2xl sm:border",
                                        children: [
                                            (0, d.jsxs)("div", {
                                                className: "flex items-center gap-3 text-red-400",
                                                children: [(0, d.jsx)("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20", children: (0, d.jsx)(n.A, { size: 20 }) }), (0, d.jsxs)("div", { children: [(0, d.jsx)("h3", { className: "text-base font-bold text-white", children: "Excluir Binder" }), (0, d.jsx)("p", { className: "text-xs text-red-300", children: "Esta a\xe7\xe3o \xe9 permanente" })] })],
                                            }),
                                            (0, d.jsxs)("p", { className: "mt-4 text-xs text-slate-300", children: ["Tem certeza que deseja excluir o binder ", (0, d.jsx)("strong", { className: "text-white", children: a.name }), "?"] }),
                                            (0, d.jsxs)("div", { className: "mt-3 rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-slate-400", children: ["Todas as ", aa, " cartas alocadas neste binder voltar\xe3o para a sua conta como ", (0, d.jsx)("strong", { className: "text-emerald-400", children: "guardadas na cole\xe7\xe3o" }), "."] }),
                                            (0, d.jsxs)("div", {
                                                className: "mt-6 flex items-center justify-end gap-3",
                                                children: [
                                                    (0, d.jsx)("button", { type: "button", onClick: () => S(!1), className: "rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10", children: "Cancelar" }),
                                                    (0, d.jsx)("button", { type: "button", disabled: N, onClick: ac, className: "rounded-xl bg-red-600 px-5 py-2 text-xs font-bold text-white hover:bg-red-500 disabled:opacity-50", children: N ? "Excluindo..." : "Sim, Excluir Binder" }),
                                                ],
                                            }),
                                        ],
                                    }),
                                }),
                        ],
                    });
                }
            },
            86003: (a, b, c) => {
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
                            {
                                children: [
                                    "binders",
                                    {
                                        children: [
                                            "[id]",
                                            { children: ["edit", { children: ["__PAGE__", {}, { page: [() => Promise.resolve().then(c.bind(c, 49858)), "/home/paulo_rosado/MyPokeBinder/src/app/binders/[id]/edit/page.tsx"] }] }, { loading: [() => Promise.resolve().then(c.bind(c, 24491)), "/home/paulo_rosado/MyPokeBinder/src/app/binders/[id]/edit/loading.tsx"] }] },
                                            { loading: [() => Promise.resolve().then(c.bind(c, 6588)), "/home/paulo_rosado/MyPokeBinder/src/app/binders/[id]/loading.tsx"] },
                                        ],
                                    },
                                    {},
                                ],
                            },
                            {
                                layout: [() => Promise.resolve().then(c.bind(c, 51472)), "/home/paulo_rosado/MyPokeBinder/src/app/layout.tsx"],
                                "global-error": [() => Promise.resolve().then(c.t.bind(c, 81170, 23)), "next/dist/client/components/builtin/global-error.js"],
                                "not-found": [() => Promise.resolve().then(c.bind(c, 59732)), "/home/paulo_rosado/MyPokeBinder/src/app/not-found.tsx"],
                                forbidden: [() => Promise.resolve().then(c.t.bind(c, 90461, 23)), "next/dist/client/components/builtin/forbidden.js"],
                                unauthorized: [() => Promise.resolve().then(c.t.bind(c, 32768, 23)), "next/dist/client/components/builtin/unauthorized.js"],
                            },
                        ],
                    }.children,
                    J = ["/home/paulo_rosado/MyPokeBinder/src/app/binders/[id]/edit/page.tsx"],
                    K = { require: c, loadChunk: () => Promise.resolve() },
                    L = new d.AppPageRouteModule({ definition: { kind: e.RouteKind.APP_PAGE, page: "/binders/[id]/edit/page", pathname: "/binders/[id]/edit", bundlePath: "", filename: "", appPaths: [] }, userland: { loaderTree: I }, distDir: ".next", relativeProjectDir: "" });
                async function M(a, b, d) {
                    var D;
                    let H = "/binders/[id]/edit/page";
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
            93045: (a, b, c) => {
                "use strict";
                (Object.defineProperty(b, "__esModule", { value: !0 }),
                    !(function (a, b) {
                        for (var c in b) Object.defineProperty(a, c, { enumerable: !0, get: b[c] });
                    })(b, {
                        ReadonlyURLSearchParams: function () {
                            return k;
                        },
                        RedirectType: function () {
                            return e.RedirectType;
                        },
                        forbidden: function () {
                            return g.forbidden;
                        },
                        notFound: function () {
                            return f.notFound;
                        },
                        permanentRedirect: function () {
                            return d.permanentRedirect;
                        },
                        redirect: function () {
                            return d.redirect;
                        },
                        unauthorized: function () {
                            return h.unauthorized;
                        },
                        unstable_isUnrecognizedActionError: function () {
                            return l;
                        },
                        unstable_rethrow: function () {
                            return i.unstable_rethrow;
                        },
                    }));
                let d = c(47614),
                    e = c(92781),
                    f = c(64404),
                    g = c(67837),
                    h = c(29088),
                    i = c(64712);
                class j extends Error {
                    constructor() {
                        super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams");
                    }
                }
                class k extends URLSearchParams {
                    append() {
                        throw new j();
                    }
                    delete() {
                        throw new j();
                    }
                    set() {
                        throw new j();
                    }
                    sort() {
                        throw new j();
                    }
                }
                function l() {
                    throw Object.defineProperty(Error("`unstable_isUnrecognizedActionError` can only be used on the client."), "__NEXT_ERROR_CODE", { value: "E776", enumerable: !1, configurable: !0 });
                }
                ("function" == typeof b.default || ("object" == typeof b.default && null !== b.default)) && void 0 === b.default.__esModule && (Object.defineProperty(b.default, "__esModule", { value: !0 }), Object.assign(b.default, b), (a.exports = b.default));
            },
        }));
    var b = require("../../../../webpack-runtime.js");
    b.C(a);
    var c = b.X(0, [8301, 991, 582, 708, 1160, 3536], () => b((b.s = 86003)));
    module.exports = c;
})();
