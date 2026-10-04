"use client";

import Image from "next/image";
import { Check, CircleOff, Search, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { COVER_POKEMON_PAGE_SIZE, filterCoverPokemon, getCoverPokemonPage } from "@/lib/binder/coverPokemon";
import { useInfiniteScroll } from "@/lib/hooks/useInfiniteScroll";
import { useGridColumnCount, getCompleteRowItems } from "@/lib/hooks/useGridColumnCount";
import { useDismissibleOverlay } from "@/lib/hooks/useDismissibleOverlay";
import { useOverlayPresence } from "@/lib/hooks/useOverlayPresence";
import { getPokemonThemeSelectorSpriteUrl } from "@/lib/pokemon/constants";

interface CoverPokemonSelectorProps {
    value: number | null;
    onChange: (dexId: number | null) => void;
}

export function CoverPokemonSelector({ value, onChange }: CoverPokemonSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const [scrollRoot, setScrollRoot] = useState<HTMLDivElement | null>(null);

    useDismissibleOverlay(isOpen, () => setIsOpen(false));
    const { isPresent, state } = useOverlayPresence(isOpen);
    const { pokemon, hasMore } = useMemo(() => getCoverPokemonPage(query, page, COVER_POKEMON_PAGE_SIZE), [page, query]);
    const { columns, gridRef } = useGridColumnCount();
    const displayedPokemon = useMemo(() => getCompleteRowItems(pokemon, columns, hasMore), [pokemon, columns, hasMore]);
    const selectedPokemon = value ? filterCoverPokemon(`#${value}`)[0] : null;

    const openSelector = () => {
        setQuery("");
        setPage(1);
        setIsOpen(true);
    };

    const selectPokemon = (dexId: number | null) => {
        onChange(dexId);
        setIsOpen(false);
    };

    const loadNextPage = useCallback(() => {
        setPage((currentPage) => currentPage + 1);
    }, []);

    const sentinelRef = useInfiniteScroll({
        hasMore,
        onLoadMore: loadNextPage,
        root: scrollRoot,
        enabled: isOpen,
    });

    return (
        <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-300">Pokémon da capa</label>
            <button type="button" onClick={openSelector} className="group flex min-h-12 w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-left transition-[border-color,background-color] hover:border-poke-blue/50 hover:bg-poke-blue/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-poke-blue/70">
                {selectedPokemon ? (
                    <>
                        <Image src={getPokemonThemeSelectorSpriteUrl(selectedPokemon.dexId)} alt="" width={40} height={40} unoptimized className="h-10 w-10 object-contain [image-rendering:pixelated]" />
                        <span className="min-w-0 flex-1">
                            <span className="block truncate text-xs font-bold text-white">{selectedPokemon.name}</span>
                            <span className="font-mono text-[11px] text-slate-400">#{String(selectedPokemon.dexId).padStart(3, "0")}</span>
                        </span>
                    </>
                ) : (
                    <span className="min-w-0 flex-1">
                        <span className="block text-xs font-bold text-white">Pokébola temática</span>
                        <span className="block text-[11px] text-slate-400">Escolha um Pokémon para substituir a Pokébola.</span>
                    </span>
                )}
                <span className="text-[11px] font-semibold text-slate-300 transition-colors group-hover:text-white">Escolher</span>
            </button>

            {isPresent && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="Escolher Pokémon da capa"
                    className="modal-backdrop fixed inset-0 z-[100] flex bg-[#080a10] sm:items-center sm:justify-center sm:bg-black/75 sm:p-4 sm:backdrop-blur-sm"
                    data-overlay-state={state}
                    onClick={(event) => {
                        if (event.target === event.currentTarget) setIsOpen(false);
                    }}
                >
                    <div className="modal-surface flex h-[100dvh] w-full flex-col overflow-hidden bg-[#12151d] sm:h-[85vh] sm:max-h-[820px] sm:max-w-3xl sm:rounded-2xl sm:border sm:border-white/10 sm:shadow-2xl md:max-w-5xl lg:max-w-6xl">
                        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6 sm:py-3.5">
                            <div>
                                <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">Escolher Pokémon da capa</h2>
                                <p className="mt-0.5 hidden text-xs text-slate-400 sm:block">Pesquise pelo nome ou pelo número da Pokédex usando #.</p>
                            </div>
                            <button type="button" onClick={() => setIsOpen(false)} aria-label="Fechar seletor de Pokémon da capa" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white sm:h-9 sm:w-9 sm:rounded-xl">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex shrink-0 flex-col gap-2.5 border-b border-white/10 bg-black/20 px-3 py-2.5 sm:flex-row sm:items-center sm:px-6 sm:py-3">
                            <div className="relative flex-1">
                                <Search size={16} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <input
                                    autoFocus
                                    value={query}
                                    onChange={(event) => {
                                        setQuery(event.target.value);
                                        setPage(1);
                                    }}
                                    placeholder="Ex.: Gengar ou #94"
                                    className="h-11 w-full rounded-xl border border-white/10 bg-black/25 pr-3 pl-9 text-sm text-white placeholder:text-slate-500 focus:border-poke-blue/70 focus:outline-none"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => selectPokemon(null)}
                                className={`flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border px-4 text-xs font-bold shadow-sm transition-[border-color,background-color,color,box-shadow] focus:outline-none focus-visible:ring-2 focus-visible:ring-poke-blue/70 ${value === null ? "border-poke-blue bg-poke-blue text-white hover:border-[var(--theme-primary-hover)] hover:bg-[var(--theme-primary-hover)] hover:shadow-[0_8px_20px_var(--theme-primary-glow)]" : "border-white/15 bg-white/[0.06] text-slate-200 hover:border-poke-blue/50 hover:bg-poke-blue/15 hover:text-white"}`}
                            >
                                {value === null ? <Check size={15} /> : <CircleOff size={15} />}
                                <span>Usar só a Pokébola</span>
                            </button>
                        </div>

                        <div ref={setScrollRoot} className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-6">
                            {pokemon.length > 0 ? (
                                <div ref={gridRef} className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
                                    {displayedPokemon.map((entry) => (
                                        <button
                                            key={entry.dexId}
                                            type="button"
                                            onClick={() => selectPokemon(entry.dexId)}
                                            className={`relative flex min-h-20 items-center gap-2 rounded-xl border p-2.5 text-left transition-[border-color,background-color,box-shadow] focus:outline-none focus-visible:ring-2 focus-visible:ring-poke-blue/70 ${value === entry.dexId ? "border-poke-blue bg-poke-blue/15 hover:bg-poke-blue/20 hover:shadow-[0_8px_22px_rgba(59,130,246,0.16)]" : "border-white/10 bg-white/[0.03] hover:border-poke-blue/45 hover:bg-poke-blue/10 hover:shadow-[0_8px_22px_rgba(0,0,0,0.24)]"}`}
                                        >
                                            <Image src={getPokemonThemeSelectorSpriteUrl(entry.dexId)} alt="" width={48} height={48} unoptimized className="h-12 w-12 shrink-0 object-contain [image-rendering:pixelated]" />
                                            <span className="min-w-0">
                                                <span className="block truncate text-xs font-bold text-white">{entry.name}</span>
                                                <span className="font-mono text-[11px] text-slate-400">#{String(entry.dexId).padStart(3, "0")}</span>
                                            </span>
                                            {value === entry.dexId && <Check size={14} className="absolute top-2 right-2 text-poke-blue" />}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="py-12 text-center text-sm text-slate-400">Nenhum Pokémon encontrado.</p>
                            )}
                            {pokemon.length > 0 && <div ref={sentinelRef} className="h-4" />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
