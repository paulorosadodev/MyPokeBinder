"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { PokeballLogo } from "@/components/ui/PokeballLogo";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { PokemonBackground } from "@/components/auth/PokemonBackground";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { BookOpen, Search, Sparkles, LayoutDashboard, Palette, CheckCircle2, Globe2, ArrowRight, LogIn } from "lucide-react";

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

    const showcaseCards = [
        {
            dex: 6,
            name: "Charizard",
            image: "https://assets.tcgdex.net/en/sv/sv03.5/199/high.webp",
        },
        {
            dex: 9,
            name: "Blastoise",
            image: "https://assets.tcgdex.net/en/sv/sv03.5/200/high.webp",
        },
        {
            dex: 3,
            name: "Venusaur",
            image: "https://assets.tcgdex.net/en/sv/sv03.5/198/high.webp",
        },
        {
            dex: 25,
            name: "Pikachu",
            image: "https://assets.tcgdex.net/en/sv/sv03.5/173/high.webp",
        },
        {
            dex: 150,
            name: "Mewtwo",
            image: "https://assets.tcgdex.net/en/swsh/swsh10.5/072/high.webp",
        },
        {
            dex: 151,
            name: "Mew",
            image: "https://assets.tcgdex.net/en/sv/sv03.5/205/high.webp",
        },
    ];

    const featureList = [
        {
            icon: BookOpen,
            title: "Layout 3×3 Físico Autêntico",
            desc: "Navegação em páginas duplas com física realista de livro. Capa em couro texturizado, relevo de Pokébola e exatamente 151 slots fixos numerados de #001 a #151.",
            color: "text-poke-blue",
            bg: "bg-poke-blue/10 border-poke-blue/20",
        },
        {
            icon: Search,
            title: "Catálogo Completo de Cartas",
            desc: "Acesso a todas as edições físicas já lançadas, do clássico Base Set de 1999 até coleções modernas como 151, com ilustrações em alta resolução.",
            color: "text-amber-400",
            bg: "bg-amber-400/10 border-amber-400/20",
        },
        {
            icon: Sparkles,
            title: "Full Art, Partículas & Som",
            desc: "Reconhecimento automático de raridades expandidas com brilho holográfico arco-íris, explosão de partículas elementais e áudio procedural de impacto.",
            color: "text-purple-400",
            bg: "bg-purple-400/10 border-purple-400/20",
        },
        {
            icon: Globe2,
            title: "Múltiplos Idiomas & Cópias",
            desc: "Controle físico detalhado de cada cópia em Português (PT-BR), Inglês (EN) ou Japonês (JA) com slider tátil e agrupamento de exemplares.",
            color: "text-emerald-400",
            bg: "bg-emerald-400/10 border-emerald-400/20",
        },
        {
            icon: LayoutDashboard,
            title: "Dashboard & Mini-Grid 151",
            desc: "Métricas completas de preenchimento, estatísticas de raridade e mini-grid com a arte oficial colorida dos Pokémon obtidos contra silhuetas dos pendentes.",
            color: "text-cyan-400",
            bg: "bg-cyan-400/10 border-cyan-400/20",
        },
        {
            icon: Palette,
            title: "Perfil do Treinador & Temas",
            desc: "Trainer Card estilizado com suas cartas mais raras em 3D e personalização com temas cromáticos inspirados em Pokémon.",
            color: "text-rose-400",
            bg: "bg-rose-400/10 border-rose-400/20",
        },
    ];

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#07090e] text-slate-200">
            <PokemonBackground />

            <div className="relative z-10 flex min-h-screen flex-col">
                <PublicHeader />

                <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-4xl text-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-300 backdrop-blur-md">
                                <PokeballLogo size="sm" animated color="#ef4444" />
                                <span>O Fichário Virtual 3×3 dos 151 Pokémon de Kanto</span>
                            </div>

                            <h1 className="mt-8 text-4xl font-black tracking-tight text-white sm:text-6xl md:text-7xl">
                                Colecione, organize e complete seu binder com <span className="bg-gradient-to-r from-red-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">visual físico autêntico</span>.
                            </h1>

                            <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-xl">O MyPokeBinder é a ferramenta definitiva para colecionadores de cartas físicas de Pokémon TCG. Folheie seu fichário 3×3 em páginas duplas, descubra artes expandidas em alta definição e acompanhe a Pokédex clássica em tempo real.</p>

                            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <button onClick={handleLogin} disabled={loadingAuth} className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-red-500/25 transition-all hover:brightness-110 active:scale-95 sm:w-auto">
                                    <LogIn size={20} />
                                    <span>{loadingAuth ? "Conectando..." : "Começar Agora"}</span>
                                </button>

                                <a href="#funcionalidades" className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10 sm:w-auto">
                                    <span>Conhecer Recursos</span>
                                    <ArrowRight size={18} />
                                </a>
                            </div>

                            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 sm:gap-10 sm:text-sm">
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-emerald-400" />
                                    151 Slots Fixos de Kanto
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-emerald-400" />
                                    Catálogo em Alta Definição
                                </span>
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-emerald-400" />
                                    100% Gratuito & Sem Anúncios
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0c101a]/85 p-4 shadow-2xl backdrop-blur-2xl sm:p-8">
                        <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                                    <Sparkles size={14} />
                                    <span>Vitrine do Fichário</span>
                                </div>
                                <h2 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">Suas cartas em exibição sem poluição visual</h2>
                            </div>
                            <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300">Formato 3×3 • 9 cartas por folha</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-6">
                            {showcaseCards.map((card) => (
                                <div key={card.dex} className="group relative flex flex-col items-center">
                                    <div className="relative aspect-[2.5/3.5] w-full">
                                        <Card3DTilt className="relative h-full w-full" maxTilt={14} scale={1.1} glareOpacity={0.28}>
                                            <Image src={card.image} alt={card.name} fill sizes="(max-width: 768px) 50vw, 16vw" className="object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)]" unoptimized />
                                        </Card3DTilt>
                                    </div>
                                    <div className="mt-3 flex w-full items-center justify-between px-1 text-xs">
                                        <span className="font-semibold text-slate-300 transition-colors group-hover:text-white">{card.name}</span>
                                        <span className="font-mono text-[11px] text-slate-500">#{String(card.dex).padStart(3, "0")}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="funcionalidades" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-poke-blue">Funcionalidades Práticas</h2>
                        <p className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Tudo o que um colecionador precisa em um só lugar</p>
                        <p className="mt-4 max-w-2xl mx-auto text-sm text-slate-400 sm:text-base">Cada detalhe foi desenhado para simular o prazer de possuir um fichário de colecionador, com toda a agilidade do digital.</p>
                    </div>

                    <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {featureList.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="group relative rounded-3xl border border-white/10 bg-[#0e131d]/75 p-7 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-[#121927]">
                                    <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border ${item.bg} ${item.color}`}>
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold text-white transition-colors group-hover:text-white">{item.title}</h3>
                                    <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                    <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-red-950/30 via-[#0d121c] to-blue-950/30 p-8 sm:p-14">
                        <div className="max-w-3xl">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-red-400">Como Começar</h2>
                            <h3 className="mt-2 text-2xl font-extrabold text-white sm:text-4xl">Sua jornada para os 151 em três etapas</h3>

                            <div className="mt-10 space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/20 font-black text-red-400 border border-red-500/30">1</div>
                                    <div>
                                        <h4 className="text-base font-bold text-white">Conecte sua conta em um clique</h4>
                                        <p className="mt-1 text-sm text-slate-400">Acesso rápido e seguro. Criamos automaticamente seu perfil e seu fichário pessoal isolado na nuvem.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 font-black text-amber-400 border border-amber-500/30">2</div>
                                    <div>
                                        <h4 className="text-base font-bold text-white">Pesquise suas cartas no catálogo oficial</h4>
                                        <p className="mt-1 text-sm text-slate-400">Toque em qualquer slot da Pokédex para buscar a versão exata da sua carta física (edição, rarity e idioma físico).</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 font-black text-emerald-400 border border-emerald-500/30">3</div>
                                    <div>
                                        <h4 className="text-base font-bold text-white">Folheie seu Binder e complete sua coleção</h4>
                                        <p className="mt-1 text-sm text-slate-400">Veja as silhuetas serem substituídas pelas cartas reais, sinta o efeito sonoro de impacto e compartilhe seu Trainer Card.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <div className="flex justify-center mb-6">
                        <PokeballLogo size="lg" animated glow="subtle" color="#ef4444" />
                    </div>
                    <h2 className="text-3xl font-black text-white sm:text-5xl">Pronto para começar seu fichário?</h2>
                    <p className="mt-4 text-base text-slate-400 max-w-xl mx-auto">Conecte sua conta em instantes e comece a registrar suas cartas físicas dos 151 Pokémon originais de Kanto.</p>
                    <div className="mt-8 flex justify-center">
                        <button onClick={handleLogin} disabled={loadingAuth} className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-10 py-4 text-base font-bold text-white shadow-xl shadow-red-500/30 transition-all hover:brightness-110 active:scale-95">
                            <LogIn size={20} />
                            <span>{loadingAuth ? "Conectando..." : "Começar Agora"}</span>
                        </button>
                    </div>
                </section>

                <PublicFooter />
            </div>
        </div>
    );
}
