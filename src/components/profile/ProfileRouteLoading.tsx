"use client";

import { RouteLoading } from "@/components/loading/RouteLoading";

export function ProfileRouteLoading({ message = "Carregando perfil do treinador..." }: { message?: string }) {
    return (
        <div className="flex min-h-screen flex-col bg-[#0a0c10]">
            <RouteLoading message={message} />
        </div>
    );
}
