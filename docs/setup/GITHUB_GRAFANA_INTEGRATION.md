# 🔗 Guía de Integración GitHub + Grafana + K6

## Objetivo

Implementar un pipeline de pruebas de carga automatizadas usando:
- **K6:** Herramienta de pruebas de carga
- **GitHub Actions:** CI/CD para ejecutar pruebas automáticamente
- **Prometheus:** Recolección de métricas
- **Grafana:** Visualización de resultados

---

## Arquitectura del Sistema

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐      ┌──────────┐
│   GitHub    │ ───> │ GitHub       │ ───> │      K6     │ ───> │Prometheus│
│ Repository  │      │ Actions      │      │   Tests     │      │          │
└─────────────┘      └──────────────┘      └─────────────┘      └─────┬────┘
                                                                        │
                                                                        ▼
                                                                  ┌──────────┐
                                                                  │ Grafana  │
                                                                  │Dashboard │
                                                                  └──────────┘
```

---

## Parte 1: Configuración de GitHub Actions

### 1.1 Crear Workflow File

**Ubicación:** `.github/workflows/k6-load-testing.yml`

Este archivo ya está creado en el proyecto. Incluye:

✅ **Triggers automáticos:**
- Push a main (cuando cambian archivos de PWA o K6)
- Pull Requests
- Schedule diario (2 AM)
- Ejecución manual

✅ **Jobs configurados:**
1. **Setup:** Validación del servidor
2. **Test Landing:** Pruebas de carga del sitio público
3. **Test Admin:** Pruebas del panel de administración
4. **Report:** Generación de reportes consolidados
5. **Cleanup:** Limpieza de recursos

### 1.2 Variables de Entorno

El workflow utiliza estas variables (ya configuradas):

```yaml
env:
  K6_VERSION: '0.48.0'
  BASE_URL: 'http://vps-master.duckdns.org:3000'
  GRAFANA_URL: 'http://vps-master.duckdns.org:3000/grafana'
  PROMETHEUS_URL: 'http://74.208.45.131:9090'
```

### 1.3 Secrets de GitHub (Si se requieren)

Para configurar secrets en GitHub:

1. Ir a **Settings** → **Secrets and variables** → **Actions**
2. Click en **New repository secret**
3. Agregar:
   - `SERVER_HOST`: 74.208.45.131
   - `SERVER_USER`: root (o el usuario correspondiente)
   - `GRAFANA_API_KEY`: (si se configura integración API)

---

## Parte 2: Configuración de Prometheus

### 2.1 Actualizar Configuración

Conectar al servidor:

```bash
ssh root@74.208.45.131
```

Editar configuración:

```bash
sudo nano /etc/prometheus/prometheus.yml
```

### 2.2 Agregar Jobs para K6 y PWA

Agregar al final del archivo, en la sección `scrape_configs`:

```yaml
scrape_configs:
  # ... jobs existentes (prometheus, postgresql, gitea, node, nginx) ...

  # Job para PWA de Arroyo Seco
  - job_name: 'arroyo_seco_pwa'
    scrape_interval: 10s
    static_configs:
      - targets: ['localhost:3000']
        labels:
          app: 'tourist_app_arroyo_seco'
          component: 'pwa'
          environment: 'production'
    metrics_path: /health
    # Nota: /metrics si se implementa un exporter en la PWA

  # Job para métricas de K6 (cuando K6 está corriendo)
  - job_name: 'k6_metrics'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:5656']
        labels:
          app: 'tourist_app_arroyo_seco'
          component: 'load_testing'
    # Este job solo estará activo cuando K6 esté ejecutándose
```

### 2.3 Configurar Reglas de Alertas

Copiar archivo de alertas:

```bash
sudo cp /home/github/tourist_app_arroyo_seco/monitoring/prometheus/k6_alerts.yml /etc/prometheus/rules/
```

Actualizar `prometheus.yml` para incluir las reglas:

```yaml
rule_files:
  - "/etc/prometheus/rules/k6_alerts.yml"
```

### 2.4 Validar y Recargar

```bash
# Validar configuración
promtool check config /etc/prometheus/prometheus.yml

# Validar reglas
promtool check rules /etc/prometheus/rules/k6_alerts.yml

# Recargar Prometheus
sudo systemctl reload prometheus

# Verificar status
sudo systemctl status prometheus

# Ver logs
sudo journalctl -u prometheus -f
```

### 2.5 Verificar en Web UI

Abrir navegador: http://74.208.45.131:9090

**Verificaciones:**

1. **Status → Targets:**
   - Todos los targets deben estar "UP"
   - Verificar `arroyo_seco_pwa`
   - `k6_metrics` estará DOWN cuando no hay pruebas corriendo

2. **Status → Rules:**
   - Ver reglas de alertas configuradas

3. **Graph:** Probar queries:
   ```promql
   up{job="arroyo_seco_pwa"}
   nginx_http_requests_total
   k6_http_reqs_total
   ```

---

## Parte 3: Configuración de Grafana

### 3.1 Acceder a Grafana

**URL:** http://vps-master.duckdns.org:3000/grafana

### 3.2 Configurar Data Source de Prometheus

1. Click en **⚙️ Configuration** → **Data Sources**
2. Click en **Add data source**
3. Seleccionar **Prometheus**
4. Configurar:
   ```
   Name: Prometheus-K6
   URL: http://localhost:9090
   Access: Server (default)
   ```
5. Scroll down y click en **Save & Test**
6. Debe aparecer: ✅ "Data source is working"

### 3.3 Importar Dashboard de K6

#### Método 1: Importar JSON desde Grafana UI

1. Click en **+** → **Import**
2. Click en **Upload JSON file**
3. Usar archivo: `monitoring/grafana/k6-dashboard.json` del proyecto
4. Seleccionar **Data Source:** `Prometheus-K6`
5. Click en **Import**

#### Método 2: Copiar directamente al servidor

```bash
# En el servidor
sudo mkdir -p /var/lib/grafana/dashboards

sudo cp /home/github/tourist_app_arroyo_seco/monitoring/grafana/k6-dashboard.json \
   /var/lib/grafana/dashboards/

sudo chown -R grafana:grafana /var/lib/grafana/dashboards

# Recargar Grafana
sudo systemctl restart grafana-server
```

### 3.4 Configurar Provisioning (Automático)

Para que Grafana cargue dashboards automáticamente:

```bash
# Crear configuración de provisioning
sudo nano /etc/grafana/provisioning/dashboards/k6-dashboards.yaml
```

**Contenido:**

```yaml
apiVersion: 1

providers:
  - name: 'K6 Dashboards'
    orgId: 1
    folder: 'Load Testing'
    type: file
    disableDeletion: false
    updateIntervalSeconds: 30
    allowUiUpdates: true
    options:
      path: /var/lib/grafana/dashboards
```

```bash
# Recargar Grafana
sudo systemctl restart grafana-server
```

### 3.5 Verificar Dashboard

1. En Grafana, ir a **Dashboards** → **Browse**
2. Buscar: "K6 Load Testing - Arroyo Seco Tourism App"
3. Click para abrir
4. Verificar que se muestran paneles (pueden estar vacíos sin datos aún)

---

## Parte 4: Ejecutar Prueba Completa End-to-End

### 4.1 Desde GitHub Actions (Recomendado)

#### Opción A: Trigger automático (Push)

```bash
# En tu máquina local
cd tourist_app_arroyo_seco
git add .
git commit -m "Test: Trigger K6 load testing"
git push origin main
```

#### Opción B: Ejecución manual

1. Ir a GitHub → **Actions**
2. Seleccionar workflow: "K6 Load Testing Pipeline"
3. Click en **Run workflow**
4. Configurar:
   - Branch: `main`
   - Test type: `all`
   - Duration: `5`
5. Click en **Run workflow**

### 4.2 Monitorear Ejecución en GitHub

1. En **Actions**, ver el workflow en ejecución
2. Click en el run para ver detalles
3. Ver logs de cada job:
   - Setup y Validación
   - Test Landing
   - Test Admin
   - Reporte

### 4.3 Ver Resultados en Tiempo Real

#### En Prometheus:

http://74.208.45.131:9090

**Queries útiles:**

```promql
# Total de requests de K6
sum(k6_http_reqs_total)

# Tasa de requests por segundo
rate(k6_http_reqs_total[1m])

# Latencia P95
histogram_quantile(0.95, sum(rate(k6_http_req_duration_bucket[5m])) by (le))

# Tasa de error
k6_http_req_failed_rate

# Virtual users activos
k6_vus
```

#### En Grafana:

http://vps-master.duckdns.org:3000/grafana

1. Abrir dashboard "K6 Load Testing"
2. Ajustar rango de tiempo: "Last 15 minutes"
3. Refresh: "5s"
4. Ver métricas en tiempo real

### 4.4 Desde el Servidor (Manual)

```bash
# Conectar al servidor
ssh root@74.208.45.131

# Navegar al proyecto
cd /home/github/tourist_app_arroyo_seco

# Actualizar código
git pull origin main

# Ejecutar test de landing
k6 run monitoring/k6/load-test-landing.js

# Ejecutar test de admin
k6 run monitoring/k6/load-test-admin.js
```

Mientras K6 está corriendo, abrir Grafana en otro navegador y ver métricas en vivo.

---

## Parte 5: Capturar Evidencias para Entregable

### 5.1 Captura de GitHub Actions

**Objetivo:** Demostrar ejecución exitosa del pipeline

1. **Ir a GitHub → Actions**
2. **Seleccionar una ejecución exitosa** (✅ verde)
3. **Capturar:**
   - Vista general del workflow
   - Detalles de cada job
   - Logs de ejecución de K6
   - Summary con métricas

**Capturas necesarias:**
- ✅ Lista de workflows con status success
- ✅ Detalles de "Test Landing" job
- ✅ Detalles de "Test Admin" job
- ✅ Summary con tabla de métricas
- ✅ Artefactos generados

### 5.2 Captura de Grafana Dashboard

**Objetivo:** Mostrar visualización de métricas

1. **Abrir Dashboard de K6**
2. **Durante o justo después de una prueba:**
   - Asegurar que hay datos visibles
   - Ajustar timerange para mostrar el periodo de la prueba
3. **Capturar:**
   - Vista completa del dashboard
   - Panel de "HTTP Request Duration"
   - Panel de "Request Rate & Error Rate"
   - Panel de "Virtual Users"
   - Panel de "Check Success Rate"

**Tips para mejores capturas:**
- Usar modo pantalla completa
- Timerange: "Last 15 minutes" o el periodo de la prueba
- Refresh rate: 5s
- Expandir paneles importantes

### 5.3 Captura de Prometheus

**Objetivo:** Mostrar métricas raw

1. **Abrir Prometheus:** http://74.208.45.131:9090
2. **Ir a Graph**
3. **Ejecutar queries importantes:**
   ```promql
   k6_http_reqs_total
   k6_http_req_duration{quantile="0.95"}
   k6_vus
   ```
4. **Capturar:**
   - Query con resultados
   - Graph visualization
   - Table con valores

### 5.4 Captura de Configuración

**Objetivo:** Documentar el proceso de configuración

Capturas necesarias:

1. **Prometheus config:**
   ```bash
   sudo cat /etc/prometheus/prometheus.yml
   ```
   - Captura mostrando jobs de K6 y PWA

2. **Grafana Data Source:**
   - Settings de Prometheus data source
   - Test exitoso

3. **GitHub workflow file:**
   - Código del workflow
   - Configuración de stages

---

## Parte 6: Estructura del Documento PDF Entregable

### Organización Sugerida

```
📄 Entregable_K6_Pipeline_ArryoSeco.pdf

1. Portada
   - Título del proyecto
   - Nombres del equipo
   - Fecha

2. Introducción
   - Descripción del proyecto
   - Objetivos de las pruebas de carga

3. Script de Pruebas K6
   3.1 Landing Page Load Test
       - Código fuente completo
       - Explicación de escenarios
       - Thresholds configurados
   
   3.2 Admin Panel Load Test
       - Código fuente completo
       - Flujo de autenticación
       - Métricas monitoreadas

4. Configuración de GitHub Actions
   4.1 Workflow YAML completo
   4.2 Explicación de jobs
   4.3 Triggers y schedule
   4.4 Variables de entorno

5. Integración GitHub + Grafana
   5.1 Arquitectura del sistema
   5.2 Configuración de Prometheus
       - prometheus.yml (jobs agregados)
       - k6_alerts.yml (reglas de alertas)
   5.3 Configuración de Grafana
       - Data source setup
       - Dashboard import
   5.4 Flujo de datos completo

6. Evidencias de Ejecución
   6.1 GitHub Actions
       - Captura de ejecución exitosa
       - Logs de K6
       - Summary con métricas
   6.2 Grafana Dashboard
       - Vista completa del dashboard
       - Paneles con datos reales
       - Métricas en tiempo real
   6.3 Prometheus
       - Queries ejecutadas
       - Resultados de métricas

7. Análisis de Resultados
   7.1 Métricas obtenidas
   7.2 Cumplimiento de thresholds
   7.3 Identificación de cuellos de botella
   7.4 Recomendaciones

8. Conclusiones
   - Resumen de lo implementado
   - Beneficios del pipeline automatizado
   - Mejoras futuras

9. Anexos
   - Código fuente completo
   - Comandos utilizados
   - Referencias
```

---

## Comandos de Referencia Rápida

### En GitHub

```bash
# Trigger workflow desde CLI
gh workflow run k6-load-testing.yml

# Ver runs
gh run list

# Ver logs
gh run view <run-id> --log
```

### En el Servidor

```bash
# Conectar
ssh root@74.208.45.131

# Actualizar código
cd /home/github/tourist_app_arroyo_seco && git pull

# Ver logs de Prometheus
sudo journalctl -u prometheus -f

# Ver logs de Grafana
sudo journalctl -u grafana-server -f

# Ejecutar K6
k6 run monitoring/k6/load-test-landing.js

# Ver procesos
ps aux | grep k6
```

### Queries Prometheus útiles

```promql
# Todas las métricas de K6
{__name__=~"k6_.*"}

# HTTP requests total
sum(k6_http_reqs_total)

# Request rate
rate(k6_http_reqs_total[1m])

# Error rate
k6_http_req_failed_rate

# P95 latency
histogram_quantile(0.95, rate(k6_http_req_duration_bucket[5m]))

# Virtual users
k6_vus
```

---

## Troubleshooting

### K6 no envía métricas a Prometheus

**Problema:** Grafana no muestra datos de K6

**Solución:**
1. Verificar que K6 está ejecutándose con output a Prometheus
2. Verificar que Prometheus puede alcanzar localhost:5656
3. Revisar logs de Prometheus

### GitHub Actions falla en "Verificar servidor"

**Problema:** Setup job falla

**Solución:**
1. Verificar que el servidor está en línea
2. Verificar BASE_URL en el workflow
3. Verificar firewall del servidor

### Grafana no muestra dashboard

**Problema:** Dashboard importado pero vacío

**Solución:**
1. Verificar data source configurado correctamente
2. Verificar que hay datos en Prometheus
3. Ajustar time range

---

## Recursos Adicionales

- **K6 Docs:** https://k6.io/docs/
- **Prometheus Docs:** https://prometheus.io/docs/
- **Grafana Docs:** https://grafana.com/docs/
- **GitHub Actions Docs:** https://docs.github.com/en/actions

---

**Última actualización:** Octubre 2025  
**Autor:** Equipo Tourist App Arroyo Seco

