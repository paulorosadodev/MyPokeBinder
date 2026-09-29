Status: ready-for-agent

## Problem Statement

Atualmente, o MyPokeBinder é restrito a um único binder fixo de 151 slots voltado exclusivamente para a 1ª Geração de Pokémon, operando com uma grade fixa 3×3 de 17 páginas e um Dashboard rígido. Um colecionador do Pokémon TCG do mundo real possui múltiplos fichários físicos (fichários de gerações específicas, mastersets de coleções completas, binders de cartas raras ou fichários de bolso 1×1 e 2×2), contendo tanto cartas de Pokémon de todas as 9 gerações (1 a 1025) quanto cartas de Treinadores e Energias. 

No sistema atual:
1. O usuário é impedido de criar mais de um binder para separar suas coleções.
2. O banco de dados e os validadores rejeitam qualquer carta com Pokédex acima de 151 ou cartas que não sejam de Pokémon.
3. Para adicionar cartas à coleção, o usuário é obrigado a passar por um modal intermediário de seleção dos 151 Pokémon.
4. Não há flexibilidade para escolher o tamanho da grade (1×1, 2×2, 3×3, 3×4) ou a quantidade de páginas.
5. Os slots do binder só admitem a regra de Pokémon da 1ª Geração, impossibilitando slots livres para qualquer carta ou slots com meta de uma carta física específica de um conjunto.
6. A página de Dashboard é desacoplada e mede apenas o progresso fixo dos 151 originais.

## Solution

Expandir o MyPokeBinder para uma plataforma completa de gerenciamento de múltiplos binders com catálogo amplo do Pokémon TCG físico oficial, preservando a física realista de folheamento 3D no desktop, a navegação tátil por página no mobile e a posse física estrita.

A aplicação contará com:
1. **Estante de Binders (`/`)**: A tela inicial passa a ser a vitrine central de todos os binders do usuário, exibindo capas temáticas, formato de grade, contagem de páginas, progresso percentual e atalho direto para criar novos fichários (`/binders/new`).
2. **Visualizador de Binder Dedicado (`/binders/[id]`)**: Suporta grades `1×1`, `2×2`, `3×3` e `3×4` com folhas adaptadas à proporção, folheamento realista (StPageFlip no desktop e `BinderMobile` no smartphone), botão de retorno à Estante e seletor rápido para alternar entre fichários.
3. **Três Tipos Estritos de Slots**:
   - *Slot Livre (`free`)*: Aceita qualquer carta da coleção. Quando vazio, exibe moldura sutil com contorno pontilhado sem mini Pokébola. O clique abre a coleção completa do usuário para vinculação.
   - *Slot de Pokémon Específico (`pokemon`)*: Vinculado a um Pokémon (#001 a #1025). Quando vazio, exibe a silhueta escura oficial. O clique abre a coleção filtrada pelas cartas daquele Pokémon.
   - *Slot de Carta Específica (`card`)*: Vinculado a um exemplar exato da TCGdex. Quando vazio, exibe a arte da carta desbotada e apagada no fundo. Se o usuário possuir o exemplar, coloca no slot com 1 toque; se não possuir, o modal informa a falta e oferece o botão para buscar e registrar no catálogo.
4. **Painel Retrátil de Estatísticas**: Substitui o antigo Dashboard estático. Cada binder possui seu próprio painel retrátil no topo do fichário com métricas dinâmicas (metas completadas e ocupação total) e um mapa visual compacto de todos os slots com salto direto para a página correspondente.
5. **Composição Flexível na Criação**: Assistente com templates rápidos ("Kanto 151", "Masterset de Expansão", "Em Branco") e composição modular por blocos (Geração, Expansão, Pokémon Específico ou Livres), com editor estrutural (`/binders/[id]/edit`) que permite adicionar/remover páginas com desalocação segura e resumo de impacto.
6. **Catálogo Geral Direto**: O botão "Adicionar Carta" na Coleção (`/collection`) abre diretamente a busca no catálogo do TCGdex sem modal prévio de seleção de Pokémon, permitindo cadastrar cartas de Pokémon (1 a 1025), Treinadores e Energias físicas, mantendo bloqueadas apenas cartas digitais do TCG Pocket.
7. **Posse Física Estrita**: 1 exemplar físico registrado na coleção só pode estar alocado em no máximo 1 slot de 1 binder por vez. Para exibir em múltiplos binders, o usuário precisa registrar cópias adicionais.
8. **Migração Transparente**: Usuários existentes recebem automaticamente o binder `"Kanto 151 Original"` (3×3, 17 páginas, slots 1..151 tipo Pokémon) com suas cartas preservadas e alocadas aos mesmos slots.

## User Stories

1. Como colecionador, quero acessar a rota principal `/` e ver minha Estante de Binders, para que eu tenha uma visão geral de todos os meus fichários físicos em um único lugar.
2. Como colecionador, quero ver cada binder na estante representado por um card elegante com capa de couro temática, nome, formato do grid e total de páginas, para identificar meus fichários com rapidez.
3. Como colecionador, quero ver o progresso percentual e a contagem de cartas alocadas em cada card da estante, para saber o quão completa está cada coleção.
4. Como colecionador, quero clicar em um botão "Criar Novo Fichário" na estante, para ser levado ao assistente de criação (`/binders/new`).
5. Como colecionador, quero escolher o nome, descrição opcional e cor da capa do binder na criação, para personalizar sua identidade visual.
6. Como colecionador, quero escolher o formato do grid do meu novo binder entre 1×1, 2×2, 3×3 e 3×4, para que ele corresponda exatamente ao tamanho físico do meu fichário real.
7. Como colecionador, quero definir a quantidade de páginas do binder na criação, para adequar a capacidade do álbum ao objetivo da coleção.
8. Como colecionador, quero ter a opção de iniciar um binder com um template rápido ("Coleção Kanto 151", "Masterset de Expansão" ou "Em Branco"), para agilizar a montagem sem esforço manual repetitivo.
9. Como colecionador, quero poder montar a estrutura do binder adicionando blocos sequenciais (bloco de geração, bloco de expansão, bloco de pokémon específico ou bloco livre), para ter total liberdade de organização.
10. Como colecionador, quero poder misturar blocos no mesmo binder (ex.: Geração 2 nos primeiros slots, depois uma página de Geração 1, depois um masterset), para organizar meu fichário exatamente como quiser.
11. Como colecionador, quero clicar em um binder na estante para abrir a visualização dedicada (`/binders/[id]`), iniciando o carregamento com a capa frontal fechada e abertura cinematográfica.
12. Como usuário desktop, quero folhear o binder em spread de duas páginas com física realista 3D (StPageFlip) adaptada à proporção do grid escolhido, para que o livro pareça um fichário real.
13. Como usuário mobile, quero visualizar uma página por vez com transição suave e gestos de swipe, sem o motor pesado 3D, para ter máxima fluidez em smartphones.
14. Como colecionador, quero ver slots do tipo Livre vazios exibindo uma moldura de bolso escuro com contorno pontilhado limpo e ícone de adição, sem mini Pokébola, mantendo a sobriedade do fichário.
15. Como colecionador, quero clicar em um Slot Livre vazio e ver a lista de todas as cartas da minha Coleção para escolher qual alocar naquele bolso.
16. Como colecionador, quero ver slots de Pokémon Específico vazios exibindo a silhueta oficial escura do Pokémon correspondente (1 a 1025), para saber qual criatura pertence àquele compartimento.
17. Como colecionador, quero clicar em um Slot de Pokémon Específico e ver as cartas que possuo daquele Pokémon específico na minha coleção prontas para alocação.
18. Como colecionador, quero ver slots de Carta Específica vazios exibindo a arte oficial da carta TCGdex desbotada e apagada no fundo, para visualizar qual carta exata é a meta daquele bolso.
19. Como colecionador, quero clicar em um Slot de Carta Específica cuja carta eu já possuo na coleção e alocá-la com um único toque.
20. Como colecionador, quero clicar em um Slot de Carta Específica que eu ainda não possuo e ver um modal informando que a carta falta na minha coleção, com botão direto para buscá-la no catálogo.
21. Como colecionador, quero que o registro de uma carta a partir do slot já aloque o exemplar diretamente naquele compartimento após o salvamento, economizando cliques.
22. Como colecionador, quero que cartas alocadas em qualquer slot preenchido exibam 100% da ilustração física de ponta a ponta sem poluição visual, mantendo a pureza da arte.
23. Como colecionador, quero que uma cópia física específica da minha coleção só possa estar em um único slot de um único binder por vez, para refletir fielmente a posse física de cartas reais.
24. Como colecionador, quero receber um aviso ao tentar alocar uma cópia que já está em outro binder, sendo solicitado a adicionar uma cópia extra caso deseje colocá-la em ambos.
25. Como colecionador, quero abrir o painel retrátil de "Estatísticas" no topo do binder, para inspecionar os KPIs dinâmicos e o mapa visual de slots sem poluir as páginas de cartas.
26. Como colecionador, quero ver a métrica de metas preenchidas e a métrica de ocupação física no painel de estatísticas quando o binder tiver metas definidas, para acompanhar meu progresso real.
27. Como colecionador, quero ver apenas a taxa de ocupação física no painel de estatísticas se o binder for composto exclusivamente por slots livres, para que a métrica faça sentido sem metas artificiais.
28. Como colecionador, quero clicar em qualquer slot dentro do mapa visual das estatísticas, para que o binder feche o painel e folheie imediatamente para a página daquela carta, destacando o slot.
29. Como colecionador, quero poder tocar em "← Estante" no cabeçalho do binder, para retornar rapidamente à estante central de fichários.
30. Como colecionador, quero um seletor suspenso no cabeçalho do binder com a lista de todos os meus fichários, para alternar de binder instantaneamente sem passar pela estante.
31. Como colecionador, quero acessar o editor estrutural (`/binders/[id]/edit`) para renomear o binder, alterar a cor da capa, adicionar páginas ou remover páginas.
32. Como colecionador, quero que a remoção de páginas com cartas alocadas realize a desalocação segura com um modal de confirmação claro com resumo de impacto ("X cartas voltarão para a coleção como guardadas"), garantindo que nenhuma carta seja perdida da conta.
33. Como colecionador, quero que o formato do grid (1×1, 2×2, 3×3, 3×4) seja travado e imutável após a criação, para preservar a integridade geométrica das páginas do fichário.
34. Como colecionador, quero acessar a página da Coleção (`/collection`) e clicar em "+ Adicionar Carta" para abrir diretamente o catálogo, sem a etapa obrigatória de escolher um Pokémon antes.
35. Como colecionador, quero buscar no catálogo por nome de Pokémon, nome de carta de Treinador, nome de Energia, número da Pokédex com `#` (#001 a #1025) ou número da carta com `/`, para encontrar qualquer exemplar do TCG físico.
36. Como colecionador, quero registrar cartas de Treinadores e Energias na minha Coleção com metadados físicos de idioma, acabamento e condição, para catalogar itens além de Pokémon.
37. Como colecionador, quero que cartas exclusivas do jogo digital Pokémon TCG Pocket continuem sendo bloqueadas na busca e no salvamento, preservando o escopo de TCG físico.
38. Como colecionador, quero acessar a página dedicada de uma carta (`/cards/[id]`) e ver se ela está guardada na coleção ou em qual binder e página/slot está alocada, para rastrear sua localização física.
39. Como colecionador, quero poder desalocar a carta do binder ou transferi-la para outro binder diretamente pela página da carta, para gerenciar meus exemplares com flexibilidade.
40. Como visitante, quero acessar o perfil público de um treinador (`/perfil/[username]`) e ver o Binder em Destaque no topo com suas Estatísticas e progresso, além da vitrine dos demais binders públicos abaixo.
41. Como usuário existente, quero que meu binder legado dos 151 Pokémon seja convertido automaticamente no binder "Kanto 151 Original" sem que nenhuma carta seja desvinculada ou perdida, para garantir continuidade absoluta.
42. Como usuário, quero ver a navegação superior e móvel padronizada com as duas abas principais [Meus Binders, Coleção], para que a navegação seja objetiva sem abas fantasmas de Dashboard.

## Implementation Decisions

### 1. Modelo de Domínio e Banco de Dados (Supabase / PostgreSQL)

- **Tabela `public.binders`**:
  - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
  - `user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
  - `name TEXT NOT NULL CHECK (length(trim(name)) >= 1 AND length(name) <= 60)`
  - `description TEXT NOT NULL DEFAULT '' CHECK (length(description) <= 200)`
  - `grid_type TEXT NOT NULL CHECK (grid_type IN ('1x1', '2x2', '3x3', '3x4'))`
  - `total_pages INT NOT NULL CHECK (total_pages >= 1 AND total_pages <= 50)`
  - `cover_theme TEXT NOT NULL DEFAULT 'classic_red'`
  - `is_public BOOLEAN NOT NULL DEFAULT false`
  - `is_featured BOOLEAN NOT NULL DEFAULT false`
  - `created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())`
  - `updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())`
  - RLS: Usuário autenticado tem controle total sobre seus próprios binders (`user_id = auth.uid()`). Usuários anônimos podem visualizar via `SELECT` se `is_public = true`.

- **Tabela `public.binder_slots`**:
  - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
  - `binder_id UUID NOT NULL REFERENCES public.binders(id) ON DELETE CASCADE`
  - `page_number INT NOT NULL CHECK (page_number >= 1)`
  - `slot_index INT NOT NULL CHECK (slot_index >= 1)`
  - `slot_type TEXT NOT NULL CHECK (slot_type IN ('free', 'pokemon', 'card'))`
  - `target_dex_id INT NULL CHECK (target_dex_id IS NULL OR (target_dex_id >= 1 AND target_dex_id <= 1025))`
  - `target_tcgdex_id TEXT NULL`
  - `target_card_name TEXT NULL`
  - `target_card_image_url TEXT NULL`
  - `user_card_id UUID UNIQUE REFERENCES public.user_cards(id) ON DELETE SET NULL`
  - `created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())`
  - `updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())`
  - Restrição única composta: `UNIQUE (binder_id, page_number, slot_index)`
  - Índice único em `user_card_id` garante **Posse Física Estrita**: o banco rejeita qualquer tentativa de alocar a mesma cópia física em mais de um slot simultaneamente.

- **Atualização na Tabela `public.user_cards`**:
  - Modificar constraint de Pokédex:
    `ALTER TABLE public.user_cards DROP CONSTRAINT IF EXISTS user_cards_pokemon_dex_id_check;`
    `ALTER TABLE public.user_cards ADD CONSTRAINT user_cards_pokemon_dex_id_check CHECK (pokemon_dex_id IS NULL OR (pokemon_dex_id >= 1 AND pokemon_dex_id <= 1025));`
  - Remover índice restrito legado `user_cards_user_pokemon_binder_idx`.
  - Criar trigger automática em `binder_slots` para sincronizar o campo booleano `user_cards.is_in_binder` (true quando associado a um slot, false quando liberado), mantendo a alta performance da RPC `get_user_collection_groups` na Coleção sem custos adicionais de join.

- **Migração Transparente de Dados Legados**:
  - Script executado no banco que detecta todos os usuários existentes com cartas registradas.
  - Para cada usuário, insere um binder com nome `'Kanto 151 Original'`, `grid_type = '3x3'`, `total_pages = 17`, `is_featured = true`.
  - Insere 151 slots com `slot_type = 'pokemon'` e `target_dex_id = 1..151` nas páginas 1 a 17.
  - Atualiza os slots associando `user_card_id = user_cards.id` onde `user_cards.is_in_binder = true` e o `pokemon_dex_id` coincide.

### 2. Mapeamento de Pokédex e Catálogo Expandido

- Dataset estático centralizado com nomes e tipos elementais de todos os 1.025 Pokémon oficiais. As imagens locais oficiais já estão organizadas em subpastas por geração (`public/pokemon/gen1..9/[dexId].png`).
- Funções utilitárias de Pokédex e elemento atualizadas para cobrir o intervalo de 1 a 1025.
- A busca no catálogo (`GET /api/search`) suporta termos genéricos sem requerer parâmetro obrigatório de Pokémon, consultando por nome de carta e desduplicando resultados da TCGdex com proteção contra cartas do Pocket.
- A inserção (`POST /api/cards`) permite `pokemon_dex_id` numérico (1 a 1025) ou `null` para cartas de Treinadores e Energias.

### 3. Rotas da Aplicação e Endpoints de API

- **Rotas de Frontend**:
  - `/`: Estante de Binders (listagem, KPIs, capas e atalho para novo binder).
  - `/binders/[id]`: Visualizador do fichário com folheamento, controles de página e painel de estatísticas.
  - `/binders/new`: Assistente de criação de novos binders.
  - `/binders/[id]/edit`: Editor de páginas, metadados e estrutura do binder.
  - `/collection`: Inventário geral da coleção com adição direta.
  - `/cards/[id]`: Detalhes da carta e localização física no binder.
  - `/perfil/[username]`: Perfil público híbrido com o binder em destaque e demais binders públicos.
  - `/dashboard`: Rota legada redirecionada com status 308 permanente para `/`.
- **Rotas de Backend**:
  - `GET /api/binders`: Lista os binders do usuário com estatísticas agregadas.
  - `POST /api/binders`: Criação do binder e geração em lote dos slots iniciais via transação atômica.
  - `GET /api/binders/[id]`: Carrega metadados, páginas, slots e cartas alocadas do binder.
  - `PATCH /api/binders/[id]`: Atualiza metadados ou altera quantidade de páginas com desalocação segura.
  - `DELETE /api/binders/[id]`: Exclui o binder e libera as cartas de volta para guardadas.
  - `POST /api/binders/[id]/slots/[slotId]/assign`: Vincula uma carta da coleção a um slot do binder.
  - `DELETE /api/binders/[id]/slots/[slotId]/assign`: Desvincula a carta do slot de forma otimista com rollback.

### 4. Interface e Experiência do Usuário (UI/UX)

- **Header e BottomNav**: Estruturados com duas abas principais: **Meus Binders** (`/`) e **Coleção** (`/collection`), com slider deslizante contínuo e sem referências residuais ao Dashboard.
- **Grids Adaptativos**:
  - 1×1: 1 slot central amplo por página, proporção clássica de single pocket binder.
  - 2×2: 4 slots por página (2 colunas × 2 linhas).
  - 3×3: 9 slots por página (3 colunas × 3 linhas).
  - 3×4: 12 slots por página (3 colunas × 4 linhas).
  - As folhas no desktop adaptam o aspect ratio físico ao grid, mantendo a proporção `8/11` das cartas intacta.
- **Painel Retrátil de Estatísticas**:
  - Drawer acionado por botão no cabeçalho do binder.
  - KPIs: Metas preenchidas (`X / Y Metas`) e Ocupação física (`Z / Total Slots`).
  - Mapa visual de slots clicáveis com salto imediato para a página do slot e destaque elemental suave.

## Testing Decisions

### O que constitui um bom teste

- Os testes devem verificar estritamente o comportamento externo e regras de negócio invariantes, nunca detalhes voláteis de implementação interna.
- Os testes devem cobrir os fluxos críticos de integridade de dados:
  1. Posse física estrita (impedir que o mesmo exemplar esteja alocado em dois slots ao mesmo tempo).
  2. Compatibilidade de slots (rejeitar carta de Pokémon diferente em slot com `slot_type = 'pokemon'`; aceitar qualquer carta em `slot_type = 'free'`; aceitar apenas a carta exata em `slot_type = 'card'`).
  3. Cálculo de KPIs (metas versus ocupação em binders mistos e em binders 100% livres).
  4. Desalocação segura na redução de páginas (garantir que as cartas removidas voltem ao status de guardadas na coleção).
  5. Paridade de validação (rejeitar payloads com campos longos demais ou formatos inválidos).

### Módulos a serem testados

1. **Camada de Integração de API (Highest Seam)**:
   - Testar os Route Handlers de binders (`/api/binders`, `/api/binders/[id]`, alocação de slots) simulando chamadas HTTP autenticadas e verificando status codes e integridade no banco.
2. **Camada de Regras de Domínio**:
   - Utilitários de cálculo de estatísticas e progresso de metas.
   - Mapeamento e validação de compatibilidade entre cartas e slots.
   - Algoritmo de geração de slots a partir de blocos e templates.

### Prior Art no Repositório

- O projeto utiliza a suíte de testes com Bun (`tests/`), seguindo o padrão de testes unitários e de integração existentes em `tests/` para autenticação, validação de tipos de cartas e regras de conservação.

## Out of Scope

- Suporte a cartas digitais exclusivas do Pokémon TCG Pocket (mantido o bloqueio estrito conforme ADR 0004).
- Reconfiguração do grid de um binder após sua criação (o grid 1×1, 2×2, 3×3 ou 3×4 é imutável após criado; apenas páginas podem ser adicionadas ou removidas).
- Criação de novos jogos de cartas colecionáveis fora do ecossistema de Pokémon TCG.
- Autenticação por provedores que não sejam o Google OAuth.

## Further Notes

- A migração do banco de dados deve ser executada diretamente via MCP no Supabase antes da ativação dos novos componentes no frontend, garantindo que o banco esteja pronto para receber tanto cartas sem Pokémon quanto a nova estrutura de tabelas.
- Todas as alterações seguem a regra estrita de não inclusão de comentários em código e documentação integral em português do Brasil (PT-BR).
