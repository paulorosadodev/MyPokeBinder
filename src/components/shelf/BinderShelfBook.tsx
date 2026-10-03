"use client";

import { useContext, useMemo } from "react";
import Image from "next/image";
import { BinderCoverArt } from "@/components/binder/BinderCoverArt";
import { getCoverTheme } from "@/lib/binder/themes";
import { UserSettingsContext } from "@/lib/context/UserSettingsContext";
import type { Binder, GridType } from "@/types/binder";

interface BinderShelfBookProps {
    binder: Binder;
    active: boolean;
}

const GRID_CLASSES: Record<GridType, string> = {
    "1x1": "grid-cols-1 grid-rows-1",
    "2x2": "grid-cols-2 grid-rows-2",
    "3x3": "grid-cols-3 grid-rows-3",
    "3x4": "grid-cols-3 grid-rows-4",
};

const SLOT_COUNTS: Record<GridType, number> = {
    "1x1": 1,
    "2x2": 4,
    "3x3": 9,
    "3x4": 12,
};

export function BinderShelfBook({ binder, active }: BinderShelfBookProps) {
    const settings = useContext(UserSettingsContext);
    const animationsEnabled = settings?.animationsEnabled ?? true;
    const theme = getCoverTheme(binder.cover_theme);
    const previewCards = binder.preview_cards ?? [];
    const slotCount = SLOT_COUNTS[binder.grid_type] ?? 9;
    const filledCount = binder.total_cards ?? 0;

    const cardsBySlot = useMemo(() => {
        const map = new Map<number, (typeof previewCards)[number]>();
        for (const card of previewCards) {
            if (card.slot_index !== undefined) {
                map.set(card.slot_index, card);
            }
        }
        return map;
    }, [previewCards]);

    return (
        <div data-shelf-page={active ? "peek" : "0"} data-shelf-ready="true" data-shelf-active={active ? "true" : "false"} className="binder-shelf-stage relative h-full w-full select-none">
            <div className="binder-shelf-page-one absolute inset-0 z-0 flex flex-col overflow-hidden rounded-t-[19px] bg-gradient-to-br from-[#141824] via-[#10131d] to-[#0a0d14] p-2.5 text-white">
                <div className="mb-2 flex shrink-0 items-center justify-between border-b border-white/[0.08] pb-1.5 text-[9px] font-semibold text-slate-400">
                    <span className="text-slate-200">Página 1</span>
                    <span style={{ color: theme.primaryColor }}>{filledCount} cartas</span>
                </div>
                <div className={`grid min-h-0 flex-1 gap-1.5 rounded-[5px] border border-[#161b26] bg-[#0b0e15] p-1 ${GRID_CLASSES[binder.grid_type]}`}>
                    {Array.from({ length: slotCount }, (_, index) => {
                        const slotIndex = index + 1;
                        const card = cardsBySlot.get(slotIndex);

                        return (
                            <div key={slotIndex} className="relative min-h-0 overflow-hidden rounded-[3px] border border-white/[0.07] bg-black/20 shadow-inner">
                                {card ? <Image src={card.card_image_url} alt="" width={84} height={117} unoptimized className="h-full w-full object-cover" /> : <div className="h-full w-full bg-white/[0.02]" />}
                            </div>
                        );
                    })}
                </div>

                <div aria-hidden="true" className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent transition-opacity duration-300 ${active && animationsEnabled ? "opacity-80" : "opacity-0"}`} />
            </div>

            <div
                data-shelf-cover-fallback
                className={`binder-shelf-cover absolute inset-0 z-10 h-full w-full overflow-hidden rounded-t-[19px] ${active && animationsEnabled ? "binder-shelf-cover--peek" : ""}`}
                style={{
                    transformOrigin: "left center",
                    transformStyle: "preserve-3d",
                }}
            >
                <BinderCoverArt name={binder.name} coverTheme={binder.cover_theme} coverPokemonDexId={binder.cover_pokemon_dex_id} className="h-full w-full" />

                <div aria-hidden="true" className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-black/30 transition-opacity duration-300 ${active && animationsEnabled ? "opacity-100" : "opacity-0"}`} />
            </div>

            <div className="binder-shelf-engine hidden" aria-hidden="true" style={{ visibility: "hidden" }}>
                <span className="stf__item" />
            </div>
        </div>
    );
}
