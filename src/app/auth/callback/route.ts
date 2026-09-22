import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

function getSafeRedirectPath(rawNext: string | null): string {
    if (!rawNext || !rawNext.startsWith("/") || rawNext.startsWith("//") || rawNext.includes("\\") || rawNext.includes("://")) {
        return "/";
    }
    return rawNext;
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const next = getSafeRedirectPath(searchParams.get("next"));

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = next;
            redirectUrl.search = "";

            const response = NextResponse.redirect(redirectUrl);
            try {
                const { data: userData } = await supabase.auth.getUser();
                if (userData.user) {
                    const avatarUrl = userData.user.user_metadata?.avatar_url || userData.user.user_metadata?.picture || null;

                    await supabase
                        .from("profiles")
                        .update({
                            avatar_url: avatarUrl,
                            updated_at: new Date().toISOString(),
                        })
                        .eq("id", userData.user.id);

                    const { data: settings } = await supabase.from("user_settings").select("theme_color").eq("user_id", userData.user.id).maybeSingle();
                    if (settings?.theme_color) {
                        await supabase.from("profiles").update({ theme_color: settings.theme_color }).eq("id", userData.user.id);
                        response.cookies.set("mypokebinder_theme_color", settings.theme_color, {
                            path: "/",
                            maxAge: 31536000,
                            sameSite: "lax",
                        });
                    }
                }
            } catch {}

            return response;
        }
    }

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.search = "error=auth_failed";
    return NextResponse.redirect(redirectUrl);
}
