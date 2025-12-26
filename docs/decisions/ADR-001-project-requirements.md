# ADR-001: Requisitos y Contexto del Proyecto

## Estado: ACEPTADO
## Fecha: 2025-12-26

## Contexto
Definición inicial del proyecto eCommerce-G basada en sesión de clarificación con el stakeholder.

## Decisiones

### Escala y Arquitectura
- **Número de tiendas**: 10-50 tiendas objetivo
- **Arquitectura**: Multi-tenant compartida
- **Modelo**: Multi-marca propia (no SaaS a terceros)

### Equipo
- **Estado actual**: Sin equipo técnico definido
- **Implicación**: El stack tecnológico definirá el perfil a contratar
- **Libertad**: Total para seleccionar la mejor tecnología

### MVP Definido
Funcionalidades core para lanzamiento:
1. Catálogo de productos (integración SYSCOM)
2. Checkout y procesamiento de pagos
3. Facturación CFDI 4.0
4. Panel de administración central

**Excluido del MVP** (fases posteriores):
- IA de servicio al cliente
- Sistema de mailing
- Funcionalidades B2B avanzadas (crédito, aprobaciones)

### Integraciones Definidas
| Integración | Decisión |
|-------------|----------|
| SYSCOM | Cuenta central única |
| Logística | Dropshipping SYSCOM |
| Hosting | AWS |
| PAC (CFDI) | Por seleccionar |

## Consecuencias

### Positivas
- Cuenta SYSCOM central simplifica integración
- Multi-marca propia reduce complejidad de permisos
- AWS proporciona todos los servicios necesarios
- Dropshipping reduce complejidad operativa

### Negativas/Riesgos
- Dependencia de SYSCOM para logística
- Sin equipo requiere onboarding completo
- MVP ambicioso puede requerir priorización

## Notas
- Documentación completa en `/docs/requirements/`
- Este ADR sirve como referencia base para decisiones posteriores
