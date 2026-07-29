from sqlalchemy import select

from app.roles.model import Role
from app.permissions.permission_model import Permission


def seed_role_permissions(db):

    admin = db.scalar(select(Role).where(Role.name == "Admin"))

    if not admin:
        print("Admin role not found.")
        return

    permissions = db.scalars(select(Permission)).all()

    for permission in permissions:
        if permission not in admin.permissions:
            admin.permissions.append(permission)

    db.commit()

    print("Admin permissions seeded.")
