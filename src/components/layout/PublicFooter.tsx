import NextLink from "next/link";
import { PokeballLogo } from "@/components/ui/PokeballLogo";
import { ShieldCheck, FileText, Sparkles, BookOpen, Layers, LogIn } from "lucide-react";

export function PublicFooter() {
    return (
        <footer className="relative z-20 border-t border-white/10 bg-[#07090e] py-12 text-slate-400">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-12">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3">
                            <PokeballLogo size="md" glow="subtle" color="#ef4444" />
                            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-xl font-extrabold tracking-tight text-transparent">MyPokeBinder</span>
                        </div>
                        <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">O fichário digital pessoal 3×3 dos 151 Pokémon clássicos de Kanto. Acompanhe seu progresso físico, descubra artes expandidas e sinta a experiência de folhear seu álbum oficial.</p>
                        <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-medium text-emerald-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Sincronização em Nuvem
                            </span>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-medium text-slate-300">Catálogo TCGdex</span>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-medium text-slate-300">151 Slots Fixos</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navegação</h4>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            <li>
                                <NextLink href="/inicio" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                                    <Sparkles size={15} className="text-amber-400" />
                                    <span>Página Inicial</span>
                                </NextLink>
                            </li>
                            <li>
                                <NextLink href="/" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                                    <BookOpen size={15} className="text-poke-blue" />
                                    <span>Meu Binder 3×3</span>
                                </NextLink>
                            </li>
                            <li>
                                <NextLink href="/collection" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                                    <Layers size={15} className="text-emerald-400" />
                                    <span>Coleção Geral</span>
                                </NextLink>
                            </li>
                            <li>
                                <NextLink href="/login" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                                    <LogIn size={15} className="text-red-400" />
                                    <span>Entrar</span>
                                </NextLink>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white">Transparência & Legal</h4>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            <li>
                                <NextLink href="/privacidade" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                                    <ShieldCheck size={15} className="text-emerald-400" />
                                    <span>Política de Privacidade</span>
                                </NextLink>
                            </li>
                            <li>
                                <NextLink href="/termos" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                                    <FileText size={15} className="text-blue-400" />
                                    <span>Termos de Serviço</span>
                                </NextLink>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-8">
                    <p className="text-xs leading-relaxed text-slate-500">
                        Aviso Legal: Pokémon, Pokémon TCG, nomes de personagens, insígnias e ilustrações são marcas registradas e propriedade intelectual de Nintendo, Creatures Inc. e Game Freak / The Pokémon Company. MyPokeBinder é uma aplicação web independente criada por fãs para organização pessoal sem fins comerciais e não é afiliada, endossada ou patrocinada por The Pokémon Company ou Nintendo. As imagens e dados de cartas são obtidos através da API pública TCGdex para uso sob a doutrina
                        de fair use.
                    </p>
                    <div className="mt-4 flex flex-col items-center justify-between gap-2 sm:flex-row text-xs text-slate-500">
                        <p>© {new Date().getFullYear()} MyPokeBinder. Todos os direitos reservados.</p>
                        <p className="flex items-center gap-1 text-slate-400">Feito para treinadores de Kanto</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
