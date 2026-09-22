# 26. Sincronização Estrita de Loading e Pré-Carregamento de Imagens na Abertura do Binder

## Status

Aceito

## Contexto

Ao recarregar a página inicial do Binder (`/`) através de refresh (F5), observou-se que a animação de abertura do fichário (`react-pageflip`) abria com as páginas completamente vazias de cartas. Pouco tempo depois (após 1 a 2 segundos), todas as cartas apareciam repentinamente ao mesmo tempo ("pop-in" em massa).

A investigação identificou três fatores causais:

1. **Sinalização Prematura no Hook de Pré-carregamento (`useImagePreloader`)**:
   - Enquanto a requisição da API de cartas estava em andamento (`cardsLoading = true`), o hook recebia `enabled: false`.
   - Sob `enabled: false`, o hook executava `setAllLoaded(true)`, retornando antecipadamente `allLoaded = true` antes mesmo de iniciar o download dos assets.
2. **Ignorância da Espera de Imagens no Controle de Loading (`page.tsx`)**:
   - A condição de liberação de tela dependia de `(currentImagesReady || cards.length > 0)`.
   - Como o usuário possuía cartas, `cards.length > 0` tornava-se verdadeiro no exato instante em que o SWR recebia a resposta JSON da API, descartando a tela de carregamento (`PokeballLoader`) antes que as imagens WebP fossem baixadas da CDN do TCGDex.
   - O callback de montagem do livro (`handleBookReady`) também definia `hasBinderLoadedGlobally = true` e `setInitialLoaded(true)` de forma prematura aos 350ms.
3. **Disparo da Animação de Abertura Desacoplado do Término do Loading (`BinderBookFlip.tsx`)**:
   - O componente `BinderBookFlip` agendava a animação de virada para a página inicial (`flip.flip(targetPhysical)`) através de um `setTimeout` de 180ms dentro do evento `onInit`.
   - Isso fazia o livro abrir enquanto as imagens ainda estavam sendo baixadas pela rede, revelando compartimentos vazios durante a transição.

## Decisão

1. **Correção do Estado Inicial e Cache no `useImagePreloader`**:
   - Enquanto desabilitado (`!enabled`), `allLoaded` permanece estritamente como `false`.
   - Estabilização da lista de URLs monitoradas via chave de texto única (`urlsKey`).
   - Verificação segura de `img.complete` com trava de execução única (`isDone`), garantindo que imagens já mantidas em cache no navegador sejam contabilizadas sem disparos duplicados ou atrasos.
2. **Sincronização Atômica da Tela de Carregamento (`showLoading`)**:
   - O callback `handleBookReady` sinaliza unicamente a prontidão dimensional da engine gráfica do livro (`setIsBookReady(true)`).
   - O `showLoading` permanece ativo cobrindo a tela até que:
     - Os dados da API estejam carregados (`!cardsLoading`), E
     - Todas as imagens e silhuetas do spread inicial estejam 100% baixadas no navegador (`currentImagesReady`), E
     - O livro esteja medido e montado no DOM (`isBookReady`).
3. **Disparo da Abertura do Binder Conectado ao `readyToOpen`**:
   - Adicionada a prop `readyToOpen={!showLoading}` ao `BinderBookFlip`.
   - O livro mantém-se fechado na Capa Frontal enquanto o loading de tela inteira estiver visível.
   - Quando o loading se encerra e a tela é revelada, um temporizador suave de 200ms aciona a dobra e abertura do fichário.
   - Como todos os arquivos de imagem daquele spread já foram baixados durante a permanência do `PokeballLoader`, cada carta já se encontra pintada no DOM: as ilustrações e efeitos 3D são exibidos imediatamente durante todo o movimento de rotação da folha, com zero slots vazios e zero pop-in.

## Consequências

- **Experiência Visual Imersiva**: O usuário nunca visualiza o fichário abrindo com slots em branco. A virada revela instantaneamente as cartas físicas em seus devidos lugares.
- **Carregamento Honesto**: A Pokébola de loading só é ocultada quando os assets visuais estão de fato prontos para apresentação na tela.
- **Resiliência a Conexões Lentas**: O timeout de segurança (4s a 5s) impede que falhas de rede em alguma imagem travem a aplicação indefinidamente.
- **Conformidade de Testes e Qualidade**: 118 testes unitários passando, 0 erros no linter e conformidade estrita com a regra de ausência de comentários no código.
