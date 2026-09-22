"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { DashboardSlot } from "@/types/binder";
import { getPokemonSilhouetteUrl, isSilhouetteLoaded, markSilhouetteLoaded } from "@/lib/pokemon/constants";
import { getCardAppearProps } from "@/lib/ui/cardAppear";

interface DashboardMiniSlotProps {
    slot: DashboardSlot;
    index?: number;
    onClick?: (dexId: number) => void;
}

export const DashboardMiniSlot = memo(function DashboardMiniSlot({ slot, index = 0, onClick }: DashboardMiniSlotProps) {
    const [isLoaded, setIsLoaded] = useState(() => isSilhouetteLoaded(slot.pokemon_dex_id));
    const appear = getCardAppearProps(index, { stepMs: 12, maxDelayMs: 600 });
    const isInteractive = typeof onClick === "function";

    const handleLoad = () => {
        markSilhouetteLoaded(slot.pokemon_dex_id);
        setIsLoaded(true);
    };

    const slotStyleClasses = slot.is_filled ? "border border-poke-blue bg-poke-blue/15 shadow-[0_0_6px_var(--theme-primary-glow)] hover:border-poke-blue hover:bg-poke-blue/25 hover:shadow-[0_0_15px_var(--theme-primary-glow)]" : "border border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.05] hover:shadow-[0_0_8px_rgba(255,255,255,0.12)]";

    const numberColorClass = slot.is_filled ? "text-poke-blue" : "text-slate-500";
    const interactionClasses = isInteractive ? "cursor-pointer hover:z-10 hover:scale-[1.02]" : "cursor-default";

    return (
        <div
            onClick={isInteractive ? () => onClick(slot.pokemon_dex_id) : undefined}
            role={isInteractive ? "button" : undefined}
            tabIndex={isInteractive ? 0 : undefined}
            onKeyDown={
                isInteractive
                    ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              onClick(slot.pokemon_dex_id);
                          }
                      }
                    : undefined
            }
            title={`#${slot.pokemon_dex_id} ${slot.pokemon_name} - ${slot.is_filled ? "Preenchido" : "Vazio"}`}
            className={`relative flex aspect-square flex-col items-center justify-center rounded-lg p-1 transition-all duration-200 ease-out z-1 ${interactionClasses} ${slotStyleClasses} ${appear.className}`}
            style={appear.style}
        >
            {!isLoaded ? <div className="skeleton-shimmer absolute inset-0 rounded-lg opacity-40 pointer-events-none" /> : null}

            <span className={`absolute top-1 left-1.5 z-10 text-[9px] font-bold pointer-events-none ${numberColorClass}`}>{slot.pokemon_dex_id}</span>

            <div className="relative flex h-full w-full items-center justify-center pt-3.5 pb-0.5 px-0.5">
                <div className="relative h-full w-full">
                    {slot.is_filled ? (
                        <Image src={getPokemonSilhouetteUrl(slot.pokemon_dex_id)} alt={slot.pokemon_name} fill unoptimized sizes="48px" className={`object-contain transition-all duration-300 drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)] ${isLoaded ? "opacity-100" : "opacity-0"}`} onLoad={handleLoad} />
                    ) : (
                        <Image src={getPokemonSilhouetteUrl(slot.pokemon_dex_id)} alt={slot.pokemon_name} fill unoptimized sizes="48px" className={`silhouette-img object-contain transition-opacity duration-300 ${isLoaded ? "opacity-30" : "opacity-0"}`} onLoad={handleLoad} />
                    )}
                </div>
            </div>
        </div>
    );
});
