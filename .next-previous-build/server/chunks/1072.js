"use strict";
((exports.id = 1072),
    (exports.ids = [1072]),
    (exports.modules = {
        4408: (a, b, c) => {
            c.d(b, { Ig: () => h, KY: () => q, LQ: () => o, SI: () => l, VY: () => r, a: () => s, ay: () => m, ej: () => i, rM: () => k, tF: () => t, xJ: () => g });
            var d = c(79281),
                e = c(37108),
                f = c(14153);
            let g = 36,
                h = "all",
                i = "all",
                j = [...e.GS].sort((a, b) => b.name.length - a.name.length);
            function k(a) {
                let b = new Map();
                for (let c of a) {
                    let a = (0, d.qe)(c),
                        e = b.get(a);
                    e ? (e.copies.push(c), (e.totalCount += 1), (e.hasInBinder = e.hasInBinder || !!c.is_in_binder), c.is_in_binder && !e.card.is_in_binder && (e.card = c)) : b.set(a, { key: a, card: c, copies: [c], totalCount: 1, hasInBinder: !!c.is_in_binder });
                }
                return Array.from(b.values());
            }
            function l(a) {
                let b = new Map();
                for (let c of a) {
                    let a = (c || "").trim();
                    if (!a) continue;
                    let d = a.toLowerCase();
                    b.has(d) || b.set(d, a);
                }
                return [{ value: h, label: "Todas as expans\xf5es" }, ...[...b.values()].toSorted((a, b) => a.localeCompare(b, "en", { sensitivity: "base" })).map((a) => ({ value: a, label: a }))];
            }
            function m(a) {
                let b = new Map();
                for (let c of a) {
                    let a = (c || "").trim();
                    if (!a) continue;
                    let d = a.toLowerCase();
                    b.has(d) || b.set(d, a);
                }
                return [{ value: i, label: "Todos os artistas" }, ...[...b.values()].toSorted((a, b) => a.localeCompare(b, "en", { sensitivity: "base" })).map((a) => ({ value: a, label: a }))];
            }
            function n(a) {
                let b = a.tcgdex_card_id || a.id || "",
                    c = b.lastIndexOf("-");
                return -1 !== c && c < b.length - 1 ? b.slice(c + 1) : b;
            }
            function o(a) {
                let b = a.trim();
                if (!b.startsWith("#")) return null;
                let c = b.replace(/^#\s*/, "");
                if (!c) return null;
                let d = parseInt(c, 10);
                return !isNaN(d) && d >= 1 && d <= 1025 ? d : null;
            }
            function p(a, b) {
                if (!a) return !1;
                let c = a.trim().toLowerCase();
                if (!c) return !1;
                let d = b.trim().toLowerCase();
                if (!d || d.startsWith("#")) return !1;
                let e = d,
                    f = d.match(/\(([^)]+)\)/);
                if (f) {
                    let a = f[1].trim();
                    if (!/^[a-z]{0,4}\d+[a-z]?$/.test(a)) return !1;
                    e = a;
                } else if (d.includes("/")) {
                    let a = d.indexOf("/"),
                        b = d.slice(0, a).trim(),
                        c = d.slice(a + 1).trim();
                    if (!b || !c) return !1;
                    let f = /^[a-z]{0,4}\d+[a-z]?$/.test(b),
                        g = /^[a-z]{0,4}\d+[a-z]?$/.test(c);
                    if (f && g) e = b;
                    else {
                        if (f || !g) return !1;
                        e = c;
                    }
                }
                if (!e) return !1;
                if (c === e) return !0;
                let g = parseInt(c, 10),
                    h = parseInt(e, 10);
                return (!(isNaN(g) || isNaN(h)) && g === h) || c.replace(/([a-z]+)0+(\d+)/, "$1$2") === e.replace(/([a-z]+)0+(\d+)/, "$1$2");
            }
            function q(a, b) {
                let c = b.trim().toLowerCase();
                if (!c) return !0;
                let d = a.card_name.toLowerCase().includes(c),
                    e = (a.card_set_name || "").toLowerCase().includes(c),
                    f = (a.card_artist || "").toLowerCase().includes(c),
                    g = o(c),
                    h = null !== g && null != a.pokemon_dex_id && a.pokemon_dex_id === g,
                    i = p(n(a), c);
                return d || e || f || h || i;
            }
            function r(a, b) {
                let { searchTerm: c, rarityFilter: d, expansionFilter: e, artistFilter: g, dexId: k } = b;
                return a.filter((a) => {
                    if (k && !(0, f.R)(a.name, k)) return !1;
                    if (c.trim()) {
                        let b = c.toLowerCase().trim(),
                            d = a.name.toLowerCase().includes(b),
                            e = (a.setName || "").toLowerCase().includes(b),
                            f = (a.artist || "").toLowerCase().includes(b),
                            g = o(b),
                            h = (function (a) {
                                let b = a.card_name || a.name || "";
                                if (!b) return null;
                                let c = b.toLowerCase(),
                                    d = j.find((a) => c.includes(a.name.toLowerCase()));
                                return d ? d.dexId : null;
                            })(a),
                            i = null !== g && (null !== h ? h === g : !a.name && void 0 !== k && k === g),
                            l = p(a.localId || n({ id: a.id }), b);
                        if (!d && !e && !f && !i && !l) return !1;
                    }
                    return (e === h || (a.setName || "") === e) && (!g || g === i || (a.artist || "") === g) && ("all" === d || !!(a.rarity || "").trim().toLowerCase().includes(d)) && !0;
                });
            }
            function s(a, b) {
                let { searchTerm: c, statusFilter: d, languageFilter: e, rarityFilter: f, sortField: g, sortDirection: j } = b,
                    k = b.expansionFilter ?? h,
                    l = b.variantFilter ?? "all",
                    m = b.artistFilter ?? i,
                    n = a.filter((a) => {
                        let b = a.card;
                        return (!c.trim() || !!q(b, c)) && ("in_binder" !== d || !!a.hasInBinder) && ("stored" !== d || !a.hasInBinder || 1 !== a.totalCount) && ("all" === e || b.card_language === e) && ("all" === l || b.card_variant === l) && (m === i || (b.card_artist || "") === m) && ("all" === f || !!(b.card_rarity || "").trim().toLowerCase().includes(f)) && (k === h || (b.card_set_name || "") === k);
                    });
                return (
                    n.sort((a, b) => {
                        if ("dex" === g) {
                            let c = a.card.pokemon_dex_id ?? 99999,
                                d = b.card.pokemon_dex_id ?? 99999;
                            return "asc" === j ? c - d : d - c;
                        }
                        if ("name" === g) return "asc" === j ? a.card.card_name.localeCompare(b.card.card_name) : b.card.card_name.localeCompare(a.card.card_name);
                        let c = new Date(a.card.created_at).getTime(),
                            d = new Date(b.card.created_at).getTime();
                        return "asc" === j ? c - d : d - c;
                    }),
                    n
                );
            }
            function t(a) {
                return [a.searchTerm.trim().toLowerCase(), a.statusFilter, a.languageFilter, a.rarityFilter, a.expansionFilter ?? h, a.variantFilter ?? "all", a.artistFilter ?? i, a.sortField ?? "", a.sortDirection ?? ""].join("|");
            }
        },
        7401: (a, b, c) => {
            c.d(b, { HO: () => e, ij: () => f });
            let d = "/pokemon-card-back.png";
            function e(a, b = "high") {
                if (!a || "string" != typeof a) return d;
                let c = a.trim();
                if (!c) return d;
                if (c.startsWith("/") || c.endsWith(".webp") || c.endsWith(".png") || c.endsWith(".jpg") || c.endsWith(".jpeg")) return c;
                let f = c.replace(/\/+$/, "");
                return `${f}/${b}.webp`;
            }
            function f(a) {
                if (!a || "string" != typeof a) return !1;
                let b = a.trim();
                return !(!b || b === d || b.includes("pokemon-card-back") || b.includes("tcg-card-back"));
            }
        },
        14153: (a, b, c) => {
            c.d(b, { R: () => e });
            var d = c(37108);
            function e(a, b) {
                if (!a || "string" != typeof a) return !1;
                let c = a.trim();
                if (!c) return !1;
                if (151 === b) {
                    let a = c.replace(/mewtwo/gi, " ");
                    return /\bmew\b/i.test(a);
                }
                if (150 === b) return /\bmewtwo\b/i.test(c);
                if (16 === b) return /\bpidgey\b/i.test(c);
                if (17 === b) return /\bpidgeotto\b/i.test(c);
                if (18 === b) {
                    let a = c.replace(/pidgeotto/gi, " ");
                    return /\bpidgeot\b/i.test(a);
                }
                if (79 === b) return /\bslowpoke\b/i.test(c);
                if (80 === b) return /\bslowbro\b/i.test(c);
                if (29 === b) return !(/nidorino|nidoking|nidorina|nidoqueen/i.test(c) || /[♂]|male\b/i.test(c)) && /nidoran/i.test(c);
                if (32 === b) return !(/nidorina|nidoqueen|nidorino|nidoking/i.test(c) || /[♀]|female\b/i.test(c)) && /nidoran/i.test(c);
                let e = (0, d.Z3)(b);
                if (!e) return !0;
                let f = e.name.toLowerCase().replace(/[♀♂]/g, "").trim();
                if (f.includes("'") || f.includes("’")) {
                    let a = f.replace(/['’]/g, "");
                    return c.toLowerCase().replace(/['’]/g, "").includes(a);
                }
                if (f.includes(".")) {
                    let a = f.replace(/\./g, "");
                    return c.toLowerCase().replace(/\./g, "").includes(a);
                }
                return RegExp(`\\b${f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(c);
            }
        },
        43157: (a, b, c) => {
            function d(a, b) {
                let c = !!(a && "string" == typeof a && a.trim()),
                    d = !!(b && "string" == typeof b && b.trim());
                if (!c && !d) return 0;
                let e = c ? a.trim().toLowerCase() : "",
                    f = d ? b.trim().toLowerCase() : "";
                return e.includes("special illustration rare") || e.includes("ilustra\xe7\xe3o rara especial") || e.includes("hyper rare") || e.includes("hiper-rara") || e.includes("rara hiper") || e.includes("secret rare") || e.includes("rara secreta")
                    ? 3
                    : e.includes("illustration rare") ||
                        e.includes("ilustra\xe7\xe3o rara") ||
                        e.includes("ultra rare") ||
                        e.includes("rara ultra") ||
                        e.includes("full art trainer") ||
                        e.includes("shiny ultra rare") ||
                        e.includes("rara ultra brilhante") ||
                        e.includes("shiny rare vmax") ||
                        e.includes("vmax") ||
                        e.includes("vstar") ||
                        e.includes("v-union") ||
                        e.includes("vunion") ||
                        e.includes("rare holo v") ||
                        e.includes("rare v") ||
                        e.includes("rara v") ||
                        e.includes("rara holo v") ||
                        e.includes("holo v") ||
                        /\b(v|vmax|vstar|v-union|vunion)\b/i.test(e) ||
                        (d && /\b(v|vmax|vstar|v-union|vunion)\b/i.test(f))
                      ? 2
                      : e.includes("double rare") || e.includes("rara dupla")
                        ? 1
                        : 0;
            }
            function e(a, b) {
                let c = !!(a && "string" == typeof a && a.trim()),
                    d = !!(b && "string" == typeof b && b.trim());
                if (!c && !d) return !1;
                let e = c ? a.trim().toLowerCase() : "",
                    f = d ? b.trim().toLowerCase() : "";
                return !!(
                    (c &&
                        (e.includes("illustration rare") ||
                            e.includes("ilustra\xe7\xe3o rara") ||
                            e.includes("ultra rare") ||
                            e.includes("rara ultra") ||
                            e.includes("rare ultra") ||
                            e.includes("double rare") ||
                            e.includes("rara dupla") ||
                            e.includes("hyper rare") ||
                            e.includes("hiper-rara") ||
                            e.includes("rara hiper") ||
                            e.includes("secret rare") ||
                            e.includes("rara secreta") ||
                            e.includes("rare secret") ||
                            e.includes("rainbow") ||
                            e.includes("arco-\xedris") ||
                            e.includes("full art") ||
                            e.includes("arte expandida") ||
                            e.includes("arte completa") ||
                            e.includes("shiny ultra rare") ||
                            e.includes("rara ultra brilhante") ||
                            e.includes("brilhante rara ultra") ||
                            e.includes("shiny rare vmax") ||
                            e.includes("vmax") ||
                            e.includes("vstar") ||
                            e.includes("v-union") ||
                            e.includes("vunion") ||
                            e.includes("holo v") ||
                            e.includes("rare holo v") ||
                            e.includes("rare v") ||
                            e.includes("rara v") ||
                            e.includes("rara holo v") ||
                            e.includes("holo ex") ||
                            e.includes("rare holo ex") ||
                            e.includes("radiant") ||
                            e.includes("radiante") ||
                            e.includes("amazing") ||
                            e.includes("incr\xedvel") ||
                            e.includes("incrivel") ||
                            e.includes("ace spec") ||
                            /\b(v|vmax|vstar|v-union|vunion)\b/i.test(e))) ||
                    (d && /\b(v|vmax|vstar|v-union|vunion)\b/i.test(f))
                );
            }
            c.d(b, { OI: () => f, _I: () => g, i7: () => e, wM: () => d });
            let f = [
                { value: "all", label: "Todas as raridades" },
                { value: "special illustration rare", label: "Ilustra\xe7\xe3o Rara Especial" },
                { value: "illustration rare", label: "Ilustra\xe7\xe3o Rara" },
                { value: "hyper rare", label: "Hiper-rara" },
                { value: "secret rare", label: "Rara Secreta" },
                { value: "ultra rare", label: "Rara Ultra" },
                { value: "shiny ultra rare", label: "Rara Ultra Brilhante" },
                { value: "shiny rare", label: "Rara Brilhante" },
                { value: "double rare", label: "Rara Dupla" },
                { value: "radiant rare", label: "Rara Radiante" },
                { value: "amazing rare", label: "Rara Incr\xedvel" },
                { value: "holo rare", label: "Rara Hologr\xe1fica" },
                { value: "rare", label: "Rara" },
                { value: "uncommon", label: "Incomum" },
                { value: "common", label: "Comum" },
                { value: "promo", label: "Promocional" },
            ];
            function g(a, b) {
                let c = d(a, b),
                    f = (function (a) {
                        if (!a || "string" != typeof a || !a.trim()) return "Comum";
                        let b = a.trim(),
                            c = b.toLowerCase();
                        return c.includes("special illustration rare") || "ilustra\xe7\xe3o rara especial" === c
                            ? "Ilustra\xe7\xe3o Rara Especial"
                            : c.includes("illustration rare") || "ilustra\xe7\xe3o rara" === c
                              ? "Ilustra\xe7\xe3o Rara"
                              : c.includes("shiny ultra rare") || "rara ultra brilhante" === c || "brilhante rara ultra" === c
                                ? "Rara Ultra Brilhante"
                                : c.includes("shiny rare vmax") || "rara brilhante vmax" === c
                                  ? "Rara Brilhante VMAX"
                                  : (c.includes("shiny rare") || "rara brilhante" === c || "brilhante rara" === c) && !c.includes("ultra")
                                    ? "Rara Brilhante"
                                    : c.includes("hyper rare") || "hiper-rara" === c || "rara hiper" === c
                                      ? "Hiper-rara"
                                      : c.includes("secret rare") || "rara secreta" === c
                                        ? "Rara Secreta"
                                        : c.includes("full art trainer") || "treinador arte completa" === c
                                          ? "Treinador Arte Expandida"
                                          : c.includes("ultra rare") || "rara ultra" === c
                                            ? "Rara Ultra"
                                            : c.includes("double rare") || "rara dupla" === c
                                              ? "Rara Dupla"
                                              : c.includes("radiant") || "rara radiante" === c
                                                ? "Rara Radiante"
                                                : c.includes("amazing") || "rara incr\xedvel" === c || "incr\xedvel" === c
                                                  ? "Rara Incr\xedvel"
                                                  : c.includes("ace spec") || "rara ace spec" === c
                                                    ? "Rara ACE SPEC"
                                                    : "holo rare" === c || "rare holo" === c || c.includes("rara hologr\xe1fica") || c.includes("rara holografica")
                                                      ? "Rara Hologr\xe1fica"
                                                      : "rare" === c || "rara" === c
                                                        ? "Rara"
                                                        : "uncommon" === c || "incomum" === c
                                                          ? "Incomum"
                                                          : "common" === c || "comum" === c
                                                            ? "Comum"
                                                            : "promo" === c || c.includes("promotional") || "promocional" === c
                                                              ? "Promocional"
                                                              : b;
                    })(a),
                    g = e(a, b),
                    h = (a || "").trim().toLowerCase();
                return 3 === c
                    ? { badgeClasses: "border-amber-400/40 bg-amber-400/15 text-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.3)]", label: f, tier: c, isFullArt: g }
                    : 2 === c
                      ? { badgeClasses: "border-cyan-400/40 bg-cyan-400/15 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.25)]", label: f, tier: c, isFullArt: g }
                      : 1 === c || h.includes("holo") || h.includes("hologr\xe1fic") || h.includes("holografic") || h.includes("radiant") || h.includes("radiante") || h.includes("amazing") || h.includes("incr\xedvel") || h.includes("incrivel")
                        ? { badgeClasses: "border-purple-400/40 bg-purple-400/15 text-purple-300", label: f, tier: c, isFullArt: g }
                        : "rare" === h || "rara" === h
                          ? { badgeClasses: "border-sky-400/30 bg-sky-400/10 text-sky-300", label: f, tier: c, isFullArt: g }
                          : "uncommon" === h || "incomum" === h
                            ? { badgeClasses: "border-slate-400/30 bg-slate-400/10 text-slate-300", label: f, tier: c, isFullArt: g }
                            : { badgeClasses: "border-white/10 bg-white/5 text-slate-400", label: f, tier: c, isFullArt: g };
            }
        },
        46313: (a, b, c) => {
            c.d(b, { z: () => f });
            var d = c(21124),
                e = c(38301);
            function f({ ballType: a = "pokeball", customColor: b = "#ef4444", size: c = 40, className: f = "", isActive: g = !1, style: h }) {
                let i = `grad-bottom-${a}-${(0, e.useId)().replaceAll(":", "")}`,
                    j = "custom" === a ? b : "greatball" === a ? "#3b82f6" : "ultraball" === a ? "#f59e0b" : "masterball" === a ? "#ec4899" : "safariball" === a ? "#10b981" : "loveball" === a ? "#ec4899" : "quickball" === a ? "#0ea5e9" : "duskball" === a ? "#14b8a6" : "luxuryball" === a ? "#eab308" : b || "#ef4444",
                    k = g ? `drop-shadow(0 0 10px ${j})` : "drop-shadow(0 2px 5px rgba(0,0,0,0.4))";
                return (0, d.jsxs)("svg", {
                    viewBox: "0 0 100 100",
                    width: c,
                    height: c,
                    className: `shrink-0 select-none overflow-visible ${f}`,
                    style: { colorScheme: "only light", forcedColorAdjust: "none", WebkitForcedColorAdjust: "none", filter: k, ...h },
                    children: [
                        (0, d.jsx)("defs", { children: (0, d.jsxs)("linearGradient", { id: i, x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [(0, d.jsx)("stop", { offset: "0%", stopColor: "#ffffff" }), (0, d.jsx)("stop", { offset: "100%", stopColor: "#cbd5e1" })] }) }),
                        (() => {
                            switch (a) {
                                case "greatball":
                                    return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#3b82f6" }), (0, d.jsx)("path", { d: "M 22 24 C 28 32 30 42 30 50 L 38 50 C 38 40 35 28 28 17 Z", fill: "#ef4444" }), (0, d.jsx)("path", { d: "M 78 24 C 72 32 70 42 70 50 L 62 50 C 62 40 65 28 72 17 Z", fill: "#ef4444" })] });
                                case "ultraball":
                                    return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#1e293b" }), (0, d.jsx)("path", { d: "M 24 16 L 36 24 L 32 50 L 22 50 Z", fill: "#f59e0b" }), (0, d.jsx)("path", { d: "M 76 16 L 64 24 L 68 50 L 78 50 Z", fill: "#f59e0b" }), (0, d.jsx)("path", { d: "M 36 16 Q 50 10 64 16 L 62 23 Q 50 18 38 23 Z", fill: "#f59e0b" })] });
                                case "masterball":
                                    return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#8b5cf6" }), (0, d.jsx)("ellipse", { cx: "28", cy: "30", rx: "9", ry: "8", fill: "#ec4899" }), (0, d.jsx)("ellipse", { cx: "72", cy: "30", rx: "9", ry: "8", fill: "#ec4899" }), (0, d.jsx)("path", { d: "M 43 28 L 47 18 L 50 23 L 53 18 L 57 28 L 54 28 L 52 22 L 50 26 L 48 22 L 46 28 Z", fill: "#ffffff" })] });
                                case "safariball":
                                    return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#10b981" }), (0, d.jsx)("path", { d: "M 18 32 Q 28 20 42 26 Q 34 38 24 44 Z", fill: "#047857", opacity: "0.8" }), (0, d.jsx)("path", { d: "M 58 14 Q 72 18 78 30 Q 66 32 58 24 Z", fill: "#047857", opacity: "0.8" }), (0, d.jsx)("circle", { cx: "50", cy: "34", r: "7", fill: "#34d399", opacity: "0.8" })] });
                                case "loveball":
                                    return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#ec4899" }), (0, d.jsx)("path", { d: "M 50 36 C 47 30 40 30 40 24 C 40 19 45 17 50 22 C 55 17 60 19 60 24 C 60 30 53 30 50 36 Z", fill: "#ffffff" })] });
                                case "quickball":
                                    return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#0ea5e9" }), (0, d.jsx)("path", { d: "M 50 6 L 56 22 L 68 22 L 58 32 L 64 48 L 50 38 L 36 48 L 42 32 L 32 22 L 44 22 Z", fill: "#facc15" })] });
                                case "duskball":
                                    return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#1e293b" }), (0, d.jsx)("circle", { cx: "28", cy: "30", r: "9", fill: "#14b8a6" }), (0, d.jsx)("circle", { cx: "72", cy: "30", r: "9", fill: "#14b8a6" }), (0, d.jsx)("circle", { cx: "50", cy: "22", r: "7", fill: "#f97316" })] });
                                case "luxuryball":
                                    return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: "#0f172a" }), (0, d.jsx)("path", { d: "M 20 20 Q 50 12 80 20 L 78 26 Q 50 18 22 26 Z", fill: "#eab308" }), (0, d.jsx)("path", { d: "M 24 32 Q 50 24 76 32 L 74 38 Q 50 30 26 38 Z", fill: "#f43f5e" })] });
                                case "custom":
                                    return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: b }), (0, d.jsx)("ellipse", { cx: "32", cy: "24", rx: "14", ry: "6", fill: "#ffffff", opacity: "0.3", transform: "rotate(-20 32 24)" })] });
                                default:
                                    return (0, d.jsxs)(d.Fragment, { children: [(0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 1 96 50 Z", fill: b || "#ef4444" }), (0, d.jsx)("ellipse", { cx: "32", cy: "24", rx: "14", ry: "6", fill: "#ffffff", opacity: "0.3", transform: "rotate(-20 32 24)" })] });
                            }
                        })(),
                        (0, d.jsx)("path", { d: "M 4 50 A 46 46 0 0 0 96 50 Z", fill: `url(#${i})` }),
                        (0, d.jsx)("line", { x1: "4", y1: "50", x2: "96", y2: "50", stroke: "#0f172a", strokeWidth: "7" }),
                        (0, d.jsx)("circle", { cx: "50", cy: "50", r: "46", fill: "none", stroke: "#0f172a", strokeWidth: "6" }),
                        (0, d.jsx)("circle", { cx: "50", cy: "50", r: "16", fill: "#0f172a" }),
                        (0, d.jsx)("circle", { cx: "50", cy: "50", r: "10", fill: "#f8fafc" }),
                        (0, d.jsx)("circle", { cx: "50", cy: "50", r: "5", fill: j, className: g ? "animate-pulse" : "" }),
                    ],
                });
            }
        },
        59535: (a, b, c) => {
            c.d(b, { i: () => h });
            var d = c(21124),
                e = c(38301),
                f = c(86965),
                g = c(46313);
            function h({ size: a = "md", message: b, className: c = "", ballType: h, color: i }) {
                let j = (0, e.useContext)(f.cm),
                    k = i || j?.themeColor || "var(--theme-primary, #ef4444)",
                    l = h || (i ? (0, f.w2)(i) : j?.ballType || "pokeball"),
                    m = { sm: { box: "w-8 h-8", px: 32 }, md: { box: "w-16 h-16", px: 64 }, lg: { box: "w-24 h-24", px: 96 } }[a];
                return (0, d.jsxs)("div", { className: `flex flex-col items-center justify-center gap-3 ${c}`, children: [(0, d.jsx)("div", { className: `relative ${m.box} animate-pokeball-spin`, children: (0, d.jsx)(g.z, { ballType: l, customColor: k, size: m.px, style: { filter: "drop-shadow(0 0 14px var(--theme-primary-glow))" }, className: "overflow-visible" }) }), b && (0, d.jsx)("p", { className: "text-sm font-medium tracking-wide text-slate-300 animate-pulse", children: b })] });
            }
        },
        68686: (a, b, c) => {
            c.d(b, { CV: () => o, GO: () => i, K_: () => n, PJ: () => l, Z$: () => p, _k: () => j, n9: () => m, sz: () => q, v1: () => r, vb: () => k });
            var d = c(18371),
                e = c(76254),
                f = c(38301),
                g = c(4408);
            let h = { dedupingInterval: 2e3, revalidateOnFocus: !1 },
                i = async (a) => {
                    let b = await fetch(a);
                    if (!b.ok) throw Error((await b.json().catch(() => ({}))).error || "Failed to fetch");
                    return b.json();
                };
            function j(a) {
                let {
                        data: b,
                        error: c,
                        size: d,
                        setSize: j,
                        isValidating: k,
                        mutate: l,
                    } = (0, e.Ay)(
                        (b, c) => {
                            if (c && !c.hasMore) return null;
                            let d = new URLSearchParams();
                            return (
                                d.set("grouped", "true"),
                                d.set("page", String(b + 1)),
                                d.set("limit", String(g.xJ)),
                                a.searchTerm.trim() && d.set("search", a.searchTerm.trim()),
                                "all" !== a.statusFilter && d.set("status", a.statusFilter),
                                "all" !== a.languageFilter && d.set("language", a.languageFilter),
                                "all" !== a.rarityFilter && d.set("rarity", a.rarityFilter),
                                a.expansionFilter && a.expansionFilter !== g.Ig && d.set("expansion", a.expansionFilter),
                                a.variantFilter && "all" !== a.variantFilter && d.set("variant", a.variantFilter),
                                a.artistFilter && a.artistFilter !== g.ej && d.set("artist", a.artistFilter),
                                d.set("sort", a.sortField),
                                d.set("direction", a.sortDirection),
                                `/api/cards?${d.toString()}`
                            );
                        },
                        i,
                        { ...h, revalidateFirstPage: !1 },
                    ),
                    m = (0, f.useMemo)(() => (b ? b.flatMap((a) => a.groups) : []), [b]),
                    n = b ? b[b.length - 1] : void 0,
                    o = !!n && n.hasMore,
                    p = b && b[0] ? b[0].total : 0,
                    q = !b && !c,
                    r = q || (d > 0 && b && void 0 === b[d - 1]),
                    s = (0, f.useCallback)(() => {
                        !r && o && j((a) => a + 1);
                    }, [r, o, j]);
                return { groups: m, total: p, isLoading: q, isLoadingMore: r, isValidating: k, hasMore: o, loadMore: s, isError: c, mutate: l };
            }
            function k() {
                let { data: a, error: b, isLoading: c, mutate: e } = (0, d.u)("/api/cards/expansions", i, { ...h, revalidateOnFocus: !1 });
                return { expansions: a?.expansions ?? [], isLoading: c, isError: b, mutate: e };
            }
            function l() {
                let { data: a, error: b, isLoading: c, mutate: e } = (0, d.u)("/api/cards/artists", i, { ...h, revalidateOnFocus: !1 });
                return { artists: a?.artists ?? [], isLoading: c, isError: b, mutate: e };
            }
            function m(a, b) {
                let {
                        data: c,
                        error: d,
                        size: j,
                        setSize: k,
                        isValidating: l,
                        mutate: m,
                    } = (0, e.Ay)(
                        (c, d) => {
                            if (!a || (d && !d.hasMore)) return null;
                            let e = new URLSearchParams();
                            return (
                                e.set("page", String(c + 1)),
                                e.set("limit", String(g.xJ)),
                                b.searchTerm.trim() && e.set("search", b.searchTerm.trim()),
                                "all" !== b.statusFilter && e.set("status", b.statusFilter),
                                "all" !== b.languageFilter && e.set("language", b.languageFilter),
                                "all" !== b.rarityFilter && e.set("rarity", b.rarityFilter),
                                b.expansionFilter && b.expansionFilter !== g.Ig && e.set("expansion", b.expansionFilter),
                                b.variantFilter && "all" !== b.variantFilter && e.set("variant", b.variantFilter),
                                b.artistFilter && b.artistFilter !== g.ej && e.set("artist", b.artistFilter),
                                e.set("sort", b.sortField),
                                e.set("direction", b.sortDirection),
                                `/api/profile/${encodeURIComponent(a)}/collection?${e.toString()}`
                            );
                        },
                        i,
                        { ...h, revalidateFirstPage: !1 },
                    ),
                    n = (0, f.useMemo)(() => (c ? c.flatMap((a) => a.groups) : []), [c]),
                    o = c ? c[0] : void 0,
                    p = c ? c[c.length - 1] : void 0,
                    q = !!p && p.hasMore,
                    r = o ? o.total : 0,
                    s = o ? o.owner : void 0,
                    t = !!o && o.isOwner,
                    u = !c && !d,
                    v = u || (j > 0 && c && void 0 === c[j - 1]),
                    w = (0, f.useCallback)(() => {
                        !v && q && k((a) => a + 1);
                    }, [v, q, k]);
                return { groups: n, total: r, owner: s, isOwner: t, isLoading: u, isLoadingMore: v, isValidating: l, hasMore: q, loadMore: w, isError: d, mutate: m };
            }
            function n(a) {
                let b = a ? `/api/profile/${encodeURIComponent(a)}/expansions` : null,
                    { data: c, error: e, isLoading: f, mutate: g } = (0, d.u)(b, i, { ...h, revalidateOnFocus: !1 });
                return { expansions: c?.expansions ?? [], isLoading: f, isError: e, mutate: g };
            }
            function o(a) {
                let b = a ? `/api/profile/${encodeURIComponent(a)}/artists` : null,
                    { data: c, error: e, isLoading: f, mutate: g } = (0, d.u)(b, i, { ...h, revalidateOnFocus: !1 });
                return { artists: c?.artists ?? [], isLoading: f, isError: e, mutate: g };
            }
            function p(a, b = !1) {
                let c = a ? `/api/cards?pokemon_dex_id=${a}` : b ? "/api/cards" : null,
                    { data: e, error: f, isLoading: g, mutate: j } = (0, d.u)(c, i, h);
                return { cards: e?.cards ?? [], isLoading: g, isError: f, mutate: j };
            }
            function q(a) {
                let b = a ? `/api/cards/${a}` : null,
                    { data: c, error: e, isLoading: f, mutate: g } = (0, d.u)(b, i, h);
                return { card: c?.card ?? null, copies: c?.copies ?? [], availableVariants: c?.availableVariants ?? ["normal", "holo", "reverse"], allocation: c?.allocation ?? null, isLoading: f && !c, isError: e, mutate: g };
            }
            function r(a) {
                let { data: b, error: c, isLoading: e, mutate: f } = (0, d.u)("/api/binders", i, { ...h, fallbackData: a, revalidateOnMount: !0 });
                return { binders: b?.binders ?? a?.binders ?? [], isLoading: e && !b, isError: c, mutate: f };
            }
        },
        79281: (a, b, c) => {
            c.d(b, { AI: () => l, FB: () => q, WE: () => r, ab: () => o, eY: () => p, qe: () => s, xV: () => n, ye: () => m });
            var d = c(38301),
                e = c.n(d),
                f = c(90133),
                g = c(75234),
                h = c(25345),
                i = c(43157),
                j = c(7401),
                k = c(95945);
            let l = [
                    {
                        value: "normal",
                        label: "Normal",
                        icon: e().createElement(f.A, { size: 13, strokeWidth: 2.25, className: "text-slate-300" }),
                        triggerClassName: "border-slate-500/40 bg-slate-500/15 text-slate-200 hover:border-slate-500/60 hover:bg-slate-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-slate-500/40 hover:bg-slate-500/15 hover:text-slate-100",
                        selectedClassName: "border-slate-500/50 bg-slate-500/25 font-bold text-slate-100 shadow-[0_0_10px_rgba(148,163,184,0.15)]",
                        checkClassName: "text-slate-200",
                    },
                    {
                        value: "holo",
                        label: "Foil",
                        icon: e().createElement(g.A, { size: 13, strokeWidth: 2.25, className: "text-amber-300" }),
                        triggerClassName: "border-amber-500/40 bg-amber-500/15 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.2)] hover:border-amber-500/60 hover:bg-amber-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-amber-500/40 hover:bg-amber-500/15 hover:text-amber-200",
                        selectedClassName: "border-amber-500/50 bg-amber-500/25 font-bold text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.3)]",
                        checkClassName: "text-amber-300",
                    },
                    {
                        value: "reverse",
                        label: "Reverse Foil",
                        icon: e().createElement(h.A, { size: 13, strokeWidth: 2.25, className: "text-cyan-300" }),
                        triggerClassName: "border-cyan-500/40 bg-cyan-500/15 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.2)] hover:border-cyan-500/60 hover:bg-cyan-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-cyan-500/40 hover:bg-cyan-500/15 hover:text-cyan-200",
                        selectedClassName: "border-cyan-500/50 bg-cyan-500/25 font-bold text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.3)]",
                        checkClassName: "text-cyan-300",
                    },
                ],
                m = [
                    { value: "all", label: "Todas as vers\xf5es" },
                    {
                        value: "normal",
                        label: "Normal",
                        icon: e().createElement(f.A, { size: 13, strokeWidth: 2.25, className: "text-slate-300" }),
                        triggerClassName: "border-slate-500/40 bg-slate-500/15 text-slate-200 hover:border-slate-500/60 hover:bg-slate-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-slate-500/40 hover:bg-slate-500/15 hover:text-slate-100",
                        selectedClassName: "border-slate-500/50 bg-slate-500/25 font-bold text-slate-100 shadow-[0_0_10px_rgba(148,163,184,0.15)]",
                        checkClassName: "text-slate-200",
                    },
                    {
                        value: "holo",
                        label: "Foil",
                        icon: e().createElement(g.A, { size: 13, strokeWidth: 2.25, className: "text-amber-300" }),
                        triggerClassName: "border-amber-500/40 bg-amber-500/15 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.2)] hover:border-amber-500/60 hover:bg-amber-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-amber-500/40 hover:bg-amber-500/15 hover:text-amber-200",
                        selectedClassName: "border-amber-500/50 bg-amber-500/25 font-bold text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.3)]",
                        checkClassName: "text-amber-300",
                    },
                    {
                        value: "reverse",
                        label: "Reverse Foil",
                        icon: e().createElement(h.A, { size: 13, strokeWidth: 2.25, className: "text-cyan-300" }),
                        triggerClassName: "border-cyan-500/40 bg-cyan-500/15 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.2)] hover:border-cyan-500/60 hover:bg-cyan-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-cyan-500/40 hover:bg-cyan-500/15 hover:text-cyan-200",
                        selectedClassName: "border-cyan-500/50 bg-cyan-500/25 font-bold text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.3)]",
                        checkClassName: "text-cyan-300",
                    },
                ],
                n = [
                    { value: "normal", label: "Normal", icon: e().createElement(f.A, { size: 11, strokeWidth: 2.25 }), indicatorClassName: "border-slate-400/50 bg-slate-400/20 shadow-[0_0_12px_rgba(148,163,184,0.25)]", activeClassName: "text-slate-100 font-bold", activeIconClassName: "text-slate-200", inactiveIconClassName: "text-slate-400" },
                    { value: "holo", label: "Foil", icon: e().createElement(g.A, { size: 11, strokeWidth: 2.25 }), indicatorClassName: "border-amber-400/60 bg-amber-500/25 shadow-[0_0_14px_rgba(245,158,11,0.35)]", activeClassName: "text-amber-200 font-bold", activeIconClassName: "text-amber-300", inactiveIconClassName: "text-amber-400/70" },
                    { value: "reverse", label: "Reverse Foil", icon: e().createElement(h.A, { size: 11, strokeWidth: 2.25 }), indicatorClassName: "border-cyan-400/60 bg-cyan-500/25 shadow-[0_0_14px_rgba(6,182,212,0.35)]", activeClassName: "text-cyan-200 font-bold", activeIconClassName: "text-cyan-300", inactiveIconClassName: "text-cyan-400/70" },
                ],
                o = ["normal", "holo", "reverse"];
            function p(a) {
                return "normal" === a || "holo" === a || "reverse" === a;
            }
            function q(a) {
                return "holo" === a ? "Foil" : "reverse" === a ? "Reverse Foil" : "Normal";
            }
            function r(a, b, c, d) {
                return void 0 === c || (0, j.ij)(c) ? ((0, i.i7)(b, d) ? "prismatic" : "holo" === a ? "holo" : "reverse" === a ? "foil" : "none") : "none";
            }
            function s(a) {
                let b = p(a.card_variant) ? a.card_variant : "normal",
                    c = (0, k.C6)(a.card_condition) ? a.card_condition : "NM";
                return `${a.tcgdex_card_id}_${a.card_language}_${b}_${c}`;
            }
        },
        95945: (a, b, c) => {
            c.d(b, { C6: () => h, Ey: () => k, Fx: () => l, P2: () => i, kF: () => j });
            var d = c(38301),
                e = c.n(d),
                f = c(54937),
                g = c(93983);
            function h(a) {
                return "M" === a || "NM" === a || "SP" === a || "MP" === a || "HP" === a || "D" === a;
            }
            function i(a) {
                switch (a) {
                    case "M":
                        return "Mint (M)";
                    case "NM":
                    default:
                        return "Near Mint (NM)";
                    case "SP":
                        return "Slightly Played (SP)";
                    case "MP":
                        return "Moderately Played (MP)";
                    case "HP":
                        return "Heavily Played (HP)";
                    case "D":
                        return "Damaged (D)";
                }
            }
            function j(a) {
                switch (h(a) ? a : "NM") {
                    case "M":
                        return { code: "M", label: "M", fullLabel: "Mint", badgeClasses: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.15)]", iconType: "check" };
                    case "NM":
                        return { code: "NM", label: "NM", fullLabel: "Near Mint", badgeClasses: "border-lime-500/40 bg-lime-500/15 text-lime-300 shadow-[0_0_8px_rgba(132,204,22,0.15)]", iconType: "check" };
                    case "SP":
                        return { code: "SP", label: "SP", fullLabel: "Slightly Played", badgeClasses: "border-yellow-500/40 bg-yellow-500/15 text-yellow-300 shadow-[0_0_8px_rgba(234,179,8,0.15)]", iconType: "check" };
                    case "MP":
                        return { code: "MP", label: "MP", fullLabel: "Moderately Played", badgeClasses: "border-amber-500/40 bg-amber-500/15 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.15)]", iconType: "alert" };
                    case "HP":
                        return { code: "HP", label: "HP", fullLabel: "Heavily Played", badgeClasses: "border-orange-500/40 bg-orange-500/15 text-orange-300 shadow-[0_0_8px_rgba(249,115,22,0.15)]", iconType: "alert" };
                    case "D":
                        return { code: "D", label: "D", fullLabel: "Damaged", badgeClasses: "border-rose-500/40 bg-rose-500/15 text-rose-300 shadow-[0_0_8px_rgba(244,63,94,0.15)]", iconType: "alert" };
                }
            }
            let k = [
                    {
                        value: "M",
                        label: "Mint (M)",
                        icon: e().createElement(f.A, { size: 13, className: "text-emerald-300" }),
                        triggerClassName: "border-emerald-500/40 bg-emerald-500/15 text-emerald-200 hover:border-emerald-500/60 hover:bg-emerald-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-emerald-500/40 hover:bg-emerald-500/15 hover:text-emerald-200",
                        selectedClassName: "border-emerald-500/50 bg-emerald-500/25 font-bold text-emerald-200 shadow-[0_0_10px_rgba(16,185,129,0.2)]",
                        checkClassName: "text-emerald-300",
                    },
                    {
                        value: "NM",
                        label: "Near Mint (NM)",
                        icon: e().createElement(f.A, { size: 13, className: "text-lime-300" }),
                        triggerClassName: "border-lime-500/40 bg-lime-500/15 text-lime-200 hover:border-lime-500/60 hover:bg-lime-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-lime-500/40 hover:bg-lime-500/15 hover:text-lime-200",
                        selectedClassName: "border-lime-500/50 bg-lime-500/25 font-bold text-lime-200 shadow-[0_0_10px_rgba(132,204,22,0.2)]",
                        checkClassName: "text-lime-300",
                    },
                    {
                        value: "SP",
                        label: "Slightly Played (SP)",
                        icon: e().createElement(f.A, { size: 13, className: "text-yellow-300" }),
                        triggerClassName: "border-yellow-500/40 bg-yellow-500/15 text-yellow-200 hover:border-yellow-500/60 hover:bg-yellow-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-yellow-500/40 hover:bg-yellow-500/15 hover:text-yellow-200",
                        selectedClassName: "border-yellow-500/50 bg-yellow-500/25 font-bold text-yellow-200 shadow-[0_0_10px_rgba(234,179,8,0.2)]",
                        checkClassName: "text-yellow-300",
                    },
                    {
                        value: "MP",
                        label: "Moderately Played (MP)",
                        icon: e().createElement(g.A, { size: 13, className: "text-amber-300" }),
                        triggerClassName: "border-amber-500/40 bg-amber-500/15 text-amber-200 hover:border-amber-500/60 hover:bg-amber-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-amber-500/40 hover:bg-amber-500/15 hover:text-amber-200",
                        selectedClassName: "border-amber-500/50 bg-amber-500/25 font-bold text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.2)]",
                        checkClassName: "text-amber-300",
                    },
                    {
                        value: "HP",
                        label: "Heavily Played (HP)",
                        icon: e().createElement(g.A, { size: 13, className: "text-orange-300" }),
                        triggerClassName: "border-orange-500/40 bg-orange-500/15 text-orange-200 hover:border-orange-500/60 hover:bg-orange-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-orange-500/40 hover:bg-orange-500/15 hover:text-orange-200",
                        selectedClassName: "border-orange-500/50 bg-orange-500/25 font-bold text-orange-200 shadow-[0_0_10px_rgba(249,115,22,0.2)]",
                        checkClassName: "text-orange-300",
                    },
                    {
                        value: "D",
                        label: "Damaged (D)",
                        icon: e().createElement(g.A, { size: 13, className: "text-rose-300" }),
                        triggerClassName: "border-rose-500/40 bg-rose-500/15 text-rose-200 hover:border-rose-500/60 hover:bg-rose-500/20",
                        className: "border-transparent text-slate-300 font-medium hover:border-rose-500/40 hover:bg-rose-500/15 hover:text-rose-200",
                        selectedClassName: "border-rose-500/50 bg-rose-500/25 font-bold text-rose-200 shadow-[0_0_10px_rgba(244,63,94,0.2)]",
                        checkClassName: "text-rose-300",
                    },
                ],
                l = [
                    { value: "M", label: "M", title: "Mint", icon: e().createElement(f.A, { size: 11, strokeWidth: 2.25 }), indicatorClassName: "border-emerald-400/60 bg-emerald-500/25 shadow-[0_0_12px_rgba(16,185,129,0.3)]", activeClassName: "text-emerald-200 font-bold", activeIconClassName: "text-emerald-300", inactiveIconClassName: "text-emerald-400/70" },
                    { value: "NM", label: "NM", title: "Near Mint", icon: e().createElement(f.A, { size: 11, strokeWidth: 2.25 }), indicatorClassName: "border-lime-400/60 bg-lime-500/25 shadow-[0_0_12px_rgba(132,204,22,0.3)]", activeClassName: "text-lime-200 font-bold", activeIconClassName: "text-lime-300", inactiveIconClassName: "text-lime-400/70" },
                    { value: "SP", label: "SP", title: "Slightly Played", icon: e().createElement(f.A, { size: 11, strokeWidth: 2.25 }), indicatorClassName: "border-yellow-400/60 bg-yellow-500/25 shadow-[0_0_12px_rgba(234,179,8,0.3)]", activeClassName: "text-yellow-200 font-bold", activeIconClassName: "text-yellow-300", inactiveIconClassName: "text-yellow-400/70" },
                    { value: "MP", label: "MP", title: "Moderately Played", icon: e().createElement(g.A, { size: 11, strokeWidth: 2.25 }), indicatorClassName: "border-amber-400/60 bg-amber-500/25 shadow-[0_0_12px_rgba(245,158,11,0.3)]", activeClassName: "text-amber-200 font-bold", activeIconClassName: "text-amber-300", inactiveIconClassName: "text-amber-400/70" },
                    { value: "HP", label: "HP", title: "Heavily Played", icon: e().createElement(g.A, { size: 11, strokeWidth: 2.25 }), indicatorClassName: "border-orange-400/60 bg-orange-500/25 shadow-[0_0_12px_rgba(249,115,22,0.3)]", activeClassName: "text-orange-200 font-bold", activeIconClassName: "text-orange-300", inactiveIconClassName: "text-orange-400/70" },
                    { value: "D", label: "D", title: "Damaged", icon: e().createElement(g.A, { size: 11, strokeWidth: 2.25 }), indicatorClassName: "border-rose-400/60 bg-rose-500/25 shadow-[0_0_12px_rgba(244,63,94,0.3)]", activeClassName: "text-rose-200 font-bold", activeIconClassName: "text-rose-300", inactiveIconClassName: "text-rose-400/70" },
                ];
        },
    }));
