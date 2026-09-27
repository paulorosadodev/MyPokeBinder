import { createRoot } from "react-dom/client";
import { BinderClientPage } from "@/components/binder/BinderClientPage";
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

createRoot(document.getElementById("root")!).render(
    <UserSettingsContext.Provider value={settings}>
        <BinderClientPage initialCards={cards} />
    </UserSettingsContext.Provider>,
);
