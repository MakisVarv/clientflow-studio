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
    from app.users.model import User
    from app.companies.model import Company
    from app.leads.model import Lead


class DealStage(str, Enum):

    NEW = "NEW"

    QUALIFICATION = "QUALIFICATION"

    PROPOSAL = "PROPOSAL"

    NEGOTIATION = "NEGOTIATION"

    CONTRACT = "CONTRACT"

    WON = "WON"

    LOST = "LOST"


class Deal(BaseModel):

    __tablename__ = "deals"

    lead_id: Mapped[str] = mapped_column(ForeignKey("leads.id", ondelete="CASCADE"))

    company_id: Mapped[str] = mapped_column(
        ForeignKey("companies.id", ondelete="CASCADE")
    )

    owner_id: Mapped[str] = mapped_column(ForeignKey("users.id"))

    title: Mapped[str]

    value: Mapped[Decimal] = mapped_column(Numeric(12, 2))

    stage: Mapped[DealStage] = mapped_column(
        SQLEnum(DealStage),
        default=DealStage.NEW,
    )

    probability: Mapped[int] = mapped_column(
        default=0,
    )

    expected_close_date: Mapped[date | None]

    closed_date: Mapped[date | None]

    lost_reason: Mapped[str | None]

    notes: Mapped[str | None]

    is_active: Mapped[bool] = mapped_column(
        default=True,
    )

    lead = relationship(
        "Lead",
        back_populates="deals",
    )

    company = relationship(
        "Company",
        back_populates="deals",
    )

    owner = relationship(
        "User",
        back_populates="deals",
    )

    activities = relationship(
        "Activity",
        back_populates="deal",
        cascade="all, delete-orphan",
    )
