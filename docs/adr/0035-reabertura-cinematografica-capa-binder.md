# 35. Reabertura Cinematográfica da Capa sem Piscar, Sem Página 2 e Sem Salto de Scroll

## Status

Aceito (substitui a decisão de abertura direta da ADR 34)

## Contexto

A ADR 34 eliminou a abertura da capa para extinguir quatro bugs: piscar por `updateFromHtml`, salto de scroll, abertura na Página 2 por duplo `flip`, e transparência 3D. O usuário voltou a exigir o gesto físico: ao entrar no Binder — e ao sair para outra rota e retornar — o binder deve aparecer fechado e abrir rapidamente na Página 1, inclusive no celular com uma página por vez, sem piscar e sem a tela sambar.

## Decisão

1. **Isolamentos da ADR 34 permanecem**: `BinderCardsContext`, folhas estáveis, fundos opacos `#0d111a`, `overflow-anchor: none`.
2. **Montagem na Capa Frontal (`startPage = 0`)** quando o destino é a Página 1. Após motor pronto e imagens do spread inicial prontas, um único `flipNext()` nativo abre o binder. O sync de `currentPage` fica bloqueado até essa abertura terminar, impedindo o segundo `flip` que saltava para a Página 2.
3. **Placeholder da capa e entrada contínua do palco**: enquanto o StPageFlip mede o DOM, o placeholder ocupa o mesmo retângulo e é substituído imediatamente pela capa real. O binder surge 10 px abaixo, com escala inicial de 99,2% e opacidade de 72%, convergindo continuamente ao estado final sem rotação, overshoot ou rebote.
4. **Sequência pré-abertura**: `BINDER_ENTRANCE_MS = 420` executa a entrada suave; `BINDER_OPEN_HOLD_MS = 40` separa o assentamento da abertura. A capa começa a abrir depois de 460 ms.
5. **Celular sem forro frontal**: a primeira virada cai na Página 1 de catálogo, não numa folha de forro que o motor trataria como spread intermediário.
6. **Orientação travada no mount** depois de ler a viewport, para o livro não nascer em landscape e depois virar portrait.
7. **Palco estável**: o `PokeballLoader` ocupa o mesmo `.binder-book-stage` do livro. O HTMLFlipBook só monta depois da largura do palco ser medida (`canMountBinderEngine`) e de viewport + cartas + imagens iniciais (`isDataReady`). Depois da primeira montagem, o livro permanece no DOM durante qualquer navegação e o loader de abertura não pode reaparecer. `stf__parent` tem `min-width: 0`, impedindo o min-width 768px do StPageFlip de abrir um segundo scroll. `flipNext()` dispara com `BINDER_FLIP_MS = 650`.
8. **Celular uma página em largura integral**: `shouldUsePortraitBinder` (viewport ≤ 767), palco 100% da largura útil, altura derivada da proporção física `480 / 676` e `overflow: hidden` para a folha vizinha do StPageFlip não aparecer. Telas curtas usam a rolagem vertical da página em vez de encolher o binder e criar margens laterais. Sem forro frontal. Sem rodapé interno da folha.
9. **Virada desktop**: `overflow: visible` + `clip-path` folgado acima de 768px.
10. **Preservação geométrica e anel de destaque**: cartas mantêm enquadramento completo com `object-contain`, camada elevada no hover (`hover:z-30`) impedindo sobreposição de slots vizinhos, e anel de seleção interno de 1 px (`slot-glow::after`) destacado na cor do tipo elemental. Os dois pulsos pertencem a uma única animação de 3,4 s, preservam luminosidade mínima entre si, acompanham uma escala tátil de até 3,5% e ficam transparentes somente no encerramento.

## Consequências

- Entrar ou voltar ao Binder reproduz um gesto contínuo: capa fechada surge por 420 ms → sustentação de 40 ms → abertura para a Página 1.
- Os bugs que motivaram a ADR 34 continuam cobertos pelos isolamentos que ela introduziu.
- Deep links explícitos de Página (`?page=` e `?spread=`) preservam a abertura da capa antes de folhear até o destino, conforme a ADR 0050. Retornos com Seletor de Carta (`?dexId=...&openSelect=true`) seguem montando direto no destino. Entradas pelo Mini-Grid com `?dexId=` preservam a abertura antes da navegação e do destaque, conforme a ADR 0049.
- Hover e anel de destaque exibem as cartas com total integridade visual sem cortes ou sobreposições.
