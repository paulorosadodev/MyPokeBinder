# Cache only user-added cards from TCGdex

When a user adds a TCG card to their collection, we persist the card's metadata (TCGdex ID, name, image URL, set name, rarity) in Supabase. The binder view reads exclusively from this local cache rather than calling TCGdex at render time.

We considered two alternatives: (1) always fetching from TCGdex on every page load, and (2) pre-caching all cards for the 151 Pokémon into a reference table with a periodic sync job. Option 1 makes the binder view fragile — if TCGdex is slow or down, the user can't see their own binder. Option 2 adds a background job, a large reference table, and a staleness problem for data the user never asked for. Caching on-add avoids both: the binder is always fast and offline-resilient, the search flow is the only place that hits TCGdex (acceptable latency), and there's no maintenance burden.
