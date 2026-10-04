import { describe, expect, it } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const fullscreenModalFiles = ["../src/components/modal/CardSearchModal.tsx", "../src/components/modal/BinderSlotSelectModal.tsx", "../src/components/modal/CardAllocateModal.tsx", "../src/components/profile/TrainerProfileView.tsx", "../src/app/cartas/[id]/CardDetailClient.tsx", "../src/app/configuracoes/SettingsClient.tsx", "../src/app/binders/[id]/edit/BinderEditClient.tsx"];

const dismissibleOverlayFiles = [
    "../src/components/modal/CardSearchModal.tsx",
    "../src/components/modal/BinderSlotSelectModal.tsx",
    "../src/components/modal/CardAllocateModal.tsx",
    "../src/components/binder/BinderStatisticsDrawer.tsx",
    "../src/components/binder/CoverPokemonSelector.tsx",
    "../src/components/profile/TrainerProfileView.tsx",
    "../src/app/cartas/[id]/CardDetailClient.tsx",
    "../src/app/configuracoes/SettingsClient.tsx",
    "../src/app/binders/[id]/edit/BinderEditClient.tsx",
    "../src/components/ui/CardLightbox.tsx",
];

const animatedOverlayFiles = [
    "../src/components/modal/CardSearchModal.tsx",
    "../src/components/modal/BinderSlotSelectModal.tsx",
    "../src/components/modal/CardAllocateModal.tsx",
    "../src/components/binder/BinderStatisticsDrawer.tsx",
    "../src/components/binder/CoverPokemonSelector.tsx",
    "../src/components/profile/TrainerProfileView.tsx",
    "../src/app/cartas/[id]/CardDetailClient.tsx",
    "../src/app/configuracoes/SettingsClient.tsx",
    "../src/app/binders/[id]/edit/BinderEditClient.tsx",
    "../src/components/ui/CardLightbox.tsx",
];

describe("Modais complexos no mobile", () => {
    it("reutiliza o seletor clássico nos compartimentos universais", () => {
        const source = readFileSync(join(import.meta.dir, "../src/components/modal/UniversalSlotModal.tsx"), "utf8");

        expect(source).toContain("BinderSlotSelectModal");
        expect(source).toContain("onlyUnallocatedCards");
        expect(source).toContain("matchesDexIdExactly");
    });

    it("ocupa toda a viewport e recupera o painel flutuante a partir do breakpoint sm", () => {
        fullscreenModalFiles.forEach((relativePath) => {
            const source = readFileSync(join(import.meta.dir, relativePath), "utf8");

            expect(source).toContain("h-dvh max-h-none w-full max-w-none");
            expect(source).toContain("rounded-none border-0");
            expect(source).toContain("sm:rounded-2xl sm:border");
        });
    });

    it("fecha pelo backdrop ou Escape em qualquer breakpoint", () => {
        dismissibleOverlayFiles.forEach((relativePath) => {
            const source = readFileSync(join(import.meta.dir, relativePath), "utf8");

            expect(source).toContain("useDismissibleOverlay");
            expect(source).not.toContain('window.matchMedia("(min-width: 640px)").matches');
        });
    });

    it("escuta Escape em um único hook reutilizável", () => {
        const hookSource = readFileSync(join(import.meta.dir, "../src/lib/hooks/useDismissibleOverlay.ts"), "utf8");

        expect(hookSource).toContain('event.key !== "Escape"');
        expect(hookSource).toContain('window.addEventListener("keydown", handleKeyDown)');
    });

    it("anima a abertura e preserva o painel durante o fechamento", () => {
        animatedOverlayFiles.forEach((relativePath) => {
            const source = readFileSync(join(import.meta.dir, relativePath), "utf8");

            expect(source).toContain("useOverlayPresence");
            expect(source).toContain("modal-backdrop");
            expect(source).toContain("data-overlay-state");
        });

        const hookSource = readFileSync(join(import.meta.dir, "../src/lib/hooks/useOverlayPresence.ts"), "utf8");
        const styles = readFileSync(join(import.meta.dir, "../src/app/globals.css"), "utf8");

        expect(hookSource).toContain("OVERLAY_ENTER_DURATION");
        expect(hookSource).toContain("OVERLAY_EXIT_DURATION");
        expect(hookSource).not.toContain("requestAnimationFrame");
        expect(hookSource).toContain('state: "closing"');
        expect(hookSource).toContain('state: "closed"');
        expect(styles).toContain("@keyframes modal-surface-enter");
        expect(styles).toContain("@keyframes modal-surface-exit");
    });

    it("mantém o backdrop estável e sem transição na troca entre modais encadeados", () => {
        const hookSource = readFileSync(join(import.meta.dir, "../src/lib/hooks/useOverlayPresence.ts"), "utf8");
        const styles = readFileSync(join(import.meta.dir, "../src/app/globals.css"), "utf8");

        expect(hookSource).toContain("hasOpenSibling = false");
        expect(hookSource).toContain("skipEnterAnimation = false");
        expect(hookSource).toContain("current.hasOpenSibling || skipEnterAnimation");
        expect(hookSource).toContain('state: entersWithoutAnimation ? "open" : "opening"');
        expect(hookSource).toContain("if (resolved !== presence) setPresence(resolved)");
        expect(styles).not.toContain("modal-surface-handoff");
        expect(styles).not.toContain("data-overlay-handoff");
    });

    it("abre sem animação nos modais encadeados e em todos os wrappers", () => {
        const chainedModalFiles = ["../src/components/modal/CardSearchModal.tsx", "../src/components/modal/BinderSlotSelectModal.tsx"];

        chainedModalFiles.forEach((relativePath) => {
            const source = readFileSync(join(import.meta.dir, relativePath), "utf8");

            expect(source).toContain("skipEnterAnimation");
            expect(source).toContain("useOverlayPresence(isOpen, { hasOpenSibling, skipEnterAnimation })");
            expect(source).not.toContain("data-overlay-handoff");
            expect(source).not.toContain("isHandoff");
        });

        const wrapperSource = readFileSync(join(import.meta.dir, "../src/components/modal/UniversalSlotModal.tsx"), "utf8");
        expect(wrapperSource).toContain("skipEnterAnimation");
        expect(wrapperSource).toContain("skipEnterAnimation={skipEnterAnimation}");
    });

    it("mantém o seletor já aberto ao voltar da página de detalhe da carta", () => {
        const legacyBinderSource = readFileSync(join(import.meta.dir, "../src/components/binder/BinderClientPage.tsx"), "utf8");
        const viewerSource = readFileSync(join(import.meta.dir, "../src/components/binder/UniversalBinderViewer.tsx"), "utf8");

        expect(legacyBinderSource).toContain("useState(shouldOpenSelectOnMount)");
        expect(legacyBinderSource).toContain("skipEnterAnimation={isRestoredSelectModal}");
        expect(legacyBinderSource).toContain("setIsRestoredSelectModal(false)");
        expect(viewerSource).toContain("setIsRestoredSlotModal(true)");
        expect(viewerSource).toContain("skipEnterAnimation={isRestoredSlotModal}");
    });

    it("mede os sliders sem herdar a escala visual do modal", () => {
        const sliderSource = readFileSync(join(import.meta.dir, "../src/components/ui/LanguageSlider.tsx"), "utf8");

        expect(sliderSource).toContain("activeItem.offsetLeft");
        expect(sliderSource).toContain("activeItem.offsetWidth");
        expect(sliderSource).not.toContain("getBoundingClientRect");
    });

    it("oculta os sliders assim que a animação de fechamento começa", () => {
        const modalSource = readFileSync(join(import.meta.dir, "../src/components/modal/CardSearchModal.tsx"), "utf8");
        const styles = readFileSync(join(import.meta.dir, "../src/app/globals.css"), "utf8");

        expect(modalSource).toContain("modal-transient-content");
        expect(styles).toContain('.modal-backdrop[data-overlay-state="closing"] .modal-transient-content');
        expect(styles).toContain("visibility: hidden");
    });

    it("abre as estatísticas do binder em tela cheia no mobile", () => {
        const source = readFileSync(join(import.meta.dir, "../src/components/binder/BinderStatisticsDrawer.tsx"), "utf8");

        expect(source).toContain("h-[100dvh] w-screen max-w-none");
        expect(source).toContain("md:w-full md:max-w-md");
        expect(source).toContain("md:border-l md:border-white/10");
    });

    it("fecha o lightbox pelo backdrop também no mobile", () => {
        const source = readFileSync(join(import.meta.dir, "../src/components/ui/CardLightbox.tsx"), "utf8");

        expect(source).toContain("if (e.target === e.currentTarget) onClose()");
        expect(source).toContain('onClick={onClose} aria-label="Fechar"');
    });
});
