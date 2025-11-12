// Service Worker simple - NO intercepta fetch requests
// Solo se registra para cumplir con requisitos de PWA

self.addEventListener('install', (event) => {
  console.log('Service Worker: Instalado');
  // Activar inmediatamente
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activado');
  // Tomar control inmediatamente
  event.waitUntil(self.clients.claim());
});

// NO manejamos fetch - dejamos que las peticiones pasen normalmente
// Si necesitas offline en el futuro, aquí es donde agregarías el evento fetch
