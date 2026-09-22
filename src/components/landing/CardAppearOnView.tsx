"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { getCardAppearProps } from "@/lib/ui/cardAppear";

type CardAppearOnViewProps = {
    children: ReactNode;
    className?: string;
    /** Index in the grid; used for a light within-row stagger when several tiles enter together. */
    index?: number;
};

/** Plays `card-list-appear` when this tile itself enters the viewport. */
export function CardAppearOnView({ children, className = "", index = 0 }: CardAppearOnViewProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    // Stagger only within the visible row (0-2), so off-screen rows wait for their own observe.
    const appear = getCardAppearProps(index % 3, { stepMs: 55, maxDelayMs: 160 });

    return (
        <div ref={ref} className={`${visible ? appear.className : "opacity-0"} ${className}`.trim()} style={visible ? appear.style : undefined}>
            {children}
        </div>
    );
}
