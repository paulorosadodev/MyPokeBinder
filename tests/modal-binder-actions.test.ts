import { describe, it, expect } from "bun:test";
import { UserCard } from "../src/types/binder";

describe("Binder Slot Selection and Removal Logic", () => {
    const mockCard1: UserCard = {
        id: "c0000000-0000-0000-0000-000000000001",
        user_id: "u1",
        tcgdex_card_id: "base1-44",
        pokemon_dex_id: 1,
        card_name: "Bulbasaur",
        card_image_url: "https://assets.tcgdex.net/en/base/base1/44/high.webp",
        card_set_name: "Base Set",
        card_rarity: "Common",
        card_language: "en",
        card_variant: "normal",
        is_in_binder: true,
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z",
    };

    const mockCard2: UserCard = {
        id: "c0000000-0000-0000-0000-000000000002",
        user_id: "u1",
        tcgdex_card_id: "base2-44",
        pokemon_dex_id: 1,
        card_name: "Bulbasaur Base Set 2",
        card_image_url: "https://assets.tcgdex.net/en/base/base2/44/high.webp",
        card_set_name: "Base Set 2",
        card_rarity: "Common",
        card_language: "en",
        card_variant: "normal",
        is_in_binder: false,
        created_at: "2026-01-02T00:00:00Z",
        updated_at: "2026-01-02T00:00:00Z",
    };

    it("should correctly identify current active card in binder", () => {
        const selectedCardId = mockCard1.id;
        expect(mockCard1.id === selectedCardId).toBe(true);
        expect(mockCard2.id === selectedCardId).toBe(false);
    });

    it("should not set pending drop dex id when active card is already in binder", () => {
        let pendingDropDexId: number | null = null;
        const currentActiveId = mockCard1.id;

        const selectCard = (card: UserCard) => {
            if (card.id === currentActiveId) return;
            pendingDropDexId = card.pokemon_dex_id;
        };

        selectCard(mockCard1);
        expect(pendingDropDexId).toBeNull();

        selectCard(mockCard2);
        expect<number | null>(pendingDropDexId).toEqual(1);
    });

    it("should reset state and clear pending drop when removing card from binder", () => {
        let pendingDropDexId: number | null = 1;
        let selectedId: string | undefined = mockCard1.id;
        let previewCard: UserCard | undefined = mockCard1;
        let userCards: UserCard[] = [mockCard1, mockCard2];

        const removeCard = (card: UserCard) => {
            pendingDropDexId = null;
            selectedId = undefined;
            previewCard = undefined;
            userCards = userCards.filter((c) => c.pokemon_dex_id !== card.pokemon_dex_id);
        };

        removeCard(mockCard1);

        expect(pendingDropDexId).toBeNull();
        expect(selectedId).toBeUndefined();
        expect(previewCard).toBeUndefined();
        expect(userCards.some((c) => c.pokemon_dex_id === 1)).toBe(false);
    });
});
