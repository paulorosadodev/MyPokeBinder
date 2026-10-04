import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth";
import { buildAvailableCounts } from "@/lib/binder/availableCounts";

export async function GET(request: Request) {
    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }
    const { user, supabase } = auth;

    const { data, error } = await supabase.from("user_cards").select("pokemon_dex_id").eq("user_id", user.id).eq("is_in_binder", false);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ availableCounts: buildAvailableCounts(data ?? []) });
}
