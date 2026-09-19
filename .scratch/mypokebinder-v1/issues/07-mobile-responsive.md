# 07: Layout responsivo mobile

**What to build:** Optimize the binder experience for mobile and tablet screens (< 768px). Instead of a two-page spread, mobile users see a single 3×3 page at a time with smooth swipe gesture navigation across 17 pages (151 slots + 2 trailing empty slots). Modals and drawers adapt to bottom-sheet / full-screen mobile layouts with touch-friendly controls.

**Blocked by:** 03 (Binder visual com silhuetas e flip)

**Status:** resolved

- [x] Mobile breakpoint layout (< 768px): render a single 3×3 grid per view instead of the dual-page desktop spread
- [x] Mobile page division: 17 single pages (9 slots per page, pages 1–16 with 9 slots = 144 slots; page 17 with slots 145–151 + 2 empty filler slots)
- [x] Touch gestures: smooth swipe left (next page) and swipe right (previous page) using touch events
- [x] Mobile navigation bar with quick page slider / indicator (`Página X de 17`) and prev/next tap buttons
- [x] Search modal mobile optimization: full-width / full-screen modal with sticky search bar, language selector buttons, and touch-optimized card list
- [x] Card detail drawer mobile optimization: bottom sheet transition or full-screen slide with safe-area padding
- [x] Dashboard mobile responsiveness: metric cards stack vertically, mini-grid wraps cleanly with legible touch targets
- [x] Mobile header with compact navigation (Binder / Dashboard / Logout)
- [x] Prevent unwanted horizontal scrolling or page bounce during swipe interactions
