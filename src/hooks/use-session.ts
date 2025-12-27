/**
 * Session Hook
 *
 * Custom hook for accessing user session with type safety.
 * Re-exports useSession from next-auth/react with extended types.
 */

"use client";

import { useSession as useNextAuthSession } from "next-auth/react";
import type { UserRole } from "@prisma/client";

export interface SessionUser {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  tenantId: string | null;
}

export function useSession() {
  const session = useNextAuthSession();

  return {
    ...session,
    user: session.data?.user as SessionUser | undefined,
    isAuthenticated: session.status === "authenticated",
    isLoading: session.status === "loading",
    isSuperAdmin: session.data?.user?.role === "SUPER_ADMIN",
    isAdmin:
      session.data?.user?.role === "ADMIN" ||
      session.data?.user?.role === "SUPER_ADMIN",
  };
}
