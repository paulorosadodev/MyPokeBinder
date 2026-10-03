"use client";

import { useState, useEffect, useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { SearchCardItem, CardLanguage, CardVariant, CardCondition, UserCard, SearchResponse } from "@/types/binder";
import { formatTcgdexImageUrl } from "@/lib/pokemon/tcgdex";
import { RARITY_FILTER_OPTIONS } from "@/lib/pokemon/rarity";
import { formatVariantLabel, resolveCardShine, VARIANT_SLIDER_OPTIONS, VARIANT_SELECT_OPTIONS } from "@/lib/pokemon/variant";
import { CONDITION_SLIDER_OPTIONS, CONDITION_SELECT_OPTIONS } from "@/lib/pokemon/condition";
import { ALL_EXPANSIONS_FILTER, ALL_ARTISTS_FILTER, COLLECTION_PAGE_SIZE, buildExpansionFilterOptions, buildArtistFilterOptions, filterCatalogCards } from "@/lib/collection/listCards";
import { countCopiesForCombo, mergeCopyCounts, registerCopy, totalCopies, type CopyCounts } from "@/lib/collection/copyCounts";
import { useInfiniteScroll } from "@/lib/hooks/useInfiniteScroll";
import { PokeballLoader } from "@/components/loading/PokeballLoader";
import { CardGridSkeleton } from "@/components/loading/CardGridSkeleton";
import { LanguageSlider, type LanguageSliderOption } from "@/components/ui/LanguageSlider";
import { FlagIcon } from "@/components/ui/FlagIcon";
import { Select, type SelectOption } from "@/components/ui/Select";
import { CardArtwork } from "@/components/ui/CardArtwork";
import { CardBadgeStack } from "@/components/ui/CardBadgeStack";
import { Spinner } from "@/components/ui/Spinner";
import { ModalSearchFilters } from "@/components/ui/ModalSearchFilters";
import { getCardAppearProps } from "@/lib/ui/cardAppear";
import { useDismissibleOverlay } from "@/lib/hooks/useDismissibleOverlay";
import { useOverlayPresence } from "@/lib/hooks/useOverlayPresence";
import { toast } from "sonner";
import { ArrowLeft, X, Search, Check, Sparkles, Gem, Layers, Palette } from "lucide-react";

interface CardSearchModalProps {
    isOpen: boolean;
    hasOpenSibling?: boolean;
    skipEnterAnimation?: boolean;
    dexId?: number | null;
    pokemonName?: string;
    onClose: () => void;
    onBack?: () => void;
    onCardAdded: (newCard: UserCard) => void;
}

const clientSearchCache = new Map<string, SearchResponse>();

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

export function CardSearchModal({ isOpen, hasOpenSibling = false, skipEnterAnimation = false, dexId, pokemonName, onClose, onBack, onCardAdded }: CardSearchModalProps) {
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
    const [isInitialOwnershipLoading, setIsInitialOwnershipLoading] = useState(false);
    const [pendingArtworkIds, setPendingArtworkIds] = useState<Set<string>>(() => new Set());
    const [scrollRoot, setScrollRoot] = useState<HTMLDivElement | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [rarityFilter, setRarityFilter] = useState("all");
    const [expansionFilter, setExpansionFilter] = useState(ALL_EXPANSIONS_FILTER);
    const [artistFilter, setArtistFilter] = useState(ALL_ARTISTS_FILTER);
    const [showFilters, setShowFilters] = useState(false);
    const submittingIdsRef = useRef<Set<string>>(new Set());
    const sessionCountsRef = useRef<CopyCounts>({});
    const fetchedOwnershipIdsRef = useRef<Set<string>>(new Set());
    const isAnySubmitting = submittingIds.length > 0;
    const setInitialCards = useCallback((nextCards: SearchCardItem[]) => {
        setCards(nextCards);
        setPendingArtworkIds(new Set(nextCards.map((card) => card.id)));
    }, []);
    const handleInitialArtworkLoaded = useCallback((cardId: string) => {
        setPendingArtworkIds((previous) => {
            if (!previous.has(cardId)) return previous;
            const next = new Set(previous);
            next.delete(cardId);
            return next;
        });
    }, []);

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
        if (isOpen) {
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
            fetchedOwnershipIdsRef.current = new Set();
            setPendingArtworkIds(new Set());
            if (!pokemonName) {
                setCards([]);
                setHasMore(false);
                setInitialLoading(false);
            }
        }
    }, [isOpen, pokemonName]);

    useEffect(() => {
        if (!isOpen || !pokemonName) return;

        let isMounted = true;
        async function loadFirstPage() {
            try {
                const queryName = pokemonName!.replace(/[♀♂]/g, "").trim();
                const cacheKey = `${dexId ?? 0}_${queryName}_page_1`;
                const cached = clientSearchCache.get(cacheKey);

                if (cached) {
                    const cachedCards = cached.cards ?? [];
                    setInitialCards(cachedCards);
                    setHasMore(cached.hasMore ?? false);
                    setPage(1);
                    setError(null);
                    setInitialLoading(false);
                    if (cachedCards.length === 0) setIsInitialOwnershipLoading(false);
                    return;
                }

                setInitialLoading(true);
                setError(null);
                setPage(1);

                const dexParam = dexId ? `&dexId=${dexId}` : "";
                const res = await fetch(`/api/search?name=${encodeURIComponent(queryName)}${dexParam}&page=1&pageSize=${COLLECTION_PAGE_SIZE}`);
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
                    if (nextCards.length === 0) setIsInitialOwnershipLoading(false);
                }
            } catch (err: unknown) {
                if (isMounted) {
                    const msg = err instanceof Error ? err.message : "Falha na busca";
                    setError(msg);
                    setCards([]);
                    setHasMore(false);
                    setIsInitialOwnershipLoading(false);
                    setPendingArtworkIds(new Set());
                }
            } finally {
                if (isMounted) {
                    setInitialLoading(false);
                }
            }
        }

        loadFirstPage();
        return () => {
            isMounted = false;
        };
    }, [isOpen, pokemonName, dexId, setInitialCards]);

    useEffect(() => {
        if (!isOpen || pokemonName) return;

        const term = searchTerm.trim();
        if (!term) {
            setCards([]);
            setHasMore(false);
            setInitialLoading(false);
            setIsInitialOwnershipLoading(false);
            setPendingArtworkIds(new Set());
            return;
        }

        let isMounted = true;
        const timer = setTimeout(async () => {
            try {
                setIsInitialOwnershipLoading(true);
                setPendingArtworkIds(new Set());
                const cacheKey = `catalog_${term}_page_1`;
                const cached = clientSearchCache.get(cacheKey);

                if (cached) {
                    const cachedCards = cached.cards ?? [];
                    setInitialCards(cachedCards);
                    setHasMore(cached.hasMore ?? false);
                    setPage(1);
                    setError(null);
                    setInitialLoading(false);
                    if (cachedCards.length === 0) setIsInitialOwnershipLoading(false);
                    return;
                }

                setInitialLoading(true);
                setError(null);
                setPage(1);

                const res = await fetch(`/api/search?name=${encodeURIComponent(term)}&page=1&pageSize=${COLLECTION_PAGE_SIZE}`);
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
                    if (nextCards.length === 0) setIsInitialOwnershipLoading(false);
                }
            } catch (err: unknown) {
                if (isMounted) {
                    const msg = err instanceof Error ? err.message : "Falha na busca";
                    setError(msg);
                    setCards([]);
                    setHasMore(false);
                    setIsInitialOwnershipLoading(false);
                    setPendingArtworkIds(new Set());
                }
            } finally {
                if (isMounted) {
                    setInitialLoading(false);
                }
            }
        }, 300);

        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, [isOpen, pokemonName, searchTerm, setInitialCards]);

    useEffect(() => {
        if (!isOpen || cards.length === 0) return;

        const pendingIds = Array.from(new Set(cards.map((card) => card.id))).filter((id) => !fetchedOwnershipIdsRef.current.has(id));
        if (pendingIds.length === 0) return;
        for (const id of pendingIds) fetchedOwnershipIdsRef.current.add(id);

        let isMounted = true;

        const loadOwnership = async () => {
            const collected: CopyCounts = {};

            for (let index = 0; index < pendingIds.length; index += OWNERSHIP_CHUNK_SIZE) {
                const chunk = pendingIds.slice(index, index + OWNERSHIP_CHUNK_SIZE);
                try {
                    const res = await fetch(`/api/cards/ownership?ids=${encodeURIComponent(chunk.join(","))}`);
                    if (!res.ok) continue;
                    const data = (await res.json()) as { counts?: CopyCounts };
                    Object.assign(collected, data.counts ?? {});
                } catch {}
            }

            if (!isMounted) return;
            setOwnedCardIds((previous) => new Set([...previous, ...pendingIds]));
            if (Object.keys(collected).length > 0) {
                setOwnedCounts((previous) => mergeCopyCounts(previous, collected));
            }
            setIsInitialOwnershipLoading(false);
        };

        void loadOwnership();
        return () => {
            isMounted = false;
        };
    }, [isOpen, cards]);

    const loadNextPage = useCallback(async () => {
        if (loadingMore || initialLoading || !hasMore) return;

        const effectiveQuery = pokemonName ? pokemonName.replace(/[♀♂]/g, "").trim() : searchTerm.trim();
        if (!effectiveQuery) return;

        try {
            setLoadingMore(true);
            const nextPage = page + 1;
            const cacheKey = pokemonName ? `${dexId ?? 0}_${effectiveQuery}_page_${nextPage}` : `catalog_${effectiveQuery}_page_${nextPage}`;
            const cached = clientSearchCache.get(cacheKey);

            if (cached) {
                setCards((prev) => [...prev, ...(cached.cards ?? [])]);
                setPage(nextPage);
                setHasMore(cached.hasMore ?? false);
                setLoadingMore(false);
                return;
            }

            const dexParam = pokemonName && dexId ? `&dexId=${dexId}` : "";
            const res = await fetch(`/api/search?name=${encodeURIComponent(effectiveQuery)}${dexParam}&page=${nextPage}&pageSize=${COLLECTION_PAGE_SIZE}`);
            const data: SearchResponse = await res.json();

            if (!res.ok) {
                const errorMsg = (data as unknown as { error?: string }).error || "Erro ao carregar mais cartas";
                throw new Error(errorMsg);
            }

            clientSearchCache.set(cacheKey, data);

            setCards((prev) => [...prev, ...(data.cards ?? [])]);
            setPage(nextPage);
            setHasMore(data.hasMore ?? false);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Falha ao carregar mais cartas";
            setError(msg);
        } finally {
            setLoadingMore(false);
        }
    }, [page, hasMore, loadingMore, initialLoading, pokemonName, dexId, searchTerm]);

    const filteredCards = useMemo(
        () =>
            filterCatalogCards(cards, {
                searchTerm: pokemonName ? searchTerm : "",
                rarityFilter,
                expansionFilter,
                artistFilter,
                dexId: dexId ?? undefined,
            }),
        [cards, searchTerm, rarityFilter, expansionFilter, artistFilter, dexId, pokemonName],
    );
    const expansionOptions = useMemo(() => buildExpansionFilterOptions(cards.map((card) => card.setName)), [cards]);
    const artistOptions = useMemo(() => buildArtistFilterOptions(cards.map((card) => card.artist)), [cards]);
    const hasActiveCatalogFilters = Boolean(searchTerm.trim()) || rarityFilter !== "all" || expansionFilter !== ALL_EXPANSIONS_FILTER || artistFilter !== ALL_ARTISTS_FILTER;
    const totalCopiesByCard = useMemo(() => mergeCopyCounts(ownedCounts, sessionCounts), [ownedCounts, sessionCounts]);
    const isCatalogGridLoading = initialLoading || isInitialOwnershipLoading || pendingArtworkIds.size > 0;

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

            onCardAdded(data.card);

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
                    <ModalSearchFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} showFilters={showFilters} onToggleFilters={() => setShowFilters((prev) => !prev)} activeFilterCount={activeFilterCount} filterButtonAriaLabel="Alternar filtros de raridade, expansão e ilustrador">
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
                    {cards.length === 0 && isCatalogGridLoading ? (
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
                                <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                    {filteredCards.map((card, index) => {
                                        const isSubmittingThis = submittingIds.includes(card.id);
                                        const comboCount = countCopiesForCombo(totalCopiesByCard, card.id, lang, variant, condition);
                                        const isOwnershipKnown = ownedCardIds.has(card.id);
                                        const isMissing = isOwnershipKnown && comboCount === 0;
                                        const selectionLabel = `${LANGUAGE_SHORT_LABELS[lang]} · ${formatVariantLabel(variant)} · ${condition}`;
                                        const ownershipLabel = comboCount > 0 ? `você já tem ${comboCount === 1 ? "1 exemplar" : `${comboCount} exemplares`} nesta configuração` : null;
                                        const appear = getCardAppearProps(index);
                                        const shineMode = resolveCardShine(variant, card.rarity, card.image, card.name);
                                        const imageSrc = formatTcgdexImageUrl(card.image);

                                        return (
                                            <button
                                                key={card.id}
                                                type="button"
                                                data-missing={isMissing ? "true" : undefined}
                                                disabled={isSubmittingThis}
                                                onClick={() => handleAddCard(card)}
                                                aria-label={ownershipLabel ? `Adicionar mais 1 cópia de ${card.name} (${selectionLabel}) à Coleção — ${ownershipLabel}` : `Adicionar ${card.name} (${selectionLabel}) à Coleção`}
                                                title={ownershipLabel ? `Adicionar mais 1 cópia idêntica de ${card.name} (${selectionLabel}) à Coleção — ${ownershipLabel}` : `Adicionar ${card.name} (${selectionLabel}) à Coleção`}
                                                className={`group relative isolate block aspect-[8/11] w-full cursor-pointer text-left transition-opacity duration-200 disabled:cursor-wait disabled:opacity-60 ${isMissing && !isSubmittingThis ? "opacity-60 saturate-50 hover:opacity-90" : ""}`}
                                            >
                                                <span className={`block h-full w-full ${appear.className}`} style={appear.style}>
                                                    <CardArtwork src={imageSrc} alt="" sizes="(max-width: 768px) 50vw, 200px" shineMode={shineMode} elementTypes={card.types} enableTouch onImageLoaded={() => handleInitialArtworkLoaded(card.id)}>
                                                        {comboCount > 1 && !isSubmittingThis ? <CardBadgeStack count={comboCount} includeCondition={false} includeLanguage={false} countDataAttribute="matching" /> : null}
                                                    </CardArtwork>
                                                    {isMissing && !isSubmittingThis ? <span className="pointer-events-none absolute inset-0 rounded-[3px] bg-black/25" aria-hidden="true" /> : null}
                                                    {isSubmittingThis ? (
                                                        <span className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center" aria-hidden="true">
                                                            <Spinner size={18} className="text-white" />
                                                        </span>
                                                    ) : null}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                                {isCatalogGridLoading ? (
                                    <div className="absolute inset-0 z-30 bg-[#12151d]">
                                        <CardGridSkeleton count={filteredCards.length} gridClassName="grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5" />
                                    </div>
                                ) : null}
                            </div>

                            <div ref={sentinelRef} className="flex min-h-8 items-center justify-center">
                                {loadingMore && (
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <Spinner size={16} />
                                        <span>Carregando mais cartas...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
