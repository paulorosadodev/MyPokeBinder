# 01: Scaffold + Auth Google

**What to build:** A working Next.js app running on Bun with Supabase Auth via Google OAuth. The user lands on a login page, signs in with Google, and is redirected to a protected home page. Logging out returns them to the login page. Unauthenticated users cannot access any protected route.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] Next.js project initialized with Bun (App Router, TypeScript)
- [x] Supabase client configured (`@supabase/ssr`) with environment variables
- [x] Google OAuth provider enabled in Supabase Auth
- [x] Login page with "Sign in with Google" button
- [x] Auth callback route handling the OAuth redirect
- [x] Middleware protecting all routes except login and callback
- [x] Authenticated home page showing the user's name/email and a logout button
- [x] Logout clears session and redirects to login
- [x] CSS design system scaffolded: dark theme with Pokémon-inspired gradient accents (red/blue/yellow), all colors as CSS custom properties in a central stylesheet for easy theme swapping
