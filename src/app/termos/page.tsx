import type { Metadata } from "next";
import NextLink from "next/link";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { FileText, AlertCircle, CheckCircle2, Shield, Flame, Scale, Mail, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Termos de Serviço | MyPokeBinder",
    description: "Termos de Serviço do MyPokeBinder. Regras de utilização, aviso de propriedade intelectual e responsabilidades do usuário.",
};

export default function TermosPage() {
    return (
        <div className="min-h-screen bg-[#07090e] text-slate-200">
            <PublicHeader />

            <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                <div className="mb-8">
                    <NextLink href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition-colors hover:text-white">
                        <ArrowLeft size={14} />
                        <span>Voltar para a Página Inicial</span>
                    </NextLink>

                    <div className="mt-4 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                            <FileText size={26} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white sm:text-4xl">Termos de Serviço</h1>
                            <p className="mt-1 text-xs text-slate-400">Última atualização: 21 de setembro de 2026 • Termos de Uso e Condições Gerais</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-10 text-sm leading-relaxed text-slate-300">
                    <section className="rounded-3xl border border-white/10 bg-[#0c101a] p-6 sm:p-8">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <span>1. Aceitação dos Termos</span>
                        </h2>
                        <p className="mt-3">
                            Ao acessar ou utilizar a aplicação <strong className="text-white">MyPokeBinder</strong> (&quot;Serviço&quot;, &quot;Aplicação&quot; ou &quot;Plataforma&quot;), você declara ter lido, compreendido e concordado integralmente com estes Termos de Serviço, bem como com a nossa Política de Privacidade.
                        </p>
                        <p className="mt-3">Caso não concorde com qualquer disposição destes termos, orientamos que interrompa imediatamente o uso da aplicação.</p>
                    </section>

                    <section className="rounded-3xl border border-white/10 bg-[#0c101a] p-6 sm:p-8">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <span>2. Descrição e Finalidade do Serviço</span>
                        </h2>
                        <p className="mt-3">O MyPokeBinder é uma plataforma web criada como um organizador digital e fichário pessoal 3×3 voltado aos 151 Pokémon originais da região de Kanto. A aplicação permite que colecionadores de cartas físicas de Pokémon Trading Card Game (TCG):</p>
                        <ul className="mt-3 list-disc list-inside space-y-1.5 text-slate-300">
                            <li>Pesquisem cartas físicas no catálogo público da API TCGdex.</li>
                            <li>Registrem os exemplares que possuem fisicamente em sua coleção, indicando idioma e quantidade.</li>
                            <li>Vinculem cartas aos 151 slots fixos do fichário digital no formato 3×3 com física realista de páginas.</li>
                            <li>Visualizem seu progresso de coleção e personalizem o tema da interface.</li>
                        </ul>
                    </section>

                    <section id="propriedade-intelectual" className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 to-[#0c101a] p-6 sm:p-8">
                        <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-amber-400">
                            <AlertCircle size={16} />
                            <span>Propriedade Intelectual & Isenção de Responsabilidade</span>
                        </div>
                        <h2 className="mt-2 text-xl font-extrabold text-white">3. Marcas Registradas e Doutrina de Fair Use</h2>
                        <div className="mt-4 space-y-3 text-slate-300">
                            <p>
                                <strong className="text-white">Pokémon</strong>, Pokémon Trading Card Game, nomes de personagens, insígnias, ilustrações, cartas e quaisquer marcas e direitos autorais associados são marcas registradas e propriedade exclusiva de <strong className="text-white">Nintendo</strong>, <strong className="text-white">Creatures Inc.</strong> e <strong className="text-white">Game Freak / The Pokémon Company</strong>.
                            </p>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                    <Flame size={16} className="text-amber-400" />
                                    Projeto de Fã Independente (Fan Project)
                                </h3>
                                <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                                    O MyPokeBinder é um projeto independente criado exclusivamente por fãs, sem fins lucrativos e sem cobrança de assinaturas ou venda de bens digitais. O MyPokeBinder <strong className="text-white">NÃO É</strong> patrocinado, endossado, afiliado ou de qualquer forma oficialmente associado a Nintendo, Creatures Inc., Game Freak ou The Pokémon Company.
                                </p>
                            </div>
                            <p className="text-xs text-slate-400">Todas as imagens e metadados de cartas são consultados a partir da API pública TCGdex e são exibidos para fins estritamente informativos, educacionais e de catálogo pessoal de colecionadores, sob os preceitos de uso justo (fair use).</p>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-white/10 bg-[#0c101a] p-6 sm:p-8">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Shield size={18} className="text-emerald-400" />
                            <span>4. Conta do Usuário e Autenticação</span>
                        </h2>
                        <p className="mt-3">
                            Para acessar as funcionalidades de persistência do fichário, é necessária a autenticação por meio do <strong className="text-white">Google OAuth</strong>.
                        </p>
                        <ul className="mt-3 list-disc list-inside space-y-1.5 text-slate-300">
                            <li>O usuário é o único responsável pela guarda e segurança de suas credenciais da conta Google.</li>
                            <li>Cada conta de usuário possui acesso isolado ao seu próprio acervo através de regras de segurança no banco de dados.</li>
                            <li>O usuário compromete-se a notificar prontamente caso suspeite de qualquer uso não autorizado de sua conta.</li>
                        </ul>
                    </section>

                    <section className="rounded-3xl border border-white/10 bg-[#0c101a] p-6 sm:p-8">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-poke-blue" />
                            <span>5. Uso Aceitável da Plataforma</span>
                        </h2>
                        <p className="mt-3">Ao utilizar o MyPokeBinder, você concorda em não:</p>
                        <ul className="mt-3 list-disc list-inside space-y-1.5 text-slate-300">
                            <li>Tentar violar a segurança, autenticação ou integridade das APIs do serviço.</li>
                            <li>Executar ataques de negação de serviço (DoS/DDoS) ou realizar requisições automáticas massivas (scraping abusivo).</li>
                            <li>Engajar-se em engenharia reversa para explorar vulnerabilidades ou contornar restrições da plataforma.</li>
                            <li>Utilizar o serviço para qualquer finalidade ilegal ou contrária à ordem pública.</li>
                        </ul>
                    </section>

                    <section className="rounded-3xl border border-white/10 bg-[#0c101a] p-6 sm:p-8">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Scale size={18} className="text-slate-400" />
                            <span>6. Disponibilidade e Isenção de Garantias</span>
                        </h2>
                        <p className="mt-3">
                            O serviço é fornecido <strong className="text-white">&quot;como está&quot; (as is)</strong> e <strong className="text-white">&quot;conforme disponível&quot; (as available)</strong>, sem garantias de disponibilidade ininterrupta, ausência de falhas ou permanência indefinida.
                        </p>
                        <p className="mt-3">Reservamo-nos o direito de aprimorar, suspender ou descontinuar recursos do serviço a qualquer momento para fins de manutenção técnica, atualização do catálogo ou cumprimento de diretrizes legais.</p>
                    </section>

                    <section className="rounded-3xl border border-white/10 bg-[#0c101a] p-6 sm:p-8">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <span>7. Modificações nestes Termos</span>
                        </h2>
                        <p className="mt-3">Estes Termos de Serviço podem ser revisados periodicamente. Quaisquer alterações substanciais serão refletidas nesta página com a atualização da data no cabeçalho. A continuidade do uso da aplicação após a publicação de novos termos implicará sua aceitação.</p>
                    </section>

                    <section className="rounded-3xl border border-white/10 bg-[#0c101a] p-6 sm:p-8">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Mail size={18} className="text-poke-blue" />
                            <span>8. Legislação Aplicável e Contato</span>
                        </h2>
                        <p className="mt-3">Estes termos são regidos pelas leis da República Federativa do Brasil, em particular o Marco Civil da Internet (Lei nº 12.965/2014) e a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).</p>
                        <p className="mt-3">Em caso de dúvidas ou questões sobre estes Termos de Serviço, entre em contato pelo e-mail:</p>
                        <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-mono text-poke-blue">
                            <Mail size={16} />
                            <span>paulorosadodev@gmail.com</span>
                        </div>
                    </section>
                </div>
            </main>

            <PublicFooter />
        </div>
    );
}
