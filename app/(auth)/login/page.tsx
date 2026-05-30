import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  AuthPage,
  getCurrentSession,
  getSafeCallbackUrl,
} from "@/features/auth";

export const metadata: Metadata = {
  title: "Login | FSRS Cards",
  description: "Inicia sesion con Google en FSRS Cards.",
};

type LoginPageProps = {
  searchParams: Promise<{
    callbackUrl?: string | string[];
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const callbackUrl = getSafeCallbackUrl((await searchParams).callbackUrl);
  const session = await getCurrentSession();

  if (session) {
    redirect(callbackUrl);
  }

  return (
    <AuthPage
      callbackUrl={callbackUrl}
      title="Volve a tus tarjetas sin friccion."
      description="Continua estudiando tus mazos con repeticion espaciada FSRS, progreso personal y una experiencia enfocada."
      googleLabel="Iniciar sesion con Google"
      footerText="Todavia no tienes cuenta?"
      footerHref="/register"
      footerLabel="Registrate"
    />
  );
}
