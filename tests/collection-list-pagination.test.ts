import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { COLLECTION_PAGE_SIZE, buildCollectionFilterResetKey, buildExpansionFilterOptions, filterAndSortCollectionGroups, filterCatalogCards, groupCollectionCards, matchesCardNumber, slicePagedWindow } from "../src/lib/collection/listCards";
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

        const byDexWithoutHash = filterAndSortCollectionGroups(groups, {
            searchTerm: "99",
            statusFilter: "all",
            languageFilter: "all",
            rarityFilter: "all",
            sortField: "dex",
            sortDirection: "asc",
        });
        expect(byDexWithoutHash.map((g) => g.card.card_name)).toEqual([]);

        const customCollection: CollectionCardGroup[] = groupCollectionCards([
            makeCard({
                id: "c1",
                tcgdex_card_id: "sv3.5-025",
                card_name: "Bulbasaur",
                pokemon_dex_id: 1,
            }),
            makeCard({
                id: "c2",
                tcgdex_card_id: "base1-58",
                card_name: "Pikachu",
                pokemon_dex_id: 25,
            }),
        ]);

        const cardNumSearch = filterAndSortCollectionGroups(customCollection, {
            searchTerm: "25",
            statusFilter: "all",
            languageFilter: "all",
            rarityFilter: "all",
            sortField: "dex",
            sortDirection: "asc",
        });
        expect(cardNumSearch.map((g) => g.card.card_name)).toEqual(["Bulbasaur"]);

        const cardNumWithSlash = filterAndSortCollectionGroups(customCollection, {
            searchTerm: "025/165",
            statusFilter: "all",
            languageFilter: "all",
            rarityFilter: "all",
            sortField: "dex",
            sortDirection: "asc",
        });
        expect(cardNumWithSlash.map((g) => g.card.card_name)).toEqual(["Bulbasaur"]);

        const invalidSlashSearch = filterAndSortCollectionGroups(customCollection, {
            searchTerm: "8/dfhdfhd",
            statusFilter: "all",
            languageFilter: "all",
            rarityFilter: "all",
            sortField: "dex",
            sortDirection: "asc",
        });
        expect(invalidSlashSearch).toHaveLength(0);

        const explicitDexSearch = filterAndSortCollectionGroups(customCollection, {
            searchTerm: "#25",
            statusFilter: "all",
            languageFilter: "all",
            rarityFilter: "all",
            sortField: "dex",
            sortDirection: "asc",
        });
        expect(explicitDexSearch.map((g) => g.card.card_name)).toEqual(["Pikachu"]);

        const pokedexThreeCollection: CollectionCardGroup[] = groupCollectionCards([makeCard({ id: "v3", tcgdex_card_id: "base1-15", card_name: "Venusaur", pokemon_dex_id: 3 }), makeCard({ id: "n30", tcgdex_card_id: "base1-30", card_name: "Nidorina", pokemon_dex_id: 30 }), makeCard({ id: "n32", tcgdex_card_id: "base1-32", card_name: "Nidoran M", pokemon_dex_id: 32 })]);

        const exactThree = filterAndSortCollectionGroups(pokedexThreeCollection, {
            searchTerm: "#3",
            statusFilter: "all",
            languageFilter: "all",
            rarityFilter: "all",
            sortField: "dex",
            sortDirection: "asc",
        });
        expect(exactThree.map((g) => g.card.card_name)).toEqual(["Venusaur"]);

        const exactZeroThree = filterAndSortCollectionGroups(pokedexThreeCollection, {
            searchTerm: "#03",
            statusFilter: "all",
            languageFilter: "all",
            rarityFilter: "all",
            sortField: "dex",
            sortDirection: "asc",
        });
        expect(exactZeroThree.map((g) => g.card.card_name)).toEqual(["Venusaur"]);
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

    it("filters by exact expansion name and ignores search-only substring matches", () => {
        const jungle = filterAndSortCollectionGroups(groups, {
            searchTerm: "",
            statusFilter: "all",
            languageFilter: "all",
            rarityFilter: "all",
            expansionFilter: "Jungle",
            sortField: "dex",
            sortDirection: "asc",
        });
        expect(jungle.map((g) => g.card.card_name)).toEqual(["Pikachu"]);

        const baseSet = filterAndSortCollectionGroups(groups, {
            searchTerm: "",
            statusFilter: "all",
            languageFilter: "all",
            rarityFilter: "all",
            expansionFilter: "Base Set",
            sortField: "dex",
            sortDirection: "asc",
        });
        expect(baseSet.map((g) => g.card.card_name)).toEqual(["Bulbasaur", "Mew"]);

        const missing = filterAndSortCollectionGroups(groups, {
            searchTerm: "",
            statusFilter: "all",
            languageFilter: "all",
            rarityFilter: "all",
            expansionFilter: "Scarlet & Violet",
            sortField: "dex",
            sortDirection: "asc",
        });
        expect(missing).toHaveLength(0);
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

        const withExpansion = buildCollectionFilterResetKey({
            searchTerm: "pika",
            statusFilter: "all",
            languageFilter: "en",
            rarityFilter: "rare",
            expansionFilter: "Jungle",
            sortField: "dex",
            sortDirection: "asc",
        });
        expect(withExpansion).not.toBe(same);

        const withDifferentSortField = buildCollectionFilterResetKey({
            searchTerm: "pika",
            statusFilter: "all",
            languageFilter: "en",
            rarityFilter: "rare",
            sortField: "name",
            sortDirection: "asc",
        });
        expect(withDifferentSortField).not.toBe(base);

        const withDifferentSortDirection = buildCollectionFilterResetKey({
            searchTerm: "pika",
            statusFilter: "all",
            languageFilter: "en",
            rarityFilter: "rare",
            sortField: "dex",
            sortDirection: "desc",
        });
        expect(withDifferentSortDirection).not.toBe(base);
    });

    it("binds filterResetKey to grid and card keys in collection views to re-trigger appear animation", () => {
        const collectionPage = readFileSync(join(import.meta.dir, "../src/app/collection/page.tsx"), "utf8");
        const publicCollectionView = readFileSync(join(import.meta.dir, "../src/components/profile/PublicCollectionView.tsx"), "utf8");

        expect(collectionPage).toContain('<div key={filterResetKey} className="relative z-0 isolate grid');
        expect(collectionPage).toContain("key={`${filterResetKey}-${group.key}`}");

        expect(publicCollectionView).toContain('<div key={filterResetKey} className="relative z-0 isolate grid');
        expect(publicCollectionView).toContain("key={`${filterResetKey}-${group.key}`}");
    });

    it("initializes collection filters with SSR-safe defaults to prevent hydration mismatch", () => {
        const collectionPage = readFileSync(join(import.meta.dir, "../src/app/collection/page.tsx"), "utf8");

        expect(collectionPage).toContain('const [sortField, setSortField] = useState<SortField>("dex");');
        expect(collectionPage).toContain('const [sortDirection, setSortDirection] = useState<SortDirection>("asc");');
        expect(collectionPage).not.toContain('useState(() => {\n        if (typeof window !== "undefined")');
    });

    it("defines clean and consistent labels for collection sort options", () => {
        const collectionPage = readFileSync(join(import.meta.dir, "../src/app/collection/page.tsx"), "utf8");
        const publicCollectionView = readFileSync(join(import.meta.dir, "../src/components/profile/PublicCollectionView.tsx"), "utf8");

        const expectedSortOptions = `const SORT_FIELD_OPTIONS: SelectOption<SortField>[] = [
    { value: "dex", label: "Pokédex" },
    { value: "name", label: "Nome" },
    { value: "recent", label: "Data de adição" },
];`;

        expect(collectionPage).toContain(expectedSortOptions);
        expect(publicCollectionView).toContain(expectedSortOptions);
    });

    it("configures responsive mobile search placeholder and expandable filters toggle", () => {
        const collectionPage = readFileSync(join(import.meta.dir, "../src/app/collection/page.tsx"), "utf8");
        const publicCollectionView = readFileSync(join(import.meta.dir, "../src/components/profile/PublicCollectionView.tsx"), "utf8");

        expect(collectionPage).toContain('placeholder={isMobile ? "Buscar cartas..." : "Buscar por pokémon, número, coleção ou pokédex..."}');
        expect(collectionPage).toContain('aria-label="Alternar filtros"');
        expect(collectionPage).toContain("showFilters || activeFilterCount > 0");
        expect(collectionPage).toContain('span className="hidden text-[7px] font-bold uppercase sm:inline sm:text-[9px]"');

        expect(publicCollectionView).toContain('placeholder={isMobile ? "Buscar cartas..." : "Buscar por pokémon, número, coleção ou pokédex..."}');
        expect(publicCollectionView).toContain('aria-label="Alternar filtros"');
        expect(publicCollectionView).toContain("showFilters || activeFilterCount > 0");
    });

    it("displays loader while collection is loading and prevents showing 0 cards prematurely in public collection", () => {
        const publicCollectionView = readFileSync(join(import.meta.dir, "../src/components/profile/PublicCollectionView.tsx"), "utf8");

        expect(publicCollectionView).toContain("Carregando total de cartas");
        expect(publicCollectionView).toContain('<PokeballLoader message="Carregando coleção..." size="lg" />');
        expect(publicCollectionView).toContain("{isLoading ? (");
    });
});

describe("buildExpansionFilterOptions + filterCatalogCards", () => {
    it("builds unique sorted expansion options with an all sentinel", () => {
        const options = buildExpansionFilterOptions(["Jungle", "Base Set", " jungle ", "", null, "Base Set"]);
        expect(options[0]).toEqual({ value: "all", label: "Todas as expansões" });
        expect(options.slice(1).map((option) => option.value)).toEqual(["Base Set", "Jungle"]);
    });

    it("filters catalog cards by name, set, local id, rarity and exact expansion", () => {
        const cards = [
            { id: "sv1-1", localId: "1", name: "Sprigatito", image: "a", setName: "Scarlet & Violet", rarity: "Common" },
            { id: "sv1-25", localId: "25", name: "Pikachu", image: "b", setName: "Scarlet & Violet", rarity: "Rare" },
            { id: "base1-58", localId: "58", name: "Pikachu", image: "c", setName: "Base Set", rarity: "Common" },
        ];

        expect(filterCatalogCards(cards, { searchTerm: "pika", rarityFilter: "all", expansionFilter: "all" }).map((card) => card.id)).toEqual(["sv1-25", "base1-58"]);

        expect(filterCatalogCards(cards, { searchTerm: "25", rarityFilter: "all", expansionFilter: "all" }).map((card) => card.id)).toEqual(["sv1-25"]);

        expect(filterCatalogCards(cards, { searchTerm: "25/165", rarityFilter: "all", expansionFilter: "all" }).map((card) => card.id)).toEqual(["sv1-25"]);

        expect(filterCatalogCards(cards, { searchTerm: "025/165", rarityFilter: "all", expansionFilter: "all" }).map((card) => card.id)).toEqual(["sv1-25"]);

        expect(filterCatalogCards(cards, { searchTerm: "#25", rarityFilter: "all", expansionFilter: "all", dexId: 25 }).map((card) => card.id)).toEqual(["sv1-25", "base1-58"]);

        expect(filterCatalogCards(cards, { searchTerm: "#1", rarityFilter: "all", expansionFilter: "all", dexId: 25 }).map((card) => card.id)).toEqual([]);

        expect(filterCatalogCards(cards, { searchTerm: "", rarityFilter: "rare", expansionFilter: "all" }).map((card) => card.id)).toEqual(["sv1-25"]);

        expect(filterCatalogCards(cards, { searchTerm: "", rarityFilter: "all", expansionFilter: "Base Set" }).map((card) => card.id)).toEqual(["base1-58"]);

        const cardsWithEight = [
            { id: "c-8", localId: "8", name: "Card 8", image: "a" },
            { id: "c-08", localId: "08", name: "Card 08", image: "b" },
            { id: "c-18", localId: "18", name: "Card 18", image: "c" },
            { id: "c-28", localId: "28", name: "Card 28", image: "d" },
            { id: "c-58", localId: "58", name: "Card 58", image: "e" },
            { id: "c-80", localId: "80", name: "Card 80", image: "f" },
            { id: "c-88", localId: "88", name: "Card 88", image: "g" },
        ];

        expect(filterCatalogCards(cardsWithEight, { searchTerm: "8/45", rarityFilter: "all", expansionFilter: "all" }).map((c) => c.id)).toEqual(["c-8", "c-08"]);

        expect(matchesCardNumber("8", "8/45")).toBe(true);
        expect(matchesCardNumber("08", "8/45")).toBe(true);
        expect(matchesCardNumber("008", "8/45")).toBe(true);
        expect(matchesCardNumber("8", "8/dfhdfhd")).toBe(false);
        expect(matchesCardNumber("8", "8/")).toBe(false);
        expect(matchesCardNumber("8", "/45")).toBe(false);
        expect(matchesCardNumber("18", "8/45")).toBe(false);
        expect(matchesCardNumber("28", "8/45")).toBe(false);
        expect(matchesCardNumber("58", "8/45")).toBe(false);
        expect(matchesCardNumber("80", "8/45")).toBe(false);
        expect(matchesCardNumber("88", "8/45")).toBe(false);
    });
});
