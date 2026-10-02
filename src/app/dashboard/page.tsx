import { redirect, RedirectType } from "next/navigation";

export default function DashboardPage() {
    redirect("/", RedirectType.replace);
}
