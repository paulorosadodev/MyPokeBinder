(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [7177],
    {
        841: (e, t, r) => {
            (Promise.resolve().then(r.t.bind(r, 8065, 23)), Promise.resolve().then(r.t.bind(r, 3673, 23)), Promise.resolve().then(r.bind(r, 8626)), Promise.resolve().then(r.bind(r, 7286)), Promise.resolve().then(r.bind(r, 8213)), Promise.resolve().then(r.bind(r, 1013)));
        },
        1847: (e, t, r) => {
            "use strict";
            r.d(t, { A: () => n });
            var a = r(2115);
            let l = function () {
                for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                return t
                    .filter((e, t, r) => !!e && "" !== e.trim() && r.indexOf(e) === t)
                    .join(" ")
                    .trim();
            };
            var s = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
            let i = (0, a.forwardRef)((e, t) => {
                    let { color: r = "currentColor", size: i = 24, strokeWidth: n = 2, absoluteStrokeWidth: o, className: c = "", children: d, iconNode: u, ...m } = e;
                    return (0, a.createElement)("svg", { ref: t, ...s, width: i, height: i, stroke: r, strokeWidth: o ? (24 * Number(n)) / Number(i) : n, className: l("lucide", c), ...m }, [
                        ...u.map((e) => {
                            let [t, r] = e;
                            return (0, a.createElement)(t, r);
                        }),
                        ...(Array.isArray(d) ? d : [d]),
                    ]);
                }),
                n = (e, t) => {
                    let r = (0, a.forwardRef)((r, s) => {
                        let { className: n, ...o } = r;
                        return (0, a.createElement)(i, { ref: s, iconNode: t, className: l("lucide-".concat(e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()), n), ...o });
                    });
                    return ((r.displayName = "".concat(e)), r);
                };
        },
        3673: () => {},
        4298: (e, t, r) => {
            "use strict";
            r.d(t, { DY: () => o, G4: () => d, NA: () => s, TU: () => c, d0: () => a, jl: () => m, xV: () => u, zz: () => l });
            let a = 20,
                l = 40,
                s = 160,
                i = /^[a-z][a-z0-9_]{2,19}$/,
                n = new Set(["api", "auth", "login", "logout", "perfil", "profile", "configuracoes", "settings", "collection", "colecao", "dashboard", "cards", "inicio", "home", "admin", "me", "termos", "terms", "privacy", "privacidade", "mypokebinder"]);
            function o(e) {
                let t;
                return (t = ((e || "treinador").split("@")[0] || "treinador")
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-z0-9_]/g, ""))
                    ? (/^[a-z]/.test(t) || (t = "t".concat(t)), t.length > a && (t = t.slice(0, a)), t.length < 3 && (t = "".concat(t, "xxx").slice(0, 3)), n.has(t) && (t = "treinador_".concat(t).slice(0, a)), t)
                    : "treinador";
            }
            function c(e) {
                let t = e.trim().toLowerCase();
                return i.test(t) ? (n.has(t) ? { ok: !1, error: "Este username n\xe3o est\xe1 dispon\xedvel." } : { ok: !0, username: t }) : { ok: !1, error: "Use 3–20 caracteres: comece com letra; s\xf3 letras min\xfasculas, n\xfameros e _." };
            }
            function d(e) {
                let t = e.trim().replace(/\s+/g, " ");
                return t.length < 1 || t.length > l ? { ok: !1, error: "O nome deve ter entre ".concat(1, " e ").concat(l, " caracteres.") } : { ok: !0, displayName: t };
            }
            function u(e) {
                let t = e.trim().replace(/\s+/g, " ");
                return 0 === t.length ? { ok: !0, bio: null } : t.length > s ? { ok: !1, error: "A descri\xe7\xe3o deve ter no m\xe1ximo ".concat(s, " caracteres.") } : { ok: !0, bio: t };
            }
            function m(e) {
                let t = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e) ? e : "#ef4444";
                return { "--theme-primary": t, "--color-poke-blue": t, "--theme-primary-hover": "color-mix(in srgb, ".concat(t, " 85%, black)"), "--theme-primary-glow": "color-mix(in srgb, ".concat(t, " 40%, transparent)") };
            }
        },
        6132: (e, t, r) => {
            "use strict";
            r.d(t, { A: () => a });
            let a = (0, r(1847).A)("CircleAlert", [
                ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
                ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
                ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }],
            ]);
        },
        7286: (e, t, r) => {
            "use strict";
            r.d(t, { AppToaster: () => c });
            var a = r(5155),
                l = r(8720),
                s = r(1847);
            let i = (0, s.A)("CircleCheck", [
                ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
                ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
            ]);
            var n = r(6132);
            let o = (0, s.A)("Info", [
                ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
                ["path", { d: "M12 16v-4", key: "1dtifu" }],
                ["path", { d: "M12 8h.01", key: "e9boi3" }],
            ]);
            function c() {
                return (0, a.jsx)(l.l$, { position: "top-right", theme: "dark", duration: 3500, icons: { success: (0, a.jsx)(i, { className: "h-4 w-4 text-emerald-400" }), error: (0, a.jsx)(n.A, { className: "h-4 w-4 text-red-400" }), info: (0, a.jsx)(o, { className: "h-4 w-4 text-poke-blue" }) }, toastOptions: { className: "mypokebinder-toast" } });
            }
        },
        7937: (e, t, r) => {
            "use strict";
            r.d(t, { A: () => a });
            let a = (0, r(1847).A)("BookOpen", [
                ["path", { d: "M12 7v14", key: "1akyts" }],
                ["path", { d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z", key: "ruj8y" }],
            ]);
        },
        8065: (e) => {
            e.exports = { style: { fontFamily: "'Outfit', 'Outfit Fallback'", fontStyle: "normal" }, className: "__className_ed3508", variable: "__variable_ed3508" };
        },
        8213: (e, t, r) => {
            "use strict";
            r.d(t, { A: () => f, AuthProvider: () => h });
            var a = r(5155),
                l = r(2115),
                s = r(63),
                i = r(6648),
                n = r(4298);
            let o = (0, l.createContext)(null),
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
            function u(e) {
                try {
                    e ? localStorage.setItem(c, JSON.stringify(e)) : localStorage.removeItem(c);
                } catch (e) {}
            }
            async function m(e) {
                var t, r;
                let a = (0, i.U)(),
                    { data: l } = await a.from("profiles").select("username, display_name, avatar_url, bio").eq("id", e.id).maybeSingle(),
                    s = (0, n.DY)(e.email);
                return { id: e.id, email: e.email || void 0, username: (null == l ? void 0 : l.username) || s, name: (null == l ? void 0 : l.display_name) || (null == l ? void 0 : l.username) || s, avatarUrl: (null == l ? void 0 : l.avatar_url) || (null == (t = e.user_metadata) ? void 0 : t.avatar_url) || (null == (r = e.user_metadata) ? void 0 : r.picture) || null, bio: (null == l ? void 0 : l.bio) || "" };
            }
            function h(e) {
                let { children: t, initialUser: r = null } = e,
                    n = (0, s.useRouter)(),
                    [c, h] = (0, l.useState)(() => r || d()),
                    [f, x] = (0, l.useState)(!r && !d()),
                    p = (0, l.useCallback)(async () => {
                        try {
                            let e = (0, i.U)(),
                                { data: t } = await e.auth.getUser();
                            if (t.user) {
                                let e = await m(t.user);
                                (h(e), u(e));
                            } else (h(null), u(null));
                        } catch (e) {
                        } finally {
                            x(!1);
                        }
                    }, []);
                ((0, l.useEffect)(() => {
                    r && (h(r), u(r), x(!1));
                }, [r]),
                    (0, l.useEffect)(() => {
                        let e = d();
                        e && (h((t) => t || e), x(!1));
                        let {
                            data: { subscription: t },
                        } = (0, i.U)().auth.onAuthStateChange((e, t) => {
                            (null == t ? void 0 : t.user)
                                ? m(t.user).then((e) => {
                                      (h(e), u(e), x(!1));
                                  })
                                : "SIGNED_OUT" === e && (h(null), u(null), x(!1));
                        });
                        return (
                            p(),
                            () => {
                                t.unsubscribe();
                            }
                        );
                    }, [p]));
                let b = (0, l.useCallback)(async () => {
                    (x(!0), h(null), u(null));
                    try {
                        let e = (0, i.U)();
                        await e.auth.signOut();
                    } finally {
                        (x(!1), n.push("/login"), n.refresh());
                    }
                }, [n]);
                return (0, a.jsx)(o.Provider, { value: { user: c, isLoading: f, signOut: b, refreshUser: p }, children: t });
            }
            function f() {
                let e = (0, l.useContext)(o);
                if (!e) throw Error("useAuth must be used within an AuthProvider");
                return e;
            }
        },
        8591: (e, t, r) => {
            "use strict";
            (r.r(t), r.d(t, { PokeballLogo: () => n }));
            var a = r(5155),
                l = r(2115),
                s = r(1013);
            let i = { xs: "w-6 h-6", sm: "w-8 h-8", md: "w-12 h-12", lg: "w-16 h-16", xl: "w-20 h-20" };
            function n(e) {
                let { size: t = "sm", className: r = "", animated: n = !1, glow: o = "normal", color: c, ballType: d } = e,
                    u = (0, l.useContext)(s.cm),
                    m = i[t],
                    h = d || (c ? (0, s.w2)(c) : (null == u ? void 0 : u.ballType) || "pokeball"),
                    f = c || "var(--theme-primary, #ef4444)",
                    x = c ? "color-mix(in srgb, ".concat(c, " 40%, transparent)") : "var(--theme-primary-glow, rgba(239, 68, 68, 0.4))",
                    p = c ? "color-mix(in srgb, ".concat(c, " 50%, transparent)") : "var(--theme-primary-glow, rgba(239, 68, 68, 0.5))";
                return (0, a.jsx)("div", {
                    className: "relative inline-flex items-center justify-center shrink-0 ".concat(m, " ").concat(r),
                    children: (0, a.jsxs)("svg", {
                        viewBox: "0 0 100 100",
                        width: "100%",
                        height: "100%",
                        style: { colorScheme: "only light", forcedColorAdjust: "none", WebkitForcedColorAdjust: "none", ...("subtle" === o ? { filter: "drop-shadow(0 0 6px ".concat(x, ")") } : "normal" === o ? { filter: "drop-shadow(0 0 12px ".concat(p, ")") } : void 0) },
                        className: "overflow-visible",
                        children: [
                            (() => {
                                switch (h) {
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
                                    default:
                                        return (0, a.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: f });
                                }
                            })(),
                            (0, a.jsx)("path", { d: "M 4 50 A 46 46 0 0 0 96 50 Z", fill: "#f8fafc" }),
                            (0, a.jsx)("line", { x1: "4", y1: "50", x2: "96", y2: "50", stroke: "#0f172a", strokeWidth: "8" }),
                            (0, a.jsx)("circle", { cx: "50", cy: "50", r: "46", fill: "none", stroke: "#0f172a", strokeWidth: "8" }),
                            (0, a.jsx)("circle", { cx: "50", cy: "50", r: "16", fill: "#0f172a" }),
                            (0, a.jsx)("circle", { cx: "50", cy: "50", r: "10", fill: "#f8fafc" }),
                            (0, a.jsx)("circle", { cx: "50", cy: "50", r: "5", fill: f, className: n ? "animate-pulse" : "" }),
                        ],
                    }),
                });
            }
        },
        8626: (e, t, r) => {
            "use strict";
            r.d(t, { AppShell: () => p });
            var a = r(5155),
                l = r(63),
                s = r(2115),
                i = r(5239),
                n = r(2619),
                o = r.n(n),
                c = r(7937),
                d = r(9397),
                u = r(8591);
            function m() {
                let e = (0, l.usePathname)(),
                    [t, r] = (0, s.useState)(null),
                    i = [
                        { href: "/", label: "Binders", icon: c.A, isActive: "/" === e || e.startsWith("/binders") },
                        { href: "/collection", label: "Cole\xe7\xe3o", icon: d.A, isActive: e.startsWith("/collection") || e.startsWith("/cards") },
                    ];
                (0, s.useEffect)(() => {
                    r(null);
                }, [e]);
                let n = null !== t ? t : i.findIndex((e) => e.isActive);
                return (0, a.jsx)("nav", {
                    "aria-label": "Navega\xe7\xe3o mobile",
                    className: "fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0a0c10]/92 backdrop-blur-xl md:hidden",
                    children: (0, a.jsx)("div", {
                        className: "mx-auto max-w-md px-3 pt-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))]",
                        children: (0, a.jsxs)("div", {
                            className: "relative flex items-center justify-around rounded-2xl border border-white/10 bg-white/[0.04] p-1 shadow-inner backdrop-blur-md",
                            children: [
                                (0, a.jsx)("div", { style: { transform: "translate3d(".concat(n >= 0 ? 100 * n : 0, "%, 0, 0)"), width: "calc((100% - 8px) / 2)", opacity: +(n >= 0) }, className: "pointer-events-none absolute top-1 bottom-1 left-1 rounded-xl border border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/20 shadow-[0_0_12px_var(--theme-primary-glow)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" }),
                                i.map((e, t) => {
                                    let l = e.icon,
                                        s = n === t;
                                    return (0, a.jsxs)(
                                        o(),
                                        {
                                            href: e.href,
                                            prefetch: !0,
                                            onClick: () => r(t),
                                            "aria-current": s ? "page" : void 0,
                                            className: "relative z-10 flex min-h-[46px] flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1 px-2 transition-all duration-200 select-none active:scale-95 ".concat(s ? "text-white font-bold" : "text-slate-400 hover:text-slate-200"),
                                            children: [(0, a.jsx)(l, { size: 18, className: "transition-transform duration-200 ".concat(s ? "scale-105 text-[var(--theme-primary)] drop-shadow-sm" : "text-slate-400") }), (0, a.jsx)("span", { className: "text-[11px] tracking-tight transition-colors duration-200 ".concat(s ? "font-bold text-white" : "font-medium text-slate-400"), children: e.label })],
                                        },
                                        e.href,
                                    );
                                }),
                            ],
                        }),
                    }),
                });
            }
            var h = r(8213);
            function f(e) {
                var t, r;
                let { userEmail: n, userAvatar: f } = e,
                    x = (0, l.usePathname)(),
                    { user: p, isLoading: b } = (0, h.A)(),
                    [v, g] = (0, s.useState)(!1),
                    [y, w] = (0, s.useState)(null);
                (0, s.useEffect)(() => {
                    w(null);
                }, [x]);
                let j = null != n ? n : null == p ? void 0 : p.email,
                    k = null != f ? f : null == p ? void 0 : p.avatarUrl,
                    A = [
                        { href: "/", label: "Binders", icon: c.A, isActive: "/" === x || x.startsWith("/binders") },
                        { href: "/collection", label: "Cole\xe7\xe3o", icon: d.A, isActive: x.startsWith("/collection") || x.startsWith("/cards") },
                    ],
                    N = !!((null == p ? void 0 : p.username) && x === "/perfil/".concat(p.username)),
                    _ = "/perfil" === x || N || x.startsWith("/configuracoes"),
                    C = A.findIndex((e) => e.isActive),
                    L = null !== y ? y : _ ? 2 : C,
                    M = (null == p ? void 0 : p.username) ? "/perfil/".concat(p.username) : "/perfil",
                    z = (null == p ? void 0 : p.name) || (null == p ? void 0 : p.username) || (null == j ? void 0 : j.split("@")[0]) || "Meu Perfil",
                    P = ((null == p || null == (t = p.name) ? void 0 : t[0]) || (null == p || null == (r = p.username) ? void 0 : r[0]) || (null == j ? void 0 : j[0]) || "P").toUpperCase();
                return (0, a.jsxs)(a.Fragment, {
                    children: [
                        (0, a.jsx)("header", {
                            className: "sticky top-0 z-50 border-b border-white/10 bg-[#0a0c10]/80 backdrop-blur-md",
                            children: (0, a.jsxs)("div", {
                                className: "mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:px-6 sm:py-3",
                                children: [
                                    (0, a.jsxs)("div", {
                                        className: "flex items-center gap-3 sm:gap-6",
                                        children: [
                                            (0, a.jsxs)(o(), { href: "/", prefetch: !0, className: "flex shrink-0 items-center gap-2 sm:gap-2.5 no-underline", children: [(0, a.jsx)(u.PokeballLogo, { size: "sm", animated: !0, glow: "subtle" }), (0, a.jsx)("span", { className: "bg-gradient-to-r from-white to-slate-400 bg-clip-text text-sm font-extrabold tracking-tight text-transparent sm:text-lg", children: "MyPokeBinder" })] }),
                                            (0, a.jsxs)("nav", {
                                                "aria-label": "Navega\xe7\xe3o de p\xe1ginas",
                                                className: "relative hidden items-center p-1 md:flex",
                                                children: [
                                                    (0, a.jsx)("div", { style: { transform: "translate3d(".concat(L >= 0 ? 100 * L : 0, "%, 0, 0)"), width: "calc((100% - 8px) / 2)", opacity: +!!(L >= 0 && L < 2) }, className: "pointer-events-none absolute top-1 bottom-1 left-1 rounded-xl border border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/20 shadow-[0_0_12px_var(--theme-primary-glow)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" }),
                                                    A.map((e, t) => {
                                                        let r = e.icon,
                                                            l = L === t;
                                                        return (0, a.jsxs)(
                                                            o(),
                                                            {
                                                                href: e.href,
                                                                prefetch: !0,
                                                                onClick: () => w(t),
                                                                "aria-current": l ? "page" : void 0,
                                                                className: "relative z-10 flex w-32 items-center justify-center gap-2 py-2 text-sm font-semibold transition-colors duration-200 select-none ".concat(l ? "text-white font-bold" : "text-slate-400 hover:text-slate-200"),
                                                                children: [(0, a.jsx)(r, { size: 16, className: "transition-transform duration-200 ".concat(l ? "scale-105 text-[var(--theme-primary)]" : "text-slate-400") }), (0, a.jsx)("span", { children: e.label })],
                                                            },
                                                            e.href,
                                                        );
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, a.jsx)("div", {
                                        className: "flex items-center gap-2 sm:gap-3.5",
                                        children:
                                            !b || (null == p ? void 0 : p.username) || j || k
                                                ? (null == p ? void 0 : p.username) || j || k || _
                                                    ? (0, a.jsxs)(o(), {
                                                          href: M,
                                                          prefetch: !0,
                                                          title: "Meu Perfil",
                                                          "aria-label": "Meu Perfil",
                                                          onClick: () => w(2),
                                                          "aria-current": 2 === L ? "page" : void 0,
                                                          className: "group flex items-center gap-2 rounded-xl border px-2.5 py-1.5 transition-all duration-200 sm:gap-2.5 sm:px-3 ".concat(2 === L ? "border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/20 text-white font-bold shadow-[0_0_12px_var(--theme-primary-glow)]" : "border-transparent text-slate-300 hover:bg-white/10"),
                                                          children: [
                                                              (0, a.jsx)("div", { className: "flex flex-col items-end text-xs", children: (0, a.jsx)("span", { className: "max-w-[100px] truncate font-semibold transition-colors sm:max-w-[180px] ".concat(2 === L ? "text-white font-bold" : "text-slate-300 group-hover:text-white"), children: z }) }),
                                                              k && !v
                                                                  ? (0, a.jsx)(i.default, { src: k, alt: z, width: 32, height: 32, className: "h-8 w-8 rounded-full bg-white/10 object-cover shadow-sm transition-all duration-200 ".concat(3 === L ? "ring-2 ring-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-primary-glow)]" : "ring-1 ring-white/20"), referrerPolicy: "no-referrer", onError: () => g(!0), unoptimized: !0 })
                                                                  : (0, a.jsx)("div", { className: "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-200 ".concat(3 === L ? "bg-[var(--theme-primary)] text-white shadow-[0_0_8px_var(--theme-primary-glow)]" : "bg-white/10 text-slate-200"), children: P }),
                                                          ],
                                                      })
                                                    : null
                                                : (0, a.jsxs)("div", { className: "flex items-center gap-2 rounded-xl border border-transparent px-2.5 py-1.5 sm:gap-2.5 sm:px-3 animate-pulse", children: [(0, a.jsx)("div", { className: "hidden h-3 w-16 rounded bg-white/10 sm:block" }), (0, a.jsx)("div", { className: "h-8 w-8 rounded-full bg-white/10" })] }),
                                    }),
                                ],
                            }),
                        }),
                        (0, a.jsx)(m, {}),
                    ],
                });
            }
            let x = new Set(["/login", "/inicio", "/termos", "/privacidade", "/privacy", "/terms"]);
            function p(e) {
                var t;
                let { children: r } = e,
                    s = (0, l.usePathname)(),
                    { user: i } = (0, h.A)(),
                    n = ((t = !!i), !(!s || x.has(s) || "/auth" === s || s.startsWith("/auth/")) && ("/" === s ? t : !!("/dashboard" === s || s.startsWith("/dashboard/") || "/collection" === s || s.startsWith("/collection/") || s.startsWith("/cards/") || "/configuracoes" === s || s.startsWith("/configuracoes/") || "/perfil" === s || s.startsWith("/perfil/") || "/colecao" === s || s.startsWith("/colecao/"))));
                return (0, a.jsxs)(a.Fragment, { children: [n ? (0, a.jsx)(f, {}) : null, r] });
            }
        },
        9397: (e, t, r) => {
            "use strict";
            r.d(t, { A: () => a });
            let a = (0, r(1847).A)("Layers", [
                ["path", { d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z", key: "zw3jo" }],
                ["path", { d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12", key: "1wduqc" }],
                ["path", { d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17", key: "kqbvx6" }],
            ]);
        },
    },
    (e) => {
        (e.O(0, [2207, 2978, 5730, 235, 2619, 5239, 8720, 1013, 8441, 1255, 7358], () => e((e.s = 841))), (_N_E = e.O()));
    },
]);
