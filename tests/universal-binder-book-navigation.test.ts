import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getUniversalPageForPhysical, getUniversalPhysicalForPage } from "@/lib/binder/universalBookNavigation";

test("preserva as capas e os forros como estados navegáveis no desktop", () => {
    expect(getUniversalPageForPhysical(0, 17, false)).toBe(0);
    expect(getUniversalPageForPhysical(21, 17, false)).toBe(19);
    expect(getUniversalPhysicalForPage(0, 17, false)).toBe(0);
    expect(getUniversalPhysicalForPage(19, 17, false)).toBe(21);
});

test("mapeia a página 16 para sua folha física de desktop", () => {
    expect(getUniversalPhysicalForPage(16, 17, false)).toBe(17);
});

test("mantém a entrada do binder e as superfícies físicas da capa e do forro", () => {
    const source = readFileSync(join(import.meta.dir, "../src/components/binder/UniversalBinderBook.tsx"), "utf8");

    expect(source).toContain('engineReady ? "binder-stage-entrance" : "invisible"');
    expect(source).toContain('className="pointer-events-none absolute inset-0 flex items-center justify-center"');
    expect(source).toContain('size={260} className="h-[52%] w-[52%] max-h-[260px] max-w-[260px] opacity-[0.09]"');
    expect(source).toContain('style={{ filter: "none" }}');
    expect(source).not.toContain("Fim do binder");
    expect(source).toContain('key="trailing-slots"');
    expect(source).not.toContain("empty-slot-");
});

test("planeja navegação direta para páginas adjacentes ou mesmo spread", () => {
    const { isUniversalAlreadyOnTarget, planUniversalPageNavigation } = require("@/lib/binder/universalBookNavigation");
    expect(isUniversalAlreadyOnTarget(2, 3, 17)).toBe(false);
    expect(isUniversalAlreadyOnTarget(3, 4, 17)).toBe(true);

    const directPlan = planUniversalPageNavigation(2, 3, 17);
    expect(directPlan.mode).toBe("direct");
    expect(directPlan.targetPhysical).toBe(3);
});

test("planeja sequência de multi-flip com passos intermediários para saltos distantes no desktop", () => {
    const { planUniversalPageNavigation } = require("@/lib/binder/universalBookNavigation");
    const sequencePlan = planUniversalPageNavigation(2, 13, 17);
    expect(sequencePlan.mode).toBe("sequence");
    expect(sequencePlan.targetPhysical).toBe(13);
    expect(sequencePlan.intermediatePhysicalTargets.length).toBeGreaterThanOrEqual(1);
    expect(sequencePlan.intermediatePhysicalTargets[0]).toBe(4);
});

test("garante que o botão de criar binder na estante não possui scale no hover", () => {
    const shelfSource = readFileSync(join(import.meta.dir, "../src/components/shelf/BinderShelf.tsx"), "utf8");
    const createBinderCardBlock = shelfSource.slice(shelfSource.lastIndexOf('href="/binders/new"'));
    expect(createBinderCardBlock).not.toContain("group-hover:scale-110");
    expect(createBinderCardBlock).not.toContain("hover:scale");
});

test("abre visualmente a primeira página do binder no hover de desktop da estante", () => {
    const shelfSource = readFileSync(join(import.meta.dir, "../src/components/shelf/BinderShelf.tsx"), "utf8");
    const shelfBookSource = readFileSync(join(import.meta.dir, "../src/components/shelf/BinderShelfBook.tsx"), "utf8");
    const stylesSource = readFileSync(join(import.meta.dir, "../src/app/globals.css"), "utf8");

    expect(shelfSource).toContain("<BinderShelfBook");
    expect(shelfSource).toContain("binder-shelf-card");
    expect(shelfBookSource).toContain('from "react-pageflip"');
    expect(shelfBookSource).toContain("flip.flipNext()");
    expect(shelfBookSource).toContain("flip.flipPrev()");
    expect(shelfBookSource).toContain("flippingTime={BINDER_FLIP_MS}");
    expect(shelfBookSource).toContain("binder-shelf-engine");
    expect(shelfBookSource).toContain("Página 1");
    expect(stylesSource).toContain(".binder-shelf-card:is(:hover, :focus-within)");
    expect(stylesSource).toContain("z-index: 60");
    expect(stylesSource).toContain(".binder-shelf-card:is(:hover, :focus-within) .binder-shelf-stage");
    expect(stylesSource).toContain(':has(.binder-shelf-stage[data-shelf-state="flipping"])');
    expect(stylesSource).toContain(':not([data-shelf-page="0"])');
    expect(stylesSource).toContain("transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1)");
    expect(stylesSource).toContain("transform: scale(1.06)");
    expect(stylesSource).not.toContain("translateY(-28px)");
    expect(stylesSource).toContain(".binder-shelf-flipbook-root .stf__wrapper");
    expect(stylesSource).toContain("height: 372px !important");
    expect(stylesSource).toContain("padding-bottom: 0 !important");
    expect(stylesSource).not.toContain("scale(0.68)");
});

test("renderiza a última face como página real de slots livres persistidos", () => {
    const source = readFileSync(join(import.meta.dir, "../src/components/binder/UniversalBinderBook.tsx"), "utf8");

    expect(source).not.toContain("const BlankPage");
    expect(source).toContain("getBinderTrailingSlotPage");
    expect(source).toContain('<CatalogPage key="trailing-slots"');
});

test("encaminha a navegação rápida móvel para a página solicitada sem depender do motor desktop", () => {
    const source = readFileSync(join(import.meta.dir, "../src/components/binder/UniversalBinderBook.tsx"), "utf8");
    const turnToPageSource = source.slice(source.indexOf("const turnToPage"), source.indexOf("const flipNext"));

    expect(turnToPageSource).toContain("if (isMobile)");
    expect(turnToPageSource).toContain("onPageChange(clampPage(page, slotPageCount))");
});

test("restaura a busca do binder no visualizador universal", () => {
    const source = readFileSync(join(import.meta.dir, "../src/components/binder/UniversalBinderViewer.tsx"), "utf8");

    expect(source).toContain('import { BinderControls } from "./BinderControls"');
    expect(source).toContain("<BinderControls onSearch={handleSearchPokemon} />");
});

test("antecipa no seletor inferior as duas páginas do spread desktop", () => {
    const source = readFileSync(join(import.meta.dir, "../src/components/binder/UniversalBinderViewer.tsx"), "utf8");

    expect(source).toContain("const hoveredDesktopSpreadPages = useMemo");
    expect(source).toContain("getUniversalPhysicalForPage(hoveredPage, binder.total_pages, false)");
    expect(source).toContain("getUniversalPageForPhysical(targetPhysicalPage, binder.total_pages, false)");
    expect(source).toContain("new Set([firstPageInSpread, firstPageInSpread + 1])");
    expect(source).toContain("onMouseEnter={() => setHoveredPage(page)}");
});

test("não escala os círculos de inserir carta no hover", () => {
    const source = readFileSync(join(import.meta.dir, "../src/components/binder/UniversalBinderSlot.tsx"), "utf8");

    expect(source).not.toContain("group-hover:scale-110");
});

test("aguarda o fim do folheamento antes do destaque vindo da busca ou estatísticas", () => {
    const source = readFileSync(join(import.meta.dir, "../src/components/binder/UniversalBinderViewer.tsx"), "utf8");

    expect(source).toContain("requestSlotHighlight(pageNumber, slotId)");
    expect(source).toContain("bookRef.current?.isBusy()");
    expect(source).toContain("isBinderSlotPainted(element)");
});
