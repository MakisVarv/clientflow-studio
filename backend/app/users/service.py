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

    def get_users(
        self,
        page: int,
        size: int,
    ):
        return self.repository.get_all(
            page,
            size,
        )

    def get_user(self, user_id):
        """
        Return a single user by id.
        """

        user = self.repository.get_by_id(user_id)

        if user is None:
            raise ValueError("User not found.")

        return user

    def update_user(
        self,
        user_id,
        first_name,
        last_name,
        email,
        phone,
    ):
        """
        Update an existing user.
        """

        user = self.get_user(user_id)

        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.phone = phone

        return self.repository.update(user)

    def delete_user(self, user_id) -> None:
        """
        Delete an existing user.
        """

        user = self.get_user(user_id)

        self.repository.delete(user)
