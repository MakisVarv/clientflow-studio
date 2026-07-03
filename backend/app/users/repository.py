from app.common.base_repository import BaseRepository
from app.users.model import User


class UserRepository(BaseRepository[User]):

    def __init__(self, db):
        super().__init__(db, User)

    def get_by_email(self, email: str) -> User | None:
        return self.db.query(User).filter(User.email == email).first()

    def email_exists(self, email: str) -> bool:
        return self.get_by_email(email) is not None
