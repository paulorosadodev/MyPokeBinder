# 38. Otimização e Aceleração por Hardware da Animação de Folheamento no Mobile

## Status

Histórico. A implementação mobile descrita nesta ADR foi substituída por uma grade com transição de saída e entrada, sem PageFlip. O motor permanece exclusivo do desktop. O comportamento atual e sua validação estão em [Testes da animação do binder](../agents/testes-binder.md).

## Contexto

A experiência tátil do binder com física 3D em dispositivos móveis apresentava pequenos engasgos e perda de taxa de quadros (FPS drop) durante a rotação da página no modo retrato (`portrait`).

Identificaram-se dois gargalos principais de renderização na transição:
1. **Composição da GPU sem Camada Isolada**: Durante o giro 3D de 180° da folha, a GPU recalculava o raster e o layout de todos os nós filhos (grade 3x3 de slots, imagens e bordas) a cada frame.
2. **Carga de Sombras Canvas no Mobile**: O motor StPageFlip desenhava sombras dinâmicas em canvas com opacidade de 0.65 (`maxShadowOpacity`), consumindo ciclos de pintura em telas de dispositivos móveis.

Adicionalmente, três problemas funcionais foram identificados em revisão posterior:
3. **Falha na ativação do modo retrato**: O `BINDER_PAGE_MIN_WIDTH_MOBILE = 200` fazia com que `2 × 200 = 400` fosse menor que a largura de muitos viewports mobile (até 480px), e a condição `blockWidth < 2 * minWidth` do StPageFlip nunca era satisfeita, impedindo a ativação do modo retrato (uma página por vez).
4. **Slots vazios durante multi-flip**: A janela de imagens (`imagePages`) só cobria a página atual e adjacentes. Nos flips intermediários do multi-flip, as páginas transitórias não tinham imagens montadas no DOM, resultando em slots visualmente vazios.
5. **Flash de cartas ao voltar das capas**: As funções `getAdjacentCatalogPages` retornavam `[]` quando `currentPage` era 0 (capa frontal) ou ≥ `BINDER_LAST_SPREAD_PAGE` (contracapa), não pré-montando imagens para as páginas de catálogo vizinhas; ao flipar de volta, as imagens só montavam após o `onPageChange`, gerando um flash/piscada visível.

## Decisão

1. **Promoção de Camada por Hardware e Neutralização de Conflitos (`will-change`)**:
   - Aplicada a aceleração de hardware via GPU nos nós `.stf__item` e `.stf__block` durante o estado de animação (`.binder-book-stage--busy`). No modo retrato, a promoção permanece ativa após o assentamento para evitar a despromoção e a recomposição que diminuíam e deslocavam as cartas no iPhone 14 Pro.
   - Mantido o fluxo de coordenadas natural de `.binder-book-page`, sem forçar `transform: translateZ(0)` ou `backface-visibility` redundantes que causavam subida e deslocamento vertical momentâneo nos nós da fileira superior.
   - A camada `Card3DTilt` das cartas inicia e retorna com `transform: none`; assim, a conclusão da virada não recompõe um transform identidade sobre a geometria já estabilizada pelo PageFlip.
   - Isolamento de paint e layout com `contain: layout paint` em `.binder-empty-slot` e `.binder-filled-slot`, com neutralização de transições CSS espúrias (`transition: none !important`) durante `.binder-book-stage--busy`.

2. **Dimensões Mínimas Responsivas Móveis (`minWidth` e `minHeight`)**:
   - Adequação dos parâmetros do motor `PageFlip` no modo retrato (`portrait`) para respeitar telas de smartphones finas ou com viewports curtas (como barras dinâmicas do Safari/Chrome), evitando que o binder ultrapasse a altura visível ou corte a terceira fileira de cartas.
   - `BINDER_PAGE_MIN_WIDTH_MOBILE` ajustado de 200 para 280, garantindo que `2 × 280 = 560 > 480px` (maior viewport mobile), forçando o StPageFlip a ativar o modo retrato em todos os smartphones.
   - A largura útil passa a governar o tamanho da folha e a altura deriva da proporção física `480 / 676`. Em viewports curtas, a tela permite rolagem vertical em vez de reduzir a folha pela altura e produzir margens laterais vazias.
   - `autoSize` fica desativado no modo retrato porque o palco já define largura e proporção. Assim, o StPageFlip não redimensiona o contêiner entre o giro e o assentamento.

3. **Virada Direta no Modo Retrato**:
   - Botões, gestos de avanço e retorno e saltos para páginas distantes usam `flip(targetPhysical)` no celular. A direção é determinada pelo alvo físico e não depende dos pontos sintéticos de `flipPrev()`.
   - Saltos distantes executam uma única virada contínua no retrato, evitando a alternância de 320 ms e 650 ms entre folhas. O efeito sequencial permanece restrito ao desktop.

4. **Preservação dos Filtros de Silhueta (`filter: brightness(0)`)**:
   - Mantida a aplicação integral do filtro `brightness(0)` nas silhuetas de Pokémon não capturados (`.silhouette-img`), garantindo que as silhuetas não pisquem suas cores originais durante a virada de página.

5. **Ajuste Responsivo da Opacidade de Sombra (`maxShadowOpacity`)**:
   - Definidas as constantes `BINDER_MOBILE_MAX_SHADOW_OPACITY = 0.35` e `BINDER_DESKTOP_MAX_SHADOW_OPACITY = 0.65`.
   - Em dispositivos móveis/modo retrato, a opacidade reduzida alivia drasticamente o processamento do canvas 2D/3D mantendo o sombreamento realista e suave.

6. **Cobertura Total de Imagens no Multi-Flip (`getBinderImagePages`)**:
   - `getBinderImagePages` agora preenche todas as páginas entre `currentPage` e `jumpTargetPage` (inclusive) quando há um salto programático. Isto garante que os slots de páginas intermediárias visíveis durante a animação multi-flip sempre tenham imagens montadas.
   - Adjacentes do `jumpTargetPage` também são incluídas no range.

7. **Pré-montagem de Imagens nas Capas (`getAdjacentCatalogPages`)**:
   - Quando `currentPage` está na capa frontal (0) ou na contracapa (≥ `BINDER_LAST_SPREAD_PAGE`), a função agora retorna as páginas de catálogo vizinhas (primeira ou última) como adjacentes.
   - Isto garante que as imagens estejam montadas no DOM antes do utilizador flipar de volta, eliminando o flash/piscada das cartas.

8. **Retenção Progressiva de Imagens e do Motor**:
   - `retainBinderImagePages` acumula as páginas solicitadas durante a sessão. Imagens de páginas visitadas ou pré-carregadas não são desmontadas ao sair da janela atual, evitando novos ciclos de lazy loading ao avançar ou retornar.
   - O preload mantém uma referência forte de cada `Image` enquanto a requisição estiver pendente, deduplica URLs simultâneas e só grava a URL no cache após sucesso. Falhas saem da fila e podem ser tentadas novamente.
   - `hasMountedBinder` trava a primeira montagem. Mudanças posteriores em `currentSpreadImages` não substituem o livro pelo `PokeballLoader`; o preload bloqueante pertence somente à abertura inicial.

## Consequências

- **Positivas**:
  - Eliminação do salto vertical (subida e descida) das cartas da fileira superior durante a passagem de página.
  - Binder proporcional que ocupa o espaço útil sem corte da fileira inferior em qualquer smartphone.
  - Modo retrato (uma página por vez) ativa corretamente em todos os smartphones até 480px de largura.
  - Folheamento suave e contínuo a 60 FPS no mobile via swipe ou botões de navegação.
  - Silhuetas de Pokémon permanecem perfeitamente escuras e sem piscar cores originais durante a virada.
  - Todas as cartas visíveis durante multi-flip sem slots vazios ou piscadas.
  - Transição suave ao voltar das capas sem flash de cartas.
  - Loading de abertura exibido uma única vez por montagem da rota, sem reaparecer entre páginas.
  - Cartas já visitadas permanecem renderizadas e disponíveis imediatamente ao avançar ou retornar.
  - Zero engasgos ou perda de quadros ao virar páginas com 9 cartas preenchidas.
  - 263 testes unitários aprovados com 0 erros de lint e formatação Prettier aplicada.
