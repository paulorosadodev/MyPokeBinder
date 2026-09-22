import type { Metadata } from "next";
import { LegalCallout, LegalDocument, LegalSection } from "@/components/layout/LegalDocument";

export const metadata: Metadata = {
    title: "Política de Privacidade | MyPokeBinder",
    description: "Conheça a Política de Privacidade do MyPokeBinder. Transparência total sobre escopo de dados do Google OAuth, armazenamento seguro e direitos do usuário.",
};

export default function PrivacidadePage() {
    return (
        <LegalDocument title="Política de Privacidade" updatedAt="Última atualização: 21 de setembro de 2026">
            <LegalSection title="1. Introdução e Visão Geral">
                <p>
                    A presente Política de Privacidade tem por objetivo fornecer total transparência a você (&quot;Usuário&quot; ou &quot;Colecionador&quot;) a respeito de quais dados são coletados, como são utilizados, armazenados e protegidos ao utilizar a aplicação web <strong className="text-white">MyPokeBinder</strong>.
                </p>
                <p>O MyPokeBinder é uma aplicação web criada para fins de organização pessoal de coleções de cartas físicas de Pokémon Trading Card Game (TCG). Nosso compromisso é respeitar a privacidade dos usuários e tratar apenas o volume mínimo de dados estritamente necessário para o funcionamento dos recursos de sincronização e gerenciamento do fichário.</p>
            </LegalSection>

            <LegalSection id="google-scope" title="2. Autenticação e Dados Recebidos do Google">
                <p>
                    Para simplificar o cadastro e evitar a necessidade de criar senhas adicionais, o MyPokeBinder utiliza exclusivamente a autenticação federada via <strong className="text-white">Google OAuth 2.0</strong>.
                </p>
                <p className="font-medium text-white">Escopos do Google solicitados</p>
                <ul className="list-disc space-y-1.5 pl-5 text-slate-300">
                    <li>
                        <code className="text-[#ef4444]">openid</code>: Identificador único de autenticação para associar sua conta.
                    </li>
                    <li>
                        <code className="text-[#ef4444]">email</code>: Seu endereço de e-mail primário fornecido pelo Google.
                    </li>
                    <li>
                        <code className="text-[#ef4444]">profile</code>: Seu nome público e URL da foto de perfil da sua conta Google.
                    </li>
                </ul>
                <p>O MyPokeBinder NÃO solicita, não tem acesso e não armazena sua senha do Google, contatos pessoais, e-mails do Gmail, arquivos do Google Drive, histórico de navegação ou dados de pagamento.</p>
                <LegalCallout title="Conformidade com Uso Limitado (Limited Use) do Google">
                    <p>
                        O uso pelo MyPokeBinder de informações recebidas das APIs do Google está em estrita conformidade com a{" "}
                        <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer" className="font-semibold text-white underline hover:text-[#ef4444]">
                            Google API Services User Data Policy
                        </a>
                        , incluindo seus requisitos de Uso Limitado (Limited Use). Os dados obtidos não são transferidos a terceiros nem utilizados para veiculação de anúncios, telemarketing, análise comportamental ou para treinar modelos de inteligência artificial.
                    </p>
                </LegalCallout>
            </LegalSection>

            <LegalSection title="3. Dados Gerados na Aplicação">
                <p>Ao interagir com o MyPokeBinder, são armazenadas exclusivamente as informações relacionadas à sua experiência com o fichário de cartas:</p>
                <ul className="list-disc space-y-1.5 pl-5 text-slate-300">
                    <li>
                        <strong className="text-white">Cartas cadastradas na coleção</strong>: Identificador da carta na API pública TCGdex, número da Pokédex (1 a 151), nome do Pokémon, URL da ilustração da carta, idioma físico selecionado (PT-BR, EN, JA) e quantidade de exemplares possuídos.
                    </li>
                    <li>
                        <strong className="text-white">Vínculo no Binder</strong>: Marcação de qual carta está ativa em cada um dos 151 slots fixos do fichário.
                    </li>
                    <li>
                        <strong className="text-white">Preferências de configuração</strong>: Preferência de cor do tema visual da interface e ativação/desativação de efeitos sonoros procedurais.
                    </li>
                </ul>
            </LegalSection>

            <LegalSection title="4. Armazenamento e Segurança da Informação">
                <p>A segurança dos seus dados é prioridade. Adotamos as seguintes medidas de proteção técnica e organizacional:</p>
                <ul className="list-disc space-y-1.5 pl-5 text-slate-300">
                    <li>
                        <strong className="text-white">Row Level Security (RLS)</strong>: Banco de dados PostgreSQL com políticas atômicas de RLS. Nenhum usuário tem acesso às cartas ou configurações de outro usuário.
                    </li>
                    <li>
                        <strong className="text-white">Criptografia em trânsito</strong>: Todo o tráfego entre seu navegador e nossos servidores é criptografado utilizando protocolos modernos HTTPS e TLS.
                    </li>
                </ul>
            </LegalSection>

            <LegalSection title="5. Cookies e Armazenamento Local">
                <p>O MyPokeBinder utiliza apenas os seguintes mecanismos no navegador do usuário:</p>
                <ul className="list-disc space-y-1.5 pl-5 text-slate-300">
                    <li>
                        <strong className="text-white">Cookies de sessão</strong>: Cookies estritamente necessários gerados pelo provedor de autenticação (Supabase Auth) para manter sua sessão conectada com segurança e prevenir ataques CSRF.
                    </li>
                    <li>
                        <strong className="text-white">LocalStorage</strong>: Utilizado localmente para armazenar sua preferência de cor de tema, garantindo que a página abra na sua cor favorita sem piscar.
                    </li>
                </ul>
                <p className="text-xs text-slate-500">Não utilizamos cookies de terceiros para fins de publicidade, remarketing ou rastreamento entre sites.</p>
            </LegalSection>

            <LegalSection title="6. Seus Direitos e Exclusão de Dados (LGPD)">
                <p>Em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei Federal nº 13.709/2018), você possui o direito a:</p>
                <ul className="list-disc space-y-1.5 pl-5 text-slate-300">
                    <li>Confirmar a existência do tratamento de dados pessoais e acessar suas informações a qualquer momento.</li>
                    <li>Excluir cartas individuais ou desvincular itens diretamente pela interface de gerenciamento da Coleção.</li>
                    <li>
                        Revogar as permissões concedidas ao MyPokeBinder a qualquer instante através da sua página de{" "}
                        <a href="https://myaccount.google.com/permissions" target="_blank" rel="noreferrer" className="text-white underline hover:text-[#ef4444]">
                            Segurança da Conta Google
                        </a>
                        .
                    </li>
                    <li>Excluir definitivamente a sua conta e todos os registros associados (perfil, coleção e preferências) pela página de Configurações. A exclusão é irreversível e remove também a identidade de login vinculada ao Google neste aplicativo.</li>
                </ul>
            </LegalSection>

            <LegalSection title="7. Canal de Contato e Dúvidas de Privacidade">
                <p>Se você tiver dúvidas, solicitações de esclarecimento ou desejar exercer outros direitos previstos pela LGPD, entre em contato diretamente com o responsável pelo projeto através do e-mail:</p>
                <p className="font-mono text-[#ef4444]">paulorosadodev@gmail.com</p>
            </LegalSection>
        </LegalDocument>
    );
}
