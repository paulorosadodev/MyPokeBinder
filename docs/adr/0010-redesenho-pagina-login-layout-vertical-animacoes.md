# 10. Redesenho da Página de Login: Layout Vertical à Direita e Fundo Animado com Pokémon

Data: 2026-09-20

## Status

Aceito

## Contexto

A página de autenticação anterior apresentava um card centralizado estático que continha no rodapé um divisor com os dizeres "151 Pokémon • 9 Páginas • TCGdex". Para tornar a experiência de entrada muito mais imersiva, moderna e conectada ao universo Pokémon, foi solicitada a remoção desse rodapé específico, a transformação do layout para uma área vertical de autenticação alinhada à direita e a inclusão de ilustrações oficiais de Pokémon em movimento contínuo no plano de fundo.

## Decisão

1. **Remoção de Elementos Textuais Obsoletos no Card de Login**:
    - Eliminado o bloco `"151 Pokémon • 9 Páginas • TCGdex"` que se encontrava no rodapé do formulário.

2. **Divisão Estrutural com Coluna Vertical à Direita**:
    - A página de login passa a adotar uma divisão em duas regiões:
        - **Lado Esquerdo / Fundo Panorâmico**: ocupa todo o restante da tela (`flex-1`), exibindo um painel tipográfico sofisticado de boas-vindas e uma ambientação visual profunda.
        - **Coluna Vertical à Direita**: container vertical (`lg:w-[480px] xl:w-[520px]`) com fundo escuro translúcido (`bg-[#0c101a]/85 backdrop-blur-2xl`), borda sutil à esquerda e altura total da tela, centralizando o formulário de login com Google e a logomarca da Pokébola.
    - No mobile, o layout adapta-se de forma responsiva ocupando a largura total sem perda de legibilidade.

3. **Plano de Fundo com Ilustrações Oficiais Animadas (`PokemonBackground`)**:
    - Criação de um componente dinâmico de fundo com um conjunto selecionado de 12 Pokémon icônicos da 1ª geração (Charizard, Gengar, Pikachu, Mew, Blastoise, Dragonite, Eevee, Mewtwo, Snorlax, Venusaur, Gyarados, Alakazam).
    - As ilustrações utilizam as artes oficiais com aceleração por GPU (`transform: translate3d(...)`), distribuídas em camadas de profundidade com tamanhos escalonados, opacidades calibradas, atrasos de animação variados e sombras luminosas temáticas correspondentes a cada tipo elemental (fogo, fantasma, elétrico, psíquico, etc.).

## Consequências

- **Positivas**:
    - Primeira impressão do aplicativo muito mais impactante, moderna e dinâmica.
    - O formulário de login permanece desobstruído, ergonômico e com alta legibilidade na barra lateral direita.
    - Eliminação de informações redundantes no rodapé do formulário.
    - Desempenho suave a 60fps+ através de transformações CSS aceleradas por hardware.

## Nota posterior

A linguagem visual do painel esquerdo e do fundo (feature cards glass, gradients multicolor, neon elemental) foi refinada no [ADR 0043](./0043-refinamento-visual-anti-slop-pagina-login.md). O layout split e a coluna de autenticação à direita permanecem.
