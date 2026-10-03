"use strict";
((exports.id = 708),
    (exports.ids = [708]),
    (exports.modules = {
        21296: (a, b, c) => {
            c.d(b, { Ht: () => n, aw: () => m, iX: () => j, qm: () => l });
            var d = c(41555),
                e = c(24383),
                f = c(38301);
            let g = d.p && window.__SWR_DEVTOOLS_USE__,
                h = g ? window.__SWR_DEVTOOLS_USE__ : [],
                i = (a) => ((0, d.e)(a[1]) ? [a[0], a[1], a[2] || {}] : [a[0], null, (null === a[1] ? a[2] : a[1]) || {}]),
                j = () => {
                    let a = (0, f.useContext)(d.q);
                    return (0, f.useMemo)(() => (0, d.m)(d.d, a), [a]);
                },
                k = h.concat((a) => (b, c, f) => {
                    let g =
                        c &&
                        ((...a) => {
                            let [f] = (0, d.s)(b),
                                [, , , g] = d.a.get(d.o);
                            if (f.startsWith(e.q)) return c(...a);
                            let h = g[f];
                            return (0, d.i)(h) ? c(...a) : (delete g[f], h);
                        });
                    return a(b, g, f);
                }),
                l = (a) =>
                    function (...b) {
                        let c = j(),
                            [e, f, g] = i(b),
                            h = (0, d.t)(c, g),
                            l = a,
                            { use: m } = h,
                            n = (m || []).concat(k);
                        for (let a = n.length; a--;) l = n[a](l);
                        return l(e, f || h.fetcher || null, h);
                    },
                m = (a, b, c) => {
                    let d = b[a] || (b[a] = []);
                    return (
                        d.push(c),
                        () => {
                            let a = d.indexOf(c);
                            a >= 0 && ((d[a] = d[d.length - 1]), d.pop());
                        }
                    );
                },
                n =
                    (a, b) =>
                    (...c) => {
                        let [d, e, f] = i(c),
                            g = (f.use || []).concat(b);
                        return a(d, e, { ...f, use: g });
                    };
            g && (window.__SWR_DEVTOOLS_REACT__ = f);
        },
        24383: (a, b, c) => {
            c.d(b, { q: () => d });
            let d = "$inf$";
        },
        41555: (a, b, c) => {
            c.d(b, { E: () => i, F: () => f, I: () => E, M: () => h, O: () => n, R: () => g, S: () => Z, U: () => m, a: () => k, b: () => r, c: () => y, d: () => W, e: () => p, f: () => Q, g: () => P, h: () => j, i: () => o, j: () => D, m: () => q, n: () => l, o: () => T, p: () => v, q: () => Y, r: () => F, s: () => N, t: () => X, u: () => G });
            var d = c(38301),
                e = Object.prototype.hasOwnProperty;
            let f = 0,
                g = 1,
                h = 2,
                i = 3,
                j = 4,
                k = new WeakMap(),
                l = () => {},
                m = l(),
                n = Object,
                o = (a) => a === m,
                p = (a) => "function" == typeof a,
                q = (a, b) => ({ ...a, ...b }),
                r = (a) => p(a.then),
                s = {},
                t = {},
                u = "undefined",
                v = !1,
                w = typeof document != u,
                x = !1,
                y = (a, b) => {
                    let c = k.get(a);
                    return [
                        () => (!o(b) && a.get(b)) || s,
                        (d) => {
                            if (!o(b)) {
                                let e = a.get(b);
                                (b in t || (t[b] = e), c[5](b, q(e, d), e || s));
                            }
                        },
                        c[6],
                        () => (!o(b) && b in t ? t[b] : (!o(b) && a.get(b)) || s),
                    ];
                },
                z = !0,
                [A, B] = [l, l],
                C = {
                    initFocus: (a) => (
                        w && document.addEventListener("visibilitychange", a),
                        A("focus", a),
                        () => {
                            (w && document.removeEventListener("visibilitychange", a), B("focus", a));
                        }
                    ),
                    initReconnect: (a) => {
                        let b = () => {
                                ((z = !0), a());
                            },
                            c = () => {
                                z = !1;
                            };
                        return (
                            A("online", b),
                            A("offline", c),
                            () => {
                                (B("online", b), B("offline", c));
                            }
                        );
                    },
                },
                D = !d.useId,
                E = !v || x,
                F = (a) => (v && typeof window.requestAnimationFrame != u ? window.requestAnimationFrame(a) : setTimeout(a, 1)),
                G = E ? d.useEffect : d.useLayoutEffect,
                H = "undefined" != typeof navigator && navigator.connection,
                I = !E && H && (["slow-2g", "2g"].includes(H.effectiveType) || H.saveData),
                J = new WeakMap(),
                K = (a, b) => a === `[object ${b}]`,
                L = 0,
                M = (a) => {
                    let b,
                        c,
                        d = typeof a,
                        e = n.prototype.toString.call(a),
                        f = K(e, "Date"),
                        g = K(e, "RegExp"),
                        h = K(e, "Object");
                    if (n(a) !== a || f || g) b = f ? a.toJSON() : "symbol" == d ? a.toString() : "string" == d ? JSON.stringify(a) : "" + a;
                    else {
                        if ((b = J.get(a))) return b;
                        if (((b = ++L + "~"), J.set(a, b), Array.isArray(a))) {
                            for (c = 0, b = "@"; c < a.length; c++) b += M(a[c]) + ",";
                            J.set(a, b);
                        }
                        if (h) {
                            b = "#";
                            let d = n.keys(a).sort();
                            for (; !o((c = d.pop()));) o(a[c]) || (b += c + ":" + M(a[c]) + ",");
                            J.set(a, b);
                        }
                    }
                    return b;
                },
                N = (a) => {
                    if (p(a))
                        try {
                            a = a();
                        } catch (b) {
                            a = "";
                        }
                    let b = a;
                    return [(a = "string" == typeof a ? a : (Array.isArray(a) ? a.length : a) ? M(a) : ""), b];
                },
                O = 0,
                P = () => ++O;
            async function Q(...a) {
                let [b, c, d, e] = a,
                    f = q({ populateCache: !0, throwOnError: !0 }, "boolean" == typeof e ? { revalidate: e } : e || {}),
                    g = f.populateCache,
                    i = f.rollbackOnError,
                    j = f.optimisticData,
                    l = f.throwOnError;
                if (p(c)) {
                    let a = [];
                    for (let d of b.keys()) !/^\$(inf|sub)\$/.test(d) && c(b.get(d)._k) && a.push(d);
                    return Promise.all(a.map(n));
                }
                return n(c);
                async function n(c) {
                    let e,
                        [n] = N(c);
                    if (!n) return;
                    let [q, s] = y(b, n),
                        [t, u, v, w] = k.get(b),
                        x = () => {
                            let a = t[n];
                            return (p(f.revalidate) ? f.revalidate(q().data, c) : !1 !== f.revalidate) && (delete v[n], delete w[n], a && a[0]) ? a[0](h).then(() => q().data) : q().data;
                        };
                    if (a.length < 3) return x();
                    let z = d,
                        A = !1,
                        B = P();
                    u[n] = [B, 0];
                    let C = !o(j),
                        D = q(),
                        E = D.data,
                        F = D._c,
                        G = o(F) ? E : F;
                    if ((C && s({ data: (j = p(j) ? j(G, E) : j), _c: G }), p(z)))
                        try {
                            z = z(G);
                        } catch (a) {
                            ((e = a), (A = !0));
                        }
                    if (z && r(z)) {
                        let a;
                        if (
                            ((z = await z.catch((a) => {
                                ((e = a), (A = !0));
                            })),
                            B !== u[n][0])
                        ) {
                            if (A) throw e;
                            return z;
                        }
                        A && C && ((a = e), "function" == typeof i ? i(a) : !1 !== i) && ((g = !0), s({ data: G, _c: m }));
                    }
                    if (
                        (g && !A && (p(g) ? s({ data: g(z, G), error: m, _c: m }) : s({ data: z, error: m, _c: m })),
                        (u[n][1] = P()),
                        Promise.resolve(x()).then(() => {
                            s({ _c: m });
                        }),
                        A)
                    ) {
                        if (l) throw e;
                        return;
                    }
                    return z;
                }
            }
            let R = (a, b) => {
                    for (let c in a) a[c][0] && a[c][0](b);
                },
                S = (a, b) => {
                    if (!k.has(a)) {
                        let c = q(C, b),
                            d = Object.create(null),
                            e = Q.bind(m, a),
                            h = l,
                            i = Object.create(null),
                            n = (a, b) => {
                                let c = i[a] || [];
                                return (
                                    (i[a] = c),
                                    c.push(b),
                                    () => {
                                        let a = c.indexOf(b);
                                        a >= 0 && ((c[a] = c[c.length - 1]), c.pop());
                                    }
                                );
                            },
                            o = (b, c, d) => {
                                a.set(b, c);
                                let e = i[b];
                                if (e) for (let a of e) a(c, d);
                            },
                            p = (b) => {
                                let c = k.get(a),
                                    [, e, f, g] = c,
                                    h = P();
                                for (let a in (c[8]++, f)) delete f[a];
                                for (let a in g) delete g[a];
                                for (let a in e) e[a] = [h, h];
                                let l = {};
                                for (let b of [...a.keys()]) {
                                    let c = a.get(b);
                                    a.delete(b);
                                    let d = i[b];
                                    if (d) for (let a of d) a(l, c);
                                }
                                let m = !b || !1 !== b.revalidate;
                                for (let a in d) {
                                    let b = d[a];
                                    for (let a = 0; a < b.length; a++) b[a](j, { revalidate: m && !a });
                                }
                            },
                            r = () => {
                                if (!k.has(a) && (k.set(a, [d, Object.create(null), Object.create(null), Object.create(null), e, o, n, p, 0]), !E)) {
                                    let b = c.initFocus(setTimeout.bind(m, R.bind(m, d, f))),
                                        e = c.initReconnect(setTimeout.bind(m, R.bind(m, d, g)));
                                    h = () => {
                                        (b && b(), e && e(), k.delete(a));
                                    };
                                }
                            };
                        return (r(), [a, e, r, h, p]);
                    }
                    let c = k.get(a);
                    return [a, c[4], m, m, c[7]];
                },
                [T, U, , , V] = S(new Map()),
                W = q(
                    {
                        onLoadingSlow: l,
                        onSuccess: l,
                        onError: l,
                        onErrorRetry: (a, b, c, d, e) => {
                            let f = c.errorRetryCount,
                                g = e.retryCount,
                                h = ~~((Math.random() + 0.5) * (1 << (g < 8 ? g : 8))) * c.errorRetryInterval;
                            (o(f) || !(g > f)) && setTimeout(d, h, e);
                        },
                        onDiscarded: l,
                        revalidateOnFocus: !0,
                        revalidateOnReconnect: !0,
                        revalidateIfStale: !0,
                        shouldRetryOnError: !0,
                        errorRetryInterval: I ? 1e4 : 5e3,
                        focusThrottleInterval: 5e3,
                        dedupingInterval: 2e3,
                        loadingTimeout: I ? 5e3 : 3e3,
                        compare: function a(b, c) {
                            var d, f;
                            if (b === c) return !0;
                            if (b && c && (d = b.constructor) === c.constructor) {
                                if (d === Date) return b.getTime() === c.getTime();
                                if (d === RegExp) return b.toString() === c.toString();
                                if (d === Array) {
                                    if ((f = b.length) === c.length) for (; f-- && a(b[f], c[f]););
                                    return -1 === f;
                                }
                                if (!d || "object" == typeof b) {
                                    for (d in ((f = 0), b)) if ((e.call(b, d) && ++f && !e.call(c, d)) || !(d in c) || !a(b[d], c[d])) return !1;
                                    return Object.keys(c).length === f;
                                }
                            }
                            return b != b && c != c;
                        },
                        isPaused: () => !1,
                        cache: T,
                        mutate: U,
                        unload: V,
                        fallback: {},
                    },
                    {
                        isOnline: () => z,
                        isVisible: () => {
                            let a = w && document.visibilityState;
                            return o(a) || "hidden" !== a;
                        },
                    },
                ),
                X = (a, b) => {
                    let c = q(a, b);
                    if (b) {
                        let { use: d, fallback: e, cacheData: f } = a,
                            { use: g, fallback: h, cacheData: i } = b;
                        (d && g && (c.use = d.concat(g)), e && h && (c.fallback = q(e, h)), f && i && (c.cacheData = q(f, i)));
                    }
                    return c;
                },
                Y = (0, d.createContext)({}),
                Z = (a) => {
                    let { value: b } = a,
                        c = (0, d.useContext)(Y),
                        e = p(b),
                        f = (0, d.useMemo)(() => (e ? b(c) : b), [e, c, b]),
                        g = (0, d.useMemo)(() => (e ? f : X(c, f)), [e, c, f]),
                        h = f && f.provider,
                        i = (0, d.useRef)(m);
                    h && !i.current && (i.current = S(h(g.cache || T), f));
                    let j = i.current;
                    return (
                        j && ((g.cache = j[0]), (g.mutate = j[1]), (g.unload = j[4])),
                        G(() => {
                            if (j) return (j[2] && j[2](), j[3]);
                        }, []),
                        (0, d.createElement)(Y.Provider, q(a, { value: g }))
                    );
                };
        },
        47089: (a, b, c) => {
            c.d(b, { A: () => d });
            let d = (0, c(23339).A)("X", [
                ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
                ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
            ]);
        },
        88285: (a, b, c) => {
            c.d(b, { A: () => d });
            let d = (0, c(23339).A)("Search", [
                ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
                ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }],
            ]);
        },
    }));
