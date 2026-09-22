"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { UserCard } from "@/types/binder";
import { getPokemonSilhouetteUrl, getPokemonGlowColors, getPokemonByDexId, markSilhouetteLoaded } from "@/lib/pokemon/constants";
import { formatTcgdexImageUrl } from "@/lib/pokemon/tcgdex";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { CardImpactBurst } from "@/components/binder/CardImpactBurst";
import { Plus } from "lucide-react";
import { resolveCardShine } from "@/lib/pokemon/variant";

interface BinderSlotProps {
    dexId: number;
    pokemonName: string;
    card?: UserCard;
    isTrailing?: boolean;
    isHighlighted?: boolean;
    isDropping?: boolean;
    pauseTilt?: boolean;
    onClick: () => void;
    onSwapClick?: () => void;
}

function stopPageFlip(e: React.SyntheticEvent) {
    e.stopPropagation();
}

function useStopPageFlip<T extends HTMLElement>() {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const stop = (event: Event) => {
            event.stopPropagation();
        };

        el.addEventListener("mousedown", stop);
        el.addEventListener("touchstart", stop, { passive: true });
        return () => {
            el.removeEventListener("mousedown", stop);
            el.removeEventListener("touchstart", stop);
        };
    }, []);

    return ref;
}

export function BinderSlot({ dexId, pokemonName, card, isTrailing = false, isHighlighted = false, isDropping = false, pauseTilt = false, onClick }: BinderSlotProps) {
    const divRef = useStopPageFlip<HTMLDivElement>();
    const buttonRef = useStopPageFlip<HTMLButtonElement>();

    if (isTrailing) {
        return (
            <div className="h-full min-h-0 w-full flex items-center justify-center rounded-lg border border-[#141824] bg-[#090c12] shadow-inner">
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/5 bg-transparent" />
            </div>
        );
    }

    const isFilled = Boolean(card);
    const formattedDex = `#${String(dexId).padStart(3, "0")}`;
    const glowColors = isHighlighted ? getPokemonGlowColors(dexId) : undefined;
    const glowStyle = glowColors
        ? ({
              "--glow-ring": glowColors.ring,
              "--glow-bright": glowColors.bright,
              "--glow-soft": glowColors.soft,
              borderColor: glowColors.ring,
          } as React.CSSProperties)
        : undefined;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
        }
    };

    if (isFilled && card) {
        const pokemon = getPokemonByDexId(dexId);
        const pokemonType = pokemon?.type ?? "normal";

        return (
            <div ref={divRef} className={`relative h-full min-h-0 w-full ${isDropping ? "z-40" : ""} ${isHighlighted ? "slot-glow ring-2 rounded-lg" : ""}`} style={glowStyle}>
                <div className={`relative h-full w-full ${isDropping ? "card-drop" : ""}`}>
                    <Card3DTilt key={card.id} className="relative h-full w-full overflow-hidden rounded-lg" maxTilt={12} scale={1.15} glareOpacity={0.25} shineMode={resolveCardShine(card.card_variant, card.card_rarity)} paused={pauseTilt}>
                        <button type="button" id={`binder-slot-${dexId}`} onClick={onClick} onMouseDownCapture={stopPageFlip} onPointerDownCapture={stopPageFlip} onTouchStartCapture={stopPageFlip} onKeyDown={handleKeyDown} aria-label={`${card.card_name}, ${formattedDex}`} className="relative flex h-full min-h-0 w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent p-0 text-left outline-none hover:z-30 focus-visible:ring-2 focus-visible:ring-poke-blue">
                            <Image src={formatTcgdexImageUrl(card.card_image_url)} alt={card.card_name} fill sizes="(max-width: 768px) 30vw, 15vw" className="pointer-events-none object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" unoptimized />
                        </button>
                    </Card3DTilt>
                </div>
                {isDropping && <CardImpactBurst pokemonType={pokemonType} rarity={card.card_rarity} />}
            </div>
        );
    }

    return (
        <button
            type="button"
            ref={buttonRef}
            id={`binder-slot-${dexId}`}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            aria-label={`${pokemonName}, ${formattedDex}, vazio`}
            style={glowStyle}
            onMouseDownCapture={stopPageFlip}
            onPointerDownCapture={stopPageFlip}
            onTouchStartCapture={stopPageFlip}
            className={`group relative h-full min-h-0 w-full cursor-pointer overflow-hidden rounded-lg p-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-poke-blue border border-[#1a2130] bg-[#0c1017] shadow-sm binder-empty-slot ${pauseTilt ? "" : "hover:border-white/15 hover:bg-[#121722]"} ${isHighlighted ? "slot-glow ring-2" : ""}`}
        >
            <div className="pointer-events-none absolute top-2 left-2 z-10">
                <span className="rounded bg-black/40 px-1.5 py-0.5 text-[11px] font-bold leading-none text-slate-500">{formattedDex}</span>
            </div>

            <div className="pointer-events-none absolute inset-2 bottom-7">
                <Image src={getPokemonSilhouetteUrl(dexId)} alt={pokemonName} fill sizes="(max-width: 768px) 30vw, 15vw" className={`silhouette-img object-contain opacity-25 ${pauseTilt ? "" : "transition-opacity duration-200 group-hover:opacity-45"}`} unoptimized onLoad={() => markSilhouetteLoaded(dexId)} />
                <div className="binder-slot-plus absolute inset-0 flex items-center justify-center">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-slate-400 ${pauseTilt ? "" : "transition-colors group-hover:bg-white/10 group-hover:text-white"}`}>
                        <Plus size={16} />
                    </div>
                </div>
            </div>

            <div className="binder-slot-name pointer-events-none absolute bottom-2 left-2 right-2 z-10">
                <span className="text-[11px] font-semibold text-slate-400">{pokemonName}</span>
            </div>
        </button>
    );
}
