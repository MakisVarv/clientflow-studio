from random import choice
from random import randint
from decimal import Decimal

from sqlalchemy import select

from app.common.faker import fake

from app.leads.model import (
    Lead,
    LeadStatus,
    LeadPriority,
    LeadSource,
)

from app.users.model import User
from app.contacts.model import Contact
from app.companies.model import Company


def seed_leads(db):

    if db.scalar(select(Lead)):
        print("Leads already seeded.")
        return

    companies = db.scalars(select(Company)).all()

    users = db.scalars(select(User)).all()

    contacts = db.scalars(select(Contact)).all()

    leads = []

    for _ in range(50):

        company = choice(companies)

        contact = choice(contacts)

        owner = choice(users)

        lead = Lead(
            company_id=company.id,
            contact_id=contact.id,
            owner_id=owner.id,
            title=fake.catch_phrase(),
            description=fake.text(150),
            source=choice(list(LeadSource)),
            status=choice(list(LeadStatus)),
            priority=choice(list(LeadPriority)),
            estimated_value=Decimal(randint(500, 50000)),
            probability=randint(0, 100),
            expected_close_date=fake.date_between(
                start_date="today",
                end_date="+120d",
            ),
            is_active=True,
        )

        leads.append(lead)

    db.add_all(leads)

    db.commit()

    print(f"{len(leads)} Leads created.")
