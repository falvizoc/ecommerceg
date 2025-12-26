# Configuración de Sub-Agentes Especialistas

## Propósito
Los sub-agentes permiten delegar tareas especializadas manteniendo contexto y consistencia en el proyecto.

## Agentes Definidos

### 1. Security Agent
**Propósito**: Auditoría OWASP, análisis de vulnerabilidades, cumplimiento de seguridad
**Contexto requerido**:
- `/docs/security/owasp-compliance.md`
- `/docs/requirements/project-definition.md`
**Tareas típicas**:
- Revisar código por vulnerabilidades
- Validar cumplimiento OWASP
- Analizar dependencias
- Revisar configuraciones de seguridad

### 2. Frontend Agent
**Propósito**: UI/UX, optimización de conversiones, accesibilidad
**Contexto requerido**:
- `/docs/ux/design-system.md`
- `/docs/requirements/project-definition.md`
**Tareas típicas**:
- Implementar componentes UI
- Optimizar checkout
- Mejorar experiencia móvil
- Implementar A/B testing

### 3. Backend Agent
**Propósito**: APIs, lógica de negocio, base de datos
**Contexto requerido**:
- `/docs/architecture/system-design.md`
- `/docs/api/`
**Tareas típicas**:
- Diseñar e implementar APIs
- Optimizar queries
- Implementar reglas de negocio
- Gestionar cache

### 4. Integration Agent
**Propósito**: Integraciones con SYSCOM, pasarelas de pago, facturación
**Contexto requerido**:
- `/docs/integrations/`
- `/docs/api/syscom-integration.md`
**Tareas típicas**:
- Implementar conexión SYSCOM
- Integrar pasarelas de pago
- Configurar CFDI 4.0
- Manejar webhooks

### 5. SEO Agent
**Propósito**: SEO tradicional y para IA, indexación de productos
**Contexto requerido**:
- `/docs/requirements/project-definition.md`
**Tareas típicas**:
- Implementar schema markup
- Optimizar meta tags
- Configurar sitemaps
- AEO (Answer Engine Optimization)

### 6. DevOps Agent
**Propósito**: Infraestructura, CI/CD, despliegue multi-tenant
**Contexto requerido**:
- `/docs/architecture/infrastructure.md`
- `/infrastructure/`
**Tareas típicas**:
- Configurar CI/CD
- Gestionar despliegues
- Configurar dominios
- Monitoreo

## Protocolo de Comunicación
1. Cada agente debe leer sus documentos de contexto antes de actuar
2. Los resultados deben documentarse en la carpeta correspondiente
3. Decisiones importantes se registran en `/docs/decisions/`
4. Mantener consistencia con CLAUDE.md

## Invocación
```
Task tool con subagent_type apropiado + prompt con contexto específico
```

---
*Última actualización: 2025-12-26*
