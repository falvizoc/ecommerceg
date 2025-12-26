# eCommerce-G - Plataforma Multi-Tenant de Comercio Electrónico

## Descripción del Proyecto
Plataforma eCommerce genérica multi-tenant que sirve como base para el despliegue de comercios especializados (10-50 tiendas). Modelo multi-marca propia administrada desde un panel central.

## PRINCIPIO FUNDAMENTAL: FRICTIONLESS

> **El enfoque FRICTIONLESS aplica al COMPRADOR FINAL.**
> Cada decisión de diseño, UX, y funcionalidad debe priorizar una experiencia de compra SIN FRICCIÓN.

### Qué significa FRICTIONLESS en este proyecto:
- **Checkout ultra-rápido**: Mínimos pasos, máxima claridad
- **Búsqueda instantánea**: Resultados en milisegundos
- **Carga veloz**: Core Web Vitals optimizados
- **Mobile-first**: Experiencia perfecta en móvil
- **Información clara**: Precios, stock, tiempos de entrega visibles
- **Pagos sin obstáculos**: Múltiples métodos, 3D Secure transparente
- **Facturación simple**: Solicitar factura sin complicaciones

## Modelo de Negocio

> **Modelo: COMPRA-VENTA POR DROPSHIPPING**

### Flujo
```
SYSCOM (proveedor) → Plataforma (margen) → Cliente final
                           ↓
                    SYSCOM envía directo
```

### Características
- **Compra**: A SYSCOM con cuenta central
- **Venta**: A usuario final (B2B preferente, abierto a público)
- **Logística**: Dropshipping (SYSCOM envía directo)
- **Facturación**: Cada tienda factura con su razón social
- **NO hay suscripción**: Modelo tradicional de comercio

### Tiendas Especializadas por Nicho
Cada tienda se enfoca en categorías específicas de SYSCOM:
- Contra incendio (extintores, detectores)
- Cableado estructurado (cables, conectores, racks)
- Alarmas (paneles, sensores)
- CCTV (cámaras, DVRs)
- Radiocomunicación
- Networking

### Sistema de Márgenes (CRÍTICO)
Ver `/docs/requirements/business-model.md`

```
Prioridad: Producto > Categoría > General

Tipos de margen:
- Porcentaje sobre costo (+25%)
- Monto fijo (+$150)
- Precio fijo ($1,500)
- Ocultar producto
```

## Stack Tecnológico (DEFINIDO)

### Core
| Componente | Tecnología |
|------------|------------|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript 5.x |
| ORM | Prisma 5.x |
| Base de datos | PostgreSQL 16 |
| Cache | Redis 7.x |

### Frontend
- **UI**: Tailwind CSS 3.4 + Shadcn/ui
- **State**: Zustand + TanStack Query
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

### Auth & Security
- **Auth**: NextAuth.js v5
- **Validation**: Zod
- **Rate Limiting**: Upstash Ratelimit

### Integraciones
| Servicio | Proveedor |
|----------|-----------|
| Productos | SYSCOM API |
| CFDI | Facturapi |
| Pagos | MercadoPago, Openpay, PayPal |
| Email | Resend + React Email |
| Search | Meilisearch |
| Analytics | PostHog |

### Infraestructura (AWS + Terraform)
- ECS Fargate (containers)
- RDS PostgreSQL
- ElastiCache (Redis)
- S3 + CloudFront
- Route 53 (DNS multi-tenant)

## Arquitectura
- **Tipo**: Multi-tenant schema compartido con RLS
- **Modelo**: Multi-marca propia (no SaaS terceros)
- **Escala objetivo**: 10-50 tiendas
- **Hosting**: AWS (región mx-central-1)

## MVP Definido
1. Catálogo de productos (SYSCOM)
2. Checkout con pagos (MercadoPago, Openpay, PayPal)
3. Facturación CFDI 4.0 (Facturapi)
4. Panel de administración central

## Estructura del Proyecto

```
eCommerce-G/
├── CLAUDE.md                    # Este archivo - contexto principal
├── CHANGELOG.md                 # Historial de cambios
├── docs/
│   ├── milestones/              # Plan de implementación
│   │   ├── implementation-plan.md
│   │   ├── phase-0-issues.md
│   │   └── phase-1-issues.md
│   ├── tracking/                # Seguimiento
│   │   ├── bug-tracking.md
│   │   └── discoveries.md       # Hallazgos no previstos
│   ├── roadmap/
│   │   └── product-roadmap.md
│   ├── decisions/               # ADRs (5 documentos)
│   ├── architecture/
│   ├── security/
│   ├── requirements/
│   ├── agents/
│   ├── ux/
│   ├── legal/
│   └── integrations/
├── .github/
│   ├── ISSUE_TEMPLATE/          # Templates para issues
│   └── workflows/               # CI/CD
├── src/                         # Código fuente (Next.js)
├── prisma/                      # Schema de DB
├── tests/                       # Pruebas
└── infrastructure/              # Terraform
```

## Comandos Frecuentes
```bash
# Desarrollo
pnpm dev                    # Iniciar servidor desarrollo
pnpm build                  # Build producción
pnpm lint                   # Linting
pnpm test                   # Ejecutar tests

# Base de datos
pnpm prisma generate        # Generar cliente Prisma
pnpm prisma migrate dev     # Migración desarrollo
pnpm prisma studio          # UI de base de datos

# Docker
docker-compose up -d        # Iniciar servicios locales
docker-compose down         # Detener servicios
```

## Convenciones
- **Documentación**: Español
- **Código/comentarios**: Inglés
- **Commits**: Conventional Commits
- **Versionado**: Semántico
- **Branches**: `main`, `develop`, `feature/*`, `fix/*`

---

# MEMORIA ENTRE SESIONES

## Propósito
Este archivo es el punto de entrada para Claude Code en cualquier sesión. Debe leerse SIEMPRE al inicio.

## Al Iniciar Nueva Sesión

### 1. Leer este archivo completo (CLAUDE.md)

### 2. Verificar estado actual
```
Ver "Estado Actual del Proyecto" más abajo
```

### 3. Leer documentos según tarea
| Si vas a... | Lee primero... |
|-------------|----------------|
| Implementar código | `/docs/milestones/implementation-plan.md` |
| Tomar decisión arquitectónica | `/docs/decisions/` (ADRs) |
| Trabajar en UX | `/docs/ux/conversion-optimization.md` |
| Integrar SYSCOM | `/docs/integrations/syscom-integration.md` |
| Revisar seguridad | `/docs/security/owasp-compliance.md` |

### 4. Revisar hallazgos pendientes
```
/docs/tracking/discoveries.md
```

## Protocolo de Actualización

### Después de cada sesión significativa:
1. Actualizar "Estado Actual del Proyecto" abajo
2. Registrar hallazgos en `/docs/tracking/discoveries.md`
3. Actualizar CHANGELOG.md si hubo cambios
4. Crear/actualizar ADR si hubo decisiones importantes

### Al completar un Milestone:
1. Marcar como completado en estado actual
2. Actualizar `/docs/milestones/implementation-plan.md`
3. Commit con mensaje: `milestone(X.X): [descripción]`

---

# ESTADO ACTUAL DEL PROYECTO

## Fase Actual: PLANIFICACIÓN → EJECUCIÓN

## Milestones Completados
- [x] Estructura documental
- [x] Requisitos clarificados
- [x] Stack definido
- [x] Arquitectura diseñada
- [x] Plan de milestones creado
- [x] GitHub templates creados

## Milestone Actual
**0.1: Scaffolding del Proyecto** - PENDIENTE

## Próximos Pasos
1. Ejecutar Milestone 0.1 (Scaffolding)
2. Ejecutar Milestone 0.2 (Design System)
3. Ejecutar Milestone 0.3 (Base de Datos)

## Decisiones Pendientes
- Ninguna

## Hallazgos Pendientes
- Ver `/docs/tracking/discoveries.md`

## Última Actualización
- **Fecha**: 2025-12-26
- **Sesión**: Planificación inicial completada
- **Próxima acción**: Iniciar Milestone 0.1

---

# REGLAS PARA CLAUDE

## Siempre
1. Leer CLAUDE.md al inicio de sesión
2. Mantener enfoque FRICTIONLESS (comprador final)
3. Seguir OWASP en todo código
4. Documentar hallazgos inmediatamente
5. Actualizar estado al finalizar trabajo significativo

## Nunca
1. Asumir contexto sin leer documentación
2. Cambiar arquitectura sin ADR
3. Ignorar hallazgos descubiertos
4. Dejar memoria sin actualizar

## Proceso de Desarrollo
1. **Análisis** - Investigación y definición ✅
2. **Planificación** - Diseño y arquitectura ✅
3. **Ejecución** - Implementación iterativa ⏳

---

# NOTAS IMPORTANTES

- **Logística**: Dropshipping SYSCOM (no almacén propio)
- **SYSCOM**: Cuenta central única para todas las tiendas
- **Contracargos**: 3D Secure obligatorio, AVS, detección fraude
- **Legal México**: LFPDPPP, CFDI 4.0, NOM-151
- **Cache**: Temporalidad configurable por tenant
- **Fase posterior**: IA servicio al cliente, mailing

---

*Versión del documento: 2.0*
*Última actualización: 2025-12-26*
