"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { move } from "@dnd-kit/helpers";
import { PokeballLoader } from "@/components/loading/PokeballLoader";
import { CardGridSkeleton } from "@/components/loading/CardGridSkeleton";
import { TrainerNotFound } from "@/components/profile/TrainerNotFound";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { CardArtwork } from "@/components/ui/CardArtwork";
import { CardLightbox } from "@/components/ui/CardLightbox";
import { FlagIcon } from "@/components/ui/FlagIcon";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select, type SelectOption } from "@/components/ui/Select";
import { formatTcgdexImageUrl } from "@/lib/pokemon/tcgdex";
import { getPokemonSilhouetteUrl } from "@/lib/pokemon/constants";
import { getCoverTheme } from "@/lib/binder/themes";
import { getRarityBadgeStyle, RARITY_FILTER_OPTIONS } from "@/lib/pokemon/rarity";
import { resolveCardShine } from "@/lib/pokemon/variant";
import { resolveCardElementTypes } from "@/lib/pokemon/cardTypes";
import { ALL_ARTISTS_FILTER, buildArtistFilterOptions, buildCollectionFilterResetKey, matchesCardSearch } from "@/lib/collection/listCards";
import { useClientPagedWindow } from "@/lib/hooks/useClientPagedWindow";
import { useInfiniteScroll } from "@/lib/hooks/useInfiniteScroll";
import { useDismissibleOverlay } from "@/lib/hooks/useDismissibleOverlay";
import { useOverlayPresence } from "@/lib/hooks/useOverlayPresence";
import { buildThemeCssVars } from "@/lib/profile/username";
import { getCardAppearProps } from "@/lib/ui/cardAppear";
import { fetcher as jsonFetcher } from "@/lib/swr";
import { Binder, BinderSlot, BinderStatusFilter, UserCard, type CardElementType, type CardShineMode } from "@/types/binder";
import type { ProfilePayload } from "@/lib/profile/buildProfile";
import { useAuth } from "@/lib/context/AuthContext";
import { usePublicProfileTheme } from "@/lib/context/UserSettingsContext";
import { toast } from "sonner";
import { Settings, Share2, BookOpen, Layers, Check, Layers2, Pencil, Plus, X, Search, Globe, Sparkles, Gem, GripVertical, Palette, Star, Lock, ExternalLink } from "lucide-react";

const PICKER_STATUS_OPTIONS: SelectOption<BinderStatusFilter>[] = [
    { value: "all", label: "Todas as cartas" },
    { value: "in_binder", label: "No Binder" },
    { value: "stored", label: "Guardadas" },
];

const PICKER_LANGUAGE_OPTIONS: SelectOption<string>[] = [
    { value: "all", label: "Todos os idiomas" },
    { value: "pt-br", label: "Português (PT-BR)", icon: <FlagIcon country="pt-br" /> },
    { value: "en", label: "Inglês (EN)", icon: <FlagIcon country="en" /> },
    { value: "ja", label: "Japonês (JA)", icon: <FlagIcon country="ja" /> },
];

const fetcher = async (url: string): Promise<ProfilePayload> => {
    const res = await fetch(url);
    if (!res.ok) {
        if (res.status === 404) {
            throw new Error("not_found");
        }
        throw new Error("fetch_failed");
    }
    const data = await res.json();
    return data.profile;
};

function FeaturedSlotFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className={`relative w-full ${className}`} style={{ aspectRatio: "8 / 11" }}>
            <div className="absolute inset-0">{children}</div>
        </div>
    );
}

function FeaturedCardTile({ card, onMaximize, priority = false }: { card: UserCard; onMaximize?: (src: string, alt: string, shineMode: CardShineMode, elementTypes: CardElementType[]) => void; priority?: boolean }) {
    const imageSrc = formatTcgdexImageUrl(card.card_image_url);
    const shineMode = resolveCardShine(card.card_variant, card.card_rarity, card.card_image_url, card.card_name);
    const elementTypes = resolveCardElementTypes(card.card_types, card.pokemon_dex_id);

    return (
        <FeaturedSlotFrame className="z-0">
            <button type="button" onClick={() => onMaximize?.(imageSrc, card.card_name, shineMode, elementTypes)} aria-label={`Ampliar ${card.card_name}`} className="relative z-0 h-full w-full cursor-zoom-in">
                <CardArtwork src={imageSrc} alt={card.card_name} sizes="(max-width: 640px) 45vw, 200px" shineMode={shineMode} elementTypes={elementTypes} priority={priority} />
            </button>
        </FeaturedSlotFrame>
    );
}

function SortableFeaturedCard({ id, index, card, onRemove, priority = false }: { id: string; index: number; card: UserCard; onRemove: () => void; priority?: boolean }) {
    const { ref, isDragging } = useSortable({ id, index });
    const imageSrc = formatTcgdexImageUrl(card.card_image_url);
    const shineMode = resolveCardShine(card.card_variant, card.card_rarity, card.card_image_url, card.card_name);
    const elementTypes = resolveCardElementTypes(card.card_types, card.pokemon_dex_id);

    return (
        <div ref={ref} className={`relative w-full touch-none select-none !cursor-grab active:!cursor-grabbing ${isDragging ? "z-30" : "z-0"}`} style={{ aspectRatio: "8 / 11" }} aria-label={`${card.card_name}, arraste para reordenar`}>
            <div className={`absolute inset-0 ${isDragging ? "opacity-90 ring-2 ring-poke-blue/60 rounded-lg" : ""}`}>
                <CardArtwork src={imageSrc} alt={card.card_name} sizes="(max-width: 640px) 45vw, 200px" maxTilt={0} maxMove={0} glareOpacity={0} shineMode={shineMode} elementTypes={elementTypes} priority={priority} />
                <span className="pointer-events-none absolute bottom-1.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-0.5 rounded-md bg-black/55 px-1.5 py-0.5 text-white/80 backdrop-blur-sm">
                    <GripVertical size={12} strokeWidth={2.5} />
                </span>
            </div>
            <button type="button" onClick={onRemove} onPointerDown={(e) => e.stopPropagation()} aria-label={`Remover ${card.card_name} dos destaques`} className="absolute -right-1.5 -top-1.5 z-30 flex h-7 w-7 items-center justify-center rounded-full border border-rose-400/50 bg-rose-500 text-white shadow-lg shadow-rose-500/30 transition-transform hover:scale-105 active:scale-95">
                <X size={14} strokeWidth={2.5} />
            </button>
        </div>
    );
}

function FeaturedEmptySlot({ editing, onAdd }: { editing: boolean; onAdd: () => void }) {
    return (
        <FeaturedSlotFrame>
            <button type="button" onClick={onAdd} className={`flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-lg sm:rounded-xl border border-dashed text-slate-500 transition-colors ${editing ? "border-white/25 bg-white/[0.03] hover:border-poke-blue/50 hover:bg-poke-blue/5 hover:text-poke-blue" : "border-white/10 bg-white/[0.015] hover:border-white/20 hover:text-slate-400"}`}>
                <Plus size={editing ? 20 : 16} strokeWidth={2.25} />
                <span className="hidden text-[10px] font-medium sm:inline">{editing ? "Adicionar" : "Vazio"}</span>
            </button>
        </FeaturedSlotFrame>
    );
}

function FeaturedPickerCard({ card, selectedPosition, onToggle }: { card: UserCard; selectedPosition: number; onToggle: () => void }) {
    const [isHovered, setIsHovered] = useState(false);
    const selected = selectedPosition !== -1;
    const imageSrc = formatTcgdexImageUrl(card.card_image_url);
    const shineMode = resolveCardShine(card.card_variant, card.card_rarity, card.card_image_url, card.card_name);
    const elementTypes = resolveCardElementTypes(card.card_types, card.pokemon_dex_id);
    const disableEffects = selected || isHovered;

    return (
        <button
            type="button"
            onClick={onToggle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label={`${selected ? `Remover ${card.card_name} da posição ${selectedPosition + 1} dos destaques` : `Adicionar ${card.card_name} aos destaques`}`}
            aria-pressed={selected}
            className={`group/featured-picker block aspect-[8/11] w-full text-left transition-transform duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-poke-blue active:scale-[0.98] ${selected ? "scale-[0.98]" : ""}`}
        >
            <CardArtwork src={imageSrc} alt="" sizes="(max-width: 768px) 50vw, 200px" shineMode={disableEffects ? "none" : shineMode} elementTypes={elementTypes} maxTilt={0} maxMove={0} scale={1} transitionDuration={0} imageClassName="pointer-events-none object-contain">
                {selected ? (
                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/55 text-white">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-poke-blue text-lg font-bold shadow-lg shadow-poke-blue/40">{selectedPosition + 1}</span>
                        <span className="mt-2 text-[10px] font-semibold tracking-wide">Remover</span>
                    </span>
                ) : (
                    <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/45 text-white opacity-0 transition-opacity duration-200 ease-out group-hover/featured-picker:opacity-100 group-focus-visible/featured-picker:opacity-100">
                        <span className="flex h-12 w-12 scale-90 items-center justify-center rounded-full border border-white/40 bg-poke-blue shadow-lg shadow-poke-blue/40 transition-transform duration-200 ease-out group-hover/featured-picker:scale-100 group-focus-visible/featured-picker:scale-100">
                            <Plus size={22} strokeWidth={2.5} />
                        </span>
                        <span className="mt-2 text-[10px] font-semibold tracking-wide">Adicionar</span>
                    </span>
                )}
            </CardArtwork>
        </button>
    );
}

function ProfileShell({ children }: { children: ReactNode }) {
    return <div className="flex min-h-[calc(100dvh-4rem)] flex-col bg-[#0a0c10]">{children}</div>;
}

function ReadonlySlotMinimap({ binder, slots, onCardClick }: { binder: Binder; slots: BinderSlot[]; onCardClick: (card: UserCard) => void }) {
    const pagesMap = useMemo(() => {
        const map = new Map<number, BinderSlot[]>();
        for (let p = 1; p <= binder.total_pages; p++) {
            map.set(p, []);
        }
        for (const s of slots) {
            const pageSlots = map.get(s.page_number) || [];
            pageSlots.push(s);
            map.set(s.page_number, pageSlots);
        }
        return map;
    }, [binder.total_pages, slots]);

    const gridClass = binder.grid_type === "1x1" ? "grid-cols-1 max-w-[80px]" : binder.grid_type === "2x2" ? "grid-cols-2 max-w-[160px]" : "grid-cols-3 max-w-[240px]";

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Mapa de Slots</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-400">Modo Leitura</span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full border border-dashed border-white/30" />
                        <span>Livre</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-amber-400/70" />
                        <span>Meta</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        <span>Alocada</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 pt-1">
                {Array.from(pagesMap.entries()).map(([pageNum, pageSlots]) => {
                    const filledCount = pageSlots.filter((s) => Boolean(s.user_card_id || s.card)).length;
                    return (
                        <div key={pageNum} className="flex shrink-0 flex-col gap-2 rounded-xl border border-white/10 bg-[#0c0e15] p-3 shadow-md">
                            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                                <span>Pág. {pageNum}</span>
                                <span className="font-mono text-[10px] text-slate-500">
                                    {filledCount}/{pageSlots.length}
                                </span>
                            </div>

                            <div className={`grid gap-1.5 ${gridClass}`}>
                                {pageSlots.map((slot) => {
                                    const card = slot.card;
                                    const isFilled = Boolean(slot.user_card_id || card);

                                    if (isFilled && card) {
                                        return (
                                            <button key={slot.id} type="button" onClick={() => onCardClick(card)} title={`${card.card_name} (Slot #${slot.slot_index})`} className="group relative aspect-[8/11] w-full min-w-[50px] overflow-hidden rounded-md border border-emerald-500/50 bg-emerald-500/10 transition-transform hover:scale-105 hover:border-emerald-400 focus:outline-none">
                                                <Image src={formatTcgdexImageUrl(card.card_image_url)} alt={card.card_name} fill unoptimized sizes="60px" className="object-cover" />
                                            </button>
                                        );
                                    }

                                    if (slot.slot_type === "pokemon" && slot.target_dex_id) {
                                        return (
                                            <div key={slot.id} title={`Meta: #${String(slot.target_dex_id).padStart(3, "0")} (Slot #${slot.slot_index})`} className="relative flex aspect-[8/11] w-full min-w-[50px] flex-col items-center justify-center rounded-md border border-amber-500/30 bg-amber-500/5 p-1">
                                                <div className="relative h-6 w-6 opacity-40">
                                                    <Image src={getPokemonSilhouetteUrl(slot.target_dex_id)} alt="Meta" fill unoptimized className="object-contain brightness-0 invert" />
                                                </div>
                                                <span className="mt-0.5 font-mono text-[9px] font-bold text-amber-300/80">#{String(slot.target_dex_id).padStart(3, "0")}</span>
                                            </div>
                                        );
                                    }

                                    if (slot.slot_type === "card" && slot.target_card_image_url) {
                                        return (
                                            <div key={slot.id} title={`Meta: ${slot.target_card_name || "Carta"} (Slot #${slot.slot_index})`} className="relative aspect-[8/11] w-full min-w-[50px] overflow-hidden rounded-md border border-amber-500/30 bg-amber-500/5 opacity-60">
                                                <Image src={formatTcgdexImageUrl(slot.target_card_image_url)} alt={slot.target_card_name || "Meta"} fill unoptimized sizes="60px" className="object-cover grayscale" />
                                            </div>
                                        );
                                    }

                                    return <div key={slot.id} title={`Slot livre #${slot.slot_index}`} className="relative aspect-[8/11] w-full min-w-[50px] rounded-md border border-dashed border-white/10 bg-white/[0.02]" />;
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function ProfileThemeScope({ themeColor, children }: { themeColor?: string; children: ReactNode }) {
    return <div style={themeColor ? buildThemeCssVars(themeColor) : undefined}>{children}</div>;
}

export function TrainerProfileView({ username, fallbackData, publicGuestTheme }: { username: string; fallbackData?: ProfilePayload; publicGuestTheme?: string }) {
    const router = useRouter();
    const { user: authUser } = useAuth();
    const {
        data: profile,
        error,
        isLoading,
        mutate,
    } = useSWR<ProfilePayload>(username ? `/api/profile/${encodeURIComponent(username)}` : null, fetcher, {
        fallbackData,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        dedupingInterval: 10000,
    });
    const effectiveTheme = profile?.themeColor || fallbackData?.themeColor || publicGuestTheme;
    usePublicProfileTheme(effectiveTheme, !authUser);
    const [avatarError, setAvatarError] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [isEditingFeatured, setIsEditingFeatured] = useState(false);
    const [draftFavoriteIds, setDraftFavoriteIds] = useState<string[]>([]);
    const [isSavingFeatured, setIsSavingFeatured] = useState(false);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const [pickerSearch, setPickerSearch] = useState("");
    const [pickerStatus, setPickerStatus] = useState<BinderStatusFilter>("all");
    const [pickerLanguage, setPickerLanguage] = useState("all");
    const [pickerRarity, setPickerRarity] = useState("all");

    const shouldFetchCards = Boolean(profile?.isOwner && (isPickerOpen || isEditingFeatured));
    const { data: collectionPayload, isLoading: isPickerLoading } = useSWR<{ cards: UserCard[] }>(shouldFetchCards ? "/api/cards" : null, jsonFetcher, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        dedupingInterval: 10000,
    });
    const collectionCards = collectionPayload?.cards ?? [];

    useDismissibleOverlay(isPickerOpen, () => setIsPickerOpen(false), isSavingFeatured);
    const { isPresent: isPickerPresent, state: pickerOverlayState } = useOverlayPresence(isPickerOpen);
    const [pickerArtist, setPickerArtist] = useState(ALL_ARTISTS_FILTER);
    const [lightbox, setLightbox] = useState<{ src: string; alt: string; shineMode: CardShineMode; elementTypes: CardElementType[] } | null>(null);
    const [pickerScrollRoot, setPickerScrollRoot] = useState<HTMLDivElement | null>(null);

    const favoriteCardIdsKey = profile?.favoriteCardIds?.join(",") ?? "";
    useEffect(() => {
        if (profile?.favoriteCardIds) {
            setDraftFavoriteIds(profile.favoriteCardIds);
        }
    }, [favoriteCardIdsKey, profile?.favoriteCardIds]);

    const cardsById = useMemo(() => {
        const map = new Map<string, UserCard>();
        for (const card of collectionCards) {
            map.set(card.id, card);
        }
        for (const card of profile?.featuredCards ?? []) {
            map.set(card.id, card);
        }
        return map;
    }, [collectionCards, profile?.featuredCards]);

    const displayFavoriteIds = isEditingFeatured ? draftFavoriteIds : (profile?.favoriteCardIds ?? []);
    const displayFeaturedCards = displayFavoriteIds.map((id) => cardsById.get(id)).filter(Boolean) as UserCard[];

    const pickerArtistOptions = useMemo(() => buildArtistFilterOptions(collectionCards.map((c) => c.card_artist)), [collectionCards]);

    const filteredPickerCards = useMemo(() => {
        return collectionCards.filter((card) => {
            if (pickerSearch.trim()) {
                if (!matchesCardSearch(card, pickerSearch)) return false;
            }
            if (pickerStatus === "in_binder" && !card.is_in_binder) return false;
            if (pickerStatus === "stored" && card.is_in_binder) return false;
            if (pickerLanguage !== "all" && card.card_language !== pickerLanguage) return false;
            if (pickerRarity !== "all") {
                const lower = (card.card_rarity || "").trim().toLowerCase();
                if (!lower.includes(pickerRarity)) return false;
            }
            if (pickerArtist !== ALL_ARTISTS_FILTER && (card.card_artist || "").trim().toLowerCase() !== pickerArtist.toLowerCase()) return false;
            return true;
        });
    }, [collectionCards, pickerSearch, pickerStatus, pickerLanguage, pickerRarity, pickerArtist]);

    const pickerResetKey = useMemo(
        () =>
            buildCollectionFilterResetKey({
                searchTerm: pickerSearch,
                statusFilter: pickerStatus,
                languageFilter: pickerLanguage,
                rarityFilter: pickerRarity,
                artistFilter: pickerArtist,
            }),
        [pickerSearch, pickerStatus, pickerLanguage, pickerRarity, pickerArtist],
    );

    const { visibleItems: visiblePickerCards, hasMore: pickerHasMore, loadMore: loadMorePickerCards } = useClientPagedWindow(filteredPickerCards, { resetKey: pickerResetKey });
    const pickerSentinelRef = useInfiniteScroll({
        hasMore: pickerHasMore,
        onLoadMore: loadMorePickerCards,
        root: pickerScrollRoot,
        enabled: isPickerOpen && filteredPickerCards.length > 0,
    });

    const openLightbox = useCallback((src: string, alt: string, shineMode: CardShineMode = "none", elementTypes: CardElementType[] = ["Colorless"]) => {
        setLightbox({ src, alt, shineMode, elementTypes });
    }, []);

    const closeLightbox = useCallback(() => {
        setLightbox(null);
    }, []);

    const openPicker = () => {
        setPickerSearch("");
        setPickerStatus("all");
        setPickerLanguage("all");
        setPickerRarity("all");
        setIsPickerOpen(true);
    };

    const handleCopyProfileLink = async () => {
        try {
            if (typeof window !== "undefined" && profile?.user.username) {
                const shareUrl = `${window.location.origin}/perfil/${profile.user.username}`;
                await navigator.clipboard.writeText(shareUrl);
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

    const [isUpdatingBinderStatus, setIsUpdatingBinderStatus] = useState<string | null>(null);

    const handleSetFeatured = async (binderId: string) => {
        if (isUpdatingBinderStatus) return;
        setIsUpdatingBinderStatus(binderId);
        try {
            const res = await fetch(`/api/binders/${binderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ is_featured: true }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erro ao definir binder em destaque");
            toast.success("Binder definido como destaque!");
            await mutate();
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Erro ao definir destaque";
            toast.error(msg);
        } finally {
            setIsUpdatingBinderStatus(null);
        }
    };

    const handleTogglePublic = async (binderId: string, nextPublic: boolean) => {
        if (isUpdatingBinderStatus) return;
        setIsUpdatingBinderStatus(binderId);
        try {
            const res = await fetch(`/api/binders/${binderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ is_public: nextPublic }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Erro ao alterar visibilidade");
            toast.success(nextPublic ? "Binder agora é público!" : "Binder agora é privado!");
            await mutate();
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Erro ao alterar visibilidade";
            toast.error(msg);
        } finally {
            setIsUpdatingBinderStatus(null);
        }
    };

    const toggleFavorite = (cardId: string) => {
        setDraftFavoriteIds((prev) => {
            if (prev.includes(cardId)) {
                return prev.filter((id) => id !== cardId);
            }
            if (prev.length >= 4) {
                toast.message("Máximo de 4 cartas em destaque.");
                return prev;
            }
            return [...prev, cardId];
        });
    };

    const startEditingFeatured = () => {
        setDraftFavoriteIds(profile?.favoriteCardIds ?? []);
        setIsEditingFeatured(true);
    };

    const startEditingAndOpenPicker = () => {
        setDraftFavoriteIds(profile?.favoriteCardIds ?? []);
        setIsEditingFeatured(true);
        openPicker();
    };

    const cancelEditingFeatured = () => {
        setDraftFavoriteIds(profile?.favoriteCardIds ?? []);
        setIsEditingFeatured(false);
        setIsPickerOpen(false);
    };

    const saveFeatured = async () => {
        setIsSavingFeatured(true);
        try {
            const res = await fetch("/api/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ favorite_card_ids: draftFavoriteIds }),
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                toast.error(data.error || "Não foi possível salvar os destaques.");
                return;
            }
            await mutate();
            setIsEditingFeatured(false);
            setIsPickerOpen(false);
            toast.success("Destaques atualizados.");
        } catch {
            toast.error("Não foi possível salvar os destaques.");
        } finally {
            setIsSavingFeatured(false);
        }
    };

    if (error) {
        if (error.message === "not_found") {
            return <TrainerNotFound username={username} type="profile" />;
        }
        return (
            <ProfileShell>
                <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center p-6 text-center">
                    <div className="rounded-2xl border border-white/10 bg-[#12151d] p-8 shadow-xl">
                        <p className="text-base font-bold text-white">Não foi possível carregar os dados do perfil.</p>
                        <p className="mt-1 text-xs text-slate-400">Verifique sua conexão ou tente novamente mais tarde.</p>
                        <NextLink href="/" prefetch={true} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-poke-blue px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90">
                            <BookOpen size={14} />
                            <span>Voltar ao Binder</span>
                        </NextLink>
                    </div>
                </main>
            </ProfileShell>
        );
    }

    if (isLoading && !profile) {
        return (
            <ProfileShell>
                <main className="flex flex-1 items-start justify-center pt-10 sm:pt-14 md:pt-18 pb-16 bg-[#0a0c10]">
                    <PokeballLoader message="Carregando perfil do treinador..." size="lg" />
                </main>
            </ProfileShell>
        );
    }

    if (!profile) {
        return <TrainerNotFound username={username} type="profile" />;
    }

    const { user, stats, slots, rarityBreakdown, isOwner, themeColor } = profile;
    const featuredBinder = profile.featuredBinder ?? profile.binders?.find((b) => b.is_featured) ?? profile.binders?.[0] ?? null;
    const featuredBinderSlots = profile.featuredBinderSlots ?? [];
    const featuredTheme = getCoverTheme(featuredBinder?.cover_theme || "classic_red");
    const otherBinders = (profile.binders || []).filter((b) => b.id !== featuredBinder?.id && (isOwner || b.is_public));
    const maxRarityCount = rarityBreakdown.reduce((max, item) => Math.max(max, item.count), 0) || 1;
    const showFeaturedSection = isOwner || displayFeaturedCards.length > 0;

    return (
        <ProfileShell>
            <ProfileThemeScope themeColor={themeColor}>
                <main key={username} className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16">
                    <section className={`profile-enter relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#161a26]/90 via-[#10131d]/90 to-[#0c0e15]/90 shadow-2xl backdrop-blur-xl ${isEditingFeatured ? "overflow-visible" : "overflow-hidden"}`}>
                        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-poke-blue/10 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-poke-blue/10 blur-3xl" />

                        <div className="relative z-10 flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
                            <div className="flex items-center gap-4 sm:gap-5">
                                <div className="relative shrink-0">
                                    {user.avatarUrl && !avatarError ? (
                                        <Image src={user.avatarUrl} alt={user.username} width={80} height={80} className="h-16 w-16 rounded-full border-2 border-white/20 object-cover shadow-xl ring-2 ring-white/10 sm:h-20 sm:w-20" referrerPolicy="no-referrer" onError={() => setAvatarError(true)} unoptimized />
                                    ) : (
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/20 bg-gradient-to-br from-white/15 to-white/5 font-mono text-2xl font-black text-white shadow-xl ring-2 ring-white/10 sm:h-20 sm:w-20">{(user.username[0] || "T").toUpperCase()}</div>
                                    )}
                                </div>

                                <div className="flex min-w-0 flex-col">
                                    <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">{user.name || `@${user.username}`}</h1>
                                    <p className="mt-0.5 font-mono text-xs font-semibold text-poke-blue">@{user.username}</p>
                                    {user.bio ? (
                                        <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">{user.bio}</p>
                                    ) : isOwner ? (
                                        <NextLink href="/configuracoes" prefetch={true} onMouseEnter={() => router.prefetch("/configuracoes")} onTouchStart={() => router.prefetch("/configuracoes")} className="mt-2 text-xs font-semibold text-slate-500 transition-colors hover:text-poke-blue">
                                            Adicionar uma descrição ao perfil
                                        </NextLink>
                                    ) : (
                                        <p className="mt-1 text-xs text-slate-400">Coleção pública no MyPokeBinder</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex w-full flex-wrap items-center gap-2.5 sm:w-auto">
                                <button type="button" onClick={handleCopyProfileLink} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-300 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white sm:flex-initial">
                                    {isCopied ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
                                    <span>{isCopied ? "Copiado" : "Compartilhar"}</span>
                                </button>

                                {!isOwner ? (
                                    <NextLink href={`/colecao/${user.username}`} prefetch={true} onMouseEnter={() => router.prefetch(`/colecao/${user.username}`)} onTouchStart={() => router.prefetch(`/colecao/${user.username}`)} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-poke-blue px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-poke-blue/25 transition-all hover:bg-poke-blue/90 hover:shadow-poke-blue/40 sm:flex-initial">
                                        <Layers size={15} />
                                        <span>Ver coleção</span>
                                    </NextLink>
                                ) : (
                                    <NextLink href="/configuracoes" prefetch={true} onMouseEnter={() => router.prefetch("/configuracoes")} onTouchStart={() => router.prefetch("/configuracoes")} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-poke-blue/40 bg-poke-blue/15 px-4 py-2 text-xs font-semibold text-white transition-all hover:border-poke-blue/60 hover:bg-poke-blue/25 sm:flex-initial">
                                        <Settings size={14} />
                                        <span>Configurações</span>
                                    </NextLink>
                                )}
                            </div>
                        </div>

                        {showFeaturedSection ? (
                            <div className="relative z-10 border-t border-white/10 px-6 pb-6 pt-5 sm:px-8 sm:pb-8">
                                <div className="mb-4 flex h-7 items-center justify-between gap-3">
                                    <h2 className="text-sm font-semibold text-slate-200">Destaques</h2>
                                    {isOwner ? (
                                        isEditingFeatured ? (
                                            <div className="flex items-center gap-2">
                                                <button type="button" onClick={cancelEditingFeatured} disabled={isSavingFeatured} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-300 transition-colors hover:bg-white/10 disabled:opacity-50">
                                                    Cancelar
                                                </button>
                                                <button type="button" onClick={saveFeatured} disabled={isSavingFeatured} className="inline-flex items-center gap-1 rounded-lg bg-poke-blue px-2.5 py-1 text-[11px] font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50">
                                                    <Check size={12} />
                                                    <span>{isSavingFeatured ? "Salvando..." : "Salvar"}</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <button type="button" onClick={startEditingFeatured} className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-400 transition-colors hover:border-white/20 hover:text-white">
                                                <Pencil size={12} />
                                                <span>Editar</span>
                                            </button>
                                        )
                                    ) : null}
                                </div>

                                <DragDropProvider
                                    onDragOver={(event) => {
                                        if (!isEditingFeatured) return;
                                        setDraftFavoriteIds((items) => move(items, event));
                                    }}
                                    onDragEnd={(event) => {
                                        if (!isEditingFeatured || event.canceled) return;
                                        setDraftFavoriteIds((items) => move(items, event));
                                    }}
                                >
                                    <div className="grid grid-cols-4 items-start gap-2.5 sm:gap-4">
                                        {isEditingFeatured ? (
                                            <>
                                                {draftFavoriteIds.map((id, index) => {
                                                    const card = cardsById.get(id);
                                                    if (!card) return null;
                                                    return <SortableFeaturedCard key={id} id={id} index={index} card={card} onRemove={() => toggleFavorite(id)} priority={index === 0} />;
                                                })}
                                                {Array.from({ length: Math.max(0, 4 - draftFavoriteIds.length) }).map((_, emptyIndex) => (
                                                    <FeaturedEmptySlot key={`empty-${emptyIndex}`} editing onAdd={openPicker} />
                                                ))}
                                            </>
                                        ) : (
                                            [0, 1, 2, 3].map((slotIndex) => {
                                                const card = displayFeaturedCards[slotIndex];
                                                const appear = getCardAppearProps(slotIndex, { stepMs: 55, maxDelayMs: 220 });
                                                if (card) {
                                                    return (
                                                        <div key={card.id} className={appear.className} style={appear.style}>
                                                            <FeaturedCardTile card={card} onMaximize={openLightbox} priority={slotIndex === 0} />
                                                        </div>
                                                    );
                                                }

                                                if (isOwner) {
                                                    return (
                                                        <div key={`empty-${slotIndex}`} className={appear.className} style={appear.style}>
                                                            <FeaturedEmptySlot editing={false} onAdd={startEditingAndOpenPicker} />
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <div key={`pad-${slotIndex}`} className={appear.className} style={appear.style}>
                                                        <FeaturedSlotFrame>
                                                            <div className="h-full w-full" aria-hidden />
                                                        </FeaturedSlotFrame>
                                                    </div>
                                                );
                                            })
                                        )}
                                    </div>
                                </DragDropProvider>
                            </div>
                        ) : null}
                    </section>

                    {featuredBinder ? (
                        <section className="profile-enter profile-enter-d1 flex flex-col gap-5 rounded-3xl border border-white/10 bg-gradient-to-b from-[#161a26]/90 via-[#10131d]/90 to-[#0c0e15]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 shadow-md" style={{ backgroundColor: featuredTheme.primaryColor }}>
                                        <BookOpen size={22} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-400/15 px-2.5 py-0.5 text-[11px] font-bold text-amber-300">
                                                <Star size={12} className="fill-amber-300 text-amber-300" />
                                                <span>Binder em Destaque</span>
                                            </span>

                                            {isOwner && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleTogglePublic(featuredBinder.id, !featuredBinder.is_public)}
                                                    disabled={isUpdatingBinderStatus === featuredBinder.id}
                                                    className={`flex cursor-pointer items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition-all ${featuredBinder.is_public ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25" : "border-slate-500/40 bg-slate-500/15 text-slate-300 hover:bg-slate-500/25"}`}
                                                >
                                                    {featuredBinder.is_public ? <Globe size={11} /> : <Lock size={11} />}
                                                    <span>{featuredBinder.is_public ? "Público" : "Privado"}</span>
                                                </button>
                                            )}
                                        </div>
                                        <h2 className="mt-1 text-xl font-black tracking-tight text-white sm:text-2xl">{featuredBinder.name}</h2>
                                        {featuredBinder.description && <p className="mt-0.5 text-xs text-slate-400">{featuredBinder.description}</p>}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2.5">
                                    {isOwner && (
                                        <NextLink href={`/binders/${featuredBinder.id}/edit`} className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white">
                                            <Pencil size={13} />
                                            <span>Editar</span>
                                        </NextLink>
                                    )}

                                    <NextLink href={`/binders/${featuredBinder.id}`} className="flex items-center gap-1.5 rounded-xl bg-poke-blue px-4 py-2 text-xs font-bold text-white shadow-lg shadow-poke-blue/25 transition-all hover:bg-poke-blue/90">
                                        <BookOpen size={14} />
                                        <span>Abrir no Binder</span>
                                    </NextLink>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                                <div className="rounded-2xl border border-white/10 bg-[#12151d]/90 p-4">
                                    <span className="text-[11px] font-semibold text-slate-400">Formato</span>
                                    <p className="mt-1 font-mono text-lg font-black text-white">Grade {featuredBinder.grid_type}</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-[#12151d]/90 p-4">
                                    <span className="text-[11px] font-semibold text-slate-400">Páginas</span>
                                    <p className="mt-1 font-mono text-lg font-black text-white">
                                        {featuredBinder.total_pages} {featuredBinder.total_pages === 1 ? "página" : "páginas"}
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-[#12151d]/90 p-4">
                                    <span className="text-[11px] font-semibold text-slate-400">Preenchimento</span>
                                    <p className="mt-1 font-mono text-lg font-black text-white">
                                        {featuredBinder.total_cards ?? 0} <span className="text-xs font-normal text-slate-500">/ {featuredBinder.total_slots ?? 0}</span>
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-[#12151d]/90 p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-semibold text-slate-400">Progresso</span>
                                        <span className="font-mono text-xs font-bold text-poke-blue">{featuredBinder.completion_percentage ?? 0}%</span>
                                    </div>
                                    <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                                        <div className="h-full rounded-full bg-poke-blue transition-all duration-500" style={{ width: `${featuredBinder.completion_percentage ?? 0}%` }} />
                                    </div>
                                </div>
                            </div>

                            <ReadonlySlotMinimap
                                binder={featuredBinder}
                                slots={featuredBinderSlots}
                                onCardClick={(card) => {
                                    openLightbox(formatTcgdexImageUrl(card.card_image_url), card.card_name, resolveCardShine(card.card_variant, card.card_rarity, card.card_image_url, card.card_name), resolveCardElementTypes(card.card_types, card.pokemon_dex_id));
                                }}
                            />
                        </section>
                    ) : isOwner ? (
                        <section className="profile-enter profile-enter-d1 flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center">
                            <BookOpen size={32} className="text-slate-500" />
                            <div>
                                <h3 className="text-base font-bold text-white">Nenhum binder criado ainda</h3>
                                <p className="mt-1 text-xs text-slate-400">Crie seu primeiro binder com capas temáticas e grades personalizadas para destacá-lo aqui.</p>
                            </div>
                            <NextLink href="/binders/new" prefetch={true} className="mt-2 inline-flex items-center gap-2 rounded-xl bg-poke-blue px-4 py-2 text-xs font-bold text-white shadow-md shadow-poke-blue/20 hover:opacity-90">
                                <Plus size={15} />
                                <span>Criar Primeiro Binder</span>
                            </NextLink>
                        </section>
                    ) : null}

                    <section className="profile-enter profile-enter-d2 flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#12151d]/90 p-5 shadow-xl backdrop-blur-md sm:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h2 className="text-base font-bold text-white sm:text-lg">{isOwner ? "Outros Binders" : "Vitrine de Binders"}</h2>
                                <p className="text-xs text-slate-400">{isOwner ? "Gerencie a visibilidade pública e defina qual binder é o destaque principal." : "Outros binders públicos organizados por este treinador."}</p>
                            </div>

                            {isOwner && (
                                <NextLink href="/binders/new" prefetch={true} className="flex items-center gap-1.5 rounded-xl border border-poke-blue/40 bg-poke-blue/15 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:border-poke-blue/60 hover:bg-poke-blue/25">
                                    <Plus size={14} />
                                    <span>Novo Binder</span>
                                </NextLink>
                            )}
                        </div>

                        {otherBinders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/[0.015] py-8 text-center text-xs text-slate-500">
                                <BookOpen size={24} className="opacity-40" />
                                <span>{isOwner ? "Você não possui outros binders além do destaque." : "Nenhum outro binder público disponível."}</span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {otherBinders.map((b: Binder) => {
                                    const theme = getCoverTheme(b.cover_theme);
                                    return (
                                        <div key={b.id} className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0d1017] transition-all hover:border-white/20 hover:shadow-xl">
                                            <div className="h-3 w-full" style={{ backgroundColor: theme.primaryColor }} />

                                            <div className="flex flex-1 flex-col gap-3 p-4">
                                                <div className="flex items-start justify-between gap-2">
                                                    <div>
                                                        <h3 className="font-bold text-white group-hover:text-poke-blue transition-colors">{b.name}</h3>
                                                        {b.description && <p className="mt-0.5 line-clamp-2 text-[11px] text-slate-400">{b.description}</p>}
                                                    </div>

                                                    {isOwner && (
                                                        <button type="button" onClick={() => handleTogglePublic(b.id, !b.is_public)} disabled={isUpdatingBinderStatus === b.id} title={b.is_public ? "Tornar privado" : "Tornar público"} className={`shrink-0 rounded-lg border p-1.5 transition-colors ${b.is_public ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25" : "border-slate-500/40 bg-slate-500/15 text-slate-400 hover:bg-slate-500/25"}`}>
                                                            {b.is_public ? <Globe size={13} /> : <Lock size={13} />}
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                                                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-medium text-slate-300">Grade {b.grid_type}</span>
                                                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-medium text-slate-300">
                                                        {b.total_pages} {b.total_pages === 1 ? "pág" : "págs"}
                                                    </span>
                                                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-medium text-slate-400">
                                                        {b.total_cards ?? 0}/{b.total_slots ?? 0} cartas
                                                    </span>
                                                </div>

                                                <div>
                                                    <div className="flex items-center justify-between text-[11px]">
                                                        <span className="text-slate-400">Preenchimento</span>
                                                        <span className="font-mono font-bold text-poke-blue">{b.completion_percentage ?? 0}%</span>
                                                    </div>
                                                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                                                        <div className="h-full rounded-full bg-poke-blue transition-all duration-300" style={{ width: `${b.completion_percentage ?? 0}%` }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.02] p-3">
                                                {isOwner ? (
                                                    <button type="button" onClick={() => handleSetFeatured(b.id)} disabled={isUpdatingBinderStatus === b.id} className="flex cursor-pointer items-center gap-1 text-[11px] font-semibold text-amber-300/80 transition-colors hover:text-amber-300">
                                                        <Star size={13} />
                                                        <span>Tornar Destaque</span>
                                                    </button>
                                                ) : (
                                                    <span />
                                                )}

                                                <div className="flex items-center gap-2">
                                                    {isOwner && (
                                                        <NextLink href={`/binders/${b.id}/edit`} className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-slate-400 hover:text-white transition-colors" title="Editar Binder">
                                                            <Pencil size={13} />
                                                        </NextLink>
                                                    )}

                                                    <NextLink href={`/binders/${b.id}`} className="flex items-center gap-1 rounded-lg bg-poke-blue px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-poke-blue/90">
                                                        <span>Abrir</span>
                                                        <ExternalLink size={12} />
                                                    </NextLink>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    {rarityBreakdown.length > 0 && (
                        <section className="profile-enter profile-enter-d3 rounded-2xl border border-white/10 bg-[#12151d]/90 p-5 shadow-xl backdrop-blur-md sm:p-6">
                            <div className="mb-4">
                                <h3 className="text-base font-bold text-white">Distribuição por raridades</h3>
                                <p className="text-xs text-slate-400">Nomes oficiais das raridades (Pokémon Estampas Ilustradas)</p>
                            </div>

                            <ul className="divide-y divide-white/10">
                                {rarityBreakdown.map((item) => {
                                    const badge = getRarityBadgeStyle(item.label);
                                    const widthPct = Math.max(4, Math.round((item.count / maxRarityCount) * 100));
                                    return (
                                        <li key={item.label} className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:gap-4">
                                            <div className="flex w-full items-center justify-between gap-2 sm:w-44 sm:shrink-0 sm:justify-start">
                                                <span className={`rounded border px-1.5 py-0.5 text-[10px] font-bold ${badge.badgeClasses}`}>{badge.label}</span>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                                                    <div className="h-full rounded-full bg-poke-blue transition-all duration-500" style={{ width: `${widthPct}%` }} />
                                                </div>
                                            </div>
                                            <span className="shrink-0 font-mono text-sm font-bold text-white sm:w-10 sm:text-right">{item.count}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    )}
                </main>
            </ProfileThemeScope>

            {isPickerPresent ? (
                <div
                    className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-sm"
                    data-overlay-state={pickerOverlayState}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Selecionar cartas em destaque"
                    onClick={(e) => {
                        if (e.target === e.currentTarget && !isSavingFeatured) setIsPickerOpen(false);
                    }}
                >
                    <div className="modal-surface flex h-dvh max-h-none w-full max-w-none flex-col overflow-hidden rounded-none border-0 bg-[#12151d] shadow-2xl sm:h-[85vh] sm:max-h-[820px] sm:max-w-3xl sm:rounded-2xl sm:border sm:border-white/10 md:max-w-5xl lg:max-w-6xl">
                        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
                            <div>
                                <h3 className="text-base font-bold text-white">Escolher cartas em destaque</h3>
                                <p className="text-xs text-slate-400">Toque para selecionar ou remover · {draftFavoriteIds.length}/4</p>
                            </div>
                            <button type="button" onClick={() => setIsPickerOpen(false)} className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10">
                                Pronto
                            </button>
                        </div>

                        <div className="flex shrink-0 flex-col gap-2.5 border-b border-white/10 px-4 py-3">
                            <div className="relative w-full">
                                <Search size={15} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                                <SearchInput type="text" value={pickerSearch} onChange={(e) => setPickerSearch(e.target.value)} placeholder="Buscar por pokémon, número, coleção ou pokédex..." placeholderClassName="left-9 right-9" className="w-full h-9 sm:h-10 rounded-xl border border-white/10 bg-white/5 py-2 sm:py-2.5 pr-9 pl-9 text-xs sm:text-sm text-white transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none" />
                                {pickerSearch ? (
                                    <button type="button" onClick={() => setPickerSearch("")} aria-label="Limpar busca" className="absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-500 hover:text-white">
                                        <X size={14} />
                                    </button>
                                ) : null}
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                                <Select<BinderStatusFilter> value={pickerStatus} onChange={setPickerStatus} options={PICKER_STATUS_OPTIONS} icon={<BookOpen size={13} />} ariaLabel="Filtrar por status no binder" size="sm" className="min-w-0 w-full" />
                                <Select<string> value={pickerLanguage} onChange={setPickerLanguage} options={PICKER_LANGUAGE_OPTIONS} icon={<Globe size={13} />} ariaLabel="Filtrar por idioma" size="sm" className="min-w-0 w-full" />
                                <Select<string> value={pickerRarity} onChange={setPickerRarity} options={RARITY_FILTER_OPTIONS} icon={<Gem size={13} />} ariaLabel="Filtrar por raridade" size="sm" className="min-w-0 w-full" />
                                <Select<string> value={pickerArtist} onChange={setPickerArtist} options={pickerArtistOptions} icon={<Palette size={13} />} ariaLabel="Filtrar por ilustrador" size="sm" className="min-w-0 w-full" />
                            </div>
                        </div>

                        <div ref={setPickerScrollRoot} className="min-h-0 flex-1 overflow-y-auto p-4">
                            {isPickerLoading ? (
                                <CardGridSkeleton count={15} gridClassName="grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5" />
                            ) : collectionCards.length === 0 ? (
                                <div className="flex h-full flex-col items-center justify-center gap-2 py-12 text-center">
                                    <Layers2 size={28} className="text-slate-600" />
                                    <p className="text-sm text-slate-400">Nenhuma carta na coleção ainda.</p>
                                    <NextLink href="/colecao" prefetch={true} className="mt-2 text-xs font-semibold text-poke-blue">
                                        Ir para a Coleção
                                    </NextLink>
                                </div>
                            ) : filteredPickerCards.length === 0 ? (
                                <div className="flex h-full flex-col items-center justify-center gap-2 py-12 text-center">
                                    <Search size={26} className="text-slate-600" />
                                    <p className="text-sm font-semibold text-white">Nenhuma carta encontrada</p>
                                    <p className="text-xs text-slate-400">Tente ajustar a busca ou os filtros.</p>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPickerSearch("");
                                            setPickerStatus("all");
                                            setPickerLanguage("all");
                                            setPickerRarity("all");
                                            setPickerArtist(ALL_ARTISTS_FILTER);
                                        }}
                                        className="mt-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10"
                                    >
                                        Limpar filtros
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
                                        {visiblePickerCards.map((card) => {
                                            const selectedPosition = draftFavoriteIds.indexOf(card.id);
                                            return <FeaturedPickerCard key={card.id} card={card} selectedPosition={selectedPosition} onToggle={() => toggleFavorite(card.id)} />;
                                        })}
                                    </div>
                                    <div ref={pickerSentinelRef} className="flex min-h-8 items-center justify-center" aria-hidden={!pickerHasMore} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : null}

            <CardLightbox src={lightbox?.src ?? null} alt={lightbox?.alt} shineMode={lightbox?.shineMode} elementTypes={lightbox?.elementTypes} onClose={closeLightbox} />
        </ProfileShell>
    );
}
