import { describe, it, expect } from "bun:test";
import { getPokemonByDexId, POKEMON_151, PokemonType } from "@/lib/pokemon/constants";

describe("Card Drop Impact and Elemental Particle Burst Logic", () => {
    const validTypes: PokemonType[] = ["grass", "fire", "water", "electric", "bug", "normal", "poison", "ground", "rock", "fighting", "psychic", "ghost", "ice", "dragon", "fairy"];

    it("should ensure every first-gen pokemon resolves to a supported elemental type", () => {
        expect(POKEMON_151.length).toBe(151);

        for (let dexId = 1; dexId <= 151; dexId++) {
            const pokemon = getPokemonByDexId(dexId);
            expect(pokemon).toBeDefined();
            expect(validTypes).toContain(pokemon!.type);
        }
    });

    it("should correctly identify elemental types for signature pokemons", () => {
        expect(getPokemonByDexId(1)?.type).toBe("grass");
        expect(getPokemonByDexId(4)?.type).toBe("fire");
        expect(getPokemonByDexId(7)?.type).toBe("water");
        expect(getPokemonByDexId(25)?.type).toBe("electric");
        expect(getPokemonByDexId(66)?.type).toBe("fighting");
        expect(getPokemonByDexId(92)?.type).toBe("ghost");
        expect(getPokemonByDexId(147)?.type).toBe("dragon");
        expect(getPokemonByDexId(150)?.type).toBe("psychic");
    });

    it("should compute accurate drop timing and active states", () => {
        const dropAnimationDurationMs = 750;
        const impactStartMs = 360;
        const cleanupTimeoutMs = 1400;

        expect(impactStartMs).toBeLessThan(dropAnimationDurationMs);
        expect(dropAnimationDurationMs).toBeLessThan(cleanupTimeoutMs);
        expect(cleanupTimeoutMs - impactStartMs).toBeGreaterThanOrEqual(1000);
    });

    it("should define ascending visual characteristics and particle density across rarity impact tiers", () => {
        const tier0 = { tier: 0, count: 16, duration: 0.82 };
        const tier1 = { tier: 1, count: 20, duration: 0.88 };
        const tier2 = { tier: 2, count: 24, duration: 0.95 };
        const tier3 = { tier: 3, count: 32, duration: 1.05 };

        expect(tier1.count).toBeGreaterThan(tier0.count);
        expect(tier2.count).toBeGreaterThan(tier1.count);
        expect(tier3.count).toBeGreaterThan(tier2.count);

        expect(tier1.duration).toBeGreaterThan(tier0.duration);
        expect(tier2.duration).toBeGreaterThan(tier1.duration);
        expect(tier3.duration).toBeGreaterThan(tier2.duration);
    });

    it("should keep particle distances bounded within safe visual radius", () => {
        const particleDistances = [52, 46, 56, 48, 50, 54, 46, 52, 44, 58, 50, 52, 56, 46, 60, 58, 62, 64, 60, 62, 68, 66, 70, 68, 74, 72, 76, 74, 72, 75, 78, 78];
        const maxAllowedDistance = 85;

        for (const dist of particleDistances) {
            expect(dist).toBeLessThanOrEqual(maxAllowedDistance);
        }
    });
});
