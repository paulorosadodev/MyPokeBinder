import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
    let cookieStore: Awaited<ReturnType<typeof cookies>> | undefined;

    try {
        cookieStore = await cookies();
    } catch {
        cookieStore = undefined;
    }

    return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)!, {
        cookies: {
            getAll() {
                return cookieStore?.getAll() ?? [];
            },
            setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        cookieStore?.set(name, value, options);
                    });
                } catch {}
            },
        },
    });
}
