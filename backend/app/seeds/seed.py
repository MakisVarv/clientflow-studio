from app.database.session import SessionFactory
from app.seeds.permission_seed import seed_permissions
from app.seeds.role_seed import seed_roles
from app.seeds.role_permission_seed import seed_role_permissions
from app.seeds.user_seed import seed_users
from app.seeds.company_seed import seed_companies
from app.seeds.contact_seed import seed_contacts


def run():
    db = SessionFactory()

    try:
        seed_permissions(db)
        seed_roles(db)
        seed_role_permissions(db)
        seed_users(db)
        seed_companies(db)
        seed_contacts(db)
    finally:
        db.close()


if __name__ == "__main__":
    run()
