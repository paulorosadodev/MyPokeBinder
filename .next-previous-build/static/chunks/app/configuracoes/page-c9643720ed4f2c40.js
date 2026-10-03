(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [8299],
    {
        1360: (e, t, s) => {
            "use strict";
            s.d(t, { A: () => l });
            let l = (0, s(1847).A)("Trash2", [
                ["path", { d: "M3 6h18", key: "d0wm0j" }],
                ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
                ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
                ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
                ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
            ]);
        },
        1847: (e, t, s) => {
            "use strict";
            s.d(t, { A: () => i });
            var l = s(2115);
            let r = function () {
                for (var e = arguments.length, t = Array(e), s = 0; s < e; s++) t[s] = arguments[s];
                return t
                    .filter((e, t, s) => !!e && "" !== e.trim() && s.indexOf(e) === t)
                    .join(" ")
                    .trim();
            };
            var a = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
            let o = (0, l.forwardRef)((e, t) => {
                    let { color: s = "currentColor", size: o = 24, strokeWidth: i = 2, absoluteStrokeWidth: n, className: c = "", children: d, iconNode: x, ...u } = e;
                    return (0, l.createElement)("svg", { ref: t, ...a, width: o, height: o, stroke: s, strokeWidth: n ? (24 * Number(i)) / Number(o) : i, className: r("lucide", c), ...u }, [
                        ...x.map((e) => {
                            let [t, s] = e;
                            return (0, l.createElement)(t, s);
                        }),
                        ...(Array.isArray(d) ? d : [d]),
                    ]);
                }),
                i = (e, t) => {
                    let s = (0, l.forwardRef)((s, a) => {
                        let { className: i, ...n } = s;
                        return (0, l.createElement)(o, { ref: a, iconNode: t, className: r("lucide-".concat(e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()), i), ...n });
                    });
                    return ((s.displayName = "".concat(e)), s);
                };
        },
        3011: (e, t, s) => {
            "use strict";
            (Object.defineProperty(t, "__esModule", { value: !0 }),
                Object.defineProperty(t, "useMergedRef", {
                    enumerable: !0,
                    get: function () {
                        return r;
                    },
                }));
            let l = s(2115);
            function r(e, t) {
                let s = (0, l.useRef)(null),
                    r = (0, l.useRef)(null);
                return (0, l.useCallback)(
                    (l) => {
                        if (null === l) {
                            let e = s.current;
                            e && ((s.current = null), e());
                            let t = r.current;
                            t && ((r.current = null), t());
                        } else (e && (s.current = a(e, l)), t && (r.current = a(t, l)));
                    },
                    [e, t],
                );
            }
            function a(e, t) {
                if ("function" != typeof e)
                    return (
                        (e.current = t),
                        () => {
                            e.current = null;
                        }
                    );
                {
                    let s = e(t);
                    return "function" == typeof s ? s : () => e(null);
                }
            }
            ("function" == typeof t.default || ("object" == typeof t.default && null !== t.default)) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), (e.exports = t.default));
        },
        3166: (e, t, s) => {
            "use strict";
            s.d(t, { z: () => a });
            var l = s(5155),
                r = s(2115);
            function a(e) {
                let { ballType: t = "pokeball", customColor: s = "#ef4444", size: a = 40, className: o = "", isActive: i = !1, style: n } = e,
                    c = "grad-bottom-".concat(t, "-").concat((0, r.useId)().replaceAll(":", "")),
                    d = "custom" === t ? s : "greatball" === t ? "#3b82f6" : "ultraball" === t ? "#f59e0b" : "masterball" === t ? "#ec4899" : "safariball" === t ? "#10b981" : "loveball" === t ? "#ec4899" : "quickball" === t ? "#0ea5e9" : "duskball" === t ? "#14b8a6" : "luxuryball" === t ? "#eab308" : s || "#ef4444",
                    x = i ? "drop-shadow(0 0 10px ".concat(d, ")") : "drop-shadow(0 2px 5px rgba(0,0,0,0.4))";
                return (0, l.jsxs)("svg", {
                    viewBox: "0 0 100 100",
                    width: a,
                    height: a,
                    className: "shrink-0 select-none overflow-visible ".concat(o),
                    style: { colorScheme: "only light", forcedColorAdjust: "none", WebkitForcedColorAdjust: "none", filter: x, ...n },
                    children: [
                        (0, l.jsx)("defs", { children: (0, l.jsxs)("linearGradient", { id: c, x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [(0, l.jsx)("stop", { offset: "0%", stopColor: "#ffffff" }), (0, l.jsx)("stop", { offset: "100%", stopColor: "#cbd5e1" })] }) }),
                        (() => {
                            switch (t) {
                                case "greatball":
                                    return (0, l.jsxs)(l.Fragment, { children: [(0, l.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#3b82f6" }), (0, l.jsx)("path", { d: "M 22 24 C 28 32 30 42 30 50 L 38 50 C 38 40 35 28 28 17 Z", fill: "#ef4444" }), (0, l.jsx)("path", { d: "M 78 24 C 72 32 70 42 70 50 L 62 50 C 62 40 65 28 72 17 Z", fill: "#ef4444" })] });
                                case "ultraball":
                                    return (0, l.jsxs)(l.Fragment, { children: [(0, l.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#1e293b" }), (0, l.jsx)("path", { d: "M 24 16 L 36 24 L 32 50 L 22 50 Z", fill: "#f59e0b" }), (0, l.jsx)("path", { d: "M 76 16 L 64 24 L 68 50 L 78 50 Z", fill: "#f59e0b" }), (0, l.jsx)("path", { d: "M 36 16 Q 50 10 64 16 L 62 23 Q 50 18 38 23 Z", fill: "#f59e0b" })] });
                                case "masterball":
                                    return (0, l.jsxs)(l.Fragment, { children: [(0, l.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#8b5cf6" }), (0, l.jsx)("ellipse", { cx: "28", cy: "30", rx: "9", ry: "8", fill: "#ec4899" }), (0, l.jsx)("ellipse", { cx: "72", cy: "30", rx: "9", ry: "8", fill: "#ec4899" }), (0, l.jsx)("path", { d: "M 43 28 L 47 18 L 50 23 L 53 18 L 57 28 L 54 28 L 52 22 L 50 26 L 48 22 L 46 28 Z", fill: "#ffffff" })] });
                                case "safariball":
                                    return (0, l.jsxs)(l.Fragment, { children: [(0, l.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#10b981" }), (0, l.jsx)("path", { d: "M 18 32 Q 28 20 42 26 Q 34 38 24 44 Z", fill: "#047857", opacity: "0.8" }), (0, l.jsx)("path", { d: "M 58 14 Q 72 18 78 30 Q 66 32 58 24 Z", fill: "#047857", opacity: "0.8" }), (0, l.jsx)("circle", { cx: "50", cy: "34", r: "7", fill: "#34d399", opacity: "0.8" })] });
                                case "loveball":
                                    return (0, l.jsxs)(l.Fragment, { children: [(0, l.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#ec4899" }), (0, l.jsx)("path", { d: "M 50 36 C 47 30 40 30 40 24 C 40 19 45 17 50 22 C 55 17 60 19 60 24 C 60 30 53 30 50 36 Z", fill: "#ffffff" })] });
                                case "quickball":
                                    return (0, l.jsxs)(l.Fragment, { children: [(0, l.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#0ea5e9" }), (0, l.jsx)("path", { d: "M 50 6 L 56 22 L 68 22 L 58 32 L 64 48 L 50 38 L 36 48 L 42 32 L 32 22 L 44 22 Z", fill: "#facc15" })] });
                                case "duskball":
                                    return (0, l.jsxs)(l.Fragment, { children: [(0, l.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#1e293b" }), (0, l.jsx)("circle", { cx: "28", cy: "30", r: "9", fill: "#14b8a6" }), (0, l.jsx)("circle", { cx: "72", cy: "30", r: "9", fill: "#14b8a6" }), (0, l.jsx)("circle", { cx: "50", cy: "22", r: "7", fill: "#f97316" })] });
                                case "luxuryball":
                                    return (0, l.jsxs)(l.Fragment, { children: [(0, l.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#0f172a" }), (0, l.jsx)("path", { d: "M 20 20 Q 50 12 80 20 L 78 26 Q 50 18 22 26 Z", fill: "#eab308" }), (0, l.jsx)("path", { d: "M 24 32 Q 50 24 76 32 L 74 38 Q 50 30 26 38 Z", fill: "#f43f5e" })] });
                                case "custom":
                                    return (0, l.jsxs)(l.Fragment, { children: [(0, l.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: s }), (0, l.jsx)("ellipse", { cx: "32", cy: "24", rx: "14", ry: "6", fill: "#ffffff", opacity: "0.3", transform: "rotate(-20 32 24)" })] });
                                default:
                                    return (0, l.jsxs)(l.Fragment, { children: [(0, l.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: s || "#ef4444" }), (0, l.jsx)("ellipse", { cx: "32", cy: "24", rx: "14", ry: "6", fill: "#ffffff", opacity: "0.3", transform: "rotate(-20 32 24)" })] });
                            }
                        })(),
                        (0, l.jsx)("path", { d: "M 4 50 A 46 46 0 0 0 96 50 Z", fill: "url(#".concat(c, ")") }),
                        (0, l.jsx)("line", { x1: "4", y1: "50", x2: "96", y2: "50", stroke: "#0f172a", strokeWidth: "7" }),
                        (0, l.jsx)("circle", { cx: "50", cy: "50", r: "46", fill: "none", stroke: "#0f172a", strokeWidth: "6" }),
                        (0, l.jsx)("circle", { cx: "50", cy: "50", r: "16", fill: "#0f172a" }),
                        (0, l.jsx)("circle", { cx: "50", cy: "50", r: "10", fill: "#f8fafc" }),
                        (0, l.jsx)("circle", { cx: "50", cy: "50", r: "5", fill: d, className: i ? "animate-pulse" : "" }),
                    ],
                });
            }
        },
        4298: (e, t, s) => {
            "use strict";
            s.d(t, { DY: () => n, G4: () => d, NA: () => a, TU: () => c, d0: () => l, jl: () => u, xV: () => x, zz: () => r });
            let l = 20,
                r = 40,
                a = 160,
                o = /^[a-z][a-z0-9_]{2,19}$/,
                i = new Set(["api", "auth", "login", "logout", "perfil", "profile", "configuracoes", "settings", "collection", "colecao", "dashboard", "cards", "inicio", "home", "admin", "me", "termos", "terms", "privacy", "privacidade", "mypokebinder"]);
            function n(e) {
                let t;
                return (t = ((e || "treinador").split("@")[0] || "treinador")
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-z0-9_]/g, ""))
                    ? (/^[a-z]/.test(t) || (t = "t".concat(t)), t.length > l && (t = t.slice(0, l)), t.length < 3 && (t = "".concat(t, "xxx").slice(0, 3)), i.has(t) && (t = "treinador_".concat(t).slice(0, l)), t)
                    : "treinador";
            }
            function c(e) {
                let t = e.trim().toLowerCase();
                return o.test(t) ? (i.has(t) ? { ok: !1, error: "Este username n\xe3o est\xe1 dispon\xedvel." } : { ok: !0, username: t }) : { ok: !1, error: "Use 3–20 caracteres: comece com letra; s\xf3 letras min\xfasculas, n\xfameros e _." };
            }
            function d(e) {
                let t = e.trim().replace(/\s+/g, " ");
                return t.length < 1 || t.length > r ? { ok: !1, error: "O nome deve ter entre ".concat(1, " e ").concat(r, " caracteres.") } : { ok: !0, displayName: t };
            }
            function x(e) {
                let t = e.trim().replace(/\s+/g, " ");
                return 0 === t.length ? { ok: !0, bio: null } : t.length > a ? { ok: !1, error: "A descri\xe7\xe3o deve ter no m\xe1ximo ".concat(a, " caracteres.") } : { ok: !0, bio: t };
            }
            function u(e) {
                let t = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e) ? e : "#ef4444";
                return { "--theme-primary": t, "--color-poke-blue": t, "--theme-primary-hover": "color-mix(in srgb, ".concat(t, " 85%, black)"), "--theme-primary-glow": "color-mix(in srgb, ".concat(t, " 40%, transparent)") };
            }
        },
        4303: (e, t, s) => {
            "use strict";
            s.d(t, { i: () => i });
            var l = s(5155),
                r = s(2115),
                a = s(1013),
                o = s(3166);
            function i(e) {
                let { size: t = "md", message: s, className: i = "", ballType: n, color: c } = e,
                    d = (0, r.useContext)(a.cm),
                    x = c || (null == d ? void 0 : d.themeColor) || "var(--theme-primary, #ef4444)",
                    u = n || (c ? (0, a.w2)(c) : (null == d ? void 0 : d.ballType) || "pokeball"),
                    m = { sm: { box: "w-8 h-8", px: 32 }, md: { box: "w-16 h-16", px: 64 }, lg: { box: "w-24 h-24", px: 96 } }[t];
                return (0, l.jsxs)("div", {
                    className: "flex flex-col items-center justify-center gap-3 ".concat(i),
                    children: [(0, l.jsx)("div", { className: "relative ".concat(m.box, " animate-pokeball-spin"), children: (0, l.jsx)(o.z, { ballType: u, customColor: x, size: m.px, style: { filter: "drop-shadow(0 0 14px var(--theme-primary-glow))" }, className: "overflow-visible" }) }), s && (0, l.jsx)("p", { className: "text-sm font-medium tracking-wide text-slate-300 animate-pulse", children: s })],
                });
            }
        },
        5299: (e, t, s) => {
            "use strict";
            s.d(t, { A: () => l });
            let l = (0, s(1847).A)("LoaderCircle", [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]]);
        },
        5626: (e, t, s) => {
            "use strict";
            s.d(t, { A: () => l });
            let l = (0, s(1847).A)("ArrowLeft", [
                ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
                ["path", { d: "M19 12H5", key: "x3x0zl" }],
            ]);
        },
        5740: (e, t, s) => {
            "use strict";
            s.d(t, { A: () => l });
            let l = (0, s(1847).A)("Sparkles", [
                ["path", { d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z", key: "4pj2yx" }],
                ["path", { d: "M20 3v4", key: "1olli1" }],
                ["path", { d: "M22 5h-4", key: "1gvqau" }],
                ["path", { d: "M4 17v2", key: "vumght" }],
                ["path", { d: "M5 18H3", key: "zchphs" }],
            ]);
        },
        5917: (e, t, s) => {
            "use strict";
            s.d(t, { A: () => l });
            let l = (0, s(1847).A)("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
        },
        6092: (e, t, s) => {
            "use strict";
            s.d(t, { m: () => r });
            var l = s(2115);
            function r(e, t) {
                let s = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                (0, l.useEffect)(() => {
                    if (!e || s) return;
                    let l = (e) => {
                        "Escape" === e.key && (e.preventDefault(), t());
                    };
                    return (window.addEventListener("keydown", l), () => window.removeEventListener("keydown", l));
                }, [e, t, s]);
            }
        },
        6907: (e, t, s) => {
            "use strict";
            s.d(t, { A: () => l });
            let l = (0, s(1847).A)("ShieldCheck", [
                ["path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z", key: "oel41y" }],
                ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
            ]);
        },
        7424: (e, t, s) => {
            Promise.resolve().then(s.bind(s, 8282));
        },
        7997: (e, t, s) => {
            "use strict";
            s.d(t, { v: () => r });
            var l = s(2115);
            function r(e) {
                let [t, s] = (0, l.useState)(e),
                    [r, a] = (0, l.useState)(e ? "opening" : "closed");
                return (
                    (0, l.useEffect)(() => {
                        if (e) {
                            (s(!0), a("opening"));
                            let e = window.setTimeout(() => a("open"), 420);
                            return () => window.clearTimeout(e);
                        }
                        if (!t) return;
                        a("closing");
                        let l = window.setTimeout(() => {
                            (s(!1), a("closed"));
                        }, 280);
                        return () => window.clearTimeout(l);
                    }, [e, t]),
                    { isPresent: t, state: r }
                );
            }
        },
        8213: (e, t, s) => {
            "use strict";
            s.d(t, { A: () => h, AuthProvider: () => m });
            var l = s(5155),
                r = s(2115),
                a = s(63),
                o = s(6648),
                i = s(4298);
            let n = (0, r.createContext)(null),
                c = "mypokebinder_user_profile";
            function d() {
                try {
                    let e = localStorage.getItem(c);
                    if (!e) return null;
                    return JSON.parse(e);
                } catch (e) {
                    return null;
                }
            }
            function x(e) {
                try {
                    e ? localStorage.setItem(c, JSON.stringify(e)) : localStorage.removeItem(c);
                } catch (e) {}
            }
            async function u(e) {
                var t, s;
                let l = (0, o.U)(),
                    { data: r } = await l.from("profiles").select("username, display_name, avatar_url, bio").eq("id", e.id).maybeSingle(),
                    a = (0, i.DY)(e.email);
                return { id: e.id, email: e.email || void 0, username: (null == r ? void 0 : r.username) || a, name: (null == r ? void 0 : r.display_name) || (null == r ? void 0 : r.username) || a, avatarUrl: (null == r ? void 0 : r.avatar_url) || (null == (t = e.user_metadata) ? void 0 : t.avatar_url) || (null == (s = e.user_metadata) ? void 0 : s.picture) || null, bio: (null == r ? void 0 : r.bio) || "" };
            }
            function m(e) {
                let { children: t, initialUser: s = null } = e,
                    i = (0, a.useRouter)(),
                    [c, m] = (0, r.useState)(() => s || d()),
                    [h, p] = (0, r.useState)(!s && !d()),
                    f = (0, r.useCallback)(async () => {
                        try {
                            let e = (0, o.U)(),
                                { data: t } = await e.auth.getUser();
                            if (t.user) {
                                let e = await u(t.user);
                                (m(e), x(e));
                            } else (m(null), x(null));
                        } catch (e) {
                        } finally {
                            p(!1);
                        }
                    }, []);
                ((0, r.useEffect)(() => {
                    s && (m(s), x(s), p(!1));
                }, [s]),
                    (0, r.useEffect)(() => {
                        let e = d();
                        e && (m((t) => t || e), p(!1));
                        let {
                            data: { subscription: t },
                        } = (0, o.U)().auth.onAuthStateChange((e, t) => {
                            (null == t ? void 0 : t.user)
                                ? u(t.user).then((e) => {
                                      (m(e), x(e), p(!1));
                                  })
                                : "SIGNED_OUT" === e && (m(null), x(null), p(!1));
                        });
                        return (
                            f(),
                            () => {
                                t.unsubscribe();
                            }
                        );
                    }, [f]));
                let b = (0, r.useCallback)(async () => {
                    (p(!0), m(null), x(null));
                    try {
                        let e = (0, o.U)();
                        await e.auth.signOut();
                    } finally {
                        (p(!1), i.push("/login"), i.refresh());
                    }
                }, [i]);
                return (0, l.jsx)(n.Provider, { value: { user: c, isLoading: h, signOut: b, refreshUser: f }, children: t });
            }
            function h() {
                let e = (0, r.useContext)(n);
                if (!e) throw Error("useAuth must be used within an AuthProvider");
                return e;
            }
        },
        8282: (e, t, s) => {
            "use strict";
            (s.r(t), s.d(t, { default: () => M }));
            var l = s(5155),
                r = s(2115),
                a = s(5239),
                o = s(63),
                i = s(1013),
                n = s(8213),
                c = s(8720),
                d = s(5626),
                x = s(1847);
            let u = (0, x.A)("User", [
                    ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
                    ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }],
                ]),
                m = (0, x.A)("LogOut", [
                    ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
                    ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
                    ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }],
                ]);
            var h = s(6907),
                p = s(5917);
            let f = (0, x.A)("Volume2", [
                    ["path", { d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z", key: "uqj9uw" }],
                    ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
                    ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }],
                ]),
                b = (0, x.A)("VolumeX", [
                    ["path", { d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z", key: "uqj9uw" }],
                    ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
                    ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }],
                ]);
            var g = s(5740),
                j = s(9926),
                y = s(1360),
                v = s(5299),
                w = s(3166),
                k = s(6937);
            let N = { 3: 1.15, 6: 1.15, 9: 1.12, 25: 1.55, 94: 1.2, 151: 1.7 };
            function C(e) {
                let { themeColor: t, onSelectColor: s } = e,
                    r = async (e) => {
                        (await s(e.color), c.oR.success("Tema ".concat(e.label, " selecionado!"), { description: "A paleta de ".concat(e.pokemonName, " foi aplicada em toda a interface.") }));
                    };
                return (0, l.jsx)("div", {
                    className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",
                    children: i.b3.map((e) => {
                        var s;
                        let o = t.toLowerCase() === e.color.toLowerCase(),
                            i = null != (s = N[e.dexId]) ? s : 1.15;
                        return (0, l.jsxs)(
                            "button",
                            {
                                type: "button",
                                onClick: () => r(e),
                                className: "group relative flex flex-col overflow-hidden rounded-2xl border p-3.5 sm:p-4 text-left transition-all duration-300 ".concat(o ? "border-white/50 bg-[#161a26] shadow-xl ring-2" : "border-white/10 bg-[#0f121a]/90 hover:border-white/25 hover:bg-[#141824]"),
                                style: { boxShadow: o ? "0 8px 24px ".concat(e.color, "33") : void 0, borderColor: o ? e.color : void 0 },
                                children: [
                                    (0, l.jsxs)("div", {
                                        className: "flex items-stretch justify-between gap-3",
                                        children: [
                                            (0, l.jsxs)("div", {
                                                className: "flex min-w-0 flex-1 items-center gap-2.5",
                                                children: [
                                                    (0, l.jsx)("div", { className: "relative shrink-0", children: (0, l.jsx)(w.z, { ballType: e.ballType, size: 38, isActive: o }) }),
                                                    (0, l.jsxs)("div", {
                                                        className: "min-w-0 flex-1",
                                                        children: [
                                                            (0, l.jsx)("h4", { className: "text-xs sm:text-sm font-extrabold tracking-tight text-white whitespace-nowrap", children: e.label }),
                                                            (0, l.jsxs)("div", {
                                                                className: "mt-0.5 flex items-center gap-1.5 whitespace-nowrap text-[11px]",
                                                                children: [(0, l.jsx)("span", { className: "font-medium text-slate-400 whitespace-nowrap", children: e.ballName }), (0, l.jsx)("span", { className: "text-slate-600 shrink-0", children: "•" }), (0, l.jsx)("span", { className: "shrink-0 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold text-slate-300 whitespace-nowrap", children: e.type })],
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                            (0, l.jsx)("div", { className: "relative flex size-20 shrink-0 items-center justify-center overflow-hidden sm:size-24", children: (0, l.jsx)(a.default, { src: (0, k.AU)(e.dexId), alt: e.pokemonName, width: 96, height: 96, unoptimized: !0, className: "size-full object-contain drop-shadow-md [image-rendering:pixelated]", style: { transform: "scale(".concat(i, ")") } }) }),
                                        ],
                                    }),
                                    (0, l.jsxs)("div", {
                                        className: "mt-3.5 flex items-center justify-between border-t border-white/5 pt-3",
                                        children: [
                                            (0, l.jsxs)("div", { className: "flex items-center gap-2", children: [(0, l.jsx)("span", { className: "h-3 w-3 rounded-full border border-white/20 shadow-sm", style: { backgroundColor: e.color } }), (0, l.jsx)("span", { className: "font-mono text-xs font-semibold text-slate-300", children: e.color.toUpperCase() })] }),
                                            o ? (0, l.jsxs)("span", { className: "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm", style: { backgroundColor: e.color }, children: [(0, l.jsx)(p.A, { size: 12 }), (0, l.jsx)("span", { children: "Ativo" })] }) : (0, l.jsx)("span", { className: "text-[11px] font-medium text-slate-500 transition-colors group-hover:text-slate-300", children: "Selecionar" }),
                                        ],
                                    }),
                                ],
                            },
                            e.id,
                        );
                    }),
                });
            }
            var A = s(4303),
                L = s(4298),
                z = s(6092),
                S = s(7997);
            function M() {
                var e, t, s;
                let x = (0, o.useRouter)(),
                    { themeColor: w, soundEnabled: k, animationsEnabled: N, setThemeColor: M, setSoundEnabled: _, setAnimationsEnabled: E } = (0, i.Qg)(),
                    { user: R, isLoading: U, signOut: Z, refreshUser: T } = (0, n.A)(),
                    [I, F] = (0, r.useState)(!1),
                    [O, P] = (0, r.useState)(!1),
                    [D, Q] = (0, r.useState)(null),
                    [q, V] = (0, r.useState)(""),
                    [H, X] = (0, r.useState)(""),
                    [G, W] = (0, r.useState)(""),
                    [J, $] = (0, r.useState)(""),
                    [B, Y] = (0, r.useState)(!1),
                    [K, ee] = (0, r.useState)(!1),
                    [et, es] = (0, r.useState)(""),
                    [el, er] = (0, r.useState)(!1);
                (0, z.m)(
                    K,
                    () => {
                        (ee(!1), es(""));
                    },
                    el,
                );
                let { isPresent: ea, state: eo } = (0, S.v)(K);
                ((0, r.useEffect)(() => {
                    if (!U && !R) return void x.replace("/login");
                    R && D !== R.id && (Q(R.id), X(R.username || ""), V(R.name || R.username || ""), "string" == typeof R.bio && (W(R.bio), $(R.bio)));
                }, [R, U, D, x]),
                    (0, r.useEffect)(() => {
                        if (!R) return;
                        let e = !1;
                        return (
                            (async () => {
                                try {
                                    var t, s, l;
                                    let r = await fetch("/api/profile?basic=true");
                                    if (!r.ok) return;
                                    let a = (await r.json()).profile;
                                    if (e || !a) return;
                                    let o = (null == (t = a.user) ? void 0 : t.bio) || "";
                                    (W((e) => e || o), $((e) => e || o), (null == (s = a.user) ? void 0 : s.username) && X((e) => e || a.user.username), (null == (l = a.user) ? void 0 : l.name) && V((e) => e || a.user.name));
                                } catch (e) {}
                            })(),
                            () => {
                                e = !0;
                            }
                        );
                    }, [R]));
                let ei = q.trim() !== ((null == R ? void 0 : R.name) || "").trim() || H !== ((null == R ? void 0 : R.username) || "") || G.trim() !== J.trim(),
                    en = async () => {
                        P(!0);
                        try {
                            (await Z(), c.oR.success("Sess\xe3o encerrada com sucesso."));
                        } catch (e) {
                            (c.oR.error("Erro ao encerrar sess\xe3o."), P(!1));
                        }
                    },
                    ec = async () => {
                        if ("EXCLUIR" !== et.trim().toUpperCase()) return void c.oR.error("Digite EXCLUIR para confirmar.");
                        er(!0);
                        try {
                            let e = await fetch("/api/account", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ confirm: "EXCLUIR" }) }),
                                t = await e.json().catch(() => ({}));
                            if (!e.ok) {
                                (c.oR.error(t.error || "N\xe3o foi poss\xedvel excluir a conta."), er(!1));
                                return;
                            }
                            try {
                                for (let e of ["mypokebinder_user_profile", "mypokebinder_theme_color", "mypokebinder_sound_enabled", "mypokebinder_animations_enabled"]) localStorage.removeItem(e);
                                (sessionStorage.removeItem("mypokebinder_collection_filters"), (document.cookie = "mypokebinder_theme_color=; path=/; max-age=0; SameSite=Lax"));
                            } catch (e) {}
                            (ee(!1), c.oR.success("Conta exclu\xedda permanentemente."), await Z());
                        } catch (e) {
                            (c.oR.error("N\xe3o foi poss\xedvel excluir a conta."), er(!1));
                        }
                    },
                    ed = async () => {
                        let e = !k;
                        (await _(e), c.oR.success(e ? "Sons ativados" : "Sons desativados", { description: e ? "Efeitos sonoros ao inserir cartas habilitados." : "Efeitos sonoros silenciados." }));
                    },
                    ex = async () => {
                        let e = !N;
                        (await E(e), c.oR.success(e ? "Anima\xe7\xf5es ativadas" : "Anima\xe7\xf5es desativadas", { description: e ? "Efeitos 3D e folheamento de p\xe1ginas habilitados." : "Efeitos 3D e folheamento de p\xe1ginas desativados." }));
                    },
                    eu = async () => {
                        let e = (0, L.G4)(q);
                        if (!e.ok) return void c.oR.error(e.error);
                        let t = (0, L.TU)(H);
                        if (!t.ok) return void c.oR.error(t.error);
                        let s = (0, L.xV)(G);
                        if (!s.ok) return void c.oR.error(s.error);
                        if (!ei) return void c.oR.message("Nenhuma altera\xe7\xe3o para salvar.");
                        Y(!0);
                        try {
                            var l, r, a;
                            let o = {};
                            (e.displayName !== ((null == R ? void 0 : R.name) || "").trim() && (o.display_name = e.displayName), t.username !== (null == R ? void 0 : R.username) && (o.username = t.username), (s.bio || "") !== J.trim() && (o.bio = null != (l = s.bio) ? l : ""));
                            let i = await fetch("/api/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(o) }),
                                n = await i.json().catch(() => ({}));
                            if (!i.ok) return void c.oR.error(n.error || "N\xe3o foi poss\xedvel salvar o perfil.");
                            ($(null != (r = s.bio) ? r : ""), W(null != (a = s.bio) ? a : ""), await T(), c.oR.success("Perfil atualizado."));
                        } catch (e) {
                            c.oR.error("N\xe3o foi poss\xedvel salvar o perfil.");
                        } finally {
                            Y(!1);
                        }
                    };
                return U
                    ? (0, l.jsx)("div", { className: "flex min-h-screen flex-col", children: (0, l.jsx)("main", { className: "flex flex-1 items-start justify-center bg-[#0a0c10] pt-10 pb-16 sm:pt-14 md:pt-18", children: (0, l.jsx)(A.i, { size: "lg", message: "Carregando configura\xe7\xf5es..." }) }) })
                    : (0, l.jsxs)("div", {
                          className: "flex min-h-screen flex-col",
                          children: [
                              (0, l.jsxs)("main", {
                                  className: "mx-auto flex w-full max-w-6xl flex-1 flex-col gap-5 px-4 py-5 sm:gap-6 sm:px-6 sm:py-8 pb-28 md:pb-16",
                                  children: [
                                      (0, l.jsxs)("div", {
                                          className: "flex flex-col gap-3 sm:gap-4",
                                          children: [
                                              (0, l.jsx)("div", {
                                                  children: (0, l.jsxs)("button", {
                                                      type: "button",
                                                      onClick: () => {
                                                          let e = (null == R ? void 0 : R.username) ? "/perfil/".concat(R.username) : "/perfil";
                                                          x.replace(e);
                                                      },
                                                      className: "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white",
                                                      children: [(0, l.jsx)(d.A, { size: 16 }), (0, l.jsx)("span", { children: "Voltar" })],
                                                  }),
                                              }),
                                              (0, l.jsx)("div", { children: (0, l.jsx)("h1", { className: "text-2xl font-extrabold tracking-tight text-white sm:text-3xl", children: "Configura\xe7\xf5es" }) }),
                                          ],
                                      }),
                                      (0, l.jsxs)("section", {
                                          className: "profile-enter rounded-2xl border border-white/10 bg-[#12151d]/90 p-4 shadow-xl backdrop-blur-md sm:p-6",
                                          children: [
                                              (0, l.jsxs)("div", {
                                                  className: "flex flex-col gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between sm:pb-5",
                                                  children: [
                                                      (0, l.jsxs)("div", {
                                                          className: "flex items-center gap-3",
                                                          children: [(0, l.jsx)("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl border border-poke-blue/30 bg-poke-blue/10 text-poke-blue", children: (0, l.jsx)(u, { size: 18 }) }), (0, l.jsxs)("div", { children: [(0, l.jsx)("h2", { className: "text-base font-bold text-white sm:text-lg", children: "Conta" }), (0, l.jsx)("p", { className: "text-xs text-slate-400", children: "Nome, username e descri\xe7\xe3o" })] })],
                                                      }),
                                                      (0, l.jsxs)("button", { type: "button", onClick: en, disabled: O, className: "hidden items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-xs font-bold text-rose-400 transition-all hover:border-rose-500/60 hover:bg-rose-500/20 hover:text-rose-200 disabled:opacity-50 sm:inline-flex", children: [(0, l.jsx)(m, { size: 15 }), (0, l.jsx)("span", { children: O ? "Saindo..." : "Sair da conta" })] }),
                                                  ],
                                              }),
                                              (0, l.jsxs)("div", {
                                                  className: "mt-5 flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8",
                                                  children: [
                                                      (0, l.jsx)("div", {
                                                          className: "flex shrink-0 items-center gap-3.5 lg:w-56 lg:flex-col lg:items-start",
                                                          children:
                                                              U && !R
                                                                  ? (0, l.jsxs)(l.Fragment, { children: [(0, l.jsx)("div", { className: "h-16 w-16 shrink-0 animate-pulse rounded-full border border-white/10 bg-white/10" }), (0, l.jsxs)("div", { className: "flex flex-col gap-2", children: [(0, l.jsx)("div", { className: "h-4 w-28 animate-pulse rounded bg-white/10" }), (0, l.jsx)("div", { className: "h-3 w-36 animate-pulse rounded bg-white/5" })] })] })
                                                                  : (0, l.jsxs)(l.Fragment, {
                                                                        children: [
                                                                            (null == R ? void 0 : R.avatarUrl) && !I
                                                                                ? (0, l.jsx)(a.default, { src: R.avatarUrl, alt: R.name || R.username || "Avatar", width: 64, height: 64, className: "h-16 w-16 rounded-full border border-white/20 bg-white/10 object-cover shadow-sm ring-1 ring-white/10", referrerPolicy: "no-referrer", onError: () => F(!0), unoptimized: !0 })
                                                                                : (0, l.jsx)("div", { className: "flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xl font-bold text-white shadow-sm", children: ((null == R || null == (e = R.name) ? void 0 : e[0]) || (null == R || null == (t = R.username) ? void 0 : t[0]) || (null == R || null == (s = R.email) ? void 0 : s[0]) || "P").toUpperCase() }),
                                                                            (0, l.jsxs)("div", {
                                                                                className: "flex min-w-0 flex-col",
                                                                                children: [
                                                                                    (0, l.jsx)("span", { className: "truncate text-sm font-bold text-white", children: (null == R ? void 0 : R.name) || (null == R ? void 0 : R.username) || "Treinador" }),
                                                                                    (0, l.jsxs)("span", { className: "truncate font-mono text-xs text-poke-blue", children: ["@", (null == R ? void 0 : R.username) || "treinador"] }),
                                                                                    (0, l.jsx)("span", { className: "mt-1 truncate text-[11px] text-slate-500", children: null == R ? void 0 : R.email }),
                                                                                    (0, l.jsxs)("div", { className: "mt-1.5 flex items-center gap-1.5 text-[10px] font-medium text-emerald-400", children: [(0, l.jsx)(h.A, { size: 12 }), (0, l.jsx)("span", { children: "Conta conectada" })] }),
                                                                                ],
                                                                            }),
                                                                        ],
                                                                    }),
                                                      }),
                                                      (0, l.jsxs)("div", {
                                                          className: "min-w-0 flex-1 space-y-4",
                                                          children: [
                                                              (0, l.jsxs)("div", {
                                                                  className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
                                                                  children: [
                                                                      (0, l.jsxs)("label", {
                                                                          className: "flex flex-col gap-1.5",
                                                                          children: [
                                                                              (0, l.jsx)("span", { className: "text-xs font-semibold text-slate-300", children: "Nome" }),
                                                                              (0, l.jsx)("input", { type: "text", value: q, onChange: (e) => V(e.target.value.slice(0, L.zz)), maxLength: L.zz, autoComplete: "nickname", className: "w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm font-semibold text-white outline-none transition-colors placeholder:text-slate-600 focus:border-poke-blue/50 focus:ring-1 focus:ring-poke-blue/30", placeholder: "Como quer ser chamado" }),
                                                                          ],
                                                                      }),
                                                                      (0, l.jsxs)("label", {
                                                                          className: "flex flex-col gap-1.5",
                                                                          children: [
                                                                              (0, l.jsx)("span", { className: "text-xs font-semibold text-slate-300", children: "Username" }),
                                                                              (0, l.jsxs)("div", {
                                                                                  className: "relative",
                                                                                  children: [
                                                                                      (0, l.jsx)("span", { className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500", children: "@" }),
                                                                                      (0, l.jsx)("input", {
                                                                                          type: "text",
                                                                                          value: H,
                                                                                          onChange: (e) =>
                                                                                              X(
                                                                                                  e.target.value
                                                                                                      .toLowerCase()
                                                                                                      .replace(/[^a-z0-9_]/g, "")
                                                                                                      .slice(0, L.d0),
                                                                                              ),
                                                                                          maxLength: L.d0,
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
                                                              (0, l.jsxs)("label", {
                                                                  className: "flex flex-col gap-1.5",
                                                                  children: [
                                                                      (0, l.jsx)("span", { className: "text-xs font-semibold text-slate-300", children: "Descri\xe7\xe3o" }),
                                                                      (0, l.jsx)("textarea", { value: G, onChange: (e) => W(e.target.value.slice(0, L.NA)), maxLength: L.NA, rows: 3, className: "w-full resize-none rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-poke-blue/50 focus:ring-1 focus:ring-poke-blue/30", placeholder: "Conte um pouco sobre a sua cole\xe7\xe3o" }),
                                                                      (0, l.jsxs)("span", { className: "text-[10px] text-slate-500", children: [G.trim().length, "/", L.NA] }),
                                                                  ],
                                                              }),
                                                              (0, l.jsx)("div", {
                                                                  className: "flex justify-end",
                                                                  children: (0, l.jsxs)("button", {
                                                                      type: "button",
                                                                      onClick: eu,
                                                                      disabled: B || !ei,
                                                                      className: "inline-flex items-center justify-center gap-2 rounded-xl border border-poke-blue/40 bg-poke-blue/15 px-4 py-2.5 text-xs font-bold text-white transition-all hover:border-poke-blue/60 hover:bg-poke-blue/25 disabled:cursor-not-allowed disabled:opacity-50",
                                                                      children: [(0, l.jsx)(p.A, { size: 14 }), (0, l.jsx)("span", { children: B ? "Salvando..." : "Salvar altera\xe7\xf5es" })],
                                                                  }),
                                                              }),
                                                          ],
                                                      }),
                                                  ],
                                              }),
                                          ],
                                      }),
                                      (0, l.jsxs)("button", { type: "button", onClick: en, disabled: O, className: "inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs font-bold text-rose-400 transition-all hover:border-rose-500/60 hover:bg-rose-500/20 hover:text-rose-200 disabled:opacity-50 sm:hidden", children: [(0, l.jsx)(m, { size: 15 }), (0, l.jsx)("span", { children: O ? "Saindo..." : "Sair da conta" })] }),
                                      (0, l.jsxs)("div", {
                                          className: "profile-enter profile-enter-d1 grid grid-cols-1 gap-4 sm:grid-cols-2",
                                          children: [
                                              (0, l.jsxs)("section", {
                                                  className: "flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#12151d]/90 px-4 py-3.5 shadow-lg backdrop-blur-md",
                                                  children: [
                                                      (0, l.jsxs)("div", {
                                                          className: "flex items-center gap-3",
                                                          children: [
                                                              (0, l.jsx)("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-poke-blue/30 bg-poke-blue/10 text-poke-blue", children: k ? (0, l.jsx)(f, { size: 16 }) : (0, l.jsx)(b, { size: 16 }) }),
                                                              (0, l.jsxs)("div", { className: "min-w-0", children: [(0, l.jsx)("h2", { className: "text-sm font-bold text-white", children: "Sons do Binder" }), (0, l.jsx)("p", { className: "text-[11px] text-slate-400", children: "Impacto ao inserir cartas" })] }),
                                                          ],
                                                      }),
                                                      (0, l.jsx)("button", { type: "button", role: "switch", "aria-checked": k, onClick: ed, className: "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 focus:outline-none ".concat(k ? "bg-poke-blue" : "bg-white/20"), children: (0, l.jsx)("span", { className: "inline-block h-4 w-4 rounded-full bg-white transition-transform duration-200 ".concat(k ? "translate-x-4" : "translate-x-0") }) }),
                                                  ],
                                              }),
                                              (0, l.jsxs)("section", {
                                                  className: "flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#12151d]/90 px-4 py-3.5 shadow-lg backdrop-blur-md",
                                                  children: [
                                                      (0, l.jsxs)("div", {
                                                          className: "flex items-center gap-3",
                                                          children: [
                                                              (0, l.jsx)("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-poke-blue/30 bg-poke-blue/10 text-poke-blue", children: (0, l.jsx)(g.A, { size: 16 }) }),
                                                              (0, l.jsxs)("div", { className: "min-w-0", children: [(0, l.jsx)("h2", { className: "text-sm font-bold text-white", children: "Anima\xe7\xf5es e Efeitos" }), (0, l.jsx)("p", { className: "text-[11px] text-slate-400", children: "Cartas 3D, folheamento e part\xedculas" })] }),
                                                          ],
                                                      }),
                                                      (0, l.jsx)("button", { type: "button", role: "switch", "aria-checked": N, onClick: ex, className: "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors duration-200 focus:outline-none ".concat(N ? "bg-poke-blue" : "bg-white/20"), children: (0, l.jsx)("span", { className: "inline-block h-4 w-4 rounded-full bg-white transition-transform duration-200 ".concat(N ? "translate-x-4" : "translate-x-0") }) }),
                                                  ],
                                              }),
                                          ],
                                      }),
                                      (0, l.jsxs)("section", {
                                          className: "profile-enter profile-enter-d2 rounded-2xl border border-white/10 bg-[#12151d]/90 p-4 shadow-xl backdrop-blur-md sm:p-6",
                                          children: [
                                              (0, l.jsxs)("div", {
                                                  className: "flex items-center gap-2.5 border-b border-white/10 pb-3.5 sm:pb-4",
                                                  children: [
                                                      (0, l.jsx)("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl border border-poke-blue/30 bg-poke-blue/10 text-poke-blue", children: (0, l.jsx)(j.A, { size: 18 }) }),
                                                      (0, l.jsxs)("div", { className: "min-w-0", children: [(0, l.jsx)("h2", { className: "text-base font-bold text-white sm:text-lg", children: "Tema do Treinador" }), (0, l.jsx)("p", { className: "text-xs text-slate-400", children: "Escolha a Pok\xe9bola e a cor de destaque" })] }),
                                                  ],
                                              }),
                                              (0, l.jsx)("div", { className: "mt-4 sm:mt-5", children: (0, l.jsx)(C, { themeColor: w, onSelectColor: M }) }),
                                          ],
                                      }),
                                      (0, l.jsxs)("section", {
                                          className: "profile-enter profile-enter-d3 rounded-2xl border border-rose-500/20 bg-[#12151d]/90 p-4 shadow-xl backdrop-blur-md sm:p-6",
                                          children: [
                                              (0, l.jsxs)("div", {
                                                  className: "flex items-center gap-2.5 border-b border-white/10 pb-3.5 sm:pb-4",
                                                  children: [
                                                      (0, l.jsx)("div", { className: "flex h-9 w-9 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400", children: (0, l.jsx)(y.A, { size: 18 }) }),
                                                      (0, l.jsxs)("div", { className: "min-w-0", children: [(0, l.jsx)("h2", { className: "text-base font-bold text-white sm:text-lg", children: "Zona de perigo" }), (0, l.jsx)("p", { className: "text-xs text-slate-400", children: "Exclus\xe3o permanente da conta e de todos os dados" })] }),
                                                  ],
                                              }),
                                              (0, l.jsxs)("div", {
                                                  className: "mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row sm:items-center sm:justify-between",
                                                  children: [
                                                      (0, l.jsx)("p", { className: "max-w-xl text-xs leading-relaxed text-slate-400", children: "Apaga perfil, cole\xe7\xe3o, binder, prefer\xeancias e o v\xednculo de login com o Google neste app. Esta a\xe7\xe3o n\xe3o pode ser desfeita." }),
                                                      (0, l.jsxs)("button", {
                                                          type: "button",
                                                          onClick: () => {
                                                              (es(""), ee(!0));
                                                          },
                                                          disabled: el || O,
                                                          className: "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/15 px-4 py-2.5 text-xs font-bold text-rose-300 transition-all hover:border-rose-500/60 hover:bg-rose-500/25 hover:text-rose-100 disabled:opacity-50",
                                                          children: [(0, l.jsx)(y.A, { size: 15 }), (0, l.jsx)("span", { children: "Excluir conta" })],
                                                      }),
                                                  ],
                                              }),
                                          ],
                                      }),
                                  ],
                              }),
                              ea &&
                                  (0, l.jsx)("div", {
                                      className: "modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-sm",
                                      "data-overlay-state": eo,
                                      role: "dialog",
                                      "aria-modal": "true",
                                      "aria-label": "Confirmar exclus\xe3o da conta",
                                      onClick: (e) => {
                                          e.target !== e.currentTarget || el || (ee(!1), es(""));
                                      },
                                      children: (0, l.jsxs)("div", {
                                          className: "modal-surface flex h-dvh max-h-none w-full max-w-none flex-col gap-4 overflow-y-auto rounded-none border-0 bg-[#141722] p-6 shadow-2xl sm:h-auto sm:max-w-md sm:rounded-2xl sm:border sm:border-rose-500/30",
                                          children: [
                                              (0, l.jsxs)("div", {
                                                  className: "flex items-center gap-3",
                                                  children: [(0, l.jsx)("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-rose-500/15 text-rose-400", children: (0, l.jsx)(y.A, { size: 22 }) }), (0, l.jsxs)("div", { children: [(0, l.jsx)("h3", { className: "text-base font-bold text-white", children: "Excluir conta permanentemente?" }), (0, l.jsx)("p", { className: "text-xs text-slate-400", children: "Todos os seus dados ser\xe3o apagados." })] })],
                                              }),
                                              (0, l.jsxs)("p", { className: "text-xs leading-relaxed text-slate-300", children: ["Isso remove seu perfil, todas as cartas da cole\xe7\xe3o e do binder, prefer\xeancias e a sess\xe3o vinculada ao Google. Digite ", (0, l.jsx)("strong", { className: "text-white", children: "EXCLUIR" }), " para confirmar."] }),
                                              (0, l.jsxs)("label", {
                                                  className: "flex flex-col gap-1.5",
                                                  children: [
                                                      (0, l.jsx)("span", { className: "sr-only", children: "Confirma\xe7\xe3o" }),
                                                      (0, l.jsx)("input", { type: "text", value: et, onChange: (e) => es(e.target.value), disabled: el, autoComplete: "off", spellCheck: !1, placeholder: "EXCLUIR", className: "w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm font-semibold tracking-wide text-white outline-none transition-colors placeholder:text-slate-600 focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/30 disabled:opacity-50" }),
                                                  ],
                                              }),
                                              (0, l.jsxs)("div", {
                                                  className: "mt-1 flex items-center justify-end gap-3",
                                                  children: [
                                                      (0, l.jsx)("button", {
                                                          type: "button",
                                                          onClick: () => {
                                                              (ee(!1), es(""));
                                                          },
                                                          disabled: el,
                                                          className: "cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 disabled:opacity-50",
                                                          children: "Cancelar",
                                                      }),
                                                      (0, l.jsxs)("button", {
                                                          type: "button",
                                                          onClick: ec,
                                                          disabled: el || "EXCLUIR" !== et.trim().toUpperCase(),
                                                          className: "flex cursor-pointer items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-rose-600/30 transition-all hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-50",
                                                          children: [el && (0, l.jsx)(v.A, { size: 14, className: "animate-spin" }), (0, l.jsx)("span", { children: el ? "Excluindo..." : "Sim, excluir conta" })],
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
        9926: (e, t, s) => {
            "use strict";
            s.d(t, { A: () => l });
            let l = (0, s(1847).A)("Palette", [
                ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
                ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
                ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }],
                ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
                ["path", { d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z", key: "12rzf8" }],
            ]);
        },
    },
    (e) => {
        (e.O(0, [5730, 235, 5239, 8720, 1013, 6937, 8441, 1255, 7358], () => e((e.s = 7424))), (_N_E = e.O()));
    },
]);
