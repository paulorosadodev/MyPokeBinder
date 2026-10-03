"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, Layers, LogIn, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { PokeballLogo } from "@/components/ui/PokeballLogo";
import { BottomNav } from "@/components/layout/BottomNav";
import { useAuth } from "@/lib/context/AuthContext";
import { shouldShowNavPages } from "@/lib/layout/appShell";

interface HeaderProps {
    userEmail?: string;
    userAvatar?: string;
}

export function Header({ userEmail, userAvatar }: HeaderProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { user: authUser, isLoading: authLoading, signOut } = useAuth();
    const [avatarError, setAvatarError] = useState(false);
    const [optimisticHref, setOptimisticHref] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setOptimisticHref(null);
        setIsMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!isMenuOpen) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isMenuOpen]);

    const resolvedUserEmail = userEmail ?? authUser?.email;
    const resolvedUserAvatar = userAvatar ?? authUser?.avatarUrl;

    const navItems = [
        {
            href: "/",
            label: "Binders",
            icon: BookOpen,
            isActive: pathname === "/" || pathname.startsWith("/binders"),
        },
        {
            href: "/collection",
            label: "Coleção",
            icon: Layers,
            isActive: pathname.startsWith("/collection") || pathname.startsWith("/cards"),
        },
    ];

    const isOwnSharedProfile = Boolean(authUser?.username && pathname === `/perfil/${authUser.username}`);
    const isProfileActive = pathname === "/perfil" || isOwnSharedProfile || pathname.startsWith("/configuracoes");
    const profileHref = authUser?.username ? `/perfil/${authUser.username}` : "/perfil";
    const navLabel = authUser?.name || authUser?.username || resolvedUserEmail?.split("@")[0] || "Meu Perfil";
    const navInitial = (authUser?.name?.[0] || authUser?.username?.[0] || resolvedUserEmail?.[0] || "P").toUpperCase();
    const isSharedProfileOrCollection = pathname.startsWith("/perfil/") || pathname.startsWith("/colecao/");
    const showNavPages = shouldShowNavPages(pathname, Boolean(authUser));

    return (
        <>
            <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0c10]/80 backdrop-blur-md">
                <div className="flex w-full items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:px-6 sm:py-3">
                    <div className="flex min-w-0 items-center gap-4 sm:gap-8">
                        <NextLink href="/" prefetch={true} className="flex shrink-0 items-center gap-2 sm:gap-2.5 no-underline">
                            <PokeballLogo size="sm" animated glow="subtle" />
                            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-sm font-extrabold tracking-tight text-transparent sm:text-lg">MyPokeBinder</span>
                        </NextLink>

                        {showNavPages ? (
                            <nav aria-label="Navegação principal" className="hidden md:flex items-center">
                                <ul className="flex items-center gap-1 lg:gap-1.5">
                                    {navItems.map((item) => {
                                        const Icon = item.icon;
                                        const isHighlighted = optimisticHref !== null ? optimisticHref === item.href : item.isActive;
                                        return (
                                            <li key={item.href}>
                                                <NextLink
                                                    href={item.href}
                                                    prefetch={true}
                                                    onMouseEnter={() => router.prefetch(item.href)}
                                                    onTouchStart={() => router.prefetch(item.href)}
                                                    onClick={() => setOptimisticHref(item.href)}
                                                    aria-current={isHighlighted ? "page" : undefined}
                                                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-150 select-none ${isHighlighted ? "border border-white/10 bg-white/10 text-white shadow-sm" : "border border-transparent text-slate-400 hover:bg-white/[0.06] hover:text-slate-200"}`}
                                                >
                                                    <Icon size={16} className={`transition-transform duration-150 ${isHighlighted ? "scale-105 text-[var(--theme-primary)]" : "text-slate-400"}`} />
                                                    <span>{item.label}</span>
                                                </NextLink>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                        ) : null}
                    </div>

                    {showNavPages ? (
                        <div className="flex shrink-0 items-center gap-2 sm:gap-3.5">
                            {authLoading && !authUser?.username && !resolvedUserEmail && !resolvedUserAvatar ? (
                                <div className="flex items-center gap-2 rounded-xl border border-transparent px-2.5 py-1.5 sm:gap-2.5 sm:px-3 animate-pulse">
                                    <div className="hidden h-3 w-16 rounded bg-white/10 sm:block" />
                                    <div className="h-8 w-8 rounded-full bg-white/10" />
                                </div>
                            ) : authUser?.username || resolvedUserEmail || resolvedUserAvatar || isProfileActive ? (
                                <div ref={menuRef} className="relative">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (typeof window !== "undefined" && window.innerWidth < 768) {
                                                router.push(profileHref);
                                                return;
                                            }
                                            setIsMenuOpen((prev) => !prev);
                                        }}
                                        onMouseEnter={() => router.prefetch(profileHref)}
                                        onTouchStart={() => router.prefetch(profileHref)}
                                        aria-haspopup="menu"
                                        aria-expanded={isMenuOpen}
                                        aria-label="Menu do treinador"
                                        className={`group flex cursor-pointer items-center gap-2 rounded-xl border px-2.5 py-1.5 transition-all duration-200 sm:gap-2.5 sm:px-3 ${isMenuOpen || isProfileActive ? "border-[var(--theme-primary)]/30 bg-[var(--theme-primary)]/20 text-white font-bold shadow-[0_0_12px_var(--theme-primary-glow)]" : "border-transparent text-slate-300 hover:bg-white/10"}`}
                                    >
                                        <div className="flex flex-col items-end text-xs">
                                            <span className={`max-w-[100px] truncate font-semibold transition-colors sm:max-w-[160px] ${isMenuOpen || isProfileActive ? "text-white font-bold" : "text-slate-300 group-hover:text-white"}`}>{navLabel}</span>
                                        </div>

                                        {resolvedUserAvatar && !avatarError ? (
                                            <Image src={resolvedUserAvatar} alt={navLabel} width={32} height={32} className={`h-8 w-8 rounded-full bg-white/10 object-cover shadow-sm transition-all duration-200 ${isMenuOpen || isProfileActive ? "ring-2 ring-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-primary-glow)]" : "ring-1 ring-white/20"}`} referrerPolicy="no-referrer" onError={() => setAvatarError(true)} unoptimized />
                                        ) : (
                                            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-200 ${isMenuOpen || isProfileActive ? "bg-[var(--theme-primary)] text-white shadow-[0_0_8px_var(--theme-primary-glow)]" : "bg-white/10 text-slate-200"}`}>{navInitial}</div>
                                        )}

                                        <ChevronDown size={14} className={`hidden md:block text-slate-400 transition-transform duration-200 ${isMenuOpen ? "rotate-180 text-white" : "group-hover:text-slate-200"}`} />
                                    </button>

                                    {isMenuOpen && (
                                        <div role="menu" aria-label="Opções da conta" className="hidden md:block absolute right-0 top-full mt-2 w-56 rounded-2xl border border-white/10 bg-[#0f131c]/95 p-1.5 shadow-2xl backdrop-blur-xl z-50">
                                            <div className="px-3 py-2">
                                                <p className="truncate text-xs font-bold text-white">{navLabel}</p>
                                                {resolvedUserEmail ? <p className="truncate text-[11px] text-slate-400">{resolvedUserEmail}</p> : null}
                                            </div>

                                            <div className="my-1 h-px bg-white/10" />

                                            <NextLink
                                                href={profileHref}
                                                prefetch={true}
                                                role="menuitem"
                                                onClick={() => {
                                                    setIsMenuOpen(false);
                                                }}
                                                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${pathname === profileHref || pathname === "/perfil" ? "bg-white/10 text-white font-semibold" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}
                                            >
                                                <User size={15} className="text-slate-400" />
                                                <span>Meu Perfil</span>
                                            </NextLink>

                                            <NextLink
                                                href={pathname && !pathname.startsWith("/configuracoes") ? `/configuracoes?from=${encodeURIComponent(pathname)}` : "/configuracoes"}
                                                prefetch={true}
                                                role="menuitem"
                                                onClick={() => {
                                                    setIsMenuOpen(false);
                                                }}
                                                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${pathname.startsWith("/configuracoes") ? "bg-white/10 text-white font-semibold" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}
                                            >
                                                <Settings size={15} className="text-slate-400" />
                                                <span>Configurações</span>
                                            </NextLink>

                                            <div className="my-1 h-px bg-white/10" />

                                            <button
                                                type="button"
                                                role="menuitem"
                                                onClick={async () => {
                                                    setIsMenuOpen(false);
                                                    await signOut();
                                                    router.push("/login");
                                                }}
                                                className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-rose-400 transition-colors hover:bg-rose-500/10 hover:text-rose-300"
                                            >
                                                <LogOut size={15} />
                                                <span>Sair da conta</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    ) : isSharedProfileOrCollection && !authUser ? (
                        <div className="flex shrink-0 items-center gap-2 sm:gap-3.5">
                            <NextLink href="/login" prefetch={true} className="flex items-center gap-2 rounded-xl bg-[var(--theme-primary)] px-3.5 py-1.5 text-xs font-bold text-white shadow-md shadow-[var(--theme-primary-glow)] transition-all hover:brightness-110 active:scale-[0.98] sm:px-4 sm:py-2 sm:text-sm">
                                <LogIn size={15} />
                                <span>Entrar</span>
                            </NextLink>
                        </div>
                    ) : null}
                </div>
            </header>
            {showNavPages ? <BottomNav /> : null}
        </>
    );
}
