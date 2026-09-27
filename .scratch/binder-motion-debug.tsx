import { createRoot } from "react-dom/client";
import { BinderClientPage } from "../src/components/binder/BinderClientPage";
import { UserSettingsContext } from "../src/lib/context/UserSettingsContext";
const params = new URLSearchParams(location.search);
const settings = params.has("static") ? { animationsEnabled: false } : null;
createRoot(document.getElementById("root")!).render(<UserSettingsContext.Provider value={settings as any}><BinderClientPage initialCards={[]} /></UserSettingsContext.Provider>);
