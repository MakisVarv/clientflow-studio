from sqlalchemy import select

from app.common.base_repository import BaseRepository
from app.notifications.model import Notification


class NotificationRepository(BaseRepository):

    def __init__(self, db):

        super().__init__(db, Notification)

    def get_user_notifications(self, user_id):

        stmt = (
            select(Notification)
            .where(Notification.user_id == user_id)
            .order_by(Notification.created_at.desc())
        )

        return self.db.scalars(stmt).all()

    def get_unread_notifications(self, user_id):

        stmt = (
            select(Notification)
            .where(
                Notification.user_id == user_id,
                Notification.is_read == False,
            )
            .order_by(Notification.created_at.desc())
        )

        return self.db.scalars(stmt).all()

    def get_read_notifications(self, user_id):

        stmt = (
            select(Notification)
            .where(
                Notification.user_id == user_id,
                Notification.is_read == True,
            )
            .order_by(Notification.created_at.desc())
        )

        return self.db.scalars(stmt).all()

    def get_unread_count(self, user_id):

        notifications = self.get_unread_notifications(user_id)

        return len(notifications)

    def mark_as_read(self, notification):

        notification.is_read = True

        self.db.commit()

        self.db.refresh(notification)

        return notification

    def mark_all_as_read(self, user_id):

        notifications = self.get_unread_notifications(user_id)

        for notification in notifications:

            notification.is_read = True

        self.db.commit()

        return notifications
