// const CACHE_NAME = 'arroyo-seco-tourist-app-v1';
// const urlsToCache = [
//   '/',
//   '/index.html',
//   '/manifest.json',
//   '/vite.svg',
// ];

// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then((cache) => {
//         console.log('Cache abierto');
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// self.addEventListener('activate', (event) => {
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request)
//       .then((response) => {
//         if (response) {
//           return response;
//         }
//         return fetch(event.request).then(
//           (response) => {
//             if (!response || response.status !== 200 || response.type !== 'basic') {
//               return response;
//             }

//             const responseToCache = response.clone();

//             caches.open(CACHE_NAME)
//               .then((cache) => {
//                 cache.put(event.request, responseToCache);
//               });

//             return response;
//           }
//         );
//       })
//       .catch(() => {
//         if (event.request.mode === 'navigate') {
//           return caches.match('/offline.html');
//         }
//       })
//   );
// });

// self.addEventListener('message', (event) => {
//   if (event.data && event.data.type === 'SKIP_WAITING') {
//     self.skipWaiting();
//   }
// });

// self.addEventListener('sync', (event) => {
//   if (event.tag === 'sync-data') {
//     event.waitUntil(syncData());
//   }
// });

// async function syncData() {
//   console.log('Sincronizando datos en segundo plano');
// }