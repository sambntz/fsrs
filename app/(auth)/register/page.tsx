import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  AuthPage,
  getCurrentSession,
  getSafeCallbackUrl,
} from "@/features/auth";
import { AUTH_INTENTS } from "@/features/auth/constants/auth-intent";

export const metadata: Metadata = {
  title: "Registro | FSRS Cards",
  description: "Crea tu cuenta con Google en FSRS Cards.",
};

type RegisterPageProps = {
  searchParams: Promise<{
    callbackUrl?: string | string[];
  }>;
};

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
  const callbackUrl = getSafeCallbackUrl((await searchParams).callbackUrl);
  const session = await getCurrentSession();

  if (session) {
    redirect(callbackUrl);
  }

  return (
    <AuthPage
      intent={AUTH_INTENTS.REGISTER}
      callbackUrl={callbackUrl}
      title="Crea tu espacio de estudio inteligente."
      description="Empieza con Google y prepara tus mazos para estudiar con FSRS, tarjetas enriquecidas y progreso por usuario."
      googleLabel="Registrarse con Google"
      footerText="Ya tienes cuenta?"
      footerHref="/login"
      footerLabel="Inicia sesion"
    />
  );
}
