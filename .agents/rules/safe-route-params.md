---
trigger: always_on
---

# Tratamento Seguro de Parâmetros de Rotas e URLs

- É expressamente proibido o uso direto de `decodeURIComponent(...)` sem tratamento de exceção em parâmetros de rotas dinâmicas (`params`), query strings ou entradas do usuário.
- O método nativo `decodeURIComponent` lança `URIError: URI malformed` quando recebe caracteres de porcentagem isolados (como `%` ou `%25` pré-processado pelo framework) ou sequências de escape inválidas, o que faz com que Server Components ou Route Handlers disparem erros 500 não tratados.
- Sempre utilize decodificação resiliente com `try...catch` (como `safeDecodeParam`), retornando fallback nulo ou sanitizado caso a string seja inválida.
- Valide os formatos dos identificadores recebidos (ex.: verificação de UUID ou validação de sintaxe de username com `isValidProfileParam`) antes de disparar queries ao banco de dados ou renderizar páginas.
- Identificadores ausentes, malformados ou inválidos devem ser tratados de forma controlada com status HTTP 400 (parâmetro vazio ou inválido) ou HTTP 404 (perfil/recurso não encontrado), exibindo as telas de fallback de não encontrado (ex.: `TrainerNotFound`) e nunca quebrando a aplicação com HTTP 500.
