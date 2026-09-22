import { formatRarityLabel, getRarityScore } from "@/lib/pokemon/rarity";
import { POKEMON_151 } from "@/lib/pokemon/constants";
import type { DashboardSlot, UserCard } from "@/types/binder";

export interface ProfileUser {
    id: string;
    username: string;
    name: string;
    email?: string;
    avatarUrl?: string | null;
    createdAt?: string;
    bio?: string | null;
}

export interface ProfilePayload {
    user: ProfileUser;
    themeColor: string;
    stats: {
        totalInBinder: number;
        totalCollection: number;
        completionPercentage: number;
    };
    slots: DashboardSlot[];
    /** Up to 4 owner-picked showcase cards (empty if none). */
    featuredCards: UserCard[];
    featuredIsManual: boolean;
    favoriteCardIds: string[];
    /** @deprecated Alias of featuredCards */
    rarestCards: UserCard[];
    rarityBreakdown: Array<{
        label: string;
        count: number;
        score: number;
    }>;
    isOwner: boolean;
}

export function buildProfileFromCards(input: { user: ProfileUser; cards: UserCard[]; isOwner: boolean; themeColor?: string | null; favoriteCardIds?: string[] | null }): ProfilePayload {
    const cards = input.cards ?? [];
    const cardsById = new Map(cards.map((c) => [c.id, c]));

    const binderMap = new Map<number, UserCard>();
    cards.forEach((c) => {
        if (c.is_in_binder && !binderMap.has(c.pokemon_dex_id)) {
            binderMap.set(c.pokemon_dex_id, c);
        }
    });

    const totalInBinder = binderMap.size;
    const totalCollection = cards.length;
    const completionPercentage = Math.round((totalInBinder / 151) * 100);

    const slots: DashboardSlot[] = POKEMON_151.map((p) => {
        const card = binderMap.get(p.dexId);
        return {
            pokemon_dex_id: p.dexId,
            pokemon_name: p.name,
            is_filled: Boolean(card),
            card_image_url: card?.card_image_url,
        };
    });

    const favoriteCardIds = (input.favoriteCardIds ?? []).filter((id) => cardsById.has(id)).slice(0, 4);
    const featuredCards = favoriteCardIds.map((id) => cardsById.get(id)!).filter(Boolean);
    const featuredIsManual = featuredCards.length > 0;

    const rarityCounts = new Map<string, number>();
    cards.forEach((c) => {
        const label = formatRarityLabel(c.card_rarity);
        rarityCounts.set(label, (rarityCounts.get(label) || 0) + 1);
    });

    const rarityBreakdown = Array.from(rarityCounts.entries())
        .map(([label, count]) => ({
            label,
            count,
            score: getRarityScore(label),
        }))
        .sort((a, b) => b.score - a.score);

    const themeColor = input.themeColor && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(input.themeColor) ? input.themeColor : "#ef4444";

    const publicUser: ProfileUser = {
        id: input.user.id,
        username: input.user.username,
        name: input.user.name,
        avatarUrl: input.user.avatarUrl ?? null,
        createdAt: input.user.createdAt,
        bio: input.user.bio ?? null,
    };

    if (input.isOwner && input.user.email) {
        publicUser.email = input.user.email;
    }

    return {
        user: publicUser,
        themeColor,
        stats: {
            totalInBinder,
            totalCollection,
            completionPercentage,
        },
        slots,
        featuredCards,
        featuredIsManual,
        favoriteCardIds,
        rarestCards: featuredCards,
        rarityBreakdown,
        isOwner: input.isOwner,
    };
}
