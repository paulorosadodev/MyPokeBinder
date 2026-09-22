import { describe, it, expect } from "bun:test";
import { NextRequest } from "next/server";
import { updateSession } from "../src/lib/supabase/proxy";

describe("Public Routes and Google Cloud Consent Pages", () => {
    it("should allow root homepage / without redirecting to login", async () => {
        const request = new NextRequest("http://localhost:3000/");
        const response = await updateSession(request);
        expect(response.status).toBe(200);
        expect(response.headers.get("location")).toBeNull();
    });

    it("should allow /inicio route without redirecting to login", async () => {
        const request = new NextRequest("http://localhost:3000/inicio");
        const response = await updateSession(request);
        expect(response.status).toBe(200);
        expect(response.headers.get("location")).toBeNull();
    });

    it("should allow /privacidade route without redirecting to login", async () => {
        const request = new NextRequest("http://localhost:3000/privacidade");
        const response = await updateSession(request);
        expect(response.status).toBe(200);
        expect(response.headers.get("location")).toBeNull();
    });

    it("should allow /privacy alias route without redirecting to login", async () => {
        const request = new NextRequest("http://localhost:3000/privacy");
        const response = await updateSession(request);
        expect(response.status).toBe(200);
        expect(response.headers.get("location")).toBeNull();
    });

    it("should allow /termos route without redirecting to login", async () => {
        const request = new NextRequest("http://localhost:3000/termos");
        const response = await updateSession(request);
        expect(response.status).toBe(200);
        expect(response.headers.get("location")).toBeNull();
    });

    it("should allow /terms alias route without redirecting to login", async () => {
        const request = new NextRequest("http://localhost:3000/terms");
        const response = await updateSession(request);
        expect(response.status).toBe(200);
        expect(response.headers.get("location")).toBeNull();
    });

    it("should still protect private routes like /collection and redirect to /login", async () => {
        const request = new NextRequest("http://localhost:3000/collection");
        const response = await updateSession(request);
        expect(response.status).toBe(307);
        expect(response.headers.get("location")).toBe("http://localhost:3000/login");
    });

    it("should still protect private routes like /configuracoes and redirect to /login", async () => {
        const request = new NextRequest("http://localhost:3000/configuracoes");
        const response = await updateSession(request);
        expect(response.status).toBe(307);
        expect(response.headers.get("location")).toBe("http://localhost:3000/login");
    });

    it("should still protect private routes like /perfil and redirect to /login", async () => {
        const request = new NextRequest("http://localhost:3000/perfil");
        const response = await updateSession(request);
        expect(response.status).toBe(307);
        expect(response.headers.get("location")).toBe("http://localhost:3000/login");
    });
});
