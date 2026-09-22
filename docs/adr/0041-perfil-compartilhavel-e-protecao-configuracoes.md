# 41. Perfil compartilhável por userId e proteção de configurações do dono

## Status

Aceito

## Contexto

A página `/perfil` era privada e sempre retornava os dados do usuário autenticado. O botão "Compartilhar" copiava a URL genérica `/perfil`, inutilizável por outros treinadores. Configurações e atalhos de coleção apareciam indiscriminadamente.

## Decisão

1. **Rota pública `/perfil/[userId]`** liberada no middleware (junto com `GET /api/profile/[userId]`).
2. **`/perfil`** redireciona o usuário autenticado para `/perfil/{próprioId}`.
3. **Tabela `profiles`** com leitura pública (nome e avatar); sync via trigger em `auth.users` e upsert no login/callback.
4. **RPC `get_public_user_cards`** (`SECURITY DEFINER`) para vitrine/estatísticas sem abrir mutações de `user_cards`.
5. **UI condicionada a `isOwner`**: Configurações, links da Coleção e edição de cartas só para o dono; e-mail omitido em perfis alheios.
6. **Compartilhar** copia o link absoluto `/perfil/[userId]`.

## Consequências

- Perfis passam a ser compartilháveis entre treinadores (e visitantes anônimos).
- Configurações permanecem em `/configuracoes` (rota privada) e só são anunciadas na UI do dono.
- RLS de mutação em `user_cards` permanece intacto.
