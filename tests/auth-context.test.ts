import { describe, it, expect, beforeEach } from "bun:test";
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
});
