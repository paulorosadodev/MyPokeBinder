import { describe, it, expect } from "bun:test";
import { UserCard, CollectionCardGroup } from "../src/types/binder";
import { cardCopyGroupKey } from "../src/lib/pokemon/variant";

describe("Collection Card Grouping Logic", () => {
    it("should group cards that are 100% identical in edition, language and variant", () => {
        const mockCards: UserCard[] = [
            {
                id: "uuid-1",
                user_id: "user-1",
                pokemon_dex_id: 25,
                tcgdex_card_id: "base1-58",
                card_name: "Pikachu",
                card_image_url: "https://example.com/pika.png",
                card_set_name: "Base Set",
                card_rarity: "Common",
                card_language: "pt-br",
                card_variant: "normal",
                is_in_binder: true,
                created_at: "2026-09-20T10:00:00Z",
                updated_at: "2026-09-20T10:00:00Z",
            },
            {
                id: "uuid-2",
                user_id: "user-1",
                pokemon_dex_id: 25,
                tcgdex_card_id: "base1-58",
                card_name: "Pikachu",
                card_image_url: "https://example.com/pika.png",
                card_set_name: "Base Set",
                card_rarity: "Common",
                card_language: "pt-br",
                card_variant: "normal",
                is_in_binder: false,
                created_at: "2026-09-20T10:05:00Z",
                updated_at: "2026-09-20T10:05:00Z",
            },
        ];

        const groupsMap = new Map<string, CollectionCardGroup>();
        mockCards.forEach((c) => {
            const groupKey = cardCopyGroupKey(c);
            const existing = groupsMap.get(groupKey);

            if (existing) {
                existing.copies.push(c);
                existing.totalCount += 1;
                if (c.is_in_binder) existing.hasInBinder = true;
            } else {
                groupsMap.set(groupKey, {
                    key: groupKey,
                    card: c,
                    copies: [c],
                    totalCount: 1,
                    hasInBinder: Boolean(c.is_in_binder),
                });
            }
        });

        const groups = Array.from(groupsMap.values());
        expect(groups.length).toBe(1);
        expect(groups[0].totalCount).toBe(2);
        expect(groups[0].hasInBinder).toBe(true);
        expect(groups[0].copies.length).toBe(2);
    });

    it("should separate cards when language, edition or variant differs", () => {
        const mockCards: UserCard[] = [
            {
                id: "uuid-1",
                user_id: "user-1",
                pokemon_dex_id: 6,
                tcgdex_card_id: "base1-4",
                card_name: "Charizard",
                card_image_url: "https://example.com/char.png",
                card_set_name: "Base Set",
                card_rarity: "Rare Holo",
                card_language: "pt-br",
                card_variant: "holo",
                is_in_binder: true,
                created_at: "2026-09-20T10:00:00Z",
                updated_at: "2026-09-20T10:00:00Z",
            },
            {
                id: "uuid-2",
                user_id: "user-1",
                pokemon_dex_id: 6,
                tcgdex_card_id: "base1-4",
                card_name: "Charizard",
                card_image_url: "https://example.com/char.png",
                card_set_name: "Base Set",
                card_rarity: "Rare Holo",
                card_language: "en",
                card_variant: "holo",
                is_in_binder: false,
                created_at: "2026-09-20T10:05:00Z",
                updated_at: "2026-09-20T10:05:00Z",
            },
            {
                id: "uuid-3",
                user_id: "user-1",
                pokemon_dex_id: 6,
                tcgdex_card_id: "me-151",
                card_name: "Charizard ex",
                card_image_url: "https://example.com/char2.png",
                card_set_name: "151",
                card_rarity: "Ultra Rare",
                card_language: "en",
                card_variant: "normal",
                is_in_binder: false,
                created_at: "2026-09-20T10:10:00Z",
                updated_at: "2026-09-20T10:10:00Z",
            },
            {
                id: "uuid-4",
                user_id: "user-1",
                pokemon_dex_id: 6,
                tcgdex_card_id: "base1-4",
                card_name: "Charizard",
                card_image_url: "https://example.com/char.png",
                card_set_name: "Base Set",
                card_rarity: "Rare Holo",
                card_language: "pt-br",
                card_variant: "reverse",
                is_in_binder: false,
                created_at: "2026-09-20T10:15:00Z",
                updated_at: "2026-09-20T10:15:00Z",
            },
        ];

        const groupsMap = new Map<string, CollectionCardGroup>();
        mockCards.forEach((c) => {
            const groupKey = cardCopyGroupKey(c);
            const existing = groupsMap.get(groupKey);

            if (existing) {
                existing.copies.push(c);
                existing.totalCount += 1;
                if (c.is_in_binder) existing.hasInBinder = true;
            } else {
                groupsMap.set(groupKey, {
                    key: groupKey,
                    card: c,
                    copies: [c],
                    totalCount: 1,
                    hasInBinder: Boolean(c.is_in_binder),
                });
            }
        });

        const groups = Array.from(groupsMap.values());
        expect(groups.length).toBe(4);
        expect(groups.map((g) => g.totalCount)).toEqual([1, 1, 1, 1]);
    });
});
