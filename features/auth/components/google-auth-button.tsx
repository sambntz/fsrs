"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  AUTH_INTENT_COOKIE,
  type AuthIntent,
} from "@/features/auth/constants/auth-intent";

type GoogleAuthButtonProps = {
  intent: AuthIntent;
  callbackUrl: string;
  label: string;
};

function setAuthIntentCookie(intent: AuthIntent) {
  document.cookie = `${AUTH_INTENT_COOKIE}=${intent}; path=/; max-age=600; samesite=lax`;
}

export function GoogleAuthButton({
  intent,
  callbackUrl,
  label,
}: GoogleAuthButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      onClick={() => {
        setAuthIntentCookie(intent);
        signIn("google", { callbackUrl });
      }}
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
