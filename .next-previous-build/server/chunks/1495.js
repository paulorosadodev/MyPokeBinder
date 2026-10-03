"use strict";
((exports.id = 1495),
    (exports.ids = [1495]),
    (exports.modules = {
        2980: (a, b, c) => {
            c.d(b, { Z: () => e });
            var d = c(5903);
            function e() {
                let a = "https://cauuttzkxcmqwlsfoeib.supabase.co",
                    b = process.env.SUPABASE_SERVICE_ROLE_KEY;
                if (!a || !b) throw Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
                return (0, d.UU)(a, b, { auth: { autoRefreshToken: !1, persistSession: !1 } });
            }
        },
        41495: (a, b, c) => {
            c.d(b, { L6: () => k, NY: () => m, dy: () => q, gK: () => j, nL: () => p, vZ: () => l, x4: () => o });
            var d = c(16780),
                e = c(94530),
                f = c(2980),
                g = c(69877);
            function h(a) {
                return a.trim().toLowerCase();
            }
            function i(a) {
                return `public-profile:${h(a)}`;
            }
            function j(a, b) {
                let c = !!(b?.id && b.id === a.user.id),
                    d = { ...a.user };
                return (c && b?.email && (d.email = b.email), { ...a, user: d, isOwner: c });
            }
            function k(a) {
                return { owner: { id: a.owner.id, username: a.owner.username, name: a.owner.name, avatarUrl: a.owner.avatarUrl, themeColor: a.owner.themeColor }, cards: a.cards };
            }
            function l(a, b) {
                return { ...a, isOwner: !!(b?.id && b.id === a.owner.id) };
            }
            function m(a) {
                let { isOwner: b, ...c } = (0, g.f)({ user: { id: a.owner.id, username: a.owner.username, name: a.owner.name, avatarUrl: a.owner.avatarUrl, createdAt: a.owner.createdAt, bio: a.owner.bio }, cards: a.cards, isOwner: !1, themeColor: a.owner.themeColor, favoriteCardIds: a.owner.favoriteCardIds, binders: a.binders, featuredBinder: a.featuredBinder, featuredBinderSlots: a.featuredBinderSlots }),
                    { email: d, ...e } = c.user;
                return { ...c, user: e };
            }
            async function n(a) {
                let b = process.env.SUPABASE_SERVICE_ROLE_KEY ? (0, f.Z)() : (0, e.l)(),
                    { data: c, error: d } = await b.from("profiles").select("id, username, display_name, avatar_url, created_at, theme_color, bio, favorite_card_ids").eq("username", a).maybeSingle();
                if (d || !c) return null;
                let { data: g, error: h } = await b.rpc("get_public_user_cards", { p_user_id: c.id });
                if (h) return null;
                let { data: i } = await b.from("binders").select("*").eq("user_id", c.id).order("created_at", { ascending: !0 }),
                    j = [],
                    k = (i ?? []).map((a) => a.id);
                if (k.length > 0) {
                    let { data: a } = await b.from("binder_slots").select("*").in("binder_id", k).order("page_number", { ascending: !0 }).order("slot_index", { ascending: !0 });
                    j = a ?? [];
                }
                let l = j.map((a) => a.user_card_id).filter((a) => "string" == typeof a && !!a),
                    m = new Map();
                if (l.length > 0) {
                    let { data: a } = await b.from("user_cards").select("*").in("id", l);
                    for (let b of a ?? []) m.set(b.id, b);
                }
                let n = new Map();
                for (let a of j) {
                    let b = n.get(a.binder_id) || [];
                    (b.push({ ...a, card: (a.user_card_id && m.get(a.user_card_id)) || null }), n.set(a.binder_id, b));
                }
                let o = (i ?? []).map((a) => {
                        let b = n.get(a.id) || [],
                            c = b.length,
                            d = b.filter((a) => !!a.user_card_id).length;
                        return { ...a, total_slots: c, total_cards: d, completion_percentage: c > 0 ? Math.round((d / c) * 100) : 0 };
                    }),
                    p = o.find((a) => a.is_featured) || o[0] || null,
                    q = (p && n.get(p.id)) || [];
                return { owner: { id: c.id, username: c.username, name: c.display_name || c.username, avatarUrl: c.avatar_url, createdAt: c.created_at, bio: c.bio, themeColor: c.theme_color, favoriteCardIds: c.favorite_card_ids ?? [] }, cards: g ?? [], binders: o, featuredBinder: p, featuredBinderSlots: q };
            }
            function o(a) {
                let b = h(a);
                return (0, d.unstable_cache)(() => n(b), ["public-trainer", b], { revalidate: 60, tags: [i(b)] })();
            }
            function p(...a) {
                let b = new Set();
                for (let c of a) {
                    if (!c) continue;
                    let a = i(c);
                    if (!b.has(a)) {
                        b.add(a);
                        try {
                            (0, d.revalidateTag)(a);
                        } catch {}
                    }
                }
            }
            async function q(a, b, c = []) {
                let { data: d } = await a.from("profiles").select("username").eq("id", b).maybeSingle();
                p(d?.username, ...c);
            }
        },
        57763: (a, b, c) => {
            function d(a) {
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
            }
            function e(a, b) {
                if (!a && !b) return 0;
                let c = (a || "").trim().toLowerCase(),
                    d = (b || "").trim().toLowerCase();
                return c.includes("special illustration rare") || c.includes("ilustra\xe7\xe3o rara especial")
                    ? 100
                    : c.includes("hyper rare") || c.includes("hiper-rara") || c.includes("rara hiper")
                      ? 90
                      : c.includes("illustration rare") || c.includes("ilustra\xe7\xe3o rara")
                        ? 80
                        : c.includes("shiny ultra rare") || c.includes("rara ultra brilhante") || c.includes("brilhante rara ultra") || c.includes("shiny rare vmax")
                          ? 75
                          : c.includes("secret rare") || c.includes("rara secreta")
                            ? 70
                            : c.includes("ultra rare") || c.includes("rara ultra") || c.includes("full art trainer")
                              ? 65
                              : c.includes("vmax") || c.includes("vstar") || c.includes("v-union") || c.includes("vunion") || c.includes("rare holo v") || c.includes("rare v") || c.includes("rara v") || c.includes("rara holo v") || c.includes("holo v") || /\b(v|vmax|vstar|v-union|vunion)\b/i.test(c) || (d && /\b(v|vmax|vstar|v-union|vunion)\b/i.test(d))
                                ? 60
                                : c.includes("radiant") || c.includes("radiante") || c.includes("amazing") || c.includes("incr\xedvel") || c.includes("incrivel")
                                  ? 50
                                  : c.includes("double rare") || c.includes("rara dupla")
                                    ? 40
                                    : c.includes("holo") || c.includes("hologr\xe1fic") || c.includes("holografic")
                                      ? 30
                                      : c.includes("rare") || "rara" === c
                                        ? 20
                                        : c.includes("uncommon") || c.includes("incomum")
                                          ? 10
                                          : 1;
            }
            c.d(b, { Iu: () => e, RQ: () => d });
        },
        69877: (a, b, c) => {
            c.d(b, { f: () => f });
            var d = c(57763),
                e = c(38372);
            function f(a) {
                let b = a.cards ?? [],
                    c = new Map(b.map((a) => [a.id, a])),
                    f = new Map();
                b.forEach((a) => {
                    a.is_in_binder && null != a.pokemon_dex_id && !f.has(a.pokemon_dex_id) && f.set(a.pokemon_dex_id, a);
                });
                let g = f.size,
                    h = b.length,
                    i = Math.round((g / 151) * 100),
                    j = e.GS.map((a) => {
                        let b = f.get(a.dexId);
                        return { pokemon_dex_id: a.dexId, pokemon_name: a.name, is_filled: !!b, card_image_url: b?.card_image_url };
                    }),
                    k = (a.favoriteCardIds ?? []).filter((a) => c.has(a)).slice(0, 4),
                    l = k.map((a) => c.get(a)).filter(Boolean),
                    m = l.length > 0,
                    n = new Map();
                b.forEach((a) => {
                    let b = (0, d.RQ)(a.card_rarity);
                    n.set(b, (n.get(b) || 0) + 1);
                });
                let o = Array.from(n.entries())
                        .map(([a, b]) => ({ label: a, count: b, score: (0, d.Iu)(a) }))
                        .sort((a, b) => b.score - a.score),
                    p = a.themeColor && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(a.themeColor) ? a.themeColor : "#ef4444",
                    q = { id: a.user.id, username: a.user.username, name: a.user.name, avatarUrl: a.user.avatarUrl ?? null, createdAt: a.user.createdAt, bio: a.user.bio ?? null };
                return (a.isOwner && a.user.email && (q.email = a.user.email), { user: q, themeColor: p, stats: { totalInBinder: g, totalCollection: h, completionPercentage: i }, slots: j, featuredCards: l, featuredIsManual: m, favoriteCardIds: k, rarestCards: l, rarityBreakdown: o, isOwner: a.isOwner, binders: a.binders ?? [], featuredBinder: a.featuredBinder ?? null, featuredBinderSlots: a.featuredBinderSlots ?? [] });
            }
        },
        94530: (a, b, c) => {
            c.d(b, { l: () => e });
            var d = c(5903);
            function e() {
                let a = "https://cauuttzkxcmqwlsfoeib.supabase.co",
                    b = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhdXV0dHpreGNtcXdsc2ZvZWliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk4NDgxMzMsImV4cCI6MjEwNTQyNDEzM30.Zhqn9Xedk54YPfsmqgrCfSZv0hHF4YOIzNJxUnwUIrk";
                if (!a || !b) throw Error("Missing NEXT_PUBLIC_SUPABASE_URL or anon key");
                return (0, d.UU)(a, b, { auth: { autoRefreshToken: !1, persistSession: !1 } });
            }
        },
    }));
