import { describe, it, expect } from "bun:test";
import { UserCard, CardLanguage } from "../src/types/binder";

describe("Toast and Optimistic Rollback Logic", () => {
    const mockCardA: UserCard = {
        id: "a0000000-0000-0000-0000-000000000001",
        user_id: "u1",
        tcgdex_card_id: "base1-4",
        pokemon_dex_id: 4,
        card_name: "Charmander",
        card_image_url: "https://assets.tcgdex.net/en/base/base1/4/high.webp",
        card_set_name: "Base Set",
        card_rarity: "Common",
        card_language: "pt-br",
        card_variant: "normal",
        is_in_binder: false,
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z",
    };

    const mockCardB: UserCard = {
        id: "b0000000-0000-0000-0000-000000000002",
        user_id: "u1",
        tcgdex_card_id: "base2-4",
        pokemon_dex_id: 4,
        card_name: "Charmander Base 2",
        card_image_url: "https://assets.tcgdex.net/en/base/base2/4/high.webp",
        card_set_name: "Base Set 2",
        card_rarity: "Common",
        card_language: "pt-br",
        card_variant: "normal",
        is_in_binder: true,
        created_at: "2026-01-02T00:00:00Z",
        updated_at: "2026-01-02T00:00:00Z",
    };

    it("should rollback optimistic binder selection on API rejection", async () => {
        let activeCardId: string | undefined = mockCardB.id;
        let activeCard: UserCard | undefined = mockCardB;
        let pendingDropDexId: any = null;
        let binderCards: UserCard[] = [mockCardB];
        let toastStatus: any = "none";

        const handleSelectCard = async (newCard: UserCard, shouldFail: boolean) => {
            if (activeCardId === newCard.id) return;
            const prevCardId = activeCardId;
            const prevCard = activeCard;

            activeCardId = newCard.id;
            activeCard = newCard;
            pendingDropDexId = newCard.pokemon_dex_id;
            const optimisticCard: UserCard = { ...newCard, is_in_binder: true };
            binderCards = [...binderCards.filter((c) => c.pokemon_dex_id !== newCard.pokemon_dex_id), optimisticCard];

            try {
                if (shouldFail) {
                    throw new Error("Falha na rede");
                }
                toastStatus = "success";
            } catch {
                activeCardId = prevCardId;
                activeCard = prevCard;
                pendingDropDexId = null;
                binderCards = [prevCard!];
                toastStatus = "error";
            }
        };

        await handleSelectCard(mockCardA, true);

        expect(activeCardId).toBe(mockCardB.id);
        expect(activeCard?.id).toBe(mockCardB.id);
        expect(pendingDropDexId).toBeNull();
        expect(binderCards[0].id).toBe(mockCardB.id);
        expect(toastStatus).toBe("error");

        await handleSelectCard(mockCardA, false);

        expect(activeCardId).toBe(mockCardA.id);
        expect(activeCard?.id).toBe(mockCardA.id);
        expect(pendingDropDexId).toBe(4);
        expect(binderCards[0].id).toBe(mockCardA.id);
        expect(toastStatus).toBe("success");
    });

    it("should rollback optimistic binder removal on API rejection", async () => {
        let activeCardId: string | undefined = mockCardB.id;
        let activeCard: UserCard | undefined = mockCardB;
        let binderCards: UserCard[] = [mockCardB];
        let toastStatus: any = "none";

        const handleRemoveCard = async (cardToRemove: UserCard, shouldFail: boolean) => {
            const prevCardId = activeCardId;
            const prevCard = activeCard;

            activeCardId = undefined;
            activeCard = undefined;
            binderCards = binderCards.filter((c) => c.pokemon_dex_id !== cardToRemove.pokemon_dex_id);

            try {
                if (shouldFail) {
                    throw new Error("Erro interno do servidor");
                }
                toastStatus = "success";
            } catch {
                activeCardId = prevCardId;
                activeCard = prevCard;
                binderCards = [prevCard!];
                toastStatus = "error";
            }
        };

        await handleRemoveCard(mockCardB, true);

        expect(activeCardId).toBe(mockCardB.id);
        expect(activeCard).toBeDefined();
        expect(binderCards.length).toBe(1);
        expect(toastStatus).toBe("error");

        await handleRemoveCard(mockCardB, false);

        expect(activeCardId).toBeUndefined();
        expect(activeCard).toBeUndefined();
        expect(binderCards.length).toBe(0);
        expect(toastStatus).toBe("success");
    });

    it("should rollback optimistic language slider on failure", async () => {
        let optimisticLang: any = null;
        let persistedLang: any = "pt-br";
        let toastStatus: any = "none";

        const changeLanguage = async (newLang: CardLanguage, shouldFail: boolean) => {
            optimisticLang = newLang;

            try {
                if (shouldFail) {
                    throw new Error("Timeout ao persistir idioma");
                }
                persistedLang = newLang;
                toastStatus = "success";
            } catch {
                optimisticLang = null;
                toastStatus = "error";
            }
        };

        await changeLanguage("ja", true);

        expect(optimisticLang).toBeNull();
        expect(persistedLang).toBe("pt-br");
        expect(toastStatus).toBe("error");

        await changeLanguage("ja", false);

        expect(optimisticLang).toBe("ja");
        expect(persistedLang).toBe("ja");
        expect(toastStatus).toBe("success");
    });
});
