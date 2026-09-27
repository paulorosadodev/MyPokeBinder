# 54. Travamento de Scroll e Interação Touch 3D no Fullscreen de Cartas

## Contexto

Ao visualizar uma carta em tela cheia (fullscreen / lightbox) em dispositivos móveis, os gestos de toque do usuário causavam conflitos com o navegador:
1. O deslizamento do dedo na tela ativava a rolagem (scroll) ou pull-to-refresh da página em segundo plano, em vez de permitir a manipulação fluida da carta.
2. O componente de inclinação 3D (`Card3DTilt`) só escutava eventos de mouse (`onMouseMove`), não oferecendo suporte a eventos táteis (`touch`).
3. O invólucro da carta possuía um evento de clique para fechar, fazendo com que qualquer toque ou arraste fechasse a visualização imediatamente.

## Decisão

1. **Interação Tátil 3D no `Card3DTilt`**:
   - Adicionada a propriedade `enableTouch` ao componente `Card3DTilt`.
   - Implementados os handlers `onTouchStart`, `onTouchMove`, `onTouchEnd` e `onTouchCancel`.
   - O cálculo das coordenadas relativas normalizadas (`nx`, `ny`) agora é compartilhado entre mouse e touch via `requestAnimationFrame`, mantendo limites estritos entre -1 e 1 mesmo quando o dedo ultrapassa a borda da carta.
   - Ao soltar o dedo, a carta retorna com amortecimento suave à sua posição neutra de repouso.

2. **Travamento Rígido de Scroll em Telas Móveis (`CardLightbox`)**:
   - Bloqueio completo de `overflow: hidden` e `touch-action: none` em `document.body` e `document.documentElement` enquanto a carta estiver ampliada.
   - Adicionado ouvinte não passivo para `touchmove` no overlay com chamada de `e.preventDefault()`, anulando qualquer rolagem, arraste elástico de tela ou pull-to-refresh de navegadores mobile (iOS Safari e Android Chrome).
   - Adicionadas classes utilitárias `touch-none` e `overscroll-none` no modal e no container da carta.

3. **Experiência de Uso e Fechamento Intuitivo**:
   - Removido o fechamento ao tocar/arrastar sobre a carta no `CardLightbox`.
   - No mobile, o fechamento da visualização ampliada fica restrito ao botão interno de fechar ("X"), evitando encerramentos acidentais ao tocar na área escura ou usar um teclado conectado.
   - A partir do breakpoint `sm`, o fechamento também permanece disponível pela tecla `Escape` ou por clique na área escura de fundo (backdrop).
   - Unificada a visualização ampliada da página de detalhes (`/cards/[id]`) para utilizar o componente padronizado `CardLightbox`.

## Consequências

- Experiência tátil imersiva em smartphones e tablets, permitindo aos colecionadores examinar detalhes e reflexos holográficos/foil deslizando o dedo sobre a carta sem qualquer interferência de rolagem de página.
- Eliminação de fechamentos acidentais durante a manipulação da carta 3D.
