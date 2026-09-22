import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth";
import { ALL_CARD_VARIANTS, isCardVariant } from "@/lib/pokemon/variant";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!UUID_REGEX.test(id)) {
        return NextResponse.json({ error: "ID de carta inválido" }, { status: 400 });
    }

    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }
    const { user, supabase } = auth;

    const { data: card, error } = await supabase.from("user_cards").select("*").eq("id", id).eq("user_id", user.id).maybeSingle();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!card) {
        return NextResponse.json({ error: "Carta não encontrada" }, { status: 404 });
    }

    const cardVariant = isCardVariant(card.card_variant) ? card.card_variant : "normal";

    const { data: copies, error: copiesError } = await supabase.from("user_cards").select("*").eq("user_id", user.id).eq("tcgdex_card_id", card.tcgdex_card_id).eq("card_language", card.card_language).eq("card_variant", cardVariant).order("created_at", { ascending: true });

    if (copiesError) {
        return NextResponse.json({ error: copiesError.message }, { status: 500 });
    }

    return NextResponse.json({ card, copies: copies ?? [card], availableVariants: ALL_CARD_VARIANTS });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!UUID_REGEX.test(id)) {
        return NextResponse.json({ error: "ID de carta inválido" }, { status: 400 });
    }

    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }
    const { user, supabase } = auth;

    try {
        const body = await request.json();
        const updatePayload: {
            is_in_binder?: boolean;
            card_language?: string;
            card_variant?: string;
        } = {};

        if (typeof body.card_language === "string") {
            const validLanguages = ["pt-br", "en", "ja"];
            const lang = body.card_language.toLowerCase();
            if (!validLanguages.includes(lang)) {
                return NextResponse.json({ error: "Idioma inválido" }, { status: 400 });
            }
            updatePayload.card_language = lang;
        }

        if (typeof body.card_variant === "string") {
            const variant = body.card_variant.toLowerCase();
            if (!isCardVariant(variant)) {
                return NextResponse.json({ error: "Versão inválida" }, { status: 400 });
            }
            updatePayload.card_variant = variant;
        }

        if (typeof body.is_in_binder === "boolean") {
            updatePayload.is_in_binder = body.is_in_binder;
        }

        if (Object.keys(updatePayload).length === 0) {
            const { data: currentCard, error: currentError } = await supabase.from("user_cards").select("*").eq("id", id).eq("user_id", user.id).maybeSingle();

            if (currentError || !currentCard) {
                return NextResponse.json({ error: "Carta não encontrada" }, { status: 404 });
            }
            return NextResponse.json({ card: currentCard });
        }

        if (updatePayload.is_in_binder === true) {
            const { error: rpcError } = await supabase.rpc("set_card_in_binder", {
                p_card_id: id,
            });

            if (rpcError) {
                return NextResponse.json({ error: rpcError.message }, { status: 500 });
            }

            const { is_in_binder: _, ...otherUpdates } = updatePayload;
            if (Object.keys(otherUpdates).length > 0) {
                const { data: updatedCard, error: updateError } = await supabase.from("user_cards").update(otherUpdates).eq("id", id).eq("user_id", user.id).select().single();

                if (updateError) {
                    return NextResponse.json({ error: updateError.message }, { status: 500 });
                }

                return NextResponse.json({ card: updatedCard });
            }

            const { data: updatedCard, error: selectError } = await supabase.from("user_cards").select().eq("id", id).eq("user_id", user.id).single();

            if (selectError) {
                return NextResponse.json({ error: selectError.message }, { status: 500 });
            }

            return NextResponse.json({ card: updatedCard });
        }

        const { data: updatedCard, error: updateError } = await supabase.from("user_cards").update(updatePayload).eq("id", id).eq("user_id", user.id).select().maybeSingle();

        if (updateError) {
            return NextResponse.json({ error: updateError.message }, { status: 500 });
        }

        if (!updatedCard) {
            return NextResponse.json({ error: "Carta não encontrada" }, { status: 404 });
        }

        return NextResponse.json({ card: updatedCard });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Erro interno";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!UUID_REGEX.test(id)) {
        return NextResponse.json({ error: "ID de carta inválido" }, { status: 400 });
    }

    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }
    const { user, supabase } = auth;

    const { error } = await supabase.from("user_cards").delete().eq("id", id).eq("user_id", user.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
