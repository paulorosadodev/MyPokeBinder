"use client";

import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { THEME_PRESETS } from "@/lib/context/UserSettingsContext";
import { PokemonBallSvg, BallType } from "./PokemonBallSvg";
import { getPokemonThemeSelectorSpriteUrl } from "@/lib/pokemon/constants";
import { toast } from "sonner";

interface PokemonThemeSelectorProps {
    themeColor: string;
    onSelectColor: (color: string) => Promise<void>;
}

/** Compensates transparent padding in PokeAPI front sprites so small Pokémon fill the slot. */
const SPRITE_FIT_SCALE: Record<number, number> = {
    6: 1.15,
    9: 1.12,
    25: 1.55,
    94: 1.2,
    151: 1.7,
    384: 1.1,
};

export function PokemonThemeSelector({ themeColor, onSelectColor }: PokemonThemeSelectorProps) {
    const handleSelectPreset = async (preset: (typeof THEME_PRESETS)[number]) => {
        await onSelectColor(preset.color);
        toast.success(`Tema ${preset.label} selecionado!`, {
            description: `A paleta de ${preset.pokemonName} foi aplicada em toda a interface.`,
        });
    };

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {THEME_PRESETS.map((preset) => {
                const isSelected = themeColor.toLowerCase() === preset.color.toLowerCase();
                const p = preset as typeof preset & {
                    dexId: number;
                    pokemonName: string;
                    ballType: BallType;
                    ballName: string;
                    type: string;
                };
                const spriteScale = SPRITE_FIT_SCALE[p.dexId] ?? 1.15;

                return (
                    <button
                        key={p.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        className={`group relative flex flex-col overflow-hidden rounded-2xl border p-3.5 sm:p-4 text-left transition-all duration-300 ${isSelected ? "border-white/50 bg-[#161a26] shadow-xl ring-2" : "border-white/10 bg-[#0f121a]/90 hover:border-white/25 hover:bg-[#141824]"}`}
                        style={{
                            boxShadow: isSelected ? `0 8px 24px ${p.color}33` : undefined,
                            borderColor: isSelected ? p.color : undefined,
                        }}
                    >
                        <div className="flex items-stretch justify-between gap-3">
                            <div className="flex min-w-0 flex-1 items-center gap-2.5">
                                <div className="relative shrink-0">
                                    <PokemonBallSvg ballType={p.ballType} size={38} isActive={isSelected} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="text-xs sm:text-sm font-extrabold tracking-tight text-white whitespace-nowrap">{p.label}</h4>
                                    <div className="mt-0.5 flex items-center gap-1.5 whitespace-nowrap text-[11px]">
                                        <span className="font-medium text-slate-400 whitespace-nowrap">{p.ballName}</span>
                                        <span className="text-slate-600 shrink-0">•</span>
                                        <span className="shrink-0 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-semibold text-slate-300 whitespace-nowrap">{p.type}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden sm:size-24">
                                <Image src={getPokemonThemeSelectorSpriteUrl(p.dexId)} alt={p.pokemonName} width={96} height={96} unoptimized className="size-full object-contain drop-shadow-md [image-rendering:pixelated]" style={{ transform: `scale(${spriteScale})` }} priority loading="eager" />
                            </div>
                        </div>

                        <div className="mt-3.5 flex items-center justify-between border-t border-white/5 pt-3">
                            <div className="flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full border border-white/20 shadow-sm" style={{ backgroundColor: p.color }} />
                                <span className="font-mono text-xs font-semibold text-slate-300">{p.color.toUpperCase()}</span>
                            </div>

                            {isSelected ? (
                                <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm" style={{ backgroundColor: p.color }}>
                                    <Check size={12} />
                                    <span>Ativo</span>
                                </span>
                            ) : (
                                <span className="text-[11px] font-medium text-slate-500 transition-colors group-hover:text-slate-300">Selecionar</span>
                            )}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
