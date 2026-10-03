(() => {
    var a = {};
    ((a.id = 8299),
        (a.ids = [8299]),
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
            14263: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("LoaderCircle", [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]]);
            },
            19121: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/action-async-storage.external.js");
            },
            26713: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/router/utils/is-bot");
            },
            28074: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("Palette", [
                    ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
                    ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
                    ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }],
                    ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
                    ["path", { d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z", key: "12rzf8" }],
                ]);
            },
            28354: (a) => {
                "use strict";
                a.exports = require("util");
            },
            29294: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/work-async-storage.external.js");
            },
            33873: (a) => {
                "use strict";
                a.exports = require("path");
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
            42593: (a, b, c) => {
                "use strict";
                c.d(b, { v: () => e });
                var d = c(38301);
                function e(a) {
                    let [b, c] = (0, d.useState)(a),
                        [e, f] = (0, d.useState)(a ? "opening" : "closed");
                    return { isPresent: b, state: e };
                }
            },
            46313: (a, b, c) => {
                "use strict";
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
            54056: (a, b, c) => {
                Promise.resolve().then(c.bind(c, 57589));
            },
            54937: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("ShieldCheck", [
                    ["path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z", key: "oel41y" }],
                    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
                ]);
            },
            57589: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { default: () => E }));
                var d = c(21124),
                    e = c(38301),
                    f = c(24515),
                    g = c(42378),
                    h = c(86965),
                    i = c(55709),
                    j = c(42830),
                    k = c(79944),
                    l = c(23339);
                let m = (0, l.A)("User", [
                        ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
                        ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }],
                    ]),
                    n = (0, l.A)("LogOut", [
                        ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
                        ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
                        ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }],
                    ]);
                var o = c(54937),
                    p = c(71613);
                let q = (0, l.A)("Volume2", [
                        ["path", { d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z", key: "uqj9uw" }],
                        ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
                        ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }],
                    ]),
                    r = (0, l.A)("VolumeX", [
                        ["path", { d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z", key: "uqj9uw" }],
                        ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
                        ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }],
                    ]);
                var s = c(75234),
                    t = c(28074),
                    u = c(40284),
                    v = c(14263),
                    w = c(46313),
                    x = c(37108);
                let y = { 3: 1.15, 6: 1.15, 9: 1.12, 25: 1.55, 94: 1.2, 151: 1.7 };
                function z({ themeColor: a, onSelectColor: b }) {
                    let c = async (a) => {
                        (await b(a.color), j.oR.success(`Tema ${a.label} selecionado!`, { description: `A paleta de ${a.pokemonName} foi aplicada em toda a interface.` }));
                    };
                    return (0, d.jsx)("div", {
                        className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",
                        children: h.b3.map((b) => {
                            let e = a.toLowerCase() === b.color.toLowerCase(),
                                g = y[b.dexId] ?? 1.15;
                            return (0, d.jsxs)(
                                "button",
                                {
                                    type: "button",
                                    onClick: () => c(b),
                                    className: `group relative flex flex-col overflow-hidden rounded-2xl border p-3.5 sm:p-4 text-left transition-all duration-300 ${e ? "border-white/50 bg-[#161a26] shadow-xl ring-2" : "border-white/10 bg-[#0f121a]/90 hover:border-white/25 hover:bg-[#141824]"}`,
                                    style: { boxShadow: e ? `0 8px 24px ${b.color}33` : void 0, borderColor: e ? b.color : void 0 },
                                    children: [
                                        (0, d.jsxs)("div", {
                                            className: "flex items-stretch justify-between gap-3",
                                            children: [
                                                (0, d.jsxs)("div", {
                                                    className: "flex min-w-0 flex-1 items-center gap-2.5",
                                                    children: [
                                                        (0, d.jsx)("div", { className: "relative shrink-0", children: (0, d.jsx)(w.z, { ballType: b.ballType, size: 38, isActive: e }) }),
                                                        (0, d.jsxs)("div", {
                                                            className: "min-w-0 flex-1",
                                                            children: [
                                                                (0, d.jsx)("h4", { className: "text-xs sm:text-sm font-extrabold tracking-tight text-white whitespace-nowrap", children: b.label }),
                                                                (0, d.jsxs)("div", {
                                                                    className: "mt-0.5 flex items-center gap-1.5 whitespace-nowrap text-[11px]",
                                                                    children: [(0, d.jsx)("span", { className: "font-medium text-slate-400 whitespace-nowrap", children: b.ballName }), (0, d.jsx)("span", { className: "text-slate-600 shrink-0", children: "•" }), (0, d.jsx)("span", { className: "shrink-0 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold text-slate-300 whitespace-nowrap", children: b.type })],
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                (0, d.jsx)("div", { className: "relative flex size-20 shrink-0 items-center justify-center overflow-hidden sm:size-24", children: (0, d.jsx)(f.default, { src: (0, x.AU)(b.dexId), alt: b.pokemonName, width: 96, height: 96, unoptimized: !0, className: "size-full object-contain drop-shadow-md [image-rendering:pixelated]", style: { transform: `scale(${g})` } }) }),
                                            ],
                                        }),
                                        (0, d.jsxs)("div", {
                                            className: "mt-3.5 flex items-center justify-between border-t border-white/5 pt-3",
                                            children: [
                                                (0, d.jsxs)("div", { className: "flex items-center gap-2", children: [(0, d.jsx)("span", { className: "h-3 w-3 rounded-full border border-white/20 shadow-sm", style: { backgroundColor: b.color } }), (0, d.jsx)("span", { className: "font-mono text-xs font-semibold text-slate-300", children: b.color.toUpperCase() })] }),
                                                e ? (0, d.jsxs)("span", { className: "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm", style: { backgroundColor: b.color }, children: [(0, d.jsx)(p.A, { size: 12 }), (0, d.jsx)("span", { children: "Ativo" })] }) : (0, d.jsx)("span", { className: "text-[11px] font-medium text-slate-500 transition-colors group-hover:text-slate-300", children: "Selecionar" }),
                                            ],
                                        }),
                                    ],
                                },
                                b.id,
                            );
                        }),
                    });
                }
                var A = c(59535),
                    B = c(20450),
                    C = c(76186),
                    D = c(42593);
                function E() {
                    let a = (0, g.useRouter)(),
                        { themeColor: b, soundEnabled: c, animationsEnabled: l, setThemeColor: w, setSoundEnabled: x, setAnimationsEnabled: y } = (0, h.Qg)(),
                        { user: E, isLoading: F, signOut: G, refreshUser: H } = (0, i.A)(),
                        [I, J] = (0, e.useState)(!1),
                        [K, L] = (0, e.useState)(!1),
                        [M, N] = (0, e.useState)(null),
                        [O, P] = (0, e.useState)(""),
                        [Q, R] = (0, e.useState)(""),
                        [S, T] = (0, e.useState)(""),
                        [U, V] = (0, e.useState)(""),
                        [W, X] = (0, e.useState)(!1),
                        [Y, Z] = (0, e.useState)(!1),
                        [$, _] = (0, e.useState)(""),
                        [aa, ab] = (0, e.useState)(!1);
                    (0, C.m)(
                        Y,
                        () => {
                            (Z(!1), _(""));
                        },
                        aa,
                    );
                    let { isPresent: ac, state: ad } = (0, D.v)(Y),
                        ae = O.trim() !== (E?.name || "").trim() || Q !== (E?.username || "") || S.trim() !== U.trim(),
                        af = async () => {
                            L(!0);
                            try {
                                (await G(), j.oR.success("Sess\xe3o encerrada com sucesso."));
                            } catch {
                                (j.oR.error("Erro ao encerrar sess\xe3o."), L(!1));
                            }
                        },
                        ag = async () => {
                            if ("EXCLUIR" !== $.trim().toUpperCase()) return void j.oR.error("Digite EXCLUIR para confirmar.");
                            ab(!0);
                            try {
                                let a = await fetch("/api/account", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ confirm: "EXCLUIR" }) }),
                                    b = await a.json().catch(() => ({}));
                                if (!a.ok) {
                                    (j.oR.error(b.error || "N\xe3o foi poss\xedvel excluir a conta."), ab(!1));
                                    return;
                                }
                                try {
                                    for (let a of ["mypokebinder_user_profile", "mypokebinder_theme_color", "mypokebinder_sound_enabled", "mypokebinder_animations_enabled"]) localStorage.removeItem(a);
                                    (sessionStorage.removeItem("mypokebinder_collection_filters"), (document.cookie = "mypokebinder_theme_color=; path=/; max-age=0; SameSite=Lax"));
                                } catch {}
                                (Z(!1), j.oR.success("Conta exclu\xedda permanentemente."), await G());
                            } catch {
                                (j.oR.error("N\xe3o foi poss\xedvel excluir a conta."), ab(!1));
                            }
                        },
                        ah = async () => {
                            let a = !c;
                            (await x(a), j.oR.success(a ? "Sons ativados" : "Sons desativados", { description: a ? "Efeitos sonoros ao inserir cartas habilitados." : "Efeitos sonoros silenciados." }));
                        },
                        ai = async () => {
                            let a = !l;
                            (await y(a), j.oR.success(a ? "Anima\xe7\xf5es ativadas" : "Anima\xe7\xf5es desativadas", { description: a ? "Efeitos 3D e folheamento de p\xe1ginas habilitados." : "Efeitos 3D e folheamento de p\xe1ginas desativados." }));
                        },
                        aj = async () => {
                            let a = (0, B.G4)(O);
                            if (!a.ok) return void j.oR.error(a.error);
                            let b = (0, B.TU)(Q);
                            if (!b.ok) return void j.oR.error(b.error);
                            let c = (0, B.xV)(S);
                            if (!c.ok) return void j.oR.error(c.error);
                            if (!ae) return void j.oR.message("Nenhuma altera\xe7\xe3o para salvar.");
                            X(!0);
                            try {
                                let d = {};
                                (a.displayName !== (E?.name || "").trim() && (d.display_name = a.displayName), b.username !== E?.username && (d.username = b.username), (c.bio || "") !== U.trim() && (d.bio = c.bio ?? ""));
                                let e = await fetch("/api/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(d) }),
                                    f = await e.json().catch(() => ({}));
                                if (!e.ok) return void j.oR.error(f.error || "N\xe3o foi poss\xedvel salvar o perfil.");
                                (V(c.bio ?? ""), T(c.bio ?? ""), await H(), j.oR.success("Perfil atualizado."));
                            } catch {
                                j.oR.error("N\xe3o foi poss\xedvel salvar o perfil.");
                            } finally {
                                X(!1);
                            }
                        };
                    return F
                        ? (0, d.jsx)("div", { className: "flex min-h-screen flex-col", children: (0, d.jsx)("main", { className: "flex flex-1 items-start justify-center bg-[#0a0c10] pt-10 pb-16 sm:pt-14 md:pt-18", children: (0, d.jsx)(A.i, { size: "lg", message: "Carregando configura\xe7\xf5es..." }) }) })
                        : (0, d.jsxs)("div", {
                              className: "flex min-h-screen flex-col",
                              children: [
                                  (0, d.jsxs)("main", {
                                      className: "mx-auto flex w-full max-w-6xl flex-1 flex-col gap-5 px-4 py-5 sm:gap-6 sm:px-6 sm:py-8 pb-28 md:pb-16",
                                      children: [
                                          (0, d.jsxs)("div", {
                                              className: "flex flex-col gap-3 sm:gap-4",
                                              children: [
                                                  (0, d.jsx)("div", {
                                                      children: (0, d.jsxs)("button", {
                                                          type: "button",
                                                          onClick: () => {
                                                              let b = E?.username ? `/perfil/${E.username}` : "/perfil";
                                                              a.replace(b);
                                                          },
                                                          className: "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white",
                                                          children: [(0, d.jsx)(k.A, { size: 16 }), (0, d.jsx)("span", { children: "Voltar" })],
                                                      }),
                                                  }),
                                                  (0, d.jsx)("div", { children: (0, d.jsx)("h1", { className: "text-2xl font-extrabold tracking-tight text-white sm:text-3xl", children: "Configura\xe7\xf5es" }) }),
                                              ],
                                          }),
                                          (0, d.jsxs)("section", {
                                              className: "profile-enter rounded-2xl border border-white/10 bg-[#12151d]/90 p-4 shadow-xl backdrop-blur-md sm:p-6",
                                              children: [
                                                  (0, d.jsxs)("div", {
                                                      className: "flex flex-col gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between sm:pb-5",
                                                      children: [
                                                          (0, d.jsxs)("div", {
                                                              className: "flex items-center gap-3",
                                                              children: [(0, d.jsx)("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl border border-poke-blue/30 bg-poke-blue/10 text-poke-blue", children: (0, d.jsx)(m, { size: 18 }) }), (0, d.jsxs)("div", { children: [(0, d.jsx)("h2", { className: "text-base font-bold text-white sm:text-lg", children: "Conta" }), (0, d.jsx)("p", { className: "text-xs text-slate-400", children: "Nome, username e descri\xe7\xe3o" })] })],
                                                          }),
                                                          (0, d.jsxs)("button", {
                                                              type: "button",
                                                              onClick: af,
                                                              disabled: K,
                                                              className: "hidden items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-xs font-bold text-rose-400 transition-all hover:border-rose-500/60 hover:bg-rose-500/20 hover:text-rose-200 disabled:opacity-50 sm:inline-flex",
                                                              children: [(0, d.jsx)(n, { size: 15 }), (0, d.jsx)("span", { children: K ? "Saindo..." : "Sair da conta" })],
                                                          }),
                                                      ],
                                                  }),
                                                  (0, d.jsxs)("div", {
                                                      className: "mt-5 flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8",
                                                      children: [
                                                          (0, d.jsx)("div", {
                                                              className: "flex shrink-0 items-center gap-3.5 lg:w-56 lg:flex-col lg:items-start",
                                                              children:
                                                                  F && !E
                                                                      ? (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("div", { className: "h-16 w-16 shrink-0 animate-pulse rounded-full border border-white/10 bg-white/10" }), (0, d.jsxs)("div", { className: "flex flex-col gap-2", children: [(0, d.jsx)("div", { className: "h-4 w-28 animate-pulse rounded bg-white/10" }), (0, d.jsx)("div", { className: "h-3 w-36 animate-pulse rounded bg-white/5" })] })] })
                                                                      : (0, d.jsxs)(d.Fragment, {
                                                                            children: [
                                                                                E?.avatarUrl && !I
                                                                                    ? (0, d.jsx)(f.default, { src: E.avatarUrl, alt: E.name || E.username || "Avatar", width: 64, height: 64, className: "h-16 w-16 rounded-full border border-white/20 bg-white/10 object-cover shadow-sm ring-1 ring-white/10", referrerPolicy: "no-referrer", onError: () => J(!0), unoptimized: !0 })
                                                                                    : (0, d.jsx)("div", { className: "flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xl font-bold text-white shadow-sm", children: (E?.name?.[0] || E?.username?.[0] || E?.email?.[0] || "P").toUpperCase() }),
                                                                                (0, d.jsxs)("div", {
                                                                                    className: "flex min-w-0 flex-col",
                                                                                    children: [
                                                                                        (0, d.jsx)("span", { className: "truncate text-sm font-bold text-white", children: E?.name || E?.username || "Treinador" }),
                                                                                        (0, d.jsxs)("span", { className: "truncate font-mono text-xs text-poke-blue", children: ["@", E?.username || "treinador"] }),
                                                                                        (0, d.jsx)("span", { className: "mt-1 truncate text-[11px] text-slate-500", children: E?.email }),
                                                                                        (0, d.jsxs)("div", { className: "mt-1.5 flex items-center gap-1.5 text-[10px] font-medium text-emerald-400", children: [(0, d.jsx)(o.A, { size: 12 }), (0, d.jsx)("span", { children: "Conta conectada" })] }),
                                                                                    ],
                                                                                }),
                                                                            ],
                                                                        }),
                                                          }),
                                                          (0, d.jsxs)("div", {
                                                              className: "min-w-0 flex-1 space-y-4",
                                                              children: [
                                                                  (0, d.jsxs)("div", {
                                                                      className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
                                                                      children: [
                                                                          (0, d.jsxs)("label", {
                                                                              className: "flex flex-col gap-1.5",
                                                                              children: [
                                                                                  (0, d.jsx)("span", { className: "text-xs font-semibold text-slate-300", children: "Nome" }),
                                                                                  (0, d.jsx)("input", { type: "text", value: O, onChange: (a) => P(a.target.value.slice(0, B.zz)), maxLength: B.zz, autoComplete: "nickname", className: "w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm font-semibold text-white outline-none transition-colors placeholder:text-slate-600 focus:border-poke-blue/50 focus:ring-1 focus:ring-poke-blue/30", placeholder: "Como quer ser chamado" }),
                                                                              ],
                                                                          }),
                                                                          (0, d.jsxs)("label", {
                                                                              className: "flex flex-col gap-1.5",
                                                                              children: [
                                                                                  (0, d.jsx)("span", { className: "text-xs font-semibold text-slate-300", children: "Username" }),
                                                                                  (0, d.jsxs)("div", {
                                                                                      className: "relative",
                                                                                      children: [
                                                                                          (0, d.jsx)("span", { className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500", children: "@" }),
                                                                                          (0, d.jsx)("input", {
                                                                                              type: "text",
                                                                                              value: Q,
                                                                                              onChange: (a) =>
                                                                                                  R(
                                                                                                      a.target.value
                                                                                                          .toLowerCase()
                                                                                                          .replace(/[^a-z0-9_]/g, "")
                                                                                                          .slice(0, B.d0),
                                                                                                  ),
                                                                                              maxLength: B.d0,
                                                                                              spellCheck: !1,
                                                                                              autoComplete: "username",
                                                                                              className: "w-full rounded-xl border border-white/10 bg-black/30 py-2.5 pl-8 pr-3 text-sm font-semibold text-white outline-none transition-colors placeholder:text-slate-600 focus:border-poke-blue/50 focus:ring-1 focus:ring-poke-blue/30",
                                                                                              placeholder: "seu_username",
                                                                                          }),
                                                                                      ],
                                                                                  }),
                                                                              ],
                                                                          }),
                                                                      ],
                                                                  }),
                                                                  (0, d.jsxs)("label", {
                                                                      className: "flex flex-col gap-1.5",
                                                                      children: [
                                                                          (0, d.jsx)("span", { className: "text-xs font-semibold text-slate-300", children: "Descri\xe7\xe3o" }),
                                                                          (0, d.jsx)("textarea", { value: S, onChange: (a) => T(a.target.value.slice(0, B.NA)), maxLength: B.NA, rows: 3, className: "w-full resize-none rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-poke-blue/50 focus:ring-1 focus:ring-poke-blue/30", placeholder: "Conte um pouco sobre a sua cole\xe7\xe3o" }),
                                                                          (0, d.jsxs)("span", { className: "text-[10px] text-slate-500", children: [S.trim().length, "/", B.NA] }),
                                                                      ],
                                                                  }),
                                                                  (0, d.jsx)("div", {
                                                                      className: "flex justify-end",
                                                                      children: (0, d.jsxs)("button", {
                                                                          type: "button",
                                                                          onClick: aj,
                                                                          disabled: W || !ae,
                                                                          className: "inline-flex items-center justify-center gap-2 rounded-xl border border-poke-blue/40 bg-poke-blue/15 px-4 py-2.5 text-xs font-bold text-white transition-all hover:border-poke-blue/60 hover:bg-poke-blue/25 disabled:cursor-not-allowed disabled:opacity-50",
                                                                          children: [(0, d.jsx)(p.A, { size: 14 }), (0, d.jsx)("span", { children: W ? "Salvando..." : "Salvar altera\xe7\xf5es" })],
                                                                      }),
                                                                  }),
                                                              ],
                                                          }),
                                                      ],
                                                  }),
                                              ],
                                          }),
                                          (0, d.jsxs)("button", { type: "button", onClick: af, disabled: K, className: "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs font-bold text-rose-400 transition-all hover:border-rose-500/60 hover:bg-rose-500/20 hover:text-rose-200 disabled:opacity-50 sm:hidden", children: [(0, d.jsx)(n, { size: 15 }), (0, d.jsx)("span", { children: K ? "Saindo..." : "Sair da conta" })] }),
                                          (0, d.jsxs)("div", {
                                              className: "profile-enter profile-enter-d1 grid grid-cols-1 gap-4 sm:grid-cols-2",
                                              children: [
                                                  (0, d.jsxs)("section", {
                                                      className: "flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#12151d]/90 px-4 py-3.5 shadow-lg backdrop-blur-md",
                                                      children: [
                                                          (0, d.jsxs)("div", {
                                                              className: "flex items-center gap-3",
                                                              children: [
                                                                  (0, d.jsx)("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-poke-blue/30 bg-poke-blue/10 text-poke-blue", children: c ? (0, d.jsx)(q, { size: 16 }) : (0, d.jsx)(r, { size: 16 }) }),
                                                                  (0, d.jsxs)("div", { className: "min-w-0", children: [(0, d.jsx)("h2", { className: "text-sm font-bold text-white", children: "Sons do Binder" }), (0, d.jsx)("p", { className: "text-[11px] text-slate-400", children: "Impacto ao inserir cartas" })] }),
                                                              ],
                                                          }),
                                                          (0, d.jsx)("button", { type: "button", role: "switch", "aria-checked": c, onClick: ah, className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${c ? "bg-poke-blue" : "bg-white/20"}`, children: (0, d.jsx)("span", { className: `inline-block h-4 w-4 rounded-full bg-white transition-transform duration-200 ${c ? "translate-x-4" : "translate-x-0"}` }) }),
                                                      ],
                                                  }),
                                                  (0, d.jsxs)("section", {
                                                      className: "flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#12151d]/90 px-4 py-3.5 shadow-lg backdrop-blur-md",
                                                      children: [
                                                          (0, d.jsxs)("div", {
                                                              className: "flex items-center gap-3",
                                                              children: [
                                                                  (0, d.jsx)("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-poke-blue/30 bg-poke-blue/10 text-poke-blue", children: (0, d.jsx)(s.A, { size: 16 }) }),
                                                                  (0, d.jsxs)("div", { className: "min-w-0", children: [(0, d.jsx)("h2", { className: "text-sm font-bold text-white", children: "Anima\xe7\xf5es e Efeitos" }), (0, d.jsx)("p", { className: "text-[11px] text-slate-400", children: "Cartas 3D, folheamento e part\xedculas" })] }),
                                                              ],
                                                          }),
                                                          (0, d.jsx)("button", { type: "button", role: "switch", "aria-checked": l, onClick: ai, className: `relative inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${l ? "bg-poke-blue" : "bg-white/20"}`, children: (0, d.jsx)("span", { className: `inline-block h-4 w-4 rounded-full bg-white transition-transform duration-200 ${l ? "translate-x-4" : "translate-x-0"}` }) }),
                                                      ],
                                                  }),
                                              ],
                                          }),
                                          (0, d.jsxs)("section", {
                                              className: "profile-enter profile-enter-d2 rounded-2xl border border-white/10 bg-[#12151d]/90 p-4 shadow-xl backdrop-blur-md sm:p-6",
                                              children: [
                                                  (0, d.jsxs)("div", {
                                                      className: "flex items-center gap-2.5 border-b border-white/10 pb-3.5 sm:pb-4",
                                                      children: [
                                                          (0, d.jsx)("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl border border-poke-blue/30 bg-poke-blue/10 text-poke-blue", children: (0, d.jsx)(t.A, { size: 18 }) }),
                                                          (0, d.jsxs)("div", { className: "min-w-0", children: [(0, d.jsx)("h2", { className: "text-base font-bold text-white sm:text-lg", children: "Tema do Treinador" }), (0, d.jsx)("p", { className: "text-xs text-slate-400", children: "Escolha a Pok\xe9bola e a cor de destaque" })] }),
                                                      ],
                                                  }),
                                                  (0, d.jsx)("div", { className: "mt-4 sm:mt-5", children: (0, d.jsx)(z, { themeColor: b, onSelectColor: w }) }),
                                              ],
                                          }),
                                          (0, d.jsxs)("section", {
                                              className: "profile-enter profile-enter-d3 rounded-2xl border border-rose-500/20 bg-[#12151d]/90 p-4 shadow-xl backdrop-blur-md sm:p-6",
                                              children: [
                                                  (0, d.jsxs)("div", {
                                                      className: "flex items-center gap-2.5 border-b border-white/10 pb-3.5 sm:pb-4",
                                                      children: [
                                                          (0, d.jsx)("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400", children: (0, d.jsx)(u.A, { size: 18 }) }),
                                                          (0, d.jsxs)("div", { className: "min-w-0", children: [(0, d.jsx)("h2", { className: "text-base font-bold text-white sm:text-lg", children: "Zona de perigo" }), (0, d.jsx)("p", { className: "text-xs text-slate-400", children: "Exclus\xe3o permanente da conta e de todos os dados" })] }),
                                                      ],
                                                  }),
                                                  (0, d.jsxs)("div", {
                                                      className: "mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-between",
                                                      children: [
                                                          (0, d.jsx)("p", { className: "max-w-xl text-xs leading-relaxed text-slate-400", children: "Apaga perfil, cole\xe7\xe3o, binder, prefer\xeancias e o v\xednculo de login com o Google neste app. Esta a\xe7\xe3o n\xe3o pode ser desfeita." }),
                                                          (0, d.jsxs)("button", {
                                                              type: "button",
                                                              onClick: () => {
                                                                  (_(""), Z(!0));
                                                              },
                                                              disabled: aa || K,
                                                              className: "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/15 px-4 py-2.5 text-xs font-bold text-rose-300 transition-all hover:border-rose-500/60 hover:bg-rose-500/25 hover:text-rose-100 disabled:opacity-50",
                                                              children: [(0, d.jsx)(u.A, { size: 15 }), (0, d.jsx)("span", { children: "Excluir conta" })],
                                                          }),
                                                      ],
                                                  }),
                                              ],
                                          }),
                                      ],
                                  }),
                                  ac &&
                                      (0, d.jsx)("div", {
                                          className: "modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-sm",
                                          "data-overlay-state": ad,
                                          role: "dialog",
                                          "aria-modal": "true",
                                          "aria-label": "Confirmar exclus\xe3o da conta",
                                          onClick: (a) => {
                                              a.target !== a.currentTarget || aa || (Z(!1), _(""));
                                          },
                                          children: (0, d.jsxs)("div", {
                                              className: "modal-surface flex h-dvh max-h-none w-full max-w-none flex-col gap-4 overflow-y-auto rounded-none border-0 bg-[#141722] p-6 shadow-2xl sm:h-auto sm:max-w-md sm:rounded-2xl sm:border sm:border-rose-500/30",
                                              children: [
                                                  (0, d.jsxs)("div", {
                                                      className: "flex items-center gap-3",
                                                      children: [(0, d.jsx)("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/15 text-rose-400", children: (0, d.jsx)(u.A, { size: 22 }) }), (0, d.jsxs)("div", { children: [(0, d.jsx)("h3", { className: "text-base font-bold text-white", children: "Excluir conta permanentemente?" }), (0, d.jsx)("p", { className: "text-xs text-slate-400", children: "Todos os seus dados ser\xe3o apagados." })] })],
                                                  }),
                                                  (0, d.jsxs)("p", { className: "text-xs leading-relaxed text-slate-300", children: ["Isso remove seu perfil, todas as cartas da cole\xe7\xe3o e do binder, prefer\xeancias e a sess\xe3o vinculada ao Google. Digite ", (0, d.jsx)("strong", { className: "text-white", children: "EXCLUIR" }), " para confirmar."] }),
                                                  (0, d.jsxs)("label", {
                                                      className: "flex flex-col gap-1.5",
                                                      children: [
                                                          (0, d.jsx)("span", { className: "sr-only", children: "Confirma\xe7\xe3o" }),
                                                          (0, d.jsx)("input", { type: "text", value: $, onChange: (a) => _(a.target.value), disabled: aa, autoComplete: "off", spellCheck: !1, placeholder: "EXCLUIR", className: "w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm font-semibold tracking-wide text-white outline-none transition-colors placeholder:text-slate-600 focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/30 disabled:opacity-50" }),
                                                      ],
                                                  }),
                                                  (0, d.jsxs)("div", {
                                                      className: "mt-1 flex items-center justify-end gap-3",
                                                      children: [
                                                          (0, d.jsx)("button", {
                                                              type: "button",
                                                              onClick: () => {
                                                                  (Z(!1), _(""));
                                                              },
                                                              disabled: aa,
                                                              className: "cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 disabled:opacity-50",
                                                              children: "Cancelar",
                                                          }),
                                                          (0, d.jsxs)("button", {
                                                              type: "button",
                                                              onClick: ag,
                                                              disabled: aa || "EXCLUIR" !== $.trim().toUpperCase(),
                                                              className: "flex cursor-pointer items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-rose-600/30 transition-all hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-50",
                                                              children: [aa && (0, d.jsx)(v.A, { size: 14, className: "animate-spin" }), (0, d.jsx)("span", { children: aa ? "Excluindo..." : "Sim, excluir conta" })],
                                                          }),
                                                      ],
                                                  }),
                                              ],
                                          }),
                                      }),
                              ],
                          });
                }
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
            59883: (a, b, c) => {
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
                            { children: ["configuracoes", { children: ["__PAGE__", {}, { page: [() => Promise.resolve().then(c.bind(c, 96094)), "/home/paulo_rosado/MyPokeBinder/src/app/configuracoes/page.tsx"] }] }, {}] },
                            {
                                layout: [() => Promise.resolve().then(c.bind(c, 51472)), "/home/paulo_rosado/MyPokeBinder/src/app/layout.tsx"],
                                "global-error": [() => Promise.resolve().then(c.t.bind(c, 81170, 23)), "next/dist/client/components/builtin/global-error.js"],
                                "not-found": [() => Promise.resolve().then(c.bind(c, 59732)), "/home/paulo_rosado/MyPokeBinder/src/app/not-found.tsx"],
                                forbidden: [() => Promise.resolve().then(c.t.bind(c, 90461, 23)), "next/dist/client/components/builtin/forbidden.js"],
                                unauthorized: [() => Promise.resolve().then(c.t.bind(c, 32768, 23)), "next/dist/client/components/builtin/unauthorized.js"],
                            },
                        ],
                    }.children,
                    J = ["/home/paulo_rosado/MyPokeBinder/src/app/configuracoes/page.tsx"],
                    K = { require: c, loadChunk: () => Promise.resolve() },
                    L = new d.AppPageRouteModule({ definition: { kind: e.RouteKind.APP_PAGE, page: "/configuracoes/page", pathname: "/configuracoes", bundlePath: "", filename: "", appPaths: [] }, userland: { loaderTree: I }, distDir: ".next", relativeProjectDir: "" });
                async function M(a, b, d) {
                    var D;
                    let H = "/configuracoes/page";
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
            63033: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
            },
            68123: (a, b, c) => {
                Promise.resolve().then(c.bind(c, 96094));
            },
            71613: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
            },
            75234: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("Sparkles", [
                    ["path", { d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z", key: "4pj2yx" }],
                    ["path", { d: "M20 3v4", key: "1olli1" }],
                    ["path", { d: "M22 5h-4", key: "1gvqau" }],
                    ["path", { d: "M4 17v2", key: "vumght" }],
                    ["path", { d: "M5 18H3", key: "zchphs" }],
                ]);
            },
            76186: (a, b, c) => {
                "use strict";
                function d(a, b, c = !1) {}
                (c.d(b, { m: () => d }), c(38301));
            },
            86439: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/no-fallback-error.external");
            },
            96094: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { default: () => d }));
                let d = (0, c(97954).registerClientReference)(
                    function () {
                        throw Error("Attempted to call the default export of \"/home/paulo_rosado/MyPokeBinder/src/app/configuracoes/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
                    },
                    "/home/paulo_rosado/MyPokeBinder/src/app/configuracoes/page.tsx",
                    "default",
                );
            },
        }));
    var b = require("../../webpack-runtime.js");
    b.C(a);
    var c = b.X(0, [8301, 991, 582, 1160], () => b((b.s = 59883)));
    module.exports = c;
})();
