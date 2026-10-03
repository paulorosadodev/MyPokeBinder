"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { UserCard, BinderSlot as BinderSlotType } from "@/types/binder";
import { getPokemonSilhouetteUrl, getPokemonGlowColors, POKEMON_MAP, markSilhouetteLoaded } from "@/lib/pokemon/constants";
import { formatTcgdexImageUrl } from "@/lib/pokemon/tcgdex";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { CardImpactBurst } from "@/components/binder/CardImpactBurst";
import { Plus } from "lucide-react";
import { resolveCardShine } from "@/lib/pokemon/variant";
import { resolveCardElementTypes } from "@/lib/pokemon/cardTypes";
import { UserSettingsContext } from "@/lib/context/UserSettingsContext";
import { playCardDropSound } from "@/lib/audio/cardSounds";
import { getRarityImpactTier } from "@/lib/pokemon/rarity";
import { BINDER_CARD_CLIP_CLASS, BINDER_CARD_IMAGE_CLASS, FILLED_BINDER_SLOT_CELL_CLASS, FILLED_BINDER_SLOT_FRAME_CLASS, getBinderSlotHighlightClass, shouldShowSlotGlow } from "@/lib/pokemon/binderHighlight";

export interface UniversalBinderSlotProps {
    slot: BinderSlotType;
    card?: UserCard | null;
    availableCount?: number;
    isHighlighted?: boolean;
    isDropping?: boolean;
    mountImage?: boolean;
    priority?: boolean;
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

export function UniversalBinderSlot({ slot, card, availableCount = 0, isHighlighted = false, isDropping = false, mountImage = true, priority = false, pauseTilt = false, onClick }: UniversalBinderSlotProps) {
    const settings = useContext(UserSettingsContext);
    const animationsEnabled = settings ? settings.animationsEnabled : true;
    const showDropEffects = isDropping && animationsEnabled;
    const divRef = useStopPageFlip<HTMLDivElement>();
    const buttonRef = useStopPageFlip<HTMLButtonElement>();

    const hasPlayedDropSoundRef = useRef(false);

    useEffect(() => {
        if (!isDropping) {
            hasPlayedDropSoundRef.current = false;
            return;
        }
        if (animationsEnabled || !card || hasPlayedDropSoundRef.current) return;
        hasPlayedDropSoundRef.current = true;
        playCardDropSound(getRarityImpactTier(card.card_rarity));
    }, [isDropping, animationsEnabled, card]);

    const isFilled = Boolean(card);
    const hasAvailableCard = !isFilled && availableCount > 0;
    const showGlow = shouldShowSlotGlow(isHighlighted, pauseTilt);
    const highlightClass = getBinderSlotHighlightClass(showGlow);

    const targetDex = slot.target_dex_id ?? card?.pokemon_dex_id ?? null;
    const glowColors = showGlow && targetDex ? getPokemonGlowColors(targetDex) : undefined;
    const glowStyle = glowColors
        ? ({
              "--glow-ring": glowColors.ring,
              "--glow-bright": glowColors.bright,
              "--glow-soft": glowColors.soft,
          } as React.CSSProperties)
        : undefined;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
        }
    };

    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageRef = useCallback((node: HTMLImageElement | null) => {
        if (node?.complete && node.naturalWidth > 0) {
            setImageLoaded(true);
        }
    }, []);

    useEffect(() => {
        setImageLoaded(false);
    }, [card?.id]);

    if (isFilled && card) {
        const pokemonInfo = targetDex ? POKEMON_MAP.get(targetDex) : null;
        const pokemonType = pokemonInfo?.type ?? "normal";
        const shineMode = resolveCardShine(card.card_variant, card.card_rarity, card.card_image_url, card.card_name);
        const elementTypes = resolveCardElementTypes(card.card_types, card.pokemon_dex_id);

        return (
            <div ref={divRef} className={`${FILLED_BINDER_SLOT_CELL_CLASS} ${showDropEffects ? "z-40" : ""} ${showGlow ? "z-30" : ""}`}>
                <div className={`${FILLED_BINDER_SLOT_FRAME_CLASS} ${showGlow ? "z-20" : ""} ${highlightClass}`} style={glowStyle}>
                    <div className={`relative h-full w-full ${showDropEffects ? "card-drop" : ""}`}>
                        <Card3DTilt key={card.id} className={`relative h-full w-full overflow-hidden bg-transparent shadow-[0_4px_12px_rgba(0,0,0,0.5)] ${BINDER_CARD_CLIP_CLASS}`} maxTilt={12} scale={1.15} glareOpacity={0.25} shineMode={shineMode} elementTypes={elementTypes} paused={pauseTilt} isLoading={!imageLoaded}>
                            <button
                                type="button"
                                id={`binder-slot-${slot.id}`}
                                onClick={onClick}
                                onMouseDownCapture={stopPageFlip}
                                onPointerDownCapture={stopPageFlip}
                                onTouchStartCapture={stopPageFlip}
                                onKeyDown={handleKeyDown}
                                aria-label={`${card.card_name}${targetDex ? `, #${targetDex}` : ""}`}
                                className={`relative flex h-full min-h-0 w-full cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-poke-blue ${BINDER_CARD_CLIP_CLASS}`}
                            >
                                {mountImage ? <Image ref={handleImageRef} src={formatTcgdexImageUrl(card.card_image_url)} alt={card.card_name} fill sizes="(max-width: 768px) 30vw, 15vw" className={BINDER_CARD_IMAGE_CLASS} unoptimized priority={priority} onLoad={() => setImageLoaded(true)} onError={() => setImageLoaded(true)} /> : null}
                            </button>
                        </Card3DTilt>
                    </div>
                </div>
                {showDropEffects && <CardImpactBurst pokemonType={pokemonType} rarity={card.card_rarity} />}
            </div>
        );
    }

    if (slot.slot_type === "free") {
        return (
            <button
                type="button"
                ref={buttonRef}
                id={`binder-slot-${slot.id}`}
                onClick={onClick}
                onKeyDown={handleKeyDown}
                aria-label={`Compartimento livre ${slot.slot_index}, vazio`}
                style={glowStyle}
                onMouseDownCapture={stopPageFlip}
                onPointerDownCapture={stopPageFlip}
                onTouchStartCapture={stopPageFlip}
                className={`group relative h-full min-h-0 w-full cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-white/15 bg-[#090c13]/80 p-2 text-left outline-none transition-all duration-200 hover:border-poke-blue/50 hover:bg-[#0f1422] focus-visible:ring-2 focus-visible:ring-poke-blue ${showGlow ? "z-30" : ""} ${highlightClass}`}
            >
                <div className="pointer-events-none absolute top-2 left-2 z-10">
                    <span className="rounded bg-black/40 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">Livre</span>
                </div>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all duration-200 group-hover:border-poke-blue/40 group-hover:bg-poke-blue/20 group-hover:text-white">
                        <Plus size={16} />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 group-hover:text-slate-200">Inserir Carta</span>
                </div>
            </button>
        );
    }

    if (slot.slot_type === "card") {
        return (
            <button
                type="button"
                ref={buttonRef}
                id={`binder-slot-${slot.id}`}
                onClick={onClick}
                onKeyDown={handleKeyDown}
                aria-label={slot.target_card_name ? `Meta de carta: ${slot.target_card_name}, vazia` : "Meta de carta, vazia"}
                style={glowStyle}
                onMouseDownCapture={stopPageFlip}
                onPointerDownCapture={stopPageFlip}
                onTouchStartCapture={stopPageFlip}
                className={`group relative h-full min-h-0 w-full cursor-pointer overflow-hidden rounded-lg border border-amber-500/30 bg-[#0c1017] p-2 text-left outline-none transition-all duration-200 hover:border-amber-400/60 hover:bg-[#131926] focus-visible:ring-2 focus-visible:ring-poke-blue ${showGlow ? "z-30" : ""} ${highlightClass}`}
            >
                {slot.target_card_image_url && mountImage && (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <Image src={formatTcgdexImageUrl(slot.target_card_image_url)} alt={slot.target_card_name || "Carta"} fill sizes="(max-width: 768px) 30vw, 15vw" className="object-contain opacity-25 grayscale transition-opacity duration-200 group-hover:opacity-40" unoptimized />
                    </div>
                )}

                <div className="pointer-events-none absolute top-2 left-2 z-10">
                    <span className="rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-amber-300 backdrop-blur-sm">TCG Card</span>
                </div>

                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-500/40 bg-black/60 text-amber-300 shadow-md backdrop-blur-sm transition-all duration-200">
                        <Plus size={16} />
                    </div>
                </div>

                {slot.target_card_name && (
                    <div className="pointer-events-none absolute bottom-2 left-2 right-2 z-10">
                        <span className="block truncate rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-slate-200 backdrop-blur-sm">{slot.target_card_name}</span>
                    </div>
                )}
            </button>
        );
    }

    const dex = slot.target_dex_id || 1;
    const pokemonName = POKEMON_MAP.get(dex)?.name || slot.target_card_name || `Pokémon #${dex}`;
    const formattedDex = `#${String(dex).padStart(3, "0")}`;

    const emptyBorderBgClass = hasAvailableCard ? `border-[var(--theme-primary)]/25 bg-[#0b0e15] ${pauseTilt ? "" : "hover:border-[var(--theme-primary)]/45 hover:bg-[#10141f] hover:z-20"}` : `border-[#1a2130] bg-[#0c1017] shadow-sm ${pauseTilt ? "" : "hover:border-white/15 hover:bg-[#121722] hover:z-20"}`;

    return (
        <button
            type="button"
            ref={buttonRef}
            id={`binder-slot-${slot.id}`}
            onClick={onClick}
            onKeyDown={handleKeyDown}
            aria-label={hasAvailableCard ? `${pokemonName}, ${formattedDex}, vazio, ${availableCount} ${availableCount > 1 ? "cartas disponíveis" : "carta disponível"} na coleção` : `${pokemonName}, ${formattedDex}, vazio`}
            style={glowStyle}
            onMouseDownCapture={stopPageFlip}
            onPointerDownCapture={stopPageFlip}
            onTouchStartCapture={stopPageFlip}
            className={`group relative h-full min-h-0 w-full cursor-pointer overflow-hidden rounded-lg p-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-poke-blue binder-empty-slot ${emptyBorderBgClass} ${showGlow ? "z-30" : ""} ${highlightClass}`}
        >
            <div className="pointer-events-none absolute top-2 left-2 z-10">
                <span className={`rounded px-1.5 py-0.5 text-[11px] font-bold leading-none ${hasAvailableCard ? "bg-black/50 text-slate-300" : "bg-black/40 text-slate-500"}`}>{formattedDex}</span>
            </div>

            {hasAvailableCard && (
                <div className="pointer-events-none absolute top-2.5 right-2.5 z-10 flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-[var(--theme-primary)] opacity-85 shadow-[0_0_6px_var(--theme-primary-glow)]" />
                </div>
            )}

            <div className="pointer-events-none absolute inset-2 bottom-7">
                {mountImage ? <Image src={getPokemonSilhouetteUrl(dex)} alt={pokemonName} fill sizes="(max-width: 768px) 30vw, 15vw" className={`silhouette-img object-contain ${hasAvailableCard ? "opacity-30" : "opacity-25"} ${pauseTilt ? "" : hasAvailableCard ? "transition-opacity duration-200 group-hover:opacity-50" : "transition-opacity duration-200 group-hover:opacity-45"}`} unoptimized priority={priority} onLoad={() => markSilhouetteLoaded(dex)} /> : null}
                <div className="binder-slot-plus absolute inset-0 flex items-center justify-center">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 ${hasAvailableCard ? `border border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)] ${pauseTilt ? "" : "group-hover:border-[var(--theme-primary)]/50 group-hover:bg-[var(--theme-primary)]/20"}` : `bg-white/5 text-slate-400 ${pauseTilt ? "" : "transition-colors group-hover:bg-white/10 group-hover:text-white"}`}`}>
                        <Plus size={16} />
                    </div>
                </div>
            </div>

            <div className="binder-slot-name pointer-events-none absolute bottom-2 left-2 right-2 z-10">
                <span className={`text-[11px] font-semibold transition-colors ${hasAvailableCard ? "text-slate-300 group-hover:text-white" : "text-slate-400"}`}>{pokemonName}</span>
            </div>
        </button>
    );
}
