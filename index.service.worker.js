// Service worker « autodestruction » (09/11/2026) : l'appli n'en utilise plus.
// Une ancienne version installée sur un téléphone se met à jour vers ce fichier, vide sa mémoire,
// se désinstalle et recharge les pages ouvertes : le téléphone repart sur la version en ligne.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
	event.waitUntil((async () => {
		for (const k of await caches.keys()) await caches.delete(k);
		await self.registration.unregister();
		const pages = await self.clients.matchAll({ type: 'window' });
		for (const c of pages) c.navigate(c.url);
	})());
});
