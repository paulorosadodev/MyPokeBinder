(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [5607],
    {
        6191: (e, t, s) => {
            "use strict";
            s.d(t, { A: () => a });
            let a = (0, s(1847).A)("Plus", [
                ["path", { d: "M5 12h14", key: "1ays0h" }],
                ["path", { d: "M12 5v14", key: "s699le" }],
            ]);
        },
        7052: (e, t, s) => {
            "use strict";
            (s.r(t), s.d(t, { default: () => G }));
            var a = s(5155),
                r = s(2115),
                l = s(2619),
                i = s.n(l),
                n = s(63),
                o = s(8696),
                c = s(4303),
                d = s(2755),
                m = s(7230),
                x = s(148),
                u = s(2671),
                p = s(3698),
                h = s(8972),
                f = s(4133),
                b = s(6245),
                g = s(4059),
                j = s(113),
                w = s(1978),
                v = s(2180),
                y = s(5801),
                N = s(3848),
                _ = s(7152),
                k = s(6191),
                C = s(6651),
                z = s(5229),
                A = s(6630),
                F = s(7937),
                S = s(9068),
                T = s(5322),
                E = s(5740),
                L = s(9397),
                M = s(9926),
                O = s(3341),
                I = s(562),
                P = s(8803),
                B = s(9559);
            function R(e) {
                let { card: t, priority: s = !1 } = e,
                    l = (0, f.HO)(t.card_image_url),
                    [i, n] = (0, r.useState)(() => (0, u.y7)(l)),
                    o = (0, g.WE)(t.card_variant, t.card_rarity, t.card_image_url, t.card_name),
                    c = (0, j.Mr)(t.card_types, t.pokemon_dex_id);
                return (
                    (0, r.useEffect)(() => {
                        (0, u.y7)(l) && n(!0);
                    }, [l]),
                    (0, a.jsx)(x.LW, { className: "relative h-full w-full overflow-hidden rounded-lg", maxTilt: 8, maxMove: 3, scale: 1, glareOpacity: 0.2, perspective: 900, shineMode: o, elementTypes: c, isLoading: !i, children: (0, a.jsx)(u.MH, { src: l, alt: t.card_name, sizes: "(max-width: 640px) 30vw, (max-width: 768px) 33vw, 200px", className: "object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]", priority: s, onLoadingChange: n }) })
                );
            }
            let D = [
                    { value: "all", label: "Todas as cartas" },
                    { value: "in_binder", label: "No Binder" },
                    { value: "stored", label: "Guardadas" },
                ],
                J = [
                    { value: "all", label: "Todos os idiomas" },
                    { value: "pt-br", label: "Portugu\xeas (PT-BR)", icon: (0, a.jsx)(d.i, { country: "pt-br" }) },
                    { value: "en", label: "Ingl\xeas (EN)", icon: (0, a.jsx)(d.i, { country: "en" }) },
                    { value: "ja", label: "Japon\xeas (JA)", icon: (0, a.jsx)(d.i, { country: "ja" }) },
                ],
                q = [
                    { value: "dex", label: "Pok\xe9dex" },
                    { value: "name", label: "Nome" },
                    { value: "recent", label: "Data de adi\xe7\xe3o" },
                ];
            function G() {
                let e = (0, n.useRouter)(),
                    { mutate: t, cache: s } = (0, o.iX)(),
                    [l, x] = (0, r.useState)(""),
                    [u, f] = (0, r.useState)(""),
                    [j, G] = (0, r.useState)("all"),
                    [W, H] = (0, r.useState)("all"),
                    [X, V] = (0, r.useState)("all"),
                    [K, Q] = (0, r.useState)(v.Ig),
                    [U, Y] = (0, r.useState)(v.ej),
                    [Z, $] = (0, r.useState)("all"),
                    [ee, et] = (0, r.useState)("recent"),
                    [es, ea] = (0, r.useState)("desc"),
                    [er, el] = (0, r.useState)(!1),
                    ei = (0, r.useRef)(!1);
                (0, r.useEffect)(() => {
                    let e = setTimeout(() => {
                        f(l);
                    }, 250);
                    return () => clearTimeout(e);
                }, [l]);
                let en = (0, r.useMemo)(() => {
                    let e = 0;
                    return ("all" !== j && e++, "all" !== W && e++, "all" !== X && e++, K !== v.Ig && e++, U !== v.ej && e++, "all" !== Z && e++, e);
                }, [j, W, X, K, U, Z]);
                (0, r.useEffect)(() => {
                    try {
                        let e = sessionStorage.getItem("mypokebinder_collection_filters");
                        if (e) {
                            let t = JSON.parse(e);
                            (t.searchTerm && (x(t.searchTerm), f(t.searchTerm)), t.statusFilter && G(t.statusFilter), t.languageFilter && H(t.languageFilter), t.rarityFilter && V(t.rarityFilter), t.expansionFilter && Q(t.expansionFilter), t.artistFilter && Y(t.artistFilter), t.variantFilter && $(t.variantFilter), t.sortField && et(t.sortField), t.sortDirection && ea(t.sortDirection));
                        }
                    } catch (e) {}
                    ei.current = !0;
                }, []);
                let [eo, ec] = (0, r.useState)(!1),
                    [ed, em] = (0, r.useState)(!1);
                (0, r.useEffect)(() => {
                    let e = () => {
                        em(window.innerWidth < 640);
                    };
                    return (e(), window.addEventListener("resize", e), () => window.removeEventListener("resize", e));
                }, []);
                let { expansions: ex, mutate: eu } = (0, _.vb)(),
                    ep = (0, r.useMemo)(() => (0, v.SI)(ex), [ex]),
                    { artists: eh, mutate: ef } = (0, _.PJ)(),
                    eb = (0, r.useMemo)(() => (0, v.ay)(eh), [eh]),
                    { groups: eg, total: ej, isLoading: ew, isLoadingMore: ev, hasMore: ey, loadMore: eN, isError: e_, mutate: ek } = (0, _._k)({ searchTerm: u, statusFilter: j, languageFilter: W, rarityFilter: X, expansionFilter: K, artistFilter: U, variantFilter: Z, sortField: ee, sortDirection: es }),
                    eC = (0, r.useMemo)(() => (0, v.tF)({ searchTerm: u, statusFilter: j, languageFilter: W, rarityFilter: X, expansionFilter: K, artistFilter: U, variantFilter: Z, sortField: ee, sortDirection: es }), [u, j, W, X, K, U, Z, ee, es]),
                    ez = (0, y.X)({ hasMore: ey, onLoadMore: eN, enabled: !ew && eg.length > 0 });
                (0, r.useEffect)(() => {
                    if (ei.current)
                        try {
                            sessionStorage.setItem("mypokebinder_collection_filters", JSON.stringify({ searchTerm: l, statusFilter: j, languageFilter: W, rarityFilter: X, expansionFilter: K, artistFilter: U, variantFilter: Z, sortField: ee, sortDirection: es }));
                        } catch (e) {}
                }, [l, j, W, X, K, U, Z, ee, es]);
                let eA = (0, r.useRef)(null),
                    eF = (0, r.useRef)(new Set());
                (0, r.useEffect)(
                    () => () => {
                        null !== eA.current && window.clearTimeout(eA.current);
                    },
                    [],
                );
                let eS = (a, r) => {
                    var l;
                    let i = "/cards/".concat(a.id, "?from=collection"),
                        n = "/api/cards/".concat(a.id),
                        o = null == (l = s.get(n)) ? void 0 : l.data;
                    (e.prefetch(i),
                        o || t(n, { card: a, copies: r, availableVariants: g.ab, allocation: null }, !1),
                        o ||
                            eF.current.has(n) ||
                            (eF.current.add(n),
                            t(n, (0, _.GO)(n), { revalidate: !1 })
                                .catch(() => void 0)
                                .finally(() => eF.current.delete(n))));
                };
                return (0, a.jsxs)("div", {
                    className: "flex min-h-screen flex-col",
                    children: [
                        (0, a.jsxs)("main", {
                            className: "mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16",
                            children: [
                                (0, a.jsxs)("div", {
                                    className: "flex flex-col justify-between gap-4 md:flex-row md:items-center",
                                    children: [
                                        (0, a.jsx)("div", { children: (0, a.jsx)("h1", { className: "text-2xl font-extrabold tracking-tight text-white sm:text-3xl", children: "Minha Cole\xe7\xe3o" }) }),
                                        (0, a.jsxs)("button", { type: "button", onClick: () => ec(!0), className: "flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-poke-blue px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90", children: [(0, a.jsx)(k.A, { size: 18 }), (0, a.jsx)("span", { children: "Adicionar Carta" })] }),
                                    ],
                                }),
                                (0, a.jsxs)("div", {
                                    className: "relative z-30 flex flex-col ".concat(er ? "gap-2.5 sm:gap-3" : "gap-0", " rounded-2xl border border-white/10 bg-[#121520]/80 p-2.5 shadow-xl backdrop-blur-md transition-all sm:p-3.5"),
                                    children: [
                                        (0, a.jsxs)("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                (0, a.jsxs)("div", {
                                                    className: "relative min-w-0 flex-1",
                                                    children: [
                                                        (0, a.jsx)(C.A, { size: 15, className: "pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-500 z-20 sm:left-3.5 sm:h-4 sm:w-4" }),
                                                        (0, a.jsx)(m.D, {
                                                            type: "text",
                                                            value: l,
                                                            onChange: (e) => x(e.target.value),
                                                            placeholder: ed ? "Buscar cartas..." : "Buscar por pok\xe9mon, n\xfamero, cole\xe7\xe3o ou pok\xe9dex...",
                                                            placeholderClassName: "left-8.5 right-8 text-xs sm:left-10 sm:right-9 sm:text-sm",
                                                            className: "w-full h-9 sm:h-10 rounded-xl border border-white/10 bg-white/5 py-2 sm:py-2.5 pr-8 sm:pr-9 pl-8.5 sm:pl-10 text-xs sm:text-sm text-white transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none",
                                                        }),
                                                        l && (0, a.jsx)("button", { type: "button", onClick: () => x(""), "aria-label": "Limpar busca", className: "absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-500 hover:text-white z-20 sm:right-3", children: (0, a.jsx)(z.A, { size: 14, className: "sm:h-[15px] sm:w-[15px]" }) }),
                                                    ],
                                                }),
                                                (0, a.jsxs)("button", {
                                                    type: "button",
                                                    onClick: () => el((e) => !e),
                                                    "aria-label": "Alternar filtros",
                                                    "aria-expanded": er,
                                                    className: "flex h-9 sm:h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border px-2.5 sm:px-3 text-xs font-semibold transition-colors ".concat(er || en > 0 ? "border-poke-blue/60 bg-poke-blue/20 text-white" : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"),
                                                    children: [(0, a.jsx)(A.A, { size: 13, className: en > 0 ? "text-poke-blue" : "text-slate-400" }), (0, a.jsx)("span", { className: "inline", children: "Filtros" }), en > 0 && (0, a.jsx)("span", { className: "flex h-4 min-w-4 items-center justify-center rounded-full bg-poke-blue px-1 text-[10px] font-bold text-white", children: en })],
                                                }),
                                            ],
                                        }),
                                        (0, a.jsx)("div", {
                                            className: "grid transition-all duration-300 ease-in-out ".concat(er ? "grid-rows-[1fr] opacity-100 border-t border-white/10 pt-3" : "grid-rows-[0fr] opacity-0 border-t-0 pt-0 pointer-events-none"),
                                            children: (0, a.jsx)("div", {
                                                className: "overflow-hidden",
                                                children: (0, a.jsxs)("div", {
                                                    className: "grid grid-cols-2 gap-1.5 sm:flex sm:flex-wrap sm:items-center sm:gap-2.5 w-full",
                                                    children: [
                                                        (0, a.jsx)(p.l, { value: j, onChange: G, options: D, icon: (0, a.jsx)(F.A, { size: 13 }), ariaLabel: "Filtrar cole\xe7\xe3o por status no binder", className: "w-full min-w-0 sm:flex-1 sm:min-w-[140px]", size: "sm" }),
                                                        (0, a.jsx)(p.l, { value: W, onChange: H, options: J, icon: (0, a.jsx)(S.A, { size: 13 }), ariaLabel: "Filtrar cole\xe7\xe3o por idioma da carta", className: "w-full min-w-0 sm:flex-1 sm:min-w-[145px]", menuClassName: "sm:left-0 sm:right-auto", align: "right", size: "sm" }),
                                                        (0, a.jsx)(p.l, { value: X, onChange: V, options: b.OI, icon: (0, a.jsx)(T.A, { size: 13 }), ariaLabel: "Filtrar cole\xe7\xe3o por raridade", className: "w-full min-w-0 sm:flex-1 sm:min-w-[155px]", size: "sm" }),
                                                        (0, a.jsx)(p.l, { value: Z, onChange: $, options: g.ye, icon: (0, a.jsx)(E.A, { size: 13 }), ariaLabel: "Filtrar cole\xe7\xe3o por vers\xe3o", className: "w-full min-w-0 sm:flex-1 sm:min-w-[185px]", size: "sm" }),
                                                        (0, a.jsx)(p.l, { value: K, onChange: Q, options: ep, icon: (0, a.jsx)(L.A, { size: 13 }), ariaLabel: "Filtrar cole\xe7\xe3o por expans\xe3o", className: "w-full min-w-0 sm:col-span-1 sm:flex-1 sm:min-w-[170px]", size: "sm" }),
                                                        (0, a.jsx)(p.l, { value: U, onChange: Y, options: eb, icon: (0, a.jsx)(M.A, { size: 13 }), ariaLabel: "Filtrar cole\xe7\xe3o por ilustrador", className: "w-full min-w-0 sm:col-span-1 sm:flex-1 sm:min-w-[170px]", size: "sm" }),
                                                        (0, a.jsxs)("div", {
                                                            className: "col-span-2 flex w-full min-w-0 items-center gap-1.5 sm:col-span-1 sm:flex-1 sm:min-w-[190px]",
                                                            children: [
                                                                (0, a.jsx)(p.l, { value: ee, onChange: et, options: q, icon: (0, a.jsx)(O.A, { size: 13 }), ariaLabel: "Ordenar cole\xe7\xe3o", className: "flex-1 min-w-0", size: "sm", align: "right" }),
                                                                (0, a.jsx)("button", {
                                                                    type: "button",
                                                                    onClick: () => ea((e) => ("asc" === e ? "desc" : "asc")),
                                                                    "aria-label": "asc" === es ? "Ordem crescente. Clique para inverter para decrescente." : "Ordem decrescente. Clique para inverter para crescente.",
                                                                    title: "asc" === es ? "Crescente (Clique para inverter)" : "Decrescente (Clique para inverter)",
                                                                    className: "flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg sm:rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-poke-blue/50 hover:bg-white/10 hover:text-white active:scale-95",
                                                                    children: "asc" === es ? (0, a.jsx)(I.A, { size: 14 }) : (0, a.jsx)(P.A, { size: 14 }),
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                            }),
                                        }),
                                    ],
                                }),
                                ew
                                    ? (0, a.jsx)("div", { className: "flex h-64 flex-col items-center justify-center", children: (0, a.jsx)(c.i, { message: "Carregando sua cole\xe7\xe3o...", size: "lg" }) })
                                    : e_
                                      ? (0, a.jsxs)("div", { className: "flex h-96 flex-col items-center justify-center gap-4 text-center", children: [(0, a.jsx)("p", { className: "text-sm text-red-300", children: "Falha ao carregar suas cartas." }), (0, a.jsx)("button", { type: "button", onClick: () => ek(), className: "rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20", children: "Tentar novamente" })] })
                                      : 0 !== ej || en || u.trim()
                                        ? 0 === eg.length
                                            ? (0, a.jsxs)("div", {
                                                  className: "profile-enter profile-enter-d2 flex h-64 flex-col items-center justify-center gap-3 text-center",
                                                  children: [
                                                      (0, a.jsx)(C.A, { size: 32, className: "text-slate-600" }),
                                                      (0, a.jsxs)("div", { children: [(0, a.jsx)("p", { className: "text-sm font-semibold text-white", children: "Nenhuma carta encontrada" }), (0, a.jsx)("p", { className: "mt-1 text-xs text-slate-400", children: "Tente ajustar seus termos de busca ou filtros." })] }),
                                                      (0, a.jsx)("button", {
                                                          type: "button",
                                                          onClick: () => {
                                                              (x(""), f(""), G("all"), H("all"), V("all"), Q(v.Ig), Y(v.ej), et("recent"), ea("desc"), el(!1), sessionStorage.removeItem("mypokebinder_collection_filters"));
                                                          },
                                                          className: "cursor-pointer rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white",
                                                          children: "Limpar filtros",
                                                      }),
                                                  ],
                                              })
                                            : (0, a.jsxs)("div", {
                                                  className: "flex flex-col gap-4",
                                                  children: [
                                                      (0, a.jsx)(
                                                          "div",
                                                          {
                                                              className: "relative z-0 isolate grid grid-cols-3 gap-2 auto-rows-fr sm:grid-cols-3 sm:gap-3.5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6",
                                                              children: eg.map((e, t) => {
                                                                  let s = e.card,
                                                                      r = (0, N.O)(t);
                                                                  return (0, a.jsxs)(
                                                                      i(),
                                                                      {
                                                                          href: "/cards/".concat(s.id, "?from=collection"),
                                                                          prefetch: !1,
                                                                          onPointerEnter: () => eS(s, e.copies),
                                                                          onPointerDown: () => eS(s, e.copies),
                                                                          onFocus: () => eS(s, e.copies),
                                                                          "aria-label": "Editar carta ".concat(s.card_name),
                                                                          className: "group relative flex cursor-pointer flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-1.5 transition-all duration-200 hover:border-poke-blue/50 hover:bg-white/[0.06] sm:p-2.5 ".concat(r.className),
                                                                          style: r.style,
                                                                          children: [
                                                                              (0, a.jsxs)("div", {
                                                                                  className: "z-10 flex min-h-[20px] items-center justify-between gap-1 sm:min-h-[26px]",
                                                                                  children: [
                                                                                      (0, a.jsx)("span", { className: "flex h-4.5 sm:h-5 items-center shrink-0 rounded bg-black/60 px-1 text-[9px] font-bold text-slate-300 backdrop-blur-sm sm:px-1.5 sm:text-[10px]", children: null != s.pokemon_dex_id ? "#".concat(String(s.pokemon_dex_id).padStart(3, "0")) : "TCG" }),
                                                                                      (0, a.jsxs)("div", {
                                                                                          className: "flex items-center gap-0.5 sm:gap-1",
                                                                                          children: [
                                                                                              s.card_condition && (0, a.jsx)(w.J, { condition: s.card_condition }),
                                                                                              "holo" === s.card_variant && (0, a.jsx)("span", { title: "Foil", "aria-label": "Foil", className: "flex h-4.5 sm:h-5 w-4.5 sm:w-5 items-center justify-center rounded border border-amber-500/40 bg-amber-500/20 text-amber-300", children: (0, a.jsx)(E.A, { size: 11, className: "sm:h-3 sm:w-3" }) }),
                                                                                              "reverse" === s.card_variant && (0, a.jsx)("span", { title: "Reverse Foil", "aria-label": "Reverse Foil", className: "flex h-4.5 sm:h-5 w-4.5 sm:w-5 items-center justify-center rounded border border-cyan-500/40 bg-cyan-500/20 text-cyan-300", children: (0, a.jsx)(B.A, { size: 11, className: "sm:h-3 sm:w-3" }) }),
                                                                                              e.hasInBinder && (0, a.jsx)("span", { title: "No Binder", "aria-label": "No Binder", className: "flex h-4.5 sm:h-5 w-4.5 sm:w-5 items-center justify-center rounded border border-poke-blue/40 bg-poke-blue/20 text-poke-blue", children: (0, a.jsx)(F.A, { size: 11, className: "sm:h-3 sm:w-3" }) }),
                                                                                              e.totalCount > 1 && (0, a.jsxs)("span", { title: "".concat(e.totalCount, " c\xf3pias id\xeanticas"), className: "flex h-4.5 sm:h-5 items-center rounded bg-poke-blue px-1 font-mono text-[8px] font-extrabold text-white shadow-md sm:px-1.5 sm:text-[10px]", children: ["x", e.totalCount] }),
                                                                                          ],
                                                                                      }),
                                                                                  ],
                                                                              }),
                                                                              (0, a.jsx)("div", { className: "relative my-1 aspect-[8/11] w-full sm:my-2", children: (0, a.jsx)(R, { card: s, priority: 0 === t }) }),
                                                                              (0, a.jsxs)("div", {
                                                                                  className: "flex min-h-[30px] flex-col justify-center gap-0.5 sm:min-h-[38px] sm:gap-1",
                                                                                  children: [
                                                                                      (0, a.jsxs)("div", {
                                                                                          className: "flex items-center justify-between gap-1",
                                                                                          children: [
                                                                                              (0, a.jsx)("span", { className: "truncate text-[10px] font-semibold text-white transition-colors group-hover:text-poke-blue sm:text-xs", children: s.card_name }),
                                                                                              s.card_rarity && (0, a.jsx)("span", { className: "shrink-0 rounded px-1 text-[7px] font-semibold border sm:text-[8px] ".concat((0, b._I)(s.card_rarity, s.card_name).badgeClasses), children: (0, b._I)(s.card_rarity, s.card_name).label }),
                                                                                          ],
                                                                                      }),
                                                                                      (0, a.jsxs)("div", {
                                                                                          className: "flex items-center justify-between text-[8px] text-slate-400 sm:text-[10px]",
                                                                                          children: [
                                                                                              (0, a.jsx)("span", { className: "max-w-[65%] truncate", title: s.card_artist ? "".concat(s.card_set_name || "Cole\xe7\xe3o", " \xb7 ").concat(s.card_artist) : s.card_set_name || "Cole\xe7\xe3o", children: s.card_set_name || "Cole\xe7\xe3o" }),
                                                                                              (0, a.jsxs)("div", { className: "flex items-center gap-0.5 sm:gap-1", children: [(0, a.jsx)(d.i, { country: s.card_language }), (0, a.jsx)("span", { className: "hidden text-[7px] font-bold uppercase sm:inline sm:text-[9px]", children: s.card_language })] }),
                                                                                          ],
                                                                                      }),
                                                                                  ],
                                                                              }),
                                                                          ],
                                                                      },
                                                                      "".concat(eC, "-").concat(e.key),
                                                                  );
                                                              }),
                                                          },
                                                          eC,
                                                      ),
                                                      ev && (0, a.jsx)("div", { className: "flex justify-center py-4", children: (0, a.jsx)(c.i, { message: "Carregando mais cartas...", size: "sm" }) }),
                                                      (0, a.jsx)("div", { ref: ez, className: "flex min-h-8 items-center justify-center", "aria-hidden": !ey }),
                                                  ],
                                              })
                                        : (0, a.jsxs)("div", {
                                              className: "profile-enter profile-enter-d2 flex h-64 flex-col items-center justify-center gap-3 text-center",
                                              children: [
                                                  (0, a.jsx)(L.A, { size: 32, className: "text-slate-600" }),
                                                  (0, a.jsxs)("div", { children: [(0, a.jsx)("p", { className: "text-sm font-semibold text-white", children: "Sua cole\xe7\xe3o est\xe1 vazia" }), (0, a.jsx)("p", { className: "mt-1 text-xs text-slate-400", children: "Comece a adicionar cartas f\xedsicas para acompanhar seus Pok\xe9mon." })] }),
                                                  (0, a.jsxs)("button", { type: "button", onClick: () => ec(!0), className: "mt-2 flex cursor-pointer items-center gap-2 rounded-xl bg-poke-blue px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-opacity hover:opacity-90", children: [(0, a.jsx)(k.A, { size: 16 }), (0, a.jsx)("span", { children: "Adicionar primeira carta" })] }),
                                              ],
                                          }),
                            ],
                        }),
                        (0, a.jsx)(h.g, {
                            isOpen: eo,
                            onClose: () => ec(!1),
                            onCardAdded: () => {
                                (null !== eA.current && window.clearTimeout(eA.current),
                                    (eA.current = window.setTimeout(() => {
                                        ((eA.current = null), ek(), eu(), ef());
                                    }, 300)));
                            },
                        }),
                    ],
                });
            }
        },
        7114: (e, t, s) => {
            Promise.resolve().then(s.bind(s, 7052));
        },
        9068: (e, t, s) => {
            "use strict";
            s.d(t, { A: () => a });
            let a = (0, s(1847).A)("Globe", [
                ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
                ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
                ["path", { d: "M2 12h20", key: "9i4pu4" }],
            ]);
        },
    },
    (e) => {
        (e.O(0, [5730, 235, 2619, 5239, 8720, 4102, 9605, 1013, 6937, 148, 2006, 5246, 7295, 8441, 1255, 7358], () => e((e.s = 7114))), (_N_E = e.O()));
    },
]);
