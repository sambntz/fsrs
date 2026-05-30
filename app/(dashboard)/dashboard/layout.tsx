import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  AUTH_CALLBACK_URL_PARAM,
  DASHBOARD_HOME_PATH,
  LOGIN_PATH,
} from "@/features/auth/constants/routes";
import { getCurrentSession } from "@/features/auth";

export const metadata: Metadata = {
  title: "Dashboard | FSRS Cards",
  description: "Gestiona tus mazos, sesiones y configuracion de FSRS Cards.",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCurrentSession();

  if (!session) {
    const params = new URLSearchParams({
      [AUTH_CALLBACK_URL_PARAM]: DASHBOARD_HOME_PATH,
    });

    redirect(`${LOGIN_PATH}?${params.toString()}`);
  }

  return <DashboardLayout user={session.user ?? {}}>{children}</DashboardLayout>;
}
