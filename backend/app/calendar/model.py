from __future__ import annotations

from datetime import datetime
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


class CalendarEventType(str, Enum):

    MEETING = "MEETING"

    CALL = "CALL"

    DEMO = "DEMO"

    FOLLOW_UP = "FOLLOW_UP"

    REMINDER = "REMINDER"

    TASK = "TASK"


class CalendarEventStatus(str, Enum):

    SCHEDULED = "SCHEDULED"

    COMPLETED = "COMPLETED"

    CANCELLED = "CANCELLED"

    MISSED = "MISSED"


class CalendarEvent(BaseModel):

    __tablename__ = "calendar_events"

    title: Mapped[str]

    description: Mapped[str | None] = mapped_column(
        Text,
    )

    start_datetime: Mapped[datetime]

    end_datetime: Mapped[datetime]

    location: Mapped[str | None]

    is_all_day: Mapped[bool] = mapped_column(
        default=False,
    )

    type: Mapped[CalendarEventType] = mapped_column(
        SQLEnum(CalendarEventType),
        default=CalendarEventType.MEETING,
    )

    status: Mapped[CalendarEventStatus] = mapped_column(
        SQLEnum(CalendarEventStatus),
        default=CalendarEventStatus.SCHEDULED,
    )

    company_id: Mapped[str | None] = mapped_column(
        ForeignKey("companies.id"),
        nullable=True,
    )

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

    owner_id: Mapped[str] = mapped_column(
        ForeignKey("users.id"),
    )

    company = relationship(
        "Company",
        back_populates="calendar_events",
    )

    contact = relationship(
        "Contact",
        back_populates="calendar_events",
    )

    lead = relationship(
        "Lead",
        back_populates="calendar_events",
    )

    deal = relationship(
        "Deal",
        back_populates="calendar_events",
    )

    owner = relationship(
        "User",
        back_populates="calendar_events",
    )
