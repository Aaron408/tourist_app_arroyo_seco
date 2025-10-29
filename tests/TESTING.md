# 🧪 Testing - Tourist App Arroyo Seco

## Índice

1. [Descripción](#descripción)
2. [Estructura de Tests](#estructura-de-tests)
3. [Comandos Disponibles](#comandos-disponibles)
4. [Tests Unitarios](#tests-unitarios)
5. [Tests E2E](#tests-e2e)
6. [Tests de Carga (K6)](#tests-de-carga-k6)
7. [CI/CD](#cicd)
8. [Troubleshooting](#troubleshooting)

---

## Descripción

Suite completa de pruebas automatizadas que incluye:

✅ **Tests Unitarios** - Jest (PWA y Mobile)  
✅ **Tests de Integración** - Jest  
✅ **Tests E2E** - Playwright  
✅ **Tests de Carga** - K6  
✅ **CI/CD** - GitHub Actions  
✅ **Monitoreo** - Prometheus + Grafana  

**Cobertura objetivo:** 70% (branches, functions, lines, statements)

---

## Estructura de Tests

```
tests/
├── unit/                    # Tests unitarios
│   ├── mobile/             # Tests de app mobile
│   │   ├── navigation.spec.ts
│   │   ├── components.spec.ts
│   │   ├── screens.spec.ts
│   │   └── theme.spec.ts
│   └── pwa/                # Tests de PWA
│       ├── auth.spec.ts
│       ├── language.spec.ts
│       ├── routing.spec.ts
│       └── sleep.spec.ts
├── integration/            # Tests de integración
├── e2e/                    # Tests end-to-end
│   ├── landing.spec.ts
│   ├── admin.spec.ts
│   └── example.spec.ts
├── performance/            # Tests de rendimiento
├── coverage/              # Reportes de cobertura
└── __mocks__/             # Mocks globales
```

---

## Comandos Disponibles

### Setup

```bash
cd tests
npm install
npm run playwright:install  # Instalar navegadores de Playwright
```

### Tests

```bash
# Tests unitarios
npm run test:unit

# Tests de integración
npm run test:integration

# Tests E2E
npm run test:e2e
npm run test:e2e:headed     # Con navegador visible
npm run test:e2e:ui         # UI interactiva

# Tests con cobertura
npm run test:coverage

# Todos los tests
npm run test:all

# Watch mode
npm run test:watch

# Linter
npm run lint
```

### Tests de Carga

```bash
# K6 - Landing
npm run test:load

# K6 - Admin
npm run test:load:admin

# Directamente con K6
k6 run ../monitoring/k6/load-test-landing.js
k6 run ../monitoring/k6/load-test-admin.js
```

---

## Tests Unitarios

### Cobertura

**PWA:**
- ✅ Autenticación (login, logout, sesiones)
- ✅ Internacionalización (español/inglés)
- ✅ Rutas (públicas, protegidas, navegación)
- ✅ Utilidades (sleep, helpers)

**Mobile:**
- ✅ Navegación por tabs
- ✅ Componentes (ThemedText, ThemedView, HapticTab, etc.)
- ✅ Pantallas (Ingredients, RecipeDetail, Home, etc.)
- ✅ Temas (light/dark)

### Ejecutar

```bash
npm run test:unit

# Solo PWA
npm run test:unit -- --testMatch='**/pwa/**'

# Solo Mobile
npm run test:unit -- --testMatch='**/mobile/**'
```

### Ejemplo de Output

```
PASS  unit/pwa/auth.spec.ts
  PWA - Authentication Flow
    Login Functionality
      ✓ should validate required email and password fields (3 ms)
      ✓ should accept valid email format (2 ms)
      ✓ should reject invalid email format (2 ms)
      ✓ should handle successful login (5 ms)
    
Test Suites: 8 passed, 8 total
Tests:       45 passed, 45 total
Coverage:    73.5%
```

---

## Tests E2E

### Playwright Tests

**Landing Page (`e2e/landing.spec.ts`):**
- ✅ Carga de home page
- ✅ Cambio de idioma
- ✅ Navegación a secciones
- ✅ Gastronomy, Locations, Events
- ✅ Performance (< 3s)
- ✅ SEO meta tags

**Admin Panel (`e2e/admin.spec.ts`):**
- ✅ Login page
- ✅ Autenticación
- ✅ Dashboard navigation
- ✅ Protección de rutas
- ✅ Logout

### Ejecutar

```bash
# Headless mode
npm run test:e2e

# Headed mode (ver navegador)
npm run test:e2e:headed

# UI Mode (interactivo)
npm run test:e2e:ui

# Solo un archivo
npx playwright test landing.spec.ts

# Debug mode
npx playwright test --debug
```

### Configuración

Editar `E2E_BASE_URL` en `playwright.config.ts`:

```typescript
use: {
  baseURL: process.env.E2E_BASE_URL || 'http://localhost:5173',
}
```

---

## Tests de Carga (K6)

### Scripts Disponibles

1. **Landing Page** (`monitoring/k6/load-test-landing.js`)
   - Usuarios: 10 → 20 → 50
   - Duración: ~5 min
   - Threshold: P95 < 2s, Error < 5%

2. **Admin Panel** (`monitoring/k6/load-test-admin.js`)
   - Usuarios: 5 → 10 → 15
   - Duración: ~2 min
   - Threshold: P95 < 3s, Error < 2%, Login > 95%

### Ejecutar

```bash
# Instalar K6 (si no está instalado)
# Linux: sudo apt-get install k6
# macOS: brew install k6
# Windows: choco install k6

# Ejecutar tests
npm run test:load
npm run test:load:admin

# Con variable de entorno
BASE_URL=http://localhost:5173 k6 run monitoring/k6/load-test-landing.js
```

### Interpretar Resultados

```
╔═══════════════════════════════════════════════════════╗
║     RESUMEN DE PRUEBAS DE CARGA - LANDING PAGE       ║
╚═══════════════════════════════════════════════════════╝

📊 MÉTRICAS PRINCIPALES:
  • Total de Requests: 1250
  • Requests Fallidos: 2.4%
  • Duración Promedio: 845.32ms
  • P95: 1850.45ms

✅ TODAS LAS PRUEBAS PASARON
```

---

## CI/CD

### GitHub Actions

**Workflow:** `.github/workflows/k6-load-testing.yml`

**Triggers:**
- Push a main (archivos PWA/K6)
- Pull Requests
- Manual (workflow_dispatch)
- Schedule (diario 2 AM)

**Jobs:**
1. Setup y validación
2. Test Landing
3. Test Admin
4. Reporte consolidado

**Ver resultados:**
https://github.com/Aaron408/tourist_app_arroyo_seco/actions

### Artefactos

Los resultados de K6 se guardan como artefactos por 30 días:
- `k6-landing-results`
- `k6-admin-results`

---

## Monitoreo

### Prometheus

**URL:** http://74.208.45.131:9090

**Métricas de K6:**
```promql
k6_http_reqs_total
k6_http_req_duration
k6_http_req_failed_rate
k6_vus
```

### Grafana

**URL:** http://vps-master.duckdns.org:3000/grafana

**Dashboard:** "K6 Load Testing - Arroyo Seco Tourism App"

**Paneles:**
- HTTP Request Duration
- Request Rate & Error Rate
- Virtual Users
- Check Success Rate

---

## Troubleshooting

### Jest no encuentra módulos

```bash
# Verificar paths en jest.config.ts
# Asegurar que moduleNameMapper está correcto
npm run test:unit -- --no-cache
```

### Playwright navegadores no instalados

```bash
npm run playwright:install
# o
npx playwright install --with-deps
```

### K6 no instalado

```bash
# Linux
sudo apt-get install k6

# macOS
brew install k6

# Windows
choco install k6
```

### Tests E2E fallan en CI

Verificar:
1. BASE_URL correcta
2. Servidor disponible
3. Timeout suficiente (ajustar en playwright.config.ts)

### Error: "Cannot find module @pwa/..."

```bash
# Verificar que pwa/src existe
# Actualizar moduleNameMapper en jest.config.ts
```

---

## Mejores Prácticas

### ✅ DOs

- Ejecutar `npm run lint` antes de commit
- Mantener cobertura > 70%
- Escribir tests descriptivos
- Usar `beforeEach` para setup
- Limpiar estado entre tests

### ❌ DON'Ts

- No hacer tests dependientes
- No hardcodear URLs
- No ignorar tests fallidos
- No usar `sleep()` innecesarios
- No commitear sin tests

---

## Recursos

- [Jest Documentation](https://jestjs.io/)
- [Playwright Documentation](https://playwright.dev/)
- [K6 Documentation](https://k6.io/docs/)
- [Testing Best Practices](https://testingjavascript.com/)

---

## Observaciones Técnicas

- Tests acceden a código via alias: `@mobile/*`, `@pwa/*`
- React Native es mockeado: `tests/__mocks__/react-native.ts`
- Cobertura generada en `coverage/`
- Resultados de E2E en `test-results/`

---

**Última actualización:** Octubre 2025  
**Versión:** 2.0.0
