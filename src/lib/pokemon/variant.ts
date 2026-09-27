import React from "react";
import { Circle, Sparkles, RefreshCw } from "lucide-react";
import { isFullArtRarity } from "@/lib/pokemon/rarity";
import type { CardShineMode, CardVariant, CardVariantsFlags } from "@/types/binder";
import type { SelectOption } from "@/components/ui/Select";
import type { LanguageSliderOption } from "@/components/ui/LanguageSlider";

export const CARD_VARIANT_OPTIONS: Array<{ value: CardVariant; label: string }> = [
    { value: "normal", label: "Normal" },
    { value: "holo", label: "Foil" },
    { value: "reverse", label: "Reverse Foil" },
];

export const VARIANT_SELECT_OPTIONS: SelectOption<CardVariant>[] = [
    {
        value: "normal",
        label: "Normal",
        icon: React.createElement(Circle, { size: 13, strokeWidth: 2.25, className: "text-slate-300" }),
        triggerClassName: "border-slate-500/40 bg-slate-500/15 text-slate-200 hover:border-slate-500/60 hover:bg-slate-500/20",
        className: "border-transparent text-slate-300 font-medium hover:border-slate-500/40 hover:bg-slate-500/15 hover:text-slate-100",
        selectedClassName: "border-slate-500/50 bg-slate-500/25 font-bold text-slate-100 shadow-[0_0_10px_rgba(148,163,184,0.15)]",
        checkClassName: "text-slate-200",
    },
    {
        value: "holo",
        label: "Foil",
        icon: React.createElement(Sparkles, { size: 13, strokeWidth: 2.25, className: "text-amber-300" }),
        triggerClassName: "border-amber-500/40 bg-amber-500/15 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.2)] hover:border-amber-500/60 hover:bg-amber-500/20",
        className: "border-transparent text-slate-300 font-medium hover:border-amber-500/40 hover:bg-amber-500/15 hover:text-amber-200",
        selectedClassName: "border-amber-500/50 bg-amber-500/25 font-bold text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.3)]",
        checkClassName: "text-amber-300",
    },
    {
        value: "reverse",
        label: "Reverse Foil",
        icon: React.createElement(RefreshCw, { size: 13, strokeWidth: 2.25, className: "text-cyan-300" }),
        triggerClassName: "border-cyan-500/40 bg-cyan-500/15 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.2)] hover:border-cyan-500/60 hover:bg-cyan-500/20",
        className: "border-transparent text-slate-300 font-medium hover:border-cyan-500/40 hover:bg-cyan-500/15 hover:text-cyan-200",
        selectedClassName: "border-cyan-500/50 bg-cyan-500/25 font-bold text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.3)]",
        checkClassName: "text-cyan-300",
    },
];

export const VARIANT_FILTER_OPTIONS: Array<SelectOption<string>> = [
    { value: "all", label: "Todas as versões" },
    {
        value: "normal",
        label: "Normal",
        icon: React.createElement(Circle, { size: 13, strokeWidth: 2.25, className: "text-slate-300" }),
        triggerClassName: "border-slate-500/40 bg-slate-500/15 text-slate-200 hover:border-slate-500/60 hover:bg-slate-500/20",
        className: "border-transparent text-slate-300 font-medium hover:border-slate-500/40 hover:bg-slate-500/15 hover:text-slate-100",
        selectedClassName: "border-slate-500/50 bg-slate-500/25 font-bold text-slate-100 shadow-[0_0_10px_rgba(148,163,184,0.15)]",
        checkClassName: "text-slate-200",
    },
    {
        value: "holo",
        label: "Foil",
        icon: React.createElement(Sparkles, { size: 13, strokeWidth: 2.25, className: "text-amber-300" }),
        triggerClassName: "border-amber-500/40 bg-amber-500/15 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.2)] hover:border-amber-500/60 hover:bg-amber-500/20",
        className: "border-transparent text-slate-300 font-medium hover:border-amber-500/40 hover:bg-amber-500/15 hover:text-amber-200",
        selectedClassName: "border-amber-500/50 bg-amber-500/25 font-bold text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.3)]",
        checkClassName: "text-amber-300",
    },
    {
        value: "reverse",
        label: "Reverse Foil",
        icon: React.createElement(RefreshCw, { size: 13, strokeWidth: 2.25, className: "text-cyan-300" }),
        triggerClassName: "border-cyan-500/40 bg-cyan-500/15 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.2)] hover:border-cyan-500/60 hover:bg-cyan-500/20",
        className: "border-transparent text-slate-300 font-medium hover:border-cyan-500/40 hover:bg-cyan-500/15 hover:text-cyan-200",
        selectedClassName: "border-cyan-500/50 bg-cyan-500/25 font-bold text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.3)]",
        checkClassName: "text-cyan-300",
    },
];

export const VARIANT_SLIDER_OPTIONS: LanguageSliderOption<CardVariant>[] = [
    {
        value: "normal",
        label: "Normal",
        icon: React.createElement(Circle, { size: 11, strokeWidth: 2.25 }),
        indicatorClassName: "border-slate-400/50 bg-slate-400/20 shadow-[0_0_12px_rgba(148,163,184,0.25)]",
        activeClassName: "text-slate-100 font-bold",
        activeIconClassName: "text-slate-200",
        inactiveIconClassName: "text-slate-400",
    },
    {
        value: "holo",
        label: "Foil",
        icon: React.createElement(Sparkles, { size: 11, strokeWidth: 2.25 }),
        indicatorClassName: "border-amber-400/60 bg-amber-500/25 shadow-[0_0_14px_rgba(245,158,11,0.35)]",
        activeClassName: "text-amber-200 font-bold",
        activeIconClassName: "text-amber-300",
        inactiveIconClassName: "text-amber-400/70",
    },
    {
        value: "reverse",
        label: "Reverse Foil",
        icon: React.createElement(RefreshCw, { size: 11, strokeWidth: 2.25 }),
        indicatorClassName: "border-cyan-400/60 bg-cyan-500/25 shadow-[0_0_14px_rgba(6,182,212,0.35)]",
        activeClassName: "text-cyan-200 font-bold",
        activeIconClassName: "text-cyan-300",
        inactiveIconClassName: "text-cyan-400/70",
    },
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
    if (variant === "holo") return "Foil";
    if (variant === "reverse") return "Reverse Foil";
    return "Normal";
}

export function resolveCardShine(variant?: CardVariant | string | null, rarity?: string | null): CardShineMode {
    if (isFullArtRarity(rarity)) {
        return "prismatic";
    }
    if (variant === "holo") {
        return "holo";
    }
    if (variant === "reverse") {
        return "foil";
    }
    return "none";
}

export function cardCopyGroupKey(card: { tcgdex_card_id: string; card_language: string; card_variant?: string | null }): string {
    const variant = isCardVariant(card.card_variant) ? card.card_variant : "normal";
    return `${card.tcgdex_card_id}_${card.card_language}_${variant}`;
}
