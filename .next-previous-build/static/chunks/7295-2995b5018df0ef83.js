"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [7295],
    {
        562: (e, t, a) => {
            a.d(t, { A: () => s });
            let s = (0, a(1847).A)("ArrowUp", [
                ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
                ["path", { d: "M12 19V5", key: "x0mq9r" }],
            ]);
        },
        1414: (e, t, a) => {
            a.d(t, { h: () => i });
            var s = a(5155);
            a(2115);
            var r = a(6651),
                l = a(5229),
                n = a(6630),
                o = a(7230);
            function i(e) {
                let { searchTerm: t, onSearchChange: a, placeholder: i = "Buscar por pok\xe9mon, n\xfamero, cole\xe7\xe3o ou pok\xe9dex...", placeholderClassName: c = "left-8.5 right-8 text-xs sm:left-10 sm:right-9 sm:text-sm", showFilters: d, onToggleFilters: m, activeFilterCount: x = 0, filterButtonAriaLabel: u = "Alternar filtros", children: h, className: p = "" } = e;
                return (0, s.jsxs)("div", {
                    className: "flex shrink-0 flex-col ".concat(d ? "gap-2.5 sm:gap-3" : "gap-0", " ").concat(p),
                    children: [
                        (0, s.jsxs)("div", {
                            className: "flex items-center gap-2",
                            children: [
                                (0, s.jsxs)("div", {
                                    className: "relative min-w-0 flex-1",
                                    children: [
                                        (0, s.jsx)(r.A, { size: 15, className: "pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-slate-500 z-20 sm:left-3.5 sm:h-4 sm:w-4" }),
                                        (0, s.jsx)(o.D, { type: "text", value: t, onChange: (e) => a(e.target.value), placeholder: i, placeholderClassName: c, className: "w-full h-9 sm:h-10 rounded-xl border border-white/10 bg-white/5 py-2 sm:py-2.5 pr-8 sm:pr-9 pl-8.5 sm:pl-10 text-xs sm:text-sm text-white transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none" }),
                                        t ? (0, s.jsx)("button", { type: "button", onClick: () => a(""), "aria-label": "Limpar busca", className: "absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-500 hover:text-white z-20 sm:right-3", children: (0, s.jsx)(l.A, { size: 14, className: "sm:h-[15px] sm:w-[15px]" }) }) : null,
                                    ],
                                }),
                                (0, s.jsxs)("button", {
                                    type: "button",
                                    onClick: m,
                                    "aria-label": u,
                                    "aria-expanded": d,
                                    className: "flex h-9 sm:h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border px-2.5 sm:px-3 text-xs font-semibold transition-colors ".concat(d || x > 0 ? "border-poke-blue/60 bg-poke-blue/20 text-white" : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"),
                                    children: [(0, s.jsx)(n.A, { size: 13, className: x > 0 ? "text-poke-blue" : "text-slate-400" }), (0, s.jsx)("span", { className: "inline", children: "Filtros" }), x > 0 && (0, s.jsx)("span", { className: "flex h-4 min-w-4 items-center justify-center rounded-full bg-poke-blue px-1 text-[10px] font-bold text-white", children: x })],
                                }),
                            ],
                        }),
                        h ? (0, s.jsx)("div", { className: "grid transition-all duration-300 ease-in-out ".concat(d ? "grid-rows-[1fr] opacity-100 border-t border-white/10 pt-2.5 sm:pt-3 mt-1 sm:mt-1.5" : "grid-rows-[0fr] opacity-0 border-t-0 pt-0 mt-0 pointer-events-none"), children: (0, s.jsx)("div", { className: "overflow-hidden", children: h }) }) : null,
                    ],
                });
            }
        },
        2523: (e, t, a) => {
            a.d(t, { G: () => c });
            var s = a(5155),
                r = a(2115),
                l = a(2755),
                n = a(5299);
            let o = [
                    { value: "pt-br", label: "PT-BR", shortLabel: "PT", country: "pt-br" },
                    { value: "en", label: "EN", shortLabel: "EN", country: "en" },
                    { value: "ja", label: "JA", shortLabel: "JA", country: "ja" },
                ],
                i = r.useLayoutEffect;
            function c(e) {
                let { value: t, onChange: a, options: c = o, size: d = "sm", fullWidth: m = !1, disabled: x = !1, loadingValue: u = null, ariaLabel: h = "Seletor de idioma da carta", className: p = "" } = e,
                    f = (0, r.useId)(),
                    g = (0, r.useRef)(null),
                    b = (0, r.useRef)([]),
                    [y, w] = (0, r.useState)({ left: 0, width: 0, ready: !1 }),
                    j = Math.max(
                        0,
                        c.findIndex((e) => e.value === t),
                    ),
                    v = c[j],
                    N = () => {
                        let e = g.current,
                            t = b.current[j];
                        if (e && t) {
                            let a = t.offsetLeft,
                                s = t.offsetParent;
                            for (; s && s !== e;) ((a += s.offsetLeft), (s = s.offsetParent));
                            let r = Math.max(0, a),
                                l = Math.min(t.offsetWidth, Math.max(0, e.clientWidth - r));
                            w({ left: r, width: l, ready: !0 });
                        }
                    };
                (i(() => {
                    N();
                }, [t, j, c.length]),
                    (0, r.useEffect)(() => {
                        let e = () => {
                            N();
                        };
                        window.addEventListener("resize", e);
                        let t = "undefined" != typeof ResizeObserver ? new ResizeObserver(() => N()) : null;
                        return (
                            g.current && t && t.observe(g.current),
                            () => {
                                (window.removeEventListener("resize", e), t && t.disconnect());
                            }
                        );
                    }, [j]));
                let k = "sm" === d;
                return (0, s.jsxs)("div", {
                    ref: g,
                    role: "radiogroup",
                    "aria-label": h,
                    className: "relative inline-flex items-center overflow-hidden max-w-full rounded-xl border border-white/10 bg-[#0d111a]/90 p-1 shadow-inner backdrop-blur-md transition-colors "
                        .concat(m ? "w-full" : "w-auto", " ")
                        .concat(x ? "opacity-60 cursor-not-allowed" : "", " ")
                        .concat(p),
                    children: [
                        (0, s.jsx)("div", {
                            "data-slider-indicator": !0,
                            style: { transform: y.ready ? "translate3d(".concat(y.left, "px, 0, 0)") : "translate3d(".concat(100 * j, "%, 0, 0)"), width: y.ready ? "".concat(y.width, "px") : "".concat(100 / Math.max(1, c.length), "%"), opacity: y.ready ? 1 : 0.85 },
                            className: "pointer-events-none absolute top-1 bottom-1 left-0 rounded-lg border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ".concat((null == v ? void 0 : v.indicatorClassName) || "border-poke-blue/50 bg-poke-blue/20 shadow-[0_0_12px_var(--theme-primary-glow)]"),
                        }),
                        (0, s.jsx)("div", {
                            className: "relative z-10 flex items-center min-w-0 ".concat(m ? "w-full" : "w-auto"),
                            children: c.map((e, r) => {
                                let o = e.value === t,
                                    i = u === e.value,
                                    d = "".concat(f, "-option-").concat(e.value);
                                return (0, s.jsxs)(
                                    "button",
                                    {
                                        id: d,
                                        ref: (e) => {
                                            b.current[r] = e;
                                        },
                                        type: "button",
                                        role: "radio",
                                        title: e.title || e.label,
                                        "aria-label": e.title || e.label,
                                        "aria-checked": o,
                                        disabled: x || i,
                                        onClick: () => {
                                            e.value !== t && a(e.value);
                                        },
                                        className: "group relative flex items-center justify-center rounded-lg font-semibold tracking-tight transition-all duration-200 select-none active:scale-95 disabled:cursor-not-allowed min-w-0 "
                                            .concat(m ? "flex-1" : "", " ")
                                            .concat(k ? (c.length > 4 ? "px-0.5 sm:px-1.5 py-1 text-[10px] sm:text-xs gap-0.5 sm:gap-1" : "px-1 sm:px-2.5 py-1 text-[10px] sm:text-xs gap-1 sm:gap-1.5") : "px-3.5 py-2 text-xs sm:text-sm gap-1.5", " ")
                                            .concat(o ? e.activeClassName || "text-white font-bold" : "text-slate-400 hover:text-slate-200"),
                                        children: [
                                            i
                                                ? (0, s.jsx)(n.A, { size: k ? 11 : 14, className: "shrink-0 animate-spin text-poke-blue" })
                                                : e.country
                                                  ? (0, s.jsx)(l.i, { country: e.country, className: "shrink-0 transition-transform duration-200 ".concat(o ? "scale-105 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" : "opacity-75 group-hover:opacity-100") })
                                                  : e.icon
                                                    ? (0, s.jsx)("span", { className: "inline-flex shrink-0 items-center justify-center transition-transform duration-200 ".concat(o ? "scale-105 ".concat(e.activeIconClassName || "text-white") : "opacity-75 group-hover:opacity-100 ".concat(e.inactiveIconClassName || "text-slate-400")), children: e.icon })
                                                    : null,
                                            (0, s.jsx)("span", { className: "truncate whitespace-nowrap ".concat(e.shortLabel ? "hidden sm:inline" : "inline"), children: e.label }),
                                            e.shortLabel ? (0, s.jsx)("span", { className: "inline sm:hidden truncate whitespace-nowrap", children: e.shortLabel }) : null,
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
        3341: (e, t, a) => {
            a.d(t, { A: () => s });
            let s = (0, a(1847).A)("ArrowUpDown", [
                ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
                ["path", { d: "M17 20V4", key: "1ejh1v" }],
                ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
                ["path", { d: "M7 4v16", key: "1glfcx" }],
            ]);
        },
        4033: (e, t, a) => {
            a.d(t, { A: () => s });
            let s = (0, a(1847).A)("ChevronDown", [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]);
        },
        5299: (e, t, a) => {
            a.d(t, { A: () => s });
            let s = (0, a(1847).A)("LoaderCircle", [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]]);
        },
        5322: (e, t, a) => {
            a.d(t, { A: () => s });
            let s = (0, a(1847).A)("Gem", [
                ["path", { d: "M6 3h12l4 6-10 13L2 9Z", key: "1pcd5k" }],
                ["path", { d: "M11 3 8 9l4 13 4-13-3-6", key: "1fcu3u" }],
                ["path", { d: "M2 9h20", key: "16fsjt" }],
            ]);
        },
        5626: (e, t, a) => {
            a.d(t, { A: () => s });
            let s = (0, a(1847).A)("ArrowLeft", [
                ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
                ["path", { d: "M19 12H5", key: "x3x0zl" }],
            ]);
        },
        5917: (e, t, a) => {
            a.d(t, { A: () => s });
            let s = (0, a(1847).A)("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
        },
        6630: (e, t, a) => {
            a.d(t, { A: () => s });
            let s = (0, a(1847).A)("SlidersHorizontal", [
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
        8803: (e, t, a) => {
            a.d(t, { A: () => s });
            let s = (0, a(1847).A)("ArrowDown", [
                ["path", { d: "M12 5v14", key: "s699le" }],
                ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }],
            ]);
        },
        8972: (e, t, a) => {
            a.d(t, { g: () => q });
            var s = a(5155),
                r = a(2115),
                l = a(4133),
                n = a(6245),
                o = a(4059),
                i = a(6151),
                c = a(2180);
            function d(e, t, a, s) {
                return (0, o.qe)({ tcgdex_card_id: e, card_language: t, card_variant: a, card_condition: s });
            }
            function m() {
                for (var e, t = arguments.length, a = Array(t), s = 0; s < t; s++) a[s] = arguments[s];
                let r = {};
                for (let t of a) for (let [a, s] of Object.entries(t)) r[a] = (null != (e = r[a]) ? e : 0) + s;
                return r;
            }
            function x(e) {
                let t = 0;
                for (let a of Object.values(e)) t += a;
                return t;
            }
            var u = a(5801),
                h = a(4303),
                p = a(2523),
                f = a(2755),
                g = a(3698),
                b = a(148),
                y = a(2671),
                w = a(5299);
            function j(e) {
                let { size: t = 16, className: a = "", ariaLabel: r = "Carregando" } = e;
                return (0, s.jsx)(w.A, { size: t, role: "status", "aria-label": r, className: "animate-spin text-poke-blue ".concat(a) });
            }
            var v = a(1414),
                N = a(3848),
                k = a(6092),
                C = a(7997),
                A = a(8720),
                z = a(5917),
                _ = a(5626),
                E = a(5229),
                S = a(5322),
                M = a(9397),
                L = a(9926),
                I = a(5740),
                T = a(6651),
                F = a(6191);
            function R(e) {
                let { card: t, shineMode: a } = e,
                    n = (0, l.HO)(t.image),
                    [o, i] = (0, r.useState)(() => (0, y.y7)(n));
                return (
                    (0, r.useEffect)(() => {
                        (0, y.y7)(n) && i(!0);
                    }, [n]),
                    (0, s.jsx)(b.LW, { className: "relative h-full w-full overflow-hidden rounded-lg", maxTilt: 8, maxMove: 3, scale: 1, glareOpacity: 0.2, perspective: 900, shineMode: a, elementTypes: t.types, enableTouch: !0, isLoading: !o, children: (0, s.jsx)(y.MH, { src: n, alt: t.name, sizes: "(max-width: 768px) 50vw, 200px", className: "object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]", onLoadingChange: i }) })
                );
            }
            let O = new Map(),
                P = { "pt-br": "PT-BR", en: "EN", ja: "JA" },
                B = [
                    { value: "pt-br", label: "PT-BR", country: "pt-br" },
                    { value: "en", label: "EN", country: "en" },
                    { value: "ja", label: "JA", country: "ja" },
                ],
                V = [
                    { value: "pt-br", label: "PT-BR", icon: (0, s.jsx)(f.i, { country: "pt-br" }) },
                    { value: "en", label: "EN", icon: (0, s.jsx)(f.i, { country: "en" }) },
                    { value: "ja", label: "JA", icon: (0, s.jsx)(f.i, { country: "ja" }) },
                ];
            function q(e) {
                let { isOpen: t, dexId: a, pokemonName: f, onClose: b, onBack: y, onCardAdded: w } = e,
                    [q, J] = (0, r.useState)("pt-br"),
                    [W, G] = (0, r.useState)("normal"),
                    [U, D] = (0, r.useState)("NM"),
                    [H, X] = (0, r.useState)([]),
                    [Y, Z] = (0, r.useState)(1),
                    [K, Q] = (0, r.useState)(!1),
                    [$, ee] = (0, r.useState)(!1),
                    [et, ea] = (0, r.useState)(!1),
                    [es, er] = (0, r.useState)(null),
                    [el, en] = (0, r.useState)([]),
                    [eo, ei] = (0, r.useState)({}),
                    [ec, ed] = (0, r.useState)({}),
                    [em, ex] = (0, r.useState)(null),
                    [eu, eh] = (0, r.useState)(""),
                    [ep, ef] = (0, r.useState)("all"),
                    [eg, eb] = (0, r.useState)(c.Ig),
                    [ey, ew] = (0, r.useState)(c.ej),
                    [ej, ev] = (0, r.useState)(!1),
                    eN = (0, r.useRef)(new Set()),
                    ek = (0, r.useRef)({}),
                    eC = (0, r.useRef)(new Set()),
                    eA = el.length > 0;
                (0, k.m)(t, b, eA);
                let { isPresent: ez, state: e_ } = (0, C.v)(t);
                ((0, r.useEffect)(() => {
                    t && (J("pt-br"), G("normal"), D("NM"), eh(""), ef("all"), eb(c.Ig), ew(c.ej), ev(!1), (ek.current = {}), ei({}), (eC.current = new Set()), f || (X([]), Q(!1), ee(!1)));
                }, [t, f]),
                    (0, r.useEffect)(() => {
                        if (!t || !f) return;
                        let e = !0;
                        return (
                            (async function () {
                                try {
                                    var t, s, r, l;
                                    let n = f.replace(/[♀♂]/g, "").trim(),
                                        o = "".concat(null != a ? a : 0, "_").concat(n, "_page_1"),
                                        i = O.get(o);
                                    if (i) {
                                        (X(null != (t = i.cards) ? t : []), Q(null != (s = i.hasMore) && s), Z(1), er(null), ee(!1));
                                        return;
                                    }
                                    (ee(!0), er(null), Z(1));
                                    let d = a ? "&dexId=".concat(a) : "",
                                        m = await fetch("/api/search?name=".concat(encodeURIComponent(n)).concat(d, "&page=1&pageSize=").concat(c.xJ)),
                                        x = await m.json();
                                    if (!m.ok) {
                                        let e = x.error || "Erro ao buscar cartas";
                                        throw Error(e);
                                    }
                                    (O.set(o, x), e && (X(null != (r = x.cards) ? r : []), Q(null != (l = x.hasMore) && l)));
                                } catch (t) {
                                    e && (er(t instanceof Error ? t.message : "Falha na busca"), X([]), Q(!1));
                                } finally {
                                    e && ee(!1);
                                }
                            })(),
                            () => {
                                e = !1;
                            }
                        );
                    }, [t, f, a]),
                    (0, r.useEffect)(() => {
                        if (!t || f) return;
                        let e = eu.trim();
                        if (!e) {
                            (X([]), Q(!1), ee(!1));
                            return;
                        }
                        let a = !0,
                            s = setTimeout(async () => {
                                try {
                                    var t, s, r, l;
                                    let n = "catalog_".concat(e, "_page_1"),
                                        o = O.get(n);
                                    if (o) {
                                        (X(null != (t = o.cards) ? t : []), Q(null != (s = o.hasMore) && s), Z(1), er(null), ee(!1));
                                        return;
                                    }
                                    (ee(!0), er(null), Z(1));
                                    let i = await fetch("/api/search?name=".concat(encodeURIComponent(e), "&page=1&pageSize=").concat(c.xJ)),
                                        d = await i.json();
                                    if (!i.ok) {
                                        let e = d.error || "Erro ao buscar cartas";
                                        throw Error(e);
                                    }
                                    (O.set(n, d), a && (X(null != (r = d.cards) ? r : []), Q(null != (l = d.hasMore) && l)));
                                } catch (e) {
                                    a && (er(e instanceof Error ? e.message : "Falha na busca"), X([]), Q(!1));
                                } finally {
                                    a && ee(!1);
                                }
                            }, 300);
                        return () => {
                            ((a = !1), clearTimeout(s));
                        };
                    }, [t, f, eu]),
                    (0, r.useEffect)(() => {
                        if (!t || 0 === H.length) return;
                        let e = Array.from(new Set(H.map((e) => e.id))).filter((e) => !eC.current.has(e));
                        if (0 === e.length) return;
                        for (let t of e) eC.current.add(t);
                        let a = !0;
                        return (
                            (async () => {
                                let t = {};
                                for (let a = 0; a < e.length; a += 100) {
                                    let r = e.slice(a, a + 100);
                                    try {
                                        var s;
                                        let e = await fetch("/api/cards/ownership?ids=".concat(encodeURIComponent(r.join(","))));
                                        if (!e.ok) continue;
                                        let a = await e.json();
                                        Object.assign(t, null != (s = a.counts) ? s : {});
                                    } catch (e) {}
                                }
                                a && 0 !== Object.keys(t).length && ed((e) => m(e, t));
                            })(),
                            () => {
                                a = !1;
                            }
                        );
                    }, [t, H]));
                let eE = (0, r.useCallback)(async () => {
                        if (et || $ || !K) return;
                        let e = f ? f.replace(/[♀♂]/g, "").trim() : eu.trim();
                        if (e)
                            try {
                                var t, s;
                                ea(!0);
                                let r = Y + 1,
                                    l = f
                                        ? ""
                                              .concat(null != a ? a : 0, "_")
                                              .concat(e, "_page_")
                                              .concat(r)
                                        : "catalog_".concat(e, "_page_").concat(r),
                                    n = O.get(l);
                                if (n) {
                                    (X((e) => {
                                        var t;
                                        return [...e, ...(null != (t = n.cards) ? t : [])];
                                    }),
                                        Z(r),
                                        Q(null != (t = n.hasMore) && t),
                                        ea(!1));
                                    return;
                                }
                                let o = f && a ? "&dexId=".concat(a) : "",
                                    i = await fetch("/api/search?name=".concat(encodeURIComponent(e)).concat(o, "&page=").concat(r, "&pageSize=").concat(c.xJ)),
                                    d = await i.json();
                                if (!i.ok) {
                                    let e = d.error || "Erro ao carregar mais cartas";
                                    throw Error(e);
                                }
                                (O.set(l, d),
                                    X((e) => {
                                        var t;
                                        return [...e, ...(null != (t = d.cards) ? t : [])];
                                    }),
                                    Z(r),
                                    Q(null != (s = d.hasMore) && s));
                            } catch (e) {
                                er(e instanceof Error ? e.message : "Falha ao carregar mais cartas");
                            } finally {
                                ea(!1);
                            }
                    }, [Y, K, et, $, f, a, eu]),
                    eS = (0, r.useMemo)(() => (0, c.VY)(H, { searchTerm: f ? eu : "", rarityFilter: ep, expansionFilter: eg, artistFilter: ey, dexId: null != a ? a : void 0 }), [H, eu, ep, eg, ey, a, f]),
                    eM = (0, r.useMemo)(() => (0, c.SI)(H.map((e) => e.setName)), [H]),
                    eL = (0, r.useMemo)(() => (0, c.ay)(H.map((e) => e.artist)), [H]),
                    eI = !!eu.trim() || "all" !== ep || eg !== c.Ig || ey !== c.ej,
                    eT = (0, r.useMemo)(() => m(ec, eo), [ec, eo]);
                (0, r.useEffect)(() => {
                    t && !$ && !et && K && eI && (eS.length >= 12 || eE());
                }, [t, $, et, K, eI, eS.length, eE]);
                let eF = (0, u.X)({ hasMore: K, isLoading: et || $, onLoadMore: eE, root: em, enabled: t }),
                    eR = async (e) => {
                        if (!eN.current.has(e.id))
                            try {
                                (eN.current.add(e.id), en((t) => (t.includes(e.id) ? t : [...t, e.id])), er(null));
                                let t = await fetch("/api/cards", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tcgdex_card_id: e.id, pokemon_dex_id: void 0 !== e.dexId ? e.dexId : a || null, card_name: e.name, card_image_url: (0, l.HO)(e.image), card_set_name: e.setName || "", card_rarity: e.rarity || "", card_artist: e.artist || "", card_condition: U, card_types: e.types || [], card_language: q, card_variant: W }) }),
                                    s = await t.json();
                                if (!t.ok) throw Error(s.error || "Erro ao adicionar carta");
                                let r = (function (e, t, a, s, r) {
                                    var l;
                                    let n = d(t, a, s, r);
                                    return { ...e, [n]: (null != (l = e[n]) ? l : 0) + 1 };
                                })(ek.current, e.id, q, W, U);
                                ((ek.current = r), ei(r), eC.current.add(e.id), w(s.card));
                                let n = x(r);
                                A.oR.success(1 === n ? "Carta adicionada \xe0 Cole\xe7\xe3o!" : "".concat(n, " cartas adicionadas \xe0 Cole\xe7\xe3o!"), { id: "card-search-carta-adicionada", description: "".concat(e.name, " (").concat((0, o.FB)(W), ") cadastrada com sucesso.") });
                            } catch (t) {
                                let e = t instanceof Error ? t.message : "Erro ao adicionar";
                                (er(e), A.oR.error("Erro ao adicionar carta", { description: e }));
                            } finally {
                                (eN.current.delete(e.id), en((t) => t.filter((t) => t !== e.id)));
                            }
                    };
                if (!ez) return null;
                let eO = +("all" !== ep) + +(eg !== c.Ig) + +(ey !== c.ej),
                    eP = x(eo),
                    eB = eP > 0 ? (0, s.jsxs)("span", { "aria-live": "polite", className: "inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-emerald-200 whitespace-nowrap", children: [(0, s.jsx)(z.A, { size: 11, className: "shrink-0" }), 1 === eP ? "1 adicionada" : "".concat(eP, " adicionadas")] }) : null;
                return (0, s.jsx)("div", {
                    className: "modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-sm",
                    "data-overlay-state": e_,
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": "Buscar carta",
                    onClick: (e) => {
                        e.target !== e.currentTarget || eA || b();
                    },
                    children: (0, s.jsxs)("div", {
                        className: "modal-surface flex h-dvh max-h-none w-full max-w-none flex-col overflow-hidden rounded-none border-0 bg-[#12151d] shadow-2xl sm:h-[85vh] sm:max-h-[820px] sm:max-w-3xl sm:rounded-2xl sm:border sm:border-white/10 md:max-w-5xl lg:max-w-6xl",
                        children: [
                            (0, s.jsxs)("div", {
                                className: "flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5 sm:px-6 sm:py-3.5",
                                children: [
                                    (0, s.jsxs)("div", {
                                        className: "flex min-w-0 items-center gap-2.5 sm:gap-3",
                                        children: [
                                            y ? (0, s.jsxs)("button", { type: "button", onClick: y, "aria-label": "Voltar ao seletor do binder", className: "flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white sm:h-9 sm:rounded-xl", children: [(0, s.jsx)(_.A, { size: 15 }), (0, s.jsx)("span", { className: "hidden sm:inline", children: "Voltar" })] }) : null,
                                            (0, s.jsx)("div", {
                                                className: "min-w-0",
                                                children: f
                                                    ? (0, s.jsxs)(s.Fragment, {
                                                          children: [
                                                              (0, s.jsxs)("div", { className: "flex items-center gap-2 sm:gap-2.5", children: [(0, s.jsx)("h2", { className: "text-lg sm:text-xl font-bold text-white tracking-tight", children: f }), a && (0, s.jsxs)("span", { className: "rounded-md border border-white/10 bg-white/10 px-2 py-0.5 font-mono text-[11px] sm:text-xs font-semibold text-slate-300", children: ["#", String(a).padStart(3, "0")] }), eB] }),
                                                              (0, s.jsx)("p", { className: "hidden sm:block mt-0.5 text-xs text-slate-400", children: "Escolha o idioma e a vers\xe3o f\xedsica, depois adicione \xe0 cole\xe7\xe3o" }),
                                                          ],
                                                      })
                                                    : (0, s.jsxs)(s.Fragment, {
                                                          children: [(0, s.jsxs)("div", { className: "flex items-center gap-2 sm:gap-2.5", children: [(0, s.jsx)("h2", { className: "text-lg sm:text-xl font-bold text-white tracking-tight", children: "Adicionar Carta \xe0 Cole\xe7\xe3o" }), eB] }), (0, s.jsx)("p", { className: "hidden sm:block mt-0.5 text-xs text-slate-400", children: "Busque no cat\xe1logo oficial do Pok\xe9mon TCG f\xedsico (Pok\xe9mon, Treinadores e Energias)" })],
                                                      }),
                                            }),
                                        ],
                                    }),
                                    (0, s.jsx)("button", { type: "button", onClick: b, disabled: eA, "aria-label": "Fechar", className: "flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:h-9 sm:w-9 sm:rounded-xl", children: (0, s.jsx)(E.A, { size: 18 }) }),
                                ],
                            }),
                            (0, s.jsxs)("div", {
                                className: "flex shrink-0 flex-col gap-2.5 border-b border-white/10 bg-black/20 px-3 py-2.5 sm:px-6 sm:py-3",
                                children: [
                                    (0, s.jsx)(v.h, {
                                        searchTerm: eu,
                                        onSearchChange: eh,
                                        showFilters: ej,
                                        onToggleFilters: () => ev((e) => !e),
                                        activeFilterCount: eO,
                                        filterButtonAriaLabel: "Alternar filtros de raridade, expans\xe3o e ilustrador",
                                        children: (0, s.jsxs)("div", {
                                            className: "grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2.5 pt-0.5 w-full",
                                            children: [
                                                (0, s.jsx)(g.l, { value: ep, onChange: ef, options: n.OI, icon: (0, s.jsx)(S.A, { size: 13 }), ariaLabel: "Filtrar cat\xe1logo por raridade", className: "w-full min-w-0", size: "sm" }),
                                                (0, s.jsx)(g.l, { value: eg, onChange: eb, options: eM, icon: (0, s.jsx)(M.A, { size: 13 }), ariaLabel: "Filtrar cat\xe1logo por expans\xe3o", className: "w-full min-w-0", size: "sm" }),
                                                (0, s.jsx)(g.l, { value: ey, onChange: ew, options: eL, icon: (0, s.jsx)(L.A, { size: 13 }), ariaLabel: "Filtrar cat\xe1logo por ilustrador", className: "col-span-2 sm:col-span-1 w-full min-w-0", size: "sm", align: "right" }),
                                            ],
                                        }),
                                    }),
                                    (0, s.jsxs)("div", {
                                        className: "modal-transient-content flex flex-col gap-1.5 sm:gap-2 border-t border-white/10 pt-2 sm:pt-2.5",
                                        children: [
                                            (0, s.jsxs)("div", { className: "flex items-center gap-1.5 text-slate-400", children: [(0, s.jsx)(I.A, { size: 11, className: "text-poke-blue shrink-0" }), (0, s.jsx)("span", { className: "text-[11px] sm:text-xs font-semibold tracking-wide text-slate-300", children: "Sua carta" })] }),
                                            (0, s.jsxs)("div", {
                                                className: "grid grid-cols-3 gap-1.5 sm:hidden",
                                                children: [(0, s.jsx)(g.l, { value: q, onChange: J, options: V, ariaLabel: "Idioma da carta a ser adicionada", size: "sm", className: "w-full" }), (0, s.jsx)(g.l, { value: W, onChange: G, options: o.AI, ariaLabel: "Vers\xe3o f\xedsica da carta a ser adicionada", size: "sm", className: "w-full" }), (0, s.jsx)(g.l, { value: U, onChange: D, options: i.Ey, ariaLabel: "Estado de conserva\xe7\xe3o da carta", size: "sm", className: "w-full" })],
                                            }),
                                            (0, s.jsxs)("div", {
                                                className: "hidden sm:grid sm:grid-cols-3 sm:gap-2.5",
                                                children: [(0, s.jsx)(p.G, { value: q, onChange: J, options: B, size: "sm", fullWidth: !0, ariaLabel: "Idioma da carta a ser adicionada" }), (0, s.jsx)(p.G, { value: W, onChange: G, options: o.xV, size: "sm", fullWidth: !0, ariaLabel: "Vers\xe3o f\xedsica da carta a ser adicionada" }), (0, s.jsx)(p.G, { value: U, onChange: D, options: i.Fx, size: "sm", fullWidth: !0, ariaLabel: "Estado de conserva\xe7\xe3o da carta" })],
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            es && (0, s.jsx)("div", { className: "mx-4 sm:mx-6 mt-2.5 sm:mt-3 shrink-0 rounded-lg border border-red-500/30 bg-red-500/15 p-2.5 sm:p-3 text-xs text-red-200", children: es }),
                            (0, s.jsx)("div", {
                                ref: ex,
                                className: "flex-1 overflow-y-auto p-3 sm:p-6",
                                children: $
                                    ? (0, s.jsx)("div", { className: "flex h-full min-h-[250px] flex-col items-center justify-center", children: (0, s.jsx)(h.i, { message: "Carregando cartas...", size: "md" }) })
                                    : 0 === H.length
                                      ? f || eu.trim()
                                          ? (0, s.jsxs)("div", { className: "flex h-full min-h-[250px] flex-col items-center justify-center gap-2 text-slate-500", children: [(0, s.jsx)(T.A, { size: 32, className: "text-slate-600" }), (0, s.jsx)("span", { className: "text-sm", children: "Nenhuma carta com imagem encontrada." })] })
                                          : (0, s.jsxs)("div", {
                                                className: "flex h-full min-h-[250px] flex-col items-center justify-center gap-2 text-center text-slate-500",
                                                children: [(0, s.jsx)(T.A, { size: 32, className: "text-slate-600" }), (0, s.jsx)("span", { className: "text-sm font-semibold text-white", children: "Pesquise no cat\xe1logo do Pok\xe9mon TCG" }), (0, s.jsx)("span", { className: "text-xs text-slate-400 max-w-sm", children: "Digite o nome, Pok\xe9dex (#001–#1025), n\xfamero de cole\xe7\xe3o (ex: 049, XY123, 25/165) ou combine (ex: Snivy 049, Venusaur (XY123))." })],
                                            })
                                      : 0 === eS.length
                                        ? (0, s.jsxs)("div", {
                                              className: "flex h-full min-h-[250px] flex-col items-center justify-center gap-3 text-center text-slate-500",
                                              children: [
                                                  (0, s.jsx)(T.A, { size: 32, className: "text-slate-600" }),
                                                  (0, s.jsx)("span", { className: "text-sm text-white", children: "Nenhuma carta encontrada" }),
                                                  (0, s.jsx)("span", { className: "text-xs", children: "Tente ajustar a busca ou os filtros." }),
                                                  (0, s.jsx)("button", {
                                                      type: "button",
                                                      onClick: () => {
                                                          (eh(""), ef("all"), eb(c.Ig), ew(c.ej));
                                                      },
                                                      className: "rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white",
                                                      children: "Limpar filtros",
                                                  }),
                                              ],
                                          })
                                        : (0, s.jsxs)("div", {
                                              className: "flex flex-col gap-4 sm:gap-6",
                                              children: [
                                                  (0, s.jsx)("div", {
                                                      className: "grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
                                                      children: eS.map((e, t) => {
                                                          var a;
                                                          let r = el.includes(e.id),
                                                              l = null != (a = eT[d(e.id, q, W, U)]) ? a : 0,
                                                              i = (function (e, t) {
                                                                  let a = "".concat(t, "_"),
                                                                      s = 0;
                                                                  for (let [t, r] of Object.entries(e)) t.startsWith(a) && (s += r);
                                                                  return s;
                                                              })(eT, e.id),
                                                              c = 0 === i,
                                                              m =
                                                                  i > 0 && 0 === l
                                                                      ? (function (e, t) {
                                                                            let a = "".concat(t, "_");
                                                                            return Object.entries(e)
                                                                                .filter((e) => {
                                                                                    let [t] = e;
                                                                                    return t.startsWith(a);
                                                                                })
                                                                                .map((e) => {
                                                                                    var t, s;
                                                                                    let [r, l] = e,
                                                                                        n = r.slice(a.length).split("_"),
                                                                                        o = null != (t = n.pop()) ? t : "NM",
                                                                                        i = null != (s = n.pop()) ? s : "normal";
                                                                                    return { language: n.join("_"), variant: i, condition: o, count: l };
                                                                                });
                                                                        })(eT, e.id)
                                                                      : null,
                                                              x = ""
                                                                  .concat(P[q], " \xb7 ")
                                                                  .concat((0, o.FB)(W), " \xb7 ")
                                                                  .concat(U),
                                                              u = l > 0 ? "voc\xea j\xe1 tem ".concat(1 === l ? "1 exemplar" : "".concat(l, " exemplares"), " nesta configura\xe7\xe3o") : i > 0 ? "voc\xea tem ".concat(1 === i ? "1 exemplar" : "".concat(i, " exemplares"), " em outra configura\xe7\xe3o") : null,
                                                              h = (0, N.O)(t),
                                                              p = e.rarity ? (0, n._I)(e.rarity, e.name) : null,
                                                              f = (0, o.WE)(W, e.rarity, e.image, e.name);
                                                          return (0, s.jsxs)(
                                                              "div",
                                                              {
                                                                  className: "group relative flex h-full flex-col justify-between gap-1.5 sm:gap-2 rounded-xl border p-2 sm:p-2.5 transition-all duration-200 ".concat(r ? "border-poke-blue bg-poke-blue/15 ring-2 ring-poke-blue/40" : c ? "border-white/5 bg-white/[0.015]" : "border-white/10 bg-white/[0.03] hover:border-poke-blue/50 hover:bg-white/[0.07]", " ").concat(h.className),
                                                                  style: h.style,
                                                                  children: [
                                                                      (0, s.jsxs)("div", {
                                                                          className: "relative aspect-[8/11] w-full shrink-0 cursor-pointer",
                                                                          onClick: () => eR(e),
                                                                          children: [
                                                                              (0, s.jsx)("div", { "data-missing": c ? "true" : void 0, className: "h-full w-full ".concat(c && !r ? "opacity-60 saturate-50 transition-opacity duration-200 group-hover:opacity-90" : ""), children: (0, s.jsx)(R, { card: e, shineMode: f }) }),
                                                                              c && !r ? (0, s.jsx)("div", { className: "pointer-events-none absolute inset-0 rounded-lg bg-black/25", "aria-hidden": "true" }) : null,
                                                                              l > 0 && !r
                                                                                  ? (0, s.jsxs)("span", {
                                                                                        "data-owned-count": "matching",
                                                                                        title: ""
                                                                                            .concat(1 === l ? "1 exemplar" : "".concat(l, " exemplares"), " de ")
                                                                                            .concat(e.name, " (")
                                                                                            .concat(x, ")"),
                                                                                        className: "absolute top-1.5 right-1.5 z-10 flex h-4.5 sm:h-5 items-center rounded bg-poke-blue px-1 font-mono text-[8px] font-extrabold text-white shadow-md sm:px-1.5 sm:text-[10px]",
                                                                                        children: ["x", l],
                                                                                    })
                                                                                  : m && !r
                                                                                    ? (0, s.jsxs)("span", {
                                                                                          "data-owned-count": "other",
                                                                                          title: "Voc\xea tem ".concat(
                                                                                              m
                                                                                                  .map((e) => {
                                                                                                      var t;
                                                                                                      return ""
                                                                                                          .concat(e.count, "\xd7 ")
                                                                                                          .concat(null != (t = P[e.language]) ? t : e.language.toUpperCase())
                                                                                                          .concat("normal" !== e.variant ? " ".concat((0, o.FB)(e.variant)) : "", " ")
                                                                                                          .concat(e.condition);
                                                                                                  })
                                                                                                  .join(" \xb7 "),
                                                                                          ),
                                                                                          className: "absolute top-1.5 right-1.5 z-10 flex h-4.5 sm:h-5 items-center gap-0.5 rounded bg-black/65 px-1 font-mono text-[8px] font-bold text-slate-300 ring-1 ring-white/20 backdrop-blur-sm sm:px-1.5 sm:text-[10px]",
                                                                                          children: [(0, s.jsx)(z.A, { size: 9, className: "shrink-0 text-emerald-300" }), "x", i],
                                                                                      })
                                                                                    : null,
                                                                          ],
                                                                      }),
                                                                      (0, s.jsxs)("div", {
                                                                          className: "flex min-w-0 flex-1 flex-col justify-center gap-0.5 sm:gap-1 py-0.5",
                                                                          children: [
                                                                              (0, s.jsx)("div", { className: "flex h-4 items-center min-w-0", children: (0, s.jsx)("span", { className: "truncate text-xs font-semibold transition-colors ".concat(c ? "text-slate-400" : "text-white group-hover:text-poke-blue"), title: e.name, children: e.name }) }),
                                                                              (0, s.jsxs)("div", {
                                                                                  className: "flex h-4 sm:h-5 items-center justify-between gap-1 min-w-0",
                                                                                  children: [
                                                                                      (0, s.jsx)("span", { className: "truncate text-[10px] sm:text-[11px] text-slate-400 min-w-0 flex-1", title: e.setName || "Cole\xe7\xe3o", children: e.setName || "Cole\xe7\xe3o" }),
                                                                                      p && (0, s.jsx)("span", { title: p.label, className: "shrink-0 inline-flex items-center rounded px-1 sm:px-1.5 py-0.5 text-[8.5px] sm:text-[9px] font-semibold border max-w-[70px] sm:max-w-[95px] ".concat(p.badgeClasses), children: (0, s.jsx)("span", { className: "truncate", children: p.label }) }),
                                                                                  ],
                                                                              }),
                                                                          ],
                                                                      }),
                                                                      (0, s.jsxs)("button", {
                                                                          type: "button",
                                                                          onClick: (t) => {
                                                                              (t.stopPropagation(), eR(e));
                                                                          },
                                                                          disabled: r,
                                                                          "aria-label": u ? "".concat(l > 0 ? "Adicionar mais 1 c\xf3pia de ".concat(e.name, " (").concat(x, ") \xe0 Cole\xe7\xe3o") : "Adicionar ".concat(e.name, " (").concat(x, ") \xe0 Cole\xe7\xe3o"), " — ").concat(u) : "".concat(l > 0 ? "Adicionar mais 1 c\xf3pia de ".concat(e.name, " (").concat(x, ") \xe0 Cole\xe7\xe3o") : "Adicionar ".concat(e.name, " (").concat(x, ") \xe0 Cole\xe7\xe3o")),
                                                                          title: ""
                                                                              .concat(l > 0 ? "Adicionar mais 1 c\xf3pia id\xeantica" : "Adicionar", " de ")
                                                                              .concat(e.name, " (")
                                                                              .concat(x, ") \xe0 Cole\xe7\xe3o")
                                                                              .concat(u ? " — ".concat(u) : ""),
                                                                          className: "mt-auto flex h-6.5 sm:h-7 w-full cursor-pointer items-center justify-center gap-1 rounded-md bg-white/10 px-1 text-[10.5px] sm:text-[11px] font-semibold text-white transition-colors hover:bg-poke-blue group-hover:bg-poke-blue disabled:opacity-60",
                                                                          children: [r ? (0, s.jsx)(j, { size: 12, className: "text-white" }) : l > 0 ? (0, s.jsx)(z.A, { size: 12, className: "shrink-0 text-emerald-300" }) : (0, s.jsx)(F.A, { size: 12, className: "shrink-0" }), (0, s.jsx)("span", { className: "whitespace-nowrap", children: l > 0 ? "+1" : "Adicionar" })],
                                                                      }),
                                                                  ],
                                                              },
                                                              e.id,
                                                          );
                                                      }),
                                                  }),
                                                  (0, s.jsx)("div", { ref: eF, className: "flex min-h-8 items-center justify-center", children: et && (0, s.jsxs)("div", { className: "flex items-center gap-2 text-xs text-slate-400", children: [(0, s.jsx)(j, { size: 16 }), (0, s.jsx)("span", { children: "Carregando mais cartas..." })] }) }),
                                              ],
                                          }),
                            }),
                        ],
                    }),
                });
            }
        },
        9926: (e, t, a) => {
            a.d(t, { A: () => s });
            let s = (0, a(1847).A)("Palette", [
                ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
                ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
                ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }],
                ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
                ["path", { d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z", key: "12rzf8" }],
            ]);
        },
    },
]);
