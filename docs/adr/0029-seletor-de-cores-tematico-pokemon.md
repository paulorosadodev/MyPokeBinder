# 29. Seletor de Cores Temático Pokémon com 6 Cards Oficiais Selecionáveis e Pokébolas Vetoriais

Data: 2026-09-21

## Status

Aprovado

## Contexto

Na página de configurações (`/configuracoes`), a seleção de temas e cores utilizava círculos monocromáticos simples e genéricos, desprovidos da rica identidade do universo Pokémon. O objetivo foi transformar a seção de "Tema e Cores do Treinador" em uma experiência temática direta, limpa e coesa, focada estritamente nos 6 temas oficiais da franquia, sem elementos de sobrecarga visual (como consoles de preview redundantes ou sintetizadores cromáticos externos) e sem emissão de efeitos sonoros invasivos durante a troca de cores.

## Decisões

1. **Cards Temáticos Oficiais Integrados (`PokemonThemeSelector.tsx`)**:
   - A seção de Tema e Cores do Treinador passa a conter estritamente os **6 cards selecionáveis oficiais**, dispostos em ordem de Pokédex no grid responsivo:
     - **Venusaur Emerald**: Safari Ball vibrante, sprite do Venusaur (#003), tipo Planta e tonalidade `#10b981`.
     - **Charizard Red**: Poké Ball clássica, sprite do Charizard (#006), tipo Fogo e tonalidade `#ef4444`.
     - **Blastoise Blue**: Great Ball icônica, sprite do Blastoise (#009), tipo Água e tonalidade `#3b82f6`.
     - **Pikachu Amber**: Ultra Ball elegante, sprite do Pikachu (#025), tipo Elétrico e tonalidade `#f59e0b`.
     - **Gengar Purple**: Master Ball suprema, sprite do Gengar (#094), tipo Fantasma e tonalidade `#8b5cf6`.
     - **Mew Pink**: Love Ball mística, sprite do Mew (#151), tipo Psíquico e tonalidade `#ec4899`.

2. **Pokébolas Vetoriais em SVG e Propagação Universal (`PokemonBallSvg.tsx`, `PokeballLogo.tsx`, `PokeballLoader.tsx`)**:
   - Renderização vetorial precisa das Pokébolas oficiais correspondentes a cada tema (Poké Ball, Great Ball, Ultra Ball, Master Ball, Safari Ball, Love Ball).
   - **Sem escala de aumento na Pokébola ao selecionar**: ao ser selecionada, a Pokébola não sobrecarrega o layout com efeito de escala, mantendo seu tamanho fixo com apenas o glow luminoso suave (`drop-shadow`).
   - **Propagação em Toda a Aplicação**: o desenho e estilo vetorial da Pokébola temática ativa são propagados universalmente por toda a aplicação:
     - No componente de logo do cabeçalho (`PokeballLogo.tsx`);
     - Em todas as telas e spinners de carregamento (`PokeballLoader.tsx`);
     - Na capa frontal do fichário/binder (`BinderBookFlip.tsx`);
     - No favicon dinâmico atualizado via SVG data URL no navegador.

3. **Sprites Fixos e Títulos Sem Quebra de Linha (`whitespace-nowrap`)**:
   - Os sprites dos Pokémon nos cards de tema permanecem estáticos e perfeitamente alinhados, sem efeitos de escala ou movimento ao passar o cursor, garantindo estabilidade visual.
   - Nomes de temas e de Pokébolas possuem restrição rígida contra quebra de linha (`whitespace-nowrap`), garantindo alinhamento tipográfico linear em todas as larguras de tela.

4. **Carregamento Sem Piscamento na Página de Configurações (`/configuracoes`)**:
   - Para evitar qualquer flash/flicker enquanto as imagens dos 6 Pokémon são baixadas, a página de configurações executa um pré-carregamento assíncrono em memória de todos os sprites.
   - A página exibe o `PokeballLoader` e só renderiza a interface completa quando os sprites já estiverem 100% carregados.

5. **Experiência Limpa e Sem Sobrecarga Visual**:
   - Removidos consoles redundantes de pré-visualização ao vivo e laboratório de sintetizador cromático, mantendo a tela direta, limpa e sem poluição visual.
   - A seleção ocorre de forma silenciosa e instantânea via toast feedback discreto, sem disparar efeitos sonoros repetitivos a cada clique.

6. **Metadados Oficiais dos Presets (`THEME_PRESETS`)**:
   - Preservados os 6 presets canônicos em `UserSettingsContext.tsx` mantendo total retrocompatibilidade e validação nas suítes de testes automatizados.

## Consequências

- Interface de configurações limpa, focada e esteticamente conectada ao universo Pokémon, sem oscilações visuais ou piscamentos durante o carregamento inicial.
- Identidade visual unificada em todo o produto: a Pokébola temática selecionada reflete com fidelidade em logos, capas, spinners e favicons.
- Zero comentários em código e 100% de conformidade com os testes automatizados e regras de estilo do projeto.
