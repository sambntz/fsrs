"use client";

import { signIn } from "next-auth/react";

type GoogleAuthButtonProps = {
  label: string;
};

export function GoogleAuthButton({ label }: GoogleAuthButtonProps) {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="flex h-12 w-full items-center justify-center gap-3 rounded-md border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-950 shadow-sm transition-colors hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2"
    >
      <span
        className="flex size-5 items-center justify-center rounded-full border border-zinc-200 text-xs font-semibold text-zinc-700"
        aria-hidden="true"
      >
        G
      </span>
      {label}
    </button>
  );
}
