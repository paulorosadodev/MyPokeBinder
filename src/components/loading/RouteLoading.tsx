"use client";

import { PokeballLoader } from "@/components/loading/PokeballLoader";

export function RouteLoading({ message = "Carregando..." }: { message?: string }) {
    return (
        <main className="flex min-h-[60vh] flex-1 items-center justify-center">
            <PokeballLoader message={message} size="lg" />
        </main>
    );
}
