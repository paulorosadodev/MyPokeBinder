import type { Metadata } from "next";
import { getServerUser } from "@/lib/supabase/serverUser";
import { BinderShelf } from "@/components/shelf/BinderShelf";
import { LandingPage } from "@/components/landing/LandingPage";
import { getBindersForShelf } from "@/lib/binder/shelfData";

export const metadata: Metadata = {
    title: "Binders | MyPokeBinder",
    description: "Gerencie seus Binders de Pokémon TCG com formatos e capas personalizadas.",
};

export default async function Page() {
    const { user, supabase } = await getServerUser();

    if (!user) {
        return <LandingPage />;
    }

    const { binders } = await getBindersForShelf(supabase, user.id);
    return <BinderShelf initialBinders={binders} />;
}
