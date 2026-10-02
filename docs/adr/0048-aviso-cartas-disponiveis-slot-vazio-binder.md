# 48. Aviso de Cartas Disponíveis na Coleção para Slots Vazios do Binder

## Status

Aceito

## Contexto

No MyPokeBinder, o binder digital de 151 slots representa o álbum físico do colecionador. Quando um usuário adquire novas cartas físicas através da página de Coleção (`/collection`) ou pelo catálogo (`CardSearchModal`), essas cartas são cadastradas como guardadas (`is_in_binder = false`).

Anteriormente, ao navegar pelas páginas do Binder (`/`), os slots vazios exibiam apenas a silhueta escura do Pokémon e o botão genérico com ícone `+`, sem qualquer indicação de que o colecionador já possuía exemplares físicos daquele mesmo Pokémon guardados na sua coleção aguardando para serem colocados em exibição no binder. O usuário precisava abrir manualmente cada slot ou consultar a página de Coleção para descobrir se já tinha cartas disponíveis para preencher as lacunas do álbum.

## Decisão

1. **Paridade e Dados no Backend (`/api/binder` e SSR)**:
   - A rota `/api/binder` foi aprimorada para buscar em paralelo as cartas ativas no binder (`is_in_binder = true`) e as cartas guardadas na coleção (`is_in_binder = false`), calculando e retornando `availableCounts: Record<number, number>`.
   - O Server Component (`src/app/page.tsx`) executa a mesma consulta antecipada, entregando `initialAvailableCounts` via SSR ao `BinderClientPage` e eliminando flashes de carregamento na montagem inicial.

2. **Aviso Visual no Slot Vazio (`BinderSlot`) sob Diretrizes Anti-Slop**:
   - Quando um slot está vazio (`!card`) e o colecionador possui ao menos uma carta daquele Pokémon guardada na coleção (`availableCount > 0`):
     - **Borda Suave e Fundo Temático Sóbrio**: A borda do slot assume a cor do tema ativo do usuário de forma muito suave (`border-[var(--theme-primary)]/25 bg-[#0b0e15]`), sem neon exagerado ou animações pulsantes, com hover discreto e elegante (`hover:border-[var(--theme-primary)]/45 hover:bg-[#10141f]`).
     - **Indicador Universal em Ponto Luminoso**: Tanto no desktop quanto no mobile, a interface elimina qualquer badge de texto ou contagens que poluam o slot. Um ponto luminoso sutil e contido na cor do tema (`h-2 w-2 rounded-full bg-[var(--theme-primary)] opacity-85 shadow-[0_0_6px_var(--theme-primary-glow)]`) é posicionado no canto superior direito (`top-2.5 right-2.5`), indicando a disponibilidade com máxima sofisticação e zero layout shift.
     - **Silhueta e Botão Central de Ação Estável**: A silhueta ganha leve presença (`opacity-30`), e o botão central `+` harmoniza com a paleta temática (`border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/10 text-[var(--theme-primary)]`), mantendo tamanho fixo e estável sem efeito de scale no hover (`group-hover:scale` removido), oferecendo uma experiência tátil calma e refinada.
     - **Acessibilidade**: O atributo `aria-label` descreve textualmente o estado completo para tecnologias assistivas (ex.: `"Pikachu, #025, vazio, 2 cartas disponíveis na coleção"`).

3. **Preservação Visual das Cartas Preenchidas**:
   - Por princípio fundamental do MyPokeBinder, quando o slot está preenchido por uma carta física ativa, **nenhum badge, borda artificial ou indicador sobreposto é renderizado**, assegurando 100% da integridade da arte física de ponta a ponta.

4. **Atualizações Otimistas Imediatas**:
   - Ao selecionar uma carta da coleção para exibir no binder (`handleSelectCardFromCollection`), o slot é preenchido imediatamente e a contagem disponível é decrementada de forma otimista.
   - Ao desvincular ou remover uma carta do binder (`handleRemoveCardFromCollection`), o slot retorna ao estado vazio e ganha instantaneamente o aviso visual temático de carta disponível.
   - Ao cadastrar novas cartas físicas via catálogo (`handleCardAdded`), a contagem disponível do Pokémon correspondente é incrementada em tempo real.

## Consequências

- O colecionador identifica instantaneamente, ao folhear as páginas do álbum, quais slots vazios já podem ser preenchidos com suas próprias cartas físicas.
- O clique no slot vazio com aviso abre diretamente o seletor com as cartas disponíveis para vinculação imediata, reduzindo o esforço do usuário.
- O design system dark e minimalista é mantido rigorosamente intacto, com personalização governada pelas preferências de tema de cada treinador.
