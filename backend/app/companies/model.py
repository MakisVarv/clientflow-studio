from sqlalchemy import (
    Boolean,
    Integer,
    String,
    Text,
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship,
)

from app.database.baseModel import BaseModel


class Company(BaseModel):
    __tablename__ = "companies"

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
        index=True,
    )

    vat_number: Mapped[str | None] = mapped_column(
        String(20),
        unique=True,
    )

    email: Mapped[str | None] = mapped_column(
        String(120),
    )

    phone: Mapped[str | None] = mapped_column(
        String(30),
    )

    website: Mapped[str | None] = mapped_column(
        String(255),
    )

    industry: Mapped[str | None] = mapped_column(
        String(100),
    )

    employees_count: Mapped[int | None] = mapped_column(
        Integer,
    )

    country: Mapped[str | None] = mapped_column(
        String(100),
    )

    city: Mapped[str | None] = mapped_column(
        String(100),
    )

    address: Mapped[str | None] = mapped_column(
        String(255),
    )

    postal_code: Mapped[str | None] = mapped_column(
        String(20),
    )

    description: Mapped[str | None] = mapped_column(
        Text,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
    )

    # Relationships
    # contacts = relationship(
    #     "Contact",
    #     back_populates="company",
    #     cascade="all, delete-orphan",
    # )

    # leads = relationship(
    #     "Lead",
    #     back_populates="company",
    #     cascade="all, delete-orphan",
    # )

    # deals = relationship(
    #     "Deal",
    #     back_populates="company",
    #     cascade="all, delete-orphan",
    # )
