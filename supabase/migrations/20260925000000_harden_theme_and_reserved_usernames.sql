-- Hardening theme colors and reserved usernames at the database layer

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_reserved_username_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_reserved_username_check
  CHECK (lower(username) NOT IN ('api', 'auth', 'login', 'logout', 'perfil', 'profile', 'configuracoes', 'settings', 'collection', 'colecao', 'dashboard', 'cards', 'inicio', 'home', 'admin', 'me', 'termos', 'terms', 'privacy', 'privacidade', 'mypokebinder'));

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_theme_color_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_theme_color_check
  CHECK (theme_color IN ('#10b981', '#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'));

ALTER TABLE public.user_settings
  DROP CONSTRAINT IF EXISTS user_settings_theme_color_check;

ALTER TABLE public.user_settings
  ADD CONSTRAINT user_settings_theme_color_check
  CHECK (theme_color IN ('#10b981', '#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'));

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
  IF v_base IN ('api', 'auth', 'login', 'logout', 'perfil', 'profile', 'configuracoes', 'settings', 'collection', 'colecao', 'dashboard', 'cards', 'inicio', 'home', 'admin', 'me', 'termos', 'terms', 'privacy', 'privacidade', 'mypokebinder') THEN
    v_base := left('t_' || v_base, 20);
  END IF;

  LOOP
    v_username := CASE WHEN v_n = 0 THEN v_base ELSE left(v_base, 20 - length(v_n::text)) || v_n::text END;
    EXIT WHEN NOT EXISTS (
      SELECT 1 FROM public.profiles WHERE lower(username) = v_username AND id <> NEW.id
    ) AND v_username NOT IN ('api', 'auth', 'login', 'logout', 'perfil', 'profile', 'configuracoes', 'settings', 'collection', 'colecao', 'dashboard', 'cards', 'inicio', 'home', 'admin', 'me', 'termos', 'terms', 'privacy', 'privacidade', 'mypokebinder');
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
