"use client";

import { useState, useEffect } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Layers, LayoutDashboard } from "lucide-react";

export function BottomNav() {
    const pathname = usePathname();
    const [optimisticIndex, setOptimisticIndex] = useState<number | null>(null);

    const items = [
        {
            href: "/dashboard",
            label: "Dashboard",
            icon: LayoutDashboard,
            isActive: pathname.startsWith("/dashboard"),
        },
        {
            href: "/",
            label: "Binder",
            icon: BookOpen,
            isActive: pathname === "/",
        },
        {
            href: "/collection",
            label: "Coleção",
            icon: Layers,
            isActive: pathname.startsWith("/collection") || pathname.startsWith("/cards"),
        },
    ];

    useEffect(() => {
        setOptimisticIndex(null);
    }, [pathname]);

    const activeIndex = optimisticIndex !== null ? optimisticIndex : items.findIndex((item) => item.isActive);

    return (
        <nav aria-label="Navegação mobile" className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0a0c10]/92 backdrop-blur-xl md:hidden">
            <div className="mx-auto max-w-md px-3 pt-1.5 pb-[max(0.6rem,env(safe-area-inset-bottom))]">
                <div className="relative flex items-center justify-around rounded-2xl border border-white/10 bg-white/[0.04] p-1 shadow-inner backdrop-blur-md">
                    <div
                        style={{
                            transform: `translate3d(${activeIndex >= 0 ? activeIndex * 100 : 0}%, 0, 0)`,
                            width: "calc((100% - 8px) / 3)",
                            opacity: activeIndex >= 0 ? 1 : 0,
                        }}
                        className="pointer-events-none absolute top-1 bottom-1 left-1 rounded-xl border border-white/15 bg-white/10 shadow-sm shadow-black/40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />

                    {items.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <NextLink key={item.href} href={item.href} onClick={() => setOptimisticIndex(index)} aria-current={item.isActive ? "page" : undefined} className={`relative z-10 flex min-h-[46px] flex-1 flex-col items-center justify-center gap-1 rounded-xl py-1 px-2 transition-all duration-200 select-none active:scale-95 ${item.isActive ? "text-white font-bold" : "text-slate-400 hover:text-slate-200"}`}>
                                <Icon size={18} className={`transition-transform duration-200 ${item.isActive ? "scale-105 text-white drop-shadow-sm" : "text-slate-400"}`} />
                                <span className={`text-[11px] tracking-tight transition-colors duration-200 ${item.isActive ? "font-bold text-white" : "font-medium text-slate-400"}`}>{item.label}</span>
                            </NextLink>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
