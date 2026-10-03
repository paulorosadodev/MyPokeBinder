import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { safeDecodeParam, UUID_REGEX } from "@/lib/profile/username";
import { getServerUser } from "@/lib/supabase/serverUser";
import { getCardDetailData } from "@/lib/cards/getCardDetail";
import { CardDetailClient } from "./CardDetailClient";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const rawParams = await params;
    const cardId = safeDecodeParam(rawParams?.id);

    if (!cardId || !UUID_REGEX.test(cardId)) {
        return { title: "Carta não encontrada | MyPokeBinder" };
    }

    const { user, supabase } = await getServerUser();
    if (!user) {
        return { title: "Carta | MyPokeBinder" };
    }

    const data = await getCardDetailData(supabase, user.id, cardId);
    if (!data?.card) {
        return { title: "Carta não encontrada | MyPokeBinder" };
    }

    return {
        title: `${data.card.card_name} | MyPokeBinder`,
        description: `Detalhes e gerenciamento do exemplar de ${data.card.card_name} na sua coleção.`,
    };
}

export default async function CardDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const rawParams = await params;
    const cardId = safeDecodeParam(rawParams?.id);

    if (!cardId || !UUID_REGEX.test(cardId)) {
        notFound();
    }

    const { user, supabase } = await getServerUser();
    if (!user) {
        redirect("/login");
    }

    const data = await getCardDetailData(supabase, user.id, cardId);
    if (!data?.card) {
        notFound();
    }

    return <CardDetailClient cardId={cardId} initialData={data} />;
}
