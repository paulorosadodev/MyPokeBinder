# 37. Versão Física da Carta e Brilho 3D

## Status

Aceito (atualizado: holo e foil/reverse agora visualmente distintos + idle shimmer)

## Contexto

A TCGdex expõe, por edição de carta, quais acabamentos existem (`variants.normal`, `variants.holo`, `variants.reverse`). O colecionador precisa marcar qual impressão física possui, e o binder deve refletir isso visualmente no tilt 3D. Antes, a identidade de cópia era só `tcgdex_card_id` + `card_language`, misturando Normal/Holo/Reverse no mesmo contador. Em várias edições (ex.: Furious Fists Rare) as flags `variants` da API estão incompletas — a carta física é Holo, mas a API marca só `normal`.

## Decisão

1. **Coluna `card_variant`** em `user_cards` (`normal` | `holo` | `reverse`, default `normal`), escolhida na adição e editável em `/cards/[id]`.
2. **Opções sempre liberadas**: o select sempre oferece Normal / Holo / Reverse. Flags da TCGdex só sugerem o default (`defaultVariant`); não bloqueiam a escolha do colecionador.
3. **Cópias idênticas** passam a exigir igualdade também em `card_variant`.
4. **`CardShineMode`**: `"none"` | `"foil"` | `"holo"` | `"prismatic"`.
5. **Precedência e `Card3DTilt.shineMode`**:
   - `prismatic` em primeiro lugar quando a raridade é Full Art (`isFullArtRarity`) — prevalece sobre a variante física;
   - `holo` quando a variante for `holo` em cartas não-Full Art (efeito arco-íris multicolorido vibrante);
   - `foil` quando a variante for `reverse` em cartas não-Full Art (laminação metálica com pattern de círculos e halos concêntricos);
   - `none` caso contrário (carta padrão sem acabamentos especiais).
6. **Diferenciação visual mesmo sem hover (parada)**:
   - **Acabamento fixo permanente**: cartas especiais exibem uma camada contínua visível mesmo paradas (Holo: tonalidade iridescente perolada + borda prismática; Foil: pattern de círculos metálicos prateados reflexivos + moldura platina). Cartas normais não possuem nenhum acabamento extra.
   - **Máscara da janela de arte na Reverse**: na carta Reverse Foil, o pattern de círculos e o sheen metálico são recortados via `mask-image` nas bordas, topo e caixa de ataques, mantendo a janela de ilustração do Pokémon 100% limpa e sem círculos, exatamente como nas cartas Reverse Holo físicas oficiais.
   - **Shimmer contínuo sem cortes**: feixe de luz que desliza suavemente de fora a fora da carta via `translate3d`, sem cortes ou quebras no meio do ciclo, com intervalo de respiração natural entre as passagens.
   - **Desativação em configurações**: ao desativar animações/efeitos nas configurações da conta, todos os efeitos visuais de cartas (incluindo o pattern de círculos da Reverse/Foil e a camada estática) são totalmente removidos.
7. **Retorno suave ao sair do hover (`mouseleave`)**:
   - Ao retirar o cursor de uma carta com efeito 3D (na Coleção, Destaques do Perfil, Binder ou modais), a carta retorna à rotação e escala originais de forma suave via `cubic-bezier(0.23, 1, 0.32, 1)` com duração de 500ms, eliminando qualquer estalo ou retorno brusco.
   - A transição interpola individualmente cada eixo na lista de funções (`perspective(...) rotateX(0deg) rotateY(0deg) translate3d(0px,0px,0) scale3d(1,1,1)`), definindo `CARD_3D_REST_TRANSFORM` (`none`) apenas após o término do movimento para preservar a compatibilidade com a composição de camadas do PageFlip.
   - O brilho e reflexo (`.holo-sheen`, `.foil-sheen`, `.card-glare`) desvanecem suavemente (`opacity`) sincronizados ao retorno físico, mantendo transição rápida (60ms linear) apenas enquanto o cursor está ativamente em hover sobre a carta.

## Consequências

- Exemplares Normal e Reverse da mesma edição aparecem separados na Coleção e no seletor do binder.
- Cartas Holo e Reverse têm efeitos visuais distintos no tilt e no idle.
- Cartas antigas migram como `normal` até o usuário corrigir na edição.
- Foils detalhados (`variants_detailed` / cosmos / pokeball) ficam fora de escopo.
- O usuário pode marcar Holo mesmo quando a TCGdex omite a flag (caso Victreebel Furious Fists e similares).
