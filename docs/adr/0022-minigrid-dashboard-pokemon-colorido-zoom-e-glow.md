# 22. Mini-Grid do Dashboard com Pokémon Colorido, Zoom Suave e Glow Temático do Card

Data: 2026-09-20

## Status

Aceito

## Contexto

Na página de Dashboard (`/dashboard`), o Mini-Grid dos 151 Pokémon apresentava comportamentos visuais que comprometiam a legibilidade e a ergonomia estética:

1. **Ilegibilidade da miniatura do card**: Ao preencher um slot, a interface renderizava a imagem da carta física completa (`card_image_url`). Por estar restrita a uma célula quadrada compacta de 54px, elementos textuais, símbolos de energia e bordas do card ficavam indistinguíveis e sobrecarregados visualmente.
2. **Zoom excessivo no hover**: A interação de hover aplicava uma escala de 10% (`scale-110`), fazendo com que o slot expandisse excessivamente e invadisse a área dos slots vizinhos em uma grade de alta densidade.
3. **Ausência de glow temático**: A elevação no hover utilizava uma sombra preta padrão opaca (`shadow-black/70`), sem diálogo cromático com o status do card ou a identidade visual da aplicação.

## Decisão

1. **Exibição do Pokémon Colorido em Slots Preenchidos**:
    - Em vez de renderizar a carta física completa, slots preenchidos (`slot.is_filled`) passam a exibir a ilustração oficial colorida do Pokémon em alta resolução (`/pokemon/gen1/${dexId}.png`) com efeito de `drop-shadow`.
    - Slots vazios continuam exibindo a silhueta escurecida monocromática (`silhouette-img` com opacidade atenuada).
    - O resultado proporciona uma Pokédex visual nítida, com o Pokémon em destaque centralizado e número da Pokédex legível no topo esquerdo.

2. **Ajuste Ergonômico de Zoom no Hover**:
    - A transição de escala no hover foi calibrada para uma micro-elevação de `scale-[1.02]` com curva suave (`transition-all duration-200 ease-out`), proporcionando feedback tátil sutil sem expandir de forma incômoda ou cobrir os cards vizinhos.

3. **Glow Temático na Cor do Card**:
    - Adicionado efeito de glow harmonizado com o status e a cor de cada card:
        - **Variantes Full Art**: Aura âmbar/dourada vibrante (`shadow-[0_0_15px_rgba(251,191,36,0.65)]`) e realce de borda `border-amber-300` no hover, com brilho ambiente suave em repouso.
        - **Cartas Preenchidas Regulares**: Aura esmeralda vibrante (`shadow-[0_0_15px_rgba(16,185,129,0.65)]`) e realce de borda `border-emerald-400` no hover, com brilho ambiente suave em repouso.
        - **Slots Vazios**: Realce neutro translúcido sutil (`shadow-[0_0_8px_rgba(255,255,255,0.12)]`) no hover.

## Consequências

- **Positivas**:
    - Visual limpo, imersivo e imediatamente identificável para cada um dos 151 Pokémon no dashboard.
    - Interação de hover suave e sem sobreposição agressiva entre células no grid denso.
    - Identidade visual coerente com a paleta de cores do dashboard (esmeralda para preenchido e âmbar para full art).
