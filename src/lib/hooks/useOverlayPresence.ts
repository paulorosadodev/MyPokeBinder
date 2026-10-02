import { useEffect, useState } from "react";

const OVERLAY_ENTER_DURATION = 420;
const OVERLAY_EXIT_DURATION = 280;

type OverlayState = "opening" | "open" | "closing" | "closed";

export function useOverlayPresence(isOpen: boolean) {
    const [isPresent, setIsPresent] = useState(isOpen);
    const [state, setState] = useState<OverlayState>(isOpen ? "opening" : "closed");

    useEffect(() => {
        if (isOpen) {
            setIsPresent(true);
            setState("opening");
            const timer = window.setTimeout(() => setState("open"), OVERLAY_ENTER_DURATION);
            return () => window.clearTimeout(timer);
        }

        if (!isPresent) return;

        setState("closing");
        const timer = window.setTimeout(() => {
            setIsPresent(false);
            setState("closed");
        }, OVERLAY_EXIT_DURATION);
        return () => window.clearTimeout(timer);
    }, [isOpen, isPresent]);

    return { isPresent, state };
}
