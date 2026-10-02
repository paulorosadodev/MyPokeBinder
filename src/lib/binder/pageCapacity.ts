export function getBinderSlotPageCount(totalPages: number): number {
    const normalized = Math.max(1, Math.trunc(totalPages) || 1);
    return normalized + (normalized % 2);
}

export function getBinderTrailingSlotPage(totalPages: number): number | null {
    const normalized = Math.max(1, Math.trunc(totalPages) || 1);
    return normalized % 2 === 1 ? normalized + 1 : null;
}
