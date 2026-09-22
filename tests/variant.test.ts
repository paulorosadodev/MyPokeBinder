import { describe, it, expect } from "bun:test";
import {
    CARD_VARIANT_OPTIONS,
    cardCopyGroupKey,
    defaultVariant,
    formatVariantLabel,
    getAvailableVariants,
    isCardVariant,
    resolveCardShine,
} from "../src/lib/pokemon/variant";

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
        expect(formatVariantLabel("holo")).toBe("Holo");
        expect(formatVariantLabel("reverse")).toBe("Reverse");
        expect(formatVariantLabel("normal")).toBe("Normal");
        expect(CARD_VARIANT_OPTIONS).toHaveLength(3);
    });

    it("resolves shine modes with Full Art precedence over foil", () => {
        expect(resolveCardShine("normal", "Common")).toBe("none");
        expect(resolveCardShine("holo", "Rare")).toBe("foil");
        expect(resolveCardShine("reverse", "Uncommon")).toBe("foil");
        expect(resolveCardShine("normal", "Illustration rare")).toBe("prismatic");
        expect(resolveCardShine("holo", "Special illustration rare")).toBe("prismatic");
        expect(resolveCardShine("reverse", "Ultra Rare")).toBe("prismatic");
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
});
