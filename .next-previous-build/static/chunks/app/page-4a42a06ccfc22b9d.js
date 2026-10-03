(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [8974],
    {
        2987: (e, r, t) => {
            "use strict";
            t.d(r, { A: () => a });
            let a = (0, t(1847).A)("ArrowRight", [
                ["path", { d: "M5 12h14", key: "1ays0h" }],
                ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }],
            ]);
        },
        3263: (e, r, t) => {
            "use strict";
            t.d(r, { v: () => l, wZ: () => a });
            let a = {
                classic_red: { id: "classic_red", name: "Vermelho Cl\xe1ssico", primaryColor: "#ef4444", glowColor: "rgba(239, 68, 68, 0.4)", bgGradient: "from-[#2b0f14] via-[#1a0c10] to-[#0c0608]", borderAccent: "#ef4444", leatherClass: "border-red-900/40 bg-[#160b0e]", ballType: "pokeball", material: "Couro granulado" },
                ocean_blue: { id: "ocean_blue", name: "Azul Oceano", primaryColor: "#3b82f6", glowColor: "rgba(59, 130, 246, 0.4)", bgGradient: "from-[#0f1d2e] via-[#0c1524] to-[#060a12]", borderAccent: "#3b82f6", leatherClass: "border-blue-900/40 bg-[#0a111c]", ballType: "greatball", material: "Tecido t\xe9cnico" },
                forest_green: { id: "forest_green", name: "Verde Floresta", primaryColor: "#10b981", glowColor: "rgba(16, 185, 129, 0.4)", bgGradient: "from-[#0e241b] via-[#091a13] to-[#050e0a]", borderAccent: "#10b981", leatherClass: "border-emerald-900/40 bg-[#07130e]", ballType: "safariball", material: "Lona encerada" },
                electric_yellow: { id: "electric_yellow", name: "Amarelo El\xe9trico", primaryColor: "#eab308", glowColor: "rgba(234, 179, 8, 0.4)", bgGradient: "from-[#2b240f] via-[#1c170a] to-[#0d0b05]", borderAccent: "#eab308", leatherClass: "border-yellow-900/40 bg-[#141107]", ballType: "ultraball", material: "Vinil texturizado" },
                shadow_purple: { id: "shadow_purple", name: "Roxo Noturno", primaryColor: "#a855f7", glowColor: "rgba(168, 85, 247, 0.4)", bgGradient: "from-[#23102d] via-[#180a20] to-[#0b040f]", borderAccent: "#a855f7", leatherClass: "border-purple-900/40 bg-[#120718]", ballType: "masterball", material: "Couro escovado" },
                charcoal_black: { id: "charcoal_black", name: "Couro Preto \xd4nix", primaryColor: "#94a3b8", glowColor: "rgba(148, 163, 184, 0.3)", bgGradient: "from-[#1c202a] via-[#13161e] to-[#090b0e]", borderAccent: "#cbd5e1", leatherClass: "border-slate-800 bg-[#0d0f14]", ballType: "duskball", material: "Couro liso" },
                golden_luxury: { id: "golden_luxury", name: "Dourado Nobre", primaryColor: "#f59e0b", glowColor: "rgba(245, 158, 11, 0.45)", bgGradient: "from-[#33220e] via-[#211508] to-[#0f0904]", borderAccent: "#f59e0b", leatherClass: "border-amber-900/40 bg-[#170f06]", ballType: "luxuryball", material: "Couro acetinado" },
            };
            function l(e) {
                return a[e || "classic_red"] || a.classic_red;
            }
            Object.keys(a);
        },
        3546: (e, r, t) => {
            "use strict";
            (t.d(r, { B_: () => c, DS: () => s, Q4: () => o, SJ: () => u, Wn: () => l, h4: () => n, lz: () => i, s2: () => a, vf: () => d }), t(6937));
            let a = 650,
                l = 0.65,
                s = 320,
                n = 384,
                i = 560,
                o = 480,
                d = 676,
                c = 56,
                u = 999999;
        },
        4716: (e, r, t) => {
            (Promise.resolve().then(t.bind(t, 1588)), Promise.resolve().then(t.bind(t, 5250)));
        },
        5250: (e, r, t) => {
            "use strict";
            t.d(r, { BinderShelf: () => B });
            var a = t(5155),
                l = t(2115),
                s = t(2619),
                n = t.n(s),
                i = t(63),
                o = t(9397),
                d = t(6191),
                c = t(6651),
                u = t(5229),
                x = t(9068),
                h = t(9708);
            let m = (0, t(1847).A)("Settings2", [
                ["path", { d: "M20 7h-9", key: "3s1dr2" }],
                ["path", { d: "M14 17H5", key: "gfn3mx" }],
                ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
                ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }],
            ]);
            var b = t(2987),
                p = t(4303),
                f = t(5239),
                g = t(6676),
                w = t(5512),
                v = t(3166),
                j = t(3263),
                y = t(1013),
                N = t(3546);
            let _ = { "1x1": "grid-cols-1 grid-rows-1", "2x2": "grid-cols-2 grid-rows-2", "3x3": "grid-cols-3 grid-rows-3", "3x4": "grid-cols-3 grid-rows-4" },
                k = { "1x1": 1, "2x2": 4, "3x3": 9, "3x4": 12 },
                C = (0, l.forwardRef)(function (e, r) {
                    let { binder: t } = e;
                    return (0, a.jsx)("div", { ref: r, "data-density": "hard", className: "binder-book-page binder-cover-front h-full w-full overflow-hidden rounded-[10px]", children: (0, a.jsx)(w.l, { name: t.name, coverTheme: t.cover_theme, coverPokemonDexId: t.cover_pokemon_dex_id, className: "h-full" }) });
                }),
                A = (0, l.forwardRef)(function (e, r) {
                    let { binder: t } = e,
                        l = (0, j.v)(t.cover_theme);
                    return (0, a.jsx)("div", {
                        ref: r,
                        "data-density": "hard",
                        className: "binder-book-page relative h-full w-full overflow-hidden rounded-[10px] border border-white/[0.08] bg-[#0c1017]",
                        style: { backgroundImage: "radial-gradient(circle at 50% 50%, ".concat(l.primaryColor, "22, transparent 44%), repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 8px)") },
                        children: (0, a.jsx)("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: (0, a.jsx)(v.z, { ballType: l.ballType, size: 180, className: "h-[52%] w-[52%] opacity-[0.09]", style: { filter: "none" } }) }),
                    });
                }),
                z = (0, l.forwardRef)(function (e, r) {
                    var t, s;
                    let { binder: n } = e,
                        i = (0, j.v)(n.cover_theme),
                        o = null != (t = n.preview_cards) ? t : [],
                        d = k[n.grid_type],
                        c = null != (s = n.total_cards) ? s : 0,
                        u = (0, l.useMemo)(() => {
                            let e = new Map();
                            for (let r of o) void 0 !== r.slot_index && e.set(r.slot_index, r);
                            return e;
                        }, [o]);
                    return (0, a.jsx)("div", {
                        ref: r,
                        "data-density": "soft",
                        className: "binder-book-page h-full w-full rounded-[10px] bg-[#0d111a]",
                        children: (0, a.jsxs)("div", {
                            className: "flex h-full min-h-0 w-full flex-col rounded-[10px] border border-white/[0.08] bg-gradient-to-br from-[#141824] via-[#10131d] to-[#0a0d14] p-2 text-white",
                            children: [
                                (0, a.jsxs)("div", { className: "mb-2 flex shrink-0 items-center justify-between border-b border-white/[0.08] pb-1.5 text-[9px] font-semibold text-slate-400", children: [(0, a.jsx)("span", { className: "text-slate-200", children: "P\xe1gina 1" }), (0, a.jsxs)("span", { style: { color: i.primaryColor }, children: [c, " cartas"] })] }),
                                (0, a.jsx)("div", {
                                    className: "grid min-h-0 flex-1 gap-1.5 rounded-[5px] border border-[#161b26] bg-[#0b0e15] p-1 ".concat(_[n.grid_type]),
                                    children: Array.from({ length: d }, (e, r) => {
                                        let t = r + 1,
                                            l = u.get(t);
                                        return (0, a.jsx)("div", { className: "relative min-h-0 overflow-hidden rounded-[3px] border border-white/[0.07] bg-black/20 shadow-inner", children: l && (0, a.jsx)(f.default, { src: l.card_image_url, alt: "", width: 84, height: 117, unoptimized: !0, className: "h-full w-full object-cover" }) }, t);
                                    }),
                                }),
                            ],
                        }),
                    });
                }),
                T = (0, l.forwardRef)(function (e, r) {
                    return (0, a.jsx)("div", { ref: r, "data-density": "soft", className: "binder-book-page h-full w-full rounded-[10px] border border-white/[0.06] bg-[#0d111a]" });
                }),
                R = (0, l.forwardRef)(function (e, r) {
                    let { binder: t } = e;
                    return (0, a.jsx)("div", { ref: r, "data-density": "hard", className: "binder-book-page binder-cover-back h-full w-full overflow-hidden rounded-[10px]", children: (0, a.jsx)(w.l, { name: t.name, coverTheme: t.cover_theme, coverPokemonDexId: null, back: !0, className: "h-full" }) });
                });
            function P(e) {
                var r;
                let { binder: t, active: s } = e,
                    n = (0, l.useContext)(y.cm),
                    i = null == (r = null == n ? void 0 : n.animationsEnabled) || r,
                    o = (0, l.useRef)(null),
                    d = (0, l.useRef)(null),
                    c = (0, l.useRef)(!1),
                    u = (0, l.useRef)(!1),
                    x = (0, l.useRef)(0),
                    h = (0, l.useRef)(s),
                    m = (0, l.useRef)(!1),
                    b = (0, l.useRef)(null),
                    p = (0, l.useRef)(0),
                    f = (0, l.useCallback)(() => {
                        var e;
                        let r = null == (e = d.current) ? void 0 : e.pageFlip();
                        if (r && c.current && !u.current) {
                            if (h.current && m.current && 0 === x.current) return void (i && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? ((r.getSettings().flippingTime = N.s2), r.flipNext()) : r.turnToPage(2));
                            h.current || 0 === x.current || (i && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? ((r.getSettings().flippingTime = N.s2), r.flipPrev()) : r.turnToPage(0));
                        }
                    }, [i]);
                (0, l.useEffect)(() => {
                    ((h.current = s), (m.current = !1));
                    let e = ++p.current;
                    return (
                        null !== b.current && (window.cancelAnimationFrame(b.current), (b.current = null)),
                        s
                            ? (b.current = window.requestAnimationFrame(() => {
                                  var r;
                                  b.current = null;
                                  let t = null == (r = o.current) ? void 0 : r.getAnimations().find((e) => "transitionProperty" in e && "transform" === e.transitionProperty),
                                      a = () => {
                                          e === p.current &&
                                              h.current &&
                                              (b.current = window.requestAnimationFrame(() => {
                                                  ((b.current = null), e === p.current && h.current && ((m.current = !0), f()));
                                              }));
                                      };
                                  t ? t.finished.then(a).catch(() => void 0) : a();
                              }))
                            : f(),
                        () => {
                            (p.current === e && (p.current += 1), null !== b.current && window.cancelAnimationFrame(b.current));
                        }
                    );
                }, [s, f]);
                let v = (0, l.useMemo)(() => [(0, a.jsx)(C, { binder: t }, "front"), (0, a.jsx)(A, { binder: t }, "inside-front"), (0, a.jsx)(z, { binder: t }, "catalog"), (0, a.jsx)(T, {}, "empty"), (0, a.jsx)(A, { binder: t }, "inside-back"), (0, a.jsx)(R, { binder: t }, "back")], [t]);
                return (0, a.jsxs)("div", {
                    ref: o,
                    "data-shelf-page": "0",
                    "data-shelf-ready": "false",
                    "data-shelf-state": "read",
                    className: "binder-shelf-stage relative mx-auto h-[372px] w-[264px] max-w-full",
                    children: [
                        (0, a.jsx)("div", { "aria-hidden": "true", "data-shelf-cover-fallback": !0, className: "pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden rounded-[10px]", children: (0, a.jsx)(w.l, { name: t.name, coverTheme: t.cover_theme, coverPokemonDexId: t.cover_pokemon_dex_id, className: "h-full" }) }),
                        (0, a.jsx)("div", {
                            className: "binder-shelf-engine relative z-10 h-[372px] w-[264px]",
                            children: (0, a.jsx)(g.A, {
                                ref: d,
                                width: 264,
                                height: 372,
                                size: "fixed",
                                minWidth: 264,
                                maxWidth: 264,
                                minHeight: 372,
                                maxHeight: 372,
                                maxShadowOpacity: N.Wn,
                                showCover: !0,
                                mobileScrollSupport: !0,
                                swipeDistance: N.SJ,
                                clickEventForward: !0,
                                disableFlipByClick: !i,
                                flippingTime: N.s2,
                                usePortrait: !1,
                                startPage: 0,
                                onInit: () => {
                                    ((c.current = !0), o.current && (o.current.dataset.shelfReady = "true"), f());
                                },
                                onChangeState: (e) => {
                                    let r = String(e.data);
                                    (o.current && (o.current.dataset.shelfState = r),
                                        (u.current = "read" !== r),
                                        u.current ||
                                            window.setTimeout(() => {
                                                f();
                                            }, 0));
                                },
                                onFlip: (e) => {
                                    ((x.current = Number(e.data) || 0), o.current && (o.current.dataset.shelfPage = String(x.current)));
                                },
                                drawShadow: i,
                                startZIndex: 0,
                                autoSize: !1,
                                useMouseEvents: !1,
                                showPageCorners: !1,
                                renderOnlyPageLengthChange: !0,
                                className: "binder-shelf-flipbook-root",
                                style: {},
                                children: v,
                            }),
                        }),
                    ],
                });
            }
            var S = t(7230),
                M = t(7152);
            function B(e) {
                let { initialBinders: r = [] } = e,
                    t = (0, i.useRouter)(),
                    { binders: s, isLoading: f, isError: g } = (0, M.v1)({ binders: r }),
                    [w, v] = (0, l.useState)(""),
                    [y, N] = (0, l.useState)(null),
                    _ = w.trim().toLocaleLowerCase(),
                    k = (0, l.useMemo)(
                        () =>
                            _
                                ? s.filter((e) => {
                                      var r;
                                      return ""
                                          .concat(e.name, " ")
                                          .concat(null != (r = e.description) ? r : "")
                                          .toLocaleLowerCase()
                                          .includes(_);
                                  })
                                : s,
                        [s, _],
                    ),
                    C = (0, l.useMemo)(() => s.reduce((e, r) => e + (r.total_cards || 0), 0), [s]);
                return (0, a.jsx)("div", {
                    className: "flex min-h-screen flex-col",
                    children: (0, a.jsxs)("main", {
                        className: "mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 pb-28 sm:px-6 sm:py-8 md:pb-16",
                        children: [
                            (0, a.jsxs)("div", {
                                className: "flex flex-col justify-between gap-4 md:flex-row md:items-center",
                                children: [
                                    (0, a.jsx)("div", { children: (0, a.jsx)("h1", { className: "text-2xl font-extrabold tracking-tight text-white sm:text-3xl", children: "Meus Binders" }) }),
                                    (0, a.jsxs)("div", {
                                        className: "flex flex-wrap items-center gap-3",
                                        children: [
                                            (0, a.jsxs)("div", {
                                                className: "flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300",
                                                children: [(0, a.jsx)(o.A, { size: 14, className: "text-slate-400" }), (0, a.jsxs)("span", { children: [(0, a.jsx)("strong", { className: "text-white", children: s.length }), " ", 1 === s.length ? "Binder" : "Binders"] }), (0, a.jsx)("span", { className: "text-white/20", children: "|" }), (0, a.jsxs)("span", { children: [(0, a.jsx)("strong", { className: "text-white", children: C }), " cartas alocadas"] })],
                                            }),
                                            (0, a.jsxs)(n(), { href: "/binders/new", className: "flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-poke-blue px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90", children: [(0, a.jsx)(d.A, { size: 18 }), (0, a.jsx)("span", { children: "Criar Binder" })] }),
                                        ],
                                    }),
                                ],
                            }),
                            (0, a.jsx)("div", {
                                className: "relative z-20 rounded-2xl border border-white/10 bg-[#121520]/80 p-2.5 shadow-xl backdrop-blur-md sm:p-3.5",
                                children: (0, a.jsxs)("div", {
                                    className: "relative",
                                    children: [
                                        (0, a.jsx)(c.A, { size: 15, className: "pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-500 sm:left-3.5 sm:h-4 sm:w-4" }),
                                        (0, a.jsx)(S.D, { type: "search", value: w, onChange: (e) => v(e.target.value), placeholder: "Buscar por nome ou descri\xe7\xe3o...", placeholderClassName: "left-8.5 right-8 text-xs sm:left-10 sm:right-9 sm:text-sm", className: "h-9 w-full rounded-xl border border-white/10 bg-white/5 py-2 pr-9 pl-8.5 text-xs text-white transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none sm:h-10 sm:py-2.5 sm:pr-10 sm:pl-10 sm:text-sm" }),
                                        w && (0, a.jsx)("button", { type: "button", onClick: () => v(""), "aria-label": "Limpar busca", className: "absolute top-1/2 right-2.5 z-20 -translate-y-1/2 text-slate-500 transition-colors hover:text-white sm:right-3", children: (0, a.jsx)(u.A, { size: 14, className: "sm:h-[15px] sm:w-[15px]" }) }),
                                    ],
                                }),
                            }),
                            f && 0 === s.length
                                ? (0, a.jsx)("div", { className: "flex h-64 flex-col items-center justify-center", children: (0, a.jsx)(p.i, { message: "Organizando estante...", size: "lg" }) })
                                : g && 0 === s.length
                                  ? (0, a.jsxs)("div", {
                                        className: "flex h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center",
                                        children: [(0, a.jsx)("p", { className: "text-sm text-red-400", children: "N\xe3o foi poss\xedvel carregar seus binders no momento." }), (0, a.jsx)("button", { type: "button", onClick: () => window.location.reload(), className: "rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20", children: "Recarregar p\xe1gina" })],
                                    })
                                  : (0, a.jsx)("div", {
                                        className: "relative",
                                        children:
                                            0 === k.length && _
                                                ? (0, a.jsxs)("div", {
                                                      className: "flex h-64 flex-col items-center justify-center gap-3 text-center",
                                                      children: [
                                                          (0, a.jsx)(c.A, { size: 32, className: "text-slate-600" }),
                                                          (0, a.jsxs)("div", { children: [(0, a.jsx)("p", { className: "text-sm font-semibold text-white", children: "Nenhum Binder encontrado" }), (0, a.jsx)("p", { className: "mt-1 text-xs text-slate-400", children: "Tente buscar por outro nome ou descri\xe7\xe3o." })] }),
                                                          (0, a.jsx)("button", { type: "button", onClick: () => v(""), className: "rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white", children: "Limpar busca" }),
                                                      ],
                                                  })
                                                : (0, a.jsxs)("div", {
                                                      className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                                                      children: [
                                                          k.map((e, r) => {
                                                              var l, s, i;
                                                              let o = (0, j.v)(e.cover_theme),
                                                                  d = null != (l = e.total_slots) ? l : 9 * e.total_pages,
                                                                  c = null != (s = e.completion_percentage) ? s : 0,
                                                                  u = null != (i = e.total_cards) ? i : 0,
                                                                  p = Math.min(40 * r, 480);
                                                              return (0, a.jsxs)(
                                                                  "div",
                                                                  {
                                                                      role: "link",
                                                                      tabIndex: 0,
                                                                      onClick: () => t.push("/binders/".concat(e.id)),
                                                                      onKeyDown: (r) => {
                                                                          ("Enter" === r.key || " " === r.key) && (r.preventDefault(), t.push("/binders/".concat(e.id)));
                                                                      },
                                                                      onMouseEnter: () => {
                                                                          (N(e.id), t.prefetch("/binders/".concat(e.id)));
                                                                      },
                                                                      onPointerDown: () => t.prefetch("/binders/".concat(e.id)),
                                                                      onMouseLeave: () => N((r) => (r === e.id ? null : r)),
                                                                      onFocus: () => {
                                                                          (N(e.id), t.prefetch("/binders/".concat(e.id)));
                                                                      },
                                                                      onBlur: (r) => {
                                                                          r.currentTarget.contains(r.relatedTarget) || N((r) => (r === e.id ? null : r));
                                                                      },
                                                                      "aria-label": "Abrir Binder ".concat(e.name),
                                                                      style: { animationDelay: "".concat(p, "ms") },
                                                                      className: "binder-shelf-card card-list-appear group relative flex cursor-pointer flex-col rounded-[20px] border border-white/10 bg-[#10131b]/70 p-3 outline-none transition-[border-color,background-color] duration-300 hover:border-white/20 hover:bg-[#131722] focus-visible:ring-2 focus-visible:ring-poke-blue/80",
                                                                      children: [
                                                                          (0, a.jsx)(P, { binder: e, active: y === e.id }, "".concat(e.id, "-").concat(e.updated_at)),
                                                                          (0, a.jsxs)("div", {
                                                                              className: "flex flex-1 flex-col justify-between px-1 pt-4",
                                                                              children: [
                                                                                  (0, a.jsxs)("div", {
                                                                                      children: [
                                                                                          (0, a.jsxs)("div", {
                                                                                              className: "flex items-start justify-between gap-2",
                                                                                              children: [
                                                                                                  (0, a.jsxs)("div", {
                                                                                                      className: "min-w-0",
                                                                                                      children: [
                                                                                                          (0, a.jsx)("h2", { className: "truncate text-[15px] font-bold tracking-tight text-white sm:text-base", children: e.name }),
                                                                                                          (0, a.jsxs)("div", {
                                                                                                              className: "mt-1 flex items-center gap-1.5 text-[11px] text-slate-400",
                                                                                                              children: [e.is_public ? (0, a.jsx)(x.A, { size: 13, className: "shrink-0 text-emerald-300", "aria-label": "Binder p\xfablico" }) : (0, a.jsx)(h.A, { size: 12, className: "shrink-0 text-slate-500", "aria-label": "Binder privado" }), (0, a.jsx)("span", { children: e.is_public ? "P\xfablico" : "Privado" })],
                                                                                                          }),
                                                                                                      ],
                                                                                                  }),
                                                                                                  (0, a.jsx)(n(), { href: "/binders/".concat(e.id, "/edit"), onClick: (e) => e.stopPropagation(), title: "Editar estrutura do Binder", className: "flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white", children: (0, a.jsx)(m, { size: 13 }) }),
                                                                                              ],
                                                                                          }),
                                                                                          e.description && (0, a.jsx)("p", { className: "mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400", children: e.description }),
                                                                                      ],
                                                                                  }),
                                                                                  (0, a.jsxs)("div", {
                                                                                      className: "mt-4 flex items-end justify-between border-t border-white/[0.07] pt-3",
                                                                                      children: [
                                                                                          (0, a.jsxs)("span", { className: "font-mono text-[11px] text-slate-400", children: [(0, a.jsx)("strong", { className: "font-semibold text-slate-200", children: u }), "/", d, " cartas"] }),
                                                                                          (0, a.jsxs)("div", { className: "flex items-center gap-2 text-[11px] font-semibold text-slate-400", children: [(0, a.jsxs)("span", { style: { color: o.primaryColor }, children: [c, "%"] }), (0, a.jsx)(b.A, { size: 13, className: "transition-transform duration-300 lg:group-hover:translate-x-0.5 lg:group-focus:translate-x-0.5" })] }),
                                                                                      ],
                                                                                  }),
                                                                              ],
                                                                          }),
                                                                      ],
                                                                  },
                                                                  e.id,
                                                              );
                                                          }),
                                                          !_ &&
                                                              (0, a.jsxs)(n(), {
                                                                  href: "/binders/new",
                                                                  prefetch: !0,
                                                                  style: { animationDelay: "".concat(Math.min(40 * k.length, 480), "ms") },
                                                                  className: "card-list-appear group flex min-h-[320px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.015] p-6 text-center transition-all duration-300 hover:border-poke-blue/60 hover:bg-poke-blue/[0.03] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] select-none",
                                                                  children: [
                                                                      (0, a.jsx)("div", { className: "flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400 shadow-inner transition-all duration-300 group-hover:border-poke-blue/50 group-hover:bg-poke-blue/20 group-hover:text-white", children: (0, a.jsx)(d.A, { size: 28 }) }),
                                                                      (0, a.jsx)("h3", { className: "mt-4 text-base font-bold text-white transition-colors group-hover:text-poke-blue", children: "Criar Binder" }),
                                                                      (0, a.jsx)("p", { className: "mt-1 max-w-[220px] text-xs text-slate-400", children: "Escolha uma capa, o formato da grade e a quantidade de p\xe1ginas." }),
                                                                  ],
                                                              }),
                                                      ],
                                                  }),
                                    }),
                        ],
                    }),
                });
            }
        },
        5512: (e, r, t) => {
            "use strict";
            t.d(r, { l: () => o });
            var a = t(5155),
                l = t(5239),
                s = t(3166),
                n = t(3263),
                i = t(6937);
            function o(e) {
                let { name: r, coverTheme: t, coverPokemonDexId: o = null, className: d = "", back: c = !1 } = e,
                    u = (0, n.v)(t);
                return (0, a.jsxs)("div", {
                    className: "relative isolate flex aspect-[480/676] min-h-0 w-full flex-col overflow-hidden rounded-[inherit] border border-white/[0.14] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_0_42px_rgba(0,0,0,0.58)] ".concat(d),
                    style: { backgroundColor: u.primaryColor, backgroundImage: "radial-gradient(circle at 12% 8%, rgba(255,255,255,0.2), transparent 24%), radial-gradient(circle at 88% 95%, rgba(0,0,0,0.62), transparent 42%), repeating-linear-gradient(112deg, rgba(255,255,255,0.055) 0 1px, transparent 1px 5px), linear-gradient(145deg, ".concat(u.primaryColor, " 0%, #11131a 58%, #07090d 100%)"), containerType: "inline-size" },
                    children: [
                        (0, a.jsx)("div", { className: "pointer-events-none absolute inset-[1.1%] rounded-[inherit] border border-white/[0.13]" }),
                        (0, a.jsx)("div", { className: "pointer-events-none absolute top-0 right-[17%] bottom-0 w-px bg-black/35 shadow-[1px_0_rgba(255,255,255,0.12)]" }),
                        (0, a.jsx)("div", { className: "pointer-events-none absolute top-0 right-[17%] bottom-0 w-[7%] translate-x-1/2 bg-gradient-to-l from-black/30 to-transparent blur-md" }),
                        (0, a.jsxs)("div", {
                            className: "relative flex h-full min-h-0 flex-col p-[6%]",
                            children: [
                                (0, a.jsxs)("div", { className: "flex items-center justify-between gap-2", children: [(0, a.jsx)("span", {}), !c && (0, a.jsx)(s.z, { ballType: u.ballType, size: 100, className: "h-auto w-[9%]" })] }),
                                (0, a.jsxs)("div", {
                                    className: "relative flex min-h-0 flex-1 flex-col items-center justify-center py-[3%] text-center",
                                    children: [
                                        !c && o
                                            ? (0, a.jsx)("div", { className: "relative flex aspect-square w-[48%] items-center justify-center rounded-full border border-white/25 bg-black/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_12px_30px_rgba(0,0,0,0.28)]", children: (0, a.jsx)(l.default, { src: (0, i.AU)(o), alt: "", width: 320, height: 320, unoptimized: !0, className: "h-[92%] w-[92%] object-contain drop-shadow-[0_6px_8px_rgba(0,0,0,0.56)] [image-rendering:pixelated]" }) })
                                            : c
                                              ? null
                                              : (0, a.jsx)(s.z, { ballType: u.ballType, size: 320, className: "h-auto w-[27%] opacity-80" }),
                                        !c && (0, a.jsx)("div", { className: "mt-[4%] w-full px-[4%]", children: (0, a.jsx)("h2", { className: "max-w-full break-words font-black leading-tight uppercase text-white drop-shadow-[0_3px_3px_rgba(0,0,0,0.7)]", style: { fontSize: "clamp(0.7rem, 5cqw, 1.5rem)" }, children: r }) }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                });
            }
        },
        7230: (e, r, t) => {
            "use strict";
            t.d(r, { D: () => s });
            var a = t(5155),
                l = t(2115);
            function s(e) {
                let { className: r = "", placeholder: t, placeholderClassName: s = "", value: n, ...i } = e,
                    o = (0, l.useRef)(null),
                    [d, c] = (0, l.useState)(t);
                (0, l.useEffect)(() => {
                    var e;
                    let r = o.current;
                    if (!r) return;
                    let a = null,
                        l = () => {
                            let e = getComputedStyle(r),
                                a = Math.max(0, r.clientWidth - Number.parseFloat(e.paddingLeft) - Number.parseFloat(e.paddingRight)),
                                l = document.createElement("canvas").getContext("2d");
                            if (!l) return;
                            l.font = e.font;
                            let s = (function (e, r, t) {
                                if (r <= t("…")) return "…";
                                if (t(e) <= r) return e;
                                let a = "";
                                for (let l of e.trim().split(/\s+/)) {
                                    let e = a ? "".concat(a, " ").concat(l) : l;
                                    if (t("".concat(e).concat("…")) > r) {
                                        let e = a.replace(/[,:;]+$/, "");
                                        return e ? "".concat(e).concat("…") : "…";
                                    }
                                    a = e;
                                }
                                return e;
                            })(t, a, (e) => l.measureText(e).width);
                            c((e) => (e === s ? e : s));
                        },
                        s = () => {
                            (null !== a && cancelAnimationFrame(a), (a = requestAnimationFrame(l)));
                        },
                        n = new ResizeObserver(s);
                    return (
                        n.observe(r),
                        s(),
                        null == (e = document.fonts) || e.ready.then(s),
                        () => {
                            (n.disconnect(), null !== a && cancelAnimationFrame(a));
                        }
                    );
                }, [t]);
                let u = "" === n || null == n;
                return (0, a.jsxs)("div", { className: "relative w-full min-w-0", children: [(0, a.jsx)("input", { ref: o, value: n, ...i, placeholder: "", "aria-placeholder": t, className: "".concat(r, " placeholder:text-transparent") }), u ? (0, a.jsx)("span", { "aria-hidden": "true", className: "pointer-events-none absolute inset-y-0 z-10 flex items-center overflow-hidden text-ellipsis whitespace-nowrap text-slate-500 ".concat(s), children: d }) : null] });
            }
        },
        9708: (e, r, t) => {
            "use strict";
            t.d(r, { A: () => a });
            let a = (0, t(1847).A)("Lock", [
                ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
                ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }],
            ]);
        },
    },
    (e) => {
        (e.O(0, [5730, 235, 2619, 5239, 8720, 4102, 9605, 5257, 1013, 6937, 148, 2006, 1588, 8441, 1255, 7358], () => e((e.s = 4716))), (_N_E = e.O()));
    },
]);
