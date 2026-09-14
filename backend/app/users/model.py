import uuid
from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

from app.database.baseModel import BaseModel


class User(BaseModel):
    """Application user."""

    __tablename__ = "users"

    first_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    last_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        index=True,
        nullable=False,
    )

    password_hash: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    phone: Mapped[str | None] = mapped_column(
        String(30),
        nullable=True,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    is_verified: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    role_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("roles.id"),
        nullable=True,
    )

    role = relationship(
        "Role",
        back_populates="users",
    )

    leads = relationship(
        "Lead",
        back_populates="owner",
        cascade="all, delete-orphan",
    )
    deals = relationship(
        "Deal",
        back_populates="owner",
        cascade="all, delete-orphan",
    )
    activities = relationship(
        "Activity",
        back_populates="owner",
        cascade="all, delete-orphan",
    )
    tasks = relationship(
        "Task",
        back_populates="owner",
        cascade="all, delete-orphan",
    )
    owned_tasks = relationship(
        "Task",
        foreign_keys="Task.owner_id",
        back_populates="owner",
    )
    notifications = relationship(
        "Notification",
        back_populates="user",
        cascade="all, delete-orphan",
    )
    calendar_events = relationship(
        "CalendarEvent",
        back_populates="owner",
        cascade="all, delete-orphan",
    )
    notes = relationship(
        "Note",
        back_populates="owner",
        cascade="all, delete-orphan",
    )
    attachments = relationship(
        "Attachment",
        back_populates="owner",
        cascade="all, delete-orphan",
    )
