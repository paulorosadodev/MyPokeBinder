import { describe, it, expect } from "bun:test";
import { GET } from "../src/app/api/search/route";
import { formatTcgdexImageUrl, isPocketCard } from "../src/lib/pokemon/tcgdex";
import { NextRequest } from "next/server";

describe("formatTcgdexImageUrl", () => {
    it("should handle empty or null values", () => {
        expect(formatTcgdexImageUrl(null)).toBe("");
        expect(formatTcgdexImageUrl(undefined)).toBe("");
        expect(formatTcgdexImageUrl("")).toBe("");
        expect(formatTcgdexImageUrl("   ")).toBe("");
    });

    it("should append /high.webp to raw URLs without extension", () => {
        expect(formatTcgdexImageUrl("https://assets.tcgdex.net/pt-br/tcgp/A1/002")).toBe("https://assets.tcgdex.net/pt-br/tcgp/A1/002/high.webp");
        expect(formatTcgdexImageUrl("https://assets.tcgdex.net/en/sv/sv03.5/002/")).toBe("https://assets.tcgdex.net/en/sv/sv03.5/002/high.webp");
    });

    it("should allow low quality option", () => {
        expect(formatTcgdexImageUrl("https://assets.tcgdex.net/pt-br/tcgp/A1/002", "low")).toBe("https://assets.tcgdex.net/pt-br/tcgp/A1/002/low.webp");
    });

    it("should not alter URLs that already have image extensions", () => {
        expect(formatTcgdexImageUrl("https://assets.tcgdex.net/pt-br/tcgp/A1/002/high.webp")).toBe("https://assets.tcgdex.net/pt-br/tcgp/A1/002/high.webp");
        expect(formatTcgdexImageUrl("https://assets.tcgdex.net/pt-br/tcgp/A1/002/high.png")).toBe("https://assets.tcgdex.net/pt-br/tcgp/A1/002/high.png");
    });
});

describe("isPocketCard", () => {
    it("should return false for null, undefined or empty input", () => {
        expect(isPocketCard(null)).toBe(false);
        expect(isPocketCard(undefined)).toBe(false);
        expect(isPocketCard({})).toBe(false);
    });

    it("should return true when image contains /tcgp/", () => {
        expect(isPocketCard({ image: "https://assets.tcgdex.net/pt-br/tcgp/A1/001" })).toBe(true);
        expect(isPocketCard({ image: "https://assets.tcgdex.net/en/tcgp/P-A/023/high.webp" })).toBe(true);
    });

    it("should return true when id belongs to pocket sets", () => {
        expect(isPocketCard({ id: "A1-001" })).toBe(true);
        expect(isPocketCard({ id: "A1a-010" })).toBe(true);
        expect(isPocketCard({ id: "A2-005" })).toBe(true);
        expect(isPocketCard({ id: "P-A-023" })).toBe(true);
        expect(isPocketCard({ id: "B1-001" })).toBe(true);
    });

    it("should return false for physical cards", () => {
        expect(isPocketCard({ id: "base1-44", image: "https://assets.tcgdex.net/en/base/base1/44" })).toBe(false);
        expect(isPocketCard({ id: "swsh10.5-001", image: "https://assets.tcgdex.net/pt/swsh/swsh10.5/001" })).toBe(false);
        expect(isPocketCard({ id: "sv03.5-001", image: "https://assets.tcgdex.net/pt/sv/sv03.5/001" })).toBe(false);
        expect(isPocketCard({ id: "me01-001", image: "https://assets.tcgdex.net/pt/me/me01/001" })).toBe(false);
    });
});

describe("GET /api/search", () => {
    it("should return 401 when unauthenticated", async () => {
        const request = new NextRequest("http://localhost:3000/api/search?name=Bulbasaur");
        const response = await GET(request);
        expect(response.status).toBe(401);
    });

    it("should return 400 if name is missing when authenticated", async () => {
        const request = new NextRequest("http://localhost:3000/api/search", {
            headers: { "x-test-user-id": "test-user-id" },
        });
        const response = await GET(request);
        expect(response.status).toBe(400);

        const json = await response.json();
        expect(json.error).toBeDefined();
    });

    it("should return 400 if name exceeds 50 characters", async () => {
        const longName = "a".repeat(51);
        const request = new NextRequest(`http://localhost:3000/api/search?name=${longName}`, {
            headers: { "x-test-user-id": "test-user-id" },
        });
        const response = await GET(request);
        expect(response.status).toBe(400);
    });

    it("should return cards exclusively in en with pagination and exclude pocket cards", async () => {
        const request = new NextRequest("http://localhost:3000/api/search?name=Bulbasaur&page=1&pageSize=10", {
            headers: { "x-test-user-id": "test-user-id" },
        });
        const response = await GET(request);
        expect(response.status).toBe(200);

        const json = await response.json();
        expect(Array.isArray(json.cards)).toBe(true);
        expect(json.cards.length).toBeGreaterThan(0);
        expect(json.cards.length).toBeLessThanOrEqual(10);
        expect(typeof json.hasMore).toBe("boolean");
        expect(typeof json.totalCount).toBe("number");
        expect(json.totalCount).toBeGreaterThan(0);

        for (const card of json.cards) {
            expect(card.id).toBeDefined();
            expect(card.name).toBeDefined();
            expect(typeof card.image).toBe("string");
            expect(card.image.endsWith(".webp")).toBe(true);
            expect(isPocketCard(card)).toBe(false);
        }
    }, 15000);

    it("should paginate cards accurately on page 2", async () => {
        const page1Req = new NextRequest("http://localhost:3000/api/search?name=Pikachu&page=1&pageSize=5", {
            headers: { "x-test-user-id": "test-user-id" },
        });
        const page1Res = await GET(page1Req);
        const page1Json = await page1Res.json();

        const page2Req = new NextRequest("http://localhost:3000/api/search?name=Pikachu&page=2&pageSize=5", {
            headers: { "x-test-user-id": "test-user-id" },
        });
        const page2Res = await GET(page2Req);
        const page2Json = await page2Res.json();

        expect(page1Json.cards.length).toBe(5);
        expect(page2Json.cards.length).toBe(5);
        expect(page1Json.cards[0].id).not.toBe(page2Json.cards[0].id);
        expect(page1Json.hasMore).toBe(true);
    }, 15000);
});
