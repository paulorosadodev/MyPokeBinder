-- Profile bio + up to 4 favorite showcase cards.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS bio text,
  ADD COLUMN IF NOT EXISTS favorite_card_ids uuid[] NOT NULL DEFAULT '{}'::uuid[];

DO $$
BEGIN
  ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_bio_length_check;
  ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_bio_length_check
    CHECK (bio IS NULL OR char_length(bio) <= 160);

  ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_favorite_card_ids_len_check;
  ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_favorite_card_ids_len_check
    CHECK (cardinality(favorite_card_ids) <= 4);
END $$;
