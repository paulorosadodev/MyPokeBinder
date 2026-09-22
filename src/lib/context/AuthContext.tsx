"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export interface UserProfile {
    id: string;
    email?: string;
    name?: string;
    avatarUrl?: string | null;
}

interface AuthContextType {
    user: UserProfile | null;
    isLoading: boolean;
    signOut: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = "mypokebinder_user_profile";

function getCachedUser(): UserProfile | null {
    if (typeof window === "undefined") return null;
    try {
        const item = localStorage.getItem(STORAGE_KEY);
        if (!item) return null;
        return JSON.parse(item) as UserProfile;
    } catch {
        return null;
    }
}

function setCachedUser(user: UserProfile | null) {
    if (typeof window === "undefined") return;
    try {
        if (user) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    } catch {}
}

export function AuthProvider({ children, initialUser = null }: { children: ReactNode; initialUser?: UserProfile | null }) {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(() => {
        if (initialUser) return initialUser;
        return getCachedUser();
    });
    const [isLoading, setIsLoading] = useState<boolean>(!initialUser && !getCachedUser());

    const refreshUser = useCallback(async () => {
        try {
            const supabase = createClient();
            const { data } = await supabase.auth.getUser();
            if (data.user) {
                const profile: UserProfile = {
                    id: data.user.id,
                    email: data.user.email,
                    name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || data.user.user_metadata?.user_name || data.user.email?.split("@")[0] || "Treinador Pokémon",
                    avatarUrl: data.user.user_metadata?.avatar_url || data.user.user_metadata?.picture || null,
                };
                setUser(profile);
                setCachedUser(profile);
            } else {
                setUser(null);
                setCachedUser(null);
            }
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (initialUser) {
            setUser(initialUser);
            setCachedUser(initialUser);
            setIsLoading(false);
        }
    }, [initialUser]);

    useEffect(() => {
        const cached = getCachedUser();
        if (cached) {
            setUser((current) => current || cached);
            setIsLoading(false);
        }

        const supabase = createClient();
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session?.user) {
                const profile: UserProfile = {
                    id: session.user.id,
                    email: session.user.email,
                    name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || session.user.user_metadata?.user_name || session.user.email?.split("@")[0] || "Treinador Pokémon",
                    avatarUrl: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || null,
                };
                setUser(profile);
                setCachedUser(profile);
                setIsLoading(false);
            } else if (event === "SIGNED_OUT") {
                setUser(null);
                setCachedUser(null);
                setIsLoading(false);
            }
        });

        refreshUser();

        return () => {
            subscription.unsubscribe();
        };
    }, [refreshUser]);

    const signOut = useCallback(async () => {
        setIsLoading(true);
        setUser(null);
        setCachedUser(null);
        try {
            const supabase = createClient();
            await supabase.auth.signOut();
        } finally {
            setIsLoading(false);
            router.push("/login");
            router.refresh();
        }
    }, [router]);

    return <AuthContext.Provider value={{ user, isLoading, signOut, refreshUser }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
