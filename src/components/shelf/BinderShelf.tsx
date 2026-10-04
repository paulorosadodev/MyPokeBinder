"use client";

import { useMemo, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Globe, Lock, ArrowRight, Settings, Search, X, Layers, BookOpen } from "lucide-react";
import { BinderShelfGridSkeleton } from "@/components/loading/BinderShelfSkeleton";
import { BinderShelfBook } from "@/components/shelf/BinderShelfBook";
import { SearchInput } from "@/components/ui/SearchInput";
import { useBinders } from "@/lib/swr";
import { getCoverTheme } from "@/lib/binder/themes";

import type { Binder } from "@/types/binder";

interface BinderShelfProps {
    initialBinders?: Binder[];
}

export function BinderShelf({ initialBinders = [] }: BinderShelfProps) {
    const router = useRouter();
    const fallbackData = useMemo(() => (initialBinders.length > 0 ? { binders: initialBinders } : undefined), [initialBinders]);
    const { binders, isLoading, isError } = useBinders(fallbackData);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeBinderId, setActiveBinderId] = useState<string | null>(null);
    const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase();
    const visibleBinders = useMemo(() => {
        if (!normalizedSearchTerm) return binders;
        return binders.filter((binder) => `${binder.name} ${binder.description ?? ""}`.toLocaleLowerCase().includes(normalizedSearchTerm));
    }, [binders, normalizedSearchTerm]);
    const totalCollectionCardsInBinders = useMemo(() => binders.reduce((total, binder) => total + (binder.total_cards || 0), 0), [binders]);

    return (
        <div className="flex min-h-screen flex-col">
            <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-6 px-4 py-6 pb-28 sm:px-6 sm:py-8 md:pb-16">
                <div className="flex items-start justify-between gap-3 sm:items-center sm:gap-4">
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                        <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-3xl leading-tight sm:leading-none">Meus Binders</h1>
                        {!isLoading ? (
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 sm:translate-y-[2px]">
                                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-semibold text-slate-300 leading-none sm:px-3.5 sm:py-1.5">
                                    <BookOpen size={13} className="shrink-0 text-[var(--theme-primary)]" />
                                    <span>
                                        {binders.length} <span className="hidden sm:inline">{binders.length === 1 ? "binder cadastrado" : "binders cadastrados"}</span>
                                        <span className="sm:hidden">{binders.length === 1 ? "binder" : "binders"}</span>
                                    </span>
                                </span>
                                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-semibold text-slate-300 leading-none sm:px-3.5 sm:py-1.5">
                                    <Layers size={13} className="shrink-0 text-[var(--theme-primary)]" />
                                    <span>
                                        {totalCollectionCardsInBinders} <span className="hidden sm:inline">{totalCollectionCardsInBinders === 1 ? "carta alocada" : "cartas alocadas"}</span>
                                        <span className="sm:hidden">{totalCollectionCardsInBinders === 1 ? "alocada" : "alocadas"}</span>
                                    </span>
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 sm:gap-2 sm:translate-y-[2px]">
                                <div className="h-5 w-16 shrink-0 animate-pulse rounded-full bg-white/10 sm:h-7 sm:w-28" />
                                <div className="h-5 w-16 shrink-0 animate-pulse rounded-full bg-white/10 sm:h-7 sm:w-28" />
                            </div>
                        )}
                    </div>

                    <NextLink href="/binders/new" prefetch={true} onMouseEnter={() => router.prefetch("/binders/new")} onTouchStart={() => router.prefetch("/binders/new")} aria-label="Criar Binder" className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-poke-blue px-3 py-2 text-xs font-semibold text-white shadow-md shadow-poke-blue/20 transition-all hover:brightness-110 active:scale-[0.98] sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm">
                        <Plus size={16} className="sm:h-[18px] sm:w-[18px]" />
                        <span className="hidden min-[380px]:inline">Criar Binder</span>
                        <span className="min-[380px]:hidden">Criar</span>
                    </NextLink>
                </div>

                <div className="relative z-20 flex items-center justify-between gap-2 sm:gap-3 w-full">
                    <div className="relative flex-1 min-w-0 sm:w-[440px] md:w-[500px] lg:w-[540px] sm:flex-none">
                        <Search size={15} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-500 z-20 sm:left-3.5 sm:h-4 sm:w-4" />
                        <SearchInput type="search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Buscar por nome ou descrição..." placeholderClassName="left-8.5 right-8 text-xs sm:left-10 sm:right-9 sm:text-sm" className="w-full h-9 sm:h-10 rounded-xl border border-white/10 bg-white/5 py-1.5 sm:py-2.5 pr-8 sm:pr-9 pl-8.5 sm:pl-10 text-xs sm:text-sm text-white transition-colors focus:border-poke-blue/60 focus:bg-white/[0.08] focus:outline-none" />
                        {searchTerm && (
                            <button type="button" onClick={() => setSearchTerm("")} aria-label="Limpar busca" className="absolute top-1/2 right-2.5 -translate-y-1/2 text-slate-500 hover:text-white z-20 sm:right-3 cursor-pointer">
                                <X size={14} className="sm:h-[15px] sm:w-[15px]" />
                            </button>
                        )}
                    </div>
                </div>

                {isLoading && binders.length === 0 ? (
                    <BinderShelfGridSkeleton count={4} />
                ) : isError && binders.length === 0 ? (
                    <div className="flex h-64 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center">
                        <p className="text-sm text-red-400">Não foi possível carregar seus binders no momento.</p>
                        <button type="button" onClick={() => window.location.reload()} className="rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20">
                            Recarregar página
                        </button>
                    </div>
                ) : (
                    <div className="relative">
                        {visibleBinders.length === 0 && normalizedSearchTerm ? (
                            <div className="flex h-64 flex-col items-center justify-center gap-3 text-center">
                                <Search size={32} className="text-slate-600" />
                                <div>
                                    <p className="text-sm font-semibold text-white">Nenhum Binder encontrado</p>
                                    <p className="mt-1 text-xs text-slate-400">Tente buscar por outro nome ou descrição.</p>
                                </div>
                                <button type="button" onClick={() => setSearchTerm("")} className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/10 hover:text-white">
                                    Limpar busca
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {visibleBinders.map((binder, index) => {
                                    const theme = getCoverTheme(binder.cover_theme);
                                    const totalSlots = binder.total_slots ?? binder.total_pages * 9;
                                    const completion = binder.completion_percentage ?? 0;
                                    const filledCount = binder.total_cards ?? 0;
                                    const appearDelay = Math.min(index * 40, 480);

                                    return (
                                        <div
                                            key={binder.id}
                                            role="link"
                                            tabIndex={0}
                                            onClick={() => router.push(`/binders/${binder.id}`)}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter" || event.key === " ") {
                                                    event.preventDefault();
                                                    router.push(`/binders/${binder.id}`);
                                                }
                                            }}
                                            onMouseEnter={() => router.prefetch(`/binders/${binder.id}`)}
                                            onPointerDown={() => router.prefetch(`/binders/${binder.id}`)}
                                            onFocus={(event) => {
                                                if (event.target !== event.currentTarget) return;
                                                setActiveBinderId(binder.id);
                                                router.prefetch(`/binders/${binder.id}`);
                                            }}
                                            onBlur={(event) => {
                                                if (event.target !== event.currentTarget) return;
                                                setActiveBinderId((current) => (current === binder.id ? null : current));
                                            }}
                                            aria-label={`Abrir Binder ${binder.name}`}
                                            style={{ animationDelay: `${appearDelay}ms` }}
                                            className="binder-shelf-card card-list-appear group relative flex cursor-pointer flex-col rounded-[20px] border border-white/10 bg-[#10131b]/70 outline-none transition-[border-color,background-color] duration-300 hover:border-white/20 hover:bg-[#131722] focus-visible:ring-2 focus-visible:ring-poke-blue/80"
                                        >
                                            <div className="relative w-full aspect-[264/372] rounded-t-[19px] bg-[#090c12]" onMouseEnter={() => setActiveBinderId(binder.id)} onMouseLeave={() => setActiveBinderId((current) => (current === binder.id ? null : current))}>
                                                <BinderShelfBook key={`${binder.id}-${binder.updated_at}`} binder={binder} active={activeBinderId === binder.id} />
                                            </div>

                                            <div className="flex flex-1 flex-col justify-between p-4">
                                                <div>
                                                    <div className="flex items-center justify-between gap-2">
                                                        <div className="flex min-w-0 items-center gap-1.5">
                                                            <h2 className="truncate text-[15px] font-bold tracking-tight text-white sm:text-base">{binder.name}</h2>
                                                            {binder.is_public ? (
                                                                <span title="Binder público" className="inline-flex shrink-0 items-center">
                                                                    <Globe size={14} className="text-emerald-400" aria-label="Binder público" />
                                                                </span>
                                                            ) : (
                                                                <span title="Binder privado" className="inline-flex shrink-0 items-center">
                                                                    <Lock size={13} className="text-slate-400" aria-label="Binder privado" />
                                                                </span>
                                                            )}
                                                        </div>
                                                        <NextLink
                                                            href={`/binders/${binder.id}/edit?from=shelf`}
                                                            prefetch={true}
                                                            onMouseEnter={() => router.prefetch(`/binders/${binder.id}/edit?from=shelf`)}
                                                            onTouchStart={() => router.prefetch(`/binders/${binder.id}/edit?from=shelf`)}
                                                            onClick={(e) => e.stopPropagation()}
                                                            title="Editar estrutura do Binder"
                                                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
                                                        >
                                                            <Settings size={14} />
                                                        </NextLink>
                                                    </div>

                                                    {binder.description && <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400">{binder.description}</p>}
                                                </div>

                                                <div className="mt-4 flex items-end justify-between border-t border-white/[0.07] pt-3">
                                                    <span className="font-mono text-[11px] text-slate-400">
                                                        <strong className="font-semibold text-slate-200">{filledCount}</strong>/{totalSlots} cartas
                                                    </span>
                                                    <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400">
                                                        <span style={{ color: theme.primaryColor }}>{completion}%</span>
                                                        <ArrowRight size={13} className="transition-transform duration-300 lg:group-hover:translate-x-0.5 lg:group-focus:translate-x-0.5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {!normalizedSearchTerm && (
                                    <NextLink
                                        href="/binders/new"
                                        prefetch={true}
                                        onMouseEnter={() => router.prefetch("/binders/new")}
                                        onTouchStart={() => router.prefetch("/binders/new")}
                                        style={{ animationDelay: `${Math.min(visibleBinders.length * 40, 480)}ms` }}
                                        className="card-list-appear group flex min-h-[320px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/15 bg-white/[0.015] p-6 text-center transition-all duration-300 hover:border-poke-blue/60 hover:bg-poke-blue/[0.03] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] select-none"
                                    >
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400 shadow-inner transition-all duration-300 group-hover:border-poke-blue/50 group-hover:bg-poke-blue/20 group-hover:text-white">
                                            <Plus size={28} />
                                        </div>
                                        <h3 className="mt-4 text-base font-bold text-white transition-colors group-hover:text-poke-blue">Criar Binder</h3>
                                        <p className="mt-1 max-w-[220px] text-xs text-slate-400">Escolha uma capa, o formato da grade e a quantidade de páginas.</p>
                                    </NextLink>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
