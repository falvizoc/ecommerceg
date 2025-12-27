/**
 * NextAuth.js Route Handler
 *
 * Handles all authentication API routes:
 * - POST /api/auth/signin
 * - POST /api/auth/signout
 * - GET /api/auth/session
 * - GET /api/auth/csrf
 * - etc.
 */

import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
