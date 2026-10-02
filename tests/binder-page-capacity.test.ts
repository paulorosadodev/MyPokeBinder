import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getBinderSlotPageCount, getBinderTrailingSlotPage } from "@/lib/binder/pageCapacity";
import { canRevealUniversalSlotHighlight } from "@/lib/binder/universalHighlight";

describe("capacidade física do binder", () => {
    it("promove a última face de binders ímpares a uma página real de slots", () => {
        expect(getBinderSlotPageCount(17)).toBe(18);
        expect(getBinderTrailingSlotPage(17)).toBe(18);
        expect(getBinderSlotPageCount(5)).toBe(6);
    });

    it("não cria uma face adicional para binders com páginas pares", () => {
        expect(getBinderSlotPageCount(18)).toBe(18);
        expect(getBinderTrailingSlotPage(18)).toBeNull();
    });

    it("gera e migra os slots livres da face final no back-end", () => {
        const route = readFileSync(join(import.meta.dir, "../src/app/api/binders/route.ts"), "utf8");
        const migration = readFileSync(join(import.meta.dir, "../supabase/migrations/20260929000000_multi_binder_schema_and_migration.sql"), "utf8");

        expect(route).toContain("page <= slotPageCount");
        expect(route).toContain('slot_type: "free"');
        expect(migration).toContain("public.binder_slots");
        expect(migration).toContain("INSERT INTO public.binder_slots");
    });
});

describe("destaque vindo da busca ou das estatísticas", () => {
    it("aguarda a página correta, o fim do folheamento e o slot pintado", () => {
        expect(canRevealUniversalSlotHighlight({ targetPage: 8, currentPage: 1, isMobile: false, isBusy: false, isPainted: true })).toBe(false);
        expect(canRevealUniversalSlotHighlight({ targetPage: 8, currentPage: 8, isMobile: false, isBusy: true, isPainted: true })).toBe(false);
        expect(canRevealUniversalSlotHighlight({ targetPage: 8, currentPage: 8, isMobile: false, isBusy: false, isPainted: false })).toBe(false);
        expect(canRevealUniversalSlotHighlight({ targetPage: 8, currentPage: 8, isMobile: false, isBusy: false, isPainted: true })).toBe(true);
    });

    it("aceita o slot da página direita no spread desktop", () => {
        expect(canRevealUniversalSlotHighlight({ targetPage: 9, currentPage: 8, isMobile: false, isBusy: false, isPainted: true })).toBe(true);
        expect(canRevealUniversalSlotHighlight({ targetPage: 9, currentPage: 8, isMobile: true, isBusy: false, isPainted: true })).toBe(false);
    });
});
