# 53. Responsividade do Modal de Seleção de Cartas e Correção do LanguageSlider

## Status
Aceito

## Contexto
Em dispositivos móveis (smartphones com largura entre 320px e 430px e alturas reduzidas de viewport), o modal de escolha de cartas para adição ao binder (`CardSearchModal`) apresentava dois problemas críticos de usabilidade e layout:

1. **Ocupação Excessiva de Altura**: O cabeçalho, barra de busca, seletores de raridade e expansão, além dos seletores de idioma e variante física ocupavam juntos mais da metade da altura total do modal (~340px). Isso deixava menos da metade do modal para a visualização do catálogo, cortando as cartas ao meio e exigindo rolagem constante.
2. **Estouro Horizontal de Conteúdo do Slider**: O componente `LanguageSlider` apresentava estouro visual (`overflow`) na coluna de variante ("Versão: Normal, Holo, Reverse"). Como as colunas dividiam o espaço em 50% cada (~140px) e os botões não possuíam `min-w-0` nem truncamento de texto, somado a textos mais longos com ícones, o botão "Reverse" e o pill deslizante ultrapassavam a margem direita do modal. Além disso, as classes responsivas anteriores (`xs:inline` / `xs:hidden`) não eram suportadas pelo Tailwind v4 sem declaração explícita de breakpoint, impedindo a exibição de rótulos curtos.

## Decisão
1. **Otimização Vertical do Modal (`CardSearchModal`)**:
   - Ajuste do container para `p-2 sm:p-4` e altura de `h-[92vh] sm:h-[85vh]`, ampliando a área útil vertical no mobile.
   - Ocultação responsiva do parágrafo explicativo do cabeçalho em telas mobile (`hidden sm:block`) e redução de paddings.
   - Introdução de botão retrátil de filtros adicionais (`Filtros`) em mobile com contador de filtros ativos (`activeFilterCount`), posicionando a busca e os filtros de raridade e expansão de forma limpa e condensada. Em telas maiores (`sm:`), busca e seletores continuam alinhados lado a lado.
   - Condensação dos seletores de Idioma e Versão física em um grid responsivo com espaçamento otimizado e `min-w-0` obrigatório para evitar estouro de colunas.
   - Redução dos paddings da área de rolagem das cartas (`p-3 sm:p-6`) e do espaçamento entre os cards (`gap-2.5 sm:gap-4`), garantindo que 4 ou mais cartas apareçam completas na tela inicial.

2. **Estabilização e Confinamento do `LanguageSlider`**:
   - Adição de `overflow-hidden` e `max-w-full` no container externo do slider.
   - Aplicação de `min-w-0` e `flex-1` em cada item, com truncamento de texto (`truncate`).
   - Adaptação das variantes responsivas para utilizar breakpoints canônicos (`hidden sm:inline` e `inline sm:hidden`), alternando automaticamente para rótulos compactos (`shortLabel`: "PT", "EN", "JA", "Norm", "Holo", "Rev") em telas mobile.
   - Confinamento numérico da posição e largura do indicador deslizante com limites rígidos (`Math.max(0, ...)` e `Math.min(itemWidth, containerWidth - left)`), impedindo matematicamente qualquer extravasamento para fora do container.

## Consequências
- A área visual disponível para as cartas no mobile saltou de menos de 45% para mais de 75% da altura útil do modal.
- Eliminação definitiva de qualquer quebra ou estouro horizontal no seletor de versão e idioma em qualquer resolução móvel.
- Navegação mais rápida, fluida e com visualização imediata do botão "Adicionar" sem necessidade de rolagem prévia.
