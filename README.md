<p align="center">
  <img src="public/banner.png" alt="MyPokeBinder" width="100%" />
</p>

Organizador digital de cartas físicas do **Pokémon TCG**, focado nos **151 Pokémon originais**. O app espelha um binder físico 3×3: cada slot corresponde a um número da Pokédex (#001–#151), e você escolhe qual exemplar da sua coleção fica em exposição.

> Projeto de fã independente. Não possui afiliação comercial com Nintendo, Creatures Inc. ou The Pokémon Company.

---

## Sumário

- [Visão geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Stack](#stack)
- [Arquitetura](#arquitetura)
- [Rotas da aplicação](#rotas-da-aplicação)
- [API](#api)
- [Modelo de dados](#modelo-de-dados)
- [Começando](#começando)
- [Scripts](#scripts)
- [Testes](#testes)
- [Documentação interna](#documentação-interna)
- [Avisos legais](#avisos-legais)

---

## Visão geral

MyPokeBinder trata o binder como uma **vitrine limpa**: cartas preenchidas mostram 100% da arte física, sem números, nomes ou ícones sobrepostos. Slots vazios exibem a silhueta do Pokémon. A navegação folheia páginas com física realista (PageFlip), com capa frontal, 17 páginas de catálogo, forro interno e capa traseira.

O fluxo principal:

1. **Entrar** com Google (Supabase Auth)
2. **Buscar** cartas físicas no catálogo TCGdex (somente inglês)
3. **Guardar** exemplares na Coleção (idioma, versão física, quantidade)
4. **Expor** no Binder um exemplar por Pokémon (#1–#151)
5. **Acompanhar** progresso no Dashboard e no Perfil público

---

## Funcionalidades

### Binder (`/`)

- Binder 3×3 com **151 slots fixos** (1:1 com a Pokédex original)
- Folheamento realista com **PageFlip** (capas, dobra de cantos, sombras)
- **Desktop**: spread de 2 páginas · **Mobile**: 1 página (portrait)
- Clique no slot abre o seletor de cartas daquele Pokémon
- Busca no binder com **glow elemental** (cor do tipo do Pokémon)
- Animação de **queda da carta** ao vincular, com partículas e áudio procedural
- Preload completo das imagens do spread inicial antes de revelar a abertura

### Coleção (`/collection`)

- Inventário de todas as cartas físicas cadastradas
- Filtros: status (Todas / No Binder / Guardadas), idioma, raridade, ordenação
- Ordenação por Pokédex, nome ou data de adição (crescente/decrescente)
- Estado dos filtros persistido em `sessionStorage` ao navegar para detalhes
- Grid responsivo (3 colunas no mobile)
- Agrupamento de cópias idênticas (`tcgdex_card_id` + idioma + variante)

### Página da carta (`/cards/[id]`)

- Edição do exemplar: idioma (`pt-br` / `en` / `ja`), versão física (`normal` / `holo` / `reverse`)
- Quantidade (+/−), vínculo com o Binder e exclusão com confirmação
- Showcase 3D com brilho foil ou prismático (Full Art)
- Retorno inteligente: volta à Coleção com filtros, ou ao Binder reabrindo o seletor

### Dashboard (`/dashboard`)

- KPIs: progresso Binder 151 e total na Coleção
- Mini-Grid dos 151 com arte colorida (preenchido) ou silhueta (vazio)
- Hover com glow na cor do tema do treinador

### Perfil público (`/perfil/[username]`)

- Trainer Card compartilhável (`@username`, avatar, bio)
- Mini-Grid, cartas em destaque (até 4) e distribuição por raridades
- Coleção pública em `/colecao/[username]` (somente leitura para visitantes)
- Tema visual do **dono** no conteúdo do perfil; Header/nav no tema do visitante

### Configurações (`/configuracoes`)

- Tema Pokémon com 6 opções (Venusaur, Charizard, Blastoise, Pikachu, Gengar, Mew)
- Sync de tema via Supabase Realtime entre dispositivos
- Som e animações **por dispositivo** (`localStorage`): tilt 3D, PageFlip, card-drop, partículas
- Logout seguro (Supabase Auth)

### Experiência e polish

- Login imersivo com arte da 1ª geração
- Landing pública (`/inicio`) para visitantes e consent Google OAuth
- Termos (`/termos`) e Privacidade (`/privacidade`) · LGPD + Google Limited Use
- 404 temática (Psyduck)
- Toasts (Sonner) com atualizações otimistas e rollback
- Favicon dinâmico na cor do tema
- Full Art detectado automaticamente pela raridade TCGdex (brilho + partículas + som)

---

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/) |
| Ícones | [Lucide React](https://lucide.dev/) |
| Auth / DB | [Supabase](https://supabase.com/) (Auth Google OAuth, Postgres, RLS, Realtime) |
| Catálogo TCG | [TCGdex API](https://tcgdex.dev/) (busca e imagens em inglês) |
| Silhuetas | Assets locais (`/public/pokemon/gen[1–9]/`) + fallback PokeAPI |
| Binder 3D | [page-flip](https://github.com/Nodlik/StPageFlip) / `react-pageflip` |
| Data fetching (client) | [SWR](https://swr.vercel.app/) |
| Toasts | [Sonner](https://sonner.emilkowal.ski/) |
| Áudio | Web Audio API (síntese procedural, sem arquivos externos) |
| Linguagem | TypeScript |
| Runtime de testes | [Bun](https://bun.sh/) |
| Qualidade | ESLint, Prettier |

---

## Arquitetura

```
MyPokeBinder/
├── src/
│   ├── app/                 # Rotas App Router + API Route Handlers
│   ├── components/          # UI por domínio (binder, modal, profile, …)
│   ├── lib/                 # Auth, Supabase, hooks, áudio, Pokémon, UI
│   ├── middleware.ts        # Refresh de sessão Supabase
│   └── types/
├── public/pokemon/          # Silhuetas/sprites por geração
├── supabase/migrations/     # Schema Postgres + RLS + RPCs
├── tests/                   # Testes Bun
└── docs/
    ├── CONTEXT.md           # Modelo de domínio (fonte de verdade)
    └── adr/                 # Architecture Decision Records
```

**Fluxo de dados (resumo):**

- Browser → Route Handlers (`/api/*`) → Supabase (RLS) e/ou TCGdex
- Sessão: middleware + `AuthContext` (hidratação server + cache local)
- Preferências de tema: DB + Realtime; som/animações: só no dispositivo

---

## Rotas da aplicação

| Rota | Descrição |
| --- | --- |
| `/` | Binder (autenticado) ou landing (visitante) |
| `/inicio` | Landing pública |
| `/login` | Login com Google |
| `/collection` | Coleção do usuário |
| `/cards/[id]` | Detalhe / edição do exemplar |
| `/dashboard` | Progresso e Mini-Grid |
| `/perfil` → `/perfil/[username]` | Perfil do treinador |
| `/colecao/[username]` | Coleção pública |
| `/configuracoes` | Conta, tema, som e animações |
| `/termos`, `/terms` | Termos de Serviço |
| `/privacidade`, `/privacy` | Política de Privacidade |

---

## API

Route Handlers principais:

| Endpoint | Uso |
| --- | --- |
| `GET/PATCH /api/binder` | Estado dos 151 slots / vínculo de carta |
| `GET/POST /api/cards` | Listar / adicionar cartas à coleção |
| `GET/PATCH/DELETE /api/cards/[id]` | Detalhe, edição e exclusão |
| `GET /api/search` | Busca no catálogo TCGdex (EN) |
| `GET /api/dashboard` | Agregados do Dashboard |
| `GET/PATCH /api/settings` | Preferências de tema |
| `GET/PATCH /api/profile` | Perfil do usuário autenticado |
| `GET /api/profile/[username]` | Perfil público |
| `GET /api/profile/[username]/collection` | Coleção pública |
| `DELETE /api/account` | Encerramento de conta (quando aplicável) |

Autenticação e autorização são aplicadas nos handlers; o Postgres reforça isolamento com **Row Level Security**.

---

## Modelo de dados

Conceitos centrais (ver `docs/CONTEXT.md`):

| Conceito | Significado |
| --- | --- |
| **Slot** | Posição fixa #1–#151 no binder |
| **Binder Card** | Exemplar atualmente em exposição no slot (no máx. 1) |
| **Coleção** | Todos os exemplares físicos do usuário |
| **Versão física** | `normal`, `holo` ou `reverse` |
| **Idioma da carta** | Metadado da cópia física (`pt-br` / `en` / `ja`); imagens sempre em EN |
| **Full Art** | Derivado da raridade TCGdex (não é flag manual) |

Tabelas principais (evoluem via migrations em `supabase/migrations/`):

- `user_cards` — exemplares da coleção, vínculo com binder, idioma, variante
- `user_settings` — tema (Realtime)
- Perfis públicos — username, bio, favoritas / destaque

---

## Começando

### Pré-requisitos

- Node.js 20+ (recomendado) ou Bun
- Projeto Supabase com Auth Google OAuth configurado
- Variáveis de ambiente (veja `.env.example`)

### Variáveis de ambiente

Copie `.env.example` para `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### Banco de dados

Aplique as migrations em `supabase/migrations/` no projeto Supabase (CLI ou SQL Editor), na ordem dos timestamps.

### Instalação e desenvolvimento

```bash
npm install
# ou: bun install

npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

### Build de produção

```bash
npm run build
npm start
```

---

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento Next.js |
| `npm run build` | Build de produção |
| `npm start` | Serve o build |
| `npm test` | Suite de testes (Bun, `concurrency=1`) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier (write) |
| `npm run format:check` | Prettier (check) |

---

## Testes

Testes em `tests/` cobrem, entre outros:

- Validação de API de cartas e cópias na coleção
- Busca TCGdex e exclusão de cartas Pocket
- Binder (PageFlip, navegação, scroll condicional, abertura)
- Áudio / impacto do card-drop
- Perfil público, temas, selects e filtros
- Rotas legais e 404
- Feedback otimista (toasts)

```bash
npm test
```

---

## Documentação interna

| Arquivo | Conteúdo |
| --- | --- |
| [`docs/CONTEXT.md`](docs/CONTEXT.md) | Vocabulário e regras de domínio |
| [`docs/adr/`](docs/adr/) | Decisões de arquitetura (ADRs) |
| [`docs/agents/`](docs/agents/) | Guias para agentes (issue tracker, triage, domínio) |
| [`AGENTS.md`](AGENTS.md) | Entrypoint para agentes no repositório |

---

## Avisos legais

- MyPokeBinder é um projeto de fã **não oficial**.
- Pokémon e Pokémon TCG são marcas registradas de seus respectivos proprietários.
- Dados e imagens de cartas vêm da API pública TCGdex sob uso justo (*fair use*).
- Dados de autenticação Google são usados apenas para identificação do treinador e isolamento do acervo (RLS), em conformidade com a política de *Limited Use* e com a LGPD.

---

Feito para colecionadores que querem o binder físico — na tela, com a mesma satisfação de folhear.
