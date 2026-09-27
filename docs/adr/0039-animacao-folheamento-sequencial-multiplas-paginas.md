# 39. Animação de Folheamento Rápido Sequencial (Efeito Riflar Páginas)

## Status

Aceito

## Contexto

Ao navegar no binder através da busca por Pokémon (ex: buscando pelo Mew na Página 17 a partir da Página 1) ou ao selecionar uma página distante no seletor numérico, a navegação executava um único salto abrupto. Por outro lado, tentativas de disparar múltiplos giros por temporizadores arbitrários (`setTimeout`) colidiam com a animação 3D em andamento, causando estouro de limites físicos (overshooting) para a capa (página 0) ou contracapa (página 21).

## Decisão

1. **Máquina de Estados Guiada por Eventos no Desktop (`handleFlip` e `multiFlipStateRef`)**:
   - Eliminados temporizadores cegos de intervalo. O sequenciamento é coordenado pelo evento nativo `handleFlip` do StPageFlip, que dispara estritamente quando a página anterior completou sua rotação física e assentou no DOM.
   - `planBinderPageNavigation` produz índices físicos intermediários explícitos. A cadência executa `flip(intermediatePhysicalTarget)` a `BINDER_MULTI_FLIP_STEP_MS` (320ms) por folha, tanto no avanço quanto no retorno.
   - Ao consumir os alvos intermediários, restaura-se a velocidade normal (`BINDER_FLIP_MS = 650ms`) e executa-se `flip(targetPhysical)`, garantindo aterrissagem exata na página pesquisada.

2. **Cálculo Preciso de Distância em Spreads**:
   - Calcula-se a distância em spreads reais (`spreadDelta`):
     - Diferença $\ge 4$ spreads: 2 giros intermediários rápidos + 1 giro final.
     - Diferença de 2 a 3 spreads: 1 giro intermediário rápido + 1 giro final.
     - Diferença $< 2$ spreads: giro direto único sem rajada intermediária.
   - A volta não usa `flipPrev()` nem seu ponto sintético. Cada folha recebe um alvo físico dois índices abaixo do anterior, removendo a assimetria e os travamentos da navegação reversa.

3. **Supressão de Atualizações Intermediárias de Estado**:
   - `onPageChange` só é disparado na aterrissagem do giro final, evitando recarregamentos ou saltos visuais nas páginas intermediárias.

4. **Navegação Direta no Mobile**:
   - No modo retrato, qualquer salto programático usa uma única chamada `flip(targetPhysical)` na duração padrão de 650 ms, tanto no avanço quanto no retorno.
   - A rajada sequencial fica desativada no celular porque cada assentamento intermediário recompunha e redimensionava a folha, causando trancos perceptíveis em telas como a do iPhone 14 Pro.

## Consequências

- **Positivas**:
  - Efeito tátil de várias páginas passando em rápida sucessão ao buscar Pokémon distantes.
  - Mesma cadência fluida ao avançar e voltar várias páginas no desktop.
  - Virada mobile contínua e previsível em ambas as direções, sem encolhimento entre etapas.
  - Zero estouro para capas externas: a carta pesquisada abre com precisão matemática milimétrica.
  - 183 testes unitários aprovados com 0 erros de lint e formatação Prettier alinhada.
