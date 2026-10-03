(() => {
    var a = {};
    ((a.id = 2872),
        (a.ids = [2872]),
        (a.modules = {
            261: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/router/utils/app-paths");
            },
            3295: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
            },
            8849: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("Plus", [
                    ["path", { d: "M5 12h14", key: "1ays0h" }],
                    ["path", { d: "M12 5v14", key: "s699le" }],
                ]);
            },
            10846: (a) => {
                "use strict";
                a.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
            },
            14263: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("LoaderCircle", [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]]);
            },
            18177: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { default: () => d }));
                let d = (0, c(97954).registerClientReference)(
                    function () {
                        throw Error("Attempted to call the default export of \"/home/paulo_rosado/MyPokeBinder/src/app/cards/[id]/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
                    },
                    "/home/paulo_rosado/MyPokeBinder/src/app/cards/[id]/page.tsx",
                    "default",
                );
            },
            19121: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/action-async-storage.external.js");
            },
            23865: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { default: () => N }));
                var d = c(21124),
                    e = c(38301),
                    f = c(42378),
                    g = c(59535),
                    h = c(28093),
                    i = c(56849),
                    j = c(65687),
                    k = c(28265),
                    l = c(7401),
                    m = c(68686),
                    n = c(21296),
                    o = c(43157),
                    p = c(79281),
                    q = c(95945),
                    r = c(38984),
                    s = c(36965),
                    t = c(69587),
                    u = c(42830),
                    v = c(79944),
                    w = c(18310),
                    x = c(88285),
                    y = c(28074),
                    z = c(75234),
                    A = c(25345),
                    B = c(90133),
                    C = c(74097),
                    D = c(14263),
                    E = c(23339);
                let F = (0, E.A)("Minus", [["path", { d: "M5 12h14", key: "1ays0h" }]]);
                var G = c(8849),
                    H = c(65783);
                let I = (0, E.A)("Calendar", [
                    ["path", { d: "M8 2v4", key: "1cmpym" }],
                    ["path", { d: "M16 2v4", key: "4m81vk" }],
                    ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
                    ["path", { d: "M3 10h18", key: "8toen8" }],
                ]);
                var J = c(40284),
                    K = c(76186),
                    L = c(42593);
                let M = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
                function N({ params: a }) {
                    let b = (0, e.use)(a).id,
                        c = (0, f.useRouter)(),
                        E = (0, f.useSearchParams)(),
                        N = E.get("from"),
                        O = E.get("spread"),
                        P = E.get("dexId"),
                        Q = E.get("binderId"),
                        R = E.get("slotId"),
                        { card: S, copies: T, isLoading: U, isError: V, mutate: W, allocation: X } = (0, m.sz)(b),
                        { mutate: Y, cache: Z } = (0, n.iX)(),
                        $ = (a) => {
                            let b = new Map();
                            for (let c of Z.keys()) {
                                if (!(0, s.ZK)(c)) continue;
                                let d = Z.get(c)?.data;
                                d && (b.set(c, d), Y(c, (0, s.m$)(c, d, a), !1));
                            }
                            return () => {
                                for (let [a, c] of b) Y(a, c, !1);
                            };
                        },
                        [_, aa] = (0, e.useState)(!1),
                        [ab, ac] = (0, e.useState)(null),
                        [ad, ae] = (0, e.useState)(null),
                        [af, ag] = (0, e.useState)(null),
                        [ah, ai] = (0, e.useState)(null),
                        [aj, ak] = (0, e.useState)(null),
                        [al, am] = (0, e.useState)(null),
                        [an, ao] = (0, e.useState)(!1),
                        [ap, aq] = (0, e.useState)(null),
                        [ar, as] = (0, e.useState)(!1),
                        [at, au] = (0, e.useState)(!1),
                        [av, aw] = (0, e.useState)(!1),
                        [ax, ay] = (0, e.useState)(!1);
                    (0, K.m)(ar, () => as(!1), at);
                    let { isPresent: az, state: aA } = (0, L.v)(ar),
                        aB = () => {
                            let a = X?.binder_id ?? Q,
                                b = X?.slot_id ?? R,
                                d = X?.page_number ?? Number(E.get("page"));
                            if (a && b && M.test(a) && M.test(b)) {
                                let e = new URLSearchParams({ openSlot: b });
                                return (Number.isInteger(d) && d > 0 && e.set("page", String(d)), c.push(`/binders/${a}?${e.toString()}`), !0);
                            }
                            return !1;
                        },
                        aC = async (a) => {
                            if (!S || (ad ?? S.card_language) === a || null !== ab) return;
                            (ae(a), ac(a));
                            let b = S.pokemon_dex_id,
                                c = null != b ? `/api/cards?pokemon_dex_id=${b}` : "/api/cards",
                                d = $({ updatedCards: [{ ...S, card_language: a }] });
                            try {
                                (aq(null), S.is_in_binder && Y("/api/binder", (b) => (b ? { ...b, cards: b.cards.map((b) => (b.id === S.id ? { ...b, card_language: a } : b)) } : b), !1), Y(c, (b) => (b ? { cards: b.cards.map((b) => (b.id === S.id ? { ...b, card_language: a } : b)) } : b), !1));
                                let b = await fetch(`/api/cards/${S.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ card_language: a }) }),
                                    d = await b.json();
                                if (!b.ok) throw Error(d.error || "Erro ao atualizar idioma");
                                ($({ updatedCards: [d.card] }), W(), u.oR.success("Idioma atualizado", { description: `Idioma alterado para ${{ "pt-br": "Portugu\xeas", en: "Ingl\xeas", ja: "Japon\xeas" }[a] || a.toUpperCase()}.` }));
                            } catch (b) {
                                (d(), ae(null), W(), S.is_in_binder && Y("/api/binder"), Y(c));
                                let a = b instanceof Error ? b.message : "Erro ao atualizar idioma";
                                (aq(a), u.oR.error("Erro ao atualizar idioma", { description: a }));
                            } finally {
                                ac(null);
                            }
                        },
                        aD = async (a) => {
                            let b = ah ?? ((0, p.eY)(S?.card_variant) ? S.card_variant : "normal");
                            if (!S || b === a || null !== af) return;
                            (ai(a), ag(a));
                            let c = S.pokemon_dex_id,
                                d = null != c ? `/api/cards?pokemon_dex_id=${c}` : "/api/cards",
                                e = $({ updatedCards: [{ ...S, card_variant: a }] });
                            try {
                                (aq(null), S.is_in_binder && Y("/api/binder", (b) => (b ? { ...b, cards: b.cards.map((b) => (b.id === S.id ? { ...b, card_variant: a } : b)) } : b), !1), Y(d, (b) => (b ? { cards: b.cards.map((b) => (b.id === S.id ? { ...b, card_variant: a } : b)) } : b), !1));
                                let b = await fetch(`/api/cards/${S.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ card_variant: a }) }),
                                    c = await b.json();
                                if (!b.ok) throw Error(c.error || "Erro ao atualizar vers\xe3o");
                                ($({ updatedCards: [c.card] }), W(), u.oR.success("Vers\xe3o atualizada", { description: `Vers\xe3o alterada para ${(0, p.FB)(a)}.` }));
                            } catch (b) {
                                (e(), ai(null), W(), S.is_in_binder && Y("/api/binder"), Y(d));
                                let a = b instanceof Error ? b.message : "Erro ao atualizar vers\xe3o";
                                (aq(a), u.oR.error("Erro ao atualizar vers\xe3o", { description: a }));
                            } finally {
                                ag(null);
                            }
                        },
                        aE = async (a) => {
                            let b = al ?? ((0, q.C6)(S?.card_condition) ? S.card_condition : "NM");
                            if (!S || b === a || null !== aj) return;
                            (am(a), ak(a));
                            let c = S.pokemon_dex_id,
                                d = null != c ? `/api/cards?pokemon_dex_id=${c}` : "/api/cards",
                                e = $({ updatedCards: [{ ...S, card_condition: a }] });
                            try {
                                (aq(null), S.is_in_binder && Y("/api/binder", (b) => (b ? { ...b, cards: b.cards.map((b) => (b.id === S.id ? { ...b, card_condition: a } : b)) } : b), !1), Y(d, (b) => (b ? { cards: b.cards.map((b) => (b.id === S.id ? { ...b, card_condition: a } : b)) } : b), !1));
                                let b = await fetch(`/api/cards/${S.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ card_condition: a }) }),
                                    c = await b.json();
                                if (!b.ok) throw Error(c.error || "Erro ao atualizar estado");
                                ($({ updatedCards: [c.card] }), W(), u.oR.success("Estado atualizado", { description: `Estado alterado para ${(0, q.P2)(a)}.` }));
                            } catch (b) {
                                (e(), am(null), W(), S.is_in_binder && Y("/api/binder"), Y(d));
                                let a = b instanceof Error ? b.message : "Erro ao atualizar estado";
                                (aq(a), u.oR.error("Erro ao atualizar estado", { description: a }));
                            } finally {
                                ak(null);
                            }
                        },
                        aF = async () => {
                            if (X && !_) {
                                (aa(!0), aq(null));
                                try {
                                    let a = await fetch(`/api/binders/${X.binder_id}/slots/${X.slot_id}/assign`, { method: "DELETE" });
                                    if (!a.ok) {
                                        let b = await a.json();
                                        throw Error(b.error || "Erro ao remover carta do binder");
                                    }
                                    (u.oR.success("Carta removida do binder!", { description: `${S?.card_name} foi guardada de volta na sua cole\xe7\xe3o.` }), W(), Y((a) => "string" == typeof a && (a.startsWith("/api/binder") || a.startsWith("/api/cards"))));
                                } catch (b) {
                                    let a = b instanceof Error ? b.message : "Erro ao remover carta";
                                    (aq(a), u.oR.error(a));
                                } finally {
                                    aa(!1);
                                }
                            }
                        },
                        aG = async () => {
                            if (!S || an) return;
                            let a = S.pokemon_dex_id,
                                b = null != a ? `/api/cards?pokemon_dex_id=${a}` : "/api/cards";
                            try {
                                (ao(!0),
                                    aq(null),
                                    Y(
                                        "/api/binder",
                                        (b) => {
                                            if (!b) return b;
                                            let c = b.availableCounts ?? {},
                                                d = (null != a && c[a]) || 0;
                                            return { ...b, availableCounts: null != a ? { ...c, [a]: d + 1 } : c };
                                        },
                                        !1,
                                    ));
                                let c = await fetch("/api/cards", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ tcgdex_card_id: S.tcgdex_card_id, pokemon_dex_id: S.pokemon_dex_id, card_name: S.card_name, card_image_url: S.card_image_url, card_set_name: S.card_set_name, card_rarity: S.card_rarity, card_artist: S.card_artist || "", card_condition: S.card_condition || "NM", card_types: S.card_types, card_language: S.card_language, card_variant: S.card_variant || "normal", is_in_binder: !1 }),
                                    }),
                                    d = await c.json();
                                if (!c.ok) throw Error(d.error || "Erro ao adicionar c\xf3pia id\xeantica");
                                ($({ addedCards: [d.card] }), W(), Y("/api/binder"), Y(b), Y("/api/dashboard"), u.oR.success("C\xf3pia adicionada!", { description: `Mais um exemplar de ${S.card_name} adicionado \xe0 cole\xe7\xe3o.` }));
                            } catch (c) {
                                (W(), Y("/api/binder"), Y(b));
                                let a = c instanceof Error ? c.message : "Erro ao adicionar c\xf3pia";
                                (aq(a), u.oR.error("Erro ao adicionar c\xf3pia", { description: a }));
                            } finally {
                                ao(!1);
                            }
                        },
                        aH = async () => {
                            if (!S || T.length <= 1 || an) return;
                            let a = T.find((a) => !a.is_in_binder && a.id !== S.id) || T.find((a) => a.id !== S.id) || S,
                                b = S.pokemon_dex_id,
                                d = null != b ? `/api/cards?pokemon_dex_id=${b}` : "/api/cards",
                                e = !!a.is_in_binder,
                                f = $({ deletedCardIds: [a.id] });
                            try {
                                (ao(!0),
                                    aq(null),
                                    Y(
                                        "/api/binder",
                                        (c) => {
                                            if (!c) return c;
                                            let d = c.availableCounts ?? {},
                                                f = (null != b && d[b]) || 0;
                                            return { cards: e ? c.cards.filter((b) => b.id !== a.id) : c.cards, availableCounts: null != b ? { ...d, [b]: e ? f : Math.max(0, f - 1) } : d };
                                        },
                                        !1,
                                    ),
                                    Y(d, (b) => (b ? { cards: b.cards.filter((b) => b.id !== a.id) } : b), !1),
                                    Y("/api/cards", (b) => (b ? { cards: b.cards.filter((b) => b.id !== a.id) } : b), !1));
                                let f = await fetch(`/api/cards/${a.id}`, { method: "DELETE" }),
                                    g = await f.json();
                                if (!f.ok) throw Error(g.error || "Erro ao remover c\xf3pia");
                                if ((u.oR.success("C\xf3pia removida", { description: `Um exemplar de ${S.card_name} foi removido da cole\xe7\xe3o.` }), $({ deletedCardIds: [a.id] }), Y("/api/binder"), Y(d), Y("/api/dashboard"), a.id === S.id)) {
                                    let a = T.filter((a) => a.id !== S.id);
                                    if (a.length > 0) return void c.replace(`/cards/${a[0].id}?from=${N || "collection"}${P ? `&dexId=${P}` : ""}`);
                                }
                                W();
                            } catch (b) {
                                (f(), W(), Y("/api/binder"), Y(d));
                                let a = b instanceof Error ? b.message : "Erro ao remover c\xf3pia";
                                (aq(a), u.oR.error("Erro ao remover c\xf3pia", { description: a }));
                            } finally {
                                ao(!1);
                            }
                        },
                        aI = async () => {
                            if (!S || at) return;
                            let a = S.pokemon_dex_id,
                                b = null != a ? `/api/cards?pokemon_dex_id=${a}` : "/api/cards",
                                d = new Set(T.map((a) => a.id));
                            d.add(S.id);
                            try {
                                for (let c of (au(!0),
                                aq(null),
                                Y("/api/binder", (b) => (b ? { cards: b.cards.filter((b) => !d.has(b.id) && (null == a || b.pokemon_dex_id !== a)), availableCounts: null != a ? { ...(b.availableCounts || {}), [a]: 0 } : b.availableCounts } : b), !1),
                                Y(b, (a) => (a ? { cards: a.cards.filter((a) => !d.has(a.id)) } : a), !1),
                                Y("/api/cards", (a) => (a ? { cards: a.cards.filter((a) => !d.has(a.id)) } : a), !1),
                                await Promise.all(T.map((a) => fetch(`/api/cards/${a.id}`, { method: "DELETE" })))))
                                    if (!c.ok) {
                                        let a = await c.json();
                                        throw Error(a.error || "Erro ao excluir c\xf3pia");
                                    }
                                if (($({ deletedCardIds: d }), Y("/api/binder"), Y(b), Y("/api/dashboard"), as(!1), u.oR.success("Exemplar exclu\xeddo", { description: `Todas as c\xf3pias de ${S.card_name} foram removidas da cole\xe7\xe3o.` }), "binder" === N && aB())) return;
                                "binder" === N ? (a ? c.push(`/?dexId=${a}&openSelect=true`) : c.push(`/?spread=${O || "1"}`)) : c.push("/collection");
                            } catch (c) {
                                (W(), Y("/api/binder"), Y(b));
                                let a = c instanceof Error ? c.message : "Erro ao excluir carta";
                                (aq(a), au(!1), u.oR.error("Erro ao excluir carta", { description: a }));
                            }
                        },
                        aJ = T.length || +!!S,
                        aK = T.some((a) => a.is_in_binder) || !!S?.is_in_binder,
                        aL = T.filter((a) => !a.is_in_binder).length,
                        aM = ah ?? (S && (0, p.eY)(S.card_variant) ? S.card_variant : "normal"),
                        aN = al ?? (S && (0, q.C6)(S.card_condition) ? S.card_condition : "NM");
                    (0, q.kF)(aN);
                    let aO = S ? (0, p.WE)(aM, S.card_rarity, S.card_image_url, S.card_name) : "none",
                        aP = S ? (0, t.Mr)(S.card_types, S.pokemon_dex_id) : void 0;
                    return (0, d.jsxs)("div", {
                        className: "flex min-h-screen flex-col",
                        children: [
                            (0, d.jsxs)("main", {
                                className: "mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16",
                                children: [
                                    (0, d.jsx)("div", {
                                        className: "flex items-center justify-between",
                                        children: (0, d.jsxs)("button", {
                                            type: "button",
                                            onClick: () => {
                                                if ("binder" === N) {
                                                    if (aB()) return;
                                                    let a = S?.pokemon_dex_id || (P ? parseInt(P, 10) : void 0);
                                                    return a ? void c.push(`/?dexId=${a}&openSelect=true`) : O ? void c.push(`/?spread=${O}`) : void c.push("/");
                                                }
                                                if ("collection" === N) return void (window.history.length > 1 ? c.back() : c.push("/collection"));
                                                window.history.length > 1 ? c.back() : c.push("/collection");
                                            },
                                            className: "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white",
                                            children: [(0, d.jsx)(v.A, { size: 16 }), (0, d.jsx)("span", { children: "Voltar" })],
                                        }),
                                    }),
                                    U
                                        ? (0, d.jsx)("div", { className: "flex h-96 flex-col items-center justify-center", children: (0, d.jsx)(g.i, { message: "Carregando detalhes da carta...", size: "lg" }) })
                                        : V || !S
                                          ? (0, d.jsxs)("div", {
                                                className: "profile-enter flex h-96 flex-col items-center justify-center gap-4 text-center",
                                                children: [
                                                    (0, d.jsx)("div", { className: "flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400", children: (0, d.jsx)(w.A, { size: 28 }) }),
                                                    (0, d.jsxs)("div", { children: [(0, d.jsx)("h2", { className: "text-lg font-bold text-white", children: "Carta n\xe3o encontrada" }), (0, d.jsx)("p", { className: "mt-1 text-xs text-slate-400", children: "Este exemplar pode ter sido removido ou o link \xe9 inv\xe1lido." })] }),
                                                    (0, d.jsx)("button", { type: "button", onClick: () => c.push("/collection"), className: "rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20", children: "Ir para a Cole\xe7\xe3o" }),
                                                ],
                                            })
                                          : (0, d.jsxs)("div", {
                                                className: "grid grid-cols-1 gap-8 md:grid-cols-12",
                                                children: [
                                                    (0, d.jsxs)("div", {
                                                        className: "flex flex-col items-center gap-5 md:col-span-5 lg:col-span-4",
                                                        children: [
                                                            (0, d.jsx)("div", {
                                                                role: "button",
                                                                tabIndex: 0,
                                                                onClick: () => aw(!0),
                                                                onKeyDown: (a) => {
                                                                    ("Enter" === a.key || " " === a.key) && (a.preventDefault(), aw(!0));
                                                                },
                                                                className: "card-list-appear group/card relative z-0 aspect-[8/11] w-full max-w-[290px] cursor-pointer select-none isolate",
                                                                children: (0, d.jsx)(i.LW, {
                                                                    className: "relative h-full w-full overflow-hidden rounded-2xl bg-[#0d1017]",
                                                                    maxTilt: 10,
                                                                    scale: 1.03,
                                                                    glareOpacity: 0.3,
                                                                    perspective: 1e3,
                                                                    shineMode: aO,
                                                                    elementTypes: aP,
                                                                    isLoading: !ax,
                                                                    children: (0, d.jsx)(j.MH, { src: (0, l.HO)(S.card_image_url), alt: S.card_name, sizes: "(max-width: 768px) 80vw, 350px", className: "object-contain drop-shadow-[0_16px_36px_rgba(0,0,0,0.85)] transition-all duration-300 group-hover/card:scale-[1.01]", priority: !0, onLoadingChange: ay }),
                                                                }),
                                                            }),
                                                            (0, d.jsxs)("button", { type: "button", onClick: () => aw(!0), className: "card-list-appear inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-400 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white", children: [(0, d.jsx)(x.A, { size: 12 }), (0, d.jsx)("span", { children: "Toque na carta para ampliar" })] }),
                                                            (0, d.jsxs)("div", {
                                                                className: "card-list-appear flex flex-col items-center gap-2.5 text-center",
                                                                children: [
                                                                    (0, d.jsxs)("div", {
                                                                        className: "flex items-center gap-2.5",
                                                                        children: [
                                                                            (0, d.jsx)("h1", { className: "text-2xl font-black tracking-tight text-white sm:text-3xl", children: S.card_name }),
                                                                            null != S.pokemon_dex_id ? (0, d.jsxs)("span", { className: "rounded-lg border border-white/10 bg-white/10 px-2.5 py-0.5 font-mono text-xs font-bold text-slate-300", children: ["#", String(S.pokemon_dex_id).padStart(3, "0")] }) : (0, d.jsx)("span", { className: "rounded-lg border border-white/10 bg-white/10 px-2.5 py-0.5 font-mono text-xs font-bold text-slate-300", children: "TCG" }),
                                                                        ],
                                                                    }),
                                                                    (0, d.jsxs)("div", {
                                                                        className: "flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-400",
                                                                        children: [(0, d.jsx)("span", { children: S.card_set_name || "Cole\xe7\xe3o Base" }), S.card_artist && (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("span", { className: "text-white/20", children: "\xb7" }), (0, d.jsxs)("span", { className: "inline-flex items-center gap-1 text-slate-300", children: [(0, d.jsx)(y.A, { size: 12, className: "text-slate-400" }), (0, d.jsx)("span", { children: S.card_artist })] })] })],
                                                                    }),
                                                                    (0, d.jsxs)("div", {
                                                                        className: "mt-1 flex flex-wrap items-center justify-center gap-2",
                                                                        children: [
                                                                            S.card_rarity && (0, d.jsx)("span", { className: `inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-bold ${(0, o._I)(S.card_rarity, S.card_name).badgeClasses}`, children: (0, o._I)(S.card_rarity, S.card_name).label }),
                                                                            (0, d.jsx)(r.J, { condition: aN, size: "md", variant: "both" }),
                                                                            "holo" === aM && (0, d.jsxs)("span", { className: "flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/15 px-2.5 py-1 text-xs font-bold text-amber-200 shadow-sm", children: [(0, d.jsx)(z.A, { size: 13, className: "text-amber-300" }), (0, d.jsx)("span", { children: "Foil" })] }),
                                                                            "reverse" === aM && (0, d.jsxs)("span", { className: "flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/15 px-2.5 py-1 text-xs font-bold text-cyan-200 shadow-sm", children: [(0, d.jsx)(A.A, { size: 13, className: "text-cyan-300" }), (0, d.jsx)("span", { children: "Reverse Foil" })] }),
                                                                            "normal" === aM && (0, d.jsxs)("span", { className: "flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-slate-300 shadow-sm", children: [(0, d.jsx)(B.A, { size: 13, className: "text-slate-400" }), (0, d.jsx)("span", { children: "Normal" })] }),
                                                                            S.is_in_binder && (0, d.jsxs)("span", { title: "No Binder", "aria-label": "No Binder", className: "flex items-center gap-1.5 rounded-lg border border-poke-blue/40 bg-poke-blue/15 px-2.5 py-1 text-xs font-bold text-poke-blue shadow-sm", children: [(0, d.jsx)(C.A, { size: 13 }), (0, d.jsx)("span", { children: "No Binder" })] }),
                                                                        ],
                                                                    }),
                                                                ],
                                                            }),
                                                        ],
                                                    }),
                                                    (0, d.jsxs)("div", {
                                                        className: "flex flex-col gap-5 md:col-span-7 lg:col-span-8",
                                                        children: [
                                                            ap && (0, d.jsxs)("div", { className: "profile-enter flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/15 p-3.5 text-xs text-red-200", children: [(0, d.jsx)(w.A, { size: 16, className: "shrink-0 text-red-400" }), (0, d.jsx)("span", { children: ap })] }),
                                                            (0, d.jsxs)("div", {
                                                                className: "profile-enter profile-enter-d1 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121520]/90 p-5 shadow-lg backdrop-blur-md",
                                                                children: [
                                                                    (0, d.jsxs)("div", {
                                                                        className: "flex items-center justify-between border-b border-white/5 pb-3",
                                                                        children: [
                                                                            (0, d.jsxs)("div", { className: "flex items-center gap-2 text-sm font-bold text-white", children: [(0, d.jsx)(C.A, { size: 16, className: "text-poke-blue" }), (0, d.jsx)("span", { children: "Localiza\xe7\xe3o no Binder" })] }),
                                                                            X ? (0, d.jsx)("span", { className: "rounded-full border border-poke-blue/40 bg-poke-blue/15 px-2.5 py-0.5 text-xs font-bold text-poke-blue", children: "Alocada" }) : (0, d.jsx)("span", { className: "rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-semibold text-slate-400", children: "Guardada na Cole\xe7\xe3o" }),
                                                                        ],
                                                                    }),
                                                                    X
                                                                        ? (0, d.jsxs)("div", {
                                                                              className: "flex flex-col gap-3",
                                                                              children: [
                                                                                  (0, d.jsxs)("div", { className: "rounded-xl border border-white/5 bg-white/[0.03] p-3 text-xs text-slate-300", children: [(0, d.jsx)("p", { className: "font-semibold text-white", children: X.binder_name }), (0, d.jsxs)("p", { className: "mt-1 text-slate-400", children: ["P\xe1gina ", X.page_number, " \xb7 Slot #", X.slot_index] })] }),
                                                                                  (0, d.jsxs)("div", {
                                                                                      className: "flex items-center gap-2",
                                                                                      children: [
                                                                                          (0, d.jsxs)("button", {
                                                                                              type: "button",
                                                                                              onClick: () => c.push(`/binders/${X.binder_id}?page=${X.page_number}`),
                                                                                              className: "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-poke-blue px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-poke-blue/20 hover:opacity-90 active:scale-[0.99]",
                                                                                              children: [(0, d.jsx)(C.A, { size: 15 }), (0, d.jsx)("span", { children: "Abrir no Binder" })],
                                                                                          }),
                                                                                          (0, d.jsxs)("button", {
                                                                                              type: "button",
                                                                                              onClick: aF,
                                                                                              disabled: _,
                                                                                              className: "flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-500/40 bg-red-500/15 px-4 py-2.5 text-xs font-bold text-red-200 transition-all hover:border-red-500/60 hover:bg-red-500/25 disabled:cursor-not-allowed disabled:opacity-50",
                                                                                              children: [_ ? (0, d.jsx)(D.A, { size: 15, className: "animate-spin" }) : (0, d.jsx)(F, { size: 15 }), (0, d.jsx)("span", { children: "Remover" })],
                                                                                          }),
                                                                                      ],
                                                                                  }),
                                                                              ],
                                                                          })
                                                                        : (0, d.jsxs)("div", {
                                                                              className: "flex flex-col gap-3",
                                                                              children: [
                                                                                  (0, d.jsx)("p", { className: "text-xs leading-relaxed text-slate-400", children: "Esta carta est\xe1 guardada na sua cole\xe7\xe3o e n\xe3o est\xe1 alocada em nenhum binder f\xedsico." }),
                                                                                  (0, d.jsxs)("button", { type: "button", onClick: () => c.push("/"), className: "flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-poke-blue px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-poke-blue/20 hover:opacity-90 active:scale-[0.99]", children: [(0, d.jsx)(G.A, { size: 16 }), (0, d.jsx)("span", { children: "Alocar em um Binder" })] }),
                                                                              ],
                                                                          }),
                                                                ],
                                                            }),
                                                            (0, d.jsxs)("div", {
                                                                className: "profile-enter profile-enter-d2 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121520]/90 p-5 shadow-lg backdrop-blur-md",
                                                                children: [
                                                                    (0, d.jsxs)("div", { className: "border-b border-white/5 pb-3", children: [(0, d.jsx)("h3", { className: "text-sm font-bold text-white", children: "Metadados da C\xf3pia F\xedsica" }), (0, d.jsx)("p", { className: "mt-0.5 text-xs text-slate-400", children: "Configure as caracter\xedsticas do seu exemplar real." })] }),
                                                                    (0, d.jsxs)("div", { className: "flex flex-col gap-2", children: [(0, d.jsx)("label", { className: "text-xs font-medium text-slate-400", children: "Idioma da sua carta f\xedsica:" }), (0, d.jsx)(h.G, { value: ad ?? S.card_language, onChange: aC, size: "md", fullWidth: !0, ariaLabel: "Idioma da sua carta f\xedsica", loadingValue: ab })] }),
                                                                    (0, d.jsxs)("div", { className: "flex flex-col gap-2", children: [(0, d.jsx)("label", { className: "text-xs font-medium text-slate-400", children: "Vers\xe3o f\xedsica (acabamento):" }), (0, d.jsx)(h.G, { value: aM, onChange: aD, options: p.xV, size: "md", fullWidth: !0, ariaLabel: "Vers\xe3o f\xedsica (acabamento)", loadingValue: af, disabled: null !== af })] }),
                                                                    (0, d.jsxs)("div", {
                                                                        className: "flex flex-col gap-2",
                                                                        children: [
                                                                            (0, d.jsxs)("div", { className: "flex items-center justify-between", children: [(0, d.jsx)("label", { className: "text-xs font-medium text-slate-400", children: "Estado de conserva\xe7\xe3o (Condi\xe7\xe3o):" }), (0, d.jsx)("span", { className: "text-[11px] font-semibold text-slate-300", children: (0, q.P2)(aN) })] }),
                                                                            (0, d.jsx)(h.G, { value: aN, onChange: aE, options: q.Fx, size: "md", fullWidth: !0, ariaLabel: "Estado de conserva\xe7\xe3o da sua carta f\xedsica", loadingValue: aj, disabled: null !== aj }),
                                                                        ],
                                                                    }),
                                                                ],
                                                            }),
                                                            (0, d.jsxs)("div", {
                                                                className: "profile-enter profile-enter-d3 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121520]/90 p-5 shadow-lg backdrop-blur-md",
                                                                children: [
                                                                    (0, d.jsxs)("div", {
                                                                        className: "flex items-center justify-between border-b border-white/5 pb-3",
                                                                        children: [(0, d.jsxs)("div", { className: "flex items-center gap-2 text-sm font-bold text-white", children: [(0, d.jsx)(H.A, { size: 16, className: "text-poke-blue" }), (0, d.jsx)("span", { children: "Exemplares Id\xeanticos na Cole\xe7\xe3o" })] }), (0, d.jsxs)("span", { className: "rounded-lg border border-poke-blue/30 bg-poke-blue/20 px-2.5 py-0.5 text-xs font-bold text-poke-blue", children: ["x", aJ] })],
                                                                    }),
                                                                    (0, d.jsxs)("p", { className: "text-xs text-slate-400", children: ["Voc\xea possui ", 1 === aJ ? "1 exemplar 100% id\xeantico" : `${aJ} exemplares 100% id\xeanticos`, " desta edi\xe7\xe3o, idioma, vers\xe3o e estado (", aK ? "1 no binder, " : "0 no binder, ", 1 === aL ? "1 guardada" : `${aL} guardadas`, ")."] }),
                                                                    (0, d.jsxs)("div", {
                                                                        className: "flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3.5",
                                                                        children: [
                                                                            (0, d.jsx)("span", { className: "text-xs font-semibold text-slate-300", children: "Quantidade de c\xf3pias f\xedsicas:" }),
                                                                            (0, d.jsxs)("div", {
                                                                                className: "flex items-center gap-3",
                                                                                children: [
                                                                                    (0, d.jsx)("button", {
                                                                                        type: "button",
                                                                                        onClick: aH,
                                                                                        disabled: aJ <= 1 || an,
                                                                                        title: aJ <= 1 ? "Para remover o \xfaltimo exemplar, utilize o bot\xe3o Excluir da Cole\xe7\xe3o abaixo" : "Remover 1 c\xf3pia id\xeantica",
                                                                                        "aria-label": "Diminuir quantidade",
                                                                                        className: "flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30",
                                                                                        children: (0, d.jsx)(F, { size: 16 }),
                                                                                    }),
                                                                                    (0, d.jsx)("span", { className: "w-8 text-center font-mono text-base font-extrabold text-white", children: an ? (0, d.jsx)(D.A, { size: 16, className: "animate-spin inline text-poke-blue" }) : aJ }),
                                                                                    (0, d.jsx)("button", { type: "button", onClick: aG, disabled: an, title: "Adicionar mais 1 c\xf3pia id\xeantica", "aria-label": "Aumentar quantidade", className: "flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:border-white/20 hover:bg-white/10 hover:text-poke-blue disabled:opacity-50", children: (0, d.jsx)(G.A, { size: 16 }) }),
                                                                                ],
                                                                            }),
                                                                        ],
                                                                    }),
                                                                    (0, d.jsx)("p", { className: "text-[11px] text-slate-500", children: "A quantidade m\xednima \xe9 1. Para remover completamente a carta da sua cole\xe7\xe3o, utilize a a\xe7\xe3o de exclus\xe3o abaixo." }),
                                                                ],
                                                            }),
                                                            (0, d.jsxs)("div", {
                                                                className: "profile-enter profile-enter-d4 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121520]/90 p-5 shadow-lg backdrop-blur-md sm:flex-row sm:items-center sm:justify-between",
                                                                children: [
                                                                    (0, d.jsxs)("div", {
                                                                        className: "flex flex-col gap-1",
                                                                        children: [
                                                                            (0, d.jsxs)("div", { className: "flex items-center gap-2 text-xs text-slate-400", children: [(0, d.jsx)(I, { size: 14 }), (0, d.jsxs)("span", { children: ["Adicionada em ", new Date(S.created_at).toLocaleDateString("pt-BR")] })] }),
                                                                            S.card_set_name && (0, d.jsxs)("span", { className: "text-xs text-slate-400", children: ["Cole\xe7\xe3o: ", (0, d.jsx)("strong", { className: "text-slate-200", children: S.card_set_name })] }),
                                                                        ],
                                                                    }),
                                                                    (0, d.jsxs)("button", {
                                                                        type: "button",
                                                                        onClick: () => as(!0),
                                                                        className: "flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-red-500/40 bg-red-500/15 px-4 py-2.5 text-xs font-semibold text-red-300 transition-all hover:border-red-500/60 hover:bg-red-500/25 hover:text-red-100 disabled:opacity-50",
                                                                        children: [(0, d.jsx)(J.A, { size: 15 }), (0, d.jsx)("span", { children: "Excluir da Cole\xe7\xe3o" })],
                                                                    }),
                                                                ],
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            }),
                                ],
                            }),
                            az &&
                                (0, d.jsx)("div", {
                                    className: "modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-sm",
                                    "data-overlay-state": aA,
                                    role: "dialog",
                                    "aria-modal": "true",
                                    "aria-label": "Confirmar exclus\xe3o da carta",
                                    onClick: (a) => {
                                        a.target !== a.currentTarget || at || as(!1);
                                    },
                                    children: (0, d.jsxs)("div", {
                                        className: "modal-surface flex h-dvh max-h-none w-full max-w-none flex-col gap-4 overflow-y-auto rounded-none border-0 bg-[#141722] p-6 shadow-2xl sm:h-auto sm:max-w-md sm:rounded-2xl sm:border sm:border-red-500/30",
                                        children: [
                                            (0, d.jsxs)("div", {
                                                className: "flex items-center gap-3",
                                                children: [(0, d.jsx)("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/15 text-red-400", children: (0, d.jsx)(J.A, { size: 22 }) }), (0, d.jsxs)("div", { children: [(0, d.jsx)("h3", { className: "text-base font-bold text-white", children: "Excluir carta da cole\xe7\xe3o?" }), (0, d.jsx)("p", { className: "text-xs text-slate-400", children: "Esta a\xe7\xe3o n\xe3o poder\xe1 ser desfeita." })] })],
                                            }),
                                            (0, d.jsxs)("p", { className: "text-xs text-slate-300 leading-relaxed", children: ["Tem certeza que deseja excluir ", (0, d.jsx)("strong", { children: S?.card_name }), aJ > 1 ? ` (todas as ${aJ} c\xf3pias id\xeanticas)` : "", " da sua cole\xe7\xe3o?", S?.is_in_binder ? " Ela tamb\xe9m ser\xe1 removida da exibi\xe7\xe3o do binder." : ""] }),
                                            (0, d.jsxs)("div", {
                                                className: "mt-2 flex items-center justify-end gap-3",
                                                children: [
                                                    (0, d.jsx)("button", { type: "button", onClick: () => as(!1), disabled: at, className: "cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 disabled:opacity-50", children: "Cancelar" }),
                                                    (0, d.jsxs)("button", { type: "button", onClick: aI, disabled: at, className: "flex cursor-pointer items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500 disabled:opacity-50", children: [at && (0, d.jsx)(D.A, { size: 14, className: "animate-spin" }), (0, d.jsx)("span", { children: "Sim, excluir" })] }),
                                                ],
                                            }),
                                        ],
                                    }),
                                }),
                            S && (0, d.jsx)(k.O, { src: av ? (0, l.HO)(S.card_image_url) : null, alt: S.card_name, shineMode: aO, elementTypes: aP, onClose: () => aw(!1) }),
                        ],
                    });
                }
            },
            25197: (a, b, c) => {
                Promise.resolve().then(c.bind(c, 23865));
            },
            26713: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/router/utils/is-bot");
            },
            28074: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("Palette", [
                    ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
                    ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
                    ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }],
                    ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
                    ["path", { d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z", key: "12rzf8" }],
                ]);
            },
            28093: (a, b, c) => {
                "use strict";
                c.d(b, { G: () => j });
                var d = c(21124),
                    e = c(38301),
                    f = c(72937),
                    g = c(14263);
                let h = [
                        { value: "pt-br", label: "PT-BR", shortLabel: "PT", country: "pt-br" },
                        { value: "en", label: "EN", shortLabel: "EN", country: "en" },
                        { value: "ja", label: "JA", shortLabel: "JA", country: "ja" },
                    ],
                    i = e.useEffect;
                function j({ value: a, onChange: b, options: c = h, size: j = "sm", fullWidth: k = !1, disabled: l = !1, loadingValue: m = null, ariaLabel: n = "Seletor de idioma da carta", className: o = "" }) {
                    let p = (0, e.useId)(),
                        q = (0, e.useRef)(null),
                        r = (0, e.useRef)([]),
                        [s, t] = (0, e.useState)({ left: 0, width: 0, ready: !1 }),
                        u = Math.max(
                            0,
                            c.findIndex((b) => b.value === a),
                        ),
                        v = c[u];
                    i(() => {
                        (() => {
                            let a = q.current,
                                b = r.current[u];
                            if (a && b) {
                                let c = b.offsetLeft,
                                    d = b.offsetParent;
                                for (; d && d !== a;) ((c += d.offsetLeft), (d = d.offsetParent));
                                let e = Math.max(0, c),
                                    f = Math.min(b.offsetWidth, Math.max(0, a.clientWidth - e));
                                t({ left: e, width: f, ready: !0 });
                            }
                        })();
                    }, [a, u, c.length]);
                    let w = "sm" === j;
                    return (0, d.jsxs)("div", {
                        ref: q,
                        role: "radiogroup",
                        "aria-label": n,
                        className: `relative inline-flex items-center overflow-hidden max-w-full rounded-xl border border-white/10 bg-[#0d111a]/90 p-1 shadow-inner backdrop-blur-md transition-colors ${k ? "w-full" : "w-auto"} ${l ? "opacity-60 cursor-not-allowed" : ""} ${o}`,
                        children: [
                            (0, d.jsx)("div", {
                                "data-slider-indicator": !0,
                                style: { transform: s.ready ? `translate3d(${s.left}px, 0, 0)` : `translate3d(${100 * u}%, 0, 0)`, width: s.ready ? `${s.width}px` : `${100 / Math.max(1, c.length)}%`, opacity: s.ready ? 1 : 0.85 },
                                className: `pointer-events-none absolute top-1 bottom-1 left-0 rounded-lg border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${v?.indicatorClassName || "border-poke-blue/50 bg-poke-blue/20 shadow-[0_0_12px_var(--theme-primary-glow)]"}`,
                            }),
                            (0, d.jsx)("div", {
                                className: `relative z-10 flex items-center min-w-0 ${k ? "w-full" : "w-auto"}`,
                                children: c.map((e, h) => {
                                    let i = e.value === a,
                                        j = m === e.value,
                                        n = `${p}-option-${e.value}`;
                                    return (0, d.jsxs)(
                                        "button",
                                        {
                                            id: n,
                                            ref: (a) => {
                                                r.current[h] = a;
                                            },
                                            type: "button",
                                            role: "radio",
                                            title: e.title || e.label,
                                            "aria-label": e.title || e.label,
                                            "aria-checked": i,
                                            disabled: l || j,
                                            onClick: () => {
                                                e.value !== a && b(e.value);
                                            },
                                            className: `group relative flex items-center justify-center rounded-lg font-semibold tracking-tight transition-all duration-200 select-none active:scale-95 disabled:cursor-not-allowed min-w-0 ${k ? "flex-1" : ""} ${w ? (c.length > 4 ? "px-0.5 sm:px-1.5 py-1 text-[10px] sm:text-xs gap-0.5 sm:gap-1" : "px-1 sm:px-2.5 py-1 text-[10px] sm:text-xs gap-1 sm:gap-1.5") : "px-3.5 py-2 text-xs sm:text-sm gap-1.5"} ${i ? e.activeClassName || "text-white font-bold" : "text-slate-400 hover:text-slate-200"}`,
                                            children: [
                                                j
                                                    ? (0, d.jsx)(g.A, { size: w ? 11 : 14, className: "shrink-0 animate-spin text-poke-blue" })
                                                    : e.country
                                                      ? (0, d.jsx)(f.i, { country: e.country, className: `shrink-0 transition-transform duration-200 ${i ? "scale-105 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" : "opacity-75 group-hover:opacity-100"}` })
                                                      : e.icon
                                                        ? (0, d.jsx)("span", { className: `inline-flex shrink-0 items-center justify-center transition-transform duration-200 ${i ? `scale-105 ${e.activeIconClassName || "text-white"}` : `opacity-75 group-hover:opacity-100 ${e.inactiveIconClassName || "text-slate-400"}`}`, children: e.icon })
                                                        : null,
                                                (0, d.jsx)("span", { className: `truncate whitespace-nowrap ${e.shortLabel ? "hidden sm:inline" : "inline"}`, children: e.label }),
                                                e.shortLabel ? (0, d.jsx)("span", { className: "inline sm:hidden truncate whitespace-nowrap", children: e.shortLabel }) : null,
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
            28265: (a, b, c) => {
                "use strict";
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
            28354: (a) => {
                "use strict";
                a.exports = require("util");
            },
            29294: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/work-async-storage.external.js");
            },
            33873: (a) => {
                "use strict";
                a.exports = require("path");
            },
            36965: (a, b, c) => {
                "use strict";
                c.d(b, { B8: () => g, ZK: () => f, m$: () => h });
                var d = c(4408),
                    e = c(79281);
                function f(a) {
                    if (
                        !(function (a) {
                            if ("string" != typeof a) return !1;
                            try {
                                let b = new URL(a, "https://mypokebinder.local");
                                return "/api/cards" === b.pathname && ("" === b.search || "true" === b.searchParams.get("grouped"));
                            } catch {
                                return !1;
                            }
                        })(a)
                    )
                        return !1;
                    try {
                        return "true" === new URL(a, "https://mypokebinder.local").searchParams.get("grouped");
                    } catch {
                        return !1;
                    }
                }
                function g(a) {
                    if ("string" != typeof a || !a.startsWith("/api/cards")) return !1;
                    try {
                        let b = new URL(a, "https://mypokebinder.local");
                        return "/api/cards" === b.pathname && "true" !== b.searchParams.get("grouped");
                    } catch {
                        return !1;
                    }
                }
                function h(a, b, c) {
                    let f = (function (a) {
                        try {
                            let b = new URL(a, "https://mypokebinder.local");
                            if ("/api/cards" !== b.pathname || "true" !== b.searchParams.get("grouped")) return null;
                            return {
                                searchTerm: b.searchParams.get("search") ?? "",
                                statusFilter: b.searchParams.get("status") ?? "all",
                                languageFilter: b.searchParams.get("language") ?? "all",
                                rarityFilter: b.searchParams.get("rarity") ?? "all",
                                expansionFilter: b.searchParams.get("expansion") ?? "all",
                                variantFilter: b.searchParams.get("variant") ?? "all",
                                artistFilter: b.searchParams.get("artist") ?? "all",
                                sortField: b.searchParams.get("sort") ?? "dex",
                                sortDirection: b.searchParams.get("direction") ?? "asc",
                            };
                        } catch {
                            return null;
                        }
                    })(a);
                    if (!f) return b;
                    let g = new Map(c.updatedCards?.map((a) => [a.id, a])),
                        h = new Set(c.deletedCardIds),
                        i = new Set(c.addedCards?.map(e.qe));
                    if (!b.groups.some((a) => i.has(a.key) || a.copies.some((a) => g.has(a.id) || h.has(a.id) || c.clearBinderForPokemonDexId === a.pokemon_dex_id))) return b;
                    let j = b.groups
                        .flatMap((a) => a.copies)
                        .filter((a) => !h.has(a.id))
                        .map((a) => {
                            let b = c.clearBinderForPokemonDexId === a.pokemon_dex_id ? { ...a, is_in_binder: !1 } : a;
                            return g.get(a.id) ?? b;
                        });
                    for (let a of c.addedCards ?? []) !b.groups.some((b) => b.key === (0, e.qe)(a)) || h.has(a.id) || j.some((b) => b.id === a.id) || j.push(a);
                    let k = (0, d.a)((0, d.rM)(j), f);
                    return { ...b, groups: k, total: Math.max(0, b.total + k.length - b.groups.length) };
                }
            },
            38984: (a, b, c) => {
                "use strict";
                c.d(b, { J: () => h });
                var d = c(21124);
                c(38301);
                var e = c(93983),
                    f = c(54937),
                    g = c(95945);
                function h({ condition: a, className: b = "", size: c = "sm", variant: h = "letters" }) {
                    if (!a) return null;
                    let i = (0, g.kF)(a),
                        j = "alert" === i.iconType ? e.A : f.A;
                    return "both" === h
                        ? (0, d.jsxs)("span", { title: i.fullLabel, "aria-label": i.fullLabel, className: `${"md" === c ? "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold" : "inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[9px] font-bold"} ${i.badgeClasses} ${b}`, children: [(0, d.jsx)(j, { size: "md" === c ? 13 : 11, className: "shrink-0" }), (0, d.jsx)("span", { className: "font-mono", children: i.label })] })
                        : "icon" === h
                          ? (0, d.jsx)("span", { title: i.fullLabel, "aria-label": i.fullLabel, className: `flex shrink-0 items-center justify-center border ${"md" === c ? "h-7 w-7 rounded-lg" : "xs" === c ? "h-4 w-4 rounded" : "h-4.5 sm:h-5 w-4.5 sm:w-5 rounded"} ${i.badgeClasses} ${b}`, children: (0, d.jsx)(j, { size: "md" === c ? 14 : "xs" === c ? 9 : 11, className: "sm" === c ? "sm:h-3 sm:w-3" : "" }) })
                          : (0, d.jsx)("span", { title: i.fullLabel, "aria-label": i.fullLabel, className: `shrink-0 ${"md" === c ? "inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-bold" : "xs" === c ? "flex items-center rounded border px-1 font-mono text-[7px] font-bold shrink-0" : "flex h-4.5 sm:h-5 items-center rounded border px-1 font-mono text-[8px] font-bold sm:px-1.5 sm:text-[9px]"} ${i.badgeClasses} ${b}`, children: i.label });
                }
            },
            39541: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { GlobalError: () => E.a, __next_app__: () => K, handler: () => M, pages: () => J, routeModule: () => L, tree: () => I }));
                var d = c(49754),
                    e = c(9117),
                    f = c(46595),
                    g = c(32324),
                    h = c(39326),
                    i = c(38928),
                    j = c(20175),
                    k = c(12),
                    l = c(54290),
                    m = c(12696),
                    n = c(52574),
                    o = c(82802),
                    p = c(77533),
                    q = c(45229),
                    r = c(32822),
                    s = c(261),
                    t = c(26453),
                    u = c(52474),
                    v = c(26713),
                    w = c(51356),
                    x = c(62685),
                    y = c(36225),
                    z = c(63446),
                    A = c(2762),
                    B = c(45742),
                    C = c(86439),
                    D = c(81170),
                    E = c.n(D),
                    F = c(62506),
                    G = c(91203),
                    H = {};
                for (let a in F) 0 > ["default", "tree", "pages", "GlobalError", "__next_app__", "routeModule", "handler"].indexOf(a) && (H[a] = () => F[a]);
                c.d(b, H);
                let I = {
                        children: [
                            "",
                            { children: ["cards", { children: ["[id]", { children: ["__PAGE__", {}, { page: [() => Promise.resolve().then(c.bind(c, 18177)), "/home/paulo_rosado/MyPokeBinder/src/app/cards/[id]/page.tsx"] }] }, {}] }, {}] },
                            {
                                layout: [() => Promise.resolve().then(c.bind(c, 51472)), "/home/paulo_rosado/MyPokeBinder/src/app/layout.tsx"],
                                "global-error": [() => Promise.resolve().then(c.t.bind(c, 81170, 23)), "next/dist/client/components/builtin/global-error.js"],
                                "not-found": [() => Promise.resolve().then(c.bind(c, 59732)), "/home/paulo_rosado/MyPokeBinder/src/app/not-found.tsx"],
                                forbidden: [() => Promise.resolve().then(c.t.bind(c, 90461, 23)), "next/dist/client/components/builtin/forbidden.js"],
                                unauthorized: [() => Promise.resolve().then(c.t.bind(c, 32768, 23)), "next/dist/client/components/builtin/unauthorized.js"],
                            },
                        ],
                    }.children,
                    J = ["/home/paulo_rosado/MyPokeBinder/src/app/cards/[id]/page.tsx"],
                    K = { require: c, loadChunk: () => Promise.resolve() },
                    L = new d.AppPageRouteModule({ definition: { kind: e.RouteKind.APP_PAGE, page: "/cards/[id]/page", pathname: "/cards/[id]", bundlePath: "", filename: "", appPaths: [] }, userland: { loaderTree: I }, distDir: ".next", relativeProjectDir: "" });
                async function M(a, b, d) {
                    var D;
                    let H = "/cards/[id]/page";
                    "/index" === H && (H = "/");
                    let N = (0, h.getRequestMeta)(a, "postponed"),
                        O = (0, h.getRequestMeta)(a, "minimalMode"),
                        P = await L.prepare(a, b, { srcPage: H, multiZoneDraftMode: !1 });
                    if (!P) return ((b.statusCode = 400), b.end("Bad Request"), null == d.waitUntil || d.waitUntil.call(d, Promise.resolve()), null);
                    let { buildId: Q, query: R, params: S, parsedUrl: T, pageIsDynamic: U, buildManifest: V, nextFontManifest: W, reactLoadableManifest: X, serverActionsManifest: Y, clientReferenceManifest: Z, subresourceIntegrityManifest: $, prerenderManifest: _, isDraftMode: aa, resolvedPathname: ab, revalidateOnlyGenerated: ac, routerServerContext: ad, nextConfig: ae, interceptionRoutePatterns: af } = P,
                        ag = T.pathname || "/",
                        ah = (0, s.normalizeAppPath)(H),
                        { isOnDemandRevalidate: ai } = P,
                        aj = L.match(ag, _),
                        ak = !!_.routes[ab],
                        al = !!(aj || ak || _.routes[ah]),
                        am = a.headers["user-agent"] || "",
                        an = (0, v.getBotType)(am),
                        ao = (0, q.isHtmlBotRequest)(a),
                        ap = (0, h.getRequestMeta)(a, "isPrefetchRSCRequest") ?? "1" === a.headers[u.NEXT_ROUTER_PREFETCH_HEADER],
                        aq = (0, h.getRequestMeta)(a, "isRSCRequest") ?? (0, n.f)(a.headers[u.RSC_HEADER]),
                        ar = (0, t.getIsPossibleServerAction)(a),
                        as = (0, m.checkIsAppPPREnabled)(ae.experimental.ppr) && (null == (D = _.routes[ah] ?? _.dynamicRoutes[ah]) ? void 0 : D.renderingMode) === "PARTIALLY_STATIC",
                        at = !1,
                        au = !1,
                        av = as ? N : void 0,
                        aw = as && aq && !ap,
                        ax = (0, h.getRequestMeta)(a, "segmentPrefetchRSCRequest"),
                        ay = !am || (0, q.shouldServeStreamingMetadata)(am, ae.htmlLimitedBots);
                    ao && as && ((al = !1), (ay = !1));
                    let az = !0 === L.isDev || !al || "string" == typeof N || aw,
                        aA = ao && as,
                        aB = null;
                    aa || !al || az || ar || av || aw || (aB = ab);
                    let aC = aB;
                    (!aC && L.isDev && (aC = ab), L.isDev || aa || !al || !aq || aw || (0, k.d)(a.headers));
                    let aD = { ...F, tree: I, pages: J, GlobalError: E(), handler: M, routeModule: L, __next_app__: K };
                    Y && Z && (0, p.setReferenceManifestsSingleton)({ page: H, clientReferenceManifest: Z, serverActionsManifest: Y, serverModuleMap: (0, r.createServerModuleMap)({ serverActionsManifest: Y }) });
                    let aE = a.method || "GET",
                        aF = (0, g.getTracer)(),
                        aG = aF.getActiveScopeSpan();
                    try {
                        let f = L.getVaryHeader(ab, af);
                        b.setHeader("Vary", f);
                        let k = async (c, d) => {
                                let e = new l.NodeNextRequest(a),
                                    f = new l.NodeNextResponse(b);
                                return L.render(e, f, d).finally(() => {
                                    if (!c) return;
                                    c.setAttributes({ "http.status_code": b.statusCode, "next.rsc": !1 });
                                    let d = aF.getRootSpanAttributes();
                                    if (!d) return;
                                    if (d.get("next.span_type") !== i.BaseServerSpan.handleRequest) return void console.warn(`Unexpected root span type '${d.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);
                                    let e = d.get("next.route");
                                    if (e) {
                                        let a = `${aE} ${e}`;
                                        (c.setAttributes({ "next.route": e, "http.route": e, "next.span_name": a }), c.updateName(a));
                                    } else c.updateName(`${aE} ${a.url}`);
                                });
                            },
                            m = async ({ span: e, postponed: f, fallbackRouteParams: g }) => {
                                let i = {
                                        query: R,
                                        params: S,
                                        page: ah,
                                        sharedContext: { buildId: Q },
                                        serverComponentsHmrCache: (0, h.getRequestMeta)(a, "serverComponentsHmrCache"),
                                        fallbackRouteParams: g,
                                        renderOpts: {
                                            App: () => null,
                                            Document: () => null,
                                            pageConfig: {},
                                            ComponentMod: aD,
                                            Component: (0, j.T)(aD),
                                            params: S,
                                            routeModule: L,
                                            page: H,
                                            postponed: f,
                                            shouldWaitOnAllReady: aA,
                                            serveStreamingMetadata: ay,
                                            supportsDynamicResponse: "string" == typeof f || az,
                                            buildManifest: V,
                                            nextFontManifest: W,
                                            reactLoadableManifest: X,
                                            subresourceIntegrityManifest: $,
                                            serverActionsManifest: Y,
                                            clientReferenceManifest: Z,
                                            setIsrStatus: null == ad ? void 0 : ad.setIsrStatus,
                                            dir: c(33873).join(process.cwd(), L.relativeProjectDir),
                                            isDraftMode: aa,
                                            isRevalidate: al && !f && !aw,
                                            botType: an,
                                            isOnDemandRevalidate: ai,
                                            isPossibleServerAction: ar,
                                            assetPrefix: ae.assetPrefix,
                                            nextConfigOutput: ae.output,
                                            crossOrigin: ae.crossOrigin,
                                            trailingSlash: ae.trailingSlash,
                                            previewProps: _.preview,
                                            deploymentId: ae.deploymentId,
                                            enableTainting: ae.experimental.taint,
                                            htmlLimitedBots: ae.htmlLimitedBots,
                                            devtoolSegmentExplorer: ae.experimental.devtoolSegmentExplorer,
                                            reactMaxHeadersLength: ae.reactMaxHeadersLength,
                                            multiZoneDraftMode: !1,
                                            incrementalCache: (0, h.getRequestMeta)(a, "incrementalCache"),
                                            cacheLifeProfiles: ae.experimental.cacheLife,
                                            basePath: ae.basePath,
                                            serverActions: ae.experimental.serverActions,
                                            ...(at ? { nextExport: !0, supportsDynamicResponse: !1, isStaticGeneration: !0, isRevalidate: !0, isDebugDynamicAccesses: at } : {}),
                                            experimental: {
                                                isRoutePPREnabled: as,
                                                expireTime: ae.expireTime,
                                                staleTimes: ae.experimental.staleTimes,
                                                cacheComponents: !!ae.experimental.cacheComponents,
                                                clientSegmentCache: !!ae.experimental.clientSegmentCache,
                                                clientParamParsing: !!ae.experimental.clientParamParsing,
                                                dynamicOnHover: !!ae.experimental.dynamicOnHover,
                                                inlineCss: !!ae.experimental.inlineCss,
                                                authInterrupts: !!ae.experimental.authInterrupts,
                                                clientTraceMetadata: ae.experimental.clientTraceMetadata || [],
                                            },
                                            waitUntil: d.waitUntil,
                                            onClose: (a) => {
                                                b.on("close", a);
                                            },
                                            onAfterTaskError: () => {},
                                            onInstrumentationRequestError: (b, c, d) => L.onRequestError(a, b, d, ad),
                                            err: (0, h.getRequestMeta)(a, "invokeError"),
                                            dev: L.isDev,
                                        },
                                    },
                                    l = await k(e, i),
                                    { metadata: m } = l,
                                    { cacheControl: n, headers: o = {}, fetchTags: p } = m;
                                if ((p && (o[z.NEXT_CACHE_TAGS_HEADER] = p), (a.fetchMetrics = m.fetchMetrics), al && (null == n ? void 0 : n.revalidate) === 0 && !L.isDev && !as)) {
                                    let a = m.staticBailoutInfo,
                                        b = Object.defineProperty(
                                            Error(`Page changed from static to dynamic at runtime ${ab}${(null == a ? void 0 : a.description) ? `, reason: ${a.description}` : ""}
see more here https://nextjs.org/docs/messages/app-static-to-dynamic-error`),
                                            "__NEXT_ERROR_CODE",
                                            { value: "E132", enumerable: !1, configurable: !0 },
                                        );
                                    if (null == a ? void 0 : a.stack) {
                                        let c = a.stack;
                                        b.stack = b.message + c.substring(c.indexOf("\n"));
                                    }
                                    throw b;
                                }
                                return { value: { kind: w.CachedRouteKind.APP_PAGE, html: l, headers: o, rscData: m.flightData, postponed: m.postponed, status: m.statusCode, segmentData: m.segmentData }, cacheControl: n };
                            },
                            n = async ({ hasResolved: c, previousCacheEntry: f, isRevalidating: g, span: i }) => {
                                let j,
                                    k = !1 === L.isDev,
                                    l = c || b.writableEnded;
                                if (ai && ac && !f && !O) return ((null == ad ? void 0 : ad.render404) ? await ad.render404(a, b) : ((b.statusCode = 404), b.end("This page could not be found")), null);
                                if ((aj && (j = (0, x.parseFallbackField)(aj.fallback)), j === x.FallbackMode.PRERENDER && (0, v.isBot)(am) && (!as || ao) && (j = x.FallbackMode.BLOCKING_STATIC_RENDER), (null == f ? void 0 : f.isStale) === -1 && (ai = !0), ai && (j !== x.FallbackMode.NOT_FOUND || f) && (j = x.FallbackMode.BLOCKING_STATIC_RENDER), !O && j !== x.FallbackMode.BLOCKING_STATIC_RENDER && aC && !l && !aa && U && (k || !ak))) {
                                    let b;
                                    if ((k || aj) && j === x.FallbackMode.NOT_FOUND) throw new C.NoFallbackError();
                                    if (as && !aq) {
                                        let c = "string" == typeof (null == aj ? void 0 : aj.fallback) ? aj.fallback : k ? ah : null;
                                        if (((b = await L.handleResponse({ cacheKey: c, req: a, nextConfig: ae, routeKind: e.RouteKind.APP_PAGE, isFallback: !0, prerenderManifest: _, isRoutePPREnabled: as, responseGenerator: async () => m({ span: i, postponed: void 0, fallbackRouteParams: k || au ? (0, o.u)(ah) : null }), waitUntil: d.waitUntil })), null === b)) return null;
                                        if (b) return (delete b.cacheControl, b);
                                    }
                                }
                                let n = ai || g || !av ? void 0 : av;
                                if (at && void 0 !== n) return { cacheControl: { revalidate: 1, expire: void 0 }, value: { kind: w.CachedRouteKind.PAGES, html: y.default.EMPTY, pageData: {}, headers: void 0, status: void 0 } };
                                let p = U && as && ((0, h.getRequestMeta)(a, "renderFallbackShell") || au) ? (0, o.u)(ag) : null;
                                return m({ span: i, postponed: n, fallbackRouteParams: p });
                            },
                            p = async (c) => {
                                var f, g, i, j, k;
                                let l,
                                    o = await L.handleResponse({ cacheKey: aB, responseGenerator: (a) => n({ span: c, ...a }), routeKind: e.RouteKind.APP_PAGE, isOnDemandRevalidate: ai, isRoutePPREnabled: as, req: a, nextConfig: ae, prerenderManifest: _, waitUntil: d.waitUntil });
                                if ((aa && b.setHeader("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate"), L.isDev && b.setHeader("Cache-Control", "no-store, must-revalidate"), !o)) {
                                    if (aB) throw Object.defineProperty(Error("invariant: cache entry required but not generated"), "__NEXT_ERROR_CODE", { value: "E62", enumerable: !1, configurable: !0 });
                                    return null;
                                }
                                if ((null == (f = o.value) ? void 0 : f.kind) !== w.CachedRouteKind.APP_PAGE) throw Object.defineProperty(Error(`Invariant app-page handler received invalid cache entry ${null == (i = o.value) ? void 0 : i.kind}`), "__NEXT_ERROR_CODE", { value: "E707", enumerable: !1, configurable: !0 });
                                let p = "string" == typeof o.value.postponed;
                                al && !aw && (!p || ap) && (O || b.setHeader("x-nextjs-cache", ai ? "REVALIDATED" : o.isMiss ? "MISS" : o.isStale ? "STALE" : "HIT"), b.setHeader(u.NEXT_IS_PRERENDER_HEADER, "1"));
                                let { value: q } = o;
                                if (av) l = { revalidate: 0, expire: void 0 };
                                else if (O && aq && !ap && as) l = { revalidate: 0, expire: void 0 };
                                else if (!L.isDev)
                                    if (aa) l = { revalidate: 0, expire: void 0 };
                                    else if (al) {
                                        if (o.cacheControl)
                                            if ("number" == typeof o.cacheControl.revalidate) {
                                                if (o.cacheControl.revalidate < 1) throw Object.defineProperty(Error(`Invalid revalidate configuration provided: ${o.cacheControl.revalidate} < 1`), "__NEXT_ERROR_CODE", { value: "E22", enumerable: !1, configurable: !0 });
                                                l = { revalidate: o.cacheControl.revalidate, expire: (null == (j = o.cacheControl) ? void 0 : j.expire) ?? ae.expireTime };
                                            } else l = { revalidate: z.CACHE_ONE_YEAR, expire: void 0 };
                                    } else b.getHeader("Cache-Control") || (l = { revalidate: 0, expire: void 0 });
                                if (((o.cacheControl = l), "string" == typeof ax && (null == q ? void 0 : q.kind) === w.CachedRouteKind.APP_PAGE && q.segmentData)) {
                                    b.setHeader(u.NEXT_DID_POSTPONE_HEADER, "2");
                                    let c = null == (k = q.headers) ? void 0 : k[z.NEXT_CACHE_TAGS_HEADER];
                                    O && al && c && "string" == typeof c && b.setHeader(z.NEXT_CACHE_TAGS_HEADER, c);
                                    let d = q.segmentData.get(ax);
                                    return void 0 !== d ? (0, B.sendRenderResult)({ req: a, res: b, generateEtags: ae.generateEtags, poweredByHeader: ae.poweredByHeader, result: y.default.fromStatic(d, u.RSC_CONTENT_TYPE_HEADER), cacheControl: o.cacheControl }) : ((b.statusCode = 204), (0, B.sendRenderResult)({ req: a, res: b, generateEtags: ae.generateEtags, poweredByHeader: ae.poweredByHeader, result: y.default.EMPTY, cacheControl: o.cacheControl }));
                                }
                                let r = (0, h.getRequestMeta)(a, "onCacheEntry");
                                if (r && (await r({ ...o, value: { ...o.value, kind: "PAGE" } }, { url: (0, h.getRequestMeta)(a, "initURL") }))) return null;
                                if (p && av) throw Object.defineProperty(Error("Invariant: postponed state should not be present on a resume request"), "__NEXT_ERROR_CODE", { value: "E396", enumerable: !1, configurable: !0 });
                                if (q.headers) {
                                    let a = { ...q.headers };
                                    for (let [c, d] of ((O && al) || delete a[z.NEXT_CACHE_TAGS_HEADER], Object.entries(a)))
                                        if (void 0 !== d)
                                            if (Array.isArray(d)) for (let a of d) b.appendHeader(c, a);
                                            else ("number" == typeof d && (d = d.toString()), b.appendHeader(c, d));
                                }
                                let s = null == (g = q.headers) ? void 0 : g[z.NEXT_CACHE_TAGS_HEADER];
                                if ((O && al && s && "string" == typeof s && b.setHeader(z.NEXT_CACHE_TAGS_HEADER, s), !q.status || (aq && as) || (b.statusCode = q.status), !O && q.status && G.RedirectStatusCode[q.status] && aq && (b.statusCode = 200), p && b.setHeader(u.NEXT_DID_POSTPONE_HEADER, "1"), aq && !aa)) {
                                    if (void 0 === q.rscData) {
                                        if (q.postponed) throw Object.defineProperty(Error("Invariant: Expected postponed to be undefined"), "__NEXT_ERROR_CODE", { value: "E372", enumerable: !1, configurable: !0 });
                                        return (0, B.sendRenderResult)({ req: a, res: b, generateEtags: ae.generateEtags, poweredByHeader: ae.poweredByHeader, result: q.html, cacheControl: aw ? { revalidate: 0, expire: void 0 } : o.cacheControl });
                                    }
                                    return (0, B.sendRenderResult)({ req: a, res: b, generateEtags: ae.generateEtags, poweredByHeader: ae.poweredByHeader, result: y.default.fromStatic(q.rscData, u.RSC_CONTENT_TYPE_HEADER), cacheControl: o.cacheControl });
                                }
                                let t = q.html;
                                if (!p || O || aq) return (0, B.sendRenderResult)({ req: a, res: b, generateEtags: ae.generateEtags, poweredByHeader: ae.poweredByHeader, result: t, cacheControl: o.cacheControl });
                                if (at)
                                    return (
                                        t.push(
                                            new ReadableStream({
                                                start(a) {
                                                    (a.enqueue(A.ENCODED_TAGS.CLOSED.BODY_AND_HTML), a.close());
                                                },
                                            }),
                                        ),
                                        (0, B.sendRenderResult)({ req: a, res: b, generateEtags: ae.generateEtags, poweredByHeader: ae.poweredByHeader, result: t, cacheControl: { revalidate: 0, expire: void 0 } })
                                    );
                                let v = new TransformStream();
                                return (
                                    t.push(v.readable),
                                    m({ span: c, postponed: q.postponed, fallbackRouteParams: null })
                                        .then(async (a) => {
                                            var b, c;
                                            if (!a) throw Object.defineProperty(Error("Invariant: expected a result to be returned"), "__NEXT_ERROR_CODE", { value: "E463", enumerable: !1, configurable: !0 });
                                            if ((null == (b = a.value) ? void 0 : b.kind) !== w.CachedRouteKind.APP_PAGE) throw Object.defineProperty(Error(`Invariant: expected a page response, got ${null == (c = a.value) ? void 0 : c.kind}`), "__NEXT_ERROR_CODE", { value: "E305", enumerable: !1, configurable: !0 });
                                            await a.value.html.pipeTo(v.writable);
                                        })
                                        .catch((a) => {
                                            v.writable.abort(a).catch((a) => {
                                                console.error("couldn't abort transformer", a);
                                            });
                                        }),
                                    (0, B.sendRenderResult)({ req: a, res: b, generateEtags: ae.generateEtags, poweredByHeader: ae.poweredByHeader, result: t, cacheControl: { revalidate: 0, expire: void 0 } })
                                );
                            };
                        if (!aG) return await aF.withPropagatedContext(a.headers, () => aF.trace(i.BaseServerSpan.handleRequest, { spanName: `${aE} ${a.url}`, kind: g.SpanKind.SERVER, attributes: { "http.method": aE, "http.target": a.url } }, p));
                        await p(aG);
                    } catch (b) {
                        throw (b instanceof C.NoFallbackError || (await L.onRequestError(a, b, { routerKind: "App Router", routePath: H, routeType: "render", revalidateReason: (0, f.c)({ isRevalidate: al, isOnDemandRevalidate: ai }) }, ad)), b);
                    }
                }
            },
            40284: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("Trash2", [
                    ["path", { d: "M3 6h18", key: "d0wm0j" }],
                    ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
                    ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
                    ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
                    ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
                ]);
            },
            41025: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/dynamic-access-async-storage.external.js");
            },
            42593: (a, b, c) => {
                "use strict";
                c.d(b, { v: () => e });
                var d = c(38301);
                function e(a) {
                    let [b, c] = (0, d.useState)(a),
                        [e, f] = (0, d.useState)(a ? "opening" : "closed");
                    return { isPresent: b, state: e };
                }
            },
            43757: (a, b, c) => {
                Promise.resolve().then(c.bind(c, 18177));
            },
            63033: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
            },
            65687: (a, b, c) => {
                "use strict";
                c.d(b, { MH: () => i, MI: () => j, y7: () => h });
                var d = c(21124),
                    e = c(38301),
                    f = c(24515);
                let g = new Set();
                function h(a) {
                    return !!a && g.has(a);
                }
                function i({ src: a, alt: b, fill: c = !0, sizes: i, priority: j = !1, className: k = "", skeletonClassName: l = "", unoptimized: m = !0, draggable: n, onLoadingChange: o }) {
                    let p = h(a),
                        [q, r] = (0, e.useState)(p),
                        s = (0, e.useRef)(o);
                    (0, e.useRef)(a);
                    let t = (0, e.useRef)(null),
                        u = (0, e.useCallback)(() => {
                            (a && g.add(a), r(!0), s.current?.(!0));
                        }, [a]),
                        v = (0, e.useCallback)(
                            (a) => {
                                ((t.current = a), a && a.complete && a.naturalWidth > 0 && u());
                            },
                            [u],
                        ),
                        w = (0, e.useCallback)(() => {
                            u();
                        }, [u]),
                        x = (0, e.useCallback)(() => {
                            u();
                        }, [u]);
                    return (0, d.jsxs)(d.Fragment, {
                        children: [
                            !q &&
                                (0, d.jsx)("div", {
                                    className: `card-skeleton ${l}`,
                                    children: (0, d.jsxs)("svg", {
                                        className: "h-7 w-7 text-white/20 animate-pulse select-none pointer-events-none",
                                        viewBox: "0 0 24 24",
                                        fill: "currentColor",
                                        children: [(0, d.jsx)("circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "2", fill: "none" }), (0, d.jsx)("line", { x1: "2", y1: "12", x2: "22", y2: "12", stroke: "currentColor", strokeWidth: "2" }), (0, d.jsx)("circle", { cx: "12", cy: "12", r: "3.5", stroke: "currentColor", strokeWidth: "2", fill: "#131722" }), (0, d.jsx)("circle", { cx: "12", cy: "12", r: "1.5", fill: "currentColor" })],
                                    }),
                                }),
                            (0, d.jsx)(f.default, { ref: v, src: a, alt: b, fill: c, sizes: i, priority: j, className: `${k} transition-opacity duration-300 ${q ? "opacity-100" : "opacity-0 pointer-events-none"}`, unoptimized: m, draggable: n, onLoad: w, onError: x }),
                        ],
                    });
                }
                function j(a, b) {
                    let c = h(b),
                        [d, f] = (0, e.useState)(c);
                    return { loaded: d, setLoaded: f };
                }
            },
            72937: (a, b, c) => {
                "use strict";
                c.d(b, { i: () => e });
                var d = c(21124);
                function e({ country: a, className: b = "" }) {
                    return "pt-br" === a
                        ? (0, d.jsxs)("svg", { viewBox: "0 0 20 14", width: "18", height: "13", className: `overflow-hidden rounded-xs shadow-xs ${b}`, children: [(0, d.jsx)("rect", { width: "20", height: "14", fill: "#009c3b" }), (0, d.jsx)("polygon", { points: "10,2 18,7 10,12 2,7", fill: "#ffdf00" }), (0, d.jsx)("circle", { cx: "10", cy: "7", r: "3.2", fill: "#002776" }), (0, d.jsx)("path", { d: "M7.2 7.2 Q10 6 12.8 7.6", stroke: "#ffffff", strokeWidth: "0.7", fill: "none" })] })
                        : "en" === a
                          ? (0, d.jsxs)("svg", {
                                viewBox: "0 0 20 14",
                                width: "18",
                                height: "13",
                                className: `overflow-hidden rounded-xs shadow-xs ${b}`,
                                children: [
                                    (0, d.jsx)("rect", { width: "20", height: "14", fill: "#b22234" }),
                                    (0, d.jsx)("rect", { y: "1.08", width: "20", height: "1.08", fill: "#ffffff" }),
                                    (0, d.jsx)("rect", { y: "3.24", width: "20", height: "1.08", fill: "#ffffff" }),
                                    (0, d.jsx)("rect", { y: "5.4", width: "20", height: "1.08", fill: "#ffffff" }),
                                    (0, d.jsx)("rect", { y: "7.56", width: "20", height: "1.08", fill: "#ffffff" }),
                                    (0, d.jsx)("rect", { y: "9.72", width: "20", height: "1.08", fill: "#ffffff" }),
                                    (0, d.jsx)("rect", { y: "11.88", width: "20", height: "1.08", fill: "#ffffff" }),
                                    (0, d.jsx)("rect", { width: "9", height: "7.56", fill: "#3c3b6e" }),
                                    (0, d.jsx)("circle", { cx: "2", cy: "2", r: "0.65", fill: "#ffffff" }),
                                    (0, d.jsx)("circle", { cx: "4.5", cy: "2", r: "0.65", fill: "#ffffff" }),
                                    (0, d.jsx)("circle", { cx: "7", cy: "2", r: "0.65", fill: "#ffffff" }),
                                    (0, d.jsx)("circle", { cx: "3.25", cy: "3.78", r: "0.65", fill: "#ffffff" }),
                                    (0, d.jsx)("circle", { cx: "5.75", cy: "3.78", r: "0.65", fill: "#ffffff" }),
                                    (0, d.jsx)("circle", { cx: "2", cy: "5.56", r: "0.65", fill: "#ffffff" }),
                                    (0, d.jsx)("circle", { cx: "4.5", cy: "5.56", r: "0.65", fill: "#ffffff" }),
                                    (0, d.jsx)("circle", { cx: "7", cy: "5.56", r: "0.65", fill: "#ffffff" }),
                                ],
                            })
                          : (0, d.jsxs)("svg", { viewBox: "0 0 20 14", width: "18", height: "13", className: `overflow-hidden rounded-xs shadow-xs border border-white/20 ${b}`, children: [(0, d.jsx)("rect", { width: "20", height: "14", fill: "#ffffff" }), (0, d.jsx)("circle", { cx: "10", cy: "7", r: "4.2", fill: "#bc002d" })] });
                }
                c(38301);
            },
            76186: (a, b, c) => {
                "use strict";
                function d(a, b, c = !1) {}
                (c.d(b, { m: () => d }), c(38301));
            },
            86439: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/no-fallback-error.external");
            },
        }));
    var b = require("../../../webpack-runtime.js");
    b.C(a);
    var c = b.X(0, [8301, 991, 582, 708, 7633, 1160, 6849, 1072], () => b((b.s = 39541)));
    module.exports = c;
})();
