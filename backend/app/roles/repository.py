from sqlalchemy import select

from app.common.base_repository import BaseRepository
from app.roles.model import Role


class RoleRepository(BaseRepository[Role]):

    def __init__(self, db):
        super().__init__(db, Role)

    def get_by_name(self, name: str) -> Role | None:

        stmt = select(Role).where(Role.name == name)

        return self.db.execute(stmt).scalar_one_or_none()

    def exists(self, name: str) -> bool:

        return self.get_by_name(name) is not None
