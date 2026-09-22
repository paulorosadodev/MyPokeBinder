# 25. Perfil Público do Treinador, Vitrine de Cartas Raras e Centralização de Configurações e Sessão

## Status

Aceito

## Contexto

A barra de navegação superior (`Header`) acumulava elementos utilitários dispersos (botão de configurações, botão de logout e informações textuais), poluindo a experiência visual. Além disso, os colecionadores não dispunham de um espaço centralizado onde pudessem visualizar seu progresso como treinador, compartilhar sua coleção com terceiros ou destacar suas cartas mais valiosas e raras.

Demandas identificadas:
1. **Header Focado e Limpo**: Remover os botões isolados de configurações e de logout do topo, mantendo exclusivamente a identidade visual, navegação de páginas e o componente unificado de avatar/nome do usuário.
2. **Perfil Público do Treinador (`/perfil`)**: Ao clicar no avatar ou nome no Header, o usuário deve ser conduzido para uma página de perfil pública contendo métricas do binder, contagem de exemplares físicos, total de cartas Full Art e uma vitrine de suas cartas mais raras.
3. **Classificação Oficial e Ordenação de Raridades**: A vitrine de cartas raras deve ser ordenada pelo valor oficial de raridade da API TCGdex (do nível Special Illustration Rare e Secret Rare até cartas comuns), sem repetição da mesma edição física.
4. **Centralização de Configurações e Sessão (`/configuracoes`)**: O acesso às configurações deve ser realizado a partir do perfil do treinador, e o encerramento seguro de sessão ("Sair da conta") deve ser realocado dentro das configurações na seção de Conta e Sessão.

## Decisão

1. **Simplificação da Barra de Navegação (`Header.tsx`)**:
    - Removidos os botões isolados de configurações e logout.
    - O avatar e o nome do usuário foram encapsulados em um `<NextLink href="/perfil">` com indicação de rota ativa quando em `/perfil`.
    - Mantida a integridade responsiva no desktop e no mobile.

2. **Endpoint de Perfil do Treinador (`GET /api/profile`)**:
    - Autenticado via Supabase SSR.
    - Agrega os dados do usuário, progresso distinto do binder (slots 1 a 151 preenchidos), total físico da coleção e contagem de cartas Full Art.
    - Calcula o ranking de raridade através do helper `getRarityScore` em `src/lib/pokemon/rarity.ts`.
    - Deduplica cartas de mesma edição (`tcgdex_card_id`), mantendo a carta mais recente ou mais relevante na vitrine de destaque.
    - Fornece a distribuição quantitativa das cartas por faixas de raridade.

3. **Página de Perfil do Treinador (`/perfil/page.tsx`)**:
    - Desenvolvida com estética de *Trainer Card* em vidro escuro com partículas de luz ambiente.
    - Hero com avatar em alta resolução, botão de compartilhamento com cópia para área de transferência via clipboard e atalho direto para Configurações.
    - Grid de estatísticas com barra de progresso do binder (1 a 151), total de cartas físicas e Full Art.
    - Vitrine interativa de cartas mais raras com efeito 3D (`Card3DTilt`), badges de raridade oficial e link direto para detalhes.
    - Seção de distribuição quantitativa por raridades.

4. **Refatoração da Página de Configurações (`/configuracoes/page.tsx`)**:
    - Adicionada a seção **Conta e Sessão** contendo os dados do usuário autenticado e o botão de ação crítica **"Sair da conta"** (`handleLogout`), que encerra a sessão no Supabase e redireciona para `/login`.
    - Padronizado o botão **"Voltar"** com navegação por histórico (`router.back()`), consistente com a página de edição de cartas (`/cards/[id]`), eliminando botões redundantes.
    - Removida a seção redundante de classificação de cartas em configurações.
    - Correção do switch tátil de som para evitar transbordamento (`overflow`) do container (`inline-flex items-center rounded-full p-1` com `translate-x-5` / `translate-x-0`).
    - Propagação dinâmica da cor primária personalizada (`--theme-primary` / `--color-poke-blue`) para:
      1. Ícones e badges de "em exibição" / "carta ativa" no fichário.
      2. Pílulas contadoras de exemplares duplicados (`x2`, `x3`, etc.).
      3. Slots preenchidos regulares do mini-grid do dashboard.
      4. Card e métricas do Binder 151 no dashboard.

## Consequências

- **Positivas**:
    - Header limpo e minimalista, sem poluição de controles secundários.
    - Página de perfil envolvente e compartilhável, fortalecendo a sensação de progresso e conquista do colecionador.
    - Centralização consistente das ações de conta e preferências em `/configuracoes`.
    - Testes automatizados cobrindo a lógica de ordenação de raridade e proteção do endpoint.
