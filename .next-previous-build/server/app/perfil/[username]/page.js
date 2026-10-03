(() => {
    var a = {};
    ((a.id = 6250),
        (a.ids = [6250]),
        (a.modules = {
            261: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/router/utils/app-paths");
            },
            3295: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");
            },
            5870: (a, b, c) => {
                "use strict";
                let d, e, f, g, h;
                c.d(b, { TrainerProfileView: () => ji });
                var i,
                    j,
                    k,
                    l,
                    m,
                    n,
                    o,
                    p,
                    q,
                    r,
                    s,
                    t,
                    u,
                    v,
                    w,
                    y,
                    z,
                    A,
                    B,
                    C,
                    D,
                    E,
                    F,
                    G,
                    H,
                    I,
                    J,
                    K,
                    L,
                    M,
                    N,
                    O,
                    P,
                    Q,
                    R,
                    S,
                    T,
                    U,
                    V,
                    W,
                    X,
                    Y,
                    Z,
                    $,
                    _,
                    aa,
                    ab,
                    ac,
                    ad,
                    ae,
                    af,
                    ag,
                    ah,
                    ai,
                    aj,
                    ak,
                    al,
                    am,
                    an,
                    ao,
                    ap,
                    aq,
                    ar,
                    as,
                    at,
                    au,
                    av,
                    aw,
                    ax,
                    ay,
                    az,
                    aA,
                    aB,
                    aC,
                    aD,
                    aE,
                    aF,
                    aG,
                    aH,
                    aI,
                    aJ,
                    aK,
                    aL,
                    aM,
                    aN,
                    aO,
                    aP,
                    aQ,
                    aR,
                    aS,
                    aT,
                    aU,
                    aV,
                    aW,
                    aX,
                    aY,
                    aZ,
                    a$,
                    a_,
                    a0,
                    a1,
                    a2,
                    a3,
                    a4,
                    a5,
                    a6,
                    a7,
                    a8,
                    a9,
                    ba,
                    bb,
                    bc,
                    bd,
                    be,
                    bf,
                    bg,
                    bh,
                    bi,
                    bj,
                    bk,
                    bl,
                    bm,
                    bn,
                    bo,
                    bp,
                    bq,
                    br,
                    bs,
                    bt,
                    bu,
                    bv,
                    bw,
                    bx,
                    by,
                    bz,
                    bA,
                    bB,
                    bC,
                    bD,
                    bE,
                    bF,
                    bG,
                    bH,
                    bI,
                    bJ,
                    bK,
                    bL,
                    bM,
                    bN,
                    bO,
                    bP,
                    bQ,
                    bR,
                    bS,
                    bT,
                    bU,
                    bV,
                    bW,
                    bX,
                    bY,
                    bZ,
                    b$,
                    b_,
                    b0,
                    b1,
                    b2,
                    b3,
                    b4,
                    b5,
                    b6,
                    b7,
                    b8,
                    b9,
                    ca,
                    cb,
                    cc,
                    cd,
                    ce,
                    cf,
                    cg,
                    ch = c(21124),
                    ci = c(38301),
                    cj = c(24515),
                    ck = c(3991),
                    cl = c.n(ck),
                    cm = c(42378),
                    cn = c(18371);
                let co = Symbol.for("preact-signals");
                function cp() {
                    if (ct > 1) return void ct--;
                    let a,
                        b = !1,
                        c = cs;
                    for (cs = void 0; void 0 !== c;) {
                        let a = c.S;
                        if (a.v === c.v) for (let b = a.t; void 0 !== b; b = b.x) b.i === c.i && (b.i = a.i);
                        c = c.o;
                    }
                    for (; void 0 !== f;) {
                        let c = f;
                        for (f = void 0, cu++; void 0 !== c;) {
                            let d = c.u;
                            if (((c.u = void 0), (c.f &= -3), !(8 & c.f) && cB(c)))
                                try {
                                    c.c();
                                } catch (c) {
                                    b || ((a = c), (b = !0));
                                }
                            c = d;
                        }
                    }
                    if (((cu = 0), ct--, b)) throw a;
                }
                function cq(a) {
                    if (ct > 0) return a();
                    ((cw = ++cv), ct++);
                    try {
                        return a();
                    } finally {
                        cp();
                    }
                }
                function cr(a) {
                    let b = d,
                        c = e;
                    ((d = void 0), (e = void 0));
                    try {
                        return a();
                    } finally {
                        ((d = b), (e = c));
                    }
                }
                let cs,
                    ct = 0,
                    cu = 0,
                    cv = 0,
                    cw = 0,
                    cx = 0;
                function cy(a) {
                    if (void 0 === d) return;
                    let b = a.n;
                    return void 0 === b || b.t !== d ? ((b = { i: 0, S: a, p: d.s, n: void 0, t: d, e: void 0, x: void 0, r: b }), void 0 !== d.s && (d.s.n = b), (d.s = b), (a.n = b), 32 & d.f && a.S(b), b) : -1 === b.i ? ((b.i = 0), void 0 !== b.n && ((b.n.p = b.p), void 0 !== b.p && (b.p.n = b.n), (b.p = d.s), (b.n = void 0), (d.s.n = b), (d.s = b)), b) : void 0;
                }
                function cz(a, b) {
                    ((this.v = a), (this.i = 0), (this.n = void 0), (this.t = void 0), (this.l = 0), (this.W = null == b ? void 0 : b.watched), (this.Z = null == b ? void 0 : b.unwatched), (this.name = null == b ? void 0 : b.name));
                }
                function cA(a, b) {
                    return new cz(a, b);
                }
                function cB(a) {
                    for (let b = a.s; void 0 !== b; b = b.n) if (b.S.i !== b.i || !b.S.h() || b.S.i !== b.i) return !0;
                    return !1;
                }
                function cC(a) {
                    for (let b = a.s; void 0 !== b; b = b.n) {
                        let c = b.S.n;
                        if ((void 0 !== c && (b.r = c), (b.S.n = b), (b.i = -1), void 0 === b.n)) {
                            a.s = b;
                            break;
                        }
                    }
                }
                function cD(a) {
                    let b,
                        c = a.s;
                    for (; void 0 !== c;) {
                        let a = c.p;
                        (-1 === c.i ? (c.S.U(c), void 0 !== a && (a.n = c.n), void 0 !== c.n && (c.n.p = a)) : (b = c), (c.S.n = c.r), void 0 !== c.r && (c.r = void 0), (c = a));
                    }
                    a.s = b;
                }
                function cE(a, b) {
                    (cz.call(this, void 0, b), (this.x = a), (this.s = void 0), (this.g = cx - 1), (this.f = 4));
                }
                function cF(a) {
                    let b = a.m;
                    if (((a.m = void 0), "function" == typeof b)) {
                        ct++;
                        let c = d;
                        d = void 0;
                        try {
                            b();
                        } catch (b) {
                            throw ((a.f &= -2), (a.f |= 8), cG(a), b);
                        } finally {
                            ((d = c), cp());
                        }
                    }
                }
                function cG(a) {
                    for (let b = a.s; void 0 !== b; b = b.n) b.S.U(b);
                    ((a.x = void 0), (a.s = void 0), cF(a));
                }
                function cH(a) {
                    if (d !== this) throw Error("Out-of-order effect");
                    (cD(this), (d = a), (this.f &= -2), 8 & this.f && cG(this), cp());
                }
                function cI(a, b) {
                    ((this.x = a), (this.m = void 0), (this.s = void 0), (this.u = void 0), (this.f = 32), (this.name = null == b ? void 0 : b.name), e && e.push(this));
                }
                function cJ(a, b) {
                    let c = new cI(a, b);
                    try {
                        c.c();
                    } catch (a) {
                        throw (c.d(), a);
                    }
                    let d = c.d.bind(c);
                    return ((d[Symbol.dispose] = d), d);
                }
                ((cz.prototype.brand = co),
                    (cz.prototype.h = function () {
                        return !0;
                    }),
                    (cz.prototype.S = function (a) {
                        let b = this.t;
                        b !== a &&
                            void 0 === a.e &&
                            ((a.x = b),
                            (this.t = a),
                            void 0 !== b
                                ? (b.e = a)
                                : cr(() => {
                                      var a;
                                      null == (a = this.W) || a.call(this);
                                  }));
                    }),
                    (cz.prototype.U = function (a) {
                        if (void 0 !== this.t) {
                            let b = a.e,
                                c = a.x;
                            (void 0 !== b && ((b.x = c), (a.e = void 0)),
                                void 0 !== c && ((c.e = b), (a.x = void 0)),
                                a === this.t &&
                                    ((this.t = c),
                                    void 0 === c &&
                                        cr(() => {
                                            var a;
                                            null == (a = this.Z) || a.call(this);
                                        })));
                        }
                    }),
                    (cz.prototype.subscribe = function (a) {
                        return cJ(
                            () => {
                                let b = this.value;
                                cr(() => a(b));
                            },
                            { name: "sub" },
                        );
                    }),
                    (cz.prototype.valueOf = function () {
                        return this.value;
                    }),
                    (cz.prototype.toString = function () {
                        return this.value + "";
                    }),
                    (cz.prototype.toJSON = function () {
                        return this.value;
                    }),
                    (cz.prototype.peek = function () {
                        return cr(() => this.value);
                    }),
                    Object.defineProperty(cz.prototype, "value", {
                        get() {
                            let a = cy(this);
                            return (void 0 !== a && (a.i = this.i), this.v);
                        },
                        set(a) {
                            if (a !== this.v) {
                                if (cu > 100) throw Error("Cycle detected");
                                (0 !== ct && 0 === cu && this.l !== cw && ((this.l = cw), (cs = { S: this, v: this.v, i: this.i, o: cs })), (this.v = a), this.i++, cx++, ct++);
                                try {
                                    for (let a = this.t; void 0 !== a; a = a.x) a.t.N();
                                } finally {
                                    cp();
                                }
                            }
                        },
                    }),
                    (cE.prototype = new cz()),
                    (cE.prototype.h = function () {
                        if (((this.f &= -3), 1 & this.f)) return !1;
                        if (32 == (36 & this.f) || ((this.f &= -5), this.g === cx)) return !0;
                        if (((this.g = cx), (this.f |= 1), this.i > 0 && !cB(this))) return ((this.f &= -2), !0);
                        let a = d;
                        try {
                            (cC(this), (d = this));
                            let a = this.x();
                            (16 & this.f || this.v !== a || 0 === this.i) && ((this.v = a), (this.f &= -17), this.i++);
                        } catch (a) {
                            ((this.v = a), (this.f |= 16), this.i++);
                        }
                        return ((d = a), cD(this), (this.f &= -2), !0);
                    }),
                    (cE.prototype.S = function (a) {
                        if (void 0 === this.t) {
                            this.f |= 36;
                            for (let a = this.s; void 0 !== a; a = a.n) a.S.S(a);
                        }
                        cz.prototype.S.call(this, a);
                    }),
                    (cE.prototype.U = function (a) {
                        if (void 0 !== this.t && (cz.prototype.U.call(this, a), void 0 === this.t)) {
                            this.f &= -33;
                            for (let a = this.s; void 0 !== a; a = a.n) a.S.U(a);
                        }
                    }),
                    (cE.prototype.N = function () {
                        if (!(2 & this.f)) {
                            this.f |= 6;
                            for (let a = this.t; void 0 !== a; a = a.x) a.t.N();
                        }
                    }),
                    Object.defineProperty(cE.prototype, "value", {
                        get() {
                            if (1 & this.f) throw Error("Cycle detected");
                            let a = cy(this);
                            if ((this.h(), void 0 !== a && (a.i = this.i), 16 & this.f)) throw this.v;
                            return this.v;
                        },
                    }),
                    (cI.prototype.c = function () {
                        let a = this.S();
                        try {
                            if (8 & this.f || void 0 === this.x) return;
                            let a = this.x();
                            "function" == typeof a && (this.m = a);
                        } finally {
                            a();
                        }
                    }),
                    (cI.prototype.S = function () {
                        if (1 & this.f) throw Error("Cycle detected");
                        ((this.f |= 1), (this.f &= -9), cF(this), cC(this), ct++);
                        let a = d;
                        return ((d = this), cH.bind(this, a));
                    }),
                    (cI.prototype.N = function () {
                        2 & this.f || ((this.f |= 2), (this.u = f), (f = this));
                    }),
                    (cI.prototype.d = function () {
                        ((this.f |= 8), 1 & this.f || cG(this));
                    }),
                    (cI.prototype.dispose = function () {
                        this.d();
                    }));
                var cK = Object.create,
                    cL = Object.defineProperty,
                    cM = Object.defineProperties,
                    cN = Object.getOwnPropertyDescriptor,
                    cO = Object.getOwnPropertyDescriptors,
                    cP = Object.getOwnPropertySymbols,
                    cQ = Object.prototype.hasOwnProperty,
                    cR = Object.prototype.propertyIsEnumerable,
                    cS = (a, b) => ((b = Symbol[a]) ? b : Symbol.for("Symbol." + a)),
                    cT = (a) => {
                        throw TypeError(a);
                    },
                    cU = (a, b, c) => (b in a ? cL(a, b, { enumerable: !0, configurable: !0, writable: !0, value: c }) : (a[b] = c)),
                    cV = (a, b) => cL(a, "name", { value: b, configurable: !0 }),
                    cW = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"],
                    cX = (a) => (void 0 !== a && "function" != typeof a ? cT("Function expected") : a),
                    cY = (a, b, c, d, e) => ({ kind: cW[a], name: b, metadata: d, addInitializer: (a) => (c._ ? cT("Already initialized") : e.push(cX(a || null))) }),
                    cZ = (a, b) => cU(b, cS("metadata"), a[3]),
                    c$ = (a, b, c, d) => {
                        for (var e = 0, f = a[b >> 1], g = f && f.length; e < g; e++) 1 & b ? f[e].call(c) : (d = f[e].call(c, d));
                        return d;
                    },
                    c_ = (a, b, c, d, e, f) => {
                        var g,
                            h,
                            i,
                            j,
                            k,
                            l = 7 & b,
                            m = !!(8 & b),
                            n = !!(16 & b),
                            o = l > 3 ? a.length + 1 : l ? (m ? 1 : 2) : 0,
                            p = cW[l + 5],
                            q = l > 3 && (a[o - 1] = []),
                            r = a[o] || (a[o] = []),
                            s =
                                l &&
                                (n || m || (e = e.prototype),
                                l < 5 &&
                                    (l > 3 || !n) &&
                                    cN(
                                        l < 4
                                            ? e
                                            : {
                                                  get [c]() {
                                                      return c2(this, f);
                                                  },
                                                  set [c](x) {
                                                      return c4(this, f, x);
                                                  },
                                              },
                                        c,
                                    ));
                        l ? n && l < 4 && cV(f, (l > 2 ? "set " : l > 1 ? "get " : "") + c) : cV(e, c);
                        for (var t = d.length - 1; t >= 0; t--)
                            ((j = cY(l, c, (i = {}), a[3], r)),
                                l && ((j.static = m), (j.private = n), (k = j.access = { has: n ? (a) => c1(e, a) : (a) => c in a }), 3 ^ l && (k.get = n ? (a) => (1 ^ l ? c2 : c5)(a, e, 4 ^ l ? f : s.get) : (a) => a[c]), l > 2 && (k.set = n ? (a, b) => c4(a, e, b, 4 ^ l ? f : s.set) : (a, b) => (a[c] = b))),
                                (h = (0, d[t])(l ? (l < 4 ? (n ? f : s[p]) : l > 4 ? void 0 : { get: s.get, set: s.set }) : e, j)),
                                (i._ = 1),
                                4 ^ l || void 0 === h ? cX(h) && (l > 4 ? q.unshift(h) : l ? (n ? (f = h) : (s[p] = h)) : (e = h)) : "object" != typeof h || null === h ? cT("Object expected") : (cX((g = h.get)) && (s.get = g), cX((g = h.set)) && (s.set = g), cX((g = h.init)) && q.unshift(g)));
                        return (l || cZ(a, e), s && cL(e, c, s), n ? (4 ^ l ? f : s) : e);
                    },
                    c0 = (a, b, c) => b.has(a) || cT("Cannot " + c),
                    c1 = (a, b) => (Object(b) !== b ? cT('Cannot use the "in" operator on this value') : a.has(b)),
                    c2 = (a, b, c) => (c0(a, b, "read from private field"), c ? c.call(a) : b.get(a)),
                    c3 = (a, b, c) => (b.has(a) ? cT("Cannot add the same private member more than once") : b instanceof WeakSet ? b.add(a) : b.set(a, c)),
                    c4 = (a, b, c, d) => (c0(a, b, "write to private field"), d ? d.call(a, c) : b.set(a, c), c),
                    c5 = (a, b, c) => (c0(a, b, "access private method"), c);
                function c6(a, b) {
                    if (b) {
                        let c;
                        return new cE(
                            () => {
                                let d = a();
                                return d && c && b(c, d) ? c : ((c = d), d);
                            },
                            void 0,
                        );
                    }
                    return new cE(a, void 0);
                }
                function c7(a, b) {
                    if (Object.is(a, b)) return !0;
                    if (null === a || null === b) return !1;
                    if ("function" == typeof a && "function" == typeof b) return a === b;
                    if (a instanceof Set && b instanceof Set) {
                        if (a.size !== b.size) return !1;
                        for (let c of a) if (!b.has(c)) return !1;
                        return !0;
                    }
                    if (Array.isArray(a)) return !!Array.isArray(b) && a.length === b.length && !a.some((a, c) => !c7(a, b[c]));
                    if ("object" == typeof a && "object" == typeof b) {
                        let c = Object.keys(a),
                            d = Object.keys(b);
                        return c.length === d.length && !c.some((c) => !c7(a[c], b[c]));
                    }
                    return !1;
                }
                function c8({ get: a }, b) {
                    return {
                        init: (a) => cA(a),
                        get() {
                            return a.call(this).value;
                        },
                        set(b) {
                            let c = a.call(this);
                            c.peek() !== b && (c.value = b);
                        },
                    };
                }
                function c9(a, b) {
                    let c = new WeakMap();
                    return function () {
                        let b = c.get(this);
                        return (b || ((b = c6(a.bind(this))), c.set(this, b)), b.value);
                    };
                }
                function da(a = !0) {
                    return function (b, c) {
                        c.addInitializer(function () {
                            let b = "field" === c.kind || c.static ? this : Object.getPrototypeOf(this),
                                d = Object.getOwnPropertyDescriptor(b, c.name);
                            d &&
                                Object.defineProperty(
                                    b,
                                    c.name,
                                    cM(
                                        ((a, b) => {
                                            for (var c in b || (b = {})) cQ.call(b, c) && cU(a, c, b[c]);
                                            if (cP) for (var c of cP(b)) cR.call(b, c) && cU(a, c, b[c]);
                                            return a;
                                        })({}, d),
                                        cO({ enumerable: a }),
                                    ),
                                );
                        });
                    };
                }
                function db(...a) {
                    let b = a.map((a) => cJ(a));
                    return () => b.forEach((a) => a());
                }
                ((n = [c8]), (m = [c8]), (l = [c8]), (k = [da()]), (j = [da()]), (i = [da()]));
                var dc = class {
                    constructor(a, b = Object.is) {
                        ((this.defaultValue = a), (this.equals = b), c$(o, 5, this), c3(this, t), c3(this, p, c$(o, 8, this)), c$(o, 11, this), c3(this, u, c$(o, 12, this)), c$(o, 15, this), c3(this, z, c$(o, 16, this)), c$(o, 19, this), (this.reset = this.reset.bind(this)), this.reset());
                    }
                    get current() {
                        return c2(this, t, B);
                    }
                    get initial() {
                        return c2(this, t, r);
                    }
                    get previous() {
                        return c2(this, t, w);
                    }
                    set current(a) {
                        let b = cr(() => c2(this, t, B));
                        (a && b && this.equals(b, a)) ||
                            cq(() => {
                                (c2(this, t, r) || c4(this, t, a, s), c4(this, t, b, y), c4(this, t, a, C));
                            });
                    }
                    reset(a = this.defaultValue) {
                        cq(() => {
                            (c4(this, t, void 0, y), c4(this, t, a, s), c4(this, t, a, C));
                        });
                    }
                };
                function dd(a) {
                    return cr(() => {
                        let b = {};
                        for (let c in a) b[c] = a[c];
                        return b;
                    });
                }
                ((o = ((a) => {
                    var b;
                    return [, , , cK(null != (b = null == a ? void 0 : a[cS("metadata")]) ? b : null)];
                })(null)),
                    (p = new WeakMap()),
                    (t = new WeakSet()),
                    (u = new WeakMap()),
                    (z = new WeakMap()),
                    (r = (q = c_(o, 20, "#initial", n, t, p)).get),
                    (s = q.set),
                    (w = (v = c_(o, 20, "#previous", m, t, u)).get),
                    (y = v.set),
                    (B = (A = c_(o, 20, "#current", l, t, z)).get),
                    (C = A.set),
                    c_(o, 2, "current", k, dc),
                    c_(o, 2, "initial", j, dc),
                    c_(o, 2, "previous", i, dc),
                    cZ(o, dc));
                var de = class {
                    constructor() {
                        c3(this, D, new WeakMap());
                    }
                    get(a, b) {
                        var c;
                        return a ? (null == (c = c2(this, D).get(a)) ? void 0 : c.get(b)) : void 0;
                    }
                    set(a, b, c) {
                        var d;
                        if (a) return (c2(this, D).has(a) || c2(this, D).set(a, new Map()), null == (d = c2(this, D).get(a)) ? void 0 : d.set(b, c));
                    }
                    clear(a) {
                        var b;
                        return a ? (null == (b = c2(this, D).get(a)) ? void 0 : b.clear()) : void 0;
                    }
                };
                D = new WeakMap();
                var df = Object.create,
                    dg = Object.defineProperty,
                    dh = Object.getOwnPropertyDescriptor,
                    di = Object.getOwnPropertySymbols,
                    dj = Object.prototype.hasOwnProperty,
                    dk = Object.prototype.propertyIsEnumerable,
                    dl = (a, b) => ((b = Symbol[a]) ? b : Symbol.for("Symbol." + a)),
                    dm = (a) => {
                        throw TypeError(a);
                    },
                    dn = Math.pow,
                    dp = (a, b, c) => (b in a ? dg(a, b, { enumerable: !0, configurable: !0, writable: !0, value: c }) : (a[b] = c)),
                    dq = (a, b) => dg(a, "name", { value: b, configurable: !0 }),
                    dr = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"],
                    ds = (a) => (void 0 !== a && "function" != typeof a ? dm("Function expected") : a),
                    dt = (a, b, c, d, e) => ({ kind: dr[a], name: b, metadata: d, addInitializer: (a) => (c._ ? dm("Already initialized") : e.push(ds(a || null))) }),
                    du = (a, b) => dp(b, dl("metadata"), a[3]),
                    dv = (a, b, c, d, e, f) => {
                        var g,
                            h,
                            i,
                            j,
                            k,
                            l = 7 & b,
                            m = !!(8 & b),
                            n = !!(16 & b),
                            o = l > 3 ? a.length + 1 : l ? (m ? 1 : 2) : 0,
                            p = dr[l + 5],
                            q = l > 3 && (a[o - 1] = []),
                            r = a[o] || (a[o] = []),
                            s =
                                l &&
                                (n || m || (e = e.prototype),
                                l < 5 &&
                                    (l > 3 || !n) &&
                                    dh(
                                        l < 4
                                            ? e
                                            : {
                                                  get [c]() {
                                                      return dy(this, f);
                                                  },
                                                  set [c](x) {
                                                      return dz(this, f, x);
                                                  },
                                              },
                                        c,
                                    ));
                        l ? n && l < 4 && dq(f, (l > 2 ? "set " : l > 1 ? "get " : "") + c) : dq(e, c);
                        for (var t = d.length - 1; t >= 0; t--)
                            ((j = dt(l, c, (i = {}), a[3], r)),
                                l && ((j.static = m), (j.private = n), (k = j.access = { has: n ? (a) => dx(e, a) : (a) => c in a }), 3 ^ l && (k.get = n ? (a) => (1 ^ l ? dy : dA)(a, e, 4 ^ l ? f : s.get) : (a) => a[c]), l > 2 && (k.set = n ? (a, b) => dz(a, e, b, 4 ^ l ? f : s.set) : (a, b) => (a[c] = b))),
                                (h = (0, d[t])(l ? (l < 4 ? (n ? f : s[p]) : l > 4 ? void 0 : { get: s.get, set: s.set }) : e, j)),
                                (i._ = 1),
                                4 ^ l || void 0 === h ? ds(h) && (l > 4 ? q.unshift(h) : l ? (n ? (f = h) : (s[p] = h)) : (e = h)) : "object" != typeof h || null === h ? dm("Object expected") : (ds((g = h.get)) && (s.get = g), ds((g = h.set)) && (s.set = g), ds((g = h.init)) && q.unshift(g)));
                        return (l || du(a, e), s && dg(e, c, s), n ? (4 ^ l ? f : s) : e);
                    },
                    dw = (a, b, c) => b.has(a) || dm("Cannot " + c),
                    dx = (a, b) => (Object(b) !== b ? dm('Cannot use the "in" operator on this value') : a.has(b)),
                    dy = (a, b, c) => (dw(a, b, "read from private field"), c ? c.call(a) : b.get(a)),
                    dz = (a, b, c, d) => (dw(a, b, "write to private field"), d ? d.call(a, c) : b.set(a, c), c),
                    dA = (a, b, c) => (dw(a, b, "access private method"), c),
                    dB = class a {
                        constructor(a, b) {
                            ((this.x = a), (this.y = b));
                        }
                        static delta(b, c) {
                            return new a(b.x - c.x, b.y - c.y);
                        }
                        static distance(a, b) {
                            return Math.hypot(a.x - b.x, a.y - b.y);
                        }
                        static equals(a, b) {
                            return a.x === b.x && a.y === b.y;
                        }
                        static from({ x: b, y: c }) {
                            return new a(b, c);
                        }
                    },
                    dC = class a {
                        constructor(a, b, c, d) {
                            ((this.left = a), (this.top = b), (this.width = c), (this.height = d), (this.scale = { x: 1, y: 1 }));
                        }
                        get inverseScale() {
                            return { x: 1 / this.scale.x, y: 1 / this.scale.y };
                        }
                        translate(b, c) {
                            let { top: d, left: e, width: f, height: g, scale: h } = this,
                                i = new a(e + b, d + c, f, g);
                            return (
                                (i.scale = ((a, b) => {
                                    for (var c in b || (b = {})) dj.call(b, c) && dp(a, c, b[c]);
                                    if (di) for (var c of di(b)) dk.call(b, c) && dp(a, c, b[c]);
                                    return a;
                                })({}, h)),
                                i
                            );
                        }
                        get boundingRectangle() {
                            let { width: a, height: b, left: c, top: d, right: e, bottom: f } = this;
                            return { width: a, height: b, left: c, top: d, right: e, bottom: f };
                        }
                        get center() {
                            let { left: a, top: b, right: c, bottom: d } = this;
                            return new dB((a + c) / 2, (b + d) / 2);
                        }
                        get area() {
                            let { width: a, height: b } = this;
                            return a * b;
                        }
                        equals(b) {
                            if (!(b instanceof a)) return !1;
                            let { left: c, top: d, width: e, height: f } = this;
                            return c === b.left && d === b.top && e === b.width && f === b.height;
                        }
                        containsPoint(a) {
                            let { top: b, left: c, bottom: d, right: e } = this;
                            return b <= a.y && a.y <= d && c <= a.x && a.x <= e;
                        }
                        intersectionArea(b) {
                            return b instanceof a
                                ? (function (a, b) {
                                      let c = Math.max(b.top, a.top),
                                          d = Math.max(b.left, a.left),
                                          e = Math.min(b.left + b.width, a.left + a.width),
                                          f = Math.min(b.top + b.height, a.top + a.height);
                                      return d < e && c < f ? (e - d) * (f - c) : 0;
                                  })(this, b)
                                : 0;
                        }
                        intersectionRatio(a) {
                            let { area: b } = this,
                                c = this.intersectionArea(a);
                            return c / (a.area + b - c);
                        }
                        get bottom() {
                            let { top: a, height: b } = this;
                            return a + b;
                        }
                        get right() {
                            let { left: a, width: b } = this;
                            return a + b;
                        }
                        get aspectRatio() {
                            let { width: a, height: b } = this;
                            return a / b;
                        }
                        get corners() {
                            return [
                                { x: this.left, y: this.top },
                                { x: this.right, y: this.top },
                                { x: this.left, y: this.bottom },
                                { x: this.right, y: this.bottom },
                            ];
                        }
                        static from({ top: b, left: c, width: d, height: e }) {
                            return new a(c, b, d, e);
                        }
                        static delta(a, b, c = { x: "center", y: "center" }) {
                            let d = (a, b) => {
                                let d = c[b],
                                    e = "x" === b ? a.left : a.top,
                                    f = "x" === b ? a.width : a.height;
                                return "start" == d ? e : "end" == d ? e + f : e + f / 2;
                            };
                            return dB.delta({ x: d(a, "x"), y: d(a, "y") }, { x: d(b, "x"), y: d(b, "y") });
                        }
                        static intersectionRatio(b, c) {
                            return a.from(b).intersectionRatio(a.from(c));
                        }
                    },
                    dD = class extends ((G = dc), (F = [c9]), (E = [c9]), G) {
                        constructor(a) {
                            (super(dB.from(a), (a, b) => dB.equals(a, b)),
                                ((a, b, c, d) => {
                                    for (var e = 0, f = a[b >> 1], g = f && f.length; e < g; e++) 1 & b ? f[e].call(c) : (d = f[e].call(c, d));
                                })(I, 5, this),
                                ((a, b, c) => (b.has(a) ? dm("Cannot add the same private member more than once") : b instanceof WeakSet ? b.add(a) : b.set(a, c)))(this, H, 0),
                                (this.velocity = { x: 0, y: 0 }));
                        }
                        get delta() {
                            return dB.delta(this.current, this.initial);
                        }
                        get direction() {
                            let { current: a, previous: b } = this;
                            if (!b) return null;
                            let c = { x: a.x - b.x, y: a.y - b.y };
                            return c.x || c.y ? (Math.abs(c.x) > Math.abs(c.y) ? (c.x > 0 ? "right" : "left") : c.y > 0 ? "down" : "up") : null;
                        }
                        get current() {
                            return super.current;
                        }
                        set current(a) {
                            let { current: b } = this,
                                c = dB.from(a),
                                d = { x: c.x - b.x, y: c.y - b.y },
                                e = Date.now(),
                                f = e - dy(this, H),
                                g = (a) => Math.round((a / f) * 100);
                            cq(() => {
                                (dz(this, H, e), (this.velocity = { x: g(d.x), y: g(d.y) }), (super.current = c));
                            });
                        }
                        reset(a = this.defaultValue) {
                            (super.reset(dB.from(a)), (this.velocity = { x: 0, y: 0 }));
                        }
                    };
                function dE({ x: a, y: b }, c) {
                    let d = Math.abs(a),
                        e = Math.abs(b);
                    return "number" == typeof c ? Math.sqrt(dn(d, 2) + dn(e, 2)) > c : "x" in c && "y" in c ? d > c.x && e > c.y : "x" in c ? d > c.x : "y" in c && e > c.y;
                }
                ((I = ((a) => {
                    var b;
                    return [, , , df(null != (b = null == a ? void 0 : a[dl("metadata")]) ? b : null)];
                })(G)),
                    (H = new WeakMap()),
                    dv(I, 2, "delta", F, dD),
                    dv(I, 2, "direction", E, dD),
                    du(I, dD));
                var dF = ((a) => ((a.Horizontal = "x"), (a.Vertical = "y"), a))(dF || {}),
                    dG = Object.values(dF),
                    dH = Object.create,
                    dI = Object.defineProperty,
                    dJ = Object.defineProperties,
                    dK = Object.getOwnPropertyDescriptor,
                    dL = Object.getOwnPropertyDescriptors,
                    dM = Object.getOwnPropertySymbols,
                    dN = Object.prototype.hasOwnProperty,
                    dO = Object.prototype.propertyIsEnumerable,
                    dP = (a, b) => ((b = Symbol[a]) ? b : Symbol.for("Symbol." + a)),
                    dQ = (a) => {
                        throw TypeError(a);
                    },
                    dR = (a, b, c) => (b in a ? dI(a, b, { enumerable: !0, configurable: !0, writable: !0, value: c }) : (a[b] = c)),
                    dS = (a, b) => {
                        for (var c in b || (b = {})) dN.call(b, c) && dR(a, c, b[c]);
                        if (dM) for (var c of dM(b)) dO.call(b, c) && dR(a, c, b[c]);
                        return a;
                    },
                    dT = (a, b) => dJ(a, dL(b)),
                    dU = (a, b) => dI(a, "name", { value: b, configurable: !0 }),
                    dV = (a, b) => {
                        var c = {};
                        for (var d in a) dN.call(a, d) && 0 > b.indexOf(d) && (c[d] = a[d]);
                        if (null != a && dM) for (var d of dM(a)) 0 > b.indexOf(d) && dO.call(a, d) && (c[d] = a[d]);
                        return c;
                    },
                    dW = (a) => {
                        var b;
                        return [, , , dH(null != (b = null == a ? void 0 : a[dP("metadata")]) ? b : null)];
                    },
                    dX = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"],
                    dY = (a) => (void 0 !== a && "function" != typeof a ? dQ("Function expected") : a),
                    dZ = (a, b, c, d, e) => ({ kind: dX[a], name: b, metadata: d, addInitializer: (a) => (c._ ? dQ("Already initialized") : e.push(dY(a || null))) }),
                    d$ = (a, b) => dR(b, dP("metadata"), a[3]),
                    d_ = (a, b, c, d) => {
                        for (var e = 0, f = a[b >> 1], g = f && f.length; e < g; e++) 1 & b ? f[e].call(c) : (d = f[e].call(c, d));
                        return d;
                    },
                    d0 = (a, b, c, d, e, f) => {
                        var g,
                            h,
                            i,
                            j,
                            k,
                            l = 7 & b,
                            m = !!(8 & b),
                            n = !!(16 & b),
                            o = l > 3 ? a.length + 1 : l ? (m ? 1 : 2) : 0,
                            p = dX[l + 5],
                            q = l > 3 && (a[o - 1] = []),
                            r = a[o] || (a[o] = []),
                            s =
                                l &&
                                (n || m || (e = e.prototype),
                                l < 5 &&
                                    (l > 3 || !n) &&
                                    dK(
                                        l < 4
                                            ? e
                                            : {
                                                  get [c]() {
                                                      return d3(this, f);
                                                  },
                                                  set [c](x) {
                                                      return d5(this, f, x);
                                                  },
                                              },
                                        c,
                                    ));
                        l ? n && l < 4 && dU(f, (l > 2 ? "set " : l > 1 ? "get " : "") + c) : dU(e, c);
                        for (var t = d.length - 1; t >= 0; t--)
                            ((j = dZ(l, c, (i = {}), a[3], r)),
                                l && ((j.static = m), (j.private = n), (k = j.access = { has: n ? (a) => d2(e, a) : (a) => c in a }), 3 ^ l && (k.get = n ? (a) => (1 ^ l ? d3 : d6)(a, e, 4 ^ l ? f : s.get) : (a) => a[c]), l > 2 && (k.set = n ? (a, b) => d5(a, e, b, 4 ^ l ? f : s.set) : (a, b) => (a[c] = b))),
                                (h = (0, d[t])(l ? (l < 4 ? (n ? f : s[p]) : l > 4 ? void 0 : { get: s.get, set: s.set }) : e, j)),
                                (i._ = 1),
                                4 ^ l || void 0 === h ? dY(h) && (l > 4 ? q.unshift(h) : l ? (n ? (f = h) : (s[p] = h)) : (e = h)) : "object" != typeof h || null === h ? dQ("Object expected") : (dY((g = h.get)) && (s.get = g), dY((g = h.set)) && (s.set = g), dY((g = h.init)) && q.unshift(g)));
                        return (l || d$(a, e), s && dI(e, c, s), n ? (4 ^ l ? f : s) : e);
                    },
                    d1 = (a, b, c) => b.has(a) || dQ("Cannot " + c),
                    d2 = (a, b) => (Object(b) !== b ? dQ('Cannot use the "in" operator on this value') : a.has(b)),
                    d3 = (a, b, c) => (d1(a, b, "read from private field"), c ? c.call(a) : b.get(a)),
                    d4 = (a, b, c) => (b.has(a) ? dQ("Cannot add the same private member more than once") : b instanceof WeakSet ? b.add(a) : b.set(a, c)),
                    d5 = (a, b, c, d) => (d1(a, b, "write to private field"), d ? d.call(a, c) : b.set(a, c), c),
                    d6 = (a, b, c) => (d1(a, b, "access private method"), c);
                function d7(a, b) {
                    return { plugin: a, options: b };
                }
                function d8(a) {
                    return (b) => d7(a, b);
                }
                function d9(a) {
                    return "function" == typeof a ? { plugin: a, options: void 0 } : a;
                }
                J = [c8];
                var ea = class {
                    constructor(a, b) {
                        ((this.manager = a), (this.options = b), d4(this, L, d_(K, 8, this, !1)), d_(K, 11, this), d4(this, M, new Set()));
                    }
                    enable() {
                        this.disabled = !1;
                    }
                    disable() {
                        this.disabled = !0;
                    }
                    isDisabled() {
                        return cr(() => this.disabled);
                    }
                    configure(a) {
                        this.options = a;
                    }
                    registerEffect(a) {
                        let b = cJ(a.bind(this));
                        return (d3(this, M).add(b), b);
                    }
                    destroy() {
                        d3(this, M).forEach((a) => a());
                    }
                    static configure(a) {
                        return d7(this, a);
                    }
                };
                ((K = dW(null)), (L = new WeakMap()), (M = new WeakMap()), d0(K, 4, "disabled", J, ea, L), d$(K, ea));
                var eb = class extends ea {},
                    ec = class {
                        constructor(a) {
                            ((this.manager = a), (this.instances = new Map()), d4(this, N, []));
                        }
                        get values() {
                            return Array.from(this.instances.values());
                        }
                        set values(a) {
                            let b = a.map(d9).reduce((a, b) => {
                                    let c = a.find(({ plugin: a }) => a === b.plugin);
                                    return c ? ((c.options = b.options), a) : [...a, b];
                                }, []),
                                c = b.map(({ plugin: a }) => a);
                            for (let a of d3(this, N))
                                if (!c.includes(a)) {
                                    if (a.prototype instanceof eb) continue;
                                    this.unregister(a);
                                }
                            for (let { plugin: a, options: c } of b) this.register(a, c);
                            d5(this, N, c);
                        }
                        get(a) {
                            return this.instances.get(a);
                        }
                        register(a, b) {
                            let c = this.instances.get(a);
                            if (c) return (c.options !== b && (c.options = b), c);
                            let d = new a(this.manager, b);
                            return (this.instances.set(a, d), d);
                        }
                        unregister(a) {
                            let b = this.instances.get(a);
                            b && (b.destroy(), this.instances.delete(a));
                        }
                        destroy() {
                            for (let a of this.instances.values()) a.destroy();
                            this.instances.clear();
                        }
                    };
                function ed(a, b) {
                    return a.priority === b.priority ? (a.type === b.type ? b.value - a.value : b.type - a.type) : b.priority - a.priority;
                }
                N = new WeakMap();
                var ee = [],
                    ef = class extends ea {
                        constructor(a) {
                            (super(a),
                                d4(this, O),
                                d4(this, P),
                                (this.computeCollisions = this.computeCollisions.bind(this)),
                                d5(this, P, cA(ee)),
                                (this.destroy = db(
                                    () => {
                                        let a = this.computeCollisions(),
                                            b = cr(() => this.manager.dragOperation.position.current);
                                        if (a !== ee) {
                                            let a = d3(this, O);
                                            if ((d5(this, O, b), a && b.x == a.x && b.y == a.y)) return;
                                        } else d5(this, O, void 0);
                                        d3(this, P).value = a;
                                    },
                                    () => {
                                        let { dragOperation: a } = this.manager;
                                        a.status.initialized && this.forceUpdate();
                                    },
                                )));
                        }
                        forceUpdate(a = !0) {
                            cr(() => {
                                a ? (d3(this, P).value = this.computeCollisions()) : d5(this, O, void 0);
                            });
                        }
                        computeCollisions(a, b) {
                            let { registry: c, dragOperation: d } = this.manager,
                                { source: e, shape: f, status: g } = d;
                            if (!g.initialized || !f) return ee;
                            let h = [],
                                i = [];
                            for (let f of null != a ? a : c.droppables) {
                                if (f.disabled || (e && !f.accepts(e))) continue;
                                let a = null != b ? b : f.collisionDetector;
                                if (!a) continue;
                                (i.push(f), f.shape);
                                let c = cr(() => a({ droppable: f, dragOperation: d }));
                                c && (null != f.collisionPriority && (c.priority = f.collisionPriority), h.push(c));
                            }
                            return 0 === i.length ? ee : (h.sort(ed), h);
                        }
                        get collisions() {
                            return d3(this, P).value;
                        }
                    };
                ((O = new WeakMap()), (P = new WeakMap()), (S = [c8]), (R = [c8]), (Q = [c8]));
                var eg = class a {
                    constructor(a, b) {
                        (d4(this, W, d_(V, 8, this)), d_(V, 11, this), d4(this, X), d4(this, Y, d_(V, 12, this)), d_(V, 15, this), d4(this, Z, d_(V, 16, this)), d_(V, 19, this));
                        let { effects: c, id: d, data: e = {}, disabled: f = !1, register: g = !0 } = a,
                            h = d;
                        (d5(this, X, cA(d)),
                            (this.manager = b),
                            (this.data = e),
                            (this.disabled = f),
                            (this.effects = () => {
                                var a;
                                return [
                                    () => {
                                        let { id: a, manager: b } = this;
                                        if (a !== h) return ((h = a), null == b || b.registry.register(this), () => (null == b ? void 0 : b.registry.unregister(this)));
                                    },
                                    ...(null != (a = null == c ? void 0 : c()) ? a : []),
                                ];
                            }),
                            (this.register = this.register.bind(this)),
                            (this.unregister = this.unregister.bind(this)),
                            (this.destroy = this.destroy.bind(this)),
                            b && g && queueMicrotask(this.register));
                    }
                    get id() {
                        var b, c;
                        let d = d3(this, X).value;
                        return null != (c = null == (b = a.pendingIdChanges) ? void 0 : b.get(this)) ? c : d;
                    }
                    set id(b) {
                        var c, d;
                        b !== (null != (d = null == (c = a.pendingIdChanges) ? void 0 : c.get(this)) ? d : d3(this, X).peek()) && (a.pendingIdChanges || ((a.pendingIdChanges = new Map()), queueMicrotask(() => d6(a, T, U).call(a))), a.pendingIdChanges.set(this, b));
                    }
                    register() {
                        var a;
                        return null == (a = this.manager) ? void 0 : a.registry.register(this);
                    }
                    unregister() {
                        var a;
                        null == (a = this.manager) || a.registry.unregister(this);
                    }
                    destroy() {
                        var a;
                        null == (a = this.manager) || a.registry.unregister(this);
                    }
                };
                ((V = dW(null)),
                    (T = new WeakSet()),
                    (U = function () {
                        let a = eg.pendingIdChanges;
                        ((eg.pendingIdChanges = null),
                            a &&
                                cq(() => {
                                    for (let [b, c] of a) d3(b, X).value = c;
                                }));
                    }),
                    (W = new WeakMap()),
                    (X = new WeakMap()),
                    (Y = new WeakMap()),
                    (Z = new WeakMap()),
                    d0(V, 4, "manager", S, eg, W),
                    d0(V, 4, "data", R, eg, Y),
                    d0(V, 4, "disabled", Q, eg, Z),
                    d4(eg, T),
                    d$(V, eg),
                    (eg.pendingIdChanges = null));
                var eh = eg,
                    ei = class {
                        constructor() {
                            ((this.map = cA(new Map())),
                                (this.cleanupFunctions = new WeakMap()),
                                (this.register = (a, b) => {
                                    let c = this.map.peek(),
                                        d = c.get(a),
                                        e = () => this.unregister(a, b);
                                    if (d === b) return e;
                                    if (d && d.id === a) {
                                        let a = this.cleanupFunctions.get(d);
                                        (null == a || a(), this.cleanupFunctions.delete(d));
                                    }
                                    let f = new Map(c);
                                    for (let [d, e] of c)
                                        if (e === b && d !== a) {
                                            f.delete(d);
                                            break;
                                        }
                                    (f.set(a, b), (this.map.value = f));
                                    let g = db(...b.effects());
                                    return (this.cleanupFunctions.set(b, g), e);
                                }),
                                (this.unregister = (a, b) => {
                                    let c = this.map.peek();
                                    if (c.get(a) !== b) return;
                                    let d = this.cleanupFunctions.get(b);
                                    (null == d || d(), this.cleanupFunctions.delete(b));
                                    let e = new Map(c);
                                    (e.delete(a), (this.map.value = e));
                                }));
                        }
                        [Symbol.iterator]() {
                            return this.map.peek().values();
                        }
                        get value() {
                            return this.map.value.values();
                        }
                        has(a) {
                            return this.map.value.has(a);
                        }
                        get(a) {
                            return this.map.value.get(a);
                        }
                        destroy() {
                            for (let a of this) {
                                let b = this.cleanupFunctions.get(a);
                                (null == b || b(), a.destroy());
                            }
                            this.map.value = new Map();
                        }
                    },
                    ej = class extends ((ae = eh), (ad = [c8]), (ac = [c8]), (ab = [c8]), (aa = [c9]), (_ = [c9]), ($ = [c9]), ae) {
                        constructor(a, b) {
                            var { modifiers: c, type: d, sensors: e, plugins: f, effects: g } = a,
                                h = dV(a, ["modifiers", "type", "sensors", "plugins", "effects"]);
                            (super(
                                dT(dS({}, h), {
                                    effects: () => {
                                        var a;
                                        return [
                                            ...(null != (a = null == g ? void 0 : g()) ? a : []),
                                            () => {
                                                let { manager: a, plugins: b } = this;
                                                if (a && b)
                                                    for (let c of b) {
                                                        let { plugin: b } = d9(c);
                                                        a.registry.plugins.register(b);
                                                    }
                                            },
                                        ];
                                    },
                                }),
                                b,
                            ),
                                d_(af, 5, this),
                                d4(this, ag, d_(af, 8, this)),
                                d_(af, 11, this),
                                d4(this, ah, d_(af, 12, this)),
                                d_(af, 15, this),
                                d4(this, ai, d_(af, 16, this, this.isDragSource ? "dragging" : "idle")),
                                d_(af, 19, this),
                                (this.type = d),
                                (this.sensors = e),
                                (this.modifiers = c),
                                (this.alignment = h.alignment),
                                (this.plugins = f));
                        }
                        pluginConfig(a) {
                            if (this.plugins)
                                for (let b of this.plugins) {
                                    let c = d9(b);
                                    if (c.plugin === a) return c.options;
                                }
                        }
                        get isDropping() {
                            return "dropping" === this.status && this.isDragSource;
                        }
                        get isDragging() {
                            return "dragging" === this.status && this.isDragSource;
                        }
                        get isDragSource() {
                            var a, b;
                            return (null == (b = null == (a = this.manager) ? void 0 : a.dragOperation.source) ? void 0 : b.id) === this.id;
                        }
                    };
                ((af = dW(ae)), (ag = new WeakMap()), (ah = new WeakMap()), (ai = new WeakMap()), d0(af, 4, "type", ad, ej, ag), d0(af, 4, "modifiers", ac, ej, ah), d0(af, 4, "status", ab, ej, ai), d0(af, 2, "isDropping", aa, ej), d0(af, 2, "isDragging", _, ej), d0(af, 2, "isDragSource", $, ej), d$(af, ej));
                var ek = class extends ((ap = eh), (ao = [c8]), (an = [c8]), (am = [c8]), (al = [c8]), (ak = [c8]), (aj = [c9]), ap) {
                    constructor(a, b) {
                        var { accept: c, collisionDetector: d, collisionPriority: e, type: f } = a;
                        (super(dV(a, ["accept", "collisionDetector", "collisionPriority", "type"]), b), d_(aq, 5, this), d4(this, ar, d_(aq, 8, this)), d_(aq, 11, this), d4(this, as, d_(aq, 12, this)), d_(aq, 15, this), d4(this, at, d_(aq, 16, this)), d_(aq, 19, this), d4(this, au, d_(aq, 20, this)), d_(aq, 23, this), d4(this, av, d_(aq, 24, this)), d_(aq, 27, this), (this.accept = c), (this.collisionDetector = d), (this.collisionPriority = e), (this.type = f));
                    }
                    accepts(a) {
                        let { accept: b } = this;
                        return !b || ("function" == typeof b ? b(a) : !!a.type && (Array.isArray(b) ? b.includes(a.type) : a.type === b));
                    }
                    get isDropTarget() {
                        var a, b;
                        return (null == (b = null == (a = this.manager) ? void 0 : a.dragOperation.target) ? void 0 : b.id) === this.id;
                    }
                };
                ((aq = dW(ap)), (ar = new WeakMap()), (as = new WeakMap()), (at = new WeakMap()), (au = new WeakMap()), (av = new WeakMap()), d0(aq, 4, "accept", ao, ek, ar), d0(aq, 4, "type", an, ek, as), d0(aq, 4, "collisionDetector", am, ek, at), d0(aq, 4, "collisionPriority", al, ek, au), d0(aq, 4, "shape", ak, ek, av), d0(aq, 2, "isDropTarget", aj, ek), d$(aq, ek));
                var el = class {
                        constructor() {
                            this.registry = new Map();
                        }
                        addEventListener(a, b) {
                            let { registry: c } = this,
                                d = new Set(c.get(a));
                            return (d.add(b), c.set(a, d), () => this.removeEventListener(a, b));
                        }
                        removeEventListener(a, b) {
                            let { registry: c } = this,
                                d = new Set(c.get(a));
                            (d.delete(b), c.set(a, d));
                        }
                        dispatch(a, ...b) {
                            let { registry: c } = this,
                                d = c.get(a);
                            if (d) for (let a of d) a(...b);
                        }
                    },
                    em = class extends el {
                        constructor(a) {
                            (super(), (this.manager = a));
                        }
                        dispatch(a, b) {
                            let c = [b, this.manager];
                            super.dispatch(a, ...c);
                        }
                    };
                function en(a, b = !0) {
                    let c = !1;
                    return dT(dS({}, a), {
                        cancelable: b,
                        get defaultPrevented() {
                            return c;
                        },
                        preventDefault() {
                            b && (c = !0);
                        },
                    });
                }
                var eo = class extends eb {
                        constructor(a) {
                            super(a);
                            let b = [];
                            this.destroy = db(
                                () => {
                                    let { dragOperation: c, collisionObserver: d } = a;
                                    c.status.initializing && ((b = []), d.enable());
                                },
                                () => {
                                    let c,
                                        { collisionObserver: d, monitor: e } = a,
                                        { collisions: f } = d;
                                    if (d.isDisabled() || eh.pendingIdChanges) return;
                                    let g = en({ collisions: f });
                                    if ((e.dispatch("collision", g), g.defaultPrevented || ((c = b), f.map(({ id: a }) => a).join("") === c.map(({ id: a }) => a).join("")))) return;
                                    b = f;
                                    let [h] = f;
                                    cr(() => {
                                        var b;
                                        (null == h ? void 0 : h.id) !== (null == (b = a.dragOperation.target) ? void 0 : b.id) &&
                                            (d.disable(),
                                            a.actions.setDropTarget(null == h ? void 0 : h.id).then(() => {
                                                d.enable();
                                            }));
                                    });
                                },
                            );
                        }
                    },
                    ep = ((a) => ((a[(a.Lowest = 0)] = "Lowest"), (a[(a.Low = 1)] = "Low"), (a[(a.Normal = 2)] = "Normal"), (a[(a.High = 3)] = "High"), (a[(a.Highest = 4)] = "Highest"), a))(ep || {}),
                    eq = ((a) => ((a[(a.Collision = 0)] = "Collision"), (a[(a.ShapeIntersection = 1)] = "ShapeIntersection"), (a[(a.PointerIntersection = 2)] = "PointerIntersection"), a))(eq || {});
                ((aC = [c8]), (aB = [c9]), (aA = [c9]), (az = [c9]), (ay = [c9]), (ax = [c9]), (aw = [c9]));
                var er = class {
                    constructor() {
                        (d_(aD, 5, this), d4(this, aE, d_(aD, 8, this, "idle")), d_(aD, 11, this));
                    }
                    get current() {
                        return this.value;
                    }
                    get idle() {
                        return "idle" === this.value;
                    }
                    get initializing() {
                        return "initializing" === this.value;
                    }
                    get initialized() {
                        let { value: a } = this;
                        return "idle" !== a && "initialization-pending" !== a;
                    }
                    get dragging() {
                        return "dragging" === this.value;
                    }
                    get dropped() {
                        return "dropped" === this.value;
                    }
                    set(a) {
                        this.value = a;
                    }
                };
                ((aD = dW(null)), (aE = new WeakMap()), d0(aD, 4, "value", aC, er, aE), d0(aD, 2, "current", aB, er), d0(aD, 2, "idle", aA, er), d0(aD, 2, "initializing", az, er), d0(aD, 2, "initialized", ay, er), d0(aD, 2, "dragging", ax, er), d0(aD, 2, "dropped", aw, er), d$(aD, er));
                var es = class {
                        constructor(a) {
                            this.manager = a;
                        }
                        setDragSource(a) {
                            let { dragOperation: b } = this.manager;
                            b.sourceIdentifier = "string" == typeof a || "number" == typeof a ? a : a.id;
                        }
                        setDropTarget(a) {
                            return cr(() => {
                                let { dragOperation: b } = this.manager,
                                    c = null != a ? a : null;
                                if (b.targetIdentifier === c) return Promise.resolve(!1);
                                b.targetIdentifier = c;
                                let d = en({ operation: b.snapshot() });
                                return (b.status.dragging && this.manager.monitor.dispatch("dragover", d), this.manager.renderer.rendering.then(() => d.defaultPrevented));
                            });
                        }
                        start(a) {
                            return cr(() => {
                                let { dragOperation: b } = this.manager;
                                if ((null != a.source && this.setDragSource(a.source), !b.source)) throw Error("Cannot start a drag operation without a drag source");
                                if (!b.status.idle) throw Error("Cannot start a drag operation while another is active");
                                let c = new AbortController(),
                                    { event: d, coordinates: e } = a;
                                cq(() => {
                                    (b.status.set("initialization-pending"), (b.shape = null), (b.canceled = !1), (b.activatorEvent = null != d ? d : null), b.position.reset(e));
                                });
                                let f = en({ operation: b.snapshot() });
                                return (
                                    (this.manager.monitor.dispatch("beforedragstart", f), f.defaultPrevented)
                                        ? (b.reset(), c.abort())
                                        : (b.status.set("initializing"),
                                          (b.controller = c),
                                          this.manager.renderer.rendering.then(() => {
                                              if (c.signal.aborted) return;
                                              let { status: a } = b;
                                              "initializing" === a.current &&
                                                  cq(() => {
                                                      (b.status.set("dragging"), this.manager.monitor.dispatch("dragstart", { nativeEvent: d, operation: b.snapshot(), cancelable: !1 }));
                                                  });
                                          })),
                                    c
                                );
                            });
                        }
                        move(a) {
                            return cr(() => {
                                var b, c;
                                let { dragOperation: d } = this.manager,
                                    { status: e, controller: f } = d;
                                if (!e.dragging || !f || f.signal.aborted) return;
                                let g = en({ nativeEvent: a.event, operation: d.snapshot(), by: a.by, to: a.to }, null == (b = a.cancelable) || b);
                                ((null == (c = a.propagate) || c) && this.manager.monitor.dispatch("dragmove", g),
                                    queueMicrotask(() => {
                                        var b, c, e, f, h;
                                        if (g.defaultPrevented) return;
                                        let i = null != (h = a.to) ? h : { x: d.position.current.x + (null != (c = null == (b = a.by) ? void 0 : b.x) ? c : 0), y: d.position.current.y + (null != (f = null == (e = a.by) ? void 0 : e.y) ? f : 0) };
                                        d.position.current = i;
                                    }));
                            });
                        }
                        stop(a = {}) {
                            return cr(() => {
                                var b, c;
                                let d,
                                    { dragOperation: e } = this.manager,
                                    { controller: f } = e;
                                if (!f || f.signal.aborted) return;
                                f.abort();
                                let g = () => {
                                    this.manager.renderer.rendering.then(() => {
                                        e.status.set("dropped");
                                        let a = cr(() => {
                                                var a;
                                                return (null == (a = e.source) ? void 0 : a.status) === "dropping";
                                            }),
                                            b = () => {
                                                (e.controller === f && (e.controller = void 0), e.reset());
                                            };
                                        if (a) {
                                            let { source: a } = e,
                                                c = cJ(() => {
                                                    (null == a ? void 0 : a.status) === "idle" && (c(), b());
                                                });
                                        } else this.manager.renderer.rendering.then(b);
                                    });
                                };
                                ((e.canceled = null != (b = a.canceled) && b),
                                    this.manager.monitor.dispatch("dragend", {
                                        nativeEvent: a.event,
                                        operation: e.snapshot(),
                                        canceled: null != (c = a.canceled) && c,
                                        suspend: () => {
                                            let a = { resume: () => {}, abort: () => {} };
                                            return (
                                                (d = new Promise((b, c) => {
                                                    ((a.resume = b), (a.abort = c));
                                                })),
                                                a
                                            );
                                        },
                                    }),
                                    d ? d.then(g).catch(() => e.reset()) : g());
                            });
                        }
                    },
                    et = class extends ea {
                        constructor(a, b) {
                            (super(a, b), (this.manager = a), (this.options = b));
                        }
                    },
                    eu = class extends AbortController {
                        constructor(a, b) {
                            for (let c of (super(), (this.constraints = a), (this.onActivate = b), (this.activated = !1), null != a ? a : [])) c.controller = this;
                        }
                        onEvent(a) {
                            var b;
                            if (!this.activated)
                                if (null == (b = this.constraints) ? void 0 : b.length) for (let b of this.constraints) b.onEvent(a);
                                else this.activate(a);
                        }
                        activate(a) {
                            this.activated || ((this.activated = !0), this.onActivate(a));
                        }
                        abort(a) {
                            ((this.activated = !1), super.abort(a));
                        }
                    },
                    ev = class {
                        constructor(a) {
                            ((this.options = a), d4(this, aF));
                        }
                        set controller(a) {
                            (d5(this, aF, a), a.signal.addEventListener("abort", () => this.abort()));
                        }
                        activate(a) {
                            var b;
                            null == (b = d3(this, aF)) || b.activate(a);
                        }
                    };
                aF = new WeakMap();
                var ew = class extends ea {
                        constructor(a, b) {
                            (super(a, b), (this.manager = a), (this.options = b));
                        }
                        apply(a) {
                            return a.transform;
                        }
                    },
                    ex = class {
                        constructor(a) {
                            ((this.draggables = new ei()), (this.droppables = new ei()), (this.plugins = new ec(a)), (this.sensors = new ec(a)), (this.modifiers = new ec(a)));
                        }
                        register(a, b) {
                            if (a instanceof ej) return this.draggables.register(a.id, a);
                            if (a instanceof ek) return this.droppables.register(a.id, a);
                            if (a.prototype instanceof ew) return this.modifiers.register(a, b);
                            if (a.prototype instanceof et) return this.sensors.register(a, b);
                            if (a.prototype instanceof ea) return this.plugins.register(a, b);
                            throw Error("Invalid instance type");
                        }
                        unregister(a) {
                            if (a instanceof eh) return a instanceof ej ? this.draggables.unregister(a.id, a) : a instanceof ek ? this.droppables.unregister(a.id, a) : () => {};
                            if (a.prototype instanceof ew) return this.modifiers.unregister(a);
                            if (a.prototype instanceof et) return this.sensors.unregister(a);
                            if (a.prototype instanceof ea) return this.plugins.unregister(a);
                            throw Error("Invalid instance type");
                        }
                        destroy() {
                            (this.draggables.destroy(), this.droppables.destroy(), this.plugins.destroy(), this.sensors.destroy(), this.modifiers.destroy());
                        }
                    };
                ((aO = [c9]), (aN = [c8]), (aM = [c8]), (aL = [c8]), (aK = [c8]), (aJ = [c8]), (aI = [c9]), (aH = [c9]), (aG = [c9]));
                var ey = class {
                    constructor(a) {
                        (d_(aS, 5, this),
                            d4(this, aP),
                            d4(this, aQ),
                            d4(this, aR, new dc(void 0, (a, b) => (a && b ? a.equals(b) : a === b))),
                            (this.status = new er()),
                            d4(this, aT, d_(aS, 8, this, !1)),
                            d_(aS, 11, this),
                            d4(this, aU, d_(aS, 12, this, null)),
                            d_(aS, 15, this),
                            d4(this, aV, d_(aS, 16, this, null)),
                            d_(aS, 19, this),
                            d4(this, aW, d_(aS, 20, this, null)),
                            d_(aS, 23, this),
                            d4(this, aX, d_(aS, 24, this, [])),
                            d_(aS, 27, this),
                            (this.position = new dD({ x: 0, y: 0 })),
                            d4(this, aY, { x: 0, y: 0 }),
                            d5(this, aP, a));
                    }
                    get shape() {
                        let { current: a, initial: b, previous: c } = d3(this, aR);
                        return a && b ? { current: a, initial: b, previous: c } : null;
                    }
                    set shape(a) {
                        a ? (d3(this, aR).current = a) : d3(this, aR).reset();
                    }
                    get source() {
                        var a;
                        let b = this.sourceIdentifier;
                        if (null == b) return null;
                        let c = d3(this, aP).registry.draggables.get(b);
                        return (c && d5(this, aQ, c), null != (a = null != c ? c : d3(this, aQ)) ? a : null);
                    }
                    get target() {
                        var a;
                        let b = this.targetIdentifier;
                        return null != b && null != (a = d3(this, aP).registry.droppables.get(b)) ? a : null;
                    }
                    get transform() {
                        let { x: a, y: b } = this.position.delta,
                            c = { x: a, y: b };
                        for (let a of this.modifiers) c = a.apply(dT(dS({}, this.snapshot()), { transform: c }));
                        return (d5(this, aY, c), c);
                    }
                    snapshot() {
                        return cr(() => ({ source: this.source, target: this.target, activatorEvent: this.activatorEvent, transform: d3(this, aY), shape: this.shape ? dd(this.shape) : null, position: dd(this.position), status: dd(this.status), canceled: this.canceled }));
                    }
                    reset() {
                        cq(() => {
                            (this.status.set("idle"), (this.sourceIdentifier = null), (this.targetIdentifier = null), d3(this, aR).reset(), this.position.reset({ x: 0, y: 0 }), d5(this, aY, { x: 0, y: 0 }), (this.modifiers = []));
                        });
                    }
                };
                ((aS = dW(null)),
                    (aP = new WeakMap()),
                    (aQ = new WeakMap()),
                    (aR = new WeakMap()),
                    (aT = new WeakMap()),
                    (aU = new WeakMap()),
                    (aV = new WeakMap()),
                    (aW = new WeakMap()),
                    (aX = new WeakMap()),
                    (aY = new WeakMap()),
                    d0(aS, 2, "shape", aO, ey),
                    d0(aS, 4, "canceled", aN, ey, aT),
                    d0(aS, 4, "activatorEvent", aM, ey, aU),
                    d0(aS, 4, "sourceIdentifier", aL, ey, aV),
                    d0(aS, 4, "targetIdentifier", aK, ey, aW),
                    d0(aS, 4, "modifiers", aJ, ey, aX),
                    d0(aS, 2, "source", aI, ey),
                    d0(aS, 2, "target", aH, ey),
                    d0(aS, 2, "transform", aG, ey),
                    d$(aS, ey));
                var ez = {
                    get rendering() {
                        return Promise.resolve();
                    },
                };
                function eA(a, b) {
                    return "function" == typeof a ? a(b) : null != a ? a : b;
                }
                var eB = class {
                        constructor(a) {
                            var b;
                            this.destroy = () => {
                                (this.dragOperation.status.idle || this.actions.stop({ canceled: !0 }), this.dragOperation.modifiers.forEach((a) => a.destroy()), this.registry.destroy(), this.collisionObserver.destroy());
                            };
                            let c = null != a ? a : {},
                                d = eA(c.plugins, []),
                                e = eA(c.sensors, []),
                                f = eA(c.modifiers, []),
                                g = null != (b = c.renderer) ? b : ez,
                                h = new em(this),
                                i = new ex(this);
                            ((this.registry = i), (this.monitor = h), (this.renderer = g), (this.actions = new es(this)), (this.dragOperation = new ey(this)), (this.collisionObserver = new ef(this)), (this.plugins = [eo, ...d]), (this.modifiers = f), (this.sensors = e));
                            let { destroy: j } = this,
                                k = db(() => {
                                    var a, b, c;
                                    let d = cr(() => this.dragOperation.modifiers),
                                        e = this.modifiers;
                                    for (let a of d) e.includes(a) || a.destroy();
                                    this.dragOperation.modifiers =
                                        null !=
                                        (c =
                                            null == (b = null == (a = this.dragOperation.source) ? void 0 : a.modifiers)
                                                ? void 0
                                                : b.map((a) => {
                                                      let { plugin: b, options: c } = d9(a);
                                                      return new b(this, c);
                                                  }))
                                            ? c
                                            : e;
                                });
                            this.destroy = () => {
                                (k(), j());
                            };
                        }
                        get plugins() {
                            return this.registry.plugins.values;
                        }
                        set plugins(a) {
                            this.registry.plugins.values = a;
                        }
                        get modifiers() {
                            return this.registry.modifiers.values;
                        }
                        set modifiers(a) {
                            this.registry.modifiers.values = a;
                        }
                        get sensors() {
                            return this.registry.sensors.values;
                        }
                        set sensors(a) {
                            this.registry.sensors.values = a;
                        }
                    },
                    eC = (a) => {
                        throw TypeError(a);
                    },
                    eD = (a, b, c) => b.has(a) || eC("Cannot " + c),
                    eE = (a, b, c) => (eD(a, b, "read from private field"), b.get(a)),
                    eF = (a, b, c) => (b.has(a) ? eC("Cannot add the same private member more than once") : b instanceof WeakSet ? b.add(a) : b.set(a, c)),
                    eG = (a, b, c, d) => (eD(a, b, "write to private field"), b.set(a, c), c),
                    eH = (a, b, c) => (eD(a, b, "access private method"), c);
                function eI(a) {
                    return !!a && (a instanceof KeyframeEffect || ("getKeyframes" in a && "function" == typeof a.getKeyframes));
                }
                function eJ(a, b) {
                    let c = a.getAnimations(),
                        d = null;
                    for (let a of c) {
                        if ("running" !== a.playState) continue;
                        let { effect: c } = a,
                            e = (eI(c) ? c.getKeyframes() : []).filter(b);
                        e.length > 0 && (d = [e[e.length - 1], a]);
                    }
                    return d;
                }
                function eK(a) {
                    let { width: b, height: c, top: d, left: e, bottom: f, right: g } = a.getBoundingClientRect();
                    return { width: b, height: c, top: d, left: e, bottom: f, right: g };
                }
                function eL(a) {
                    let b = Object.prototype.toString.call(a);
                    return "[object Window]" === b || "[object global]" === b;
                }
                function eM(a) {
                    return "nodeType" in a;
                }
                function eN(a) {
                    var b, c, d;
                    return a ? (eL(a) ? a : eM(a) ? ("defaultView" in a ? (null != (b = a.defaultView) ? b : window) : null != (d = null == (c = a.ownerDocument) ? void 0 : c.defaultView) ? d : window) : window) : window;
                }
                function eO(a) {
                    let { Document: b } = eN(a);
                    return a instanceof b || ("nodeType" in a && a.nodeType === Node.DOCUMENT_NODE);
                }
                function eP(a) {
                    return !(!a || eL(a)) && (a instanceof eN(a).HTMLElement || ("namespaceURI" in a && "string" == typeof a.namespaceURI && a.namespaceURI.endsWith("html")));
                }
                function eQ(a) {
                    return a instanceof eN(a).SVGElement || ("namespaceURI" in a && "string" == typeof a.namespaceURI && a.namespaceURI.endsWith("svg"));
                }
                function eR(a) {
                    return a ? (eL(a) ? a.document : eM(a) ? (eO(a) ? a : eP(a) || eQ(a) ? a.ownerDocument : document) : document) : document;
                }
                function eS(a, b = a.getBoundingClientRect(), c = 0) {
                    var d, e, f, g, h;
                    let i = b,
                        { ownerDocument: j } = a,
                        k = null != (d = j.defaultView) ? d : window,
                        l = a.parentElement;
                    for (; l && l !== j.documentElement;) {
                        if (
                            !(function (a, b) {
                                if ("DETAILS" === a.tagName && !1 === a.open) return !1;
                                let { overflow: c, overflowX: d, overflowY: e } = getComputedStyle(a);
                                return "visible" === c && "visible" === d && "visible" === e;
                            })(l)
                        ) {
                            let a = l.getBoundingClientRect(),
                                b = c * (a.bottom - a.top),
                                d = c * (a.right - a.left),
                                e = c * (a.bottom - a.top),
                                f = c * (a.right - a.left);
                            (((i = { top: Math.max(i.top, a.top - b), right: Math.min(i.right, a.right + d), bottom: Math.min(i.bottom, a.bottom + e), left: Math.max(i.left, a.left - f), width: 0, height: 0 }).width = i.right - i.left), (i.height = i.bottom - i.top));
                        }
                        l = l.parentElement;
                    }
                    let m = k.visualViewport,
                        n = null != (e = null == m ? void 0 : m.offsetTop) ? e : 0,
                        o = null != (f = null == m ? void 0 : m.offsetLeft) ? f : 0,
                        p = null != (g = null == m ? void 0 : m.width) ? g : k.innerWidth,
                        q = null != (h = null == m ? void 0 : m.height) ? h : k.innerHeight,
                        r = c * q,
                        s = c * p;
                    return (((i = { top: Math.max(i.top, n - r), right: Math.min(i.right, o + p + s), bottom: Math.min(i.bottom, n + q + r), left: Math.max(i.left, o - s), width: 0, height: 0 }).width = i.right - i.left), (i.height = i.bottom - i.top), i.width < 0 && (i.width = 0), i.height < 0 && (i.height = 0), i);
                }
                function eT(a) {
                    return { x: a.clientX, y: a.clientY };
                }
                var eU = "undefined" != typeof window && void 0 !== window.document && void 0 !== window.document.createElement;
                function eV() {
                    return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
                }
                function eW() {
                    var a, b;
                    let c = eV() ? window.visualViewport : null;
                    return { x: null != (a = null == c ? void 0 : c.offsetLeft) ? a : 0, y: null != (b = null == c ? void 0 : c.offsetTop) ? b : 0 };
                }
                function eX(a) {
                    return !!a && !!eM(a) && a instanceof eN(a).ShadowRoot;
                }
                function eY(a) {
                    if (a && eM(a)) {
                        let b = a.getRootNode();
                        if (eX(b) || b instanceof Document) return b;
                    }
                    return eR(a);
                }
                function eZ(a) {
                    return a.matchMedia("(prefers-reduced-motion: reduce)").matches;
                }
                function e$(a) {
                    return "value" in a;
                }
                function e_(a) {
                    return "CANVAS" === a.tagName;
                }
                var e0 = new WeakMap(),
                    e1 = class {
                        constructor() {
                            ((this.entries = new Set()),
                                (this.clear = () => {
                                    for (let a of this.entries) {
                                        let [b, { type: c, listener: d, options: e }] = a;
                                        b.removeEventListener(c, d, e);
                                    }
                                    this.entries.clear();
                                }));
                        }
                        bind(a, b) {
                            let c = Array.isArray(a) ? a : [a],
                                d = Array.isArray(b) ? b : [b],
                                e = [];
                            for (let a of c)
                                for (let b of d) {
                                    let { type: c, listener: d, options: f } = b,
                                        g = [a, b];
                                    (a.addEventListener(c, d, f), this.entries.add(g), e.push(g));
                                }
                            let f = this.entries;
                            return function () {
                                for (let a of e) {
                                    let [b, { type: c, listener: d, options: e }] = a;
                                    (b.removeEventListener(c, d, e), f.delete(a));
                                }
                            };
                        }
                    };
                function e2(a) {
                    let b = null == a ? void 0 : a.ownerDocument.defaultView;
                    if (b && b.self !== b.parent) return b.frameElement;
                }
                function e3(a, b) {
                    let c,
                        d,
                        e = () => performance.now();
                    return function (...f) {
                        let g = this;
                        d
                            ? (null == c || c(),
                              (c = (function (a, b) {
                                  let c = setTimeout(a, b);
                                  return () => clearTimeout(c);
                              })(
                                  () => {
                                      (a.apply(g, f), (d = e()));
                                  },
                                  b - (e() - d),
                              )))
                            : (a.apply(g, f), (d = e()));
                    };
                }
                var e4 = eU
                        ? ResizeObserver
                        : class {
                              observe() {}
                              unobserve() {}
                              disconnect() {}
                          },
                    e5 = class extends e4 {
                        constructor(a) {
                            (super((b) => {
                                if (!eE(this, aZ)) return void eG(this, aZ, !0);
                                a(b, this);
                            }),
                                eF(this, aZ, !1));
                        }
                    };
                aZ = new WeakMap();
                var e6 = Array.from({ length: 100 }, (a, b) => b / 100),
                    e7 = class {
                        constructor(a, b, c = { debug: !1, skipInitial: !1 }) {
                            ((this.element = a),
                                (this.callback = b),
                                eF(this, a6),
                                (this.disconnect = () => {
                                    var a, b, c;
                                    (eG(this, a4, !0), null == (a = eE(this, a0)) || a.disconnect(), null == (b = eE(this, a1)) || b.disconnect(), eE(this, a2).disconnect(), null == (c = eE(this, a3)) || c.remove());
                                }),
                                eF(this, a$, !0),
                                eF(this, a_),
                                eF(this, a0),
                                eF(this, a1),
                                eF(this, a2),
                                eF(this, a3),
                                eF(this, a4, !1),
                                eF(
                                    this,
                                    a5,
                                    e3(() => {
                                        var a, b, c;
                                        let { element: d } = this;
                                        if ((null == (a = eE(this, a1)) || a.disconnect(), eE(this, a4) || !eE(this, a$) || !d.isConnected)) return;
                                        let e = null != (b = d.ownerDocument) ? b : document,
                                            { innerHeight: f, innerWidth: g } = null != (c = e.defaultView) ? c : window,
                                            h = d.getBoundingClientRect(),
                                            { top: i, left: j, bottom: k, right: l } = eS(d, h),
                                            m = -Math.floor(i),
                                            n = -Math.floor(j),
                                            o = -Math.floor(g - l),
                                            p = -Math.floor(f - k),
                                            q = `${m}px ${o}px ${p}px ${n}px`;
                                        ((this.boundingClientRect = h),
                                            eG(
                                                this,
                                                a1,
                                                new IntersectionObserver(
                                                    (a) => {
                                                        let [b] = a,
                                                            { intersectionRect: c } = b;
                                                        1 !== (1 !== b.intersectionRatio ? b.intersectionRatio : dC.intersectionRatio(c, eS(d))) && eE(this, a5).call(this);
                                                    },
                                                    { threshold: e6, rootMargin: q, root: e },
                                                ),
                                            ),
                                            eE(this, a1).observe(d),
                                            eH(this, a6, a7).call(this));
                                    }, 75),
                                ),
                                (this.boundingClientRect = a.getBoundingClientRect()),
                                eG(
                                    this,
                                    a$,
                                    (function (a, b = a.getBoundingClientRect()) {
                                        let { width: c, height: d } = eS(a, b);
                                        return c > 0 && d > 0;
                                    })(a, this.boundingClientRect),
                                ));
                            let d = !0;
                            this.callback = (a) => {
                                (d && ((d = !1), c.skipInitial)) || b(a);
                            };
                            let e = a.ownerDocument;
                            ((null == c ? void 0 : c.debug) && (eG(this, a3, document.createElement("div")), (eE(this, a3).style.background = "rgba(0,0,0,0.15)"), (eE(this, a3).style.position = "fixed"), (eE(this, a3).style.pointerEvents = "none"), e.body.appendChild(eE(this, a3))),
                                eG(
                                    this,
                                    a2,
                                    new IntersectionObserver(
                                        (b) => {
                                            var c, d;
                                            let { boundingClientRect: e, isIntersecting: f } = b[b.length - 1],
                                                { width: g, height: h } = e,
                                                i = eE(this, a$);
                                            (eG(this, a$, f), (g || h) && (i && !f ? (null == (c = eE(this, a1)) || c.disconnect(), this.callback(null), null == (d = eE(this, a0)) || d.disconnect(), eG(this, a0, void 0), eE(this, a3) && (eE(this, a3).style.visibility = "hidden")) : eE(this, a5).call(this), f && !eE(this, a0) && (eG(this, a0, new e5(eE(this, a5))), eE(this, a0).observe(a))));
                                        },
                                        { threshold: e6, root: e },
                                    ),
                                ),
                                eE(this, a$) && !c.skipInitial && this.callback(this.boundingClientRect),
                                eE(this, a2).observe(a));
                        }
                    };
                ((a$ = new WeakMap()),
                    (a_ = new WeakMap()),
                    (a0 = new WeakMap()),
                    (a1 = new WeakMap()),
                    (a2 = new WeakMap()),
                    (a3 = new WeakMap()),
                    (a4 = new WeakMap()),
                    (a5 = new WeakMap()),
                    (a6 = new WeakSet()),
                    (a7 = function () {
                        var a, b;
                        !eE(this, a4) && (eH(this, a6, a8).call(this), (a = this.boundingClientRect) === (b = eE(this, a_)) || (a && b && a.top == b.top && a.left == b.left && a.right == b.right && a.bottom == b.bottom) || (this.callback(this.boundingClientRect), eG(this, a_, this.boundingClientRect)));
                    }),
                    (a8 = function () {
                        if (eE(this, a3)) {
                            let { top: a, left: b, width: c, height: d } = eS(this.element);
                            ((eE(this, a3).style.overflow = "hidden"), (eE(this, a3).style.visibility = "visible"), (eE(this, a3).style.top = `${Math.floor(a)}px`), (eE(this, a3).style.left = `${Math.floor(b)}px`), (eE(this, a3).style.width = `${Math.floor(c)}px`), (eE(this, a3).style.height = `${Math.floor(d)}px`));
                        }
                    }));
                var e8 = new WeakMap(),
                    e9 = new WeakMap(),
                    fa = class {
                        constructor(a, b, c) {
                            ((this.callback = b),
                                eF(this, a9),
                                eF(this, ba, !1),
                                eF(this, bb),
                                eF(
                                    this,
                                    bc,
                                    e3((a) => {
                                        if (!eE(this, ba) && a.target && "contains" in a.target && "function" == typeof a.target.contains) {
                                            for (let b of eE(this, bb))
                                                if (a.target.contains(b)) {
                                                    this.callback(eE(this, a9).boundingClientRect);
                                                    break;
                                                }
                                        }
                                    }, 75),
                                ));
                            let d = (function (a) {
                                    let b = new Set(),
                                        c = e2(a);
                                    for (; c;) (b.add(c), (c = e2(c)));
                                    return b;
                                })(a),
                                e = (function (a, b) {
                                    let c = new Set();
                                    for (let d of a) {
                                        let a = (function (a, b) {
                                            let c = e8.get(a);
                                            return (
                                                c ||
                                                    (c = {
                                                        disconnect: new e7(
                                                            a,
                                                            (b) => {
                                                                let c = e8.get(a);
                                                                c && c.callbacks.forEach((a) => a(b));
                                                            },
                                                            { skipInitial: !0 },
                                                        ).disconnect,
                                                        callbacks: new Set(),
                                                    }),
                                                c.callbacks.add(b),
                                                e8.set(a, c),
                                                () => {
                                                    (c.callbacks.delete(b), 0 === c.callbacks.size && (e8.delete(a), c.disconnect()));
                                                }
                                            );
                                        })(d, b);
                                        c.add(a);
                                    }
                                    return () => c.forEach((a) => a());
                                })(d, b),
                                f = (function (a, b) {
                                    var c;
                                    let d = a.ownerDocument;
                                    if (!e9.has(d)) {
                                        let a = new AbortController(),
                                            b = new Set();
                                        (document.addEventListener("scroll", (a) => b.forEach((b) => b(a)), { capture: !0, passive: !0, signal: a.signal }), e9.set(d, { disconnect: () => a.abort(), listeners: b }));
                                    }
                                    let { listeners: e, disconnect: f } = null != (c = e9.get(d)) ? c : {};
                                    return e && f
                                        ? (e.add(b),
                                          () => {
                                              (e.delete(b), 0 === e.size && (f(), e9.delete(d)));
                                          })
                                        : () => {};
                                })(a, eE(this, bc));
                            (eG(this, bb, d),
                                eG(this, a9, new e7(a, b, c)),
                                (this.disconnect = () => {
                                    eE(this, ba) || (eG(this, ba, !0), e(), f(), eE(this, a9).disconnect());
                                }));
                        }
                    };
                function fb(a) {
                    return "showPopover" in a && "hidePopover" in a && "function" == typeof a.showPopover && "function" == typeof a.hidePopover;
                }
                function fc(a) {
                    try {
                        fb(a) && a.isConnected && a.hasAttribute("popover") && !a.matches(":popover-open") && a.showPopover();
                    } catch (a) {}
                }
                function fd(a) {
                    return !!eU && !!a && a === eR(a).scrollingElement;
                }
                function fe(a) {
                    var b, c;
                    let d = eN(a),
                        e = fd(a)
                            ? (function (a) {
                                  var b, c, d, e;
                                  let { documentElement: f } = eR(a),
                                      g = eN(a).visualViewport,
                                      h = null != (b = null == g ? void 0 : g.width) ? b : f.clientWidth,
                                      i = null != (c = null == g ? void 0 : g.height) ? c : f.clientHeight,
                                      j = null != (d = null == g ? void 0 : g.offsetTop) ? d : 0,
                                      k = null != (e = null == g ? void 0 : g.offsetLeft) ? e : 0;
                                  return { top: j, left: k, right: k + h, bottom: j + i, width: h, height: i };
                              })(a)
                            : eK(a),
                        f = d.visualViewport,
                        g = fd(a) ? { height: null != (b = null == f ? void 0 : f.height) ? b : d.innerHeight, width: null != (c = null == f ? void 0 : f.width) ? c : d.innerWidth } : { height: a.clientHeight, width: a.clientWidth },
                        h = { current: { x: a.scrollLeft, y: a.scrollTop }, max: { x: a.scrollWidth - g.width, y: a.scrollHeight - g.height } },
                        i = h.current.y <= 0,
                        j = h.current.x <= 0,
                        k = h.current.y >= h.max.y,
                        l = h.current.x >= h.max.x;
                    return { rect: e, position: h, isTop: i, isLeft: j, isBottom: k, isRight: l };
                }
                ((a9 = new WeakMap()), (ba = new WeakMap()), (bb = new WeakMap()), (bc = new WeakMap()));
                var ff = class {
                        constructor(a) {
                            ((this.scheduler = a),
                                (this.pending = !1),
                                (this.tasks = new Set()),
                                (this.resolvers = new Set()),
                                (this.flush = () => {
                                    let { tasks: a, resolvers: b } = this;
                                    for (let b of ((this.pending = !1), (this.tasks = new Set()), (this.resolvers = new Set()), a)) b();
                                    for (let a of b) a();
                                }));
                        }
                        schedule(a) {
                            return (this.tasks.add(a), this.pending || ((this.pending = !0), this.scheduler(this.flush)), new Promise((a) => this.resolvers.add(a)));
                        }
                    },
                    fg = new ff((a) => {
                        "function" == typeof requestAnimationFrame ? requestAnimationFrame(a) : a();
                    }),
                    fh = new ff((a) => setTimeout(a, 50)),
                    fi = new Map(),
                    fj = fi.clear.bind(fi);
                function fk(a, b = !1) {
                    if (!b) return fl(a);
                    let c = fi.get(a);
                    return (c || ((c = fl(a)), fi.set(a, c), fh.schedule(fj)), c);
                }
                function fl(a) {
                    return eN(a).getComputedStyle(a);
                }
                var fm = { excludeElement: !0, escapeShadowDOM: !0 };
                function fn(a, b = fm) {
                    let { limit: c, excludeElement: d, escapeShadowDOM: e } = b,
                        f = new Set();
                    return a
                        ? (function b(g) {
                              if ((null != c && f.size >= c) || !g) return f;
                              if (eO(g) && null != g.scrollingElement && !f.has(g.scrollingElement)) return (f.add(g.scrollingElement), f);
                              if (e && eX(g)) return b(g.host);
                              if (!eP(g)) return eQ(g) ? b(g.parentElement) : f;
                              if (f.has(g)) return f;
                              let h = fk(g, !0);
                              if (
                                  ((d && g === a) ||
                                      ((function (a, b = fk(a, !0)) {
                                          let c = /(auto|scroll|overlay)/;
                                          return ["overflow", "overflowX", "overflowY"].some((a) => {
                                              let d = b[a];
                                              return "string" == typeof d && c.test(d);
                                          });
                                      })(g, h) &&
                                          f.add(g)),
                                  (function (a, b = fk(a, !0)) {
                                      return "fixed" === b.position || "sticky" === b.position;
                                  })(g, h))
                              ) {
                                  let { scrollingElement: a } = g.ownerDocument;
                                  return (a && f.add(a), f);
                              }
                              return b(g.parentNode);
                          })(a)
                        : f;
                }
                function fo(a, b = window.frameElement) {
                    let c = { x: 0, y: 0, scaleX: 1, scaleY: 1 };
                    if (!a) return c;
                    let d = e2(a);
                    for (; d && d !== b;) {
                        let a = eK(d),
                            { x: b, y: e } = (function (a, b = eK(a)) {
                                let c = Math.round(b.width),
                                    d = Math.round(b.height);
                                if (eP(a)) return { x: c / a.offsetWidth, y: d / a.offsetHeight };
                                let e = fk(a, !0);
                                return { x: (parseFloat(e.width) || c) / c, y: (parseFloat(e.height) || d) / d };
                            })(d, a);
                        ((c.x = c.x + a.left), (c.y = c.y + a.top), (c.scaleX = c.scaleX * b), (c.scaleY = c.scaleY * e), (d = e2(d)));
                    }
                    return c;
                }
                function fp(a) {
                    if (!a || "none" === a) return null;
                    let [b, c, d = "0"] = a.split(" "),
                        e = { x: parseFloat(b), y: parseFloat(c), z: parseInt(d, 10) };
                    return isNaN(e.x) && isNaN(e.y) ? null : { x: isNaN(e.x) ? 0 : e.x, y: isNaN(e.y) ? 0 : e.y, z: isNaN(e.z) ? 0 : e.z };
                }
                function fq(a) {
                    var b, c, d, e, f, g, h, i, j;
                    let { scale: k, transform: l, translate: m } = a,
                        n = (function (a) {
                            if (!a || "none" === a) return null;
                            let b = a.split(" "),
                                c = parseFloat(b[0]),
                                d = parseFloat(b[1]);
                            return isNaN(c) && isNaN(d) ? null : { x: isNaN(c) ? d : c, y: isNaN(d) ? c : d };
                        })(k),
                        o = fp(m),
                        p = (function (a) {
                            if (a.startsWith("matrix3d(")) {
                                let b = a.slice(9, -1).split(/, /);
                                return { x: +b[12], y: +b[13], scaleX: +b[0], scaleY: +b[5] };
                            }
                            if (a.startsWith("matrix(")) {
                                let b = a.slice(7, -1).split(/, /);
                                return { x: +b[4], y: +b[5], scaleX: +b[0], scaleY: +b[3] };
                            }
                            return null;
                        })(l);
                    if (!p && !n && !o) return null;
                    let q = { x: null != (b = null == n ? void 0 : n.x) ? b : 1, y: null != (c = null == n ? void 0 : n.y) ? c : 1 },
                        r = { x: null != (d = null == o ? void 0 : o.x) ? d : 0, y: null != (e = null == o ? void 0 : o.y) ? e : 0 },
                        s = { x: null != (f = null == p ? void 0 : p.x) ? f : 0, y: null != (g = null == p ? void 0 : p.y) ? g : 0, scaleX: null != (h = null == p ? void 0 : p.scaleX) ? h : 1, scaleY: null != (i = null == p ? void 0 : p.scaleY) ? i : 1 };
                    return { x: r.x + s.x, y: r.y + s.y, z: null != (j = null == o ? void 0 : o.z) ? j : 0, scaleX: q.x * s.scaleX, scaleY: q.y * s.scaleY };
                }
                var fr = ((a) => ((a[(a.Idle = 0)] = "Idle"), (a[(a.Forward = 1)] = "Forward"), (a[(a.Reverse = -1)] = "Reverse"), a))(fr || {}),
                    fs = { x: 0.2, y: 0.2 },
                    ft = { x: 10, y: 10 };
                function fu(a, { block: b = "nearest", inline: c = "nearest" } = {}) {
                    if (!eP(a)) return;
                    let d = fn(a),
                        e = [];
                    for (let f of d) {
                        if (!eP(f)) continue;
                        let { top: d, left: g } = (function (a, b) {
                                let c = fv(a),
                                    d = fv(b);
                                return { top: c.top - d.top - b.clientTop, left: c.left - d.left - b.clientLeft };
                            })(a, f),
                            h = d,
                            i = g;
                        for (let a of e) ((h -= a.scrollTop), (i -= a.scrollLeft));
                        if ("none" !== b) {
                            let c = h < f.scrollTop;
                            c !== h + a.offsetHeight > f.scrollTop + f.clientHeight && ("center" === b ? (f.scrollTop = h - f.clientHeight / 2 + a.offsetHeight / 2) : c ? (f.scrollTop = h) : (f.scrollTop = h + a.offsetHeight - f.clientHeight));
                        }
                        if ("none" !== c) {
                            let b = i < f.scrollLeft;
                            b !== i + a.offsetWidth > f.scrollLeft + f.clientWidth && ("center" === c ? (f.scrollLeft = i - f.clientWidth / 2 + a.offsetWidth / 2) : b ? (f.scrollLeft = i) : (f.scrollLeft = i + a.offsetWidth - f.clientWidth));
                        }
                        e.push(f);
                    }
                }
                function fv(a) {
                    let b = 0,
                        c = 0,
                        d = a;
                    for (; d;) {
                        ((b += d.offsetTop), (c += d.offsetLeft));
                        let a = d.offsetParent;
                        if (!eP(a)) break;
                        ((b += a.clientTop), (c += a.clientLeft), (d = a));
                    }
                    return { top: b, left: c };
                }
                function fw({ element: a, keyframes: b, options: c }) {
                    return a.animate(b, c).finished;
                }
                function fx(a, b = fk(a).translate, c = !0) {
                    if (c) {
                        let b = eJ(a, (a) => "translate" in a);
                        if (b) {
                            let { translate: a = "" } = b[0];
                            if ("string" == typeof a) {
                                let b = fp(a);
                                if (b) return b;
                            }
                        }
                    }
                    if (b) {
                        let a = fp(b);
                        if (a) return a;
                    }
                    return { x: 0, y: 0, z: 0 };
                }
                var fy = new ff((a) => setTimeout(a, 0)),
                    fz = new Map(),
                    fA = fz.clear.bind(fz),
                    fB = class extends dC {
                        constructor(a, b = {}) {
                            var c, d, e, f;
                            let g,
                                { frameTransform: h = fo(a), ignoreTransforms: i, getBoundingClientRect: j = eK } = b,
                                k = (function (a, b) {
                                    let c = (function (a) {
                                        let b = a.ownerDocument,
                                            c = fz.get(b);
                                        if (c) return c;
                                        ((c = b.getAnimations()), fz.set(b, c), fy.schedule(fA));
                                        let d = c.filter((b) => eI(b.effect) && b.effect.target === a);
                                        return (fz.set(a, d), c);
                                    })(a)
                                        .filter((a) => {
                                            var c, d;
                                            if (eI(a.effect)) {
                                                let { target: e } = a.effect;
                                                if (null == (d = e && (null == (c = b.isValidTarget) ? void 0 : c.call(b, e))) || d)
                                                    return a.effect.getKeyframes().some((a) => {
                                                        for (let c of b.properties) if (a[c]) return !0;
                                                    });
                                            }
                                        })
                                        .map((a) => {
                                            let { effect: b, currentTime: c } = a,
                                                d = null == b ? void 0 : b.getComputedTiming().duration;
                                            if (!a.pending && "finished" !== a.playState && "number" == typeof d && "number" == typeof c && c < d)
                                                return (
                                                    (a.currentTime = d),
                                                    () => {
                                                        a.currentTime = c;
                                                    }
                                                );
                                        });
                                    if (c.length > 0) return () => c.forEach((a) => (null == a ? void 0 : a()));
                                })(a, { properties: ["transform", "translate", "scale", "width", "height"], isValidTarget: (b) => (b !== a || eV()) && b.contains(a) }),
                                l = j(a),
                                { top: m, left: n, width: o, height: p } = l,
                                q = fk(a),
                                r = fq(q),
                                s = { x: null != (c = null == r ? void 0 : r.scaleX) ? c : 1, y: null != (d = null == r ? void 0 : r.scaleY) ? d : 1 },
                                t = (function (a, b) {
                                    let c,
                                        d,
                                        e,
                                        f = a.getAnimations();
                                    if (!f.length) return null;
                                    let g = !1;
                                    for (let a of f) {
                                        if ("running" !== a.playState) continue;
                                        let b = eI(a.effect) ? a.effect.getKeyframes() : [],
                                            f = b[b.length - 1];
                                        if (!f) continue;
                                        let { transform: h, translate: i, scale: j } = f;
                                        ("string" == typeof h && h && ((c = h), (g = !0)), "string" == typeof i && i && ((d = i), (g = !0)), "string" == typeof j && j && ((e = j), (g = !0)));
                                    }
                                    return g ? fq({ transform: null != c ? c : b.transform, translate: null != d ? d : b.translate, scale: null != e ? e : b.scale }) : null;
                                })(a, q);
                            (null == k || k(),
                                r &&
                                    ((g = (function (a, b, c) {
                                        let { scaleX: d, scaleY: e, x: f, y: g } = b,
                                            h = a.left - f - (1 - d) * parseFloat(c),
                                            i = a.top - g - (1 - e) * parseFloat(c.slice(c.indexOf(" ") + 1)),
                                            j = d ? a.width / d : a.width,
                                            k = e ? a.height / e : a.height;
                                        return { width: j, height: k, top: i, right: h + j, bottom: i + k, left: h };
                                    })(l, r, q.transformOrigin)),
                                    (i || t) && ((m = g.top), (n = g.left), (o = g.width), (p = g.height))));
                            let u = { width: null != (e = null == g ? void 0 : g.width) ? e : o, height: null != (f = null == g ? void 0 : g.height) ? f : p };
                            if (t && !i && g) {
                                let a = (function (a, b, c) {
                                    let { scaleX: d, scaleY: e, x: f, y: g } = b,
                                        h = a.left + f + (1 - d) * parseFloat(c),
                                        i = a.top + g + (1 - e) * parseFloat(c.slice(c.indexOf(" ") + 1)),
                                        j = d ? a.width * d : a.width,
                                        k = e ? a.height * e : a.height;
                                    return { width: j, height: k, top: i, right: h + j, bottom: i + k, left: h };
                                })(g, t, q.transformOrigin);
                                ((m = a.top), (n = a.left), (o = a.width), (p = a.height), (s.x = t.scaleX), (s.y = t.scaleY));
                            }
                            (h && (i || ((n *= h.scaleX), (o *= h.scaleX), (m *= h.scaleY), (p *= h.scaleY)), (n += h.x), (m += h.y)), super(n, m, o, p), (this.scale = s), (this.intrinsicWidth = u.width), (this.intrinsicHeight = u.height));
                        }
                    };
                function fC(a) {
                    return "style" in a && "object" == typeof a.style && null !== a.style && "setProperty" in a.style && "removeProperty" in a.style && "function" == typeof a.style.setProperty && "function" == typeof a.style.removeProperty;
                }
                var fD = class {
                    constructor(a) {
                        ((this.element = a), (this.initial = new Map()));
                    }
                    set(a, b = "") {
                        let { element: c } = this;
                        if (fC(c))
                            for (let [d, e] of Object.entries(a)) {
                                let a = `${b}${d}`;
                                (this.initial.has(a) || this.initial.set(a, c.style.getPropertyValue(a)), c.style.setProperty(a, "string" == typeof e ? e : `${e}px`));
                            }
                    }
                    remove(a, b = "") {
                        let { element: c } = this;
                        if (fC(c))
                            for (let d of a) {
                                let a = `${b}${d}`;
                                c.style.removeProperty(a);
                            }
                    }
                    reset() {
                        let { element: a } = this;
                        if (fC(a)) {
                            for (let [b, c] of this.initial) a.style.setProperty(b, c);
                            "" === a.getAttribute("style") && a.removeAttribute("style");
                        }
                    }
                };
                function fE(a) {
                    return !!a && (a instanceof eN(a).Element || (eM(a) && a.nodeType === Node.ELEMENT_NODE));
                }
                function fF(a) {
                    if (!a) return !1;
                    let { KeyboardEvent: b } = eN(a.target);
                    return a instanceof b;
                }
                var fG = {};
                function fH(a) {
                    let b = null == fG[a] ? 0 : fG[a] + 1;
                    return ((fG[a] = b), `${a}-${b}`);
                }
                var fI = (a) => {
                        var b;
                        return null !=
                            (b = (({ dragOperation: a, droppable: b }) => {
                                let c = a.position.current;
                                if (!c) return null;
                                let { id: d } = b;
                                return b.shape && b.shape.containsPoint(c) ? { id: d, value: 1 / dB.distance(b.shape.center, c), type: eq.PointerIntersection, priority: ep.High } : null;
                            })(a))
                            ? b
                            : (({ dragOperation: a, droppable: b }) => {
                                  let { shape: c } = a;
                                  if (!b.shape || !(null == c ? void 0 : c.current)) return null;
                                  let d = c.current.intersectionArea(b.shape);
                                  if (d) {
                                      let { position: e } = a,
                                          f = dB.distance(b.shape.center, e.current),
                                          g = d / (c.current.area + b.shape.area - d);
                                      return { id: b.id, value: g / f, type: eq.ShapeIntersection, priority: ep.Normal };
                                  }
                                  return null;
                              })(a);
                    },
                    fJ = (a) => {
                        let { dragOperation: b, droppable: c } = a,
                            { shape: d, position: e } = b;
                        if (!c.shape) return null;
                        let f = d ? dC.from(d.current.boundingRectangle).corners : void 0,
                            g = dC.from(c.shape.boundingRectangle).corners.reduce((a, b, c) => {
                                var d;
                                return a + dB.distance(dB.from(b), null != (d = null == f ? void 0 : f[c]) ? d : e.current);
                            }, 0);
                        return { id: c.id, value: 1 / (g / 4), type: eq.Collision, priority: ep.Normal };
                    },
                    fK = Object.create,
                    fL = Object.defineProperty,
                    fM = Object.defineProperties,
                    fN = Object.getOwnPropertyDescriptor,
                    fO = Object.getOwnPropertyDescriptors,
                    fP = Object.getOwnPropertySymbols,
                    fQ = Object.prototype.hasOwnProperty,
                    fR = Object.prototype.propertyIsEnumerable,
                    fS = (a, b) => ((b = Symbol[a]) ? b : Symbol.for("Symbol." + a)),
                    fT = (a) => {
                        throw TypeError(a);
                    },
                    fU = (a, b, c) => (b in a ? fL(a, b, { enumerable: !0, configurable: !0, writable: !0, value: c }) : (a[b] = c)),
                    fV = (a, b) => {
                        for (var c in b || (b = {})) fQ.call(b, c) && fU(a, c, b[c]);
                        if (fP) for (var c of fP(b)) fR.call(b, c) && fU(a, c, b[c]);
                        return a;
                    },
                    fW = (a, b) => fM(a, fO(b)),
                    fX = (a, b) => fL(a, "name", { value: b, configurable: !0 }),
                    fY = (a, b) => {
                        var c = {};
                        for (var d in a) fQ.call(a, d) && 0 > b.indexOf(d) && (c[d] = a[d]);
                        if (null != a && fP) for (var d of fP(a)) 0 > b.indexOf(d) && fR.call(a, d) && (c[d] = a[d]);
                        return c;
                    },
                    fZ = (a) => {
                        var b;
                        return [, , , fK(null != (b = null == a ? void 0 : a[fS("metadata")]) ? b : null)];
                    },
                    f$ = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"],
                    f_ = (a) => (void 0 !== a && "function" != typeof a ? fT("Function expected") : a),
                    f0 = (a, b, c, d, e) => ({ kind: f$[a], name: b, metadata: d, addInitializer: (a) => (c._ ? fT("Already initialized") : e.push(f_(a || null))) }),
                    f1 = (a, b) => fU(b, fS("metadata"), a[3]),
                    f2 = (a, b, c, d) => {
                        for (var e = 0, f = a[b >> 1], g = f && f.length; e < g; e++) 1 & b ? f[e].call(c) : (d = f[e].call(c, d));
                        return d;
                    },
                    f3 = (a, b, c, d, e, f) => {
                        var g,
                            h,
                            i,
                            j,
                            k,
                            l = 7 & b,
                            m = !!(8 & b),
                            n = !!(16 & b),
                            o = l > 3 ? a.length + 1 : l ? (m ? 1 : 2) : 0,
                            p = f$[l + 5],
                            q = l > 3 && (a[o - 1] = []),
                            r = a[o] || (a[o] = []),
                            s =
                                l &&
                                (n || m || (e = e.prototype),
                                l < 5 &&
                                    (l > 3 || !n) &&
                                    fN(
                                        l < 4
                                            ? e
                                            : {
                                                  get [c]() {
                                                      return f6(this, f);
                                                  },
                                                  set [c](x) {
                                                      return f8(this, f, x);
                                                  },
                                              },
                                        c,
                                    ));
                        l ? n && l < 4 && fX(f, (l > 2 ? "set " : l > 1 ? "get " : "") + c) : fX(e, c);
                        for (var t = d.length - 1; t >= 0; t--)
                            ((j = f0(l, c, (i = {}), a[3], r)),
                                l && ((j.static = m), (j.private = n), (k = j.access = { has: n ? (a) => f5(e, a) : (a) => c in a }), 3 ^ l && (k.get = n ? (a) => (1 ^ l ? f6 : f9)(a, e, 4 ^ l ? f : s.get) : (a) => a[c]), l > 2 && (k.set = n ? (a, b) => f8(a, e, b, 4 ^ l ? f : s.set) : (a, b) => (a[c] = b))),
                                (h = (0, d[t])(l ? (l < 4 ? (n ? f : s[p]) : l > 4 ? void 0 : { get: s.get, set: s.set }) : e, j)),
                                (i._ = 1),
                                4 ^ l || void 0 === h ? f_(h) && (l > 4 ? q.unshift(h) : l ? (n ? (f = h) : (s[p] = h)) : (e = h)) : "object" != typeof h || null === h ? fT("Object expected") : (f_((g = h.get)) && (s.get = g), f_((g = h.set)) && (s.set = g), f_((g = h.init)) && q.unshift(g)));
                        return (l || f1(a, e), s && fL(e, c, s), n ? (4 ^ l ? f : s) : e);
                    },
                    f4 = (a, b, c) => b.has(a) || fT("Cannot " + c),
                    f5 = (a, b) => (Object(b) !== b ? fT('Cannot use the "in" operator on this value') : a.has(b)),
                    f6 = (a, b, c) => (f4(a, b, "read from private field"), c ? c.call(a) : b.get(a)),
                    f7 = (a, b, c) => (b.has(a) ? fT("Cannot add the same private member more than once") : b instanceof WeakSet ? b.add(a) : b.set(a, c)),
                    f8 = (a, b, c, d) => (f4(a, b, "write to private field"), d ? d.call(a, c) : b.set(a, c), c),
                    f9 = (a, b, c) => (f4(a, b, "access private method"), c),
                    ga = { role: "button", roleDescription: "draggable" },
                    gb = { draggable: "To pick up a draggable item, press the space bar. While dragging, use the arrow keys to move the item in a given direction. Press space again to drop the item in its new position, or press escape to cancel." },
                    gc = {
                        dragstart({ operation: { source: a } }) {
                            if (a) return `Picked up draggable item ${a.id}.`;
                        },
                        dragover({ operation: { source: a, target: b } }) {
                            if (a && a.id !== (null == b ? void 0 : b.id)) return b ? `Draggable item ${a.id} was moved over droppable target ${b.id}.` : `Draggable item ${a.id} is no longer over a droppable target.`;
                        },
                        dragend({ operation: { source: a, target: b }, canceled: c }) {
                            if (a) return c ? `Dragging was cancelled. Draggable item ${a.id} was dropped.` : b ? `Draggable item ${a.id} was dropped over droppable target ${b.id}` : `Draggable item ${a.id} was dropped.`;
                        },
                    },
                    gd = ["dragover", "dragmove"],
                    ge = class extends ea {
                        constructor(a, b) {
                            let c, d, e, f;
                            super(a);
                            let { id: g, idPrefix: { description: h = "dnd-kit-description", announcement: i = "dnd-kit-announcement" } = {}, announcements: j = gc, screenReaderInstructions: k = gb, debounce: l = 500 } = null != b ? b : {},
                                m = g ? `${h}-${g}` : fH(h),
                                n = g ? `${i}-${g}` : fH(i),
                                o = (a = f) => {
                                    e && a && (null == e ? void 0 : e.nodeValue) !== a && (e.nodeValue = a);
                                },
                                p = () => fg.schedule(o),
                                q = (function (a, b) {
                                    let c,
                                        d = () => {
                                            (clearTimeout(c), (c = setTimeout(a, b)));
                                        };
                                    return ((d.cancel = () => clearTimeout(c)), d);
                                })(p, l),
                                r = Object.entries(j).map(([a, b]) =>
                                    this.manager.monitor.addEventListener(a, (c, d) => {
                                        let g = e;
                                        if (!g) return;
                                        let h = null == b ? void 0 : b(c, d);
                                        h && g.nodeValue !== h && ((f = h), gd.includes(a) ? q() : (p(), q.cancel()));
                                    }),
                                ),
                                s = () => {
                                    let a = [];
                                    ((null == c ? void 0 : c.isConnected) ||
                                        ((c = (function (a, b) {
                                            let c = document.createElement("div");
                                            return ((c.id = a), c.style.setProperty("display", "none"), (c.textContent = b), c);
                                        })(m, k.draggable)),
                                        a.push(c)),
                                        (null == d ? void 0 : d.isConnected) ||
                                            ((d = (function (a) {
                                                let b = document.createElement("div");
                                                return (
                                                    (b.id = a),
                                                    b.setAttribute("role", "status"),
                                                    b.setAttribute("aria-live", "polite"),
                                                    b.setAttribute("aria-atomic", "true"),
                                                    b.style.setProperty("position", "fixed"),
                                                    b.style.setProperty("width", "1px"),
                                                    b.style.setProperty("height", "1px"),
                                                    b.style.setProperty("margin", "-1px"),
                                                    b.style.setProperty("border", "0"),
                                                    b.style.setProperty("padding", "0"),
                                                    b.style.setProperty("overflow", "hidden"),
                                                    b.style.setProperty("clip", "rect(0 0 0 0)"),
                                                    b.style.setProperty("clip-path", "inset(100%)"),
                                                    b.style.setProperty("white-space", "nowrap"),
                                                    b
                                                );
                                            })(n)),
                                            (e = document.createTextNode("")),
                                            d.appendChild(e),
                                            a.push(d)),
                                        a.length > 0 && document.body.append(...a));
                                },
                                t = new Set();
                            function u() {
                                for (let a of t) a();
                            }
                            (this.registerEffect(() => {
                                var a;
                                for (let b of (t.clear(), this.manager.registry.draggables.value)) {
                                    let e = null != (a = b.handle) ? a : b.element;
                                    if (e) {
                                        for (let a of ((c && d) || t.add(s),
                                        (!["input", "select", "textarea", "a", "button"].includes(e.tagName.toLowerCase()) || eV()) && !e.hasAttribute("tabindex") && t.add(() => e.setAttribute("tabindex", "0")),
                                        e.hasAttribute("role") || "button" === e.tagName.toLowerCase() || t.add(() => e.setAttribute("role", ga.role)),
                                        e.hasAttribute("aria-roledescription") || t.add(() => e.setAttribute("aria-roledescription", ga.roleDescription)),
                                        e.hasAttribute("aria-describedby") || t.add(() => e.setAttribute("aria-describedby", m)),
                                        ["aria-pressed", "aria-grabbed"])) {
                                            let c = String(b.isDragging);
                                            e.getAttribute(a) !== c && t.add(() => e.setAttribute(a, c));
                                        }
                                        let a = String(b.disabled);
                                        e.getAttribute("aria-disabled") !== a && t.add(() => e.setAttribute("aria-disabled", a));
                                    }
                                }
                                t.size > 0 && fg.schedule(u);
                            }),
                                (this.destroy = () => {
                                    (super.destroy(), null == c || c.remove(), null == d || d.remove(), r.forEach((a) => a()));
                                }));
                        }
                    },
                    gf = new Map(),
                    gg = class extends ((bh = eb), (bg = [c8]), (bf = [c9]), (be = [c9]), (bd = [c9]), bh) {
                        constructor(a, b) {
                            (super(a, b), f2(bj, 5, this), f7(this, bl), f7(this, bi, new Set()), f7(this, bk, f2(bj, 8, this, new Set())), f2(bj, 11, this), this.registerEffect(f9(this, bl, bm)));
                        }
                        register(a) {
                            return (
                                f6(this, bi).add(a),
                                () => {
                                    f6(this, bi).delete(a);
                                }
                            );
                        }
                        addRoot(a) {
                            return (
                                cr(() => {
                                    let b = new Set(this.additionalRoots);
                                    (b.add(a), (this.additionalRoots = b));
                                }),
                                () => {
                                    cr(() => {
                                        let b = new Set(this.additionalRoots);
                                        (b.delete(a), (this.additionalRoots = b));
                                    });
                                }
                            );
                        }
                        get sourceRoot() {
                            var a;
                            let { source: b } = this.manager.dragOperation;
                            return eY(null != (a = null == b ? void 0 : b.element) ? a : null);
                        }
                        get targetRoot() {
                            var a;
                            let { target: b } = this.manager.dragOperation;
                            return eY(null != (a = null == b ? void 0 : b.element) ? a : null);
                        }
                        get roots() {
                            let { status: a } = this.manager.dragOperation;
                            return a.initializing || a.initialized ? new Set([...[this.sourceRoot, this.targetRoot].filter((a) => null != a), ...this.additionalRoots]) : new Set();
                        }
                    };
                ((bj = fZ(bh)),
                    (bi = new WeakMap()),
                    (bk = new WeakMap()),
                    (bl = new WeakSet()),
                    (bm = function () {
                        let { roots: a } = this,
                            b = [];
                        for (let c of a) for (let a of f6(this, bi)) b.push(f9(this, bl, bn).call(this, c, a));
                        return () => {
                            for (let a of b) a();
                        };
                    }),
                    (bn = function (a, b) {
                        let c = gf.get(a);
                        c || ((c = new Map()), gf.set(a, c));
                        let d = c.get(b);
                        if (!d) {
                            let e = eO(a) ? f9(this, bl, bo).call(this, a, c, b) : f9(this, bl, bp).call(this, a, c, b);
                            if (!e) return () => {};
                            ((d = e), c.set(b, d));
                        }
                        d.refCount++;
                        let e = !1;
                        return () => {
                            e || ((e = !0), d.refCount--, 0 === d.refCount && d.cleanup());
                        };
                    }),
                    (bo = function (a, b, c) {
                        var d;
                        let e = a.createElement("style"),
                            { nonce: f } = null != (d = this.options) ? d : {};
                        (f && e.setAttribute("nonce", f), (e.textContent = c), a.head.prepend(e));
                        let g = new MutationObserver((b) => {
                            for (let c of b) for (let b of Array.from(c.removedNodes)) if (b === e) return void a.head.prepend(e);
                        });
                        return (
                            g.observe(a.head, { childList: !0 }),
                            {
                                refCount: 0,
                                cleanup: () => {
                                    (g.disconnect(), e.remove(), b.delete(c), 0 === b.size && gf.delete(a));
                                },
                            }
                        );
                    }),
                    (bp = function (a, b, c) {
                        "adoptedStyleSheets" in a && Array.isArray(a.adoptedStyleSheets);
                        let d = a.ownerDocument.defaultView,
                            { CSSStyleSheet: e } = null != d ? d : {};
                        if (!e) return null;
                        let f = new e();
                        return (
                            f.replaceSync(c),
                            a.adoptedStyleSheets.push(f),
                            {
                                refCount: 0,
                                cleanup: () => {
                                    var d;
                                    if (eX(a) && (null == (d = a.host) ? void 0 : d.isConnected)) {
                                        let b = a.adoptedStyleSheets.indexOf(f);
                                        -1 !== b && a.adoptedStyleSheets.splice(b, 1);
                                    }
                                    (b.delete(c), 0 === b.size && gf.delete(a));
                                },
                            }
                        );
                    }),
                    f3(bj, 4, "additionalRoots", bg, gg, bk),
                    f3(bj, 2, "sourceRoot", bf, gg),
                    f3(bj, 2, "targetRoot", be, gg),
                    f3(bj, 2, "roots", bd, gg),
                    f1(bj, gg),
                    (gg.configure = d8(gg)));
                var gh = class extends ea {
                        constructor(a, b) {
                            (super(a, b), (this.manager = a));
                            let { cursor: c = "grabbing" } = null != b ? b : {},
                                d = a.registry.plugins.get(gg),
                                e = null == d ? void 0 : d.register(`* { cursor: ${c} !important; }`);
                            if (e) {
                                let a = this.destroy.bind(this);
                                this.destroy = () => {
                                    (e(), a());
                                };
                            }
                        }
                    },
                    gi = "data-dnd-",
                    gj = `${gi}dropping`,
                    gk = "--dnd-",
                    gl = `${gi}dragging`,
                    gm = `${gi}placeholder`,
                    gn = [gl, gm, "popover", "aria-pressed", "aria-grabbing"],
                    go = ["view-transition-name"],
                    gp = `
  :is(:root,:host) [${gl}] {
    position: fixed !important;
    pointer-events: none !important;
    touch-action: none;
    z-index: calc(infinity);
    will-change: translate;
    top: var(${gk}top, 0px) !important;
    left: var(${gk}left, 0px) !important;
    right: unset !important;
    bottom: unset !important;
    width: var(${gk}width, auto);
    max-width: var(${gk}width, auto);
    height: var(${gk}height, auto);
    max-height: var(${gk}height, auto);
    transform: var(${gk}transform, none) !important;
    transition: var(${gk}transition) !important;
  }

  :is(:root,:host) [${gm}] {
    transition: none;
  }

  :is(:root,:host) [${gm}='hidden'] {
    visibility: hidden;
  }

  [${gl}] * {
    pointer-events: none !important;
  }

  [${gl}]:not([${gj}]) {
    translate: var(${gk}translate) !important;
  }

  [${gl}][style*='${gk}scale'] {
    scale: var(${gk}scale) !important;
    transform-origin: var(${gk}transform-origin) !important;
  }

  @layer dnd-kit {
    :where([${gl}][popover]) {
      overflow: visible;
      background: unset;
      border: unset;
      margin: unset;
      padding: unset;
      color: inherit;

      &:is(input, button) {
        border: revert;
        background: revert;
      }
    }
  }
  [${gl}]::backdrop, [${gi}overlay]:not([${gl}]) {
    display: none;
    visibility: hidden;
  }
`
                        .replace(/\n+/g, " ")
                        .replace(/\s+/g, " ")
                        .trim();
                function gq(a, b) {
                    return a === b || e2(a) === e2(b);
                }
                function gr(a) {
                    let { target: b } = a;
                    "newState" in a && "closed" === a.newState && fE(b) && b.hasAttribute("popover") && requestAnimationFrame(() => fc(b));
                }
                function gs(a) {
                    return "TR" === a.tagName;
                }
                var gt = class extends ((br = ea), (bq = [c8]), br) {
                    constructor(a, b) {
                        (super(a, b), f7(this, bu), f7(this, bt, f2(bs, 8, this)), f2(bs, 11, this), (this.state = { initial: {}, current: {} }));
                        let c = a.registry.plugins.get(gg),
                            d = null == c ? void 0 : c.register(gp);
                        if (d) {
                            let a = this.destroy.bind(this);
                            this.destroy = () => {
                                (d(), a());
                            };
                        }
                        (this.registerEffect(f9(this, bu, bv).bind(this, c)), this.registerEffect(f9(this, bu, bw)));
                    }
                };
                ((bs = fZ(br)),
                    (bt = new WeakMap()),
                    (bu = new WeakSet()),
                    (bv = function (a) {
                        let { overlay: b } = this;
                        if (!b || !a) return;
                        let c = eY(b);
                        if (c) return a.addRoot(c);
                    }),
                    (bw = function () {
                        var a, b, c, d, e, f, g, h;
                        let i,
                            j,
                            k,
                            { state: l, manager: m, options: n } = this,
                            { dragOperation: o } = m,
                            { position: p, source: q, status: r } = o;
                        if (r.idle) {
                            ((l.current = {}), (l.initial = {}));
                            return;
                        }
                        if (!q) return;
                        let { element: s } = q,
                            t = q.pluginConfig(gt),
                            u = null != (b = null != (a = null == t ? void 0 : t.feedback) ? a : null == n ? void 0 : n.feedback) ? b : "default",
                            v = "function" == typeof u ? u(q, m) : u;
                        if (!s || "none" === v || !r.initialized || r.initializing) return;
                        let { initial: w } = l,
                            y = null != (c = this.overlay) ? c : s,
                            z = fo(y),
                            A = fo(s),
                            B = !gq(s, y),
                            C = new fB(s, { frameTransform: B ? A : null, ignoreTransforms: !B }),
                            D = { x: A.scaleX / z.scaleX, y: A.scaleY / z.scaleY },
                            { width: E, height: F, top: G, left: H } = C;
                        B && ((E /= D.x), (F /= D.y));
                        let I = new fD(y),
                            J = fk(s),
                            { transition: K, translate: L, boxSizing: M, paddingBlockStart: N, paddingBlockEnd: O, paddingInlineStart: P, paddingInlineEnd: Q, borderInlineStartWidth: R, borderInlineEndWidth: S, borderBlockStartWidth: T, borderBlockEndWidth: U } = J,
                            V = K.split(",")
                                .filter((a) => !/^\s*(transform|translate|scale)\b/.test(a))
                                .join(","),
                            W = fq(J),
                            X = J.transform,
                            Y = "clone" === v,
                            Z = "content-box" === M,
                            $ = Z ? parseInt(P) + parseInt(Q) + parseInt(R) + parseInt(S) : 0,
                            _ = Z ? parseInt(N) + parseInt(O) + parseInt(T) + parseInt(U) : 0,
                            aa =
                                "move" === v || this.overlay
                                    ? null
                                    : (function (a, b = "hidden") {
                                          return cr(() => {
                                              let { element: c, manager: d } = a;
                                              if (!c || !d) return;
                                              let e = (function (a, b) {
                                                      let c = new Map();
                                                      for (let d of b)
                                                          if (d.element && (a === d.element || a.contains(d.element))) {
                                                              let a = `${gi}${fH("dom-id")}`;
                                                              (d.element.setAttribute(a, ""), c.set(d, a));
                                                          }
                                                      return c;
                                                  })(c, d.registry.droppables),
                                                  f = [],
                                                  g = (function (a) {
                                                      let b = "input, textarea, select, canvas, [contenteditable]",
                                                          c = a.cloneNode(!0),
                                                          d = Array.from(a.querySelectorAll(b));
                                                      return (
                                                          Array.from(c.querySelectorAll(b)).forEach((a, b) => {
                                                              let c = d[b];
                                                              if ((e$(a) && e$(c) && ("file" !== a.type && (a.value = c.value), "radio" === a.type && a.name && (a.name = `Cloned__${a.name}`)), e_(a) && e_(c) && c.width > 0 && c.height > 0)) {
                                                                  let b = a.getContext("2d");
                                                                  null == b || b.drawImage(c, 0, 0);
                                                              }
                                                          }),
                                                          c
                                                      );
                                                  })(c),
                                                  { remove: h } = g;
                                              return (
                                                  (function (a, b, c) {
                                                      for (let [d, e] of a) {
                                                          if (!d.element) continue;
                                                          let a = `[${e}]`,
                                                              f = b.matches(a) ? b : b.querySelector(a);
                                                          if ((d.element.removeAttribute(e), !f)) continue;
                                                          let g = d.element;
                                                          ((d.proxy = f),
                                                              f.removeAttribute(e),
                                                              e0.set(g, f),
                                                              c.push(() => {
                                                                  (e0.delete(g), (d.proxy = void 0));
                                                              }));
                                                      }
                                                  })(e, g, f),
                                                  (function (a, b = "hidden") {
                                                      (a.setAttribute("inert", "true"), a.setAttribute("tab-index", "-1"), a.setAttribute("aria-hidden", "true"), a.setAttribute(gm, b));
                                                  })(g, b),
                                                  (g.remove = () => {
                                                      (f.forEach((a) => a()), h.call(g));
                                                  }),
                                                  g
                                              );
                                          });
                                      })(q, Y ? "clone" : "hidden"),
                            ab = cr(() => fF(m.dragOperation.activatorEvent));
                        if (!w.translate) {
                            if (this.overlay && W) w.translate = { x: W.x, y: W.y };
                            else if ("none" !== L) {
                                let a = fp(L);
                                a && (w.translate = a);
                            }
                        }
                        if (!w.transformOrigin) {
                            let a = cr(() => p.current),
                                b = H + (null != (d = null == W ? void 0 : W.x) ? d : 0),
                                c = G + (null != (e = null == W ? void 0 : W.y) ? e : 0);
                            w.transformOrigin = { x: (a.x - b * z.scaleX - z.x) / (E * z.scaleX), y: (a.y - c * z.scaleY - z.y) / (F * z.scaleY) };
                        }
                        let { transformOrigin: ac } = w,
                            ad = G * z.scaleY + z.y,
                            ae = H * z.scaleX + z.x;
                        if (!w.coordinates && ((w.coordinates = { x: ae, y: ad }), 1 !== D.x || 1 !== D.y)) {
                            let { scaleX: a, scaleY: b } = A,
                                { x: c, y: d } = ac;
                            ((w.coordinates.x += (E * a - E) * c), (w.coordinates.y += (F * b - F) * d));
                        }
                        (w.dimensions || (w.dimensions = { width: E, height: F }), w.frameTransform || (w.frameTransform = z));
                        let af = { x: w.coordinates.x - ae, y: w.coordinates.y - ad },
                            ag = { width: (w.dimensions.width * w.frameTransform.scaleX - E * z.scaleX) * ac.x, height: (w.dimensions.height * w.frameTransform.scaleY - F * z.scaleY) * ac.y },
                            ah = { x: af.x / z.scaleX + ag.width, y: af.y / z.scaleY + ag.height },
                            ai = { left: H + ah.x, top: G + ah.y };
                        y.setAttribute(gl, "true");
                        let aj = cr(() => o.transform),
                            ak = null != (f = w.translate) ? f : { x: 0, y: 0 },
                            al = aj.x * z.scaleX + ak.x,
                            am = aj.y * z.scaleY + ak.y,
                            an = eW();
                        (I.set({ width: E - $, height: F - _, top: ai.top + an.y, left: ai.left + an.x, translate: `${al}px ${am}px 0`, transform: this.overlay ? "none" : X, transition: V ? `${V}, translate 0ms linear` : "translate 0ms linear", scale: B ? `${D.x} ${D.y}` : "", "transform-origin": `${100 * ac.x}% ${100 * ac.y}%` }, gk),
                            aa && (s.insertAdjacentElement("afterend", aa), (null == n ? void 0 : n.rootElement) && ("function" == typeof n.rootElement ? n.rootElement(q) : n.rootElement).appendChild(s)),
                            fb(y) && (y.hasAttribute("popover") || y.setAttribute("popover", "manual"), fc(y), y.addEventListener("beforetoggle", gr)));
                        let ao =
                                ((h = {
                                    placeholder: aa,
                                    element: s,
                                    feedbackElement: y,
                                    frameTransform: z,
                                    transformOrigin: ac,
                                    width: E,
                                    height: F,
                                    top: G,
                                    left: H,
                                    widthOffset: $,
                                    heightOffset: _,
                                    delta: ah,
                                    styles: I,
                                    dragOperation: o,
                                    getTranslate: () => l.current.translate,
                                    getElementMutationObserver: () => i,
                                    getSavedCellWidths: () => k,
                                    setSavedCellWidths: (a) => {
                                        k = a;
                                    },
                                }),
                                new ResizeObserver(() => {
                                    var a, b, c;
                                    let d = new fB(h.placeholder, { frameTransform: h.frameTransform, ignoreTransforms: !0 }),
                                        e = null != (a = h.transformOrigin) ? a : { x: 1, y: 1 },
                                        f = (h.width - d.width) * e.x + h.delta.x,
                                        g = (h.height - d.height) * e.y + h.delta.y,
                                        i = eW();
                                    if ((h.styles.set({ width: d.width - h.widthOffset, height: d.height - h.heightOffset, top: h.top + g + i.y, left: h.left + f + i.x }, gk), null == (b = h.getElementMutationObserver()) || b.takeRecords(), gs(h.element) && gs(h.placeholder))) {
                                        let a = Array.from(h.element.cells),
                                            b = Array.from(h.placeholder.cells);
                                        for (let [c, d] of (h.getSavedCellWidths() || h.setSavedCellWidths(a.map((a) => a.style.width)), a.entries())) {
                                            let a = b[c];
                                            d.style.width = `${a.getBoundingClientRect().width}px`;
                                        }
                                    }
                                    let j = null != (c = h.getTranslate()) ? c : { x: 0, y: 0 },
                                        k = h.left + f + i.x + j.x,
                                        l = h.top + g + i.y + j.y,
                                        m = d.width - h.widthOffset,
                                        n = d.height - h.heightOffset,
                                        o = h.frameTransform;
                                    h.dragOperation.shape = new dC(k * o.scaleX + o.x, l * o.scaleY + o.y, m * o.scaleX, n * o.scaleY);
                                })),
                            ap = new fB(y);
                        cr(() => (o.shape = ap));
                        let aq = eN(y),
                            ar = (a) => {
                                this.manager.actions.stop({ event: a });
                            },
                            as = eZ(aq);
                        (ab && aq.addEventListener("resize", ar),
                            "idle" === cr(() => q.status) && requestAnimationFrame(() => (q.status = "dragging")),
                            aa &&
                                (ao.observe(aa),
                                (i = (function (a, b, c) {
                                    let d = new MutationObserver((d) => {
                                        let e = !1;
                                        for (let c of d) {
                                            if (c.target !== a) {
                                                e = !0;
                                                continue;
                                            }
                                            if ("attributes" !== c.type) continue;
                                            let d = c.attributeName;
                                            if (d.startsWith("aria-") || gn.includes(d)) continue;
                                            let f = a.getAttribute(d);
                                            if ("style" === d) {
                                                if (fC(a) && fC(b)) {
                                                    let c = a.style;
                                                    for (let a of Array.from(b.style)) "" === c.getPropertyValue(a) && b.style.removeProperty(a);
                                                    for (let a of Array.from(c)) {
                                                        if (go.includes(a) || a.startsWith(gk)) continue;
                                                        let d = c.getPropertyValue(a);
                                                        b.style.setProperty(a, d);
                                                    }
                                                }
                                            } else null !== f ? b.setAttribute(d, f) : b.removeAttribute(d);
                                        }
                                        e && c && b.replaceChildren(...a.cloneNode(!0).childNodes);
                                    });
                                    return (d.observe(a, { attributes: !0, subtree: !0, childList: !0 }), d);
                                })(s, aa, Y)),
                                (j = (function (a, b, c) {
                                    let d = new MutationObserver((d) => {
                                        for (let e of d)
                                            if (0 !== e.addedNodes.length)
                                                for (let d of Array.from(e.addedNodes)) {
                                                    if (d.contains(a) && a.nextElementSibling !== b) {
                                                        (a.insertAdjacentElement("afterend", b), fc(c));
                                                        return;
                                                    }
                                                    if (d.contains(b) && b.previousElementSibling !== a) {
                                                        (b.insertAdjacentElement("beforebegin", a), fc(c));
                                                        return;
                                                    }
                                                }
                                        a.isConnected && b.isConnected && a.nextElementSibling !== b && (a.insertAdjacentElement("afterend", b), fc(c));
                                    });
                                    return (d.observe(a.ownerDocument.body, { childList: !0, subtree: !0 }), d);
                                })(s, aa, y))));
                        let at = null == (g = m.dragOperation.source) ? void 0 : g.id,
                            au = () => {
                                var a;
                                if (!ab || null == at) return;
                                let b = m.registry.draggables.get(at),
                                    c = null != (a = null == b ? void 0 : b.handle) ? a : null == b ? void 0 : b.element;
                                eP(c) && c.focus();
                            },
                            av = () => {
                                (null == i || i.disconnect(), null == j || j.disconnect(), ao.disconnect(), aq.removeEventListener("resize", ar), fb(y) && (y.removeEventListener("beforetoggle", gr), y.removeAttribute("popover")), y.removeAttribute(gl), I.reset());
                                let a = () => {
                                    var a;
                                    if (k && gs(s)) for (let [b, c] of Array.from(s.cells).entries()) c.style.width = null != (a = k[b]) ? a : "";
                                    q.status = "idle";
                                    let b = null != l.current.translate,
                                        c = o.status.dragging;
                                    (aa && ((!c && b) || aa.parentElement !== y.parentElement) && y.isConnected && aa.replaceWith(y), null == aa || aa.remove());
                                };
                                y === this.overlay ? setTimeout(a, 0) : a();
                            },
                            aw = null == n ? void 0 : n.dropAnimation,
                            ax = this,
                            ay = db(
                                () => {
                                    var a, b, c;
                                    let { transform: d, status: e } = o;
                                    if ((d.x || d.y || l.current.translate) && e.dragging) {
                                        let e = null != (a = w.translate) ? a : { x: 0, y: 0 },
                                            f = { x: d.x / z.scaleX + e.x, y: d.y / z.scaleY + e.y },
                                            g = l.current.translate,
                                            h = cr(() => o.modifiers),
                                            j = cr(() => {
                                                var a;
                                                return null == (a = o.shape) ? void 0 : a.current;
                                            }),
                                            k = null == n ? void 0 : n.keyboardTransition,
                                            m = ab && !as && null !== k ? `${null != (b = null == k ? void 0 : k.duration) ? b : 250}ms ${null != (c = null == k ? void 0 : k.easing) ? c : "cubic-bezier(0.25, 1, 0.5, 1)"}` : "0ms linear";
                                        if ((I.set({ transition: V ? `${V}, translate ${m}` : `translate ${m}`, translate: `${f.x}px ${f.y}px 0` }, gk), null == i || i.takeRecords(), j && j !== ap && g && !h.length)) {
                                            let a = dB.delta(f, g);
                                            o.shape = dC.from(j.boundingRectangle).translate(a.x * z.scaleX, a.y * z.scaleY);
                                        } else o.shape = new fB(y);
                                        l.current.translate = f;
                                    }
                                },
                                function () {
                                    if (o.status.dropped) {
                                        (this.dispose(), (q.status = "dropping"));
                                        let a = (null == t ? void 0 : t.dropAnimation) !== void 0 ? t.dropAnimation : void 0 !== ax.dropAnimation ? ax.dropAnimation : aw,
                                            b = l.current.translate,
                                            c = null != b;
                                        if ((b || s === y || (b = { x: 0, y: 0 }), !b || null === a)) return void av();
                                        m.renderer.rendering.then(() => {
                                            !(function (a) {
                                                var b, c, d, e;
                                                let { animation: f } = a;
                                                if ("function" == typeof f)
                                                    return Promise.resolve(f({ source: a.source, element: a.element, feedbackElement: a.feedbackElement, placeholder: a.placeholder, translate: a.translate, moved: a.moved })).then(() => {
                                                        (a.cleanup(), requestAnimationFrame(a.restoreFocus));
                                                    });
                                                let { duration: g = 250, easing: h = "ease" } = null != f ? f : {};
                                                fc(a.feedbackElement);
                                                let [, i] = null != (b = eJ(a.feedbackElement, (a) => "translate" in a)) ? b : [];
                                                null == i || i.pause();
                                                let j = null != (c = a.placeholder) ? c : a.element,
                                                    k = { frameTransform: gq(a.feedbackElement, j) ? null : void 0 },
                                                    l = new fB(a.feedbackElement, k),
                                                    m = null != (d = fp(fk(a.feedbackElement).translate)) ? d : a.translate,
                                                    n = new fB(j, k),
                                                    o = dC.delta(l, n, a.alignment),
                                                    p = { x: m.x - o.x, y: m.y - o.y },
                                                    q = Math.round(l.intrinsicHeight) !== Math.round(n.intrinsicHeight) ? { minHeight: [`${l.intrinsicHeight}px`, `${n.intrinsicHeight}px`], maxHeight: [`${l.intrinsicHeight}px`, `${n.intrinsicHeight}px`] } : {},
                                                    r = Math.round(l.intrinsicWidth) !== Math.round(n.intrinsicWidth) ? { minWidth: [`${l.intrinsicWidth}px`, `${n.intrinsicWidth}px`], maxWidth: [`${l.intrinsicWidth}px`, `${n.intrinsicWidth}px`] } : {};
                                                (a.styles.set({ transition: a.transition }, gk),
                                                    a.feedbackElement.setAttribute(gj, ""),
                                                    null == (e = a.getElementMutationObserver()) || e.takeRecords(),
                                                    fw({ element: a.feedbackElement, keyframes: fW(fV(fV({}, q), r), { translate: [`${m.x}px ${m.y}px 0`, `${p.x}px ${p.y}px 0`] }), options: { duration: eZ(eN(a.feedbackElement)) ? 0 : a.moved || a.feedbackElement !== a.element ? g : 0, easing: h } }).then(() => {
                                                        (a.feedbackElement.removeAttribute(gj), null == i || i.finish(), a.cleanup(), requestAnimationFrame(a.restoreFocus));
                                                    }));
                                            })({ source: q, element: s, feedbackElement: y, placeholder: aa, translate: b, moved: c, transition: K, alignment: q.alignment, styles: I, animation: null != a ? a : void 0, getElementMutationObserver: () => i, cleanup: av, restoreFocus: au });
                                        });
                                    }
                                },
                            );
                        return () => {
                            (av(), ay());
                        };
                    }),
                    f3(bs, 4, "overlay", bq, gt, bt),
                    f1(bs, gt),
                    (gt.configure = d8(gt)),
                    (bz = [c8]),
                    (bA = fr.Forward),
                    (bx = [c8]),
                    (by = fr.Reverse));
                var gu = class {
                    constructor() {
                        (f7(this, bC, f2(bB, 8, this, !0)), f2(bB, 11, this), f7(this, bD, f2(bB, 12, this, !0)), f2(bB, 15, this));
                    }
                    isLocked(a) {
                        return a !== fr.Idle && (null == a ? !0 === this[fr.Forward] && !0 === this[fr.Reverse] : !0 === this[a]);
                    }
                    unlock(a) {
                        a !== fr.Idle && (this[a] = !1);
                    }
                };
                ((bB = fZ(null)), (bC = new WeakMap()), (bD = new WeakMap()), f3(bB, 4, bA, bz, gu, bC), f3(bB, 4, by, bx, gu, bD), f1(bB, gu));
                var gv = [fr.Forward, fr.Reverse],
                    gw = class {
                        constructor() {
                            ((this.x = new gu()), (this.y = new gu()));
                        }
                        isLocked() {
                            return this.x.isLocked() && this.y.isLocked();
                        }
                    },
                    gx = class extends ea {
                        constructor(a) {
                            super(a);
                            let b = cA(new gw()),
                                c = null;
                            ((this.signal = b),
                                cJ(() => {
                                    let { status: d } = a.dragOperation;
                                    if (!d.initialized) {
                                        ((c = null), (b.value = new gw()));
                                        return;
                                    }
                                    let { delta: e } = a.dragOperation.position;
                                    if (c) {
                                        let a = { x: gy(e.x, c.x), y: gy(e.y, c.y) },
                                            d = b.peek();
                                        cq(() => {
                                            for (let b of dG) for (let c of gv) a[b] === c && d[b].unlock(c);
                                            b.value = d;
                                        });
                                    }
                                    c = e;
                                }));
                        }
                        get current() {
                            return this.signal.peek();
                        }
                    };
                function gy(a, b) {
                    return Math.sign(a - b);
                }
                var gz = class extends ((bF = eb), (bE = [c8]), bF) {
                    constructor(a) {
                        (super(a),
                            f7(this, bH, f2(bG, 8, this, !1)),
                            f2(bG, 11, this),
                            f7(this, bI),
                            f7(this, bJ, () => {
                                if (!f6(this, bI)) return;
                                let { element: a, by: b } = f6(this, bI);
                                (b.y && (a.scrollTop += b.y), b.x && (a.scrollLeft += b.x));
                            }),
                            (this.scroll = (a, b) => {
                                var c;
                                if (this.disabled) return !1;
                                let d = this.getScrollableElements();
                                if (!d) return (f8(this, bI, void 0), !1);
                                let { position: e } = this.manager.dragOperation,
                                    f = null == e ? void 0 : e.current;
                                if (f) {
                                    let { by: e } = null != a ? a : {},
                                        g = e ? { x: gA(e.x), y: gA(e.y) } : void 0,
                                        h = g ? void 0 : this.scrollIntentTracker.current;
                                    if (null == h ? void 0 : h.isLocked()) return !1;
                                    for (let a of d) {
                                        let d = (function (a, b) {
                                            let { isTop: c, isBottom: d, isLeft: e, isRight: f, position: g } = fe(a),
                                                { x: h, y: i } = null != b ? b : { x: 0, y: 0 },
                                                j = !c && g.current.y + i > 0,
                                                k = !d && g.current.y + i < g.max.y,
                                                l = !e && g.current.x + h > 0,
                                                m = !f && g.current.x + h < g.max.x;
                                            return { top: j, bottom: k, left: l, right: m, x: l || m, y: j || k };
                                        })(a, e);
                                        if (d.x || d.y) {
                                            let { speed: d, direction: i } = (function (a, b, c, d = 25, e = fs, f = ft) {
                                                let { x: g, y: h } = b,
                                                    { rect: i, isTop: j, isBottom: k, isLeft: l, isRight: m } = fe(a),
                                                    n = fo(a),
                                                    o = fq(fk(a, !0)),
                                                    p = null !== o && (null == o ? void 0 : o.scaleX) < 0,
                                                    q = null !== o && (null == o ? void 0 : o.scaleY) < 0,
                                                    r = new dC(i.left * n.scaleX + n.x, i.top * n.scaleY + n.y, i.width * n.scaleX, i.height * n.scaleY),
                                                    s = { x: 0, y: 0 },
                                                    t = { x: 0, y: 0 },
                                                    u = { height: r.height * e.y, width: r.width * e.x };
                                                return (
                                                    u.height > 0 && (!j || (q && !k)) && h <= r.top + u.height && (null == c ? void 0 : c.y) !== 1 && g >= r.left - f.x && g <= r.right + f.x ? ((s.y = q ? 1 : -1), (t.y = d * Math.abs((r.top + u.height - h) / u.height))) : u.height > 0 && (!k || (q && !j)) && h >= r.bottom - u.height && (null == c ? void 0 : c.y) !== -1 && g >= r.left - f.x && g <= r.right + f.x && ((s.y = q ? -1 : 1), (t.y = d * Math.abs((r.bottom - u.height - h) / u.height))),
                                                    u.width > 0 && (!m || (p && !l)) && g >= r.right - u.width && (null == c ? void 0 : c.x) !== -1 && h >= r.top - f.y && h <= r.bottom + f.y ? ((s.x = p ? -1 : 1), (t.x = d * Math.abs((r.right - u.width - g) / u.width))) : u.width > 0 && (!l || (p && !m)) && g <= r.left + u.width && (null == c ? void 0 : c.x) !== 1 && h >= r.top - f.y && h <= r.bottom + f.y && ((s.x = p ? 1 : -1), (t.x = d * Math.abs((r.left + u.width - g) / u.width))),
                                                    { direction: s, speed: t }
                                                );
                                            })(a, f, g, null == b ? void 0 : b.acceleration, null == b ? void 0 : b.threshold);
                                            if (h) for (let a of dG) h[a].isLocked(i[a]) && ((d[a] = 0), (i[a] = 0));
                                            if (i.x || i.y) {
                                                let { x: b, y: f } = null != e ? e : i,
                                                    g = b * d.x,
                                                    h = f * d.y;
                                                if (g || h) {
                                                    let b = null == (c = f6(this, bI)) ? void 0 : c.by;
                                                    if (this.autoScrolling && b && ((b.x && !g) || (b.y && !h))) continue;
                                                    return (f8(this, bI, { element: a, by: { x: g, y: h } }), fg.schedule(f6(this, bJ)), !0);
                                                }
                                            }
                                        }
                                    }
                                }
                                return (f8(this, bI, void 0), !1);
                            }));
                        let b = null,
                            c = null,
                            d = c6(() => {
                                let { position: c, source: d } = a.dragOperation;
                                if (!c) return null;
                                let e = (function a(b, { x: c, y: d }) {
                                    var e;
                                    let f = b.elementFromPoint(c, d);
                                    if ((null == (e = f) ? void 0 : e.tagName) === "IFRAME") {
                                        let { contentDocument: b } = f;
                                        if (b) {
                                            let { left: e, top: g } = f.getBoundingClientRect();
                                            return a(b, { x: c - e, y: d - g });
                                        }
                                    }
                                    return f;
                                })(eY(null == d ? void 0 : d.element), c.current);
                                return (e && (b = e), null != e ? e : b);
                            }),
                            e = c6(() => {
                                let b = d.value,
                                    { documentElement: e } = eR(b);
                                if (!b || b === e) {
                                    let { target: b } = a.dragOperation,
                                        d = null == b ? void 0 : b.element;
                                    if (d) {
                                        let a = fn(d, { excludeElement: !1 });
                                        return ((c = a), a);
                                    }
                                }
                                if (b) {
                                    let a = fn(b, { excludeElement: !1 });
                                    return this.autoScrolling && c && a.size < (null == c ? void 0 : c.size) ? c : ((c = a), a);
                                }
                                return ((c = null), null);
                            }, c7);
                        ((this.getScrollableElements = () => e.value),
                            (this.scrollIntentTracker = new gx(a)),
                            (this.destroy = a.monitor.addEventListener("dragmove", (b) => {
                                !this.disabled && !b.defaultPrevented && fF(a.dragOperation.activatorEvent) && b.by && this.scroll({ by: b.by }) && b.preventDefault();
                            })));
                    }
                };
                function gA(a) {
                    return a > 0 ? fr.Forward : a < 0 ? fr.Reverse : fr.Idle;
                }
                ((bG = fZ(bF)), (bH = new WeakMap()), (bI = new WeakMap()), (bJ = new WeakMap()), f3(bG, 4, "autoScrolling", bE, gz, bH), f1(bG, gz));
                var gB = new (class {
                        constructor(a) {
                            ((this.scheduler = a),
                                (this.pending = !1),
                                (this.tasks = new Set()),
                                (this.resolvers = new Set()),
                                (this.flush = () => {
                                    let { tasks: a, resolvers: b } = this;
                                    for (let b of ((this.pending = !1), (this.tasks = new Set()), (this.resolvers = new Set()), a)) b();
                                    for (let a of b) a();
                                }));
                        }
                        schedule(a) {
                            return (this.tasks.add(a), this.pending || ((this.pending = !0), this.scheduler(this.flush)), new Promise((a) => this.resolvers.add(a)));
                        }
                    })((a) => {
                        "function" == typeof requestAnimationFrame ? requestAnimationFrame(a) : a();
                    }),
                    gC = class extends ea {
                        constructor(a, b) {
                            super(a, b);
                            let c = a.registry.plugins.get(gz);
                            if (!c) throw Error("AutoScroller plugin depends on Scroller plugin");
                            this.destroy = cJ(() => {
                                var b, d, e;
                                if (this.disabled) return;
                                let { position: f, status: g } = a.dragOperation;
                                if (g.dragging) {
                                    let a = { acceleration: null == (b = this.options) ? void 0 : b.acceleration, threshold: "number" == typeof (null == (d = this.options) ? void 0 : d.threshold) ? { x: this.options.threshold, y: this.options.threshold } : null == (e = this.options) ? void 0 : e.threshold };
                                    if (c.scroll(void 0, a)) {
                                        c.autoScrolling = !0;
                                        let b = setInterval(() => gB.schedule(() => c.scroll(void 0, a)), 10);
                                        return () => {
                                            clearInterval(b);
                                        };
                                    }
                                    c.autoScrolling = !1;
                                }
                            });
                        }
                    };
                gC.configure = d8(gC);
                var gD = { capture: !0, passive: !0 },
                    gE = class extends eb {
                        constructor(a) {
                            (super(a),
                                f7(this, bK),
                                (this.handleScroll = () => {
                                    null == f6(this, bK) &&
                                        f8(
                                            this,
                                            bK,
                                            setTimeout(() => {
                                                (this.manager.collisionObserver.forceUpdate(!1), f8(this, bK, void 0));
                                            }, 50),
                                        );
                                }));
                            let { dragOperation: b } = this.manager;
                            this.destroy = cJ(() => {
                                var a, c, d;
                                if (b.status.dragging) {
                                    let e = null != (d = null == (c = null == (a = b.source) ? void 0 : a.element) ? void 0 : c.ownerDocument) ? d : document;
                                    return (
                                        e.addEventListener("scroll", this.handleScroll, gD),
                                        () => {
                                            e.removeEventListener("scroll", this.handleScroll, gD);
                                        }
                                    );
                                }
                            });
                        }
                    };
                bK = new WeakMap();
                var gF = class extends ea {
                    constructor(a) {
                        (super(a), (this.manager = a));
                        let b = a.registry.plugins.get(gg),
                            c = null == b ? void 0 : b.register("* { user-select: none !important; -webkit-user-select: none !important; }");
                        if (
                            ((this.destroy = cJ(() => {
                                let { dragOperation: a } = this.manager;
                                if (a.status.initialized)
                                    return (
                                        gG(),
                                        document.addEventListener("selectionchange", gG, { capture: !0 }),
                                        () => {
                                            document.removeEventListener("selectionchange", gG, { capture: !0 });
                                        }
                                    );
                            })),
                            c)
                        ) {
                            let a = this.destroy.bind(this);
                            this.destroy = () => {
                                (c(), a());
                            };
                        }
                    }
                };
                function gG() {
                    var a;
                    null == (a = document.getSelection()) || a.removeAllRanges();
                }
                var gH = Object.freeze({
                        offset: 10,
                        keyboardCodes: { start: ["Space", "Enter"], cancel: ["Escape"], end: ["Space", "Enter", "Tab"], up: ["ArrowUp"], down: ["ArrowDown"], left: ["ArrowLeft"], right: ["ArrowRight"] },
                        preventActivation(a, b) {
                            var c;
                            let d = null != (c = b.handle) ? c : b.element;
                            return a.target !== d;
                        },
                    }),
                    gI = class extends et {
                        constructor(a, b) {
                            (super(a),
                                (this.manager = a),
                                (this.options = b),
                                f7(this, bL, []),
                                (this.listeners = new e1()),
                                (this.handleSourceKeyDown = (a, b, c) => {
                                    if (this.disabled || a.defaultPrevented || !fE(a.target) || b.disabled) return;
                                    let { keyboardCodes: d = gH.keyboardCodes, preventActivation: e = gH.preventActivation } = null != c ? c : {};
                                    d.start.includes(a.code) && this.manager.dragOperation.status.idle && ((null != e && e(a, b)) || this.handleStart(a, b, c));
                                }));
                        }
                        bind(a, b = this.options) {
                            return cJ(() => {
                                var c;
                                let d = null != (c = a.handle) ? c : a.element,
                                    e = (c) => {
                                        fF(c) && this.handleSourceKeyDown(c, a, b);
                                    };
                                if (d)
                                    return (
                                        d.addEventListener("keydown", e),
                                        () => {
                                            d.removeEventListener("keydown", e);
                                        }
                                    );
                            });
                        }
                        handleStart(a, b, c) {
                            let { element: d } = b;
                            if (!d) throw Error("Source draggable does not have an associated element");
                            (a.preventDefault(), a.stopImmediatePropagation(), fu(d));
                            let { center: e } = new fB(d);
                            if (this.manager.actions.start({ event: a, coordinates: { x: e.x, y: e.y }, source: b }).signal.aborted) return this.cleanup();
                            this.sideEffects();
                            let f = eR(d),
                                g = [this.listeners.bind(f, [{ type: "keydown", listener: (a) => this.handleKeyDown(a, b, c), options: { capture: !0 } }])];
                            f6(this, bL).push(...g);
                        }
                        handleKeyDown(a, b, c) {
                            let { keyboardCodes: d = gH.keyboardCodes } = null != c ? c : {};
                            if (gJ(a, [...d.end, ...d.cancel])) {
                                a.preventDefault();
                                let b = gJ(a, d.cancel);
                                this.handleEnd(a, b);
                                return;
                            }
                            (gJ(a, d.up) ? this.handleMove("up", a) : gJ(a, d.down) && this.handleMove("down", a), gJ(a, d.left) ? this.handleMove("left", a) : gJ(a, d.right) && this.handleMove("right", a));
                        }
                        handleEnd(a, b) {
                            (this.manager.actions.stop({ event: a, canceled: b }), this.cleanup());
                        }
                        handleMove(a, b) {
                            var c, d;
                            let { shape: e } = this.manager.dragOperation,
                                f = b.shiftKey ? 5 : 1,
                                g = { x: 0, y: 0 },
                                h = null != (d = null == (c = this.options) ? void 0 : c.offset) ? d : gH.offset;
                            if (("number" == typeof h && (h = { x: h, y: h }), e)) {
                                switch (a) {
                                    case "up":
                                        g = { x: 0, y: -h.y * f };
                                        break;
                                    case "down":
                                        g = { x: 0, y: h.y * f };
                                        break;
                                    case "left":
                                        g = { x: -h.x * f, y: 0 };
                                        break;
                                    case "right":
                                        g = { x: h.x * f, y: 0 };
                                }
                                (g.x || g.y) && (b.preventDefault(), this.manager.actions.move({ event: b, by: g }));
                            }
                        }
                        sideEffects() {
                            let a = this.manager.registry.plugins.get(gC);
                            (null == a ? void 0 : a.disabled) === !1 &&
                                (a.disable(),
                                f6(this, bL).push(() => {
                                    a.enable();
                                }));
                        }
                        cleanup() {
                            (f6(this, bL).forEach((a) => a()), f8(this, bL, []));
                        }
                        destroy() {
                            (this.cleanup(), this.listeners.clear());
                        }
                    };
                function gJ(a, b) {
                    return b.includes(a.code);
                }
                ((bL = new WeakMap()), (gI.configure = d8(gI)), (gI.defaults = gH));
                var gK = class extends ev {
                    constructor() {
                        (super(...arguments), f7(this, bM));
                    }
                    onEvent(a) {
                        switch (a.type) {
                            case "pointerdown":
                                f8(this, bM, eT(a));
                                break;
                            case "pointermove":
                                if (!f6(this, bM)) return;
                                let { x: b, y: c } = eT(a),
                                    d = { x: b - f6(this, bM).x, y: c - f6(this, bM).y },
                                    { tolerance: e } = this.options;
                                if (e && dE(d, e)) return void this.abort();
                                dE(d, this.options.value) && this.activate(a);
                                break;
                            case "pointerup":
                                this.abort();
                        }
                    }
                    abort() {
                        f8(this, bM, void 0);
                    }
                };
                bM = new WeakMap();
                var gL = class extends ev {
                    constructor() {
                        (super(...arguments), f7(this, bN), f7(this, bO));
                    }
                    onEvent(a) {
                        switch (a.type) {
                            case "pointerdown":
                                (f8(this, bO, eT(a)),
                                    f8(
                                        this,
                                        bN,
                                        setTimeout(() => this.activate(a), this.options.value),
                                    ));
                                break;
                            case "pointermove":
                                if (!f6(this, bO)) return;
                                let { x: b, y: c } = eT(a);
                                dE({ x: b - f6(this, bO).x, y: c - f6(this, bO).y }, this.options.tolerance) && this.abort();
                                break;
                            case "pointerup":
                                this.abort();
                        }
                    }
                    abort() {
                        f6(this, bN) && (clearTimeout(f6(this, bN)), f8(this, bO, void 0), f8(this, bN, void 0));
                    }
                };
                ((bN = new WeakMap()), (bO = new WeakMap()));
                var gM = class {};
                ((gM.Delay = gL), (gM.Distance = gK));
                var gN = Object.freeze({
                        activationConstraints(a, b) {
                            var c;
                            let { pointerType: d, target: e } = a;
                            if (!("mouse" === d && fE(e) && (b.handle === e || (null == (c = b.handle) ? void 0 : c.contains(e)))))
                                return "touch" === d
                                    ? [new gM.Delay({ value: 250, tolerance: 5 })]
                                    : (function (a) {
                                            var b;
                                            if (!fE(a)) return !1;
                                            let { tagName: c } = a;
                                            return "INPUT" === c || "TEXTAREA" === c || ((b = a).hasAttribute("contenteditable") && "false" !== b.getAttribute("contenteditable"));
                                        })(e) && !a.defaultPrevented
                                      ? [new gM.Delay({ value: 200, tolerance: 0 })]
                                      : [new gM.Delay({ value: 200, tolerance: 10 }), new gM.Distance({ value: 5 })];
                        },
                        preventActivation(a, b) {
                            var c;
                            let { target: d } = a;
                            if (d === b.element || d === b.handle || !fE(d) || (null == (c = b.handle) ? void 0 : c.contains(d))) return !1;
                            let e = d.closest(`
    input:not([disabled]),
    select:not([disabled]),
    textarea:not([disabled]),
    button:not([disabled]),
    a[href],
    [contenteditable]:not([contenteditable="false"])
  `);
                            return e !== b.element && !!e;
                        },
                    }),
                    gO = class extends et {
                        constructor(a, b) {
                            (super(a),
                                (this.manager = a),
                                (this.options = b),
                                f7(this, bP, new Set()),
                                (this.listeners = new e1()),
                                (this.latest = { event: void 0, coordinates: void 0 }),
                                (this.handleMove = () => {
                                    let { event: a, coordinates: b } = this.latest;
                                    a && b && this.manager.actions.move({ event: a, to: b });
                                }),
                                (this.handleCancel = this.handleCancel.bind(this)),
                                (this.handlePointerUp = this.handlePointerUp.bind(this)),
                                (this.handleKeyDown = this.handleKeyDown.bind(this)));
                        }
                        activationConstraints(a, b, c = this.options) {
                            let { activationConstraints: d = gN.activationConstraints } = null != c ? c : {};
                            return "function" == typeof d ? d(a, b) : d;
                        }
                        bind(a, b = this.options) {
                            return cJ(() => {
                                var c, d;
                                let e = new AbortController(),
                                    { signal: f } = e,
                                    g = (c) => {
                                        (function (a) {
                                            if (!a) return !1;
                                            let { PointerEvent: b } = eN(a.target);
                                            return a instanceof b;
                                        })(c) && this.handlePointerDown(c, a, b);
                                    },
                                    h = [null != (c = a.handle) ? c : a.element];
                                for (let c of ((null == b ? void 0 : b.activatorElements) && (h = Array.isArray(b.activatorElements) ? b.activatorElements : b.activatorElements(a)), h)) {
                                    c && (!(d = c.ownerDocument.defaultView) || gR.has(d) || (d.addEventListener("touchmove", gQ, { capture: !1, passive: !1 }), gR.add(d)), c.addEventListener("pointerdown", g, { signal: f }));
                                }
                                return () => e.abort();
                            });
                        }
                        handlePointerDown(a, b, c) {
                            if (this.disabled || !a.isPrimary || 0 !== a.button || !fE(a.target) || b.disabled || "sensor" in a || !this.manager.dragOperation.status.idle) return;
                            let { preventActivation: d = gN.preventActivation } = null != c ? c : {};
                            if (null == d ? void 0 : d(a, b)) return;
                            let { target: e } = a,
                                f = eP(e) && e.draggable && "true" === e.getAttribute("draggable"),
                                g = fo(b.element),
                                { x: h, y: i } = eT(a);
                            this.initialCoordinates = { x: h * g.scaleX + g.x, y: i * g.scaleY + g.y };
                            let j = this.activationConstraints(a, b, c);
                            a.sensor = this;
                            let k = new eu(j, (a) => this.handleStart(b, a));
                            ((k.signal.onabort = () => this.handleCancel(a)), k.onEvent(a), (this.controller = k));
                            let l = (function a(b = document, c = new Set()) {
                                    if (c.has(b)) return [];
                                    c.add(b);
                                    let d = [b];
                                    for (let e of Array.from(b.querySelectorAll("iframe, frame")))
                                        try {
                                            let b = e.contentDocument;
                                            b && !c.has(b) && d.push(...a(b, c));
                                        } catch (a) {}
                                    try {
                                        let e = b.defaultView;
                                        if (e && e !== window.top) {
                                            let f = e.parent;
                                            f && f.document && f.document !== b && d.push(...a(f.document, c));
                                        }
                                    } catch (a) {}
                                    return d;
                                })(),
                                m = this.listeners.bind(l, [
                                    { type: "pointermove", listener: (a) => this.handlePointerMove(a, b) },
                                    { type: "pointerup", listener: this.handlePointerUp, options: { capture: !0 } },
                                    { type: "pointercancel", listener: this.handleCancel },
                                    { type: "dragstart", listener: f ? this.handleCancel : gP, options: { capture: !0 } },
                                ]),
                                n = () => {
                                    (m(), (this.initialCoordinates = void 0));
                                };
                            f6(this, bP).add(n);
                        }
                        handlePointerMove(a, b) {
                            var c, d;
                            if ((null == (c = this.controller) ? void 0 : c.activated) === !1) {
                                null == (d = this.controller) || d.onEvent(a);
                                return;
                            }
                            if (this.manager.dragOperation.status.dragging) {
                                let c = eT(a),
                                    d = fo(b.element);
                                ((c.x = c.x * d.scaleX + d.x), (c.y = c.y * d.scaleY + d.y), a.preventDefault(), a.stopPropagation(), (this.latest.event = a), (this.latest.coordinates = c), fg.schedule(this.handleMove));
                            }
                        }
                        handlePointerUp(a) {
                            let { status: b } = this.manager.dragOperation;
                            if (!b.idle) {
                                (a.preventDefault(), a.stopPropagation());
                                let c = !b.initialized;
                                this.manager.actions.stop({ event: a, canceled: c });
                            }
                            this.cleanup();
                        }
                        handleKeyDown(a) {
                            "Escape" === a.key && (a.preventDefault(), this.handleCancel(a));
                        }
                        handleStart(a, b) {
                            let { manager: c, initialCoordinates: d } = this;
                            if (!d || !c.dragOperation.status.idle || b.defaultPrevented) return;
                            if (c.actions.start({ coordinates: d, event: b, source: a }).signal.aborted) return this.cleanup();
                            b.preventDefault();
                            let e = eR(b.target).body;
                            try {
                                e.setPointerCapture(b.pointerId);
                            } catch (a) {
                                this.handleCancel(b);
                                return;
                            }
                            let f = fE(b.target) ? [b.target, e] : e,
                                g = this.listeners.bind(f, [
                                    { type: "touchmove", listener: gP, options: { passive: !1 } },
                                    { type: "click", listener: gP },
                                    { type: "contextmenu", listener: gP },
                                    { type: "keydown", listener: this.handleKeyDown },
                                ]);
                            f6(this, bP).add(g);
                        }
                        handleCancel(a) {
                            let { dragOperation: b } = this.manager;
                            (b.status.initialized && this.manager.actions.stop({ event: a, canceled: !0 }), this.cleanup());
                        }
                        cleanup() {
                            let { controller: a } = this;
                            ((this.controller = void 0), a && !a.signal.aborted && a.abort(), (this.latest = { event: void 0, coordinates: void 0 }), f6(this, bP).forEach((a) => a()), f6(this, bP).clear());
                        }
                        destroy() {
                            (this.cleanup(), this.listeners.clear());
                        }
                    };
                function gP(a) {
                    a.preventDefault();
                }
                function gQ() {}
                ((bP = new WeakMap()), (gO.configure = d8(gO)), (gO.defaults = gN));
                var gR = new WeakSet(),
                    gS = { modifiers: [], plugins: [ge, gC, gh, gt, gF], sensors: [gO, gI] },
                    gT = class extends eB {
                        constructor(a = {}) {
                            let b = eA(a.plugins, gS.plugins);
                            super(fW(fV({}, a), { plugins: [gE, gz, gg, ...b], sensors: eA(a.sensors, gS.sensors), modifiers: eA(a.modifiers, gS.modifiers) }));
                        }
                    },
                    gU = class extends ((bS = ej), (bR = [c8]), (bQ = [c8]), bS) {
                        constructor(a, b) {
                            var { element: c, effects: d = () => [], handle: e } = a;
                            (super(
                                fV(
                                    {
                                        effects: () => [
                                            ...d(),
                                            () => {
                                                var a, b;
                                                let { manager: c } = this;
                                                if (!c) return;
                                                let d = (null != (b = null == (a = this.sensors) ? void 0 : a.map(d9)) ? b : [...c.sensors]).map((a) => {
                                                    let b = a instanceof et ? a : c.registry.register(a.plugin),
                                                        d = a instanceof et ? void 0 : a.options;
                                                    return b.bind(this, d);
                                                });
                                                return function () {
                                                    d.forEach((a) => a());
                                                };
                                            },
                                        ],
                                    },
                                    fY(a, ["element", "effects", "handle"]),
                                ),
                                b,
                            ),
                                f7(this, bU, f2(bT, 8, this)),
                                f2(bT, 11, this),
                                f7(this, bV, f2(bT, 12, this)),
                                f2(bT, 15, this),
                                (this.element = c),
                                (this.handle = e));
                        }
                    };
                ((bT = fZ(bS)), (bU = new WeakMap()), (bV = new WeakMap()), f3(bT, 4, "handle", bR, gU, bU), f3(bT, 4, "element", bQ, gU, bV), f1(bT, gU));
                var gV = class extends ((bY = ek), (bX = [c8]), (bW = [c8]), bY) {
                    constructor(a, b) {
                        var { element: c, effects: d = () => [] } = a,
                            e = fY(a, ["element", "effects"]);
                        let { collisionDetector: f = fI } = e,
                            g = (a) => {
                                let { manager: b, element: c } = this;
                                if (!c || null === a) {
                                    this.shape = void 0;
                                    return;
                                }
                                if (!b) return;
                                let d = new fB(c),
                                    e = cr(() => this.shape);
                                return d && (null == e ? void 0 : e.equals(d)) ? e : ((this.shape = d), d);
                            },
                            h = cA(!1);
                        (super(
                            fW(fV({}, e), {
                                collisionDetector: f,
                                effects: () => [
                                    ...d(),
                                    () => {
                                        let { element: a, manager: b } = this;
                                        if (!b) return;
                                        let { dragOperation: c } = b,
                                            { source: d } = c;
                                        h.value = !!(d && c.status.initialized && a && !this.disabled && this.accepts(d));
                                    },
                                    () => {
                                        let { element: a } = this;
                                        if (h.value && a) {
                                            let b = new fa(a, g);
                                            return () => {
                                                (b.disconnect(), (this.shape = void 0));
                                            };
                                        }
                                    },
                                    () => {
                                        var a;
                                        if (null == (a = this.manager) ? void 0 : a.dragOperation.status.initialized)
                                            return () => {
                                                this.shape = void 0;
                                            };
                                    },
                                ],
                            }),
                            b,
                        ),
                            f7(this, b2),
                            f7(this, b$, f2(bZ, 8, this)),
                            f2(bZ, 11, this),
                            f7(this, b3, f2(bZ, 12, this)),
                            f2(bZ, 15, this),
                            (this.element = c),
                            (this.refreshShape = () => g()));
                    }
                    set element(a) {
                        f8(this, b2, a, b1);
                    }
                    get element() {
                        var a;
                        return null != (a = this.proxy) ? a : f6(this, b2, b0);
                    }
                };
                ((bZ = fZ(bY)), (b$ = new WeakMap()), (b2 = new WeakSet()), (b3 = new WeakMap()), (b0 = (b_ = f3(bZ, 20, "#element", bX, b2, b$)).get), (b1 = b_.set), f3(bZ, 4, "proxy", bW, gV, b3), f1(bZ, gV));
                var gW = c(23312);
                function gX(a) {
                    var b;
                    if (null != a) return null != a && "object" == typeof a && "current" in a ? (null != (b = a.current) ? b : void 0) : a;
                }
                var gY = "undefined" != typeof window && void 0 !== window.document && void 0 !== window.document.createElement ? ci.useLayoutEffect : ci.useEffect;
                function gZ(a, b) {
                    a();
                }
                function g$(a) {
                    let b = (0, ci.useRef)(a);
                    return (
                        gY(() => {
                            b.current = a;
                        }, [a]),
                        b
                    );
                }
                function g_(a, b, c = ci.useEffect, d = Object.is) {
                    let e = (0, ci.useRef)(a);
                    c(() => {
                        let c = e.current;
                        d(a, c) || ((e.current = a), b(a, c));
                    }, [b, a]);
                }
                function g0(a, b) {
                    let c = (0, ci.useRef)(gX(a));
                    gY(() => {
                        let d = gX(a);
                        d !== c.current && ((c.current = d), b(d));
                    });
                }
                (Object.defineProperties, Object.getOwnPropertyDescriptors);
                var g1 = Object.getOwnPropertySymbols,
                    g2 = Object.prototype.hasOwnProperty,
                    g3 = Object.prototype.propertyIsEnumerable,
                    g4 = new gT(),
                    g5 = (0, ci.createContext)(g4),
                    g6 = (0, ci.memo)(
                        (0, ci.forwardRef)(({ children: a }, b) => {
                            let [c, d] = (0, ci.useState)(0),
                                e = (0, ci.useRef)(null),
                                f = (0, ci.useRef)(null),
                                g = (0, ci.useMemo)(
                                    () => ({
                                        renderer: {
                                            get rendering() {
                                                var a;
                                                return null != (a = e.current) ? a : Promise.resolve();
                                            },
                                        },
                                        trackRendering(a) {
                                            (e.current ||
                                                (e.current = new Promise((a) => {
                                                    f.current = a;
                                                })),
                                                (0, ci.startTransition)(() => {
                                                    (a(), d((a) => a + 1));
                                                }));
                                        },
                                    }),
                                    [],
                                );
                            return (
                                gY(() => {
                                    var a;
                                    (null == (a = f.current) || a.call(f), (e.current = null));
                                }, [a, c]),
                                (0, ci.useImperativeHandle)(b, () => g),
                                null
                            );
                        }),
                    ),
                    g7 = [void 0, c7];
                function g8(a) {
                    var { children: b, onCollision: c, onBeforeDragStart: d, onDragStart: e, onDragMove: f, onDragOver: g, onDragEnd: h } = a,
                        i = ((a, b) => {
                            var c = {};
                            for (var d in a) g2.call(a, d) && 0 > b.indexOf(d) && (c[d] = a[d]);
                            if (null != a && g1) for (var d of g1(a)) 0 > b.indexOf(d) && g3.call(a, d) && (c[d] = a[d]);
                            return c;
                        })(a, ["children", "onCollision", "onBeforeDragStart", "onDragStart", "onDragMove", "onDragOver", "onDragEnd"]);
                    let j = (0, ci.useRef)(null),
                        { plugins: k, modifiers: l, sensors: m } = i,
                        n = eA(k, gS.plugins),
                        o = eA(m, gS.sensors),
                        p = eA(l, gS.modifiers),
                        q = g$(d),
                        r = g$(e),
                        s = g$(g),
                        t = g$(f),
                        u = g$(h),
                        v = g$(c),
                        w = (function (a) {
                            let b = (0, ci.useRef)(null);
                            return (
                                b.current || (b.current = a()),
                                (0, ci.useInsertionEffect)(
                                    () => () => {
                                        var a;
                                        return null == (a = b.current) ? void 0 : a.destroy();
                                    },
                                    [],
                                ),
                                b.current
                            );
                        })(() => {
                            var a;
                            return null != (a = i.manager) ? a : new gT(i);
                        });
                    return (
                        (0, ci.useEffect)(() => {
                            if (!j.current) throw Error("Renderer not found");
                            let { renderer: a, trackRendering: b } = j.current,
                                { monitor: c } = w;
                            w.renderer = a;
                            let d = [
                                c.addEventListener("beforedragstart", (a) => {
                                    let c = q.current;
                                    c && b(() => c(a, w));
                                }),
                                c.addEventListener("dragstart", (a) => {
                                    var b;
                                    return null == (b = r.current) ? void 0 : b.call(r, a, w);
                                }),
                                c.addEventListener("dragover", (a) => {
                                    let c = s.current;
                                    c && b(() => c(a, w));
                                }),
                                c.addEventListener("dragmove", (a) => {
                                    let c = t.current;
                                    c && b(() => c(a, w));
                                }),
                                c.addEventListener("dragend", (a) => {
                                    let c = u.current;
                                    c && b(() => c(a, w));
                                }),
                                c.addEventListener("collision", (a) => {
                                    var b;
                                    return null == (b = v.current) ? void 0 : b.call(v, a, w);
                                }),
                            ];
                            return () => d.forEach((a) => a());
                        }, [w]),
                        g_(n, () => w && (w.plugins = n), ...g7),
                        g_(o, () => w && (w.sensors = o), ...g7),
                        g_(p, () => w && (w.modifiers = p), ...g7),
                        (0, ch.jsxs)(g5.Provider, { value: w, children: [(0, ch.jsx)(g6, { ref: j, children: b }), b] })
                    );
                }
                var g9 = Object.create,
                    ha = Object.defineProperty,
                    hb = Object.getOwnPropertyDescriptor,
                    hc = (a, b) => ((b = Symbol[a]) ? b : Symbol.for("Symbol." + a)),
                    hd = (a) => {
                        throw TypeError(a);
                    },
                    he = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"],
                    hf = (a) => (void 0 !== a && "function" != typeof a ? hd("Function expected") : a),
                    hg = (a, b, c, d, e) => ({ kind: he[a], name: b, metadata: d, addInitializer: (a) => (c._ ? hd("Already initialized") : e.push(hf(a || null))) }),
                    hh = (a, b, c, d, e, f) => {
                        for (var g, h, i, j = 7 & b, k = he[j + 5], l = a[2] || (a[2] = []), m = hb((e = e.prototype), c), n = d.length - 1; n >= 0; n--) (((i = hg(j, c, (h = {}), a[3], l)).static = !1), (i.private = !1), ((i.access = { has: (a) => c in a }).get = (a) => a[c]), (g = (0, d[n])(m[k], i)), (h._ = 1), hf(g) && (m[k] = g));
                        return (m && ha(e, c, m), e);
                    },
                    hi = (a, b, c) => b.has(a) || hd("Cannot " + c),
                    hj = class a {
                        constructor(a, b) {
                            ((this.x = a), (this.y = b));
                        }
                        static delta(b, c) {
                            return new a(b.x - c.x, b.y - c.y);
                        }
                        static distance(a, b) {
                            return Math.hypot(a.x - b.x, a.y - b.y);
                        }
                        static equals(a, b) {
                            return a.x === b.x && a.y === b.y;
                        }
                        static from({ x: b, y: c }) {
                            return new a(b, c);
                        }
                    },
                    hk = class extends ((b6 = dc), (b5 = [c9]), (b4 = [c9]), b6) {
                        constructor(a) {
                            (super(hj.from(a), (a, b) => hj.equals(a, b)),
                                ((a, b, c, d) => {
                                    for (var e = 0, f = a[b >> 1], g = f && f.length; e < g; e++) f[e].call(c);
                                })(b8, 5, this),
                                ((a, b, c) => (b.has(a) ? hd("Cannot add the same private member more than once") : b instanceof WeakSet ? b.add(a) : b.set(a, c)))(this, b7, 0),
                                (this.velocity = { x: 0, y: 0 }));
                        }
                        get delta() {
                            return hj.delta(this.current, this.initial);
                        }
                        get direction() {
                            let { current: a, previous: b } = this;
                            if (!b) return null;
                            let c = { x: a.x - b.x, y: a.y - b.y };
                            return c.x || c.y ? (Math.abs(c.x) > Math.abs(c.y) ? (c.x > 0 ? "right" : "left") : c.y > 0 ? "down" : "up") : null;
                        }
                        get current() {
                            return super.current;
                        }
                        set current(a) {
                            let b,
                                { current: c } = this,
                                d = hj.from(a),
                                e = { x: d.x - c.x, y: d.y - c.y },
                                f = Date.now(),
                                g = f - (hi(this, (b = b7), "read from private field"), b.get(this)),
                                h = (a) => Math.round((a / g) * 100);
                            cq(() => {
                                let a;
                                (hi(this, (a = b7), "write to private field"), a.set(this, f), (this.velocity = { x: h(e.x), y: h(e.y) }), (super.current = d));
                            });
                        }
                        reset(a = this.defaultValue) {
                            (super.reset(hj.from(a)), (this.velocity = { x: 0, y: 0 }));
                        }
                    };
                ((b8 = ((a) => {
                    var b;
                    return [, , , g9(null != (b = null == a ? void 0 : a[hc("metadata")]) ? b : null)];
                })(b6)),
                    (b7 = new WeakMap()),
                    hh(b8, 2, "delta", b5, hk),
                    hh(b8, 2, "direction", b4, hk),
                    (g = b8),
                    ((a, b, c) => (b in a ? ha(a, b, { enumerable: !0, configurable: !0, writable: !0, value: c }) : (a[b] = c)))(hk, hc("metadata"), g[3]));
                var hl = ((a) => ((a.Horizontal = "x"), (a.Vertical = "y"), a))(hl || {});
                Object.values(hl);
                var hm = Object.create,
                    hn = Object.defineProperty,
                    ho = Object.defineProperties,
                    hp = Object.getOwnPropertyDescriptor,
                    hq = Object.getOwnPropertyDescriptors,
                    hr = Object.getOwnPropertySymbols,
                    hs = Object.prototype.hasOwnProperty,
                    ht = Object.prototype.propertyIsEnumerable,
                    hu = (a) => {
                        throw TypeError(a);
                    },
                    hv = (a, b, c) => (b in a ? hn(a, b, { enumerable: !0, configurable: !0, writable: !0, value: c }) : (a[b] = c)),
                    hw = (a, b) => {
                        for (var c in b || (b = {})) hs.call(b, c) && hv(a, c, b[c]);
                        if (hr) for (var c of hr(b)) ht.call(b, c) && hv(a, c, b[c]);
                        return a;
                    },
                    hx = (a, b) => ho(a, hq(b)),
                    hy = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"],
                    hz = (a) => (void 0 !== a && "function" != typeof a ? hu("Function expected") : a),
                    hA = (a, b, c, d, e) => ({ kind: hy[a], name: b, metadata: d, addInitializer: (a) => (c._ ? hu("Already initialized") : e.push(hz(a || null))) }),
                    hB = (a, b, c, d) => {
                        for (var e = 0, f = a[b >> 1], g = f && f.length; e < g; e++) 1 & b ? f[e].call(c) : (d = f[e].call(c, d));
                        return d;
                    },
                    hC = (a, b, c, d, e, f) => {
                        for (
                            var g,
                                h,
                                i,
                                j,
                                k,
                                l = 7 & b,
                                m = a.length + 1,
                                n = hy[l + 5],
                                o = (a[m - 1] = []),
                                p = a[m] || (a[m] = []),
                                q =
                                    ((e = e.prototype),
                                    hp(
                                        {
                                            get [c]() {
                                                return hE(this, f);
                                            },
                                            set [c](x) {
                                                return hG(this, f, x);
                                            },
                                        },
                                        c,
                                    )),
                                r = d.length - 1;
                            r >= 0;
                            r--
                        )
                            (((j = hA(l, c, (i = {}), a[3], p)).static = !1), (j.private = !1), ((k = j.access = { has: (a) => c in a }).get = (a) => a[c]), (k.set = (a, b) => (a[c] = b)), (h = (0, d[r])({ get: q.get, set: q.set }, j)), (i._ = 1), void 0 === h ? hz(h) && (q[n] = h) : "object" != typeof h || null === h ? hu("Object expected") : (hz((g = h.get)) && (q.get = g), hz((g = h.set)) && (q.set = g), hz((g = h.init)) && o.unshift(g)));
                        return (q && hn(e, c, q), e);
                    },
                    hD = (a, b, c) => b.has(a) || hu("Cannot " + c),
                    hE = (a, b, c) => (hD(a, b, "read from private field"), b.get(a)),
                    hF = (a, b, c) => (b.has(a) ? hu("Cannot add the same private member more than once") : b instanceof WeakSet ? b.add(a) : b.set(a, c)),
                    hG = (a, b, c, d) => (hD(a, b, "write to private field"), b.set(a, c), c);
                function hH(a) {
                    return a instanceof h6 || a instanceof h5;
                }
                var hI = class extends ea {
                        constructor(a) {
                            super(a);
                            let b = cJ(() => {
                                    let { dragOperation: b } = a;
                                    if (fF(b.activatorEvent) && hH(b.source) && b.status.initialized) {
                                        let b = a.registry.plugins.get(gz);
                                        if (b) return (b.disable(), () => b.enable());
                                    }
                                }),
                                c = a.monitor.addEventListener("dragmove", (a, b) => {
                                    queueMicrotask(() => {
                                        if (this.disabled || a.defaultPrevented || !a.nativeEvent) return;
                                        let { dragOperation: c } = b;
                                        if (!fF(a.nativeEvent) || !hH(c.source) || !c.shape) return;
                                        let { actions: d, collisionObserver: e, registry: f } = b,
                                            { by: g } = a;
                                        if (!g) return;
                                        let h = (function (a) {
                                                let { x: b, y: c } = a;
                                                return b > 0 ? "right" : b < 0 ? "left" : c > 0 ? "down" : c < 0 ? "up" : void 0;
                                            })(g),
                                            { source: i, target: j } = c,
                                            { center: k } = c.shape.current,
                                            l = [],
                                            m = [];
                                        (cq(() => {
                                            for (let a of f.droppables) {
                                                let { id: b } = a;
                                                if (!a.accepts(i) || (b === (null == j ? void 0 : j.id) && hH(a)) || !a.element) continue;
                                                let c = a.shape,
                                                    d = new fB(a.element, { getBoundingClientRect: (a) => eS(a, void 0, 0.2) });
                                                d.height && d.width && (("down" == h && k.y + 10 < d.center.y) || ("up" == h && k.y - 10 > d.center.y) || ("left" == h && k.x - 10 > d.center.x) || ("right" == h && k.x + 10 < d.center.x)) && (l.push(a), (a.shape = d), m.push(() => (a.shape = c)));
                                            }
                                        }),
                                            a.preventDefault(),
                                            e.disable());
                                        let n = e.computeCollisions(l, fJ);
                                        cq(() => m.forEach((a) => a()));
                                        let [o] = n;
                                        if (!o) return;
                                        let { id: p } = o,
                                            { index: q, group: r } = i.sortable;
                                        d.setDropTarget(p).then(() => {
                                            let { source: a, target: b, shape: f } = c;
                                            if (!a || !hH(a) || !f) return;
                                            let { index: g, group: h, target: i } = a.sortable,
                                                j = q !== g || r !== h,
                                                k = j ? i : null == b ? void 0 : b.element;
                                            if (!k) return;
                                            fu(k);
                                            let l = new fB(k);
                                            if (!l) return;
                                            let m = dC.delta(l, dC.from(f.current.boundingRectangle), a.alignment);
                                            (d.move({ by: m }), j ? d.setDropTarget(a.id).then(() => e.enable()) : e.enable());
                                        });
                                    });
                                });
                            this.destroy = () => {
                                (c(), b());
                            };
                        }
                    },
                    hJ = Object.defineProperty,
                    hK = Object.defineProperties,
                    hL = Object.getOwnPropertyDescriptors,
                    hM = Object.getOwnPropertySymbols,
                    hN = Object.prototype.hasOwnProperty,
                    hO = Object.prototype.propertyIsEnumerable,
                    hP = (a, b, c) => (b in a ? hJ(a, b, { enumerable: !0, configurable: !0, writable: !0, value: c }) : (a[b] = c)),
                    hQ = (a, b) => {
                        for (var c in b || (b = {})) hN.call(b, c) && hP(a, c, b[c]);
                        if (hM) for (var c of hM(b)) hO.call(b, c) && hP(a, c, b[c]);
                        return a;
                    },
                    hR = (a, b) => hK(a, hL(b));
                function hS(a, b, c) {
                    if (b === c) return a;
                    let d = a.slice();
                    return (d.splice(c, 0, d.splice(b, 1)[0]), d);
                }
                function hT(a, b) {
                    let c = String(b);
                    return Object.prototype.hasOwnProperty.call(a, c) ? c : void 0;
                }
                function hU(a) {
                    return "initialIndex" in a && "number" == typeof a.initialIndex && "index" in a && "number" == typeof a.index;
                }
                function hV(a) {
                    let b = new Map();
                    for (let [, c] of a) for (let a of c) b.set(a.id, a.index);
                    return b;
                }
                function hW(a, b, c) {
                    var d;
                    for (let [e, f] of b)
                        for (let b of f) {
                            let f = a.get(b.id);
                            if (b.index !== f || b.group !== e || !(null == (d = c.get(e)) ? void 0 : d.has(b))) return !0;
                        }
                    return !1;
                }
                var hX = "__default__";
                function hY(a, b, c, d) {
                    c.insertAdjacentElement(d < b ? "afterend" : "beforebegin", a);
                }
                function hZ(a, b) {
                    return a.index - b.index;
                }
                function h$(a, b) {
                    return a.initialIndex - b.initialIndex;
                }
                function h_(a, b = hZ) {
                    return Array.from(a).sort(b);
                }
                var h0 = [
                        hI,
                        class extends ea {
                            constructor(a) {
                                super(a);
                                let b = () => {
                                        let b = new Map();
                                        for (let c of a.registry.droppables)
                                            if (c instanceof h6) {
                                                let { sortable: a } = c,
                                                    { group: d } = a,
                                                    e = b.get(d);
                                                (e || ((e = new Set()), b.set(d, e)), e.add(a));
                                            }
                                        return b;
                                    },
                                    c = [
                                        a.monitor.addEventListener("dragover", (a, c) => {
                                            if (this.disabled) return;
                                            let { dragOperation: d } = c,
                                                { source: e, target: f } = d;
                                            if (!hH(e) || !hH(f) || e.sortable === f.sortable) return;
                                            let g = b(),
                                                h = hV(g),
                                                i = e.sortable.group === f.sortable.group,
                                                j = g.get(e.sortable.group),
                                                k = i ? j : g.get(f.sortable.group);
                                            j &&
                                                k &&
                                                queueMicrotask(() => {
                                                    a.defaultPrevented ||
                                                        c.renderer.rendering.then(() => {
                                                            var d, l;
                                                            if (hW(h, g, b())) return;
                                                            let m = e.sortable.element,
                                                                n = f.sortable.element;
                                                            if (!n || !m || (!i && f.id === e.sortable.group)) return;
                                                            let o = h_(j),
                                                                p = i ? o : h_(k),
                                                                q = null != (d = e.sortable.group) ? d : hX,
                                                                r = null != (l = f.sortable.group) ? l : hX,
                                                                s = { [q]: o, [r]: p },
                                                                t = (function (a, b, c) {
                                                                    var d, e;
                                                                    let f,
                                                                        g,
                                                                        { source: h, target: i, canceled: j } = b.operation;
                                                                    if (!h || !i || j) return ("preventDefault" in b && b.preventDefault(), a);
                                                                    let k = (a, b) => a === b || (null !== a && "object" == typeof a && "id" in a && a.id === b);
                                                                    if (Array.isArray(a)) {
                                                                        let d = a.findIndex((a) => k(a, h.id)),
                                                                            e = a.findIndex((a) => k(a, i.id));
                                                                        if (-1 === d || -1 === e) {
                                                                            if (hU(h)) {
                                                                                let d = h.initialIndex,
                                                                                    e = h.index;
                                                                                return d === e || d < 0 || d >= a.length ? ("preventDefault" in b && b.preventDefault(), a) : c(a, d, e);
                                                                            }
                                                                            return a;
                                                                        }
                                                                        if (!j && "index" in h && "number" == typeof h.index) {
                                                                            let b = h.index;
                                                                            if (b !== d) return c(a, d, b);
                                                                        }
                                                                        return c(a, d, e);
                                                                    }
                                                                    let l = Object.entries(a),
                                                                        m = -1,
                                                                        n = -1;
                                                                    for (let [a, b] of l) if ((-1 === m && -1 !== (m = b.findIndex((a) => k(a, h.id))) && (f = a), -1 === n && -1 !== (n = b.findIndex((a) => k(a, i.id))) && (g = a), -1 !== m && -1 !== n)) break;
                                                                    if (-1 === m && hU(h)) {
                                                                        let d = null == h.initialGroup ? void 0 : hT(a, h.initialGroup),
                                                                            e = h.initialIndex,
                                                                            f = null == h.group ? void 0 : hT(a, h.group),
                                                                            g = h.index;
                                                                        if (null == d || null == f || (d === f && e === g)) return ("preventDefault" in b && b.preventDefault(), a);
                                                                        if (d === f) return hR(hQ({}, a), { [d]: c(a[d], e, g) });
                                                                        let i = a[d][e];
                                                                        return hR(hQ({}, a), { [d]: [...a[d].slice(0, e), ...a[d].slice(e + 1)], [f]: [...a[f].slice(0, g), i, ...a[f].slice(g)] });
                                                                    }
                                                                    if (!h.manager) return a;
                                                                    let { dragOperation: o } = h.manager,
                                                                        p = null != (e = null == (d = o.shape) ? void 0 : d.current.center) ? e : o.position.current;
                                                                    if (null == g) {
                                                                        let b = hT(a, i.id);
                                                                        if (null != b) {
                                                                            let c = i.shape && p.y > i.shape.center.y ? a[b].length : 0;
                                                                            ((g = b), (n = c));
                                                                        }
                                                                    }
                                                                    if (null == f || null == g || (f === g && m === n)) {
                                                                        if (null != f && f === g && m === n && hU(h)) {
                                                                            let b = null == h.group ? void 0 : hT(a, h.group),
                                                                                d = null != h.group && b !== f,
                                                                                e = h.index !== m;
                                                                            if (d || e) {
                                                                                let d = null == h.group ? f : b;
                                                                                if (null != d) {
                                                                                    if (f === d) return hR(hQ({}, a), { [f]: c(a[f], m, h.index) });
                                                                                    let b = a[f][m];
                                                                                    return hR(hQ({}, a), { [f]: [...a[f].slice(0, m), ...a[f].slice(m + 1)], [d]: [...a[d].slice(0, h.index), b, ...a[d].slice(h.index)] });
                                                                                }
                                                                            }
                                                                        }
                                                                        return ("preventDefault" in b && b.preventDefault(), a);
                                                                    }
                                                                    if (f === g) return hR(hQ({}, a), { [f]: c(a[f], m, n) });
                                                                    let q = +!!(i.shape && Math.round(p.y) > Math.round(i.shape.center.y)),
                                                                        r = a[f][m];
                                                                    return hR(hQ({}, a), { [f]: [...a[f].slice(0, m), ...a[f].slice(m + 1)], [g]: [...a[g].slice(0, n + q), r, ...a[g].slice(n + q)] });
                                                                })(s, a, hS);
                                                            if (s === t) return;
                                                            let u = t[r].indexOf(e.sortable),
                                                                v = t[r].indexOf(f.sortable);
                                                            (c.collisionObserver.disable(),
                                                                hY(m, u, n, v),
                                                                cq(() => {
                                                                    for (let [a, b] of t[q].entries()) b.index = a;
                                                                    if (!i) for (let [a, b] of t[r].entries()) ((b.group = f.sortable.group), (b.index = a));
                                                                }),
                                                                c.actions.setDropTarget(e.id).then(() => c.collisionObserver.enable()));
                                                        });
                                                });
                                        }),
                                        a.monitor.addEventListener("dragend", (a, c) => {
                                            if (!a.canceled) return;
                                            let { dragOperation: d } = c,
                                                { source: e } = d;
                                            hH(e) &&
                                                (e.sortable.initialIndex !== e.sortable.index || e.sortable.initialGroup !== e.sortable.group) &&
                                                queueMicrotask(() => {
                                                    let a = b(),
                                                        d = hV(a),
                                                        f = a.get(e.sortable.initialGroup);
                                                    f &&
                                                        c.renderer.rendering.then(() => {
                                                            if (hW(d, a, b())) return;
                                                            let c = h_(f),
                                                                g = h_(f, h$),
                                                                h = e.sortable.element,
                                                                i = c[g.indexOf(e.sortable)],
                                                                j = null == i ? void 0 : i.element;
                                                            i &&
                                                                j &&
                                                                h &&
                                                                (hY(h, i.index, j, e.index),
                                                                cq(() => {
                                                                    for (let b of a.values()) for (let a of Array.from(b).values()) ((a.index = a.initialIndex), (a.group = a.initialGroup));
                                                                }));
                                                        });
                                                });
                                        }),
                                    ];
                                this.destroy = () => {
                                    for (let a of c) a();
                                };
                            }
                        },
                    ],
                    h1 = { duration: 250, easing: "cubic-bezier(0.25, 1, 0.5, 1)", idle: !1 };
                function h2(a) {
                    var b, c;
                    return "boolean" == typeof a ? { draggable: a, droppable: a } : { draggable: null != (b = null == a ? void 0 : a.draggable) && b, droppable: null != (c = null == a ? void 0 : a.droppable) && c };
                }
                var h3 = new de();
                ((ca = [c8]), (b9 = [c8]));
                var h4 = class {
                    constructor(a, b) {
                        (hF(this, cc, hB(cb, 8, this)),
                            hB(cb, 11, this),
                            hF(this, cd),
                            hF(this, ce),
                            hF(this, cf, hB(cb, 12, this)),
                            hB(cb, 15, this),
                            hF(this, cg),
                            (this.register = () => (
                                cq(() => {
                                    var a, b;
                                    (null == (a = this.manager) || a.registry.register(this.droppable), null == (b = this.manager) || b.registry.register(this.draggable));
                                }),
                                () => this.unregister()
                            )),
                            (this.unregister = () => {
                                cq(() => {
                                    var a, b;
                                    (null == (a = this.manager) || a.registry.unregister(this.droppable), null == (b = this.manager) || b.registry.unregister(this.draggable));
                                });
                            }),
                            (this.destroy = () => {
                                cq(() => {
                                    (this.droppable.destroy(), this.draggable.destroy());
                                });
                            }));
                        var { effects: c = () => [], disabled: d, group: e, index: f, sensors: g, type: h, transition: i = h1, plugins: j } = a,
                            k = ((a, b) => {
                                var c = {};
                                for (var d in a) hs.call(a, d) && 0 > b.indexOf(d) && (c[d] = a[d]);
                                if (null != a && hr) for (var d of hr(a)) 0 > b.indexOf(d) && ht.call(a, d) && (c[d] = a[d]);
                                return c;
                            })(a, ["effects", "disabled", "group", "index", "sensors", "type", "transition", "plugins"]);
                        let l = eA(j, h0),
                            m = h2(d);
                        ((this.droppable = new h6(hx(hw({}, k), { disabled: m.droppable }), b, this)),
                            (this.draggable = new h5(
                                hx(hw({}, k), {
                                    disabled: m.draggable,
                                    plugins: l,
                                    effects: () => [
                                        () => {
                                            var a, b, c;
                                            let d = null == (a = this.manager) ? void 0 : a.dragOperation.status;
                                            ((null == d ? void 0 : d.initializing) && this.id === (null == (c = null == (b = this.manager) ? void 0 : b.dragOperation.source) ? void 0 : c.id) && h3.clear(this.manager),
                                                (null == d ? void 0 : d.dragging) &&
                                                    h3.set(
                                                        this.manager,
                                                        this.id,
                                                        cr(() => ({ initialIndex: this.index, initialGroup: this.group })),
                                                    ));
                                        },
                                        () => {
                                            let { index: a, group: b, manager: c } = this,
                                                d = hE(this, ce),
                                                e = hE(this, cd);
                                            (a !== d || b !== e) && (hG(this, ce, a), hG(this, cd, b), this.animate());
                                        },
                                        () => {
                                            var a, b;
                                            let { target: c } = this,
                                                { isDragSource: d } = this.draggable;
                                            "move" === (null != (b = null == (a = this.draggable.pluginConfig(gt)) ? void 0 : a.feedback) ? b : "default") && d && (this.droppable.disabled = !c);
                                        },
                                        ...c(),
                                    ],
                                    type: h,
                                    sensors: g,
                                }),
                                b,
                                this,
                            )),
                            hG(this, cg, k.element),
                            (this.manager = b),
                            (this.index = f),
                            hG(this, ce, f),
                            (this.group = e),
                            hG(this, cd, e),
                            (this.type = h),
                            (this.transition = i));
                    }
                    get initialIndex() {
                        var a, b;
                        return null != (b = null == (a = h3.get(this.manager, this.id)) ? void 0 : a.initialIndex) ? b : this.index;
                    }
                    get initialGroup() {
                        var a, b;
                        return null != (b = null == (a = h3.get(this.manager, this.id)) ? void 0 : a.initialGroup) ? b : this.group;
                    }
                    animate() {
                        cr(() => {
                            let { manager: a, transition: b } = this,
                                { shape: c } = this.droppable;
                            if (!a) return;
                            let { idle: d } = a.dragOperation.status;
                            c &&
                                b &&
                                (!d || b.idle) &&
                                a.renderer.rendering.then(() => {
                                    let { element: d } = this;
                                    if (!d) return;
                                    for (let a of d.getAnimations()) "transitionProperty" in a && ("transform" === a.transitionProperty || "translate" === a.transitionProperty || "scale" === a.transitionProperty) && a.cancel();
                                    let e = this.refreshShape();
                                    if (!e) return;
                                    let f = { x: c.boundingRectangle.left - e.boundingRectangle.left, y: c.boundingRectangle.top - e.boundingRectangle.top },
                                        { translate: g } = fk(d),
                                        h = fx(d, g, !1),
                                        i = fx(d, g);
                                    if (f.x || f.y) {
                                        let c = eZ(eN(d)) ? hx(hw({}, b), { duration: 0 }) : b;
                                        fw({ element: d, keyframes: { translate: [`${h.x + f.x}px ${h.y + f.y}px ${h.z}`, `${i.x}px ${i.y}px ${i.z}`] }, options: c }).then(() => {
                                            a.dragOperation.status.dragging || (this.droppable.shape = void 0);
                                        });
                                    }
                                });
                        });
                    }
                    get manager() {
                        return this.draggable.manager;
                    }
                    set manager(a) {
                        cq(() => {
                            ((this.draggable.manager = a), (this.droppable.manager = a));
                        });
                    }
                    set element(a) {
                        cq(() => {
                            let b = hE(this, cg),
                                c = this.droppable.element,
                                d = this.draggable.element;
                            ((c && c !== b) || (this.droppable.element = a), (d && d !== b) || (this.draggable.element = a), hG(this, cg, a));
                        });
                    }
                    get element() {
                        var a, b;
                        let c = hE(this, cg);
                        if (c) return null != (b = null != (a = e0.get(c)) ? a : c) ? b : this.droppable.element;
                    }
                    set target(a) {
                        this.droppable.element = a;
                    }
                    get target() {
                        return this.droppable.element;
                    }
                    set source(a) {
                        this.draggable.element = a;
                    }
                    get source() {
                        return this.draggable.element;
                    }
                    get disabled() {
                        let { disabled: a } = this.draggable,
                            { disabled: b } = this.droppable;
                        return a === b ? a : { draggable: a, droppable: b };
                    }
                    set plugins(a) {
                        this.draggable.plugins = eA(a, h0);
                    }
                    set disabled(a) {
                        let b = h2(a);
                        cq(() => {
                            ((this.droppable.disabled = b.droppable), (this.draggable.disabled = b.draggable));
                        });
                    }
                    set data(a) {
                        cq(() => {
                            ((this.droppable.data = a), (this.draggable.data = a));
                        });
                    }
                    set handle(a) {
                        this.draggable.handle = a;
                    }
                    set id(a) {
                        ((this.droppable.id = a), (this.draggable.id = a));
                    }
                    get id() {
                        return this.droppable.id;
                    }
                    set sensors(a) {
                        this.draggable.sensors = a;
                    }
                    set modifiers(a) {
                        this.draggable.modifiers = a;
                    }
                    set collisionPriority(a) {
                        this.droppable.collisionPriority = a;
                    }
                    set collisionDetector(a) {
                        this.droppable.collisionDetector = null != a ? a : fI;
                    }
                    set alignment(a) {
                        this.draggable.alignment = a;
                    }
                    get alignment() {
                        return this.draggable.alignment;
                    }
                    set type(a) {
                        cq(() => {
                            ((this.droppable.type = a), (this.draggable.type = a));
                        });
                    }
                    get type() {
                        return this.draggable.type;
                    }
                    set accept(a) {
                        this.droppable.accept = a;
                    }
                    get accept() {
                        return this.droppable.accept;
                    }
                    get isDropTarget() {
                        return this.droppable.isDropTarget;
                    }
                    get isDragSource() {
                        return this.draggable.isDragSource;
                    }
                    get isDragging() {
                        return this.draggable.isDragging;
                    }
                    get isDropping() {
                        return this.draggable.isDropping;
                    }
                    get status() {
                        return this.draggable.status;
                    }
                    refreshShape() {
                        return this.droppable.refreshShape();
                    }
                    accepts(a) {
                        return this.droppable.accepts(a);
                    }
                };
                ((cb = [, , , hm(null)]), (cc = new WeakMap()), (cd = new WeakMap()), (ce = new WeakMap()), (cf = new WeakMap()), (cg = new WeakMap()), hC(cb, 4, "index", ca, h4, cc), hC(cb, 4, "group", b9, h4, cf), (h = cb), hv(h4, ((a, b) => ((b = Symbol[a]) ? b : Symbol.for("Symbol." + a)))("metadata"), h[3]));
                var h5 = class extends gU {
                        constructor(a, b, c) {
                            (super(a, b), (this.sortable = c));
                        }
                        get index() {
                            return this.sortable.index;
                        }
                        get initialIndex() {
                            return this.sortable.initialIndex;
                        }
                        get group() {
                            return this.sortable.group;
                        }
                        get initialGroup() {
                            return this.sortable.initialGroup;
                        }
                    },
                    h6 = class extends gV {
                        constructor(a, b, c) {
                            (super(a, b), (this.sortable = c));
                        }
                        get index() {
                            return this.sortable.index;
                        }
                        get group() {
                            return this.sortable.group;
                        }
                    },
                    h7 = Object.defineProperty,
                    h8 = Object.defineProperties,
                    h9 = Object.getOwnPropertyDescriptors,
                    ia = Object.getOwnPropertySymbols,
                    ib = Object.prototype.hasOwnProperty,
                    ic = Object.prototype.propertyIsEnumerable,
                    id = (a, b, c) => (b in a ? h7(a, b, { enumerable: !0, configurable: !0, writable: !0, value: c }) : (a[b] = c)),
                    ie = (a, b) => {
                        for (var c in b || (b = {})) ib.call(b, c) && id(a, c, b[c]);
                        if (ia) for (var c of ia(b)) ic.call(b, c) && id(a, c, b[c]);
                        return a;
                    };
                function ig(a, b, c) {
                    return "isDragSource" === a && !c && !!b;
                }
                var ih = Object.defineProperty,
                    ii = Object.defineProperties,
                    ij = Object.getOwnPropertyDescriptors,
                    ik = Object.getOwnPropertySymbols,
                    il = Object.prototype.hasOwnProperty,
                    im = Object.prototype.propertyIsEnumerable,
                    io = (a, b, c) => (b in a ? ih(a, b, { enumerable: !0, configurable: !0, writable: !0, value: c }) : (a[b] = c)),
                    ip = (a, b) => {
                        for (var c in b || (b = {})) il.call(b, c) && io(a, c, b[c]);
                        if (ik) for (var c of ik(b)) im.call(b, c) && io(a, c, b[c]);
                        return a;
                    },
                    iq = (a, b) => ii(a, ij(b));
                function ir(a, b, c) {
                    if (b === c) return a;
                    let d = a.slice();
                    return (d.splice(c, 0, d.splice(b, 1)[0]), d);
                }
                function is(a, b) {
                    let c = String(b);
                    return Object.prototype.hasOwnProperty.call(a, c) ? c : void 0;
                }
                function it(a) {
                    return "initialIndex" in a && "number" == typeof a.initialIndex && "index" in a && "number" == typeof a.index;
                }
                function iu(a, b) {
                    return (function (a, b, c) {
                        var d, e;
                        let f,
                            g,
                            { source: h, target: i, canceled: j } = b.operation;
                        if (!h || !i || j) return ("preventDefault" in b && b.preventDefault(), a);
                        let k = (a, b) => a === b || (null !== a && "object" == typeof a && "id" in a && a.id === b);
                        if (Array.isArray(a)) {
                            let d = a.findIndex((a) => k(a, h.id)),
                                e = a.findIndex((a) => k(a, i.id));
                            if (-1 === d || -1 === e) {
                                if (it(h)) {
                                    let d = h.initialIndex,
                                        e = h.index;
                                    return d === e || d < 0 || d >= a.length ? ("preventDefault" in b && b.preventDefault(), a) : c(a, d, e);
                                }
                                return a;
                            }
                            if (!j && "index" in h && "number" == typeof h.index) {
                                let b = h.index;
                                if (b !== d) return c(a, d, b);
                            }
                            return c(a, d, e);
                        }
                        let l = Object.entries(a),
                            m = -1,
                            n = -1;
                        for (let [a, b] of l) if ((-1 === m && -1 !== (m = b.findIndex((a) => k(a, h.id))) && (f = a), -1 === n && -1 !== (n = b.findIndex((a) => k(a, i.id))) && (g = a), -1 !== m && -1 !== n)) break;
                        if (-1 === m && it(h)) {
                            let d = null == h.initialGroup ? void 0 : is(a, h.initialGroup),
                                e = h.initialIndex,
                                f = null == h.group ? void 0 : is(a, h.group),
                                g = h.index;
                            if (null == d || null == f || (d === f && e === g)) return ("preventDefault" in b && b.preventDefault(), a);
                            if (d === f) return iq(ip({}, a), { [d]: c(a[d], e, g) });
                            let i = a[d][e];
                            return iq(ip({}, a), { [d]: [...a[d].slice(0, e), ...a[d].slice(e + 1)], [f]: [...a[f].slice(0, g), i, ...a[f].slice(g)] });
                        }
                        if (!h.manager) return a;
                        let { dragOperation: o } = h.manager,
                            p = null != (e = null == (d = o.shape) ? void 0 : d.current.center) ? e : o.position.current;
                        if (null == g) {
                            let b = is(a, i.id);
                            if (null != b) {
                                let c = i.shape && p.y > i.shape.center.y ? a[b].length : 0;
                                ((g = b), (n = c));
                            }
                        }
                        if (null == f || null == g || (f === g && m === n)) {
                            if (null != f && f === g && m === n && it(h)) {
                                let b = null == h.group ? void 0 : is(a, h.group),
                                    d = null != h.group && b !== f,
                                    e = h.index !== m;
                                if (d || e) {
                                    let d = null == h.group ? f : b;
                                    if (null != d) {
                                        if (f === d) return iq(ip({}, a), { [f]: c(a[f], m, h.index) });
                                        let b = a[f][m];
                                        return iq(ip({}, a), { [f]: [...a[f].slice(0, m), ...a[f].slice(m + 1)], [d]: [...a[d].slice(0, h.index), b, ...a[d].slice(h.index)] });
                                    }
                                }
                            }
                            return ("preventDefault" in b && b.preventDefault(), a);
                        }
                        if (f === g) return iq(ip({}, a), { [f]: c(a[f], m, n) });
                        let q = +!!(i.shape && Math.round(p.y) > Math.round(i.shape.center.y)),
                            r = a[f][m];
                        return iq(ip({}, a), { [f]: [...a[f].slice(0, m), ...a[f].slice(m + 1)], [g]: [...a[g].slice(0, n + q), r, ...a[g].slice(n + q)] });
                    })(a, b, ir);
                }
                var iv = c(59535),
                    iw = c(34615),
                    ix = c(56849),
                    iy = c(65687),
                    iz = c(28265),
                    iA = c(72937),
                    iB = c(29589),
                    iC = c(66088),
                    iD = c(7401),
                    iE = c(37108),
                    iF = c(40029),
                    iG = c(43157),
                    iH = c(79281),
                    iI = c(69587),
                    iJ = c(38984),
                    iK = c(4408),
                    iL = c(51155),
                    iM = c(76186),
                    iN = c(42593),
                    iO = c(20450),
                    iP = c(72190),
                    iQ = c(68686),
                    iR = c(42830),
                    iS = c(23339);
                let iT = (0, iS.A)("GripVertical", [
                    ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
                    ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
                    ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
                    ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
                    ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
                    ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }],
                ]);
                var iU = c(47089),
                    iV = c(8849),
                    iW = c(74097),
                    iX = c(71613);
                let iY = (0, iS.A)("Share2", [
                    ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
                    ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
                    ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
                    ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
                    ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }],
                ]);
                var iZ = c(65783),
                    i$ = c(94684),
                    i_ = c(78460),
                    i0 = c(30733),
                    i1 = c(80196),
                    i2 = c(22842);
                let i3 = (0, iS.A)("ExternalLink", [
                    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
                    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
                    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }],
                ]);
                var i4 = c(88285),
                    i5 = c(91942),
                    i6 = c(28074),
                    i7 = c(62832);
                let i8 = [
                        { value: "all", label: "Todas as cartas" },
                        { value: "in_binder", label: "No Binder" },
                        { value: "stored", label: "Guardadas" },
                    ],
                    i9 = [
                        { value: "all", label: "Todos os idiomas" },
                        { value: "pt-br", label: "Portugu\xeas (PT-BR)", icon: (0, ch.jsx)(iA.i, { country: "pt-br" }) },
                        { value: "en", label: "Ingl\xeas (EN)", icon: (0, ch.jsx)(iA.i, { country: "en" }) },
                        { value: "ja", label: "Japon\xeas (JA)", icon: (0, ch.jsx)(iA.i, { country: "ja" }) },
                    ],
                    ja = async (a) => {
                        let b = await fetch(a);
                        if (!b.ok) {
                            if (404 === b.status) throw Error("not_found");
                            throw Error("fetch_failed");
                        }
                        return (await b.json()).profile;
                    };
                function jb({ children: a, className: b = "" }) {
                    return (0, ch.jsx)("div", { className: `relative w-full ${b}`, style: { aspectRatio: "8 / 11" }, children: (0, ch.jsx)("div", { className: "absolute inset-0", children: a }) });
                }
                function jc({ card: a, onMaximize: b, priority: c = !1 }) {
                    let d = (0, iD.HO)(a.card_image_url),
                        e = (0, iH.WE)(a.card_variant, a.card_rarity, a.card_image_url, a.card_name),
                        f = (0, iI.Mr)(a.card_types, a.pokemon_dex_id),
                        { loaded: g, setLoaded: h } = (0, iy.MI)(a.id);
                    return (0, ch.jsx)(jb, {
                        className: "z-0",
                        children: (0, ch.jsx)("button", {
                            type: "button",
                            onClick: () => b?.(d, a.card_name, e, f),
                            "aria-label": `Ampliar ${a.card_name}`,
                            className: "relative z-0 h-full w-full cursor-zoom-in",
                            children: (0, ch.jsx)(ix.LW, { className: "relative h-full w-full", maxTilt: 8, maxMove: 3, scale: 1, glareOpacity: 0.25, perspective: 900, shineMode: e, elementTypes: f, isLoading: !g, children: (0, ch.jsx)(iy.MH, { src: d, alt: a.card_name, sizes: "(max-width: 640px) 45vw, 200px", className: "object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]", priority: c, onLoadingChange: h }) }),
                        }),
                    });
                }
                function jd({ id: a, index: b, card: c, onRemove: d, priority: e = !1 }) {
                    let { ref: f, isDragging: g } = (function (a) {
                            let { accept: b, collisionDetector: c, collisionPriority: d, id: e, data: f, element: g, handle: h, index: i, group: j, disabled: k, modifiers: l, sensors: m, target: n, type: o, plugins: p } = a,
                                q = ie(ie({}, h1), a.transition),
                                r = (function (a) {
                                    var b;
                                    let c = null != (b = (0, ci.useContext)(g5)) ? b : void 0,
                                        [d] = (0, ci.useState)(() => a(c));
                                    return (d.manager !== c && (d.manager = c), gY(d.register, [c, d]), d);
                                })((b) => new h4(h8(ie({}, a), h9({ transition: q, register: !1, handle: gX(h), element: gX(g), target: gX(n) })), b)),
                                s = (function (a, b) {
                                    let c = (0, ci.useRef)(new Map()),
                                        d = (function () {
                                            let a = (0, ci.useState)(0)[1];
                                            return (0, ci.useCallback)(() => {
                                                a((a) => a + 1);
                                            }, [a]);
                                        })();
                                    return (
                                        gY(
                                            () =>
                                                a
                                                    ? cJ(() => {
                                                          var e;
                                                          let f = !1,
                                                              g = !1;
                                                          for (let d of c.current) {
                                                              let [h] = d,
                                                                  i = cr(() => d[1]),
                                                                  j = a[h];
                                                              i !== j && ((f = !0), c.current.set(h, j), (g = null != (e = null == b ? void 0 : b(h, i, j)) && e));
                                                          }
                                                          f && (g ? queueMicrotask(() => (0, gW.flushSync)(d)) : d());
                                                      })
                                                    : void c.current.clear(),
                                            [a],
                                        ),
                                        (0, ci.useMemo)(
                                            () =>
                                                a
                                                    ? new Proxy(a, {
                                                          get(a, b) {
                                                              let d = a[b];
                                                              return (c.current.set(b, d), d);
                                                          },
                                                      })
                                                    : a,
                                            [a],
                                        )
                                    );
                                })(r, ig);
                            return (
                                g_(e, () => (r.id = e)),
                                gY(() => {
                                    cq(() => {
                                        ((r.group = j), (r.index = i));
                                    });
                                }, [r, j, i]),
                                g_(o, () => (r.type = o)),
                                g_(b, () => (r.accept = b), void 0, c7),
                                g_(f, () => f && (r.data = f)),
                                g_(
                                    i,
                                    () => {
                                        var a;
                                        (null == (a = r.manager) ? void 0 : a.dragOperation.status.idle) && (null == q ? void 0 : q.idle) && r.refreshShape();
                                    },
                                    gZ,
                                ),
                                g0(h, (a) => (r.handle = a)),
                                g0(g, (a) => (r.element = a)),
                                g0(n, (a) => (r.target = a)),
                                g_(k, () => (r.disabled = null != k && k), void 0, c7),
                                g_(m, () => (r.sensors = m), void 0, c7),
                                g_(c, () => (r.collisionDetector = c)),
                                g_(d, () => (r.collisionPriority = d)),
                                g_(p, () => (r.plugins = p), void 0, c7),
                                g_(q, () => (r.transition = q), void 0, c7),
                                g_(l, () => (r.modifiers = l), void 0, c7),
                                g_(a.alignment, () => (r.alignment = a.alignment)),
                                {
                                    sortable: s,
                                    get isDragging() {
                                        return s.isDragging;
                                    },
                                    get isDropping() {
                                        return s.isDropping;
                                    },
                                    get isDragSource() {
                                        return s.isDragSource;
                                    },
                                    get isDropTarget() {
                                        return s.isDropTarget;
                                    },
                                    handleRef: (0, ci.useCallback)(
                                        (a) => {
                                            r.handle = null != a ? a : void 0;
                                        },
                                        [r],
                                    ),
                                    ref: (0, ci.useCallback)(
                                        (a) => {
                                            var b, c;
                                            (a || null == (b = r.element) || !b.isConnected || (null == (c = r.manager) ? void 0 : c.dragOperation.status.idle)) && (r.element = null != a ? a : void 0);
                                        },
                                        [r],
                                    ),
                                    sourceRef: (0, ci.useCallback)(
                                        (a) => {
                                            var b, c;
                                            (a || null == (b = r.source) || !b.isConnected || (null == (c = r.manager) ? void 0 : c.dragOperation.status.idle)) && (r.source = null != a ? a : void 0);
                                        },
                                        [r],
                                    ),
                                    targetRef: (0, ci.useCallback)(
                                        (a) => {
                                            var b, c;
                                            (a || null == (b = r.target) || !b.isConnected || (null == (c = r.manager) ? void 0 : c.dragOperation.status.idle)) && (r.target = null != a ? a : void 0);
                                        },
                                        [r],
                                    ),
                                }
                            );
                        })({ id: a, index: b }),
                        h = (0, iD.HO)(c.card_image_url),
                        i = (0, iH.WE)(c.card_variant, c.card_rarity, c.card_image_url, c.card_name),
                        j = (0, iI.Mr)(c.card_types, c.pokemon_dex_id),
                        { loaded: k, setLoaded: l } = (0, iy.MI)(c.id);
                    return (0, ch.jsxs)("div", {
                        ref: f,
                        className: `relative w-full touch-none select-none !cursor-grab active:!cursor-grabbing ${g ? "z-30" : "z-0"}`,
                        style: { aspectRatio: "8 / 11" },
                        "aria-label": `${c.card_name}, arraste para reordenar`,
                        children: [
                            (0, ch.jsxs)("div", {
                                className: `absolute inset-0 ${g ? "opacity-90 ring-2 ring-poke-blue/60 rounded-lg" : ""}`,
                                children: [
                                    (0, ch.jsx)(ix.LW, { className: "relative h-full w-full", maxTilt: 0, maxMove: 0, scale: 1, glareOpacity: 0, perspective: 900, shineMode: i, elementTypes: j, isLoading: !k, children: (0, ch.jsx)(iy.MH, { src: h, alt: c.card_name, sizes: "(max-width: 640px) 45vw, 200px", className: "pointer-events-none object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]", priority: e, draggable: !1, onLoadingChange: l }) }),
                                    (0, ch.jsx)("span", { className: "pointer-events-none absolute bottom-1.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-0.5 rounded-md bg-black/55 px-1.5 py-0.5 text-white/80 backdrop-blur-sm", children: (0, ch.jsx)(iT, { size: 12, strokeWidth: 2.5 }) }),
                                ],
                            }),
                            (0, ch.jsx)("button", { type: "button", onClick: d, onPointerDown: (a) => a.stopPropagation(), "aria-label": `Remover ${c.card_name} dos destaques`, className: "absolute -right-1.5 -top-1.5 z-30 flex h-7 w-7 items-center justify-center rounded-full border border-rose-400/50 bg-rose-500 text-white shadow-lg shadow-rose-500/30 transition-transform hover:scale-105 active:scale-95", children: (0, ch.jsx)(iU.A, { size: 14, strokeWidth: 2.5 }) }),
                        ],
                    });
                }
                function je({ editing: a, onAdd: b }) {
                    return (0, ch.jsx)(jb, {
                        children: (0, ch.jsxs)("button", {
                            type: "button",
                            onClick: b,
                            className: `flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-lg sm:rounded-xl border border-dashed text-slate-500 transition-colors ${a ? "border-white/25 bg-white/[0.03] hover:border-poke-blue/50 hover:bg-poke-blue/5 hover:text-poke-blue" : "border-white/10 bg-white/[0.015] hover:border-white/20 hover:text-slate-400"}`,
                            children: [(0, ch.jsx)(iV.A, { size: a ? 20 : 16, strokeWidth: 2.25 }), (0, ch.jsx)("span", { className: "hidden text-[10px] font-medium sm:inline", children: a ? "Adicionar" : "Vazio" })],
                        }),
                    });
                }
                function jf({ children: a }) {
                    return (0, ch.jsx)("div", { className: "flex min-h-[calc(100dvh-4rem)] flex-col bg-[#0a0c10]", children: a });
                }
                function jg({ binder: a, slots: b, onCardClick: c }) {
                    let d = (0, ci.useMemo)(() => {
                            let c = new Map();
                            for (let b = 1; b <= a.total_pages; b++) c.set(b, []);
                            for (let a of b) {
                                let b = c.get(a.page_number) || [];
                                (b.push(a), c.set(a.page_number, b));
                            }
                            return c;
                        }, [a.total_pages, b]),
                        e = "1x1" === a.grid_type ? "grid-cols-1 max-w-[80px]" : "2x2" === a.grid_type ? "grid-cols-2 max-w-[160px]" : "grid-cols-3 max-w-[240px]";
                    return (0, ch.jsxs)("div", {
                        className: "flex flex-col gap-3",
                        children: [
                            (0, ch.jsxs)("div", {
                                className: "flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5",
                                children: [
                                    (0, ch.jsxs)("div", { className: "flex items-center gap-2", children: [(0, ch.jsx)("span", { className: "text-xs font-bold text-white", children: "Mapa de Slots" }), (0, ch.jsx)("span", { className: "rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-400", children: "Modo Leitura" })] }),
                                    (0, ch.jsxs)("div", {
                                        className: "flex items-center gap-3 text-[11px] text-slate-400",
                                        children: [
                                            (0, ch.jsxs)("div", { className: "flex items-center gap-1.5", children: [(0, ch.jsx)("span", { className: "h-2 w-2 rounded-full border border-dashed border-white/30" }), (0, ch.jsx)("span", { children: "Livre" })] }),
                                            (0, ch.jsxs)("div", { className: "flex items-center gap-1.5", children: [(0, ch.jsx)("span", { className: "h-2 w-2 rounded-full bg-amber-400/70" }), (0, ch.jsx)("span", { children: "Meta" })] }),
                                            (0, ch.jsxs)("div", { className: "flex items-center gap-1.5", children: [(0, ch.jsx)("span", { className: "h-2 w-2 rounded-full bg-emerald-400" }), (0, ch.jsx)("span", { children: "Alocada" })] }),
                                        ],
                                    }),
                                ],
                            }),
                            (0, ch.jsx)("div", {
                                className: "flex gap-4 overflow-x-auto pb-2 pt-1",
                                children: Array.from(d.entries()).map(([a, b]) => {
                                    let d = b.filter((a) => !!(a.user_card_id || a.card)).length;
                                    return (0, ch.jsxs)(
                                        "div",
                                        {
                                            className: "flex shrink-0 flex-col gap-2 rounded-xl border border-white/10 bg-[#0c0e15] p-3 shadow-md",
                                            children: [
                                                (0, ch.jsxs)("div", { className: "flex items-center justify-between text-[11px] font-semibold text-slate-400", children: [(0, ch.jsxs)("span", { children: ["P\xe1g. ", a] }), (0, ch.jsxs)("span", { className: "font-mono text-[10px] text-slate-500", children: [d, "/", b.length] })] }),
                                                (0, ch.jsx)("div", {
                                                    className: `grid gap-1.5 ${e}`,
                                                    children: b.map((a) => {
                                                        let b = a.card;
                                                        return (a.user_card_id || b) && b
                                                            ? (0, ch.jsx)(
                                                                  "button",
                                                                  {
                                                                      type: "button",
                                                                      onClick: () => c(b),
                                                                      title: `${b.card_name} (Slot #${a.slot_index})`,
                                                                      className: "group relative aspect-[8/11] w-full min-w-[50px] overflow-hidden rounded-md border border-emerald-500/50 bg-emerald-500/10 transition-transform hover:scale-105 hover:border-emerald-400 focus:outline-none",
                                                                      children: (0, ch.jsx)(cj.default, { src: (0, iD.HO)(b.card_image_url), alt: b.card_name, fill: !0, unoptimized: !0, sizes: "60px", className: "object-cover" }),
                                                                  },
                                                                  a.id,
                                                              )
                                                            : "pokemon" === a.slot_type && a.target_dex_id
                                                              ? (0, ch.jsxs)(
                                                                    "div",
                                                                    {
                                                                        title: `Meta: #${String(a.target_dex_id).padStart(3, "0")} (Slot #${a.slot_index})`,
                                                                        className: "relative flex aspect-[8/11] w-full min-w-[50px] flex-col items-center justify-center rounded-md border border-amber-500/30 bg-amber-500/5 p-1",
                                                                        children: [(0, ch.jsx)("div", { className: "relative h-6 w-6 opacity-40", children: (0, ch.jsx)(cj.default, { src: (0, iE.Xw)(a.target_dex_id), alt: "Meta", fill: !0, unoptimized: !0, className: "object-contain brightness-0 invert" }) }), (0, ch.jsxs)("span", { className: "mt-0.5 font-mono text-[9px] font-bold text-amber-300/80", children: ["#", String(a.target_dex_id).padStart(3, "0")] })],
                                                                    },
                                                                    a.id,
                                                                )
                                                              : "card" === a.slot_type && a.target_card_image_url
                                                                ? (0, ch.jsx)("div", { title: `Meta: ${a.target_card_name || "Carta"} (Slot #${a.slot_index})`, className: "relative aspect-[8/11] w-full min-w-[50px] overflow-hidden rounded-md border border-amber-500/30 bg-amber-500/5 opacity-60", children: (0, ch.jsx)(cj.default, { src: (0, iD.HO)(a.target_card_image_url), alt: a.target_card_name || "Meta", fill: !0, unoptimized: !0, sizes: "60px", className: "object-cover grayscale" }) }, a.id)
                                                                : (0, ch.jsx)("div", { title: `Slot livre #${a.slot_index}`, className: "relative aspect-[8/11] w-full min-w-[50px] rounded-md border border-dashed border-white/10 bg-white/[0.02]" }, a.id);
                                                    }),
                                                }),
                                            ],
                                        },
                                        a,
                                    );
                                }),
                            }),
                        ],
                    });
                }
                function jh({ themeColor: a, children: b }) {
                    return (0, ch.jsx)("div", { style: a ? (0, iO.jl)(a) : void 0, children: b });
                }
                function ji({ username: a, fallbackData: b }) {
                    (0, cm.useRouter)();
                    let { data: c, error: d, isLoading: e, mutate: f } = (0, cn.u)(a ? `/api/profile/${encodeURIComponent(a)}` : null, ja, { fallbackData: b, revalidateOnFocus: !1, revalidateOnReconnect: !1, shouldRetryOnError: !1, dedupingInterval: 1e4 }),
                        { data: g } = (0, cn.u)(c?.isOwner ? "/api/cards" : null, iQ.GO, { revalidateOnFocus: !1, revalidateOnReconnect: !1, shouldRetryOnError: !1, dedupingInterval: 1e4 }),
                        h = g?.cards ?? [],
                        [i, j] = (0, ci.useState)(!1),
                        [k, l] = (0, ci.useState)(!1),
                        [m, n] = (0, ci.useState)(!1),
                        [o, p] = (0, ci.useState)([]),
                        [q, r] = (0, ci.useState)(!1),
                        [s, t] = (0, ci.useState)(!1),
                        [u, v] = (0, ci.useState)(""),
                        [w, y] = (0, ci.useState)("all"),
                        [z, A] = (0, ci.useState)("all"),
                        [B, C] = (0, ci.useState)("all");
                    (0, iM.m)(s, () => t(!1), q);
                    let { isPresent: D, state: E } = (0, iN.v)(s),
                        [F, G] = (0, ci.useState)(iK.ej),
                        [H, I] = (0, ci.useState)(null),
                        [J, K] = (0, ci.useState)(null);
                    c?.favoriteCardIds?.join(",");
                    let L = (0, ci.useMemo)(() => {
                            let a = new Map();
                            for (let b of h) a.set(b.id, b);
                            for (let b of c?.featuredCards ?? []) a.set(b.id, b);
                            return a;
                        }, [h, c?.featuredCards]),
                        M = (m ? o : (c?.favoriteCardIds ?? [])).map((a) => L.get(a)).filter(Boolean),
                        N = (0, ci.useMemo)(() => (0, iK.ay)(h.map((a) => a.card_artist)), [h]),
                        O = (0, ci.useMemo)(() => h.filter((a) => (!u.trim() || !!(0, iK.KY)(a, u)) && ("in_binder" !== w || !!a.is_in_binder) && ("stored" !== w || !a.is_in_binder) && ("all" === z || a.card_language === z) && ("all" === B || !!(a.card_rarity || "").trim().toLowerCase().includes(B)) && (F === iK.ej || (a.card_artist || "").trim().toLowerCase() === F.toLowerCase())), [h, u, w, z, B, F]),
                        {
                            visibleItems: P,
                            hasMore: Q,
                            loadMore: R,
                        } = (function (a, { pageSize: b = iK.xJ, resetKey: c }) {
                            let [d, e] = (0, ci.useState)(b),
                                f = a.length,
                                g = Math.min(d, f),
                                h = g < f;
                            return {
                                visibleItems: (0, ci.useMemo)(() => a.slice(0, g), [a, g]),
                                hasMore: h,
                                loadMore: (0, ci.useCallback)(() => {
                                    e((c) => (c >= a.length ? c : Math.min(c + b, a.length)));
                                }, [a.length, b]),
                                visibleCount: g,
                                totalCount: f,
                            };
                        })(O, { resetKey: (0, ci.useMemo)(() => (0, iK.tF)({ searchTerm: u, statusFilter: w, languageFilter: z, rarityFilter: B, artistFilter: F }), [u, w, z, B, F]) }),
                        S = (0, iL.X)({ hasMore: Q, onLoadMore: R, root: J, enabled: s && O.length > 0 }),
                        T = (0, ci.useCallback)((a, b, c = "none", d = ["Colorless"]) => {
                            I({ src: a, alt: b, shineMode: c, elementTypes: d });
                        }, []),
                        U = (0, ci.useCallback)(() => {
                            I(null);
                        }, []),
                        V = () => {
                            (v(""), y("all"), A("all"), C("all"), t(!0));
                        },
                        W = async () => {},
                        [X, Y] = (0, ci.useState)(null),
                        Z = async (a) => {
                            if (!X) {
                                Y(a);
                                try {
                                    let b = await fetch(`/api/binders/${a}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ is_featured: !0 }) }),
                                        c = await b.json();
                                    if (!b.ok) throw Error(c.error || "Erro ao definir binder em destaque");
                                    (iR.oR.success("Binder definido como destaque!"), await f());
                                } catch (b) {
                                    let a = b instanceof Error ? b.message : "Erro ao definir destaque";
                                    iR.oR.error(a);
                                } finally {
                                    Y(null);
                                }
                            }
                        },
                        $ = async (a, b) => {
                            if (!X) {
                                Y(a);
                                try {
                                    let c = await fetch(`/api/binders/${a}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ is_public: b }) }),
                                        d = await c.json();
                                    if (!c.ok) throw Error(d.error || "Erro ao alterar visibilidade");
                                    (iR.oR.success(b ? "Binder agora \xe9 p\xfablico!" : "Binder agora \xe9 privado!"), await f());
                                } catch (b) {
                                    let a = b instanceof Error ? b.message : "Erro ao alterar visibilidade";
                                    iR.oR.error(a);
                                } finally {
                                    Y(null);
                                }
                            }
                        },
                        _ = (a) => {
                            p((b) => (b.includes(a) ? b.filter((b) => b !== a) : b.length >= 4 ? (iR.oR.message("M\xe1ximo de 4 cartas em destaque."), b) : [...b, a]));
                        },
                        aa = () => {
                            (p(c?.favoriteCardIds ?? []), n(!0), V());
                        },
                        ab = async () => {
                            r(!0);
                            try {
                                let a = await fetch("/api/profile", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ favorite_card_ids: o }) }),
                                    b = await a.json().catch(() => ({}));
                                if (!a.ok) return void iR.oR.error(b.error || "N\xe3o foi poss\xedvel salvar os destaques.");
                                (await f(), n(!1), t(!1), iR.oR.success("Destaques atualizados."));
                            } catch {
                                iR.oR.error("N\xe3o foi poss\xedvel salvar os destaques.");
                            } finally {
                                r(!1);
                            }
                        };
                    if (d)
                        return "not_found" === d.message
                            ? (0, ch.jsx)(iw.L, { username: a, type: "profile" })
                            : (0, ch.jsx)(jf, {
                                  children: (0, ch.jsx)("main", {
                                      className: "mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center p-6 text-center",
                                      children: (0, ch.jsxs)("div", {
                                          className: "rounded-2xl border border-white/10 bg-[#12151d] p-8 shadow-xl",
                                          children: [
                                              (0, ch.jsx)("p", { className: "text-base font-bold text-white", children: "N\xe3o foi poss\xedvel carregar os dados do perfil." }),
                                              (0, ch.jsx)("p", { className: "mt-1 text-xs text-slate-400", children: "Verifique sua conex\xe3o ou tente novamente mais tarde." }),
                                              (0, ch.jsxs)(cl(), { href: "/", prefetch: !0, className: "mt-4 inline-flex items-center gap-2 rounded-xl bg-poke-blue px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90", children: [(0, ch.jsx)(iW.A, { size: 14 }), (0, ch.jsx)("span", { children: "Voltar ao Binder" })] }),
                                          ],
                                      }),
                                  }),
                              });
                    if (e && !c) return (0, ch.jsx)(jf, { children: (0, ch.jsx)("main", { className: "flex flex-1 items-start justify-center pt-10 sm:pt-14 md:pt-18 pb-16 bg-[#0a0c10]", children: (0, ch.jsx)(iv.i, { message: "Carregando perfil do treinador...", size: "lg" }) }) });
                    if (!c) return (0, ch.jsx)(iw.L, { username: a, type: "profile" });
                    let { user: ac, stats: ad, slots: ae, rarityBreakdown: af, isOwner: ag, themeColor: ah } = c,
                        ai = c.featuredBinder ?? c.binders?.find((a) => a.is_featured) ?? c.binders?.[0] ?? null,
                        aj = c.featuredBinderSlots ?? [],
                        ak = (0, iF.v)(ai?.cover_theme || "classic_red"),
                        al = (c.binders || []).filter((a) => a.id !== ai?.id && (ag || a.is_public)),
                        am = af.reduce((a, b) => Math.max(a, b.count), 0) || 1,
                        an = ag || M.length > 0;
                    return (0, ch.jsxs)(jf, {
                        children: [
                            (0, ch.jsx)(jh, {
                                themeColor: ah,
                                children: (0, ch.jsxs)(
                                    "main",
                                    {
                                        className: "mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16",
                                        children: [
                                            (0, ch.jsxs)("section", {
                                                className: `profile-enter relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#161a26]/90 via-[#10131d]/90 to-[#0c0e15]/90 shadow-2xl backdrop-blur-xl ${m ? "overflow-visible" : "overflow-hidden"}`,
                                                children: [
                                                    (0, ch.jsx)("div", { className: "pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-poke-blue/10 blur-3xl" }),
                                                    (0, ch.jsx)("div", { className: "pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-poke-blue/10 blur-3xl" }),
                                                    (0, ch.jsxs)("div", {
                                                        className: "relative z-10 flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8",
                                                        children: [
                                                            (0, ch.jsxs)("div", {
                                                                className: "flex items-center gap-4 sm:gap-5",
                                                                children: [
                                                                    (0, ch.jsx)("div", {
                                                                        className: "relative shrink-0",
                                                                        children:
                                                                            ac.avatarUrl && !i
                                                                                ? (0, ch.jsx)(cj.default, { src: ac.avatarUrl, alt: ac.username, width: 80, height: 80, className: "h-16 w-16 rounded-full border-2 border-white/20 object-cover shadow-xl ring-2 ring-white/10 sm:h-20 sm:w-20", referrerPolicy: "no-referrer", onError: () => j(!0), unoptimized: !0 })
                                                                                : (0, ch.jsx)("div", { className: "flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/20 bg-gradient-to-br from-white/15 to-white/5 font-mono text-2xl font-black text-white shadow-xl ring-2 ring-white/10 sm:h-20 sm:w-20", children: (ac.username[0] || "T").toUpperCase() }),
                                                                    }),
                                                                    (0, ch.jsxs)("div", {
                                                                        className: "flex min-w-0 flex-col",
                                                                        children: [
                                                                            (0, ch.jsx)("h1", { className: "text-xl font-extrabold tracking-tight text-white sm:text-2xl", children: ac.name || `@${ac.username}` }),
                                                                            (0, ch.jsxs)("p", { className: "mt-0.5 font-mono text-xs font-semibold text-poke-blue", children: ["@", ac.username] }),
                                                                            ac.bio
                                                                                ? (0, ch.jsx)("p", { className: "mt-2 max-w-md text-sm leading-relaxed text-slate-300", children: ac.bio })
                                                                                : ag
                                                                                  ? (0, ch.jsx)(cl(), { href: "/configuracoes", prefetch: !0, className: "mt-2 text-xs font-semibold text-slate-500 transition-colors hover:text-poke-blue", children: "Adicionar uma descri\xe7\xe3o ao perfil" })
                                                                                  : (0, ch.jsx)("p", { className: "mt-1 text-xs text-slate-400", children: "Cole\xe7\xe3o p\xfablica no MyPokeBinder" }),
                                                                        ],
                                                                    }),
                                                                ],
                                                            }),
                                                            (0, ch.jsxs)("div", {
                                                                className: "flex w-full flex-wrap items-center gap-2.5 sm:w-auto",
                                                                children: [
                                                                    (0, ch.jsxs)("button", {
                                                                        type: "button",
                                                                        onClick: W,
                                                                        className: "flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white sm:flex-initial",
                                                                        children: [k ? (0, ch.jsx)(iX.A, { size: 14, className: "text-emerald-400" }) : (0, ch.jsx)(iY, { size: 14 }), (0, ch.jsx)("span", { children: k ? "Copiado" : "Compartilhar" })],
                                                                    }),
                                                                    ag
                                                                        ? (0, ch.jsxs)(cl(), { href: "/configuracoes", prefetch: !0, className: "flex flex-1 items-center justify-center gap-2 rounded-xl border border-poke-blue/40 bg-poke-blue/15 px-4 py-2 text-xs font-semibold text-white transition-all hover:border-poke-blue/60 hover:bg-poke-blue/25 sm:flex-initial", children: [(0, ch.jsx)(i$.A, { size: 14 }), (0, ch.jsx)("span", { children: "Configura\xe7\xf5es" })] })
                                                                        : (0, ch.jsxs)(cl(), { href: `/colecao/${ac.username}`, prefetch: !0, className: "flex flex-1 items-center justify-center gap-2 rounded-xl bg-poke-blue px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-poke-blue/25 transition-all hover:bg-poke-blue/90 hover:shadow-poke-blue/40 sm:flex-initial", children: [(0, ch.jsx)(iZ.A, { size: 15 }), (0, ch.jsx)("span", { children: "Ver cole\xe7\xe3o" })] }),
                                                                ],
                                                            }),
                                                        ],
                                                    }),
                                                    an
                                                        ? (0, ch.jsxs)("div", {
                                                              className: "relative z-10 border-t border-white/10 px-6 pb-6 pt-5 sm:px-8 sm:pb-8",
                                                              children: [
                                                                  (0, ch.jsxs)("div", {
                                                                      className: "mb-4 flex h-7 items-center justify-between gap-3",
                                                                      children: [
                                                                          (0, ch.jsx)("h2", { className: "text-sm font-semibold text-slate-200", children: "Destaques" }),
                                                                          ag
                                                                              ? m
                                                                                  ? (0, ch.jsxs)("div", {
                                                                                        className: "flex items-center gap-2",
                                                                                        children: [
                                                                                            (0, ch.jsx)("button", {
                                                                                                type: "button",
                                                                                                onClick: () => {
                                                                                                    (p(c?.favoriteCardIds ?? []), n(!1), t(!1));
                                                                                                },
                                                                                                disabled: q,
                                                                                                className: "rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-300 transition-colors hover:bg-white/10 disabled:opacity-50",
                                                                                                children: "Cancelar",
                                                                                            }),
                                                                                            (0, ch.jsxs)("button", { type: "button", onClick: ab, disabled: q, className: "inline-flex items-center gap-1 rounded-lg bg-poke-blue px-2.5 py-1 text-[11px] font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50", children: [(0, ch.jsx)(iX.A, { size: 12 }), (0, ch.jsx)("span", { children: q ? "Salvando..." : "Salvar" })] }),
                                                                                        ],
                                                                                    })
                                                                                  : (0, ch.jsxs)("button", {
                                                                                        type: "button",
                                                                                        onClick: () => {
                                                                                            (p(c?.favoriteCardIds ?? []), n(!0));
                                                                                        },
                                                                                        className: "inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-400 transition-colors hover:border-white/20 hover:text-white",
                                                                                        children: [(0, ch.jsx)(i_.A, { size: 12 }), (0, ch.jsx)("span", { children: "Editar" })],
                                                                                    })
                                                                              : null,
                                                                      ],
                                                                  }),
                                                                  (0, ch.jsx)(g8, {
                                                                      onDragOver: (a) => {
                                                                          m && p((b) => iu(b, a));
                                                                      },
                                                                      onDragEnd: (a) => {
                                                                          m && !a.canceled && p((b) => iu(b, a));
                                                                      },
                                                                      children: (0, ch.jsx)("div", {
                                                                          className: "grid grid-cols-4 items-start gap-2.5 sm:gap-4",
                                                                          children: m
                                                                              ? (0, ch.jsxs)(ch.Fragment, {
                                                                                    children: [
                                                                                        o.map((a, b) => {
                                                                                            let c = L.get(a);
                                                                                            return c ? (0, ch.jsx)(jd, { id: a, index: b, card: c, onRemove: () => _(a), priority: 0 === b }, a) : null;
                                                                                        }),
                                                                                        Array.from({ length: Math.max(0, 4 - o.length) }).map((a, b) => (0, ch.jsx)(je, { editing: !0, onAdd: V }, `empty-${b}`)),
                                                                                    ],
                                                                                })
                                                                              : [0, 1, 2, 3].map((a) => {
                                                                                    let b = M[a],
                                                                                        c = (0, iP.O)(a, { stepMs: 55, maxDelayMs: 220 });
                                                                                    return b
                                                                                        ? (0, ch.jsx)("div", { className: c.className, style: c.style, children: (0, ch.jsx)(jc, { card: b, onMaximize: T, priority: 0 === a }) }, b.id)
                                                                                        : ag
                                                                                          ? (0, ch.jsx)("div", { className: c.className, style: c.style, children: (0, ch.jsx)(je, { editing: !1, onAdd: aa }) }, `empty-${a}`)
                                                                                          : (0, ch.jsx)("div", { className: c.className, style: c.style, children: (0, ch.jsx)(jb, { children: (0, ch.jsx)("div", { className: "h-full w-full", "aria-hidden": !0 }) }) }, `pad-${a}`);
                                                                                }),
                                                                      }),
                                                                  }),
                                                              ],
                                                          })
                                                        : null,
                                                ],
                                            }),
                                            ai
                                                ? (0, ch.jsxs)("section", {
                                                      className: "profile-enter profile-enter-d1 flex flex-col gap-5 rounded-3xl border border-white/10 bg-gradient-to-b from-[#161a26]/90 via-[#10131d]/90 to-[#0c0e15]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8",
                                                      children: [
                                                          (0, ch.jsxs)("div", {
                                                              className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
                                                              children: [
                                                                  (0, ch.jsxs)("div", {
                                                                      className: "flex items-center gap-3",
                                                                      children: [
                                                                          (0, ch.jsx)("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 shadow-md", style: { backgroundColor: ak.primaryColor }, children: (0, ch.jsx)(iW.A, { size: 22, className: "text-white" }) }),
                                                                          (0, ch.jsxs)("div", {
                                                                              children: [
                                                                                  (0, ch.jsxs)("div", {
                                                                                      className: "flex flex-wrap items-center gap-2",
                                                                                      children: [
                                                                                          (0, ch.jsxs)("span", { className: "flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-400/15 px-2.5 py-0.5 text-[11px] font-bold text-amber-300", children: [(0, ch.jsx)(i0.A, { size: 12, className: "fill-amber-300 text-amber-300" }), (0, ch.jsx)("span", { children: "Binder em Destaque" })] }),
                                                                                          ag &&
                                                                                              (0, ch.jsxs)("button", {
                                                                                                  type: "button",
                                                                                                  onClick: () => $(ai.id, !ai.is_public),
                                                                                                  disabled: X === ai.id,
                                                                                                  className: `flex cursor-pointer items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition-all ${ai.is_public ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25" : "border-slate-500/40 bg-slate-500/15 text-slate-300 hover:bg-slate-500/25"}`,
                                                                                                  children: [ai.is_public ? (0, ch.jsx)(i1.A, { size: 11 }) : (0, ch.jsx)(i2.A, { size: 11 }), (0, ch.jsx)("span", { children: ai.is_public ? "P\xfablico" : "Privado" })],
                                                                                              }),
                                                                                      ],
                                                                                  }),
                                                                                  (0, ch.jsx)("h2", { className: "mt-1 text-xl font-black tracking-tight text-white sm:text-2xl", children: ai.name }),
                                                                                  ai.description && (0, ch.jsx)("p", { className: "mt-0.5 text-xs text-slate-400", children: ai.description }),
                                                                              ],
                                                                          }),
                                                                      ],
                                                                  }),
                                                                  (0, ch.jsxs)("div", {
                                                                      className: "flex items-center gap-2.5",
                                                                      children: [
                                                                          ag && (0, ch.jsxs)(cl(), { href: `/binders/${ai.id}/edit`, className: "flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white", children: [(0, ch.jsx)(i_.A, { size: 13 }), (0, ch.jsx)("span", { children: "Editar" })] }),
                                                                          (0, ch.jsxs)(cl(), { href: `/binders/${ai.id}`, className: "flex items-center gap-1.5 rounded-xl bg-poke-blue px-4 py-2 text-xs font-bold text-white shadow-lg shadow-poke-blue/25 transition-all hover:bg-poke-blue/90", children: [(0, ch.jsx)(iW.A, { size: 14 }), (0, ch.jsx)("span", { children: "Abrir no Binder" })] }),
                                                                      ],
                                                                  }),
                                                              ],
                                                          }),
                                                          (0, ch.jsxs)("div", {
                                                              className: "grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4",
                                                              children: [
                                                                  (0, ch.jsxs)("div", { className: "rounded-2xl border border-white/10 bg-[#12151d]/90 p-4", children: [(0, ch.jsx)("span", { className: "text-[11px] font-semibold text-slate-400", children: "Formato" }), (0, ch.jsxs)("p", { className: "mt-1 font-mono text-lg font-black text-white", children: ["Grade ", ai.grid_type] })] }),
                                                                  (0, ch.jsxs)("div", { className: "rounded-2xl border border-white/10 bg-[#12151d]/90 p-4", children: [(0, ch.jsx)("span", { className: "text-[11px] font-semibold text-slate-400", children: "P\xe1ginas" }), (0, ch.jsxs)("p", { className: "mt-1 font-mono text-lg font-black text-white", children: [ai.total_pages, " ", 1 === ai.total_pages ? "p\xe1gina" : "p\xe1ginas"] })] }),
                                                                  (0, ch.jsxs)("div", {
                                                                      className: "rounded-2xl border border-white/10 bg-[#12151d]/90 p-4",
                                                                      children: [(0, ch.jsx)("span", { className: "text-[11px] font-semibold text-slate-400", children: "Preenchimento" }), (0, ch.jsxs)("p", { className: "mt-1 font-mono text-lg font-black text-white", children: [ai.total_cards ?? 0, " ", (0, ch.jsxs)("span", { className: "text-xs font-normal text-slate-500", children: ["/ ", ai.total_slots ?? 0] })] })],
                                                                  }),
                                                                  (0, ch.jsxs)("div", {
                                                                      className: "rounded-2xl border border-white/10 bg-[#12151d]/90 p-4",
                                                                      children: [
                                                                          (0, ch.jsxs)("div", { className: "flex items-center justify-between", children: [(0, ch.jsx)("span", { className: "text-[11px] font-semibold text-slate-400", children: "Progresso" }), (0, ch.jsxs)("span", { className: "font-mono text-xs font-bold text-poke-blue", children: [ai.completion_percentage ?? 0, "%"] })] }),
                                                                          (0, ch.jsx)("div", { className: "mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10", children: (0, ch.jsx)("div", { className: "h-full rounded-full bg-poke-blue transition-all duration-500", style: { width: `${ai.completion_percentage ?? 0}%` } }) }),
                                                                      ],
                                                                  }),
                                                              ],
                                                          }),
                                                          (0, ch.jsx)(jg, {
                                                              binder: ai,
                                                              slots: aj,
                                                              onCardClick: (a) => {
                                                                  T((0, iD.HO)(a.card_image_url), a.card_name, (0, iH.WE)(a.card_variant, a.card_rarity, a.card_image_url, a.card_name), (0, iI.Mr)(a.card_types, a.pokemon_dex_id));
                                                              },
                                                          }),
                                                      ],
                                                  })
                                                : ag
                                                  ? (0, ch.jsxs)("section", {
                                                        className: "profile-enter profile-enter-d1 flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center",
                                                        children: [
                                                            (0, ch.jsx)(iW.A, { size: 32, className: "text-slate-500" }),
                                                            (0, ch.jsxs)("div", { children: [(0, ch.jsx)("h3", { className: "text-base font-bold text-white", children: "Nenhum binder criado ainda" }), (0, ch.jsx)("p", { className: "mt-1 text-xs text-slate-400", children: "Crie seu primeiro binder com capas tem\xe1ticas e grades personalizadas para destac\xe1-lo aqui." })] }),
                                                            (0, ch.jsxs)(cl(), { href: "/binders/new", className: "mt-2 inline-flex items-center gap-2 rounded-xl bg-poke-blue px-4 py-2 text-xs font-bold text-white shadow-md shadow-poke-blue/20 hover:opacity-90", children: [(0, ch.jsx)(iV.A, { size: 15 }), (0, ch.jsx)("span", { children: "Criar Primeiro Binder" })] }),
                                                        ],
                                                    })
                                                  : null,
                                            (0, ch.jsxs)("section", {
                                                className: "profile-enter profile-enter-d2 flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#12151d]/90 p-5 shadow-xl backdrop-blur-md sm:p-6",
                                                children: [
                                                    (0, ch.jsxs)("div", {
                                                        className: "flex flex-wrap items-center justify-between gap-3",
                                                        children: [
                                                            (0, ch.jsxs)("div", { children: [(0, ch.jsx)("h2", { className: "text-base font-bold text-white sm:text-lg", children: ag ? "Outros Binders" : "Vitrine de Binders" }), (0, ch.jsx)("p", { className: "text-xs text-slate-400", children: ag ? "Gerencie a visibilidade p\xfablica e defina qual binder \xe9 o destaque principal." : "Outros binders p\xfablicos organizados por este treinador." })] }),
                                                            ag && (0, ch.jsxs)(cl(), { href: "/binders/new", className: "flex items-center gap-1.5 rounded-xl border border-poke-blue/40 bg-poke-blue/15 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:border-poke-blue/60 hover:bg-poke-blue/25", children: [(0, ch.jsx)(iV.A, { size: 14 }), (0, ch.jsx)("span", { children: "Novo Binder" })] }),
                                                        ],
                                                    }),
                                                    0 === al.length
                                                        ? (0, ch.jsxs)("div", { className: "flex flex-col items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/[0.015] py-8 text-center text-xs text-slate-500", children: [(0, ch.jsx)(iW.A, { size: 24, className: "opacity-40" }), (0, ch.jsx)("span", { children: ag ? "Voc\xea n\xe3o possui outros binders al\xe9m do destaque." : "Nenhum outro binder p\xfablico dispon\xedvel." })] })
                                                        : (0, ch.jsx)("div", {
                                                              className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
                                                              children: al.map((a) => {
                                                                  let b = (0, iF.v)(a.cover_theme);
                                                                  return (0, ch.jsxs)(
                                                                      "div",
                                                                      {
                                                                          className: "group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0d1017] transition-all hover:border-white/20 hover:shadow-xl",
                                                                          children: [
                                                                              (0, ch.jsx)("div", { className: "h-3 w-full", style: { backgroundColor: b.primaryColor } }),
                                                                              (0, ch.jsxs)("div", {
                                                                                  className: "flex flex-1 flex-col gap-3 p-4",
                                                                                  children: [
                                                                                      (0, ch.jsxs)("div", {
                                                                                          className: "flex items-start justify-between gap-2",
                                                                                          children: [
                                                                                              (0, ch.jsxs)("div", { children: [(0, ch.jsx)("h3", { className: "font-bold text-white group-hover:text-poke-blue transition-colors", children: a.name }), a.description && (0, ch.jsx)("p", { className: "mt-0.5 line-clamp-2 text-[11px] text-slate-400", children: a.description })] }),
                                                                                              ag &&
                                                                                                  (0, ch.jsx)("button", {
                                                                                                      type: "button",
                                                                                                      onClick: () => $(a.id, !a.is_public),
                                                                                                      disabled: X === a.id,
                                                                                                      title: a.is_public ? "Tornar privado" : "Tornar p\xfablico",
                                                                                                      className: `shrink-0 rounded-lg border p-1.5 transition-colors ${a.is_public ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25" : "border-slate-500/40 bg-slate-500/15 text-slate-400 hover:bg-slate-500/25"}`,
                                                                                                      children: a.is_public ? (0, ch.jsx)(i1.A, { size: 13 }) : (0, ch.jsx)(i2.A, { size: 13 }),
                                                                                                  }),
                                                                                          ],
                                                                                      }),
                                                                                      (0, ch.jsxs)("div", {
                                                                                          className: "flex flex-wrap items-center gap-1.5 text-[10px]",
                                                                                          children: [
                                                                                              (0, ch.jsxs)("span", { className: "rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-medium text-slate-300", children: ["Grade ", a.grid_type] }),
                                                                                              (0, ch.jsxs)("span", { className: "rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-medium text-slate-300", children: [a.total_pages, " ", 1 === a.total_pages ? "p\xe1g" : "p\xe1gs"] }),
                                                                                              (0, ch.jsxs)("span", { className: "rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-medium text-slate-400", children: [a.total_cards ?? 0, "/", a.total_slots ?? 0, " cartas"] }),
                                                                                          ],
                                                                                      }),
                                                                                      (0, ch.jsxs)("div", {
                                                                                          children: [
                                                                                              (0, ch.jsxs)("div", { className: "flex items-center justify-between text-[11px]", children: [(0, ch.jsx)("span", { className: "text-slate-400", children: "Preenchimento" }), (0, ch.jsxs)("span", { className: "font-mono font-bold text-poke-blue", children: [a.completion_percentage ?? 0, "%"] })] }),
                                                                                              (0, ch.jsx)("div", { className: "mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10", children: (0, ch.jsx)("div", { className: "h-full rounded-full bg-poke-blue transition-all duration-300", style: { width: `${a.completion_percentage ?? 0}%` } }) }),
                                                                                          ],
                                                                                      }),
                                                                                  ],
                                                                              }),
                                                                              (0, ch.jsxs)("div", {
                                                                                  className: "flex items-center justify-between border-t border-white/5 bg-white/[0.02] p-3",
                                                                                  children: [
                                                                                      ag ? (0, ch.jsxs)("button", { type: "button", onClick: () => Z(a.id), disabled: X === a.id, className: "flex cursor-pointer items-center gap-1 text-[11px] font-semibold text-amber-300/80 transition-colors hover:text-amber-300", children: [(0, ch.jsx)(i0.A, { size: 13 }), (0, ch.jsx)("span", { children: "Tornar Destaque" })] }) : (0, ch.jsx)("span", {}),
                                                                                      (0, ch.jsxs)("div", {
                                                                                          className: "flex items-center gap-2",
                                                                                          children: [
                                                                                              ag && (0, ch.jsx)(cl(), { href: `/binders/${a.id}/edit`, className: "rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-400 hover:text-white transition-colors", title: "Editar Binder", children: (0, ch.jsx)(i_.A, { size: 13 }) }),
                                                                                              (0, ch.jsxs)(cl(), { href: `/binders/${a.id}`, className: "flex items-center gap-1 rounded-lg bg-poke-blue px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-poke-blue/90", children: [(0, ch.jsx)("span", { children: "Abrir" }), (0, ch.jsx)(i3, { size: 12 })] }),
                                                                                          ],
                                                                                      }),
                                                                                  ],
                                                                              }),
                                                                          ],
                                                                      },
                                                                      a.id,
                                                                  );
                                                              }),
                                                          }),
                                                ],
                                            }),
                                            af.length > 0 &&
                                                (0, ch.jsxs)("section", {
                                                    className: "profile-enter profile-enter-d3 rounded-2xl border border-white/10 bg-[#12151d]/90 p-5 shadow-xl backdrop-blur-md sm:p-6",
                                                    children: [
                                                        (0, ch.jsxs)("div", { className: "mb-4", children: [(0, ch.jsx)("h3", { className: "text-base font-bold text-white", children: "Distribui\xe7\xe3o por raridades" }), (0, ch.jsx)("p", { className: "text-xs text-slate-400", children: "Nomes oficiais das raridades (Pok\xe9mon Estampas Ilustradas)" })] }),
                                                        (0, ch.jsx)("ul", {
                                                            className: "divide-y divide-white/10",
                                                            children: af.map((a) => {
                                                                let b = (0, iG._I)(a.label),
                                                                    c = Math.max(4, Math.round((a.count / am) * 100));
                                                                return (0, ch.jsxs)(
                                                                    "li",
                                                                    {
                                                                        className: "flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:gap-4",
                                                                        children: [
                                                                            (0, ch.jsx)("div", { className: "flex w-full items-center justify-between gap-2 sm:w-44 sm:shrink-0 sm:justify-start", children: (0, ch.jsx)("span", { className: `rounded border px-1.5 py-0.5 text-[10px] font-bold ${b.badgeClasses}`, children: b.label }) }),
                                                                            (0, ch.jsx)("div", { className: "min-w-0 flex-1", children: (0, ch.jsx)("div", { className: "h-2 w-full overflow-hidden rounded-full bg-white/10", children: (0, ch.jsx)("div", { className: "h-full rounded-full bg-poke-blue transition-all duration-500", style: { width: `${c}%` } }) }) }),
                                                                            (0, ch.jsx)("span", { className: "shrink-0 font-mono text-sm font-bold text-white sm:w-10 sm:text-right", children: a.count }),
                                                                        ],
                                                                    },
                                                                    a.label,
                                                                );
                                                            }),
                                                        }),
                                                    ],
                                                }),
                                        ],
                                    },
                                    a,
                                ),
                            }),
                            D
                                ? (0, ch.jsx)("div", {
                                      className: "modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-sm",
                                      "data-overlay-state": E,
                                      role: "dialog",
                                      "aria-modal": "true",
                                      "aria-label": "Selecionar cartas em destaque",
                                      onClick: (a) => {
                                          a.target !== a.currentTarget || q || t(!1);
                                      },
                                      children: (0, ch.jsxs)("div", {
                                          className: "modal-surface flex h-dvh max-h-none w-full max-w-none flex-col overflow-hidden rounded-none border-0 bg-[#12151d] shadow-2xl sm:h-[85vh] sm:max-h-[820px] sm:max-w-3xl sm:rounded-2xl sm:border sm:border-white/10",
                                          children: [
                                              (0, ch.jsxs)("div", {
                                                  className: "flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4",
                                                  children: [
                                                      (0, ch.jsxs)("div", { children: [(0, ch.jsx)("h3", { className: "text-base font-bold text-white", children: "Escolher cartas em destaque" }), (0, ch.jsxs)("p", { className: "text-xs text-slate-400", children: ["Toque para selecionar ou remover \xb7 ", o.length, "/4"] })] }),
                                                      (0, ch.jsx)("button", { type: "button", onClick: () => t(!1), className: "rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10", children: "Pronto" }),
                                                  ],
                                              }),
                                              (0, ch.jsxs)("div", {
                                                  className: "flex shrink-0 flex-col gap-2.5 border-b border-white/10 px-4 py-3",
                                                  children: [
                                                      (0, ch.jsxs)("div", {
                                                          className: "relative w-full",
                                                          children: [
                                                              (0, ch.jsx)(i4.A, { size: 15, className: "absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" }),
                                                              (0, ch.jsx)(iB.D, { type: "text", value: u, onChange: (a) => v(a.target.value), placeholder: "Buscar por pok\xe9mon, n\xfamero, cole\xe7\xe3o ou pok\xe9dex...", placeholderClassName: "left-9 right-9", className: "w-full h-9 sm:h-10 rounded-xl border border-white/10 bg-white/5 py-2 sm:py-2.5 pr-9 pl-9 text-xs sm:text-sm text-white transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none" }),
                                                              u ? (0, ch.jsx)("button", { type: "button", onClick: () => v(""), "aria-label": "Limpar busca", className: "absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-500 hover:text-white", children: (0, ch.jsx)(iU.A, { size: 14 }) }) : null,
                                                          ],
                                                      }),
                                                      (0, ch.jsxs)("div", {
                                                          className: "grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2",
                                                          children: [
                                                              (0, ch.jsx)(iC.l, { value: w, onChange: y, options: i8, icon: (0, ch.jsx)(iW.A, { size: 13 }), ariaLabel: "Filtrar por status no binder", size: "sm", className: "min-w-0 w-full" }),
                                                              (0, ch.jsx)(iC.l, { value: z, onChange: A, options: i9, icon: (0, ch.jsx)(i1.A, { size: 13 }), ariaLabel: "Filtrar por idioma", size: "sm", className: "min-w-0 w-full" }),
                                                              (0, ch.jsx)(iC.l, { value: B, onChange: C, options: iG.OI, icon: (0, ch.jsx)(i5.A, { size: 13 }), ariaLabel: "Filtrar por raridade", size: "sm", className: "min-w-0 w-full" }),
                                                              (0, ch.jsx)(iC.l, { value: F, onChange: G, options: N, icon: (0, ch.jsx)(i6.A, { size: 13 }), ariaLabel: "Filtrar por ilustrador", size: "sm", className: "min-w-0 w-full" }),
                                                          ],
                                                      }),
                                                  ],
                                              }),
                                              (0, ch.jsx)("div", {
                                                  ref: K,
                                                  className: "min-h-0 flex-1 overflow-y-auto p-4",
                                                  children:
                                                      0 === h.length
                                                          ? (0, ch.jsxs)("div", {
                                                                className: "flex h-full flex-col items-center justify-center gap-2 py-12 text-center",
                                                                children: [(0, ch.jsx)(i7.A, { size: 28, className: "text-slate-600" }), (0, ch.jsx)("p", { className: "text-sm text-slate-400", children: "Nenhuma carta na cole\xe7\xe3o ainda." }), (0, ch.jsx)(cl(), { href: "/collection", prefetch: !0, className: "mt-2 text-xs font-semibold text-poke-blue", children: "Ir para a Cole\xe7\xe3o" })],
                                                            })
                                                          : 0 === O.length
                                                            ? (0, ch.jsxs)("div", {
                                                                  className: "flex h-full flex-col items-center justify-center gap-2 py-12 text-center",
                                                                  children: [
                                                                      (0, ch.jsx)(i4.A, { size: 26, className: "text-slate-600" }),
                                                                      (0, ch.jsx)("p", { className: "text-sm font-semibold text-white", children: "Nenhuma carta encontrada" }),
                                                                      (0, ch.jsx)("p", { className: "text-xs text-slate-400", children: "Tente ajustar a busca ou os filtros." }),
                                                                      (0, ch.jsx)("button", {
                                                                          type: "button",
                                                                          onClick: () => {
                                                                              (v(""), y("all"), A("all"), C("all"), G(iK.ej));
                                                                          },
                                                                          className: "mt-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10",
                                                                          children: "Limpar filtros",
                                                                      }),
                                                                  ],
                                                              })
                                                            : (0, ch.jsxs)("div", {
                                                                  className: "flex flex-col gap-3",
                                                                  children: [
                                                                      (0, ch.jsx)("div", {
                                                                          className: "grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5",
                                                                          children: P.map((a) => {
                                                                              let b = o.includes(a.id);
                                                                              return (0, ch.jsxs)(
                                                                                  "button",
                                                                                  {
                                                                                      type: "button",
                                                                                      onClick: () => _(a.id),
                                                                                      className: `relative flex flex-col rounded-xl border p-1.5 text-left transition-all active:scale-[0.98] ${b ? "border-poke-blue bg-poke-blue/10 ring-1 ring-poke-blue/40" : "border-white/10 bg-white/[0.03] hover:border-white/25"}`,
                                                                                      children: [
                                                                                          (0, ch.jsx)("span", { className: `absolute right-1.5 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full border shadow-md transition-colors ${b ? "border-emerald-400/60 bg-emerald-500 text-white shadow-emerald-500/25" : "border-white/20 bg-black/70 text-slate-400"}`, children: b ? (0, ch.jsx)(iX.A, { size: 13, strokeWidth: 3 }) : (0, ch.jsx)(iV.A, { size: 13, strokeWidth: 2.5 }) }),
                                                                                          (0, ch.jsx)("div", { className: "relative aspect-[8/11] w-full", children: (0, ch.jsx)(iy.MH, { src: (0, iD.HO)(a.card_image_url), alt: a.card_name, sizes: "100px", className: "object-contain" }) }),
                                                                                          (0, ch.jsxs)("div", { className: "mt-1 flex items-center justify-between gap-1 w-full", children: [(0, ch.jsx)("span", { className: "truncate text-[9px] font-semibold text-white", children: a.card_name }), a.card_condition && (0, ch.jsx)(iJ.J, { condition: a.card_condition, size: "xs" })] }),
                                                                                      ],
                                                                                  },
                                                                                  a.id,
                                                                              );
                                                                          }),
                                                                      }),
                                                                      (0, ch.jsx)("div", { ref: S, className: "flex min-h-8 items-center justify-center", "aria-hidden": !Q }),
                                                                  ],
                                                              }),
                                              }),
                                          ],
                                      }),
                                  })
                                : null,
                            (0, ch.jsx)(iz.O, { src: H?.src ?? null, alt: H?.alt, shineMode: H?.shineMode, elementTypes: H?.elementTypes, onClose: U }),
                        ],
                    });
                }
            },
            8849: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("Plus", [
                    ["path", { d: "M5 12h14", key: "1ays0h" }],
                    ["path", { d: "M12 5v14", key: "s699le" }],
                ]);
            },
            10846: (a) => {
                "use strict";
                a.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");
            },
            13919: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { GlobalError: () => F.a, __next_app__: () => L, handler: () => N, pages: () => K, routeModule: () => M, tree: () => J }));
                var d = c(49754),
                    e = c(9117),
                    f = c(46595),
                    g = c(32324),
                    h = c(39326),
                    i = c(38928),
                    j = c(20175),
                    k = c(12),
                    l = c(54290),
                    m = c(12696),
                    n = c(52574),
                    o = c(82802),
                    p = c(77533),
                    q = c(45229),
                    r = c(32822),
                    s = c(261),
                    t = c(26453),
                    u = c(52474),
                    v = c(26713),
                    w = c(51356),
                    y = c(62685),
                    z = c(36225),
                    A = c(63446),
                    B = c(2762),
                    C = c(45742),
                    D = c(86439),
                    E = c(81170),
                    F = c.n(E),
                    G = c(62506),
                    H = c(91203),
                    I = {};
                for (let a in G) 0 > ["default", "tree", "pages", "GlobalError", "__next_app__", "routeModule", "handler"].indexOf(a) && (I[a] = () => G[a]);
                c.d(b, I);
                let J = {
                        children: [
                            "",
                            { children: ["perfil", { children: ["[username]", { children: ["__PAGE__", {}, { page: [() => Promise.resolve().then(c.bind(c, 15435)), "/home/paulo_rosado/MyPokeBinder/src/app/perfil/[username]/page.tsx"] }] }, {}] }, {}] },
                            {
                                layout: [() => Promise.resolve().then(c.bind(c, 51472)), "/home/paulo_rosado/MyPokeBinder/src/app/layout.tsx"],
                                "global-error": [() => Promise.resolve().then(c.t.bind(c, 81170, 23)), "next/dist/client/components/builtin/global-error.js"],
                                "not-found": [() => Promise.resolve().then(c.bind(c, 59732)), "/home/paulo_rosado/MyPokeBinder/src/app/not-found.tsx"],
                                forbidden: [() => Promise.resolve().then(c.t.bind(c, 90461, 23)), "next/dist/client/components/builtin/forbidden.js"],
                                unauthorized: [() => Promise.resolve().then(c.t.bind(c, 32768, 23)), "next/dist/client/components/builtin/unauthorized.js"],
                            },
                        ],
                    }.children,
                    K = ["/home/paulo_rosado/MyPokeBinder/src/app/perfil/[username]/page.tsx"],
                    L = { require: c, loadChunk: () => Promise.resolve() },
                    M = new d.AppPageRouteModule({ definition: { kind: e.RouteKind.APP_PAGE, page: "/perfil/[username]/page", pathname: "/perfil/[username]", bundlePath: "", filename: "", appPaths: [] }, userland: { loaderTree: J }, distDir: ".next", relativeProjectDir: "" });
                async function N(a, b, d) {
                    var E;
                    let I = "/perfil/[username]/page";
                    "/index" === I && (I = "/");
                    let O = (0, h.getRequestMeta)(a, "postponed"),
                        P = (0, h.getRequestMeta)(a, "minimalMode"),
                        Q = await M.prepare(a, b, { srcPage: I, multiZoneDraftMode: !1 });
                    if (!Q) return ((b.statusCode = 400), b.end("Bad Request"), null == d.waitUntil || d.waitUntil.call(d, Promise.resolve()), null);
                    let { buildId: R, query: S, params: T, parsedUrl: U, pageIsDynamic: V, buildManifest: W, nextFontManifest: X, reactLoadableManifest: Y, serverActionsManifest: Z, clientReferenceManifest: $, subresourceIntegrityManifest: _, prerenderManifest: aa, isDraftMode: ab, resolvedPathname: ac, revalidateOnlyGenerated: ad, routerServerContext: ae, nextConfig: af, interceptionRoutePatterns: ag } = Q,
                        ah = U.pathname || "/",
                        ai = (0, s.normalizeAppPath)(I),
                        { isOnDemandRevalidate: aj } = Q,
                        ak = M.match(ah, aa),
                        al = !!aa.routes[ac],
                        am = !!(ak || al || aa.routes[ai]),
                        an = a.headers["user-agent"] || "",
                        ao = (0, v.getBotType)(an),
                        ap = (0, q.isHtmlBotRequest)(a),
                        aq = (0, h.getRequestMeta)(a, "isPrefetchRSCRequest") ?? "1" === a.headers[u.NEXT_ROUTER_PREFETCH_HEADER],
                        ar = (0, h.getRequestMeta)(a, "isRSCRequest") ?? (0, n.f)(a.headers[u.RSC_HEADER]),
                        as = (0, t.getIsPossibleServerAction)(a),
                        at = (0, m.checkIsAppPPREnabled)(af.experimental.ppr) && (null == (E = aa.routes[ai] ?? aa.dynamicRoutes[ai]) ? void 0 : E.renderingMode) === "PARTIALLY_STATIC",
                        au = !1,
                        av = !1,
                        aw = at ? O : void 0,
                        ax = at && ar && !aq,
                        ay = (0, h.getRequestMeta)(a, "segmentPrefetchRSCRequest"),
                        az = !an || (0, q.shouldServeStreamingMetadata)(an, af.htmlLimitedBots);
                    ap && at && ((am = !1), (az = !1));
                    let aA = !0 === M.isDev || !am || "string" == typeof O || ax,
                        aB = ap && at,
                        aC = null;
                    ab || !am || aA || as || aw || ax || (aC = ac);
                    let aD = aC;
                    (!aD && M.isDev && (aD = ac), M.isDev || ab || !am || !ar || ax || (0, k.d)(a.headers));
                    let aE = { ...G, tree: J, pages: K, GlobalError: F(), handler: N, routeModule: M, __next_app__: L };
                    Z && $ && (0, p.setReferenceManifestsSingleton)({ page: I, clientReferenceManifest: $, serverActionsManifest: Z, serverModuleMap: (0, r.createServerModuleMap)({ serverActionsManifest: Z }) });
                    let aF = a.method || "GET",
                        aG = (0, g.getTracer)(),
                        aH = aG.getActiveScopeSpan();
                    try {
                        let f = M.getVaryHeader(ac, ag);
                        b.setHeader("Vary", f);
                        let k = async (c, d) => {
                                let e = new l.NodeNextRequest(a),
                                    f = new l.NodeNextResponse(b);
                                return M.render(e, f, d).finally(() => {
                                    if (!c) return;
                                    c.setAttributes({ "http.status_code": b.statusCode, "next.rsc": !1 });
                                    let d = aG.getRootSpanAttributes();
                                    if (!d) return;
                                    if (d.get("next.span_type") !== i.BaseServerSpan.handleRequest) return void console.warn(`Unexpected root span type '${d.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);
                                    let e = d.get("next.route");
                                    if (e) {
                                        let a = `${aF} ${e}`;
                                        (c.setAttributes({ "next.route": e, "http.route": e, "next.span_name": a }), c.updateName(a));
                                    } else c.updateName(`${aF} ${a.url}`);
                                });
                            },
                            m = async ({ span: e, postponed: f, fallbackRouteParams: g }) => {
                                let i = {
                                        query: S,
                                        params: T,
                                        page: ai,
                                        sharedContext: { buildId: R },
                                        serverComponentsHmrCache: (0, h.getRequestMeta)(a, "serverComponentsHmrCache"),
                                        fallbackRouteParams: g,
                                        renderOpts: {
                                            App: () => null,
                                            Document: () => null,
                                            pageConfig: {},
                                            ComponentMod: aE,
                                            Component: (0, j.T)(aE),
                                            params: T,
                                            routeModule: M,
                                            page: I,
                                            postponed: f,
                                            shouldWaitOnAllReady: aB,
                                            serveStreamingMetadata: az,
                                            supportsDynamicResponse: "string" == typeof f || aA,
                                            buildManifest: W,
                                            nextFontManifest: X,
                                            reactLoadableManifest: Y,
                                            subresourceIntegrityManifest: _,
                                            serverActionsManifest: Z,
                                            clientReferenceManifest: $,
                                            setIsrStatus: null == ae ? void 0 : ae.setIsrStatus,
                                            dir: c(33873).join(process.cwd(), M.relativeProjectDir),
                                            isDraftMode: ab,
                                            isRevalidate: am && !f && !ax,
                                            botType: ao,
                                            isOnDemandRevalidate: aj,
                                            isPossibleServerAction: as,
                                            assetPrefix: af.assetPrefix,
                                            nextConfigOutput: af.output,
                                            crossOrigin: af.crossOrigin,
                                            trailingSlash: af.trailingSlash,
                                            previewProps: aa.preview,
                                            deploymentId: af.deploymentId,
                                            enableTainting: af.experimental.taint,
                                            htmlLimitedBots: af.htmlLimitedBots,
                                            devtoolSegmentExplorer: af.experimental.devtoolSegmentExplorer,
                                            reactMaxHeadersLength: af.reactMaxHeadersLength,
                                            multiZoneDraftMode: !1,
                                            incrementalCache: (0, h.getRequestMeta)(a, "incrementalCache"),
                                            cacheLifeProfiles: af.experimental.cacheLife,
                                            basePath: af.basePath,
                                            serverActions: af.experimental.serverActions,
                                            ...(au ? { nextExport: !0, supportsDynamicResponse: !1, isStaticGeneration: !0, isRevalidate: !0, isDebugDynamicAccesses: au } : {}),
                                            experimental: {
                                                isRoutePPREnabled: at,
                                                expireTime: af.expireTime,
                                                staleTimes: af.experimental.staleTimes,
                                                cacheComponents: !!af.experimental.cacheComponents,
                                                clientSegmentCache: !!af.experimental.clientSegmentCache,
                                                clientParamParsing: !!af.experimental.clientParamParsing,
                                                dynamicOnHover: !!af.experimental.dynamicOnHover,
                                                inlineCss: !!af.experimental.inlineCss,
                                                authInterrupts: !!af.experimental.authInterrupts,
                                                clientTraceMetadata: af.experimental.clientTraceMetadata || [],
                                            },
                                            waitUntil: d.waitUntil,
                                            onClose: (a) => {
                                                b.on("close", a);
                                            },
                                            onAfterTaskError: () => {},
                                            onInstrumentationRequestError: (b, c, d) => M.onRequestError(a, b, d, ae),
                                            err: (0, h.getRequestMeta)(a, "invokeError"),
                                            dev: M.isDev,
                                        },
                                    },
                                    l = await k(e, i),
                                    { metadata: m } = l,
                                    { cacheControl: n, headers: o = {}, fetchTags: p } = m;
                                if ((p && (o[A.NEXT_CACHE_TAGS_HEADER] = p), (a.fetchMetrics = m.fetchMetrics), am && (null == n ? void 0 : n.revalidate) === 0 && !M.isDev && !at)) {
                                    let a = m.staticBailoutInfo,
                                        b = Object.defineProperty(
                                            Error(`Page changed from static to dynamic at runtime ${ac}${(null == a ? void 0 : a.description) ? `, reason: ${a.description}` : ""}
see more here https://nextjs.org/docs/messages/app-static-to-dynamic-error`),
                                            "__NEXT_ERROR_CODE",
                                            { value: "E132", enumerable: !1, configurable: !0 },
                                        );
                                    if (null == a ? void 0 : a.stack) {
                                        let c = a.stack;
                                        b.stack = b.message + c.substring(c.indexOf("\n"));
                                    }
                                    throw b;
                                }
                                return { value: { kind: w.CachedRouteKind.APP_PAGE, html: l, headers: o, rscData: m.flightData, postponed: m.postponed, status: m.statusCode, segmentData: m.segmentData }, cacheControl: n };
                            },
                            n = async ({ hasResolved: c, previousCacheEntry: f, isRevalidating: g, span: i }) => {
                                let j,
                                    k = !1 === M.isDev,
                                    l = c || b.writableEnded;
                                if (aj && ad && !f && !P) return ((null == ae ? void 0 : ae.render404) ? await ae.render404(a, b) : ((b.statusCode = 404), b.end("This page could not be found")), null);
                                if ((ak && (j = (0, y.parseFallbackField)(ak.fallback)), j === y.FallbackMode.PRERENDER && (0, v.isBot)(an) && (!at || ap) && (j = y.FallbackMode.BLOCKING_STATIC_RENDER), (null == f ? void 0 : f.isStale) === -1 && (aj = !0), aj && (j !== y.FallbackMode.NOT_FOUND || f) && (j = y.FallbackMode.BLOCKING_STATIC_RENDER), !P && j !== y.FallbackMode.BLOCKING_STATIC_RENDER && aD && !l && !ab && V && (k || !al))) {
                                    let b;
                                    if ((k || ak) && j === y.FallbackMode.NOT_FOUND) throw new D.NoFallbackError();
                                    if (at && !ar) {
                                        let c = "string" == typeof (null == ak ? void 0 : ak.fallback) ? ak.fallback : k ? ai : null;
                                        if (((b = await M.handleResponse({ cacheKey: c, req: a, nextConfig: af, routeKind: e.RouteKind.APP_PAGE, isFallback: !0, prerenderManifest: aa, isRoutePPREnabled: at, responseGenerator: async () => m({ span: i, postponed: void 0, fallbackRouteParams: k || av ? (0, o.u)(ai) : null }), waitUntil: d.waitUntil })), null === b)) return null;
                                        if (b) return (delete b.cacheControl, b);
                                    }
                                }
                                let n = aj || g || !aw ? void 0 : aw;
                                if (au && void 0 !== n) return { cacheControl: { revalidate: 1, expire: void 0 }, value: { kind: w.CachedRouteKind.PAGES, html: z.default.EMPTY, pageData: {}, headers: void 0, status: void 0 } };
                                let p = V && at && ((0, h.getRequestMeta)(a, "renderFallbackShell") || av) ? (0, o.u)(ah) : null;
                                return m({ span: i, postponed: n, fallbackRouteParams: p });
                            },
                            p = async (c) => {
                                var f, g, i, j, k;
                                let l,
                                    o = await M.handleResponse({ cacheKey: aC, responseGenerator: (a) => n({ span: c, ...a }), routeKind: e.RouteKind.APP_PAGE, isOnDemandRevalidate: aj, isRoutePPREnabled: at, req: a, nextConfig: af, prerenderManifest: aa, waitUntil: d.waitUntil });
                                if ((ab && b.setHeader("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate"), M.isDev && b.setHeader("Cache-Control", "no-store, must-revalidate"), !o)) {
                                    if (aC) throw Object.defineProperty(Error("invariant: cache entry required but not generated"), "__NEXT_ERROR_CODE", { value: "E62", enumerable: !1, configurable: !0 });
                                    return null;
                                }
                                if ((null == (f = o.value) ? void 0 : f.kind) !== w.CachedRouteKind.APP_PAGE) throw Object.defineProperty(Error(`Invariant app-page handler received invalid cache entry ${null == (i = o.value) ? void 0 : i.kind}`), "__NEXT_ERROR_CODE", { value: "E707", enumerable: !1, configurable: !0 });
                                let p = "string" == typeof o.value.postponed;
                                am && !ax && (!p || aq) && (P || b.setHeader("x-nextjs-cache", aj ? "REVALIDATED" : o.isMiss ? "MISS" : o.isStale ? "STALE" : "HIT"), b.setHeader(u.NEXT_IS_PRERENDER_HEADER, "1"));
                                let { value: q } = o;
                                if (aw) l = { revalidate: 0, expire: void 0 };
                                else if (P && ar && !aq && at) l = { revalidate: 0, expire: void 0 };
                                else if (!M.isDev)
                                    if (ab) l = { revalidate: 0, expire: void 0 };
                                    else if (am) {
                                        if (o.cacheControl)
                                            if ("number" == typeof o.cacheControl.revalidate) {
                                                if (o.cacheControl.revalidate < 1) throw Object.defineProperty(Error(`Invalid revalidate configuration provided: ${o.cacheControl.revalidate} < 1`), "__NEXT_ERROR_CODE", { value: "E22", enumerable: !1, configurable: !0 });
                                                l = { revalidate: o.cacheControl.revalidate, expire: (null == (j = o.cacheControl) ? void 0 : j.expire) ?? af.expireTime };
                                            } else l = { revalidate: A.CACHE_ONE_YEAR, expire: void 0 };
                                    } else b.getHeader("Cache-Control") || (l = { revalidate: 0, expire: void 0 });
                                if (((o.cacheControl = l), "string" == typeof ay && (null == q ? void 0 : q.kind) === w.CachedRouteKind.APP_PAGE && q.segmentData)) {
                                    b.setHeader(u.NEXT_DID_POSTPONE_HEADER, "2");
                                    let c = null == (k = q.headers) ? void 0 : k[A.NEXT_CACHE_TAGS_HEADER];
                                    P && am && c && "string" == typeof c && b.setHeader(A.NEXT_CACHE_TAGS_HEADER, c);
                                    let d = q.segmentData.get(ay);
                                    return void 0 !== d ? (0, C.sendRenderResult)({ req: a, res: b, generateEtags: af.generateEtags, poweredByHeader: af.poweredByHeader, result: z.default.fromStatic(d, u.RSC_CONTENT_TYPE_HEADER), cacheControl: o.cacheControl }) : ((b.statusCode = 204), (0, C.sendRenderResult)({ req: a, res: b, generateEtags: af.generateEtags, poweredByHeader: af.poweredByHeader, result: z.default.EMPTY, cacheControl: o.cacheControl }));
                                }
                                let r = (0, h.getRequestMeta)(a, "onCacheEntry");
                                if (r && (await r({ ...o, value: { ...o.value, kind: "PAGE" } }, { url: (0, h.getRequestMeta)(a, "initURL") }))) return null;
                                if (p && aw) throw Object.defineProperty(Error("Invariant: postponed state should not be present on a resume request"), "__NEXT_ERROR_CODE", { value: "E396", enumerable: !1, configurable: !0 });
                                if (q.headers) {
                                    let a = { ...q.headers };
                                    for (let [c, d] of ((P && am) || delete a[A.NEXT_CACHE_TAGS_HEADER], Object.entries(a)))
                                        if (void 0 !== d)
                                            if (Array.isArray(d)) for (let a of d) b.appendHeader(c, a);
                                            else ("number" == typeof d && (d = d.toString()), b.appendHeader(c, d));
                                }
                                let s = null == (g = q.headers) ? void 0 : g[A.NEXT_CACHE_TAGS_HEADER];
                                if ((P && am && s && "string" == typeof s && b.setHeader(A.NEXT_CACHE_TAGS_HEADER, s), !q.status || (ar && at) || (b.statusCode = q.status), !P && q.status && H.RedirectStatusCode[q.status] && ar && (b.statusCode = 200), p && b.setHeader(u.NEXT_DID_POSTPONE_HEADER, "1"), ar && !ab)) {
                                    if (void 0 === q.rscData) {
                                        if (q.postponed) throw Object.defineProperty(Error("Invariant: Expected postponed to be undefined"), "__NEXT_ERROR_CODE", { value: "E372", enumerable: !1, configurable: !0 });
                                        return (0, C.sendRenderResult)({ req: a, res: b, generateEtags: af.generateEtags, poweredByHeader: af.poweredByHeader, result: q.html, cacheControl: ax ? { revalidate: 0, expire: void 0 } : o.cacheControl });
                                    }
                                    return (0, C.sendRenderResult)({ req: a, res: b, generateEtags: af.generateEtags, poweredByHeader: af.poweredByHeader, result: z.default.fromStatic(q.rscData, u.RSC_CONTENT_TYPE_HEADER), cacheControl: o.cacheControl });
                                }
                                let t = q.html;
                                if (!p || P || ar) return (0, C.sendRenderResult)({ req: a, res: b, generateEtags: af.generateEtags, poweredByHeader: af.poweredByHeader, result: t, cacheControl: o.cacheControl });
                                if (au)
                                    return (
                                        t.push(
                                            new ReadableStream({
                                                start(a) {
                                                    (a.enqueue(B.ENCODED_TAGS.CLOSED.BODY_AND_HTML), a.close());
                                                },
                                            }),
                                        ),
                                        (0, C.sendRenderResult)({ req: a, res: b, generateEtags: af.generateEtags, poweredByHeader: af.poweredByHeader, result: t, cacheControl: { revalidate: 0, expire: void 0 } })
                                    );
                                let v = new TransformStream();
                                return (
                                    t.push(v.readable),
                                    m({ span: c, postponed: q.postponed, fallbackRouteParams: null })
                                        .then(async (a) => {
                                            var b, c;
                                            if (!a) throw Object.defineProperty(Error("Invariant: expected a result to be returned"), "__NEXT_ERROR_CODE", { value: "E463", enumerable: !1, configurable: !0 });
                                            if ((null == (b = a.value) ? void 0 : b.kind) !== w.CachedRouteKind.APP_PAGE) throw Object.defineProperty(Error(`Invariant: expected a page response, got ${null == (c = a.value) ? void 0 : c.kind}`), "__NEXT_ERROR_CODE", { value: "E305", enumerable: !1, configurable: !0 });
                                            await a.value.html.pipeTo(v.writable);
                                        })
                                        .catch((a) => {
                                            v.writable.abort(a).catch((a) => {
                                                console.error("couldn't abort transformer", a);
                                            });
                                        }),
                                    (0, C.sendRenderResult)({ req: a, res: b, generateEtags: af.generateEtags, poweredByHeader: af.poweredByHeader, result: t, cacheControl: { revalidate: 0, expire: void 0 } })
                                );
                            };
                        if (!aH) return await aG.withPropagatedContext(a.headers, () => aG.trace(i.BaseServerSpan.handleRequest, { spanName: `${aF} ${a.url}`, kind: g.SpanKind.SERVER, attributes: { "http.method": aF, "http.target": a.url } }, p));
                        await p(aH);
                    } catch (b) {
                        throw (b instanceof D.NoFallbackError || (await M.onRequestError(a, b, { routerKind: "App Router", routePath: I, routeType: "render", revalidateReason: (0, f.c)({ isRevalidate: am, isOnDemandRevalidate: aj }) }, ae)), b);
                    }
                }
            },
            15435: (a, b, c) => {
                "use strict";
                (c.r(b), c.d(b, { default: () => l }));
                var d = c(75338),
                    e = c(74515),
                    f = c(82161),
                    g = c(48152),
                    h = c(35868),
                    i = c(51771),
                    j = c(41495),
                    k = c(90664);
                function l({ params: a }) {
                    return (0, d.jsx)(e.Suspense, { fallback: (0, d.jsx)(i.ProfileRouteLoading, {}), children: (0, d.jsx)(m, { params: a }) });
                }
                async function m({ params: a }) {
                    let { username: b } = await a,
                        c = ((0, k.rO)(b) ?? b ?? "").trim();
                    if (k.Ii.test(c)) {
                        let a = await (0, g.U)(),
                            { data: b } = await a.from("profiles").select("username").eq("id", c).maybeSingle();
                        b?.username && (0, f.redirect)(`/perfil/${b.username}`);
                    }
                    let e = c.toLowerCase(),
                        i = (0, g.U)(),
                        l = (0, j.x4)(e),
                        [m, n] = await Promise.all([i, l]),
                        {
                            data: { user: o },
                        } = await m.auth.getUser();
                    return (0, d.jsx)(h.TrainerProfileView, { username: e, fallbackData: n ? (0, j.gK)((0, j.NY)(n), o) : void 0 });
                }
            },
            19121: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/action-async-storage.external.js");
            },
            22842: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("Lock", [
                    ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
                    ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }],
                ]);
            },
            26713: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/router/utils/is-bot");
            },
            28354: (a) => {
                "use strict";
                a.exports = require("util");
            },
            29294: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/work-async-storage.external.js");
            },
            30733: (a, b, c) => {
                "use strict";
                c.d(b, { A: () => d });
                let d = (0, c(23339).A)("Star", [["path", { d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z", key: "r04s7s" }]]);
            },
            33873: (a) => {
                "use strict";
                a.exports = require("path");
            },
            35868: (a, b, c) => {
                "use strict";
                c.d(b, { TrainerProfileView: () => d });
                let d = (0, c(97954).registerClientReference)(
                    function () {
                        throw Error("Attempted to call TrainerProfileView() from the server but TrainerProfileView is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
                    },
                    "/home/paulo_rosado/MyPokeBinder/src/components/profile/TrainerProfileView.tsx",
                    "TrainerProfileView",
                );
            },
            40029: (a, b, c) => {
                "use strict";
                c.d(b, { v: () => e, wZ: () => d });
                let d = {
                    classic_red: { id: "classic_red", name: "Vermelho Cl\xe1ssico", primaryColor: "#ef4444", glowColor: "rgba(239, 68, 68, 0.4)", bgGradient: "from-[#2b0f14] via-[#1a0c10] to-[#0c0608]", borderAccent: "#ef4444", leatherClass: "border-red-900/40 bg-[#160b0e]", ballType: "pokeball", material: "Couro granulado" },
                    ocean_blue: { id: "ocean_blue", name: "Azul Oceano", primaryColor: "#3b82f6", glowColor: "rgba(59, 130, 246, 0.4)", bgGradient: "from-[#0f1d2e] via-[#0c1524] to-[#060a12]", borderAccent: "#3b82f6", leatherClass: "border-blue-900/40 bg-[#0a111c]", ballType: "greatball", material: "Tecido t\xe9cnico" },
                    forest_green: { id: "forest_green", name: "Verde Floresta", primaryColor: "#10b981", glowColor: "rgba(16, 185, 129, 0.4)", bgGradient: "from-[#0e241b] via-[#091a13] to-[#050e0a]", borderAccent: "#10b981", leatherClass: "border-emerald-900/40 bg-[#07130e]", ballType: "safariball", material: "Lona encerada" },
                    electric_yellow: { id: "electric_yellow", name: "Amarelo El\xe9trico", primaryColor: "#eab308", glowColor: "rgba(234, 179, 8, 0.4)", bgGradient: "from-[#2b240f] via-[#1c170a] to-[#0d0b05]", borderAccent: "#eab308", leatherClass: "border-yellow-900/40 bg-[#141107]", ballType: "ultraball", material: "Vinil texturizado" },
                    shadow_purple: { id: "shadow_purple", name: "Roxo Noturno", primaryColor: "#a855f7", glowColor: "rgba(168, 85, 247, 0.4)", bgGradient: "from-[#23102d] via-[#180a20] to-[#0b040f]", borderAccent: "#a855f7", leatherClass: "border-purple-900/40 bg-[#120718]", ballType: "masterball", material: "Couro escovado" },
                    charcoal_black: { id: "charcoal_black", name: "Couro Preto \xd4nix", primaryColor: "#94a3b8", glowColor: "rgba(148, 163, 184, 0.3)", bgGradient: "from-[#1c202a] via-[#13161e] to-[#090b0e]", borderAccent: "#cbd5e1", leatherClass: "border-slate-800 bg-[#0d0f14]", ballType: "duskball", material: "Couro liso" },
                    golden_luxury: { id: "golden_luxury", name: "Dourado Nobre", primaryColor: "#f59e0b", glowColor: "rgba(245, 158, 11, 0.45)", bgGradient: "from-[#33220e] via-[#211508] to-[#0f0904]", borderAccent: "#f59e0b", leatherClass: "border-amber-900/40 bg-[#170f06]", ballType: "luxuryball", material: "Couro acetinado" },
                };
                function e(a) {
                    return d[a || "classic_red"] || d.classic_red;
                }
                Object.keys(d);
            },
            41025: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/dynamic-access-async-storage.external.js");
            },
            63033: (a) => {
                "use strict";
                a.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");
            },
            66659: (a, b, c) => {
                (Promise.resolve().then(c.bind(c, 59265)), Promise.resolve().then(c.bind(c, 5870)));
            },
            67339: (a, b, c) => {
                (Promise.resolve().then(c.bind(c, 51771)), Promise.resolve().then(c.bind(c, 35868)));
            },
            86439: (a) => {
                "use strict";
                a.exports = require("next/dist/shared/lib/no-fallback-error.external");
            },
        }));
    var b = require("../../../webpack-runtime.js");
    b.C(a);
    var c = b.X(0, [8301, 991, 582, 6780, 708, 7633, 9321, 1160, 8372, 1495, 6849, 1072, 323, 7936], () => b((b.s = 13919)));
    module.exports = c;
})();
