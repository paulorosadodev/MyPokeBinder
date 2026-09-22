const DEFAULT_STEP_MS = 40;
const DEFAULT_MAX_DELAY_MS = 480;

/** Staggered fade/slide-in props for card tiles in listing grids. */
export function getCardAppearProps(index: number, options?: { stepMs?: number; maxDelayMs?: number }) {
    const stepMs = options?.stepMs ?? DEFAULT_STEP_MS;
    const maxDelayMs = options?.maxDelayMs ?? DEFAULT_MAX_DELAY_MS;

    return {
        className: "card-list-appear",
        style: {
            animationDelay: `${Math.min(index * stepMs, maxDelayMs)}ms`,
        },
    } as const;
}
