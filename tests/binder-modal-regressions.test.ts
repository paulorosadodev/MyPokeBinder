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

    it("destaca a carta selecionada e atenua as demais durante o carregamento de alocação no binder sem borda azul", () => {
        const selector = readSource("../src/components/modal/BinderSlotSelectModal.tsx");

        expect(selector).toContain("isPendingThisCard = pendingActionId === group.activeCard.id");
        expect(selector).toContain("isOtherActionPending = (isActionPending && !isPendingThisCard) || (isNavigating && !isEditingThisCard)");
        expect(selector).toContain('isPendingThisCard ? "z-10 shadow-xl shadow-poke-blue/25 scale-[1.02]"');
        expect(selector).not.toContain("ring-2 ring-poke-blue");
        expect(selector).toContain('<PokeballLoader size="sm" message={isCurrent ? "Removendo..." : "Alocando..."} />');
        expect(selector).toContain('isOtherActionPending ? "cursor-not-allowed opacity-40 transition-opacity duration-200"');
    });

    it("utiliza PokeballLoader no carregamento de paginação e envio do catálogo", () => {
        const catalog = readSource("../src/components/modal/CardSearchModal.tsx");

        expect(catalog).toContain('<PokeballLoader message="Carregando mais cartas..." size="sm" />');
        expect(catalog).toContain('<PokeballLoader size="sm" />');
        expect(catalog).not.toContain('from "@/components/ui/Spinner"');
    });

    it("utiliza CardImageSkeleton e fade-in no slot do binder enquanto a imagem carrega", () => {
        const slot = readSource("../src/components/binder/UniversalBinderSlot.tsx");

        expect(slot).toContain("CardImageSkeleton");
        expect(slot).toContain('!imageLoaded ? <CardImageSkeleton className="absolute inset-0 z-0 h-full w-full rounded-[inherit]" /> : null');
        expect(slot).toContain('imageLoaded ? "opacity-100" : "opacity-0"');
        expect(slot).toContain("markCardImageCached(cardImageUrl)");
    });

    it("aguarda as imagens da página inicial estarem prontas antes de abrir a capa do binder", () => {
        const book = readSource("../src/components/binder/UniversalBinderBook.tsx");

        expect(book).toContain("initialImagesReady");
        expect(book).toContain("useImagePreloader(initialSpreadImages");
        expect(book).toContain("if (!initialImagesReady) return;");
    });

    it("restaura a posse ao reabrir o catálogo sem exibir cartas faltantes como possuídas", () => {
        const catalog = readSource("../src/components/modal/CardSearchModal.tsx");

        expect(catalog).toContain("clientOwnershipCache");
        expect(catalog).toContain("getCachedOwnership");
        expect(catalog).toContain("cacheOwnershipData");
        expect(catalog).toContain("const { knownIds, counts: cachedCounts, copyIds: cachedCopyIds } = getCachedOwnership");
    });

    it("conecta o sentinel da rolagem infinita de forma reativa e monitora a rolagem no container raiz", () => {
        const scrollHook = readSource("../src/lib/hooks/useInfiniteScroll.ts");

        expect(scrollHook).toContain("setSentinelNode");
        expect(scrollHook).toContain("sentinelNode");
        expect(scrollHook).toContain("handleScroll");
        expect(scrollHook).toContain('scrollContainer.addEventListener("scroll", handleScroll');
    });
});
