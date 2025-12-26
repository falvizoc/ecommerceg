# Preguntas de Clarificación - eCommerce-G

## Estado: En proceso de respuesta

---

## Categoría 1: Arquitectura y Escala

### Q1: Escala Inicial y Proyección
**Pregunta**: ¿Cuántas tiendas (tenants) esperan gestionar inicialmente y a qué escala proyectan en 12-24 meses?
- [ ] 1-10 tiendas
- [ ] 10-50 tiendas
- [ ] 50-200 tiendas
- [ ] 200+ tiendas

**Impacto**: Define arquitectura de base de datos (schema por tenant vs base de datos por tenant vs rows compartidos).

### Q2: Volumen de Tráfico
**Pregunta**: ¿Cuál es el volumen esperado de usuarios concurrentes por tienda?
- [ ] Bajo (<100 concurrentes)
- [ ] Medio (100-1000 concurrentes)
- [ ] Alto (1000+ concurrentes)

**Impacto**: Define estrategia de cache, CDN y escalabilidad.

### Q3: Modelo de Despliegue
**Pregunta**: ¿Cada tienda será un despliegue independiente o todas comparten la misma instancia?
- [ ] Multi-tenant compartido (1 aplicación, múltiples tiendas)
- [ ] Instancias separadas por tienda
- [ ] Híbrido (grupos de tiendas por instancia)

**Impacto**: Define infraestructura, costos y complejidad operativa.

---

## Categoría 2: Modelo de Negocio

### Q4: Modelo de Suscripción
**Pregunta**: ¿Cuál será el modelo de cobro a las tiendas suscritas?
- [ ] Tarifa fija mensual/anual
- [ ] Comisión por transacción
- [ ] Híbrido (tarifa + comisión)
- [ ] Por niveles (tiers con features diferentes)

**Impacto**: Define módulo de billing y métricas a trackear.

### Q5: Propietarios de Tiendas
**Pregunta**: ¿Las tiendas serán operadas por terceros o todas son de la misma empresa?
- [ ] Terceros independientes (verdadero SaaS)
- [ ] Todas de la misma empresa (multi-marca)
- [ ] Mixto

**Impacto**: Define nivel de aislamiento, permisos y compliance.

### Q6: Personalización de Productos
**Pregunta**: ¿Las tiendas podrán elegir qué productos de SYSCOM mostrar o es catálogo completo?
- [ ] Selección manual por tienda
- [ ] Catálogo completo con filtros
- [ ] Por categorías predefinidas
- [ ] Por criterios automáticos (margen, disponibilidad)

**Impacto**: Define lógica de sincronización y UI de administración.

---

## Categoría 3: Pagos y Facturación

### Q7: Flujo de Pagos
**Pregunta**: ¿Cómo fluye el dinero de las ventas?
- [ ] Directamente a cuenta de cada tienda
- [ ] A cuenta central con dispersión
- [ ] Mixto según método de pago

**Impacto**: Define integración de pasarelas y conciliación.

### Q8: PAC para CFDI
**Pregunta**: ¿Ya tienen un PAC (Proveedor Autorizado de Certificación) seleccionado para facturación?
- [ ] Sí: ________________
- [ ] No, necesitan recomendación
- [ ] Cada tienda usará su propio PAC

**Impacto**: Define integración de facturación.

### Q9: Facturación Automática
**Pregunta**: ¿La facturación automática es al momento de compra o bajo demanda?
- [ ] Al momento de compra siempre
- [ ] Solo si el cliente proporciona RFC
- [ ] Configurable por tienda

**Impacto**: Define flujo de checkout y almacenamiento de datos fiscales.

---

## Categoría 4: Tecnología

### Q10: Experiencia del Equipo
**Pregunta**: ¿Cuál es la experiencia técnica del equipo que mantendrá el proyecto?
- [ ] Principalmente PHP/Laravel
- [ ] Principalmente JavaScript/Node
- [ ] Python
- [ ] Mixto/Flexible
- [ ] Sin equipo definido aún

**Impacto**: Crítico para selección de stack.

### Q11: Hosting Preferido
**Pregunta**: ¿Tienen preferencia de hosting/cloud provider?
- [ ] AWS
- [ ] Google Cloud
- [ ] Azure
- [ ] DigitalOcean/Linode
- [ ] Hosting tradicional (VPS)
- [ ] Sin preferencia

**Impacto**: Define infraestructura y servicios disponibles.

### Q12: Proveedor de IA
**Pregunta**: ¿Tienen preferencia para el proveedor de IA del asistente de servicio al cliente?
- [ ] OpenAI (GPT)
- [ ] Anthropic (Claude)
- [ ] Google (Gemini)
- [ ] Open source (Llama, Mistral)
- [ ] Sin preferencia

**Impacto**: Define costos y capacidades del asistente.

---

## Categoría 5: Integraciones

### Q13: Credenciales SYSCOM
**Pregunta**: ¿Ya cuentan con credenciales de la API de SYSCOM (Client ID y Secret)?
- [ ] Sí
- [ ] No, en proceso
- [ ] No, necesitan guía para obtenerlas

**Impacto**: Define timeline de desarrollo de integración.

### Q14: Cuenta SYSCOM
**Pregunta**: ¿Cada tienda tendrá su propia cuenta SYSCOM o usan una cuenta central?
- [ ] Cuenta central para todas las tiendas
- [ ] Cuenta por tienda
- [ ] No lo saben aún

**Impacto**: Define arquitectura de la integración y precios.

### Q15: Envíos
**Pregunta**: ¿Cómo se manejarán los envíos?
- [ ] SYSCOM gestiona logística
- [ ] Integración con paqueterías (DHL, Fedex, etc.)
- [ ] Logística propia
- [ ] Por definir

**Impacto**: Define integraciones adicionales necesarias.

---

## Categoría 6: Funcionalidades B2B

### Q16: Crédito Comercial
**Pregunta**: ¿Se ofrecerán líneas de crédito a clientes B2B?
- [ ] Sí, gestionado por la plataforma
- [ ] Sí, gestionado externamente
- [ ] No inicialmente, feature futuro
- [ ] No

**Impacto**: Define módulo de crédito y riesgo.

### Q17: Aprobaciones de Compra
**Pregunta**: ¿Se requieren flujos de aprobación de compra para clientes corporativos?
- [ ] Sí
- [ ] No
- [ ] Configurable por cliente

**Impacto**: Define complejidad del módulo de clientes.

---

## Categoría 7: Timeline y Prioridades

### Q18: MVP
**Pregunta**: ¿Cuáles son las funcionalidades críticas para el MVP?
- Seleccionar las indispensables para lanzar:
- [ ] Multi-tenancy básico
- [ ] Catálogo SYSCOM
- [ ] Checkout con pagos
- [ ] Facturación CFDI
- [ ] Panel admin central
- [ ] IA de servicio al cliente
- [ ] RMA
- [ ] SEO optimizado
- [ ] Mailing

**Impacto**: Define fases de desarrollo y scope inicial.

### Q19: Restricciones de Tiempo
**Pregunta**: ¿Existe una fecha objetivo para el lanzamiento del MVP?
- [ ] ASAP
- [ ] 3 meses
- [ ] 6 meses
- [ ] Sin restricción específica

**Impacto**: Define velocidad de desarrollo vs. calidad.

---

## Categoría 8: Diseño

### Q20: Branding
**Pregunta**: ¿Ya existe un sistema de diseño o branding definido?
- [ ] Sí, completo
- [ ] Parcialmente
- [ ] No, requiere creación desde cero
- [ ] Cada tienda tendrá su propio branding

**Impacto**: Define alcance de trabajo de UX/UI.

---

*Documento generado: 2025-12-26*
*Estado: Pendiente respuestas*
