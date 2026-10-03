(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [6449, 8142],
    {
        3166: (l, e, s) => {
            "use strict";
            s.d(e, { z: () => r });
            var a = s(5155),
                t = s(2115);
            function r(l) {
                let { ballType: e = "pokeball", customColor: s = "#ef4444", size: r = 40, className: c = "", isActive: i = !1, style: f } = l,
                    x = "grad-bottom-".concat(e, "-").concat((0, t.useId)().replaceAll(":", "")),
                    n = "custom" === e ? s : "greatball" === e ? "#3b82f6" : "ultraball" === e ? "#f59e0b" : "masterball" === e ? "#ec4899" : "safariball" === e ? "#10b981" : "loveball" === e ? "#ec4899" : "quickball" === e ? "#0ea5e9" : "duskball" === e ? "#14b8a6" : "luxuryball" === e ? "#eab308" : s || "#ef4444",
                    o = i ? "drop-shadow(0 0 10px ".concat(n, ")") : "drop-shadow(0 2px 5px rgba(0,0,0,0.4))";
                return (0, a.jsxs)("svg", {
                    viewBox: "0 0 100 100",
                    width: r,
                    height: r,
                    className: "shrink-0 select-none overflow-visible ".concat(c),
                    style: { colorScheme: "only light", forcedColorAdjust: "none", WebkitForcedColorAdjust: "none", filter: o, ...f },
                    children: [
                        (0, a.jsx)("defs", { children: (0, a.jsxs)("linearGradient", { id: x, x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [(0, a.jsx)("stop", { offset: "0%", stopColor: "#ffffff" }), (0, a.jsx)("stop", { offset: "100%", stopColor: "#cbd5e1" })] }) }),
                        (() => {
                            switch (e) {
                                case "greatball":
                                    return (0, a.jsxs)(a.Fragment, { children: [(0, a.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#3b82f6" }), (0, a.jsx)("path", { d: "M 22 24 C 28 32 30 42 30 50 L 38 50 C 38 40 35 28 28 17 Z", fill: "#ef4444" }), (0, a.jsx)("path", { d: "M 78 24 C 72 32 70 42 70 50 L 62 50 C 62 40 65 28 72 17 Z", fill: "#ef4444" })] });
                                case "ultraball":
                                    return (0, a.jsxs)(a.Fragment, { children: [(0, a.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#1e293b" }), (0, a.jsx)("path", { d: "M 24 16 L 36 24 L 32 50 L 22 50 Z", fill: "#f59e0b" }), (0, a.jsx)("path", { d: "M 76 16 L 64 24 L 68 50 L 78 50 Z", fill: "#f59e0b" }), (0, a.jsx)("path", { d: "M 36 16 Q 50 10 64 16 L 62 23 Q 50 18 38 23 Z", fill: "#f59e0b" })] });
                                case "masterball":
                                    return (0, a.jsxs)(a.Fragment, { children: [(0, a.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#8b5cf6" }), (0, a.jsx)("ellipse", { cx: "28", cy: "30", rx: "9", ry: "8", fill: "#ec4899" }), (0, a.jsx)("ellipse", { cx: "72", cy: "30", rx: "9", ry: "8", fill: "#ec4899" }), (0, a.jsx)("path", { d: "M 43 28 L 47 18 L 50 23 L 53 18 L 57 28 L 54 28 L 52 22 L 50 26 L 48 22 L 46 28 Z", fill: "#ffffff" })] });
                                case "safariball":
                                    return (0, a.jsxs)(a.Fragment, { children: [(0, a.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#10b981" }), (0, a.jsx)("path", { d: "M 18 32 Q 28 20 42 26 Q 34 38 24 44 Z", fill: "#047857", opacity: "0.8" }), (0, a.jsx)("path", { d: "M 58 14 Q 72 18 78 30 Q 66 32 58 24 Z", fill: "#047857", opacity: "0.8" }), (0, a.jsx)("circle", { cx: "50", cy: "34", r: "7", fill: "#34d399", opacity: "0.8" })] });
                                case "loveball":
                                    return (0, a.jsxs)(a.Fragment, { children: [(0, a.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#ec4899" }), (0, a.jsx)("path", { d: "M 50 36 C 47 30 40 30 40 24 C 40 19 45 17 50 22 C 55 17 60 19 60 24 C 60 30 53 30 50 36 Z", fill: "#ffffff" })] });
                                case "quickball":
                                    return (0, a.jsxs)(a.Fragment, { children: [(0, a.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#0ea5e9" }), (0, a.jsx)("path", { d: "M 50 6 L 56 22 L 68 22 L 58 32 L 64 48 L 50 38 L 36 48 L 42 32 L 32 22 L 44 22 Z", fill: "#facc15" })] });
                                case "duskball":
                                    return (0, a.jsxs)(a.Fragment, { children: [(0, a.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#1e293b" }), (0, a.jsx)("circle", { cx: "28", cy: "30", r: "9", fill: "#14b8a6" }), (0, a.jsx)("circle", { cx: "72", cy: "30", r: "9", fill: "#14b8a6" }), (0, a.jsx)("circle", { cx: "50", cy: "22", r: "7", fill: "#f97316" })] });
                                case "luxuryball":
                                    return (0, a.jsxs)(a.Fragment, { children: [(0, a.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#0f172a" }), (0, a.jsx)("path", { d: "M 20 20 Q 50 12 80 20 L 78 26 Q 50 18 22 26 Z", fill: "#eab308" }), (0, a.jsx)("path", { d: "M 24 32 Q 50 24 76 32 L 74 38 Q 50 30 26 38 Z", fill: "#f43f5e" })] });
                                case "custom":
                                    return (0, a.jsxs)(a.Fragment, { children: [(0, a.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: s }), (0, a.jsx)("ellipse", { cx: "32", cy: "24", rx: "14", ry: "6", fill: "#ffffff", opacity: "0.3", transform: "rotate(-20 32 24)" })] });
                                default:
                                    return (0, a.jsxs)(a.Fragment, { children: [(0, a.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: s || "#ef4444" }), (0, a.jsx)("ellipse", { cx: "32", cy: "24", rx: "14", ry: "6", fill: "#ffffff", opacity: "0.3", transform: "rotate(-20 32 24)" })] });
                            }
                        })(),
                        (0, a.jsx)("path", { d: "M 4 50 A 46 46 0 0 0 96 50 Z", fill: "url(#".concat(x, ")") }),
                        (0, a.jsx)("line", { x1: "4", y1: "50", x2: "96", y2: "50", stroke: "#0f172a", strokeWidth: "7" }),
                        (0, a.jsx)("circle", { cx: "50", cy: "50", r: "46", fill: "none", stroke: "#0f172a", strokeWidth: "6" }),
                        (0, a.jsx)("circle", { cx: "50", cy: "50", r: "16", fill: "#0f172a" }),
                        (0, a.jsx)("circle", { cx: "50", cy: "50", r: "10", fill: "#f8fafc" }),
                        (0, a.jsx)("circle", { cx: "50", cy: "50", r: "5", fill: n, className: i ? "animate-pulse" : "" }),
                    ],
                });
            }
        },
        4303: (l, e, s) => {
            "use strict";
            s.d(e, { i: () => i });
            var a = s(5155),
                t = s(2115),
                r = s(1013),
                c = s(3166);
            function i(l) {
                let { size: e = "md", message: s, className: i = "", ballType: f, color: x } = l,
                    n = (0, t.useContext)(r.cm),
                    o = x || (null == n ? void 0 : n.themeColor) || "var(--theme-primary, #ef4444)",
                    d = f || (x ? (0, r.w2)(x) : (null == n ? void 0 : n.ballType) || "pokeball"),
                    p = { sm: { box: "w-8 h-8", px: 32 }, md: { box: "w-16 h-16", px: 64 }, lg: { box: "w-24 h-24", px: 96 } }[e];
                return (0, a.jsxs)("div", {
                    className: "flex flex-col items-center justify-center gap-3 ".concat(i),
                    children: [(0, a.jsx)("div", { className: "relative ".concat(p.box, " animate-pokeball-spin"), children: (0, a.jsx)(c.z, { ballType: d, customColor: o, size: p.px, style: { filter: "drop-shadow(0 0 14px var(--theme-primary-glow))" }, className: "overflow-visible" }) }), s && (0, a.jsx)("p", { className: "text-sm font-medium tracking-wide text-slate-300 animate-pulse", children: s })],
                });
            }
        },
        8978: (l, e, s) => {
            Promise.resolve().then(s.bind(s, 9900));
        },
        9900: (l, e, s) => {
            "use strict";
            s.d(e, { RouteLoading: () => r });
            var a = s(5155),
                t = s(4303);
            function r(l) {
                let { message: e = "Carregando...", className: s } = l;
                return (0, a.jsx)("main", { className: s || "flex flex-1 items-start justify-center pt-10 sm:pt-14 md:pt-18 pb-16", children: (0, a.jsx)(t.i, { message: e, size: "lg" }) });
            }
        },
    },
    (l) => {
        (l.O(0, [5730, 235, 1013, 8441, 1255, 7358], () => l((l.s = 8978))), (_N_E = l.O()));
    },
]);
