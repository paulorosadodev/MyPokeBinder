# 58. Filtro Universal de Artistas e Estado de Conservação da Carta Física

## Status

Aceito

## Contexto

Colecionadores de Pokémon TCG frequentemente organizam e buscam seus exemplares com base nos artistas/ilustradores responsáveis pelas ilustrações (ex.: Mitsuhiro Arita, Ken Sugimori, Kouki Saitou), além de necessitarem catalogar com precisão o estado físico de preservação de cada carta real na sua coleção.

Anteriormente:
1. O filtro de artistas estava ausente nas telas de filtragem e busca da aplicação.
2. A API TCGdex fornece o artista sob a propriedade `illustrator`, mas o valor não era persistido no banco de dados nem exposto nas consultas da coleção.
3. Não havia forma de registrar ou inspecionar o estado de conservação das cartas físicas do usuário.

## Decisão

1. **Persistência e Extração do Artista (`card_artist`)**:
   - Adicionada coluna `card_artist text NOT NULL DEFAULT ''` na tabela `user_cards` com índice dedicado `idx_user_cards_card_artist`.
   - A rota de catálogo e busca (`/api/search`) mapeia a propriedade `illustrator` da API TCGdex para `artist`.
   - Criada a RPC `get_user_collection_artists(p_user_id)` no PostgreSQL e o endpoint autenticado `GET /api/cards/artists` para carregar a lista de artistas distintos das cartas do usuário.
   - Criado o endpoint público `GET /api/profile/[username]/artists` para listar artistas na visualização pública da coleção de outro treinador.
   - Migração e backfill executados diretamente no Supabase preenchendo todos os registros existentes com dados reais do catálogo TCGdex.

2. **Filtro de Artistas em Todos os Pontos de Filtragem**:
   - **Busca no Catálogo (`CardSearchModal`)**: dropdown dinâmico com lista ordenada e desduplicada de ilustradores disponíveis no catálogo retornado, além de correspondência textual no campo de busca (`matchesCardSearch` e `filterCatalogCards`).
   - **Coleção Privada (`/collection`)**: seletor customizado com ícone `Palette`, opções distintas da coleção do usuário, sincronização com URL, SWR e persistência em `sessionStorage`.
   - **Coleção Pública (`PublicCollectionView`)**: seletor de artistas com as opções obtidas via endpoint público.
   - **Seletor de Carta do Binder (`BinderSlotSelectModal`)**: seletor integrado na grade balanceada de filtros com expansão responsiva.
   - **Seletor de Destaques do Perfil (`TrainerProfileView`)**: seletor de artista integrado na barra de filtros da vitrine de cartas favoritas.

3. **Estado de Conservação Físico (`card_condition`)**:
   - Adicionada coluna `card_condition text NOT NULL DEFAULT 'NM'` na tabela `user_cards` com restrição rígida de integridade:
     `CHECK (card_condition IN ('M', 'NM', 'SP', 'MP', 'HP', 'D'))`
   - Opções padronizadas do mercado de TCG:
     - `M`: Mint
     - `NM`: Near Mint (padrão de inserção)
     - `SP`: Slightly Played
     - `MP`: Moderately Played
     - `HP`: Heavily Played
     - `D`: Damaged
   - **Paridade Obrigatória**: Validação no backend via `POST /api/cards` e `PATCH /api/cards/[id]`, rejeitando valores fora da whitelist com status HTTP 400.
   - **Interface e Responsividade**:
     - No modal de adição (`CardSearchModal`): slider deslizante tátil no desktop e seletor compacto no mobile sob o grupo "Sua carta".
     - Na página de detalhes (`/cards/[id]`): slider deslizante interativo com atualização otimista instantânea e rollback em caso de falha.
     - Nos cards visuais da Coleção, coleção pública e modais: badge minimalista com código e degradê cromático sem repetição de cores (esmeralda para M, verde limão para NM, amarelo puro para SP, âmbar para MP, laranja para HP e rosa avermelhado para D), além de tooltip com rótulo completo e nome do ilustrador.

## Consequências

- Colecionadores podem catalogar e filtrar com fidelidade suas cartas físicas por ilustrador e estado de conservação.
- Todas as validações visuais estão 100% blindadas por constraints de banco de dados e verificações de rota.
- A responsividade mobile é preservada com controles adaptados para telas compactas sem comprometer a ergonomia.
