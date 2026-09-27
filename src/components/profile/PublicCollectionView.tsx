"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import useSWR from "swr";
import { PokeballLoader } from "@/components/loading/PokeballLoader";
import { TrainerNotFound } from "@/components/profile/TrainerNotFound";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { CardLightbox } from "@/components/ui/CardLightbox";
import { FlagIcon } from "@/components/ui/FlagIcon";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select, type SelectOption } from "@/components/ui/Select";
import { formatTcgdexImageUrl } from "@/lib/pokemon/tcgdex";
import { getRarityBadgeStyle, RARITY_FILTER_OPTIONS } from "@/lib/pokemon/rarity";
import { formatVariantLabel, resolveCardShine } from "@/lib/pokemon/variant";
import { ALL_EXPANSIONS_FILTER, buildCollectionFilterResetKey, buildExpansionFilterOptions, filterAndSortCollectionGroups, groupCollectionCards, type CollectionSortDirection, type CollectionSortField } from "@/lib/collection/listCards";
import { useClientPagedWindow } from "@/lib/hooks/useClientPagedWindow";
import { useInfiniteScroll } from "@/lib/hooks/useInfiniteScroll";
import { getCardAppearProps } from "@/lib/ui/cardAppear";
import { buildThemeCssVars } from "@/lib/profile/username";
import { BinderStatusFilter, CardLanguage, UserCard, type CardShineMode } from "@/types/binder";
import { ArrowLeft, ArrowUpDown, BookOpen, Globe, Layers, Layers2, Search, Sparkles, X } from "lucide-react";

export interface PublicCollectionPayload {
    owner: {
        id: string;
        username: string;
        name: string;
        avatarUrl?: string | null;
        themeColor: string;
    };
    cards: UserCard[];
    isOwner: boolean;
}

type SortField = CollectionSortField;
type SortDirection = CollectionSortDirection;

const STATUS_FILTER_OPTIONS: SelectOption<BinderStatusFilter>[] = [
    { value: "all", label: "Todas as Cartas" },
    { value: "in_binder", label: "No Binder" },
    { value: "stored", label: "Guardadas" },
];

const LANGUAGE_FILTER_OPTIONS: SelectOption<string>[] = [
    { value: "all", label: "Todos os Idiomas" },
    { value: "pt-br", label: "Português (PT-BR)", icon: <FlagIcon country="pt-br" /> },
    { value: "en", label: "Inglês (EN)", icon: <FlagIcon country="en" /> },
    { value: "ja", label: "Japonês (JA)", icon: <FlagIcon country="ja" /> },
];

const SORT_FIELD_OPTIONS: SelectOption<SortField>[] = [
    { value: "dex", label: "Número Pokédex" },
    { value: "name", label: "Nome do Pokémon" },
    { value: "recent", label: "Data de adição" },
];

const fetcher = async (url: string): Promise<PublicCollectionPayload> => {
    const res = await fetch(url);
    if (!res.ok) {
        if (res.status === 404) throw new Error("not_found");
        throw new Error("fetch_failed");
    }
    return res.json();
};

export function PublicCollectionView({ username, fallbackData }: { username: string; fallbackData?: PublicCollectionPayload }) {
    const { data, error, isLoading } = useSWR<PublicCollectionPayload>(username ? `/api/profile/${encodeURIComponent(username)}/collection` : null, fetcher, {
        fallbackData,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        dedupingInterval: 10000,
    });
    const [avatarError, setAvatarError] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<BinderStatusFilter>("all");
    const [languageFilter, setLanguageFilter] = useState("all");
    const [rarityFilter, setRarityFilter] = useState("all");
    const [expansionFilter, setExpansionFilter] = useState(ALL_EXPANSIONS_FILTER);
    const [sortField, setSortField] = useState<SortField>("dex");
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
    const [lightbox, setLightbox] = useState<{ src: string; alt: string; shineMode: CardShineMode } | null>(null);

    useEffect(() => {
        setAvatarError(false);
        setSearchTerm("");
        setStatusFilter("all");
        setLanguageFilter("all");
        setRarityFilter("all");
        setExpansionFilter(ALL_EXPANSIONS_FILTER);
        setSortField("dex");
        setSortDirection("asc");
    }, [username]);

    const openLightbox = useCallback((src: string, alt: string, shineMode: CardShineMode = "none") => {
        setLightbox({ src, alt, shineMode });
    }, []);

    const closeLightbox = useCallback(() => {
        setLightbox(null);
    }, []);

    const groupedCards = useMemo(() => groupCollectionCards(data?.cards ?? []), [data?.cards]);

    const filteredAndSortedGroups = useMemo(
        () =>
            filterAndSortCollectionGroups(groupedCards, {
                searchTerm,
                statusFilter,
                languageFilter,
                rarityFilter,
                expansionFilter,
                sortField,
                sortDirection,
            }),
        [groupedCards, searchTerm, statusFilter, languageFilter, rarityFilter, expansionFilter, sortField, sortDirection],
    );

    const expansionOptions = useMemo(() => buildExpansionFilterOptions((data?.cards ?? []).map((card) => card.card_set_name)), [data?.cards]);

    const filterResetKey = useMemo(
        () =>
            buildCollectionFilterResetKey({
                searchTerm,
                statusFilter,
                languageFilter,
                rarityFilter,
                expansionFilter,
                sortField,
                sortDirection,
            }),
        [searchTerm, statusFilter, languageFilter, rarityFilter, expansionFilter, sortField, sortDirection],
    );

    const { visibleItems, hasMore, loadMore } = useClientPagedWindow(filteredAndSortedGroups, {
        resetKey: filterResetKey,
    });
    const sentinelRef = useInfiniteScroll({
        hasMore,
        onLoadMore: loadMore,
        enabled: Boolean(data) && filteredAndSortedGroups.length > 0,
    });

    if (error) {
        if (error.message === "not_found") {
            return <TrainerNotFound username={username} type="collection" />;
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

    if (isLoading && !data) {
        return (
            <div className="flex min-h-screen flex-col bg-[#0a0c10]">
                <main className="flex flex-1 items-center justify-center">
                    <PokeballLoader message="Carregando coleção..." size="lg" />
                </main>
            </div>
        );
    }

    if (!data) {
        return <TrainerNotFound username={username} type="collection" />;
    }

    const { owner, isOwner } = data;
    const themeStyle = buildThemeCssVars(owner.themeColor || "#ef4444");
    const hasActiveFilters = Boolean(searchTerm.trim()) || statusFilter !== "all" || languageFilter !== "all" || rarityFilter !== "all" || expansionFilter !== ALL_EXPANSIONS_FILTER;
    const displayName = owner.name || `@${owner.username}`;

    return (
        <div className="flex min-h-screen flex-col bg-[#0a0c10]">
            <div style={themeStyle}>
                <main key={username} className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16">
                    <header className="profile-enter flex flex-col gap-4">
                        <NextLink href={`/perfil/${owner.username}`} className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-slate-400 transition-colors hover:text-white">
                            <ArrowLeft size={14} />
                            <span>Perfil</span>
                        </NextLink>

                        <div className="flex items-center gap-3.5 sm:gap-4">
                            {owner.avatarUrl && !avatarError ? (
                                <Image src={owner.avatarUrl} alt={owner.username} width={56} height={56} className="h-12 w-12 shrink-0 rounded-full border border-white/20 object-cover sm:h-14 sm:w-14" referrerPolicy="no-referrer" onError={() => setAvatarError(true)} unoptimized />
                            ) : (
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-base font-bold text-white sm:h-14 sm:w-14">{(owner.username[0] || "T").toUpperCase()}</div>
                            )}
                            <div className="min-w-0 flex-1">
                                <p className="text-[11px] font-medium text-slate-500">Coleção</p>
                                <h1 className="truncate text-lg font-extrabold tracking-tight text-white sm:text-xl">{displayName}</h1>
                                <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
                                    <span className="font-mono font-semibold text-poke-blue">@{owner.username}</span>
                                    <span className="text-slate-600" aria-hidden>
                                        /
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-slate-400">
                                        <Layers size={12} className="text-poke-blue" />
                                        <span className="font-mono font-bold text-white">{filteredAndSortedGroups.length}</span>
                                        <span>de {data.cards.length}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="profile-enter profile-enter-d1 relative z-30 flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#121520]/80 p-3.5 shadow-xl backdrop-blur-md sm:p-4">
                        <div className="relative w-full">
                            <Search size={16} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-500" />
                            <SearchInput type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar por pokémon, número, coleção ou pokédex..." placeholderClassName="left-10 right-9" className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pr-9 pl-10 text-xs text-white transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none sm:text-sm" />
                            {searchTerm ? (
                                <button type="button" onClick={() => setSearchTerm("")} aria-label="Limpar busca" className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-500 hover:text-white">
                                    <X size={15} />
                                </button>
                            ) : null}
                        </div>

                        <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-3 sm:flex sm:flex-wrap sm:items-center sm:gap-2.5 lg:justify-between">
                            <div className="contents sm:flex sm:flex-wrap sm:items-center sm:gap-2.5">
                                <Select<BinderStatusFilter> value={statusFilter} onChange={setStatusFilter} options={STATUS_FILTER_OPTIONS} icon={<BookOpen size={13} />} ariaLabel="Filtrar por status no binder" className="w-full sm:w-[170px]" />
                                <Select<string> value={languageFilter} onChange={setLanguageFilter} options={LANGUAGE_FILTER_OPTIONS} icon={<Globe size={13} />} ariaLabel="Filtrar por idioma" className="w-full sm:w-[180px]" menuClassName="sm:left-0 sm:right-auto" align="right" />
                                <Select<string> value={rarityFilter} onChange={setRarityFilter} options={RARITY_FILTER_OPTIONS} icon={<Sparkles size={13} />} ariaLabel="Filtrar por raridade" className="w-full sm:w-[195px]" />
                                <Select<string> value={expansionFilter} onChange={setExpansionFilter} options={expansionOptions} icon={<Layers size={13} />} ariaLabel="Filtrar por expansão" className="w-full sm:w-[210px]" />
                            </div>

                            <div className="flex w-full min-w-0 items-center gap-1.5 sm:w-auto lg:ml-auto">
                                <Select<SortField> value={sortField} onChange={setSortField} options={SORT_FIELD_OPTIONS} icon={<ArrowUpDown size={13} />} ariaLabel="Ordenar coleção" className="min-w-0 flex-1 sm:w-[180px]" align="right" />
                                <button type="button" onClick={() => setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))} aria-label={sortDirection === "asc" ? "Ordem crescente" : "Ordem decrescente"} className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-poke-blue/50 hover:bg-white/10 hover:text-white active:scale-95">
                                    <ArrowUpDown size={15} className={`transition-transform duration-200 ${sortDirection === "desc" ? "rotate-180 text-poke-blue" : ""}`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {data.cards.length === 0 ? (
                        <div className="profile-enter profile-enter-d2 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#12151d] p-10 text-center">
                            <Layers2 size={32} className="text-slate-600" />
                            <p className="mt-2 text-sm font-bold text-white">Coleção vazia</p>
                            <p className="mt-0.5 text-xs text-slate-400">{isOwner ? "Adicione cartas na sua Coleção para exibi-las aqui." : "Este treinador ainda não cadastrou cartas."}</p>
                        </div>
                    ) : filteredAndSortedGroups.length === 0 ? (
                        <div className="profile-enter profile-enter-d2 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#12151d] p-10 text-center">
                            <Search size={28} className="text-slate-600" />
                            <p className="mt-2 text-sm font-bold text-white">Nenhuma carta encontrada</p>
                            <p className="mt-0.5 text-xs text-slate-400">Tente ajustar a busca ou os filtros.</p>
                            {hasActiveFilters ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchTerm("");
                                        setStatusFilter("all");
                                        setLanguageFilter("all");
                                        setRarityFilter("all");
                                        setExpansionFilter(ALL_EXPANSIONS_FILTER);
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
                                {visibleItems.map((group, index) => {
                                    const card = group.card;
                                    const appear = getCardAppearProps(index);
                                    const rarity = getRarityBadgeStyle(card.card_rarity);
                                    const imageSrc = formatTcgdexImageUrl(card.card_image_url);
                                    const shineMode = resolveCardShine(card.card_variant, card.card_rarity);

                                    return (
                                        <button key={`${filterResetKey}-${group.key}`} type="button" onClick={() => openLightbox(imageSrc, card.card_name, shineMode)} className={`group relative flex cursor-zoom-in flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-1.5 text-left transition-all duration-200 hover:border-poke-blue/50 hover:bg-white/[0.06] sm:p-2.5 ${appear.className}`} style={appear.style} aria-label={`Ampliar ${card.card_name}`}>
                                            <div className="z-10 flex min-h-[20px] items-center justify-between sm:min-h-[26px]">
                                                <span className="rounded bg-black/60 px-1 py-0.5 text-[9px] font-bold text-slate-300 backdrop-blur-sm sm:px-1.5 sm:text-[10px]">#{String(card.pokemon_dex_id).padStart(3, "0")}</span>
                                                <div className="flex items-center gap-0.5 sm:gap-1">
                                                    {group.hasInBinder && (
                                                        <span title="No Binder" className="flex items-center justify-center rounded border border-poke-blue/40 bg-poke-blue/20 p-0.5 text-poke-blue sm:p-1">
                                                            <BookOpen size={11} className="sm:h-3 sm:w-3" />
                                                        </span>
                                                    )}
                                                    {group.totalCount > 1 && <span className="rounded bg-poke-blue px-1 py-0.5 text-[8px] font-extrabold text-white shadow-md sm:px-1.5 sm:text-[10px]">x{group.totalCount}</span>}
                                                </div>
                                            </div>
                                            <div className="relative my-1 aspect-[2.5/3.5] w-full sm:my-2">
                                                <Card3DTilt className="relative h-full w-full overflow-hidden rounded-lg" maxTilt={8} maxMove={3} scale={1} glareOpacity={0.2} perspective={900} shineMode={shineMode}>
                                                    <Image src={imageSrc} alt={card.card_name} fill unoptimized sizes="(max-width: 640px) 30vw, (max-width: 768px) 33vw, 200px" className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" priority={index === 0} />
                                                </Card3DTilt>
                                            </div>
                                            <div className="flex min-h-[30px] flex-col justify-center gap-0.5 sm:min-h-[38px] sm:gap-1">
                                                <div className="flex items-center justify-between gap-1">
                                                    <span className="truncate text-[10px] font-semibold text-white sm:text-xs">{card.card_name}</span>
                                                    <span className={`shrink-0 rounded border px-1 text-[7px] font-semibold sm:text-[8px] ${rarity.badgeClasses}`}>{rarity.label}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-[8px] text-slate-400 sm:text-[10px]">
                                                    <span className="max-w-[50%] truncate sm:max-w-[55%]">{card.card_set_name || "Coleção"}</span>
                                                    <div className="flex items-center gap-0.5 sm:gap-1">
                                                        <span className="rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[7px] font-bold text-slate-300 sm:text-[8px]">{formatVariantLabel(card.card_variant)}</span>
                                                        <FlagIcon country={card.card_language as CardLanguage} />
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            <div ref={sentinelRef} className="flex min-h-8 items-center justify-center" aria-hidden={!hasMore} />
                        </div>
                    )}
                </main>
            </div>

            <CardLightbox src={lightbox?.src ?? null} alt={lightbox?.alt} shineMode={lightbox?.shineMode} onClose={closeLightbox} />
        </div>
    );
}
