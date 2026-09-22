"use client";

import { Toaster } from "sonner";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

export function AppToaster() {
    return (
        <Toaster
            position="top-right"
            theme="dark"
            duration={3500}
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
