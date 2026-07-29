from random import randint, choice

from sqlalchemy import select

from app.common.faker import fake

from app.contacts.model import Contact
from app.companies.model import Company

POSITIONS = [
    "CEO",
    "Manager",
    "Sales Manager",
    "Sales Representative",
    "Marketing Director",
    "CTO",
    "Accountant",
]


def seed_contacts(db):

    companies = db.scalars(select(Company)).all()

    if not companies:
        return

    contacts = []

    for company in companies:

        total = randint(2, 5)

        primary_created = False

        for _ in range(total):

            contact = Contact(
                company_id=company.id,
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.unique.email(),
                phone=fake.phone_number(),
                mobile=fake.phone_number(),
                position=choice(POSITIONS),
                department="Sales",
                notes=fake.sentence(),
                is_primary=not primary_created,
                is_active=True,
            )

            primary_created = True

            contacts.append(contact)

    db.add_all(contacts)

    db.commit()

    print(f"{len(contacts)} contacts created.")
