# 9. Refinamento de UI/UX: Desobstrução das Cartas e Estabilidade Visual

Data: 2026-09-20

## Status

Aceito

## Contexto

Após a implementação da separação entre Coleção e Fichário (ADR 0007), foram identificados pontos de atrito visual e de legibilidade na interface:

1. Indicadores de cópias utilizavam textos estáticos com parênteses (ex: `1 exemplar(es) cadastrado(s)`), em vez de pluralização condicional elegante.
2. Efeitos de zoom (`scale-105`) e translação vertical (`-translate-y-1`) ao passar o mouse sobre as cartas geravam sensação de instabilidade ("cartas e botões pulando").
3. Os botões de ação na Coleção utilizavam gradientes avermelhados destoantes dos padrões do sistema, acompanhados de efeito de salto no hover.
4. Badges como `[✓ No Fichário]` e `[Full Art]` eram renderizadas sobre a ilustração das cartas, encobrindo detalhes importantes (nome, pontos de vida e ilustração da carta).
5. O efeito de brilho difuso (`glow`) e a película `holo-sheen` das Full Arts causavam poluição visual.
6. O slot do Fichário exibia a sigla de idioma em texto duplicado no rodapé, enquanto a bandeira não ficava alinhada ao número da Pokédex.

## Decisão

1. **Pluralização Dinâmica**:
    - Substituição total de textos estáticos com `(es)` ou `(s)`. O sistema agora avalia a contagem: `1 exemplar cadastrado` vs `{N} exemplares cadastrados`, bem como `1 exemplar 100% idêntico` vs `{N} exemplares 100% idênticos`.

2. **Estabilidade no Hover de Cartas**:
    - Removidos todos os efeitos de translação vertical (`hover:-translate-y-*`) e de escala (`group-hover:scale-105`) das cartas. O hover limita-se a realce suave de cores de borda e fundo.

3. **Padronização dos Botões**:
    - Botões no fluxo de coleção adotam a identidade visual azul padrão (`bg-blue-600 hover:bg-blue-500`), com `cursor: pointer` e transição de cores suave sem escalas ou saltos.

4. **Desobstrução Total da Arte da Carta e Badge Full Art Simplificada**:
    - Na Coleção (`/collection`), o selo "No Fichário" deixa de ser um botão flutuante sobre a imagem e passa a ser um ícone compacto (`BookOpen`) no cabeçalho superior do card.
    - A badge de Full Art foi simplificada para exibir exclusivamente a estrela (`Sparkles`) em formato ampliado, eliminando a sigla textual "FA".
    - Na página de detalhes (`/cards/[id]`), as badges `Full Art` e `No Fichário` foram retiradas de cima da ilustração e posicionadas externamente abaixo da arte, junto ao título e número da Pokédex.

5. **Remoção de Glow das Full Arts**:
    - Removida a sombra difusa e o efeito `holo-sheen` nas Full Arts. A distinção das cartas Full Art é preservada de forma limpa pela borda dourada elegante e pelo ícone estelar.

6. **Fichário Imersivo (Álbum Limpo)**:
    - Um slot preenchido no Fichário (`BinderSlot`) exibe exclusivamente a ilustração da carta ocupando 100% do espaço, eliminando números, ícones e nomes sobrepostos, emulando um álbum físico autêntico.
    - Slots vazios preservam o número da Pokédex, a silhueta em marca d'água com botão `+` e o nome do Pokémon.

7. **Acesso Unificado ao Acervo e Edição Direta**:
    - O clique em qualquer slot do Fichário (preenchido ou vazio) abre diretamente o modal com as cartas disponíveis para aquele Pokémon.
    - No modal, cópias idênticas são agrupadas com contador de quantidade (`x2`, `x3`...).
    - Cada item do modal disponibiliza o botão de vincular ao Fichário em formato compacto ("Exibir" acompanhado do ícone do livro) e um botão direto de "Editar" com ícone de lápis para inspecionar os detalhes físicos daquele exemplar em `/cards/[id]`.
    - O ícone do livrinho (`BookOpen`) foi equalizado com o mesmo tamanho da estrela (`Sparkles`, tamanho 13) nas listagens.
    - Remoção completa de bordas nos slots preenchidos do Fichário, garantindo que a arte da carta não apresente molduras ou linhas residuais de fundo.

8. **Alinhamento Vertical Preciso de Ícones e Textos**:
    - Nos botões de ação ("Exibir", "Em exibição" e "Editar"), ícones e textos foram perfeitamente centralizados utilizando `leading-none`, ícones SVG com tamanho uniforme (13px), `shrink-0` e alinhamento flexbox geométrico, eliminando qualquer desalinhamento visual entre ícone e rótulo.

9. **Estabilidade Absoluta na Coleção (Prevenção de Layout Shift e Movimento de Cards)**:
    - Aplicação de `scrollbar-gutter: stable` e `overflow-y: scroll` no elemento raiz (`html`) em `globals.css`, eliminando o Layout Shift horizontal decorrente do aparecimento/desaparecimento da barra de rolagem ao filtrar listas.
    - Substituição de `transition-all duration-200` por `transition-colors duration-150` nos cards da coleção e botões de filtro, impedindo que os cards sofram animações indesejadas de redimensionamento e reposicionamento.
    - Padronização de altura mínima nas seções de cabeçalho (`min-h-[26px]`) e rodapé (`min-h-[38px]`) dos cards, em conjunto com `auto-rows-fr` no CSS Grid, assegurando dimensões 100% uniformes e imutáveis independentemente dos filtros aplicados.

## Consequências

- **Positivas**:
    - A arte dos cards agora é 100% visível, sem obstruções por selos, películas ou bordas de fundo residuais no Fichário.
    - Layout dos botões no modal de seleção muito mais equilibrado, com ícones e textos rigorosamente alinhados no centro.
    - Navegação e filtragem na Coleção completamente estáveis, sem cards mudando de tamanho ou se movimentando ao aplicar filtros.
    - Experiência de navegação muito mais sólida e agradável, sem elementos que "pulam" ao passar o cursor.
    - Linguagem visual uniforme em toda a aplicação com ícones proporcionais.
    - Pluralização gramaticalmente correta em todos os contadores.
