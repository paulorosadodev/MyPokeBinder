import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth";

export async function GET(request: Request) {
    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }
    const { user, supabase } = auth;

    const [binderRes, storedRes] = await Promise.all([supabase.from("user_cards").select("*").eq("user_id", user.id).eq("is_in_binder", true).order("pokemon_dex_id", { ascending: true }), supabase.from("user_cards").select("pokemon_dex_id").eq("user_id", user.id).eq("is_in_binder", false)]);

    if (binderRes.error) {
        return NextResponse.json({ error: binderRes.error.message }, { status: 500 });
    }
    if (storedRes.error) {
        return NextResponse.json({ error: storedRes.error.message }, { status: 500 });
    }

    const availableCounts: Record<number, number> = {};
    for (const item of storedRes.data ?? []) {
        availableCounts[item.pokemon_dex_id] = (availableCounts[item.pokemon_dex_id] || 0) + 1;
    }

    return NextResponse.json({
        cards: binderRes.data ?? [],
        availableCounts,
    });
}
