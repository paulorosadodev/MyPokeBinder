CREATE TABLE IF NOT EXISTS public.user_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pokemon_dex_id INTEGER NOT NULL CHECK (pokemon_dex_id >= 1 AND pokemon_dex_id <= 151),
  tcgdex_card_id TEXT NOT NULL,
  card_name TEXT NOT NULL,
  card_image_url TEXT NOT NULL,
  card_set_name TEXT NOT NULL DEFAULT '',
  card_rarity TEXT NOT NULL DEFAULT '',
  card_language TEXT NOT NULL DEFAULT 'pt-br' CHECK (card_language IN ('pt-br', 'en', 'ja')),
  is_full_art BOOLEAN NOT NULL DEFAULT false,
  is_in_binder BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT user_cards_user_card_unique UNIQUE (user_id, tcgdex_card_id)
);

CREATE UNIQUE INDEX IF NOT EXISTS user_cards_user_pokemon_binder_idx 
  ON public.user_cards (user_id, pokemon_dex_id) 
  WHERE is_in_binder = true;

CREATE INDEX IF NOT EXISTS user_cards_user_id_idx ON public.user_cards (user_id);
CREATE INDEX IF NOT EXISTS user_cards_user_pokemon_idx ON public.user_cards (user_id, pokemon_dex_id);

ALTER TABLE public.user_cards ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'user_cards' AND policyname = 'Users can view own cards'
  ) THEN
    CREATE POLICY "Users can view own cards" ON public.user_cards
      FOR SELECT TO authenticated
      USING ((SELECT auth.uid()) = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'user_cards' AND policyname = 'Users can insert own cards'
  ) THEN
    CREATE POLICY "Users can insert own cards" ON public.user_cards
      FOR INSERT TO authenticated
      WITH CHECK ((SELECT auth.uid()) = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'user_cards' AND policyname = 'Users can update own cards'
  ) THEN
    CREATE POLICY "Users can update own cards" ON public.user_cards
      FOR UPDATE TO authenticated
      USING ((SELECT auth.uid()) = user_id)
      WITH CHECK ((SELECT auth.uid()) = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'user_cards' AND policyname = 'Users can delete own cards'
  ) THEN
    CREATE POLICY "Users can delete own cards" ON public.user_cards
      FOR DELETE TO authenticated
      USING ((SELECT auth.uid()) = user_id);
  END IF;
END $$;

GRANT ALL ON public.user_cards TO authenticated;
GRANT ALL ON public.user_cards TO service_role;
