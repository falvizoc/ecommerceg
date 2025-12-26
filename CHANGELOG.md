# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/),
y este proyecto adhiere a [Versionado Semántico](https://semver.org/lang/es/).

---

## [Unreleased]

### Added
- Estructura documental inicial del proyecto
- CLAUDE.md para contexto de Claude Code
- Documentación de arquitectura y decisiones (ADRs)
- Roadmap de producto (Fase 0-4)
- Sistema de tracking de bugs
- Documentación del modelo de negocio (dropshipping con márgenes configurables)
- **Milestone 0.1: Scaffolding del Proyecto**
  - Proyecto Next.js 16 con App Router y TypeScript
  - Configuración ESLint con reglas estrictas
  - Configuración Prettier con plugin Tailwind
  - Estructura de carpetas según arquitectura definida
  - Template de variables de entorno (.env.example)
  - Páginas base (layout, error, not-found, loading)
  - Utilidades base (cn, formatCurrency, formatDate)
  - Tipos TypeScript base

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- N/A

---

## Plantilla para nuevas entradas

<!--
## [X.Y.Z] - YYYY-MM-DD

### Added
- Nuevas funcionalidades

### Changed
- Cambios en funcionalidades existentes

### Deprecated
- Funcionalidades que serán removidas en futuras versiones

### Removed
- Funcionalidades removidas

### Fixed
- Corrección de bugs

### Security
- Vulnerabilidades corregidas
-->

---

## Guía de Versionado

### MAJOR.MINOR.PATCH

- **MAJOR**: Cambios incompatibles con versiones anteriores
- **MINOR**: Nueva funcionalidad compatible con versiones anteriores
- **PATCH**: Correcciones de bugs compatibles con versiones anteriores

### Ejemplos

| Tipo de cambio | Versión anterior | Nueva versión |
|----------------|------------------|---------------|
| Bug fix | 1.0.0 | 1.0.1 |
| Nueva feature | 1.0.1 | 1.1.0 |
| Breaking change | 1.1.0 | 2.0.0 |

---

## Convención de Commits

Este proyecto usa [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>[scope opcional]: <descripción>

[cuerpo opcional]

[footer(s) opcional(es)]
```

### Tipos

| Tipo | Descripción | Impacto en versión |
|------|-------------|-------------------|
| `feat` | Nueva funcionalidad | MINOR |
| `fix` | Corrección de bug | PATCH |
| `docs` | Documentación | - |
| `style` | Formato (no afecta código) | - |
| `refactor` | Refactorización | - |
| `perf` | Mejora de rendimiento | PATCH |
| `test` | Tests | - |
| `chore` | Tareas de mantenimiento | - |
| `ci` | CI/CD | - |
| `build` | Sistema de build | - |
| `revert` | Revert de commit | PATCH |
| `BREAKING CHANGE` | Cambio incompatible | MAJOR |

### Ejemplos de commits

```bash
# Feature nueva
feat(cart): add persistent shopping cart

# Bug fix
fix(checkout): resolve payment timeout issue

# Breaking change
feat(api)!: change response format for products endpoint

BREAKING CHANGE: The products endpoint now returns paginated results.
```

---

## Registro de Bugs Conocidos

### Bugs Activos

| ID | Descripción | Severidad | Estado | Reportado |
|----|-------------|-----------|--------|-----------|
| - | Sin bugs registrados | - | - | - |

### Severidades

- **Critical**: Sistema no funcional, pérdida de datos
- **High**: Funcionalidad principal afectada
- **Medium**: Funcionalidad secundaria afectada
- **Low**: Inconveniente menor, workaround disponible

---

## Referencias

- [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/)
- [Semantic Versioning](https://semver.org/lang/es/)
- [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/)
