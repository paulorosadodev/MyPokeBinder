(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [2872],
    {
        1339: (e, t, a) => {
            Promise.resolve().then(a.bind(a, 1550));
        },
        1360: (e, t, a) => {
            "use strict";
            a.d(t, { A: () => r });
            let r = (0, a(1847).A)("Trash2", [
                ["path", { d: "M3 6h18", key: "d0wm0j" }],
                ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
                ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
                ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
                ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
            ]);
        },
        1550: (e, t, a) => {
            "use strict";
            (a.r(t), a.d(t, { default: () => W }));
            var r = a(5155),
                s = a(2115),
                l = a(63),
                i = a(4303),
                n = a(2523),
                o = a(148),
                d = a(2671),
                c = a(4067),
                u = a(4133),
                x = a(7152),
                p = a(8696),
                f = a(6245),
                m = a(4059),
                h = a(6151),
                b = a(1978),
                g = a(4833),
                y = a(113),
                v = a(8720),
                j = a(5626),
                w = a(6132),
                _ = a(6651),
                k = a(9926),
                N = a(5740),
                C = a(9559),
                E = a(9051),
                z = a(7937),
                A = a(5299),
                L = a(1847);
            let M = (0, L.A)("Minus", [["path", { d: "M5 12h14", key: "1ays0h" }]]);
            var S = a(6191),
                P = a(9397);
            let R = (0, L.A)("Calendar", [
                ["path", { d: "M8 2v4", key: "1cmpym" }],
                ["path", { d: "M16 2v4", key: "4m81vk" }],
                ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
                ["path", { d: "M3 10h18", key: "8toen8" }],
            ]);
            var T = a(1360),
                I = a(6092),
                F = a(7997);
            let O = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
            function W(e) {
                let { params: t } = e,
                    a = (0, s.use)(t).id,
                    L = (0, l.useRouter)(),
                    W = (0, l.useSearchParams)(),
                    B = W.get("from"),
                    D = W.get("spread"),
                    V = W.get("dexId"),
                    q = W.get("binderId"),
                    H = W.get("slotId"),
                    { card: J, copies: U, isLoading: G, isError: K, mutate: $, allocation: Q } = (0, x.sz)(a),
                    { mutate: Y, cache: Z } = (0, p.iX)(),
                    X = (e) => {
                        let t = new Map();
                        for (let r of Z.keys()) {
                            var a;
                            if (!(0, g.ZK)(r)) continue;
                            let s = null == (a = Z.get(r)) ? void 0 : a.data;
                            s && (t.set(r, s), Y(r, (0, g.m$)(r, s, e), !1));
                        }
                        return () => {
                            for (let [e, a] of t) Y(e, a, !1);
                        };
                    },
                    [ee, et] = (0, s.useState)(!1),
                    [ea, er] = (0, s.useState)(null),
                    [es, el] = (0, s.useState)(null),
                    [ei, en] = (0, s.useState)(null),
                    [eo, ed] = (0, s.useState)(null),
                    [ec, eu] = (0, s.useState)(null),
                    [ex, ep] = (0, s.useState)(null),
                    [ef, em] = (0, s.useState)(!1),
                    [eh, eb] = (0, s.useState)(null),
                    [eg, ey] = (0, s.useState)(!1),
                    [ev, ej] = (0, s.useState)(!1),
                    [ew, e_] = (0, s.useState)(!1),
                    [ek, eN] = (0, s.useState)(!1);
                (0, I.m)(eg, () => ey(!1), ev);
                let { isPresent: eC, state: eE } = (0, F.v)(eg);
                ((0, s.useEffect)(() => {
                    eN(!1);
                }, [null == J ? void 0 : J.id]),
                    (0, s.useEffect)(() => {
                        el(null);
                    }, [null == J ? void 0 : J.card_language]),
                    (0, s.useEffect)(() => {
                        ed(null);
                    }, [null == J ? void 0 : J.card_variant]),
                    (0, s.useEffect)(() => {
                        ep(null);
                    }, [null == J ? void 0 : J.card_condition]));
                let ez = () => {
                        var e, t, a;
                        let r = null != (e = null == Q ? void 0 : Q.binder_id) ? e : q,
                            s = null != (t = null == Q ? void 0 : Q.slot_id) ? t : H,
                            l = null != (a = null == Q ? void 0 : Q.page_number) ? a : Number(W.get("page"));
                        if (r && s && O.test(r) && O.test(s)) {
                            let e = new URLSearchParams({ openSlot: s });
                            return (Number.isInteger(l) && l > 0 && e.set("page", String(l)), L.push("/binders/".concat(r, "?").concat(e.toString())), !0);
                        }
                        return !1;
                    },
                    eA = async (e) => {
                        if (!J || (null != es ? es : J.card_language) === e || null !== ea) return;
                        (el(e), er(e));
                        let t = J.pokemon_dex_id,
                            a = null != t ? "/api/cards?pokemon_dex_id=".concat(t) : "/api/cards",
                            r = X({ updatedCards: [{ ...J, card_language: e }] });
                        try {
                            (eb(null), J.is_in_binder && Y("/api/binder", (t) => (t ? { ...t, cards: t.cards.map((t) => (t.id === J.id ? { ...t, card_language: e } : t)) } : t), !1), Y(a, (t) => (t ? { cards: t.cards.map((t) => (t.id === J.id ? { ...t, card_language: e } : t)) } : t), !1));
                            let t = await fetch("/api/cards/".concat(J.id), { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ card_language: e }) }),
                                r = await t.json();
                            if (!t.ok) throw Error(r.error || "Erro ao atualizar idioma");
                            (X({ updatedCards: [r.card] }), $(), v.oR.success("Idioma atualizado", { description: "Idioma alterado para ".concat({ "pt-br": "Portugu\xeas", en: "Ingl\xeas", ja: "Japon\xeas" }[e] || e.toUpperCase(), ".") }));
                        } catch (t) {
                            (r(), el(null), $(), J.is_in_binder && Y("/api/binder"), Y(a));
                            let e = t instanceof Error ? t.message : "Erro ao atualizar idioma";
                            (eb(e), v.oR.error("Erro ao atualizar idioma", { description: e }));
                        } finally {
                            er(null);
                        }
                    },
                    eL = async (e) => {
                        let t = null != eo ? eo : (0, m.eY)(null == J ? void 0 : J.card_variant) ? J.card_variant : "normal";
                        if (!J || t === e || null !== ei) return;
                        (ed(e), en(e));
                        let a = J.pokemon_dex_id,
                            r = null != a ? "/api/cards?pokemon_dex_id=".concat(a) : "/api/cards",
                            s = X({ updatedCards: [{ ...J, card_variant: e }] });
                        try {
                            (eb(null), J.is_in_binder && Y("/api/binder", (t) => (t ? { ...t, cards: t.cards.map((t) => (t.id === J.id ? { ...t, card_variant: e } : t)) } : t), !1), Y(r, (t) => (t ? { cards: t.cards.map((t) => (t.id === J.id ? { ...t, card_variant: e } : t)) } : t), !1));
                            let t = await fetch("/api/cards/".concat(J.id), { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ card_variant: e }) }),
                                a = await t.json();
                            if (!t.ok) throw Error(a.error || "Erro ao atualizar vers\xe3o");
                            (X({ updatedCards: [a.card] }), $(), v.oR.success("Vers\xe3o atualizada", { description: "Vers\xe3o alterada para ".concat((0, m.FB)(e), ".") }));
                        } catch (t) {
                            (s(), ed(null), $(), J.is_in_binder && Y("/api/binder"), Y(r));
                            let e = t instanceof Error ? t.message : "Erro ao atualizar vers\xe3o";
                            (eb(e), v.oR.error("Erro ao atualizar vers\xe3o", { description: e }));
                        } finally {
                            en(null);
                        }
                    },
                    eM = async (e) => {
                        let t = null != ex ? ex : (0, h.C6)(null == J ? void 0 : J.card_condition) ? J.card_condition : "NM";
                        if (!J || t === e || null !== ec) return;
                        (ep(e), eu(e));
                        let a = J.pokemon_dex_id,
                            r = null != a ? "/api/cards?pokemon_dex_id=".concat(a) : "/api/cards",
                            s = X({ updatedCards: [{ ...J, card_condition: e }] });
                        try {
                            (eb(null), J.is_in_binder && Y("/api/binder", (t) => (t ? { ...t, cards: t.cards.map((t) => (t.id === J.id ? { ...t, card_condition: e } : t)) } : t), !1), Y(r, (t) => (t ? { cards: t.cards.map((t) => (t.id === J.id ? { ...t, card_condition: e } : t)) } : t), !1));
                            let t = await fetch("/api/cards/".concat(J.id), { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ card_condition: e }) }),
                                a = await t.json();
                            if (!t.ok) throw Error(a.error || "Erro ao atualizar estado");
                            (X({ updatedCards: [a.card] }), $(), v.oR.success("Estado atualizado", { description: "Estado alterado para ".concat((0, h.P2)(e), ".") }));
                        } catch (t) {
                            (s(), ep(null), $(), J.is_in_binder && Y("/api/binder"), Y(r));
                            let e = t instanceof Error ? t.message : "Erro ao atualizar estado";
                            (eb(e), v.oR.error("Erro ao atualizar estado", { description: e }));
                        } finally {
                            eu(null);
                        }
                    },
                    eS = async () => {
                        if (Q && !ee) {
                            (et(!0), eb(null));
                            try {
                                let e = await fetch("/api/binders/".concat(Q.binder_id, "/slots/").concat(Q.slot_id, "/assign"), { method: "DELETE" });
                                if (!e.ok) {
                                    let t = await e.json();
                                    throw Error(t.error || "Erro ao remover carta do binder");
                                }
                                (v.oR.success("Carta removida do binder!", { description: "".concat(null == J ? void 0 : J.card_name, " foi guardada de volta na sua cole\xe7\xe3o.") }), $(), Y((e) => "string" == typeof e && (e.startsWith("/api/binder") || e.startsWith("/api/cards"))));
                            } catch (t) {
                                let e = t instanceof Error ? t.message : "Erro ao remover carta";
                                (eb(e), v.oR.error(e));
                            } finally {
                                et(!1);
                            }
                        }
                    },
                    eP = async () => {
                        if (!J || ef) return;
                        let e = J.pokemon_dex_id,
                            t = null != e ? "/api/cards?pokemon_dex_id=".concat(e) : "/api/cards";
                        try {
                            (em(!0),
                                eb(null),
                                Y(
                                    "/api/binder",
                                    (t) => {
                                        var a;
                                        if (!t) return t;
                                        let r = null != (a = t.availableCounts) ? a : {},
                                            s = (null != e && r[e]) || 0;
                                        return { ...t, availableCounts: null != e ? { ...r, [e]: s + 1 } : r };
                                    },
                                    !1,
                                ));
                            let a = await fetch("/api/cards", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ tcgdex_card_id: J.tcgdex_card_id, pokemon_dex_id: J.pokemon_dex_id, card_name: J.card_name, card_image_url: J.card_image_url, card_set_name: J.card_set_name, card_rarity: J.card_rarity, card_artist: J.card_artist || "", card_condition: J.card_condition || "NM", card_types: J.card_types, card_language: J.card_language, card_variant: J.card_variant || "normal", is_in_binder: !1 }),
                                }),
                                r = await a.json();
                            if (!a.ok) throw Error(r.error || "Erro ao adicionar c\xf3pia id\xeantica");
                            (X({ addedCards: [r.card] }), $(), Y("/api/binder"), Y(t), Y("/api/dashboard"), v.oR.success("C\xf3pia adicionada!", { description: "Mais um exemplar de ".concat(J.card_name, " adicionado \xe0 cole\xe7\xe3o.") }));
                        } catch (a) {
                            ($(), Y("/api/binder"), Y(t));
                            let e = a instanceof Error ? a.message : "Erro ao adicionar c\xf3pia";
                            (eb(e), v.oR.error("Erro ao adicionar c\xf3pia", { description: e }));
                        } finally {
                            em(!1);
                        }
                    },
                    eR = async () => {
                        if (!J || U.length <= 1 || ef) return;
                        let e = U.find((e) => !e.is_in_binder && e.id !== J.id) || U.find((e) => e.id !== J.id) || J,
                            t = J.pokemon_dex_id,
                            a = null != t ? "/api/cards?pokemon_dex_id=".concat(t) : "/api/cards",
                            r = !!e.is_in_binder,
                            s = X({ deletedCardIds: [e.id] });
                        try {
                            (em(!0),
                                eb(null),
                                Y(
                                    "/api/binder",
                                    (a) => {
                                        var s;
                                        if (!a) return a;
                                        let l = null != (s = a.availableCounts) ? s : {},
                                            i = (null != t && l[t]) || 0;
                                        return { cards: r ? a.cards.filter((t) => t.id !== e.id) : a.cards, availableCounts: null != t ? { ...l, [t]: r ? i : Math.max(0, i - 1) } : l };
                                    },
                                    !1,
                                ),
                                Y(a, (t) => (t ? { cards: t.cards.filter((t) => t.id !== e.id) } : t), !1),
                                Y("/api/cards", (t) => (t ? { cards: t.cards.filter((t) => t.id !== e.id) } : t), !1));
                            let s = await fetch("/api/cards/".concat(e.id), { method: "DELETE" }),
                                l = await s.json();
                            if (!s.ok) throw Error(l.error || "Erro ao remover c\xf3pia");
                            if ((v.oR.success("C\xf3pia removida", { description: "Um exemplar de ".concat(J.card_name, " foi removido da cole\xe7\xe3o.") }), X({ deletedCardIds: [e.id] }), Y("/api/binder"), Y(a), Y("/api/dashboard"), e.id === J.id)) {
                                let e = U.filter((e) => e.id !== J.id);
                                if (e.length > 0)
                                    return void L.replace(
                                        "/cards/"
                                            .concat(e[0].id, "?from=")
                                            .concat(B || "collection")
                                            .concat(V ? "&dexId=".concat(V) : ""),
                                    );
                            }
                            $();
                        } catch (t) {
                            (s(), $(), Y("/api/binder"), Y(a));
                            let e = t instanceof Error ? t.message : "Erro ao remover c\xf3pia";
                            (eb(e), v.oR.error("Erro ao remover c\xf3pia", { description: e }));
                        } finally {
                            em(!1);
                        }
                    },
                    eT = async () => {
                        if (!J || ev) return;
                        let e = J.pokemon_dex_id,
                            t = null != e ? "/api/cards?pokemon_dex_id=".concat(e) : "/api/cards",
                            a = new Set(U.map((e) => e.id));
                        a.add(J.id);
                        try {
                            for (let r of (ej(!0),
                            eb(null),
                            Y("/api/binder", (t) => (t ? { cards: t.cards.filter((t) => !a.has(t.id) && (null == e || t.pokemon_dex_id !== e)), availableCounts: null != e ? { ...(t.availableCounts || {}), [e]: 0 } : t.availableCounts } : t), !1),
                            Y(t, (e) => (e ? { cards: e.cards.filter((e) => !a.has(e.id)) } : e), !1),
                            Y("/api/cards", (e) => (e ? { cards: e.cards.filter((e) => !a.has(e.id)) } : e), !1),
                            await Promise.all(U.map((e) => fetch("/api/cards/".concat(e.id), { method: "DELETE" })))))
                                if (!r.ok) {
                                    let e = await r.json();
                                    throw Error(e.error || "Erro ao excluir c\xf3pia");
                                }
                            if ((X({ deletedCardIds: a }), Y("/api/binder"), Y(t), Y("/api/dashboard"), ey(!1), v.oR.success("Exemplar exclu\xeddo", { description: "Todas as c\xf3pias de ".concat(J.card_name, " foram removidas da cole\xe7\xe3o.") }), "binder" === B && ez())) return;
                            "binder" === B ? (e ? L.push("/?dexId=".concat(e, "&openSelect=true")) : L.push("/?spread=".concat(D || "1"))) : L.push("/collection");
                        } catch (a) {
                            ($(), Y("/api/binder"), Y(t));
                            let e = a instanceof Error ? a.message : "Erro ao excluir carta";
                            (eb(e), ej(!1), v.oR.error("Erro ao excluir carta", { description: e }));
                        }
                    },
                    eI = U.length || +!!J,
                    eF = U.some((e) => e.is_in_binder) || !!(null == J ? void 0 : J.is_in_binder),
                    eO = U.filter((e) => !e.is_in_binder).length,
                    eW = null != eo ? eo : J && (0, m.eY)(J.card_variant) ? J.card_variant : "normal",
                    eB = null != ex ? ex : J && (0, h.C6)(J.card_condition) ? J.card_condition : "NM";
                (0, h.kF)(eB);
                let eD = J ? (0, m.WE)(eW, J.card_rarity, J.card_image_url, J.card_name) : "none",
                    eV = J ? (0, y.Mr)(J.card_types, J.pokemon_dex_id) : void 0;
                return (0, r.jsxs)("div", {
                    className: "flex min-h-screen flex-col",
                    children: [
                        (0, r.jsxs)("main", {
                            className: "mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16",
                            children: [
                                (0, r.jsx)("div", {
                                    className: "flex items-center justify-between",
                                    children: (0, r.jsxs)("button", {
                                        type: "button",
                                        onClick: () => {
                                            if ("binder" === B) {
                                                if (ez()) return;
                                                let e = (null == J ? void 0 : J.pokemon_dex_id) || (V ? parseInt(V, 10) : void 0);
                                                return e ? void L.push("/?dexId=".concat(e, "&openSelect=true")) : D ? void L.push("/?spread=".concat(D)) : void L.push("/");
                                            }
                                            if ("collection" === B) return void (window.history.length > 1 ? L.back() : L.push("/collection"));
                                            window.history.length > 1 ? L.back() : L.push("/collection");
                                        },
                                        className: "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white",
                                        children: [(0, r.jsx)(j.A, { size: 16 }), (0, r.jsx)("span", { children: "Voltar" })],
                                    }),
                                }),
                                G
                                    ? (0, r.jsx)("div", { className: "flex h-96 flex-col items-center justify-center", children: (0, r.jsx)(i.i, { message: "Carregando detalhes da carta...", size: "lg" }) })
                                    : K || !J
                                      ? (0, r.jsxs)("div", {
                                            className: "profile-enter flex h-96 flex-col items-center justify-center gap-4 text-center",
                                            children: [
                                                (0, r.jsx)("div", { className: "flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400", children: (0, r.jsx)(w.A, { size: 28 }) }),
                                                (0, r.jsxs)("div", { children: [(0, r.jsx)("h2", { className: "text-lg font-bold text-white", children: "Carta n\xe3o encontrada" }), (0, r.jsx)("p", { className: "mt-1 text-xs text-slate-400", children: "Este exemplar pode ter sido removido ou o link \xe9 inv\xe1lido." })] }),
                                                (0, r.jsx)("button", { type: "button", onClick: () => L.push("/collection"), className: "rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20", children: "Ir para a Cole\xe7\xe3o" }),
                                            ],
                                        })
                                      : (0, r.jsxs)("div", {
                                            className: "grid grid-cols-1 gap-8 md:grid-cols-12",
                                            children: [
                                                (0, r.jsxs)("div", {
                                                    className: "flex flex-col items-center gap-5 md:col-span-5 lg:col-span-4",
                                                    children: [
                                                        (0, r.jsx)("div", {
                                                            role: "button",
                                                            tabIndex: 0,
                                                            onClick: () => e_(!0),
                                                            onKeyDown: (e) => {
                                                                ("Enter" === e.key || " " === e.key) && (e.preventDefault(), e_(!0));
                                                            },
                                                            className: "card-list-appear group/card relative z-0 aspect-[8/11] w-full max-w-[290px] cursor-pointer select-none isolate",
                                                            children: (0, r.jsx)(o.LW, {
                                                                className: "relative h-full w-full overflow-hidden rounded-2xl bg-[#0d1017]",
                                                                maxTilt: 10,
                                                                scale: 1.03,
                                                                glareOpacity: 0.3,
                                                                perspective: 1e3,
                                                                shineMode: eD,
                                                                elementTypes: eV,
                                                                isLoading: !ek,
                                                                children: (0, r.jsx)(d.MH, { src: (0, u.HO)(J.card_image_url), alt: J.card_name, sizes: "(max-width: 768px) 80vw, 350px", className: "object-contain drop-shadow-[0_16px_36px_rgba(0,0,0,0.85)] transition-all duration-300 group-hover/card:scale-[1.01]", priority: !0, onLoadingChange: eN }),
                                                            }),
                                                        }),
                                                        (0, r.jsxs)("button", { type: "button", onClick: () => e_(!0), className: "card-list-appear inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-400 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white", children: [(0, r.jsx)(_.A, { size: 12 }), (0, r.jsx)("span", { children: "Toque na carta para ampliar" })] }),
                                                        (0, r.jsxs)("div", {
                                                            className: "card-list-appear flex flex-col items-center gap-2.5 text-center",
                                                            children: [
                                                                (0, r.jsxs)("div", {
                                                                    className: "flex items-center gap-2.5",
                                                                    children: [
                                                                        (0, r.jsx)("h1", { className: "text-2xl font-black tracking-tight text-white sm:text-3xl", children: J.card_name }),
                                                                        null != J.pokemon_dex_id ? (0, r.jsxs)("span", { className: "rounded-lg border border-white/10 bg-white/10 px-2.5 py-0.5 font-mono text-xs font-bold text-slate-300", children: ["#", String(J.pokemon_dex_id).padStart(3, "0")] }) : (0, r.jsx)("span", { className: "rounded-lg border border-white/10 bg-white/10 px-2.5 py-0.5 font-mono text-xs font-bold text-slate-300", children: "TCG" }),
                                                                    ],
                                                                }),
                                                                (0, r.jsxs)("div", {
                                                                    className: "flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-400",
                                                                    children: [(0, r.jsx)("span", { children: J.card_set_name || "Cole\xe7\xe3o Base" }), J.card_artist && (0, r.jsxs)(r.Fragment, { children: [(0, r.jsx)("span", { className: "text-white/20", children: "\xb7" }), (0, r.jsxs)("span", { className: "inline-flex items-center gap-1 text-slate-300", children: [(0, r.jsx)(k.A, { size: 12, className: "text-slate-400" }), (0, r.jsx)("span", { children: J.card_artist })] })] })],
                                                                }),
                                                                (0, r.jsxs)("div", {
                                                                    className: "mt-1 flex flex-wrap items-center justify-center gap-2",
                                                                    children: [
                                                                        J.card_rarity && (0, r.jsx)("span", { className: "inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-bold ".concat((0, f._I)(J.card_rarity, J.card_name).badgeClasses), children: (0, f._I)(J.card_rarity, J.card_name).label }),
                                                                        (0, r.jsx)(b.J, { condition: eB, size: "md", variant: "both" }),
                                                                        "holo" === eW && (0, r.jsxs)("span", { className: "flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/15 px-2.5 py-1 text-xs font-bold text-amber-200 shadow-sm", children: [(0, r.jsx)(N.A, { size: 13, className: "text-amber-300" }), (0, r.jsx)("span", { children: "Foil" })] }),
                                                                        "reverse" === eW && (0, r.jsxs)("span", { className: "flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/15 px-2.5 py-1 text-xs font-bold text-cyan-200 shadow-sm", children: [(0, r.jsx)(C.A, { size: 13, className: "text-cyan-300" }), (0, r.jsx)("span", { children: "Reverse Foil" })] }),
                                                                        "normal" === eW && (0, r.jsxs)("span", { className: "flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-slate-300 shadow-sm", children: [(0, r.jsx)(E.A, { size: 13, className: "text-slate-400" }), (0, r.jsx)("span", { children: "Normal" })] }),
                                                                        J.is_in_binder && (0, r.jsxs)("span", { title: "No Binder", "aria-label": "No Binder", className: "flex items-center gap-1.5 rounded-lg border border-poke-blue/40 bg-poke-blue/15 px-2.5 py-1 text-xs font-bold text-poke-blue shadow-sm", children: [(0, r.jsx)(z.A, { size: 13 }), (0, r.jsx)("span", { children: "No Binder" })] }),
                                                                    ],
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                (0, r.jsxs)("div", {
                                                    className: "flex flex-col gap-5 md:col-span-7 lg:col-span-8",
                                                    children: [
                                                        eh && (0, r.jsxs)("div", { className: "profile-enter flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/15 p-3.5 text-xs text-red-200", children: [(0, r.jsx)(w.A, { size: 16, className: "shrink-0 text-red-400" }), (0, r.jsx)("span", { children: eh })] }),
                                                        (0, r.jsxs)("div", {
                                                            className: "profile-enter profile-enter-d1 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121520]/90 p-5 shadow-lg backdrop-blur-md",
                                                            children: [
                                                                (0, r.jsxs)("div", {
                                                                    className: "flex items-center justify-between border-b border-white/5 pb-3",
                                                                    children: [
                                                                        (0, r.jsxs)("div", { className: "flex items-center gap-2 text-sm font-bold text-white", children: [(0, r.jsx)(z.A, { size: 16, className: "text-poke-blue" }), (0, r.jsx)("span", { children: "Localiza\xe7\xe3o no Binder" })] }),
                                                                        Q ? (0, r.jsx)("span", { className: "rounded-full border border-poke-blue/40 bg-poke-blue/15 px-2.5 py-0.5 text-xs font-bold text-poke-blue", children: "Alocada" }) : (0, r.jsx)("span", { className: "rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-semibold text-slate-400", children: "Guardada na Cole\xe7\xe3o" }),
                                                                    ],
                                                                }),
                                                                Q
                                                                    ? (0, r.jsxs)("div", {
                                                                          className: "flex flex-col gap-3",
                                                                          children: [
                                                                              (0, r.jsxs)("div", { className: "rounded-xl border border-white/5 bg-white/[0.03] p-3 text-xs text-slate-300", children: [(0, r.jsx)("p", { className: "font-semibold text-white", children: Q.binder_name }), (0, r.jsxs)("p", { className: "mt-1 text-slate-400", children: ["P\xe1gina ", Q.page_number, " \xb7 Slot #", Q.slot_index] })] }),
                                                                              (0, r.jsxs)("div", {
                                                                                  className: "flex items-center gap-2",
                                                                                  children: [
                                                                                      (0, r.jsxs)("button", {
                                                                                          type: "button",
                                                                                          onClick: () => L.push("/binders/".concat(Q.binder_id, "?page=").concat(Q.page_number)),
                                                                                          className: "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-poke-blue px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-poke-blue/20 hover:opacity-90 active:scale-[0.99]",
                                                                                          children: [(0, r.jsx)(z.A, { size: 15 }), (0, r.jsx)("span", { children: "Abrir no Binder" })],
                                                                                      }),
                                                                                      (0, r.jsxs)("button", {
                                                                                          type: "button",
                                                                                          onClick: eS,
                                                                                          disabled: ee,
                                                                                          className: "flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-500/40 bg-red-500/15 px-4 py-2.5 text-xs font-bold text-red-200 transition-all hover:border-red-500/60 hover:bg-red-500/25 disabled:cursor-not-allowed disabled:opacity-50",
                                                                                          children: [ee ? (0, r.jsx)(A.A, { size: 15, className: "animate-spin" }) : (0, r.jsx)(M, { size: 15 }), (0, r.jsx)("span", { children: "Remover" })],
                                                                                      }),
                                                                                  ],
                                                                              }),
                                                                          ],
                                                                      })
                                                                    : (0, r.jsxs)("div", {
                                                                          className: "flex flex-col gap-3",
                                                                          children: [
                                                                              (0, r.jsx)("p", { className: "text-xs leading-relaxed text-slate-400", children: "Esta carta est\xe1 guardada na sua cole\xe7\xe3o e n\xe3o est\xe1 alocada em nenhum binder f\xedsico." }),
                                                                              (0, r.jsxs)("button", { type: "button", onClick: () => L.push("/"), className: "flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-poke-blue px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-poke-blue/20 hover:opacity-90 active:scale-[0.99]", children: [(0, r.jsx)(S.A, { size: 16 }), (0, r.jsx)("span", { children: "Alocar em um Binder" })] }),
                                                                          ],
                                                                      }),
                                                            ],
                                                        }),
                                                        (0, r.jsxs)("div", {
                                                            className: "profile-enter profile-enter-d2 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121520]/90 p-5 shadow-lg backdrop-blur-md",
                                                            children: [
                                                                (0, r.jsxs)("div", { className: "border-b border-white/5 pb-3", children: [(0, r.jsx)("h3", { className: "text-sm font-bold text-white", children: "Metadados da C\xf3pia F\xedsica" }), (0, r.jsx)("p", { className: "mt-0.5 text-xs text-slate-400", children: "Configure as caracter\xedsticas do seu exemplar real." })] }),
                                                                (0, r.jsxs)("div", { className: "flex flex-col gap-2", children: [(0, r.jsx)("label", { className: "text-xs font-medium text-slate-400", children: "Idioma da sua carta f\xedsica:" }), (0, r.jsx)(n.G, { value: null != es ? es : J.card_language, onChange: eA, size: "md", fullWidth: !0, ariaLabel: "Idioma da sua carta f\xedsica", loadingValue: ea })] }),
                                                                (0, r.jsxs)("div", { className: "flex flex-col gap-2", children: [(0, r.jsx)("label", { className: "text-xs font-medium text-slate-400", children: "Vers\xe3o f\xedsica (acabamento):" }), (0, r.jsx)(n.G, { value: eW, onChange: eL, options: m.xV, size: "md", fullWidth: !0, ariaLabel: "Vers\xe3o f\xedsica (acabamento)", loadingValue: ei, disabled: null !== ei })] }),
                                                                (0, r.jsxs)("div", {
                                                                    className: "flex flex-col gap-2",
                                                                    children: [
                                                                        (0, r.jsxs)("div", { className: "flex items-center justify-between", children: [(0, r.jsx)("label", { className: "text-xs font-medium text-slate-400", children: "Estado de conserva\xe7\xe3o (Condi\xe7\xe3o):" }), (0, r.jsx)("span", { className: "text-[11px] font-semibold text-slate-300", children: (0, h.P2)(eB) })] }),
                                                                        (0, r.jsx)(n.G, { value: eB, onChange: eM, options: h.Fx, size: "md", fullWidth: !0, ariaLabel: "Estado de conserva\xe7\xe3o da sua carta f\xedsica", loadingValue: ec, disabled: null !== ec }),
                                                                    ],
                                                                }),
                                                            ],
                                                        }),
                                                        (0, r.jsxs)("div", {
                                                            className: "profile-enter profile-enter-d3 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121520]/90 p-5 shadow-lg backdrop-blur-md",
                                                            children: [
                                                                (0, r.jsxs)("div", {
                                                                    className: "flex items-center justify-between border-b border-white/5 pb-3",
                                                                    children: [(0, r.jsxs)("div", { className: "flex items-center gap-2 text-sm font-bold text-white", children: [(0, r.jsx)(P.A, { size: 16, className: "text-poke-blue" }), (0, r.jsx)("span", { children: "Exemplares Id\xeanticos na Cole\xe7\xe3o" })] }), (0, r.jsxs)("span", { className: "rounded-lg border border-poke-blue/30 bg-poke-blue/20 px-2.5 py-0.5 text-xs font-bold text-poke-blue", children: ["x", eI] })],
                                                                }),
                                                                (0, r.jsxs)("p", { className: "text-xs text-slate-400", children: ["Voc\xea possui ", 1 === eI ? "1 exemplar 100% id\xeantico" : "".concat(eI, " exemplares 100% id\xeanticos"), " desta edi\xe7\xe3o, idioma, vers\xe3o e estado (", eF ? "1 no binder, " : "0 no binder, ", 1 === eO ? "1 guardada" : "".concat(eO, " guardadas"), ")."] }),
                                                                (0, r.jsxs)("div", {
                                                                    className: "flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3.5",
                                                                    children: [
                                                                        (0, r.jsx)("span", { className: "text-xs font-semibold text-slate-300", children: "Quantidade de c\xf3pias f\xedsicas:" }),
                                                                        (0, r.jsxs)("div", {
                                                                            className: "flex items-center gap-3",
                                                                            children: [
                                                                                (0, r.jsx)("button", {
                                                                                    type: "button",
                                                                                    onClick: eR,
                                                                                    disabled: eI <= 1 || ef,
                                                                                    title: eI <= 1 ? "Para remover o \xfaltimo exemplar, utilize o bot\xe3o Excluir da Cole\xe7\xe3o abaixo" : "Remover 1 c\xf3pia id\xeantica",
                                                                                    "aria-label": "Diminuir quantidade",
                                                                                    className: "flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30",
                                                                                    children: (0, r.jsx)(M, { size: 16 }),
                                                                                }),
                                                                                (0, r.jsx)("span", { className: "w-8 text-center font-mono text-base font-extrabold text-white", children: ef ? (0, r.jsx)(A.A, { size: 16, className: "animate-spin inline text-poke-blue" }) : eI }),
                                                                                (0, r.jsx)("button", { type: "button", onClick: eP, disabled: ef, title: "Adicionar mais 1 c\xf3pia id\xeantica", "aria-label": "Aumentar quantidade", className: "flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:border-white/20 hover:bg-white/10 hover:text-poke-blue disabled:opacity-50", children: (0, r.jsx)(S.A, { size: 16 }) }),
                                                                            ],
                                                                        }),
                                                                    ],
                                                                }),
                                                                (0, r.jsx)("p", { className: "text-[11px] text-slate-500", children: "A quantidade m\xednima \xe9 1. Para remover completamente a carta da sua cole\xe7\xe3o, utilize a a\xe7\xe3o de exclus\xe3o abaixo." }),
                                                            ],
                                                        }),
                                                        (0, r.jsxs)("div", {
                                                            className: "profile-enter profile-enter-d4 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121520]/90 p-5 shadow-lg backdrop-blur-md sm:flex-row sm:items-center sm:justify-between",
                                                            children: [
                                                                (0, r.jsxs)("div", {
                                                                    className: "flex flex-col gap-1",
                                                                    children: [
                                                                        (0, r.jsxs)("div", { className: "flex items-center gap-2 text-xs text-slate-400", children: [(0, r.jsx)(R, { size: 14 }), (0, r.jsxs)("span", { children: ["Adicionada em ", new Date(J.created_at).toLocaleDateString("pt-BR")] })] }),
                                                                        J.card_set_name && (0, r.jsxs)("span", { className: "text-xs text-slate-400", children: ["Cole\xe7\xe3o: ", (0, r.jsx)("strong", { className: "text-slate-200", children: J.card_set_name })] }),
                                                                    ],
                                                                }),
                                                                (0, r.jsxs)("button", { type: "button", onClick: () => ey(!0), className: "flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-red-500/40 bg-red-500/15 px-4 py-2.5 text-xs font-semibold text-red-300 transition-all hover:border-red-500/60 hover:bg-red-500/25 hover:text-red-100 disabled:opacity-50", children: [(0, r.jsx)(T.A, { size: 15 }), (0, r.jsx)("span", { children: "Excluir da Cole\xe7\xe3o" })] }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                            ],
                        }),
                        eC &&
                            (0, r.jsx)("div", {
                                className: "modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-sm",
                                "data-overlay-state": eE,
                                role: "dialog",
                                "aria-modal": "true",
                                "aria-label": "Confirmar exclus\xe3o da carta",
                                onClick: (e) => {
                                    e.target !== e.currentTarget || ev || ey(!1);
                                },
                                children: (0, r.jsxs)("div", {
                                    className: "modal-surface flex h-dvh max-h-none w-full max-w-none flex-col gap-4 overflow-y-auto rounded-none border-0 bg-[#141722] p-6 shadow-2xl sm:h-auto sm:max-w-md sm:rounded-2xl sm:border sm:border-red-500/30",
                                    children: [
                                        (0, r.jsxs)("div", {
                                            className: "flex items-center gap-3",
                                            children: [(0, r.jsx)("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/15 text-red-400", children: (0, r.jsx)(T.A, { size: 22 }) }), (0, r.jsxs)("div", { children: [(0, r.jsx)("h3", { className: "text-base font-bold text-white", children: "Excluir carta da cole\xe7\xe3o?" }), (0, r.jsx)("p", { className: "text-xs text-slate-400", children: "Esta a\xe7\xe3o n\xe3o poder\xe1 ser desfeita." })] })],
                                        }),
                                        (0, r.jsxs)("p", { className: "text-xs text-slate-300 leading-relaxed", children: ["Tem certeza que deseja excluir ", (0, r.jsx)("strong", { children: null == J ? void 0 : J.card_name }), eI > 1 ? " (todas as ".concat(eI, " c\xf3pias id\xeanticas)") : "", " da sua cole\xe7\xe3o?", (null == J ? void 0 : J.is_in_binder) ? " Ela tamb\xe9m ser\xe1 removida da exibi\xe7\xe3o do binder." : ""] }),
                                        (0, r.jsxs)("div", {
                                            className: "mt-2 flex items-center justify-end gap-3",
                                            children: [
                                                (0, r.jsx)("button", { type: "button", onClick: () => ey(!1), disabled: ev, className: "cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 disabled:opacity-50", children: "Cancelar" }),
                                                (0, r.jsxs)("button", { type: "button", onClick: eT, disabled: ev, className: "flex cursor-pointer items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500 disabled:opacity-50", children: [ev && (0, r.jsx)(A.A, { size: 14, className: "animate-spin" }), (0, r.jsx)("span", { children: "Sim, excluir" })] }),
                                            ],
                                        }),
                                    ],
                                }),
                            }),
                        J && (0, r.jsx)(c.O, { src: ew ? (0, u.HO)(J.card_image_url) : null, alt: J.card_name, shineMode: eD, elementTypes: eV, onClose: () => e_(!1) }),
                    ],
                });
            }
        },
        1978: (e, t, a) => {
            "use strict";
            a.d(t, { J: () => n });
            var r = a(5155);
            a(2115);
            var s = a(7801),
                l = a(6907),
                i = a(6151);
            function n(e) {
                let { condition: t, className: a = "", size: n = "sm", variant: o = "letters" } = e;
                if (!t) return null;
                let d = (0, i.kF)(t),
                    c = "alert" === d.iconType ? s.A : l.A;
                return "both" === o
                    ? (0, r.jsxs)("span", {
                          title: d.fullLabel,
                          "aria-label": d.fullLabel,
                          className: ""
                              .concat("md" === n ? "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold" : "inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[9px] font-bold", " ")
                              .concat(d.badgeClasses, " ")
                              .concat(a),
                          children: [(0, r.jsx)(c, { size: "md" === n ? 13 : 11, className: "shrink-0" }), (0, r.jsx)("span", { className: "font-mono", children: d.label })],
                      })
                    : "icon" === o
                      ? (0, r.jsx)("span", {
                            title: d.fullLabel,
                            "aria-label": d.fullLabel,
                            className: "flex shrink-0 items-center justify-center border "
                                .concat("md" === n ? "h-7 w-7 rounded-lg" : "xs" === n ? "h-4 w-4 rounded" : "h-4.5 sm:h-5 w-4.5 sm:w-5 rounded", " ")
                                .concat(d.badgeClasses, " ")
                                .concat(a),
                            children: (0, r.jsx)(c, { size: "md" === n ? 14 : "xs" === n ? 9 : 11, className: "sm" === n ? "sm:h-3 sm:w-3" : "" }),
                        })
                      : (0, r.jsx)("span", {
                            title: d.fullLabel,
                            "aria-label": d.fullLabel,
                            className: "shrink-0 "
                                .concat("md" === n ? "inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-bold" : "xs" === n ? "flex items-center rounded border px-1 font-mono text-[7px] font-bold shrink-0" : "flex h-4.5 sm:h-5 items-center rounded border px-1 font-mono text-[8px] font-bold sm:px-1.5 sm:text-[9px]", " ")
                                .concat(d.badgeClasses, " ")
                                .concat(a),
                            children: d.label,
                        });
            }
        },
        2523: (e, t, a) => {
            "use strict";
            a.d(t, { G: () => d });
            var r = a(5155),
                s = a(2115),
                l = a(2755),
                i = a(5299);
            let n = [
                    { value: "pt-br", label: "PT-BR", shortLabel: "PT", country: "pt-br" },
                    { value: "en", label: "EN", shortLabel: "EN", country: "en" },
                    { value: "ja", label: "JA", shortLabel: "JA", country: "ja" },
                ],
                o = s.useLayoutEffect;
            function d(e) {
                let { value: t, onChange: a, options: d = n, size: c = "sm", fullWidth: u = !1, disabled: x = !1, loadingValue: p = null, ariaLabel: f = "Seletor de idioma da carta", className: m = "" } = e,
                    h = (0, s.useId)(),
                    b = (0, s.useRef)(null),
                    g = (0, s.useRef)([]),
                    [y, v] = (0, s.useState)({ left: 0, width: 0, ready: !1 }),
                    j = Math.max(
                        0,
                        d.findIndex((e) => e.value === t),
                    ),
                    w = d[j],
                    _ = () => {
                        let e = b.current,
                            t = g.current[j];
                        if (e && t) {
                            let a = t.offsetLeft,
                                r = t.offsetParent;
                            for (; r && r !== e;) ((a += r.offsetLeft), (r = r.offsetParent));
                            let s = Math.max(0, a),
                                l = Math.min(t.offsetWidth, Math.max(0, e.clientWidth - s));
                            v({ left: s, width: l, ready: !0 });
                        }
                    };
                (o(() => {
                    _();
                }, [t, j, d.length]),
                    (0, s.useEffect)(() => {
                        let e = () => {
                            _();
                        };
                        window.addEventListener("resize", e);
                        let t = "undefined" != typeof ResizeObserver ? new ResizeObserver(() => _()) : null;
                        return (
                            b.current && t && t.observe(b.current),
                            () => {
                                (window.removeEventListener("resize", e), t && t.disconnect());
                            }
                        );
                    }, [j]));
                let k = "sm" === c;
                return (0, r.jsxs)("div", {
                    ref: b,
                    role: "radiogroup",
                    "aria-label": f,
                    className: "relative inline-flex items-center overflow-hidden max-w-full rounded-xl border border-white/10 bg-[#0d111a]/90 p-1 shadow-inner backdrop-blur-md transition-colors "
                        .concat(u ? "w-full" : "w-auto", " ")
                        .concat(x ? "opacity-60 cursor-not-allowed" : "", " ")
                        .concat(m),
                    children: [
                        (0, r.jsx)("div", {
                            "data-slider-indicator": !0,
                            style: { transform: y.ready ? "translate3d(".concat(y.left, "px, 0, 0)") : "translate3d(".concat(100 * j, "%, 0, 0)"), width: y.ready ? "".concat(y.width, "px") : "".concat(100 / Math.max(1, d.length), "%"), opacity: y.ready ? 1 : 0.85 },
                            className: "pointer-events-none absolute top-1 bottom-1 left-0 rounded-lg border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ".concat((null == w ? void 0 : w.indicatorClassName) || "border-poke-blue/50 bg-poke-blue/20 shadow-[0_0_12px_var(--theme-primary-glow)]"),
                        }),
                        (0, r.jsx)("div", {
                            className: "relative z-10 flex items-center min-w-0 ".concat(u ? "w-full" : "w-auto"),
                            children: d.map((e, s) => {
                                let n = e.value === t,
                                    o = p === e.value,
                                    c = "".concat(h, "-option-").concat(e.value);
                                return (0, r.jsxs)(
                                    "button",
                                    {
                                        id: c,
                                        ref: (e) => {
                                            g.current[s] = e;
                                        },
                                        type: "button",
                                        role: "radio",
                                        title: e.title || e.label,
                                        "aria-label": e.title || e.label,
                                        "aria-checked": n,
                                        disabled: x || o,
                                        onClick: () => {
                                            e.value !== t && a(e.value);
                                        },
                                        className: "group relative flex items-center justify-center rounded-lg font-semibold tracking-tight transition-all duration-200 select-none active:scale-95 disabled:cursor-not-allowed min-w-0 "
                                            .concat(u ? "flex-1" : "", " ")
                                            .concat(k ? (d.length > 4 ? "px-0.5 sm:px-1.5 py-1 text-[10px] sm:text-xs gap-0.5 sm:gap-1" : "px-1 sm:px-2.5 py-1 text-[10px] sm:text-xs gap-1 sm:gap-1.5") : "px-3.5 py-2 text-xs sm:text-sm gap-1.5", " ")
                                            .concat(n ? e.activeClassName || "text-white font-bold" : "text-slate-400 hover:text-slate-200"),
                                        children: [
                                            o
                                                ? (0, r.jsx)(i.A, { size: k ? 11 : 14, className: "shrink-0 animate-spin text-poke-blue" })
                                                : e.country
                                                  ? (0, r.jsx)(l.i, { country: e.country, className: "shrink-0 transition-transform duration-200 ".concat(n ? "scale-105 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" : "opacity-75 group-hover:opacity-100") })
                                                  : e.icon
                                                    ? (0, r.jsx)("span", { className: "inline-flex shrink-0 items-center justify-center transition-transform duration-200 ".concat(n ? "scale-105 ".concat(e.activeIconClassName || "text-white") : "opacity-75 group-hover:opacity-100 ".concat(e.inactiveIconClassName || "text-slate-400")), children: e.icon })
                                                    : null,
                                            (0, r.jsx)("span", { className: "truncate whitespace-nowrap ".concat(e.shortLabel ? "hidden sm:inline" : "inline"), children: e.label }),
                                            e.shortLabel ? (0, r.jsx)("span", { className: "inline sm:hidden truncate whitespace-nowrap", children: e.shortLabel }) : null,
                                        ],
                                    },
                                    e.value,
                                );
                            }),
                        }),
                    ],
                });
            }
        },
        2671: (e, t, a) => {
            "use strict";
            a.d(t, { MH: () => o, MI: () => d, y7: () => n });
            var r = a(5155),
                s = a(2115),
                l = a(5239);
            let i = new Set();
            function n(e) {
                return !!e && i.has(e);
            }
            function o(e) {
                let { src: t, alt: a, fill: o = !0, sizes: d, priority: c = !1, className: u = "", skeletonClassName: x = "", unoptimized: p = !0, draggable: f, onLoadingChange: m } = e,
                    h = n(t),
                    [b, g] = (0, s.useState)(h),
                    y = (0, s.useRef)(m),
                    v = (0, s.useRef)(t),
                    j = (0, s.useRef)(null);
                (0, s.useEffect)(() => {
                    y.current = m;
                }, [m]);
                let w = (0, s.useCallback)(() => {
                    var e;
                    (t && i.add(t), g(!0), null == (e = y.current) || e.call(y, !0));
                }, [t]);
                ((0, s.useEffect)(() => {
                    if (v.current !== t) {
                        var e;
                        v.current = t;
                        let a = n(t);
                        (g(a), null == (e = y.current) || e.call(y, a));
                    }
                }, [t]),
                    (0, s.useEffect)(() => {
                        if (n(t)) {
                            var e;
                            (g(!0), null == (e = y.current) || e.call(y, !0));
                            return;
                        }
                        j.current && j.current.complete && j.current.naturalWidth > 0 && w();
                    }, [t, w]));
                let _ = (0, s.useCallback)(
                        (e) => {
                            ((j.current = e), e && e.complete && e.naturalWidth > 0 && w());
                        },
                        [w],
                    ),
                    k = (0, s.useCallback)(() => {
                        w();
                    }, [w]),
                    N = (0, s.useCallback)(() => {
                        w();
                    }, [w]);
                return (0, r.jsxs)(r.Fragment, {
                    children: [
                        !b &&
                            (0, r.jsx)("div", {
                                className: "card-skeleton ".concat(x),
                                children: (0, r.jsxs)("svg", {
                                    className: "h-7 w-7 text-white/20 animate-pulse select-none pointer-events-none",
                                    viewBox: "0 0 24 24",
                                    fill: "currentColor",
                                    children: [(0, r.jsx)("circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "2", fill: "none" }), (0, r.jsx)("line", { x1: "2", y1: "12", x2: "22", y2: "12", stroke: "currentColor", strokeWidth: "2" }), (0, r.jsx)("circle", { cx: "12", cy: "12", r: "3.5", stroke: "currentColor", strokeWidth: "2", fill: "#131722" }), (0, r.jsx)("circle", { cx: "12", cy: "12", r: "1.5", fill: "currentColor" })],
                                }),
                            }),
                        (0, r.jsx)(l.default, { ref: _, src: t, alt: a, fill: o, sizes: d, priority: c, className: "".concat(u, " transition-opacity duration-300 ").concat(b ? "opacity-100" : "opacity-0 pointer-events-none"), unoptimized: p, draggable: f, onLoad: k, onError: N }),
                    ],
                });
            }
            function d(e, t) {
                let a = n(t),
                    [r, l] = (0, s.useState)(a);
                return (
                    (0, s.useEffect)(() => {
                        t && n(t) ? l(!0) : l(!1);
                    }, [e, t]),
                    { loaded: r, setLoaded: l }
                );
            }
        },
        2755: (e, t, a) => {
            "use strict";
            a.d(t, { i: () => s });
            var r = a(5155);
            function s(e) {
                let { country: t, className: a = "" } = e;
                return "pt-br" === t
                    ? (0, r.jsxs)("svg", { viewBox: "0 0 20 14", width: "18", height: "13", className: "overflow-hidden rounded-xs shadow-xs ".concat(a), children: [(0, r.jsx)("rect", { width: "20", height: "14", fill: "#009c3b" }), (0, r.jsx)("polygon", { points: "10,2 18,7 10,12 2,7", fill: "#ffdf00" }), (0, r.jsx)("circle", { cx: "10", cy: "7", r: "3.2", fill: "#002776" }), (0, r.jsx)("path", { d: "M7.2 7.2 Q10 6 12.8 7.6", stroke: "#ffffff", strokeWidth: "0.7", fill: "none" })] })
                    : "en" === t
                      ? (0, r.jsxs)("svg", {
                            viewBox: "0 0 20 14",
                            width: "18",
                            height: "13",
                            className: "overflow-hidden rounded-xs shadow-xs ".concat(a),
                            children: [
                                (0, r.jsx)("rect", { width: "20", height: "14", fill: "#b22234" }),
                                (0, r.jsx)("rect", { y: "1.08", width: "20", height: "1.08", fill: "#ffffff" }),
                                (0, r.jsx)("rect", { y: "3.24", width: "20", height: "1.08", fill: "#ffffff" }),
                                (0, r.jsx)("rect", { y: "5.4", width: "20", height: "1.08", fill: "#ffffff" }),
                                (0, r.jsx)("rect", { y: "7.56", width: "20", height: "1.08", fill: "#ffffff" }),
                                (0, r.jsx)("rect", { y: "9.72", width: "20", height: "1.08", fill: "#ffffff" }),
                                (0, r.jsx)("rect", { y: "11.88", width: "20", height: "1.08", fill: "#ffffff" }),
                                (0, r.jsx)("rect", { width: "9", height: "7.56", fill: "#3c3b6e" }),
                                (0, r.jsx)("circle", { cx: "2", cy: "2", r: "0.65", fill: "#ffffff" }),
                                (0, r.jsx)("circle", { cx: "4.5", cy: "2", r: "0.65", fill: "#ffffff" }),
                                (0, r.jsx)("circle", { cx: "7", cy: "2", r: "0.65", fill: "#ffffff" }),
                                (0, r.jsx)("circle", { cx: "3.25", cy: "3.78", r: "0.65", fill: "#ffffff" }),
                                (0, r.jsx)("circle", { cx: "5.75", cy: "3.78", r: "0.65", fill: "#ffffff" }),
                                (0, r.jsx)("circle", { cx: "2", cy: "5.56", r: "0.65", fill: "#ffffff" }),
                                (0, r.jsx)("circle", { cx: "4.5", cy: "5.56", r: "0.65", fill: "#ffffff" }),
                                (0, r.jsx)("circle", { cx: "7", cy: "5.56", r: "0.65", fill: "#ffffff" }),
                            ],
                        })
                      : (0, r.jsxs)("svg", { viewBox: "0 0 20 14", width: "18", height: "13", className: "overflow-hidden rounded-xs shadow-xs border border-white/20 ".concat(a), children: [(0, r.jsx)("rect", { width: "20", height: "14", fill: "#ffffff" }), (0, r.jsx)("circle", { cx: "10", cy: "7", r: "4.2", fill: "#bc002d" })] });
            }
            a(2115);
        },
        3011: (e, t, a) => {
            "use strict";
            (Object.defineProperty(t, "__esModule", { value: !0 }),
                Object.defineProperty(t, "useMergedRef", {
                    enumerable: !0,
                    get: function () {
                        return s;
                    },
                }));
            let r = a(2115);
            function s(e, t) {
                let a = (0, r.useRef)(null),
                    s = (0, r.useRef)(null);
                return (0, r.useCallback)(
                    (r) => {
                        if (null === r) {
                            let e = a.current;
                            e && ((a.current = null), e());
                            let t = s.current;
                            t && ((s.current = null), t());
                        } else (e && (a.current = l(e, r)), t && (s.current = l(t, r)));
                    },
                    [e, t],
                );
            }
            function l(e, t) {
                if ("function" != typeof e)
                    return (
                        (e.current = t),
                        () => {
                            e.current = null;
                        }
                    );
                {
                    let a = e(t);
                    return "function" == typeof a ? a : () => e(null);
                }
            }
            ("function" == typeof t.default || ("object" == typeof t.default && null !== t.default)) && void 0 === t.default.__esModule && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), (e.exports = t.default));
        },
        4067: (e, t, a) => {
            "use strict";
            a.d(t, { O: () => c });
            var r = a(5155),
                s = a(2115),
                l = a(5239),
                i = a(5229),
                n = a(148),
                o = a(6092),
                d = a(7997);
            function c(e) {
                let { src: t, alt: a = "Carta", shineMode: c = "none", elementTypes: u, onClose: x } = e,
                    p = (0, s.useRef)(null),
                    [f, m] = (0, s.useState)(t);
                (0, o.m)(!!t, x);
                let { isPresent: h, state: b } = (0, d.v)(!!t);
                return ((0, s.useEffect)(() => {
                    t && m(t);
                }, [t]),
                (0, s.useEffect)(() => {
                    if (!h) return;
                    let e = document.body.style.overflow,
                        t = document.body.style.touchAction,
                        a = document.documentElement.style.overflow,
                        r = document.documentElement.style.touchAction;
                    ((document.body.style.overflow = "hidden"), (document.body.style.touchAction = "none"), (document.documentElement.style.overflow = "hidden"), (document.documentElement.style.touchAction = "none"));
                    let s = (e) => {
                            e.cancelable && e.preventDefault();
                        },
                        l = p.current;
                    return (
                        l && l.addEventListener("touchmove", s, { passive: !1 }),
                        () => {
                            ((document.body.style.overflow = e), (document.body.style.touchAction = t), (document.documentElement.style.overflow = a), (document.documentElement.style.touchAction = r), l && l.removeEventListener("touchmove", s));
                        }
                    );
                }, [h]),
                h && f)
                    ? (0, r.jsxs)("div", {
                          ref: p,
                          className: "modal-backdrop fixed inset-0 z-[100] flex select-none items-center justify-center bg-black/80 p-4 backdrop-blur-md touch-none overscroll-none",
                          "data-overlay-state": b,
                          role: "dialog",
                          "aria-modal": "true",
                          "aria-label": a,
                          onClick: (e) => {
                              e.target === e.currentTarget && x();
                          },
                          children: [
                              (0, r.jsx)("button", { type: "button", onClick: x, "aria-label": "Fechar", className: "absolute right-4 top-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-6 sm:top-6", children: (0, r.jsx)(i.A, { size: 20, strokeWidth: 2.5 }) }),
                              (0, r.jsx)("div", {
                                  className: "modal-surface relative aspect-[8/11] w-[88vw] max-w-[420px] select-none touch-none",
                                  children: (0, r.jsx)(n.LW, { className: "relative h-full w-full overflow-hidden rounded-2xl touch-none", maxTilt: 18, scale: 1.05, glareOpacity: 0.35, perspective: 1e3, shineMode: c, elementTypes: u, enableTouch: !0, children: (0, r.jsx)(l.default, { src: f, alt: a, fill: !0, unoptimized: !0, priority: !0, sizes: "(max-width: 768px) 90vw, 500px", className: "pointer-events-none object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]" }) }),
                              }),
                          ],
                      })
                    : null;
            }
        },
        4833: (e, t, a) => {
            "use strict";
            a.d(t, { B8: () => i, ZK: () => l, m$: () => n });
            var r = a(2180),
                s = a(4059);
            function l(e) {
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
            function i(e) {
                if ("string" != typeof e || !e.startsWith("/api/cards")) return !1;
                try {
                    let t = new URL(e, "https://mypokebinder.local");
                    return "/api/cards" === t.pathname && "true" !== t.searchParams.get("grouped");
                } catch (e) {
                    return !1;
                }
            }
            function n(e, t, a) {
                var l, i, n;
                let o = (function (e) {
                    try {
                        var t, a, r, s, l, i, n, o, d;
                        let c = new URL(e, "https://mypokebinder.local");
                        if ("/api/cards" !== c.pathname || "true" !== c.searchParams.get("grouped")) return null;
                        return {
                            searchTerm: null != (t = c.searchParams.get("search")) ? t : "",
                            statusFilter: null != (a = c.searchParams.get("status")) ? a : "all",
                            languageFilter: null != (r = c.searchParams.get("language")) ? r : "all",
                            rarityFilter: null != (s = c.searchParams.get("rarity")) ? s : "all",
                            expansionFilter: null != (l = c.searchParams.get("expansion")) ? l : "all",
                            variantFilter: null != (i = c.searchParams.get("variant")) ? i : "all",
                            artistFilter: null != (n = c.searchParams.get("artist")) ? n : "all",
                            sortField: null != (o = c.searchParams.get("sort")) ? o : "dex",
                            sortDirection: null != (d = c.searchParams.get("direction")) ? d : "asc",
                        };
                    } catch (e) {
                        return null;
                    }
                })(e);
                if (!o) return t;
                let d = new Map(null == (l = a.updatedCards) ? void 0 : l.map((e) => [e.id, e])),
                    c = new Set(a.deletedCardIds),
                    u = new Set(null == (i = a.addedCards) ? void 0 : i.map(s.qe));
                if (!t.groups.some((e) => u.has(e.key) || e.copies.some((e) => d.has(e.id) || c.has(e.id) || a.clearBinderForPokemonDexId === e.pokemon_dex_id))) return t;
                let x = t.groups
                    .flatMap((e) => e.copies)
                    .filter((e) => !c.has(e.id))
                    .map((e) => {
                        var t;
                        let r = a.clearBinderForPokemonDexId === e.pokemon_dex_id ? { ...e, is_in_binder: !1 } : e;
                        return null != (t = d.get(e.id)) ? t : r;
                    });
                for (let e of null != (n = a.addedCards) ? n : []) !t.groups.some((t) => t.key === (0, s.qe)(e)) || c.has(e.id) || x.some((t) => t.id === e.id) || x.push(e);
                let p = (0, r.a)((0, r.rM)(x), o);
                return { ...t, groups: p, total: Math.max(0, t.total + p.length - t.groups.length) };
            }
        },
        5299: (e, t, a) => {
            "use strict";
            a.d(t, { A: () => r });
            let r = (0, a(1847).A)("LoaderCircle", [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]]);
        },
        5626: (e, t, a) => {
            "use strict";
            a.d(t, { A: () => r });
            let r = (0, a(1847).A)("ArrowLeft", [
                ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
                ["path", { d: "M19 12H5", key: "x3x0zl" }],
            ]);
        },
        6092: (e, t, a) => {
            "use strict";
            a.d(t, { m: () => s });
            var r = a(2115);
            function s(e, t) {
                let a = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                (0, r.useEffect)(() => {
                    if (!e || a) return;
                    let r = (e) => {
                        "Escape" === e.key && (e.preventDefault(), t());
                    };
                    return (window.addEventListener("keydown", r), () => window.removeEventListener("keydown", r));
                }, [e, t, a]);
            }
        },
        6132: (e, t, a) => {
            "use strict";
            a.d(t, { A: () => r });
            let r = (0, a(1847).A)("CircleAlert", [
                ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
                ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
                ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }],
            ]);
        },
        6191: (e, t, a) => {
            "use strict";
            a.d(t, { A: () => r });
            let r = (0, a(1847).A)("Plus", [
                ["path", { d: "M5 12h14", key: "1ays0h" }],
                ["path", { d: "M12 5v14", key: "s699le" }],
            ]);
        },
        7997: (e, t, a) => {
            "use strict";
            a.d(t, { v: () => s });
            var r = a(2115);
            function s(e) {
                let [t, a] = (0, r.useState)(e),
                    [s, l] = (0, r.useState)(e ? "opening" : "closed");
                return (
                    (0, r.useEffect)(() => {
                        if (e) {
                            (a(!0), l("opening"));
                            let e = window.setTimeout(() => l("open"), 420);
                            return () => window.clearTimeout(e);
                        }
                        if (!t) return;
                        l("closing");
                        let r = window.setTimeout(() => {
                            (a(!1), l("closed"));
                        }, 280);
                        return () => window.clearTimeout(r);
                    }, [e, t]),
                    { isPresent: t, state: s }
                );
            }
        },
        9926: (e, t, a) => {
            "use strict";
            a.d(t, { A: () => r });
            let r = (0, a(1847).A)("Palette", [
                ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
                ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
                ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }],
                ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
                ["path", { d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z", key: "12rzf8" }],
            ]);
        },
    },
    (e) => {
        (e.O(0, [5730, 235, 5239, 8720, 4102, 9605, 1013, 6937, 148, 2006, 8441, 1255, 7358], () => e((e.s = 1339))), (_N_E = e.O()));
    },
]);
