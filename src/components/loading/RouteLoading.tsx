"use client";

import { PokeballLoader } from "@/components/loading/PokeballLoader";

export function RouteLoading({ message = "Carregando...", className }: { message?: string; className?: string }) {
    return (
        <main className={className || "flex flex-1 items-start justify-center pt-10 sm:pt-14 md:pt-18 pb-16"}>
            <PokeballLoader message={message} size="lg" />
        </main>
    );
}
