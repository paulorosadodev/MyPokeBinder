"use client";

import { useState, useEffect, useMemo, useCallback, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { UserCard } from "@/types/binder";
import { formatTcgdexImageUrl } from "@/lib/pokemon/tcgdex";
import { TOTAL_PAGES, SLOTS_PER_PAGE, BINDER_CLOSED_BACK_PAGE, BINDER_LAST_SPREAD_PAGE, getPageForDexId, getDesktopSpreadPages, getPokemonSilhouetteUrl, getPokemonByDexId, isElementFullyVisibleInViewport } from "@/lib/pokemon/constants";
import { CardSearchModal } from "@/components/modal/CardSearchModal";
import { BinderSlotSelectModal } from "@/components/modal/BinderSlotSelectModal";
import { PokeballLoader } from "@/components/loading/PokeballLoader";
import { BinderBookFlip, type BinderBookFlipHandle } from "@/components/binder/BinderBookFlip";
import { BinderControls } from "@/components/binder/BinderControls";
import { BinderPageNav } from "@/components/binder/BinderPageNav";
import { useBinderCards } from "@/lib/swr";
import { useImagePreloader, preloadImages } from "@/lib/hooks/useImagePreloader";

interface BinderClientPageProps {
    initialUser?: {
        email?: string;
        avatarUrl?: string;
    } | null;
    initialCards?: UserCard[];
}

function BinderContent({ initialUser, initialCards }: BinderClientPageProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialPageParam = searchParams.get("page");
    const initialSpreadParam = searchParams.get("spread");
    const initialDexIdParam = searchParams.get("dexId");
    const openSelectParam = searchParams.get("openSelect");

    const initialTargetDexId = initialDexIdParam ? parseInt(initialDexIdParam, 10) : null;
    const shouldOpenSelectOnMount = Boolean(openSelectParam === "true" && initialTargetDexId && !isNaN(initialTargetDexId) && initialTargetDexId >= 1 && initialTargetDexId <= 151);

    const binderFallback = initialCards ? { cards: initialCards } : undefined;
    const { cards, isLoading: cardsLoading, isError, mutate } = useBinderCards(binderFallback);
    const { mutate: globalMutate } = useSWRConfig();

    const initialPage = initialPageParam ? parseInt(initialPageParam, 10) : initialSpreadParam ? (parseInt(initialSpreadParam, 10) - 1) * 2 + 1 : initialDexIdParam ? getPageForDexId(parseInt(initialDexIdParam, 10)) : 1;

    const [currentPage, setCurrentPage] = useState(Math.min(Math.max(1, initialPage || 1), TOTAL_PAGES));
    const [isMobile, setIsMobile] = useState(false);
    const [viewportReady, setViewportReady] = useState(false);
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

    const bookFlipRef = useRef<BinderBookFlipHandle>(null);
    const pendingDropDexIdRef = useRef<number | null>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        setViewportReady(true);
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
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

    const activePages = useMemo(() => {
        if (currentPage === 0 || currentPage >= BINDER_LAST_SPREAD_PAGE) {
            return [];
        }
        if (isMobile) {
            return [currentPage];
        }
        const [left, right] = getDesktopSpreadPages(currentPage);
        return right ? [left, right] : [left];
    }, [isMobile, currentPage]);

    const currentSpreadImages = useMemo(() => {
        const urls: string[] = [];
        activePages.forEach((pageNum) => {
            const startSlot = (pageNum - 1) * SLOTS_PER_PAGE + 1;
            for (let i = 0; i < SLOTS_PER_PAGE; i++) {
                const dex = startSlot + i;
                if (dex <= 151) {
                    const card = cardsMap.get(dex);
                    urls.push(card ? formatTcgdexImageUrl(card.card_image_url) : getPokemonSilhouetteUrl(dex));
                }
            }
        });
        return urls;
    }, [activePages, cardsMap]);

    const { allLoaded: currentImagesReady } = useImagePreloader(currentSpreadImages, {
        enabled: !cardsLoading,
        timeoutMs: 5000,
    });
    const isDataReady = !cardsLoading && currentImagesReady;

    useEffect(() => {
        if (cardsLoading) return;

        const adjacentPages: number[] = [];

        if (isMobile) {
            if (currentPage > 1) adjacentPages.push(currentPage - 1);
            if (currentPage < TOTAL_PAGES) adjacentPages.push(currentPage + 1);
        } else {
            const [left, right] = getDesktopSpreadPages(currentPage);
            const firstPage = left;
            const lastPage = right ?? left;
            if (firstPage > 1) {
                const [prevLeft, prevRight] = getDesktopSpreadPages(firstPage - 1);
                adjacentPages.push(prevLeft);
                if (prevRight) adjacentPages.push(prevRight);
            }
            if (lastPage < TOTAL_PAGES) {
                const [nextLeft, nextRight] = getDesktopSpreadPages(lastPage + 1);
                adjacentPages.push(nextLeft);
                if (nextRight) adjacentPages.push(nextRight);
            }
        }

        const adjacentUrls: string[] = [];
        adjacentPages.forEach((p) => {
            if (activePages.includes(p)) return;
            const startSlot = (p - 1) * SLOTS_PER_PAGE + 1;
            for (let i = 0; i < SLOTS_PER_PAGE; i++) {
                const dex = startSlot + i;
                if (dex <= 151) {
                    const card = cardsMap.get(dex);
                    adjacentUrls.push(card ? formatTcgdexImageUrl(card.card_image_url) : getPokemonSilhouetteUrl(dex));
                }
            }
        });

        preloadImages(adjacentUrls);
    }, [cardsLoading, isMobile, currentPage, activePages, cardsMap]);

    const canGoPrev = useMemo(() => {
        return currentPage > 0;
    }, [currentPage]);

    const canGoNext = useMemo(() => {
        return currentPage < BINDER_CLOSED_BACK_PAGE;
    }, [currentPage]);

    const handlePrev = useCallback(() => {
        if (!canGoPrev) return;
        bookFlipRef.current?.flipPrev();
    }, [canGoPrev]);

    const handleNext = useCallback(() => {
        if (!canGoNext) return;
        bookFlipRef.current?.flipNext();
    }, [canGoNext]);

    const handleSelectPage = useCallback(
        (targetPage: number) => {
            if (activePages.includes(targetPage)) return;
            bookFlipRef.current?.turnToPage(targetPage);
        },
        [activePages],
    );

    const handleNavigateToPokemon = useCallback(
        (targetDexId: number) => {
            if (targetDexId < 1 || targetDexId > 151) return;
            const targetPage = getPageForDexId(targetDexId);
            const pageWillChange = !activePages.includes(targetPage);

            if (pageWillChange) {
                bookFlipRef.current?.turnToPage(targetPage);
            }

            const checkAndScroll = () => {
                const element = document.getElementById(`binder-slot-${targetDexId}`);
                if (element && !isElementFullyVisibleInViewport(element)) {
                    element.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            };

            setTimeout(checkAndScroll, pageWillChange ? 650 : 100);
        },
        [activePages],
    );

    const handleSearchPokemon = useCallback(
        (targetDexId: number) => {
            handleNavigateToPokemon(targetDexId);
            setHighlightedDexId(targetDexId);
            setTimeout(() => {
                setHighlightedDexId(null);
            }, 3600);
        },
        [handleNavigateToPokemon],
    );

    useEffect(() => {
        if (initialDexIdParam && openSelectParam !== "true") {
            const targetDexId = parseInt(initialDexIdParam, 10);
            if (!isNaN(targetDexId)) {
                handleNavigateToPokemon(targetDexId);
            }
        }
    }, [initialDexIdParam, openSelectParam, handleNavigateToPokemon]);

    useEffect(() => {
        if (openSelectParam === "true" && initialDexIdParam) {
            const targetDexId = parseInt(initialDexIdParam, 10);
            if (!isNaN(targetDexId) && targetDexId >= 1 && targetDexId <= 151) {
                const pokemon = getPokemonByDexId(targetDexId);
                const active = cardsMap.get(targetDexId);
                setSelectDexId(targetDexId);
                setSelectPokemonName(pokemon ? pokemon.name : `Pokemon #${targetDexId}`);
                if (active) {
                    setSelectActiveCardId(active.id);
                    setSelectActiveCard(active);
                }
                setSelectModalOpen(true);
                globalMutate(`/api/cards?pokemon_dex_id=${targetDexId}`);
                mutate();
                router.replace(`/?page=${getPageForDexId(targetDexId)}`, { scroll: false });
            }
        }
    }, [initialDexIdParam, openSelectParam, cardsMap, router, globalMutate, mutate]);

    useEffect(() => {
        if (selectModalOpen && !selectActiveCard && cardsMap.has(selectDexId)) {
            const card = cardsMap.get(selectDexId);
            setSelectActiveCard(card);
            setSelectActiveCardId(card?.id);
        }
    }, [selectModalOpen, selectActiveCard, cardsMap, selectDexId]);

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
        pendingDropDexIdRef.current = null;
        setSelectDexId(dexId);
        setSelectPokemonName(pokemonName);
        setSelectActiveCardId(card?.id);
        setSelectActiveCard(card);
        setSelectModalOpen(true);
    };

    const handleSwapClick = (dexId: number, pokemonName: string, card?: UserCard) => {
        pendingDropDexIdRef.current = null;
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
        const optimisticCard: UserCard = { ...card, is_in_binder: true };
        mutate(
            (prev) => ({
                cards: [...(prev?.cards ?? []).filter((c) => c.pokemon_dex_id !== card.pokemon_dex_id), optimisticCard],
            }),
            false,
        );

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

        mutate(
            (prev) => ({
                cards: (prev?.cards ?? []).filter((c) => c.pokemon_dex_id !== card.pokemon_dex_id),
            }),
            false,
        );

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
        if (pendingDropDexIdRef.current) {
            const targetDex = pendingDropDexIdRef.current;
            pendingDropDexIdRef.current = null;
            setTimeout(() => {
                setDroppingDexId(targetDex);
                setTimeout(() => setDroppingDexId(null), 1400);
            }, 50);
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
                }),
                false,
            );
            pendingDropDexIdRef.current = newCard.pokemon_dex_id;
            setSelectActiveCardId(newCard.id);
            setSelectActiveCard(newCard);
        }

        setSearchModalOpen(false);
        setSelectModalOpen(true);
    };

    return (
        <div className="flex min-h-screen flex-col overflow-x-clip">
            <Header />

            <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center px-2 sm:px-4 pt-3 pb-28 md:pb-14 overflow-x-clip">
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
                    <div className="flex w-full flex-col items-center">
                        <div className="mb-4 flex w-full max-w-md items-center justify-between gap-2 px-1 md:hidden">
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

                        <div className="mb-5 hidden w-full max-w-sm justify-center md:flex">
                            <BinderControls onSearch={handleSearchPokemon} />
                        </div>

                        <div className="relative flex w-full items-center justify-center gap-2 lg:gap-4 xl:gap-5">
                            <button
                                type="button"
                                onClick={handlePrev}
                                disabled={!canGoPrev}
                                aria-label="Página anterior"
                                className={`hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all duration-200 md:flex xl:h-14 xl:w-14 ${canGoPrev ? "border-white/10 bg-[#121620]/85 text-white shadow-xl backdrop-blur-md hover:border-white/25 hover:bg-white/15 hover:scale-105 active:scale-95 cursor-pointer" : "cursor-not-allowed border-white/5 bg-white/[0.02] text-slate-600 opacity-25"}`}
                            >
                                <ChevronLeft size={24} />
                            </button>

                            <div className="flex-1 max-w-6xl w-full">
                                {viewportReady && isDataReady ? (
                                    <BinderBookFlip ref={bookFlipRef} currentPage={currentPage} cardsMap={cardsMap} highlightedDexId={highlightedDexId} droppingDexId={droppingDexId} isMobile={isMobile} readyToOpen onPageChange={setCurrentPage} onSlotClick={handleSlotClick} onSwapClick={handleSwapClick} />
                                ) : (
                                    <div className="binder-book-stage relative w-full flex items-center justify-center">
                                        <PokeballLoader size="lg" message="Carregando seu fichário..." />
                                    </div>
                                )}
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

                        <div className="relative z-20 mt-5 flex w-full items-center justify-center gap-2 lg:gap-4 xl:gap-5">
                            <div className="hidden h-12 w-12 shrink-0 md:block xl:h-14 xl:w-14" aria-hidden="true" />

                            <div className="flex-1 max-w-6xl w-full flex justify-center">
                                <BinderPageNav activePages={activePages} cardsMap={cardsMap} onSelectPage={handleSelectPage} isMobile={isMobile} />
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
        <Suspense
            fallback={
                <div className="flex min-h-screen flex-col">
                    <Header />
                    <div className="flex flex-1 items-center justify-center">
                        <PokeballLoader size="lg" message="Carregando binder..." />
                    </div>
                </div>
            }
        >
            <BinderContent {...props} />
        </Suspense>
    );
}
