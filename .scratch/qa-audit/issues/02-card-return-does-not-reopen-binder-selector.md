# [Bug] Retorno do detalhe de carta não reabre o seletor do Binder

Status: needs-triage

GitHub: https://github.com/paulorosadodev/MyPokeBinder/issues/2

### Descrição

Ao abrir a rota que a própria página de detalhes usa para retornar ao Binder (`/?dexId=N&openSelect=true`), o Binder é carregado na página correspondente, mas o seletor de carta daquele Pokémon não é exibido. Isso quebra o retorno contextual esperado depois de editar uma carta a partir do Binder.

### Como reproduzir

1. Faça login e tenha uma carta em exibição no Binder.
2. Abra diretamente `/?dexId=N&openSelect=true`, substituindo `N` pelo número da Pokédex dessa carta.
3. Aguarde o carregamento completo do Binder por pelo menos 10 segundos.

### Resultado atual

O Binder abre, mas não mostra o botão/diálogo “Buscar no catálogo” do seletor de carta. A rota permanece no Binder sem permitir continuar o contexto de edição.

O problema foi reproduzido duas vezes, ambas usando uma carta já existente e sem modificar a coleção. Em cada repetição, a rota final foi `/` e o seletor permaneceu fechado.

### Resultado esperado

O Binder deve abrir o seletor da carta correspondente, permitindo ver a carta ativa e continuar a interação do slot. Esse é o comportamento indicado pela própria rota e pelo retorno de `/cards/[id]?from=binder&dexId=N`.

### Evidências

| Repetição | Rota Binder carregada | Seletor aberto |
| --- | --- | --- |
| 1 | Sim | Não |
| 2 | Sim | Não |

Não houve erros de página ou chamadas API com status 4xx/5xx durante a reprodução. Nenhum dado da conta, cookie, token ou header foi registrado.

### Ambiente

- Desenvolvimento local: `http://localhost:3000`.
- Navegador: Brave 154 com sessão da conta de teste; Playwright conectado por CDP local.
- Viewport: desktop.
- Branch: `main`.
- Commit: `6db3256895c1391176c86814547730b805163ccd`.
- Data: 2026-09-25.

### Severidade

Medium — interrompe o retorno contextual após editar uma carta acessada pelo Binder; há alternativa de navegar manualmente até o slot.

### Investigação técnica

Hipótese: `BinderClientPage` inicializa `selectModalOpen` a partir de `openSelect=true`, mas o fluxo de preload/estado do livro impede que `BinderSlotSelectModal` se torne visível na rota inicial. A lógica relevante está em `src/components/binder/BinderClientPage.tsx`, nos efeitos que tratam `openSelectParam` e `initialDexIdParam`; o retorno é montado em `src/app/cards/[id]/page.tsx`.

O comportamento visual e as duas reproduções são confirmados. A causa acima é apenas hipótese; nenhuma correção foi aplicada.
