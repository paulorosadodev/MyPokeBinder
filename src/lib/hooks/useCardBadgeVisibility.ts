"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "mypokebinder_collection_show_card_badges";

export function useCardBadgeVisibility() {
    const [showCardBadges, setShowCardBadges] = useState(true);

    useEffect(() => {
        try {
            const cached = localStorage.getItem(STORAGE_KEY);
            if (cached === "true" || cached === "false") setShowCardBadges(cached === "true");
        } catch {}
    }, []);

    const setCardBadgeVisibility = useCallback((showBadges: boolean) => {
        setShowCardBadges(showBadges);
        try {
            localStorage.setItem(STORAGE_KEY, String(showBadges));
        } catch {}
    }, []);

    return { showCardBadges, setCardBadgeVisibility };
}
