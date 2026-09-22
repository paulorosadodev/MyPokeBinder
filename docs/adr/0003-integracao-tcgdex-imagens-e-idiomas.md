# ADR 0003: Integração com TCGdex — Resolução de Imagens e Unificação do Catálogo em Português

## Status

Substituído parcialmente pelo ADR 0004 (a decisão de incluir o catálogo pt-br do Pocket foi revogada em favor do suporte exclusivo a cartas do TCG físico)

## Contexto

Ao buscar cartas via API do TCGdex e exibi-las na aplicação, dois problemas foram identificados:

1. **Falha no carregamento de imagens no Next.js (`<Image />`):** A TCGdex retorna na propriedade `image` a URL base sem extensão (ex.: `https://assets.tcgdex.net/pt-br/tcgp/A1/002`). O acesso direto a essa URL sem extensão retorna 404 ou documento `text/html`, causando erros de upstream image no Next.js. A especificação do TCGdex exige a adição de `/high.webp` (ou `/low.webp`) ao final da URL.
2. **Baixa quantidade de cartas em português:** Na TCGdex, o código `pt-br` armazena apenas as coleções do _Pokémon TCG Pocket_ (11 coleções), fazendo com que Pokémon clássicos tivessem apenas 2 cartas. As 125 coleções físicas traduzidas em português do Brasil (distribuídas pela Copag) estão cadastradas sob o código `pt`.

## Decisão

1. **Normalização de URLs de Imagens:**
    - Criado o utilitário `formatTcgdexImageUrl` em `src/lib/pokemon/tcgdex.ts`.
    - Todas as URLs de imagens retornadas pela API `/api/search`, inseridas via `/api/cards` ou renderizadas pelos componentes (`BinderSlot`, `CardDetailDrawer`, `CardSearchModal`, `Dashboard`) passam por essa formatação, garantindo a terminação `/high.webp`.

2. **Unificação dos Catálogos `pt` e `pt-br`:**
    - Na rota `GET /api/search`, quando o idioma selecionado for `pt-br` (ou `pt`), a API consulta em paralelo tanto o endpoint `https://api.tcgdex.net/v2/pt/cards` quanto `https://api.tcgdex.net/v2/pt-br/cards`.
    - Os resultados são combinados e desduplicados pelo identificador único da carta.
    - O enriquecimento de detalhes de coleção e raridade respeita o namespace de origem da carta (`pt` ou `pt-br`).

## Consequências

- Todas as imagens de cartas carregam perfeitamente sem falhas de upstream no Next.js.
- A busca em português passa a abranger todos os 151 Pokémon originais, somando tanto as cartas físicas clássicas e modernas quanto as cartas digitais do Pocket.
