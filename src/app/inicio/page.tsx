import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
    title: "MyPokeBinder | Fichário Virtual 3×3 dos 151 Pokémon",
    description: "Organize sua coleção real de cartas Pokémon TCG em um binder 3×3 realista com física de páginas, catálogo oficial TCGdex e efeitos holográficos.",
};

export default function InicioPage() {
    return <LandingPage />;
}
