const staticCacheName = 'image-gallery-v3'; // Increment version to update cache
const filesToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    // Cache thumbnail images
    'https://via.placeholder.com/300/E91E63/FFFFFF?Text=Image+1',
    'https://via.placeholder.com/300/9C27B0/FFFFFF?Text=Image+2',
    'https://via.placeholder.com/300/3F51B5/FFFFFF?Text=Image+3',
    'https://via.placeholder.com/00BCD4/FFFFFF?Text=Image+4',
    'https://via.placeholder.com/4CAF50/FFFFFF?Text=Image+5',
    'https://via.placeholder.com/FF9800/FFFFFF?Text=Image+6',
    'https://via.placeholder.com/607D8B/FFFFFF?Text=Image+7',
    'https://via.placeholder.com/000000/FFFFFF?Text=Image+8',
    // Optionally cache full-size images (consider storage implications)
    'https://via.placeholder.com/800/E91E63/FFFFFF?Text=Image+1+Full',
    'https://via.placeholder.com/800/9C27B0/FFFFFF?Text=Image+2+Full',
    'https://via.placeholder.com/800/3F51B5/FFFFFF?Text=Image+3+Full',
    'https://via.placeholder.com/800/00BCD4/FFFFFF?Text=Image+4+Full',
    'https://via.placeholder.com/800/4CAF50/FFFFFF?Text=Image+5+Full',
    'https://via.placeholder.com/800/FF9800/FFFFFF?Text=Image+6+Full',
    'https://via.placeholder.com/800/607D8B/FFFFFF?Text=Image+7+Full',
    'https://via.placeholder.com/800/000000/FFFFFF?Text=Image+8+Full'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => cache.addAll(filesToCache))
            .then(() => self.skipWaiting()) // Activate immediately
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => cacheName !== staticCacheName)
                    .map(cacheName => caches.delete(cacheName)) // Delete old caches
            );
        }).then(() => self.clients.claim()) // Take control of all clients
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Serve from cache if available
                }
                return fetch(event.request); // Otherwise fetch from network
            })
    );
});
