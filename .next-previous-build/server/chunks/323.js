"use strict";
((exports.id = 323),
    (exports.ids = [323]),
    (exports.modules = {
        29589: (a, b, c) => {
            c.d(b, { D: () => f });
            var d = c(21124),
                e = c(38301);
            function f({ className: a = "", placeholder: b, placeholderClassName: c = "", value: f, ...g }) {
                let h = (0, e.useRef)(null),
                    [i, j] = (0, e.useState)(b),
                    k = "" === f || null == f;
                return (0, d.jsxs)("div", { className: "relative w-full min-w-0", children: [(0, d.jsx)("input", { ref: h, value: f, ...g, placeholder: "", "aria-placeholder": b, className: `${a} placeholder:text-transparent` }), k ? (0, d.jsx)("span", { "aria-hidden": "true", className: `pointer-events-none absolute inset-y-0 z-10 flex items-center overflow-hidden text-ellipsis whitespace-nowrap text-slate-500 ${c}`, children: i }) : null] });
            }
        },
        38984: (a, b, c) => {
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
        42593: (a, b, c) => {
            c.d(b, { v: () => e });
            var d = c(38301);
            function e(a) {
                let [b, c] = (0, d.useState)(a),
                    [e, f] = (0, d.useState)(a ? "opening" : "closed");
                return { isPresent: b, state: e };
            }
        },
        51155: (a, b, c) => {
            c.d(b, { X: () => e });
            var d = c(38301);
            function e({ hasMore: a, isLoading: b = !1, onLoadMore: c, rootMargin: e = "200px", root: f = null, enabled: g = !0 }) {
                let h = (0, d.useRef)(null);
                return (((0, d.useRef)(c).current = c), h);
            }
        },
        65687: (a, b, c) => {
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
        66088: (a, b, c) => {
            c.d(b, { l: () => j });
            var d = c(21124),
                e = c(38301),
                f = c(23312),
                g = c(71613),
                h = c(85351);
            let i = e.useEffect;
            function j({ value: a, onChange: b, options: c, placeholder: j = "Selecione uma op\xe7\xe3o", icon: k, disabled: l = !1, className: m = "", menuClassName: n = "", ariaLabel: o = "Seletor de op\xe7\xf5es", align: p = "left", size: q = "md", onOpenChange: r }) {
                let [s, t] = (0, e.useState)(!1),
                    [u, v] = (0, e.useState)({}),
                    w = (0, e.useRef)(null),
                    x = (0, e.useRef)(null),
                    y = c.find((b) => b.value === a),
                    z = "sm" === q,
                    A = (a) => {
                        (t(a), r?.(a));
                    },
                    B = (0, e.useCallback)(() => {
                        let a = w.current;
                        if (!a) return;
                        let b = a.getBoundingClientRect(),
                            d = Math.min(240, 44 * c.length + 8),
                            e = window.innerHeight - b.bottom - 6,
                            f = e < d && b.top > e,
                            g = Math.max(b.width, 170),
                            h = "right" === p ? b.right - g : b.left;
                        ((h = Math.min(Math.max(8, h), window.innerWidth - g - 8)), v({ position: "fixed", top: f ? Math.max(8, b.top - d - 6) : b.bottom + 6, left: h, width: g, zIndex: 200 }));
                    }, [p, c.length]);
                ((0, e.useCallback)(
                    (a) => {
                        let b = a.target,
                            c = w.current?.contains(b),
                            d = x.current?.contains(b);
                        c || d || (t(!1), r?.(!1));
                    },
                    [r],
                ),
                    i(() => {
                        s && B();
                    }, [s, B, a]));
                let C = s
                    ? (0, f.createPortal)(
                          (0, d.jsx)("div", {
                              ref: x,
                              role: "listbox",
                              "aria-label": o,
                              style: u,
                              className: `rounded-xl border border-white/10 bg-[#121520] p-1 shadow-2xl backdrop-blur-md transition-all duration-150 animate-in fade-in zoom-in-95 ${n}`,
                              children: (0, d.jsx)("div", {
                                  className: "flex max-h-60 flex-col gap-0.5 overflow-y-auto",
                                  children: c.map((c) => {
                                      let e = c.value === a,
                                          f = e ? c.selectedClassName || "border-poke-blue/30 bg-poke-blue/20 font-bold text-poke-blue shadow-[0_0_8px_var(--theme-primary-glow)]" : c.className || "border-transparent text-slate-300 font-medium hover:border-poke-blue/30 hover:bg-poke-blue/15 hover:text-poke-blue";
                                      return (0, d.jsxs)(
                                          "button",
                                          {
                                              type: "button",
                                              role: "option",
                                              "aria-selected": e,
                                              onClick: () => {
                                                  (b(c.value), A(!1));
                                              },
                                              className: `group/item flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border ${z ? "px-2 sm:px-2.5 py-1.5 sm:py-2 text-[11px] sm:text-xs" : "px-2.5 py-2 text-xs"} transition-colors duration-150 ${f}`,
                                              children: [
                                                  (0, d.jsxs)("div", { className: "flex min-w-0 items-center gap-2", children: [c.icon && (0, d.jsx)("span", { className: "shrink-0", children: c.icon }), (0, d.jsxs)("div", { className: "flex min-w-0 flex-col", children: [(0, d.jsx)("span", { className: "truncate", children: c.label }), c.description && (0, d.jsx)("span", { className: "truncate text-[10px] text-slate-400 group-hover/item:text-inherit", children: c.description })] })] }),
                                                  e && (0, d.jsx)(g.A, { size: 13, className: `shrink-0 ${c.checkClassName || (c.selectedClassName ? "text-current" : "text-poke-blue")}` }),
                                              ],
                                          },
                                          c.value,
                                      );
                                  }),
                              }),
                          }),
                          document.body,
                      )
                    : null;
                return (0, d.jsxs)("div", {
                    ref: w,
                    className: `relative inline-block min-w-0 ${m || "w-full sm:w-auto"}`,
                    children: [
                        (0, d.jsxs)("button", {
                            type: "button",
                            onClick: () => {
                                l || A(!s);
                            },
                            onKeyDown: (d) => {
                                if (!l) {
                                    if ("Escape" === d.key) A(!1);
                                    else if ("ArrowDown" === d.key || "ArrowUp" === d.key)
                                        if ((d.preventDefault(), s)) {
                                            let e = c.findIndex((b) => b.value === a),
                                                f = "ArrowDown" === d.key ? (e + 1) % c.length : (e - 1 + c.length) % c.length;
                                            b(c[f].value);
                                        } else A(!0);
                                }
                            },
                            disabled: l,
                            "aria-haspopup": "listbox",
                            "aria-expanded": s,
                            "aria-label": o,
                            className: `group flex w-full items-center justify-between shadow-sm backdrop-blur-sm transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${z ? "h-7 sm:h-9 gap-1 sm:gap-2 rounded-lg sm:rounded-xl border px-1.5 sm:px-3 text-[11px] sm:text-xs font-semibold" : "h-9 gap-1.5 sm:gap-2.5 rounded-xl border px-2.5 sm:px-3 text-xs font-semibold"} ${y?.triggerClassName ? y.triggerClassName : `border-white/10 bg-white/5 text-slate-200 ${l ? "" : "hover:border-poke-blue/40 hover:bg-white/[0.08]"} focus:border-poke-blue focus:ring-1 focus:ring-poke-blue/40`} ${s ? (y?.triggerClassName ? "ring-1 ring-current/40" : "border-poke-blue ring-1 ring-poke-blue/30 bg-white/[0.08]") : ""}`,
                            children: [
                                (0, d.jsxs)("div", {
                                    className: `flex min-w-0 items-center ${z ? "gap-1 sm:gap-2" : "gap-1.5 sm:gap-2"}`,
                                    children: [y?.icon ? (0, d.jsx)("span", { className: "shrink-0", children: y.icon }) : k && (0, d.jsx)("span", { className: "shrink-0 text-slate-400 transition-colors group-hover:text-poke-blue", children: k }), (0, d.jsx)("span", { className: `truncate ${y?.triggerTextClassName || (y?.triggerClassName ? "" : "text-slate-200")}`, children: y ? y.label : j })],
                                }),
                                (0, d.jsx)(h.A, { size: 14, className: `shrink-0 ${z ? "h-3 w-3 sm:h-3.5 sm:w-3.5" : "h-3.5 w-3.5"} transition-transform duration-200 ${l ? "text-slate-400" : y?.triggerClassName ? "text-current opacity-70 group-hover:opacity-100" : "text-slate-400 group-hover:text-poke-blue"} ${s ? "rotate-180 text-poke-blue" : ""}` }),
                            ],
                        }),
                        C,
                    ],
                });
            }
        },
        72190: (a, b, c) => {
            c.d(b, { O: () => d });
            function d(a, b) {
                let c = b?.stepMs ?? 40,
                    d = b?.maxDelayMs ?? 480;
                return { className: "card-list-appear", style: { animationDelay: `${Math.min(a * c, d)}ms` } };
            }
        },
        72937: (a, b, c) => {
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
            function d(a, b, c = !1) {}
            (c.d(b, { m: () => d }), c(38301));
        },
    }));
