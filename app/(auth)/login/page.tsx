import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  AuthPage,
  getCurrentSession,
  getSafeCallbackUrl,
} from "@/features/auth";
import { AUTH_INTENTS } from "@/features/auth/constants/auth-intent";

export const metadata: Metadata = {
  title: "Login | FSRS Cards",
  description: "Inicia sesion con Google en FSRS Cards.",
};

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string | string[];
    error?: string | string[];
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const callbackUrl = getSafeCallbackUrl(params.callbackUrl);
  const error = Array.isArray(params.error) ? params.error[0] : params.error;
  const session = await getCurrentSession();

  if (session) {
    redirect(callbackUrl);
  }

  return (
    <AuthPage
      intent={AUTH_INTENTS.LOGIN}
      callbackUrl={callbackUrl}
      title="Volve a tus tarjetas sin friccion."
      description="Continua estudiando tus mazos con repeticion espaciada FSRS, progreso personal y una experiencia enfocada."
      errorMessage={
        error === "not_registered"
          ? "No encontramos una cuenta registrada con ese Google. Registrate primero para poder iniciar sesion."
          : undefined
      }
      googleLabel="Iniciar sesion con Google"
      footerText="Todavia no tienes cuenta?"
      footerHref="/register"
      footerLabel="Registrate"
    />
  );
}
