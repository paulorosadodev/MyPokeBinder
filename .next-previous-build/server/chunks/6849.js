"use strict";
((exports.id = 6849),
    (exports.ids = [6849]),
    (exports.modules = {
        56849: (a, b, c) => {
            c.d(b, { LW: () => k });
            var d = c(21124),
                e = c(38301),
                f = c(86965);
            function g({ type: a }) {
                return "Colorless" === a
                    ? (0, d.jsx)("path", { d: "M12 3.5 14.1 9l5.4 3-5.4 3-2.1 5.5L9.9 15l-5.4-3 5.4-3L12 3.5Z" })
                    : "Darkness" === a
                      ? (0, d.jsx)("path", { d: "M17.8 16.7A8 8 0 0 1 8.1 5.3a8.2 8.2 0 1 0 9.7 11.4Z" })
                      : "Dragon" === a
                        ? (0, d.jsxs)("g", { fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: [(0, d.jsx)("path", { d: "m5.5 18 5.8-13 2.2 7 5-3-3.2 9-4.2-3.3L5.5 18Z" }), (0, d.jsx)("circle", { cx: "13.8", cy: "9.1", r: "1", fill: "currentColor", stroke: "none" })] })
                        : "Fairy" === a
                          ? (0, d.jsxs)("g", { children: [(0, d.jsx)("path", { d: "M12 2.8c.8 5.8 2.3 7.3 8.2 8.2-5.9.9-7.4 2.4-8.2 8.2-.8-5.8-2.3-7.3-8.2-8.2 5.9-.9 7.4-2.4 8.2-8.2Z" }), (0, d.jsx)("circle", { cx: "18.5", cy: "5.5", r: "1.4" })] })
                          : "Fighting" === a
                            ? (0, d.jsx)("path", { d: "M6.1 10.8V7.1a1.7 1.7 0 0 1 3.4 0V5.8a1.7 1.7 0 0 1 3.4 0v.7a1.7 1.7 0 0 1 3.4.2 1.7 1.7 0 0 1 2.9 1.2v5.8c0 4.3-2.8 7.1-7.2 7.1-3.8 0-6.9-2.5-7.3-6.3l-.3-2.9a1.7 1.7 0 0 1 1.7-.8Z" })
                            : "Fire" === a
                              ? (0, d.jsx)("path", { d: "M13.2 2.8c.8 4.1-2.8 5.1-1.5 8.4.7-1.4 1.8-2.3 3.4-3.2 2.1 2 3.5 4.2 3.5 6.8 0 3.9-2.9 6.7-6.7 6.7s-6.7-2.7-6.7-6.5c0-4.1 3.1-6 4.9-8.8.3 1.8.1 3.1-.4 4.2 2.7-1.7 1.7-5.3 3.5-7.6Z" })
                              : "Grass" === a
                                ? (0, d.jsxs)("g", { fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: [(0, d.jsx)("path", { d: "M19.7 4.2C12 4.5 6.1 7.4 5.5 13.1c-.4 4.1 2.8 6.6 6.4 5.4 4.5-1.6 6.7-7.3 7.8-14.3Z" }), (0, d.jsx)("path", { d: "M5.1 20c2.5-4.5 5.9-7.6 10.6-10.1" })] })
                                : "Lightning" === a
                                  ? (0, d.jsx)("path", { d: "m13.8 2.7-8 11h5.4l-1 7.6 8-11h-5.4l1-7.6Z" })
                                  : "Metal" === a
                                    ? (0, d.jsxs)("g", { fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: [(0, d.jsx)("path", { d: "m12 3.5 7.4 4.2v8.6L12 20.5l-7.4-4.2V7.7L12 3.5Z" }), (0, d.jsx)("circle", { cx: "12", cy: "12", r: "3.1" })] })
                                    : "Psychic" === a
                                      ? (0, d.jsxs)("g", { fill: "none", stroke: "currentColor", strokeWidth: "2.2", children: [(0, d.jsx)("path", { d: "M3.4 12s3.2-5.1 8.6-5.1 8.6 5.1 8.6 5.1-3.2 5.1-8.6 5.1S3.4 12 3.4 12Z" }), (0, d.jsx)("circle", { cx: "12", cy: "12", r: "2.8", fill: "currentColor" })] })
                                      : "Water" === a
                                        ? (0, d.jsx)("path", { d: "M12 2.8c2.7 4.2 6.1 8.3 6.1 12.1a6.1 6.1 0 0 1-12.2 0C5.9 11.1 9.3 7 12 2.8Z" })
                                        : null;
            }
            let h = (0, e.memo)(function ({ type: a }) {
                let b = `card-element-${(0, e.useId)().replaceAll(":", "")}`;
                return (0, d.jsxs)("svg", {
                    className: "card-element-pattern",
                    viewBox: "0 0 240 330",
                    preserveAspectRatio: "none",
                    "aria-hidden": !0,
                    children: [
                        (0, d.jsx)("defs", {
                            children: (0, d.jsxs)("pattern", { id: b, width: "44", height: "44", patternUnits: "userSpaceOnUse", patternTransform: "rotate(-8)", children: [(0, d.jsx)("g", { className: "card-element-pattern__symbol", transform: "translate(10 10) scale(.92)", children: (0, d.jsx)(g, { type: a }) }), (0, d.jsx)("g", { className: "card-element-pattern__symbol card-element-pattern__symbol--soft", transform: "translate(32 32) scale(.58)", children: (0, d.jsx)(g, { type: a }) })] }),
                        }),
                        (0, d.jsx)("rect", { width: "100%", height: "100%", fill: `url(#${b})` }),
                    ],
                });
            });
            var i = c(69587);
            let j = "none";
            function k({ children: a, className: b = "", glareOpacity: c = 0.25, maxTilt: g = 15, scale: k = 1.05, perspective: l = 800, transitionDuration: m = 500, maxMove: n = 0, shineMode: o = "none", elementTypes: p, paused: q = !1, onClick: r, enableTouch: s = !1, isLoading: t = !1 }) {
                let u = (0, e.useContext)(f.cm),
                    v = !u || u.animationsEnabled,
                    w = q || t || !v,
                    x = t ? "none" : o,
                    y = (0, e.useRef)(null),
                    z = (0, e.useRef)(!1),
                    A = (0, e.useRef)(0),
                    B = (0, e.useRef)(null),
                    C = (0, e.useRef)(null),
                    [D, E] = (0, e.useState)(!1),
                    F = "prismatic" === x ? Math.max(c, 0.52) : "holo" === x ? Math.max(c, 0.46) : "foil" === x ? Math.max(c, 0.42) : c,
                    G = (0, e.useCallback)(() => {
                        (B.current && cancelAnimationFrame(B.current), (B.current = null), C.current && clearTimeout(C.current), (C.current = null), E(!1));
                        let a = y.current;
                        if (a) {
                            if (w) {
                                ((a.style.transition = "none"), (a.style.transform = j), a.style.removeProperty("--card-return-duration"), a.style.setProperty("--card-pointer-x", "50"), a.style.setProperty("--card-pointer-y", "50"), a.style.setProperty("--card-tilt", "0"), a.style.setProperty("--card-shine-opacity", "0"), a.style.setProperty("--card-glare-x", "50%"), a.style.setProperty("--card-glare-y", "50%"), a.style.setProperty("--card-glare-angle", "135deg"));
                                return;
                            }
                            ((a.style.transition = `transform ${m}ms cubic-bezier(0.23, 1, 0.32, 1), z-index 0s linear ${m}ms`),
                                a.style.setProperty("--card-return-duration", `${m}ms`),
                                (a.style.transform = (function (a = 800) {
                                    return `perspective(${a}px) rotateX(0deg) rotateY(0deg) translate3d(0px,0px,0) scale3d(1,1,1)`;
                                })(l)),
                                a.style.setProperty("--card-pointer-x", "50"),
                                a.style.setProperty("--card-pointer-y", "50"),
                                a.style.setProperty("--card-tilt", "0"),
                                a.style.setProperty("--card-shine-opacity", "0"),
                                a.style.setProperty("--card-glare-x", "50%"),
                                a.style.setProperty("--card-glare-y", "50%"),
                                a.style.setProperty("--card-glare-angle", "135deg"),
                                (C.current = setTimeout(() => {
                                    (y.current && (y.current.style.transform = j), (C.current = null));
                                }, m)));
                        }
                    }, [w, l, m]),
                    H = (0, e.useCallback)(
                        (a, b) => {
                            if (w) return;
                            let c = y.current;
                            c &&
                                (C.current && (clearTimeout(C.current), (C.current = null)),
                                B.current && cancelAnimationFrame(B.current),
                                (B.current = requestAnimationFrame(() => {
                                    let d = (c.parentElement ?? c).getBoundingClientRect(),
                                        e = a - d.left,
                                        f = b - d.top,
                                        h = d.width / 2,
                                        i = d.height / 2,
                                        j = Math.max(-1, Math.min(1, (e - h) / h)),
                                        m = Math.max(-1, Math.min(1, (f - i) / i)),
                                        o = j * g,
                                        p = -m * g,
                                        q = n ? j * n : 0,
                                        r = n ? m * n : 0,
                                        s = ((j + 1) / 2) * 100,
                                        t = ((m + 1) / 2) * 100,
                                        u = Math.min(1, Math.hypot(j, m)),
                                        v = (180 / Math.PI) * Math.atan2(m, j) + 90,
                                        w = (0.28 + 0.72 * u) * F;
                                    ((c.style.transition = "transform 45ms linear"),
                                        (c.style.transform = `perspective(${l}px) rotateX(${p.toFixed(2)}deg) rotateY(${o.toFixed(2)}deg) translate3d(${q.toFixed(2)}px,${r.toFixed(2)}px,0) scale3d(${k},${k},${k})`),
                                        c.style.setProperty("--card-pointer-x", s.toFixed(2)),
                                        c.style.setProperty("--card-pointer-y", t.toFixed(2)),
                                        c.style.setProperty("--card-tilt", u.toFixed(3)),
                                        c.style.setProperty("--card-shine-opacity", w.toFixed(3)),
                                        c.style.setProperty("--card-glare-x", `${s.toFixed(2)}%`),
                                        c.style.setProperty("--card-glare-y", `${t.toFixed(2)}%`),
                                        c.style.setProperty("--card-glare-angle", `${v.toFixed(1)}deg`));
                                })));
                        },
                        [g, k, l, F, n, w],
                    ),
                    I = (0, e.useCallback)(
                        (a) => {
                            z.current || Date.now() - A.current < 500 || H(a.clientX, a.clientY);
                        },
                        [H],
                    ),
                    J = (0, e.useCallback)(() => {
                        w || z.current || Date.now() - A.current < 500 || (C.current && (clearTimeout(C.current), (C.current = null)), E(!0));
                    }, [w]),
                    K = (0, e.useCallback)(() => {
                        z.current || Date.now() - A.current < 500 || G();
                    }, [G]),
                    L = (0, e.useCallback)(
                        (a) => {
                            if (w || !s) return;
                            ((z.current = !0), C.current && (clearTimeout(C.current), (C.current = null)));
                            let b = a.touches[0];
                            b && (E(!0), H(b.clientX, b.clientY));
                        },
                        [w, s, H],
                    ),
                    M = (0, e.useCallback)(
                        (a) => {
                            if (w || !s) return;
                            (a.cancelable && a.preventDefault(), (z.current = !0), C.current && (clearTimeout(C.current), (C.current = null)));
                            let b = a.touches[0];
                            b && (E((a) => !a || a), H(b.clientX, b.clientY));
                        },
                        [w, s, H],
                    ),
                    N = (0, e.useCallback)(() => {
                        s && ((z.current = !1), (A.current = Date.now()), G());
                    }, [s, G]),
                    O = (0, e.useCallback)(() => {
                        s && ((z.current = !1), (A.current = Date.now()), G());
                    }, [s, G]),
                    P = w || "prismatic" !== o ? (w || "holo" !== o ? (w || "foil" !== o ? null : "foil-sheen") : "holo-sheen") : "prismatic-sheen",
                    Q = w || "prismatic" !== o ? (w || "holo" !== o ? (w || "foil" !== o ? (w ? null : "card-glare card-glare--soft") : "card-glare card-glare--foil") : "card-glare card-glare--holo") : "card-glare card-glare--prismatic",
                    R = !v || t ? null : "prismatic" === o ? "card-idle-prismatic" : "holo" === o ? "card-idle-holo" : "foil" === o ? "card-idle-foil" : null,
                    S = (0, i.Mr)(t ? null : p)[0],
                    T = !w && "foil" === o,
                    U = D && !w,
                    V = { transition: w ? "none" : U ? "transform 45ms linear" : `transform ${m}ms cubic-bezier(0.23, 1, 0.32, 1), z-index 0s linear ${m}ms`, willChange: w ? "auto" : "transform", zIndex: U ? 20 : "auto", pointerEvents: q || t ? "none" : void 0 };
                return (0, d.jsxs)("div", {
                    ref: y,
                    className: `card-3d-tilt group ${b}`,
                    "data-hovering": U ? "true" : void 0,
                    "data-element-type": T ? S.toLowerCase() : void 0,
                    style: V,
                    onMouseMove: I,
                    onMouseEnter: J,
                    onMouseLeave: K,
                    onTouchStart: s ? L : void 0,
                    onTouchMove: s ? M : void 0,
                    onTouchEnd: s ? N : void 0,
                    onTouchCancel: s ? O : void 0,
                    onClick: r,
                    children: [a, R ? (0, d.jsx)("div", { className: R, "aria-hidden": !0 }) : null, T ? (0, d.jsx)(h, { type: S }) : null, P ? (0, d.jsx)("div", { className: P, "aria-hidden": !0 }) : null, Q ? (0, d.jsx)("div", { className: Q, "aria-hidden": !0 }) : null],
                });
            }
        },
        69587: (a, b, c) => {
            c.d(b, { Mr: () => g });
            var d = c(37108);
            let e = { colorless: "Colorless", normal: "Colorless", dark: "Darkness", darkness: "Darkness", dragon: "Dragon", fairy: "Fairy", fighting: "Fighting", fire: "Fire", grass: "Grass", electric: "Lightning", lightning: "Lightning", metal: "Metal", steel: "Metal", psychic: "Psychic", water: "Water" },
                f = { grass: "Grass", fire: "Fire", water: "Water", electric: "Lightning", bug: "Grass", normal: "Colorless", poison: "Psychic", ground: "Fighting", rock: "Fighting", fighting: "Fighting", psychic: "Psychic", ghost: "Psychic", ice: "Water", dragon: "Dragon", fairy: "Fairy", steel: "Metal", dark: "Darkness", flying: "Colorless" };
            function g(a, b) {
                let c = (function (a) {
                    if (!Array.isArray(a)) return [];
                    let b = [];
                    for (let c of a) {
                        if ("string" != typeof c) continue;
                        let a = e[c.trim().toLowerCase()];
                        if ((a && !b.includes(a) && b.push(a), 2 === b.length)) break;
                    }
                    return b;
                })(a);
                if (c.length > 0) return c;
                if (!b) return ["Colorless"];
                let g = (0, d.Z3)(b);
                return g ? [f[g.type]] : ["Colorless"];
            }
        },
    }));
