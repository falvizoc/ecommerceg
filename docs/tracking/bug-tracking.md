# Sistema de Tracking de Bugs - eCommerce-G

## Propósito
Documentar y dar seguimiento a bugs encontrados durante el desarrollo y producción.

---

## Proceso de Reporte de Bugs

### 1. Plantilla de Reporte

```markdown
## Bug Report

### ID: BUG-XXXX
### Fecha: YYYY-MM-DD
### Reportado por: [Nombre/Sistema]
### Severidad: [Critical/High/Medium/Low]
### Estado: [Open/In Progress/Fixed/Closed/Won't Fix]

### Descripción
[Descripción clara y concisa del bug]

### Pasos para Reproducir
1. Ir a '...'
2. Click en '...'
3. Scroll hasta '...'
4. Ver error

### Comportamiento Esperado
[Qué debería pasar]

### Comportamiento Actual
[Qué está pasando]

### Screenshots/Logs
[Si aplica]

### Ambiente
- **Browser**: [e.g. Chrome 120]
- **OS**: [e.g. Windows 11]
- **Tenant**: [e.g. tienda-prueba]
- **Versión**: [e.g. 1.2.3]

### Información Adicional
[Cualquier contexto adicional]

### Resolución
- **Fix commit**: [sha]
- **Versión corregida**: [x.y.z]
- **Fecha de fix**: [YYYY-MM-DD]
```

---

## Clasificación de Severidad

### Critical (P0)
- Sistema completamente caído
- Pérdida de datos
- Vulnerabilidad de seguridad activa
- Pagos no procesándose
- **SLA de respuesta**: 1 hora
- **SLA de resolución**: 4 horas

### High (P1)
- Funcionalidad principal no funciona
- Afecta a múltiples usuarios
- No hay workaround
- **SLA de respuesta**: 4 horas
- **SLA de resolución**: 24 horas

### Medium (P2)
- Funcionalidad secundaria afectada
- Existe workaround
- Afecta a pocos usuarios
- **SLA de respuesta**: 24 horas
- **SLA de resolución**: 1 semana

### Low (P3)
- Inconveniente menor
- Cosmético
- Edge case
- **SLA de respuesta**: 1 semana
- **SLA de resolución**: Próximo sprint

---

## Registro de Bugs

### Bugs Críticos (P0)

| ID | Descripción | Tenant | Reportado | Estado | Resolución |
|----|-------------|--------|-----------|--------|------------|
| - | Sin bugs registrados | - | - | - | - |

### Bugs Altos (P1)

| ID | Descripción | Tenant | Reportado | Estado | Resolución |
|----|-------------|--------|-----------|--------|------------|
| - | Sin bugs registrados | - | - | - | - |

### Bugs Medios (P2)

| ID | Descripción | Tenant | Reportado | Estado | Resolución |
|----|-------------|--------|-----------|--------|------------|
| - | Sin bugs registrados | - | - | - | - |

### Bugs Bajos (P3)

| ID | Descripción | Tenant | Reportado | Estado | Resolución |
|----|-------------|--------|-----------|--------|------------|
| - | Sin bugs registrados | - | - | - | - |

---

## Bugs Cerrados (Histórico)

### Q1 2025

| ID | Descripción | Severidad | Resolución | Versión |
|----|-------------|-----------|------------|---------|
| - | Sin bugs registrados | - | - | - |

---

## Métricas de Bugs

### Dashboard

```
Total Bugs Abiertos: 0
├── Critical: 0
├── High: 0
├── Medium: 0
└── Low: 0

Bugs Cerrados (último mes): 0
Tiempo Promedio de Resolución: N/A
```

### Tendencias

| Mes | Abiertos | Cerrados | Críticos | Ratio |
|-----|----------|----------|----------|-------|
| - | - | - | - | - |

---

## Integración con GitHub Issues

### Labels Recomendados

```yaml
# Severidad
- name: "bug: critical"
  color: "b60205"
  description: "Sistema caído, pérdida de datos"

- name: "bug: high"
  color: "d93f0b"
  description: "Funcionalidad principal afectada"

- name: "bug: medium"
  color: "fbca04"
  description: "Funcionalidad secundaria afectada"

- name: "bug: low"
  color: "0e8a16"
  description: "Inconveniente menor"

# Estado
- name: "status: investigating"
  color: "c5def5"

- name: "status: confirmed"
  color: "bfdadc"

- name: "status: in-progress"
  color: "0052cc"

- name: "status: needs-review"
  color: "5319e7"

# Área
- name: "area: checkout"
- name: "area: payments"
- name: "area: catalog"
- name: "area: admin"
- name: "area: auth"
- name: "area: cfdi"
- name: "area: syscom"
```

### Issue Template (.github/ISSUE_TEMPLATE/bug_report.md)

```markdown
---
name: Bug Report
about: Reportar un bug
title: '[BUG] '
labels: 'bug'
assignees: ''
---

## Descripción
[Descripción clara del bug]

## Severidad
- [ ] Critical (P0)
- [ ] High (P1)
- [ ] Medium (P2)
- [ ] Low (P3)

## Pasos para Reproducir
1.
2.
3.

## Comportamiento Esperado
[Qué debería pasar]

## Comportamiento Actual
[Qué está pasando]

## Ambiente
- Browser:
- OS:
- Tenant:
- Versión:

## Screenshots/Logs
[Si aplica]

## Contexto Adicional
[Cualquier información adicional]
```

---

## Proceso de Resolución

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Nuevo     │────▶│ Investigando│────▶│  Confirmado │
│   Bug       │     │             │     │             │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                    ┌──────────────────────────┘
                    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Cerrado   │◀────│   Review    │◀────│ En Progreso │
│             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Estados

| Estado | Descripción |
|--------|-------------|
| Open | Bug reportado, pendiente investigación |
| Investigating | En investigación |
| Confirmed | Bug confirmado, pendiente asignación |
| In Progress | En desarrollo de fix |
| In Review | PR abierto, en code review |
| Fixed | Mergeado, pendiente deploy |
| Closed | Desplegado y verificado |
| Won't Fix | No se arreglará (documentar razón) |

---

## Post-Mortem (Para bugs Critical)

### Template Post-Mortem

```markdown
# Post-Mortem: [Título del Incidente]

## Fecha del incidente: YYYY-MM-DD
## Duración: X horas
## Impacto: [Descripción del impacto]

## Timeline
- HH:MM - [Evento]
- HH:MM - [Evento]

## Root Cause
[Análisis de causa raíz]

## Resolución
[Cómo se resolvió]

## Lecciones Aprendidas
1.
2.

## Action Items
- [ ] [Acción preventiva 1]
- [ ] [Acción preventiva 2]
```

---

*Este documento se actualiza conforme se registran y resuelven bugs.*
