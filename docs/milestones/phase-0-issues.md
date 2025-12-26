# Fase 0: Fundación - Issues Detallados

## Milestone 0.1: Scaffolding del Proyecto

### Issue 0.1.1: Crear proyecto Next.js 14
**Labels**: `type: infra`, `area: devops`, `priority: critical`

**Descripción**: Inicializar proyecto Next.js 14 con App Router y TypeScript.

**Entregables**:
- [ ] `pnpm create next-app` con configuración correcta
- [ ] TypeScript habilitado
- [ ] App Router configurado
- [ ] Estructura base de carpetas

**Comandos**:
```bash
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

---

### Issue 0.1.2: Configurar ESLint y Prettier
**Labels**: `type: infra`, `priority: high`

**Descripción**: Configurar herramientas de linting y formateo.

**Entregables**:
- [ ] `.eslintrc.js` con reglas estrictas
- [ ] `.prettierrc` configurado
- [ ] Scripts en package.json
- [ ] `.editorconfig`

---

### Issue 0.1.3: Crear estructura de carpetas
**Labels**: `type: infra`, `priority: high`

**Descripción**: Crear la estructura de carpetas según arquitectura definida.

**Estructura**:
```
src/
├── app/(storefront)/
├── app/(admin)/
├── app/(auth)/
├── app/api/
├── components/ui/
├── components/shared/
├── lib/db/
├── lib/auth/
├── lib/utils/
├── hooks/
├── types/
└── styles/
```

---

### Issue 0.1.4: Crear .env.example
**Labels**: `type: docs`, `priority: medium`

**Descripción**: Template de variables de entorno.

**Variables**:
```env
# Database
DATABASE_URL=

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# SYSCOM
SYSCOM_CLIENT_ID=
SYSCOM_CLIENT_SECRET=

# Payments
MERCADOPAGO_ACCESS_TOKEN=
OPENPAY_ID=
OPENPAY_SECRET=
PAYPAL_CLIENT_ID=
PAYPAL_SECRET=

# CFDI
FACTURAPI_KEY=

# Redis
REDIS_URL=

# AWS
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
```

---

## Milestone 0.2: Design System y UI Base

### Issue 0.2.1: Configurar Tailwind CSS
**Labels**: `type: feature`, `area: frontend`, `priority: critical`

**Descripción**: Configurar Tailwind con tema personalizado.

**Entregables**:
- [ ] `tailwind.config.ts` con colores de marca
- [ ] `globals.css` con variables CSS
- [ ] Tema dark mode (opcional)

---

### Issue 0.2.2: Inicializar Shadcn/ui
**Labels**: `type: feature`, `area: frontend`, `priority: critical`

**Descripción**: Configurar Shadcn/ui e instalar componentes base.

**Componentes a instalar**:
- button, input, card, dialog
- dropdown-menu, form, table, toast
- skeleton, avatar, badge, separator
- sheet, tabs, select, checkbox

---

### Issue 0.2.3: Crear layout base
**Labels**: `type: feature`, `area: frontend`, `priority: high`

**Descripción**: Layout responsive principal.

**Entregables**:
- [ ] `src/app/layout.tsx`
- [ ] `src/app/not-found.tsx`
- [ ] `src/app/error.tsx`
- [ ] `src/app/loading.tsx`

---

## Milestone 0.3: Base de Datos y Prisma

### Issue 0.3.1: Configurar Prisma
**Labels**: `type: feature`, `area: database`, `priority: critical`

**Descripción**: Inicializar Prisma con PostgreSQL.

**Comandos**:
```bash
pnpm add -D prisma
pnpm add @prisma/client
pnpm prisma init
```

---

### Issue 0.3.2: Crear schema multi-tenant base
**Labels**: `type: feature`, `area: database`, `priority: critical`

**Descripción**: Schema inicial con modelos Tenant, User, Session.

**Modelos**:
```prisma
model Tenant
model User
model Session
model Account
```

---

### Issue 0.3.3: Configurar docker-compose
**Labels**: `type: infra`, `area: devops`, `priority: critical`

**Descripción**: PostgreSQL en Docker para desarrollo local.

---

### Issue 0.3.4: Crear seed script
**Labels**: `type: feature`, `area: database`, `priority: high`

**Descripción**: Script para poblar datos de prueba.

---

## Milestone 0.4: Autenticación

### Issue 0.4.1: Configurar NextAuth.js v5
**Labels**: `type: feature`, `area: auth`, `priority: critical`

**Descripción**: Setup de Auth.js con Credentials provider.

---

### Issue 0.4.2: Crear páginas de auth
**Labels**: `type: feature`, `area: frontend`, `area: auth`, `priority: critical`

**Páginas**:
- [ ] `/login`
- [ ] `/register`
- [ ] `/forgot-password`

---

### Issue 0.4.3: Middleware de protección
**Labels**: `type: feature`, `area: auth`, `priority: critical`

**Descripción**: Proteger rutas admin y API.

---

## Milestone 0.5: Multi-Tenancy

### Issue 0.5.1: Middleware de resolución de tenant
**Labels**: `type: feature`, `area: backend`, `priority: critical`

**Descripción**: Resolver tenant desde dominio/subdomain.

---

### Issue 0.5.2: Context de tenant
**Labels**: `type: feature`, `area: backend`, `priority: critical`

**Descripción**: Hacer tenant disponible en Server Components.

---

### Issue 0.5.3: Prisma middleware para RLS
**Labels**: `type: feature`, `area: database`, `priority: critical`

**Descripción**: Filtrar queries automáticamente por tenant_id.

---

## Milestone 0.6: Docker y Ambiente Local

### Issue 0.6.1: Dockerfile multi-stage
**Labels**: `type: infra`, `area: devops`, `priority: critical`

**Descripción**: Dockerfile optimizado para producción.

---

### Issue 0.6.2: docker-compose completo
**Labels**: `type: infra`, `area: devops`, `priority: critical`

**Servicios**:
- Next.js (dev)
- PostgreSQL
- Redis
- Meilisearch

---

## Milestone 0.7: CI/CD Pipeline

### Issue 0.7.1: GitHub Actions CI
**Labels**: `type: infra`, `area: devops`, `priority: critical`

**Descripción**: Pipeline de CI para PRs.

---

### Issue 0.7.2: GitHub Actions Deploy
**Labels**: `type: infra`, `area: devops`, `priority: critical`

**Descripción**: Deploy automático a staging.

---

### Issue 0.7.3: Configurar Vitest
**Labels**: `type: test`, `priority: high`

**Descripción**: Setup de testing con Vitest.

---

### Issue 0.7.4: Configurar Husky
**Labels**: `type: infra`, `priority: medium`

**Descripción**: Pre-commit hooks.

---

## Milestone 0.8: Infraestructura AWS

### Issue 0.8.1: Terraform base
**Labels**: `type: infra`, `area: devops`, `priority: critical`

**Descripción**: Configuración base de Terraform.

---

### Issue 0.8.2: VPC y Networking
**Labels**: `type: infra`, `area: devops`, `priority: critical`

---

### Issue 0.8.3: RDS PostgreSQL
**Labels**: `type: infra`, `area: devops`, `priority: critical`

---

### Issue 0.8.4: ElastiCache Redis
**Labels**: `type: infra`, `area: devops`, `priority: critical`

---

### Issue 0.8.5: ECS Cluster
**Labels**: `type: infra`, `area: devops`, `priority: critical`

---

### Issue 0.8.6: ALB + SSL
**Labels**: `type: infra`, `area: devops`, `priority: critical`

---

### Issue 0.8.7: Route 53
**Labels**: `type: infra`, `area: devops`, `priority: critical`

---

### Issue 0.8.8: S3 y CloudFront
**Labels**: `type: infra`, `area: devops`, `priority: high`

---

*Total Issues Fase 0: ~35 issues*
