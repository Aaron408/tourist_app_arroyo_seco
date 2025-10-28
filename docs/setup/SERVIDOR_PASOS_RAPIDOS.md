# ⚡ Guía Rápida - Configuración en el Servidor

## Información del Servidor

- **Host:** root@74.208.45.131
- **URL:** http://vps-master.duckdns.org:3000
- **Proyecto:** `/home/github/tourist_app_arroyo_seco`

---

## Paso 1: Conectar al Servidor

```bash
ssh root@74.208.45.131
```

---

## Paso 2: Verificar el Proyecto

```bash
cd /home/github/tourist_app_arroyo_seco
ls -la

# Deberías ver:
# backend/  mobile/  pwa/  tests/  monitoring/  docs/  .github/
```

---

## Paso 3: Build y Deploy de la PWA

```bash
cd pwa

# Instalar dependencias (si es necesario)
npm install

# Build de producción
npm run build

# Verificar que se generó dist/
ls -la dist/

# Deberías ver: index.html, assets/, icons/, manifest.json, etc.
```

---

## Paso 4: Configurar Nginx

### 4.1 Crear archivo de configuración

```bash
sudo nano /etc/nginx/sites-available/arroyo-seco-pwa
```

**Pegar este contenido:**

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
    
    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Assets con cache
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Service Worker sin cache
    location = /service-worker.js {
        expires off;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
    
    # Health check
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

Guardar: `Ctrl+O`, Enter, `Ctrl+X`

### 4.2 Activar sitio

```bash
# Crear symlink
sudo ln -s /etc/nginx/sites-available/arroyo-seco-pwa /etc/nginx/sites-enabled/

# Test de configuración
sudo nginx -t

# Si está OK, recargar
sudo systemctl reload nginx
```

### 4.3 Verificar

```bash
# Local
curl http://localhost:3000

# Externo (desde tu máquina)
curl http://vps-master.duckdns.org:3000
```

---

## Paso 5: Configurar Prometheus

### 5.1 Backup de configuración actual

```bash
sudo cp /etc/prometheus/prometheus.yml /etc/prometheus/prometheus.yml.backup
```

### 5.2 Editar configuración

```bash
sudo nano /etc/prometheus/prometheus.yml
```

### 5.3 Agregar al final (en scrape_configs)

```yaml
  # PWA de Arroyo Seco
  - job_name: 'arroyo_seco_pwa'
    scrape_interval: 10s
    static_configs:
      - targets: ['localhost:3000']
        labels:
          app: 'tourist_app_arroyo_seco'
          component: 'pwa'
    metrics_path: /health

  # K6 (cuando esté corriendo)
  - job_name: 'k6_metrics'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:5656']
        labels:
          app: 'tourist_app_arroyo_seco'
          component: 'load_testing'
```

Guardar: `Ctrl+O`, Enter, `Ctrl+X`

### 5.4 Copiar reglas de alertas

```bash
sudo mkdir -p /etc/prometheus/rules
sudo cp /home/github/tourist_app_arroyo_seco/monitoring/prometheus/k6_alerts.yml /etc/prometheus/rules/
```

### 5.5 Agregar reglas a prometheus.yml

```bash
sudo nano /etc/prometheus/prometheus.yml
```

Buscar la sección `rule_files:` y agregar:

```yaml
rule_files:
  - "/etc/prometheus/rules/k6_alerts.yml"
```

### 5.6 Validar y recargar

```bash
# Validar config
promtool check config /etc/prometheus/prometheus.yml

# Validar reglas
promtool check rules /etc/prometheus/rules/k6_alerts.yml

# Si todo OK, recargar
sudo systemctl reload prometheus

# Ver status
sudo systemctl status prometheus
```

---

## Paso 6: Configurar Grafana

### 6.1 Acceder a Grafana

Abrir en navegador: http://vps-master.duckdns.org:3000/grafana

### 6.2 Configurar Data Source

1. Login (credenciales admin)
2. **Configuration** (⚙️) → **Data Sources**
3. **Add data source** → **Prometheus**
4. Configurar:
   - Name: `Prometheus-K6`
   - URL: `http://localhost:9090`
   - Access: `Server (default)`
5. **Save & Test** (debe decir ✅ "Data source is working")

### 6.3 Importar Dashboard

1. **+** → **Import**
2. **Upload JSON file**
3. Seleccionar desde servidor:
   ```bash
   /home/github/tourist_app_arroyo_seco/monitoring/grafana/k6-dashboard.json
   ```
   
   **Alternativa - copiar contenido:**
   ```bash
   cat /home/github/tourist_app_arroyo_seco/monitoring/grafana/k6-dashboard.json
   ```
   Copiar contenido y pegarlo en "Import via panel json"

4. Seleccionar Data Source: `Prometheus-K6`
5. **Import**

---

## Paso 7: Instalar K6

```bash
# Agregar repositorio
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69

echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list

# Actualizar e instalar
sudo apt-get update
sudo apt-get install k6

# Verificar
k6 version
```

---

## Paso 8: Ejecutar Prueba de K6

```bash
cd /home/github/tourist_app_arroyo_seco

# Test de Landing (tarda ~5 min)
k6 run monitoring/k6/load-test-landing.js

# Durante la ejecución, abrir Grafana en otro navegador
# y ver métricas en tiempo real
```

---

## Paso 9: Verificar Todo

### 9.1 PWA funcionando

```bash
curl http://localhost:3000
# Debe devolver HTML
```

**En navegador:**
- http://vps-master.duckdns.org:3000 → Home page
- http://vps-master.duckdns.org:3000/gastronomia → Gastronomía
- http://vps-master.duckdns.org:3000/administracion/login → Admin login

### 9.2 Prometheus recibiendo datos

**Abrir:** http://74.208.45.131:9090

**Ir a Status → Targets**

Verificar que están UP:
- ✅ prometheus
- ✅ postgresql
- ✅ gitea
- ✅ node
- ✅ nginx
- ✅ arroyo_seco_pwa (nuevo)

### 9.3 Grafana con dashboard

**Abrir:** http://vps-master.duckdns.org:3000/grafana

**Ir a Dashboards → Browse**

Buscar: "K6 Load Testing - Arroyo Seco Tourism App"

---

## Paso 10: Automatizar Tests de K6

### 10.1 Crear script

```bash
sudo nano /usr/local/bin/run-k6-tests.sh
```

**Contenido:**

```bash
#!/bin/bash

PROJECT_DIR="/home/github/tourist_app_arroyo_seco"
RESULTS_DIR="$PROJECT_DIR/monitoring/k6/results"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p $RESULTS_DIR

echo "🚀 Ejecutando pruebas de K6..."

# Landing
k6 run --out json=$RESULTS_DIR/landing_$TIMESTAMP.json \
  $PROJECT_DIR/monitoring/k6/load-test-landing.js

# Admin
k6 run --out json=$RESULTS_DIR/admin_$TIMESTAMP.json \
  $PROJECT_DIR/monitoring/k6/load-test-admin.js

# Limpiar antiguos (> 30 días)
find $RESULTS_DIR -name "*.json" -mtime +30 -delete

echo "✅ Pruebas completadas"
```

### 10.2 Dar permisos

```bash
sudo chmod +x /usr/local/bin/run-k6-tests.sh
```

### 10.3 Programar con cron (opcional)

```bash
crontab -e

# Agregar línea (ejecutar diario a las 3 AM):
0 3 * * * /usr/local/bin/run-k6-tests.sh >> /var/log/k6-tests.log 2>&1
```

---

## Checklist Final ✅

- [ ] PWA deployed en Nginx (puerto 3000)
- [ ] PWA accesible desde navegador
- [ ] Prometheus configurado con jobs de PWA y K6
- [ ] Reglas de alertas copiadas
- [ ] Grafana con data source de Prometheus
- [ ] Dashboard de K6 importado
- [ ] K6 instalado y funcionando
- [ ] Test de K6 ejecutado exitosamente
- [ ] Métricas visibles en Grafana
- [ ] Logs sin errores

---

## Comandos Útiles

### Ver logs

```bash
# Nginx
sudo tail -f /var/log/nginx/arroyo-seco-access.log
sudo tail -f /var/log/nginx/arroyo-seco-error.log

# Prometheus
sudo journalctl -u prometheus -f

# Grafana
sudo journalctl -u grafana-server -f
```

### Reiniciar servicios

```bash
sudo systemctl restart nginx
sudo systemctl restart prometheus
sudo systemctl restart grafana-server
```

### Actualizar PWA

```bash
cd /home/github/tourist_app_arroyo_seco
git pull origin main
cd pwa
npm run build
sudo systemctl reload nginx
```

---

## Troubleshooting

### PWA no carga

```bash
# Verificar build
ls -la /home/github/tourist_app_arroyo_seco/pwa/dist/

# Verificar Nginx
sudo nginx -t
sudo systemctl status nginx

# Ver logs
sudo tail -f /var/log/nginx/error.log
```

### Prometheus no scrapeando

```bash
# Ver targets
# http://74.208.45.131:9090/targets

# Verificar config
promtool check config /etc/prometheus/prometheus.yml

# Reiniciar
sudo systemctl restart prometheus
```

### Grafana no muestra datos

```bash
# Verificar data source
# Settings → Data Sources → Test

# Verificar que Prometheus tiene datos
# http://74.208.45.131:9090

# Ejecutar query manual
# up{job="arroyo_seco_pwa"}
```

---

**¡Listo! El sistema está completamente configurado.**

Para cualquier duda, revisar la documentación completa en:
- `docs/setup/SERVER_SETUP.md`
- `docs/setup/GITHUB_GRAFANA_INTEGRATION.md`
- `docs/testing/README.md`

