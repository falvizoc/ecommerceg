# Modelo de Negocio - eCommerce-G

## Resumen Ejecutivo

**Modelo**: Compra-venta por dropshipping
**Proveedor**: SYSCOM (cuenta central)
**Clientes**: Usuarios finales (B2B preferente, abierto a público)
**Logística**: Dropshipping directo desde SYSCOM

---

## Flujo de Negocio

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   SYSCOM    │      │  Plataforma │      │   Cliente   │
│  Proveedor  │◄────►│  eCommerce-G│◄────►│   Final     │
└─────────────┘      └─────────────┘      └─────────────┘
       │                    │                    │
       │   Precio base      │   Precio + margen  │
       │◄───────────────────│───────────────────►│
       │                    │                    │
       │   Envía producto   │   Paga producto    │
       │───────────────────►│◄───────────────────│
       │                    │                    │
       │                    │   Factura CFDI     │
       │                    │───────────────────►│
```

### Proceso de Venta

1. **Catálogo**: Productos sincronizados desde SYSCOM
2. **Precio**: Precio SYSCOM + margen configurado
3. **Compra**: Cliente paga en la tienda
4. **Orden**: Sistema crea orden en SYSCOM
5. **Envío**: SYSCOM envía directo al cliente (dropshipping)
6. **Factura**: La tienda factura al cliente (CFDI con razón social de la tienda)

---

## Tiendas Especializadas (Nichos)

Cada tienda se especializa en un nicho de productos SYSCOM:

| Tienda Ejemplo | Nicho | Categorías SYSCOM |
|----------------|-------|-------------------|
| ContraIncendio.mx | Protección contra incendio | Extintores, detectores, rociadores |
| CableadoPro.mx | Cableado estructurado | Cables, conectores, patch panels, racks |
| AlarmasMX.com | Sistemas de alarma | Paneles, sensores, sirenas |
| CCTVTotal.mx | Videovigilancia | Cámaras, DVR/NVR, monitores |
| RadioCom.mx | Radiocomunicación | Radios, antenas, accesorios |
| RedesYMas.mx | Networking | Switches, routers, access points |

### Configuración por Tienda

Cada tenant puede configurar:
- **Categorías visibles**: Qué categorías de SYSCOM mostrar
- **Productos excluidos**: Productos específicos a ocultar
- **Branding**: Logo, colores, dominio
- **Razón social**: Para facturación CFDI
- **Márgenes**: Sistema de precios (ver siguiente sección)

---

## Sistema de Márgenes de Utilidad

### Niveles de Configuración

```
┌─────────────────────────────────────────────────────────┐
│                    MARGEN GENERAL                        │
│                    (Aplica a todo)                       │
│  ┌───────────────────────────────────────────────────┐  │
│  │              MARGEN POR LÍNEA/CATEGORÍA           │  │
│  │              (Sobrescribe general)                │  │
│  │  ┌─────────────────────────────────────────────┐  │  │
│  │  │           MARGEN POR PRODUCTO              │  │  │
│  │  │           (Máxima prioridad)               │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Tipos de Margen

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| **Porcentaje sobre costo** | Añadir % al precio SYSCOM | +25% sobre $1,000 = $1,250 |
| **Monto fijo** | Añadir cantidad fija | +$150 sobre $1,000 = $1,150 |
| **Precio fijo** | Ignorar costo, precio manual | Precio = $1,500 |
| **Descuento sobre lista** | Descuento del precio sugerido | -10% sobre $1,500 = $1,350 |

### Prioridad de Aplicación

1. **Margen por producto** (si existe) → Usar este
2. **Margen por categoría** (si existe) → Usar este
3. **Margen general del tenant** → Usar este (fallback)

### Modelo de Datos

```typescript
interface TenantPricing {
  tenantId: string;

  // Margen general (fallback)
  defaultMargin: {
    type: 'percentage' | 'fixed_amount' | 'fixed_price';
    value: number;
  };
}

interface CategoryMargin {
  tenantId: string;
  categoryId: string;  // ID de categoría SYSCOM
  margin: {
    type: 'percentage' | 'fixed_amount' | 'fixed_price';
    value: number;
  };
}

interface ProductMargin {
  tenantId: string;
  productId: string;  // ID de producto SYSCOM
  margin: {
    type: 'percentage' | 'fixed_amount' | 'fixed_price' | 'disabled';
    value: number;
  };
  // disabled = no mostrar este producto
}
```

### Cálculo de Precio Final

```typescript
function calculatePrice(
  syscomPrice: number,
  margin: Margin
): number {
  switch (margin.type) {
    case 'percentage':
      return syscomPrice * (1 + margin.value / 100);
    case 'fixed_amount':
      return syscomPrice + margin.value;
    case 'fixed_price':
      return margin.value;
    case 'disabled':
      return null; // No mostrar producto
  }
}

function getProductPrice(
  tenantId: string,
  productId: string,
  categoryId: string,
  syscomPrice: number
): number {
  // 1. Buscar margen por producto
  const productMargin = getProductMargin(tenantId, productId);
  if (productMargin) {
    return calculatePrice(syscomPrice, productMargin);
  }

  // 2. Buscar margen por categoría
  const categoryMargin = getCategoryMargin(tenantId, categoryId);
  if (categoryMargin) {
    return calculatePrice(syscomPrice, categoryMargin);
  }

  // 3. Usar margen general
  const defaultMargin = getTenantDefaultMargin(tenantId);
  return calculatePrice(syscomPrice, defaultMargin);
}
```

---

## UI de Configuración de Márgenes

### Panel Admin - Configuración de Precios

```
┌─────────────────────────────────────────────────────────┐
│  Configuración de Márgenes - Tienda: ContraIncendio.mx │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  MARGEN GENERAL                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Tipo: [Porcentaje ▼]  Valor: [25] %             │   │
│  │                                                  │   │
│  │ Precio base SYSCOM + 25% = Precio de venta     │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  MÁRGENES POR CATEGORÍA                    [+ Agregar] │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Extintores          │ +30% │ [Editar] [Eliminar]│   │
│  │ Detectores de humo  │ +20% │ [Editar] [Eliminar]│   │
│  │ Gabinetes           │ +$50 │ [Editar] [Eliminar]│   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  MÁRGENES POR PRODUCTO                     [+ Agregar] │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Extintor ABC 6kg    │ $899 (fijo) │ [Editar]    │   │
│  │ Detector Z-123      │ Oculto      │ [Mostrar]   │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  [Vista previa de precios]        [Guardar cambios]    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Consideraciones de Implementación

### Cache de Precios

```
Precio final = f(precio_syscom, margen)
              └── Cambia frecuente    └── Cambia poco

Estrategia:
- Cachear precio SYSCOM (TTL corto, ej: 1 hora)
- Cachear márgenes (TTL largo, invalidar al cambiar)
- Calcular precio final al vuelo o cachear resultado
```

### Sincronización de Precios

1. **Job periódico**: Actualizar precios SYSCOM cada X minutos
2. **Invalidación**: Al cambiar margen, invalidar cache de precios afectados
3. **Bulk update**: UI para recalcular todos los precios de una categoría

### Alertas de Margen

- Alertar si margen resulta en pérdida (precio < costo)
- Alertar si precio final es muy alto vs competencia (opcional)
- Reportes de margen promedio por categoría

---

## Reportes de Negocio

### Métricas por Tienda

| Métrica | Descripción |
|---------|-------------|
| Margen bruto | Suma(precio_venta - costo_syscom) |
| Margen promedio | Promedio de % de margen |
| Productos vendidos | Por categoría |
| Top productos | Por volumen y por margen |

### Dashboard Admin Central

- Comparativa de márgenes entre tiendas
- Alertas de productos con margen bajo
- Sugerencias de optimización de precios

---

*Documento creado: 2025-12-26*
*Última actualización: 2025-12-26*
