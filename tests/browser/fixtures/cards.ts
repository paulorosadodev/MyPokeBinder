import type { UserCard } from "@/types/binder";

export const cards: UserCard[] = Array.from({ length: 151 }, (_, index) => ({
    id: `carta-${index + 1}`,
    user_id: "colecionador-teste",
    pokemon_dex_id: index + 1,
    tcgdex_card_id: `teste-${index + 1}`,
    card_name: `Carta ${index + 1}`,
    card_image_url: `/pokemon/gen1/${index + 1}.png`,
    card_set_name: "Teste",
    card_rarity: "Common",
    card_language: "pt-br",
    card_variant: "normal",
    is_in_binder: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
}));
