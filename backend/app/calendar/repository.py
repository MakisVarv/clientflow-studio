from datetime import date

from sqlalchemy import and_
from sqlalchemy import select

from app.calendar.model import CalendarEvent
from app.calendar.model import CalendarEventStatus
from app.calendar.model import CalendarEventType
from app.common.base_repository import BaseRepository
from sqlalchemy import and_
from sqlalchemy import or_
from sqlalchemy import select


class CalendarRepository(BaseRepository):

    def __init__(self, db):

        super().__init__(db, CalendarEvent)

    # -------------------------------------------------
    # Owner
    # -------------------------------------------------

    def get_owner_events(self, owner_id):

        stmt = (
            select(CalendarEvent)
            .where(CalendarEvent.owner_id == owner_id)
            .order_by(CalendarEvent.start_datetime)
        )

        return self.db.scalars(stmt).all()

    # -------------------------------------------------
    # Today
    # -------------------------------------------------

    def get_today_events(self, owner_id):

        today = date.today()

        stmt = (
            select(CalendarEvent)
            .where(
                and_(
                    CalendarEvent.owner_id == owner_id,
                    CalendarEvent.start_datetime >= today,
                    CalendarEvent.start_datetime < today.replace(day=today.day + 1),
                )
            )
            .order_by(CalendarEvent.start_datetime)
        )

        return self.db.scalars(stmt).all()

    # -------------------------------------------------
    # By Status
    # -------------------------------------------------

    def get_by_status(
        self,
        status: CalendarEventStatus,
    ):

        stmt = (
            select(CalendarEvent)
            .where(CalendarEvent.status == status)
            .order_by(CalendarEvent.start_datetime)
        )

        return self.db.scalars(stmt).all()

    # -------------------------------------------------
    # By Type
    # -------------------------------------------------

    def get_by_type(
        self,
        event_type: CalendarEventType,
    ):

        stmt = (
            select(CalendarEvent)
            .where(CalendarEvent.type == event_type)
            .order_by(CalendarEvent.start_datetime)
        )

        return self.db.scalars(stmt).all()

    # -------------------------------------------------
    # Company
    # -------------------------------------------------

    def get_company_events(self, company_id):

        stmt = (
            select(CalendarEvent)
            .where(CalendarEvent.company_id == company_id)
            .order_by(CalendarEvent.start_datetime)
        )

        return self.db.scalars(stmt).all()

    # -------------------------------------------------
    # Contact
    # -------------------------------------------------

    def get_contact_events(self, contact_id):

        stmt = (
            select(CalendarEvent)
            .where(CalendarEvent.contact_id == contact_id)
            .order_by(CalendarEvent.start_datetime)
        )

        return self.db.scalars(stmt).all()

    # -------------------------------------------------
    # Lead
    # -------------------------------------------------

    def get_lead_events(self, lead_id):

        stmt = (
            select(CalendarEvent)
            .where(CalendarEvent.lead_id == lead_id)
            .order_by(CalendarEvent.start_datetime)
        )

        return self.db.scalars(stmt).all()

    # -------------------------------------------------
    # Deal
    # -------------------------------------------------

    def get_deal_events(self, deal_id):

        stmt = (
            select(CalendarEvent)
            .where(CalendarEvent.deal_id == deal_id)
            .order_by(CalendarEvent.start_datetime)
        )

        return self.db.scalars(stmt).all()

    def has_overlap(
        self,
        owner_id,
        start_datetime,
        end_datetime,
        exclude_event_id=None,
    ):

        stmt = select(CalendarEvent).where(
            CalendarEvent.owner_id == owner_id,
            CalendarEvent.start_datetime < end_datetime,
            CalendarEvent.end_datetime > start_datetime,
        )

        if exclude_event_id:

            stmt = stmt.where(CalendarEvent.id != exclude_event_id)

        return self.db.scalar(stmt)
