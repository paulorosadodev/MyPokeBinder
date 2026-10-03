"use strict";
((exports.id = 7633),
    (exports.ids = [7633]),
    (exports.modules = {
        18371: (a, b, c) => {
            c.d(b, { u: () => n });
            var d = c(38301),
                e = c(99088),
                f = c(21296),
                g = c(41555);
            let h =
                    d.use ||
                    ((a) => {
                        switch (a.status) {
                            case "pending":
                                throw a;
                            case "fulfilled":
                                return a.value;
                            case "rejected":
                                throw a.reason;
                            default:
                                throw (
                                    (a.status = "pending"),
                                    a.then(
                                        (b) => {
                                            ((a.status = "fulfilled"), (a.value = b));
                                        },
                                        (b) => {
                                            ((a.status = "rejected"), (a.reason = b));
                                        },
                                    ),
                                    a
                                );
                        }
                    }),
                i = { dedupe: !0 },
                j = (a, b, c) => {
                    var d;
                    return !!b && (null == (d = a.get(b)) ? void 0 : d.has(c)) === !0;
                },
                k = (a, b, c) => {
                    if (!b) return;
                    let d = a.get(b);
                    (d || ((d = new Set()), a.set(b, d)), d.add(c));
                },
                l = Promise.resolve(g.U);
            ((l.status = "fulfilled"), (l.value = g.U));
            let m = () => g.n;
            g.O.defineProperty(g.S, "defaultValue", { value: g.d });
            let n = (0, f.qm)((a, b, c) => {
                let { cache: n, compare: o, suspense: p, fallbackData: q, revalidateOnMount: r, revalidateIfStale: s, refreshInterval: t, refreshWhenHidden: u, refreshWhenOffline: v, keepPreviousData: w, strictServerPrefetchWarning: x } = c,
                    [y, z, A, B] = g.a.get(n),
                    [C, D] = (0, g.s)(a),
                    E = (0, d.useRef)(!1),
                    F = (0, d.useRef)(!1),
                    G = (0, d.useRef)(C),
                    H = (0, d.useRef)(b),
                    I = (0, d.useRef)(c),
                    J = () => I.current.isVisible() && I.current.isOnline(),
                    [K, L, M, N] = (0, g.c)(n, C),
                    O = (0, d.useRef)({}).current,
                    P = (0, g.i)(q) ? ((0, g.i)(c.fallback) ? g.U : c.fallback[C]) : q,
                    Q = c.cacheData,
                    R = C ? (null == Q ? void 0 : Q[C]) : g.U,
                    S = C ? B[C] : g.U,
                    T = (0, g.i)(S) && !(0, g.i)(R),
                    U = T ? R : S,
                    V = (a, b) => {
                        for (let c in O)
                            if ("data" === c) {
                                if (!o(a[c], b[c]) && (!(0, g.i)(a[c]) || !o(af, b[c]))) return !1;
                            } else if (b[c] !== a[c]) return !1;
                        return !0;
                    },
                    W = !E.current,
                    X = (0, d.useMemo)(() => {
                        let a = K(),
                            c = N(),
                            d = (a) => {
                                let c = (0, g.m)(a);
                                return (delete c._k,
                                (() => {
                                    if (!C || !b || I.current.isPaused()) return !1;
                                    if (W && !(0, g.i)(r)) return r;
                                    let a = (0, g.i)(P) ? c.data : P;
                                    return !(p && T && (0, g.i)(a)) && ((0, g.i)(a) || s);
                                })())
                                    ? { isValidating: !0, isLoading: !0, ...c }
                                    : c;
                            },
                            e = d(a),
                            f = a === c ? e : d(c),
                            h = e;
                        return [
                            () => {
                                let a = d(K());
                                return V(a, h) ? ((h.data = a.data), (h.isLoading = a.isLoading), (h.isValidating = a.isValidating), (h.error = a.error), h) : ((h = a), a);
                            },
                            () => f,
                        ];
                    }, [n, C]),
                    Y = (0, e.useSyncExternalStore)(
                        (0, d.useCallback)(
                            (a) =>
                                M(C, (b, c) => {
                                    V(c, b) || a();
                                }),
                            [n, C],
                        ),
                        X[0],
                        X[1],
                    ),
                    Z = y[C] && y[C].length > 0,
                    $ = Y.data,
                    _ = (0, g.i)($) ? (P && (0, g.b)(P) ? h(P) : P) : $,
                    aa = Y.error,
                    ab = (0, d.useRef)(_),
                    ac = (0, d.useRef)(g.U),
                    ad = ac.current;
                ad || (ac.current = ad = new WeakMap());
                let ae = (0, d.useRef)(null),
                    af = w ? ((0, g.i)($) ? ((0, g.i)(ab.current) ? _ : ab.current) : $) : _,
                    ag = C && (0, g.i)(_),
                    ah = (0, d.useRef)(null);
                g.I ||
                    (0, e.useSyncExternalStore)(
                        m,
                        () => ((ah.current = !1), ah),
                        () => ((ah.current = !0), ah),
                    );
                let ai = ah.current;
                x && ai && !p && ag && console.warn(`Missing pre-initiated data for serialized key "${C}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`);
                let aj = !(!C || !b || I.current.isPaused()) && (!Z || !!(0, g.i)(aa)) && (W && !(0, g.i)(r) ? r : (!p || !T || !ag) && (p ? !(0, g.i)(_) && s : (0, g.i)(_) || s)),
                    ak = W && aj,
                    al = (0, g.i)(Y.isValidating) ? ak : Y.isValidating,
                    am = (0, g.i)(Y.isLoading) ? ak : Y.isLoading,
                    an = (0, d.useCallback)(
                        async (a) => {
                            let b,
                                d,
                                e = H.current;
                            if (!C || !e || F.current || I.current.isPaused()) return !1;
                            let f = !0,
                                h = a || {},
                                i = !A[C] || !h.dedupe,
                                l = T && !j(ad, Q, C) && !(0, g.i)(U) && (0, g.i)(K().data),
                                m = () => (g.j ? !F.current && C === G.current && E.current : C === G.current),
                                n = { isValidating: !1, isLoading: !1 },
                                p = () => {
                                    L(n);
                                },
                                q = () => {
                                    let a = A[C];
                                    a && a[1] === d && delete A[C];
                                },
                                r = { isValidating: !0 };
                            (0, g.i)(K().data) && (r.isLoading = !0);
                            try {
                                if (
                                    (i &&
                                        (L(r),
                                        c.loadingTimeout &&
                                            (0, g.i)(K().data) &&
                                            setTimeout(() => {
                                                f && m() && I.current.onLoadingSlow(C, c);
                                            }, c.loadingTimeout),
                                        l && k(ad, Q, C),
                                        (A[C] = [l ? U : e(D), (0, g.g)()]),
                                        l && B[C] && delete B[C]),
                                    ([b, d] = A[C]),
                                    (b = await b),
                                    i && setTimeout(q, c.dedupingInterval),
                                    !A[C] || A[C][1] !== d)
                                )
                                    return (i && m() && I.current.onDiscarded(C), !1);
                                n.error = g.U;
                                let a = z[C];
                                if (!(0, g.i)(a) && (d <= a[0] || d <= a[1] || 0 === a[1])) return (p(), i && m() && I.current.onDiscarded(C), !1);
                                let h = K().data;
                                ((n.data = o(h, b) ? h : b), i && m() && I.current.onSuccess(b, C, c));
                            } catch (c) {
                                q();
                                let a = I.current,
                                    { shouldRetryOnError: b } = a;
                                !a.isPaused() &&
                                    ((n.error = c),
                                    i &&
                                        m() &&
                                        (a.onError(c, C, a),
                                        (!0 === b || ((0, g.e)(b) && b(c))) &&
                                            (!I.current.revalidateOnFocus || !I.current.revalidateOnReconnect || J()) &&
                                            a.onErrorRetry(
                                                c,
                                                C,
                                                a,
                                                (a) => {
                                                    let b = y[C];
                                                    b && b[0] && b[0](g.E, a);
                                                },
                                                { retryCount: (h.retryCount || 0) + 1, dedupe: !0 },
                                            )));
                            }
                            return ((f = !1), p(), !0);
                        },
                        [C, n],
                    ),
                    ao = (0, d.useCallback)((...a) => (0, g.f)(n, G.current, ...a), []);
                if (
                    ((0, g.u)(() => {
                        let a = ae.current;
                        a && ((ae.current = null), k(ad, a.cacheData, a.key), (0, g.i)(K().data) && L({ data: a.data, error: g.U, _k: a._k }), B[a.key] && delete B[a.key]);
                    }),
                    (0, g.u)(() => {
                        ((H.current = b), (I.current = c), (0, g.i)($) || (ab.current = $));
                    }),
                    (0, g.u)(() => {
                        if (b || !T || (0, g.i)(U) || j(ad, Q, C) || !(0, g.i)(K().data)) return;
                        k(ad, Q, C);
                        let a = z[C];
                        (({ value: a, getCacheData: b, canCommit: c, setCache: d }) => {
                            let e = (a) => {
                                c() && (0, g.i)(b()) && d(a);
                            };
                            Promise.resolve(a).then(
                                (a) => {
                                    e({ data: a, error: g.U });
                                },
                                (a) => {
                                    e({ error: a });
                                },
                            );
                        })({ value: U, getCacheData: () => K().data, canCommit: () => !F.current && C === G.current && z[C] === a, setCache: (a) => L({ ...a, _k: D }) });
                    }),
                    (0, g.u)(() => {
                        if (!C) return;
                        let a = an.bind(g.U, i),
                            b = 0;
                        I.current.revalidateOnFocus && (b = Date.now() + I.current.focusThrottleInterval);
                        let c = (0, f.aw)(C, y, (c, d = {}) => {
                            if (c == g.F) {
                                let c = Date.now();
                                I.current.revalidateOnFocus && c > b && J() && ((b = c + I.current.focusThrottleInterval), a());
                            } else if (c == g.R) I.current.revalidateOnReconnect && J() && a();
                            else if (c == g.M) return an();
                            else if (c == g.E) return an(d);
                            else if (c == g.h && ((ab.current = g.U), d.revalidate)) return an();
                        });
                        return (
                            (F.current = !1),
                            (G.current = C),
                            (E.current = !0),
                            L({ _k: D }),
                            aj && !A[C] && ((0, g.i)(_) || g.I ? a() : (0, g.r)(a)),
                            () => {
                                ((F.current = !0), c());
                            }
                        );
                    }, [C]),
                    (0, g.u)(() => {
                        let a;
                        function b() {
                            let b = (0, g.e)(t) ? t(K().data) : t;
                            b && -1 !== a && (a = setTimeout(c, b));
                        }
                        function c() {
                            !K().error && (u || I.current.isVisible()) && (v || I.current.isOnline()) ? an(i).then(b) : b();
                        }
                        return (
                            b(),
                            () => {
                                a && (clearTimeout(a), (a = -1));
                            }
                        );
                    }, [t, u, v, C]),
                    (0, d.useDebugValue)(af),
                    p)
                ) {
                    if (!g.j && g.I && ag && (0, g.i)(U)) throw Error("Fallback data is required when using Suspense in SSR.");
                    ag && ((H.current = b), (I.current = c), (F.current = !1));
                    let a = !(0, g.i)(U) && ag,
                        d = g.U;
                    if ((a && T ? ((_ = d = U && (0, g.b)(U) ? h(U) : U), (af = d), g.I || (ae.current = { data: d, _k: D, key: C, cacheData: Q })) : h(a ? ao(U) : l), !(0, g.i)(aa) && ag)) throw aa;
                    let e = ag && (0, g.i)(d) ? an(i) : l;
                    (!(0, g.i)(af) && ag && ((e.status = "fulfilled"), (e.value = !0)), h(e));
                }
                return {
                    mutate: ao,
                    get data() {
                        return ((O.data = !0), af);
                    },
                    get error() {
                        return ((O.error = !0), aa);
                    },
                    get isValidating() {
                        return ((O.isValidating = !0), al);
                    },
                    get isLoading() {
                        return ((O.isLoading = !0), am);
                    },
                };
            });
        },
        25345: (a, b, c) => {
            c.d(b, { A: () => d });
            let d = (0, c(23339).A)("RefreshCw", [
                ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
                ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
                ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
                ["path", { d: "M8 16H3v5", key: "1cv678" }],
            ]);
        },
        42797: (a, b, c) => {
            var d = c(38301),
                e =
                    "function" == typeof Object.is
                        ? Object.is
                        : function (a, b) {
                              return (a === b && (0 !== a || 1 / a == 1 / b)) || (a != a && b != b);
                          },
                f = d.useState,
                g = d.useEffect,
                h = d.useLayoutEffect,
                i = d.useDebugValue;
            function j(a) {
                var b = a.getSnapshot;
                a = a.value;
                try {
                    var c = b();
                    return !e(a, c);
                } catch (a) {
                    return !0;
                }
            }
            var k =
                "undefined" == typeof window || void 0 === window.document || void 0 === window.document.createElement
                    ? function (a, b) {
                          return b();
                      }
                    : function (a, b) {
                          var c = b(),
                              d = f({ inst: { value: c, getSnapshot: b } }),
                              e = d[0].inst,
                              k = d[1];
                          return (
                              h(
                                  function () {
                                      ((e.value = c), (e.getSnapshot = b), j(e) && k({ inst: e }));
                                  },
                                  [a, c, b],
                              ),
                              g(
                                  function () {
                                      return (
                                          j(e) && k({ inst: e }),
                                          a(function () {
                                              j(e) && k({ inst: e });
                                          })
                                      );
                                  },
                                  [a],
                              ),
                              i(c),
                              c
                          );
                      };
            b.useSyncExternalStore = void 0 !== d.useSyncExternalStore ? d.useSyncExternalStore : k;
        },
        54937: (a, b, c) => {
            c.d(b, { A: () => d });
            let d = (0, c(23339).A)("ShieldCheck", [
                ["path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z", key: "oel41y" }],
                ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }],
            ]);
        },
        75234: (a, b, c) => {
            c.d(b, { A: () => d });
            let d = (0, c(23339).A)("Sparkles", [
                ["path", { d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z", key: "4pj2yx" }],
                ["path", { d: "M20 3v4", key: "1olli1" }],
                ["path", { d: "M22 5h-4", key: "1gvqau" }],
                ["path", { d: "M4 17v2", key: "vumght" }],
                ["path", { d: "M5 18H3", key: "zchphs" }],
            ]);
        },
        76254: (a, b, c) => {
            c.d(b, { Ay: () => k });
            var d = c(38301),
                e = c(18371),
                f = c(41555),
                g = c(21296),
                h = c(99088),
                i = c(24383);
            let j = Promise.resolve(),
                k = (0, g.Ht)(e.u, (a) => (b, c, e) => {
                    let g,
                        k = (0, d.useRef)(!1),
                        { cache: l, initialSize: m = 1, revalidateAll: n = !1, persistSize: o = !1, revalidateFirstPage: p = !0, revalidateOnMount: q = !1, parallel: r = !1 } = e,
                        [, , , s] = f.a.get(f.o);
                    try {
                        (g = ((a) => (0, f.s)(a ? a(0, null) : null)[0])(b)) && (g = i.q + g);
                    } catch (a) {}
                    let [t, u, v] = (0, f.c)(l, g),
                        w = (0, d.useCallback)(() => ((0, f.i)(t()._l) ? m : t()._l), [l, g, m]);
                    (0, h.useSyncExternalStore)(
                        (0, d.useCallback)(
                            (a) =>
                                g
                                    ? v(g, () => {
                                          a();
                                      })
                                    : () => {},
                            [l, g],
                        ),
                        w,
                        w,
                    );
                    let x = (0, d.useCallback)(() => {
                            let a = t()._l;
                            return (0, f.i)(a) ? m : a;
                        }, [g, m]),
                        y = (0, d.useRef)(x());
                    (0, f.u)(() => {
                        if (!k.current) {
                            k.current = !0;
                            return;
                        }
                        g && u({ _l: o ? y.current : x() });
                    }, [g, l]);
                    let z = q && !k.current,
                        A = a(
                            g,
                            async (a) => {
                                let d = t()._i,
                                    g = t()._r,
                                    h = f.a.get(l),
                                    i = h[8],
                                    j = () => h[8] !== i;
                                u({ _r: f.U });
                                let k = [],
                                    m = x(),
                                    [o] = (0, f.c)(l, a),
                                    q = o().data,
                                    v = [],
                                    w = null;
                                for (let a = 0; a < m; ++a) {
                                    let [h, i] = (0, f.s)(b(a, r ? null : w));
                                    if (!h) break;
                                    let [m, o] = (0, f.c)(l, h),
                                        t = m().data,
                                        u = n || d || (0, f.i)(t) || (p && !a && !(0, f.i)(q)) || z || (q && !(0, f.i)(q[a]) && !e.compare(q[a], t));
                                    if (c && ("function" == typeof g ? g(t, i) : u)) {
                                        let b = async () => {
                                            if (h in s) {
                                                let a = s[h];
                                                (delete s[h], (t = await a));
                                            } else t = await c(i);
                                            (j() || o({ data: t, _k: i }), (k[a] = t));
                                        };
                                        r ? v.push(b) : await b();
                                    } else k[a] = t;
                                    r || (w = t);
                                }
                                return (r && (await Promise.all(v.map((a) => a()))), j() || u({ _i: f.U }), k);
                            },
                            e,
                        ),
                        B = (0, d.useCallback)(
                            function (a, b) {
                                let c = "boolean" == typeof b ? { revalidate: b } : b || {},
                                    d = !1 !== c.revalidate;
                                return g ? (d && ((0, f.i)(a) ? u({ _i: !0, _r: c.revalidate }) : u({ _i: !1, _r: c.revalidate })), arguments.length ? A.mutate(a, { ...c, revalidate: d }) : A.mutate()) : j;
                            },
                            [g, l],
                        ),
                        C = (0, d.useCallback)(
                            (a) => {
                                let c;
                                if (!g) return j;
                                let [, d] = (0, f.c)(l, g);
                                if (((0, f.e)(a) ? (c = a(x())) : "number" == typeof a && (c = a), "number" != typeof c)) return j;
                                (d({ _l: c }), (y.current = c));
                                let e = [],
                                    [h] = (0, f.c)(l, g),
                                    i = null;
                                for (let a = 0; a < c; ++a) {
                                    let [c] = (0, f.s)(b(a, i)),
                                        [d] = (0, f.c)(l, c),
                                        g = c ? d().data : f.U;
                                    if ((0, f.i)(g)) return B(h().data);
                                    (e.push(g), (i = g));
                                }
                                return B(e);
                            },
                            [g, l, B, x],
                        );
                    return {
                        size: x(),
                        setSize: C,
                        mutate: B,
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
        90133: (a, b, c) => {
            c.d(b, { A: () => d });
            let d = (0, c(23339).A)("Circle", [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]]);
        },
        93983: (a, b, c) => {
            c.d(b, { A: () => d });
            let d = (0, c(23339).A)("ShieldAlert", [
                ["path", { d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z", key: "oel41y" }],
                ["path", { d: "M12 8v4", key: "1got3b" }],
                ["path", { d: "M12 16h.01", key: "1drbdi" }],
            ]);
        },
        99088: (a, b, c) => {
            a.exports = c(42797);
        },
    }));
