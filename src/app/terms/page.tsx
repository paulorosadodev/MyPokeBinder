import type { Metadata } from "next";
import TermosPage from "@/app/termos/page";

export const metadata: Metadata = {
    title: "Terms of Service | MyPokeBinder",
    description: "Terms of Service for MyPokeBinder application, fan project disclaimer, and acceptable use policy.",
};

export default function TermsPage() {
    return <TermosPage />;
}
