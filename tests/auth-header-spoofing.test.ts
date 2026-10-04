import { describe, it, expect, afterEach } from "bun:test";
import { NextRequest } from "next/server";
import { GET as getDashboard } from "../src/app/api/dashboard/route";
import { GET as getBinders } from "../src/app/api/binders/route";
import { DELETE as deleteAccount } from "../src/app/api/account/route";
import { GET as getProfile } from "../src/app/api/profile/route";
import { getAuthenticatedUser } from "../src/lib/supabase/auth";

const VICTIM_ID = "4eb109d2-729e-4d73-ab5b-af02f65803a7";
const originalTestAuth = process.env.MYPOKEBINDER_TEST_AUTH;
const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

afterEach(() => {
    if (originalTestAuth === undefined) delete process.env.MYPOKEBINDER_TEST_AUTH;
    else process.env.MYPOKEBINDER_TEST_AUTH = originalTestAuth;

    if (originalUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    else process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
});

function spoofedHeaders(): Record<string, string> {
    return {
        "Content-Type": "application/json",
        "x-user-id": VICTIM_ID,
        "x-user-email": "victim@example.com",
    };
}

describe("Identity header spoofing is rejected", () => {
    it("ignores a forged x-user-id header and returns 401", async () => {
        const request = new NextRequest("http://localhost:3000/api/dashboard", {
            method: "GET",
            headers: spoofedHeaders(),
        });
        expect((await getDashboard(request)).status).toBe(401);
    });

    it("ignores a forged x-user-id header on binder routes", async () => {
        const request = new NextRequest("http://localhost:3000/api/binders", {
            method: "GET",
            headers: spoofedHeaders(),
        });
        expect((await getBinders(request)).status).toBe(401);
    });

    it("ignores a forged x-user-id header on the profile route", async () => {
        const request = new NextRequest("http://localhost:3000/api/profile", {
            method: "GET",
            headers: spoofedHeaders(),
        });
        expect((await getProfile(request)).status).toBe(401);
    });

    it("does not let a forged identity reach the service role account deletion", async () => {
        const request = new NextRequest("http://localhost:3000/api/account", {
            method: "DELETE",
            headers: spoofedHeaders(),
            body: JSON.stringify({ confirm: "EXCLUIR" }),
        });
        const response = await deleteAccount(request);
        expect(response.status).toBe(401);
        expect(await response.text()).not.toContain("ok");
    });

    it("ignores x-test-user-id when the test auth gate is disabled", async () => {
        delete process.env.MYPOKEBINDER_TEST_AUTH;
        const auth = await getAuthenticatedUser(new Request("http://localhost:3000/api/dashboard", { headers: { "x-test-user-id": "attacker" } }));
        expect(auth.user).toBeNull();
        expect(auth.response?.status).toBe(401);
    });

    it("ignores x-test-user-id when the Supabase URL is not local", async () => {
        process.env.MYPOKEBINDER_TEST_AUTH = "1";
        process.env.NEXT_PUBLIC_SUPABASE_URL = "https://cauuttzkxcmqwlsfoeib.supabase.co";
        const auth = await getAuthenticatedUser(new Request("http://localhost:3000/api/dashboard", { headers: { "x-test-user-id": "attacker" } }));
        expect(auth.user).toBeNull();
        expect(auth.response?.status).toBe(401);
    });

    it("never derives identity from request headers", async () => {
        const auth = await getAuthenticatedUser(new Request("http://localhost:3000/api/dashboard", { headers: spoofedHeaders() }));
        expect(auth.user?.id).not.toBe(VICTIM_ID);
    });
});
