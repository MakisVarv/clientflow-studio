from random import choice
from random import randint

from sqlalchemy import select

from app.common.faker import fake

from app.activities.model import (
    Activity,
    ActivityType,
)

from app.users.model import User
from app.companies.model import Company
from app.contacts.model import Contact
from app.leads.model import Lead
from app.deals.model import Deal


def seed_activities(db):

    if db.scalar(select(Activity)):
        print("Activities already seeded.")
        return

    users = db.scalars(select(User)).all()
    companies = db.scalars(select(Company)).all()
    contacts = db.scalars(select(Contact)).all()
    leads = db.scalars(select(Lead)).all()
    deals = db.scalars(select(Deal)).all()

    if not users or not companies:
        print("Users or Companies not found.")
        return

    activities = []

    for _ in range(100):

        activity = Activity(
            company_id=choice(companies).id,
            contact_id=choice(contacts).id if contacts else None,
            lead_id=choice(leads).id if leads else None,
            deal_id=choice(deals).id if deals else None,
            owner_id=choice(users).id,
            type=choice(list(ActivityType)),
            subject=fake.sentence(nb_words=4),
            description=fake.paragraph(),
            completed=choice([True, False]),
        )

        activities.append(activity)

    db.add_all(activities)

    db.commit()

    print(f"{len(activities)} Activities created.")
