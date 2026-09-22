# 21. Animação 3D Tilt Leve na Coleção e Modais

Data: 2026-09-20

## Status

Aceito

## Contexto

A experiência tátil de colecionar cartas físicas de Pokémon TCG conta com a animação tridimensional interativa via `Card3DTilt`. Anteriormente, para evitar fadiga visual e instabilidade durante buscas ou filtragens na Coleção (`/collection`), a animação 3D havia sido completamente desabilitada nessa página (ADR 0011).

No entanto, a ausência total de interatividade na Coleção e nos modais de seleção e busca (`BinderSlotSelectModal` e `CardSearchModal`) deixava a navegação puramente estática. Era necessário introduzir o efeito 3D nessas áreas, mas em uma **versão mais leve**, sem aumento de escala (`scale={1}`), sem mover ou distorcer os elementos externos dos cards (cabeçalhos, números da Pokédex, tags de status, botões de ação e títulos), concentrando a movimentação suave estritamente na imagem da carta dentro do seu compartimento.

## Decisão

1. **Aprimoramento do Componente `Card3DTilt` com Deslocamento Suave (`maxMove`)**:
    - Adicionado o parâmetro opcional `maxMove?: number` no `Card3DTilt`. Quando definido, calcula deslocamentos suaves no plano (`translate3d(moveX, moveY, 0)`) proporcionais à distância do cursor em relação ao centro da carta.
    - Ao retirar o cursor (`handleMouseLeave`), o componente retorna suavemente ao estado neutro de repouso (`rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0) scale3d(1, 1, 1)`).

2. **Versão Leve na Coleção (`/collection`)**:
    - Removidas as restrições artificiais de `overflow-hidden` e fundo escuro rígido (`bg-[#0d1017]`) que cortavam as bordas da carta durante a inclinação 3D e criavam a impressão visual de a carta estar presa dentro de uma cavidade.
    - A carta passa a flutuar com sua sombra projetada suave natural (`drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]`).
    - A imagem da carta na grade da Coleção é envolvida com o `Card3DTilt` leve configurado com:
        - `scale={1}` (sem ampliação ou aumento de tamanho da carta);
        - `maxTilt={8}` (inclinação angular sutil e elegante, em vez dos 15° padrão);
        - `maxMove={3}` (deslocamento tátil de até 3px no plano, simulando profundidade e movimento físico dentro do card sem encostar nas margens);
        - `glareOpacity={0.2}` (reflexo de luz holográfico suave);
        - `perspective={900}`.
    - O container externo do card (borda, número `#001`, tags Full Art/Binder, nome do Pokémon e expansão) permanece estático e estável no grid, sem saltos ou deformações.

3. **Versão Leve nos Modais com Cartas (`BinderSlotSelectModal` e `CardSearchModal`)**:
    - No `BinderSlotSelectModal`:
        - As cartas do catálogo disponíveis no acervo para o Pokémon selecionado utilizam a mesma versão leve sem cortes (`overflow-hidden` e `bg-[#0d1017]` removidos, adicionado `drop-shadow`), operando com `scale={1}`, `maxTilt={8}`, `maxMove={3}`, `glareOpacity={0.2}`.
        - A prévia da carta ativa no desktop foi ajustada para manter `scale={1}` e `maxTilt={10}`, eliminando ampliações que pudessem desalinhar a coluna de visualização.
        - Os botões interativos ("Em exibição / Remover" e "Editar") mantêm estabilidade e operabilidade direta.
    - No `CardSearchModal`:
        - As cartas retornadas da busca no catálogo da API exibem o efeito 3D leve na imagem sem cortes (`drop-shadow` e sem `overflow-hidden`/`bg-[#0d1017]`), permitindo sentir a tridimensionalidade da arte antes de adicionar o exemplar à coleção.

## Consequências

- **Positivas**:
    - Experiência visual coesa, premium e tátil em toda a aplicação.
    - Fim da instabilidade ou fadiga: a ausência de aumento de escala (`scale={1}`) preserva o grid perfeitamente alinhado sem sobrepor cards vizinhos.
    - Foco exclusivo na arte da carta, mantendo textos e botões legíveis e fáceis de clicar.
