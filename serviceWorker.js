// version 0.0.1

const CACHE_NAME = 'v0';

function putInCache(req, res) {
  return caches.open(CACHE_NAME).then((cache) => cache.put(req, res));
}

function checkCache(request, event) {
  return caches.match(request).then((cachedData) => {
    if (cachedData) return cachedData;

    return fetchData(request, event);
  });
}

function fetchData(request, event) {
  return fetch(request)
    .then((data) => {
      event.waitUntil(
        putInCache(request, data.clone()).catch((e) =>
          console.warn('Failed o put in cache:', e)
        )
      );
      return data;
    })
    .catch((err) => {
      console.warn('Fetch failed:', err);
      return new Response('Network error happened', {
        status: 408,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    });
}

self.addEventListener('install', (event) =>
  console.info('Service worker installed')
);

self.addEventListener('activate', (event) => {
  console.info('Service worker activated');
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.allSettled(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then((result) => console.info('Cache cleanup result:', result))
  );
});

self.addEventListener('fetch', function (event) {
  const url = event.request.url;
  const shouldBeCached =
    url.endsWith('.webp') ||
    url.endsWith('.png') ||
    url.endsWith('.css') ||
    url.endsWith('.html') ||
    url.endsWith('.js');
  const response = shouldBeCached
    ? checkCache(event.request, event)
    : fetchData(event.request, event);

  event.respondWith(response);
});
