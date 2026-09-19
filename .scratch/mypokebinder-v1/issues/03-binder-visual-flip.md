# 03: Binder visual com silhuetas e flip

**What to build:** The binder page showing two 3×3 pages side by side (a spread of 18 slots). Each of the 151 slots shows a black silhouette of the Pokémon (official artwork with CSS brightness(0) filter). The user can flip pages with a book-like animation, navigating through 9 spreads. Filled slots (from the binder API) show the TCG card image instead of the silhouette. The Pokémon's dex number and name appear subtly on each slot.

**Blocked by:** 02 (Schema + API do Binder)

**Status:** resolved

- [x] Binder page fetches data from `GET /api/binder` on load
- [x] 9 spreads rendered, each showing two 3×3 grids (left page + right page)
- [x] Slots mapped by Pokédex number: slot 1 = Bulbasaur (spread 1, left page, top-left), slot 151 = Mew (spread 9, left page, row 2 col 3)
- [x] Empty slots display silhouette: official artwork from PokéAPI (`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{dex_id}.png`) with CSS `brightness(0)` filter
- [x] Filled slots display the cached TCG card image from Supabase
- [x] Each slot shows the Pokémon's dex number and English name
- [x] Page-flip animation (CSS-based book flip) when navigating between spreads
- [x] Navigation controls (previous/next spread) with current spread indicator
- [x] Glassmorphism styling on the binder frame, dark theme with gradient accents
- [x] Trailing empty slots (152–162) on spread 9 are visually distinct (no Pokémon assigned)
