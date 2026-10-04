"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useSWRConfig } from "swr";
import { ArrowLeft, BarChart2, Check, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Settings } from "lucide-react";
import { PokemonBallSvg } from "@/components/theme/PokemonBallSvg";
import { getBinderSlotPageCount } from "@/lib/binder/pageCapacity";
import { getCoverTheme } from "@/lib/binder/themes";
import { canRevealUniversalSlotHighlight } from "@/lib/binder/universalHighlight";
import { shiftAvailableCount, type AvailableCounts } from "@/lib/binder/availableCounts";
import { useBinderAvailableCounts } from "@/lib/swr";
import { isBinderSlotPainted } from "@/lib/pokemon/binderHighlight";
import { getPokemonThemeSelectorSpriteUrl } from "@/lib/pokemon/constants";
import { isCollectionCardsCacheKey } from "@/lib/collection/cache";
import type { Binder, BinderSlot, UserCard } from "@/types/binder";
import { BinderControls } from "./BinderControls";
import { UniversalBinderBook, type UniversalBinderNavigationHandle } from "./UniversalBinderBook";

const CardSearchModal = dynamic(() => import("@/components/modal/CardSearchModal").then((mod) => mod.CardSearchModal), { ssr: false });
const UniversalSlotModal = dynamic(() => import("@/components/modal/UniversalSlotModal").then((mod) => mod.UniversalSlotModal), { ssr: false });
const BinderStatisticsDrawer = dynamic(() => import("./BinderStatisticsDrawer").then((mod) => mod.BinderStatisticsDrawer), { ssr: false });

export interface UniversalBinderViewerProps {
    binder: Binder;
    initialSlots: BinderSlot[];
    initialAvailableCounts?: AvailableCounts;
    otherBinders?: BinderSwitcherItem[];
    isOwner?: boolean;
}

type BinderSwitcherItem = Pick<Binder, "id" | "name" | "description" | "grid_type" | "cover_theme" | "cover_pokemon_dex_id">;

function BinderCoverIcon({ binder, compact = false }: { binder: BinderSwitcherItem; compact?: boolean }) {
    const theme = getCoverTheme(binder.cover_theme);
    const dimensions = compact ? "h-5 w-4 sm:h-6 sm:w-5" : "h-11 w-8.5";

    return (
        <span
            aria-hidden="true"
            className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_4px_10px_rgba(0,0,0,0.25)] ${dimensions}`}
            style={{
                backgroundColor: theme.primaryColor,
                backgroundImage: `linear-gradient(145deg, ${theme.primaryColor}, #11131a 76%)`,
            }}
        >
            {binder.cover_pokemon_dex_id ? <Image src={getPokemonThemeSelectorSpriteUrl(binder.cover_pokemon_dex_id)} alt="" width={80} height={80} unoptimized className="h-[88%] w-[88%] object-contain drop-shadow-[0_3px_3px_rgba(0,0,0,0.6)] [image-rendering:pixelated]" /> : <PokemonBallSvg ballType={theme.ballType} size={compact ? 26 : 31} className="h-auto w-[78%]" />}
        </span>
    );
}

function clampPage(page: number, totalPages: number) {
    return Math.min(totalPages, Math.max(1, Math.trunc(page) || 1));
}

export function UniversalBinderViewer({ binder, initialSlots, initialAvailableCounts, otherBinders = [], isOwner = true }: UniversalBinderViewerProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { mutate: globalMutate, cache } = useSWRConfig();
    const { availableCounts, mutateAvailableCounts } = useBinderAvailableCounts(initialAvailableCounts);
    const slotPageCount = getBinderSlotPageCount(binder.total_pages);
    const initialTargetPage = clampPage(Number(searchParams.get("page")), slotPageCount);
    const bookRef = useRef<UniversalBinderNavigationHandle>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const initiallyOpened = useMemo(() => {
        if (typeof window === "undefined") return false;
        return searchParams.get("opened") === "1" || searchParams.get("opened") === "true";
    }, [searchParams]);
    const [slots, setSlots] = useState(initialSlots);
    const [isMobile, setIsMobile] = useState(false);
    const [isStatsOpen, setIsStatsOpen] = useState(false);
    const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<BinderSlot | null>(null);
    const [isSlotModalOpen, setIsSlotModalOpen] = useState(false);
    const [isRestoredSlotModal, setIsRestoredSlotModal] = useState(false);
    const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
    const [catalogSearchName, setCatalogSearchName] = useState<string | undefined>();
    const [catalogDexId, setCatalogDexId] = useState<number | undefined>();
    const [highlightedSlotId, setHighlightedSlotId] = useState<string | null>(null);
    const [pendingHighlight, setPendingHighlight] = useState<{ slotId: string; pageNumber: number; requestId: number } | null>(null);
    const [droppingSlotId, setDroppingSlotId] = useState<string | null>(null);
    const [pendingDropSlotId, setPendingDropSlotId] = useState<string | null>(null);
    const [pendingDropOriginalCard, setPendingDropOriginalCard] = useState<UserCard | null>(null);
    const highlightRequestIdRef = useRef(0);
    const highlightTimerRef = useRef<number | null>(null);
    const openedSlotFromUrlRef = useRef<string | null>(null);
    const catalogSlotIdRef = useRef<string | null>(null);
    const binderSwitcherRef = useRef<HTMLDivElement>(null);

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
        setIsRestoredSlotModal(true);
        setSelectedSlot(slot);
        setIsSlotModalOpen(true);
    }, [isOwner, searchParams, slots]);

    useEffect(() => {
        if (!isSwitcherOpen) return;

        const closeOnOutsideInteraction = (event: PointerEvent) => {
            if (!binderSwitcherRef.current?.contains(event.target as Node)) {
                setIsSwitcherOpen(false);
            }
        };
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsSwitcherOpen(false);
        };

        document.addEventListener("pointerdown", closeOnOutsideInteraction);
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("pointerdown", closeOnOutsideInteraction);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [isSwitcherOpen]);

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
        };
    }, []);

    useEffect(() => {
        if (isSlotModalOpen || !pendingDropSlotId) return;
        if (isCatalogModalOpen) return;

        const timer = window.setTimeout(() => {
            setDroppingSlotId(pendingDropSlotId);
            setPendingDropSlotId(null);
            setPendingDropOriginalCard(null);
            window.setTimeout(() => setDroppingSlotId(null), 1400);
        }, 320);

        return () => window.clearTimeout(timer);
    }, [isSlotModalOpen, isCatalogModalOpen, pendingDropSlotId]);

    const handleSlotClick = useCallback(
        (slot: BinderSlot) => {
            if (!isOwner) return;
            setIsRestoredSlotModal(false);
            setSelectedSlot(slot);
            setIsSlotModalOpen(true);
        },
        [isOwner],
    );

    const handleAssignSuccess = useCallback(
        (slotId: string, assignedCard: UserCard) => {
            setPendingDropOriginalCard(selectedSlot?.id === slotId ? (selectedSlot.card ?? null) : null);
            setSlots((previous) => previous.map((slot) => (slot.id === slotId ? { ...slot, user_card_id: assignedCard.id, card: assignedCard } : slot)));
            setSelectedSlot((previous) => (previous?.id === slotId ? { ...previous, user_card_id: assignedCard.id, card: assignedCard } : previous));
            setPendingDropSlotId(slotId);
            void mutateAvailableCounts((current) => ({ availableCounts: shiftAvailableCount(current?.availableCounts ?? {}, assignedCard.pokemon_dex_id, -1) }), false);
        },
        [mutateAvailableCounts, selectedSlot],
    );

    const handleUnassignSuccess = useCallback(
        (slotId: string) => {
            const releasedCard = slots.find((slot) => slot.id === slotId)?.card ?? null;
            setSlots((previous) => previous.map((slot) => (slot.id === slotId ? { ...slot, user_card_id: null, card: null } : slot)));
            setSelectedSlot((previous) => (previous?.id === slotId ? { ...previous, user_card_id: null, card: null } : previous));
            setPendingDropSlotId((previous) => (previous === slotId ? null : previous));
            setPendingDropOriginalCard(null);
            void mutateAvailableCounts((current) => ({ availableCounts: shiftAvailableCount(current?.availableCounts ?? {}, releasedCard?.pokemon_dex_id ?? null, 1) }), false);
        },
        [mutateAvailableCounts, slots],
    );

    const displaySlots = useMemo(() => {
        if (!pendingDropSlotId) return slots;
        return slots.map((slot) => (slot.id === pendingDropSlotId ? { ...slot, user_card_id: pendingDropOriginalCard?.id ?? null, card: pendingDropOriginalCard } : slot));
    }, [pendingDropOriginalCard, pendingDropSlotId, slots]);

    const closeSlotModal = useCallback(() => {
        setIsRestoredSlotModal(false);
        setIsSlotModalOpen(false);
        const url = new URL(window.location.href);
        if (url.searchParams.has("openSlot")) {
            url.searchParams.delete("openSlot");
            window.history.replaceState(window.history.state, "", url.toString());
        }
    }, []);

    const handleReturnToSlotModal = useCallback(() => {
        const slotId = catalogSlotIdRef.current;
        setIsCatalogModalOpen(false);
        const slot = slots.find((item) => item.id === slotId);
        if (!slot) {
            setSelectedSlot(null);
            return;
        }
        setSelectedSlot(slot);
        setIsSlotModalOpen(true);
    }, [slots]);

    const handleCatalogCardAdded = useCallback(
        (newCard: UserCard) => {
            for (const key of cache.keys()) {
                if (!isCollectionCardsCacheKey(key)) continue;
                const previous = cache.get(key)?.data as { cards: UserCard[] } | undefined;
                if (!previous?.cards) continue;
                void globalMutate(key, { cards: [newCard, ...previous.cards] }, false);
            }
            if (!newCard.is_in_binder) {
                void mutateAvailableCounts((current) => ({ availableCounts: shiftAvailableCount(current?.availableCounts ?? {}, newCard.pokemon_dex_id, 1) }), false);
            }
            handleReturnToSlotModal();
        },
        [cache, globalMutate, handleReturnToSlotModal, mutateAvailableCounts],
    );

    const handleCatalogCardRemoved = useCallback(
        (removedCardId: string) => {
            for (const key of cache.keys()) {
                if (!isCollectionCardsCacheKey(key)) continue;
                const previous = cache.get(key)?.data as { cards: UserCard[] } | undefined;
                if (!previous?.cards) continue;
                void globalMutate(key, { cards: previous.cards.filter((card) => card.id !== removedCardId) }, false);
            }
            void mutateAvailableCounts();
        },
        [cache, globalMutate, mutateAvailableCounts],
    );

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
    const canGoFirst = currentPage > 1;
    const canGoLast = currentPage < slotPageCount;
    const canSwitchBinders = otherBinders.length > 1;

    return (
        <div className="flex min-h-screen flex-col overflow-x-clip bg-[#0a0c10] text-slate-100">
            <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0c10]/90 backdrop-blur-md">
                <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-3 py-2.5 sm:px-6">
                    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                        <NextLink href="/" prefetch={true} className="flex shrink-0 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white sm:px-3 sm:py-2">
                            <ArrowLeft size={15} />
                            <span className="hidden sm:inline">Voltar</span>
                        </NextLink>
                        <div ref={binderSwitcherRef} className="relative min-w-0">
                            <button
                                type="button"
                                disabled={!canSwitchBinders}
                                onClick={() => setIsSwitcherOpen((open) => !open)}
                                aria-expanded={canSwitchBinders ? isSwitcherOpen : undefined}
                                aria-haspopup={canSwitchBinders ? "dialog" : undefined}
                                aria-label={canSwitchBinders ? `Trocar de binder. Binder atual: ${binder.name}` : binder.name}
                                className={`group flex h-8 min-w-0 max-w-[min(48vw,22rem)] items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 text-left text-slate-200 transition-colors duration-200 motion-reduce:transition-none sm:h-9 sm:px-3 ${canSwitchBinders ? "cursor-pointer hover:border-white/20 hover:bg-white/10 hover:text-white" : "cursor-default"}`}
                            >
                                <BinderCoverIcon binder={binder} compact />
                                <span className="min-w-0 truncate text-xs font-semibold text-slate-200 sm:text-sm">{binder.name}</span>
                                {canSwitchBinders ? <ChevronDown size={14} strokeWidth={1.75} className={`shrink-0 text-slate-400 transition-transform duration-200 motion-reduce:transition-none ${isSwitcherOpen ? "rotate-180 text-white" : "group-hover:text-white"}`} /> : null}
                            </button>
                            {isSwitcherOpen && canSwitchBinders ? (
                                <div role="dialog" aria-label="Selecionar binder" className="absolute top-full left-0 z-50 mt-2 w-[min(22rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-white/10 bg-[#111621]/95 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                                    <div className="flex items-center justify-between px-2.5 py-2">
                                        <span className="text-[11px] font-semibold text-slate-300">Seus binders</span>
                                        <span className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-400">{otherBinders.length}</span>
                                    </div>
                                    <div className="max-h-[min(28rem,calc(100dvh-7rem))] space-y-1 overflow-y-auto pr-0.5">
                                        {otherBinders.map((otherBinder) => {
                                            const isCurrent = otherBinder.id === binder.id;
                                            return (
                                                <button
                                                    key={otherBinder.id}
                                                    type="button"
                                                    aria-pressed={isCurrent}
                                                    onClick={() => {
                                                        setIsSwitcherOpen(false);
                                                        if (!isCurrent) router.push(`/binders/${otherBinder.id}`);
                                                    }}
                                                    className={`group flex w-full items-center gap-2 rounded-xl border px-2 py-2 text-left transition-[background-color,border-color,color] duration-200 motion-reduce:transition-none ${isCurrent ? "border-[var(--theme-primary)]/20 bg-[var(--theme-primary)]/8 text-slate-200" : "border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.04] hover:text-slate-200"}`}
                                                >
                                                    <BinderCoverIcon binder={otherBinder} />
                                                    <span className="min-w-0 flex-1">
                                                        <span className="block truncate text-xs font-semibold leading-tight">{otherBinder.name}</span>
                                                        <span title={otherBinder.description || undefined} className="mt-1 block truncate text-[11px] leading-none text-slate-500">
                                                            {otherBinder.description?.trim() || "Sem descrição"}
                                                        </span>
                                                    </span>
                                                    {isCurrent ? <Check size={14} strokeWidth={2.25} className="shrink-0 text-slate-400" aria-label="Binder selecionado" /> : <ChevronRight size={14} strokeWidth={1.75} className="shrink-0 text-slate-600 transition-colors duration-200 group-hover:text-slate-400 motion-reduce:transition-none" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="hidden min-w-0 flex-1 px-2 md:flex">
                        <div className="w-full">
                            <BinderControls onSearch={handleSearchPokemon} />
                        </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                        <button type="button" onClick={() => setIsStatsOpen(true)} className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:border-white/20 hover:bg-white/10 sm:px-3 sm:py-2">
                            <BarChart2 size={15} />
                            <span className="hidden sm:inline">Estatísticas</span>
                        </button>
                        {isOwner ? (
                            <NextLink href={`/binders/${binder.id}/edit`} prefetch={true} onMouseEnter={() => router.prefetch(`/binders/${binder.id}/edit`)} onTouchStart={() => router.prefetch(`/binders/${binder.id}/edit`)} title="Editar estrutura" className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white sm:h-9 sm:w-9">
                                <Settings size={15} />
                            </NextLink>
                        ) : null}
                    </div>
                </div>
            </header>

            <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-center overflow-x-clip px-0 pt-2 pb-16 sm:pt-3 md:px-4 md:pb-8">
                <div className="flex min-h-0 w-full flex-1 flex-col items-center">
                    <div className="mb-2 flex w-full max-w-md shrink-0 items-center justify-between gap-1.5 px-2 md:hidden">
                        <div className="flex shrink-0 items-center gap-1">
                            <button type="button" disabled={!canGoFirst} onClick={() => goToPage(1)} aria-label="Ir para a primeira página" title="Ir para a primeira página" className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all ${canGoFirst ? "border-white/10 bg-white/5 text-slate-300 active:scale-95" : "cursor-not-allowed border-white/5 bg-white/[0.02] text-slate-600 opacity-25"}`}>
                                <ChevronsLeft size={16} />
                            </button>
                            <button type="button" disabled={!canGoPrev} onClick={() => bookRef.current?.flipPrev()} aria-label="Página anterior" title="Página anterior" className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all ${canGoPrev ? "border-white/10 bg-white/5 text-slate-300 active:scale-95" : "cursor-not-allowed border-white/5 bg-white/[0.02] text-slate-600 opacity-25"}`}>
                                <ChevronLeft size={16} />
                            </button>
                        </div>
                        <div className="min-w-0 flex-1">
                            <BinderControls onSearch={handleSearchPokemon} />
                        </div>
                        <div className="flex shrink-0 items-center gap-1">
                            <button type="button" disabled={!canGoNext} onClick={() => bookRef.current?.flipNext()} aria-label="Próxima página" title="Próxima página" className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all ${canGoNext ? "border-white/10 bg-white/5 text-slate-300 active:scale-95" : "cursor-not-allowed border-white/5 bg-white/[0.02] text-slate-600 opacity-25"}`}>
                                <ChevronRight size={16} />
                            </button>
                            <button type="button" disabled={!canGoLast} onClick={() => goToPage(slotPageCount)} aria-label="Ir para a última página" title={`Ir para a última página (${slotPageCount})`} className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all ${canGoLast ? "border-white/10 bg-white/5 text-slate-300 active:scale-95" : "cursor-not-allowed border-white/5 bg-white/[0.02] text-slate-600 opacity-25"}`}>
                                <ChevronsRight size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="relative flex min-h-0 w-full flex-1 items-center justify-center gap-2 max-md:flex-none lg:gap-3">
                        <div className="hidden shrink-0 flex-col items-center gap-2 md:flex">
                            <button
                                type="button"
                                disabled={!canGoFirst}
                                onClick={() => goToPage(1)}
                                aria-label="Ir para a primeira página"
                                title="Ir para a primeira página"
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 lg:h-10 lg:w-10 ${canGoFirst ? "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-95" : "cursor-not-allowed border-white/5 bg-white/[0.02] text-slate-600 opacity-25"}`}
                            >
                                <ChevronsLeft size={18} />
                            </button>
                            <button
                                type="button"
                                disabled={!canGoPrev}
                                onClick={() => bookRef.current?.flipPrev()}
                                aria-label="Página anterior"
                                title="Página anterior"
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 lg:h-10 lg:w-10 ${canGoPrev ? "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-95" : "cursor-not-allowed border-white/5 bg-white/[0.02] text-slate-600 opacity-25"}`}
                            >
                                <ChevronLeft size={18} />
                            </button>
                        </div>
                        <div className="relative flex h-full min-h-0 w-full max-w-6xl flex-1 items-center justify-center max-md:h-auto max-md:flex-none">
                            <UniversalBinderBook ref={bookRef} binder={binder} slots={displaySlots} availableCounts={availableCounts} currentPage={currentPage} entryTargetPage={initialTargetPage} initiallyOpened={initiallyOpened} isMobile={isMobile} highlightedSlotId={highlightedSlotId} droppingSlotId={droppingSlotId} onPageChange={updatePage} onSlotClick={handleSlotClick} />
                        </div>
                        <div className="hidden shrink-0 flex-col items-center gap-2 md:flex">
                            <button
                                type="button"
                                disabled={!canGoNext}
                                onClick={() => bookRef.current?.flipNext()}
                                aria-label="Próxima página"
                                title="Próxima página"
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 lg:h-10 lg:w-10 ${canGoNext ? "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-95" : "cursor-not-allowed border-white/5 bg-white/[0.02] text-slate-600 opacity-25"}`}
                            >
                                <ChevronRight size={18} />
                            </button>
                            <button
                                type="button"
                                disabled={!canGoLast}
                                onClick={() => goToPage(slotPageCount)}
                                aria-label="Ir para a última página"
                                title={`Ir para a última página (${slotPageCount})`}
                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 lg:h-10 lg:w-10 ${canGoLast ? "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white active:scale-95" : "cursor-not-allowed border-white/5 bg-white/[0.02] text-slate-600 opacity-25"}`}
                            >
                                <ChevronsRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <BinderStatisticsDrawer isOpen={isStatsOpen} onClose={() => setIsStatsOpen(false)} binder={binder} slots={slots} onSlotNavigate={handleSlotNavigate} />
            <UniversalSlotModal
                isOpen={isSlotModalOpen}
                hasOpenSibling={isCatalogModalOpen}
                skipEnterAnimation={isRestoredSlotModal}
                onClose={closeSlotModal}
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
                    setIsCatalogModalOpen(true);
                    setIsSlotModalOpen(false);
                }}
            />
            <CardSearchModal
                isOpen={isCatalogModalOpen}
                hasOpenSibling={isSlotModalOpen}
                onClose={() => {
                    setIsCatalogModalOpen(false);
                    catalogSlotIdRef.current = null;
                    setIsRestoredSlotModal(false);
                    setSelectedSlot(null);
                }}
                onBack={handleReturnToSlotModal}
                pokemonName={catalogSearchName}
                dexId={catalogDexId}
                onCardAdded={handleCatalogCardAdded}
                onCardRemoved={handleCatalogCardRemoved}
            />
        </div>
    );
}
