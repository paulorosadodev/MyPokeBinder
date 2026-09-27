import { describe, it, expect } from "bun:test";
import { isCardMatchingPokemon } from "../src/lib/pokemon/match";

describe("isCardMatchingPokemon", () => {
    it("should return false for invalid or empty inputs", () => {
        expect(isCardMatchingPokemon("", 151)).toBe(false);
        expect(isCardMatchingPokemon("   ", 151)).toBe(false);
        expect(isCardMatchingPokemon(null, 151)).toBe(false);
        expect(isCardMatchingPokemon(undefined, 151)).toBe(false);
    });

    it("should correctly identify Mew (dexId 151) cards and reject Mewtwo cards", () => {
        expect(isCardMatchingPokemon("Mew", 151)).toBe(true);
        expect(isCardMatchingPokemon("Mew ex", 151)).toBe(true);
        expect(isCardMatchingPokemon("Mew EX", 151)).toBe(true);
        expect(isCardMatchingPokemon("Ancient Mew", 151)).toBe(true);
        expect(isCardMatchingPokemon("Shining Mew", 151)).toBe(true);
        expect(isCardMatchingPokemon("Mew V", 151)).toBe(true);
        expect(isCardMatchingPokemon("Mew VMAX", 151)).toBe(true);
        expect(isCardMatchingPokemon("Mew δ", 151)).toBe(true);
        expect(isCardMatchingPokemon("Mewtwo & Mew GX", 151)).toBe(true);
        expect(isCardMatchingPokemon("Mew & Mewtwo GX", 151)).toBe(true);

        expect(isCardMatchingPokemon("Mewtwo", 151)).toBe(false);
        expect(isCardMatchingPokemon("Mewtwo-EX", 151)).toBe(false);
        expect(isCardMatchingPokemon("Mewtwo V", 151)).toBe(false);
        expect(isCardMatchingPokemon("Mewtwo VSTAR", 151)).toBe(false);
        expect(isCardMatchingPokemon("Mewtwo V-UNION", 151)).toBe(false);
        expect(isCardMatchingPokemon("Rocket’s Mewtwo", 151)).toBe(false);
        expect(isCardMatchingPokemon("Armored Mewtwo", 151)).toBe(false);
    });

    it("should correctly identify Mewtwo (dexId 150) cards and reject Mew-only cards", () => {
        expect(isCardMatchingPokemon("Mewtwo", 150)).toBe(true);
        expect(isCardMatchingPokemon("Mewtwo-EX", 150)).toBe(true);
        expect(isCardMatchingPokemon("Rocket’s Mewtwo", 150)).toBe(true);
        expect(isCardMatchingPokemon("Armored Mewtwo", 150)).toBe(true);
        expect(isCardMatchingPokemon("Mewtwo & Mew GX", 150)).toBe(true);

        expect(isCardMatchingPokemon("Mew", 150)).toBe(false);
        expect(isCardMatchingPokemon("Mew ex", 150)).toBe(false);
        expect(isCardMatchingPokemon("Ancient Mew", 150)).toBe(false);
    });

    it("should correctly separate Pidgey, Pidgeotto, and Pidgeot", () => {
        expect(isCardMatchingPokemon("Pidgey", 16)).toBe(true);
        expect(isCardMatchingPokemon("Pidgeotto", 16)).toBe(false);
        expect(isCardMatchingPokemon("Pidgeot", 16)).toBe(false);

        expect(isCardMatchingPokemon("Pidgeotto", 17)).toBe(true);
        expect(isCardMatchingPokemon("Pidgey", 17)).toBe(false);
        expect(isCardMatchingPokemon("Pidgeot", 17)).toBe(false);

        expect(isCardMatchingPokemon("Pidgeot", 18)).toBe(true);
        expect(isCardMatchingPokemon("Pidgeot-EX", 18)).toBe(true);
        expect(isCardMatchingPokemon("Pidgeotto", 18)).toBe(false);
        expect(isCardMatchingPokemon("Pidgey", 18)).toBe(false);
    });

    it("should correctly separate Slowpoke and Slowbro", () => {
        expect(isCardMatchingPokemon("Slowpoke", 79)).toBe(true);
        expect(isCardMatchingPokemon("Slowbro", 79)).toBe(false);

        expect(isCardMatchingPokemon("Slowbro", 80)).toBe(true);
        expect(isCardMatchingPokemon("Slowpoke", 80)).toBe(false);
    });

    it("should correctly separate Nidoran female and male", () => {
        expect(isCardMatchingPokemon("Nidoran♀", 29)).toBe(true);
        expect(isCardMatchingPokemon("Nidoran", 29)).toBe(true);
        expect(isCardMatchingPokemon("Nidoran♂", 29)).toBe(false);
        expect(isCardMatchingPokemon("Nidorino", 29)).toBe(false);
        expect(isCardMatchingPokemon("Nidoking", 29)).toBe(false);

        expect(isCardMatchingPokemon("Nidoran♂", 32)).toBe(true);
        expect(isCardMatchingPokemon("Nidoran", 32)).toBe(true);
        expect(isCardMatchingPokemon("Nidoran♀", 32)).toBe(false);
        expect(isCardMatchingPokemon("Nidorina", 32)).toBe(false);
        expect(isCardMatchingPokemon("Nidoqueen", 32)).toBe(false);
    });

    it("should correctly match special character names like Farfetch'd and Mr. Mime", () => {
        expect(isCardMatchingPokemon("Farfetch'd", 83)).toBe(true);
        expect(isCardMatchingPokemon("Farfetchd", 83)).toBe(true);
        expect(isCardMatchingPokemon("Galarian Farfetch'd", 83)).toBe(true);

        expect(isCardMatchingPokemon("Mr. Mime", 122)).toBe(true);
        expect(isCardMatchingPokemon("Mr Mime", 122)).toBe(true);
        expect(isCardMatchingPokemon("Galarian Mr. Mime", 122)).toBe(true);
    });
});
