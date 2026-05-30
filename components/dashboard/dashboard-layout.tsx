import type { ReactNode } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { SidebarToggle } from "@/components/dashboard/sidebar-toggle";
import { UserNav } from "@/components/dashboard/user-nav";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type DashboardUser = {
  email?: string | null;
  image?: string | null;
  name?: string | null;
};

type DashboardLayoutProps = {
  children: ReactNode;
  user: DashboardUser;
};

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen>
      <DashboardSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <SidebarToggle />
            <p className="truncate text-sm font-medium">Dashboard</p>
          </div>
          <UserNav user={user} />
        </header>
        <main className="flex flex-1 flex-col px-4 py-6 md:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
