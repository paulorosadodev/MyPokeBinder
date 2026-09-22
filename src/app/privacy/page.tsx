import type { Metadata } from "next";
import PrivacidadePage from "@/app/privacidade/page";

export const metadata: Metadata = {
    title: "Privacy Policy | MyPokeBinder",
    description: "Privacy Policy for MyPokeBinder application, Google OAuth scopes, and personal data protection.",
};

export default function PrivacyPage() {
    return <PrivacidadePage />;
}
