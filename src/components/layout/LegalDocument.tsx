import type { ReactNode } from "react";
import NextLink from "next/link";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { ArrowLeft } from "lucide-react";

type LegalDocumentProps = {
    title: string;
    updatedAt: string;
    children: ReactNode;
};

export function LegalDocument({ title, updatedAt, children }: LegalDocumentProps) {
    return (
        <div className="min-h-screen bg-[#07090e] text-slate-200">
            <PublicHeader />

            <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                <NextLink href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white">
                    <ArrowLeft size={14} />
                    <span>Voltar</span>
                </NextLink>

                <header className="mt-8 border-b border-white/10 pb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
                    <p className="mt-2 text-sm text-slate-500">{updatedAt}</p>
                </header>

                <div className="divide-y divide-white/10 text-sm leading-relaxed text-slate-300 sm:text-[15px]">{children}</div>
            </main>

            <PublicFooter />
        </div>
    );
}

type LegalSectionProps = {
    id?: string;
    title: string;
    children: ReactNode;
};

export function LegalSection({ id, title, children }: LegalSectionProps) {
    return (
        <section id={id} className="py-8 first:pt-8 last:pb-0">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <div className="mt-4 space-y-3">{children}</div>
        </section>
    );
}

type LegalCalloutProps = {
    title: string;
    children: ReactNode;
};

export function LegalCallout({ title, children }: LegalCalloutProps) {
    return (
        <aside className="rounded-2xl border border-[#ef4444]/25 bg-[#ef4444]/5 p-5 sm:p-6">
            <h3 className="text-base font-semibold text-white">{title}</h3>
            <div className="mt-3 space-y-3 text-slate-300">{children}</div>
        </aside>
    );
}
