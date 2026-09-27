import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TrainerProfileView } from "@/components/profile/TrainerProfileView";
import { ProfileRouteLoading } from "@/components/profile/ProfileRouteLoading";
import { buildCachedPublicProfile, getCachedPublicTrainerData, hydratePublicProfile } from "@/lib/profile/publicCache";
import { safeDecodeParam, UUID_REGEX } from "@/lib/profile/username";

export default function SharedProfilePage({ params }: { params: Promise<{ username: string }> }) {
    return (
        <Suspense fallback={<ProfileRouteLoading />}>
            <SharedProfilePageContent params={params} />
        </Suspense>
    );
}

async function SharedProfilePageContent({ params }: { params: Promise<{ username: string }> }) {
    const { username: raw } = await params;
    const decoded = safeDecodeParam(raw);
    const param = (decoded ?? raw ?? "").trim();

    if (UUID_REGEX.test(param)) {
        const supabase = await createClient();
        const { data } = await supabase.from("profiles").select("username").eq("id", param).maybeSingle();
        if (data?.username) {
            redirect(`/perfil/${data.username}`);
        }
    }

    const username = param.toLowerCase();
    const supabasePromise = createClient();
    const cachedPromise = getCachedPublicTrainerData(username);
    const [supabase, cached] = await Promise.all([supabasePromise, cachedPromise]);
    const {
        data: { user: viewer },
    } = await supabase.auth.getUser();

    return <TrainerProfileView username={username} fallbackData={cached ? hydratePublicProfile(buildCachedPublicProfile(cached), viewer) : undefined} />;
}
