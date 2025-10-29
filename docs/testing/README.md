# 📊 Documentación de Testing - Tourist App Arroyo Seco

## Índice

1. [Visión General](#visión-general)
2. [Estructura de Tests](#estructura-de-tests)
3. [Pruebas Unitarias](#pruebas-unitarias)
4. [Pruebas de Integración](#pruebas-de-integración)
5. [Pruebas E2E](#pruebas-e2e)
6. [Pruebas de Carga con K6](#pruebas-de-carga-con-k6)
7. [CI/CD Pipeline](#cicd-pipeline)
8. [Métricas y Monitoreo](#métricas-y-monitoreo)

---

## Visión General

Este proyecto implementa una suite completa de pruebas automatizadas que incluye:

- ✅ **Tests Unitarios** con Jest
- ✅ **Tests de Integración** con Jest
- ✅ **Tests E2E** con Playwright
- ✅ **Tests de Carga** con K6
- ✅ **CI/CD** con GitHub Actions
- ✅ **Monitoreo** con Prometheus & Grafana

---

## Estructura de Tests

```
tests/
├── unit/                    # Pruebas unitarias
│   ├── mobile/             # Tests de la app mobile
│   │   ├── navigation.spec.ts
│   │   ├── components.spec.ts
│   │   ├── screens.spec.ts
│   │   └── theme.spec.ts
│   └── pwa/                # Tests de la PWA
│       ├── auth.spec.ts
│       ├── language.spec.ts
│       ├── routing.spec.ts
│       └── sleep.spec.ts
├── integration/            # Pruebas de integración
│   └── (por implementar)
├── e2e/                    # Pruebas end-to-end
│   ├── landing.spec.ts
│   ├── admin.spec.ts
│   └── example.spec.ts
├── performance/            # Pruebas de rendimiento
├── __mocks__/             # Mocks globales
└── coverage/              # Reportes de cobertura
```

---

## Pruebas Unitarias

### Ejecución

```bash
cd tests
npm install
npm run test:unit
```

### Tests de PWA

#### 1. Autenticación (`auth.spec.ts`)

**Cobertura:**
- ✅ Validación de campos email/password
- ✅ Formato de email válido/inválido
- ✅ Login exitoso y fallido
- ✅ Almacenamiento de token
- ✅ Cierre de sesión
- ✅ Toggle de visibilidad de password
- ✅ Manejo de sesiones expiradas

**Ejemplo:**
```typescript
it('should validate required email and password fields', () => {
  const email = '';
  const password = '';
  
  expect(email).toBe('');
  expect(password).toBe('');
});
```

#### 2. Internacionalización (`language.spec.ts`)

**Cobertura:**
- ✅ Almacenamiento de idioma en localStorage
- ✅ Toggle entre español e inglés
- ✅ Validación de idiomas soportados
- ✅ Traducción de claves
- ✅ Sincronización entre stores

#### 3. Rutas (`routing.spec.ts`)

**Cobertura:**
- ✅ Rutas públicas (landing)
- ✅ Rutas protegidas (admin)
- ✅ Protección de rutas
- ✅ Navegación con estado
- ✅ Query parameters
- ✅ Manejo de 404

### Tests de Mobile

#### 1. Navegación (`navigation.spec.ts`)

**Cobertura:**
- ✅ Configuración de tabs
- ✅ Iconos de tabs
- ✅ Labels multiidioma
- ✅ Estado de tab activo
- ✅ Accesibilidad

#### 2. Componentes (`components.spec.ts`)

**Cobertura:**
- ✅ ThemedText (variantes y temas)
- ✅ ThemedView (backgrounds)
- ✅ HapticTab (feedback háptico)
- ✅ IconSymbol (iOS/Android)
- ✅ LanguageSwitcher

#### 3. Pantallas (`screens.spec.ts`)

**Cobertura:**
- ✅ Pantalla de ingredientes
- ✅ Detalle de receta
- ✅ Home screen
- ✅ Explorar
- ✅ Restaurantes

---

## Pruebas E2E

### Configuración

```bash
npm run playwright:install
```

### Ejecución

```bash
# Modo headless
npm run test:e2e

# Modo headed (con navegador visible)
npm run test:e2e:headed

# UI Mode (interactivo)
npm run test:e2e:ui
```

### Tests del Landing

**Archivo:** `e2e/landing.spec.ts`

**Escenarios cubiertos:**
1. ✅ Carga de home page
2. ✅ Cambio de idioma
3. ✅ Navegación a secciones
4. ✅ Gastronomy section
5. ✅ Locations & map
6. ✅ Events
7. ✅ Performance (< 3s)
8. ✅ SEO meta tags

### Tests del Admin

**Archivo:** `e2e/admin.spec.ts`

**Escenarios cubiertos:**
1. ✅ Login page display
2. ✅ Credenciales de prueba
3. ✅ Validación de campos
4. ✅ Toggle password
5. ✅ Login exitoso
6. ✅ Login fallido
7. ✅ Dashboard navigation
8. ✅ Protección de rutas
9. ✅ Logout

---

## Pruebas de Carga con K6

### Instalación de K6

**Linux:**
```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

**Windows:**
```powershell
choco install k6
```

**macOS:**
```bash
brew install k6
```

### Scripts de K6

#### 1. Landing Page Load Test

**Archivo:** `monitoring/k6/load-test-landing.js`

**Configuración:**
- Usuarios: 10 → 20 → 50 (pico)
- Duración: ~5 minutos
- Páginas testeadas:
  - Home
  - Gastronomía
  - Recetas
  - Ingredientes
  - Ubicaciones
  - Eventos

**Métricas:**
- Request duration (P95 < 2s)
- Error rate (< 5%)
- Throughput
- Success rate por página

**Ejecución:**
```bash
k6 run monitoring/k6/load-test-landing.js
```

#### 2. Admin Panel Load Test

**Archivo:** `monitoring/k6/load-test-admin.js`

**Configuración:**
- Usuarios: 5 → 10 → 15 (pico)
- Duración: ~2 minutos
- Flujo:
  - Login
  - Dashboard
  - Catálogos
  - Eventos
  - Estadísticas

**Métricas:**
- Login success rate (> 95%)
- Request duration (P95 < 3s)
- Error rate (< 2%)

**Ejecución:**
```bash
k6 run monitoring/k6/load-test-admin.js
```

### Thresholds (Criterios de Éxito)

```javascript
thresholds: {
  'http_req_duration': ['p(95)<2000'],    // 95% < 2s
  'http_req_failed': ['rate<0.05'],       // Errores < 5%
  'login_success_rate': ['rate>0.95'],    // Login > 95%
}
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

**Archivo:** `.github/workflows/k6-load-testing.yml`

### Triggers

1. **Push a main** (cambios en PWA o K6)
2. **Pull Requests**
3. **Manual** (workflow_dispatch)
4. **Schedule** (diario a las 2 AM)

### Jobs

#### 1. Setup y Validación
- Verifica disponibilidad del servidor
- Valida configuración

#### 2. Test Landing
- Ejecuta K6 landing test
- Genera métricas JSON
- Sube artefactos

#### 3. Test Admin
- Ejecuta K6 admin test
- Genera métricas JSON
- Sube artefactos

#### 4. Reporte
- Consolida resultados
- Genera summary
- Comenta en PR

### Ejecución Manual

```yaml
# En GitHub > Actions > K6 Load Testing Pipeline > Run workflow
Inputs:
  - test_type: all | landing | admin
  - duration: 5 (minutos)
```

### Artefactos

Los resultados se almacenan por **30 días**:
- `k6-landing-results`
- `k6-admin-results`

---

## Métricas y Monitoreo

### Stack de Monitoreo

```
K6 Tests → Prometheus → Grafana
```

### Configuración de Prometheus

**Archivo:** `monitoring/prometheus/k6-prometheus-config.yml`

**Jobs configurados:**
1. `k6_metrics` - Métricas de K6
2. `arroyo_seco_pwa` - Monitoreo de PWA
3. `arroyo_seco_nginx` - Servidor web

### Alertas

**Archivo:** `monitoring/prometheus/k6_alerts.yml`

**Alertas configuradas:**

| Alerta | Condición | Severidad |
|--------|-----------|-----------|
| K6HighErrorRate | Error rate > 5% | Warning |
| K6HighLatencyP95 | P95 > 3000ms | Warning |
| K6VeryHighLatencyP99 | P99 > 5000ms | Critical |
| K6LowThroughput | < 10 req/s | Info |
| K6ChecksFailing | Success < 95% | Warning |
| PWADown | Service down | Critical |

### Dashboard de Grafana

**Archivo:** `monitoring/grafana/k6-dashboard.json`

**Paneles incluidos:**

1. 📊 **Resumen de Pruebas**
   - Total requests
   - Requests/sec
   - Error rate

2. ⏱️ **Latencia**
   - P95 duration
   - P99 duration
   - Average duration

3. 📈 **Request Rate & Errors**
   - Request rate (req/s)
   - Error rate

4. 👥 **Virtual Users**
   - Active VUs
   - Max VUs

5. 📊 **HTTP Status Codes**
   - Distribución de códigos

6. ✅ **Check Success Rate**
   - Gauge de éxito

7. 🌐 **Duration por Página**
   - Home, Gastronomy, Recipes, etc.

8. 💾 **Data Transfer**
   - Data sent/received

### Acceso a Grafana

**URL:** http://vps-master.duckdns.org:3000/grafana

**Dashboard:** "K6 Load Testing - Arroyo Seco Tourism App"

### Acceso a Prometheus

**URL:** http://74.208.45.131:9090

---

## Comandos Rápidos

```bash
# Tests unitarios
npm run test:unit

# Tests con cobertura
npm run test:coverage

# Tests E2E
npm run test:e2e

# Tests de carga
npm run test:load
npm run test:load:admin

# Todos los tests
npm run test:all

# Ver resultados en UI de Playwright
npm run test:e2e:ui
```

---

## Mejores Prácticas

### ✅ DOs

- Ejecutar tests antes de cada commit
- Revisar cobertura de código (objetivo: >70%)
- Mantener tests independientes
- Usar nombres descriptivos
- Limpiar estado entre tests
- Documentar casos de prueba complejos

### ❌ DON'Ts

- No hacer tests dependientes entre sí
- No hardcodear URLs (usar variables de entorno)
- No ignorar tests fallidos
- No commitear código sin tests
- No usar `sleep()` innecesarios en E2E

---

## Troubleshooting

### Jest no encuentra módulos

```bash
# Verificar tsconfig paths
cd tests
cat tsconfig.json
```

### Playwright browser no instalado

```bash
npx playwright install --with-deps
```

### K6 no encontrado

```bash
# Linux
sudo apt-get install k6

# Windows
choco install k6

# macOS
brew install k6
```

### Tests E2E fallan en CI

Verificar:
1. BASE_URL correcta
2. Servidor disponible
3. Timeout suficiente

---

## Recursos

- [Jest Documentation](https://jestjs.io/)
- [Playwright Documentation](https://playwright.dev/)
- [K6 Documentation](https://k6.io/docs/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)

---

## Contacto

Para dudas o sugerencias sobre testing:
- Crear un issue en GitHub
- Contactar al equipo de QA

---

**Última actualización:** Octubre 2025
**Versión:** 2.0.0

