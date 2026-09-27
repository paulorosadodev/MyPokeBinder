import { NextResponse, type NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth";
import { formatTcgdexImageUrl, isPocketCard } from "@/lib/pokemon/tcgdex";
import { revalidatePublicProfileForUserId } from "@/lib/profile/publicCache";
import { isCardVariant } from "@/lib/pokemon/variant";
import { isCardMatchingPokemon } from "@/lib/pokemon/match";

export async function GET(request: NextRequest) {
    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }
    const { user, supabase } = auth;

    const isGrouped = request.nextUrl.searchParams.get("grouped") === "true";

    if (isGrouped) {
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

        const offset = (page - 1) * limit;

        const { data, error } = await supabase.rpc("get_user_collection_groups", {
            p_user_id: user.id,
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
            groups,
            total: totalFilteredCount,
            page,
            pageSize: limit,
            hasMore: offset + groups.length < totalFilteredCount,
        });
    }

    const pokemonDexIdParam = request.nextUrl.searchParams.get("pokemon_dex_id");

    let query = supabase.from("user_cards").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5000);

    if (pokemonDexIdParam) {
        const dexId = parseInt(pokemonDexIdParam, 10);
        if (!isNaN(dexId)) {
            query = query.eq("pokemon_dex_id", dexId);
        }
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ cards: data ?? [] });
}

export async function POST(request: NextRequest) {
    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }
    const { user, supabase } = auth;

    try {
        const body = await request.json();
        const { tcgdex_card_id, pokemon_dex_id, card_name, card_image_url, card_set_name = "", card_rarity = "", card_language = "pt-br", card_variant = "normal" } = body;

        if (
            typeof tcgdex_card_id !== "string" ||
            tcgdex_card_id.trim().length === 0 ||
            tcgdex_card_id.length > 100 ||
            typeof pokemon_dex_id !== "number" ||
            !Number.isInteger(pokemon_dex_id) ||
            pokemon_dex_id < 1 ||
            pokemon_dex_id > 151 ||
            typeof card_name !== "string" ||
            card_name.trim().length === 0 ||
            card_name.length > 100 ||
            typeof card_image_url !== "string" ||
            !card_image_url.startsWith("https://") ||
            card_image_url.length > 1000 ||
            typeof card_set_name !== "string" ||
            card_set_name.length > 100 ||
            typeof card_rarity !== "string" ||
            card_rarity.length > 100
        ) {
            return NextResponse.json({ error: "Campos obrigatórios ausentes ou inválidos" }, { status: 400 });
        }

        const validLanguages = ["pt-br", "en", "ja"];
        if (typeof card_language !== "string" || !validLanguages.includes(card_language.toLowerCase())) {
            return NextResponse.json({ error: "Idioma inválido" }, { status: 400 });
        }

        const variant = typeof card_variant === "string" ? card_variant.toLowerCase() : "normal";
        if (!isCardVariant(variant)) {
            return NextResponse.json({ error: "Versão inválida" }, { status: 400 });
        }

        if (isPocketCard({ id: tcgdex_card_id, image: card_image_url })) {
            return NextResponse.json({ error: "Cartas do Pokémon TCG Pocket não são permitidas" }, { status: 400 });
        }

        if (!isCardMatchingPokemon(card_name, pokemon_dex_id)) {
            return NextResponse.json({ error: "A carta selecionada não corresponde ao Pokémon indicado" }, { status: 400 });
        }

        const { data: newCard, error: insertError } = await supabase
            .from("user_cards")
            .insert({
                user_id: user.id,
                tcgdex_card_id: tcgdex_card_id.trim(),
                pokemon_dex_id,
                card_name: card_name.trim(),
                card_image_url: formatTcgdexImageUrl(card_image_url.trim()),
                card_set_name: typeof card_set_name === "string" ? card_set_name.trim() : "",
                card_rarity: typeof card_rarity === "string" ? card_rarity.trim() : "",
                card_language: card_language.toLowerCase(),
                card_variant: variant,
                is_in_binder: false,
            })
            .select()
            .single();

        if (insertError) {
            return NextResponse.json({ error: insertError.message }, { status: 500 });
        }

        await revalidatePublicProfileForUserId(supabase as any, user.id);

        return NextResponse.json({ card: newCard }, { status: 201 });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Erro interno";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
