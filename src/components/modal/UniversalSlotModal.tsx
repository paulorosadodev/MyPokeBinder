"use client";

import { useRef } from "react";
import { toast } from "sonner";
import { BinderSlotSelectModal } from "@/components/modal/BinderSlotSelectModal";
import { POKEMON_MAP } from "@/lib/pokemon/constants";
import type { BinderSlot, GridType, UserCard } from "@/types/binder";

interface UniversalSlotModalProps {
    isOpen: boolean;
    hasOpenSibling?: boolean;
    skipEnterAnimation?: boolean;
    onClose: () => void;
    slot: BinderSlot | null;
    binderId: string;
    binderName: string;
    binderGrid: GridType;
    onAssignSuccess: (slotId: string, card: UserCard) => void;
    onUnassignSuccess: (slotId: string) => void;
    onOpenCatalogSearch: (prefillName?: string, dexId?: number) => void;
}

export function UniversalSlotModal({ isOpen, hasOpenSibling = false, skipEnterAnimation = false, onClose, slot, binderId, binderName, binderGrid, onAssignSuccess, onUnassignSuccess, onOpenCatalogSearch }: UniversalSlotModalProps) {
    const isSubmittingRef = useRef(false);

    if (!slot) return null;

    const dexId = slot.target_dex_id ?? undefined;
    const pokemonName = dexId ? POKEMON_MAP.get(dexId)?.name || `Pokémon #${dexId}` : slot.target_card_name || "Compartimento livre";
    const title = slot.slot_type === "free" ? "Compartimento livre" : pokemonName;
    const description = slot.slot_type === "free" ? "Selecione uma carta guardada na sua coleção para exibir neste compartimento" : "Selecione uma carta da sua coleção para exibir no binder";

    const handleAssign = async (card: UserCard) => {
        if (isSubmittingRef.current) return false;

        isSubmittingRef.current = true;
        try {
            const response = await fetch(`/api/binders/${binderId}/slots/${slot.id}/assign`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_card_id: card.id }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                toast.error(errorData.error || "Erro ao alocar carta no compartimento");
                return false;
            }

            toast.success("Carta alocada no binder!");
            onAssignSuccess(slot.id, card);
            return true;
        } catch {
            toast.error("Erro inesperado ao alocar carta");
            return false;
        } finally {
            isSubmittingRef.current = false;
        }
    };

    const handleRemove = async () => {
        if (isSubmittingRef.current) return false;

        isSubmittingRef.current = true;
        try {
            const response = await fetch(`/api/binders/${binderId}/slots/${slot.id}/assign`, { method: "DELETE" });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                toast.error(errorData.error || "Erro ao remover carta do compartimento");
                return false;
            }

            toast.success("Carta devolvida para guardadas na coleção!");
            onUnassignSuccess(slot.id);
            return true;
        } catch {
            toast.error("Erro inesperado ao remover carta");
            return false;
        } finally {
            isSubmittingRef.current = false;
        }
    };

    return (
        <BinderSlotSelectModal
            isOpen={isOpen}
            hasOpenSibling={hasOpenSibling}
            skipEnterAnimation={skipEnterAnimation}
            dexId={dexId}
            pokemonName={pokemonName}
            title={title}
            description={description}
            targetCardId={slot.target_tcgdex_id ?? undefined}
            matchesDexIdExactly
            onlyUnallocatedCards
            activeCardId={slot.user_card_id ?? undefined}
            activeCard={slot.card ?? undefined}
            activeCardAllocation={
                slot.card
                    ? {
                          slot_id: slot.id,
                          binder_id: binderId,
                          page_number: slot.page_number,
                          slot_index: slot.slot_index,
                          binder_name: binderName,
                          binder_grid: binderGrid,
                      }
                    : null
            }
            editSearchParams={{ binderId, slotId: slot.id, page: slot.page_number, openSlot: "true" }}
            onClose={onClose}
            onCardSelected={handleAssign}
            onCardRemoved={handleRemove}
            onOpenCatalogSearch={() => {
                onOpenCatalogSearch(slot.slot_type === "pokemon" ? pokemonName : slot.target_card_name || undefined, dexId);
            }}
        />
    );
}
