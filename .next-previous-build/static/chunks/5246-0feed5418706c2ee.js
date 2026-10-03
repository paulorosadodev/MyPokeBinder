"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [5246],
    {
        1978: (e, t, l) => {
            l.d(t, { J: () => a });
            var n = l(5155);
            l(2115);
            var r = l(7801),
                s = l(6907),
                i = l(6151);
            function a(e) {
                let { condition: t, className: l = "", size: a = "sm", variant: o = "letters" } = e;
                if (!t) return null;
                let c = (0, i.kF)(t),
                    f = "alert" === c.iconType ? r.A : s.A;
                return "both" === o
                    ? (0, n.jsxs)("span", {
                          title: c.fullLabel,
                          "aria-label": c.fullLabel,
                          className: ""
                              .concat("md" === a ? "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold" : "inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[9px] font-bold", " ")
                              .concat(c.badgeClasses, " ")
                              .concat(l),
                          children: [(0, n.jsx)(f, { size: "md" === a ? 13 : 11, className: "shrink-0" }), (0, n.jsx)("span", { className: "font-mono", children: c.label })],
                      })
                    : "icon" === o
                      ? (0, n.jsx)("span", {
                            title: c.fullLabel,
                            "aria-label": c.fullLabel,
                            className: "flex shrink-0 items-center justify-center border "
                                .concat("md" === a ? "h-7 w-7 rounded-lg" : "xs" === a ? "h-4 w-4 rounded" : "h-4.5 sm:h-5 w-4.5 sm:w-5 rounded", " ")
                                .concat(c.badgeClasses, " ")
                                .concat(l),
                            children: (0, n.jsx)(f, { size: "md" === a ? 14 : "xs" === a ? 9 : 11, className: "sm" === a ? "sm:h-3 sm:w-3" : "" }),
                        })
                      : (0, n.jsx)("span", {
                            title: c.fullLabel,
                            "aria-label": c.fullLabel,
                            className: "shrink-0 "
                                .concat("md" === a ? "inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-bold" : "xs" === a ? "flex items-center rounded border px-1 font-mono text-[7px] font-bold shrink-0" : "flex h-4.5 sm:h-5 items-center rounded border px-1 font-mono text-[8px] font-bold sm:px-1.5 sm:text-[9px]", " ")
                                .concat(c.badgeClasses, " ")
                                .concat(l),
                            children: c.label,
                        });
            }
        },
        2671: (e, t, l) => {
            l.d(t, { MH: () => o, MI: () => c, y7: () => a });
            var n = l(5155),
                r = l(2115),
                s = l(5239);
            let i = new Set();
            function a(e) {
                return !!e && i.has(e);
            }
            function o(e) {
                let { src: t, alt: l, fill: o = !0, sizes: c, priority: f = !1, className: d = "", skeletonClassName: u = "", unoptimized: x = !0, draggable: h, onLoadingChange: m } = e,
                    p = a(t),
                    [b, w] = (0, r.useState)(p),
                    g = (0, r.useRef)(m),
                    v = (0, r.useRef)(t),
                    j = (0, r.useRef)(null);
                (0, r.useEffect)(() => {
                    g.current = m;
                }, [m]);
                let y = (0, r.useCallback)(() => {
                    var e;
                    (t && i.add(t), w(!0), null == (e = g.current) || e.call(g, !0));
                }, [t]);
                ((0, r.useEffect)(() => {
                    if (v.current !== t) {
                        var e;
                        v.current = t;
                        let l = a(t);
                        (w(l), null == (e = g.current) || e.call(g, l));
                    }
                }, [t]),
                    (0, r.useEffect)(() => {
                        if (a(t)) {
                            var e;
                            (w(!0), null == (e = g.current) || e.call(g, !0));
                            return;
                        }
                        j.current && j.current.complete && j.current.naturalWidth > 0 && y();
                    }, [t, y]));
                let k = (0, r.useCallback)(
                        (e) => {
                            ((j.current = e), e && e.complete && e.naturalWidth > 0 && y());
                        },
                        [y],
                    ),
                    N = (0, r.useCallback)(() => {
                        y();
                    }, [y]),
                    C = (0, r.useCallback)(() => {
                        y();
                    }, [y]);
                return (0, n.jsxs)(n.Fragment, {
                    children: [
                        !b &&
                            (0, n.jsx)("div", {
                                className: "card-skeleton ".concat(u),
                                children: (0, n.jsxs)("svg", {
                                    className: "h-7 w-7 text-white/20 animate-pulse select-none pointer-events-none",
                                    viewBox: "0 0 24 24",
                                    fill: "currentColor",
                                    children: [(0, n.jsx)("circle", { cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "2", fill: "none" }), (0, n.jsx)("line", { x1: "2", y1: "12", x2: "22", y2: "12", stroke: "currentColor", strokeWidth: "2" }), (0, n.jsx)("circle", { cx: "12", cy: "12", r: "3.5", stroke: "currentColor", strokeWidth: "2", fill: "#131722" }), (0, n.jsx)("circle", { cx: "12", cy: "12", r: "1.5", fill: "currentColor" })],
                                }),
                            }),
                        (0, n.jsx)(s.default, { ref: k, src: t, alt: l, fill: o, sizes: c, priority: f, className: "".concat(d, " transition-opacity duration-300 ").concat(b ? "opacity-100" : "opacity-0 pointer-events-none"), unoptimized: x, draggable: h, onLoad: N, onError: C }),
                    ],
                });
            }
            function c(e, t) {
                let l = a(t),
                    [n, s] = (0, r.useState)(l);
                return (
                    (0, r.useEffect)(() => {
                        t && a(t) ? s(!0) : s(!1);
                    }, [e, t]),
                    { loaded: n, setLoaded: s }
                );
            }
        },
        2755: (e, t, l) => {
            l.d(t, { i: () => r });
            var n = l(5155);
            function r(e) {
                let { country: t, className: l = "" } = e;
                return "pt-br" === t
                    ? (0, n.jsxs)("svg", { viewBox: "0 0 20 14", width: "18", height: "13", className: "overflow-hidden rounded-xs shadow-xs ".concat(l), children: [(0, n.jsx)("rect", { width: "20", height: "14", fill: "#009c3b" }), (0, n.jsx)("polygon", { points: "10,2 18,7 10,12 2,7", fill: "#ffdf00" }), (0, n.jsx)("circle", { cx: "10", cy: "7", r: "3.2", fill: "#002776" }), (0, n.jsx)("path", { d: "M7.2 7.2 Q10 6 12.8 7.6", stroke: "#ffffff", strokeWidth: "0.7", fill: "none" })] })
                    : "en" === t
                      ? (0, n.jsxs)("svg", {
                            viewBox: "0 0 20 14",
                            width: "18",
                            height: "13",
                            className: "overflow-hidden rounded-xs shadow-xs ".concat(l),
                            children: [
                                (0, n.jsx)("rect", { width: "20", height: "14", fill: "#b22234" }),
                                (0, n.jsx)("rect", { y: "1.08", width: "20", height: "1.08", fill: "#ffffff" }),
                                (0, n.jsx)("rect", { y: "3.24", width: "20", height: "1.08", fill: "#ffffff" }),
                                (0, n.jsx)("rect", { y: "5.4", width: "20", height: "1.08", fill: "#ffffff" }),
                                (0, n.jsx)("rect", { y: "7.56", width: "20", height: "1.08", fill: "#ffffff" }),
                                (0, n.jsx)("rect", { y: "9.72", width: "20", height: "1.08", fill: "#ffffff" }),
                                (0, n.jsx)("rect", { y: "11.88", width: "20", height: "1.08", fill: "#ffffff" }),
                                (0, n.jsx)("rect", { width: "9", height: "7.56", fill: "#3c3b6e" }),
                                (0, n.jsx)("circle", { cx: "2", cy: "2", r: "0.65", fill: "#ffffff" }),
                                (0, n.jsx)("circle", { cx: "4.5", cy: "2", r: "0.65", fill: "#ffffff" }),
                                (0, n.jsx)("circle", { cx: "7", cy: "2", r: "0.65", fill: "#ffffff" }),
                                (0, n.jsx)("circle", { cx: "3.25", cy: "3.78", r: "0.65", fill: "#ffffff" }),
                                (0, n.jsx)("circle", { cx: "5.75", cy: "3.78", r: "0.65", fill: "#ffffff" }),
                                (0, n.jsx)("circle", { cx: "2", cy: "5.56", r: "0.65", fill: "#ffffff" }),
                                (0, n.jsx)("circle", { cx: "4.5", cy: "5.56", r: "0.65", fill: "#ffffff" }),
                                (0, n.jsx)("circle", { cx: "7", cy: "5.56", r: "0.65", fill: "#ffffff" }),
                            ],
                        })
                      : (0, n.jsxs)("svg", { viewBox: "0 0 20 14", width: "18", height: "13", className: "overflow-hidden rounded-xs shadow-xs border border-white/20 ".concat(l), children: [(0, n.jsx)("rect", { width: "20", height: "14", fill: "#ffffff" }), (0, n.jsx)("circle", { cx: "10", cy: "7", r: "4.2", fill: "#bc002d" })] });
            }
            l(2115);
        },
        3698: (e, t, l) => {
            l.d(t, { l: () => c });
            var n = l(5155),
                r = l(2115),
                s = l(7650),
                i = l(5917),
                a = l(4033);
            let o = r.useLayoutEffect;
            function c(e) {
                let { value: t, onChange: l, options: c, placeholder: f = "Selecione uma op\xe7\xe3o", icon: d, disabled: u = !1, className: x = "", menuClassName: h = "", ariaLabel: m = "Seletor de op\xe7\xf5es", align: p = "left", size: b = "md", onOpenChange: w } = e,
                    [g, v] = (0, r.useState)(!1),
                    [j, y] = (0, r.useState)({}),
                    k = (0, r.useRef)(null),
                    N = (0, r.useRef)(null),
                    C = c.find((e) => e.value === t),
                    E = "sm" === b,
                    L = (e) => {
                        (v(e), null == w || w(e));
                    },
                    z = (0, r.useCallback)(() => {
                        let e = k.current;
                        if (!e) return;
                        let t = e.getBoundingClientRect(),
                            l = Math.min(240, 44 * c.length + 8),
                            n = window.innerHeight - t.bottom - 6,
                            r = n < l && t.top > n,
                            s = Math.max(t.width, 170),
                            i = "right" === p ? t.right - s : t.left;
                        ((i = Math.min(Math.max(8, i), window.innerWidth - s - 8)), y({ position: "fixed", top: r ? Math.max(8, t.top - l - 6) : t.bottom + 6, left: i, width: s, zIndex: 200 }));
                    }, [p, c.length]),
                    M = (0, r.useCallback)(
                        (e) => {
                            var t, l;
                            let n = e.target,
                                r = null == (t = k.current) ? void 0 : t.contains(n),
                                s = null == (l = N.current) ? void 0 : l.contains(n);
                            r || s || (v(!1), null == w || w(!1));
                        },
                        [w],
                    );
                (o(() => {
                    g && z();
                }, [g, z, t]),
                    (0, r.useEffect)(() => {
                        if (g)
                            return (
                                document.addEventListener("mousedown", M),
                                window.addEventListener("resize", z),
                                window.addEventListener("scroll", z, !0),
                                () => {
                                    (document.removeEventListener("mousedown", M), window.removeEventListener("resize", z), window.removeEventListener("scroll", z, !0));
                                }
                            );
                    }, [g, M, z]),
                    (0, r.useEffect)(() => {
                        u && g && L(!1);
                    }, [u]));
                let R = g
                    ? (0, s.createPortal)(
                          (0, n.jsx)("div", {
                              ref: N,
                              role: "listbox",
                              "aria-label": m,
                              style: j,
                              className: "rounded-xl border border-white/10 bg-[#121520] p-1 shadow-2xl backdrop-blur-md transition-all duration-150 animate-in fade-in zoom-in-95 ".concat(h),
                              children: (0, n.jsx)("div", {
                                  className: "flex max-h-60 flex-col gap-0.5 overflow-y-auto",
                                  children: c.map((e) => {
                                      let r = e.value === t,
                                          s = r ? e.selectedClassName || "border-poke-blue/30 bg-poke-blue/20 font-bold text-poke-blue shadow-[0_0_8px_var(--theme-primary-glow)]" : e.className || "border-transparent text-slate-300 font-medium hover:border-poke-blue/30 hover:bg-poke-blue/15 hover:text-poke-blue";
                                      return (0, n.jsxs)(
                                          "button",
                                          {
                                              type: "button",
                                              role: "option",
                                              "aria-selected": r,
                                              onClick: () => {
                                                  (l(e.value), L(!1));
                                              },
                                              className: "group/item flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border ".concat(E ? "px-2 sm:px-2.5 py-1.5 sm:py-2 text-[11px] sm:text-xs" : "px-2.5 py-2 text-xs", " transition-colors duration-150 ").concat(s),
                                              children: [
                                                  (0, n.jsxs)("div", { className: "flex min-w-0 items-center gap-2", children: [e.icon && (0, n.jsx)("span", { className: "shrink-0", children: e.icon }), (0, n.jsxs)("div", { className: "flex min-w-0 flex-col", children: [(0, n.jsx)("span", { className: "truncate", children: e.label }), e.description && (0, n.jsx)("span", { className: "truncate text-[10px] text-slate-400 group-hover/item:text-inherit", children: e.description })] })] }),
                                                  r && (0, n.jsx)(i.A, { size: 13, className: "shrink-0 ".concat(e.checkClassName || (e.selectedClassName ? "text-current" : "text-poke-blue")) }),
                                              ],
                                          },
                                          e.value,
                                      );
                                  }),
                              }),
                          }),
                          document.body,
                      )
                    : null;
                return (0, n.jsxs)("div", {
                    ref: k,
                    className: "relative inline-block min-w-0 ".concat(x || "w-full sm:w-auto"),
                    children: [
                        (0, n.jsxs)("button", {
                            type: "button",
                            onClick: () => {
                                u || L(!g);
                            },
                            onKeyDown: (e) => {
                                if (!u) {
                                    if ("Escape" === e.key) L(!1);
                                    else if ("ArrowDown" === e.key || "ArrowUp" === e.key)
                                        if ((e.preventDefault(), g)) {
                                            let n = c.findIndex((e) => e.value === t),
                                                r = "ArrowDown" === e.key ? (n + 1) % c.length : (n - 1 + c.length) % c.length;
                                            l(c[r].value);
                                        } else L(!0);
                                }
                            },
                            disabled: u,
                            "aria-haspopup": "listbox",
                            "aria-expanded": g,
                            "aria-label": m,
                            className: "group flex w-full items-center justify-between shadow-sm backdrop-blur-sm transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 "
                                .concat(E ? "h-7 sm:h-9 gap-1 sm:gap-2 rounded-lg sm:rounded-xl border px-1.5 sm:px-3 text-[11px] sm:text-xs font-semibold" : "h-9 gap-1.5 sm:gap-2.5 rounded-xl border px-2.5 sm:px-3 text-xs font-semibold", " ")
                                .concat((null == C ? void 0 : C.triggerClassName) ? C.triggerClassName : "border-white/10 bg-white/5 text-slate-200 ".concat(u ? "" : "hover:border-poke-blue/40 hover:bg-white/[0.08]", " focus:border-poke-blue focus:ring-1 focus:ring-poke-blue/40"), " ")
                                .concat(g ? ((null == C ? void 0 : C.triggerClassName) ? "ring-1 ring-current/40" : "border-poke-blue ring-1 ring-poke-blue/30 bg-white/[0.08]") : ""),
                            children: [
                                (0, n.jsxs)("div", {
                                    className: "flex min-w-0 items-center ".concat(E ? "gap-1 sm:gap-2" : "gap-1.5 sm:gap-2"),
                                    children: [(null == C ? void 0 : C.icon) ? (0, n.jsx)("span", { className: "shrink-0", children: C.icon }) : d && (0, n.jsx)("span", { className: "shrink-0 text-slate-400 transition-colors group-hover:text-poke-blue", children: d }), (0, n.jsx)("span", { className: "truncate ".concat((null == C ? void 0 : C.triggerTextClassName) || ((null == C ? void 0 : C.triggerClassName) ? "" : "text-slate-200")), children: C ? C.label : f })],
                                }),
                                (0, n.jsx)(a.A, {
                                    size: 14,
                                    className: "shrink-0 "
                                        .concat(E ? "h-3 w-3 sm:h-3.5 sm:w-3.5" : "h-3.5 w-3.5", " transition-transform duration-200 ")
                                        .concat(u ? "text-slate-400" : (null == C ? void 0 : C.triggerClassName) ? "text-current opacity-70 group-hover:opacity-100" : "text-slate-400 group-hover:text-poke-blue", " ")
                                        .concat(g ? "rotate-180 text-poke-blue" : ""),
                                }),
                            ],
                        }),
                        R,
                    ],
                });
            }
        },
        3848: (e, t, l) => {
            l.d(t, { O: () => n });
            function n(e, t) {
                var l, n;
                let r = null != (l = null == t ? void 0 : t.stepMs) ? l : 40,
                    s = null != (n = null == t ? void 0 : t.maxDelayMs) ? n : 480;
                return { className: "card-list-appear", style: { animationDelay: "".concat(Math.min(e * r, s), "ms") } };
            }
        },
        5801: (e, t, l) => {
            l.d(t, { X: () => r });
            var n = l(2115);
            function r(e) {
                let { hasMore: t, isLoading: l = !1, onLoadMore: r, rootMargin: s = "200px", root: i = null, enabled: a = !0 } = e,
                    o = (0, n.useRef)(null),
                    c = (0, n.useRef)(r);
                return (
                    (c.current = r),
                    (0, n.useEffect)(() => {
                        if (!a || !t || l) return;
                        let e = o.current;
                        if (!e) return;
                        let n = new IntersectionObserver(
                            (e) => {
                                var t;
                                (null == (t = e[0]) ? void 0 : t.isIntersecting) && c.current();
                            },
                            { root: i, rootMargin: s },
                        );
                        return (n.observe(e), () => n.disconnect());
                    }, [t, l, i, s, a]),
                    o
                );
            }
        },
        6092: (e, t, l) => {
            l.d(t, { m: () => r });
            var n = l(2115);
            function r(e, t) {
                let l = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                (0, n.useEffect)(() => {
                    if (!e || l) return;
                    let n = (e) => {
                        "Escape" === e.key && (e.preventDefault(), t());
                    };
                    return (window.addEventListener("keydown", n), () => window.removeEventListener("keydown", n));
                }, [e, t, l]);
            }
        },
        7230: (e, t, l) => {
            l.d(t, { D: () => s });
            var n = l(5155),
                r = l(2115);
            function s(e) {
                let { className: t = "", placeholder: l, placeholderClassName: s = "", value: i, ...a } = e,
                    o = (0, r.useRef)(null),
                    [c, f] = (0, r.useState)(l);
                (0, r.useEffect)(() => {
                    var e;
                    let t = o.current;
                    if (!t) return;
                    let n = null,
                        r = () => {
                            let e = getComputedStyle(t),
                                n = Math.max(0, t.clientWidth - Number.parseFloat(e.paddingLeft) - Number.parseFloat(e.paddingRight)),
                                r = document.createElement("canvas").getContext("2d");
                            if (!r) return;
                            r.font = e.font;
                            let s = (function (e, t, l) {
                                if (t <= l("…")) return "…";
                                if (l(e) <= t) return e;
                                let n = "";
                                for (let r of e.trim().split(/\s+/)) {
                                    let e = n ? "".concat(n, " ").concat(r) : r;
                                    if (l("".concat(e).concat("…")) > t) {
                                        let e = n.replace(/[,:;]+$/, "");
                                        return e ? "".concat(e).concat("…") : "…";
                                    }
                                    n = e;
                                }
                                return e;
                            })(l, n, (e) => r.measureText(e).width);
                            f((e) => (e === s ? e : s));
                        },
                        s = () => {
                            (null !== n && cancelAnimationFrame(n), (n = requestAnimationFrame(r)));
                        },
                        i = new ResizeObserver(s);
                    return (
                        i.observe(t),
                        s(),
                        null == (e = document.fonts) || e.ready.then(s),
                        () => {
                            (i.disconnect(), null !== n && cancelAnimationFrame(n));
                        }
                    );
                }, [l]);
                let d = "" === i || null == i;
                return (0, n.jsxs)("div", { className: "relative w-full min-w-0", children: [(0, n.jsx)("input", { ref: o, value: i, ...a, placeholder: "", "aria-placeholder": l, className: "".concat(t, " placeholder:text-transparent") }), d ? (0, n.jsx)("span", { "aria-hidden": "true", className: "pointer-events-none absolute inset-y-0 z-10 flex items-center overflow-hidden text-ellipsis whitespace-nowrap text-slate-500 ".concat(s), children: c }) : null] });
            }
        },
        7997: (e, t, l) => {
            l.d(t, { v: () => r });
            var n = l(2115);
            function r(e) {
                let [t, l] = (0, n.useState)(e),
                    [r, s] = (0, n.useState)(e ? "opening" : "closed");
                return (
                    (0, n.useEffect)(() => {
                        if (e) {
                            (l(!0), s("opening"));
                            let e = window.setTimeout(() => s("open"), 420);
                            return () => window.clearTimeout(e);
                        }
                        if (!t) return;
                        s("closing");
                        let n = window.setTimeout(() => {
                            (l(!1), s("closed"));
                        }, 280);
                        return () => window.clearTimeout(n);
                    }, [e, t]),
                    { isPresent: t, state: r }
                );
            }
        },
    },
]);
