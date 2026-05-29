import type { Metadata } from "next";
import { AuthPage } from "@/features/auth";

export const metadata: Metadata = {
  title: "Registro | FSRS Cards",
  description: "Crea tu cuenta con Google en FSRS Cards.",
};

export default function RegisterPage() {
  return (
    <AuthPage
      title="Crea tu espacio de estudio inteligente."
      description="Empieza con Google y prepara tus mazos para estudiar con FSRS, tarjetas enriquecidas y progreso por usuario."
      googleLabel="Registrarse con Google"
      footerText="Ya tienes cuenta?"
      footerHref="/login"
      footerLabel="Inicia sesion"
    />
  );
}
