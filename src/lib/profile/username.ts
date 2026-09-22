import type { CSSProperties } from "react";

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 20;
export const DISPLAY_NAME_MIN_LENGTH = 1;
export const DISPLAY_NAME_MAX_LENGTH = 40;
export const BIO_MAX_LENGTH = 160;

export const USERNAME_REGEX = /^[a-z][a-z0-9_]{2,19}$/;

const RESERVED_USERNAMES = new Set(["api", "auth", "login", "logout", "perfil", "profile", "configuracoes", "settings", "collection", "colecao", "dashboard", "cards", "inicio", "home", "admin", "me", "termos", "terms", "privacy", "privacidade", "mypokebinder"]);

export function sanitizeUsernameCandidate(raw: string): string {
    let value = raw
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, "");
    if (!value) {
        return "treinador";
    }
    if (!/^[a-z]/.test(value)) {
        value = `t${value}`;
    }
    if (value.length > USERNAME_MAX_LENGTH) {
        value = value.slice(0, USERNAME_MAX_LENGTH);
    }
    if (value.length < USERNAME_MIN_LENGTH) {
        value = `${value}xxx`.slice(0, USERNAME_MIN_LENGTH);
    }
    return value;
}

export function usernameFromEmail(email?: string | null): string {
    const local = (email || "treinador").split("@")[0] || "treinador";
    return sanitizeUsernameCandidate(local);
}

export function validateUsername(raw: string): { ok: true; username: string } | { ok: false; error: string } {
    const username = raw.trim().toLowerCase();

    if (!USERNAME_REGEX.test(username)) {
        return {
            ok: false,
            error: "Use 3–20 caracteres: comece com letra; só letras minúsculas, números e _.",
        };
    }

    if (RESERVED_USERNAMES.has(username)) {
        return { ok: false, error: "Este username não está disponível." };
    }

    return { ok: true, username };
}

export function validateDisplayName(raw: string): { ok: true; displayName: string } | { ok: false; error: string } {
    const displayName = raw.trim().replace(/\s+/g, " ");

    if (displayName.length < DISPLAY_NAME_MIN_LENGTH || displayName.length > DISPLAY_NAME_MAX_LENGTH) {
        return {
            ok: false,
            error: `O nome deve ter entre ${DISPLAY_NAME_MIN_LENGTH} e ${DISPLAY_NAME_MAX_LENGTH} caracteres.`,
        };
    }

    return { ok: true, displayName };
}

export function validateBio(raw: string): { ok: true; bio: string | null } | { ok: false; error: string } {
    const bio = raw.trim().replace(/\s+/g, " ");

    if (bio.length === 0) {
        return { ok: true, bio: null };
    }

    if (bio.length > BIO_MAX_LENGTH) {
        return {
            ok: false,
            error: `A descrição deve ter no máximo ${BIO_MAX_LENGTH} caracteres.`,
        };
    }

    return { ok: true, bio };
}

export function buildThemeCssVars(themeColor: string): CSSProperties {
    const color = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(themeColor) ? themeColor : "#ef4444";
    return {
        ["--theme-primary" as string]: color,
        ["--color-poke-blue" as string]: color,
        ["--theme-primary-hover" as string]: `color-mix(in srgb, ${color} 85%, black)`,
        ["--theme-primary-glow" as string]: `color-mix(in srgb, ${color} 40%, transparent)`,
    };
}
