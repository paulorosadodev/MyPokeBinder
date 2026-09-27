# ADR 0052: Filtragem Estrita de Cartas por Pokémon e Resolução de Prefixos (Mew vs Mewtwo)

## Status
Aceito

## Contexto
Ao abrir o modal de seleção/busca de cartas para o Pokémon Mew (#151), cartas de Mewtwo (#150) estavam aparecendo nos resultados.
A causa raiz do problema foi identificada na integração com a API TCGdex e nos critérios de filtragem:
1. O endpoint da TCGdex `/v2/en/cards?name=Mew` realiza busca por substring, retornando todas as cartas que contêm a sequência "Mew" no nome (incluindo mais de 100 cartas de Mewtwo).
2. O endpoint `/api/search` recebia apenas o parâmetro `name`, sem o Pokédex ID (`dexId`), não tirando proveito do filtro estrito de Pokédex suportado pelo TCGdex (`?dexId=eq:151`).
3. Não havia validação de paridade de negócio no backend (`POST /api/cards`), permitindo potencialmente cadastrar cartas de outro Pokémon no slot de Mew.
4. No front-end (`CardSearchModal`, `BinderSlotSelectModal` e `filterCatalogCards`), não havia segregação de nomes quando um nome é prefixo de outro (como Mew/Mewtwo, Pidgey/Pidgeotto/Pidgeot, Slowpoke/Slowbro).

## Decisão
1. **Identificação e Validação Estrita (`isCardMatchingPokemon`)**:
   - Implementado utilitário dedicado em `src/lib/pokemon/match.ts` com regras de separação por fronteiras de palavra e descarte de prefixos indevidos (ex.: ao buscar Mew, cartas de Mewtwo são desconsideradas, preservando cartas legítimas de Mew como Ancient Mew, Mew ex, Mew VMAX e Tag Teams).
2. **Suporte a `dexId` em `/api/search`**:
   - O endpoint agora aceita o parâmetro `dexId` (e infere a partir do nome caso não fornecido para os 151 Pokémon).
   - Realiza consulta com `dexId=eq:${targetDexId}` no TCGdex para garantir resultados exatos daquele Pokédex ID.
   - Aplica `isCardMatchingPokemon` na sanitização dos dados retornados.
3. **Paridade no Cadastro (`POST /api/cards`)**:
   - Reforçada a validação no backend para rejeitar com HTTP 400 qualquer tentativa de cadastrar uma carta com nome que não corresponda ao `pokemon_dex_id` fornecido.
4. **Resiliência nos Modais de Seleção**:
   - `CardSearchModal` envia o `dexId` nas requisições e inclui o ID na chave de cache client-side.
   - `filterCatalogCards` e `BinderSlotSelectModal` filtram as cartas garantindo que nenhuma carta de outro Pokémon seja listada ou pré-selecionada.

## Consequências
- Ao abrir o modal de Mew, apenas cartas legítimas de Mew são apresentadas.
- O mesmo benefício se aplica a outros Pokémon que compartilham prefixos (Pidgey, Slowpoke, Nidoran).
- Paridade front-end e back-end garantida conforme as regras do projeto.
