# 16. Efeitos Sonoros Procedurais de Impacto e Partículas no Card Drop

Data: 2026-09-20

## Status

Aceito

## Contexto

Com a introdução do efeito de impacto físico e das partículas elementais (ADR 0014), a experiência visual de preenchimento de um slot no Binder atingiu alto padrão estético. Contudo, faltava uma resposta auditiva imediata para coroar o momento do pouso, criando sinestesia entre o som do impacto e a explosão de partículas.

O uso de arquivos de áudio externos tradicionais (como `.mp3` ou `.wav` pesados) apresentava desvantagens críticas:

1. Latência de rede para download dos arquivos de áudio;
2. Falhas potenciais de carregamento ou cache em conexões lentas;
3. Aumento do tamanho do bundle ou complexidade de hospedagem estática;
4. Impossibilidade de sincronização amostral exata (sub-milissegundo) com o choque físico do drop.

## Decisão

1. **Síntese Procedural com Web Audio API**:
    - Criado o módulo `src/lib/audio/cardSounds.ts`, que gera os sons nativamente em tempo de execução através de osciladores, geradores de ruído filtrados (`bandpass`) e curvas exponenciais de ganho (`gain.exponentialRampToValueAtTime`).
    - Zero arquivos estáticos externos: funciona 100% offline, com 0ms de atraso e consumo mínimo de memória.

2. **Camadas Sonoras**:
    - **Camada Base (Impacto Físico)**: Simula o encaixe tátil de uma carta real de papelão/foil no compartimento de plástico do binder (`playBaseThud`), combinando um pulso senoidal descendente (140Hz -> 35Hz) com um estalo de atrito em ruído filtrado (1200Hz).
    - **Camada Elemental**:
        - **Elétrico**: Estalos rápidos em dente de serra com micro-modulações de frequência;
        - **Água**: Queda de frequência suave em formato de gota d'água ressonante (560Hz -> 220Hz);
        - **Fogo**: Onda triangular ascendente e descendente simulando baforada de chama quente;
        - **Psíquico / Fantasma**: Acordes senoidais etéreos com cauda harmônica suave;
        - **Gelo**: Toques cristalinos duplos em frequências agudas (1760Hz e 2637Hz);
        - **Lutador / Pedra / Terrestre**: Batida sub-grave encorpada com decaimento rápido (95Hz -> 30Hz);
        - **Planta / Inseto**: Som orgânico suave de farfalhar de folhas.
    - **Camada Full Art (Brilhante e Cintilante)**:
        - Para cartas Full Art, é reproduzido um arpeggio ascendente pentatônico de cinco notas (`playFullArtSparkle`: 783Hz, 987Hz, 1318Hz, 1567Hz, 2093Hz) com decaimento brilhante tipo sino/glockenspiel, remetendo aos sons clássicos de recompensa rara nos jogos de Pokémon.

3. **Sincronização Amostral**:
    - O áudio é acionado exatamente na marca de ~360ms do ciclo de vida da animação (`CardImpactBurst.tsx`), alinhado milissegundo a milissegundo com o momento em que a carta bate no slot e ejeta as partículas.

4. **Políticas de Autoplay dos Navegadores**:
    - Como o fechamento do modal e seleção de cartas ocorrem sempre a partir de gestos intencionais do usuário (clique ou toque), o `AudioContext` é inicializado e despausado de forma segura e transparente (`state === 'suspended' ? resume() : ok`).

## Consequências

- **Positivas**:
    - Feedback audiovisual completo, imersivo e tátil ao colocar cartas no Binder.
    - Zero peso adicional em assets externos, com desempenho ultrarrápido e sem dependência de rede.
    - Sonoridade rica e comemorativa exclusiva para cartas Full Art.
