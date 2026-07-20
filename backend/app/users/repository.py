from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
from app.common.base_repository import BaseRepository
from app.users.model import User
from sqlalchemy import asc, desc

from app.roles.model import Role


class UserRepository(BaseRepository[User]):

    def __init__(self, db):
        super().__init__(db, User)

    def get_by_email(self, email: str) -> User | None:
        stmt = select(User).where(User.email == email)
        return self.db.execute(stmt).scalar_one_or_none()

    def email_exists(self, email: str) -> bool:
        return self.get_by_email(email)  # type: ignore

    def get_all(self, page, size, sort, search=None, active=None, email=None):

        if sort.startswith("-"):

            column = getattr(
                User,
                sort[1:],
            )

            order = desc(column)

        else:

            column = getattr(
                User,
                sort,
            )

        order = asc(column)
        stmt = select(User).options(joinedload(User.role))

        if email:
            stmt = stmt.where(User.email == email)

        if active is not None:
            stmt = stmt.where(User.is_active == active)

        if search:
            stmt = stmt.where(User.first_name.ilike(f"%{search}%"))

        stmt = stmt.order_by(order).offset((page - 1) * size).limit(size)

        return self.db.execute(stmt).scalars().all()

    def get_by_id(self, user_id):

        stmt = (
            select(User)
            .options(joinedload(User.role).joinedload(Role.permissions))
            .where(User.id == user_id)
        )

        return self.db.execute(stmt).scalar_one_or_none()

    def assign_role(
        self,
        user_id,
        role_id,
    ):

        user = self.db.scalar(select(User).where(User.id == user_id))

        if user is None:
            return None

        role = self.db.scalar(select(Role).where(Role.id == role_id))

        if role is None:
            return None

        user.role = role

        self.db.commit()

        self.db.refresh(user)

        return user

    def remove_role(self, user_id):

        user = self.get_by_id(user_id)

        if user is None:
            return None

        user.role = None

        self.db.commit()
        self.db.refresh(user)

        return user
