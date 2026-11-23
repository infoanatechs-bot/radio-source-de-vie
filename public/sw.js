self.addEventListener('install', () => {
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
  });
  
  self.addEventListener('fetch', () => {
    // Rien n'est mis en cache : le direct passe toujours par le réseau.
  });