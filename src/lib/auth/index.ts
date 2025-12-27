/**
 * NextAuth.js v5 Configuration
 *
 * Authentication setup for multi-tenant eCommerce platform.
 * Uses Credentials provider with bcrypt password validation.
 */

import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/db";
import type { UserRole } from "@prisma/client";

// Extend the built-in types
declare module "next-auth" {
  interface User {
    role: UserRole;
    tenantId: string | null;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      role: UserRole;
      tenantId: string | null;
    };
  }
}

// Custom JWT payload type
interface CustomJWT {
  id?: string;
  role?: UserRole;
  tenantId?: string | null;
}

const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        tenantId: { label: "Tenant ID", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y contraseña son requeridos");
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        // Super Admin mode is explicitly requested with tenantId = ""
        // If tenantId is not provided, it's a regular login (search by email only)
        const isSuperAdmin = credentials.tenantId === "";

        // Find user by email
        // If Super Admin mode, look for user without tenant (tenantId: null)
        // Otherwise, find any user with this email (tenant or non-tenant)
        const user = await prisma.user.findFirst({
          where: isSuperAdmin ? { email, tenantId: null } : { email },
          include: {
            tenant: true,
          },
        });

        if (!user) {
          throw new Error("Credenciales inválidas");
        }

        if (!user.password) {
          throw new Error("Esta cuenta no tiene contraseña configurada");
        }

        // Verify password
        const isValidPassword = await compare(password, user.password);

        if (!isValidPassword) {
          throw new Error("Credenciales inválidas");
        }

        // Check if tenant is active (for non-super-admins)
        if (user.tenant && !user.tenant.isActive) {
          throw new Error("Esta tienda está desactivada");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          tenantId: user.tenantId,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const customToken = token as CustomJWT & typeof token;
      if (user) {
        customToken.id = user.id as string;
        customToken.role = user.role;
        customToken.tenantId = user.tenantId;
      }
      return customToken;
    },
    async session({ session, token }) {
      const customToken = token as CustomJWT;
      if (customToken && session.user) {
        session.user.id = customToken.id || "";
        session.user.role = customToken.role || "USER";
        session.user.tenantId = customToken.tenantId || null;
      }
      return session;
    },
    async authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = request.nextUrl.pathname.startsWith("/admin");
      const isOnAuth =
        request.nextUrl.pathname.startsWith("/login") ||
        request.nextUrl.pathname.startsWith("/register");

      // Redirect logged-in users away from auth pages
      if (isOnAuth && isLoggedIn) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      // Protect admin routes
      if (isOnAdmin && !isLoggedIn) {
        return false; // Redirect to login
      }

      return true;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
