from sqlalchemy import select

from app.common.faker import fake
from app.companies.model import Company


def seed_companies(db, total: int = 50):

    existing = db.scalar(select(Company))

    if existing:
        print("Companies already seeded.")
        return

    companies = []

    for _ in range(total):

        company = Company(
            name=fake.company(),
            email=fake.company_email(),
            phone=fake.phone_number(),
            website=f"https://{fake.domain_name()}",
            address=fake.address(),
            city=fake.city(),
            postal_code=fake.postcode(),
            country="Greece",
            is_active=True,
        )

        companies.append(company)

    db.add_all(companies)

    db.commit()

    print(f"{len(companies)} companies created.")
