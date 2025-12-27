"use client";

/**
 * Login Page
 *
 * Multi-tenant login with email/password authentication.
 * Super admins login without tenant, regular users with their tenant.
 */

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, ShoppingBag, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const error = searchParams.get("error");

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(
    error === "CredentialsSignin" ? "Credenciales inválidas" : null
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isSuperAdmin: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError(null);

    try {
      // Build credentials dynamically - only include tenantId for Super Admin mode
      const credentials: Record<string, string | boolean> = {
        email: formData.email,
        password: formData.password,
        redirect: false,
      };

      // Only add tenantId when Super Admin mode is enabled
      if (formData.isSuperAdmin) {
        credentials.tenantId = "";
      }

      const result = await signIn("credentials", credentials);

      if (result?.error) {
        setFormError(result.error);
        setIsLoading(false);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setFormError("Ocurrió un error. Intenta de nuevo.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
            <ShoppingBag className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {formError && (
              <div className="flex items-center gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                {formError}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="superadmin"
                checked={formData.isSuperAdmin}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isSuperAdmin: checked === true })
                }
                disabled={isLoading}
              />
              <Label
                htmlFor="superadmin"
                className="text-sm font-normal text-muted-foreground"
              >
                Soy Super Admin (acceso sin tenant)
              </Label>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              ¿No tienes cuenta?{" "}
              <Link
                href="/register"
                className="text-primary underline-offset-4 hover:underline"
              >
                Regístrate
              </Link>
            </p>
          </CardFooter>
        </form>

        {/* Demo credentials info */}
        <div className="border-t px-6 py-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Credenciales de prueba:
          </p>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>
              <span className="font-medium">Super Admin:</span>{" "}
              admin@ecommerce-g.com / superadmin123
            </p>
            <p>
              <span className="font-medium">Tenant 1:</span>{" "}
              admin@tienda-demo.com / admin123
            </p>
            <p>
              <span className="font-medium">Tenant 2:</span>{" "}
              admin@proteccionincendios.mx / admin123
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
