import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import authStorage from '../../auth/services/authStorage';

import { notificationSocket } from '../services/notificationSocket';

import { notificationKeys } from './useNotifications';

import type { Notification } from '../types/notification.types';

export function useNotificationSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = authStorage.getAccessToken();

    if (!token) {
      return;
    }

    if (!notificationSocket.connected) {
      notificationSocket.connect();
    }

    const handleConnect = () => {
      console.log(
        'Notification socket connected:',
        notificationSocket.id,
      );
    };

    const handleConnectError = (error: Error) => {
      console.error('Notification socket error:', error.message);
    };

    const handleNewNotification = (notification: Notification) => {
      queryClient.setQueryData<Notification[]>(
        notificationKeys.all,
        (oldNotifications = []) => {
          const exists = oldNotifications.some(
            (item) => item.id === notification.id,
          );

          if (exists) {
            return oldNotifications;
          }

          return [notification, ...oldNotifications];
        },
      );

      queryClient.setQueryData<Notification[]>(
        notificationKeys.unread,
        (oldNotifications = []) => {
          const exists = oldNotifications.some(
            (item) => item.id === notification.id,
          );

          if (exists) {
            return oldNotifications;
          }

          return [notification, ...oldNotifications];
        },
      );

      queryClient.setQueryData<number>(
        notificationKeys.unreadCount,
        (oldCount = 0) => oldCount + 1,
      );

      switch (notification.type) {
        case 'SUCCESS':
          toast.success(
            `${notification.title}: ${notification.message}`,
          );

          break;

        case 'ERROR':
          toast.error(
            `${notification.title}: ${notification.message}`,
          );

          break;

        case 'WARNING':
          toast(`${notification.title}: ${notification.message}`, {
            icon: '⚠️',
          });

          break;

        default:
          toast(`${notification.title}: ${notification.message}`, {
            icon: '🔔',
          });
      }
    };

    const handleRead = () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: notificationKeys.unread,
      });

      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount,
      });
    };

    const handleUnread = () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: notificationKeys.unread,
      });

      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount,
      });
    };

    const handleAllRead = () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.all,
      });

      queryClient.setQueryData(notificationKeys.unread, []);

      queryClient.setQueryData(notificationKeys.unreadCount, 0);
    };

    const handleDeleted = () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: notificationKeys.unread,
      });

      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount,
      });
    };

    notificationSocket.on('connect', handleConnect);

    notificationSocket.on('connect_error', handleConnectError);

    notificationSocket.on('notification:new', handleNewNotification);

    notificationSocket.on('notification:read', handleRead);

    notificationSocket.on('notification:unread', handleUnread);

    notificationSocket.on('notification:all_read', handleAllRead);

    notificationSocket.on('notification:deleted', handleDeleted);

    return () => {
      notificationSocket.off('connect', handleConnect);

      notificationSocket.off('connect_error', handleConnectError);

      notificationSocket.off(
        'notification:new',
        handleNewNotification,
      );

      notificationSocket.off('notification:read', handleRead);

      notificationSocket.off('notification:unread', handleUnread);

      notificationSocket.off('notification:all_read', handleAllRead);

      notificationSocket.off('notification:deleted', handleDeleted);
    };
  }, [queryClient]);
}
