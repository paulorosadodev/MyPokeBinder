import NextLink from "next/link";
import { PokeballLogo } from "@/components/ui/PokeballLogo";

export function PublicFooter() {
    return (
        <footer className="relative z-20 border-t border-white/10 bg-[#07090e] py-12 text-slate-400">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-12">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3">
                            <PokeballLogo size="md" glow="subtle" color="#ef4444" />
                            <span className="text-xl font-bold tracking-tight text-white">MyPokeBinder</span>
                        </div>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">Fichário digital 3×3 dos 151 Pokémon de Kanto. Registre suas cartas físicas e folheie o binder.</p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-white">Navegação</h4>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            <li>
                                <NextLink href="/inicio" className="transition-colors hover:text-white">
                                    Página Inicial
                                </NextLink>
                            </li>
                            <li>
                                <NextLink href="/" className="transition-colors hover:text-white">
                                    Meu Binder
                                </NextLink>
                            </li>
                            <li>
                                <NextLink href="/collection" className="transition-colors hover:text-white">
                                    Coleção
                                </NextLink>
                            </li>
                            <li>
                                <NextLink href="/login" className="transition-colors hover:text-white">
                                    Entrar
                                </NextLink>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-white">Legal</h4>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            <li>
                                <NextLink href="/privacidade" className="transition-colors hover:text-white">
                                    Política de Privacidade
                                </NextLink>
                            </li>
                            <li>
                                <NextLink href="/termos" className="transition-colors hover:text-white">
                                    Termos de Serviço
                                </NextLink>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-8">
                    <p className="text-xs leading-relaxed text-slate-500">Pokémon, Pokémon TCG, nomes de personagens, insígnias e ilustrações são marcas registradas e propriedade intelectual de Nintendo, Creatures Inc. e Game Freak / The Pokémon Company. MyPokeBinder é uma aplicação independente criada por fãs, sem fins comerciais, e não é afiliada, endossada ou patrocinada por The Pokémon Company ou Nintendo. Imagens e dados de cartas vêm da API pública TCGdex, sob uso justo.</p>
                    <p className="mt-4 text-xs text-slate-500">© {new Date().getFullYear()} MyPokeBinder</p>
                </div>
            </div>
        </footer>
    );
}
