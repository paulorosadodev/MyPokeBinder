(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3440],
    {
        501: (e, s, t) => {
            "use strict";
            t.d(s, { A: () => l });
            let l = (0, t(1847).A)("UserX", [
                ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
                ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
                ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
                ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }],
            ]);
        },
        562: (e, s, t) => {
            "use strict";
            t.d(s, { A: () => l });
            let l = (0, t(1847).A)("ArrowUp", [
                ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
                ["path", { d: "M12 19V5", key: "x0mq9r" }],
            ]);
        },
        2458: (e, s, t) => {
            "use strict";
            t.d(s, { A: () => l });
            let l = (0, t(1847).A)("Layers2", [
                ["path", { d: "m16.02 12 5.48 3.13a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74L7.98 12", key: "1cuww1" }],
                ["path", { d: "M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74Z", key: "pdlvxu" }],
            ]);
        },
        3341: (e, s, t) => {
            "use strict";
            t.d(s, { A: () => l });
            let l = (0, t(1847).A)("ArrowUpDown", [
                ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
                ["path", { d: "M17 20V4", key: "1ejh1v" }],
                ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
                ["path", { d: "M7 4v16", key: "1glfcx" }],
            ]);
        },
        3983: (e, s, t) => {
            "use strict";
            t.d(s, { PublicCollectionView: () => J });
            var l = t(5155),
                a = t(2115),
                r = t(5239),
                i = t(2619),
                n = t.n(i),
                o = t(4303),
                c = t(1019),
                d = t(7667),
                x = t(148),
                m = t(2671),
                p = t(4067),
                h = t(2755),
                u = t(7230),
                f = t(3698),
                b = t(4133),
                j = t(6245),
                w = t(4059),
                y = t(113),
                g = t(1978),
                v = t(2180),
                N = t(5801),
                k = t(3848),
                A = t(4298),
                z = t(7152),
                C = t(7937),
                _ = t(5626),
                M = t(9397),
                L = t(6651),
                S = t(5229),
                T = t(6630),
                E = t(9068),
                F = t(5322),
                O = t(5740),
                P = t(9926),
                I = t(3341),
                q = t(562),
                B = t(8803),
                U = t(2458),
                D = t(9559);
            let H = [
                    { value: "all", label: "Todas as cartas" },
                    { value: "in_binder", label: "No Binder" },
                    { value: "stored", label: "Guardadas" },
                ],
                V = [
                    { value: "all", label: "Todos os idiomas" },
                    { value: "pt-br", label: "Portugu\xeas (PT-BR)", icon: (0, l.jsx)(h.i, { country: "pt-br" }) },
                    { value: "en", label: "Ingl\xeas (EN)", icon: (0, l.jsx)(h.i, { country: "en" }) },
                    { value: "ja", label: "Japon\xeas (JA)", icon: (0, l.jsx)(h.i, { country: "ja" }) },
                ],
                R = [
                    { value: "dex", label: "Pok\xe9dex" },
                    { value: "name", label: "Nome" },
                    { value: "recent", label: "Data de adi\xe7\xe3o" },
                ];
            function G(e) {
                let { card: s, imageSrc: t, shineMode: r, elementTypes: i, priority: n = !1 } = e,
                    [o, c] = (0, a.useState)(() => (0, m.y7)(t));
                return (
                    (0, a.useEffect)(() => {
                        (0, m.y7)(t) && c(!0);
                    }, [t]),
                    (0, l.jsx)(x.LW, { className: "relative h-full w-full overflow-hidden rounded-lg", maxTilt: 8, maxMove: 3, scale: 1, glareOpacity: 0.2, perspective: 900, shineMode: r, elementTypes: i, isLoading: !o, children: (0, l.jsx)(m.MH, { src: t, alt: s.card_name, sizes: "(max-width: 640px) 30vw, (max-width: 768px) 33vw, 200px", className: "object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]", priority: n, onLoadingChange: c }) })
                );
            }
            function J(e) {
                var s, t, i;
                let { username: x, fallbackData: m } = e,
                    [J, W] = (0, a.useState)(!1),
                    [X, Z] = (0, a.useState)(""),
                    [K, Q] = (0, a.useState)(""),
                    [Y, $] = (0, a.useState)("all"),
                    [ee, es] = (0, a.useState)("all"),
                    [et, el] = (0, a.useState)("all"),
                    [ea, er] = (0, a.useState)("all"),
                    [ei, en] = (0, a.useState)(v.Ig),
                    [eo, ec] = (0, a.useState)(v.ej),
                    [ed, ex] = (0, a.useState)("dex"),
                    [em, ep] = (0, a.useState)("asc"),
                    [eh, eu] = (0, a.useState)(null),
                    [ef, eb] = (0, a.useState)(!1),
                    [ej, ew] = (0, a.useState)(!1);
                ((0, a.useEffect)(() => {
                    let e = setTimeout(() => {
                        Q(X);
                    }, 250);
                    return () => clearTimeout(e);
                }, [X]),
                    (0, a.useEffect)(() => {
                        let e = () => {
                            eb(window.innerWidth < 640);
                        };
                        return (e(), window.addEventListener("resize", e), () => window.removeEventListener("resize", e));
                    }, []),
                    (0, a.useEffect)(() => {
                        (W(!1), Z(""), Q(""), $("all"), es("all"), el("all"), er("all"), en(v.Ig), ec(v.ej), ex("dex"), ep("asc"), ew(!1));
                    }, [x]));
                let ey = (0, a.useMemo)(() => {
                        let e = 0;
                        return ("all" !== Y && e++, "all" !== ee && e++, "all" !== et && e++, "all" !== ea && e++, ei !== v.Ig && e++, eo !== v.ej && e++, e);
                    }, [Y, ee, et, ea, ei, eo]),
                    eg = (0, a.useCallback)(function (e, s) {
                        let t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "none",
                            l = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ["Colorless"];
                        eu({ src: e, alt: s, shineMode: t, elementTypes: l });
                    }, []),
                    ev = (0, a.useCallback)(() => {
                        eu(null);
                    }, []),
                    { expansions: eN } = (0, z.K_)(x),
                    ek = (0, a.useMemo)(() => (0, v.SI)(eN), [eN]),
                    { artists: eA } = (0, z.CV)(x),
                    ez = (0, a.useMemo)(() => (0, v.ay)(eA), [eA]),
                    { groups: eC, total: e_, owner: eM, isOwner: eL, isLoading: eS, isLoadingMore: eT, hasMore: eE, loadMore: eF, isError: eO } = (0, z.n9)(x, { searchTerm: K, statusFilter: Y, languageFilter: ee, rarityFilter: et, expansionFilter: ei, artistFilter: eo, variantFilter: ea, sortField: ed, sortDirection: em }),
                    eP = eM || (null == m ? void 0 : m.owner),
                    eI = "boolean" == typeof eL ? eL : null != (s = null == m ? void 0 : m.isOwner) && s,
                    eq = (0, a.useMemo)(() => (0, v.tF)({ searchTerm: K, statusFilter: Y, languageFilter: ee, rarityFilter: et, expansionFilter: ei, artistFilter: eo, variantFilter: ea, sortField: ed, sortDirection: em }), [K, Y, ee, et, ei, eo, ea, ed, em]),
                    eB = (0, N.X)({ hasMore: eE, onLoadMore: eF, enabled: !eS && eC.length > 0 });
                if (eO)
                    return (null == (t = eO.message) ? void 0 : t.includes("Perfil n\xe3o encontrado")) || "not_found" === eO.message
                        ? (0, l.jsx)(c.L, { username: x, type: "collection" })
                        : (0, l.jsx)("div", {
                              className: "flex min-h-screen flex-col bg-[#0a0c10]",
                              children: (0, l.jsx)("main", {
                                  className: "mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center p-6 text-center",
                                  children: (0, l.jsxs)("div", {
                                      className: "rounded-2xl border border-white/10 bg-[#12151d] p-8 shadow-xl",
                                      children: [(0, l.jsx)("p", { className: "text-base font-bold text-white", children: "N\xe3o foi poss\xedvel carregar a cole\xe7\xe3o." }), (0, l.jsxs)(n(), { href: "/", className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-poke-blue px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90", children: [(0, l.jsx)(C.A, { size: 14 }), (0, l.jsx)("span", { children: "Voltar ao Binder" })] })],
                                  }),
                              }),
                          });
                if (eS && !eP) return (0, l.jsx)(d.ProfileRouteLoading, { message: "Carregando cole\xe7\xe3o...", type: "collection" });
                if (!eP) return (0, l.jsx)(c.L, { username: x, type: "collection" });
                let eU = (0, A.jl)(eP.themeColor || "#ef4444"),
                    eD = !!X.trim() || "all" !== Y || "all" !== ee || "all" !== et || "all" !== ea || ei !== v.Ig || eo !== v.ej,
                    eH = eP.name || "@".concat(eP.username);
                return (0, l.jsxs)("div", {
                    className: "flex min-h-screen flex-col bg-[#0a0c10]",
                    children: [
                        (0, l.jsx)("div", {
                            style: eU,
                            children: (0, l.jsxs)(
                                "main",
                                {
                                    className: "mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16",
                                    children: [
                                        (0, l.jsxs)("header", {
                                            className: "profile-enter flex flex-col gap-4",
                                            children: [
                                                (0, l.jsxs)(n(), { href: "/perfil/".concat(eP.username), prefetch: !0, className: "inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-slate-400 transition-colors hover:text-white", children: [(0, l.jsx)(_.A, { size: 14 }), (0, l.jsx)("span", { children: "Perfil" })] }),
                                                (0, l.jsxs)("div", {
                                                    className: "flex items-center gap-3.5 sm:gap-4",
                                                    children: [
                                                        eP.avatarUrl && !J
                                                            ? (0, l.jsx)(r.default, { src: eP.avatarUrl, alt: eP.username, width: 56, height: 56, className: "h-12 w-12 shrink-0 rounded-full border border-white/20 object-cover sm:h-14 sm:w-14", referrerPolicy: "no-referrer", onError: () => W(!0), unoptimized: !0 })
                                                            : (0, l.jsx)("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-base font-bold text-white sm:h-14 sm:w-14", children: (eP.username[0] || "T").toUpperCase() }),
                                                        (0, l.jsxs)("div", {
                                                            className: "min-w-0 flex-1",
                                                            children: [
                                                                (0, l.jsx)("p", { className: "text-[11px] font-medium text-slate-500", children: "Cole\xe7\xe3o" }),
                                                                (0, l.jsx)("h1", { className: "truncate text-lg font-extrabold tracking-tight text-white sm:text-xl", children: eH }),
                                                                (0, l.jsxs)("div", {
                                                                    className: "mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs",
                                                                    children: [
                                                                        (0, l.jsxs)("span", { className: "font-mono font-semibold text-poke-blue", children: ["@", eP.username] }),
                                                                        (0, l.jsx)("span", { className: "text-slate-600", "aria-hidden": !0, children: "/" }),
                                                                        eS
                                                                            ? (0, l.jsxs)("span", { className: "inline-flex items-center gap-1.5 text-slate-400", children: [(0, l.jsx)(M.A, { size: 12, className: "text-poke-blue animate-pulse" }), (0, l.jsx)("span", { className: "h-3.5 w-6 animate-pulse rounded bg-white/10", "aria-label": "Carregando total de cartas" }), (0, l.jsx)("span", { className: "text-slate-400", children: "cartas" })] })
                                                                            : (0, l.jsxs)("span", { className: "inline-flex items-center gap-1 text-slate-400", children: [(0, l.jsx)(M.A, { size: 12, className: "text-poke-blue" }), (0, l.jsx)("span", { className: "font-mono font-bold text-white", children: e_ }), (0, l.jsx)("span", { children: eD ? (1 === e_ ? "carta encontrada" : "cartas encontradas") : 1 === e_ ? "carta na cole\xe7\xe3o" : "cartas na cole\xe7\xe3o" })] }),
                                                                    ],
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, l.jsxs)("div", {
                                            className: "profile-enter profile-enter-d1 relative z-30 flex flex-col ".concat(ej ? "gap-2.5 sm:gap-3" : "gap-0", " rounded-2xl border border-white/10 bg-[#121520]/80 p-2.5 shadow-xl backdrop-blur-md transition-all sm:p-3.5"),
                                            children: [
                                                (0, l.jsxs)("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        (0, l.jsxs)("div", {
                                                            className: "relative min-w-0 flex-1",
                                                            children: [
                                                                (0, l.jsx)(L.A, { size: 15, className: "pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-slate-500 z-20 sm:left-3.5 sm:h-4 sm:w-4" }),
                                                                (0, l.jsx)(u.D, {
                                                                    type: "text",
                                                                    value: X,
                                                                    onChange: (e) => Z(e.target.value),
                                                                    placeholder: ef ? "Buscar cartas..." : "Buscar por pok\xe9mon, n\xfamero, cole\xe7\xe3o ou pok\xe9dex...",
                                                                    placeholderClassName: "left-8.5 right-8 text-xs sm:left-10 sm:right-9 sm:text-sm",
                                                                    className: "w-full h-9 sm:h-10 rounded-xl border border-white/10 bg-white/5 py-2 sm:py-2.5 pr-8 sm:pr-9 pl-8.5 sm:pl-10 text-xs sm:text-sm text-white transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none",
                                                                }),
                                                                X ? (0, l.jsx)("button", { type: "button", onClick: () => Z(""), "aria-label": "Limpar busca", className: "absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-500 hover:text-white z-20 sm:right-3", children: (0, l.jsx)(S.A, { size: 14, className: "sm:h-[15px] sm:w-[15px]" }) }) : null,
                                                            ],
                                                        }),
                                                        (0, l.jsxs)("button", {
                                                            type: "button",
                                                            onClick: () => ew((e) => !e),
                                                            "aria-label": "Alternar filtros",
                                                            "aria-expanded": ej,
                                                            className: "flex h-9 sm:h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border px-2.5 sm:px-3 text-xs font-semibold transition-colors ".concat(ej || ey > 0 ? "border-poke-blue/60 bg-poke-blue/20 text-white" : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"),
                                                            children: [(0, l.jsx)(T.A, { size: 13, className: ey > 0 ? "text-poke-blue" : "text-slate-400" }), (0, l.jsx)("span", { className: "inline", children: "Filtros" }), ey > 0 && (0, l.jsx)("span", { className: "flex h-4 min-w-4 items-center justify-center rounded-full bg-poke-blue px-1 text-[10px] font-bold text-white", children: ey })],
                                                        }),
                                                    ],
                                                }),
                                                (0, l.jsx)("div", {
                                                    className: "grid transition-all duration-300 ease-in-out ".concat(ej ? "grid-rows-[1fr] opacity-100 border-t border-white/10 pt-3" : "grid-rows-[0fr] opacity-0 border-t-0 pt-0 pointer-events-none"),
                                                    children: (0, l.jsx)("div", {
                                                        className: "overflow-hidden",
                                                        children: (0, l.jsxs)("div", {
                                                            className: "grid grid-cols-2 gap-1.5 sm:flex sm:flex-wrap sm:items-center sm:gap-2.5 w-full",
                                                            children: [
                                                                (0, l.jsx)(f.l, { value: Y, onChange: $, options: H, icon: (0, l.jsx)(C.A, { size: 13 }), ariaLabel: "Filtrar por status no binder", className: "w-full min-w-0 sm:flex-1 sm:min-w-[140px]", size: "sm" }),
                                                                (0, l.jsx)(f.l, { value: ee, onChange: es, options: V, icon: (0, l.jsx)(E.A, { size: 13 }), ariaLabel: "Filtrar por idioma", className: "w-full min-w-0 sm:flex-1 sm:min-w-[145px]", menuClassName: "sm:left-0 sm:right-auto", align: "right", size: "sm" }),
                                                                (0, l.jsx)(f.l, { value: et, onChange: el, options: j.OI, icon: (0, l.jsx)(F.A, { size: 13 }), ariaLabel: "Filtrar por raridade", className: "w-full min-w-0 sm:flex-1 sm:min-w-[155px]", size: "sm" }),
                                                                (0, l.jsx)(f.l, { value: ea, onChange: er, options: w.ye, icon: (0, l.jsx)(O.A, { size: 13 }), ariaLabel: "Filtrar por vers\xe3o", className: "w-full min-w-0 sm:flex-1 sm:min-w-[185px]", size: "sm" }),
                                                                (0, l.jsx)(f.l, { value: ei, onChange: en, options: ek, icon: (0, l.jsx)(M.A, { size: 13 }), ariaLabel: "Filtrar por expans\xe3o", className: "w-full min-w-0 sm:col-span-1 sm:flex-1 sm:min-w-[170px]", size: "sm" }),
                                                                (0, l.jsx)(f.l, { value: eo, onChange: ec, options: ez, icon: (0, l.jsx)(P.A, { size: 13 }), ariaLabel: "Filtrar por ilustrador", className: "w-full min-w-0 sm:col-span-1 sm:flex-1 sm:min-w-[170px]", size: "sm" }),
                                                                (0, l.jsxs)("div", {
                                                                    className: "col-span-2 flex w-full min-w-0 items-center gap-1.5 sm:col-span-1 sm:flex-1 sm:min-w-[190px]",
                                                                    children: [
                                                                        (0, l.jsx)(f.l, { value: ed, onChange: ex, options: R, icon: (0, l.jsx)(I.A, { size: 13 }), ariaLabel: "Ordenar cole\xe7\xe3o", className: "min-w-0 flex-1", size: "sm", align: "right" }),
                                                                        (0, l.jsx)("button", {
                                                                            type: "button",
                                                                            onClick: () => ep((e) => ("asc" === e ? "desc" : "asc")),
                                                                            "aria-label": "asc" === em ? "Ordem crescente" : "Ordem decrescente",
                                                                            className: "flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg sm:rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-poke-blue/50 hover:bg-white/10 hover:text-white active:scale-95",
                                                                            children: "asc" === em ? (0, l.jsx)(q.A, { size: 14 }) : (0, l.jsx)(B.A, { size: 14 }),
                                                                        }),
                                                                    ],
                                                                }),
                                                            ],
                                                        }),
                                                    }),
                                                }),
                                            ],
                                        }),
                                        eS
                                            ? (0, l.jsx)("div", { className: "flex h-64 flex-col items-center justify-center", children: (0, l.jsx)(o.i, { message: "Carregando cole\xe7\xe3o...", size: "lg" }) })
                                            : 0 !== e_ || eD || K.trim()
                                              ? 0 === eC.length
                                                  ? (0, l.jsxs)("div", {
                                                        className: "profile-enter profile-enter-d2 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#12151d] p-10 text-center",
                                                        children: [
                                                            (0, l.jsx)(L.A, { size: 28, className: "text-slate-600" }),
                                                            (0, l.jsx)("p", { className: "mt-2 text-sm font-bold text-white", children: "Nenhuma carta encontrada" }),
                                                            (0, l.jsx)("p", { className: "mt-0.5 text-xs text-slate-400", children: "Tente ajustar a busca ou os filtros." }),
                                                            eD
                                                                ? (0, l.jsx)("button", {
                                                                      type: "button",
                                                                      onClick: () => {
                                                                          (Z(""), Q(""), $("all"), es("all"), el("all"), en(v.Ig), ec(v.ej), ew(!1));
                                                                      },
                                                                      className: "mt-3 rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10",
                                                                      children: "Limpar filtros",
                                                                  })
                                                                : null,
                                                        ],
                                                    })
                                                  : (0, l.jsxs)("div", {
                                                        className: "profile-enter profile-enter-d2 flex flex-col gap-4",
                                                        children: [
                                                            (0, l.jsx)(
                                                                "div",
                                                                {
                                                                    className: "relative z-0 isolate grid auto-rows-fr grid-cols-3 gap-2 sm:grid-cols-3 sm:gap-3.5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
                                                                    children: eC.map((e, s) => {
                                                                        let t = e.card,
                                                                            a = (0, k.O)(s),
                                                                            r = (0, j._I)(t.card_rarity, t.card_name),
                                                                            i = (0, b.HO)(t.card_image_url),
                                                                            n = (0, w.WE)(t.card_variant, t.card_rarity, t.card_image_url, t.card_name),
                                                                            o = (0, y.Mr)(t.card_types, t.pokemon_dex_id);
                                                                        return (0, l.jsxs)(
                                                                            "button",
                                                                            {
                                                                                type: "button",
                                                                                onClick: () => eg(i, t.card_name, n, o),
                                                                                className: "group relative flex cursor-zoom-in flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-1.5 text-left transition-all duration-200 hover:border-poke-blue/50 hover:bg-white/[0.06] sm:p-2.5 ".concat(a.className),
                                                                                style: a.style,
                                                                                "aria-label": "Ampliar ".concat(t.card_name),
                                                                                children: [
                                                                                    (0, l.jsxs)("div", {
                                                                                        className: "z-10 flex min-h-[20px] items-center justify-between gap-1 sm:min-h-[26px]",
                                                                                        children: [
                                                                                            (0, l.jsxs)("span", { className: "flex h-4.5 sm:h-5 items-center shrink-0 rounded bg-black/60 px-1 text-[9px] font-bold text-slate-300 backdrop-blur-sm sm:px-1.5 sm:text-[10px]", children: ["#", String(t.pokemon_dex_id).padStart(3, "0")] }),
                                                                                            (0, l.jsxs)("div", {
                                                                                                className: "flex items-center gap-0.5 sm:gap-1",
                                                                                                children: [
                                                                                                    t.card_condition && (0, l.jsx)(g.J, { condition: t.card_condition }),
                                                                                                    "holo" === t.card_variant && (0, l.jsx)("span", { title: "Foil", "aria-label": "Foil", className: "flex h-4.5 sm:h-5 w-4.5 sm:w-5 items-center justify-center rounded border border-amber-500/40 bg-amber-500/20 text-amber-300", children: (0, l.jsx)(O.A, { size: 11, className: "sm:h-3 sm:w-3" }) }),
                                                                                                    "reverse" === t.card_variant && (0, l.jsx)("span", { title: "Reverse Foil", "aria-label": "Reverse Foil", className: "flex h-4.5 sm:h-5 w-4.5 sm:w-5 items-center justify-center rounded border border-cyan-500/40 bg-cyan-500/20 text-cyan-300", children: (0, l.jsx)(D.A, { size: 11, className: "sm:h-3 sm:w-3" }) }),
                                                                                                    e.hasInBinder && (0, l.jsx)("span", { title: "No Binder", "aria-label": "No Binder", className: "flex h-4.5 sm:h-5 w-4.5 sm:w-5 items-center justify-center rounded border border-poke-blue/40 bg-poke-blue/20 text-poke-blue", children: (0, l.jsx)(C.A, { size: 11, className: "sm:h-3 sm:w-3" }) }),
                                                                                                    e.totalCount > 1 && (0, l.jsxs)("span", { className: "flex h-4.5 sm:h-5 items-center rounded bg-poke-blue px-1 font-mono text-[8px] font-extrabold text-white shadow-md sm:px-1.5 sm:text-[10px]", children: ["x", e.totalCount] }),
                                                                                                ],
                                                                                            }),
                                                                                        ],
                                                                                    }),
                                                                                    (0, l.jsx)("div", { className: "relative my-1 aspect-[8/11] w-full sm:my-2", children: (0, l.jsx)(G, { card: t, imageSrc: i, shineMode: n, elementTypes: o, priority: 0 === s }) }),
                                                                                    (0, l.jsxs)("div", {
                                                                                        className: "flex min-h-[30px] flex-col justify-center gap-0.5 sm:min-h-[38px] sm:gap-1",
                                                                                        children: [
                                                                                            (0, l.jsxs)("div", { className: "flex items-center justify-between gap-1", children: [(0, l.jsx)("span", { className: "truncate text-[10px] font-semibold text-white sm:text-xs", children: t.card_name }), (0, l.jsx)("span", { className: "shrink-0 rounded border px-1 text-[7px] font-semibold sm:text-[8px] ".concat(r.badgeClasses), children: r.label })] }),
                                                                                            (0, l.jsxs)("div", {
                                                                                                className: "flex items-center justify-between text-[8px] text-slate-400 sm:text-[10px]",
                                                                                                children: [(0, l.jsx)("span", { className: "max-w-[65%] truncate", title: t.card_artist ? "".concat(t.card_set_name || "Cole\xe7\xe3o", " \xb7 ").concat(t.card_artist) : t.card_set_name || "Cole\xe7\xe3o", children: t.card_set_name || "Cole\xe7\xe3o" }), (0, l.jsx)("div", { className: "flex items-center gap-0.5 sm:gap-1", children: (0, l.jsx)(h.i, { country: t.card_language }) })],
                                                                                            }),
                                                                                        ],
                                                                                    }),
                                                                                ],
                                                                            },
                                                                            "".concat(eq, "-").concat(e.key),
                                                                        );
                                                                    }),
                                                                },
                                                                eq,
                                                            ),
                                                            eT && (0, l.jsx)("div", { className: "flex justify-center py-4", children: (0, l.jsx)(o.i, { message: "Carregando mais cartas...", size: "sm" }) }),
                                                            (0, l.jsx)("div", { ref: eB, className: "flex min-h-8 items-center justify-center", "aria-hidden": !eE }),
                                                        ],
                                                    })
                                              : (0, l.jsxs)("div", {
                                                    className: "profile-enter profile-enter-d2 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#12151d] p-10 text-center",
                                                    children: [(0, l.jsx)(U.A, { size: 32, className: "text-slate-600" }), (0, l.jsx)("p", { className: "mt-2 text-sm font-bold text-white", children: "Cole\xe7\xe3o vazia" }), (0, l.jsx)("p", { className: "mt-0.5 text-xs text-slate-400", children: eI ? "Adicione cartas na sua Cole\xe7\xe3o para exibi-las aqui." : "Este treinador ainda n\xe3o cadastrou cartas." })],
                                                }),
                                    ],
                                },
                                x,
                            ),
                        }),
                        (0, l.jsx)(p.O, { src: null != (i = null == eh ? void 0 : eh.src) ? i : null, alt: null == eh ? void 0 : eh.alt, shineMode: null == eh ? void 0 : eh.shineMode, elementTypes: null == eh ? void 0 : eh.elementTypes, onClose: ev }),
                    ],
                });
            }
        },
        4033: (e, s, t) => {
            "use strict";
            t.d(s, { A: () => l });
            let l = (0, t(1847).A)("ChevronDown", [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]);
        },
        5233: (e, s, t) => {
            (Promise.resolve().then(t.bind(t, 7667)), Promise.resolve().then(t.bind(t, 3983)));
        },
        5322: (e, s, t) => {
            "use strict";
            t.d(s, { A: () => l });
            let l = (0, t(1847).A)("Gem", [
                ["path", { d: "M6 3h12l4 6-10 13L2 9Z", key: "1pcd5k" }],
                ["path", { d: "M11 3 8 9l4 13 4-13-3-6", key: "1fcu3u" }],
                ["path", { d: "M2 9h20", key: "16fsjt" }],
            ]);
        },
        5626: (e, s, t) => {
            "use strict";
            t.d(s, { A: () => l });
            let l = (0, t(1847).A)("ArrowLeft", [
                ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
                ["path", { d: "M19 12H5", key: "x3x0zl" }],
            ]);
        },
        5917: (e, s, t) => {
            "use strict";
            t.d(s, { A: () => l });
            let l = (0, t(1847).A)("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
        },
        6630: (e, s, t) => {
            "use strict";
            t.d(s, { A: () => l });
            let l = (0, t(1847).A)("SlidersHorizontal", [
                ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
                ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
                ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
                ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
                ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
                ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
                ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
                ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
                ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }],
            ]);
        },
        8803: (e, s, t) => {
            "use strict";
            t.d(s, { A: () => l });
            let l = (0, t(1847).A)("ArrowDown", [
                ["path", { d: "M12 5v14", key: "s699le" }],
                ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }],
            ]);
        },
        9068: (e, s, t) => {
            "use strict";
            t.d(s, { A: () => l });
            let l = (0, t(1847).A)("Globe", [
                ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
                ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
                ["path", { d: "M2 12h20", key: "9i4pu4" }],
            ]);
        },
        9926: (e, s, t) => {
            "use strict";
            t.d(s, { A: () => l });
            let l = (0, t(1847).A)("Palette", [
                ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
                ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
                ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }],
                ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
                ["path", { d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z", key: "12rzf8" }],
            ]);
        },
    },
    (e) => {
        (e.O(0, [5730, 235, 2619, 5239, 4102, 9605, 1013, 6937, 148, 2006, 5246, 9884, 8441, 1255, 7358], () => e((e.s = 5233))), (_N_E = e.O()));
    },
]);
