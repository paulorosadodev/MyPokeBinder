"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [1013],
    {
        1013: (e, t, a) => {
            a.d(t, { Qg: () => b, UserSettingsProvider: () => p, b3: () => c, cm: () => u, w2: () => s });
            var l = a(5155),
                n = a(2115),
                i = a(63),
                r = a(4577),
                o = a(6648);
            let c = [
                { id: "emerald", label: "Venusaur Emerald", color: "#10b981", dexId: 3, pokemonName: "Venusaur", ballType: "safariball", ballName: "Safari Ball", type: "Planta", soundTier: 3, description: "Energia natural exuberante e a vivacidade da Safari Ball" },
                { id: "red", label: "Charizard Red", color: "#ef4444", dexId: 6, pokemonName: "Charizard", ballType: "pokeball", ballName: "Pok\xe9 Ball", type: "Fogo", soundTier: 3, description: "Chamas ardentes e o cl\xe1ssico rubro da Pok\xe9 Ball original" },
                { id: "blue", label: "Blastoise Blue", color: "#3b82f6", dexId: 9, pokemonName: "Blastoise", ballType: "greatball", ballName: "Great Ball", type: "\xc1gua", soundTier: 2, description: "Jatos d'\xe1gua torrenciais com a precis\xe3o da Great Ball" },
                { id: "amber", label: "Pikachu Amber", color: "#f59e0b", dexId: 25, pokemonName: "Pikachu", ballType: "ultraball", ballName: "Ultra Ball", type: "El\xe9trico", soundTier: 1, description: "Descargas el\xe9tricas e a sofistica\xe7\xe3o da Ultra Ball" },
                { id: "purple", label: "Gengar Purple", color: "#8b5cf6", dexId: 94, pokemonName: "Gengar", ballType: "masterball", ballName: "Master Ball", type: "Fantasma", soundTier: 2, description: "Sombras enigm\xe1ticas e o poder definitivo da Master Ball" },
                { id: "pink", label: "Mew Pink", color: "#ec4899", dexId: 151, pokemonName: "Mew", ballType: "loveball", ballName: "Love Ball", type: "Ps\xedquico", soundTier: 3, description: "O ancestral m\xedtico com a ternura c\xf3smica da Love Ball" },
            ];
            function s(e) {
                if (!e) return "pokeball";
                let t = e.toLowerCase(),
                    a = c.find((e) => e.color.toLowerCase() === t);
                return a ? a.ballType : "pokeball";
            }
            let u = (0, n.createContext)(null);
            function d(e) {
                if ("undefined" == typeof document) return;
                let t = s(e),
                    a = '<path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="'.concat(e, '"/>');
                "greatball" === t
                    ? (a = '<path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#3b82f6"/><path d="M 22 24 C 28 32 30 42 30 50 L 38 50 C 38 40 35 28 28 17 Z" fill="#ef4444"/><path d="M 78 24 C 72 32 70 42 70 50 L 62 50 C 62 40 65 28 72 17 Z" fill="#ef4444"/>')
                    : "ultraball" === t
                      ? (a = '<path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#1e293b"/><path d="M 24 16 L 36 24 L 32 50 L 22 50 Z" fill="#f59e0b"/><path d="M 76 16 L 64 24 L 68 50 L 78 50 Z" fill="#f59e0b"/><path d="M 36 16 Q 50 10 64 16 L 62 23 Q 50 18 38 23 Z" fill="#f59e0b"/>')
                      : "masterball" === t
                        ? (a = '<path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#8b5cf6"/><ellipse cx="28" cy="30" rx="9" ry="8" fill="#ec4899"/><ellipse cx="72" cy="30" rx="9" ry="8" fill="#ec4899"/><path d="M 43 28 L 47 18 L 50 23 L 53 18 L 57 28 L 54 28 L 52 22 L 50 26 L 48 22 L 46 28 Z" fill="#ffffff"/>')
                        : "safariball" === t
                          ? (a = '<path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#10b981"/><path d="M 18 32 Q 28 20 42 26 Q 34 38 24 44 Z" fill="#047857" opacity="0.8"/><circle cx="50" cy="34" r="7" fill="#34d399" opacity="0.8"/>')
                          : "loveball" === t && (a = '<path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#ec4899"/><path d="M 50 36 C 47 30 40 30 40 24 C 40 19 45 17 50 22 C 55 17 60 19 60 24 C 60 30 53 30 50 36 Z" fill="#ffffff"/>');
                let l = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'.concat(a, '<path d="M 4 50 A 46 46 0 0 0 96 50 Z" fill="#f8fafc"/><line x1="4" y1="50" x2="96" y2="50" stroke="#0f172a" stroke-width="8"/><circle cx="50" cy="50" r="46" fill="none" stroke="#0f172a" stroke-width="8"/><circle cx="50" cy="50" r="16" fill="#0f172a"/><circle cx="50" cy="50" r="10" fill="#f8fafc"/><circle cx="50" cy="50" r="5" fill="').concat(e, '"/></svg>'),
                    n = "data:image/svg+xml,".concat(encodeURIComponent(l));
                document.querySelectorAll("link[rel*='icon']").forEach((e) => {
                    e.setAttribute("href", n);
                });
                let i = document.getElementById("app-dynamic-favicon");
                (i || (((i = document.createElement("link")).id = "app-dynamic-favicon"), (i.rel = "icon"), (i.type = "image/svg+xml"), document.head.appendChild(i)), (i.href = n));
            }
            function m(e) {
                if ("undefined" == typeof document) return;
                let t = document.documentElement;
                (t.style.setProperty("--theme-primary", e), t.style.setProperty("--color-poke-blue", e), t.style.setProperty("--theme-primary-hover", "color-mix(in srgb, ".concat(e, " 85%, black)")), t.style.setProperty("--theme-primary-glow", "color-mix(in srgb, ".concat(e, " 40%, transparent)")), d(e));
            }
            function f(e) {
                "undefined" != typeof document && (document.documentElement.dataset.animationsEnabled = String(e));
            }
            function p(e) {
                let { children: t, initialTheme: a } = e,
                    c = (0, i.usePathname)(),
                    [p, b] = (0, n.useState)(() => {
                        {
                            let e = localStorage.getItem("mypokebinder_theme_color");
                            if (e) return e;
                        }
                        return a || "#ef4444";
                    }),
                    [y, h] = (0, n.useState)(() => {
                        {
                            let e = localStorage.getItem("mypokebinder_sound_enabled");
                            if (null !== e) return "true" === e;
                        }
                        return !0;
                    }),
                    [g, k] = (0, n.useState)(() => {
                        {
                            let e = localStorage.getItem("mypokebinder_animations_enabled");
                            if (null !== e) return "true" === e;
                        }
                        return !0;
                    }),
                    [v, w] = (0, n.useState)(!0),
                    T = (0, n.useCallback)((e) => {
                        (b(e), m(e), localStorage.setItem("mypokebinder_theme_color", e), "undefined" != typeof document && (document.cookie = "mypokebinder_theme_color=".concat(encodeURIComponent(e), "; path=/; max-age=31536000; SameSite=Lax")));
                    }, []),
                    x = (0, n.useCallback)(async () => {
                        try {
                            let t = await fetch("/api/settings");
                            if (t.ok) {
                                var e;
                                let a = await t.json();
                                (null == (e = a.settings) ? void 0 : e.theme_color) && T(a.settings.theme_color);
                            }
                        } catch (e) {
                        } finally {
                            w(!1);
                        }
                    }, [T]);
                ((0, n.useEffect)(() => {
                    d(p);
                }, [c, p]),
                    (0, n.useEffect)(() => {
                        if ("undefined" == typeof document) return;
                        let e = new MutationObserver(() => {
                            document.querySelectorAll("link[rel*='icon']").forEach((e) => {
                                let t = e.getAttribute("href");
                                t && !t.startsWith("data:image/svg+xml") && d(p);
                            });
                        });
                        return (e.observe(document.head, { childList: !0, subtree: !0, attributes: !0, attributeFilter: ["href"] }), () => e.disconnect());
                    }, [p]),
                    (0, n.useEffect)(() => {
                        let e = localStorage.getItem("mypokebinder_theme_color"),
                            t = localStorage.getItem("mypokebinder_sound_enabled"),
                            l = localStorage.getItem("mypokebinder_animations_enabled");
                        if ((e ? T(e) : a ? T(a) : m("#ef4444"), null !== t)) {
                            let e = "true" === t;
                            (h(e), (0, r.Zc)(!e));
                        }
                        if (null !== l) {
                            let e = "true" === l;
                            (k(e), f(e));
                        } else f(!0);
                        x();
                        let n = () => {
                            "visible" === document.visibilityState && x();
                        };
                        (window.addEventListener("focus", n), document.addEventListener("visibilitychange", n));
                        let i = !1,
                            c = null,
                            s = (0, o.U)();
                        return (
                            (async function () {
                                let { data: e } = await s.auth.getUser();
                                if (i || !(null == e ? void 0 : e.user)) return;
                                let t = "user_settings:".concat(e.user.id),
                                    a = s.getChannels().find((e) => e.topic === t || e.topic === "realtime:".concat(t));
                                (a && (await s.removeChannel(a)),
                                    i ||
                                        (c = s
                                            .channel(t)
                                            .on("postgres_changes", { event: "*", schema: "public", table: "user_settings", filter: "user_id=eq.".concat(e.user.id) }, (e) => {
                                                let t = e.new;
                                                (null == t ? void 0 : t.theme_color) && T(t.theme_color);
                                            })
                                            .subscribe()));
                            })(),
                            () => {
                                ((i = !0), window.removeEventListener("focus", n), document.removeEventListener("visibilitychange", n), c && s.removeChannel(c));
                            }
                        );
                    }, [a, T, x]),
                    (0, n.useEffect)(() => {
                        let e = (e) => {
                            if ("mypokebinder_animations_enabled" === e.key && null !== e.newValue) {
                                let t = "true" === e.newValue;
                                (k(t), f(t));
                            }
                            if ("mypokebinder_sound_enabled" === e.key && null !== e.newValue) {
                                let t = "true" === e.newValue;
                                (h(t), (0, r.Zc)(!t));
                            }
                        };
                        return (window.addEventListener("storage", e), () => window.removeEventListener("storage", e));
                    }, []));
                let C = (0, n.useCallback)(
                        async (e) => {
                            T(e);
                            try {
                                await fetch("/api/settings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ theme_color: e }) });
                            } catch (e) {}
                        },
                        [T],
                    ),
                    _ = (0, n.useCallback)(async (e) => {
                        (h(e), (0, r.Zc)(!e), localStorage.setItem("mypokebinder_sound_enabled", String(e)));
                    }, []),
                    A = (0, n.useCallback)(async (e) => {
                        (k(e), f(e), localStorage.setItem("mypokebinder_animations_enabled", String(e)));
                    }, []),
                    I = s(p);
                return (0, l.jsx)(u.Provider, { value: { themeColor: p, ballType: I, soundEnabled: y, animationsEnabled: g, isLoading: v, setThemeColor: C, setSoundEnabled: _, setAnimationsEnabled: A }, children: t });
            }
            function b() {
                let e = (0, n.useContext)(u);
                if (!e) throw Error("useUserSettings must be used within a UserSettingsProvider");
                return e;
            }
        },
        4577: (e, t, a) => {
            a.d(t, { Zc: () => n, dz: () => o });
            let l = !1;
            function n(e) {
                l = e;
            }
            let i = null,
                r = -250;
            function o() {
                var e, t, a;
                let n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                    o = arguments.length > 1 ? arguments[1] : void 0;
                if (l) return;
                let c = "undefined" != typeof performance ? performance.now() : Date.now();
                if (c - r < 250) return;
                r = c;
                let s = (function () {
                    let e = window.AudioContext || window.webkitAudioContext;
                    return e ? (i || (i = new e()), "suspended" === i.state && i.resume().catch(() => {}), i) : null;
                })();
                if (!s) return;
                let u = "number" == typeof n ? n : null != o ? o : 0,
                    d = s.currentTime + 0.01;
                (!(function (e, t) {
                    let a = e.createOscillator(),
                        l = e.createGain();
                    ((a.type = "sine"), a.frequency.setValueAtTime(140, t), a.frequency.exponentialRampToValueAtTime(35, t + 0.12), l.gain.setValueAtTime(0.28, t), l.gain.exponentialRampToValueAtTime(0.001, t + 0.14), a.connect(l), l.connect(e.destination), a.start(t), a.stop(t + 0.15));
                    let n = e.createBuffer(1, 0.05 * e.sampleRate, e.sampleRate),
                        i = n.getChannelData(0);
                    for (let t = 0; t < i.length; t++) i[t] = (2 * Math.random() - 1) * Math.exp(-t / (0.008 * e.sampleRate));
                    let r = e.createBufferSource();
                    r.buffer = n;
                    let o = e.createBiquadFilter();
                    ((o.type = "bandpass"), o.frequency.setValueAtTime(1200, t), o.Q.setValueAtTime(1.8, t));
                    let c = e.createGain();
                    (c.gain.setValueAtTime(0.18, t), c.gain.exponentialRampToValueAtTime(0.001, t + 0.06), r.connect(o), o.connect(c), c.connect(e.destination), r.start(t), r.stop(t + 0.07));
                })(s, d),
                [1760, 2637].forEach((e, t) => {
                    let a = s.createOscillator(),
                        l = s.createGain();
                    ((a.type = "sine"), a.frequency.setValueAtTime(e, d + 0.025 * t), l.gain.setValueAtTime(0.12, d + 0.025 * t), l.gain.exponentialRampToValueAtTime(0.001, d + 0.025 * t + 0.18), a.connect(l), l.connect(s.destination), a.start(d + 0.025 * t), a.stop(d + 0.025 * t + 0.19));
                }),
                3 === u)
                    ? ((e = d + 0.02),
                      [659.25, 783.99, 987.77, 1318.51, 1567.98, 2093, 2637.02, 3135.96].forEach((t, a) => {
                          let l = e + 0.035 * a,
                              n = s.createOscillator(),
                              i = s.createGain();
                          ((n.type = "sine"), n.frequency.setValueAtTime(t, l), i.gain.setValueAtTime(0.16, l), i.gain.exponentialRampToValueAtTime(0.001, l + 0.38), n.connect(i), i.connect(s.destination), n.start(l), n.stop(l + 0.4));
                      }))
                    : 2 === u
                      ? ((t = d + 0.025),
                        [783.99, 987.77, 1318.51, 1567.98, 2093].forEach((e, a) => {
                            let l = t + 0.045 * a,
                                n = s.createOscillator(),
                                i = s.createGain();
                            ((n.type = "sine"), n.frequency.setValueAtTime(e, l), i.gain.setValueAtTime(0.14, l), i.gain.exponentialRampToValueAtTime(0.001, l + 0.28), n.connect(i), i.connect(s.destination), n.start(l), n.stop(l + 0.3));
                        }))
                      : 1 === u &&
                        ((a = d + 0.02),
                        [587.33, 880, 1174.66, 1318.51].forEach((e, t) => {
                            let l = s.createOscillator(),
                                n = s.createGain();
                            ((l.type = "sine"), l.frequency.setValueAtTime(e, a + 0.015 * t), n.gain.setValueAtTime(0.08, a + 0.015 * t), n.gain.exponentialRampToValueAtTime(0.001, a + 0.015 * t + 0.22), l.connect(n), n.connect(s.destination), l.start(a + 0.015 * t), l.stop(a + 0.015 * t + 0.23));
                        }));
            }
        },
        6648: (e, t, a) => {
            a.d(t, { U: () => n });
            var l = a(2764);
            function n() {
                return (0, l.createBrowserClient)("https://cauuttzkxcmqwlsfoeib.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhdXV0dHpreGNtcXdsc2ZvZWliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4NDgxMzMsImV4cCI6MjEwNTQyNDEzM30.Zhqn9Xedk54YPfsmqgrCfSZv0hHF4YOIzNJxUnwUIrk");
            }
        },
    },
]);
