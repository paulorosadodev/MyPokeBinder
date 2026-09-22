"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { PokeballLoader } from "@/components/loading/PokeballLoader";
import { FlagIcon } from "@/components/ui/FlagIcon";

import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { Select, SelectOption } from "@/components/ui/Select";
import { CardSearchModal } from "@/components/modal/CardSearchModal";
import { formatTcgdexImageUrl } from "@/lib/pokemon/tcgdex";
import { getPokemonSilhouetteUrl, POKEMON_151, markSilhouetteLoaded } from "@/lib/pokemon/constants";
import { getRarityBadgeStyle, RARITY_FILTER_OPTIONS } from "@/lib/pokemon/rarity";
import { cardCopyGroupKey, formatVariantLabel, resolveCardShine } from "@/lib/pokemon/variant";
import { getCardAppearProps } from "@/lib/ui/cardAppear";
import { useAllCollectionCards } from "@/lib/swr";
import { UserCard, CardLanguage, CollectionCardGroup, BinderStatusFilter } from "@/types/binder";
import { Search, Plus, Sparkles, BookOpen, Layers, Filter, X, ArrowUpDown, Globe } from "lucide-react";

type SortField = "dex" | "name" | "recent";
type SortDirection = "asc" | "desc";

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

export default function CollectionPage() {
    const router = useRouter();
    const { cards, isLoading, isError, mutate } = useAllCollectionCards();

    const [searchTerm, setSearchTerm] = useState(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = sessionStorage.getItem("mypokebinder_collection_filters");
                if (saved) return JSON.parse(saved).searchTerm || "";
            } catch {}
        }
        return "";
    });
    const [statusFilter, setStatusFilter] = useState<BinderStatusFilter>(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = sessionStorage.getItem("mypokebinder_collection_filters");
                if (saved) return JSON.parse(saved).statusFilter || "all";
            } catch {}
        }
        return "all";
    });
    const [languageFilter, setLanguageFilter] = useState<string>(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = sessionStorage.getItem("mypokebinder_collection_filters");
                if (saved) return JSON.parse(saved).languageFilter || "all";
            } catch {}
        }
        return "all";
    });
    const [rarityFilter, setRarityFilter] = useState<string>(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = sessionStorage.getItem("mypokebinder_collection_filters");
                if (saved) return JSON.parse(saved).rarityFilter || "all";
            } catch {}
        }
        return "all";
    });
    const [sortField, setSortField] = useState<SortField>(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = sessionStorage.getItem("mypokebinder_collection_filters");
                if (saved) return JSON.parse(saved).sortField || "dex";
            } catch {}
        }
        return "dex";
    });
    const [sortDirection, setSortDirection] = useState<SortDirection>(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = sessionStorage.getItem("mypokebinder_collection_filters");
                if (saved) return JSON.parse(saved).sortDirection || "asc";
            } catch {}
        }
        return "asc";
    });

    const [isPokemonPickerOpen, setIsPokemonPickerOpen] = useState(false);
    const [pokemonPickerSearch, setPokemonPickerSearch] = useState("");

    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [selectedDexId, setSelectedDexId] = useState(1);
    const [selectedPokemonName, setSelectedPokemonName] = useState("Bulbasaur");

    const groupedCards = useMemo(() => {
        const groupsMap = new Map<string, CollectionCardGroup>();

        cards.forEach((c) => {
            const groupKey = cardCopyGroupKey(c);
            const existing = groupsMap.get(groupKey);

            if (existing) {
                existing.copies.push(c);
                existing.totalCount += 1;
                if (c.is_in_binder) existing.hasInBinder = true;
            } else {
                groupsMap.set(groupKey, {
                    key: groupKey,
                    card: c,
                    copies: [c],
                    totalCount: 1,
                    hasInBinder: Boolean(c.is_in_binder),
                });
            }
        });

        return Array.from(groupsMap.values());
    }, [cards]);

    const filteredAndSortedGroups = useMemo(() => {
        let list = groupedCards.filter((group) => {
            const card = group.card;

            if (searchTerm.trim()) {
                const term = searchTerm.toLowerCase().trim();
                const matchesName = card.card_name.toLowerCase().includes(term);
                const matchesSet = card.card_set_name.toLowerCase().includes(term);
                const matchesDex = `#${card.pokemon_dex_id}`.includes(term) || String(card.pokemon_dex_id) === term;
                if (!matchesName && !matchesSet && !matchesDex) return false;
            }

            if (statusFilter === "in_binder" && !group.hasInBinder) return false;
            if (statusFilter === "stored" && group.hasInBinder && group.totalCount === 1) return false;

            if (languageFilter !== "all" && card.card_language !== languageFilter) return false;

            if (rarityFilter !== "all") {
                const lower = (card.card_rarity || "").trim().toLowerCase();
                if (!lower.includes(rarityFilter)) return false;
            }

            return true;
        });

        list.sort((a, b) => {
            if (sortField === "dex") {
                return sortDirection === "asc" ? a.card.pokemon_dex_id - b.card.pokemon_dex_id : b.card.pokemon_dex_id - a.card.pokemon_dex_id;
            }
            if (sortField === "name") {
                return sortDirection === "asc" ? a.card.card_name.localeCompare(b.card.card_name) : b.card.card_name.localeCompare(a.card.card_name);
            }
            if (sortField === "recent") {
                const timeA = new Date(a.card.created_at).getTime();
                const timeB = new Date(b.card.created_at).getTime();
                return sortDirection === "asc" ? timeA - timeB : timeB - timeA;
            }
            return 0;
        });

        return list;
    }, [groupedCards, searchTerm, statusFilter, languageFilter, rarityFilter, sortField, sortDirection]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            sessionStorage.setItem(
                "mypokebinder_collection_filters",
                JSON.stringify({
                    searchTerm,
                    statusFilter,
                    languageFilter,
                    rarityFilter,
                    sortField,
                    sortDirection,
                }),
            );
        } catch {}
    }, [searchTerm, statusFilter, languageFilter, rarityFilter, sortField, sortDirection]);

    const filteredPokemonList = useMemo(() => {
        if (!pokemonPickerSearch.trim()) return POKEMON_151;
        const term = pokemonPickerSearch.toLowerCase().trim();
        return POKEMON_151.filter((p) => p.name.toLowerCase().includes(term) || String(p.dexId) === term || `#${p.dexId}`.includes(term));
    }, [pokemonPickerSearch]);

    const handleSelectPokemonForSearch = (dexId: number, name: string) => {
        setSelectedDexId(dexId);
        setSelectedPokemonName(name);
        setIsPokemonPickerOpen(false);
        setIsSearchModalOpen(true);
    };

    const handleCardAdded = (newCard: UserCard) => {
        mutate();
    };

    const totalPhysicalCopies = cards.length;
    const uniquePokemonInCollection = new Set(cards.map((c) => c.pokemon_dex_id)).size;

    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Minha Coleção</h1>
                        <p className="mt-1 text-sm text-slate-400">
                            {totalPhysicalCopies === 1 ? "1 exemplar cadastrado" : `${totalPhysicalCopies} exemplares cadastrados`} abrangendo {uniquePokemonInCollection} de 151 Pokémon.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setPokemonPickerSearch("");
                            setIsPokemonPickerOpen(true);
                        }}
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-poke-blue px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-opacity hover:opacity-90"
                    >
                        <Plus size={18} />
                        <span>Adicionar Carta</span>
                    </button>
                </div>

                <div className="relative z-30 flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#121520]/80 p-3.5 sm:p-4 shadow-xl backdrop-blur-md">
                    <div className="relative w-full">
                        <Search size={16} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-500" />
                        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar por nome do Pokémon, número ou coleção..." className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pr-9 pl-10 text-xs sm:text-sm text-white placeholder-slate-500 transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none" />
                        {searchTerm && (
                            <button type="button" onClick={() => setSearchTerm("")} aria-label="Limpar busca" className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-500 hover:text-white">
                                <X size={15} />
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-3 sm:flex sm:flex-wrap sm:items-center sm:gap-2.5 lg:justify-between">
                        <div className="contents sm:flex sm:flex-wrap sm:items-center sm:gap-2.5">
                            <Select<BinderStatusFilter> value={statusFilter} onChange={setStatusFilter} options={STATUS_FILTER_OPTIONS} icon={<BookOpen size={13} />} ariaLabel="Filtrar coleção por status no binder" className="w-full sm:w-[170px]" />

                            <Select<string> value={languageFilter} onChange={setLanguageFilter} options={LANGUAGE_FILTER_OPTIONS} icon={<Globe size={13} />} ariaLabel="Filtrar coleção por idioma da carta" className="w-full sm:w-[180px]" menuClassName="sm:left-0 sm:right-auto" align="right" />

                            <Select<string> value={rarityFilter} onChange={setRarityFilter} options={RARITY_FILTER_OPTIONS} icon={<Sparkles size={13} />} ariaLabel="Filtrar coleção por raridade" className="w-full sm:w-[195px]" />
                        </div>

                        <div className="flex w-full items-center gap-1.5 sm:w-auto lg:ml-auto">
                            <Select<SortField> value={sortField} onChange={setSortField} options={SORT_FIELD_OPTIONS} icon={<ArrowUpDown size={13} />} ariaLabel="Ordenar coleção" className="flex-1 sm:w-[180px]" align="right" />
                            <button
                                type="button"
                                onClick={() => setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))}
                                aria-label={sortDirection === "asc" ? "Ordem crescente. Clique para inverter para decrescente." : "Ordem decrescente. Clique para inverter para crescente."}
                                title={sortDirection === "asc" ? "Crescente (Clique para inverter)" : "Decrescente (Clique para inverter)"}
                                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-poke-blue/50 hover:bg-white/10 hover:text-white active:scale-95"
                            >
                                <ArrowUpDown size={15} className={`transition-transform duration-200 ${sortDirection === "desc" ? "rotate-180 text-poke-blue" : ""}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex h-64 flex-col items-center justify-center">
                        <PokeballLoader message="Carregando sua coleção..." size="lg" />
                    </div>
                ) : isError ? (
                    <div className="flex h-96 flex-col items-center justify-center gap-4 text-center">
                        <p className="text-sm text-red-300">Falha ao carregar suas cartas.</p>
                        <button type="button" onClick={() => mutate()} className="rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20">
                            Tentar novamente
                        </button>
                    </div>
                ) : cards.length === 0 ? (
                    <div className="flex h-64 flex-col items-center justify-center gap-3 text-center">
                        <Layers size={32} className="text-slate-600" />
                        <div>
                            <p className="text-sm font-semibold text-white">Sua coleção está vazia</p>
                            <p className="mt-1 text-xs text-slate-400">Comece a adicionar cartas físicas para acompanhar seus Pokémon.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setPokemonPickerSearch("");
                                setIsPokemonPickerOpen(true);
                            }}
                            className="mt-2 flex cursor-pointer items-center gap-2 rounded-xl bg-poke-blue px-5 py-2.5 text-xs font-semibold text-white shadow-md transition-opacity hover:opacity-90"
                        >
                            <Plus size={16} />
                            <span>Adicionar primeira carta</span>
                        </button>
                    </div>
                ) : filteredAndSortedGroups.length === 0 ? (
                    <div className="flex h-64 flex-col items-center justify-center gap-3 text-center">
                        <Search size={32} className="text-slate-600" />
                        <div>
                            <p className="text-sm font-semibold text-white">Nenhuma carta encontrada</p>
                            <p className="mt-1 text-xs text-slate-400">Tente ajustar seus termos de busca ou filtros.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                setSearchTerm("");
                                setStatusFilter("all");
                                setLanguageFilter("all");
                                setRarityFilter("all");
                                setSortField("dex");
                                setSortDirection("asc");
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
                    <div className="relative z-0 isolate grid grid-cols-3 gap-2 auto-rows-fr sm:grid-cols-3 sm:gap-3.5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {filteredAndSortedGroups.map((group, index) => {
                            const card = group.card;
                            const appear = getCardAppearProps(index);

                            return (
                                <div key={group.key} onClick={() => router.push(`/cards/${card.id}?from=collection`)} className={`group relative flex cursor-pointer flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-1.5 transition-all duration-200 hover:border-poke-blue/50 hover:bg-white/[0.06] sm:p-2.5 ${appear.className}`} style={appear.style}>
                                    <div className="z-10 flex min-h-[20px] items-center justify-between sm:min-h-[26px]">
                                        <span className="rounded bg-black/60 px-1 py-0.5 text-[9px] font-bold text-slate-300 backdrop-blur-sm sm:px-1.5 sm:text-[10px]">#{String(card.pokemon_dex_id).padStart(3, "0")}</span>

                                        <div className="flex items-center gap-0.5 sm:gap-1">
                                            {group.hasInBinder && (
                                                <span title="No Binder" aria-label="No Binder" className="flex items-center justify-center rounded border border-poke-blue/40 bg-poke-blue/20 p-0.5 text-poke-blue sm:p-1">
                                                    <BookOpen size={11} className="sm:h-3 sm:w-3" />
                                                </span>
                                            )}

                                            {group.totalCount > 1 && (
                                                <span title={`${group.totalCount} cópias idênticas`} className="rounded bg-poke-blue px-1 py-0.5 text-[8px] font-extrabold text-white shadow-md sm:px-1.5 sm:text-[10px]">
                                                    x{group.totalCount}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="relative my-1 aspect-[2.5/3.5] w-full sm:my-2">
                                        <Card3DTilt className="relative h-full w-full overflow-hidden rounded-lg" maxTilt={8} maxMove={3} scale={1} glareOpacity={0.2} perspective={900} shineMode={resolveCardShine(card.card_variant, card.card_rarity)}>
                                            <Image src={formatTcgdexImageUrl(card.card_image_url)} alt={card.card_name} fill unoptimized sizes="(max-width: 640px) 30vw, (max-width: 768px) 33vw, 200px" className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" />
                                        </Card3DTilt>
                                    </div>

                                    <div className="flex min-h-[30px] flex-col justify-center gap-0.5 sm:min-h-[38px] sm:gap-1">
                                        <div className="flex items-center justify-between gap-1">
                                            <span className="truncate text-[10px] font-semibold text-white transition-colors group-hover:text-poke-blue sm:text-xs">{card.card_name}</span>
                                            {card.card_rarity && <span className={`shrink-0 rounded px-1 text-[7px] font-semibold border sm:text-[8px] ${getRarityBadgeStyle(card.card_rarity).badgeClasses}`}>{getRarityBadgeStyle(card.card_rarity).label}</span>}
                                        </div>

                                        <div className="flex items-center justify-between text-[8px] text-slate-400 sm:text-[10px]">
                                            <span className="max-w-[50%] truncate sm:max-w-[55%]">{card.card_set_name || "Coleção"}</span>
                                            <div className="flex items-center gap-0.5 sm:gap-1">
                                                <span className="rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[7px] font-bold text-slate-300 sm:text-[8px]">{formatVariantLabel(card.card_variant)}</span>
                                                <FlagIcon country={card.card_language as CardLanguage} />
                                                <span className="text-[7px] font-bold uppercase sm:text-[9px]">{card.card_language}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            {isPokemonPickerOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsPokemonPickerOpen(false);
                    }}
                >
                    <div className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#12151d] shadow-2xl md:max-w-4xl lg:max-w-5xl">
                        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                            <div>
                                <h3 className="text-lg font-bold text-white">Escolha um Pokémon</h3>
                                <p className="mt-0.5 text-xs text-slate-400">Selecione o Pokémon para procurar cartas no catálogo</p>
                            </div>
                            <button type="button" onClick={() => setIsPokemonPickerOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="border-b border-white/5 bg-black/20 p-4">
                            <div className="relative">
                                <Search size={16} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-500" />
                                <input type="text" value={pokemonPickerSearch} onChange={(e) => setPokemonPickerSearch(e.target.value)} placeholder="Filtrar por nome ou número (#001 a #151)..." className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pr-4 pl-10 text-xs text-white placeholder-slate-500 focus:border-poke-blue/60 focus:outline-none" autoFocus />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 md:p-5">
                            {filteredPokemonList.length === 0 ? (
                                <div className="flex h-48 flex-col items-center justify-center gap-2 text-center text-slate-500">
                                    <Search size={28} className="text-slate-600" />
                                    <span className="text-xs">Nenhum Pokémon encontrado com esse nome ou número.</span>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                                    {filteredPokemonList.map((p, index) => {
                                        const appear = getCardAppearProps(index, { stepMs: 25, maxDelayMs: 400 });

                                        return (
                                            <button key={p.dexId} type="button" onClick={() => handleSelectPokemonForSearch(p.dexId, p.name)} className={`group flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center transition-all hover:border-poke-blue/40 hover:bg-white/[0.06] sm:gap-2.5 sm:p-3.5 ${appear.className}`} style={appear.style}>
                                                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#0d1017] sm:h-14 sm:w-14">
                                                    <Image src={getPokemonSilhouetteUrl(p.dexId)} alt={p.name} fill sizes="56px" className="object-contain opacity-50 transition-opacity group-hover:opacity-80" onLoad={() => markSilhouetteLoaded(p.dexId)} />
                                                </div>
                                                <div className="flex w-full min-w-0 flex-col items-center gap-1">
                                                    <span className="w-full text-xs font-semibold leading-snug text-balance text-white transition-colors group-hover:text-poke-blue sm:text-[13px]">{p.name}</span>
                                                    <span className="rounded border border-white/5 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] font-medium text-slate-400">#{String(p.dexId).padStart(3, "0")}</span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <CardSearchModal isOpen={isSearchModalOpen} dexId={selectedDexId} pokemonName={selectedPokemonName} onClose={() => setIsSearchModalOpen(false)} onCardAdded={handleCardAdded} />
        </div>
    );
}
