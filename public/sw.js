// Service Worker pour Undercover PWA
// Caching strategy: Cache-First pour les assets statiques

const CACHE_NAME = 'undercover-v1';
const urlsToCache = [
    '/',
    '/game',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Cache opened');
            return cache.addAll(urlsToCache);
        })
    );
    // Force le nouveau SW à devenir actif immédiatement
    self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Prend le contrôle immédiatement
    return self.clients.claim();
});

// Stratégie de récupération: Cache-First avec Network Fallback
self.addEventListener('fetch', (event) => {
    // Ignorer les requêtes non-GET ou les requêtes vers des domaines externes (Supabase, etc.)
    if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((response) => {
            // Cache hit - retourner la réponse du cache
            if (response) {
                return response;
            }

            // Cloner la requête
            const fetchRequest = event.request.clone();

            return fetch(fetchRequest).then((response) => {
                // Vérifier si la réponse est valide
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                // Cloner la réponse
                const responseToCache = response.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            });
        })
    );
});
