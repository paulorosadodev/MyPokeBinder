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
   - **Blindagem do ciclo tátil contra mouse sintético**: navegadores móveis disparam eventos sintéticos de `mouseleave` ao arrastar o dedo para fora dos limites projetados da carta inclinada. O componente rastreia ativamente o estado de toque (`isTouchingRef`) e ignora qualquer `handleMouseLeave`, `handleMouseEnter` ou `handleMouseMove` durante o gesto e em janela de cooldown pós-toque, impedindo que o tilt e o hover sejam redefinidos prematuramente.
   - **Continuidade do estado de hover no arraste**: o `handleTouchMove` preserva explicitamente `isHovering = true` e cancela comportamentos padrão (`e.cancelable && e.preventDefault()`), garantindo que o acabamento de cartas especiais (como o padrão elemental do Reverse Foil) não oscile entre opacidades de repouso (0.22) e hover (0.76).
   - **Referência estável de medidas (`parentElement`)**: o cálculo do centro e do deslocamento relativo afere os limites do container pai estático (`el.parentElement ?? el`), eliminando o loop de retroalimentação e trepidação (jitter) causado por medir a própria carta já distorcida em 3D por `rotateX`/`rotateY`.
   - **Composição coplanar sem Z-fighting**: remoção de `transformStyle: "preserve-3d"` no container da carta, permitindo que todas as camadas 2D (arte, padrão elemental, lamination sheen e glare) sejam compostas normalmente via empilhamento CSS (`z-index`) na superfície da carta antes do tilt de perspectiva, eliminando cintilações (flickering) provocadas pelo teste de profundidade em GPUs móveis.

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

- Experiência tátil imersiva em smartphones e tablets, permitindo aos colecionadores examinar detalhes e reflexos holográficos/foil deslizando o dedo sobre a carta sem qualquer interferência de rolagem de página ou piscamento/cintilação de camadas.
- Eliminação de fechamentos acidentais durante a manipulação da carta 3D.
- Estabilidade total dos efeitos Reverse Foil, Holo e Prismáticos sob manipulação com dedo em telas cheias e modais.
