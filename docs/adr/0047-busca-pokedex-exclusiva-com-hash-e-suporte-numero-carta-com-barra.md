# 47. Busca de Pokédex Exclusiva com Hash (#) e Suporte a Número de Carta com Barra (/)

## Contexto

Anteriormente, o comportamento de busca por número apresentava inconsistências entre as diferentes interfaces da aplicação:
1. Na Coleção (`/collection`), no perfil público e no modal de alocação de cartas do fichário (`filterAndSortCollectionGroups`), digitar um número qualquer (ex.: `25` ou `151`) realizava a filtragem pelo número da Pokédex (`pokemon_dex_id`), sem permitir encontrar cartas pelo número da coleção/set.
2. No modal de adição do catálogo TCGDex (`CardSearchModal` via `filterCatalogCards`), digitar com barra (ex.: `025/165` ou `25/165`) não retornava resultados porque a API TCGDex armazena apenas o número isolado (`localId`, ex.: `"25"` ou `"025"`) e a comparação de texto falhava ao procurar a barra.
3. No campo de busca do fichário (`BinderControls`), digitar um número sem hash também disparava busca por número da Pokédex.

Fazia-se necessária uma regra de negócio clara, uniforme e previsível em todas as pesquisas do sistema.

## Decisão

1. **Busca por Número da Pokédex Exclusiva e Exata com `#`**:
   - A correspondência por número da Pokédex (1 a 151) ocorre **estritamente se o usuário incluir o caractere `#` na frente do termo** (ex.: `#3`, `#03` ou `#32`).
   - A correspondência é **exata**: `#3` ou `#03` localiza exclusivamente o Pokémon #3 (Venusaur), eliminando correspondências parciais por prefixo (como #30, #31, #32).
   - Se o usuário digitar um número sem `#` (ex.: `32` ou `25`), o sistema **não** busca pelo ID da Pokédex.

2. **Busca Exata por Número da Carta no Set/Coleção por Padrão com Suporte a `/`**:
   - Se um número for digitado sem `#`, a busca é direcionada ao **número da carta no set** (`localId` ou segmento extraído de `tcgdex_card_id`).
   - A comparação é **exata**: digitar `8/45` ou `8` localiza estritamente as cartas de número 8 (ou `08`, `008`), rejeitando qualquer correspondência por substring (como cartas `18`, `28`, `58`, `80` ou `88`).
   - Fornece suporte ao formato com barra `/` (ex.: `025/165`, `25/165`, `32/64`), exigindo que o denominador após a barra seja uma numeração válida de set (ex.: dígitos com sufixo opcional). Formatos inválidos como `8/dfhdfhd` ou barras soltas são rejeitados e não trazem resultados espúrios.

3. **Interface Limpa e Sem Poluição Visual**:
   - Os campos de busca preservam visual minimalista, sem legendas ou dicas textuais intrusivas abaixo dos inputs, mantendo a experiência focada e direta.

4. **Padronização nas Buscas**:
   - As funções utilitárias `matchesCardSearch`, `matchesCardNumber`, `parseDexQuery` e `extractCardLocalId` foram centralizadas em `src/lib/collection/listCards.ts` e aplicadas na página de Coleção (`/collection`), no Perfil Público (`PublicCollectionView`), no seletor de cards do fichário (`BinderSlotSelectModal`), na vitrine de favoritos do perfil (`TrainerProfileView`), no controle do Binder (`BinderControls`) e no catálogo TCGDex (`CardSearchModal`).

## Consequências

- Precisão absoluta: colecionadores localizam exatamente a carta desejada sem ruídos de substring em números.
- Validação estrita de frações: termos com barra malformados (ex.: `8/dfhdfhd`) não correspondem indevidamente.
- Busca por Pokédex limpa e focada: `#3` ou `#03` exibe apenas o 3º Pokémon da Pokédex.
- Interface limpa e minimalista sem poluição visual.
