import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

export async function getServerUser(): Promise<{ user: User | null; supabase: Awaited<ReturnType<typeof createClient>> }> {
    const supabase = await createClient();
    try {
        const reqHeaders = await headers();
        const userId = reqHeaders.get("x-user-id");
        if (userId) {
            const email = reqHeaders.get("x-user-email") || undefined;
            return {
                user: { id: userId, email } as unknown as User,
                supabase,
            };
        }
    } catch {}

    const {
        data: { user },
    } = await supabase.auth.getUser();
    return { user, supabase };
}
