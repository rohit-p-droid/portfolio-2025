// Service Worker for performance optimization
const CACHE_NAME = 'portfolio-v1';
const STATIC_ASSETS = [
  '/',
  '/assets/rohit.jpg',
  '/assets/favicon.png',
  '/manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - Network first for API, Cache first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // API requests - network first with fallback
  if (request.url.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Clone response for cache
          const responseClone = response.clone();
          if (response.ok) {
            caches.open(CACHE_NAME)
              .then(cache => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request);
        })
    );
    return;
  }

  // Static assets - cache first
  if (request.destination === 'image' || 
      request.destination === 'style' || 
      request.destination === 'script') {
    event.respondWith(
      caches.match(request)
        .then(response => {
          return response || fetch(request);
        })
    );
    return;
  }

  // Default - network first
  event.respondWith(
    fetch(request)
      .catch(() => caches.match(request))
  );
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'portfolio-sync') {
    event.waitUntil(
      // Sync data when connection restored
      syncPortfolioData()
    );
  }
});

async function syncPortfolioData() {
  try {
    // Refresh cached portfolio data
    const apiEndpoints = [
      '/api/portfolio/hero-section',
      '/api/portfolio/about-section', 
      '/api/portfolio/skills',
      '/api/portfolio/experience',
      '/api/portfolio/certificates'
    ];

    await Promise.all(
      apiEndpoints.map(endpoint => 
        fetch(endpoint).then(response => {
          if (response.ok) {
            return caches.open(CACHE_NAME)
              .then(cache => cache.put(endpoint, response));
          }
        })
      )
    );
  } catch (error) {
    console.log('Sync failed:', error);
  }
}
