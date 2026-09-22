import { isFullArtRarity } from "@/lib/pokemon/rarity";
import type { CardShineMode, CardVariant, CardVariantsFlags } from "@/types/binder";

export const CARD_VARIANT_OPTIONS: Array<{ value: CardVariant; label: string }> = [
    { value: "normal", label: "Normal" },
    { value: "holo", label: "Holo" },
    { value: "reverse", label: "Reverse" },
];

/** Always offered in UI — TCGdex variants flags are incomplete for many sets. */
export const ALL_CARD_VARIANTS: CardVariant[] = ["normal", "holo", "reverse"];

const VARIANT_PRIORITY: CardVariant[] = ALL_CARD_VARIANTS;

export function isCardVariant(value: unknown): value is CardVariant {
    return value === "normal" || value === "holo" || value === "reverse";
}

export function normalizeVariantsFlags(flags?: Partial<CardVariantsFlags> | null): CardVariantsFlags {
    return {
        normal: Boolean(flags?.normal),
        holo: Boolean(flags?.holo),
        reverse: Boolean(flags?.reverse),
    };
}

/** Suggested finishes from TCGdex flags (may be incomplete). Prefer ALL_CARD_VARIANTS for UI options. */
export function getAvailableVariants(flags?: Partial<CardVariantsFlags> | null): CardVariant[] {
    const normalized = normalizeVariantsFlags(flags);
    const available = VARIANT_PRIORITY.filter((variant) => normalized[variant]);
    return available.length > 0 ? available : ["normal"];
}

/** Default finish for new cards: prefer API suggestion, else normal. */
export function defaultVariant(flags?: Partial<CardVariantsFlags> | null): CardVariant {
    return getAvailableVariants(flags)[0];
}

export function formatVariantLabel(variant?: CardVariant | string | null): string {
    if (variant === "holo") return "Holo";
    if (variant === "reverse") return "Reverse";
    return "Normal";
}

export function resolveCardShine(variant?: CardVariant | string | null, rarity?: string | null): CardShineMode {
    if (isFullArtRarity(rarity)) {
        return "prismatic";
    }
    if (variant === "holo" || variant === "reverse") {
        return "foil";
    }
    return "none";
}

export function cardCopyGroupKey(card: { tcgdex_card_id: string; card_language: string; card_variant?: string | null }): string {
    const variant = isCardVariant(card.card_variant) ? card.card_variant : "normal";
    return `${card.tcgdex_card_id}_${card.card_language}_${variant}`;
}
