from datetime import datetime
from datetime import timedelta
from random import choice
from random import randint

from sqlalchemy import select

from app.calendar.model import CalendarEvent
from app.calendar.model import CalendarEventStatus
from app.calendar.model import CalendarEventType

from app.companies.model import Company
from app.contacts.model import Contact
from app.deals.model import Deal
from app.leads.model import Lead
from app.users.model import User


def seed_calendar_events(db):

    if db.scalar(select(CalendarEvent)):

        print("Calendar events already seeded.")

        return

    users = db.scalars(select(User)).all()
    companies = db.scalars(select(Company)).all()
    contacts = db.scalars(select(Contact)).all()
    leads = db.scalars(select(Lead)).all()
    deals = db.scalars(select(Deal)).all()

    if not users:

        print("Users not found.")

        return

    titles = [
        "Microsoft Meeting",
        "Cisco Call",
        "Client Demo",
        "Follow Up",
        "Project Review",
        "Sales Presentation",
        "Weekly Meeting",
        "Customer Visit",
        "Planning Session",
        "Technical Discussion",
    ]

    locations = [
        "Microsoft Teams",
        "Google Meet",
        "Zoom",
        "Office",
        "Client Office",
        "Conference Room",
    ]

    colors = [
        "#2563EB",
        "#16A34A",
        "#DC2626",
        "#F59E0B",
        "#9333EA",
        "#0891B2",
    ]

    events = []

    for _ in range(100):

        start = datetime.now() + timedelta(
            days=randint(-15, 30),
            hours=randint(8, 18),
        )

        end = start + timedelta(minutes=choice([30, 60, 90, 120]))

        event = CalendarEvent(
            title=choice(titles),
            description="Automatically generated calendar event.",
            start_datetime=start,
            end_datetime=end,
            location=choice(locations),
            is_all_day=False,
            # color=choice(colors),
            type=choice(list(CalendarEventType)),
            status=choice(list(CalendarEventStatus)),
            owner_id=choice(users).id,
            company_id=choice(companies).id if companies else None,
            contact_id=choice(contacts).id if contacts else None,
            lead_id=choice(leads).id if leads else None,
            deal_id=choice(deals).id if deals else None,
        )

        events.append(event)

    db.add_all(events)

    db.commit()

    print(f"{len(events)} Calendar Events created.")
