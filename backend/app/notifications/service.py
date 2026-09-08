from app.notifications.model import Notification
from app.notifications.model import NotificationType
from app.notifications.repository import NotificationRepository


class NotificationService:

    def __init__(self, repository: NotificationRepository):

        self.repository = repository

    def get_all(self):

        return self.repository.get_all()

    def get_by_id(self, notification_id):

        notification = self.repository.get_by_id(notification_id)

        if notification is None:
            raise ValueError("Notification not found.")

        return notification

    def create_notification(self, data):

        notification = Notification(**data)

        return self.repository.add(notification)

    def delete_notification(self, notification_id):

        notification = self.get_by_id(notification_id)

        self.repository.delete(notification)

    def get_user_notifications(self, user_id):

        return self.repository.get_user_notifications(user_id)

    def get_unread_notifications(self, user_id):

        return self.repository.get_unread_notifications(user_id)

    def get_read_notifications(self, user_id):

        return self.repository.get_read_notifications(user_id)

    def get_unread_count(self, user_id):

        return self.repository.get_unread_count(user_id)

    def mark_as_read(self, notification_id):

        notification = self.get_by_id(notification_id)

        return self.repository.mark_as_read(notification)

    def mark_all_as_read(self, user_id):

        return self.repository.mark_all_as_read(user_id)

    def notify_info(
        self,
        user_id,
        title,
        message,
    ):

        notification = Notification(
            user_id=user_id,
            title=title,
            message=message,
            type=NotificationType.INFO,
        )

        return self.repository.add(notification)

    def notify_success(
        self,
        user_id,
        title,
        message,
    ):

        notification = Notification(
            user_id=user_id,
            title=title,
            message=message,
            type=NotificationType.SUCCESS,
        )

        return self.repository.add(notification)

    def notify_warning(
        self,
        user_id,
        title,
        message,
    ):

        notification = Notification(
            user_id=user_id,
            title=title,
            message=message,
            type=NotificationType.WARNING,
        )

        return self.repository.add(notification)

    def notify_error(
        self,
        user_id,
        title,
        message,
    ):

        notification = Notification(
            user_id=user_id,
            title=title,
            message=message,
            type=NotificationType.ERROR,
        )

        return self.repository.add(notification)
