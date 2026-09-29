# 01: Migração de Banco de Dados, Schema de Binders e Preservação Legada

**What to build:** O banco de dados do Supabase passa a suportar múltiplos binders com diferentes formatos de grid, slots configuráveis com posse física estrita e cartas de qualquer geração de Pokémon (1 a 1025) bem como cartas de Treinadores e Energias (`pokemon_dex_id` opcional/nulo). Todos os usuários que já possuem cartas alocadas no formato anterior recebem automaticamente o binder "Kanto 151 Original" criado no sistema com suas respectivas cartas alocadas aos mesmos slots, preservando o progresso sem qualquer perda.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] A tabela `public.binders` é criada com colunas `id`, `user_id`, `name`, `description`, `grid_type` (1x1, 2x2, 3x3, 3x4), `total_pages`, `cover_theme`, `is_public`, `is_featured`, e políticas de RLS onde o dono tem controle total e visitantes podem ler binders públicos.
- [ ] A tabela `public.binder_slots` é criada com `binder_id`, `page_number`, `slot_index`, `slot_type` (free, pokemon, card), `target_dex_id`, `target_tcgdex_id`, `target_card_name`, `target_card_image_url`, e `user_card_id` com restrição única `UNIQUE(user_card_id)` garantindo posse física estrita.
- [ ] A restrição de `user_cards.pokemon_dex_id` é ajustada para aceitar valores nulos (Treinadores e Energias) e números até 1025: `CHECK (pokemon_dex_id IS NULL OR (pokemon_dex_id >= 1 AND pokemon_dex_id <= 1025))`.
- [ ] Uma trigger em `binder_slots` sincroniza automaticamente a coluna `user_cards.is_in_binder` sempre que uma carta é alocada ou liberada de um slot.
- [ ] A migração inclui script de backfill que cria o binder "Kanto 151 Original" (3x3, 17 páginas, slots 1..151 tipo Pokémon) para todos os usuários existentes com cartas no binder e associa suas cartas aos respectivos slots.
- [ ] A migração é executada com sucesso no Supabase via MCP e os índices e permissões são validados.
