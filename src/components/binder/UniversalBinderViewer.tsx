"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, BarChart2, Check, ChevronDown, ChevronLeft, ChevronRight, Settings } from "lucide-react";
import { CardSearchModal } from "@/components/modal/CardSearchModal";
import { UniversalSlotModal } from "@/components/modal/UniversalSlotModal";
import { getBinderSlotPageCount } from "@/lib/binder/pageCapacity";
import { canRevealUniversalSlotHighlight } from "@/lib/binder/universalHighlight";
import { getUniversalPageForPhysical, getUniversalPhysicalForPage } from "@/lib/binder/universalBookNavigation";
import { isBinderSlotPainted } from "@/lib/pokemon/binderHighlight";
import type { Binder, BinderSlot, GridType, UserCard } from "@/types/binder";
import { BinderStatisticsDrawer } from "./BinderStatisticsDrawer";
import { BinderControls } from "./BinderControls";
import { UniversalBinderBook, type UniversalBinderNavigationHandle } from "./UniversalBinderBook";

export interface UniversalBinderViewerProps {
    binder: Binder;
    initialSlots: BinderSlot[];
    otherBinders?: Array<{ id: string; name: string; grid_type: GridType }>;
    isOwner?: boolean;
}

function clampPage(page: number, totalPages: number) {
    return Math.min(totalPages, Math.max(1, Math.trunc(page) || 1));
}

export function UniversalBinderViewer({ binder, initialSlots, otherBinders = [], isOwner = true }: UniversalBinderViewerProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const slotPageCount = getBinderSlotPageCount(binder.total_pages);
    const initialTargetPage = clampPage(Number(searchParams.get("page")), slotPageCount);
    const bookRef = useRef<UniversalBinderNavigationHandle>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [slots, setSlots] = useState(initialSlots);
    const [isMobile, setIsMobile] = useState(false);
    const [hoveredPage, setHoveredPage] = useState<number | null>(null);
    const [isStatsOpen, setIsStatsOpen] = useState(false);
    const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<BinderSlot | null>(null);
    const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
    const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
    const [catalogSearchName, setCatalogSearchName] = useState<string | undefined>();
    const [catalogDexId, setCatalogDexId] = useState<number | undefined>();
    const [highlightedSlotId, setHighlightedSlotId] = useState<string | null>(null);
    const [pendingHighlight, setPendingHighlight] = useState<{ slotId: string; pageNumber: number; requestId: number } | null>(null);
    const [droppingSlotId, setDroppingSlotId] = useState<string | null>(null);
    const highlightRequestIdRef = useRef(0);
    const highlightTimerRef = useRef<number | null>(null);
    const openedSlotFromUrlRef = useRef<string | null>(null);
    const catalogSlotIdRef = useRef<string | null>(null);
    const catalogReturnTimerRef = useRef<number | null>(null);
    const catalogOpenTimerRef = useRef<number | null>(null);

    useEffect(() => {
        const updateViewport = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            setCurrentPage((page) => (mobile ? clampPage(page === 1 ? initialTargetPage : page, slotPageCount) : Math.min(binder.total_pages + 2, Math.max(0, page))));
        };
        updateViewport();
        window.addEventListener("resize", updateViewport);
        return () => window.removeEventListener("resize", updateViewport);
    }, [binder.total_pages, initialTargetPage, slotPageCount]);

    useEffect(() => {
        const slotId = searchParams.get("openSlot");
        if (!isOwner || !slotId || openedSlotFromUrlRef.current === slotId) return;
        const slot = slots.find((item) => item.id === slotId);
        if (!slot) return;

        openedSlotFromUrlRef.current = slotId;
        setSelectedSlot(slot);
        setIsSlotModalOpen(true);
    }, [isOwner, searchParams, slots]);

    const updatePage = useCallback(
        (page: number) => {
            const nextPage = isMobile ? clampPage(page, slotPageCount) : Math.min(binder.total_pages + 2, Math.max(0, Math.trunc(page) || 0));
            setCurrentPage(nextPage);
            const url = new URL(window.location.href);
            url.searchParams.set("page", String(nextPage));
            window.history.replaceState(window.history.state, "", url.toString());
        },
        [binder.total_pages, isMobile, slotPageCount],
    );

    const goToPage = useCallback(
        (page: number) => {
            const nextPage = clampPage(page, slotPageCount);
            if (nextPage !== currentPage) bookRef.current?.turnToPage(nextPage);
        },
        [currentPage, slotPageCount],
    );

    const requestSlotHighlight = useCallback(
        (pageNumber: number, slotId: string) => {
            highlightRequestIdRef.current += 1;
            const requestId = highlightRequestIdRef.current;
            if (highlightTimerRef.current !== null) {
                window.clearTimeout(highlightTimerRef.current);
                highlightTimerRef.current = null;
            }
            setHighlightedSlotId(null);
            setPendingHighlight({ slotId, pageNumber, requestId });
            goToPage(pageNumber);
        },
        [goToPage],
    );

    useEffect(() => {
        if (!pendingHighlight) return;
        let frameId = 0;
        const deadline = performance.now() + 5000;

        const check = () => {
            if (pendingHighlight.requestId !== highlightRequestIdRef.current) return;
            const element = document.getElementById(`binder-slot-${pendingHighlight.slotId}`);
            const canReveal = canRevealUniversalSlotHighlight({
                targetPage: pendingHighlight.pageNumber,
                currentPage,
                isMobile,
                isBusy: bookRef.current?.isBusy() ?? false,
                isPainted: Boolean(element && isBinderSlotPainted(element)),
            });

            if (canReveal) {
                setPendingHighlight(null);
                setHighlightedSlotId(pendingHighlight.slotId);
                highlightTimerRef.current = window.setTimeout(() => {
                    setHighlightedSlotId(null);
                    highlightTimerRef.current = null;
                }, 2500);
                return;
            }

            if (performance.now() < deadline) {
                frameId = window.requestAnimationFrame(check);
            } else {
                setPendingHighlight(null);
            }
        };

        frameId = window.requestAnimationFrame(check);
        return () => window.cancelAnimationFrame(frameId);
    }, [currentPage, isMobile, pendingHighlight]);

    useEffect(() => {
        return () => {
            highlightRequestIdRef.current += 1;
            if (highlightTimerRef.current !== null) window.clearTimeout(highlightTimerRef.current);
            if (catalogReturnTimerRef.current !== null) window.clearTimeout(catalogReturnTimerRef.current);
            if (catalogOpenTimerRef.current !== null) window.clearTimeout(catalogOpenTimerRef.current);
        };
    }, []);

    const pageStats = useMemo(() => {
        const result = new Map<number, { filled: number; total: number }>();
        for (let page = 1; page <= slotPageCount; page++) result.set(page, { filled: 0, total: 0 });
        for (const slot of slots) {
            const stats = result.get(slot.page_number);
            if (!stats) continue;
            stats.total += 1;
            if (slot.card) stats.filled += 1;
        }
        return result;
    }, [slotPageCount, slots]);

    const hoveredDesktopSpreadPages = useMemo(() => {
        if (isMobile || hoveredPage === null) return null;
        const targetPhysicalPage = getUniversalPhysicalForPage(hoveredPage, binder.total_pages, false);
        const firstPageInSpread = getUniversalPageForPhysical(targetPhysicalPage, binder.total_pages, false);
        return new Set([firstPageInSpread, firstPageInSpread + 1]);
    }, [binder.total_pages, hoveredPage, isMobile]);

    const handleSlotClick = useCallback(
        (slot: BinderSlot) => {
            if (!isOwner) return;
            setSelectedSlot(slot);
            setIsSlotModalOpen(true);
        },
        [isOwner],
    );

    const handleAssignSuccess = useCallback((slotId: string, assignedCard: UserCard) => {
        setSlots((previous) => previous.map((slot) => (slot.id === slotId ? { ...slot, user_card_id: assignedCard.id, card: assignedCard } : slot)));
        setDroppingSlotId(slotId);
        window.setTimeout(() => setDroppingSlotId(null), 1400);
    }, []);

    const handleUnassignSuccess = useCallback((slotId: string) => {
        setSlots((previous) => previous.map((slot) => (slot.id === slotId ? { ...slot, user_card_id: null, card: null } : slot)));
    }, []);

    const handleReturnToSlotModal = useCallback(() => {
        const slotId = catalogSlotIdRef.current;
        setIsCatalogModalOpen(false);
        if (catalogReturnTimerRef.current !== null) window.clearTimeout(catalogReturnTimerRef.current);
        catalogReturnTimerRef.current = window.setTimeout(() => {
            catalogReturnTimerRef.current = null;
            const slot = slots.find((item) => item.id === slotId);
            if (!slot) {
                setSelectedSlot(null);
                return;
            }
            setSelectedSlot(slot);
            setIsSlotModalOpen(true);
        }, 300);
    }, [slots]);

    const handleSlotNavigate = useCallback(
        (pageNumber: number, slotId: string) => {
            requestSlotHighlight(pageNumber, slotId);
        },
        [requestSlotHighlight],
    );

    const handleSearchPokemon = useCallback(
        (dexId: number) => {
            const slot = slots.find((item) => item.target_dex_id === dexId || item.card?.pokemon_dex_id === dexId);
            if (!slot) return;
            requestSlotHighlight(slot.page_number, slot.id);
        },
        [requestSlotHighlight, slots],
    );

    const canGoPrev = currentPage > (isMobile ? 1 : 0);
    const canGoNext = currentPage < (isMobile ? slotPageCount : binder.total_pages + 2);

    return (
        <div className="flex min-h-screen flex-col overflow-x-clip bg-[#0a0c10] text-slate-100">
            <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0c10]/90 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2.5 sm:px-6">
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                        <NextLink href="/" className="flex shrink-0 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white sm:px-3 sm:py-2">
                            <ArrowLeft size={15} />
                            <span className="hidden sm:inline">Estante</span>
                        </NextLink>
                        <div className="relative min-w-0">
                            <button type="button" onClick={() => setIsSwitcherOpen((open) => !open)} className="flex min-w-0 items-center gap-2 rounded-xl border border-transparent px-2 py-1.5 text-left transition-colors hover:border-white/10 hover:bg-white/5">
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h1 className="truncate text-sm font-extrabold text-white sm:text-base">{binder.name}</h1>
                                        <span className="hidden rounded bg-black/40 px-1.5 py-0.5 font-mono text-[10px] font-bold text-slate-300 sm:inline">{binder.grid_type}</span>
                                    </div>
                                    <span className="text-[10px] text-slate-400">
                                        Página {currentPage} de {slotPageCount}
                                    </span>
                                </div>
                                {otherBinders.length > 1 ? <ChevronDown size={14} className="shrink-0 text-slate-400" /> : null}
                            </button>
                            {isSwitcherOpen && otherBinders.length > 1 ? (
                                <div className="absolute top-full left-0 z-50 mt-1.5 w-64 rounded-2xl border border-white/10 bg-[#121622] p-1.5 shadow-2xl backdrop-blur-xl">
                                    <div className="px-2.5 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">Seus binders</div>
                                    <div className="flex max-h-60 flex-col gap-1 overflow-y-auto">
                                        {otherBinders.map((otherBinder) => {
                                            const isCurrent = otherBinder.id === binder.id;
                                            return (
                                                <button
                                                    key={otherBinder.id}
                                                    type="button"
                                                    onClick={() => {
                                                        setIsSwitcherOpen(false);
                                                        if (!isCurrent) router.push(`/binders/${otherBinder.id}`);
                                                    }}
                                                    className={`flex items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs font-semibold transition-colors ${isCurrent ? "bg-poke-blue/20 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}
                                                >
                                                    <span className="truncate">{otherBinder.name}</span>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="rounded bg-black/40 px-1 py-0.5 font-mono text-[9px] text-slate-400">{otherBinder.grid_type}</span>
                                                        {isCurrent ? <Check size={13} className="text-poke-blue" /> : null}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                        <button type="button" onClick={() => setIsStatsOpen(true)} className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-white/20 hover:bg-white/10 sm:px-3 sm:py-2">
                            <BarChart2 size={15} className="text-poke-blue" />
                            <span className="hidden sm:inline">Estatísticas</span>
                        </button>
                        {isOwner ? (
                            <NextLink href={`/binders/${binder.id}/edit`} title="Editar estrutura" className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white sm:h-9 sm:w-9">
                                <Settings size={15} />
                            </NextLink>
                        ) : null}
                    </div>
                </div>
            </header>

            <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center overflow-x-clip px-0 pt-2 pb-28 sm:pt-3 md:px-4 md:pb-14">
                <div className="flex min-h-0 w-full flex-1 flex-col items-center">
                    <div className="mb-2 flex w-full max-w-md shrink-0 items-center justify-between gap-2 px-2 md:hidden">
                        <button type="button" disabled={!canGoPrev} onClick={() => bookRef.current?.flipPrev()} aria-label="Página anterior" className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all ${canGoPrev ? "border-white/10 bg-[#121620]/85 text-white shadow-lg active:scale-95" : "border-white/5 bg-white/[0.02] text-slate-600 opacity-25"}`}>
                            <ChevronLeft size={20} />
                        </button>
                        <div className="min-w-0 flex-1">
                            <BinderControls onSearch={handleSearchPokemon} />
                        </div>
                        <button type="button" disabled={!canGoNext} onClick={() => bookRef.current?.flipNext()} aria-label="Próxima página" className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all ${canGoNext ? "border-white/10 bg-[#121620]/85 text-white shadow-lg active:scale-95" : "border-white/5 bg-white/[0.02] text-slate-600 opacity-25"}`}>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                    <div className="mb-5 hidden w-full max-w-sm shrink-0 justify-center md:flex">
                        <BinderControls onSearch={handleSearchPokemon} />
                    </div>
                    <div className="relative flex min-h-0 w-full flex-1 items-center justify-center gap-2 max-md:flex-none lg:gap-4 xl:gap-5">
                        <button type="button" disabled={!canGoPrev} onClick={() => bookRef.current?.flipPrev()} aria-label="Página anterior" className={`hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-200 md:flex xl:h-14 xl:w-14 ${canGoPrev ? "border-white/10 bg-[#121620]/85 text-white shadow-xl hover:border-white/25 hover:bg-white/15 hover:scale-105 active:scale-95" : "border-white/5 bg-white/[0.02] text-slate-600 opacity-25"}`}>
                            <ChevronLeft size={24} />
                        </button>
                        <div className="relative flex h-full min-h-0 w-full max-w-6xl flex-1 items-center justify-center max-md:h-auto max-md:flex-none">
                            <UniversalBinderBook ref={bookRef} binder={binder} slots={slots} currentPage={currentPage} entryTargetPage={initialTargetPage} isMobile={isMobile} highlightedSlotId={highlightedSlotId} droppingSlotId={droppingSlotId} onPageChange={updatePage} onSlotClick={handleSlotClick} />
                        </div>
                        <button type="button" disabled={!canGoNext} onClick={() => bookRef.current?.flipNext()} aria-label="Próxima página" className={`hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-200 md:flex xl:h-14 xl:w-14 ${canGoNext ? "border-white/10 bg-[#121620]/85 text-white shadow-xl hover:border-white/25 hover:bg-white/15 hover:scale-105 active:scale-95" : "border-white/5 bg-white/[0.02] text-slate-600 opacity-25"}`}>
                            <ChevronRight size={24} />
                        </button>
                    </div>
                    <nav aria-label="Navegação rápida de páginas" className="relative z-20 mt-2 w-full max-w-6xl shrink-0 px-2 md:mt-5">
                        <div onMouseLeave={() => setHoveredPage(null)} className="flex max-h-28 flex-wrap justify-center gap-1 overflow-y-auto rounded-2xl border border-white/10 bg-[#10131b]/90 p-1.5 shadow-2xl backdrop-blur-xl sm:p-2.5">
                            {Array.from({ length: slotPageCount }, (_, index) => {
                                const page = index + 1;
                                const stats = pageStats.get(page) ?? { filled: 0, total: 0 };
                                const active = page === currentPage || (!isMobile && page === currentPage + 1);
                                const highlighted = hoveredDesktopSpreadPages ? hoveredDesktopSpreadPages.has(page) : active;
                                return (
                                    <button
                                        key={page}
                                        type="button"
                                        onClick={() => goToPage(page)}
                                        onMouseEnter={() => setHoveredPage(page)}
                                        onFocus={() => setHoveredPage(page)}
                                        onBlur={() => setHoveredPage(null)}
                                        aria-current={active ? "page" : undefined}
                                        className={`relative flex h-9 min-w-10 flex-col items-center justify-center overflow-hidden rounded-lg border px-1 text-xs transition-[background-color,border-color,color,box-shadow] duration-200 ease-out motion-reduce:transition-none ${highlighted ? "border-[var(--theme-primary)]/40 bg-[var(--theme-primary)]/20 text-white shadow-[0_0_12px_var(--theme-primary-glow)]" : "border-transparent bg-white/[0.02] text-slate-400 hover:bg-white/[0.07] hover:text-slate-200"}`}
                                    >
                                        <span className="font-bold">{page}</span>
                                        <span className="font-mono text-[9px]">
                                            {stats.filled}/{stats.total}
                                        </span>
                                        <span className="absolute bottom-0 left-0 h-0.5 bg-[var(--theme-primary)]" style={{ width: `${stats.total ? (stats.filled / stats.total) * 100 : 0}%` }} />
                                    </button>
                                );
                            })}
                        </div>
                    </nav>
                </div>
            </main>

            <BinderStatisticsDrawer isOpen={isStatsOpen} onClose={() => setIsStatsOpen(false)} binder={binder} slots={slots} onSlotNavigate={handleSlotNavigate} />
            <UniversalSlotModal
                isOpen={isSlotModalOpen}
                onClose={() => {
                    setIsSlotModalOpen(false);
                    setSelectedSlot(null);
                }}
                slot={selectedSlot}
                binderId={binder.id}
                binderName={binder.name}
                binderGrid={binder.grid_type}
                onAssignSuccess={handleAssignSuccess}
                onUnassignSuccess={handleUnassignSuccess}
                onOpenCatalogSearch={(name, dexId) => {
                    catalogSlotIdRef.current = selectedSlot?.id ?? null;
                    setCatalogSearchName(name);
                    setCatalogDexId(dexId);
                    setIsSlotModalOpen(false);
                    if (catalogOpenTimerRef.current !== null) window.clearTimeout(catalogOpenTimerRef.current);
                    catalogOpenTimerRef.current = window.setTimeout(() => {
                        catalogOpenTimerRef.current = null;
                        setIsCatalogModalOpen(true);
                    }, 300);
                }}
            />
            <CardSearchModal
                isOpen={isCatalogModalOpen}
                onClose={() => {
                    if (catalogOpenTimerRef.current !== null) {
                        window.clearTimeout(catalogOpenTimerRef.current);
                        catalogOpenTimerRef.current = null;
                    }
                    setIsCatalogModalOpen(false);
                    catalogSlotIdRef.current = null;
                    setSelectedSlot(null);
                }}
                onBack={handleReturnToSlotModal}
                pokemonName={catalogSearchName}
                dexId={catalogDexId}
                onCardAdded={() => undefined}
            />
        </div>
    );
}
