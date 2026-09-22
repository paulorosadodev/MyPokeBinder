# ADR 0020: Organização dos 1.025 Pokémon em Subpastas por Geração e Fallback para PokeAPI

## Status

Aceito

## Contexto

Com a expansão futura planejada para abranger cartas e Pokémon além da primeira geração original, fazia-se necessário estruturar a biblioteca de ilustrações oficiais de modo escalável, organizado e com alta resiliência de cache.

Manter milhares de arquivos de todas as gerações em uma única pasta raiz causaria desorganização e tornaria a inspeção difícil. Além disso, era indispensável garantir que, caso algum monstrinho futuro ou variante não estivesse disponível localmente, a aplicação continuasse exibindo a ilustração de forma transparente através de um fallback para a PokeAPI oficial.

## Decisões

1. **Subpastas por Geração (`public/pokemon/gen[1..9]/`)**:
    - As 151 silhuetas originais da Geração 1 foram migradas para `public/pokemon/gen1/[1..151].png`.
    - As demais gerações (Gerações 2 a 9, compreendendo os IDs `152` a `1025`) foram baixadas em lotes de forma controlada e armazenadas em suas respectivas subpastas:
        - Gen 1: 1 a 151 (`/pokemon/gen1/`)
        - Gen 2: 152 a 251 (`/pokemon/gen2/`)
        - Gen 3: 252 a 386 (`/pokemon/gen3/`)
        - Gen 4: 387 a 493 (`/pokemon/gen4/`)
        - Gen 5: 494 a 649 (`/pokemon/gen5/`)
        - Gen 6: 650 a 721 (`/pokemon/gen6/`)
        - Gen 7: 722 a 809 (`/pokemon/gen7/`)
        - Gen 8: 810 a 905 (`/pokemon/gen8/`)
        - Gen 9: 906 a 1025 (`/pokemon/gen9/`)

2. **Resolução Dinâmica de Geração e Fallback**:
    - Criada a função `getPokemonGeneration(dexId: number): number | null` que mapeia o número da Pokédex para a sua respectiva geração (1 a 9).
    - A função `getPokemonSilhouetteUrl(dexId: number): string` resolve automaticamente o caminho local `/pokemon/gen${gen}/${dexId}.png`.
    - Se o `dexId` estiver fora dos limites baixados localmente (ou para números futuros não catalogados), a função realiza **fallback automático** para a URL oficial da PokeAPI no GitHub.

## Consequências

- **Escalabilidade**: A aplicação suporta agora todos os 1.025 Pokémon catalogados na história da franquia de forma nativa e estática.
- **Resiliência e Disponibilidade**: 100% dos 1.025 Pokémon são servidos com zero latência externa e cache imutável de CDN, e novos Pokémon possuem fallback garantido para a PokeAPI.
- **Organização**: Estrutura de diretórios modular e limpa, facilitando manutenção e auditoria de assets.
