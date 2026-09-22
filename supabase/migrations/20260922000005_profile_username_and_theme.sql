-- Username + public theme color on trainer profiles

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS username text,
  ADD COLUMN IF NOT EXISTS theme_color text NOT NULL DEFAULT '#ef4444';

-- Backfill usernames from email local-part (sanitized), resolving collisions.
DO $$
DECLARE
  r RECORD;
  base text;
  candidate text;
  n int;
BEGIN
  FOR r IN
    SELECT p.id, u.email
    FROM public.profiles p
    JOIN auth.users u ON u.id = p.id
    WHERE p.username IS NULL OR btrim(p.username) = ''
  LOOP
    base := lower(regexp_replace(split_part(COALESCE(r.email, 'treinador'), '@', 1), '[^a-z0-9_]', '', 'g'));
    IF base IS NULL OR length(base) < 3 THEN
      base := 'treinador';
    END IF;
    IF length(base) > 20 THEN
      base := left(base, 20);
    END IF;
    IF base !~ '^[a-z]' THEN
      base := 't' || left(base, 19);
    END IF;

    n := 0;
    LOOP
      candidate := CASE WHEN n = 0 THEN base ELSE left(base, 20 - length(n::text)) || n::text END;
      EXIT WHEN NOT EXISTS (
        SELECT 1 FROM public.profiles WHERE lower(username) = candidate AND id <> r.id
      );
      n := n + 1;
    END LOOP;

    UPDATE public.profiles SET username = candidate WHERE id = r.id;
  END LOOP;
END $$;

-- Backfill theme from user_settings when available
UPDATE public.profiles p
SET theme_color = s.theme_color
FROM public.user_settings s
WHERE s.user_id = p.id
  AND s.theme_color IS NOT NULL
  AND s.theme_color ~ '^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$';

ALTER TABLE public.profiles
  ALTER COLUMN username SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS profiles_username_lower_uidx
  ON public.profiles (lower(username));

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_username_format_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_username_format_check
  CHECK (username ~ '^[a-z][a-z0-9_]{2,19}$');

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_theme_color_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_theme_color_check
  CHECK (theme_color ~ '^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$');

CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_base text;
  v_username text;
  v_n int := 0;
BEGIN
  v_base := lower(regexp_replace(split_part(COALESCE(NEW.email, 'treinador'), '@', 1), '[^a-z0-9_]', '', 'g'));
  IF v_base IS NULL OR length(v_base) < 3 THEN
    v_base := 'treinador';
  END IF;
  IF length(v_base) > 20 THEN
    v_base := left(v_base, 20);
  END IF;
  IF v_base !~ '^[a-z]' THEN
    v_base := 't' || left(v_base, 19);
  END IF;

  LOOP
    v_username := CASE WHEN v_n = 0 THEN v_base ELSE left(v_base, 20 - length(v_n::text)) || v_n::text END;
    EXIT WHEN NOT EXISTS (
      SELECT 1 FROM public.profiles WHERE lower(username) = v_username AND id <> NEW.id
    );
    v_n := v_n + 1;
  END LOOP;

  INSERT INTO public.profiles (id, display_name, avatar_url, username, theme_color)
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
    ),
    v_username,
    '#ef4444'
  )
  ON CONFLICT (id) DO UPDATE
  SET
    display_name = EXCLUDED.display_name,
    avatar_url = EXCLUDED.avatar_url,
    username = COALESCE(public.profiles.username, EXCLUDED.username),
    updated_at = timezone('utc'::text, now());

  RETURN NEW;
END;
$$;
