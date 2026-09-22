"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { useDashboardData } from "@/lib/swr";
import { PokeballLoader } from "@/components/loading/PokeballLoader";
import { DashboardMiniSlot } from "@/components/dashboard/DashboardMiniSlot";
import { BookOpen, Layers } from "lucide-react";

export default function DashboardPage() {
    const router = useRouter();
    const { data, isLoading: loading, isError, mutate } = useDashboardData();

    const handleSlotClick = useCallback(
        (dexId: number) => {
            router.push(`/?dexId=${dexId}`);
        },
        [router],
    );

    return (
        <div className="flex min-h-screen flex-col bg-[#0a0c10] text-slate-100">
            <Header />

            <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Dashboard</h1>
                    <p className="text-sm text-slate-400">Acompanhe seu progresso de coleção dos 151 Pokémon de Kanto.</p>
                </div>

                {loading ? (
                    <div className="flex h-64 flex-col items-center justify-center">
                        <PokeballLoader message="Carregando estatísticas..." size="lg" />
                    </div>
                ) : isError ? (
                    <div className="flex h-64 flex-col items-center justify-center gap-4 text-center">
                        <p className="text-sm text-red-300">Falha ao carregar os dados do dashboard.</p>
                        <button type="button" onClick={() => mutate()} className="rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20">
                            Tentar novamente
                        </button>
                    </div>
                ) : data ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121520]/80 p-6 shadow-xl backdrop-blur-md">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-slate-400">Binder 151</span>
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-poke-blue/15 text-poke-blue">
                                        <BookOpen size={18} />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-extrabold text-white">{data.total_in_binder}</span>
                                        <span className="text-base text-slate-500">/ 151</span>
                                        <span className="ml-auto text-lg font-bold text-poke-blue">{data.completion_percentage}%</span>
                                    </div>

                                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                                        <div style={{ width: `${data.completion_percentage}%` }} className="h-full rounded-full bg-poke-blue transition-all duration-700" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121520]/80 p-6 shadow-xl backdrop-blur-md">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-slate-400">Total na Coleção</span>
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-poke-blue/15 text-poke-blue">
                                        <Layers size={18} />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-extrabold text-white">{data.total_collection}</span>
                                        <span className="text-sm text-slate-500">cartas registradas</span>
                                    </div>
                                    <p className="mt-3 text-xs text-slate-400">Inclui todas as cartas ativas no binder e guardadas na coleção.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#121520]/80 p-6 shadow-xl backdrop-blur-md sm:p-7">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <h2 className="text-lg font-bold text-white">Mini-Grid dos 151 Pokémon</h2>
                                    <p className="text-xs text-slate-400">Clique em qualquer slot para abrir a página correspondente no binder.</p>
                                </div>

                                <div className="flex items-center gap-4 text-xs">
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-3 w-3 rounded border border-white/15 bg-white/5" />
                                        <span className="text-slate-500">Vazio</span>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        <div className="h-3 w-3 rounded border border-poke-blue bg-poke-blue/30" />
                                        <span className="text-slate-200">Preenchido</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-[repeat(auto-fill,minmax(54px,1fr))] gap-2">
                                {data.slots.map((slot, index) => (
                                    <DashboardMiniSlot key={slot.pokemon_dex_id} slot={slot} index={index} onClick={handleSlotClick} />
                                ))}
                            </div>
                        </div>
                    </>
                ) : null}
            </main>
        </div>
    );
}
