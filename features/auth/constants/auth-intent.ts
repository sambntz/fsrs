export const AUTH_INTENT_COOKIE = "fsrs_auth_intent";

export const AUTH_INTENTS = {
  LOGIN: "login",
  REGISTER: "register",
} as const;

export type AuthIntent = (typeof AUTH_INTENTS)[keyof typeof AUTH_INTENTS];
