# type: ignore
from uuid import UUID


from app.leads.model import Lead
from app.leads.repository import LeadRepository


class LeadService:

    def __init__(
        self,
        repository: LeadRepository,
    ):
        self.repository = repository

    def get_all(self):

        return self.repository.get_all()

    def get_by_id(
        self,
        lead_id: UUID,
    ):

        return self.repository.get_by_id(lead_id)

    def get_company_leads(
        self,
        company_id: UUID,
    ):

        return self.repository.get_company_leads(company_id)

    def get_owner_leads(
        self,
        user_id: UUID,
    ):

        return self.repository.get_user_leads(user_id)

    def create_lead(
        self,
        **data,
    ):

        lead = Lead(**data)

        return self.repository.create(lead)

    def update_lead(
        self,
        lead_id: UUID,
        **data,
    ):

        lead = self.repository.get_by_id(lead_id)

        if not lead:
            raise ValueError("Lead not found.")

        for key, value in data.items():
            setattr(lead, key, value)

        return self.repository.update(lead)

    def delete(
        self,
        lead_id: UUID,
    ):

        lead = self.repository.get_by_id(lead_id)

        if not lead:
            raise ValueError("Lead not found.")

        return self.repository.delete(lead)

    def search_leads(
        self,
        page=1,
        size=10,
        search=None,
    ):

        return self.repository.search(
            page=page,
            size=size,
            search=search,
        )
