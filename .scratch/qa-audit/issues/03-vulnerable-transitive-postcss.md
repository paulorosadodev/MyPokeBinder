# [Security] Atualizar PostCSS transitivo vulnerável incluído pelo Next.js

Status: needs-triage

GitHub: https://github.com/paulorosadodev/MyPokeBinder/issues/3

### Descrição

A instalação atual de produção inclui `next@15.5.25`, que resolve para `postcss@8.4.31`. O `npm audit --omit=dev` confirmou que essa versão está em faixas vulneráveis a avisos de segurança do PostCSS, incluindo leitura arbitrária de arquivos e divulgação de informações por `sourceMappingURL` controlado pelo atacante.

### Como reproduzir

1. No commit testado, instale as dependências bloqueadas em `package-lock.json`.
2. Execute `npm ls next postcss --depth=1`.
3. Observe `next@15.5.25` com dependência interna `postcss@8.4.31`.
4. Execute `npm audit --omit=dev --json`.

### Resultado atual

O audit retorna uma vulnerabilidade de alta gravidade para `postcss`, transitiva de `next`, com as seguintes referências:

- GHSA-6g55-p6wh-862q: leitura arbitrária de arquivos/divulgação via comentário `sourceMappingURL` controlado pelo atacante, aplicável até `8.5.11`.
- GHSA-r28c-9q8g-f849: divulgação de arquivos por carregamento automático de sourcemaps, aplicável até `8.5.17`.
- GHSA-fxqj-rqcc-2cmp: correção incompleta do caso anterior, aplicável até `8.5.22`.
- GHSA-qx2v-qp2m-jg93: XSS no output de CSS ao serializar `</style>`, aplicável antes de `8.5.10`.

O comando encontrou 1 alerta High (`postcss`) e 1 Moderate (`next` como pacote afetado), sem dependências de desenvolvimento incluídas.

### Resultado esperado

A cadeia de dependências de produção não deve incluir uma versão do PostCSS nas faixas vulneráveis. Atualizar o Next.js e/ou sua cadeia transitiva para uma versão que resolva `postcss` acima de `8.5.22`, validando build e testes depois da atualização.

### Evidências

```
next@15.5.25
└── postcss@8.4.31
```

`npm audit --omit=dev --json` identificou a cadeia `next -> postcss` e ofereceu `next@16.3.6` como atualização disponível, classificada pelo npm como mudança major. Não foi executado `npm audit fix`, nem foi tentada exploração ou leitura de arquivos.

### Ambiente

- Ambiente: desenvolvimento local, Windows.
- Branch: `main`.
- Commit: `6db3256895c1391176c86814547730b805163ccd`.
- Next.js instalado: `15.5.25`.
- Data: 2026-09-25.

### Severidade

Medium — o aviso upstream é High para o pacote afetado, mas a exploração no produto depende de uma entrada CSS ou sourcemap controlada por atacante alcançar o processamento PostCSS. Esta auditoria não simulou esse vetor nem encontrou evidência de exploração pelo fluxo web normal.

### Investigação técnica

O lockfile resolve o PostCSS interno do Next.js para `8.4.31`; a dependência direta do repositório está em `8.5.28` e não é a cópia apontada pelo audit. A mitigação provável é atualizar o Next.js para uma versão cuja dependência interna não esteja vulnerável. Isto é uma hipótese de correção, não uma alteração aplicada.

### Duplicidade

Uma busca em issues abertas e fechadas do repositório por `PostCSS`, `sourceMappingURL`, `dependency` e `vulnerability` não retornou issue equivalente em 2026-09-25.
