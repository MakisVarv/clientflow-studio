from sqlalchemy import select

from app.permissions.permission_model import Permission

DEFAULT_PERMISSIONS = [
    "users.view",
    "users.create",
    "users.update",
    "users.delete",
    "roles.view",
    "roles.create",
    "roles.update",
    "roles.delete",
]


def seed_permissions(db):
    for permission_name in DEFAULT_PERMISSIONS:

        existing = db.scalar(
            select(Permission).where(Permission.name == permission_name)
        )

        if existing:
            continue

        permission = Permission(
            name=permission_name,
        )

        db.add(permission)

        db.commit()
