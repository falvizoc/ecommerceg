"use client";

/**
 * Session Provider
 *
 * Wraps the app with NextAuth.js SessionProvider for client-side session access.
 */

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

interface SessionProviderProps {
  children: React.ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
