"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import NextLink from "next/link";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { PokeballLogo } from "@/components/ui/PokeballLogo";
import { PokemonBackground } from "@/components/auth/PokemonBackground";

function LoginForm() {
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const errorParam = searchParams.get("error");

    useEffect(() => {
        if (errorParam) {
            toast.error("Falha no login", {
                description: "Não foi possível autenticar sua conta Google. Tente novamente.",
            });
        }
    }, [errorParam]);

    const handleGoogleLogin = async () => {
        try {
            setLoading(true);
            const supabase = createClient();
            await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
        } catch {
            setLoading(false);
            toast.error("Erro ao autenticar", {
                description: "Não foi possível iniciar o login com o Google. Tente novamente.",
            });
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#07090e] lg:flex-row">
            <PokemonBackground />

            <div className="relative z-10 hidden flex-1 flex-col justify-between p-10 lg:flex lg:p-16 xl:p-20">
                <div className="flex items-center">
                    <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        Binder Digital TCG
                    </div>
                </div>

                <div className="my-auto max-w-3xl py-8 xl:py-12">
                    <h1 className="text-4xl font-black leading-[1.12] tracking-tight text-white lg:text-5xl xl:text-6xl">
                        Colecione todos os <span className="bg-gradient-to-r from-red-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">151 originais</span> com visual autêntico.
                    </h1>

                    <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 lg:text-lg">Organize seu binder no formato 3×3 clássico, descubra cartas de todas as edições do TCG e acompanhe o progresso da sua Pokédex em tempo real.</p>

                    <div className="mt-10 grid max-w-3xl grid-cols-3 gap-5">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/10">
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/15 text-red-400">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-bold text-white">Layout 3×3 Clássico</h3>
                            <p className="mt-1.5 text-xs leading-relaxed text-slate-400">Navegação por páginas duplas idêntica a um álbum físico real com 151 slots fixos.</p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/10">
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/15 text-amber-400">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-bold text-white">Edições & Full Art</h3>
                            <p className="mt-1.5 text-xs leading-relaxed text-slate-400">Suporte a todas as cartas TCG físicas com catálogo em alta resolução e raridades.</p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/10">
                            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/15 text-blue-400">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                </svg>
                            </div>
                            <h3 className="text-sm font-bold text-white">Gestão da Coleção</h3>
                            <p className="mt-1.5 text-xs leading-relaxed text-slate-400">Controle inteligente de múltiplos exemplares por idioma e estatísticas completas.</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-slate-500">
                    <span>Organização 151 Pokémon</span>
                    <span>•</span>
                    <span>Sincronização em Nuvem</span>
                    <span>•</span>
                    <span>Catálogo TCGdex</span>
                </div>
            </div>

            <div className="relative z-20 flex min-h-screen w-full shrink-0 flex-col items-center justify-center border-t border-white/10 bg-[#0c101a]/85 p-8 backdrop-blur-2xl sm:p-12 lg:w-[500px] lg:border-t-0 lg:border-l lg:p-14 xl:w-[560px]">
                <div className="flex w-full max-w-md flex-col items-center text-center">
                    <div className="mb-6 flex justify-center">
                        <PokeballLogo size="lg" animated color="#ef4444" />
                    </div>

                    <h2 className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">MyPokeBinder</h2>

                    <p className="mt-3 mb-8 text-sm leading-relaxed text-slate-400 sm:text-base">Seu binder digital pessoal 3×3 para os 151 Pokémon originais. Colecione, organize e complete sua coleção.</p>

                    {errorParam && <div className="mb-6 w-full rounded-xl border border-red-500/30 bg-red-500/15 p-3.5 text-xs text-red-200">Ocorreu uma falha na autenticação. Por favor, tente novamente.</div>}

                    <button onClick={handleGoogleLogin} disabled={loading} className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 py-4 px-6 text-base font-semibold text-white shadow-lg shadow-red-500/30 transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70">
                        <svg width="22" height="22" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        {loading ? "Conectando ao Google..." : "Entrar com Google"}
                    </button>

                    <p className="mt-8 text-xs leading-relaxed text-slate-500">Ao entrar, você poderá sincronizar e gerenciar suas cartas com segurança em qualquer dispositivo.</p>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-white/10 pt-4 text-xs text-slate-400">
                        <NextLink href="/inicio" className="transition-colors hover:text-white">
                            Página Inicial
                        </NextLink>
                        <span className="text-slate-600">•</span>
                        <NextLink href="/termos" className="transition-colors hover:text-white">
                            Termos de Serviço
                        </NextLink>
                        <span className="text-slate-600">•</span>
                        <NextLink href="/privacidade" className="transition-colors hover:text-white">
                            Política de Privacidade
                        </NextLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#07090e]" />}>
            <LoginForm />
        </Suspense>
    );
}
