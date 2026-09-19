# MyPokeBinder

A personal Pokémon TCG binder tracker that mirrors a physical 3×3 binder for the original 151 Pokémon.

## Language

**Binder**:
The digital representation of a physical 3×3 card binder. Contains exactly 151 fixed slots, one per original Pokémon.
_Avoid_: album, folder, collection

**Spread**:
Two pages shown side by side when the binder is open. Each spread displays 18 slots (9 left + 9 right). The binder has 9 spreads total.
_Avoid_: view, layout, double-page

**Page**:
One side of a spread, containing 9 slots arranged in a 3×3 grid.
_Avoid_: sheet, panel

**Slot**:
A fixed position in the binder mapped 1:1 to a Pokédex number (1–151). Slot 1 is always Bulbasaur, slot 151 is always Mew.
_Avoid_: cell, position, space

**Binder Card**:
The specific TCG card currently assigned to a slot. Each slot has at most one binder card at any time.
_Avoid_: active card, selected card, displayed card

**Collection**:
All TCG cards a user has registered for a given Pokémon, including cards not currently in the binder. A user may own multiple cards of the same Pokémon across different sets.
_Avoid_: inventory, library, deck

**Full Art**:
A user-designated flag on a collected card indicating it is a full-art variant. Not inferred from rarity or API data — always set manually by the user.
_Avoid_: illustration rare, special art, alt art

**Silhouette**:
The darkened outline of a Pokémon's official artwork, shown in a slot when the user has no binder card for that Pokémon. Evokes the "Who's that Pokémon?" motif.
_Avoid_: placeholder, ghost, shadow

**Card Language**:
The language of a TCG card's printed text and image. Stored per card, not as a global user preference — a single binder may contain cards in different languages. Supported values: PT-BR (default), EN, JA.
_Avoid_: locale, user language, app language
