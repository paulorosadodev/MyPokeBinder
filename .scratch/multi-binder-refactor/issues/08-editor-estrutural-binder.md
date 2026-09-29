# 08: Editor Estrutural do Binder (/binders/[id]/edit)

**What to build:** O usuário pode editar a estrutura de um binder existente para renomeá-lo, atualizar a descrição, alterar a cor da capa, adicionar novas páginas de catálogo ou remover páginas existentes. Ao remover páginas que contenham cartas já alocadas, a aplicação executa a desalocação segura, exibindo um modal claro de confirmação com resumo de impacto ("X cartas voltarão para a coleção como guardadas") e garantindo que nenhuma carta seja perdida da conta do usuário.

**Blocked by:** 05: Visualizador de Binder (/binders/[id]) com Suporte a Grids 1x1, 2x2, 3x3 e 3x4, 06: Três Tipos de Slots e Interação de Alocação

**Status:** ready-for-agent

- [ ] A rota `/binders/[id]/edit` carrega os dados atuais do binder e permite editar nome, descrição e tema da capa.
- [ ] O formato do grid (1x1, 2x2, 3x3 ou 3x4) permanece travado como imutável para proteger a consistência estrutural.
- [ ] O usuário pode adicionar novas páginas de catálogo (com slots livres ou configuráveis) respeitando o limite máximo permitido (até 50 páginas).
- [ ] O usuário pode remover páginas; se houver cartas alocadas nas páginas que serão excluídas, um modal de confirmação apresenta o resumo de impacto listando a quantidade de cartas que serão devolvidas à coleção como guardadas.
- [ ] O endpoint `PATCH /api/binders/[id]` persiste as alterações de metadados e páginas, realizando a desalocação segura das cartas afetadas em transação atômica no banco de dados.
- [ ] O usuário também pode excluir o binder definitivamente através do editor, devolvendo todas as cartas alocadas para a coleção como guardadas via rota `DELETE /api/binders/[id]`.
