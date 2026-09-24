"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UserCard } from "@/types/binder";
import { formatTcgdexImageUrl } from "@/lib/pokemon/tcgdex";
import { getPokemonSilhouetteUrl, markSilhouetteLoaded } from "@/lib/pokemon/constants";
import { useCollectionCards } from "@/lib/swr";
import { PokeballLoader } from "@/components/loading/PokeballLoader";
import { FlagIcon } from "@/components/ui/FlagIcon";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { getCardAppearProps } from "@/lib/ui/cardAppear";
import { cardCopyGroupKey, formatVariantLabel, resolveCardShine } from "@/lib/pokemon/variant";
import { X, Sparkles, Check, Search, Plus, BookOpen, Pencil } from "lucide-react";

interface BinderSlotSelectModalProps {
    isOpen: boolean;
    dexId: number;
    pokemonName: string;
    activeCardId?: string;
    activeCard?: UserCard;
    onClose: () => void;
    onCardSelected: (card: UserCard) => void;
    onCardRemoved?: (card: UserCard) => void;
    onOpenCatalogSearch: () => void;
}

interface GroupedSlotCardItem {
    key: string;
    card: UserCard;
    totalCount: number;
    hasInBinder: boolean;
    activeCard: UserCard;
}

export function BinderSlotSelectModal({ isOpen, dexId, pokemonName, activeCardId, activeCard, onClose, onCardSelected, onCardRemoved, onOpenCatalogSearch }: BinderSlotSelectModalProps) {
    const router = useRouter();
    const { cards: collection, isLoading } = useCollectionCards(isOpen ? dexId : null);

    const [selectedCardId, setSelectedCardId] = useState<string | undefined>(activeCardId);
    const [previewCard, setPreviewCard] = useState<UserCard | undefined>(activeCard);
    const [userDeselected, setUserDeselected] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setSelectedCardId(activeCardId);
            setPreviewCard(activeCard);
            setUserDeselected(false);
            return;
        }
        setSelectedCardId(undefined);
        setPreviewCard(undefined);
        setUserDeselected(false);
    }, [isOpen, activeCardId, activeCard]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen || userDeselected) return;
        if (!previewCard && collection.length > 0) {
            const inBinder = collection.find((c) => c.id === selectedCardId || (selectedCardId === undefined && c.is_in_binder));
            if (inBinder) {
                setPreviewCard(inBinder);
                if (!selectedCardId) {
                    setSelectedCardId(inBinder.id);
                }
            }
        }
    }, [isOpen, userDeselected, collection, previewCard, selectedCardId]);

    const groupedCards = useMemo(() => {
        const groupsMap = new Map<string, GroupedSlotCardItem>();

        collection.forEach((c) => {
            const groupKey = cardCopyGroupKey(c);
            const existing = groupsMap.get(groupKey);
            const isCardCurrent = c.id === selectedCardId;

            if (existing) {
                existing.totalCount += 1;
                if (isCardCurrent) {
                    existing.hasInBinder = true;
                    existing.activeCard = c;
                    existing.card = c;
                }
            } else {
                groupsMap.set(groupKey, {
                    key: groupKey,
                    card: c,
                    totalCount: 1,
                    hasInBinder: isCardCurrent,
                    activeCard: c,
                });
            }
        });

        return Array.from(groupsMap.values());
    }, [collection, selectedCardId]);

    const handleSelectCard = (card: UserCard) => {
        if (card.id === selectedCardId) return;
        setUserDeselected(false);
        setSelectedCardId(card.id);
        setPreviewCard(card);
        onCardSelected(card);
    };

    const handleRemoveCard = (card: UserCard) => {
        setUserDeselected(true);
        setSelectedCardId(undefined);
        setPreviewCard(undefined);
        onCardRemoved?.(card);
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-4 backdrop-blur-md"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="flex max-h-[92vh] w-full max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl flex-col items-center justify-center gap-5 lg:flex-row lg:items-center">
                <div className="hidden lg:flex lg:w-[240px] xl:w-[300px] 2xl:w-[340px] shrink-0 flex-col items-center justify-center transition-all duration-200">
                    {previewCard ? (
                        <>
                            <div className="relative aspect-[2.5/3.5] w-full select-none">
                                <Card3DTilt key={previewCard.id} className="relative h-full w-full overflow-hidden rounded-lg" maxTilt={10} maxMove={4} scale={1} glareOpacity={0.25} perspective={1000} shineMode={resolveCardShine(previewCard.card_variant, previewCard.card_rarity)}>
                                    <Image key={previewCard.id} src={formatTcgdexImageUrl(previewCard.card_image_url)} alt={previewCard.card_name} fill sizes="(max-width: 1280px) 240px, 340px" className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]" priority unoptimized />
                                </Card3DTilt>
                            </div>
                            <div className="mt-3 flex flex-col items-center gap-0.5 text-center">
                                <span className="truncate max-w-[240px] xl:max-w-[300px] text-sm font-bold text-white">{previewCard.card_name}</span>
                                <span className="truncate max-w-[240px] xl:max-w-[300px] text-xs text-slate-400">{previewCard.card_set_name || "Coleção"}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="relative flex aspect-[2.5/3.5] w-full select-none flex-col items-center justify-between rounded-2xl border-2 border-dashed border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5 shadow-2xl backdrop-blur-md">
                                <div className="flex w-full items-center justify-between">
                                    <span className="rounded bg-black/40 px-2 py-0.5 text-xs font-bold text-slate-400 backdrop-blur-sm">#{String(dexId).padStart(3, "0")}</span>
                                    <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-slate-400">Vazio</span>
                                </div>

                                <div className="relative flex h-36 w-36 items-center justify-center">
                                    <Image src={getPokemonSilhouetteUrl(dexId)} alt={pokemonName} fill sizes="(max-width: 1280px) 150px, 180px" className="object-contain opacity-25" priority unoptimized onLoad={() => markSilhouetteLoaded(dexId)} />
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <span className="text-xs font-semibold text-slate-300">{pokemonName}</span>
                                    <span className="text-[11px] text-slate-500">Nenhuma carta no binder</span>
                                </div>
                            </div>
                            <div className="mt-3 flex flex-col items-center gap-0.5 text-center">
                                <span className="text-xs text-slate-400">Selecione uma carta ao lado para exibir</span>
                            </div>
                        </>
                    )}
                </div>

                <div className="flex h-[85vh] max-h-[780px] w-full flex-1 min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#12151d] shadow-2xl">
                    <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
                        <div>
                            <div className="flex items-center gap-2.5">
                                <h2 className="text-xl font-bold text-white tracking-tight">{pokemonName}</h2>
                                <span className="rounded-md border border-white/10 bg-white/10 px-2 py-0.5 font-mono text-xs font-semibold text-slate-300">#{String(dexId).padStart(3, "0")}</span>
                            </div>
                            <p className="mt-0.5 text-xs text-slate-400">Selecione uma carta da sua coleção para exibir no binder</p>
                        </div>

                        <button onClick={onClose} aria-label="Fechar" className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white">
                            <X size={18} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                        {isLoading ? (
                            <div className="flex h-full min-h-[250px] flex-col items-center justify-center">
                                <PokeballLoader message="Buscando suas cartas na coleção..." size="md" />
                            </div>
                        ) : groupedCards.length === 0 ? (
                            <div className="flex h-full min-h-[250px] flex-col items-center justify-center gap-4 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400">
                                    <Search size={22} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">Nenhuma carta encontrada</p>
                                    <p className="mt-1 text-xs text-slate-400">Você ainda não tem exemplares de {pokemonName} cadastrados na sua coleção.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        onClose();
                                        onOpenCatalogSearch();
                                    }}
                                    className="flex cursor-pointer items-center gap-2 rounded-xl bg-poke-blue px-4 py-2.5 text-xs font-semibold text-white shadow-md transition-opacity hover:opacity-90"
                                >
                                    <Plus size={15} />
                                    <span>Buscar no catálogo</span>
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                                {groupedCards.map((group, index) => {
                                    const card = group.card;
                                    const isCurrent = group.hasInBinder;
                                    const appear = getCardAppearProps(index);

                                    return (
                                        <div key={group.key} className={`group relative flex flex-col justify-between gap-2 rounded-xl border p-2.5 transition-all duration-200 ${isCurrent ? "border-poke-blue bg-poke-blue/10 ring-2 ring-poke-blue/40" : "border-white/10 bg-white/[0.03] hover:border-poke-blue/50 hover:bg-white/[0.06]"} ${appear.className}`} style={appear.style}>
                                            <div className="z-10 flex min-h-[22px] items-center justify-between">
                                                <span className="rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-slate-300 backdrop-blur-sm">#{String(card.pokemon_dex_id).padStart(3, "0")}</span>

                                                <div className="flex items-center gap-1">
                                                    {isCurrent && (
                                                        <span title="No Binder" aria-label="No Binder" className="flex items-center justify-center rounded border border-poke-blue/40 bg-poke-blue/20 p-1 text-poke-blue">
                                                            <BookOpen size={13} />
                                                        </span>
                                                    )}

                                                    {group.totalCount > 1 && (
                                                        <span title={`${group.totalCount} cópias idênticas`} className="rounded bg-poke-blue px-1.5 py-0.5 text-[10px] font-extrabold text-white">
                                                            x{group.totalCount}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div role="button" tabIndex={0} onClick={() => (isCurrent ? handleRemoveCard(group.activeCard) : handleSelectCard(group.activeCard))} className="relative aspect-[2.5/3.5] w-full cursor-pointer">
                                                <Card3DTilt className="relative h-full w-full overflow-hidden rounded-lg" maxTilt={8} maxMove={3} scale={1} glareOpacity={0.2} perspective={900} shineMode={resolveCardShine(card.card_variant, card.card_rarity)}>
                                                    <Image src={formatTcgdexImageUrl(card.card_image_url)} alt={card.card_name} fill sizes="(max-width: 768px) 50vw, 200px" className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]" unoptimized />
                                                </Card3DTilt>
                                            </div>

                                            <div className="flex flex-col gap-0.5">
                                                <span className="truncate text-xs font-semibold text-white group-hover:text-poke-blue transition-colors">{card.card_name}</span>

                                                <div className="flex items-center justify-between gap-1 text-[11px] text-slate-400">
                                                    <span className="truncate min-w-0 text-[10px] sm:text-[11px]">{card.card_set_name || "Coleção"}</span>
                                                    <div className="flex shrink-0 items-center gap-1 whitespace-nowrap">
                                                        <span className="rounded border border-white/10 bg-white/5 px-1 py-0.5 text-[9px] font-bold text-slate-300">{formatVariantLabel(card.card_variant)}</span>
                                                        <FlagIcon country={card.card_language} />
                                                        <span className="uppercase text-[9px] sm:text-[10px] font-bold whitespace-nowrap">{card.card_language}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-1 flex items-center gap-1.5">
                                                <button
                                                    type="button"
                                                    onClick={() => (isCurrent ? handleRemoveCard(group.activeCard) : handleSelectCard(group.activeCard))}
                                                    className={`group/btn flex flex-1 min-w-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg py-2 px-2 text-xs font-semibold leading-none transition-colors duration-150 ${isCurrent ? "border border-poke-blue/40 bg-poke-blue/20 text-poke-blue hover:border-red-500/40 hover:bg-red-500/20 hover:text-red-300" : "bg-white/10 text-white hover:bg-poke-blue hover:shadow-md hover:shadow-poke-blue/20"}`}
                                                    title={isCurrent ? "Clique para remover do binder" : "Exibir no binder"}
                                                >
                                                    {isCurrent ? (
                                                        <>
                                                            <span className="flex items-center gap-1.5 group-hover/btn:hidden">
                                                                <Check size={13} className="shrink-0" />
                                                                <span className="truncate whitespace-nowrap leading-none">Em exibição</span>
                                                            </span>
                                                            <span className="hidden items-center gap-1.5 group-hover/btn:flex">
                                                                <X size={13} className="shrink-0" />
                                                                <span className="truncate whitespace-nowrap leading-none">Remover</span>
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <BookOpen size={13} className="shrink-0" />
                                                            <span className="truncate whitespace-nowrap leading-none">Exibir</span>
                                                        </>
                                                    )}
                                                </button>

                                                <button
                                                    type="button"
                                                    title="Editar exemplar"
                                                    aria-label="Editar exemplar"
                                                    onClick={() => {
                                                        onClose();
                                                        router.push(`/cards/${group.activeCard.id}?from=binder&dexId=${card.pokemon_dex_id}`);
                                                    }}
                                                    className="flex shrink-0 cursor-pointer items-center justify-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-xs font-semibold leading-none text-slate-300 transition-colors duration-150 hover:border-white/20 hover:bg-white/15 hover:text-white"
                                                >
                                                    <Pencil size={13} className="shrink-0" />
                                                    <span className="hidden sm:inline leading-none">Editar</span>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {collection.length > 0 && (
                        <div className="flex shrink-0 items-center justify-between border-t border-white/10 bg-black/30 px-5 py-3.5 sm:px-6">
                            <span className="text-xs text-slate-400">{collection.length === 1 ? "1 exemplar cadastrado" : `${collection.length} exemplares cadastrados`}</span>

                            <button
                                type="button"
                                onClick={() => {
                                    onClose();
                                    onOpenCatalogSearch();
                                }}
                                className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <Plus size={14} />
                                <span>Adicionar Carta</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
