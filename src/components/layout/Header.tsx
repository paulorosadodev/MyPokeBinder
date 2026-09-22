"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Layers, LayoutDashboard } from "lucide-react";
import { PokeballLogo } from "@/components/ui/PokeballLogo";
import { BottomNav } from "@/components/layout/BottomNav";
import { useAuth } from "@/lib/context/AuthContext";

interface HeaderProps {
    userEmail?: string;
    userAvatar?: string;
}

export function Header({ userEmail, userAvatar }: HeaderProps) {
    const pathname = usePathname();
    const { user: authUser, isLoading: authLoading } = useAuth();
    const [avatarError, setAvatarError] = useState(false);
    const [optimisticIndex, setOptimisticIndex] = useState<number | null>(null);

    useEffect(() => {
        setOptimisticIndex(null);
    }, [pathname]);

    const resolvedUserEmail = userEmail ?? authUser?.email;
    const resolvedUserAvatar = userAvatar ?? authUser?.avatarUrl;

    const navItems = [
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
        {
            href: "/dashboard",
            label: "Dashboard",
            icon: LayoutDashboard,
            isActive: pathname.startsWith("/dashboard"),
        },
    ];

    const isOwnSharedProfile = Boolean(authUser?.username && pathname === `/perfil/${authUser.username}`);
    const isProfileActive = pathname === "/perfil" || isOwnSharedProfile || pathname.startsWith("/configuracoes");
    const rawActiveIndex = navItems.findIndex((item) => item.isActive);
    const targetNavIndex = isProfileActive ? 3 : rawActiveIndex;
    const activeNavIndex = optimisticIndex !== null ? optimisticIndex : targetNavIndex;
    const isSliderVisible = activeNavIndex >= 0 && activeNavIndex < 3;
    const profileHref = authUser?.username ? `/perfil/${authUser.username}` : "/perfil";
    const navLabel = authUser?.name || authUser?.username || resolvedUserEmail?.split("@")[0] || "Meu Perfil";
    const navInitial = (authUser?.name?.[0] || authUser?.username?.[0] || resolvedUserEmail?.[0] || "P").toUpperCase();

    return (
        <>
            <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0c10]/80 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:px-6 sm:py-3">
                    <div className="flex items-center gap-3 sm:gap-6">
                        <NextLink href="/" className="flex shrink-0 items-center gap-2 sm:gap-2.5 no-underline">
                            <PokeballLogo size="sm" animated glow="subtle" />
                            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-sm font-extrabold tracking-tight text-transparent sm:text-lg">MyPokeBinder</span>
                        </NextLink>

                        <nav aria-label="Navegação de páginas" className="relative hidden items-center p-1 md:flex">
                            <div
                                style={{
                                    transform: `translate3d(${activeNavIndex >= 0 ? activeNavIndex * 100 : 0}%, 0, 0)`,
                                    width: "calc((100% - 8px) / 3)",
                                    opacity: isSliderVisible ? 1 : 0,
                                }}
                                className="pointer-events-none absolute top-1 bottom-1 left-1 rounded-xl border border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/20 shadow-[0_0_12px_var(--theme-primary-glow)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            />

                            {navItems.map((item, index) => {
                                const Icon = item.icon;
                                const isHighlighted = activeNavIndex === index;
                                return (
                                    <NextLink key={item.href} href={item.href} onClick={() => setOptimisticIndex(index)} aria-current={isHighlighted ? "page" : undefined} className={`relative z-10 flex w-28 items-center justify-center gap-2 py-2 text-sm font-semibold transition-colors duration-200 select-none ${isHighlighted ? "text-white font-bold" : "text-slate-400 hover:text-slate-200"}`}>
                                        <Icon size={16} className={`transition-transform duration-200 ${isHighlighted ? "scale-105 text-[var(--theme-primary)]" : "text-slate-400"}`} />
                                        <span>{item.label}</span>
                                    </NextLink>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3.5">
                        {authLoading && !authUser?.username && !resolvedUserEmail && !resolvedUserAvatar ? (
                            <div className="flex items-center gap-2 rounded-xl border border-transparent px-2.5 py-1.5 sm:gap-2.5 sm:px-3 animate-pulse">
                                <div className="hidden h-3 w-16 rounded bg-white/10 sm:block" />
                                <div className="h-8 w-8 rounded-full bg-white/10" />
                            </div>
                        ) : authUser?.username || resolvedUserEmail || resolvedUserAvatar || isProfileActive ? (
                            <NextLink
                                href={profileHref}
                                title="Meu Perfil"
                                aria-label="Meu Perfil"
                                onClick={() => setOptimisticIndex(3)}
                                aria-current={activeNavIndex === 3 ? "page" : undefined}
                                className={`group flex items-center gap-2 rounded-xl border px-2.5 py-1.5 transition-all duration-200 sm:gap-2.5 sm:px-3 ${activeNavIndex === 3 ? "border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/20 text-white font-bold shadow-[0_0_12px_var(--theme-primary-glow)]" : "border-transparent text-slate-300 hover:bg-white/10"}`}
                            >
                                <div className="flex flex-col items-end text-xs">
                                    <span className={`max-w-[100px] truncate font-semibold transition-colors sm:max-w-[180px] ${activeNavIndex === 3 ? "text-white font-bold" : "text-slate-300 group-hover:text-white"}`}>{navLabel}</span>
                                </div>

                                {resolvedUserAvatar && !avatarError ? (
                                    <Image src={resolvedUserAvatar} alt={navLabel} width={32} height={32} priority className={`h-8 w-8 rounded-full bg-white/10 object-cover shadow-sm transition-all duration-200 ${activeNavIndex === 3 ? "ring-2 ring-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-primary-glow)]" : "ring-1 ring-white/20"}`} referrerPolicy="no-referrer" onError={() => setAvatarError(true)} unoptimized />
                                ) : (
                                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-200 ${activeNavIndex === 3 ? "bg-[var(--theme-primary)] text-white shadow-[0_0_8px_var(--theme-primary-glow)]" : "bg-white/10 text-slate-200"}`}>{navInitial}</div>
                                )}
                            </NextLink>
                        ) : null}
                    </div>
                </div>
            </header>
            <BottomNav />
        </>
    );
}
