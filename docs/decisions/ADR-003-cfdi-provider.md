# ADR-003: Selección de PAC para CFDI 4.0

## Estado: PROPUESTO
## Fecha: 2025-12-26

## Contexto
Se requiere un PAC (Proveedor Autorizado de Certificación) para facturación electrónica CFDI 4.0 en México. El proveedor debe:
- Tener API REST moderna
- SDK para Node.js/TypeScript
- Soporte para múltiples razones sociales (multi-tenant)
- Cumplimiento CFDI 4.0 vigente
- Documentación clara

## Opciones Evaluadas

### 1. Facturapi (RECOMENDADO)
**URL**: https://facturapi.io

**Pros:**
- SDK oficial Node.js mantenido
- API estilo Stripe (muy developer-friendly)
- Multi-organización nativo
- Documentación excelente
- Sandbox para pruebas
- Webhooks disponibles
- Soporte para todos los complementos

**Contras:**
- Costo por factura (modelo pay-as-you-go)
- Dependencia de servicio externo

**Precios** (aproximados):
- Free: 25 facturas/mes
- Starter: ~$299 MXN/mes (500 facturas)
- Business: ~$899 MXN/mes (2000 facturas)
- Enterprise: Personalizado

### 2. FiscalAPI
**URL**: https://fiscalapi.com

**Pros:**
- API REST moderna
- Prueba gratuita 30 días
- Multi RFC
- Timbrado automático

**Contras:**
- Comunidad más pequeña
- Menos integraciones listas

### 3. Facturama
**URL**: https://facturama.mx

**Pros:**
- Librerías múltiples lenguajes
- API bien documentada
- Experiencia en el mercado

**Contras:**
- SDK Node.js menos moderno
- UX de documentación inferior a Facturapi

### 4. Finkok
**URL**: https://finkok.com

**Pros:**
- PAC directo autorizado por SAT
- Precios competitivos
- Alto volumen

**Contras:**
- API menos moderna
- Documentación técnica densa
- Sin SDK oficial Node.js

## Decisión: Facturapi

### Justificación
1. **Developer Experience**: API estilo Stripe, muy fácil de integrar
2. **Node.js SDK**: Oficial y bien mantenido
3. **Multi-tenant**: Soporte nativo para múltiples organizaciones
4. **Sandbox**: Pruebas sin costo
5. **Webhooks**: Notificaciones de eventos (cancelaciones, etc.)

## Implementación

### Estructura Multi-Tenant
```typescript
// Cada tienda tendrá su propia "Organization" en Facturapi
interface TenantBillingConfig {
  tenantId: string;
  facturapi_organization_id: string;
  facturapi_api_key: string; // Encriptado
  rfc: string;
  razon_social: string;
  regimen_fiscal: string;
  domicilio_fiscal: object;
  // Certificados CSD por organización
}
```

### Flujo de Facturación
1. Cliente solicita factura (checkout o post-venta)
2. Sistema valida RFC del cliente
3. Sistema genera CFDI vía Facturapi
4. Facturapi timbra con el SAT
5. Sistema almacena referencia y envía por email
6. Cliente puede descargar XML/PDF

## Costos Estimados

| Tiendas | Facturas/mes estimadas | Plan | Costo mensual |
|---------|------------------------|------|---------------|
| 10 | ~500 | Starter | ~$299 MXN |
| 25 | ~1500 | Business | ~$899 MXN |
| 50 | ~3000 | Enterprise | ~$2,500 MXN |

## Consecuencias

### Positivas
- Integración rápida (~2-3 días desarrollo)
- Mantenimiento delegado al proveedor
- Actualizaciones SAT automáticas

### Negativas
- Costo variable por volumen
- Dependencia externa
- Latencia adicional en facturación

## Referencias
- Facturapi Docs: https://docs.facturapi.io
- Facturapi Node SDK: https://github.com/FacturAPI/facturapi-node
- SAT CFDI 4.0: https://www.sat.gob.mx/consultas/35025/formato-de-factura-electronica-(anexo-20)
