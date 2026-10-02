import { useEffect } from "react";

export function useDismissibleOverlay(isOpen: boolean, onDismiss: () => void, isDismissDisabled = false) {
    useEffect(() => {
        if (!isOpen || isDismissDisabled) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            event.preventDefault();
            onDismiss();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onDismiss, isDismissDisabled]);
}
