# 📊 K6 Load Testing Scripts

Scripts de pruebas de carga para Tourist App Arroyo Seco.

---

## Scripts Disponibles

### 1. `load-test-landing.js`

**Descripción:** Pruebas de carga del sitio público (Landing)

**Páginas testeadas:**
- Home Page
- Gastronomía
- Recetas
- Ingredientes
- Ubicaciones
- Eventos

**Configuración:**
```javascript
Escenarios:
  - 30s: Ramp up a 10 usuarios
  - 1m:  Mantener 10 usuarios
  - 30s: Ramp up a 20 usuarios
  - 1m:  Mantener 20 usuarios
  - 30s: Pico de 50 usuarios
  - 1m:  Mantener 50 usuarios
  - 30s: Ramp down a 0

Thresholds:
  - P95 < 2000ms
  - Error rate < 5%
```

**Ejecución:**
```bash
k6 run load-test-landing.js

# Con variable de entorno
BASE_URL=http://localhost:5173 k6 run load-test-landing.js

# Con output a JSON
k6 run --out json=results/landing.json load-test-landing.js
```

---

### 2. `load-test-admin.js`

**Descripción:** Pruebas de carga del panel de administración

**Flujo testeado:**
1. Login
2. Dashboard
3. Catálogos
4. Ingredientes (catálogo)
5. Recetas (catálogo)
6. Eventos
7. Estadísticas

**Configuración:**
```javascript
Escenarios:
  - 20s: Warm up a 5 admins
  - 40s: Normal load - 10 admins
  - 30s: Peak load - 15 admins
  - 20s: Ramp down a 0

Thresholds:
  - P95 < 3000ms
  - Error rate < 2%
  - Login success > 95%
```

**Credenciales:**
```javascript
email: admin@arroyoseco.com
password: admin123
```

**Ejecución:**
```bash
k6 run load-test-admin.js

# Con variable de entorno
BASE_URL=http://localhost:5173 k6 run load-test-admin.js
```

---

## Métricas Generadas

### Métricas Estándar de K6

- `http_reqs` - Total de HTTP requests
- `http_req_duration` - Duración de requests
- `http_req_failed` - Tasa de requests fallidos
- `iterations` - Iteraciones completadas
- `vus` - Virtual users activos
- `data_sent` - Datos enviados
- `data_received` - Datos recibidos

### Métricas Personalizadas

#### Landing Test:
- `home_page_duration` - Duración de home page
- `gastronomy_page_duration` - Duración de gastronomía
- `recipes_page_duration` - Duración de recetas
- `locations_page_duration` - Duración de ubicaciones
- `errors` - Tasa de errores personalizada

#### Admin Test:
- `login_duration` - Duración de login
- `login_success_rate` - Tasa de éxito de login
- `dashboard_duration` - Duración de dashboard
- `catalogs_duration` - Duración de catálogos
- `errors` - Tasa de errores personalizada

---

## Interpretar Resultados

### Resumen en Terminal

Al finalizar cada test, se muestra un resumen:

```
╔════════════════════════════════════════════════════════════════════╗
║           RESUMEN DE PRUEBAS DE CARGA - LANDING PAGE              ║
╚════════════════════════════════════════════════════════════════════╝

📊 MÉTRICAS PRINCIPALES:
  • Total de Requests: 1250
  • Requests Fallidos: 2.4%
  • Duración Promedio: 845.32ms
  • P95: 1850.45ms
  • P99: 2100.12ms

⏱️  TIEMPOS POR PÁGINA:
  • Home: 650.23ms
  • Gastronomía: 892.45ms
  • Recetas: 950.12ms
  • Ubicaciones: 1200.56ms

✅ TODAS LAS PRUEBAS PASARON
```

### Criterios de Éxito

**Landing Page:**
- ✅ P95 < 2000ms
- ✅ Error rate < 5%
- ✅ Todas las páginas responden con 200

**Admin Panel:**
- ✅ P95 < 3000ms
- ✅ Error rate < 2%
- ✅ Login success rate > 95%

### Cuando las Pruebas Fallan

Si aparece `❌ ALGUNAS PRUEBAS FALLARON`:

1. **Revisar error rate:**
   - Si > 5%: Verificar servidor, conexión, endpoints

2. **Revisar latencia (P95):**
   - Si > threshold: Optimizar código, aumentar recursos del servidor

3. **Revisar login success rate:**
   - Si < 95%: Verificar autenticación, credenciales

---

## Outputs y Reportes

### JSON Output

```bash
k6 run --out json=results.json load-test-landing.js
```

Genera archivo JSON con todas las métricas para análisis posterior.

### Summary Export

```bash
k6 run --summary-export=summary.json load-test-landing.js
```

Exporta resumen consolidado.

### Prometheus Remote Write

```bash
k6 run --out experimental-prometheus-rw load-test-landing.js
```

Envía métricas directamente a Prometheus.

---

## Personalización

### Cambiar Duración

Editar `options.stages` en el script:

```javascript
export const options = {
  stages: [
    { duration: '1m', target: 20 },  // Cambiar duración y target
    { duration: '2m', target: 20 },
    { duration: '1m', target: 0 },
  ],
};
```

### Cambiar Thresholds

```javascript
thresholds: {
  'http_req_duration': ['p(95)<3000'],  // Cambiar de 2000 a 3000
  'http_req_failed': ['rate<0.10'],     // Cambiar de 5% a 10%
}
```

### Agregar Nuevas Páginas

```javascript
group('07_Nueva_Pagina', function() {
  const res = http.get(`${BASE_URL}/nueva-ruta`, {
    tags: { page: 'nueva' },
  });
  
  requestCounter.add(1);
  
  const success = check(res, {
    'nueva: status 200': (r) => r.status === 200,
    'nueva: carga en < 2s': (r) => r.timings.duration < 2000,
  });
  
  if (!success) errorRate.add(1);
  
  sleep(1);
});
```

---

## Mejores Prácticas

### DOs ✅

- Ejecutar tests en entorno de staging primero
- Monitorear servidor durante las pruebas
- Ajustar thresholds según SLAs reales
- Usar `sleep()` para simular comportamiento realista
- Revisar logs del servidor después de las pruebas

### DON'Ts ❌

- No ejecutar en producción sin autorización
- No ignorar warnings de K6
- No usar VUs muy altos sin escalar servidor
- No ejecutar múltiples tests simultáneos
- No hardcodear datos sensibles en scripts

---

## Integración con CI/CD

Los scripts están integrados en GitHub Actions:

**Workflow:** `.github/workflows/k6-load-testing.yml`

**Triggers:**
- Push a main
- Pull requests
- Manual
- Schedule (diario)

**Ver resultados:**
https://github.com/Aaron408/tourist_app_arroyo_seco/actions

---

## Troubleshooting

### Error: "connection refused"

```bash
# Verificar que el servidor está corriendo
curl http://localhost:3000

# Verificar variable de entorno
echo $BASE_URL

# Especificar URL explícitamente
BASE_URL=http://vps-master.duckdns.org:3000 k6 run load-test-landing.js
```

### Error: "threshold exceeded"

No es un error, sino que los thresholds no se cumplieron.

**Solución:**
1. Revisar métricas específicas que fallaron
2. Optimizar aplicación
3. Ajustar thresholds si son muy estrictos

### K6 no instalado

```bash
# Linux/Ubuntu
sudo apt-get install k6

# macOS
brew install k6

# Windows
choco install k6
```

---

## Recursos

- [K6 Documentation](https://k6.io/docs/)
- [K6 Examples](https://k6.io/docs/examples/)
- [Prometheus Integration](https://k6.io/docs/results-output/real-time/prometheus-remote-write/)
- [K6 Cloud](https://k6.io/cloud/)

---

**Última actualización:** Octubre 2025

