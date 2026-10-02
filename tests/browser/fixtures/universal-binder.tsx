import { useRef, useState } from "react";
import { UniversalBinderBook, type UniversalBinderNavigationHandle } from "@/components/binder/UniversalBinderBook";
import { UniversalBinderViewer } from "@/components/binder/UniversalBinderViewer";
import { BinderShelfBook } from "@/components/shelf/BinderShelfBook";
import type { Binder } from "@/types/binder";

const binder: Binder = { id: "teste", user_id: "teste", name: "Capa de teste", description: "", grid_type: "3x3", total_pages: 1, cover_theme: "red", is_public: false, is_featured: false, created_at: "", updated_at: "" };
const slots: [] = [];
const onSlotClick = () => {};

export function UniversalBinderFixture() {
    const ref = useRef<UniversalBinderNavigationHandle>(null);
    const [page, setPage] = useState(1);
    return (
        <div style={{ width: 1100, height: 760 }}>
            <button onClick={() => ref.current?.flipNext()}>Avançar teste</button>
            <UniversalBinderBook ref={ref} binder={binder} slots={slots} currentPage={page} entryTargetPage={1} isMobile={false} onPageChange={setPage} onSlotClick={onSlotClick} />
        </div>
    );
}

const viewerBinder: Binder = { ...binder, total_pages: 4 };
const viewerSlots = Array.from({ length: 36 }, (_, index) => ({
    id: `slot-${index + 1}`,
    binder_id: viewerBinder.id,
    page_number: Math.floor(index / 9) + 1,
    slot_index: index % 9,
    slot_type: "pokemon" as const,
    target_dex_id: index === 35 ? 151 : index + 1,
    created_at: "",
    updated_at: "",
}));

export function UniversalBinderViewerFixture() {
    return <UniversalBinderViewer binder={viewerBinder} initialSlots={viewerSlots} />;
}

const shelfBinder: Binder = {
    ...binder,
    name: "Kanto 151 Original",
    total_cards: 89,
    total_slots: 160,
    cover_pokemon_dex_id: 94,
    preview_cards: [
        { id: "preview-1", card_name: "Charizard", card_image_url: "/pokemon-card-back.png" },
        { id: "preview-2", card_name: "Moltres", card_image_url: "/pokemon-card-back.png" },
        { id: "preview-3", card_name: "Articuno", card_image_url: "/pokemon-card-back.png" },
    ],
};

export function BinderShelfBookFixture() {
    const [active, setActive] = useState(false);

    return (
        <div className="relative min-h-[900px] bg-[#080b10] px-12 pt-40">
            <div className="absolute top-16 right-8 left-8 z-20 h-20 rounded-2xl border border-white/10 bg-[#121520]" />
            <div id="shelf-card" tabIndex={0} className="binder-shelf-card relative flex w-[300px] flex-col rounded-[20px] border border-white/10 bg-[#10131b] p-3" onMouseEnter={() => setActive(true)} onMouseLeave={() => setActive(false)} onFocus={() => setActive(true)} onBlur={() => setActive(false)}>
                <BinderShelfBook binder={shelfBinder} active={active} />
                <div className="h-36 pt-5 text-white">Kanto 151 Original</div>
            </div>
            <div className="absolute top-40 left-[330px] z-10 h-[520px] w-[300px] rounded-[20px] border border-white/10 bg-[#151923]" />
        </div>
    );
}
