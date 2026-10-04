"use client";

import { useSyncExternalStore } from "react";
import { Toaster } from "sonner";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

function subscribe(callback: () => void) {
    const mql = window.matchMedia("(max-width: 640px)");
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
    return window.matchMedia("(max-width: 640px)").matches;
}

function getServerSnapshot() {
    return false;
}

export function AppToaster() {
    const isMobile = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    return (
        <Toaster
            position={isMobile ? "bottom-center" : "top-right"}
            theme="dark"
            duration={3500}
            closeButton
            mobileOffset={{
                bottom: "calc(env(safe-area-inset-bottom, 0px) + 76px)",
                left: "16px",
                right: "16px",
            }}
            icons={{
                success: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
                error: <AlertCircle className="h-4 w-4 text-red-400" />,
                info: <Info className="h-4 w-4 text-poke-blue" />,
            }}
            toastOptions={{
                className: "mypokebinder-toast",
            }}
        />
    );
}
