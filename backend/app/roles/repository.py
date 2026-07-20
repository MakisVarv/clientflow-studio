from sqlalchemy import select

from app.common.base_repository import BaseRepository
from app.roles.model import Role
from app.permissions.permission_model import Permission
from app.roles.model import Role


class RoleRepository(BaseRepository[Role]):

    def __init__(self, db):
        super().__init__(db, Role)

    def get_by_name(self, name: str) -> Role | None:

        stmt = select(Role).where(Role.name == name)

        return self.db.execute(stmt).scalar_one_or_none()

    def exists(self, name: str) -> bool:

        return self.get_by_name(name) is not None

    def assign_permissions(self, role_id, permission_ids):
        role = self.db.scalar(select(Role).where(Role.id == role_id))

        if role is None:
            return None

        permissions: list[Permission] = self.db.scalars(
            select(Permission).where(Permission.id.in_(permission_ids))
        ).all()  # type: ignore

        role.permissions = permissions

        self.db.commit()

        self.db.refresh(role)

        return role

    def delete(self, role_id):

        role = self.get_by_id(role_id)

        if role is None:
            return False

        self.db.delete(role)
        self.db.commit()

        return True
