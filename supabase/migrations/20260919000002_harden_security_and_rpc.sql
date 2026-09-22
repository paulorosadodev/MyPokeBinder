REVOKE EXECUTE ON FUNCTION public.handle_updated_at() FROM PUBLIC, anon, authenticated;

DROP FUNCTION IF EXISTS public.set_card_in_binder(UUID, UUID, INT);

CREATE OR REPLACE FUNCTION public.set_card_in_binder(p_card_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
  v_user_id UUID;
  v_dex_id INT;
BEGIN
  v_user_id := (SELECT auth.uid());
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT pokemon_dex_id INTO v_dex_id
  FROM public.user_cards
  WHERE id = p_card_id AND user_id = v_user_id;

  IF v_dex_id IS NULL THEN
    RAISE EXCEPTION 'Card not found or access denied';
  END IF;

  UPDATE public.user_cards
  SET is_in_binder = false,
      updated_at = timezone('utc'::text, now())
  WHERE user_id = v_user_id
    AND pokemon_dex_id = v_dex_id
    AND is_in_binder = true
    AND id != p_card_id;

  UPDATE public.user_cards
  SET is_in_binder = true,
      updated_at = timezone('utc'::text, now())
  WHERE id = p_card_id
    AND user_id = v_user_id;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.set_card_in_binder(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.set_card_in_binder(UUID) TO authenticated;
