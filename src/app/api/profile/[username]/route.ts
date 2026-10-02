import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import { buildCachedPublicProfile, getCachedPublicTrainerData, hydratePublicProfile } from "@/lib/profile/publicCache";
import { safeDecodeParam, isValidProfileParam, UUID_REGEX } from "@/lib/profile/username";

export async function GET(_request: NextRequest, context: { params: Promise<{ username: string }> }) {
    const { username: rawParam } = await context.params;
    const param = safeDecodeParam(rawParam);

    if (param === "") {
        return NextResponse.json({ error: "Perfil inválido" }, { status: 400 });
    }

    if (!param || !isValidProfileParam(param)) {
        return NextResponse.json({ error: "Perfil não encontrado" }, { status: 404 });
    }

    const cleanParam = param.startsWith("@") ? param.slice(1) : param;
    let username = cleanParam.toLowerCase();

    if (UUID_REGEX.test(cleanParam)) {
        const publicClient = createPublicClient();
        const { data } = await publicClient.from("profiles").select("username").eq("id", cleanParam).maybeSingle();
        if (!data?.username) {
            return NextResponse.json({ error: "Perfil não encontrado" }, { status: 404 });
        }
        username = data.username;
    }

    const supabasePromise = createClient();
    const cachedPromise = getCachedPublicTrainerData(username);
    const [supabase, cached] = await Promise.all([supabasePromise, cachedPromise]);

    if (!cached) {
        return NextResponse.json({ error: "Perfil não encontrado" }, { status: 404 });
    }

    const {
        data: { user: viewer },
    } = await supabase.auth.getUser();

    const isOwner = Boolean(viewer?.id && viewer.id === cached.owner.id);
    let profile = hydratePublicProfile(buildCachedPublicProfile(cached), viewer);

    if (isOwner && viewer) {
        const { data: ownerBinders } = await supabase.from("binders").select("*").eq("user_id", viewer.id).order("created_at", { ascending: true });

        const binderIds = (ownerBinders ?? []).map((b) => b.id);
        let allSlots: any[] = [];
        if (binderIds.length > 0) {
            const { data: slotsData } = await supabase.from("binder_slots").select("*").in("binder_id", binderIds).order("page_number", { ascending: true }).order("slot_index", { ascending: true });
            allSlots = slotsData ?? [];
        }

        const userCardIds = allSlots.map((s) => s.user_card_id).filter((cid): cid is string => typeof cid === "string" && Boolean(cid));

        const userCardsMap = new Map<string, any>();
        if (userCardIds.length > 0) {
            const { data: uCards } = await supabase.from("user_cards").select("*").in("id", userCardIds);
            for (const card of uCards ?? []) {
                userCardsMap.set(card.id, card);
            }
        }

        const slotsByBinder = new Map<string, any[]>();
        for (const slot of allSlots) {
            const list = slotsByBinder.get(slot.binder_id) || [];
            list.push({
                ...slot,
                card: slot.user_card_id ? userCardsMap.get(slot.user_card_id) || null : null,
            });
            slotsByBinder.set(slot.binder_id, list);
        }

        const bindersWithStats = (ownerBinders ?? []).map((b) => {
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

        profile = {
            ...profile,
            binders: bindersWithStats,
            featuredBinder: featured,
            featuredBinderSlots: featuredSlots,
        };
    }

    return NextResponse.json({
        profile,
    });
}
