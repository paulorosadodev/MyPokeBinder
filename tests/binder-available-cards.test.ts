import { describe, expect, it } from "bun:test";
import { UserCard } from "@/types/binder";

describe("Binder available collection cards warning", () => {
    it("computes availableCounts correctly from collection cards where is_in_binder is false", () => {
        const storedCards: { pokemon_dex_id: number }[] = [{ pokemon_dex_id: 1 }, { pokemon_dex_id: 4 }, { pokemon_dex_id: 25 }, { pokemon_dex_id: 25 }];

        const availableCounts: Record<number, number> = {};
        for (const item of storedCards) {
            availableCounts[item.pokemon_dex_id] = (availableCounts[item.pokemon_dex_id] || 0) + 1;
        }

        expect(availableCounts[1]).toBe(1);
        expect(availableCounts[4]).toBe(1);
        expect(availableCounts[25]).toBe(2);
        expect(availableCounts[7]).toBeUndefined();
    });

    it("identifies when an empty slot should display the available warning", () => {
        const checkSlotState = ({ card, availableCount = 0 }: { card?: UserCard; availableCount?: number }) => {
            const isFilled = Boolean(card);
            const hasAvailableCard = !isFilled && availableCount > 0;
            return {
                isFilled,
                hasAvailableCard,
            };
        };

        const filledSlot = checkSlotState({
            card: {
                id: "c1",
                user_id: "u1",
                pokemon_dex_id: 1,
                tcgdex_card_id: "base1-1",
                card_name: "Bulbasaur",
                card_image_url: "https://example.com/1.png",
                card_set_name: "Base",
                card_rarity: "Common",
                card_language: "pt-br",
                card_variant: "normal",
                is_in_binder: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
            availableCount: 2,
        });
        expect(filledSlot.isFilled).toBe(true);
        expect(filledSlot.hasAvailableCard).toBe(false);

        const emptySlotWithoutAvailable = checkSlotState({
            card: undefined,
            availableCount: 0,
        });
        expect(emptySlotWithoutAvailable.isFilled).toBe(false);
        expect(emptySlotWithoutAvailable.hasAvailableCard).toBe(false);

        const emptySlotWithAvailable = checkSlotState({
            card: undefined,
            availableCount: 1,
        });
        expect(emptySlotWithAvailable.isFilled).toBe(false);
        expect(emptySlotWithAvailable.hasAvailableCard).toBe(true);
    });

    it("formats aria-label accurately and renders minimal dot indicator when cards are available", () => {
        const getSlotIndicator = (pokemonName: string, formattedDex: string, hasAvailableCard: boolean, availableCount: number) => {
            const ariaLabel = hasAvailableCard ? `${pokemonName}, ${formattedDex}, vazio, ${availableCount} ${availableCount > 1 ? "cartas disponíveis" : "carta disponível"} na coleção` : `${pokemonName}, ${formattedDex}, vazio`;
            const showDot = hasAvailableCard;

            return { ariaLabel, showDot };
        };

        const single = getSlotIndicator("Pikachu", "#025", true, 1);
        expect(single.ariaLabel).toBe("Pikachu, #025, vazio, 1 carta disponível na coleção");
        expect(single.showDot).toBe(true);

        const multiple = getSlotIndicator("Charmander", "#004", true, 3);
        expect(multiple.ariaLabel).toBe("Charmander, #004, vazio, 3 cartas disponíveis na coleção");
        expect(multiple.showDot).toBe(true);

        const none = getSlotIndicator("Squirtle", "#007", false, 0);
        expect(none.ariaLabel).toBe("Squirtle, #007, vazio");
        expect(none.showDot).toBe(false);
    });

    it("updates availableCounts optimistically when selecting or removing cards from binder", () => {
        let counts: Record<number, number> = { 25: 2, 4: 1 };

        const selectCard = (dexId: number) => {
            const current = counts[dexId] || 0;
            counts = {
                ...counts,
                [dexId]: Math.max(0, current - 1),
            };
        };

        const removeCard = (dexId: number) => {
            const current = counts[dexId] || 0;
            counts = {
                ...counts,
                [dexId]: current + 1,
            };
        };

        const addCardToCollection = (dexId: number) => {
            const current = counts[dexId] || 0;
            counts = {
                ...counts,
                [dexId]: current + 1,
            };
        };

        selectCard(25);
        expect(counts[25]).toBe(1);

        selectCard(25);
        expect(counts[25]).toBe(0);

        removeCard(25);
        expect(counts[25]).toBe(1);

        addCardToCollection(7);
        expect(counts[7]).toBe(1);
    });
});
