from datetime import datetime

from app.calendar.model import CalendarEvent
from app.calendar.model import CalendarEventStatus
from app.calendar.model import CalendarEventType
from app.calendar.repository import CalendarRepository


class CalendarService:

    def __init__(self, repository: CalendarRepository):

        self.repository = repository

    # -------------------------------------------------
    # CRUD
    # -------------------------------------------------

    def get_all(self):

        return self.repository.get_all()

    def get_by_id(self, event_id):

        event = self.repository.get_by_id(event_id)

        if event is None:

            raise ValueError("Calendar event not found.")

        return event

    def create_event(self, data):

        self.validate_dates(data)

        overlap = self.repository.has_overlap(
            owner_id=data["owner_id"],
            start_datetime=data["start_datetime"],
            end_datetime=data["end_datetime"],
        )

        if overlap:

            raise ValueError("Another event already exists during this time.")

        event = CalendarEvent(**data)

        return self.repository.add(event)

    def update_event(
        self,
        event_id,
        data,
    ):

        event = self.get_by_id(event_id)

        if "start_datetime" in data or "end_datetime" in data:

            start = data.get(
                "start_datetime",
                event.start_datetime,
            )

            end = data.get(
                "end_datetime",
                event.end_datetime,
            )

            self.validate_dates(
                {
                    "start_datetime": start,
                    "end_datetime": end,
                }
            )

        overlap = self.repository.has_overlap(
            owner_id=event.owner_id,
            start_datetime=start,
            end_datetime=end,
            exclude_event_id=event.id,
        )

        if overlap:

            raise ValueError("Another event already exists during this time.")
        for key, value in data.items():

            setattr(event, key, value)

        return self.repository.update(event)

    def delete_event(self, event_id):

        event = self.get_by_id(event_id)

        self.repository.delete(event)

    # -------------------------------------------------
    # Filters
    # -------------------------------------------------

    def get_owner_events(self, owner_id):

        return self.repository.get_owner_events(owner_id)

    def get_today_events(self, owner_id):

        return self.repository.get_today_events(owner_id)

    def get_company_events(self, company_id):

        return self.repository.get_company_events(company_id)

    def get_contact_events(self, contact_id):

        return self.repository.get_contact_events(contact_id)

    def get_lead_events(self, lead_id):

        return self.repository.get_lead_events(lead_id)

    def get_deal_events(self, deal_id):

        return self.repository.get_deal_events(deal_id)

    def get_by_status(self, status):

        return self.repository.get_by_status(CalendarEventStatus(status))

    def get_by_type(self, event_type):

        return self.repository.get_by_type(CalendarEventType(event_type))

    # -------------------------------------------------
    # Business Rules
    # -------------------------------------------------

    def validate_dates(self, data):

        start = data.get("start_datetime")

        end = data.get("end_datetime")

        if start and end:

            if end <= start:

                raise ValueError("End datetime must be after start datetime.")

    def complete_event(self, event_id):

        event = self.get_by_id(event_id)

        if event.status == CalendarEventStatus.CANCELLED:

            raise ValueError("Cancelled event cannot be completed.")

        event.status = CalendarEventStatus.COMPLETED

        return self.repository.update(event)

    def cancel_event(self, event_id):

        event = self.get_by_id(event_id)

        if event.status == CalendarEventStatus.COMPLETED:

            raise ValueError("Completed event cannot be cancelled.")

        event.status = CalendarEventStatus.CANCELLED

        return self.repository.update(event)
