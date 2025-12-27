import {
  ShoppingCart,
  Store,
  Package,
  CreditCard,
  FileText,
  Settings,
} from "lucide-react";

import { Header } from "@/components/shared/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Badge variant="secondary" className="mb-4">
          Milestone 0.4 - Autenticación
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Plataforma Multi-Tenant
          <br />
          <span className="text-muted-foreground">de Comercio Electrónico</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Despliega múltiples tiendas especializadas con integración SYSCOM,
          facturación CFDI y pasarelas de pago mexicanas.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Ver Demo
          </Button>
          <Button variant="outline" size="lg">
            Documentación
          </Button>
        </div>
      </section>

      <Separator />

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-center text-2xl font-bold">
          Características Principales
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Package className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Catálogo SYSCOM</CardTitle>
              <CardDescription>
                Sincronización automática de productos con precios actualizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Más de 50,000 productos</li>
                <li>• Stock en tiempo real</li>
                <li>• Imágenes y especificaciones</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CreditCard className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Pasarelas de Pago</CardTitle>
              <CardDescription>
                Múltiples métodos de pago con 3D Secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• MercadoPago</li>
                <li>• Openpay</li>
                <li>• PayPal</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Facturación CFDI</CardTitle>
              <CardDescription>
                Emisión automática de facturas electrónicas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• CFDI 4.0 válido</li>
                <li>• Envío automático por email</li>
                <li>• Almacenamiento en la nube</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Store className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Multi-Tenant</CardTitle>
              <CardDescription>
                Una plataforma, múltiples tiendas independientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Dominios personalizados</li>
                <li>• Branding independiente</li>
                <li>• Configuración por tienda</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Settings className="mb-2 h-8 w-8 text-primary" />
              <CardTitle>Sistema de Márgenes</CardTitle>
              <CardDescription>
                Control total sobre tu estrategia de precios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Margen por producto</li>
                <li>• Margen por categoría</li>
                <li>• Margen general</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardHeader>
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                ?
              </div>
              <CardTitle className="text-muted-foreground">
                Próximamente
              </CardTitle>
              <CardDescription>Más funcionalidades en desarrollo</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• IA para atención al cliente</li>
                <li>• Sistema RMA</li>
                <li>• Analytics avanzados</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="border-t bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Stack Tecnológico
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="outline">Next.js 16</Badge>
            <Badge variant="outline">TypeScript</Badge>
            <Badge variant="outline">Tailwind CSS 4</Badge>
            <Badge variant="outline">Shadcn/ui</Badge>
            <Badge variant="outline">Prisma 7</Badge>
            <Badge variant="outline">PostgreSQL</Badge>
            <Badge variant="outline">Redis</Badge>
            <Badge variant="outline">NextAuth.js v5</Badge>
            <Badge variant="outline">AWS</Badge>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>eCommerce-G © 2025 - Plataforma Multi-Tenant</p>
          <p className="mt-2">
            Desarrollado con Next.js, Tailwind CSS y Shadcn/ui
          </p>
        </div>
      </footer>
    </div>
  );
}
