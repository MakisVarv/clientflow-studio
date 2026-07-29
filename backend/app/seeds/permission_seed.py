from sqlalchemy import select

from app.permissions.permission_model import Permission
from app.database.session import SessionFactory
import app.roles.model
import app.permissions.permission_model
import app.users.model

DEFAULT_PERMISSIONS = [
    "users.view",
    "users.create",
    "users.update",
    "users.delete",
    "roles.view",
    "roles.create",
    "roles.update",
    "roles.delete",
    "company.read",
    "company.create",
    "company.update",
    "company.delete",
    "contact.read",
    "contact.create",
    "contact.update",
    "contact.delete",
]


def seed_permissions(db):

    print("Starting permission seed...")

    for permission_name in DEFAULT_PERMISSIONS:

        print(permission_name)

        existing = db.scalar(
            select(Permission).where(Permission.name == permission_name)
        )

        if existing:
            print(f"{permission_name} already exists")
            continue

        print(f"Adding {permission_name}")

        db.add(
            Permission(
                name=permission_name,
            )
        )

    db.commit()

    print("Commit completed.")
