from random import choice

from sqlalchemy import select

from app.common.faker import fake

from app.tasks.model import (
    Task,
    TaskPriority,
    TaskStatus,
)

from app.users.model import User
from app.companies.model import Company
from app.contacts.model import Contact
from app.leads.model import Lead
from app.deals.model import Deal


def seed_tasks(db):

    if db.scalar(select(Task)):
        print("Tasks already seeded.")
        return

    users = db.scalars(select(User)).all()

    companies = db.scalars(select(Company)).all()

    contacts = db.scalars(select(Contact)).all()

    leads = db.scalars(select(Lead)).all()

    deals = db.scalars(select(Deal)).all()

    if not users or not companies:
        print("Users or Companies not found.")
        return

    tasks = []

    for _ in range(100):

        # -------------------------
        # COMPANY
        # -------------------------

        company = choice(companies)

        # -------------------------
        # CONTACTS ΤΗΣ COMPANY
        # -------------------------

        company_contacts = [
            contact for contact in contacts if contact.company_id == company.id
        ]

        # -------------------------
        # LEADS ΤΗΣ COMPANY
        # -------------------------

        company_leads = [lead for lead in leads if lead.company_id == company.id]

        # -------------------------
        # DEALS ΤΗΣ COMPANY
        # -------------------------

        company_deals = [deal for deal in deals if deal.company_id == company.id]

        # Επιλέγουμε μόνο αντικείμενα
        # που ανήκουν στην ίδια Company

        contact = choice(company_contacts) if company_contacts else None

        lead = choice(company_leads) if company_leads else None

        deal = choice(company_deals) if company_deals else None

        owner = choice(users)

        completed = choice([True, False])

        task = Task(
            company_id=company.id,
            contact_id=(contact.id if contact else None),
            lead_id=(lead.id if lead else None),
            deal_id=(deal.id if deal else None),
            owner_id=owner.id,
            title=fake.sentence(nb_words=4),
            description=fake.paragraph(),
            due_date=fake.date_between(
                start_date="-15d",
                end_date="+45d",
            ),
            completed_at=(
                fake.date_between(
                    start_date="-15d",
                    end_date="today",
                )
                if completed
                else None
            ),
            priority=choice(list(TaskPriority)),
            status=(
                TaskStatus.COMPLETED
                if completed
                else choice(
                    [
                        TaskStatus.TODO,
                        TaskStatus.IN_PROGRESS,
                    ]
                )
            ),
            completed=completed,
        )

        tasks.append(task)

    db.add_all(tasks)

    db.commit()

    print(f"{len(tasks)} Tasks created.")
