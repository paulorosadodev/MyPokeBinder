import type { SearchCardItem, UserCard } from "@/types/binder";

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

export const catalogCards: SearchCardItem[] = [
    { id: "catalogo-1", name: "Bulbasaur", image: "/pokemon/gen1/1.png", setName: "Base", rarity: "Common", artist: "Teste", dexId: 1 },
    { id: "catalogo-2", name: "Bulbasaur Holo", image: "/pokemon/gen1/1.png", setName: "Base", rarity: "Rare Holo", artist: "Teste", dexId: 1 },
    { id: "catalogo-3", name: "Charmander", image: "/pokemon/gen1/4.png", setName: "Base", rarity: "Common", artist: "Teste", dexId: 4 },
];

export function createAddedCard(payload: Record<string, unknown>): UserCard {
    return {
        id: `carta-adicionada-${payload.tcgdex_card_id}-${payload.card_language}-${payload.card_variant}-${payload.card_condition}`,
        user_id: "colecionador-teste",
        pokemon_dex_id: payload.pokemon_dex_id as number,
        tcgdex_card_id: payload.tcgdex_card_id as string,
        card_name: payload.card_name as string,
        card_image_url: payload.card_image_url as string,
        card_set_name: (payload.card_set_name as string) || "",
        card_rarity: (payload.card_rarity as string) || "",
        card_artist: (payload.card_artist as string) || "",
        card_condition: payload.card_condition as UserCard["card_condition"],
        card_language: payload.card_language as UserCard["card_language"],
        card_variant: payload.card_variant as UserCard["card_variant"],
        is_in_binder: false,
        created_at: "2026-01-01T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z",
    };
}
