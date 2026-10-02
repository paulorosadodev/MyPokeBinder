# 55. Estabilização da Animação de Folheamento e Eliminação de Piscos de Loading

## Contexto

Em dispositivos móveis (e conexões móveis), foram identificados dois comportamentos visuais indesejados no binder:
1. **Pisco de loading no primeiro acesso ao binder**: Ao abrir o binder pela capa (`animateFromCover: true`), o processo aguardava o download completo via CDN de todas as imagens de cartas da página 1 (`useImagePreloader`) antes de montar o elemento do binder. Como essa espera ultrapassava a tolerância de 400ms (`LOADER_DELAY_MS`), o componente disparava o spinner de carregamento da Pokebola (`PokeballLoader`). Logo após, quando as imagens carregavam e a capa montava e abria, o spinner desaparecia subitamente ou sobrepunha a animação da capa. Além disso, rotas dinâmicas acionavam `router.replace` do Next.js, suspendendo o boundary de `<Suspense fallback={<BinderOpeningLoader />}>` e forçando um remount com flash do loader.
2. **Glitch de posições e cartas da página anterior piscando durante o folheamento**: Durante a virada de página (folheamento em andamento), o evento `onChangeState` notificava o estado `"flipping"`, atualizando `isPageBusy` e disparando uma re-renderização no React. Sem a propriedade `renderOnlyPageLengthChange` configurada no `<HTMLFlipBook>`, a biblioteca `react-pageflip` invocava `setPages(childList)` a cada re-renderização, que por sua vez acionava `pageFlip.updateFromHtml(...)`. No motor do `page-flip`, esse método limpava completamente o DOM do binder (`distElement.innerHTML = ""`) e chamava `this.pages.show(e)` de volta para a página anterior no meio do voo 3D da folha, causando a recriação abrupta de todos os nós de cartas, reset de slots e o surgimento fantasma da página anterior.

## Decisão

1. **Ativação de `renderOnlyPageLengthChange={true}` no `HTMLFlipBook`**:
   - Configurada a propriedade nativa `renderOnlyPageLengthChange={true}` no `<HTMLFlipBook>` em `BinderBookFlip.tsx`.
   - O array de folhas do binder é estável e fixo em 21 nós (capas, guardas e páginas de catálogo). Com essa flag, o `react-pageflip` não aciona `setPages` nem `updateFromHtml` durante atualizações de estado ou re-renderizações acionadas pelo contexto ou pelo evento de folheamento.
   - As folhas e slots individuais continuam sendo atualizados reativamente pelo React através de `BinderCardsContext`, sem destruição ou recriação do DOM durante a animação de flip.

2. **Desacoplamento do Pré-carregamento de Imagens da Montagem da Capa (`isBinderDataReady`)**:
   - Criada a função pura `isBinderDataReady` em `src/lib/pokemon/binderOpen.ts`.
   - Quando a abertura do binder é iniciada pela capa fechada (`openPlan.animateFromCover: true`), o binder não bloqueia sua montagem aguardando o download de imagens de cartas que ainda estão ocultas atrás da capa.
   - O binder é montado imediatamente assim que os metadados das cartas estão carregados (`!cardsLoading`), inicializando o motor 3D em ~30ms e impedindo que o timeout de 400ms do loader seja atingido.
   - As imagens da página inicial e páginas adjacentes continuam sendo pré-carregadas em paralelo no cache do navegador durante a animação de abertura da capa (que dura 820ms).
   - Quando o acesso for direto a uma página interna sem animação de capa, a espera pelo pré-carregador de imagens permanece ativa para garantir que a página não apareça vazia.

3. **Substituição de `router.replace` por `window.history.replaceState`**:
   - Em `BinderClientPage.tsx`, as chamadas de sincronização de parâmetros de URL (`/?page=X`) após a navegação interna ou abertura do modal agora utilizam `window.history.replaceState`.
   - Isso elimina as transições de rota do App Router do Next.js e evita que a fronteira `<Suspense fallback={<BinderOpeningLoader />}>` seja suspensa, prevenindo qualquer desmonte e recriação do componente de binder.

## Consequências

- Abertura suave e cinematográfica do binder sem qualquer surgimento intempestivo de tela ou spinner de loading.
- Folheamento suave a 60fps tanto em dispositivos móveis quanto no desktop, com transições contínuas sem destruição do DOM, sem desorganização de slots e sem piscadas de cartas da página anterior.
