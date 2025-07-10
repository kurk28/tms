// version 0.0.1

function putInCache(req, res) {
  caches.open('v0').then((cache) => {
    return cache.put(req, res);
  });
}

function checkCache(event) {
  const { request } = event;
  return caches.match(request).then((cachedData) => {
    if (cachedData) return cachedData;

    return fetch(request)
      .then((data) => {
        event.waitUntil(putInCache(request, data.clone()));
        return data;
      })
      .catch((err) => {
        console.warn(err);
        return new Response('Network error happened', {
          status: 408,
          headers: {
            'Content-Type': 'text/plain',
          },
        });
      });
  });
}

self.addEventListener('install', (event) =>
  console.info('Service worker installed')
);
self.addEventListener('activate', (event) => {
  console.info('Service worker activated');
});
self.addEventListener('fetch', function (event) {
  if (event.request.url.endsWith('.webp')) event.respondWith(checkCache(event));
});
