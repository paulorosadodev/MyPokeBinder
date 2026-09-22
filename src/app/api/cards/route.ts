import { NextResponse, type NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth";
import { formatTcgdexImageUrl, isPocketCard } from "@/lib/pokemon/tcgdex";
import { isCardVariant } from "@/lib/pokemon/variant";

export async function GET(request: NextRequest) {
    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }
    const { user, supabase } = auth;

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

        if (typeof tcgdex_card_id !== "string" || tcgdex_card_id.trim().length === 0 || tcgdex_card_id.length > 100 || typeof pokemon_dex_id !== "number" || !Number.isInteger(pokemon_dex_id) || pokemon_dex_id < 1 || pokemon_dex_id > 151 || typeof card_name !== "string" || card_name.trim().length === 0 || card_name.length > 100 || typeof card_image_url !== "string" || !card_image_url.startsWith("https://") || card_image_url.length > 1000) {
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

        return NextResponse.json({ card: newCard }, { status: 201 });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Erro interno";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
