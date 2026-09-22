import type { Metadata } from "next";
import { LegalCallout, LegalDocument, LegalSection } from "@/components/layout/LegalDocument";

export const metadata: Metadata = {
    title: "Termos de Serviço | MyPokeBinder",
    description: "Termos de Serviço do MyPokeBinder. Regras de utilização, aviso de propriedade intelectual e responsabilidades do usuário.",
};

export default function TermosPage() {
    return (
        <LegalDocument title="Termos de Serviço" updatedAt="Última atualização: 21 de setembro de 2026">
            <LegalSection title="1. Aceitação dos Termos">
                <p>
                    Ao acessar ou utilizar a aplicação <strong className="text-white">MyPokeBinder</strong> (&quot;Serviço&quot;, &quot;Aplicação&quot; ou &quot;Plataforma&quot;), você declara ter lido, compreendido e concordado integralmente com estes Termos de Serviço, bem como com a nossa Política de Privacidade.
                </p>
                <p>Caso não concorde com qualquer disposição destes termos, orientamos que interrompa imediatamente o uso da aplicação.</p>
            </LegalSection>

            <LegalSection title="2. Descrição e Finalidade do Serviço">
                <p>O MyPokeBinder é uma plataforma web criada como um organizador digital e fichário pessoal 3×3 voltado aos 151 Pokémon originais da região de Kanto. A aplicação permite que colecionadores de cartas físicas de Pokémon Trading Card Game (TCG):</p>
                <ul className="list-disc space-y-1.5 pl-5 text-slate-300">
                    <li>Pesquisem cartas físicas no catálogo público da API TCGdex.</li>
                    <li>Registrem os exemplares que possuem fisicamente em sua coleção, indicando idioma e quantidade.</li>
                    <li>Vinculem cartas aos 151 slots fixos do fichário digital no formato 3×3 com física realista de páginas.</li>
                    <li>Visualizem seu progresso de coleção e personalizem o tema da interface.</li>
                </ul>
            </LegalSection>

            <LegalSection id="propriedade-intelectual" title="3. Marcas Registradas e Doutrina de Fair Use">
                <LegalCallout title="Propriedade intelectual e isenção">
                    <p>
                        <strong className="text-white">Pokémon</strong>, Pokémon Trading Card Game, nomes de personagens, insígnias, ilustrações, cartas e quaisquer marcas e direitos autorais associados são marcas registradas e propriedade exclusiva de <strong className="text-white">Nintendo</strong>, <strong className="text-white">Creatures Inc.</strong> e <strong className="text-white">Game Freak / The Pokémon Company</strong>.
                    </p>
                    <p>
                        O MyPokeBinder é um projeto independente criado exclusivamente por fãs, sem fins lucrativos e sem cobrança de assinaturas ou venda de bens digitais. O MyPokeBinder <strong className="text-white">NÃO É</strong> patrocinado, endossado, afiliado ou de qualquer forma oficialmente associado a Nintendo, Creatures Inc., Game Freak ou The Pokémon Company.
                    </p>
                    <p className="text-xs text-slate-400">Todas as imagens e metadados de cartas são consultados a partir da API pública TCGdex e são exibidos para fins estritamente informativos, educacionais e de catálogo pessoal de colecionadores, sob os preceitos de uso justo (fair use).</p>
                </LegalCallout>
            </LegalSection>

            <LegalSection title="4. Conta do Usuário e Autenticação">
                <p>
                    Para acessar as funcionalidades de persistência do fichário, é necessária a autenticação por meio do <strong className="text-white">Google OAuth</strong>.
                </p>
                <ul className="list-disc space-y-1.5 pl-5 text-slate-300">
                    <li>O usuário é o único responsável pela guarda e segurança de suas credenciais da conta Google.</li>
                    <li>Cada conta de usuário possui acesso isolado à sua própria coleção através de regras de segurança no banco de dados.</li>
                    <li>O usuário compromete-se a notificar prontamente caso suspeite de qualquer uso não autorizado de sua conta.</li>
                </ul>
            </LegalSection>

            <LegalSection title="5. Uso Aceitável da Plataforma">
                <p>Ao utilizar o MyPokeBinder, você concorda em não:</p>
                <ul className="list-disc space-y-1.5 pl-5 text-slate-300">
                    <li>Tentar violar a segurança, autenticação ou integridade das APIs do serviço.</li>
                    <li>Executar ataques de negação de serviço (DoS/DDoS) ou realizar requisições automáticas massivas (scraping abusivo).</li>
                    <li>Engajar-se em engenharia reversa para explorar vulnerabilidades ou contornar restrições da plataforma.</li>
                    <li>Utilizar o serviço para qualquer finalidade ilegal ou contrária à ordem pública.</li>
                </ul>
            </LegalSection>

            <LegalSection title="6. Disponibilidade e Isenção de Garantias">
                <p>
                    O serviço é fornecido <strong className="text-white">&quot;como está&quot; (as is)</strong> e <strong className="text-white">&quot;conforme disponível&quot; (as available)</strong>, sem garantias de disponibilidade ininterrupta, ausência de falhas ou permanência indefinida.
                </p>
                <p>Reservamo-nos o direito de aprimorar, suspender ou descontinuar recursos do serviço a qualquer momento para fins de manutenção técnica, atualização do catálogo ou cumprimento de diretrizes legais.</p>
            </LegalSection>

            <LegalSection title="7. Modificações nestes Termos">
                <p>Estes Termos de Serviço podem ser revisados periodicamente. Quaisquer alterações substanciais serão refletidas nesta página com a atualização da data no cabeçalho. A continuidade do uso da aplicação após a publicação de novos termos implicará sua aceitação.</p>
            </LegalSection>

            <LegalSection title="8. Legislação Aplicável e Contato">
                <p>Estes termos são regidos pelas leis da República Federativa do Brasil, em particular o Marco Civil da Internet (Lei nº 12.965/2014) e a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).</p>
                <p>Em caso de dúvidas ou questões sobre estes Termos de Serviço, entre em contato pelo e-mail:</p>
                <p className="font-mono text-[#ef4444]">paulorosadodev@gmail.com</p>
            </LegalSection>
        </LegalDocument>
    );
}
