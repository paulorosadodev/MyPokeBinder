"use client";

import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption<T extends string = string> {
    value: T;
    label: string;
    icon?: React.ReactNode;
    description?: string;
}

export interface SelectProps<T extends string = string> {
    value: T;
    onChange: (value: T) => void;
    options: SelectOption<T>[];
    placeholder?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    className?: string;
    menuClassName?: string;
    ariaLabel?: string;
    align?: "left" | "right";
    size?: "sm" | "md";
    onOpenChange?: (open: boolean) => void;
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function Select<T extends string = string>({ value, onChange, options, placeholder = "Selecione uma opção", icon, disabled = false, className = "", menuClassName = "", ariaLabel = "Seletor de opções", align = "left", size = "md", onOpenChange }: SelectProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
    const containerRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const selectedOption = options.find((opt) => opt.value === value);
    const isSm = size === "sm";

    const setOpen = (next: boolean) => {
        setIsOpen(next);
        onOpenChange?.(next);
    };

    const updateMenuPosition = useCallback(() => {
        const trigger = containerRef.current;
        if (!trigger) return;

        const rect = trigger.getBoundingClientRect();
        const gap = 6;
        const viewportPadding = 8;
        const estimatedMenuHeight = Math.min(240, options.length * 44 + 8);
        const spaceBelow = window.innerHeight - rect.bottom - gap;
        const openUpward = spaceBelow < estimatedMenuHeight && rect.top > spaceBelow;

        const width = Math.max(rect.width, 170);
        let left = align === "right" ? rect.right - width : rect.left;
        left = Math.min(Math.max(viewportPadding, left), window.innerWidth - width - viewportPadding);

        const top = openUpward ? Math.max(viewportPadding, rect.top - estimatedMenuHeight - gap) : rect.bottom + gap;

        setMenuStyle({
            position: "fixed",
            top,
            left,
            width,
            zIndex: 200,
        });
    }, [align, options.length]);

    const handleToggle = () => {
        if (!disabled) {
            setOpen(!isOpen);
        }
    };

    const handleSelect = (optionValue: T) => {
        onChange(optionValue);
        setOpen(false);
    };

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            const target = event.target as Node;
            const inTrigger = containerRef.current?.contains(target);
            const inMenu = menuRef.current?.contains(target);
            if (!inTrigger && !inMenu) {
                setIsOpen(false);
                onOpenChange?.(false);
            }
        },
        [onOpenChange],
    );

    useIsomorphicLayoutEffect(() => {
        if (!isOpen) return;
        updateMenuPosition();
    }, [isOpen, updateMenuPosition, value]);

    useEffect(() => {
        if (!isOpen) return;

        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("resize", updateMenuPosition);
        window.addEventListener("scroll", updateMenuPosition, true);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("resize", updateMenuPosition);
            window.removeEventListener("scroll", updateMenuPosition, true);
        };
    }, [isOpen, handleClickOutside, updateMenuPosition]);

    useEffect(() => {
        if (disabled && isOpen) {
            setOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [disabled]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (disabled) return;

        if (e.key === "Escape") {
            setOpen(false);
        } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            if (!isOpen) {
                setOpen(true);
            } else {
                const currentIndex = options.findIndex((opt) => opt.value === value);
                const nextIndex = e.key === "ArrowDown" ? (currentIndex + 1) % options.length : (currentIndex - 1 + options.length) % options.length;
                onChange(options[nextIndex].value);
            }
        }
    };

    const menu = isOpen
        ? createPortal(
              <div ref={menuRef} role="listbox" aria-label={ariaLabel} style={menuStyle} className={`rounded-xl border border-white/10 bg-[#121520] p-1 shadow-2xl backdrop-blur-md transition-all duration-150 animate-in fade-in zoom-in-95 ${menuClassName}`}>
                  <div className="flex max-h-60 flex-col gap-0.5 overflow-y-auto">
                      {options.map((option) => {
                          const isSelected = option.value === value;
                          return (
                              <button
                                  key={option.value}
                                  type="button"
                                  role="option"
                                  aria-selected={isSelected}
                                  onClick={() => handleSelect(option.value)}
                                  className={`group/item flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border px-2.5 py-2 text-left text-xs transition-colors duration-150 ${isSelected ? "border-poke-blue/30 bg-poke-blue/20 font-bold text-poke-blue shadow-[0_0_8px_var(--theme-primary-glow)]" : "border-transparent text-slate-300 font-medium hover:border-poke-blue/30 hover:bg-poke-blue/15 hover:text-poke-blue"}`}
                              >
                                  <div className="flex min-w-0 items-center gap-2">
                                      {option.icon && <span className="shrink-0">{option.icon}</span>}
                                      <div className="flex min-w-0 flex-col">
                                          <span className="truncate">{option.label}</span>
                                          {option.description && <span className="truncate text-[10px] text-slate-400 group-hover/item:text-poke-blue/70">{option.description}</span>}
                                      </div>
                                  </div>

                                  {isSelected && <Check size={13} className="shrink-0 text-poke-blue" />}
                              </button>
                          );
                      })}
                  </div>
              </div>,
              document.body,
          )
        : null;

    return (
        <div ref={containerRef} className={`relative inline-block min-w-0 ${className || "w-full sm:w-auto"}`}>
            <button
                type="button"
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label={ariaLabel}
                className={`group flex w-full items-center justify-between shadow-sm backdrop-blur-sm transition-all duration-200 focus:border-poke-blue focus:ring-1 focus:ring-poke-blue/40 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                    isSm ? "h-7 gap-1 rounded-lg border border-white/10 bg-white/5 px-2 text-[11px] font-semibold text-slate-200" : "h-9 gap-1.5 sm:gap-2.5 rounded-xl border border-white/10 bg-white/5 px-2.5 sm:px-3 text-xs font-semibold text-slate-200"
                } ${disabled ? "" : "hover:border-poke-blue/40 hover:bg-white/[0.08]"} ${isOpen ? "border-poke-blue ring-1 ring-poke-blue/30 bg-white/[0.08]" : ""}`}
            >
                <div className={`flex min-w-0 items-center ${isSm ? "gap-1" : "gap-1.5 sm:gap-2"}`}>
                    {icon && <span className="shrink-0 text-slate-400 transition-colors group-hover:text-poke-blue">{icon}</span>}
                    {selectedOption?.icon && <span className="shrink-0">{selectedOption.icon}</span>}
                    <span className="truncate text-slate-200">{selectedOption ? selectedOption.label : placeholder}</span>
                </div>

                <ChevronDown size={isSm ? 12 : 14} className={`shrink-0 text-slate-400 transition-transform duration-200 ${disabled ? "" : "group-hover:text-poke-blue"} ${isOpen ? "rotate-180 text-poke-blue" : ""}`} />
            </button>

            {menu}
        </div>
    );
}
