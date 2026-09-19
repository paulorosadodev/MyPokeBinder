# 02: Schema + API do Binder

**What to build:** The `user_cards` table in Supabase with RLS, and the `GET /api/binder` route that returns all binder cards for the authenticated user. An authenticated user hitting the endpoint gets back an ordered array of their binder cards (empty at first). RLS ensures user A cannot see user B's data.

**Blocked by:** 01 (Scaffold + Auth Google)

**Status:** resolved

- [x] Supabase migration creating `user_cards` table with all columns: `id`, `user_id`, `pokemon_dex_id`, `tcgdex_card_id`, `card_name`, `card_image_url`, `card_set_name`, `card_rarity`, `card_language` (default `'pt-br'`, check constraint for `'pt-br'`, `'en'`, `'ja'`), `is_full_art`, `is_in_binder`, `created_at`, `updated_at`
- [x] `UNIQUE(user_id, tcgdex_card_id)` constraint
- [x] Partial unique index `UNIQUE(user_id, pokemon_dex_id) WHERE is_in_binder = true`
- [x] RLS enabled with policies: users can only SELECT, INSERT, UPDATE, DELETE their own rows
- [x] `GET /api/binder` route returning all cards where `is_in_binder = true`, ordered by `pokemon_dex_id`
- [x] Route returns 401 for unauthenticated requests
- [x] Tests: RLS policies verified via SQL (user A cannot read user B's rows)
- [x] Tests: `GET /api/binder` returns correct data shape and ordering
