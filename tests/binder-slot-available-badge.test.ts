import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { buildAvailableCounts, describeAvailableCards, getSlotAvailableCount, shiftAvailableCount } from "@/lib/binder/availableCounts";

const slot = (overrides: { slot_type?: "free" | "pokemon" | "card"; target_dex_id?: number | null } = {}) => ({
    slot_type: overrides.slot_type ?? ("pokemon" as const),
    target_dex_id: "target_dex_id" in overrides ? (overrides.target_dex_id ?? null) : 25,
});

describe("Badge de carta disponível no slot vazio", () => {
    it("conta apenas as cartas guardadas da coleção por Pokémon", () => {
        expect(buildAvailableCounts([{ pokemon_dex_id: 25 }, { pokemon_dex_id: 25 }, { pokemon_dex_id: 4 }, { pokemon_dex_id: null }])).toEqual({ 25: 2, 4: 1 });
    });

    it("só sinaliza o slot de Pokémon que tem exemplar guardado", () => {
        const counts = { 25: 2 };

        expect(getSlotAvailableCount(slot(), counts)).toBe(2);
        expect(getSlotAvailableCount(slot({ target_dex_id: 7 }), counts)).toBe(0);
        expect(getSlotAvailableCount(slot({ slot_type: "free" }), counts)).toBe(0);
        expect(getSlotAvailableCount(slot({ slot_type: "card" }), counts)).toBe(0);
        expect(getSlotAvailableCount(slot({ target_dex_id: null }), counts)).toBe(0);
    });

    it("desconta ao exibir no binder e devolve ao devolver o exemplar para a coleção", () => {
        const assigned = shiftAvailableCount({ 25: 2 }, 25, -1);
        expect(assigned[25]).toBe(1);

        const released = shiftAvailableCount(assigned, 25, 1);
        expect(released[25]).toBe(2);
    });

    it("nunca deixa a contagem negativa nem mexe em Pokémon ausente", () => {
        expect(shiftAvailableCount({}, 25, -1)[25]).toBe(0);
        expect(shiftAvailableCount({ 4: 1 }, null, 1)).toEqual({ 4: 1 });
    });

    it("descreve a quantidade no singular e no plural", () => {
        expect(describeAvailableCards(1)).toBe("1 carta disponível na coleção");
        expect(describeAvailableCards(3)).toBe("3 cartas disponíveis na coleção");
    });

    it("leva a contagem até o slot universal no desktop e no mobile", () => {
        const bookSource = readFileSync(join(import.meta.dir, "../src/components/binder/UniversalBinderBook.tsx"), "utf8");
        const pageSource = readFileSync(join(import.meta.dir, "../src/components/binder/UniversalBinderViewer.tsx"), "utf8");

        expect(bookSource).toContain("availableCounts={availableCounts}");
        expect(pageSource).toContain("availableCounts={availableCounts}");
        expect(pageSource).toContain("useBinderAvailableCounts(initialAvailableCounts)");
    });

    it("renderiza o ícone de carta guardada em vez do ponto luminoso", () => {
        const universalSource = readFileSync(join(import.meta.dir, "../src/components/binder/UniversalBinderSlot.tsx"), "utf8");
        const legacySource = readFileSync(join(import.meta.dir, "../src/components/binder/BinderSlot.tsx"), "utf8");

        expect(universalSource).toContain("<SlotAvailableBadge availableCount={availableCount} />");
        expect(legacySource).toContain("<SlotAvailableBadge availableCount={availableCount} />");
        expect(universalSource).not.toContain("h-2 w-2 rounded-full bg-[var(--theme-primary)]");
        expect(legacySource).not.toContain("h-2 w-2 rounded-full bg-[var(--theme-primary)]");
    });
});
