import type { Metadata } from "next";
import { AuthPage } from "@/features/auth";

export const metadata: Metadata = {
  title: "Login | FSRS Cards",
  description: "Inicia sesion con Google en FSRS Cards.",
};

export default function LoginPage() {
  return (
    <AuthPage
      title="Volve a tus tarjetas sin friccion."
      description="Continua estudiando tus mazos con repeticion espaciada FSRS, progreso personal y una experiencia enfocada."
      googleLabel="Iniciar sesion con Google"
      footerText="Todavia no tienes cuenta?"
      footerHref="/register"
      footerLabel="Registrate"
    />
  );
}
