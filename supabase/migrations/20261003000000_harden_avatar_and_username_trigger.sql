-- Harden avatar_url at the database layer and serialize username provisioning.

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_avatar_url_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_avatar_url_check
  CHECK (
    avatar_url IS NULL OR (
      avatar_url ~ '^https://'
      AND char_length(avatar_url) <= 500
      AND (
        lower(split_part(split_part(avatar_url, '://', 2), '/', 1)) IN ('googleusercontent.com', 'gravatar.com', 'githubusercontent.com')
        OR lower(split_part(split_part(avatar_url, '://', 2), '/', 1)) ~ '\.(googleusercontent|gravatar|githubusercontent)\.com$'
      )
    )
  );

CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_base text;
  v_username text;
  v_avatar text;
  v_host text;
  v_n int := 0;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('public.profiles.username'));

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

  v_avatar := NULLIF(trim(COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', NEW.raw_user_meta_data ->> 'picture', '')), '');
  IF v_avatar IS NOT NULL THEN
    v_host := lower(split_part(split_part(v_avatar, '://', 2), '/', 1));
    IF v_avatar !~ '^https://'
       OR char_length(v_avatar) > 500
       OR (v_host <> 'googleusercontent.com' AND v_host !~ '\.googleusercontent\.com$'
           AND v_host <> 'gravatar.com' AND v_host !~ '\.gravatar\.com$'
           AND v_host <> 'githubusercontent.com' AND v_host !~ '\.githubusercontent\.com$') THEN
      v_avatar := NULL;
    END IF;
  END IF;

  INSERT INTO public.profiles (id, display_name, avatar_url, username, theme_color)
  VALUES (
    NEW.id,
    COALESCE(
      NULLIF(TRIM(NEW.raw_user_meta_data ->> 'full_name'), ''),
      NULLIF(TRIM(NEW.raw_user_meta_data ->> 'name'), ''),
      NULLIF(SPLIT_PART(COALESCE(NEW.email, ''), '@', 1), ''),
      'Treinador'
    ),
    v_avatar,
    v_username,
    '#ef4444'
  )
  ON CONFLICT (id) DO UPDATE
  SET
    display_name = EXCLUDED.display_name,
    avatar_url = COALESCE(EXCLUDED.avatar_url, public.profiles.avatar_url),
    updated_at = timezone('utc'::text, now());

  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.handle_new_user_profile() FROM PUBLIC, anon, authenticated;
