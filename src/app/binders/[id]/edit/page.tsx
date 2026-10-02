import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
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

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: binder, error: binderError } = await supabase.from("binders").select("*").eq("id", binderId).eq("user_id", user.id).maybeSingle();

    if (binderError || !binder) {
        notFound();
    }

    const { data: slots } = await supabase.from("binder_slots").select("id, binder_id, page_number, slot_index, slot_type, user_card_id").eq("binder_id", binderId);

    return <BinderEditClient binder={binder as Binder} initialSlots={(slots as BinderSlot[]) ?? []} />;
}
