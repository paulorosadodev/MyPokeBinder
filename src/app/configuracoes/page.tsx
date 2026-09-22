"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { useUserSettings, THEME_PRESETS } from "@/lib/context/UserSettingsContext";
import { useAuth } from "@/lib/context/AuthContext";
import { playCardDropSound } from "@/lib/audio/cardSounds";
import { RarityImpactTier } from "@/lib/pokemon/rarity";
import { toast } from "sonner";
import { Palette, Volume2, VolumeX, ArrowLeft, Sparkles, LogOut, User, ShieldCheck } from "lucide-react";
import { PokemonThemeSelector } from "@/components/theme/PokemonThemeSelector";
import { PokeballLoader } from "@/components/loading/PokeballLoader";
import { getPokemonThemeSelectorSpriteUrl } from "@/lib/pokemon/constants";

export default function SettingsPage() {
    const router = useRouter();
    const { themeColor, soundEnabled, setThemeColor, setSoundEnabled } = useUserSettings();
    const { user, isLoading, signOut } = useAuth();
    const [avatarError, setAvatarError] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);

    useEffect(() => {
        const urls = THEME_PRESETS.map((p) => getPokemonThemeSelectorSpriteUrl((p as { dexId: number }).dexId));
        let isCancelled = false;

        const preload = async () => {
            try {
                await Promise.all(
                    urls.map((url) => {
                        return new Promise<void>((resolve) => {
                            const img = new window.Image();
                            img.src = url;
                            if (img.complete) {
                                resolve();
                            } else {
                                img.onload = () => resolve();
                                img.onerror = () => resolve();
                            }
                        });
                    }),
                );
            } finally {
                if (!isCancelled) {
                    setIsAssetsLoaded(true);
                }
            }
        };

        preload();

        return () => {
            isCancelled = true;
        };
    }, []);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await signOut();
            toast.success("Sessão encerrada com sucesso.");
        } catch {
            toast.error("Erro ao encerrar sessão.");
            setIsLoggingOut(false);
        }
    };

    const handleToggleSound = async () => {
        const nextState = !soundEnabled;
        await setSoundEnabled(nextState);
        toast.success(nextState ? "Sons ativados" : "Sons desativados", {
            description: nextState ? "Efeitos sonoros ao inserir cartas habilitados." : "Efeitos sonoros silenciados.",
        });
    };

    const handleTestSound = (tier: RarityImpactTier = 0) => {
        if (!soundEnabled) {
            toast.info("O som está desativado no momento.", {
                description: "Ative a opção acima para ouvir os efeitos de inserção.",
            });
            return;
        }
        playCardDropSound(tier);
    };

    if (!isAssetsLoaded) {
        return (
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex flex-1 items-center justify-center">
                    <PokeballLoader size="lg" message="Carregando configurações..." />
                </main>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-5 px-4 py-5 sm:gap-6 sm:px-6 sm:py-8 pb-28 md:pb-16">
                <div className="flex flex-col gap-3 sm:gap-4">
                    <div>
                        <button type="button" onClick={() => router.back()} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white">
                            <ArrowLeft size={16} />
                            <span>Voltar</span>
                        </button>
                    </div>

                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Configurações</h1>
                        <p className="mt-0.5 text-xs text-slate-400 sm:text-sm">Tema, sons e sessão do seu binder</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
                    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#12151d]/90 p-4 shadow-xl backdrop-blur-md sm:p-5">
                        <div className="flex items-center gap-2.5 border-b border-white/10 pb-3.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-poke-blue/30 bg-poke-blue/10 text-poke-blue">
                                <User size={18} />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-white">Conta</h2>
                                <p className="text-xs text-slate-400">Sessão ativa</p>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-stretch">
                            <div className="flex items-center gap-3.5">
                                {isLoading && !user ? (
                                    <>
                                        <div className="h-12 w-12 shrink-0 animate-pulse rounded-xl border border-white/10 bg-white/10" />
                                        <div className="flex flex-col gap-2">
                                            <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
                                            <div className="h-3 w-44 animate-pulse rounded bg-white/5" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {user?.avatarUrl && !avatarError ? (
                                            <Image src={user.avatarUrl} alt={user.name || "Avatar"} width={48} height={48} priority className="h-12 w-12 rounded-xl border border-white/20 bg-white/10 object-cover shadow-sm ring-1 ring-white/10" referrerPolicy="no-referrer" onError={() => setAvatarError(true)} unoptimized />
                                        ) : (
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-base font-bold text-white shadow-sm">{(user?.name?.[0] || user?.email?.[0] || "P").toUpperCase()}</div>
                                        )}
                                        <div className="flex min-w-0 flex-col">
                                            <span className="truncate text-sm font-bold text-white">{user?.name || "Treinador Pokémon"}</span>
                                            <span className="truncate text-xs text-slate-400">{user?.email || "Sessão conectada"}</span>
                                            <div className="mt-1 flex items-center gap-1.5 text-[10px] font-medium text-emerald-400">
                                                <ShieldCheck size={12} />
                                                <span>Conta conectada</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            <button type="button" onClick={handleLogout} disabled={isLoggingOut} className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-xs font-bold text-rose-400 transition-all hover:border-rose-500/60 hover:bg-rose-500/20 hover:text-rose-200 disabled:opacity-50 sm:w-auto lg:w-full">
                                <LogOut size={15} />
                                <span>{isLoggingOut ? "Saindo..." : "Sair da conta"}</span>
                            </button>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-white/10 bg-[#12151d]/90 p-4 shadow-xl backdrop-blur-md sm:p-5">
                        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3.5">
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-poke-blue/30 bg-poke-blue/10 text-poke-blue">{soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}</div>
                                <div>
                                    <h2 className="text-base font-bold text-white">Sons do Binder</h2>
                                    <p className="text-xs text-slate-400">Impacto ao encaixar cartas</p>
                                </div>
                            </div>

                            <button type="button" role="switch" aria-checked={soundEnabled} onClick={handleToggleSound} className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full p-1 transition-colors duration-200 focus:outline-none ${soundEnabled ? "bg-poke-blue" : "bg-white/20"}`}>
                                <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform duration-200 ${soundEnabled ? "translate-x-5" : "translate-x-0"}`} />
                            </button>
                        </div>

                        <div className="mt-4 flex flex-col gap-3">
                            <p className="text-xs leading-relaxed text-slate-400">Cada raridade tem um impacto sonoro próprio. Teste abaixo.</p>

                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                <button type="button" onClick={() => handleTestSound(0)} className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-xs font-semibold text-slate-300 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white">
                                    <Volume2 size={14} className="shrink-0" />
                                    <span>Comum (Tier 0)</span>
                                </button>
                                <button type="button" onClick={() => handleTestSound(1)} className="flex items-center gap-1.5 rounded-xl border border-purple-400/30 bg-purple-400/10 px-3 py-2 text-left text-xs font-semibold text-purple-300 transition-colors hover:border-purple-400/50 hover:bg-purple-400/20 hover:text-purple-200">
                                    <Sparkles size={14} className="shrink-0" />
                                    <span>Double Rare</span>
                                </button>
                                <button type="button" onClick={() => handleTestSound(2)} className="flex items-center gap-1.5 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-left text-xs font-semibold text-cyan-300 transition-colors hover:border-cyan-400/50 hover:bg-cyan-400/20 hover:text-cyan-200">
                                    <Sparkles size={14} className="shrink-0" />
                                    <span>Ultra / Illustration</span>
                                </button>
                                <button type="button" onClick={() => handleTestSound(3)} className="flex items-center gap-1.5 rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-left text-xs font-semibold text-amber-300 transition-colors hover:border-amber-400/50 hover:bg-amber-400/20 hover:text-amber-200">
                                    <Sparkles size={14} className="shrink-0" />
                                    <span>SIR / Hyper Rare</span>
                                </button>
                            </div>
                        </div>
                    </section>
                </div>

                <section className="rounded-2xl border border-white/10 bg-[#12151d]/90 p-4 shadow-xl backdrop-blur-md sm:p-6">
                    <div className="flex items-center gap-2.5 border-b border-white/10 pb-3.5 sm:pb-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-poke-blue/30 bg-poke-blue/10 text-poke-blue">
                            <Palette size={18} />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-base font-bold text-white sm:text-lg">Tema do Treinador</h2>
                            <p className="text-xs text-slate-400">Escolha a Pokébola e a cor de destaque</p>
                        </div>
                    </div>

                    <div className="mt-4 sm:mt-5">
                        <PokemonThemeSelector themeColor={themeColor} onSelectColor={setThemeColor} />
                    </div>
                </section>
            </main>
        </div>
    );
}
