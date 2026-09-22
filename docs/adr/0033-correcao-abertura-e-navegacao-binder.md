# 33. Correção do Loading, Estabilidade de Scroll e Navegação das Folhas Finais do Binder

## Status

Aceito

## Contexto

Foram identificados 4 comportamentos anômalos no ciclo de carregamento e folheamento do fichário digital (`/`):

1. **Ausência de Loading Inicial**:
   - Ao acessar o fichário (`/`), enquanto a requisição SWR de cartas (`/api/binder`) estava pendente, a interface renderizava imediatamente o esqueleto do cabeçalho e controles com uma capa estática e nenhum indicador de carregamento, deixando o usuário sem feedback sobre o processamento em andamento.

2. **Bug de Recuo nas Últimas Páginas**:
   - Ao folhear o fichário até a última folha de cartas (Páginas 16 e 17, spread físico 9 `[17, 18]`) e tentar avançar para a contracapa (spread 10 `[19, 20]`) ou para a capa traseira fechada (spread 11 `[21]`), o fichário retrocedia automaticamente para a página 16/17 em vez de prosseguir e fechar o livro.
   - A causa raiz residia em inconsistência no mapeamento físico: o spread 10 reportava `catalogPage = 17`, cujo `targetPhysical` mapeava de volta para o spread 9 (`18`), disparando o `useEffect` de sincronização de página e executando `flip(18)`.

3. **Salto de Scroll na Montagem do Livro**:
   - O fichário iniciava fechado e, subitamente, a barra de rolagem da janela sofria um salto brusco momentos antes da animação de abertura.
   - Durante a montagem inicial do componente `HTMLFlipBook`, o motor `StPageFlip` executava medição com largura 0px antes da resolução do layout flexbox. Com a propriedade `usePortrait={true}` ativa incondicionalmente, a biblioteca assumia temporariamente a orientação *portrait*, aplicando inline `padding-bottom: 147.916%` no `.stf__wrapper` (dobrando a altura vertical para mais de 1600px). Logo em seguida, a medição se estabilizava em *landscape* e reduzia a altura para 73.95%, provocando um salto visível na rolagem.

4. **Piscar e Abertura na Página 2 ao Retornar ao Binder**:
   - Ao navegar para outras rotas (ex: `/collection`) e retornar para o Binder (`/`), o componente remontava. A inicialização temporária em *portrait* calculava os spreads considerando 1 página por abertura, mapeando a folha 2 para o spread 2. Ao mudar para *landscape*, o spread 2 correspondia às páginas 2 e 3 do catálogo, fazendo com que o fichário piscasse e abrisse incorretamente na Página 2.

## Decisão

1. **Estado de Carregamento Explícito com `PokeballLoader`**:
   - Em `BinderClientPage.tsx`, adicionou-se a verificação `cardsLoading && cards.length === 0`, exibindo centralizadamente o componente `PokeballLoader` com a mensagem `"Carregando seu fichário..."`.
   - O carregamento das cartas ocorre antes da exibição do livro. Assim que os dados estão disponíveis, o fichário é montado com as cartas e silhuetas já prontas, liberando imediatamente a abertura sem esperas artificiais.

2. **Funções Puras e Mapeamento Físico Bidirecional Estável**:
   - Foram implementadas e exportadas em `src/lib/pokemon/constants.ts` as funções puras `getSpreadLeftIndex`, `catalogPageToPhysicalIndex` e `physicalIndexToCatalogPage`.
   - O mapeamento cobre com precisão matemática todas as 22 folhas físicas do fichário:
     - Capa frontal fechada: spread 0 (`physical 0` <-> `catalogPage 0`)
     - Capa frontal aberta / Página 1: spread 1 (`physical [1, 2]` <-> `catalogPage 1`)
     - Páginas de catálogo 2 a 17: spreads 2 a 9 (`catalogPage = physicalIndex - 1`)
     - Contracapa / Forro traseiro: spread 10 (`physical [19, 20]` <-> `catalogPage 18`)
     - Capa traseira fechada: spread 11 (`physical [21]` <-> `catalogPage 19`)
   - O `useEffect` de sincronização valida `currentSpreadLeft !== targetSpreadLeft`, assegurando que folhear para as folhas 18 e 19 nunca dispare recuos espúrios.

3. **Orientação Condicional ao Dispositivo (`usePortrait={Boolean(isMobile)}`)**:
   - O prop `isMobile` foi integrado ao `BinderBookFlip`.
   - Em telas desktop (`isMobile === false`), `usePortrait` é configurado estritamente como `false`. O motor `StPageFlip` fica impossibilitado de calcular spreads em *portrait* ou injetar alturas expandidas de 147%.
   - Em dispositivos móveis (`isMobile === true`), `usePortrait` permanece ativo conforme a ergonomia em coluna única.

4. **Travamento de Altura no CSS**:
   - Em `src/app/globals.css`, o seletor `.stf__wrapper` recebeu `padding-bottom: 73.9583% !important;` e `max-height: 820px;` no desktop, sobrepondo qualquer tentativa de injeção dinâmica de estilos de altura durante a inicialização.

5. **Aprimoramento da Contracapa**:
   - A folha `EmptyBackSheet` foi reformulada para exibir título `"Contracapa"` e identificador `"Kanto 151"`, eliminando rótulos incorretos de página inexistente.

## Consequências

- **Feedback Imediato**: A transição para a rota `/` apresenta feedback de carregamento claro e temático enquanto os dados do usuário são baixados.
- **Folheamento Completo e Estável**: O usuário pode folhear da página 1 até o encerramento do fichário (Página 16/17 -> Contracapa -> Capa traseira) sem travamentos ou recuos indesejados.
- **Zero Salto de Scroll**: A altura do fichário permanece cravada na proporção de aspecto correta desde o primeiro instante de renderização.
- **Abertura Confiável na Página 1**: Transições entre rotas preservam a abertura correta na Capa / Página 1 sem piscar na Página 2.
- **Cobertura de Testes**: Suíte de testes automatizados expandida em `tests/binder-scroll-and-flip.test.ts` com 100% de sucesso.
