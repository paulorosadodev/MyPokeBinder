import { describe, it, expect } from "bun:test";

describe("Navigation and BottomNav Route Logic", () => {
    const getMobileNavItems = (currentPath: string) => [
        {
            href: "/",
            label: "Binders",
            isActive: currentPath === "/" || currentPath.startsWith("/binders"),
        },
        {
            href: "/colecao",
            label: "Coleção",
            isActive: currentPath.startsWith("/colecao") || currentPath.startsWith("/cartas"),
        },
    ];

    const getDesktopNavItems = (currentPath: string) => [
        {
            href: "/",
            label: "Binders",
            isActive: currentPath === "/" || currentPath.startsWith("/binders"),
        },
        {
            href: "/colecao",
            label: "Coleção",
            isActive: currentPath.startsWith("/colecao") || currentPath.startsWith("/cartas"),
        },
    ];

    const calculateActiveIndex = (items: { isActive: boolean }[]) => {
        return items.findIndex((item) => item.isActive);
    };

    it("should correctly activate Binders on root path as first item", () => {
        const items = getMobileNavItems("/");
        expect(items[0].isActive).toBe(true);
        expect(items[1].isActive).toBe(false);
    });

    it("should correctly activate Binders on nested /binders/:id path", () => {
        const items = getMobileNavItems("/binders/uuid-123");
        expect(items[0].isActive).toBe(true);
        expect(items[1].isActive).toBe(false);

        const desktopItems = getDesktopNavItems("/binders/uuid-123");
        expect(desktopItems[0].isActive).toBe(true);
        expect(desktopItems[1].isActive).toBe(false);
    });

    it("should correctly activate Coleção on /colecao as second item", () => {
        const items = getMobileNavItems("/colecao");
        expect(items[0].isActive).toBe(false);
        expect(items[1].isActive).toBe(true);
    });

    it("should not activate any tab for secondary profile routes", () => {
        const items = getMobileNavItems("/configuracoes");
        expect(items[0].isActive).toBe(false);
        expect(items[1].isActive).toBe(false);
    });

    it("should correctly handle nested paths under colecao", () => {
        const items = getMobileNavItems("/colecao/filtro");
        expect(items[1].isActive).toBe(true);
    });

    it("should activate Coleção when viewing or editing a card under /cartas/:id", () => {
        const mobileItems = getMobileNavItems("/cartas/card-123");
        expect(mobileItems[0].isActive).toBe(false);
        expect(mobileItems[1].isActive).toBe(true);

        const desktopItems = getDesktopNavItems("/cartas/card-123");
        expect(desktopItems[0].isActive).toBe(false);
        expect(desktopItems[1].isActive).toBe(true);
    });

    it("should calculate correct slider active index for mobile nav", () => {
        expect(calculateActiveIndex(getMobileNavItems("/"))).toBe(0);
        expect(calculateActiveIndex(getMobileNavItems("/binders/123"))).toBe(0);
        expect(calculateActiveIndex(getMobileNavItems("/colecao"))).toBe(1);
        expect(calculateActiveIndex(getMobileNavItems("/cartas/swsh4-25"))).toBe(1);
        expect(calculateActiveIndex(getMobileNavItems("/perfil"))).toBe(-1);
        expect(calculateActiveIndex(getMobileNavItems("/unknown"))).toBe(-1);
    });

    it("should calculate correct active item index for desktop nav", () => {
        expect(calculateActiveIndex(getDesktopNavItems("/"))).toBe(0);
        expect(calculateActiveIndex(getDesktopNavItems("/binders/123"))).toBe(0);
        expect(calculateActiveIndex(getDesktopNavItems("/colecao"))).toBe(1);
        expect(calculateActiveIndex(getDesktopNavItems("/cartas/swsh4-25"))).toBe(1);
        expect(calculateActiveIndex(getDesktopNavItems("/perfil"))).toBe(-1);
        expect(calculateActiveIndex(getDesktopNavItems("/unknown"))).toBe(-1);
    });

    it("should identify profile active route without selecting binder", () => {
        const path: string = "/perfil";
        const isProfileActive = path === "/perfil" || path.startsWith("/configuracoes");
        const desktopItems = getDesktopNavItems(path);
        const activeNavIndex = calculateActiveIndex(desktopItems);

        expect(isProfileActive).toBe(true);
        expect(activeNavIndex).toBe(-1);
        expect(desktopItems.some((item) => item.isActive)).toBe(false);
    });

    it("should identify own shared profile route as profile active", () => {
        const ownUsername = "ashketchum";
        const path: string = `/perfil/${ownUsername}`;
        const isOwnSharedProfile = path === `/perfil/${ownUsername}`;
        const isProfileActive = path === "/perfil" || isOwnSharedProfile || path.startsWith("/configuracoes");
        expect(isProfileActive).toBe(true);
    });

    it("should not mark another trainer profile as own profile active route", () => {
        const ownUsername = "ashketchum";
        const path: string = "/perfil/misty";
        const isOwnSharedProfile = path === `/perfil/${ownUsername}`;
        const isProfileActive = path === "/perfil" || isOwnSharedProfile || path.startsWith("/configuracoes");
        expect(isProfileActive).toBe(false);
    });

    it("should identify settings route (/configuracoes) as profile active route", () => {
        const path: string = "/configuracoes";
        const isProfileActive = path === "/perfil" || path.startsWith("/configuracoes");
        const desktopItems = getDesktopNavItems(path);
        const activeNavIndex = calculateActiveIndex(desktopItems);

        expect(isProfileActive).toBe(true);
        expect(activeNavIndex).toBe(-1);
        expect(desktopItems.some((item) => item.isActive)).toBe(false);
    });

    it("should prefer display name over username in nav label", () => {
        const getNavLabel = (user: { name?: string; username?: string; email?: string }) => {
            return user.name || user.username || user.email?.split("@")[0] || "Meu Perfil";
        };

        expect(getNavLabel({ name: "Ash", username: "ashketchum", email: "ash@pokemon.com" })).toBe("Ash");
        expect(getNavLabel({ username: "ashketchum", email: "ash@pokemon.com" })).toBe("ashketchum");
        expect(getNavLabel({ email: "red@pokemon.com" })).toBe("red");
        expect(getNavLabel({})).toBe("Meu Perfil");
    });

    it("should identify active item in traditional desktop navbar list", () => {
        const rootItems = getDesktopNavItems("/");
        expect(rootItems.find((item) => item.isActive)?.label).toBe("Binders");

        const collectionItems = getDesktopNavItems("/colecao");
        expect(collectionItems.find((item) => item.isActive)?.label).toBe("Coleção");

        const cardItems = getDesktopNavItems("/cartas/swsh4-25");
        expect(cardItems.find((item) => item.isActive)?.label).toBe("Coleção");

        const profileItems = getDesktopNavItems("/perfil");
        expect(profileItems.some((item) => item.isActive)).toBe(false);
    });

    it("should structure active mobile bottom nav slider with theme primary CSS variables", () => {
        const activeNavPillClass = "pointer-events-none absolute top-1 bottom-1 left-1 rounded-xl border border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/20 shadow-[0_0_12px_var(--theme-primary-glow)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]";
        expect(activeNavPillClass).toContain("bg-[var(--theme-primary)]/20");
        expect(activeNavPillClass).toContain("shadow-[0_0_12px_var(--theme-primary-glow)]");
    });

    it("should highlight only the optimistic target link in traditional desktop navbar", () => {
        const getHighlightedHrefs = (currentPath: string, optimisticHref: string | null) => {
            const items = getDesktopNavItems(currentPath);
            return items.filter((item) => (optimisticHref !== null ? optimisticHref === item.href : item.isActive)).map((item) => item.href);
        };

        expect(getHighlightedHrefs("/", null)).toEqual(["/"]);
        expect(getHighlightedHrefs("/", "/colecao")).toEqual(["/colecao"]);
        expect(getHighlightedHrefs("/colecao", "/")).toEqual(["/"]);
        expect(getHighlightedHrefs("/", "/perfil")).toEqual([]);
    });

    it("should keep profile link border reserved to avoid nav height jump", () => {
        const inactiveProfileClass = "border border-transparent";
        const activeProfileClass = "border border-[var(--theme-primary)]/30";
        expect(inactiveProfileClass).toContain("border-transparent");
        expect(activeProfileClass).toContain("border-[var(--theme-primary)]/30");
    });

    it("should suppress nav pages when unauthenticated user views someone profile or collection", () => {
        const shouldRenderPages = (pathname: string, isAuthenticated: boolean) => {
            if (!isAuthenticated) return false;
            return true;
        };

        expect(shouldRenderPages("/perfil/ash", false)).toBe(false);
        expect(shouldRenderPages("/colecao/ash", false)).toBe(false);
        expect(shouldRenderPages("/perfil/ash", true)).toBe(true);
        expect(shouldRenderPages("/colecao/ash", true)).toBe(true);
    });

    it("should show login button on opposite side of logo when unauthenticated user views shared profile or collection", () => {
        const shouldShowGuestLoginButton = (pathname: string, isAuthenticated: boolean) => {
            const isShared = pathname.startsWith("/perfil/") || pathname.startsWith("/colecao/");
            return !isAuthenticated && isShared;
        };

        expect(shouldShowGuestLoginButton("/perfil/ash", false)).toBe(true);
        expect(shouldShowGuestLoginButton("/colecao/ash", false)).toBe(true);
        expect(shouldShowGuestLoginButton("/perfil/ash", true)).toBe(false);
        expect(shouldShowGuestLoginButton("/colecao/ash", true)).toBe(false);
        expect(shouldShowGuestLoginButton("/login", false)).toBe(false);
        expect(shouldShowGuestLoginButton("/colecao", false)).toBe(false);
    });
});
