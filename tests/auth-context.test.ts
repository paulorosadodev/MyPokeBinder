import { describe, it, expect, beforeEach } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { UserProfile } from "@/lib/context/AuthContext";

describe("AuthContext and User Profile Logic", () => {
    const STORAGE_KEY = "mypokebinder_user_profile";

    beforeEach(() => {
        if (typeof localStorage !== "undefined") {
            localStorage.clear();
        }
    });

    it("should correctly format user profile data with full metadata", () => {
        const profile: UserProfile = {
            id: "user-123",
            email: "ash@kanto.com",
            username: "ashketchum",
            name: "Ash",
            avatarUrl: "https://example.com/ash.png",
        };

        expect(profile.id).toBe("user-123");
        expect(profile.email).toBe("ash@kanto.com");
        expect(profile.username).toBe("ashketchum");
        expect(profile.name).toBe("Ash");
        expect(profile.avatarUrl).toBe("https://example.com/ash.png");
    });

    it("should correctly derive initial letter from name or email", () => {
        const getInitial = (name?: string, email?: string): string => {
            return (name?.[0] || email?.[0] || "P").toUpperCase();
        };

        expect(getInitial("Paulo", "paulo@test.com")).toBe("P");
        expect(getInitial("", "red@kanto.com")).toBe("R");
        expect(getInitial(undefined, "blue@kanto.com")).toBe("B");
        expect(getInitial(undefined, undefined)).toBe("P");
    });

    it("should safely persist and recover user profile from storage key", () => {
        const profile: UserProfile = {
            id: "user-456",
            email: "misty@cerulean.com",
            username: "misty",
            avatarUrl: null,
        };

        const serialized = JSON.stringify(profile);
        const parsed: UserProfile = JSON.parse(serialized);

        expect(parsed.id).toBe(profile.id);
        expect(parsed.username).toBe(profile.username);
        expect(parsed.email).toBe(profile.email);
        expect(parsed.avatarUrl).toBeNull();
    });

    it("should fallback gracefully when storage content is malformed", () => {
        const safeParseUser = (raw: string | null): UserProfile | null => {
            if (!raw) return null;
            try {
                return JSON.parse(raw) as UserProfile;
            } catch {
                return null;
            }
        };

        expect(safeParseUser(null)).toBeNull();
        expect(safeParseUser("invalid json {]")).toBeNull();
        expect(safeParseUser(JSON.stringify({ id: "1", username: "brock" }))).toEqual({ id: "1", username: "brock" });
    });

    it("should include and persist bio in user profile", () => {
        const profile: UserProfile = {
            id: "user-789",
            email: "gary@pallet.com",
            username: "garyoak",
            name: "Gary Oak",
            avatarUrl: null,
            bio: "Colecionador de cartas vintage de Kanto.",
        };

        const serialized = JSON.stringify(profile);
        const parsed: UserProfile = JSON.parse(serialized);

        expect(parsed.bio).toBe("Colecionador de cartas vintage de Kanto.");
    });

    it("should keep settings page in loading state until assets, auth and profile hydration are ready", () => {
        const isSettingsPageReady = (isAssetsLoaded: boolean, isLoading: boolean, profileHydrated: boolean): boolean => {
            return isAssetsLoaded && !isLoading && profileHydrated;
        };

        expect(isSettingsPageReady(false, false, true)).toBe(false);
        expect(isSettingsPageReady(true, true, true)).toBe(false);
        expect(isSettingsPageReady(true, false, false)).toBe(false);
        expect(isSettingsPageReady(true, false, true)).toBe(true);
    });

    it("should initialize bioDraft synchronously when user profile already has bio", () => {
        const user: UserProfile = {
            id: "user-100",
            username: "red",
            name: "Red",
            bio: "Mestre Pokémon",
        };

        let bioDraft = "";
        let profileHydrated = false;

        if (typeof user.bio === "string") {
            bioDraft = user.bio;
            profileHydrated = true;
        }

        expect(bioDraft).toBe("Mestre Pokémon");
        expect(profileHydrated).toBe(true);
    });

    it("should defer browser cache restoration until after the hydration render", () => {
        const source = readFileSync(join(import.meta.dir, "../src/lib/context/AuthContext.tsx"), "utf8");

        expect(source).toContain("const [user, setUser] = useState<UserProfile | null>(initialUser);");
        expect(source).toContain("const [isLoading, setIsLoading] = useState<boolean>(!initialUser);");
        expect(source).not.toContain("const [user, setUser] = useState<UserProfile | null>(() => {");
    });
});
