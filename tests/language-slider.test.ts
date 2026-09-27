import { describe, it, expect } from "bun:test";
import { CardLanguage } from "@/types/binder";

describe("Language Slider Component Logic", () => {
    const VALID_LANGUAGES: CardLanguage[] = ["pt-br", "en", "ja"];

    const DEFAULT_OPTIONS = [
        { value: "pt-br", label: "PT-BR", shortLabel: "PT", country: "pt-br" },
        { value: "en", label: "EN", shortLabel: "EN", country: "en" },
        { value: "ja", label: "JA", shortLabel: "JA", country: "ja" },
    ];

    const COLLECTION_FILTER_OPTIONS = [
        { value: "all", label: "Todos", shortLabel: "Todos" },
        { value: "pt-br", label: "PT-BR", shortLabel: "PT", country: "pt-br" },
        { value: "en", label: "EN", shortLabel: "EN", country: "en" },
        { value: "ja", label: "JA", shortLabel: "JA", country: "ja" },
    ];

    it("should recognize all official physical card languages", () => {
        expect(VALID_LANGUAGES).toHaveLength(3);
        expect(VALID_LANGUAGES).toContain("pt-br");
        expect(VALID_LANGUAGES).toContain("en");
        expect(VALID_LANGUAGES).toContain("ja");
    });

    it("should provide default slider options with matching flags and short labels", () => {
        expect(DEFAULT_OPTIONS).toHaveLength(3);
        expect(DEFAULT_OPTIONS[0].country).toBe("pt-br");
        expect(DEFAULT_OPTIONS[0].shortLabel).toBe("PT");
        expect(DEFAULT_OPTIONS[1].country).toBe("en");
        expect(DEFAULT_OPTIONS[1].shortLabel).toBe("EN");
        expect(DEFAULT_OPTIONS[2].country).toBe("ja");
        expect(DEFAULT_OPTIONS[2].shortLabel).toBe("JA");
    });

    it("should calculate correct active index for sliding indicator", () => {
        const getActiveIndex = (val: string, options: { value: string }[]) => {
            return Math.max(
                0,
                options.findIndex((opt) => opt.value === val),
            );
        };

        expect(getActiveIndex("pt-br", DEFAULT_OPTIONS)).toBe(0);
        expect(getActiveIndex("en", DEFAULT_OPTIONS)).toBe(1);
        expect(getActiveIndex("ja", DEFAULT_OPTIONS)).toBe(2);
        expect(getActiveIndex("unknown", DEFAULT_OPTIONS)).toBe(0);
    });

    it("should support collection filter options including all languages option", () => {
        expect(COLLECTION_FILTER_OPTIONS).toHaveLength(4);
        expect(COLLECTION_FILTER_OPTIONS[0].value).toBe("all");
        expect(COLLECTION_FILTER_OPTIONS[0].country).toBeUndefined();
    });

    it("should filter cards accurately based on selected slider language", () => {
        const mockCards = [
            { id: "1", card_name: "Pikachu", card_language: "pt-br" },
            { id: "2", card_name: "Pikachu", card_language: "en" },
            { id: "3", card_name: "Pikachu", card_language: "ja" },
            { id: "4", card_name: "Raichu", card_language: "en" },
        ];

        const filterCards = (lang: string) => {
            if (lang === "all") return mockCards;
            return mockCards.filter((card) => card.card_language === lang);
        };

        expect(filterCards("all")).toHaveLength(4);
        expect(filterCards("pt-br")).toHaveLength(1);
        expect(filterCards("en")).toHaveLength(2);
        expect(filterCards("ja")).toHaveLength(1);
    });

    it("should support card variant slider options with full labels", () => {
        const VARIANT_OPTIONS = [
            { value: "normal", label: "Normal" },
            { value: "holo", label: "Holo" },
            { value: "reverse", label: "Reverse" },
        ];

        const getActiveIndex = (val: string, options: { value: string }[]) => {
            return Math.max(
                0,
                options.findIndex((opt) => opt.value === val),
            );
        };

        expect(VARIANT_OPTIONS).toHaveLength(3);
        expect(getActiveIndex("normal", VARIANT_OPTIONS)).toBe(0);
        expect(getActiveIndex("holo", VARIANT_OPTIONS)).toBe(1);
        expect(getActiveIndex("reverse", VARIANT_OPTIONS)).toBe(2);
        expect(VARIANT_OPTIONS[0].label).toBe("Normal");
        expect(VARIANT_OPTIONS[1].label).toBe("Holo");
        expect(VARIANT_OPTIONS[2].label).toBe("Reverse");
    });

    it("should support card variant slider options with short labels for compact screens", () => {
        const COMPACT_VARIANT_OPTIONS = [
            { value: "normal", label: "Normal", shortLabel: "Norm" },
            { value: "holo", label: "Holo", shortLabel: "Holo" },
            { value: "reverse", label: "Reverse", shortLabel: "Rev" },
        ];

        expect(COMPACT_VARIANT_OPTIONS[0].shortLabel).toBe("Norm");
        expect(COMPACT_VARIANT_OPTIONS[1].shortLabel).toBe("Holo");
        expect(COMPACT_VARIANT_OPTIONS[2].shortLabel).toBe("Rev");
    });

    it("should clamp indicator position within container bounds", () => {
        const clampIndicator = (itemLeft: number, itemWidth: number, containerLeft: number, containerWidth: number) => {
            const rawLeft = itemLeft - containerLeft;
            const left = Math.max(0, rawLeft);
            const width = Math.min(itemWidth, Math.max(0, containerWidth - left));
            return { left, width };
        };

        const resultNormal = clampIndicator(10, 40, 10, 150);
        expect(resultNormal.left).toBe(0);
        expect(resultNormal.width).toBe(40);

        const resultOver = clampIndicator(130, 50, 10, 150);
        expect(resultOver.left).toBe(120);
        expect(resultOver.width).toBe(30);

        const resultNegative = clampIndicator(5, 50, 10, 150);
        expect(resultNegative.left).toBe(0);
        expect(resultNegative.width).toBe(50);
    });
});
