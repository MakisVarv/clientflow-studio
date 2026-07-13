from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
from app.common.base_repository import BaseRepository
from app.users.model import User


class UserRepository(BaseRepository[User]):

    def __init__(self, db):
        super().__init__(db, User)

    def get_by_email(self, email: str) -> User | None:
        stmt = select(User).where(User.email == email)
        return self.db.execute(stmt).scalar_one_or_none()

    def email_exists(self, email: str) -> bool:
        return self.get_by_email(email)

    def get_all(self, page, size):

        stmt = (
            select(User)
            .options(joinedload(User.role))
            .offset((page - 1) * size)
            .limit(size)
        )

        return self.db.execute(stmt).scalars().all()

    def get_by_id(self, user_id):

        stmt = select(User).options(joinedload(User.role)).where(User.id == user_id)

        return self.db.execute(stmt).scalar_one_or_none()
