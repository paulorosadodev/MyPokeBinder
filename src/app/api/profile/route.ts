import { NextResponse, type NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth";
import { getRarityScore } from "@/lib/pokemon/rarity";

export async function GET(request: NextRequest) {
    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }
    const { user, supabase } = auth;

    const { data: cardsData, error } = await supabase.from("user_cards").select("*").eq("user_id", user.id).order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const cards = cardsData ?? [];

    const distinctBinderDex = new Set<number>();
    cards.forEach((c) => {
        if (c.is_in_binder) {
            distinctBinderDex.add(c.pokemon_dex_id);
        }
    });

    const totalInBinder = distinctBinderDex.size;
    const totalCollection = cards.length;
    const completionPercentage = Math.round((totalInBinder / 151) * 100);

    const sortedByRarity = [...cards].sort((a, b) => {
        const scoreA = getRarityScore(a.card_rarity);
        const scoreB = getRarityScore(b.card_rarity);
        if (scoreB !== scoreA) {
            return scoreB - scoreA;
        }
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    const rarestCards: typeof cards = [];
    const seenEditionKeys = new Set<string>();

    for (const card of sortedByRarity) {
        const editionKey = `${card.tcgdex_card_id}_${card.card_language}_${card.card_variant || "normal"}`;
        if (!seenEditionKeys.has(editionKey)) {
            seenEditionKeys.add(editionKey);
            rarestCards.push(card);
        }
        if (rarestCards.length >= 8) {
            break;
        }
    }

    const rarityCounts = new Map<string, number>();
    cards.forEach((c) => {
        const raw = (c.card_rarity || "").trim();
        const label = raw ? raw : "Comum";
        rarityCounts.set(label, (rarityCounts.get(label) || 0) + 1);
    });

    const rarityBreakdown = Array.from(rarityCounts.entries())
        .map(([label, count]) => ({
            label,
            count,
            score: getRarityScore(label),
        }))
        .sort((a, b) => b.score - a.score);

    return NextResponse.json({
        profile: {
            user: {
                id: user.id,
                name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "Treinador",
                email: user.email,
                avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
                createdAt: user.created_at,
            },
            stats: {
                totalInBinder,
                totalCollection,
                completionPercentage,
            },
            rarestCards,
            rarityBreakdown,
        },
    });
}
