"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { PokeballLoader } from "@/components/loading/PokeballLoader";
import { LanguageSlider } from "@/components/ui/LanguageSlider";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { CardImage } from "@/components/ui/CardImage";
import { formatTcgdexImageUrl } from "@/lib/pokemon/tcgdex";
import { useCardDetails } from "@/lib/swr";
import { useSWRConfig } from "swr";
import { CardLanguage, CardVariant, CardCondition, UserCard, CardDetailsResponse } from "@/types/binder";
import { getRarityBadgeStyle } from "@/lib/pokemon/rarity";
import { VARIANT_SLIDER_OPTIONS, formatVariantLabel, isCardVariant, resolveCardShine } from "@/lib/pokemon/variant";
import { CONDITION_SLIDER_OPTIONS, formatConditionLabel, getConditionBadgeStyle, isCardCondition } from "@/lib/pokemon/condition";
import { ConditionBadge } from "@/components/ui/ConditionBadge";
import { applyCollectionCardMutation, isGroupedCollectionListRequestKey, type CollectionCachedPage, type CollectionCardMutation } from "@/lib/collection/cache";
import { resolveCardElementTypes } from "@/lib/pokemon/cardTypes";
import { toast } from "sonner";
import { ArrowLeft, Sparkles, BookOpen, Trash2, Plus, Minus, AlertCircle, Calendar, Layers, Loader2, Search, RefreshCw, Circle, Palette } from "lucide-react";
import { useDismissibleOverlay } from "@/lib/hooks/useDismissibleOverlay";
import { useOverlayPresence } from "@/lib/hooks/useOverlayPresence";

const CardLightbox = dynamic(() => import("@/components/ui/CardLightbox").then((m) => m.CardLightbox), { ssr: false });

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export interface CardDetailClientProps {
    cardId: string;
    initialData: CardDetailsResponse;
}

export function CardDetailClient({ cardId, initialData }: CardDetailClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const fromParam = searchParams.get("from");
    const spreadParam = searchParams.get("spread");
    const dexIdParam = searchParams.get("dexId");
    const binderIdParam = searchParams.get("binderId");
    const slotIdParam = searchParams.get("slotId");

    const { card, copies, isLoading, isError, mutate, allocation } = useCardDetails(cardId, initialData);
    const { mutate: globalMutate, cache } = useSWRConfig();

    const syncCachedCollection = (mutation: CollectionCardMutation) => {
        const snapshots = new Map<string, CollectionCachedPage>();
        for (const key of cache.keys()) {
            if (!isGroupedCollectionListRequestKey(key)) continue;
            const previous = cache.get(key)?.data as CollectionCachedPage | undefined;
            if (!previous) continue;
            snapshots.set(key, previous);
            void globalMutate(key, applyCollectionCardMutation(key, previous, mutation), false);
        }

        return () => {
            for (const [key, snapshot] of snapshots) {
                void globalMutate(key, snapshot, false);
            }
        };
    };

    const [isUpdatingBinder, setIsUpdatingBinder] = useState(false);
    const [updatingLang, setUpdatingLang] = useState<CardLanguage | null>(null);
    const [optimisticLang, setOptimisticLang] = useState<CardLanguage | null>(null);
    const [updatingVariant, setUpdatingVariant] = useState<CardVariant | null>(null);
    const [optimisticVariant, setOptimisticVariant] = useState<CardVariant | null>(null);
    const [updatingCondition, setUpdatingCondition] = useState<CardCondition | null>(null);
    const [optimisticCondition, setOptimisticCondition] = useState<CardCondition | null>(null);
    const [isUpdatingCopies, setIsUpdatingCopies] = useState(false);
    const [actionError, setActionError] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [cardImageLoaded, setCardImageLoaded] = useState(false);

    useDismissibleOverlay(isDeleteModalOpen, () => setIsDeleteModalOpen(false), isDeleting);
    const { isPresent: isDeleteModalPresent, state: deleteModalOverlayState } = useOverlayPresence(isDeleteModalOpen);

    useEffect(() => {
        setCardImageLoaded(false);
    }, [card?.id]);

    useEffect(() => {
        setOptimisticLang(null);
    }, [card?.card_language]);

    useEffect(() => {
        setOptimisticVariant(null);
    }, [card?.card_variant]);

    useEffect(() => {
        setOptimisticCondition(null);
    }, [card?.card_condition]);

    const returnToBinderModal = () => {
        const targetBinderId = allocation?.binder_id ?? binderIdParam;
        const targetSlotId = allocation?.slot_id ?? slotIdParam;
        const targetPage = allocation?.page_number ?? Number(searchParams.get("page"));

        if (targetBinderId && targetSlotId && UUID_REGEX.test(targetBinderId) && UUID_REGEX.test(targetSlotId)) {
            const params = new URLSearchParams({ openSlot: targetSlotId });
            if (Number.isInteger(targetPage) && targetPage > 0) params.set("page", String(targetPage));
            router.push(`/binders/${targetBinderId}?${params.toString()}`);
            return true;
        }

        return false;
    };

    const handleBack = () => {
        if (fromParam === "binder") {
            if (returnToBinderModal()) return;

            const targetDexId = card?.pokemon_dex_id || (dexIdParam ? parseInt(dexIdParam, 10) : undefined);
            if (targetDexId) {
                router.push(`/?dexId=${targetDexId}&openSelect=true`);
                return;
            }
            if (spreadParam) {
                router.push(`/?spread=${spreadParam}`);
                return;
            }
            router.push("/");
            return;
        }

        if (fromParam === "collection") {
            if (window.history.length > 1) {
                router.back();
            } else {
                router.push("/collection");
            }
            return;
        }

        if (window.history.length > 1) {
            router.back();
        } else {
            router.push("/collection");
        }
    };

    const handleChangeLanguage = async (newLang: CardLanguage) => {
        if (!card || (optimisticLang ?? card.card_language) === newLang || updatingLang !== null) return;
        setOptimisticLang(newLang);
        setUpdatingLang(newLang);
        const targetDexId = card.pokemon_dex_id;
        const collectionKey = targetDexId != null ? `/api/cards?pokemon_dex_id=${targetDexId}` : "/api/cards";
        const rollbackCollection = syncCachedCollection({ updatedCards: [{ ...card, card_language: newLang }] });
        try {
            setActionError(null);

            if (card.is_in_binder) {
                globalMutate(
                    "/api/binder",
                    (prev?: { cards: UserCard[]; availableCounts?: Record<number, number> }) => {
                        if (!prev) return prev;
                        return {
                            ...prev,
                            cards: prev.cards.map((c) => (c.id === card.id ? { ...c, card_language: newLang } : c)),
                        };
                    },
                    false,
                );
            }

            globalMutate(
                collectionKey,
                (prev?: { cards: UserCard[] }) => {
                    if (!prev) return prev;
                    return {
                        cards: prev.cards.map((c) => (c.id === card.id ? { ...c, card_language: newLang } : c)),
                    };
                },
                false,
            );

            const res = await fetch(`/api/cards/${card.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ card_language: newLang }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erro ao atualizar idioma");

            syncCachedCollection({ updatedCards: [data.card] });
            void mutate();

            const langLabels: Record<string, string> = { "pt-br": "Português", en: "Inglês", ja: "Japonês" };
            toast.success("Idioma atualizado", {
                description: `Idioma alterado para ${langLabels[newLang] || newLang.toUpperCase()}.`,
            });
        } catch (err: unknown) {
            rollbackCollection();
            setOptimisticLang(null);
            void mutate();
            if (card.is_in_binder) {
                void globalMutate("/api/binder");
            }
            void globalMutate(collectionKey);
            const msg = err instanceof Error ? err.message : "Erro ao atualizar idioma";
            setActionError(msg);
            toast.error("Erro ao atualizar idioma", {
                description: msg,
            });
        } finally {
            setUpdatingLang(null);
        }
    };

    const handleChangeVariant = async (newVariant: CardVariant) => {
        const currentVariant = optimisticVariant ?? (isCardVariant(card?.card_variant) ? card!.card_variant : "normal");
        if (!card || currentVariant === newVariant || updatingVariant !== null) return;
        setOptimisticVariant(newVariant);
        setUpdatingVariant(newVariant);
        const targetDexId = card.pokemon_dex_id;
        const collectionKey = targetDexId != null ? `/api/cards?pokemon_dex_id=${targetDexId}` : "/api/cards";
        const rollbackCollection = syncCachedCollection({ updatedCards: [{ ...card, card_variant: newVariant }] });
        try {
            setActionError(null);

            if (card.is_in_binder) {
                globalMutate(
                    "/api/binder",
                    (prev?: { cards: UserCard[]; availableCounts?: Record<number, number> }) => {
                        if (!prev) return prev;
                        return {
                            ...prev,
                            cards: prev.cards.map((c) => (c.id === card.id ? { ...c, card_variant: newVariant } : c)),
                        };
                    },
                    false,
                );
            }

            globalMutate(
                collectionKey,
                (prev?: { cards: UserCard[] }) => {
                    if (!prev) return prev;
                    return {
                        cards: prev.cards.map((c) => (c.id === card.id ? { ...c, card_variant: newVariant } : c)),
                    };
                },
                false,
            );

            const res = await fetch(`/api/cards/${card.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ card_variant: newVariant }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erro ao atualizar versão");

            syncCachedCollection({ updatedCards: [data.card] });
            void mutate();

            toast.success("Versão atualizada", {
                description: `Versão alterada para ${formatVariantLabel(newVariant)}.`,
            });
        } catch (err: unknown) {
            rollbackCollection();
            setOptimisticVariant(null);
            void mutate();
            if (card.is_in_binder) {
                void globalMutate("/api/binder");
            }
            void globalMutate(collectionKey);
            const msg = err instanceof Error ? err.message : "Erro ao atualizar versão";
            setActionError(msg);
            toast.error("Erro ao atualizar versão", {
                description: msg,
            });
        } finally {
            setUpdatingVariant(null);
        }
    };

    const handleChangeCondition = async (newCondition: CardCondition) => {
        const currentCondition = optimisticCondition ?? (isCardCondition(card?.card_condition) ? card!.card_condition : "NM");
        if (!card || currentCondition === newCondition || updatingCondition !== null) return;
        setOptimisticCondition(newCondition);
        setUpdatingCondition(newCondition);
        const targetDexId = card.pokemon_dex_id;
        const collectionKey = targetDexId != null ? `/api/cards?pokemon_dex_id=${targetDexId}` : "/api/cards";
        const rollbackCollection = syncCachedCollection({ updatedCards: [{ ...card, card_condition: newCondition }] });
        try {
            setActionError(null);

            if (card.is_in_binder) {
                globalMutate(
                    "/api/binder",
                    (prev?: { cards: UserCard[]; availableCounts?: Record<number, number> }) => {
                        if (!prev) return prev;
                        return {
                            ...prev,
                            cards: prev.cards.map((c) => (c.id === card.id ? { ...c, card_condition: newCondition } : c)),
                        };
                    },
                    false,
                );
            }

            globalMutate(
                collectionKey,
                (prev?: { cards: UserCard[] }) => {
                    if (!prev) return prev;
                    return {
                        cards: prev.cards.map((c) => (c.id === card.id ? { ...c, card_condition: newCondition } : c)),
                    };
                },
                false,
            );

            const res = await fetch(`/api/cards/${card.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ card_condition: newCondition }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erro ao atualizar estado");

            syncCachedCollection({ updatedCards: [data.card] });
            void mutate();

            toast.success("Estado atualizado", {
                description: `Estado alterado para ${formatConditionLabel(newCondition)}.`,
            });
        } catch (err: unknown) {
            rollbackCollection();
            setOptimisticCondition(null);
            void mutate();
            if (card.is_in_binder) {
                void globalMutate("/api/binder");
            }
            void globalMutate(collectionKey);
            const msg = err instanceof Error ? err.message : "Erro ao atualizar estado";
            setActionError(msg);
            toast.error("Erro ao atualizar estado", {
                description: msg,
            });
        } finally {
            setUpdatingCondition(null);
        }
    };

    const handleRemoveFromBinder = async () => {
        if (!allocation || isUpdatingBinder) return;
        setIsUpdatingBinder(true);
        setActionError(null);
        try {
            const res = await fetch(`/api/binders/${allocation.binder_id}/slots/${allocation.slot_id}/assign`, {
                method: "DELETE",
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Erro ao remover carta do binder");
            }
            toast.success("Carta removida do binder!", {
                description: `${card?.card_name} foi guardada de volta na sua coleção.`,
            });
            void mutate();
            void globalMutate((key) => typeof key === "string" && (key.startsWith("/api/binder") || key.startsWith("/api/cards")));
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Erro ao remover carta";
            setActionError(msg);
            toast.error(msg);
        } finally {
            setIsUpdatingBinder(false);
        }
    };

    const handleAddDuplicateCopy = async () => {
        if (!card || isUpdatingCopies) return;
        const targetDexId = card.pokemon_dex_id;
        const collectionKey = targetDexId != null ? `/api/cards?pokemon_dex_id=${targetDexId}` : "/api/cards";
        try {
            setIsUpdatingCopies(true);
            setActionError(null);

            globalMutate(
                "/api/binder",
                (prev?: { cards: UserCard[]; availableCounts?: Record<number, number> }) => {
                    if (!prev) return prev;
                    const prevCounts = prev.availableCounts ?? {};
                    const currentCount = targetDexId != null ? prevCounts[targetDexId] || 0 : 0;
                    return {
                        ...prev,
                        availableCounts:
                            targetDexId != null
                                ? {
                                      ...prevCounts,
                                      [targetDexId]: currentCount + 1,
                                  }
                                : prevCounts,
                    };
                },
                false,
            );

            const res = await fetch("/api/cards", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tcgdex_card_id: card.tcgdex_card_id,
                    pokemon_dex_id: card.pokemon_dex_id,
                    card_name: card.card_name,
                    card_image_url: card.card_image_url,
                    card_set_name: card.card_set_name,
                    card_rarity: card.card_rarity,
                    card_artist: card.card_artist || "",
                    card_condition: card.card_condition || "NM",
                    card_types: card.card_types,
                    card_language: card.card_language,
                    card_variant: card.card_variant || "normal",
                    is_in_binder: false,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erro ao adicionar cópia idêntica");

            syncCachedCollection({ addedCards: [data.card] });
            void mutate();
            void globalMutate("/api/binder");
            void globalMutate(collectionKey);
            void globalMutate("/api/dashboard");

            toast.success("Cópia adicionada!", {
                description: `Mais um exemplar de ${card.card_name} adicionado à coleção.`,
            });
        } catch (err: unknown) {
            void mutate();
            void globalMutate("/api/binder");
            void globalMutate(collectionKey);
            const msg = err instanceof Error ? err.message : "Erro ao adicionar cópia";
            setActionError(msg);
            toast.error("Erro ao adicionar cópia", {
                description: msg,
            });
        } finally {
            setIsUpdatingCopies(false);
        }
    };

    const handleRemoveDuplicateCopy = async () => {
        if (!card || copies.length <= 1 || isUpdatingCopies) return;
        const copyToDelete = copies.find((c) => !c.is_in_binder && c.id !== card.id) || copies.find((c) => c.id !== card.id) || card;
        const targetDexId = card.pokemon_dex_id;
        const collectionKey = targetDexId != null ? `/api/cards?pokemon_dex_id=${targetDexId}` : "/api/cards";
        const isCopyInBinder = Boolean(copyToDelete.is_in_binder);
        const rollbackCollection = syncCachedCollection({ deletedCardIds: [copyToDelete.id] });
        try {
            setIsUpdatingCopies(true);
            setActionError(null);

            globalMutate(
                "/api/binder",
                (prev?: { cards: UserCard[]; availableCounts?: Record<number, number> }) => {
                    if (!prev) return prev;
                    const prevCounts = prev.availableCounts ?? {};
                    const currentCount = targetDexId != null ? prevCounts[targetDexId] || 0 : 0;
                    return {
                        cards: isCopyInBinder ? prev.cards.filter((c) => c.id !== copyToDelete.id) : prev.cards,
                        availableCounts:
                            targetDexId != null
                                ? {
                                      ...prevCounts,
                                      [targetDexId]: isCopyInBinder ? currentCount : Math.max(0, currentCount - 1),
                                  }
                                : prevCounts,
                    };
                },
                false,
            );

            globalMutate(
                collectionKey,
                (prev?: { cards: UserCard[] }) => {
                    if (!prev) return prev;
                    return {
                        cards: prev.cards.filter((c) => c.id !== copyToDelete.id),
                    };
                },
                false,
            );

            globalMutate(
                "/api/cards",
                (prev?: { cards: UserCard[] }) => {
                    if (!prev) return prev;
                    return {
                        cards: prev.cards.filter((c) => c.id !== copyToDelete.id),
                    };
                },
                false,
            );

            const res = await fetch(`/api/cards/${copyToDelete.id}`, {
                method: "DELETE",
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erro ao remover cópia");

            toast.success("Cópia removida", {
                description: `Um exemplar de ${card.card_name} foi removido da coleção.`,
            });

            syncCachedCollection({ deletedCardIds: [copyToDelete.id] });
            void globalMutate("/api/binder");
            void globalMutate(collectionKey);
            void globalMutate("/api/dashboard");

            if (copyToDelete.id === card.id) {
                const remaining = copies.filter((c) => c.id !== card.id);
                if (remaining.length > 0) {
                    router.replace(`/cards/${remaining[0].id}?from=${fromParam || "collection"}${dexIdParam ? `&dexId=${dexIdParam}` : ""}`);
                    return;
                }
            }

            void mutate();
        } catch (err: unknown) {
            rollbackCollection();
            void mutate();
            void globalMutate("/api/binder");
            void globalMutate(collectionKey);
            const msg = err instanceof Error ? err.message : "Erro ao remover cópia";
            setActionError(msg);
            toast.error("Erro ao remover cópia", {
                description: msg,
            });
        } finally {
            setIsUpdatingCopies(false);
        }
    };

    const handleDeleteAllCopies = async () => {
        if (!card || isDeleting) return;
        const targetDexId = card.pokemon_dex_id;
        const collectionKey = targetDexId != null ? `/api/cards?pokemon_dex_id=${targetDexId}` : "/api/cards";
        const deletedIds = new Set(copies.map((c) => c.id));
        deletedIds.add(card.id);
        try {
            setIsDeleting(true);
            setActionError(null);

            globalMutate(
                "/api/binder",
                (prev?: { cards: UserCard[]; availableCounts?: Record<number, number> }) => {
                    if (!prev) return prev;
                    return {
                        cards: prev.cards.filter((c) => !deletedIds.has(c.id) && (targetDexId != null ? c.pokemon_dex_id !== targetDexId : true)),
                        availableCounts:
                            targetDexId != null
                                ? {
                                      ...(prev.availableCounts || {}),
                                      [targetDexId]: 0,
                                  }
                                : prev.availableCounts,
                    };
                },
                false,
            );

            globalMutate(
                collectionKey,
                (prev?: { cards: UserCard[] }) => {
                    if (!prev) return prev;
                    return {
                        cards: prev.cards.filter((c) => !deletedIds.has(c.id)),
                    };
                },
                false,
            );

            globalMutate(
                "/api/cards",
                (prev?: { cards: UserCard[] }) => {
                    if (!prev) return prev;
                    return {
                        cards: prev.cards.filter((c) => !deletedIds.has(c.id)),
                    };
                },
                false,
            );

            const responses = await Promise.all(copies.map((copy) => fetch(`/api/cards/${copy.id}`, { method: "DELETE" })));
            for (const res of responses) {
                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.error || "Erro ao excluir cópia");
                }
            }

            syncCachedCollection({ deletedCardIds: deletedIds });
            void globalMutate("/api/binder");
            void globalMutate(collectionKey);
            void globalMutate("/api/dashboard");

            setIsDeleteModalOpen(false);
            toast.success("Exemplar excluído", {
                description: `Todas as cópias de ${card.card_name} foram removidas da coleção.`,
            });
            if (fromParam === "binder" && returnToBinderModal()) {
                return;
            }

            if (fromParam === "binder") {
                if (targetDexId) {
                    router.push(`/?dexId=${targetDexId}&openSelect=true`);
                } else {
                    router.push(`/?spread=${spreadParam || "1"}`);
                }
            } else {
                router.push("/collection");
            }
        } catch (err: unknown) {
            void mutate();
            void globalMutate("/api/binder");
            void globalMutate(collectionKey);
            const msg = err instanceof Error ? err.message : "Erro ao excluir carta";
            setActionError(msg);
            setIsDeleting(false);
            toast.error("Erro ao excluir carta", {
                description: msg,
            });
        }
    };

    const totalCopiesCount = copies.length || (card ? 1 : 0);
    const hasAnyInBinder = copies.some((c) => c.is_in_binder) || Boolean(card?.is_in_binder);
    const storedCopiesCount = copies.filter((c) => !c.is_in_binder).length;
    const currentVariant = optimisticVariant ?? (card && isCardVariant(card.card_variant) ? card.card_variant : "normal");
    const currentCondition = optimisticCondition ?? (card && isCardCondition(card.card_condition) ? card.card_condition : "NM");
    const conditionBadge = getConditionBadgeStyle(currentCondition);
    const shineMode = card ? resolveCardShine(currentVariant, card.card_rarity, card.card_image_url, card.card_name) : "none";
    const cardElementTypes = card ? resolveCardElementTypes(card.card_types, card.pokemon_dex_id) : undefined;

    return (
        <div className="flex min-h-screen flex-col">
            <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16">
                <div className="flex items-center justify-between">
                    <button type="button" onClick={handleBack} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white">
                        <ArrowLeft size={16} />
                        <span>Voltar</span>
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex h-96 flex-col items-center justify-center">
                        <PokeballLoader message="Carregando detalhes da carta..." size="lg" />
                    </div>
                ) : isError || !card ? (
                    <div className="profile-enter flex h-96 flex-col items-center justify-center gap-4 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
                            <AlertCircle size={28} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Carta não encontrada</h2>
                            <p className="mt-1 text-xs text-slate-400">Este exemplar pode ter sido removido ou o link é inválido.</p>
                        </div>
                        <button type="button" onClick={() => router.push("/collection")} className="rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20">
                            Ir para a Coleção
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                        <div className="flex flex-col items-center gap-5 md:col-span-5 lg:col-span-4">
                            <div
                                role="button"
                                tabIndex={0}
                                onClick={() => setIsZoomed(true)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        setIsZoomed(true);
                                    }
                                }}
                                className="card-list-appear group/card relative z-0 aspect-[8/11] w-full max-w-[290px] cursor-pointer select-none isolate"
                            >
                                <Card3DTilt className="relative h-full w-full overflow-hidden rounded-2xl bg-[#0d1017]" maxTilt={10} scale={1.03} glareOpacity={0.3} perspective={1000} shineMode={shineMode} elementTypes={cardElementTypes} isLoading={!cardImageLoaded}>
                                    <CardImage src={formatTcgdexImageUrl(card.card_image_url)} alt={card.card_name} sizes="(max-width: 768px) 80vw, 350px" className="object-contain drop-shadow-[0_16px_36px_rgba(0,0,0,0.85)] transition-all duration-300 group-hover/card:scale-[1.01]" priority onLoadingChange={setCardImageLoaded} />
                                </Card3DTilt>
                            </div>

                            <button type="button" onClick={() => setIsZoomed(true)} className="card-list-appear inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-slate-400 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white">
                                <Search size={12} />
                                <span>Toque na carta para ampliar</span>
                            </button>

                            <div className="card-list-appear flex flex-col items-center gap-2.5 text-center">
                                <div className="flex items-center gap-2.5">
                                    <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">{card.card_name}</h1>
                                    {card.pokemon_dex_id != null ? <span className="rounded-lg border border-white/10 bg-white/10 px-2.5 py-0.5 font-mono text-xs font-bold text-slate-300">#{String(card.pokemon_dex_id).padStart(3, "0")}</span> : <span className="rounded-lg border border-white/10 bg-white/10 px-2.5 py-0.5 font-mono text-xs font-bold text-slate-300">TCG</span>}
                                </div>

                                <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-400">
                                    <span>{card.card_set_name || "Coleção Base"}</span>
                                    {card.card_artist && (
                                        <>
                                            <span className="text-white/20">·</span>
                                            <span className="inline-flex items-center gap-1 text-slate-300">
                                                <Palette size={12} className="text-slate-400" />
                                                <span>{card.card_artist}</span>
                                            </span>
                                        </>
                                    )}
                                </div>

                                <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
                                    {card.card_rarity && <span className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-bold ${getRarityBadgeStyle(card.card_rarity, card.card_name).badgeClasses}`}>{getRarityBadgeStyle(card.card_rarity, card.card_name).label}</span>}

                                    <ConditionBadge condition={currentCondition} size="md" variant="both" />

                                    {currentVariant === "holo" && (
                                        <span className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/15 px-2.5 py-1 text-xs font-bold text-amber-200 shadow-sm">
                                            <Sparkles size={13} className="text-amber-300" />
                                            <span>Foil</span>
                                        </span>
                                    )}
                                    {currentVariant === "reverse" && (
                                        <span className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/15 px-2.5 py-1 text-xs font-bold text-cyan-200 shadow-sm">
                                            <RefreshCw size={13} className="text-cyan-300" />
                                            <span>Reverse Foil</span>
                                        </span>
                                    )}
                                    {currentVariant === "normal" && (
                                        <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-slate-300 shadow-sm">
                                            <Circle size={13} className="text-slate-400" />
                                            <span>Normal</span>
                                        </span>
                                    )}

                                    {card.is_in_binder && (
                                        <span title="No Binder" aria-label="No Binder" className="flex items-center gap-1.5 rounded-lg border border-poke-blue/40 bg-poke-blue/15 px-2.5 py-1 text-xs font-bold text-poke-blue shadow-sm">
                                            <BookOpen size={13} />
                                            <span>No Binder</span>
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5 md:col-span-7 lg:col-span-8">
                            {actionError && (
                                <div className="profile-enter flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/15 p-3.5 text-xs text-red-200">
                                    <AlertCircle size={16} className="shrink-0 text-red-400" />
                                    <span>{actionError}</span>
                                </div>
                            )}

                            <div className="profile-enter profile-enter-d1 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121520]/90 p-5 shadow-lg backdrop-blur-md">
                                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                                        <BookOpen size={16} className="text-poke-blue" />
                                        <span>Localização no Binder</span>
                                    </div>

                                    {allocation ? <span className="rounded-full border border-poke-blue/40 bg-poke-blue/15 px-2.5 py-0.5 text-xs font-bold text-poke-blue">Alocada</span> : <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-semibold text-slate-400">Guardada na Coleção</span>}
                                </div>

                                {allocation ? (
                                    <div className="flex flex-col gap-3">
                                        <div className="rounded-xl border border-white/5 bg-white/[0.03] p-3 text-xs text-slate-300">
                                            <p className="font-semibold text-white">{allocation.binder_name}</p>
                                            <p className="mt-1 text-slate-400">
                                                Página {allocation.page_number} · Slot #{allocation.slot_index}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button type="button" onClick={() => router.push(`/binders/${allocation.binder_id}?page=${allocation.page_number}`)} className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-poke-blue px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-poke-blue/20 hover:opacity-90 active:scale-[0.99]">
                                                <BookOpen size={15} />
                                                <span>Abrir no Binder</span>
                                            </button>

                                            <button type="button" onClick={handleRemoveFromBinder} disabled={isUpdatingBinder} className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-500/40 bg-red-500/15 px-4 py-2.5 text-xs font-bold text-red-200 transition-all hover:border-red-500/60 hover:bg-red-500/25 disabled:cursor-not-allowed disabled:opacity-50">
                                                {isUpdatingBinder ? <Loader2 size={15} className="animate-spin" /> : <Minus size={15} />}
                                                <span>Remover</span>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-3">
                                        <p className="text-xs leading-relaxed text-slate-400">Esta carta está guardada na sua coleção e não está alocada em nenhum binder físico.</p>

                                        <button type="button" onClick={() => router.push("/")} className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-poke-blue px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-poke-blue/20 hover:opacity-90 active:scale-[0.99]">
                                            <Plus size={16} />
                                            <span>Alocar em um Binder</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="profile-enter profile-enter-d2 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121520]/90 p-5 shadow-lg backdrop-blur-md">
                                <div className="border-b border-white/5 pb-3">
                                    <h3 className="text-sm font-bold text-white">Metadados da Cópia Física</h3>
                                    <p className="mt-0.5 text-xs text-slate-400">Configure as características do seu exemplar real.</p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-medium text-slate-400">Idioma da sua carta física:</label>
                                    <LanguageSlider value={optimisticLang ?? card.card_language} onChange={handleChangeLanguage} size="md" fullWidth ariaLabel="Idioma da sua carta física" loadingValue={updatingLang} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-medium text-slate-400">Versão física (acabamento):</label>
                                    <LanguageSlider<CardVariant> value={currentVariant} onChange={handleChangeVariant} options={VARIANT_SLIDER_OPTIONS} size="md" fullWidth ariaLabel="Versão física (acabamento)" loadingValue={updatingVariant} disabled={updatingVariant !== null} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-medium text-slate-400">Estado de conservação (Condição):</label>
                                        <span className="text-[11px] font-semibold text-slate-300">{formatConditionLabel(currentCondition)}</span>
                                    </div>
                                    <LanguageSlider<CardCondition> value={currentCondition} onChange={handleChangeCondition} options={CONDITION_SLIDER_OPTIONS} size="md" fullWidth ariaLabel="Estado de conservação da sua carta física" loadingValue={updatingCondition} disabled={updatingCondition !== null} />
                                </div>
                            </div>

                            <div className="profile-enter profile-enter-d3 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121520]/90 p-5 shadow-lg backdrop-blur-md">
                                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                                        <Layers size={16} className="text-poke-blue" />
                                        <span>Exemplares Idênticos na Coleção</span>
                                    </div>

                                    <span className="rounded-lg border border-poke-blue/30 bg-poke-blue/20 px-2.5 py-0.5 text-xs font-bold text-poke-blue">x{totalCopiesCount}</span>
                                </div>

                                <p className="text-xs text-slate-400">
                                    Você possui {totalCopiesCount === 1 ? "1 exemplar 100% idêntico" : `${totalCopiesCount} exemplares 100% idênticos`} desta edição, idioma, versão e estado ({hasAnyInBinder ? "1 no binder, " : "0 no binder, "}
                                    {storedCopiesCount === 1 ? "1 guardada" : `${storedCopiesCount} guardadas`}).
                                </p>

                                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                                    <span className="text-xs font-semibold text-slate-300">Quantidade de cópias físicas:</span>

                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={handleRemoveDuplicateCopy}
                                            disabled={totalCopiesCount <= 1 || isUpdatingCopies}
                                            title={totalCopiesCount <= 1 ? "Para remover o último exemplar, utilize o botão Excluir da Coleção abaixo" : "Remover 1 cópia idêntica"}
                                            aria-label="Diminuir quantidade"
                                            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                                        >
                                            <Minus size={16} />
                                        </button>

                                        <span className="w-8 text-center font-mono text-base font-extrabold text-white">{isUpdatingCopies ? <Loader2 size={16} className="animate-spin inline text-poke-blue" /> : totalCopiesCount}</span>

                                        <button type="button" onClick={handleAddDuplicateCopy} disabled={isUpdatingCopies} title="Adicionar mais 1 cópia idêntica" aria-label="Aumentar quantidade" className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:border-white/20 hover:bg-white/10 hover:text-poke-blue disabled:opacity-50">
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>

                                <p className="text-[11px] text-slate-500">A quantidade mínima é 1. Para remover completamente a carta da sua coleção, utilize a ação de exclusão abaixo.</p>
                            </div>

                            <div className="profile-enter profile-enter-d4 flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#121520]/90 p-5 shadow-lg backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <Calendar size={14} />
                                        <span>Adicionada em {new Date(card.created_at).toLocaleDateString("pt-BR")}</span>
                                    </div>
                                    {card.card_set_name && (
                                        <span className="text-xs text-slate-400">
                                            Coleção: <strong className="text-slate-200">{card.card_set_name}</strong>
                                        </span>
                                    )}
                                </div>

                                <button type="button" onClick={() => setIsDeleteModalOpen(true)} className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-red-500/40 bg-red-500/15 px-4 py-2.5 text-xs font-semibold text-red-300 transition-all hover:border-red-500/60 hover:bg-red-500/25 hover:text-red-100 disabled:opacity-50">
                                    <Trash2 size={15} />
                                    <span>Excluir da Coleção</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {isDeleteModalPresent && (
                <div
                    className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-sm"
                    data-overlay-state={deleteModalOverlayState}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Confirmar exclusão da carta"
                    onClick={(e) => {
                        if (e.target === e.currentTarget && !isDeleting) setIsDeleteModalOpen(false);
                    }}
                >
                    <div className="modal-surface flex h-dvh max-h-none w-full max-w-none flex-col gap-4 overflow-y-auto rounded-none border-0 bg-[#141722] p-6 shadow-2xl sm:h-auto sm:max-w-md sm:rounded-2xl sm:border sm:border-red-500/30">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/15 text-red-400">
                                <Trash2 size={22} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white">Excluir carta da coleção?</h3>
                                <p className="text-xs text-slate-400">Esta ação não poderá ser desfeita.</p>
                            </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                            Tem certeza que deseja excluir <strong>{card?.card_name}</strong>
                            {totalCopiesCount > 1 ? ` (todas as ${totalCopiesCount} cópias idênticas)` : ""} da sua coleção?
                            {card?.is_in_binder ? " Ela também será removida da exibição do binder." : ""}
                        </p>

                        <div className="mt-2 flex items-center justify-end gap-3">
                            <button type="button" onClick={() => setIsDeleteModalOpen(false)} disabled={isDeleting} className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 disabled:opacity-50">
                                Cancelar
                            </button>

                            <button type="button" onClick={handleDeleteAllCopies} disabled={isDeleting} className="flex cursor-pointer items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:bg-red-500 disabled:opacity-50">
                                {isDeleting && <Loader2 size={14} className="animate-spin" />}
                                <span>Sim, excluir</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {card && <CardLightbox src={isZoomed ? formatTcgdexImageUrl(card.card_image_url) : null} alt={card.card_name} shineMode={shineMode} elementTypes={cardElementTypes} onClose={() => setIsZoomed(false)} />}
        </div>
    );
}
