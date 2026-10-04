import { describe, it, expect } from "bun:test";
import { CARD_VARIANT_OPTIONS, VARIANT_SELECT_OPTIONS, cardCopyGroupKey, defaultVariant, formatVariantLabel, getAvailableVariants, isCardVariant, resolveCardShine } from "../src/lib/pokemon/variant";

describe("Card variant helpers", () => {
    it("filters available variants from TCGdex flags in priority order", () => {
        expect(getAvailableVariants({ normal: true, holo: true, reverse: true })).toEqual(["normal", "holo", "reverse"]);
        expect(getAvailableVariants({ normal: false, holo: true, reverse: true })).toEqual(["holo", "reverse"]);
        expect(getAvailableVariants({ normal: false, holo: false, reverse: true })).toEqual(["reverse"]);
    });

    it("falls back to normal when no flags are set", () => {
        expect(getAvailableVariants({})).toEqual(["normal"]);
        expect(getAvailableVariants(null)).toEqual(["normal"]);
        expect(defaultVariant({ holo: true, reverse: true, normal: false })).toBe("holo");
        expect(defaultVariant({ normal: true, holo: true, reverse: false })).toBe("normal");
    });

    it("validates and labels variants", () => {
        expect(isCardVariant("normal")).toBe(true);
        expect(isCardVariant("holo")).toBe(true);
        expect(isCardVariant("reverse")).toBe(true);
        expect(isCardVariant("cosmos")).toBe(false);
        expect(formatVariantLabel("holo")).toBe("Foil");
        expect(formatVariantLabel("reverse")).toBe("Reverse Foil");
        expect(formatVariantLabel("normal")).toBe("Normal");
        expect(CARD_VARIANT_OPTIONS).toEqual([
            { value: "normal", label: "Normal" },
            { value: "holo", label: "Foil" },
            { value: "reverse", label: "Reverse Foil" },
        ]);
    });

    it("resolves shine modes with Full Art rarity precedence in first place", () => {
        expect(resolveCardShine("normal", "Common")).toBe("none");
        expect(resolveCardShine("holo", "Rare")).toBe("holo");
        expect(resolveCardShine("reverse", "Uncommon")).toBe("foil");
        expect(resolveCardShine("normal", "Illustration rare")).toBe("prismatic");
        expect(resolveCardShine("holo", "Special illustration rare")).toBe("prismatic");
        expect(resolveCardShine("reverse", "Ultra Rare")).toBe("prismatic");
        expect(resolveCardShine("normal", "Double rare")).toBe("prismatic");
        expect(resolveCardShine("normal", "Rare Holo VMAX")).toBe("prismatic");
        expect(resolveCardShine("normal", "Rare V")).toBe("prismatic");
        expect(resolveCardShine("normal", "Rara V")).toBe("prismatic");
        expect(resolveCardShine("normal", "V")).toBe("prismatic");
        expect(resolveCardShine("normal", "Rare Holo", undefined, "Pikachu V")).toBe("prismatic");
        expect(resolveCardShine("holo", "Rare", undefined, "Charizard V")).toBe("prismatic");
        expect(resolveCardShine("normal", "Promo", undefined, "Zacian V")).toBe("prismatic");
        expect(resolveCardShine("normal", "Rare Holo", undefined, "Rayquaza VMAX")).toBe("prismatic");
        expect(resolveCardShine("normal", "Rare", undefined, "Arceus VSTAR")).toBe("prismatic");
        expect(resolveCardShine("normal", "Rare", undefined, "Mewtwo V-UNION")).toBe("prismatic");
        expect(resolveCardShine("normal", "Promo", undefined, "Venusaur EX")).toBe("prismatic");
        expect(resolveCardShine("normal", "Promo", undefined, "Charizard ex")).toBe("prismatic");
        expect(resolveCardShine("normal", "Promo", undefined, "Mewtwo-EX")).toBe("prismatic");
        expect(resolveCardShine("normal", "Promo", undefined, "Mewtwo GX")).toBe("prismatic");
        expect(resolveCardShine("normal", "Promo", undefined, "Bulbasaur")).toBe("none");
        expect(resolveCardShine("normal", "Radiant Rare")).toBe("prismatic");

        for (const rarity of ["Illustration rare", "Special illustration rare", "Ultra Rare", "Hyper rare", "Secret Rare", "Rare V", "Rara V", "V"]) {
            expect(resolveCardShine("normal", rarity)).toBe("prismatic");
            expect(resolveCardShine("holo", rarity)).toBe("prismatic");
            expect(resolveCardShine("reverse", rarity)).toBe("prismatic");
        }
    });

    it("returns none for shine mode when card image is the card back or missing", () => {
        expect(resolveCardShine("holo", "Rare", "/pokemon-card-back.png")).toBe("none");
        expect(resolveCardShine("reverse", "Uncommon", "/pokemon-card-back.png")).toBe("none");
        expect(resolveCardShine("normal", "Illustration rare", "/pokemon-card-back.png")).toBe("none");
        expect(resolveCardShine("holo", "Rare", "")).toBe("none");
        expect(resolveCardShine("holo", "Rare", null)).toBe("none");
        expect(resolveCardShine("holo", "Rare", "https://assets.tcgdex.net/en/base/base1/44/high.webp")).toBe("holo");
    });

    it("builds copy group keys including variant and condition", () => {
        expect(
            cardCopyGroupKey({
                tcgdex_card_id: "swsh3-136",
                card_language: "pt-br",
                card_variant: "reverse",
                card_condition: "NM",
            }),
        ).toBe("swsh3-136_pt-br_reverse_NM");

        expect(
            cardCopyGroupKey({
                tcgdex_card_id: "swsh3-136",
                card_language: "en",
                card_variant: null,
                card_condition: "D",
            }),
        ).toBe("swsh3-136_en_normal_D");

        expect(
            cardCopyGroupKey({
                tcgdex_card_id: "swsh3-136",
                card_language: "en",
                card_variant: "normal",
            }),
        ).toBe("swsh3-136_en_normal_NM");
    });

    it("provides variant select options with badge styling", () => {
        expect(VARIANT_SELECT_OPTIONS.map((opt) => opt.value)).toEqual(["normal", "holo", "reverse"]);
        const foilOption = VARIANT_SELECT_OPTIONS.find((opt) => opt.value === "holo");
        expect(foilOption?.triggerClassName).toContain("border-amber-500");
        expect(foilOption?.triggerClassName).toContain("text-amber-200");
        const reverseOption = VARIANT_SELECT_OPTIONS.find((opt) => opt.value === "reverse");
        expect(reverseOption?.triggerClassName).toContain("border-cyan-500");
        expect(reverseOption?.triggerClassName).toContain("text-cyan-200");
        const normalOption = VARIANT_SELECT_OPTIONS.find((opt) => opt.value === "normal");
        expect(normalOption?.triggerClassName).toContain("border-slate-500");
        expect(normalOption?.triggerClassName).toContain("text-slate-200");
    });
});
