"use client";

import { ArrowLeft } from "lucide-react";
import { CardGridSkeleton } from "@/components/loading/CardGridSkeleton";

export function ProfileRouteLoading({ message = "Carregando perfil do treinador...", type = "profile" }: { message?: string; type?: "profile" | "collection" }) {
    const isCollection = type === "collection" || message.includes("coleção");

    if (isCollection) {
        return (
            <div className="flex min-h-screen flex-col bg-[#0a0c10]">
                <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16">
                    <header className="flex flex-col gap-4">
                        <div className="inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-slate-400">
                            <ArrowLeft size={14} />
                            <span>Perfil</span>
                        </div>

                        <div className="flex items-center gap-3.5 sm:gap-4">
                            <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-full border border-white/20 bg-white/10 animate-pulse" />
                            <div className="min-w-0 flex-1 space-y-1.5">
                                <div className="h-2.5 w-12 rounded bg-white/10 animate-pulse" />
                                <div className="h-5 sm:h-6 w-36 sm:w-48 rounded-lg bg-white/10 animate-pulse" />
                                <div className="h-3 w-28 rounded bg-white/5 animate-pulse" />
                            </div>
                        </div>
                    </header>

                    <div className="relative z-30 flex flex-col rounded-2xl border border-white/10 bg-[#121520]/80 p-2.5 sm:p-3.5 shadow-xl backdrop-blur-md">
                        <div className="flex items-center gap-2">
                            <div className="h-9 sm:h-10 flex-1 rounded-xl border border-white/10 bg-white/5 animate-pulse" />
                            <div className="h-9 sm:h-10 w-20 sm:w-24 shrink-0 rounded-xl border border-white/10 bg-white/5 animate-pulse" />
                        </div>
                    </div>

                    <CardGridSkeleton count={18} />
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-[calc(100dvh-4rem)] flex-col bg-[#0a0c10] animate-pulse">
            <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 pb-28 sm:px-6 sm:py-8 md:pb-16">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#161a26]/90 via-[#10131d]/90 to-[#0c0e15]/90 shadow-2xl backdrop-blur-xl">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4 p-6 sm:gap-5 sm:p-8">
                            <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-full border-2 border-white/20 bg-white/10" />
                            <div className="min-w-0 flex-1 space-y-2">
                                <div className="h-6 w-36 sm:w-48 rounded-lg bg-white/10" />
                                <div className="h-3.5 w-24 rounded bg-poke-blue/20" />
                                <div className="h-3 w-40 rounded bg-white/5" />
                            </div>
                        </div>
                        <div className="flex w-full items-center gap-2.5 px-6 pb-6 sm:w-auto sm:p-8 sm:pl-0">
                            <div className="h-9 flex-1 sm:w-28 rounded-xl border border-white/10 bg-white/5" />
                            <div className="h-9 flex-1 sm:w-32 rounded-xl border border-white/10 bg-white/5" />
                        </div>
                    </div>
                </div>

                <section className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-gradient-to-b from-[#161a26]/90 via-[#10131d]/90 to-[#0c0e15]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 shrink-0 rounded-2xl border border-white/10 bg-white/10" />
                        <div className="space-y-2">
                            <div className="h-3 w-28 rounded bg-white/10" />
                            <div className="h-6 w-48 rounded-lg bg-white/15" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-[#12151d]/90 p-4">
                                <div className="h-3 w-16 rounded bg-white/10" />
                                <div className="h-7 w-20 rounded-lg bg-white/15" />
                            </div>
                        ))}
                    </div>

                    <div className="h-28 rounded-2xl border border-white/5 bg-white/[0.02]" />
                </section>
            </main>
        </div>
    );
}
