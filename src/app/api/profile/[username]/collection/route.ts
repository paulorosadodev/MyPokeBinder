import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";
import { safeDecodeParam, isValidProfileParam, UUID_REGEX } from "@/lib/profile/username";

export async function GET(request: NextRequest, context: { params: Promise<{ username: string }> }) {
    const { username: rawParam } = await context.params;
    const param = safeDecodeParam(rawParam);

    if (param === "") {
        return NextResponse.json({ error: "Perfil inválido" }, { status: 400 });
    }

    if (!param || !isValidProfileParam(param)) {
        return NextResponse.json({ error: "Perfil não encontrado" }, { status: 404 });
    }

    const pageParam = request.nextUrl.searchParams.get("page") ?? "1";
    const limitParam = request.nextUrl.searchParams.get("limit") ?? "36";
    const search = request.nextUrl.searchParams.get("search") ?? "";
    const status = request.nextUrl.searchParams.get("status") ?? "all";
    const language = request.nextUrl.searchParams.get("language") ?? "all";
    const rarity = request.nextUrl.searchParams.get("rarity") ?? "all";
    const expansion = request.nextUrl.searchParams.get("expansion") ?? "all";
    const sort = request.nextUrl.searchParams.get("sort") ?? "dex";
    const direction = request.nextUrl.searchParams.get("direction") ?? "asc";

    const page = parseInt(pageParam, 10);
    const limit = parseInt(limitParam, 10);

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1 || limit > 100) {
        return NextResponse.json({ error: "Parâmetros de paginação inválidos" }, { status: 400 });
    }

    const validStatuses = ["all", "in_binder", "stored"];
    if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: "Filtro de status inválido" }, { status: 400 });
    }

    const validLanguages = ["all", "pt-br", "en", "ja"];
    if (!validLanguages.includes(language)) {
        return NextResponse.json({ error: "Filtro de idioma inválido" }, { status: 400 });
    }

    const validSortFields = ["dex", "name", "recent"];
    if (!validSortFields.includes(sort)) {
        return NextResponse.json({ error: "Campo de ordenação inválido" }, { status: 400 });
    }

    const validSortDirections = ["asc", "desc"];
    if (!validSortDirections.includes(direction)) {
        return NextResponse.json({ error: "Direção de ordenação inválida" }, { status: 400 });
    }

    if (search.length > 100 || rarity.length > 50 || expansion.length > 100) {
        return NextResponse.json({ error: "Tamanho de filtro excede o limite permitido" }, { status: 400 });
    }

    const cleanParam = param.startsWith("@") ? param.slice(1) : param;
    const username = cleanParam.toLowerCase();

    const publicClient = createPublicClient();

    let profileQuery = publicClient.from("profiles").select("id, username, display_name, avatar_url, theme_color");
    if (UUID_REGEX.test(cleanParam)) {
        profileQuery = profileQuery.eq("id", cleanParam);
    } else {
        profileQuery = profileQuery.eq("username", username);
    }

    const { data: profileRow, error: profileError } = await profileQuery.maybeSingle();

    if (profileError || !profileRow) {
        return NextResponse.json({ error: "Perfil não encontrado" }, { status: 404 });
    }

    const offset = (page - 1) * limit;

    const supabase = await createClient();
    const {
        data: { user: viewer },
    } = await supabase.auth.getUser();

    const isOwner = Boolean(viewer?.id && viewer.id === profileRow.id);

    const { data, error } = await publicClient.rpc("get_user_collection_groups", {
        p_user_id: profileRow.id,
        p_search: search.trim() ? search.trim() : null,
        p_status: status,
        p_language: language,
        p_rarity: rarity,
        p_expansion: expansion,
        p_sort_field: sort,
        p_sort_direction: direction,
        p_limit: limit,
        p_offset: offset,
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const rawRows = (data ?? []) as Array<{
        representative_id: string;
        user_id: string;
        pokemon_dex_id: number;
        tcgdex_card_id: string;
        card_name: string;
        card_image_url: string;
        card_set_name: string;
        card_rarity: string;
        card_language: string;
        card_variant: string;
        is_in_binder: boolean;
        created_at: string;
        updated_at: string;
        group_total_count: number;
        has_in_binder: boolean;
        copy_ids: string[];
        total_filtered_count: number | string;
    }>;

    const totalFilteredCount = rawRows.length > 0 ? Number(rawRows[0].total_filtered_count) : 0;

    const groups = rawRows.map((row) => ({
        key: `${row.tcgdex_card_id}::${row.card_language}::${row.card_variant}`,
        card: {
            id: row.representative_id,
            user_id: row.user_id,
            pokemon_dex_id: row.pokemon_dex_id,
            tcgdex_card_id: row.tcgdex_card_id,
            card_name: row.card_name,
            card_image_url: row.card_image_url,
            card_set_name: row.card_set_name,
            card_rarity: row.card_rarity,
            card_language: row.card_language,
            card_variant: row.card_variant,
            is_in_binder: row.is_in_binder,
            created_at: row.created_at,
            updated_at: row.updated_at,
        },
        copies: (row.copy_ids ?? []).map((id: string) => ({
            id,
            user_id: row.user_id,
            pokemon_dex_id: row.pokemon_dex_id,
            tcgdex_card_id: row.tcgdex_card_id,
            card_name: row.card_name,
            card_image_url: row.card_image_url,
            card_set_name: row.card_set_name,
            card_rarity: row.card_rarity,
            card_language: row.card_language,
            card_variant: row.card_variant,
            is_in_binder: row.has_in_binder,
            created_at: row.created_at,
            updated_at: row.updated_at,
        })),
        totalCount: row.group_total_count,
        hasInBinder: row.has_in_binder,
    }));

    return NextResponse.json({
        owner: {
            id: profileRow.id,
            username: profileRow.username,
            name: profileRow.display_name || profileRow.username,
            avatarUrl: profileRow.avatar_url,
            themeColor: profileRow.theme_color,
        },
        isOwner,
        groups,
        total: totalFilteredCount,
        page,
        pageSize: limit,
        hasMore: offset + groups.length < totalFilteredCount,
    });
}
