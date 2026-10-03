(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3921],
    {
        582: (e, l, r) => {
            "use strict";
            (r.r(l), r.d(l, { default: () => o }));
            var t = r(5155),
                a = r(2115),
                s = r(63),
                i = r(8213),
                n = r(7667),
                c = r(4298);
            function o() {
                let e = (0, s.useRouter)(),
                    { user: l, isLoading: r } = (0, i.A)();
                return (
                    (0, a.useEffect)(() => {
                        if (r) return;
                        if (!l) return void e.replace("/login");
                        let t = l.username || (0, c.DY)(l.email);
                        e.replace("/perfil/".concat(t));
                    }, [l, r, e]),
                    (0, t.jsx)(n.ProfileRouteLoading, {})
                );
            }
        },
        1847: (e, l, r) => {
            "use strict";
            r.d(l, { A: () => n });
            var t = r(2115);
            let a = function () {
                for (var e = arguments.length, l = Array(e), r = 0; r < e; r++) l[r] = arguments[r];
                return l
                    .filter((e, l, r) => !!e && "" !== e.trim() && r.indexOf(e) === l)
                    .join(" ")
                    .trim();
            };
            var s = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
            let i = (0, t.forwardRef)((e, l) => {
                    let { color: r = "currentColor", size: i = 24, strokeWidth: n = 2, absoluteStrokeWidth: c, className: o = "", children: d, iconNode: f, ...u } = e;
                    return (0, t.createElement)("svg", { ref: l, ...s, width: i, height: i, stroke: r, strokeWidth: c ? (24 * Number(n)) / Number(i) : n, className: a("lucide", o), ...u }, [
                        ...f.map((e) => {
                            let [l, r] = e;
                            return (0, t.createElement)(l, r);
                        }),
                        ...(Array.isArray(d) ? d : [d]),
                    ]);
                }),
                n = (e, l) => {
                    let r = (0, t.forwardRef)((r, s) => {
                        let { className: n, ...c } = r;
                        return (0, t.createElement)(i, { ref: s, iconNode: l, className: a("lucide-".concat(e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()), n), ...c });
                    });
                    return ((r.displayName = "".concat(e)), r);
                };
        },
        3166: (e, l, r) => {
            "use strict";
            r.d(l, { z: () => s });
            var t = r(5155),
                a = r(2115);
            function s(e) {
                let { ballType: l = "pokeball", customColor: r = "#ef4444", size: s = 40, className: i = "", isActive: n = !1, style: c } = e,
                    o = "grad-bottom-".concat(l, "-").concat((0, a.useId)().replaceAll(":", "")),
                    d = "custom" === l ? r : "greatball" === l ? "#3b82f6" : "ultraball" === l ? "#f59e0b" : "masterball" === l ? "#ec4899" : "safariball" === l ? "#10b981" : "loveball" === l ? "#ec4899" : "quickball" === l ? "#0ea5e9" : "duskball" === l ? "#14b8a6" : "luxuryball" === l ? "#eab308" : r || "#ef4444",
                    f = n ? "drop-shadow(0 0 10px ".concat(d, ")") : "drop-shadow(0 2px 5px rgba(0,0,0,0.4))";
                return (0, t.jsxs)("svg", {
                    viewBox: "0 0 100 100",
                    width: s,
                    height: s,
                    className: "shrink-0 select-none overflow-visible ".concat(i),
                    style: { colorScheme: "only light", forcedColorAdjust: "none", WebkitForcedColorAdjust: "none", filter: f, ...c },
                    children: [
                        (0, t.jsx)("defs", { children: (0, t.jsxs)("linearGradient", { id: o, x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [(0, t.jsx)("stop", { offset: "0%", stopColor: "#ffffff" }), (0, t.jsx)("stop", { offset: "100%", stopColor: "#cbd5e1" })] }) }),
                        (() => {
                            switch (l) {
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
                        (0, t.jsx)("path", { d: "M 4 50 A 46 46 0 0 0 96 50 Z", fill: "url(#".concat(o, ")") }),
                        (0, t.jsx)("line", { x1: "4", y1: "50", x2: "96", y2: "50", stroke: "#0f172a", strokeWidth: "7" }),
                        (0, t.jsx)("circle", { cx: "50", cy: "50", r: "46", fill: "none", stroke: "#0f172a", strokeWidth: "6" }),
                        (0, t.jsx)("circle", { cx: "50", cy: "50", r: "16", fill: "#0f172a" }),
                        (0, t.jsx)("circle", { cx: "50", cy: "50", r: "10", fill: "#f8fafc" }),
                        (0, t.jsx)("circle", { cx: "50", cy: "50", r: "5", fill: d, className: n ? "animate-pulse" : "" }),
                    ],
                });
            }
        },
        3252: (e, l, r) => {
            Promise.resolve().then(r.bind(r, 582));
        },
        4298: (e, l, r) => {
            "use strict";
            r.d(l, { DY: () => c, G4: () => d, NA: () => s, TU: () => o, d0: () => t, jl: () => u, xV: () => f, zz: () => a });
            let t = 20,
                a = 40,
                s = 160,
                i = /^[a-z][a-z0-9_]{2,19}$/,
                n = new Set(["api", "auth", "login", "logout", "perfil", "profile", "configuracoes", "settings", "collection", "colecao", "dashboard", "cards", "inicio", "home", "admin", "me", "termos", "terms", "privacy", "privacidade", "mypokebinder"]);
            function c(e) {
                let l;
                return (l = ((e || "treinador").split("@")[0] || "treinador")
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-z0-9_]/g, ""))
                    ? (/^[a-z]/.test(l) || (l = "t".concat(l)), l.length > t && (l = l.slice(0, t)), l.length < 3 && (l = "".concat(l, "xxx").slice(0, 3)), n.has(l) && (l = "treinador_".concat(l).slice(0, t)), l)
                    : "treinador";
            }
            function o(e) {
                let l = e.trim().toLowerCase();
                return i.test(l) ? (n.has(l) ? { ok: !1, error: "Este username n\xe3o est\xe1 dispon\xedvel." } : { ok: !0, username: l }) : { ok: !1, error: "Use 3–20 caracteres: comece com letra; s\xf3 letras min\xfasculas, n\xfameros e _." };
            }
            function d(e) {
                let l = e.trim().replace(/\s+/g, " ");
                return l.length < 1 || l.length > a ? { ok: !1, error: "O nome deve ter entre ".concat(1, " e ").concat(a, " caracteres.") } : { ok: !0, displayName: l };
            }
            function f(e) {
                let l = e.trim().replace(/\s+/g, " ");
                return 0 === l.length ? { ok: !0, bio: null } : l.length > s ? { ok: !1, error: "A descri\xe7\xe3o deve ter no m\xe1ximo ".concat(s, " caracteres.") } : { ok: !0, bio: l };
            }
            function u(e) {
                let l = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e) ? e : "#ef4444";
                return { "--theme-primary": l, "--color-poke-blue": l, "--theme-primary-hover": "color-mix(in srgb, ".concat(l, " 85%, black)"), "--theme-primary-glow": "color-mix(in srgb, ".concat(l, " 40%, transparent)") };
            }
        },
        4303: (e, l, r) => {
            "use strict";
            r.d(l, { i: () => n });
            var t = r(5155),
                a = r(2115),
                s = r(1013),
                i = r(3166);
            function n(e) {
                let { size: l = "md", message: r, className: n = "", ballType: c, color: o } = e,
                    d = (0, a.useContext)(s.cm),
                    f = o || (null == d ? void 0 : d.themeColor) || "var(--theme-primary, #ef4444)",
                    u = c || (o ? (0, s.w2)(o) : (null == d ? void 0 : d.ballType) || "pokeball"),
                    x = { sm: { box: "w-8 h-8", px: 32 }, md: { box: "w-16 h-16", px: 64 }, lg: { box: "w-24 h-24", px: 96 } }[l];
                return (0, t.jsxs)("div", {
                    className: "flex flex-col items-center justify-center gap-3 ".concat(n),
                    children: [(0, t.jsx)("div", { className: "relative ".concat(x.box, " animate-pokeball-spin"), children: (0, t.jsx)(i.z, { ballType: u, customColor: f, size: x.px, style: { filter: "drop-shadow(0 0 14px var(--theme-primary-glow))" }, className: "overflow-visible" }) }), r && (0, t.jsx)("p", { className: "text-sm font-medium tracking-wide text-slate-300 animate-pulse", children: r })],
                });
            }
        },
        5626: (e, l, r) => {
            "use strict";
            r.d(l, { A: () => t });
            let t = (0, r(1847).A)("ArrowLeft", [
                ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
                ["path", { d: "M19 12H5", key: "x3x0zl" }],
            ]);
        },
        7667: (e, l, r) => {
            "use strict";
            r.d(l, { ProfileRouteLoading: () => i });
            var t = r(5155),
                a = r(5626),
                s = r(9900);
            function i(e) {
                let { message: l = "Carregando perfil do treinador...", type: r = "profile" } = e;
                return "collection" === r || l.includes("cole\xe7\xe3o")
                    ? (0, t.jsx)("div", {
                          className: "flex min-h-screen flex-col bg-[#0a0c10]",
                          children: (0, t.jsxs)("main", {
                              className: "mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16",
                              children: [
                                  (0, t.jsxs)("header", {
                                      className: "flex flex-col gap-4",
                                      children: [
                                          (0, t.jsxs)("div", { className: "inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-slate-400", children: [(0, t.jsx)(a.A, { size: 14 }), (0, t.jsx)("span", { children: "Perfil" })] }),
                                          (0, t.jsxs)("div", {
                                              className: "flex items-center gap-3.5 sm:gap-4",
                                              children: [
                                                  (0, t.jsx)("div", { className: "h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-full border border-white/20 bg-white/10 animate-pulse" }),
                                                  (0, t.jsxs)("div", { className: "min-w-0 flex-1 space-y-1.5", children: [(0, t.jsx)("div", { className: "h-2.5 w-12 rounded bg-white/10 animate-pulse" }), (0, t.jsx)("div", { className: "h-5 sm:h-6 w-36 sm:w-48 rounded-lg bg-white/10 animate-pulse" }), (0, t.jsx)("div", { className: "h-3 w-28 rounded bg-white/5 animate-pulse" })] }),
                                              ],
                                          }),
                                      ],
                                  }),
                                  (0, t.jsx)("div", {
                                      className: "relative z-30 flex flex-col rounded-2xl border border-white/10 bg-[#121520]/80 p-2.5 sm:p-3.5 shadow-xl backdrop-blur-md",
                                      children: (0, t.jsxs)("div", { className: "flex items-center gap-2", children: [(0, t.jsx)("div", { className: "h-9 sm:h-10 flex-1 rounded-xl border border-white/10 bg-white/5 animate-pulse" }), (0, t.jsx)("div", { className: "h-9 sm:h-10 w-20 sm:w-24 shrink-0 rounded-xl border border-white/10 bg-white/5 animate-pulse" })] }),
                                  }),
                                  (0, t.jsx)("div", { className: "flex h-64 flex-col items-center justify-center", children: (0, t.jsx)(s.RouteLoading, { message: l, className: "flex flex-col items-center justify-center" }) }),
                              ],
                          }),
                      })
                    : (0, t.jsx)("div", { className: "flex flex-1 min-h-[calc(100dvh-4rem)] flex-col bg-[#0a0c10]", children: (0, t.jsx)(s.RouteLoading, { message: l }) });
            }
        },
        8213: (e, l, r) => {
            "use strict";
            r.d(l, { A: () => m, AuthProvider: () => x });
            var t = r(5155),
                a = r(2115),
                s = r(63),
                i = r(6648),
                n = r(4298);
            let c = (0, a.createContext)(null),
                o = "mypokebinder_user_profile";
            function d() {
                try {
                    let e = localStorage.getItem(o);
                    if (!e) return null;
                    return JSON.parse(e);
                } catch (e) {
                    return null;
                }
            }
            function f(e) {
                try {
                    e ? localStorage.setItem(o, JSON.stringify(e)) : localStorage.removeItem(o);
                } catch (e) {}
            }
            async function u(e) {
                var l, r;
                let t = (0, i.U)(),
                    { data: a } = await t.from("profiles").select("username, display_name, avatar_url, bio").eq("id", e.id).maybeSingle(),
                    s = (0, n.DY)(e.email);
                return { id: e.id, email: e.email || void 0, username: (null == a ? void 0 : a.username) || s, name: (null == a ? void 0 : a.display_name) || (null == a ? void 0 : a.username) || s, avatarUrl: (null == a ? void 0 : a.avatar_url) || (null == (l = e.user_metadata) ? void 0 : l.avatar_url) || (null == (r = e.user_metadata) ? void 0 : r.picture) || null, bio: (null == a ? void 0 : a.bio) || "" };
            }
            function x(e) {
                let { children: l, initialUser: r = null } = e,
                    n = (0, s.useRouter)(),
                    [o, x] = (0, a.useState)(() => r || d()),
                    [m, h] = (0, a.useState)(!r && !d()),
                    p = (0, a.useCallback)(async () => {
                        try {
                            let e = (0, i.U)(),
                                { data: l } = await e.auth.getUser();
                            if (l.user) {
                                let e = await u(l.user);
                                (x(e), f(e));
                            } else (x(null), f(null));
                        } catch (e) {
                        } finally {
                            h(!1);
                        }
                    }, []);
                ((0, a.useEffect)(() => {
                    r && (x(r), f(r), h(!1));
                }, [r]),
                    (0, a.useEffect)(() => {
                        let e = d();
                        e && (x((l) => l || e), h(!1));
                        let {
                            data: { subscription: l },
                        } = (0, i.U)().auth.onAuthStateChange((e, l) => {
                            (null == l ? void 0 : l.user)
                                ? u(l.user).then((e) => {
                                      (x(e), f(e), h(!1));
                                  })
                                : "SIGNED_OUT" === e && (x(null), f(null), h(!1));
                        });
                        return (
                            p(),
                            () => {
                                l.unsubscribe();
                            }
                        );
                    }, [p]));
                let b = (0, a.useCallback)(async () => {
                    (h(!0), x(null), f(null));
                    try {
                        let e = (0, i.U)();
                        await e.auth.signOut();
                    } finally {
                        (h(!1), n.push("/login"), n.refresh());
                    }
                }, [n]);
                return (0, t.jsx)(c.Provider, { value: { user: o, isLoading: m, signOut: b, refreshUser: p }, children: l });
            }
            function m() {
                let e = (0, a.useContext)(c);
                if (!e) throw Error("useAuth must be used within an AuthProvider");
                return e;
            }
        },
        9900: (e, l, r) => {
            "use strict";
            r.d(l, { RouteLoading: () => s });
            var t = r(5155),
                a = r(4303);
            function s(e) {
                let { message: l = "Carregando...", className: r } = e;
                return (0, t.jsx)("main", { className: r || "flex flex-1 items-start justify-center pt-10 sm:pt-14 md:pt-18 pb-16", children: (0, t.jsx)(a.i, { message: l, size: "lg" }) });
            }
        },
    },
    (e) => {
        (e.O(0, [5730, 235, 1013, 8441, 1255, 7358], () => e((e.s = 3252))), (_N_E = e.O()));
    },
]);
