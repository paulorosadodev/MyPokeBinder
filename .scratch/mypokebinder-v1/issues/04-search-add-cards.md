# 04: Busca de cartas + adicionar ao binder

**What to build:** Clicking an empty slot opens a search modal that queries TCGdex for cards of that Pokémon. The user sees card previews (image, set name, rarity), picks one, optionally marks it as Full Art, and adds it to the binder. The silhouette is replaced by the card image. The search defaults to PT-BR cards but has a language selector to switch to EN or JA.

**Blocked by:** 02 (Schema + API do Binder)

**Status:** resolved

- [x] `GET /api/search?name=Bulbasaur&lang=pt-br` route proxying TCGdex (`api.tcgdex.net/v2/{lang}/cards?name={name}`), filtering out results without an `image` field
- [x] `POST /api/cards` route adding a card to the user's collection with all fields: `tcgdex_card_id`, `pokemon_dex_id`, `card_name`, `card_image_url`, `card_set_name`, `card_rarity`, `card_language`, `is_full_art`, `is_in_binder`
- [x] Duplicate prevention: returns appropriate error if `(user_id, tcgdex_card_id)` already exists
- [x] Binder slot constraint: if `is_in_binder = true` and another card already occupies that slot, the existing card is set to `is_in_binder = false` first (swap logic)
- [x] Search modal opens when clicking an empty slot, pre-filtered by the Pokémon's English name
- [x] Language selector in search modal (PT-BR default, EN, JA) — switching language re-runs the search
- [x] Search results show card image, set name, and rarity
- [x] "Add to binder" button with Full Art toggle checkbox
- [x] After adding, the binder view updates: silhouette replaced by card image
- [x] Tests: `POST /api/cards` — successful add, duplicate rejection, swap logic
- [x] Tests: `GET /api/search` — correct proxying and filtering
