"use client";

import { useEffect, useState, useRef, useImperativeHandle, forwardRef, memo, useCallback, createContext, useContext, useMemo, useLayoutEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { UserCard } from "@/types/binder";
import { POKEMON_151, TOTAL_PAGES, SLOTS_PER_PAGE, BINDER_PHYSICAL_FRONT_COVER, catalogPageToPhysicalIndex, getBinderSheetPlan, getSpreadLeftIndex, physicalIndexToCatalogPage } from "@/lib/pokemon/constants";
import { BINDER_DESKTOP_MAX_SHADOW_OPACITY, BINDER_FLIP_MS, BINDER_MOBILE_MAX_SHADOW_OPACITY, BINDER_OPEN_HOLD_MS, BINDER_PAGE_HEIGHT, BINDER_PAGE_MAX_WIDTH, BINDER_PAGE_MIN_WIDTH, BINDER_PAGE_WIDTH, binderPageFlipDisableFlipByClick, canMountBinderEngine, isBinderAlreadyOnTarget, isBinderPageBusy, planBinderOpenAnimation, shouldDeferBinderPageSync, shouldUsePortraitBinder } from "@/lib/pokemon/binderOpen";
import { BinderSlot } from "./BinderSlot";
import { PokeballLogo } from "@/components/ui/PokeballLogo";

export interface BinderBookFlipHandle {
    flipNext: () => void;
    flipPrev: () => void;
    turnToPage: (page: number) => void;
    getCurrentPageIndex: () => number;
}

interface BinderBookFlipProps {
    currentPage: number;
    cardsMap: Map<number, UserCard>;
    highlightedDexId?: number | null;
    droppingDexId?: number | null;
    isMobile?: boolean;
    readyToOpen?: boolean;
    onPageChange: (page: number) => void;
    onSlotClick: (dexId: number, pokemonName: string, card?: UserCard) => void;
    onSwapClick?: (dexId: number, pokemonName: string, card?: UserCard) => void;
    onReady?: () => void;
}

interface BinderCardsContextValue {
    cardsMap: Map<number, UserCard>;
    highlightedDexId?: number | null;
    droppingDexId?: number | null;
    pauseTilt: boolean;
    onSlotClick: (dexId: number, pokemonName: string, card?: UserCard) => void;
    onSwapClick?: (dexId: number, pokemonName: string, card?: UserCard) => void;
}

const BinderCardsContext = createContext<BinderCardsContextValue>({
    cardsMap: new Map(),
    highlightedDexId: null,
    droppingDexId: null,
    pauseTilt: false,
    onSlotClick: () => {},
});

function FrontCoverContent() {
    return (
        <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#0e121b] bg-gradient-to-br from-[#181d28] via-[#121622] to-[#0a0d14] p-6 sm:p-9 text-white select-none border border-white/5 rounded-xl">
            <div className="z-10 flex w-full items-center justify-between border-b border-white/5 pb-3 sm:pb-4 text-xs tracking-widest text-slate-400 font-mono">
                <span className="text-slate-300 font-bold">KANTO REGION</span>
                <span style={{ color: "var(--theme-primary)" }} className="font-semibold">
                    151 POKÉMON
                </span>
            </div>

            <div className="z-10 relative flex flex-1 flex-col items-center justify-center my-auto py-6 sm:py-8 text-center">
                <div
                    style={{
                        borderColor: "color-mix(in srgb, var(--theme-primary) 30%, transparent)",
                        background: "linear-gradient(to bottom, color-mix(in srgb, var(--theme-primary) 18%, transparent), #141824, transparent)",
                        boxShadow: "0 0 50px var(--theme-primary-glow)",
                    }}
                    className="relative mb-5 sm:mb-6 flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-full border"
                >
                    <PokeballLogo size="lg" animated={false} />
                </div>

                <span style={{ color: "var(--theme-primary)" }} className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase">
                    Edição de Colecionador
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-white uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">POKÉMON 151</h2>
                <div className="mt-2.5 flex items-center gap-2">
                    <span
                        style={{
                            backgroundColor: "color-mix(in srgb, var(--theme-primary) 40%, transparent)",
                        }}
                        className="h-[1px] w-6"
                    />
                    <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-slate-400 uppercase">Master Set Binder</span>
                    <span
                        style={{
                            backgroundColor: "color-mix(in srgb, var(--theme-primary) 40%, transparent)",
                        }}
                        className="h-[1px] w-6"
                    />
                </div>
            </div>

            <div className="z-10 flex w-full items-center justify-center pt-3 sm:pt-4 border-t border-white/5 text-xs text-slate-400 font-medium">
                <span className="tracking-wider text-slate-400">Clique para abrir o álbum</span>
            </div>
        </div>
    );
}

function InsideCoverContent() {
    return (
        <div className="relative h-full w-full overflow-hidden bg-[#0d111a] bg-gradient-to-br from-[#141824] via-[#10131d] to-[#0a0d14] text-white select-none flex items-center justify-center">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64 opacity-25">
                    <path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="var(--theme-primary, #94a3b8)" />
                    <path d="M 4 50 A 46 46 0 0 0 96 50 Z" fill="#f1f5f9" />
                    <line x1="4" y1="50" x2="96" y2="50" stroke="#0a0d14" strokeWidth="6" />
                    <circle cx="50" cy="50" r="46" fill="none" stroke="#0a0d14" strokeWidth="6" />
                    <circle cx="50" cy="50" r="16" fill="#0a0d14" />
                    <circle cx="50" cy="50" r="10" fill="#f8fafc" />
                    <circle cx="50" cy="50" r="4.5" fill="var(--theme-primary, #94a3b8)" />
                </svg>
            </div>
        </div>
    );
}

function BackCoverContent() {
    return (
        <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#0e121b] bg-gradient-to-br from-[#181d28] via-[#10141e] to-[#090b10] p-6 sm:p-9 text-white select-none border border-white/5 rounded-xl">
            <div className="z-10 flex w-full items-center justify-between border-b border-white/5 pb-3 sm:pb-4 text-xs tracking-widest text-slate-400 font-mono">
                <span className="text-slate-300 font-bold">KANTO REGION</span>
                <span style={{ color: "var(--theme-primary)" }} className="font-semibold">
                    151 POKÉMON
                </span>
            </div>

            <div className="z-10 relative flex flex-1 flex-col items-center justify-center my-auto py-6 sm:py-8 text-center px-4">
                <div
                    style={{
                        borderColor: "color-mix(in srgb, var(--theme-primary) 25%, transparent)",
                        boxShadow: "0 0 60px var(--theme-primary-glow)",
                    }}
                    className="relative mb-5 sm:mb-6 flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center rounded-full border bg-gradient-to-b from-white/[0.08] via-[#121622] to-transparent"
                >
                    <svg viewBox="0 0 100 100" className="h-24 w-24 sm:h-28 sm:w-28 drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]">
                        <path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="var(--theme-primary, #94a3b8)" />
                        <path d="M 4 50 A 46 46 0 0 0 96 50 Z" fill="#f1f5f9" />
                        <line x1="4" y1="50" x2="96" y2="50" stroke="#0f172a" strokeWidth="7" />
                        <circle cx="50" cy="50" r="46" fill="none" stroke="#0f172a" strokeWidth="7" />
                        <circle cx="50" cy="50" r="16" fill="#0f172a" />
                        <circle cx="50" cy="50" r="10" fill="#f8fafc" />
                        <circle cx="50" cy="50" r="4.5" fill="var(--theme-primary, #94a3b8)" />
                    </svg>
                </div>

                <h3 className="text-xl sm:text-2xl font-black tracking-[0.25em] text-white uppercase drop-shadow-md">MyPokeBinder</h3>
                <p className="mt-1.5 text-xs sm:text-sm font-medium tracking-widest text-slate-400 uppercase">Kanto Pokédex Master Archive</p>
            </div>

            <div className="z-10 flex w-full items-center justify-between pt-3 sm:pt-4 border-t border-white/5 text-[10px] sm:text-xs text-slate-500 font-mono">
                <span>#151-KANTO</span>
                <span>OFFICIAL COLLECTOR EDITION</span>
            </div>
        </div>
    );
}

const FrontCoverSheet = forwardRef<HTMLDivElement, { onClick?: () => void }>(function FrontCoverSheet({ onClick }, ref) {
    return (
        <div ref={ref} data-density="hard" onClick={onClick} className="binder-book-page binder-cover-front relative h-full w-full cursor-pointer overflow-hidden rounded-xl bg-[#0e121b]">
            <FrontCoverContent />
        </div>
    );
});

const InsideCoverSheet = forwardRef<HTMLDivElement>(function InsideCoverSheet(_props, ref) {
    return (
        <div ref={ref} data-density="soft" className="binder-book-page relative h-full w-full overflow-hidden rounded-xl select-none bg-[#0d111a]">
            <InsideCoverContent />
        </div>
    );
});

interface PageSheetProps {
    pageNum: number;
}

const PageSheet = memo(
    forwardRef<HTMLDivElement, PageSheetProps>(function PageSheet({ pageNum }, ref) {
        const { cardsMap, highlightedDexId, droppingDexId, pauseTilt, onSlotClick, onSwapClick } = useContext(BinderCardsContext);
        const totalSlotsCount = 151;
        const startSlot = (pageNum - 1) * SLOTS_PER_PAGE + 1;
        const pageSlots = Array.from({ length: SLOTS_PER_PAGE }, (_, i) => startSlot + i);
        const startDexDisplay = `#${String(startSlot).padStart(3, "0")}`;
        const endDexDisplay = `#${String(Math.min(pageNum * SLOTS_PER_PAGE, totalSlotsCount)).padStart(3, "0")}`;

        return (
            <div ref={ref} data-density="soft" className="binder-book-page relative h-full w-full bg-[#0d111a] rounded-xl">
                <div className="flex h-full min-h-0 w-full flex-col bg-gradient-to-br from-[#141824] via-[#10131d] to-[#0a0d14] px-3 pt-3 pb-2 sm:px-3.5 sm:pt-3.5 sm:pb-2 text-white border border-white/5 rounded-xl">
                    <div className="mb-1.5 flex shrink-0 items-center justify-between border-b border-white/5 pb-1.5 text-xs font-semibold text-slate-400">
                        <span className="text-slate-300 font-medium">
                            Página {pageNum} de {TOTAL_PAGES}
                        </span>
                        <span className="font-mono text-[11px] text-slate-500">
                            {startDexDisplay} – {endDexDisplay}
                        </span>
                    </div>

                    <div className="grid min-h-0 flex-1 grid-cols-3 grid-rows-3 gap-2 sm:gap-2.5 rounded-xl border border-[#161b26] bg-[#0b0e15] p-1.5 sm:p-2 shadow-inner">
                        {pageSlots.map((dexId) => {
                            const isTrailing = dexId > totalSlotsCount;
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
                                    pauseTilt={pauseTilt}
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
    }),
);

const LastSheetBackSheet = forwardRef<HTMLDivElement>(function LastSheetBackSheet(_props, ref) {
    const emptySlots = Array.from({ length: SLOTS_PER_PAGE }, (_, i) => i);

    return (
        <div ref={ref} data-density="soft" className="binder-book-page relative h-full w-full bg-[#0d111a] rounded-xl">
            <div className="flex h-full min-h-0 w-full flex-col bg-gradient-to-br from-[#141824] via-[#10131d] to-[#0a0d14] px-3 pt-3 pb-2 sm:px-3.5 sm:pt-3.5 sm:pb-2 text-white border border-white/5 rounded-xl">
                <div className="mb-1.5 flex shrink-0 items-center justify-between border-b border-white/5 pb-1.5 text-xs font-semibold text-slate-400">
                    <span className="text-slate-300 font-medium">Verso da página {TOTAL_PAGES}</span>
                </div>

                <div className="grid min-h-0 flex-1 grid-cols-3 grid-rows-3 gap-2 sm:gap-2.5 rounded-xl border border-[#161b26] bg-[#0b0e15] p-1.5 sm:p-2 shadow-inner">
                    {emptySlots.map((slotIdx) => (
                        <div key={`empty-slot-${slotIdx}`} className="h-full min-h-0 w-full flex items-center justify-center rounded-lg border border-[#141824] bg-[#090c12] shadow-inner">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/5 bg-transparent" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

const BackCoverSheet = forwardRef<HTMLDivElement>(function BackCoverSheet(_props, ref) {
    return (
        <div ref={ref} data-density="hard" className="binder-book-page binder-cover-back relative h-full w-full overflow-hidden rounded-xl bg-[#0e121b]">
            <BackCoverContent />
        </div>
    );
});

export const BinderBookFlip = memo(
    forwardRef<BinderBookFlipHandle, BinderBookFlipProps>(function BinderBookFlip({ currentPage, cardsMap, highlightedDexId, droppingDexId, isMobile = false, readyToOpen = true, onPageChange, onSlotClick, onSwapClick, onReady }, ref) {
        const [isBookEngineReady, setIsBookEngineReady] = useState(false);
        const [isPageBusy, setIsPageBusy] = useState(false);
        const flipBookRef = useRef<any>(null);
        const stageRef = useRef<HTMLDivElement>(null);
        const isFlippingRef = useRef(false);
        const [isPortraitBook] = useState(() => shouldUsePortraitBinder(typeof window !== "undefined" ? window.innerWidth : 0) || Boolean(isMobile));
        const [openPlan] = useState(() => planBinderOpenAnimation(currentPage, shouldUsePortraitBinder(typeof window !== "undefined" ? window.innerWidth : 0) || Boolean(isMobile)));
        const hasAutoOpenedRef = useRef(!openPlan.animateFromCover);
        const [engineMounted, setEngineMounted] = useState(false);

        useLayoutEffect(() => {
            const stage = stageRef.current;
            if (!stage) return;

            const tryMount = () => {
                const width = stage.getBoundingClientRect().width;
                if (canMountBinderEngine(width)) {
                    setEngineMounted(true);
                    return true;
                }
                return false;
            };

            if (tryMount()) return undefined;

            const observer = new ResizeObserver(() => {
                if (tryMount()) observer.disconnect();
            });
            observer.observe(stage);
            return () => observer.disconnect();
        }, []);

        const handleInit = useCallback(() => {
            setIsBookEngineReady(true);
            onReady?.();
        }, [onReady]);

        const handleCoverClick = useCallback(() => {
            const flip = flipBookRef.current?.pageFlip();
            if (!flip || isFlippingRef.current) return;
            if (flip.getCurrentPageIndex() === 0) {
                flip.flipNext();
            }
        }, []);

        const multiFlipStateRef = useRef<{
            remainingSteps: number;
            targetPhysical: number;
            direction: "next" | "prev";
        } | null>(null);
        const multiFlipTimeoutRef = useRef<number | null>(null);

        const resetMultiFlip = useCallback(() => {
            if (multiFlipTimeoutRef.current) {
                window.clearTimeout(multiFlipTimeoutRef.current);
                multiFlipTimeoutRef.current = null;
            }
            multiFlipStateRef.current = null;
            const flip = flipBookRef.current?.pageFlip();
            if (flip) {
                flip.getSettings().flippingTime = BINDER_FLIP_MS;
            }
        }, []);

        useEffect(() => {
            return () => {
                resetMultiFlip();
            };
        }, [resetMultiFlip]);

        useImperativeHandle(
            ref,
            () => ({
                flipNext: () => {
                    resetMultiFlip();
                    const flip = flipBookRef.current?.pageFlip();
                    if (!flip) return;
                    const curIndex = flip.getCurrentPageIndex();
                    if (curIndex >= flip.getPageCount() - 1) return;
                    flip.flipNext();
                },
                flipPrev: () => {
                    resetMultiFlip();
                    const flip = flipBookRef.current?.pageFlip();
                    if (!flip) return;
                    const curIndex = flip.getCurrentPageIndex();
                    if (curIndex <= 0) return;
                    flip.flipPrev();
                },
                turnToPage: (page: number) => {
                    resetMultiFlip();
                    const flip = flipBookRef.current?.pageFlip();
                    if (!flip) return;
                    const isPortrait = (flip.getOrientation?.() ?? (isPortraitBook ? "portrait" : "landscape")) === "portrait";
                    const physical = catalogPageToPhysicalIndex(page, isPortrait);
                    const currentIndex = flip.getCurrentPageIndex();
                    if (isBinderAlreadyOnTarget(currentIndex, physical, isPortrait)) return;

                    const reduceMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                    if (reduceMotion) {
                        flip.turnToPage(physical);
                        return;
                    }

                    const currentSpread = isPortrait ? currentIndex : getSpreadLeftIndex(currentIndex);
                    const targetSpread = isPortrait ? physical : getSpreadLeftIndex(physical);
                    const spreadDelta = isPortrait ? physical - currentIndex : (targetSpread - currentSpread) / 2;

                    let intermediateSteps = 0;
                    if (Math.abs(spreadDelta) >= 4) {
                        intermediateSteps = 2;
                    } else if (Math.abs(spreadDelta) >= 2) {
                        intermediateSteps = 1;
                    }

                    if (intermediateSteps === 0) {
                        flip.getSettings().flippingTime = BINDER_FLIP_MS;
                        flip.flip(physical);
                        return;
                    }

                    const direction = spreadDelta > 0 ? "next" : "prev";
                    multiFlipStateRef.current = {
                        remainingSteps: intermediateSteps,
                        targetPhysical: physical,
                        direction,
                    };
                    flip.getSettings().flippingTime = 180;
                    if (direction === "next") {
                        flip.flipNext();
                    } else {
                        flip.flipPrev();
                    }
                },
                getCurrentPageIndex: () => {
                    const flip = flipBookRef.current?.pageFlip();
                    return flip ? flip.getCurrentPageIndex() : 0;
                },
            }),
            [isPortraitBook, resetMultiFlip],
        );

        useEffect(() => {
            if (!engineMounted || !isBookEngineReady || !readyToOpen) return;
            if (!openPlan.animateFromCover || hasAutoOpenedRef.current) return;

            const flip = flipBookRef.current?.pageFlip();
            if (!flip) return;

            const isPortrait = (flip.getOrientation?.() ?? (isPortraitBook ? "portrait" : "landscape")) === "portrait";
            const currentIndex = flip.getCurrentPageIndex();
            if (isBinderAlreadyOnTarget(currentIndex, openPlan.targetPhysical, isPortrait)) {
                hasAutoOpenedRef.current = true;
                return;
            }

            let cancelled = false;
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const timer = window.setTimeout(
                () => {
                    if (cancelled || hasAutoOpenedRef.current) return;
                    hasAutoOpenedRef.current = true;
                    if (reduceMotion) {
                        flip.turnToPage(openPlan.targetPhysical);
                        isFlippingRef.current = false;
                        return;
                    }
                    isFlippingRef.current = true;
                    // Em paisagem a contracapa e a página 1 formam o mesmo spread, então abrir a
                    // capa já revela o alvo. Em retrato a contracapa é uma folha à parte.
                    if (!isPortrait && flip.getCurrentPageIndex() === BINDER_PHYSICAL_FRONT_COVER) {
                        flip.flipNext();
                        return;
                    }
                    flip.flip(openPlan.targetPhysical);
                },
                reduceMotion ? 0 : BINDER_OPEN_HOLD_MS,
            );

            return () => {
                cancelled = true;
                window.clearTimeout(timer);
            };
        }, [engineMounted, isBookEngineReady, readyToOpen, openPlan, isPortraitBook]);

        useEffect(() => {
            if (!engineMounted || !isBookEngineReady) return;
            if (shouldDeferBinderPageSync(hasAutoOpenedRef.current, isFlippingRef.current, openPlan.animateFromCover)) return;
            const flip = flipBookRef.current?.pageFlip();
            if (!flip) return;

            const isPortrait = (flip.getOrientation?.() ?? (isPortraitBook ? "portrait" : "landscape")) === "portrait";
            const target = catalogPageToPhysicalIndex(currentPage, isPortrait);
            const currentIndex = flip.getCurrentPageIndex();
            if (isBinderAlreadyOnTarget(currentIndex, target, isPortrait)) return;
            flip.flip(target);
        }, [currentPage, engineMounted, isBookEngineReady, isPortraitBook, openPlan.animateFromCover]);

        const handleChangeState = useCallback((e: { data: unknown }) => {
            const state = typeof e.data === "string" ? e.data : "";
            const busy = isBinderPageBusy(state);
            isFlippingRef.current = busy;
            setIsPageBusy(busy);
        }, []);

        const handleFlip = useCallback(
            (e: { data: unknown }) => {
                const physicalIndex = typeof e.data === "number" ? e.data : 0;
                const flip = flipBookRef.current?.pageFlip();
                const orientation = flip?.getOrientation() ?? (isPortraitBook ? "portrait" : "landscape");
                const isPortrait = orientation === "portrait";

                const multi = multiFlipStateRef.current;
                if (multi && multi.remainingSteps > 0) {
                    multi.remainingSteps -= 1;
                    if (multi.remainingSteps > 0) {
                        multiFlipTimeoutRef.current = window.setTimeout(() => {
                            const currentFlip = flipBookRef.current?.pageFlip();
                            if (!currentFlip) return;
                            if (multi.direction === "next") {
                                currentFlip.flipNext();
                            } else {
                                currentFlip.flipPrev();
                            }
                        }, 20);
                    } else {
                        multiFlipTimeoutRef.current = window.setTimeout(() => {
                            const currentFlip = flipBookRef.current?.pageFlip();
                            if (!currentFlip) return;
                            currentFlip.getSettings().flippingTime = BINDER_FLIP_MS;
                            currentFlip.flip(multi.targetPhysical);
                            multiFlipStateRef.current = null;
                        }, 20);
                    }
                    return;
                }

                const catalogPage = physicalIndexToCatalogPage(physicalIndex, isPortrait);
                onPageChange(catalogPage);
            },
            [onPageChange, isPortraitBook],
        );

        const contextValue = useMemo(
            () => ({
                cardsMap,
                highlightedDexId,
                droppingDexId,
                pauseTilt: isPageBusy,
                onSlotClick,
                onSwapClick,
            }),
            [cardsMap, highlightedDexId, droppingDexId, isPageBusy, onSlotClick, onSwapClick],
        );

        const bookSheets = useMemo(() => {
            let endpaperIndex = 0;
            return getBinderSheetPlan().map((sheet) => {
                if (sheet.kind === "front-cover") {
                    return <FrontCoverSheet key="page-cover-front" onClick={handleCoverClick} />;
                }
                if (sheet.kind === "back-cover") {
                    return <BackCoverSheet key="page-cover-back" />;
                }
                if (sheet.kind === "catalog") {
                    return <PageSheet key={`page-slot-${sheet.pageNum}`} pageNum={sheet.pageNum!} />;
                }
                if (sheet.kind === "blank-slots") {
                    return <LastSheetBackSheet key="page-last-sheet-back" />;
                }
                endpaperIndex += 1;
                return <InsideCoverSheet key={`page-endpaper-${endpaperIndex}`} />;
            });
        }, [handleCoverClick]);

        return (
            <BinderCardsContext.Provider value={contextValue}>
                <div className="relative w-full max-w-full overflow-x-clip flex flex-col items-center select-none">
                    <div ref={stageRef} className={`binder-book-stage relative w-full flex items-center justify-center ${isPortraitBook ? "binder-book-stage--portrait" : ""} ${isPageBusy ? "binder-book-stage--busy" : ""}`}>
                        {!isBookEngineReady ? (
                            <div className={`pointer-events-none absolute z-10 overflow-hidden rounded-xl shadow-2xl bg-[#0e121b] ${isPortraitBook ? "inset-0" : "top-0 right-0 h-full w-1/2"}`} aria-hidden="true">
                                <FrontCoverContent />
                            </div>
                        ) : null}
                        {engineMounted && (
                            <HTMLFlipBook
                                ref={flipBookRef}
                                width={BINDER_PAGE_WIDTH}
                                height={BINDER_PAGE_HEIGHT}
                                size="stretch"
                                minWidth={BINDER_PAGE_MIN_WIDTH}
                                maxWidth={BINDER_PAGE_MAX_WIDTH}
                                minHeight={isPortraitBook ? 420 : 540}
                                maxHeight={isPortraitBook ? 760 : 820}
                                maxShadowOpacity={isPortraitBook ? BINDER_MOBILE_MAX_SHADOW_OPACITY : BINDER_DESKTOP_MAX_SHADOW_OPACITY}
                                showCover={true}
                                mobileScrollSupport={true}
                                swipeDistance={30}
                                clickEventForward={true}
                                disableFlipByClick={binderPageFlipDisableFlipByClick(isPortraitBook)}
                                flippingTime={BINDER_FLIP_MS}
                                usePortrait={isPortraitBook}
                                startPage={openPlan.startPhysical}
                                onFlip={handleFlip}
                                onInit={handleInit}
                                onChangeState={handleChangeState}
                                drawShadow={true}
                                startZIndex={0}
                                autoSize={true}
                                useMouseEvents={true}
                                showPageCorners={false}
                                className={`binder-flipbook-root ${isPortraitBook ? "binder-flipbook-root--portrait" : ""} ${isBookEngineReady ? "opacity-100" : "opacity-0"}`}
                                style={{}}
                            >
                                {bookSheets}
                            </HTMLFlipBook>
                        )}
                    </div>
                </div>
            </BinderCardsContext.Provider>
        );
    }),
);
