"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";
import { PokeballLoader } from "@/components/loading/PokeballLoader";
import { CollectionGridSkeleton } from "@/components/loading/CollectionGridSkeleton";
import { FlagIcon } from "@/components/ui/FlagIcon";
import { SearchInput } from "@/components/ui/SearchInput";
import { CardArtwork } from "@/components/ui/CardArtwork";
import { CardBadgeStack } from "@/components/ui/CardBadgeStack";
import { CardBadgeVisibilityToggle } from "@/components/ui/CardBadgeVisibilityToggle";
import { Select, SelectOption } from "@/components/ui/Select";
import { CardSearchModal } from "@/components/modal/CardSearchModal";
import { formatTcgdexImageUrl } from "@/lib/pokemon/tcgdex";
import { RARITY_FILTER_OPTIONS } from "@/lib/pokemon/rarity";
import { resolveCardShine, VARIANT_FILTER_OPTIONS } from "@/lib/pokemon/variant";
import { resolveCardElementTypes } from "@/lib/pokemon/cardTypes";
import { formatConditionLabel } from "@/lib/pokemon/condition";
import { ALL_EXPANSIONS_FILTER, ALL_ARTISTS_FILTER, buildCollectionFilterResetKey, buildExpansionFilterOptions, buildArtistFilterOptions, type CollectionSortDirection, type CollectionSortField } from "@/lib/collection/listCards";
import { useInfiniteScroll } from "@/lib/hooks/useInfiniteScroll";
import { useCardBadgeVisibility } from "@/lib/hooks/useCardBadgeVisibility";
import { getCardAppearProps } from "@/lib/ui/cardAppear";
import { fetcher, useInfiniteCollectionGroups, useUserExpansions, useUserArtists } from "@/lib/swr";
import { ALL_CARD_VARIANTS } from "@/lib/pokemon/variant";
import { CardDetailsResponse, UserCard, BinderStatusFilter } from "@/types/binder";
import { Search, Plus, Sparkles, Gem, BookOpen, Layers, X, ArrowUpDown, ArrowUp, ArrowDown, Globe, SlidersHorizontal, Palette } from "lucide-react";

type SortField = CollectionSortField;
type SortDirection = CollectionSortDirection;

const STATUS_FILTER_OPTIONS: SelectOption<BinderStatusFilter>[] = [
    { value: "all", label: "Todas as cartas" },
    { value: "in_binder", label: "No Binder" },
    { value: "stored", label: "Guardadas" },
];

const LANGUAGE_FILTER_OPTIONS: SelectOption<string>[] = [
    { value: "all", label: "Todos os idiomas" },
    { value: "pt-br", label: "Português (PT-BR)", icon: <FlagIcon country="pt-br" /> },
    { value: "en", label: "Inglês (EN)", icon: <FlagIcon country="en" /> },
    { value: "ja", label: "Japonês (JA)", icon: <FlagIcon country="ja" /> },
];

const SORT_FIELD_OPTIONS: SelectOption<SortField>[] = [
    { value: "dex", label: "Pokédex" },
    { value: "name", label: "Nome" },
    { value: "recent", label: "Data de adição" },
];

export default function CollectionPage() {
    const router = useRouter();
    const { mutate: mutateGlobal, cache } = useSWRConfig();
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<BinderStatusFilter>("all");
    const [languageFilter, setLanguageFilter] = useState<string>("all");
    const [rarityFilter, setRarityFilter] = useState<string>("all");
    const [expansionFilter, setExpansionFilter] = useState<string>(ALL_EXPANSIONS_FILTER);
    const [artistFilter, setArtistFilter] = useState<string>(ALL_ARTISTS_FILTER);
    const [variantFilter, setVariantFilter] = useState<string>("all");
    const [sortField, setSortField] = useState<SortField>("recent");
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
    const [showFilters, setShowFilters] = useState(false);
    const { showCardBadges, setCardBadgeVisibility } = useCardBadgeVisibility();
    const isFiltersRestored = useRef(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 250);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (statusFilter !== "all") count++;
        if (languageFilter !== "all") count++;
        if (rarityFilter !== "all") count++;
        if (expansionFilter !== ALL_EXPANSIONS_FILTER) count++;
        if (artistFilter !== ALL_ARTISTS_FILTER) count++;
        if (variantFilter !== "all") count++;
        return count;
    }, [statusFilter, languageFilter, rarityFilter, expansionFilter, artistFilter, variantFilter]);

    useEffect(() => {
        try {
            const saved = sessionStorage.getItem("mypokebinder_collection_filters");
            if (saved) {
                const parsed = JSON.parse(saved);
                if (parsed.searchTerm) {
                    setSearchTerm(parsed.searchTerm);
                    setDebouncedSearchTerm(parsed.searchTerm);
                }
                if (parsed.statusFilter) setStatusFilter(parsed.statusFilter);
                if (parsed.languageFilter) setLanguageFilter(parsed.languageFilter);
                if (parsed.rarityFilter) setRarityFilter(parsed.rarityFilter);
                if (parsed.expansionFilter) setExpansionFilter(parsed.expansionFilter);
                if (parsed.artistFilter) setArtistFilter(parsed.artistFilter);
                if (parsed.variantFilter) setVariantFilter(parsed.variantFilter);
                if (parsed.sortField) setSortField(parsed.sortField);
                if (parsed.sortDirection) setSortDirection(parsed.sortDirection);
            }
        } catch {}
        isFiltersRestored.current = true;
    }, []);

    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const { expansions, mutate: mutateExpansions } = useUserExpansions();
    const expansionOptions = useMemo(() => buildExpansionFilterOptions(expansions), [expansions]);
    const { artists, mutate: mutateArtists } = useUserArtists();
    const artistOptions = useMemo(() => buildArtistFilterOptions(artists), [artists]);

    const { groups, total, isLoading, isLoadingMore, hasMore, loadMore, isError, mutate } = useInfiniteCollectionGroups({
        searchTerm: debouncedSearchTerm,
        statusFilter,
        languageFilter,
        rarityFilter,
        expansionFilter,
        artistFilter,
        variantFilter,
        sortField,
        sortDirection,
    });

    const visibleItems = groups;

    const filterResetKey = useMemo(
        () =>
            buildCollectionFilterResetKey({
                searchTerm: debouncedSearchTerm,
                statusFilter,
                languageFilter,
                rarityFilter,
                expansionFilter,
                artistFilter,
                variantFilter,
                sortField,
                sortDirection,
            }),
        [debouncedSearchTerm, statusFilter, languageFilter, rarityFilter, expansionFilter, artistFilter, variantFilter, sortField, sortDirection],
    );

    const sentinelRef = useInfiniteScroll({
        hasMore,
        onLoadMore: loadMore,
        enabled: !isLoading && visibleItems.length > 0,
    });

    useEffect(() => {
        if (!isFiltersRestored.current || typeof window === "undefined") return;
        try {
            sessionStorage.setItem(
                "mypokebinder_collection_filters",
                JSON.stringify({
                    searchTerm,
                    statusFilter,
                    languageFilter,
                    rarityFilter,
                    expansionFilter,
                    artistFilter,
                    variantFilter,
                    sortField,
                    sortDirection,
                }),
            );
        } catch {}
    }, [searchTerm, statusFilter, languageFilter, rarityFilter, expansionFilter, artistFilter, variantFilter, sortField, sortDirection]);

    const collectionRevalidateTimerRef = useRef<number | null>(null);
    const prefetchingCardsRef = useRef(new Set<string>());

    const scheduleCollectionRevalidation = () => {
        if (collectionRevalidateTimerRef.current !== null) window.clearTimeout(collectionRevalidateTimerRef.current);
        collectionRevalidateTimerRef.current = window.setTimeout(() => {
            collectionRevalidateTimerRef.current = null;
            void mutate();
            void mutateExpansions();
            void mutateArtists();
        }, 300);
    };

    useEffect(
        () => () => {
            if (collectionRevalidateTimerRef.current !== null) window.clearTimeout(collectionRevalidateTimerRef.current);
        },
        [],
    );

    const handleCardAdded = () => {
        scheduleCollectionRevalidation();
    };

    const prefetchCardDetails = (card: UserCard, copies: UserCard[]) => {
        const route = `/cards/${card.id}?from=collection`;
        const cacheKey = `/api/cards/${card.id}`;
        const cached = cache.get(cacheKey)?.data as CardDetailsResponse | undefined;

        router.prefetch(route);

        if (!cached) {
            void mutateGlobal(
                cacheKey,
                {
                    card,
                    copies,
                    availableVariants: ALL_CARD_VARIANTS,
                    allocation: null,
                } satisfies CardDetailsResponse,
                false,
            );
        }

        if (!cached && !prefetchingCardsRef.current.has(cacheKey)) {
            prefetchingCardsRef.current.add(cacheKey);
            void mutateGlobal(cacheKey, fetcher<CardDetailsResponse>(cacheKey), { revalidate: false })
                .catch(() => undefined)
                .finally(() => prefetchingCardsRef.current.delete(cacheKey));
        }
    };

    return (
        <div className="flex min-h-screen flex-col">
            <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Minha Coleção</h1>
                    </div>

                    <button type="button" onClick={() => setIsSearchModalOpen(true)} className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-poke-blue px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90">
                        <Plus size={18} />
                        <span>Adicionar Carta</span>
                    </button>
                </div>

                <div className={`relative z-30 flex flex-col ${showFilters ? "gap-2.5 sm:gap-3" : "gap-0"} rounded-2xl border border-white/10 bg-[#121520]/80 p-2.5 shadow-xl backdrop-blur-md transition-all sm:p-3.5`}>
                    <div className="flex items-center gap-2">
                        <div className="relative min-w-0 flex-1">
                            <Search size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-500 z-20 sm:left-3.5 sm:h-4 sm:w-4" />
                            <SearchInput
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={isMobile ? "Buscar cartas..." : "Buscar por pokémon, número, coleção ou pokédex..."}
                                placeholderClassName="left-8.5 right-8 text-xs sm:left-10 sm:right-9 sm:text-sm"
                                className="w-full h-9 sm:h-10 rounded-xl border border-white/10 bg-white/5 py-2 sm:py-2.5 pr-8 sm:pr-9 pl-8.5 sm:pl-10 text-xs sm:text-sm text-white transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none"
                            />
                            {searchTerm && (
                                <button type="button" onClick={() => setSearchTerm("")} aria-label="Limpar busca" className="absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-500 hover:text-white z-20 sm:right-3">
                                    <X size={14} className="sm:h-[15px] sm:w-[15px]" />
                                </button>
                            )}
                        </div>

                        <button type="button" onClick={() => setShowFilters((prev) => !prev)} aria-label="Alternar filtros" aria-expanded={showFilters} className={`flex h-9 sm:h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border px-2.5 sm:px-3 text-xs font-semibold transition-colors ${showFilters || activeFilterCount > 0 ? "border-poke-blue/60 bg-poke-blue/20 text-white" : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"}`}>
                            <SlidersHorizontal size={13} className={activeFilterCount > 0 ? "text-poke-blue" : "text-slate-400"} />
                            <span className="inline">Filtros</span>
                            {activeFilterCount > 0 && <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-poke-blue px-1 text-[10px] font-bold text-white">{activeFilterCount}</span>}
                        </button>

                        <CardBadgeVisibilityToggle showBadges={showCardBadges} onChange={setCardBadgeVisibility} />
                    </div>

                    <div className={`grid transition-all duration-300 ease-in-out ${showFilters ? "grid-rows-[1fr] opacity-100 border-t border-white/10 pt-3" : "grid-rows-[0fr] opacity-0 border-t-0 pt-0 pointer-events-none"}`}>
                        <div className="overflow-hidden">
                            <div className="grid w-full grid-cols-2 gap-1.5 lg:grid-cols-4 lg:gap-2.5">
                                <Select<BinderStatusFilter> value={statusFilter} onChange={setStatusFilter} options={STATUS_FILTER_OPTIONS} icon={<BookOpen size={13} />} ariaLabel="Filtrar coleção por status no binder" className="w-full min-w-0" size="sm" />
                                <Select<string> value={languageFilter} onChange={setLanguageFilter} options={LANGUAGE_FILTER_OPTIONS} icon={<Globe size={13} />} ariaLabel="Filtrar coleção por idioma da carta" className="w-full min-w-0" menuClassName="sm:left-0 sm:right-auto" align="right" size="sm" />
                                <Select<string> value={rarityFilter} onChange={setRarityFilter} options={RARITY_FILTER_OPTIONS} icon={<Gem size={13} />} ariaLabel="Filtrar coleção por raridade" className="w-full min-w-0" size="sm" />
                                <Select<string> value={variantFilter} onChange={setVariantFilter} options={VARIANT_FILTER_OPTIONS} icon={<Sparkles size={13} />} ariaLabel="Filtrar coleção por versão" className="w-full min-w-0" size="sm" />
                                <Select<string> value={expansionFilter} onChange={setExpansionFilter} options={expansionOptions} icon={<Layers size={13} />} ariaLabel="Filtrar coleção por expansão" className="w-full min-w-0" size="sm" />
                                <Select<string> value={artistFilter} onChange={setArtistFilter} options={artistOptions} icon={<Palette size={13} />} ariaLabel="Filtrar coleção por ilustrador" className="w-full min-w-0" size="sm" />

                                <div className="col-span-2 flex w-full min-w-0 items-center gap-1.5 lg:col-span-2">
                                    <Select<SortField> value={sortField} onChange={setSortField} options={SORT_FIELD_OPTIONS} icon={<ArrowUpDown size={13} />} ariaLabel="Ordenar coleção" className="flex-1 min-w-0" size="sm" align="right" />
                                    <button
                                        type="button"
                                        onClick={() => setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))}
                                        aria-label={sortDirection === "asc" ? "Ordem crescente. Clique para inverter para decrescente." : "Ordem decrescente. Clique para inverter para crescente."}
                                        title={sortDirection === "asc" ? "Crescente (Clique para inverter)" : "Decrescente (Clique para inverter)"}
                                        className="flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg sm:rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-poke-blue/50 hover:bg-white/10 hover:text-white active:scale-95"
                                    >
                                        {sortDirection === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <CollectionGridSkeleton count={18} />
                ) : isError ? (
                    <div className="flex h-96 flex-col items-center justify-center gap-4 text-center">
                        <p className="text-sm text-red-300">Falha ao carregar suas cartas.</p>
                        <button type="button" onClick={() => mutate()} className="rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20">
                            Tentar novamente
                        </button>
                    </div>
                ) : total === 0 && !activeFilterCount && !debouncedSearchTerm.trim() ? (
                    <div className="profile-enter profile-enter-d2 flex h-64 flex-col items-center justify-center gap-3 text-center">
                        <Layers size={32} className="text-slate-600" />
                        <div>
                            <p className="text-sm font-semibold text-white">Sua coleção está vazia</p>
                            <p className="mt-1 text-xs text-slate-400">Comece a adicionar cartas físicas para acompanhar seus Pokémon.</p>
                        </div>
                        <button type="button" onClick={() => setIsSearchModalOpen(true)} className="mt-2 flex cursor-pointer items-center gap-2 rounded-xl bg-poke-blue px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-opacity hover:opacity-90">
                            <Plus size={16} />
                            <span>Adicionar primeira carta</span>
                        </button>
                    </div>
                ) : visibleItems.length === 0 ? (
                    <div className="profile-enter profile-enter-d2 flex h-64 flex-col items-center justify-center gap-3 text-center">
                        <Search size={32} className="text-slate-600" />
                        <div>
                            <p className="text-sm font-semibold text-white">Nenhuma carta encontrada</p>
                            <p className="mt-1 text-xs text-slate-400">Tente ajustar seus termos de busca ou filtros.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setSearchTerm("");
                                setDebouncedSearchTerm("");
                                setStatusFilter("all");
                                setLanguageFilter("all");
                                setRarityFilter("all");
                                setExpansionFilter(ALL_EXPANSIONS_FILTER);
                                setArtistFilter(ALL_ARTISTS_FILTER);
                                setSortField("recent");
                                setSortDirection("desc");
                                setShowFilters(false);
                                if (typeof window !== "undefined") {
                                    sessionStorage.removeItem("mypokebinder_collection_filters");
                                }
                            }}
                            className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            Limpar filtros
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <div key={filterResetKey} className="relative z-0 isolate grid grid-cols-3 gap-2 auto-rows-fr sm:grid-cols-3 sm:gap-3.5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                            {visibleItems.map((group, index) => {
                                const card = group.card;
                                const appear = getCardAppearProps(index);
                                const imageSrc = formatTcgdexImageUrl(card.card_image_url);
                                const shineMode = resolveCardShine(card.card_variant, card.card_rarity, card.card_image_url, card.card_name);
                                const elementTypes = resolveCardElementTypes(card.card_types, card.pokemon_dex_id);
                                const conditionLabel = card.card_condition ? formatConditionLabel(card.card_condition) : null;
                                const countLabel = group.totalCount > 1 ? `${group.totalCount} cópias idênticas` : null;
                                const languageLabel = card.card_language === "pt-br" ? "PT-BR" : card.card_language.toUpperCase();

                                return (
                                    <NextLink
                                        key={`${filterResetKey}-${group.key}`}
                                        href={`/cards/${card.id}?from=collection`}
                                        prefetch={true}
                                        onPointerEnter={() => prefetchCardDetails(card, group.copies)}
                                        onPointerDown={() => prefetchCardDetails(card, group.copies)}
                                        onFocus={() => prefetchCardDetails(card, group.copies)}
                                        aria-label={`Editar carta ${card.card_name}${conditionLabel ? `, condição ${conditionLabel}` : ""}${countLabel ? `, ${countLabel}` : ""}, idioma ${languageLabel}`}
                                        className={`group relative isolate block aspect-[8/11] w-full cursor-pointer transition-colors duration-200 ${appear.className}`}
                                        style={appear.style}
                                    >
                                        <CardArtwork src={imageSrc} alt={card.card_name} sizes="(max-width: 640px) 30vw, (max-width: 768px) 33vw, 200px" shineMode={shineMode} elementTypes={elementTypes} priority={index === 0}>
                                            {showCardBadges ? <CardBadgeStack condition={card.card_condition} count={group.totalCount} language={card.card_language} /> : null}
                                        </CardArtwork>
                                    </NextLink>
                                );
                            })}
                        </div>

                        {isLoadingMore && (
                            <div className="flex justify-center py-4">
                                <PokeballLoader message="Carregando mais cartas..." size="sm" />
                            </div>
                        )}

                        <div ref={sentinelRef} className="flex min-h-8 items-center justify-center" aria-hidden={!hasMore} />
                    </div>
                )}
            </main>

            <CardSearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} onCardAdded={handleCardAdded} />
        </div>
    );
}
