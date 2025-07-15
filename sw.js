// File: sw.js
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('todo-store').then(function (cache) {
      return cache.addAll([
        './',
        './index.html',
        './to_do.css',
        './to_do.js',
        './icon-192.png',
        './icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
