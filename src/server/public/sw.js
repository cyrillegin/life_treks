'use strict';

self.addEventListener('install', function (e) {
  console.log('installing');
  e.waitUntil(caches.open('cyrillegindreau').then(function (cache) {
    console.log('in cache');
    return cache.addAll(['/', '/index.html']);
  }));
});

self.addEventListener('fetch', function (event) {
  console.log(event.request.url);

  event.respondWith(caches.match(event.request).then(function (response) {
    console.log('coming back');
    return response || fetch(event.request);
  }));
});
