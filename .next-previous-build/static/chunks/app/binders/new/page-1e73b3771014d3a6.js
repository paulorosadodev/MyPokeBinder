(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [5305],
    {
        1847: (e, t, s) => {
            "use strict";
            s.d(t, { A: () => n });
            var a = s(2115);
            let l = function () {
                for (var e = arguments.length, t = Array(e), s = 0; s < e; s++) t[s] = arguments[s];
                return t
                    .filter((e, t, s) => !!e && "" !== e.trim() && s.indexOf(e) === t)
                    .join(" ")
                    .trim();
            };
            var r = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
            let i = (0, a.forwardRef)((e, t) => {
                    let { color: s = "currentColor", size: i = 24, strokeWidth: n = 2, absoluteStrokeWidth: o, className: d = "", children: c, iconNode: x, ...h } = e;
                    return (0, a.createElement)("svg", { ref: t, ...r, width: i, height: i, stroke: s, strokeWidth: o ? (24 * Number(n)) / Number(i) : n, className: l("lucide", d), ...h }, [
                        ...x.map((e) => {
                            let [t, s] = e;
                            return (0, a.createElement)(t, s);
                        }),
                        ...(Array.isArray(c) ? c : [c]),
                    ]);
                }),
                n = (e, t) => {
                    let s = (0, a.forwardRef)((s, r) => {
                        let { className: n, ...o } = s;
                        return (0, a.createElement)(i, { ref: r, iconNode: t, className: l("lucide-".concat(e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()), n), ...o });
                    });
                    return ((s.displayName = "".concat(e)), s);
                };
        },
        2987: (e, t, s) => {
            "use strict";
            s.d(t, { A: () => a });
            let a = (0, s(1847).A)("ArrowRight", [
                ["path", { d: "M5 12h14", key: "1ays0h" }],
                ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
            ]);
        },
        5229: (e, t, s) => {
            "use strict";
            s.d(t, { A: () => a });
            let a = (0, s(1847).A)("X", [
                ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
                ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
            ]);
        },
        5432: (e, t, s) => {
            Promise.resolve().then(s.bind(s, 9176));
        },
        5740: (e, t, s) => {
            "use strict";
            s.d(t, { A: () => a });
            let a = (0, s(1847).A)("Sparkles", [
                ["path", { d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z", key: "4pj2yx" }],
                ["path", { d: "M20 3v4", key: "1olli1" }],
                ["path", { d: "M22 5h-4", key: "1gvqau" }],
                ["path", { d: "M4 17v2", key: "vumght" }],
                ["path", { d: "M5 18H3", key: "zchphs" }],
            ]);
        },
        6651: (e, t, s) => {
            "use strict";
            s.d(t, { A: () => a });
            let a = (0, s(1847).A)("Search", [
                ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
                ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
            ]);
        },
        7937: (e, t, s) => {
            "use strict";
            s.d(t, { A: () => a });
            let a = (0, s(1847).A)("BookOpen", [
                ["path", { d: "M12 7v14", key: "1akyts" }],
                ["path", { d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z", key: "ruj8y" }],
            ]);
        },
        9176: (e, t, s) => {
            "use strict";
            (s.r(t), s.d(t, { default: () => v }));
            var a = s(5155),
                l = s(2115),
                r = s(63),
                i = s(2619),
                n = s.n(i),
                o = s(5626),
                d = s(5917),
                c = s(9068),
                x = s(9708),
                h = s(7937),
                m = s(5740),
                p = s(9397),
                u = s(2987),
                b = s(5512),
                f = s(8463),
                g = s(3263),
                j = s(1910);
            let w = { "1x1": 1, "2x2": 4, "3x3": 9, "3x4": 12 },
                N = [
                    { id: 1, name: "Gera\xe7\xe3o 1 (Kanto)", start: 1, end: 151, count: 151 },
                    { id: 2, name: "Gera\xe7\xe3o 2 (Johto)", start: 152, end: 251, count: 100 },
                    { id: 3, name: "Gera\xe7\xe3o 3 (Hoenn)", start: 252, end: 386, count: 135 },
                    { id: 4, name: "Gera\xe7\xe3o 4 (Sinnoh)", start: 387, end: 493, count: 107 },
                    { id: 5, name: "Gera\xe7\xe3o 5 (Unova)", start: 494, end: 649, count: 156 },
                    { id: 6, name: "Gera\xe7\xe3o 6 (Kalos)", start: 650, end: 721, count: 72 },
                    { id: 7, name: "Gera\xe7\xe3o 7 (Alola)", start: 722, end: 809, count: 88 },
                    { id: 8, name: "Gera\xe7\xe3o 8 (Galar)", start: 810, end: 905, count: 96 },
                    { id: 9, name: "Gera\xe7\xe3o 9 (Paldea)", start: 906, end: 1025, count: 120 },
                ];
            function v() {
                var e;
                let t = (0, r.useRouter)(),
                    [s, i] = (0, l.useState)(1),
                    [v, k] = (0, l.useState)(""),
                    [y, _] = (0, l.useState)(""),
                    [A, C] = (0, l.useState)("classic_red"),
                    [M, z] = (0, l.useState)(null),
                    [S, P] = (0, l.useState)(!1),
                    [G, E] = (0, l.useState)("3x3"),
                    [q, L] = (0, l.useState)(10),
                    [O, B] = (0, l.useState)("blank"),
                    [F, K] = (0, l.useState)(1),
                    [T, R] = (0, l.useState)(!1),
                    [D, I] = (0, l.useState)(null),
                    J = w[G],
                    V = (0, j.r)(q) * J,
                    W = function (e) {
                        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
                        if ((B(e), "kanto151" === e)) (E("3x3"), L(17), v.trim() || k("Kanto 151 Pok\xe9dex"));
                        else if ("generation" === e) {
                            K(t);
                            let e = N.find((e) => e.id === t) || N[0];
                            (L(Math.min(50, Math.max(1, Math.ceil(e.count / J)))), v.trim() || k("Pok\xe9dex ".concat(e.name)));
                        }
                    },
                    H = async () => {
                        let e = v.trim();
                        if (!e) {
                            (I("Por favor, informe um nome para o seu binder."), i(1));
                            return;
                        }
                        (R(!0), I(null));
                        try {
                            let s;
                            if ("kanto151" === O) {
                                s = [];
                                let e = 1;
                                for (let t = 1; t <= q; t++) for (let a = 1; a <= J; a++) e <= 151 ? (s.push({ page_number: t, slot_index: a, slot_type: "pokemon", target_dex_id: e }), e++) : s.push({ page_number: t, slot_index: a, slot_type: "free" });
                            } else if ("generation" === O) {
                                s = [];
                                let e = N.find((e) => e.id === F) || N[0],
                                    t = e.start;
                                for (let a = 1; a <= q; a++) for (let l = 1; l <= J; l++) t <= e.end ? (s.push({ page_number: a, slot_index: l, slot_type: "pokemon", target_dex_id: t }), t++) : s.push({ page_number: a, slot_index: l, slot_type: "free" });
                            }
                            let a = await fetch("/api/binders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: e, description: y.trim(), cover_theme: A, cover_pokemon_dex_id: M, grid_type: G, total_pages: q, is_public: S, slots: s }) });
                            if (!a.ok) {
                                let e = await a.json().catch(() => ({}));
                                throw Error(e.error || "Falha ao criar binder");
                            }
                            let l = await a.json();
                            t.push("/binders/".concat(l.binder.id));
                        } catch (e) {
                            (I(e.message || "Erro inesperado ao criar o binder"), R(!1));
                        }
                    };
                return (0, a.jsx)("div", {
                    className: "flex min-h-screen flex-col bg-[#0a0c10] text-slate-100",
                    children: (0, a.jsxs)("main", {
                        className: "mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16",
                        children: [
                            (0, a.jsxs)("div", {
                                className: "flex items-center justify-between border-b border-white/10 pb-4",
                                children: [
                                    (0, a.jsxs)(n(), { href: "/", prefetch: !0, className: "flex items-center gap-2 text-xs font-semibold text-slate-400 transition-colors hover:text-white", children: [(0, a.jsx)(o.A, { size: 16 }), (0, a.jsx)("span", { children: "Voltar para a Estante" })] }),
                                    (0, a.jsxs)("div", { className: "flex items-center gap-2", children: [(0, a.jsxs)("span", { className: "text-xs text-slate-500", children: ["Passo ", s, " de 3"] }), (0, a.jsx)("div", { className: "flex gap-1.5", children: [1, 2, 3].map((e) => (0, a.jsx)("div", { className: "h-1.5 w-6 rounded-full transition-all ".concat(s >= e ? "bg-poke-blue" : "bg-white/10") }, e)) })] }),
                                ],
                            }),
                            D && (0, a.jsx)("div", { className: "rounded-xl border border-red-500/40 bg-red-500/10 p-3.5 text-xs text-red-300", children: D }),
                            (0, a.jsxs)("div", {
                                className: "grid grid-cols-1 gap-8 lg:grid-cols-12",
                                children: [
                                    (0, a.jsxs)("div", {
                                        className: "lg:col-span-7 flex flex-col gap-6",
                                        children: [
                                            1 === s &&
                                                (0, a.jsxs)("div", {
                                                    className: "flex flex-col gap-5",
                                                    children: [
                                                        (0, a.jsxs)("div", { children: [(0, a.jsx)("h1", { className: "text-xl font-black text-white sm:text-2xl", children: "Identidade e Capa" }), (0, a.jsx)("p", { className: "mt-1 text-xs text-slate-400", children: "D\xea um t\xedtulo especial ao seu binder e escolha a textura da capa." })] }),
                                                        (0, a.jsxs)("div", {
                                                            className: "flex flex-col gap-2",
                                                            children: [
                                                                (0, a.jsxs)("label", { className: "text-xs font-bold text-slate-300", children: ["Nome do Binder ", (0, a.jsx)("span", { className: "text-red-400", children: "*" })] }),
                                                                (0, a.jsx)("input", { type: "text", maxLength: 60, value: v, onChange: (e) => k(e.target.value), placeholder: "Ex: Minha Cole\xe7\xe3o Rara, Masterset 151, Johto...", className: "h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none", autoFocus: !0 }),
                                                                (0, a.jsxs)("span", { className: "text-right text-[10px] text-slate-500", children: [v.length, "/60 caracteres"] }),
                                                            ],
                                                        }),
                                                        (0, a.jsxs)("div", {
                                                            className: "flex flex-col gap-2",
                                                            children: [
                                                                (0, a.jsx)("label", { className: "text-xs font-bold text-slate-300", children: "Descri\xe7\xe3o (Opcional)" }),
                                                                (0, a.jsx)("textarea", { rows: 3, maxLength: 200, value: y, onChange: (e) => _(e.target.value), placeholder: "Conte brevemente sobre o foco ou tema deste binder...", className: "w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white placeholder-slate-500 transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none" }),
                                                                (0, a.jsxs)("span", { className: "text-right text-[10px] text-slate-500", children: [y.length, "/200 caracteres"] }),
                                                            ],
                                                        }),
                                                        (0, a.jsxs)("div", {
                                                            className: "flex flex-col gap-2.5",
                                                            children: [
                                                                (0, a.jsx)("label", { className: "text-xs font-bold text-slate-300", children: "Cor e Estilo da Capa" }),
                                                                (0, a.jsx)("div", {
                                                                    className: "grid grid-cols-2 gap-2.5 sm:grid-cols-3",
                                                                    children: Object.values(g.wZ).map((e) => {
                                                                        let t = A === e.id;
                                                                        return (0, a.jsxs)(
                                                                            "button",
                                                                            {
                                                                                type: "button",
                                                                                onClick: () => C(e.id),
                                                                                className: "flex cursor-pointer items-center gap-2.5 rounded-xl border p-2.5 text-left transition-all ".concat(t ? "border-white bg-white/10 shadow-md" : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"),
                                                                                children: [(0, a.jsx)("div", { className: "h-6 w-6 shrink-0 rounded-full border border-white/20 shadow-inner", style: { backgroundColor: e.primaryColor } }), (0, a.jsx)("div", { className: "min-w-0 flex-1", children: (0, a.jsx)("span", { className: "block truncate text-xs font-semibold text-white", children: e.name }) }), t && (0, a.jsx)(d.A, { size: 14, className: "text-white" })],
                                                                            },
                                                                            e.id,
                                                                        );
                                                                    }),
                                                                }),
                                                            ],
                                                        }),
                                                        (0, a.jsx)(f.y, { value: M, onChange: z }),
                                                        (0, a.jsxs)("div", {
                                                            className: "flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3.5",
                                                            children: [
                                                                (0, a.jsxs)("div", {
                                                                    className: "flex flex-col gap-0.5",
                                                                    children: [
                                                                        (0, a.jsxs)("div", { className: "flex items-center gap-1.5", children: [S ? (0, a.jsx)(c.A, { size: 14, className: "text-emerald-400" }) : (0, a.jsx)(x.A, { size: 14, className: "text-slate-400" }), (0, a.jsx)("span", { className: "text-xs font-bold text-white", children: "Binder P\xfablico" })] }),
                                                                        (0, a.jsx)("span", { className: "text-[11px] text-slate-400", children: "Outros treinadores poder\xe3o visualizar seu binder atrav\xe9s do seu perfil p\xfablico." }),
                                                                    ],
                                                                }),
                                                                (0, a.jsx)("button", {
                                                                    type: "button",
                                                                    onClick: () => P(!S),
                                                                    className: "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ".concat(S ? "bg-emerald-500" : "bg-white/15"),
                                                                    children: (0, a.jsx)("span", { className: "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ".concat(S ? "translate-x-5" : "translate-x-0") }),
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                            2 === s &&
                                                (0, a.jsxs)("div", {
                                                    className: "flex flex-col gap-5",
                                                    children: [
                                                        (0, a.jsxs)("div", { children: [(0, a.jsx)("h1", { className: "text-xl font-black text-white sm:text-2xl", children: "Formato do Grid e P\xe1ginas" }), (0, a.jsx)("p", { className: "mt-1 text-xs text-slate-400", children: "Escolha a disposi\xe7\xe3o visual das cartas em cada folha e a quantidade de p\xe1ginas." })] }),
                                                        (0, a.jsxs)("div", {
                                                            className: "flex flex-col gap-3",
                                                            children: [
                                                                (0, a.jsx)("label", { className: "text-xs font-bold text-slate-300", children: "Formato das Folhas (Grid)" }),
                                                                (0, a.jsx)("div", {
                                                                    className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
                                                                    children: ["1x1", "2x2", "3x3", "3x4"].map((e) => {
                                                                        let t = G === e;
                                                                        return (0, a.jsxs)(
                                                                            "button",
                                                                            {
                                                                                type: "button",
                                                                                onClick: () =>
                                                                                    ((e) => {
                                                                                        E(e);
                                                                                        let t = w[e];
                                                                                        "kanto151" === O ? L(Math.min(50, Math.max(1, Math.ceil(151 / t)))) : "generation" === O && L(Math.min(50, Math.max(1, Math.ceil((N.find((e) => e.id === F) || N[0]).count / t))));
                                                                                    })(e),
                                                                                className: "flex flex-col items-center gap-2 rounded-xl border p-3.5 text-center transition-all ".concat(t ? "border-poke-blue bg-poke-blue/15 shadow-[0_0_15px_rgba(59,130,246,0.3)]" : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"),
                                                                                children: [(0, a.jsx)("span", { className: "font-mono text-base font-extrabold text-white", children: e }), (0, a.jsxs)("span", { className: "text-[11px] text-slate-400", children: [w[e], " ", 1 === w[e] ? "carta/p\xe1g" : "cartas/p\xe1g"] })],
                                                                            },
                                                                            e,
                                                                        );
                                                                    }),
                                                                }),
                                                            ],
                                                        }),
                                                        (0, a.jsxs)("div", {
                                                            className: "flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4",
                                                            children: [
                                                                (0, a.jsxs)("div", { className: "flex items-center justify-between", children: [(0, a.jsx)("label", { className: "text-xs font-bold text-slate-300", children: "Quantidade de P\xe1ginas" }), (0, a.jsxs)("span", { className: "font-mono text-sm font-bold text-poke-blue", children: [q, " ", 1 === q ? "p\xe1gina" : "p\xe1ginas"] })] }),
                                                                (0, a.jsx)("input", { type: "range", min: 1, max: 50, value: q, onChange: (e) => L(Number(e.target.value)), className: "h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-poke-blue" }),
                                                                (0, a.jsxs)("div", { className: "flex items-center justify-between text-[11px] text-slate-400", children: [(0, a.jsx)("span", { children: "M\xednimo: 1 p\xe1gina" }), (0, a.jsxs)("span", { className: "font-mono", children: ["Capacidade: ", (0, a.jsx)("strong", { className: "text-white", children: V }), " cartas"] }), (0, a.jsx)("span", { children: "M\xe1ximo: 50 p\xe1ginas" })] }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                            3 === s &&
                                                (0, a.jsxs)("div", {
                                                    className: "flex flex-col gap-5",
                                                    children: [
                                                        (0, a.jsxs)("div", { children: [(0, a.jsx)("h1", { className: "text-xl font-black text-white sm:text-2xl", children: "Estrutura Inicial dos Slots" }), (0, a.jsx)("p", { className: "mt-1 text-xs text-slate-400", children: "Pr\xe9-configure as metas de cada slot ou comece com um binder livre." })] }),
                                                        (0, a.jsxs)("div", {
                                                            className: "flex flex-col gap-3",
                                                            children: [
                                                                (0, a.jsxs)("button", {
                                                                    type: "button",
                                                                    onClick: () => W("blank"),
                                                                    className: "flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 text-left transition-all ".concat("blank" === O ? "border-poke-blue bg-poke-blue/15 shadow-[0_0_15px_rgba(59,130,246,0.25)]" : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"),
                                                                    children: [
                                                                        (0, a.jsx)("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300", children: (0, a.jsx)(h.A, { size: 18 }) }),
                                                                        (0, a.jsxs)("div", { className: "flex-1", children: [(0, a.jsx)("h3", { className: "text-sm font-bold text-white", children: "Binder Livre (Em Branco)" }), (0, a.jsx)("p", { className: "mt-0.5 text-xs text-slate-400", children: "Todos os slots come\xe7am vazios com bordas tracejadas. Voc\xea pode inserir qualquer carta da sua cole\xe7\xe3o sem metas pr\xe9-fixadas." })] }),
                                                                        "blank" === O && (0, a.jsx)(d.A, { size: 18, className: "text-poke-blue shrink-0" }),
                                                                    ],
                                                                }),
                                                                (0, a.jsxs)("button", {
                                                                    type: "button",
                                                                    onClick: () => W("kanto151"),
                                                                    className: "flex cursor-pointer items-start gap-3.5 rounded-xl border p-4 text-left transition-all ".concat("kanto151" === O ? "border-poke-blue bg-poke-blue/15 shadow-[0_0_15px_rgba(59,130,246,0.25)]" : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/5"),
                                                                    children: [
                                                                        (0, a.jsx)("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-amber-300", children: (0, a.jsx)(m.A, { size: 18 }) }),
                                                                        (0, a.jsxs)("div", { className: "flex-1", children: [(0, a.jsx)("h3", { className: "text-sm font-bold text-white", children: "Kanto 151 Original (Pok\xe9dex Cl\xe1ssica)" }), (0, a.jsx)("p", { className: "mt-0.5 text-xs text-slate-400", children: "17 p\xe1ginas em grid 3\xd73 com as silhuetas oficiais dos 151 Pok\xe9mon de Kanto (#001 a #151) para colecionar suas cartas f\xedsicas." })] }),
                                                                        "kanto151" === O && (0, a.jsx)(d.A, { size: 18, className: "text-poke-blue shrink-0" }),
                                                                    ],
                                                                }),
                                                                (0, a.jsxs)("div", {
                                                                    className: "flex flex-col gap-3 rounded-xl border p-4 transition-all ".concat("generation" === O ? "border-poke-blue bg-poke-blue/15 shadow-[0_0_15px_rgba(59,130,246,0.25)]" : "border-white/10 bg-white/[0.02]"),
                                                                    children: [
                                                                        (0, a.jsxs)("div", {
                                                                            className: "flex cursor-pointer items-start gap-3.5",
                                                                            onClick: () => W("generation", F),
                                                                            children: [
                                                                                (0, a.jsx)("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-emerald-300", children: (0, a.jsx)(p.A, { size: 18 }) }),
                                                                                (0, a.jsxs)("div", { className: "flex-1", children: [(0, a.jsx)("h3", { className: "text-sm font-bold text-white", children: "Gera\xe7\xe3o Espec\xedfica da Pok\xe9dex" }), (0, a.jsx)("p", { className: "mt-0.5 text-xs text-slate-400", children: "Gera metas sequenciais para qualquer uma das 9 gera\xe7\xf5es oficiais com silhuetas pr\xe9-carregadas." })] }),
                                                                                "generation" === O && (0, a.jsx)(d.A, { size: 18, className: "text-poke-blue shrink-0" }),
                                                                            ],
                                                                        }),
                                                                        "generation" === O &&
                                                                            (0, a.jsxs)("div", {
                                                                                className: "mt-2 pt-3 border-t border-white/10 flex flex-col gap-2",
                                                                                children: [
                                                                                    (0, a.jsx)("label", { className: "text-xs font-semibold text-slate-300", children: "Selecione a Gera\xe7\xe3o Desejada:" }),
                                                                                    (0, a.jsx)("select", {
                                                                                        value: F,
                                                                                        onChange: (e) =>
                                                                                            ((e) => {
                                                                                                K(e);
                                                                                                let t = N.find((t) => t.id === e) || N[0];
                                                                                                (L(Math.min(50, Math.max(1, Math.ceil(t.count / J)))), (!v.trim() || v.startsWith("Pok\xe9dex Gera\xe7\xe3o")) && k("Pok\xe9dex ".concat(t.name)));
                                                                                            })(Number(e.target.value)),
                                                                                        className: "h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-xs text-white focus:border-poke-blue/60 focus:outline-none",
                                                                                        children: N.map((e) => (0, a.jsxs)("option", { value: e.id, className: "bg-[#121622] text-white", children: [e.name, " (#", String(e.start).padStart(3, "0"), " a #", String(e.end).padStart(3, "0"), " \xb7 ", e.count, " pok\xe9mon)"] }, e.id)),
                                                                                    }),
                                                                                ],
                                                                            }),
                                                                    ],
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                            (0, a.jsxs)("div", {
                                                className: "flex items-center justify-between pt-4 border-t border-white/10",
                                                children: [
                                                    s > 1 ? (0, a.jsxs)("button", { type: "button", onClick: () => i((e) => e - 1), className: "flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10", children: [(0, a.jsx)(o.A, { size: 14 }), (0, a.jsx)("span", { children: "Anterior" })] }) : (0, a.jsx)("div", {}),
                                                    s < 3
                                                        ? (0, a.jsxs)("button", {
                                                              type: "button",
                                                              onClick: () => {
                                                                  if (1 === s && !v.trim()) return void I("Por favor, preencha o nome do binder antes de prosseguir.");
                                                                  (I(null), i((e) => e + 1));
                                                              },
                                                              className: "flex items-center gap-1.5 rounded-xl bg-poke-blue px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-poke-blue/90",
                                                              children: [(0, a.jsx)("span", { children: "Pr\xf3ximo" }), (0, a.jsx)(u.A, { size: 14 })],
                                                          })
                                                        : (0, a.jsx)("button", {
                                                              type: "button",
                                                              disabled: T,
                                                              onClick: H,
                                                              className: "flex items-center gap-2 rounded-xl bg-poke-blue px-6 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all hover:bg-poke-blue/90 disabled:opacity-50",
                                                              children: T ? (0, a.jsx)("span", { children: "Criando Binder..." }) : (0, a.jsxs)(a.Fragment, { children: [(0, a.jsx)(m.A, { size: 15 }), (0, a.jsx)("span", { children: "Concluir e Abrir Binder" })] }),
                                                          }),
                                                ],
                                            }),
                                        ],
                                    }),
                                    (0, a.jsx)("div", {
                                        className: "lg:col-span-5 flex flex-col gap-4",
                                        children: (0, a.jsxs)("div", {
                                            className: "rounded-2xl border border-white/10 bg-[#121520]/80 p-5 shadow-xl backdrop-blur-md",
                                            children: [
                                                (0, a.jsx)("span", { className: "text-xs font-bold uppercase tracking-wider text-slate-400", children: "Pr\xe9-visualiza\xe7\xe3o da Capa" }),
                                                (0, a.jsx)(b.l, { name: v.trim() || "Nome do Binder", coverTheme: A, coverPokemonDexId: M, className: "mx-auto mt-4 w-full max-w-[305px]" }),
                                                (0, a.jsxs)("div", {
                                                    className: "mt-4 flex flex-col gap-2 rounded-xl border border-white/5 bg-black/30 p-3 text-xs text-slate-400",
                                                    children: [
                                                        (0, a.jsxs)("div", { className: "flex justify-between", children: [(0, a.jsx)("span", { children: "Formato:" }), (0, a.jsxs)("strong", { className: "text-white", children: ["Grid ", G, " (", J, " slots/p\xe1gina)"] })] }),
                                                        (0, a.jsxs)("div", { className: "flex justify-between", children: [(0, a.jsx)("span", { children: "Total de Folhas:" }), (0, a.jsxs)("strong", { className: "text-white", children: [q, " p\xe1ginas"] })] }),
                                                        (0, a.jsxs)("div", { className: "flex justify-between", children: [(0, a.jsx)("span", { children: "Capacidade Total:" }), (0, a.jsxs)("strong", { className: "text-white", children: [V, " cartas"] })] }),
                                                        (0, a.jsxs)("div", { className: "flex justify-between", children: [(0, a.jsx)("span", { children: "Estrutura:" }), (0, a.jsx)("strong", { className: "text-white", children: "blank" === O ? "Slots Livres" : "kanto151" === O ? "Kanto 151 Metas" : "Metas ".concat(null == (e = N.find((e) => e.id === F)) ? void 0 : e.name) })] }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                });
            }
        },
        9397: (e, t, s) => {
            "use strict";
            s.d(t, { A: () => a });
            let a = (0, s(1847).A)("Layers", [
                ["path", { d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z", key: "zw3jo" }],
                ["path", { d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12", key: "1wduqc" }],
                ["path", { d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17", key: "kqbvx6" }],
            ]);
        },
    },
    (e) => {
        (e.O(0, [2619, 5239, 6937, 7567, 8441, 1255, 7358], () => e((e.s = 5432))), (_N_E = e.O()));
    },
]);
