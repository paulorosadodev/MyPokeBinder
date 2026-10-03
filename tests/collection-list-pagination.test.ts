import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ALL_ARTISTS_FILTER, COLLECTION_PAGE_SIZE, buildArtistFilterOptions, buildCollectionFilterResetKey, buildExpansionFilterOptions, filterAndSortCollectionGroups, filterCatalogCards, groupCollectionCards, matchesCardNumber, slicePagedWindow } from "../src/lib/collection/listCards";
import { CARD_CONDITIONS, CONDITION_SLIDER_OPTIONS, formatConditionLabel, getConditionBadgeStyle, isCardCondition } from "../src/lib/pokemon/condition";
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

    it("separates copies with distinct conditions", () => {
        const cards = [makeCard({ id: "damaged", tcgdex_card_id: "base1-1", card_name: "Bulbasaur", card_condition: "D" }), makeCard({ id: "near-mint", tcgdex_card_id: "base1-1", card_name: "Bulbasaur", card_condition: "NM" })];

        const groups = groupCollectionCards(cards);

        expect(groups).toHaveLength(2);
        expect(groups.map((group) => group.card.card_condition).sort()).toEqual(["D", "NM"]);
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

        expect(collectionPage).toContain('const [sortField, setSortField] = useState<SortField>("recent");');
        expect(collectionPage).toContain('const [sortDirection, setSortDirection] = useState<SortDirection>("desc");');
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
        expect(collectionPage).toContain("<CardArtwork");
        expect(collectionPage).toContain("<CardBadgeStack");
        expect(collectionPage).toContain("aspect-[8/11] w-full cursor-pointer");

        expect(publicCollectionView).toContain('placeholder={isMobile ? "Buscar cartas..." : "Buscar por pokémon, número, coleção ou pokédex..."}');
        expect(publicCollectionView).toContain('aria-label="Alternar filtros"');
        expect(publicCollectionView).toContain("showFilters || activeFilterCount > 0");
    });

    it("displays loader while collection is loading and prevents showing 0 cards prematurely in public collection", () => {
        const publicCollectionView = readFileSync(join(import.meta.dir, "../src/components/profile/PublicCollectionView.tsx"), "utf8");

        expect(publicCollectionView).toContain("Carregando total de cartas");
        expect(publicCollectionView).toContain("<CardGridSkeleton");
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

describe("buildArtistFilterOptions + artist filtering", () => {
    it("builds unique sorted artist options with an all sentinel", () => {
        const options = buildArtistFilterOptions(["Mitsuhiro Arita", "Ken Sugimori", " mitsuhiro arita ", "", null, "Ken Sugimori", "Kouki Saitou"]);
        expect(options[0]).toEqual({ value: ALL_ARTISTS_FILTER, label: "Todos os artistas" });
        expect(options.slice(1).map((opt) => opt.value)).toEqual(["Ken Sugimori", "Kouki Saitou", "Mitsuhiro Arita"]);
    });

    it("filters catalog cards by artist filter and by search term matching artist", () => {
        const cards = [
            { id: "c1", localId: "1", name: "Bulbasaur", image: "a", artist: "Ken Sugimori" },
            { id: "c2", localId: "2", name: "Ivysaur", image: "b", artist: "Mitsuhiro Arita" },
            { id: "c3", localId: "3", name: "Venusaur", image: "c", artist: "Mitsuhiro Arita" },
        ];

        expect(filterCatalogCards(cards, { searchTerm: "", rarityFilter: "all", expansionFilter: "all", artistFilter: "Mitsuhiro Arita" }).map((c) => c.id)).toEqual(["c2", "c3"]);
        expect(filterCatalogCards(cards, { searchTerm: "sugimori", rarityFilter: "all", expansionFilter: "all" }).map((c) => c.id)).toEqual(["c1"]);
    });

    it("filters collection groups by artist filter and search term matching card_artist", () => {
        const groups: CollectionCardGroup[] = groupCollectionCards([makeCard({ id: "1", tcgdex_card_id: "b1", card_name: "Bulbasaur", card_artist: "Ken Sugimori" }), makeCard({ id: "2", tcgdex_card_id: "p25", card_name: "Pikachu", card_artist: "Mitsuhiro Arita" }), makeCard({ id: "3", tcgdex_card_id: "m151", card_name: "Mew", card_artist: "Kouki Saitou" })]);

        const filteredByArtist = filterAndSortCollectionGroups(groups, {
            searchTerm: "",
            statusFilter: "all",
            languageFilter: "all",
            rarityFilter: "all",
            artistFilter: "Mitsuhiro Arita",
            sortField: "dex",
            sortDirection: "asc",
        });
        expect(filteredByArtist.map((g) => g.card.card_name)).toEqual(["Pikachu"]);

        const searchByArtist = filterAndSortCollectionGroups(groups, {
            searchTerm: "saitou",
            statusFilter: "all",
            languageFilter: "all",
            rarityFilter: "all",
            sortField: "dex",
            sortDirection: "asc",
        });
        expect(searchByArtist.map((g) => g.card.card_name)).toEqual(["Mew"]);
    });
});

describe("Card condition domain logic", () => {
    it("validates all supported card condition codes and rejects invalid ones", () => {
        expect(CARD_CONDITIONS).toEqual(["M", "NM", "SP", "MP", "HP", "D"]);

        for (const condition of CARD_CONDITIONS) {
            expect(isCardCondition(condition)).toBe(true);
        }

        expect(isCardCondition("POOR")).toBe(false);
        expect(isCardCondition("MINT")).toBe(false);
        expect(isCardCondition("")).toBe(false);
        expect(isCardCondition(null)).toBe(false);
        expect(isCardCondition(undefined)).toBe(false);
    });

    it("returns correct labels for all condition codes", () => {
        expect(formatConditionLabel("M")).toBe("Mint (M)");
        expect(formatConditionLabel("NM")).toBe("Near Mint (NM)");
        expect(formatConditionLabel("SP")).toBe("Slightly Played (SP)");
        expect(formatConditionLabel("MP")).toBe("Moderately Played (MP)");
        expect(formatConditionLabel("HP")).toBe("Heavily Played (HP)");
        expect(formatConditionLabel("D")).toBe("Damaged (D)");

        expect(getConditionBadgeStyle("M").fullLabel).toBe("Mint");
        expect(getConditionBadgeStyle("NM").fullLabel).toBe("Near Mint");
        expect(getConditionBadgeStyle("SP").fullLabel).toBe("Slightly Played");
        expect(getConditionBadgeStyle("MP").fullLabel).toBe("Moderately Played");
        expect(getConditionBadgeStyle("HP").fullLabel).toBe("Heavily Played");
        expect(getConditionBadgeStyle("D").fullLabel).toBe("Damaged");
    });

    it("assigns distinct, non-repeating colors in a smooth degradation spectrum", () => {
        const styles = CARD_CONDITIONS.map((c) => getConditionBadgeStyle(c));
        const colorClasses = styles.map((s) => s.badgeClasses);
        const uniqueColors = new Set(colorClasses);
        expect(uniqueColors.size).toBe(CARD_CONDITIONS.length);

        expect(styles.find((s) => s.code === "M")?.badgeClasses).toContain("emerald");
        expect(styles.find((s) => s.code === "NM")?.badgeClasses).toContain("lime");
        expect(styles.find((s) => s.code === "SP")?.badgeClasses).toContain("yellow");
        expect(styles.find((s) => s.code === "MP")?.badgeClasses).toContain("amber");
        expect(styles.find((s) => s.code === "HP")?.badgeClasses).toContain("orange");
        expect(styles.find((s) => s.code === "D")?.badgeClasses).toContain("rose");
    });

    it("configures condition slider options with icons, titles in English, and active colors", () => {
        expect(CONDITION_SLIDER_OPTIONS).toHaveLength(6);
        for (const opt of CONDITION_SLIDER_OPTIONS) {
            expect(opt.icon).toBeDefined();
            expect(opt.title).toBeDefined();
            expect(opt.activeIconClassName).toBeDefined();
            expect(opt.inactiveIconClassName).toBeDefined();
        }

        const mintOpt = CONDITION_SLIDER_OPTIONS.find((o) => o.value === "M");
        expect(mintOpt?.title).toBe("Mint");
        expect(mintOpt?.activeIconClassName).toContain("emerald");

        const nearMintOpt = CONDITION_SLIDER_OPTIONS.find((o) => o.value === "NM");
        expect(nearMintOpt?.title).toBe("Near Mint");
        expect(nearMintOpt?.activeIconClassName).toContain("lime");

        const damagedOpt = CONDITION_SLIDER_OPTIONS.find((o) => o.value === "D");
        expect(damagedOpt?.title).toBe("Damaged");
        expect(damagedOpt?.activeIconClassName).toContain("rose");
    });

    it("configures ConditionBadge with letters by default and both icon + letters in edit page", () => {
        const badgeFile = readFileSync(join(import.meta.dir, "../src/components/ui/ConditionBadge.tsx"), "utf8");
        const cardDetailPage = readFileSync(join(import.meta.dir, "../src/app/cards/[id]/CardDetailClient.tsx"), "utf8");
        const trainerProfileView = readFileSync(join(import.meta.dir, "../src/components/profile/TrainerProfileView.tsx"), "utf8");

        expect(badgeFile).toContain("title={badge.fullLabel}");
        expect(badgeFile).toContain("aria-label={badge.fullLabel}");
        expect(badgeFile).toContain("ShieldAlert");
        expect(badgeFile).toContain("ShieldCheck");
        expect(badgeFile).toContain("{badge.label}");
        expect(cardDetailPage).toContain('variant="both"');
        expect(trainerProfileView).not.toContain('ConditionBadge condition={card.card_condition} size="sm" className="absolute top-2 left-2');
    });
});

describe("Sort direction button icons and filter counter exclusion", () => {
    it("uses directional ArrowUp and ArrowDown icons in sort toggle buttons", () => {
        const collectionPage = readFileSync(join(import.meta.dir, "../src/app/collection/page.tsx"), "utf8");
        const publicCollectionView = readFileSync(join(import.meta.dir, "../src/components/profile/PublicCollectionView.tsx"), "utf8");
        const binderModal = readFileSync(join(import.meta.dir, "../src/components/modal/BinderSlotSelectModal.tsx"), "utf8");

        expect(collectionPage).toContain('{sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}');
        expect(publicCollectionView).toContain('{sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}');
        expect(binderModal).toContain('{sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}');
    });

    it("does not count sorting changes in activeFilterCount across views", () => {
        const collectionPage = readFileSync(join(import.meta.dir, "../src/app/collection/page.tsx"), "utf8");
        const publicCollectionView = readFileSync(join(import.meta.dir, "../src/components/profile/PublicCollectionView.tsx"), "utf8");
        const binderModal = readFileSync(join(import.meta.dir, "../src/components/modal/BinderSlotSelectModal.tsx"), "utf8");

        expect(collectionPage).not.toContain('sortField !== "dex"');
        expect(collectionPage).not.toContain('sortField !== "recent"');
        expect(publicCollectionView).not.toContain('sortField !== "dex"');
        expect(binderModal).not.toContain('sortField !== "name"');
    });

    it("uses balanced 2-column mobile and 3-column desktop layout for filters in BinderSlotSelectModal minimizing vertical space without truncation", () => {
        const binderModal = readFileSync(join(import.meta.dir, "../src/components/modal/BinderSlotSelectModal.tsx"), "utf8");
        const selectComponent = readFileSync(join(import.meta.dir, "../src/components/ui/Select.tsx"), "utf8");
        expect(binderModal).toContain('className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2.5 w-full pt-0.5"');
        expect(selectComponent).toContain("px-1.5 sm:px-3");
    });

    it("uses compact 2-column mobile and fixed two-row desktop layout for filters in CardSearchModal and collection views", () => {
        const cardSearchModal = readFileSync(join(import.meta.dir, "../src/components/modal/CardSearchModal.tsx"), "utf8");
        const collectionPage = readFileSync(join(import.meta.dir, "../src/app/collection/page.tsx"), "utf8");
        const publicCollectionView = readFileSync(join(import.meta.dir, "../src/components/profile/PublicCollectionView.tsx"), "utf8");

        expect(cardSearchModal).toContain('className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2.5 pt-0.5 w-full"');
        expect(cardSearchModal).not.toContain("sm:w-40");
        expect(cardSearchModal).not.toContain("sm:w-52");
        expect(cardSearchModal).not.toContain("sm:w-48");

        expect(collectionPage).toContain('className="grid w-full grid-cols-2 gap-1.5 lg:grid-cols-4 lg:gap-2.5"');
        expect(collectionPage).toContain('className="col-span-2 flex w-full min-w-0 items-center gap-1.5 lg:col-span-2"');
        expect(collectionPage).not.toContain('expansionFilter" options={expansionOptions} icon={<Layers size={13} />} ariaLabel="Filtrar coleção por expansão" className="w-full col-span-2');
        expect(publicCollectionView).toContain('className="grid w-full grid-cols-2 gap-1.5 lg:grid-cols-4 lg:gap-2.5"');
        expect(publicCollectionView).toContain('className="col-span-2 flex w-full min-w-0 items-center gap-1.5 lg:col-span-2"');
    });

    it("uses distinct icons for rarity and variant filters to avoid icon repetition", () => {
        const collectionPage = readFileSync(join(import.meta.dir, "../src/app/collection/page.tsx"), "utf8");
        const publicCollectionView = readFileSync(join(import.meta.dir, "../src/components/profile/PublicCollectionView.tsx"), "utf8");
        const binderModal = readFileSync(join(import.meta.dir, "../src/components/modal/BinderSlotSelectModal.tsx"), "utf8");
        const cardSearchModal = readFileSync(join(import.meta.dir, "../src/components/modal/CardSearchModal.tsx"), "utf8");

        expect(collectionPage).toContain("rarityFilter} onChange={setRarityFilter} options={RARITY_FILTER_OPTIONS} icon={<Gem size={13} />}");
        expect(collectionPage).toContain("variantFilter} onChange={setVariantFilter} options={VARIANT_FILTER_OPTIONS} icon={<Sparkles size={13} />}");

        expect(publicCollectionView).toContain("rarityFilter} onChange={setRarityFilter} options={RARITY_FILTER_OPTIONS} icon={<Gem size={13} />}");
        expect(publicCollectionView).toContain("variantFilter} onChange={setVariantFilter} options={VARIANT_FILTER_OPTIONS} icon={<Sparkles size={13} />}");

        expect(binderModal).toContain("rarityFilter} onChange={setRarityFilter} options={RARITY_FILTER_OPTIONS} icon={<Gem size={13} />}");
        expect(binderModal).toContain("variantFilter} onChange={setVariantFilter} options={VARIANT_FILTER_OPTIONS} icon={<Sparkles size={13} />}");

        expect(cardSearchModal).toContain("rarityFilter} onChange={setRarityFilter} options={RARITY_FILTER_OPTIONS} icon={<Gem size={13} />}");
    });
});
