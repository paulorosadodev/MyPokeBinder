-- Physical print finish for a collected TCG card (Normal / Holo / Reverse Holo).
ALTER TABLE public.user_cards
  ADD COLUMN IF NOT EXISTS card_variant TEXT NOT NULL DEFAULT 'normal';

ALTER TABLE public.user_cards
  DROP CONSTRAINT IF EXISTS user_cards_card_variant_check;

ALTER TABLE public.user_cards
  ADD CONSTRAINT user_cards_card_variant_check
  CHECK (card_variant IN ('normal', 'holo', 'reverse'));

COMMENT ON COLUMN public.user_cards.card_variant IS
  'Physical print finish chosen by the collector: normal, holo, or reverse.';
