import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Counter, Trend, Rate } from 'k6/metrics';

/**
 * Script de Pruebas de Carga K6 - Landing Page
 * Simula usuarios navegando por el sitio público
 * 
 * Métricas monitoreadas:
 * - Tiempo de respuesta de páginas
 * - Tasa de errores
 * - Throughput
 * - Requests por segundo
 */

// Configuración de métricas personalizadas
const errorRate = new Rate('errors');
const homePageTrend = new Trend('home_page_duration');
const gastronomyTrend = new Trend('gastronomy_page_duration');
const recipesTrend = new Trend('recipes_page_duration');
const locationsTrend = new Trend('locations_page_duration');
const requestCounter = new Counter('http_requests_total');

// Configuración del test
export const options = {
  // Escenarios de carga
  stages: [
    { duration: '30s', target: 10 },  // Ramp up a 10 usuarios
    { duration: '1m', target: 10 },   // Mantener 10 usuarios
    { duration: '30s', target: 20 },  // Ramp up a 20 usuarios
    { duration: '1m', target: 20 },   // Mantener 20 usuarios
    { duration: '30s', target: 50 },  // Pico de carga - 50 usuarios
    { duration: '1m', target: 50 },   // Mantener pico
    { duration: '30s', target: 0 },   // Ramp down
  ],
  
  // Thresholds - Criterios de éxito
  thresholds: {
    'http_req_duration': ['p(95)<2000'], // 95% de requests < 2s
    'http_req_failed': ['rate<0.05'],    // Error rate < 5%
    'errors': ['rate<0.05'],             // Custom error rate < 5%
    'http_req_duration{page:home}': ['p(95)<1500'],
    'http_req_duration{page:gastronomy}': ['p(95)<2000'],
  },
  
  // Configuración para exportar a Prometheus/Grafana
  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)', 'p(99)'],
};

// URL base - puede configurarse via variable de entorno
const BASE_URL = __ENV.BASE_URL || 'https://vps-master.duckdns.org';

/**
 * Función principal - Ejecuta por cada usuario virtual
 */
export default function(data) {
  // Grupo 1: Página de Inicio
  group('01_Home_Page', function() {
    const res = http.get(BASE_URL, {
      tags: { page: 'home' },
    });
    
    requestCounter.add(1);
    homePageTrend.add(res.timings.duration);
    
    const success = check(res, {
      'home: status 200': (r) => r.status === 200,
      'home: tiene título': (r) => r.body.includes('Arroyo Seco') || r.body.includes('<title>'),
      'home: carga en < 2s': (r) => r.timings.duration < 2000,
    });
    
    if (!success) errorRate.add(1);
    
    sleep(1); // Simular tiempo de lectura
  });

  // Grupo 2: Navegación a Gastronomía
  group('02_Gastronomy_Section', function() {
    const res = http.get(`${BASE_URL}/gastronomia`, {
      tags: { page: 'gastronomy' },
    });
    
    requestCounter.add(1);
    gastronomyTrend.add(res.timings.duration);
    
    const success = check(res, {
      'gastronomy: status 200': (r) => r.status === 200,
      'gastronomy: contenido relevante': (r) => 
        r.body.includes('receta') || 
        r.body.includes('recipe') ||
        r.body.includes('gastronom'),
      'gastronomy: carga en < 2s': (r) => r.timings.duration < 2000,
    });
    
    if (!success) errorRate.add(1);
    
    sleep(2); // Tiempo de navegación
  });

  // Grupo 3: Ver Recetas
  group('03_Recipes_Page', function() {
    const res = http.get(`${BASE_URL}/gastronomia/recetas`, {
      tags: { page: 'recipes' },
    });
    
    requestCounter.add(1);
    recipesTrend.add(res.timings.duration);
    
    const success = check(res, {
      'recipes: status 200': (r) => r.status === 200,
      'recipes: carga en < 2s': (r) => r.timings.duration < 2000,
    });
    
    if (!success) errorRate.add(1);
    
    sleep(3); // Tiempo viendo recetas
  });

  // Grupo 4: Ver Ingredientes
  group('04_Ingredients_Page', function() {
    const res = http.get(`${BASE_URL}/gastronomia/ingredientes`, {
      tags: { page: 'ingredients' },
    });
    
    requestCounter.add(1);
    
    const success = check(res, {
      'ingredients: status 200': (r) => r.status === 200,
      'ingredients: carga en < 2s': (r) => r.timings.duration < 2000,
    });
    
    if (!success) errorRate.add(1);
    
    sleep(2);
  });

  // Grupo 5: Ubicaciones
  group('05_Locations_Page', function() {
    const res = http.get(`${BASE_URL}/ubicaciones`, {
      tags: { page: 'locations' },
    });
    
    requestCounter.add(1);
    locationsTrend.add(res.timings.duration);
    
    const success = check(res, {
      'locations: status 200': (r) => r.status === 200,
      'locations: carga en < 2.5s': (r) => r.timings.duration < 2500,
    });
    
    if (!success) errorRate.add(1);
    
    sleep(2);
  });

  // Grupo 6: Eventos
  group('06_Events_Page', function() {
    const res = http.get(`${BASE_URL}/eventos`, {
      tags: { page: 'events' },
    });
    
    requestCounter.add(1);
    
    const success = check(res, {
      'events: status 200': (r) => r.status === 200,
      'events: carga en < 2s': (r) => r.timings.duration < 2000,
    });
    
    if (!success) errorRate.add(1);
    
    sleep(1);
  });

  // Simular tiempo de "pensamiento" del usuario
  sleep(Math.random() * 2 + 1); // 1-3 segundos
}

/**
 * Teardown - Ejecuta una vez al finalizar el test
 */
export function teardown(data) {
  console.log(`\n✅ Pruebas completadas`);
  console.log(`⏱️  Inicio: ${data.startTime}`);
  console.log(`⏱️  Fin: ${new Date().toISOString()}`);
}

/**
 * handleSummary - Personaliza el resumen de resultados
 * Exporta métricas en formato compatible con Prometheus/Grafana
 */
export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
    'monitoring/k6/results/summary.json': JSON.stringify(data),
  };
}

function textSummary(data, opts) {
  return `
╔════════════════════════════════════════════════════════════════════╗
║           RESUMEN DE PRUEBAS DE CARGA - LANDING PAGE              ║
╚════════════════════════════════════════════════════════════════════╝

📊 MÉTRICAS PRINCIPALES:
  • Total de Requests: ${data.metrics.http_reqs.values.count}
  • Requests Fallidos: ${data.metrics.http_req_failed.values.rate * 100}%
  • Duración Promedio: ${data.metrics.http_req_duration.values.avg.toFixed(2)}ms
  • P95: ${data.metrics.http_req_duration.values['p(95)'].toFixed(2)}ms
  • P99: ${data.metrics.http_req_duration.values['p(99)'].toFixed(2)}ms

⏱️  TIEMPOS POR PÁGINA:
  • Home: ${data.metrics.home_page_duration?.values.avg?.toFixed(2) || 'N/A'}ms
  • Gastronomía: ${data.metrics.gastronomy_page_duration?.values.avg?.toFixed(2) || 'N/A'}ms
  • Recetas: ${data.metrics.recipes_page_duration?.values.avg?.toFixed(2) || 'N/A'}ms
  • Ubicaciones: ${data.metrics.locations_page_duration?.values.avg?.toFixed(2) || 'N/A'}ms

${checkThresholds(data) ? '✅ TODAS LAS PRUEBAS PASARON' : '❌ ALGUNAS PRUEBAS FALLARON'}
`;
}

function checkThresholds(data) {
  return data.metrics.http_req_failed.values.rate < 0.05 &&
         data.metrics.http_req_duration.values['p(95)'] < 2000;
}

