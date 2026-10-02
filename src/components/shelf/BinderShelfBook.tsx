"use client";

import { forwardRef, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import HTMLFlipBook from "react-pageflip";
import { BinderCoverArt } from "@/components/binder/BinderCoverArt";
import { PokemonBallSvg } from "@/components/theme/PokemonBallSvg";
import { getCoverTheme } from "@/lib/binder/themes";
import { UserSettingsContext } from "@/lib/context/UserSettingsContext";
import { BINDER_DESKTOP_MAX_SHADOW_OPACITY, BINDER_FLIP_MS, BINDER_LIB_SWIPE_DISTANCE } from "@/lib/pokemon/binderOpen";
import type { Binder, GridType } from "@/types/binder";

interface BinderShelfBookProps {
    binder: Binder;
    active: boolean;
    onReady?: () => void;
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

const SHELF_PAGE_WIDTH = 264;
const SHELF_PAGE_HEIGHT = 372;

const ShelfFrontCover = forwardRef<HTMLDivElement, { binder: Binder }>(function ShelfFrontCover({ binder }, ref) {
    return (
        <div ref={ref} data-density="hard" className="binder-book-page binder-cover-front h-full w-full overflow-hidden rounded-[10px]">
            <BinderCoverArt name={binder.name} coverTheme={binder.cover_theme} coverPokemonDexId={binder.cover_pokemon_dex_id} className="h-full" />
        </div>
    );
});

const ShelfInsideCover = forwardRef<HTMLDivElement, { binder: Binder }>(function ShelfInsideCover({ binder }, ref) {
    const theme = getCoverTheme(binder.cover_theme);

    return (
        <div ref={ref} data-density="hard" className="binder-book-page relative h-full w-full overflow-hidden rounded-[10px] border border-white/[0.08] bg-[#0c1017]" style={{ backgroundImage: `radial-gradient(circle at 50% 50%, ${theme.primaryColor}22, transparent 44%), repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 8px)` }}>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <PokemonBallSvg ballType={theme.ballType} size={180} className="h-[52%] w-[52%] opacity-[0.09]" style={{ filter: "none" }} />
            </div>
        </div>
    );
});

const ShelfCatalogPage = forwardRef<HTMLDivElement, { binder: Binder }>(function ShelfCatalogPage({ binder }, ref) {
    const theme = getCoverTheme(binder.cover_theme);
    const previewCards = binder.preview_cards ?? [];
    const slotCount = SLOT_COUNTS[binder.grid_type];
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
        <div ref={ref} data-density="soft" className="binder-book-page h-full w-full rounded-[10px] bg-[#0d111a]">
            <div className="flex h-full min-h-0 w-full flex-col rounded-[10px] border border-white/[0.08] bg-gradient-to-br from-[#141824] via-[#10131d] to-[#0a0d14] p-2 text-white">
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
                                {card && <Image src={card.card_image_url} alt="" width={84} height={117} unoptimized className="h-full w-full object-cover" />}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});

const ShelfEmptyPage = forwardRef<HTMLDivElement>(function ShelfEmptyPage(_, ref) {
    return <div ref={ref} data-density="soft" className="binder-book-page h-full w-full rounded-[10px] border border-white/[0.06] bg-[#0d111a]" />;
});

const ShelfBackCover = forwardRef<HTMLDivElement, { binder: Binder }>(function ShelfBackCover({ binder }, ref) {
    return (
        <div ref={ref} data-density="hard" className="binder-book-page binder-cover-back h-full w-full overflow-hidden rounded-[10px]">
            <BinderCoverArt name={binder.name} coverTheme={binder.cover_theme} coverPokemonDexId={null} back className="h-full" />
        </div>
    );
});

export function BinderShelfBook({ binder, active, onReady }: BinderShelfBookProps) {
    const settings = useContext(UserSettingsContext);
    const animationsEnabled = settings?.animationsEnabled ?? true;
    const stageRef = useRef<HTMLDivElement>(null);
    const flipBookRef = useRef<any>(null);
    const readyRef = useRef(false);
    const busyRef = useRef(false);
    const currentPageRef = useRef(0);
    const activeRef = useRef(active);
    const openAllowedRef = useRef(false);
    const openFrameRef = useRef<number | null>(null);
    const openWaitVersionRef = useRef(0);

    const reconcile = useCallback(() => {
        const flip = flipBookRef.current?.pageFlip();
        if (!flip || !readyRef.current || busyRef.current) return;

        if (activeRef.current && openAllowedRef.current && currentPageRef.current === 0) {
            if (animationsEnabled && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                flip.getSettings().flippingTime = BINDER_FLIP_MS;
                flip.flipNext();
            } else {
                flip.turnToPage(2);
            }
            return;
        }

        if (!activeRef.current && currentPageRef.current !== 0) {
            if (animationsEnabled && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                flip.getSettings().flippingTime = BINDER_FLIP_MS;
                flip.flipPrev();
            } else {
                flip.turnToPage(0);
            }
        }
    }, [animationsEnabled]);

    useEffect(() => {
        activeRef.current = active;
        openAllowedRef.current = false;
        const waitVersion = ++openWaitVersionRef.current;
        if (openFrameRef.current !== null) {
            window.cancelAnimationFrame(openFrameRef.current);
            openFrameRef.current = null;
        }

        if (active) {
            openFrameRef.current = window.requestAnimationFrame(() => {
                openFrameRef.current = null;
                const transition = stageRef.current?.getAnimations().find((animation) => "transitionProperty" in animation && (animation as CSSTransition).transitionProperty === "transform");
                const open = () => {
                    if (waitVersion !== openWaitVersionRef.current || !activeRef.current) return;
                    openFrameRef.current = window.requestAnimationFrame(() => {
                        openFrameRef.current = null;
                        if (waitVersion !== openWaitVersionRef.current || !activeRef.current) return;
                        openAllowedRef.current = true;
                        reconcile();
                    });
                };

                if (transition) {
                    void transition.finished.then(open).catch(() => undefined);
                } else {
                    open();
                }
            });
        } else {
            reconcile();
        }

        return () => {
            if (openWaitVersionRef.current === waitVersion) openWaitVersionRef.current += 1;
            if (openFrameRef.current !== null) window.cancelAnimationFrame(openFrameRef.current);
        };
    }, [active, reconcile]);

    const sheets = useMemo(() => [<ShelfFrontCover key="front" binder={binder} />, <ShelfInsideCover key="inside-front" binder={binder} />, <ShelfCatalogPage key="catalog" binder={binder} />, <ShelfEmptyPage key="empty" />, <ShelfInsideCover key="inside-back" binder={binder} />, <ShelfBackCover key="back" binder={binder} />], [binder]);

    return (
        <div ref={stageRef} data-shelf-page="0" data-shelf-state="read" className="binder-shelf-stage relative mx-auto h-[372px] w-[264px] max-w-full">
            <div className="binder-shelf-engine h-[372px] w-[264px]">
                <HTMLFlipBook
                    ref={flipBookRef}
                    width={SHELF_PAGE_WIDTH}
                    height={SHELF_PAGE_HEIGHT}
                    size="fixed"
                    minWidth={SHELF_PAGE_WIDTH}
                    maxWidth={SHELF_PAGE_WIDTH}
                    minHeight={SHELF_PAGE_HEIGHT}
                    maxHeight={SHELF_PAGE_HEIGHT}
                    maxShadowOpacity={BINDER_DESKTOP_MAX_SHADOW_OPACITY}
                    showCover
                    mobileScrollSupport
                    swipeDistance={BINDER_LIB_SWIPE_DISTANCE}
                    clickEventForward
                    disableFlipByClick={!animationsEnabled}
                    flippingTime={BINDER_FLIP_MS}
                    usePortrait={false}
                    startPage={0}
                    onInit={() => {
                        readyRef.current = true;
                        onReady?.();
                        reconcile();
                    }}
                    onChangeState={(event) => {
                        const state = String(event.data);
                        if (stageRef.current) stageRef.current.dataset.shelfState = state;
                        busyRef.current = state !== "read";
                        if (!busyRef.current) {
                            window.setTimeout(() => {
                                reconcile();
                            }, 0);
                        }
                    }}
                    onFlip={(event) => {
                        currentPageRef.current = Number(event.data) || 0;
                        if (stageRef.current) stageRef.current.dataset.shelfPage = String(currentPageRef.current);
                    }}
                    drawShadow={animationsEnabled}
                    startZIndex={0}
                    autoSize={false}
                    useMouseEvents={false}
                    showPageCorners={false}
                    renderOnlyPageLengthChange
                    className="binder-shelf-flipbook-root"
                    style={{}}
                >
                    {sheets}
                </HTMLFlipBook>
            </div>
        </div>
    );
}
