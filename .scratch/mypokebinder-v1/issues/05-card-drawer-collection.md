# 05: Drawer de detalhes + gestão da coleção

**What to build:** Clicking a filled slot opens a slide-over drawer displaying the featured binder card details, actions (toggle Full Art, unslot from binder, delete card), and the full collection of cards owned for that Pokémon. Users can swap which card is displayed in the binder, delete cards from their collection entirely, or click "Adicionar outra carta" to search and add more cards with `is_in_binder = false`.

**Blocked by:** 04 (Busca de cartas + adicionar ao binder)

**Status:** resolved

- [x] `GET /api/cards?pokemon_dex_id=N` route returning all cards owned by the authenticated user for a specific Pokémon (ordered by `created_at desc`)
- [x] `PATCH /api/cards/:id` route supporting:
    - Toggle `is_full_art` (`{ is_full_art: boolean }`)
    - Toggle `is_in_binder` (`{ is_in_binder: boolean }`). When setting `is_in_binder = true`, automatically sets `is_in_binder = false` on any currently slotted card for that `pokemon_dex_id` (atomic swap)
- [x] `DELETE /api/cards/:id` route removing a card from the collection (with ownership check via RLS / user_id)
- [x] Drawer UI opening from the right when clicking a filled binder slot
- [x] Featured card display: large card image, card name, set name, rarity, language badge (PT-BR, EN, JA), Full Art indicator
- [x] Quick actions on featured card: toggle Full Art, remove from binder (reverts slot to silhouette without deleting card from collection), delete from collection
- [x] Collection list inside drawer: thumbnails of all owned cards for this Pokémon with metadata and language indicator
- [x] Swap card action: clicking an unslotted card in the collection allows making it the active binder card
- [x] Delete action on any card in the collection with confirmation prompt
- [x] "Adicionar outra carta" button opening the search modal pre-configured to add with `is_in_binder = false`
- [x] Real-time update of binder slot and collection list when cards are swapped, unslotted, added, or deleted
- [x] Tests: `GET /api/cards?pokemon_dex_id=N` returns user's cards for that Pokémon
- [x] Tests: `PATCH /api/cards/:id` handles `is_full_art` and `is_in_binder` swap logic correctly
- [x] Tests: `DELETE /api/cards/:id` successfully deletes user's card and rejects unauthorized deletion
