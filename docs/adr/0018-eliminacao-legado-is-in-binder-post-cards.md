# ADR 0018: Eliminação do Código Legado de `is_in_binder` em `POST /api/cards` e Consolidação da Invariante de Coleção

## Status

Aceito

## Contexto

Na arquitetura inicial da aplicação (anterior à ADR 0007), a rota `POST /api/cards` permitia que uma carta fosse inserida diretamente com status `is_in_binder = true`. Para acomodar isso, a rota executava um `UPDATE` prévio desmarcando a carta ativa anterior do mesmo Pokémon (`pokemon_dex_id`) seguido de um `INSERT` da nova carta em chamadas HTTP isoladas ao PostgREST do Supabase.

A análise de multitenancy e integridade transacional revelou que:

1. **Falta de Atomicidade Transacional:** As duas chamadas HTTP separadas (`UPDATE` e depois `INSERT`) não ocorriam dentro de uma mesma transação atômica no banco de dados. Em cenários de concorrência ou falha parcial de rede, havia risco de violar o índice parcial único `user_cards_user_pokemon_binder_idx (user_id, pokemon_dex_id) WHERE is_in_binder = true`, resultando em erro HTTP 500 ou inconsistência no slot.
2. **Código Morto / Legado:** Desde a consolidação da separação entre Coleção (inventário físico) e Fichário (vitrine de 151 slots) documentada na ADR 0007 e no `docs/CONTEXT.md`, o frontend não envia mais `is_in_binder = true` ao cadastrar cartas. Todas as cartas novas entram obrigatoriamente no inventário físico com `is_in_binder = false`, e a promoção para exibição no Fichário é uma ação posterior e explícita do usuário via `PATCH /api/cards/[id]` utilizando a RPC atômica `set_card_in_binder`.
3. **Props e Estados Obsoletos:** Componentes como `CardSearchModal` e a página principal `page.tsx` ainda mantinham referências e props residuais (`defaultIsInBinder`, `searchDefaultIsInBinder`) sem uso prático.

## Decisões

1. **Eliminação do `UPDATE` e da Lógica Não-Atômica em `POST /api/cards`:**
    - Removido o bloco `if (is_in_binder) { await supabase.from("user_cards").update(...) }`.
    - Removida a extração do parâmetro `is_in_binder` do payload JSON da requisição.
    - Definida a invariante estrita: todo `INSERT` realizado por `POST /api/cards` grava `is_in_binder: false`.

2. **Garantia de Atomicidade Restrita à RPC:**
    - A vinculação de qualquer carta ao Fichário permanece delegada exclusivamente à rota `PATCH /api/cards/[id]`, que invoca a função RPC `set_card_in_binder` do PostgreSQL, executada de forma atômica e segura com `auth.uid()`.

3. **Limpeza do Frontend:**
    - Removida a propriedade `defaultIsInBinder` de [CardSearchModal.tsx](file:///home/paulo_rosado/MyPokeBinder/src/components/modal/CardSearchModal.tsx).
    - Padronizados os textos descritivos do modal para "adicionar à sua coleção" e rótulo do botão para "Adicionar à Coleção".
    - Removido o estado `searchDefaultIsInBinder` em [page.tsx](file:///home/paulo_rosado/MyPokeBinder/src/app/page.tsx) e a prop `defaultIsInBinder={false}` em [collection/page.tsx](file:///home/paulo_rosado/MyPokeBinder/src/app/collection/page.tsx).

## Consequências

- **Positivas:**
    - Eliminação completa da brecha de concorrência e inconsistência transacional no `POST /api/cards`.
    - Redução de roundtrips HTTP redundantes com o banco de dados Supabase na criação de cartas.
    - Alinhamento pleno entre a API backend, as regras de negócio de inventário e o fluxo de interface do usuário.
    - Código do backend e do frontend simplificado e sem estados zumbis.
- **Negativas / Mitigações:**
    - Clientes da API não podem mais definir `is_in_binder: true` diretamente no payload de criação da carta; mitigado pelo fato de que o fluxo do produto exige passagem pelo inventário e promoção via `PATCH`.
