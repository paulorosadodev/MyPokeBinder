# ADR 0043: Refinamento Visual Anti-Slop da Página de Login

Data: 2026-09-22

## Status

Aceito

## Contexto

O [ADR 0010](./0010-redesenho-pagina-login-layout-vertical-animacoes.md) estabeleceu o layout split (painel panorâmico à esquerda + coluna de autenticação à direita) e o fundo animado com silhuetas. A implementação acumulou padrões típicos de UI gerada por IA: pill com status pulsante, grade de três cards glass idênticos, headline com gradient multicolor, CTA com glow vermelho, blobs roxo/azul e drop-shadows neon por tipo elemental.

A landing pública (`LandingPage`) já usa linguagem de produto mais limpa (fan de cartas TCG reais, CTA flat `#ef4444`, wordmark `from-white to-slate-400`). O login precisava alinhar-se a essa linguagem sem abandonar o split imersivo.

## Decisão

1. **Layout split preservado** (ADR 0010 permanece válido estruturalmente).
2. **Painel esquerdo vira product visual**:
   - Removidos pill, feature cards glass e faixa de middle-dots.
   - Headline funcional + subtexto curto + fan de três cartas TCG reais (`Card3DTilt` + assets TCGdex), no mesmo espírito da landing.
3. **Coluna de auth**:
   - Superfície sólida `bg-[#0c101a]` (sem glass em cascata).
   - Wordmark com o mesmo gradient de marca da landing.
   - Botão Google flat `bg-[#ef4444] hover:bg-[#dc2626]`, sem `shadow-*-glow` nem gradient no botão.
4. **Fundo atenuado**:
   - Login envolve `PokemonBackground` com opacity baixa + scrim, como a landing.
   - `PokemonBackground` ganha `intensity?: "quiet" | "full"` (default `full` para a landing). Em `quiet`, remove blobs azul/roxo, usa sombra neutra nas silhuetas e opacidades menores.

## Consequências

- Login e landing compartilham identidade (cartas reais, accent único vermelho, tipografia de marca).
- Menos ruído visual e menos tells de UI genérica na primeira tela pós-CTA.
- Landing continua com `intensity` default (`full`); login usa `quiet` sem forçar mudança estética na home.
