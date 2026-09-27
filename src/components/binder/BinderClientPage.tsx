"use client";

import { useState, useEffect, useMemo, useCallback, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { UserCard } from "@/types/binder";
import { TOTAL_PAGES, BINDER_CLOSED_BACK_PAGE, getPageForDexId, getPokemonByDexId, isElementFullyVisibleInViewport } from "@/lib/pokemon/constants";
import { BINDER_HIGHLIGHT_DURATION_MS, canStartBinderHighlight, getBinderHighlightWaitDecision, isBinderSlotPainted, isHighlightTargetOnActivePages, shouldClearHighlightOnPageChange, shouldResetBinderReadyForViewportChange } from "@/lib/pokemon/binderHighlight";
import { collectBinderPageImageUrls, getActiveCatalogPages, getAdjacentCatalogPages, getBinderImagePages, retainBinderImagePages } from "@/lib/pokemon/binderImageWindow";
import { CardSearchModal } from "@/components/modal/CardSearchModal";
import { BinderSlotSelectModal } from "@/components/modal/BinderSlotSelectModal";
import { PokeballLoader } from "@/components/loading/PokeballLoader";
import { BinderBookFlip, type BinderBookFlipHandle } from "@/components/binder/BinderBookFlip";
import { BinderControls } from "@/components/binder/BinderControls";
import { BinderPageNav } from "@/components/binder/BinderPageNav";
import { useBinderCards } from "@/lib/swr";
import { useImagePreloader, preloadImages } from "@/lib/hooks/useImagePreloader";
import { useBinderEntrance } from "@/lib/hooks/useBinderEntrance";
import { canHandleBinderEntry, resolveBinderEntryTargetPage, resolveBinderInitialPage, shouldRenderBinder } from "@/lib/pokemon/binderOpen";

interface BinderClientPageProps {
    initialUser?: {
        email?: string;
        avatarUrl?: string;
    } | null;
    initialCards?: UserCard[];
    initialAvailableCounts?: Record<number, number>;
}

function BinderOpeningLoader() {
    const { showLoader } = useBinderEntrance(false);
    return (
        <div className="binder-book-stage relative flex h-full w-full items-center justify-center">
            <div className={`binder-opening-loader ${showLoader ? "binder-opening-loader--visible" : ""}`} role="status" aria-hidden={!showLoader}>
                <PokeballLoader size="lg" message="Carregando seu fichário..." />
            </div>
        </div>
    );
}

function BinderContent({ initialCards, initialAvailableCounts }: BinderClientPageProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialPageParam = searchParams.get("page");
    const initialSpreadParam = searchParams.get("spread");
    const initialDexIdParam = searchParams.get("dexId");
    const openSelectParam = searchParams.get("openSelect");
    const hasExplicitPageTarget = initialPageParam !== null || initialSpreadParam !== null;

    const initialTargetDexId = initialDexIdParam ? parseInt(initialDexIdParam, 10) : null;
    const shouldOpenSelectOnMount = Boolean(!hasExplicitPageTarget && openSelectParam === "true" && initialTargetDexId && !isNaN(initialTargetDexId) && initialTargetDexId >= 1 && initialTargetDexId <= 151);
    const skipEntranceAnimation = shouldOpenSelectOnMount || openSelectParam === "true";

    const binderFallback = initialCards ? { cards: initialCards, availableCounts: initialAvailableCounts } : undefined;
    const { cards, availableCounts, isLoading: cardsLoading, isError, mutate } = useBinderCards(binderFallback);
    const { mutate: globalMutate } = useSWRConfig();

    const initialPage = resolveBinderInitialPage({
        pageParam: initialPageParam,
        spreadParam: initialSpreadParam,
        dexIdParam: initialDexIdParam,
        openSelectParam,
    });
    const initialEntryTargetPage = resolveBinderEntryTargetPage({
        pageParam: initialPageParam,
        spreadParam: initialSpreadParam,
        dexIdParam: initialDexIdParam,
        openSelectParam,
    });

    const [currentPage, setCurrentPage] = useState(initialPage);
    const [jumpTargetPage, setJumpTargetPage] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [viewportReady, setViewportReady] = useState(false);
    const [hasMountedBinder, setHasMountedBinder] = useState(false);
    const [retainedImagePages, setRetainedImagePages] = useState<number[]>([]);
    const [highlightedDexId, setHighlightedDexId] = useState<number | null>(null);
    const [droppingDexId, setDroppingDexId] = useState<number | null>(null);

    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [searchDexId, setSearchDexId] = useState(1);
    const [searchPokemonName, setSearchPokemonName] = useState("");

    const [selectModalOpen, setSelectModalOpen] = useState(shouldOpenSelectOnMount);
    const [selectDexId, setSelectDexId] = useState(shouldOpenSelectOnMount && initialTargetDexId ? initialTargetDexId : 1);
    const [selectPokemonName, setSelectPokemonName] = useState(shouldOpenSelectOnMount && initialTargetDexId ? getPokemonByDexId(initialTargetDexId)?.name || "" : "");
    const [selectActiveCardId, setSelectActiveCardId] = useState<string | undefined>(undefined);
    const [selectActiveCard, setSelectActiveCard] = useState<UserCard | undefined>(undefined);
    const [pendingDropDexId, setPendingDropDexId] = useState<number | null>(null);

    const bookFlipRef = useRef<BinderBookFlipHandle>(null);
    const pendingDropDexIdRef = useRef<number | null>(null);
    const initialModalSlotCardRef = useRef<UserCard | undefined>(undefined);
    const hasCapturedInitialSlotCardRef = useRef(false);
    const handledDexIdRef = useRef<number | null>(null);
    const handledPageEntryRef = useRef<number | null>(null);
    const handledOpenSelectRef = useRef<number | null>(null);
    const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pendingHighlightDexIdRef = useRef<number | null>(null);
    const highlightRequestIdRef = useRef(0);
    const [isBookReady, setIsBookReady] = useState(false);
    const [isBookEngineReady, setIsBookEngineReady] = useState(false);
    const { showLoader, canReveal } = useBinderEntrance(isBookEngineReady, skipEntranceAnimation);
    const handleBookEngineReady = useCallback(() => setIsBookEngineReady(true), []);
    const viewportModeRef = useRef<boolean | null>(null);
    const highlightGateRef = useRef({ currentPage, isMobile, isBookReady });
    highlightGateRef.current = { currentPage, isMobile, isBookReady };

    useEffect(() => {
        const checkMobile = () => {
            const nextIsMobile = window.innerWidth < 768;
            if (shouldResetBinderReadyForViewportChange(viewportModeRef.current, nextIsMobile)) {
                setIsBookReady(false);
            }
            viewportModeRef.current = nextIsMobile;
            setIsMobile(nextIsMobile);
        };
        checkMobile();
        setViewportReady(true);
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        return () => {
            highlightRequestIdRef.current += 1;
            pendingHighlightDexIdRef.current = null;
            if (highlightTimerRef.current) {
                clearTimeout(highlightTimerRef.current);
                highlightTimerRef.current = null;
            }
        };
    }, []);

    const clearHighlight = useCallback(() => {
        highlightRequestIdRef.current += 1;
        if (highlightTimerRef.current) {
            clearTimeout(highlightTimerRef.current);
            highlightTimerRef.current = null;
        }
        pendingHighlightDexIdRef.current = null;
        setHighlightedDexId(null);
    }, []);

    const triggerHighlight = useCallback((targetDexId: number, delayMs = 0) => {
        if (highlightTimerRef.current) {
            clearTimeout(highlightTimerRef.current);
            highlightTimerRef.current = null;
        }
        setHighlightedDexId(null);
        pendingHighlightDexIdRef.current = targetDexId;

        const startGlow = () => {
            setHighlightedDexId(targetDexId);
            highlightTimerRef.current = setTimeout(() => {
                setHighlightedDexId(null);
                pendingHighlightDexIdRef.current = null;
                highlightTimerRef.current = null;
            }, BINDER_HIGHLIGHT_DURATION_MS);
        };

        if (delayMs > 0) {
            highlightTimerRef.current = setTimeout(startGlow, delayMs);
        } else {
            startGlow();
        }
    }, []);

    const waitForHighlightReady = useCallback((targetDexId: number, requestId: number): Promise<boolean> => {
        return new Promise((resolve) => {
            let didScroll = false;
            const check = () => {
                const gate = highlightGateRef.current;
                const el = document.getElementById(`binder-slot-${targetDexId}`);
                const isFlipping = bookFlipRef.current?.isBusy() ?? false;
                const activePages = getActiveCatalogPages(gate.currentPage, gate.isMobile);
                const pageReady = gate.isBookReady && !isFlipping && isHighlightTargetOnActivePages(targetDexId, activePages);

                if (pageReady && el && !didScroll && !isElementFullyVisibleInViewport(el)) {
                    didScroll = true;
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                }

                const isSlotVisible = Boolean(el && isBinderSlotPainted(el));
                const isReady = canStartBinderHighlight({
                    targetDexId,
                    activePages,
                    isBookReady: gate.isBookReady,
                    isFlipping,
                    isSlotVisible,
                });
                const decision = getBinderHighlightWaitDecision({
                    isPending: pendingHighlightDexIdRef.current === targetDexId && highlightRequestIdRef.current === requestId,
                    isReady,
                });

                if (decision === "start") {
                    requestAnimationFrame(() => resolve(pendingHighlightDexIdRef.current === targetDexId && highlightRequestIdRef.current === requestId));
                    return;
                }
                if (decision === "cancel") {
                    resolve(false);
                    return;
                }
                requestAnimationFrame(check);
            };
            requestAnimationFrame(check);
        });
    }, []);

    const handleBookReady = useCallback(() => {
        setIsBookReady(true);
    }, []);

    const cardsMap = useMemo(() => {
        const map = new Map<number, UserCard>();
        cards.forEach((c) => {
            if (c.is_in_binder) {
                map.set(c.pokemon_dex_id, c);
            }
        });
        return map;
    }, [cards]);

    const displayCardsMap = useMemo(() => {
        const isModalActive = selectModalOpen || searchModalOpen;
        if (!isModalActive || pendingDropDexId === null) {
            return cardsMap;
        }

        const next = new Map(cardsMap);
        const originalCard = initialModalSlotCardRef.current;
        if (originalCard) {
            next.set(pendingDropDexId, originalCard);
        } else {
            next.delete(pendingDropDexId);
        }
        return next;
    }, [cardsMap, selectModalOpen, searchModalOpen, pendingDropDexId]);

    useEffect(() => {
        if (shouldOpenSelectOnMount && initialTargetDexId && !hasCapturedInitialSlotCardRef.current && !cardsLoading) {
            hasCapturedInitialSlotCardRef.current = true;
            initialModalSlotCardRef.current = cardsMap.get(initialTargetDexId);
        }
    }, [shouldOpenSelectOnMount, initialTargetDexId, cardsLoading, cardsMap]);

    const activePages = useMemo(() => getActiveCatalogPages(currentPage, isMobile), [isMobile, currentPage]);
    const activePagesRef = useRef(activePages);
    activePagesRef.current = activePages;
    const requestedImagePages = useMemo(() => getBinderImagePages({ currentPage, isMobile, jumpTargetPage }), [currentPage, isMobile, jumpTargetPage]);
    const imagePages = useMemo(() => retainBinderImagePages(retainedImagePages, requestedImagePages), [retainedImagePages, requestedImagePages]);
    const currentSpreadImages = useMemo(() => collectBinderPageImageUrls(activePages, cardsMap), [activePages, cardsMap]);

    const { allLoaded: currentImagesReady } = useImagePreloader(currentSpreadImages, {
        enabled: viewportReady && !cardsLoading && !hasMountedBinder && !skipEntranceAnimation,
        timeoutMs: 5000,
    });
    const isDataReady = !cardsLoading && (currentImagesReady || skipEntranceAnimation);
    const renderBinder = shouldRenderBinder({ viewportReady, isDataReady, hasMountedBinder });
    const canHandleEntry = canHandleBinderEntry({ viewportReady, isDataReady, hasMountedBinder, isBookReady });

    useEffect(() => {
        if (renderBinder && !hasMountedBinder) {
            setHasMountedBinder(true);
        }
    }, [renderBinder, hasMountedBinder]);

    useEffect(() => {
        setRetainedImagePages((pages) => retainBinderImagePages(pages, requestedImagePages));
    }, [requestedImagePages]);

    useEffect(() => {
        if (cardsLoading) return;

        const adjacentPages = getAdjacentCatalogPages(currentPage, isMobile).filter((page) => !activePages.includes(page));
        preloadImages(collectBinderPageImageUrls(adjacentPages, cardsMap));
    }, [cardsLoading, isMobile, currentPage, activePages, cardsMap]);

    useEffect(() => {
        if (jumpTargetPage == null) return;
        if (getActiveCatalogPages(currentPage, isMobile).includes(jumpTargetPage)) {
            setJumpTargetPage(null);
        }
    }, [currentPage, isMobile, jumpTargetPage]);

    const canGoPrev = useMemo(() => {
        return currentPage > 0;
    }, [currentPage]);

    const canGoNext = useMemo(() => {
        return currentPage < BINDER_CLOSED_BACK_PAGE;
    }, [currentPage]);

    const handlePrev = useCallback(() => {
        if (!canGoPrev) return;
        clearHighlight();
        bookFlipRef.current?.flipPrev();
    }, [canGoPrev, clearHighlight]);

    const handleNext = useCallback(() => {
        if (!canGoNext) return;
        clearHighlight();
        bookFlipRef.current?.flipNext();
    }, [canGoNext, clearHighlight]);

    const handlePageChange = useCallback(
        (newPage: number) => {
            if (
                shouldClearHighlightOnPageChange({
                    pendingDexId: pendingHighlightDexIdRef.current,
                    nextPage: newPage,
                    isMobile,
                })
            ) {
                clearHighlight();
            }
            setCurrentPage(newPage);
        },
        [clearHighlight, isMobile],
    );

    const preloadJumpTarget = useCallback(
        (targetPage: number) => {
            setJumpTargetPage(targetPage);
            preloadImages(collectBinderPageImageUrls(getActiveCatalogPages(targetPage, isMobile), cardsMap));
        },
        [isMobile, cardsMap],
    );

    const handleSelectPage = useCallback(
        (targetPage: number) => {
            if (activePages.includes(targetPage)) return;
            clearHighlight();
            preloadJumpTarget(targetPage);
            bookFlipRef.current?.turnToPage(targetPage);
        },
        [activePages, clearHighlight, preloadJumpTarget],
    );

    const handleNavigateToPokemon = useCallback(
        (targetDexId: number): boolean => {
            if (targetDexId < 1 || targetDexId > 151) return false;
            const targetPage = getPageForDexId(targetDexId);
            const pageWillChange = !activePagesRef.current.includes(targetPage);

            if (pageWillChange) {
                preloadJumpTarget(targetPage);
                bookFlipRef.current?.turnToPage(targetPage);
            }

            return pageWillChange;
        },
        [preloadJumpTarget],
    );

    const handleSearchPokemon = useCallback(
        (targetDexId: number) => {
            const requestId = highlightRequestIdRef.current + 1;
            highlightRequestIdRef.current = requestId;
            pendingHighlightDexIdRef.current = targetDexId;
            handleNavigateToPokemon(targetDexId);
            void waitForHighlightReady(targetDexId, requestId).then((isReady) => {
                if (!isReady || pendingHighlightDexIdRef.current !== targetDexId || highlightRequestIdRef.current !== requestId) return;
                triggerHighlight(targetDexId);
            });
        },
        [handleNavigateToPokemon, triggerHighlight, waitForHighlightReady],
    );

    useEffect(() => {
        if (!hasExplicitPageTarget || initialEntryTargetPage == null) return;
        if (!canHandleEntry || handledPageEntryRef.current === initialEntryTargetPage) return;

        handledPageEntryRef.current = initialEntryTargetPage;
        if (!activePagesRef.current.includes(initialEntryTargetPage)) {
            preloadJumpTarget(initialEntryTargetPage);
            bookFlipRef.current?.turnToPage(initialEntryTargetPage);
        }
    }, [hasExplicitPageTarget, initialEntryTargetPage, canHandleEntry, preloadJumpTarget]);

    useEffect(() => {
        if (hasExplicitPageTarget || !initialDexIdParam || openSelectParam === "true") return;
        if (!canHandleEntry) return;
        const targetDexId = parseInt(initialDexIdParam, 10);
        if (isNaN(targetDexId) || targetDexId < 1 || targetDexId > 151) return;
        if (handledDexIdRef.current === targetDexId) return;

        handledDexIdRef.current = targetDexId;
        const requestId = highlightRequestIdRef.current + 1;
        highlightRequestIdRef.current = requestId;
        pendingHighlightDexIdRef.current = targetDexId;
        handleNavigateToPokemon(targetDexId);
        void waitForHighlightReady(targetDexId, requestId).then((isReady) => {
            if (!isReady || pendingHighlightDexIdRef.current !== targetDexId || highlightRequestIdRef.current !== requestId) return;
            triggerHighlight(targetDexId);
        });
        handledPageEntryRef.current = getPageForDexId(targetDexId);
        router.replace(`/?page=${getPageForDexId(targetDexId)}`, { scroll: false });
    }, [hasExplicitPageTarget, initialDexIdParam, openSelectParam, canHandleEntry, handleNavigateToPokemon, triggerHighlight, waitForHighlightReady, router]);

    useEffect(() => {
        if (hasExplicitPageTarget || !initialTargetDexId || !canHandleEntry || openSelectParam === "true") return;
        const element = document.getElementById(`binder-slot-${initialTargetDexId}`);
        if (element && !isElementFullyVisibleInViewport(element)) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [hasExplicitPageTarget, canHandleEntry, initialTargetDexId, openSelectParam]);

    useEffect(() => {
        if (hasExplicitPageTarget || openSelectParam !== "true" || !initialDexIdParam) return;
        const targetDexId = parseInt(initialDexIdParam, 10);
        if (isNaN(targetDexId) || targetDexId < 1 || targetDexId > 151) return;
        if (handledOpenSelectRef.current === targetDexId) return;

        handledOpenSelectRef.current = targetDexId;
        const pokemon = getPokemonByDexId(targetDexId);
        const active = cardsMap.get(targetDexId);
        initialModalSlotCardRef.current = active;
        pendingDropDexIdRef.current = null;
        setPendingDropDexId(null);
        setSelectDexId(targetDexId);
        setSelectPokemonName(pokemon ? pokemon.name : `Pokemon #${targetDexId}`);
        setSelectActiveCardId(active?.id);
        setSelectActiveCard(active);
        setSelectModalOpen(true);
        handledPageEntryRef.current = getPageForDexId(targetDexId);
        globalMutate(`/api/cards?pokemon_dex_id=${targetDexId}`);
        mutate();
        router.replace(`/?page=${getPageForDexId(targetDexId)}`, { scroll: false });
    }, [hasExplicitPageTarget, initialDexIdParam, openSelectParam, cardsMap, router, globalMutate, mutate]);

    useEffect(() => {
        if (!selectModalOpen) return;
        const currentActive = cardsMap.get(selectDexId);
        if (currentActive?.id !== selectActiveCardId) {
            setSelectActiveCardId(currentActive?.id);
            setSelectActiveCard(currentActive);
        }
    }, [selectModalOpen, cardsMap, selectDexId, selectActiveCardId]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (searchModalOpen || selectModalOpen) return;
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [searchModalOpen, selectModalOpen, handlePrev, handleNext]);

    const handleSlotClick = (dexId: number, pokemonName: string, card?: UserCard) => {
        clearHighlight();
        initialModalSlotCardRef.current = card;
        pendingDropDexIdRef.current = null;
        setPendingDropDexId(null);
        setSelectDexId(dexId);
        setSelectPokemonName(pokemonName);
        setSelectActiveCardId(card?.id);
        setSelectActiveCard(card);
        setSelectModalOpen(true);
    };

    const handleSwapClick = (dexId: number, pokemonName: string, card?: UserCard) => {
        clearHighlight();
        initialModalSlotCardRef.current = card;
        pendingDropDexIdRef.current = null;
        setPendingDropDexId(null);
        setSelectDexId(dexId);
        setSelectPokemonName(pokemonName);
        setSelectActiveCardId(card?.id);
        setSelectActiveCard(card);
        setSelectModalOpen(true);
    };

    const handleSelectCardFromCollection = async (card: UserCard) => {
        if (selectActiveCardId === card.id) return;
        const prevCardId = selectActiveCardId;
        const prevCard = selectActiveCard;
        setSelectActiveCardId(card.id);
        setSelectActiveCard(card);
        pendingDropDexIdRef.current = card.pokemon_dex_id;
        setPendingDropDexId(card.pokemon_dex_id);
        const optimisticCard: UserCard = { ...card, is_in_binder: true };
        mutate((prev) => {
            const prevCounts = prev?.availableCounts ?? {};
            const currentCount = prevCounts[card.pokemon_dex_id] || 0;
            return {
                cards: [...(prev?.cards ?? []).filter((c) => c.pokemon_dex_id !== card.pokemon_dex_id), optimisticCard],
                availableCounts: {
                    ...prevCounts,
                    [card.pokemon_dex_id]: Math.max(0, currentCount - 1),
                },
            };
        }, false);

        try {
            const res = await fetch(`/api/cards/${card.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ is_in_binder: true }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "Erro ao vincular carta ao binder");
            }
            mutate();
            globalMutate(`/api/cards?pokemon_dex_id=${card.pokemon_dex_id}`);
            globalMutate("/api/cards");
            toast.success("Carta vinculada ao Binder!", {
                description: `${card.card_name} agora está em exibição no slot #${String(card.pokemon_dex_id).padStart(3, "0")}.`,
            });
        } catch (err: unknown) {
            setSelectActiveCardId(prevCardId);
            setSelectActiveCard(prevCard);
            pendingDropDexIdRef.current = null;
            setPendingDropDexId(null);
            mutate();
            globalMutate(`/api/cards?pokemon_dex_id=${card.pokemon_dex_id}`);
            const msg = err instanceof Error ? err.message : "Erro ao vincular carta ao binder";
            toast.error("Erro ao vincular carta", {
                description: msg,
            });
        }
    };

    const handleRemoveCardFromCollection = async (card: UserCard) => {
        const prevCardId = selectActiveCardId;
        const prevCard = selectActiveCard;
        pendingDropDexIdRef.current = null;
        setPendingDropDexId(null);
        initialModalSlotCardRef.current = undefined;
        setSelectActiveCardId(undefined);
        setSelectActiveCard(undefined);

        const collectionKey = `/api/cards?pokemon_dex_id=${card.pokemon_dex_id}`;
        globalMutate(
            collectionKey,
            (current: { cards: UserCard[] } | undefined) => ({
                cards: (current?.cards ?? []).map((c) => (c.id === card.id ? { ...c, is_in_binder: false } : c)),
            }),
            false,
        );

        mutate((prev) => {
            const prevCounts = prev?.availableCounts ?? {};
            const currentCount = prevCounts[card.pokemon_dex_id] || 0;
            return {
                cards: (prev?.cards ?? []).filter((c) => c.pokemon_dex_id !== card.pokemon_dex_id),
                availableCounts: {
                    ...prevCounts,
                    [card.pokemon_dex_id]: currentCount + 1,
                },
            };
        }, false);

        try {
            const res = await fetch(`/api/cards/${card.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ is_in_binder: false }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "Erro ao remover carta do binder");
            }
            mutate();
            globalMutate(collectionKey);
            globalMutate("/api/cards");
            toast.success("Carta removida do Binder", {
                description: `${card.card_name} foi removida da exibição.`,
            });
        } catch (err: unknown) {
            setSelectActiveCardId(prevCardId);
            setSelectActiveCard(prevCard);
            mutate();
            globalMutate(collectionKey);
            const msg = err instanceof Error ? err.message : "Erro ao remover carta do binder";
            toast.error("Erro ao remover carta", {
                description: msg,
            });
        }
    };

    const handleOpenCatalogSearchFromSelect = () => {
        setSearchDexId(selectDexId);
        setSearchPokemonName(selectPokemonName);
        setSelectModalOpen(false);
        setSearchModalOpen(true);
    };

    const handleCloseSearchModal = () => {
        setSearchModalOpen(false);
        setSelectModalOpen(true);
    };

    const handleCloseSelectModal = () => {
        setSelectModalOpen(false);
        const targetDex = pendingDropDexIdRef.current;
        if (targetDex !== null) {
            pendingDropDexIdRef.current = null;
            setPendingDropDexId(null);
            setDroppingDexId(targetDex);
            setTimeout(() => setDroppingDexId(null), 1400);
        }
    };

    const handleCardAdded = (newCard: UserCard) => {
        const collectionKey = `/api/cards?pokemon_dex_id=${newCard.pokemon_dex_id}`;
        globalMutate(
            collectionKey,
            (current: { cards: UserCard[] } | undefined) => ({
                cards: [...(current?.cards ?? []), newCard],
            }),
            true,
        );
        globalMutate("/api/cards");

        if (newCard.is_in_binder) {
            mutate(
                (prev) => ({
                    cards: [...(prev?.cards ?? []).filter((c) => c.pokemon_dex_id !== newCard.pokemon_dex_id), newCard],
                    availableCounts: prev?.availableCounts ?? {},
                }),
                false,
            );
            pendingDropDexIdRef.current = newCard.pokemon_dex_id;
            setPendingDropDexId(newCard.pokemon_dex_id);
            setSelectActiveCardId(newCard.id);
            setSelectActiveCard(newCard);
        } else {
            mutate((prev) => {
                const prevCounts = prev?.availableCounts ?? {};
                const currentCount = prevCounts[newCard.pokemon_dex_id] || 0;
                return {
                    cards: prev?.cards ?? [],
                    availableCounts: {
                        ...prevCounts,
                        [newCard.pokemon_dex_id]: currentCount + 1,
                    },
                };
            }, false);
        }

        setSearchModalOpen(false);
        setSelectModalOpen(true);
    };

    return (
        <div className="flex min-h-screen flex-col overflow-x-clip max-md:min-h-[calc(100dvh-3.5rem)]">
            <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center overflow-x-clip px-0 pt-2 pb-28 sm:pt-3 md:px-4 md:pb-14 max-md:pb-[calc(4.25rem+env(safe-area-inset-bottom))]">
                {isError ? (
                    <div className="flex min-h-[500px] flex-1 flex-col items-center justify-center gap-4 text-slate-400">
                        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center">
                            <p className="text-sm text-red-200">Falha ao carregar as cartas do binder</p>
                            <button onClick={() => mutate()} className="mt-4 cursor-pointer rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20">
                                Tentar novamente
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex min-h-0 w-full flex-1 flex-col items-center">
                        <div className="mb-2 flex w-full max-w-md shrink-0 items-center justify-between gap-2 px-2 md:hidden">
                            <button type="button" onClick={handlePrev} disabled={!canGoPrev} aria-label="Página anterior" className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ${canGoPrev ? "border-white/10 bg-[#121620]/85 text-white shadow-lg backdrop-blur-md hover:border-white/25 hover:bg-white/15 active:scale-95 cursor-pointer" : "cursor-not-allowed border-white/5 bg-white/[0.02] text-slate-600 opacity-25"}`}>
                                <ChevronLeft size={20} />
                            </button>

                            <div className="flex-1">
                                <BinderControls onSearch={handleSearchPokemon} />
                            </div>

                            <button type="button" onClick={handleNext} disabled={!canGoNext} aria-label="Próxima página" className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 ${canGoNext ? "border-white/10 bg-[#121620]/85 text-white shadow-lg backdrop-blur-md hover:border-white/25 hover:bg-white/15 active:scale-95 cursor-pointer" : "cursor-not-allowed border-white/5 bg-white/[0.02] text-slate-600 opacity-25"}`}>
                                <ChevronRight size={20} />
                            </button>
                        </div>

                        <div className="mb-5 hidden w-full max-w-sm shrink-0 justify-center md:flex">
                            <BinderControls onSearch={handleSearchPokemon} />
                        </div>

                        <div className="relative flex min-h-0 w-full flex-1 items-center justify-center gap-2 max-md:flex-none lg:gap-4 xl:gap-5">
                            <button
                                type="button"
                                onClick={handlePrev}
                                disabled={!canGoPrev}
                                aria-label="Página anterior"
                                className={`hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-200 md:flex xl:h-14 xl:w-14 ${canGoPrev ? "border-white/10 bg-[#121620]/85 text-white shadow-xl backdrop-blur-md hover:border-white/25 hover:bg-white/15 hover:scale-105 active:scale-95 cursor-pointer" : "cursor-not-allowed border-white/5 bg-white/[0.02] text-slate-600 opacity-25"}`}
                            >
                                <ChevronLeft size={24} />
                            </button>

                            <div className="relative flex h-full min-h-0 w-full max-w-6xl flex-1 items-center justify-center max-md:h-auto max-md:flex-none" aria-busy={!canReveal}>
                                {renderBinder ? (
                                    <BinderBookFlip
                                        ref={bookFlipRef}
                                        currentPage={currentPage}
                                        cardsMap={displayCardsMap}
                                        availableCounts={availableCounts}
                                        highlightedDexId={highlightedDexId}
                                        droppingDexId={droppingDexId}
                                        isMobile={isMobile}
                                        imagePages={imagePages}
                                        priorityPages={activePages}
                                        readyToOpen={canReveal}
                                        skipOpeningAnimation={skipEntranceAnimation}
                                        onEngineReady={handleBookEngineReady}
                                        onPageChange={handlePageChange}
                                        onSlotClick={handleSlotClick}
                                        onSwapClick={handleSwapClick}
                                        onReady={handleBookReady}
                                    />
                                ) : (
                                    <div className="binder-book-stage" />
                                )}
                                <div className={`binder-opening-loader ${showLoader ? "binder-opening-loader--visible" : ""}`} role="status" aria-hidden={!showLoader}>
                                    <PokeballLoader size="lg" message="Carregando seu fichário..." />
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleNext}
                                disabled={!canGoNext}
                                aria-label="Próxima página"
                                className={`hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-200 md:flex xl:h-14 xl:w-14 ${canGoNext ? "border-white/10 bg-[#121620]/85 text-white shadow-xl backdrop-blur-md hover:border-white/25 hover:bg-white/15 hover:scale-105 active:scale-95 cursor-pointer" : "cursor-not-allowed border-white/5 bg-white/[0.02] text-slate-600 opacity-25"}`}
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        <div className="relative z-20 mt-2 flex w-full shrink-0 items-center justify-center gap-2 lg:gap-4 xl:gap-5 md:mt-5">
                            <div className="hidden h-12 w-12 shrink-0 md:block xl:h-14 xl:w-14" aria-hidden="true" />

                            <div className="flex-1 max-w-6xl w-full flex justify-center">
                                <BinderPageNav activePages={activePages} cardsMap={displayCardsMap} onSelectPage={handleSelectPage} isMobile={isMobile} />
                            </div>

                            <div className="hidden h-12 w-12 shrink-0 md:block xl:h-14 xl:w-14" aria-hidden="true" />
                        </div>
                    </div>
                )}
            </main>

            <CardSearchModal isOpen={searchModalOpen} dexId={searchDexId} pokemonName={searchPokemonName} onClose={handleCloseSearchModal} onCardAdded={handleCardAdded} />

            <BinderSlotSelectModal key={selectDexId} isOpen={selectModalOpen} dexId={selectDexId} pokemonName={selectPokemonName} activeCardId={selectActiveCardId} activeCard={selectActiveCard} onClose={handleCloseSelectModal} onCardSelected={handleSelectCardFromCollection} onCardRemoved={handleRemoveCardFromCollection} onOpenCatalogSearch={handleOpenCatalogSearchFromSelect} />
        </div>
    );
}

export function BinderClientPage(props: BinderClientPageProps) {
    return (
        <Suspense fallback={<BinderOpeningLoader />}>
            <BinderContent {...props} />
        </Suspense>
    );
}
