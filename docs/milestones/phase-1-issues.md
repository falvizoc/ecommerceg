# Fase 1: MVP - Issues Detallados

## Milestone 1.1: Integración SYSCOM

### Issue 1.1.1: Cliente API SYSCOM
**Labels**: `type: feature`, `area: syscom`, `priority: critical`

**Descripción**: Crear cliente para API de SYSCOM con OAuth 2.0.

**Entregables**:
- [ ] `src/lib/syscom/client.ts`
- [ ] `src/lib/syscom/auth.ts`
- [ ] Manejo de rate limits
- [ ] Retry logic

---

### Issue 1.1.2: Tipos TypeScript SYSCOM
**Labels**: `type: feature`, `area: syscom`, `priority: high`

**Entregables**:
- [ ] `src/types/syscom.ts`
- [ ] Tipos para productos, categorías, stock

---

### Issue 1.1.3: Sincronización de catálogo
**Labels**: `type: feature`, `area: syscom`, `priority: critical`

**Descripción**: Job para sincronizar productos de SYSCOM a DB local.

---

### Issue 1.1.4: Cache de productos en Redis
**Labels**: `type: feature`, `area: backend`, `priority: critical`

**Descripción**: Cachear productos con TTL configurable.

---

## Milestone 1.2: Storefront Catálogo

### Issue 1.2.1: Homepage tienda
**Labels**: `type: feature`, `area: frontend`, `priority: critical`

---

### Issue 1.2.2: Página de categoría
**Labels**: `type: feature`, `area: frontend`, `priority: critical`

---

### Issue 1.2.3: Página de producto
**Labels**: `type: feature`, `area: frontend`, `priority: critical`

---

### Issue 1.2.4: Búsqueda con Meilisearch
**Labels**: `type: feature`, `area: frontend`, `priority: high`

---

### Issue 1.2.5: Filtros y ordenamiento
**Labels**: `type: feature`, `area: frontend`, `priority: medium`

---

## Milestone 1.3: Carrito de Compras

### Issue 1.3.1: Schema carrito
**Labels**: `type: feature`, `area: database`, `priority: critical`

---

### Issue 1.3.2: API de carrito
**Labels**: `type: feature`, `area: backend`, `priority: critical`

---

### Issue 1.3.3: Hook useCart
**Labels**: `type: feature`, `area: frontend`, `priority: critical`

---

### Issue 1.3.4: Componentes UI carrito
**Labels**: `type: feature`, `area: frontend`, `priority: critical`

---

### Issue 1.3.5: Persistencia carrito
**Labels**: `type: feature`, `area: backend`, `priority: high`

---

## Milestone 1.4: Checkout Flow

### Issue 1.4.1: Página checkout
**Labels**: `type: feature`, `area: frontend`, `priority: critical`

---

### Issue 1.4.2: Formulario de envío
**Labels**: `type: feature`, `area: frontend`, `priority: critical`

---

### Issue 1.4.3: Formulario de facturación
**Labels**: `type: feature`, `area: frontend`, `priority: critical`

---

### Issue 1.4.4: Validación RFC
**Labels**: `type: feature`, `area: backend`, `priority: critical`

---

### Issue 1.4.5: Schema Order
**Labels**: `type: feature`, `area: database`, `priority: critical`

---

### Issue 1.4.6: API crear orden
**Labels**: `type: feature`, `area: backend`, `priority: critical`

---

## Milestone 1.5: Pasarelas de Pago

### Issue 1.5.1: Integración MercadoPago
**Labels**: `type: feature`, `area: payments`, `priority: critical`

---

### Issue 1.5.2: Integración Openpay
**Labels**: `type: feature`, `area: payments`, `priority: high`

---

### Issue 1.5.3: Integración PayPal
**Labels**: `type: feature`, `area: payments`, `priority: high`

---

### Issue 1.5.4: Webhooks de pago
**Labels**: `type: feature`, `area: payments`, `priority: critical`

---

### Issue 1.5.5: 3D Secure
**Labels**: `type: feature`, `area: payments`, `priority: critical`

---

## Milestone 1.6: Facturación CFDI

### Issue 1.6.1: Cliente Facturapi
**Labels**: `type: feature`, `area: cfdi`, `priority: critical`

---

### Issue 1.6.2: Configuración fiscal por tenant
**Labels**: `type: feature`, `area: cfdi`, `priority: critical`

---

### Issue 1.6.3: Generación CFDI
**Labels**: `type: feature`, `area: cfdi`, `priority: critical`

---

### Issue 1.6.4: Almacenamiento S3
**Labels**: `type: feature`, `area: cfdi`, `priority: high`

---

### Issue 1.6.5: Página solicitar factura
**Labels**: `type: feature`, `area: frontend`, `area: cfdi`, `priority: critical`

---

### Issue 1.6.6: Envío email con factura
**Labels**: `type: feature`, `area: cfdi`, `priority: high`

---

## Milestone 1.7: Panel Admin

### Issue 1.7.1: Layout admin
**Labels**: `type: feature`, `area: admin`, `priority: critical`

---

### Issue 1.7.2: Dashboard métricas
**Labels**: `type: feature`, `area: admin`, `priority: critical`

---

### Issue 1.7.3: CRUD tenants
**Labels**: `type: feature`, `area: admin`, `priority: critical`

---

### Issue 1.7.4: Gestión órdenes
**Labels**: `type: feature`, `area: admin`, `priority: critical`

---

### Issue 1.7.5: Gestión clientes
**Labels**: `type: feature`, `area: admin`, `priority: high`

---

### Issue 1.7.6: Configuración visual tenant
**Labels**: `type: feature`, `area: admin`, `priority: high`

---

## Milestone 1.8: SEO y Legal

### Issue 1.8.1: Meta tags dinámicos
**Labels**: `type: feature`, `area: frontend`, `priority: high`

---

### Issue 1.8.2: Sitemap.xml
**Labels**: `type: feature`, `priority: high`

---

### Issue 1.8.3: Schema.org productos
**Labels**: `type: feature`, `priority: high`

---

### Issue 1.8.4: Aviso de privacidad
**Labels**: `type: feature`, `priority: critical`

---

### Issue 1.8.5: Términos y condiciones
**Labels**: `type: feature`, `priority: critical`

---

### Issue 1.8.6: Banner cookies
**Labels**: `type: feature`, `priority: high`

---

## Milestone 1.9: Testing y QA

### Issue 1.9.1: Tests unitarios
**Labels**: `type: test`, `priority: high`

---

### Issue 1.9.2: Tests integración
**Labels**: `type: test`, `priority: high`

---

### Issue 1.9.3: Tests E2E
**Labels**: `type: test`, `priority: critical`

---

### Issue 1.9.4: Checklist QA
**Labels**: `type: docs`, `priority: high`

---

## Milestone 1.10: Go-Live

### Issue 1.10.1: Infraestructura producción
**Labels**: `type: infra`, `area: devops`, `priority: critical`

---

### Issue 1.10.2: DNS producción
**Labels**: `type: infra`, `area: devops`, `priority: critical`

---

### Issue 1.10.3: Monitoreo
**Labels**: `type: infra`, `area: devops`, `priority: critical`

---

### Issue 1.10.4: Runbook operaciones
**Labels**: `type: docs`, `priority: high`

---

### Issue 1.10.5: Crear primer tenant
**Labels**: `type: feature`, `priority: critical`

---

*Total Issues Fase 1: ~50 issues*
