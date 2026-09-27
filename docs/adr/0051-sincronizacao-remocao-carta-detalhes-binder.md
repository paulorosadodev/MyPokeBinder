# Sincronização e Invalidação de Cache ao Editar ou Remover Carta do Binder

Status: Aceito

## Contexto
Ao acessar um slot de Pokémon no Binder, abrir o seletor modal, clicar em "Editar" para ir à tela de detalhes da carta (`/cards/[id]`) e remover a carta do binder ou excluí-la, o retorno para a tela do Binder causava uma inconsistência visual: a carta ainda era exibida temporariamente no slot e no modal, desaparecendo repentinamente ("do nada") apenas após a conclusão de uma revalidação de rede em segundo plano do SWR.

Isso acontecia porque as ações disparadas na tela de detalhes da carta (`handleToggleBinder`, `handleDeleteAllCopies`, `handleRemoveDuplicateCopy`, etc.) atualizavam apenas o cache pontual da própria carta (`/api/cards/[id]`), sem invalidar ou atualizar otimisticamente as chaves globais do SWR consumidas pelo fichário e pela coleção (`/api/binder`, `/api/cards?pokemon_dex_id=...` e `/api/cards`). Adicionalmente, o estado de carta ativa no `BinderClientPage` e `BinderSlotSelectModal` não sincronizava caso a carta deixasse de existir no mapa de cartas ativas do fichário.

## Decisão
1. **Mutação Otimista e Global no Detalhe da Carta:** Ao alternar o status do binder (`handleToggleBinder`), excluir cópias (`handleDeleteAllCopies`, `handleRemoveDuplicateCopy`), adicionar exemplares ou alterar metadados físicos (idioma e acabamento) em `/cards/[id]`, o SWR executa mutações otimistas imediatas em `/api/binder`, `/api/cards?pokemon_dex_id=${targetDexId}` e `/api/cards`, seguido de revalidação de rede e `router.refresh()`.
2. **Sincronização de Estado no Fichário:** No `BinderClientPage`, a carta ativa selecionada do modal é sincronizada continuamente com `cardsMap.get(selectDexId)`. Caso a carta seja removida ou alterada, o estado de carta ativa é atualizado imediatamente para `undefined` ou para a nova carta correspondente.
3. **Resiliência do Modal de Seleção:** No `BinderSlotSelectModal`, se a carta selecionada não constar mais na lista de cartas da coleção (por ter sido excluída ou desvinculada), a seleção e o card de pré-visualização são limpos imediatamente, evitando a retenção de referências obsoletas ou re-seleções indevidas.
