# 39. Animação de Folheamento Rápido Sequencial (Efeito Riflar Páginas)

## Status

Aceito

## Contexto

Ao navegar no binder através da busca por Pokémon (ex: buscando pelo Mew na Página 17 a partir da Página 1) ou ao selecionar uma página distante no seletor numérico, a navegação executava um único salto abrupto. Por outro lado, tentativas de disparar múltiplos giros por temporizadores arbitrários (`setTimeout`) colidiam com a animação 3D em andamento, causando estouro de limites físicos (overshooting) para a capa (página 0) ou contracapa (página 21).

## Decisão

1. **Máquina de Estados Guiada por Eventos (`handleFlip` e `multiFlipStateRef`)**:
   - Eliminados temporizadores cegos de intervalo. O sequenciamento é coordenado pelo evento nativo `handleFlip` do StPageFlip, que dispara estritamente quando a página anterior completou sua rotação física e assentou no DOM.
   - Enquanto `multiFlipStateRef.current.remainingSteps > 0`, a cadência executa `flipNext()` ou `flipPrev()` a 180ms por folha.
   - Ao atingir o último passo (`remainingSteps === 0`), restaura-se a velocidade normal (`BINDER_FLIP_MS = 320ms`) e executa-se `flip.flip(targetPhysical)`, garantindo aterrissagem 100% exata na página da carta pesquisada (ex: Squirtle na Página 1, Snorlax na Página 16).

2. **Cálculo Preciso de Distância em Spreads**:
   - Calcula-se a distância em spreads reais (`spreadDelta`):
     - Diferença $\ge 4$ spreads: 2 giros intermediários rápidos + 1 giro final.
     - Diferença de 2 a 3 spreads: 1 giro intermediário rápido + 1 giro final.
     - Diferença $< 2$ spreads: giro direto único sem rajada intermediária.

3. **Supressão de Atualizações Intermediárias de Estado**:
   - `onPageChange` só é disparado na aterrissagem do giro final, evitando recarregamentos ou saltos visuais nas páginas intermediárias.

## Consequências

- **Positivas**:
  - Efeito tátil de várias páginas passando em rápida sucessão ao buscar Pokémon distantes.
  - Zero estouro para capas externas: a carta pesquisada abre com precisão matemática milimétrica.
  - 183 testes unitários aprovados com 0 erros de lint e formatação Prettier alinhada.
