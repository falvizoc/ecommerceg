# ADR-005: Docker y Estrategia de Despliegue

## Estado: PROPUESTO
## Fecha: 2025-12-26

---

## 1. ¿Docker es Viable para Este Proyecto?

### Respuesta: SÍ, Altamente Recomendado

Docker es no solo viable sino **la opción preferida** para este proyecto por las siguientes razones:

| Beneficio | Impacto en eCommerce-G |
|-----------|------------------------|
| Consistencia | Mismo ambiente en dev, staging, prod |
| Portabilidad | Funciona en AWS, Azure, GCP, local |
| Escalabilidad | Réplicas horizontales triviales |
| Aislamiento | Cada tenant puede tener recursos aislados |
| CI/CD | Builds reproducibles |
| Rollback | Versiones inmutables, rollback instantáneo |

---

## 2. Arquitectura Docker Propuesta

### Dockerfile Multi-Stage para Next.js

```dockerfile
# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# ============================================
# Stage 2: Builder
# ============================================
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments para variables de entorno en build time
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN corepack enable pnpm && pnpm build

# ============================================
# Stage 3: Runner (Production)
# ============================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar solo lo necesario (standalone output)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

### Configuración next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Crítico para Docker
  experimental: {
    // Optimizaciones para producción
  },
  images: {
    remotePatterns: [
      { hostname: 'syscom.mx' },
      { hostname: '*.amazonaws.com' },
    ],
  },
}

module.exports = nextConfig
```

### Resultado de Imagen

| Métrica | Sin Standalone | Con Standalone |
|---------|----------------|----------------|
| Tamaño imagen | ~1.2 GB | ~150-200 MB |
| Tiempo build | Base | Similar |
| Cold start | Lento | Rápido |
| Dependencias | Todas | Solo necesarias |

---

## 3. Estrategia de Cambios Incrementales

### Flujo de CI/CD con GitHub Actions

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Commit    │────▶│   Build &   │────▶│    Push     │
│   to main   │     │   Test      │     │   to ECR    │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Rollback   │◀────│  Monitor    │◀────│   Deploy    │
│  if needed  │     │  Health     │     │  to ECS     │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Archivo: .github/workflows/deploy.yml

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  AWS_REGION: mx-central-1
  ECR_REPOSITORY: ecommerce-g
  ECS_SERVICE: ecommerce-g-service
  ECS_CLUSTER: ecommerce-g-cluster

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build

  build-and-push:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    outputs:
      image-tag: ${{ steps.meta.outputs.tags }}
    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build, tag, and push image
        id: build
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:latest .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:latest
          echo "image=$ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG" >> $GITHUB_OUTPUT

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Deploy to ECS
        run: |
          aws ecs update-service \
            --cluster $ECS_CLUSTER \
            --service $ECS_SERVICE \
            --force-new-deployment
```

---

## 4. Estrategias de Despliegue

### Opción A: Rolling Update (Recomendada para MVP)

```
Tarea 1: v1.0 ───▶ Tarea 1: v1.1 (nueva)
Tarea 2: v1.0 ───▶ Tarea 2: v1.0 (aún activa)
                         │
                         ▼
              Tarea 2: v1.1 (después)
```

**Configuración ECS**:
```json
{
  "deploymentConfiguration": {
    "minimumHealthyPercent": 50,
    "maximumPercent": 200
  }
}
```

**Ventajas**:
- Zero downtime
- Rollback automático si falla health check
- Simple de configurar

### Opción B: Blue/Green (Para Producción Madura)

```
┌──────────────────────────────────────────┐
│              Load Balancer               │
│         ┌──────────┴──────────┐          │
│         ▼                     ▼          │
│   ┌──────────┐          ┌──────────┐     │
│   │  Blue    │          │  Green   │     │
│   │  (v1.0)  │          │  (v1.1)  │     │
│   │  100%    │    ───▶  │  100%    │     │
│   └──────────┘          └──────────┘     │
└──────────────────────────────────────────┘
```

**Ventajas**:
- Rollback instantáneo (switch de tráfico)
- Testing en producción antes de switch
- Costo: 2x recursos durante deployment

### Opción C: Canary (Para Cambios de Alto Riesgo)

```
v1.0: 90% del tráfico
v1.1: 10% del tráfico (canary)
         │
         ▼ (si métricas OK)
v1.0: 0%
v1.1: 100%
```

---

## 5. Manejo de Base de Datos (Migraciones)

### Flujo de Migraciones Seguras

```yaml
# En CI/CD, antes del deploy de la app
migration-job:
  runs-on: ubuntu-latest
  steps:
    - name: Run migrations
      run: |
        # Conectar a RDS y ejecutar migraciones
        npx prisma migrate deploy
```

### Reglas de Migración

1. **Backward Compatible**: Migraciones deben ser compatibles con versión anterior
2. **Separar Deploy**: Primero migración, luego código
3. **Feature Flags**: Para cambios grandes, usar flags

```typescript
// Ejemplo: Agregar columna nullable primero
// Migración 1: ALTER TABLE ADD COLUMN new_field VARCHAR NULL
// Deploy código que escribe a new_field
// Migración 2: ALTER TABLE ALTER COLUMN new_field SET NOT NULL
```

---

## 6. Versionado de Imágenes

### Estrategia de Tags

| Tag | Uso | Ejemplo |
|-----|-----|---------|
| `latest` | Última versión estable | `ecommerce-g:latest` |
| `sha-{commit}` | Versión específica | `ecommerce-g:sha-a1b2c3d` |
| `v{semver}` | Release oficial | `ecommerce-g:v1.2.3` |
| `{branch}` | Para staging | `ecommerce-g:develop` |

### Limpieza de Imágenes

```yaml
# Política de lifecycle en ECR
{
  "rules": [
    {
      "rulePriority": 1,
      "description": "Keep last 10 images",
      "selection": {
        "tagStatus": "any",
        "countType": "imageCountMoreThan",
        "countNumber": 10
      },
      "action": { "type": "expire" }
    }
  ]
}
```

---

## 7. Desarrollo Local con Docker

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/ecommerce
      - REDIS_URL=redis://cache:6379
    depends_on:
      - db
      - cache

  db:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: ecommerce
    volumes:
      - postgres_data:/var/lib/postgresql/data

  cache:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  meilisearch:
    image: getmeili/meilisearch:latest
    ports:
      - "7700:7700"
    environment:
      MEILI_MASTER_KEY: devMasterKey123
    volumes:
      - meilisearch_data:/meili_data

volumes:
  postgres_data:
  meilisearch_data:
```

---

## 8. Resumen de Decisiones

| Aspecto | Decisión |
|---------|----------|
| Containerización | Docker (obligatorio) |
| Imagen Base | node:20-alpine |
| Build Strategy | Multi-stage + standalone |
| Registry | AWS ECR |
| Orquestación | ECS Fargate |
| Deploy Strategy MVP | Rolling Update |
| Deploy Strategy Prod | Blue/Green |
| CI/CD | GitHub Actions |
| Migraciones | Prisma Migrate (separado) |

---

## Referencias
- [Next.js Docker Deployment 2025](https://dev.to/codeparrot/nextjs-deployment-with-docker-complete-guide-for-2025-3oe8)
- [Next.js CI/CD Guide](https://nextjsstarter.com/blog/nextjs-cicd-deployment-guide-2024/)
- [Docker CI/CD for Next.js with GitHub Actions](https://mxd.codes/articles/docker-ci-cd-for-nextjs-with-github-actions)
- [Next.js Standalone Output](https://nextjs.org/docs/app/building-your-application/deploying)
