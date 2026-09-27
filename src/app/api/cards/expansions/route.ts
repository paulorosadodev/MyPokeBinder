import { NextResponse, type NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth";

export async function GET(request: NextRequest) {
    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }
    const { user, supabase } = auth;

    const { data, error } = await supabase.rpc("get_user_collection_expansions", {
        p_user_id: user.id,
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const expansions = (data ?? []).map((row: { expansion: string }) => row.expansion).filter(Boolean);

    return NextResponse.json({ expansions });
}
