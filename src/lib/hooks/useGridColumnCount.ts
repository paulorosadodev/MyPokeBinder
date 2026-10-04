"use client";

import { useCallback, useEffect, useState } from "react";

function getFallbackColumns(width: number): number {
    if (width >= 1024) return 5;
    if (width >= 768) return 4;
    if (width >= 640) return 3;
    return 2;
}

export function getCompleteRowItems<T>(items: T[], columns: number, hasMore: boolean): T[] {
    if (!hasMore || columns <= 1 || items.length === 0) {
        return items;
    }
    const remainder = items.length % columns;
    if (remainder === 0) {
        return items;
    }
    const completeLength = items.length - remainder;
    return completeLength > 0 ? items.slice(0, completeLength) : items;
}

export function useGridColumnCount(defaultColumns = 5) {
    const [columns, setColumns] = useState<number>(() => {
        if (typeof window === "undefined") return defaultColumns;
        return getFallbackColumns(window.innerWidth);
    });

    const [gridElement, setGridElement] = useState<HTMLElement | null>(null);

    const updateColumnsFromElement = useCallback((node: HTMLElement | null) => {
        if (!node || typeof window === "undefined") return;
        const style = window.getComputedStyle(node);
        const template = style.getPropertyValue("grid-template-columns").trim();
        if (template) {
            const count = template.split(/\s+/).filter(Boolean).length;
            if (count > 0) {
                setColumns(count);
                return;
            }
        }
        setColumns(getFallbackColumns(window.innerWidth));
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleResize = () => {
            if (gridElement) {
                updateColumnsFromElement(gridElement);
            } else {
                setColumns(getFallbackColumns(window.innerWidth));
            }
        };

        handleResize();

        if (gridElement && typeof ResizeObserver !== "undefined") {
            const observer = new ResizeObserver(() => {
                updateColumnsFromElement(gridElement);
            });
            observer.observe(gridElement);
            return () => {
                observer.disconnect();
            };
        }

        window.addEventListener("resize", handleResize, { passive: true });
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [gridElement, updateColumnsFromElement]);

    return {
        columns,
        gridRef: setGridElement,
    };
}
