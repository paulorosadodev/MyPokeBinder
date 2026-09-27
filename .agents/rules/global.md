---
trigger: always_on
---

# Sempre utilize Bun, nunca NPM, NPX ou PNPM;
# Gere TODA documentação em PT-BR;
# Nunca gere nenhuma linha de comentário em código;
# Se uma nova regra de negócio for definida, atualize as documentações para não ficar nada desatualizado;
# Se for necessário fazer uma alteração no banco do Supabase, suba a alteração você mesmo via MCP;
# Nunca use decodeURIComponent de forma desprotegida em parâmetros de rota ou queries; sempre trate URIError e responda 400 ou 404 em vez de 500;
# Toda validação, sanitização ou restrição visual de front-end deve ser obrigatoriamente replicada e validada no back-end (rotas de API e banco de dados);
# Sempre rode os scripts de prettier, eslint e testes após implementar uma nova funcionalidade.