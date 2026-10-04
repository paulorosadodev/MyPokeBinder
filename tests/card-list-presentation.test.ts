import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const readSource = (path: string) => readFileSync(join(import.meta.dir, path), "utf8");

describe("Apresentação editorial das listagens de cartas", () => {
    it("compartilha arte e pilha de indicadores nas listagens que as exibem", () => {
        const sources = [readSource("../src/app/colecao/page.tsx"), readSource("../src/components/profile/PublicCollectionView.tsx"), readSource("../src/components/modal/CardSearchModal.tsx")];

        for (const source of sources) {
            expect(source).toContain("CardArtwork");
            expect(source).toContain("CardBadgeStack");
            expect(source).not.toContain("CollectionCardVisual");
            expect(source).not.toContain("SearchCardVisual");
            expect(source).not.toContain("ModalSlotCardVisual");
        }

        const binderSelector = readSource("../src/components/modal/BinderSlotSelectModal.tsx");
        expect(binderSelector).toContain("CardArtwork");
        expect(binderSelector).not.toContain("CardBadgeStack");
        expect(binderSelector).not.toContain("rounded-[3px]");
    });

    it("mantém os indicadores dentro da transformação 3D da arte", () => {
        const artwork = readSource("../src/components/ui/CardArtwork.tsx");

        expect(artwork).toContain("children?: ReactNode");
        expect(artwork).toContain("{children}");
    });

    it("permite ocultar os indicadores somente nas grades das coleções", () => {
        const privateCollection = readSource("../src/app/colecao/page.tsx");
        const publicCollection = readSource("../src/components/profile/PublicCollectionView.tsx");
        const toggle = readSource("../src/components/ui/CardBadgeVisibilityToggle.tsx");
        const visibilityHook = readSource("../src/lib/hooks/useCardBadgeVisibility.ts");

        for (const source of [privateCollection, publicCollection]) {
            expect(source).toContain("CardBadgeVisibilityToggle");
            expect(source).toContain("useCardBadgeVisibility");
            expect(source).toContain("showCardBadges ? <CardBadgeStack");
        }

        expect(toggle).toContain('"Ocultar indicadores das cartas"');
        expect(toggle).toContain('"Exibir indicadores das cartas"');
        expect(toggle).toContain("aria-pressed={showBadges}");
        expect(visibilityHook).toContain('"mypokebinder_collection_show_card_badges"');
        expect(visibilityHook).toContain("localStorage.getItem(STORAGE_KEY)");
        expect(visibilityHook).toContain('cached === "true" || cached === "false"');
        expect(visibilityHook).toContain("localStorage.setItem(STORAGE_KEY, String(showBadges))");
    });

    it("reutiliza o esqueleto das cartas em todas as listagens fora do seletor do Binder", () => {
        const skeleton = readSource("../src/components/loading/CardGridSkeleton.tsx");
        const cardImage = readSource("../src/components/ui/CardImage.tsx");
        const binderSelector = readSource("../src/components/modal/BinderSlotSelectModal.tsx");

        expect(skeleton).toContain("aspect-[8/11]");
        expect(skeleton).toContain("CardImageSkeleton");
        expect(cardImage).toContain("export function CardImageSkeleton");
        expect(skeleton).not.toContain("showActions");

        for (const source of [readSource("../src/components/profile/PublicCollectionView.tsx"), readSource("../src/components/modal/CardSearchModal.tsx"), readSource("../src/components/profile/ProfileRouteLoading.tsx"), readSource("../src/components/profile/TrainerProfileView.tsx")]) {
            expect(source).toContain("CardGridSkeleton");
        }

        expect(binderSelector).not.toContain("CardGridSkeleton");
        expect(binderSelector).toContain('PokeballLoader message="Buscando suas cartas na coleção..."');
    });

    it("mantém a ação explícita de remoção no seletor do binder", () => {
        const selector = readSource("../src/components/modal/BinderSlotSelectModal.tsx");

        expect(selector).toContain('isCurrent ? "Remover do Binder" : "Exibir no Binder"');
        expect(selector).toContain('<span className="truncate whitespace-nowrap leading-none">Remover</span>');
        expect(selector).toContain("if (!isCurrent)");
        expect(selector).toContain("CardArtwork");
    });
});
