"use strict";
((exports.id = 1678),
    (exports.ids = [1678]),
    (exports.modules = {
        19876: (a, b, c) => {
            c.d(b, { LandingPage: () => B });
            var d = c(21124),
                e = c(38301),
                f = c(24515),
                g = c(42830),
                h = c(20814),
                i = c(3991),
                j = c.n(i),
                k = c(26769),
                l = c(23339);
            let m = (0, l.A)("LogIn", [
                ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }],
                ["polyline", { points: "10 17 15 12 10 7", key: "1ail0h" }],
                ["line", { x1: "15", x2: "3", y1: "12", y2: "12", key: "v6grx8" }],
            ]);
            function n() {
                return (0, d.jsx)("header", {
                    className: "sticky top-0 z-50 border-b border-white/10 bg-[#0a0c10]/90 backdrop-blur-md",
                    children: (0, d.jsxs)("div", {
                        className: "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6",
                        children: [
                            (0, d.jsxs)(j(), { href: "/", className: "flex shrink-0 items-center gap-2.5 no-underline", children: [(0, d.jsx)(k.PokeballLogo, { size: "sm", animated: !0, glow: "subtle", color: "#ef4444" }), (0, d.jsx)("span", { className: "bg-gradient-to-r from-white to-slate-400 bg-clip-text text-base font-extrabold tracking-tight text-transparent sm:text-lg", children: "MyPokeBinder" })] }),
                            (0, d.jsxs)(j(), { href: "/login", className: "flex items-center gap-2 rounded-xl bg-[#ef4444] px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#dc2626] active:scale-[0.98] sm:text-sm", children: [(0, d.jsx)(m, { size: 15 }), (0, d.jsx)("span", { children: "Entrar" })] }),
                        ],
                    }),
                });
            }
            function o() {
                return (0, d.jsx)("footer", {
                    className: "relative z-20 border-t border-white/10 bg-[#07090e] py-12 text-slate-400",
                    children: (0, d.jsxs)("div", {
                        className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
                        children: [
                            (0, d.jsxs)("div", {
                                className: "grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-12",
                                children: [
                                    (0, d.jsxs)("div", {
                                        className: "md:col-span-1",
                                        children: [
                                            (0, d.jsxs)("div", { className: "flex items-center gap-3", children: [(0, d.jsx)(k.PokeballLogo, { size: "md", glow: "subtle", color: "#ef4444" }), (0, d.jsx)("span", { className: "text-xl font-bold tracking-tight text-white", children: "MyPokeBinder" })] }),
                                            (0, d.jsx)("p", { className: "mt-4 max-w-sm text-sm leading-relaxed text-slate-400", children: "Binder digital 3\xd73 dos 151 Pok\xe9mon de Kanto. Registre suas cartas f\xedsicas e folheie o binder." }),
                                        ],
                                    }),
                                    (0, d.jsxs)("div", {
                                        children: [
                                            (0, d.jsx)("h4", { className: "text-sm font-semibold text-white", children: "Navega\xe7\xe3o" }),
                                            (0, d.jsxs)("ul", {
                                                className: "mt-4 space-y-2.5 text-sm",
                                                children: [
                                                    (0, d.jsx)("li", { children: (0, d.jsx)(j(), { href: "/inicio", className: "transition-colors hover:text-white", children: "P\xe1gina Inicial" }) }),
                                                    (0, d.jsx)("li", { children: (0, d.jsx)(j(), { href: "/", className: "transition-colors hover:text-white", children: "Meu Binder" }) }),
                                                    (0, d.jsx)("li", { children: (0, d.jsx)(j(), { href: "/collection", className: "transition-colors hover:text-white", children: "Cole\xe7\xe3o" }) }),
                                                    (0, d.jsx)("li", { children: (0, d.jsx)(j(), { href: "/login", className: "transition-colors hover:text-white", children: "Entrar" }) }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, d.jsxs)("div", {
                                        children: [
                                            (0, d.jsx)("h4", { className: "text-sm font-semibold text-white", children: "Legal" }),
                                            (0, d.jsxs)("ul", { className: "mt-4 space-y-2.5 text-sm", children: [(0, d.jsx)("li", { children: (0, d.jsx)(j(), { href: "/privacidade", className: "transition-colors hover:text-white", children: "Pol\xedtica de Privacidade" }) }), (0, d.jsx)("li", { children: (0, d.jsx)(j(), { href: "/termos", className: "transition-colors hover:text-white", children: "Termos de Servi\xe7o" }) })] }),
                                        ],
                                    }),
                                ],
                            }),
                            (0, d.jsxs)("div", {
                                className: "mt-12 border-t border-white/10 pt-8",
                                children: [
                                    (0, d.jsx)("p", {
                                        className: "text-xs leading-relaxed text-slate-500",
                                        children:
                                            "Pok\xe9mon, Pok\xe9mon TCG, nomes de personagens, ins\xedgnias e ilustra\xe7\xf5es s\xe3o marcas registradas e propriedade intelectual de Nintendo, Creatures Inc. e Game Freak / The Pok\xe9mon Company. MyPokeBinder \xe9 uma aplica\xe7\xe3o independente criada por f\xe3s, sem fins comerciais, e n\xe3o \xe9 afiliada, endossada ou patrocinada por The Pok\xe9mon Company ou Nintendo. Imagens e dados de cartas v\xeam da API p\xfablica TCGdex, sob uso justo.",
                                    }),
                                    (0, d.jsxs)("p", { className: "mt-4 text-xs text-slate-500", children: ["\xa9 ", new Date().getFullYear(), " MyPokeBinder"] }),
                                ],
                            }),
                        ],
                    }),
                });
            }
            var p = c(67685),
                q = c(56849);
            function r({ children: a, className: b = "", fade: c = !0 }) {
                let f = (0, e.useRef)(null),
                    [g, h] = (0, e.useState)(!1),
                    i = "function" == typeof a ? a(g) : a,
                    j = c ? `landing-reveal${g ? " is-visible" : ""}` : "";
                return (0, d.jsx)("div", { ref: f, className: `${j} ${b}`.trim(), children: i });
            }
            var s = c(72190);
            function t({ children: a, className: b = "", index: c = 0 }) {
                let f = (0, e.useRef)(null),
                    [g, h] = (0, e.useState)(!1),
                    i = (0, s.O)(c % 3, { stepMs: 55, maxDelayMs: 160 });
                return (0, d.jsx)("div", { ref: f, className: `${g ? i.className : "opacity-0"} ${b}`.trim(), style: g ? i.style : void 0, children: a });
            }
            var u = c(74097),
                v = c(88285),
                w = c(75234);
            let x = (0, l.A)("Grid3x3", [
                    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
                    ["path", { d: "M3 9h18", key: "1pudct" }],
                    ["path", { d: "M3 15h18", key: "5xshup" }],
                    ["path", { d: "M9 3v18", key: "fh3hqa" }],
                    ["path", { d: "M15 3v18", key: "14nvp0" }],
                ]),
                y = [
                    { dex: 9, name: "Blastoise", image: "https://assets.tcgdex.net/en/sv/sv03.5/200/high.webp", shineMode: "prismatic" },
                    { dex: 6, name: "Charizard", image: "https://assets.tcgdex.net/en/sv/sv03.5/199/high.webp", shineMode: "prismatic" },
                    { dex: 3, name: "Venusaur", image: "https://assets.tcgdex.net/en/sv/sv03.5/198/high.webp", shineMode: "prismatic" },
                ],
                z = [
                    { dex: 1, name: "Bulbasaur", image: "https://assets.tcgdex.net/en/sv/sv03.5/001/high.webp", shineMode: "none" },
                    { dex: 4, name: "Charmander", image: "https://assets.tcgdex.net/en/sv/sv03.5/004/high.webp", shineMode: "none" },
                    { dex: 7, name: "Squirtle", image: "https://assets.tcgdex.net/en/sv/sv03.5/007/high.webp", shineMode: "none" },
                    { dex: 25, name: "Pikachu", image: "https://assets.tcgdex.net/en/sv/sv03.5/173/high.webp", shineMode: "prismatic" },
                    { dex: 133, name: "Eevee", image: "https://assets.tcgdex.net/en/sv/sv03.5/133/high.webp", shineMode: "none" },
                    { dex: 143, name: "Snorlax", image: "https://assets.tcgdex.net/en/sv/sv03.5/143/high.webp", shineMode: "none" },
                    { dex: 150, name: "Mewtwo", image: "https://assets.tcgdex.net/en/swsh/swsh10.5/072/high.webp", shineMode: "prismatic" },
                    { dex: 151, name: "Mew", image: "https://assets.tcgdex.net/en/sv/sv03.5/205/high.webp", shineMode: "prismatic" },
                    { dex: 94, name: "Gengar", image: "https://assets.tcgdex.net/en/sv/sv06.5/057/high.webp", shineMode: "prismatic" },
                ],
                A = [
                    { icon: u.A, title: "Binder 3\xd73", desc: "17 p\xe1ginas com 151 slots fixos, capa em couro e f\xedsica de folhear como um binder real." },
                    { icon: v.A, title: "Cat\xe1logo TCGdex", desc: "Busque edi\xe7\xf5es f\xedsicas do Base Set ao 151 e registre idioma, vers\xe3o e quantidade." },
                    { icon: w.A, title: "Full Art e brilho", desc: "Raridades expandidas ganham foil hologr\xe1fico, part\xedculas de impacto e som ao pousar no slot." },
                ];
            function B() {
                let [a, b] = (0, e.useState)(!1),
                    c = async () => {
                        try {
                            b(!0);
                            let a = (0, h.U)();
                            await a.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/auth/callback` } });
                        } catch {
                            (b(!1), g.oR.error("Erro ao autenticar", { description: "N\xe3o foi poss\xedvel iniciar a conex\xe3o. Tente novamente." }));
                        }
                    };
                return (0, d.jsxs)("div", {
                    className: "relative min-h-screen overflow-x-hidden bg-[#07090e] text-slate-200",
                    children: [
                        (0, d.jsx)("div", { className: "pointer-events-none absolute inset-0 opacity-[0.18] md:opacity-40", "aria-hidden": !0, children: (0, d.jsx)(p.E, {}) }),
                        (0, d.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-b from-[#07090e]/80 via-[#07090e]/55 to-[#07090e]", "aria-hidden": !0 }),
                        (0, d.jsxs)("div", {
                            className: "relative z-10 flex min-h-screen flex-col",
                            children: [
                                (0, d.jsx)(n, {}),
                                (0, d.jsx)("section", {
                                    className: "relative overflow-hidden pt-8 pb-16 md:flex md:min-h-[calc(100dvh-4rem)] md:flex-col md:justify-center md:pt-14 md:pb-24",
                                    children: (0, d.jsxs)("div", {
                                        className: "mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:gap-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8",
                                        children: [
                                            (0, d.jsx)("div", {
                                                className: "order-1 relative mx-auto flex w-full max-w-lg items-end justify-center gap-1 sm:max-w-xl sm:gap-2 lg:order-2 lg:max-w-none lg:gap-4 xl:gap-5",
                                                children: y.map((a, b) =>
                                                    (0, d.jsx)(
                                                        "div",
                                                        {
                                                            className: `relative aspect-[8/11] w-[36%] shrink-0 sm:w-[34%] lg:w-[38%] xl:w-[40%] ${1 === b ? "z-20 -translate-y-4 scale-110 sm:-translate-y-7 sm:scale-[1.12]" : 0 === b ? "z-10 origin-bottom rotate-[-8deg] sm:rotate-[-10deg]" : "z-10 origin-bottom rotate-[8deg] sm:rotate-[10deg]"}`,
                                                            children: (0, d.jsx)("div", {
                                                                className: `landing-enter landing-enter-d${b + 1} h-full w-full`,
                                                                children: (0, d.jsx)(q.LW, { className: "relative h-full w-full overflow-hidden rounded-lg", maxTilt: 18, scale: 1.04, glareOpacity: 0.4, perspective: 700, shineMode: a.shineMode, children: (0, d.jsx)(f.default, { src: a.image, alt: a.name, fill: !0, priority: 1 === b, sizes: "(max-width: 640px) 36vw, (max-width: 1024px) 30vw, 280px", className: "object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.75)]", unoptimized: !0 }) }),
                                                            }),
                                                        },
                                                        a.dex,
                                                    ),
                                                ),
                                            }),
                                            (0, d.jsxs)("div", {
                                                className: "order-2 w-full lg:order-1 lg:max-w-xl",
                                                children: [
                                                    (0, d.jsx)("p", { className: "landing-enter landing-enter-d1 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl bg-gradient-to-r from-[#f87171] to-[#b91c1c] bg-clip-text text-transparent", children: "MyPokeBinder" }),
                                                    (0, d.jsx)("h1", { className: "landing-enter landing-enter-d2 mt-4 text-xl font-semibold tracking-tight text-white sm:mt-5 sm:text-3xl lg:text-4xl", children: "Seu binder 3\xd73 dos 151 de Kanto" }),
                                                    (0, d.jsx)("p", { className: "landing-enter landing-enter-d3 mt-4 max-w-[40ch] text-sm leading-relaxed text-slate-400 sm:mt-5 sm:text-base lg:text-lg", children: "Registre cartas f\xedsicas, preencha os slots e folheie o binder com f\xedsica de p\xe1gina real." }),
                                                    (0, d.jsxs)("button", {
                                                        type: "button",
                                                        onClick: c,
                                                        disabled: a,
                                                        className: "landing-enter landing-enter-d4 mt-8 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[#ef4444] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#dc2626] active:scale-[0.98] disabled:opacity-70 sm:mt-10 sm:w-auto",
                                                        children: [(0, d.jsx)(m, { size: 18 }), (0, d.jsx)("span", { children: a ? "Conectando..." : "Come\xe7ar agora" })],
                                                    }),
                                                ],
                                            }),
                                        ],
                                    }),
                                }),
                                (0, d.jsxs)("section", {
                                    className: "relative mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8",
                                    children: [
                                        (0, d.jsxs)(r, {
                                            className: "max-w-2xl",
                                            children: [
                                                (0, d.jsxs)("div", { className: "flex items-center gap-2.5 text-[#ef4444]", children: [(0, d.jsx)(x, { size: 20, strokeWidth: 1.75 }), (0, d.jsx)("h2", { className: "text-2xl font-bold tracking-tight text-white sm:text-3xl", children: "Nove cartas por p\xe1gina" })] }),
                                                (0, d.jsx)("p", { className: "mt-4 max-w-[55ch] text-sm leading-relaxed text-slate-400 sm:text-base", children: "Cada p\xe1gina do binder espelha o formato f\xedsico: nove slots, silhuetas at\xe9 voc\xea vincular a carta, e ilustra\xe7\xe3o de ponta a ponta sem overlays." }),
                                            ],
                                        }),
                                        (0, d.jsxs)("div", {
                                            className: "mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0c101a]/90 p-3 sm:mt-12 sm:p-6",
                                            children: [
                                                (0, d.jsxs)("div", { className: "mb-4 flex items-center justify-between border-b border-white/10 pb-4 text-xs text-slate-500", children: [(0, d.jsxs)("span", { className: "inline-flex items-center gap-1.5 font-medium text-slate-300", children: [(0, d.jsx)(u.A, { size: 14, className: "text-[#ef4444]" }), "P\xe1gina 1"] }), (0, d.jsx)("span", { className: "font-mono", children: "#001 - #009" })] }),
                                                (0, d.jsx)("div", {
                                                    className: "grid grid-cols-3 gap-2 sm:gap-4 md:gap-5",
                                                    children: z.map((a, b) =>
                                                        (0, d.jsxs)(
                                                            t,
                                                            {
                                                                index: b,
                                                                className: "group relative flex flex-col items-center",
                                                                children: [
                                                                    (0, d.jsx)("div", {
                                                                        className: "relative aspect-[8/11] w-full",
                                                                        children: (0, d.jsx)(q.LW, { className: "relative h-full w-full overflow-hidden rounded-lg", maxTilt: 14, scale: 1.06, glareOpacity: 0.35, perspective: 750, shineMode: a.shineMode, children: (0, d.jsx)(f.default, { src: a.image, alt: a.name, fill: !0, sizes: "(max-width: 768px) 30vw, 12vw", className: "object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)]", unoptimized: !0 }) }),
                                                                    }),
                                                                    (0, d.jsxs)("div", { className: "mt-2 flex w-full items-center justify-between px-0.5 text-[10px] sm:text-xs", children: [(0, d.jsx)("span", { className: "truncate font-medium text-slate-400 group-hover:text-slate-200", children: a.name }), (0, d.jsxs)("span", { className: "shrink-0 font-mono text-slate-600", children: ["#", String(a.dex).padStart(3, "0")] })] }),
                                                                ],
                                                            },
                                                            a.dex,
                                                        ),
                                                    ),
                                                }),
                                            ],
                                        }),
                                    ],
                                }),
                                (0, d.jsxs)(r, {
                                    className: "relative mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 sm:pb-28 lg:px-8",
                                    children: [
                                        (0, d.jsx)("h2", { className: "text-2xl font-bold tracking-tight text-white sm:text-3xl", children: "O que o binder faz" }),
                                        (0, d.jsx)("ul", {
                                            className: "landing-reveal-stagger mt-10 divide-y divide-white/10 border-y border-white/10",
                                            children: A.map((a) => {
                                                let b = a.icon;
                                                return (0, d.jsxs)(
                                                    "li",
                                                    {
                                                        className: "landing-reveal-item grid gap-3 py-7 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-10 sm:py-9",
                                                        children: [
                                                            (0, d.jsxs)("div", { className: "flex items-center gap-3", children: [(0, d.jsx)("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#ef4444]/25 bg-[#ef4444]/10 text-[#ef4444]", children: (0, d.jsx)(b, { size: 18, strokeWidth: 1.75 }) }), (0, d.jsx)("h3", { className: "text-base font-semibold text-white", children: a.title })] }),
                                                            (0, d.jsx)("p", { className: "max-w-[55ch] text-sm leading-relaxed text-slate-400 sm:text-base", children: a.desc }),
                                                        ],
                                                    },
                                                    a.title,
                                                );
                                            }),
                                        }),
                                    ],
                                }),
                                (0, d.jsx)(o, {}),
                            ],
                        }),
                    ],
                });
            }
        },
        39483: (a, b, c) => {
            c.d(b, { LandingPage: () => d });
            let d = (0, c(97954).registerClientReference)(
                function () {
                    throw Error("Attempted to call LandingPage() from the server but LandingPage is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
                },
                "/home/paulo_rosado/MyPokeBinder/src/components/landing/LandingPage.tsx",
                "LandingPage",
            );
        },
        67685: (a, b, c) => {
            c.d(b, { E: () => h });
            var d = c(21124),
                e = c(38301),
                f = c(37108);
            let g = [
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
                h = (0, e.memo)(function ({ intensity: a = "full" }) {
                    let b = "quiet" === a;
                    return (0, d.jsxs)("div", {
                        className: "pointer-events-none absolute inset-0 overflow-hidden select-none",
                        children: [
                            (0, d.jsx)("div", { className: "absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full bg-red-600/12 blur-[150px]" }),
                            (0, d.jsx)("div", { className: "absolute top-[12%] right-[-10%] h-[560px] w-[560px] rounded-full bg-amber-500/10 blur-[150px]" }),
                            !b && (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("div", { className: "absolute top-1/2 left-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/12 blur-[150px]" }), (0, d.jsx)("div", { className: "absolute -bottom-40 right-[8%] h-[650px] w-[650px] rounded-full bg-purple-600/12 blur-[160px]" })] }),
                            b && (0, d.jsx)("div", { className: "absolute -bottom-40 right-[8%] h-[650px] w-[650px] rounded-full bg-red-600/8 blur-[160px]" }),
                            (0, d.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-50" }),
                            g.map((a) => {
                                let c = b ? a.opacityQuiet : a.opacityFull,
                                    e = b ? "drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]" : a.glowFull;
                                return (0, d.jsx)("div", { style: a.style, className: `absolute transition-transform duration-1000 filter ${a.floatClass} ${c} ${e}`, children: (0, d.jsx)("img", { src: (0, f.Xw)(a.dexId), alt: a.name, loading: "lazy", draggable: !1, className: "h-full w-full object-contain select-none" }) }, a.dexId);
                            }),
                        ],
                    });
                });
        },
        72190: (a, b, c) => {
            c.d(b, { O: () => d });
            function d(a, b) {
                let c = b?.stepMs ?? 40,
                    d = b?.maxDelayMs ?? 480;
                return { className: "card-list-appear", style: { animationDelay: `${Math.min(a * c, d)}ms` } };
            }
        },
    }));
