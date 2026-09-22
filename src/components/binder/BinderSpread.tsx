"use client";

import { UserCard } from "@/types/binder";
import { POKEMON_151, TOTAL_PAGES, SLOTS_PER_PAGE, getDesktopSpreadPages } from "@/lib/pokemon/constants";
import { BinderSlot } from "./BinderSlot";

interface BinderSpreadProps {
    currentPage: number;
    isMobile: boolean;
    cardsMap: Map<number, UserCard>;
    highlightedDexId?: number | null;
    droppingDexId?: number | null;
    isOpening?: boolean;
    flipDirection?: "next" | "prev" | null;
    onSlotClick: (dexId: number, pokemonName: string, card?: UserCard) => void;
    onSwapClick?: (dexId: number, pokemonName: string, card?: UserCard) => void;
}

export function BinderSpread({ currentPage, isMobile, cardsMap, highlightedDexId, droppingDexId, isOpening = false, flipDirection = null, onSlotClick, onSwapClick }: BinderSpreadProps) {
    const pageTransitionClass = flipDirection === "next" ? "page-anim-next" : flipDirection === "prev" ? "page-anim-prev" : "";

    if (isMobile) {
        const pageNum = Math.min(Math.max(1, currentPage), TOTAL_PAGES);
        const startSlot = (pageNum - 1) * SLOTS_PER_PAGE + 1;
        const pageSlots = Array.from({ length: SLOTS_PER_PAGE }, (_, i) => startSlot + i);
        const startDexDisplay = `#${String(startSlot).padStart(3, "0")}`;
        const endDexDisplay = `#${String(Math.min(pageNum * SLOTS_PER_PAGE, 151)).padStart(3, "0")}`;

        return (
            <div className={`relative mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl ${isOpening ? "binder-reveal-anim" : ""}`}>
                <div className="relative rounded-2xl border-2 border-white/5 bg-gradient-to-br from-[#141822] to-[#0d1017] p-3 shadow-2xl">
                    <div className="mb-2 flex items-center justify-between px-1 text-xs font-medium text-slate-400">
                        <span>
                            Página {pageNum} de {TOTAL_PAGES}
                        </span>
                        <span className="font-mono text-[11px] text-slate-500">
                            {startDexDisplay} – {endDexDisplay}
                        </span>
                    </div>

                    <div className={`grid grid-cols-3 grid-rows-3 gap-2.5 rounded-xl border border-white/[0.04] bg-[#151924]/80 p-2.5 shadow-inner ${pageTransitionClass}`}>
                        {pageSlots.map((dexId) => {
                            const isTrailing = dexId > 151;
                            const pokemon = POKEMON_151.find((p) => p.dexId === dexId);
                            const card = cardsMap.get(dexId);

                            return (
                                <BinderSlot
                                    key={dexId}
                                    dexId={dexId}
                                    pokemonName={pokemon?.name ?? ""}
                                    card={card}
                                    isTrailing={isTrailing}
                                    isHighlighted={highlightedDexId === dexId}
                                    isDropping={droppingDexId === dexId}
                                    onClick={() => {
                                        if (!isTrailing && pokemon) {
                                            onSlotClick(dexId, pokemon.name, card);
                                        }
                                    }}
                                    onSwapClick={
                                        card && onSwapClick && pokemon
                                            ? () => {
                                                  onSwapClick(dexId, pokemon.name, card);
                                              }
                                            : undefined
                                    }
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    const [leftPage, rightPage] = getDesktopSpreadPages(currentPage);
    const leftStartDex = (leftPage - 1) * SLOTS_PER_PAGE + 1;
    const leftSlots = Array.from({ length: SLOTS_PER_PAGE }, (_, i) => leftStartDex + i);

    const rightStartDex = rightPage ? (rightPage - 1) * SLOTS_PER_PAGE + 1 : 0;
    const rightSlots = rightPage ? Array.from({ length: SLOTS_PER_PAGE }, (_, i) => rightStartDex + i) : [];

    return (
        <div className={`relative mx-auto flex w-full max-w-6xl ${isOpening ? "binder-reveal-anim" : ""}`}>
            <div className="relative flex w-full rounded-2xl border-2 border-white/5 bg-gradient-to-br from-[#141822] to-[#0d1017] p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
                <div className="flex flex-1 flex-col">
                    <div className="mb-2.5 flex items-center justify-between px-2 text-xs font-medium text-slate-400">
                        <span>
                            Página {leftPage} de {TOTAL_PAGES}
                        </span>
                        <span className="font-mono text-[11px] text-slate-500">
                            #{String(leftStartDex).padStart(3, "0")} – #{String(Math.min(leftPage * SLOTS_PER_PAGE, 151)).padStart(3, "0")}
                        </span>
                    </div>

                    <div className={`grid flex-1 grid-cols-3 grid-rows-3 gap-3.5 rounded-xl border border-white/[0.04] bg-[#151924]/80 p-4 shadow-inner ${pageTransitionClass}`}>
                        {leftSlots.map((dexId) => {
                            const isTrailing = dexId > 151;
                            const pokemon = POKEMON_151.find((p) => p.dexId === dexId);
                            const card = cardsMap.get(dexId);

                            return (
                                <BinderSlot
                                    key={dexId}
                                    dexId={dexId}
                                    pokemonName={pokemon?.name ?? ""}
                                    card={card}
                                    isTrailing={isTrailing}
                                    isHighlighted={highlightedDexId === dexId}
                                    isDropping={droppingDexId === dexId}
                                    onClick={() => {
                                        if (!isTrailing && pokemon) {
                                            onSlotClick(dexId, pokemon.name, card);
                                        }
                                    }}
                                    onSwapClick={
                                        card && onSwapClick && pokemon
                                            ? () => {
                                                  onSwapClick(dexId, pokemon.name, card);
                                              }
                                            : undefined
                                    }
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="relative flex w-8 flex-col items-center justify-around bg-gradient-to-r from-[#090b0e] via-[#1c2230] to-[#090b0e] py-8 mx-2 shadow-[inset_0_0_10px_rgba(0,0,0,0.9)] rounded-lg">
                    <div className="h-7 w-4 rounded-full bg-gradient-to-br from-slate-400 via-slate-200 to-slate-600 shadow-[0_4px_8px_rgba(0,0,0,0.6),inset_0_1px_2px_#ffffff]" />
                    <div className="h-7 w-4 rounded-full bg-gradient-to-br from-slate-400 via-slate-200 to-slate-600 shadow-[0_4px_8px_rgba(0,0,0,0.6),inset_0_1px_2px_#ffffff]" />
                    <div className="h-7 w-4 rounded-full bg-gradient-to-br from-slate-400 via-slate-200 to-slate-600 shadow-[0_4px_8px_rgba(0,0,0,0.6),inset_0_1px_2px_#ffffff]" />
                </div>

                <div className="flex flex-1 flex-col">
                    {rightPage ? (
                        <>
                            <div className="mb-2.5 flex items-center justify-between px-2 text-xs font-medium text-slate-400">
                                <span>
                                    Página {rightPage} de {TOTAL_PAGES}
                                </span>
                                <span className="font-mono text-[11px] text-slate-500">
                                    #{String(rightStartDex).padStart(3, "0")} – #{String(Math.min(rightPage * SLOTS_PER_PAGE, 151)).padStart(3, "0")}
                                </span>
                            </div>

                            <div className={`grid flex-1 grid-cols-3 grid-rows-3 gap-3.5 rounded-xl border border-white/[0.04] bg-[#151924]/80 p-4 shadow-inner ${pageTransitionClass}`}>
                                {rightSlots.map((dexId) => {
                                    const isTrailing = dexId > 151;
                                    const pokemon = POKEMON_151.find((p) => p.dexId === dexId);
                                    const card = cardsMap.get(dexId);

                                    return (
                                        <BinderSlot
                                            key={dexId}
                                            dexId={dexId}
                                            pokemonName={pokemon?.name ?? ""}
                                            card={card}
                                            isTrailing={isTrailing}
                                            isHighlighted={highlightedDexId === dexId}
                                            isDropping={droppingDexId === dexId}
                                            onClick={() => {
                                                if (!isTrailing && pokemon) {
                                                    onSlotClick(dexId, pokemon.name, card);
                                                }
                                            }}
                                            onSwapClick={
                                                card && onSwapClick && pokemon
                                                    ? () => {
                                                          onSwapClick(dexId, pokemon.name, card);
                                                      }
                                                    : undefined
                                            }
                                        />
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#121622]/50 p-8 text-center">
                            <div className="h-16 w-16 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-slate-600 mb-3">
                                <span className="text-xl font-bold">151</span>
                            </div>
                            <p className="text-xs text-slate-500">Fim do Binder 151</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
