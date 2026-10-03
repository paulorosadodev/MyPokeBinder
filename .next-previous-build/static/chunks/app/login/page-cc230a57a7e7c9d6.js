(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [4520],
    {
        17: (e, t, a) => {
            "use strict";
            (a.r(t), a.d(t, { default: () => g }));
            var l = a(5155),
                i = a(2115),
                o = a(63),
                s = a(2619),
                r = a.n(s),
                n = a(5239),
                c = a(8720),
                d = a(6648),
                p = a(8591),
                x = a(2269),
                h = a(148);
            let m = [
                { dex: 136, name: "Flareon", image: "https://assets.tcgdex.net/en/sv/sv08.5/146/high.webp", shineMode: "prismatic" },
                { dex: 135, name: "Jolteon", image: "https://assets.tcgdex.net/en/sv/sv08.5/153/high.webp", shineMode: "prismatic" },
                { dex: 134, name: "Vaporeon", image: "https://assets.tcgdex.net/en/sv/sv08.5/149/high.webp", shineMode: "prismatic" },
            ];
            function f() {
                let [e, t] = (0, i.useState)(!1),
                    a = (0, o.useSearchParams)().get("error");
                (0, i.useEffect)(() => {
                    a && c.oR.error("Falha no login", { description: "N\xe3o foi poss\xedvel autenticar sua conta Google. Tente novamente." });
                }, [a]);
                let s = async () => {
                    try {
                        t(!0);
                        let e = (0, d.U)();
                        await e.auth.signInWithOAuth({ provider: "google", options: { redirectTo: "".concat(window.location.origin, "/auth/callback") } });
                    } catch (e) {
                        (t(!1), c.oR.error("Erro ao autenticar", { description: "N\xe3o foi poss\xedvel iniciar o login com o Google. Tente novamente." }));
                    }
                };
                return (0, l.jsxs)("div", {
                    className: "relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-[#07090e] lg:flex-row",
                    children: [
                        (0, l.jsx)("div", { className: "pointer-events-none absolute inset-0 opacity-[0.18] md:opacity-40", "aria-hidden": !0, children: (0, l.jsx)(x.E, { intensity: "quiet" }) }),
                        (0, l.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-b from-[#07090e]/80 via-[#07090e]/55 to-[#07090e] lg:bg-gradient-to-r lg:from-[#07090e]/70 lg:via-[#07090e]/40 lg:to-[#07090e]", "aria-hidden": !0 }),
                        (0, l.jsx)("div", {
                            className: "relative z-10 hidden min-h-[100dvh] flex-1 flex-col items-center justify-center p-10 lg:flex lg:p-16 xl:p-20",
                            children: (0, l.jsxs)("div", {
                                className: "w-full max-w-2xl xl:max-w-3xl",
                                children: [
                                    (0, l.jsxs)("div", {
                                        className: "max-w-xl text-left",
                                        children: [
                                            (0, l.jsx)("p", { className: "landing-enter landing-enter-d1 text-5xl font-extrabold tracking-tight xl:text-6xl ".concat("bg-gradient-to-r from-[#f87171] to-[#b91c1c] bg-clip-text text-transparent"), children: "MyPokeBinder" }),
                                            (0, l.jsx)("h1", { className: "landing-enter landing-enter-d2 mt-4 text-3xl font-semibold tracking-tight text-white xl:text-4xl", children: "Seu binder 3\xd73 dos 151 de Kanto" }),
                                            (0, l.jsx)("p", { className: "landing-enter landing-enter-d3 mt-4 max-w-[40ch] text-base leading-relaxed text-slate-400 xl:text-lg", children: "Entre para sincronizar cartas e folhear o binder em qualquer dispositivo." }),
                                        ],
                                    }),
                                    (0, l.jsx)("div", {
                                        className: "mt-14 flex w-full max-w-lg items-end justify-end gap-3 self-end xl:ml-auto xl:max-w-xl xl:gap-4",
                                        children: m.map((e, t) =>
                                            (0, l.jsx)(
                                                "div",
                                                {
                                                    className: "landing-enter landing-enter-d".concat(t + 4, " relative aspect-[8/11] w-[34%] shrink-0 ").concat(1 === t ? "z-20 -translate-y-5 scale-110" : 0 === t ? "z-10 origin-bottom rotate-[-8deg]" : "z-10 origin-bottom rotate-[8deg]"),
                                                    children: (0, l.jsx)(h.LW, { className: "relative h-full w-full overflow-hidden rounded-lg", maxTilt: 18, scale: 1.04, glareOpacity: 0.4, perspective: 700, shineMode: e.shineMode, children: (0, l.jsx)(n.default, { src: e.image, alt: e.name, fill: !0, priority: 1 === t, sizes: "(max-width: 1280px) 18vw, 220px", className: "object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.75)]", unoptimized: !0 }) }),
                                                },
                                                e.dex,
                                            ),
                                        ),
                                    }),
                                ],
                            }),
                        }),
                        (0, l.jsx)("div", {
                            className: "relative z-20 flex min-h-[100dvh] w-full shrink-0 flex-col items-center justify-center border-t border-white/10 bg-[#0c101a] p-8 sm:p-12 lg:w-[500px] lg:border-t-0 lg:border-l lg:p-14 xl:w-[560px]",
                            children: (0, l.jsxs)("div", {
                                className: "profile-enter flex w-full max-w-md flex-col items-center text-center",
                                children: [
                                    (0, l.jsx)("div", { className: "mb-6 flex justify-center", children: (0, l.jsx)(p.PokeballLogo, { size: "lg", animated: !0, color: "#ef4444" }) }),
                                    (0, l.jsx)("h2", { className: "text-4xl font-extrabold tracking-tight ".concat("bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent"), children: "MyPokeBinder" }),
                                    (0, l.jsx)("p", { className: "mt-3 mb-8 max-w-[36ch] text-sm leading-relaxed text-slate-400 sm:text-base", children: "Seu binder digital 3\xd73 dos 151 originais." }),
                                    a && (0, l.jsx)("div", { className: "mb-6 w-full rounded-xl border border-red-500/30 bg-red-500/15 p-3.5 text-xs text-red-200", children: "Ocorreu uma falha na autentica\xe7\xe3o. Por favor, tente novamente." }),
                                    (0, l.jsxs)("button", {
                                        type: "button",
                                        onClick: s,
                                        disabled: e,
                                        className: "flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#ef4444] py-4 px-6 text-base font-semibold text-white transition-all hover:bg-[#dc2626] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70",
                                        children: [
                                            (0, l.jsxs)("svg", {
                                                width: "22",
                                                height: "22",
                                                viewBox: "0 0 24 24",
                                                "aria-hidden": !0,
                                                children: [
                                                    (0, l.jsx)("path", { fill: "currentColor", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }),
                                                    (0, l.jsx)("path", { fill: "currentColor", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
                                                    (0, l.jsx)("path", { fill: "currentColor", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" }),
                                                    (0, l.jsx)("path", { fill: "currentColor", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" }),
                                                ],
                                            }),
                                            e ? "Conectando ao Google..." : "Entrar com Google",
                                        ],
                                    }),
                                    (0, l.jsx)("p", { className: "mt-8 text-xs leading-relaxed text-slate-500", children: "Ao entrar, voc\xea sincroniza e gerencia suas cartas com seguran\xe7a em qualquer dispositivo." }),
                                    (0, l.jsxs)("div", {
                                        className: "mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-white/10 pt-4 text-xs text-slate-400",
                                        children: [
                                            (0, l.jsx)(r(), { href: "/inicio", className: "transition-colors hover:text-white", children: "P\xe1gina Inicial" }),
                                            (0, l.jsx)("span", { className: "text-slate-600", children: "-" }),
                                            (0, l.jsx)(r(), { href: "/termos", className: "transition-colors hover:text-white", children: "Termos de Servi\xe7o" }),
                                            (0, l.jsx)("span", { className: "text-slate-600", children: "-" }),
                                            (0, l.jsx)(r(), { href: "/privacidade", className: "transition-colors hover:text-white", children: "Pol\xedtica de Privacidade" }),
                                        ],
                                    }),
                                ],
                            }),
                        }),
                    ],
                });
            }
            function g() {
                return (0, l.jsx)(i.Suspense, { fallback: (0, l.jsx)("div", { className: "min-h-[100dvh] bg-[#07090e]" }), children: (0, l.jsx)(f, {}) });
            }
        },
        2269: (e, t, a) => {
            "use strict";
            a.d(t, { E: () => r });
            var l = a(5155),
                i = a(2115),
                o = a(6937);
            let s = [
                    { dexId: 6, name: "Charizard", style: { top: "3%", left: "2%", width: "240px", height: "240px", animationDelay: "0s" }, floatClass: "animate-pokemon-float-1", opacityQuiet: "opacity-35", opacityFull: "opacity-50", glowFull: "drop-shadow-[0_0_40px_rgba(239,68,68,0.5)]" },
                    { dexId: 144, name: "Articuno", style: { top: "6%", left: "28%", width: "190px", height: "190px", animationDelay: "-15s" }, floatClass: "animate-pokemon-float-1", opacityQuiet: "opacity-30", opacityFull: "opacity-45", glowFull: "drop-shadow-[0_0_35px_rgba(56,189,248,0.5)]" },
                    { dexId: 151, name: "Mew", style: { top: "4%", left: "54%", width: "180px", height: "180px", animationDelay: "-8s" }, floatClass: "animate-pokemon-drift", opacityQuiet: "opacity-40", opacityFull: "opacity-70", glowFull: "drop-shadow-[0_0_40px_rgba(244,114,182,0.6)]" },
                    { dexId: 149, name: "Dragonite", style: { top: "2%", right: "3%", width: "230px", height: "230px", animationDelay: "-11s" }, floatClass: "animate-pokemon-float-2", opacityQuiet: "opacity-30", opacityFull: "opacity-45", glowFull: "drop-shadow-[0_0_35px_rgba(245,158,11,0.4)]" },
                    { dexId: 3, name: "Venusaur", style: { top: "24%", left: "8%", width: "200px", height: "200px", animationDelay: "-9s" }, floatClass: "animate-pokemon-float-2", opacityQuiet: "opacity-28", opacityFull: "opacity-40", glowFull: "drop-shadow-[0_0_35px_rgba(34,197,94,0.4)]" },
                    { dexId: 65, name: "Alakazam", style: { top: "22%", left: "38%", width: "170px", height: "170px", animationDelay: "-14s" }, floatClass: "animate-pokemon-float-3", opacityQuiet: "opacity-25", opacityFull: "opacity-35", glowFull: "drop-shadow-[0_0_30px_rgba(234,179,8,0.4)]" },
                    { dexId: 145, name: "Zapdos", style: { top: "20%", right: "18%", width: "200px", height: "200px", animationDelay: "-10s" }, floatClass: "animate-pokemon-float-1", opacityQuiet: "opacity-30", opacityFull: "opacity-45", glowFull: "drop-shadow-[0_0_35px_rgba(234,179,8,0.45)]" },
                    { dexId: 25, name: "Pikachu", style: { top: "32%", right: "4%", width: "160px", height: "160px", animationDelay: "-2s" }, floatClass: "animate-pokemon-float-3", opacityQuiet: "opacity-40", opacityFull: "opacity-65", glowFull: "drop-shadow-[0_0_35px_rgba(250,204,21,0.55)]" },
                    { dexId: 94, name: "Gengar", style: { top: "48%", left: "3%", width: "210px", height: "210px", animationDelay: "-4s" }, floatClass: "animate-pokemon-float-2", opacityQuiet: "opacity-35", opacityFull: "opacity-55", glowFull: "drop-shadow-[0_0_40px_rgba(168,85,247,0.5)]" },
                    { dexId: 93, name: "Haunter", style: { top: "52%", left: "30%", width: "170px", height: "170px", animationDelay: "-12s" }, floatClass: "animate-pokemon-float-2", opacityQuiet: "opacity-32", opacityFull: "opacity-50", glowFull: "drop-shadow-[0_0_35px_rgba(147,51,234,0.45)]" },
                    { dexId: 150, name: "Mewtwo", style: { top: "46%", right: "22%", width: "210px", height: "210px", animationDelay: "-7s" }, floatClass: "animate-pokemon-drift", opacityQuiet: "opacity-28", opacityFull: "opacity-40", glowFull: "drop-shadow-[0_0_40px_rgba(192,132,252,0.45)]" },
                    { dexId: 133, name: "Eevee", style: { top: "55%", right: "5%", width: "150px", height: "150px", animationDelay: "-3s" }, floatClass: "animate-pokemon-float-3", opacityQuiet: "opacity-38", opacityFull: "opacity-60", glowFull: "drop-shadow-[0_0_30px_rgba(217,119,6,0.4)]" },
                    { dexId: 9, name: "Blastoise", style: { bottom: "4%", left: "10%", width: "230px", height: "230px", animationDelay: "-6s" }, floatClass: "animate-pokemon-float-1", opacityQuiet: "opacity-32", opacityFull: "opacity-50", glowFull: "drop-shadow-[0_0_40px_rgba(59,130,246,0.45)]" },
                    { dexId: 130, name: "Gyarados", style: { bottom: "6%", left: "42%", width: "230px", height: "230px", animationDelay: "-5s" }, floatClass: "animate-pokemon-drift", opacityQuiet: "opacity-28", opacityFull: "opacity-40", glowFull: "drop-shadow-[0_0_40px_rgba(56,189,248,0.45)]" },
                    { dexId: 143, name: "Snorlax", style: { bottom: "3%", right: "8%", width: "220px", height: "220px", animationDelay: "-13s" }, floatClass: "animate-pokemon-float-1", opacityQuiet: "opacity-25", opacityFull: "opacity-35", glowFull: "drop-shadow-[0_0_35px_rgba(100,116,139,0.35)]" },
                ],
                r = (0, i.memo)(function (e) {
                    let { intensity: t = "full" } = e,
                        a = "quiet" === t;
                    return (0, l.jsxs)("div", {
                        className: "pointer-events-none absolute inset-0 overflow-hidden select-none",
                        children: [
                            (0, l.jsx)("div", { className: "absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full bg-red-600/12 blur-[150px]" }),
                            (0, l.jsx)("div", { className: "absolute top-[12%] right-[-10%] h-[560px] w-[560px] rounded-full bg-amber-500/10 blur-[150px]" }),
                            !a && (0, l.jsxs)(l.Fragment, { children: [(0, l.jsx)("div", { className: "absolute top-1/2 left-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/12 blur-[150px]" }), (0, l.jsx)("div", { className: "absolute -bottom-40 right-[8%] h-[650px] w-[650px] rounded-full bg-purple-600/12 blur-[160px]" })] }),
                            a && (0, l.jsx)("div", { className: "absolute -bottom-40 right-[8%] h-[650px] w-[650px] rounded-full bg-red-600/8 blur-[160px]" }),
                            (0, l.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-50" }),
                            s.map((e) => {
                                let t = a ? e.opacityQuiet : e.opacityFull,
                                    i = a ? "drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]" : e.glowFull;
                                return (0, l.jsx)("div", { style: e.style, className: "absolute transition-transform duration-1000 filter ".concat(e.floatClass, " ").concat(t, " ").concat(i), children: (0, l.jsx)("img", { src: (0, o.Xw)(e.dexId), alt: e.name, loading: "lazy", draggable: !1, className: "h-full w-full object-contain select-none" }) }, e.dexId);
                            }),
                        ],
                    });
                });
        },
        3989: (e, t, a) => {
            Promise.resolve().then(a.bind(a, 17));
        },
        8591: (e, t, a) => {
            "use strict";
            (a.r(t), a.d(t, { PokeballLogo: () => r }));
            var l = a(5155),
                i = a(2115),
                o = a(1013);
            let s = { xs: "w-6 h-6", sm: "w-8 h-8", md: "w-12 h-12", lg: "w-16 h-16", xl: "w-20 h-20" };
            function r(e) {
                let { size: t = "sm", className: a = "", animated: r = !1, glow: n = "normal", color: c, ballType: d } = e,
                    p = (0, i.useContext)(o.cm),
                    x = s[t],
                    h = d || (c ? (0, o.w2)(c) : (null == p ? void 0 : p.ballType) || "pokeball"),
                    m = c || "var(--theme-primary, #ef4444)",
                    f = c ? "color-mix(in srgb, ".concat(c, " 40%, transparent)") : "var(--theme-primary-glow, rgba(239, 68, 68, 0.4))",
                    g = c ? "color-mix(in srgb, ".concat(c, " 50%, transparent)") : "var(--theme-primary-glow, rgba(239, 68, 68, 0.5))";
                return (0, l.jsx)("div", {
                    className: "relative inline-flex items-center justify-center shrink-0 ".concat(x, " ").concat(a),
                    children: (0, l.jsxs)("svg", {
                        viewBox: "0 0 100 100",
                        width: "100%",
                        height: "100%",
                        style: { colorScheme: "only light", forcedColorAdjust: "none", WebkitForcedColorAdjust: "none", ...("subtle" === n ? { filter: "drop-shadow(0 0 6px ".concat(f, ")") } : "normal" === n ? { filter: "drop-shadow(0 0 12px ".concat(g, ")") } : void 0) },
                        className: "overflow-visible",
                        children: [
                            (() => {
                                switch (h) {
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
                                    default:
                                        return (0, l.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: m });
                                }
                            })(),
                            (0, l.jsx)("path", { d: "M 4 50 A 46 46 0 0 0 96 50 Z", fill: "#f8fafc" }),
                            (0, l.jsx)("line", { x1: "4", y1: "50", x2: "96", y2: "50", stroke: "#0f172a", strokeWidth: "8" }),
                            (0, l.jsx)("circle", { cx: "50", cy: "50", r: "46", fill: "none", stroke: "#0f172a", strokeWidth: "8" }),
                            (0, l.jsx)("circle", { cx: "50", cy: "50", r: "16", fill: "#0f172a" }),
                            (0, l.jsx)("circle", { cx: "50", cy: "50", r: "10", fill: "#f8fafc" }),
                            (0, l.jsx)("circle", { cx: "50", cy: "50", r: "5", fill: m, className: r ? "animate-pulse" : "" }),
                        ],
                    }),
                });
            }
        },
    },
    (e) => {
        (e.O(0, [5730, 235, 2619, 5239, 8720, 1013, 6937, 148, 8441, 1255, 7358], () => e((e.s = 3989))), (_N_E = e.O()));
    },
]);
