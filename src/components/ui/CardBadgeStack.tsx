"use client";

import type { CardCondition } from "@/lib/pokemon/condition";
import { formatConditionLabel, isCardCondition } from "@/lib/pokemon/condition";
import { FlagIcon } from "@/components/ui/FlagIcon";
import type { CardLanguage } from "@/types/binder";

type CardBadgeKind = "condition" | "count" | "language";

export interface CardBadgeItem {
    kind: CardBadgeKind;
    label: string;
    ariaLabel: string;
}

export interface CardBadgeStackOptions {
    condition?: CardCondition | string | null;
    count?: number | null;
    language?: CardLanguage | null;
    includeCondition?: boolean;
    includeLanguage?: boolean;
    countDataAttribute?: string;
}

const LANGUAGE_LABELS: Record<CardLanguage, string> = {
    "pt-br": "PT-BR",
    en: "EN",
    ja: "JA",
};

const CONDITION_ACCENTS: Record<CardCondition, string> = {
    M: "border-l-emerald-400",
    NM: "border-l-lime-400",
    SP: "border-l-yellow-400",
    MP: "border-l-amber-400",
    HP: "border-l-orange-400",
    D: "border-l-rose-400",
};

export function buildCardBadgeItems({ condition, count, language, includeCondition = true, includeLanguage = true }: CardBadgeStackOptions): CardBadgeItem[] {
    const items: CardBadgeItem[] = [];

    if (includeCondition && isCardCondition(condition)) {
        const label = condition;
        items.push({ kind: "condition", label, ariaLabel: formatConditionLabel(condition).replace(/\s*\([^)]*\)$/, "") });
    }

    if (includeLanguage && language) {
        const label = LANGUAGE_LABELS[language];
        items.push({ kind: "language", label, ariaLabel: `Idioma ${label}` });
    }

    if (typeof count === "number" && count > 1) {
        items.push({ kind: "count", label: count > 9 ? "+9" : `x${count}`, ariaLabel: `${count} cópias idênticas` });
    }

    return items;
}

export function CardBadgeStack({ condition, count, language, includeCondition = true, includeLanguage = true, countDataAttribute, className = "" }: CardBadgeStackOptions & { countDataAttribute?: string; className?: string }) {
    const items = buildCardBadgeItems({ condition, count, language, includeCondition, includeLanguage });

    if (items.length === 0) return null;

    return (
        <div className={`pointer-events-none absolute right-1 top-1 z-10 flex flex-col items-end gap-1 ${className}`} aria-label="Indicadores da carta">
            {items.map((item) => {
                const conditionClass = item.kind === "condition" && isCardCondition(condition) ? CONDITION_ACCENTS[condition] : item.kind === "count" ? "border-l-poke-blue" : "border-transparent";
                const textClass = item.kind === "count" ? "text-[9px] font-extrabold" : item.kind === "language" ? "text-[6px] font-bold" : "text-[8px] font-semibold";
                const surfaceClass = item.kind === "language" ? (language === "pt-br" ? "border-transparent bg-[#009c3b]" : language === "en" ? "border-transparent bg-[#b22234]" : "border-transparent bg-white") : "border-white/20 bg-slate-700/90";

                return (
                    <span key={item.kind} title={item.ariaLabel} aria-label={item.ariaLabel} data-card-badge-kind={item.kind} data-owned-count={item.kind === "count" ? countDataAttribute : undefined} className={`flex h-5 w-5 items-center justify-center rounded-[3px] border border-l-2 leading-none text-slate-100 ${surfaceClass} ${conditionClass} ${textClass}`}>
                        {item.kind === "language" && language ? <FlagIcon country={language} className="h-[14px] w-5 !rounded-[2px] !shadow-none" /> : item.label}
                    </span>
                );
            })}
        </div>
    );
}
