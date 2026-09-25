# Auditoria QA — MyPokeBinder — 2026-09-25

**Resultado: parcial, com jornadas autenticadas cobertas em parte. Não representa aprovação integral do produto.**

Skill utilizada: `.agents/skills/qa-flow-auditor/SKILL.md`, com apoio da skill Supabase na leitura da autenticação. Não houve correção, commit, push ou PR.

## Ambiente e método

- Desenvolvimento local: http://localhost:3000, Windows, branch `main`, commit `6db3256895c1391176c86814547730b805163ccd`.
- Next.js instalado 15.5.25, React 19, Tailwind 4, SWR, Supabase Auth/Postgres/RLS/Realtime; catálogo TCGdex em inglês e imagens locais/PokeAPI.
- Playwright 1.57.0 reutilizado do cache existente, Chromium 143.0.7499.4; desktop 1440 × 1000 e mobile 390 × 844.
- Google Chrome instalado também foi tentado para login, com o mesmo bloqueio informado pelo usuário.
- O `.env` foi fornecido pelo usuário durante a execução. Seus valores não foram incluídos nos artefatos.
- Suíte existente: `npm exec --yes --package=bun -- bun test --concurrency=1`, Bun 1.4.2: **219 PASS, 0 FAIL, 30 arquivos, 2.116 assertions**. Esses testes não são contados como jornadas E2E e não demonstram persistência real ou usabilidade.
- Não havia infraestrutura E2E dedicada no package.json. Foram usados scripts temporários sem alterar dependências ou código de produção.
- A consulta pública ao GitHub identificou o deployment, mas os resultados E2E deste relatório são do ambiente local, conforme orientação do usuário.
- Uma rodada inicial foi invalidada por falha no cache `.next` após reinício do servidor. Os resultados abaixo vêm da repetição com cache regenerado; a falha de preparação não foi aberta como bug do produto.

## Modelo e mapa dos fluxos

Binder único com 151 slots fixos, um por Pokémon original. Não há criação/renomeação de binders livres nem cadastro/remoção de espécies; esses casos não são funcionalidades existentes. Selecionar uma espécie e adicionar uma carta são operações diferentes.

`user_cards` representa exemplares físicos; `is_in_binder` indica exibição. Cópias são agrupadas somente por edição, idioma e acabamento. Novas cartas entram guardadas. Remover do Binder deve preservar a coleção; excluir o exemplar elimina sua exibição. O perfil permite até quatro destaques; `buildProfileFromCards` filtra IDs que não existem mais, mas a persistência dessa regra não pôde ser validada no navegador autenticado.

Fluxos mapeados: landing e documentos legais; Google OAuth/callback/sessão; Binder, busca, páginas, seletor e navegação por dexId; coleção, busca/filtros, catálogo e paginação; detalhes, idioma, acabamento, quantidade, vínculo e exclusão; dashboard/indicadores; perfil, bio e destaques; perfil e coleção públicos; configurações, username, tema, som/animações, logout e encerramento de conta.

## Contagem

Cada linha da matriz é uma unidade de cenário; repetições para reprodução não aumentam o total. Cenários agrupados bloqueados não representam testes executados.

- Executados com resultado funcional: **71**.
- PASS: **66**.
- FAIL: **5** — três ocorrências do bug #1, uma ocorrência do bug #2 e uma vulnerabilidade de dependência (#3).
- BLOCKED: **26**.
- NOT TESTED: **4**.
- Total de linhas documentadas: **101**.
- Bugs e vulnerabilidades confirmados: **3**.
- Issues GitHub criadas e verificadas: **3** — [#1](https://github.com/paulorosadodev/MyPokeBinder/issues/1), [#2](https://github.com/paulorosadodev/MyPokeBinder/issues/2), [#3](https://github.com/paulorosadodev/MyPokeBinder/issues/3).
- Issues existentes reutilizadas: **0**. A consulta `state=all` retornou zero antes da publicação.
- Severidade dos bugs e vulnerabilidades: **Critical 0; High 0; Medium 2; Low 1**.

## Matriz completa desta execução

| ID | Área | Cenário | Resultado | Issue / observação |
| --- | --- | --- | --- | --- |
| 01 | Público desktop | Abrir `/` | PASS | HTTP 200 |
| 02 | Público desktop | Overflow horizontal em `/` | PASS | 1440 × 1000 |
| 03 | Público desktop | Abrir `/inicio` | PASS | HTTP 200 |
| 04 | Público desktop | Overflow em `/inicio` | PASS | Sem overflow |
| 05 | Auth desktop | Abrir `/login` | PASS | HTTP 200 |
| 06 | Auth desktop | Overflow em `/login` | PASS | Sem overflow |
| 07 | Legal desktop | Abrir `/termos` | PASS | HTTP 200 |
| 08 | Legal desktop | Overflow em `/termos` | PASS | Sem overflow |
| 09 | Legal desktop | Abrir `/privacidade` | PASS | HTTP 200 |
| 10 | Legal desktop | Overflow em `/privacidade` | PASS | Sem overflow |
| 11 | Legal desktop | Abrir alias `/terms` | PASS | HTTP 200 |
| 12 | Legal desktop | Overflow em `/terms` | PASS | Sem overflow |
| 13 | Legal desktop | Abrir alias `/privacy` | PASS | HTTP 200 |
| 14 | Legal desktop | Overflow em `/privacy` | PASS | Sem overflow |
| 15 | Auth | Acessar `/dashboard` sem sessão | PASS | Redireciona a `/login` |
| 16 | Auth | Acessar `/collection` sem sessão | PASS | Redireciona a `/login` |
| 17 | Auth | Acessar `/perfil` sem sessão | PASS | Redireciona a `/login` |
| 18 | Auth | Acessar `/configuracoes` sem sessão | PASS | Redireciona a `/login` |
| 19 | Auth | Acessar detalhe de carta por URL sem sessão | PASS | Redireciona a `/login`; UUID fictício |
| 20 | API | GET `/api/binder` sem sessão | PASS | 401 |
| 21 | API | GET `/api/cards` sem sessão | PASS | 401 |
| 22 | API | GET `/api/dashboard` sem sessão | PASS | 401 |
| 23 | API | GET `/api/settings` sem sessão | PASS | 401 |
| 24 | API | GET `/api/profile` sem sessão | PASS | 401 |
| 25 | API | GET `/api/search?name=Pikachu` sem sessão | PASS | 401 |
| 26 | Perfil público | Username fictício inexistente | PASS | API 404 e mensagem de perfil não encontrado |
| 27 | Coleção pública | Username fictício inexistente | PASS | API 404 e mensagem de coleção não encontrada |
| 28 | Navegação | Rota desconhecida fora das exceções públicas, sem sessão | PASS | Middleware redireciona ao login; não avalia 404 autenticado |
| 29 | Auth | Callback com `error=access_denied` | PASS | Retorno ao login com toast “Falha no login” |
| 30 | Público mobile | Overflow em `/` | PASS | 390 × 844 |
| 31 | Auth mobile | Overflow em `/login` | PASS | Sem overflow |
| 32 | Auth mobile | Botão Google visível | PASS | Não equivale a concluir login |
| 33 | Legal mobile | Overflow em `/termos` | PASS | Sem overflow |
| 34 | Legal mobile | Overflow em `/privacidade` | PASS | Sem overflow |
| 35 | Auth mobile | Iniciar OAuth pelo botão Google | PASS | Navegação até accounts.google.com; autenticação não concluída |
| 36 | API | POST em URL fictícia de carta sem sessão | PASS | 401 no middleware |
| 37 | API | PATCH em URL fictícia de carta sem sessão | PASS | 401 no middleware |
| 38 | API | DELETE em URL fictícia de carta sem sessão | PASS | 401; nenhum dado alterado |
| 39 | Navegação | Rota inexistente sob prefixo público `/login/not-a-page` | PASS | Página 404 temática |
| 40 | Perfil público desktop | Abrir `/perfil/%25` | FAIL | [#1](https://github.com/paulorosadodev/MyPokeBinder/issues/1), repetido 2 vezes |
| 41 | Coleção pública desktop | Abrir `/colecao/%25` | FAIL | [#1](https://github.com/paulorosadodev/MyPokeBinder/issues/1), repetido 2 vezes |
| 42 | Coleção pública mobile | Abrir `/colecao/%25` | FAIL | [#1](https://github.com/paulorosadodev/MyPokeBinder/issues/1), mesmo erro, sem overflow |
| 43 | Auth | Concluir Google OAuth e reconhecer a conta | BLOCKED | Google rejeitou navegadores automatizados |
| 44 | Auth | Redirect pós-login, refresh e persistência da sessão | BLOCKED | Depende de 43 |
| 45 | Auth | Logout, refresh, voltar, rota direta e novo login (jornada 9) | BLOCKED | Sem sessão autenticada |
| 46 | Auth | Sessão inválida/expirada e ausência de dados privados durante validação | BLOCKED | Não foi obtida sessão real para invalidar |
| 47 | Dashboard | KPIs, imagens, atalhos, vazio/loading/erro e atualização | BLOCKED | Login |
| 48 | Dashboard → Binder | Pokémon correto, URL, refresh, voltar e clique repetido (jornada 5) | BLOCKED | Login |
| 49 | Coleção | Buscar, selecionar, adicionar e persistir carta (jornada 1) | PASS | Revalidada no Brave: inclusão pelo catálogo, feedback e refresh; registro temporário removido pelo ID exato |
| 50 | Coleção | Duplicata, múltiplos cliques, quantidades e agrupamento real | BLOCKED | Login; cobertura unitária não substitui E2E |
| 51 | Catálogo | Nome parcial, caixa, espaços, caracteres especiais, vazio e muitos resultados | BLOCKED | API de busca requer sessão |
| 52 | Catálogo | Imagem/metadados ausentes, paginação, cancelar e voltar | BLOCKED | Login |
| 53 | Coleção | Combinar/limpar filtros, ordenar, refresh e retornar dos detalhes | BLOCKED | Login |
| 54 | Carta | Detalhes, idioma, acabamento, quantidade e ampliação | BLOCKED | Login |
| 55 | Coleção → Binder | Selecionar carta, vincular e confirmar após refresh (jornada 2) | BLOCKED | Login |
| 56 | Binder → Coleção | Remover exibição e manter exemplar (jornada 3) | PASS | Revalidada no Brave: PATCH de remoção e presença confirmada na Collection; registro temporário removido depois |
| 57 | Coleção | Cancelar/confirmar exclusão e verificar telas relacionadas (jornada 4) | BLOCKED | Login |
| 58 | Consistência | Vincular/remover/revincular/excluir e verificar referências | BLOCKED | Login |
| 59 | Binder | Busca, página, setas, vazio, cheio, URL, back/forward e refresh | BLOCKED | Login |
| 60 | Pokémon | Selecionar espécie, adicionar carta e acessar Binder (jornada 6 adaptada) | BLOCKED | Espécies não são entidades cadastráveis; login necessário |
| 61 | Perfil | Dados, avatar, bio, indicadores, salvar/cancelar e persistência | BLOCKED | Login |
| 62 | Destaques | Selecionar/salvar/navegar/refresh (jornada 7) | BLOCKED | Login |
| 63 | Destaques | Trocar, mesma carta, múltiplos cliques, cancelar, ordem e limite 4 | BLOCKED | Login |
| 64 | Destaques | Excluir da coleção carta destacada (jornada 8) | BLOCKED | Login |
| 65 | Compartilhamento | Perfil/coleção reais, tema do dono e controles de edição | BLOCKED | Identidade da conta não validada; sem explorar contas alheias |
| 66 | Configurações | Username, tema, som, animações e persistência | BLOCKED | Login |
| 67 | Mobile | Dashboard, menu inferior e navegação entre telas privadas | PASS | 390 × 844: Dashboard, Binder, Collection e Perfil acessíveis pelo menu inferior, sem overflow |
| 68 | Mobile | Coleção, adicionar carta e detalhes | BLOCKED | Login |
| 69 | Mobile | Binder, adicionar/remover e contexto do Pokémon | BLOCKED | Login |
| 70 | Mobile | Perfil, edição e destaques | BLOCKED | Login |
| 71 | Conta | Confirmar encerramento da conta de teste | NOT TESTED | Destrutivo e desnecessário para esta rodada; não executado |
| 72 | Acessibilidade | Auditoria completa de teclado, leitores de tela e foco | NOT TESTED | Não houve avaliação completa de acessibilidade |
| 73 | Resiliência | Injeção sistemática de latência, offline e falhas de imagens nas páginas públicas | NOT TESTED | Falhas artificiais não foram injetadas |
| 74 | Concorrência | Duas abas, refresh/back durante mutation e corrida entre dispositivos | NOT TESTED | Não executado; exigiria sessão e dados de teste |

## Continuação autenticada via Brave

O Brave foi conectado por CDP local após reinicialização com o mesmo perfil. A sessão autenticada abriu `/dashboard`; nenhum cookie, token ou header foi lido, impresso ou gravado. Cada linha abaixo acrescenta uma unidade de cenário à contagem total; repetições de uma mesma reprodução não são contadas novamente.

| ID | Área | Cenário | Resultado | Issue / observação |
| --- | --- | --- | --- | --- |
| 75 | Auth | Sessão autenticada reconhecida em `/dashboard` | PASS | Rota protegida abriu sem redirecionar ao login |
| 76 | Collection | Adicionar carta temporária pelo catálogo | PASS | POST 201; feedback de sucesso |
| 77 | Collection | Persistência de carta adicionada após refresh | PASS | Confirmada via API da sessão |
| 78 | Carta | Exibir carta temporária no Binder | PASS | PATCH 200; feedback de sucesso |
| 79 | Dashboard | Atualização do slot após vínculo no Binder | PASS | Slot passou a preenchido sem refresh manual |
| 80 | Dashboard → Binder | Clique em slot preenchido abre a página que contém o slot | PASS | Reproduzido duas vezes; seletor não é esperado nesse atalho |
| 81 | Collection | Clique duplo em Adicionar | PASS | Um único POST 201 e uma única cópia criada; removida ao final |
| 82 | Collection | Busca sem resultado e ação Limpar filtros | PASS | Estado orienta o usuário e é revertido |
| 83 | Collection | Filtro customizado fecha por Esc | PASS | Sem foco preso |
| 84 | Coleção | Picker de Pokémon sem resultado | PASS | Mensagem explicativa |
| 85 | Coleção | Fechar picker ao clicar no backdrop | PASS | Modal fecha |
| 86 | Binder | `dexId` fora do intervalo por URL direta | PASS | Binder permanece funcional |
| 87 | Collection mobile | Overflow horizontal | PASS | 390 × 844 sem overflow |
| 88 | Binder mobile | Overflow horizontal | PASS | 390 × 844 sem overflow |
| 89 | Perfil | Abrir seletor de cartas em destaque | PASS | Controle Editar → Adicionar |
| 90 | Perfil | Salvar uma carta em destaque | PASS | PATCH 200 |
| 91 | Perfil | Persistir destaque após refresh | PASS | Confirmado |
| 92 | Perfil | Remover destaque e restaurar estado inicial | PASS | PATCH 200; lista original preservada |
| 93 | Configurações desktop | Overflow horizontal | PASS | Sem overflow |
| 94 | Configurações mobile | Overflow horizontal | PASS | 390 × 844 sem overflow |
| 95 | Auth | Logout | PASS | Redireciona ao login |
| 96 | Auth | Refresh após logout | PASS | Mantém login |
| 97 | Auth | Acesso direto a `/dashboard` após logout | PASS | Redireciona ao login |
| 98 | Auth | Browser back após logout | PASS | Não restaura sessão |
| 99 | Binder | Remover carta temporária pelo seletor | BLOCKED | A rota contextual `openSelect=true` não abriu o seletor; a carta temporária foi excluída pelo ID exato |
| 100 | Carta → Binder | Retorno contextual com `?dexId=N&openSelect=true` | FAIL | [#2](https://github.com/paulorosadodev/MyPokeBinder/issues/2), reproduzido duas vezes sem mutações |
| 101 | Segurança de dependências | Audit de dependências de produção | FAIL | [#3](https://github.com/paulorosadodev/MyPokeBinder/issues/3): `next@15.5.25` inclui `postcss@8.4.31` vulnerável |

## Extensão de segurança

`npm audit --omit=dev --json` e `npm audit --json` retornaram o mesmo resultado: uma vulnerabilidade High no PostCSS transitivo de produção e o pacote Next.js marcado como afetado. A dependência direta `postcss@8.5.28` não foi a cópia vulnerável; a cópia afetada é `next@15.5.25 -> postcss@8.4.31`. A issue #3 registra a cadeia, os advisories e o limite de impacto observado.

A revisão estática das rotas de cartas, configurações, perfil, callback OAuth e RPC do Binder não confirmou outra vulnerabilidade. As operações consultadas validam sessão e restringem cartas/configurações ao `user.id` autenticado; o callback rejeita `next` externo. Não houve tentativa de exploração, acesso a dados de terceiros ou leitura de cookies/tokens.

## Retomada autenticada

Com nova sessão manual no Brave, a jornada 1, a jornada 3 e a navegação mobile foram concluídas. Uma carta criada pelo catálogo foi atualizada no detalhe, persistiu após refresh, entrou no Binder, apareceu como slot preenchido na Dashboard, saiu do Binder e continuou presente na Collection. Todos os registros temporários dessa retomada foram removidos pelos IDs retornados nas suas próprias requisições.

O teste adicional de aumentar e diminuir a quantidade foi deliberadamente pulado nessa carta: já havia outra cópia com a mesma edição, idioma e acabamento. Executá-lo poderia escolher uma cópia preexistente para remoção. O cenário de clique duplo em Adicionar permanece PASS na linha 81.

## Fluxos bloqueados

Google retornou “Esse navegador ou app pode não ser seguro” no Chromium e no Google Chrome controlados pelo Playwright. O usuário confirmou a mensagem. Posteriormente, uma sessão foi obtida manualmente no Brave e usada apenas para testar a aplicação; o formulário Google não foi automatizado nem inspecionado. Não foram exportados cookies, tokens ou sessões, nem aplicada tentativa de contornar a restrição. As jornadas de Collection, Binder, Dashboard, Profile e logout foram cobertas em parte, mas as nove jornadas prioritárias ainda não têm validação integral. Houve criação e exclusão de cartas temporárias somente pelos IDs retornados nas suas próprias requisições.

O Brave foi usado por conexão CDP local exclusivamente em novas páginas de teste. Nenhum cookie, token, header ou dado privado de sessão foi lido, impresso ou gravado. A issue foi publicada com a autorização específica do usuário, sem imprimir ou gravar a credencial GitHub.

O upload da screenshot ao GitHub não foi realizado: o canal autenticado disponível permitiu criar e ler a issue pela API, mas não ofereceu upload de anexos. O corpo publicado contém os passos e a tabela de HTTP reproduzida. A screenshot foi gerada, inspecionada e removida na limpeza; não se alega que está anexada.

## Observações e limites

- Os achados confirmados são o 500 em username percentual (#1), o retorno contextual que não reabre o seletor do Binder (#2) e a cadeia PostCSS vulnerável (#3). As issues distinguem hipóteses técnicas dos resultados observados.
- As telas de perfil/coleção inexistentes ainda estavam em loading na primeira amostragem após 1,8 s. A espera pela resposta concluiu com mensagem correta; não foi tratado como loading infinito.
- A mensagem do Google é bloqueio da execução automatizada, sem evidência suficiente para afirmar que o login de usuários normais está quebrado.
- A leitura do código sugere proteção de exibição de destaques removidos, mas não confirma sincronização, refresh ou limpeza persistente de referências.
- Uma carta já estava em exibição quando os probes somente leitura do Dashboard/Binder foram executados. Ela não foi removida, porque o ID da primeira execução interrompida não foi preservado e não havia prova suficiente para atribuí-la à auditoria sem risco de apagar dado legítimo. As cartas temporárias criadas depois disso foram removidas pelos IDs exatos retornados pelas suas próprias requisições.
- Não houve auditoria de autorização entre duas contas, de banco/RLS por acesso direto nem tentativa de acessar informações de outros usuários.
- Ausência de `pageerror` na rodada pública não significa ausência de todos os problemas de console/rede. Foram acompanhados os status relevantes e as falhas reproduzidas; warnings de desenvolvimento não viraram issues sem impacto demonstrado.
- Alterações e arquivos de origem incerta surgidos durante a execução foram preservados: `.gitignore`, a skill fornecida e outros `qa-*` fora do diretório temporário desta execução. Não foram atribuídos a esta auditoria nem removidos.

## Limpeza

- Removidos os scripts temporários e a screenshot criados em `.scratch/qa-audit-temp/`.
- Não foram gerados vídeos, traces, arquivos de upload ou fixtures de conta por esta execução.
- Páginas temporárias de teste encerradas, sem exportação da sessão.
- Nenhum teste, screenshot ou artefato temporário foi commitado, enviado por push ou incluído em PR.
- Permanecem apenas este relatório e a documentação local da issue em `.scratch/qa-audit/`, além de arquivos preexistentes/de origem incerta preservados.
- A issue foi publicada por autorização explícita; não contém credenciais ou dados privados da conta.
