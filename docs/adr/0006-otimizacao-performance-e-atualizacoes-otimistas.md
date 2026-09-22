# ADR 0006: Otimização de Performance, Atualizações Otimistas e Simplificação da Seleção de Cartas

## Status

Aceito

## Contexto

Identificou-se que as ações de gerenciamento de cartas no fichário e na gaveta de detalhes (`CardDetailDrawer`) — incluindo adicionar ao fichário, marcar/desmarcar variante Full Art, colocar/retirar do fichário e excluir carta — apresentavam lentidão perceptível (2 a 4 segundos por interação).

As causas principais foram mapeadas:

1. **Encadeamento sequencial de requisições de rede:** No frontend, as mutações aguardavam o término da chamada HTTP à API e, em seguida, realizavam chamadas subsequentes e bloqueantes de `await mutate()`, congelando a interface com estados de carregamento prolongados.
2. **Ausência de atualizações otimistas (Optimistic UI):** O usuário não recebia feedback imediato na tela ao clicar nas ações de Full Art, vincular ao fichário ou excluir carta, precisando esperar múltiplos roundtrips com o banco de dados Supabase.
3. **Roundtrips redundantes no backend:** Na rota `PATCH /api/cards/[id]`, realizava-se um `SELECT *` de verificação prévia desnecessário antes de atualizar, e na vinculação ao fichário executava-se tanto uma RPC quanto uma query de `update` duplicada. Na rota `POST /api/cards`, uma carta inserida com `is_in_binder = true` era criada como `false` para só então chamar uma RPC secundária.
4. **Fricção de múltiplos cliques no modal de busca:** Ao buscar uma carta, clicar no item apenas aplicava uma borda azul de destaque visual, exigindo um segundo clique no botão de ação para efetivar a adição.
5. **Falta de cursor pointer uniforme:** Por padrão de resets modernos do CSS e Tailwind v4, botões e controles interativos não exibiam o cursor de mãozinha (`cursor: pointer`).

## Decisões

1. **Atualizações Otimistas e Eliminação de Revalidações Prematuras no SWR:**
    - No `CardDetailDrawer`, todas as ações (`handleToggleFullArt`, `handleChangeLanguage`, `handleSetAsBinderCard`, `handleRemoveFromBinder`, `handleDeleteCard`) atualizam o cache do SWR (`useCollectionCards` e `useBinderCards`) de forma imediata (0ms).
    - Eliminadas as chamadas prematuras e concorrentes de `mutate()` sem argumentos que disparavam requisições `GET` em paralelo enquanto a requisição `PATCH`/`POST` ainda estava em trânsito no banco, o que causava a sobrescrita do estado otimista com dados antigos (efeito "some e volta").
    - Os caches locais são consolidados diretamente a partir do objeto retornado na resposta da API (`{ card: updatedCard }`) com `mutate(..., false)`, eliminando roundtrips redundantes de re-leitura e garantindo que o estado visual permaneça firme e consistente sem necessidade de refresh.
    - O `dedupingInterval` padrão do SWR foi ajustado para 2 segundos, evitando bloqueios artificiais em ações sucessivas do usuário.
    - Caso ocorra falha na requisição, o cache é revertido e uma mensagem de erro é apresentada ao usuário.

2. **Otimização das Rotas da API de Cartas:**
    - Em `PATCH /api/cards/[id]`, o `SELECT` prévio de checagem foi eliminado, realizando a atualização direta via Supabase com RLS e tratando eventual registro inexistente diretamente no resultado da operação.
    - Em `POST /api/cards`, quando a carta é destinada ao fichário (`is_in_binder: true`), o sistema desmarca previamente qualquer carta ativa daquele Pokémon e insere a nova já com `is_in_binder: true` atomicamente, dispensando chamadas encadeadas à RPC.

3. **Seleção Direta no Modal de Adição:**
    - No `CardSearchModal`, foi removido o estado intermediário de apenas destacar o card. Clicar em qualquer parte do card ou no botão de adicionar inicia imediatamente o processo de adição, com feedback de loading (`Loader2`) exclusivo no item acionado.

4. **Novo Componente Switch para Variante Full Art:**
    - O controle de Full Art no modal de busca foi refatorado de um checkbox nativo para um switch interativo estilizado com iluminação dourada/âmbar, ícone temático de `Sparkles` e transições suaves.

5. **Regras Globais de Cursor Pointer:**
    - No `globals.css`, foram adicionadas regras universais para `button`, `[role="button"]`, `input` de ação e seleção, garantindo `cursor: pointer` em todos os elementos clicáveis e `cursor: not-allowed` nos estados desabilitados.

## Consequências

- Todas as ações do fichário e gaveta de detalhes oferecem resposta visual instantânea (0ms de latência percebida).
- Eliminação de cliques redundantes na busca e adição de cartas.
- Interface mais intuitiva, polida e alinhada com as melhores práticas de ergonomia visual.
