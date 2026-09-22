"use client";

import { useState, useMemo } from "react";
import { UserCard } from "@/types/binder";
import { TOTAL_PAGES, SLOTS_PER_PAGE, getDesktopSpreadPages } from "@/lib/pokemon/constants";

interface BinderPageNavProps {
    activePages: number[];
    cardsMap: Map<number, UserCard>;
    onSelectPage: (page: number) => void;
    isMobile: boolean;
}

export function BinderPageNav({ activePages, cardsMap, onSelectPage, isMobile }: BinderPageNavProps) {
    const [hoveredPage, setHoveredPage] = useState<number | null>(null);

    const hoveredPagesList = useMemo(() => {
        if (hoveredPage === null) return [];
        if (isMobile) return [hoveredPage];
        const [left, right] = getDesktopSpreadPages(hoveredPage);
        return right !== null ? [left, right] : [left];
    }, [hoveredPage, isMobile]);

    const pageStats = useMemo(() => {
        return Array.from({ length: TOTAL_PAGES }, (_, i) => {
            const pageNum = i + 1;
            const startDex = (pageNum - 1) * SLOTS_PER_PAGE + 1;
            const endDex = Math.min(pageNum * SLOTS_PER_PAGE, 151);
            const totalSlots = endDex - startDex + 1;

            let filledCount = 0;
            for (let d = startDex; d <= endDex; d++) {
                if (cardsMap.has(d)) {
                    filledCount++;
                }
            }

            return {
                pageNum,
                startDex,
                endDex,
                totalSlots,
                filledCount,
                percentFilled: (filledCount / totalSlots) * 100,
                isFull: filledCount === totalSlots && totalSlots > 0,
            };
        });
    }, [cardsMap]);

    const renderPageButton = (item: (typeof pageStats)[0]) => {
        const isActive = activePages.includes(item.pageNum);
        const isHovered = hoveredPagesList.includes(item.pageNum);

        return (
            <button
                key={item.pageNum}
                type="button"
                onClick={() => onSelectPage(item.pageNum)}
                onMouseEnter={() => setHoveredPage(item.pageNum)}
                onMouseLeave={() => setHoveredPage(null)}
                aria-label={`Ir para Página ${item.pageNum}, ${item.filledCount} de ${item.totalSlots} cartas`}
                aria-current={isActive ? "page" : undefined}
                className={`group relative flex flex-1 min-w-0 flex-col items-center justify-center rounded-lg transition-colors duration-150 outline-none overflow-hidden select-none ${isMobile ? "h-11 px-0.5 pt-1 pb-2" : "h-12 md:h-13 px-1 pt-1.5 pb-2.5"} ${isActive ? "bg-[var(--theme-primary)]/20 border border-[var(--theme-primary)]/40 text-white shadow-[0_0_12px_var(--theme-primary-glow)] z-10" : isHovered ? "bg-white/[0.08] text-slate-100" : "bg-white/[0.02] text-slate-400 hover:bg-white/[0.05] hover:text-slate-200"}`}
            >
                <span className={`leading-none font-bold transition-colors duration-150 ${isMobile ? "text-xs" : "text-xs md:text-sm lg:text-base"} ${isActive ? "text-[var(--theme-primary)] font-bold" : isHovered ? "text-slate-100" : "text-slate-300"}`}>{item.pageNum}</span>

                <span className={`font-mono leading-none whitespace-nowrap tracking-tight transition-colors duration-150 mt-1 ${isMobile ? "text-[9px]" : "text-[10px] md:text-[11px]"} ${item.isFull ? "text-emerald-400 font-semibold" : isActive ? "text-[var(--theme-primary)] font-medium" : "text-slate-500 group-hover:text-slate-300"}`}>
                    {item.filledCount}/{item.totalSlots}
                </span>

                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] sm:h-[3px] bg-white/10 overflow-hidden">
                    <div style={{ width: `${item.percentFilled}%` }} className={`h-full transition-all duration-300 ${item.isFull ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" : item.percentFilled > 0 ? "bg-[var(--theme-primary)] shadow-[0_0_6px_var(--theme-primary-glow)]" : "bg-transparent"}`} />
                </div>
            </button>
        );
    };

    return (
        <nav aria-label="Navegação rápida de páginas" className="w-full px-1 sm:px-2 lg:px-0">
            <div className="rounded-2xl border border-white/10 bg-[#10131b]/90 p-1.5 sm:p-2.5 shadow-2xl backdrop-blur-xl">
                {isMobile ? (
                    <div className="flex flex-col gap-1.5 w-full">
                        <div className="grid grid-cols-9 gap-1 w-full">{pageStats.slice(0, 9).map(renderPageButton)}</div>
                        <div className="grid grid-cols-8 gap-1 w-full max-w-[89%] mx-auto">{pageStats.slice(9, 17).map(renderPageButton)}</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-17 gap-1 sm:gap-1.5 w-full">{pageStats.map(renderPageButton)}</div>
                )}
            </div>
        </nav>
    );
}
