import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-950">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-4xl flex-col items-center justify-center text-center">
        <p className="text-sm font-semibold text-zinc-600">FSRS Cards</p>
        <div className="mt-6 max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">
            Flashcards modernas con repeticion espaciada.
          </h1>
          <p className="mt-6 text-base leading-7 text-zinc-600 sm:text-lg">
            Estudia mazos, importa tarjetas y guarda tu progreso usando Google
            como unico metodo de autenticacion.
          </p>
        </div>

        <div className="mt-10 flex w-full max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            className="flex h-12 items-center justify-center rounded-md bg-zinc-950 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
            href="/register"
          >
            Registrarse
          </Link>
          <Link
            className="flex h-12 items-center justify-center rounded-md border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-50"
            href="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
