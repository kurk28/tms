const CACHE_VERSION = '0.0.2';

function putInCache(req, res) {
  return caches.open(CACHE_VERSION).then((cache) => cache.put(req, res));
}

function fetchData(request) {
  return fetch(request)
    .then((data) => {
      putInCache(request, data.clone()).catch((e) =>
        console.warn('Failed to put in cache:', e)
      );
      return data;
    })
    .catch((err) => {
      console.warn('Fetch failed:', err);
      return caches.match(request).then((cachedData) => {
        if (cachedData) return cachedData;

        return new Response('Network error happened', {
          status: 408,
          headers: {
            'Content-Type': 'text/plain',
          },
        });
      });
    });
}

self.addEventListener('install', (event) => {
  console.info('Service worker installed');
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  console.info('Service worker activated');
  event.waitUntil(
    self.clients.claim().then(() =>
      caches
        .keys()
        .then((keys) =>
          Promise.allSettled(
            keys
              .filter((key) => key !== CACHE_VERSION)
              .map((key) => caches.delete(key))
          )
        )
        .then((result) => console.info('Cache cleanup result:', result))
    )
  );
});

self.addEventListener('fetch', function (event) {
  const url = event.request.url;
  const shouldBeCached = url.endsWith('.webp') || url.endsWith('.png');

  if (shouldBeCached) {
    event.respondWith(
      caches.match(event.request).then((cachedData) => {
        return cachedData ? cachedData : fetchData(event.request);
      })
    );
  } else {
    event.respondWith(fetchData(event.request));
  }
});
