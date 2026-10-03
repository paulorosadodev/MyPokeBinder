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

test("revela visualmente uma prévia da primeira página do binder no hover de desktop da estante", () => {
    const shelfSource = readFileSync(join(import.meta.dir, "../src/components/shelf/BinderShelf.tsx"), "utf8");
    const shelfBookSource = readFileSync(join(import.meta.dir, "../src/components/shelf/BinderShelfBook.tsx"), "utf8");
    const stylesSource = readFileSync(join(import.meta.dir, "../src/app/globals.css"), "utf8");

    expect(shelfSource).toContain("<BinderShelfBook");
    expect(shelfSource).toContain("binder-shelf-card");
    expect(shelfSource).toContain("from=shelf");
    expect(shelfSource).toContain("<Settings size={14}");
    expect(shelfBookSource).toContain("binder-shelf-cover");
    expect(shelfBookSource).toContain("Página 1");
    expect(shelfBookSource).not.toContain("flip.flipNext()");
    expect(stylesSource).toContain(".binder-shelf-cover--peek");
    expect(stylesSource).not.toContain(".binder-shelf-card:is(:hover, :focus-within) .binder-shelf-cover");
    expect(stylesSource).toContain("rotateY(-32deg)");
    expect(stylesSource).not.toContain("transform: scale(1.06)");
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

test("não renderiza o seletor inferior de navegação rápida de páginas", () => {
    const source = readFileSync(join(import.meta.dir, "../src/components/binder/UniversalBinderViewer.tsx"), "utf8");

    expect(source).not.toContain("Navegação rápida de páginas");
    expect(source).not.toContain("hoveredDesktopSpreadPages");
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

test("alinha o ícone de visibilidade diretamente ao nome e remove rótulo público/privado", () => {
    const shelfSource = readFileSync(join(import.meta.dir, "../src/components/shelf/BinderShelf.tsx"), "utf8");

    expect(shelfSource).not.toContain("<span>Público</span>");
    expect(shelfSource).not.toContain("<span>Privado</span>");
    expect(shelfSource).toContain("<Globe size={14}");
    expect(shelfSource).toContain("<Lock size={13}");
});

test("retorna para a estante após salvar a edição quando acessado pelo botão de ajustes da estante", () => {
    const shelfSource = readFileSync(join(import.meta.dir, "../src/components/shelf/BinderShelf.tsx"), "utf8");
    const editSource = readFileSync(join(import.meta.dir, "../src/app/binders/[id]/edit/BinderEditClient.tsx"), "utf8");

    expect(shelfSource).toContain("/edit?from=shelf");
    expect(editSource).toContain('searchParams?.get("from") === "shelf"');
    expect(editSource).toContain('router.push(isFromShelf ? "/" : `/binders/${binder.id}?opened=1`)');
    expect(editSource).toContain('isFromShelf ? "Voltar para a Estante" : "Voltar ao Binder"');
});

test("utiliza o mesmo ícone Settings na estante e na página do binder", () => {
    const shelfSource = readFileSync(join(import.meta.dir, "../src/components/shelf/BinderShelf.tsx"), "utf8");
    const viewerSource = readFileSync(join(import.meta.dir, "../src/components/binder/UniversalBinderViewer.tsx"), "utf8");

    expect(shelfSource).not.toContain("Settings2");
    expect(shelfSource).toContain("<Settings size={14}");
    expect(viewerSource).toContain("<Settings size={15}");
});
