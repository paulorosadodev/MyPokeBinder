import { describe, it, expect } from "bun:test";
import { THEME_PRESETS } from "../src/lib/context/UserSettingsContext";
import { getPokemonThemeSelectorSpriteUrl } from "../src/lib/pokemon/constants";

describe("Pokemon Theme Selector Logic", () => {
    it("should map every theme preset to a PokeAPI front sprite URL", () => {
        THEME_PRESETS.forEach((preset) => {
            const url = getPokemonThemeSelectorSpriteUrl(preset.dexId);
            expect(url).toMatch(/^https:\/\/raw\.githubusercontent\.com\/PokeAPI\/sprites\/master\/sprites\/pokemon\/\d+\.png$/);
            expect(url.length).toBeGreaterThan(0);
        });
    });

    it("should contain distinct theme colors across all presets", () => {
        const colors = THEME_PRESETS.map((p) => p.color.toLowerCase());
        const uniqueColors = new Set(colors);
        expect(uniqueColors.size).toBe(THEME_PRESETS.length);
    });

    it("should assign each preset to an iconic pokemon and appropriate ball", () => {
        const charizard = THEME_PRESETS.find((p) => p.id === "red");
        expect(charizard).toBeDefined();
        expect(charizard?.pokemonName).toBe("Charizard");
        expect(charizard?.dexId).toBe(6);
        expect(charizard?.ballType).toBe("pokeball");

        const blastoise = THEME_PRESETS.find((p) => p.id === "blue");
        expect(blastoise).toBeDefined();
        expect(blastoise?.label).toBe("Blastoise Blue");
        expect(blastoise?.pokemonName).toBe("Blastoise");
        expect(blastoise?.dexId).toBe(9);
        expect(blastoise?.ballType).toBe("greatball");

        const pikachu = THEME_PRESETS.find((p) => p.id === "amber");
        expect(pikachu).toBeDefined();
        expect(pikachu?.pokemonName).toBe("Pikachu");
        expect(pikachu?.dexId).toBe(25);
        expect(pikachu?.ballType).toBe("ultraball");

        const gengar = THEME_PRESETS.find((p) => p.id === "purple");
        expect(gengar).toBeDefined();
        expect(gengar?.pokemonName).toBe("Gengar");
        expect(gengar?.dexId).toBe(94);
        expect(gengar?.ballType).toBe("masterball");

        const venusaur = THEME_PRESETS.find((p) => p.id === "emerald");
        expect(venusaur).toBeDefined();
        expect(venusaur?.pokemonName).toBe("Venusaur");
        expect(venusaur?.dexId).toBe(3);
        expect(venusaur?.ballType).toBe("safariball");

        const mew = THEME_PRESETS.find((p) => p.id === "pink");
        expect(mew).toBeDefined();
        expect(mew?.pokemonName).toBe("Mew");
        expect(mew?.dexId).toBe(151);
        expect(mew?.ballType).toBe("loveball");
    });

    it("should order theme presets strictly by Pokédex number with Gen 1 starters together first", () => {
        const dexIds = THEME_PRESETS.map((p) => p.dexId);
        expect(dexIds).toEqual([3, 6, 9, 25, 94, 151]);
    });

    it("should resolve correct ball types for known theme colors and fallback to pokeball", async () => {
        const { getBallTypeForTheme } = await import("../src/lib/context/UserSettingsContext");
        expect(getBallTypeForTheme("#ef4444")).toBe("pokeball");
        expect(getBallTypeForTheme("#3b82f6")).toBe("greatball");
        expect(getBallTypeForTheme("#f59e0b")).toBe("ultraball");
        expect(getBallTypeForTheme("#8b5cf6")).toBe("masterball");
        expect(getBallTypeForTheme("#10b981")).toBe("safariball");
        expect(getBallTypeForTheme("#ec4899")).toBe("loveball");
        expect(getBallTypeForTheme("#000000")).toBe("pokeball");
        expect(getBallTypeForTheme("")).toBe("pokeball");
        expect(getBallTypeForTheme(undefined)).toBe("pokeball");
    });
});
