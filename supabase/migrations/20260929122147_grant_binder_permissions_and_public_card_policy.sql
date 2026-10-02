GRANT ALL ON TABLE public.binders TO authenticated;
GRANT SELECT ON TABLE public.binders TO anon;
GRANT ALL ON TABLE public.binders TO service_role;

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
