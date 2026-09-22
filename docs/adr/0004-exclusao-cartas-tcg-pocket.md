# ADR 0004: Exclusão das Cartas do Pokémon TCG Pocket e Foco Exclusivo no TCG Físico

## Status

Aceito

## Contexto

O MyPokeBinder foi concebido para ser a representação digital de um fichário físico real 3×3 voltado aos 151 Pokémon originais.

Anteriormente (no ADR 0003), para contornar a discrepância na API TCGdex — onde o namespace `pt-br` continha apenas as coleções do Pokémon TCG Pocket e o namespace `pt` continha as 125 coleções físicas traduzidas no Brasil —, os dois catálogos foram combinados. Isso fez com que cartas puramente digitais do aplicativo móvel _Pokémon TCG Pocket_ (como as expansões `A1 - Dominação Genética`, `P-A - Promo-A`, etc.) passassem a ser exibidas na busca do fichário.

O Pokémon TCG Pocket é um jogo com regras e formatos simplificados exclusivos para smartphones (decks de 20 cartas, sem cartas de energia física, pontuação própria). Suas cartas não possuem existência física no mundo real. Além disso, no idioma inglês (`en`), o TCGdex também misturava 2.321 cartas digitais do Pocket junto às 21.415 cartas físicas.

Foi realizada uma análise técnica comprovando que filtrar o TCG Pocket traz **risco zero** de perder qualquer carta do TCG real:

- Todas as cartas físicas já lançadas pertencem a expansões físicas oficiais (`base`, `gym`, `neo`, `ex`, `dp`, `bw`, `xy`, `sm`, `swsh`, `sv`, etc.).
- O catálogo `pt` na TCGdex contém 13.907 cartas físicas e 0 cartas do Pocket.
- Mesmo quando o Pocket reaproveita ilustrações consagradas do TCG clássico, a carta física original existe em sua respectiva coleção física e continua plenamente disponível para busca e cadastro.

## Decisão

1. **Restrição Exclusiva a Cartas do TCG Físico:**
    - O sistema passa a proibir expressamente a busca, exibição e adição de cartas do Pokémon TCG Pocket.
    - Criada a função utilitária `isPocketCard` em `src/lib/pokemon/tcgdex.ts` que identifica cartas do Pocket via URL de asset contendo `/tcgp/` ou prefixos de identificador de conjuntos Pocket (`A1-`, `A2-`, `P-A-`, `B1-`, etc.).

2. **Consulta Direta ao Catálogo Físico em Português:**
    - Na rota `GET /api/search`, para o idioma `pt-br`, a API consulta diretamente o endpoint físico `https://api.tcgdex.net/v2/pt/cards`, cessando a consulta ao endpoint `pt-br` do TCGdex (que trazia apenas dados do Pocket).

3. **Filtro Universal em Todos os Idiomas:**
    - Na rota `GET /api/search`, todas as cartas recebidas (inclusive do catálogo em inglês `en`) passam pelo filtro `!isPocketCard(card)`.

4. **Validação de Entrada no Servidor:**
    - Na rota `POST /api/cards`, qualquer tentativa de submeter uma carta do Pocket é rejeitada com status HTTP 400 (`"Cartas do Pokémon TCG Pocket não são permitidas"`).

## Consequências

- O fichário mantém fidelidade absoluta ao propósito de espelhar cartas colecionáveis do mundo real.
- Resultados de busca não são poluídos por cartas exclusivas do jogo mobile.
- Nenhuma carta física é perdida em nenhum dos idiomas suportados (PT-BR, EN, JA).
