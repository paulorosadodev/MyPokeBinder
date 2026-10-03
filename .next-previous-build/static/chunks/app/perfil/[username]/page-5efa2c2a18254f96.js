(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [6250],
    {
        3255: (e, t, s) => {
            "use strict";
            s.d(t, { TrainerProfileView: () => ed });
            var r = s(5155),
                l = s(2115),
                a = s(5239),
                i = s(2619),
                o = s.n(i),
                n = s(63),
                d = s(4001),
                c = s(4769),
                x = s(6347),
                m = s(9039),
                b = s(4303),
                p = s(1019),
                h = s(148),
                u = s(2671),
                f = s(4067),
                g = s(2755),
                j = s(7230),
                v = s(3698),
                w = s(4133),
                N = s(6937),
                y = s(3263),
                _ = s(6245),
                k = s(4059),
                C = s(113),
                z = s(1978),
                A = s(2180),
                M = s(5801),
                T = s(6092),
                S = s(7997),
                E = s(4298),
                O = s(3848),
                P = s(7152),
                L = s(8720),
                R = s(9476),
                I = s(5229),
                q = s(6191),
                B = s(7937),
                F = s(5917),
                G = s(7181),
                H = s(9397),
                D = s(5870),
                V = s(8514),
                W = s(9347),
                J = s(9068),
                U = s(9708),
                X = s(5880),
                K = s(6651),
                Y = s(5322),
                Z = s(9926),
                Q = s(2458);
            let $ = [
                    { value: "all", label: "Todas as cartas" },
                    { value: "in_binder", label: "No Binder" },
                    { value: "stored", label: "Guardadas" },
                ],
                ee = [
                    { value: "all", label: "Todos os idiomas" },
                    { value: "pt-br", label: "Portugu\xeas (PT-BR)", icon: (0, r.jsx)(g.i, { country: "pt-br" }) },
                    { value: "en", label: "Ingl\xeas (EN)", icon: (0, r.jsx)(g.i, { country: "en" }) },
                    { value: "ja", label: "Japon\xeas (JA)", icon: (0, r.jsx)(g.i, { country: "ja" }) },
                ],
                et = async (e) => {
                    let t = await fetch(e);
                    if (!t.ok) {
                        if (404 === t.status) throw Error("not_found");
                        throw Error("fetch_failed");
                    }
                    return (await t.json()).profile;
                };
            function es(e) {
                let { children: t, className: s = "" } = e;
                return (0, r.jsx)("div", { className: "relative w-full ".concat(s), style: { aspectRatio: "8 / 11" }, children: (0, r.jsx)("div", { className: "absolute inset-0", children: t }) });
            }
            function er(e) {
                let { card: t, onMaximize: s, priority: l = !1 } = e,
                    a = (0, w.HO)(t.card_image_url),
                    i = (0, k.WE)(t.card_variant, t.card_rarity, t.card_image_url, t.card_name),
                    o = (0, C.Mr)(t.card_types, t.pokemon_dex_id),
                    { loaded: n, setLoaded: d } = (0, u.MI)(t.id);
                return (0, r.jsx)(es, {
                    className: "z-0",
                    children: (0, r.jsx)("button", {
                        type: "button",
                        onClick: () => (null == s ? void 0 : s(a, t.card_name, i, o)),
                        "aria-label": "Ampliar ".concat(t.card_name),
                        className: "relative z-0 h-full w-full cursor-zoom-in",
                        children: (0, r.jsx)(h.LW, { className: "relative h-full w-full", maxTilt: 8, maxMove: 3, scale: 1, glareOpacity: 0.25, perspective: 900, shineMode: i, elementTypes: o, isLoading: !n, children: (0, r.jsx)(u.MH, { src: a, alt: t.card_name, sizes: "(max-width: 640px) 45vw, 200px", className: "object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]", priority: l, onLoadingChange: d }) }),
                    }),
                });
            }
            function el(e) {
                let { id: t, index: s, card: l, onRemove: a, priority: i = !1 } = e,
                    { ref: o, isDragging: n } = (0, x.gl)({ id: t, index: s }),
                    d = (0, w.HO)(l.card_image_url),
                    c = (0, k.WE)(l.card_variant, l.card_rarity, l.card_image_url, l.card_name),
                    m = (0, C.Mr)(l.card_types, l.pokemon_dex_id),
                    { loaded: b, setLoaded: p } = (0, u.MI)(l.id);
                return (0, r.jsxs)("div", {
                    ref: o,
                    className: "relative w-full touch-none select-none !cursor-grab active:!cursor-grabbing ".concat(n ? "z-30" : "z-0"),
                    style: { aspectRatio: "8 / 11" },
                    "aria-label": "".concat(l.card_name, ", arraste para reordenar"),
                    children: [
                        (0, r.jsxs)("div", {
                            className: "absolute inset-0 ".concat(n ? "opacity-90 ring-2 ring-poke-blue/60 rounded-lg" : ""),
                            children: [
                                (0, r.jsx)(h.LW, { className: "relative h-full w-full", maxTilt: 0, maxMove: 0, scale: 1, glareOpacity: 0, perspective: 900, shineMode: c, elementTypes: m, isLoading: !b, children: (0, r.jsx)(u.MH, { src: d, alt: l.card_name, sizes: "(max-width: 640px) 45vw, 200px", className: "pointer-events-none object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]", priority: i, draggable: !1, onLoadingChange: p }) }),
                                (0, r.jsx)("span", { className: "pointer-events-none absolute bottom-1.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-0.5 rounded-md bg-black/55 px-1.5 py-0.5 text-white/80 backdrop-blur-sm", children: (0, r.jsx)(R.A, { size: 12, strokeWidth: 2.5 }) }),
                            ],
                        }),
                        (0, r.jsx)("button", { type: "button", onClick: a, onPointerDown: (e) => e.stopPropagation(), "aria-label": "Remover ".concat(l.card_name, " dos destaques"), className: "absolute -right-1.5 -top-1.5 z-30 flex h-7 w-7 items-center justify-center rounded-full border border-rose-400/50 bg-rose-500 text-white shadow-lg shadow-rose-500/30 transition-transform hover:scale-105 active:scale-95", children: (0, r.jsx)(I.A, { size: 14, strokeWidth: 2.5 }) }),
                    ],
                });
            }
            function ea(e) {
                let { editing: t, onAdd: s } = e;
                return (0, r.jsx)(es, {
                    children: (0, r.jsxs)("button", {
                        type: "button",
                        onClick: s,
                        className: "flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-lg sm:rounded-xl border border-dashed text-slate-500 transition-colors ".concat(t ? "border-white/25 bg-white/[0.03] hover:border-poke-blue/50 hover:bg-poke-blue/5 hover:text-poke-blue" : "border-white/10 bg-white/[0.015] hover:border-white/20 hover:text-slate-400"),
                        children: [(0, r.jsx)(q.A, { size: t ? 20 : 16, strokeWidth: 2.25 }), (0, r.jsx)("span", { className: "hidden text-[10px] font-medium sm:inline", children: t ? "Adicionar" : "Vazio" })],
                    }),
                });
            }
            function ei(e) {
                let { children: t } = e;
                return (0, r.jsx)("div", { className: "flex min-h-[calc(100dvh-4rem)] flex-col bg-[#0a0c10]", children: t });
            }
            function eo(e) {
                let { binder: t, slots: s, onCardClick: i } = e,
                    o = (0, l.useMemo)(() => {
                        let e = new Map();
                        for (let s = 1; s <= t.total_pages; s++) e.set(s, []);
                        for (let t of s) {
                            let s = e.get(t.page_number) || [];
                            (s.push(t), e.set(t.page_number, s));
                        }
                        return e;
                    }, [t.total_pages, s]),
                    n = "1x1" === t.grid_type ? "grid-cols-1 max-w-[80px]" : "2x2" === t.grid_type ? "grid-cols-2 max-w-[160px]" : "grid-cols-3 max-w-[240px]";
                return (0, r.jsxs)("div", {
                    className: "flex flex-col gap-3",
                    children: [
                        (0, r.jsxs)("div", {
                            className: "flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5",
                            children: [
                                (0, r.jsxs)("div", { className: "flex items-center gap-2", children: [(0, r.jsx)("span", { className: "text-xs font-bold text-white", children: "Mapa de Slots" }), (0, r.jsx)("span", { className: "rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-400", children: "Modo Leitura" })] }),
                                (0, r.jsxs)("div", {
                                    className: "flex items-center gap-3 text-[11px] text-slate-400",
                                    children: [
                                        (0, r.jsxs)("div", { className: "flex items-center gap-1.5", children: [(0, r.jsx)("span", { className: "h-2 w-2 rounded-full border border-dashed border-white/30" }), (0, r.jsx)("span", { children: "Livre" })] }),
                                        (0, r.jsxs)("div", { className: "flex items-center gap-1.5", children: [(0, r.jsx)("span", { className: "h-2 w-2 rounded-full bg-amber-400/70" }), (0, r.jsx)("span", { children: "Meta" })] }),
                                        (0, r.jsxs)("div", { className: "flex items-center gap-1.5", children: [(0, r.jsx)("span", { className: "h-2 w-2 rounded-full bg-emerald-400" }), (0, r.jsx)("span", { children: "Alocada" })] }),
                                    ],
                                }),
                            ],
                        }),
                        (0, r.jsx)("div", {
                            className: "flex gap-4 overflow-x-auto pb-2 pt-1",
                            children: Array.from(o.entries()).map((e) => {
                                let [t, s] = e,
                                    l = s.filter((e) => !!(e.user_card_id || e.card)).length;
                                return (0, r.jsxs)(
                                    "div",
                                    {
                                        className: "flex shrink-0 flex-col gap-2 rounded-xl border border-white/10 bg-[#0c0e15] p-3 shadow-md",
                                        children: [
                                            (0, r.jsxs)("div", { className: "flex items-center justify-between text-[11px] font-semibold text-slate-400", children: [(0, r.jsxs)("span", { children: ["P\xe1g. ", t] }), (0, r.jsxs)("span", { className: "font-mono text-[10px] text-slate-500", children: [l, "/", s.length] })] }),
                                            (0, r.jsx)("div", {
                                                className: "grid gap-1.5 ".concat(n),
                                                children: s.map((e) => {
                                                    let t = e.card;
                                                    return (e.user_card_id || t) && t
                                                        ? (0, r.jsx)(
                                                              "button",
                                                              {
                                                                  type: "button",
                                                                  onClick: () => i(t),
                                                                  title: "".concat(t.card_name, " (Slot #").concat(e.slot_index, ")"),
                                                                  className: "group relative aspect-[8/11] w-full min-w-[50px] overflow-hidden rounded-md border border-emerald-500/50 bg-emerald-500/10 transition-transform hover:scale-105 hover:border-emerald-400 focus:outline-none",
                                                                  children: (0, r.jsx)(a.default, { src: (0, w.HO)(t.card_image_url), alt: t.card_name, fill: !0, unoptimized: !0, sizes: "60px", className: "object-cover" }),
                                                              },
                                                              e.id,
                                                          )
                                                        : "pokemon" === e.slot_type && e.target_dex_id
                                                          ? (0, r.jsxs)(
                                                                "div",
                                                                {
                                                                    title: "Meta: #".concat(String(e.target_dex_id).padStart(3, "0"), " (Slot #").concat(e.slot_index, ")"),
                                                                    className: "relative flex aspect-[8/11] w-full min-w-[50px] flex-col items-center justify-center rounded-md border border-amber-500/30 bg-amber-500/5 p-1",
                                                                    children: [(0, r.jsx)("div", { className: "relative h-6 w-6 opacity-40", children: (0, r.jsx)(a.default, { src: (0, N.Xw)(e.target_dex_id), alt: "Meta", fill: !0, unoptimized: !0, className: "object-contain brightness-0 invert" }) }), (0, r.jsxs)("span", { className: "mt-0.5 font-mono text-[9px] font-bold text-amber-300/80", children: ["#", String(e.target_dex_id).padStart(3, "0")] })],
                                                                },
                                                                e.id,
                                                            )
                                                          : "card" === e.slot_type && e.target_card_image_url
                                                            ? (0, r.jsx)(
                                                                  "div",
                                                                  { title: "Meta: ".concat(e.target_card_name || "Carta", " (Slot #").concat(e.slot_index, ")"), className: "relative aspect-[8/11] w-full min-w-[50px] overflow-hidden rounded-md border border-amber-500/30 bg-amber-500/5 opacity-60", children: (0, r.jsx)(a.default, { src: (0, w.HO)(e.target_card_image_url), alt: e.target_card_name || "Meta", fill: !0, unoptimized: !0, sizes: "60px", className: "object-cover grayscale" }) },
                                                                  e.id,
                                                              )
                                                            : (0, r.jsx)("div", { title: "Slot livre #".concat(e.slot_index), className: "relative aspect-[8/11] w-full min-w-[50px] rounded-md border border-dashed border-white/10 bg-white/[0.02]" }, e.id);
                                                }),
                                            }),
                                        ],
                                    },
                                    t,
                                );
                            }),
                        }),
                    ],
                });
            }
            function en(e) {
                let { themeColor: t, children: s } = e;
                return (0, r.jsx)("div", { style: t ? (0, E.jl)(t) : void 0, children: s });
            }
            function ed(e) {
                var t, s, i, x, h, g, N, E, R, ed, ec, ex, em, eb, ep;
                let { username: eh, fallbackData: eu } = e;
                (0, n.useRouter)();
                let { data: ef, error: eg, isLoading: ej, mutate: ev } = (0, d.u)(eh ? "/api/profile/".concat(encodeURIComponent(eh)) : null, et, { fallbackData: eu, revalidateOnFocus: !1, revalidateOnReconnect: !1, shouldRetryOnError: !1, dedupingInterval: 1e4 }),
                    { data: ew } = (0, d.u)((null == ef ? void 0 : ef.isOwner) ? "/api/cards" : null, P.GO, { revalidateOnFocus: !1, revalidateOnReconnect: !1, shouldRetryOnError: !1, dedupingInterval: 1e4 }),
                    eN = null != (x = null == ew ? void 0 : ew.cards) ? x : [],
                    [ey, e_] = (0, l.useState)(!1),
                    [ek, eC] = (0, l.useState)(!1),
                    [ez, eA] = (0, l.useState)(!1),
                    [eM, eT] = (0, l.useState)([]),
                    [eS, eE] = (0, l.useState)(!1),
                    [eO, eP] = (0, l.useState)(!1),
                    [eL, eR] = (0, l.useState)(""),
                    [eI, eq] = (0, l.useState)("all"),
                    [eB, eF] = (0, l.useState)("all"),
                    [eG, eH] = (0, l.useState)("all");
                (0, T.m)(eO, () => eP(!1), eS);
                let { isPresent: eD, state: eV } = (0, S.v)(eO),
                    [eW, eJ] = (0, l.useState)(A.ej),
                    [eU, eX] = (0, l.useState)(null),
                    [eK, eY] = (0, l.useState)(null),
                    eZ = null != (h = null == ef || null == (t = ef.favoriteCardIds) ? void 0 : t.join(",")) ? h : "";
                (0, l.useEffect)(() => {
                    (null == ef ? void 0 : ef.favoriteCardIds) && eT(ef.favoriteCardIds);
                }, [eZ, null == ef ? void 0 : ef.favoriteCardIds]);
                let eQ = (0, l.useMemo)(() => {
                        var e;
                        let t = new Map();
                        for (let e of eN) t.set(e.id, e);
                        for (let s of null != (e = null == ef ? void 0 : ef.featuredCards) ? e : []) t.set(s.id, s);
                        return t;
                    }, [eN, null == ef ? void 0 : ef.featuredCards]),
                    e$ = (ez ? eM : null != (g = null == ef ? void 0 : ef.favoriteCardIds) ? g : []).map((e) => eQ.get(e)).filter(Boolean),
                    e0 = (0, l.useMemo)(() => (0, A.ay)(eN.map((e) => e.card_artist)), [eN]),
                    e1 = (0, l.useMemo)(() => eN.filter((e) => (!eL.trim() || !!(0, A.KY)(e, eL)) && ("in_binder" !== eI || !!e.is_in_binder) && ("stored" !== eI || !e.is_in_binder) && ("all" === eB || e.card_language === eB) && ("all" === eG || !!(e.card_rarity || "").trim().toLowerCase().includes(eG)) && (eW === A.ej || (e.card_artist || "").trim().toLowerCase() === eW.toLowerCase())), [eN, eL, eI, eB, eG, eW]),
                    {
                        visibleItems: e5,
                        hasMore: e2,
                        loadMore: e4,
                    } = (function (e, t) {
                        let { pageSize: s = A.xJ, resetKey: r } = t,
                            [a, i] = (0, l.useState)(s);
                        (0, l.useEffect)(() => {
                            i(s);
                        }, [r, s]);
                        let o = e.length,
                            n = Math.min(a, o),
                            d = n < o;
                        return {
                            visibleItems: (0, l.useMemo)(() => e.slice(0, n), [e, n]),
                            hasMore: d,
                            loadMore: (0, l.useCallback)(() => {
                                i((t) => (t >= e.length ? t : Math.min(t + s, e.length)));
                            }, [e.length, s]),
                            visibleCount: n,
                            totalCount: o,
                        };
                    })(e1, { resetKey: (0, l.useMemo)(() => (0, A.tF)({ searchTerm: eL, statusFilter: eI, languageFilter: eB, rarityFilter: eG, artistFilter: eW }), [eL, eI, eB, eG, eW]) }),
                    e3 = (0, M.X)({ hasMore: e2, onLoadMore: e4, root: eK, enabled: eO && e1.length > 0 }),
                    e6 = (0, l.useCallback)(function (e, t) {
                        let s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "none",
                            r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ["Colorless"];
                        eX({ src: e, alt: t, shineMode: s, elementTypes: r });
                    }, []),
                    e9 = (0, l.useCallback)(() => {
                        eX(null);
                    }, []),
                    e8 = () => {
                        (eR(""), eq("all"), eF("all"), eH("all"), eP(!0));
                    },
                    e7 = async () => {
                        try {
                            if (null == ef ? void 0 : ef.user.username) {
                                let e = "".concat(window.location.origin, "/perfil/").concat(ef.user.username);
                                (await navigator.clipboard.writeText(e), eC(!0), L.oR.success("Link do perfil copiado!", { description: "Compartilhe sua cole\xe7\xe3o de Pok\xe9mon com outros treinadores." }), setTimeout(() => eC(!1), 2e3));
                            }
                        } catch (e) {
                            L.oR.error("N\xe3o foi poss\xedvel copiar o link.");
                        }
                    },
                    [te, tt] = (0, l.useState)(null),
                    ts = async (e) => {
                        if (!te) {
                            tt(e);
                            try {
                                let t = await fetch("/api/binders/".concat(e), { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ is_featured: !0 }) }),
                                    s = await t.json();
                                if (!t.ok) throw Error(s.error || "Erro ao definir binder em destaque");
                                (L.oR.success("Binder definido como destaque!"), await ev());
                            } catch (t) {
                                let e = t instanceof Error ? t.message : "Erro ao definir destaque";
                                L.oR.error(e);
                            } finally {
                                tt(null);
                            }
                        }
                    },
                    tr = async (e, t) => {
                        if (!te) {
                            tt(e);
                            try {
                                let s = await fetch("/api/binders/".concat(e), { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ is_public: t }) }),
                                    r = await s.json();
                                if (!s.ok) throw Error(r.error || "Erro ao alterar visibilidade");
                                (L.oR.success(t ? "Binder agora \xe9 p\xfablico!" : "Binder agora \xe9 privado!"), await ev());
                            } catch (t) {
                                let e = t instanceof Error ? t.message : "Erro ao alterar visibilidade";
                                L.oR.error(e);
                            } finally {
                                tt(null);
                            }
                        }
                    },
                    tl = (e) => {
                        eT((t) => (t.includes(e) ? t.filter((t) => t !== e) : t.length >= 4 ? (L.oR.message("M\xe1ximo de 4 cartas em destaque."), t) : [...t, e]));
                    },
                    ta = () => {
                        var e;
                        (eT(null != (e = null == ef ? void 0 : ef.favoriteCardIds) ? e : []), eA(!0), e8());
                    },
                    ti = async () => {
                        eE(!0);
                        try {
                            let e = await fetch("/api/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ favorite_card_ids: eM }) }),
                                t = await e.json().catch(() => ({}));
                            if (!e.ok) return void L.oR.error(t.error || "N\xe3o foi poss\xedvel salvar os destaques.");
                            (await ev(), eA(!1), eP(!1), L.oR.success("Destaques atualizados."));
                        } catch (e) {
                            L.oR.error("N\xe3o foi poss\xedvel salvar os destaques.");
                        } finally {
                            eE(!1);
                        }
                    };
                if (eg)
                    return "not_found" === eg.message
                        ? (0, r.jsx)(p.L, { username: eh, type: "profile" })
                        : (0, r.jsx)(ei, {
                              children: (0, r.jsx)("main", {
                                  className: "mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center p-6 text-center",
                                  children: (0, r.jsxs)("div", {
                                      className: "rounded-2xl border border-white/10 bg-[#12151d] p-8 shadow-xl",
                                      children: [
                                          (0, r.jsx)("p", { className: "text-base font-bold text-white", children: "N\xe3o foi poss\xedvel carregar os dados do perfil." }),
                                          (0, r.jsx)("p", { className: "mt-1 text-xs text-slate-400", children: "Verifique sua conex\xe3o ou tente novamente mais tarde." }),
                                          (0, r.jsxs)(o(), { href: "/", prefetch: !0, className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-poke-blue px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90", children: [(0, r.jsx)(B.A, { size: 14 }), (0, r.jsx)("span", { children: "Voltar ao Binder" })] }),
                                      ],
                                  }),
                              }),
                          });
                if (ej && !ef) return (0, r.jsx)(ei, { children: (0, r.jsx)("main", { className: "flex flex-1 items-start justify-center pt-10 sm:pt-14 md:pt-18 pb-16 bg-[#0a0c10]", children: (0, r.jsx)(b.i, { message: "Carregando perfil do treinador...", size: "lg" }) }) });
                if (!ef) return (0, r.jsx)(p.L, { username: eh, type: "profile" });
                let { user: to, stats: tn, slots: td, rarityBreakdown: tc, isOwner: tx, themeColor: tm } = ef,
                    tb = null != (R = null != (E = null != (N = ef.featuredBinder) ? N : null == (s = ef.binders) ? void 0 : s.find((e) => e.is_featured)) ? E : null == (i = ef.binders) ? void 0 : i[0]) ? R : null,
                    tp = null != (ed = ef.featuredBinderSlots) ? ed : [],
                    th = (0, y.v)((null == tb ? void 0 : tb.cover_theme) || "classic_red"),
                    tu = (ef.binders || []).filter((e) => e.id !== (null == tb ? void 0 : tb.id) && (tx || e.is_public)),
                    tf = tc.reduce((e, t) => Math.max(e, t.count), 0) || 1,
                    tg = tx || e$.length > 0;
                return (0, r.jsxs)(ei, {
                    children: [
                        (0, r.jsx)(en, {
                            themeColor: tm,
                            children: (0, r.jsxs)(
                                "main",
                                {
                                    className: "mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16",
                                    children: [
                                        (0, r.jsxs)("section", {
                                            className: "profile-enter relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#161a26]/90 via-[#10131d]/90 to-[#0c0e15]/90 shadow-2xl backdrop-blur-xl ".concat(ez ? "overflow-visible" : "overflow-hidden"),
                                            children: [
                                                (0, r.jsx)("div", { className: "pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-poke-blue/10 blur-3xl" }),
                                                (0, r.jsx)("div", { className: "pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-poke-blue/10 blur-3xl" }),
                                                (0, r.jsxs)("div", {
                                                    className: "relative z-10 flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8",
                                                    children: [
                                                        (0, r.jsxs)("div", {
                                                            className: "flex items-center gap-4 sm:gap-5",
                                                            children: [
                                                                (0, r.jsx)("div", {
                                                                    className: "relative shrink-0",
                                                                    children:
                                                                        to.avatarUrl && !ey
                                                                            ? (0, r.jsx)(a.default, { src: to.avatarUrl, alt: to.username, width: 80, height: 80, className: "h-16 w-16 rounded-full border-2 border-white/20 object-cover shadow-xl ring-2 ring-white/10 sm:h-20 sm:w-20", referrerPolicy: "no-referrer", onError: () => e_(!0), unoptimized: !0 })
                                                                            : (0, r.jsx)("div", { className: "flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/20 bg-gradient-to-br from-white/15 to-white/5 font-mono text-2xl font-black text-white shadow-xl ring-2 ring-white/10 sm:h-20 sm:w-20", children: (to.username[0] || "T").toUpperCase() }),
                                                                }),
                                                                (0, r.jsxs)("div", {
                                                                    className: "flex min-w-0 flex-col",
                                                                    children: [
                                                                        (0, r.jsx)("h1", { className: "text-xl font-extrabold tracking-tight text-white sm:text-2xl", children: to.name || "@".concat(to.username) }),
                                                                        (0, r.jsxs)("p", { className: "mt-0.5 font-mono text-xs font-semibold text-poke-blue", children: ["@", to.username] }),
                                                                        to.bio
                                                                            ? (0, r.jsx)("p", { className: "mt-2 max-w-md text-sm leading-relaxed text-slate-300", children: to.bio })
                                                                            : tx
                                                                              ? (0, r.jsx)(o(), { href: "/configuracoes", prefetch: !0, className: "mt-2 text-xs font-semibold text-slate-500 transition-colors hover:text-poke-blue", children: "Adicionar uma descri\xe7\xe3o ao perfil" })
                                                                              : (0, r.jsx)("p", { className: "mt-1 text-xs text-slate-400", children: "Cole\xe7\xe3o p\xfablica no MyPokeBinder" }),
                                                                    ],
                                                                }),
                                                            ],
                                                        }),
                                                        (0, r.jsxs)("div", {
                                                            className: "flex w-full flex-wrap items-center gap-2.5 sm:w-auto",
                                                            children: [
                                                                (0, r.jsxs)("button", {
                                                                    type: "button",
                                                                    onClick: e7,
                                                                    className: "flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white sm:flex-initial",
                                                                    children: [ek ? (0, r.jsx)(F.A, { size: 14, className: "text-emerald-400" }) : (0, r.jsx)(G.A, { size: 14 }), (0, r.jsx)("span", { children: ek ? "Copiado" : "Compartilhar" })],
                                                                }),
                                                                tx
                                                                    ? (0, r.jsxs)(o(), { href: "/configuracoes", prefetch: !0, className: "flex flex-1 items-center justify-center gap-2 rounded-xl border border-poke-blue/40 bg-poke-blue/15 px-4 py-2 text-xs font-semibold text-white transition-all hover:border-poke-blue/60 hover:bg-poke-blue/25 sm:flex-initial", children: [(0, r.jsx)(D.A, { size: 14 }), (0, r.jsx)("span", { children: "Configura\xe7\xf5es" })] })
                                                                    : (0, r.jsxs)(o(), { href: "/colecao/".concat(to.username), prefetch: !0, className: "flex flex-1 items-center justify-center gap-2 rounded-xl bg-poke-blue px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-poke-blue/25 transition-all hover:bg-poke-blue/90 hover:shadow-poke-blue/40 sm:flex-initial", children: [(0, r.jsx)(H.A, { size: 15 }), (0, r.jsx)("span", { children: "Ver cole\xe7\xe3o" })] }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                tg
                                                    ? (0, r.jsxs)("div", {
                                                          className: "relative z-10 border-t border-white/10 px-6 pb-6 pt-5 sm:px-8 sm:pb-8",
                                                          children: [
                                                              (0, r.jsxs)("div", {
                                                                  className: "mb-4 flex h-7 items-center justify-between gap-3",
                                                                  children: [
                                                                      (0, r.jsx)("h2", { className: "text-sm font-semibold text-slate-200", children: "Destaques" }),
                                                                      tx
                                                                          ? ez
                                                                              ? (0, r.jsxs)("div", {
                                                                                    className: "flex items-center gap-2",
                                                                                    children: [
                                                                                        (0, r.jsx)("button", {
                                                                                            type: "button",
                                                                                            onClick: () => {
                                                                                                var e;
                                                                                                (eT(null != (e = null == ef ? void 0 : ef.favoriteCardIds) ? e : []), eA(!1), eP(!1));
                                                                                            },
                                                                                            disabled: eS,
                                                                                            className: "rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-300 transition-colors hover:bg-white/10 disabled:opacity-50",
                                                                                            children: "Cancelar",
                                                                                        }),
                                                                                        (0, r.jsxs)("button", { type: "button", onClick: ti, disabled: eS, className: "inline-flex items-center gap-1 rounded-lg bg-poke-blue px-2.5 py-1 text-[11px] font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50", children: [(0, r.jsx)(F.A, { size: 12 }), (0, r.jsx)("span", { children: eS ? "Salvando..." : "Salvar" })] }),
                                                                                    ],
                                                                                })
                                                                              : (0, r.jsxs)("button", {
                                                                                    type: "button",
                                                                                    onClick: () => {
                                                                                        var e;
                                                                                        (eT(null != (e = null == ef ? void 0 : ef.favoriteCardIds) ? e : []), eA(!0));
                                                                                    },
                                                                                    className: "inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-400 transition-colors hover:border-white/20 hover:text-white",
                                                                                    children: [(0, r.jsx)(V.A, { size: 12 }), (0, r.jsx)("span", { children: "Editar" })],
                                                                                })
                                                                          : null,
                                                                  ],
                                                              }),
                                                              (0, r.jsx)(c.XU, {
                                                                  onDragOver: (e) => {
                                                                      ez && eT((t) => (0, m.Cy)(t, e));
                                                                  },
                                                                  onDragEnd: (e) => {
                                                                      ez && !e.canceled && eT((t) => (0, m.Cy)(t, e));
                                                                  },
                                                                  children: (0, r.jsx)("div", {
                                                                      className: "grid grid-cols-4 items-start gap-2.5 sm:gap-4",
                                                                      children: ez
                                                                          ? (0, r.jsxs)(r.Fragment, {
                                                                                children: [
                                                                                    eM.map((e, t) => {
                                                                                        let s = eQ.get(e);
                                                                                        return s ? (0, r.jsx)(el, { id: e, index: t, card: s, onRemove: () => tl(e), priority: 0 === t }, e) : null;
                                                                                    }),
                                                                                    Array.from({ length: Math.max(0, 4 - eM.length) }).map((e, t) => (0, r.jsx)(ea, { editing: !0, onAdd: e8 }, "empty-".concat(t))),
                                                                                ],
                                                                            })
                                                                          : [0, 1, 2, 3].map((e) => {
                                                                                let t = e$[e],
                                                                                    s = (0, O.O)(e, { stepMs: 55, maxDelayMs: 220 });
                                                                                return t
                                                                                    ? (0, r.jsx)("div", { className: s.className, style: s.style, children: (0, r.jsx)(er, { card: t, onMaximize: e6, priority: 0 === e }) }, t.id)
                                                                                    : tx
                                                                                      ? (0, r.jsx)("div", { className: s.className, style: s.style, children: (0, r.jsx)(ea, { editing: !1, onAdd: ta }) }, "empty-".concat(e))
                                                                                      : (0, r.jsx)("div", { className: s.className, style: s.style, children: (0, r.jsx)(es, { children: (0, r.jsx)("div", { className: "h-full w-full", "aria-hidden": !0 }) }) }, "pad-".concat(e));
                                                                            }),
                                                                  }),
                                                              }),
                                                          ],
                                                      })
                                                    : null,
                                            ],
                                        }),
                                        tb
                                            ? (0, r.jsxs)("section", {
                                                  className: "profile-enter profile-enter-d1 flex flex-col gap-5 rounded-3xl border border-white/10 bg-gradient-to-b from-[#161a26]/90 via-[#10131d]/90 to-[#0c0e15]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8",
                                                  children: [
                                                      (0, r.jsxs)("div", {
                                                          className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
                                                          children: [
                                                              (0, r.jsxs)("div", {
                                                                  className: "flex items-center gap-3",
                                                                  children: [
                                                                      (0, r.jsx)("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 shadow-md", style: { backgroundColor: th.primaryColor }, children: (0, r.jsx)(B.A, { size: 22, className: "text-white" }) }),
                                                                      (0, r.jsxs)("div", {
                                                                          children: [
                                                                              (0, r.jsxs)("div", {
                                                                                  className: "flex flex-wrap items-center gap-2",
                                                                                  children: [
                                                                                      (0, r.jsxs)("span", { className: "flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-400/15 px-2.5 py-0.5 text-[11px] font-bold text-amber-300", children: [(0, r.jsx)(W.A, { size: 12, className: "fill-amber-300 text-amber-300" }), (0, r.jsx)("span", { children: "Binder em Destaque" })] }),
                                                                                      tx &&
                                                                                          (0, r.jsxs)("button", {
                                                                                              type: "button",
                                                                                              onClick: () => tr(tb.id, !tb.is_public),
                                                                                              disabled: te === tb.id,
                                                                                              className: "flex cursor-pointer items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition-all ".concat(tb.is_public ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25" : "border-slate-500/40 bg-slate-500/15 text-slate-300 hover:bg-slate-500/25"),
                                                                                              children: [tb.is_public ? (0, r.jsx)(J.A, { size: 11 }) : (0, r.jsx)(U.A, { size: 11 }), (0, r.jsx)("span", { children: tb.is_public ? "P\xfablico" : "Privado" })],
                                                                                          }),
                                                                                  ],
                                                                              }),
                                                                              (0, r.jsx)("h2", { className: "mt-1 text-xl font-black tracking-tight text-white sm:text-2xl", children: tb.name }),
                                                                              tb.description && (0, r.jsx)("p", { className: "mt-0.5 text-xs text-slate-400", children: tb.description }),
                                                                          ],
                                                                      }),
                                                                  ],
                                                              }),
                                                              (0, r.jsxs)("div", {
                                                                  className: "flex items-center gap-2.5",
                                                                  children: [
                                                                      tx && (0, r.jsxs)(o(), { href: "/binders/".concat(tb.id, "/edit"), className: "flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white", children: [(0, r.jsx)(V.A, { size: 13 }), (0, r.jsx)("span", { children: "Editar" })] }),
                                                                      (0, r.jsxs)(o(), { href: "/binders/".concat(tb.id), className: "flex items-center gap-1.5 rounded-xl bg-poke-blue px-4 py-2 text-xs font-bold text-white shadow-lg shadow-poke-blue/25 transition-all hover:bg-poke-blue/90", children: [(0, r.jsx)(B.A, { size: 14 }), (0, r.jsx)("span", { children: "Abrir no Binder" })] }),
                                                                  ],
                                                              }),
                                                          ],
                                                      }),
                                                      (0, r.jsxs)("div", {
                                                          className: "grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4",
                                                          children: [
                                                              (0, r.jsxs)("div", { className: "rounded-2xl border border-white/10 bg-[#12151d]/90 p-4", children: [(0, r.jsx)("span", { className: "text-[11px] font-semibold text-slate-400", children: "Formato" }), (0, r.jsxs)("p", { className: "mt-1 font-mono text-lg font-black text-white", children: ["Grade ", tb.grid_type] })] }),
                                                              (0, r.jsxs)("div", { className: "rounded-2xl border border-white/10 bg-[#12151d]/90 p-4", children: [(0, r.jsx)("span", { className: "text-[11px] font-semibold text-slate-400", children: "P\xe1ginas" }), (0, r.jsxs)("p", { className: "mt-1 font-mono text-lg font-black text-white", children: [tb.total_pages, " ", 1 === tb.total_pages ? "p\xe1gina" : "p\xe1ginas"] })] }),
                                                              (0, r.jsxs)("div", {
                                                                  className: "rounded-2xl border border-white/10 bg-[#12151d]/90 p-4",
                                                                  children: [(0, r.jsx)("span", { className: "text-[11px] font-semibold text-slate-400", children: "Preenchimento" }), (0, r.jsxs)("p", { className: "mt-1 font-mono text-lg font-black text-white", children: [null != (ec = tb.total_cards) ? ec : 0, " ", (0, r.jsxs)("span", { className: "text-xs font-normal text-slate-500", children: ["/ ", null != (ex = tb.total_slots) ? ex : 0] })] })],
                                                              }),
                                                              (0, r.jsxs)("div", {
                                                                  className: "rounded-2xl border border-white/10 bg-[#12151d]/90 p-4",
                                                                  children: [
                                                                      (0, r.jsxs)("div", { className: "flex items-center justify-between", children: [(0, r.jsx)("span", { className: "text-[11px] font-semibold text-slate-400", children: "Progresso" }), (0, r.jsxs)("span", { className: "font-mono text-xs font-bold text-poke-blue", children: [null != (em = tb.completion_percentage) ? em : 0, "%"] })] }),
                                                                      (0, r.jsx)("div", { className: "mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10", children: (0, r.jsx)("div", { className: "h-full rounded-full bg-poke-blue transition-all duration-500", style: { width: "".concat(null != (eb = tb.completion_percentage) ? eb : 0, "%") } }) }),
                                                                  ],
                                                              }),
                                                          ],
                                                      }),
                                                      (0, r.jsx)(eo, {
                                                          binder: tb,
                                                          slots: tp,
                                                          onCardClick: (e) => {
                                                              e6((0, w.HO)(e.card_image_url), e.card_name, (0, k.WE)(e.card_variant, e.card_rarity, e.card_image_url, e.card_name), (0, C.Mr)(e.card_types, e.pokemon_dex_id));
                                                          },
                                                      }),
                                                  ],
                                              })
                                            : tx
                                              ? (0, r.jsxs)("section", {
                                                    className: "profile-enter profile-enter-d1 flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center",
                                                    children: [
                                                        (0, r.jsx)(B.A, { size: 32, className: "text-slate-500" }),
                                                        (0, r.jsxs)("div", { children: [(0, r.jsx)("h3", { className: "text-base font-bold text-white", children: "Nenhum binder criado ainda" }), (0, r.jsx)("p", { className: "mt-1 text-xs text-slate-400", children: "Crie seu primeiro binder com capas tem\xe1ticas e grades personalizadas para destac\xe1-lo aqui." })] }),
                                                        (0, r.jsxs)(o(), { href: "/binders/new", className: "mt-2 inline-flex items-center gap-2 rounded-xl bg-poke-blue px-4 py-2 text-xs font-bold text-white shadow-md shadow-poke-blue/20 hover:opacity-90", children: [(0, r.jsx)(q.A, { size: 15 }), (0, r.jsx)("span", { children: "Criar Primeiro Binder" })] }),
                                                    ],
                                                })
                                              : null,
                                        (0, r.jsxs)("section", {
                                            className: "profile-enter profile-enter-d2 flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#12151d]/90 p-5 shadow-xl backdrop-blur-md sm:p-6",
                                            children: [
                                                (0, r.jsxs)("div", {
                                                    className: "flex flex-wrap items-center justify-between gap-3",
                                                    children: [
                                                        (0, r.jsxs)("div", { children: [(0, r.jsx)("h2", { className: "text-base font-bold text-white sm:text-lg", children: tx ? "Outros Binders" : "Vitrine de Binders" }), (0, r.jsx)("p", { className: "text-xs text-slate-400", children: tx ? "Gerencie a visibilidade p\xfablica e defina qual binder \xe9 o destaque principal." : "Outros binders p\xfablicos organizados por este treinador." })] }),
                                                        tx && (0, r.jsxs)(o(), { href: "/binders/new", className: "flex items-center gap-1.5 rounded-xl border border-poke-blue/40 bg-poke-blue/15 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:border-poke-blue/60 hover:bg-poke-blue/25", children: [(0, r.jsx)(q.A, { size: 14 }), (0, r.jsx)("span", { children: "Novo Binder" })] }),
                                                    ],
                                                }),
                                                0 === tu.length
                                                    ? (0, r.jsxs)("div", { className: "flex flex-col items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/[0.015] py-8 text-center text-xs text-slate-500", children: [(0, r.jsx)(B.A, { size: 24, className: "opacity-40" }), (0, r.jsx)("span", { children: tx ? "Voc\xea n\xe3o possui outros binders al\xe9m do destaque." : "Nenhum outro binder p\xfablico dispon\xedvel." })] })
                                                    : (0, r.jsx)("div", {
                                                          className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
                                                          children: tu.map((e) => {
                                                              var t, s, l, a;
                                                              let i = (0, y.v)(e.cover_theme);
                                                              return (0, r.jsxs)(
                                                                  "div",
                                                                  {
                                                                      className: "group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0d1017] transition-all hover:border-white/20 hover:shadow-xl",
                                                                      children: [
                                                                          (0, r.jsx)("div", { className: "h-3 w-full", style: { backgroundColor: i.primaryColor } }),
                                                                          (0, r.jsxs)("div", {
                                                                              className: "flex flex-1 flex-col gap-3 p-4",
                                                                              children: [
                                                                                  (0, r.jsxs)("div", {
                                                                                      className: "flex items-start justify-between gap-2",
                                                                                      children: [
                                                                                          (0, r.jsxs)("div", { children: [(0, r.jsx)("h3", { className: "font-bold text-white group-hover:text-poke-blue transition-colors", children: e.name }), e.description && (0, r.jsx)("p", { className: "mt-0.5 line-clamp-2 text-[11px] text-slate-400", children: e.description })] }),
                                                                                          tx &&
                                                                                              (0, r.jsx)("button", {
                                                                                                  type: "button",
                                                                                                  onClick: () => tr(e.id, !e.is_public),
                                                                                                  disabled: te === e.id,
                                                                                                  title: e.is_public ? "Tornar privado" : "Tornar p\xfablico",
                                                                                                  className: "shrink-0 rounded-lg border p-1.5 transition-colors ".concat(e.is_public ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25" : "border-slate-500/40 bg-slate-500/15 text-slate-400 hover:bg-slate-500/25"),
                                                                                                  children: e.is_public ? (0, r.jsx)(J.A, { size: 13 }) : (0, r.jsx)(U.A, { size: 13 }),
                                                                                              }),
                                                                                      ],
                                                                                  }),
                                                                                  (0, r.jsxs)("div", {
                                                                                      className: "flex flex-wrap items-center gap-1.5 text-[10px]",
                                                                                      children: [
                                                                                          (0, r.jsxs)("span", { className: "rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-medium text-slate-300", children: ["Grade ", e.grid_type] }),
                                                                                          (0, r.jsxs)("span", { className: "rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-medium text-slate-300", children: [e.total_pages, " ", 1 === e.total_pages ? "p\xe1g" : "p\xe1gs"] }),
                                                                                          (0, r.jsxs)("span", { className: "rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-medium text-slate-400", children: [null != (t = e.total_cards) ? t : 0, "/", null != (s = e.total_slots) ? s : 0, " cartas"] }),
                                                                                      ],
                                                                                  }),
                                                                                  (0, r.jsxs)("div", {
                                                                                      children: [
                                                                                          (0, r.jsxs)("div", { className: "flex items-center justify-between text-[11px]", children: [(0, r.jsx)("span", { className: "text-slate-400", children: "Preenchimento" }), (0, r.jsxs)("span", { className: "font-mono font-bold text-poke-blue", children: [null != (l = e.completion_percentage) ? l : 0, "%"] })] }),
                                                                                          (0, r.jsx)("div", { className: "mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10", children: (0, r.jsx)("div", { className: "h-full rounded-full bg-poke-blue transition-all duration-300", style: { width: "".concat(null != (a = e.completion_percentage) ? a : 0, "%") } }) }),
                                                                                      ],
                                                                                  }),
                                                                              ],
                                                                          }),
                                                                          (0, r.jsxs)("div", {
                                                                              className: "flex items-center justify-between border-t border-white/5 bg-white/[0.02] p-3",
                                                                              children: [
                                                                                  tx ? (0, r.jsxs)("button", { type: "button", onClick: () => ts(e.id), disabled: te === e.id, className: "flex cursor-pointer items-center gap-1 text-[11px] font-semibold text-amber-300/80 transition-colors hover:text-amber-300", children: [(0, r.jsx)(W.A, { size: 13 }), (0, r.jsx)("span", { children: "Tornar Destaque" })] }) : (0, r.jsx)("span", {}),
                                                                                  (0, r.jsxs)("div", {
                                                                                      className: "flex items-center gap-2",
                                                                                      children: [
                                                                                          tx && (0, r.jsx)(o(), { href: "/binders/".concat(e.id, "/edit"), className: "rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-400 hover:text-white transition-colors", title: "Editar Binder", children: (0, r.jsx)(V.A, { size: 13 }) }),
                                                                                          (0, r.jsxs)(o(), { href: "/binders/".concat(e.id), className: "flex items-center gap-1 rounded-lg bg-poke-blue px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-poke-blue/90", children: [(0, r.jsx)("span", { children: "Abrir" }), (0, r.jsx)(X.A, { size: 12 })] }),
                                                                                      ],
                                                                                  }),
                                                                              ],
                                                                          }),
                                                                      ],
                                                                  },
                                                                  e.id,
                                                              );
                                                          }),
                                                      }),
                                            ],
                                        }),
                                        tc.length > 0 &&
                                            (0, r.jsxs)("section", {
                                                className: "profile-enter profile-enter-d3 rounded-2xl border border-white/10 bg-[#12151d]/90 p-5 shadow-xl backdrop-blur-md sm:p-6",
                                                children: [
                                                    (0, r.jsxs)("div", { className: "mb-4", children: [(0, r.jsx)("h3", { className: "text-base font-bold text-white", children: "Distribui\xe7\xe3o por raridades" }), (0, r.jsx)("p", { className: "text-xs text-slate-400", children: "Nomes oficiais das raridades (Pok\xe9mon Estampas Ilustradas)" })] }),
                                                    (0, r.jsx)("ul", {
                                                        className: "divide-y divide-white/10",
                                                        children: tc.map((e) => {
                                                            let t = (0, _._I)(e.label),
                                                                s = Math.max(4, Math.round((e.count / tf) * 100));
                                                            return (0, r.jsxs)(
                                                                "li",
                                                                {
                                                                    className: "flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:gap-4",
                                                                    children: [
                                                                        (0, r.jsx)("div", { className: "flex w-full items-center justify-between gap-2 sm:w-44 sm:shrink-0 sm:justify-start", children: (0, r.jsx)("span", { className: "rounded border px-1.5 py-0.5 text-[10px] font-bold ".concat(t.badgeClasses), children: t.label }) }),
                                                                        (0, r.jsx)("div", { className: "min-w-0 flex-1", children: (0, r.jsx)("div", { className: "h-2 w-full overflow-hidden rounded-full bg-white/10", children: (0, r.jsx)("div", { className: "h-full rounded-full bg-poke-blue transition-all duration-500", style: { width: "".concat(s, "%") } }) }) }),
                                                                        (0, r.jsx)("span", { className: "shrink-0 font-mono text-sm font-bold text-white sm:w-10 sm:text-right", children: e.count }),
                                                                    ],
                                                                },
                                                                e.label,
                                                            );
                                                        }),
                                                    }),
                                                ],
                                            }),
                                    ],
                                },
                                eh,
                            ),
                        }),
                        eD
                            ? (0, r.jsx)("div", {
                                  className: "modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-sm",
                                  "data-overlay-state": eV,
                                  role: "dialog",
                                  "aria-modal": "true",
                                  "aria-label": "Selecionar cartas em destaque",
                                  onClick: (e) => {
                                      e.target !== e.currentTarget || eS || eP(!1);
                                  },
                                  children: (0, r.jsxs)("div", {
                                      className: "modal-surface flex h-dvh max-h-none w-full max-w-none flex-col overflow-hidden rounded-none border-0 bg-[#12151d] shadow-2xl sm:h-[85vh] sm:max-h-[820px] sm:max-w-3xl sm:rounded-2xl sm:border sm:border-white/10",
                                      children: [
                                          (0, r.jsxs)("div", {
                                              className: "flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4",
                                              children: [
                                                  (0, r.jsxs)("div", { children: [(0, r.jsx)("h3", { className: "text-base font-bold text-white", children: "Escolher cartas em destaque" }), (0, r.jsxs)("p", { className: "text-xs text-slate-400", children: ["Toque para selecionar ou remover \xb7 ", eM.length, "/4"] })] }),
                                                  (0, r.jsx)("button", { type: "button", onClick: () => eP(!1), className: "rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10", children: "Pronto" }),
                                              ],
                                          }),
                                          (0, r.jsxs)("div", {
                                              className: "flex shrink-0 flex-col gap-2.5 border-b border-white/10 px-4 py-3",
                                              children: [
                                                  (0, r.jsxs)("div", {
                                                      className: "relative w-full",
                                                      children: [
                                                          (0, r.jsx)(K.A, { size: 15, className: "absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" }),
                                                          (0, r.jsx)(j.D, { type: "text", value: eL, onChange: (e) => eR(e.target.value), placeholder: "Buscar por pok\xe9mon, n\xfamero, cole\xe7\xe3o ou pok\xe9dex...", placeholderClassName: "left-9 right-9", className: "w-full h-9 sm:h-10 rounded-xl border border-white/10 bg-white/5 py-2 sm:py-2.5 pr-9 pl-9 text-xs sm:text-sm text-white transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none" }),
                                                          eL ? (0, r.jsx)("button", { type: "button", onClick: () => eR(""), "aria-label": "Limpar busca", className: "absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-500 hover:text-white", children: (0, r.jsx)(I.A, { size: 14 }) }) : null,
                                                      ],
                                                  }),
                                                  (0, r.jsxs)("div", {
                                                      className: "grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2",
                                                      children: [
                                                          (0, r.jsx)(v.l, { value: eI, onChange: eq, options: $, icon: (0, r.jsx)(B.A, { size: 13 }), ariaLabel: "Filtrar por status no binder", size: "sm", className: "min-w-0 w-full" }),
                                                          (0, r.jsx)(v.l, { value: eB, onChange: eF, options: ee, icon: (0, r.jsx)(J.A, { size: 13 }), ariaLabel: "Filtrar por idioma", size: "sm", className: "min-w-0 w-full" }),
                                                          (0, r.jsx)(v.l, { value: eG, onChange: eH, options: _.OI, icon: (0, r.jsx)(Y.A, { size: 13 }), ariaLabel: "Filtrar por raridade", size: "sm", className: "min-w-0 w-full" }),
                                                          (0, r.jsx)(v.l, { value: eW, onChange: eJ, options: e0, icon: (0, r.jsx)(Z.A, { size: 13 }), ariaLabel: "Filtrar por ilustrador", size: "sm", className: "min-w-0 w-full" }),
                                                      ],
                                                  }),
                                              ],
                                          }),
                                          (0, r.jsx)("div", {
                                              ref: eY,
                                              className: "min-h-0 flex-1 overflow-y-auto p-4",
                                              children:
                                                  0 === eN.length
                                                      ? (0, r.jsxs)("div", { className: "flex h-full flex-col items-center justify-center gap-2 py-12 text-center", children: [(0, r.jsx)(Q.A, { size: 28, className: "text-slate-600" }), (0, r.jsx)("p", { className: "text-sm text-slate-400", children: "Nenhuma carta na cole\xe7\xe3o ainda." }), (0, r.jsx)(o(), { href: "/collection", prefetch: !0, className: "mt-2 text-xs font-semibold text-poke-blue", children: "Ir para a Cole\xe7\xe3o" })] })
                                                      : 0 === e1.length
                                                        ? (0, r.jsxs)("div", {
                                                              className: "flex h-full flex-col items-center justify-center gap-2 py-12 text-center",
                                                              children: [
                                                                  (0, r.jsx)(K.A, { size: 26, className: "text-slate-600" }),
                                                                  (0, r.jsx)("p", { className: "text-sm font-semibold text-white", children: "Nenhuma carta encontrada" }),
                                                                  (0, r.jsx)("p", { className: "text-xs text-slate-400", children: "Tente ajustar a busca ou os filtros." }),
                                                                  (0, r.jsx)("button", {
                                                                      type: "button",
                                                                      onClick: () => {
                                                                          (eR(""), eq("all"), eF("all"), eH("all"), eJ(A.ej));
                                                                      },
                                                                      className: "mt-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10",
                                                                      children: "Limpar filtros",
                                                                  }),
                                                              ],
                                                          })
                                                        : (0, r.jsxs)("div", {
                                                              className: "flex flex-col gap-3",
                                                              children: [
                                                                  (0, r.jsx)("div", {
                                                                      className: "grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5",
                                                                      children: e5.map((e) => {
                                                                          let t = eM.includes(e.id);
                                                                          return (0, r.jsxs)(
                                                                              "button",
                                                                              {
                                                                                  type: "button",
                                                                                  onClick: () => tl(e.id),
                                                                                  className: "relative flex flex-col rounded-xl border p-1.5 text-left transition-all active:scale-[0.98] ".concat(t ? "border-poke-blue bg-poke-blue/10 ring-1 ring-poke-blue/40" : "border-white/10 bg-white/[0.03] hover:border-white/25"),
                                                                                  children: [
                                                                                      (0, r.jsx)("span", { className: "absolute right-1.5 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full border shadow-md transition-colors ".concat(t ? "border-emerald-400/60 bg-emerald-500 text-white shadow-emerald-500/25" : "border-white/20 bg-black/70 text-slate-400"), children: t ? (0, r.jsx)(F.A, { size: 13, strokeWidth: 3 }) : (0, r.jsx)(q.A, { size: 13, strokeWidth: 2.5 }) }),
                                                                                      (0, r.jsx)("div", { className: "relative aspect-[8/11] w-full", children: (0, r.jsx)(u.MH, { src: (0, w.HO)(e.card_image_url), alt: e.card_name, sizes: "100px", className: "object-contain" }) }),
                                                                                      (0, r.jsxs)("div", { className: "mt-1 flex items-center justify-between gap-1 w-full", children: [(0, r.jsx)("span", { className: "truncate text-[9px] font-semibold text-white", children: e.card_name }), e.card_condition && (0, r.jsx)(z.J, { condition: e.card_condition, size: "xs" })] }),
                                                                                  ],
                                                                              },
                                                                              e.id,
                                                                          );
                                                                      }),
                                                                  }),
                                                                  (0, r.jsx)("div", { ref: e3, className: "flex min-h-8 items-center justify-center", "aria-hidden": !e2 }),
                                                              ],
                                                          }),
                                          }),
                                      ],
                                  }),
                              })
                            : null,
                        (0, r.jsx)(f.O, { src: null != (ep = null == eU ? void 0 : eU.src) ? ep : null, alt: null == eU ? void 0 : eU.alt, shineMode: null == eU ? void 0 : eU.shineMode, elementTypes: null == eU ? void 0 : eU.elementTypes, onClose: e9 }),
                    ],
                });
            }
        },
        3263: (e, t, s) => {
            "use strict";
            s.d(t, { v: () => l, wZ: () => r });
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
        4989: (e, t, s) => {
            (Promise.resolve().then(s.bind(s, 7667)), Promise.resolve().then(s.bind(s, 3255)));
        },
    },
    (e) => {
        (e.O(0, [5730, 235, 2619, 5239, 8720, 4102, 9605, 5410, 1013, 6937, 148, 2006, 5246, 9884, 8441, 1255, 7358], () => e((e.s = 4989))), (_N_E = e.O()));
    },
]);
