# 12. Glow Elemental Exclusivo de Busca, Animação de Queda e Padronização Binder

Data: 2026-09-20

## Status

Aceito

## Contexto

Identificaram-se oportunidades de melhoria na fidelidade visual e na experiência de usuário ao interagir com o álbum de cartas:

1. **Ativação indevida do efeito de glow**: Ao clicar em "Editar" no modal de seleção de carta e retornar da página `/cards/[id]`, o slot correspondente disparava a animação de pulso dourado (`slot-glow`), gerando estranheza visual, visto que nenhuma busca havia sido executada pelo usuário.
2. **Glow monocromático e genérico**: O efeito de destaque pulsante utilizava uma única cor amarela/dourada fixa para todos os Pokémon, desconsiderando a rica identidade visual baseada nos tipos elementares da franquia (Fogo, Água, Planta, Elétrico, Psíquico, etc.).
3. **Uso de glow ao inserir cartas**: Quando uma carta era adicionada ao álbum, ela ativava o mesmo brilho estático de busca, perdendo a oportunidade de criar uma transição tátil e satisfatória condizente com a sensação de colocar uma carta física no compartimento.
4. **Discrepância na nomenclatura**: O termo "Fichário" ainda era utilizado em vários pontos da interface e da base de código, contrastando com o nome oficial da aplicação e com a terminologia padrão da comunidade de colecionadores ("Binder").

## Decisão

1. **Separação Estrita de Navegação e Busca**:
    - Na página principal (`/`), a navegação por parâmetros (`dexId` ou `spread`) e o retorno da edição navegam e posicionam o viewport no slot sem ativar animações de destaque.
    - O botão de voltar na tela de edição (`/cards/[id]`) prioriza o histórico de navegação (`router.back()`) ou direciona para a página correspondente (`/?spread=X`), eliminando qualquer acionamento indevido de glow.
    - O estado `highlightedDexId` passa a ser ativado **exclusivamente** pelo fluxo de pesquisa ativa em `BinderControls`.

2. **Glow Elemental Dinâmico**:
    - Mapeados os tipos elementares primários de todos os 151 Pokémon da primeira geração (`grass`, `fire`, `water`, `electric`, `bug`, `normal`, `poison`, `ground`, `rock`, `fighting`, `psychic`, `ghost`, `ice`, `dragon`, `fairy`).
    - Criada função `getPokemonGlowColors(dexId)` que calcula anel de borda, brilho intenso e aura suave com base no elemento do Pokémon.
    - O `@keyframes slot-glow` em `globals.css` foi refatorado para utilizar variáveis CSS (`--glow-ring`, `--glow-bright`, `--glow-soft`), conferindo a cada Pokémon sua aura temática personalizada quando localizado via busca.

3. **Animação Física de Queda ("Card Drop")**:
    - Criada a animação `@keyframes card-drop` e a classe `.card-drop` com física de amortecimento (`cubic-bezier(0.22, 1, 0.36, 1)`): a carta surge levemente acima do slot com escala ampliada e sutil rotação angular, descendo suavemente e repousando com sombra de contato realista.
    - O acionamento de cartas selecionadas no acervo ou cadastradas via catálogo passa a ativar a propriedade `isDropping` por 1 segundo, substituindo totalmente o efeito de glow nessas ações.

4. **Padronização Global da Nomenclatura "Binder"**:
    - Todas as menções públicas e internas de "Fichário" foram atualizadas para "Binder" em toda a aplicação (Header, modais de busca e seleção, filtros e estados da Coleção, Dashboard, Login, metadados da aplicação e documentações).

## Consequências

- **Positivas**:
    - Comportamento de navegação e busca previsível, sem efeitos luminosos fantasmas ao retornar de edições.
    - Feedback visual temático impressionante e imersivo com cores de tipos autênticas de Pokémon ao pesquisar.
    - Sensação tátil e prazerosa de "colocar a carta na pasta" através da nova animação física de queda.
    - Vocabulário e identidade de marca 100% harmonizados como "Binder" em toda a aplicação.
