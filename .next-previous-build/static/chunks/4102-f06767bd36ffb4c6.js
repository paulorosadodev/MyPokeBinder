"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [4102],
    {
        1847: (e, t, r) => {
            r.d(t, { A: () => a });
            var n = r(2115);
            let i = function () {
                for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                return t
                    .filter((e, t, r) => !!e && "" !== e.trim() && r.indexOf(e) === t)
                    .join(" ")
                    .trim();
            };
            var o = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
            let l = (0, n.forwardRef)((e, t) => {
                    let { color: r = "currentColor", size: l = 24, strokeWidth: a = 2, absoluteStrokeWidth: c, className: u = "", children: f, iconNode: s, ...d } = e;
                    return (0, n.createElement)("svg", { ref: t, ...o, width: l, height: l, stroke: r, strokeWidth: c ? (24 * Number(a)) / Number(l) : a, className: i("lucide", u), ...d }, [
                        ...s.map((e) => {
                            let [t, r] = e;
                            return (0, n.createElement)(t, r);
                        }),
                        ...(Array.isArray(f) ? f : [f]),
                    ]);
                }),
                a = (e, t) => {
                    let r = (0, n.forwardRef)((r, o) => {
                        let { className: a, ...c } = r;
                        return (0, n.createElement)(l, { ref: o, iconNode: t, className: i("lucide-".concat(e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()), a), ...c });
                    });
                    return ((r.displayName = "".concat(e)), r);
                };
        },
        2138: (e, t, r) => {
            r.d(t, { E: () => c, F: () => o, I: () => L, M: () => a, O: () => h, R: () => l, S: () => K, U: () => d, a: () => f, b: () => w, c: () => k, d: () => H, e: () => g, f: () => V, g: () => P, h: () => u, i: () => p, j: () => C, m: () => y, n: () => s, o: () => X, p: () => O, q: () => G, r: () => T, s: () => F, t: () => Z, u: () => D });
            var n = r(2115),
                i = Object.prototype.hasOwnProperty;
            let o = 0,
                l = 1,
                a = 2,
                c = 3,
                u = 4,
                f = new WeakMap(),
                s = () => {},
                d = s(),
                h = Object,
                p = (e) => e === d,
                g = (e) => "function" == typeof e,
                y = (e, t) => ({ ...e, ...t }),
                w = (e) => g(e.then),
                m = {},
                v = {},
                b = "undefined",
                O = typeof window != b,
                _ = typeof document != b,
                E = O && "Deno" in window,
                k = (e, t) => {
                    let r = f.get(e);
                    return [
                        () => (!p(t) && e.get(t)) || m,
                        (n) => {
                            if (!p(t)) {
                                let i = e.get(t);
                                (t in v || (v[t] = i), r[5](t, y(i, n), i || m));
                            }
                        },
                        r[6],
                        () => (!p(t) && t in v ? v[t] : (!p(t) && e.get(t)) || m),
                    ];
                },
                S = !0,
                [A, R] = O && window.addEventListener ? [window.addEventListener.bind(window), window.removeEventListener.bind(window)] : [s, s],
                j = {
                    initFocus: (e) => (
                        _ && document.addEventListener("visibilitychange", e),
                        A("focus", e),
                        () => {
                            (_ && document.removeEventListener("visibilitychange", e), R("focus", e));
                        }
                    ),
                    initReconnect: (e) => {
                        let t = () => {
                                ((S = !0), e());
                            },
                            r = () => {
                                S = !1;
                            };
                        return (
                            A("online", t),
                            A("offline", r),
                            () => {
                                (R("online", t), R("offline", r));
                            }
                        );
                    },
                },
                C = !n.useId,
                L = !O || E,
                T = (e) => (O && typeof window.requestAnimationFrame != b ? window.requestAnimationFrame(e) : setTimeout(e, 1)),
                D = L ? n.useEffect : n.useLayoutEffect,
                x = "undefined" != typeof navigator && navigator.connection,
                q = !L && x && (["slow-2g", "2g"].includes(x.effectiveType) || x.saveData),
                M = new WeakMap(),
                N = (e, t) => e === "[object ".concat(t, "]"),
                W = 0,
                I = (e) => {
                    let t,
                        r,
                        n = typeof e,
                        i = h.prototype.toString.call(e),
                        o = N(i, "Date"),
                        l = N(i, "RegExp"),
                        a = N(i, "Object");
                    if (h(e) !== e || o || l) t = o ? e.toJSON() : "symbol" == n ? e.toString() : "string" == n ? JSON.stringify(e) : "" + e;
                    else {
                        if ((t = M.get(e))) return t;
                        if (((t = ++W + "~"), M.set(e, t), Array.isArray(e))) {
                            for (r = 0, t = "@"; r < e.length; r++) t += I(e[r]) + ",";
                            M.set(e, t);
                        }
                        if (a) {
                            t = "#";
                            let n = h.keys(e).sort();
                            for (; !p((r = n.pop()));) p(e[r]) || (t += r + ":" + I(e[r]) + ",");
                            M.set(e, t);
                        }
                    }
                    return t;
                },
                F = (e) => {
                    if (g(e))
                        try {
                            e = e();
                        } catch (t) {
                            e = "";
                        }
                    let t = e;
                    return [(e = "string" == typeof e ? e : (Array.isArray(e) ? e.length : e) ? I(e) : ""), t];
                },
                $ = 0,
                P = () => ++$;
            async function V() {
                for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
                let [n, i, o, l] = t,
                    c = y({ populateCache: !0, throwOnError: !0 }, "boolean" == typeof l ? { revalidate: l } : l || {}),
                    u = c.populateCache,
                    s = c.rollbackOnError,
                    h = c.optimisticData,
                    m = c.throwOnError;
                if (g(i)) {
                    let e = [];
                    for (let t of n.keys()) !/^\$(inf|sub)\$/.test(t) && i(n.get(t)._k) && e.push(t);
                    return Promise.all(e.map(v));
                }
                return v(i);
                async function v(e) {
                    let r,
                        [i] = F(e);
                    if (!i) return;
                    let [l, y] = k(n, i),
                        [v, b, O, _] = f.get(n),
                        E = () => {
                            let t = v[i];
                            return (g(c.revalidate) ? c.revalidate(l().data, e) : !1 !== c.revalidate) && (delete O[i], delete _[i], t && t[0]) ? t[0](a).then(() => l().data) : l().data;
                        };
                    if (t.length < 3) return E();
                    let S = o,
                        A = !1,
                        R = P();
                    b[i] = [R, 0];
                    let j = !p(h),
                        C = l(),
                        L = C.data,
                        T = C._c,
                        D = p(T) ? L : T;
                    if ((j && y({ data: (h = g(h) ? h(D, L) : h), _c: D }), g(S)))
                        try {
                            S = S(D);
                        } catch (e) {
                            ((r = e), (A = !0));
                        }
                    if (S && w(S)) {
                        let e;
                        if (
                            ((S = await S.catch((e) => {
                                ((r = e), (A = !0));
                            })),
                            R !== b[i][0])
                        ) {
                            if (A) throw r;
                            return S;
                        }
                        A && j && ((e = r), "function" == typeof s ? s(e) : !1 !== s) && ((u = !0), y({ data: D, _c: d }));
                    }
                    if (
                        (u && !A && (g(u) ? y({ data: u(S, D), error: d, _c: d }) : y({ data: S, error: d, _c: d })),
                        (b[i][1] = P()),
                        Promise.resolve(E()).then(() => {
                            y({ _c: d });
                        }),
                        A)
                    ) {
                        if (m) throw r;
                        return;
                    }
                    return S;
                }
            }
            let U = (e, t) => {
                    for (let r in e) e[r][0] && e[r][0](t);
                },
                J = (e, t) => {
                    if (!f.has(e)) {
                        let r = y(j, t),
                            n = Object.create(null),
                            i = V.bind(d, e),
                            a = s,
                            c = Object.create(null),
                            h = (e, t) => {
                                let r = c[e] || [];
                                return (
                                    (c[e] = r),
                                    r.push(t),
                                    () => {
                                        let e = r.indexOf(t);
                                        e >= 0 && ((r[e] = r[r.length - 1]), r.pop());
                                    }
                                );
                            },
                            p = (t, r, n) => {
                                e.set(t, r);
                                let i = c[t];
                                if (i) for (let e of i) e(r, n);
                            },
                            g = (t) => {
                                let r = f.get(e),
                                    [, i, o, l] = r,
                                    a = P();
                                for (let e in (r[8]++, o)) delete o[e];
                                for (let e in l) delete l[e];
                                for (let e in i) i[e] = [a, a];
                                let s = {};
                                for (let t of [...e.keys()]) {
                                    let r = e.get(t);
                                    e.delete(t);
                                    let n = c[t];
                                    if (n) for (let e of n) e(s, r);
                                }
                                let d = !t || !1 !== t.revalidate;
                                for (let e in n) {
                                    let t = n[e];
                                    for (let e = 0; e < t.length; e++) t[e](u, { revalidate: d && !e });
                                }
                            },
                            w = () => {
                                if (!f.has(e) && (f.set(e, [n, Object.create(null), Object.create(null), Object.create(null), i, p, h, g, 0]), !L)) {
                                    let t = r.initFocus(setTimeout.bind(d, U.bind(d, n, o))),
                                        i = r.initReconnect(setTimeout.bind(d, U.bind(d, n, l)));
                                    a = () => {
                                        (t && t(), i && i(), f.delete(e));
                                    };
                                }
                            };
                        return (w(), [e, i, w, a, g]);
                    }
                    let r = f.get(e);
                    return [e, r[4], d, d, r[7]];
                },
                [X, z, , , B] = J(new Map()),
                H = y(
                    {
                        onLoadingSlow: s,
                        onSuccess: s,
                        onError: s,
                        onErrorRetry: (e, t, r, n, i) => {
                            let o = r.errorRetryCount,
                                l = i.retryCount,
                                a = ~~((Math.random() + 0.5) * (1 << (l < 8 ? l : 8))) * r.errorRetryInterval;
                            (p(o) || !(l > o)) && setTimeout(n, a, i);
                        },
                        onDiscarded: s,
                        revalidateOnFocus: !0,
                        revalidateOnReconnect: !0,
                        revalidateIfStale: !0,
                        shouldRetryOnError: !0,
                        errorRetryInterval: q ? 1e4 : 5e3,
                        focusThrottleInterval: 5e3,
                        dedupingInterval: 2e3,
                        loadingTimeout: q ? 5e3 : 3e3,
                        compare: function e(t, r) {
                            var n, o;
                            if (t === r) return !0;
                            if (t && r && (n = t.constructor) === r.constructor) {
                                if (n === Date) return t.getTime() === r.getTime();
                                if (n === RegExp) return t.toString() === r.toString();
                                if (n === Array) {
                                    if ((o = t.length) === r.length) for (; o-- && e(t[o], r[o]););
                                    return -1 === o;
                                }
                                if (!n || "object" == typeof t) {
                                    for (n in ((o = 0), t)) if ((i.call(t, n) && ++o && !i.call(r, n)) || !(n in r) || !e(t[n], r[n])) return !1;
                                    return Object.keys(r).length === o;
                                }
                            }
                            return t != t && r != r;
                        },
                        isPaused: () => !1,
                        cache: X,
                        mutate: z,
                        unload: B,
                        fallback: {},
                    },
                    {
                        isOnline: () => S,
                        isVisible: () => {
                            let e = _ && document.visibilityState;
                            return p(e) || "hidden" !== e;
                        },
                    },
                ),
                Z = (e, t) => {
                    let r = y(e, t);
                    if (t) {
                        let { use: n, fallback: i, cacheData: o } = e,
                            { use: l, fallback: a, cacheData: c } = t;
                        (n && l && (r.use = n.concat(l)), i && a && (r.fallback = y(i, a)), o && c && (r.cacheData = y(o, c)));
                    }
                    return r;
                },
                G = (0, n.createContext)({}),
                K = (e) => {
                    let { value: t } = e,
                        r = (0, n.useContext)(G),
                        i = g(t),
                        o = (0, n.useMemo)(() => (i ? t(r) : t), [i, r, t]),
                        l = (0, n.useMemo)(() => (i ? o : Z(r, o)), [i, r, o]),
                        a = o && o.provider,
                        c = (0, n.useRef)(d);
                    a && !c.current && (c.current = J(a(l.cache || X), o));
                    let u = c.current;
                    return (
                        u && ((l.cache = u[0]), (l.mutate = u[1]), (l.unload = u[4])),
                        D(() => {
                            if (u) return (u[2] && u[2](), u[3]);
                        }, []),
                        (0, n.createElement)(G.Provider, y(e, { value: l }))
                    );
                };
        },
        4860: (e, t, r) => {
            r.d(t, { q: () => n });
            let n = "$inf$";
        },
        5229: (e, t, r) => {
            r.d(t, { A: () => n });
            let n = (0, r(1847).A)("X", [
                ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
                ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
            ]);
        },
        6651: (e, t, r) => {
            r.d(t, { A: () => n });
            let n = (0, r(1847).A)("Search", [
                ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
                ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
            ]);
        },
        8696: (e, t, r) => {
            r.d(t, { Ht: () => h, aw: () => d, iX: () => u, qm: () => s });
            var n = r(2138),
                i = r(4860),
                o = r(2115);
            let l = n.p && window.__SWR_DEVTOOLS_USE__,
                a = l ? window.__SWR_DEVTOOLS_USE__ : [],
                c = (e) => ((0, n.e)(e[1]) ? [e[0], e[1], e[2] || {}] : [e[0], null, (null === e[1] ? e[2] : e[1]) || {}]),
                u = () => {
                    let e = (0, o.useContext)(n.q);
                    return (0, o.useMemo)(() => (0, n.m)(n.d, e), [e]);
                },
                f = a.concat((e) => (t, r, o) => {
                    let l =
                        r &&
                        ((...e) => {
                            let [o] = (0, n.s)(t),
                                [, , , l] = n.a.get(n.o);
                            if (o.startsWith(i.q)) return r(...e);
                            let a = l[o];
                            return (0, n.i)(a) ? r(...e) : (delete l[o], a);
                        });
                    return e(t, l, o);
                }),
                s = (e) =>
                    function (...t) {
                        let r = u(),
                            [i, o, l] = c(t),
                            a = (0, n.t)(r, l),
                            s = e,
                            { use: d } = a,
                            h = (d || []).concat(f);
                        for (let e = h.length; e--;) s = h[e](s);
                        return s(i, o || a.fetcher || null, a);
                    },
                d = (e, t, r) => {
                    let n = t[e] || (t[e] = []);
                    return (
                        n.push(r),
                        () => {
                            let e = n.indexOf(r);
                            e >= 0 && ((n[e] = n[n.length - 1]), n.pop());
                        }
                    );
                },
                h =
                    (e, t) =>
                    (...r) => {
                        let [n, i, o] = c(r),
                            l = (o.use || []).concat(t);
                        return e(n, i, { ...o, use: l });
                    };
            l && (window.__SWR_DEVTOOLS_REACT__ = o);
        },
    },
]);
