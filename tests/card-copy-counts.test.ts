import { describe, expect, it } from "bun:test";
import { buildCopyGroupKey, countCopiesForCombo, mergeCopyCounts, registerCopy, totalCopies, type CopyCounts } from "../src/lib/collection/copyCounts";
import { isCollectionCardsCacheKey } from "../src/lib/collection/cache";

const BULBASAUR = "base1-44";

describe("quantidade de cópias por grupo idêntico", () => {
    it("agrupa apenas cópias 100% idênticas conforme a regra de agrupamento da Coleção", () => {
        const base = buildCopyGroupKey(BULBASAUR, "pt-br", "normal", "NM");

        expect(buildCopyGroupKey(BULBASAUR, "pt-br", "normal", "NM")).toBe(base);
        expect(buildCopyGroupKey(BULBASAUR, "en", "normal", "NM")).not.toBe(base);
        expect(buildCopyGroupKey(BULBASAUR, "pt-br", "holo", "NM")).not.toBe(base);
        expect(buildCopyGroupKey(BULBASAUR, "pt-br", "normal", "MP")).not.toBe(base);
        expect(buildCopyGroupKey("base2-44", "pt-br", "normal", "NM")).not.toBe(base);
    });

    it("incrementa o contador da cópia idêntica e mantém os demais atributos separados", () => {
        let counts: CopyCounts = registerCopy({}, BULBASAUR, "pt-br", "normal", "NM");
        counts = registerCopy(counts, BULBASAUR, "pt-br", "normal", "NM");
        counts = registerCopy(counts, BULBASAUR, "en", "normal", "NM");

        expect(countCopiesForCombo(counts, BULBASAUR, "pt-br", "normal", "NM")).toBe(2);
        expect(countCopiesForCombo(counts, BULBASAUR, "en", "normal", "NM")).toBe(1);
        expect(countCopiesForCombo(counts, BULBASAUR, "ja", "holo", "D")).toBe(0);
        expect(totalCopies(counts)).toBe(3);
    });

    it("trata a posse como estritamente dependente da configuração selecionada", () => {
        const owned: CopyCounts = { [buildCopyGroupKey(BULBASAUR, "pt-br", "normal", "NM")]: 12 };

        expect(countCopiesForCombo(owned, BULBASAUR, "pt-br", "normal", "NM")).toBe(12);
        expect(countCopiesForCombo(owned, BULBASAUR, "en", "normal", "NM")).toBe(0);
        expect(countCopiesForCombo(owned, BULBASAUR, "pt-br", "normal", "MP")).toBe(0);
        expect(countCopiesForCombo(owned, BULBASAUR, "pt-br", "reverse", "NM")).toBe(0);
    });

    it("soma posse do servidor com os exemplares adicionados na sessão sem perder incrementos", () => {
        const owned: CopyCounts = { [buildCopyGroupKey(BULBASAUR, "pt-br", "normal", "NM")]: 2, [buildCopyGroupKey(BULBASAUR, "en", "holo", "MP")]: 1 };
        const session = registerCopy({}, BULBASAUR, "pt-br", "normal", "NM");

        const total = mergeCopyCounts(owned, session);
        expect(countCopiesForCombo(total, BULBASAUR, "pt-br", "normal", "NM")).toBe(3);
        expect(countCopiesForCombo(total, BULBASAUR, "en", "holo", "MP")).toBe(1);
        expect(countCopiesForCombo(total, BULBASAUR, "ja", "holo", "MP")).toBe(0);
    });
});

describe("chaves do cache da Coleção", () => {
    it("seleciona apenas as listas simples, nunca as páginas agrupadas", () => {
        expect(isCollectionCardsCacheKey("/api/cards")).toBe(true);
        expect(isCollectionCardsCacheKey("/api/cards?pokemon_dex_id=1")).toBe(true);
        expect(isCollectionCardsCacheKey("/api/cards?grouped=true&page=1&limit=36")).toBe(false);
        expect(isCollectionCardsCacheKey("/api/cards/expansions")).toBe(false);
        expect(isCollectionCardsCacheKey("/api/binder")).toBe(false);
        expect(isCollectionCardsCacheKey(42)).toBe(false);
    });
});
