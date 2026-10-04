const PUBLIC_SHELL_PATHS = new Set(["/login", "/inicio", "/termos", "/privacidade"]);

export function shouldShowAppHeader(pathname: string, isAuthenticated: boolean): boolean {
    if (!pathname) return false;
    if (PUBLIC_SHELL_PATHS.has(pathname)) return false;
    if (pathname === "/auth" || pathname.startsWith("/auth/")) return false;
    if (pathname === "/") return isAuthenticated;
    if (pathname === "/colecao" || pathname.startsWith("/colecao/")) return true;
    if (pathname.startsWith("/cartas/")) return true;
    if (pathname === "/configuracoes" || pathname.startsWith("/configuracoes/")) return true;
    if (pathname === "/perfil" || pathname.startsWith("/perfil/")) return true;
    return false;
}

export function isSharedProfileOrCollectionRoute(pathname: string): boolean {
    if (!pathname) return false;
    return pathname.startsWith("/perfil/") || pathname.startsWith("/colecao/");
}

export function shouldShowNavPages(pathname: string, isAuthenticated: boolean): boolean {
    if (!isAuthenticated) return false;
    return true;
}
