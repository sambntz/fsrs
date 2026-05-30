"use client";

import { signOut } from "next-auth/react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";
import { LOGIN_PATH } from "@/features/auth/constants/routes";

type DashboardUser = {
  email?: string | null;
  image?: string | null;
  name?: string | null;
};

type UserNavProps = {
  user: DashboardUser;
};

function getDisplayName(user: DashboardUser) {
  return user.name || user.email || "Usuario";
}

function getInitials(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function UserNav({ user }: UserNavProps) {
  const displayName = getDisplayName(user);
  const fallback = getInitials(displayName) || "U";

  return (
    <div className="ml-auto flex min-w-0 items-center gap-2">
      <div className="flex items-center gap-3">
        <Avatar size="sm">
          {user.image ? <AvatarImage alt={displayName} src={user.image} /> : null}
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <span className="hidden max-w-40 truncate text-sm font-medium sm:block">
          {displayName}
        </span>
      </div>
      <ThemeToggle />
      <Button
        type="button"
        variant="link"
        size="sm"
        className="px-0"
        onClick={() => signOut({ callbackUrl: LOGIN_PATH })}
      >
        Cerrar sesión
      </Button>
    </div>
  );
}
