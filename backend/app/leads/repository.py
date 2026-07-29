from uuid import UUID

from sqlalchemy import select, or_

from app.common.base_repository import BaseRepository
from app.leads.model import Lead


class LeadRepository(BaseRepository[Lead]):

    def __init__(self, db):
        super().__init__(db, Lead)

    def get_company_leads(
        self,
        company_id: UUID,
    ) -> list[Lead]:

        statement = (
            select(Lead)
            .where(Lead.company_id == company_id)
            .where(Lead.is_active.is_(True))
        )

        return list(self.db.scalars(statement).all())

    def get_user_leads(
        self,
        user_id: UUID,
    ) -> list[Lead]:

        statement = (
            select(Lead).where(Lead.owner == user_id).where(Lead.is_active.is_(True))
        )

        return list(self.db.scalars(statement).all())

    def get_by_priority(self, priority) -> list[Lead]:

        statement = (
            select(Lead)
            .where(Lead.priority == priority)
            .where(Lead.is_active.is_(True))
        )
        return list(self.db.scalars(statement).all())

    def get_by_status(self, status) -> list[Lead]:

        statement = (
            select(Lead).where(Lead.status == status).where(Lead.is_active.is_(True))
        )
        return list(self.db.scalars(statement).all())

    def search(
        self,
        page: int = 1,
        size: int = 10,
        search: str | None = None,
    ):

        query = select(Lead)

        if search:
            query = query.where(
                or_(
                    Lead.contact.ilike(f"%{search}%"),
                    Lead.title.ilike(f"%{search}%"),
                    Lead.description.ilike(f"%{search}%"),
                )
            )

        query = query.offset((page - 1) * size).limit(size)

        return self.db.scalars(query).all()
