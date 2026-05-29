import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/server/auth-options";

export function getCurrentSession() {
  return getServerSession(authOptions);
}
