import { NextResponse, type NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth";
import { cardCopyGroupKey } from "@/lib/pokemon/variant";

const MAX_IDS = 100;
const MAX_ID_LENGTH = 100;

export async function GET(request: NextRequest) {
    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }
    const { user, supabase } = auth;

    const idsParam = request.nextUrl.searchParams.get("ids");
    if (!idsParam || !idsParam.trim()) {
        return NextResponse.json({ error: "Informe as cartas consultadas" }, { status: 400 });
    }

    const ids = [
        ...new Set(
            idsParam
                .split(",")
                .map((value) => value.trim())
                .filter(Boolean),
        ),
    ];

    if (ids.length === 0) {
        return NextResponse.json({ error: "Nenhuma carta informada" }, { status: 400 });
    }

    if (ids.length > MAX_IDS) {
        return NextResponse.json({ error: `Máximo de ${MAX_IDS} cartas por consulta` }, { status: 400 });
    }

    if (ids.some((id) => id.length > MAX_ID_LENGTH)) {
        return NextResponse.json({ error: "Identificador de carta inválido" }, { status: 400 });
    }

    const { data, error } = await supabase.from("user_cards").select("tcgdex_card_id, card_language, card_variant, card_condition").eq("user_id", user.id).in("tcgdex_card_id", ids);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const counts: Record<string, number> = {};
    for (const row of data ?? []) {
        const key = cardCopyGroupKey({
            tcgdex_card_id: row.tcgdex_card_id,
            card_language: row.card_language,
            card_variant: row.card_variant,
            card_condition: row.card_condition,
        });
        counts[key] = (counts[key] ?? 0) + 1;
    }

    return NextResponse.json({ counts });
}
