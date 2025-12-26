# eCommerce-G

Plataforma de comercio electrónico multi-tenant para tiendas especializadas con integración SYSCOM.

## Descripción

eCommerce-G es una plataforma que permite desplegar múltiples tiendas en línea especializadas en nichos específicos (protección contra incendio, cableado estructurado, alarmas, CCTV, etc.), todas alimentadas por el catálogo de SYSCOM mediante dropshipping.

### Características Principales

- **Multi-tenant**: Una instalación, múltiples tiendas con dominios personalizados
- **Integración SYSCOM**: Catálogo sincronizado automáticamente
- **Dropshipping**: Envío directo desde SYSCOM al cliente final
- **Márgenes Configurables**: Por producto, categoría o general
- **Facturación CFDI 4.0**: Emisión de facturas electrónicas mexicanas
- **Pasarelas de Pago**: MercadoPago, Openpay, PayPal

## Tech Stack

| Categoría | Tecnología |
|-----------|------------|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript 5 |
| Estilos | Tailwind CSS 4 |
| UI Components | Shadcn/ui |
| Base de Datos | PostgreSQL 16 |
| ORM | Prisma 5 |
| Cache | Redis 7 |
| Búsqueda | Meilisearch |
| Autenticación | NextAuth.js v5 |
| Facturación | Facturapi |
| Infraestructura | AWS (ECS, RDS, ElastiCache) |
| IaC | Terraform |

## Requisitos

- Node.js 20+
- npm 10+
- Docker & Docker Compose
- PostgreSQL 16 (via Docker)
- Redis 7 (via Docker)

## Instalación

```bash
# Clonar repositorio
git clone git@github.com:falvizoc/ecommerceg.git
cd ecommerceg

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local

# Iniciar servicios de desarrollo (PostgreSQL, Redis)
docker-compose up -d

# Ejecutar migraciones
npm run db:migrate

# Iniciar servidor de desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:3001`

## Scripts Disponibles

```bash
npm run dev          # Inicia servidor de desarrollo (puerto 3001)
npm run dev:turbo    # Inicia con Turbopack (más rápido)
npm run build        # Compila para producción
npm run start        # Inicia servidor de producción
npm run lint         # Ejecuta ESLint
npm run lint:fix     # Corrige errores de ESLint
npm run format       # Formatea código con Prettier
npm run format:check # Verifica formato
npm run type-check   # Verifica tipos TypeScript
npm run validate     # Ejecuta lint + type-check + build
```

## Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── (storefront)/      # Tienda pública
│   ├── (admin)/           # Panel de administración
│   ├── (auth)/            # Autenticación
│   └── api/               # API Routes
├── components/
│   ├── ui/                # Componentes Shadcn/ui
│   └── shared/            # Componentes compartidos
├── lib/
│   ├── db/                # Prisma client
│   ├── auth/              # Configuración NextAuth
│   ├── syscom/            # Cliente API SYSCOM
│   ├── payments/          # Pasarelas de pago
│   ├── billing/           # Facturación CFDI
│   └── ...
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript types
└── styles/                 # Estilos globales
```

## Modelo de Negocio

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   SYSCOM    │      │  Plataforma │      │   Cliente   │
│  Proveedor  │◄────►│  eCommerce-G│◄────►│   Final     │
└─────────────┘      └─────────────┘      └─────────────┘
       │                    │                    │
       │   Precio base      │   Precio + margen  │
       │◄───────────────────│───────────────────►│
       │                    │                    │
       │   Envía producto   │   Paga producto    │
       │───────────────────►│◄───────────────────│
```

### Sistema de Márgenes

| Nivel | Prioridad | Descripción |
|-------|-----------|-------------|
| Producto | Alta | Margen específico por producto |
| Categoría | Media | Margen por línea de productos |
| General | Baja | Margen por defecto del tenant |

Tipos de margen:
- **Porcentaje**: +X% sobre precio SYSCOM
- **Monto fijo**: +$X sobre precio SYSCOM
- **Precio fijo**: Precio manual ignorando costo
- **Deshabilitado**: Ocultar producto

## Documentación

- [CLAUDE.md](./CLAUDE.md) - Contexto para desarrollo con Claude Code
- [Roadmap](./docs/roadmap/product-roadmap.md) - Plan de desarrollo
- [ADRs](./docs/decisions/) - Decisiones de arquitectura
- [Modelo de Negocio](./docs/requirements/business-model.md) - Detalles del negocio

## Desarrollo

### Entorno

Este proyecto se desarrolla en **WSL Ubuntu** sobre Windows. Los comandos de consola deben ser compatibles con Linux.

### Puertos

| Servicio | Puerto |
|----------|--------|
| Next.js | 3001 |
| PostgreSQL | 5432 |
| Redis | 6379 |
| Meilisearch | 7700 |

### Convenciones

- Commits: [Conventional Commits](https://www.conventionalcommits.org/)
- Código: ESLint + Prettier
- Tipos: TypeScript estricto

## Roadmap

- **Fase 0**: Fundación (actual)
- **Fase 1**: MVP
- **Fase 2**: Crecimiento
- **Fase 3**: Expansión
- **Fase 4**: Maduración

Ver [CHANGELOG.md](./CHANGELOG.md) para historial de cambios.

## Licencia

Propietario - Todos los derechos reservados

## Contacto

Francisco Alvizo - [@falvizoc](https://github.com/falvizoc)
