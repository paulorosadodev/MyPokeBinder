CREATE INDEX IF NOT EXISTS user_cards_user_created_idx 
  ON public.user_cards (user_id, created_at DESC);
