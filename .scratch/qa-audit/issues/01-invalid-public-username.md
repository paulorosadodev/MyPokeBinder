# [Bug] Username com percentual causa HTTP 500 no perfil e na coleção pública

Status: needs-triage

GitHub: https://github.com/paulorosadodev/MyPokeBinder/issues/1

### Descrição

Um link público com `%25` como username produz falha interna na API e mensagem genérica de carregamento. O aplicativo não distingue esse identificador inválido de uma indisponibilidade do serviço.

### Como reproduzir

1. Execute o projeto com as variáveis Supabase configuradas (`npm run dev`).
2. Sem autenticação, abra `http://localhost:3000/perfil/%25`.
3. Aguarde a resposta da API e observe a mensagem de falha.
4. Repita em `http://localhost:3000/colecao/%25`.

### Resultado atual

- Perfil: “Não foi possível carregar os dados do perfil.”
- Coleção pública: “Não foi possível carregar a coleção.”
- `GET /api/profile/%25` responde HTTP 500.
- `GET /api/profile/%25/collection` responde HTTP 500.
- Ambos os fluxos foram reproduzidos duas vezes no navegador; cada endpoint também foi consultado duas vezes separadamente, sempre com HTTP 500.

### Resultado esperado

Tratar identificadores inválidos de forma controlada, com HTTP 400 ou 404 e mensagem de link inválido/recurso não encontrado. Uma URL inválida não deve causar erro interno nem sugerir falha de conexão.

### Evidências

| Requisição | Tentativa 1 | Tentativa 2 |
| --- | --- | --- |
| GET /api/profile/%25 | 500 | 500 |
| GET /api/profile/%25/collection | 500 | 500 |

Controle: `/api/profile/qa_nonexistent_0925` e sua coleção respondem 404. O perfil exibe “Perfil não encontrado.”

Screenshot gerada e revisada, sem dados de conta. O canal disponível não permitiu anexá-la ao GitHub; o arquivo local foi removido na limpeza. A issue publicada contém as evidências textuais verificadas. Nenhum cookie, token, header de autenticação ou resposta contendo dados privados foi registrado.

### Ambiente

- Ambiente: desenvolvimento local, http://localhost:3000, Windows.
- Navegador: Chromium 143.0.7499.4 via Playwright 1.57.0.
- Viewport: 1440 × 1000; o erro na coleção pública também foi confirmado em 390 × 844, sem overflow horizontal.
- Branch: main.
- Commit: 6db3256895c1391176c86814547730b805163ccd.
- Next.js instalado: 15.5.25.
- Data: 2026-09-25.

### Severidade

Low — afeta links inválidos; links válidos não foram demonstrados como afetados.

### Investigação técnica

Os handlers `src/app/api/profile/[username]/route.ts` e `src/app/api/profile/[username]/collection/route.ts` executam `decodeURIComponent(rawParam || "")` antes da validação, sem tratamento local da exceção. Essa é uma causa provável para percentuais inválidos no parâmetro. As páginas correspondentes também decodificam o parâmetro. O status 500 e a mensagem na interface estão confirmados; não foi aplicada correção.

### Duplicidade

Consulta à API pública do GitHub com `state=all` em 2026-09-25 retornou zero issues abertas ou fechadas em `paulorosadodev/MyPokeBinder`. Nenhuma issue equivalente encontrada.
