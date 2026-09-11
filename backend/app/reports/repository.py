from sqlalchemy import func
from sqlalchemy import select

from app.activities.model import Activity
from app.calendar.model import CalendarEvent
from app.companies.model import Company
from app.contacts.model import Contact
from app.deals.model import Deal
from app.deals.model import DealStage
from app.leads.model import Lead
from app.leads.model import LeadStatus
from app.tasks.model import Task
from app.users.model import User


class ReportsRepository:

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

    def total_tasks(self):

        return self.db.scalar(select(func.count(Task.id)))

    def total_activities(self):

        return self.db.scalar(select(func.count(Activity.id)))

    def total_events(self):

        return self.db.scalar(select(func.count(CalendarEvent.id)))

    def total_users(self):

        return self.db.scalar(select(func.count(User.id)))

    def total_sales(self):

        return self.db.scalar(select(func.sum(Deal.value))) or 0

    def average_deal(self):

        return self.db.scalar(select(func.avg(Deal.value))) or 0

    def won_deals(self):

        return self.db.scalar(
            select(func.count(Deal.id)).where(Deal.stage == DealStage.WON)
        )

    def lost_deals(self):

        return self.db.scalar(
            select(func.count(Deal.id)).where(Deal.stage == DealStage.LOST)
        )

    def open_deals(self):

        return self.db.scalar(
            select(func.count(Deal.id)).where(
                Deal.stage != DealStage.WON,
                Deal.stage != DealStage.LOST,
            )
        )

    def leads_by_status(self):

        result = {}

        for status in LeadStatus:

            result[status.value] = self.db.scalar(
                select(func.count(Lead.id)).where(Lead.status == status)
            )

        return result

    def completed_tasks(self):

        return self.db.scalar(select(func.count(Task.id)).where(Task.completed == True))

    def pending_tasks(self):

        return self.db.scalar(
            select(func.count(Task.id)).where(Task.completed == False)
        )
