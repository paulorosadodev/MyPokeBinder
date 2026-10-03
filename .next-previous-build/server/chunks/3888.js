"use strict";
((exports.id = 3888),
    (exports.ids = [3888]),
    (exports.modules = {
        14263: (a, b, c) => {
            c.d(b, { A: () => d });
            let d = (0, c(23339).A)("LoaderCircle", [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]]);
        },
        19463: (a, b, c) => {
            c.d(b, { g: () => O });
            var d = c(21124),
                e = c(38301),
                f = c(7401),
                g = c(43157),
                h = c(79281),
                i = c(95945),
                j = c(4408);
            function k(a, b, c, d) {
                return (0, h.qe)({ tcgdex_card_id: a, card_language: b, card_variant: c, card_condition: d });
            }
            function l(a) {
                let b = 0;
                for (let c of Object.values(a)) b += c;
                return b;
            }
            var m = c(51155),
                n = c(59535),
                o = c(28093),
                p = c(72937),
                q = c(66088),
                r = c(56849),
                s = c(65687),
                t = c(14263);
            function u({ size: a = 16, className: b = "", ariaLabel: c = "Carregando" }) {
                return (0, d.jsx)(t.A, { size: a, role: "status", "aria-label": c, className: `animate-spin text-poke-blue ${b}` });
            }
            var v = c(55716),
                w = c(72190),
                x = c(76186),
                y = c(42593),
                z = c(42830),
                A = c(71613),
                B = c(79944),
                C = c(47089),
                D = c(91942),
                E = c(65783),
                F = c(28074),
                G = c(75234),
                H = c(88285),
                I = c(8849);
            function J({ card: a, shineMode: b }) {
                let c = (0, f.HO)(a.image),
                    [g, h] = (0, e.useState)(() => (0, s.y7)(c));
                return (0, d.jsx)(r.LW, { className: "relative h-full w-full overflow-hidden rounded-lg", maxTilt: 8, maxMove: 3, scale: 1, glareOpacity: 0.2, perspective: 900, shineMode: b, elementTypes: a.types, enableTouch: !0, isLoading: !g, children: (0, d.jsx)(s.MH, { src: c, alt: a.name, sizes: "(max-width: 768px) 50vw, 200px", className: "object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]", onLoadingChange: h }) });
            }
            let K = new Map(),
                L = { "pt-br": "PT-BR", en: "EN", ja: "JA" },
                M = [
                    { value: "pt-br", label: "PT-BR", country: "pt-br" },
                    { value: "en", label: "EN", country: "en" },
                    { value: "ja", label: "JA", country: "ja" },
                ],
                N = [
                    { value: "pt-br", label: "PT-BR", icon: (0, d.jsx)(p.i, { country: "pt-br" }) },
                    { value: "en", label: "EN", icon: (0, d.jsx)(p.i, { country: "en" }) },
                    { value: "ja", label: "JA", icon: (0, d.jsx)(p.i, { country: "ja" }) },
                ];
            function O({ isOpen: a, dexId: b, pokemonName: c, onClose: p, onBack: r, onCardAdded: s }) {
                let [t, O] = (0, e.useState)("pt-br"),
                    [P, Q] = (0, e.useState)("normal"),
                    [R, S] = (0, e.useState)("NM"),
                    [T, U] = (0, e.useState)([]),
                    [V, W] = (0, e.useState)(1),
                    [X, Y] = (0, e.useState)(!1),
                    [Z, $] = (0, e.useState)(!1),
                    [_, aa] = (0, e.useState)(!1),
                    [ab, ac] = (0, e.useState)(null),
                    [ad, ae] = (0, e.useState)([]),
                    [af, ag] = (0, e.useState)({}),
                    [ah, ai] = (0, e.useState)({}),
                    [aj, ak] = (0, e.useState)(null),
                    [al, am] = (0, e.useState)(""),
                    [an, ao] = (0, e.useState)("all"),
                    [ap, aq] = (0, e.useState)(j.Ig),
                    [ar, as] = (0, e.useState)(j.ej),
                    [at, au] = (0, e.useState)(!1),
                    av = (0, e.useRef)(new Set()),
                    aw = (0, e.useRef)({}),
                    ax = (0, e.useRef)(new Set()),
                    ay = ad.length > 0;
                (0, x.m)(a, p, ay);
                let { isPresent: az, state: aA } = (0, y.v)(a),
                    aB = (0, e.useCallback)(async () => {
                        if (_ || Z || !X) return;
                        let a = c ? c.replace(/[♀♂]/g, "").trim() : al.trim();
                        if (a)
                            try {
                                aa(!0);
                                let d = V + 1,
                                    e = c ? `${b ?? 0}_${a}_page_${d}` : `catalog_${a}_page_${d}`,
                                    f = K.get(e);
                                if (f) {
                                    (U((a) => [...a, ...(f.cards ?? [])]), W(d), Y(f.hasMore ?? !1), aa(!1));
                                    return;
                                }
                                let g = c && b ? `&dexId=${b}` : "",
                                    h = await fetch(`/api/search?name=${encodeURIComponent(a)}${g}&page=${d}&pageSize=${j.xJ}`),
                                    i = await h.json();
                                if (!h.ok) {
                                    let a = i.error || "Erro ao carregar mais cartas";
                                    throw Error(a);
                                }
                                (K.set(e, i), U((a) => [...a, ...(i.cards ?? [])]), W(d), Y(i.hasMore ?? !1));
                            } catch (a) {
                                ac(a instanceof Error ? a.message : "Falha ao carregar mais cartas");
                            } finally {
                                aa(!1);
                            }
                    }, [V, X, _, Z, c, b, al]),
                    aC = (0, e.useMemo)(() => (0, j.VY)(T, { searchTerm: c ? al : "", rarityFilter: an, expansionFilter: ap, artistFilter: ar, dexId: b ?? void 0 }), [T, al, an, ap, ar, b, c]),
                    aD = (0, e.useMemo)(() => (0, j.SI)(T.map((a) => a.setName)), [T]),
                    aE = (0, e.useMemo)(() => (0, j.ay)(T.map((a) => a.artist)), [T]);
                al.trim() || "all" !== an || ap !== j.Ig || j.ej;
                let aF = (0, e.useMemo)(
                        () =>
                            (function (...a) {
                                let b = {};
                                for (let c of a) for (let [a, d] of Object.entries(c)) b[a] = (b[a] ?? 0) + d;
                                return b;
                            })(ah, af),
                        [ah, af],
                    ),
                    aG = (0, m.X)({ hasMore: X, isLoading: _ || Z, onLoadMore: aB, root: aj, enabled: a }),
                    aH = async (a) => {
                        if (!av.current.has(a.id))
                            try {
                                (av.current.add(a.id), ae((b) => (b.includes(a.id) ? b : [...b, a.id])), ac(null));
                                let c = await fetch("/api/cards", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tcgdex_card_id: a.id, pokemon_dex_id: void 0 !== a.dexId ? a.dexId : b || null, card_name: a.name, card_image_url: (0, f.HO)(a.image), card_set_name: a.setName || "", card_rarity: a.rarity || "", card_artist: a.artist || "", card_condition: R, card_types: a.types || [], card_language: t, card_variant: P }) }),
                                    d = await c.json();
                                if (!c.ok) throw Error(d.error || "Erro ao adicionar carta");
                                let e = (function (a, b, c, d, e) {
                                    let f = k(b, c, d, e);
                                    return { ...a, [f]: (a[f] ?? 0) + 1 };
                                })(aw.current, a.id, t, P, R);
                                ((aw.current = e), ag(e), ax.current.add(a.id), s(d.card));
                                let g = l(e);
                                z.oR.success(1 === g ? "Carta adicionada \xe0 Cole\xe7\xe3o!" : `${g} cartas adicionadas \xe0 Cole\xe7\xe3o!`, { id: "card-search-carta-adicionada", description: `${a.name} (${(0, h.FB)(P)}) cadastrada com sucesso.` });
                            } catch (b) {
                                let a = b instanceof Error ? b.message : "Erro ao adicionar";
                                (ac(a), z.oR.error("Erro ao adicionar carta", { description: a }));
                            } finally {
                                (av.current.delete(a.id), ae((b) => b.filter((b) => b !== a.id)));
                            }
                    };
                if (!az) return null;
                let aI = +("all" !== an) + +(ap !== j.Ig) + +(ar !== j.ej),
                    aJ = l(af),
                    aK = aJ > 0 ? (0, d.jsxs)("span", { "aria-live": "polite", className: "inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-emerald-200 whitespace-nowrap", children: [(0, d.jsx)(A.A, { size: 11, className: "shrink-0" }), 1 === aJ ? "1 adicionada" : `${aJ} adicionadas`] }) : null;
                return (0, d.jsx)("div", {
                    className: "modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-sm",
                    "data-overlay-state": aA,
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": "Buscar carta",
                    onClick: (a) => {
                        a.target !== a.currentTarget || ay || p();
                    },
                    children: (0, d.jsxs)("div", {
                        className: "modal-surface flex h-dvh max-h-none w-full max-w-none flex-col overflow-hidden rounded-none border-0 bg-[#12151d] shadow-2xl sm:h-[85vh] sm:max-h-[820px] sm:max-w-3xl sm:rounded-2xl sm:border sm:border-white/10 md:max-w-5xl lg:max-w-6xl",
                        children: [
                            (0, d.jsxs)("div", {
                                className: "flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5 sm:px-6 sm:py-3.5",
                                children: [
                                    (0, d.jsxs)("div", {
                                        className: "flex min-w-0 items-center gap-2.5 sm:gap-3",
                                        children: [
                                            r ? (0, d.jsxs)("button", { type: "button", onClick: r, "aria-label": "Voltar ao seletor do binder", className: "flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white sm:h-9 sm:rounded-xl", children: [(0, d.jsx)(B.A, { size: 15 }), (0, d.jsx)("span", { className: "hidden sm:inline", children: "Voltar" })] }) : null,
                                            (0, d.jsx)("div", {
                                                className: "min-w-0",
                                                children: c
                                                    ? (0, d.jsxs)(d.Fragment, {
                                                          children: [
                                                              (0, d.jsxs)("div", { className: "flex items-center gap-2 sm:gap-2.5", children: [(0, d.jsx)("h2", { className: "text-lg sm:text-xl font-bold text-white tracking-tight", children: c }), b && (0, d.jsxs)("span", { className: "rounded-md border border-white/10 bg-white/10 px-2 py-0.5 font-mono text-[11px] sm:text-xs font-semibold text-slate-300", children: ["#", String(b).padStart(3, "0")] }), aK] }),
                                                              (0, d.jsx)("p", { className: "hidden sm:block mt-0.5 text-xs text-slate-400", children: "Escolha o idioma e a vers\xe3o f\xedsica, depois adicione \xe0 cole\xe7\xe3o" }),
                                                          ],
                                                      })
                                                    : (0, d.jsxs)(d.Fragment, {
                                                          children: [(0, d.jsxs)("div", { className: "flex items-center gap-2 sm:gap-2.5", children: [(0, d.jsx)("h2", { className: "text-lg sm:text-xl font-bold text-white tracking-tight", children: "Adicionar Carta \xe0 Cole\xe7\xe3o" }), aK] }), (0, d.jsx)("p", { className: "hidden sm:block mt-0.5 text-xs text-slate-400", children: "Busque no cat\xe1logo oficial do Pok\xe9mon TCG f\xedsico (Pok\xe9mon, Treinadores e Energias)" })],
                                                      }),
                                            }),
                                        ],
                                    }),
                                    (0, d.jsx)("button", { type: "button", onClick: p, disabled: ay, "aria-label": "Fechar", className: "flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:h-9 sm:w-9 sm:rounded-xl", children: (0, d.jsx)(C.A, { size: 18 }) }),
                                ],
                            }),
                            (0, d.jsxs)("div", {
                                className: "flex shrink-0 flex-col gap-2.5 border-b border-white/10 bg-black/20 px-3 py-2.5 sm:px-6 sm:py-3",
                                children: [
                                    (0, d.jsx)(v.h, {
                                        searchTerm: al,
                                        onSearchChange: am,
                                        showFilters: at,
                                        onToggleFilters: () => au((a) => !a),
                                        activeFilterCount: aI,
                                        filterButtonAriaLabel: "Alternar filtros de raridade, expans\xe3o e ilustrador",
                                        children: (0, d.jsxs)("div", {
                                            className: "grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2.5 pt-0.5 w-full",
                                            children: [
                                                (0, d.jsx)(q.l, { value: an, onChange: ao, options: g.OI, icon: (0, d.jsx)(D.A, { size: 13 }), ariaLabel: "Filtrar cat\xe1logo por raridade", className: "w-full min-w-0", size: "sm" }),
                                                (0, d.jsx)(q.l, { value: ap, onChange: aq, options: aD, icon: (0, d.jsx)(E.A, { size: 13 }), ariaLabel: "Filtrar cat\xe1logo por expans\xe3o", className: "w-full min-w-0", size: "sm" }),
                                                (0, d.jsx)(q.l, { value: ar, onChange: as, options: aE, icon: (0, d.jsx)(F.A, { size: 13 }), ariaLabel: "Filtrar cat\xe1logo por ilustrador", className: "col-span-2 sm:col-span-1 w-full min-w-0", size: "sm", align: "right" }),
                                            ],
                                        }),
                                    }),
                                    (0, d.jsxs)("div", {
                                        className: "modal-transient-content flex flex-col gap-1.5 sm:gap-2 border-t border-white/10 pt-2 sm:pt-2.5",
                                        children: [
                                            (0, d.jsxs)("div", { className: "flex items-center gap-1.5 text-slate-400", children: [(0, d.jsx)(G.A, { size: 11, className: "text-poke-blue shrink-0" }), (0, d.jsx)("span", { className: "text-[11px] sm:text-xs font-semibold tracking-wide text-slate-300", children: "Sua carta" })] }),
                                            (0, d.jsxs)("div", {
                                                className: "grid grid-cols-3 gap-1.5 sm:hidden",
                                                children: [(0, d.jsx)(q.l, { value: t, onChange: O, options: N, ariaLabel: "Idioma da carta a ser adicionada", size: "sm", className: "w-full" }), (0, d.jsx)(q.l, { value: P, onChange: Q, options: h.AI, ariaLabel: "Vers\xe3o f\xedsica da carta a ser adicionada", size: "sm", className: "w-full" }), (0, d.jsx)(q.l, { value: R, onChange: S, options: i.Ey, ariaLabel: "Estado de conserva\xe7\xe3o da carta", size: "sm", className: "w-full" })],
                                            }),
                                            (0, d.jsxs)("div", {
                                                className: "hidden sm:grid sm:grid-cols-3 sm:gap-2.5",
                                                children: [(0, d.jsx)(o.G, { value: t, onChange: O, options: M, size: "sm", fullWidth: !0, ariaLabel: "Idioma da carta a ser adicionada" }), (0, d.jsx)(o.G, { value: P, onChange: Q, options: h.xV, size: "sm", fullWidth: !0, ariaLabel: "Vers\xe3o f\xedsica da carta a ser adicionada" }), (0, d.jsx)(o.G, { value: R, onChange: S, options: i.Fx, size: "sm", fullWidth: !0, ariaLabel: "Estado de conserva\xe7\xe3o da carta" })],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            ab && (0, d.jsx)("div", { className: "mx-4 sm:mx-6 mt-2.5 sm:mt-3 shrink-0 rounded-lg border border-red-500/30 bg-red-500/15 p-2.5 sm:p-3 text-xs text-red-200", children: ab }),
                            (0, d.jsx)("div", {
                                ref: ak,
                                className: "flex-1 overflow-y-auto p-3 sm:p-6",
                                children: Z
                                    ? (0, d.jsx)("div", { className: "flex h-full min-h-[250px] flex-col items-center justify-center", children: (0, d.jsx)(n.i, { message: "Carregando cartas...", size: "md" }) })
                                    : 0 === T.length
                                      ? c || al.trim()
                                          ? (0, d.jsxs)("div", { className: "flex h-full min-h-[250px] flex-col items-center justify-center gap-2 text-slate-500", children: [(0, d.jsx)(H.A, { size: 32, className: "text-slate-600" }), (0, d.jsx)("span", { className: "text-sm", children: "Nenhuma carta com imagem encontrada." })] })
                                          : (0, d.jsxs)("div", {
                                                className: "flex h-full min-h-[250px] flex-col items-center justify-center gap-2 text-center text-slate-500",
                                                children: [(0, d.jsx)(H.A, { size: 32, className: "text-slate-600" }), (0, d.jsx)("span", { className: "text-sm font-semibold text-white", children: "Pesquise no cat\xe1logo do Pok\xe9mon TCG" }), (0, d.jsx)("span", { className: "text-xs text-slate-400 max-w-sm", children: "Digite o nome, Pok\xe9dex (#001–#1025), n\xfamero de cole\xe7\xe3o (ex: 049, XY123, 25/165) ou combine (ex: Snivy 049, Venusaur (XY123))." })],
                                            })
                                      : 0 === aC.length
                                        ? (0, d.jsxs)("div", {
                                              className: "flex h-full min-h-[250px] flex-col items-center justify-center gap-3 text-center text-slate-500",
                                              children: [
                                                  (0, d.jsx)(H.A, { size: 32, className: "text-slate-600" }),
                                                  (0, d.jsx)("span", { className: "text-sm text-white", children: "Nenhuma carta encontrada" }),
                                                  (0, d.jsx)("span", { className: "text-xs", children: "Tente ajustar a busca ou os filtros." }),
                                                  (0, d.jsx)("button", {
                                                      type: "button",
                                                      onClick: () => {
                                                          (am(""), ao("all"), aq(j.Ig), as(j.ej));
                                                      },
                                                      className: "rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white",
                                                      children: "Limpar filtros",
                                                  }),
                                              ],
                                          })
                                        : (0, d.jsxs)("div", {
                                              className: "flex flex-col gap-4 sm:gap-6",
                                              children: [
                                                  (0, d.jsx)("div", {
                                                      className: "grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
                                                      children: aC.map((a, b) => {
                                                          let c = ad.includes(a.id),
                                                              e = aF[k(a.id, t, P, R)] ?? 0,
                                                              f = (function (a, b) {
                                                                  let c = `${b}_`,
                                                                      d = 0;
                                                                  for (let [b, e] of Object.entries(a)) b.startsWith(c) && (d += e);
                                                                  return d;
                                                              })(aF, a.id),
                                                              i = 0 === f,
                                                              j =
                                                                  f > 0 && 0 === e
                                                                      ? (function (a, b) {
                                                                            let c = `${b}_`;
                                                                            return Object.entries(a)
                                                                                .filter(([a]) => a.startsWith(c))
                                                                                .map(([a, b]) => {
                                                                                    let d = a.slice(c.length).split("_"),
                                                                                        e = d.pop() ?? "NM",
                                                                                        f = d.pop() ?? "normal";
                                                                                    return { language: d.join("_"), variant: f, condition: e, count: b };
                                                                                });
                                                                        })(aF, a.id)
                                                                      : null,
                                                              l = `${L[t]} \xb7 ${(0, h.FB)(P)} \xb7 ${R}`,
                                                              m = e > 0 ? `voc\xea j\xe1 tem ${1 === e ? "1 exemplar" : `${e} exemplares`} nesta configura\xe7\xe3o` : f > 0 ? `voc\xea tem ${1 === f ? "1 exemplar" : `${f} exemplares`} em outra configura\xe7\xe3o` : null,
                                                              n = (0, w.O)(b),
                                                              o = a.rarity ? (0, g._I)(a.rarity, a.name) : null,
                                                              p = (0, h.WE)(P, a.rarity, a.image, a.name);
                                                          return (0, d.jsxs)(
                                                              "div",
                                                              {
                                                                  className: `group relative flex h-full flex-col justify-between gap-1.5 sm:gap-2 rounded-xl border p-2 sm:p-2.5 transition-all duration-200 ${c ? "border-poke-blue bg-poke-blue/15 ring-2 ring-poke-blue/40" : i ? "border-white/5 bg-white/[0.015]" : "border-white/10 bg-white/[0.03] hover:border-poke-blue/50 hover:bg-white/[0.07]"} ${n.className}`,
                                                                  style: n.style,
                                                                  children: [
                                                                      (0, d.jsxs)("div", {
                                                                          className: "relative aspect-[8/11] w-full shrink-0 cursor-pointer",
                                                                          onClick: () => aH(a),
                                                                          children: [
                                                                              (0, d.jsx)("div", { "data-missing": i ? "true" : void 0, className: `h-full w-full ${i && !c ? "opacity-60 saturate-50 transition-opacity duration-200 group-hover:opacity-90" : ""}`, children: (0, d.jsx)(J, { card: a, shineMode: p }) }),
                                                                              i && !c ? (0, d.jsx)("div", { className: "pointer-events-none absolute inset-0 rounded-lg bg-black/25", "aria-hidden": "true" }) : null,
                                                                              e > 0 && !c
                                                                                  ? (0, d.jsxs)("span", { "data-owned-count": "matching", title: `${1 === e ? "1 exemplar" : `${e} exemplares`} de ${a.name} (${l})`, className: "absolute top-1.5 right-1.5 z-10 flex h-4.5 sm:h-5 items-center rounded bg-poke-blue px-1 font-mono text-[8px] font-extrabold text-white shadow-md sm:px-1.5 sm:text-[10px]", children: ["x", e] })
                                                                                  : j && !c
                                                                                    ? (0, d.jsxs)("span", {
                                                                                          "data-owned-count": "other",
                                                                                          title: `Voc\xea tem ${j.map((a) => `${a.count}\xd7 ${L[a.language] ?? a.language.toUpperCase()}${"normal" !== a.variant ? ` ${(0, h.FB)(a.variant)}` : ""} ${a.condition}`).join(" \xb7 ")}`,
                                                                                          className: "absolute top-1.5 right-1.5 z-10 flex h-4.5 sm:h-5 items-center gap-0.5 rounded bg-black/65 px-1 font-mono text-[8px] font-bold text-slate-300 ring-1 ring-white/20 backdrop-blur-sm sm:px-1.5 sm:text-[10px]",
                                                                                          children: [(0, d.jsx)(A.A, { size: 9, className: "shrink-0 text-emerald-300" }), "x", f],
                                                                                      })
                                                                                    : null,
                                                                          ],
                                                                      }),
                                                                      (0, d.jsxs)("div", {
                                                                          className: "flex min-w-0 flex-1 flex-col justify-center gap-0.5 sm:gap-1 py-0.5",
                                                                          children: [
                                                                              (0, d.jsx)("div", { className: "flex h-4 items-center min-w-0", children: (0, d.jsx)("span", { className: `truncate text-xs font-semibold transition-colors ${i ? "text-slate-400" : "text-white group-hover:text-poke-blue"}`, title: a.name, children: a.name }) }),
                                                                              (0, d.jsxs)("div", {
                                                                                  className: "flex h-4 sm:h-5 items-center justify-between gap-1 min-w-0",
                                                                                  children: [
                                                                                      (0, d.jsx)("span", { className: "truncate text-[10px] sm:text-[11px] text-slate-400 min-w-0 flex-1", title: a.setName || "Cole\xe7\xe3o", children: a.setName || "Cole\xe7\xe3o" }),
                                                                                      o && (0, d.jsx)("span", { title: o.label, className: `shrink-0 inline-flex items-center rounded px-1 sm:px-1.5 py-0.5 text-[8.5px] sm:text-[9px] font-semibold border max-w-[70px] sm:max-w-[95px] ${o.badgeClasses}`, children: (0, d.jsx)("span", { className: "truncate", children: o.label }) }),
                                                                                  ],
                                                                              }),
                                                                          ],
                                                                      }),
                                                                      (0, d.jsxs)("button", {
                                                                          type: "button",
                                                                          onClick: (b) => {
                                                                              (b.stopPropagation(), aH(a));
                                                                          },
                                                                          disabled: c,
                                                                          "aria-label": m ? `${e > 0 ? `Adicionar mais 1 c\xf3pia de ${a.name} (${l}) \xe0 Cole\xe7\xe3o` : `Adicionar ${a.name} (${l}) \xe0 Cole\xe7\xe3o`} — ${m}` : `${e > 0 ? `Adicionar mais 1 c\xf3pia de ${a.name} (${l}) \xe0 Cole\xe7\xe3o` : `Adicionar ${a.name} (${l}) \xe0 Cole\xe7\xe3o`}`,
                                                                          title: `${e > 0 ? "Adicionar mais 1 c\xf3pia id\xeantica" : "Adicionar"} de ${a.name} (${l}) \xe0 Cole\xe7\xe3o${m ? ` — ${m}` : ""}`,
                                                                          className: "mt-auto flex h-6.5 sm:h-7 w-full cursor-pointer items-center justify-center gap-1 rounded-md bg-white/10 px-1 text-[10.5px] sm:text-[11px] font-semibold text-white transition-colors hover:bg-poke-blue group-hover:bg-poke-blue disabled:opacity-60",
                                                                          children: [c ? (0, d.jsx)(u, { size: 12, className: "text-white" }) : e > 0 ? (0, d.jsx)(A.A, { size: 12, className: "shrink-0 text-emerald-300" }) : (0, d.jsx)(I.A, { size: 12, className: "shrink-0" }), (0, d.jsx)("span", { className: "whitespace-nowrap", children: e > 0 ? "+1" : "Adicionar" })],
                                                                      }),
                                                                  ],
                                                              },
                                                              a.id,
                                                          );
                                                      }),
                                                  }),
                                                  (0, d.jsx)("div", { ref: aG, className: "flex min-h-8 items-center justify-center", children: _ && (0, d.jsxs)("div", { className: "flex items-center gap-2 text-xs text-slate-400", children: [(0, d.jsx)(u, { size: 16 }), (0, d.jsx)("span", { children: "Carregando mais cartas..." })] }) }),
                                              ],
                                          }),
                            }),
                        ],
                    }),
                });
            }
        },
        24417: (a, b, c) => {
            c.d(b, { A: () => d });
            let d = (0, c(23339).A)("ArrowDown", [
                ["path", { d: "M12 5v14", key: "s699le" }],
                ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }],
            ]);
        },
        28093: (a, b, c) => {
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
        37912: (a, b, c) => {
            c.d(b, { A: () => d });
            let d = (0, c(23339).A)("SlidersHorizontal", [
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
        55716: (a, b, c) => {
            c.d(b, { h: () => i });
            var d = c(21124);
            c(38301);
            var e = c(88285),
                f = c(47089),
                g = c(37912),
                h = c(29589);
            function i({ searchTerm: a, onSearchChange: b, placeholder: c = "Buscar por pok\xe9mon, n\xfamero, cole\xe7\xe3o ou pok\xe9dex...", placeholderClassName: i = "left-8.5 right-8 text-xs sm:left-10 sm:right-9 sm:text-sm", showFilters: j, onToggleFilters: k, activeFilterCount: l = 0, filterButtonAriaLabel: m = "Alternar filtros", children: n, className: o = "" }) {
                return (0, d.jsxs)("div", {
                    className: `flex shrink-0 flex-col ${j ? "gap-2.5 sm:gap-3" : "gap-0"} ${o}`,
                    children: [
                        (0, d.jsxs)("div", {
                            className: "flex items-center gap-2",
                            children: [
                                (0, d.jsxs)("div", {
                                    className: "relative min-w-0 flex-1",
                                    children: [
                                        (0, d.jsx)(e.A, { size: 15, className: "pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-slate-500 z-20 sm:left-3.5 sm:h-4 sm:w-4" }),
                                        (0, d.jsx)(h.D, { type: "text", value: a, onChange: (a) => b(a.target.value), placeholder: c, placeholderClassName: i, className: "w-full h-9 sm:h-10 rounded-xl border border-white/10 bg-white/5 py-2 sm:py-2.5 pr-8 sm:pr-9 pl-8.5 sm:pl-10 text-xs sm:text-sm text-white transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none" }),
                                        a ? (0, d.jsx)("button", { type: "button", onClick: () => b(""), "aria-label": "Limpar busca", className: "absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-500 hover:text-white z-20 sm:right-3", children: (0, d.jsx)(f.A, { size: 14, className: "sm:h-[15px] sm:w-[15px]" }) }) : null,
                                    ],
                                }),
                                (0, d.jsxs)("button", {
                                    type: "button",
                                    onClick: k,
                                    "aria-label": m,
                                    "aria-expanded": j,
                                    className: `flex h-9 sm:h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border px-2.5 sm:px-3 text-xs font-semibold transition-colors ${j || l > 0 ? "border-poke-blue/60 bg-poke-blue/20 text-white" : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"}`,
                                    children: [(0, d.jsx)(g.A, { size: 13, className: l > 0 ? "text-poke-blue" : "text-slate-400" }), (0, d.jsx)("span", { className: "inline", children: "Filtros" }), l > 0 && (0, d.jsx)("span", { className: "flex h-4 min-w-4 items-center justify-center rounded-full bg-poke-blue px-1 text-[10px] font-bold text-white", children: l })],
                                }),
                            ],
                        }),
                        n ? (0, d.jsx)("div", { className: `grid transition-all duration-300 ease-in-out ${j ? "grid-rows-[1fr] opacity-100 border-t border-white/10 pt-2.5 sm:pt-3 mt-1 sm:mt-1.5" : "grid-rows-[0fr] opacity-0 border-t-0 pt-0 mt-0 pointer-events-none"}`, children: (0, d.jsx)("div", { className: "overflow-hidden", children: n }) }) : null,
                    ],
                });
            }
        },
        70584: (a, b, c) => {
            c.d(b, { A: () => d });
            let d = (0, c(23339).A)("ArrowUp", [
                ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
                ["path", { d: "M12 19V5", key: "x0mq9r" }],
            ]);
        },
        86773: (a, b, c) => {
            c.d(b, { A: () => d });
            let d = (0, c(23339).A)("ArrowUpDown", [
                ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
                ["path", { d: "M17 20V4", key: "1ejh1v" }],
                ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
                ["path", { d: "M7 4v16", key: "1glfcx" }],
            ]);
        },
    }));
