import { io } from 'socket.io-client';

const SOCKET_URL =
  import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

export const notificationSocket = io(SOCKET_URL, {
  autoConnect: false,

  auth: (callback) => {
    callback({
      token: localStorage.getItem('access_token'),
    });
  },
});
