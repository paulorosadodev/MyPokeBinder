# ADR 0019: Assets Locais de Pokémon, Request Coalescing e Escala Multi-Tenant

## Status

Aceito

## Contexto

A auditoria de multi-tenancy, cache e disponibilidade identificou oportunidades de melhoria em três eixos centrais:

1. **Dependência de CDN Externa para as 151 Silhuetas**:
   O aplicativo consumia as 151 silhuetas dos monstrinhos via `raw.githubusercontent.com`. Essa abordagem expunha a aplicação a riscos de bloqueio por rate-limiting de IP e atraso de rede desnecessário, visto que as 151 ilustrações oficiais da primeira geração são estáticas e imutáveis.

2. **Concorrência e Cache Stampede na Busca da TCGdex**:
   Múltiplos usuários pesquisando o mesmo Pokémon simultaneamente disparavam chamadas repetidas à API externa da TCGdex, acompanhadas de um padrão N+1 de requisições paralelas para coletar raridades e nomes de expansões.

3. **Inconsistência de Otimização de Imagens**:
   Enquanto o Binder utilizava imagens diretas com `unoptimized`, o Dashboard e a Coleção mantinham `<Image />` sem essa propriedade, sobrecarregando o servidor com chamadas locais de redimensionamento a `/_next/image` e impedindo o reaproveitamento do cache de disco do navegador.

4. **Escala de Consultas da Coleção no PostgreSQL**:
   As consultas de coleção e dashboard filtravam por `user_id` e ordenavam por `created_at DESC` sem um índice composto dedicado, forçando operações de ordenação em memória (_Filesort_).

## Decisões

1. **Armazenamento e Serviço Local dos 151 Pokémon**:
    - Todas as 151 artes oficiais foram baixadas em lotes com concorrência controlada para a pasta local `public/pokemon/[dexId].png`.
    - A função `getPokemonSilhouetteUrl` e a página 404 foram atualizadas para consumir diretamente esses assets locais, eliminando 100% das chamadas externas à PokeAPI/GitHub.

2. **Request Coalescing e Cache em Memória no Next.js**:
    - Implementado o módulo `src/lib/pokemon/coalesce.ts` com fila de promessas em voo (_in-flight promise coalescing_). Requisições simultâneas para o mesmo termo aguardam a mesma execução, disparando no máximo uma única chamada externa para a TCGdex.
    - Cache em memória para detalhes de cartas com TTL de 24 horas, eliminando chamadas repetidas de expansão e raridade.
    - Resposta do endpoint `GET /api/search` configurada com cabeçalho `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`, permitindo resposta instantânea aos clientes e revalidação assíncrona.
    - Cache em memória no cliente adicionado em `CardSearchModal` para reaberturas instantâneas (0ms).

3. **Unificação de `unoptimized` na Coleção e no Dashboard**:
    - Propriedade `unoptimized` aplicada aos cards da Coleção e aos 151 slots do Dashboard, garantindo que todo o ecossistema consuma WebP leve direto da CDN da TCGdex ou do disco local sem penalidade de processamento no servidor.

4. **Índice Composto para Multi-Tenancy no Supabase**:
    - Criado e aplicado o índice `user_cards_user_created_idx (user_id, created_at DESC)` no PostgreSQL, otimizando listagens de inventário para milhares de usuários simultâneos.

5. **Higienização de Memória no Logout**:
    - Atualizado o encerramento de sessão em `Header.tsx` para redirecionamento estrito com `window.location.href = "/login"`, resetando toda a memória do navegador, instâncias de SWR e variáveis de estado entre diferentes usuários na mesma máquina.

## Consequências

- **Disponibilidade**: Zero risco de queda ou lentidão por indisponibilidade da PokeAPI/GitHub.
- **Resiliência**: A TCGdex é protegida contra picos de tráfego, garantindo deduplicação atômica de requisições.
- **Performance**: Navegação e carregamento visual instantâneos na Coleção, Dashboard e Binder por reaproveitamento unificado de cache de disco.
- **Isolamento**: Proteção estrita de dados e garantia de desempenho consistente em ambientes multi-tenant com múltiplos usuários concorrentes.
