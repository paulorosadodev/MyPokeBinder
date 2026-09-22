# 42. Username público, tema do dono no perfil e preload de imagens

## Status

Aceito

## Contexto

O perfil compartilhado usava UUID na URL, as cores seguiam o tema do visitante e a página podia aparecer com imagens ainda carregando. A nav mostrava o nome do Google OAuth.

## Decisão

1. Coluna `profiles.username` (única, `^[a-z][a-z0-9_]{2,19}$`), default = local-part do e-mail sanitizado; editável em `/configuracoes` via `PATCH /api/profile`.
2. Rotas `/perfil/[username]` e `GET /api/profile/[username]`; UUID legado redireciona para o username.
3. `profiles.theme_color` espelha o tema do dono; a página aplica CSS vars locais para que o visitante veja as cores do dono.
4. Reveal da UI só após preload de avatar + cartas da vitrine.
5. Nav exibe `username` em vez do nome social.

## Consequências

- Links de perfil legíveis e estáveis.
- Identidade visual do perfil é do treinador visitado.
- Sem flash de imagens incompletas na abertura do perfil.
