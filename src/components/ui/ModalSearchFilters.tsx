"use client";

import React from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { SearchInput } from "@/components/ui/SearchInput";

interface ModalSearchFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    placeholder?: string;
    placeholderClassName?: string;
    showFilters: boolean;
    onToggleFilters: () => void;
    activeFilterCount?: number;
    filterButtonAriaLabel?: string;
    children?: React.ReactNode;
    className?: string;
}

export function ModalSearchFilters({ searchTerm, onSearchChange, placeholder = "Buscar por pokémon, número, coleção ou pokédex...", placeholderClassName = "left-8.5 right-8 text-xs sm:left-10 sm:right-9 sm:text-sm", showFilters, onToggleFilters, activeFilterCount = 0, filterButtonAriaLabel = "Alternar filtros", children, className = "" }: ModalSearchFiltersProps) {
    return (
        <div className={`flex shrink-0 flex-col ${showFilters ? "gap-2" : "gap-0"} ${className}`}>
            <div className="flex items-center gap-2">
                <div className="relative min-w-0 flex-1">
                    <Search size={15} className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-slate-500 z-20 sm:left-3.5 sm:h-4 sm:w-4" />
                    <SearchInput type="text" value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} placeholder={placeholder} placeholderClassName={placeholderClassName} className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pr-8 pl-8.5 text-xs text-white transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none sm:py-2.5 sm:pr-9 sm:pl-10 sm:text-sm" />
                    {searchTerm ? (
                        <button type="button" onClick={() => onSearchChange("")} aria-label="Limpar busca" className="absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-500 hover:text-white z-20 sm:right-3">
                            <X size={14} className="sm:h-[15px] sm:w-[15px]" />
                        </button>
                    ) : null}
                </div>

                <button type="button" onClick={onToggleFilters} aria-label={filterButtonAriaLabel} aria-expanded={showFilters} className={`flex h-8.5 sm:h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border px-2.5 sm:px-3 text-xs font-semibold transition-colors ${showFilters || activeFilterCount > 0 ? "border-poke-blue/60 bg-poke-blue/20 text-white" : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"}`}>
                    <SlidersHorizontal size={13} className={activeFilterCount > 0 ? "text-poke-blue" : "text-slate-400"} />
                    <span className="inline">Filtros</span>
                    {activeFilterCount > 0 && <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-poke-blue px-1 text-[10px] font-bold text-white">{activeFilterCount}</span>}
                </button>
            </div>

            {children ? (
                <div className={`grid transition-all duration-300 ease-in-out ${showFilters ? "grid-rows-[1fr] opacity-100 mt-2 sm:mt-2.5" : "grid-rows-[0fr] opacity-0 pointer-events-none mt-0"}`}>
                    <div className="overflow-hidden">{children}</div>
                </div>
            ) : null}
        </div>
    );
}
