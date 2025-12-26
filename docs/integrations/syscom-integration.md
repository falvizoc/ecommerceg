# Integración SYSCOM - eCommerce-G

## Información General
- **Proveedor**: SYSCOM (Sistemas de Emergencia, Seguridad y Comunicación)
- **API Docs**: https://developers.syscom.mx/docs
- **Postman Collection**: https://www.postman.com/syscom-dev/public/documentation/usqon6h/syscom-api
- **Rol**: Proveedor central de productos (+75,000 productos)

## Especificaciones Técnicas de la API

### Autenticación
- **Protocolo**: OAuth 2.0 (Client Credentials Flow)
- **Endpoint Token**: `POST https://developers.syscom.mx/oauth/token`
- **Parámetros**: `client_id`, `client_secret`, `grant_type=client_credentials`
- **Token Type**: Bearer
- **Expiración**: 365 días

### Configuración Base
- **Base URI**: `https://developers.syscom.mx/api/v1/`
- **Formato**: JSON
- **Rate Limit**: 60 requests/minuto por cliente
- **Header**: `Authorization: Bearer {ACCESS_TOKEN}`

## Funcionalidades Disponibles (Confirmadas)
- [x] Autenticación OAuth 2.0
- [x] Consulta de productos (marca, stock, información, características)
- [x] Imágenes de productos
- [x] Accesorios de productos
- [x] Categorías y subcategorías (por nombre o ID)
- [x] Listas personalizadas (crear, eliminar, modificar)
- [ ] Pedidos/Órdenes - Por confirmar
- [ ] RMA/Devoluciones - Por confirmar
- [ ] Webhooks - Por confirmar

## Endpoints Conocidos
| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/oauth/token` | POST | Obtener token de acceso |
| `/categorias` | GET | Listar categorías |
| `/productos` | GET | Consultar productos |
| Más endpoints por documentar... | | |

## Estrategia de Sincronización
> Pendiente definición

### Consideraciones:
1. Frecuencia de actualización de catálogo
2. Manejo de inventario en tiempo real vs cache
3. Estrategia de precios (markup configurable por tenant)
4. Manejo de productos descontinuados
5. Sincronización de imágenes (CDN propio vs SYSCOM)

## Flujo de Pedidos
> Pendiente mapeo

```
Cliente -> Tienda -> Plataforma -> SYSCOM
                                     |
                                     v
                              Fulfillment
                                     |
                                     v
                               Entrega
```

## Sistema RMA (Devoluciones)
> Basado en proceso RMA de SYSCOM

### Flujo Propuesto:
1. Cliente solicita RMA en tienda
2. Tienda valida solicitud
3. Sistema crea RMA en SYSCOM
4. SYSCOM procesa RMA
5. Actualización de estado
6. Resolución (reembolso/cambio)

## Preguntas para Documentación SYSCOM
1. ¿Rate limits de la API?
2. ¿Webhooks disponibles?
3. ¿Sandbox/ambiente de pruebas?
4. ¿Formatos de respuesta (JSON/XML)?
5. ¿Autenticación (OAuth, API Key, etc.)?
6. ¿Versionamiento de API?
7. ¿SLA de disponibilidad?

---
*Última actualización: 2025-12-26*
*Estado: Pendiente investigación de API*
