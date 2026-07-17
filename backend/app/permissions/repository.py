from sqlalchemy import select
from sqlalchemy.orm import Session


from app.permissions.permission_model import Permission


class PermissionRepository:

    def __init__(self, db: Session):
        self.db = db

    def get_all(self):
        return self.db.scalars(select(Permission)).all()

    def get_by_id(self, permission_id):
        return self.db.scalar(select(Permission).where(Permission.id == permission_id))

    def get_by_name(self, name):
        return self.db.scalar(select(Permission).where(Permission.name == name))

    def create(self, permission: Permission):
        self.db.add(permission)
        self.db.commit()
        self.db.refresh(permission)
        return permission
