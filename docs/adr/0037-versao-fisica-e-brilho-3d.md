# 37. Versão Física da Carta e Brilho 3D

## Status

Aceito (atualizado: opções sempre liberadas)

## Contexto

A TCGdex expõe, por edição de carta, quais acabamentos existem (`variants.normal`, `variants.holo`, `variants.reverse`). O colecionador precisa marcar qual impressão física possui, e o binder deve refletir isso visualmente no tilt 3D. Antes, a identidade de cópia era só `tcgdex_card_id` + `card_language`, misturando Normal/Holo/Reverse no mesmo contador. Em várias edições (ex.: Furious Fists Rare) as flags `variants` da API estão incompletas — a carta física é Holo, mas a API marca só `normal`.

## Decisão

1. **Coluna `card_variant`** em `user_cards` (`normal` | `holo` | `reverse`, default `normal`), escolhida na adição e editável em `/cards/[id]`.
2. **Opções sempre liberadas**: o select sempre oferece Normal / Holo / Reverse. Flags da TCGdex só sugerem o default (`defaultVariant`); não bloqueiam a escolha do colecionador.
3. **Cópias idênticas** passam a exigir igualdade também em `card_variant`.
4. **`Card3DTilt.shineMode`**:
   - `prismatic` quando a raridade é Full Art (`isFullArtRarity`) — prevalece;
   - `foil` quando a versão é `holo` ou `reverse`;
   - `none` caso contrário (glare branco padrão).

## Consequências

- Exemplares Normal e Reverse da mesma edição aparecem separados na Coleção e no seletor do binder.
- Cartas antigas migram como `normal` até o usuário corrigir na edição.
- Foils detalhados (`variants_detailed` / cosmos / pokeball) ficam fora de escopo.
- O usuário pode marcar Holo mesmo quando a TCGdex omite a flag (caso Victreebel Furious Fists e similares).
