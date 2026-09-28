# 57. Barra de Rolagem Personalizada com o Tema do Usuário

## Status

Aceito

## Contexto

O MyPokeBinder disponibiliza personalização cromática para treinadores via seletor oficial de temas (`UserSettingsContext`, `/configuracoes`), definindo a identidade de cada perfil através de cores dinâmicas injetadas via CSS variables (`--theme-primary` e `--theme-primary-glow`).

Anteriormente, a barra de rolagem (scrollbar) do navegador utilizava estilização estática com tons de cinza escuro (`#242c3d` e `#37435c`) com trilha sólida `#0d1117`, desvinculada das preferências estéticas do usuário e sem suporte para navegadores baseados no Gecko (Firefox), que exibiam a scrollbar nativa padrão.

## Decisão

1. **Thumb Dinâmico e Reativo ao Tema**:
   - Em repouso, o thumb da barra de rolagem utiliza uma mescla sutil e elegante da cor temática do usuário com a paleta dark do app (`color-mix(in srgb, var(--theme-primary, #ef4444) 38%, #202738)`).
   - O acabamento adota cantos arredondados contínuos (`border-radius: 9999px`), borda transparente (`border: 2px solid transparent`) e `background-clip: padding-box`, criando um efeito de pílula flutuante e sofisticada independente do fundo do contêiner.

2. **Estados Interativos com Iluminação e Glow**:
   - No estado `:hover`, o thumb ganha intensidade cromática (`color-mix(in srgb, var(--theme-primary, #ef4444) 82%, #ffffff 15%)`) e projeta uma aura suave (`box-shadow: 0 0 10px var(--theme-primary-glow)`).
   - No estado `:active` (quando o usuário clica e arrasta), o thumb assume integralmente a cor do tema (`var(--theme-primary)`) com realce luminoso ampliado (`box-shadow: 0 0 14px var(--theme-primary-glow)`).

3. **Trilha Minimalista e Integrada**:
   - A trilha (`::-webkit-scrollbar-track`) adota fundo transparente, harmonizando-se sem cortes com o plano de fundo do layout (`--bg-primary`, modais e gavetas).

4. **Suporte Multi-Navegador**:
   - Aplicação de regras padronizadas W3C (`scrollbar-width: thin` e `scrollbar-color`) com isolamento via `@supports (-moz-appearance: none)` para o Firefox, garantindo que o WebKit mantenha o design de pílula flutuante e cantos arredondados sem conflitos de renderização.

## Consequências

- A navegação vertical e horizontal da aplicação reflete com naturalidade o Pokémon e tema escolhido pelo treinador (Venusaur, Charizard, Blastoise, Pikachu, Gengar ou Mew).
- Eliminação de barras de rolagem cinzas genéricas na janela principal e em contêineres internos roláveis (modais e catálogo).
- Preservação da fluidez a 60/120 FPS por meio de estilização em CSS nativo sem carga de renderização no React.
