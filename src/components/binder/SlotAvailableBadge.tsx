"use client";

import { Layers } from "lucide-react";

export function SlotAvailableBadge({ availableCount }: { availableCount: number }) {
    const label = `${availableCount} ${availableCount > 1 ? "cartas disponíveis" : "carta disponível"} para preencher este compartimento`;

    return (
        <span aria-hidden="true" title={label} className="pointer-events-none absolute top-2 right-2 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-[var(--theme-primary)]/45 bg-[#0b0e15]/85 text-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-primary-glow)]">
            <Layers size={11} strokeWidth={2.25} />
        </span>
    );
}
