from app.leads.model import LeadStatus
from app.pipeline.repository import PipelineRepository


class PipelineService:

    def __init__(self, repository: PipelineRepository):

        self.repository = repository

    def get_pipeline(self):

        return self.repository.get_pipeline()

    def move_lead(
        self,
        lead_id,
        status,
    ):

        lead = self.repository.get_lead(lead_id)

        if lead is None:
            raise ValueError("Lead not found.")

        try:

            new_status = LeadStatus(status)

        except ValueError:

            raise ValueError("Invalid Lead Status.")

        lead.status = new_status

        return self.repository.update(lead)
