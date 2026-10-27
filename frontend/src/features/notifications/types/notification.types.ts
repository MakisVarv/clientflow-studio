export type NotificationType =
  | 'INFO'
  | 'SUCCESS'
  | 'WARNING'
  | 'ERROR';

export type Notification = {
  id: string;

  user_id: string;

  title: string;

  message: string;

  type: NotificationType;

  is_read: boolean;

  created_at: string;

  updated_at: string;
};

export type UnreadCountResponse = {
  count: number;
};

export type MarkAllReadResponse = {
  message: string;
  updated_count: number;
};

export type DeleteNotificationResponse = {
  message: string;
};
