self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('honey-app-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/honey.png',
          '/simone.png',
          '/manifest.json'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  