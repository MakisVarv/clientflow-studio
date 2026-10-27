from typing import cast

from sqlalchemy import (
    select,
    func,
    update,
)
from sqlalchemy.engine import CursorResult

from app.common.base_repository import BaseRepository
from app.notifications.model import Notification


class NotificationRepository(BaseRepository[Notification]):

    def __init__(self, db):
        super().__init__(
            db,
            Notification,
        )

    def get_by_user(
        self,
        user_id,
    ):

        stmt = (
            select(Notification)
            .where(Notification.user_id == user_id)
            .order_by(Notification.created_at.desc())
        )

        return self.db.execute(stmt).scalars().all()

    def get_by_id_for_user(
        self,
        notification_id,
        user_id,
    ):

        stmt = select(Notification).where(
            Notification.id == notification_id,
            Notification.user_id == user_id,
        )

        return self.db.execute(stmt).scalar_one_or_none()

    def get_unread_by_user(
        self,
        user_id,
    ):

        stmt = (
            select(Notification)
            .where(
                Notification.user_id == user_id,
                Notification.is_read.is_(False),
            )
            .order_by(Notification.created_at.desc())
        )

        return self.db.execute(stmt).scalars().all()

    def get_unread_count(
        self,
        user_id,
    ) -> int:

        stmt = select(func.count(Notification.id)).where(
            Notification.user_id == user_id,
            Notification.is_read.is_(False),
        )

        return self.db.scalar(stmt) or 0

    def mark_as_read(
        self,
        notification_id,
        user_id,
    ):

        notification = self.get_by_id_for_user(
            notification_id,
            user_id,
        )

        if notification is None:
            return None

        notification.is_read = True

        self.db.commit()
        self.db.refresh(notification)

        return notification

    def mark_as_unread(
        self,
        notification_id,
        user_id,
    ):

        notification = self.get_by_id_for_user(
            notification_id,
            user_id,
        )

        if notification is None:
            return None

        notification.is_read = False

        self.db.commit()
        self.db.refresh(notification)

        return notification

    def mark_all_as_read(
        self,
        user_id,
    ) -> int:

        stmt = (
            update(Notification)
            .where(
                Notification.user_id == user_id,
                Notification.is_read.is_(False),
            )
            .values(is_read=True)
        )

        result = cast(CursorResult, self.db.execute(stmt))

        self.db.commit()

        return result.rowcount or 0

    def delete_for_user(
        self,
        notification_id,
        user_id,
    ) -> bool:

        notification = self.get_by_id_for_user(
            notification_id,
            user_id,
        )

        if notification is None:
            return False

        self.db.delete(notification)
        self.db.commit()

        return True
