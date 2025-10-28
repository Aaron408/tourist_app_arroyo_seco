# 🌮 Tourist App Arroyo Seco

Aplicación turística y gastronómica para promover la riqueza cultural de Arroyo Seco, Querétaro.

[![CI/CD](https://github.com/Aaron408/tourist_app_arroyo_seco/workflows/K6%20Load%20Testing%20Pipeline/badge.svg)](https://github.com/Aaron408/tourist_app_arroyo_seco/actions)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)]()
[![Coverage](https://img.shields.io/badge/coverage-70%25-yellow)]()

---

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Arquitectura](#arquitectura)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Testing](#testing)
- [CI/CD y Monitoreo](#cicd-y-monitoreo)
- [Deployment](#deployment)
- [Documentación](#documentación)

---

## 📖 Descripción

Sistema multiplataforma que incluye:

- 🌐 **PWA** - Aplicación web progresiva
  - Sitio público con información turística y gastronómica
  - Panel de administración para gestión de contenido
  
- 📱 **Mobile** - Aplicación móvil nativa (React Native/Expo)
  - Explorar recetas, ingredientes y ubicaciones
  - Información offline
  - Navegación por tabs

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend                                 │
├──────────────────────┬──────────────────────────────────────┤
│   PWA (React+Vite)   │   Mobile (React Native/Expo)        │
│   - Landing Pages    │   - Tab Navigation                   │
│   - Admin Panel      │   - Offline Support                  │
└──────────────────────┴──────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     Backend (API)                            │
│                   (Por implementar)                          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              Testing & Monitoring Stack                      │
├────────────┬────────────┬─────────────┬────────────────────┤
│   Jest     │ Playwright │     K6      │  Prometheus+Grafana│
│  Unit Tests│  E2E Tests │ Load Tests  │    Monitoring      │
└────────────┴────────────┴─────────────┴────────────────────┘
```

---

## 🛠️ Tecnologías

### Frontend

- **PWA:** React 18, Vite, React Router, TailwindCSS
- **Mobile:** React Native, Expo, TypeScript
- **State Management:** Zustand
- **Internationalization:** Custom i18n (es-MX, en-US)

### Testing

- **Unit/Integration:** Jest, ts-jest
- **E2E:** Playwright
- **Load Testing:** K6
- **Coverage:** Istanbul

### DevOps & Monitoring

- **CI/CD:** GitHub Actions
- **Metrics:** Prometheus
- **Visualization:** Grafana
- **Web Server:** Nginx

---

## 📁 Estructura del Proyecto

```
tourist_app_arroyo_seco/
├── pwa/                        # Aplicación web progresiva
│   ├── src/
│   │   ├── landing/           # Sitio público
│   │   │   ├── pages/         # Páginas (Home, Gastronomy, Locations, Events)
│   │   │   ├── components/    # Componentes reutilizables
│   │   │   ├── i18n/          # Traducciones
│   │   │   └── stores/        # State management
│   │   └── admin/             # Panel de administración
│   │       ├── pages/         # Dashboard, Catalogs, Users, etc.
│   │       ├── contexts/      # Auth context
│   │       └── i18n/          # Traducciones admin
│   ├── public/                # Assets estáticos
│   └── package.json
│
├── mobile/                     # Aplicación móvil
│   ├── app/
│   │   ├── (tabs)/            # Navegación por tabs
│   │   │   ├── index.tsx      # Home
│   │   │   ├── explore.tsx    # Explorar
│   │   │   ├── recipes.tsx    # Recetas
│   │   │   └── restaurants.tsx
│   │   └── screens/           # Pantallas adicionales
│   ├── components/            # Componentes UI
│   ├── contexts/              # Language provider
│   └── i18n/                  # Traducciones
│
├── tests/                      # Suite completa de pruebas
│   ├── unit/                  # Tests unitarios
│   │   ├── pwa/              # Tests de PWA
│   │   │   ├── auth.spec.ts
│   │   │   ├── language.spec.ts
│   │   │   └── routing.spec.ts
│   │   └── mobile/           # Tests de Mobile
│   │       ├── navigation.spec.ts
│   │       ├── components.spec.ts
│   │       └── screens.spec.ts
│   ├── integration/           # Tests de integración
│   ├── e2e/                   # Tests end-to-end
│   │   ├── landing.spec.ts
│   │   └── admin.spec.ts
│   └── performance/           # Tests de rendimiento
│
├── monitoring/                 # Stack de monitoreo
│   ├── k6/                    # Scripts de pruebas de carga
│   │   ├── load-test-landing.js
│   │   └── load-test-admin.js
│   ├── prometheus/            # Configuración de Prometheus
│   │   ├── k6-prometheus-config.yml
│   │   └── k6_alerts.yml
│   └── grafana/               # Dashboards de Grafana
│       └── k6-dashboard.json
│
├── docs/                       # Documentación
│   ├── setup/                 # Guías de configuración
│   │   ├── SERVER_SETUP.md
│   │   └── GITHUB_GRAFANA_INTEGRATION.md
│   ├── testing/               # Documentación de testing
│   │   └── README.md
│   └── api/                   # Documentación de API
│
├── .github/
│   └── workflows/
│       └── k6-load-testing.yml  # CI/CD Pipeline
│
└── README.md                   # Este archivo
```

---

## 🚀 Instalación

### Prerrequisitos

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### PWA

```bash
# Clonar repositorio
git clone https://github.com/Aaron408/tourist_app_arroyo_seco.git
cd tourist_app_arroyo_seco/pwa

# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build de producción
npm run build

# Preview de producción
npm run preview
```

**URLs:**
- Desarrollo: http://localhost:5173
- Landing: http://localhost:5173/
- Admin: http://localhost:5173/administracion/login

**Credenciales de prueba:**
- Email: `admin@arroyoseco.com`
- Password: `admin123`

### Mobile

```bash
cd mobile

# Instalar dependencias
npm install

# Iniciar Expo
npx expo start

# iOS
npx expo start --ios

# Android
npx expo start --android

# Web
npx expo start --web
```

---

## 🧪 Testing

### Setup

```bash
cd tests
npm install

# Instalar navegadores de Playwright
npm run playwright:install
```

### Ejecutar Tests

```bash
# Tests unitarios
npm run test:unit

# Tests con cobertura
npm run test:coverage

# Tests E2E
npm run test:e2e

# Tests E2E con UI interactiva
npm run test:e2e:ui

# Todos los tests
npm run test:all
```

### Pruebas de Carga (K6)

```bash
# Instalar K6 (Linux)
sudo apt-get install k6

# Test de Landing
cd tests
npm run test:load

# Test de Admin
npm run test:load:admin

# Desde la raíz
k6 run monitoring/k6/load-test-landing.js
k6 run monitoring/k6/load-test-admin.js
```

### Cobertura

Los reportes de cobertura se generan en `tests/coverage/`

**Objetivos:**
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

---

## 🔄 CI/CD y Monitoreo

### GitHub Actions

**Workflow:** `.github/workflows/k6-load-testing.yml`

**Triggers:**
- ✅ Push a main (archivos PWA o K6)
- ✅ Pull Requests
- ✅ Manual (workflow_dispatch)
- ✅ Schedule (diario 2 AM)

**Jobs:**
1. Setup y validación
2. Pruebas de carga - Landing
3. Pruebas de carga - Admin
4. Reporte consolidado
5. Cleanup

**Ver resultados:**
- GitHub Actions: https://github.com/Aaron408/tourist_app_arroyo_seco/actions

### Prometheus

**URL:** http://74.208.45.131:9090

**Métricas monitoreadas:**
- HTTP requests de K6
- Latencia (P95, P99)
- Error rate
- Virtual users
- Throughput

**Queries útiles:**
```promql
# Total requests
sum(k6_http_reqs_total)

# Request rate
rate(k6_http_reqs_total[1m])

# P95 latency
histogram_quantile(0.95, rate(k6_http_req_duration_bucket[5m]))
```

### Grafana

**URL:** http://vps-master.duckdns.org:3000/grafana

**Dashboard:** "K6 Load Testing - Arroyo Seco Tourism App"

**Paneles:**
- Resumen de pruebas
- HTTP Request Duration (P95, P99)
- Request Rate & Error Rate
- Virtual Users
- HTTP Status Codes
- Check Success Rate
- Duration por página
- Data Transfer

---

## 🌐 Deployment

### Servidor de Producción

**URL:** http://vps-master.duckdns.org:3000  
**IP:** 74.208.45.131  
**Ubicación:** `/home/github/tourist_app_arroyo_seco`

### Deploy de PWA

```bash
# Conectar al servidor
ssh root@74.208.45.131

# Actualizar código
cd /home/github/tourist_app_arroyo_seco
git pull origin main

# Build
cd pwa
npm install
npm run build

# Recargar Nginx
sudo systemctl reload nginx
```

### Configuración de Nginx

```nginx
server {
    listen 3000;
    server_name vps-master.duckdns.org;
    root /home/github/tourist_app_arroyo_seco/pwa/dist;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 📚 Documentación

### Guías Disponibles

- **[Testing Documentation](docs/testing/README.md)**
  - Suite completa de pruebas
  - Guías de Jest, Playwright y K6
  - Configuración de CI/CD
  - Métricas y monitoreo

- **[Server Setup](docs/setup/SERVER_SETUP.md)**
  - Configuración del servidor
  - Deployment de PWA
  - Configuración de Prometheus
  - Configuración de Grafana

- **[GitHub + Grafana Integration](docs/setup/GITHUB_GRAFANA_INTEGRATION.md)**
  - Pipeline completo K6 + GitHub Actions
  - Integración con Prometheus/Grafana
  - Guía de captura de evidencias
  - Estructura del entregable

---

## 🎯 Roadmap

### Completado ✅

- [x] PWA con Landing y Admin
- [x] Mobile app con Expo
- [x] Internacionalización (es-MX, en-US)
- [x] Tests unitarios completos
- [x] Tests E2E con Playwright
- [x] Tests de carga con K6
- [x] CI/CD con GitHub Actions
- [x] Monitoreo con Prometheus
- [x] Dashboards en Grafana
- [x] Deployment en servidor

### En Progreso 🚧

- [ ] Backend API (en desarrollo)
- [ ] Autenticación real
- [ ] Base de datos

### Futuro 🔮

- [ ] Push notifications (PWA)
- [ ] Modo offline completo (Mobile)
- [ ] Integración con mapas
- [ ] Sistema de reviews
- [ ] Reservaciones

---

## 👥 Equipo

- **Desarrollo:** Equipo Tourist App Arroyo Seco
- **QA & Testing:** Sistema automatizado con K6, Jest, Playwright
- **DevOps:** GitHub Actions + Prometheus + Grafana

---

## 📄 Licencia

Este proyecto es privado y de uso académico.

---

## 🆘 Soporte

### Problemas Comunes

**Error en tests unitarios:**
```bash
cd tests
npm install
npm run test:unit
```

**Playwright no encuentra navegadores:**
```bash
npm run playwright:install
```

**K6 no instalado:**
```bash
# Linux
sudo apt-get install k6

# Windows
choco install k6

# macOS
brew install k6
```

### Contacto

- **GitHub Issues:** https://github.com/Aaron408/tourist_app_arroyo_seco/issues
- **Email:** (contacto del equipo)

---

## 📊 Badges de Status

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-70%25-yellow)
![K6](https://img.shields.io/badge/K6-load%20testing-blue)
![Prometheus](https://img.shields.io/badge/monitoring-prometheus-orange)
![Grafana](https://img.shields.io/badge/visualization-grafana-yellow)

---

**🌮 Descubre los Sabores de Arroyo Seco 🌮**
