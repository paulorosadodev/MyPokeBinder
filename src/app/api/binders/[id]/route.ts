import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth";
import { safeDecodeParam, UUID_REGEX } from "@/lib/profile/username";
import { ALLOWED_COVER_THEMES } from "@/lib/binder/themes";
import { parseCoverPokemonDexId } from "@/lib/binder/coverPokemon";
import { getBinderSlotPageCount, getBinderTrailingSlotPage } from "@/lib/binder/pageCapacity";
import { GridType, SlotType } from "@/types/binder";
import { revalidatePublicProfileForUserId } from "@/lib/profile/publicCache";

const SLOTS_PER_GRID: Record<GridType, number> = {
    "1x1": 1,
    "2x2": 4,
    "3x3": 9,
    "3x4": 12,
};

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
    const rawParams = await context.params;
    const rawId = rawParams?.id;
    const binderId = safeDecodeParam(rawId);

    if (!binderId || !UUID_REGEX.test(binderId)) {
        return NextResponse.json({ error: "Identificador de binder inválido" }, { status: 400 });
    }

    const auth = await getAuthenticatedUser(request);
    const { user, supabase } = auth;

    const { data: binder, error: binderError } = await supabase.from("binders").select("*").eq("id", binderId).maybeSingle();

    if (binderError) {
        return NextResponse.json({ error: binderError.message }, { status: 500 });
    }

    if (!binder) {
        return NextResponse.json({ error: "Binder não encontrado" }, { status: 404 });
    }

    const isOwner = user && user.id === binder.user_id;
    if (!isOwner && !binder.is_public) {
        return NextResponse.json({ error: "Binder privado ou não encontrado" }, { status: 404 });
    }

    const { data: slots, error: slotsError } = await supabase.from("binder_slots").select("*").eq("binder_id", binderId).order("page_number", { ascending: true }).order("slot_index", { ascending: true });

    if (slotsError) {
        return NextResponse.json({ error: slotsError.message }, { status: 500 });
    }

    const userCardIds = (slots ?? []).map((s) => s.user_card_id).filter((cid): cid is string => typeof cid === "string" && Boolean(cid));

    let userCardsMap = new Map<string, any>();
    if (userCardIds.length > 0) {
        const { data: cards } = await supabase.from("user_cards").select("*").in("id", userCardIds);

        for (const card of cards ?? []) {
            userCardsMap.set(card.id, card);
        }
    }

    const enrichedSlots = (slots ?? []).map((s) => ({
        ...s,
        card: s.user_card_id ? userCardsMap.get(s.user_card_id) || null : null,
    }));

    let otherBinders: Array<{ id: string; name: string; grid_type: GridType }> = [];
    if (user) {
        const { data: others } = await supabase.from("binders").select("id, name, grid_type").eq("user_id", binder.user_id).order("created_at", { ascending: true });

        otherBinders = others ?? [];
    }

    return NextResponse.json({
        binder,
        slots: enrichedSlots,
        otherBinders,
        isOwner,
    });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
    const rawParams = await context.params;
    const rawId = rawParams?.id;
    const binderId = safeDecodeParam(rawId);

    if (!binderId || !UUID_REGEX.test(binderId)) {
        return NextResponse.json({ error: "Identificador de binder inválido" }, { status: 400 });
    }

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

    const { data: currentBinder, error: fetchError } = await supabase.from("binders").select("*").eq("id", binderId).eq("user_id", user.id).maybeSingle();

    if (fetchError) {
        return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }
    if (!currentBinder) {
        return NextResponse.json({ error: "Binder não encontrado" }, { status: 404 });
    }

    const updates: Record<string, any> = {
        updated_at: new Date().toISOString(),
    };

    if (body.name !== undefined) {
        const trimmedName = typeof body.name === "string" ? body.name.trim() : "";
        if (trimmedName.length < 1 || trimmedName.length > 60) {
            return NextResponse.json({ error: "O nome do binder deve ter entre 1 e 60 caracteres" }, { status: 400 });
        }
        updates.name = trimmedName;
    }

    if (body.description !== undefined) {
        const trimmedDesc = typeof body.description === "string" ? body.description.trim() : "";
        if (trimmedDesc.length > 200) {
            return NextResponse.json({ error: "A descrição não pode exceder 200 caracteres" }, { status: 400 });
        }
        updates.description = trimmedDesc;
    }

    if (body.cover_theme !== undefined) {
        const theme = typeof body.cover_theme === "string" ? body.cover_theme.trim() : "classic_red";
        if (!ALLOWED_COVER_THEMES.includes(theme)) {
            return NextResponse.json({ error: "Tema de capa inválido" }, { status: 400 });
        }
        updates.cover_theme = theme;
    }

    if (body.cover_pokemon_dex_id !== undefined) {
        const coverPokemonDexId = parseCoverPokemonDexId(body.cover_pokemon_dex_id);
        if (coverPokemonDexId === undefined) {
            return NextResponse.json({ error: "Pokémon da capa inválido. Escolha um Pokémon entre #001 e #1025" }, { status: 400 });
        }
        updates.cover_pokemon_dex_id = coverPokemonDexId;
    }

    if (body.is_public !== undefined) {
        updates.is_public = Boolean(body.is_public);
    }

    if (body.is_featured !== undefined) {
        const nextFeatured = Boolean(body.is_featured);
        updates.is_featured = nextFeatured;
        if (nextFeatured) {
            await supabase.from("binders").update({ is_featured: false }).eq("user_id", user.id).neq("id", binderId);
        }
    }

    if (body.total_pages !== undefined) {
        const newTotalPages = Number(body.total_pages);
        if (!Number.isInteger(newTotalPages) || newTotalPages < 1 || newTotalPages > 50) {
            return NextResponse.json({ error: "O total de páginas deve ser um número inteiro entre 1 e 50" }, { status: 400 });
        }

        const oldTotalPages = currentBinder.total_pages;
        const oldSlotPageCount = getBinderSlotPageCount(oldTotalPages);
        const newSlotPageCount = getBinderSlotPageCount(newTotalPages);
        if (newSlotPageCount > oldSlotPageCount) {
            const slotsPerPage = SLOTS_PER_GRID[currentBinder.grid_type as GridType];
            const newSlots = [];
            for (let page = oldSlotPageCount + 1; page <= newSlotPageCount; page++) {
                for (let slot = 1; slot <= slotsPerPage; slot++) {
                    newSlots.push({
                        binder_id: binderId,
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
            const { error: insertSlotsError } = await supabase.from("binder_slots").insert(newSlots);
            if (insertSlotsError) {
                return NextResponse.json({ error: insertSlotsError.message }, { status: 500 });
            }
        } else if (newSlotPageCount < oldSlotPageCount) {
            const { error: deleteSlotsError } = await supabase.from("binder_slots").delete().eq("binder_id", binderId).gt("page_number", newSlotPageCount);

            if (deleteSlotsError) {
                return NextResponse.json({ error: deleteSlotsError.message }, { status: 500 });
            }
        }

        const trailingSlotPage = getBinderTrailingSlotPage(newTotalPages);
        if (trailingSlotPage !== null) {
            const { error: resetTrailingSlotsError } = await supabase.from("binder_slots").update({ slot_type: "free", target_dex_id: null, target_tcgdex_id: null, target_card_name: null, target_card_image_url: null }).eq("binder_id", binderId).eq("page_number", trailingSlotPage);

            if (resetTrailingSlotsError) {
                return NextResponse.json({ error: resetTrailingSlotsError.message }, { status: 500 });
            }
        }

        updates.total_pages = newTotalPages;
    }

    const { data: updatedBinder, error: updateError } = await supabase.from("binders").update(updates).eq("id", binderId).select().single();

    if (updateError || !updatedBinder) {
        return NextResponse.json({ error: updateError?.message || "Erro ao atualizar binder" }, { status: 500 });
    }

    await revalidatePublicProfileForUserId(supabase, user.id);

    return NextResponse.json({ binder: updatedBinder });
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    const rawParams = await context.params;
    const rawId = rawParams?.id;
    const binderId = safeDecodeParam(rawId);

    if (!binderId || !UUID_REGEX.test(binderId)) {
        return NextResponse.json({ error: "Identificador de binder inválido" }, { status: 400 });
    }

    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }
    const { user, supabase } = auth;

    const { error: deleteError } = await supabase.from("binders").delete().eq("id", binderId).eq("user_id", user.id);

    if (deleteError) {
        return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    await revalidatePublicProfileForUserId(supabase, user.id);

    return NextResponse.json({ success: true });
}
