import React from "react";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import type { SelectOption } from "@/components/ui/Select";
import type { LanguageSliderOption } from "@/components/ui/LanguageSlider";

export type CardCondition = "M" | "NM" | "SP" | "MP" | "HP" | "D";

export const CARD_CONDITIONS: CardCondition[] = ["M", "NM", "SP", "MP", "HP", "D"];

export const DEFAULT_CARD_CONDITION: CardCondition = "NM";

export function isCardCondition(value: unknown): value is CardCondition {
    return value === "M" || value === "NM" || value === "SP" || value === "MP" || value === "HP" || value === "D";
}

export function formatConditionLabel(condition?: CardCondition | string | null): string {
    switch (condition) {
        case "M":
            return "Mint (M)";
        case "NM":
            return "Near Mint (NM)";
        case "SP":
            return "Slightly Played (SP)";
        case "MP":
            return "Moderately Played (MP)";
        case "HP":
            return "Heavily Played (HP)";
        case "D":
            return "Damaged (D)";
        default:
            return "Near Mint (NM)";
    }
}

export function getConditionBadgeStyle(condition?: CardCondition | string | null): {
    code: CardCondition;
    label: string;
    fullLabel: string;
    badgeClasses: string;
    iconType: "check" | "alert";
} {
    const valid = isCardCondition(condition) ? condition : "NM";
    switch (valid) {
        case "M":
            return {
                code: "M",
                label: "M",
                fullLabel: "Mint",
                badgeClasses: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.15)]",
                iconType: "check",
            };
        case "NM":
            return {
                code: "NM",
                label: "NM",
                fullLabel: "Near Mint",
                badgeClasses: "border-lime-500/40 bg-lime-500/15 text-lime-300 shadow-[0_0_8px_rgba(132,204,22,0.15)]",
                iconType: "check",
            };
        case "SP":
            return {
                code: "SP",
                label: "SP",
                fullLabel: "Slightly Played",
                badgeClasses: "border-yellow-500/40 bg-yellow-500/15 text-yellow-300 shadow-[0_0_8px_rgba(234,179,8,0.15)]",
                iconType: "check",
            };
        case "MP":
            return {
                code: "MP",
                label: "MP",
                fullLabel: "Moderately Played",
                badgeClasses: "border-amber-500/40 bg-amber-500/15 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.15)]",
                iconType: "alert",
            };
        case "HP":
            return {
                code: "HP",
                label: "HP",
                fullLabel: "Heavily Played",
                badgeClasses: "border-orange-500/40 bg-orange-500/15 text-orange-300 shadow-[0_0_8px_rgba(249,115,22,0.15)]",
                iconType: "alert",
            };
        case "D":
            return {
                code: "D",
                label: "D",
                fullLabel: "Damaged",
                badgeClasses: "border-rose-500/40 bg-rose-500/15 text-rose-300 shadow-[0_0_8px_rgba(244,63,94,0.15)]",
                iconType: "alert",
            };
    }
}

export const CONDITION_SELECT_OPTIONS: SelectOption<CardCondition>[] = [
    {
        value: "M",
        label: "Mint (M)",
        icon: React.createElement(ShieldCheck, { size: 13, className: "text-emerald-300" }),
        triggerClassName: "border-emerald-500/40 bg-emerald-500/15 text-emerald-200 hover:border-emerald-500/60 hover:bg-emerald-500/20",
        className: "border-transparent text-slate-300 font-medium hover:border-emerald-500/40 hover:bg-emerald-500/15 hover:text-emerald-200",
        selectedClassName: "border-emerald-500/50 bg-emerald-500/25 font-bold text-emerald-200 shadow-[0_0_10px_rgba(16,185,129,0.2)]",
        checkClassName: "text-emerald-300",
    },
    {
        value: "NM",
        label: "Near Mint (NM)",
        icon: React.createElement(ShieldCheck, { size: 13, className: "text-lime-300" }),
        triggerClassName: "border-lime-500/40 bg-lime-500/15 text-lime-200 hover:border-lime-500/60 hover:bg-lime-500/20",
        className: "border-transparent text-slate-300 font-medium hover:border-lime-500/40 hover:bg-lime-500/15 hover:text-lime-200",
        selectedClassName: "border-lime-500/50 bg-lime-500/25 font-bold text-lime-200 shadow-[0_0_10px_rgba(132,204,22,0.2)]",
        checkClassName: "text-lime-300",
    },
    {
        value: "SP",
        label: "Slightly Played (SP)",
        icon: React.createElement(ShieldCheck, { size: 13, className: "text-yellow-300" }),
        triggerClassName: "border-yellow-500/40 bg-yellow-500/15 text-yellow-200 hover:border-yellow-500/60 hover:bg-yellow-500/20",
        className: "border-transparent text-slate-300 font-medium hover:border-yellow-500/40 hover:bg-yellow-500/15 hover:text-yellow-200",
        selectedClassName: "border-yellow-500/50 bg-yellow-500/25 font-bold text-yellow-200 shadow-[0_0_10px_rgba(234,179,8,0.2)]",
        checkClassName: "text-yellow-300",
    },
    {
        value: "MP",
        label: "Moderately Played (MP)",
        icon: React.createElement(ShieldAlert, { size: 13, className: "text-amber-300" }),
        triggerClassName: "border-amber-500/40 bg-amber-500/15 text-amber-200 hover:border-amber-500/60 hover:bg-amber-500/20",
        className: "border-transparent text-slate-300 font-medium hover:border-amber-500/40 hover:bg-amber-500/15 hover:text-amber-200",
        selectedClassName: "border-amber-500/50 bg-amber-500/25 font-bold text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.2)]",
        checkClassName: "text-amber-300",
    },
    {
        value: "HP",
        label: "Heavily Played (HP)",
        icon: React.createElement(ShieldAlert, { size: 13, className: "text-orange-300" }),
        triggerClassName: "border-orange-500/40 bg-orange-500/15 text-orange-200 hover:border-orange-500/60 hover:bg-orange-500/20",
        className: "border-transparent text-slate-300 font-medium hover:border-orange-500/40 hover:bg-orange-500/15 hover:text-orange-200",
        selectedClassName: "border-orange-500/50 bg-orange-500/25 font-bold text-orange-200 shadow-[0_0_10px_rgba(249,115,22,0.2)]",
        checkClassName: "text-orange-300",
    },
    {
        value: "D",
        label: "Damaged (D)",
        icon: React.createElement(ShieldAlert, { size: 13, className: "text-rose-300" }),
        triggerClassName: "border-rose-500/40 bg-rose-500/15 text-rose-200 hover:border-rose-500/60 hover:bg-rose-500/20",
        className: "border-transparent text-slate-300 font-medium hover:border-rose-500/40 hover:bg-rose-500/15 hover:text-rose-200",
        selectedClassName: "border-rose-500/50 bg-rose-500/25 font-bold text-rose-200 shadow-[0_0_10px_rgba(244,63,94,0.2)]",
        checkClassName: "text-rose-300",
    },
];

export const CONDITION_SLIDER_OPTIONS: LanguageSliderOption<CardCondition>[] = [
    {
        value: "M",
        label: "M",
        title: "Mint",
        icon: React.createElement(ShieldCheck, { size: 11, strokeWidth: 2.25 }),
        indicatorClassName: "border-emerald-400/60 bg-emerald-500/25 shadow-[0_0_12px_rgba(16,185,129,0.3)]",
        activeClassName: "text-emerald-200 font-bold",
        activeIconClassName: "text-emerald-300",
        inactiveIconClassName: "text-emerald-400/70",
    },
    {
        value: "NM",
        label: "NM",
        title: "Near Mint",
        icon: React.createElement(ShieldCheck, { size: 11, strokeWidth: 2.25 }),
        indicatorClassName: "border-lime-400/60 bg-lime-500/25 shadow-[0_0_12px_rgba(132,204,22,0.3)]",
        activeClassName: "text-lime-200 font-bold",
        activeIconClassName: "text-lime-300",
        inactiveIconClassName: "text-lime-400/70",
    },
    {
        value: "SP",
        label: "SP",
        title: "Slightly Played",
        icon: React.createElement(ShieldCheck, { size: 11, strokeWidth: 2.25 }),
        indicatorClassName: "border-yellow-400/60 bg-yellow-500/25 shadow-[0_0_12px_rgba(234,179,8,0.3)]",
        activeClassName: "text-yellow-200 font-bold",
        activeIconClassName: "text-yellow-300",
        inactiveIconClassName: "text-yellow-400/70",
    },
    {
        value: "MP",
        label: "MP",
        title: "Moderately Played",
        icon: React.createElement(ShieldAlert, { size: 11, strokeWidth: 2.25 }),
        indicatorClassName: "border-amber-400/60 bg-amber-500/25 shadow-[0_0_12px_rgba(245,158,11,0.3)]",
        activeClassName: "text-amber-200 font-bold",
        activeIconClassName: "text-amber-300",
        inactiveIconClassName: "text-amber-400/70",
    },
    {
        value: "HP",
        label: "HP",
        title: "Heavily Played",
        icon: React.createElement(ShieldAlert, { size: 11, strokeWidth: 2.25 }),
        indicatorClassName: "border-orange-400/60 bg-orange-500/25 shadow-[0_0_12px_rgba(249,115,22,0.3)]",
        activeClassName: "text-orange-200 font-bold",
        activeIconClassName: "text-orange-300",
        inactiveIconClassName: "text-orange-400/70",
    },
    {
        value: "D",
        label: "D",
        title: "Damaged",
        icon: React.createElement(ShieldAlert, { size: 11, strokeWidth: 2.25 }),
        indicatorClassName: "border-rose-400/60 bg-rose-500/25 shadow-[0_0_12px_rgba(244,63,94,0.3)]",
        activeClassName: "text-rose-200 font-bold",
        activeIconClassName: "text-rose-300",
        inactiveIconClassName: "text-rose-400/70",
    },
];
