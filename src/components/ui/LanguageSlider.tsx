"use client";

import React, { useEffect, useLayoutEffect, useId, useRef, useState } from "react";
import { CardLanguage } from "@/types/binder";
import { FlagIcon } from "@/components/ui/FlagIcon";
import { Loader2 } from "lucide-react";

export interface LanguageSliderOption<T extends string = string> {
    value: T;
    label: string;
    shortLabel?: string;
    country?: CardLanguage;
}

const DEFAULT_OPTIONS: LanguageSliderOption<CardLanguage>[] = [
    { value: "pt-br", label: "PT-BR", shortLabel: "PT", country: "pt-br" },
    { value: "en", label: "EN", shortLabel: "EN", country: "en" },
    { value: "ja", label: "JA", shortLabel: "JA", country: "ja" },
];

interface LanguageSliderProps<T extends string = CardLanguage> {
    value: T;
    onChange: (value: T) => void;
    options?: LanguageSliderOption<T>[];
    size?: "sm" | "md";
    fullWidth?: boolean;
    disabled?: boolean;
    loadingValue?: T | null;
    ariaLabel?: string;
    className?: string;
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function LanguageSlider<T extends string = CardLanguage>({ value, onChange, options = DEFAULT_OPTIONS as unknown as LanguageSliderOption<T>[], size = "sm", fullWidth = false, disabled = false, loadingValue = null, ariaLabel = "Seletor de idioma da carta", className = "" }: LanguageSliderProps<T>) {
    const id = useId();
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; ready: boolean }>({
        left: 0,
        width: 0,
        ready: false,
    });

    const activeIndex = Math.max(
        0,
        options.findIndex((opt) => opt.value === value),
    );

    const updateIndicator = () => {
        const container = containerRef.current;
        const activeItem = itemRefs.current[activeIndex];

        if (container && activeItem) {
            const containerRect = container.getBoundingClientRect();
            const itemRect = activeItem.getBoundingClientRect();

            setIndicatorStyle({
                left: itemRect.left - containerRect.left,
                width: itemRect.width,
                ready: true,
            });
        }
    };

    useIsomorphicLayoutEffect(() => {
        updateIndicator();
    }, [value, activeIndex, options.length]);

    useEffect(() => {
        const handleResize = () => {
            updateIndicator();
        };

        window.addEventListener("resize", handleResize);

        const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => updateIndicator()) : null;

        if (containerRef.current && observer) {
            observer.observe(containerRef.current);
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            if (observer) {
                observer.disconnect();
            }
        };
    }, [activeIndex]);

    const isCompact = size === "sm";

    return (
        <div ref={containerRef} role="radiogroup" aria-label={ariaLabel} className={`relative inline-flex items-center rounded-xl border border-white/10 bg-[#0d111a]/90 p-1 shadow-inner backdrop-blur-md transition-colors ${fullWidth ? "w-full" : "w-auto"} ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}>
            <div
                style={{
                    transform: indicatorStyle.ready ? `translate3d(${indicatorStyle.left}px, 0, 0)` : `translate3d(${activeIndex * 100}%, 0, 0)`,
                    width: indicatorStyle.ready ? `${indicatorStyle.width}px` : `${100 / Math.max(1, options.length)}%`,
                    opacity: indicatorStyle.ready ? 1 : 0.85,
                }}
                className="pointer-events-none absolute top-1 bottom-1 left-0 rounded-lg border border-poke-blue/50 bg-poke-blue/20 shadow-[0_0_12px_var(--theme-primary-glow)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            />

            <div className={`relative z-10 flex items-center ${fullWidth ? "w-full" : "w-auto"}`}>
                {options.map((option, index) => {
                    const isSelected = option.value === value;
                    const isLoading = loadingValue === option.value;
                    const radioId = `${id}-option-${option.value}`;

                    return (
                        <button
                            key={option.value}
                            id={radioId}
                            ref={(el) => {
                                itemRefs.current[index] = el;
                            }}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            disabled={disabled || isLoading}
                            onClick={() => {
                                if (option.value !== value) {
                                    onChange(option.value);
                                }
                            }}
                            className={`group relative flex items-center justify-center gap-1.5 rounded-lg font-semibold tracking-tight transition-all duration-200 select-none active:scale-95 disabled:cursor-not-allowed ${fullWidth ? "flex-1" : ""} ${isCompact ? "px-2.5 py-1 text-[11px] sm:text-xs" : "px-3.5 py-2 text-xs sm:text-sm"} ${isSelected ? "text-white font-bold" : "text-slate-400 hover:text-slate-200"}`}
                        >
                            {isLoading ? <Loader2 size={isCompact ? 12 : 14} className="animate-spin text-poke-blue" /> : option.country ? <FlagIcon country={option.country} className={`transition-transform duration-200 ${isSelected ? "scale-105 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]" : "opacity-75 group-hover:opacity-100"}`} /> : null}

                            <span className={option.shortLabel ? "hidden xs:inline" : "inline"}>{option.label}</span>
                            {option.shortLabel && <span className="inline xs:hidden">{option.shortLabel}</span>}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
