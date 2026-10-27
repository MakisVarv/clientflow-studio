import { notificationSocket } from './notificationSocket';

export function connectNotificationSocket() {
  if (!notificationSocket.connected) {
    notificationSocket.connect();
  }
}

export function disconnectNotificationSocket() {
  if (notificationSocket.connected) {
    notificationSocket.disconnect();
  }
}
notificationSocket.on('connect', () => {
  console.log('Socket connected:', notificationSocket.id);
});

notificationSocket.on('connect_error', (error) => {
  console.error('Socket error:', error.message);
});
