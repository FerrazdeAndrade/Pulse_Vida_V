const CACHE_NAME = 'pulse-vida-v6';

const urlsToCache = [
  './',
  './index.html',
  './login.html',
  './tela_cadastro.html',
  './aba_a.html',
  './aba_b.html',
  './aba_c.html',
  './aba_d.html',
  './Css/global.css',
  './Css/style.css',
  './Css/login.css'
];

// CACHE
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// ATIVAÇÃO (Limpa caches antigos)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// FETCH
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});

// 🔔 ===== EVENTO PUSH =====
self.addEventListener('push', event => {
  const dados = event.data?.json() ?? {
    title: 'PulseVida',
    body: 'Você tiene uma nova notificação!',
    icon: './icons/icon-192x192.png'
  };

  event.waitUntil(
    self.registration.showNotification(dados.title, {
      body: dados.body,
      icon: dados.icon,
      badge: './icons/icon-72x72.png'
    })
  );
});

// 🖱️ ===== CLIQUE NA NOTIFICAÇÃO =====
self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow('./index.html')
  );
});