import type { Metadata } from "next";
import { SettingsPage } from "@/features/settings";

export const metadata: Metadata = {
  title: "Configuración | FSRS Cards",
  description: "Configuracion inicial de usuario para FSRS Cards.",
};

export default function Page() {
  return <SettingsPage />;
}
