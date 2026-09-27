import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const complexModalFiles = ["../src/components/modal/CardSearchModal.tsx", "../src/components/modal/BinderSlotSelectModal.tsx", "../src/app/collection/page.tsx", "../src/components/profile/TrainerProfileView.tsx"];

describe("Modais complexos no mobile", () => {
    it("ocupa toda a viewport e recupera o painel flutuante a partir do breakpoint sm", () => {
        complexModalFiles.forEach((relativePath) => {
            const source = readFileSync(join(import.meta.dir, relativePath), "utf8");

            expect(source).toContain("h-dvh max-h-none w-full max-w-none");
            expect(source).toContain("rounded-none border-0");
            expect(source).toContain("sm:h-[85vh] sm:max-h-[820px]");
            expect(source).toContain("sm:rounded-2xl sm:border");
        });
    });

    it("ignora o clique no backdrop abaixo do breakpoint sm", () => {
        complexModalFiles.forEach((relativePath) => {
            const source = readFileSync(join(import.meta.dir, relativePath), "utf8");

            expect(source).toContain('e.target === e.currentTarget && window.matchMedia("(min-width: 640px)").matches');
        });
    });

    it("ignora a tecla Escape nos fluxos que oferecem esse atalho no desktop", () => {
        const binderModalSource = readFileSync(join(import.meta.dir, "../src/components/modal/BinderSlotSelectModal.tsx"), "utf8");

        expect(binderModalSource).toContain('e.key === "Escape" && !editingCardId && window.matchMedia("(min-width: 640px)").matches');
    });

    it("mantém os modais simples de confirmação compactos", () => {
        const settingsSource = readFileSync(join(import.meta.dir, "../src/app/configuracoes/page.tsx"), "utf8");
        const cardDetailsSource = readFileSync(join(import.meta.dir, "../src/app/cards/[id]/page.tsx"), "utf8");

        expect(settingsSource).not.toContain("h-dvh max-h-none");
        expect(cardDetailsSource).not.toContain("h-dvh max-h-none");
        expect(settingsSource).toContain("max-w-md");
        expect(cardDetailsSource).toContain("max-w-md");
    });

    it("fecha o lightbox no mobile somente pelo botão interno", () => {
        const source = readFileSync(join(import.meta.dir, "../src/components/ui/CardLightbox.tsx"), "utf8");
        const desktopCloseGuard = 'window.matchMedia("(min-width: 640px)").matches';

        expect(source.split(desktopCloseGuard)).toHaveLength(3);
        expect(source).toContain('onClick={onClose} aria-label="Fechar"');
    });
});
