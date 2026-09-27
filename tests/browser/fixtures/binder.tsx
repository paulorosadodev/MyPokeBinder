import { createRoot } from "react-dom/client";
import { BinderClientPage } from "@/components/binder/BinderClientPage";
import { cards } from "./cards";

createRoot(document.getElementById("root")!).render(<BinderClientPage initialCards={cards} />);
