"use client";

import { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import useSWR from "swr";
import { Header } from "@/components/layout/Header";
import { PokeballLoader } from "@/components/loading/PokeballLoader";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { FlagIcon } from "@/components/ui/FlagIcon";
import { formatTcgdexImageUrl } from "@/lib/pokemon/tcgdex";
import { getRarityBadgeStyle } from "@/lib/pokemon/rarity";
import { formatVariantLabel, resolveCardShine } from "@/lib/pokemon/variant";
import { getCardAppearProps } from "@/lib/ui/cardAppear";
import { CardLanguage, UserCard } from "@/types/binder";
import { toast } from "sonner";
import { Settings, Share2, BookOpen, Layers, Check, Layers2, Flame, ArrowUpRight } from "lucide-react";

interface ProfileData {
    user: {
        id: string;
        name: string;
        email?: string;
        avatarUrl?: string | null;
        createdAt?: string;
    };
    stats: {
        totalInBinder: number;
        totalCollection: number;
        completionPercentage: number;
    };
    rarestCards: UserCard[];
    rarityBreakdown: Array<{
        label: string;
        count: number;
        score: number;
    }>;
}

const fetcher = async (url: string): Promise<ProfileData> => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Falha ao carregar perfil");
    }
    const data = await res.json();
    return data.profile;
};

export default function ProfilePage() {
    const { data: profile, error, isLoading } = useSWR<ProfileData>("/api/profile", fetcher);
    const [avatarError, setAvatarError] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyProfileLink = async () => {
        try {
            if (typeof window !== "undefined") {
                await navigator.clipboard.writeText(window.location.href);
                setIsCopied(true);
                toast.success("Link do perfil copiado!", {
                    description: "Compartilhe sua coleção de Pokémon com outros treinadores.",
                });
                setTimeout(() => setIsCopied(false), 2000);
            }
        } catch {
            toast.error("Não foi possível copiar o link.");
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex flex-1 items-center justify-center">
                    <PokeballLoader message="Carregando perfil do treinador..." size="lg" />
                </main>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center p-6 text-center">
                    <div className="rounded-2xl border border-white/10 bg-[#12151d] p-8 shadow-xl">
                        <p className="text-base font-bold text-white">Não foi possível carregar os dados do perfil.</p>
                        <p className="mt-1 text-xs text-slate-400">Verifique sua conexão ou tente novamente mais tarde.</p>
                        <NextLink href="/" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-poke-blue px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90">
                            <BookOpen size={14} />
                            <span>Voltar ao Binder</span>
                        </NextLink>
                    </div>
                </main>
            </div>
        );
    }

    const { user, stats, rarestCards, rarityBreakdown } = profile;

    return (
        <div className="flex min-h-screen flex-col">
            <Header userEmail={user.email} userName={user.name} userAvatar={user.avatarUrl || undefined} />

            <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16">
                <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#161a26]/90 via-[#10131d]/90 to-[#0c0e15]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-poke-blue/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

                    <div className="relative z-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-4 sm:gap-5">
                            <div className="relative">
                                {user.avatarUrl && !avatarError ? (
                                    <Image src={user.avatarUrl} alt={user.name} width={80} height={80} className="h-16 w-16 rounded-2xl border-2 border-white/20 object-cover shadow-xl ring-2 ring-white/10 sm:h-20 sm:w-20" referrerPolicy="no-referrer" onError={() => setAvatarError(true)} unoptimized />
                                ) : (
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-white/20 bg-gradient-to-br from-white/15 to-white/5 font-mono text-2xl font-black text-white shadow-xl ring-2 ring-white/10 sm:h-20 sm:w-20">{(user.name[0] || "T").toUpperCase()}</div>
                                )}
                            </div>

                            <div className="flex flex-col">
                                <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">{user.name}</h1>
                                <p className="mt-0.5 text-xs text-slate-400">Colecionando os 151 Pokémon originais no MyPokeBinder</p>
                            </div>
                        </div>

                        <div className="flex w-full flex-wrap items-center gap-2.5 sm:w-auto">
                            <button type="button" onClick={handleCopyProfileLink} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white sm:flex-initial">
                                {isCopied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
                                <span>{isCopied ? "Copiado" : "Compartilhar"}</span>
                            </button>

                            <NextLink href="/configuracoes" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-poke-blue/40 bg-poke-blue/15 px-4 py-2 text-xs font-semibold text-white transition-all hover:border-poke-blue/60 hover:bg-poke-blue/25 sm:flex-initial">
                                <Settings size={14} />
                                <span>Configurações</span>
                            </NextLink>
                        </div>
                    </div>

                    <div className="relative z-10 mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                        <div className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-md">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-slate-400">Progresso do Binder</span>
                                <BookOpen size={16} className="text-poke-blue" />
                            </div>
                            <div className="mt-2 flex items-baseline gap-2">
                                <span className="font-mono text-2xl font-black text-white">{stats.totalInBinder}</span>
                                <span className="text-xs text-slate-400">/ 151</span>
                                <span className="ml-auto rounded-full bg-poke-blue/20 px-2 py-0.5 text-[11px] font-bold text-poke-blue">{stats.completionPercentage}%</span>
                            </div>
                            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                                <div className="h-full rounded-full bg-poke-blue transition-all duration-500" style={{ width: `${stats.completionPercentage}%` }} />
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-md">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-slate-400">Exemplares na Coleção</span>
                                <Layers size={16} className="text-poke-blue" />
                            </div>
                            <div className="mt-2 flex items-baseline gap-2">
                                <span className="font-mono text-2xl font-black text-white">{stats.totalCollection}</span>
                                <span className="text-xs text-slate-400">cartas físicas</span>
                            </div>
                            <p className="mt-2 text-[11px] text-slate-500">Incluindo cópias adicionais e guardadas</p>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Flame size={18} className="text-amber-400" />
                            <h2 className="text-base font-bold text-white sm:text-lg">Cartas Mais Raras do Treinador</h2>
                        </div>
                        <NextLink href="/collection" className="flex items-center gap-1 text-xs font-semibold text-poke-blue transition-colors hover:text-poke-blue/80">
                            <span>Ver coleção completa</span>
                            <ArrowUpRight size={14} />
                        </NextLink>
                    </div>

                    {rarestCards.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#12151d] p-8 text-center">
                            <Layers2 size={32} className="text-slate-600" />
                            <p className="mt-2 text-sm font-bold text-white">Nenhuma carta cadastrada ainda</p>
                            <p className="mt-0.5 text-xs text-slate-400">Adicione cartas à sua coleção para exibi-las no seu perfil.</p>
                            <NextLink href="/collection" className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-poke-blue px-3.5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90">
                                <Layers size={14} />
                                <span>Ir para a Coleção</span>
                            </NextLink>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 sm:gap-4">
                            {rarestCards.map((card, index) => {
                                const rarityBadge = getRarityBadgeStyle(card.card_rarity);
                                const appear = getCardAppearProps(index);

                                return (
                                    <NextLink key={card.id} href={`/cards/${card.id}?from=collection`} className={`group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#12151d]/90 p-2.5 shadow-lg transition-all duration-200 hover:border-poke-blue/40 hover:bg-white/[0.05] sm:p-3 ${appear.className}`} style={appear.style}>
                                        <div className="flex items-center justify-between text-[9px] sm:text-[10px]">
                                            <span className="rounded bg-black/60 px-1.5 py-0.5 font-mono font-bold text-slate-300">#{String(card.pokemon_dex_id).padStart(3, "0")}</span>

                                            <div className="flex items-center gap-1">
                                                {card.is_in_binder && (
                                                    <span className="flex items-center justify-center rounded border border-poke-blue/40 bg-poke-blue/20 p-0.5 text-poke-blue">
                                                        <BookOpen size={10} />
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="relative my-2 aspect-[2.5/3.5] w-full">
                                            <Card3DTilt className="relative h-full w-full overflow-hidden rounded-lg" maxTilt={8} maxMove={3} scale={1} glareOpacity={0.25} perspective={900} shineMode={resolveCardShine(card.card_variant, card.card_rarity)}>
                                                <Image src={formatTcgdexImageUrl(card.card_image_url)} alt={card.card_name} fill sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 200px" className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" unoptimized />
                                            </Card3DTilt>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center justify-between gap-1">
                                                <span className="truncate text-[11px] font-semibold text-white transition-colors group-hover:text-poke-blue sm:text-xs">{card.card_name}</span>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-between gap-1">
                                                <span className="truncate text-[9px] text-slate-400 sm:text-[10px]">{card.card_set_name || "Coleção"}</span>
                                                <div className="flex items-center gap-1">
                                                    <span className="rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[7px] font-bold text-slate-300 sm:text-[8px]">{formatVariantLabel(card.card_variant)}</span>
                                                    <FlagIcon country={card.card_language as CardLanguage} />
                                                    <span className={`rounded border px-1 text-[7px] font-bold sm:text-[8px] ${rarityBadge.badgeClasses}`}>{rarityBadge.label}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </NextLink>
                                );
                            })}
                        </div>
                    )}
                </section>

                {rarityBreakdown.length > 0 && (
                    <section className="rounded-2xl border border-white/10 bg-[#12151d]/90 p-5 shadow-xl backdrop-blur-md sm:p-6">
                        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                            <Layers2 size={18} className="text-poke-blue" />
                            <div>
                                <h3 className="text-base font-bold text-white">Distribuição por Raridades</h3>
                                <p className="text-xs text-slate-400">Classificação oficial das cartas físicas deste perfil</p>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 sm:gap-2.5">
                            {rarityBreakdown.map((item) => {
                                const badge = getRarityBadgeStyle(item.label);
                                return (
                                    <div key={item.label} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-xs">
                                        <span className={`rounded border px-1.5 py-0.5 text-[10px] font-bold ${badge.badgeClasses}`}>{badge.label}</span>
                                        <span className="font-mono font-bold text-white">{item.count}</span>
                                        <span className="text-[10px] text-slate-500">{item.count === 1 ? "carta" : "cartas"}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
