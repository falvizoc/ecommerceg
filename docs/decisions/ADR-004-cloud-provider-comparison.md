# ADR-004: Comparativa AWS vs Azure

## Estado: ANÁLISIS COMPARATIVO
## Fecha: 2025-12-26

---

## 1. Contexto México

### Disponibilidad de Regiones en México

| Proveedor | Región | Ubicación | AZs | Estado |
|-----------|--------|-----------|-----|--------|
| **AWS** | mx-central-1 | Querétaro | 3 | Disponible (2024) |
| **Azure** | Mexico Central | Querétaro | 3 | Disponible (2024) |

**Conclusión**: Ambos proveedores tienen infraestructura en México con 3 zonas de disponibilidad. Empate técnico en latencia para usuarios mexicanos.

---

## 2. Comparativa de Precios (Contenedores Serverless)

### Modelo de Precios

| Aspecto | AWS Fargate | Azure Container Apps |
|---------|-------------|---------------------|
| Modelo | Pay-per-use por segundo | Pay-per-use por segundo |
| vCPU/hora | ~$0.04048 | ~$0.000024/seg (~$0.086/hr) |
| GB RAM/hora | ~$0.004445 | ~$0.000003/seg (~$0.011/hr) |
| **Costo estimado*** | **Más económico** | ~2x más caro |

*Según análisis de [Sliplane](https://sliplane.io/blog/comparing-prices-aws-fargate-vs-azure-container-apps-vs-google-cloud-run)

### Costos Adicionales Similares
- Egress (tráfico saliente): Similar en ambos
- Storage: Similar
- Registros de contenedores: Similar
- Load Balancers: Similar

---

## 3. Comparativa de Servicios Equivalentes

| Servicio | AWS | Azure | Notas |
|----------|-----|-------|-------|
| **Contenedores** | ECS Fargate | Container Apps | AWS más maduro |
| **Base de datos** | RDS PostgreSQL | Azure Database for PostgreSQL | Equivalentes |
| **Cache** | ElastiCache | Azure Cache for Redis | Equivalentes |
| **Storage** | S3 | Blob Storage | S3 más económico |
| **CDN** | CloudFront | Azure CDN / Front Door | CloudFront más robusto |
| **DNS** | Route 53 | Azure DNS | Route 53 más flexible |
| **Secrets** | Secrets Manager | Key Vault | Equivalentes |
| **CI/CD** | CodePipeline/CodeBuild | Azure DevOps | Azure DevOps superior |
| **Monitoreo** | CloudWatch + X-Ray | Application Insights | Azure más integrado |
| **Serverless** | Lambda | Azure Functions | Equivalentes |

---

## 4. Ventajas de AWS

### Técnicas
1. **Madurez del ecosistema**: AWS tiene más años en el mercado (2006 vs 2010)
2. **Documentación**: Más extensa y ejemplos de la comunidad
3. **ECS Fargate**: Más maduro que Azure Container Apps
4. **S3**: Estándar de facto, más integraciones
5. **CloudFront**: CDN más robusto globalmente
6. **Route 53**: Mejor para multi-tenant con dominios dinámicos

### Para Este Proyecto
1. **Next.js**: AWS Amplify tiene soporte nativo excelente
2. **Comunidad**: Más recursos/tutoriales Next.js + AWS
3. **Precios contenedores**: ~50% más económico que Azure
4. **Flexibilidad**: Más opciones de configuración

---

## 5. Ventajas de Azure

### Técnicas
1. **Integración Microsoft**: Si usas Office 365, Teams, etc.
2. **Azure DevOps**: CI/CD superior a AWS CodePipeline
3. **Application Insights**: Monitoreo más integrado
4. **Hybrid Cloud**: Mejor si tienes infraestructura on-premise
5. **Container Apps**: Escala a cero automáticamente (costo $0 en idle)

### Para Este Proyecto
1. **Scale to Zero**: Ahorro en tiendas con poco tráfico
2. **KEDA Scalers**: Escalado basado en eventos más fácil
3. **Dapr Integration**: Si se requiere microservicios complejos
4. **Mexico Central**: Mismo tiempo que AWS, ambos nuevos

---

## 6. Tabla Comparativa Final

| Criterio | AWS | Azure | Ganador |
|----------|-----|-------|---------|
| Precio Contenedores | $$ | $$$$ | AWS |
| Precio Storage | $$ | $$$ | AWS |
| Madurez | 10/10 | 8/10 | AWS |
| Documentación | 9/10 | 8/10 | AWS |
| Next.js Support | 9/10 | 7/10 | AWS |
| CI/CD Nativo | 6/10 | 9/10 | Azure |
| Monitoreo | 7/10 | 9/10 | Azure |
| Scale to Zero | No nativo | Sí | Azure |
| Multi-tenant DNS | 9/10 | 7/10 | AWS |
| Comunidad | 10/10 | 8/10 | AWS |
| **TOTAL** | **81/100** | **74/100** | **AWS** |

---

## 7. Recomendación

### AWS sigue siendo la recomendación por:

1. **Costo**: ~50% más económico en contenedores
2. **Next.js**: Mejor soporte y más recursos
3. **Route 53**: Crítico para multi-tenant con dominios custom
4. **S3 + CloudFront**: Stack probado para assets/CDN
5. **Comunidad**: Más fácil encontrar soluciones

### Cuándo considerar Azure:

1. Si ya tienen suscripción Enterprise Azure
2. Si el equipo tiene más experiencia en Azure
3. Si necesitan integración profunda con Microsoft 365
4. Si las tiendas tienen tráfico muy variable (scale to zero)

---

## 8. Opción Híbrida (Alternativa)

```
Frontend: Vercel (optimizado para Next.js)
Backend/DB: AWS (RDS, ElastiCache, S3)
CI/CD: GitHub Actions (neutral)
```

Esta opción ofrece:
- Mejor DX para Next.js (Vercel)
- Costos optimizados de infraestructura (AWS)
- CI/CD más simple (GitHub Actions)

---

## Referencias
- [Azure vs AWS Pricing 2025](https://www.wiz.io/academy/azure-vs-aws-cloud-cost)
- [AWS vs Azure Comparison](https://tkxel.com/blog/aws-vs-azure-2024/)
- [Container Pricing Comparison](https://sliplane.io/blog/comparing-prices-aws-fargate-vs-azure-container-apps-vs-google-cloud-run)
- [AWS Mexico Region](https://aws.amazon.com/blogs/aws/now-open-aws-mexico-central-region/)
- [Azure Mexico Central](https://news.microsoft.com/es-xl/microsoft-launches-its-first-hyper-scale-cloud-datacenter-region-in-mexico/)
