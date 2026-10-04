import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

function isLocalSupabaseUrl(): boolean {
    try {
        const { hostname } = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "");
        return hostname === "127.0.0.1" || hostname === "localhost";
    } catch {
        return false;
    }
}

function testUserFrom(request: Request | undefined): User | null {
    if (process.env.MYPOKEBINDER_TEST_AUTH !== "1") return null;
    if (!isLocalSupabaseUrl()) return null;
    const testUserId = request?.headers.get("x-test-user-id");
    if (!testUserId) return null;
    return { id: testUserId, email: "test@example.com" } as unknown as User;
}

export async function getAuthenticatedUser(request?: Request) {
    const supabase = await createClient();

    const testUser = testUserFrom(request);
    if (testUser) {
        return {
            user: testUser,
            supabase,
            response: null,
        };
    }

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return {
            user: null,
            supabase,
            response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
        };
    }

    return {
        user,
        supabase,
        response: null,
    };
}
