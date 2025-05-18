self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('static-v2').then(function(cache) { // Changed cache name
      console.log('Service Worker: Installing');
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/service-worker.js',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png',
        'https://via.placeholder.com/300/E91E63/FFFFFF?Text=Image+1',
        'https://via.placeholder.com/300/9C27B0/FFFFFF?Text=Image+2',
        'https://via.placeholder.com/3F51B5/FFFFFF?Text=Image+3',
        'https://via.placeholder.com/00BCD4/FFFFFF?Text=Image+4',
        'https://via.placeholder.com/4CAF50/FFFFFF?Text=Image+5',
        'https://via.placeholder.com/FF9800/FFFFFF?Text=Image+6',
        'https://via.placeholder.com/607D8B/FFFFFF?Text=Image+7',
        'https://via.placeholder.com/000000/FFFFFF?Text=Image+8',
        'https://via.placeholder.com/800/E91E63/FFFFFF?Text=Image+1+Full',
        'https://via.placeholder.com/800/9C27B0/FFFFFF?Text=Image+2+Full',
        'https://via.placeholder.com/800/3F51B5/FFFFFF?Text=Image+3+Full',
        'https://via.placeholder.com/800/00BCD4/FFFFFF?Text=Image+4+Full',
        'https://via.placeholder.com/800/4CAF50/FFFFFF?Text=Image+5+Full',
        'https://via.placeholder.com/800/FF9800/FFFFFF?Text=Image+6+Full',
        'https://via.placeholder.com/800/607D8B/FFFFFF?Text=Image+7+Full',
        'https://via.placeholder.com/800/000000/FFFFFF?Text=Image+8+Full'
      ]).then(() => console.log('Service Worker: Installed'));
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('Service Worker: Fetching', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Service Worker: Serving from cache');
        return response;
      }
      console.log('Service Worker: Fetching from network');
      return fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker: Activating');
  // Remove old caches
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== 'static-v2')
        .map(key => caches.delete(key))
      );
    })
  );
});