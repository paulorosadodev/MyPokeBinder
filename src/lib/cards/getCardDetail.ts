import type { SupabaseClient } from "@supabase/supabase-js";
import { ALL_CARD_VARIANTS, isCardVariant } from "@/lib/pokemon/variant";
import { isCardCondition } from "@/lib/pokemon/condition";
import { formatTcgdexImageUrl, hasCardImage } from "@/lib/pokemon/tcgdex";
import { resolveCardImageFallback } from "@/lib/pokemon/imageFallback";
import { resolveStoredCardImage } from "@/lib/pokemon/cardImageStorage";
import { revalidatePublicProfileForUserId } from "@/lib/profile/publicCache";
import type { CardDetailsResponse } from "@/types/binder";

export async function getCardDetailData(supabase: SupabaseClient, userId: string, cardId: string): Promise<CardDetailsResponse | null> {
    const { data: card, error } = await supabase.from("user_cards").select("*").eq("id", cardId).eq("user_id", userId).maybeSingle();

    if (error || !card) {
        return null;
    }

    const storedImage = resolveStoredCardImage(card.tcgdex_card_id);
    if (storedImage && card.card_image_url !== storedImage) {
        card.card_image_url = storedImage;
        await supabase.from("user_cards").update({ card_image_url: storedImage }).eq("id", card.id);
        await revalidatePublicProfileForUserId(supabase, userId);
    } else if (!hasCardImage(card.card_image_url)) {
        const fallbackImage = await resolveCardImageFallback(card.tcgdex_card_id);
        if (fallbackImage) {
            const formattedImage = formatTcgdexImageUrl(fallbackImage);
            card.card_image_url = formattedImage;
            await supabase.from("user_cards").update({ card_image_url: formattedImage }).eq("id", card.id);
            await revalidatePublicProfileForUserId(supabase, userId);
        }
    }

    const cardVariant = isCardVariant(card.card_variant) ? card.card_variant : "normal";
    const cardCondition = isCardCondition(card.card_condition) ? card.card_condition : "NM";

    const copiesQuery = supabase.from("user_cards").select("*").eq("user_id", userId).eq("tcgdex_card_id", card.tcgdex_card_id).eq("card_language", card.card_language).eq("card_variant", cardVariant).eq("card_condition", cardCondition).order("created_at", { ascending: true });
    const allocationQuery = supabase.from("binder_slots").select("id, binder_id, page_number, slot_index, binders (id, name, grid_type)").eq("user_card_id", cardId).maybeSingle();

    const [{ data: copies }, { data: slotAllocation }] = await Promise.all([copiesQuery, allocationQuery]);

    const allocation = slotAllocation
        ? {
              slot_id: slotAllocation.id,
              binder_id: slotAllocation.binder_id,
              page_number: slotAllocation.page_number,
              slot_index: slotAllocation.slot_index,
              binder_name: (slotAllocation.binders as any)?.name || "Binder",
              binder_grid: (slotAllocation.binders as any)?.grid_type || "3x3",
          }
        : null;

    return {
        card,
        copies: copies ?? [card],
        availableVariants: ALL_CARD_VARIANTS,
        allocation,
    };
}
