import { describe, it, expect } from "bun:test";
import { NextRequest } from "next/server";
import { POST as postCard } from "../src/app/api/cards/route";
import { PATCH as patchCard, DELETE as deleteCard, GET as getCard } from "../src/app/api/cards/[id]/route";

describe("Cards API Validation", () => {
    it("should return 401 for unauthenticated request without session", async () => {
        const request = new NextRequest("http://localhost:3000/api/cards", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                tcgdex_card_id: "test",
            }),
        });
        const response = await postCard(request);
        expect(response.status).toBe(401);
    });

    it("should return 400 for POST with invalid card_language", async () => {
        const request = new NextRequest("http://localhost:3000/api/cards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-test-user-id": "test-user-id",
            },
            body: JSON.stringify({
                tcgdex_card_id: "base1-44",
                pokemon_dex_id: 1,
                card_name: "Bulbasaur",
                card_image_url: "https://assets.tcgdex.net/en/base/base1/44/high.webp",
                card_language: "fr",
            }),
        });
        const response = await postCard(request);
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json.error).toBe("Idioma inválido");
    });

    it("should return 400 for POST with pocket card", async () => {
        const request = new NextRequest("http://localhost:3000/api/cards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-test-user-id": "test-user-id",
            },
            body: JSON.stringify({
                tcgdex_card_id: "A1-001",
                pokemon_dex_id: 1,
                card_name: "Bulbasaur",
                card_image_url: "https://assets.tcgdex.net/pt-br/tcgp/A1/001",
                card_language: "pt-br",
            }),
        });
        const response = await postCard(request);
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json.error).toBe("Cartas do Pokémon TCG Pocket não são permitidas");
    });

    it("should return 400 for POST with invalid pokemon_dex_id", async () => {
        const request = new NextRequest("http://localhost:3000/api/cards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-test-user-id": "test-user-id",
            },
            body: JSON.stringify({
                tcgdex_card_id: "base1-44",
                pokemon_dex_id: 152,
                card_name: "Chikorita",
                card_image_url: "https://assets.tcgdex.net/en/base/base1/44/high.webp",
                card_language: "en",
            }),
        });
        const response = await postCard(request);
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json.error).toBe("Campos obrigatórios ausentes ou inválidos");
    });

    it("should return 400 for GET with invalid UUID", async () => {
        const request = new Request("http://localhost:3000/api/cards/not-a-uuid");
        const response = await getCard(request, { params: Promise.resolve({ id: "not-a-uuid" }) });
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json.error).toBe("ID de carta inválido");
    });

    it("should return 400 for PATCH with invalid UUID", async () => {
        const request = new Request("http://localhost:3000/api/cards/not-a-uuid", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ card_language: "ja" }),
        });
        const response = await patchCard(request, { params: Promise.resolve({ id: "not-a-uuid" }) });
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json.error).toBe("ID de carta inválido");
    });

    it("should return 400 for DELETE with invalid UUID", async () => {
        const request = new Request("http://localhost:3000/api/cards/123-invalid", {
            method: "DELETE",
        });
        const response = await deleteCard(request, { params: Promise.resolve({ id: "123-invalid" }) });
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json.error).toBe("ID de carta inválido");
    });
});
