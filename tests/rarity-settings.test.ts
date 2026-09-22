import { describe, it, expect, beforeEach } from "bun:test";
import { getRarityImpactTier, formatRarityLabel, getRarityBadgeStyle, RARITY_FILTER_OPTIONS } from "../src/lib/pokemon/rarity";
import { setSoundMuted, isSoundMuted, playCardDropSound } from "../src/lib/audio/cardSounds";
import { THEME_PRESETS } from "../src/lib/context/UserSettingsContext";

describe("Rarity Tiers and Badge Style Logic", () => {
    it("should correctly classify Tier 3 supreme/mythic rarities", () => {
        expect(getRarityImpactTier("Special illustration rare")).toBe(3);
        expect(getRarityImpactTier("Hyper rare")).toBe(3);
        expect(getRarityImpactTier("Secret Rare")).toBe(3);
    });

    it("should correctly classify Tier 2 special rarities", () => {
        expect(getRarityImpactTier("Illustration rare")).toBe(2);
        expect(getRarityImpactTier("Ultra Rare")).toBe(2);
        expect(getRarityImpactTier("Full Art Trainer")).toBe(2);
        expect(getRarityImpactTier("Shiny Ultra Rare")).toBe(2);
        expect(getRarityImpactTier("Shiny Rare VMAX")).toBe(2);
    });

    it("should correctly classify Tier 1 enhanced rarities", () => {
        expect(getRarityImpactTier("Double rare")).toBe(1);
    });

    it("should classify standard rarities as Tier 0", () => {
        const standardRarities = ["Common", "Uncommon", "Rare", "Holo Rare", "Rare Holo", "Promo", "", null, undefined];
        standardRarities.forEach((val) => {
            expect(getRarityImpactTier(val as string)).toBe(0);
        });
    });

    it("should format rarity labels appropriately", () => {
        expect(formatRarityLabel("Illustration rare")).toBe("Ilustração Rara");
        expect(formatRarityLabel("Special illustration rare")).toBe("Ilustração Rara Especial");
        expect(formatRarityLabel("Hyper Rare")).toBe("Hiper-rara");
        expect(formatRarityLabel("Ultra Rare")).toBe("Rara Ultra");
        expect(formatRarityLabel("Double Rare")).toBe("Rara Dupla");
        expect(formatRarityLabel("Holo Rare")).toBe("Rara Holográfica");
        expect(formatRarityLabel("Rare")).toBe("Rara");
        expect(formatRarityLabel("Common")).toBe("Comum");
        expect(formatRarityLabel("Uncommon")).toBe("Incomum");
        expect(formatRarityLabel("")).toBe("Comum");
        expect(formatRarityLabel(null)).toBe("Comum");
    });

    it("should return badge styles according to rarity impact tiers", () => {
        const sirStyle = getRarityBadgeStyle("Special illustration rare");
        expect(sirStyle.tier).toBe(3);
        expect(sirStyle.badgeClasses).toContain("text-amber-300");

        const irStyle = getRarityBadgeStyle("Illustration rare");
        expect(irStyle.tier).toBe(2);
        expect(irStyle.badgeClasses).toContain("text-cyan-300");

        const doubleRareStyle = getRarityBadgeStyle("Double rare");
        expect(doubleRareStyle.tier).toBe(1);
        expect(doubleRareStyle.badgeClasses).toContain("text-purple-300");

        const commonStyle = getRarityBadgeStyle("Common");
        expect(commonStyle.tier).toBe(0);
        expect(commonStyle.label).toBe("Comum");
    });

    it("should contain comprehensive filter options for collections", () => {
        expect(RARITY_FILTER_OPTIONS.length).toBeGreaterThanOrEqual(10);
        expect(RARITY_FILTER_OPTIONS[0].value).toBe("all");
    });
});

describe("Audio Muting and Settings Logic", () => {
    beforeEach(() => {
        setSoundMuted(false);
    });

    it("should allow muting and unmuting audio state", () => {
        expect(isSoundMuted()).toBe(false);
        setSoundMuted(true);
        expect(isSoundMuted()).toBe(true);
        setSoundMuted(false);
        expect(isSoundMuted()).toBe(false);
    });

    it("should safely invoke playCardDropSound for all tiers without throwing", () => {
        expect(() => {
            setSoundMuted(true);
            playCardDropSound("electric", 3);
            playCardDropSound("psychic", 2);
            setSoundMuted(false);
            playCardDropSound("water", 1);
            playCardDropSound("grass", 0);
        }).not.toThrow();
    });
});

describe("Theme Presets Configuration", () => {
    it("should contain standard 6 pokemon theme presets with valid hex colors", () => {
        expect(THEME_PRESETS.length).toBe(6);

        THEME_PRESETS.forEach((preset) => {
            expect(preset.color).toMatch(/^#[0-9a-fA-F]{6}$/);
            expect(preset.label.length).toBeGreaterThan(0);
        });

        const ids = THEME_PRESETS.map((p) => p.id);
        expect(ids).toContain("blue");
        expect(ids).toContain("red");
        expect(ids).toContain("purple");
    });

    it("should provide rich pokemon theme metadata for all 6 presets", () => {
        THEME_PRESETS.forEach((preset) => {
            expect(preset.dexId).toBeGreaterThan(0);
            expect(preset.pokemonName.length).toBeGreaterThan(0);
            expect(preset.ballType.length).toBeGreaterThan(0);
            expect(preset.ballName.length).toBeGreaterThan(0);
            expect(preset.type.length).toBeGreaterThan(0);
            expect(preset.description.length).toBeGreaterThan(0);
            expect([0, 1, 2, 3]).toContain(preset.soundTier);
        });
    });
});
