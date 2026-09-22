import { NextResponse, type NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth";

const DEFAULT_SETTINGS = {
    theme_color: "#ef4444",
    sound_enabled: true,
};

const HEX_COLOR_REGEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export async function GET(request: NextRequest) {
    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }
    const { user, supabase } = auth;

    const { data, error } = await supabase.from("user_settings").select("*").eq("user_id", user.id).maybeSingle();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
        return NextResponse.json({
            settings: {
                user_id: user.id,
                ...DEFAULT_SETTINGS,
            },
        });
    }

    return NextResponse.json({ settings: data });
}

export async function PATCH(request: NextRequest) {
    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }
    const { user, supabase } = auth;

    try {
        const body = await request.json();
        const updates: {
            user_id: string;
            theme_color?: string;
            sound_enabled?: boolean;
            updated_at: string;
        } = {
            user_id: user.id,
            updated_at: new Date().toISOString(),
        };

        if (typeof body.theme_color === "string") {
            const trimmedColor = body.theme_color.trim();
            if (HEX_COLOR_REGEX.test(trimmedColor)) {
                updates.theme_color = trimmedColor;
            } else {
                return NextResponse.json({ error: "Cor inválida. Use o formato hexadecimal (#RRGGBB)." }, { status: 400 });
            }
        }

        if (typeof body.sound_enabled === "boolean") {
            updates.sound_enabled = body.sound_enabled;
        }

        const { data, error } = await supabase.from("user_settings").upsert(updates, { onConflict: "user_id" }).select().single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ settings: data });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Erro interno";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
