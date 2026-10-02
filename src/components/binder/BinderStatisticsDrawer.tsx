"use client";

import { useMemo } from "react";
import Image from "next/image";
import { X, Trophy, Layers, Target, CheckCircle2, BookOpen } from "lucide-react";
import { formatTcgdexImageUrl } from "@/lib/pokemon/tcgdex";
import { getPokemonSilhouetteUrl } from "@/lib/pokemon/constants";
import { getCoverTheme } from "@/lib/binder/themes";
import { getBinderSlotPageCount } from "@/lib/binder/pageCapacity";
import { useDismissibleOverlay } from "@/lib/hooks/useDismissibleOverlay";
import { useOverlayPresence } from "@/lib/hooks/useOverlayPresence";
import type { Binder, BinderSlot } from "@/types/binder";

interface BinderStatisticsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    binder: Binder;
    slots: BinderSlot[];
    onSlotNavigate: (pageNumber: number, slotId: string) => void;
}

export function BinderStatisticsDrawer({ isOpen, onClose, binder, slots, onSlotNavigate }: BinderStatisticsDrawerProps) {
    useDismissibleOverlay(isOpen, onClose);
    const { isPresent, state } = useOverlayPresence(isOpen);
    const theme = useMemo(() => getCoverTheme(binder.cover_theme), [binder.cover_theme]);

    const stats = useMemo(() => {
        const totalSlots = slots.length;
        const filledSlots = slots.filter((s) => Boolean(s.user_card_id || s.card)).length;
        const goalSlots = slots.filter((s) => s.slot_type === "pokemon" || s.slot_type === "card");
        const hasGoals = goalSlots.length > 0;
        const filledGoals = goalSlots.filter((s) => Boolean(s.user_card_id || s.card)).length;

        const occupancyPercentage = totalSlots > 0 ? Math.round((filledSlots / totalSlots) * 100) : 0;
        const goalsPercentage = hasGoals ? Math.round((filledGoals / goalSlots.length) * 100) : 0;

        return {
            totalSlots,
            filledSlots,
            hasGoals,
            totalGoals: goalSlots.length,
            filledGoals,
            occupancyPercentage,
            goalsPercentage,
        };
    }, [slots]);

    const pagesMap = useMemo(() => {
        const map = new Map<number, BinderSlot[]>();
        for (let p = 1; p <= getBinderSlotPageCount(binder.total_pages); p++) {
            map.set(p, []);
        }
        for (const slot of slots) {
            const pageSlots = map.get(slot.page_number) || [];
            pageSlots.push(slot);
            map.set(slot.page_number, pageSlots);
        }
        return map;
    }, [binder.total_pages, slots]);

    if (!isPresent) return null;

    const gridMinimapClass = binder.grid_type === "1x1" ? "grid-cols-1" : binder.grid_type === "2x2" ? "grid-cols-2" : "grid-cols-3";

    return (
        <div
            className="modal-backdrop fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
            data-overlay-state={state}
            role="dialog"
            aria-modal="true"
            aria-label="Estatísticas do binder"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="drawer-surface flex h-[100dvh] w-screen max-w-none flex-col bg-[#0e121a] shadow-2xl md:h-full md:w-full md:max-w-md md:border-l md:border-white/10">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg shadow-sm" style={{ backgroundColor: `${theme.primaryColor}25`, color: theme.primaryColor }}>
                            <Trophy size={16} />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-white">Estatísticas do Binder</h2>
                            <p className="text-[11px] text-slate-400">{binder.name}</p>
                        </div>
                    </div>

                    <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white">
                        <X size={16} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-3">
                        {stats.hasGoals ? (
                            <>
                                <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                                    <div className="flex items-center justify-between text-xs text-slate-400">
                                        <span className="flex items-center gap-1 font-medium">
                                            <Target size={13} className="text-poke-blue" />
                                            Metas
                                        </span>
                                        <span className="font-mono font-bold text-white">{stats.goalsPercentage}%</span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-black text-white">{stats.filledGoals}</span>
                                        <span className="text-xs text-slate-500">/ {stats.totalGoals}</span>
                                    </div>
                                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                                        <div className="h-full rounded-full bg-poke-blue transition-all" style={{ width: `${stats.goalsPercentage}%` }} />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                                    <div className="flex items-center justify-between text-xs text-slate-400">
                                        <span className="flex items-center gap-1 font-medium">
                                            <Layers size={13} className="text-emerald-400" />
                                            Ocupação
                                        </span>
                                        <span className="font-mono font-bold text-white">{stats.occupancyPercentage}%</span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-black text-white">{stats.filledSlots}</span>
                                        <span className="text-xs text-slate-500">/ {stats.totalSlots}</span>
                                    </div>
                                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                                        <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${stats.occupancyPercentage}%` }} />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="col-span-2 flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                                <div className="flex items-center justify-between text-xs text-slate-400">
                                    <span className="flex items-center gap-1 font-medium">
                                        <Layers size={14} className="text-poke-blue" />
                                        Ocupação Física (Binder Livre)
                                    </span>
                                    <span className="font-mono font-bold text-white">{stats.occupancyPercentage}%</span>
                                </div>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-3xl font-black text-white">{stats.filledSlots}</span>
                                    <span className="text-sm text-slate-500">/ {stats.totalSlots} compartimentos preenchidos</span>
                                </div>
                                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/10">
                                    <div className="h-full rounded-full bg-poke-blue transition-all" style={{ width: `${stats.occupancyPercentage}%` }} />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Mapa Visual das Folhas</span>
                            <span className="text-[11px] text-slate-500">Clique para ir direto à página</span>
                        </div>

                        <div className="flex flex-col gap-4">
                            {Array.from(pagesMap.entries()).map(([pageNum, pageSlots]) => (
                                <div key={pageNum} className="flex flex-col gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                                    <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
                                        <span className="text-slate-300 font-semibold">Página {pageNum}</span>
                                        <span>
                                            {pageSlots.filter((s) => s.user_card_id || s.card).length} / {pageSlots.length}
                                        </span>
                                    </div>

                                    <div className={`grid gap-1.5 ${gridMinimapClass}`}>
                                        {pageSlots.map((slot) => {
                                            const isFilled = Boolean(slot.user_card_id || slot.card);
                                            const cardImg = slot.card?.card_image_url;

                                            return (
                                                <button
                                                    key={slot.id}
                                                    type="button"
                                                    onClick={() => {
                                                        onSlotNavigate(slot.page_number, slot.id);
                                                        onClose();
                                                    }}
                                                    className={`group relative flex aspect-[8/11] items-center justify-center overflow-hidden rounded-lg border text-left transition-all ${isFilled ? "border-poke-blue/50 bg-[#141b2b] hover:border-poke-blue hover:scale-105" : slot.slot_type === "free" ? "border-dashed border-white/15 bg-black/30 hover:border-white/40" : "border-white/10 bg-[#0d1017] hover:border-white/30"}`}
                                                >
                                                    {isFilled && cardImg ? (
                                                        <Image src={formatTcgdexImageUrl(cardImg)} alt="" fill sizes="40px" className="object-contain p-0.5" unoptimized />
                                                    ) : slot.slot_type === "pokemon" && slot.target_dex_id ? (
                                                        <Image src={getPokemonSilhouetteUrl(slot.target_dex_id)} alt="" fill sizes="40px" className="object-contain p-1 opacity-40 group-hover:opacity-70" unoptimized />
                                                    ) : slot.slot_type === "card" && slot.target_card_image_url ? (
                                                        <Image src={formatTcgdexImageUrl(slot.target_card_image_url)} alt="" fill sizes="40px" className="object-contain p-0.5 opacity-25 grayscale group-hover:opacity-50" unoptimized />
                                                    ) : (
                                                        <span className="text-[9px] font-mono text-slate-500">{slot.slot_index}</span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
