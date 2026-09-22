import { describe, expect, it } from "bun:test";
import { COLLECTION_PAGE_SIZE, buildCollectionFilterResetKey, filterAndSortCollectionGroups, groupCollectionCards, slicePagedWindow } from "../src/lib/collection/listCards";
import type { CollectionCardGroup, UserCard } from "../src/types/binder";

function makeCard(overrides: Partial<UserCard> & Pick<UserCard, "id" | "tcgdex_card_id" | "card_name">): UserCard {
    return {
        user_id: "user-1",
        pokemon_dex_id: 1,
        card_image_url: "https://example.com/card",
        card_set_name: "Base Set",
        card_rarity: "Rare",
        card_language: "pt-br",
        card_variant: "normal",
        is_in_binder: false,
        created_at: "2026-01-01T00:00:00.000Z",
        updated_at: "2026-01-01T00:00:00.000Z",
        ...overrides,
    };
}

describe("groupCollectionCards", () => {
    it("groups identical copies and prefers binder card as representative", () => {
        const cards = [makeCard({ id: "a", tcgdex_card_id: "base1-1", card_name: "Bulbasaur", is_in_binder: false }), makeCard({ id: "b", tcgdex_card_id: "base1-1", card_name: "Bulbasaur", is_in_binder: true }), makeCard({ id: "c", tcgdex_card_id: "base1-2", card_name: "Ivysaur", card_language: "en" })];

        const groups = groupCollectionCards(cards);
        expect(groups).toHaveLength(2);

        const bulba = groups.find((g) => g.card.tcgdex_card_id === "base1-1")!;
        expect(bulba.totalCount).toBe(2);
        expect(bulba.hasInBinder).toBe(true);
        expect(bulba.card.id).toBe("b");
    });
});

describe("filterAndSortCollectionGroups", () => {
    const groups: CollectionCardGroup[] = groupCollectionCards([
        makeCard({
            id: "1",
            tcgdex_card_id: "b1",
            card_name: "Bulbasaur",
            pokemon_dex_id: 1,
            is_in_binder: true,
            created_at: "2026-01-03T00:00:00.000Z",
        }),
        makeCard({
            id: "2",
            tcgdex_card_id: "p25",
            card_name: "Pikachu",
            pokemon_dex_id: 25,
            card_set_name: "Jungle",
            card_rarity: "Illustration rare",
            card_language: "en",
            created_at: "2026-01-01T00:00:00.000Z",
        }),
        makeCard({
            id: "3",
            tcgdex_card_id: "m151",
            card_name: "Mew",
            pokemon_dex_id: 151,
            is_in_binder: false,
            created_at: "2026-01-02T00:00:00.000Z",
        }),
    ]);

    it("filters by search term across name, set and dex", () => {
        const byName = filterAndSortCollectionGroups(groups, {
            searchTerm: "pika",
            statusFilter: "all",
            languageFilter: "all",
            rarityFilter: "all",
            sortField: "dex",
            sortDirection: "asc",
        });
        expect(byName.map((g) => g.card.card_name)).toEqual(["Pikachu"]);

        const bySet = filterAndSortCollectionGroups(groups, {
            searchTerm: "jungle",
            statusFilter: "all",
            languageFilter: "all",
            rarityFilter: "all",
            sortField: "dex",
            sortDirection: "asc",
        });
        expect(bySet).toHaveLength(1);

        const byDex = filterAndSortCollectionGroups(groups, {
            searchTerm: "#151",
            statusFilter: "all",
            languageFilter: "all",
            rarityFilter: "all",
            sortField: "dex",
            sortDirection: "asc",
        });
        expect(byDex.map((g) => g.card.card_name)).toEqual(["Mew"]);
    });

    it("filters by binder status, language and rarity", () => {
        const inBinder = filterAndSortCollectionGroups(groups, {
            searchTerm: "",
            statusFilter: "in_binder",
            languageFilter: "all",
            rarityFilter: "all",
            sortField: "dex",
            sortDirection: "asc",
        });
        expect(inBinder.map((g) => g.card.card_name)).toEqual(["Bulbasaur"]);

        const english = filterAndSortCollectionGroups(groups, {
            searchTerm: "",
            statusFilter: "all",
            languageFilter: "en",
            rarityFilter: "all",
            sortField: "dex",
            sortDirection: "asc",
        });
        expect(english.map((g) => g.card.card_name)).toEqual(["Pikachu"]);

        const rarity = filterAndSortCollectionGroups(groups, {
            searchTerm: "",
            statusFilter: "all",
            languageFilter: "all",
            rarityFilter: "illustration",
            sortField: "dex",
            sortDirection: "asc",
        });
        expect(rarity.map((g) => g.card.card_name)).toEqual(["Pikachu"]);
    });

    it("sorts by dex, name and recent", () => {
        const byDexDesc = filterAndSortCollectionGroups(groups, {
            searchTerm: "",
            statusFilter: "all",
            languageFilter: "all",
            rarityFilter: "all",
            sortField: "dex",
            sortDirection: "desc",
        });
        expect(byDexDesc.map((g) => g.card.pokemon_dex_id)).toEqual([151, 25, 1]);

        const byNameAsc = filterAndSortCollectionGroups(groups, {
            searchTerm: "",
            statusFilter: "all",
            languageFilter: "all",
            rarityFilter: "all",
            sortField: "name",
            sortDirection: "asc",
        });
        expect(byNameAsc.map((g) => g.card.card_name)).toEqual(["Bulbasaur", "Mew", "Pikachu"]);

        const byRecent = filterAndSortCollectionGroups(groups, {
            searchTerm: "",
            statusFilter: "all",
            languageFilter: "all",
            rarityFilter: "all",
            sortField: "recent",
            sortDirection: "desc",
        });
        expect(byRecent.map((g) => g.card.card_name)).toEqual(["Bulbasaur", "Mew", "Pikachu"]);
    });
});

describe("slicePagedWindow + reset key", () => {
    it("uses page size 36 and reports hasMore correctly", () => {
        expect(COLLECTION_PAGE_SIZE).toBe(36);
        const items = Array.from({ length: 80 }, (_, i) => i);
        const first = slicePagedWindow(items, COLLECTION_PAGE_SIZE);
        expect(first.visibleItems).toHaveLength(36);
        expect(first.hasMore).toBe(true);
        expect(first.nextVisibleCount).toBe(72);

        const second = slicePagedWindow(items, first.nextVisibleCount);
        expect(second.visibleItems).toHaveLength(72);
        expect(second.hasMore).toBe(true);

        const final = slicePagedWindow(items, second.nextVisibleCount);
        expect(final.visibleItems).toHaveLength(80);
        expect(final.hasMore).toBe(false);
        expect(final.nextVisibleCount).toBe(80);
    });

    it("builds a stable reset key that changes with filters", () => {
        const base = buildCollectionFilterResetKey({
            searchTerm: " Pika ",
            statusFilter: "all",
            languageFilter: "en",
            rarityFilter: "rare",
            sortField: "dex",
            sortDirection: "asc",
        });
        const same = buildCollectionFilterResetKey({
            searchTerm: "pika",
            statusFilter: "all",
            languageFilter: "en",
            rarityFilter: "rare",
            sortField: "dex",
            sortDirection: "asc",
        });
        const changed = buildCollectionFilterResetKey({
            searchTerm: "pika",
            statusFilter: "in_binder",
            languageFilter: "en",
            rarityFilter: "rare",
            sortField: "dex",
            sortDirection: "asc",
        });

        expect(base).toBe(same);
        expect(base).not.toBe(changed);
    });
});
