# Adiamento da Exibição da Carta no Binder até o Fechamento do Modal com Animação de Queda

Status: Aceito

## Contexto
Ao adicionar ou selecionar uma nova carta no Binder através do modal (`BinderSlotSelectModal` ou `CardSearchModal`), a mutação no cache do SWR provocava a renderização instantânea da carta no slot do binder ao fundo, enquanto o modal ainda permanecia aberto. Isso quebrava a fluidez visual e estragava a surpresa da animação de inserção: quando o usuário fechava o modal, a carta já estava visível e parada no slot antes de sofrer a animação de queda (`card-drop`).

## Decisão
1. **Preservação Visual do Estado Prévio do Slot:** Enquanto o modal de seleção ou busca estiver ativo (`selectModalOpen` ou `searchModalOpen`), as páginas do binder utilizam `displayCardsMap`. Caso uma nova carta seja vinculada ao slot (`pendingDropDexId`), o slot no fundo preserva o estado inicial em que se encontrava ao abrir o modal (vazio ou com a carta anterior), impedindo que a nova carta apareça antes do fechamento.
2. **Disparo Imediato e Sincronizado da Animação de Queda:** Ao fechar o modal (`handleCloseSelectModal`), o estado pendente é liberado em conjunto com a ativação de `droppingDexId`. Assim, a carta faz sua primeira aparição no DOM já iniciando no topo com opacidade zero e caindo até o slot (`card-drop`), acompanhada pelo impacto de partículas e áudio correspondente.
3. **Pré-carregamento Transparente:** O mapa original (`cardsMap`) continua sendo utilizado para o pré-carregamento de imagens em segundo plano, garantindo que o asset da nova carta já esteja completamente em cache quando a animação de queda for executada.
