import React from "react";
import { CardLanguage } from "@/types/binder";

interface FlagIconProps {
    country: CardLanguage;
    className?: string;
}

export function FlagIcon({ country, className = "" }: FlagIconProps) {
    if (country === "pt-br") {
        return (
            <svg viewBox="0 0 20 14" width="18" height="13" className={`overflow-hidden rounded-xs shadow-xs ${className}`}>
                <rect width="20" height="14" fill="#009c3b" />
                <polygon points="10,2 18,7 10,12 2,7" fill="#ffdf00" />
                <circle cx="10" cy="7" r="3.2" fill="#002776" />
                <path d="M7.2 7.2 Q10 6 12.8 7.6" stroke="#ffffff" strokeWidth="0.7" fill="none" />
            </svg>
        );
    }

    if (country === "en") {
        return (
            <svg viewBox="0 0 20 14" width="18" height="13" className={`overflow-hidden rounded-xs shadow-xs ${className}`}>
                <rect width="20" height="14" fill="#b22234" />
                <rect y="1.08" width="20" height="1.08" fill="#ffffff" />
                <rect y="3.24" width="20" height="1.08" fill="#ffffff" />
                <rect y="5.4" width="20" height="1.08" fill="#ffffff" />
                <rect y="7.56" width="20" height="1.08" fill="#ffffff" />
                <rect y="9.72" width="20" height="1.08" fill="#ffffff" />
                <rect y="11.88" width="20" height="1.08" fill="#ffffff" />
                <rect width="9" height="7.56" fill="#3c3b6e" />
                <circle cx="2" cy="2" r="0.65" fill="#ffffff" />
                <circle cx="4.5" cy="2" r="0.65" fill="#ffffff" />
                <circle cx="7" cy="2" r="0.65" fill="#ffffff" />
                <circle cx="3.25" cy="3.78" r="0.65" fill="#ffffff" />
                <circle cx="5.75" cy="3.78" r="0.65" fill="#ffffff" />
                <circle cx="2" cy="5.56" r="0.65" fill="#ffffff" />
                <circle cx="4.5" cy="5.56" r="0.65" fill="#ffffff" />
                <circle cx="7" cy="5.56" r="0.65" fill="#ffffff" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 20 14" width="18" height="13" className={`overflow-hidden rounded-xs shadow-xs border border-white/20 ${className}`}>
            <rect width="20" height="14" fill="#ffffff" />
            <circle cx="10" cy="7" r="4.2" fill="#bc002d" />
        </svg>
    );
}
