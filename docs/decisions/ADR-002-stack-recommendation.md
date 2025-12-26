# ADR-002: Recomendación de Stack Tecnológico

## Estado: PROPUESTO
## Fecha: 2025-12-26

## Contexto
Selección del stack tecnológico óptimo considerando:
- Sin equipo técnico definido (libertad total)
- 10-50 tiendas multi-tenant
- MVP: Catálogo + Checkout + CFDI + Panel Admin
- AWS como hosting
- SEO crítico para posicionamiento

## Análisis de Opciones

### Opción A: Next.js 14+ Full-Stack (RECOMENDADA)
```
Frontend + Backend: Next.js 14 (App Router)
Lenguaje: TypeScript
ORM: Prisma
Base de datos: PostgreSQL
Cache: Redis (Upstash o AWS ElastiCache)
Auth: NextAuth.js v5
UI: Tailwind CSS + Shadcn/ui
CFDI: Facturapi (API REST)
```

**Ventajas:**
- SEO nativo excepcional (SSR/SSG/ISR)
- TypeScript end-to-end (menos bugs, mejor DX)
- Ecosistema moderno y activo
- Server Actions simplifican backend
- Despliegue optimizado en Vercel o AWS
- Fácil contratar desarrolladores JS/TS

**Desventajas:**
- Curva de aprendizaje App Router
- CFDI requiere servicio externo (no nativo)

### Opción B: Laravel 11 + Inertia.js + React
```
Backend: Laravel 11 (PHP 8.3)
Frontend: React + Inertia.js
ORM: Eloquent
Base de datos: PostgreSQL
Cache: Redis
Auth: Laravel Sanctum
UI: Tailwind CSS
CFDI: Librerías PHP nativas
```

**Ventajas:**
- Desarrollo muy rápido
- Librerías CFDI maduras en PHP
- Multi-tenancy packages probados
- Menor complejidad arquitectónica

**Desventajas:**
- SEO requiere configuración adicional
- PHP menos atractivo para nuevos talentos
- Menos moderno que alternativas JS

### Opción C: NestJS + Next.js (Microservicios)
```
Backend: NestJS
Frontend: Next.js 14
API: GraphQL o REST
ORM: Prisma/TypeORM
```

**Ventajas:**
- Separación clara frontend/backend
- Escalabilidad enterprise
- TypeScript full-stack

**Desventajas:**
- Mayor complejidad
- Dos frameworks que mantener
- Mayor tiempo de desarrollo inicial

## Decisión: OPCIÓN A - Next.js 14+ Full-Stack

### Justificación
1. **SEO**: Requisito crítico, Next.js es líder indiscutible
2. **Velocidad**: Server Actions + React simplifican desarrollo
3. **Talento**: Más fácil encontrar desarrolladores JS/TS
4. **Modernidad**: Stack 2024-2025, vigente por años
5. **AWS**: Despliegue sencillo con AWS Amplify o ECS
6. **CFDI**: Facturapi tiene SDK oficial para Node.js

## Stack Completo Recomendado

### Core
| Componente | Tecnología | Versión |
|------------|------------|---------|
| Framework | Next.js | 14.x (App Router) |
| Lenguaje | TypeScript | 5.x |
| Runtime | Node.js | 20.x LTS |
| ORM | Prisma | 5.x |
| Base de datos | PostgreSQL | 16.x |
| Cache | Redis | 7.x |

### Frontend
| Componente | Tecnología |
|------------|------------|
| UI Framework | Tailwind CSS 3.4 |
| Components | Shadcn/ui |
| State | Zustand + TanStack Query |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |

### Autenticación y Seguridad
| Componente | Tecnología |
|------------|------------|
| Auth | NextAuth.js v5 (Auth.js) |
| Sessions | JWT + Database |
| Rate Limiting | Upstash Ratelimit |
| Validation | Zod |

### Integraciones
| Servicio | Proveedor |
|----------|-----------|
| CFDI | Facturapi |
| Pagos | MercadoPago SDK, Openpay, PayPal |
| Email | Resend + React Email |
| Storage | AWS S3 |
| CDN | AWS CloudFront |

### Infraestructura (AWS)
| Servicio | Uso |
|----------|-----|
| ECS Fargate | Contenedores |
| RDS PostgreSQL | Base de datos |
| ElastiCache | Redis |
| S3 | Almacenamiento |
| CloudFront | CDN |
| Route 53 | DNS multi-tenant |
| ACM | Certificados SSL |

### Monitoreo y Observabilidad
| Componente | Tecnología |
|------------|------------|
| Error Tracking | Sentry |
| Analytics | PostHog |
| Logs | AWS CloudWatch |
| APM | AWS X-Ray |

## Multi-Tenancy Strategy

### Enfoque: Schema Compartido con Row-Level Security
- Una base de datos PostgreSQL
- Columna `tenant_id` en todas las tablas
- Row Level Security (RLS) de PostgreSQL
- Prisma con middleware para tenant isolation

### Dominios
- Wildcard DNS: `*.ecommerce-g.com`
- Dominios custom con CNAME
- AWS Route 53 + ACM para SSL automático

## Consecuencias

### Positivas
- Stack moderno y mantenible
- SEO optimizado out-of-the-box
- Escalabilidad horizontal
- Developer experience excelente

### Negativas/Riesgos
- Dependencia de servicios externos (Facturapi)
- Curva de aprendizaje para equipo nuevo
- Costos AWS pueden escalar

## Alternativa de Respaldo
Si se requiere desarrollo aún más rápido o se encuentra equipo PHP:
**Laravel 11 + Livewire + Alpine.js** con librerías CFDI nativas.

---

## Referencias
- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- Facturapi: https://facturapi.io
- Shadcn/ui: https://ui.shadcn.com
