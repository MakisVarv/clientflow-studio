# type: ignore
from uuid import UUID

from app.deals.model import Deal, DealStage
from app.notifications.model import NotificationType
from app.notifications.service import NotificationService


class DealService:

    def __init__(
        self,
        repository,
        notification_service=NotificationService,
    ):
        self.repository = repository
        self.notification_service = notification_service

    def get_all(self):

        return self.repository.get_all()

    def get_by_id(
        self,
        deal_id: UUID,
    ):

        return self.repository.get_by_id(deal_id)

    def get_company_deals(
        self,
        company_id: UUID,
    ):

        return self.repository.get_company_deals(company_id)

    def get_owner_deals(
        self,
        user_id: UUID,
    ):

        return self.repository.get_user_deals(user_id)

    def get_lead_deals(
        self,
        lead_id: UUID,
    ):

        return self.repository.get_lead_deals(lead_id)

    def create_deal(
        self,
        data,
    ):

        deal = Deal(**data)

        deal = self.repository.create(deal)

        if self.notification_service:

            self.notification_service.create_notification(
                user_id=deal.owner_id,
                title="New Deal Assigned",
                message=f'You are now responsible for deal "{deal.title}".',
                notification_type=NotificationType.INFO,
            )

        return deal

    def update_deal(
        self,
        deal_id,
        data,
    ):

        deal = self.repository.get_by_id(deal_id)

        if deal is None:
            return None

        old_stage = deal.stage

        for key, value in data.items():
            setattr(
                deal,
                key,
                value,
            )

        deal = self.repository.update(deal)

        if self.notification_service and old_stage != deal.stage:

            if deal.stage == DealStage.WON:

                self.notification_service.create_notification(
                    user_id=deal.owner_id,
                    title="Deal Won",
                    message=f'Deal "{deal.title}" has been won.',
                    notification_type=NotificationType.SUCCESS,
                )

            elif deal.stage == DealStage.LOST:

                self.notification_service.create_notification(
                    user_id=deal.owner_id,
                    title="Deal Lost",
                    message=f'Deal "{deal.title}" has been marked as lost.',
                    notification_type=NotificationType.ERROR,
                )

            elif deal.stage == DealStage.CONTRACT:

                self.notification_service.create_notification(
                    user_id=deal.owner_id,
                    title="Deal Contract Stage",
                    message=f'Deal "{deal.title}" moved to contract stage.',
                    notification_type=NotificationType.WARNING,
                )

        return deal

    def delete(
        self,
        deal_id: UUID,
    ):

        deal = self.repository.get_by_id(deal_id)

        if not deal:
            raise ValueError("Deal not found.")

        return self.repository.delete(deal)

    def search_deals(
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

    def get_by_stage(
        self,
        stage,
    ):

        return self.repository.get_by_stage(stage)
