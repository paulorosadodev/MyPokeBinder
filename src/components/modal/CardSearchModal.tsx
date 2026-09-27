"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { SearchCardItem, CardLanguage, CardVariant, UserCard, SearchResponse } from "@/types/binder";
import { formatTcgdexImageUrl } from "@/lib/pokemon/tcgdex";
import { getRarityBadgeStyle, RARITY_FILTER_OPTIONS } from "@/lib/pokemon/rarity";
import { formatVariantLabel, resolveCardShine, VARIANT_SLIDER_OPTIONS, VARIANT_SELECT_OPTIONS } from "@/lib/pokemon/variant";
import { ALL_EXPANSIONS_FILTER, COLLECTION_PAGE_SIZE, buildExpansionFilterOptions, filterCatalogCards } from "@/lib/collection/listCards";
import { useInfiniteScroll } from "@/lib/hooks/useInfiniteScroll";
import { PokeballLoader } from "@/components/loading/PokeballLoader";
import { LanguageSlider, type LanguageSliderOption } from "@/components/ui/LanguageSlider";
import { FlagIcon } from "@/components/ui/FlagIcon";
import { Select, type SelectOption } from "@/components/ui/Select";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { Spinner } from "@/components/ui/Spinner";
import { ModalSearchFilters } from "@/components/ui/ModalSearchFilters";
import { getCardAppearProps } from "@/lib/ui/cardAppear";
import { toast } from "sonner";
import { X, Search, Plus, Circle, Sparkles, RefreshCw, Layers, Globe } from "lucide-react";

interface CardSearchModalProps {
    isOpen: boolean;
    dexId: number;
    pokemonName: string;
    onClose: () => void;
    onCardAdded: (newCard: UserCard) => void;
}

const clientSearchCache = new Map<string, SearchResponse>();

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

export function CardSearchModal({ isOpen, dexId, pokemonName, onClose, onCardAdded }: CardSearchModalProps) {
    const [lang, setLang] = useState<CardLanguage>("pt-br");
    const [variant, setVariant] = useState<CardVariant>("normal");
    const [cards, setCards] = useState<SearchCardItem[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [initialLoading, setInitialLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submittingCardId, setSubmittingCardId] = useState<string | null>(null);
    const [scrollRoot, setScrollRoot] = useState<HTMLDivElement | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [rarityFilter, setRarityFilter] = useState("all");
    const [expansionFilter, setExpansionFilter] = useState(ALL_EXPANSIONS_FILTER);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setLang("pt-br");
            setVariant("normal");
            setSearchTerm("");
            setRarityFilter("all");
            setExpansionFilter(ALL_EXPANSIONS_FILTER);
            setShowFilters(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        let isMounted = true;
        async function loadFirstPage() {
            try {
                const queryName = pokemonName.replace(/[♀♂]/g, "").trim();
                const cacheKey = `${dexId}_${queryName}_page_1`;
                const cached = clientSearchCache.get(cacheKey);

                if (cached) {
                    setCards(cached.cards ?? []);
                    setHasMore(cached.hasMore ?? false);
                    setPage(1);
                    setError(null);
                    setInitialLoading(false);
                    return;
                }

                setInitialLoading(true);
                setError(null);
                setSubmittingCardId(null);
                setPage(1);

                const res = await fetch(`/api/search?name=${encodeURIComponent(queryName)}&dexId=${dexId}&page=1&pageSize=${COLLECTION_PAGE_SIZE}`);
                const data: SearchResponse = await res.json();

                if (!res.ok) {
                    const errorMsg = (data as unknown as { error?: string }).error || "Erro ao buscar cartas";
                    throw new Error(errorMsg);
                }

                clientSearchCache.set(cacheKey, data);

                if (isMounted) {
                    setCards(data.cards ?? []);
                    setHasMore(data.hasMore ?? false);
                }
            } catch (err: unknown) {
                if (isMounted) {
                    const msg = err instanceof Error ? err.message : "Falha na busca";
                    setError(msg);
                    setCards([]);
                    setHasMore(false);
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
    }, [isOpen, pokemonName, dexId]);

    const loadNextPage = useCallback(async () => {
        if (loadingMore || initialLoading || !hasMore) return;

        try {
            setLoadingMore(true);
            const nextPage = page + 1;
            const queryName = pokemonName.replace(/[♀♂]/g, "").trim();
            const cacheKey = `${dexId}_${queryName}_page_${nextPage}`;
            const cached = clientSearchCache.get(cacheKey);

            if (cached) {
                setCards((prev) => [...prev, ...(cached.cards ?? [])]);
                setPage(nextPage);
                setHasMore(cached.hasMore ?? false);
                setLoadingMore(false);
                return;
            }

            const res = await fetch(`/api/search?name=${encodeURIComponent(queryName)}&dexId=${dexId}&page=${nextPage}&pageSize=${COLLECTION_PAGE_SIZE}`);
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
    }, [page, hasMore, loadingMore, initialLoading, pokemonName, dexId]);

    const filteredCards = useMemo(
        () =>
            filterCatalogCards(cards, {
                searchTerm,
                rarityFilter,
                expansionFilter,
                dexId,
            }),
        [cards, searchTerm, rarityFilter, expansionFilter, dexId],
    );
    const expansionOptions = useMemo(() => buildExpansionFilterOptions(cards.map((card) => card.setName)), [cards]);
    const hasActiveCatalogFilters = Boolean(searchTerm.trim()) || rarityFilter !== "all" || expansionFilter !== ALL_EXPANSIONS_FILTER;

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
        if (submittingCardId) return;

        try {
            setSubmittingCardId(card.id);
            setError(null);

            const res = await fetch("/api/cards", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tcgdex_card_id: card.id,
                    pokemon_dex_id: dexId,
                    card_name: card.name,
                    card_image_url: formatTcgdexImageUrl(card.image),
                    card_set_name: card.setName || "",
                    card_rarity: card.rarity || "",
                    card_language: lang,
                    card_variant: variant,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Erro ao adicionar carta");
            }

            onCardAdded(data.card);
            onClose();
            toast.success("Carta adicionada à Coleção!", {
                description: `${card.name} (${formatVariantLabel(variant)}) cadastrada com sucesso.`,
            });
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Erro ao adicionar";
            setError(msg);
            toast.error("Erro ao adicionar carta", {
                description: msg,
            });
        } finally {
            setSubmittingCardId(null);
        }
    };

    if (!isOpen) return null;

    const activeFilterCount = (rarityFilter !== "all" ? 1 : 0) + (expansionFilter !== ALL_EXPANSIONS_FILTER ? 1 : 0);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4 backdrop-blur-sm"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="flex h-[90vh] sm:h-[85vh] max-h-[820px] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#12151d] shadow-2xl md:max-w-5xl lg:max-w-6xl">
                <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-2.5 sm:px-6 sm:py-3.5">
                    <div>
                        <div className="flex items-center gap-2 sm:gap-2.5">
                            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">{pokemonName}</h2>
                            <span className="rounded-md border border-white/10 bg-white/10 px-2 py-0.5 font-mono text-[11px] sm:text-xs font-semibold text-slate-300">#{String(dexId).padStart(3, "0")}</span>
                        </div>
                        <p className="hidden sm:block mt-0.5 text-xs text-slate-400">Escolha o idioma e a versão física, depois adicione à coleção</p>
                    </div>

                    <button onClick={onClose} aria-label="Fechar" className="flex h-8 w-8 sm:h-9 sm:w-9 cursor-pointer items-center justify-center rounded-lg sm:rounded-xl bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white">
                        <X size={18} />
                    </button>
                </div>

                <div className="flex shrink-0 flex-col gap-2.5 border-b border-white/10 bg-black/20 px-3 py-2.5 sm:px-6 sm:py-3">
                    <ModalSearchFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} showFilters={showFilters} onToggleFilters={() => setShowFilters((prev) => !prev)} activeFilterCount={activeFilterCount} filterButtonAriaLabel="Alternar filtros de raridade e expansão">
                        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-2.5 pt-0.5">
                            <Select<string> value={rarityFilter} onChange={setRarityFilter} options={RARITY_FILTER_OPTIONS} icon={<Sparkles size={13} />} ariaLabel="Filtrar catálogo por raridade" className="w-full sm:w-44" size="sm" />
                            <Select<string> value={expansionFilter} onChange={setExpansionFilter} options={expansionOptions} icon={<Layers size={13} />} ariaLabel="Filtrar catálogo por expansão" className="w-full sm:w-56" size="sm" align="right" />
                        </div>
                    </ModalSearchFilters>

                    <div className="flex flex-col gap-1.5 sm:gap-2 border-t border-white/10 pt-2 sm:pt-2.5">
                        <div className="flex items-center gap-1.5 text-slate-400">
                            <Sparkles size={11} className="text-poke-blue shrink-0" />
                            <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-slate-300">Sua carta</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 sm:hidden">
                            <Select<CardLanguage> value={lang} onChange={setLang} options={LANGUAGE_SELECT_OPTIONS} ariaLabel="Idioma da carta a ser adicionada" size="sm" className="w-full" />
                            <Select<CardVariant> value={variant} onChange={setVariant} options={VARIANT_SELECT_OPTIONS} ariaLabel="Versão física da carta a ser adicionada" size="sm" className="w-full" />
                        </div>
                        <div className="hidden sm:grid sm:grid-cols-2 sm:gap-3">
                            <LanguageSlider value={lang} onChange={setLang} options={LANGUAGE_OPTIONS} size="sm" fullWidth ariaLabel="Idioma da carta a ser adicionada" />
                            <LanguageSlider<CardVariant> value={variant} onChange={setVariant} options={VARIANT_SLIDER_OPTIONS} size="sm" fullWidth ariaLabel="Versão física da carta a ser adicionada" />
                        </div>
                    </div>
                </div>

                {error && <div className="mx-4 sm:mx-6 mt-2.5 sm:mt-3 shrink-0 rounded-lg border border-red-500/30 bg-red-500/15 p-2.5 sm:p-3 text-xs text-red-200">{error}</div>}

                <div ref={setScrollRoot} className="flex-1 overflow-y-auto p-3 sm:p-6">
                    {initialLoading ? (
                        <div className="flex h-full min-h-[250px] flex-col items-center justify-center">
                            <PokeballLoader message="Carregando cartas..." size="md" />
                        </div>
                    ) : cards.length === 0 ? (
                        <div className="flex h-full min-h-[250px] flex-col items-center justify-center gap-2 text-slate-500">
                            <Search size={32} className="text-slate-600" />
                            <span className="text-sm">Nenhuma carta com imagem encontrada.</span>
                        </div>
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
                                }}
                                className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                Limpar filtros
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 sm:gap-6">
                            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                {filteredCards.map((card, index) => {
                                    const isSubmittingThis = submittingCardId === card.id;
                                    const appear = getCardAppearProps(index);
                                    const rarityInfo = card.rarity ? getRarityBadgeStyle(card.rarity) : null;
                                    const shineMode = resolveCardShine(variant, card.rarity);

                                    return (
                                        <div key={card.id} className={`group relative flex h-full flex-col justify-between gap-1.5 sm:gap-2 rounded-xl border p-2 sm:p-2.5 transition-all duration-200 ${isSubmittingThis ? "border-poke-blue bg-poke-blue/15 ring-2 ring-poke-blue/40" : "border-white/10 bg-white/[0.03] hover:border-poke-blue/50 hover:bg-white/[0.07]"} ${appear.className}`} style={appear.style}>
                                            <div className="relative aspect-[8/11] w-full shrink-0 cursor-pointer" onClick={() => handleAddCard(card)}>
                                                <Card3DTilt className="relative h-full w-full overflow-hidden rounded-lg" maxTilt={8} maxMove={3} scale={1} glareOpacity={0.2} perspective={900} shineMode={shineMode} enableTouch>
                                                    <Image src={formatTcgdexImageUrl(card.image)} alt={card.name} fill sizes="(max-width: 768px) 50vw, 200px" className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" unoptimized />
                                                </Card3DTilt>
                                            </div>

                                            <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5 sm:gap-1 py-0.5">
                                                <div className="flex h-4 items-center min-w-0">
                                                    <span className="truncate text-xs font-semibold text-white group-hover:text-poke-blue transition-colors" title={card.name}>
                                                        {card.name}
                                                    </span>
                                                </div>

                                                <div className="flex h-4 sm:h-5 items-center justify-between gap-1 min-w-0">
                                                    <span className="truncate text-[10px] sm:text-[11px] text-slate-400 min-w-0 flex-1" title={card.setName || "Coleção"}>
                                                        {card.setName || "Coleção"}
                                                    </span>

                                                    {rarityInfo && (
                                                        <span title={rarityInfo.label} className={`shrink-0 inline-flex items-center rounded px-1 sm:px-1.5 py-0.5 text-[8.5px] sm:text-[9px] font-semibold border max-w-[70px] sm:max-w-[95px] ${rarityInfo.badgeClasses}`}>
                                                            <span className="truncate">{rarityInfo.label}</span>
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddCard(card);
                                                }}
                                                disabled={Boolean(submittingCardId)}
                                                title={`Adicionar ${card.name} (${formatVariantLabel(variant)}) à Coleção`}
                                                className="mt-auto flex h-6.5 sm:h-7 w-full cursor-pointer items-center justify-center gap-1 rounded-md bg-white/10 px-1 text-[10.5px] sm:text-[11px] font-semibold text-white transition-colors hover:bg-poke-blue group-hover:bg-poke-blue disabled:opacity-60"
                                            >
                                                {isSubmittingThis ? <Spinner size={12} className="text-white" /> : <Plus size={12} className="shrink-0" />}
                                                <span className="whitespace-nowrap">Adicionar</span>
                                            </button>
                                        </div>
                                    );
                                })}
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
