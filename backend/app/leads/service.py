# type: ignore
from uuid import UUID

from app.leads.model import Lead, LeadStatus
from app.notifications.model import NotificationType
from app.notifications.service import NotificationService


class LeadService:

    def __init__(self, repository, notification_service=NotificationService):
        self.repository = repository
        self.notification_service = notification_service

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

    def create_lead(self, data):

        lead = Lead(**data)

        lead = self.repository.add(lead)

        self.notification_service.create_notification(
            user_id=lead.owner_id,
            title="New Lead Assigned",
            message=f'You are now responsible for lead "{lead.title}".',
            notification_type=NotificationType.INFO,
        )

        return lead

    def update_lead(
        self,
        lead_id,
        data,
    ):

        lead = self.repository.get_by_id(lead_id)

        if lead is None:
            return None

        old_status = lead.status

        for key, value in data.items():
            setattr(
                lead,
                key,
                value,
            )

        lead = self.repository.update(lead)

        if old_status != lead.status:

            if lead.status == LeadStatus.QUALIFIED:

                self.notification_service.create_notification(
                    user_id=lead.owner_id,
                    title="Lead Qualified",
                    message=f'Lead "{lead.title}" has been qualified.',
                    notification_type=NotificationType.SUCCESS,
                )

            elif lead.status == LeadStatus.WON:

                self.notification_service.create_notification(
                    user_id=lead.owner_id,
                    title="Lead Won",
                    message=f'Lead "{lead.title}" has been won.',
                    notification_type=NotificationType.SUCCESS,
                )

            elif lead.status == LeadStatus.LOST:

                self.notification_service.create_notification(
                    user_id=lead.owner_id,
                    title="Lead Lost",
                    message=f'Lead "{lead.title}" has been marked as lost.',
                    notification_type=NotificationType.ERROR,
                )

        return lead

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
