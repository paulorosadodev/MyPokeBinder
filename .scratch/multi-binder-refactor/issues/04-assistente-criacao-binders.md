# 04: Assistente de Criação de Binders (/binders/new)

**What to build:** O usuário pode criar um novo binder escolhendo nome, descrição opcional, cor da capa, formato do grid (1x1, 2x2, 3x3 ou 3x4), quantidade de páginas e compor a estrutura inicial através de templates rápidos ("Kanto 151", "Masterset de Expansão", "Em Branco") ou por adição de blocos modulares (geração, expansão, pokémon específico ou livres). O binder e todos os seus slots correspondentes são criados atomicamente no banco de dados.

**Blocked by:** 01: Migração de Banco de Dados, Schema de Binders e Preservação Legada, 03: Estante de Binders (/) e Navegação Global

**Status:** ready-for-agent

- [ ] A rota `/binders/new` disponibiliza um assistente visual para configuração de metadados (nome, descrição, cor da capa, visibilidade pública).
- [ ] O assistente permite a escolha do formato do grid entre 1x1, 2x2, 3x3 e 3x4, e o número de páginas desejadas.
- [ ] O usuário pode selecionar templates rápidos que pré-configuram os slots (como a Geração 1 completa de 1 a 151 ou um binder vazio).
- [ ] O usuário pode compor os slots adicionando blocos sequenciais (bloco de geração, bloco de expansão, bloco de pokémon ou bloco livre).
- [ ] O endpoint `POST /api/binders` valida o payload, insere o registro na tabela `binders` e gera atomicamente os registros correspondentes na tabela `binder_slots`.
- [ ] Após a criação com sucesso, o usuário é redirecionado imediatamente para o visualizador do novo binder em `/binders/[id]`.
