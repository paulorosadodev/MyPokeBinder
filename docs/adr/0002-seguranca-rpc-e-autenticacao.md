# 0002 - Segurança de RPC e Proteção de Rotas

## Contexto

O projeto utiliza Supabase com Row Level Security (RLS) para isolamento multi-inquilino de cartas e Next.js com `@supabase/ssr` para autenticação baseada em cookies e proxy reverso.

Durante a auditoria de segurança, identificamos que:

1. Funções no PostgreSQL recebiam privilégios `EXECUTE` para `PUBLIC` por padrão, expondo rotas RPC no PostgREST para a role `anon`.
2. A RPC `set_card_in_binder` recebia `p_user_id` e `p_pokemon_dex_id` passados pelo cliente, introduzindo riscos de BOLA/IDOR e possíveis inconsistências de estado caso os parâmetros divergissem da carta real.
3. O middleware de sessão redirecionava requisições desautenticadas para endpoints de API (`/api/*`) com HTTP 307 para a tela de login (`/login`), quebrando clientes de API e gerando respostas HTML para requisições que aguardavam JSON.
4. Respostas SSR de autenticação não continham o cabeçalho `Cache-Control: private, no-store`, abrindo margem para vazamento de cookies de sessão em CDNs e proxies reversos.

## Decisão

1. **Endurecimento de Privilégios no Banco**:
    - Revogação de privilégios de execução de `PUBLIC` e `anon` para todas as funções públicas.
    - Refatoração da função `set_card_in_binder` para aceitar unicamente `p_card_id UUID`. O `user_id` é obrigatoriamente derivado de `(SELECT auth.uid())` e o `pokemon_dex_id` é consultado diretamente do registro existente pertencente ao usuário.
    - Concessão de execução restrita à role `authenticated`.
2. **Proteção de Rotas no Middleware**:
    - Se uma requisição desautenticada atingir rotas sob o prefixo `/api/*`, o middleware responde imediatamente com status `401 Unauthorized` e payload JSON `{ error: "Unauthorized" }`.
    - Clonagem segura de cookies no redirecionamento preservando atributos de segurança (`httpOnly`, `secure`, `sameSite`, `maxAge`, `path`).
    - Adição do cabeçalho `Cache-Control: private, no-store` para impedir que CDNs armazenem em cache respostas contendo cookies de autenticação (`Set-Cookie`).
3. **Isolamento de Testes**:
    - Remoção de verificação de URLs locais para bypass de autenticação via header em código de produção, restringindo mocks estritamente ao ambiente `NODE_ENV === "test"`.

## Consequências

- A base de dados e a API PostgREST tornam-se imunes a tentativas de manipulação de parâmetros de identificação de usuário ou inconsistências entre o Pokémon indicado e a carta real.
- As rotas de API respeitam integralmente os padrões REST com respostas `401 JSON`.
- A aplicação é protegida contra vazamento de credenciais em caches intermediários (Vercel Edge, Cloudflare, CloudFront).
