const PUBLIC_SHELL_PATHS = new Set(["/login", "/inicio", "/termos", "/privacidade", "/privacy", "/terms"]);

export function shouldShowAppHeader(pathname: string, isAuthenticated: boolean): boolean {
    if (!pathname) return false;
    if (PUBLIC_SHELL_PATHS.has(pathname)) return false;
    if (pathname === "/auth" || pathname.startsWith("/auth/")) return false;
    if (pathname === "/") return isAuthenticated;
    if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) return true;
    if (pathname === "/collection" || pathname.startsWith("/collection/")) return true;
    if (pathname.startsWith("/cards/")) return true;
    if (pathname === "/configuracoes" || pathname.startsWith("/configuracoes/")) return true;
    if (pathname === "/perfil" || pathname.startsWith("/perfil/")) return true;
    if (pathname === "/colecao" || pathname.startsWith("/colecao/")) return true;
    return false;
}
