# 59. Arquitetura de Múltiplos Binders, Tipos de Slot e Catálogo TCG Expandido

## Status

Aceito

## Contexto

Originalmente, o MyPokeBinder foi projetado como um rastreador dedicado exclusivamente aos 151 Pokémon da 1ª Geração, operando com um único binder fixo (3×3 com 17 páginas), um Dashboard estático mapeado para a Pokédex #001 a #151, e validações no banco (`CHECK (pokemon_dex_id >= 1 AND pokemon_dex_id <= 151)`) que barravam qualquer carta de gerações posteriores ou cartas sem Pokémon associado (Treinadores e Energias).

Com o crescimento das coleções, surgiu a necessidade de:
1. Permitir que o treinador organize múltiplos binders simultâneos (ex.: um para cada geração, mastersets de coleções específicas, binder temático de Pokémon favoritos ou binders de trocas).
2. Oferecer flexibilidade de formatos físicos (grids 1×1, 2×2, 3×3 e 3×4 com número de páginas personalizável).
3. Permitir 3 tipos distintos de slots: livre, de Pokémon específico e de carta específica.
4. Expandir o catálogo para todo o Pokémon TCG físico oficial (Pokémon 1 a 1025, Treinadores e Energias), removendo a etapa de seleção prévia de Pokémon na adição de cartas pela Coleção.
5. Substituir a antiga página estática de Dashboard por métricas e estatísticas dinâmicas atreladas diretamente a cada binder.

## Decisão

1. **Posse Física Estrita (1 Cópia = no máximo 1 Slot Ativo)**:
   - Preservando a autenticidade da simulação de uma coleção física real, cada exemplar físico registrado (`user_cards`) só pode estar alocado em um único slot de um único binder por vez.
   - Para alocar uma mesma carta em dois binders distintos, o colecionador deve possuir cópias físicas adicionais no seu inventário.
   - A tabela `binder_slots` impõe `UNIQUE (user_card_id) WHERE user_card_id IS NOT NULL`.

2. **Novas Entidades de Banco de Dados (`binders` e `binder_slots`)**:
   - Criada a tabela `public.binders` com campos `id`, `user_id`, `name`, `description`, `grid_type` (`1x1`, `2x2`, `3x3`, `3x4`), `total_pages`, `cover_theme`, `is_public` e `is_featured`.
   - Criada a tabela `public.binder_slots` com `binder_id`, `page_number`, `slot_index`, `slot_type` (`free`, `pokemon`, `card`), `target_dex_id`, `target_tcgdex_id`, `target_card_name`, `target_card_image_url` e `user_card_id`.
   - Mantida a integridade com `user_cards.is_in_binder` via trigger automática no banco, garantindo consultas de alta performance na Coleção (`get_user_collection_groups`).
   - Alterada a restrição de `user_cards.pokemon_dex_id` para aceitar valores nulos (Treinadores e Energias) e números até 1025:
     `CHECK (pokemon_dex_id IS NULL OR (pokemon_dex_id >= 1 AND pokemon_dex_id <= 1025))`.

3. **Migração Transparente e Preservação de Dados Legados**:
   - Todos os usuários com cartas vinculadas ao binder antigo recebem automaticamente um binder inicial nomeado `"Kanto 151 Original"` (formato 3×3, 17 páginas, com slots pré-configurados para a 1ª Geração), com suas respectivas cartas já alocadas aos mesmos slots.

4. **Três Comportamentos de Slot**:
   - **Slot Livre (`free`)**: Aceita qualquer exemplar da coleção. Quando vazio, exibe moldura sutil com contorno pontilhado limpo (sem mini Pokébola). O clique abre a coleção completa do usuário para escolha.
   - **Slot de Pokémon Específico (`pokemon`)**: Vinculado a um Pokémon (1 a 1025). Quando vazio, exibe a silhueta oficial escurecida. O clique abre a coleção filtrada pelas cartas daquele Pokémon.
   - **Slot de Carta Específica (`card`)**: Vinculado a um exemplar exato da TCGdex. Quando vazio, exibe a arte da carta desbotada/apagada no fundo. Ao clicar, caso o usuário não possua a carta, exibe o modal indicando a falta e oferecendo o botão para cadastrar no catálogo.

5. **Painel de Estatísticas e Métricas Dinâmicas**:
   - A rota `/dashboard` é descontinuada.
   - Cada binder possui seu próprio painel retrátil de **Estatísticas**, exibindo a taxa de metas preenchidas (quando houver slots de Pokémon ou Carta) e a taxa de ocupação total de slots, além do mapa visual de slots. Clicar em qualquer slot das estatísticas folheia o fichário diretamente para a página correspondente.

6. **Arquitetura de Navegação e Rotas**:
   - `/`: **Estante de Binders** (vitrine com cards dos binders, capas, formato e progresso).
   - `/binders/[id]`: **Visualizador do Binder** (experiência de folheamento 3D no desktop via StPageFlip e navegação tátil por página no mobile via `BinderMobile`).
   - `/binders/new`: **Assistente de Criação de Binders** (escolha de grid, páginas e composição por blocos ou templates).
   - `/binders/[id]/edit`: **Editor Estrutural do Binder** (adicionar/remover páginas com desalocação segura e resumo de impacto; reorganização de slots).
   - Header e BottomNav padronizados com as abas **[Meus Binders, Coleção]**.

7. **Perfil Público Híbrido (`/perfil/[username]`)**:
   - O treinador seleciona qual binder atua como principal (`is_featured`).
   - Visitantes veem as Estatísticas e progresso do binder em destaque no topo e uma vitrine com os demais binders públicos do usuário abaixo.

## Consequências

- Liberdade completa para os colecionadores organizarem coleções de qualquer escala e geração no Pokémon TCG.
- Preservação da física, imersão e estética original do binder agora escalável para múltiplos tamanhos de grid.
- Eliminação de acoplamentos legados com a contagem de 151 no banco de dados e nos componentes.
- Garantia de que nenhum usuário existente perderá seu progresso anterior.
