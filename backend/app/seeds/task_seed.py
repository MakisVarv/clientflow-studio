from random import choice
from random import randint

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

        completed = choice([True, False])

        task = Task(
            company_id=choice(companies).id,
            contact_id=choice(contacts).id if contacts else None,
            lead_id=choice(leads).id if leads else None,
            deal_id=choice(deals).id if deals else None,
            owner_id=choice(users).id,
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
