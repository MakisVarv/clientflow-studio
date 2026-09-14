from random import choice

from sqlalchemy import select

from app.notes.model import Note

from app.users.model import User
from app.companies.model import Company
from app.contacts.model import Contact
from app.leads.model import Lead
from app.deals.model import Deal


def seed_notes(db):

    if db.scalar(select(Note)):

        print("Notes already seeded.")

        return

    users = db.scalars(select(User)).all()

    companies = db.scalars(select(Company)).all()

    contacts = db.scalars(select(Contact)).all()

    leads = db.scalars(select(Lead)).all()

    deals = db.scalars(select(Deal)).all()

    titles = [
        "First Meeting",
        "Customer Call",
        "Follow Up",
        "Technical Discussion",
        "Contract Review",
        "Presentation",
        "Customer Request",
        "Important",
        "Reminder",
        "Negotiation",
    ]

    contents = [
        "Customer is interested.",
        "Waiting for customer response.",
        "Need to schedule next meeting.",
        "Quotation has been sent.",
        "Contract under review.",
        "Customer requested more information.",
        "Demo completed successfully.",
        "Call again next week.",
        "Waiting for approval.",
        "Very important customer.",
    ]

    notes = []

    # Company Notes
    for company in companies:

        for _ in range(3):

            notes.append(
                Note(
                    title=choice(titles),
                    content=choice(contents),
                    company_id=company.id,
                    owner_id=choice(users).id,
                )
            )

    # Contact Notes
    for contact in contacts:

        for _ in range(2):

            notes.append(
                Note(
                    title=choice(titles),
                    content=choice(contents),
                    contact_id=contact.id,
                    owner_id=choice(users).id,
                )
            )

    # Lead Notes
    for lead in leads:

        for _ in range(3):

            notes.append(
                Note(
                    title=choice(titles),
                    content=choice(contents),
                    lead_id=lead.id,
                    owner_id=choice(users).id,
                )
            )

    # Deal Notes
    for deal in deals:

        for _ in range(3):

            notes.append(
                Note(
                    title=choice(titles),
                    content=choice(contents),
                    deal_id=deal.id,
                    owner_id=choice(users).id,
                )
            )

    db.add_all(notes)

    db.commit()

    print(f"{len(notes)} Notes created.")
