import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("Navegação rápida entre Coleção, cartas e Binders", () => {
    it("aquece a rota e os detalhes da carta antes do clique", () => {
        const source = readFileSync(join(import.meta.dir, "../src/app/colecao/page.tsx"), "utf8");

        expect(source).toContain("<NextLink");
        expect(source).toContain("prefetchCardDetails");
        expect(source).toContain("onPointerDown={() => prefetchCardDetails(card, group.copies)}");
        expect(source).toContain("fetcher<CardDetailsResponse>(cacheKey)");
        expect(source).toContain("availableVariants: ALL_CARD_VARIANTS");
    });

    it("prefaz o Binder também em interações de toque", () => {
        const shelfSource = readFileSync(join(import.meta.dir, "../src/components/shelf/BinderShelf.tsx"), "utf8");
        const modalSource = readFileSync(join(import.meta.dir, "../src/components/modal/BinderSlotSelectModal.tsx"), "utf8");

        expect(shelfSource).toContain("onPointerDown={() => router.prefetch(`/binders/${binder.id}`)}");
        expect(modalSource).toContain("onPointerDown={() => handlePrefetchCard(group.activeCard.id, dexId)}");
    });

    it("carrega o editor do Binder em paralelo", () => {
        const source = readFileSync(join(import.meta.dir, "../src/app/binders/[id]/edit/page.tsx"), "utf8");

        expect(source).toContain("const [binderResult, slotsResult] = await Promise.all([");
        expect(source).toContain("slotsResult.data");
    });
});
