self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('wochenplaner-cache').then((cache) => cache.addAll([
            '/',
            '/index.html',
            '/styles.css',
            '/app.js',
            '/manifest.json',
            '/icon-192.png',
            '/icon-512.png'
        ]))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});