(() => {
    var a = {};
    ((a.id = 8974),
        (a.ids = [8974]),
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
            22842: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("Lock", [
                    ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
                    ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }],
                ]);
            },
            26713: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/router/utils/is-bot");
            },
            28354: (a) => {
                "use strict";
                a.exports = require("util");
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
            29589: (a, b, c) => {
                "use strict";
                c.d(b, { D: () => f });
                var d = c(21124),
                    e = c(38301);
                function f({ className: a = "", placeholder: b, placeholderClassName: c = "", value: f, ...g }) {
                    let h = (0, e.useRef)(null),
                        [i, j] = (0, e.useState)(b),
                        k = "" === f || null == f;
                    return (0, d.jsxs)("div", { className: "relative w-full min-w-0", children: [(0, d.jsx)("input", { ref: h, value: f, ...g, placeholder: "", "aria-placeholder": b, className: `${a} placeholder:text-transparent` }), k ? (0, d.jsx)("span", { "aria-hidden": "true", className: `pointer-events-none absolute inset-y-0 z-10 flex items-center overflow-hidden text-ellipsis whitespace-nowrap text-slate-500 ${c}`, children: i }) : null] });
                }
            },
            33684: (a, b, c) => {
                (Promise.resolve().then(c.bind(c, 39483)), Promise.resolve().then(c.bind(c, 61698)));
            },
            33873: (a) => {
                "use strict";
                a.exports = require("path");
            },
            40029: (a, b, c) => {
                "use strict";
                c.d(b, { v: () => e, wZ: () => d });
                let d = {
                    classic_red: { id: "classic_red", name: "Vermelho Cl\xe1ssico", primaryColor: "#ef4444", glowColor: "rgba(239, 68, 68, 0.4)", bgGradient: "from-[#2b0f14] via-[#1a0c10] to-[#0c0608]", borderAccent: "#ef4444", leatherClass: "border-red-900/40 bg-[#160b0e]", ballType: "pokeball", material: "Couro granulado" },
                    ocean_blue: { id: "ocean_blue", name: "Azul Oceano", primaryColor: "#3b82f6", glowColor: "rgba(59, 130, 246, 0.4)", bgGradient: "from-[#0f1d2e] via-[#0c1524] to-[#060a12]", borderAccent: "#3b82f6", leatherClass: "border-blue-900/40 bg-[#0a111c]", ballType: "greatball", material: "Tecido t\xe9cnico" },
                    forest_green: { id: "forest_green", name: "Verde Floresta", primaryColor: "#10b981", glowColor: "rgba(16, 185, 129, 0.4)", bgGradient: "from-[#0e241b] via-[#091a13] to-[#050e0a]", borderAccent: "#10b981", leatherClass: "border-emerald-900/40 bg-[#07130e]", ballType: "safariball", material: "Lona encerada" },
                    electric_yellow: { id: "electric_yellow", name: "Amarelo El\xe9trico", primaryColor: "#eab308", glowColor: "rgba(234, 179, 8, 0.4)", bgGradient: "from-[#2b240f] via-[#1c170a] to-[#0d0b05]", borderAccent: "#eab308", leatherClass: "border-yellow-900/40 bg-[#141107]", ballType: "ultraball", material: "Vinil texturizado" },
                    shadow_purple: { id: "shadow_purple", name: "Roxo Noturno", primaryColor: "#a855f7", glowColor: "rgba(168, 85, 247, 0.4)", bgGradient: "from-[#23102d] via-[#180a20] to-[#0b040f]", borderAccent: "#a855f7", leatherClass: "border-purple-900/40 bg-[#120718]", ballType: "masterball", material: "Couro escovado" },
                    charcoal_black: { id: "charcoal_black", name: "Couro Preto \xd4nix", primaryColor: "#94a3b8", glowColor: "rgba(148, 163, 184, 0.3)", bgGradient: "from-[#1c202a] via-[#13161e] to-[#090b0e]", borderAccent: "#cbd5e1", leatherClass: "border-slate-800 bg-[#0d0f14]", ballType: "duskball", material: "Couro liso" },
                    golden_luxury: { id: "golden_luxury", name: "Dourado Nobre", primaryColor: "#f59e0b", glowColor: "rgba(245, 158, 11, 0.45)", bgGradient: "from-[#33220e] via-[#211508] to-[#0f0904]", borderAccent: "#f59e0b", leatherClass: "border-amber-900/40 bg-[#170f06]", ballType: "luxuryball", material: "Couro acetinado" },
                };
                function e(a) {
                    return d[a || "classic_red"] || d.classic_red;
                }
                Object.keys(d);
            },
            41025: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/dynamic-access-async-storage.external.js");
            },
            56140: (a, b, c) => {
                "use strict";
                c.d(b, { BinderShelf: () => I });
                var d = c(21124),
                    e = c(38301),
                    f = c(3991),
                    g = c.n(f),
                    h = c(42378),
                    i = c(65783),
                    j = c(8849),
                    k = c(88285),
                    l = c(47089),
                    m = c(80196),
                    n = c(22842);
                let o = (0, c(23339).A)("Settings2", [
                    ["path", { d: "M20 7h-9", key: "3s1dr2" }],
                    ["path", { d: "M14 17H5", key: "gfn3mx" }],
                    ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
                    ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }],
                ]);
                var p = c(75535),
                    q = c(59535),
                    r = c(24515),
                    s = c(63640),
                    t = c(93178),
                    u = c(46313),
                    v = c(40029),
                    w = c(86965),
                    x = c(82382);
                let y = { "1x1": "grid-cols-1 grid-rows-1", "2x2": "grid-cols-2 grid-rows-2", "3x3": "grid-cols-3 grid-rows-3", "3x4": "grid-cols-3 grid-rows-4" },
                    z = { "1x1": 1, "2x2": 4, "3x3": 9, "3x4": 12 },
                    A = (0, e.forwardRef)(function ({ binder: a }, b) {
                        return (0, d.jsx)("div", { ref: b, "data-density": "hard", className: "binder-book-page binder-cover-front h-full w-full overflow-hidden rounded-[10px]", children: (0, d.jsx)(t.l, { name: a.name, coverTheme: a.cover_theme, coverPokemonDexId: a.cover_pokemon_dex_id, className: "h-full" }) });
                    }),
                    B = (0, e.forwardRef)(function ({ binder: a }, b) {
                        let c = (0, v.v)(a.cover_theme);
                        return (0, d.jsx)("div", {
                            ref: b,
                            "data-density": "hard",
                            className: "binder-book-page relative h-full w-full overflow-hidden rounded-[10px] border border-white/[0.08] bg-[#0c1017]",
                            style: { backgroundImage: `radial-gradient(circle at 50% 50%, ${c.primaryColor}22, transparent 44%), repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 8px)` },
                            children: (0, d.jsx)("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: (0, d.jsx)(u.z, { ballType: c.ballType, size: 180, className: "h-[52%] w-[52%] opacity-[0.09]", style: { filter: "none" } }) }),
                        });
                    }),
                    C = (0, e.forwardRef)(function ({ binder: a }, b) {
                        let c = (0, v.v)(a.cover_theme),
                            f = a.preview_cards ?? [],
                            g = z[a.grid_type],
                            h = a.total_cards ?? 0,
                            i = (0, e.useMemo)(() => {
                                let a = new Map();
                                for (let b of f) void 0 !== b.slot_index && a.set(b.slot_index, b);
                                return a;
                            }, [f]);
                        return (0, d.jsx)("div", {
                            ref: b,
                            "data-density": "soft",
                            className: "binder-book-page h-full w-full rounded-[10px] bg-[#0d111a]",
                            children: (0, d.jsxs)("div", {
                                className: "flex h-full min-h-0 w-full flex-col rounded-[10px] border border-white/[0.08] bg-gradient-to-br from-[#141824] via-[#10131d] to-[#0a0d14] p-2 text-white",
                                children: [
                                    (0, d.jsxs)("div", { className: "mb-2 flex shrink-0 items-center justify-between border-b border-white/[0.08] pb-1.5 text-[9px] font-semibold text-slate-400", children: [(0, d.jsx)("span", { className: "text-slate-200", children: "P\xe1gina 1" }), (0, d.jsxs)("span", { style: { color: c.primaryColor }, children: [h, " cartas"] })] }),
                                    (0, d.jsx)("div", {
                                        className: `grid min-h-0 flex-1 gap-1.5 rounded-[5px] border border-[#161b26] bg-[#0b0e15] p-1 ${y[a.grid_type]}`,
                                        children: Array.from({ length: g }, (a, b) => {
                                            let c = b + 1,
                                                e = i.get(c);
                                            return (0, d.jsx)("div", { className: "relative min-h-0 overflow-hidden rounded-[3px] border border-white/[0.07] bg-black/20 shadow-inner", children: e && (0, d.jsx)(r.default, { src: e.card_image_url, alt: "", width: 84, height: 117, unoptimized: !0, className: "h-full w-full object-cover" }) }, c);
                                        }),
                                    }),
                                ],
                            }),
                        });
                    }),
                    D = (0, e.forwardRef)(function (a, b) {
                        return (0, d.jsx)("div", { ref: b, "data-density": "soft", className: "binder-book-page h-full w-full rounded-[10px] border border-white/[0.06] bg-[#0d111a]" });
                    }),
                    E = (0, e.forwardRef)(function ({ binder: a }, b) {
                        return (0, d.jsx)("div", { ref: b, "data-density": "hard", className: "binder-book-page binder-cover-back h-full w-full overflow-hidden rounded-[10px]", children: (0, d.jsx)(t.l, { name: a.name, coverTheme: a.cover_theme, coverPokemonDexId: null, back: !0, className: "h-full" }) });
                    });
                function F({ binder: a, active: b }) {
                    let c = (0, e.useContext)(w.cm),
                        f = c?.animationsEnabled ?? !0,
                        g = (0, e.useRef)(null),
                        h = (0, e.useRef)(null),
                        i = (0, e.useRef)(!1),
                        j = (0, e.useRef)(!1),
                        k = (0, e.useRef)(0),
                        l = (0, e.useRef)(b),
                        m = (0, e.useRef)(!1);
                    ((0, e.useRef)(null), (0, e.useRef)(0));
                    let n = (0, e.useCallback)(() => {
                            let a = h.current?.pageFlip();
                            if (a && i.current && !j.current) {
                                if (l.current && m.current && 0 === k.current) return void (f && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? ((a.getSettings().flippingTime = x.s2), a.flipNext()) : a.turnToPage(2));
                                l.current || 0 === k.current || (f && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? ((a.getSettings().flippingTime = x.s2), a.flipPrev()) : a.turnToPage(0));
                            }
                        }, [f]),
                        o = (0, e.useMemo)(() => [(0, d.jsx)(A, { binder: a }, "front"), (0, d.jsx)(B, { binder: a }, "inside-front"), (0, d.jsx)(C, { binder: a }, "catalog"), (0, d.jsx)(D, {}, "empty"), (0, d.jsx)(B, { binder: a }, "inside-back"), (0, d.jsx)(E, { binder: a }, "back")], [a]);
                    return (0, d.jsxs)("div", {
                        ref: g,
                        "data-shelf-page": "0",
                        "data-shelf-ready": "false",
                        "data-shelf-state": "read",
                        className: "binder-shelf-stage relative mx-auto h-[372px] w-[264px] max-w-full",
                        children: [
                            (0, d.jsx)("div", { "aria-hidden": "true", "data-shelf-cover-fallback": !0, className: "pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden rounded-[10px]", children: (0, d.jsx)(t.l, { name: a.name, coverTheme: a.cover_theme, coverPokemonDexId: a.cover_pokemon_dex_id, className: "h-full" }) }),
                            (0, d.jsx)("div", {
                                className: "binder-shelf-engine relative z-10 h-[372px] w-[264px]",
                                children: (0, d.jsx)(s.A, {
                                    ref: h,
                                    width: 264,
                                    height: 372,
                                    size: "fixed",
                                    minWidth: 264,
                                    maxWidth: 264,
                                    minHeight: 372,
                                    maxHeight: 372,
                                    maxShadowOpacity: x.Wn,
                                    showCover: !0,
                                    mobileScrollSupport: !0,
                                    swipeDistance: x.SJ,
                                    clickEventForward: !0,
                                    disableFlipByClick: !f,
                                    flippingTime: x.s2,
                                    usePortrait: !1,
                                    startPage: 0,
                                    onInit: () => {
                                        ((i.current = !0), g.current && (g.current.dataset.shelfReady = "true"), n());
                                    },
                                    onChangeState: (a) => {
                                        let b = String(a.data);
                                        (g.current && (g.current.dataset.shelfState = b),
                                            (j.current = "read" !== b),
                                            j.current ||
                                                window.setTimeout(() => {
                                                    n();
                                                }, 0));
                                    },
                                    onFlip: (a) => {
                                        ((k.current = Number(a.data) || 0), g.current && (g.current.dataset.shelfPage = String(k.current)));
                                    },
                                    drawShadow: f,
                                    startZIndex: 0,
                                    autoSize: !1,
                                    useMouseEvents: !1,
                                    showPageCorners: !1,
                                    renderOnlyPageLengthChange: !0,
                                    className: "binder-shelf-flipbook-root",
                                    style: {},
                                    children: o,
                                }),
                            }),
                        ],
                    });
                }
                var G = c(29589),
                    H = c(68686);
                function I({ initialBinders: a = [] }) {
                    let b = (0, h.useRouter)(),
                        { binders: c, isLoading: f, isError: r } = (0, H.v1)({ binders: a }),
                        [s, t] = (0, e.useState)(""),
                        [u, w] = (0, e.useState)(null),
                        x = s.trim().toLocaleLowerCase(),
                        y = (0, e.useMemo)(() => (x ? c.filter((a) => `${a.name} ${a.description ?? ""}`.toLocaleLowerCase().includes(x)) : c), [c, x]),
                        z = (0, e.useMemo)(() => c.reduce((a, b) => a + (b.total_cards || 0), 0), [c]);
                    return (0, d.jsx)("div", {
                        className: "flex min-h-screen flex-col",
                        children: (0, d.jsxs)("main", {
                            className: "mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 pb-28 sm:px-6 sm:py-8 md:pb-16",
                            children: [
                                (0, d.jsxs)("div", {
                                    className: "flex flex-col justify-between gap-4 md:flex-row md:items-center",
                                    children: [
                                        (0, d.jsx)("div", { children: (0, d.jsx)("h1", { className: "text-2xl font-extrabold tracking-tight text-white sm:text-3xl", children: "Meus Binders" }) }),
                                        (0, d.jsxs)("div", {
                                            className: "flex flex-wrap items-center gap-3",
                                            children: [
                                                (0, d.jsxs)("div", {
                                                    className: "flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300",
                                                    children: [(0, d.jsx)(i.A, { size: 14, className: "text-slate-400" }), (0, d.jsxs)("span", { children: [(0, d.jsx)("strong", { className: "text-white", children: c.length }), " ", 1 === c.length ? "Binder" : "Binders"] }), (0, d.jsx)("span", { className: "text-white/20", children: "|" }), (0, d.jsxs)("span", { children: [(0, d.jsx)("strong", { className: "text-white", children: z }), " cartas alocadas"] })],
                                                }),
                                                (0, d.jsxs)(g(), { href: "/binders/new", className: "flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-poke-blue px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90", children: [(0, d.jsx)(j.A, { size: 18 }), (0, d.jsx)("span", { children: "Criar Binder" })] }),
                                            ],
                                        }),
                                    ],
                                }),
                                (0, d.jsx)("div", {
                                    className: "relative z-20 rounded-2xl border border-white/10 bg-[#121520]/80 p-2.5 shadow-xl backdrop-blur-md sm:p-3.5",
                                    children: (0, d.jsxs)("div", {
                                        className: "relative",
                                        children: [
                                            (0, d.jsx)(k.A, { size: 15, className: "pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-500 sm:left-3.5 sm:h-4 sm:w-4" }),
                                            (0, d.jsx)(G.D, {
                                                type: "search",
                                                value: s,
                                                onChange: (a) => t(a.target.value),
                                                placeholder: "Buscar por nome ou descri\xe7\xe3o...",
                                                placeholderClassName: "left-8.5 right-8 text-xs sm:left-10 sm:right-9 sm:text-sm",
                                                className: "h-9 w-full rounded-xl border border-white/10 bg-white/5 py-2 pr-9 pl-8.5 text-xs text-white transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none sm:h-10 sm:py-2.5 sm:pr-10 sm:pl-10 sm:text-sm",
                                            }),
                                            s && (0, d.jsx)("button", { type: "button", onClick: () => t(""), "aria-label": "Limpar busca", className: "absolute top-1/2 right-2.5 z-20 -translate-y-1/2 text-slate-500 transition-colors hover:text-white sm:right-3", children: (0, d.jsx)(l.A, { size: 14, className: "sm:h-[15px] sm:w-[15px]" }) }),
                                        ],
                                    }),
                                }),
                                f && 0 === c.length
                                    ? (0, d.jsx)("div", { className: "flex h-64 flex-col items-center justify-center", children: (0, d.jsx)(q.i, { message: "Organizando estante...", size: "lg" }) })
                                    : r && 0 === c.length
                                      ? (0, d.jsxs)("div", {
                                            className: "flex h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center",
                                            children: [(0, d.jsx)("p", { className: "text-sm text-red-400", children: "N\xe3o foi poss\xedvel carregar seus binders no momento." }), (0, d.jsx)("button", { type: "button", onClick: () => window.location.reload(), className: "rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20", children: "Recarregar p\xe1gina" })],
                                        })
                                      : (0, d.jsx)("div", {
                                            className: "relative",
                                            children:
                                                0 === y.length && x
                                                    ? (0, d.jsxs)("div", {
                                                          className: "flex h-64 flex-col items-center justify-center gap-3 text-center",
                                                          children: [
                                                              (0, d.jsx)(k.A, { size: 32, className: "text-slate-600" }),
                                                              (0, d.jsxs)("div", { children: [(0, d.jsx)("p", { className: "text-sm font-semibold text-white", children: "Nenhum Binder encontrado" }), (0, d.jsx)("p", { className: "mt-1 text-xs text-slate-400", children: "Tente buscar por outro nome ou descri\xe7\xe3o." })] }),
                                                              (0, d.jsx)("button", { type: "button", onClick: () => t(""), className: "rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white", children: "Limpar busca" }),
                                                          ],
                                                      })
                                                    : (0, d.jsxs)("div", {
                                                          className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                                                          children: [
                                                              y.map((a, c) => {
                                                                  let e = (0, v.v)(a.cover_theme),
                                                                      f = a.total_slots ?? 9 * a.total_pages,
                                                                      h = a.completion_percentage ?? 0,
                                                                      i = a.total_cards ?? 0,
                                                                      j = Math.min(40 * c, 480);
                                                                  return (0, d.jsxs)(
                                                                      "div",
                                                                      {
                                                                          role: "link",
                                                                          tabIndex: 0,
                                                                          onClick: () => b.push(`/binders/${a.id}`),
                                                                          onKeyDown: (c) => {
                                                                              ("Enter" === c.key || " " === c.key) && (c.preventDefault(), b.push(`/binders/${a.id}`));
                                                                          },
                                                                          onMouseEnter: () => {
                                                                              (w(a.id), b.prefetch(`/binders/${a.id}`));
                                                                          },
                                                                          onPointerDown: () => b.prefetch(`/binders/${a.id}`),
                                                                          onMouseLeave: () => w((b) => (b === a.id ? null : b)),
                                                                          onFocus: () => {
                                                                              (w(a.id), b.prefetch(`/binders/${a.id}`));
                                                                          },
                                                                          onBlur: (b) => {
                                                                              b.currentTarget.contains(b.relatedTarget) || w((b) => (b === a.id ? null : b));
                                                                          },
                                                                          "aria-label": `Abrir Binder ${a.name}`,
                                                                          style: { animationDelay: `${j}ms` },
                                                                          className: "binder-shelf-card card-list-appear group relative flex cursor-pointer flex-col rounded-[20px] border border-white/10 bg-[#10131b]/70 p-3 outline-none transition-[border-color,background-color] duration-300 hover:border-white/20 hover:bg-[#131722] focus-visible:ring-2 focus-visible:ring-poke-blue/80",
                                                                          children: [
                                                                              (0, d.jsx)(F, { binder: a, active: u === a.id }, `${a.id}-${a.updated_at}`),
                                                                              (0, d.jsxs)("div", {
                                                                                  className: "flex flex-1 flex-col justify-between px-1 pt-4",
                                                                                  children: [
                                                                                      (0, d.jsxs)("div", {
                                                                                          children: [
                                                                                              (0, d.jsxs)("div", {
                                                                                                  className: "flex items-start justify-between gap-2",
                                                                                                  children: [
                                                                                                      (0, d.jsxs)("div", {
                                                                                                          className: "min-w-0",
                                                                                                          children: [
                                                                                                              (0, d.jsx)("h2", { className: "truncate text-[15px] font-bold tracking-tight text-white sm:text-base", children: a.name }),
                                                                                                              (0, d.jsxs)("div", {
                                                                                                                  className: "mt-1 flex items-center gap-1.5 text-[11px] text-slate-400",
                                                                                                                  children: [a.is_public ? (0, d.jsx)(m.A, { size: 13, className: "shrink-0 text-emerald-300", "aria-label": "Binder p\xfablico" }) : (0, d.jsx)(n.A, { size: 12, className: "shrink-0 text-slate-500", "aria-label": "Binder privado" }), (0, d.jsx)("span", { children: a.is_public ? "P\xfablico" : "Privado" })],
                                                                                                              }),
                                                                                                          ],
                                                                                                      }),
                                                                                                      (0, d.jsx)(g(), { href: `/binders/${a.id}/edit`, onClick: (a) => a.stopPropagation(), title: "Editar estrutura do Binder", className: "flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white", children: (0, d.jsx)(o, { size: 13 }) }),
                                                                                                  ],
                                                                                              }),
                                                                                              a.description && (0, d.jsx)("p", { className: "mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400", children: a.description }),
                                                                                          ],
                                                                                      }),
                                                                                      (0, d.jsxs)("div", {
                                                                                          className: "mt-4 flex items-end justify-between border-t border-white/[0.07] pt-3",
                                                                                          children: [
                                                                                              (0, d.jsxs)("span", { className: "font-mono text-[11px] text-slate-400", children: [(0, d.jsx)("strong", { className: "font-semibold text-slate-200", children: i }), "/", f, " cartas"] }),
                                                                                              (0, d.jsxs)("div", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-400", children: [(0, d.jsxs)("span", { style: { color: e.primaryColor }, children: [h, "%"] }), (0, d.jsx)(p.A, { size: 13, className: "transition-transform duration-300 lg:group-hover:translate-x-0.5 lg:group-focus:translate-x-0.5" })] }),
                                                                                          ],
                                                                                      }),
                                                                                  ],
                                                                              }),
                                                                          ],
                                                                      },
                                                                      a.id,
                                                                  );
                                                              }),
                                                              !x &&
                                                                  (0, d.jsxs)(g(), {
                                                                      href: "/binders/new",
                                                                      prefetch: !0,
                                                                      style: { animationDelay: `${Math.min(40 * y.length, 480)}ms` },
                                                                      className: "card-list-appear group flex min-h-[320px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.015] p-6 text-center transition-all duration-300 hover:border-poke-blue/60 hover:bg-poke-blue/[0.03] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] select-none",
                                                                      children: [
                                                                          (0, d.jsx)("div", { className: "flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400 shadow-inner transition-all duration-300 group-hover:border-poke-blue/50 group-hover:bg-poke-blue/20 group-hover:text-white", children: (0, d.jsx)(j.A, { size: 28 }) }),
                                                                          (0, d.jsx)("h3", { className: "mt-4 text-base font-bold text-white transition-colors group-hover:text-poke-blue", children: "Criar Binder" }),
                                                                          (0, d.jsx)("p", { className: "mt-1 max-w-[220px] text-xs text-slate-400", children: "Escolha uma capa, o formato da grade e a quantidade de p\xe1ginas." }),
                                                                      ],
                                                                  }),
                                                          ],
                                                      }),
                                        }),
                            ],
                        }),
                    });
                }
            },
            60967: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { default: () => j, metadata: () => i }));
                var d = c(75338),
                    e = c(48152),
                    f = c(61698),
                    g = c(39483),
                    h = c(29277);
                let i = { title: "Binders | MyPokeBinder", description: "Gerencie seus Binders de Pok\xe9mon TCG com formatos e capas personalizadas." };
                async function j() {
                    let a = await (0, e.U)(),
                        {
                            data: { user: b },
                        } = await a.auth.getUser();
                    if (!b) return (0, d.jsx)(g.LandingPage, {});
                    let { binders: c } = await (0, h.h)(a, b.id);
                    return (0, d.jsx)(f.BinderShelf, { initialBinders: c });
                }
            },
            61698: (a, b, c) => {
                "use strict";
                c.d(b, { BinderShelf: () => d });
                let d = (0, c(97954).registerClientReference)(
                    function () {
                        throw Error("Attempted to call BinderShelf() from the server but BinderShelf is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
                    },
                    "/home/paulo_rosado/MyPokeBinder/src/components/shelf/BinderShelf.tsx",
                    "BinderShelf",
                );
            },
            63033: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
            },
            75535: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("ArrowRight", [
                    ["path", { d: "M5 12h14", key: "1ays0h" }],
                    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
                ]);
            },
            80663: (a, b, c) => {
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
                let I = [
                        "",
                        { children: ["__PAGE__", {}, { page: [() => Promise.resolve().then(c.bind(c, 60967)), "/home/paulo_rosado/MyPokeBinder/src/app/page.tsx"] }] },
                        {
                            layout: [() => Promise.resolve().then(c.bind(c, 51472)), "/home/paulo_rosado/MyPokeBinder/src/app/layout.tsx"],
                            "global-error": [() => Promise.resolve().then(c.t.bind(c, 81170, 23)), "next/dist/client/components/builtin/global-error.js"],
                            "not-found": [() => Promise.resolve().then(c.bind(c, 59732)), "/home/paulo_rosado/MyPokeBinder/src/app/not-found.tsx"],
                            forbidden: [() => Promise.resolve().then(c.t.bind(c, 90461, 23)), "next/dist/client/components/builtin/forbidden.js"],
                            unauthorized: [() => Promise.resolve().then(c.t.bind(c, 32768, 23)), "next/dist/client/components/builtin/unauthorized.js"],
                        },
                    ],
                    J = ["/home/paulo_rosado/MyPokeBinder/src/app/page.tsx"],
                    K = { require: c, loadChunk: () => Promise.resolve() },
                    L = new d.AppPageRouteModule({ definition: { kind: e.RouteKind.APP_PAGE, page: "/page", pathname: "/", bundlePath: "", filename: "", appPaths: [] }, userland: { loaderTree: I }, distDir: ".next", relativeProjectDir: "" });
                async function M(a, b, d) {
                    var D;
                    let H = "/page";
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
            82382: (a, b, c) => {
                "use strict";
                (c.d(b, { B_: () => k, DS: () => f, Q4: () => i, SJ: () => l, Wn: () => e, h4: () => g, lz: () => h, s2: () => d, vf: () => j }), c(37108));
                let d = 650,
                    e = 0.65,
                    f = 320,
                    g = 384,
                    h = 560,
                    i = 480,
                    j = 676,
                    k = 56,
                    l = 999999;
            },
            86420: (a, b, c) => {
                (Promise.resolve().then(c.bind(c, 19876)), Promise.resolve().then(c.bind(c, 56140)));
            },
            86439: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/no-fallback-error.external");
            },
            93178: (a, b, c) => {
                "use strict";
                c.d(b, { l: () => i });
                var d = c(21124),
                    e = c(24515),
                    f = c(46313),
                    g = c(40029),
                    h = c(37108);
                function i({ name: a, coverTheme: b, coverPokemonDexId: c = null, className: i = "", back: j = !1 }) {
                    let k = (0, g.v)(b);
                    return (0, d.jsxs)("div", {
                        className: `relative isolate flex aspect-[480/676] min-h-0 w-full flex-col overflow-hidden rounded-[inherit] border border-white/[0.14] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_0_42px_rgba(0,0,0,0.58)] ${i}`,
                        style: { backgroundColor: k.primaryColor, backgroundImage: `radial-gradient(circle at 12% 8%, rgba(255,255,255,0.2), transparent 24%), radial-gradient(circle at 88% 95%, rgba(0,0,0,0.62), transparent 42%), repeating-linear-gradient(112deg, rgba(255,255,255,0.055) 0 1px, transparent 1px 5px), linear-gradient(145deg, ${k.primaryColor} 0%, #11131a 58%, #07090d 100%)`, containerType: "inline-size" },
                        children: [
                            (0, d.jsx)("div", { className: "pointer-events-none absolute inset-[1.1%] rounded-[inherit] border border-white/[0.13]" }),
                            (0, d.jsx)("div", { className: "pointer-events-none absolute top-0 right-[17%] bottom-0 w-px bg-black/35 shadow-[1px_0_rgba(255,255,255,0.12)]" }),
                            (0, d.jsx)("div", { className: "pointer-events-none absolute top-0 right-[17%] bottom-0 w-[7%] translate-x-1/2 bg-gradient-to-l from-black/30 to-transparent blur-md" }),
                            (0, d.jsxs)("div", {
                                className: "relative flex h-full min-h-0 flex-col p-[6%]",
                                children: [
                                    (0, d.jsxs)("div", { className: "flex items-center justify-between gap-2", children: [(0, d.jsx)("span", {}), !j && (0, d.jsx)(f.z, { ballType: k.ballType, size: 100, className: "h-auto w-[9%]" })] }),
                                    (0, d.jsxs)("div", {
                                        className: "relative flex min-h-0 flex-1 flex-col items-center justify-center py-[3%] text-center",
                                        children: [
                                            !j && c
                                                ? (0, d.jsx)("div", { className: "relative flex aspect-square w-[48%] items-center justify-center rounded-full border border-white/25 bg-black/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_12px_30px_rgba(0,0,0,0.28)]", children: (0, d.jsx)(e.default, { src: (0, h.AU)(c), alt: "", width: 320, height: 320, unoptimized: !0, className: "h-[92%] w-[92%] object-contain drop-shadow-[0_6px_8px_rgba(0,0,0,0.56)] [image-rendering:pixelated]" }) })
                                                : j
                                                  ? null
                                                  : (0, d.jsx)(f.z, { ballType: k.ballType, size: 320, className: "h-auto w-[27%] opacity-80" }),
                                            !j && (0, d.jsx)("div", { className: "mt-[4%] w-full px-[4%]", children: (0, d.jsx)("h2", { className: "max-w-full break-words font-black leading-tight uppercase text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)]", style: { fontSize: "clamp(0.7rem, 5cqw, 1.5rem)" }, children: a }) }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    });
                }
            },
        }));
    var b = require("../webpack-runtime.js");
    b.C(a);
    var c = b.X(0, [8301, 991, 582, 708, 7633, 8139, 1160, 6849, 1072, 1678], () => b((b.s = 80663)));
    module.exports = c;
})();
