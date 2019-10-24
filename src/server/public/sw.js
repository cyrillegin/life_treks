self.addEventListener('install', e => {
  console.info('installing');
  e.waitUntil(
    caches.open('cyrillegindreau').then(cache => {
      console.info('in cache');
      return cache.addAll(['/', '/index.html']);
    }),
  );
});

self.addEventListener('fetch', event => {
  console.info(event.request.url);

  event.respondWith(
    caches.match(event.request).then(response => {
      console.info('coming back');
      return response || fetch(event.request);
    }),
  );
});
