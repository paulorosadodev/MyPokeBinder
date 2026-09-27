import { describe, it, expect } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { shouldShowAppHeader } from "../src/lib/layout/appShell";

const appDir = join(import.meta.dir, "../src/app");
const stackedRouteLoaders = ["loading.tsx", "dashboard/loading.tsx", "collection/loading.tsx", "cards/[id]/loading.tsx", "configuracoes/loading.tsx", "perfil/loading.tsx", "perfil/[username]/loading.tsx", "colecao/[username]/loading.tsx"];

describe("AppShell header visibility", () => {
    it("hides the app Header on landing, login, legal, and auth routes", () => {
        expect(shouldShowAppHeader("/", false)).toBe(false);
        expect(shouldShowAppHeader("/login", false)).toBe(false);
        expect(shouldShowAppHeader("/inicio", true)).toBe(false);
        expect(shouldShowAppHeader("/termos", true)).toBe(false);
        expect(shouldShowAppHeader("/privacidade", false)).toBe(false);
        expect(shouldShowAppHeader("/privacy", false)).toBe(false);
        expect(shouldShowAppHeader("/terms", false)).toBe(false);
        expect(shouldShowAppHeader("/auth/callback", true)).toBe(false);
    });

    it("keeps the Header mounted on binder, profile, and other app routes", () => {
        expect(shouldShowAppHeader("/", true)).toBe(true);
        expect(shouldShowAppHeader("/dashboard", true)).toBe(true);
        expect(shouldShowAppHeader("/collection", true)).toBe(true);
        expect(shouldShowAppHeader("/cards/abc", true)).toBe(true);
        expect(shouldShowAppHeader("/configuracoes", true)).toBe(true);
        expect(shouldShowAppHeader("/perfil/ash", false)).toBe(true);
        expect(shouldShowAppHeader("/colecao/ash", false)).toBe(true);
    });
});

describe("Route loading shells", () => {
    it("does not render Header in RouteLoading or ProfileRouteLoading", () => {
        const routeLoading = readFileSync(join(import.meta.dir, "../src/components/loading/RouteLoading.tsx"), "utf8");
        const profileLoading = readFileSync(join(import.meta.dir, "../src/components/profile/ProfileRouteLoading.tsx"), "utf8");

        expect(routeLoading).toContain("PokeballLoader");
        expect(routeLoading).toContain("<main");
        expect(routeLoading).not.toContain("Header");
        expect(profileLoading).toContain("RouteLoading");
        expect(profileLoading).not.toContain("Header");
    });

    it("does not stack a route loading.tsx on top of the page PokeballLoader", () => {
        const leftover = stackedRouteLoaders.filter((relative) => existsSync(join(appDir, relative)));
        expect(leftover).toEqual([]);
    });

    it("streams profile routes with Suspense + ProfileRouteLoading instead of loading.tsx", () => {
        const profilePage = readFileSync(join(appDir, "perfil/[username]/page.tsx"), "utf8");
        const collectionPage = readFileSync(join(appDir, "colecao/[username]/page.tsx"), "utf8");

        expect(profilePage).toContain("Suspense");
        expect(profilePage).toContain("ProfileRouteLoading");
        expect(collectionPage).toContain("Suspense");
        expect(collectionPage).toContain("ProfileRouteLoading");
        expect(existsSync(join(appDir, "perfil/[username]/loading.tsx"))).toBe(false);
        expect(existsSync(join(appDir, "colecao/[username]/loading.tsx"))).toBe(false);
    });

    it("uses the same binder opening loader for refresh and client navigation", () => {
        const binder = readFileSync(join(import.meta.dir, "../src/components/binder/BinderClientPage.tsx"), "utf8");
        expect(binder).toContain("BinderOpeningLoader");
        expect(binder).toContain("Carregando seu fichário...");
        expect(binder).not.toContain("Carregando binder...");
        expect(binder).toContain("<Suspense fallback={<BinderOpeningLoader />}>");
        expect(binder).toContain("<BinderOpeningLoader />");
    });
});
