import { describe, it, expect } from "bun:test";
import { NextRequest } from "next/server";
import { GET as getBinders, POST as postBinder } from "../src/app/api/binders/route";

describe("Binders API", () => {
    it("should return 401 for GET /api/binders without authentication", async () => {
        const req = new NextRequest("http://localhost:3000/api/binders", {
            method: "GET",
        });
        const res = await getBinders(req);
        expect(res.status).toBe(401);
    });

    it("should return 401 for POST /api/binders without authentication", async () => {
        const req = new NextRequest("http://localhost:3000/api/binders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Meu Binder" }),
        });
        const res = await postBinder(req);
        expect(res.status).toBe(401);
    });

    it("should return 400 for POST /api/binders with empty or whitespace name", async () => {
        const req = new NextRequest("http://localhost:3000/api/binders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-test-user-id": "test-user-id",
            },
            body: JSON.stringify({
                name: "   ",
                grid_type: "3x3",
                total_pages: 10,
            }),
        });
        const res = await postBinder(req);
        expect(res.status).toBe(400);

        const data = await res.json();
        expect(data.error).toContain("nome do binder é obrigatório");
    });

    it("should return 400 for POST /api/binders with invalid grid_type", async () => {
        const req = new NextRequest("http://localhost:3000/api/binders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-test-user-id": "test-user-id",
            },
            body: JSON.stringify({
                name: "Meu Binder",
                grid_type: "4x4",
                total_pages: 10,
            }),
        });
        const res = await postBinder(req);
        expect(res.status).toBe(400);

        const data = await res.json();
        expect(data.error).toContain("Grid inválido");
    });

    it("should return 400 for POST /api/binders with invalid total_pages", async () => {
        const reqUnder = new NextRequest("http://localhost:3000/api/binders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-test-user-id": "test-user-id",
            },
            body: JSON.stringify({
                name: "Meu Binder",
                grid_type: "3x3",
                total_pages: 0,
            }),
        });
        const resUnder = await postBinder(reqUnder);
        expect(resUnder.status).toBe(400);

        const reqOver = new NextRequest("http://localhost:3000/api/binders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-test-user-id": "test-user-id",
            },
            body: JSON.stringify({
                name: "Meu Binder",
                grid_type: "3x3",
                total_pages: 51,
            }),
        });
        const resOver = await postBinder(reqOver);
        expect(resOver.status).toBe(400);
    });

    it("should return 400 for POST /api/binders with description exceeding 200 chars", async () => {
        const req = new NextRequest("http://localhost:3000/api/binders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-test-user-id": "test-user-id",
            },
            body: JSON.stringify({
                name: "Meu Binder",
                description: "a".repeat(201),
                grid_type: "3x3",
                total_pages: 10,
            }),
        });
        const res = await postBinder(req);
        expect(res.status).toBe(400);

        const data = await res.json();
        expect(data.error).toContain("200 caracteres");
    });

    it("should return 400 for POST /api/binders with invalid cover Pokémon", async () => {
        const req = new NextRequest("http://localhost:3000/api/binders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-test-user-id": "test-user-id",
            },
            body: JSON.stringify({
                name: "Meu Binder",
                grid_type: "3x3",
                total_pages: 10,
                cover_pokemon_dex_id: 1026,
            }),
        });
        const res = await postBinder(req);

        expect(res.status).toBe(400);
        expect((await res.json()).error).toContain("Pokémon da capa inválido");
    });
});
