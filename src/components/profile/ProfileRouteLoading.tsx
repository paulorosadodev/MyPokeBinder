"use client";

import { ArrowLeft } from "lucide-react";
import { RouteLoading } from "@/components/loading/RouteLoading";

export function ProfileRouteLoading({ message = "Carregando perfil do treinador...", type = "profile" }: { message?: string; type?: "profile" | "collection" }) {
    const isCollection = type === "collection" || message.includes("coleção");

    if (isCollection) {
        return (
            <div className="flex min-h-screen flex-col bg-[#0a0c10]">
                <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16">
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

                    <div className="flex h-64 flex-col items-center justify-center">
                        <RouteLoading message={message} className="flex flex-col items-center justify-center" />
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-1 min-h-[calc(100dvh-4rem)] flex-col bg-[#0a0c10]">
            <RouteLoading message={message} />
        </div>
    );
}
