import { cookies } from "next/headers";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {
  AUTH_INTENT_COOKIE,
  AUTH_INTENTS,
} from "@/features/auth/constants/auth-intent";
import {
  DASHBOARD_HOME_PATH,
  LOGIN_PATH,
} from "@/features/auth/constants/routes";
import {
  upsertGoogleUser,
  userExistsForGoogleProfile,
} from "@/features/auth/server/upsert-google-user";

async function getAuthIntent() {
  const authIntent = (await cookies()).get(AUTH_INTENT_COOKIE)?.value;

  if (authIntent === AUTH_INTENTS.REGISTER) {
    return AUTH_INTENTS.REGISTER;
  }

  return AUTH_INTENTS.LOGIN;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: LOGIN_PATH,
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider !== "google") {
        return false;
      }

      const authIntent = await getAuthIntent();

      if (authIntent === AUTH_INTENTS.LOGIN) {
        const userExists = await userExistsForGoogleProfile(profile);

        if (!userExists) {
          return `${LOGIN_PATH}?error=not_registered`;
        }

        return true;
      }

      return upsertGoogleUser(profile);
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/") && !url.startsWith("//")) {
        return `${baseUrl}${url}`;
      }

      if (url.startsWith(baseUrl)) {
        return url;
      }

      return `${baseUrl}${DASHBOARD_HOME_PATH}`;
    },
  },
};
