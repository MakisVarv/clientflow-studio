import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import notificationService from '../services/notificationService';

export const notificationKeys = {
  all: ['notifications'] as const,

  unread: ['notifications', 'unread'] as const,

  unreadCount: ['notifications', 'unread-count'] as const,
};

export function useNotifications() {
  return useQuery({
    queryKey: notificationKeys.all,

    queryFn: notificationService.getNotifications,
  });
}

export function useUnreadNotifications() {
  return useQuery({
    queryKey: notificationKeys.unread,

    queryFn: notificationService.getUnreadNotifications,
  });
}

export function useUnreadCount() {
  return useQuery({
    queryKey: notificationKeys.unreadCount,

    queryFn: notificationService.getUnreadCount,
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationService.markAsRead(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: notificationKeys.unread,
      });

      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount,
      });
    },
  });
}

export function useMarkNotificationAsUnread() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationService.markAsUnread(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: notificationKeys.unread,
      });

      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount,
      });
    },
  });
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.markAllAsRead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: notificationKeys.unread,
      });

      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount,
      });
    },
  });
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      notificationService.deleteNotification(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: notificationKeys.unread,
      });

      queryClient.invalidateQueries({
        queryKey: notificationKeys.unreadCount,
      });
    },
  });
}
