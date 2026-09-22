import NextLink from "next/link";
import { PokeballLogo } from "@/components/ui/PokeballLogo";
import { LogIn } from "lucide-react";

export function PublicHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0c10]/90 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
                <NextLink href="/" className="flex shrink-0 items-center gap-2.5 no-underline">
                    <PokeballLogo size="sm" animated glow="subtle" color="#ef4444" />
                    <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-base font-extrabold tracking-tight text-transparent sm:text-lg">MyPokeBinder</span>
                </NextLink>

                <NextLink href="/login" className="flex items-center gap-2 rounded-xl bg-[#ef4444] px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-[#dc2626] active:scale-[0.98] sm:text-sm">
                    <LogIn size={15} />
                    <span>Entrar</span>
                </NextLink>
            </div>
        </header>
    );
}
