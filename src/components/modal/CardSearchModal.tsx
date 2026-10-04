"use client";

import { useState, useEffect, useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { SearchCardItem, CardLanguage, CardVariant, CardCondition, UserCard, SearchResponse } from "@/types/binder";
import { formatTcgdexImageUrl } from "@/lib/pokemon/tcgdex";
import { useSWRConfig } from "swr";
import { planCollectionCachePatches } from "@/lib/collection/cache";
import { playCardDropSound } from "@/lib/audio/cardSounds";
import { getRarityImpactTier, RARITY_FILTER_OPTIONS } from "@/lib/pokemon/rarity";
import { formatVariantLabel, resolveCardShine, VARIANT_SLIDER_OPTIONS, VARIANT_SELECT_OPTIONS } from "@/lib/pokemon/variant";
import { CONDITION_SLIDER_OPTIONS, CONDITION_SELECT_OPTIONS } from "@/lib/pokemon/condition";
import { ALL_EXPANSIONS_FILTER, ALL_ARTISTS_FILTER, COLLECTION_PAGE_SIZE, buildExpansionFilterOptions, buildArtistFilterOptions, filterCatalogCards } from "@/lib/collection/listCards";
import { countCopiesForCombo, mergeCopyCounts, registerCopy, unregisterCopy, buildCopyGroupKey, totalCopies, type CopyCounts } from "@/lib/collection/copyCounts";
import { useInfiniteScroll } from "@/lib/hooks/useInfiniteScroll";
import { useGridColumnCount, getCompleteRowItems } from "@/lib/hooks/useGridColumnCount";
import { PokeballLoader } from "@/components/loading/PokeballLoader";
import { CardGridSkeleton } from "@/components/loading/CardGridSkeleton";
import { LanguageSlider, type LanguageSliderOption } from "@/components/ui/LanguageSlider";
import { FlagIcon } from "@/components/ui/FlagIcon";
import { Select, type SelectOption } from "@/components/ui/Select";
import { CardArtwork } from "@/components/ui/CardArtwork";
import { CardBadgeStack } from "@/components/ui/CardBadgeStack";
import { ModalSearchFilters } from "@/components/ui/ModalSearchFilters";
import { getCardAppearProps } from "@/lib/ui/cardAppear";
import { useDismissibleOverlay } from "@/lib/hooks/useDismissibleOverlay";
import { useOverlayPresence } from "@/lib/hooks/useOverlayPresence";
import { toast } from "sonner";
import { ArrowLeft, X, Search, Check, Sparkles, Gem, Layers, Palette, Plus, Minus, Trash2, Loader2 } from "lucide-react";

interface CardSearchModalProps {
    isOpen: boolean;
    hasOpenSibling?: boolean;
    skipEnterAnimation?: boolean;
    dexId?: number | null;
    pokemonName?: string;
    onClose: () => void;
    onBack?: () => void;
    onCardAdded: (newCard: UserCard) => void;
    onCardRemoved?: (cardId: string) => void;
}

const clientSearchCache = new Map<string, SearchResponse>();
const clientOwnershipCache = new Map<string, { counts: CopyCounts; copyIds: Record<string, string[]> }>();

function cacheOwnershipData(ids: string[], counts?: CopyCounts, copyIds?: Record<string, string[]>) {
    for (const id of ids) {
        const prefix = `${id}_`;
        const cardCounts: CopyCounts = {};
        const cardCopyIds: Record<string, string[]> = {};
        for (const [key, val] of Object.entries(counts ?? {})) {
            if (key.startsWith(prefix)) cardCounts[key] = val;
        }
        for (const [key, list] of Object.entries(copyIds ?? {})) {
            if (key.startsWith(prefix)) cardCopyIds[key] = list;
        }
        clientOwnershipCache.set(id, { counts: cardCounts, copyIds: cardCopyIds });
    }
}

function getCachedOwnership(ids: string[]) {
    const knownIds: string[] = [];
    const counts: CopyCounts = {};
    const copyIds: Record<string, string[]> = {};
    for (const id of ids) {
        const entry = clientOwnershipCache.get(id);
        if (entry) {
            knownIds.push(id);
            Object.assign(counts, entry.counts);
            for (const [key, list] of Object.entries(entry.copyIds)) {
                copyIds[key] = [...(copyIds[key] ?? []), ...list];
            }
        }
    }
    return { knownIds, counts, copyIds };
}

const CARD_ADDED_TOAST_ID = "card-search-carta-adicionada";
const OWNERSHIP_CHUNK_SIZE = 100;

const LANGUAGE_SHORT_LABELS: Record<CardLanguage, string> = {
    "pt-br": "PT-BR",
    en: "EN",
    ja: "JA",
};

const LANGUAGE_OPTIONS: LanguageSliderOption<CardLanguage>[] = [
    { value: "pt-br", label: "PT-BR", country: "pt-br" },
    { value: "en", label: "EN", country: "en" },
    { value: "ja", label: "JA", country: "ja" },
];

const LANGUAGE_SELECT_OPTIONS: SelectOption<CardLanguage>[] = [
    { value: "pt-br", label: "PT-BR", icon: <FlagIcon country="pt-br" /> },
    { value: "en", label: "EN", icon: <FlagIcon country="en" /> },
    { value: "ja", label: "JA", icon: <FlagIcon country="ja" /> },
];

export function CardSearchModal({ isOpen, hasOpenSibling = false, skipEnterAnimation = false, dexId, pokemonName, onClose, onBack, onCardAdded, onCardRemoved }: CardSearchModalProps) {
    const { mutate: globalMutate, cache } = useSWRConfig();
    const [lang, setLang] = useState<CardLanguage>("pt-br");
    const [variant, setVariant] = useState<CardVariant>("normal");
    const [condition, setCondition] = useState<CardCondition>("NM");
    const [cards, setCards] = useState<SearchCardItem[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [initialLoading, setInitialLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submittingIds, setSubmittingIds] = useState<string[]>([]);
    const [sessionCounts, setSessionCounts] = useState<CopyCounts>({});
    const [ownedCounts, setOwnedCounts] = useState<CopyCounts>({});
    const [ownedCardIds, setOwnedCardIds] = useState<Set<string>>(() => new Set());
    const [copyIdsMap, setCopyIdsMap] = useState<Record<string, string[]>>({});
    const copyIdsMapRef = useRef<Record<string, string[]>>({});
    const [deleteModalTarget, setDeleteModalTarget] = useState<SearchCardItem | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isInitialOwnershipLoading, setIsInitialOwnershipLoading] = useState(false);
    const [pendingArtworkIds, setPendingArtworkIds] = useState<Set<string>>(() => new Set());
    const searchAbortRef = useRef<AbortController | null>(null);
    const [scrollRoot, setScrollRoot] = useState<HTMLDivElement | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [rarityFilter, setRarityFilter] = useState("all");
    const [expansionFilter, setExpansionFilter] = useState(ALL_EXPANSIONS_FILTER);
    const [artistFilter, setArtistFilter] = useState(ALL_ARTISTS_FILTER);
    const [showFilters, setShowFilters] = useState(false);
    const submittingIdsRef = useRef<Set<string>>(new Set());
    const sessionCountsRef = useRef<CopyCounts>({});
    const [confirmTokens, setConfirmTokens] = useState<Record<string, number>>({});
    const confirmTimersRef = useRef<Map<string, number>>(new Map());
    const triggerAddConfirmation = useCallback((cardId: string) => {
        const existingTimer = confirmTimersRef.current.get(cardId);
        if (existingTimer !== undefined) window.clearTimeout(existingTimer);
        setConfirmTokens((previous) => ({ ...previous, [cardId]: (previous[cardId] ?? 0) + 1 }));
        const timer = window.setTimeout(() => {
            confirmTimersRef.current.delete(cardId);
            setConfirmTokens((previous) => {
                const next = { ...previous };
                delete next[cardId];
                return next;
            });
        }, 1000);
        confirmTimersRef.current.set(cardId, timer);
    }, []);
    useEffect(() => {
        const timers = confirmTimersRef.current;
        return () => {
            for (const timer of timers.values()) window.clearTimeout(timer);
            timers.clear();
        };
    }, []);
    const fetchedOwnershipIdsRef = useRef<Set<string>>(new Set());
    const isAnySubmitting = submittingIds.length > 0;
    const handleInitialArtworkLoaded = useCallback((cardId: string) => {
        setPendingArtworkIds((previous) => {
            if (!previous.has(cardId)) return previous;
            const next = new Set(previous);
            next.delete(cardId);
            return next;
        });
    }, []);
    const setInitialCards = useCallback(
        (nextCards: SearchCardItem[]) => {
            setCards(nextCards);
            const visibleSlice = nextCards.slice(0, Math.min(nextCards.length, 6));
            setPendingArtworkIds(new Set(visibleSlice.map((card) => card.id)));
            if (scrollRoot) scrollRoot.scrollTop = 0;
            if (typeof window !== "undefined") {
                for (const card of visibleSlice) {
                    if (!card.image) {
                        handleInitialArtworkLoaded(card.id);
                        continue;
                    }
                    const img = new window.Image();
                    img.src = formatTcgdexImageUrl(card.image, "low");
                    img.onload = () => handleInitialArtworkLoaded(card.id);
                    img.onerror = () => handleInitialArtworkLoaded(card.id);
                }
            }
        },
        [scrollRoot, handleInitialArtworkLoaded],
    );

    useEffect(() => {
        if (pendingArtworkIds.size === 0) return;
        const timer = setTimeout(() => {
            setPendingArtworkIds(new Set());
        }, 1000);
        return () => clearTimeout(timer);
    }, [pendingArtworkIds]);

    useEffect(() => {
        if (!isInitialOwnershipLoading) return;
        const timer = setTimeout(() => {
            setIsInitialOwnershipLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, [isInitialOwnershipLoading]);

    useDismissibleOverlay(isOpen, onClose, isAnySubmitting);
    const { isPresent, state } = useOverlayPresence(isOpen, { hasOpenSibling, skipEnterAnimation });

    useLayoutEffect(() => {
        if (!isOpen || !pokemonName) return;
        setCards([]);
        setHasMore(false);
        setIsInitialOwnershipLoading(true);
        setPendingArtworkIds(new Set());
    }, [isOpen, pokemonName]);

    useEffect(() => {
        if (!isOpen) {
            setIsInitialOwnershipLoading(false);
            setInitialLoading(false);
            setPendingArtworkIds(new Set());
            setCards([]);
            setPage(1);
            setHasMore(false);
            setError(null);
            setSearchTerm("");
            setRarityFilter("all");
            setExpansionFilter(ALL_EXPANSIONS_FILTER);
            setArtistFilter(ALL_ARTISTS_FILTER);
            setShowFilters(false);
            sessionCountsRef.current = {};
            setSessionCounts({});
            setOwnedCounts({});
            setOwnedCardIds(new Set());
            copyIdsMapRef.current = {};
            setCopyIdsMap({});
            setDeleteModalTarget(null);
            setIsDeleting(false);
            fetchedOwnershipIdsRef.current = new Set();
            return;
        }

        setLang("pt-br");
        setVariant("normal");
        setCondition("NM");
        setSearchTerm("");
        setRarityFilter("all");
        setExpansionFilter(ALL_EXPANSIONS_FILTER);
        setArtistFilter(ALL_ARTISTS_FILTER);
        setShowFilters(false);
        sessionCountsRef.current = {};
        setSessionCounts({});
        setOwnedCounts({});
        setOwnedCardIds(new Set());
        copyIdsMapRef.current = {};
        setCopyIdsMap({});
        setDeleteModalTarget(null);
        setIsDeleting(false);
        fetchedOwnershipIdsRef.current = new Set();
        if (!pokemonName) {
            setCards([]);
            setHasMore(false);
            setInitialLoading(false);
        }
    }, [isOpen, pokemonName]);

    useEffect(() => {
        if (!isOpen) return;

        const effectiveTerm = searchTerm.trim();
        const effectiveQuery = effectiveTerm || (pokemonName ? pokemonName.replace(/[♀♂]/g, "").trim() : "");
        const effectiveDexId = effectiveTerm ? undefined : (dexId ?? undefined);

        if (!effectiveQuery) {
            searchAbortRef.current?.abort();
            setCards([]);
            setHasMore(false);
            setInitialLoading(false);
            setIsInitialOwnershipLoading(false);
            return;
        }

        searchAbortRef.current?.abort();
        const controller = new AbortController();
        searchAbortRef.current = controller;

        let isMounted = true;
        const isUserTyping = Boolean(searchTerm.trim());
        const debounceDelay = isUserTyping ? 300 : 0;

        const timer = setTimeout(async () => {
            try {
                const cacheKey = effectiveDexId ? `${effectiveDexId}_${effectiveQuery}_page_1` : `catalog_${effectiveQuery}_page_1`;
                const cached = clientSearchCache.get(cacheKey);

                if (cached) {
                    const cachedCards = cached.cards ?? [];
                    setInitialCards(cachedCards);
                    setHasMore(cached.hasMore ?? false);
                    setPage(1);
                    setError(null);
                    setInitialLoading(false);

                    const { knownIds, counts: cachedCounts, copyIds: cachedCopyIds } = getCachedOwnership(cachedCards.map((c) => c.id));
                    if (knownIds.length > 0) {
                        setOwnedCardIds((prev) => new Set([...prev, ...knownIds]));
                        setOwnedCounts((prev) => mergeCopyCounts(prev, cachedCounts));
                        setCopyIdsMap((prev) => {
                            const merged = { ...prev };
                            for (const [k, ids] of Object.entries(cachedCopyIds)) {
                                merged[k] = Array.from(new Set([...(merged[k] ?? []), ...ids]));
                            }
                            copyIdsMapRef.current = merged;
                            return merged;
                        });
                        for (const id of knownIds) fetchedOwnershipIdsRef.current.add(id);
                    }

                    const hasPendingOwnership = cachedCards.some((c) => !fetchedOwnershipIdsRef.current.has(c.id));
                    if (hasPendingOwnership) {
                        setIsInitialOwnershipLoading(true);
                    } else {
                        setIsInitialOwnershipLoading(false);
                    }
                    return;
                }

                setInitialLoading(true);
                setIsInitialOwnershipLoading(true);
                setError(null);
                setPage(1);

                const dexParam = effectiveDexId ? `&dexId=${effectiveDexId}` : "";
                const res = await fetch(`/api/search?name=${encodeURIComponent(effectiveQuery)}${dexParam}&page=1&pageSize=${COLLECTION_PAGE_SIZE}`, {
                    signal: controller.signal,
                });
                const data: SearchResponse = await res.json();

                if (!res.ok) {
                    const errorMsg = (data as unknown as { error?: string }).error || "Erro ao buscar cartas";
                    throw new Error(errorMsg);
                }

                clientSearchCache.set(cacheKey, data);

                if (isMounted) {
                    const nextCards = data.cards ?? [];
                    setInitialCards(nextCards);
                    setHasMore(data.hasMore ?? false);
                }
            } catch (err: unknown) {
                if (err instanceof DOMException && err.name === "AbortError") {
                    return;
                }
                if (isMounted) {
                    const msg = err instanceof Error ? err.message : "Falha na busca";
                    setError(msg);
                    setCards([]);
                    setHasMore(false);
                }
            } finally {
                if (isMounted && !controller.signal.aborted) {
                    setInitialLoading(false);
                }
            }
        }, debounceDelay);

        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, [isOpen, pokemonName, dexId, searchTerm]);

    useEffect(() => {
        if (!isOpen || cards.length === 0) {
            return;
        }

        const pendingIds = Array.from(new Set(cards.map((card) => card.id))).filter((id) => !fetchedOwnershipIdsRef.current.has(id));
        if (pendingIds.length === 0) {
            setIsInitialOwnershipLoading(false);
            return;
        }
        for (const id of pendingIds) fetchedOwnershipIdsRef.current.add(id);

        let isMounted = true;
        let didComplete = false;
        if (page === 1) {
            setIsInitialOwnershipLoading(true);
        }

        const loadOwnership = async () => {
            try {
                const collected: CopyCounts = {};
                const collectedIds: Record<string, string[]> = {};

                for (let index = 0; index < pendingIds.length; index += OWNERSHIP_CHUNK_SIZE) {
                    const chunk = pendingIds.slice(index, index + OWNERSHIP_CHUNK_SIZE);
                    try {
                        const res = await fetch(`/api/cards/ownership?ids=${encodeURIComponent(chunk.join(","))}`);
                        if (!res.ok) continue;
                        const data = (await res.json()) as { counts?: CopyCounts; copyIds?: Record<string, string[]> };
                        cacheOwnershipData(chunk, data.counts, data.copyIds);
                        Object.assign(collected, data.counts ?? {});
                        if (data.copyIds) {
                            for (const [key, ids] of Object.entries(data.copyIds)) {
                                collectedIds[key] = [...(collectedIds[key] ?? []), ...ids];
                            }
                        }
                    } catch {}
                }

                if (!isMounted) return;
                didComplete = true;
                setOwnedCardIds((previous) => new Set([...previous, ...pendingIds]));
                if (Object.keys(collected).length > 0) {
                    setOwnedCounts((previous) => mergeCopyCounts(previous, collected));
                }
                if (Object.keys(collectedIds).length > 0) {
                    setCopyIdsMap((previous) => {
                        const merged = { ...previous };
                        for (const [key, ids] of Object.entries(collectedIds)) {
                            merged[key] = Array.from(new Set([...(merged[key] ?? []), ...ids]));
                        }
                        copyIdsMapRef.current = merged;
                        return merged;
                    });
                }
            } finally {
                if (!didComplete) {
                    for (const id of pendingIds) fetchedOwnershipIdsRef.current.delete(id);
                }
                if (isMounted) {
                    setIsInitialOwnershipLoading(false);
                }
            }
        };

        void loadOwnership();
        return () => {
            isMounted = false;
        };
    }, [isOpen, cards, page]);

    const loadNextPage = useCallback(async () => {
        if (loadingMore || initialLoading || !hasMore) return;

        const effectiveTerm = searchTerm.trim();
        const effectiveQuery = effectiveTerm || (pokemonName ? pokemonName.replace(/[♀♂]/g, "").trim() : "");
        if (!effectiveQuery) return;
        const effectiveDexId = effectiveTerm ? undefined : (dexId ?? undefined);

        try {
            setLoadingMore(true);
            const nextPage = page + 1;
            const cacheKey = effectiveDexId ? `${effectiveDexId}_${effectiveQuery}_page_${nextPage}` : `catalog_${effectiveQuery}_page_${nextPage}`;
            const cached = clientSearchCache.get(cacheKey);

            if (cached) {
                const cachedCards = cached.cards ?? [];
                const newIds = cachedCards.map((c) => c.id).filter((id) => !fetchedOwnershipIdsRef.current.has(id));
                if (newIds.length > 0) {
                    const { knownIds, counts: cachedCounts, copyIds: cachedCopyIds } = getCachedOwnership(newIds);
                    if (knownIds.length > 0) {
                        setOwnedCounts((prev) => mergeCopyCounts(prev, cachedCounts));
                        setCopyIdsMap((prev) => {
                            const merged = { ...prev };
                            for (const [k, ids] of Object.entries(cachedCopyIds)) {
                                merged[k] = Array.from(new Set([...(merged[k] ?? []), ...ids]));
                            }
                            copyIdsMapRef.current = merged;
                            return merged;
                        });
                        setOwnedCardIds((prev) => new Set([...prev, ...knownIds]));
                        for (const id of knownIds) fetchedOwnershipIdsRef.current.add(id);
                    }
                    const missingIds = newIds.filter((id) => !fetchedOwnershipIdsRef.current.has(id));
                    if (missingIds.length > 0) {
                        for (const id of missingIds) fetchedOwnershipIdsRef.current.add(id);
                        try {
                            const ownRes = await fetch(`/api/cards/ownership?ids=${encodeURIComponent(missingIds.join(","))}`);
                            if (ownRes.ok) {
                                const ownData = (await ownRes.json()) as { counts?: CopyCounts; copyIds?: Record<string, string[]> };
                                cacheOwnershipData(missingIds, ownData.counts, ownData.copyIds);
                                if (ownData.counts) {
                                    setOwnedCounts((previous) => mergeCopyCounts(previous, ownData.counts ?? {}));
                                }
                                if (ownData.copyIds) {
                                    setCopyIdsMap((previous) => {
                                        const merged = { ...previous };
                                        for (const [key, ids] of Object.entries(ownData.copyIds ?? {})) {
                                            merged[key] = Array.from(new Set([...(merged[key] ?? []), ...ids]));
                                        }
                                        copyIdsMapRef.current = merged;
                                        return merged;
                                    });
                                }
                            }
                        } catch {}
                        setOwnedCardIds((previous) => new Set([...previous, ...missingIds]));
                    }
                }
                setCards((prev) => {
                    const existingIds = new Set(prev.map((c) => c.id));
                    const uniqueIncoming = (cached.cards ?? []).filter((c) => !existingIds.has(c.id));
                    return [...prev, ...uniqueIncoming];
                });
                setPage(nextPage);
                setHasMore(cached.hasMore ?? false);
                setLoadingMore(false);
                return;
            }

            const dexParam = effectiveDexId ? `&dexId=${effectiveDexId}` : "";
            const res = await fetch(`/api/search?name=${encodeURIComponent(effectiveQuery)}${dexParam}&page=${nextPage}&pageSize=${COLLECTION_PAGE_SIZE}`);
            const data: SearchResponse = await res.json();

            if (!res.ok) {
                const errorMsg = (data as unknown as { error?: string }).error || "Erro ao carregar mais cartas";
                throw new Error(errorMsg);
            }

            clientSearchCache.set(cacheKey, data);

            const incomingCards = data.cards ?? [];
            const incomingIds = incomingCards.map((c) => c.id).filter((id) => !fetchedOwnershipIdsRef.current.has(id));
            if (incomingIds.length > 0) {
                for (const id of incomingIds) fetchedOwnershipIdsRef.current.add(id);
                try {
                    const ownRes = await fetch(`/api/cards/ownership?ids=${encodeURIComponent(incomingIds.join(","))}`);
                    if (ownRes.ok) {
                        const ownData = (await ownRes.json()) as { counts?: CopyCounts; copyIds?: Record<string, string[]> };
                        cacheOwnershipData(incomingIds, ownData.counts, ownData.copyIds);
                        if (ownData.counts) {
                            setOwnedCounts((previous) => mergeCopyCounts(previous, ownData.counts ?? {}));
                        }
                        if (ownData.copyIds) {
                            setCopyIdsMap((previous) => {
                                const merged = { ...previous };
                                for (const [key, ids] of Object.entries(ownData.copyIds ?? {})) {
                                    merged[key] = Array.from(new Set([...(merged[key] ?? []), ...ids]));
                                }
                                copyIdsMapRef.current = merged;
                                return merged;
                            });
                        }
                    }
                } catch {}
                setOwnedCardIds((previous) => new Set([...previous, ...incomingIds]));
            }

            setCards((prev) => {
                const existingIds = new Set(prev.map((c) => c.id));
                const uniqueIncoming = (data.cards ?? []).filter((c) => !existingIds.has(c.id));
                return [...prev, ...uniqueIncoming];
            });
            setPage(nextPage);
            setHasMore(data.hasMore ?? false);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Falha ao carregar mais cartas";
            setError(msg);
        } finally {
            setLoadingMore(false);
        }
    }, [page, hasMore, loadingMore, initialLoading, pokemonName, dexId, searchTerm]);

    const effectiveTerm = searchTerm.trim();
    const activeDexId = effectiveTerm ? undefined : (dexId ?? undefined);

    const filteredCards = useMemo(
        () =>
            filterCatalogCards(cards, {
                searchTerm: "",
                rarityFilter,
                expansionFilter,
                artistFilter,
                dexId: activeDexId,
            }),
        [cards, rarityFilter, expansionFilter, artistFilter, activeDexId],
    );
    const { columns, gridRef } = useGridColumnCount();
    const displayedCards = useMemo(() => getCompleteRowItems(filteredCards, columns, hasMore), [filteredCards, columns, hasMore]);
    const expansionOptions = useMemo(() => buildExpansionFilterOptions(cards.map((card) => card.setName)), [cards]);
    const artistOptions = useMemo(() => buildArtistFilterOptions(cards.map((card) => card.artist)), [cards]);
    const hasActiveCatalogFilters = Boolean(searchTerm.trim()) || rarityFilter !== "all" || expansionFilter !== ALL_EXPANSIONS_FILTER || artistFilter !== ALL_ARTISTS_FILTER;
    const totalCopiesByCard = useMemo(() => mergeCopyCounts(ownedCounts, sessionCounts), [ownedCounts, sessionCounts]);
    const isCatalogGridLoading = !loadingMore && page === 1 && (initialLoading || isInitialOwnershipLoading || pendingArtworkIds.size > 0);

    useEffect(() => {
        if (!isOpen || initialLoading || loadingMore || !hasMore || !hasActiveCatalogFilters) return;
        if (filteredCards.length >= 12) return;
        void loadNextPage();
    }, [isOpen, initialLoading, loadingMore, hasMore, hasActiveCatalogFilters, filteredCards.length, loadNextPage]);

    const sentinelRef = useInfiniteScroll({
        hasMore,
        isLoading: loadingMore || initialLoading,
        onLoadMore: loadNextPage,
        root: scrollRoot,
        enabled: isOpen,
    });

    const handleAddCard = async (card: SearchCardItem) => {
        if (submittingIdsRef.current.has(card.id)) return;

        const groupLang = lang;
        const groupVariant = variant;
        const groupCondition = condition;
        const groupKey = buildCopyGroupKey(card.id, groupLang, groupVariant, groupCondition);

        try {
            submittingIdsRef.current.add(card.id);
            setSubmittingIds((previous) => (previous.includes(card.id) ? previous : [...previous, card.id]));
            setError(null);

            const res = await fetch("/api/cards", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tcgdex_card_id: card.id,
                    pokemon_dex_id: card.dexId !== undefined ? card.dexId : dexId || null,
                    card_name: card.name,
                    card_image_url: formatTcgdexImageUrl(card.image),
                    card_set_name: card.setName || "",
                    card_rarity: card.rarity || "",
                    card_artist: card.artist || "",
                    card_condition: groupCondition,
                    card_types: card.types || [],
                    card_language: groupLang,
                    card_variant: groupVariant,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Erro ao adicionar carta");
            }

            const nextCounts = registerCopy(sessionCountsRef.current, card.id, groupLang, groupVariant, groupCondition);
            sessionCountsRef.current = nextCounts;
            setSessionCounts(nextCounts);
            fetchedOwnershipIdsRef.current.add(card.id);
            setOwnedCardIds((previous) => new Set([...previous, card.id]));

            const nextCopyIds = {
                ...copyIdsMapRef.current,
                [groupKey]: [data.card.id, ...(copyIdsMapRef.current[groupKey] ?? [])],
            };
            copyIdsMapRef.current = nextCopyIds;
            setCopyIdsMap(nextCopyIds);

            const existingCache = clientOwnershipCache.get(card.id) ?? { counts: {}, copyIds: {} };
            const nextCacheCounts = registerCopy(existingCache.counts, card.id, groupLang, groupVariant, groupCondition);
            const nextCacheCopyIds = {
                ...existingCache.copyIds,
                [groupKey]: [data.card.id, ...(existingCache.copyIds[groupKey] ?? [])],
            };
            clientOwnershipCache.set(card.id, { counts: nextCacheCounts, copyIds: nextCacheCopyIds });

            onCardAdded(data.card);
            playCardDropSound(getRarityImpactTier(card.rarity, card.name));
            triggerAddConfirmation(card.id);

            const sessionTotal = totalCopies(nextCounts);
            toast.success(sessionTotal === 1 ? "Carta adicionada à Coleção!" : `${sessionTotal} cartas adicionadas à Coleção!`, {
                id: CARD_ADDED_TOAST_ID,
                description: `${card.name} (${formatVariantLabel(groupVariant)}) cadastrada com sucesso.`,
            });
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Erro ao adicionar";
            setError(msg);
            toast.error("Erro ao adicionar carta", {
                description: msg,
            });
        } finally {
            submittingIdsRef.current.delete(card.id);
            setSubmittingIds((previous) => previous.filter((id) => id !== card.id));
        }
    };

    const handleRemoveCopy = async (card: SearchCardItem) => {
        if (submittingIdsRef.current.has(card.id)) return;

        const groupLang = lang;
        const groupVariant = variant;
        const groupCondition = condition;
        const groupKey = buildCopyGroupKey(card.id, groupLang, groupVariant, groupCondition);

        try {
            submittingIdsRef.current.add(card.id);
            setSubmittingIds((previous) => (previous.includes(card.id) ? previous : [...previous, card.id]));
            setError(null);

            let copyId = copyIdsMapRef.current[groupKey]?.[0];
            if (!copyId) {
                const targetDexId = card.dexId !== undefined ? card.dexId : dexId;
                const fallbackUrl = targetDexId ? `/api/cards?pokemon_dex_id=${targetDexId}` : "/api/cards";
                const fallbackRes = await fetch(fallbackUrl);
                if (fallbackRes.ok) {
                    const fallbackData = await fallbackRes.json();
                    const match = (fallbackData.cards ?? []).find((c: UserCard) => c.tcgdex_card_id === card.id && c.card_language === groupLang && c.card_variant === groupVariant && c.card_condition === groupCondition);
                    if (match) copyId = match.id;
                }
            }

            if (!copyId) {
                throw new Error("Cópia não encontrada para remoção");
            }

            const deleteRes = await fetch(`/api/cards/${copyId}`, { method: "DELETE" });
            const deleteData = await deleteRes.json();
            if (!deleteRes.ok) {
                throw new Error(deleteData.error || "Erro ao remover carta");
            }

            const nextCopyIds = {
                ...copyIdsMapRef.current,
                [groupKey]: (copyIdsMapRef.current[groupKey] ?? []).filter((id) => id !== copyId),
            };
            copyIdsMapRef.current = nextCopyIds;
            setCopyIdsMap(nextCopyIds);

            const sessionCount = countCopiesForCombo(sessionCountsRef.current, card.id, groupLang, groupVariant, groupCondition);
            if (sessionCount > 0) {
                const nextSession = unregisterCopy(sessionCountsRef.current, card.id, groupLang, groupVariant, groupCondition);
                sessionCountsRef.current = nextSession;
                setSessionCounts(nextSession);
            } else {
                setOwnedCounts((previous) => unregisterCopy(previous, card.id, groupLang, groupVariant, groupCondition));
            }

            const existingCache = clientOwnershipCache.get(card.id);
            if (existingCache) {
                const nextCacheCounts = unregisterCopy(existingCache.counts, card.id, groupLang, groupVariant, groupCondition);
                const nextCacheCopyIds = {
                    ...existingCache.copyIds,
                    [groupKey]: (existingCache.copyIds[groupKey] ?? []).filter((id) => id !== copyId),
                };
                clientOwnershipCache.set(card.id, { counts: nextCacheCounts, copyIds: nextCacheCopyIds });
            }

            onCardRemoved?.(copyId);

            for (const patch of planCollectionCachePatches(cache.keys(), (cacheKey) => cache.get(cacheKey), { deletedCardIds: [copyId] })) {
                void globalMutate(patch.key, patch.data, false);
            }

            void globalMutate("/api/binder");
            void globalMutate("/api/cards");
            void globalMutate("/api/dashboard");

            toast.success("Carta removida da Coleção!", {
                description: `${card.name} (${formatVariantLabel(groupVariant)}) foi removida.`,
            });
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Erro ao remover";
            setError(msg);
            toast.error("Erro ao remover carta", {
                description: msg,
            });
        } finally {
            submittingIdsRef.current.delete(card.id);
            setSubmittingIds((previous) => previous.filter((id) => id !== card.id));
        }
    };

    const handleConfirmDelete = async () => {
        if (!deleteModalTarget || isDeleting) return;
        try {
            setIsDeleting(true);
            await handleRemoveCopy(deleteModalTarget);
            setDeleteModalTarget(null);
        } finally {
            setIsDeleting(false);
        }
    };

    if (!isPresent) return null;

    const activeFilterCount = (rarityFilter !== "all" ? 1 : 0) + (expansionFilter !== ALL_EXPANSIONS_FILTER ? 1 : 0) + (artistFilter !== ALL_ARTISTS_FILTER ? 1 : 0);
    const sessionTotal = totalCopies(sessionCounts);
    const sessionCounter =
        sessionTotal > 0 ? (
            <span aria-live="polite" className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-emerald-200 whitespace-nowrap">
                <Check size={11} className="shrink-0" />
                {sessionTotal === 1 ? "1 adicionada" : `${sessionTotal} adicionadas`}
            </span>
        ) : null;

    return (
        <div
            className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-sm"
            data-overlay-state={state}
            role="dialog"
            aria-modal="true"
            aria-label="Buscar carta"
            onClick={(e) => {
                if (e.target === e.currentTarget && !isAnySubmitting) onClose();
            }}
        >
            <div className="modal-surface flex h-dvh max-h-none w-full max-w-none flex-col overflow-hidden rounded-none border-0 bg-[#12151d] shadow-2xl sm:h-[85vh] sm:max-h-[820px] sm:max-w-3xl sm:rounded-2xl sm:border sm:border-white/10 md:max-w-5xl lg:max-w-6xl">
                <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5 sm:px-6 sm:py-3.5">
                    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                        {onBack ? (
                            <button type="button" onClick={onBack} aria-label="Voltar ao seletor do binder" className="flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white sm:h-9 sm:rounded-xl">
                                <ArrowLeft size={15} />
                                <span className="hidden sm:inline">Voltar</span>
                            </button>
                        ) : null}
                        <div className="min-w-0">
                            {pokemonName ? (
                                <>
                                    <div className="flex items-center gap-2 sm:gap-2.5">
                                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">{pokemonName}</h2>
                                        {dexId && <span className="rounded-md border border-white/10 bg-white/10 px-2 py-0.5 font-mono text-[11px] sm:text-xs font-semibold text-slate-300">#{String(dexId).padStart(3, "0")}</span>}
                                        {sessionCounter}
                                    </div>
                                    <p className="hidden sm:block mt-0.5 text-xs text-slate-400">Escolha o idioma e a versão física, depois adicione à coleção</p>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2 sm:gap-2.5">
                                        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Adicionar Carta à Coleção</h2>
                                        {sessionCounter}
                                    </div>
                                    <p className="hidden sm:block mt-0.5 text-xs text-slate-400">Busque no catálogo oficial do Pokémon TCG físico (Pokémon, Treinadores e Energias)</p>
                                </>
                            )}
                        </div>
                    </div>

                    <button type="button" onClick={onClose} disabled={isAnySubmitting} aria-label="Fechar" className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:h-9 sm:w-9 sm:rounded-xl">
                        <X size={18} />
                    </button>
                </div>

                <div className="flex shrink-0 flex-col gap-2.5 border-b border-white/10 bg-black/20 px-3 py-2.5 sm:px-6 sm:py-3">
                    <ModalSearchFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} showFilters={showFilters} onToggleFilters={() => setShowFilters((prev) => !prev)} activeFilterCount={activeFilterCount} filterButtonAriaLabel="Alternar filtros de raridade, expansão e ilustrador" isLoading={initialLoading}>
                        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2.5 pt-0.5 w-full">
                            <Select<string> value={rarityFilter} onChange={setRarityFilter} options={RARITY_FILTER_OPTIONS} icon={<Gem size={13} />} ariaLabel="Filtrar catálogo por raridade" className="w-full min-w-0" size="sm" />
                            <Select<string> value={expansionFilter} onChange={setExpansionFilter} options={expansionOptions} icon={<Layers size={13} />} ariaLabel="Filtrar catálogo por expansão" className="w-full min-w-0" size="sm" />
                            <Select<string> value={artistFilter} onChange={setArtistFilter} options={artistOptions} icon={<Palette size={13} />} ariaLabel="Filtrar catálogo por ilustrador" className="col-span-2 sm:col-span-1 w-full min-w-0" size="sm" align="right" />
                        </div>
                    </ModalSearchFilters>

                    <div className="modal-transient-content flex flex-col gap-1.5 sm:gap-2 border-t border-white/10 pt-2 sm:pt-2.5">
                        <div className="flex items-center gap-1.5 text-slate-400">
                            <Sparkles size={11} className="text-poke-blue shrink-0" />
                            <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-slate-300">Sua carta</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5 sm:hidden">
                            <Select<CardLanguage> value={lang} onChange={setLang} options={LANGUAGE_SELECT_OPTIONS} ariaLabel="Idioma da carta a ser adicionada" size="sm" className="w-full" />
                            <Select<CardVariant> value={variant} onChange={setVariant} options={VARIANT_SELECT_OPTIONS} ariaLabel="Versão física da carta a ser adicionada" size="sm" className="w-full" />
                            <Select<CardCondition> value={condition} onChange={setCondition} options={CONDITION_SELECT_OPTIONS} ariaLabel="Estado de conservação da carta" size="sm" className="w-full" />
                        </div>
                        <div className="hidden sm:grid sm:grid-cols-3 sm:gap-2.5">
                            <LanguageSlider value={lang} onChange={setLang} options={LANGUAGE_OPTIONS} size="sm" fullWidth ariaLabel="Idioma da carta a ser adicionada" />
                            <LanguageSlider<CardVariant> value={variant} onChange={setVariant} options={VARIANT_SLIDER_OPTIONS} size="sm" fullWidth ariaLabel="Versão física da carta a ser adicionada" />
                            <LanguageSlider<CardCondition> value={condition} onChange={setCondition} options={CONDITION_SLIDER_OPTIONS} size="sm" fullWidth ariaLabel="Estado de conservação da carta" />
                        </div>
                    </div>
                </div>

                {error && <div className="mx-4 sm:mx-6 mt-2.5 sm:mt-3 shrink-0 rounded-lg border border-red-500/30 bg-red-500/15 p-2.5 sm:p-3 text-xs text-red-200">{error}</div>}

                <div ref={setScrollRoot} className="flex-1 overflow-y-auto p-3 sm:p-6">
                    {isCatalogGridLoading || (cards.length === 0 && initialLoading) ? (
                        <CardGridSkeleton count={10} gridClassName="grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5" />
                    ) : cards.length === 0 ? (
                        !pokemonName && !searchTerm.trim() ? (
                            <div className="flex h-full min-h-[250px] flex-col items-center justify-center gap-2 text-center text-slate-500">
                                <Search size={32} className="text-slate-600" />
                                <span className="text-sm font-semibold text-white">Pesquise no catálogo do Pokémon TCG</span>
                                <span className="text-xs text-slate-400 max-w-sm">Digite o nome, Pokédex (#001–#1025), número de coleção (ex: 049, XY123, 25/165) ou combine (ex: Snivy 049, Venusaur (XY123)).</span>
                            </div>
                        ) : (
                            <div className="flex h-full min-h-[250px] flex-col items-center justify-center gap-2 text-slate-500">
                                <Search size={32} className="text-slate-600" />
                                <span className="text-sm">Nenhuma carta com imagem encontrada.</span>
                            </div>
                        )
                    ) : filteredCards.length === 0 ? (
                        <div className="flex h-full min-h-[250px] flex-col items-center justify-center gap-3 text-center text-slate-500">
                            <Search size={32} className="text-slate-600" />
                            <span className="text-sm text-white">Nenhuma carta encontrada</span>
                            <span className="text-xs">Tente ajustar a busca ou os filtros.</span>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchTerm("");
                                    setRarityFilter("all");
                                    setExpansionFilter(ALL_EXPANSIONS_FILTER);
                                    setArtistFilter(ALL_ARTISTS_FILTER);
                                }}
                                className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                Limpar filtros
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 sm:gap-6">
                            <div className="relative">
                                <div ref={gridRef} className={`grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 transition-opacity duration-200 ${initialLoading ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
                                    {displayedCards.map((card, index) => {
                                        const isSubmittingThis = submittingIds.includes(card.id);
                                        const comboCount = countCopiesForCombo(totalCopiesByCard, card.id, lang, variant, condition);
                                        const isOwnershipKnown = ownedCardIds.has(card.id);
                                        const isMissing = isOwnershipKnown && comboCount === 0;
                                        const isAddingConfirmed = Boolean(confirmTokens[card.id]);
                                        const selectionLabel = `${LANGUAGE_SHORT_LABELS[lang]} · ${formatVariantLabel(variant)} · ${condition}`;
                                        const ownershipLabel = comboCount > 0 ? `você já tem ${comboCount === 1 ? "1 exemplar" : `${comboCount} exemplares`} nesta configuração` : null;
                                        const appear = getCardAppearProps(index);
                                        const shineMode = resolveCardShine(variant, card.rarity, card.image, card.name);
                                        const imageSrc = formatTcgdexImageUrl(card.image, "low");

                                        return (
                                            <div
                                                key={card.id}
                                                data-missing={isMissing ? "true" : undefined}
                                                aria-label={ownershipLabel ? `${card.name} (${selectionLabel}) — ${ownershipLabel}` : `Adicionar ${card.name} (${selectionLabel}) à Coleção`}
                                                title={ownershipLabel ? `${card.name} (${selectionLabel}) — ${ownershipLabel}` : `Adicionar ${card.name} (${selectionLabel}) à Coleção`}
                                                className={`group relative isolate block aspect-[8/11] w-full text-left transition-opacity duration-200 ${isSubmittingThis ? "cursor-default opacity-60" : ""} ${isMissing && !isSubmittingThis ? "opacity-60 saturate-50 hover:opacity-90" : ""}`}
                                            >
                                                <span className={`block h-full w-full ${appear.className}`} style={appear.style}>
                                                    <CardArtwork src={imageSrc} alt="" sizes="(max-width: 768px) 50vw, 200px" priority={index < 8} shineMode={isSubmittingThis ? "none" : shineMode} elementTypes={card.types} maxTilt={0} maxMove={0} scale={1} transitionDuration={0} imageClassName="pointer-events-none object-contain" onImageLoaded={() => handleInitialArtworkLoaded(card.id)}>
                                                        {comboCount > 1 && !isSubmittingThis ? <CardBadgeStack count={comboCount} includeCondition={false} includeLanguage={false} countDataAttribute="matching" /> : null}
                                                        {!isSubmittingThis && !isAddingConfirmed && comboCount === 0 ? (
                                                            <button type="button" disabled={isSubmittingThis} onClick={() => handleAddCard(card)} aria-label={`Adicionar ${card.name} (${selectionLabel}) à Coleção`} className="absolute inset-0 z-30 flex cursor-pointer flex-col items-center justify-center rounded-[inherit] bg-black/60 text-white opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 disabled:cursor-default disabled:opacity-60">
                                                                <span className="flex h-12 w-12 scale-90 items-center justify-center rounded-full border border-white/40 bg-poke-blue shadow-lg shadow-poke-blue/40 transition-transform duration-200 ease-out group-hover:scale-100 group-focus-visible:scale-100">
                                                                    <Plus size={22} strokeWidth={2.5} />
                                                                </span>
                                                                <span className="mt-2 text-[10px] font-semibold tracking-wide">Adicionar</span>
                                                            </button>
                                                        ) : null}
                                                        {!isSubmittingThis && !isAddingConfirmed && comboCount > 0 ? (
                                                            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center rounded-[inherit] bg-black/60 p-2 text-white opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-within:opacity-100">
                                                                <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-900/90 p-1 shadow-xl">
                                                                    {comboCount === 1 ? (
                                                                        <button
                                                                            type="button"
                                                                            disabled={isSubmittingThis}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setDeleteModalTarget(card);
                                                                            }}
                                                                            aria-label={`Excluir ${card.name} (${selectionLabel}) da coleção`}
                                                                            title={`Excluir ${card.name} (${selectionLabel}) da coleção`}
                                                                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-red-500/40 bg-red-500/20 text-red-400 transition-all hover:border-red-500/60 hover:bg-red-500 hover:text-white active:scale-95 disabled:cursor-default disabled:opacity-50"
                                                                        >
                                                                            <Trash2 size={16} />
                                                                        </button>
                                                                    ) : (
                                                                        <button
                                                                            type="button"
                                                                            disabled={isSubmittingThis}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleRemoveCopy(card);
                                                                            }}
                                                                            aria-label={`Diminuir quantidade de ${card.name} (${selectionLabel}) na Coleção — ${ownershipLabel}`}
                                                                            title={`Remover 1 exemplar de ${card.name} (${selectionLabel})`}
                                                                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition-all hover:bg-white/20 active:scale-95 disabled:cursor-default disabled:opacity-50"
                                                                        >
                                                                            <Minus size={16} />
                                                                        </button>
                                                                    )}
                                                                    <span className="min-w-[28px] text-center font-mono text-sm font-bold text-white">{comboCount}</span>
                                                                    <button
                                                                        type="button"
                                                                        disabled={isSubmittingThis}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleAddCard(card);
                                                                        }}
                                                                        aria-label={`Adicionar mais 1 cópia de ${card.name} (${selectionLabel}) à Coleção — ${ownershipLabel}`}
                                                                        title={`Adicionar mais 1 cópia idêntica de ${card.name} (${selectionLabel}) à Coleção`}
                                                                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-poke-blue text-white shadow-md shadow-poke-blue/30 transition-all hover:brightness-110 active:scale-95 disabled:cursor-default disabled:opacity-50"
                                                                    >
                                                                        <Plus size={16} strokeWidth={2.5} />
                                                                    </button>
                                                                </div>
                                                                <span className="mt-2 text-[10px] font-semibold tracking-wide text-slate-300">{comboCount === 1 ? "1 na coleção" : `${comboCount} na coleção`}</span>
                                                            </div>
                                                        ) : null}
                                                    </CardArtwork>
                                                    {isMissing && !isSubmittingThis ? <span className="pointer-events-none absolute inset-0 rounded-[3px] bg-black/25" aria-hidden="true" /> : null}
                                                    {isSubmittingThis ? (
                                                        <span className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center" aria-hidden="true">
                                                            <PokeballLoader size="sm" />
                                                        </span>
                                                    ) : null}
                                                    {confirmTokens[card.id] ? (
                                                        <span key={confirmTokens[card.id]} className="card-add-confirm-overlay pointer-events-none absolute inset-0 z-40 flex items-center justify-center rounded-[inherit] bg-black/40" aria-hidden="true">
                                                            <span className="card-add-confirm-ring absolute h-12 w-12 rounded-full border-2 border-poke-blue" />
                                                            <span className="card-add-confirm-check flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-poke-blue text-white shadow-lg shadow-poke-blue/40">
                                                                <Check size={24} strokeWidth={3} />
                                                            </span>
                                                        </span>
                                                    ) : null}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div ref={sentinelRef} className="flex min-h-8 items-center justify-center py-4">
                                {loadingMore && <PokeballLoader message="Carregando mais cartas..." size="sm" />}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {deleteModalTarget && (
                <div
                    className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Confirmar exclusão da carta"
                    onClick={(e) => {
                        if (e.target === e.currentTarget && !isDeleting) setDeleteModalTarget(null);
                    }}
                >
                    <div className="modal-surface flex w-full max-w-md flex-col gap-4 overflow-hidden rounded-2xl border border-red-500/30 bg-[#141722] p-6 shadow-2xl">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/15 text-red-400">
                                <Trash2 size={22} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white">Excluir carta da coleção?</h3>
                                <p className="text-xs text-slate-400">Esta ação não poderá ser desfeita.</p>
                            </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                            Tem certeza que deseja excluir <strong>{deleteModalTarget.name}</strong> ({LANGUAGE_SHORT_LABELS[lang]} · {formatVariantLabel(variant)} · {condition}) da sua coleção?
                        </p>

                        <div className="mt-2 flex items-center justify-end gap-3">
                            <button type="button" onClick={() => setDeleteModalTarget(null)} disabled={isDeleting} className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 disabled:opacity-50">
                                Cancelar
                            </button>

                            <button type="button" onClick={handleConfirmDelete} disabled={isDeleting} className="flex cursor-pointer items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500 disabled:opacity-50">
                                {isDeleting && <Loader2 size={14} className="animate-spin" />}
                                <span>Sim, excluir</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
