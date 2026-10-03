import { useEffect, useState } from "react";

const OVERLAY_ENTER_DURATION = 420;
const OVERLAY_EXIT_DURATION = 280;

type OverlayState = "opening" | "open" | "closing" | "closed";

type OverlayPresenceOptions = {
    hasOpenSibling?: boolean;
    skipEnterAnimation?: boolean;
};

type OverlayPresence = {
    isOpen: boolean;
    hasOpenSibling: boolean;
    skipEnterAnimation: boolean;
    hasEntered: boolean;
    isPresent: boolean;
    state: OverlayState;
};

function createPresence(): OverlayPresence {
    return { isOpen: false, hasOpenSibling: false, skipEnterAnimation: false, hasEntered: false, isPresent: false, state: "closed" };
}

function resolvePresence(current: OverlayPresence, isOpen: boolean, hasOpenSibling: boolean, skipEnterAnimation: boolean): OverlayPresence {
    if (isOpen === current.isOpen && hasOpenSibling === current.hasOpenSibling && skipEnterAnimation === current.skipEnterAnimation) return current;

    if (isOpen) {
        if (current.isOpen) return { ...current, hasOpenSibling, skipEnterAnimation };
        const entersWithoutAnimation = current.hasOpenSibling || skipEnterAnimation;
        return { isOpen: true, hasOpenSibling, skipEnterAnimation, hasEntered: true, isPresent: true, state: entersWithoutAnimation ? "open" : "opening" };
    }

    if (hasOpenSibling || !current.hasEntered || current.state === "closed") {
        return { ...current, isOpen: false, hasOpenSibling, skipEnterAnimation, isPresent: false, state: "closed" };
    }

    if (current.state === "closing") return { ...current, isOpen: false, hasOpenSibling, skipEnterAnimation };

    return { ...current, isOpen: false, hasOpenSibling, skipEnterAnimation, state: "closing" };
}

export function useOverlayPresence(isOpen: boolean, options: OverlayPresenceOptions = {}) {
    const { hasOpenSibling = false, skipEnterAnimation = false } = options;
    const [presence, setPresence] = useState<OverlayPresence>(() => resolvePresence(createPresence(), isOpen, hasOpenSibling, skipEnterAnimation));

    const resolved = resolvePresence(presence, isOpen, hasOpenSibling, skipEnterAnimation);
    if (resolved !== presence) setPresence(resolved);

    useEffect(() => {
        if (resolved.state !== "opening") return;
        const timer = window.setTimeout(() => setPresence((current) => (current.state === "opening" ? { ...current, state: "open" } : current)), OVERLAY_ENTER_DURATION);
        return () => window.clearTimeout(timer);
    }, [resolved.state]);

    useEffect(() => {
        if (resolved.state !== "closing") return;
        const timer = window.setTimeout(() => setPresence((current) => (current.state === "closing" ? { ...current, isPresent: false, state: "closed" } : current)), OVERLAY_EXIT_DURATION);
        return () => window.clearTimeout(timer);
    }, [resolved.state]);

    return { isPresent: resolved.isPresent, state: resolved.state };
}
