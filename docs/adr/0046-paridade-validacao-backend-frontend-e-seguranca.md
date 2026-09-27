# 0046. Paridade Obrigatória de Validações entre Front-End e Back-End

## Contexto
Durante a auditoria de segurança e integridade de dados da aplicação, identificou-se que determinadas restrições presentes na interface do usuário (Client-Side) podiam ser contornadas via requisições HTTP manuais diretas à API ou ao banco:
1. **Tema Livre na API**: A interface permitia apenas 6 temas oficiais da 1ª Geração, mas `PATCH /api/settings` e o PostgreSQL aceitavam qualquer hexadecimal arbitrário.
2. **Campos sem Limite em Cartas**: No `POST /api/cards`, os campos `card_set_name` e `card_rarity` não tinham validação explícita de comprimento máximo.
3. **Usernames Reservados no 1º Login**: Usuários com e-mails contendo prefixos reservados (como `admin@...` ou `login@...`) poderiam receber o username do sistema na criação inicial via OAuth, pois a checagem existia apenas na edição manual de perfil.

## Decisão
1. **Restrição Estrita de Temas**:
   - `OFFICIAL_THEME_COLORS` e `isOfficialThemeColor` centralizados em `src/lib/pokemon/constants.ts`.
   - `PATCH /api/settings` rejeita com HTTP 400 cores que não pertençam aos 6 temas oficiais.
   - Constraint adicionada nas tabelas `profiles` e `user_settings` no PostgreSQL via Supabase MCP (`theme_color IN (...)`).
2. **Blindagem de Payload de Cartas**:
   - `POST /api/cards` valida tipo string e comprimento máximo `<= 100` caracteres para `card_set_name` e `card_rarity`.
3. **Sanitização de Usernames Reservados no 1º Login**:
   - `sanitizeUsernameCandidate` e `ensureOwnProfile` prefixam termos reservados com `treinador_` (ex.: `treinador_admin`).
   - Trigger SQL `handle_new_user_profile()` no PostgreSQL atualizada para aplicar o mesmo prefixo seguro e checar unicidade.
   - Constraint de tabela `profiles_reserved_username_check` aplicada no banco de dados.
4. **Criação de Regra Permanente**:
   - Adicionada a regra `.agents/rules/backend-validation-parity.md` (e registrada em `.agents/rules/global.md`) determinando que qualquer validação, sanitização ou restrição visual de front-end deve ter garantia equivalente no back-end.

## Consequências
- **Positivas**:
  - Impossibilidade de desvio de regras de negócio através de requisições manuais ou clientes externos.
  - Integridade completa e homogênea entre o TypeScript e o PostgreSQL.
  - Prevenção de apropriação indevida de rotas do sistema (`admin`, `perfil`, etc.) por novos cadastros.
  - Cobertura por 230 testes automatizados passando 100%.
