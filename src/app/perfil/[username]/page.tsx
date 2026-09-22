import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TrainerProfileView } from "@/components/profile/TrainerProfileView";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default async function SharedProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username: raw } = await params;
    const param = decodeURIComponent(raw || "").trim();

    if (UUID_RE.test(param)) {
        const supabase = await createClient();
        const { data } = await supabase.from("profiles").select("username").eq("id", param).maybeSingle();
        if (data?.username) {
            redirect(`/perfil/${data.username}`);
        }
    }

    return <TrainerProfileView username={param.toLowerCase()} />;
}
