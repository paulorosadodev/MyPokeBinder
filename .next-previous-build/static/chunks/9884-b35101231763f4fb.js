"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [9884],
    {
        1019: (e, t, s) => {
            s.d(t, { L: () => x });
            var l = s(5155),
                a = s(5239),
                o = s(2619),
                r = s.n(o),
                n = s(9397),
                i = s(501),
                c = s(7937),
                d = s(5626),
                m = s(6937);
            function x(e) {
                let { username: t, type: s = "profile" } = e,
                    o = "collection" === s,
                    x = t ? t.replace(/^@/, "") : "",
                    u = o ? "Snorlax" : "Abra",
                    h = (0, m.Xw)(o ? 143 : 63);
                return (0, l.jsxs)("div", {
                    className: "min-h-screen flex flex-col bg-[#0a0c10] text-slate-100 relative overflow-hidden selection:bg-red-500/30 selection:text-white",
                    children: [
                        (0, l.jsxs)("div", {
                            className: "absolute inset-0 pointer-events-none overflow-hidden",
                            "aria-hidden": !0,
                            children: [
                                (0, l.jsx)("div", { className: "absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ".concat(o ? "bg-teal-500/[0.03]" : "bg-amber-500/[0.03]", " blur-[140px] rounded-full") }),
                                (0, l.jsx)("div", { className: "absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-sky-500/[0.02] blur-[120px] rounded-full" }),
                                (0, l.jsxs)("svg", { viewBox: "0 0 100 100", className: "absolute -right-20 top-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-[0.015] text-white stroke-current fill-none stroke-[2]", children: [(0, l.jsx)("circle", { cx: "50", cy: "50", r: "46" }), (0, l.jsx)("line", { x1: "4", y1: "50", x2: "96", y2: "50", strokeWidth: "4" }), (0, l.jsx)("circle", { cx: "50", cy: "50", r: "14", strokeWidth: "4" })] }),
                            ],
                        }),
                        (0, l.jsx)("main", {
                            className: "flex-1 relative z-10 flex items-center justify-center px-4 py-8 sm:py-16",
                            children: (0, l.jsxs)("div", {
                                className: "w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center",
                                children: [
                                    (0, l.jsx)("div", {
                                        className: "md:col-span-5 flex flex-col items-center justify-center order-1",
                                        children: (0, l.jsxs)("div", {
                                            className: "relative flex items-center justify-center select-none",
                                            "aria-label": "Ilustra\xe7\xe3o do Pok\xe9mon ".concat(u),
                                            children: [
                                                (0, l.jsx)("div", { className: "absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full ".concat(o ? "bg-teal-500/[0.05] border-teal-500/10" : "bg-amber-500/[0.05] border-amber-500/10", " border pointer-events-none transition-transform duration-500 hover:scale-105") }),
                                                (0, l.jsx)("div", { className: "absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-slate-500/[0.03] border border-white/5 pointer-events-none" }),
                                                (0, l.jsx)("div", { className: "relative z-10 w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 transition-all duration-300 select-none hover:scale-105", children: (0, l.jsx)(a.default, { src: h, alt: "Ilustra\xe7\xe3o do Pok\xe9mon ".concat(u), fill: !0, sizes: "(max-width: 640px) 210px, 290px", className: "object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.65)]", unoptimized: !0 }) }),
                                            ],
                                        }),
                                    }),
                                    (0, l.jsxs)("div", {
                                        className: "md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left space-y-5 order-2",
                                        children: [
                                            (0, l.jsxs)("div", {
                                                className: "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ".concat(o ? "bg-teal-500/10 border border-teal-500/20 text-teal-400" : "bg-amber-500/10 border border-amber-500/20 text-amber-400"),
                                                children: [o ? (0, l.jsx)(n.A, { size: 13, className: "shrink-0" }) : (0, l.jsx)(i.A, { size: 13, className: "shrink-0" }), (0, l.jsx)("span", { children: o ? "Cole\xe7\xe3o bloqueada" : "Treinador n\xe3o encontrado" })],
                                            }),
                                            (0, l.jsxs)("div", {
                                                className: "space-y-3",
                                                children: [
                                                    (0, l.jsx)("h1", { className: "text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight", children: o ? "Um Snorlax adormeceu sobre esta cole\xe7\xe3o." : "Este treinador parece ter usado Teleporte." }),
                                                    (0, l.jsx)("p", {
                                                        className: "text-sm sm:text-base text-slate-400 leading-relaxed max-w-lg",
                                                        children: x
                                                            ? (0, l.jsx)(l.Fragment, {
                                                                  children: o
                                                                      ? (0, l.jsxs)(l.Fragment, { children: ["Nenhuma cole\xe7\xe3o foi localizada para o treinador ", (0, l.jsxs)("span", { className: "font-mono text-teal-300 font-semibold", children: ["@", x] }), ". Um Snorlax selvagem bloqueou a rota deste binder e tirou uma bela soneca."] })
                                                                      : (0, l.jsxs)(l.Fragment, { children: ["Nenhum registro para ", (0, l.jsxs)("span", { className: "font-mono text-amber-300 font-semibold", children: ["@", x] }), " foi localizado. Assim como um Abra arisco, este treinador se teletransportou para longe do mapa."] }),
                                                              })
                                                            : o
                                                              ? "A cole\xe7\xe3o que voc\xea tentou acessar n\xe3o foi localizada. Um Snorlax parece estar bloqueando o caminho deste binder na Pok\xe9dex."
                                                              : "O perfil de treinador que voc\xea tentou acessar n\xe3o foi localizado ou n\xe3o existe nesta regi\xe3o da Pok\xe9dex.",
                                                    }),
                                                ],
                                            }),
                                            (0, l.jsxs)("div", {
                                                className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto",
                                                children: [
                                                    (0, l.jsxs)(r(), { href: "/", className: "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] shadow-lg ".concat(o ? "bg-teal-600 hover:bg-teal-500 text-white shadow-teal-600/25" : "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25"), children: [(0, l.jsx)(c.A, { size: 16 }), (0, l.jsx)("span", { children: "Voltar ao Meu Binder" })] }),
                                                    (0, l.jsxs)(r(), { href: "/collection", className: "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-sm transition-all active:scale-[0.98]", children: [(0, l.jsx)(n.A, { size: 16 }), (0, l.jsx)("span", { children: "Explorar Cole\xe7\xe3o" })] }),
                                                ],
                                            }),
                                            (0, l.jsx)("div", {
                                                children: (0, l.jsxs)("button", {
                                                    type: "button",
                                                    onClick: () => {
                                                        window.history.back();
                                                    },
                                                    className: "inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors pt-1",
                                                    children: [(0, l.jsx)(d.A, { size: 14 }), (0, l.jsx)("span", { children: "Retornar \xe0 p\xe1gina anterior" })],
                                                }),
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        }),
                        (0, l.jsxs)("footer", { className: "relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 border-t border-slate-900/60 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2", children: [(0, l.jsx)("span", { children: "MyPokeBinder \xb7 Cole\xe7\xe3o dos 151 Pok\xe9mon Originais" }), (0, l.jsx)("span", { className: "text-slate-600", children: "Se o caminho continuar bloqueado, use uma Pok\xe9 Flauta." })] }),
                    ],
                });
            }
        },
        4067: (e, t, s) => {
            s.d(t, { O: () => d });
            var l = s(5155),
                a = s(2115),
                o = s(5239),
                r = s(5229),
                n = s(148),
                i = s(6092),
                c = s(7997);
            function d(e) {
                let { src: t, alt: s = "Carta", shineMode: d = "none", elementTypes: m, onClose: x } = e,
                    u = (0, a.useRef)(null),
                    [h, p] = (0, a.useState)(t);
                (0, i.m)(!!t, x);
                let { isPresent: f, state: b } = (0, c.v)(!!t);
                return ((0, a.useEffect)(() => {
                    t && p(t);
                }, [t]),
                (0, a.useEffect)(() => {
                    if (!f) return;
                    let e = document.body.style.overflow,
                        t = document.body.style.touchAction,
                        s = document.documentElement.style.overflow,
                        l = document.documentElement.style.touchAction;
                    ((document.body.style.overflow = "hidden"), (document.body.style.touchAction = "none"), (document.documentElement.style.overflow = "hidden"), (document.documentElement.style.touchAction = "none"));
                    let a = (e) => {
                            e.cancelable && e.preventDefault();
                        },
                        o = u.current;
                    return (
                        o && o.addEventListener("touchmove", a, { passive: !1 }),
                        () => {
                            ((document.body.style.overflow = e), (document.body.style.touchAction = t), (document.documentElement.style.overflow = s), (document.documentElement.style.touchAction = l), o && o.removeEventListener("touchmove", a));
                        }
                    );
                }, [f]),
                f && h)
                    ? (0, l.jsxs)("div", {
                          ref: u,
                          className: "modal-backdrop fixed inset-0 z-[100] flex select-none items-center justify-center bg-black/80 p-4 backdrop-blur-md touch-none overscroll-none",
                          "data-overlay-state": b,
                          role: "dialog",
                          "aria-modal": "true",
                          "aria-label": s,
                          onClick: (e) => {
                              e.target === e.currentTarget && x();
                          },
                          children: [
                              (0, l.jsx)("button", { type: "button", onClick: x, "aria-label": "Fechar", className: "absolute right-4 top-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-6 sm:top-6", children: (0, l.jsx)(r.A, { size: 20, strokeWidth: 2.5 }) }),
                              (0, l.jsx)("div", {
                                  className: "modal-surface relative aspect-[8/11] w-[88vw] max-w-[420px] select-none touch-none",
                                  children: (0, l.jsx)(n.LW, { className: "relative h-full w-full overflow-hidden rounded-2xl touch-none", maxTilt: 18, scale: 1.05, glareOpacity: 0.35, perspective: 1e3, shineMode: d, elementTypes: m, enableTouch: !0, children: (0, l.jsx)(o.default, { src: h, alt: s, fill: !0, unoptimized: !0, priority: !0, sizes: "(max-width: 768px) 90vw, 500px", className: "pointer-events-none object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]" }) }),
                              }),
                          ],
                      })
                    : null;
            }
        },
        4298: (e, t, s) => {
            s.d(t, { DY: () => i, G4: () => d, NA: () => o, TU: () => c, d0: () => l, jl: () => x, xV: () => m, zz: () => a });
            let l = 20,
                a = 40,
                o = 160,
                r = /^[a-z][a-z0-9_]{2,19}$/,
                n = new Set(["api", "auth", "login", "logout", "perfil", "profile", "configuracoes", "settings", "collection", "colecao", "dashboard", "cards", "inicio", "home", "admin", "me", "termos", "terms", "privacy", "privacidade", "mypokebinder"]);
            function i(e) {
                let t;
                return (t = ((e || "treinador").split("@")[0] || "treinador")
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-z0-9_]/g, ""))
                    ? (/^[a-z]/.test(t) || (t = "t".concat(t)), t.length > l && (t = t.slice(0, l)), t.length < 3 && (t = "".concat(t, "xxx").slice(0, 3)), n.has(t) && (t = "treinador_".concat(t).slice(0, l)), t)
                    : "treinador";
            }
            function c(e) {
                let t = e.trim().toLowerCase();
                return r.test(t) ? (n.has(t) ? { ok: !1, error: "Este username n\xe3o est\xe1 dispon\xedvel." } : { ok: !0, username: t }) : { ok: !1, error: "Use 3–20 caracteres: comece com letra; s\xf3 letras min\xfasculas, n\xfameros e _." };
            }
            function d(e) {
                let t = e.trim().replace(/\s+/g, " ");
                return t.length < 1 || t.length > a ? { ok: !1, error: "O nome deve ter entre ".concat(1, " e ").concat(a, " caracteres.") } : { ok: !0, displayName: t };
            }
            function m(e) {
                let t = e.trim().replace(/\s+/g, " ");
                return 0 === t.length ? { ok: !0, bio: null } : t.length > o ? { ok: !1, error: "A descri\xe7\xe3o deve ter no m\xe1ximo ".concat(o, " caracteres.") } : { ok: !0, bio: t };
            }
            function x(e) {
                let t = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(e) ? e : "#ef4444";
                return { "--theme-primary": t, "--color-poke-blue": t, "--theme-primary-hover": "color-mix(in srgb, ".concat(t, " 85%, black)"), "--theme-primary-glow": "color-mix(in srgb, ".concat(t, " 40%, transparent)") };
            }
        },
        7667: (e, t, s) => {
            s.d(t, { ProfileRouteLoading: () => r });
            var l = s(5155),
                a = s(5626),
                o = s(9900);
            function r(e) {
                let { message: t = "Carregando perfil do treinador...", type: s = "profile" } = e;
                return "collection" === s || t.includes("cole\xe7\xe3o")
                    ? (0, l.jsx)("div", {
                          className: "flex min-h-screen flex-col bg-[#0a0c10]",
                          children: (0, l.jsxs)("main", {
                              className: "mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16",
                              children: [
                                  (0, l.jsxs)("header", {
                                      className: "flex flex-col gap-4",
                                      children: [
                                          (0, l.jsxs)("div", { className: "inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-slate-400", children: [(0, l.jsx)(a.A, { size: 14 }), (0, l.jsx)("span", { children: "Perfil" })] }),
                                          (0, l.jsxs)("div", {
                                              className: "flex items-center gap-3.5 sm:gap-4",
                                              children: [
                                                  (0, l.jsx)("div", { className: "h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-full border border-white/20 bg-white/10 animate-pulse" }),
                                                  (0, l.jsxs)("div", { className: "min-w-0 flex-1 space-y-1.5", children: [(0, l.jsx)("div", { className: "h-2.5 w-12 rounded bg-white/10 animate-pulse" }), (0, l.jsx)("div", { className: "h-5 sm:h-6 w-36 sm:w-48 rounded-lg bg-white/10 animate-pulse" }), (0, l.jsx)("div", { className: "h-3 w-28 rounded bg-white/5 animate-pulse" })] }),
                                              ],
                                          }),
                                      ],
                                  }),
                                  (0, l.jsx)("div", {
                                      className: "relative z-30 flex flex-col rounded-2xl border border-white/10 bg-[#121520]/80 p-2.5 sm:p-3.5 shadow-xl backdrop-blur-md",
                                      children: (0, l.jsxs)("div", { className: "flex items-center gap-2", children: [(0, l.jsx)("div", { className: "h-9 sm:h-10 flex-1 rounded-xl border border-white/10 bg-white/5 animate-pulse" }), (0, l.jsx)("div", { className: "h-9 sm:h-10 w-20 sm:w-24 shrink-0 rounded-xl border border-white/10 bg-white/5 animate-pulse" })] }),
                                  }),
                                  (0, l.jsx)("div", { className: "flex h-64 flex-col items-center justify-center", children: (0, l.jsx)(o.RouteLoading, { message: t, className: "flex flex-col items-center justify-center" }) }),
                              ],
                          }),
                      })
                    : (0, l.jsx)("div", { className: "flex flex-1 min-h-[calc(100dvh-4rem)] flex-col bg-[#0a0c10]", children: (0, l.jsx)(o.RouteLoading, { message: t }) });
            }
        },
        9900: (e, t, s) => {
            s.d(t, { RouteLoading: () => o });
            var l = s(5155),
                a = s(4303);
            function o(e) {
                let { message: t = "Carregando...", className: s } = e;
                return (0, l.jsx)("main", { className: s || "flex flex-1 items-start justify-center pt-10 sm:pt-14 md:pt-18 pb-16", children: (0, l.jsx)(a.i, { message: t, size: "lg" }) });
            }
        },
    },
]);
