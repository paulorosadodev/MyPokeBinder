"use client";

import { Header } from "@/components/layout/Header";
import { PokeballLoader } from "@/components/loading/PokeballLoader";

export function ProfileRouteLoading({ message = "Carregando perfil do treinador..." }: { message?: string }) {
    return (
        <div className="flex min-h-screen flex-col bg-[#0a0c10]">
            <Header />
            <main className="flex flex-1 items-center justify-center">
                <PokeballLoader message={message} size="lg" />
            </main>
        </div>
    );
}
