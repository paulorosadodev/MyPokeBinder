# 0045. Tratamento Seguro de Parâmetros de Rota e Resiliência contra Sequências Malformadas

## Contexto
Ao acessar rotas dinâmicas como `/perfil/%25` ou consultar as APIs `/api/profile/%25` e `/api/profile/%25/collection`, o framework Next.js decodifica o caractere de escape `%25` para `%`. Ao executar `decodeURIComponent` de forma crua sobre strings que contenham `%` sem dois caracteres hexadecimais subsequentes ou com sequências de escape incompletas/inválidas, o motor JavaScript lança a exceção nativa `URIError: URI malformed`.
Sem interceptação e tratamento controlado, esse erro escalava como exceção não tratada no runtime do Next.js (tanto em Server Components quanto em Route Handlers), respondendo HTTP 500 com a mensagem genérica de falha do sistema e impedindo que o frontend exibisse o estado adequado de recurso não encontrado.

## Decisão
1. **Utilitário Resiliente `safeDecodeParam`**: Centralizado em `src/lib/profile/username.ts`, realiza a decodificação com bloco `try...catch`, retornando `null` em caso de erro `URIError` ou strings vazias/inválidas.
2. **Validação Sintática Precoce `isValidProfileParam`**: Assegura que apenas strings compatíveis com UUID (`UUID_REGEX`) ou formato válido de username (`USERNAME_REGEX`, aceitando opcionalmente o prefixo `@`) sejam repassadas para queries no Supabase.
3. **Respostas HTTP Semânticas e Controladas**:
   - Parâmetros vazios recebem HTTP 400 (`{ error: "Perfil inválido" }`).
   - Parâmetros com decodificação inválida, malformados ou que não atendam à sintaxe de perfil recebem HTTP 404 (`{ error: "Perfil não encontrado" }`), sem nunca propagar HTTP 500.
4. **Resiliência nas Páginas Server-Side**: As páginas `/perfil/[username]` e `/colecao/[username]` utilizam `safeDecodeParam`, garantindo que parâmetros corrompidos não quebrem o componente servidor e alcancem o componente cliente (`TrainerProfileView` e `PublicCollectionView`), que consulta a API e exibe o componente `TrainerNotFound` (com Abra ou Snorlax).
5. **Criação de Regra de Desenvolvimento**: Adicionada a regra `.agents/rules/safe-route-params.md` (e registrada em `.agents/rules/global.md`) proibindo expressamente o uso de `decodeURIComponent` desprotegido em rotas e parâmetros, instruindo o tratamento semântico via HTTP 400 ou 404.

## Consequências
- **Positivas**:
  - Eliminação de falhas 500 para URLs com caracteres especiais ou percent encoding malformado.
  - Distinção clara e controlada entre links inválidos/inexistentes e indisponibilidade real de serviço.
  - Redução de requisições inúteis ao banco de dados Supabase para formatos de username manifestamente inválidos.
  - Alinhamento de comportamento com a suite de testes automatizados (`bun test`).
