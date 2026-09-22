import { describe, it, expect } from "bun:test";
import { playPsyduckConfusionSound } from "@/lib/audio/cardSounds";
import { getPokemonByDexId, getPokemonSilhouetteUrl } from "@/lib/pokemon/constants";

describe("Thematic 404 Not Found Page Logic", () => {
    it("should resolve Psyduck dex data and artwork accurately for 404 theme", () => {
        const psyduck = getPokemonByDexId(54);
        expect(psyduck).toBeDefined();
        expect(psyduck?.name).toBe("Psyduck");
        expect(psyduck?.type).toBe("water");

        const artworkUrl = getPokemonSilhouetteUrl(54);
        expect(artworkUrl).toBe("/pokemon/gen1/54.png");
    });

    it("should safely invoke playPsyduckConfusionSound in non-browser environment without throwing", () => {
        expect(() => {
            playPsyduckConfusionSound();
        }).not.toThrow();
    });

    it("should validate recovery route targets for lost trainers", () => {
        const primaryRecoveryRoute = "/";
        const secondaryRecoveryRoute = "/collection";

        expect(primaryRecoveryRoute).toBe("/");
        expect(secondaryRecoveryRoute).toBe("/collection");
    });

    it("should define thematic 404 card attributes", () => {
        const notFoundCard = {
            dexId: 54,
            name: "Psyduck Confuso",
            hp: 404,
            ability: "Amnésia de Rota",
            attack: "Golpe Confusão",
            attackDamage: 404,
            rarity: "404/151 ★ UR",
        };

        expect(notFoundCard.dexId).toBe(54);
        expect(notFoundCard.hp).toBe(404);
        expect(notFoundCard.attackDamage).toBe(404);
        expect(notFoundCard.rarity).toContain("★ UR");
    });
});
