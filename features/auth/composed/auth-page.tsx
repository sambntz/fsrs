import Link from "next/link";
import { GoogleAuthButton } from "@/features/auth/components/google-auth-button";

type AuthPageProps = {
  title: string;
  description: string;
  googleLabel: string;
  footerText: string;
  footerHref: string;
  footerLabel: string;
};

export function AuthPage({
  title,
  description,
  googleLabel,
  footerText,
  footerHref,
  footerLabel,
}: AuthPageProps) {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-950">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
        <section className="grid w-full gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <Link
              href="/"
              className="inline-flex text-sm font-semibold text-zinc-950"
            >
              FSRS Cards
            </Link>
            <h1 className="mt-8 text-4xl font-semibold tracking-normal text-zinc-950 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-base leading-7 text-zinc-600 sm:text-lg">
              {description}
            </p>
            <div className="mt-10 grid gap-4 text-sm text-zinc-600 sm:grid-cols-3">
              <span>Google OAuth</span>
              <span>FSRS scheduler</span>
              <span>HTML cards</span>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold tracking-normal text-zinc-950">
                {googleLabel}
              </h2>
              <p className="text-sm leading-6 text-zinc-600">
                Este proyecto solo permite autenticacion con Google.
              </p>
            </div>

            <div className="mt-8">
              <GoogleAuthButton label={googleLabel} />
            </div>

            <p className="mt-6 text-center text-sm text-zinc-600">
              {footerText}{" "}
              <Link
                href={footerHref}
                className="font-medium text-zinc-950 underline-offset-4 hover:underline"
              >
                {footerLabel}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
