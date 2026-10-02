# 05: Visualizador de Binder (/binders/[id]) com Suporte a Grids 1x1, 2x2, 3x3 e 3x4

**What to build:** Visualizador dedicado do binder que carrega e renderiza dinamicamente as páginas do fichário no formato do grid configurado (1x1, 2x2, 3x3 ou 3x4). No desktop, opera através do motor 3D de livro (StPageFlip) com folheamento realista, capas rígidas e proporção física adaptada ao grid; no celular, opera via `BinderMobile` com navegação tátil por página e gestos de swipe. No cabeçalho, oferece o botão de retorno à Estante (`← Estante`) e seletor rápido para alternar para outros fichários do usuário.

**Blocked by:** 01: Migração de Banco de Dados, Schema de Binders e Preservação Legada, 04: Assistente de Criação de Binders (/binders/new)

**Status:** done

- [x] A rota dinâmica `/binders/[id]` carrega os dados e slots do binder via endpoint `GET /api/binders/[id]`, tratando parâmetros de rota inválidos de forma segura.
- [x] O componente desktop do livro adapta suas dimensões físicas e proporções de folha ao tipo do grid (1x1 com proporção de pocket card, 2x2 e 3x3 de álbum clássico, e 3x4 vertical de 12 bolsos), mantendo a proporção `8/11` das cartas.
- [x] O componente mobile `BinderMobile` renderiza os grids de 1x1, 2x2, 3x3 e 3x4 de forma responsiva na tela do smartphone com swipe horizontal e controles numéricos.
- [x] O cabeçalho do visualizador exibe o botão `← Estante`, o título do binder e um dropdown para alternar instantaneamente entre os outros binders do usuário.
- [x] A navegação de páginas (setas, indicadores de página inferiores e URL query `?page=X`) sincroniza com a página atual do fichário.
