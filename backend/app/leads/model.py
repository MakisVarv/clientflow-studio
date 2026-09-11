from __future__ import annotations

from datetime import date
from decimal import Decimal
from enum import Enum
from typing import TYPE_CHECKING

from sqlalchemy import Enum as SQLEnum
from sqlalchemy import ForeignKey
from sqlalchemy import Numeric
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.database.baseModel import BaseModel

if TYPE_CHECKING:
    from app.companies.model import Company
    from app.contacts.model import Contact
    from app.users.model import User
    from app.deals.model import Deal


class LeadStatus(str, Enum):

    NEW = "NEW"

    CONTACTED = "CONTACTED"

    QUALIFIED = "QUALIFIED"

    PROPOSAL = "PROPOSAL"

    NEGOTIATION = "NEGOTIATION"

    WON = "WON"

    LOST = "LOST"


class LeadPriority(str, Enum):

    LOW = "LOW"

    MEDIUM = "MEDIUM"

    HIGH = "HIGH"

    URGENT = "URGENT"


class LeadSource(str, Enum):

    WEBSITE = "WEBSITE"

    FACEBOOK = "FACEBOOK"

    INSTAGRAM = "INSTAGRAM"

    GOOGLE = "GOOGLE"

    LINKEDIN = "LINKEDIN"

    EMAIL = "EMAIL"

    PHONE = "PHONE"

    REFERRAL = "REFERRAL"

    MANUAL = "MANUAL"


class Lead(BaseModel):

    __tablename__ = "leads"

    company_id: Mapped[str] = mapped_column(
        ForeignKey("companies.id", ondelete="CASCADE")
    )

    contact_id: Mapped[str | None] = mapped_column(
        ForeignKey("contacts.id", ondelete="SET NULL"),
        nullable=True,
    )

    owner_id: Mapped[str] = mapped_column(ForeignKey("users.id"))

    title: Mapped[str]

    description: Mapped[str | None]

    source: Mapped[LeadSource] = mapped_column(
        SQLEnum(LeadSource),
        default=LeadSource.MANUAL,
    )

    status: Mapped[LeadStatus] = mapped_column(
        SQLEnum(LeadStatus),
        default=LeadStatus.NEW,
    )

    priority: Mapped[LeadPriority] = mapped_column(
        SQLEnum(LeadPriority),
        default=LeadPriority.MEDIUM,
    )

    estimated_value: Mapped[Decimal | None] = mapped_column(
        Numeric(12, 2),
        nullable=True,
    )

    probability: Mapped[int] = mapped_column(
        default=0,
    )

    expected_close_date: Mapped[date | None]

    is_active: Mapped[bool] = mapped_column(
        default=True,
    )

    company: Mapped["Company"] = relationship(
        "Company",
        back_populates="leads",
    )

    contact: Mapped["Contact"] = relationship(
        "Contact",
        back_populates="leads",
    )

    owner: Mapped["User"] = relationship(
        "User",
        back_populates="leads",
    )
    deals: Mapped["Deal"] = relationship(
        "Deal",
        back_populates="lead",
    )
    activities = relationship(
        "Activity",
        back_populates="lead",
        cascade="all, delete-orphan",
    )
    tasks = relationship(
        "Task",
        back_populates="lead",
        cascade="all, delete-orphan",
    )
    calendar_events = relationship(
        "CalendarEvent",
        back_populates="lead",
        cascade="all, delete-orphan",
    )
    notes = relationship(
        "Note",
        back_populates="lead",
        cascade="all, delete-orphan",
    )
