# 36. Segundo Scrollbar no Frame de Montagem do Fichário

## Status

Aceito (corrige o item 6 da ADR 35)

## Contexto

A abertura automática da capa piscava no desktop: por um frame surgia um segundo scrollbar colado ao da janela, no canto superior direito, e o conteúdo deslocava 8px.

Medição frame a frame na montagem (viewport 1432px) mostrou a cadeia:

1. React monta `HTMLFlipBook`. Durante um frame as 21 folhas ainda estão em fluxo normal — o StPageFlip só as move para dentro de `.stf__item` no `init` seguinte —, somando ~17000px de altura.
2. `.binder-book-stage` tinha `overflow: visible` no desktop, então essa altura virava tamanho mínimo automático do palco: 811px → 820px (o `max-height`), e o documento subia de 1102px para 1111px.
3. O transbordo escapava até o wrapper da página. Como `body` e o `<div>` raiz do Binder usavam `overflow-x: hidden`, o eixo Y computava para `auto` — os dois eram containers de scroll latentes. O wrapper raiz ganhou `scrollHeight - clientHeight = 17070` e pintou o próprio scrollbar por ~80ms.

A ADR 35 previa esse risco e neutralizava `min-width` em `.stf__parent`, mas a regra nunca valeu: o React reescreve `className` no rerender e apaga a classe que o StPageFlip adiciona ao elemento raiz. O `min-width: 768px` inline do motor seguia ativo.

## Decisão

1. **`overflow-x: clip` no lugar de `hidden`** em `body` e no wrapper raiz do Binder. `clip` no eixo X deixa o eixo Y em `visible`, então nenhum dos dois pode virar container de scroll. O único scrollbar da página continua sendo o do `html`, com `scrollbar-gutter: stable`.
2. **Folhas fora do fluxo antes do `init`**: `.binder-flipbook-root > .binder-book-page` recebe `position: absolute; inset: 0`. O seletor filho direto só casa antes do StPageFlip envelopar cada folha em `.stf__item`, então vale apenas no frame de montagem.
3. **Palco recorta em vez de esconder**: `.binder-book-stage` usa `overflow: clip` + `overflow-clip-margin: 72px` no desktop, substituindo `overflow: visible` + `clip-path: inset(-48px -72px)`. A margem preserva a sangria 3D da virada e o `clip` impede que qualquer transbordo do motor contribua para o scroll da página.
4. **Neutralizações do motor moram em `.binder-flipbook-root`**, não em `.stf__parent`: `min-width: 0` e `max-width: 100%` com `!important` para vencer o estilo inline do StPageFlip.

## Consequências

- Documento estabiliza em uma única altura no carregamento; não há mais salto de 9px nem scrollbar aninhado.
- Regras que dependem de `.stf__parent` continuam mortas após o primeiro rerender. Qualquer neutralização nova do motor deve ir para `.binder-flipbook-root`.
- Navegadores sem `overflow-clip-margin` recortam a sangria da virada na borda do palco em vez de 48px além dela.
