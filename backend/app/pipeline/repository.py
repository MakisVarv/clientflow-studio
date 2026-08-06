from sqlalchemy import select

from app.leads.model import Lead
from app.leads.model import LeadStatus


class PipelineRepository:

    def __init__(self, db):

        self.db = db

    def get_pipeline(self):

        result = {}

        for status in LeadStatus:

            stmt = (
                select(Lead)
                .where(Lead.status == status)
                .order_by(Lead.created_at.desc())
            )

            result[status.value] = self.db.scalars(stmt).all()

        return result

    def get_lead(self, lead_id):

        stmt = select(Lead).where(Lead.id == lead_id)

        return self.db.scalar(stmt)

    def update(self, lead):

        self.db.commit()

        self.db.refresh(lead)

        return lead
