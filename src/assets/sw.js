const CACHE = 'cache-and-update'

const assets = [
  './index.html',
  './client.css',
  './client.js',
  './vendor.js',
  './fonts/GoogleSans-Bold.ttf',
  './fonts/GoogleSans-BoldItalic.ttf',
  './fonts/GoogleSans-Italic.ttf',
  './fonts/GoogleSans-Medium.ttf',
  './fonts/GoogleSans-MediumItalic.ttf',
  './fonts/GoogleSans-Regular.ttf',
]

async function preCache() {
  const cache = await caches.open(CACHE)
  return cache.addAll(assets)
}

self.addEventListener('install', evt => {
  console.log('The service worker is being installed.')
  evt.waitUntil(preCache())
})

async function cacheOrNetwork(request) {
  const cache = await caches.open(CACHE)
  const response = await cache.match(request)
  return response || fetch(request)
}

async function update(request) {
  const cache = await caches.open(CACHE)
  const response = await fetch(request)
  if (!request.url.includes('http')) return
  return cache.put(request, response)
}

self.addEventListener('fetch', async e => {
  e.respondWith(cacheOrNetwork(e.request))
  e.waitUntil(update(e.request))
})
