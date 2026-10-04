"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSWRConfig } from "swr";
import { BinderStatusFilter, CardAllocation, UserCard } from "@/types/binder";
import { formatTcgdexImageUrl } from "@/lib/pokemon/tcgdex";
import { getPokemonSilhouetteUrl, markSilhouetteLoaded } from "@/lib/pokemon/constants";
import { useCollectionCards } from "@/lib/swr";
import { PokeballLoader } from "@/components/loading/PokeballLoader";
import { FlagIcon } from "@/components/ui/FlagIcon";
import { ModalSearchFilters } from "@/components/ui/ModalSearchFilters";
import { CardArtwork } from "@/components/ui/CardArtwork";
import { Select, type SelectOption } from "@/components/ui/Select";
import { getCardAppearProps } from "@/lib/ui/cardAppear";
import { ALL_CARD_VARIANTS, VARIANT_FILTER_OPTIONS, cardCopyGroupKey, resolveCardShine } from "@/lib/pokemon/variant";
import { RARITY_FILTER_OPTIONS } from "@/lib/pokemon/rarity";
import { ALL_EXPANSIONS_FILTER, ALL_ARTISTS_FILTER, CollectionSortDirection, CollectionSortField, buildExpansionFilterOptions, buildArtistFilterOptions, filterAndSortCollectionGroups } from "@/lib/collection/listCards";
import { isCardMatchingPokemon } from "@/lib/pokemon/match";
import { useDismissibleOverlay } from "@/lib/hooks/useDismissibleOverlay";
import { useOverlayPresence } from "@/lib/hooks/useOverlayPresence";
import { resolveCardElementTypes } from "@/lib/pokemon/cardTypes";
import { X, Sparkles, Gem, Search, Plus, BookOpen, Pencil, Loader2, Globe, Layers, ArrowUpDown, ArrowUp, ArrowDown, Palette } from "lucide-react";

interface BinderSlotSelectModalProps {
    isOpen: boolean;
    hasOpenSibling?: boolean;
    skipEnterAnimation?: boolean;
    dexId?: number;
    pokemonName: string;
    activeCardId?: string;
    activeCard?: UserCard;
    activeCardAllocation?: CardAllocation | null;
    targetCardId?: string;
    matchesDexIdExactly?: boolean;
    onlyUnallocatedCards?: boolean;
    title?: string;
    description?: string;
    editSearchParams?: Record<string, string | number | undefined>;
    onClose: () => void;
    onCardSelected: (card: UserCard) => boolean | void | Promise<boolean | void>;
    onCardRemoved?: (card: UserCard) => boolean | void | Promise<boolean | void>;
    onOpenCatalogSearch: () => void;
}

interface GroupedSlotCardItem {
    key: string;
    card: UserCard;
    totalCount: number;
    hasInBinder: boolean;
    activeCard: UserCard;
}

const LANGUAGE_FILTER_OPTIONS: SelectOption<string>[] = [
    { value: "all", label: "Todos os idiomas" },
    { value: "pt-br", label: "Português (PT-BR)", icon: <FlagIcon country="pt-br" /> },
    { value: "en", label: "Inglês (EN)", icon: <FlagIcon country="en" /> },
    { value: "ja", label: "Japonês (JA)", icon: <FlagIcon country="ja" /> },
];

const SORT_FIELD_OPTIONS: SelectOption<CollectionSortField>[] = [
    { value: "name", label: "Nome" },
    { value: "recent", label: "Data de adição" },
    { value: "dex", label: "Pokédex" },
];

export function BinderSlotSelectModal({ isOpen, hasOpenSibling = false, skipEnterAnimation = false, dexId, pokemonName, activeCardId, activeCard, activeCardAllocation, targetCardId, matchesDexIdExactly = false, onlyUnallocatedCards = false, title, description, editSearchParams, onClose, onCardSelected, onCardRemoved, onOpenCatalogSearch }: BinderSlotSelectModalProps) {
    const router = useRouter();
    const { mutate: mutateGlobal } = useSWRConfig();
    const { cards: collection, isLoading, mutate: mutateCollection } = useCollectionCards(isOpen ? dexId : null, isOpen && !dexId);

    const [selectedCardId, setSelectedCardId] = useState<string | undefined>(activeCardId);
    const [previewCard, setPreviewCard] = useState<UserCard | undefined>(activeCard);
    const [userDeselected, setUserDeselected] = useState(false);
    const [editingCardId, setEditingCardId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [languageFilter, setLanguageFilter] = useState("all");
    const [rarityFilter, setRarityFilter] = useState("all");
    const [variantFilter, setVariantFilter] = useState("all");
    const [expansionFilter, setExpansionFilter] = useState(ALL_EXPANSIONS_FILTER);
    const [artistFilter, setArtistFilter] = useState(ALL_ARTISTS_FILTER);
    const [sortField, setSortField] = useState<CollectionSortField>("name");
    const [sortDirection, setSortDirection] = useState<CollectionSortDirection>("asc");
    const [showFilters, setShowFilters] = useState(false);
    const [pendingActionId, setPendingActionId] = useState<string | null>(null);
    const wasOpenRef = useRef(false);

    useEffect(() => {
        if (isOpen && !wasOpenRef.current) {
            setSelectedCardId(activeCardId);
            setPreviewCard(activeCard);
            setUserDeselected(false);
            setEditingCardId(null);
            setSearchTerm("");
            setLanguageFilter("all");
            setRarityFilter("all");
            setVariantFilter("all");
            setExpansionFilter(ALL_EXPANSIONS_FILTER);
            setArtistFilter(ALL_ARTISTS_FILTER);
            setSortField("name");
            setSortDirection("asc");
            setShowFilters(false);
        } else if (!isOpen) {
            setSelectedCardId(undefined);
            setPreviewCard(undefined);
            setUserDeselected(false);
            setEditingCardId(null);
            setShowFilters(false);
            setPendingActionId(null);
        }
        wasOpenRef.current = isOpen;
    }, [isOpen, activeCardId, activeCard]);

    useDismissibleOverlay(isOpen, onClose, editingCardId !== null || pendingActionId !== null);
    const { isPresent, state } = useOverlayPresence(isOpen, { hasOpenSibling, skipEnterAnimation });

    const validCollection = useMemo(
        () =>
            collection.filter((card) => {
                if (dexId && (matchesDexIdExactly ? card.pokemon_dex_id !== dexId : !isCardMatchingPokemon(card.card_name, dexId))) return false;
                if (targetCardId && card.tcgdex_card_id !== targetCardId) return false;
                if (onlyUnallocatedCards && card.id !== activeCardId && card.id !== selectedCardId && card.is_in_binder) return false;
                return true;
            }),
        [activeCardId, selectedCardId, collection, dexId, matchesDexIdExactly, onlyUnallocatedCards, targetCardId],
    );

    useEffect(() => {
        if (!isOpen || userDeselected) return;
        if (selectedCardId && validCollection.length > 0) {
            const found = validCollection.find((c) => c.id === selectedCardId);
            if (!found) {
                setSelectedCardId(undefined);
                setPreviewCard(undefined);
            } else if (!previewCard) {
                setPreviewCard(found);
            }
            return;
        }
        if (!selectedCardId && !previewCard && validCollection.length > 0) {
            const inBinder = validCollection.find((c) => c.is_in_binder);
            if (inBinder) {
                setPreviewCard(inBinder);
                setSelectedCardId(inBinder.id);
            }
        }
    }, [isOpen, userDeselected, validCollection, previewCard, selectedCardId]);

    const groupedCards = useMemo(() => {
        const groupsMap = new Map<string, GroupedSlotCardItem>();

        validCollection.forEach((c) => {
            const groupKey = cardCopyGroupKey(c);
            const existing = groupsMap.get(groupKey);
            const isCardCurrent = c.id === selectedCardId;

            if (existing) {
                existing.totalCount += 1;
                if (isCardCurrent) {
                    existing.hasInBinder = true;
                    existing.activeCard = c;
                    existing.card = c;
                }
            } else {
                groupsMap.set(groupKey, {
                    key: groupKey,
                    card: c,
                    totalCount: 1,
                    hasInBinder: isCardCurrent,
                    activeCard: c,
                });
            }
        });

        return Array.from(groupsMap.values());
    }, [validCollection, selectedCardId]);

    const expansionOptions = useMemo(() => buildExpansionFilterOptions(validCollection.map((card) => card.card_set_name)), [validCollection]);
    const artistOptions = useMemo(() => buildArtistFilterOptions(validCollection.map((card) => card.card_artist)), [validCollection]);

    const filteredGroupedCards = useMemo(() => {
        const filtered = filterAndSortCollectionGroups(
            groupedCards.map((group) => ({
                key: group.key,
                card: group.card,
                copies: [group.card],
                totalCount: group.totalCount,
                hasInBinder: group.hasInBinder,
            })),
            {
                searchTerm,
                statusFilter: "all" as BinderStatusFilter,
                languageFilter,
                rarityFilter,
                expansionFilter,
                artistFilter,
                variantFilter,
                sortField,
                sortDirection,
            },
        );
        const originalByKey = new Map(groupedCards.map((group) => [group.key, group]));
        return filtered.flatMap((group) => {
            const original = originalByKey.get(group.key);
            return original ? [original] : [];
        });
    }, [groupedCards, searchTerm, languageFilter, rarityFilter, expansionFilter, artistFilter, variantFilter, sortField, sortDirection]);

    const hasActiveFilters = Boolean(searchTerm.trim()) || languageFilter !== "all" || rarityFilter !== "all" || variantFilter !== "all" || expansionFilter !== ALL_EXPANSIONS_FILTER || artistFilter !== ALL_ARTISTS_FILTER;
    const activeFilterCount = (languageFilter !== "all" ? 1 : 0) + (rarityFilter !== "all" ? 1 : 0) + (variantFilter !== "all" ? 1 : 0) + (expansionFilter !== ALL_EXPANSIONS_FILTER ? 1 : 0) + (artistFilter !== ALL_ARTISTS_FILTER ? 1 : 0);

    const updateCollectionCardBinderStatus = (cardId: string, isInBinder: boolean) => {
        void mutateCollection((current) => {
            if (!current) return current;
            return { cards: current.cards.map((card) => (card.id === cardId ? { ...card, is_in_binder: isInBinder } : card)) };
        }, false);
    };

    const handleSelectCard = async (card: UserCard) => {
        if (card.id === selectedCardId || pendingActionId) return;

        setPendingActionId(card.id);
        try {
            const assigned = await onCardSelected(card);
            if (assigned === false) return;

            const previousId = selectedCardId;
            setUserDeselected(false);
            setSelectedCardId(card.id);
            setPreviewCard(card);
            if (previousId && previousId !== card.id) updateCollectionCardBinderStatus(previousId, false);
            updateCollectionCardBinderStatus(card.id, true);
        } finally {
            setPendingActionId(null);
        }
    };

    const handleRemoveCard = async (card: UserCard) => {
        if (!onCardRemoved || pendingActionId) return;

        setPendingActionId(card.id);
        try {
            const removed = await onCardRemoved(card);
            if (removed === false) return;

            setUserDeselected(false);
            setSelectedCardId(undefined);
            setPreviewCard(undefined);
            updateCollectionCardBinderStatus(card.id, false);
        } finally {
            setPendingActionId(null);
        }
    };

    const buildCardDetailUrl = (targetCardId: string, pokemonDexId: number | undefined) => {
        const params = new URLSearchParams({ from: "binder" });
        if (pokemonDexId) params.set("dexId", String(pokemonDexId));
        for (const [key, value] of Object.entries(editSearchParams ?? {})) {
            if (value !== undefined) params.set(key, String(value));
        }
        return `/cartas/${targetCardId}?${params.toString()}`;
    };

    useEffect(() => {
        if (!isOpen) return;
        for (const group of filteredGroupedCards.slice(0, 6)) {
            router.prefetch(buildCardDetailUrl(group.activeCard.id, dexId));
        }
    }, [isOpen, filteredGroupedCards, dexId, router]);

    const handleEditCard = (targetCard: UserCard, pokemonDexId: number | undefined, groupKey: string) => {
        if (editingCardId || pendingActionId) return;
        setEditingCardId(targetCard.id);
        mutateGlobal(
            `/api/cards/${targetCard.id}`,
            {
                card: targetCard,
                copies: collection.filter((c) => cardCopyGroupKey(c) === groupKey),
                availableVariants: ALL_CARD_VARIANTS,
                allocation: targetCard.id === activeCardId ? activeCardAllocation : null,
            },
            false,
        );
        router.push(buildCardDetailUrl(targetCard.id, pokemonDexId));
    };

    const handlePrefetchCard = (cardId: string, pokemonDexId: number | undefined) => {
        router.prefetch(buildCardDetailUrl(cardId, pokemonDexId));
    };

    if (!isPresent) return null;

    return (
        <div
            className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-md"
            data-overlay-state={state}
            role="dialog"
            aria-modal="true"
            aria-label={`Selecionar carta para ${title ?? pokemonName}`}
            onClick={(e) => {
                if (!editingCardId && !pendingActionId && e.target === e.currentTarget) onClose();
            }}
        >
            <div className="modal-surface modal-transient-content flex h-dvh max-h-none w-full max-w-none flex-col items-center justify-center gap-0 sm:h-[85vh] sm:max-h-[820px] sm:max-w-2xl sm:gap-5 lg:max-w-4xl lg:flex-row lg:items-center xl:max-w-5xl 2xl:max-w-6xl">
                <div className="hidden lg:flex lg:w-[240px] xl:w-[300px] 2xl:w-[340px] shrink-0 flex-col items-center justify-center transition-all duration-200">
                    {previewCard ? (
                        <>
                            <div className="relative aspect-[8/11] w-full select-none">
                                <CardArtwork key={previewCard.id} src={formatTcgdexImageUrl(previewCard.card_image_url)} alt={previewCard.card_name} sizes="(max-width: 1280px) 240px, 340px" maxTilt={10} perspective={1000} glareOpacity={0.25} shineMode={resolveCardShine(previewCard.card_variant, previewCard.card_rarity, previewCard.card_image_url, previewCard.card_name)} elementTypes={resolveCardElementTypes(previewCard.card_types, previewCard.pokemon_dex_id)} imageClassName="object-contain" />
                            </div>
                            <div className="mt-3 flex flex-col items-center gap-0.5 text-center">
                                <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-white">
                                    <span className="truncate max-w-[200px] xl:max-w-[260px] text-sm font-bold text-white">{previewCard.card_name}</span>
                                    <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-slate-300">{previewCard.pokemon_dex_id != null ? `#${String(previewCard.pokemon_dex_id).padStart(3, "0")}` : "TCG"}</span>
                                </div>
                                <span className="truncate max-w-[240px] xl:max-w-[300px] text-xs text-slate-400">{previewCard.card_artist ? `${previewCard.card_set_name || "Coleção"} · ${previewCard.card_artist}` : previewCard.card_set_name || "Coleção"}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="relative flex aspect-[8/11] w-full select-none flex-col items-center justify-between rounded-2xl border-2 border-dashed border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5 shadow-2xl backdrop-blur-md">
                                <div className="flex w-full items-center justify-between">
                                    {dexId ? <span className="rounded bg-black/40 px-2 py-0.5 text-xs font-bold text-slate-400 backdrop-blur-sm">#{String(dexId).padStart(3, "0")}</span> : <span className="rounded bg-black/40 px-2 py-0.5 text-xs font-bold text-slate-400 backdrop-blur-sm">Livre</span>}
                                    <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-slate-400">Vazio</span>
                                </div>

                                {dexId ? (
                                    <div className="relative flex h-36 w-36 items-center justify-center">
                                        <Image src={getPokemonSilhouetteUrl(dexId)} alt={pokemonName} fill sizes="(max-width: 1280px) 150px, 180px" className="object-contain opacity-25" unoptimized onLoad={() => markSilhouetteLoaded(dexId)} />
                                    </div>
                                ) : (
                                    <BookOpen size={72} className="text-slate-600" />
                                )}

                                <div className="flex flex-col items-center text-center">
                                    <span className="text-xs font-semibold text-slate-300">{pokemonName}</span>
                                    <span className="text-[11px] text-slate-500">Nenhuma carta no binder</span>
                                </div>
                            </div>
                            <div className="mt-3 flex flex-col items-center gap-0.5 text-center">
                                <span className="text-xs text-slate-400">Selecione uma carta ao lado para exibir</span>
                            </div>
                        </>
                    )}
                </div>

                <div className="relative flex h-full w-full min-w-0 flex-1 flex-col overflow-hidden rounded-none border-0 bg-[#12151d] shadow-2xl sm:rounded-2xl sm:border sm:border-white/10">
                    {editingCardId && (
                        <div className="absolute top-0 inset-x-0 h-1 overflow-hidden rounded-t-2xl bg-white/5 z-30">
                            <div className="h-full w-full bg-poke-blue animate-pulse" />
                        </div>
                    )}
                    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                                <h2 className="truncate text-lg font-bold text-white tracking-tight sm:text-xl">{title ?? pokemonName}</h2>
                                {dexId ? <span className="shrink-0 rounded-md border border-white/10 bg-white/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-300 sm:text-xs">#{String(dexId).padStart(3, "0")}</span> : null}
                            </div>
                            <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-slate-400 sm:line-clamp-1">{description ?? "Selecione uma carta da sua coleção para exibir no binder"}</p>
                        </div>

                        <button type="button" onClick={onClose} disabled={Boolean(editingCardId || pendingActionId)} aria-label="Fechar" className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition-colors ${editingCardId || pendingActionId ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:bg-white/10 hover:text-white"}`}>
                            <X size={18} />
                        </button>
                    </div>

                    {groupedCards.length > 0 ? (
                        <div className="flex shrink-0 flex-col border-b border-white/5 bg-black/20 px-3 py-2.5 sm:px-6 sm:py-3">
                            <ModalSearchFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} showFilters={showFilters} onToggleFilters={() => setShowFilters((prev) => !prev)} activeFilterCount={activeFilterCount} filterButtonAriaLabel="Alternar filtros de idioma, raridade, versão, expansão, ilustrador e ordenação">
                                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 sm:gap-2.5 w-full pt-0.5">
                                    <Select<string> value={languageFilter} onChange={setLanguageFilter} options={LANGUAGE_FILTER_OPTIONS} icon={<Globe size={13} />} ariaLabel="Filtrar por idioma da carta" className="w-full min-w-0" size="sm" />
                                    <Select<string> value={rarityFilter} onChange={setRarityFilter} options={RARITY_FILTER_OPTIONS} icon={<Gem size={13} />} ariaLabel="Filtrar por raridade" className="w-full min-w-0" size="sm" />
                                    <Select<string> value={variantFilter} onChange={setVariantFilter} options={VARIANT_FILTER_OPTIONS} icon={<Sparkles size={13} />} ariaLabel="Filtrar por versão" className="w-full min-w-0" size="sm" />
                                    <Select<string> value={expansionFilter} onChange={setExpansionFilter} options={expansionOptions} icon={<Layers size={13} />} ariaLabel="Filtrar por expansão" className="w-full min-w-0" size="sm" />
                                    <Select<string> value={artistFilter} onChange={setArtistFilter} options={artistOptions} icon={<Palette size={13} />} ariaLabel="Filtrar por ilustrador" className="w-full min-w-0" size="sm" />
                                    <div className="flex w-full min-w-0 items-center gap-1.5">
                                        <Select<CollectionSortField> value={sortField} onChange={setSortField} options={SORT_FIELD_OPTIONS} icon={<ArrowUpDown size={13} />} ariaLabel="Ordenar cartas" className="flex-1 min-w-0" size="sm" align="right" />
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
                            </ModalSearchFilters>
                        </div>
                    ) : null}

                    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                        {isLoading ? (
                            <div className="flex h-full min-h-[250px] flex-col items-center justify-center">
                                <PokeballLoader message="Buscando suas cartas na coleção..." size="md" />
                            </div>
                        ) : groupedCards.length === 0 ? (
                            <div className="flex h-full min-h-[250px] flex-col items-center justify-center gap-4 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400">
                                    <Search size={22} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">Nenhuma carta encontrada</p>
                                    <p className="mt-1 text-xs text-slate-400">Você ainda não tem exemplares de {pokemonName} cadastrados na sua coleção.</p>
                                </div>
                                <button
                                    type="button"
                                    disabled={Boolean(editingCardId)}
                                    onClick={() => {
                                        if (!editingCardId) {
                                            onOpenCatalogSearch();
                                        }
                                    }}
                                    className={`flex items-center gap-2 rounded-xl bg-poke-blue px-4 py-2.5 text-xs font-semibold text-white shadow-md transition-opacity ${editingCardId ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:opacity-90"}`}
                                >
                                    <Plus size={15} />
                                    <span>Buscar no catálogo</span>
                                </button>
                            </div>
                        ) : filteredGroupedCards.length === 0 ? (
                            <div className="flex h-full min-h-[250px] flex-col items-center justify-center gap-3 text-center">
                                <Search size={28} className="text-slate-600" />
                                <div>
                                    <p className="text-sm font-semibold text-white">Nenhuma carta encontrada</p>
                                    <p className="mt-1 text-xs text-slate-400">Tente ajustar a busca ou os filtros.</p>
                                </div>
                                {hasActiveFilters ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSearchTerm("");
                                            setLanguageFilter("all");
                                            setRarityFilter("all");
                                            setVariantFilter("all");
                                            setExpansionFilter(ALL_EXPANSIONS_FILTER);
                                            setArtistFilter(ALL_ARTISTS_FILTER);
                                            setSortField("name");
                                            setSortDirection("asc");
                                        }}
                                        className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                                    >
                                        Limpar filtros
                                    </button>
                                ) : null}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                                {filteredGroupedCards.map((group, index) => {
                                    const card = group.card;
                                    const isCurrent = group.hasInBinder;
                                    const isEditingThisCard = editingCardId === group.activeCard.id;
                                    const isNavigating = Boolean(editingCardId);
                                    const isActionPending = Boolean(pendingActionId);
                                    const isInteractionBlocked = isNavigating || isActionPending;
                                    const appear = getCardAppearProps(index);
                                    const imageSrc = formatTcgdexImageUrl(card.card_image_url);
                                    const shineMode = resolveCardShine(card.card_variant, card.card_rarity, card.card_image_url, card.card_name);

                                    return (
                                        <div key={group.key} className={`group relative isolate flex flex-col gap-2 ${appear.className}`} style={appear.style}>
                                            <div
                                                role="button"
                                                tabIndex={isInteractionBlocked ? -1 : 0}
                                                onClick={() => {
                                                    if (isInteractionBlocked) return;
                                                    if (!isCurrent) {
                                                        void handleSelectCard(group.activeCard);
                                                    }
                                                }}
                                                onKeyDown={(event) => {
                                                    if (isInteractionBlocked || isCurrent || (event.key !== "Enter" && event.key !== " ")) return;
                                                    event.preventDefault();
                                                    void handleSelectCard(group.activeCard);
                                                }}
                                                aria-label={isCurrent ? `${card.card_name}, carta atualmente no Binder. Use Remover para desvincular.` : `Exibir ${card.card_name} no Binder`}
                                                className={`relative isolate aspect-[8/11] w-full outline-none focus-visible:ring-2 focus-visible:ring-poke-blue/70 ${isInteractionBlocked ? "cursor-not-allowed opacity-80" : isCurrent ? "cursor-default" : "cursor-pointer"}`}
                                            >
                                                <CardArtwork src={imageSrc} alt="" sizes="(max-width: 768px) 50vw, 200px" shineMode={shineMode} elementTypes={resolveCardElementTypes(card.card_types, card.pokemon_dex_id)} imageClassName="object-contain" />
                                            </div>

                                            <div className="mt-1 flex items-center gap-1.5">
                                                <button
                                                    type="button"
                                                    disabled={isInteractionBlocked}
                                                    onClick={() => void (isCurrent ? handleRemoveCard(group.activeCard) : handleSelectCard(group.activeCard))}
                                                    className={`group/btn flex flex-1 min-w-0 items-center justify-center gap-1.5 rounded-lg py-2 px-2 text-xs font-semibold leading-none transition-colors duration-150 ${
                                                        isInteractionBlocked ? "cursor-not-allowed opacity-50 bg-white/5 text-slate-500 border border-white/5" : isCurrent ? "cursor-pointer border border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20" : "cursor-pointer bg-white/10 text-white hover:bg-poke-blue hover:shadow-md hover:shadow-poke-blue/20"
                                                    }`}
                                                    title={isCurrent ? "Remover do Binder" : "Exibir no Binder"}
                                                >
                                                    {isCurrent ? (
                                                        <>
                                                            <X size={13} className="shrink-0" />
                                                            <span className="truncate whitespace-nowrap leading-none">Remover</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <BookOpen size={13} className="shrink-0" />
                                                            <span className="truncate whitespace-nowrap leading-none">Exibir</span>
                                                        </>
                                                    )}
                                                </button>

                                                <button
                                                    type="button"
                                                    title={isEditingThisCard ? "Abrindo edição..." : "Editar exemplar"}
                                                    aria-label={isEditingThisCard ? "Abrindo edição..." : "Editar exemplar"}
                                                    disabled={isInteractionBlocked}
                                                    onMouseEnter={() => handlePrefetchCard(group.activeCard.id, dexId)}
                                                    onPointerDown={() => handlePrefetchCard(group.activeCard.id, dexId)}
                                                    onFocus={() => handlePrefetchCard(group.activeCard.id, dexId)}
                                                    onClick={() => handleEditCard(group.activeCard, dexId, group.key)}
                                                    className={`flex shrink-0 items-center justify-center gap-1 rounded-lg border px-2 py-2 text-xs font-semibold leading-none transition-colors duration-150 ${
                                                        isEditingThisCard ? "border-poke-blue/40 bg-poke-blue/20 text-poke-blue cursor-wait" : isInteractionBlocked ? "border-white/5 bg-white/[0.02] text-slate-600 cursor-not-allowed opacity-50" : "border-white/10 bg-white/5 text-slate-300 transition-colors duration-150 hover:border-white/20 hover:bg-white/15 hover:text-white cursor-pointer"
                                                    }`}
                                                >
                                                    {isEditingThisCard ? (
                                                        <>
                                                            <Loader2 size={13} className="shrink-0 animate-spin text-poke-blue" />
                                                            <span className="hidden sm:inline leading-none text-poke-blue">Abrindo...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Pencil size={13} className="shrink-0" />
                                                            <span className="hidden sm:inline leading-none">Editar</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {collection.length > 0 && (
                        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 bg-black/30 px-4 py-3 sm:px-6 sm:py-3.5">
                            <span className="truncate text-xs text-slate-400">{collection.length === 1 ? "1 exemplar cadastrado" : `${collection.length} exemplares cadastrados`}</span>

                            <button
                                type="button"
                                disabled={Boolean(editingCardId)}
                                onClick={() => {
                                    if (!editingCardId) {
                                        onOpenCatalogSearch();
                                    }
                                }}
                                className={`flex shrink-0 items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors ${editingCardId ? "cursor-not-allowed opacity-40" : "cursor-pointer hover:bg-white/10 hover:text-white"}`}
                            >
                                <Plus size={14} />
                                <span>Adicionar Carta</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
