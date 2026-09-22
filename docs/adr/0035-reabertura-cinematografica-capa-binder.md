# 35. Reabertura Cinematográfica da Capa sem Piscar, Sem Página 2 e Sem Salto de Scroll

## Status

Aceito (substitui a decisão de abertura direta da ADR 34)

## Contexto

A ADR 34 eliminou a abertura da capa para extinguir quatro bugs: piscar por `updateFromHtml`, salto de scroll, abertura na Página 2 por duplo `flip`, e transparência 3D. O usuário voltou a exigir o gesto físico: ao entrar no Binder — e ao sair para outra rota e retornar — o fichário deve aparecer fechado e abrir rapidamente na Página 1, inclusive no celular com uma página por vez, sem piscar e sem a tela sambar.

## Decisão

1. **Isolamentos da ADR 34 permanecem**: `BinderCardsContext`, folhas estáveis, fundos opacos `#0d111a`, `overflow-anchor: none`.
2. **Montagem na Capa Frontal (`startPage = 0`)** quando o destino é a Página 1. Após motor pronto e imagens do spread inicial prontas, um único `flipNext()` nativo abre o fichário. O sync de `currentPage` fica bloqueado até essa abertura terminar, impedindo o segundo `flip` que saltava para a Página 2.
3. **Placeholder da capa** enquanto o StPageFlip mede o DOM, no mesmo retângulo da capa fechada (metade direita no desktop, página única no celular), sem fade de opacidade.
4. **Celular sem forro frontal**: a primeira virada cai na Página 1 de catálogo, não numa folha de forro que o motor trataria como spread intermediário.
5. **Orientação travada no mount** depois de ler a viewport, para o livro não nascer em landscape e depois virar portrait.
6. **Palco estável**: o `PokeballLoader` ocupa o mesmo `.binder-book-stage` do livro. O HTMLFlipBook só monta depois da largura do palco ser medida (`canMountBinderEngine`) e de viewport + cartas + imagens (`isDataReady`). `stf__parent` tem `min-width: 0`, impedindo o min-width 768px do StPageFlip de abrir um segundo scroll. O `flipNext()` dispara com `BINDER_FLIP_MS = 320`.
7. **Celular uma página**: `shouldUsePortraitBinder` (viewport ≤ 767), palco 100% da coluna, `overflow: hidden` para a folha vizinha do StPageFlip não aparecer. Sem forro frontal. Sem rodapé interno da folha.
8. **Virada desktop**: `overflow: visible` + `clip-path` folgado acima de 768px.

## Consequências

- Entrar ou voltar ao Binder reproduz o mesmo gesto: capa fechada → Página 1.
- Os bugs que motivaram a ADR 34 continuam cobertos pelos isolamentos que ela introduziu.
- Deep links (`?page=`, `?dexId=`) fora da Página 1 seguem montando direto no destino, sem a animação de capa.
