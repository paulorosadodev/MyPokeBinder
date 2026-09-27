# Testes da animação do binder

A suíte `tests/browser/binder-motion.test.ts` monta `BinderClientPage`, seus slots e o motor PageFlip reais em Chromium. Os dados são fictícios, as imagens vêm dos assets locais e as respostas HTTP são fornecidas por um servidor temporário; os testes não acessam contas nem serviços externos.

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

- A abertura inicial aguarda as imagens mesmo quando começa pela capa, preservando o limite de espera de cinco segundos e o tratamento de falhas do preloader. O retorno direto do seletor mantém seu comportamento existente.
- Depois da primeira montagem, a navegação não exibe novamente o loader de abertura.
- Setas, busca, gestos e seleção de páginas não interrompem a abertura nem uma virada em andamento. Comandos repetidos durante esse período são ignorados; após o assentamento, a navegação fica disponível novamente.
- No desktop, o bloqueio também cobre os intervalos entre as etapas de um salto com várias folhas.
- O retorno para uma página ainda não visitada mantém suas imagens nos slots, e as cópias temporárias da animação desaparecem ao terminar.
- A abertura com preferência por movimento reduzido libera a navegação corretamente.

## Causas da regressão corrigida

A abertura pela capa dispensava a prontidão das imagens tanto na ativação do preloader quanto na decisão de montar o binder. Isso permitia revelar cartas ainda em carregamento. A correção mantém a espera inicial e a retenção da montagem nas navegações seguintes.

Os comandos imperativos de navegação chamavam o PageFlip mesmo durante uma animação ativa. O motor encerra a animação anterior imediatamente quando recebe outra virada; no celular isso também substitui a cópia temporária da folha. Dois toques rápidos avançavam da Página 1 diretamente para a Página 3, com uma troca brusca das cartas. O bloqueio agora ocorre no componente de navegação e na interface imperativa do livro, antes de cancelar temporizadores ou mudar destinos.

Os testes de navegador reproduziram a abertura prematura e o avanço indevido antes da correção. Eles verificam estados e conteúdo do DOM durante a animação; a composição gráfica específica de um aparelho físico continua dependendo de validação nesse aparelho.
