"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { ProfileRouteLoading } from "@/components/profile/ProfileRouteLoading";
import { usernameFromEmail } from "@/lib/profile/username";

export default function ProfileIndexPage() {
    const router = useRouter();
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (isLoading) return;

        if (!user) {
            router.replace("/login");
            return;
        }

        const username = user.username || usernameFromEmail(user.email);
        router.replace(`/perfil/${username}`);
    }, [user, isLoading, router]);

    return <ProfileRouteLoading />;
}
