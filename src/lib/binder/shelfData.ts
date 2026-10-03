import type { SupabaseClient } from "@supabase/supabase-js";
import type { Binder, BinderPreviewCard } from "@/types/binder";

interface BinderSlotSummary {
    binder_id: string;
    page_number: number;
    slot_index: number;
    slot_type: "free" | "pokemon" | "card";
    user_card_id: string | null;
}

export interface BinderShelfData {
    binders: Binder[];
    error: string | null;
}

export function enrichBindersForShelf(binders: Binder[], slots: BinderSlotSummary[], cards: BinderPreviewCard[]): Binder[] {
    const cardsById = new Map(cards.map((card) => [card.id, card]));
    const slotsByBinder = new Map<string, BinderSlotSummary[]>();

    for (const slot of slots) {
        const binderSlots = slotsByBinder.get(slot.binder_id) ?? [];
        binderSlots.push(slot);
        slotsByBinder.set(slot.binder_id, binderSlots);
    }

    return binders.map((binder) => {
        const binderSlots = slotsByBinder.get(binder.id) ?? [];
        const totalSlots = binderSlots.length;
        const totalCards = binderSlots.filter((slot) => Boolean(slot.user_card_id)).length;
        const goals = binderSlots.filter((slot) => slot.slot_type === "pokemon" || slot.slot_type === "card");
        const filledGoals = goals.filter((slot) => Boolean(slot.user_card_id)).length;
        const firstPageSlots = binderSlots.filter((slot) => slot.page_number === 1);
        const previewCards = firstPageSlots
            .filter((slot) => Boolean(slot.user_card_id))
            .sort((left, right) => left.slot_index - right.slot_index)
            .flatMap((slot) => {
                const card = slot.user_card_id ? cardsById.get(slot.user_card_id) : undefined;
                return card ? [{ ...card, slot_index: slot.slot_index }] : [];
            })
            .slice(0, 3);

        const completionPercentage = goals.length > 0 ? Math.round((filledGoals / goals.length) * 100) : totalSlots > 0 ? Math.round((totalCards / totalSlots) * 100) : 0;

        return {
            ...binder,
            total_slots: totalSlots,
            total_cards: totalCards,
            total_goals: goals.length,
            filled_goals: filledGoals,
            completion_percentage: completionPercentage,
            preview_cards: previewCards,
        };
    });
}

export async function getBindersForShelf(supabase: SupabaseClient, userId: string): Promise<BinderShelfData> {
    const { data: rawBinders, error: bindersError } = await supabase.from("binders").select("*").eq("user_id", userId).order("created_at", { ascending: true });
    if (bindersError) return { binders: [], error: bindersError.message };

    const binders = (rawBinders as Binder[] | null) ?? [];
    if (binders.length === 0) return { binders, error: null };

    const binderIds = binders.map((binder) => binder.id);
    const { data: rawSlots, error: slotsError } = await supabase.from("binder_slots").select("binder_id, page_number, slot_index, slot_type, user_card_id").in("binder_id", binderIds).order("page_number", { ascending: true }).order("slot_index", { ascending: true });
    if (slotsError) return { binders: [], error: slotsError.message };

    const slots = (rawSlots as BinderSlotSummary[] | null) ?? [];
    const cardIds = slots.flatMap((slot) => (slot.user_card_id ? [slot.user_card_id] : []));
    if (cardIds.length === 0) return { binders: enrichBindersForShelf(binders, slots, []), error: null };

    const { data: rawCards, error: cardsError } = await supabase.from("user_cards").select("id, card_name, card_image_url").in("id", cardIds);
    if (cardsError) return { binders: [], error: cardsError.message };

    return { binders: enrichBindersForShelf(binders, slots, (rawCards as BinderPreviewCard[] | null) ?? []), error: null };
}
