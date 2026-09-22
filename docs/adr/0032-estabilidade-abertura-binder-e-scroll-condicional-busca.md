# 32. Estabilidade na Abertura do Binder, Eliminação de Layout Shift e Rolagem Condicional na Busca

## Status

Aceito

## Contexto

Foram identificados dois comportamentos inadequados na interface do fichário (`/`):

1. **Bug na Animação de Abertura do Binder e Cumulative Layout Shift (CLS)**:
   - Ao acessar a página ou recarregar, o usuário visualizava apenas a barra de ações e cabeçalho, com o centro vazio.
   - Subitamente, o fichário surgia no centro já fechado, empurrava a interface e os controles inferiores bruscamente para baixo ("joga a tela pra baixo") e só então iniciava a animação de abertura.
   - Ao transitar entre rotas (por exemplo, de Coleção ou Configurações de volta para o Fichário), o componente `BinderBookFlip` era desmontado e remontado do zero. A biblioteca `react-pageflip` (StPageFlip v2.0.7) demorava dezenas de milissegundos para ler o DOM e calcular sua matriz 3D, gerando frames pretos/vazios e cortes no ciclo de abertura.
   - Além disso, a virada manual de páginas acionava `onPageChange`, que disparava um `useEffect` enquanto a virada de 600ms ainda rodava (devido a um `isFlippingRef` resetado prematuramente por timeout de 100ms), forçando interrupções visuais na folha.

2. **Rolagem Brusca e Desnecessária ao Buscar Pokémon (`BinderControls`)**:
   - Ao realizar uma busca por um Pokémon já presente na tela ou na página ativa, o sistema executava incondicionalmente `element.scrollIntoView({ behavior: "smooth", block: "center" })`.
   - Essa ação forçava a tela a descer mesmo quando a carta pesquisada já estava 100% visível no viewport do usuário, quebrando o foco e a estabilidade da leitura.

## Decisão

1. **Aspect-Ratio Intrínseco no Container e Pré-Renderização da Capa**:
   - Em `src/app/globals.css`, adicionou-se proporção de aspecto fixa no container `.binder-book-stage` (`aspect-ratio: 960 / 710` no desktop e `aspect-ratio: 480 / 710` no mobile), com altura máxima delimitada.
   - Injetou-se `padding-bottom: 73.9583%` diretamente na classe nativa `.stf__wrapper`, impedindo que a engine do PageFlip inicialize o container com altura 0px antes do cálculo geométrico. A barra inferior (`BinderPageNav`) permanece cravada na mesma posição desde o primeiro frame, eliminando 100% do layout shift.
   - Enquanto o StPageFlip prepara os canvas de rotação 3D (`isBookEngineReady === false`), o `BinderBookFlip` renderiza imediatamente um componente de capa idêntico (`FrontCoverContent`), evitando telas pretas ou estados vazios.

2. **Posicionamento Natural Lateral sem Deslocamento Horizontal**:
   - O fichário nunca deve ser centralizado artificialmente via `transform: translateX(-25%)` quando fechado na Capa Frontal. Essa transição lateral forçava a geometria do container e causava anomalias e saltos na rolagem da página ("scroll buga").
   - O container permanece com `transform: none` fixo e estável. No desktop, a Capa Frontal (página 0 do StPageFlip em landscape) e seu placeholder inicial (`FrontCoverContent`) iniciam já posicionados no lado direito (`w-1/2 sm:ml-auto`), exatamente onde o livro físico se apoia quando fechado.
   - Ao disparar `readyToOpen`, a folha da capa vira suavemente para a esquerda via física 3D do StPageFlip, sem nenhum movimento do container e sem afetar a barra de rolagem da janela.

3. **Ciclo de Animação Fiel com `onChangeState`**:
   - Substituiu-se o temporizador frágil de 100ms pelo evento oficial `onChangeState` do StPageFlip (`"flipping"` e `"read"`), garantindo que nenhuma transição seja interrompida no meio da rotação.

4. **Rolagem Condicional Inteligente na Busca**:
   - Implementou-se a função utilitária pura `isElementFullyVisibleInViewport(element: Element): boolean`.
   - A função avalia as coordenadas do retângulo do slot (`getBoundingClientRect()`) em relação às dimensões da janela (`window.innerHeight` e `window.innerWidth`).
   - O método `handleNavigateToPokemon` verifica se o slot já se encontra 100% visível na tela. A rolagem suave (`scrollIntoView`) é executada **exclusivamente** caso qualquer parte do elemento esteja fora dos limites visíveis da viewport.
   - Caso a busca exija virada de página (`pageWillChange`), a verificação de visibilidade aguarda a conclusão da virada (650ms) antes de inspecionar a posição final do slot.

## Consequências

- **Estabilidade Visual Total**: O layout shift foi completamente erradicado; a navegação entre rotas e recarregamentos exibe o fichário instantaneamente em seu container proporcional.
- **Zero Deslocamento Lateral ou Bug de Scroll**: O container não desliza na tela. Ele começa já na posição natural da capa (à direita no desktop) e vira as folhas com estabilidade perfeita.
- **UX Polida na Busca**: A busca por Pokémon foca o slot sem rolar a página para baixo se a carta já estiver visível aos olhos do usuário.
- **Cobertura de Testes Automatizados**: Implementada suíte dedicada `tests/binder-scroll-and-flip.test.ts` validando todas as bordas e limites de visibilidade no viewport.
