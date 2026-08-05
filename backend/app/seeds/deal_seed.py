from decimal import Decimal
from random import choice
from random import randint

from sqlalchemy import select

from app.common.faker import fake

from app.deals.model import Deal
from app.deals.model import DealStage

from app.users.model import User
from app.leads.model import Lead


def seed_deals(db):

    if db.scalar(select(Deal)):
        print("Deals already seeded.")
        return

    users = db.scalars(select(User)).all()

    leads = db.scalars(select(Lead)).all()

    if not users or not leads:
        print("Users or Leads not found.")
        return

    deals = []

    for lead in leads:

        if randint(1, 100) > 40:
            continue

        owner = choice(users)

        deal = Deal(
            lead_id=lead.id,
            company_id=lead.company_id,
            owner_id=owner.id,
            title=lead.title,
            value=Decimal(randint(1000, 50000)),
            stage=choice(list(DealStage)),
            probability=randint(10, 100),
            expected_close_date=fake.date_between(
                start_date="today",
                end_date="+120d",
            ),
            notes=fake.sentence(),
            is_active=True,
        )

        deals.append(deal)

    db.add_all(deals)

    db.commit()

    print(f"{len(deals)} Deals created.")
