import bcrypt
from app.users.model import User
from app.users.repository import UserRepository
from collections.abc import Sequence


class UserService:
    def __init__(self, repository: UserRepository):
        self.repository = repository

    def register_user(
        self,
        first_name: str,
        last_name: str,
        email: str,
        password: str,
        phone: str | None = None,
    ) -> User:

        if self.repository.email_exists(email):
            raise ValueError("Email already exists.")

        password_hash = bcrypt.hashpw(
            password.encode("utf-8"),
            bcrypt.gensalt(),
        ).decode("utf-8")

        user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password_hash=password_hash,
            phone=phone,
        )

        return self.repository.add(user)

    def get_users(self) -> Sequence[User]:
        """
        Return all users.
        """
        return self.repository.get_all()
