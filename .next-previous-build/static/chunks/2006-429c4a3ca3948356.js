"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [2006],
    {
        2180: (e, a, r) => {
            r.d(a, { Ig: () => n, KY: () => v, LQ: () => h, SI: () => u, VY: () => g, a: () => f, ay: () => b, ej: () => o, rM: () => d, tF: () => p, xJ: () => i });
            var t = r(4059),
                l = r(6937),
                s = r(6371);
            let i = 36,
                n = "all",
                o = "all",
                c = [...l.GS].sort((e, a) => a.name.length - e.name.length);
            function d(e) {
                let a = new Map();
                for (let r of e) {
                    let e = (0, t.qe)(r),
                        l = a.get(e);
                    l ? (l.copies.push(r), (l.totalCount += 1), (l.hasInBinder = l.hasInBinder || !!r.is_in_binder), r.is_in_binder && !l.card.is_in_binder && (l.card = r)) : a.set(e, { key: e, card: r, copies: [r], totalCount: 1, hasInBinder: !!r.is_in_binder });
                }
                return Array.from(a.values());
            }
            function u(e) {
                let a = new Map();
                for (let r of e) {
                    let e = (r || "").trim();
                    if (!e) continue;
                    let t = e.toLowerCase();
                    a.has(t) || a.set(t, e);
                }
                return [{ value: n, label: "Todas as expans\xf5es" }, ...[...a.values()].toSorted((e, a) => e.localeCompare(a, "en", { sensitivity: "base" })).map((e) => ({ value: e, label: e }))];
            }
            function b(e) {
                let a = new Map();
                for (let r of e) {
                    let e = (r || "").trim();
                    if (!e) continue;
                    let t = e.toLowerCase();
                    a.has(t) || a.set(t, e);
                }
                return [{ value: o, label: "Todos os artistas" }, ...[...a.values()].toSorted((e, a) => e.localeCompare(a, "en", { sensitivity: "base" })).map((e) => ({ value: e, label: e }))];
            }
            function m(e) {
                let a = e.tcgdex_card_id || e.id || "",
                    r = a.lastIndexOf("-");
                return -1 !== r && r < a.length - 1 ? a.slice(r + 1) : a;
            }
            function h(e) {
                let a = e.trim();
                if (!a.startsWith("#")) return null;
                let r = a.replace(/^#\s*/, "");
                if (!r) return null;
                let t = parseInt(r, 10);
                return !isNaN(t) && t >= 1 && t <= 1025 ? t : null;
            }
            function x(e, a) {
                if (!e) return !1;
                let r = e.trim().toLowerCase();
                if (!r) return !1;
                let t = a.trim().toLowerCase();
                if (!t || t.startsWith("#")) return !1;
                let l = t,
                    s = t.match(/\(([^)]+)\)/);
                if (s) {
                    let e = s[1].trim();
                    if (!/^[a-z]{0,4}\d+[a-z]?$/.test(e)) return !1;
                    l = e;
                } else if (t.includes("/")) {
                    let e = t.indexOf("/"),
                        a = t.slice(0, e).trim(),
                        r = t.slice(e + 1).trim();
                    if (!a || !r) return !1;
                    let s = /^[a-z]{0,4}\d+[a-z]?$/.test(a),
                        i = /^[a-z]{0,4}\d+[a-z]?$/.test(r);
                    if (s && i) l = a;
                    else {
                        if (s || !i) return !1;
                        l = r;
                    }
                }
                if (!l) return !1;
                if (r === l) return !0;
                let i = parseInt(r, 10),
                    n = parseInt(l, 10);
                return (!(isNaN(i) || isNaN(n)) && i === n) || r.replace(/([a-z]+)0+(\d+)/, "$1$2") === l.replace(/([a-z]+)0+(\d+)/, "$1$2");
            }
            function v(e, a) {
                let r = a.trim().toLowerCase();
                if (!r) return !0;
                let t = e.card_name.toLowerCase().includes(r),
                    l = (e.card_set_name || "").toLowerCase().includes(r),
                    s = (e.card_artist || "").toLowerCase().includes(r),
                    i = h(r),
                    n = null !== i && null != e.pokemon_dex_id && e.pokemon_dex_id === i,
                    o = x(m(e), r);
                return t || l || s || n || o;
            }
            function g(e, a) {
                let { searchTerm: r, rarityFilter: t, expansionFilter: l, artistFilter: i, dexId: d } = a;
                return e.filter((e) => {
                    if (d && !(0, s.R)(e.name, d)) return !1;
                    if (r.trim()) {
                        let a = r.toLowerCase().trim(),
                            t = e.name.toLowerCase().includes(a),
                            l = (e.setName || "").toLowerCase().includes(a),
                            s = (e.artist || "").toLowerCase().includes(a),
                            i = h(a),
                            n = (function (e) {
                                let a = e.card_name || e.name || "";
                                if (!a) return null;
                                let r = a.toLowerCase(),
                                    t = c.find((e) => r.includes(e.name.toLowerCase()));
                                return t ? t.dexId : null;
                            })(e),
                            o = null !== i && (null !== n ? n === i : !e.name && void 0 !== d && d === i),
                            u = x(e.localId || m({ id: e.id }), a);
                        if (!t && !l && !s && !o && !u) return !1;
                    }
                    return (l === n || (e.setName || "") === l) && (!i || i === o || (e.artist || "") === i) && ("all" === t || !!(e.rarity || "").trim().toLowerCase().includes(t)) && !0;
                });
            }
            function f(e, a) {
                var r, t, l;
                let { searchTerm: s, statusFilter: i, languageFilter: c, rarityFilter: d, sortField: u, sortDirection: b } = a,
                    m = null != (r = a.expansionFilter) ? r : n,
                    h = null != (t = a.variantFilter) ? t : "all",
                    x = null != (l = a.artistFilter) ? l : o,
                    g = e.filter((e) => {
                        let a = e.card;
                        return (!s.trim() || !!v(a, s)) && ("in_binder" !== i || !!e.hasInBinder) && ("stored" !== i || !e.hasInBinder || 1 !== e.totalCount) && ("all" === c || a.card_language === c) && ("all" === h || a.card_variant === h) && (x === o || (a.card_artist || "") === x) && ("all" === d || !!(a.card_rarity || "").trim().toLowerCase().includes(d)) && (m === n || (a.card_set_name || "") === m);
                    });
                return (
                    g.sort((e, a) => {
                        if ("dex" === u) {
                            var r, t;
                            let l = null != (r = e.card.pokemon_dex_id) ? r : 99999,
                                s = null != (t = a.card.pokemon_dex_id) ? t : 99999;
                            return "asc" === b ? l - s : s - l;
                        }
                        if ("name" === u) return "asc" === b ? e.card.card_name.localeCompare(a.card.card_name) : a.card.card_name.localeCompare(e.card.card_name);
                        let l = new Date(e.card.created_at).getTime(),
                            s = new Date(a.card.created_at).getTime();
                        return "asc" === b ? l - s : s - l;
                    }),
                    g
                );
            }
            function p(e) {
                var a, r, t, l, s;
                return [e.searchTerm.trim().toLowerCase(), e.statusFilter, e.languageFilter, e.rarityFilter, null != (a = e.expansionFilter) ? a : n, null != (r = e.variantFilter) ? r : "all", null != (t = e.artistFilter) ? t : o, null != (l = e.sortField) ? l : "", null != (s = e.sortDirection) ? s : ""].join("|");
            }
        },
        3166: (e, a, r) => {
            r.d(a, { z: () => s });
            var t = r(5155),
                l = r(2115);
            function s(e) {
                let { ballType: a = "pokeball", customColor: r = "#ef4444", size: s = 40, className: i = "", isActive: n = !1, style: o } = e,
                    c = "grad-bottom-".concat(a, "-").concat((0, l.useId)().replaceAll(":", "")),
                    d = "custom" === a ? r : "greatball" === a ? "#3b82f6" : "ultraball" === a ? "#f59e0b" : "masterball" === a ? "#ec4899" : "safariball" === a ? "#10b981" : "loveball" === a ? "#ec4899" : "quickball" === a ? "#0ea5e9" : "duskball" === a ? "#14b8a6" : "luxuryball" === a ? "#eab308" : r || "#ef4444",
                    u = n ? "drop-shadow(0 0 10px ".concat(d, ")") : "drop-shadow(0 2px 5px rgba(0,0,0,0.4))";
                return (0, t.jsxs)("svg", {
                    viewBox: "0 0 100 100",
                    width: s,
                    height: s,
                    className: "shrink-0 select-none overflow-visible ".concat(i),
                    style: { colorScheme: "only light", forcedColorAdjust: "none", WebkitForcedColorAdjust: "none", filter: u, ...o },
                    children: [
                        (0, t.jsx)("defs", { children: (0, t.jsxs)("linearGradient", { id: c, x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [(0, t.jsx)("stop", { offset: "0%", stopColor: "#ffffff" }), (0, t.jsx)("stop", { offset: "100%", stopColor: "#cbd5e1" })] }) }),
                        (() => {
                            switch (a) {
                                case "greatball":
                                    return (0, t.jsxs)(t.Fragment, { children: [(0, t.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#3b82f6" }), (0, t.jsx)("path", { d: "M 22 24 C 28 32 30 42 30 50 L 38 50 C 38 40 35 28 28 17 Z", fill: "#ef4444" }), (0, t.jsx)("path", { d: "M 78 24 C 72 32 70 42 70 50 L 62 50 C 62 40 65 28 72 17 Z", fill: "#ef4444" })] });
                                case "ultraball":
                                    return (0, t.jsxs)(t.Fragment, { children: [(0, t.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#1e293b" }), (0, t.jsx)("path", { d: "M 24 16 L 36 24 L 32 50 L 22 50 Z", fill: "#f59e0b" }), (0, t.jsx)("path", { d: "M 76 16 L 64 24 L 68 50 L 78 50 Z", fill: "#f59e0b" }), (0, t.jsx)("path", { d: "M 36 16 Q 50 10 64 16 L 62 23 Q 50 18 38 23 Z", fill: "#f59e0b" })] });
                                case "masterball":
                                    return (0, t.jsxs)(t.Fragment, { children: [(0, t.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#8b5cf6" }), (0, t.jsx)("ellipse", { cx: "28", cy: "30", rx: "9", ry: "8", fill: "#ec4899" }), (0, t.jsx)("ellipse", { cx: "72", cy: "30", rx: "9", ry: "8", fill: "#ec4899" }), (0, t.jsx)("path", { d: "M 43 28 L 47 18 L 50 23 L 53 18 L 57 28 L 54 28 L 52 22 L 50 26 L 48 22 L 46 28 Z", fill: "#ffffff" })] });
                                case "safariball":
                                    return (0, t.jsxs)(t.Fragment, { children: [(0, t.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#10b981" }), (0, t.jsx)("path", { d: "M 18 32 Q 28 20 42 26 Q 34 38 24 44 Z", fill: "#047857", opacity: "0.8" }), (0, t.jsx)("path", { d: "M 58 14 Q 72 18 78 30 Q 66 32 58 24 Z", fill: "#047857", opacity: "0.8" }), (0, t.jsx)("circle", { cx: "50", cy: "34", r: "7", fill: "#34d399", opacity: "0.8" })] });
                                case "loveball":
                                    return (0, t.jsxs)(t.Fragment, { children: [(0, t.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#ec4899" }), (0, t.jsx)("path", { d: "M 50 36 C 47 30 40 30 40 24 C 40 19 45 17 50 22 C 55 17 60 19 60 24 C 60 30 53 30 50 36 Z", fill: "#ffffff" })] });
                                case "quickball":
                                    return (0, t.jsxs)(t.Fragment, { children: [(0, t.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#0ea5e9" }), (0, t.jsx)("path", { d: "M 50 6 L 56 22 L 68 22 L 58 32 L 64 48 L 50 38 L 36 48 L 42 32 L 32 22 L 44 22 Z", fill: "#facc15" })] });
                                case "duskball":
                                    return (0, t.jsxs)(t.Fragment, { children: [(0, t.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#1e293b" }), (0, t.jsx)("circle", { cx: "28", cy: "30", r: "9", fill: "#14b8a6" }), (0, t.jsx)("circle", { cx: "72", cy: "30", r: "9", fill: "#14b8a6" }), (0, t.jsx)("circle", { cx: "50", cy: "22", r: "7", fill: "#f97316" })] });
                                case "luxuryball":
                                    return (0, t.jsxs)(t.Fragment, { children: [(0, t.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#0f172a" }), (0, t.jsx)("path", { d: "M 20 20 Q 50 12 80 20 L 78 26 Q 50 18 22 26 Z", fill: "#eab308" }), (0, t.jsx)("path", { d: "M 24 32 Q 50 24 76 32 L 74 38 Q 50 30 26 38 Z", fill: "#f43f5e" })] });
                                case "custom":
                                    return (0, t.jsxs)(t.Fragment, { children: [(0, t.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: r }), (0, t.jsx)("ellipse", { cx: "32", cy: "24", rx: "14", ry: "6", fill: "#ffffff", opacity: "0.3", transform: "rotate(-20 32 24)" })] });
                                default:
                                    return (0, t.jsxs)(t.Fragment, { children: [(0, t.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: r || "#ef4444" }), (0, t.jsx)("ellipse", { cx: "32", cy: "24", rx: "14", ry: "6", fill: "#ffffff", opacity: "0.3", transform: "rotate(-20 32 24)" })] });
                            }
                        })(),
                        (0, t.jsx)("path", { d: "M 4 50 A 46 46 0 0 0 96 50 Z", fill: "url(#".concat(c, ")") }),
                        (0, t.jsx)("line", { x1: "4", y1: "50", x2: "96", y2: "50", stroke: "#0f172a", strokeWidth: "7" }),
                        (0, t.jsx)("circle", { cx: "50", cy: "50", r: "46", fill: "none", stroke: "#0f172a", strokeWidth: "6" }),
                        (0, t.jsx)("circle", { cx: "50", cy: "50", r: "16", fill: "#0f172a" }),
                        (0, t.jsx)("circle", { cx: "50", cy: "50", r: "10", fill: "#f8fafc" }),
                        (0, t.jsx)("circle", { cx: "50", cy: "50", r: "5", fill: d, className: n ? "animate-pulse" : "" }),
                    ],
                });
            }
        },
        4059: (e, a, r) => {
            r.d(a, { AI: () => d, FB: () => x, WE: () => v, ab: () => m, eY: () => h, qe: () => g, xV: () => b, ye: () => u });
            var t = r(2115),
                l = r(9051),
                s = r(5740),
                i = r(9559),
                n = r(6245),
                o = r(4133),
                c = r(6151);
            let d = [
                    {
                        value: "normal",
                        label: "Normal",
                        icon: t.createElement(l.A, { size: 13, strokeWidth: 2.25, className: "text-slate-300" }),
                        triggerClassName: "border-slate-500/40 bg-slate-500/15 text-slate-200 hover:border-slate-500/60 hover:bg-slate-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-slate-500/40 hover:bg-slate-500/15 hover:text-slate-100",
                        selectedClassName: "border-slate-500/50 bg-slate-500/25 font-bold text-slate-100 shadow-[0_0_10px_rgba(148,163,184,0.15)]",
                        checkClassName: "text-slate-200",
                    },
                    {
                        value: "holo",
                        label: "Foil",
                        icon: t.createElement(s.A, { size: 13, strokeWidth: 2.25, className: "text-amber-300" }),
                        triggerClassName: "border-amber-500/40 bg-amber-500/15 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.2)] hover:border-amber-500/60 hover:bg-amber-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-amber-500/40 hover:bg-amber-500/15 hover:text-amber-200",
                        selectedClassName: "border-amber-500/50 bg-amber-500/25 font-bold text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.3)]",
                        checkClassName: "text-amber-300",
                    },
                    {
                        value: "reverse",
                        label: "Reverse Foil",
                        icon: t.createElement(i.A, { size: 13, strokeWidth: 2.25, className: "text-cyan-300" }),
                        triggerClassName: "border-cyan-500/40 bg-cyan-500/15 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.2)] hover:border-cyan-500/60 hover:bg-cyan-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-cyan-500/40 hover:bg-cyan-500/15 hover:text-cyan-200",
                        selectedClassName: "border-cyan-500/50 bg-cyan-500/25 font-bold text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.3)]",
                        checkClassName: "text-cyan-300",
                    },
                ],
                u = [
                    { value: "all", label: "Todas as vers\xf5es" },
                    {
                        value: "normal",
                        label: "Normal",
                        icon: t.createElement(l.A, { size: 13, strokeWidth: 2.25, className: "text-slate-300" }),
                        triggerClassName: "border-slate-500/40 bg-slate-500/15 text-slate-200 hover:border-slate-500/60 hover:bg-slate-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-slate-500/40 hover:bg-slate-500/15 hover:text-slate-100",
                        selectedClassName: "border-slate-500/50 bg-slate-500/25 font-bold text-slate-100 shadow-[0_0_10px_rgba(148,163,184,0.15)]",
                        checkClassName: "text-slate-200",
                    },
                    {
                        value: "holo",
                        label: "Foil",
                        icon: t.createElement(s.A, { size: 13, strokeWidth: 2.25, className: "text-amber-300" }),
                        triggerClassName: "border-amber-500/40 bg-amber-500/15 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.2)] hover:border-amber-500/60 hover:bg-amber-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-amber-500/40 hover:bg-amber-500/15 hover:text-amber-200",
                        selectedClassName: "border-amber-500/50 bg-amber-500/25 font-bold text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.3)]",
                        checkClassName: "text-amber-300",
                    },
                    {
                        value: "reverse",
                        label: "Reverse Foil",
                        icon: t.createElement(i.A, { size: 13, strokeWidth: 2.25, className: "text-cyan-300" }),
                        triggerClassName: "border-cyan-500/40 bg-cyan-500/15 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.2)] hover:border-cyan-500/60 hover:bg-cyan-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-cyan-500/40 hover:bg-cyan-500/15 hover:text-cyan-200",
                        selectedClassName: "border-cyan-500/50 bg-cyan-500/25 font-bold text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.3)]",
                        checkClassName: "text-cyan-300",
                    },
                ],
                b = [
                    { value: "normal", label: "Normal", icon: t.createElement(l.A, { size: 11, strokeWidth: 2.25 }), indicatorClassName: "border-slate-400/50 bg-slate-400/20 shadow-[0_0_12px_rgba(148,163,184,0.25)]", activeClassName: "text-slate-100 font-bold", activeIconClassName: "text-slate-200", inactiveIconClassName: "text-slate-400" },
                    { value: "holo", label: "Foil", icon: t.createElement(s.A, { size: 11, strokeWidth: 2.25 }), indicatorClassName: "border-amber-400/60 bg-amber-500/25 shadow-[0_0_14px_rgba(245,158,11,0.35)]", activeClassName: "text-amber-200 font-bold", activeIconClassName: "text-amber-300", inactiveIconClassName: "text-amber-400/70" },
                    { value: "reverse", label: "Reverse Foil", icon: t.createElement(i.A, { size: 11, strokeWidth: 2.25 }), indicatorClassName: "border-cyan-400/60 bg-cyan-500/25 shadow-[0_0_14px_rgba(6,182,212,0.35)]", activeClassName: "text-cyan-200 font-bold", activeIconClassName: "text-cyan-300", inactiveIconClassName: "text-cyan-400/70" },
                ],
                m = ["normal", "holo", "reverse"];
            function h(e) {
                return "normal" === e || "holo" === e || "reverse" === e;
            }
            function x(e) {
                return "holo" === e ? "Foil" : "reverse" === e ? "Reverse Foil" : "Normal";
            }
            function v(e, a, r, t) {
                return void 0 === r || (0, o.ij)(r) ? ((0, n.i7)(a, t) ? "prismatic" : "holo" === e ? "holo" : "reverse" === e ? "foil" : "none") : "none";
            }
            function g(e) {
                let a = h(e.card_variant) ? e.card_variant : "normal",
                    r = (0, c.C6)(e.card_condition) ? e.card_condition : "NM";
                return "".concat(e.tcgdex_card_id, "_").concat(e.card_language, "_").concat(a, "_").concat(r);
            }
        },
        4133: (e, a, r) => {
            r.d(a, { HO: () => l, ij: () => s });
            let t = "/pokemon-card-back.png";
            function l(e) {
                let a = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "high";
                if (!e || "string" != typeof e) return t;
                let r = e.trim();
                if (!r) return t;
                if (r.startsWith("/") || r.endsWith(".webp") || r.endsWith(".png") || r.endsWith(".jpg") || r.endsWith(".jpeg")) return r;
                let l = r.replace(/\/+$/, "");
                return "".concat(l, "/").concat(a, ".webp");
            }
            function s(e) {
                if (!e || "string" != typeof e) return !1;
                let a = e.trim();
                return !(!a || a === t || a.includes("pokemon-card-back") || a.includes("tcg-card-back"));
            }
        },
        4303: (e, a, r) => {
            r.d(a, { i: () => n });
            var t = r(5155),
                l = r(2115),
                s = r(1013),
                i = r(3166);
            function n(e) {
                let { size: a = "md", message: r, className: n = "", ballType: o, color: c } = e,
                    d = (0, l.useContext)(s.cm),
                    u = c || (null == d ? void 0 : d.themeColor) || "var(--theme-primary, #ef4444)",
                    b = o || (c ? (0, s.w2)(c) : (null == d ? void 0 : d.ballType) || "pokeball"),
                    m = { sm: { box: "w-8 h-8", px: 32 }, md: { box: "w-16 h-16", px: 64 }, lg: { box: "w-24 h-24", px: 96 } }[a];
                return (0, t.jsxs)("div", {
                    className: "flex flex-col items-center justify-center gap-3 ".concat(n),
                    children: [(0, t.jsx)("div", { className: "relative ".concat(m.box, " animate-pokeball-spin"), children: (0, t.jsx)(i.z, { ballType: b, customColor: u, size: m.px, style: { filter: "drop-shadow(0 0 14px var(--theme-primary-glow))" }, className: "overflow-visible" }) }), r && (0, t.jsx)("p", { className: "text-sm font-medium tracking-wide text-slate-300 animate-pulse", children: r })],
                });
            }
        },
        6151: (e, a, r) => {
            r.d(a, { C6: () => i, Ey: () => c, Fx: () => d, P2: () => n, kF: () => o });
            var t = r(2115),
                l = r(6907),
                s = r(7801);
            function i(e) {
                return "M" === e || "NM" === e || "SP" === e || "MP" === e || "HP" === e || "D" === e;
            }
            function n(e) {
                switch (e) {
                    case "M":
                        return "Mint (M)";
                    case "NM":
                    default:
                        return "Near Mint (NM)";
                    case "SP":
                        return "Slightly Played (SP)";
                    case "MP":
                        return "Moderately Played (MP)";
                    case "HP":
                        return "Heavily Played (HP)";
                    case "D":
                        return "Damaged (D)";
                }
            }
            function o(e) {
                switch (i(e) ? e : "NM") {
                    case "M":
                        return { code: "M", label: "M", fullLabel: "Mint", badgeClasses: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.15)]", iconType: "check" };
                    case "NM":
                        return { code: "NM", label: "NM", fullLabel: "Near Mint", badgeClasses: "border-lime-500/40 bg-lime-500/15 text-lime-300 shadow-[0_0_8px_rgba(132,204,22,0.15)]", iconType: "check" };
                    case "SP":
                        return { code: "SP", label: "SP", fullLabel: "Slightly Played", badgeClasses: "border-yellow-500/40 bg-yellow-500/15 text-yellow-300 shadow-[0_0_8px_rgba(234,179,8,0.15)]", iconType: "check" };
                    case "MP":
                        return { code: "MP", label: "MP", fullLabel: "Moderately Played", badgeClasses: "border-amber-500/40 bg-amber-500/15 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.15)]", iconType: "alert" };
                    case "HP":
                        return { code: "HP", label: "HP", fullLabel: "Heavily Played", badgeClasses: "border-orange-500/40 bg-orange-500/15 text-orange-300 shadow-[0_0_8px_rgba(249,115,22,0.15)]", iconType: "alert" };
                    case "D":
                        return { code: "D", label: "D", fullLabel: "Damaged", badgeClasses: "border-rose-500/40 bg-rose-500/15 text-rose-300 shadow-[0_0_8px_rgba(244,63,94,0.15)]", iconType: "alert" };
                }
            }
            let c = [
                    {
                        value: "M",
                        label: "Mint (M)",
                        icon: t.createElement(l.A, { size: 13, className: "text-emerald-300" }),
                        triggerClassName: "border-emerald-500/40 bg-emerald-500/15 text-emerald-200 hover:border-emerald-500/60 hover:bg-emerald-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-emerald-500/40 hover:bg-emerald-500/15 hover:text-emerald-200",
                        selectedClassName: "border-emerald-500/50 bg-emerald-500/25 font-bold text-emerald-200 shadow-[0_0_10px_rgba(16,185,129,0.2)]",
                        checkClassName: "text-emerald-300",
                    },
                    {
                        value: "NM",
                        label: "Near Mint (NM)",
                        icon: t.createElement(l.A, { size: 13, className: "text-lime-300" }),
                        triggerClassName: "border-lime-500/40 bg-lime-500/15 text-lime-200 hover:border-lime-500/60 hover:bg-lime-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-lime-500/40 hover:bg-lime-500/15 hover:text-lime-200",
                        selectedClassName: "border-lime-500/50 bg-lime-500/25 font-bold text-lime-200 shadow-[0_0_10px_rgba(132,204,22,0.2)]",
                        checkClassName: "text-lime-300",
                    },
                    {
                        value: "SP",
                        label: "Slightly Played (SP)",
                        icon: t.createElement(l.A, { size: 13, className: "text-yellow-300" }),
                        triggerClassName: "border-yellow-500/40 bg-yellow-500/15 text-yellow-200 hover:border-yellow-500/60 hover:bg-yellow-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-yellow-500/40 hover:bg-yellow-500/15 hover:text-yellow-200",
                        selectedClassName: "border-yellow-500/50 bg-yellow-500/25 font-bold text-yellow-200 shadow-[0_0_10px_rgba(234,179,8,0.2)]",
                        checkClassName: "text-yellow-300",
                    },
                    {
                        value: "MP",
                        label: "Moderately Played (MP)",
                        icon: t.createElement(s.A, { size: 13, className: "text-amber-300" }),
                        triggerClassName: "border-amber-500/40 bg-amber-500/15 text-amber-200 hover:border-amber-500/60 hover:bg-amber-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-amber-500/40 hover:bg-amber-500/15 hover:text-amber-200",
                        selectedClassName: "border-amber-500/50 bg-amber-500/25 font-bold text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.2)]",
                        checkClassName: "text-amber-300",
                    },
                    {
                        value: "HP",
                        label: "Heavily Played (HP)",
                        icon: t.createElement(s.A, { size: 13, className: "text-orange-300" }),
                        triggerClassName: "border-orange-500/40 bg-orange-500/15 text-orange-200 hover:border-orange-500/60 hover:bg-orange-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-orange-500/40 hover:bg-orange-500/15 hover:text-orange-200",
                        selectedClassName: "border-orange-500/50 bg-orange-500/25 font-bold text-orange-200 shadow-[0_0_10px_rgba(249,115,22,0.2)]",
                        checkClassName: "text-orange-300",
                    },
                    {
                        value: "D",
                        label: "Damaged (D)",
                        icon: t.createElement(s.A, { size: 13, className: "text-rose-300" }),
                        triggerClassName: "border-rose-500/40 bg-rose-500/15 text-rose-200 hover:border-rose-500/60 hover:bg-rose-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-rose-500/40 hover:bg-rose-500/15 hover:text-rose-200",
                        selectedClassName: "border-rose-500/50 bg-rose-500/25 font-bold text-rose-200 shadow-[0_0_10px_rgba(244,63,94,0.2)]",
                        checkClassName: "text-rose-300",
                    },
                ],
                d = [
                    { value: "M", label: "M", title: "Mint", icon: t.createElement(l.A, { size: 11, strokeWidth: 2.25 }), indicatorClassName: "border-emerald-400/60 bg-emerald-500/25 shadow-[0_0_12px_rgba(16,185,129,0.3)]", activeClassName: "text-emerald-200 font-bold", activeIconClassName: "text-emerald-300", inactiveIconClassName: "text-emerald-400/70" },
                    { value: "NM", label: "NM", title: "Near Mint", icon: t.createElement(l.A, { size: 11, strokeWidth: 2.25 }), indicatorClassName: "border-lime-400/60 bg-lime-500/25 shadow-[0_0_12px_rgba(132,204,22,0.3)]", activeClassName: "text-lime-200 font-bold", activeIconClassName: "text-lime-300", inactiveIconClassName: "text-lime-400/70" },
                    { value: "SP", label: "SP", title: "Slightly Played", icon: t.createElement(l.A, { size: 11, strokeWidth: 2.25 }), indicatorClassName: "border-yellow-400/60 bg-yellow-500/25 shadow-[0_0_12px_rgba(234,179,8,0.3)]", activeClassName: "text-yellow-200 font-bold", activeIconClassName: "text-yellow-300", inactiveIconClassName: "text-yellow-400/70" },
                    { value: "MP", label: "MP", title: "Moderately Played", icon: t.createElement(s.A, { size: 11, strokeWidth: 2.25 }), indicatorClassName: "border-amber-400/60 bg-amber-500/25 shadow-[0_0_12px_rgba(245,158,11,0.3)]", activeClassName: "text-amber-200 font-bold", activeIconClassName: "text-amber-300", inactiveIconClassName: "text-amber-400/70" },
                    { value: "HP", label: "HP", title: "Heavily Played", icon: t.createElement(s.A, { size: 11, strokeWidth: 2.25 }), indicatorClassName: "border-orange-400/60 bg-orange-500/25 shadow-[0_0_12px_rgba(249,115,22,0.3)]", activeClassName: "text-orange-200 font-bold", activeIconClassName: "text-orange-300", inactiveIconClassName: "text-orange-400/70" },
                    { value: "D", label: "D", title: "Damaged", icon: t.createElement(s.A, { size: 11, strokeWidth: 2.25 }), indicatorClassName: "border-rose-400/60 bg-rose-500/25 shadow-[0_0_12px_rgba(244,63,94,0.3)]", activeClassName: "text-rose-200 font-bold", activeIconClassName: "text-rose-300", inactiveIconClassName: "text-rose-400/70" },
                ];
        },
        6245: (e, a, r) => {
            function t(e, a) {
                let r = !!(e && "string" == typeof e && e.trim()),
                    t = !!(a && "string" == typeof a && a.trim());
                if (!r && !t) return 0;
                let l = r ? e.trim().toLowerCase() : "",
                    s = t ? a.trim().toLowerCase() : "";
                return l.includes("special illustration rare") || l.includes("ilustra\xe7\xe3o rara especial") || l.includes("hyper rare") || l.includes("hiper-rara") || l.includes("rara hiper") || l.includes("secret rare") || l.includes("rara secreta")
                    ? 3
                    : l.includes("illustration rare") ||
                        l.includes("ilustra\xe7\xe3o rara") ||
                        l.includes("ultra rare") ||
                        l.includes("rara ultra") ||
                        l.includes("full art trainer") ||
                        l.includes("shiny ultra rare") ||
                        l.includes("rara ultra brilhante") ||
                        l.includes("shiny rare vmax") ||
                        l.includes("vmax") ||
                        l.includes("vstar") ||
                        l.includes("v-union") ||
                        l.includes("vunion") ||
                        l.includes("rare holo v") ||
                        l.includes("rare v") ||
                        l.includes("rara v") ||
                        l.includes("rara holo v") ||
                        l.includes("holo v") ||
                        /\b(v|vmax|vstar|v-union|vunion)\b/i.test(l) ||
                        (t && /\b(v|vmax|vstar|v-union|vunion)\b/i.test(s))
                      ? 2
                      : l.includes("double rare") || l.includes("rara dupla")
                        ? 1
                        : 0;
            }
            function l(e, a) {
                let r = !!(e && "string" == typeof e && e.trim()),
                    t = !!(a && "string" == typeof a && a.trim());
                if (!r && !t) return !1;
                let l = r ? e.trim().toLowerCase() : "",
                    s = t ? a.trim().toLowerCase() : "";
                return !!(
                    (r &&
                        (l.includes("illustration rare") ||
                            l.includes("ilustra\xe7\xe3o rara") ||
                            l.includes("ultra rare") ||
                            l.includes("rara ultra") ||
                            l.includes("rare ultra") ||
                            l.includes("double rare") ||
                            l.includes("rara dupla") ||
                            l.includes("hyper rare") ||
                            l.includes("hiper-rara") ||
                            l.includes("rara hiper") ||
                            l.includes("secret rare") ||
                            l.includes("rara secreta") ||
                            l.includes("rare secret") ||
                            l.includes("rainbow") ||
                            l.includes("arco-\xedris") ||
                            l.includes("full art") ||
                            l.includes("arte expandida") ||
                            l.includes("arte completa") ||
                            l.includes("shiny ultra rare") ||
                            l.includes("rara ultra brilhante") ||
                            l.includes("brilhante rara ultra") ||
                            l.includes("shiny rare vmax") ||
                            l.includes("vmax") ||
                            l.includes("vstar") ||
                            l.includes("v-union") ||
                            l.includes("vunion") ||
                            l.includes("holo v") ||
                            l.includes("rare holo v") ||
                            l.includes("rare v") ||
                            l.includes("rara v") ||
                            l.includes("rara holo v") ||
                            l.includes("holo ex") ||
                            l.includes("rare holo ex") ||
                            l.includes("radiant") ||
                            l.includes("radiante") ||
                            l.includes("amazing") ||
                            l.includes("incr\xedvel") ||
                            l.includes("incrivel") ||
                            l.includes("ace spec") ||
                            /\b(v|vmax|vstar|v-union|vunion)\b/i.test(l))) ||
                    (t && /\b(v|vmax|vstar|v-union|vunion)\b/i.test(s))
                );
            }
            r.d(a, { OI: () => s, _I: () => i, i7: () => l, wM: () => t });
            let s = [
                { value: "all", label: "Todas as raridades" },
                { value: "special illustration rare", label: "Ilustra\xe7\xe3o Rara Especial" },
                { value: "illustration rare", label: "Ilustra\xe7\xe3o Rara" },
                { value: "hyper rare", label: "Hiper-rara" },
                { value: "secret rare", label: "Rara Secreta" },
                { value: "ultra rare", label: "Rara Ultra" },
                { value: "shiny ultra rare", label: "Rara Ultra Brilhante" },
                { value: "shiny rare", label: "Rara Brilhante" },
                { value: "double rare", label: "Rara Dupla" },
                { value: "radiant rare", label: "Rara Radiante" },
                { value: "amazing rare", label: "Rara Incr\xedvel" },
                { value: "holo rare", label: "Rara Hologr\xe1fica" },
                { value: "rare", label: "Rara" },
                { value: "uncommon", label: "Incomum" },
                { value: "common", label: "Comum" },
                { value: "promo", label: "Promocional" },
            ];
            function i(e, a) {
                let r = t(e, a),
                    s = (function (e) {
                        if (!e || "string" != typeof e || !e.trim()) return "Comum";
                        let a = e.trim(),
                            r = a.toLowerCase();
                        return r.includes("special illustration rare") || "ilustra\xe7\xe3o rara especial" === r
                            ? "Ilustra\xe7\xe3o Rara Especial"
                            : r.includes("illustration rare") || "ilustra\xe7\xe3o rara" === r
                              ? "Ilustra\xe7\xe3o Rara"
                              : r.includes("shiny ultra rare") || "rara ultra brilhante" === r || "brilhante rara ultra" === r
                                ? "Rara Ultra Brilhante"
                                : r.includes("shiny rare vmax") || "rara brilhante vmax" === r
                                  ? "Rara Brilhante VMAX"
                                  : (r.includes("shiny rare") || "rara brilhante" === r || "brilhante rara" === r) && !r.includes("ultra")
                                    ? "Rara Brilhante"
                                    : r.includes("hyper rare") || "hiper-rara" === r || "rara hiper" === r
                                      ? "Hiper-rara"
                                      : r.includes("secret rare") || "rara secreta" === r
                                        ? "Rara Secreta"
                                        : r.includes("full art trainer") || "treinador arte completa" === r
                                          ? "Treinador Arte Expandida"
                                          : r.includes("ultra rare") || "rara ultra" === r
                                            ? "Rara Ultra"
                                            : r.includes("double rare") || "rara dupla" === r
                                              ? "Rara Dupla"
                                              : r.includes("radiant") || "rara radiante" === r
                                                ? "Rara Radiante"
                                                : r.includes("amazing") || "rara incr\xedvel" === r || "incr\xedvel" === r
                                                  ? "Rara Incr\xedvel"
                                                  : r.includes("ace spec") || "rara ace spec" === r
                                                    ? "Rara ACE SPEC"
                                                    : "holo rare" === r || "rare holo" === r || r.includes("rara hologr\xe1fica") || r.includes("rara holografica")
                                                      ? "Rara Hologr\xe1fica"
                                                      : "rare" === r || "rara" === r
                                                        ? "Rara"
                                                        : "uncommon" === r || "incomum" === r
                                                          ? "Incomum"
                                                          : "common" === r || "comum" === r
                                                            ? "Comum"
                                                            : "promo" === r || r.includes("promotional") || "promocional" === r
                                                              ? "Promocional"
                                                              : a;
                    })(e),
                    i = l(e, a),
                    n = (e || "").trim().toLowerCase();
                return 3 === r
                    ? { badgeClasses: "border-amber-400/40 bg-amber-400/15 text-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.3)]", label: s, tier: r, isFullArt: i }
                    : 2 === r
                      ? { badgeClasses: "border-cyan-400/40 bg-cyan-400/15 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.25)]", label: s, tier: r, isFullArt: i }
                      : 1 === r || n.includes("holo") || n.includes("hologr\xe1fic") || n.includes("holografic") || n.includes("radiant") || n.includes("radiante") || n.includes("amazing") || n.includes("incr\xedvel") || n.includes("incrivel")
                        ? { badgeClasses: "border-purple-400/40 bg-purple-400/15 text-purple-300", label: s, tier: r, isFullArt: i }
                        : "rare" === n || "rara" === n
                          ? { badgeClasses: "border-sky-400/30 bg-sky-400/10 text-sky-300", label: s, tier: r, isFullArt: i }
                          : "uncommon" === n || "incomum" === n
                            ? { badgeClasses: "border-slate-400/30 bg-slate-400/10 text-slate-300", label: s, tier: r, isFullArt: i }
                            : { badgeClasses: "border-white/10 bg-white/5 text-slate-400", label: s, tier: r, isFullArt: i };
            }
        },
        6371: (e, a, r) => {
            r.d(a, { R: () => l });
            var t = r(6937);
            function l(e, a) {
                if (!e || "string" != typeof e) return !1;
                let r = e.trim();
                if (!r) return !1;
                if (151 === a) {
                    let e = r.replace(/mewtwo/gi, " ");
                    return /\bmew\b/i.test(e);
                }
                if (150 === a) return /\bmewtwo\b/i.test(r);
                if (16 === a) return /\bpidgey\b/i.test(r);
                if (17 === a) return /\bpidgeotto\b/i.test(r);
                if (18 === a) {
                    let e = r.replace(/pidgeotto/gi, " ");
                    return /\bpidgeot\b/i.test(e);
                }
                if (79 === a) return /\bslowpoke\b/i.test(r);
                if (80 === a) return /\bslowbro\b/i.test(r);
                if (29 === a) return !(/nidorino|nidoking|nidorina|nidoqueen/i.test(r) || /[♂]|male\b/i.test(r)) && /nidoran/i.test(r);
                if (32 === a) return !(/nidorina|nidoqueen|nidorino|nidoking/i.test(r) || /[♀]|female\b/i.test(r)) && /nidoran/i.test(r);
                let l = (0, t.Z3)(a);
                if (!l) return !0;
                let s = l.name.toLowerCase().replace(/[♀♂]/g, "").trim();
                if (s.includes("'") || s.includes("’")) {
                    let e = s.replace(/['’]/g, "");
                    return r.toLowerCase().replace(/['’]/g, "").includes(e);
                }
                if (s.includes(".")) {
                    let e = s.replace(/\./g, "");
                    return r.toLowerCase().replace(/\./g, "").includes(e);
                }
                return RegExp("\\b".concat(s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "\\b"), "i").test(r);
            }
        },
        7152: (e, a, r) => {
            r.d(a, { CV: () => h, GO: () => o, K_: () => m, PJ: () => u, Z$: () => x, _k: () => c, n9: () => b, sz: () => v, v1: () => g, vb: () => d });
            var t = r(4001),
                l = r(7016),
                s = r(2115),
                i = r(2180);
            let n = { dedupingInterval: 2e3, revalidateOnFocus: !1 },
                o = async (e) => {
                    let a = await fetch(e);
                    if (!a.ok) throw Error((await a.json().catch(() => ({}))).error || "Failed to fetch");
                    return a.json();
                };
            function c(e) {
                let {
                        data: a,
                        error: r,
                        size: t,
                        setSize: c,
                        isValidating: d,
                        mutate: u,
                    } = (0, l.Ay)(
                        (a, r) => {
                            if (r && !r.hasMore) return null;
                            let t = new URLSearchParams();
                            return (
                                t.set("grouped", "true"),
                                t.set("page", String(a + 1)),
                                t.set("limit", String(i.xJ)),
                                e.searchTerm.trim() && t.set("search", e.searchTerm.trim()),
                                "all" !== e.statusFilter && t.set("status", e.statusFilter),
                                "all" !== e.languageFilter && t.set("language", e.languageFilter),
                                "all" !== e.rarityFilter && t.set("rarity", e.rarityFilter),
                                e.expansionFilter && e.expansionFilter !== i.Ig && t.set("expansion", e.expansionFilter),
                                e.variantFilter && "all" !== e.variantFilter && t.set("variant", e.variantFilter),
                                e.artistFilter && e.artistFilter !== i.ej && t.set("artist", e.artistFilter),
                                t.set("sort", e.sortField),
                                t.set("direction", e.sortDirection),
                                "/api/cards?".concat(t.toString())
                            );
                        },
                        o,
                        { ...n, revalidateFirstPage: !1 },
                    ),
                    b = (0, s.useMemo)(() => (a ? a.flatMap((e) => e.groups) : []), [a]),
                    m = a ? a[a.length - 1] : void 0,
                    h = !!m && m.hasMore,
                    x = a && a[0] ? a[0].total : 0,
                    v = !a && !r,
                    g = v || (t > 0 && a && void 0 === a[t - 1]),
                    f = (0, s.useCallback)(() => {
                        !g && h && c((e) => e + 1);
                    }, [g, h, c]);
                return { groups: b, total: x, isLoading: v, isLoadingMore: g, isValidating: d, hasMore: h, loadMore: f, isError: r, mutate: u };
            }
            function d() {
                var e;
                let { data: a, error: r, isLoading: l, mutate: s } = (0, t.u)("/api/cards/expansions", o, { ...n, revalidateOnFocus: !1 });
                return { expansions: null != (e = null == a ? void 0 : a.expansions) ? e : [], isLoading: l, isError: r, mutate: s };
            }
            function u() {
                var e;
                let { data: a, error: r, isLoading: l, mutate: s } = (0, t.u)("/api/cards/artists", o, { ...n, revalidateOnFocus: !1 });
                return { artists: null != (e = null == a ? void 0 : a.artists) ? e : [], isLoading: l, isError: r, mutate: s };
            }
            function b(e, a) {
                let {
                        data: r,
                        error: t,
                        size: c,
                        setSize: d,
                        isValidating: u,
                        mutate: b,
                    } = (0, l.Ay)(
                        (r, t) => {
                            if (!e || (t && !t.hasMore)) return null;
                            let l = new URLSearchParams();
                            return (
                                l.set("page", String(r + 1)),
                                l.set("limit", String(i.xJ)),
                                a.searchTerm.trim() && l.set("search", a.searchTerm.trim()),
                                "all" !== a.statusFilter && l.set("status", a.statusFilter),
                                "all" !== a.languageFilter && l.set("language", a.languageFilter),
                                "all" !== a.rarityFilter && l.set("rarity", a.rarityFilter),
                                a.expansionFilter && a.expansionFilter !== i.Ig && l.set("expansion", a.expansionFilter),
                                a.variantFilter && "all" !== a.variantFilter && l.set("variant", a.variantFilter),
                                a.artistFilter && a.artistFilter !== i.ej && l.set("artist", a.artistFilter),
                                l.set("sort", a.sortField),
                                l.set("direction", a.sortDirection),
                                "/api/profile/".concat(encodeURIComponent(e), "/collection?").concat(l.toString())
                            );
                        },
                        o,
                        { ...n, revalidateFirstPage: !1 },
                    ),
                    m = (0, s.useMemo)(() => (r ? r.flatMap((e) => e.groups) : []), [r]),
                    h = r ? r[0] : void 0,
                    x = r ? r[r.length - 1] : void 0,
                    v = !!x && x.hasMore,
                    g = h ? h.total : 0,
                    f = h ? h.owner : void 0,
                    p = !!h && h.isOwner,
                    y = !r && !t,
                    _ = y || (c > 0 && r && void 0 === r[c - 1]),
                    C = (0, s.useCallback)(() => {
                        !_ && v && d((e) => e + 1);
                    }, [_, v, d]);
                return { groups: m, total: g, owner: f, isOwner: p, isLoading: y, isLoadingMore: _, isValidating: u, hasMore: v, loadMore: C, isError: t, mutate: b };
            }
            function m(e) {
                var a;
                let r = e ? "/api/profile/".concat(encodeURIComponent(e), "/expansions") : null,
                    { data: l, error: s, isLoading: i, mutate: c } = (0, t.u)(r, o, { ...n, revalidateOnFocus: !1 });
                return { expansions: null != (a = null == l ? void 0 : l.expansions) ? a : [], isLoading: i, isError: s, mutate: c };
            }
            function h(e) {
                var a;
                let r = e ? "/api/profile/".concat(encodeURIComponent(e), "/artists") : null,
                    { data: l, error: s, isLoading: i, mutate: c } = (0, t.u)(r, o, { ...n, revalidateOnFocus: !1 });
                return { artists: null != (a = null == l ? void 0 : l.artists) ? a : [], isLoading: i, isError: s, mutate: c };
            }
            function x(e) {
                var a;
                let r = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                    { data: l, error: s, isLoading: i, mutate: c } = (0, t.u)(e ? "/api/cards?pokemon_dex_id=".concat(e) : r ? "/api/cards" : null, o, n);
                return { cards: null != (a = null == l ? void 0 : l.cards) ? a : [], isLoading: i, isError: s, mutate: c };
            }
            function v(e) {
                var a, r, l, s;
                let { data: i, error: c, isLoading: d, mutate: u } = (0, t.u)(e ? "/api/cards/".concat(e) : null, o, n);
                return { card: null != (a = null == i ? void 0 : i.card) ? a : null, copies: null != (r = null == i ? void 0 : i.copies) ? r : [], availableVariants: null != (l = null == i ? void 0 : i.availableVariants) ? l : ["normal", "holo", "reverse"], allocation: null != (s = null == i ? void 0 : i.allocation) ? s : null, isLoading: d && !i, isError: c, mutate: u };
            }
            function g(e) {
                var a, r;
                let { data: l, error: s, isLoading: i, mutate: c } = (0, t.u)("/api/binders", o, { ...n, fallbackData: e, revalidateOnMount: !0 });
                return { binders: null != (r = null != (a = null == l ? void 0 : l.binders) ? a : null == e ? void 0 : e.binders) ? r : [], isLoading: i && !l, isError: s, mutate: c };
            }
        },
    },
]);
