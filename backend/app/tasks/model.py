from __future__ import annotations

from datetime import date
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
    from app.companies.model import Company
    from app.contacts.model import Contact
    from app.leads.model import Lead
    from app.deals.model import Deal


class TaskStatus(str, Enum):

    TODO = "TODO"

    IN_PROGRESS = "IN_PROGRESS"

    COMPLETED = "COMPLETED"

    CANCELLED = "CANCELLED"


class TaskPriority(str, Enum):

    LOW = "LOW"

    MEDIUM = "MEDIUM"

    HIGH = "HIGH"

    URGENT = "URGENT"


class Task(BaseModel):

    __tablename__ = "tasks"

    company_id: Mapped[str] = mapped_column(ForeignKey("companies.id"))

    contact_id: Mapped[str | None] = mapped_column(
        ForeignKey("contacts.id"),
        nullable=True,
    )

    lead_id: Mapped[str | None] = mapped_column(
        ForeignKey("leads.id"),
        nullable=True,
    )

    deal_id: Mapped[str | None] = mapped_column(
        ForeignKey("deals.id"),
        nullable=True,
    )

    owner_id: Mapped[str] = mapped_column(ForeignKey("users.id"))

    title: Mapped[str]

    description: Mapped[str | None] = mapped_column(Text)

    due_date: Mapped[date | None]

    status: Mapped[TaskStatus] = mapped_column(
        SQLEnum(TaskStatus),
        default=TaskStatus.TODO,
    )

    priority: Mapped[TaskPriority] = mapped_column(
        SQLEnum(TaskPriority),
        default=TaskPriority.MEDIUM,
    )

    completed: Mapped[bool] = mapped_column(
        default=False,
    )

    company = relationship(
        "Company",
        back_populates="tasks",
    )

    contact = relationship(
        "Contact",
        back_populates="tasks",
    )

    lead = relationship(
        "Lead",
        back_populates="tasks",
    )

    deal = relationship(
        "Deal",
        back_populates="tasks",
    )

    owner = relationship(
        "User",
        back_populates="tasks",
    )

    completed_at: Mapped[date | None]
