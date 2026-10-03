import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getServerUser } from "@/lib/supabase/serverUser";
import { safeDecodeParam, UUID_REGEX } from "@/lib/profile/username";
import { UniversalBinderViewer } from "@/components/binder/UniversalBinderViewer";
import type { Binder, BinderSlot } from "@/types/binder";

const getCachedBinder = cache(async (binderId: string) => {
    const supabase = await createClient();
    return supabase.from("binders").select("*").eq("id", binderId).maybeSingle();
});

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const rawParams = await params;
    const binderId = safeDecodeParam(rawParams?.id);

    if (!binderId || !UUID_REGEX.test(binderId)) {
        return { title: "Binder não encontrado | MyPokeBinder" };
    }

    const { data: binder } = await getCachedBinder(binderId);

    if (!binder) {
        return { title: "Binder não encontrado | MyPokeBinder" };
    }

    return {
        title: `${binder.name} | MyPokeBinder`,
        description: binder.description || `Visualizador do binder ${binder.name} no MyPokeBinder.`,
    };
}

export default async function BinderViewerPage({ params }: { params: Promise<{ id: string }> }) {
    const rawParams = await params;
    const binderId = safeDecodeParam(rawParams?.id);

    if (!binderId || !UUID_REGEX.test(binderId)) {
        notFound();
    }

    const { user, supabase } = await getServerUser();
    const [binderResult, slotsResult] = await Promise.all([getCachedBinder(binderId), supabase.from("binder_slots").select("*").eq("binder_id", binderId).order("page_number", { ascending: true }).order("slot_index", { ascending: true })]);

    const { data: binder, error: binderError } = binderResult;

    if (binderError || !binder) {
        notFound();
    }

    const isOwner = Boolean(user && user.id === binder.user_id);
    if (!isOwner && !binder.is_public) {
        notFound();
    }

    const rawSlots = slotsResult.data ?? [];
    const cardIds = rawSlots.map((s) => s.user_card_id).filter((cid): cid is string => typeof cid === "string" && Boolean(cid));

    const [cardsResult, othersResult] = await Promise.all([cardIds.length > 0 ? supabase.from("user_cards").select("*").in("id", cardIds) : Promise.resolve({ data: [] }), user && isOwner ? supabase.from("binders").select("id, name, description, grid_type, cover_theme, cover_pokemon_dex_id").eq("user_id", user.id).order("created_at", { ascending: true }) : Promise.resolve({ data: [] })]);

    const cardsMap = new Map<string, any>();
    for (const card of cardsResult.data ?? []) {
        cardsMap.set(card.id, card);
    }

    const slots: BinderSlot[] = rawSlots.map((s) => ({
        ...s,
        card: s.user_card_id ? cardsMap.get(s.user_card_id) || null : null,
    }));

    const otherBinders = (othersResult.data ?? []) as Array<Pick<Binder, "id" | "name" | "description" | "grid_type" | "cover_theme" | "cover_pokemon_dex_id">>;

    return <UniversalBinderViewer binder={binder as Binder} initialSlots={slots} otherBinders={otherBinders} isOwner={isOwner} />;
}
