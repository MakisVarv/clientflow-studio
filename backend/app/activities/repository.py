from sqlalchemy import or_
from sqlalchemy import select

from app.common.base_repository import BaseRepository
from app.activities.model import Activity
from app.activities.model import ActivityType


class ActivityRepository(BaseRepository):

    def __init__(self, db):
        super().__init__(db, Activity)

    def get_company_activities(self, company_id):

        stmt = select(Activity).where(Activity.company_id == company_id)

        return self.db.scalars(stmt).all()

    def get_contact_activities(self, contact_id):

        stmt = select(Activity).where(Activity.contact_id == contact_id)

        return self.db.scalars(stmt).all()

    def get_lead_activities(self, lead_id):

        stmt = select(Activity).where(Activity.lead_id == lead_id)

        return self.db.scalars(stmt).all()

    def get_deal_activities(self, deal_id):

        stmt = select(Activity).where(Activity.deal_id == deal_id)

        return self.db.scalars(stmt).all()

    def get_owner_activities(self, owner_id):

        stmt = select(Activity).where(Activity.owner_id == owner_id)

        return self.db.scalars(stmt).all()

    def get_by_type(self, activity_type: ActivityType):

        stmt = select(Activity).where(Activity.type == activity_type)

        return self.db.scalars(stmt).all()

    def get_completed(self):

        stmt = select(Activity).where(Activity.completed == True)

        return self.db.scalars(stmt).all()

    def get_pending(self):

        stmt = select(Activity).where(Activity.completed == False)

        return self.db.scalars(stmt).all()

    def search(self, search):

        stmt = select(Activity).where(
            or_(
                Activity.subject.ilike(f"%{search}%"),
                Activity.description.ilike(f"%{search}%"),
            )
        )

        return self.db.scalars(stmt).all()
