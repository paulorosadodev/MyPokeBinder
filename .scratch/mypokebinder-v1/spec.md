Status: ready-for-agent

## Problem Statement

A Pokémon TCG collector is building a physical 3×3 binder for the original 151 Pokémon. They have no way to track which slots are filled, which cards they own for each Pokémon, or how close they are to completing the binder. Manually mapping Pokédex numbers to binder pages and remembering which cards are already acquired is error-prone and tedious.

## Solution

A web application called **MyPokeBinder** that digitally mirrors the physical binder. Each of the 151 Pokémon has a fixed slot. The user navigates the binder as an open book with page-flip animations, seeing silhouettes for missing Pokémon and real TCG card images for acquired ones. A drawer lets them manage their collection per Pokémon, and a dashboard shows overall progress.

## User Stories

1. As a collector, I want to sign in with my Google account, so that my binder data is saved and private to me.
2. As a collector, I want to see my binder open with two pages side by side (18 slots per spread), so that it feels like browsing my physical binder.
3. As a collector, I want to flip pages with an animation, so that the experience feels tactile and real.
4. As a mobile user, I want to see one page at a time and swipe to navigate, so that the binder is usable on smaller screens.
5. As a collector, I want each slot to be fixed to a Pokédex number (slot 1 = Bulbasaur, slot 151 = Mew), so that the digital layout matches my physical binder.
6. As a collector, I want to see a black silhouette of the Pokémon in empty slots, so that I know which Pokémon belongs there and feel motivated to fill it.
7. As a collector, I want to see the actual TCG card image in filled slots, so that I can admire my collection.
8. As a collector, I want to click an empty slot and search for TCG cards of that Pokémon, so that I can pick which card to add.
9. As a collector, I want to see card previews (image, set name, rarity) in the search results, so that I can choose the right card.
10. As a collector, I want to mark a card as Full Art when adding it, so that I can track my full art progress.
11. As a collector, I want to click a filled slot and see a drawer with the binder card in detail plus all other cards I own for that Pokémon, so that I can manage my collection.
12. As a collector, I want to swap the binder card for another card I own of the same Pokémon, so that I can upgrade my binder over time.
13. As a collector, I want to toggle the Full Art flag on any card at any time, so that I can correct mistakes or update my classification.
14. As a collector, I want to remove a card from my collection, so that I can fix errors.
15. As a collector, I want to remove a card from the binder (returning the slot to silhouette), so that I can reflect selling or trading a card.
16. As a collector, I want to see a dashboard with counters (X/151 normal, Y/151 full art) and progress bars, so that I know how close I am to completion.
17. As a collector, I want to see a mini-grid of all 151 Pokémon on the dashboard (colored = in binder, grey = missing), so that I get a visual overview of my progress.
18. As a collector, I want the binder to load instantly from cached data, so that I don't wait for external APIs on every visit.
19. As a new user, I want to be redirected to a login page if I'm not authenticated, so that my data is protected.
20. As a user, I want to log out, so that I can end my session.
21. As a collector, I want to own multiple cards of the same Pokémon across different sets, so that my full collection is tracked even if only one is in the binder.
22. As a collector, I want the progress counter to reflect only cards placed in the binder (not just collected), so that the dashboard shows binder completion, not collection size.
23. As a collector, I want the card search to default to PT-BR cards, so that I see Portuguese cards first since that's what I mostly collect.
24. As a collector, I want to switch the search language to English or Japanese, so that I can find and register cards printed in those languages.
25. As a collector, I want each card in my collection to remember which language it was added in, so that the correct card image is always displayed.
26. As a collector, I want to add another card to my collection from the drawer (without replacing the binder card), so that I can track duplicates or cards I own but prefer not to slot.
27. As a collector, I want to remove a card from the binder but keep it in my collection, so that I can reflect moving a card out of the physical binder without losing track of it.

## Implementation Decisions

### Stack

- **Runtime**: Bun
- **Framework**: Next.js with App Router (frontend + backend in one project)
- **Database & Auth**: Supabase
- **Auth provider**: Google OAuth via Supabase Auth
- **External APIs**: TCGdex REST API (`api.tcgdex.net/v2/{lang}`) for card search and images, where `{lang}` is `pt-br` (default), `en`, or `ja`; PokéAPI (`pokeapi.co/api/v2`) for Pokémon official artwork (used to generate silhouettes)

### Auth & Multi-tenancy

- Google OAuth is the only auth method (Supabase free tier compatible)
- The app is multi-tenant: each user has their own binder
- All user data is protected by Supabase Row Level Security (RLS)
- Next.js uses `@supabase/ssr` for server-side auth with cookie-based sessions

### Database Schema

- A single `user_cards` table stores the user's collection
- Columns: `id`, `user_id`, `pokemon_dex_id` (1–151), `tcgdex_card_id`, `card_name`, `card_image_url`, `card_set_name`, `card_rarity`, `card_language` (text, default `'pt-br'`, one of `'pt-br'`, `'en'`, `'ja'`), `is_full_art` (boolean, default false), `is_in_binder` (boolean, default false), `created_at`, `updated_at`
- `UNIQUE(user_id, tcgdex_card_id)` prevents duplicate cards
- Partial unique index `UNIQUE(user_id, pokemon_dex_id) WHERE is_in_binder = true` ensures only one binder card per Pokémon per user
- RLS policies: users can only SELECT, INSERT, UPDATE, DELETE their own rows (`auth.uid() = user_id`)

### Collection vs Binder Logic

- The `is_in_binder` boolean determines whether a card occupies a binder slot or is just in the user's collection
- A card ends up with `is_in_binder = false` in three scenarios:
    1. **Swap**: user replaces a binder card with another → old card becomes `is_in_binder = false`, new card becomes `is_in_binder = true`
    2. **Remove from binder**: user removes a card from the binder but keeps it in the collection → card becomes `is_in_binder = false`, slot returns to silhouette
    3. **Add without slotting**: from the drawer (when a slot is already filled), user clicks "Add another card" → new card is added with `is_in_binder = false`
- Collection cards (not in binder) are only visible through the drawer when clicking the corresponding Pokémon's slot — there is no separate collection page

### Data & Caching Strategy (ADR-0001)

- TCGdex is called only during the search/add flow — never at binder render time
- When a user adds a card, its metadata is persisted in Supabase
- The binder view reads exclusively from Supabase
- PokéAPI official artwork URLs are deterministic (`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{dex_id}.png`) — used client-side for silhouettes with CSS filter, cached by Next.js Image optimization

### API Route Handlers

- `GET /api/binder` — returns all binder cards for the authenticated user (where `is_in_binder = true`), ordered by `pokemon_dex_id`
- `GET /api/cards?pokemon_dex_id=N` — returns all cards the user owns for a given Pokémon
- `GET /api/search?name=Bulbasaur&lang=pt-br` — proxies TCGdex search in the specified language (default `pt-br`, also accepts `en`, `ja`), returns card previews
- `POST /api/cards` — adds a card to the user's collection (body: tcgdex_card_id, pokemon_dex_id, card_name, card_image_url, card_set_name, card_rarity, card_language, is_full_art, is_in_binder). `is_in_binder` can be `false` when adding from the drawer without slotting
- `PATCH /api/cards/:id` — updates a card (toggle is_in_binder, toggle is_full_art). When setting is_in_binder=true, the handler must first set is_in_binder=false on any existing binder card for that pokemon_dex_id (swap logic)
- `DELETE /api/cards/:id` — removes a card from the collection
- `GET /api/dashboard` — returns progress counters: total in binder, total full art, and a 151-element array of binder status per dex_id

### Binder UX

- Desktop: spread of two 3×3 pages with CSS-based page-flip animation
- Mobile (< 768px): single 3×3 page with swipe navigation
- 9 spreads total (151 slots + 11 empty trailing slots)
- Empty slots show silhouette (official artwork with CSS `brightness(0)` filter)
- Filled slots show the TCG card image
- Clicking empty slot → card search modal filtered by that Pokémon's name (language selector defaults to PT-BR, switchable to EN/JA)
- Clicking filled slot → drawer with card detail + full collection for that Pokémon + "Add another card" button that opens search with `is_in_binder = false`

### Visual Direction

- Dark theme with Pokémon-inspired gradient accents (red, blue, yellow)
- Glassmorphism on card overlays and modals
- All theme colors defined as CSS custom properties in `index.css` for easy theme swapping
- UI language: Portuguese (pt-BR)
- Card data (names, images): per-card language (PT-BR default, EN, JA) — a binder may mix languages
- Pokémon names in the UI (slot labels, search): English (as used in TCG)

## Testing Decisions

### Testing seam

- The primary testing seam is the **API Route Handlers** layer. Each handler is an exported async function that takes a `Request` and returns a `Response` — testable without a browser or UI.
- Tests will call these functions directly with mocked Supabase clients to verify behavior.

### What makes a good test

- Tests should verify external behavior (HTTP status codes, response bodies, side effects on the database), not implementation details.
- Each test should set up its own state, exercise the handler, and assert the outcome.

### Modules to test

- `POST /api/cards` — adding a card, duplicate prevention, binder slot constraint
- `PATCH /api/cards/:id` — toggling is_in_binder (including swap logic), toggling is_full_art
- `DELETE /api/cards/:id` — removing a card
- `GET /api/binder` — correct filtering and ordering
- `GET /api/dashboard` — correct progress computation
- RLS policies tested separately via SQL: verify that queries scoped to user A cannot see user B's data

### UI testing

- Out of scope for automated tests in the initial build. Verified manually.

## Out of Scope

- **Card trading or marketplace features** — this is a personal tracker, not a trading platform
- **Pokémon beyond the original 151** — the binder is scoped to Kanto dex only
- **Price tracking** — TCGdex has pricing data but we don't surface it
- **Offline/PWA support** — the app requires an internet connection
- **Full i18n** — UI is PT-BR only; card language selection (PT-BR/EN/JA) is per-card, not a full app translation system
- **Automated UI testing (Playwright)** — deferred to a later phase
- **Email/password auth** — Google OAuth only
- **Card condition tracking** — no grading or condition metadata
- **Import/export** — no CSV or bulk import of collection data

## Further Notes

- The TCGdex API returns a `dexId` array on each card object, which maps cards to Pokédex numbers. This is how we link a TCG card to a binder slot.
- Some TCG cards on TCGdex may lack an `image` field — the search UI should filter these out or show a fallback.
- The official artwork sprite URL from PokéAPI is deterministic and doesn't require an API call: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png`
- The `domain-modeling` skill produced a glossary at `docs/CONTEXT.md` with canonical terms (Binder, Spread, Page, Slot, Binder Card, Collection, Full Art, Silhouette, Card Language). All code and UI should use this vocabulary.
- ADR-0001 (`docs/adr/0001-cache-only-user-added-cards.md`) documents the caching decision.
- TCGdex language codes: `pt-br`, `en`, `ja`. The API base URL changes per language: `api.tcgdex.net/v2/pt-br/cards`, `api.tcgdex.net/v2/en/cards`, `api.tcgdex.net/v2/ja/cards`. Card images are language-specific (a PT-BR card image shows Portuguese text on the card).
