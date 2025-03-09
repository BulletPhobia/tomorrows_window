const CACHE_NAME = 'tw-rpg-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/character.html',
  '/inventory.html',
  '/shop.html',
  '/map.html',
  '/journal.html',
  '/styles.css',
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.json'
];

// Install service worker and cache all content
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});