"use strict";
((exports.id = 7936),
    (exports.ids = [7936]),
    (exports.modules = {
        28265: (a, b, c) => {
            c.d(b, { O: () => k });
            var d = c(21124),
                e = c(38301),
                f = c(24515),
                g = c(47089),
                h = c(56849),
                i = c(76186),
                j = c(42593);
            function k({ src: a, alt: b = "Carta", shineMode: c = "none", elementTypes: k, onClose: l }) {
                let m = (0, e.useRef)(null),
                    [n, o] = (0, e.useState)(a);
                (0, i.m)(!!a, l);
                let { isPresent: p, state: q } = (0, j.v)(!!a);
                return p && n
                    ? (0, d.jsxs)("div", {
                          ref: m,
                          className: "modal-backdrop fixed inset-0 z-[100] flex select-none items-center justify-center bg-black/80 p-4 backdrop-blur-md touch-none overscroll-none",
                          "data-overlay-state": q,
                          role: "dialog",
                          "aria-modal": "true",
                          "aria-label": b,
                          onClick: (a) => {
                              a.target === a.currentTarget && l();
                          },
                          children: [
                              (0, d.jsx)("button", { type: "button", onClick: l, "aria-label": "Fechar", className: "absolute right-4 top-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-6 sm:top-6", children: (0, d.jsx)(g.A, { size: 20, strokeWidth: 2.5 }) }),
                              (0, d.jsx)("div", {
                                  className: "modal-surface relative aspect-[8/11] w-[88vw] max-w-[420px] select-none touch-none",
                                  children: (0, d.jsx)(h.LW, { className: "relative h-full w-full overflow-hidden rounded-2xl touch-none", maxTilt: 18, scale: 1.05, glareOpacity: 0.35, perspective: 1e3, shineMode: c, elementTypes: k, enableTouch: !0, children: (0, d.jsx)(f.default, { src: n, alt: b, fill: !0, unoptimized: !0, priority: !0, sizes: "(max-width: 768px) 90vw, 500px", className: "pointer-events-none object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]" }) }),
                              }),
                          ],
                      })
                    : null;
            }
        },
        34615: (a, b, c) => {
            c.d(b, { L: () => m });
            var d = c(21124),
                e = c(24515),
                f = c(3991),
                g = c.n(f),
                h = c(65783);
            let i = (0, c(23339).A)("UserX", [
                ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
                ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
                ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
                ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }],
            ]);
            var j = c(74097),
                k = c(79944),
                l = c(37108);
            function m({ username: a, type: b = "profile" }) {
                let c = "collection" === b,
                    f = a ? a.replace(/^@/, "") : "",
                    m = c ? "Snorlax" : "Abra",
                    n = (0, l.Xw)(c ? 143 : 63);
                return (0, d.jsxs)("div", {
                    className: "min-h-screen flex flex-col bg-[#0a0c10] text-slate-100 relative overflow-hidden selection:bg-red-500/30 selection:text-white",
                    children: [
                        (0, d.jsxs)("div", {
                            className: "absolute inset-0 pointer-events-none overflow-hidden",
                            "aria-hidden": !0,
                            children: [
                                (0, d.jsx)("div", { className: `absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ${c ? "bg-teal-500/[0.03]" : "bg-amber-500/[0.03]"} blur-[140px] rounded-full` }),
                                (0, d.jsx)("div", { className: "absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-sky-500/[0.02] blur-[120px] rounded-full" }),
                                (0, d.jsxs)("svg", { viewBox: "0 0 100 100", className: "absolute -right-20 top-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-[0.015] text-white stroke-current fill-none stroke-[2]", children: [(0, d.jsx)("circle", { cx: "50", cy: "50", r: "46" }), (0, d.jsx)("line", { x1: "4", y1: "50", x2: "96", y2: "50", strokeWidth: "4" }), (0, d.jsx)("circle", { cx: "50", cy: "50", r: "14", strokeWidth: "4" })] }),
                            ],
                        }),
                        (0, d.jsx)("main", {
                            className: "flex-1 relative z-10 flex items-center justify-center px-4 py-8 sm:py-16",
                            children: (0, d.jsxs)("div", {
                                className: "w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center",
                                children: [
                                    (0, d.jsx)("div", {
                                        className: "md:col-span-5 flex flex-col items-center justify-center order-1",
                                        children: (0, d.jsxs)("div", {
                                            className: "relative flex items-center justify-center select-none",
                                            "aria-label": `Ilustra\xe7\xe3o do Pok\xe9mon ${m}`,
                                            children: [
                                                (0, d.jsx)("div", { className: `absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full ${c ? "bg-teal-500/[0.05] border-teal-500/10" : "bg-amber-500/[0.05] border-amber-500/10"} border pointer-events-none transition-transform duration-500 hover:scale-105` }),
                                                (0, d.jsx)("div", { className: "absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-slate-500/[0.03] border border-white/5 pointer-events-none" }),
                                                (0, d.jsx)("div", { className: "relative z-10 w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 transition-all duration-300 select-none hover:scale-105", children: (0, d.jsx)(e.default, { src: n, alt: `Ilustra\xe7\xe3o do Pok\xe9mon ${m}`, fill: !0, sizes: "(max-width: 640px) 210px, 290px", className: "object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.65)]", unoptimized: !0 }) }),
                                            ],
                                        }),
                                    }),
                                    (0, d.jsxs)("div", {
                                        className: "md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left space-y-5 order-2",
                                        children: [
                                            (0, d.jsxs)("div", {
                                                className: `inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${c ? "bg-teal-500/10 border border-teal-500/20 text-teal-400" : "bg-amber-500/10 border border-amber-500/20 text-amber-400"}`,
                                                children: [c ? (0, d.jsx)(h.A, { size: 13, className: "shrink-0" }) : (0, d.jsx)(i, { size: 13, className: "shrink-0" }), (0, d.jsx)("span", { children: c ? "Cole\xe7\xe3o bloqueada" : "Treinador n\xe3o encontrado" })],
                                            }),
                                            (0, d.jsxs)("div", {
                                                className: "space-y-3",
                                                children: [
                                                    (0, d.jsx)("h1", { className: "text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight", children: c ? "Um Snorlax adormeceu sobre esta cole\xe7\xe3o." : "Este treinador parece ter usado Teleporte." }),
                                                    (0, d.jsx)("p", {
                                                        className: "text-sm sm:text-base text-slate-400 leading-relaxed max-w-lg",
                                                        children: f
                                                            ? (0, d.jsx)(d.Fragment, {
                                                                  children: c
                                                                      ? (0, d.jsxs)(d.Fragment, { children: ["Nenhuma cole\xe7\xe3o foi localizada para o treinador ", (0, d.jsxs)("span", { className: "font-mono text-teal-300 font-semibold", children: ["@", f] }), ". Um Snorlax selvagem bloqueou a rota deste binder e tirou uma bela soneca."] })
                                                                      : (0, d.jsxs)(d.Fragment, { children: ["Nenhum registro para ", (0, d.jsxs)("span", { className: "font-mono text-amber-300 font-semibold", children: ["@", f] }), " foi localizado. Assim como um Abra arisco, este treinador se teletransportou para longe do mapa."] }),
                                                              })
                                                            : c
                                                              ? "A cole\xe7\xe3o que voc\xea tentou acessar n\xe3o foi localizada. Um Snorlax parece estar bloqueando o caminho deste binder na Pok\xe9dex."
                                                              : "O perfil de treinador que voc\xea tentou acessar n\xe3o foi localizado ou n\xe3o existe nesta regi\xe3o da Pok\xe9dex.",
                                                    }),
                                                ],
                                            }),
                                            (0, d.jsxs)("div", {
                                                className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto",
                                                children: [
                                                    (0, d.jsxs)(g(), { href: "/", className: `inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] shadow-lg ${c ? "bg-teal-600 hover:bg-teal-500 text-white shadow-teal-600/25" : "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25"}`, children: [(0, d.jsx)(j.A, { size: 16 }), (0, d.jsx)("span", { children: "Voltar ao Meu Binder" })] }),
                                                    (0, d.jsxs)(g(), { href: "/collection", className: "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-sm transition-all active:scale-[0.98]", children: [(0, d.jsx)(h.A, { size: 16 }), (0, d.jsx)("span", { children: "Explorar Cole\xe7\xe3o" })] }),
                                                ],
                                            }),
                                            (0, d.jsx)("div", { children: (0, d.jsxs)("button", { type: "button", onClick: () => {}, className: "inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors pt-1", children: [(0, d.jsx)(k.A, { size: 14 }), (0, d.jsx)("span", { children: "Retornar \xe0 p\xe1gina anterior" })] }) }),
                                        ],
                                    }),
                                ],
                            }),
                        }),
                        (0, d.jsxs)("footer", { className: "relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 border-t border-slate-900/60 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2", children: [(0, d.jsx)("span", { children: "MyPokeBinder \xb7 Cole\xe7\xe3o dos 151 Pok\xe9mon Originais" }), (0, d.jsx)("span", { className: "text-slate-600", children: "Se o caminho continuar bloqueado, use uma Pok\xe9 Flauta." })] }),
                    ],
                });
            }
        },
        37731: (a, b, c) => {
            c.d(b, { RouteLoading: () => f });
            var d = c(21124),
                e = c(59535);
            function f({ message: a = "Carregando...", className: b }) {
                return (0, d.jsx)("main", { className: b || "flex flex-1 items-start justify-center pt-10 sm:pt-14 md:pt-18 pb-16", children: (0, d.jsx)(e.i, { message: a, size: "lg" }) });
            }
        },
        51771: (a, b, c) => {
            c.d(b, { ProfileRouteLoading: () => d });
            let d = (0, c(97954).registerClientReference)(
                function () {
                    throw Error("Attempted to call ProfileRouteLoading() from the server but ProfileRouteLoading is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
                },
                "/home/paulo_rosado/MyPokeBinder/src/components/profile/ProfileRouteLoading.tsx",
                "ProfileRouteLoading",
            );
        },
        59265: (a, b, c) => {
            c.d(b, { ProfileRouteLoading: () => g });
            var d = c(21124),
                e = c(79944),
                f = c(37731);
            function g({ message: a = "Carregando perfil do treinador...", type: b = "profile" }) {
                return "collection" === b || a.includes("cole\xe7\xe3o")
                    ? (0, d.jsx)("div", {
                          className: "flex min-h-screen flex-col bg-[#0a0c10]",
                          children: (0, d.jsxs)("main", {
                              className: "mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16",
                              children: [
                                  (0, d.jsxs)("header", {
                                      className: "flex flex-col gap-4",
                                      children: [
                                          (0, d.jsxs)("div", { className: "inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-slate-400", children: [(0, d.jsx)(e.A, { size: 14 }), (0, d.jsx)("span", { children: "Perfil" })] }),
                                          (0, d.jsxs)("div", {
                                              className: "flex items-center gap-3.5 sm:gap-4",
                                              children: [
                                                  (0, d.jsx)("div", { className: "h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-full border border-white/20 bg-white/10 animate-pulse" }),
                                                  (0, d.jsxs)("div", { className: "min-w-0 flex-1 space-y-1.5", children: [(0, d.jsx)("div", { className: "h-2.5 w-12 rounded bg-white/10 animate-pulse" }), (0, d.jsx)("div", { className: "h-5 sm:h-6 w-36 sm:w-48 rounded-lg bg-white/10 animate-pulse" }), (0, d.jsx)("div", { className: "h-3 w-28 rounded bg-white/5 animate-pulse" })] }),
                                              ],
                                          }),
                                      ],
                                  }),
                                  (0, d.jsx)("div", {
                                      className: "relative z-30 flex flex-col rounded-2xl border border-white/10 bg-[#121520]/80 p-2.5 sm:p-3.5 shadow-xl backdrop-blur-md",
                                      children: (0, d.jsxs)("div", { className: "flex items-center gap-2", children: [(0, d.jsx)("div", { className: "h-9 sm:h-10 flex-1 rounded-xl border border-white/10 bg-white/5 animate-pulse" }), (0, d.jsx)("div", { className: "h-9 sm:h-10 w-20 sm:w-24 shrink-0 rounded-xl border border-white/10 bg-white/5 animate-pulse" })] }),
                                  }),
                                  (0, d.jsx)("div", { className: "flex h-64 flex-col items-center justify-center", children: (0, d.jsx)(f.RouteLoading, { message: a, className: "flex flex-col items-center justify-center" }) }),
                              ],
                          }),
                      })
                    : (0, d.jsx)("div", { className: "flex flex-1 min-h-[calc(100dvh-4rem)] flex-col bg-[#0a0c10]", children: (0, d.jsx)(f.RouteLoading, { message: a }) });
            }
        },
        62832: (a, b, c) => {
            c.d(b, { A: () => d });
            let d = (0, c(23339).A)("Layers2", [
                ["path", { d: "m16.02 12 5.48 3.13a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74L7.98 12", key: "1cuww1" }],
                ["path", { d: "M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74Z", key: "pdlvxu" }],
            ]);
        },
        80196: (a, b, c) => {
            c.d(b, { A: () => d });
            let d = (0, c(23339).A)("Globe", [
                ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
                ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
                ["path", { d: "M2 12h20", key: "9i4pu4" }],
            ]);
        },
        90664: (a, b, c) => {
            c.d(b, { DY: () => i, G4: () => k, Ii: () => e, TU: () => j, Xu: () => g, rO: () => f, xV: () => l, xt: () => h });
            let d = /^[a-z][a-z0-9_]{2,19}$/,
                e = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            function f(a) {
                if (null == a) return null;
                let b = a.trim();
                if (!b) return "";
                try {
                    return decodeURIComponent(b).trim();
                } catch {
                    return null;
                }
            }
            function g(a) {
                if (!a) return !1;
                let b = a.trim();
                if (!b) return !1;
                if (e.test(b)) return !0;
                let c = (b.startsWith("@") ? b.slice(1) : b).toLowerCase();
                return d.test(c);
            }
            let h = new Set(["api", "auth", "login", "logout", "perfil", "profile", "configuracoes", "settings", "collection", "colecao", "dashboard", "cards", "inicio", "home", "admin", "me", "termos", "terms", "privacy", "privacidade", "mypokebinder"]);
            function i(a) {
                let b;
                return (b = ((a || "treinador").split("@")[0] || "treinador")
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-z0-9_]/g, ""))
                    ? (/^[a-z]/.test(b) || (b = `t${b}`), b.length > 20 && (b = b.slice(0, 20)), b.length < 3 && (b = `${b}xxx`.slice(0, 3)), h.has(b) && (b = `treinador_${b}`.slice(0, 20)), b)
                    : "treinador";
            }
            function j(a) {
                let b = a.trim().toLowerCase();
                return d.test(b) ? (h.has(b) ? { ok: !1, error: "Este username n\xe3o est\xe1 dispon\xedvel." } : { ok: !0, username: b }) : { ok: !1, error: "Use 3–20 caracteres: comece com letra; s\xf3 letras min\xfasculas, n\xfameros e _." };
            }
            function k(a) {
                let b = a.trim().replace(/\s+/g, " ");
                return b.length < 1 || b.length > 40 ? { ok: !1, error: "O nome deve ter entre 1 e 40 caracteres." } : { ok: !0, displayName: b };
            }
            function l(a) {
                let b = a.trim().replace(/\s+/g, " ");
                return 0 === b.length ? { ok: !0, bio: null } : b.length > 160 ? { ok: !1, error: `A descri\xe7\xe3o deve ter no m\xe1ximo 160 caracteres.` } : { ok: !0, bio: b };
            }
        },
    }));
