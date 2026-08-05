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
    from app.companies.model import Company
    from app.contacts.model import Contact
    from app.leads.model import Lead
    from app.deals.model import Deal


class ActivityType(str, Enum):

    CALL = "CALL"

    EMAIL = "EMAIL"

    MEETING = "MEETING"

    NOTE = "NOTE"

    TASK = "TASK"


class Activity(BaseModel):

    __tablename__ = "activities"

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

    type: Mapped[ActivityType] = mapped_column(SQLEnum(ActivityType))

    subject: Mapped[str]

    description: Mapped[str | None] = mapped_column(Text)

    completed: Mapped[bool] = mapped_column(
        default=False,
    )

    company = relationship(
        "Company",
        back_populates="activities",
    )

    contact = relationship(
        "Contact",
        back_populates="activities",
    )

    lead = relationship(
        "Lead",
        back_populates="activities",
    )

    deal = relationship(
        "Deal",
        back_populates="activities",
    )

    owner = relationship(
        "User",
        back_populates="activities",
    )
