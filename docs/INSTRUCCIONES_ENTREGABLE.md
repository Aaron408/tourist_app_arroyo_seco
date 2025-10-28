# 📄 Instrucciones para Crear el Entregable PDF

## Objetivo

Crear un documento PDF único que contenga todos los elementos requeridos para la evaluación.

---

## Estructura del Documento

### Portada

```
INSTITUTO/UNIVERSIDAD
Materia: [Nombre de la materia]
Unidad: [Número de unidad]

PROYECTO: Pipeline de Pruebas de Carga con K6

TÍTULO:
Implementación de Pipeline Automatizado de Pruebas de Carga
utilizando K6, GitHub Actions y Grafana

EQUIPO:
- [Nombre 1]
- [Nombre 2]
- [Nombre 3]

FECHA: [Fecha de entrega]
```

---

## Secciones del Documento

### 1. Introducción (1-2 páginas)

**Contenido:**
- Descripción del proyecto Tourist App Arroyo Seco
- Objetivos del pipeline de pruebas
- Tecnologías utilizadas
- Importancia de las pruebas de carga

**Incluir:**
- Logo o captura del proyecto
- Diagrama de arquitectura (del README.md)

---

### 2. Script de Pruebas K6 (4-6 páginas)

#### 2.1 Landing Page Load Test

**Archivo:** `monitoring/k6/load-test-landing.js`

**Incluir:**
1. **Código fuente completo**
   - Copiar todo el contenido del archivo
   - Usar sintaxis highlighting en el PDF
   
2. **Explicación del script:**
   ```
   - Configuración de escenarios (stages)
   - Páginas testeadas (6 páginas)
   - Métricas personalizadas
   - Thresholds definidos
   - Grupos de prueba
   ```

3. **Tabla de configuración:**
   | Parámetro | Valor |
   |-----------|-------|
   | Usuarios mínimos | 10 |
   | Usuarios pico | 50 |
   | Duración total | ~5 minutos |
   | Threshold P95 | < 2000ms |
   | Error rate | < 5% |

#### 2.2 Admin Panel Load Test

**Archivo:** `monitoring/k6/load-test-admin.js`

**Incluir:**
1. **Código fuente completo**
2. **Explicación del flujo:**
   ```
   - Login simulado
   - Navegación por secciones admin
   - Métricas de autenticación
   ```
3. **Tabla de configuración:**
   | Parámetro | Valor |
   |-----------|-------|
   | Usuarios mínimos | 5 |
   | Usuarios pico | 15 |
   | Duración total | ~2 minutos |
   | Login success | > 95% |

---

### 3. Script de Workflow GitHub Actions (3-4 páginas)

**Archivo:** `.github/workflows/k6-load-testing.yml`

**Incluir:**
1. **Código YAML completo**
   - Todo el contenido del archivo
   - Con comentarios explicativos

2. **Explicación de cada job:**
   
   **Job 1: Setup**
   - Verifica disponibilidad del servidor
   - Valida configuración
   
   **Job 2: Test Landing**
   - Instala K6
   - Ejecuta pruebas de landing
   - Genera resultados JSON
   - Sube artefactos
   
   **Job 3: Test Admin**
   - Similar al anterior para admin
   
   **Job 4: Reporte**
   - Consolida resultados
   - Genera summary
   
   **Job 5: Cleanup**
   - Limpia recursos temporales

3. **Tabla de triggers:**
   | Trigger | Descripción |
   |---------|-------------|
   | push | Al hacer push a main |
   | pull_request | En pull requests |
   | workflow_dispatch | Manual |
   | schedule | Diario a las 2 AM |

---

### 4. Configuración de Integración (6-8 páginas)

#### 4.1 Arquitectura del Sistema

**Incluir:**
- Diagrama de flujo:
  ```
  GitHub → Actions → K6 → Prometheus → Grafana
  ```

#### 4.2 Configuración de Prometheus

**Archivo:** `monitoring/prometheus/k6-prometheus-config.yml`

**Incluir:**
1. **Código YAML de configuración**
2. **Tabla de jobs:**
   | Job | Target | Puerto | Descripción |
   |-----|--------|--------|-------------|
   | k6_metrics | localhost:5656 | 5656 | Métricas K6 |
   | arroyo_seco_pwa | localhost:3000 | 3000 | PWA |
   | arroyo_seco_nginx | localhost:9113 | 9113 | Nginx |

3. **Reglas de alertas** (`k6_alerts.yml`)
   - Tabla con todas las alertas configuradas

#### 4.3 Configuración de Grafana

**Incluir:**
1. **Pasos de configuración:**
   - Data Source setup
   - Import dashboard process
   
2. **Tabla de paneles del dashboard:**
   | Panel | Tipo | Métricas |
   |-------|------|----------|
   | Resumen | Stat | Total requests, Rate, Errors |
   | Latencia | Graph | P95, P99, Avg |
   | Virtual Users | Graph | Active VUs, Max VUs |
   | etc. | | |

#### 4.4 Proceso de Integración

**Paso a paso CON CAPTURAS:**

**Paso 1: Configurar Prometheus en el servidor**
- Captura del archivo de configuración
- Captura de comando de validación
- Captura de reload exitoso

**Paso 2: Configurar Grafana**
- Captura de login en Grafana
- Captura de "Add data source"
- Captura de configuración de Prometheus
- Captura de "Test successful"

**Paso 3: Importar Dashboard**
- Captura del menú de import
- Captura del upload de JSON
- Captura del dashboard importado

---

### 5. Evidencias de Ejecución (8-10 páginas)

#### 5.1 GitHub Actions

**Captura 1: Lista de Workflows**
- Actions tab mostrando ejecuciones
- Al menos una ejecución exitosa (✅ verde)

**Captura 2: Workflow Run Details**
- Vista general del run
- Todos los jobs completados exitosamente

**Captura 3: Job "Test Landing" Logs**
- Logs mostrando:
  - Instalación de K6
  - Ejecución del script
  - Output de K6 con métricas

**Captura 4: Job "Test Admin" Logs**
- Similar al anterior

**Captura 5: Summary Tab**
- GitHub Actions Summary mostrando:
  - Tabla de métricas
  - Enlaces a Grafana
  - Status de cada job

**Captura 6: Artifacts**
- Lista de artefactos generados
- Botón de descarga visible

#### 5.2 Grafana Dashboard

**IMPORTANTE:** Ejecutar K6 antes de capturar para tener datos reales

**Captura 1: Dashboard Completo**
- Vista completa del dashboard
- Todos los paneles con datos
- Timerange: Last 15 minutes
- Refresh: 5s

**Captura 2: Panel "HTTP Request Duration"**
- Expandido en pantalla completa
- Mostrando P95, P99, Avg
- Gráfica con datos de la prueba

**Captura 3: Panel "Request Rate & Error Rate"**
- Expandido
- Mostrando tasa de requests y errores

**Captura 4: Panel "Virtual Users"**
- Mostrando ramping de usuarios
- Pico visible en 50 VUs

**Captura 5: Panel "Check Success Rate"**
- Gauge mostrando > 95%

**Captura 6: Panel "Duration por Página"**
- Comparación de tiempos entre páginas
- Home, Gastronomy, Recipes, etc.

#### 5.3 Prometheus

**Captura 1: Prometheus Graph**
- Query: `k6_http_reqs_total`
- Graph view mostrando incremento durante prueba

**Captura 2: Prometheus Targets**
- Status → Targets
- Mostrando todos los targets UP

**Captura 3: Prometheus Alerts**
- Alerts configuradas
- Status de cada alerta

#### 5.4 Ejecución Manual de K6 en Servidor

**Captura 1: SSH en el servidor**
- Terminal mostrando conexión SSH
- Comando: `k6 version`

**Captura 2: Ejecución de script**
- Comando: `k6 run monitoring/k6/load-test-landing.js`
- Output en progreso

**Captura 3: Resumen final de K6**
- Output del resumen con:
  - Total requests
  - Error rate
  - P95, P99
  - ✅ TODAS LAS PRUEBAS PASARON

---

### 6. Análisis de Resultados (2-3 páginas)

**Incluir:**

#### 6.1 Métricas Obtenidas

**Tabla de resultados:**
| Métrica | Landing | Admin | Threshold | Status |
|---------|---------|-------|-----------|--------|
| Total Requests | 1250 | 580 | - | ✅ |
| Error Rate | 2.4% | 1.2% | < 5% | ✅ |
| P95 Latency | 1850ms | 2450ms | < 2000ms / 3000ms | ✅ |
| P99 Latency | 2100ms | 2800ms | - | ✅ |
| Login Success | - | 97% | > 95% | ✅ |

**Nota:** Usar datos reales de tu ejecución

#### 6.2 Cumplimiento de Thresholds

- ✅ Todos los thresholds cumplidos
- Explicación de cada threshold
- Importancia en contexto de la aplicación

#### 6.3 Identificación de Cuellos de Botella

- Página más lenta: [Nombre]
- Razón probable: [Análisis]
- Recomendación: [Mejora sugerida]

#### 6.4 Comportamiento bajo Carga

- Estabilidad con 10 usuarios
- Comportamiento con 20 usuarios
- Pico de 50 usuarios
- Recuperación al bajar carga

---

### 7. Conclusiones (1-2 páginas)

**Incluir:**

#### 7.1 Resumen de Implementación

- Pipeline completo implementado
- Automatización lograda
- Integración exitosa de herramientas

#### 7.2 Beneficios del Pipeline

- Detección temprana de problemas de rendimiento
- Monitoreo continuo
- Visibilidad de métricas
- Feedback automático en PRs

#### 7.3 Aprendizajes

- Uso de K6 para load testing
- CI/CD con GitHub Actions
- Monitoreo con Prometheus
- Visualización con Grafana

#### 7.4 Mejoras Futuras

- Agregar más escenarios de prueba
- Implementar tests de estrés
- Configurar alerting avanzado
- Integrar con otras herramientas

---

### 8. Anexos

#### Anexo A: Código Fuente Completo

- Link al repositorio GitHub
- Estructura de carpetas
- Archivos principales

#### Anexo B: Comandos Utilizados

```bash
# Instalar K6
sudo apt-get install k6

# Ejecutar tests
k6 run monitoring/k6/load-test-landing.js

# Configurar Prometheus
sudo nano /etc/prometheus/prometheus.yml

# Recargar servicios
sudo systemctl reload prometheus
sudo systemctl reload nginx
```

#### Anexo C: URLs de Referencia

- Repositorio: https://github.com/Aaron408/tourist_app_arroyo_seco
- GitHub Actions: .../actions
- Grafana: http://vps-master.duckdns.org:3000/grafana
- Prometheus: http://74.208.45.131:9090

#### Anexo D: Referencias

- K6 Documentation: https://k6.io/docs/
- Prometheus: https://prometheus.io/docs/
- Grafana: https://grafana.com/docs/
- GitHub Actions: https://docs.github.com/en/actions

---

## Formato del PDF

### Estilo

- **Fuente:** Arial o similar, 11-12pt
- **Márgenes:** 2.5cm todos los lados
- **Interlineado:** 1.5
- **Numeración:** Todas las páginas
- **Encabezado:** Nombre del proyecto
- **Pie de página:** Número de página

### Código

- **Fuente:** Courier New o similar, 9-10pt
- **Fondo:** Gris claro
- **Syntax highlighting:** Si es posible
- **Márgenes:** Reducidos para mejor lectura

### Capturas de Pantalla

- **Resolución:** Alta (mínimo 1920x1080)
- **Formato:** PNG
- **Tamaño:** Ajustado para legibilidad
- **Leyendas:** Descriptivas bajo cada captura

---

## Herramientas Recomendadas

### Para crear el PDF

- **Microsoft Word** → Exportar a PDF
- **Google Docs** → Descargar como PDF
- **LaTeX** (para formato profesional)
- **Markdown → PDF** (con pandoc)

### Para capturas

- **Windows:** Snipping Tool, Greenshot
- **Mac:** Cmd+Shift+4
- **Linux:** Flameshot, Shutter
- **Extensiones navegador:** GoFullPage (para páginas completas)

---

## Checklist Pre-Entrega

### Contenido
- [ ] Portada completa
- [ ] Introducción clara
- [ ] Código K6 completo (2 scripts)
- [ ] Código workflow completo
- [ ] Configuraciones Prometheus/Grafana
- [ ] Proceso de integración documentado
- [ ] Capturas de GitHub Actions (6+)
- [ ] Capturas de Grafana (6+)
- [ ] Capturas de Prometheus (3+)
- [ ] Análisis de resultados
- [ ] Conclusiones
- [ ] Anexos

### Calidad
- [ ] Sin errores ortográficos
- [ ] Código formateado correctamente
- [ ] Capturas de alta calidad
- [ ] Leyendas descriptivas
- [ ] Numeración correcta
- [ ] Índice actualizado
- [ ] Referencias completas

### Formato
- [ ] PDF generado
- [ ] Tamaño razonable (< 20MB)
- [ ] Todas las páginas numeradas
- [ ] Tabla de contenidos
- [ ] Enlaces funcionando (si es PDF interactivo)

---

## Ejemplo de Nombres de Archivos

Para organizar antes de compilar el PDF:

```
entregable/
├── 00-portada.docx
├── 01-introduccion.docx
├── 02-script-k6-landing.docx
├── 03-script-k6-admin.docx
├── 04-workflow-github.docx
├── 05-configuracion.docx
├── 06-evidencias.docx
├── 07-analisis.docx
├── 08-conclusiones.docx
├── 09-anexos.docx
└── capturas/
    ├── github/
    │   ├── 01-workflows-list.png
    │   ├── 02-run-details.png
    │   └── ...
    ├── grafana/
    │   ├── 01-dashboard-full.png
    │   ├── 02-latency-panel.png
    │   └── ...
    └── prometheus/
        ├── 01-graph.png
        └── ...
```

---

## Nombre del Archivo Final

Formato sugerido:
```
K6_LoadTesting_Pipeline_ArryoSeco_[Equipo]_[Fecha].pdf
```

Ejemplo:
```
K6_LoadTesting_Pipeline_ArryoSeco_Equipo5_20251028.pdf
```

---

## Pasos para Generar Capturas de Calidad

### GitHub Actions

1. Ir a https://github.com/Aaron408/tourist_app_arroyo_seco/actions
2. Si no hay ejecuciones recientes, hacer click en "Run workflow"
3. Esperar a que complete (verde ✅)
4. Capturar:
   - Vista general
   - Cada job expandido
   - Logs con scroll
   - Summary tab
   - Artifacts

### Grafana

1. Asegurarse que la PWA está corriendo en el servidor
2. Ejecutar: `k6 run monitoring/k6/load-test-landing.js`
3. **MIENTRAS K6 está corriendo**, abrir Grafana
4. Seleccionar dashboard de K6
5. Ajustar timerange a "Last 15 minutes"
6. Refresh: 5s
7. Esperar a que se llene de datos
8. Capturar dashboard completo
9. Expandir cada panel y capturar individualmente

### Prometheus

1. Abrir http://74.208.45.131:9090
2. Ir a Graph
3. Ejecutar queries importantes
4. Capturar con datos visibles
5. Ir a Status → Targets
6. Capturar lista de targets

---

**¡Listo para crear el entregable PDF profesional!**

