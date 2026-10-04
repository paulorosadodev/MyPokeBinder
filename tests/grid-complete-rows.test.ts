import { describe, expect, it } from "bun:test";
import { getCompleteRowItems } from "../src/lib/hooks/useGridColumnCount";

describe("getCompleteRowItems", () => {
    it("completa a linha em grade de 5 colunas durante carregamento infinito", () => {
        const items36 = Array.from({ length: 36 }, (_, i) => `card-${i + 1}`);

        const resultHasMore = getCompleteRowItems(items36, 5, true);
        expect(resultHasMore).toHaveLength(35);
        expect(resultHasMore.length % 5).toBe(0);

        const resultFinished = getCompleteRowItems(items36, 5, false);
        expect(resultFinished).toHaveLength(36);
    });

    it("mantém todos os itens quando o total já completa linhas inteiras", () => {
        const items36 = Array.from({ length: 36 }, (_, i) => `card-${i + 1}`);

        expect(getCompleteRowItems(items36, 4, true)).toHaveLength(36);
        expect(getCompleteRowItems(items36, 3, true)).toHaveLength(36);
        expect(getCompleteRowItems(items36, 2, true)).toHaveLength(36);
    });

    it("trata itens filtrados truncando apenas para a linha completa anterior", () => {
        const items17 = Array.from({ length: 17 }, (_, i) => `card-${i + 1}`);

        expect(getCompleteRowItems(items17, 5, true)).toHaveLength(15);
        expect(getCompleteRowItems(items17, 4, true)).toHaveLength(16);
        expect(getCompleteRowItems(items17, 3, true)).toHaveLength(15);
        expect(getCompleteRowItems(items17, 2, true)).toHaveLength(16);
    });

    it("não esconde os únicos itens existentes se o total inicial for menor que uma linha", () => {
        const items3 = Array.from({ length: 3 }, (_, i) => `card-${i + 1}`);

        expect(getCompleteRowItems(items3, 5, true)).toHaveLength(3);
    });

    it("retorna lista intacta se colunas for menor ou igual a 1 ou array vazio", () => {
        const items = ["card-1", "card-2"];

        expect(getCompleteRowItems(items, 1, true)).toEqual(items);
        expect(getCompleteRowItems(items, 0, true)).toEqual(items);
        expect(getCompleteRowItems([], 5, true)).toEqual([]);
    });
});
