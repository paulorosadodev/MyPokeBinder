# 06: Três Tipos de Slots e Interação de Alocação

**What to build:** No visualizador do binder, cada slot renderiza e responde estritamente conforme seu tipo: Slot Livre (bolso escuro com borda pontilhada limpa sem mini Pokébola; clique abre a coleção completa do usuário para escolha), Slot de Pokémon Específico (silhueta oficial do Pokémon 1..1025; clique abre cartas daquele Pokémon), e Slot de Carta Específica (arte desbotada/apagada no fundo; se não possuir, exibe modal informando a falta com botão para buscar e registrar no catálogo). A alocação de cartas respeita rigorosamente a posse física estrita (1 exemplar físico = no máximo 1 slot de 1 binder por vez).

**Blocked by:** 02: Catálogo Expandido e Adição Direta de Cartas na Coleção, 05: Visualizador de Binder (/binders/[id]) com Suporte a Grids 1x1, 2x2, 3x3 e 3x4

**Status:** done

- [x] Slots do tipo Livre vazios são renderizados com moldura de bolso escuro e contorno pontilhado limpo (sem mini Pokébola), e o clique abre a coleção do usuário para vinculação.
- [x] Slots do tipo Pokémon vazios exibem a silhueta escura oficial do Pokémon (#001 a #1025), e o clique abre as cartas que o usuário possui daquele Pokémon na coleção.
- [x] Slots do tipo Carta vazios exibem a arte da carta TCGdex desbotada e apagada no fundo. Ao clicar, se o usuário tiver a carta na coleção, coloca no slot com 1 toque; se não tiver, o modal exibe a mensagem de ausência e o botão para registrar a carta pelo catálogo.
- [x] Cartas alocadas cobrem 100% do slot com sua ilustração física de ponta a ponta sem poluição visual, exibindo animação física de descida suave e áudio de impacto caso ativado.
- [x] Os endpoints `POST /api/binders/[id]/slots/[slotId]/assign` e `DELETE /api/binders/[id]/slots/[slotId]/assign` realizam a alocação e desalocação atômica, impondo a posse física estrita e rejeitando cartas já alocadas em outro slot com HTTP 409.
