# 07: Painel Retrátil de Estatísticas do Binder

**What to build:** O usuário pode clicar no botão "Estatísticas" no cabeçalho do binder para abrir um painel retrátil (drawer/gaveta limpa) que exibe as métricas dinâmicas do fichário (taxa de metas preenchidas e taxa de ocupação física, ou apenas ocupação física se o binder for 100% de slots livres) e um mapa visual compacto de todos os slots. Clicar em qualquer slot do mapa fecha o painel e folheia o fichário instantaneamente até a página correspondente, destacando o compartimento.

**Blocked by:** 05: Visualizador de Binder (/binders/[id]) com Suporte a Grids 1x1, 2x2, 3x3 e 3x4, 06: Três Tipos de Slots e Interação de Alocação

**Status:** done

- [x] O cabeçalho do visualizador disponibiliza o botão "Estatísticas" com ícone dedicado e contagem resumida.
- [x] O painel retrátil desliza suavemente sobre o binder sem bloquear a barra superior de controles.
- [x] O painel calcula e exibe as métricas dinâmicas: se houver metas (slots de Pokémon ou de Carta), exibe "X / Y Metas" e "Z / Total Ocupados"; se o binder for 100% livre, exibe apenas a métrica de ocupação física.
- [x] O mapa visual de slots exibe miniaturas compactas fiéis: ilustrações coloridas para Pokémon alocados e silhuetas para vazios; miniaturas de cartas para cartas alocadas e desbotadas para vazias; cartas alocadas e contorno pontilhado para livres.
- [x] O clique em qualquer slot do mapa visual fecha o painel de estatísticas, folheia o binder até a página de destino e dispara o pulso luminoso de destaque no slot.
