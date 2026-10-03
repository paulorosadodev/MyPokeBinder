"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import { useSWRConfig } from "swr";
import { ArrowLeft, Check, Lock, Globe, Trash2, AlertTriangle, Sparkles, Star } from "lucide-react";
import { toast } from "sonner";
import { BinderCoverArt } from "@/components/binder/BinderCoverArt";
import { BINDER_COVER_THEMES } from "@/lib/binder/themes";

const CoverPokemonSelector = dynamic(() => import("@/components/binder/CoverPokemonSelector").then((mod) => mod.CoverPokemonSelector), { ssr: false });
import { getBinderSlotPageCount } from "@/lib/binder/pageCapacity";
import { useDismissibleOverlay } from "@/lib/hooks/useDismissibleOverlay";
import { useOverlayPresence } from "@/lib/hooks/useOverlayPresence";
import type { Binder, BinderSlot, GridType } from "@/types/binder";

const SLOTS_PER_GRID: Record<GridType, number> = {
    "1x1": 1,
    "2x2": 4,
    "3x3": 9,
    "3x4": 12,
};

interface BinderEditClientProps {
    binder: Binder;
    initialSlots: BinderSlot[];
}

export function BinderEditClient({ binder, initialSlots }: BinderEditClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isFromShelf = searchParams?.get("from") === "shelf";
    const { mutate: mutateCache } = useSWRConfig();

    const [name, setName] = useState(binder.name);
    const [description, setDescription] = useState(binder.description || "");
    const [coverTheme, setCoverTheme] = useState(binder.cover_theme || "classic_red");
    const [coverPokemonDexId, setCoverPokemonDexId] = useState<number | null>(binder.cover_pokemon_dex_id ?? null);
    const [isPublic, setIsPublic] = useState(binder.is_public);
    const [isFeatured, setIsFeatured] = useState(binder.is_featured);
    const [totalPages, setTotalPages] = useState<number>(binder.total_pages);

    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeallocateModal, setShowDeallocateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useDismissibleOverlay(showDeallocateModal, () => setShowDeallocateModal(false), isSaving);
    useDismissibleOverlay(showDeleteModal, () => setShowDeleteModal(false), isDeleting);
    const { isPresent: isDeallocateModalPresent, state: deallocateModalOverlayState } = useOverlayPresence(showDeallocateModal);
    const { isPresent: isDeleteModalPresent, state: deleteModalOverlayState } = useOverlayPresence(showDeleteModal);

    const slotsPerPage = SLOTS_PER_GRID[binder.grid_type];
    const totalCapacity = getBinderSlotPageCount(totalPages) * slotsPerPage;

    const cardsInDeletedPages = useMemo(() => {
        if (totalPages >= binder.total_pages) return [];
        return initialSlots.filter((s) => s.page_number > getBinderSlotPageCount(totalPages) && Boolean(s.user_card_id));
    }, [totalPages, binder.total_pages, initialSlots]);

    const totalCardsInBinder = useMemo(() => {
        return initialSlots.filter((s) => Boolean(s.user_card_id)).length;
    }, [initialSlots]);

    const handleSaveClick = (e: React.FormEvent) => {
        e.preventDefault();

        const trimmed = name.trim();
        if (!trimmed) {
            setErrorMessage("O nome do binder é obrigatório.");
            return;
        }

        if (cardsInDeletedPages.length > 0) {
            setShowDeallocateModal(true);
            return;
        }

        executeSave();
    };

    const executeSave = async () => {
        setIsSaving(true);
        setErrorMessage(null);

        try {
            const res = await fetch(`/api/binders/${binder.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    description: description.trim(),
                    cover_theme: coverTheme,
                    cover_pokemon_dex_id: coverPokemonDexId,
                    is_public: isPublic,
                    is_featured: isFeatured,
                    total_pages: totalPages,
                }),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || "Erro ao salvar alterações");
            }

            void mutateCache("/api/binders");
            void mutateCache(`/api/binders/${binder.id}`);
            toast.success("Estrutura do binder atualizada!");
            router.push(isFromShelf ? "/" : `/binders/${binder.id}?opened=1`);
        } catch (err: any) {
            setErrorMessage(err.message || "Erro inesperado ao salvar");
            setIsSaving(false);
            setShowDeallocateModal(false);
        }
    };

    const executeDelete = async () => {
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/binders/${binder.id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || "Erro ao excluir binder");
            }

            void mutateCache("/api/binders");
            void mutateCache(`/api/binders/${binder.id}`);
            toast.success("Binder excluído. As cartas voltaram para a coleção!");
            router.push("/");
        } catch (err: any) {
            toast.error(err.message || "Erro ao excluir o binder");
            setIsDeleting(false);
            setShowDeleteModal(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#0a0c10] text-slate-100">
            <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 pb-28 md:pb-16">
                <div className="profile-enter flex items-center justify-between border-b border-white/10 pb-4">
                    <NextLink href={isFromShelf ? "/" : `/binders/${binder.id}?opened=1`} className="flex items-center gap-2 text-xs font-semibold text-slate-400 transition-colors hover:text-white">
                        <ArrowLeft size={16} />
                        <span>{isFromShelf ? "Voltar para a Estante" : "Voltar ao Binder"}</span>
                    </NextLink>

                    <h1 className="text-sm font-bold text-slate-300">
                        Editar Estrutura: <span className="text-white">{binder.name}</span>
                    </h1>
                </div>

                {errorMessage && <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3.5 text-xs text-red-300">{errorMessage}</div>}

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <form onSubmit={handleSaveClick} className="profile-enter flex flex-col gap-6 lg:col-span-7">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-300">
                                Nome do Binder <span className="text-red-400">*</span>
                            </label>
                            <input type="text" maxLength={60} value={name} onChange={(e) => setName(e.target.value)} className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 text-sm text-white placeholder-slate-500 focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-300">Descrição</label>
                            <textarea rows={3} maxLength={200} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white placeholder-slate-500 focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none" />
                        </div>

                        <div className="flex flex-col gap-2.5">
                            <label className="text-xs font-bold text-slate-300">Tema da Capa</label>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                {Object.values(BINDER_COVER_THEMES).map((t) => {
                                    const isSelected = coverTheme === t.id;
                                    return (
                                        <button key={t.id} type="button" onClick={() => setCoverTheme(t.id)} className={`flex cursor-pointer items-center gap-2 rounded-xl border p-2 text-left transition-all ${isSelected ? "border-white bg-white/10" : "border-white/10 bg-white/[0.02] hover:border-white/20"}`}>
                                            <div className="h-5 w-5 shrink-0 rounded-full border border-white/20" style={{ backgroundColor: t.primaryColor }} />
                                            <span className="block truncate text-xs font-semibold text-white">{t.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <CoverPokemonSelector value={coverPokemonDexId} onChange={setCoverPokemonDexId} />

                        <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-300">Formato do Grid</span>
                                <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/40 px-2 py-0.5 text-xs font-mono text-slate-300">
                                    <Lock size={12} className="text-slate-400" />
                                    <span>Grid {binder.grid_type} (Imutável)</span>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-400">O formato do grid é fixo para manter a consistência física e a proporção dos compartimentos.</p>
                        </div>

                        <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-slate-300">Total de Páginas (1 a 50)</label>
                                <span className="font-mono text-sm font-bold text-poke-blue">
                                    {totalPages} {totalPages === 1 ? "página" : "páginas"}
                                </span>
                            </div>

                            <input type="range" min={1} max={50} value={totalPages} onChange={(e) => setTotalPages(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/10 accent-poke-blue" />

                            <div className="flex items-center justify-between text-[11px] text-slate-400">
                                <span>Mínimo: 1 página</span>
                                <span className="font-mono">
                                    Capacidade: <strong className="text-white">{totalCapacity}</strong> cartas
                                </span>
                                <span>Máximo: 50 páginas</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                                <div className="flex flex-col gap-0.5">
                                    <div className="flex items-center gap-1.5">
                                        {isPublic ? <Globe size={14} className="text-emerald-400" /> : <Lock size={14} className="text-slate-400" />}
                                        <span className="text-xs font-bold text-white">Binder Público</span>
                                    </div>
                                    <span className="text-[11px] text-slate-400">Outros treinadores poderão visualizar seu binder através do seu perfil público.</span>
                                </div>

                                <button type="button" onClick={() => setIsPublic(!isPublic)} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isPublic ? "bg-emerald-500" : "bg-white/15"}`}>
                                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${isPublic ? "translate-x-5" : "translate-x-0"}`} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                                <div className="flex flex-col gap-0.5">
                                    <div className="flex items-center gap-1.5">
                                        <Star size={14} className={isFeatured ? "text-amber-400 fill-amber-400" : "text-slate-400"} />
                                        <span className="text-xs font-bold text-white">Binder em Destaque no Perfil</span>
                                    </div>
                                    <span className="text-[11px] text-slate-400">Exibido no topo da sua página de perfil de treinador.</span>
                                </div>

                                <button type="button" onClick={() => setIsFeatured(!isFeatured)} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isFeatured ? "bg-amber-500" : "bg-white/15"}`}>
                                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${isFeatured ? "translate-x-5" : "translate-x-0"}`} />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <button type="button" onClick={() => setShowDeleteModal(true)} className="flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300">
                                <Trash2 size={14} />
                                <span>Excluir Binder</span>
                            </button>

                            <button type="submit" disabled={isSaving} className="flex items-center gap-2 rounded-xl bg-poke-blue px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-poke-blue/90 disabled:opacity-50">
                                {isSaving ? <span>Salvando...</span> : <span>Salvar Alterações</span>}
                            </button>
                        </div>
                    </form>

                    <div className="profile-enter profile-enter-d1 lg:col-span-5 flex flex-col gap-4">
                        <div className="rounded-2xl border border-white/10 bg-[#121520]/80 p-5 shadow-xl backdrop-blur-md">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pré-visualização da Capa</span>

                            <BinderCoverArt name={name.trim() || binder.name} coverTheme={coverTheme} coverPokemonDexId={coverPokemonDexId} className="mx-auto mt-4 w-full max-w-[305px]" />
                        </div>
                    </div>
                </div>
            </main>

            {isDeallocateModalPresent && (
                <div
                    className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-sm"
                    data-overlay-state={deallocateModalOverlayState}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Confirmar desalocação de cartas"
                    onClick={(event) => {
                        if (event.target === event.currentTarget && !isSaving) setShowDeallocateModal(false);
                    }}
                >
                    <div className="modal-surface flex h-dvh max-h-none w-full max-w-none flex-col overflow-y-auto rounded-none border-0 border-amber-500/40 bg-[#161a24] p-6 shadow-2xl sm:h-auto sm:max-w-md sm:rounded-2xl sm:border">
                        <div className="flex items-center gap-3 text-amber-400">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20">
                                <AlertTriangle size={20} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white">Desalocação de Cartas</h3>
                                <p className="text-xs text-amber-300">Resumo de Impacto nas Páginas</p>
                            </div>
                        </div>

                        <p className="mt-4 text-xs text-slate-300">
                            Você reduziu a quantidade de páginas de {binder.total_pages} para {totalPages}. As páginas removidas contêm <strong className="text-white font-bold">{cardsInDeletedPages.length} cartas alocadas</strong>.
                        </p>

                        <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-slate-400">
                            Nenhuma carta será perdida! Elas serão desalocadas dos compartimentos removidos e permanecerão na sua conta como cartas <strong className="text-emerald-400">guardadas na coleção</strong>.
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-3">
                            <button type="button" onClick={() => setShowDeallocateModal(false)} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10">
                                Cancelar
                            </button>
                            <button type="button" disabled={isSaving} onClick={executeSave} className="rounded-xl bg-amber-500 px-5 py-2 text-xs font-bold text-black hover:bg-amber-400 disabled:opacity-50">
                                {isSaving ? "Desalocando..." : "Confirmar e Desalocar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isDeleteModalPresent && (
                <div
                    className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-4 backdrop-blur-sm"
                    data-overlay-state={deleteModalOverlayState}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Confirmar exclusão do binder"
                    onClick={(event) => {
                        if (event.target === event.currentTarget && !isDeleting) setShowDeleteModal(false);
                    }}
                >
                    <div className="modal-surface flex h-dvh max-h-none w-full max-w-none flex-col overflow-y-auto rounded-none border-0 border-red-500/40 bg-[#181216] p-6 shadow-2xl sm:h-auto sm:max-w-md sm:rounded-2xl sm:border">
                        <div className="flex items-center gap-3 text-red-400">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20">
                                <Trash2 size={20} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white">Excluir Binder</h3>
                                <p className="text-xs text-red-300">Esta ação é permanente</p>
                            </div>
                        </div>

                        <p className="mt-4 text-xs text-slate-300">
                            Tem certeza que deseja excluir o binder <strong className="text-white">{binder.name}</strong>?
                        </p>

                        <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-slate-400">
                            Todas as {totalCardsInBinder} cartas alocadas neste binder voltarão para a sua conta como <strong className="text-emerald-400">guardadas na coleção</strong>.
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-3">
                            <button type="button" onClick={() => setShowDeleteModal(false)} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10">
                                Cancelar
                            </button>
                            <button type="button" disabled={isDeleting} onClick={executeDelete} className="rounded-xl bg-red-600 px-5 py-2 text-xs font-bold text-white hover:bg-red-500 disabled:opacity-50">
                                {isDeleting ? "Excluindo..." : "Sim, Excluir Binder"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
