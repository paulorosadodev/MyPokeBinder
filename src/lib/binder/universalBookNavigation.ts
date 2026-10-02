export function getUniversalPhysicalForPage(page: number, totalPages: number, isMobile: boolean) {
    const firstCatalogPhysical = 2;
    const trailingBlankPhysical = firstCatalogPhysical + totalPages;
    const insideBackPhysical = trailingBlankPhysical + (totalPages % 2 === 0 ? 0 : 1);
    const backCoverPhysical = insideBackPhysical + 1;
    const lastSpreadPage = totalPages + 1;
    const closedBackPage = totalPages + 2;
    const displayPage = Math.trunc(page) || 0;

    if (displayPage <= 0) return 0;
    if (displayPage >= closedBackPage) return backCoverPhysical;
    if (displayPage === lastSpreadPage) return trailingBlankPhysical;

    const catalog = Math.min(totalPages, Math.max(1, displayPage));
    const physical = firstCatalogPhysical + catalog - 1;
    if (isMobile || catalog === 1) return physical;
    return physical % 2 === 0 ? physical - 1 : physical;
}

export function getUniversalPageForPhysical(physical: number, totalPages: number, isMobile: boolean) {
    const firstCatalogPhysical = 2;
    const trailingBlankPhysical = firstCatalogPhysical + totalPages;
    const insideBackPhysical = trailingBlankPhysical + (totalPages % 2 === 0 ? 0 : 1);
    const backCoverPhysical = insideBackPhysical + 1;
    const lastSpreadPage = totalPages + 1;
    const closedBackPage = totalPages + 2;

    if (physical <= 0) return 0;
    if (physical >= backCoverPhysical) return closedBackPage;
    if (isMobile) {
        if (physical === 1) return 1;
        if (physical >= trailingBlankPhysical) return lastSpreadPage;
        return Math.min(totalPages, Math.max(1, physical - firstCatalogPhysical + 1));
    }

    const spreadLeftPhysical = physical % 2 === 0 ? physical - 1 : physical;
    if (spreadLeftPhysical === 1) return 1;
    if (spreadLeftPhysical >= trailingBlankPhysical) return lastSpreadPage;
    return Math.min(totalPages, Math.max(1, spreadLeftPhysical - 1));
}

export function getUniversalSpreadLeftIndex(physical: number, totalPages: number): number {
    if (physical <= 0) return 0;
    const backCoverPhysical = 2 + totalPages + (totalPages % 2 === 0 ? 0 : 1) + 1;
    if (physical >= backCoverPhysical) return backCoverPhysical;
    return physical % 2 === 1 ? physical : physical - 1;
}

export function isUniversalAlreadyOnTarget(currentPhysical: number, targetPhysical: number, totalPages: number): boolean {
    return getUniversalSpreadLeftIndex(currentPhysical, totalPages) === getUniversalSpreadLeftIndex(targetPhysical, totalPages);
}

export type UniversalPageNavigationPlan = { mode: "direct"; targetPhysical: number } | { mode: "sequence"; targetPhysical: number; intermediatePhysicalTargets: number[] };

export function planUniversalPageNavigation(currentPhysical: number, targetPhysical: number, totalPages: number): UniversalPageNavigationPlan {
    const currentSpread = getUniversalSpreadLeftIndex(currentPhysical, totalPages);
    const targetSpread = getUniversalSpreadLeftIndex(targetPhysical, totalPages);
    const spreadDelta = (targetSpread - currentSpread) / 2;
    const distance = Math.abs(spreadDelta);
    const intermediateSteps = distance >= 4 ? 2 : distance >= 2 ? 1 : 0;

    if (intermediateSteps === 0) {
        return { mode: "direct", targetPhysical };
    }

    const physicalStep = targetPhysical > currentPhysical ? 2 : -2;
    const intermediatePhysicalTargets = Array.from({ length: intermediateSteps }, (_, index) => currentPhysical + physicalStep * (index + 1));

    return {
        mode: "sequence",
        targetPhysical,
        intermediatePhysicalTargets,
    };
}
