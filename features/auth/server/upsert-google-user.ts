import { prisma } from "@/lib/prisma";

type GoogleUserProfile = {
  email?: string | null;
  email_verified?: boolean;
  name?: string | null;
};

export async function upsertGoogleUser(profile: GoogleUserProfile | undefined) {
  const email = profile?.email?.trim().toLowerCase();
  const name = profile?.name?.trim();

  if (!email || !name || profile?.email_verified === false) {
    return false;
  }

  await prisma.user.upsert({
    where: { email },
    update: { name },
    create: {
      email,
      name,
    },
  });

  return true;
}
