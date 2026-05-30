import { DASHBOARD_HOME_PATH } from "@/features/auth/constants/routes";

export function getSafeCallbackUrl(
  callbackUrl: string | string[] | undefined
) {
  const value = Array.isArray(callbackUrl) ? callbackUrl[0] : callbackUrl;

  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return DASHBOARD_HOME_PATH;
  }

  return value;
}
