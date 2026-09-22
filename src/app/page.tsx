import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { BinderClientPage } from "@/components/binder/BinderClientPage";
import { LandingPage } from "@/components/landing/LandingPage";
import type { UserCard } from "@/types/binder";

export const metadata: Metadata = {
    title: "MyPokeBinder | Pokémon TCG",
    description: "Seu fichário digital pessoal 3×3 para os 151 Pokémon originais de Kanto. Colecione, organize e complete sua coleção de cartas físicas.",
};

export default async function Page() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return <LandingPage />;
    }

    const { data: binderCards } = await supabase.from("user_cards").select("*").eq("user_id", user.id).eq("is_in_binder", true).order("pokemon_dex_id", { ascending: true });

    return (
        <BinderClientPage
            initialUser={{
                email: user.email,
                name: user.user_metadata?.full_name || user.user_metadata?.name,
                avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture,
            }}
            initialCards={(binderCards as UserCard[] | null) ?? []}
        />
    );
}
