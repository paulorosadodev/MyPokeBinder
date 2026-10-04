import type { BinderSlot } from "@/types/binder";

export type AvailableCounts = Record<number, number>;

export interface AvailableCardSource {
    pokemon_dex_id: number | null;
}

export function buildAvailableCounts(cards: Iterable<AvailableCardSource>): AvailableCounts {
    const counts: AvailableCounts = {};
    for (const card of cards) {
        if (card.pokemon_dex_id == null) continue;
        counts[card.pokemon_dex_id] = (counts[card.pokemon_dex_id] ?? 0) + 1;
    }
    return counts;
}

export function getSlotAvailableCount(slot: Pick<BinderSlot, "slot_type" | "target_dex_id">, availableCounts: AvailableCounts): number {
    if (slot.slot_type !== "pokemon" || slot.target_dex_id == null) return 0;
    return availableCounts[slot.target_dex_id] ?? 0;
}

export function shiftAvailableCount(counts: AvailableCounts, pokemonDexId: number | null, delta: 1 | -1): AvailableCounts {
    if (pokemonDexId == null) return counts;

    const next = Math.max(0, (counts[pokemonDexId] ?? 0) + delta);
    return { ...counts, [pokemonDexId]: next };
}

export function describeAvailableCards(availableCount: number): string {
    return `${availableCount} ${availableCount > 1 ? "cartas disponíveis" : "carta disponível"} na coleção`;
}
