import type { Metadata } from "next";
import { getServerUser } from "@/lib/supabase/serverUser";
import { BinderShelf } from "@/components/shelf/BinderShelf";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
    title: "Binders | MyPokeBinder",
    description: "Gerencie seus Binders de Pokémon TCG com formatos e capas personalizadas.",
};

export default async function Page() {
    const { user } = await getServerUser();

    if (!user) {
        return <LandingPage />;
    }

    return <BinderShelf />;
}
