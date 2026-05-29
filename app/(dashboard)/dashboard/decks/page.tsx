import type { Metadata } from "next";
import { DecksPage } from "@/features/decks";

export const metadata: Metadata = {
  title: "Mazos | FSRS Cards",
  description: "Lista inicial de mazos para FSRS Cards.",
};

export default function Page() {
  return <DecksPage />;
}
