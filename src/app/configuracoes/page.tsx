import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/supabase/serverUser";
import { SettingsClient } from "./SettingsClient";

export const metadata: Metadata = {
    title: "Configurações | MyPokeBinder",
    description: "Configurações da sua conta, sons, animações e tema.",
};

export default async function SettingsPage() {
    const { user, supabase } = await getServerUser();

    if (!user) {
        redirect("/login");
    }

    const { data: profile } = await supabase.from("profiles").select("id, username, display_name, bio, avatar_url").eq("id", user.id).maybeSingle();

    return <SettingsClient initialProfile={profile ?? null} />;
}
