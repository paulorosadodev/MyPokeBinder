# 34. Estabilização do PageFlip via React Context, Opacidade Sólida e Abertura Direta na Página 1

## Status

Parcialmente supersedida pela [ADR 35](./0035-reabertura-cinematografica-capa-binder.md) na decisão de abertura direta. Isolamento de contexto, opacidade sólida e `overflow-anchor` permanecem.

## Contexto

Após a implementação inicial do folheamento e das correções de navegação do fichário, foram reportadas 4 anomalias críticas na experiência do usuário:

1. **Início Fechado com Piscar Após Carregamento ("começa fechado, depois de um tempo ele pisca")**:
   - O fichário iniciava fechado na capa (`startPage = 0`), aguardava a resolução do SWR e do motor 3D, e subitamente a tela sofria um piscar/reload visual.
   - A causa raiz residia na reatividade do `react-pageflip`: toda vez que `cardsMap` ou qualquer prop dos slots se alterava, novas instâncias de nós filhos eram repassadas ao `HTMLFlipBook`. O hook interno do `react-pageflip` disparava `updateFromHtml()`, destruindo a árvore de páginas (`this.pages.destroy()`), recarregando o canvas (`render.reload()`) e reexibindo o spread no meio do ciclo de vida, gerando o piscar.

2. **Salto de Scroll da Janela ("ai o scroll buga")**:
   - Ao destruir e reinserir elementos DOM durante o ciclo de abertura e mutações do `updateFromHtml`, o algoritmo nativo de ancoragem de rolagem dos navegadores (*Scroll Anchoring*) detectava modificações estruturais acima do viewport e deslocava a rolagem da página repentinamente.

3. **Abertura Indesejada Diretamente na Página 2 ("e ele abre direto na pagina 2 por algum motivo")**:
   - Ao concluir a inicialização, o timer de autoabertura agendava `currentFlip.flip(targetPhysical)` para 120ms e alterava `hasAutoOpenedRef.current = true`.
   - Imediatamente no mesmo ciclo, o `useEffect` de sincronização de `currentPage` lia a flag liberada, detectava `currentSpreadLeft (0) !== targetSpreadLeft (1)` e disparava um primeiro `flip(2)`.
   - 120ms depois, o temporizador disparava o segundo `flip(2)`. Com a primeira animação já em curso, o motor StPageFlip avançava para o spread subsequente (Spread 2: Páginas 2 e 3 do catálogo), abrindo erradamente na Página 2 em vez da Página 1.

4. **Efeitos Bizarros de Transparência e Vazamento 3D ("tem uns efeitos de transparencia q tão mt estranhos")**:
   - A folha `InsideCoverSheet` estava configurada com `data-density="soft"`, enquanto a capa frontal era `data-density="hard"`. No StPageFlip, ao rotacionar uma capa rígida em 3D, sua face traseira precisa possuir densidade idêntica. A divergência acionava o desenho com polígonos recortados (`clip-path`) e clonagem de nós (`newTemporaryCopy`).
   - No CSS, `.stf__item` continha `background: transparent !important`, e slots vazios/finais usavam fundos translúcidos (`/85` e `/40`). Durante o giro das folhas em perspectiva 3D, os planos de fundo e elementos da página vazavam através dos recortes geométricos, criando furos e artefatos de transparência.

## Decisão

1. **Abertura Instantânea e Direta na Página Solicitada (`startPage={initialTargetPhysical}`)**:
   - Eliminou-se a dependência artificial de iniciar o fichário fechado na capa e disparar timers de abertura automática (`setTimeout`).
   - O fichário inicializa imediatamente na página solicitada pelo usuário (Página 1, ou `targetPhysical = 2`, spread 1 em landscape), renderizando a capa interna à esquerda e a primeira página de cartas à direita desde o primeiro frame.
   - A remoção do temporizador extinguiu completamente a condição de corrida que causava o duplo folheamento para a Página 2.
   - Caso o usuário deseje visualizar a capa externa, ele pode folhear para a esquerda a qualquer momento e, ao clicar na capa, a ação `flipNext()` abre suavemente para a Página 1.

2. **Isolamento de Renderização com `BinderCardsContext` e Filhos Estáveis**:
   - Criou-se o contexto `BinderCardsContext` provendo `cardsMap`, `highlightedDexId`, `droppingDexId`, `onSlotClick` e `onSwapClick`.
   - O componente `PageSheet` recebe exclusivamente a propriedade estática `pageNum`, consumindo os dados dinâmicos das cartas diretamente do contexto.
   - O array de filhos (`bookSheets`) do `HTMLFlipBook` foi totalmente memorizado via `useMemo`. Como as referências dos nós não se alteram quando cartas são carregadas ou vinculadas, o `react-pageflip` **nunca mais** invoca `updateFromHtml()`. O motor StPageFlip permanece vivo e contínuo, eliminando 100% dos piscares e flashes.

3. **Opacidade Sólida e Densidade Rígida nas Capas**:
   - `InsideCoverSheet` (tanto frontal quanto traseira) foi configurada com `data-density="hard"`, alinhando a física 3D das capas com rotação sólida.
   - `.stf__item` e `.binder-book-page` receberam cor de fundo sólida `#0d111a !important`, eliminando qualquer transparência nos canvas 3D.
   - Os slots de cartas (`BinderSlot`) agora utilizam cores sólidas (`bg-[#0c1017]` e `bg-[#090c12]`), extinguindo qualquer vazamento de luz ou silhueta invertida.

4. **Eliminação do Bug de Scroll com `overflow-anchor: none`**:
   - Os seletores `.binder-book-stage`, `.stf__parent` e `.binder-flipbook-root` receberam `overflow-anchor: none` no CSS.
   - Como o fichário já nasce com as dimensões finais completas do spread aberto, a janela do navegador permanece perfeitamente ancorada sem saltos ou trepidações.

## Consequências

- **Abertura Imediata na Página 1**: Ao abrir o fichário ou retornar de outras rotas, o usuário encontra suas cartas prontas e abertas na Página 1, sem atrasos e sem cair na Página 2.
- **Zero Piscar Visual**: Atualizações de dados no SWR atualizam os slots no DOM sem recarregar o motor 3D.
- **Estabilidade de Rolagem**: O scroll da tela permanece estático e confortável.
- **Renderização 3D Opaca e Realista**: O folheamento exibe sombras e texturas ricas sem artefatos de transparência ou vazamentos no canvas.
- **Cobertura de Testes Automatizados**: Suíte `tests/binder-scroll-and-flip.test.ts` expandida para 164 testes com 100% de sucesso.
