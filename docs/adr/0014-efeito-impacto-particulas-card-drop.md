# 14. Efeito de Impacto Físico e Partículas Elementais no Card Drop do Binder

Data: 2026-09-20

## Status

Aceito

## Contexto

A animação física de queda da carta (`card-drop`), introduzida na ADR 0012, resolveu a transição tátil ao preencher um compartimento do Binder. No entanto, a experiência visual ao momento do pouso ainda podia ser enriquecida:

1. O pouso da carta na base do slot carecia de resposta física tangível de impacto, como se a carta tivesse batido na superfície e levantado partículas do compartimento.
2. Não havia diferenciação visual entre cartas de diferentes tipos elementais (Planta, Fogo, Água, Elétrico, etc.) durante o pouso.
3. Cartas especiais **Full Art** — itens de maior prestígio e apelo estético para colecionadores de TCG — não possuíam uma celebração ou acabamento visual proporcional ao seu valor e raridade ao serem adicionadas ao álbum.

## Decisão

1. **Sincronização Física do Impacto**:
    - A descida da carta (`card-drop`) tem duração total de 0.75s, atingindo o solo do slot na marca de 55% (~380ms).
    - Criado o componente `CardImpactBurst`, que dispara exatamente na marca do impacto um anel de choque e dispersão radial de partículas em 360 graus a partir das bordas do slot, simulando o efeito de matéria levantada pelo pouso da carta.

2. **Dispersão de Partículas Elementais por Tipo de Pokémon**:
    - Cada um dos 15 tipos de Pokémon (`grass`, `fire`, `water`, `electric`, `bug`, `normal`, `poison`, `ground`, `rock`, `fighting`, `psychic`, `ghost`, `ice`, `dragon`, `fairy`) possui paleta de cores própria, anel de choque dedicado e geometrias temáticas em SVG:
        - **Planta / Inseto**: Folhas flutuantes, esporos e esferas bio-luminosas em tons esmeralda e lima.
        - **Fogo**: Brasas e fagulhas incandescentes em laranja e carmesim com brilho de alta temperatura.
        - **Água**: Gotas e borrifos d'água em tons ciano e azul oceânico.
        - **Elétrico**: Centelhas em zigue-zague e estilhaços de alta voltagem em amarelo relâmpago.
        - **Lutador / Pedra / Terrestre**: Poeira de impacto, cascalhos e lascas minerais em tons terra e cinza.
        - **Psíquico / Fantasma**: Esferas astrais e névoa mágica etérea em rosa místico e violeta.
        - **Gelo**: Cristais de gelo, diamantes e agulhas sub-zero em azul gelo e branco.
        - **Dragão / Fada**: Centelhas cósmicas, poeira de fada e estrelas mágicas.
        - **Normal**: Estrelas cinéticas prateadas e estilhaços de velocidade.

3. **Escalonamento em Níveis de Impacto e Som por Raridade Oficial com Acústica Cristalina Universal**:
    - O efeito sonoro não varia por elemento, adotando universalmente a acústica cristalina límpida e tátil (inspirada no timbre de `Ice` com frequências de 1760Hz e 2637Hz) combinada ao baque amortecido de encaixe, escalonando as camadas sonoras puramente conforme os 4 Tiers de Raridade Oficial:
        - **Tier 0 (Standard - Comum, Incomum, Rare, Holo Rare)**: 16 partículas elementais e estalo físico amortecido com impacto cristalino puro e direto.
        - **Tier 1 (Harmonic - Double Rare)**: 20 partículas, estalo cristalino e camada senoidal de ressonância harmônica suave (440Hz -> 660Hz) com reverberação expandida.
        - **Tier 2 (Prismatic - Ultra Rare, Illustration Rare, Full Art Trainer, Shiny Ultra Rare, Shiny Rare VMAX)**: 24 partículas iridescentes em espectro arco-íris, anel holográfico de choque, estalo cristalino e arpeggio pentatônico estelar cintilante ascendente (523Hz -> 1046Hz).
        - **Tier 3 (Mythic Gold - Special Illustration Rare, Hyper Rare, Secret Rare)**: 32 partículas douradas/prismáticas míticas, super anel de choque com aura dourada intensa e brilho duplo (`box-shadow: 0 0 24px rgba(255,215,0,0.8)`), estalo cristalino acompanhado de duplo arpeggio estelar rápido com harmônicos agudos cristalinos (523Hz a 1318Hz).

4. **Performance e Acessibilidade**:
    - Todas as partículas utilizam aceleração por hardware (`transform: translate3d(...) rotate(...) scale(...)`, `opacity`), dispensando recálculos pesados de layout.
    - Todos os elementos de impacto utilizam `pointer-events: none`, garantindo que toques, cliques e navegação não sejam obstruídos.
    - O tempo de retenção do estado de drop (`droppingDexId`) foi calibrado para 1400ms, viabilizando o ciclo completo de desaceleração e dissipação suave das partículas sem cortes abruptos.

## Consequências

- **Positivas**:
    - Assinatura sonora uniforme, limpa e extremamente prazerosa em toda a aplicação (timbre cristalino de impacto).
    - Progressão de prestígio auditivo estritamente atrelada à raridade da carta, sem discrepâncias de volume ou dissonância entre diferentes elementos.
    - Eliminação de classificações manuais ou dependência de elementos na síntese de áudio.
    - Zero impacto em usabilidade ou performance, com síntese em Web Audio API nativa leve e responsiva.
