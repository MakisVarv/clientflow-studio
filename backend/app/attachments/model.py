from __future__ import annotations

from typing import TYPE_CHECKING

from sqlalchemy import BigInteger
from sqlalchemy import ForeignKey
from sqlalchemy import String

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


class Attachment(BaseModel):

    __tablename__ = "attachments"

    original_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    stored_name: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
    )

    extension: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    mime_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    file_size: Mapped[int] = mapped_column(
        BigInteger,
        nullable=False,
    )

    file_path: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
    )

    is_public: Mapped[bool] = mapped_column(
        default=False,
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
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
        nullable=False,
    )

    company = relationship(
        "Company",
        back_populates="attachments",
    )

    contact = relationship(
        "Contact",
        back_populates="attachments",
    )

    lead = relationship(
        "Lead",
        back_populates="attachments",
    )

    deal = relationship(
        "Deal",
        back_populates="attachments",
    )

    owner = relationship(
        "User",
        back_populates="attachments",
    )
