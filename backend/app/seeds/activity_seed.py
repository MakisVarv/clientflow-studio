from random import choice

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

        # Επιλέγουμε πρώτα Company
        company = choice(companies)

        # Contacts της συγκεκριμένης Company
        company_contacts = [
            contact for contact in contacts if contact.company_id == company.id
        ]

        # Leads της συγκεκριμένης Company
        company_leads = [lead for lead in leads if lead.company_id == company.id]

        # Deals της συγκεκριμένης Company
        company_deals = [deal for deal in deals if deal.company_id == company.id]

        contact = choice(company_contacts) if company_contacts else None

        lead = choice(company_leads) if company_leads else None

        deal = choice(company_deals) if company_deals else None

        owner = choice(users)

        activity = Activity(
            company_id=company.id,
            contact_id=(contact.id if contact else None),
            lead_id=(lead.id if lead else None),
            deal_id=(deal.id if deal else None),
            owner_id=owner.id,
            type=choice(list(ActivityType)),
            subject=fake.sentence(nb_words=4),
            description=fake.paragraph(),
            completed=choice([True, False]),
        )

        activities.append(activity)

    db.add_all(activities)

    db.commit()

    print(f"{len(activities)} Activities created.")
