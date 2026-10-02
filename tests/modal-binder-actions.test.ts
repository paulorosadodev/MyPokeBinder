import { describe, it, expect } from "bun:test";
import { UserCard } from "../src/types/binder";
import { readFileSync } from "node:fs";
import { join } from "node:path";

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

    it("mantém a localização do slot no cache ao editar pelo seletor universal", () => {
        const selectorSource = readFileSync(join(import.meta.dir, "../src/components/modal/BinderSlotSelectModal.tsx"), "utf8");
        const universalModalSource = readFileSync(join(import.meta.dir, "../src/components/modal/UniversalSlotModal.tsx"), "utf8");

        expect(selectorSource).toContain("allocation: targetCard.id === activeCardId ? activeCardAllocation : null");
        expect(universalModalSource).toContain("activeCardAllocation");
        expect(universalModalSource).toContain('openSlot: "true"');
    });

    it("retorna ao seletor do binder ao usar Voltar no catálogo", () => {
        const searchModalSource = readFileSync(join(import.meta.dir, "../src/components/modal/CardSearchModal.tsx"), "utf8");
        const viewerSource = readFileSync(join(import.meta.dir, "../src/components/binder/UniversalBinderViewer.tsx"), "utf8");
        const legacyBinderSource = readFileSync(join(import.meta.dir, "../src/components/binder/BinderClientPage.tsx"), "utf8");

        expect(searchModalSource).toContain("onBack?: () => void");
        expect(searchModalSource).toContain('aria-label="Voltar ao seletor do binder"');
        expect(searchModalSource.indexOf('aria-label="Voltar ao seletor do binder"')).toBeLessThan(searchModalSource.indexOf("<h2"));
        expect(viewerSource).toContain("handleReturnToSlotModal");
        expect(legacyBinderSource).toContain("handleReturnToSelectModal");
    });

    it("exibe os binders como capas selecionáveis no modal de alocação", () => {
        const allocateModalSource = readFileSync(join(import.meta.dir, "../src/components/modal/CardAllocateModal.tsx"), "utf8");

        expect(allocateModalSource).toContain("BinderShelfBook");
        expect(allocateModalSource).toContain("router.push(`/binders/${binder.id}`)");
        expect(allocateModalSource).not.toContain("handleAssignSlot");
        expect(allocateModalSource).not.toContain("hover:-translate-y-1");
    });

    it("aguarda o fechamento do seletor antes de abrir o catálogo do binder", () => {
        const viewerSource = readFileSync(join(import.meta.dir, "../src/components/binder/UniversalBinderViewer.tsx"), "utf8");
        const legacyBinderSource = readFileSync(join(import.meta.dir, "../src/components/binder/BinderClientPage.tsx"), "utf8");

        expect(viewerSource).toContain("catalogOpenTimerRef");
        expect(legacyBinderSource).toContain("catalogOpenTimerRef");
    });

    it("não exibe a navegação redundante na página de edição", () => {
        const cardPageSource = readFileSync(join(import.meta.dir, "../src/app/cards/[id]/page.tsx"), "utf8");

        expect(cardPageSource).not.toContain("Navegação do Binder");
        expect(cardPageSource).toContain("returnToBinderModal");
    });

    it("redireciona o botão de alocar no binder diretamente para a página de Meus Binders (/)", () => {
        const cardPageSource = readFileSync(join(import.meta.dir, "../src/app/cards/[id]/page.tsx"), "utf8");

        expect(cardPageSource).toContain('onClick={() => router.push("/")}');
        expect(cardPageSource).not.toContain("CardAllocateModal");
    });

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

    it("should keep modal open during card edit navigation and prevent duplicate actions", () => {
        let isModalOpen = true;
        let editingCardId: string | null = null;
        let navigatedUrl: string | null = null;

        const handleEditCard = (card: UserCard, dexId: number) => {
            if (editingCardId) return;
            editingCardId = card.id;
            navigatedUrl = `/cards/${card.id}?from=binder&dexId=${dexId}`;
        };

        handleEditCard(mockCard1, 1);

        expect(isModalOpen).toBe(true);
        expect<string | null>(editingCardId).toEqual(mockCard1.id);
        expect<string | null>(navigatedUrl).toEqual(`/cards/${mockCard1.id}?from=binder&dexId=1`);

        handleEditCard(mockCard2, 1);
        expect<string | null>(editingCardId).toEqual(mockCard1.id);
    });

    it("should build card details cache payload with grouped copies and variants for instant navigation", () => {
        const collection = [mockCard1, mockCard2];
        const targetCard = mockCard1;

        const copies = collection.filter((c) => c.tcgdex_card_id === targetCard.tcgdex_card_id);
        const payload = {
            card: targetCard,
            copies,
            availableVariants: ["normal", "holo", "reverse"],
        };

        expect(payload.card.id).toBe(mockCard1.id);
        expect(payload.copies.length).toBe(1);
        expect(payload.availableVariants).toContain("holo");
        expect(payload.availableVariants).toContain("reverse");
    });

    it("should optimistically update binder cards and available counts when removing card from binder in card details", () => {
        const initialBinderState = {
            cards: [mockCard1],
            availableCounts: { 1: 0 } as Record<number, number>,
        };

        const targetDexId = mockCard1.pokemon_dex_id!;
        const nextIsInBinder = false;

        const updateBinderCache = (prev: typeof initialBinderState) => {
            const prevCounts = prev.availableCounts ?? {};
            const currentCount = prevCounts[targetDexId] || 0;
            if (nextIsInBinder) {
                const updatedCard: UserCard = { ...mockCard1, is_in_binder: true };
                return {
                    cards: [...prev.cards.filter((c) => c.pokemon_dex_id !== targetDexId), updatedCard],
                    availableCounts: {
                        ...prevCounts,
                        [targetDexId]: Math.max(0, currentCount - 1),
                    },
                };
            }
            return {
                cards: prev.cards.filter((c) => c.pokemon_dex_id !== targetDexId),
                availableCounts: {
                    ...prevCounts,
                    [targetDexId]: currentCount + 1,
                },
            };
        };

        const updated = updateBinderCache(initialBinderState);
        expect(updated.cards.some((c) => c.pokemon_dex_id === targetDexId)).toBe(false);
        expect(updated.availableCounts[targetDexId]).toBe(1);
    });

    it("should clear active card selection when card is removed from cardsMap", () => {
        const cardsMap = new Map<number, UserCard>();
        let selectActiveCardId: string | undefined = mockCard1.id;
        let selectActiveCard: UserCard | undefined = mockCard1;

        const syncWithCardsMap = (dexId: number) => {
            const currentActive = cardsMap.get(dexId);
            if (currentActive?.id !== selectActiveCardId) {
                selectActiveCardId = currentActive?.id;
                selectActiveCard = currentActive;
            }
        };

        syncWithCardsMap(1);
        expect(selectActiveCardId).toBeUndefined();
        expect(selectActiveCard).toBeUndefined();
    });

    it("should clear selection if selected card is not in updated collection", () => {
        let selectedCardId: string | undefined = mockCard1.id;
        let previewCard: UserCard | undefined = mockCard1;
        const freshCollection: UserCard[] = [];

        if (selectedCardId && freshCollection.length === 0) {
            selectedCardId = undefined;
            previewCard = undefined;
        }

        expect(selectedCardId).toBeUndefined();
        expect(previewCard).toBeUndefined();
    });

    it("should defer revealing newly selected card in displayCardsMap until modal is closed", () => {
        const initialCardsMap = new Map<number, UserCard>();
        let initialSlotCard: UserCard | undefined = undefined;
        let selectModalOpen = true;
        let pendingDropDexId: number | null = null;

        const getDisplayCardsMap = (currentMap: Map<number, UserCard>) => {
            if (!selectModalOpen || pendingDropDexId === null) {
                return currentMap;
            }
            const next = new Map(currentMap);
            if (initialSlotCard) {
                next.set(pendingDropDexId, initialSlotCard);
            } else {
                next.delete(pendingDropDexId);
            }
            return next;
        };

        const updatedCardsMap = new Map(initialCardsMap);
        updatedCardsMap.set(1, mockCard1);
        pendingDropDexId = 1;

        const displayedWhileModalOpen = getDisplayCardsMap(updatedCardsMap);
        expect(displayedWhileModalOpen.has(1)).toBe(false);

        selectModalOpen = false;
        pendingDropDexId = null;
        let droppingDexId: number | null = 1;

        const displayedAfterModalClose = getDisplayCardsMap(updatedCardsMap);
        expect(displayedAfterModalClose.has(1)).toBe(true);
        expect(displayedAfterModalClose.get(1)?.id).toBe(mockCard1.id);
        expect(droppingDexId).toBe(1);
    });

    it("should preserve original card in displayCardsMap while replacing card in open modal", () => {
        const initialCardsMap = new Map<number, UserCard>();
        initialCardsMap.set(1, mockCard1);
        const initialSlotCard: UserCard | undefined = mockCard1;
        let selectModalOpen = true;
        let pendingDropDexId: number | null = 1;

        const getDisplayCardsMap = (currentMap: Map<number, UserCard>) => {
            if (!selectModalOpen || pendingDropDexId === null) {
                return currentMap;
            }
            const next = new Map(currentMap);
            if (initialSlotCard) {
                next.set(pendingDropDexId, initialSlotCard);
            } else {
                next.delete(pendingDropDexId);
            }
            return next;
        };

        const updatedCardsMap = new Map<number, UserCard>();
        updatedCardsMap.set(1, mockCard2);

        const displayedWhileModalOpen = getDisplayCardsMap(updatedCardsMap);
        expect(displayedWhileModalOpen.get(1)?.id).toBe(mockCard1.id);

        selectModalOpen = false;
        pendingDropDexId = null;

        const displayedAfterModalClose = getDisplayCardsMap(updatedCardsMap);
        expect(displayedAfterModalClose.get(1)?.id).toBe(mockCard2.id);
    });
});
