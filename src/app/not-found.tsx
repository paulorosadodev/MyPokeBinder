"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Compass, Layers } from "lucide-react";
import { PokeballLogo } from "@/components/ui/PokeballLogo";
import { getPokemonSilhouetteUrl } from "@/lib/pokemon/constants";

export default function NotFound() {
    const handleGoBack = () => {
        if (typeof window !== "undefined") {
            window.history.back();
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#0a0c10] text-slate-100 relative overflow-hidden selection:bg-red-500/30 selection:text-white">
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
                <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/[0.03] blur-[140px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-sky-500/[0.02] blur-[120px] rounded-full" />
                <svg viewBox="0 0 100 100" className="absolute -right-20 top-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-[0.015] text-white stroke-current fill-none stroke-[2]">
                    <circle cx="50" cy="50" r="46" />
                    <line x1="4" y1="50" x2="96" y2="50" strokeWidth="4" />
                    <circle cx="50" cy="50" r="14" strokeWidth="4" />
                </svg>
            </div>

            <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
                <Link href="/" className="inline-flex items-center gap-2.5 group transition-transform hover:scale-[1.02] active:scale-[0.98]">
                    <PokeballLogo size="sm" animated color="#ef4444" />
                    <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">MyPokeBinder</span>
                </Link>
            </header>

            <main className="flex-1 relative z-10 flex items-center justify-center px-4 py-8 sm:py-16">
                <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
                    <div className="profile-enter md:col-span-5 flex flex-col items-center justify-center order-1">
                        <div className="relative flex items-center justify-center select-none" aria-label="Ilustração do Pokémon Psyduck confuso">
                            <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-amber-500/[0.05] border border-amber-500/10 pointer-events-none transition-transform duration-500 hover:scale-105" />
                            <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-yellow-500/[0.03] border border-yellow-500/10 pointer-events-none" />

                            <div className="relative z-10 w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 transition-all duration-300 select-none hover:scale-105">
                                <Image src={getPokemonSilhouetteUrl(54)} alt="Ilustração do Pokémon Psyduck segurando a cabeça em confusão" fill sizes="(max-width: 640px) 210px, (max-width: 768px) 260px, 320px" className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.65)]" unoptimized />
                            </div>
                        </div>
                    </div>

                    <div className="profile-enter profile-enter-d1 md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left space-y-5 order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs font-semibold">
                            <Compass size={14} className="text-amber-400 shrink-0" />
                            <span>Rota 404 · Não Encontrada</span>
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                                Psyduck está confuso.
                                <br className="hidden sm:inline" /> Página não encontrada.
                            </h1>
                            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-lg">O endereço acessado não existe ou foi movido para outro local. Até o Psyduck tentou usar seus poderes psíquicos para encontrá-lo, mas acabou com uma bela dor de cabeça.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
                            <Link href="/" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-all active:scale-[0.98] shadow-lg shadow-amber-500/20">
                                <BookOpen size={16} />
                                <span>Voltar ao Meu Binder</span>
                            </Link>

                            <Link href="/colecao" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 font-semibold text-sm transition-all active:scale-[0.98]">
                                <Layers size={16} />
                                <span>Explorar Coleção</span>
                            </Link>
                        </div>

                        <div>
                            <button type="button" onClick={handleGoBack} className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors pt-1">
                                <ArrowLeft size={14} />
                                <span>Retornar à página anterior</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 border-t border-slate-900/60 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
                <span>MyPokeBinder · Coleção dos 151 Pokémon Originais</span>
                <span className="text-slate-600">Se o caminho continuar bloqueado, use uma Poké Flauta.</span>
            </footer>
        </div>
    );
}
