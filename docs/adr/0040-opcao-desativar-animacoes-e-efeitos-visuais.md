# 40. Opção de Desativação de Animações e Efeitos Visuais

## Status

Aceito

## Contexto

Usuários com dispositivos de entrada, aparelhos móveis com menor capacidade de processamento gráfico ou com sensibilidade a movimentos (vestibular motion) demandavam uma forma de desativar as animações ricas da aplicação, em particular:
1. O efeito de inclinação 3D (`perspective` e `rotateX/rotateY`) e reflexo holográfico dinâmico sob o cursor/toque nas cartas.
2. A animação física de folhear as páginas do álbum (`page-flip`), incluindo a sequência de riflar páginas e o tempo de rotação das folhas.

## Decisão

1. **Preferência e Isolamento por Dispositivo via `localStorage`**:
   - As animações são tratadas como preferência local de hardware/desempenho (`localStorage` com a chave `mypokebinder_animations_enabled`), permitindo que dispositivos diferentes (ex: celular e desktop) mantenham configurações independentes.
   - Sincronização entre abas do mesmo dispositivo via evento `storage`, sem sincronizar ou sobrescrever remotamente outros dispositivos via Realtime.
   - Propagação global no `UserSettingsContext` através das propriedades `animationsEnabled` e `setAnimationsEnabled`.
   - Injeção do atributo `data-animations-enabled` no elemento raiz (`document.documentElement`).

2. **Desativação Centralizada no Componente `Card3DTilt`**:
   - Quando `animationsEnabled === false`, o componente bloqueia os cálculos no `requestAnimationFrame`, neutraliza o transform CSS (`rotateX(0deg) rotateY(0deg) translate3d(0,0,0) scale3d(1,1,1)`), remove reflexos dinâmicos (`opacity: 0`) e suprime as classes de brilho holográfico/foil.

3. **Navegação Instantânea e Abertura no Fichário (`BinderBookFlip`)**:
   - Quando `animationsEnabled === false`, o fichário desliga os eventos de mouse e toque (`useMouseEvents = false`, `disableFlipByClick = true`, `drawShadow = false`), impedindo que o usuário segure, dobre cantos ou arraste as folhas manualmente.
   - A navegação ocorre de forma imediata via `pageFlip.turnToPage(target)` em vez de `pageFlip.flip(target)`.
   - Em **qualquer largura de tela** com animações desativadas, o álbum abre diretamente na Página 1 do catálogo por padrão, sem o efeito/atraso de abertura a partir da capa (mantendo a opção de voltar à capa manualmente caso o usuário queira).
   - Adaptação dinâmica contínua: redimensionar a tela entre desktop e mobile alterna fluidamente entre 2 páginas (landscape) e 1 página (portrait) sem necessidade de recarregar a página.
   - O comportamento respeita tanto a chave manual de configurações quanto a preferência do sistema operacional (`prefers-reduced-motion: reduce`).

4. **Queda da Carta e Partículas (`BinderSlot` / `CardImpactBurst`)**:
   - Quando `animationsEnabled === false`, a classe `card-drop` e o componente `CardImpactBurst` (partículas elementais) não são aplicados ao inserir uma carta no binder.
   - O efeito sonoro de impacto permanece governado pela preferência independente de som (`soundEnabled`), tocando imediatamente quando as animações estão desligadas.

5. **Interface Otimizada na Tela de Configurações (`/configuracoes`)**:
   - Seção **Animações e Efeitos** com switch toggle em cards simétricos e compactos, indicando atuação no dispositivo atual.

## Consequências

- **Positivas**:
  - Maior acessibilidade e fluidez para usuários em celulares e computadores modestos.
  - Navegação ultrarrápida entre páginas para quem prefere consultar o catálogo sem delays de transição física.
  - Centralização limpa: desativar a chave reflete instantaneamente em todo o binder, coleção, detalhes de cartas e modais sem redundância de código.
