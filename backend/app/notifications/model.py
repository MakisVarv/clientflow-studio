from __future__ import annotations

from enum import Enum
from typing import TYPE_CHECKING

from sqlalchemy import Enum as SQLEnum
from sqlalchemy import ForeignKey
from sqlalchemy import Text

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.database.baseModel import BaseModel

if TYPE_CHECKING:
    from app.users.model import User


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
