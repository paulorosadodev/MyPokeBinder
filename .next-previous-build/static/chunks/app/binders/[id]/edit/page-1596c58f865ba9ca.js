(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [9895],
    {
        1360: (e, s, t) => {
            "use strict";
            t.d(s, { A: () => a });
            let a = (0, t(1847).A)("Trash2", [
                ["path", { d: "M3 6h18", key: "d0wm0j" }],
                ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
                ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
                ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
                ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }],
            ]);
        },
        2148: (e, s, t) => {
            "use strict";
            t.d(s, { BinderEditClient: () => y });
            var a = t(5155),
                r = t(2115),
                l = t(63),
                o = t(2619),
                n = t.n(o),
                i = t(8696),
                d = t(5626),
                c = t(9708),
                x = t(9068),
                m = t(9347),
                h = t(1360);
            let b = (0, t(1847).A)("TriangleAlert", [
                ["path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3", key: "wmoenq" }],
                ["path", { d: "M12 9v4", key: "juzpu7" }],
                ["path", { d: "M12 17h.01", key: "p32p05" }],
            ]);
            var u = t(8720),
                p = t(5512),
                f = t(8463),
                g = t(3263),
                j = t(1910),
                w = t(6092),
                v = t(7997);
            let N = { "1x1": 1, "2x2": 4, "3x3": 9, "3x4": 12 };
            function y(e) {
                var s;
                let { binder: t, initialSlots: o } = e,
                    y = (0, l.useRouter)(),
                    { mutate: k } = (0, i.iX)(),
                    [_, C] = (0, r.useState)(t.name),
                    [E, z] = (0, r.useState)(t.description || ""),
                    [A, S] = (0, r.useState)(t.cover_theme || "classic_red"),
                    [T, M] = (0, r.useState)(null != (s = t.cover_pokemon_dex_id) ? s : null),
                    [P, B] = (0, r.useState)(t.is_public),
                    [D, O] = (0, r.useState)(t.is_featured),
                    [L, R] = (0, r.useState)(t.total_pages),
                    [q, V] = (0, r.useState)(!1),
                    [I, G] = (0, r.useState)(!1),
                    [H, F] = (0, r.useState)(!1),
                    [J, X] = (0, r.useState)(!1),
                    [Z, K] = (0, r.useState)(null);
                ((0, w.m)(H, () => F(!1), q), (0, w.m)(J, () => X(!1), I));
                let { isPresent: Q, state: U } = (0, v.v)(H),
                    { isPresent: W, state: Y } = (0, v.v)(J),
                    $ = N[t.grid_type],
                    ee = (0, j.r)(L) * $,
                    es = (0, r.useMemo)(() => (L >= t.total_pages ? [] : o.filter((e) => e.page_number > (0, j.r)(L) && !!e.user_card_id)), [L, t.total_pages, o]),
                    et = (0, r.useMemo)(() => o.filter((e) => !!e.user_card_id).length, [o]),
                    ea = async () => {
                        (V(!0), K(null));
                        try {
                            let e = await fetch("/api/binders/".concat(t.id), { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: _.trim(), description: E.trim(), cover_theme: A, cover_pokemon_dex_id: T, is_public: P, is_featured: D, total_pages: L }) });
                            if (!e.ok) {
                                let s = await e.json().catch(() => ({}));
                                throw Error(s.error || "Erro ao salvar altera\xe7\xf5es");
                            }
                            (await k("/api/binders"), u.oR.success("Estrutura do binder atualizada!"), y.push("/binders/".concat(t.id)));
                        } catch (e) {
                            (K(e.message || "Erro inesperado ao salvar"), V(!1), F(!1));
                        }
                    },
                    er = async () => {
                        G(!0);
                        try {
                            let e = await fetch("/api/binders/".concat(t.id), { method: "DELETE" });
                            if (!e.ok) {
                                let s = await e.json().catch(() => ({}));
                                throw Error(s.error || "Erro ao excluir binder");
                            }
                            (u.oR.success("Binder exclu\xeddo. As cartas voltaram para a cole\xe7\xe3o!"), y.push("/"), y.refresh());
                        } catch (e) {
                            (u.oR.error(e.message || "Erro ao excluir o binder"), G(!1), X(!1));
                        }
                    };
                return (0, a.jsxs)("div", {
                    className: "flex min-h-screen flex-col bg-[#0a0c10] text-slate-100",
                    children: [
                        (0, a.jsxs)("main", {
                            className: "mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16",
                            children: [
                                (0, a.jsxs)("div", {
                                    className: "flex items-center justify-between border-b border-white/10 pb-4",
                                    children: [(0, a.jsxs)(n(), { href: "/binders/".concat(t.id), className: "flex items-center gap-2 text-xs font-semibold text-slate-400 transition-colors hover:text-white", children: [(0, a.jsx)(d.A, { size: 16 }), (0, a.jsx)("span", { children: "Voltar ao Binder" })] }), (0, a.jsxs)("h1", { className: "text-sm font-bold text-slate-300", children: ["Editar Estrutura: ", (0, a.jsx)("span", { className: "text-white", children: t.name })] })],
                                }),
                                Z && (0, a.jsx)("div", { className: "rounded-xl border border-red-500/40 bg-red-500/10 p-3.5 text-xs text-red-300", children: Z }),
                                (0, a.jsxs)("div", {
                                    className: "grid grid-cols-1 gap-8 lg:grid-cols-12",
                                    children: [
                                        (0, a.jsxs)("form", {
                                            onSubmit: (e) => ((e.preventDefault(), _.trim()) ? (es.length > 0 ? void F(!0) : void ea()) : void K("O nome do binder \xe9 obrigat\xf3rio.")),
                                            className: "flex flex-col gap-6 lg:col-span-7",
                                            children: [
                                                (0, a.jsxs)("div", {
                                                    className: "flex flex-col gap-2",
                                                    children: [
                                                        (0, a.jsxs)("label", { className: "text-xs font-bold text-slate-300", children: ["Nome do Binder ", (0, a.jsx)("span", { className: "text-red-400", children: "*" })] }),
                                                        (0, a.jsx)("input", { type: "text", maxLength: 60, value: _, onChange: (e) => C(e.target.value), className: "h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 text-sm text-white placeholder-slate-500 focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none" }),
                                                    ],
                                                }),
                                                (0, a.jsxs)("div", {
                                                    className: "flex flex-col gap-2",
                                                    children: [(0, a.jsx)("label", { className: "text-xs font-bold text-slate-300", children: "Descri\xe7\xe3o" }), (0, a.jsx)("textarea", { rows: 3, maxLength: 200, value: E, onChange: (e) => z(e.target.value), className: "w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white placeholder-slate-500 focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none" })],
                                                }),
                                                (0, a.jsxs)("div", {
                                                    className: "flex flex-col gap-2.5",
                                                    children: [
                                                        (0, a.jsx)("label", { className: "text-xs font-bold text-slate-300", children: "Tema da Capa" }),
                                                        (0, a.jsx)("div", {
                                                            className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
                                                            children: Object.values(g.wZ).map((e) => {
                                                                let s = A === e.id;
                                                                return (0, a.jsxs)(
                                                                    "button",
                                                                    {
                                                                        type: "button",
                                                                        onClick: () => S(e.id),
                                                                        className: "flex cursor-pointer items-center gap-2 rounded-xl border p-2 text-left transition-all ".concat(s ? "border-white bg-white/10" : "border-white/10 bg-white/[0.02] hover:border-white/20"),
                                                                        children: [(0, a.jsx)("div", { className: "h-5 w-5 shrink-0 rounded-full border border-white/20", style: { backgroundColor: e.primaryColor } }), (0, a.jsx)("span", { className: "block truncate text-xs font-semibold text-white", children: e.name })],
                                                                    },
                                                                    e.id,
                                                                );
                                                            }),
                                                        }),
                                                    ],
                                                }),
                                                (0, a.jsx)(f.y, { value: T, onChange: M }),
                                                (0, a.jsxs)("div", {
                                                    className: "flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-4",
                                                    children: [
                                                        (0, a.jsxs)("div", {
                                                            className: "flex items-center justify-between",
                                                            children: [(0, a.jsx)("span", { className: "text-xs font-bold text-slate-300", children: "Formato do Grid" }), (0, a.jsxs)("div", { className: "flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/40 px-2 py-0.5 text-xs font-mono text-slate-300", children: [(0, a.jsx)(c.A, { size: 12, className: "text-slate-400" }), (0, a.jsxs)("span", { children: ["Grid ", t.grid_type, " (Imut\xe1vel)"] })] })],
                                                        }),
                                                        (0, a.jsx)("p", { className: "text-[11px] text-slate-400", children: "O formato do grid \xe9 fixo para manter a consist\xeancia f\xedsica e a propor\xe7\xe3o dos compartimentos." }),
                                                    ],
                                                }),
                                                (0, a.jsxs)("div", {
                                                    className: "flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4",
                                                    children: [
                                                        (0, a.jsxs)("div", { className: "flex items-center justify-between", children: [(0, a.jsx)("label", { className: "text-xs font-bold text-slate-300", children: "Total de P\xe1ginas (1 a 50)" }), (0, a.jsxs)("span", { className: "font-mono text-sm font-bold text-poke-blue", children: [L, " ", 1 === L ? "p\xe1gina" : "p\xe1ginas"] })] }),
                                                        (0, a.jsx)("input", { type: "range", min: 1, max: 50, value: L, onChange: (e) => R(Number(e.target.value)), className: "h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-poke-blue" }),
                                                        (0, a.jsxs)("div", { className: "flex items-center justify-between text-[11px] text-slate-400", children: [(0, a.jsx)("span", { children: "M\xednimo: 1 p\xe1gina" }), (0, a.jsxs)("span", { className: "font-mono", children: ["Capacidade: ", (0, a.jsx)("strong", { className: "text-white", children: ee }), " cartas"] }), (0, a.jsx)("span", { children: "M\xe1ximo: 50 p\xe1ginas" })] }),
                                                    ],
                                                }),
                                                (0, a.jsxs)("div", {
                                                    className: "flex flex-col gap-3",
                                                    children: [
                                                        (0, a.jsxs)("div", {
                                                            className: "flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3.5",
                                                            children: [
                                                                (0, a.jsxs)("div", {
                                                                    className: "flex flex-col gap-0.5",
                                                                    children: [
                                                                        (0, a.jsxs)("div", { className: "flex items-center gap-1.5", children: [P ? (0, a.jsx)(x.A, { size: 14, className: "text-emerald-400" }) : (0, a.jsx)(c.A, { size: 14, className: "text-slate-400" }), (0, a.jsx)("span", { className: "text-xs font-bold text-white", children: "Binder P\xfablico" })] }),
                                                                        (0, a.jsx)("span", { className: "text-[11px] text-slate-400", children: "Outros treinadores poder\xe3o visualizar seu binder atrav\xe9s do seu perfil p\xfablico." }),
                                                                    ],
                                                                }),
                                                                (0, a.jsx)("button", {
                                                                    type: "button",
                                                                    onClick: () => B(!P),
                                                                    className: "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ".concat(P ? "bg-emerald-500" : "bg-white/15"),
                                                                    children: (0, a.jsx)("span", { className: "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ".concat(P ? "translate-x-5" : "translate-x-0") }),
                                                                }),
                                                            ],
                                                        }),
                                                        (0, a.jsxs)("div", {
                                                            className: "flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3.5",
                                                            children: [
                                                                (0, a.jsxs)("div", {
                                                                    className: "flex flex-col gap-0.5",
                                                                    children: [(0, a.jsxs)("div", { className: "flex items-center gap-1.5", children: [(0, a.jsx)(m.A, { size: 14, className: D ? "text-amber-400 fill-amber-400" : "text-slate-400" }), (0, a.jsx)("span", { className: "text-xs font-bold text-white", children: "Binder em Destaque no Perfil" })] }), (0, a.jsx)("span", { className: "text-[11px] text-slate-400", children: "Exibido no topo da sua p\xe1gina de perfil de treinador." })],
                                                                }),
                                                                (0, a.jsx)("button", {
                                                                    type: "button",
                                                                    onClick: () => O(!D),
                                                                    className: "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ".concat(D ? "bg-amber-500" : "bg-white/15"),
                                                                    children: (0, a.jsx)("span", { className: "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ".concat(D ? "translate-x-5" : "translate-x-0") }),
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                                (0, a.jsxs)("div", {
                                                    className: "flex items-center justify-between pt-4 border-t border-white/10",
                                                    children: [
                                                        (0, a.jsxs)("button", { type: "button", onClick: () => X(!0), className: "flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300", children: [(0, a.jsx)(h.A, { size: 14 }), (0, a.jsx)("span", { children: "Excluir Binder" })] }),
                                                        (0, a.jsx)("button", { type: "submit", disabled: q, className: "flex items-center gap-2 rounded-xl bg-poke-blue px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-poke-blue/90 disabled:opacity-50", children: q ? (0, a.jsx)("span", { children: "Salvando..." }) : (0, a.jsx)("span", { children: "Salvar Altera\xe7\xf5es" }) }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                        (0, a.jsx)("div", {
                                            className: "lg:col-span-5 flex flex-col gap-4",
                                            children: (0, a.jsxs)("div", { className: "rounded-2xl border border-white/10 bg-[#121520]/80 p-5 shadow-xl backdrop-blur-md", children: [(0, a.jsx)("span", { className: "text-xs font-bold uppercase tracking-wider text-slate-400", children: "Pr\xe9-visualiza\xe7\xe3o da Capa" }), (0, a.jsx)(p.l, { name: _.trim() || t.name, coverTheme: A, coverPokemonDexId: T, className: "mx-auto mt-4 w-full max-w-[305px]" })] }),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                        Q &&
                            (0, a.jsx)("div", {
                                className: "modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-sm",
                                "data-overlay-state": U,
                                role: "dialog",
                                "aria-modal": "true",
                                "aria-label": "Confirmar desaloca\xe7\xe3o de cartas",
                                onClick: (e) => {
                                    e.target !== e.currentTarget || q || F(!1);
                                },
                                children: (0, a.jsxs)("div", {
                                    className: "modal-surface flex h-dvh max-h-none w-full max-w-none flex-col overflow-y-auto rounded-none border-0 border-amber-500/40 bg-[#161a24] p-6 shadow-2xl sm:h-auto sm:max-w-md sm:rounded-2xl sm:border",
                                    children: [
                                        (0, a.jsxs)("div", {
                                            className: "flex items-center gap-3 text-amber-400",
                                            children: [(0, a.jsx)("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20", children: (0, a.jsx)(b, { size: 20 }) }), (0, a.jsxs)("div", { children: [(0, a.jsx)("h3", { className: "text-base font-bold text-white", children: "Desaloca\xe7\xe3o de Cartas" }), (0, a.jsx)("p", { className: "text-xs text-amber-300", children: "Resumo de Impacto nas P\xe1ginas" })] })],
                                        }),
                                        (0, a.jsxs)("p", { className: "mt-4 text-xs text-slate-300", children: ["Voc\xea reduziu a quantidade de p\xe1ginas de ", t.total_pages, " para ", L, ". As p\xe1ginas removidas cont\xeam ", (0, a.jsxs)("strong", { className: "text-white font-bold", children: [es.length, " cartas alocadas"] }), "."] }),
                                        (0, a.jsxs)("div", { className: "mt-3 rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-slate-400", children: ["Nenhuma carta ser\xe1 perdida! Elas ser\xe3o desalocadas dos compartimentos removidos e permanecer\xe3o na sua conta como cartas ", (0, a.jsx)("strong", { className: "text-emerald-400", children: "guardadas na cole\xe7\xe3o" }), "."] }),
                                        (0, a.jsxs)("div", {
                                            className: "mt-6 flex items-center justify-end gap-3",
                                            children: [
                                                (0, a.jsx)("button", { type: "button", onClick: () => F(!1), className: "rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10", children: "Cancelar" }),
                                                (0, a.jsx)("button", { type: "button", disabled: q, onClick: ea, className: "rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-black hover:bg-amber-400 disabled:opacity-50", children: q ? "Desalocando..." : "Confirmar e Desalocar" }),
                                            ],
                                        }),
                                    ],
                                }),
                            }),
                        W &&
                            (0, a.jsx)("div", {
                                className: "modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-sm",
                                "data-overlay-state": Y,
                                role: "dialog",
                                "aria-modal": "true",
                                "aria-label": "Confirmar exclus\xe3o do binder",
                                onClick: (e) => {
                                    e.target !== e.currentTarget || I || X(!1);
                                },
                                children: (0, a.jsxs)("div", {
                                    className: "modal-surface flex h-dvh max-h-none w-full max-w-none flex-col overflow-y-auto rounded-none border-0 border-red-500/40 bg-[#181216] p-6 shadow-2xl sm:h-auto sm:max-w-md sm:rounded-2xl sm:border",
                                    children: [
                                        (0, a.jsxs)("div", {
                                            className: "flex items-center gap-3 text-red-400",
                                            children: [(0, a.jsx)("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20", children: (0, a.jsx)(h.A, { size: 20 }) }), (0, a.jsxs)("div", { children: [(0, a.jsx)("h3", { className: "text-base font-bold text-white", children: "Excluir Binder" }), (0, a.jsx)("p", { className: "text-xs text-red-300", children: "Esta a\xe7\xe3o \xe9 permanente" })] })],
                                        }),
                                        (0, a.jsxs)("p", { className: "mt-4 text-xs text-slate-300", children: ["Tem certeza que deseja excluir o binder ", (0, a.jsx)("strong", { className: "text-white", children: t.name }), "?"] }),
                                        (0, a.jsxs)("div", { className: "mt-3 rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-slate-400", children: ["Todas as ", et, " cartas alocadas neste binder voltar\xe3o para a sua conta como ", (0, a.jsx)("strong", { className: "text-emerald-400", children: "guardadas na cole\xe7\xe3o" }), "."] }),
                                        (0, a.jsxs)("div", {
                                            className: "mt-6 flex items-center justify-end gap-3",
                                            children: [(0, a.jsx)("button", { type: "button", onClick: () => X(!1), className: "rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10", children: "Cancelar" }), (0, a.jsx)("button", { type: "button", disabled: I, onClick: er, className: "rounded-xl bg-red-600 px-5 py-2 text-xs font-bold text-white hover:bg-red-500 disabled:opacity-50", children: I ? "Excluindo..." : "Sim, Excluir Binder" })],
                                        }),
                                    ],
                                }),
                            }),
                    ],
                });
            }
        },
        8799: (e, s, t) => {
            Promise.resolve().then(t.bind(t, 2148));
        },
        9347: (e, s, t) => {
            "use strict";
            t.d(s, { A: () => a });
            let a = (0, t(1847).A)("Star", [["path", { d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z", key: "r04s7s" }]]);
        },
    },
    (e) => {
        (e.O(0, [2619, 5239, 8720, 4102, 6937, 7567, 8441, 1255, 7358], () => e((e.s = 8799))), (_N_E = e.O()));
    },
]);
