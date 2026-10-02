"use client";

import { createContext, forwardRef, memo, useCallback, useContext, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import HTMLFlipBook from "react-pageflip";
import { BinderCoverArt } from "@/components/binder/BinderCoverArt";
import { PokemonBallSvg } from "@/components/theme/PokemonBallSvg";
import { UserSettingsContext } from "@/lib/context/UserSettingsContext";
import { BINDER_DESKTOP_MAX_SHADOW_OPACITY, BINDER_FLIP_MS, BINDER_LIB_SWIPE_DISTANCE, BINDER_MULTI_FLIP_STEP_MS, BINDER_PAGE_HEIGHT, BINDER_PAGE_MAX_WIDTH, BINDER_PAGE_MIN_WIDTH, BINDER_PAGE_WIDTH, BINDER_SWIPE_THRESHOLD_PX } from "@/lib/pokemon/binderOpen";
import type { Binder, BinderSlot } from "@/types/binder";
import { getCoverTheme } from "@/lib/binder/themes";
import { getBinderSlotPageCount, getBinderTrailingSlotPage } from "@/lib/binder/pageCapacity";
import { getUniversalPageForPhysical, getUniversalPhysicalForPage, isUniversalAlreadyOnTarget, planUniversalPageNavigation } from "@/lib/binder/universalBookNavigation";
import { UniversalBinderSlot } from "./UniversalBinderSlot";

export interface UniversalBinderNavigationHandle {
    flipNext: () => void;
    flipPrev: () => void;
    turnToPage: (page: number) => void;
    isBusy: () => boolean;
}

interface UniversalBinderBookProps {
    binder: Binder;
    slots: BinderSlot[];
    currentPage: number;
    entryTargetPage: number;
    isMobile: boolean;
    highlightedSlotId?: string | null;
    droppingSlotId?: string | null;
    onPageChange: (page: number) => void;
    onSlotClick: (slot: BinderSlot) => void;
}

const GRID_CLASSES = {
    "1x1": "grid-cols-1 grid-rows-1 p-3",
    "2x2": "grid-cols-2 grid-rows-2 gap-2.5 sm:gap-3 p-2",
    "3x3": "grid-cols-3 grid-rows-3 gap-2 sm:gap-2.5 p-1.5",
    "3x4": "grid-cols-3 grid-rows-4 gap-1.5 sm:gap-2 p-1",
} as const;

const SLOTS_PER_GRID = {
    "1x1": 1,
    "2x2": 4,
    "3x3": 9,
    "3x4": 12,
} as const;

function clampPage(page: number, totalPages: number) {
    return Math.min(totalPages, Math.max(1, Math.trunc(page) || 1));
}

function createVirtualSlot(binder: Binder, pageNumber: number, slotIndex: number): BinderSlot {
    return {
        id: `virtual-${pageNumber}-${slotIndex}`,
        binder_id: binder.id,
        page_number: pageNumber,
        slot_index: slotIndex,
        slot_type: "free",
        created_at: "",
        updated_at: "",
    };
}

function getPageSlots(binder: Binder, slotsMap: Map<string, BinderSlot>, pageNumber: number) {
    return Array.from({ length: SLOTS_PER_GRID[binder.grid_type] }, (_, index) => slotsMap.get(`${pageNumber}-${index + 1}`) ?? createVirtualSlot(binder, pageNumber, index + 1));
}

const BinderCover = forwardRef<HTMLDivElement, { binder: Binder; back?: boolean; onClick?: () => void }>(function BinderCover({ binder, back = false, onClick }, ref) {
    return (
        <div ref={ref} data-density="hard" onClick={onClick} className={`binder-book-page ${back ? "binder-cover-back" : "binder-cover-front cursor-pointer"} h-full w-full overflow-hidden rounded-xl`}>
            <BinderCoverArt name={binder.name} coverTheme={binder.cover_theme} coverPokemonDexId={back ? null : binder.cover_pokemon_dex_id} back={back} className="h-full" />
        </div>
    );
});

const InsideCover = forwardRef<HTMLDivElement, { binder: Binder }>(function InsideCover({ binder }, ref) {
    const theme = getCoverTheme(binder.cover_theme);
    return (
        <div ref={ref} data-density="hard" className="binder-book-page relative h-full w-full overflow-hidden rounded-xl border border-white/5 bg-[#0c1017]" style={{ backgroundImage: `radial-gradient(circle at 50% 50%, ${theme.primaryColor}22, transparent 44%), repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 8px)` }}>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <PokemonBallSvg ballType={theme.ballType} size={260} className="h-[52%] w-[52%] max-h-[260px] max-w-[260px] opacity-[0.09]" style={{ filter: "none" }} />
            </div>
        </div>
    );
});

interface CatalogPageProps {
    binder: Binder;
    pageNumber: number;
}

interface UniversalBinderPagesContextValue {
    slotsMap: Map<string, BinderSlot>;
    highlightedSlotId?: string | null;
    droppingSlotId?: string | null;
    pauseTilt: boolean;
    onSlotClick: (slot: BinderSlot) => void;
}

const UniversalBinderPagesContext = createContext<UniversalBinderPagesContextValue>({
    slotsMap: new Map(),
    highlightedSlotId: null,
    droppingSlotId: null,
    pauseTilt: false,
    onSlotClick: () => {},
});

const CatalogPage = memo(
    forwardRef<HTMLDivElement, CatalogPageProps>(function CatalogPage({ binder, pageNumber }, ref) {
        const { slotsMap, highlightedSlotId, droppingSlotId, pauseTilt, onSlotClick } = useContext(UniversalBinderPagesContext);
        const slots = getPageSlots(binder, slotsMap, pageNumber);
        const filledCount = slots.filter((slot) => slot.card).length;

        return (
            <div ref={ref} data-density="soft" className="binder-book-page relative h-full w-full rounded-xl bg-[#0d111a]">
                <div className="flex h-full min-h-0 w-full flex-col rounded-xl border border-white/5 bg-gradient-to-br from-[#141824] via-[#10131d] to-[#0a0d14] px-3 pt-3 pb-2 text-white sm:px-3.5 sm:pt-3.5">
                    <div className="mb-1.5 flex shrink-0 items-center justify-between border-b border-white/5 pb-1.5 text-xs font-semibold text-slate-400">
                        <span className="font-medium text-slate-300">
                            Página {pageNumber} de {getBinderSlotPageCount(binder.total_pages)}
                        </span>
                        <span className="font-mono text-[11px] text-slate-500">
                            {filledCount}/{slots.length} cartas
                        </span>
                    </div>
                    <div className={`grid min-h-0 flex-1 rounded-xl border border-[#161b26] bg-[#0b0e15] shadow-inner ${GRID_CLASSES[binder.grid_type]}`}>
                        {slots.map((slot) => (
                            <UniversalBinderSlot key={slot.id} slot={slot} card={slot.card} isHighlighted={highlightedSlotId === slot.id} isDropping={droppingSlotId === slot.id} pauseTilt={pauseTilt} onClick={() => onSlotClick(slot)} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }),
);

function GenericMobileBook({ binder, slotsMap, currentPage, highlightedSlotId, droppingSlotId, onPageChange, onSlotClick }: Omit<UniversalBinderBookProps, "slots" | "isMobile" | "entryTargetPage"> & { slotsMap: Map<string, BinderSlot> }) {
    const settings = useContext(UserSettingsContext);
    const animationsEnabled = settings?.animationsEnabled ?? true;
    const [phase, setPhase] = useState<"idle" | "exit" | "enter">("idle");
    const [displayPage, setDisplayPage] = useState(currentPage);
    const directionRef = useRef(1);
    const pointerRef = useRef<{ id: number; x: number; y: number } | null>(null);
    const suppressClickRef = useRef(false);
    const busy = phase !== "idle";
    const slotPageCount = getBinderSlotPageCount(binder.total_pages);
    const pageSlots = getPageSlots(binder, slotsMap, displayPage);

    const navigate = useCallback(
        (requestedPage: number) => {
            const nextPage = clampPage(requestedPage, slotPageCount);
            if (busy || nextPage === displayPage) return;
            directionRef.current = nextPage > displayPage ? 1 : -1;
            if (!animationsEnabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                setDisplayPage(nextPage);
                onPageChange(nextPage);
                return;
            }
            setPhase("exit");
            window.setTimeout(() => {
                setDisplayPage(nextPage);
                onPageChange(nextPage);
                setPhase("enter");
                window.setTimeout(() => setPhase("idle"), 180);
            }, 140);
        },
        [animationsEnabled, busy, displayPage, onPageChange, slotPageCount],
    );

    useEffect(() => {
        if (currentPage !== displayPage && !busy) navigate(currentPage);
    }, [busy, currentPage, displayPage, navigate]);

    return (
        <div
            className={`binder-mobile binder-mobile--entrance ${busy ? "pointer-events-none" : ""}`}
            onPointerDownCapture={(event) => {
                suppressClickRef.current = false;
                pointerRef.current = event.isPrimary && !busy ? { id: event.pointerId, x: event.clientX, y: event.clientY } : null;
            }}
            onPointerUpCapture={(event) => {
                const start = pointerRef.current;
                pointerRef.current = null;
                if (!start || start.id !== event.pointerId) return;
                const dx = event.clientX - start.x;
                const dy = event.clientY - start.y;
                if (Math.abs(dx) < BINDER_SWIPE_THRESHOLD_PX || Math.abs(dx) <= Math.abs(dy)) return;
                suppressClickRef.current = true;
                navigate(displayPage + (dx < 0 ? 1 : -1));
            }}
            onClickCapture={(event) => {
                if (!suppressClickRef.current) return;
                event.preventDefault();
                event.stopPropagation();
                suppressClickRef.current = false;
            }}
        >
            <div className="mb-1.5 flex shrink-0 items-center justify-between border-b border-white/5 pb-1.5 text-xs font-semibold text-slate-400">
                <span className="font-medium text-slate-300">
                    Página {displayPage} de {slotPageCount}
                </span>
                <span className="font-mono text-[11px] text-slate-500">
                    {pageSlots.filter((slot) => slot.card).length}/{pageSlots.length} cartas
                </span>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden rounded-xl border border-[#161b26] bg-[#0b0e15] p-1.5 shadow-inner">
                <div className={`binder-mobile-grid grid h-full min-h-0 ${GRID_CLASSES[binder.grid_type]}`} data-phase={phase} style={{ "--binder-slide-x": `${directionRef.current * -18}px` } as CSSProperties}>
                    {pageSlots.map((slot) => (
                        <UniversalBinderSlot key={slot.id} slot={slot} card={slot.card} isHighlighted={highlightedSlotId === slot.id} isDropping={droppingSlotId === slot.id} pauseTilt={busy} onClick={() => onSlotClick(slot)} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export const UniversalBinderBook = forwardRef<UniversalBinderNavigationHandle, UniversalBinderBookProps>(function UniversalBinderBook({ binder, slots, currentPage, entryTargetPage, isMobile, highlightedSlotId, droppingSlotId, onPageChange, onSlotClick }, ref) {
    const settings = useContext(UserSettingsContext);
    const animationsEnabled = settings?.animationsEnabled ?? true;
    const [engineMounted, setEngineMounted] = useState(false);
    const [engineReady, setEngineReady] = useState(false);
    const [isBusy, setIsBusy] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);
    const stageRef = useRef<HTMLDivElement>(null);
    const flipBookRef = useRef<any>(null);
    const currentPhysicalRef = useRef(0);
    const hasHandledEntryTargetRef = useRef(false);
    const slotPageCount = getBinderSlotPageCount(binder.total_pages);
    const trailingSlotPage = getBinderTrailingSlotPage(binder.total_pages);
    const slotsMap = useMemo(() => new Map(slots.map((slot) => [`${slot.page_number}-${slot.slot_index}`, slot])), [slots]);
    const coverTheme = useMemo(() => getCoverTheme(binder.cover_theme), [binder.cover_theme]);
    const pagesContextValue = useMemo(() => ({ slotsMap, highlightedSlotId, droppingSlotId, pauseTilt: isBusy, onSlotClick }), [droppingSlotId, highlightedSlotId, isBusy, onSlotClick, slotsMap]);

    useLayoutEffect(() => {
        if (isMobile) return undefined;
        const stage = stageRef.current;
        if (!stage) return undefined;
        const mount = () => {
            if (stage.getBoundingClientRect().width < 160) return false;
            setEngineMounted(true);
            return true;
        };
        if (mount()) return undefined;
        const observer = new ResizeObserver(() => {
            if (mount()) observer.disconnect();
        });
        observer.observe(stage);
        return () => observer.disconnect();
    }, [isMobile]);

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
    }, []);

    useEffect(() => {
        return () => {
            resetMultiFlip();
        };
    }, [resetMultiFlip]);

    const physicalForPage = useCallback((page: number) => getUniversalPhysicalForPage(page, binder.total_pages, isMobile), [binder.total_pages, isMobile]);

    const pageForPhysical = useCallback((physical: number) => getUniversalPageForPhysical(physical, binder.total_pages, isMobile), [binder.total_pages, isMobile]);

    const turnToPage = useCallback(
        (page: number) => {
            if (isMobile) {
                onPageChange(clampPage(page, slotPageCount));
                return;
            }
            const flip = flipBookRef.current?.pageFlip();
            if (!flip || isBusy || multiFlipStateRef.current !== null) return;
            const target = physicalForPage(page);
            const currentPhysical = currentPhysicalRef.current;
            if (isUniversalAlreadyOnTarget(currentPhysical, target, binder.total_pages)) return;

            if (!animationsEnabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                resetMultiFlip();
                flip.turnToPage(target);
                return;
            }

            const navigation = planUniversalPageNavigation(currentPhysical, target, binder.total_pages);
            if (navigation.mode === "direct") {
                resetMultiFlip();
                flip.getSettings().flippingTime = BINDER_FLIP_MS;
                flip.flip(navigation.targetPhysical);
                return;
            }

            multiFlipStateRef.current = {
                remainingPhysicalTargets: navigation.intermediatePhysicalTargets.slice(1),
                targetPhysical: navigation.targetPhysical,
            };
            setIsBusy(true);
            flip.getSettings().flippingTime = BINDER_MULTI_FLIP_STEP_MS;
            flip.flip(navigation.intermediatePhysicalTargets[0]);
        },
        [animationsEnabled, binder.total_pages, isBusy, isMobile, onPageChange, physicalForPage, resetMultiFlip, slotPageCount],
    );

    const flipNext = useCallback(() => {
        if (isMobile) {
            onPageChange(clampPage(currentPage + 1, slotPageCount));
            return;
        }
        if (multiFlipStateRef.current) return;
        const flip = flipBookRef.current?.pageFlip();
        if (flip && !isBusy) {
            resetMultiFlip();
            flip.getSettings().flippingTime = BINDER_FLIP_MS;
            flip.flipNext();
        }
    }, [currentPage, isBusy, isMobile, onPageChange, resetMultiFlip, slotPageCount]);

    const flipPrev = useCallback(() => {
        if (isMobile) {
            onPageChange(clampPage(currentPage - 1, slotPageCount));
            return;
        }
        if (multiFlipStateRef.current) return;
        const flip = flipBookRef.current?.pageFlip();
        if (flip && !isBusy) {
            resetMultiFlip();
            flip.getSettings().flippingTime = BINDER_FLIP_MS;
            flip.flipPrev();
        }
    }, [currentPage, isBusy, isMobile, onPageChange, resetMultiFlip, slotPageCount]);

    useImperativeHandle(ref, () => ({ flipNext, flipPrev, turnToPage, isBusy: () => isBusy || multiFlipStateRef.current !== null }), [flipNext, flipPrev, isBusy, turnToPage]);

    const openBinder = useCallback(() => {
        if (isMobile || hasOpened || isBusy) return;
        const flip = flipBookRef.current?.pageFlip();
        if (!flip) return;
        setHasOpened(true);
        setIsBusy(true);
        if (animationsEnabled && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            flip.flipNext();
        } else {
            flip.turnToPage(2);
        }
    }, [animationsEnabled, hasOpened, isBusy, isMobile]);

    useEffect(() => {
        if (isMobile || !engineReady || !engineMounted || hasOpened) return;
        const timer = window.setTimeout(openBinder, 820);
        return () => window.clearTimeout(timer);
    }, [engineMounted, engineReady, hasOpened, isMobile, openBinder]);

    useEffect(() => {
        if (isMobile || !hasOpened || isBusy) return;
        const expectedPhysical = physicalForPage(currentPage);
        if (pageForPhysical(currentPhysicalRef.current) !== pageForPhysical(expectedPhysical)) turnToPage(currentPage);
    }, [currentPage, hasOpened, isBusy, isMobile, pageForPhysical, physicalForPage, turnToPage]);

    useEffect(() => {
        if (isMobile || !hasOpened || isBusy || hasHandledEntryTargetRef.current) return;
        hasHandledEntryTargetRef.current = true;
        if (entryTargetPage !== 1) turnToPage(entryTargetPage);
    }, [entryTargetPage, hasOpened, isBusy, isMobile, turnToPage]);

    const sheets = useMemo(() => {
        const result: React.ReactNode[] = [<BinderCover key="front" binder={binder} onClick={openBinder} />, <InsideCover key="inside-front" binder={binder} />];
        for (let page = 1; page <= binder.total_pages; page++) {
            result.push(<CatalogPage key={`catalog-${page}`} binder={binder} pageNumber={page} />);
        }
        if (trailingSlotPage !== null) {
            result.push(<CatalogPage key="trailing-slots" binder={binder} pageNumber={trailingSlotPage} />);
        }
        result.push(<InsideCover key="inside-back" binder={binder} />, <BinderCover key="back" binder={binder} back />);
        return result;
    }, [binder, openBinder, trailingSlotPage]);

    if (isMobile) {
        return (
            <div className="w-full" style={{ "--theme-primary": coverTheme.primaryColor, "--theme-primary-glow": coverTheme.glowColor } as CSSProperties}>
                <GenericMobileBook binder={binder} slotsMap={slotsMap} currentPage={currentPage} highlightedSlotId={highlightedSlotId} droppingSlotId={droppingSlotId} onPageChange={onPageChange} onSlotClick={onSlotClick} />
            </div>
        );
    }

    return (
        <UniversalBinderPagesContext.Provider value={pagesContextValue}>
            <div className={`relative flex h-full min-h-0 w-full flex-col items-center ${engineReady ? "binder-stage-entrance" : "invisible"}`} style={{ "--binder-entrance-duration": "720ms", "--theme-primary": coverTheme.primaryColor, "--theme-primary-glow": coverTheme.glowColor } as CSSProperties}>
                <div ref={stageRef} className={`binder-book-stage ${isBusy ? "binder-book-stage--busy" : ""}`}>
                    {engineMounted ? (
                        <HTMLFlipBook
                            ref={flipBookRef}
                            width={BINDER_PAGE_WIDTH}
                            height={BINDER_PAGE_HEIGHT}
                            size="stretch"
                            minWidth={BINDER_PAGE_MIN_WIDTH}
                            maxWidth={BINDER_PAGE_MAX_WIDTH}
                            minHeight={540}
                            maxHeight={820}
                            maxShadowOpacity={BINDER_DESKTOP_MAX_SHADOW_OPACITY}
                            showCover
                            mobileScrollSupport
                            swipeDistance={BINDER_LIB_SWIPE_DISTANCE}
                            clickEventForward
                            disableFlipByClick={!animationsEnabled}
                            flippingTime={BINDER_FLIP_MS}
                            usePortrait={false}
                            startPage={0}
                            onInit={() => setEngineReady(true)}
                            onChangeState={(event) => {
                                const stateBusy = ["flipping", "user_fold", "fold_corner"].includes(String(event.data));
                                setIsBusy(stateBusy || multiFlipStateRef.current !== null);
                            }}
                            onFlip={(event) => {
                                const physical = Number(event.data) || 0;
                                currentPhysicalRef.current = physical;

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

                                onPageChange(pageForPhysical(physical));
                            }}
                            drawShadow={animationsEnabled}
                            startZIndex={0}
                            autoSize
                            useMouseEvents={false}
                            showPageCorners={false}
                            renderOnlyPageLengthChange
                            className={`binder-flipbook-root ${!animationsEnabled ? "binder-flipbook-root--static" : ""}`}
                            style={{}}
                        >
                            {sheets}
                        </HTMLFlipBook>
                    ) : null}
                </div>
            </div>
        </UniversalBinderPagesContext.Provider>
    );
});
