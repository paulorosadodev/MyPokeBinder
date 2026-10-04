import { cardCopyGroupKey } from "@/lib/pokemon/variant";
import type { CardCondition, CardLanguage, CardVariant } from "@/types/binder";

export type CopyCounts = Record<string, number>;

export function buildCopyGroupKey(cardId: string, lang: CardLanguage, variant: CardVariant, condition: CardCondition): string {
    return cardCopyGroupKey({ tcgdex_card_id: cardId, card_language: lang, card_variant: variant, card_condition: condition });
}

export function countCopiesForCombo(counts: CopyCounts, cardId: string, lang: CardLanguage, variant: CardVariant, condition: CardCondition): number {
    return counts[buildCopyGroupKey(cardId, lang, variant, condition)] ?? 0;
}

export function registerCopy(counts: CopyCounts, cardId: string, lang: CardLanguage, variant: CardVariant, condition: CardCondition): CopyCounts {
    const key = buildCopyGroupKey(cardId, lang, variant, condition);
    return { ...counts, [key]: (counts[key] ?? 0) + 1 };
}

export function unregisterCopy(counts: CopyCounts, cardId: string, lang: CardLanguage, variant: CardVariant, condition: CardCondition): CopyCounts {
    const key = buildCopyGroupKey(cardId, lang, variant, condition);
    const current = counts[key] ?? 0;
    if (current <= 1) {
        const next = { ...counts };
        delete next[key];
        return next;
    }
    return { ...counts, [key]: current - 1 };
}

export function mergeCopyCounts(...sources: CopyCounts[]): CopyCounts {
    const merged: CopyCounts = {};
    for (const source of sources) {
        for (const [key, count] of Object.entries(source)) merged[key] = (merged[key] ?? 0) + count;
    }
    return merged;
}

export function totalCopies(counts: CopyCounts): number {
    let total = 0;
    for (const count of Object.values(counts)) total += count;
    return total;
}
