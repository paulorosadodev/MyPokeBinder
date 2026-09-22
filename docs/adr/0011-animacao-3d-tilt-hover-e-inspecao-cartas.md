# 11. Animação 3D Tilt, Hover e Inspeção Centralizada de Cartas

Data: 2026-09-20

## Status

Aceito

## Contexto

Para aumentar a imersão e simular a experiência tátil de colecionar cartas físicas de Pokémon TCG, foi implementado o componente `Card3DTilt` com perspectiva tridimensional e reflexo de luz (glare) dinâmico que segue a posição do cursor.

No entanto, diferentes áreas da aplicação possuem propósitos distintos de navegação e inspeção, exigindo comportamentos específicos de interação:

1. Na **Coleção** (`/collection`), o usuário realiza varredura e filtragem rápida do acervo; animações 3D excessivas ou saltos geravam fadiga visual e instabilidade.
2. No **Fichário** (`/`), ao passar o mouse sobre uma carta preenchida, ela deve se destacar aumentando de tamanho suavemente, mas permanecendo em seu respectivo slot no grid ("ficar no mesmo lugar"). Além disso, no desktop, ao clicar em um slot, deve abrir a carta em tamanho grande com efeito 3D ao lado do modal de seleção, permitindo trocar a carta ativa com atualização imediata da prévia em tempo real sem fechar o modal prematuramente.
3. Na **Página de Edição / Detalhes** (`/cards/[id]`), a carta possuía uma moldura/borda artificial escura que obscurecia a arte. A ampliação para visualização centralizada na tela deve ser ativada exclusivamente via clique explícito, fechando ao clicar novamente na carta, no botão X ou apertando a tecla Esc.

## Decisão

1. **Remoção de Animação 3D na Coleção (`/collection`)**:
    - A listagem da coleção não utiliza `Card3DTilt` nem efeitos de escala/zoom.
    - Mantém-se apenas a transição sutil de cor de borda e fundo do container para sinalizar interatividade sem instabilidade visual.

2. **Remoção de Borda e Moldura Artificial na Edição (`/cards/[id]`)**:
    - Removidas todas as classes de borda (`border border-white/15`), fundo escuro rígido (`bg-[#0d1017]`) e espaçamento duplo (`p-2`) que formavam uma caixa retangular em volta da carta.
    - A carta agora flutua limpa, com sua sombra projetada natural (`drop-shadow`).

3. **Inspeção por Clique na Edição (`/cards/[id]`)**:
    - A visualização ampliada e centralizada na tela ativa **exclusivamente no clique** sobre a carta (`onClick`), evitando ativações acidentais no mero deslocamento do cursor.
    - No estado padrão, o hover sobre a carta na coluna executa o efeito 3D Tilt in-place.
    - Ao estar ampliada em modo de inspeção (`fixed inset-0`), a carta fecha e retorna ao normal ao:
        - Clicar na própria carta novamente;
        - Clicar no botão de fechar (`X`);
        - Clicar no plano de fundo escurecido (`backdrop`);
        - Pressionar a tecla `Escape`.

4. **Fichário: Hover no Mesmo Lugar, Carta Grande Escalável e Responsividade (`/`)**:
    - No hover do grid do fichário (`BinderSlot`), o `Card3DTilt` opera com `scale={1.15}` aumentando de tamanho a partir do centro do próprio slot sem sair do lugar, com elevação de camada (`z-index: 30` / `40`) para não sofrer cortes.
    - Em telas desktop (`lg:` e superiores), o modal `BinderSlotSelectModal` exibe layout lado a lado:
        - À esquerda: a carta em destaque em tamanho grande com perspectiva e reflexo holográfico 3D interativo (`Card3DTilt`), escalando suavemente de `240px` (em `lg`), `300px` (em `xl`) até `340px` (em `2xl`).
        - À direita: o painel com as cartas disponíveis no acervo para aquele Pokémon, com grid adaptativo (`lg:grid-cols-2 xl:grid-cols-3`).
    - Em telas menores (`< lg`, tablets e smartphones), a carta grande lateral é ocultada (`hidden lg:flex`), conferindo largura total ao modal para que os cards não fiquem espremidos.
    - Textos de ação ("Em exibição" e "Exibir") e badges de idioma possuem `whitespace-nowrap` e `min-w-0`, eliminando qualquer quebra indesejada de linha ou colisão entre botões em larguras compactas. O botão "Editar" preserva seu ícone em telas menores e expande com rótulo textual em telas maiores.
    - Ao selecionar ou trocar a carta no modal, o modal **não se fecha automaticamente**: a carta grande à esquerda atualiza instantaneamente para a nova carta selecionada, o badge "Em exibição" é atualizado no painel e a persistência é enviada ao servidor. Ao fechar o modal, a nova escolha já se encontra aplicada no Fichário.

## Consequências

- **Positivas**:
    - Controle deliberado e sem fadiga visual na página de detalhes.
    - Experiência rica e fluida de troca de cartas no Fichário desktop com prévia em alta definição instantânea.
    - Fidelidade física e visual de um verdadeiro álbum de colecionador.
