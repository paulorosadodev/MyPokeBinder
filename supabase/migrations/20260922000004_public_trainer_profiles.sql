-- Public trainer profiles for shareable /perfil/[userId] pages.
-- Showcase card reads go through a SECURITY DEFINER RPC so RLS on user_cards stays owner-only.

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  display_name text NOT NULL DEFAULT 'Treinador',
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamptz NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS profiles_display_name_idx ON public.profiles (display_name);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Profiles are publicly readable'
  ) THEN
    CREATE POLICY "Profiles are publicly readable"
      ON public.profiles
      FOR SELECT
      TO anon, authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can update own profile'
  ) THEN
    CREATE POLICY "Users can update own profile"
      ON public.profiles
      FOR UPDATE
      TO authenticated
      USING ((SELECT auth.uid()) = id)
      WITH CHECK ((SELECT auth.uid()) = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Users can insert own profile'
  ) THEN
    CREATE POLICY "Users can insert own profile"
      ON public.profiles
      FOR INSERT
      TO authenticated
      WITH CHECK ((SELECT auth.uid()) = id);
  END IF;
END $$;

GRANT SELECT ON public.profiles TO anon, authenticated;
GRANT INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(
      NULLIF(TRIM(NEW.raw_user_meta_data ->> 'full_name'), ''),
      NULLIF(TRIM(NEW.raw_user_meta_data ->> 'name'), ''),
      NULLIF(SPLIT_PART(COALESCE(NEW.email, ''), '@', 1), ''),
      'Treinador'
    ),
    COALESCE(
      NEW.raw_user_meta_data ->> 'avatar_url',
      NEW.raw_user_meta_data ->> 'picture'
    )
  )
  ON CONFLICT (id) DO UPDATE
  SET
    display_name = EXCLUDED.display_name,
    avatar_url = EXCLUDED.avatar_url,
    updated_at = timezone('utc'::text, now());

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.handle_new_user_profile() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS on_auth_user_created_profile ON auth.users;
CREATE TRIGGER on_auth_user_created_profile
  AFTER INSERT OR UPDATE OF raw_user_meta_data, email ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_profile();

INSERT INTO public.profiles (id, display_name, avatar_url)
SELECT
  u.id,
  COALESCE(
    NULLIF(TRIM(u.raw_user_meta_data ->> 'full_name'), ''),
    NULLIF(TRIM(u.raw_user_meta_data ->> 'name'), ''),
    NULLIF(SPLIT_PART(COALESCE(u.email, ''), '@', 1), ''),
    'Treinador'
  ),
  COALESCE(
    u.raw_user_meta_data ->> 'avatar_url',
    u.raw_user_meta_data ->> 'picture'
  )
FROM auth.users u
ON CONFLICT (id) DO UPDATE
SET
  display_name = EXCLUDED.display_name,
  avatar_url = EXCLUDED.avatar_url,
  updated_at = timezone('utc'::text, now());

-- Read-only showcase: returns another trainer's cards for public profile aggregation.
CREATE OR REPLACE FUNCTION public.get_public_user_cards(p_user_id uuid)
RETURNS SETOF public.user_cards
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT *
  FROM public.user_cards
  WHERE user_id = p_user_id
  ORDER BY created_at DESC;
$$;

REVOKE ALL ON FUNCTION public.get_public_user_cards(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_user_cards(uuid) TO anon, authenticated;
