"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { SearchCardItem, CardLanguage, CardVariant, UserCard, SearchResponse } from "@/types/binder";
import { formatTcgdexImageUrl } from "@/lib/pokemon/tcgdex";
import { getRarityBadgeStyle } from "@/lib/pokemon/rarity";
import { defaultVariant, formatVariantLabel, resolveCardShine } from "@/lib/pokemon/variant";
import { PokeballLoader } from "@/components/loading/PokeballLoader";
import { LanguageSlider } from "@/components/ui/LanguageSlider";
import { Select, type SelectOption } from "@/components/ui/Select";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { Spinner } from "@/components/ui/Spinner";
import { getCardAppearProps } from "@/lib/ui/cardAppear";
import { toast } from "sonner";
import { X, Search, Plus, Circle, Sparkles, RefreshCw } from "lucide-react";

interface CardSearchModalProps {
    isOpen: boolean;
    dexId: number;
    pokemonName: string;
    onClose: () => void;
    onCardAdded: (newCard: UserCard) => void;
}

const clientSearchCache = new Map<string, SearchResponse>();

const VARIANT_SELECT_OPTIONS: SelectOption<CardVariant>[] = [
    { value: "normal", label: "Normal", icon: <Circle size={12} strokeWidth={2.25} />, description: "Sem holográfico" },
    { value: "holo", label: "Holo", icon: <Sparkles size={12} strokeWidth={2.25} />, description: "Arte holográfica" },
    { value: "reverse", label: "Reverse", icon: <RefreshCw size={12} strokeWidth={2.25} />, description: "Fundo holográfico" },
];

function buildVariantDefaults(cards: SearchCardItem[]): Record<string, CardVariant> {
    const next: Record<string, CardVariant> = {};
    for (const card of cards) {
        next[card.id] = defaultVariant(card.variants);
    }
    return next;
}

export function CardSearchModal({ isOpen, dexId, pokemonName, onClose, onCardAdded }: CardSearchModalProps) {
    const [lang, setLang] = useState<CardLanguage>("pt-br");
    const [cards, setCards] = useState<SearchCardItem[]>([]);
    const [variantsByCard, setVariantsByCard] = useState<Record<string, CardVariant>>({});
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [initialLoading, setInitialLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submittingCardId, setSubmittingCardId] = useState<string | null>(null);
    const [openVariantSelectId, setOpenVariantSelectId] = useState<string | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            setLang("pt-br");
            setVariantsByCard({});
            setOpenVariantSelectId(null);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        let isMounted = true;
        async function loadFirstPage() {
            try {
                const queryName = pokemonName.replace(/[♀♂]/g, "").trim();
                const cacheKey = `${queryName}_page_1`;
                const cached = clientSearchCache.get(cacheKey);

                if (cached) {
                    setCards(cached.cards ?? []);
                    setVariantsByCard(buildVariantDefaults(cached.cards ?? []));
                    setHasMore(cached.hasMore ?? false);
                    setPage(1);
                    setError(null);
                    setInitialLoading(false);
                    return;
                }

                setInitialLoading(true);
                setError(null);
                setSubmittingCardId(null);
                setPage(1);

                const res = await fetch(`/api/search?name=${encodeURIComponent(queryName)}&page=1&pageSize=36`);
                const data: SearchResponse = await res.json();

                if (!res.ok) {
                    const errorMsg = (data as unknown as { error?: string }).error || "Erro ao buscar cartas";
                    throw new Error(errorMsg);
                }

                clientSearchCache.set(cacheKey, data);

                if (isMounted) {
                    setCards(data.cards ?? []);
                    setVariantsByCard(buildVariantDefaults(data.cards ?? []));
                    setHasMore(data.hasMore ?? false);
                }
            } catch (err: unknown) {
                if (isMounted) {
                    const msg = err instanceof Error ? err.message : "Falha na busca";
                    setError(msg);
                    setCards([]);
                    setVariantsByCard({});
                    setHasMore(false);
                }
            } finally {
                if (isMounted) {
                    setInitialLoading(false);
                }
            }
        }

        loadFirstPage();
        return () => {
            isMounted = false;
        };
    }, [isOpen, pokemonName]);

    const loadNextPage = useCallback(async () => {
        if (loadingMore || initialLoading || !hasMore) return;

        try {
            setLoadingMore(true);
            const nextPage = page + 1;
            const queryName = pokemonName.replace(/[♀♂]/g, "").trim();
            const cacheKey = `${queryName}_page_${nextPage}`;
            const cached = clientSearchCache.get(cacheKey);

            if (cached) {
                setCards((prev) => [...prev, ...(cached.cards ?? [])]);
                setVariantsByCard((prev) => ({ ...prev, ...buildVariantDefaults(cached.cards ?? []) }));
                setPage(nextPage);
                setHasMore(cached.hasMore ?? false);
                setLoadingMore(false);
                return;
            }

            const res = await fetch(`/api/search?name=${encodeURIComponent(queryName)}&page=${nextPage}&pageSize=36`);
            const data: SearchResponse = await res.json();

            if (!res.ok) {
                const errorMsg = (data as unknown as { error?: string }).error || "Erro ao carregar mais cartas";
                throw new Error(errorMsg);
            }

            clientSearchCache.set(cacheKey, data);

            setCards((prev) => [...prev, ...(data.cards ?? [])]);
            setVariantsByCard((prev) => ({ ...prev, ...buildVariantDefaults(data.cards ?? []) }));
            setPage(nextPage);
            setHasMore(data.hasMore ?? false);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Falha ao carregar mais cartas";
            setError(msg);
        } finally {
            setLoadingMore(false);
        }
    }, [page, hasMore, loadingMore, initialLoading, pokemonName]);

    useEffect(() => {
        if (!hasMore || initialLoading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadNextPage();
                }
            },
            { rootMargin: "200px" },
        );

        const currentSentinel = sentinelRef.current;
        if (currentSentinel) {
            observer.observe(currentSentinel);
        }

        return () => {
            if (currentSentinel) {
                observer.unobserve(currentSentinel);
            }
        };
    }, [hasMore, initialLoading, loadNextPage]);

    const handleAddCard = async (card: SearchCardItem) => {
        if (submittingCardId) return;

        const cardVariant = variantsByCard[card.id] ?? defaultVariant(card.variants);

        try {
            setSubmittingCardId(card.id);
            setError(null);

            const res = await fetch("/api/cards", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tcgdex_card_id: card.id,
                    pokemon_dex_id: dexId,
                    card_name: card.name,
                    card_image_url: formatTcgdexImageUrl(card.image),
                    card_set_name: card.setName || "",
                    card_rarity: card.rarity || "",
                    card_language: lang,
                    card_variant: cardVariant,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Erro ao adicionar carta");
            }

            onCardAdded(data.card);
            onClose();
            toast.success("Carta adicionada à Coleção!", {
                description: `${card.name} (${formatVariantLabel(cardVariant)}) cadastrada com sucesso.`,
            });
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Erro ao adicionar";
            setError(msg);
            toast.error("Erro ao adicionar carta", {
                description: msg,
            });
        } finally {
            setSubmittingCardId(null);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="flex h-[85vh] max-h-[820px] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#12151d] shadow-2xl md:max-w-5xl lg:max-w-6xl">
                <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-4">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <h2 className="text-xl font-bold text-white tracking-tight">{pokemonName}</h2>
                            <span className="rounded-md border border-white/10 bg-white/10 px-2 py-0.5 font-mono text-xs font-semibold text-slate-300">#{String(dexId).padStart(3, "0")}</span>
                        </div>
                        <p className="mt-0.5 text-xs text-slate-400">Escolha o idioma e a versão física, depois adicione à coleção</p>
                    </div>

                    <button onClick={onClose} aria-label="Fechar" className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white">
                        <X size={18} />
                    </button>
                </div>

                <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/5 bg-black/20 px-6 py-3.5">
                    <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-xs font-medium text-slate-400">Idioma da sua carta:</span>
                        <LanguageSlider value={lang} onChange={setLang} size="sm" ariaLabel="Idioma da carta a ser adicionada" />
                    </div>
                </div>

                {error && <div className="mx-6 mt-3 shrink-0 rounded-lg border border-red-500/30 bg-red-500/15 p-3 text-xs text-red-200">{error}</div>}

                <div className="flex-1 overflow-y-auto p-6">
                    {initialLoading ? (
                        <div className="flex h-full min-h-[250px] flex-col items-center justify-center">
                            <PokeballLoader message="Carregando cartas..." size="md" />
                        </div>
                    ) : cards.length === 0 ? (
                        <div className="flex h-full min-h-[250px] flex-col items-center justify-center gap-2 text-slate-500">
                            <Search size={32} className="text-slate-600" />
                            <span className="text-sm">Nenhuma carta com imagem encontrada.</span>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                                {cards.map((card, index) => {
                                    const isSubmittingThis = submittingCardId === card.id;
                                    const appear = getCardAppearProps(index);
                                    const selectedVariant = variantsByCard[card.id] ?? defaultVariant(card.variants);
                                    const rarityInfo = card.rarity ? getRarityBadgeStyle(card.rarity) : null;
                                    const shineMode = resolveCardShine(selectedVariant, card.rarity);
                                    const isSelectOpen = openVariantSelectId === card.id;
                                    const anySelectOpen = openVariantSelectId !== null;

                                    return (
                                        <div key={card.id} className={`group relative flex h-full flex-col justify-between gap-2 rounded-xl border p-2.5 transition-all duration-200 ${isSubmittingThis ? "border-poke-blue bg-poke-blue/15 ring-2 ring-poke-blue/40" : "border-white/10 bg-white/[0.03] hover:border-poke-blue/50 hover:bg-white/[0.07]"} ${isSelectOpen ? "z-50" : anySelectOpen ? "z-0" : ""} ${appear.className}`} style={appear.style}>
                                            <div className="relative aspect-[2.5/3.5] w-full shrink-0 cursor-pointer" onClick={() => handleAddCard(card)}>
                                                <Card3DTilt className="relative h-full w-full overflow-hidden rounded-lg" maxTilt={8} maxMove={3} scale={1} glareOpacity={0.2} perspective={900} shineMode={shineMode} paused={anySelectOpen}>
                                                    <Image src={formatTcgdexImageUrl(card.image)} alt={card.name} fill sizes="(max-width: 768px) 50vw, 200px" className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" />
                                                </Card3DTilt>
                                            </div>

                                            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 py-0.5">
                                                <div className="flex h-4 items-center min-w-0">
                                                    <span className="truncate text-xs font-semibold text-white group-hover:text-poke-blue transition-colors" title={card.name}>
                                                        {card.name}
                                                    </span>
                                                </div>

                                                <div className="flex h-5 items-center justify-between gap-1.5 min-w-0">
                                                    <span className="truncate text-[11px] text-slate-400 min-w-0 flex-1" title={card.setName || "Coleção"}>
                                                        {card.setName || "Coleção"}
                                                    </span>

                                                    {rarityInfo && (
                                                        <span title={rarityInfo.label} className={`shrink-0 inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-semibold border max-w-[85px] sm:max-w-[95px] ${rarityInfo.badgeClasses}`}>
                                                            <span className="truncate">{rarityInfo.label}</span>
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="relative w-full" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                                                    <Select<CardVariant> value={selectedVariant} onChange={(value) => setVariantsByCard((prev) => ({ ...prev, [card.id]: value }))} options={VARIANT_SELECT_OPTIONS} size="sm" className="!w-full sm:!w-full" onOpenChange={(open) => setOpenVariantSelectId(open ? card.id : null)} ariaLabel={`Versão física de ${card.name}`} />
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddCard(card);
                                                }}
                                                disabled={Boolean(submittingCardId)}
                                                title="Adicionar à Coleção"
                                                className="mt-auto flex h-7 w-full cursor-pointer items-center justify-center gap-1 rounded-md bg-white/10 px-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-poke-blue group-hover:bg-poke-blue disabled:opacity-60"
                                            >
                                                {isSubmittingThis ? <Spinner size={12} className="text-white" /> : <Plus size={12} className="shrink-0" />}
                                                <span className="whitespace-nowrap">Adicionar</span>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>

                            <div ref={sentinelRef} className="flex min-h-8 items-center justify-center">
                                {loadingMore && (
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <Spinner size={16} />
                                        <span>Carregando mais cartas...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
