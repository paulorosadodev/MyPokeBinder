import { describe, it, expect } from "bun:test";
import { NextRequest } from "next/server";
import { buildProfileFromCards } from "../src/lib/profile/buildProfile";
import { matchesCardSearch } from "../src/lib/collection/listCards";
import { GET as getCardDetails } from "../src/app/api/cards/[id]/route";
import type { Binder, BinderSlot, UserCard } from "../src/types/binder";

describe("Card Allocation & Hybrid Public Profile", () => {
    it("should accept null pokemon_dex_id in matchesCardSearch for Trainers and Energies", () => {
        const trainerCard = {
            card_name: "Professor's Research",
            card_set_name: "Scarlet & Violet",
            pokemon_dex_id: null,
            tcgdex_card_id: "sv1-189",
            card_artist: "Ken Sugimori",
        };

        expect(matchesCardSearch(trainerCard, "professor")).toBe(true);
        expect(matchesCardSearch(trainerCard, "research")).toBe(true);
        expect(matchesCardSearch(trainerCard, "pikachu")).toBe(false);
        expect(matchesCardSearch(trainerCard, "025")).toBe(false);
    });

    it("should build hybrid profile payload containing featured binder and remaining binders", () => {
        const sampleBinders: Binder[] = [
            {
                id: "b1111111-1111-4111-8111-111111111111",
                user_id: "u1",
                name: "Kanto 151 Principal",
                description: "Minha coleção clássica",
                grid_type: "3x3",
                total_pages: 17,
                cover_theme: "classic_red",
                is_public: true,
                is_featured: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                total_slots: 153,
                total_cards: 150,
                completion_percentage: 98,
            },
            {
                id: "b2222222-2222-4222-8222-222222222222",
                user_id: "u1",
                name: "Cartas Raras e Trainers",
                description: "Ultra raras e ilustrações especiais",
                grid_type: "2x2",
                total_pages: 5,
                cover_theme: "ocean_blue",
                is_public: true,
                is_featured: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                total_slots: 20,
                total_cards: 15,
                completion_percentage: 75,
            },
        ];

        const sampleSlots: BinderSlot[] = [
            {
                id: "s1",
                binder_id: sampleBinders[0].id,
                page_number: 1,
                slot_index: 1,
                slot_type: "pokemon",
                target_dex_id: 1,
                user_card_id: "c1",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
        ];

        const payload = buildProfileFromCards({
            user: { id: "u1", username: "red", name: "Red" },
            cards: [],
            isOwner: false,
            binders: sampleBinders,
            featuredBinder: sampleBinders[0],
            featuredBinderSlots: sampleSlots,
        });

        expect(payload.binders).toBeDefined();
        expect(payload.binders?.length).toBe(2);
        expect(payload.featuredBinder?.id).toBe(sampleBinders[0].id);
        expect(payload.featuredBinder?.is_featured).toBe(true);
        expect(payload.featuredBinderSlots?.length).toBe(1);
        expect(payload.featuredBinderSlots?.[0].target_dex_id).toBe(1);
    });

    it("should safely handle null pokemon_dex_id cards in buildProfileFromCards", () => {
        const cardsWithTrainer: UserCard[] = [
            {
                id: "c-trainer",
                user_id: "u1",
                pokemon_dex_id: null,
                tcgdex_card_id: "sv1-189",
                card_name: "Professor's Research",
                card_image_url: "https://assets.tcgdex.net/en/sv/sv1/189/high.webp",
                card_set_name: "Scarlet & Violet",
                card_rarity: "Ultra Rare",
                card_language: "pt-br",
                card_variant: "holo",
                is_in_binder: false,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
        ];

        const payload = buildProfileFromCards({
            user: { id: "u1", username: "blue", name: "Blue" },
            cards: cardsWithTrainer,
            isOwner: true,
        });

        expect(payload.stats.totalCollection).toBe(1);
        expect(payload.stats.totalInBinder).toBe(0);
        expect(payload.slots.length).toBe(151);
    });

    it("should return 400 for GET /api/cards/[id] with invalid UUID", async () => {
        const req = new NextRequest("http://localhost:3000/api/cards/not-valid", {
            method: "GET",
        });
        const res = await getCardDetails(req, {
            params: Promise.resolve({ id: "not-valid" }),
        });
        expect(res.status).toBe(400);

        const data = await res.json();
        expect(data.error).toContain("inválido");
    });
});
