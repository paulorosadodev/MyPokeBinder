import { NextResponse, type NextRequest } from "next/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth";
import { buildProfileFromCards } from "@/lib/profile/buildProfile";
import { usernameFromEmail, validateBio, validateDisplayName, validateUsername } from "@/lib/profile/username";
import type { UserCard } from "@/types/binder";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function ensureOwnProfile(supabase: Awaited<ReturnType<typeof getAuthenticatedUser>>["supabase"], user: NonNullable<Awaited<ReturnType<typeof getAuthenticatedUser>>["user"]>) {
    const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || null;
    const defaultUsername = usernameFromEmail(user.email);

    const { data: existing } = await supabase.from("profiles").select("id, username, theme_color").eq("id", user.id).maybeSingle();

    if (!existing) {
        let username = defaultUsername;
        let n = 0;
        while (true) {
            const candidate = n === 0 ? username : `${username.slice(0, Math.max(1, 20 - String(n).length))}${n}`;
            const { data: clash } = await supabase.from("profiles").select("id").eq("username", candidate).maybeSingle();
            if (!clash) {
                username = candidate;
                break;
            }
            n += 1;
        }

        await supabase.from("profiles").insert({
            id: user.id,
            display_name: username,
            avatar_url: avatarUrl,
            username,
            theme_color: "#ef4444",
            updated_at: new Date().toISOString(),
        });
    } else if (avatarUrl) {
        await supabase
            .from("profiles")
            .update({
                avatar_url: avatarUrl,
                updated_at: new Date().toISOString(),
            })
            .eq("id", user.id);
    }

    const { data: settings } = await supabase.from("user_settings").select("theme_color").eq("user_id", user.id).maybeSingle();
    if (settings?.theme_color) {
        await supabase.from("profiles").update({ theme_color: settings.theme_color }).eq("id", user.id);
    }

    const { data: profile } = await supabase.from("profiles").select("id, username, display_name, avatar_url, created_at, theme_color, bio, favorite_card_ids").eq("id", user.id).single();

    return profile;
}

export async function GET(request: NextRequest) {
    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }
    const { user, supabase } = auth;

    const profileRow = await ensureOwnProfile(supabase, user);
    if (!profileRow) {
        return NextResponse.json({ error: "Perfil não encontrado" }, { status: 500 });
    }

    const { data: cardsData, error } = await supabase.from("user_cards").select("*").eq("user_id", user.id).order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const profile = buildProfileFromCards({
        user: {
            id: user.id,
            username: profileRow.username,
            name: profileRow.display_name || profileRow.username,
            email: user.email,
            avatarUrl: profileRow.avatar_url,
            createdAt: profileRow.created_at || user.created_at,
            bio: profileRow.bio,
        },
        cards: (cardsData ?? []) as UserCard[],
        isOwner: true,
        themeColor: profileRow.theme_color,
        favoriteCardIds: profileRow.favorite_card_ids ?? [],
    });

    return NextResponse.json({ profile });
}

export async function PATCH(request: NextRequest) {
    const auth = await getAuthenticatedUser(request);
    if (auth.response) {
        return auth.response;
    }
    const { user, supabase } = auth;

    try {
        const body = await request.json();
        const updates: Record<string, unknown> = {
            updated_at: new Date().toISOString(),
        };

        if (typeof body.username === "string") {
            const validated = validateUsername(body.username);
            if (!validated.ok) {
                return NextResponse.json({ error: validated.error }, { status: 400 });
            }

            const { data: clash } = await supabase.from("profiles").select("id").eq("username", validated.username).neq("id", user.id).maybeSingle();

            if (clash) {
                return NextResponse.json({ error: "Este username já está em uso." }, { status: 409 });
            }

            updates.username = validated.username;
        }

        if (typeof body.display_name === "string" || typeof body.name === "string") {
            const validated = validateDisplayName(typeof body.display_name === "string" ? body.display_name : body.name);
            if (!validated.ok) {
                return NextResponse.json({ error: validated.error }, { status: 400 });
            }
            updates.display_name = validated.displayName;
        }

        if (typeof body.bio === "string") {
            const validated = validateBio(body.bio);
            if (!validated.ok) {
                return NextResponse.json({ error: validated.error }, { status: 400 });
            }
            updates.bio = validated.bio;
        }

        if (Array.isArray(body.favorite_card_ids)) {
            const rawIds = body.favorite_card_ids.filter((id: unknown): id is string => typeof id === "string");
            if (rawIds.length > 4) {
                return NextResponse.json({ error: "Escolha no máximo 4 cartas favoritas." }, { status: 400 });
            }
            for (const id of rawIds) {
                if (!UUID_RE.test(id)) {
                    return NextResponse.json({ error: "ID de carta inválido." }, { status: 400 });
                }
            }
            const uniqueIds = [...new Set(rawIds)];
            if (uniqueIds.length > 0) {
                const { data: owned, error: ownedError } = await supabase.from("user_cards").select("id").eq("user_id", user.id).in("id", uniqueIds);
                if (ownedError) {
                    return NextResponse.json({ error: ownedError.message }, { status: 500 });
                }
                if ((owned ?? []).length !== uniqueIds.length) {
                    return NextResponse.json({ error: "Só é possível destacar cartas da sua coleção." }, { status: 400 });
                }
            }
            updates.favorite_card_ids = uniqueIds;
        }

        if (Object.keys(updates).length === 1) {
            return NextResponse.json({ error: "Nenhuma alteração enviada." }, { status: 400 });
        }

        const { data, error } = await supabase.from("profiles").update(updates).eq("id", user.id).select("id, username, display_name, avatar_url, theme_color, bio, favorite_card_ids").single();

        if (error) {
            if (error.code === "23505") {
                return NextResponse.json({ error: "Este username já está em uso." }, { status: 409 });
            }
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({
            profile: {
                id: data.id,
                username: data.username,
                name: data.display_name,
                avatarUrl: data.avatar_url,
                themeColor: data.theme_color,
                bio: data.bio,
                favoriteCardIds: data.favorite_card_ids ?? [],
            },
        });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Erro interno";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
