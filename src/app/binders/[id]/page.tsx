import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { safeDecodeParam, UUID_REGEX } from "@/lib/profile/username";
import { UniversalBinderViewer } from "@/components/binder/UniversalBinderViewer";
import type { Binder, BinderSlot, GridType } from "@/types/binder";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const rawParams = await params;
    const binderId = safeDecodeParam(rawParams?.id);

    if (!binderId || !UUID_REGEX.test(binderId)) {
        return { title: "Binder não encontrado | MyPokeBinder" };
    }

    const supabase = await createClient();
    const { data: binder } = await supabase.from("binders").select("name, description").eq("id", binderId).maybeSingle();

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

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data: binder, error: binderError } = await supabase.from("binders").select("*").eq("id", binderId).maybeSingle();

    if (binderError || !binder) {
        notFound();
    }

    const isOwner = Boolean(user && user.id === binder.user_id);
    if (!isOwner && !binder.is_public) {
        notFound();
    }

    const { data: rawSlots } = await supabase.from("binder_slots").select("*").eq("binder_id", binderId).order("page_number", { ascending: true }).order("slot_index", { ascending: true });

    const cardIds = (rawSlots ?? []).map((s) => s.user_card_id).filter((cid): cid is string => typeof cid === "string" && Boolean(cid));

    let cardsMap = new Map<string, any>();
    if (cardIds.length > 0) {
        const { data: cards } = await supabase.from("user_cards").select("*").in("id", cardIds);

        for (const card of cards ?? []) {
            cardsMap.set(card.id, card);
        }
    }

    const slots: BinderSlot[] = (rawSlots ?? []).map((s) => ({
        ...s,
        card: s.user_card_id ? cardsMap.get(s.user_card_id) || null : null,
    }));

    let otherBinders: Array<{ id: string; name: string; grid_type: GridType }> = [];
    if (user && isOwner) {
        const { data: others } = await supabase.from("binders").select("id, name, grid_type").eq("user_id", user.id).order("created_at", { ascending: true });

        otherBinders = others ?? [];
    }

    return <UniversalBinderViewer binder={binder as Binder} initialSlots={slots} otherBinders={otherBinders} isOwner={isOwner} />;
}
