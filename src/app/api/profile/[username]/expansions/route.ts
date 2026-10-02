import { NextResponse, type NextRequest } from "next/server";
import { createPublicClient } from "@/lib/supabase/public";
import { createAdminClient } from "@/lib/supabase/admin";
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
    const username = cleanParam.toLowerCase();

    const publicClient = process.env.SUPABASE_SERVICE_ROLE_KEY ? createAdminClient() : createPublicClient();

    let profileQuery = publicClient.from("profiles").select("id");
    if (UUID_REGEX.test(cleanParam)) {
        profileQuery = profileQuery.eq("id", cleanParam);
    } else {
        profileQuery = profileQuery.eq("username", username);
    }

    const { data: profileRow, error: profileError } = await profileQuery.maybeSingle();

    if (profileError || !profileRow) {
        return NextResponse.json({ error: "Perfil não encontrado" }, { status: 404 });
    }

    const { data, error } = await publicClient.rpc("get_user_collection_expansions", {
        p_user_id: profileRow.id,
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const expansions = (data ?? []).map((row: { expansion: string }) => row.expansion).filter(Boolean);

    return NextResponse.json({ expansions });
}
