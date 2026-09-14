from app.companies.repository import CompanyRepository
from app.contacts.repository import ContactRepository
from app.leads.repository import LeadRepository
from app.deals.repository import DealRepository
from app.tasks.repository import TaskRepository
from app.activities.repository import ActivityRepository
from app.notes.repository import NoteRepository
from app.attachments.repository import AttachmentRepository


class SearchService:

    def __init__(
        self,
        company_repository,
        contact_repository,
        lead_repository,
        deal_repository,
        task_repository,
        activity_repository,
        note_repository,
        attachment_repository,
    ):

        self.company_repository = company_repository

        self.contact_repository = contact_repository

        self.lead_repository = lead_repository

        self.deal_repository = deal_repository

        self.task_repository = task_repository

        self.activity_repository = activity_repository

        self.note_repository = note_repository

        self.attachment_repository = attachment_repository

    def search(self, q):

        return {
            "companies": self.company_repository.search(q),
            "contacts": self.contact_repository.search(q),
            "leads": self.lead_repository.search(q),
            "deals": self.deal_repository.search(q),
            "tasks": self.task_repository.search(q),
            "activities": self.activity_repository.search(q),
            "notes": self.note_repository.search(q),
            "attachments": self.attachment_repository.search(q),
        }
