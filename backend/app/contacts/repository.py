from uuid import UUID

from sqlalchemy import select

from app.common.base_repository import BaseRepository
from app.contacts.model import Contact
from sqlalchemy import select, or_


class ContactRepository(BaseRepository[Contact]):

    def __init__(self, db):
        super().__init__(db, Contact)

    def get_company_contacts(
        self,
        company_id: UUID,
    ) -> list[Contact]:

        statement = (
            select(Contact)
            .where(Contact.company_id == company_id)
            .where(Contact.is_active.is_(True))
            .order_by(
                Contact.last_name,
                Contact.first_name,
            )
        )

        return list(self.db.scalars(statement).all())

    def get_by_email(
        self,
        email: str,
    ) -> Contact | None:

        statement = select(Contact).where(Contact.email == email)

        return self.db.scalar(statement)

    def email_exists(
        self,
        email: str,
    ) -> bool:

        return self.get_by_email(email) is not None

    def get_primary_contact(
        self,
        company_id: UUID,
    ) -> Contact | None:

        statement = (
            select(Contact)
            .where(Contact.company_id == company_id)
            .where(Contact.is_primary.is_(True))
        )

        return self.db.scalar(statement)

    def search(
        self,
        page: int = 1,
        size: int = 10,
        search: str | None = None,
    ):

        query = select(Contact)

        if search:
            query = query.where(
                or_(
                    Contact.first_name.ilike(f"%{search}%"),
                    Contact.last_name.ilike(f"%{search}%"),
                    Contact.email.ilike(f"%{search}%"),
                    Contact.phone.ilike(f"%{search}%"),
                    Contact.mobile.ilike(f"%{search}%"),
                    Contact.position.ilike(f"%{search}%"),
                )
            )

        query = query.offset((page - 1) * size).limit(size)

        return self.db.scalars(query).all()
