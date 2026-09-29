# 02: Catálogo Expandido e Adição Direta de Cartas na Coleção

**What to build:** O usuário pode pesquisar e adicionar qualquer carta oficial do Pokémon TCG físico (Pokémon de 1 a 1025, cartas de Treinador e de Energia) diretamente na página da Coleção (`/collection`), sem precisar passar pelo modal intermediário de seleção dos 151 Pokémon. A busca no catálogo aceita nomes de cartas, números de Pokédex com `#` (#001 a #1025) e números de carta com `/`, descartando cartas exclusivas do jogo digital TCG Pocket.

**Blocked by:** 01: Migração de Banco de Dados, Schema de Binders e Preservação Legada

**Status:** ready-for-agent

- [ ] O dataset estático centralizado e utilitários de Pokédex suportam todos os 1.025 Pokémon oficiais com seus nomes, números e tipos elementais, consumindo os sprites locais existentes em `public/pokemon/gen1..9/`.
- [ ] A rota `GET /api/search` é atualizada para aceitar buscas por texto geral de cartas sem exigir Pokémon prévio, mapeando corretamente `dexId` quando for Pokémon ou `null` quando for Treinador/Energia.
- [ ] A rota `POST /api/cards` aceita a inserção de cartas com `pokemon_dex_id` numérico (1 a 1025) ou `null` (para Treinadores e Energias), validando os campos obrigatórios e bloqueando cartas de TCG Pocket.
- [ ] O modal intermediário de escolha de Pokémon na Coleção (`/collection`) é removido, e o clique em "+ Adicionar Carta" abre diretamente o modal do catálogo (`CardSearchModal`) com busca geral em estado limpo.
- [ ] Cartas de Treinadores e Energias podem ser adicionadas e persistidas na coleção do usuário com seus metadados físicos de idioma, versão física e condição de conservação.
