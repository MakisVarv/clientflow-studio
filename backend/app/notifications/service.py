from app.extensions import socketio

from app.notifications.model import (
    Notification,
    NotificationType,
)

from app.notifications.schema import (
    notification_schema,
)


class NotificationService:

    def __init__(
        self,
        repository,
    ):

        self.repository = repository

    def get_notifications(
        self,
        user_id,
    ):

        return self.repository.get_by_user(user_id)

    def get_unread_notifications(
        self,
        user_id,
    ):

        return self.repository.get_unread_by_user(user_id)

    def get_unread_count(
        self,
        user_id,
    ) -> int:

        return self.repository.get_unread_count(user_id)

    def create_notification(
        self,
        user_id,
        title,
        message,
        notification_type=NotificationType.INFO,
    ):

        if isinstance(
            notification_type,
            str,
        ):
            notification_type = NotificationType(notification_type)

        notification = Notification(
            user_id=user_id,
            title=title,
            message=message,
            type=notification_type,
            is_read=False,
        )

        notification = self.repository.add(notification)

        data = notification_schema.dump(notification)

        socketio.emit(
            "notification:new",
            data,
            to=f"user:{user_id}",
        )

        return notification

    def mark_as_read(
        self,
        notification_id,
        user_id,
    ):

        notification = self.repository.mark_as_read(
            notification_id,
            user_id,
        )

        if notification is None:
            return None

        socketio.emit(
            "notification:read",
            {
                "id": str(notification.id),
            },
            to=f"user:{user_id}",
        )

        return notification

    def mark_as_unread(
        self,
        notification_id,
        user_id,
    ):

        notification = self.repository.mark_as_unread(
            notification_id,
            user_id,
        )

        if notification is None:
            return None

        socketio.emit(
            "notification:unread",
            {
                "id": str(notification.id),
            },
            to=f"user:{user_id}",
        )

        return notification

    def mark_all_as_read(
        self,
        user_id,
    ) -> int:

        updated_count = self.repository.mark_all_as_read(user_id)

        socketio.emit(
            "notification:all_read",
            {
                "updated_count": updated_count,
            },
            to=f"user:{user_id}",
        )

        return updated_count

    def delete_notification(
        self,
        notification_id,
        user_id,
    ) -> bool:

        deleted = self.repository.delete_for_user(
            notification_id,
            user_id,
        )

        if deleted:

            socketio.emit(
                "notification:deleted",
                {
                    "id": str(notification_id),
                },
                to=f"user:{user_id}",
            )

        return deleted
