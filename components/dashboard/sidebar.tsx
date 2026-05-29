"use client";

import Link from "next/link";
import { BookOpenCheckIcon, LibraryBigIcon, SettingsIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "@/components/dashboard/sidebar-item";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const SIDEBAR_ITEMS = [
  {
    href: "/dashboard/decks",
    icon: LibraryBigIcon,
    label: "Mazos",
  },
  {
    href: "/dashboard/settings",
    icon: SettingsIcon,
    label: "Configuración",
  },
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-14 justify-center border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="FSRS Cards">
              <Link href="/dashboard/decks">
                <BookOpenCheckIcon />
                <span className="font-medium">FSRS Cards</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_ITEMS.map((item) => (
                <SidebarItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  isActive={isActivePath(pathname, item.href)}
                  label={item.label}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
