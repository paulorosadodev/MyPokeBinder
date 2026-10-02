import { createRoot } from "react-dom/client";
import { useState } from "react";
import { BinderClientPage } from "@/components/binder/BinderClientPage";
import { CardSearchModal } from "@/components/modal/CardSearchModal";
import { UserSettingsContext, type UserSettingsContextType } from "@/lib/context/UserSettingsContext";
import { cards } from "./cards";

const settings: UserSettingsContextType | null = new URLSearchParams(location.search).has("static")
    ? {
          themeColor: "#10b981",
          ballType: "safariball",
          soundEnabled: false,
          animationsEnabled: false,
          isLoading: false,
          setThemeColor: async () => {},
          setSoundEnabled: async () => {},
          setAnimationsEnabled: async () => {},
      }
    : null;

const params = new URLSearchParams(location.search);
const universalModule = params.has("universal") || params.has("shelf") ? await import("./universal-binder") : null;
const UniversalFixture = params.has("shelf") ? universalModule?.BinderShelfBookFixture : params.has("universalViewer") ? universalModule?.UniversalBinderViewerFixture : universalModule?.UniversalBinderFixture;

function CardSearchFixture() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button id="open-card-search" type="button" onClick={() => setIsOpen(true)}>
                Abrir catálogo
            </button>
            <CardSearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} onCardAdded={() => setIsOpen(false)} />
        </>
    );
}

const content = new URLSearchParams(location.search).has("cardSearch") ? <CardSearchFixture /> : UniversalFixture ? <UniversalFixture /> : <BinderClientPage initialCards={cards} />;

createRoot(document.getElementById("root")!).render(<UserSettingsContext.Provider value={settings}>{content}</UserSettingsContext.Provider>);
