import { describe, it, expect } from "bun:test";

describe("Navigation and BottomNav Route Logic", () => {
    const getMobileNavItems = (currentPath: string) => [
        {
            href: "/dashboard",
            label: "Dashboard",
            isActive: currentPath.startsWith("/dashboard"),
        },
        {
            href: "/",
            label: "Binder",
            isActive: currentPath === "/",
        },
        {
            href: "/collection",
            label: "Coleção",
            isActive: currentPath.startsWith("/collection") || currentPath.startsWith("/cards"),
        },
    ];

    const getDesktopNavItems = (currentPath: string) => [
        {
            href: "/",
            label: "Binder",
            isActive: currentPath === "/",
        },
        {
            href: "/collection",
            label: "Coleção",
            isActive: currentPath.startsWith("/collection") || currentPath.startsWith("/cards"),
        },
        {
            href: "/dashboard",
            label: "Dashboard",
            isActive: currentPath.startsWith("/dashboard"),
        },
    ];

    const calculateActiveIndex = (items: { isActive: boolean }[]) => {
        return items.findIndex((item) => item.isActive);
    };

    it("should correctly activate Binder on root path as center item", () => {
        const items = getMobileNavItems("/");
        expect(items[0].isActive).toBe(false);
        expect(items[1].isActive).toBe(true);
        expect(items[2].isActive).toBe(false);
    });

    it("should correctly activate Coleção on /collection as right item", () => {
        const items = getMobileNavItems("/collection");
        expect(items[0].isActive).toBe(false);
        expect(items[1].isActive).toBe(false);
        expect(items[2].isActive).toBe(true);
    });

    it("should correctly activate Dashboard on /dashboard as left item", () => {
        const items = getMobileNavItems("/dashboard");
        expect(items[0].isActive).toBe(true);
        expect(items[1].isActive).toBe(false);
        expect(items[2].isActive).toBe(false);
    });

    it("should correctly handle nested paths under collection", () => {
        const items = getMobileNavItems("/collection/filter");
        expect(items[2].isActive).toBe(true);
    });

    it("should activate Coleção when viewing or editing a card under /cards/:id", () => {
        const mobileItems = getMobileNavItems("/cards/card-123");
        expect(mobileItems[0].isActive).toBe(false);
        expect(mobileItems[1].isActive).toBe(false);
        expect(mobileItems[2].isActive).toBe(true);

        const desktopItems = getDesktopNavItems("/cards/card-123");
        expect(desktopItems[0].isActive).toBe(false);
        expect(desktopItems[1].isActive).toBe(true);
        expect(desktopItems[2].isActive).toBe(false);
    });

    it("should calculate correct slider active index for mobile nav", () => {
        expect(calculateActiveIndex(getMobileNavItems("/dashboard"))).toBe(0);
        expect(calculateActiveIndex(getMobileNavItems("/"))).toBe(1);
        expect(calculateActiveIndex(getMobileNavItems("/collection"))).toBe(2);
        expect(calculateActiveIndex(getMobileNavItems("/cards/swsh4-25"))).toBe(2);
        expect(calculateActiveIndex(getMobileNavItems("/perfil"))).toBe(-1);
        expect(calculateActiveIndex(getMobileNavItems("/unknown"))).toBe(-1);
    });

    it("should calculate correct slider active index for desktop nav", () => {
        expect(calculateActiveIndex(getDesktopNavItems("/"))).toBe(0);
        expect(calculateActiveIndex(getDesktopNavItems("/collection"))).toBe(1);
        expect(calculateActiveIndex(getDesktopNavItems("/cards/swsh4-25"))).toBe(1);
        expect(calculateActiveIndex(getDesktopNavItems("/dashboard"))).toBe(2);
        expect(calculateActiveIndex(getDesktopNavItems("/perfil"))).toBe(-1);
        expect(calculateActiveIndex(getDesktopNavItems("/unknown"))).toBe(-1);
    });

    it("should identify profile active route without selecting binder", () => {
        const path = "/perfil";
        const isProfileActive = path === "/perfil";
        const desktopItems = getDesktopNavItems(path);
        const activeNavIndex = calculateActiveIndex(desktopItems);

        expect(isProfileActive).toBe(true);
        expect(activeNavIndex).toBe(-1);
        expect(desktopItems.some((item) => item.isActive)).toBe(false);
    });

    it("should extract user display name fallback correctly", () => {
        const getDisplayName = (user: { name?: string; email?: string }) => {
            return user.name || user.email?.split("@")[0] || "Usuário";
        };

        expect(getDisplayName({ name: "Ash Ketchum", email: "ash@pokemon.com" })).toBe("Ash Ketchum");
        expect(getDisplayName({ email: "red@pokemon.com" })).toBe("red");
        expect(getDisplayName({})).toBe("Usuário");
    });
});
