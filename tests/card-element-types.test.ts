import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { CARD_ELEMENT_TYPES, isValidCardElementTypes, normalizeCardElementTypes, resolveCardElementTypes } from "@/lib/pokemon/cardTypes";

describe("Tipos elementais das cartas", () => {
    it("normaliza os nomes usados pela TCGdex e aliases conhecidos", () => {
        expect(normalizeCardElementTypes(["Fire"])).toEqual(["Fire"]);
        expect(normalizeCardElementTypes(["electric", "steel"])).toEqual(["Lightning", "Metal"]);
        expect(normalizeCardElementTypes(["Water", "Water", "invalid"])).toEqual(["Water"]);
    });

    it("valida no máximo dois tipos oficiais e sem duplicidade", () => {
        expect(isValidCardElementTypes(["Fire"])).toBe(true);
        expect(isValidCardElementTypes(["Dragon", "Metal"])).toBe(true);
        expect(isValidCardElementTypes(["Water", "Water"])).toBe(false);
        expect(isValidCardElementTypes(["Fire", "Water", "Grass"])).toBe(false);
        expect(isValidCardElementTypes(["Electric"])).toBe(false);
    });

    it("usa o tipo do Pokémon como compatibilidade para cartas antigas", () => {
        expect(resolveCardElementTypes([], 4)).toEqual(["Fire"]);
        expect(resolveCardElementTypes(undefined, 7)).toEqual(["Water"]);
        expect(resolveCardElementTypes([], 25)).toEqual(["Lightning"]);
        expect(resolveCardElementTypes([], 95)).toEqual(["Fighting"]);
    });

    it("mantém todos os tipos oficiais na página de validação", () => {
        const page = readFileSync(join(import.meta.dir, "../src/app/teste/reverse-foil/page.tsx"), "utf8");
        const pattern = readFileSync(join(import.meta.dir, "../src/components/ui/CardElementPattern.tsx"), "utf8");

        for (const type of CARD_ELEMENT_TYPES) {
            expect(page).toContain(`type: "${type}"`);
            expect(pattern).toContain(`type === "${type}"`);
        }
        expect(page).toContain('shineMode="foil"');
        expect(page).toContain("elementTypes={[card.type]}");
    });
});
