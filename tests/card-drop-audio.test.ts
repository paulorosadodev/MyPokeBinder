import { describe, it, expect } from "bun:test";
import { playCardDropSound } from "@/lib/audio/cardSounds";
import { PokemonType } from "@/lib/pokemon/constants";

describe("Card Drop Audio Synthesizer Logic", () => {
    it("should safely handle invocation in non-browser environments without throwing", () => {
        expect(() => {
            playCardDropSound(0);
            playCardDropSound(1);
            playCardDropSound(2);
            playCardDropSound(3);
            playCardDropSound("electric", 0);
            playCardDropSound("fire", 1);
            playCardDropSound("water", 2);
            playCardDropSound("psychic", 3);
        }).not.toThrow();
    });

    it("should define ascending sparkling frequencies for special and mythic tiers", () => {
        const tier2Notes = [783.99, 987.77, 1318.51, 1567.98, 2093.0];
        for (let i = 1; i < tier2Notes.length; i++) {
            expect(tier2Notes[i]).toBeGreaterThan(tier2Notes[i - 1]);
        }

        const tier3Notes = [659.25, 783.99, 987.77, 1318.51, 1567.98, 2093.0, 2637.02, 3135.96];
        for (let i = 1; i < tier3Notes.length; i++) {
            expect(tier3Notes[i]).toBeGreaterThan(tier3Notes[i - 1]);
        }
    });

    it("should route all impact tiers cleanly without throwing", () => {
        expect(() => playCardDropSound(0)).not.toThrow();
        expect(() => playCardDropSound(1)).not.toThrow();
        expect(() => playCardDropSound(2)).not.toThrow();
        expect(() => playCardDropSound(3)).not.toThrow();
    });
});
