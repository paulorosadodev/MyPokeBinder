# 0007. Separação entre Coleção e Fichário e Gestão de Cópias

Data: 2026-09-20

## Status

Aceito

## Contexto

Anteriormente, o sistema acoplava o Fichário (`/`) diretamente à listagem e adição de cartas da API TCGdex. Quando um usuário removia uma carta do Fichário, o registro permanecia na tabela `user_cards` com `is_in_binder = false`, mas o slot ficava vazio exibindo apenas a silhueta.

Ao clicar no slot vazio, a aplicação abria diretamente a busca externa da API em vez de listar as cartas que o usuário já possuía daquele Pokémon. Ao tentar adicionar novamente a mesma carta, o backend retornava erro HTTP 409 devido à constraint `UNIQUE (user_id, tcgdex_card_id)`. Além disso, não existia uma visualização global de inventário para gerenciar cartas guardadas, nem uma rota dedicada para edição detalhada de cada exemplar físico.

## Decisão

1. **Separação de Papéis**:
    - **Coleção (`/collection`)**: Atua como o inventário central de todas as cartas físicas que o colecionador possui. Disponibiliza busca por texto, filtros avançados (status no fichário, idioma, Full Art) e ordenações. Novas cartas adicionadas por esta rota são registradas como guardadas (`is_in_binder = false`).
    - **Fichário (`/`)**: Atua estritamente como álbum e vitrine dos 151 slots fixos. Um slot vazio abre um seletor com as cartas daquele Pokémon já presentes na Coleção do usuário (com opção amigável para buscar novos exemplares no catálogo). Um slot preenchido possui atalho rápido ("Trocar carta") para alternar o exemplar exibido e o clique no corpo da carta navega para a página dedicada de edição.

2. **Página Dedicada da Carta (`/cards/[id]`)**:
    - Criada rota própria substituindo o antigo drawer lateral.
    - Permite inspecionar a arte em alta resolução, alternar idioma da cópia física (`pt-br`, `en`, `ja`), marcar variante Full Art, vincular/remover do Fichário, controlar a quantidade de cópias idênticas e realizar a exclusão explícita com modal de confirmação.
    - Retorno inteligente/contextual para a tela de origem (Fichário ou Coleção).

3. **Suporte a Múltiplas Cópias e Regra de Agrupamento**:
    - A constraint `user_cards_user_card_unique` foi removida do banco de dados PostgreSQL via migração Supabase.
    - O índice parcial `user_cards_user_pokemon_binder_idx (user_id, pokemon_dex_id) WHERE is_in_binder = true` foi mantido para garantir integridade (máximo de 1 carta por Pokémon no Fichário).
    - Na Coleção, cartas só são agrupadas com badge de contador (ex: `x2`, `x3`) se forem **100% idênticas** em edição, idioma e Full Art. Exemplares com qualquer divergência de idioma ou variante são exibidos como itens distintos.
    - No controle de quantidade (+/-), o botão de decremento fica bloqueado em 1 exemplar, impedindo remoção acidental sem confirmação de exclusão.

## Consequências

- **Positivas**:
    - Eliminação total do erro de conflito 409 ao readicionar ou manusear cartas já cadastradas.
    - O usuário possui agora um inventário completo e navegável de suas cartas físicas, inclusive repetidas.
    - A troca de ilustrações no Fichário tornou-se instantânea através do seletor local de acervo.
    - Navegação fluida e URLs diretas para compartilhamento/inspeção de cartas individuais.
- **Negativas / Mitigações**:
    - Aumento na quantidade de linhas na tabela `user_cards` decorrente do suporte a duplicatas físicas; mitigado pela ausência de joins pesados e índices em `user_id` e `pokemon_dex_id`.
