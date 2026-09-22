import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AppToaster } from "@/components/ui/AppToaster";
import { UserSettingsProvider } from "@/lib/context/UserSettingsContext";
import { AuthProvider } from "@/lib/context/AuthContext";
import { createClient } from "@/lib/supabase/server";
import "./globals.css";

export const metadata: Metadata = {
    title: "MyPokeBinder | Pokémon TCG",
    description: "Binder digital interativo 3x3 para colecionadores das 151 cartas originais de Pokémon TCG.",
    colorScheme: "light",
};

function getFaviconSvg(color: string) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="${color}"/><path d="M 4 50 A 46 46 0 0 0 96 50 Z" fill="#f8fafc"/><line x1="4" y1="50" x2="96" y2="50" stroke="#0f172a" stroke-width="8"/><circle cx="50" cy="50" r="46" fill="none" stroke="#0f172a" stroke-width="8"/><circle cx="50" cy="50" r="16" fill="#0f172a"/><circle cx="50" cy="50" r="10" fill="#f8fafc"/><circle cx="50" cy="50" r="5" fill="${color}"/></svg>`;
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const themeCookie = cookieStore.get("mypokebinder_theme_color")?.value;
    const initialTheme = themeCookie && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(themeCookie) ? themeCookie : undefined;
    const effectiveTheme = initialTheme || "#ef4444";
    const initialFaviconUri = `data:image/svg+xml,${encodeURIComponent(getFaviconSvg(effectiveTheme))}`;

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const initialUser = user
        ? {
              id: user.id,
              email: user.email,
              name: user.user_metadata?.full_name || user.user_metadata?.name || user.user_metadata?.user_name || user.email?.split("@")[0] || "Treinador Pokémon",
              avatarUrl: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
          }
        : null;

    return (
        <html
            lang="pt-BR"
            suppressHydrationWarning
            style={
                initialTheme
                    ? ({
                          "--theme-primary": initialTheme,
                          "--color-poke-blue": initialTheme,
                          "--theme-primary-hover": `color-mix(in srgb, ${initialTheme} 85%, black)`,
                          "--theme-primary-glow": `color-mix(in srgb, ${initialTheme} 40%, transparent)`,
                      } as React.CSSProperties)
                    : undefined
            }
        >
            <head>
                <meta name="color-scheme" content="light" />
                <link id="app-dynamic-favicon" rel="icon" type="image/svg+xml" href={initialFaviconUri} />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var c=localStorage.getItem('mypokebinder_theme_color');if(c&&/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(c)){var r=document.documentElement;r.style.setProperty('--theme-primary',c);r.style.setProperty('--color-poke-blue',c);r.style.setProperty('--theme-primary-hover','color-mix(in srgb, '+c+' 85%, black)');r.style.setProperty('--theme-primary-glow','color-mix(in srgb, '+c+' 40%, transparent)');var f=document.getElementById('app-dynamic-favicon');if(f){var s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M 4 50 A 46 46 0 0 1 96 50 Z" fill="'+c+'"/><path d="M 4 50 A 46 46 0 0 0 96 50 Z" fill="#f8fafc"/><line x1="4" y1="50" x2="96" y2="50" stroke="#0f172a" stroke-width="8"/><circle cx="50" cy="50" r="46" fill="none" stroke="#0f172a" stroke-width="8"/><circle cx="50" cy="50" r="16" fill="#0f172a"/><circle cx="50" cy="50" r="10" fill="#f8fafc"/><circle cx="50" cy="50" r="5" fill="'+c+'"/></svg>';f.href='data:image/svg+xml,'+encodeURIComponent(s);}}}catch(e){}})();`,
                    }}
                />
            </head>
            <body className="antialiased selection:bg-red-500/30 selection:text-white" suppressHydrationWarning>
                <AuthProvider initialUser={initialUser}>
                    <UserSettingsProvider initialTheme={initialTheme}>
                        {children}
                        <AppToaster />
                    </UserSettingsProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
