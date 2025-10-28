# 🖥️ Guía de Setup del Servidor - Tourist App Arroyo Seco

## Información del Servidor

**Servidor:** VPS Master  
**URL Base:** http://vps-master.duckdns.org:3000  
**IP:** 74.208.45.131  
**Ubicación del Proyecto:** `/home/github/tourist_app_arroyo_seco`

---

## Servicios Configurados

### 1. Prometheus

**URL:** http://74.208.45.131:9090  
**Config:** `/etc/prometheus/prometheus.yml`  
**Puerto:** 9090

**Jobs monitoreados:**
- `prometheus` (localhost:9090)
- `postgresql` (localhost:9187)
- `gitea` (localhost:8080)
- `node` (localhost:9100) - Node Exporter
- `nginx` (localhost:9113) - Nginx Exporter

### 2. Grafana

**URL:** http://vps-master.duckdns.org:3000/grafana  
**Puerto:** 3000

### 3. Nginx

**Puerto:** 80/443  
**Exporter:** localhost:9113

---

## Deployment de la PWA

### Paso 1: Actualizar código

```bash
# Conectar al servidor
ssh root@74.208.45.131

# Navegar al proyecto
cd /home/github/tourist_app_arroyo_seco

# Actualizar código
git pull origin main
```

### Paso 2: Build de la PWA

```bash
cd pwa

# Instalar dependencias (si es necesario)
npm install

# Build de producción
npm run build

# Los archivos se generan en pwa/dist/
```

### Paso 3: Configurar Nginx

Crear configuración para servir la PWA:

```bash
sudo nano /etc/nginx/sites-available/arroyo-seco-pwa
```

**Contenido sugerido:**

```nginx
server {
    listen 3000;
    server_name vps-master.duckdns.org 74.208.45.131;
    
    root /home/github/tourist_app_arroyo_seco/pwa/dist;
    index index.html;
    
    # Logs
    access_log /var/log/nginx/arroyo-seco-access.log;
    error_log /var/log/nginx/arroyo-seco-error.log;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json;
    
    # SPA routing - todas las rutas van a index.html
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Assets con cache largo
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Service Worker sin cache
    location = /service-worker.js {
        expires off;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
    
    # Manifest
    location = /manifest.json {
        expires 1d;
        add_header Cache-Control "public";
    }
    
    # Health check endpoint para Prometheus
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
    
    # Metrics endpoint (si se implementa)
    location /metrics {
        # Restricción de acceso solo desde localhost
        allow 127.0.0.1;
        deny all;
        
        # Aquí iría el exporter de métricas
        # proxy_pass http://localhost:9091;
    }
}
```

Activar el sitio:

```bash
# Crear symlink
sudo ln -s /etc/nginx/sites-available/arroyo-seco-pwa /etc/nginx/sites-enabled/

# Test de configuración
sudo nginx -t

# Recargar Nginx
sudo systemctl reload nginx
```

### Paso 4: Verificar deployment

```bash
# Verificar que Nginx está corriendo
sudo systemctl status nginx

# Verificar puerto
sudo netstat -tlnp | grep :3000

# Test local
curl http://localhost:3000

# Test externo
curl http://vps-master.duckdns.org:3000
```

---

## Integración con Prometheus

### Paso 1: Actualizar configuración

```bash
sudo nano /etc/prometheus/prometheus.yml
```

### Paso 2: Agregar job para la PWA

```yaml
scrape_configs:
  # ... jobs existentes ...
  
  # Nuevo job para PWA de Arroyo Seco
  - job_name: 'arroyo_seco_pwa'
    scrape_interval: 10s
    static_configs:
      - targets: ['localhost:3000']
        labels:
          app: 'tourist_app_arroyo_seco'
          component: 'pwa'
          environment: 'production'
    metrics_path: /metrics
    # Si no hay endpoint de métricas, comentar esta línea
    
  # Job para K6 (cuando se ejecuten pruebas)
  - job_name: 'k6_metrics'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:5656']
        labels:
          app: 'tourist_app_arroyo_seco'
          component: 'load_testing'
```

### Paso 3: Agregar reglas de alertas

```bash
# Crear directorio de reglas si no existe
sudo mkdir -p /etc/prometheus/rules

# Copiar archivo de alertas
sudo cp /home/github/tourist_app_arroyo_seco/monitoring/prometheus/k6_alerts.yml /etc/prometheus/rules/
```

### Paso 4: Actualizar configuración de rules

```bash
sudo nano /etc/prometheus/prometheus.yml
```

Agregar:

```yaml
rule_files:
  - "/etc/prometheus/rules/k6_alerts.yml"
```

### Paso 5: Validar y recargar

```bash
# Validar configuración
promtool check config /etc/prometheus/prometheus.yml

# Recargar Prometheus
sudo systemctl reload prometheus

# Verificar status
sudo systemctl status prometheus
```

---

## Integración con Grafana

### Paso 1: Acceder a Grafana

Abrir navegador: http://vps-master.duckdns.org:3000/grafana

**Credenciales por defecto:**
- Usuario: `admin`
- Password: (la que se configuró inicialmente)

### Paso 2: Configurar Data Source

1. Ir a **Configuration** → **Data Sources**
2. Click en **Add data source**
3. Seleccionar **Prometheus**
4. Configurar:
   - **Name:** `Prometheus-K6`
   - **URL:** `http://localhost:9090`
   - **Access:** `Server (default)`
5. Click en **Save & Test**

### Paso 3: Importar Dashboard de K6

#### Opción 1: Importar archivo JSON

1. Ir a **Dashboards** → **Import**
2. Click en **Upload JSON file**
3. Seleccionar: `/home/github/tourist_app_arroyo_seco/monitoring/grafana/k6-dashboard.json`
4. Seleccionar Data Source: `Prometheus-K6`
5. Click en **Import**

#### Opción 2: Desde el servidor

```bash
# Copiar dashboard a Grafana
sudo cp /home/github/tourist_app_arroyo_seco/monitoring/grafana/k6-dashboard.json /var/lib/grafana/dashboards/

# Ajustar permisos
sudo chown grafana:grafana /var/lib/grafana/dashboards/k6-dashboard.json
```

### Paso 4: Configurar Alerting (Opcional)

1. Ir a **Alerting** → **Alert rules**
2. Crear reglas basadas en métricas de K6
3. Configurar notificaciones (email, Slack, etc.)

---

## Ejecutar Pruebas K6 desde el Servidor

### Instalación de K6

```bash
# Agregar repositorio de K6
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list

# Actualizar e instalar
sudo apt-get update
sudo apt-get install k6

# Verificar instalación
k6 version
```

### Ejecutar Tests

```bash
cd /home/github/tourist_app_arroyo_seco

# Test de Landing
k6 run monitoring/k6/load-test-landing.js

# Test de Admin
k6 run monitoring/k6/load-test-admin.js

# Con output a archivo
k6 run --out json=results.json monitoring/k6/load-test-landing.js

# Con variables de entorno
BASE_URL=http://localhost:3000 k6 run monitoring/k6/load-test-landing.js
```

### Ejecutar con salida a Prometheus

```bash
# Instalar extensión de Prometheus
k6 run \
  --out experimental-prometheus-rw \
  monitoring/k6/load-test-landing.js
```

### Script de ejecución automatizada

Crear script para ejecución programada:

```bash
sudo nano /usr/local/bin/run-k6-tests.sh
```

**Contenido:**

```bash
#!/bin/bash

# Configuración
PROJECT_DIR="/home/github/tourist_app_arroyo_seco"
RESULTS_DIR="$PROJECT_DIR/monitoring/k6/results"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Crear directorio de resultados
mkdir -p $RESULTS_DIR

# Ejecutar test de landing
echo "Ejecutando pruebas de Landing..."
k6 run \
  --out json=$RESULTS_DIR/landing_$TIMESTAMP.json \
  $PROJECT_DIR/monitoring/k6/load-test-landing.js

# Ejecutar test de admin
echo "Ejecutando pruebas de Admin..."
k6 run \
  --out json=$RESULTS_DIR/admin_$TIMESTAMP.json \
  $PROJECT_DIR/monitoring/k6/load-test-admin.js

# Limpiar resultados antiguos (mantener últimos 30 días)
find $RESULTS_DIR -name "*.json" -mtime +30 -delete

echo "Pruebas completadas. Resultados en: $RESULTS_DIR"
```

Dar permisos:

```bash
sudo chmod +x /usr/local/bin/run-k6-tests.sh
```

### Programar ejecución con Cron

```bash
# Editar crontab
crontab -e

# Ejecutar diariamente a las 3 AM
0 3 * * * /usr/local/bin/run-k6-tests.sh >> /var/log/k6-tests.log 2>&1
```

---

## Monitoreo y Troubleshooting

### Ver logs de Nginx

```bash
# Logs de acceso
sudo tail -f /var/log/nginx/arroyo-seco-access.log

# Logs de error
sudo tail -f /var/log/nginx/arroyo-seco-error.log
```

### Ver logs de Prometheus

```bash
sudo journalctl -u prometheus -f
```

### Ver logs de Grafana

```bash
sudo journalctl -u grafana-server -f
```

### Verificar métricas en Prometheus

```bash
# Abrir navegador
http://74.208.45.131:9090

# Queries útiles:
# - up{job="arroyo_seco_pwa"}
# - k6_http_reqs_total
# - k6_http_req_duration
# - nginx_http_requests_total
```

### Reiniciar servicios

```bash
# Nginx
sudo systemctl restart nginx

# Prometheus
sudo systemctl restart prometheus

# Grafana
sudo systemctl restart grafana-server
```

---

## Backup y Mantenimiento

### Backup de configuraciones

```bash
# Crear directorio de backup
mkdir -p ~/backups

# Backup de Prometheus config
sudo cp /etc/prometheus/prometheus.yml ~/backups/prometheus_$(date +%Y%m%d).yml

# Backup de Nginx config
sudo cp -r /etc/nginx/sites-available ~/backups/nginx_$(date +%Y%m%d)/

# Backup de Grafana dashboards
sudo cp -r /var/lib/grafana/dashboards ~/backups/grafana_$(date +%Y%m%d)/
```

### Actualizar proyecto

```bash
cd /home/github/tourist_app_arroyo_seco
git pull origin main
cd pwa
npm install
npm run build
sudo systemctl reload nginx
```

---

## Firewall y Seguridad

### Puertos necesarios

```bash
# Verificar puertos abiertos
sudo ufw status

# Abrir puertos si es necesario
sudo ufw allow 3000/tcp    # PWA
sudo ufw allow 9090/tcp    # Prometheus
sudo ufw allow 80/tcp      # HTTP
sudo ufw allow 443/tcp     # HTTPS
```

### Restricciones de acceso

Para Prometheus y Grafana, considerar:
- Configurar autenticación básica en Nginx
- Limitar acceso por IP
- Usar HTTPS con certificado SSL

---

## Checklist de Deployment

- [ ] Código actualizado (`git pull`)
- [ ] Dependencies instaladas (`npm install`)
- [ ] Build de PWA ejecutado (`npm run build`)
- [ ] Nginx configurado y recargado
- [ ] Prometheus actualizado con nuevos jobs
- [ ] Alertas de Prometheus configuradas
- [ ] Dashboard de Grafana importado
- [ ] K6 instalado
- [ ] Tests de K6 ejecutados exitosamente
- [ ] Logs revisados sin errores
- [ ] Métricas visibles en Prometheus
- [ ] Dashboard visible en Grafana
- [ ] Backup de configuraciones

---

## Recursos

- [Nginx Documentation](https://nginx.org/en/docs/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [K6 Documentation](https://k6.io/docs/)

---

**Última actualización:** Octubre 2025

