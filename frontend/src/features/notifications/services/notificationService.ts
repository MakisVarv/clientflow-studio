import api from '../../../api/axios';

import type {
  Notification,
  UnreadCountResponse,
  MarkAllReadResponse,
  DeleteNotificationResponse,
} from '../types/notification.types';

async function getNotifications(): Promise<Notification[]> {
  const response = await api.get<Notification[]>('/notifications');

  return response.data;
}

async function getUnreadNotifications(): Promise<Notification[]> {
  const response = await api.get<Notification[]>(
    '/notifications/unread',
  );

  return response.data;
}

async function getUnreadCount(): Promise<number> {
  const response = await api.get<UnreadCountResponse>(
    '/notifications/unread-count',
  );

  return response.data.count;
}

async function markAsRead(id: string): Promise<Notification> {
  const response = await api.put<Notification>(
    `/notifications/${id}/read`,
  );

  return response.data;
}

async function markAsUnread(id: string): Promise<Notification> {
  const response = await api.put<Notification>(
    `/notifications/${id}/unread`,
  );

  return response.data;
}

async function markAllAsRead(): Promise<MarkAllReadResponse> {
  const response = await api.put<MarkAllReadResponse>(
    '/notifications/read-all',
  );

  return response.data;
}

async function deleteNotification(
  id: string,
): Promise<DeleteNotificationResponse> {
  const response = await api.delete<DeleteNotificationResponse>(
    `/notifications/${id}`,
  );

  return response.data;
}

const notificationService = {
  getNotifications,

  getUnreadNotifications,

  getUnreadCount,

  markAsRead,

  markAsUnread,

  markAllAsRead,

  deleteNotification,
};

export default notificationService;
