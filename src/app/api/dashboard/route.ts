import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth";
import { POKEMON_151 } from "@/lib/pokemon/constants";
import { DashboardSlot, DashboardData } from "@/types/binder";

export async function GET(request: Request) {
    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }
    const { user, supabase } = auth;

    const { data: allUserCards, error: dbError } = await supabase.from("user_cards").select("pokemon_dex_id, is_in_binder, card_rarity, card_image_url").eq("user_id", user.id);

    if (dbError) {
        return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    const cards = allUserCards ?? [];
    const binderCards = cards.filter((c) => c.is_in_binder);

    const binderMap = new Map<number, (typeof cards)[0]>();
    binderCards.forEach((c) => {
        binderMap.set(c.pokemon_dex_id, c);
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

    const responseData: DashboardData = {
        total_in_binder: totalInBinder,
        total_collection: totalCollection,
        completion_percentage: completionPercentage,
        slots,
    };

    return NextResponse.json(responseData);
}
