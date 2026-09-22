"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { PokemonBackground } from "@/components/auth/PokemonBackground";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { LandingReveal } from "@/components/landing/LandingReveal";
import { CardAppearOnView } from "@/components/landing/CardAppearOnView";
import type { CardShineMode } from "@/types/binder";
import { BookOpen, Grid3x3, LogIn, Search, Sparkles } from "lucide-react";

const HERO_CARDS: {
    dex: number;
    name: string;
    image: string;
    shineMode: CardShineMode;
}[] = [
    {
        dex: 9,
        name: "Blastoise",
        image: "https://assets.tcgdex.net/en/sv/sv03.5/200/high.webp",
        shineMode: "prismatic",
    },
    {
        dex: 6,
        name: "Charizard",
        image: "https://assets.tcgdex.net/en/sv/sv03.5/199/high.webp",
        shineMode: "prismatic",
    },
    {
        dex: 3,
        name: "Venusaur",
        image: "https://assets.tcgdex.net/en/sv/sv03.5/198/high.webp",
        shineMode: "prismatic",
    },
];

const BINDER_PAGE_CARDS: {
    dex: number;
    name: string;
    image: string;
    shineMode: CardShineMode;
}[] = [
    {
        dex: 1,
        name: "Bulbasaur",
        image: "https://assets.tcgdex.net/en/sv/sv03.5/001/high.webp",
        shineMode: "none",
    },
    {
        dex: 4,
        name: "Charmander",
        image: "https://assets.tcgdex.net/en/sv/sv03.5/004/high.webp",
        shineMode: "none",
    },
    {
        dex: 7,
        name: "Squirtle",
        image: "https://assets.tcgdex.net/en/sv/sv03.5/007/high.webp",
        shineMode: "none",
    },
    {
        dex: 25,
        name: "Pikachu",
        image: "https://assets.tcgdex.net/en/sv/sv03.5/173/high.webp",
        shineMode: "prismatic",
    },
    {
        dex: 133,
        name: "Eevee",
        image: "https://assets.tcgdex.net/en/sv/sv03.5/133/high.webp",
        shineMode: "none",
    },
    {
        dex: 143,
        name: "Snorlax",
        image: "https://assets.tcgdex.net/en/sv/sv03.5/143/high.webp",
        shineMode: "none",
    },
    {
        dex: 150,
        name: "Mewtwo",
        image: "https://assets.tcgdex.net/en/swsh/swsh10.5/072/high.webp",
        shineMode: "prismatic",
    },
    {
        dex: 151,
        name: "Mew",
        image: "https://assets.tcgdex.net/en/sv/sv03.5/205/high.webp",
        shineMode: "prismatic",
    },
    {
        dex: 94,
        name: "Gengar",
        image: "https://assets.tcgdex.net/en/sv/sv06.5/057/high.webp",
        shineMode: "prismatic",
    },
];

const CAPABILITIES = [
    {
        icon: BookOpen,
        title: "Binder 3×3",
        desc: "17 páginas com 151 slots fixos, capa em couro e física de folhear como um fichário real.",
    },
    {
        icon: Search,
        title: "Catálogo TCGdex",
        desc: "Busque edições físicas do Base Set ao 151 e registre idioma, versão e quantidade.",
    },
    {
        icon: Sparkles,
        title: "Full Art e brilho",
        desc: "Raridades expandidas ganham foil holográfico, partículas de impacto e som ao pousar no slot.",
    },
];

/** Hero wordmark only (not nav): two red tones. */
const brandHeroGradientClass = "bg-gradient-to-r from-[#f87171] to-[#b91c1c] bg-clip-text text-transparent";

export function LandingPage() {
    const [loadingAuth, setLoadingAuth] = useState(false);

    const handleLogin = async () => {
        try {
            setLoadingAuth(true);
            const supabase = createClient();
            await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
        } catch {
            setLoadingAuth(false);
            toast.error("Erro ao autenticar", {
                description: "Não foi possível iniciar a conexão. Tente novamente.",
            });
        }
    };

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#07090e] text-slate-200">
            <div className="pointer-events-none absolute inset-0 opacity-[0.18] md:opacity-40" aria-hidden>
                <PokemonBackground />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#07090e]/80 via-[#07090e]/55 to-[#07090e]" aria-hidden />

            <div className="relative z-10 flex min-h-screen flex-col">
                <PublicHeader />

                <section className="relative overflow-hidden pt-8 pb-16 md:flex md:min-h-[calc(100dvh-4rem)] md:flex-col md:justify-center md:pt-14 md:pb-24">
                    <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:gap-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
                        {/* Cards first on mobile for product-led hero */}
                        <div className="order-1 relative mx-auto flex w-full max-w-lg items-end justify-center gap-1 sm:max-w-xl sm:gap-2 lg:order-2 lg:max-w-none lg:gap-4 xl:gap-5">
                            {HERO_CARDS.map((card, index) => (
                                <div key={card.dex} className={`relative aspect-[2.5/3.5] w-[36%] shrink-0 sm:w-[34%] lg:w-[38%] xl:w-[40%] ${index === 1 ? "z-20 -translate-y-4 scale-110 sm:-translate-y-7 sm:scale-[1.12]" : index === 0 ? "z-10 origin-bottom rotate-[-8deg] sm:rotate-[-10deg]" : "z-10 origin-bottom rotate-[8deg] sm:rotate-[10deg]"}`}>
                                    <div className={`landing-enter landing-enter-d${index + 1} h-full w-full`}>
                                        <Card3DTilt className="relative h-full w-full overflow-hidden rounded-lg" maxTilt={18} scale={1.04} glareOpacity={0.4} perspective={700} shineMode={card.shineMode}>
                                            <Image src={card.image} alt={card.name} fill priority={index === 1} sizes="(max-width: 640px) 36vw, (max-width: 1024px) 30vw, 280px" className="object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.75)]" unoptimized />
                                        </Card3DTilt>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-2 w-full lg:order-1 lg:max-w-xl">
                            <p className={`landing-enter landing-enter-d1 text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl ${brandHeroGradientClass}`}>MyPokeBinder</p>
                            <h1 className="landing-enter landing-enter-d2 mt-4 text-xl font-semibold tracking-tight text-white sm:mt-5 sm:text-3xl lg:text-4xl">Seu fichário 3×3 dos 151 de Kanto</h1>
                            <p className="landing-enter landing-enter-d3 mt-4 max-w-[40ch] text-sm leading-relaxed text-slate-400 sm:mt-5 sm:text-base lg:text-lg">Registre cartas físicas, preencha os slots e folheie o binder com física de página real.</p>
                            <button type="button" onClick={handleLogin} disabled={loadingAuth} className="landing-enter landing-enter-d4 mt-8 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[#ef4444] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#dc2626] active:scale-[0.98] disabled:opacity-70 sm:mt-10 sm:w-auto">
                                <LogIn size={18} />
                                <span>{loadingAuth ? "Conectando..." : "Começar agora"}</span>
                            </button>
                        </div>
                    </div>
                </section>

                <section className="relative mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
                    <LandingReveal className="max-w-2xl">
                        <div className="flex items-center gap-2.5 text-[#ef4444]">
                            <Grid3x3 size={20} strokeWidth={1.75} />
                            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Nove cartas por página</h2>
                        </div>
                        <p className="mt-4 max-w-[55ch] text-sm leading-relaxed text-slate-400 sm:text-base">Cada página do binder espelha o formato físico: nove slots, silhuetas até você vincular a carta, e ilustração de ponta a ponta sem overlays.</p>
                    </LandingReveal>

                    <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#0c101a]/90 p-3 sm:mt-12 sm:p-6">
                        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4 text-xs text-slate-500">
                            <span className="inline-flex items-center gap-1.5 font-medium text-slate-300">
                                <BookOpen size={14} className="text-[#ef4444]" />
                                Página 1
                            </span>
                            <span className="font-mono">#001 - #009</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-5">
                            {BINDER_PAGE_CARDS.map((card, index) => (
                                <CardAppearOnView key={card.dex} index={index} className="group relative flex flex-col items-center">
                                    <div className="relative aspect-[2.5/3.5] w-full">
                                        <Card3DTilt className="relative h-full w-full overflow-hidden rounded-lg" maxTilt={14} scale={1.06} glareOpacity={0.35} perspective={750} shineMode={card.shineMode}>
                                            <Image src={card.image} alt={card.name} fill sizes="(max-width: 768px) 30vw, 12vw" className="object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)]" unoptimized />
                                        </Card3DTilt>
                                    </div>
                                    <div className="mt-2 flex w-full items-center justify-between px-0.5 text-[10px] sm:text-xs">
                                        <span className="truncate font-medium text-slate-400 group-hover:text-slate-200">{card.name}</span>
                                        <span className="shrink-0 font-mono text-slate-600">#{String(card.dex).padStart(3, "0")}</span>
                                    </div>
                                </CardAppearOnView>
                            ))}
                        </div>
                    </div>
                </section>

                <LandingReveal className="relative mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 sm:pb-28 lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">O que o binder faz</h2>
                    <ul className="landing-reveal-stagger mt-10 divide-y divide-white/10 border-y border-white/10">
                        {CAPABILITIES.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.title} className="landing-reveal-item grid gap-3 py-7 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-10 sm:py-9">
                                    <div className="flex items-center gap-3">
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#ef4444]/25 bg-[#ef4444]/10 text-[#ef4444]">
                                            <Icon size={18} strokeWidth={1.75} />
                                        </span>
                                        <h3 className="text-base font-semibold text-white">{item.title}</h3>
                                    </div>
                                    <p className="max-w-[55ch] text-sm leading-relaxed text-slate-400 sm:text-base">{item.desc}</p>
                                </li>
                            );
                        })}
                    </ul>
                </LandingReveal>

                <PublicFooter />
            </div>
        </div>
    );
}
