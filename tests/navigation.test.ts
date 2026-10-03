import { describe, it, expect } from "bun:test";

describe("Navigation and BottomNav Route Logic", () => {
    const getMobileNavItems = (currentPath: string) => [
        {
            href: "/",
            label: "Binders",
            isActive: currentPath === "/" || currentPath.startsWith("/binders"),
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
            label: "Binders",
            isActive: currentPath === "/" || currentPath.startsWith("/binders"),
        },
        {
            href: "/collection",
            label: "Coleção",
            isActive: currentPath.startsWith("/collection") || currentPath.startsWith("/cards"),
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

    it("should correctly activate Coleção on /collection as second item", () => {
        const items = getMobileNavItems("/collection");
        expect(items[0].isActive).toBe(false);
        expect(items[1].isActive).toBe(true);
    });

    it("should not activate any tab for legacy /dashboard", () => {
        const items = getMobileNavItems("/dashboard");
        expect(items[0].isActive).toBe(false);
        expect(items[1].isActive).toBe(false);
    });

    it("should correctly handle nested paths under collection", () => {
        const items = getMobileNavItems("/collection/filter");
        expect(items[1].isActive).toBe(true);
    });

    it("should activate Coleção when viewing or editing a card under /cards/:id", () => {
        const mobileItems = getMobileNavItems("/cards/card-123");
        expect(mobileItems[0].isActive).toBe(false);
        expect(mobileItems[1].isActive).toBe(true);

        const desktopItems = getDesktopNavItems("/cards/card-123");
        expect(desktopItems[0].isActive).toBe(false);
        expect(desktopItems[1].isActive).toBe(true);
    });

    it("should calculate correct slider active index for mobile nav", () => {
        expect(calculateActiveIndex(getMobileNavItems("/"))).toBe(0);
        expect(calculateActiveIndex(getMobileNavItems("/binders/123"))).toBe(0);
        expect(calculateActiveIndex(getMobileNavItems("/collection"))).toBe(1);
        expect(calculateActiveIndex(getMobileNavItems("/cards/swsh4-25"))).toBe(1);
        expect(calculateActiveIndex(getMobileNavItems("/perfil"))).toBe(-1);
        expect(calculateActiveIndex(getMobileNavItems("/unknown"))).toBe(-1);
    });

    it("should calculate correct slider active index for desktop nav", () => {
        expect(calculateActiveIndex(getDesktopNavItems("/"))).toBe(0);
        expect(calculateActiveIndex(getDesktopNavItems("/binders/123"))).toBe(0);
        expect(calculateActiveIndex(getDesktopNavItems("/collection"))).toBe(1);
        expect(calculateActiveIndex(getDesktopNavItems("/cards/swsh4-25"))).toBe(1);
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

    it("should calculate target index 2 and hide slider for profile routes to allow smooth direction slider transition", () => {
        const getDesktopTargetIndex = (path: string, ownUsername?: string) => {
            const isOwnSharedProfile = Boolean(ownUsername && path === `/perfil/${ownUsername}`);
            const isProfileActive = path === "/perfil" || isOwnSharedProfile || path.startsWith("/configuracoes");
            const rawIndex = getDesktopNavItems(path).findIndex((item) => item.isActive);
            return isProfileActive ? 2 : rawIndex;
        };

        expect(getDesktopTargetIndex("/")).toBe(0);
        expect(getDesktopTargetIndex("/binders/123")).toBe(0);
        expect(getDesktopTargetIndex("/collection")).toBe(1);
        expect(getDesktopTargetIndex("/perfil")).toBe(2);
        expect(getDesktopTargetIndex("/perfil/ashketchum", "ashketchum")).toBe(2);
        expect(getDesktopTargetIndex("/perfil/misty", "ashketchum")).toBe(-1);
        expect(getDesktopTargetIndex("/configuracoes")).toBe(2);

        const isSliderVisible = (index: number) => index >= 0 && index < 2;
        expect(isSliderVisible(0)).toBe(true);
        expect(isSliderVisible(1)).toBe(true);
        expect(isSliderVisible(2)).toBe(false);
    });

    it("should structure active navigation indicator with theme primary CSS variables", () => {
        const activeNavPillClass = "pointer-events-none absolute top-1 bottom-1 left-1 rounded-xl border border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/20 shadow-[0_0_12px_var(--theme-primary-glow)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]";
        expect(activeNavPillClass).toContain("bg-[var(--theme-primary)]/20");
        expect(activeNavPillClass).toContain("shadow-[0_0_12px_var(--theme-primary-glow)]");
    });

    it("should highlight only the optimistic target during desktop slider transition", () => {
        const getHighlightedIndexes = (pathname: string, optimisticIndex: number | null) => {
            const items = getDesktopNavItems(pathname);
            const isProfileActive = pathname.startsWith("/perfil") || pathname.startsWith("/configuracoes");
            const rawActiveIndex = items.findIndex((item) => item.isActive);
            const targetNavIndex = isProfileActive ? 2 : rawActiveIndex;
            const activeNavIndex = optimisticIndex !== null ? optimisticIndex : targetNavIndex;

            return items.map((_, index) => activeNavIndex === index);
        };

        const whileLeavingBinder = getHighlightedIndexes("/", 1);
        expect(whileLeavingBinder.filter(Boolean)).toHaveLength(1);
        expect(whileLeavingBinder[0]).toBe(false);
        expect(whileLeavingBinder[1]).toBe(true);

        const whileGoingToProfile = getHighlightedIndexes("/", 2);
        expect(whileGoingToProfile.every(Boolean)).toBe(false);
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
        expect(shouldShowGuestLoginButton("/collection", false)).toBe(false);
    });
});
