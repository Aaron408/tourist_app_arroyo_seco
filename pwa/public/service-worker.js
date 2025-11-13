// Versión del caché - Incrementar cuando quieras forzar actualización
const CACHE_VERSION = 'v1';
const CACHE_NAME = `arroyo-seco-${CACHE_VERSION}`;

// Recursos estáticos críticos que se cachean en la instalación
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/favicon.png',
  // Vite generará estos con hash, pero los cacheamos dinámicamente
];

// Rutas que deben funcionar offline
const OFFLINE_PAGES = [
  '/',
  '/gastronomia',
  '/gastronomia/recetas',
  '/gastronomia/ingredientes',
  '/gastronomia/tecnicas',
  '/gastronomia/herramientas',
];

// ============================================================================
// INSTALL - Cachear recursos críticos
// ============================================================================
self.addEventListener('install', (event) => {
  console.log('[SW] Service Worker instalándose...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cacheando recursos estáticos');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Service Worker instalado correctamente');
        // Activar inmediatamente sin esperar
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Error durante la instalación:', error);
      })
  );
});

// ============================================================================
// ACTIVATE - Limpiar cachés antiguas
// ============================================================================
self.addEventListener('activate', (event) => {
  console.log('[SW] Service Worker activándose...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Eliminando caché antigua:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker activado correctamente');
        // Tomar control de todas las páginas inmediatamente
        return self.clients.claim();
      })
  );
});

// ============================================================================
// FETCH - Estrategias de caché
// ============================================================================
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo manejar peticiones GET
  if (request.method !== 'GET') {
    return;
  }

  // Estrategia según tipo de recurso
  if (isAPIRequest(url)) {
    // API: Network First (intentar red, fallback a caché) - incluye backend externo
    event.respondWith(networkFirstStrategy(request));
  } else if (url.origin !== location.origin && !isTrustedCDN(url)) {
    // Ignorar otros dominios externos que no son API ni CDNs de confianza
    return;
  } else if (isStaticAsset(url)) {
    // Assets estáticos: Cache First (rápido, actualiza en background)
    event.respondWith(cacheFirstStrategy(request));
  } else if (isMediaFile(url)) {
    // Multimedia: Cache First (videos/imágenes grandes)
    event.respondWith(cacheFirstStrategy(request));
  } else {
    // HTML y otros: Network First con caché
    event.respondWith(networkFirstStrategy(request));
  }
});

// ============================================================================
// ESTRATEGIAS DE CACHÉ
// ============================================================================

/**
 * Network First: Intenta red primero, fallback a caché si falla
 * Ideal para: APIs, contenido dinámico, HTML
 */
async function networkFirstStrategy(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    // Intentar obtener de la red
    const networkResponse = await fetch(request);

    // Si la respuesta es válida, guardarla en caché
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // Si la red falla, intentar obtener de caché
    console.log('[SW] Red no disponible, usando caché para:', request.url);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // Si tampoco está en caché, devolver página offline
    if (request.mode === 'navigate') {
      return cache.match('/index.html');
    }

    // Para otros recursos, devolver error
    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

/**
 * Cache First: Busca en caché primero, fallback a red
 * Ideal para: Assets estáticos, imágenes, fuentes, CSS, JS
 */
async function cacheFirstStrategy(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    // Devolver de caché inmediatamente
    // Actualizar en background (stale-while-revalidate)
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          cache.put(request, networkResponse);
        }
      })
      .catch(() => {
        // Ignorar errores de red en background
      });

    return cachedResponse;
  }

  // Si no está en caché, obtener de red y cachear
  try {
    const networkResponse = await fetch(request);

    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.error('[SW] Error obteniendo recurso:', request.url);
    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Determina si una URL es una petición a la API
 */
function isAPIRequest(url) {
  // Detectar rutas de microservicios (mismo dominio o externo)
  const apiPaths = ['/gastronomyMS/', '/authMS/', '/workshopMS/', '/reviewMS/', '/locationMS/'];
  const hasApiPath = apiPaths.some(path => url.pathname.includes(path));

  // Detectar backend en vps-master.duckdns.org
  const isVPSBackend = url.hostname.includes('vps-master.duckdns.org') && hasApiPath;

  // Detectar localhost backend (desarrollo)
  const isLocalBackend = (url.hostname === 'localhost' || url.hostname === '127.0.0.1') &&
                         (url.port === '5199' || url.port === '5357' || url.port === '5000' ||
                          url.port === '6061' || url.port === '5888');

  return hasApiPath || isVPSBackend || isLocalBackend;
}

/**
 * Determina si una URL es un asset estático
 */
function isStaticAsset(url) {
  const staticExtensions = ['.js', '.css', '.woff', '.woff2', '.ttf', '.eot', '.svg', '.ico'];
  return staticExtensions.some(ext => url.pathname.endsWith(ext)) ||
         url.pathname.includes('/assets/');
}

/**
 * Determina si una URL es un archivo multimedia
 */
function isMediaFile(url) {
  const mediaExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.webm', '.ogg'];
  return mediaExtensions.some(ext => url.pathname.endsWith(ext));
}

/**
 * CDNs de confianza que pueden ser cacheados
 */
function isTrustedCDN(url) {
  const trustedDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'unpkg.com',
    'cdn.jsdelivr.net',
    'images.unsplash.com', // Para las imágenes de placeholder
    'vps-master.duckdns.org' // Backend y archivos multimedia
  ];
  return trustedDomains.some(domain => url.hostname.includes(domain));
}

// ============================================================================
// MENSAJES
// ============================================================================
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CACHE_URLS') {
    // Permitir pre-cachear URLs específicas desde el cliente
    const urlsToCache = event.data.urls || [];
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(urlsToCache);
      })
    );
  }
});