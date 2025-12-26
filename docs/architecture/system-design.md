# Diseño del Sistema - eCommerce-G

## Estado: EN DESARROLLO
## Fecha: 2025-12-26

---

## 1. Vista General de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENTES                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ Tienda A │  │ Tienda B │  │ Tienda C │  │ Admin    │        │
│  │ tienda-a │  │ tienda-b │  │ custom   │  │ Central  │        │
│  │ .com     │  │ .com     │  │ .mx      │  │          │        │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘        │
└───────┼─────────────┼─────────────┼─────────────┼───────────────┘
        │             │             │             │
        └─────────────┴──────┬──────┴─────────────┘
                             │
┌────────────────────────────┼────────────────────────────────────┐
│                      AWS CLOUD                                   │
│  ┌─────────────────────────┴─────────────────────────────────┐  │
│  │                    CloudFront CDN                          │  │
│  │              (SSL/TLS, Caching, WAF)                       │  │
│  └─────────────────────────┬─────────────────────────────────┘  │
│                             │                                    │
│  ┌─────────────────────────┴─────────────────────────────────┐  │
│  │                 Application Load Balancer                  │  │
│  └─────────────────────────┬─────────────────────────────────┘  │
│                             │                                    │
│  ┌─────────────────────────┴─────────────────────────────────┐  │
│  │                    ECS Fargate Cluster                     │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │  │
│  │  │ Next.js     │  │ Next.js     │  │ Next.js     │        │  │
│  │  │ Container 1 │  │ Container 2 │  │ Container N │        │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘        │  │
│  └───────────────────────────────────────────────────────────┘  │
│                             │                                    │
│          ┌──────────────────┼──────────────────┐                │
│          │                  │                  │                │
│  ┌───────┴───────┐  ┌───────┴───────┐  ┌──────┴──────┐        │
│  │ RDS PostgreSQL│  │ ElastiCache   │  │ S3 Bucket   │        │
│  │ (Primary +    │  │ (Redis)       │  │ (Assets)    │        │
│  │  Read Replica)│  │               │  │             │        │
│  └───────────────┘  └───────────────┘  └─────────────┘        │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
                             │
┌────────────────────────────┼────────────────────────────────────┐
│                   SERVICIOS EXTERNOS                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ SYSCOM   │  │ Facturapi│  │ Mercado  │  │ Resend   │        │
│  │ API      │  │ (CFDI)   │  │ Pago     │  │ (Email)  │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                      │
│  │ Openpay  │  │ PayPal   │  │ Meili    │                      │
│  │          │  │          │  │ Search   │                      │
│  └──────────┘  └──────────┘  └──────────┘                      │
└──────────────────────────────────────────────────────────────────┘
```

---

## 2. Arquitectura Multi-Tenant

### Estrategia: Schema Compartido con Row-Level Security

```sql
-- Todas las tablas incluyen tenant_id
CREATE TABLE products (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    syscom_id VARCHAR(50),
    name VARCHAR(255),
    -- ...
    CONSTRAINT fk_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

-- Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON products
    USING (tenant_id = current_setting('app.current_tenant')::UUID);
```

### Resolución de Tenant

```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');
  const tenant = await getTenantByDomain(hostname);

  if (!tenant) {
    return NextResponse.redirect('/404');
  }

  // Inyectar tenant_id en headers para uso downstream
  const response = NextResponse.next();
  response.headers.set('x-tenant-id', tenant.id);
  return response;
}
```

---

## 3. Modelo de Datos Principal

```prisma
// schema.prisma

model Tenant {
  id              String   @id @default(uuid())
  name            String
  slug            String   @unique
  domain          String?  @unique
  logo            String?
  primaryColor    String   @default("#000000")
  secondaryColor  String   @default("#ffffff")

  // Configuración
  settings        Json     @default("{}")

  // Facturación
  billingConfig   BillingConfig?

  // Relaciones
  products        Product[]
  orders          Order[]
  customers       Customer[]
  users           User[]

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@map("tenants")
}

model Product {
  id              String   @id @default(uuid())
  tenantId        String
  tenant          Tenant   @relation(fields: [tenantId], references: [id])

  syscomId        String?
  sku             String
  name            String
  description     String?
  price           Decimal  @db.Decimal(10, 2)
  comparePrice    Decimal? @db.Decimal(10, 2)
  cost            Decimal  @db.Decimal(10, 2)
  stock           Int      @default(0)

  // SEO
  slug            String
  metaTitle       String?
  metaDescription String?

  // Relaciones
  images          ProductImage[]
  categories      Category[]
  orderItems      OrderItem[]

  isActive        Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@unique([tenantId, sku])
  @@unique([tenantId, slug])
  @@map("products")
}

model Order {
  id              String      @id @default(uuid())
  tenantId        String
  tenant          Tenant      @relation(fields: [tenantId], references: [id])

  orderNumber     String
  customerId      String?
  customer        Customer?   @relation(fields: [customerId], references: [id])

  // Totales
  subtotal        Decimal     @db.Decimal(10, 2)
  tax             Decimal     @db.Decimal(10, 2)
  shipping        Decimal     @db.Decimal(10, 2)
  total           Decimal     @db.Decimal(10, 2)

  // Estado
  status          OrderStatus @default(PENDING)
  paymentStatus   PaymentStatus @default(PENDING)

  // Pago
  paymentMethod   String?
  paymentRef      String?

  // Facturación
  invoiceId       String?     // Facturapi ID
  invoiceStatus   InvoiceStatus?

  // Dirección
  shippingAddress Json
  billingAddress  Json?

  // Items
  items           OrderItem[]

  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  @@unique([tenantId, orderNumber])
  @@map("orders")
}

model BillingConfig {
  id                  String  @id @default(uuid())
  tenantId            String  @unique
  tenant              Tenant  @relation(fields: [tenantId], references: [id])

  // Facturapi
  facturApiOrgId      String?
  facturApiKey        String? // Encriptado

  // Datos fiscales
  rfc                 String
  razonSocial         String
  regimenFiscal       String
  domicilioFiscal     Json

  // Configuración
  autoInvoice         Boolean @default(false)

  @@map("billing_configs")
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
}

enum InvoiceStatus {
  PENDING
  ISSUED
  CANCELLED
}
```

---

## 4. Flujos Principales

### 4.1 Sincronización SYSCOM

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│ Cron Job│────▶│ SYSCOM  │────▶│ Process │────▶│ Update  │
│ (hourly)│     │ API     │     │ & Map   │     │ Cache   │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
                                                      │
                                                      ▼
                                              ┌─────────────┐
                                              │ Meilisearch │
                                              │ (re-index)  │
                                              └─────────────┘
```

### 4.2 Checkout Flow

```
┌────────┐     ┌────────┐     ┌────────┐     ┌────────┐
│ Cart   │────▶│Checkout│────▶│ Payment│────▶│ Order  │
│        │     │ Form   │     │ Gateway│     │ Created│
└────────┘     └────────┘     └────────┘     └────────┘
                                                   │
                    ┌──────────────────────────────┤
                    │                              │
                    ▼                              ▼
              ┌──────────┐                  ┌──────────┐
              │ CFDI     │                  │ SYSCOM   │
              │ Invoice  │                  │ Order    │
              └──────────┘                  └──────────┘
```

### 4.3 RMA Flow

```
┌────────┐     ┌────────┐     ┌────────┐     ┌────────┐
│Customer│────▶│ RMA    │────▶│ Admin  │────▶│ SYSCOM │
│Request │     │ Form   │     │ Review │     │ RMA    │
└────────┘     └────────┘     └────────┘     └────────┘
                                                   │
                                                   ▼
                                            ┌──────────┐
                                            │Resolution│
                                            │(refund/  │
                                            │ replace) │
                                            └──────────┘
```

---

## 5. Seguridad

### Capas de Seguridad

1. **WAF (AWS WAF)**
   - Rate limiting
   - SQL injection protection
   - XSS protection
   - Bot detection

2. **Aplicación**
   - Input validation (Zod)
   - CSRF tokens
   - Content Security Policy
   - Sanitización de outputs

3. **Datos**
   - Encriptación en tránsito (TLS 1.3)
   - Encriptación en reposo (RDS, S3)
   - Row Level Security
   - Secrets en AWS Secrets Manager

4. **Autenticación**
   - bcrypt para passwords
   - JWT con rotación
   - MFA opcional
   - Session invalidation

---

## 6. Cache Strategy

### Niveles de Cache

| Nivel | Tecnología | TTL | Uso |
|-------|------------|-----|-----|
| CDN | CloudFront | 24h | Assets estáticos |
| Edge | CloudFront | 5min | Páginas de producto |
| Application | Redis | Configurable | Catálogo SYSCOM |
| Database | PostgreSQL | - | Query cache |

### Invalidación

```typescript
// Estrategia de invalidación
async function invalidateProductCache(productId: string) {
  await redis.del(`product:${productId}`);
  await redis.del(`product:${productId}:stock`);
  await cloudfront.createInvalidation({
    paths: [`/products/${productId}/*`]
  });
}
```

---

## 7. SEO Architecture

### Estrategia SSR/SSG

| Página | Renderizado | Revalidación |
|--------|-------------|--------------|
| Home | ISR | 1 hora |
| Categorías | ISR | 30 min |
| Productos | ISR | 15 min |
| Checkout | SSR | - |
| Account | SSR | - |

### Structured Data

```typescript
// Cada producto incluye JSON-LD
const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "sku": product.sku,
  "offers": {
    "@type": "Offer",
    "price": product.price,
    "priceCurrency": "MXN",
    "availability": product.stock > 0
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock"
  }
};
```

---

## 8. Monitoreo

### Stack de Observabilidad

- **Errors**: Sentry
- **Metrics**: AWS CloudWatch
- **Logs**: CloudWatch Logs
- **Traces**: AWS X-Ray
- **Analytics**: PostHog

### Alertas Críticas

| Métrica | Umbral | Acción |
|---------|--------|--------|
| Error Rate | > 1% | Slack + PagerDuty |
| Latency P99 | > 3s | Slack |
| CPU | > 80% | Auto-scale |
| SYSCOM API | Down | Fallback to cache |

---

*Documento en desarrollo - Se actualizará durante implementación*
