# 28. Persistência de Filtros da Coleção, Botão de Inversão de Ordem, Padrão Vermelho e Abertura Suave Nativa do Binder

Data: 2026-09-21

## Status

Aprovado

## Contexto

Na página da Coleção (`/collection`), o usuário apontou dois pontos de melhoria de UX:
1. Ao aplicar filtros ou termos de busca, clicar em uma carta para editar (`/cards/[id]?from=collection`) e posteriormente clicar no botão "Voltar para Coleção", todos os filtros eram reiniciados para o estado padrão, obrigando o usuário a reconfigurar os filtros manualmente.
2. No seletor de ordenação, havia opções duplicadas para ordenar por número da Pokédex em ordem crescente (#1 - #151) e decrescente (#151 - #1), o que polui a listagem de opções e dificulta a expansão para outros campos (como nome ou data de adição).

Além disso, foram tratados dois comportamentos visuais e de identidade:
1. Definição da cor padrão universal da Pokébola como **Vermelho clássico (#ef4444)** para novos usuários e quando nenhuma personalização for escolhida nas configurações, acompanhando dinamicamente qualquer outro tema selecionado.
2. Abertura suave e realista do binder ao entrar na página: a animação automática não deve usar overlays externos de CSS que pisquem ou sofram recálculo de escala, devendo empregar a física 3D de abertura da Capa Frontal (`flip(targetPhysical)`) nativa do motor `react-pageflip`.

## Decisões

1. **Persistência de Filtros na Coleção**:
   - Os estados de busca (`searchTerm`), status no binder (`statusFilter`), idioma (`languageFilter`), raridade (`rarityFilter`), critério de ordenação (`sortField`) e sentido da ordenação (`sortDirection`) são inicializados com leitura síncrona do `sessionStorage` sob a chave `mypokebinder_collection_filters`.
   - Um `useEffect` dedicado sincroniza qualquer alteração desses estados no `sessionStorage`.
   - Na página de detalhes da carta (`/cards/[id]`), quando o parâmetro de busca contiver `from=collection`, o botão de voltar aciona `router.back()`, preservando a pilha de navegação, posição de scroll e os estados memorizados no navegador.
   - O botão "Limpar filtros" reseta os estados e remove a chave do `sessionStorage`.

2. **Botão Dedicado de Inversão de Ordem (`ArrowUpDown`)**:
   - As opções do select de ordenação foram limpas para conter apenas o campo canônico:
     - `dex`: "Número Pokédex"
     - `name`: "Nome do Pokémon"
     - `created_at`: "Data de adição"
   - Ao lado do select, foi introduzido um botão com ícone `ArrowUpDown` que inverte a direção entre `asc` e `desc`.
   - O ícone gira 180 graus (`rotate-180`) e recebe realce temático quando em ordem decrescente, fornecendo feedback visual claro ao usuário.

3. **Padronização Vermelha da Pokébola (#ef4444)**:
   - A cor padrão universal da Pokébola na logo, na capa do binder, no loader, no favicon e nas variáveis CSS `:root` é estabelecida como o vermelho clássico `#ef4444`.
   - Caso o treinador escolha outro tema nas configurações (ex: Blastoise Blue, Gengar Purple, Pikachu Amber), o sistema atualiza em tempo real.

4. **Abertura 3D Fluida e Nativa do Binder**:
   - Para abrir o binder automaticamente ao entrar na página inicial sem piscar ou travar, o componente `BinderBookFlip` inicializa com `startPage` na Capa Frontal (`page 0`).
   - Após a montagem e inicialização do motor (`onInit`), o livro executa automaticamente `flip(targetPhysical)` para virar a capa com a física realista e curvatura 3D nativa do `react-pageflip`, revelando as páginas internas com suavidade e sem distorção de escala em containers pais.
   - Ao folhear manualmente entre as páginas restantes, a transição preserva a resposta ágil e suave.

## Consequências

- Experiência de abertura de fichário realista, imersiva e cinematográfica logo na chegada do usuário.
- O fluxo de curadoria e inspeção de cartas da coleção se torna muito mais ágil, permitindo editar cartas em sequência sem perder a busca ou os filtros aplicados.
- Interface de ordenação limpa, compacta e intuitiva.
- Identidade visual vibrante no vermelho clássico da franquia Pokémon.
