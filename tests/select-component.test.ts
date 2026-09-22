import { describe, it, expect } from "bun:test";
import { SelectOption } from "@/components/ui/Select";
import { BinderStatusFilter } from "@/types/binder";

describe("Custom Select Component Logic and Theme Integration", () => {
    type SortOption = "dex_asc" | "dex_desc" | "recent" | "name_asc";

    const SORT_OPTIONS: SelectOption<SortOption>[] = [
        { value: "dex_asc", label: "Pokédex (#1 - #151)" },
        { value: "dex_desc", label: "Pokédex (#151 - #1)" },
        { value: "recent", label: "Adicionadas recentemente" },
        { value: "name_asc", label: "Nome (A - Z)" },
    ];

    const STATUS_FILTER_OPTIONS: SelectOption<BinderStatusFilter>[] = [
        { value: "all", label: "Todas as Cartas" },
        { value: "in_binder", label: "No Binder" },
        { value: "stored", label: "Guardadas" },
    ];

    const LANGUAGE_FILTER_OPTIONS: SelectOption<string>[] = [
        { value: "all", label: "Todos os Idiomas" },
        { value: "pt-br", label: "Português (PT-BR)" },
        { value: "en", label: "Inglês (EN)" },
        { value: "ja", label: "Japonês (JA)" },
    ];

    it("should accurately resolve active option label and fallback to placeholder", () => {
        const resolveLabel = (val: string, options: SelectOption[], placeholder = "Selecione uma opção") => {
            const found = options.find((opt) => opt.value === val);
            return found ? found.label : placeholder;
        };

        expect(resolveLabel("dex_asc", SORT_OPTIONS)).toBe("Pokédex (#1 - #151)");
        expect(resolveLabel("dex_desc", SORT_OPTIONS)).toBe("Pokédex (#151 - #1)");
        expect(resolveLabel("recent", SORT_OPTIONS)).toBe("Adicionadas recentemente");
        expect(resolveLabel("name_asc", SORT_OPTIONS)).toBe("Nome (A - Z)");
        expect(resolveLabel("unknown", SORT_OPTIONS)).toBe("Selecione uma opção");

        expect(resolveLabel("all", STATUS_FILTER_OPTIONS)).toBe("Todas as Cartas");
        expect(resolveLabel("in_binder", STATUS_FILTER_OPTIONS)).toBe("No Binder");
        expect(resolveLabel("stored", STATUS_FILTER_OPTIONS)).toBe("Guardadas");

        expect(resolveLabel("all", LANGUAGE_FILTER_OPTIONS)).toBe("Todos os Idiomas");
        expect(resolveLabel("pt-br", LANGUAGE_FILTER_OPTIONS)).toBe("Português (PT-BR)");
    });

    it("should calculate correct index for keyboard navigation cycle", () => {
        const getNextIndex = (currentIndex: number, direction: "up" | "down", totalLength: number) => {
            if (direction === "down") {
                return (currentIndex + 1) % totalLength;
            }
            return (currentIndex - 1 + totalLength) % totalLength;
        };

        expect(getNextIndex(0, "down", 4)).toBe(1);
        expect(getNextIndex(3, "down", 4)).toBe(0);
        expect(getNextIndex(0, "up", 4)).toBe(3);
        expect(getNextIndex(2, "up", 4)).toBe(1);
    });

    it("should contain all expected sort options in correct order", () => {
        expect(SORT_OPTIONS).toHaveLength(4);
        expect(SORT_OPTIONS.map((o) => o.value)).toEqual(["dex_asc", "dex_desc", "recent", "name_asc"]);
    });

    it("should filter cards by status filter selection correctly", () => {
        const mockCards = [
            { id: "1", is_in_binder: true },
            { id: "2", is_in_binder: false },
            { id: "3", is_in_binder: true },
        ];

        const filterByStatus = (items: typeof mockCards, status: BinderStatusFilter) => {
            if (status === "in_binder") return items.filter((i) => i.is_in_binder);
            if (status === "stored") return items.filter((i) => !i.is_in_binder);
            return items;
        };

        expect(filterByStatus(mockCards, "all")).toHaveLength(3);
        expect(filterByStatus(mockCards, "in_binder")).toHaveLength(2);
        expect(filterByStatus(mockCards, "stored")).toHaveLength(1);
    });

    it("should sort items accurately according to selected sort option", () => {
        const mockCards = [{ card: { pokemon_dex_id: 25, card_name: "Pikachu", created_at: "2026-01-01T00:00:00Z" } }, { card: { pokemon_dex_id: 1, card_name: "Bulbasaur", created_at: "2026-02-01T00:00:00Z" } }, { card: { pokemon_dex_id: 151, card_name: "Mew", created_at: "2026-03-01T00:00:00Z" } }];

        const sortList = (items: typeof mockCards, option: SortOption) => {
            return [...items].sort((a, b) => {
                if (option === "dex_asc") return a.card.pokemon_dex_id - b.card.pokemon_dex_id;
                if (option === "dex_desc") return b.card.pokemon_dex_id - a.card.pokemon_dex_id;
                if (option === "name_asc") return a.card.card_name.localeCompare(b.card.card_name);
                if (option === "recent") return new Date(b.card.created_at).getTime() - new Date(a.card.created_at).getTime();
                return 0;
            });
        };

        const sortedDexAsc = sortList(mockCards, "dex_asc");
        expect(sortedDexAsc[0].card.pokemon_dex_id).toBe(1);
        expect(sortedDexAsc[2].card.pokemon_dex_id).toBe(151);

        const sortedDexDesc = sortList(mockCards, "dex_desc");
        expect(sortedDexDesc[0].card.pokemon_dex_id).toBe(151);
        expect(sortedDexDesc[2].card.pokemon_dex_id).toBe(1);

        const sortedName = sortList(mockCards, "name_asc");
        expect(sortedName[0].card.card_name).toBe("Bulbasaur");
        expect(sortedName[1].card.card_name).toBe("Mew");
        expect(sortedName[2].card.card_name).toBe("Pikachu");

        const sortedRecent = sortList(mockCards, "recent");
        expect(sortedRecent[0].card.card_name).toBe("Mew");
        expect(sortedRecent[2].card.card_name).toBe("Pikachu");
    });
});
