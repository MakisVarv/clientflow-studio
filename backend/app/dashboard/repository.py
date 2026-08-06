from sqlalchemy import func
from sqlalchemy import select

from app.companies.model import Company
from app.contacts.model import Contact
from app.leads.model import Lead
from app.leads.model import LeadStatus
from app.deals.model import Deal
from app.deals.model import DealStage
from app.activities.model import Activity
from app.activities.model import ActivityType
from app.tasks.model import Task


class DashboardRepository:

    def __init__(self, db):

        self.db = db

    def total_companies(self):

        return self.db.scalar(select(func.count(Company.id)))

    def total_contacts(self):

        return self.db.scalar(select(func.count(Contact.id)))

    def total_leads(self):

        return self.db.scalar(select(func.count(Lead.id)))

    def total_deals(self):

        return self.db.scalar(select(func.count(Deal.id)))

    def total_activities(self):

        return self.db.scalar(select(func.count(Activity.id)))

    def total_tasks(self):

        return self.db.scalar(select(func.count(Task.id)))

    def completed_tasks(self):

        return self.db.scalar(select(func.count(Task.id)).where(Task.completed == True))

    def pending_tasks(self):

        return self.db.scalar(
            select(func.count(Task.id)).where(Task.completed == False)
        )

    def leads_by_status(self):

        result = {}

        for status in LeadStatus:

            total = self.db.scalar(
                select(func.count(Lead.id)).where(Lead.status == status)
            )

            result[status.value] = total

        return result

    def deals_by_stage(self):

        result = {}

        for stage in DealStage:

            total = self.db.scalar(
                select(func.count(Deal.id)).where(Deal.stage == stage)
            )

            result[stage.value] = total

        return result

    def activities_by_type(self):

        result = {}

        for activity in ActivityType:

            total = self.db.scalar(
                select(func.count(Activity.id)).where(Activity.type == activity)
            )

            result[activity.value] = total

            return result

    def total_sales(self):

        return self.db.scalar(select(func.sum(Deal.value))) or 0

    def average_deal(self):

        return self.db.scalar(select(func.avg(Deal.value))) or 0
