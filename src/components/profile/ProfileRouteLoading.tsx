"use client";

import { RouteLoading } from "@/components/loading/RouteLoading";

export function ProfileRouteLoading({ message = "Carregando perfil do treinador..." }: { message?: string }) {
    return (
        <div className="flex flex-1 flex-col items-center justify-start pt-10 sm:pt-14 md:pt-18 pb-16 bg-[#0a0c10]">
            <RouteLoading message={message} />
        </div>
    );
}
