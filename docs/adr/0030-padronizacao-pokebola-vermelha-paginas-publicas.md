# ADR 0030: Padronização das Pokébolas no Vermelho Clássico em Páginas Públicas

## Status
Aceito

## Contexto
O MyPokeBinder oferece personalização cromática para os usuários através do seletor de temas (`UserSettingsContext` e `/configuracoes`), permitindo definir cores personalizadas (ex: Master Ball roxo, Great Ball azul, Safari Ball verde, etc.) injetadas via CSS variables (`--theme-primary` e `--theme-primary-glow`).

Anteriormente, o componente `PokeballLogo` consumia a variável `--theme-primary` por padrão sem distinção de contexto. Com isso, quando um usuário logado que selecionou um tema personalizado acessava páginas institucionais e públicas (como Início `/` e `/inicio`, Termos de Serviço `/termos` e Política de Privacidade `/privacidade`), as Pokébolas dessas páginas eram renderizadas com a cor personalizada do usuário.

Foi estabelecida a regra de negócio de que a cor personalizada selecionada pelo usuário destina-se exclusivamente ao escopo interno da aplicação (Fichário 3×3, Coleção, Dashboard, Perfil, Detalhes da Carta, etc.). Nas páginas de acolhimento institucional e públicas, todas as Pokébolas devem manter fixo o vermelho clássico (#ef4444) da identidade visual Pokémon.

## Decisão
1. **Aprimoramento do Componente `PokeballLogo`**:
   - Ajustado o cálculo do filtro de sombra (`glowStyle`) para que, quando a propriedade `color` for fornecida explicitamente, a cor do efeito drop shadow/glow seja derivada diretamente de `color` (via `color-mix(in srgb, ${color} ...)`), impedindo que uma Pokébola com cor explícita continue brilhando na cor global da variável `--theme-primary-glow`.
2. **Fixação da Cor Vermelha nas Páginas Públicas**:
   - Componentes institucionais compartilhados (`PublicHeader` e `PublicFooter`) passam a instanciar `<PokeballLogo ... color="#ef4444" />`.
   - Seções de destaque da Landing Page pública (`LandingPage`) passam a instanciar `<PokeballLogo ... color="#ef4444" />`.
   - Páginas pré-autenticação e de erro (`/login` e `/not-found`) recebem `<PokeballLogo ... color="#ef4444" />`.
3. **Escopo da Personalização do Usuário**:
   - O tema personalizado do usuário continua funcionando integralmente nas visões da aplicação interna (`Header`, capa do binder `BinderBookFlip`, loaders `PokeballLoader`, filtros e controles).

## Consequências
- Consistência de marca e identidade nas páginas públicas e institucionais, independente do estado de autenticação ou tema configurado pelo usuário.
- Prevenção de vazamento estético da cor customizada para a apresentação pública da plataforma.
- A experiência interna da aplicação preserva 100% da flexibilidade de personalização do colecionador.
