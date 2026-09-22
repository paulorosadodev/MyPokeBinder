# 0027. Páginas Institucionais do Google Cloud OAuth (Página Inicial, Privacidade e Termos)

Data: 2026-09-21

## Status

Aceito

## Contexto

Para publicação e verificação da tela de consentimento do aplicativo no Google Cloud OAuth, o Google exige obrigatoriamente a disponibilização pública de três URLs no domínio autorizado da aplicação:
1. **Página inicial do aplicativo**: deve apresentar a aplicação, explicar seu funcionamento e finalidade, e ser acessível sem exigir login prévio.
2. **Link da Política de Privacidade**: deve detalhar com transparência o escopo dos dados pessoais acessados, a finalidade estrita de uso e conformidade com a *Google API Services User Data Policy* (requisitos de *Limited Use*) e LGPD.
3. **Link dos Termos de Serviço**: deve estabelecer as condições de uso, isenção de afiliação com marcas registradas de terceiros (Pokémon / Nintendo / The Pokémon Company) e consulta de catálogo via API pública TCGdex sob uso justo (*fair use*).

Anteriormente, o middleware de sessão redirecionava qualquer acesso à raiz (`/`) de usuários não autenticados diretamente para a tela de login (`/login`), o que impedia avaliadores do Google e novos visitantes de visualizarem uma página inicial institucional.

## Decisão

1. **Roteamento Inteligente na Raiz (`/`) e Rota `/inicio`**:
   - A rota `/` foi liberada como rota pública no proxy middleware (`src/lib/supabase/proxy.ts`).
   - Usuários não autenticados que acessam `/` visualizam uma **Landing Page temática** de alto padrão visual, apresentando a vitrine do fichário 3×3, os 151 slots da Pokédex de Kanto, as 6 principais funcionalidades práticas, o fluxo em 3 passos e a explicação do login Google.
   - Usuários autenticados que acessam `/` continuam sendo apresentados imediatamente ao seu **Binder 3×3** em tempo real (`BinderClientPage`).
   - A rota `/inicio` foi criada para expor a Landing Page de forma direta sob demanda.

2. **Política de Privacidade (`/privacidade` e `/privacy`)**:
   - Criada página pública detalhando os escopos solicitados no Google OAuth (`openid`, `email`, `profile`).
   - Declaração explícita de conformidade com os requisitos de Uso Limitado (Limited Use) da Política de Dados de Usuários dos Serviços de API do Google: dados não são vendidos, não são usados para anúncios nem para treinamento de inteligência artificial.
   - Detalhamento do isolamento de dados por usuário via Row Level Security (RLS) no PostgreSQL e direitos do titular sob a LGPD.

3. **Termos de Serviço (`/termos` e `/terms`)**:
   - Criada página pública definindo o escopo de organizador pessoal de cartas físicas de Pokémon TCG.
   - Declaração de marcas registradas e isenção expressa de afiliação ou patrocínio de Nintendo, Creatures Inc., Game Freak e The Pokémon Company (projeto de fã sem fins comerciais).
   - Uso de dados e ilustrações da API pública TCGdex sob doutrina de *fair use*.

4. **Componentes e Integrações no Layout**:
   - Desenvolvidos `PublicHeader` e `PublicFooter` com identidade visual padronizada (Pokébola em SVG com glow, links institucionais e aviso legal de marcas registradas).
   - Adicionados links para os termos e privacidade no rodapé da página de login (`/login`) e nas configurações (`/configuracoes`).

## Consequências

- A aplicação atende a 100% das diretrizes do Google Cloud OAuth para submissão e aprovação da tela de consentimento.
- A experiência de novos visitantes se torna imersiva e convidativa, apresentando o valor do produto antes da barreira de autenticação.
- A segurança das rotas privadas permanece preservada (`/collection`, `/dashboard`, `/cards/[id]`, `/configuracoes`, `/perfil`).
