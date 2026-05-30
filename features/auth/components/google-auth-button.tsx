"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

type GoogleAuthButtonProps = {
  callbackUrl: string;
  label: string;
};

export function GoogleAuthButton({ callbackUrl, label }: GoogleAuthButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      onClick={() => signIn("google", { callbackUrl })}
      className="w-full"
    >
      <span
        data-icon="inline-start"
        className="flex size-5 items-center justify-center rounded-full border text-xs font-semibold"
        aria-hidden="true"
      >
        G
      </span>
      {label}
    </Button>
  );
}
