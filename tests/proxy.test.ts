import { describe, it, expect } from "bun:test";
import { NextRequest } from "next/server";
import { updateSession } from "../src/lib/supabase/proxy";

describe("Proxy Session and Route Protection", () => {
    it("should return 401 JSON for unauthenticated /api requests", async () => {
        const request = new NextRequest("http://localhost:3000/api/cards");
        const response = await updateSession(request);
        expect(response.status).toBe(401);
        const json = await response.json();
        expect(json.error).toBe("Unauthorized");
    });

    it("should redirect unauthenticated page requests to /login", async () => {
        const request = new NextRequest("http://localhost:3000/dashboard");
        const response = await updateSession(request);
        expect(response.status).toBe(307);
        expect(response.headers.get("location")).toBe("http://localhost:3000/login");
    });

    it("should allow public login route without redirecting", async () => {
        const request = new NextRequest("http://localhost:3000/login");
        const response = await updateSession(request);
        expect(response.status).toBe(200);
    });
});
