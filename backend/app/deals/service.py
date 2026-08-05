# type: ignore
from uuid import UUID


from app.deals.model import Deal
from app.deals.repository import DealRepository


class DealService:

    def __init__(
        self,
        repository: DealRepository,
    ):
        self.repository = repository

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
        **data,
    ):

        deal = Deal(**data)

        return self.repository.create(deal)

    def update_deal(
        self,
        deal_id: UUID,
        **data,
    ):

        deal = self.repository.get_by_id(deal_id)

        if not deal:
            raise ValueError("Deal not found.")

        for key, value in data.items():
            setattr(deal, key, value)

        return self.repository.update(deal)

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
