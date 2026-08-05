from sqlalchemy import or_
from sqlalchemy import select

from app.common.base_repository import BaseRepository
from app.deals.model import Deal
from app.deals.model import DealStage


class DealRepository(BaseRepository):

    def __init__(self, db):
        super().__init__(db, Deal)

    def get_company_deals(self, company_id):

        stmt = select(Deal).where(Deal.company_id == company_id)

        return self.db.scalars(stmt).all()

    def get_owner_deals(self, owner_id):

        stmt = select(Deal).where(Deal.owner_id == owner_id)

        return self.db.scalars(stmt).all()

    def get_lead_deals(self, lead_id):

        stmt = select(Deal).where(Deal.lead_id == lead_id)

        return self.db.scalars(stmt).all()

    def get_by_stage(self, stage: DealStage):

        stmt = select(Deal).where(Deal.stage == stage)

        return self.db.scalars(stmt).all()

    def search(
        self,
        search: str,
    ):

        stmt = select(Deal).where(
            or_(
                Deal.title.ilike(f"%{search}%"),
                Deal.notes.ilike(f"%{search}%"),
            )
        )

        return self.db.scalars(stmt).all()
