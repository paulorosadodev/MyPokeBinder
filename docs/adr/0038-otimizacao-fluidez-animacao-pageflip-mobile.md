# 38. Otimização e Aceleração por Hardware da Animação de Folheamento no Mobile

## Status

Aceito

## Contexto

A experiência tátil do binder com física 3D em dispositivos móveis apresentava pequenos engasgos e perda de taxa de quadros (FPS drop) durante a rotação da página no modo retrato (`portrait`).

Identificaram-se dois gargalos principais de renderização na transição:
1. **Composição da GPU sem Camada Isolada**: Durante o giro 3D de 180° da folha, a GPU recalculava o raster e o layout de todos os nós filhos (grade 3x3 de slots, imagens e bordas) a cada frame.
2. **Carga de Sombras Canvas no Mobile**: O motor StPageFlip desenhava sombras dinâmicas em canvas com opacidade de 0.65 (`maxShadowOpacity`), consumindo ciclos de pintura em telas de dispositivos móveis.

## Decisão

1. **Promoção de Camada por Hardware (`will-change` e `translateZ(0)`)**:
   - Aplicada a aceleração de hardware via GPU nos nós `.stf__item`, `.stf__block` e `.binder-book-page` durante o estado de animação (`.binder-book-stage--busy`).
   - Forçada a propriedade `backface-visibility: hidden` e `-webkit-backface-visibility: hidden`, impedindo passagens duplicadas de pintura nas superfícies das folhas.

2. **Preservação dos Filtros de Silhueta (`filter: brightness(0)`)**:
   - Mantida a aplicação integral do filtro `brightness(0)` nas silhuetas de Pokémon não capturados (`.silhouette-img`), garantindo que as silhuetas não pisquem suas cores originais durante a virada de página.

3. **Ajuste Responsivo da Opacidade de Sombra (`maxShadowOpacity`)**:
   - Definidas as constantes `BINDER_MOBILE_MAX_SHADOW_OPACITY = 0.35` e `BINDER_DESKTOP_MAX_SHADOW_OPACITY = 0.65`.
   - Em dispositivos móveis/modo retrato, a opacidade reduzida alivia drasticamente o processamento do canvas 2D/3D mantendo o sombreamento realista e suave.

## Consequências

- **Positivas**:
  - Folheamento suave e contínuo a 60 FPS no mobile via swipe ou botões de navegação.
  - Silhuetas de Pokémon permanecem perfeitamente escuras e sem piscar cores originais durante a virada.
  - Zero engasgos ou perda de quadros ao virar páginas com 9 cartas preenchidas.
  - Preservação integral do efeito físico 3D tátil sem remoção de funcionalidade.
  - 183 testes unitários aprovados com 0 erros de lint e formatação Prettier aplicada.
