"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Layers, Volume2, Sparkles, AlertTriangle } from "lucide-react";
import { PokeballLogo } from "@/components/ui/PokeballLogo";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { playPsyduckConfusionSound } from "@/lib/audio/cardSounds";
import { getPokemonSilhouetteUrl } from "@/lib/pokemon/constants";

export default function NotFound() {
    const [isPlayingSound, setIsPlayingSound] = useState(false);

    const handlePlaySound = () => {
        setIsPlayingSound(true);
        playPsyduckConfusionSound();
        setTimeout(() => setIsPlayingSound(false), 600);
    };

    const handleGoBack = () => {
        if (typeof window !== "undefined") {
            window.history.back();
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#0a0c10] text-slate-100 relative overflow-hidden selection:bg-red-500/30 selection:text-white">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/10 via-yellow-600/5 to-purple-600/10 blur-[120px] rounded-full" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/10 blur-[100px] rounded-full" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full" />
                <svg viewBox="0 0 100 100" className="absolute -right-16 top-1/3 w-[480px] h-[480px] opacity-[0.02] text-white stroke-current fill-none stroke-[2]">
                    <circle cx="50" cy="50" r="46" />
                    <line x1="4" y1="50" x2="96" y2="50" strokeWidth="4" />
                    <circle cx="50" cy="50" r="14" strokeWidth="4" />
                </svg>
            </div>

            <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
                <Link href="/" className="inline-flex items-center gap-2.5 group transition-transform hover:scale-[1.02] active:scale-[0.98]">
                    <PokeballLogo size="sm" animated color="#ef4444" />
                    <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">MyPokeBinder</span>
                </Link>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <span>Erro 404</span>
                </div>
            </header>

            <main className="flex-1 relative z-10 flex items-center justify-center px-4 py-8 sm:py-12">
                <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-1">
                        <div className="relative group" onClick={handlePlaySound} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && handlePlaySound()}>
                            <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/20 via-yellow-400/25 to-purple-600/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

                            <Card3DTilt maxTilt={14} scale={1.03} glareOpacity={0.35} perspective={900} className="w-[280px] sm:w-[310px] aspect-[2.5/3.5] rounded-2xl p-3.5 bg-gradient-to-b from-[#2a2416] via-[#1a1c24] to-[#12151e] border-2 border-amber-400/50 shadow-[0_25px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(245,158,11,0.2)] flex flex-col justify-between select-none relative overflow-hidden cursor-pointer">
                                <div className="holo-sheen" />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between pb-1.5 border-b border-amber-400/20">
                                        <div className="flex items-center gap-1.5">
                                            <span className="bg-amber-400/20 text-amber-300 text-[9px] font-black px-1.5 py-0.5 rounded border border-amber-400/30 uppercase tracking-widest">Básico</span>
                                            <span className="font-black text-slate-100 text-sm tracking-wide">Psyduck Confuso</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="font-extrabold text-xs text-amber-400">404 HP</span>
                                            <span className="w-4 h-4 rounded-full bg-sky-500 flex items-center justify-center text-[10px] shadow-sm font-bold text-slate-950">💧</span>
                                        </div>
                                    </div>

                                    <div className="mt-2 relative rounded-xl overflow-hidden border border-amber-400/30 bg-gradient-to-b from-amber-950/30 via-slate-900 to-[#0c0f17] aspect-[4/3] flex items-center justify-center shadow-inner">
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="w-32 h-32 rounded-full border border-amber-400/20 animate-psychic-ring" />
                                            <div className="w-20 h-20 rounded-full border border-purple-400/25 animate-ping" />
                                        </div>

                                        <div className="absolute top-2 left-3 text-amber-300 text-lg font-black animate-float-wobble select-none">?</div>
                                        <div className="absolute top-3 right-4 text-purple-300 text-sm font-black animate-bounce select-none">?</div>
                                        <div className="absolute bottom-2 left-4 text-yellow-200 text-xs font-black animate-pulse select-none">?</div>

                                        <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 transform transition-transform duration-300 group-hover:scale-110">
                                            <Image src={getPokemonSilhouetteUrl(54)} alt="Psyduck segurando a cabeça confuso" width={160} height={160} priority unoptimized className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] filter contrast-105" />
                                        </div>

                                        <div className="absolute bottom-0 inset-x-0 bg-slate-950/90 py-0.5 px-2 text-center text-[8px] text-amber-200/80 font-medium tracking-tight border-t border-amber-400/20">Nº 054 • Pokémon Pato • Rota Desconhecida</div>
                                    </div>
                                </div>

                                <div className="relative z-10 space-y-2 my-2 text-left">
                                    <div className="bg-amber-950/25 border border-amber-400/20 rounded-lg p-2">
                                        <div className="flex items-center gap-1.5 mb-0.5">
                                            <span className="text-[9px] font-black uppercase text-amber-400 tracking-wider">Habilidade: Amnésia de Rota</span>
                                        </div>
                                        <p className="text-[10px] text-slate-300 leading-tight">Quando esta página é requisitada, todas as URLs são esquecidas e o treinador perde o rumo.</p>
                                    </div>

                                    <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-2">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <div className="flex items-center gap-1">
                                                <span className="w-3.5 h-3.5 rounded-full bg-purple-500/80 text-[8px] flex items-center justify-center font-bold">👁</span>
                                                <span className="w-3.5 h-3.5 rounded-full bg-slate-600 text-[8px] flex items-center justify-center font-bold">⚪</span>
                                                <span className="text-[10px] font-black text-slate-200 ml-1">Golpe Confusão</span>
                                            </div>
                                            <span className="text-[11px] font-black text-amber-400">404</span>
                                        </div>
                                        <p className="text-[9px] text-slate-400 leading-tight">Psyduck tem uma forte dor de cabeça. Nenhum arquivo foi encontrado no servidor.</p>
                                    </div>
                                </div>

                                <div className="relative z-10 pt-1.5 border-t border-amber-400/20 flex items-center justify-between text-[8px] text-slate-400 font-semibold">
                                    <span>fraqueza: ⚡ x2</span>
                                    <div className="flex items-center gap-1 text-amber-300">
                                        <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                                        <span>404/151 ★ UR</span>
                                    </div>
                                    <span>recuo: ⚪</span>
                                </div>
                            </Card3DTilt>
                        </div>

                        <button type="button" onClick={handlePlaySound} className={`mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${isPlayingSound ? "bg-amber-500 text-slate-950 scale-105" : "bg-slate-900/90 hover:bg-slate-800 text-amber-400 border border-amber-400/30 shadow-md"}`}>
                            <Volume2 className={`w-3.5 h-3.5 ${isPlayingSound ? "animate-spin" : ""}`} />
                            <span>{isPlayingSound ? "Psy... duck!?" : "Ouvir confusão do Psyduck"}</span>
                        </button>
                    </div>

                    <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 order-2 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            <span>Código de Erro 404 • Rota Perdida</span>
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                                Um <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent">Psyduck selvagem</span> apareceu confuso!
                            </h1>
                            <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">A página ou carta que você tentou acessar não está no seu Binder. Ela pode ter sido levada pelo vento até a Rota 404, devorada por um Snorlax dorminhoco ou simplesmente nunca existiu nesta Pokédex.</p>
                        </div>

                        <div className="w-full max-w-xl bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 sm:p-5 backdrop-blur-sm relative overflow-hidden shadow-xl">
                            <div className="absolute top-0 left-0 h-1 w-20 bg-gradient-to-r from-amber-500 to-red-500" />
                            <div className="flex items-start gap-3 text-left">
                                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400">💡</div>
                                <div className="space-y-1">
                                    <h2 className="text-xs font-bold text-amber-300 uppercase tracking-wide">Dica do Professor Carvalho</h2>
                                    <p className="text-xs text-slate-300 leading-relaxed">Não se preocupe, treinador! Você pode retornar em segurança para organizar suas cartas ou explorar toda a sua coleção física através dos atalhos abaixo.</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full max-w-xl flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                            <Link href="/" className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-red-600 via-red-500 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                                <BookOpen className="w-4 h-4" />
                                <span>Voltar ao Meu Binder</span>
                            </Link>

                            <Link href="/collection" className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-slate-600 text-slate-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                                <Layers className="w-4 h-4 text-poke-blue" />
                                <span>Explorar Coleção</span>
                            </Link>
                        </div>

                        <div>
                            <button type="button" onClick={handleGoBack} className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors py-1">
                                <ArrowLeft className="w-3.5 h-3.5" />
                                <span>Retornar à página anterior</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
                <span>MyPokeBinder • Coleção dos 151 Pokémon Originais</span>
                <span className="text-slate-600">Se o caminho continuar bloqueado, use uma Poké Flauta.</span>
            </footer>
        </div>
    );
}
