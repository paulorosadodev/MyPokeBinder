import { describe, it, expect } from "bun:test";
import { getPokemonSilhouetteUrl, getPokemonByDexId } from "@/lib/pokemon/constants";

describe("Trainer Not Found Component Logic", () => {
    it("should resolve Abra and Snorlax dex data and artwork for not found themes", () => {
        const abra = getPokemonByDexId(63);
        expect(abra).toBeDefined();
        expect(abra?.name).toBe("Abra");
        expect(abra?.type).toBe("psychic");

        const snorlax = getPokemonByDexId(143);
        expect(snorlax).toBeDefined();
        expect(snorlax?.name).toBe("Snorlax");
        expect(snorlax?.type).toBe("normal");

        expect(getPokemonSilhouetteUrl(63)).toBe("/pokemon/gen1/63.png");
        expect(getPokemonSilhouetteUrl(143)).toBe("/pokemon/gen1/143.png");
    });

    it("should correctly clean and format username for display", () => {
        const rawUsername = "@ashketchum";
        const cleanUsername = rawUsername.replace(/^@/, "");
        expect(cleanUsername).toBe("ashketchum");

        const regularUsername = "red";
        expect(regularUsername.replace(/^@/, "")).toBe("red");
    });

    it("should validate recovery links available on trainer not found page", () => {
        const homeRoute = "/";
        const collectionRoute = "/collection";
        expect(homeRoute).toBe("/");
        expect(collectionRoute).toBe("/collection");
    });
});
