# ADR 0017: Pré-carregamento e Compartilhamento de Cache de Imagens das Páginas do Binder

## Status

Aceito

## Contexto

Ao navegar pelas páginas do fichário (binder), observava-se atraso e carregamento visível das imagens de cartas e silhuetas de Pokémon nas próximas páginas.

A análise revelou quatro gargalos arquiteturais:

1. **Divergência de chave de cache:** O pré-carregamento utilizava `new window.Image().src = url` com as URLs brutas da CDN (`assets.tcgdex.net`), enquanto o componente de slot renderizava via `<Image />` do Next.js sem a propriedade `unoptimized`, roteando a requisição para o endpoint local `/_next/image?url=...`. Com URLs divergentes, o cache do navegador não era reaproveitado.
2. **Cálculo incompleto de spreads no Desktop:** Em visualização de desktop, cada spread possui 2 páginas (ex: `[1, 2]`, `[3, 4]`). A lógica anterior calculava apenas a página imediatamente anterior e posterior (`+1` e `-1`), omitindo a segunda página da spread adjacente.
3. **Bloqueio no agendamento do prefetch:** O disparo do pré-carregamento adjacente estava condicionado à conclusão de `currentImagesReady`, atrasando ou impedindo o início antecipado do download durante folheamento contínuo.
4. **Lazy loading tardio nos slots:** Apenas os slots com `dexId <= 2` recebiam prioridade, enquanto os demais aguardavam avaliação sob demanda do navegador.

## Decisões

1. **Compartilhamento de Cache Nativo via CDN Direta (`unoptimized`):**
    - Configurado `unoptimized` e `priority` nos componentes `<Image />` de [BinderSlot.tsx](file:///home/paulo_rosado/MyPokeBinder/src/components/binder/BinderSlot.tsx).
    - As imagens da CDN do TCGDex já são servidas no formato leve WebP (`/high.webp`) e as silhuetas são pequenos assets. A consulta direta garante que o cache em disco e memória populado pelo pré-carregamento (`preloadImages`) seja consumido com 100% de acerto imediato pelo componente visual.

2. **Cálculo Completo de Spreads Adjacentes:**
    - No desktop, a spread anterior e seguinte são resolvidas através de `getDesktopSpreadPages`, abrangendo ambas as páginas da dupla (ex: se na spread `[1, 2]`, pré-carregam-se integralmente as páginas `3` e `4`).
    - No mobile, as páginas individuais anterior e seguinte continuam sendo mapeadas de forma precisa.

3. **Disparo Antecipado e Não-Bloqueante:**
    - O agendamento de pré-carregamento das spreads adjacentes passa a ser disparado assim que os dados da coleção (`cardsMap`) estiverem disponíveis, sem depender de `currentImagesReady`.

4. **Cache em Memória de Pré-requisições:**
    - Adicionado controle via `Set` em [useImagePreloader.ts](file:///home/paulo_rosado/MyPokeBinder/src/lib/hooks/useImagePreloader.ts) para deduplicar e evitar instanciação redundante de objetos de imagem para URLs já pré-carregadas.

## Consequências

- A virada de páginas do binder torna-se instantânea, sem flicker ou visualização de slots carregando.
- Redução de carga e processamento de imagens sob demanda no servidor Node/Next.js local.
- Experiência fluida e ágil ao folhear o fichário tanto no desktop quanto no mobile.
