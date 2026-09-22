"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import NextLink from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { PokeballLogo } from "@/components/ui/PokeballLogo";
import { PokemonBackground } from "@/components/auth/PokemonBackground";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import type { CardShineMode } from "@/types/binder";

/** Hero wordmark only (not nav): two red tones. */
const brandHeroGradientClass = "bg-gradient-to-r from-[#f87171] to-[#b91c1c] bg-clip-text text-transparent";

/** Auth column / nav-style wordmark. */
const brandGradientClass = "bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent";

const HERO_CARDS: {
    dex: number;
    name: string;
    image: string;
    shineMode: CardShineMode;
}[] = [
    {
        dex: 136,
        name: "Flareon",
        image: "https://assets.tcgdex.net/en/sv/sv08.5/146/high.webp",
        shineMode: "prismatic",
    },
    {
        dex: 135,
        name: "Jolteon",
        image: "https://assets.tcgdex.net/en/sv/sv08.5/153/high.webp",
        shineMode: "prismatic",
    },
    {
        dex: 134,
        name: "Vaporeon",
        image: "https://assets.tcgdex.net/en/sv/sv08.5/149/high.webp",
        shineMode: "prismatic",
    },
];

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
        <div className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-[#07090e] lg:flex-row">
            <div className="pointer-events-none absolute inset-0 opacity-[0.18] md:opacity-40" aria-hidden>
                <PokemonBackground intensity="quiet" />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#07090e]/80 via-[#07090e]/55 to-[#07090e] lg:bg-gradient-to-r lg:from-[#07090e]/70 lg:via-[#07090e]/40 lg:to-[#07090e]" aria-hidden />

            <div className="relative z-10 hidden min-h-[100dvh] flex-1 flex-col items-center justify-center p-10 lg:flex lg:p-16 xl:p-20">
                <div className="w-full max-w-2xl xl:max-w-3xl">
                    <div className="max-w-xl text-left">
                        <p className={`landing-enter landing-enter-d1 text-5xl font-extrabold tracking-tight xl:text-6xl ${brandHeroGradientClass}`}>MyPokeBinder</p>
                        <h1 className="landing-enter landing-enter-d2 mt-4 text-3xl font-semibold tracking-tight text-white xl:text-4xl">Seu fichário 3×3 dos 151 de Kanto</h1>
                        <p className="landing-enter landing-enter-d3 mt-4 max-w-[40ch] text-base leading-relaxed text-slate-400 xl:text-lg">Entre para sincronizar cartas e folhear o binder em qualquer dispositivo.</p>
                    </div>

                    <div className="mt-14 flex w-full max-w-lg items-end justify-end gap-3 self-end xl:ml-auto xl:max-w-xl xl:gap-4">
                        {HERO_CARDS.map((card, index) => (
                            <div key={card.dex} className={`landing-enter landing-enter-d${index + 4} relative aspect-[2.5/3.5] w-[34%] shrink-0 ${index === 1 ? "z-20 -translate-y-5 scale-110" : index === 0 ? "z-10 origin-bottom rotate-[-8deg]" : "z-10 origin-bottom rotate-[8deg]"}`}>
                                <Card3DTilt className="relative h-full w-full overflow-hidden rounded-lg" maxTilt={18} scale={1.04} glareOpacity={0.4} perspective={700} shineMode={card.shineMode}>
                                    <Image src={card.image} alt={card.name} fill priority={index === 1} sizes="(max-width: 1280px) 18vw, 220px" className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.75)]" unoptimized />
                                </Card3DTilt>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="relative z-20 flex min-h-[100dvh] w-full shrink-0 flex-col items-center justify-center border-t border-white/10 bg-[#0c101a] p-8 sm:p-12 lg:w-[500px] lg:border-t-0 lg:border-l lg:p-14 xl:w-[560px]">
                <div className="flex w-full max-w-md flex-col items-center text-center">
                    <div className="mb-6 flex justify-center">
                        <PokeballLogo size="lg" animated color="#ef4444" />
                    </div>

                    <h2 className={`text-4xl font-extrabold tracking-tight ${brandGradientClass}`}>MyPokeBinder</h2>

                    <p className="mt-3 mb-8 max-w-[36ch] text-sm leading-relaxed text-slate-400 sm:text-base">Seu binder digital 3×3 dos 151 originais.</p>

                    {errorParam && <div className="mb-6 w-full rounded-xl border border-red-500/30 bg-red-500/15 p-3.5 text-xs text-red-200">Ocorreu uma falha na autenticação. Por favor, tente novamente.</div>}

                    <button type="button" onClick={handleGoogleLogin} disabled={loading} className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl bg-[#ef4444] py-4 px-6 text-base font-semibold text-white transition-all hover:bg-[#dc2626] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70">
                        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        {loading ? "Conectando ao Google..." : "Entrar com Google"}
                    </button>

                    <p className="mt-8 text-xs leading-relaxed text-slate-500">Ao entrar, você sincroniza e gerencia suas cartas com segurança em qualquer dispositivo.</p>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-white/10 pt-4 text-xs text-slate-400">
                        <NextLink href="/inicio" className="transition-colors hover:text-white">
                            Página Inicial
                        </NextLink>
                        <span className="text-slate-600">-</span>
                        <NextLink href="/termos" className="transition-colors hover:text-white">
                            Termos de Serviço
                        </NextLink>
                        <span className="text-slate-600">-</span>
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
        <Suspense fallback={<div className="min-h-[100dvh] bg-[#07090e]" />}>
            <LoginForm />
        </Suspense>
    );
}
