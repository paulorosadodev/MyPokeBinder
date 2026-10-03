(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [7066, 8831, 8945, 9877],
    {
        741: (l, e, r) => {
            (Promise.resolve().then(r.t.bind(r, 2619, 23)), Promise.resolve().then(r.bind(r, 8591)));
        },
        8591: (l, e, r) => {
            "use strict";
            (r.r(e), r.d(e, { PokeballLogo: () => c }));
            var s = r(5155),
                a = r(2115),
                t = r(1013);
            let i = { xs: "w-6 h-6", sm: "w-8 h-8", md: "w-12 h-12", lg: "w-16 h-16", xl: "w-20 h-20" };
            function c(l) {
                let { size: e = "sm", className: r = "", animated: c = !1, glow: f = "normal", color: n, ballType: o } = l,
                    x = (0, a.useContext)(t.cm),
                    h = i[e],
                    d = o || (n ? (0, t.w2)(n) : (null == x ? void 0 : x.ballType) || "pokeball"),
                    p = n || "var(--theme-primary, #ef4444)",
                    j = n ? "color-mix(in srgb, ".concat(n, " 40%, transparent)") : "var(--theme-primary-glow, rgba(239, 68, 68, 0.4))",
                    m = n ? "color-mix(in srgb, ".concat(n, " 50%, transparent)") : "var(--theme-primary-glow, rgba(239, 68, 68, 0.5))";
                return (0, s.jsx)("div", {
                    className: "relative inline-flex items-center justify-center shrink-0 ".concat(h, " ").concat(r),
                    children: (0, s.jsxs)("svg", {
                        viewBox: "0 0 100 100",
                        width: "100%",
                        height: "100%",
                        style: { colorScheme: "only light", forcedColorAdjust: "none", WebkitForcedColorAdjust: "none", ...("subtle" === f ? { filter: "drop-shadow(0 0 6px ".concat(j, ")") } : "normal" === f ? { filter: "drop-shadow(0 0 12px ".concat(m, ")") } : void 0) },
                        className: "overflow-visible",
                        children: [
                            (() => {
                                switch (d) {
                                    case "greatball":
                                        return (0, s.jsxs)(s.Fragment, { children: [(0, s.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#3b82f6" }), (0, s.jsx)("path", { d: "M 22 24 C 28 32 30 42 30 50 L 38 50 C 38 40 35 28 28 17 Z", fill: "#ef4444" }), (0, s.jsx)("path", { d: "M 78 24 C 72 32 70 42 70 50 L 62 50 C 62 40 65 28 72 17 Z", fill: "#ef4444" })] });
                                    case "ultraball":
                                        return (0, s.jsxs)(s.Fragment, { children: [(0, s.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#1e293b" }), (0, s.jsx)("path", { d: "M 24 16 L 36 24 L 32 50 L 22 50 Z", fill: "#f59e0b" }), (0, s.jsx)("path", { d: "M 76 16 L 64 24 L 68 50 L 78 50 Z", fill: "#f59e0b" }), (0, s.jsx)("path", { d: "M 36 16 Q 50 10 64 16 L 62 23 Q 50 18 38 23 Z", fill: "#f59e0b" })] });
                                    case "masterball":
                                        return (0, s.jsxs)(s.Fragment, { children: [(0, s.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#8b5cf6" }), (0, s.jsx)("ellipse", { cx: "28", cy: "30", rx: "9", ry: "8", fill: "#ec4899" }), (0, s.jsx)("ellipse", { cx: "72", cy: "30", rx: "9", ry: "8", fill: "#ec4899" }), (0, s.jsx)("path", { d: "M 43 28 L 47 18 L 50 23 L 53 18 L 57 28 L 54 28 L 52 22 L 50 26 L 48 22 L 46 28 Z", fill: "#ffffff" })] });
                                    case "safariball":
                                        return (0, s.jsxs)(s.Fragment, { children: [(0, s.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#10b981" }), (0, s.jsx)("path", { d: "M 18 32 Q 28 20 42 26 Q 34 38 24 44 Z", fill: "#047857", opacity: "0.8" }), (0, s.jsx)("path", { d: "M 58 14 Q 72 18 78 30 Q 66 32 58 24 Z", fill: "#047857", opacity: "0.8" }), (0, s.jsx)("circle", { cx: "50", cy: "34", r: "7", fill: "#34d399", opacity: "0.8" })] });
                                    case "loveball":
                                        return (0, s.jsxs)(s.Fragment, { children: [(0, s.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#ec4899" }), (0, s.jsx)("path", { d: "M 50 36 C 47 30 40 30 40 24 C 40 19 45 17 50 22 C 55 17 60 19 60 24 C 60 30 53 30 50 36 Z", fill: "#ffffff" })] });
                                    default:
                                        return (0, s.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: p });
                                }
                            })(),
                            (0, s.jsx)("path", { d: "M 4 50 A 46 46 0 0 0 96 50 Z", fill: "#f8fafc" }),
                            (0, s.jsx)("line", { x1: "4", y1: "50", x2: "96", y2: "50", stroke: "#0f172a", strokeWidth: "8" }),
                            (0, s.jsx)("circle", { cx: "50", cy: "50", r: "46", fill: "none", stroke: "#0f172a", strokeWidth: "8" }),
                            (0, s.jsx)("circle", { cx: "50", cy: "50", r: "16", fill: "#0f172a" }),
                            (0, s.jsx)("circle", { cx: "50", cy: "50", r: "10", fill: "#f8fafc" }),
                            (0, s.jsx)("circle", { cx: "50", cy: "50", r: "5", fill: p, className: c ? "animate-pulse" : "" }),
                        ],
                    }),
                });
            }
        },
    },
    (l) => {
        (l.O(0, [5730, 235, 2619, 1013, 8441, 1255, 7358], () => l((l.s = 741))), (_N_E = l.O()));
    },
]);
