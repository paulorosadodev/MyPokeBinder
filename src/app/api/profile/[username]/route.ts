import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { buildProfileFromCards } from "@/lib/profile/buildProfile";
import type { UserCard } from "@/types/binder";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(_request: NextRequest, context: { params: Promise<{ username: string }> }) {
    const { username: rawParam } = await context.params;
    const param = decodeURIComponent(rawParam || "").trim();

    if (!param) {
        return NextResponse.json({ error: "Perfil inválido" }, { status: 400 });
    }

    const supabase = await createClient();

    const {
        data: { user: viewer },
    } = await supabase.auth.getUser();

    const query = supabase.from("profiles").select("id, username, display_name, avatar_url, created_at, theme_color, bio, favorite_card_ids");
    const { data: profileRow, error: profileError } = UUID_RE.test(param) ? await query.eq("id", param).maybeSingle() : await query.eq("username", param.toLowerCase()).maybeSingle();

    if (profileError) {
        return NextResponse.json({ error: profileError.message }, { status: 500 });
    }

    if (!profileRow) {
        return NextResponse.json({ error: "Perfil não encontrado" }, { status: 404 });
    }

    const isOwner = Boolean(viewer?.id && viewer.id === profileRow.id);

    const { data: cardsData, error: cardsError } = await supabase.rpc("get_public_user_cards", {
        p_user_id: profileRow.id,
    });

    if (cardsError) {
        return NextResponse.json({ error: cardsError.message }, { status: 500 });
    }

    const profile = buildProfileFromCards({
        user: {
            id: profileRow.id,
            username: profileRow.username,
            name: profileRow.display_name || profileRow.username,
            avatarUrl: profileRow.avatar_url,
            createdAt: profileRow.created_at,
            email: isOwner ? viewer?.email : undefined,
            bio: profileRow.bio,
        },
        cards: (cardsData ?? []) as UserCard[],
        isOwner,
        themeColor: profileRow.theme_color,
        favoriteCardIds: profileRow.favorite_card_ids ?? [],
    });

    return NextResponse.json({ profile });
}
