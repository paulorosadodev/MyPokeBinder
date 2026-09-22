# 23. Cache de Sessão de Silhuetas e Otimização de Transição entre Binder e Dashboard

## Status

Aceito

## Contexto

Ao navegar entre o Binder (`/`), a Coleção (`/collection`) e o Dashboard (`/dashboard`), o mini-grid dos 151 slots recarregava visualmente todas as imagens e reaplicava os efeitos de skeleton shimmer a cada visita, mesmo quando os arquivos de imagem já estavam armazenados em cache de disco e memória pelo navegador.

As causas identificadas foram:

1. **Desmontagem do Estado React no Dashboard**: O estado de imagens carregadas residia no ciclo de vida local do componente `DashboardPage`. Ao alternar de rota, o componente era desmontado e o conjunto era reiniciado como vazio, forçando todas as 151 imagens a iniciarem com `opacity-0` e skeleton shimmer visível.
2. **Disparo Repetido de Eventos Assíncronos no DOM**: Mesmo com a imagem disponível instantaneamente no cache HTTP local (`/pokemon/gen1/${dexId}.png`), a reinserção de novos elementos `<img>` no DOM exigia que o navegador disparasse o evento `onLoad` individualmente para cada uma das 151 imagens, gerando re-renderizações no container pai e acionando transições CSS em lote.
3. **Re-renderizações no Hover**: O hover dos 151 slots era rastreado via `hoveredSlot` no estado React do `DashboardPage`, reprocessando todo o grid e cards de estatísticas a cada movimento do cursor.
4. **Reaproveitamento de Imagens entre Telas**: Os arquivos de silhueta e ilustrações oficiais são compartilhados entre os slots vazios do Binder, modais de seleção, catálogo da Coleção e o mini-grid do Dashboard (`/pokemon/gen1/${dexId}.png`). Como utilizam a propriedade `unoptimized`, a URL requisitada ao navegador é rigorosamente idêntica em todas as telas, garantindo o mesmo cache HTTP e eliminando duplicações de download. No entanto, o estado de carregamento do React não se comunicava entre essas interfaces.

## Decisão

1. **Cache Compartilhado em Memória de Sessão com Guard SSR (`loadedSilhouetteCache`)**:
    - Criado conjunto a nível de módulo em `src/lib/pokemon/constants.ts` acompanhado dos helpers `markSilhouetteLoaded` e `isSilhouetteLoaded`.
    - Implementado guard de ambiente (`typeof window !== 'undefined'`) conforme a regra `server-no-shared-module-state` da Vercel para impedir mutações no processo do servidor durante SSR.
    - O cache persiste durante toda a sessão do usuário na Single Page Application (SPA), sobrevivendo às desmontagens e remontagens de rotas.

2. **Registro Descentralizado de Carregamento**:
    - `BinderSlot` (fichário), `BinderSlotSelectModal` (modal de seleção), `CollectionPage` (catálogo) e `DashboardMiniSlot` (mini-grid) registram as silhuetas carregadas via `markSilhouetteLoaded(dexId)`.

3. **Componente Memoizado `DashboardMiniSlot` com Estado Isolado**:
    - Conforme as regras `rerender-memo` e `rerender-split-combined-hooks`, cada slot do mini-grid foi extraído para o componente memoizado `DashboardMiniSlot`.
    - Cada slot gerencia seu próprio carregamento (`useState(() => isSilhouetteLoaded(dexId))`). O carregamento de cada imagem re-renderiza exclusivamente o slot correspondente, sem provocar re-renderizações no `DashboardPage` nem nos cards de estatísticas do topo.

4. **Transições de Hover 100% em CSS Puro (GPU)**:
    - Removido o estado `hoveredSlot` do React e os listeners `onMouseEnter`/`onMouseLeave`.
    - Toda a elevação (`hover:scale-[1.02] hover:z-10`) e os glows temáticos (âmbar para Full Art, esmeralda para preenchido e neutro para vazio) passaram a ser executados exclusivamente via classes utilitárias nativas do Tailwind CSS (`hover:...`), rodando diretamente na GPU com zero custo de re-renderização no React.

5. **Renderização Condicional Explícita**:
    - Conforme a regra `rendering-conditional-render`, os esqueletos de shimmer utilizam operador ternário explícito (`!isLoaded ? <Skeleton /> : null`).

## Consequências

- **Positivas**:
    - Eliminação completa do efeito de piscar ou "recarregar" as 151 imagens ao navegar para o Binder e retornar ao Dashboard.
    - Zero re-renderizações no componente pai `DashboardPage` e nos cards de estatísticas durante o carregamento progressivo das 151 imagens.
    - Hover fluido a 60/120 FPS nos 151 slots sem tocar na thread de renderização do React.
    - Isolamento de estado em conformidade com as melhores práticas de SSR e RSC da Vercel.
    - Reutilização transparente dos mesmos assets estáticos entre Binder, Coleção, Modais e Dashboard.
