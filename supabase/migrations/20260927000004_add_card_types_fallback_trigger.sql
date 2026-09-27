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
