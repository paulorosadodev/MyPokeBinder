"use client";

import { Eye, EyeOff } from "lucide-react";

interface CardBadgeVisibilityToggleProps {
    showBadges: boolean;
    onChange: (showBadges: boolean) => void;
}

export function CardBadgeVisibilityToggle({ showBadges, onChange }: CardBadgeVisibilityToggleProps) {
    const label = showBadges ? "Ocultar indicadores das cartas" : "Exibir indicadores das cartas";
    const Icon = showBadges ? EyeOff : Eye;

    return (
        <button type="button" onClick={() => onChange(!showBadges)} aria-label={label} aria-pressed={showBadges} title={label} className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border text-xs font-semibold transition-colors sm:h-10 sm:w-10 ${showBadges ? "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white" : "border-poke-blue/60 bg-poke-blue/20 text-white"}`}>
            <Icon size={16} aria-hidden />
        </button>
    );
}
