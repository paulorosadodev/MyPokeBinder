# 03: Estante de Binders (/) e Navegação Global

**What to build:** A tela inicial `/` passa a ser a Estante de Binders do usuário, apresentando seus fichários em formato de estante física com cards temáticos que exibem a arte da capa de couro, o formato do grid (1x1, 2x2, 3x3, 3x4), total de páginas, porcentagem de progresso e atalho direto para criar novos fichários. A barra de navegação no desktop (Header) e no mobile (BottomNav) é atualizada com as duas abas principais [Meus Binders, Coleção], e acessos à rota legada `/dashboard` são redirecionados de forma permanente para `/`.

**Blocked by:** 01: Migração de Banco de Dados, Schema de Binders e Preservação Legada

**Status:** done

- [x] A rota `/` renderiza a Estante de Binders com cards dos fichários do usuário, mostrando capa temática, título, formato do grid, total de páginas e barra de progresso.
- [x] A Estante exibe um card de destaque para "Criar Novo Fichário" direcionando para `/binders/new`.
- [x] O Header desktop e o BottomNav mobile são atualizados com duas abas ativas: "Meus Binders" (`/`) e "Coleção" (`/collection`), com slider deslizante contínuo e sem menções ao Dashboard.
- [x] A rota legada `/dashboard` redireciona permanentemente (HTTP 308) para a rota `/`.
- [x] A rota `GET /api/binders` lista todos os binders do usuário autenticado com dados agregados de slots e progresso.
