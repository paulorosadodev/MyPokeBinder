# ADR 0005: Busca Exclusiva em Inglês, Metadados de Idioma e Otimizações de UX e Cache

## Status

Aceito

## Contexto

O MyPokeBinder é um fichário digital voltado à catalogação das cartas dos 151 Pokémon originais. Nas versões anteriores, a busca de cartas realizava consultas no idioma selecionado pelo usuário (PT-BR, EN, JA). No entanto, o catálogo da TCGdex apresenta grande disparidade de completude e qualidade de imagens entre idiomas: enquanto a base em inglês (`en`) conta com praticamente todas as cartas do TCG físico em alta resolução (WebP) e dados completos de expansões, outros idiomas frequentemente carecem de imagens ou apresentam falhas no catálogo.

Adicionalmente, identificou-se a oportunidade de elevar o padrão visual e de desempenho do sistema:

- O carregamento das imagens gerava pop-in e telas parciais;
- A busca limitava-se rigidamente a 36 cartas no modal, impedindo ver coleções completas de Pokémon populares como Pikachu ou Charizard;
- O usuário não conseguia localizar diretamente um slot específico no fichário sem folhear spread por spread;
- A indicação de carregamento utilizava spinners genéricos sem identidade temática de Pokémon.

## Decisões

1. **Busca e Exibição de Imagens Exclusivamente em Inglês (EN):**
    - A rota `GET /api/search` passa a consultar unicamente o endpoint `/v2/en/cards` da TCGdex, garantindo acesso à totalidade das cartas do TCG físico com imagens de alta definição.
    - O parâmetro de idioma na rota de busca é descontinuado para fins de requisição externa.

2. **Idioma da Carta como Metadado e Bandeiras em SVG:**
    - O campo `card_language` (`pt-br`, `en`, `ja`) permanece sendo salvo na tabela `user_cards` no Supabase como metadado da cópia física que o usuário possui.
    - Criado o componente `FlagIcon` em SVG vetorial para renderizar as bandeiras do Brasil, Estados Unidos e Japão de forma fidedigna e sem falhas em qualquer sistema operacional ou navegador (superando limitações de fontes de emojis do Linux).
    - No modal de adição e no `CardDetailDrawer`, botões com `FlagIcon` permitem definir ou editar o idioma imediatamente via `PATCH /api/cards/[id]`.

3. **Paginação Server-side e Scroll Infinito no Modal:**
    - A rota `GET /api/search` adota paginação com parâmetros `page` e `pageSize` (padrão 36), retornando `{ cards, hasMore, totalCount }`.
    - O modal `CardSearchModal` utiliza `IntersectionObserver` em elemento sentinela para carregar progressivamente novas páginas conforme o usuário rola a lista, exibindo mensagem amigável "Carregando cartas...".

4. **Cache Client-Side via SWR:**
    - Adotada a biblioteca SWR com hooks customizados (`useBinderCards`, `useCollectionCards`, `useDashboardData`).
    - Configurado intervalo de deduplicação de 10 segundos e desativação de revalidação por foco (`revalidateOnFocus: false`), eliminando requisições redundantes ao alternar abas ou fechar modais.

5. **Pré-carregamento Inteligente de Imagens e Carregamento a Frio Único:**
    - Criado o hook `useImagePreloader` para o spread atual do fichário.
    - O fichário exibe a tela de carregamento da Pokébola **exclusivamente na primeira inicialização a frio** da aplicação (controlado por flag de sessão `hasBinderLoadedGlobally`).
    - Ao virar páginas ou alternar entre o Fichário e o Catálogo/Dashboard, o fichário não pisca nem desmonta a tela, ocorrendo a troca de páginas de forma instantânea.
    - Após a página atual estar pronta, o sistema dispara pré-carregamento em segundo plano (`preloadImages`) das páginas adjacentes (anterior e próxima).

6. **Componente Temático Pokébola Loader:**
    - Criado o componente `PokeballLoader` em SVG e CSS (`animate-pokeball-spin`), substituindo spinners genéricos no fichário, dashboard e modal de busca.

7. **Barra de Busca Empilhada e Terminologia Unificada:**
    - O componente `BinderControls` unifica a terminologia de navegação para **Página** (substituindo a menção a "Spread" na interface visual).
    - A barra de pesquisa foi empilhada verticalmente logo abaixo dos controles de página, otimizando o alinhamento visual e responsividade.
    - Ao selecionar um Pokémon, o fichário navega para a página correta e aciona animação de destaque pulsante dourado (`slot-glow`) durante 3,6 segundos.

8. **Dashboard com Skeleton Shimmer e Carregamento Progressivo:**
    - O mini-grid dos 151 slots no Dashboard utiliza animação de skeleton shimmer (`skeleton-shimmer`), revelando as imagens com transição suave conforme são carregadas individualmente via evento `onLoad`.

9. **Extensão do Cache HTTP no Next.js:**
    - Adicionado `minimumCacheTTL: 2678400` (31 dias) no bloco de imagens do `next.config.ts` para reter assets estáticos (como silhuetas) em cache por longo período.

## Consequências

- Cartas sempre exibidas com artes completas em alta definição.
- Navegação entre spreads instantânea e sem engasgos visuais.
- Flexibilidade total para colecionadores indicarem o idioma real de suas cartas físicas.
- Experiência visual temática consistente e responsiva em desktop e mobile.
