import React from "react";
import { Loader2 } from "lucide-react";

export interface SpinnerProps {
    size?: number;
    className?: string;
    ariaLabel?: string;
}

export function Spinner({ size = 16, className = "", ariaLabel = "Carregando" }: SpinnerProps) {
    return <Loader2 size={size} role="status" aria-label={ariaLabel} className={`animate-spin text-poke-blue ${className}`} />;
}
