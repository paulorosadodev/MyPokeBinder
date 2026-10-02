import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth";
import { safeDecodeParam, UUID_REGEX } from "@/lib/profile/username";

export async function POST(request: Request, context: { params: Promise<{ id: string; slotId: string }> }) {
    const rawParams = await context.params;
    const binderId = safeDecodeParam(rawParams?.id);
    const slotId = safeDecodeParam(rawParams?.slotId);

    if (!binderId || !UUID_REGEX.test(binderId) || !slotId || !UUID_REGEX.test(slotId)) {
        return NextResponse.json({ error: "Identificadores inválidos" }, { status: 400 });
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

    const userCardId = typeof body?.user_card_id === "string" ? body.user_card_id.trim() : "";
    if (!userCardId || !UUID_REGEX.test(userCardId)) {
        return NextResponse.json({ error: "ID da carta do usuário é obrigatório e deve ser um UUID válido" }, { status: 400 });
    }

    const { data: binder, error: binderError } = await supabase.from("binders").select("id, user_id").eq("id", binderId).eq("user_id", user.id).maybeSingle();

    if (binderError || !binder) {
        return NextResponse.json({ error: "Binder não encontrado" }, { status: 404 });
    }

    const { data: slot, error: slotError } = await supabase.from("binder_slots").select("*").eq("id", slotId).eq("binder_id", binderId).maybeSingle();

    if (slotError || !slot) {
        return NextResponse.json({ error: "Compartimento não encontrado no binder" }, { status: 404 });
    }

    const { data: card, error: cardError } = await supabase.from("user_cards").select("*").eq("id", userCardId).eq("user_id", user.id).maybeSingle();

    if (cardError || !card) {
        return NextResponse.json({ error: "Carta não encontrada na sua coleção" }, { status: 404 });
    }

    const { data: existingSlot, error: existingError } = await supabase.from("binder_slots").select("id, binder_id, page_number, slot_index").eq("user_card_id", userCardId).maybeSingle();

    if (existingSlot && existingSlot.id !== slotId) {
        return NextResponse.json({ error: "Esta carta física já está alocada em outro compartimento." }, { status: 409 });
    }

    if (slot.slot_type === "pokemon" && slot.target_dex_id != null) {
        if (card.pokemon_dex_id !== slot.target_dex_id) {
            return NextResponse.json({ error: `Esta carta não corresponde ao Pokémon alvo (#${slot.target_dex_id}) do compartimento.` }, { status: 400 });
        }
    } else if (slot.slot_type === "card" && slot.target_tcgdex_id) {
        if (card.tcgdex_card_id !== slot.target_tcgdex_id) {
            return NextResponse.json({ error: "Esta carta não corresponde à carta alvo do compartimento." }, { status: 400 });
        }
    }

    const { data: updatedSlot, error: updateError } = await supabase
        .from("binder_slots")
        .update({
            user_card_id: userCardId,
            updated_at: new Date().toISOString(),
        })
        .eq("id", slotId)
        .select()
        .single();

    if (updateError || !updatedSlot) {
        return NextResponse.json({ error: updateError?.message || "Erro ao alocar carta" }, { status: 500 });
    }

    return NextResponse.json({
        slot: {
            ...updatedSlot,
            card,
        },
        card,
    });
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string; slotId: string }> }) {
    const rawParams = await context.params;
    const binderId = safeDecodeParam(rawParams?.id);
    const slotId = safeDecodeParam(rawParams?.slotId);

    if (!binderId || !UUID_REGEX.test(binderId) || !slotId || !UUID_REGEX.test(slotId)) {
        return NextResponse.json({ error: "Identificadores inválidos" }, { status: 400 });
    }

    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }
    const { user, supabase } = auth;

    const { data: binder, error: binderError } = await supabase.from("binders").select("id, user_id").eq("id", binderId).eq("user_id", user.id).maybeSingle();

    if (binderError || !binder) {
        return NextResponse.json({ error: "Binder não encontrado" }, { status: 404 });
    }

    const { data: slot, error: slotError } = await supabase.from("binder_slots").select("id, binder_id, user_card_id").eq("id", slotId).eq("binder_id", binderId).maybeSingle();

    if (slotError || !slot) {
        return NextResponse.json({ error: "Compartimento não encontrado no binder" }, { status: 404 });
    }

    const { error: updateError } = await supabase
        .from("binder_slots")
        .update({
            user_card_id: null,
            updated_at: new Date().toISOString(),
        })
        .eq("id", slotId);

    if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, slotId });
}
