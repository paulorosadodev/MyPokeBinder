"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Loader2, X } from "lucide-react";
import { BinderShelfBook } from "@/components/shelf/BinderShelfBook";
import { useDismissibleOverlay } from "@/lib/hooks/useDismissibleOverlay";
import { useOverlayPresence } from "@/lib/hooks/useOverlayPresence";
import type { Binder } from "@/types/binder";

interface CardAllocateModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CardAllocateModal({ isOpen, onClose }: CardAllocateModalProps) {
    const router = useRouter();
    const [binders, setBinders] = useState<Binder[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [navigatingBinderId, setNavigatingBinderId] = useState<string | null>(null);
    const isNavigating = navigatingBinderId !== null;

    useDismissibleOverlay(isOpen, onClose, isNavigating);
    const { isPresent, state } = useOverlayPresence(isOpen);

    useEffect(() => {
        if (!isOpen) {
            setNavigatingBinderId(null);
            return;
        }

        let isCurrent = true;
        setIsLoading(true);
        fetch("/api/binders")
            .then((response) => (response.ok ? response.json() : { binders: [] }))
            .then((data) => {
                if (!isCurrent) return;
                setBinders(data.binders ?? []);
                setIsLoading(false);
            })
            .catch(() => {
                if (isCurrent) setIsLoading(false);
            });

        return () => {
            isCurrent = false;
        };
    }, [isOpen]);

    const handleSelectBinder = (binder: Binder) => {
        if (isNavigating) return;
        setNavigatingBinderId(binder.id);
        onClose();
        router.push(`/binders/${binder.id}`);
    };

    if (!isPresent) return null;

    return (
        <div
            className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 backdrop-blur-sm sm:p-4"
            data-overlay-state={state}
            role="dialog"
            aria-modal="true"
            aria-label="Alocar carta em um binder"
            onClick={(event) => {
                if (event.target === event.currentTarget && !isNavigating) onClose();
            }}
        >
            <div className="modal-surface flex h-dvh max-h-none w-full max-w-none flex-col overflow-y-auto rounded-none border-0 bg-[#121622] p-5 shadow-2xl sm:h-auto sm:max-h-[90dvh] sm:max-w-5xl sm:rounded-2xl sm:border sm:border-white/10">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <div className="flex min-w-0 flex-1 items-center gap-2.5">
                        <BookOpen size={18} className="shrink-0 text-poke-blue" />
                        <h3 className="truncate text-sm font-bold text-white sm:text-base">Alocar em um Binder</h3>
                    </div>
                    <button type="button" onClick={onClose} disabled={isNavigating} aria-label="Fechar" className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-wait disabled:opacity-50">
                        <X size={16} />
                    </button>
                </div>

                <div className="mt-4 flex min-h-0 flex-1 flex-col gap-4">
                    <p className="text-xs text-slate-400">Escolha um binder para continuar a alocação na página dele.</p>

                    {isLoading ? (
                        <div className="flex h-32 items-center justify-center">
                            <Loader2 size={20} className="animate-spin text-poke-blue" />
                        </div>
                    ) : binders.length === 0 ? (
                        <div className="py-6 text-center text-xs text-slate-400">Você ainda não possui nenhum binder.</div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 overflow-y-auto px-1 pb-1 sm:grid-cols-2 lg:grid-cols-3">
                            {binders.map((binder) => (
                                <button
                                    key={binder.id}
                                    type="button"
                                    onClick={() => handleSelectBinder(binder)}
                                    disabled={isNavigating}
                                    aria-label={`Abrir Binder ${binder.name}`}
                                    className="binder-shelf-card group relative flex cursor-pointer flex-col rounded-[20px] border border-white/10 bg-[#10131b]/70 p-3 text-left outline-none transition-[border-color,background-color] duration-300 hover:border-white/20 hover:bg-[#131722] focus-visible:ring-2 focus-visible:ring-poke-blue/80 disabled:cursor-wait disabled:opacity-60"
                                >
                                    <BinderShelfBook binder={binder} active={false} />
                                    <div className="px-1 pt-4">
                                        <h4 className="truncate text-[15px] font-bold tracking-tight text-white sm:text-base">{binder.name}</h4>
                                        <p className="mt-1 text-[11px] text-slate-400">
                                            {binder.total_pages} {binder.total_pages === 1 ? "página" : "páginas"}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
