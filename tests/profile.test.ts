import { describe, it, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { GET as getProfile } from "../src/app/api/profile/route";
import { GET as getSharedProfile } from "../src/app/api/profile/[username]/route";
import { GET as getSharedCollection } from "../src/app/api/profile/[username]/collection/route";
import { getRarityScore, getRarityImpactTier, getRarityBadgeStyle } from "../src/lib/pokemon/rarity";
import { buildProfileFromCards } from "../src/lib/profile/buildProfile";
import { usernameFromEmail, validateUsername, validateDisplayName, buildThemeCssVars, safeDecodeParam, isValidProfileParam } from "../src/lib/profile/username";
import type { UserCard } from "../src/types/binder";

const projectRoot = join(import.meta.dir, "..");

function readSource(relativePath: string) {
    return readFileSync(join(projectRoot, relativePath), "utf8");
}

describe("Profile API and Rarity Sorting Logic", () => {
    it("should keep the profile route skeleton aligned to the rendered profile container", () => {
        const skeletonSource = readSource("src/components/profile/ProfileRouteLoading.tsx");
        const profileSource = readSource("src/components/profile/TrainerProfileView.tsx");

        expect(skeletonSource).toContain("max-w-7xl");
        expect(profileSource).toContain("max-w-7xl");
    });

    it("GET /api/profile should return 401 when unauthenticated", async () => {
        const response = await getProfile(new Request("http://localhost:3000/api/profile") as any);
        expect(response.status).toBe(401);
    });

    it("GET /api/profile/[username] should reject empty username", async () => {
        const response = await getSharedProfile(new Request("http://localhost:3000/api/profile/") as any, {
            params: Promise.resolve({ username: "   " }),
        });
        expect(response.status).toBe(400);
    });

    it("GET /api/profile/[username] should return 404 and not crash with 500 on malformed percent encoding or invalid characters", async () => {
        const malformedResponse = await getSharedProfile(new Request("http://localhost:3000/api/profile/%25") as any, {
            params: Promise.resolve({ username: "%" }),
        });
        expect(malformedResponse.status).toBe(404);

        const invalidCharResponse = await getSharedProfile(new Request("http://localhost:3000/api/profile/invalid!") as any, {
            params: Promise.resolve({ username: "invalid!" }),
        });
        expect(invalidCharResponse.status).toBe(404);
    });

    it("GET /api/profile/[username]/collection should return 404 and not crash with 500 on malformed percent encoding", async () => {
        const malformedResponse = await getSharedCollection(new Request("http://localhost:3000/api/profile/%25/collection") as any, {
            params: Promise.resolve({ username: "%" }),
        });
        expect(malformedResponse.status).toBe(404);
    });

    it("safeDecodeParam should safely handle normal, empty, and malformed strings without throwing URIError", () => {
        expect(safeDecodeParam("ash")).toBe("ash");
        expect(safeDecodeParam("%20ash%20")).toBe("ash");
        expect(safeDecodeParam("")).toBe("");
        expect(safeDecodeParam("   ")).toBe("");
        expect(safeDecodeParam(null)).toBeNull();
        expect(safeDecodeParam(undefined)).toBeNull();
        expect(safeDecodeParam("%")).toBeNull();
        expect(safeDecodeParam("%80")).toBeNull();
    });

    it("isValidProfileParam should validate usernames and UUIDs and reject invalid strings", () => {
        expect(isValidProfileParam("ash")).toBe(true);
        expect(isValidProfileParam("@ash")).toBe(true);
        expect(isValidProfileParam("treinador_kanto")).toBe(true);
        expect(isValidProfileParam("12345678-1234-4234-8234-123456789012")).toBe(true);
        expect(isValidProfileParam("%")).toBe(false);
        expect(isValidProfileParam("")).toBe(false);
        expect(isValidProfileParam("a")).toBe(false);
        expect(isValidProfileParam("@")).toBe(false);
        expect(isValidProfileParam("invalid!user")).toBe(false);
    });

    it("should derive default username from email local-part", () => {
        expect(usernameFromEmail("Ash.Ketchum@kanto.com")).toBe("ashketchum");
        expect(usernameFromEmail("123red@kanto.com")).toBe("t123red");
    });

    it("should sanitize reserved username words derived from email", () => {
        expect(usernameFromEmail("admin@gmail.com")).toBe("treinador_admin");
        expect(usernameFromEmail("login@empresa.com")).toBe("treinador_login");
    });

    it("should validate usernames", () => {
        expect(validateUsername("ash").ok).toBe(true);
        expect(validateUsername("Ash_99").ok).toBe(true);
        expect(validateUsername("ab").ok).toBe(false);
        expect(validateUsername("login").ok).toBe(false);
    });

    it("should validate display names", () => {
        expect(validateDisplayName("Ash").ok).toBe(true);
        expect(validateDisplayName("  ").ok).toBe(false);
        expect(validateDisplayName("A".repeat(41)).ok).toBe(false);
    });

    it("should omit email for non-owners and include theme + username", () => {
        const cards: UserCard[] = [];
        const publicProfile = buildProfileFromCards({
            user: { id: "u1", username: "ash", name: "Ash", email: "ash@kanto.com", avatarUrl: null },
            cards,
            isOwner: false,
            themeColor: "#10b981",
        });
        const ownerProfile = buildProfileFromCards({
            user: { id: "u1", username: "ash", name: "Ash", email: "ash@kanto.com", avatarUrl: null },
            cards,
            isOwner: true,
            themeColor: "#10b981",
        });

        expect(publicProfile.isOwner).toBe(false);
        expect(publicProfile.user.email).toBeUndefined();
        expect(publicProfile.user.username).toBe("ash");
        expect(publicProfile.user.name).toBe("Ash");
        expect(publicProfile.themeColor).toBe("#10b981");
        expect(ownerProfile.isOwner).toBe(true);
        expect(ownerProfile.user.email).toBe("ash@kanto.com");
    });

    it("should build 151 binder slots with filled state from is_in_binder", () => {
        const cards = [
            {
                id: "c1",
                user_id: "u1",
                tcgdex_card_id: "me-001",
                pokemon_dex_id: 1,
                card_name: "Bulbasaur",
                card_image_url: "https://example.com/1.png",
                card_rarity: "Common",
                card_language: "EN",
                card_variant: "normal",
                is_in_binder: true,
                created_at: "2026-01-01",
            },
            {
                id: "c2",
                user_id: "u1",
                tcgdex_card_id: "me-025",
                pokemon_dex_id: 25,
                card_name: "Pikachu",
                card_image_url: "https://example.com/25.png",
                card_rarity: "Rare",
                card_language: "EN",
                card_variant: "normal",
                is_in_binder: false,
                created_at: "2026-01-02",
            },
        ] as unknown as UserCard[];

        const profile = buildProfileFromCards({
            user: { id: "u1", username: "ash", name: "Ash", avatarUrl: null },
            cards,
            isOwner: true,
        });

        expect(profile.slots).toHaveLength(151);
        expect(profile.slots[0]).toMatchObject({ pokemon_dex_id: 1, pokemon_name: "Bulbasaur", is_filled: true });
        expect(profile.slots[24]).toMatchObject({ pokemon_dex_id: 25, pokemon_name: "Pikachu", is_filled: false });
        expect(profile.stats.totalInBinder).toBe(1);
        expect(profile.stats.totalCollection).toBe(2);
    });

    it("should score rarities in correct descending order", () => {
        const sirScore = getRarityScore("Special Illustration Rare");
        const irScore = getRarityScore("Illustration Rare");
        const urScore = getRarityScore("Ultra Rare");
        const rareHoloScore = getRarityScore("Rare Holo");
        const rareScore = getRarityScore("Rare");
        const uncommonScore = getRarityScore("Uncommon");
        const commonScore = getRarityScore("Common");

        expect(sirScore).toBeGreaterThan(irScore);
        expect(irScore).toBeGreaterThan(urScore);
        expect(urScore).toBeGreaterThan(rareHoloScore);
        expect(rareHoloScore).toBeGreaterThan(rareScore);
        expect(rareScore).toBeGreaterThan(uncommonScore);
        expect(uncommonScore).toBeGreaterThan(commonScore);
    });

    it("should correctly identify rarity impact tiers", () => {
        expect(getRarityImpactTier("Special Illustration Rare")).toBe(3);
        expect(getRarityImpactTier("Illustration Rare")).toBe(2);
        expect(getRarityImpactTier("Hyper Rare")).toBe(3);
        expect(getRarityImpactTier("Secret Rare")).toBe(3);
        expect(getRarityImpactTier("Ultra Rare")).toBe(2);
        expect(getRarityImpactTier("LEGEND")).toBe(2);
        expect(getRarityImpactTier("Common")).toBe(0);
        expect(getRarityImpactTier("Uncommon")).toBe(0);
        expect(getRarityImpactTier("Double Rare")).toBe(1);
    });

    it("should sort mock user cards by rarity score descending and deduplicate by edition", () => {
        const mockCards = [
            {
                id: "c1",
                tcgdex_card_id: "me-001",
                pokemon_dex_id: 1,
                card_name: "Bulbasaur",
                card_rarity: "Common",
                created_at: "2026-01-01",
            },
            {
                id: "c2",
                tcgdex_card_id: "me-001",
                pokemon_dex_id: 1,
                card_name: "Bulbasaur",
                card_rarity: "Common",
                created_at: "2026-01-02",
            },
            {
                id: "c3",
                tcgdex_card_id: "me-198",
                pokemon_dex_id: 6,
                card_name: "Charizard ex",
                card_rarity: "Special Illustration Rare",
                created_at: "2026-01-03",
            },
            {
                id: "c4",
                tcgdex_card_id: "me-166",
                pokemon_dex_id: 1,
                card_name: "Bulbasaur",
                card_rarity: "Illustration Rare",
                created_at: "2026-01-04",
            },
        ];

        const sorted = [...mockCards].sort((a, b) => {
            const scoreA = getRarityScore(a.card_rarity);
            const scoreB = getRarityScore(b.card_rarity);
            if (scoreB !== scoreA) return scoreB - scoreA;
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });

        const seenEditions = new Set<string>();
        const deduplicated = sorted.filter((card) => {
            if (seenEditions.has(card.tcgdex_card_id)) return false;
            seenEditions.add(card.tcgdex_card_id);
            return true;
        });

        expect(deduplicated.length).toBe(3);
        expect(deduplicated[0].card_name).toBe("Charizard ex");
        expect(deduplicated[1].card_name).toBe("Bulbasaur");
        expect(deduplicated[1].card_rarity).toBe("Illustration Rare");
        expect(deduplicated[2].card_rarity).toBe("Common");
    });

    it("should provide badge styling for different rarity classifications", () => {
        const sirBadge = getRarityBadgeStyle("Special Illustration Rare");
        expect(sirBadge.tier).toBe(3);
        expect(sirBadge.label).toBe("Ilustração Rara Especial");

        const commonBadge = getRarityBadgeStyle("Common");
        expect(commonBadge.tier).toBe(0);
        expect(commonBadge.label).toBe("Comum");
    });

    it("should prefer manual favorite cards as featured showcase", () => {
        const cards = [
            {
                id: "fav-1",
                user_id: "u1",
                tcgdex_card_id: "me-001",
                pokemon_dex_id: 1,
                card_name: "Bulbasaur",
                card_image_url: "https://example.com/1.png",
                card_rarity: "Common",
                card_language: "EN",
                card_variant: "normal",
                is_in_binder: true,
                created_at: "2026-01-01",
            },
            {
                id: "rare-1",
                user_id: "u1",
                tcgdex_card_id: "me-198",
                pokemon_dex_id: 6,
                card_name: "Charizard ex",
                card_image_url: "https://example.com/6.png",
                card_rarity: "Special Illustration Rare",
                card_language: "EN",
                card_variant: "normal",
                is_in_binder: false,
                created_at: "2026-01-03",
            },
        ] as unknown as UserCard[];

        const withFavorites = buildProfileFromCards({
            user: { id: "u1", username: "ash", name: "Ash", avatarUrl: null, bio: "Gotta catch em all" },
            cards,
            isOwner: true,
            favoriteCardIds: ["fav-1"],
        });

        expect(withFavorites.featuredIsManual).toBe(true);
        expect(withFavorites.featuredCards).toHaveLength(1);
        expect(withFavorites.featuredCards[0].id).toBe("fav-1");
        expect(withFavorites.user.bio).toBe("Gotta catch em all");
        expect(withFavorites.rarityBreakdown.some((r) => r.label === "Ilustração Rara Especial")).toBe(true);
        expect(withFavorites.rarityBreakdown.some((r) => r.label === "Comum")).toBe(true);

        const emptyFeatured = buildProfileFromCards({
            user: { id: "u1", username: "ash", name: "Ash", avatarUrl: null },
            cards,
            isOwner: true,
            favoriteCardIds: [],
        });
        expect(emptyFeatured.featuredIsManual).toBe(false);
        expect(emptyFeatured.featuredCards).toHaveLength(0);
    });

    it("should build theme CSS vars for scoped profile content", () => {
        const vars = buildThemeCssVars("#10b981") as Record<string, string>;
        expect(vars["--theme-primary"]).toBe("#10b981");
        expect(vars["--color-poke-blue"]).toBe("#10b981");
        expect(vars["--theme-primary-hover"]).toContain("10b981");
        expect(vars["--theme-primary-glow"]).toContain("10b981");
    });

    it("should scope observed profile theme to content only — not Header, BottomNav, or loaders", () => {
        const viewSource = readFileSync(join(import.meta.dir, "../src/components/profile/TrainerProfileView.tsx"), "utf8");
        const routeLoadingSource = readFileSync(join(import.meta.dir, "../src/components/profile/ProfileRouteLoading.tsx"), "utf8");
        const profilePageSource = readFileSync(join(import.meta.dir, "../src/app/perfil/[username]/page.tsx"), "utf8");
        const collectionPageSource = readFileSync(join(import.meta.dir, "../src/app/colecao/[username]/page.tsx"), "utf8");

        expect(viewSource).toContain("function ProfileThemeScope");
        expect(viewSource).toContain("<ProfileThemeScope themeColor={themeColor}>");
        expect(viewSource).toMatch(/function ProfileShell\(\{\s*children\s*\}/);
        expect(viewSource).not.toContain("ProfileShell themeColor=");
        expect(viewSource).not.toContain("color={profile?.themeColor}");
        expect(viewSource).toContain('<PokeballLoader message="Carregando perfil do treinador..." size="lg" />');
        expect(viewSource).toContain("key={username}");
        expect(viewSource).toContain("profile-enter");
        expect(viewSource).toContain("getCardAppearProps");
        expect(viewSource).not.toContain("useImagePreloader");

        expect(routeLoadingSource).not.toContain("<Header />");
        expect(routeLoadingSource).toContain("RouteLoading");
        expect(routeLoadingSource).not.toContain("PokeballLoader");
        expect(routeLoadingSource).not.toContain("buildThemeCssVars");
        expect(routeLoadingSource).not.toContain("color=");
        expect(routeLoadingSource).toContain("bg-[#0a0c10]");

        expect(profilePageSource).toContain("<Suspense");
        expect(profilePageSource).toContain("<ProfileRouteLoading");
        expect(collectionPageSource).toContain("<Suspense");
        expect(collectionPageSource).toContain('message="Carregando coleção..."');
    });
});
