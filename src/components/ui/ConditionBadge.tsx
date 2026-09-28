"use client";

import React from "react";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { CardCondition, getConditionBadgeStyle } from "@/lib/pokemon/condition";

interface ConditionBadgeProps {
    condition?: CardCondition | string | null;
    className?: string;
    size?: "xs" | "sm" | "md";
    variant?: "letters" | "both" | "icon";
}

export function ConditionBadge({ condition, className = "", size = "sm", variant = "letters" }: ConditionBadgeProps) {
    if (!condition) return null;
    const badge = getConditionBadgeStyle(condition);
    const Icon = badge.iconType === "alert" ? ShieldAlert : ShieldCheck;

    if (variant === "both") {
        const sizeClasses = size === "md" ? "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold" : "inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[9px] font-bold";
        const iconSize = size === "md" ? 13 : 11;

        return (
            <span title={badge.fullLabel} aria-label={badge.fullLabel} className={`${sizeClasses} ${badge.badgeClasses} ${className}`}>
                <Icon size={iconSize} className="shrink-0" />
                <span className="font-mono">{badge.label}</span>
            </span>
        );
    }

    if (variant === "icon") {
        const sizeClasses = size === "md" ? "h-7 w-7 rounded-lg" : size === "xs" ? "h-4 w-4 rounded" : "h-4.5 sm:h-5 w-4.5 sm:w-5 rounded";
        const iconSize = size === "md" ? 14 : size === "xs" ? 9 : 11;

        return (
            <span title={badge.fullLabel} aria-label={badge.fullLabel} className={`flex shrink-0 items-center justify-center border ${sizeClasses} ${badge.badgeClasses} ${className}`}>
                <Icon size={iconSize} className={size === "sm" ? "sm:h-3 sm:w-3" : ""} />
            </span>
        );
    }

    const sizeClasses = size === "md" ? "inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-bold" : size === "xs" ? "flex items-center rounded border px-1 font-mono text-[7px] font-bold shrink-0" : "flex h-4.5 sm:h-5 items-center rounded border px-1 font-mono text-[8px] font-bold sm:px-1.5 sm:text-[9px]";

    return (
        <span title={badge.fullLabel} aria-label={badge.fullLabel} className={`shrink-0 ${sizeClasses} ${badge.badgeClasses} ${className}`}>
            {badge.label}
        </span>
    );
}
