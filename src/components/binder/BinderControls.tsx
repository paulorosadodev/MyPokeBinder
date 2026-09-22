"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { POKEMON_151, PokemonInfo } from "@/lib/pokemon/constants";

interface BinderControlsProps {
    onSearch?: (dexId: number) => void;
}

export function BinderControls({ onSearch }: BinderControlsProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement | null>(null);

    const normalizedQuery = searchTerm.trim().toLowerCase().replace("#", "");
    const matchingPokemon: PokemonInfo[] = normalizedQuery
        ? POKEMON_151.filter((p) => {
              const matchesDex = String(p.dexId).includes(normalizedQuery);
              const matchesName = p.name.toLowerCase().includes(normalizedQuery);
              return matchesDex || matchesName;
          }).slice(0, 6)
        : [];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelectPokemon = (dexId: number) => {
        if (onSearch) {
            onSearch(dexId);
        }
        setSearchTerm("");
        setIsDropdownOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && matchingPokemon.length > 0) {
            handleSelectPokemon(matchingPokemon[0].dexId);
        } else if (e.key === "Escape") {
            setIsDropdownOpen(false);
        }
    };

    if (!onSearch) return null;

    return (
        <div ref={searchContainerRef} className="relative w-full">
            <div className="flex h-10 w-full items-center gap-2 rounded-xl border border-white/10 bg-[#121620]/85 px-3.5 shadow-lg backdrop-blur-md transition-all focus-within:border-poke-blue/60 focus-within:bg-[#151a26]">
                <Search size={15} className="flex-shrink-0 text-slate-400" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsDropdownOpen(true);
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder="Buscar Pokémon por nome ou #..."
                    aria-label="Buscar Pokémon no binder"
                    className="w-full bg-transparent text-xs text-white placeholder-slate-500 outline-none"
                />
                {searchTerm && (
                    <button
                        type="button"
                        onClick={() => {
                            setSearchTerm("");
                            setIsDropdownOpen(false);
                        }}
                        aria-label="Limpar busca"
                        className="flex-shrink-0 text-slate-400 hover:text-white"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>

            {isDropdownOpen && matchingPokemon.length > 0 && (
                <div className="absolute top-11 left-0 z-40 w-full overflow-hidden rounded-xl border border-white/10 bg-[#161a26] py-1 shadow-2xl backdrop-blur-xl">
                    {matchingPokemon.map((poke) => (
                        <button key={poke.dexId} type="button" onClick={() => handleSelectPokemon(poke.dexId)} className="flex w-full items-center justify-between px-3 py-2 text-left text-xs transition-colors hover:bg-white/10">
                            <span className="font-medium text-white">{poke.name}</span>
                            <span className="font-mono text-[11px] text-amber-400">#{String(poke.dexId).padStart(3, "0")}</span>
                        </button>
                    ))}
                </div>
            )}

            {isDropdownOpen && normalizedQuery && matchingPokemon.length === 0 && (
                <div className="absolute top-11 left-0 z-40 w-full overflow-hidden rounded-xl border border-white/10 bg-[#161a26] p-3 text-center shadow-2xl backdrop-blur-xl">
                    <span className="text-xs text-slate-400">Nenhum Pokémon dos 151 encontrado</span>
                </div>
            )}
        </div>
    );
}
