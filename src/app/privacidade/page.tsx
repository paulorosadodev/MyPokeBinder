import type { Metadata } from "next";
import NextLink from "next/link";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { ShieldCheck, Lock, KeyRound, Database, Trash2, EyeOff, CheckCircle2, Mail, ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
    title: "Política de Privacidade | MyPokeBinder",
    description: "Conheça a Política de Privacidade do MyPokeBinder. Transparência total sobre escopo de dados do Google OAuth, armazenamento seguro e direitos do usuário.",
};

export default function PrivacidadePage() {
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
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                            <ShieldCheck size={26} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-white sm:text-4xl">Política de Privacidade</h1>
                            <p className="mt-1 text-xs text-slate-400">Última atualização: 21 de setembro de 2026 • Em conformidade com a LGPD e Google API User Data Policy</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-10 text-sm leading-relaxed text-slate-300">
                    <section className="rounded-3xl border border-white/10 bg-[#0c101a] p-6 sm:p-8">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <span>1. Introdução e Visão Geral</span>
                        </h2>
                        <p className="mt-3">
                            A presente Política de Privacidade tem por objetivo fornecer total transparência a você (&quot;Usuário&quot; ou &quot;Colecionador&quot;) a respeito de quais dados são coletados, como são utilizados, armazenados e protegidos ao utilizar a aplicação web <strong className="text-white">MyPokeBinder</strong>.
                        </p>
                        <p className="mt-3">O MyPokeBinder é uma aplicação web criada para fins de organização pessoal de coleções de cartas físicas de Pokémon Trading Card Game (TCG). Nosso compromisso é respeitar a privacidade dos usuários e tratar apenas o volume mínimo de dados estritamente necessário para o funcionamento dos recursos de sincronização e gerenciamento do fichário.</p>
                    </section>

                    <section id="google-scope" className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-[#0c101a] p-6 sm:p-8">
                        <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                            <KeyRound size={16} />
                            <span>Escopo de Dados do Google OAuth</span>
                        </div>
                        <h2 className="mt-2 text-xl font-extrabold text-white">2. Autenticação e Dados Recebidos do Google</h2>
                        <p className="mt-3">
                            Para simplificar o cadastro e evitar a necessidade de criar senhas adicionais, o MyPokeBinder utiliza exclusivamente a autenticação federada via <strong className="text-white">Google OAuth 2.0</strong>.
                        </p>

                        <div className="mt-6 space-y-4">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-emerald-400" />
                                    Escopos do Google Solicitados
                                </h3>
                                <ul className="mt-2 list-disc list-inside space-y-1 text-xs text-slate-300">
                                    <li>
                                        <code className="text-emerald-300">openid</code>: Identificador único de autenticação para associar sua conta.
                                    </li>
                                    <li>
                                        <code className="text-emerald-300">email</code>: Seu endereço de e-mail primário fornecido pelo Google.
                                    </li>
                                    <li>
                                        <code className="text-emerald-300">profile</code>: Seu nome público e URL da foto de perfil da sua conta Google.
                                    </li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                    <EyeOff size={16} className="text-amber-400" />O que NÃO solicitamos e NUNCA acessamos
                                </h3>
                                <p className="mt-1.5 text-xs text-slate-400">O MyPokeBinder NÃO solicita, não tem acesso e não armazena sua senha do Google, contatos pessoais, e-mails do Gmail, arquivos do Google Drive, histórico de navegação ou dados de pagamento.</p>
                            </div>
                        </div>

                        <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                            <h3 className="text-sm font-bold text-emerald-300">Conformidade com os Requisitos de Uso Limitado (Limited Use) do Google</h3>
                            <p className="mt-2 text-xs leading-relaxed text-emerald-100/90">
                                O uso pelo MyPokeBinder de informações recebidas das APIs do Google está em estrita conformidade com a{" "}
                                <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer" className="underline font-semibold hover:text-white">
                                    Google API Services User Data Policy
                                </a>
                                , incluindo seus requisitos de Uso Limitado (Limited Use). Os dados obtidos não são transferidos a terceiros nem utilizados para veiculação de anúncios, telemarketing, análise comportamental ou para treinar modelos de inteligência artificial.
                            </p>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-white/10 bg-[#0c101a] p-6 sm:p-8">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Database size={18} className="text-poke-blue" />
                            <span>3. Dados Gerados na Aplicação</span>
                        </h2>
                        <p className="mt-3">Ao interagir com o MyPokeBinder, são armazenadas exclusivamente as informações relacionadas à sua experiência com o fichário de cartas:</p>
                        <ul className="mt-3 list-disc list-inside space-y-1.5 text-slate-300">
                            <li>
                                <strong>Cartas Cadastradas na Coleção</strong>: Identificador da carta na API pública TCGdex, número da Pokédex (1 a 151), nome do Pokémon, URL da ilustração da carta, idioma físico selecionado (PT-BR, EN, JA) e quantidade de exemplares possuídos.
                            </li>
                            <li>
                                <strong>Vínculo no Binder</strong>: Marcação de qual carta está ativa em cada um dos 151 slots fixos do fichário.
                            </li>
                            <li>
                                <strong>Preferências de Configuração</strong>: Preferência de cor do tema visual da interface e ativação/desativação de efeitos sonoros procedurais.
                            </li>
                        </ul>
                    </section>

                    <section className="rounded-3xl border border-white/10 bg-[#0c101a] p-6 sm:p-8">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Lock size={18} className="text-amber-400" />
                            <span>4. Armazenamento e Segurança da Informação</span>
                        </h2>
                        <p className="mt-3">A segurança dos seus dados é prioridade fundamental. Adotamos as seguintes medidas de proteção técnica e organizacional:</p>
                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <h3 className="text-sm font-bold text-white">Row Level Security (RLS)</h3>
                                <p className="mt-1 text-xs text-slate-400">Utilizamos banco de dados PostgreSQL com políticas atômicas de RLS. Nenhum usuário tem acesso às cartas ou configurações de outro usuário.</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                <h3 className="text-sm font-bold text-white">Criptografia em Trânsito</h3>
                                <p className="mt-1 text-xs text-slate-400">Todo o tráfego entre seu navegador e nossos servidores é criptografado utilizando protocolos modernos HTTPS e TLS.</p>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-3xl border border-white/10 bg-[#0c101a] p-6 sm:p-8">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <span>5. Cookies e Armazenamento Local</span>
                        </h2>
                        <p className="mt-3">O MyPokeBinder utiliza apenas os seguintes mecanismos no navegador do usuário:</p>
                        <ul className="mt-3 list-disc list-inside space-y-1.5 text-slate-300">
                            <li>
                                <strong>Cookies de Sessão</strong>: Cookies estritamente necessários gerados pelo provedor de autenticação (Supabase Auth) para manter sua sessão conectada com segurança e prevenir ataques CSRF.
                            </li>
                            <li>
                                <strong>LocalStorage</strong>: Utilizado localmente para armazenar sua preferência de cor de tema, garantindo que a página abra na sua cor favorita sem piscar.
                            </li>
                        </ul>
                        <p className="mt-3 text-xs text-slate-400">Não utilizamos cookies de terceiros para fins de publicidade, remarketing ou rastreamento entre sites.</p>
                    </section>

                    <section className="rounded-3xl border border-white/10 bg-[#0c101a] p-6 sm:p-8">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Trash2 size={18} className="text-rose-400" />
                            <span>6. Seus Direitos e Exclusão de Dados (LGPD)</span>
                        </h2>
                        <p className="mt-3">Em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei Federal nº 13.709/2018), você possui o direito a:</p>
                        <ul className="mt-3 list-disc list-inside space-y-1.5 text-slate-300">
                            <li>Confirmar a existência do tratamento de dados pessoais e acessar suas informações a qualquer momento.</li>
                            <li>Excluir cartas individuais ou desvincular itens diretamente pela interface de gerenciamento da Coleção.</li>
                            <li>
                                Revogar as permissões concedidas ao MyPokeBinder a qualquer instante através da sua página de{" "}
                                <a href="https://myaccount.google.com/permissions" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-poke-blue underline hover:text-white">
                                    <span>Segurança da Conta Google</span>
                                    <ExternalLink size={12} />
                                </a>
                                .
                            </li>
                            <li>Solicitar a exclusão definitiva e irreversível da sua conta e de todos os registros de cartas armazenados no banco de dados.</li>
                        </ul>
                    </section>

                    <section className="rounded-3xl border border-white/10 bg-[#0c101a] p-6 sm:p-8">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <Mail size={18} className="text-poke-blue" />
                            <span>7. Canal de Contato e Dúvidas de Privacidade</span>
                        </h2>
                        <p className="mt-3">Se você tiver dúvidas, solicitações de esclarecimento ou desejar exercer seus direitos de exclusão ou alteração de dados previstos pela LGPD, entre em contato diretamente com o responsável pelo projeto através do e-mail:</p>
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
