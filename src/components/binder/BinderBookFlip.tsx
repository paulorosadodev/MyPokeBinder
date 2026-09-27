"use client";

import { useEffect, useState, useRef, useImperativeHandle, forwardRef, memo, useCallback, createContext, useContext, useMemo, useLayoutEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { UserCard } from "@/types/binder";
import { POKEMON_151, TOTAL_PAGES, SLOTS_PER_PAGE, BINDER_PHYSICAL_FRONT_COVER, catalogPageToPhysicalIndex, getBinderSheetPlan, physicalIndexToCatalogPage } from "@/lib/pokemon/constants";
import {
    BINDER_DESKTOP_MAX_SHADOW_OPACITY,
    BINDER_ENTRANCE_MS,
    BINDER_FLIP_MS,
    BINDER_LIB_SWIPE_DISTANCE,
    BINDER_MOBILE_MAX_SHADOW_OPACITY,
    BINDER_MULTI_FLIP_STEP_MS,
    BINDER_OPEN_HOLD_MS,
    BINDER_PAGE_HEIGHT,
    BINDER_PAGE_MAX_WIDTH,
    BINDER_PAGE_MIN_WIDTH,
    BINDER_PAGE_MIN_WIDTH_MOBILE,
    BINDER_PAGE_MIN_HEIGHT_MOBILE,
    BINDER_PAGE_WIDTH,
    BINDER_USE_MOUSE_EVENTS,
    binderPageFlipAutoSize,
    binderPageFlipDisableFlipByClick,
    canMountBinderEngine,
    isBinderAlreadyOnTarget,
    isBinderPageBusy,
    planBinderOpenAnimation,
    planBinderPageNavigation,
    resolveBinderPageSwipe,
    shouldApplyExternalBinderPageFlip,
    shouldDeferBinderPageSync,
    shouldSignalBinderReady,
} from "@/lib/pokemon/binderOpen";
import { BinderSlot } from "./BinderSlot";
import { PokeballLogo } from "@/components/ui/PokeballLogo";
import { UserSettingsContext } from "@/lib/context/UserSettingsContext";

export interface BinderBookFlipHandle {
    flipNext: () => void;
    flipPrev: () => void;
    turnToPage: (page: number) => void;
    getCurrentPageIndex: () => number;
    isBusy: () => boolean;
}

interface BinderBookFlipProps {
    currentPage: number;
    cardsMap: Map<number, UserCard>;
    availableCounts?: Record<number, number>;
    highlightedDexId?: number | null;
    droppingDexId?: number | null;
    isMobile?: boolean;
    imagePages?: readonly number[];
    priorityPages?: readonly number[];
    readyToOpen?: boolean;
    skipOpeningAnimation?: boolean;
    onEngineReady?: () => void;
    onPageChange: (page: number) => void;
    onSlotClick: (dexId: number, pokemonName: string, card?: UserCard) => void;
    onSwapClick?: (dexId: number, pokemonName: string, card?: UserCard) => void;
    onReady?: () => void;
}

interface BinderCardsContextValue {
    cardsMap: Map<number, UserCard>;
    availableCounts: Record<number, number>;
    highlightedDexId?: number | null;
    droppingDexId?: number | null;
    imagePages: ReadonlySet<number>;
    priorityPages: ReadonlySet<number>;
    pauseTilt: boolean;
    onSlotClick: (dexId: number, pokemonName: string, card?: UserCard) => void;
    onSwapClick?: (dexId: number, pokemonName: string, card?: UserCard) => void;
}

const BinderCardsContext = createContext<BinderCardsContextValue>({
    cardsMap: new Map(),
    availableCounts: {},
    highlightedDexId: null,
    droppingDexId: null,
    imagePages: new Set<number>(),
    priorityPages: new Set<number>(),
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
        const { cardsMap, availableCounts, highlightedDexId, droppingDexId, imagePages, priorityPages, pauseTilt, onSlotClick, onSwapClick } = useContext(BinderCardsContext);
        const mountImage = imagePages.has(pageNum);
        const imagePriority = priorityPages.has(pageNum);
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
                                    availableCount={availableCounts[dexId] || 0}
                                    isTrailing={isTrailing}
                                    isHighlighted={highlightedDexId === dexId}
                                    isDropping={droppingDexId === dexId}
                                    mountImage={mountImage}
                                    priority={imagePriority}
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
    forwardRef<BinderBookFlipHandle, BinderBookFlipProps>(function BinderBookFlip({ currentPage, cardsMap, availableCounts = {}, highlightedDexId, droppingDexId, isMobile = false, imagePages, priorityPages, readyToOpen = true, skipOpeningAnimation: skipOpeningAnimationProp = false, onEngineReady, onPageChange, onSlotClick, onSwapClick, onReady }, ref) {
        const settings = useContext(UserSettingsContext);
        const animationsEnabled = settings ? settings.animationsEnabled : true;
        const [isBookEngineReady, setIsBookEngineReady] = useState(false);
        const [isPageBusy, setIsPageBusy] = useState(false);
        const flipBookRef = useRef<any>(null);
        const stageRef = useRef<HTMLDivElement>(null);
        const isFlippingRef = useRef(false);
        const isPortraitBook = Boolean(isMobile);
        const skipOpeningAnimation = !animationsEnabled || Boolean(skipOpeningAnimationProp);
        const openPlan = useMemo(() => planBinderOpenAnimation(currentPage, isPortraitBook, skipOpeningAnimation), [currentPage, isPortraitBook, skipOpeningAnimation]);
        const hasAutoOpenedRef = useRef(!openPlan.animateFromCover || skipOpeningAnimation);
        const readyOrientationRef = useRef<boolean | null>(null);
        const [engineMounted, setEngineMounted] = useState(false);

        const signalReady = useCallback(() => {
            if (readyOrientationRef.current === isPortraitBook) return;
            readyOrientationRef.current = isPortraitBook;
            onReady?.();
        }, [isPortraitBook, onReady]);

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
            onEngineReady?.();
            if (
                shouldSignalBinderReady({
                    animateFromCover: openPlan.animateFromCover,
                    hasAutoOpened: hasAutoOpenedRef.current,
                    isBusy: false,
                })
            ) {
                signalReady();
            }
        }, [openPlan.animateFromCover, signalReady, onEngineReady]);

        const handleCoverClick = useCallback(() => {
            const flip = flipBookRef.current?.pageFlip();
            if (!flip || isFlippingRef.current) return;
            if (flip.getCurrentPageIndex() === 0) {
                if (!animationsEnabled) {
                    flip.turnToPage(isPortraitBook ? 1 : 2);
                    return;
                }
                flip.flipNext();
            }
        }, [animationsEnabled, isPortraitBook]);

        const multiFlipStateRef = useRef<{
            remainingPhysicalTargets: number[];
            targetPhysical: number;
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

        const flipNextPage = useCallback(() => {
            resetMultiFlip();
            const flip = flipBookRef.current?.pageFlip();
            if (!flip) return;
            const curIndex = flip.getCurrentPageIndex();
            if (curIndex >= flip.getPageCount() - 1) return;
            if (!animationsEnabled) {
                flip.turnToPage(curIndex + (isPortraitBook ? 1 : 2));
                return;
            }
            if (isPortraitBook) {
                flip.flip(curIndex + 1);
                return;
            }
            flip.flipNext();
        }, [resetMultiFlip, animationsEnabled, isPortraitBook]);

        const flipPrevPage = useCallback(() => {
            resetMultiFlip();
            const flip = flipBookRef.current?.pageFlip();
            if (!flip) return;
            const curIndex = flip.getCurrentPageIndex();
            if (curIndex <= 0) return;
            if (!animationsEnabled) {
                flip.turnToPage(Math.max(0, curIndex - (isPortraitBook ? 1 : 2)));
                return;
            }
            if (isPortraitBook) {
                flip.flip(curIndex - 1);
                return;
            }
            flip.flipPrev();
        }, [resetMultiFlip, animationsEnabled, isPortraitBook]);

        useEffect(() => {
            return () => {
                try {
                    flipBookRef.current?.pageFlip()?.destroy?.();
                } catch {}
                resetMultiFlip();
            };
        }, [resetMultiFlip]);

        useImperativeHandle(
            ref,
            () => ({
                flipNext: flipNextPage,
                flipPrev: flipPrevPage,
                turnToPage: (page: number) => {
                    resetMultiFlip();
                    const flip = flipBookRef.current?.pageFlip();
                    if (!flip) return;
                    const isPortrait = (flip.getOrientation?.() ?? (isPortraitBook ? "portrait" : "landscape")) === "portrait";
                    const physical = catalogPageToPhysicalIndex(page, isPortrait);
                    const currentIndex = flip.getCurrentPageIndex();
                    if (isBinderAlreadyOnTarget(currentIndex, physical, isPortrait)) return;

                    const reduceMotion = !animationsEnabled || (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
                    if (reduceMotion) {
                        flip.turnToPage(physical);
                        return;
                    }

                    const navigation = planBinderPageNavigation(currentIndex, physical, isPortrait);
                    if (navigation.mode === "direct") {
                        flip.getSettings().flippingTime = BINDER_FLIP_MS;
                        flip.flip(navigation.targetPhysical);
                        return;
                    }

                    multiFlipStateRef.current = {
                        remainingPhysicalTargets: navigation.intermediatePhysicalTargets.slice(1),
                        targetPhysical: navigation.targetPhysical,
                    };
                    flip.getSettings().flippingTime = BINDER_MULTI_FLIP_STEP_MS;
                    flip.flip(navigation.intermediatePhysicalTargets[0]);
                },
                getCurrentPageIndex: () => {
                    const flip = flipBookRef.current?.pageFlip();
                    return flip ? flip.getCurrentPageIndex() : 0;
                },
                isBusy: () => isFlippingRef.current,
            }),
            [isPortraitBook, resetMultiFlip, animationsEnabled, flipNextPage, flipPrevPage],
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
                signalReady();
                return;
            }

            let cancelled = false;
            const reduceMotion = !animationsEnabled || (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
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
                reduceMotion ? 0 : BINDER_ENTRANCE_MS + BINDER_OPEN_HOLD_MS,
            );

            return () => {
                cancelled = true;
                window.clearTimeout(timer);
            };
        }, [engineMounted, isBookEngineReady, readyToOpen, openPlan, isPortraitBook, animationsEnabled, signalReady]);

        useEffect(() => {
            if (!engineMounted || !isBookEngineReady) return;
            if (shouldDeferBinderPageSync(hasAutoOpenedRef.current, isFlippingRef.current, openPlan.animateFromCover)) return;
            const flip = flipBookRef.current?.pageFlip();
            if (!flip) return;

            const isPortrait = (flip.getOrientation?.() ?? (isPortraitBook ? "portrait" : "landscape")) === "portrait";
            const target = catalogPageToPhysicalIndex(currentPage, isPortrait);
            const currentIndex = flip.getCurrentPageIndex();
            if (!shouldApplyExternalBinderPageFlip(isBinderAlreadyOnTarget(currentIndex, target, isPortrait), isFlippingRef.current)) return;
            if (!animationsEnabled || skipOpeningAnimation) {
                flip.turnToPage(target);
            } else {
                flip.flip(target);
            }
        }, [currentPage, engineMounted, isBookEngineReady, isPortraitBook, openPlan.animateFromCover, animationsEnabled, skipOpeningAnimation]);

        useEffect(() => {
            if (!engineMounted || !isBookEngineReady) return;
            const flip = flipBookRef.current?.pageFlip();
            if (!flip) return;
            const flipSettings = flip.getSettings();
            if (flipSettings) {
                flipSettings.useMouseEvents = BINDER_USE_MOUSE_EVENTS;
                flipSettings.drawShadow = animationsEnabled;
                flipSettings.showPageCorners = false;
                flipSettings.disableFlipByClick = !animationsEnabled || binderPageFlipDisableFlipByClick(isPortraitBook);
                flipSettings.swipeDistance = BINDER_LIB_SWIPE_DISTANCE;
            }
            const ui = flip.getUI();
            if (ui && typeof ui.removeHandlers === "function" && typeof ui.setHandlers === "function") {
                ui.removeHandlers();
                ui.setHandlers();
            }
        }, [engineMounted, isBookEngineReady, animationsEnabled, isPortraitBook]);

        useEffect(() => {
            const stage = stageRef.current;
            if (!stage || !engineMounted) return;

            let startX = 0;
            let startY = 0;
            let pointerId: number | null = null;
            let suppressClick = false;

            const onPointerDown = (event: PointerEvent) => {
                pointerId = event.pointerId;
                startX = event.clientX;
                startY = event.clientY;
            };

            const onPointerUp = (event: PointerEvent) => {
                if (pointerId !== event.pointerId) return;
                pointerId = null;
                const direction = resolveBinderPageSwipe({
                    dx: event.clientX - startX,
                    dy: event.clientY - startY,
                    isBusy: isFlippingRef.current,
                });
                if (!direction) return;
                suppressClick = true;
                if (direction === "next") {
                    flipNextPage();
                } else {
                    flipPrevPage();
                }
            };

            const onClick = (event: Event) => {
                if (!suppressClick) return;
                suppressClick = false;
                event.preventDefault();
                event.stopPropagation();
            };

            stage.addEventListener("pointerdown", onPointerDown, true);
            stage.addEventListener("pointerup", onPointerUp, true);
            stage.addEventListener("pointercancel", onPointerUp, true);
            stage.addEventListener("click", onClick, true);

            return () => {
                stage.removeEventListener("pointerdown", onPointerDown, true);
                stage.removeEventListener("pointerup", onPointerUp, true);
                stage.removeEventListener("pointercancel", onPointerUp, true);
                stage.removeEventListener("click", onClick, true);
            };
        }, [engineMounted, flipNextPage, flipPrevPage]);

        const handleChangeState = useCallback(
            (e: { data: unknown }) => {
                const state = typeof e.data === "string" ? e.data : "";
                const busy = isBinderPageBusy(state);
                isFlippingRef.current = busy;
                setIsPageBusy(busy);
                if (
                    shouldSignalBinderReady({
                        animateFromCover: openPlan.animateFromCover,
                        hasAutoOpened: hasAutoOpenedRef.current,
                        isBusy: busy,
                    })
                ) {
                    signalReady();
                }
            },
            [openPlan.animateFromCover, signalReady],
        );

        const handleFlip = useCallback(
            (e: { data: unknown }) => {
                const physicalIndex = typeof e.data === "number" ? e.data : 0;
                const flip = flipBookRef.current?.pageFlip();
                const orientation = flip?.getOrientation() ?? (isPortraitBook ? "portrait" : "landscape");
                const isPortrait = orientation === "portrait";

                const multi = multiFlipStateRef.current;
                if (multi) {
                    const nextPhysicalTarget = multi.remainingPhysicalTargets.shift();
                    if (nextPhysicalTarget != null) {
                        multiFlipTimeoutRef.current = window.setTimeout(() => {
                            const currentFlip = flipBookRef.current?.pageFlip();
                            if (!currentFlip) return;
                            currentFlip.flip(nextPhysicalTarget);
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

        const imagePageSet = useMemo(() => new Set(imagePages ?? []), [imagePages]);
        const priorityPageSet = useMemo(() => new Set(priorityPages ?? []), [priorityPages]);

        const contextValue = useMemo(
            () => ({
                cardsMap,
                availableCounts,
                highlightedDexId,
                droppingDexId,
                imagePages: imagePageSet,
                priorityPages: priorityPageSet,
                pauseTilt: isPageBusy,
                onSlotClick,
                onSwapClick,
            }),
            [cardsMap, availableCounts, highlightedDexId, droppingDexId, imagePageSet, priorityPageSet, isPageBusy, onSlotClick, onSwapClick],
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
                <div className={`relative flex h-auto min-h-0 w-full max-w-full flex-col items-center overflow-x-clip select-none md:h-full ${readyToOpen && isBookEngineReady ? (animationsEnabled ? "binder-stage-entrance" : "") : "invisible"}`} style={{ "--binder-entrance-duration": `${BINDER_ENTRANCE_MS}ms` } as React.CSSProperties}>
                    <div ref={stageRef} className={`binder-book-stage relative flex h-auto min-h-0 w-full items-center justify-center md:h-full ${isPortraitBook ? "binder-book-stage--portrait" : ""} ${isPageBusy ? "binder-book-stage--busy" : ""}`}>
                        {engineMounted && (
                            <HTMLFlipBook
                                key={isPortraitBook ? "portrait" : "landscape"}
                                ref={flipBookRef}
                                width={BINDER_PAGE_WIDTH}
                                height={BINDER_PAGE_HEIGHT}
                                size="stretch"
                                minWidth={isPortraitBook ? BINDER_PAGE_MIN_WIDTH_MOBILE : BINDER_PAGE_MIN_WIDTH}
                                maxWidth={isPortraitBook ? 480 : BINDER_PAGE_MAX_WIDTH}
                                minHeight={isPortraitBook ? BINDER_PAGE_MIN_HEIGHT_MOBILE : 540}
                                maxHeight={isPortraitBook ? 760 : 820}
                                maxShadowOpacity={isPortraitBook ? BINDER_MOBILE_MAX_SHADOW_OPACITY : BINDER_DESKTOP_MAX_SHADOW_OPACITY}
                                showCover={true}
                                mobileScrollSupport={true}
                                swipeDistance={BINDER_LIB_SWIPE_DISTANCE}
                                clickEventForward={true}
                                disableFlipByClick={!animationsEnabled || binderPageFlipDisableFlipByClick(isPortraitBook)}
                                flippingTime={BINDER_FLIP_MS}
                                usePortrait={isPortraitBook}
                                startPage={hasAutoOpenedRef.current ? catalogPageToPhysicalIndex(currentPage, isPortraitBook) : openPlan.startPhysical}
                                onFlip={handleFlip}
                                onInit={handleInit}
                                onChangeState={handleChangeState}
                                drawShadow={animationsEnabled}
                                startZIndex={0}
                                autoSize={binderPageFlipAutoSize(isPortraitBook)}
                                useMouseEvents={BINDER_USE_MOUSE_EVENTS}
                                showPageCorners={false}
                                renderOnlyPageLengthChange={true}
                                className={`binder-flipbook-root ${isPortraitBook ? "binder-flipbook-root--portrait" : ""} ${!animationsEnabled ? "binder-flipbook-root--static" : ""} ${isBookEngineReady ? "opacity-100" : "opacity-0"}`}
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
