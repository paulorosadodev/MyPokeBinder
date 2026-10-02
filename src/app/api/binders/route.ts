import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth";
import { ALLOWED_COVER_THEMES } from "@/lib/binder/themes";
import { parseCoverPokemonDexId } from "@/lib/binder/coverPokemon";
import { getBinderSlotPageCount } from "@/lib/binder/pageCapacity";
import { GridType, SlotType } from "@/types/binder";
import { getBindersForShelf } from "@/lib/binder/shelfData";

const SLOTS_PER_GRID: Record<GridType, number> = {
    "1x1": 1,
    "2x2": 4,
    "3x3": 9,
    "3x4": 12,
};

export async function GET(request: Request) {
    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }
    const { user, supabase } = auth;

    const { binders, error } = await getBindersForShelf(supabase, user.id);
    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json({ binders });
}

export async function POST(request: Request) {
    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }
    const { user, supabase } = auth;

    let body: any;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Payload JSON inválido" }, { status: 400 });
    }

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    if (name.length < 1 || name.length > 60) {
        return NextResponse.json({ error: "O nome do binder é obrigatório e deve ter entre 1 e 60 caracteres" }, { status: 400 });
    }

    const description = typeof body?.description === "string" ? body.description.trim() : "";
    if (description.length > 200) {
        return NextResponse.json({ error: "A descrição não pode exceder 200 caracteres" }, { status: 400 });
    }

    const gridType = body?.grid_type as GridType;
    if (!gridType || !["1x1", "2x2", "3x3", "3x4"].includes(gridType)) {
        return NextResponse.json({ error: "Grid inválido. Permitidos: 1x1, 2x2, 3x3, 3x4" }, { status: 400 });
    }

    const totalPages = Number(body?.total_pages);
    if (!Number.isInteger(totalPages) || totalPages < 1 || totalPages > 50) {
        return NextResponse.json({ error: "O número total de páginas deve ser um inteiro entre 1 e 50" }, { status: 400 });
    }

    let coverTheme = typeof body?.cover_theme === "string" ? body.cover_theme.trim() : "classic_red";
    if (!ALLOWED_COVER_THEMES.includes(coverTheme)) {
        coverTheme = "classic_red";
    }

    const coverPokemonDexId = parseCoverPokemonDexId(body?.cover_pokemon_dex_id);
    if (body?.cover_pokemon_dex_id !== undefined && coverPokemonDexId === undefined) {
        return NextResponse.json({ error: "Pokémon da capa inválido. Escolha um Pokémon entre #001 e #1025" }, { status: 400 });
    }

    const isPublic = Boolean(body?.is_public);

    const { data: newBinder, error: createError } = await supabase
        .from("binders")
        .insert({
            user_id: user.id,
            name,
            description,
            grid_type: gridType,
            total_pages: totalPages,
            cover_theme: coverTheme,
            cover_pokemon_dex_id: coverPokemonDexId ?? null,
            is_public: isPublic,
        })
        .select()
        .single();

    if (createError || !newBinder) {
        return NextResponse.json({ error: createError?.message || "Erro ao criar binder" }, { status: 500 });
    }

    const slotsPerPage = SLOTS_PER_GRID[gridType];
    const slotPageCount = getBinderSlotPageCount(totalPages);
    const generatedSlots: Array<{
        binder_id: string;
        page_number: number;
        slot_index: number;
        slot_type: SlotType;
        target_dex_id: number | null;
        target_tcgdex_id: string | null;
        target_card_name: string | null;
        target_card_image_url: string | null;
    }> = [];

    const customSlotsMap = new Map<string, any>();
    if (Array.isArray(body?.slots)) {
        for (const item of body.slots) {
            if (item && item.page_number && item.slot_index) {
                customSlotsMap.set(`${item.page_number}-${item.slot_index}`, item);
            }
        }
    }

    for (let page = 1; page <= slotPageCount; page++) {
        for (let slot = 1; slot <= slotsPerPage; slot++) {
            const key = `${page}-${slot}`;
            const custom = page <= totalPages ? customSlotsMap.get(key) : undefined;

            if (custom) {
                const sType: SlotType = ["free", "pokemon", "card"].includes(custom.slot_type) ? custom.slot_type : "free";

                generatedSlots.push({
                    binder_id: newBinder.id,
                    page_number: page,
                    slot_index: slot,
                    slot_type: sType,
                    target_dex_id: sType === "pokemon" && typeof custom.target_dex_id === "number" ? custom.target_dex_id : null,
                    target_tcgdex_id: sType === "card" && typeof custom.target_tcgdex_id === "string" ? custom.target_tcgdex_id : null,
                    target_card_name: typeof custom.target_card_name === "string" ? custom.target_card_name : null,
                    target_card_image_url: typeof custom.target_card_image_url === "string" ? custom.target_card_image_url : null,
                });
            } else {
                generatedSlots.push({
                    binder_id: newBinder.id,
                    page_number: page,
                    slot_index: slot,
                    slot_type: "free",
                    target_dex_id: null,
                    target_tcgdex_id: null,
                    target_card_name: null,
                    target_card_image_url: null,
                });
            }
        }
    }

    const batchSize = 100;
    for (let i = 0; i < generatedSlots.length; i += batchSize) {
        const chunk = generatedSlots.slice(i, i + batchSize);
        const { error: slotInsertError } = await supabase.from("binder_slots").insert(chunk);
        if (slotInsertError) {
            await supabase.from("binders").delete().eq("id", newBinder.id);
            return NextResponse.json({ error: slotInsertError.message }, { status: 500 });
        }
    }

    return NextResponse.json(
        {
            binder: {
                ...newBinder,
                total_slots: generatedSlots.length,
                total_cards: 0,
                total_goals: generatedSlots.filter((s) => s.slot_type !== "free").length,
                filled_goals: 0,
                completion_percentage: 0,
            },
        },
        { status: 201 },
    );
}
