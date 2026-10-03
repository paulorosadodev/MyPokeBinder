"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [148],
    {
        113: (e, r, t) => {
            t.d(r, { Mr: () => c });
            var n = t(6937);
            let a = { colorless: "Colorless", normal: "Colorless", dark: "Darkness", darkness: "Darkness", dragon: "Dragon", fairy: "Fairy", fighting: "Fighting", fire: "Fire", grass: "Grass", electric: "Lightning", lightning: "Lightning", metal: "Metal", steel: "Metal", psychic: "Psychic", water: "Water" },
                l = { grass: "Grass", fire: "Fire", water: "Water", electric: "Lightning", bug: "Grass", normal: "Colorless", poison: "Psychic", ground: "Fighting", rock: "Fighting", fighting: "Fighting", psychic: "Psychic", ghost: "Psychic", ice: "Water", dragon: "Dragon", fairy: "Fairy", steel: "Metal", dark: "Darkness", flying: "Colorless" };
            function c(e, r) {
                let t = (function (e) {
                    if (!Array.isArray(e)) return [];
                    let r = [];
                    for (let t of e) {
                        if ("string" != typeof t) continue;
                        let e = a[t.trim().toLowerCase()];
                        if ((e && !r.includes(e) && r.push(e), 2 === r.length)) break;
                    }
                    return r;
                })(e);
                if (t.length > 0) return t;
                if (!r) return ["Colorless"];
                let c = (0, n.Z3)(r);
                return c ? [l[c.type]] : ["Colorless"];
            }
        },
        148: (e, r, t) => {
            t.d(r, { LW: () => d });
            var n = t(5155),
                a = t(2115),
                l = t(1013);
            function c(e) {
                let { type: r } = e;
                return "Colorless" === r
                    ? (0, n.jsx)("path", { d: "M12 3.5 14.1 9l5.4 3-5.4 3-2.1 5.5L9.9 15l-5.4-3 5.4-3L12 3.5Z" })
                    : "Darkness" === r
                      ? (0, n.jsx)("path", { d: "M17.8 16.7A8 8 0 0 1 8.1 5.3a8.2 8.2 0 1 0 9.7 11.4Z" })
                      : "Dragon" === r
                        ? (0, n.jsxs)("g", { fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: [(0, n.jsx)("path", { d: "m5.5 18 5.8-13 2.2 7 5-3-3.2 9-4.2-3.3L5.5 18Z" }), (0, n.jsx)("circle", { cx: "13.8", cy: "9.1", r: "1", fill: "currentColor", stroke: "none" })] })
                        : "Fairy" === r
                          ? (0, n.jsxs)("g", { children: [(0, n.jsx)("path", { d: "M12 2.8c.8 5.8 2.3 7.3 8.2 8.2-5.9.9-7.4 2.4-8.2 8.2-.8-5.8-2.3-7.3-8.2-8.2 5.9-.9 7.4-2.4 8.2-8.2Z" }), (0, n.jsx)("circle", { cx: "18.5", cy: "5.5", r: "1.4" })] })
                          : "Fighting" === r
                            ? (0, n.jsx)("path", { d: "M6.1 10.8V7.1a1.7 1.7 0 0 1 3.4 0V5.8a1.7 1.7 0 0 1 3.4 0v.7a1.7 1.7 0 0 1 3.4.2 1.7 1.7 0 0 1 2.9 1.2v5.8c0 4.3-2.8 7.1-7.2 7.1-3.8 0-6.9-2.5-7.3-6.3l-.3-2.9a1.7 1.7 0 0 1 1.7-.8Z" })
                            : "Fire" === r
                              ? (0, n.jsx)("path", { d: "M13.2 2.8c.8 4.1-2.8 5.1-1.5 8.4.7-1.4 1.8-2.3 3.4-3.2 2.1 2 3.5 4.2 3.5 6.8 0 3.9-2.9 6.7-6.7 6.7s-6.7-2.7-6.7-6.5c0-4.1 3.1-6 4.9-8.8.3 1.8.1 3.1-.4 4.2 2.7-1.7 1.7-5.3 3.5-7.6Z" })
                              : "Grass" === r
                                ? (0, n.jsxs)("g", { fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: [(0, n.jsx)("path", { d: "M19.7 4.2C12 4.5 6.1 7.4 5.5 13.1c-.4 4.1 2.8 6.6 6.4 5.4 4.5-1.6 6.7-7.3 7.8-14.3Z" }), (0, n.jsx)("path", { d: "M5.1 20c2.5-4.5 5.9-7.6 10.6-10.1" })] })
                                : "Lightning" === r
                                  ? (0, n.jsx)("path", { d: "m13.8 2.7-8 11h5.4l-1 7.6 8-11h-5.4l1-7.6Z" })
                                  : "Metal" === r
                                    ? (0, n.jsxs)("g", { fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: [(0, n.jsx)("path", { d: "m12 3.5 7.4 4.2v8.6L12 20.5l-7.4-4.2V7.7L12 3.5Z" }), (0, n.jsx)("circle", { cx: "12", cy: "12", r: "3.1" })] })
                                    : "Psychic" === r
                                      ? (0, n.jsxs)("g", { fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: [(0, n.jsx)("path", { d: "M3.4 12s3.2-5.1 8.6-5.1 8.6 5.1 8.6 5.1-3.2 5.1-8.6 5.1S3.4 12 3.4 12Z" }), (0, n.jsx)("circle", { cx: "12", cy: "12", r: "2.8", fill: "currentColor" })] })
                                      : "Water" === r
                                        ? (0, n.jsx)("path", { d: "M12 2.8c2.7 4.2 6.1 8.3 6.1 12.1a6.1 6.1 0 0 1-12.2 0C5.9 11.1 9.3 7 12 2.8Z" })
                                        : null;
            }
            let s = (0, a.memo)(function (e) {
                let { type: r } = e,
                    t = "card-element-".concat((0, a.useId)().replaceAll(":", ""));
                return (0, n.jsxs)("svg", {
                    className: "card-element-pattern",
                    viewBox: "0 0 240 330",
                    preserveAspectRatio: "none",
                    "aria-hidden": !0,
                    children: [
                        (0, n.jsx)("defs", {
                            children: (0, n.jsxs)("pattern", { id: t, width: "44", height: "44", patternUnits: "userSpaceOnUse", patternTransform: "rotate(-8)", children: [(0, n.jsx)("g", { className: "card-element-pattern__symbol", transform: "translate(10 10) scale(.92)", children: (0, n.jsx)(c, { type: r }) }), (0, n.jsx)("g", { className: "card-element-pattern__symbol card-element-pattern__symbol--soft", transform: "translate(32 32) scale(.58)", children: (0, n.jsx)(c, { type: r }) })] }),
                        }),
                        (0, n.jsx)("rect", { width: "100%", height: "100%", fill: "url(#".concat(t, ")") }),
                    ],
                });
            });
            var o = t(113);
            let i = "none";
            function u(e) {
                ((e.style.transform = i), e.style.removeProperty("--card-return-duration"), e.style.setProperty("--card-pointer-x", "50"), e.style.setProperty("--card-pointer-y", "50"), e.style.setProperty("--card-tilt", "0"), e.style.setProperty("--card-shine-opacity", "0"), e.style.setProperty("--card-glare-x", "50%"), e.style.setProperty("--card-glare-y", "50%"), e.style.setProperty("--card-glare-angle", "135deg"));
            }
            function d(e) {
                let { children: r, className: t = "", glareOpacity: c = 0.25, maxTilt: d = 15, scale: h = 1.05, perspective: y = 800, transitionDuration: p = 500, maxMove: g = 0, shineMode: m = "none", elementTypes: f, paused: x = !1, onClick: j, enableTouch: C = !1, isLoading: k = !1 } = e,
                    v = (0, a.useContext)(l.cm),
                    M = !v || v.animationsEnabled,
                    P = x || k || !M,
                    F = k ? "none" : m,
                    b = k ? null : f,
                    w = (0, a.useRef)(null),
                    D = (0, a.useRef)(!1),
                    L = (0, a.useRef)(0),
                    T = (0, a.useRef)(null),
                    Z = (0, a.useRef)(null),
                    [E, _] = (0, a.useState)(!1),
                    A = "prismatic" === F ? Math.max(c, 0.52) : "holo" === F ? Math.max(c, 0.46) : "foil" === F ? Math.max(c, 0.42) : c,
                    N = (0, a.useCallback)(() => {
                        (T.current && cancelAnimationFrame(T.current), (T.current = null), Z.current && clearTimeout(Z.current), (Z.current = null), _(!1));
                        let e = w.current;
                        if (e) {
                            if (P) {
                                ((e.style.transition = "none"), u(e));
                                return;
                            }
                            ((e.style.transition = "transform ".concat(p, "ms cubic-bezier(0.23, 1, 0.32, 1), z-index 0s linear ").concat(p, "ms")),
                                e.style.setProperty("--card-return-duration", "".concat(p, "ms")),
                                (e.style.transform = (function () {
                                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 800;
                                    return "perspective(".concat(e, "px) rotateX(0deg) rotateY(0deg) translate3d(0px,0px,0) scale3d(1,1,1)");
                                })(y)),
                                e.style.setProperty("--card-pointer-x", "50"),
                                e.style.setProperty("--card-pointer-y", "50"),
                                e.style.setProperty("--card-tilt", "0"),
                                e.style.setProperty("--card-shine-opacity", "0"),
                                e.style.setProperty("--card-glare-x", "50%"),
                                e.style.setProperty("--card-glare-y", "50%"),
                                e.style.setProperty("--card-glare-angle", "135deg"),
                                (Z.current = setTimeout(() => {
                                    (w.current && (w.current.style.transform = i), (Z.current = null));
                                }, p)));
                        }
                    }, [P, y, p]);
                ((0, a.useEffect)(() => {
                    let e = w.current;
                    e && u(e);
                }, []),
                    (0, a.useEffect)(() => {
                        P && N();
                    }, [P, N]),
                    (0, a.useEffect)(
                        () => () => {
                            (T.current && cancelAnimationFrame(T.current), Z.current && clearTimeout(Z.current));
                        },
                        [],
                    ));
                let W = (0, a.useCallback)(
                        (e, r) => {
                            if (P) return;
                            let t = w.current;
                            t &&
                                (Z.current && (clearTimeout(Z.current), (Z.current = null)),
                                T.current && cancelAnimationFrame(T.current),
                                (T.current = requestAnimationFrame(() => {
                                    var n;
                                    let a = (null != (n = t.parentElement) ? n : t).getBoundingClientRect(),
                                        l = e - a.left,
                                        c = r - a.top,
                                        s = a.width / 2,
                                        o = a.height / 2,
                                        i = Math.max(-1, Math.min(1, (l - s) / s)),
                                        u = Math.max(-1, Math.min(1, (c - o) / o)),
                                        p = i * d,
                                        m = -u * d,
                                        f = g ? i * g : 0,
                                        x = g ? u * g : 0,
                                        j = ((i + 1) / 2) * 100,
                                        C = ((u + 1) / 2) * 100,
                                        k = Math.min(1, Math.hypot(i, u)),
                                        v = (180 / Math.PI) * Math.atan2(u, i) + 90,
                                        M = (0.28 + 0.72 * k) * A;
                                    ((t.style.transition = "transform 45ms linear"),
                                        (t.style.transform = "perspective(".concat(y, "px) rotateX(").concat(m.toFixed(2), "deg) rotateY(").concat(p.toFixed(2), "deg) translate3d(").concat(f.toFixed(2), "px,").concat(x.toFixed(2), "px,0) scale3d(").concat(h, ",").concat(h, ",").concat(h, ")")),
                                        t.style.setProperty("--card-pointer-x", j.toFixed(2)),
                                        t.style.setProperty("--card-pointer-y", C.toFixed(2)),
                                        t.style.setProperty("--card-tilt", k.toFixed(3)),
                                        t.style.setProperty("--card-shine-opacity", M.toFixed(3)),
                                        t.style.setProperty("--card-glare-x", "".concat(j.toFixed(2), "%")),
                                        t.style.setProperty("--card-glare-y", "".concat(C.toFixed(2), "%")),
                                        t.style.setProperty("--card-glare-angle", "".concat(v.toFixed(1), "deg")));
                                })));
                        },
                        [d, h, y, A, g, P],
                    ),
                    R = (0, a.useCallback)(
                        (e) => {
                            D.current || Date.now() - L.current < 500 || W(e.clientX, e.clientY);
                        },
                        [W],
                    ),
                    z = (0, a.useCallback)(() => {
                        P || D.current || Date.now() - L.current < 500 || (Z.current && (clearTimeout(Z.current), (Z.current = null)), _(!0));
                    }, [P]),
                    X = (0, a.useCallback)(() => {
                        D.current || Date.now() - L.current < 500 || N();
                    }, [N]),
                    Y = (0, a.useCallback)(
                        (e) => {
                            if (P || !C) return;
                            ((D.current = !0), Z.current && (clearTimeout(Z.current), (Z.current = null)));
                            let r = e.touches[0];
                            r && (_(!0), W(r.clientX, r.clientY));
                        },
                        [P, C, W],
                    ),
                    G = (0, a.useCallback)(
                        (e) => {
                            if (P || !C) return;
                            (e.cancelable && e.preventDefault(), (D.current = !0), Z.current && (clearTimeout(Z.current), (Z.current = null)));
                            let r = e.touches[0];
                            r && (_((e) => !e || e), W(r.clientX, r.clientY));
                        },
                        [P, C, W],
                    ),
                    S = (0, a.useCallback)(() => {
                        C && ((D.current = !1), (L.current = Date.now()), N());
                    }, [C, N]),
                    I = (0, a.useCallback)(() => {
                        C && ((D.current = !1), (L.current = Date.now()), N());
                    }, [C, N]),
                    V = P || "prismatic" !== m ? (P || "holo" !== m ? (P || "foil" !== m ? null : "foil-sheen") : "holo-sheen") : "prismatic-sheen",
                    B = P || "prismatic" !== m ? (P || "holo" !== m ? (P || "foil" !== m ? (P ? null : "card-glare card-glare--soft") : "card-glare card-glare--foil") : "card-glare card-glare--holo") : "card-glare card-glare--prismatic",
                    U = !M || k ? null : "prismatic" === m ? "card-idle-prismatic" : "holo" === m ? "card-idle-holo" : "foil" === m ? "card-idle-foil" : null,
                    q = (0, o.Mr)(b)[0],
                    O = !P && "foil" === m,
                    H = E && !P,
                    J = { transition: P ? "none" : H ? "transform 45ms linear" : "transform ".concat(p, "ms cubic-bezier(0.23, 1, 0.32, 1), z-index 0s linear ").concat(p, "ms"), willChange: P ? "auto" : "transform", zIndex: H ? 20 : "auto", pointerEvents: x || k ? "none" : void 0 };
                return (0, n.jsxs)("div", {
                    ref: w,
                    className: "card-3d-tilt group ".concat(t),
                    "data-hovering": H ? "true" : void 0,
                    "data-element-type": O ? q.toLowerCase() : void 0,
                    style: J,
                    onMouseMove: R,
                    onMouseEnter: z,
                    onMouseLeave: X,
                    onTouchStart: C ? Y : void 0,
                    onTouchMove: C ? G : void 0,
                    onTouchEnd: C ? S : void 0,
                    onTouchCancel: C ? I : void 0,
                    onClick: j,
                    children: [r, U ? (0, n.jsx)("div", { className: U, "aria-hidden": !0 }) : null, O ? (0, n.jsx)(s, { type: q }) : null, V ? (0, n.jsx)("div", { className: V, "aria-hidden": !0 }) : null, B ? (0, n.jsx)("div", { className: B, "aria-hidden": !0 }) : null],
                });
            }
        },
    },
]);
