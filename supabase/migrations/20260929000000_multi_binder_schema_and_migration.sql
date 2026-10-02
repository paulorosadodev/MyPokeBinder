CREATE TABLE IF NOT EXISTS public.binders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL CHECK (length(trim(name)) >= 1 AND length(name) <= 60),
    description TEXT NOT NULL DEFAULT '' CHECK (length(description) <= 200),
    grid_type TEXT NOT NULL CHECK (grid_type IN ('1x1', '2x2', '3x3', '3x4')),
    total_pages INT NOT NULL CHECK (total_pages >= 1 AND total_pages <= 50),
    cover_theme TEXT NOT NULL DEFAULT 'classic_red',
    is_public BOOLEAN NOT NULL DEFAULT false,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS binders_user_id_idx ON public.binders (user_id);
CREATE INDEX IF NOT EXISTS binders_user_featured_idx ON public.binders (user_id, is_featured);

ALTER TABLE public.binders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage their own binders" ON public.binders;
CREATE POLICY "Users can manage their own binders"
    ON public.binders
    FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Anyone can view public binders" ON public.binders;
CREATE POLICY "Anyone can view public binders"
    ON public.binders
    FOR SELECT
    TO anon, authenticated
    USING (is_public = true);

GRANT ALL ON TABLE public.binders TO authenticated;
GRANT SELECT ON TABLE public.binders TO anon;
GRANT ALL ON TABLE public.binders TO service_role;

CREATE TABLE IF NOT EXISTS public.binder_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    binder_id UUID NOT NULL REFERENCES public.binders(id) ON DELETE CASCADE,
    page_number INT NOT NULL CHECK (page_number >= 1),
    slot_index INT NOT NULL CHECK (slot_index >= 1),
    slot_type TEXT NOT NULL CHECK (slot_type IN ('free', 'pokemon', 'card')),
    target_dex_id INT NULL CHECK (target_dex_id IS NULL OR (target_dex_id >= 1 AND target_dex_id <= 1025)),
    target_tcgdex_id TEXT NULL,
    target_card_name TEXT NULL,
    target_card_image_url TEXT NULL,
    user_card_id UUID UNIQUE REFERENCES public.user_cards(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT binder_slots_position_unique UNIQUE (binder_id, page_number, slot_index)
);

CREATE INDEX IF NOT EXISTS binder_slots_binder_id_idx ON public.binder_slots (binder_id);
CREATE INDEX IF NOT EXISTS binder_slots_user_card_id_idx ON public.binder_slots (user_card_id);

ALTER TABLE public.binder_slots ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage slots of their binders" ON public.binder_slots;
CREATE POLICY "Users can manage slots of their binders"
    ON public.binder_slots
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.binders b
            WHERE b.id = binder_slots.binder_id AND b.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.binders b
            WHERE b.id = binder_slots.binder_id AND b.user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Anyone can view slots of public binders" ON public.binder_slots;
CREATE POLICY "Anyone can view slots of public binders"
    ON public.binder_slots
    FOR SELECT
    TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.binders b
            WHERE b.id = binder_slots.binder_id AND b.is_public = true
        )
    );

GRANT ALL ON TABLE public.binder_slots TO authenticated;
GRANT SELECT ON TABLE public.binder_slots TO anon;
GRANT ALL ON TABLE public.binder_slots TO service_role;

GRANT SELECT ON TABLE public.user_cards TO anon;

DROP POLICY IF EXISTS "Anyone can view cards in public binders" ON public.user_cards;
CREATE POLICY "Anyone can view cards in public binders"
    ON public.user_cards
    FOR SELECT
    TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.binder_slots bs
            JOIN public.binders b ON b.id = bs.binder_id
            WHERE bs.user_card_id = user_cards.id
              AND b.is_public = true
        )
    );

DROP TRIGGER IF EXISTS set_binders_updated_at ON public.binders;
CREATE TRIGGER set_binders_updated_at
    BEFORE UPDATE ON public.binders
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_binder_slots_updated_at ON public.binder_slots;
CREATE TRIGGER set_binder_slots_updated_at
    BEFORE UPDATE ON public.binder_slots
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.user_cards DROP CONSTRAINT IF EXISTS user_cards_pokemon_dex_id_check;
ALTER TABLE public.user_cards ALTER COLUMN pokemon_dex_id DROP NOT NULL;
ALTER TABLE public.user_cards ADD CONSTRAINT user_cards_pokemon_dex_id_check CHECK (pokemon_dex_id IS NULL OR (pokemon_dex_id >= 1 AND pokemon_dex_id <= 1025));

DROP INDEX IF EXISTS public.user_cards_user_pokemon_binder_idx;

CREATE OR REPLACE FUNCTION public.sync_user_card_binder_status()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        IF NEW.user_card_id IS NOT NULL THEN
            UPDATE public.user_cards
            SET is_in_binder = true, updated_at = timezone('utc'::text, now())
            WHERE id = NEW.user_card_id;
        END IF;
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.user_card_id IS DISTINCT FROM NEW.user_card_id THEN
            IF OLD.user_card_id IS NOT NULL THEN
                UPDATE public.user_cards
                SET is_in_binder = EXISTS (
                    SELECT 1 FROM public.binder_slots WHERE user_card_id = OLD.user_card_id AND id <> OLD.id
                ), updated_at = timezone('utc'::text, now())
                WHERE id = OLD.user_card_id;
            END IF;
            IF NEW.user_card_id IS NOT NULL THEN
                UPDATE public.user_cards
                SET is_in_binder = true, updated_at = timezone('utc'::text, now())
                WHERE id = NEW.user_card_id;
            END IF;
        END IF;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        IF OLD.user_card_id IS NOT NULL THEN
            UPDATE public.user_cards
            SET is_in_binder = EXISTS (
                SELECT 1 FROM public.binder_slots WHERE user_card_id = OLD.user_card_id AND id <> OLD.id
            ), updated_at = timezone('utc'::text, now())
            WHERE id = OLD.user_card_id;
        END IF;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trigger_sync_user_card_binder_status ON public.binder_slots;
CREATE TRIGGER trigger_sync_user_card_binder_status
    AFTER INSERT OR UPDATE OF user_card_id OR DELETE ON public.binder_slots
    FOR EACH ROW
    EXECUTE FUNCTION public.sync_user_card_binder_status();

CREATE OR REPLACE FUNCTION public.get_user_collection_groups(
  p_user_id uuid DEFAULT NULL,
  p_search text DEFAULT NULL,
  p_status text DEFAULT 'all',
  p_language text DEFAULT 'all',
  p_rarity text DEFAULT 'all',
  p_expansion text DEFAULT 'all',
  p_variant text DEFAULT 'all',
  p_artist text DEFAULT 'all',
  p_sort_field text DEFAULT 'dex',
  p_sort_direction text DEFAULT 'asc',
  p_limit int DEFAULT 36,
  p_offset int DEFAULT 0
)
RETURNS TABLE (
  representative_id uuid,
  user_id uuid,
  pokemon_dex_id int,
  tcgdex_card_id text,
  card_name text,
  card_image_url text,
  card_set_name text,
  card_rarity text,
  card_types text[],
  card_language text,
  card_variant text,
  card_artist text,
  card_condition text,
  is_in_binder boolean,
  created_at timestamptz,
  updated_at timestamptz,
  group_total_count int,
  has_in_binder boolean,
  copy_ids uuid[],
  total_filtered_count bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
DECLARE
  v_user_id uuid;
  v_clean_search text;
  v_dex_query int;
  v_card_num_target text;
BEGIN
  v_user_id := COALESCE(p_user_id, auth.uid());

  IF v_user_id IS NULL THEN
    RETURN;
  END IF;

  v_clean_search := trim(coalesce(p_search, ''));

  IF v_clean_search ~ '^#\s*\d+' THEN
    BEGIN
      v_dex_query := regexp_replace(v_clean_search, '^#\s*', '')::int;
      IF v_dex_query < 1 OR v_dex_query > 1025 THEN
        v_dex_query := NULL;
      END IF;
    EXCEPTION WHEN OTHERS THEN
      v_dex_query := NULL;
    END;
  ELSE
    v_dex_query := NULL;
  END IF;

  IF v_clean_search LIKE '%/%' THEN
    v_card_num_target := trim(split_part(v_clean_search, '/', 1));
  ELSE
    v_card_num_target := v_clean_search;
  END IF;

  RETURN QUERY
  WITH grouped AS (
    SELECT
      (array_agg(uc.id ORDER BY uc.is_in_binder DESC, uc.created_at DESC))[1] AS representative_id,
      uc.user_id,
      max(uc.pokemon_dex_id) AS pokemon_dex_id,
      uc.tcgdex_card_id,
      max(uc.card_name) AS card_name,
      max(uc.card_image_url) AS card_image_url,
      max(uc.card_set_name) AS card_set_name,
      max(uc.card_rarity) AS card_rarity,
      min(uc.card_types::text)::text[] AS card_types,
      uc.card_language,
      uc.card_variant,
      max(uc.card_artist) AS card_artist,
      uc.card_condition,
      bool_or(uc.is_in_binder) AS has_in_binder,
      max(uc.created_at) AS created_at,
      max(uc.updated_at) AS updated_at,
      count(*)::int AS group_total_count,
      array_agg(uc.id ORDER BY uc.is_in_binder DESC, uc.created_at DESC) AS copy_ids
    FROM public.user_cards uc
    WHERE uc.user_id = v_user_id
      AND (
        p_language = 'all' OR p_language IS NULL OR uc.card_language = p_language
      )
      AND (
        p_variant = 'all' OR p_variant IS NULL OR uc.card_variant = p_variant
      )
      AND (
        p_expansion = 'all' OR p_expansion IS NULL OR uc.card_set_name = p_expansion
      )
      AND (
        p_artist = 'all' OR p_artist IS NULL OR uc.card_artist = p_artist
      )
      AND (
        p_rarity = 'all' OR p_rarity IS NULL OR lower(uc.card_rarity) LIKE '%' || lower(p_rarity) || '%'
      )
      AND (
        v_clean_search = '' OR
        (v_dex_query IS NOT NULL AND uc.pokemon_dex_id = v_dex_query) OR
        (v_dex_query IS NULL AND (
          uc.card_name ILIKE '%' || v_clean_search || '%' OR
          uc.card_set_name ILIKE '%' || v_clean_search || '%' OR
          uc.card_artist ILIKE '%' || v_clean_search || '%' OR
          uc.tcgdex_card_id ILIKE '%' || v_clean_search || '%' OR
          (v_card_num_target <> '' AND (
            uc.tcgdex_card_id ILIKE '%-' || v_card_num_target OR
            uc.tcgdex_card_id ILIKE '%-' || ltrim(v_card_num_target, '0') OR
            uc.tcgdex_card_id ILIKE '%-0' || v_card_num_target
          ))
        ))
      )
    GROUP BY uc.user_id, uc.tcgdex_card_id, uc.card_language, uc.card_variant, uc.card_condition
    HAVING (
      p_status = 'all' OR p_status IS NULL OR
      (p_status = 'in_binder' AND bool_or(uc.is_in_binder)) OR
      (p_status = 'stored' AND (NOT bool_or(uc.is_in_binder) OR count(*) > 1))
    )
  )
  SELECT
    g.representative_id,
    g.user_id,
    g.pokemon_dex_id,
    g.tcgdex_card_id,
    g.card_name,
    g.card_image_url,
    g.card_set_name,
    g.card_rarity,
    g.card_types,
    g.card_language,
    g.card_variant,
    g.card_artist,
    g.card_condition,
    g.has_in_binder AS is_in_binder,
    g.created_at,
    g.updated_at,
    g.group_total_count,
    g.has_in_binder,
    g.copy_ids,
    count(*) OVER() AS total_filtered_count
  FROM grouped g
  ORDER BY
    CASE WHEN p_sort_field = 'dex' AND p_sort_direction = 'asc' THEN g.pokemon_dex_id END ASC NULLS LAST,
    CASE WHEN p_sort_field = 'dex' AND p_sort_direction = 'desc' THEN g.pokemon_dex_id END DESC NULLS LAST,
    CASE WHEN p_sort_field = 'name' AND p_sort_direction = 'asc' THEN g.card_name END ASC,
    CASE WHEN p_sort_field = 'name' AND p_sort_direction = 'desc' THEN g.card_name END DESC,
    CASE WHEN p_sort_field = 'created_at' AND p_sort_direction = 'asc' THEN g.created_at END ASC,
    CASE WHEN p_sort_field = 'created_at' AND p_sort_direction = 'desc' THEN g.created_at END DESC,
    g.representative_id ASC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$;

DO $$
DECLARE
    r_user RECORD;
    v_binder_id UUID;
    v_dex INT;
    v_page INT;
    v_slot INT;
    v_card_id UUID;
BEGIN
    FOR r_user IN
        SELECT DISTINCT user_id FROM public.user_cards
        UNION
        SELECT id AS user_id FROM public.profiles
    LOOP
        IF NOT EXISTS (SELECT 1 FROM public.binders WHERE user_id = r_user.user_id) THEN
            INSERT INTO public.binders (user_id, name, description, grid_type, total_pages, cover_theme, is_public, is_featured)
            VALUES (r_user.user_id, 'Kanto 151 Original', 'Binder clássico dos 151 Pokémon originais de Kanto.', '3x3', 17, 'classic_red', false, true)
            RETURNING id INTO v_binder_id;

            FOR v_dex IN 1..151 LOOP
                v_page := ((v_dex - 1) / 9) + 1;
                v_slot := ((v_dex - 1) % 9) + 1;

                SELECT id INTO v_card_id
                FROM public.user_cards
                WHERE user_id = r_user.user_id
                  AND pokemon_dex_id = v_dex
                  AND is_in_binder = true
                ORDER BY created_at ASC
                LIMIT 1;

                INSERT INTO public.binder_slots (binder_id, page_number, slot_index, slot_type, target_dex_id, user_card_id)
                VALUES (v_binder_id, v_page, v_slot, 'pokemon', v_dex, v_card_id);
            END LOOP;
        END IF;
    END LOOP;
END;
$$;
