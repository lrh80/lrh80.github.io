self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('static-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css', // Make sure the path to your CSS file is correct
        '/script.js',  // Make sure the path to your JavaScript file is correct
        '/manifest.json', // It's good practice to cache your manifest
        '/service-worker.js', // The service worker itself isn't usually cached this way
        '/icons/icon-192x192.png', // Path to your 192x192 icon
        '/icons/icon-512x512.png', // Path to your 512x512 icon
        // Add the paths to ALL your thumbnail images here
        'https://via.placeholder.com/300/E91E63/FFFFFF?Text=Image+1',
        'https://via.placeholder.com/300/9C27B0/FFFFFF?Text=Image+2',
        'https://via.placeholder.com/300/3F51B5/FFFFFF?Text=Image+3',
        'https://via.placeholder.com/300/00BCD4/FFFFFF?Text=Image+4',
        'https://via.placeholder.com/300/4CAF50/FFFFFF?Text=Image+5',
        'https://via.placeholder.com/300/FF9800/FFFFFF?Text=Image+6',
        'https://via.placeholder.com/300/607D8B/FFFFFF?Text=Image+7',
        'https://via.placeholder.com/300/000000/FFFFFF?Text=Image+8',
        // Consider adding paths to your full-size images if you want offline viewing
        'https://via.placeholder.com/800/E91E63/FFFFFF?Text=Image+1+Full',
        'https://via.placeholder.com/800/9C27B0/FFFFFF?Text=Image+2+Full',
        'https://via.placeholder.com/800/3F51B5/FFFFFF?Text=Image+3+Full',
        'https://via.placeholder.com/800/00BCD4/FFFFFF?Text=Image+4+Full',
        'https://via.placeholder.com/800/4CAF50/FFFFFF?Text=Image+5+Full',
        'https://via.placeholder.com/800/FF9800/FFFFFF?Text=Image+6+Full',
        'https://via.placeholder.com/800/607D8B/FFFFFF?Text=Image+7+Full',
        'https://via.placeholder.com/800/000000/FFFFFF?Text=Image+8+Full'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});