import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import { getCachedPublicTrainerData, hydratePublicCollection, toPublicCachedCollection } from "@/lib/profile/publicCache";
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
    let username = cleanParam.toLowerCase();

    if (UUID_REGEX.test(cleanParam)) {
        const publicClient = createPublicClient();
        const { data } = await publicClient.from("profiles").select("username").eq("id", cleanParam).maybeSingle();
        if (!data?.username) {
            return NextResponse.json({ error: "Perfil não encontrado" }, { status: 404 });
        }
        username = data.username;
    }

    const supabasePromise = createClient();
    const cachedPromise = getCachedPublicTrainerData(username);
    const [supabase, cached] = await Promise.all([supabasePromise, cachedPromise]);

    if (!cached) {
        return NextResponse.json({ error: "Perfil não encontrado" }, { status: 404 });
    }

    const {
        data: { user: viewer },
    } = await supabase.auth.getUser();

    return NextResponse.json(hydratePublicCollection(toPublicCachedCollection(cached), viewer));
}
