"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LandingRevealProps = {
    children: ReactNode | ((visible: boolean) => ReactNode);
    className?: string;
    /** When false, only reports visibility (no fade on the wrapper). */
    fade?: boolean;
};

export function LandingReveal({ children, className = "", fade = true }: LandingRevealProps) {
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
            { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const content = typeof children === "function" ? children(visible) : children;
    const fadeClass = fade ? `landing-reveal${visible ? " is-visible" : ""}` : "";

    return (
        <div ref={ref} className={`${fadeClass} ${className}`.trim()}>
            {content}
        </div>
    );
}
