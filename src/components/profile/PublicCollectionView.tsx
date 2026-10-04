"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { PokeballLoader } from "@/components/loading/PokeballLoader";
import { TrainerNotFound } from "@/components/profile/TrainerNotFound";
import { ProfileRouteLoading } from "@/components/profile/ProfileRouteLoading";
import { CardGridSkeleton } from "@/components/loading/CardGridSkeleton";
import { CardArtwork } from "@/components/ui/CardArtwork";
import { CardBadgeStack } from "@/components/ui/CardBadgeStack";
import { CardBadgeVisibilityToggle } from "@/components/ui/CardBadgeVisibilityToggle";
import { CardLightbox } from "@/components/ui/CardLightbox";
import { FlagIcon } from "@/components/ui/FlagIcon";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select, type SelectOption } from "@/components/ui/Select";
import { formatTcgdexImageUrl } from "@/lib/pokemon/tcgdex";
import { RARITY_FILTER_OPTIONS } from "@/lib/pokemon/rarity";
import { resolveCardShine, VARIANT_FILTER_OPTIONS } from "@/lib/pokemon/variant";
import { resolveCardElementTypes } from "@/lib/pokemon/cardTypes";
import { ALL_EXPANSIONS_FILTER, ALL_ARTISTS_FILTER, buildCollectionFilterResetKey, buildExpansionFilterOptions, buildArtistFilterOptions, type CollectionSortDirection, type CollectionSortField } from "@/lib/collection/listCards";
import { useInfiniteScroll } from "@/lib/hooks/useInfiniteScroll";
import { useCardBadgeVisibility } from "@/lib/hooks/useCardBadgeVisibility";
import { getCardAppearProps } from "@/lib/ui/cardAppear";
import { buildThemeCssVars } from "@/lib/profile/username";
import { useInfinitePublicCollectionGroups, usePublicUserExpansions, usePublicUserArtists } from "@/lib/swr";
import { useAuth } from "@/lib/context/AuthContext";
import { usePublicProfileTheme } from "@/lib/context/UserSettingsContext";
import { BinderStatusFilter, UserCard, CollectionCardGroup, type CardElementType, type CardShineMode } from "@/types/binder";
import { ArrowLeft, ArrowUpDown, ArrowUp, ArrowDown, BookOpen, Globe, Layers, Layers2, Search, SlidersHorizontal, Sparkles, Gem, X, Palette } from "lucide-react";

export interface PublicCollectionPayload {
    owner: {
        id: string;
        username: string;
        name: string;
        avatarUrl?: string | null;
        themeColor: string;
    };
    cards?: UserCard[];
    groups?: CollectionCardGroup[];
    total?: number;
    hasMore?: boolean;
    isOwner?: boolean;
}

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

export function PublicCollectionView({ username, fallbackData, publicGuestTheme }: { username: string; fallbackData?: PublicCollectionPayload; publicGuestTheme?: string }) {
    const { user: authUser } = useAuth();
    const [avatarError, setAvatarError] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<BinderStatusFilter>("all");
    const [languageFilter, setLanguageFilter] = useState("all");
    const [rarityFilter, setRarityFilter] = useState("all");
    const [variantFilter, setVariantFilter] = useState("all");
    const [expansionFilter, setExpansionFilter] = useState(ALL_EXPANSIONS_FILTER);
    const [artistFilter, setArtistFilter] = useState(ALL_ARTISTS_FILTER);
    const [sortField, setSortField] = useState<SortField>("dex");
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
    const [lightbox, setLightbox] = useState<{ src: string; alt: string; shineMode: CardShineMode; elementTypes: CardElementType[] } | null>(null);

    const [isMobile, setIsMobile] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const { showCardBadges, setCardBadgeVisibility } = useCardBadgeVisibility();

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 250);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setAvatarError(false);
        setSearchTerm("");
        setDebouncedSearchTerm("");
        setStatusFilter("all");
        setLanguageFilter("all");
        setRarityFilter("all");
        setVariantFilter("all");
        setExpansionFilter(ALL_EXPANSIONS_FILTER);
        setArtistFilter(ALL_ARTISTS_FILTER);
        setSortField("dex");
        setSortDirection("asc");
        setShowFilters(false);
    }, [username]);

    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (statusFilter !== "all") count++;
        if (languageFilter !== "all") count++;
        if (rarityFilter !== "all") count++;
        if (variantFilter !== "all") count++;
        if (expansionFilter !== ALL_EXPANSIONS_FILTER) count++;
        if (artistFilter !== ALL_ARTISTS_FILTER) count++;
        return count;
    }, [statusFilter, languageFilter, rarityFilter, variantFilter, expansionFilter, artistFilter]);

    const openLightbox = useCallback((src: string, alt: string, shineMode: CardShineMode = "none", elementTypes: CardElementType[] = ["Colorless"]) => {
        setLightbox({ src, alt, shineMode, elementTypes });
    }, []);

    const closeLightbox = useCallback(() => {
        setLightbox(null);
    }, []);

    const { expansions } = usePublicUserExpansions(username);
    const expansionOptions = useMemo(() => buildExpansionFilterOptions(expansions), [expansions]);
    const { artists } = usePublicUserArtists(username);
    const artistOptions = useMemo(() => buildArtistFilterOptions(artists), [artists]);

    const {
        groups,
        total,
        owner: fetchedOwner,
        isOwner: fetchedIsOwner,
        isLoading,
        isLoadingMore,
        hasMore,
        loadMore,
        isError,
    } = useInfinitePublicCollectionGroups(username, {
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

    const owner = fetchedOwner || fallbackData?.owner;
    const isOwner = typeof fetchedIsOwner === "boolean" ? fetchedIsOwner : (fallbackData?.isOwner ?? false);
    const effectiveTheme = owner?.themeColor || fallbackData?.owner?.themeColor || publicGuestTheme;
    usePublicProfileTheme(effectiveTheme, !authUser);

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
        enabled: !isLoading && groups.length > 0,
    });

    if (isError) {
        if (isError.message?.includes("Perfil não encontrado") || isError.message === "not_found") {
            return <TrainerNotFound username={username} type="colecao" />;
        }
        return (
            <div className="flex min-h-screen flex-col bg-[#0a0c10]">
                <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center p-6 text-center">
                    <div className="rounded-2xl border border-white/10 bg-[#12151d] p-8 shadow-xl">
                        <p className="text-base font-bold text-white">Não foi possível carregar a coleção.</p>
                        <NextLink href="/" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-poke-blue px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90">
                            <BookOpen size={14} />
                            <span>Voltar ao Binder</span>
                        </NextLink>
                    </div>
                </main>
            </div>
        );
    }

    if (isLoading && !owner) {
        return <ProfileRouteLoading message="Carregando coleção..." type="colecao" />;
    }

    if (!owner) {
        return <TrainerNotFound username={username} type="colecao" />;
    }

    const themeStyle = buildThemeCssVars(owner.themeColor || "#ef4444");
    const hasActiveFilters = Boolean(searchTerm.trim()) || statusFilter !== "all" || languageFilter !== "all" || rarityFilter !== "all" || variantFilter !== "all" || expansionFilter !== ALL_EXPANSIONS_FILTER || artistFilter !== ALL_ARTISTS_FILTER;
    const displayName = owner.name || `@${owner.username}`;

    return (
        <div className="flex min-h-screen flex-col bg-[#0a0c10]">
            <div style={themeStyle}>
                <main key={username} className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16">
                    <header className="profile-enter flex items-start justify-between gap-3 sm:items-center sm:gap-4">
                        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                            {owner.avatarUrl && !avatarError ? (
                                <Image src={owner.avatarUrl} alt={owner.username} width={48} height={48} className="h-10 w-10 shrink-0 rounded-full border border-white/20 object-cover sm:h-12 sm:w-12" referrerPolicy="no-referrer" onError={() => setAvatarError(true)} unoptimized />
                            ) : (
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-bold text-white sm:h-12 sm:w-12 sm:text-base">{(owner.username[0] || "T").toUpperCase()}</div>
                            )}
                            <div className="min-w-0 flex-1">
                                <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:gap-2.5">
                                    <h1 className="truncate text-base font-extrabold tracking-tight text-white sm:text-2xl leading-tight sm:leading-none">{displayName}</h1>
                                    {!isLoading ? (
                                        <span className="inline-flex shrink-0 self-start items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-semibold text-slate-300 leading-none sm:px-3.5 sm:py-1.5 sm:translate-y-[2px]">
                                            <Layers size={13} className="shrink-0 text-[var(--theme-primary)]" />
                                            <span>
                                                {total} <span className="hidden sm:inline">{hasActiveFilters ? (total === 1 ? "carta encontrada" : "cartas encontradas") : total === 1 ? "carta na coleção" : "cartas na coleção"}</span>
                                                <span className="sm:hidden">{total === 1 ? "carta" : "cartas"}</span>
                                            </span>
                                        </span>
                                    ) : (
                                        <div className="h-5 w-20 shrink-0 self-start animate-pulse rounded-full bg-white/10 sm:h-7 sm:w-28 sm:translate-y-[2px]" aria-label="Carregando total de cartas" />
                                    )}
                                </div>
                                <p className="mt-1 font-mono text-xs font-semibold text-poke-blue">@{owner.username}</p>
                            </div>
                        </div>

                        <NextLink href={`/perfil/${owner.username}`} prefetch={true} className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white sm:gap-2 sm:px-4 sm:py-2">
                            <ArrowLeft size={14} />
                            <span>Perfil</span>
                        </NextLink>
                    </header>

                    <div className="profile-enter profile-enter-d1 relative z-30 flex flex-col gap-3">
                        <div className="flex items-center justify-between gap-2 sm:gap-3 w-full">
                            <div className="relative flex-1 min-w-0 sm:w-[440px] md:w-[500px] lg:w-[540px] sm:flex-none">
                                <Search size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-500 z-20 sm:left-3.5 sm:h-4 sm:w-4" />
                                <SearchInput
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder={isMobile ? "Buscar cartas..." : "Buscar por pokémon, número, coleção ou pokédex..."}
                                    placeholderClassName="left-8.5 right-8 text-xs sm:left-10 sm:right-9 sm:text-sm"
                                    className="w-full h-9 sm:h-10 rounded-xl border border-white/10 bg-white/5 py-1.5 sm:py-2.5 pr-8 sm:pr-9 pl-8.5 sm:pl-10 text-xs sm:text-sm text-white transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none"
                                />
                                {searchTerm ? (
                                    <button type="button" onClick={() => setSearchTerm("")} aria-label="Limpar busca" className="absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-500 hover:text-white z-20 sm:right-3 cursor-pointer">
                                        <X size={14} className="sm:h-[15px] sm:w-[15px]" />
                                    </button>
                                ) : null}
                            </div>

                            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
                                <button
                                    type="button"
                                    onClick={() => setShowFilters((prev) => !prev)}
                                    aria-label="Alternar filtros"
                                    aria-expanded={showFilters}
                                    className={`flex h-9 sm:h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border px-2.5 sm:px-3.5 text-xs font-semibold transition-all ${showFilters || activeFilterCount > 0 ? "border-poke-blue/60 bg-poke-blue/20 text-white shadow-[0_0_12px_rgba(59,130,246,0.2)]" : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"}`}
                                >
                                    <SlidersHorizontal size={13} className={activeFilterCount > 0 ? "text-poke-blue" : "text-slate-400"} />
                                    <span>Filtros</span>
                                    {activeFilterCount > 0 && <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-poke-blue px-1 text-[10px] font-bold text-white">{activeFilterCount}</span>}
                                </button>

                                <CardBadgeVisibilityToggle showBadges={showCardBadges} onChange={setCardBadgeVisibility} />
                            </div>
                        </div>

                        <div className={`grid transition-all duration-300 ease-in-out ${showFilters ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"}`}>
                            <div className="overflow-hidden">
                                <div className="rounded-2xl border border-white/10 bg-[#121520]/80 p-3 sm:p-3.5 shadow-xl backdrop-blur-md">
                                    <div className="grid w-full grid-cols-2 gap-1.5 lg:grid-cols-4 lg:gap-2.5">
                                        <Select<BinderStatusFilter> value={statusFilter} onChange={setStatusFilter} options={STATUS_FILTER_OPTIONS} icon={<BookOpen size={13} />} ariaLabel="Filtrar por status no binder" className="w-full min-w-0" size="sm" />
                                        <Select<string> value={languageFilter} onChange={setLanguageFilter} options={LANGUAGE_FILTER_OPTIONS} icon={<Globe size={13} />} ariaLabel="Filtrar por idioma" className="w-full min-w-0" menuClassName="sm:left-0 sm:right-auto" align="right" size="sm" />
                                        <Select<string> value={rarityFilter} onChange={setRarityFilter} options={RARITY_FILTER_OPTIONS} icon={<Gem size={13} />} ariaLabel="Filtrar por raridade" className="w-full min-w-0" size="sm" />
                                        <Select<string> value={variantFilter} onChange={setVariantFilter} options={VARIANT_FILTER_OPTIONS} icon={<Sparkles size={13} />} ariaLabel="Filtrar por versão" className="w-full min-w-0" size="sm" />
                                        <Select<string> value={expansionFilter} onChange={setExpansionFilter} options={expansionOptions} icon={<Layers size={13} />} ariaLabel="Filtrar por expansão" className="w-full min-w-0" size="sm" />
                                        <Select<string> value={artistFilter} onChange={setArtistFilter} options={artistOptions} icon={<Palette size={13} />} ariaLabel="Filtrar por ilustrador" className="w-full min-w-0" size="sm" />

                                        <div className="col-span-2 flex w-full min-w-0 items-center gap-1.5 lg:col-span-2">
                                            <Select<SortField> value={sortField} onChange={setSortField} options={SORT_FIELD_OPTIONS} icon={<ArrowUpDown size={13} />} ariaLabel="Ordenar coleção" className="min-w-0 flex-1" size="sm" align="right" />
                                            <button
                                                type="button"
                                                onClick={() => setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))}
                                                aria-label={sortDirection === "asc" ? "Ordem crescente" : "Ordem decrescente"}
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
                    </div>

                    {isLoading ? (
                        <CardGridSkeleton count={18} />
                    ) : total === 0 && !hasActiveFilters && !debouncedSearchTerm.trim() ? (
                        <div className="profile-enter profile-enter-d2 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#12151d] p-10 text-center">
                            <Layers2 size={32} className="text-slate-600" />
                            <p className="mt-2 text-sm font-bold text-white">Coleção vazia</p>
                            <p className="mt-0.5 text-xs text-slate-400">{isOwner ? "Adicione cartas na sua Coleção para exibi-las aqui." : "Este treinador ainda não cadastrou cartas."}</p>
                        </div>
                    ) : groups.length === 0 ? (
                        <div className="profile-enter profile-enter-d2 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#12151d] p-10 text-center">
                            <Search size={28} className="text-slate-600" />
                            <p className="mt-2 text-sm font-bold text-white">Nenhuma carta encontrada</p>
                            <p className="mt-0.5 text-xs text-slate-400">Tente ajustar a busca ou os filtros.</p>
                            {hasActiveFilters ? (
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
                                        setShowFilters(false);
                                    }}
                                    className="mt-3 rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10"
                                >
                                    Limpar filtros
                                </button>
                            ) : null}
                        </div>
                    ) : (
                        <div className="profile-enter profile-enter-d2 flex flex-col gap-4">
                            <div key={filterResetKey} className="relative z-0 isolate grid auto-rows-fr grid-cols-3 gap-2 sm:grid-cols-3 sm:gap-3.5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                                {groups.map((group, index) => {
                                    const card = group.card;
                                    const appear = getCardAppearProps(index);
                                    const imageSrc = formatTcgdexImageUrl(card.card_image_url);
                                    const shineMode = resolveCardShine(card.card_variant, card.card_rarity, card.card_image_url, card.card_name);
                                    const elementTypes = resolveCardElementTypes(card.card_types, card.pokemon_dex_id);
                                    const conditionLabel = card.card_condition ? `, condição ${card.card_condition}` : "";
                                    const countLabel = group.totalCount > 1 ? `, ${group.totalCount} cópias idênticas` : "";
                                    const languageLabel = card.card_language === "pt-br" ? "PT-BR" : card.card_language.toUpperCase();

                                    return (
                                        <button key={`${filterResetKey}-${group.key}`} type="button" onClick={() => openLightbox(imageSrc, card.card_name, shineMode, elementTypes)} className={`group relative isolate block aspect-[8/11] w-full cursor-zoom-in text-left transition-colors duration-200 ${appear.className}`} style={appear.style} aria-label={`Ampliar ${card.card_name}${conditionLabel}${countLabel}, idioma ${languageLabel}`}>
                                            <CardArtwork src={imageSrc} alt={card.card_name} sizes="(max-width: 640px) 30vw, (max-width: 768px) 33vw, 200px" shineMode={shineMode} elementTypes={elementTypes} priority={index === 0}>
                                                {showCardBadges ? <CardBadgeStack condition={card.card_condition} count={group.totalCount} language={card.card_language} /> : null}
                                            </CardArtwork>
                                        </button>
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
            </div>

            <CardLightbox src={lightbox?.src ?? null} alt={lightbox?.alt} shineMode={lightbox?.shineMode} elementTypes={lightbox?.elementTypes} onClose={closeLightbox} />
        </div>
    );
}
