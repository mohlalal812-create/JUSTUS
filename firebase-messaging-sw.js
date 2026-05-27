// ── firebase-messaging-sw.js ─────────────────────────────────────────────
// Add this file to the ROOT of your GitHub repo (same folder as index.html)
// This enables push notifications even when the app is closed

importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:            "AIzaSyDUHVeaHIMRS8GxkFNEjVSXfUeKr_mQnp0",
  authDomain:        "just-you-n-i.firebaseapp.com",
  databaseURL:       "https://just-you-n-i-default-rtdb.firebaseio.com",
  projectId:         "just-you-n-i",
  storageBucket:     "just-you-n-i.firebasestorage.app",
  messagingSenderId: "340669970156",
  appId:             "1:340669970156:web:a717d9a97f52eb629e17c9",
});

const messaging = firebase.messaging();

// Handle background messages (app closed or in another tab)
messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title || 'New Message', {
    body:      body || 'You Have A New Message✉️',
    icon:      'https://via.placeholder.com/96/6366F1/ffffff?text=🔒',
    badge:     'https://via.placeholder.com/96/6366F1/ffffff?text=🔒',
    tag:       'private-room-msg',
    renotify:  true,
    vibrate:   [200, 100, 200, 100, 200],
    data:      payload.data,
  });
});

// When notification is clicked, open/focus the app
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type:'window', includeUncontrolled:true }).then(list => {
      for (const client of list) {
        if (client.url.includes(self.location.origin) && 'focus' in client)
          return client.focus();
      }
      return clients.openWindow('/');
    })
  );
});
