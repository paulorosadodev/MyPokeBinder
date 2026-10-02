import { revalidateTag, unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";
import { createAdminClient } from "@/lib/supabase/admin";
import { buildProfileFromCards, type ProfilePayload, type ProfileUser } from "@/lib/profile/buildProfile";
import type { Binder, BinderSlot, UserCard } from "@/types/binder";
import type { SupabaseClient } from "@supabase/supabase-js";

export const PUBLIC_PROFILE_REVALIDATE_SECONDS = 60;

export type CachedPublicProfile = Omit<ProfilePayload, "isOwner">;

export interface CachedPublicCollection {
    owner: {
        id: string;
        username: string;
        name: string;
        avatarUrl?: string | null;
        themeColor: string;
    };
    cards: UserCard[];
}

export interface CachedPublicTrainerData {
    owner: {
        id: string;
        username: string;
        name: string;
        avatarUrl?: string | null;
        createdAt?: string;
        bio?: string | null;
        themeColor: string;
        favoriteCardIds: string[];
    };
    cards: UserCard[];
    binders?: Binder[];
    featuredBinder?: Binder | null;
    featuredBinderSlots?: BinderSlot[];
}

export interface PublicViewer {
    id?: string;
    email?: string | null;
}

export function publicProfileCacheKey(username: string): string {
    return username.trim().toLowerCase();
}

export function publicProfileCacheTag(username: string): string {
    return `public-profile:${publicProfileCacheKey(username)}`;
}

export function toPublicCachedProfile(payload: ProfilePayload): CachedPublicProfile {
    const { isOwner: _isOwner, ...rest } = payload;
    const { email: _email, ...user } = rest.user;
    return {
        ...rest,
        user,
    };
}

export function hydratePublicProfile(cached: CachedPublicProfile, viewer: PublicViewer | null): ProfilePayload {
    const isOwner = Boolean(viewer?.id && viewer.id === cached.user.id);
    const user: ProfileUser = {
        ...cached.user,
    };
    if (isOwner && viewer?.email) {
        user.email = viewer.email;
    }
    return {
        ...cached,
        user,
        isOwner,
    };
}

export function toPublicCachedCollection(data: CachedPublicTrainerData): CachedPublicCollection {
    return {
        owner: {
            id: data.owner.id,
            username: data.owner.username,
            name: data.owner.name,
            avatarUrl: data.owner.avatarUrl,
            themeColor: data.owner.themeColor,
        },
        cards: data.cards,
    };
}

export function hydratePublicCollection(cached: CachedPublicCollection, viewer: PublicViewer | null): CachedPublicCollection & { isOwner: boolean } {
    return {
        ...cached,
        isOwner: Boolean(viewer?.id && viewer.id === cached.owner.id),
    };
}

export function buildCachedPublicProfile(data: CachedPublicTrainerData): CachedPublicProfile {
    return toPublicCachedProfile(
        buildProfileFromCards({
            user: {
                id: data.owner.id,
                username: data.owner.username,
                name: data.owner.name,
                avatarUrl: data.owner.avatarUrl,
                createdAt: data.owner.createdAt,
                bio: data.owner.bio,
            },
            cards: data.cards,
            isOwner: false,
            themeColor: data.owner.themeColor,
            favoriteCardIds: data.owner.favoriteCardIds,
            binders: data.binders,
            featuredBinder: data.featuredBinder,
            featuredBinderSlots: data.featuredBinderSlots,
        }),
    );
}

async function loadPublicTrainerData(username: string): Promise<CachedPublicTrainerData | null> {
    const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY ? createAdminClient() : createPublicClient();
    const { data: profileRow, error: profileError } = await supabase.from("profiles").select("id, username, display_name, avatar_url, created_at, theme_color, bio, favorite_card_ids").eq("username", username).maybeSingle();

    if (profileError || !profileRow) {
        return null;
    }

    const { data: cardsData, error: cardsError } = await supabase.rpc("get_public_user_cards", {
        p_user_id: profileRow.id,
    });

    if (cardsError) {
        return null;
    }

    const { data: bindersData } = await supabase.from("binders").select("*").eq("user_id", profileRow.id).order("created_at", { ascending: true });

    let allSlots: any[] = [];
    const binderIds = (bindersData ?? []).map((b) => b.id);
    if (binderIds.length > 0) {
        const { data: slotsData } = await supabase.from("binder_slots").select("*").in("binder_id", binderIds).order("page_number", { ascending: true }).order("slot_index", { ascending: true });
        allSlots = slotsData ?? [];
    }

    const userCardIds = allSlots.map((s) => s.user_card_id).filter((cid): cid is string => typeof cid === "string" && Boolean(cid));

    const userCardsMap = new Map<string, UserCard>();
    if (userCardIds.length > 0) {
        const { data: uCards } = await supabase.from("user_cards").select("*").in("id", userCardIds);
        for (const card of uCards ?? []) {
            userCardsMap.set(card.id, card as UserCard);
        }
    }

    const slotsByBinder = new Map<string, BinderSlot[]>();
    for (const slot of allSlots) {
        const list = slotsByBinder.get(slot.binder_id) || [];
        list.push({
            ...slot,
            card: slot.user_card_id ? userCardsMap.get(slot.user_card_id) || null : null,
        });
        slotsByBinder.set(slot.binder_id, list);
    }

    const bindersWithStats: Binder[] = (bindersData ?? []).map((b) => {
        const slots = slotsByBinder.get(b.id) || [];
        const total = slots.length;
        const filled = slots.filter((s) => Boolean(s.user_card_id)).length;
        return {
            ...b,
            total_slots: total,
            total_cards: filled,
            completion_percentage: total > 0 ? Math.round((filled / total) * 100) : 0,
        };
    });

    const featured = bindersWithStats.find((b) => b.is_featured) || bindersWithStats[0] || null;
    const featuredSlots = featured ? slotsByBinder.get(featured.id) || [] : [];

    return {
        owner: {
            id: profileRow.id,
            username: profileRow.username,
            name: profileRow.display_name || profileRow.username,
            avatarUrl: profileRow.avatar_url,
            createdAt: profileRow.created_at,
            bio: profileRow.bio,
            themeColor: profileRow.theme_color,
            favoriteCardIds: profileRow.favorite_card_ids ?? [],
        },
        cards: (cardsData ?? []) as UserCard[],
        binders: bindersWithStats,
        featuredBinder: featured,
        featuredBinderSlots: featuredSlots,
    };
}

export function getCachedPublicTrainerData(username: string): Promise<CachedPublicTrainerData | null> {
    const key = publicProfileCacheKey(username);
    return unstable_cache(() => loadPublicTrainerData(key), ["public-trainer", key], {
        revalidate: PUBLIC_PROFILE_REVALIDATE_SECONDS,
        tags: [publicProfileCacheTag(key)],
    })();
}

export function revalidatePublicProfileTags(...usernames: Array<string | null | undefined>) {
    const seen = new Set<string>();
    for (const raw of usernames) {
        if (!raw) continue;
        const tag = publicProfileCacheTag(raw);
        if (seen.has(tag)) continue;
        seen.add(tag);
        try {
            revalidateTag(tag);
        } catch {
            // Route tests and non-request contexts have no Next cache store.
        }
    }
}

export async function revalidatePublicProfileForUserId(supabase: SupabaseClient<any, "public", any>, userId: string, extraUsernames: Array<string | null | undefined> = []) {
    const { data } = await supabase.from("profiles").select("username").eq("id", userId).maybeSingle();
    revalidatePublicProfileTags(data?.username, ...extraUsernames);
}
