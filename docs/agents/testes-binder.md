# Testes da animação do binder

A suíte `tests/browser/binder-motion.test.ts` monta `BinderClientPage`, seus slots, a transição mobile e o motor PageFlip do desktop em Chromium. Os dados são fictícios, as imagens vêm dos assets locais e as respostas HTTP são fornecidas por um servidor temporário; os testes não acessam contas nem serviços externos.

Antes da primeira execução, instale o Chromium utilizado pelo Playwright:

```sh
bun install
bunx playwright install chromium
```

Para executar somente as regressões visuais e de navegação:

```sh
bun test tests/browser/binder-motion.test.ts
```

A suíte também participa de `bun run test`. Ambientes Linux sem as bibliotecas necessárias ao navegador podem usar `bunx playwright install --with-deps chromium` durante a preparação do ambiente.

## Comportamentos verificados

- No binder universal, as capas e seus forros têm fundo opaco e densidade rígida; a verificação inclui as viradas da capa frontal e da contracapa no desktop.
- Na Estante, cada card inicia sua animação no primeiro frame, mantém uma capa estática sob o motor PageFlip e deixa as folhas cruas ocultas até `onInit`, sem intervalo vazio nem flash ampliado na primeira entrada ou após sair e voltar para a rota.
- A abertura inicial aguarda as imagens; no celular mantém a Pokébola por no mínimo 400 ms e revela a grade com uma entrada de 280 ms, enquanto no desktop começa pela capa. O limite de espera de cinco segundos e o tratamento de falhas do preloader permanecem. O retorno direto do seletor mantém seu comportamento existente.
- Depois da primeira montagem, a navegação não exibe novamente o loader de abertura.
- Setas, busca, gestos e seleção de páginas não interrompem a abertura nem uma virada em andamento. Comandos repetidos durante esse período são ignorados; após o assentamento, a navegação fica disponível novamente.
- No desktop, o bloqueio também cobre os intervalos entre as etapas de um salto com várias folhas.
- O celular não carrega o módulo PageFlip nem monta suas folhas: somente os nove slots da página atual são renderizados. O desktop continua carregando o motor sob demanda.
- A grade mobile sai em 140 ms e entra em 180 ms, usando apenas opacidade e deslocamento horizontal de 18 px. A moldura permanece fixa e nunca há duas páginas de cartas sobrepostas.
- No celular, setas e swipe ficam limitados às páginas 1 a 17. Gestos verticais ou cancelados não trocam a página nem abrem o seletor.
- O retorno para uma página ainda não visitada preserva os slots e suas imagens.
- A abertura com preferência por movimento reduzido libera a navegação corretamente.

## Histórico e substituição da paginação mobile

A abertura pela capa dispensava a prontidão das imagens tanto na ativação do preloader quanto na decisão de montar o binder. Isso permitia revelar cartas ainda em carregamento. A correção mantém a espera inicial e a retenção da montagem nas navegações seguintes.

Os comandos imperativos de navegação chamavam o PageFlip mesmo durante uma animação ativa. O motor encerra a animação anterior imediatamente quando recebe outra virada; no celular isso também substitui a cópia temporária da folha. Dois toques rápidos avançavam da Página 1 diretamente para a Página 3, com uma troca brusca das cartas. O bloqueio agora ocorre no componente de navegação e na interface imperativa do livro, antes de cancelar temporizadores ou mudar destinos.

Os testes de navegador reproduziram a abertura prematura e o avanço indevido antes da correção. Eles verificam estados e conteúdo do DOM durante a animação; a composição gráfica específica de um aparelho físico continua dependendo de validação nesse aparelho.

As proteções contra comandos concorrentes não eliminaram os artefatos percebidos no aparelho do usuário. Por isso, a paginação mobile foi substituída por `BinderMobile`, que mantém uma única grade sob controle do React e não depende da física ou das cópias do PageFlip. A implementação desktop passou a ser importada dinamicamente; os testes verificam que seu arquivo JavaScript não é solicitado no celular.
