from __future__ import annotations

from typing import TYPE_CHECKING

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


class Note(BaseModel):

    __tablename__ = "notes"

    title: Mapped[str]

    content: Mapped[str] = mapped_column(
        Text,
    )

    company_id: Mapped[str | None] = mapped_column(
        ForeignKey("companies.id", ondelete="CASCADE"),
        nullable=True,
    )

    contact_id: Mapped[str | None] = mapped_column(
        ForeignKey("contacts.id", ondelete="CASCADE"),
        nullable=True,
    )

    lead_id: Mapped[str | None] = mapped_column(
        ForeignKey("leads.id", ondelete="CASCADE"),
        nullable=True,
    )

    deal_id: Mapped[str | None] = mapped_column(
        ForeignKey("deals.id", ondelete="CASCADE"),
        nullable=True,
    )

    owner_id: Mapped[str] = mapped_column(
        ForeignKey("users.id"),
    )

    company = relationship(
        "Company",
        back_populates="notes",
    )

    contact = relationship(
        "Contact",
        back_populates="notes",
    )

    lead = relationship(
        "Lead",
        back_populates="notes",
    )

    deal = relationship(
        "Deal",
        back_populates="notes",
    )

    owner = relationship(
        "User",
        back_populates="notes",
    )

    is_pinned: Mapped[bool] = mapped_column(
        default=False,
    )
