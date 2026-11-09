/* Permite instalar Pulso en el celular. Guarda solo la página y el logo; la lista de
   personas siempre se pide en vivo (nunca se queda vieja). */
const CACHE = 'pulso-inicio-v1';
const BASE = ['./', 'index.html', 'config.js', 'manifest.webmanifest', 'img/icono-192.png', 'img/logo.svg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return; // Apps Script: siempre en vivo
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request)));
});
