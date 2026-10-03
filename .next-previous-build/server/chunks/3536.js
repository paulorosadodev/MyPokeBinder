"use strict";
((exports.id = 3536),
    (exports.ids = [3536]),
    (exports.modules = {
        22842: (a, b, c) => {
            c.d(b, { A: () => d });
            let d = (0, c(23339).A)("Lock", [
                ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
                ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }],
            ]);
        },
        27616: (a, b, c) => {
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
        40029: (a, b, c) => {
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
        42593: (a, b, c) => {
            c.d(b, { v: () => e });
            var d = c(38301);
            function e(a) {
                let [b, c] = (0, d.useState)(a),
                    [e, f] = (0, d.useState)(a ? "opening" : "closed");
                return { isPresent: b, state: e };
            }
        },
        46313: (a, b, c) => {
            c.d(b, { z: () => f });
            var d = c(21124),
                e = c(38301);
            function f({ ballType: a = "pokeball", customColor: b = "#ef4444", size: c = 40, className: f = "", isActive: g = !1, style: h }) {
                let i = `grad-bottom-${a}-${(0, e.useId)().replaceAll(":", "")}`,
                    j = "custom" === a ? b : "greatball" === a ? "#3b82f6" : "ultraball" === a ? "#f59e0b" : "masterball" === a ? "#ec4899" : "safariball" === a ? "#10b981" : "loveball" === a ? "#ec4899" : "quickball" === a ? "#0ea5e9" : "duskball" === a ? "#14b8a6" : "luxuryball" === a ? "#eab308" : b || "#ef4444",
                    k = g ? `drop-shadow(0 0 10px ${j})` : "drop-shadow(0 2px 5px rgba(0,0,0,0.4))";
                return (0, d.jsxs)("svg", {
                    viewBox: "0 0 100 100",
                    width: c,
                    height: c,
                    className: `shrink-0 select-none overflow-visible ${f}`,
                    style: { colorScheme: "only light", forcedColorAdjust: "none", WebkitForcedColorAdjust: "none", filter: k, ...h },
                    children: [
                        (0, d.jsx)("defs", { children: (0, d.jsxs)("linearGradient", { id: i, x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [(0, d.jsx)("stop", { offset: "0%", stopColor: "#ffffff" }), (0, d.jsx)("stop", { offset: "100%", stopColor: "#cbd5e1" })] }) }),
                        (() => {
                            switch (a) {
                                case "greatball":
                                    return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#3b82f6" }), (0, d.jsx)("path", { d: "M 22 24 C 28 32 30 42 30 50 L 38 50 C 38 40 35 28 28 17 Z", fill: "#ef4444" }), (0, d.jsx)("path", { d: "M 78 24 C 72 32 70 42 70 50 L 62 50 C 62 40 65 28 72 17 Z", fill: "#ef4444" })] });
                                case "ultraball":
                                    return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#1e293b" }), (0, d.jsx)("path", { d: "M 24 16 L 36 24 L 32 50 L 22 50 Z", fill: "#f59e0b" }), (0, d.jsx)("path", { d: "M 76 16 L 64 24 L 68 50 L 78 50 Z", fill: "#f59e0b" }), (0, d.jsx)("path", { d: "M 36 16 Q 50 10 64 16 L 62 23 Q 50 18 38 23 Z", fill: "#f59e0b" })] });
                                case "masterball":
                                    return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#8b5cf6" }), (0, d.jsx)("ellipse", { cx: "28", cy: "30", rx: "9", ry: "8", fill: "#ec4899" }), (0, d.jsx)("ellipse", { cx: "72", cy: "30", rx: "9", ry: "8", fill: "#ec4899" }), (0, d.jsx)("path", { d: "M 43 28 L 47 18 L 50 23 L 53 18 L 57 28 L 54 28 L 52 22 L 50 26 L 48 22 L 46 28 Z", fill: "#ffffff" })] });
                                case "safariball":
                                    return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#10b981" }), (0, d.jsx)("path", { d: "M 18 32 Q 28 20 42 26 Q 34 38 24 44 Z", fill: "#047857", opacity: "0.8" }), (0, d.jsx)("path", { d: "M 58 14 Q 72 18 78 30 Q 66 32 58 24 Z", fill: "#047857", opacity: "0.8" }), (0, d.jsx)("circle", { cx: "50", cy: "34", r: "7", fill: "#34d399", opacity: "0.8" })] });
                                case "loveball":
                                    return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#ec4899" }), (0, d.jsx)("path", { d: "M 50 36 C 47 30 40 30 40 24 C 40 19 45 17 50 22 C 55 17 60 19 60 24 C 60 30 53 30 50 36 Z", fill: "#ffffff" })] });
                                case "quickball":
                                    return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#0ea5e9" }), (0, d.jsx)("path", { d: "M 50 6 L 56 22 L 68 22 L 58 32 L 64 48 L 50 38 L 36 48 L 42 32 L 32 22 L 44 22 Z", fill: "#facc15" })] });
                                case "duskball":
                                    return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#1e293b" }), (0, d.jsx)("circle", { cx: "28", cy: "30", r: "9", fill: "#14b8a6" }), (0, d.jsx)("circle", { cx: "72", cy: "30", r: "9", fill: "#14b8a6" }), (0, d.jsx)("circle", { cx: "50", cy: "22", r: "7", fill: "#f97316" })] });
                                case "luxuryball":
                                    return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#0f172a" }), (0, d.jsx)("path", { d: "M 20 20 Q 50 12 80 20 L 78 26 Q 50 18 22 26 Z", fill: "#eab308" }), (0, d.jsx)("path", { d: "M 24 32 Q 50 24 76 32 L 74 38 Q 50 30 26 38 Z", fill: "#f43f5e" })] });
                                case "custom":
                                    return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: b }), (0, d.jsx)("ellipse", { cx: "32", cy: "24", rx: "14", ry: "6", fill: "#ffffff", opacity: "0.3", transform: "rotate(-20 32 24)" })] });
                                default:
                                    return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: b || "#ef4444" }), (0, d.jsx)("ellipse", { cx: "32", cy: "24", rx: "14", ry: "6", fill: "#ffffff", opacity: "0.3", transform: "rotate(-20 32 24)" })] });
                            }
                        })(),
                        (0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 0 96 50 Z", fill: `url(#${i})` }),
                        (0, d.jsx)("line", { x1: "4", y1: "50", x2: "96", y2: "50", stroke: "#0f172a", strokeWidth: "7" }),
                        (0, d.jsx)("circle", { cx: "50", cy: "50", r: "46", fill: "none", stroke: "#0f172a", strokeWidth: "6" }),
                        (0, d.jsx)("circle", { cx: "50", cy: "50", r: "16", fill: "#0f172a" }),
                        (0, d.jsx)("circle", { cx: "50", cy: "50", r: "10", fill: "#f8fafc" }),
                        (0, d.jsx)("circle", { cx: "50", cy: "50", r: "5", fill: j, className: g ? "animate-pulse" : "" }),
                    ],
                });
            }
        },
        51155: (a, b, c) => {
            c.d(b, { X: () => e });
            var d = c(38301);
            function e({ hasMore: a, isLoading: b = !1, onLoadMore: c, rootMargin: e = "200px", root: f = null, enabled: g = !0 }) {
                let h = (0, d.useRef)(null);
                return (((0, d.useRef)(c).current = c), h);
            }
        },
        51846: (a, b, c) => {
            c.d(b, { y: () => p });
            var d = c(21124),
                e = c(24515),
                f = c(47089),
                g = c(88285),
                h = c(71613);
            let i = (0, c(23339).A)("CircleOff", [
                ["path", { d: "m2 2 20 20", key: "1ooewy" }],
                ["path", { d: "M8.35 2.69A10 10 0 0 1 21.3 15.65", key: "1pfsoa" }],
                ["path", { d: "M19.08 19.08A10 10 0 1 1 4.92 4.92", key: "1ablyi" }],
            ]);
            var j = c(38301),
                k = c(37108);
            function l(a) {
                let b = a.trim().toLocaleLowerCase();
                if (!b) return k.VL;
                let c = b.match(/^#(\d{1,4})$/);
                if (c) {
                    let a = Number(c[1]);
                    return k.VL.filter((b) => b.dexId === a);
                }
                return b.startsWith("#") ? [] : k.VL.filter((a) => a.name.toLocaleLowerCase().includes(b));
            }
            var m = c(51155),
                n = c(76186),
                o = c(42593);
            function p({ value: a, onChange: b }) {
                let [c, p] = (0, j.useState)(!1),
                    [q, r] = (0, j.useState)(""),
                    [s, t] = (0, j.useState)(1),
                    [u, v] = (0, j.useState)(null);
                (0, n.m)(c, () => p(!1));
                let { isPresent: w, state: x } = (0, o.v)(c),
                    { pokemon: y, hasMore: z } = (0, j.useMemo)(
                        () =>
                            (function (a, b, c = 48) {
                                let d = Math.max(1, Math.trunc(b)),
                                    e = Math.max(1, Math.trunc(c)),
                                    f = l(a),
                                    g = f.slice(0, d * e);
                                return { pokemon: g, hasMore: g.length < f.length };
                            })(q, s, 48),
                        [s, q],
                    ),
                    A = a ? l(`#${a}`)[0] : null,
                    B = (a) => {
                        (b(a), p(!1));
                    },
                    C = (0, j.useCallback)(() => {
                        t((a) => a + 1);
                    }, []),
                    D = (0, m.X)({ hasMore: z, onLoadMore: C, root: u, enabled: c });
                return (0, d.jsxs)("div", {
                    className: "flex flex-col gap-2",
                    children: [
                        (0, d.jsx)("label", { className: "text-xs font-bold text-slate-300", children: "Pok\xe9mon da capa" }),
                        (0, d.jsxs)("button", {
                            type: "button",
                            onClick: () => {
                                (r(""), t(1), p(!0));
                            },
                            className: "group flex min-h-12 w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-left transition-[border-color,background-color] hover:border-poke-blue/50 hover:bg-poke-blue/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-poke-blue/70",
                            children: [
                                A
                                    ? (0, d.jsxs)(d.Fragment, {
                                          children: [
                                              (0, d.jsx)(e.default, { src: (0, k.AU)(A.dexId), alt: "", width: 40, height: 40, unoptimized: !0, className: "h-10 w-10 object-contain [image-rendering:pixelated]" }),
                                              (0, d.jsxs)("span", { className: "min-w-0 flex-1", children: [(0, d.jsx)("span", { className: "block truncate text-xs font-bold text-white", children: A.name }), (0, d.jsxs)("span", { className: "font-mono text-[11px] text-slate-400", children: ["#", String(A.dexId).padStart(3, "0")] })] }),
                                          ],
                                      })
                                    : (0, d.jsxs)("span", { className: "min-w-0 flex-1", children: [(0, d.jsx)("span", { className: "block text-xs font-bold text-white", children: "Pok\xe9bola tem\xe1tica" }), (0, d.jsx)("span", { className: "block text-[11px] text-slate-400", children: "Escolha um Pok\xe9mon para substituir a Pok\xe9bola." })] }),
                                (0, d.jsx)("span", { className: "text-[11px] font-semibold text-slate-300 transition-colors group-hover:text-white", children: "Escolher" }),
                            ],
                        }),
                        w &&
                            (0, d.jsx)("div", {
                                role: "dialog",
                                "aria-modal": "true",
                                "aria-label": "Escolher Pok\xe9mon da capa",
                                className: "modal-backdrop fixed inset-0 z-[100] flex bg-[#080a10] sm:items-center sm:justify-center sm:bg-black/75 sm:p-4 sm:backdrop-blur-sm",
                                "data-overlay-state": x,
                                onClick: (a) => {
                                    a.target === a.currentTarget && p(!1);
                                },
                                children: (0, d.jsxs)("div", {
                                    className: "modal-surface flex h-[100dvh] w-full flex-col overflow-hidden bg-[#12151d] sm:h-[85vh] sm:max-h-[820px] sm:max-w-3xl sm:rounded-2xl sm:border sm:border-white/10 sm:shadow-2xl md:max-w-5xl lg:max-w-6xl",
                                    children: [
                                        (0, d.jsxs)("div", {
                                            className: "flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6 sm:py-3.5",
                                            children: [
                                                (0, d.jsxs)("div", { children: [(0, d.jsx)("h2", { className: "text-lg font-bold tracking-tight text-white sm:text-xl", children: "Escolher Pok\xe9mon da capa" }), (0, d.jsx)("p", { className: "mt-0.5 hidden text-xs text-slate-400 sm:block", children: "Pesquise pelo nome ou pelo n\xfamero da Pok\xe9dex usando #." })] }),
                                                (0, d.jsx)("button", { type: "button", onClick: () => p(!1), "aria-label": "Fechar seletor de Pok\xe9mon da capa", className: "flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white sm:h-9 sm:w-9 sm:rounded-xl", children: (0, d.jsx)(f.A, { size: 18 }) }),
                                            ],
                                        }),
                                        (0, d.jsxs)("div", {
                                            className: "flex shrink-0 flex-col gap-2.5 border-b border-white/10 bg-black/20 px-3 py-2.5 sm:flex-row sm:items-center sm:px-6 sm:py-3",
                                            children: [
                                                (0, d.jsxs)("div", {
                                                    className: "relative flex-1",
                                                    children: [
                                                        (0, d.jsx)(g.A, { size: 16, className: "pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" }),
                                                        (0, d.jsx)("input", {
                                                            autoFocus: !0,
                                                            value: q,
                                                            onChange: (a) => {
                                                                (r(a.target.value), t(1));
                                                            },
                                                            placeholder: "Ex.: Gengar ou #94",
                                                            className: "h-11 w-full rounded-xl border border-white/10 bg-black/25 pr-3 pl-9 text-sm text-white placeholder:text-slate-500 focus:border-poke-blue/70 focus:outline-none",
                                                        }),
                                                    ],
                                                }),
                                                (0, d.jsxs)("button", {
                                                    type: "button",
                                                    onClick: () => B(null),
                                                    className: `flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border px-4 text-xs font-bold shadow-sm transition-[border-color,background-color,color,box-shadow] focus:outline-none focus-visible:ring-2 focus-visible:ring-poke-blue/70 ${null === a ? "border-poke-blue bg-poke-blue text-white hover:border-[var(--theme-primary-hover)] hover:bg-[var(--theme-primary-hover)] hover:shadow-[0_8px_20px_var(--theme-primary-glow)]" : "border-white/15 bg-white/[0.06] text-slate-200 hover:border-poke-blue/50 hover:bg-poke-blue/15 hover:text-white"}`,
                                                    children: [null === a ? (0, d.jsx)(h.A, { size: 15 }) : (0, d.jsx)(i, { size: 15 }), (0, d.jsx)("span", { children: "Usar s\xf3 a Pok\xe9bola" })],
                                                }),
                                            ],
                                        }),
                                        (0, d.jsxs)("div", {
                                            ref: v,
                                            className: "min-h-0 flex-1 overflow-y-auto p-3 sm:p-6",
                                            children: [
                                                y.length > 0
                                                    ? (0, d.jsx)("div", {
                                                          className: "grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5",
                                                          children: y.map((b) =>
                                                              (0, d.jsxs)(
                                                                  "button",
                                                                  {
                                                                      type: "button",
                                                                      onClick: () => B(b.dexId),
                                                                      className: `relative flex min-h-20 items-center gap-2 rounded-xl border p-2.5 text-left transition-[border-color,background-color,box-shadow] focus:outline-none focus-visible:ring-2 focus-visible:ring-poke-blue/70 ${a === b.dexId ? "border-poke-blue bg-poke-blue/15 hover:bg-poke-blue/20 hover:shadow-[0_8px_22px_rgba(59,130,246,0.16)]" : "border-white/10 bg-white/[0.03] hover:border-poke-blue/45 hover:bg-poke-blue/10 hover:shadow-[0_8px_22px_rgba(0,0,0,0.24)]"}`,
                                                                      children: [
                                                                          (0, d.jsx)(e.default, { src: (0, k.AU)(b.dexId), alt: "", width: 48, height: 48, unoptimized: !0, className: "h-12 w-12 shrink-0 object-contain [image-rendering:pixelated]" }),
                                                                          (0, d.jsxs)("span", { className: "min-w-0", children: [(0, d.jsx)("span", { className: "block truncate text-xs font-bold text-white", children: b.name }), (0, d.jsxs)("span", { className: "font-mono text-[11px] text-slate-400", children: ["#", String(b.dexId).padStart(3, "0")] })] }),
                                                                          a === b.dexId && (0, d.jsx)(h.A, { size: 14, className: "absolute top-2 right-2 text-poke-blue" }),
                                                                      ],
                                                                  },
                                                                  b.dexId,
                                                              ),
                                                          ),
                                                      })
                                                    : (0, d.jsx)("p", { className: "py-12 text-center text-sm text-slate-400", children: "Nenhum Pok\xe9mon encontrado." }),
                                                y.length > 0 && (0, d.jsx)("div", { ref: D, className: "h-4" }),
                                            ],
                                        }),
                                    ],
                                }),
                            }),
                    ],
                });
            }
        },
        71613: (a, b, c) => {
            c.d(b, { A: () => d });
            let d = (0, c(23339).A)("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
        },
        76186: (a, b, c) => {
            function d(a, b, c = !1) {}
            (c.d(b, { m: () => d }), c(38301));
        },
        80196: (a, b, c) => {
            c.d(b, { A: () => d });
            let d = (0, c(23339).A)("Globe", [
                ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
                ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
                ["path", { d: "M2 12h20", key: "9i4pu4" }],
            ]);
        },
        93178: (a, b, c) => {
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
