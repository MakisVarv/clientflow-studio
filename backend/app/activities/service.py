# type: ignore
from app.activities.model import Activity
from app.activities.repository import ActivityRepository


class ActivityService:

    def __init__(self, repository: ActivityRepository):

        self.repository = repository

    def get_all(self):

        return self.repository.get_all()

    def get_by_id(self, activity_id):

        activity = self.repository.get_by_id(activity_id)

        if activity is None:
            raise ValueError("Activity not found.")

        return activity

    def create_activity(self, data):

        activity = Activity(**data)

        return self.repository.create(activity)

    def update_activity(
        self,
        activity_id,
        data,
    ):

        activity = self.get_by_id(activity_id)

        for key, value in data.items():
            setattr(activity, key, value)

        return self.repository.update(activity)

    def delete_activity(self, activity_id):

        activity = self.get_by_id(activity_id)

        self.repository.delete(activity)

    def get_company_activities(
        self,
        company_id,
    ):

        return self.repository.get_company_activities(company_id)

    def get_contact_activities(
        self,
        contact_id,
    ):

        return self.repository.get_contact_activities(contact_id)

    def get_lead_activities(
        self,
        lead_id,
    ):

        return self.repository.get_lead_activities(lead_id)

    def get_deal_activities(
        self,
        deal_id,
    ):

        return self.repository.get_deal_activities(deal_id)

    def get_owner_activities(
        self,
        owner_id,
    ):

        return self.repository.get_owner_activities(owner_id)

    def get_by_type(
        self,
        activity_type,
    ):

        return self.repository.get_by_type(activity_type)

    def get_completed(self):

        return self.repository.get_completed()

    def get_pending(self):

        return self.repository.get_pending()

    def search(
        self,
        search,
    ):

        return self.repository.search(search)
