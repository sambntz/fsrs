import { prisma } from "@/lib/prisma";

type GoogleUserProfile = {
  email?: string | null;
  email_verified?: boolean;
  name?: string | null;
};

function getValidGoogleProfile(profile: GoogleUserProfile | undefined) {
  const email = profile?.email?.trim().toLowerCase();
  const name = profile?.name?.trim();

  if (!email || !name || profile?.email_verified === false) {
    return null;
  }

  return { email, name };
}

export async function userExistsForGoogleProfile(
  profile: GoogleUserProfile | undefined
) {
  const googleProfile = getValidGoogleProfile(profile);

  if (!googleProfile) {
    return false;
  }

  const user = await prisma.user.findUnique({
    where: { email: googleProfile.email },
    select: { id: true },
  });

  if (!user) {
    return false;
  }

  await prisma.user.update({
    where: { email: googleProfile.email },
    data: { name: googleProfile.name },
  });

  return true;
}

export async function upsertGoogleUser(profile: GoogleUserProfile | undefined) {
  const googleProfile = getValidGoogleProfile(profile);

  if (!googleProfile) {
    return false;
  }

  await prisma.user.upsert({
    where: { email: googleProfile.email },
    update: { name: googleProfile.name },
    create: {
      email: googleProfile.email,
      name: googleProfile.name,
    },
  });

  return true;
}
