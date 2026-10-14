from __future__ import annotations

from enum import Enum
from typing import TYPE_CHECKING

from app.database.baseModel import BaseModel
from sqlalchemy import Enum as SQLEnum
from sqlalchemy import ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
    pass


class NotificationType(str, Enum):

    INFO = "INFO"

    SUCCESS = "SUCCESS"

    WARNING = "WARNING"

    ERROR = "ERROR"


class Notification(BaseModel):

    __tablename__ = "notifications"

    user_id: Mapped[str] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))

    title: Mapped[str]

    message: Mapped[str] = mapped_column(Text)

    type: Mapped[NotificationType] = mapped_column(
        SQLEnum(NotificationType),
        default=NotificationType.INFO,
    )

    is_read: Mapped[bool] = mapped_column(
        default=False,
    )

    user = relationship(
        "User",
        back_populates="notifications",
    )
