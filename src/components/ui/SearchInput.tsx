"use client";

import { useEffect, useRef, useState, type InputHTMLAttributes } from "react";
import { truncateSearchPlaceholder } from "@/lib/ui/searchPlaceholder";

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "placeholder"> {
    className?: string;
    placeholder: string;
    placeholderClassName?: string;
}

export function SearchInput({ className = "", placeholder, placeholderClassName = "", value, ...props }: SearchInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [visiblePlaceholder, setVisiblePlaceholder] = useState(placeholder);

    useEffect(() => {
        const input = inputRef.current;
        if (!input) return;

        let frame: number | null = null;
        const updatePlaceholder = () => {
            const style = getComputedStyle(input);
            const availableWidth = Math.max(0, input.clientWidth - Number.parseFloat(style.paddingLeft) - Number.parseFloat(style.paddingRight));
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            if (!context) return;
            context.font = style.font;
            const nextPlaceholder = truncateSearchPlaceholder(placeholder, availableWidth, (text) => context.measureText(text).width);
            setVisiblePlaceholder((current) => (current === nextPlaceholder ? current : nextPlaceholder));
        };
        const scheduleUpdate = () => {
            if (frame !== null) cancelAnimationFrame(frame);
            frame = requestAnimationFrame(updatePlaceholder);
        };
        const observer = new ResizeObserver(scheduleUpdate);

        observer.observe(input);
        scheduleUpdate();
        document.fonts?.ready.then(scheduleUpdate);

        return () => {
            observer.disconnect();
            if (frame !== null) cancelAnimationFrame(frame);
        };
    }, [placeholder]);

    const isEmpty = value === "" || value === null || value === undefined;

    return (
        <div className="relative w-full min-w-0">
            <input ref={inputRef} value={value} {...props} placeholder="" aria-placeholder={placeholder} className={`${className} placeholder:text-transparent`} />
            {isEmpty ? (
                <span aria-hidden="true" className={`pointer-events-none absolute inset-y-0 z-10 flex items-center overflow-hidden text-ellipsis whitespace-nowrap text-slate-500 ${placeholderClassName}`}>
                    {visiblePlaceholder}
                </span>
            ) : null}
        </div>
    );
}
