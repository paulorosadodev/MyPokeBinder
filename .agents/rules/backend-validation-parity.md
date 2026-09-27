---
trigger: always_on
---

# Paridade Obrigatória de Validações (Front-End vs Back-End)

- Toda e qualquer regra de negócio, limite de tamanho, sanitização de entrada ou restrição de opções oferecida ou exibida na interface (Client-Side) DEVE ser obrigatoriamente validada e reforçada no Back-End (Server Components, Route Handlers e constraints de banco de dados no Supabase).
- Nunca confie exclusivamente em validações client-side (como desabilitar botões, limites no HTML como maxLength, seletores fechados na interface ou formatação de campos). O back-end deve sempre rejeitar requisições inválidas ou forjadas com status HTTP 400 ou 422.
- Restrições de opções fechadas (ex.: cores de tema oficiais, acabamentos/variantes permitidos, idiomas) devem ser validadas contra listas estritas (whitelist) tanto no TypeScript quanto no PostgreSQL (CHECK constraints).
- Limites de tamanho de payload (como comprimento de strings em POST ou PATCH) devem ser validados explicitamente no back-end para todos os campos recebidos, prevenindo payloads abusivos ou inconsistências no banco.
- Ao adicionar novas restrições ou validações no front-end, implemente simultaneamente o equivalente na rota de API correspondente e crie testes automatizados cobrindo tentativas de envio de payloads inválidos.
