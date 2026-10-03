import { redirect } from "next/navigation";
import { getServerUser } from "@/lib/supabase/serverUser";
import { usernameFromEmail } from "@/lib/profile/username";

export default async function ProfileIndexPage() {
    const { user, supabase } = await getServerUser();

    if (!user) {
        redirect("/login");
    }

    const { data: profile } = await supabase.from("profiles").select("username").eq("id", user.id).maybeSingle();

    const username = profile?.username || usernameFromEmail(user.email);
    redirect(`/perfil/${username}`);
}
