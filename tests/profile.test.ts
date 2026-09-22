import { describe, it, expect } from "bun:test";
import { GET as getProfile } from "../src/app/api/profile/route";
import { getRarityScore, getRarityImpactTier, getRarityBadgeStyle } from "../src/lib/pokemon/rarity";

describe("Profile API and Rarity Sorting Logic", () => {
    it("GET /api/profile should return 401 when unauthenticated", async () => {
        const response = await getProfile(new Request("http://localhost:3000/api/profile") as any);
        expect(response.status).toBe(401);
    });

    it("should score rarities in correct descending order", () => {
        const sirScore = getRarityScore("Special Illustration Rare");
        const irScore = getRarityScore("Illustration Rare");
        const urScore = getRarityScore("Ultra Rare");
        const rareHoloScore = getRarityScore("Rare Holo");
        const rareScore = getRarityScore("Rare");
        const uncommonScore = getRarityScore("Uncommon");
        const commonScore = getRarityScore("Common");

        expect(sirScore).toBeGreaterThan(irScore);
        expect(irScore).toBeGreaterThan(urScore);
        expect(urScore).toBeGreaterThan(rareHoloScore);
        expect(rareHoloScore).toBeGreaterThan(rareScore);
        expect(rareScore).toBeGreaterThan(uncommonScore);
        expect(uncommonScore).toBeGreaterThan(commonScore);
    });

    it("should correctly identify rarity impact tiers", () => {
        expect(getRarityImpactTier("Special Illustration Rare")).toBe(3);
        expect(getRarityImpactTier("Illustration Rare")).toBe(2);
        expect(getRarityImpactTier("Hyper Rare")).toBe(3);
        expect(getRarityImpactTier("Secret Rare")).toBe(3);
        expect(getRarityImpactTier("Ultra Rare")).toBe(2);
        expect(getRarityImpactTier("Common")).toBe(0);
        expect(getRarityImpactTier("Uncommon")).toBe(0);
        expect(getRarityImpactTier("Double Rare")).toBe(1);
    });

    it("should sort mock user cards by rarity score descending and deduplicate by edition", () => {
        const mockCards = [
            {
                id: "c1",
                tcgdex_card_id: "me-001",
                pokemon_dex_id: 1,
                card_name: "Bulbasaur",
                card_rarity: "Common",
                created_at: "2026-01-01",
            },
            {
                id: "c2",
                tcgdex_card_id: "me-001",
                pokemon_dex_id: 1,
                card_name: "Bulbasaur",
                card_rarity: "Common",
                created_at: "2026-01-02",
            },
            {
                id: "c3",
                tcgdex_card_id: "me-198",
                pokemon_dex_id: 6,
                card_name: "Charizard ex",
                card_rarity: "Special Illustration Rare",
                created_at: "2026-01-03",
            },
            {
                id: "c4",
                tcgdex_card_id: "me-166",
                pokemon_dex_id: 1,
                card_name: "Bulbasaur",
                card_rarity: "Illustration Rare",
                created_at: "2026-01-04",
            },
        ];

        const sorted = [...mockCards].sort((a, b) => {
            const scoreA = getRarityScore(a.card_rarity);
            const scoreB = getRarityScore(b.card_rarity);
            if (scoreB !== scoreA) return scoreB - scoreA;
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });

        const seenEditions = new Set<string>();
        const deduplicated = sorted.filter((card) => {
            if (seenEditions.has(card.tcgdex_card_id)) return false;
            seenEditions.add(card.tcgdex_card_id);
            return true;
        });

        expect(deduplicated.length).toBe(3);
        expect(deduplicated[0].card_name).toBe("Charizard ex");
        expect(deduplicated[1].card_name).toBe("Bulbasaur");
        expect(deduplicated[1].card_rarity).toBe("Illustration Rare");
        expect(deduplicated[2].card_rarity).toBe("Common");
    });

    it("should provide badge styling for different rarity classifications", () => {
        const sirBadge = getRarityBadgeStyle("Special Illustration Rare");
        expect(sirBadge.tier).toBe(3);
        expect(sirBadge.label).toBe("Special Illustration Rare");

        const commonBadge = getRarityBadgeStyle("Common");
        expect(commonBadge.tier).toBe(0);
        expect(commonBadge.label).toBe("Comum");
    });
});
