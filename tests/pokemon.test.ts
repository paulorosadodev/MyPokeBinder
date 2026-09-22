import { describe, it, expect } from "bun:test";
import { POKEMON_151, getPokemonByDexId, getSpreadForDexId, getMobilePageForDexId, getPageForDexId, getDesktopSpreadPages, getPokemonSilhouetteUrl, getPokemonBoxIconUrl, getPokemonGeneration, getPokemonGlowColors, TOTAL_PAGES, loadedSilhouetteCache, markSilhouetteLoaded, isSilhouetteLoaded } from "../src/lib/pokemon/constants";

describe("Pokemon 151 Constants and Helpers", () => {
    it("should contain exactly 151 pokemons", () => {
        expect(POKEMON_151.length).toBe(151);
    });

    it("should have Bulbasaur at index 1 and Mew at index 151", () => {
        const bulbasaur = getPokemonByDexId(1);
        expect(bulbasaur).toBeDefined();
        expect(bulbasaur?.name).toBe("Bulbasaur");
        expect(bulbasaur?.type).toBe("grass");

        const mew = getPokemonByDexId(151);
        expect(mew).toBeDefined();
        expect(mew?.name).toBe("Mew");
        expect(mew?.type).toBe("psychic");
    });

    it("should return correct glow colors for elemental types", () => {
        const grassColors = getPokemonGlowColors(1);
        expect(grassColors.ring).toBe("#22c55e");

        const fireColors = getPokemonGlowColors(4);
        expect(fireColors.ring).toBe("#f97316");

        const waterColors = getPokemonGlowColors(7);
        expect(waterColors.ring).toBe("#38bdf8");

        const electricColors = getPokemonGlowColors(25);
        expect(electricColors.ring).toBe("#eab308");
    });

    it("should calculate correct spreads for 18-slot spreads", () => {
        expect(getSpreadForDexId(1)).toBe(1);
        expect(getSpreadForDexId(18)).toBe(1);
        expect(getSpreadForDexId(19)).toBe(2);
        expect(getSpreadForDexId(151)).toBe(9);
    });

    it("should calculate correct mobile pages for 9-slot pages", () => {
        expect(getMobilePageForDexId(1)).toBe(1);
        expect(getMobilePageForDexId(9)).toBe(1);
        expect(getMobilePageForDexId(10)).toBe(2);
        expect(getMobilePageForDexId(151)).toBe(17);
    });

    it("should calculate real page number for any dex id up to 17 pages", () => {
        expect(TOTAL_PAGES).toBe(17);
        expect(getPageForDexId(1)).toBe(1);
        expect(getPageForDexId(9)).toBe(1);
        expect(getPageForDexId(10)).toBe(2);
        expect(getPageForDexId(18)).toBe(2);
        expect(getPageForDexId(19)).toBe(3);
        expect(getPageForDexId(151)).toBe(17);
    });

    it("should calculate paired desktop spread pages correctly", () => {
        expect(getDesktopSpreadPages(1)).toEqual([1, null]);
        expect(getDesktopSpreadPages(2)).toEqual([2, 3]);
        expect(getDesktopSpreadPages(3)).toEqual([2, 3]);
        expect(getDesktopSpreadPages(4)).toEqual([4, 5]);
        expect(getDesktopSpreadPages(14)).toEqual([14, 15]);
        expect(getDesktopSpreadPages(15)).toEqual([14, 15]);
        expect(getDesktopSpreadPages(16)).toEqual([16, 17]);
        expect(getDesktopSpreadPages(17)).toEqual([16, 17]);
    });

    it("should resolve high-resolution PC box icon URLs (gen VIII icons for gens 1–8)", () => {
        const gen8Icon = (id: number) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${id}.png`;
        expect(getPokemonBoxIconUrl(25)).toBe(gen8Icon(25));
        expect(getPokemonBoxIconUrl(384)).toBe(gen8Icon(384));
        expect(getPokemonBoxIconUrl(494)).toBe(gen8Icon(494));
        expect(getPokemonBoxIconUrl(722)).toBe(gen8Icon(722));
    });

    it("should generate valid official artwork url with generation subfolders", () => {
        expect(getPokemonSilhouetteUrl(25)).toBe("/pokemon/gen1/25.png");
        expect(getPokemonSilhouetteUrl(152)).toBe("/pokemon/gen2/152.png");
        expect(getPokemonSilhouetteUrl(252)).toBe("/pokemon/gen3/252.png");
        expect(getPokemonSilhouetteUrl(387)).toBe("/pokemon/gen4/387.png");
        expect(getPokemonSilhouetteUrl(494)).toBe("/pokemon/gen5/494.png");
        expect(getPokemonSilhouetteUrl(650)).toBe("/pokemon/gen6/650.png");
        expect(getPokemonSilhouetteUrl(722)).toBe("/pokemon/gen7/722.png");
        expect(getPokemonSilhouetteUrl(810)).toBe("/pokemon/gen8/810.png");
        expect(getPokemonSilhouetteUrl(1025)).toBe("/pokemon/gen9/1025.png");
    });

    it("should accurately resolve pokemon generation for all 9 generations", () => {
        expect(getPokemonGeneration(1)).toBe(1);
        expect(getPokemonGeneration(151)).toBe(1);
        expect(getPokemonGeneration(152)).toBe(2);
        expect(getPokemonGeneration(251)).toBe(2);
        expect(getPokemonGeneration(252)).toBe(3);
        expect(getPokemonGeneration(386)).toBe(3);
        expect(getPokemonGeneration(387)).toBe(4);
        expect(getPokemonGeneration(493)).toBe(4);
        expect(getPokemonGeneration(494)).toBe(5);
        expect(getPokemonGeneration(649)).toBe(5);
        expect(getPokemonGeneration(650)).toBe(6);
        expect(getPokemonGeneration(721)).toBe(6);
        expect(getPokemonGeneration(722)).toBe(7);
        expect(getPokemonGeneration(809)).toBe(7);
        expect(getPokemonGeneration(810)).toBe(8);
        expect(getPokemonGeneration(905)).toBe(8);
        expect(getPokemonGeneration(906)).toBe(9);
        expect(getPokemonGeneration(1025)).toBe(9);
        expect(getPokemonGeneration(1026)).toBeNull();
        expect(getPokemonGeneration(0)).toBeNull();
        expect(getPokemonGeneration(-5)).toBeNull();
    });

    it("should fallback to PokeAPI when dexId is outside local generations or uncataloged", () => {
        expect(getPokemonSilhouetteUrl(1026)).toBe("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1026.png");
        expect(getPokemonSilhouetteUrl(0)).toBe("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/0.png");
    });

    it("should track loaded silhouettes in shared cache across navigation", () => {
        expect(isSilhouetteLoaded(9999)).toBe(false);
        markSilhouetteLoaded(9999);
        expect(isSilhouetteLoaded(9999)).toBe(true);
        expect(loadedSilhouetteCache.has(9999)).toBe(true);
        loadedSilhouetteCache.delete(9999);
    });
});
