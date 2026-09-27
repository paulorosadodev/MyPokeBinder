import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { PublicCollectionView } from "@/components/profile/PublicCollectionView";
import { ProfileRouteLoading } from "@/components/profile/ProfileRouteLoading";
import { getCachedPublicTrainerData, hydratePublicCollection, toPublicCachedCollection } from "@/lib/profile/publicCache";
import { safeDecodeParam } from "@/lib/profile/username";

export default function PublicCollectionPage({ params }: { params: Promise<{ username: string }> }) {
    return (
        <Suspense fallback={<ProfileRouteLoading message="Carregando coleção..." />}>
            <PublicCollectionPageContent params={params} />
        </Suspense>
    );
}

async function PublicCollectionPageContent({ params }: { params: Promise<{ username: string }> }) {
    const { username: raw } = await params;
    const decoded = safeDecodeParam(raw);
    const username = (decoded ?? raw ?? "").trim().toLowerCase();

    const supabasePromise = createClient();
    const cachedPromise = getCachedPublicTrainerData(username);
    const [supabase, cached] = await Promise.all([supabasePromise, cachedPromise]);
    const {
        data: { user: viewer },
    } = await supabase.auth.getUser();

    return <PublicCollectionView username={username} fallbackData={cached ? hydratePublicCollection(toPublicCachedCollection(cached), viewer) : undefined} />;
}
