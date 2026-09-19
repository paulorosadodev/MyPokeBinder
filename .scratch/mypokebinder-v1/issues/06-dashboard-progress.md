# 06: Dashboard de progresso

**What to build:** A dashboard page accessible via the main navigation that gives collectors a high-level visual overview of their 151 binder progress. Features completion counters (Total filled / 151, Full Art count / 151), progress bars with gradient accents, and an interactive 151-slot mini-grid visualizer that shows filled vs empty vs full art slots at a glance.

**Blocked by:** 02 (Schema + API do Binder)

**Status:** resolved

- [x] `GET /api/dashboard` route computing and returning:
    - `total_in_binder`: number of unique slots filled (0–151)
    - `total_full_art`: number of binder cards marked as Full Art
    - `total_collection`: total cards owned across all Pokémon
    - `completion_percentage`: rounded percentage of binder filled
    - `slots`: 151-element array containing `{ pokemon_dex_id, pokemon_name, is_filled, is_full_art, card_image_url }`
- [x] Dashboard page (`/dashboard`) with navigation header between "Binder" and "Dashboard"
- [x] Metric cards:
    - Total Binder Progress: large counter `X / 151` with percentage and gradient progress bar
    - Full Art Progress: counter `Y / 151` with percentage and gold/holo accent progress bar
    - Total Collection Size: total number of cards registered
- [x] 151-slot mini-grid: compact visual grid showing all 151 Pokémon with color coding (empty silhouette, regular card, full art card)
- [x] Hover tooltips on mini-grid slots showing Pokémon name and slot status
- [x] Clicking a slot in the mini-grid navigates directly to the corresponding spread in the Binder view
- [x] Glassmorphic card styling matching the dark theme design system
- [x] Tests: `GET /api/dashboard` computes correct counts, handles empty collection, and returns all 151 slots in order
