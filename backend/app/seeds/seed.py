from app.database.session import SessionFactory
from app.seeds.permission_seed import seed_permissions
from app.seeds.role_seed import seed_roles
from app.seeds.role_permission_seed import seed_role_permissions
from app.seeds.user_seed import seed_users
from app.seeds.company_seed import seed_companies
from app.seeds.contact_seed import seed_contacts
from app.seeds.lead_seed import seed_leads
from app.seeds.deal_seed import seed_deals
from app.seeds.activity_seed import seed_activities


def run():
    db = SessionFactory()

    try:
        seed_permissions(db)
        seed_roles(db)
        seed_role_permissions(db)
        seed_users(db)
        seed_companies(db)
        seed_contacts(db)
        seed_leads(db)
        seed_deals(db)
        seed_activities(db)
    finally:
        db.close()


if __name__ == "__main__":
    run()
