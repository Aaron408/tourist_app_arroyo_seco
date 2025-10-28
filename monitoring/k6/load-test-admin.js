import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Counter, Trend, Rate } from 'k6/metrics';

/**
 * Script de Pruebas de Carga K6 - Admin Panel
 * Simula usuarios administradores trabajando en el panel
 * 
 * Flujos testeados:
 * - Login de administradores
 * - Navegación por el dashboard
 * - Acceso a catálogos
 * - Operaciones CRUD simuladas
 */

// Métricas personalizadas
const errorRate = new Rate('errors');
const loginTrend = new Trend('login_duration');
const dashboardTrend = new Trend('dashboard_duration');
const catalogsTrend = new Trend('catalogs_duration');
const requestCounter = new Counter('http_requests_total');
const loginSuccessRate = new Rate('login_success_rate');

// Configuración del test
export const options = {
  stages: [
    { duration: '20s', target: 5 },   // Warm up - 5 admins
    { duration: '40s', target: 10 },  // Normal load - 10 admins
    { duration: '30s', target: 15 },  // Peak load - 15 admins
    { duration: '20s', target: 0 },   // Ramp down
  ],
  
  thresholds: {
    'http_req_duration': ['p(95)<3000'],      // 95% < 3s (admin más complejo)
    'http_req_failed': ['rate<0.02'],         // Error rate < 2%
    'login_duration': ['p(95)<2000'],         // Login < 2s
    'login_success_rate': ['rate>0.95'],      // 95% login exitoso
    'errors': ['rate<0.02'],
  },
  
  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)', 'p(99)'],
};

const BASE_URL = __ENV.BASE_URL || 'http://vps-master.duckdns.org:3000';

// Credenciales de prueba
const ADMIN_CREDENTIALS = {
  email: 'admin@arroyoseco.com',
  password: 'admin123',
};

export function setup() {
  console.log(`🔐 Iniciando pruebas de carga - Panel de Administración`);
  console.log(`🎯 Target: ${BASE_URL}/administracion`);
  
  return { startTime: new Date().toISOString() };
}

export default function(data) {
  let authToken = null;

  // Grupo 1: Login
  group('01_Admin_Login', function() {
    const loginUrl = `${BASE_URL}/administracion/login`;
    
    // Primero cargar la página de login
    const pageRes = http.get(loginUrl, {
      tags: { page: 'login' },
    });
    
    requestCounter.add(1);
    sleep(1);
    
    // Simular POST de login (ajustar según API real)
    const loginPayload = JSON.stringify({
      email: ADMIN_CREDENTIALS.email,
      password: ADMIN_CREDENTIALS.password,
    });
    
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
      tags: { action: 'login' },
    };
    
    // Nota: Ajustar endpoint según la implementación real
    const loginRes = http.post(`${BASE_URL}/api/auth/login`, loginPayload, params);
    
    requestCounter.add(1);
    loginTrend.add(loginRes.timings.duration);
    
    const loginSuccess = check(loginRes, {
      'login: status 200 o 201': (r) => r.status === 200 || r.status === 201,
      'login: recibe token': (r) => {
        try {
          const body = JSON.parse(r.body);
          return body.token !== undefined || body.success === true;
        } catch {
          return false;
        }
      },
      'login: tiempo < 2s': (r) => r.timings.duration < 2000,
    });
    
    loginSuccessRate.add(loginSuccess);
    if (!loginSuccess) errorRate.add(1);
    
    // Extraer token si existe
    try {
      const body = JSON.parse(loginRes.body);
      authToken = body.token;
    } catch {
      // Token no disponible en esta implementación mock
    }
    
    sleep(1);
  });

  // Grupo 2: Dashboard
  group('02_Admin_Dashboard', function() {
    const headers = authToken ? {
      'Authorization': `Bearer ${authToken}`,
    } : {};
    
    const res = http.get(`${BASE_URL}/administracion/dashboard`, {
      headers,
      tags: { page: 'dashboard' },
    });
    
    requestCounter.add(1);
    dashboardTrend.add(res.timings.duration);
    
    const success = check(res, {
      'dashboard: status 200': (r) => r.status === 200,
      'dashboard: contenido relevante': (r) => 
        r.body.includes('dashboard') || 
        r.body.includes('administr') ||
        r.body.includes('panel'),
      'dashboard: carga en < 3s': (r) => r.timings.duration < 3000,
    });
    
    if (!success) errorRate.add(1);
    
    sleep(2);
  });

  // Grupo 3: Catálogos
  group('03_Admin_Catalogs', function() {
    const headers = authToken ? {
      'Authorization': `Bearer ${authToken}`,
    } : {};
    
    const res = http.get(`${BASE_URL}/administracion/catalogos`, {
      headers,
      tags: { page: 'catalogs' },
    });
    
    requestCounter.add(1);
    catalogsTrend.add(res.timings.duration);
    
    const success = check(res, {
      'catalogs: status 200': (r) => r.status === 200,
      'catalogs: carga en < 3s': (r) => r.timings.duration < 3000,
    });
    
    if (!success) errorRate.add(1);
    
    sleep(2);
  });

  // Grupo 4: Ver Ingredientes (Catálogo)
  group('04_View_Ingredients_Catalog', function() {
    const headers = authToken ? {
      'Authorization': `Bearer ${authToken}`,
    } : {};
    
    const res = http.get(`${BASE_URL}/administracion/catalogos/ingredientes`, {
      headers,
      tags: { page: 'ingredients_catalog' },
    });
    
    requestCounter.add(1);
    
    const success = check(res, {
      'ingredients_catalog: status 200': (r) => r.status === 200,
      'ingredients_catalog: carga en < 3s': (r) => r.timings.duration < 3000,
    });
    
    if (!success) errorRate.add(1);
    
    sleep(2);
  });

  // Grupo 5: Ver Recetas (Catálogo)
  group('05_View_Recipes_Catalog', function() {
    const headers = authToken ? {
      'Authorization': `Bearer ${authToken}`,
    } : {};
    
    const res = http.get(`${BASE_URL}/administracion/catalogos/recetas`, {
      headers,
      tags: { page: 'recipes_catalog' },
    });
    
    requestCounter.add(1);
    
    const success = check(res, {
      'recipes_catalog: status 200': (r) => r.status === 200,
      'recipes_catalog: carga en < 3s': (r) => r.timings.duration < 3000,
    });
    
    if (!success) errorRate.add(1);
    
    sleep(2);
  });

  // Grupo 6: Ver Eventos
  group('06_View_Events', function() {
    const headers = authToken ? {
      'Authorization': `Bearer ${authToken}`,
    } : {};
    
    const res = http.get(`${BASE_URL}/administracion/eventos`, {
      headers,
      tags: { page: 'events_admin' },
    });
    
    requestCounter.add(1);
    
    const success = check(res, {
      'events_admin: status 200': (r) => r.status === 200,
      'events_admin: carga en < 3s': (r) => r.timings.duration < 3000,
    });
    
    if (!success) errorRate.add(1);
    
    sleep(1);
  });

  // Grupo 7: Estadísticas
  group('07_View_Statistics', function() {
    const headers = authToken ? {
      'Authorization': `Bearer ${authToken}`,
    } : {};
    
    const res = http.get(`${BASE_URL}/administracion/estadisticas`, {
      headers,
      tags: { page: 'statistics' },
    });
    
    requestCounter.add(1);
    
    const success = check(res, {
      'statistics: status 200': (r) => r.status === 200,
      'statistics: carga en < 4s': (r) => r.timings.duration < 4000, // Más tiempo para stats
    });
    
    if (!success) errorRate.add(1);
    
    sleep(2);
  });

  sleep(Math.random() * 2 + 1);
}

export function teardown(data) {
  console.log(`\n✅ Pruebas de admin completadas`);
  console.log(`⏱️  Duración total: ${new Date().toISOString()}`);
}

export function handleSummary(data) {
  return {
    'stdout': textSummary(data),
    'monitoring/k6/results/admin-summary.json': JSON.stringify(data),
  };
}

function textSummary(data) {
  return `
╔════════════════════════════════════════════════════════════════════╗
║          RESUMEN DE PRUEBAS DE CARGA - ADMIN PANEL                ║
╚════════════════════════════════════════════════════════════════════╝

📊 MÉTRICAS PRINCIPALES:
  • Total de Requests: ${data.metrics.http_reqs.values.count}
  • Requests Fallidos: ${(data.metrics.http_req_failed.values.rate * 100).toFixed(2)}%
  • Duración Promedio: ${data.metrics.http_req_duration.values.avg.toFixed(2)}ms
  • P95: ${data.metrics.http_req_duration.values['p(95)'].toFixed(2)}ms

🔐 MÉTRICAS DE LOGIN:
  • Tasa de Éxito: ${(data.metrics.login_success_rate.values.rate * 100).toFixed(2)}%
  • Duración Promedio: ${data.metrics.login_duration?.values.avg?.toFixed(2) || 'N/A'}ms

⏱️  TIEMPOS POR SECCIÓN:
  • Dashboard: ${data.metrics.dashboard_duration?.values.avg?.toFixed(2) || 'N/A'}ms
  • Catálogos: ${data.metrics.catalogs_duration?.values.avg?.toFixed(2) || 'N/A'}ms

${checkThresholds(data) ? '✅ TODAS LAS PRUEBAS PASARON' : '❌ ALGUNAS PRUEBAS FALLARON'}
`;
}

function checkThresholds(data) {
  return data.metrics.http_req_failed.values.rate < 0.02 &&
         data.metrics.login_success_rate.values.rate > 0.95;
}

