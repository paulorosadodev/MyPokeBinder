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
        expect(resolveCardShine("normal", "Radiant Rare")).toBe("prismatic");

        for (const rarity of ["Illustration rare", "Special illustration rare", "Ultra Rare", "Hyper rare", "Secret Rare"]) {
            expect(resolveCardShine("normal", rarity)).toBe("prismatic");
            expect(resolveCardShine("holo", rarity)).toBe("prismatic");
            expect(resolveCardShine("reverse", rarity)).toBe("prismatic");
        }
    });

    it("builds copy group keys including variant", () => {
        expect(
            cardCopyGroupKey({
                tcgdex_card_id: "swsh3-136",
                card_language: "pt-br",
                card_variant: "reverse",
            }),
        ).toBe("swsh3-136_pt-br_reverse");

        expect(
            cardCopyGroupKey({
                tcgdex_card_id: "swsh3-136",
                card_language: "en",
                card_variant: null,
            }),
        ).toBe("swsh3-136_en_normal");
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
