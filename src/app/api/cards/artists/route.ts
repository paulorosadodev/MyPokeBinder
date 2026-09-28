import { NextResponse, type NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth";

export async function GET(request: NextRequest) {
    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }
    const { user, supabase } = auth;

    const { data, error } = await supabase.rpc("get_user_collection_artists", {
        p_user_id: user.id,
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const artists = (data ?? []).map((row: { artist: string }) => row.artist).filter(Boolean);

    return NextResponse.json({ artists });
}
