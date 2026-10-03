(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3662],
    {
        1910: (e, t, a) => {
            "use strict";
            function r(e) {
                let t = Math.max(1, Math.trunc(e) || 1);
                return t + (t % 2);
            }
            function l(e) {
                let t = Math.max(1, Math.trunc(e) || 1);
                return t % 2 == 1 ? t + 1 : null;
            }
            a.d(t, { m: () => l, r: () => r });
        },
        2070: (e, t, a) => {
            Promise.resolve().then(a.bind(a, 5088));
        },
        3263: (e, t, a) => {
            "use strict";
            a.d(t, { v: () => l, wZ: () => r });
            let r = {
                classic_red: { id: "classic_red", name: "Vermelho Cl\xe1ssico", primaryColor: "#ef4444", glowColor: "rgba(239, 68, 68, 0.4)", bgGradient: "from-[#2b0f14] via-[#1a0c10] to-[#0c0608]", borderAccent: "#ef4444", leatherClass: "border-red-900/40 bg-[#160b0e]", ballType: "pokeball", material: "Couro granulado" },
                ocean_blue: { id: "ocean_blue", name: "Azul Oceano", primaryColor: "#3b82f6", glowColor: "rgba(59, 130, 246, 0.4)", bgGradient: "from-[#0f1d2e] via-[#0c1524] to-[#060a12]", borderAccent: "#3b82f6", leatherClass: "border-blue-900/40 bg-[#0a111c]", ballType: "greatball", material: "Tecido t\xe9cnico" },
                forest_green: { id: "forest_green", name: "Verde Floresta", primaryColor: "#10b981", glowColor: "rgba(16, 185, 129, 0.4)", bgGradient: "from-[#0e241b] via-[#091a13] to-[#050e0a]", borderAccent: "#10b981", leatherClass: "border-emerald-900/40 bg-[#07130e]", ballType: "safariball", material: "Lona encerada" },
                electric_yellow: { id: "electric_yellow", name: "Amarelo El\xe9trico", primaryColor: "#eab308", glowColor: "rgba(234, 179, 8, 0.4)", bgGradient: "from-[#2b240f] via-[#1c170a] to-[#0d0b05]", borderAccent: "#eab308", leatherClass: "border-yellow-900/40 bg-[#141107]", ballType: "ultraball", material: "Vinil texturizado" },
                shadow_purple: { id: "shadow_purple", name: "Roxo Noturno", primaryColor: "#a855f7", glowColor: "rgba(168, 85, 247, 0.4)", bgGradient: "from-[#23102d] via-[#180a20] to-[#0b040f]", borderAccent: "#a855f7", leatherClass: "border-purple-900/40 bg-[#120718]", ballType: "masterball", material: "Couro escovado" },
                charcoal_black: { id: "charcoal_black", name: "Couro Preto \xd4nix", primaryColor: "#94a3b8", glowColor: "rgba(148, 163, 184, 0.3)", bgGradient: "from-[#1c202a] via-[#13161e] to-[#090b0e]", borderAccent: "#cbd5e1", leatherClass: "border-slate-800 bg-[#0d0f14]", ballType: "duskball", material: "Couro liso" },
                golden_luxury: { id: "golden_luxury", name: "Dourado Nobre", primaryColor: "#f59e0b", glowColor: "rgba(245, 158, 11, 0.45)", bgGradient: "from-[#33220e] via-[#211508] to-[#0f0904]", borderAccent: "#f59e0b", leatherClass: "border-amber-900/40 bg-[#170f06]", ballType: "luxuryball", material: "Couro acetinado" },
            };
            function l(e) {
                return r[e || "classic_red"] || r.classic_red;
            }
            Object.keys(r);
        },
        3546: (e, t, a) => {
            "use strict";
            (a.d(t, { B_: () => c, DS: () => s, Q4: () => o, SJ: () => u, Wn: () => l, h4: () => n, lz: () => i, s2: () => r, vf: () => d }), a(6937));
            let r = 650,
                l = 0.65,
                s = 320,
                n = 384,
                i = 560,
                o = 480,
                d = 676,
                c = 56,
                u = 999999;
        },
        4833: (e, t, a) => {
            "use strict";
            a.d(t, { B8: () => n, ZK: () => s, m$: () => i });
            var r = a(2180),
                l = a(4059);
            function s(e) {
                if (
                    !(function (e) {
                        if ("string" != typeof e) return !1;
                        try {
                            let t = new URL(e, "https://mypokebinder.local");
                            return "/api/cards" === t.pathname && ("" === t.search || "true" === t.searchParams.get("grouped"));
                        } catch (e) {
                            return !1;
                        }
                    })(e)
                )
                    return !1;
                try {
                    return "true" === new URL(e, "https://mypokebinder.local").searchParams.get("grouped");
                } catch (e) {
                    return !1;
                }
            }
            function n(e) {
                if ("string" != typeof e || !e.startsWith("/api/cards")) return !1;
                try {
                    let t = new URL(e, "https://mypokebinder.local");
                    return "/api/cards" === t.pathname && "true" !== t.searchParams.get("grouped");
                } catch (e) {
                    return !1;
                }
            }
            function i(e, t, a) {
                var s, n, i;
                let o = (function (e) {
                    try {
                        var t, a, r, l, s, n, i, o, d;
                        let c = new URL(e, "https://mypokebinder.local");
                        if ("/api/cards" !== c.pathname || "true" !== c.searchParams.get("grouped")) return null;
                        return {
                            searchTerm: null != (t = c.searchParams.get("search")) ? t : "",
                            statusFilter: null != (a = c.searchParams.get("status")) ? a : "all",
                            languageFilter: null != (r = c.searchParams.get("language")) ? r : "all",
                            rarityFilter: null != (l = c.searchParams.get("rarity")) ? l : "all",
                            expansionFilter: null != (s = c.searchParams.get("expansion")) ? s : "all",
                            variantFilter: null != (n = c.searchParams.get("variant")) ? n : "all",
                            artistFilter: null != (i = c.searchParams.get("artist")) ? i : "all",
                            sortField: null != (o = c.searchParams.get("sort")) ? o : "dex",
                            sortDirection: null != (d = c.searchParams.get("direction")) ? d : "asc",
                        };
                    } catch (e) {
                        return null;
                    }
                })(e);
                if (!o) return t;
                let d = new Map(null == (s = a.updatedCards) ? void 0 : s.map((e) => [e.id, e])),
                    c = new Set(a.deletedCardIds),
                    u = new Set(null == (n = a.addedCards) ? void 0 : n.map(l.qe));
                if (!t.groups.some((e) => u.has(e.key) || e.copies.some((e) => d.has(e.id) || c.has(e.id) || a.clearBinderForPokemonDexId === e.pokemon_dex_id))) return t;
                let x = t.groups
                    .flatMap((e) => e.copies)
                    .filter((e) => !c.has(e.id))
                    .map((e) => {
                        var t;
                        let r = a.clearBinderForPokemonDexId === e.pokemon_dex_id ? { ...e, is_in_binder: !1 } : e;
                        return null != (t = d.get(e.id)) ? t : r;
                    });
                for (let e of null != (i = a.addedCards) ? i : []) !t.groups.some((t) => t.key === (0, l.qe)(e)) || c.has(e.id) || x.some((t) => t.id === e.id) || x.push(e);
                let m = (0, r.a)((0, r.rM)(x), o);
                return { ...t, groups: m, total: Math.max(0, t.total + m.length - t.groups.length) };
            }
        },
        5088: (e, t, a) => {
            "use strict";
            a.d(t, { UniversalBinderViewer: () => eG });
            var r = a(5155),
                l = a(2115),
                s = a(2619),
                n = a.n(s),
                i = a(63),
                o = a(8696),
                d = a(5626),
                c = a(4033),
                u = a(5917),
                x = a(1847);
            let m = (0, x.A)("ChartNoAxesColumn", [
                ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
                ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
                ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }],
            ]);
            var p = a(5870);
            let h = (0, x.A)("ChevronLeft", [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]]),
                f = (0, x.A)("ChevronRight", [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]);
            var b = a(8972),
                g = a(8720),
                w = a(5239),
                v = a(4133),
                j = a(6937),
                y = a(7152),
                N = a(4303),
                k = a(2755),
                _ = a(1414),
                C = a(148),
                z = a(2671),
                S = a(3698),
                M = a(3848),
                P = a(4059),
                T = a(6245),
                A = a(1978),
                E = a(2180),
                L = a(6371),
                F = a(6092),
                I = a(7997),
                R = a(113),
                B = a(7937),
                G = a(5229),
                D = a(9068),
                O = a(5322),
                q = a(5740),
                V = a(9397),
                H = a(9926),
                W = a(3341),
                U = a(562),
                X = a(8803),
                Z = a(6651),
                J = a(6191),
                K = a(5299),
                Q = a(8514);
            function Y(e) {
                let { card: t, sizes: a = "(max-width: 768px) 50vw, 200px", maxTilt: s = 8, scale: n = 1, glareOpacity: i = 0.2, perspective: o = 900 } = e,
                    d = (0, v.HO)(t.card_image_url),
                    [c, u] = (0, l.useState)(() => (0, z.y7)(d)),
                    x = (0, P.WE)(t.card_variant, t.card_rarity, t.card_image_url, t.card_name),
                    m = (0, R.Mr)(t.card_types, t.pokemon_dex_id);
                return (
                    (0, l.useEffect)(() => {
                        (0, z.y7)(d) && u(!0);
                    }, [d]),
                    (0, r.jsx)(C.LW, { className: "relative h-full w-full overflow-hidden rounded-lg", maxTilt: s, maxMove: 3, scale: n, glareOpacity: i, perspective: o, shineMode: x, elementTypes: m, isLoading: !c, children: (0, r.jsx)(z.MH, { src: d, alt: t.card_name, sizes: a, className: "object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]", onLoadingChange: u }) })
                );
            }
            let $ = [
                    { value: "all", label: "Todos os idiomas" },
                    { value: "pt-br", label: "Portugu\xeas (PT-BR)", icon: (0, r.jsx)(k.i, { country: "pt-br" }) },
                    { value: "en", label: "Ingl\xeas (EN)", icon: (0, r.jsx)(k.i, { country: "en" }) },
                    { value: "ja", label: "Japon\xeas (JA)", icon: (0, r.jsx)(k.i, { country: "ja" }) },
                ],
                ee = [
                    { value: "name", label: "Nome" },
                    { value: "recent", label: "Data de adi\xe7\xe3o" },
                    { value: "dex", label: "Pok\xe9dex" },
                ];
            function et(e) {
                let { isOpen: t, dexId: a, pokemonName: s, activeCardId: n, activeCard: d, activeCardAllocation: c, targetCardId: x, matchesDexIdExactly: m = !1, onlyUnallocatedCards: p = !1, title: h, description: f, editSearchParams: b, onClose: g, onCardSelected: v, onCardRemoved: C, onOpenCatalogSearch: z } = e,
                    R = (0, i.useRouter)(),
                    { mutate: et } = (0, o.iX)(),
                    { cards: ea, isLoading: er } = (0, y.Z$)(t ? a : null, t && !a),
                    [el, es] = (0, l.useState)(n),
                    [en, ei] = (0, l.useState)(d),
                    [eo, ed] = (0, l.useState)(!1),
                    [ec, eu] = (0, l.useState)(null),
                    [ex, em] = (0, l.useState)(""),
                    [ep, eh] = (0, l.useState)("all"),
                    [ef, eb] = (0, l.useState)("all"),
                    [eg, ew] = (0, l.useState)("all"),
                    [ev, ej] = (0, l.useState)(E.Ig),
                    [ey, eN] = (0, l.useState)(E.ej),
                    [ek, e_] = (0, l.useState)("name"),
                    [eC, ez] = (0, l.useState)("asc"),
                    [eS, eM] = (0, l.useState)(!1);
                ((0, l.useEffect)(() => {
                    if (t) {
                        (es(n), ei(d), ed(!1), eu(null), em(""), eh("all"), eb("all"), ew("all"), ej(E.Ig), eN(E.ej), e_("name"), ez("asc"), eM(!1));
                        return;
                    }
                    (es(void 0), ei(void 0), ed(!1), eu(null), eM(!1));
                }, [t, n, d]),
                    (0, F.m)(t, g, null !== ec));
                let { isPresent: eP, state: eT } = (0, I.v)(t),
                    eA = (0, l.useMemo)(() => ea.filter((e) => (!a || (m ? e.pokemon_dex_id === a : !!(0, L.R)(e.card_name, a))) && (!x || e.tcgdex_card_id === x) && (!p || e.id === n || !e.is_in_binder)), [n, ea, a, m, p, x]);
                (0, l.useEffect)(() => {
                    if (t && !eo) {
                        if (el && eA.length > 0) {
                            let e = eA.find((e) => e.id === el);
                            e ? en || ei(e) : (es(void 0), ei(void 0));
                            return;
                        }
                        if (!el && !en && eA.length > 0) {
                            let e = eA.find((e) => e.is_in_binder);
                            e && (ei(e), es(e.id));
                        }
                    }
                }, [t, eo, eA, en, el]);
                let eE = (0, l.useMemo)(() => {
                        let e = new Map();
                        return (
                            eA.forEach((t) => {
                                let a = (0, P.qe)(t),
                                    r = e.get(a),
                                    l = t.id === el;
                                r ? ((r.totalCount += 1), l && ((r.hasInBinder = !0), (r.activeCard = t), (r.card = t))) : e.set(a, { key: a, card: t, totalCount: 1, hasInBinder: l, activeCard: t });
                            }),
                            Array.from(e.values())
                        );
                    }, [eA, el]),
                    eL = (0, l.useMemo)(() => (0, E.SI)(eA.map((e) => e.card_set_name)), [eA]),
                    eF = (0, l.useMemo)(() => (0, E.ay)(eA.map((e) => e.card_artist)), [eA]),
                    eI = (0, l.useMemo)(() => {
                        let e = (0, E.a)(
                                eE.map((e) => ({ key: e.key, card: e.card, copies: [e.card], totalCount: e.totalCount, hasInBinder: e.hasInBinder })),
                                { searchTerm: ex, statusFilter: "all", languageFilter: ep, rarityFilter: ef, expansionFilter: ev, artistFilter: ey, variantFilter: eg, sortField: ek, sortDirection: eC },
                            ),
                            t = new Map(eE.map((e) => [e.key, e]));
                        return e.flatMap((e) => {
                            let a = t.get(e.key);
                            return a ? [a] : [];
                        });
                    }, [eE, ex, ep, ef, ev, ey, eg, ek, eC]),
                    eR = !!ex.trim() || "all" !== ep || "all" !== ef || "all" !== eg || ev !== E.Ig || ey !== E.ej,
                    eB = +("all" !== ep) + +("all" !== ef) + +("all" !== eg) + +(ev !== E.Ig) + +(ey !== E.ej),
                    eG = (e) => {
                        e.id !== el && (ed(!1), es(e.id), ei(e), v(e));
                    },
                    eD = (e) => {
                        (ed(!0), es(void 0), ei(void 0), null == C || C(e));
                    },
                    eO = (e, t) => {
                        let a = new URLSearchParams({ from: "binder" });
                        for (let [e, r] of (t && a.set("dexId", String(t)), Object.entries(null != b ? b : {}))) void 0 !== r && a.set(e, String(r));
                        return "/cards/".concat(e, "?").concat(a.toString());
                    },
                    eq = (e, t) => {
                        R.prefetch(eO(e, t));
                    };
                return eP
                    ? (0, r.jsx)("div", {
                          className: "modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-md",
                          "data-overlay-state": eT,
                          role: "dialog",
                          "aria-modal": "true",
                          "aria-label": "Selecionar carta para ".concat(null != h ? h : s),
                          onClick: (e) => {
                              ec || e.target !== e.currentTarget || g();
                          },
                          children: (0, r.jsxs)("div", {
                              className: "modal-surface flex h-dvh max-h-none w-full max-w-none flex-col items-center justify-center gap-0 sm:h-[85vh] sm:max-h-[820px] sm:max-w-2xl sm:gap-5 lg:max-w-4xl lg:flex-row lg:items-center xl:max-w-5xl 2xl:max-w-6xl",
                              children: [
                                  (0, r.jsx)("div", {
                                      className: "hidden lg:flex lg:w-[240px] xl:w-[300px] 2xl:w-[340px] shrink-0 flex-col items-center justify-center transition-all duration-200",
                                      children: en
                                          ? (0, r.jsxs)(r.Fragment, {
                                                children: [
                                                    (0, r.jsx)("div", { className: "relative aspect-[8/11] w-full select-none", children: (0, r.jsx)(Y, { card: en, sizes: "(max-width: 1280px) 240px, 340px", maxTilt: 10, perspective: 1e3, glareOpacity: 0.25 }, en.id) }),
                                                    (0, r.jsxs)("div", {
                                                        className: "mt-3 flex flex-col items-center gap-0.5 text-center",
                                                        children: [
                                                            (0, r.jsxs)("div", { className: "flex items-center justify-center gap-1.5", children: [(0, r.jsx)("span", { className: "truncate max-w-[200px] xl:max-w-[260px] text-sm font-bold text-white", children: en.card_name }), en.card_condition && (0, r.jsx)(A.J, { condition: en.card_condition, size: "sm" })] }),
                                                            (0, r.jsx)("span", { className: "truncate max-w-[240px] xl:max-w-[300px] text-xs text-slate-400", children: en.card_artist ? "".concat(en.card_set_name || "Cole\xe7\xe3o", " \xb7 ").concat(en.card_artist) : en.card_set_name || "Cole\xe7\xe3o" }),
                                                        ],
                                                    }),
                                                ],
                                            })
                                          : (0, r.jsxs)(r.Fragment, {
                                                children: [
                                                    (0, r.jsxs)("div", {
                                                        className: "relative flex aspect-[8/11] w-full select-none flex-col items-center justify-between rounded-2xl border-2 border-dashed border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5 shadow-2xl backdrop-blur-md",
                                                        children: [
                                                            (0, r.jsxs)("div", {
                                                                className: "flex w-full items-center justify-between",
                                                                children: [
                                                                    a ? (0, r.jsxs)("span", { className: "rounded bg-black/40 px-2 py-0.5 text-xs font-bold text-slate-400 backdrop-blur-sm", children: ["#", String(a).padStart(3, "0")] }) : (0, r.jsx)("span", { className: "rounded bg-black/40 px-2 py-0.5 text-xs font-bold text-slate-400 backdrop-blur-sm", children: "Livre" }),
                                                                    (0, r.jsx)("span", { className: "rounded bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-slate-400", children: "Vazio" }),
                                                                ],
                                                            }),
                                                            a ? (0, r.jsx)("div", { className: "relative flex h-36 w-36 items-center justify-center", children: (0, r.jsx)(w.default, { src: (0, j.Xw)(a), alt: s, fill: !0, sizes: "(max-width: 1280px) 150px, 180px", className: "object-contain opacity-25", unoptimized: !0, onLoad: () => (0, j.nQ)(a) }) }) : (0, r.jsx)(B.A, { size: 72, className: "text-slate-600" }),
                                                            (0, r.jsxs)("div", { className: "flex flex-col items-center text-center", children: [(0, r.jsx)("span", { className: "text-xs font-semibold text-slate-300", children: s }), (0, r.jsx)("span", { className: "text-[11px] text-slate-500", children: "Nenhuma carta no binder" })] }),
                                                        ],
                                                    }),
                                                    (0, r.jsx)("div", { className: "mt-3 flex flex-col items-center gap-0.5 text-center", children: (0, r.jsx)("span", { className: "text-xs text-slate-400", children: "Selecione uma carta ao lado para exibir" }) }),
                                                ],
                                            }),
                                  }),
                                  (0, r.jsxs)("div", {
                                      className: "relative flex h-full w-full min-w-0 flex-1 flex-col overflow-hidden rounded-none border-0 bg-[#12151d] shadow-2xl sm:rounded-2xl sm:border sm:border-white/10",
                                      children: [
                                          ec && (0, r.jsx)("div", { className: "absolute top-0 inset-x-0 h-1 overflow-hidden rounded-t-2xl bg-white/5 z-30", children: (0, r.jsx)("div", { className: "h-full w-full bg-poke-blue animate-pulse" }) }),
                                          (0, r.jsxs)("div", {
                                              className: "flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6",
                                              children: [
                                                  (0, r.jsxs)("div", {
                                                      children: [
                                                          (0, r.jsxs)("div", { className: "flex items-center gap-2.5", children: [(0, r.jsx)("h2", { className: "text-xl font-bold text-white tracking-tight", children: null != h ? h : s }), a ? (0, r.jsxs)("span", { className: "rounded-md border border-white/10 bg-white/10 px-2 py-0.5 font-mono text-xs font-semibold text-slate-300", children: ["#", String(a).padStart(3, "0")] }) : null] }),
                                                          (0, r.jsx)("p", { className: "mt-0.5 text-xs text-slate-400", children: null != f ? f : "Selecione uma carta da sua cole\xe7\xe3o para exibir no binder" }),
                                                      ],
                                                  }),
                                                  (0, r.jsx)("button", { type: "button", onClick: g, disabled: !!ec, "aria-label": "Fechar", className: "flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition-colors ".concat(ec ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:bg-white/10 hover:text-white"), children: (0, r.jsx)(G.A, { size: 18 }) }),
                                              ],
                                          }),
                                          eE.length > 0
                                              ? (0, r.jsx)("div", {
                                                    className: "flex shrink-0 flex-col border-b border-white/5 bg-black/20 px-3 py-2.5 sm:px-6 sm:py-3",
                                                    children: (0, r.jsx)(_.h, {
                                                        searchTerm: ex,
                                                        onSearchChange: em,
                                                        showFilters: eS,
                                                        onToggleFilters: () => eM((e) => !e),
                                                        activeFilterCount: eB,
                                                        filterButtonAriaLabel: "Alternar filtros de idioma, raridade, vers\xe3o, expans\xe3o, ilustrador e ordena\xe7\xe3o",
                                                        children: (0, r.jsxs)("div", {
                                                            className: "grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2.5 w-full pt-0.5",
                                                            children: [
                                                                (0, r.jsx)(S.l, { value: ep, onChange: eh, options: $, icon: (0, r.jsx)(D.A, { size: 13 }), ariaLabel: "Filtrar por idioma da carta", className: "w-full min-w-0", size: "sm" }),
                                                                (0, r.jsx)(S.l, { value: ef, onChange: eb, options: T.OI, icon: (0, r.jsx)(O.A, { size: 13 }), ariaLabel: "Filtrar por raridade", className: "w-full min-w-0", size: "sm" }),
                                                                (0, r.jsx)(S.l, { value: eg, onChange: ew, options: P.ye, icon: (0, r.jsx)(q.A, { size: 13 }), ariaLabel: "Filtrar por vers\xe3o", className: "w-full min-w-0", size: "sm" }),
                                                                (0, r.jsx)(S.l, { value: ev, onChange: ej, options: eL, icon: (0, r.jsx)(V.A, { size: 13 }), ariaLabel: "Filtrar por expans\xe3o", className: "w-full min-w-0", size: "sm" }),
                                                                (0, r.jsx)(S.l, { value: ey, onChange: eN, options: eF, icon: (0, r.jsx)(H.A, { size: 13 }), ariaLabel: "Filtrar por ilustrador", className: "w-full min-w-0", size: "sm" }),
                                                                (0, r.jsxs)("div", {
                                                                    className: "flex w-full min-w-0 items-center gap-1.5",
                                                                    children: [
                                                                        (0, r.jsx)(S.l, { value: ek, onChange: e_, options: ee, icon: (0, r.jsx)(W.A, { size: 13 }), ariaLabel: "Ordenar cartas", className: "flex-1 min-w-0", size: "sm", align: "right" }),
                                                                        (0, r.jsx)("button", {
                                                                            type: "button",
                                                                            onClick: () => ez((e) => ("asc" === e ? "desc" : "asc")),
                                                                            "aria-label": "asc" === eC ? "Ordem crescente. Clique para inverter para decrescente." : "Ordem decrescente. Clique para inverter para crescente.",
                                                                            title: "asc" === eC ? "Crescente (Clique para inverter)" : "Decrescente (Clique para inverter)",
                                                                            className: "flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg sm:rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-poke-blue/50 hover:bg-white/10 hover:text-white active:scale-95",
                                                                            children: "asc" === eC ? (0, r.jsx)(U.A, { size: 14 }) : (0, r.jsx)(X.A, { size: 14 }),
                                                                        }),
                                                                    ],
                                                                }),
                                                            ],
                                                        }),
                                                    }),
                                                })
                                              : null,
                                          (0, r.jsx)("div", {
                                              className: "flex-1 overflow-y-auto p-4 sm:p-6",
                                              children: er
                                                  ? (0, r.jsx)("div", { className: "flex h-full min-h-[250px] flex-col items-center justify-center", children: (0, r.jsx)(N.i, { message: "Buscando suas cartas na cole\xe7\xe3o...", size: "md" }) })
                                                  : 0 === eE.length
                                                    ? (0, r.jsxs)("div", {
                                                          className: "flex h-full min-h-[250px] flex-col items-center justify-center gap-4 text-center",
                                                          children: [
                                                              (0, r.jsx)("div", { className: "flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400", children: (0, r.jsx)(Z.A, { size: 22 }) }),
                                                              (0, r.jsxs)("div", { children: [(0, r.jsx)("p", { className: "text-sm font-semibold text-white", children: "Nenhuma carta encontrada" }), (0, r.jsxs)("p", { className: "mt-1 text-xs text-slate-400", children: ["Voc\xea ainda n\xe3o tem exemplares de ", s, " cadastrados na sua cole\xe7\xe3o."] })] }),
                                                              (0, r.jsxs)("button", {
                                                                  type: "button",
                                                                  disabled: !!ec,
                                                                  onClick: () => {
                                                                      ec || (g(), z());
                                                                  },
                                                                  className: "flex items-center gap-2 rounded-xl bg-poke-blue px-4 py-2.5 text-xs font-semibold text-white shadow-md transition-opacity ".concat(ec ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:opacity-90"),
                                                                  children: [(0, r.jsx)(J.A, { size: 15 }), (0, r.jsx)("span", { children: "Buscar no cat\xe1logo" })],
                                                              }),
                                                          ],
                                                      })
                                                    : 0 === eI.length
                                                      ? (0, r.jsxs)("div", {
                                                            className: "flex h-full min-h-[250px] flex-col items-center justify-center gap-3 text-center",
                                                            children: [
                                                                (0, r.jsx)(Z.A, { size: 28, className: "text-slate-600" }),
                                                                (0, r.jsxs)("div", { children: [(0, r.jsx)("p", { className: "text-sm font-semibold text-white", children: "Nenhuma carta encontrada" }), (0, r.jsx)("p", { className: "mt-1 text-xs text-slate-400", children: "Tente ajustar a busca ou os filtros." })] }),
                                                                eR
                                                                    ? (0, r.jsx)("button", {
                                                                          type: "button",
                                                                          onClick: () => {
                                                                              (em(""), eh("all"), eb("all"), ew("all"), ej(E.Ig), eN(E.ej), e_("name"), ez("asc"));
                                                                          },
                                                                          className: "rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white",
                                                                          children: "Limpar filtros",
                                                                      })
                                                                    : null,
                                                            ],
                                                        })
                                                      : (0, r.jsx)("div", {
                                                            className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3",
                                                            children: eI.map((e, t) => {
                                                                let s = e.card,
                                                                    i = e.hasInBinder,
                                                                    o = ec === e.activeCard.id,
                                                                    d = !!ec,
                                                                    x = (0, M.O)(t);
                                                                return (0, r.jsxs)(
                                                                    "div",
                                                                    {
                                                                        className: "group relative flex flex-col justify-between gap-2 rounded-xl border p-2.5 transition-all duration-200 ".concat(i ? "border-poke-blue bg-poke-blue/10 ring-2 ring-poke-blue/40" : "border-white/10 bg-white/[0.03] hover:border-poke-blue/50 hover:bg-white/[0.06]", " ").concat(x.className),
                                                                        style: x.style,
                                                                        children: [
                                                                            (0, r.jsxs)("div", {
                                                                                className: "z-10 flex min-h-[22px] items-center justify-between",
                                                                                children: [
                                                                                    (0, r.jsxs)("span", { className: "rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-slate-300 backdrop-blur-sm", children: ["#", String(s.pokemon_dex_id).padStart(3, "0")] }),
                                                                                    (0, r.jsxs)("div", {
                                                                                        className: "flex items-center gap-1",
                                                                                        children: [
                                                                                            s.card_condition && (0, r.jsx)(A.J, { condition: s.card_condition, size: "sm" }),
                                                                                            i && (0, r.jsx)("span", { title: "No Binder", "aria-label": "No Binder", className: "flex items-center justify-center rounded border border-poke-blue/40 bg-poke-blue/20 p-1 text-poke-blue", children: (0, r.jsx)(B.A, { size: 13 }) }),
                                                                                            e.totalCount > 1 && (0, r.jsxs)("span", { title: "".concat(e.totalCount, " c\xf3pias id\xeanticas"), className: "rounded bg-poke-blue px-1.5 py-0.5 text-[10px] font-extrabold text-white", children: ["x", e.totalCount] }),
                                                                                        ],
                                                                                    }),
                                                                                ],
                                                                            }),
                                                                            (0, r.jsx)("div", {
                                                                                role: "button",
                                                                                tabIndex: d ? -1 : 0,
                                                                                onClick: () => {
                                                                                    d || (i ? eD(e.activeCard) : eG(e.activeCard));
                                                                                },
                                                                                className: "relative aspect-[8/11] w-full ".concat(d ? "cursor-not-allowed opacity-80" : "cursor-pointer"),
                                                                                children: (0, r.jsx)(Y, { card: s }),
                                                                            }),
                                                                            (0, r.jsxs)("div", {
                                                                                className: "flex flex-col gap-0.5",
                                                                                children: [
                                                                                    (0, r.jsx)("span", { className: "truncate text-xs font-semibold text-white group-hover:text-poke-blue transition-colors", children: s.card_name }),
                                                                                    (0, r.jsxs)("div", {
                                                                                        className: "flex items-center justify-between gap-1 text-[11px] text-slate-400",
                                                                                        children: [
                                                                                            (0, r.jsx)("span", { className: "truncate min-w-0 text-[10px] sm:text-[11px]", title: s.card_artist ? "".concat(s.card_set_name || "Cole\xe7\xe3o", " \xb7 ").concat(s.card_artist) : s.card_set_name || "Cole\xe7\xe3o", children: s.card_set_name || "Cole\xe7\xe3o" }),
                                                                                            (0, r.jsxs)("div", {
                                                                                                className: "flex shrink-0 items-center gap-1 whitespace-nowrap",
                                                                                                children: [(0, r.jsx)("span", { className: "rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[9px] font-bold text-slate-300", children: (0, P.FB)(s.card_variant) }), (0, r.jsx)(k.i, { country: s.card_language }), (0, r.jsx)("span", { className: "hidden uppercase text-[9px] font-bold whitespace-nowrap sm:inline sm:text-[10px]", children: s.card_language })],
                                                                                            }),
                                                                                        ],
                                                                                    }),
                                                                                ],
                                                                            }),
                                                                            (0, r.jsxs)("div", {
                                                                                className: "mt-1 flex items-center gap-1.5",
                                                                                children: [
                                                                                    (0, r.jsx)("button", {
                                                                                        type: "button",
                                                                                        disabled: d,
                                                                                        onClick: () => (i ? eD(e.activeCard) : eG(e.activeCard)),
                                                                                        className: "group/btn flex flex-1 min-w-0 items-center justify-center gap-1.5 rounded-lg py-2 px-2 text-xs font-semibold leading-none transition-colors duration-150 ".concat(
                                                                                            d ? "cursor-not-allowed opacity-50 bg-white/5 text-slate-500 border border-white/5" : i ? "cursor-pointer border border-poke-blue/40 bg-poke-blue/20 text-poke-blue hover:border-red-500/40 hover:bg-red-500/20 hover:text-red-300" : "cursor-pointer bg-white/10 text-white hover:bg-poke-blue hover:shadow-md hover:shadow-poke-blue/20",
                                                                                        ),
                                                                                        title: i ? "Clique para remover do binder" : "Exibir no binder",
                                                                                        children: i
                                                                                            ? (0, r.jsxs)(r.Fragment, {
                                                                                                  children: [
                                                                                                      (0, r.jsxs)("span", { className: "flex items-center gap-1.5 group-hover/btn:hidden", children: [(0, r.jsx)(u.A, { size: 13, className: "shrink-0" }), (0, r.jsx)("span", { className: "truncate whitespace-nowrap leading-none", children: "Em exibi\xe7\xe3o" })] }),
                                                                                                      (0, r.jsxs)("span", { className: "hidden items-center gap-1.5 group-hover/btn:flex", children: [(0, r.jsx)(G.A, { size: 13, className: "shrink-0" }), (0, r.jsx)("span", { className: "truncate whitespace-nowrap leading-none", children: "Remover" })] }),
                                                                                                  ],
                                                                                              })
                                                                                            : (0, r.jsxs)(r.Fragment, { children: [(0, r.jsx)(B.A, { size: 13, className: "shrink-0" }), (0, r.jsx)("span", { className: "truncate whitespace-nowrap leading-none", children: "Exibir" })] }),
                                                                                    }),
                                                                                    (0, r.jsx)("button", {
                                                                                        type: "button",
                                                                                        title: o ? "Abrindo edi\xe7\xe3o..." : "Editar exemplar",
                                                                                        "aria-label": o ? "Abrindo edi\xe7\xe3o..." : "Editar exemplar",
                                                                                        disabled: d,
                                                                                        onMouseEnter: () => eq(e.activeCard.id, a),
                                                                                        onPointerDown: () => eq(e.activeCard.id, a),
                                                                                        onFocus: () => eq(e.activeCard.id, a),
                                                                                        onClick: () => {
                                                                                            var t, r;
                                                                                            return (
                                                                                                (t = e.activeCard),
                                                                                                (r = e.key),
                                                                                                void (
                                                                                                    !ec &&
                                                                                                    (eu(t.id),
                                                                                                    et("/api/cards/".concat(t.id), { card: t, copies: ea.filter((e) => (0, P.qe)(e) === r), availableVariants: P.ab, allocation: t.id === n ? c : null }, !1),
                                                                                                    (0, l.startTransition)(() => {
                                                                                                        R.push(eO(t.id, a));
                                                                                                    }))
                                                                                                )
                                                                                            );
                                                                                        },
                                                                                        className: "flex shrink-0 items-center justify-center gap-1 rounded-lg border px-2 py-2 text-xs font-semibold leading-none transition-colors duration-150 ".concat(
                                                                                            o ? "border-poke-blue/40 bg-poke-blue/20 text-poke-blue cursor-wait" : d ? "border-white/5 bg-white/[0.02] text-slate-600 cursor-not-allowed opacity-50" : "border-white/10 bg-white/5 text-slate-300 transition-colors duration-150 hover:border-white/20 hover:bg-white/15 hover:text-white cursor-pointer",
                                                                                        ),
                                                                                        children: o
                                                                                            ? (0, r.jsxs)(r.Fragment, { children: [(0, r.jsx)(K.A, { size: 13, className: "shrink-0 animate-spin text-poke-blue" }), (0, r.jsx)("span", { className: "hidden sm:inline leading-none text-poke-blue", children: "Abrindo..." })] })
                                                                                            : (0, r.jsxs)(r.Fragment, { children: [(0, r.jsx)(Q.A, { size: 13, className: "shrink-0" }), (0, r.jsx)("span", { className: "hidden sm:inline leading-none", children: "Editar" })] }),
                                                                                    }),
                                                                                ],
                                                                            }),
                                                                        ],
                                                                    },
                                                                    e.key,
                                                                );
                                                            }),
                                                        }),
                                          }),
                                          ea.length > 0 &&
                                              (0, r.jsxs)("div", {
                                                  className: "flex shrink-0 items-center justify-between border-t border-white/10 bg-black/30 px-5 py-3.5 sm:px-6",
                                                  children: [
                                                      (0, r.jsx)("span", { className: "text-xs text-slate-400", children: 1 === ea.length ? "1 exemplar cadastrado" : "".concat(ea.length, " exemplares cadastrados") }),
                                                      (0, r.jsxs)("button", {
                                                          type: "button",
                                                          disabled: !!ec,
                                                          onClick: () => {
                                                              ec || (g(), z());
                                                          },
                                                          className: "flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors ".concat(ec ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:bg-white/10 hover:text-white"),
                                                          children: [(0, r.jsx)(J.A, { size: 14 }), (0, r.jsx)("span", { children: "Adicionar Carta" })],
                                                      }),
                                                  ],
                                              }),
                                      ],
                                  }),
                              ],
                          }),
                      })
                    : null;
            }
            function ea(e) {
                var t, a, s, n, i;
                let { isOpen: o, onClose: d, slot: c, binderId: u, binderName: x, binderGrid: m, onAssignSuccess: p, onUnassignSuccess: h, onOpenCatalogSearch: f } = e,
                    [b, w] = (0, l.useState)(!1);
                if (!c) return null;
                let v = null != (a = c.target_dex_id) ? a : void 0,
                    y = v ? (null == (t = j.FV.get(v)) ? void 0 : t.name) || "Pok\xe9mon #".concat(v) : c.target_card_name || "Compartimento livre",
                    N = "free" === c.slot_type ? "Compartimento livre" : y,
                    k = "free" === c.slot_type ? "Selecione uma carta guardada na sua cole\xe7\xe3o para exibir neste compartimento" : "Selecione uma carta da sua cole\xe7\xe3o para exibir no binder",
                    _ = async (e) => {
                        if (!b) {
                            w(!0);
                            try {
                                let t = await fetch("/api/binders/".concat(u, "/slots/").concat(c.id, "/assign"), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user_card_id: e.id }) });
                                if (!t.ok) {
                                    let e = await t.json().catch(() => ({}));
                                    g.oR.error(e.error || "Erro ao alocar carta no compartimento");
                                    return;
                                }
                                (g.oR.success("Carta alocada no binder!"), p(c.id, e), d());
                            } catch (e) {
                                g.oR.error("Erro inesperado ao alocar carta");
                            } finally {
                                w(!1);
                            }
                        }
                    },
                    C = async () => {
                        if (!b) {
                            w(!0);
                            try {
                                let e = await fetch("/api/binders/".concat(u, "/slots/").concat(c.id, "/assign"), { method: "DELETE" });
                                if (!e.ok) {
                                    let t = await e.json().catch(() => ({}));
                                    g.oR.error(t.error || "Erro ao remover carta do compartimento");
                                    return;
                                }
                                (g.oR.success("Carta devolvida para guardadas na cole\xe7\xe3o!"), h(c.id), d());
                            } catch (e) {
                                g.oR.error("Erro inesperado ao remover carta");
                            } finally {
                                w(!1);
                            }
                        }
                    };
                return (0, r.jsx)(et, {
                    isOpen: o,
                    dexId: v,
                    pokemonName: y,
                    title: N,
                    description: k,
                    targetCardId: null != (s = c.target_tcgdex_id) ? s : void 0,
                    matchesDexIdExactly: !0,
                    onlyUnallocatedCards: !0,
                    activeCardId: null != (n = c.user_card_id) ? n : void 0,
                    activeCard: null != (i = c.card) ? i : void 0,
                    activeCardAllocation: c.card ? { slot_id: c.id, binder_id: u, page_number: c.page_number, slot_index: c.slot_index, binder_name: x, binder_grid: m } : null,
                    editSearchParams: { binderId: u, slotId: c.id, page: c.page_number, openSlot: "true" },
                    onClose: d,
                    onCardSelected: _,
                    onCardRemoved: C,
                    onOpenCatalogSearch: () => {
                        f("pokemon" === c.slot_type ? y : c.target_card_name || void 0, v);
                    },
                });
            }
            var er = a(1910);
            function el(e, t, a) {
                let r = 2 + t,
                    l = Math.trunc(e) || 0;
                if (l <= 0) return 0;
                if (l >= t + 2) return r + +(t % 2 != 0) + 1;
                if (l === t + 1) return r;
                let s = Math.min(t, Math.max(1, l)),
                    n = 2 + s - 1;
                return a || 1 === s ? n : n % 2 == 0 ? n - 1 : n;
            }
            function es(e, t, a) {
                let r = 2 + t,
                    l = t + 1;
                if (e <= 0) return 0;
                if (e >= r + +(t % 2 != 0) + 1) return t + 2;
                if (a) return 1 === e ? 1 : e >= r ? l : Math.min(t, Math.max(1, e - 2 + 1));
                let s = e % 2 == 0 ? e - 1 : e;
                return 1 === s ? 1 : s >= r ? l : Math.min(t, Math.max(1, s - 1));
            }
            function en(e, t) {
                if (e <= 0) return 0;
                let a = 2 + t + +(t % 2 != 0) + 1;
                return e >= a ? a : e % 2 == 1 ? e : e - 1;
            }
            var ei = a(4833);
            let eo = (0, x.A)("Trophy", [
                    ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
                    ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
                    ["path", { d: "M4 22h16", key: "57wxv0" }],
                    ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
                    ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
                    ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }],
                ]),
                ed = (0, x.A)("Target", [
                    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
                    ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
                    ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
                ]);
            var ec = a(3263);
            function eu(e) {
                let { isOpen: t, onClose: a, binder: s, slots: n, onSlotNavigate: i } = e;
                (0, F.m)(t, a);
                let { isPresent: o, state: d } = (0, I.v)(t),
                    c = (0, l.useMemo)(() => (0, ec.v)(s.cover_theme), [s.cover_theme]),
                    u = (0, l.useMemo)(() => {
                        let e = n.length,
                            t = n.filter((e) => !!(e.user_card_id || e.card)).length,
                            a = n.filter((e) => "pokemon" === e.slot_type || "card" === e.slot_type),
                            r = a.length > 0,
                            l = a.filter((e) => !!(e.user_card_id || e.card)).length,
                            s = e > 0 ? Math.round((t / e) * 100) : 0,
                            i = r ? Math.round((l / a.length) * 100) : 0;
                        return { totalSlots: e, filledSlots: t, hasGoals: r, totalGoals: a.length, filledGoals: l, occupancyPercentage: s, goalsPercentage: i };
                    }, [n]),
                    x = (0, l.useMemo)(() => {
                        let e = new Map();
                        for (let t = 1; t <= (0, er.r)(s.total_pages); t++) e.set(t, []);
                        for (let t of n) {
                            let a = e.get(t.page_number) || [];
                            (a.push(t), e.set(t.page_number, a));
                        }
                        return e;
                    }, [s.total_pages, n]);
                if (!o) return null;
                let m = "1x1" === s.grid_type ? "grid-cols-1" : "2x2" === s.grid_type ? "grid-cols-2" : "grid-cols-3";
                return (0, r.jsx)("div", {
                    className: "modal-backdrop fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm",
                    "data-overlay-state": d,
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": "Estat\xedsticas do binder",
                    onClick: (e) => {
                        e.target === e.currentTarget && a();
                    },
                    children: (0, r.jsxs)("div", {
                        className: "drawer-surface flex h-[100dvh] w-screen max-w-none flex-col bg-[#0e121a] shadow-2xl md:h-full md:w-full md:max-w-md md:border-l md:border-white/10",
                        children: [
                            (0, r.jsxs)("div", {
                                className: "flex items-center justify-between border-b border-white/10 px-5 py-4",
                                children: [
                                    (0, r.jsxs)("div", {
                                        className: "flex items-center gap-2.5",
                                        children: [(0, r.jsx)("div", { className: "flex h-8 w-8 items-center justify-center rounded-lg shadow-sm", style: { backgroundColor: "".concat(c.primaryColor, "25"), color: c.primaryColor }, children: (0, r.jsx)(eo, { size: 16 }) }), (0, r.jsxs)("div", { children: [(0, r.jsx)("h2", { className: "text-sm font-bold text-white", children: "Estat\xedsticas do Binder" }), (0, r.jsx)("p", { className: "text-[11px] text-slate-400", children: s.name })] })],
                                    }),
                                    (0, r.jsx)("button", { type: "button", onClick: a, className: "flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white", children: (0, r.jsx)(G.A, { size: 16 }) }),
                                ],
                            }),
                            (0, r.jsxs)("div", {
                                className: "flex-1 overflow-y-auto p-5 flex flex-col gap-6",
                                children: [
                                    (0, r.jsx)("div", {
                                        className: "grid grid-cols-2 gap-3",
                                        children: u.hasGoals
                                            ? (0, r.jsxs)(r.Fragment, {
                                                  children: [
                                                      (0, r.jsxs)("div", {
                                                          className: "flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3.5",
                                                          children: [
                                                              (0, r.jsxs)("div", { className: "flex items-center justify-between text-xs text-slate-400", children: [(0, r.jsxs)("span", { className: "flex items-center gap-1 font-medium", children: [(0, r.jsx)(ed, { size: 13, className: "text-poke-blue" }), "Metas"] }), (0, r.jsxs)("span", { className: "font-mono font-bold text-white", children: [u.goalsPercentage, "%"] })] }),
                                                              (0, r.jsxs)("div", { className: "flex items-baseline gap-1", children: [(0, r.jsx)("span", { className: "text-2xl font-black text-white", children: u.filledGoals }), (0, r.jsxs)("span", { className: "text-xs text-slate-500", children: ["/ ", u.totalGoals] })] }),
                                                              (0, r.jsx)("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-white/10", children: (0, r.jsx)("div", { className: "h-full rounded-full bg-poke-blue transition-all", style: { width: "".concat(u.goalsPercentage, "%") } }) }),
                                                          ],
                                                      }),
                                                      (0, r.jsxs)("div", {
                                                          className: "flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3.5",
                                                          children: [
                                                              (0, r.jsxs)("div", { className: "flex items-center justify-between text-xs text-slate-400", children: [(0, r.jsxs)("span", { className: "flex items-center gap-1 font-medium", children: [(0, r.jsx)(V.A, { size: 13, className: "text-emerald-400" }), "Ocupa\xe7\xe3o"] }), (0, r.jsxs)("span", { className: "font-mono font-bold text-white", children: [u.occupancyPercentage, "%"] })] }),
                                                              (0, r.jsxs)("div", { className: "flex items-baseline gap-1", children: [(0, r.jsx)("span", { className: "text-2xl font-black text-white", children: u.filledSlots }), (0, r.jsxs)("span", { className: "text-xs text-slate-500", children: ["/ ", u.totalSlots] })] }),
                                                              (0, r.jsx)("div", { className: "h-1.5 w-full overflow-hidden rounded-full bg-white/10", children: (0, r.jsx)("div", { className: "h-full rounded-full bg-emerald-500 transition-all", style: { width: "".concat(u.occupancyPercentage, "%") } }) }),
                                                          ],
                                                      }),
                                                  ],
                                              })
                                            : (0, r.jsxs)("div", {
                                                  className: "col-span-2 flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4",
                                                  children: [
                                                      (0, r.jsxs)("div", { className: "flex items-center justify-between text-xs text-slate-400", children: [(0, r.jsxs)("span", { className: "flex items-center gap-1 font-medium", children: [(0, r.jsx)(V.A, { size: 14, className: "text-poke-blue" }), "Ocupa\xe7\xe3o F\xedsica (Binder Livre)"] }), (0, r.jsxs)("span", { className: "font-mono font-bold text-white", children: [u.occupancyPercentage, "%"] })] }),
                                                      (0, r.jsxs)("div", { className: "flex items-baseline gap-1.5", children: [(0, r.jsx)("span", { className: "text-3xl font-black text-white", children: u.filledSlots }), (0, r.jsxs)("span", { className: "text-sm text-slate-500", children: ["/ ", u.totalSlots, " compartimentos preenchidos"] })] }),
                                                      (0, r.jsx)("div", { className: "mt-1 h-2 w-full overflow-hidden rounded-full bg-white/10", children: (0, r.jsx)("div", { className: "h-full rounded-full bg-poke-blue transition-all", style: { width: "".concat(u.occupancyPercentage, "%") } }) }),
                                                  ],
                                              }),
                                    }),
                                    (0, r.jsxs)("div", {
                                        className: "flex flex-col gap-3",
                                        children: [
                                            (0, r.jsxs)("div", { className: "flex items-center justify-between", children: [(0, r.jsx)("span", { className: "text-xs font-bold uppercase tracking-wider text-slate-400", children: "Mapa Visual das Folhas" }), (0, r.jsx)("span", { className: "text-[11px] text-slate-500", children: "Clique para ir direto \xe0 p\xe1gina" })] }),
                                            (0, r.jsx)("div", {
                                                className: "flex flex-col gap-4",
                                                children: Array.from(x.entries()).map((e) => {
                                                    let [t, l] = e;
                                                    return (0, r.jsxs)(
                                                        "div",
                                                        {
                                                            className: "flex flex-col gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-3",
                                                            children: [
                                                                (0, r.jsxs)("div", { className: "flex items-center justify-between text-[11px] font-medium text-slate-400", children: [(0, r.jsxs)("span", { className: "text-slate-300 font-semibold", children: ["P\xe1gina ", t] }), (0, r.jsxs)("span", { children: [l.filter((e) => e.user_card_id || e.card).length, " / ", l.length] })] }),
                                                                (0, r.jsx)("div", {
                                                                    className: "grid gap-1.5 ".concat(m),
                                                                    children: l.map((e) => {
                                                                        var t;
                                                                        let l = !!(e.user_card_id || e.card),
                                                                            s = null == (t = e.card) ? void 0 : t.card_image_url;
                                                                        return (0, r.jsx)(
                                                                            "button",
                                                                            {
                                                                                type: "button",
                                                                                onClick: () => {
                                                                                    (i(e.page_number, e.id), a());
                                                                                },
                                                                                className: "group relative flex aspect-[8/11] items-center justify-center overflow-hidden rounded-lg border text-left transition-all ".concat(l ? "border-poke-blue/50 bg-[#141b2b] hover:border-poke-blue hover:scale-105" : "free" === e.slot_type ? "border-dashed border-white/15 bg-black/30 hover:border-white/40" : "border-white/10 bg-[#0d1017] hover:border-white/30"),
                                                                                children:
                                                                                    l && s
                                                                                        ? (0, r.jsx)(w.default, { src: (0, v.HO)(s), alt: "", fill: !0, sizes: "40px", className: "object-contain p-0.5", unoptimized: !0 })
                                                                                        : "pokemon" === e.slot_type && e.target_dex_id
                                                                                          ? (0, r.jsx)(w.default, { src: (0, j.Xw)(e.target_dex_id), alt: "", fill: !0, sizes: "40px", className: "object-contain p-1 opacity-40 group-hover:opacity-70", unoptimized: !0 })
                                                                                          : "card" === e.slot_type && e.target_card_image_url
                                                                                            ? (0, r.jsx)(w.default, { src: (0, v.HO)(e.target_card_image_url), alt: "", fill: !0, sizes: "40px", className: "object-contain p-0.5 opacity-25 grayscale group-hover:opacity-50", unoptimized: !0 })
                                                                                            : (0, r.jsx)("span", { className: "text-[9px] font-mono text-slate-500", children: e.slot_index }),
                                                                            },
                                                                            e.id,
                                                                        );
                                                                    }),
                                                                }),
                                                            ],
                                                        },
                                                        t,
                                                    );
                                                }),
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                });
            }
            var ex = a(7230);
            function em(e) {
                let { onSearch: t } = e,
                    [a, s] = (0, l.useState)(""),
                    [n, i] = (0, l.useState)(!1),
                    o = (0, l.useRef)(null),
                    d = a.trim().toLowerCase(),
                    c = d.startsWith("#"),
                    u = (0, E.LQ)(d),
                    x = d
                        ? j.GS.filter((e) => {
                              let t = c && null !== u && e.dexId === u,
                                  a = !c && e.name.toLowerCase().includes(d);
                              return t || a;
                          }).slice(0, 6)
                        : [];
                (0, l.useEffect)(() => {
                    function e(e) {
                        o.current && !o.current.contains(e.target) && i(!1);
                    }
                    return (
                        document.addEventListener("mousedown", e),
                        () => {
                            document.removeEventListener("mousedown", e);
                        }
                    );
                }, []);
                let m = (e) => {
                    (t && t(e), s(""), i(!1));
                };
                return t
                    ? (0, r.jsxs)("div", {
                          ref: o,
                          className: "relative w-full",
                          children: [
                              (0, r.jsxs)("div", {
                                  className: "flex h-10 w-full items-center gap-2 rounded-xl border border-white/10 bg-[#121620]/85 px-3.5 shadow-lg backdrop-blur-md transition-all focus-within:border-poke-blue/60 focus-within:bg-[#151a26]",
                                  children: [
                                      (0, r.jsx)(Z.A, { size: 15, className: "flex-shrink-0 text-slate-400" }),
                                      (0, r.jsx)(ex.D, {
                                          type: "text",
                                          value: a,
                                          onChange: (e) => {
                                              (s(e.target.value), i(!0));
                                          },
                                          onFocus: () => i(!0),
                                          onKeyDown: (e) => {
                                              "Enter" === e.key && x.length > 0 ? m(x[0].dexId) : "Escape" === e.key && i(!1);
                                          },
                                          placeholder: "Buscar por nome ou pok\xe9dex...",
                                          placeholderClassName: "left-0 right-0",
                                          "aria-label": "Buscar Pok\xe9mon no binder",
                                          className: "w-full bg-transparent text-xs text-white placeholder-slate-500 outline-none",
                                      }),
                                      a &&
                                          (0, r.jsx)("button", {
                                              type: "button",
                                              onClick: () => {
                                                  (s(""), i(!1));
                                              },
                                              "aria-label": "Limpar busca",
                                              className: "flex-shrink-0 text-slate-400 hover:text-white",
                                              children: (0, r.jsx)(G.A, { size: 14 }),
                                          }),
                                  ],
                              }),
                              n &&
                                  x.length > 0 &&
                                  (0, r.jsx)("div", {
                                      className: "absolute top-11 left-0 z-40 w-full overflow-hidden rounded-xl border border-white/10 bg-[#161a26] py-1 shadow-2xl backdrop-blur-xl",
                                      children: x.map((e) => (0, r.jsxs)("button", { type: "button", onClick: () => m(e.dexId), className: "flex w-full items-center justify-between px-3 py-2 text-left text-xs transition-colors hover:bg-white/10", children: [(0, r.jsx)("span", { className: "font-medium text-white", children: e.name }), (0, r.jsxs)("span", { className: "font-mono text-[11px] text-amber-400", children: ["#", String(e.dexId).padStart(3, "0")] })] }, e.dexId)),
                                  }),
                              n && d && 0 === x.length && (0, r.jsx)("div", { className: "absolute top-11 left-0 z-40 w-full overflow-hidden rounded-xl border border-white/10 bg-[#161a26] p-3 text-center shadow-2xl backdrop-blur-xl", children: (0, r.jsx)("span", { className: "text-xs text-slate-400", children: "Nenhum Pok\xe9mon dos 151 encontrado" }) }),
                          ],
                      })
                    : null;
            }
            var ep = a(6676),
                eh = a(5512),
                ef = a(3166),
                eb = a(1013),
                eg = a(3546),
                ew = a(4577);
            let ev = {
                    grass: { ringColor: "#22c55e", ringGlow: "rgba(34, 197, 94, 0.6)", palette: ["#22c55e", "#16a34a", "#86efac", "#4ade80", "#a3e635"], shapes: ["leaf", "orb", "leaf", "star"] },
                    fire: { ringColor: "#f97316", ringGlow: "rgba(249, 115, 22, 0.7)", palette: ["#f97316", "#ef4444", "#fbbf24", "#ea580c", "#fed7aa"], shapes: ["ember", "shard", "ember", "star"] },
                    water: { ringColor: "#38bdf8", ringGlow: "rgba(56, 189, 248, 0.7)", palette: ["#38bdf8", "#0284c7", "#67e8f9", "#0ea5e9", "#e0f2fe"], shapes: ["droplet", "orb", "droplet", "diamond"] },
                    electric: { ringColor: "#eab308", ringGlow: "rgba(234, 179, 8, 0.8)", palette: ["#eab308", "#facc15", "#fef08a", "#f59e0b", "#ffffff"], shapes: ["bolt", "shard", "bolt", "star"] },
                    bug: { ringColor: "#84cc16", ringGlow: "rgba(132, 204, 22, 0.6)", palette: ["#84cc16", "#a3e635", "#65a30d", "#bef264", "#ecfccb"], shapes: ["leaf", "orb", "shard", "leaf"] },
                    normal: { ringColor: "#e2e8f0", ringGlow: "rgba(226, 232, 240, 0.6)", palette: ["#e2e8f0", "#cbd5e1", "#ffffff", "#94a3b8", "#f8fafc"], shapes: ["star", "shard", "orb", "diamond"] },
                    poison: { ringColor: "#a855f7", ringGlow: "rgba(168, 85, 247, 0.7)", palette: ["#a855f7", "#9333ea", "#d8b4fe", "#c084fc", "#4ade80"], shapes: ["droplet", "orb", "droplet", "shard"] },
                    ground: { ringColor: "#d97706", ringGlow: "rgba(217, 119, 6, 0.7)", palette: ["#d97706", "#b45309", "#fcd34d", "#78350f", "#fef3c7"], shapes: ["shard", "orb", "shard", "diamond"] },
                    rock: { ringColor: "#b45309", ringGlow: "rgba(180, 83, 9, 0.7)", palette: ["#b45309", "#92400e", "#78716c", "#d6d3d1", "#a8a29e"], shapes: ["shard", "diamond", "shard", "orb"] },
                    fighting: { ringColor: "#ef4444", ringGlow: "rgba(239, 68, 68, 0.7)", palette: ["#ef4444", "#dc2626", "#f87171", "#fb923c", "#fca5a5"], shapes: ["shard", "star", "shard", "diamond"] },
                    psychic: { ringColor: "#ec4899", ringGlow: "rgba(236, 72, 153, 0.7)", palette: ["#ec4899", "#d946ef", "#f472b6", "#c084fc", "#fdf2f8"], shapes: ["orb", "star", "diamond", "orb"] },
                    ghost: { ringColor: "#8b5cf6", ringGlow: "rgba(139, 92, 246, 0.7)", palette: ["#8b5cf6", "#7c3aed", "#c084fc", "#38bdf8", "#ddd6fe"], shapes: ["ember", "orb", "star", "ember"] },
                    ice: { ringColor: "#06b6d4", ringGlow: "rgba(6, 182, 212, 0.7)", palette: ["#06b6d4", "#67e8f9", "#e0f2fe", "#ffffff", "#a5f3fc"], shapes: ["diamond", "shard", "star", "diamond"] },
                    dragon: { ringColor: "#6366f1", ringGlow: "rgba(99, 102, 241, 0.7)", palette: ["#6366f1", "#4f46e5", "#818cf8", "#f43f5e", "#c7d2fe"], shapes: ["orb", "star", "shard", "ember"] },
                    fairy: { ringColor: "#f472b6", ringGlow: "rgba(244, 114, 182, 0.7)", palette: ["#f472b6", "#f9a8d4", "#fdf2f8", "#e879f9", "#ffffff"], shapes: ["star", "orb", "star", "diamond"] },
                    steel: { ringColor: "#94a3b8", ringGlow: "rgba(148, 163, 184, 0.7)", palette: ["#94a3b8", "#cbd5e1", "#e2e8f0", "#64748b", "#ffffff"], shapes: ["shard", "diamond", "shard", "star"] },
                    dark: { ringColor: "#64748b", ringGlow: "rgba(100, 116, 139, 0.7)", palette: ["#64748b", "#475569", "#334155", "#94a3b8", "#1e293b"], shapes: ["shard", "orb", "ember", "diamond"] },
                    flying: { ringColor: "#cbd5e1", ringGlow: "rgba(203, 213, 225, 0.7)", palette: ["#cbd5e1", "#f1f5f9", "#e2e8f0", "#94a3b8", "#ffffff"], shapes: ["leaf", "orb", "droplet", "star"] },
                },
                ej = ["#ff4b4b", "#ff8c00", "#ffd700", "#22c55e", "#00f0ff", "#6366f1", "#a855f7", "#ff3b94"],
                ey = ["#ffd700", "#f59e0b", "#fbbf24", "#ffffff", "#00f0ff", "#a855f7", "#ff3b94", "#38bdf8"],
                eN = [
                    { angle: 0, dist: 52, rot: 180, size: 12 },
                    { angle: 24, dist: 46, rot: -140, size: 10 },
                    { angle: 48, dist: 56, rot: 210, size: 14 },
                    { angle: 75, dist: 48, rot: -90, size: 10 },
                    { angle: 102, dist: 50, rot: 160, size: 11 },
                    { angle: 128, dist: 54, rot: -220, size: 13 },
                    { angle: 154, dist: 46, rot: 130, size: 10 },
                    { angle: 180, dist: 52, rot: -180, size: 12 },
                    { angle: 206, dist: 44, rot: 150, size: 10 },
                    { angle: 232, dist: 58, rot: -240, size: 14 },
                    { angle: 258, dist: 50, rot: 110, size: 11 },
                    { angle: 284, dist: 52, rot: -170, size: 12 },
                    { angle: 310, dist: 56, rot: 200, size: 13 },
                    { angle: 336, dist: 46, rot: -120, size: 10 },
                    { angle: 60, dist: 60, rot: 270, size: 15 },
                    { angle: 240, dist: 58, rot: -280, size: 14 },
                    { angle: 15, dist: 62, rot: 190, size: 13 },
                    { angle: 90, dist: 64, rot: -160, size: 12 },
                    { angle: 165, dist: 60, rot: 230, size: 14 },
                    { angle: 270, dist: 62, rot: -190, size: 13 },
                    { angle: 35, dist: 68, rot: 310, size: 15 },
                    { angle: 115, dist: 66, rot: -250, size: 14 },
                    { angle: 195, dist: 70, rot: 280, size: 16 },
                    { angle: 300, dist: 68, rot: -300, size: 15 },
                    { angle: 10, dist: 74, rot: 340, size: 16 },
                    { angle: 80, dist: 72, rot: -320, size: 15 },
                    { angle: 140, dist: 76, rot: 360, size: 17 },
                    { angle: 215, dist: 74, rot: -340, size: 16 },
                    { angle: 260, dist: 72, rot: 320, size: 15 },
                    { angle: 325, dist: 75, rot: -350, size: 17 },
                    { angle: 45, dist: 78, rot: 380, size: 18 },
                    { angle: 225, dist: 78, rot: -380, size: 18 },
                ];
            function ek(e) {
                let { pokemonType: t, rarity: a, tier: s } = e,
                    n = ev[t] || ev.normal,
                    i = void 0 !== s ? s : (0, T.wM)(a),
                    o = (0, l.useRef)(i);
                ((o.current = i),
                    (0, l.useEffect)(() => {
                        let e = setTimeout(() => {
                            (0, ew.dz)(o.current);
                        }, 360);
                        return () => clearTimeout(e);
                    }, []));
                let d = 3 === i ? 32 : 2 === i ? 24 : 1 === i ? 20 : 16,
                    c = i >= 2,
                    u = eN.slice(0, d).map((e, t) => {
                        let a,
                            r,
                            l = (e.angle * Math.PI) / 180,
                            s = Math.round(Math.cos(l) * e.dist),
                            o = Math.round(Math.sin(l) * e.dist);
                        if (3 === i) ((a = ey[t % ey.length]), (r = t % 2 == 0 ? "star" : "diamond"));
                        else if (2 === i) ((a = ej[t % ej.length]), (r = t % 3 == 0 ? "star" : t % 3 == 1 ? "diamond" : "shard"));
                        else if (1 === i) {
                            let e = [...n.palette, "#c084fc", "#e879f9"];
                            ((a = e[t % e.length]), (r = t % 4 == 0 ? "diamond" : n.shapes[t % n.shapes.length]));
                        } else ((a = n.palette[t % n.palette.length]), (r = n.shapes[t % n.shapes.length]));
                        let d = 3 === i ? 1.25 : 2 === i ? 1.15 : 1 === i ? 1.06 : 1,
                            c = 3 === i ? 1.05 : 2 === i ? 0.95 : 1 === i ? 0.88 : 0.82;
                        return { x: s, y: o, rot: e.rot, delay: 0.36 + (t % 4) * 0.02, duration: c, size: Math.round(e.size * d), color: a, shape: r };
                    });
                return (0, r.jsxs)("div", {
                    className: "pointer-events-none absolute inset-0 z-50 flex items-center justify-center overflow-visible",
                    children: [
                        i >= 2
                            ? (0, r.jsxs)(r.Fragment, { children: [(0, r.jsx)("div", { className: "fullart-impact-shockwave absolute -inset-2 rounded-xl" }), (0, r.jsx)("div", { className: "fullart-impact-glow absolute -inset-3 rounded-full" })] })
                            : 1 === i
                              ? (0, r.jsx)(r.Fragment, { children: (0, r.jsx)("div", { className: "card-impact-shockwave absolute -inset-2 rounded-xl", style: { borderColor: n.ringColor, boxShadow: "0 0 20px ".concat(n.ringGlow, ", 0 0 30px #c084fc, inset 0 0 14px ").concat(n.ringGlow) } }) })
                              : (0, r.jsx)("div", { className: "card-impact-shockwave absolute -inset-2 rounded-xl", style: { borderColor: n.ringColor, boxShadow: "0 0 16px ".concat(n.ringGlow, ", inset 0 0 12px ").concat(n.ringGlow) } }),
                        u.map((e, t) => {
                            var a, l;
                            let s = { "--particle-x": "".concat(e.x, "px"), "--particle-y": "".concat(e.y, "px"), "--particle-rot": "".concat(e.rot, "deg"), width: "".concat(e.size, "px"), height: "".concat(e.size, "px"), animationDuration: "".concat(e.duration, "s"), animationDelay: "".concat(e.delay, "s"), filter: c ? "drop-shadow(0 0 6px ".concat(e.color, ") drop-shadow(0 0 12px #ffffff)") : "drop-shadow(0 0 4px ".concat(e.color, ")") };
                            return (0, r.jsx)(
                                "div",
                                {
                                    style: s,
                                    className: "absolute flex items-center justify-center opacity-0 ".concat(c ? "fullart-sparkle-particle" : "card-impact-particle"),
                                    children:
                                        ((a = e.shape),
                                        (l = e.color),
                                        "leaf" === a
                                            ? (0, r.jsx)("svg", { viewBox: "0 0 24 24", fill: l, className: "h-full w-full", children: (0, r.jsx)("path", { d: "M17 3C10 3 5 8 5 15C5 18 7 20 9 20C16 20 21 15 21 8C21 5 19 3 17 3ZM15.5 8.5C13.5 10.5 10.5 13.5 8 16", stroke: "#ffffff", strokeWidth: "1", strokeLinecap: "round", opacity: "0.4" }) })
                                            : "droplet" === a
                                              ? (0, r.jsx)("svg", { viewBox: "0 0 24 24", fill: l, className: "h-full w-full", children: (0, r.jsx)("path", { d: "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" }) })
                                              : "ember" === a
                                                ? (0, r.jsx)("svg", { viewBox: "0 0 24 24", fill: l, className: "h-full w-full", children: (0, r.jsx)("path", { d: "M12 2C11 7 7 9 7 14C7 17.87 10.13 21 14 21C16.8 21 19.2 19.36 20.3 17C18 17 16 15 16 13C16 10.5 17.5 8.5 18.5 7C16 8 13.5 5 12 2Z" }) })
                                                : "bolt" === a
                                                  ? (0, r.jsx)("svg", { viewBox: "0 0 24 24", fill: l, className: "h-full w-full", children: (0, r.jsx)("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" }) })
                                                  : "star" === a || c
                                                    ? (0, r.jsx)("svg", { viewBox: "0 0 24 24", fill: l, className: "h-full w-full", children: (0, r.jsx)("path", { d: "M12 0L14.4 8.6L23 11L14.4 13.4L12 22L9.6 13.4L1 11L9.6 8.6Z" }) })
                                                    : "diamond" === a
                                                      ? (0, r.jsx)("svg", { viewBox: "0 0 24 24", fill: l, className: "h-full w-full", children: (0, r.jsx)("polygon", { points: "12 2 22 12 12 22 2 12" }) })
                                                      : "shard" === a
                                                        ? (0, r.jsx)("svg", { viewBox: "0 0 24 24", fill: l, className: "h-full w-full", children: (0, r.jsx)("polygon", { points: "12 2 20 9 16 22 6 18 4 8" }) })
                                                        : (0, r.jsx)("div", { className: "h-full w-full rounded-full", style: { backgroundColor: l, boxShadow: "0 0 8px ".concat(l) } })),
                                },
                                t,
                            );
                        }),
                    ],
                });
            }
            function e_(e) {
                e.stopPropagation();
            }
            function eC() {
                let e = (0, l.useRef)(null);
                return (
                    (0, l.useEffect)(() => {
                        let t = e.current;
                        if (!t) return;
                        let a = (e) => {
                            e.stopPropagation();
                        };
                        return (
                            t.addEventListener("mousedown", a),
                            t.addEventListener("touchstart", a, { passive: !0 }),
                            () => {
                                (t.removeEventListener("mousedown", a), t.removeEventListener("touchstart", a));
                            }
                        );
                    }, []),
                    e
                );
            }
            function ez(e) {
                var t, a, s, n;
                let { slot: i, card: o, availableCount: d = 0, isHighlighted: c = !1, isDropping: u = !1, mountImage: x = !0, priority: m = !1, pauseTilt: p = !1, onClick: h } = e,
                    f = (0, l.useContext)(eb.cm),
                    b = !f || f.animationsEnabled,
                    g = u && b,
                    y = eC(),
                    N = eC(),
                    k = (0, l.useRef)(!1);
                (0, l.useEffect)(() => {
                    if (!u) {
                        k.current = !1;
                        return;
                    }
                    b || !o || k.current || ((k.current = !0), (0, ew.dz)((0, T.wM)(o.card_rarity)));
                }, [u, b, o]);
                let _ = !!o,
                    z = !_ && d > 0,
                    S = c && !p,
                    M = S ? "slot-glow" : "",
                    A = null != (s = null != (a = i.target_dex_id) ? a : null == o ? void 0 : o.pokemon_dex_id) ? s : null,
                    E = S && A ? (0, j.bl)(A) : void 0,
                    L = E ? { "--glow-ring": E.ring, "--glow-bright": E.bright, "--glow-soft": E.soft } : void 0,
                    F = (e) => {
                        ("Enter" === e.key || " " === e.key) && (e.preventDefault(), h());
                    },
                    [I, B] = (0, l.useState)(!1);
                if (
                    ((0, l.useEffect)(() => {
                        B(!1);
                    }, [null == o ? void 0 : o.id]),
                    _ && o)
                ) {
                    let e = A ? j.FV.get(A) : null,
                        t = null != (n = null == e ? void 0 : e.type) ? n : "normal",
                        a = (0, P.WE)(o.card_variant, o.card_rarity, o.card_image_url, o.card_name),
                        l = (0, R.Mr)(o.card_types, o.pokemon_dex_id);
                    return (0, r.jsxs)("div", {
                        ref: y,
                        className: ""
                            .concat("relative flex h-full min-h-0 w-full min-w-0 items-center justify-center binder-filled-slot [container-type:size] hover:z-30 focus-within:z-30", " ")
                            .concat(g ? "z-40" : "", " ")
                            .concat(S ? "z-30" : ""),
                        children: [
                            (0, r.jsx)("div", {
                                className: ""
                                    .concat("relative aspect-[8/11] h-[min(100%,calc(100cqw*11/8))] w-[min(100%,calc(100cqh*8/11))] rounded-lg", " ")
                                    .concat(S ? "z-20" : "", " ")
                                    .concat(M),
                                style: L,
                                children: (0, r.jsx)("div", {
                                    className: "relative h-full w-full ".concat(g ? "card-drop" : ""),
                                    children: (0, r.jsx)(
                                        C.LW,
                                        {
                                            className: "relative h-full w-full overflow-hidden rounded-lg bg-transparent",
                                            maxTilt: 12,
                                            scale: 1.15,
                                            glareOpacity: 0.25,
                                            shineMode: a,
                                            elementTypes: l,
                                            paused: p,
                                            isLoading: !I,
                                            children: (0, r.jsx)("button", {
                                                type: "button",
                                                id: "binder-slot-".concat(i.id),
                                                onClick: h,
                                                onMouseDownCapture: e_,
                                                onPointerDownCapture: e_,
                                                onTouchStartCapture: e_,
                                                onKeyDown: F,
                                                "aria-label": "".concat(o.card_name).concat(A ? ", #".concat(A) : ""),
                                                className: "relative flex h-full min-h-0 w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-poke-blue",
                                                children: x ? (0, r.jsx)(w.default, { src: (0, v.HO)(o.card_image_url), alt: o.card_name, fill: !0, sizes: "(max-width: 768px) 30vw, 15vw", className: "pointer-events-none object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]", unoptimized: !0, priority: m, onLoad: () => B(!0) }) : null,
                                            }),
                                        },
                                        o.id,
                                    ),
                                }),
                            }),
                            g && (0, r.jsx)(ek, { pokemonType: t, rarity: o.card_rarity }),
                        ],
                    });
                }
                if ("free" === i.slot_type)
                    return (0, r.jsxs)("button", {
                        type: "button",
                        ref: N,
                        id: "binder-slot-".concat(i.id),
                        onClick: h,
                        onKeyDown: F,
                        "aria-label": "Compartimento livre ".concat(i.slot_index, ", vazio"),
                        style: L,
                        onMouseDownCapture: e_,
                        onPointerDownCapture: e_,
                        onTouchStartCapture: e_,
                        className: "group relative h-full min-h-0 w-full cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-white/15 bg-[#090c13]/80 p-2 text-left outline-none transition-all duration-200 hover:border-poke-blue/50 hover:bg-[#0f1422] focus-visible:ring-2 focus-visible:ring-poke-blue ".concat(S ? "z-30" : "", " ").concat(M),
                        children: [
                            (0, r.jsx)("div", { className: "pointer-events-none absolute top-2 left-2 z-10", children: (0, r.jsx)("span", { className: "rounded bg-black/40 px-1.5 py-0.5 text-[10px] font-medium text-slate-400", children: "Livre" }) }),
                            (0, r.jsxs)("div", {
                                className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5",
                                children: [(0, r.jsx)("div", { className: "flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all duration-200 group-hover:border-poke-blue/40 group-hover:bg-poke-blue/20 group-hover:text-white", children: (0, r.jsx)(J.A, { size: 16 }) }), (0, r.jsx)("span", { className: "text-[10px] font-semibold text-slate-400 group-hover:text-slate-200", children: "Inserir Carta" })],
                            }),
                        ],
                    });
                if ("card" === i.slot_type)
                    return (0, r.jsxs)("button", {
                        type: "button",
                        ref: N,
                        id: "binder-slot-".concat(i.id),
                        onClick: h,
                        onKeyDown: F,
                        "aria-label": i.target_card_name ? "Meta de carta: ".concat(i.target_card_name, ", vazia") : "Meta de carta, vazia",
                        style: L,
                        onMouseDownCapture: e_,
                        onPointerDownCapture: e_,
                        onTouchStartCapture: e_,
                        className: "group relative h-full min-h-0 w-full cursor-pointer overflow-hidden rounded-lg border border-amber-500/30 bg-[#0c1017] p-2 text-left outline-none transition-all duration-200 hover:border-amber-400/60 hover:bg-[#131926] focus-visible:ring-2 focus-visible:ring-poke-blue ".concat(S ? "z-30" : "", " ").concat(M),
                        children: [
                            i.target_card_image_url && x && (0, r.jsx)("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: (0, r.jsx)(w.default, { src: (0, v.HO)(i.target_card_image_url), alt: i.target_card_name || "Carta", fill: !0, sizes: "(max-width: 768px) 30vw, 15vw", className: "object-contain opacity-25 grayscale transition-opacity duration-200 group-hover:opacity-40", unoptimized: !0 }) }),
                            (0, r.jsx)("div", { className: "pointer-events-none absolute top-2 left-2 z-10", children: (0, r.jsx)("span", { className: "rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-amber-300 backdrop-blur-sm", children: "TCG Card" }) }),
                            (0, r.jsx)("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: (0, r.jsx)("div", { className: "flex h-8 w-8 items-center justify-center rounded-full border border-amber-500/40 bg-black/60 text-amber-300 shadow-md backdrop-blur-sm transition-all duration-200", children: (0, r.jsx)(J.A, { size: 16 }) }) }),
                            i.target_card_name && (0, r.jsx)("div", { className: "pointer-events-none absolute bottom-2 left-2 right-2 z-10", children: (0, r.jsx)("span", { className: "block truncate rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-slate-200 backdrop-blur-sm", children: i.target_card_name }) }),
                        ],
                    });
                let G = i.target_dex_id || 1,
                    D = (null == (t = j.FV.get(G)) ? void 0 : t.name) || i.target_card_name || "Pok\xe9mon #".concat(G),
                    O = "#".concat(String(G).padStart(3, "0")),
                    q = z ? "border-[var(--theme-primary)]/25 bg-[#0b0e15] ".concat(p ? "" : "hover:border-[var(--theme-primary)]/45 hover:bg-[#10141f] hover:z-20") : "border-[#1a2130] bg-[#0c1017] shadow-sm ".concat(p ? "" : "hover:border-white/15 hover:bg-[#121722] hover:z-20");
                return (0, r.jsxs)("button", {
                    type: "button",
                    ref: N,
                    id: "binder-slot-".concat(i.id),
                    onClick: h,
                    onKeyDown: F,
                    "aria-label": z
                        ? ""
                              .concat(D, ", ")
                              .concat(O, ", vazio, ")
                              .concat(d, " ")
                              .concat(d > 1 ? "cartas dispon\xedveis" : "carta dispon\xedvel", " na cole\xe7\xe3o")
                        : "".concat(D, ", ").concat(O, ", vazio"),
                    style: L,
                    onMouseDownCapture: e_,
                    onPointerDownCapture: e_,
                    onTouchStartCapture: e_,
                    className: "group relative h-full min-h-0 w-full cursor-pointer overflow-hidden rounded-lg p-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-poke-blue binder-empty-slot "
                        .concat(q, " ")
                        .concat(S ? "z-30" : "", " ")
                        .concat(M),
                    children: [
                        (0, r.jsx)("div", { className: "pointer-events-none absolute top-2 left-2 z-10", children: (0, r.jsx)("span", { className: "rounded px-1.5 py-0.5 text-[11px] font-bold leading-none ".concat(z ? "bg-black/50 text-slate-300" : "bg-black/40 text-slate-500"), children: O }) }),
                        z && (0, r.jsx)("div", { className: "pointer-events-none absolute top-2.5 right-2.5 z-10 flex items-center justify-center", children: (0, r.jsx)("span", { className: "h-2 w-2 rounded-full bg-[var(--theme-primary)] opacity-85 shadow-[0_0_6px_var(--theme-primary-glow)]" }) }),
                        (0, r.jsxs)("div", {
                            className: "pointer-events-none absolute inset-2 bottom-7",
                            children: [
                                x ? (0, r.jsx)(w.default, { src: (0, j.Xw)(G), alt: D, fill: !0, sizes: "(max-width: 768px) 30vw, 15vw", className: "silhouette-img object-contain ".concat(z ? "opacity-30" : "opacity-25", " ").concat(p ? "" : z ? "transition-opacity duration-200 group-hover:opacity-50" : "transition-opacity duration-200 group-hover:opacity-45"), unoptimized: !0, priority: m, onLoad: () => (0, j.nQ)(G) }) : null,
                                (0, r.jsx)("div", {
                                    className: "binder-slot-plus absolute inset-0 flex items-center justify-center",
                                    children: (0, r.jsx)("div", {
                                        className: "flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 ".concat(z ? "border border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] ".concat(p ? "" : "group-hover:border-[var(--theme-primary)]/50 group-hover:bg-[var(--theme-primary)]/20") : "bg-white/5 text-slate-400 ".concat(p ? "" : "transition-colors group-hover:bg-white/10 group-hover:text-white")),
                                        children: (0, r.jsx)(J.A, { size: 16 }),
                                    }),
                                }),
                            ],
                        }),
                        (0, r.jsx)("div", { className: "binder-slot-name pointer-events-none absolute bottom-2 left-2 right-2 z-10", children: (0, r.jsx)("span", { className: "text-[11px] font-semibold transition-colors ".concat(z ? "text-slate-300 group-hover:text-white" : "text-slate-400"), children: D }) }),
                    ],
                });
            }
            let eS = { "1x1": "grid-cols-1 grid-rows-1 p-3", "2x2": "grid-cols-2 grid-rows-2 gap-2.5 sm:gap-3 p-2", "3x3": "grid-cols-3 grid-rows-3 gap-2 sm:gap-2.5 p-1.5", "3x4": "grid-cols-3 grid-rows-4 gap-1.5 sm:gap-2 p-1" },
                eM = { "1x1": 1, "2x2": 4, "3x3": 9, "3x4": 12 };
            function eP(e, t) {
                return Math.min(t, Math.max(1, Math.trunc(e) || 1));
            }
            function eT(e, t, a) {
                return Array.from({ length: eM[e.grid_type] }, (r, l) => {
                    var s, n;
                    return null != (s = t.get("".concat(a, "-").concat(l + 1))) ? s : ((n = l + 1), { id: "virtual-".concat(a, "-").concat(n), binder_id: e.id, page_number: a, slot_index: n, slot_type: "free", created_at: "", updated_at: "" });
                });
            }
            let eA = (0, l.forwardRef)(function (e, t) {
                    let { binder: a, back: l = !1, onClick: s } = e;
                    return (0, r.jsx)("div", { ref: t, "data-density": "hard", onClick: s, className: "binder-book-page ".concat(l ? "binder-cover-back" : "binder-cover-front cursor-pointer", " h-full w-full overflow-hidden rounded-xl"), children: (0, r.jsx)(eh.l, { name: a.name, coverTheme: a.cover_theme, coverPokemonDexId: l ? null : a.cover_pokemon_dex_id, back: l, className: "h-full" }) });
                }),
                eE = (0, l.forwardRef)(function (e, t) {
                    let { binder: a } = e,
                        l = (0, ec.v)(a.cover_theme);
                    return (0, r.jsx)("div", {
                        ref: t,
                        "data-density": "hard",
                        className: "binder-book-page relative h-full w-full overflow-hidden rounded-xl border border-white/5 bg-[#0c1017]",
                        style: { backgroundImage: "radial-gradient(circle at 50% 50%, ".concat(l.primaryColor, "22, transparent 44%), repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 8px)") },
                        children: (0, r.jsx)("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: (0, r.jsx)(ef.z, { ballType: l.ballType, size: 260, className: "h-[52%] w-[52%] max-h-[260px] max-w-[260px] opacity-[0.09]", style: { filter: "none" } }) }),
                    });
                }),
                eL = (0, l.createContext)({ slotsMap: new Map(), highlightedSlotId: null, droppingSlotId: null, pauseTilt: !1, onSlotClick: () => {} }),
                eF = (0, l.memo)(
                    (0, l.forwardRef)(function (e, t) {
                        let { binder: a, pageNumber: s } = e,
                            { slotsMap: n, highlightedSlotId: i, droppingSlotId: o, pauseTilt: d, onSlotClick: c } = (0, l.useContext)(eL),
                            u = eT(a, n, s),
                            x = u.filter((e) => e.card).length;
                        return (0, r.jsx)("div", {
                            ref: t,
                            "data-density": "soft",
                            className: "binder-book-page relative h-full w-full rounded-xl bg-[#0d111a]",
                            children: (0, r.jsxs)("div", {
                                className: "flex h-full min-h-0 w-full flex-col rounded-xl border border-white/5 bg-gradient-to-br from-[#141824] via-[#10131d] to-[#0a0d14] px-3 pt-3 pb-2 text-white sm:px-3.5 sm:pt-3.5",
                                children: [
                                    (0, r.jsxs)("div", { className: "mb-1.5 flex shrink-0 items-center justify-between border-b border-white/5 pb-1.5 text-xs font-semibold text-slate-400", children: [(0, r.jsxs)("span", { className: "font-medium text-slate-300", children: ["P\xe1gina ", s, " de ", (0, er.r)(a.total_pages)] }), (0, r.jsxs)("span", { className: "font-mono text-[11px] text-slate-500", children: [x, "/", u.length, " cartas"] })] }),
                                    (0, r.jsx)("div", { className: "grid min-h-0 flex-1 rounded-xl border border-[#161b26] bg-[#0b0e15] shadow-inner ".concat(eS[a.grid_type]), children: u.map((e) => (0, r.jsx)(ez, { slot: e, card: e.card, isHighlighted: i === e.id, isDropping: o === e.id, pauseTilt: d, onClick: () => c(e) }, e.id)) }),
                                ],
                            }),
                        });
                    }),
                );
            function eI(e) {
                var t;
                let { binder: a, slotsMap: s, currentPage: n, highlightedSlotId: i, droppingSlotId: o, onPageChange: d, onSlotClick: c } = e,
                    u = (0, l.useContext)(eb.cm),
                    x = null == (t = null == u ? void 0 : u.animationsEnabled) || t,
                    [m, p] = (0, l.useState)("idle"),
                    [h, f] = (0, l.useState)(n),
                    b = (0, l.useRef)(1),
                    g = (0, l.useRef)(null),
                    w = (0, l.useRef)(!1),
                    v = "idle" !== m,
                    j = (0, er.r)(a.total_pages),
                    y = eT(a, s, h),
                    N = (0, l.useCallback)(
                        (e) => {
                            let t = eP(e, j);
                            if (!v && t !== h) {
                                if (((b.current = t > h ? 1 : -1), !x || window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
                                    (f(t), d(t));
                                    return;
                                }
                                (p("exit"),
                                    window.setTimeout(() => {
                                        (f(t), d(t), p("enter"), window.setTimeout(() => p("idle"), 180));
                                    }, 140));
                            }
                        },
                        [x, v, h, d, j],
                    );
                return (
                    (0, l.useEffect)(() => {
                        n === h || v || N(n);
                    }, [v, n, h, N]),
                    (0, r.jsxs)("div", {
                        className: "binder-mobile binder-mobile--entrance ".concat(v ? "pointer-events-none" : ""),
                        onPointerDownCapture: (e) => {
                            ((w.current = !1), (g.current = e.isPrimary && !v ? { id: e.pointerId, x: e.clientX, y: e.clientY } : null));
                        },
                        onPointerUpCapture: (e) => {
                            let t = g.current;
                            if (((g.current = null), !t || t.id !== e.pointerId)) return;
                            let a = e.clientX - t.x,
                                r = e.clientY - t.y;
                            Math.abs(a) < eg.B_ || Math.abs(a) <= Math.abs(r) || ((w.current = !0), N(h + (a < 0 ? 1 : -1)));
                        },
                        onClickCapture: (e) => {
                            w.current && (e.preventDefault(), e.stopPropagation(), (w.current = !1));
                        },
                        children: [
                            (0, r.jsxs)("div", { className: "mb-1.5 flex shrink-0 items-center justify-between border-b border-white/5 pb-1.5 text-xs font-semibold text-slate-400", children: [(0, r.jsxs)("span", { className: "font-medium text-slate-300", children: ["P\xe1gina ", h, " de ", j] }), (0, r.jsxs)("span", { className: "font-mono text-[11px] text-slate-500", children: [y.filter((e) => e.card).length, "/", y.length, " cartas"] })] }),
                            (0, r.jsx)("div", {
                                className: "min-h-0 flex-1 overflow-hidden rounded-xl border border-[#161b26] bg-[#0b0e15] p-1.5 shadow-inner",
                                children: (0, r.jsx)("div", { className: "binder-mobile-grid grid h-full min-h-0 ".concat(eS[a.grid_type]), "data-phase": m, style: { "--binder-slide-x": "".concat(-18 * b.current, "px") }, children: y.map((e) => (0, r.jsx)(ez, { slot: e, card: e.card, isHighlighted: i === e.id, isDropping: o === e.id, pauseTilt: v, onClick: () => c(e) }, e.id)) }),
                            }),
                        ],
                    })
                );
            }
            let eR = (0, l.forwardRef)(function (e, t) {
                var a;
                let { binder: s, slots: n, currentPage: i, entryTargetPage: o, isMobile: d, highlightedSlotId: c, droppingSlotId: u, onPageChange: x, onSlotClick: m } = e,
                    p = (0, l.useContext)(eb.cm),
                    h = null == (a = null == p ? void 0 : p.animationsEnabled) || a,
                    [f, b] = (0, l.useState)(!1),
                    [g, w] = (0, l.useState)(!1),
                    [v, j] = (0, l.useState)(!1),
                    [y, N] = (0, l.useState)(!1),
                    k = (0, l.useRef)(null),
                    _ = (0, l.useRef)(null),
                    C = (0, l.useRef)(0),
                    z = (0, l.useRef)(!1),
                    S = (0, er.r)(s.total_pages),
                    M = (0, er.m)(s.total_pages),
                    P = (0, l.useMemo)(() => new Map(n.map((e) => ["".concat(e.page_number, "-").concat(e.slot_index), e])), [n]),
                    T = (0, l.useMemo)(() => (0, ec.v)(s.cover_theme), [s.cover_theme]),
                    A = (0, l.useMemo)(() => ({ slotsMap: P, highlightedSlotId: c, droppingSlotId: u, pauseTilt: v, onSlotClick: m }), [u, c, v, m, P]);
                (0, l.useLayoutEffect)(() => {
                    if (d) return;
                    let e = k.current;
                    if (!e) return;
                    let t = () => !(e.getBoundingClientRect().width < 160) && (b(!0), !0);
                    if (t()) return;
                    let a = new ResizeObserver(() => {
                        t() && a.disconnect();
                    });
                    return (a.observe(e), () => a.disconnect());
                }, [d]);
                let E = (0, l.useRef)(null),
                    L = (0, l.useRef)(null),
                    F = (0, l.useCallback)(() => {
                        (L.current && (window.clearTimeout(L.current), (L.current = null)), (E.current = null));
                    }, []);
                (0, l.useEffect)(
                    () => () => {
                        F();
                    },
                    [F],
                );
                let I = (0, l.useCallback)((e) => el(e, s.total_pages, d), [s.total_pages, d]),
                    R = (0, l.useCallback)((e) => es(e, s.total_pages, d), [s.total_pages, d]),
                    B = (0, l.useCallback)(
                        (e) => {
                            var t, a;
                            if (d) return void x(eP(e, S));
                            let r = null == (t = _.current) ? void 0 : t.pageFlip();
                            if (!r || v || null !== E.current) return;
                            let l = I(e),
                                n = C.current;
                            if (en(n, (a = s.total_pages)) === en(l, a)) return;
                            if (!h || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                                (F(), r.turnToPage(l));
                                return;
                            }
                            let i = (function (e, t, a) {
                                let r = en(e, a),
                                    l = Math.abs((en(t, a) - r) / 2),
                                    s = l >= 4 ? 2 : +(l >= 2);
                                if (0 === s) return { mode: "direct", targetPhysical: t };
                                let n = t > e ? 2 : -2;
                                return { mode: "sequence", targetPhysical: t, intermediatePhysicalTargets: Array.from({ length: s }, (t, a) => e + n * (a + 1)) };
                            })(n, l, s.total_pages);
                            if ("direct" === i.mode) {
                                (F(), (r.getSettings().flippingTime = eg.s2), r.flip(i.targetPhysical));
                                return;
                            }
                            ((E.current = { remainingPhysicalTargets: i.intermediatePhysicalTargets.slice(1), targetPhysical: i.targetPhysical }), j(!0), (r.getSettings().flippingTime = eg.DS), r.flip(i.intermediatePhysicalTargets[0]));
                        },
                        [h, s.total_pages, v, d, x, I, F, S],
                    ),
                    G = (0, l.useCallback)(() => {
                        var e;
                        if (d) return void x(eP(i + 1, S));
                        if (E.current) return;
                        let t = null == (e = _.current) ? void 0 : e.pageFlip();
                        t && !v && (F(), (t.getSettings().flippingTime = eg.s2), t.flipNext());
                    }, [i, v, d, x, F, S]),
                    D = (0, l.useCallback)(() => {
                        var e;
                        if (d) return void x(eP(i - 1, S));
                        if (E.current) return;
                        let t = null == (e = _.current) ? void 0 : e.pageFlip();
                        t && !v && (F(), (t.getSettings().flippingTime = eg.s2), t.flipPrev());
                    }, [i, v, d, x, F, S]);
                (0, l.useImperativeHandle)(t, () => ({ flipNext: G, flipPrev: D, turnToPage: B, isBusy: () => v || null !== E.current }), [G, D, v, B]);
                let O = (0, l.useCallback)(() => {
                    var e;
                    if (d || y || v) return;
                    let t = null == (e = _.current) ? void 0 : e.pageFlip();
                    t && (N(!0), j(!0), h && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? t.flipNext() : t.turnToPage(2));
                }, [h, y, v, d]);
                ((0, l.useEffect)(() => {
                    if (d || !g || !f || y) return;
                    let e = window.setTimeout(O, 820);
                    return () => window.clearTimeout(e);
                }, [f, g, y, d, O]),
                    (0, l.useEffect)(() => {
                        if (d || !y || v) return;
                        let e = I(i);
                        R(C.current) !== R(e) && B(i);
                    }, [i, y, v, d, R, I, B]),
                    (0, l.useEffect)(() => {
                        d || !y || v || z.current || ((z.current = !0), 1 !== o && B(o));
                    }, [o, y, v, d, B]));
                let q = (0, l.useMemo)(() => {
                    let e = [(0, r.jsx)(eA, { binder: s, onClick: O }, "front"), (0, r.jsx)(eE, { binder: s }, "inside-front")];
                    for (let t = 1; t <= s.total_pages; t++) e.push((0, r.jsx)(eF, { binder: s, pageNumber: t }, "catalog-".concat(t)));
                    return (null !== M && e.push((0, r.jsx)(eF, { binder: s, pageNumber: M }, "trailing-slots")), e.push((0, r.jsx)(eE, { binder: s }, "inside-back"), (0, r.jsx)(eA, { binder: s, back: !0 }, "back")), e);
                }, [s, O, M]);
                return d
                    ? (0, r.jsx)("div", { className: "w-full", style: { "--theme-primary": T.primaryColor, "--theme-primary-glow": T.glowColor }, children: (0, r.jsx)(eI, { binder: s, slotsMap: P, currentPage: i, highlightedSlotId: c, droppingSlotId: u, onPageChange: x, onSlotClick: m }) })
                    : (0, r.jsx)(eL.Provider, {
                          value: A,
                          children: (0, r.jsx)("div", {
                              className: "relative flex h-full min-h-0 w-full flex-col items-center ".concat(g ? "binder-stage-entrance" : "invisible"),
                              style: { "--binder-entrance-duration": "720ms", "--theme-primary": T.primaryColor, "--theme-primary-glow": T.glowColor },
                              children: (0, r.jsx)("div", {
                                  ref: k,
                                  className: "binder-book-stage ".concat(v ? "binder-book-stage--busy" : ""),
                                  children: f
                                      ? (0, r.jsx)(ep.A, {
                                            ref: _,
                                            width: eg.Q4,
                                            height: eg.vf,
                                            size: "stretch",
                                            minWidth: eg.h4,
                                            maxWidth: eg.lz,
                                            minHeight: 540,
                                            maxHeight: 820,
                                            maxShadowOpacity: eg.Wn,
                                            showCover: !0,
                                            mobileScrollSupport: !0,
                                            swipeDistance: eg.SJ,
                                            clickEventForward: !0,
                                            disableFlipByClick: !h,
                                            flippingTime: eg.s2,
                                            usePortrait: !1,
                                            startPage: 0,
                                            onInit: () => w(!0),
                                            onChangeState: (e) => {
                                                j(["flipping", "user_fold", "fold_corner"].includes(String(e.data)) || null !== E.current);
                                            },
                                            onFlip: (e) => {
                                                let t = Number(e.data) || 0;
                                                C.current = t;
                                                let a = E.current;
                                                if (a) {
                                                    let e = a.remainingPhysicalTargets.shift();
                                                    null != e
                                                        ? (L.current = window.setTimeout(() => {
                                                              var t;
                                                              let a = null == (t = _.current) ? void 0 : t.pageFlip();
                                                              a && a.flip(e);
                                                          }, 20))
                                                        : (L.current = window.setTimeout(() => {
                                                              var e;
                                                              let t = null == (e = _.current) ? void 0 : e.pageFlip();
                                                              t && ((t.getSettings().flippingTime = eg.s2), t.flip(a.targetPhysical), (E.current = null));
                                                          }, 20));
                                                    return;
                                                }
                                                x(R(t));
                                            },
                                            drawShadow: h,
                                            startZIndex: 0,
                                            autoSize: !0,
                                            useMouseEvents: !1,
                                            showPageCorners: !1,
                                            renderOnlyPageLengthChange: !0,
                                            className: "binder-flipbook-root ".concat(h ? "" : "binder-flipbook-root--static"),
                                            style: {},
                                            children: q,
                                        })
                                      : null,
                              }),
                          }),
                      });
            });
            function eB(e, t) {
                return Math.min(t, Math.max(1, Math.trunc(e) || 1));
            }
            function eG(e) {
                let { binder: t, initialSlots: a, otherBinders: s = [], isOwner: x = !0 } = e,
                    g = (0, i.useRouter)(),
                    w = (0, i.useSearchParams)(),
                    { mutate: v, cache: y } = (0, o.iX)(),
                    N = (0, er.r)(t.total_pages),
                    k = eB(Number(w.get("page")), N),
                    _ = (0, l.useRef)(null),
                    [C, z] = (0, l.useState)(1),
                    [S, M] = (0, l.useState)(a),
                    [P, T] = (0, l.useState)(!1),
                    [A, E] = (0, l.useState)(null),
                    [L, F] = (0, l.useState)(!1),
                    [I, R] = (0, l.useState)(!1),
                    [B, G] = (0, l.useState)(null),
                    [D, O] = (0, l.useState)(!1),
                    [q, V] = (0, l.useState)(!1),
                    [H, W] = (0, l.useState)(),
                    [U, X] = (0, l.useState)(),
                    [Z, J] = (0, l.useState)(null),
                    [K, Q] = (0, l.useState)(null),
                    [Y, $] = (0, l.useState)(null),
                    ee = (0, l.useRef)(0),
                    et = (0, l.useRef)(null),
                    en = (0, l.useRef)(null),
                    eo = (0, l.useRef)(null),
                    ed = (0, l.useRef)(null),
                    ec = (0, l.useRef)(null);
                ((0, l.useEffect)(() => {
                    let e = () => {
                        let e = window.innerWidth < 768;
                        (T(e), z((a) => (e ? eB(1 === a ? k : a, N) : Math.min(t.total_pages + 2, Math.max(0, a)))));
                    };
                    return (e(), window.addEventListener("resize", e), () => window.removeEventListener("resize", e));
                }, [t.total_pages, k, N]),
                    (0, l.useEffect)(() => {
                        let e = w.get("openSlot");
                        if (!x || !e || en.current === e) return;
                        let t = S.find((t) => t.id === e);
                        t && ((en.current = e), G(t), O(!0));
                    }, [x, w, S]));
                let ex = (0, l.useCallback)(
                        (e) => {
                            let a = P ? eB(e, N) : Math.min(t.total_pages + 2, Math.max(0, Math.trunc(e) || 0));
                            z(a);
                            let r = new URL(window.location.href);
                            (r.searchParams.set("page", String(a)), window.history.replaceState(window.history.state, "", r.toString()));
                        },
                        [t.total_pages, P, N],
                    ),
                    ep = (0, l.useCallback)(
                        (e) => {
                            var t;
                            let a = eB(e, N);
                            a !== C && (null == (t = _.current) || t.turnToPage(a));
                        },
                        [C, N],
                    ),
                    eh = (0, l.useCallback)(
                        (e, t) => {
                            ee.current += 1;
                            let a = ee.current;
                            (null !== et.current && (window.clearTimeout(et.current), (et.current = null)), J(null), Q({ slotId: t, pageNumber: e, requestId: a }), ep(e));
                        },
                        [ep],
                    );
                ((0, l.useEffect)(() => {
                    if (!K) return;
                    let e = 0,
                        t = performance.now() + 5e3,
                        a = () => {
                            var r, l;
                            if (K.requestId !== ee.current) return;
                            let s = document.getElementById("binder-slot-".concat(K.slotId));
                            if (
                                (function (e) {
                                    let { targetPage: t, currentPage: a, isMobile: r, isBusy: l, isPainted: s } = e;
                                    return (t === a || (!r && t === a + 1)) && !l && s;
                                })({
                                    targetPage: K.pageNumber,
                                    currentPage: C,
                                    isMobile: P,
                                    isBusy: null != (l = null == (r = _.current) ? void 0 : r.isBusy()) && l,
                                    isPainted: !!(
                                        s &&
                                        (function (e) {
                                            let t = e.getBoundingClientRect();
                                            if (t.width < 8 || t.height < 8 || !(0, j.QX)(e)) return !1;
                                            let a = e;
                                            for (; a;) {
                                                let e = getComputedStyle(a);
                                                if ("hidden" === e.visibility || "none" === e.display) return !1;
                                                let t = Number.parseFloat(e.opacity);
                                                if (Number.isFinite(t) && t < 0.5) return !1;
                                                if (a.classList.contains("binder-book-stage")) break;
                                                a = a.parentElement;
                                            }
                                            return !0;
                                        })(s)
                                    ),
                                })
                            ) {
                                (Q(null),
                                    J(K.slotId),
                                    (et.current = window.setTimeout(() => {
                                        (J(null), (et.current = null));
                                    }, 2500)));
                                return;
                            }
                            performance.now() < t ? (e = window.requestAnimationFrame(a)) : Q(null);
                        };
                    return ((e = window.requestAnimationFrame(a)), () => window.cancelAnimationFrame(e));
                }, [C, P, K]),
                    (0, l.useEffect)(
                        () => () => {
                            ((ee.current += 1), null !== et.current && window.clearTimeout(et.current), null !== ed.current && window.clearTimeout(ed.current), null !== ec.current && window.clearTimeout(ec.current));
                        },
                        [],
                    ));
                let ef = (0, l.useMemo)(() => {
                        let e = new Map();
                        for (let t = 1; t <= N; t++) e.set(t, { filled: 0, total: 0 });
                        for (let t of S) {
                            let a = e.get(t.page_number);
                            a && ((a.total += 1), t.card && (a.filled += 1));
                        }
                        return e;
                    }, [N, S]),
                    eb = (0, l.useMemo)(() => {
                        if (P || null === A) return null;
                        let e = es(el(A, t.total_pages, !1), t.total_pages, !1);
                        return new Set([e, e + 1]);
                    }, [t.total_pages, A, P]),
                    eg = (0, l.useCallback)(
                        (e) => {
                            x && (G(e), O(!0));
                        },
                        [x],
                    ),
                    ew = (0, l.useCallback)((e, t) => {
                        (M((a) => a.map((a) => (a.id === e ? { ...a, user_card_id: t.id, card: t } : a))), $(e), window.setTimeout(() => $(null), 1400));
                    }, []),
                    ev = (0, l.useCallback)((e) => {
                        M((t) => t.map((t) => (t.id === e ? { ...t, user_card_id: null, card: null } : t)));
                    }, []),
                    ej = (0, l.useCallback)(
                        (e) => {
                            for (let a of y.keys()) {
                                var t;
                                if (!(0, ei.B8)(a)) continue;
                                let r = null == (t = y.get(a)) ? void 0 : t.data;
                                (null == r ? void 0 : r.cards) && v(a, { cards: [...r.cards, e] }, !1);
                            }
                        },
                        [y, v],
                    ),
                    ey = (0, l.useCallback)(() => {
                        let e = eo.current;
                        (V(!1),
                            null !== ed.current && window.clearTimeout(ed.current),
                            (ed.current = window.setTimeout(() => {
                                ed.current = null;
                                let t = S.find((t) => t.id === e);
                                if (!t) return void G(null);
                                (G(t), O(!0));
                            }, 300)));
                    }, [S]),
                    eN = (0, l.useCallback)(
                        (e, t) => {
                            eh(e, t);
                        },
                        [eh],
                    ),
                    ek = (0, l.useCallback)(
                        (e) => {
                            let t = S.find((t) => {
                                var a;
                                return t.target_dex_id === e || (null == (a = t.card) ? void 0 : a.pokemon_dex_id) === e;
                            });
                            t && eh(t.page_number, t.id);
                        },
                        [eh, S],
                    ),
                    e_ = C > +!!P,
                    eC = C < (P ? N : t.total_pages + 2);
                return (0, r.jsxs)("div", {
                    className: "flex min-h-screen flex-col overflow-x-clip bg-[#0a0c10] text-slate-100",
                    children: [
                        (0, r.jsx)("header", {
                            className: "sticky top-0 z-40 border-b border-white/10 bg-[#0a0c10]/90 backdrop-blur-md",
                            children: (0, r.jsxs)("div", {
                                className: "mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2.5 sm:px-6",
                                children: [
                                    (0, r.jsxs)("div", {
                                        className: "flex min-w-0 items-center gap-2 sm:gap-3",
                                        children: [
                                            (0, r.jsxs)(n(), { href: "/", prefetch: !0, className: "flex shrink-0 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white sm:px-3 sm:py-2", children: [(0, r.jsx)(d.A, { size: 15 }), (0, r.jsx)("span", { className: "hidden sm:inline", children: "Estante" })] }),
                                            (0, r.jsxs)("div", {
                                                className: "relative min-w-0",
                                                children: [
                                                    (0, r.jsxs)("button", {
                                                        type: "button",
                                                        onClick: () => R((e) => !e),
                                                        className: "flex min-w-0 items-center gap-2 rounded-xl border border-transparent px-2 py-1.5 text-left transition-colors hover:border-white/10 hover:bg-white/5",
                                                        children: [
                                                            (0, r.jsxs)("div", {
                                                                className: "min-w-0",
                                                                children: [
                                                                    (0, r.jsxs)("div", { className: "flex items-center gap-2", children: [(0, r.jsx)("h1", { className: "truncate text-sm font-extrabold text-white sm:text-base", children: t.name }), (0, r.jsx)("span", { className: "hidden rounded bg-black/40 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-300 sm:inline", children: t.grid_type })] }),
                                                                    (0, r.jsxs)("span", { className: "text-[10px] text-slate-400", children: ["P\xe1gina ", C, " de ", N] }),
                                                                ],
                                                            }),
                                                            s.length > 1 ? (0, r.jsx)(c.A, { size: 14, className: "shrink-0 text-slate-400" }) : null,
                                                        ],
                                                    }),
                                                    I && s.length > 1
                                                        ? (0, r.jsxs)("div", {
                                                              className: "absolute top-full left-0 z-50 mt-1.5 w-64 rounded-2xl border border-white/10 bg-[#121622] p-1.5 shadow-2xl backdrop-blur-xl",
                                                              children: [
                                                                  (0, r.jsx)("div", { className: "px-2.5 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase", children: "Seus binders" }),
                                                                  (0, r.jsx)("div", {
                                                                      className: "flex max-h-60 flex-col gap-1 overflow-y-auto",
                                                                      children: s.map((e) => {
                                                                          let a = e.id === t.id;
                                                                          return (0, r.jsxs)(
                                                                              "button",
                                                                              {
                                                                                  type: "button",
                                                                                  onClick: () => {
                                                                                      (R(!1), a || g.push("/binders/".concat(e.id)));
                                                                                  },
                                                                                  className: "flex items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs font-semibold transition-colors ".concat(a ? "bg-poke-blue/20 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"),
                                                                                  children: [(0, r.jsx)("span", { className: "truncate", children: e.name }), (0, r.jsxs)("div", { className: "flex items-center gap-1.5", children: [(0, r.jsx)("span", { className: "rounded bg-black/40 px-1 py-0.5 font-mono text-[9px] text-slate-400", children: e.grid_type }), a ? (0, r.jsx)(u.A, { size: 13, className: "text-poke-blue" }) : null] })],
                                                                              },
                                                                              e.id,
                                                                          );
                                                                      }),
                                                                  }),
                                                              ],
                                                          })
                                                        : null,
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, r.jsxs)("div", {
                                        className: "flex shrink-0 items-center gap-2",
                                        children: [
                                            (0, r.jsxs)("button", { type: "button", onClick: () => F(!0), className: "flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-white/20 hover:bg-white/10 sm:px-3 sm:py-2", children: [(0, r.jsx)(m, { size: 15, className: "text-poke-blue" }), (0, r.jsx)("span", { className: "hidden sm:inline", children: "Estat\xedsticas" })] }),
                                            x ? (0, r.jsx)(n(), { href: "/binders/".concat(t.id, "/edit"), title: "Editar estrutura", className: "flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white sm:h-9 sm:w-9", children: (0, r.jsx)(p.A, { size: 15 }) }) : null,
                                        ],
                                    }),
                                ],
                            }),
                        }),
                        (0, r.jsx)("main", {
                            className: "mx-auto flex w-full max-w-7xl flex-1 flex-col items-center overflow-x-clip px-0 pt-2 pb-28 sm:pt-3 md:px-4 md:pb-14",
                            children: (0, r.jsxs)("div", {
                                className: "flex min-h-0 w-full flex-1 flex-col items-center",
                                children: [
                                    (0, r.jsxs)("div", {
                                        className: "mb-2 flex w-full max-w-md shrink-0 items-center justify-between gap-2 px-2 md:hidden",
                                        children: [
                                            (0, r.jsx)("button", {
                                                type: "button",
                                                disabled: !e_,
                                                onClick: () => {
                                                    var e;
                                                    return null == (e = _.current) ? void 0 : e.flipPrev();
                                                },
                                                "aria-label": "P\xe1gina anterior",
                                                className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all ".concat(e_ ? "border-white/10 bg-[#121620]/85 text-white shadow-lg active:scale-95" : "border-white/5 bg-white/[0.02] text-slate-600 opacity-25"),
                                                children: (0, r.jsx)(h, { size: 20 }),
                                            }),
                                            (0, r.jsx)("div", { className: "min-w-0 flex-1", children: (0, r.jsx)(em, { onSearch: ek }) }),
                                            (0, r.jsx)("button", {
                                                type: "button",
                                                disabled: !eC,
                                                onClick: () => {
                                                    var e;
                                                    return null == (e = _.current) ? void 0 : e.flipNext();
                                                },
                                                "aria-label": "Pr\xf3xima p\xe1gina",
                                                className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all ".concat(eC ? "border-white/10 bg-[#121620]/85 text-white shadow-lg active:scale-95" : "border-white/5 bg-white/[0.02] text-slate-600 opacity-25"),
                                                children: (0, r.jsx)(f, { size: 20 }),
                                            }),
                                        ],
                                    }),
                                    (0, r.jsx)("div", { className: "mb-5 hidden w-full max-w-sm shrink-0 justify-center md:flex", children: (0, r.jsx)(em, { onSearch: ek }) }),
                                    (0, r.jsxs)("div", {
                                        className: "relative flex min-h-0 w-full flex-1 items-center justify-center gap-2 max-md:flex-none lg:gap-4 xl:gap-5",
                                        children: [
                                            (0, r.jsx)("button", {
                                                type: "button",
                                                disabled: !e_,
                                                onClick: () => {
                                                    var e;
                                                    return null == (e = _.current) ? void 0 : e.flipPrev();
                                                },
                                                "aria-label": "P\xe1gina anterior",
                                                className: "hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-200 md:flex xl:h-14 xl:w-14 ".concat(e_ ? "border-white/10 bg-[#121620]/85 text-white shadow-xl hover:border-white/25 hover:bg-white/15 hover:scale-105 active:scale-95" : "border-white/5 bg-white/[0.02] text-slate-600 opacity-25"),
                                                children: (0, r.jsx)(h, { size: 24 }),
                                            }),
                                            (0, r.jsx)("div", { className: "relative flex h-full min-h-0 w-full max-w-6xl flex-1 items-center justify-center max-md:h-auto max-md:flex-none", children: (0, r.jsx)(eR, { ref: _, binder: t, slots: S, currentPage: C, entryTargetPage: k, isMobile: P, highlightedSlotId: Z, droppingSlotId: Y, onPageChange: ex, onSlotClick: eg }) }),
                                            (0, r.jsx)("button", {
                                                type: "button",
                                                disabled: !eC,
                                                onClick: () => {
                                                    var e;
                                                    return null == (e = _.current) ? void 0 : e.flipNext();
                                                },
                                                "aria-label": "Pr\xf3xima p\xe1gina",
                                                className: "hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-200 md:flex xl:h-14 xl:w-14 ".concat(eC ? "border-white/10 bg-[#121620]/85 text-white shadow-xl hover:border-white/25 hover:bg-white/15 hover:scale-105 active:scale-95" : "border-white/5 bg-white/[0.02] text-slate-600 opacity-25"),
                                                children: (0, r.jsx)(f, { size: 24 }),
                                            }),
                                        ],
                                    }),
                                    (0, r.jsx)("nav", {
                                        "aria-label": "Navega\xe7\xe3o r\xe1pida de p\xe1ginas",
                                        className: "relative z-20 mt-2 w-full max-w-6xl shrink-0 px-2 md:mt-5",
                                        children: (0, r.jsx)("div", {
                                            onMouseLeave: () => E(null),
                                            className: "flex max-h-28 flex-wrap justify-center gap-1 overflow-y-auto rounded-2xl border border-white/10 bg-[#10131b]/90 p-1.5 shadow-2xl backdrop-blur-xl sm:p-2.5",
                                            children: Array.from({ length: N }, (e, t) => {
                                                var a;
                                                let l = t + 1,
                                                    s = null != (a = ef.get(l)) ? a : { filled: 0, total: 0 },
                                                    n = l === C || (!P && l === C + 1),
                                                    i = eb ? eb.has(l) : n;
                                                return (0, r.jsxs)(
                                                    "button",
                                                    {
                                                        type: "button",
                                                        onClick: () => ep(l),
                                                        onMouseEnter: () => E(l),
                                                        onFocus: () => E(l),
                                                        onBlur: () => E(null),
                                                        "aria-current": n ? "page" : void 0,
                                                        className: "relative flex h-9 min-w-10 flex-col items-center justify-center overflow-hidden rounded-lg border px-1 text-xs transition-[background-color,border-color,color,box-shadow] duration-200 ease-out motion-reduce:transition-none ".concat(
                                                            i ? "border-[var(--theme-primary)]/40 bg-[var(--theme-primary)]/20 text-white shadow-[0_0_12px_var(--theme-primary-glow)]" : "border-transparent bg-white/[0.02] text-slate-400 hover:bg-white/[0.07] hover:text-slate-200",
                                                        ),
                                                        children: [(0, r.jsx)("span", { className: "font-bold", children: l }), (0, r.jsxs)("span", { className: "font-mono text-[9px]", children: [s.filled, "/", s.total] }), (0, r.jsx)("span", { className: "absolute bottom-0 left-0 h-0.5 bg-[var(--theme-primary)]", style: { width: "".concat(s.total ? (s.filled / s.total) * 100 : 0, "%") } })],
                                                    },
                                                    l,
                                                );
                                            }),
                                        }),
                                    }),
                                ],
                            }),
                        }),
                        (0, r.jsx)(eu, { isOpen: L, onClose: () => F(!1), binder: t, slots: S, onSlotNavigate: eN }),
                        (0, r.jsx)(ea, {
                            isOpen: D,
                            onClose: () => {
                                (O(!1), G(null));
                            },
                            slot: B,
                            binderId: t.id,
                            binderName: t.name,
                            binderGrid: t.grid_type,
                            onAssignSuccess: ew,
                            onUnassignSuccess: ev,
                            onOpenCatalogSearch: (e, t) => {
                                var a;
                                ((eo.current = null != (a = null == B ? void 0 : B.id) ? a : null),
                                    W(e),
                                    X(t),
                                    O(!1),
                                    null !== ec.current && window.clearTimeout(ec.current),
                                    (ec.current = window.setTimeout(() => {
                                        ((ec.current = null), V(!0));
                                    }, 300)));
                            },
                        }),
                        (0, r.jsx)(b.g, {
                            isOpen: q,
                            onClose: () => {
                                (null !== ec.current && (window.clearTimeout(ec.current), (ec.current = null)), V(!1), (eo.current = null), G(null));
                            },
                            onBack: ey,
                            pokemonName: H,
                            dexId: U,
                            onCardAdded: ej,
                        }),
                    ],
                });
            }
        },
        5512: (e, t, a) => {
            "use strict";
            a.d(t, { l: () => o });
            var r = a(5155),
                l = a(5239),
                s = a(3166),
                n = a(3263),
                i = a(6937);
            function o(e) {
                let { name: t, coverTheme: a, coverPokemonDexId: o = null, className: d = "", back: c = !1 } = e,
                    u = (0, n.v)(a);
                return (0, r.jsxs)("div", {
                    className: "relative isolate flex aspect-[480/676] min-h-0 w-full flex-col overflow-hidden rounded-[inherit] border border-white/[0.14] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_0_42px_rgba(0,0,0,0.58)] ".concat(d),
                    style: { backgroundColor: u.primaryColor, backgroundImage: "radial-gradient(circle at 12% 8%, rgba(255,255,255,0.2), transparent 24%), radial-gradient(circle at 88% 95%, rgba(0,0,0,0.62), transparent 42%), repeating-linear-gradient(112deg, rgba(255,255,255,0.055) 0 1px, transparent 1px 5px), linear-gradient(145deg, ".concat(u.primaryColor, " 0%, #11131a 58%, #07090d 100%)"), containerType: "inline-size" },
                    children: [
                        (0, r.jsx)("div", { className: "pointer-events-none absolute inset-[1.1%] rounded-[inherit] border border-white/[0.13]" }),
                        (0, r.jsx)("div", { className: "pointer-events-none absolute top-0 right-[17%] bottom-0 w-px bg-black/35 shadow-[1px_0_rgba(255,255,255,0.12)]" }),
                        (0, r.jsx)("div", { className: "pointer-events-none absolute top-0 right-[17%] bottom-0 w-[7%] translate-x-1/2 bg-gradient-to-l from-black/30 to-transparent blur-md" }),
                        (0, r.jsxs)("div", {
                            className: "relative flex h-full min-h-0 flex-col p-[6%]",
                            children: [
                                (0, r.jsxs)("div", { className: "flex items-center justify-between gap-2", children: [(0, r.jsx)("span", {}), !c && (0, r.jsx)(s.z, { ballType: u.ballType, size: 100, className: "h-auto w-[9%]" })] }),
                                (0, r.jsxs)("div", {
                                    className: "relative flex min-h-0 flex-1 flex-col items-center justify-center py-[3%] text-center",
                                    children: [
                                        !c && o
                                            ? (0, r.jsx)("div", { className: "relative flex aspect-square w-[48%] items-center justify-center rounded-full border border-white/25 bg-black/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_12px_30px_rgba(0,0,0,0.28)]", children: (0, r.jsx)(l.default, { src: (0, i.AU)(o), alt: "", width: 320, height: 320, unoptimized: !0, className: "h-[92%] w-[92%] object-contain drop-shadow-[0_6px_8px_rgba(0,0,0,0.56)] [image-rendering:pixelated]" }) })
                                            : c
                                              ? null
                                              : (0, r.jsx)(s.z, { ballType: u.ballType, size: 320, className: "h-auto w-[27%] opacity-80" }),
                                        !c && (0, r.jsx)("div", { className: "mt-[4%] w-full px-[4%]", children: (0, r.jsx)("h2", { className: "max-w-full break-words font-black leading-tight uppercase text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)]", style: { fontSize: "clamp(0.7rem, 5cqw, 1.5rem)" }, children: t }) }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                });
            }
        },
        5870: (e, t, a) => {
            "use strict";
            a.d(t, { A: () => r });
            let r = (0, a(1847).A)("Settings", [
                [
                    "path",
                    {
                        d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
                        key: "1qme2f",
                    },
                ],
                ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
            ]);
        },
        8514: (e, t, a) => {
            "use strict";
            a.d(t, { A: () => r });
            let r = (0, a(1847).A)("Pencil", [
                ["path", { d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z", key: "1a8usu" }],
                ["path", { d: "m15 5 4 4", key: "1mk7zo" }],
            ]);
        },
    },
    (e) => {
        (e.O(0, [5730, 235, 2619, 5239, 8720, 4102, 9605, 5257, 1013, 6937, 148, 2006, 5246, 7295, 8441, 1255, 7358], () => e((e.s = 2070))), (_N_E = e.O()));
    },
]);
