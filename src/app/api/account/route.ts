import { NextResponse, type NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth";
import { createAdminClient } from "@/lib/supabase/admin";

const CONFIRMATION_PHRASE = "EXCLUIR";

export async function DELETE(request: NextRequest) {
    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }

    const { user } = auth;

    let body: { confirm?: unknown } = {};
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Confirmação inválida." }, { status: 400 });
    }

    if (typeof body.confirm !== "string" || body.confirm.trim().toUpperCase() !== CONFIRMATION_PHRASE) {
        return NextResponse.json({ error: "Digite EXCLUIR para confirmar." }, { status: 400 });
    }

    try {
        const admin = createAdminClient();
        const { error } = await admin.auth.admin.deleteUser(user.id);

        if (error) {
            console.error("[DELETE /api/account]", error.message);
            return NextResponse.json({ error: "Não foi possível excluir a conta." }, { status: 500 });
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("[DELETE /api/account]", err);
        return NextResponse.json({ error: "Não foi possível excluir a conta." }, { status: 500 });
    }
}
