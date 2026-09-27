import { BINDER_LAST_SPREAD_PAGE, SLOTS_PER_PAGE, TOTAL_PAGES, getDesktopSpreadPages, getPokemonSilhouetteUrl } from "@/lib/pokemon/constants";
import { formatTcgdexImageUrl } from "@/lib/pokemon/tcgdex";

export function getActiveCatalogPages(currentPage: number, isMobile: boolean): number[] {
    if (currentPage === 0 || currentPage >= BINDER_LAST_SPREAD_PAGE) {
        return [];
    }
    if (isMobile) {
        if (currentPage < 1 || currentPage > TOTAL_PAGES) {
            return [];
        }
        return [currentPage];
    }
    const [left, right] = getDesktopSpreadPages(currentPage);
    return right ? [left, right] : [left];
}

export function getAdjacentCatalogPages(currentPage: number, isMobile: boolean): number[] {
    if (currentPage === 0) {
        return isMobile ? [1] : [1, 2].filter((p) => p <= TOTAL_PAGES);
    }

    if (currentPage >= BINDER_LAST_SPREAD_PAGE) {
        if (isMobile) {
            return [TOTAL_PAGES];
        }
        const [left, right] = getDesktopSpreadPages(TOTAL_PAGES);
        return right ? [left, right] : [left];
    }

    if (isMobile) {
        const adjacent: number[] = [];
        if (currentPage > 1) adjacent.push(currentPage - 1);
        if (currentPage < TOTAL_PAGES) adjacent.push(currentPage + 1);
        return adjacent;
    }

    const adjacent: number[] = [];
    const [left, right] = getDesktopSpreadPages(currentPage);
    const firstPage = left;
    const lastPage = right ?? left;
    if (firstPage > 1) {
        const [prevLeft, prevRight] = getDesktopSpreadPages(firstPage - 1);
        adjacent.push(prevLeft);
        if (prevRight) adjacent.push(prevRight);
    }
    if (lastPage < TOTAL_PAGES) {
        const [nextLeft, nextRight] = getDesktopSpreadPages(lastPage + 1);
        adjacent.push(nextLeft);
        if (nextRight) adjacent.push(nextRight);
    }
    return adjacent;
}

export function getBinderImagePages(options: { currentPage: number; isMobile: boolean; jumpTargetPage?: number | null }): number[] {
    const pages = new Set<number>();
    for (const page of getActiveCatalogPages(options.currentPage, options.isMobile)) {
        pages.add(page);
    }
    for (const page of getAdjacentCatalogPages(options.currentPage, options.isMobile)) {
        pages.add(page);
    }
    if (options.jumpTargetPage != null) {
        for (const page of getActiveCatalogPages(options.jumpTargetPage, options.isMobile)) {
            pages.add(page);
        }
        for (const page of getAdjacentCatalogPages(options.jumpTargetPage, options.isMobile)) {
            pages.add(page);
        }
        const lo = Math.max(1, Math.min(options.currentPage, options.jumpTargetPage));
        const hi = Math.min(TOTAL_PAGES, Math.max(options.currentPage, options.jumpTargetPage));
        for (let p = lo; p <= hi; p++) {
            pages.add(p);
        }
    }
    return [...pages].toSorted((a, b) => a - b);
}

export function retainBinderImagePages(retainedPages: number[], requestedPages: readonly number[]): number[] {
    const pages = new Set(retainedPages);
    let changed = false;

    for (const page of requestedPages) {
        if (pages.has(page)) continue;
        pages.add(page);
        changed = true;
    }

    return changed ? [...pages].toSorted((a, b) => a - b) : retainedPages;
}

export function collectBinderPageImageUrls(pages: readonly number[], cardsMap: Map<number, { card_image_url: string }>): string[] {
    const urls: string[] = [];
    for (const pageNum of pages) {
        const startSlot = (pageNum - 1) * SLOTS_PER_PAGE + 1;
        for (let i = 0; i < SLOTS_PER_PAGE; i++) {
            const dex = startSlot + i;
            if (dex > 151) continue;
            const card = cardsMap.get(dex);
            urls.push(card ? formatTcgdexImageUrl(card.card_image_url) : getPokemonSilhouetteUrl(dex));
        }
    }
    return urls;
}
