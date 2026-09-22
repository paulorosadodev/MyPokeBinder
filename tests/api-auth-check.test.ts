import { describe, it, expect } from "bun:test";
import { NextRequest } from "next/server";
import { GET as getBinder } from "../src/app/api/binder/route";
import { GET as getCards, POST as postCard } from "../src/app/api/cards/route";
import { PATCH as patchCard, DELETE as deleteCard, GET as getCard } from "../src/app/api/cards/[id]/route";
import { GET as getDashboard } from "../src/app/api/dashboard/route";
import { GET as getSearch } from "../src/app/api/search/route";
import { GET as getSettings, PATCH as patchSettings } from "../src/app/api/settings/route";

describe("Protected API Routes Unauthenticated Checks", () => {
    it("GET /api/binder should return 401 when unauthenticated", async () => {
        const response = await getBinder(new Request("http://localhost:3000/api/binder"));
        expect(response.status).toBe(401);
    });

    it("GET /api/cards should return 401 when unauthenticated", async () => {
        const request = new NextRequest("http://localhost:3000/api/cards");
        const response = await getCards(request);
        expect(response.status).toBe(401);
    });

    it("POST /api/cards should return 401 when unauthenticated", async () => {
        const request = new NextRequest("http://localhost:3000/api/cards", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                tcgdex_card_id: "test-card",
                pokemon_dex_id: 1,
                card_name: "Bulbasaur",
                card_image_url: "https://example.com/card.png",
            }),
        });
        const response = await postCard(request);
        expect(response.status).toBe(401);
    });

    it("GET /api/cards/[id] should return 401 when unauthenticated", async () => {
        const request = new Request("http://localhost:3000/api/cards/11111111-1111-4111-8111-111111111111");
        const response = await getCard(request, { params: Promise.resolve({ id: "11111111-1111-4111-8111-111111111111" }) });
        expect(response.status).toBe(401);
    });

    it("PATCH /api/cards/[id] should return 401 when unauthenticated", async () => {
        const request = new Request("http://localhost:3000/api/cards/11111111-1111-4111-8111-111111111111", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ card_language: "ja" }),
        });
        const response = await patchCard(request, { params: Promise.resolve({ id: "11111111-1111-4111-8111-111111111111" }) });
        expect(response.status).toBe(401);
    });

    it("DELETE /api/cards/[id] should return 401 when unauthenticated", async () => {
        const request = new Request("http://localhost:3000/api/cards/11111111-1111-4111-8111-111111111111", {
            method: "DELETE",
        });
        const response = await deleteCard(request, { params: Promise.resolve({ id: "11111111-1111-4111-8111-111111111111" }) });
        expect(response.status).toBe(401);
    });

    it("GET /api/dashboard should return 401 when unauthenticated", async () => {
        const response = await getDashboard(new Request("http://localhost:3000/api/dashboard"));
        expect(response.status).toBe(401);
    });

    it("GET /api/search should return 401 when unauthenticated", async () => {
        const request = new NextRequest("http://localhost:3000/api/search?name=Bulbasaur");
        const response = await getSearch(request);
        expect(response.status).toBe(401);
    });

    it("GET /api/settings should return 401 when unauthenticated", async () => {
        const request = new NextRequest("http://localhost:3000/api/settings");
        const response = await getSettings(request);
        expect(response.status).toBe(401);
    });

    it("PATCH /api/settings should return 401 when unauthenticated", async () => {
        const request = new NextRequest("http://localhost:3000/api/settings", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ theme_color: "#ef4444" }),
        });
        const response = await patchSettings(request);
        expect(response.status).toBe(401);
    });
});
