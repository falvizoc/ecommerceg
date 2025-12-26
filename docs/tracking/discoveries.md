# Gestión de Hallazgos y Descubrimientos

## Propósito
Documentar necesidades, funcionalidades o requisitos descubiertos durante el desarrollo que no fueron previstos en la planificación inicial.

---

## Registro de Hallazgos

### Hallazgos Activos

| ID | Fecha | Título | Impacto | Milestone | Estado |
|----|-------|--------|---------|-----------|--------|
| H-001 | 2025-12-26 | Sistema de Márgenes | Alto | 1.1, 1.7 | Documentado |

---

## H-001: Sistema de Márgenes de Utilidad

### Fecha: 2025-12-26
### Descubierto durante: Clarificación de requisitos
### Reportado por: Usuario

### Descripción
El modelo de negocio requiere un sistema configurable de márgenes de utilidad con tres niveles de granularidad:
1. Margen general por tenant
2. Margen por línea/categoría de productos
3. Margen por producto individual

### Impacto
- **Alto**: Afecta funcionalidad core del negocio

### Análisis
- ¿Es necesario para el MVP? **SÍ**
- ¿Afecta milestones existentes? **SÍ** (1.1 SYSCOM, 1.7 Admin)
- ¿Requiere cambio de arquitectura? **Parcial** (nuevo modelo de datos)

### Decisión
- [x] Agregar al milestone 1.1 (sincronización con cálculo de precios)
- [x] Agregar al milestone 1.7 (UI de configuración en admin)
- [x] Documentar en `/docs/requirements/business-model.md`

### Acciones Completadas
- [x] Crear documento `/docs/requirements/business-model.md`
- [x] Actualizar CLAUDE.md con modelo de negocio correcto
- [x] Definir modelo de datos para márgenes
- [ ] Actualizar schema Prisma (pendiente en Milestone 0.3)
- [ ] Agregar issues específicos a Phase 1

### Modelo de Datos Definido

```prisma
model TenantPricing {
  id              String   @id @default(uuid())
  tenantId        String   @unique
  tenant          Tenant   @relation(...)

  defaultMarginType   MarginType
  defaultMarginValue  Decimal
}

model CategoryMargin {
  id              String   @id @default(uuid())
  tenantId        String
  categoryId      String   // SYSCOM category ID
  marginType      MarginType
  marginValue     Decimal

  @@unique([tenantId, categoryId])
}

model ProductMargin {
  id              String   @id @default(uuid())
  tenantId        String
  productId       String   // SYSCOM product ID
  marginType      MarginType  // includes 'disabled'
  marginValue     Decimal?

  @@unique([tenantId, productId])
}

enum MarginType {
  PERCENTAGE      // +X% sobre costo
  FIXED_AMOUNT    // +$X sobre costo
  FIXED_PRICE     // Precio fijo ignorando costo
  DISABLED        // No mostrar producto
}
```

---

## Proceso de Gestión

### 1. Registro del Hallazgo
Cuando se descubre una necesidad no prevista:

```markdown
## Hallazgo: [TÍTULO]

### Fecha: YYYY-MM-DD
### Descubierto durante: [Milestone X.X]
### Reportado por: [Claude/Usuario]

### Descripción
[Descripción clara del hallazgo]

### Impacto
- **Crítico**: Bloquea el avance del proyecto
- **Alto**: Afecta funcionalidad core
- **Medio**: Mejora importante
- **Bajo**: Nice-to-have

### Análisis
- ¿Es necesario para el MVP?
- ¿Afecta milestones existentes?
- ¿Requiere cambio de arquitectura?

### Decisión
- [ ] Agregar al milestone actual
- [ ] Agregar a milestone posterior
- [ ] Crear nuevo milestone
- [ ] Documentar para Fase 2+
- [ ] Rechazar (documentar razón)

### Acciones
- [ ] Actualizar ADR si aplica
- [ ] Crear issues en GitHub
- [ ] Actualizar CLAUDE.md
- [ ] Notificar impacto en plan
```

### 2. Clasificación

| Tipo | Acción | Documentación |
|------|--------|---------------|
| **Bloqueante** | Resolver inmediatamente | ADR + Issue prioritario |
| **Necesario MVP** | Agregar al milestone apropiado | Issue + actualizar plan |
| **Mejora** | Evaluar y priorizar | Backlog Fase 2+ |
| **Deuda técnica** | Documentar para refactor | Technical debt log |

### 3. Flujo de Decisión

```
Hallazgo detectado
       ↓
¿Bloquea el avance actual?
       ↓
   Sí → Resolver ahora, documentar ADR
   No → ¿Es necesario para MVP?
              ↓
          Sí → Agregar a milestone apropiado
          No → Documentar en backlog Fase 2+
```

---

### Hallazgos Resueltos

| ID | Fecha | Título | Resolución |
|----|-------|--------|------------|
| - | - | Sin hallazgos resueltos | - |

---

## Backlog de Mejoras (Post-MVP)

| ID | Descripción | Prioridad | Origen |
|----|-------------|-----------|--------|
| - | Sin items en backlog | - | - |

---

## Deuda Técnica Identificada

| ID | Descripción | Impacto | Plan de Resolución |
|----|-------------|---------|-------------------|
| - | Sin deuda técnica registrada | - | - |

---

*Este documento se actualiza cada vez que se identifica un hallazgo.*
*Última actualización: 2025-12-26*
