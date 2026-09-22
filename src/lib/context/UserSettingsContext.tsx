"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { setSoundMuted } from "@/lib/audio/cardSounds";
import { createClient } from "@/lib/supabase/client";
import { BallType } from "@/components/theme/PokemonBallSvg";

export const THEME_PRESETS = [
    {
        id: "red",
        label: "Charizard Red",
        color: "#ef4444",
        dexId: 6,
        pokemonName: "Charizard",
        ballType: "pokeball",
        ballName: "Poké Ball",
        type: "Fogo",
        soundTier: 3,
        description: "Chamas ardentes e o clássico rubro da Poké Ball original",
    },
    {
        id: "blue",
        label: "Blastoise Blue",
        color: "#3b82f6",
        dexId: 9,
        pokemonName: "Blastoise",
        ballType: "greatball",
        ballName: "Great Ball",
        type: "Água",
        soundTier: 2,
        description: "Jatos d'água torrenciais com a precisão da Great Ball",
    },
    {
        id: "amber",
        label: "Pikachu Amber",
        color: "#f59e0b",
        dexId: 25,
        pokemonName: "Pikachu",
        ballType: "ultraball",
        ballName: "Ultra Ball",
        type: "Elétrico",
        soundTier: 1,
        description: "Descargas elétricas e a sofisticação da Ultra Ball",
    },
    {
        id: "purple",
        label: "Gengar Purple",
        color: "#8b5cf6",
        dexId: 94,
        pokemonName: "Gengar",
        ballType: "masterball",
        ballName: "Master Ball",
        type: "Fantasma",
        soundTier: 2,
        description: "Sombras enigmáticas e o poder definitivo da Master Ball",
    },
    {
        id: "emerald",
        label: "Rayquaza Emerald",
        color: "#10b981",
        dexId: 384,
        pokemonName: "Rayquaza",
        ballType: "safariball",
        ballName: "Safari Ball",
        type: "Dragão",
        soundTier: 3,
        description: "Guardião da atmosfera e tons vivos da Safari Ball",
    },
    {
        id: "pink",
        label: "Mew Pink",
        color: "#ec4899",
        dexId: 151,
        pokemonName: "Mew",
        ballType: "loveball",
        ballName: "Love Ball",
        type: "Psíquico",
        soundTier: 3,
        description: "O ancestral mítico com a ternura cósmica da Love Ball",
    },
] as const;

export function getBallTypeForTheme(themeColor?: string): BallType {
    if (!themeColor) return "pokeball";
    const lower = themeColor.toLowerCase();
    const match = THEME_PRESETS.find((p) => p.color.toLowerCase() === lower);
    return match ? (match.ballType as BallType) : "pokeball";
}

export interface UserSettingsContextType {
    themeColor: string;
    ballType: BallType;
    soundEnabled: boolean;
    isLoading: boolean;
    setThemeColor: (color: string) => Promise<void>;
    setSoundEnabled: (enabled: boolean) => Promise<void>;
}

export const UserSettingsContext = createContext<UserSettingsContextType | null>(null);

function updateFavicon(color: string) {
    if (typeof document === "undefined") return;
    const bType = getBallTypeForTheme(color);
    let topSvg = `<path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="${color}"/>`;
    if (bType === "greatball") {
        topSvg = `<path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#3b82f6"/><path d="M 22 24 C 28 32 30 42 30 50 L 38 50 C 38 40 35 28 28 17 Z" fill="#ef4444"/><path d="M 78 24 C 72 32 70 42 70 50 L 62 50 C 62 40 65 28 72 17 Z" fill="#ef4444"/>`;
    } else if (bType === "ultraball") {
        topSvg = `<path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#1e293b"/><path d="M 24 16 L 36 24 L 32 50 L 22 50 Z" fill="#f59e0b"/><path d="M 76 16 L 64 24 L 68 50 L 78 50 Z" fill="#f59e0b"/><path d="M 36 16 Q 50 10 64 16 L 62 23 Q 50 18 38 23 Z" fill="#f59e0b"/>`;
    } else if (bType === "masterball") {
        topSvg = `<path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#8b5cf6"/><ellipse cx="28" cy="30" rx="9" ry="8" fill="#ec4899"/><ellipse cx="72" cy="30" rx="9" ry="8" fill="#ec4899"/><path d="M 43 28 L 47 18 L 50 23 L 53 18 L 57 28 L 54 28 L 52 22 L 50 26 L 48 22 L 46 28 Z" fill="#ffffff"/>`;
    } else if (bType === "safariball") {
        topSvg = `<path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#10b981"/><path d="M 18 32 Q 28 20 42 26 Q 34 38 24 44 Z" fill="#047857" opacity="0.8"/><circle cx="50" cy="34" r="7" fill="#34d399" opacity="0.8"/>`;
    } else if (bType === "loveball") {
        topSvg = `<path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="#ec4899"/><path d="M 50 36 C 47 30 40 30 40 24 C 40 19 45 17 50 22 C 55 17 60 19 60 24 C 60 30 53 30 50 36 Z" fill="#ffffff"/>`;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${topSvg}<path d="M 4 50 A 46 46 0 0 0 96 50 Z" fill="#f8fafc"/><line x1="4" y1="50" x2="96" y2="50" stroke="#0f172a" stroke-width="8"/><circle cx="50" cy="50" r="46" fill="none" stroke="#0f172a" stroke-width="8"/><circle cx="50" cy="50" r="16" fill="#0f172a"/><circle cx="50" cy="50" r="10" fill="#f8fafc"/><circle cx="50" cy="50" r="5" fill="${color}"/></svg>`;
    const dataUri = `data:image/svg+xml,${encodeURIComponent(svg)}`;

    const links = document.querySelectorAll("link[rel*='icon']");
    links.forEach((link) => {
        link.setAttribute("href", dataUri);
    });

    let link = document.getElementById("app-dynamic-favicon") as HTMLLinkElement | null;
    if (!link) {
        link = document.createElement("link");
        link.id = "app-dynamic-favicon";
        link.rel = "icon";
        link.type = "image/svg+xml";
        document.head.appendChild(link);
    }
    link.href = dataUri;
}

function applyThemeToDom(color: string) {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.style.setProperty("--theme-primary", color);
    root.style.setProperty("--color-poke-blue", color);
    root.style.setProperty("--theme-primary-hover", `color-mix(in srgb, ${color} 85%, black)`);
    root.style.setProperty("--theme-primary-glow", `color-mix(in srgb, ${color} 40%, transparent)`);
    updateFavicon(color);
}

function persistThemeCookie(color: string) {
    if (typeof document === "undefined") return;
    document.cookie = `mypokebinder_theme_color=${encodeURIComponent(color)}; path=/; max-age=31536000; SameSite=Lax`;
}

export function UserSettingsProvider({ children, initialTheme }: { children: ReactNode; initialTheme?: string }) {
    const pathname = usePathname();
    const [themeColor, setThemeColorState] = useState(() => {
        if (typeof window !== "undefined") {
            const cached = localStorage.getItem("mypokebinder_theme_color");
            if (cached) return cached;
        }
        return initialTheme || "#ef4444";
    });
    const [soundEnabled, setSoundEnabledState] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const applyAndPersistTheme = useCallback((color: string) => {
        setThemeColorState(color);
        applyThemeToDom(color);
        if (typeof window !== "undefined") {
            localStorage.setItem("mypokebinder_theme_color", color);
        }
        persistThemeCookie(color);
    }, []);

    const fetchSettings = useCallback(async () => {
        try {
            const res = await fetch("/api/settings");
            if (res.ok) {
                const data = await res.json();
                if (data.settings) {
                    const fetchedTheme = data.settings.theme_color || "#ef4444";
                    const fetchedSound = data.settings.sound_enabled ?? true;

                    applyAndPersistTheme(fetchedTheme);
                    setSoundEnabledState(fetchedSound);
                    setSoundMuted(!fetchedSound);

                    if (typeof window !== "undefined") {
                        localStorage.setItem("mypokebinder_sound_enabled", String(fetchedSound));
                    }
                }
            }
        } catch {
        } finally {
            setIsLoading(false);
        }
    }, [applyAndPersistTheme]);

    useEffect(() => {
        updateFavicon(themeColor);
    }, [pathname, themeColor]);

    useEffect(() => {
        if (typeof document === "undefined") return;
        const observer = new MutationObserver(() => {
            const links = document.querySelectorAll("link[rel*='icon']");
            links.forEach((link) => {
                const href = link.getAttribute("href");
                if (href && !href.startsWith("data:image/svg+xml")) {
                    updateFavicon(themeColor);
                }
            });
        });

        observer.observe(document.head, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["href"],
        });

        return () => observer.disconnect();
    }, [themeColor]);

    useEffect(() => {
        const cachedTheme = localStorage.getItem("mypokebinder_theme_color");
        const cachedSound = localStorage.getItem("mypokebinder_sound_enabled");

        if (cachedTheme) {
            applyAndPersistTheme(cachedTheme);
        } else if (initialTheme) {
            applyAndPersistTheme(initialTheme);
        } else {
            applyThemeToDom("#ef4444");
        }

        if (cachedSound !== null) {
            const isEnabled = cachedSound === "true";
            setSoundEnabledState(isEnabled);
            setSoundMuted(!isEnabled);
        }

        fetchSettings();

        const handleVisibilityOrFocus = () => {
            if (document.visibilityState === "visible") {
                fetchSettings();
            }
        };

        window.addEventListener("focus", handleVisibilityOrFocus);
        document.addEventListener("visibilitychange", handleVisibilityOrFocus);

        let channel: ReturnType<typeof supabase.channel> | null = null;
        const supabase = createClient();

        async function setupRealtime() {
            const { data } = await supabase.auth.getUser();
            if (!data.user) return;

            channel = supabase
                .channel(`realtime:user_settings:${data.user.id}`)
                .on(
                    "postgres_changes",
                    {
                        event: "*",
                        schema: "public",
                        table: "user_settings",
                        filter: `user_id=eq.${data.user.id}`,
                    },
                    (payload) => {
                        const newRecord = payload.new as { theme_color?: string; sound_enabled?: boolean } | null;
                        if (newRecord?.theme_color) {
                            applyAndPersistTheme(newRecord.theme_color);
                        }
                        if (typeof newRecord?.sound_enabled === "boolean") {
                            setSoundEnabledState(newRecord.sound_enabled);
                            setSoundMuted(!newRecord.sound_enabled);
                            localStorage.setItem("mypokebinder_sound_enabled", String(newRecord.sound_enabled));
                        }
                    },
                )
                .subscribe();
        }

        setupRealtime();

        return () => {
            window.removeEventListener("focus", handleVisibilityOrFocus);
            document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
            if (channel) {
                supabase.removeChannel(channel);
            }
        };
    }, [initialTheme, applyAndPersistTheme, fetchSettings]);

    const setThemeColor = useCallback(
        async (newColor: string) => {
            applyAndPersistTheme(newColor);

            try {
                await fetch("/api/settings", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ theme_color: newColor }),
                });
            } catch {}
        },
        [applyAndPersistTheme],
    );

    const setSoundEnabled = useCallback(async (enabled: boolean) => {
        setSoundEnabledState(enabled);
        setSoundMuted(!enabled);
        if (typeof window !== "undefined") {
            localStorage.setItem("mypokebinder_sound_enabled", String(enabled));
        }

        try {
            await fetch("/api/settings", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sound_enabled: enabled }),
            });
        } catch {}
    }, []);

    const ballType = getBallTypeForTheme(themeColor);

    return (
        <UserSettingsContext.Provider
            value={{
                themeColor,
                ballType,
                soundEnabled,
                isLoading,
                setThemeColor,
                setSoundEnabled,
            }}
        >
            {children}
        </UserSettingsContext.Provider>
    );
}

export function useUserSettings() {
    const context = useContext(UserSettingsContext);
    if (!context) {
        throw new Error("useUserSettings must be used within a UserSettingsProvider");
    }
    return context;
}
