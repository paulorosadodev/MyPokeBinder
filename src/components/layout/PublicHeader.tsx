import NextLink from "next/link";
import { PokeballLogo } from "@/components/ui/PokeballLogo";
import { LogIn } from "lucide-react";

export function PublicHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0c10]/85 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
                <NextLink href="/" className="flex shrink-0 items-center gap-2.5 no-underline">
                    <PokeballLogo size="sm" animated glow="subtle" color="#ef4444" />
                    <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-base font-extrabold tracking-tight text-transparent sm:text-lg">MyPokeBinder</span>
                </NextLink>

                <div className="flex items-center gap-3">
                    <NextLink href="/login" className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-red-500/20 transition-all hover:brightness-110 active:scale-95 sm:text-sm">
                        <LogIn size={15} />
                        <span>Entrar</span>
                    </NextLink>
                </div>
            </div>
        </header>
    );
}
