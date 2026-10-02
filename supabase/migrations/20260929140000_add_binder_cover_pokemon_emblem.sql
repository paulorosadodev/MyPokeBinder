ALTER TABLE public.binders
    ADD COLUMN IF NOT EXISTS cover_pokemon_dex_id INTEGER;

ALTER TABLE public.binders
    DROP CONSTRAINT IF EXISTS binders_cover_pokemon_dex_id_check;

ALTER TABLE public.binders
    ADD CONSTRAINT binders_cover_pokemon_dex_id_check
    CHECK (cover_pokemon_dex_id IS NULL OR (cover_pokemon_dex_id >= 1 AND cover_pokemon_dex_id <= 1025));
