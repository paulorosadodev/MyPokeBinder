REVOKE EXECUTE ON FUNCTION public.sync_user_card_binder_status() FROM PUBLIC, anon, authenticated;

ALTER FUNCTION public.get_public_user_cards(uuid) SECURITY INVOKER;
ALTER FUNCTION public.get_user_collection_groups(uuid, text, text, text, text, text, text, text, text, text, int, int) SECURITY INVOKER;
ALTER FUNCTION public.get_user_collection_artists(uuid) SECURITY INVOKER;
ALTER FUNCTION public.get_user_collection_expansions(uuid) SECURITY INVOKER;

REVOKE EXECUTE ON FUNCTION public.get_public_user_cards(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_public_user_cards(uuid) TO service_role;

DROP POLICY IF EXISTS "Anyone can view featured cards of profiles" ON public.user_cards;
CREATE POLICY "Anyone can view featured cards of profiles"
    ON public.user_cards
    FOR SELECT
    TO anon, authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles p
            WHERE user_cards.id = ANY(p.favorite_card_ids)
        )
    );
