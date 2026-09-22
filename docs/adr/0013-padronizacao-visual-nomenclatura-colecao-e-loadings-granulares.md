# ADR 0013: Padronização Visual, Nomenclatura Estrita "Coleção" e Loadings Granulares na Edição

## Status

Aceito

## Contexto

Durante o refinamento contínuo da experiência do usuário (frontend design) do MyPokeBinder:

1. **Alinhamento do Número da Pokédex**: Nos modais de seleção e busca, o número da Pokédex precisa estar sempre alinhado na mesma linha horizontal ao lado do nome (`flex items-center gap-2.5`), garantindo hierarquia estável e sem quebra visual.
2. **Nomenclatura Estrita**: A coexistência do termo arcaico "Acervo" gerava duplicidade conceitual com o termo canônico "Coleção". A regra estrita é utilizar exclusivamente "Coleção".
3. **Página de Detalhes e Edição (`/cards/[id]`)**:
    - O indicador "Acervo Geral" na barra de navegação superior era desnecessário e poluía o topo.
    - A badge "No Acervo" abaixo da carta era redundante quando a carta não estava no binder.
    - As ações de remoção do Binder ("Remover do Binder") e de exclusão ("Excluir da Coleção") precisavam de semântica visual nítida através de tons vermelhos (`border-red-500/40 bg-red-500/15 text-red-200/300`), diferenciando-as de ações de inclusão/confirmação.
    - Havia um estado de loading monolítico (`isUpdating`) que fazia com que a alteração de idioma ou o toggle de Full Art bloqueasse todos os botões e transformasse o botão "Remover do Binder" em um spinner de carregamento.
4. **Carregamento Assíncrono de Imagens**: Ao navegar para `/cards/[id]`, os dados da API retornavam em milissegundos via SWR, desativando o loader principal da tela antes que o `<Image>` do Next.js tivesse finalizado o download/otimização da imagem externa da carta.

## Decisão

1. **Nomenclatura Unificada**:
    - Todo uso do termo "Acervo" foi removido da aplicação (`/collection`, `/cards/[id]`, modais e página de login) e substituído por "Coleção".
    - "Acervo" foi adicionado às listas de proibições terminológicas em `docs/CONTEXT.md`.

2. **Alinhamento nos Modais**:
    - Nos cabeçalhos dos modais (`BinderSlotSelectModal` e `CardSearchModal`), o nome do Pokémon e a badge do número da Pokédex (`#{dexId}`) são fixados na mesma linha com `flex items-center gap-2.5`.

3. **Refatoração da Página de Edição (`/cards/[id]`)**:
    - Removido o rótulo "Acervo Geral" da navegação superior.
    - Removida a badge "No Acervo".
    - As ações de remoção do Binder e de exclusão da Coleção passaram a ter estilização vermelha com contraste tátil e bordas iluminadas.
    - O estado monolítico `isUpdating` foi dividido em 4 estados independentes:
        - `isUpdatingBinder`: restrito ao botão de inclusão/remoção do binder.
        - `updatingLang`: restrito aos botões de seleção de idioma físico.
        - `isUpdatingFullArt`: restrito ao switch de variante Full Art.
        - `isUpdatingCopies`: restrito aos controles de incremento e decremento de exemplares idênticos.

4. **Performance de Imagem e Placeholder com Silhueta**:
    - Adicionada a propriedade `unoptimized` no componente `<Image>` da carta tanto na tela principal de edição quanto no modal de ampliação em tela cheia, conectando o navegador diretamente à CDN Cloudflare de alta velocidade da TCGdex.
    - Criado estado `isImageLoaded` e renderizado um placeholder com a silhueta oficial do Pokémon (`getPokemonSilhouetteUrl`) em animação de pulso suave enquanto a imagem original carrega, eliminando saltos de layout e telas pretas temporárias.

## Consequências

- A experiência de navegação e edição tornou-se muito mais rápida, responsiva e independente.
- Eliminação de bloqueios indevidos e spinners fantasma em botões não relacionados.
- Identidade visual coerente, com semântica de cores clara (azul para seleção/adição, âmbar para Full Art, vermelho para remoção e exclusão).
