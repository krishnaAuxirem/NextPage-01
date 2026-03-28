// Service Worker for offline reading
const CACHE_NAME = 'nextpage-offline-v1';
const CONTENT_CACHE = 'nextpage-content-v1';

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/src/main.tsx',
        '/src/index.css',
      ]);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== CONTENT_CACHE)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  // Only cache GET requests
  if (event.request.method !== 'GET') return;

  // Check if request is for content
  if (event.request.url.includes('/api/content/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then((response) => {
          // Cache the new content
          return caches.open(CONTENT_CACHE).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      }).catch(() => {
        // Return offline page or cached content
        return caches.match('/offline.html');
      })
    );
    return;
  }

  // Default fetch strategy
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Listen for messages to cache content
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_CONTENT') {
    const { url, content } = event.data;
    caches.open(CONTENT_CACHE).then((cache) => {
      const response = new Response(JSON.stringify(content));
      cache.put(url, response);
    });
  }

  if (event.data && event.data.type === 'REMOVE_CACHED_CONTENT') {
    const { url } = event.data;
    caches.open(CONTENT_CACHE).then((cache) => {
      cache.delete(url);
    });
  }
});
