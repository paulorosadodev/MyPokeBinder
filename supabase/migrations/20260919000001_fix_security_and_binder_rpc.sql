REVOKE ALL ON public.user_cards FROM authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_cards TO authenticated;
REVOKE ALL ON public.user_cards FROM anon;
DROP INDEX IF EXISTS public.user_cards_user_id_idx;

CREATE OR REPLACE FUNCTION public.set_card_in_binder(
  p_card_id UUID,
  p_user_id UUID,
  p_pokemon_dex_id INT
)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
  UPDATE public.user_cards
  SET is_in_binder = false,
      updated_at = timezone('utc'::text, now())
  WHERE user_id = p_user_id
    AND pokemon_dex_id = p_pokemon_dex_id
    AND is_in_binder = true
    AND id != p_card_id;

  UPDATE public.user_cards
  SET is_in_binder = true,
      updated_at = timezone('utc'::text, now())
  WHERE id = p_card_id
    AND user_id = p_user_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.set_card_in_binder(UUID, UUID, INT) TO authenticated;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_user_cards_updated_at ON public.user_cards;
CREATE TRIGGER set_user_cards_updated_at
  BEFORE UPDATE ON public.user_cards
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
