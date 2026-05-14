/**
 * 최소 PWA 서비스 워커 — Chrome 설치/standalone 판정에 fetch 핸들러가 필요할 때가 많습니다.
 * 네트워크는 그대로 통과시키고 캐시 전략은 두지 않습니다.
 */
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
