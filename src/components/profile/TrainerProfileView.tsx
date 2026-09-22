"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import { move } from "@dnd-kit/helpers";
import { Header } from "@/components/layout/Header";
import { PokeballLoader } from "@/components/loading/PokeballLoader";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { CardLightbox } from "@/components/ui/CardLightbox";
import { FlagIcon } from "@/components/ui/FlagIcon";
import { Select, type SelectOption } from "@/components/ui/Select";
import { DashboardMiniSlot } from "@/components/dashboard/DashboardMiniSlot";
import { formatTcgdexImageUrl } from "@/lib/pokemon/tcgdex";
import { getRarityBadgeStyle, RARITY_FILTER_OPTIONS } from "@/lib/pokemon/rarity";
import { resolveCardShine } from "@/lib/pokemon/variant";
import { getPokemonSilhouetteUrl } from "@/lib/pokemon/constants";
import { buildCollectionFilterResetKey } from "@/lib/collection/listCards";
import { useClientPagedWindow } from "@/lib/hooks/useClientPagedWindow";
import { useInfiniteScroll } from "@/lib/hooks/useInfiniteScroll";
import { useImagePreloader } from "@/lib/hooks/useImagePreloader";
import { buildThemeCssVars } from "@/lib/profile/username";
import { BinderStatusFilter, UserCard, type CardShineMode } from "@/types/binder";
import type { ProfilePayload } from "@/lib/profile/buildProfile";
import { toast } from "sonner";
import { Settings, Share2, BookOpen, Layers, Check, Layers2, Pencil, Plus, X, Search, Globe, Sparkles, GripVertical } from "lucide-react";

const PICKER_STATUS_OPTIONS: SelectOption<BinderStatusFilter>[] = [
    { value: "all", label: "Todas as Cartas" },
    { value: "in_binder", label: "No Binder" },
    { value: "stored", label: "Guardadas" },
];

const PICKER_LANGUAGE_OPTIONS: SelectOption<string>[] = [
    { value: "all", label: "Todos os Idiomas" },
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

const cardsFetcher = async (url: string): Promise<UserCard[]> => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("fetch_failed");
    const data = await res.json();
    return (data.cards ?? []) as UserCard[];
};

function FeaturedSlotFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
    return (
        <div className={`relative w-full ${className}`} style={{ aspectRatio: "2.5 / 3.5" }}>
            <div className="absolute inset-0">{children}</div>
        </div>
    );
}

function FeaturedCardTile({ card, onMaximize }: { card: UserCard; onMaximize?: (src: string, alt: string, shineMode: CardShineMode) => void }) {
    const imageSrc = formatTcgdexImageUrl(card.card_image_url);
    const shineMode = resolveCardShine(card.card_variant, card.card_rarity);

    return (
        <FeaturedSlotFrame className="z-0">
            <button type="button" onClick={() => onMaximize?.(imageSrc, card.card_name, shineMode)} aria-label={`Ampliar ${card.card_name}`} className="relative z-0 h-full w-full cursor-zoom-in overflow-hidden rounded-xl">
                <Card3DTilt className="relative h-full w-full overflow-hidden rounded-xl" maxTilt={8} maxMove={3} scale={1} glareOpacity={0.25} perspective={900} shineMode={shineMode}>
                    <Image src={imageSrc} alt={card.card_name} fill sizes="(max-width: 640px) 45vw, 200px" className="object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)]" unoptimized priority />
                </Card3DTilt>
            </button>
        </FeaturedSlotFrame>
    );
}

function SortableFeaturedCard({ id, index, card, onRemove }: { id: string; index: number; card: UserCard; onRemove: () => void }) {
    const { ref, isDragging } = useSortable({ id, index });
    const imageSrc = formatTcgdexImageUrl(card.card_image_url);
    const shineMode = resolveCardShine(card.card_variant, card.card_rarity);

    return (
        <div ref={ref} className={`relative w-full touch-none select-none !cursor-grab active:!cursor-grabbing ${isDragging ? "z-30" : "z-0"}`} style={{ aspectRatio: "2.5 / 3.5" }} aria-label={`${card.card_name}, arraste para reordenar`}>
            <div className={`absolute inset-0 overflow-hidden rounded-xl ${isDragging ? "opacity-90 ring-2 ring-poke-blue/60" : ""}`}>
                <Card3DTilt className="relative h-full w-full overflow-hidden rounded-xl" maxTilt={0} maxMove={0} scale={1} glareOpacity={0} perspective={900} shineMode={shineMode} paused>
                    <Image src={imageSrc} alt={card.card_name} fill sizes="(max-width: 640px) 45vw, 200px" className="pointer-events-none object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)]" unoptimized priority draggable={false} />
                </Card3DTilt>
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
            <button type="button" onClick={onAdd} className={`flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed text-slate-500 transition-colors ${editing ? "border-white/25 bg-white/[0.03] hover:border-poke-blue/50 hover:bg-poke-blue/5 hover:text-poke-blue" : "border-white/10 bg-white/[0.015] hover:border-white/20 hover:text-slate-400"}`}>
                <Plus size={editing ? 20 : 16} strokeWidth={2.25} />
                <span className="hidden text-[10px] font-medium sm:inline">{editing ? "Adicionar" : "Vazio"}</span>
            </button>
        </FeaturedSlotFrame>
    );
}

function ProfileShell({ children }: { children: ReactNode }) {
    return <div className="flex min-h-screen flex-col bg-[#0a0c10]">{children}</div>;
}

function ProfileThemeScope({ themeColor, children }: { themeColor?: string; children: ReactNode }) {
    return <div style={themeColor ? buildThemeCssVars(themeColor) : undefined}>{children}</div>;
}

export function TrainerProfileView({ username }: { username: string }) {
    const router = useRouter();
    const { data: profile, error, isLoading, mutate } = useSWR<ProfilePayload>(`/api/profile/${encodeURIComponent(username)}`, fetcher);
    const { data: collectionCards = [] } = useSWR(profile?.isOwner ? "/api/cards" : null, cardsFetcher);
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
    const [lightbox, setLightbox] = useState<{ src: string; alt: string; shineMode: CardShineMode } | null>(null);
    const [pickerScrollRoot, setPickerScrollRoot] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        if (profile?.favoriteCardIds) {
            setDraftFavoriteIds(profile.favoriteCardIds);
        }
    }, [profile?.favoriteCardIds]);

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

    const profileImageUrls = useMemo(() => {
        if (!profile) return [];
        const urls: string[] = [];
        if (profile.user.avatarUrl) urls.push(profile.user.avatarUrl);
        for (const card of profile.featuredCards) {
            urls.push(formatTcgdexImageUrl(card.card_image_url));
        }
        for (const slot of profile.slots) {
            urls.push(getPokemonSilhouetteUrl(slot.pokemon_dex_id));
        }
        return urls;
    }, [profile]);

    const { allLoaded: imagesReady } = useImagePreloader(profileImageUrls, {
        enabled: Boolean(profile),
        timeoutMs: 8000,
    });

    const filteredPickerCards = useMemo(() => {
        return collectionCards.filter((card) => {
            if (pickerSearch.trim()) {
                const term = pickerSearch.toLowerCase().trim();
                const matchesName = card.card_name.toLowerCase().includes(term);
                const matchesSet = (card.card_set_name || "").toLowerCase().includes(term);
                const matchesDex = `#${card.pokemon_dex_id}`.includes(term) || String(card.pokemon_dex_id) === term;
                if (!matchesName && !matchesSet && !matchesDex) return false;
            }
            if (pickerStatus === "in_binder" && !card.is_in_binder) return false;
            if (pickerStatus === "stored" && card.is_in_binder) return false;
            if (pickerLanguage !== "all" && card.card_language !== pickerLanguage) return false;
            if (pickerRarity !== "all") {
                const lower = (card.card_rarity || "").trim().toLowerCase();
                if (!lower.includes(pickerRarity)) return false;
            }
            return true;
        });
    }, [collectionCards, pickerSearch, pickerStatus, pickerLanguage, pickerRarity]);

    const pickerResetKey = useMemo(
        () =>
            buildCollectionFilterResetKey({
                searchTerm: pickerSearch,
                statusFilter: pickerStatus,
                languageFilter: pickerLanguage,
                rarityFilter: pickerRarity,
            }),
        [pickerSearch, pickerStatus, pickerLanguage, pickerRarity],
    );

    const { visibleItems: visiblePickerCards, hasMore: pickerHasMore, loadMore: loadMorePickerCards } = useClientPagedWindow(filteredPickerCards, { resetKey: pickerResetKey });
    const pickerSentinelRef = useInfiniteScroll({
        hasMore: pickerHasMore,
        onLoadMore: loadMorePickerCards,
        root: pickerScrollRoot,
        enabled: isPickerOpen && filteredPickerCards.length > 0,
    });

    const openLightbox = useCallback((src: string, alt: string, shineMode: CardShineMode = "none") => {
        setLightbox({ src, alt, shineMode });
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

    const handleSlotClick = useCallback(
        (dexId: number) => {
            router.push(`/?dexId=${dexId}`);
        },
        [router],
    );

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

    if ((isLoading && !profile) || (profile && !imagesReady)) {
        return (
            <ProfileShell>
                <Header />
                <main className="flex flex-1 items-center justify-center bg-[#0a0c10]">
                    <PokeballLoader message="Carregando perfil do treinador..." size="lg" />
                </main>
            </ProfileShell>
        );
    }

    if (error || !profile) {
        const isNotFound = error?.message === "not_found";
        return (
            <ProfileShell>
                <Header />
                <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center p-6 text-center">
                    <div className="rounded-2xl border border-white/10 bg-[#12151d] p-8 shadow-xl">
                        <p className="text-base font-bold text-white">{isNotFound ? "Perfil não encontrado." : "Não foi possível carregar os dados do perfil."}</p>
                        <p className="mt-1 text-xs text-slate-400">{isNotFound ? "Este treinador não existe ou o link está incorreto." : "Verifique sua conexão ou tente novamente mais tarde."}</p>
                        <NextLink href="/" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-poke-blue px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90">
                            <BookOpen size={14} />
                            <span>Voltar ao Binder</span>
                        </NextLink>
                    </div>
                </main>
            </ProfileShell>
        );
    }

    const { user, stats, slots, rarityBreakdown, isOwner, themeColor } = profile;
    const maxRarityCount = rarityBreakdown.reduce((max, item) => Math.max(max, item.count), 0) || 1;
    const showFeaturedSection = isOwner || displayFeaturedCards.length > 0;

    return (
        <ProfileShell>
            <Header />

            <ProfileThemeScope themeColor={themeColor}>
                <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16">
                    <section className={`relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#161a26]/90 via-[#10131d]/90 to-[#0c0e15]/90 shadow-2xl backdrop-blur-xl ${isEditingFeatured ? "overflow-visible" : "overflow-hidden"}`}>
                        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-poke-blue/10 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-poke-blue/10 blur-3xl" />

                        <div className="relative z-10 flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
                            <div className="flex items-center gap-4 sm:gap-5">
                                <div className="relative shrink-0">
                                    {user.avatarUrl && !avatarError ? (
                                        <Image src={user.avatarUrl} alt={user.username} width={80} height={80} className="h-16 w-16 rounded-full border-2 border-white/20 object-cover shadow-xl ring-2 ring-white/10 sm:h-20 sm:w-20" referrerPolicy="no-referrer" onError={() => setAvatarError(true)} unoptimized priority />
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
                                        <NextLink href="/configuracoes" className="mt-2 text-xs font-semibold text-slate-500 transition-colors hover:text-poke-blue">
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
                                    <NextLink href={`/colecao/${user.username}`} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-poke-blue px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-poke-blue/25 transition-all hover:bg-poke-blue/90 hover:shadow-poke-blue/40 sm:flex-initial">
                                        <Layers size={15} />
                                        <span>Ver coleção</span>
                                    </NextLink>
                                ) : (
                                    <NextLink href="/configuracoes" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-poke-blue/40 bg-poke-blue/15 px-4 py-2 text-xs font-semibold text-white transition-all hover:border-poke-blue/60 hover:bg-poke-blue/25 sm:flex-initial">
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
                                                    return <SortableFeaturedCard key={id} id={id} index={index} card={card} onRemove={() => toggleFavorite(id)} />;
                                                })}
                                                {Array.from({ length: Math.max(0, 4 - draftFavoriteIds.length) }).map((_, emptyIndex) => (
                                                    <FeaturedEmptySlot key={`empty-${emptyIndex}`} editing onAdd={openPicker} />
                                                ))}
                                            </>
                                        ) : (
                                            [0, 1, 2, 3].map((slotIndex) => {
                                                const card = displayFeaturedCards[slotIndex];
                                                if (card) {
                                                    return <FeaturedCardTile key={card.id} card={card} onMaximize={openLightbox} />;
                                                }

                                                if (isOwner) {
                                                    return <FeaturedEmptySlot key={`empty-${slotIndex}`} editing={false} onAdd={startEditingAndOpenPicker} />;
                                                }

                                                return (
                                                    <FeaturedSlotFrame key={`pad-${slotIndex}`}>
                                                        <div className="h-full w-full" aria-hidden />
                                                    </FeaturedSlotFrame>
                                                );
                                            })
                                        )}
                                    </div>
                                </DragDropProvider>
                            </div>
                        ) : null}
                    </section>

                    <section className="grid grid-cols-2 gap-3 sm:gap-4">
                        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#12151d]/90 px-4 py-4 sm:px-5 sm:py-5">
                            <div className="flex items-center gap-1.5 text-slate-400">
                                <BookOpen size={14} className="text-poke-blue" />
                                <span className="text-xs font-semibold">Binder</span>
                            </div>
                            <div className="mt-3">
                                <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
                                    <span className="font-mono text-2xl font-black tracking-tight text-white sm:text-3xl">{stats.totalInBinder}</span>
                                    <span className="text-xs text-slate-500 sm:text-sm">/ 151</span>
                                </div>
                                <div className="mt-2.5 flex items-center gap-2">
                                    <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/10">
                                        <div className="h-full rounded-full bg-poke-blue transition-all duration-500" style={{ width: `${stats.completionPercentage}%` }} />
                                    </div>
                                    <span className="shrink-0 font-mono text-[11px] font-bold text-poke-blue">{stats.completionPercentage}%</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#12151d]/90 px-4 py-4 sm:px-5 sm:py-5">
                            <div className="flex items-center gap-1.5 text-slate-400">
                                <Layers size={14} className="text-poke-blue" />
                                <span className="text-xs font-semibold">Coleção</span>
                            </div>
                            <div className="mt-3">
                                <span className="font-mono text-2xl font-black tracking-tight text-white sm:text-3xl">{stats.totalCollection}</span>
                                <p className="mt-1 text-[11px] text-slate-500">{stats.totalCollection === 1 ? "carta física" : "cartas físicas"}</p>
                            </div>
                        </div>
                    </section>

                    <section className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#12151d]/90 p-5 shadow-xl backdrop-blur-md sm:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <h2 className="text-base font-bold text-white sm:text-lg">Mini-Grid dos 151</h2>
                                <p className="text-xs text-slate-400">{isOwner ? "Clique em um slot para abrir a página no binder." : "Pokémon no binder aparecem coloridos; os demais ficam em silhueta."}</p>
                            </div>

                            <div className="flex items-center gap-4 text-xs">
                                <div className="flex items-center gap-1.5">
                                    <div className="h-3 w-3 rounded border border-white/15 bg-white/5" />
                                    <span className="text-slate-500">Vazio</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div className="h-3 w-3 rounded border border-poke-blue bg-poke-blue/30" />
                                    <span className="text-slate-200">Preenchido</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-[repeat(auto-fill,minmax(54px,1fr))] gap-2">
                            {slots.map((slot, index) => (
                                <DashboardMiniSlot key={slot.pokemon_dex_id} slot={slot} index={index} onClick={isOwner ? handleSlotClick : undefined} />
                            ))}
                        </div>
                    </section>

                    {rarityBreakdown.length > 0 && (
                        <section className="rounded-2xl border border-white/10 bg-[#12151d]/90 p-5 shadow-xl backdrop-blur-md sm:p-6">
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

            {isPickerOpen ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setIsPickerOpen(false);
                    }}
                >
                    <div className="flex h-[min(85dvh,720px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#12151d] shadow-2xl">
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
                                <input type="text" value={pickerSearch} onChange={(e) => setPickerSearch(e.target.value)} placeholder="Buscar por nome, número ou coleção..." className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pr-9 pl-9 text-xs text-white placeholder-slate-500 transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none" />
                                {pickerSearch ? (
                                    <button type="button" onClick={() => setPickerSearch("")} aria-label="Limpar busca" className="absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-500 hover:text-white">
                                        <X size={14} />
                                    </button>
                                ) : null}
                            </div>
                            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                                <Select<BinderStatusFilter> value={pickerStatus} onChange={setPickerStatus} options={PICKER_STATUS_OPTIONS} icon={<BookOpen size={13} />} ariaLabel="Filtrar por status no binder" size="sm" className="min-w-0 w-full" />
                                <Select<string> value={pickerLanguage} onChange={setPickerLanguage} options={PICKER_LANGUAGE_OPTIONS} icon={<Globe size={13} />} ariaLabel="Filtrar por idioma" size="sm" className="min-w-0 w-full" />
                                <Select<string> value={pickerRarity} onChange={setPickerRarity} options={RARITY_FILTER_OPTIONS} icon={<Sparkles size={13} />} ariaLabel="Filtrar por raridade" size="sm" className="min-w-0 w-full" />
                            </div>
                        </div>

                        <div ref={setPickerScrollRoot} className="min-h-0 flex-1 overflow-y-auto p-4">
                            {collectionCards.length === 0 ? (
                                <div className="flex h-full flex-col items-center justify-center gap-2 py-12 text-center">
                                    <Layers2 size={28} className="text-slate-600" />
                                    <p className="text-sm text-slate-400">Nenhuma carta na coleção ainda.</p>
                                    <NextLink href="/collection" className="mt-2 text-xs font-semibold text-poke-blue">
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
                                        }}
                                        className="mt-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10"
                                    >
                                        Limpar filtros
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-5">
                                        {visiblePickerCards.map((card) => {
                                            const selected = draftFavoriteIds.includes(card.id);
                                            return (
                                                <button key={card.id} type="button" onClick={() => toggleFavorite(card.id)} className={`relative flex flex-col rounded-xl border p-1.5 text-left transition-all active:scale-[0.98] ${selected ? "border-poke-blue bg-poke-blue/10 ring-1 ring-poke-blue/40" : "border-white/10 bg-white/[0.03] hover:border-white/25"}`}>
                                                    <span className={`absolute right-1.5 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full border shadow-md transition-colors ${selected ? "border-emerald-400/60 bg-emerald-500 text-white shadow-emerald-500/25" : "border-white/20 bg-black/70 text-slate-400"}`}>{selected ? <Check size={13} strokeWidth={3} /> : <Plus size={13} strokeWidth={2.5} />}</span>
                                                    <div className="relative aspect-[2.5/3.5] w-full">
                                                        <Image src={formatTcgdexImageUrl(card.card_image_url)} alt={card.card_name} fill unoptimized sizes="100px" className="object-contain" />
                                                    </div>
                                                    <span className="mt-1 truncate text-[9px] font-semibold text-white">{card.card_name}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div ref={pickerSentinelRef} className="flex min-h-8 items-center justify-center" aria-hidden={!pickerHasMore} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : null}

            <CardLightbox src={lightbox?.src ?? null} alt={lightbox?.alt} shineMode={lightbox?.shineMode} onClose={closeLightbox} />
        </ProfileShell>
    );
}
