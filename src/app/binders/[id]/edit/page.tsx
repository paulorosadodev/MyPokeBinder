import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getServerUser } from "@/lib/supabase/serverUser";
import { safeDecodeParam, UUID_REGEX } from "@/lib/profile/username";
import { BinderEditClient } from "./BinderEditClient";
import type { Binder, BinderSlot } from "@/types/binder";

export const metadata: Metadata = {
    title: "Editar Binder | MyPokeBinder",
    description: "Edite as configurações, capas e quantidade de páginas do seu binder.",
};

export default async function BinderEditPage({ params }: { params: Promise<{ id: string }> }) {
    const rawParams = await params;
    const binderId = safeDecodeParam(rawParams?.id);

    if (!binderId || !UUID_REGEX.test(binderId)) {
        notFound();
    }

    const { user, supabase } = await getServerUser();

    if (!user) {
        redirect("/login");
    }

    const [binderResult, slotsResult] = await Promise.all([supabase.from("binders").select("*").eq("id", binderId).eq("user_id", user.id).maybeSingle(), supabase.from("binder_slots").select("id, binder_id, page_number, slot_index, slot_type, user_card_id").eq("binder_id", binderId).not("user_card_id", "is", null)]);

    const { data: binder, error: binderError } = binderResult;

    if (binderError || !binder) {
        notFound();
    }

    return <BinderEditClient binder={binder as Binder} initialSlots={(slotsResult.data as BinderSlot[]) ?? []} />;
}
