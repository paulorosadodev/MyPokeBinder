ALTER TABLE public.user_cards
  ADD COLUMN card_types text[] NOT NULL DEFAULT '{}';

UPDATE public.user_cards
SET card_types = CASE
  WHEN pokemon_dex_id = ANY (ARRAY[1,2,3,10,11,12,13,14,15,43,44,45,46,47,48,49,69,70,71,102,103,114,123,127]) THEN ARRAY['Grass']::text[]
  WHEN pokemon_dex_id = ANY (ARRAY[4,5,6,37,38,58,59,77,78,126,136,146]) THEN ARRAY['Fire']::text[]
  WHEN pokemon_dex_id = ANY (ARRAY[7,8,9,54,55,60,61,62,72,73,79,80,86,87,90,91,98,99,116,117,118,119,120,121,124,129,130,131,134,144]) THEN ARRAY['Water']::text[]
  WHEN pokemon_dex_id = ANY (ARRAY[16,17,18,19,20,21,22,39,40,52,53,83,84,85,108,113,115,128,132,133,137,143]) THEN ARRAY['Colorless']::text[]
  WHEN pokemon_dex_id = ANY (ARRAY[23,24,29,30,31,32,33,34,41,42,63,64,65,88,89,92,93,94,96,97,109,110,122,150,151]) THEN ARRAY['Psychic']::text[]
  WHEN pokemon_dex_id = ANY (ARRAY[25,26,81,82,100,101,125,135,145]) THEN ARRAY['Lightning']::text[]
  WHEN pokemon_dex_id = ANY (ARRAY[27,28,50,51,56,57,66,67,68,74,75,76,95,104,105,106,107,111,112,138,139,140,141,142]) THEN ARRAY['Fighting']::text[]
  WHEN pokemon_dex_id = ANY (ARRAY[35,36]) THEN ARRAY['Fairy']::text[]
  WHEN pokemon_dex_id = ANY (ARRAY[147,148,149]) THEN ARRAY['Dragon']::text[]
  ELSE ARRAY['Colorless']::text[]
END;

ALTER TABLE public.user_cards
  ALTER COLUMN card_types DROP DEFAULT;

ALTER TABLE public.user_cards
  ADD CONSTRAINT user_cards_card_types_check
  CHECK (
    cardinality(card_types) BETWEEN 1 AND 2
    AND card_types <@ ARRAY['Colorless','Darkness','Dragon','Fairy','Fighting','Fire','Grass','Lightning','Metal','Psychic','Water']::text[]
    AND (cardinality(card_types) = 1 OR card_types[1] <> card_types[2])
  );

COMMENT ON COLUMN public.user_cards.card_types IS
  'Tipos elementais oficiais da impressão da carta conforme o catálogo TCGdex.';

CREATE OR REPLACE FUNCTION public.set_user_card_types_fallback()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.card_types IS NULL OR cardinality(NEW.card_types) = 0 THEN
    NEW.card_types := CASE
      WHEN NEW.pokemon_dex_id = ANY (ARRAY[1,2,3,10,11,12,13,14,15,43,44,45,46,47,48,49,69,70,71,102,103,114,123,127]) THEN ARRAY['Grass']::text[]
      WHEN NEW.pokemon_dex_id = ANY (ARRAY[4,5,6,37,38,58,59,77,78,126,136,146]) THEN ARRAY['Fire']::text[]
      WHEN NEW.pokemon_dex_id = ANY (ARRAY[7,8,9,54,55,60,61,62,72,73,79,80,86,87,90,91,98,99,116,117,118,119,120,121,124,129,130,131,134,144]) THEN ARRAY['Water']::text[]
      WHEN NEW.pokemon_dex_id = ANY (ARRAY[16,17,18,19,20,21,22,39,40,52,53,83,84,85,108,113,115,128,132,133,137,143]) THEN ARRAY['Colorless']::text[]
      WHEN NEW.pokemon_dex_id = ANY (ARRAY[23,24,29,30,31,32,33,34,41,42,63,64,65,88,89,92,93,94,96,97,109,110,122,150,151]) THEN ARRAY['Psychic']::text[]
      WHEN NEW.pokemon_dex_id = ANY (ARRAY[25,26,81,82,100,101,125,135,145]) THEN ARRAY['Lightning']::text[]
      WHEN NEW.pokemon_dex_id = ANY (ARRAY[27,28,50,51,56,57,66,67,68,74,75,76,95,104,105,106,107,111,112,138,139,140,141,142]) THEN ARRAY['Fighting']::text[]
      WHEN NEW.pokemon_dex_id = ANY (ARRAY[35,36]) THEN ARRAY['Fairy']::text[]
      WHEN NEW.pokemon_dex_id = ANY (ARRAY[147,148,149]) THEN ARRAY['Dragon']::text[]
      ELSE ARRAY['Colorless']::text[]
    END;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_user_card_types_fallback ON public.user_cards;

CREATE TRIGGER set_user_card_types_fallback
  BEFORE INSERT OR UPDATE OF pokemon_dex_id, card_types ON public.user_cards
  FOR EACH ROW
  EXECUTE FUNCTION public.set_user_card_types_fallback();

DROP FUNCTION IF EXISTS public.get_user_collection_groups(uuid, text, text, text, text, text, text, text, text, int, int);

CREATE FUNCTION public.get_user_collection_groups(
  p_user_id uuid DEFAULT NULL,
  p_search text DEFAULT NULL,
  p_status text DEFAULT 'all',
  p_language text DEFAULT 'all',
  p_rarity text DEFAULT 'all',
  p_expansion text DEFAULT 'all',
  p_variant text DEFAULT 'all',
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
      IF v_dex_query < 1 OR v_dex_query > 151 THEN
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
        p_rarity = 'all' OR p_rarity IS NULL OR lower(uc.card_rarity) LIKE '%' || lower(p_rarity) || '%'
      )
      AND (
        v_clean_search = '' OR
        (v_dex_query IS NOT NULL AND uc.pokemon_dex_id = v_dex_query) OR
        (v_dex_query IS NULL AND (
          uc.card_name ILIKE '%' || v_clean_search || '%' OR
          uc.card_set_name ILIKE '%' || v_clean_search || '%' OR
          uc.tcgdex_card_id ILIKE '%' || v_clean_search || '%' OR
          (v_card_num_target <> '' AND (
            uc.tcgdex_card_id ILIKE '%-' || v_card_num_target OR
            uc.tcgdex_card_id ILIKE '%-' || ltrim(v_card_num_target, '0') OR
            uc.tcgdex_card_id ILIKE '%-0' || v_card_num_target
          ))
        ))
      )
    GROUP BY uc.user_id, uc.tcgdex_card_id, uc.card_language, uc.card_variant
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
    g.has_in_binder AS is_in_binder,
    g.created_at,
    g.updated_at,
    g.group_total_count,
    g.has_in_binder,
    g.copy_ids,
    count(*) OVER() AS total_filtered_count
  FROM grouped g
  ORDER BY
    CASE WHEN p_sort_field = 'name' AND p_sort_direction = 'asc' THEN g.card_name END ASC,
    CASE WHEN p_sort_field = 'name' AND p_sort_direction = 'desc' THEN g.card_name END DESC,
    CASE WHEN (p_sort_field = 'dex' OR p_sort_field IS NULL) AND p_sort_direction = 'desc' THEN g.pokemon_dex_id END DESC,
    CASE WHEN (p_sort_field = 'dex' OR p_sort_field IS NULL) AND (p_sort_direction = 'asc' OR p_sort_direction IS NULL) THEN g.pokemon_dex_id END ASC,
    CASE WHEN p_sort_field = 'recent' AND p_sort_direction = 'asc' THEN g.created_at END ASC,
    CASE WHEN p_sort_field = 'recent' AND (p_sort_direction = 'desc' OR p_sort_direction IS NULL) THEN g.created_at END DESC,
    g.created_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_user_collection_groups TO anon, authenticated, service_role;
