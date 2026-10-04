import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

export async function getServerUser(): Promise<{ user: User | null; supabase: Awaited<ReturnType<typeof createClient>> }> {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return { user, supabase };
}
