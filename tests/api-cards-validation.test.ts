import { describe, it, expect } from "bun:test";
import { NextRequest } from "next/server";
import { POST as postCard, GET as getCards } from "../src/app/api/cards/route";
import { GET as getExpansions } from "../src/app/api/cards/expansions/route";
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

    it("should return 400 for POST with card_set_name or card_rarity exceeding 100 characters", async () => {
        const requestTooLongSet = new NextRequest("http://localhost:3000/api/cards", {
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
                card_language: "en",
                card_set_name: "A".repeat(101),
            }),
        });
        const resSet = await postCard(requestTooLongSet);
        expect(resSet.status).toBe(400);

        const requestTooLongRarity = new NextRequest("http://localhost:3000/api/cards", {
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
                card_language: "en",
                card_rarity: "B".repeat(101),
            }),
        });
        const resRarity = await postCard(requestTooLongRarity);
        expect(resRarity.status).toBe(400);
    });

    it("should return 400 when card_name does not match pokemon_dex_id", async () => {
        const req = new NextRequest("http://localhost:3000/api/cards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-test-user-id": "test-user-id",
            },
            body: JSON.stringify({
                tcgdex_card_id: "basep-3",
                pokemon_dex_id: 151,
                card_name: "Mewtwo",
                card_image_url: "https://assets.tcgdex.net/en/base/basep/3/high.webp",
                card_language: "en",
            }),
        });
        const res = await postCard(req);
        expect(res.status).toBe(400);

        const json = await res.json();
        expect(json.error).toBe("A carta selecionada não corresponde ao Pokémon indicado");
    });

    it("should return 400 for invalid elemental card types", async () => {
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
                card_language: "en",
                card_types: ["Plant"],
            }),
        });
        const response = await postCard(request);
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json.error).toBe("Tipos elementais inválidos");
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

    it("should return 400 for GET grouped cards with invalid pagination params", async () => {
        const reqBadPage = new NextRequest("http://localhost:3000/api/cards?grouped=true&page=0", {
            headers: { "x-test-user-id": "test-user-id" },
        });
        const resBadPage = await getCards(reqBadPage);
        expect(resBadPage.status).toBe(400);

        const reqBadLimit = new NextRequest("http://localhost:3000/api/cards?grouped=true&limit=150", {
            headers: { "x-test-user-id": "test-user-id" },
        });
        const resBadLimit = await getCards(reqBadLimit);
        expect(resBadLimit.status).toBe(400);
    });

    it("should return 400 for GET grouped cards with invalid filter whitelists", async () => {
        const reqStatus = new NextRequest("http://localhost:3000/api/cards?grouped=true&status=invalid", {
            headers: { "x-test-user-id": "test-user-id" },
        });
        const resStatus = await getCards(reqStatus);
        expect(resStatus.status).toBe(400);

        const reqLang = new NextRequest("http://localhost:3000/api/cards?grouped=true&language=es", {
            headers: { "x-test-user-id": "test-user-id" },
        });
        const resLang = await getCards(reqLang);
        expect(resLang.status).toBe(400);

        const reqSort = new NextRequest("http://localhost:3000/api/cards?grouped=true&sort=invalid", {
            headers: { "x-test-user-id": "test-user-id" },
        });
        const resSort = await getCards(reqSort);
        expect(resSort.status).toBe(400);

        const reqDir = new NextRequest("http://localhost:3000/api/cards?grouped=true&direction=diagonal", {
            headers: { "x-test-user-id": "test-user-id" },
        });
        const resDir = await getCards(reqDir);
        expect(resDir.status).toBe(400);

        const reqLongSearch = new NextRequest(`http://localhost:3000/api/cards?grouped=true&search=${"a".repeat(101)}`, {
            headers: { "x-test-user-id": "test-user-id" },
        });
        const resLongSearch = await getCards(reqLongSearch);
        expect(resLongSearch.status).toBe(400);
    });

    it("should validate authentication on expansions route", async () => {
        const reqUnauth = new NextRequest("http://localhost:3000/api/cards/expansions");
        const resUnauth = await getExpansions(reqUnauth);
        expect(resUnauth.status).toBe(401);
    });
});
