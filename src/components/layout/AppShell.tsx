"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { shouldShowAppHeader } from "@/lib/layout/appShell";
import { useAuth } from "@/lib/context/AuthContext";

export function AppShell({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const { user } = useAuth();
    const showHeader = shouldShowAppHeader(pathname, Boolean(user));

    return (
        <>
            {showHeader ? <Header /> : null}
            {children}
        </>
    );
}
