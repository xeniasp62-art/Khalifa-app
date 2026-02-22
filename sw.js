const CACHE_NAME = "arfa-koperasi-v3";
const urlsToCache = [
  "./",
  "./index.html",
  "./dashboard.html",
  "./anggota.html",
  "./kas.html",
  "./simpanan.html",
  "./pinjaman.html",
  "./angsuran.html",
  "./lap-kas.html",
  "./pencairan.html",
  "./backup.html",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});