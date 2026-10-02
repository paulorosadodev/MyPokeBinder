export interface BinderCoverTheme {
    id: string;
    name: string;
    primaryColor: string;
    glowColor: string;
    bgGradient: string;
    borderAccent: string;
    leatherClass: string;
    ballType: "pokeball" | "greatball" | "ultraball" | "masterball" | "safariball" | "loveball" | "duskball" | "luxuryball";
    material: string;
}

export const BINDER_COVER_THEMES: Record<string, BinderCoverTheme> = {
    classic_red: {
        id: "classic_red",
        name: "Vermelho Clássico",
        primaryColor: "#ef4444",
        glowColor: "rgba(239, 68, 68, 0.4)",
        bgGradient: "from-[#2b0f14] via-[#1a0c10] to-[#0c0608]",
        borderAccent: "#ef4444",
        leatherClass: "border-red-900/40 bg-[#160b0e]",
        ballType: "pokeball",
        material: "Couro granulado",
    },
    ocean_blue: {
        id: "ocean_blue",
        name: "Azul Oceano",
        primaryColor: "#3b82f6",
        glowColor: "rgba(59, 130, 246, 0.4)",
        bgGradient: "from-[#0f1d2e] via-[#0c1524] to-[#060a12]",
        borderAccent: "#3b82f6",
        leatherClass: "border-blue-900/40 bg-[#0a111c]",
        ballType: "greatball",
        material: "Tecido técnico",
    },
    forest_green: {
        id: "forest_green",
        name: "Verde Floresta",
        primaryColor: "#10b981",
        glowColor: "rgba(16, 185, 129, 0.4)",
        bgGradient: "from-[#0e241b] via-[#091a13] to-[#050e0a]",
        borderAccent: "#10b981",
        leatherClass: "border-emerald-900/40 bg-[#07130e]",
        ballType: "safariball",
        material: "Lona encerada",
    },
    electric_yellow: {
        id: "electric_yellow",
        name: "Amarelo Elétrico",
        primaryColor: "#eab308",
        glowColor: "rgba(234, 179, 8, 0.4)",
        bgGradient: "from-[#2b240f] via-[#1c170a] to-[#0d0b05]",
        borderAccent: "#eab308",
        leatherClass: "border-yellow-900/40 bg-[#141107]",
        ballType: "ultraball",
        material: "Vinil texturizado",
    },
    shadow_purple: {
        id: "shadow_purple",
        name: "Roxo Noturno",
        primaryColor: "#a855f7",
        glowColor: "rgba(168, 85, 247, 0.4)",
        bgGradient: "from-[#23102d] via-[#180a20] to-[#0b040f]",
        borderAccent: "#a855f7",
        leatherClass: "border-purple-900/40 bg-[#120718]",
        ballType: "masterball",
        material: "Couro escovado",
    },
    charcoal_black: {
        id: "charcoal_black",
        name: "Couro Preto Ônix",
        primaryColor: "#94a3b8",
        glowColor: "rgba(148, 163, 184, 0.3)",
        bgGradient: "from-[#1c202a] via-[#13161e] to-[#090b0e]",
        borderAccent: "#cbd5e1",
        leatherClass: "border-slate-800 bg-[#0d0f14]",
        ballType: "duskball",
        material: "Couro liso",
    },
    golden_luxury: {
        id: "golden_luxury",
        name: "Dourado Nobre",
        primaryColor: "#f59e0b",
        glowColor: "rgba(245, 158, 11, 0.45)",
        bgGradient: "from-[#33220e] via-[#211508] to-[#0f0904]",
        borderAccent: "#f59e0b",
        leatherClass: "border-amber-900/40 bg-[#170f06]",
        ballType: "luxuryball",
        material: "Couro acetinado",
    },
};

export const ALLOWED_COVER_THEMES = Object.keys(BINDER_COVER_THEMES);

export function getCoverTheme(themeId?: string): BinderCoverTheme {
    return BINDER_COVER_THEMES[themeId || "classic_red"] || BINDER_COVER_THEMES.classic_red;
}
