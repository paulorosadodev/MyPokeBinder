# 24. Folheamento Realista do Binder com Física de Páginas, Capas Rígidas e Contenção de Layout

## Status

Aceito

## Contexto

A experiência de navegação do Binder de Pokémon 151 necessitava de uma imersão tátil que reproduzisse a sensação genuína de manusear um binder físico de colecionador. 

Demandas e limitações identificadas:
1. **Abertura e Fechamento Físico**: O usuário desejava a experiência de abrir o fichário ao carregar a aplicação, bem como a liberdade de fechá-lo navegando pelas setas até a página 0 (Capa Frontal) e até a página final (Contracapa Traseira).
2. **Eliminação de Mensagens Intrusivas**: Na página posterior à 17, mensagens promocionais com troféus ou congratulações quebravam a estética sóbria e limpa do binder físico.
3. **Instabilidade de Scroll durante Animação ("Página Sambando")**: Durante o giro 3D das páginas, coordenadas poligonais dos vértices das folhas rotacionadas excediam temporariamente a caixa delimitadora do container, forçando o navegador a recalcular a barra de rolagem e gerando trepidação vertical.

## Decisão

1. **Adoção do `react-pageflip` (StPageFlip v2.0.7)**:
    - Integrada a biblioteca `react-pageflip` com `PageSheet` e `forwardRef` para gerenciar a árvore do React em perfeita harmonia com o motor gráfico do StPageFlip.
    - Ativada a diretiva `showCover: true` para renderização de capas rígidas com comportamento individual em spread landscape.

2. **Estrutura de 22 Páginas Físicas com 2 Capas, 2 Contracapas e Folhas no Meio**:
    - **Página 0 (Capa Frontal Externa)**: Capa dura rígida (`data-density="hard"`) com relevo em couro escuro, selo oficial de Pokémon 151 e logotipo de Pokébola centralizado.
    - **Página 1 (Contracapa Frontal Interna)**: Folha flexível (`data-density="soft"`) limpa de textos, com uma Pokébola grande centralizada geometricamente tanto horizontal quanto verticalmente (`absolute inset-0 flex items-center justify-center`) em transparência sutil (`opacity-20`), posicionada à esquerda do primeiro spread aberto.
    - **Páginas 2 a 18 (Catálogo Oficial 151 - Páginas 1 a 17)**: Folhas flexíveis plásticas (`data-density="soft"`), onde a Página 1 do catálogo situa-se na face direita da abertura inicial. As páginas subsequentes formam spreads pares/ímpares `[2, 3]`, `[4, 5]`, ..., `[16, 17]`.
    - **Página 19 (Verso da Última Folha de Plástico - Slots Vazios)**: Folha flexível (`data-density="soft"`) que reproduz fielmente o verso da folha física do Mew, contendo a grade 3x3 de 9 compartimentos vazios de plástico (`EmptyBackSheet`), posicionada à esquerda do spread final.
    - **Página 20 (Contracapa Traseira Interna)**: A segunda contracapa do fichário, posicionada à direita do spread final, com a mesma Pokébola grande centralizada horizontal e verticalmente em marca d'água elegante.
    - **Página 21 (Capa Traseira Externa)**: Contracapa dura rígida (`data-density="hard"`) com grande Pokébola monocromática minimalista em cinza e branco vetorial.

3. **Abertura Automática e Transições Fluidas**:
    - Ao montar, o binder inicia fechado na Capa Frontal (`startPage: 0`).
    - Um temporizador suave abre o fichário para o catálogo inicial (página 1 à direita) com velocidade otimizada.
    - O avanço e o recuo pelas setas operam de forma atômica e direta, eliminando qualquer repetição ou avanço duplo de páginas.

4. **Navegação Bidirecional Completa (0 a 19) e Acesso Total à Capa Traseira**:
    - As setas e o teclado permitem navegar desde a página 0 (capa frontal) até a página 19 (capa traseira fechada).
    - No spread final aberto (página 18: slots vazios na esquerda + contracapa traseira na direita), a seta direita permanece ativa (`currentPage < 19`), permitindo virar a folha e fechar o álbum na Capa Traseira Externa (página 19).
    - Na Capa Traseira Externa fechada (página 19), a seta esquerda permite reabrir o álbum de volta ao spread final.
    - No ambiente mobile/touch, a animação de retorno é garantida sem bloqueio de cantos (`disableFlipByClick: false` e `showPageCorners: false`), preservando o clique direto nos slots de cartas.
    - Sincronização responsiva no breakpoint de 768px (`md`): telas menores operam em modo retrato (1 página fluida e legível) com controles superiores e barra de navegação móvel, enquanto telas a partir de 768px expandem em modo paisagem (2 páginas lado a lado).
    - No ambiente mobile/touch, a animação de retorno é garantida sem bloqueio de cantos (`disableFlipByClick: false` e `showPageCorners: false`), preservando o clique direto nos slots de cartas.
    - Sincronização responsiva no breakpoint de 768px (`md`): telas menores operam em modo retrato (1 página fluida e legível) com controles superiores e barra de navegação móvel, enquanto telas a partir de 768px expandem em modo paisagem (2 páginas lado a lado).

5. **Contenção Estrita de Layout e Desbloqueio de Clipping 3D**:
    - Ajustado o `overflow` de `.binder-book-page` e de `PageSheet` para `visible`, eliminando qualquer corte reto das cartas em efeito 3D tilt/scale (`scale: 1.15`), permitindo que a carta salte organicamente para fora do slot com sombra projetada e sem clipping.
    - Sintonizada a altura proporcional do `HTMLFlipBook` (`height: 710px` com `maxHeight: 820px`), assegurando espaço vertical confortável para que a grade 3x3 de slots (de proporção 2.5/3.5) respire livremente em harmonia com o cabeçalho e o rodapé da página.
    - Preservados `overflow: hidden`, `contain: paint` e `box-sizing: border-box` no `.binder-book-stage` e `.binder-flipbook-root`, além de `perspective: 2000px; overflow: hidden; contain: paint layout;` no `.stf__block`, isolando totalmente a matemática 3D de rolagem indesejada de tela.

## Consequências

- **Positivas**:
    - Fidelidade física absoluta: a primeira página de cartas fica isolada no lado direito, ladeada pela contracapa com a marca d'água de Pokébola estilizada e apagada.
    - Encerramento limpo sem slots vazios artificiais ou mensagens intrusivas, exibindo a contracapa traseira elegante antes do fechamento total.
    - Cartas da linha inferior e das bordas livres de corte ao receber animação de zoom e 3D tilt, com expansão suave e natural.
    - Rodapé e cabeçalho da página 100% visíveis e espaçados com acabamento premium.
    - Folhas internas com curvatura suave e orgânica (`soft`), eliminando a projeção rígida sobre o seletor de páginas.
    - Ausência de avanços duplos acidentais ao trocar de página no mobile ou desktop.
    - Responsividade harmoniosa sem sobreposição de elementos em viewports intermediários.
    - 116 testes unitários aprovados e 0 erros de lint.
