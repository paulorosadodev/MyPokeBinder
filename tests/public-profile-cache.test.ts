import { describe, it, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { buildProfileFromCards } from "../src/lib/profile/buildProfile";
import { buildCachedPublicProfile, hydratePublicProfile, publicProfileCacheKey, publicProfileCacheTag, toPublicCachedCollection, toPublicCachedProfile } from "../src/lib/profile/publicCache";
import type { UserCard } from "../src/types/binder";

const sampleCard = {
    id: "11111111-1111-4111-8111-111111111111",
    user_id: "owner-id",
    pokemon_dex_id: 1,
    tcgdex_card_id: "base1-1",
    card_name: "Bulbasaur",
    card_image_url: "https://assets.tcgdex.net/en/base1/1/high.webp",
    card_set_name: "Base",
    card_rarity: "Rare",
    card_language: "en",
    card_variant: "normal",
    is_in_binder: true,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
} as UserCard;

describe("Public profile cache payload", () => {
    it("strips isOwner and email from the cached payload and keys by username", () => {
        const payload = buildProfileFromCards({
            user: {
                id: "owner-id",
                username: "AshKetchum",
                name: "Ash",
                email: "ash@example.com",
            },
            cards: [sampleCard],
            isOwner: true,
            themeColor: "#ef4444",
            favoriteCardIds: [sampleCard.id],
        });

        const cached = toPublicCachedProfile(payload);
        expect(cached).not.toHaveProperty("isOwner");
        expect(cached.user.email).toBeUndefined();
        expect(publicProfileCacheKey("AshKetchum")).toBe("ashketchum");
        expect(publicProfileCacheKey("ashketchum")).not.toBe(publicProfileCacheKey("misty"));
        expect(publicProfileCacheTag("AshKetchum")).toBe("public-profile:ashketchum");
        expect(publicProfileCacheTag("misty")).not.toBe(publicProfileCacheTag("ashketchum"));
    });

    it("hydrates isOwner and owner email outside the cache", () => {
        const cached = buildCachedPublicProfile({
            owner: {
                id: "owner-id",
                username: "ash",
                name: "Ash",
                avatarUrl: null,
                themeColor: "#ef4444",
                favoriteCardIds: [],
            },
            cards: [sampleCard],
        });

        const visitor = hydratePublicProfile(cached, { id: "someone-else", email: "visitor@example.com" });
        expect(visitor.isOwner).toBe(false);
        expect(visitor.user.email).toBeUndefined();

        const owner = hydratePublicProfile(cached, { id: "owner-id", email: "ash@example.com" });
        expect(owner.isOwner).toBe(true);
        expect(owner.user.email).toBe("ash@example.com");
        expect(cached).not.toHaveProperty("isOwner");
    });

    it("keeps public collection cache free of isOwner", () => {
        const collection = toPublicCachedCollection({
            owner: {
                id: "owner-id",
                username: "ash",
                name: "Ash",
                avatarUrl: null,
                themeColor: "#ef4444",
                favoriteCardIds: [],
            },
            cards: [sampleCard],
        });
        expect(collection).not.toHaveProperty("isOwner");
    });
});

describe("Public pages reveal on JSON, not image preload", () => {
    it("does not gate profile or public collection on image preloads", () => {
        const profileSource = readFileSync(join(import.meta.dir, "../src/components/profile/TrainerProfileView.tsx"), "utf8");
        const collectionSource = readFileSync(join(import.meta.dir, "../src/components/profile/PublicCollectionView.tsx"), "utf8");

        expect(profileSource).not.toContain("useImagePreloader");
        expect(profileSource).not.toContain("imagesReady");
        expect(profileSource).toContain("fallbackData");
        expect(collectionSource).not.toContain("useImagePreloader");
        expect(collectionSource).not.toContain("contentReady");
        expect(collectionSource).toContain("fallbackData");
    });
});
