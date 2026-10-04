import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const readSource = (path: string) => readFileSync(join(import.meta.dir, path), "utf8");

describe("Regressões do fluxo de seleção e catálogo do Binder", () => {
    it("limpa somente o destaque ao remover, sem ocultar o exemplar da lista", () => {
        const selector = readSource("../src/components/modal/BinderSlotSelectModal.tsx");
        const removeHandler = selector.slice(selector.indexOf("const handleRemoveCard"), selector.indexOf("const buildCardDetailUrl"));

        expect(removeHandler).toContain("setPreviewCard(undefined)");
        expect(removeHandler).toContain("updateCollectionCardBinderStatus(card.id, false)");
    });

    it("não revela a nova carta no Binder antes de iniciar sua queda", () => {
        const viewer = readSource("../src/components/binder/UniversalBinderViewer.tsx");

        expect(viewer).toContain("displaySlots");
        expect(viewer).toContain("pendingDropOriginalCard");
        expect(viewer).toContain("slots={displaySlots}");
    });

    it("mantém a carta do Binder clicável enquanto a imagem resolve", () => {
        const tilt = readSource("../src/components/ui/Card3DTilt.tsx");
        const slot = readSource("../src/components/binder/UniversalBinderSlot.tsx");

        expect(tilt).toContain('pointerEvents: paused ? "none" : undefined');
        expect(slot).toContain("onError={() => setImageLoaded(true)}");
        expect(slot).toContain("node?.complete && node.naturalWidth > 0");
    });

    it("remove o parâmetro de reabertura ao fechar o seletor", () => {
        const viewer = readSource("../src/components/binder/UniversalBinderViewer.tsx");

        expect(viewer).toContain('url.searchParams.delete("openSlot")');
        expect(viewer).toContain("closeSlotModal");
    });

    it("aguarda a posse inicial antes de revelar a grade do catálogo", () => {
        const catalog = readSource("../src/components/modal/CardSearchModal.tsx");

        expect(catalog).toContain("setOwnedCounts({})");
        expect(catalog).toContain("ownedCardIds");
        expect(catalog).toContain("isInitialOwnershipLoading");
        expect(catalog).toContain("initialLoading || isInitialOwnershipLoading");
        expect(catalog).toContain("const isMissing = isOwnershipKnown && comboCount === 0");
    });

    it("mantém um único esqueleto até as artes iniciais estarem prontas", () => {
        const catalog = readSource("../src/components/modal/CardSearchModal.tsx");
        const artwork = readSource("../src/components/ui/CardArtwork.tsx");

        expect(catalog).toContain("pendingArtworkIds");
        expect(catalog).toContain("isCatalogGridLoading");
        expect(catalog).toContain("onImageLoaded");
        expect(artwork).toContain("onImageLoaded?: () => void");
    });

    it("não ativa o esqueleto de carregamento inicial durante a paginação de mais cartas", () => {
        const catalog = readSource("../src/components/modal/CardSearchModal.tsx");

        expect(catalog).toContain("!loadingMore && page === 1 && (initialLoading || isInitialOwnershipLoading || pendingArtworkIds.size > 0)");
        expect(catalog).toContain("if (page === 1) {\n            setIsInitialOwnershipLoading(true);\n        }");
        expect(catalog).toContain("const uniqueIncoming = (data.cards ?? []).filter((c) => !existingIds.has(c.id));");
    });
});
