import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

export async function getAuthenticatedUser(request?: Request) {
    const supabase = await createClient();

    if (process.env.NODE_ENV === "test") {
        const testUserId = request?.headers.get("x-test-user-id");
        if (testUserId) {
            return {
                user: { id: testUserId, email: "test@example.com" } as unknown as User,
                supabase,
                response: null,
            };
        }
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
