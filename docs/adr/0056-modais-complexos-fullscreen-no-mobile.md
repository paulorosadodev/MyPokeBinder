# 56. Modais Complexos em Tela Cheia no Mobile

## Status

Aceito

## Contexto

Os fluxos complexos apresentados em modal concentram buscas, filtros, listas extensas, pré-visualizações e ações de seleção. Em telas móveis, a apresentação anterior mantinha margens externas, cantos arredondados e altura limitada, reduzindo a área útil e deixando uma faixa de backdrop interativa que podia fechar o fluxo por acidente.

As confirmações destrutivas simples têm outra finalidade: exigem uma decisão curta e explícita, sem navegação interna ou conteúdo extenso. Elas não precisam ocupar toda a tela.

## Decisão

1. Abaixo do breakpoint `sm` (`640px`), os seguintes fluxos ocupam toda a largura e a altura dinâmica da viewport (`100dvh`):
   - catálogo de cartas (`CardSearchModal`);
   - seleção de carta para o Binder (`BinderSlotSelectModal`);
   - seleção de Pokémon para busca na Coleção;
   - seleção de cartas em destaque no perfil.
2. No mobile, esses painéis não possuem margem externa, altura máxima, largura máxima, borda ou cantos arredondados.
3. O toque no backdrop não fecha modais complexos no mobile. O usuário encerra o fluxo somente por botões internos explícitos.
4. O `CardLightbox`, que já ocupa toda a viewport, segue a mesma proteção no mobile: somente o botão interno "X" fecha a visualização. `Escape` e backdrop continuam disponíveis no desktop.
5. A partir do breakpoint `sm`, os modais complexos mantêm o formato de painel centralizado, com limite de `85vh`, altura máxima de `820px`, borda e cantos arredondados.
6. Modais simples de confirmação de exclusão permanecem compactos e não recebem a regra de tela cheia.

## Consequências

- Os fluxos longos ganham mais área útil para conteúdo e rolagem em smartphones.
- Toques involuntários fora do conteúdo deixam de descartar o estado do fluxo no mobile.
- Os botões internos de fechamento tornam-se a única saída explícita nesses dispositivos.
- O comportamento compacto das confirmações simples e o comportamento flutuante no desktop são preservados.
