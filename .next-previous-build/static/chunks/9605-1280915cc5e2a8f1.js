"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [9605],
    {
        125: (e, t, r) => {
            var a = r(2115),
                n =
                    "function" == typeof Object.is
                        ? Object.is
                        : function (e, t) {
                              return (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t);
                          },
                i = a.useState,
                u = a.useEffect,
                l = a.useLayoutEffect,
                s = a.useDebugValue;
            function c(e) {
                var t = e.getSnapshot;
                e = e.value;
                try {
                    var r = t();
                    return !n(e, r);
                } catch (e) {
                    return !0;
                }
            }
            var d =
                "undefined" == typeof window || void 0 === window.document || void 0 === window.document.createElement
                    ? function (e, t) {
                          return t();
                      }
                    : function (e, t) {
                          var r = t(),
                              a = i({ inst: { value: r, getSnapshot: t } }),
                              n = a[0].inst,
                              d = a[1];
                          return (
                              l(
                                  function () {
                                      ((n.value = r), (n.getSnapshot = t), c(n) && d({ inst: n }));
                                  },
                                  [e, r, t],
                              ),
                              u(
                                  function () {
                                      return (
                                          c(n) && d({ inst: n }),
                                          e(function () {
                                              c(n) && d({ inst: n });
                                          })
                                      );
                                  },
                                  [e],
                              ),
                              s(r),
                              r
                          );
                      };
            t.useSyncExternalStore = void 0 !== a.useSyncExternalStore ? a.useSyncExternalStore : d;
        },
        4001: (e, t, r) => {
            r.d(t, { u: () => h });
            var a = r(2115),
                n = r(4806),
                i = r(8696),
                u = r(2138);
            let l =
                    a.use ||
                    ((e) => {
                        switch (e.status) {
                            case "pending":
                                throw e;
                            case "fulfilled":
                                return e.value;
                            case "rejected":
                                throw e.reason;
                            default:
                                throw (
                                    (e.status = "pending"),
                                    e.then(
                                        (t) => {
                                            ((e.status = "fulfilled"), (e.value = t));
                                        },
                                        (t) => {
                                            ((e.status = "rejected"), (e.reason = t));
                                        },
                                    ),
                                    e
                                );
                        }
                    }),
                s = { dedupe: !0 },
                c = (e, t, r) => {
                    var a;
                    return !!t && (null == (a = e.get(t)) ? void 0 : a.has(r)) === !0;
                },
                d = (e, t, r) => {
                    if (!t) return;
                    let a = e.get(t);
                    (a || ((a = new Set()), e.set(t, a)), a.add(r));
                },
                o = Promise.resolve(u.U);
            ((o.status = "fulfilled"), (o.value = u.U));
            let f = () => u.n;
            u.O.defineProperty(u.S, "defaultValue", { value: u.d });
            let h = (0, i.qm)((e, t, r) => {
                let { cache: h, compare: g, suspense: v, fallbackData: y, revalidateOnMount: k, revalidateIfStale: p, refreshInterval: b, refreshWhenHidden: w, refreshWhenOffline: m, keepPreviousData: S, strictServerPrefetchWarning: _ } = r,
                    [C, M, A, L] = u.a.get(h),
                    [R, V] = (0, u.s)(e),
                    E = (0, a.useRef)(!1),
                    U = (0, a.useRef)(!1),
                    D = (0, a.useRef)(R),
                    O = (0, a.useRef)(t),
                    x = (0, a.useRef)(r),
                    z = () => x.current.isVisible() && x.current.isOnline(),
                    [P, j, T, q] = (0, u.c)(h, R),
                    I = (0, a.useRef)({}).current,
                    F = (0, u.i)(y) ? ((0, u.i)(r.fallback) ? u.U : r.fallback[R]) : y,
                    H = r.cacheData,
                    W = R ? (null == H ? void 0 : H[R]) : u.U,
                    N = R ? L[R] : u.U,
                    B = (0, u.i)(N) && !(0, u.i)(W),
                    Y = B ? W : N,
                    $ = (e, t) => {
                        for (let r in I)
                            if ("data" === r) {
                                if (!g(e[r], t[r]) && (!(0, u.i)(e[r]) || !g(ei, t[r]))) return !1;
                            } else if (t[r] !== e[r]) return !1;
                        return !0;
                    },
                    G = !E.current,
                    J = (0, a.useMemo)(() => {
                        let e = P(),
                            r = q(),
                            a = (e) => {
                                let r = (0, u.m)(e);
                                return (delete r._k,
                                (() => {
                                    if (!R || !t || x.current.isPaused()) return !1;
                                    if (G && !(0, u.i)(k)) return k;
                                    let e = (0, u.i)(F) ? r.data : F;
                                    return !(v && B && (0, u.i)(e)) && ((0, u.i)(e) || p);
                                })())
                                    ? { isValidating: !0, isLoading: !0, ...r }
                                    : r;
                            },
                            n = a(e),
                            i = e === r ? n : a(r),
                            l = n;
                        return [
                            () => {
                                let e = a(P());
                                return $(e, l) ? ((l.data = e.data), (l.isLoading = e.isLoading), (l.isValidating = e.isValidating), (l.error = e.error), l) : ((l = e), e);
                            },
                            () => i,
                        ];
                    }, [h, R]),
                    K = (0, n.useSyncExternalStore)(
                        (0, a.useCallback)(
                            (e) =>
                                T(R, (t, r) => {
                                    $(r, t) || e();
                                }),
                            [h, R],
                        ),
                        J[0],
                        J[1],
                    ),
                    Q = C[R] && C[R].length > 0,
                    X = K.data,
                    Z = (0, u.i)(X) ? (F && (0, u.b)(F) ? l(F) : F) : X,
                    ee = K.error,
                    et = (0, a.useRef)(Z),
                    er = (0, a.useRef)(u.U),
                    ea = er.current;
                ea || (er.current = ea = new WeakMap());
                let en = (0, a.useRef)(null),
                    ei = S ? ((0, u.i)(X) ? ((0, u.i)(et.current) ? Z : et.current) : X) : Z,
                    eu = R && (0, u.i)(Z),
                    el = (0, a.useRef)(null);
                u.I ||
                    (0, n.useSyncExternalStore)(
                        f,
                        () => ((el.current = !1), el),
                        () => ((el.current = !0), el),
                    );
                let es = el.current;
                _ && es && !v && eu && console.warn(`Missing pre-initiated data for serialized key "${R}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
                let ec = !(!R || !t || x.current.isPaused()) && (!Q || !!(0, u.i)(ee)) && (G && !(0, u.i)(k) ? k : (!v || !B || !eu) && (v ? !(0, u.i)(Z) && p : (0, u.i)(Z) || p)),
                    ed = G && ec,
                    eo = (0, u.i)(K.isValidating) ? ed : K.isValidating,
                    ef = (0, u.i)(K.isLoading) ? ed : K.isLoading,
                    eh = (0, a.useCallback)(
                        async (e) => {
                            let t,
                                a,
                                n = O.current;
                            if (!R || !n || U.current || x.current.isPaused()) return !1;
                            let i = !0,
                                l = e || {},
                                s = !A[R] || !l.dedupe,
                                o = B && !c(ea, H, R) && !(0, u.i)(Y) && (0, u.i)(P().data),
                                f = () => (u.j ? !U.current && R === D.current && E.current : R === D.current),
                                h = { isValidating: !1, isLoading: !1 },
                                v = () => {
                                    j(h);
                                },
                                y = () => {
                                    let e = A[R];
                                    e && e[1] === a && delete A[R];
                                },
                                k = { isValidating: !0 };
                            (0, u.i)(P().data) && (k.isLoading = !0);
                            try {
                                if (
                                    (s &&
                                        (j(k),
                                        r.loadingTimeout &&
                                            (0, u.i)(P().data) &&
                                            setTimeout(() => {
                                                i && f() && x.current.onLoadingSlow(R, r);
                                            }, r.loadingTimeout),
                                        o && d(ea, H, R),
                                        (A[R] = [o ? Y : n(V), (0, u.g)()]),
                                        o && L[R] && delete L[R]),
                                    ([t, a] = A[R]),
                                    (t = await t),
                                    s && setTimeout(y, r.dedupingInterval),
                                    !A[R] || A[R][1] !== a)
                                )
                                    return (s && f() && x.current.onDiscarded(R), !1);
                                h.error = u.U;
                                let e = M[R];
                                if (!(0, u.i)(e) && (a <= e[0] || a <= e[1] || 0 === e[1])) return (v(), s && f() && x.current.onDiscarded(R), !1);
                                let l = P().data;
                                ((h.data = g(l, t) ? l : t), s && f() && x.current.onSuccess(t, R, r));
                            } catch (r) {
                                y();
                                let e = x.current,
                                    { shouldRetryOnError: t } = e;
                                !e.isPaused() &&
                                    ((h.error = r),
                                    s &&
                                        f() &&
                                        (e.onError(r, R, e),
                                        (!0 === t || ((0, u.e)(t) && t(r))) &&
                                            (!x.current.revalidateOnFocus || !x.current.revalidateOnReconnect || z()) &&
                                            e.onErrorRetry(
                                                r,
                                                R,
                                                e,
                                                (e) => {
                                                    let t = C[R];
                                                    t && t[0] && t[0](u.E, e);
                                                },
                                                { retryCount: (l.retryCount || 0) + 1, dedupe: !0 },
                                            )));
                            }
                            return ((i = !1), v(), !0);
                        },
                        [R, h],
                    ),
                    eg = (0, a.useCallback)((...e) => (0, u.f)(h, D.current, ...e), []);
                if (
                    ((0, u.u)(() => {
                        let e = en.current;
                        e && ((en.current = null), d(ea, e.cacheData, e.key), (0, u.i)(P().data) && j({ data: e.data, error: u.U, _k: e._k }), L[e.key] && delete L[e.key]);
                    }),
                    (0, u.u)(() => {
                        ((O.current = t), (x.current = r), (0, u.i)(X) || (et.current = X));
                    }),
                    (0, u.u)(() => {
                        if (t || !B || (0, u.i)(Y) || c(ea, H, R) || !(0, u.i)(P().data)) return;
                        d(ea, H, R);
                        let e = M[R];
                        (({ value: e, getCacheData: t, canCommit: r, setCache: a }) => {
                            let n = (e) => {
                                r() && (0, u.i)(t()) && a(e);
                            };
                            Promise.resolve(e).then(
                                (e) => {
                                    n({ data: e, error: u.U });
                                },
                                (e) => {
                                    n({ error: e });
                                },
                            );
                        })({ value: Y, getCacheData: () => P().data, canCommit: () => !U.current && R === D.current && M[R] === e, setCache: (e) => j({ ...e, _k: V }) });
                    }),
                    (0, u.u)(() => {
                        if (!R) return;
                        let e = eh.bind(u.U, s),
                            t = 0;
                        x.current.revalidateOnFocus && (t = Date.now() + x.current.focusThrottleInterval);
                        let r = (0, i.aw)(R, C, (r, a = {}) => {
                            if (r == u.F) {
                                let r = Date.now();
                                x.current.revalidateOnFocus && r > t && z() && ((t = r + x.current.focusThrottleInterval), e());
                            } else if (r == u.R) x.current.revalidateOnReconnect && z() && e();
                            else if (r == u.M) return eh();
                            else if (r == u.E) return eh(a);
                            else if (r == u.h && ((et.current = u.U), a.revalidate)) return eh();
                        });
                        return (
                            (U.current = !1),
                            (D.current = R),
                            (E.current = !0),
                            j({ _k: V }),
                            ec && !A[R] && ((0, u.i)(Z) || u.I ? e() : (0, u.r)(e)),
                            () => {
                                ((U.current = !0), r());
                            }
                        );
                    }, [R]),
                    (0, u.u)(() => {
                        let e;
                        function t() {
                            let t = (0, u.e)(b) ? b(P().data) : b;
                            t && -1 !== e && (e = setTimeout(r, t));
                        }
                        function r() {
                            !P().error && (w || x.current.isVisible()) && (m || x.current.isOnline()) ? eh(s).then(t) : t();
                        }
                        return (
                            t(),
                            () => {
                                e && (clearTimeout(e), (e = -1));
                            }
                        );
                    }, [b, w, m, R]),
                    (0, a.useDebugValue)(ei),
                    v)
                ) {
                    if (!u.j && u.I && eu && (0, u.i)(Y)) throw Error("Fallback data is required when using Suspense in SSR.");
                    eu && ((O.current = t), (x.current = r), (U.current = !1));
                    let e = !(0, u.i)(Y) && eu,
                        a = u.U;
                    if ((e && B ? ((Z = a = Y && (0, u.b)(Y) ? l(Y) : Y), (ei = a), u.I || (en.current = { data: a, _k: V, key: R, cacheData: H })) : l(e ? eg(Y) : o), !(0, u.i)(ee) && eu)) throw ee;
                    let n = eu && (0, u.i)(a) ? eh(s) : o;
                    (!(0, u.i)(ei) && eu && ((n.status = "fulfilled"), (n.value = !0)), l(n));
                }
                return {
                    mutate: eg,
                    get data() {
                        return ((I.data = !0), ei);
                    },
                    get error() {
                        return ((I.error = !0), ee);
                    },
                    get isValidating() {
                        return ((I.isValidating = !0), eo);
                    },
                    get isLoading() {
                        return ((I.isLoading = !0), ef);
                    },
                };
            });
        },
        4806: (e, t, r) => {
            e.exports = r(125);
        },
        5740: (e, t, r) => {
            r.d(t, { A: () => a });
            let a = (0, r(1847).A)("Sparkles", [
                ["path", { d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z", key: "4pj2yx" }],
                ["path", { d: "M20 3v4", key: "1olli1" }],
                ["path", { d: "M22 5h-4", key: "1gvqau" }],
                ["path", { d: "M4 17v2", key: "vumght" }],
                ["path", { d: "M5 18H3", key: "zchphs" }],
            ]);
        },
        6907: (e, t, r) => {
            r.d(t, { A: () => a });
            let a = (0, r(1847).A)("ShieldCheck", [
                ["path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z", key: "oel41y" }],
                ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
            ]);
        },
        7016: (e, t, r) => {
            r.d(t, { Ay: () => d });
            var a = r(2115),
                n = r(4001),
                i = r(2138),
                u = r(8696),
                l = r(4806),
                s = r(4860);
            let c = Promise.resolve(),
                d = (0, u.Ht)(n.u, (e) => (t, r, n) => {
                    let u,
                        d = (0, a.useRef)(!1),
                        { cache: o, initialSize: f = 1, revalidateAll: h = !1, persistSize: g = !1, revalidateFirstPage: v = !0, revalidateOnMount: y = !1, parallel: k = !1 } = n,
                        [, , , p] = i.a.get(i.o);
                    try {
                        (u = ((e) => (0, i.s)(e ? e(0, null) : null)[0])(t)) && (u = s.q + u);
                    } catch (e) {}
                    let [b, w, m] = (0, i.c)(o, u),
                        S = (0, a.useCallback)(() => ((0, i.i)(b()._l) ? f : b()._l), [o, u, f]);
                    (0, l.useSyncExternalStore)(
                        (0, a.useCallback)(
                            (e) =>
                                u
                                    ? m(u, () => {
                                          e();
                                      })
                                    : () => {},
                            [o, u],
                        ),
                        S,
                        S,
                    );
                    let _ = (0, a.useCallback)(() => {
                            let e = b()._l;
                            return (0, i.i)(e) ? f : e;
                        }, [u, f]),
                        C = (0, a.useRef)(_());
                    (0, i.u)(() => {
                        if (!d.current) {
                            d.current = !0;
                            return;
                        }
                        u && w({ _l: g ? C.current : _() });
                    }, [u, o]);
                    let M = y && !d.current,
                        A = e(
                            u,
                            async (e) => {
                                let a = b()._i,
                                    u = b()._r,
                                    l = i.a.get(o),
                                    s = l[8],
                                    c = () => l[8] !== s;
                                w({ _r: i.U });
                                let d = [],
                                    f = _(),
                                    [g] = (0, i.c)(o, e),
                                    y = g().data,
                                    m = [],
                                    S = null;
                                for (let e = 0; e < f; ++e) {
                                    let [l, s] = (0, i.s)(t(e, k ? null : S));
                                    if (!l) break;
                                    let [f, g] = (0, i.c)(o, l),
                                        b = f().data,
                                        w = h || a || (0, i.i)(b) || (v && !e && !(0, i.i)(y)) || M || (y && !(0, i.i)(y[e]) && !n.compare(y[e], b));
                                    if (r && ("function" == typeof u ? u(b, s) : w)) {
                                        let t = async () => {
                                            if (l in p) {
                                                let e = p[l];
                                                (delete p[l], (b = await e));
                                            } else b = await r(s);
                                            (c() || g({ data: b, _k: s }), (d[e] = b));
                                        };
                                        k ? m.push(t) : await t();
                                    } else d[e] = b;
                                    k || (S = b);
                                }
                                return (k && (await Promise.all(m.map((e) => e()))), c() || w({ _i: i.U }), d);
                            },
                            n,
                        ),
                        L = (0, a.useCallback)(
                            function (e, t) {
                                let r = "boolean" == typeof t ? { revalidate: t } : t || {},
                                    a = !1 !== r.revalidate;
                                return u ? (a && ((0, i.i)(e) ? w({ _i: !0, _r: r.revalidate }) : w({ _i: !1, _r: r.revalidate })), arguments.length ? A.mutate(e, { ...r, revalidate: a }) : A.mutate()) : c;
                            },
                            [u, o],
                        ),
                        R = (0, a.useCallback)(
                            (e) => {
                                let r;
                                if (!u) return c;
                                let [, a] = (0, i.c)(o, u);
                                if (((0, i.e)(e) ? (r = e(_())) : "number" == typeof e && (r = e), "number" != typeof r)) return c;
                                (a({ _l: r }), (C.current = r));
                                let n = [],
                                    [l] = (0, i.c)(o, u),
                                    s = null;
                                for (let e = 0; e < r; ++e) {
                                    let [r] = (0, i.s)(t(e, s)),
                                        [a] = (0, i.c)(o, r),
                                        u = r ? a().data : i.U;
                                    if ((0, i.i)(u)) return L(l().data);
                                    (n.push(u), (s = u));
                                }
                                return L(n);
                            },
                            [u, o, L, _],
                        );
                    return {
                        size: _(),
                        setSize: R,
                        mutate: L,
                        get data() {
                            return A.data;
                        },
                        get error() {
                            return A.error;
                        },
                        get isValidating() {
                            return A.isValidating;
                        },
                        get isLoading() {
                            return A.isLoading;
                        },
                    };
                });
        },
        7801: (e, t, r) => {
            r.d(t, { A: () => a });
            let a = (0, r(1847).A)("ShieldAlert", [
                ["path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z", key: "oel41y" }],
                ["path", { d: "M12 8v4", key: "1got3b" }],
                ["path", { d: "M12 16h.01", key: "1drbdi" }],
            ]);
        },
        7937: (e, t, r) => {
            r.d(t, { A: () => a });
            let a = (0, r(1847).A)("BookOpen", [
                ["path", { d: "M12 7v14", key: "1akyts" }],
                ["path", { d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z", key: "ruj8y" }],
            ]);
        },
        9051: (e, t, r) => {
            r.d(t, { A: () => a });
            let a = (0, r(1847).A)("Circle", [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]]);
        },
        9397: (e, t, r) => {
            r.d(t, { A: () => a });
            let a = (0, r(1847).A)("Layers", [
                ["path", { d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z", key: "zw3jo" }],
                ["path", { d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12", key: "1wduqc" }],
                ["path", { d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17", key: "kqbvx6" }],
            ]);
        },
        9559: (e, t, r) => {
            r.d(t, { A: () => a });
            let a = (0, r(1847).A)("RefreshCw", [
                ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
                ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
                ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
                ["path", { d: "M8 16H3v5", key: "1cv678" }],
            ]);
        },
    },
]);
