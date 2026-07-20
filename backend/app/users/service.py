# type: ignore
import bcrypt
from app.users.model import User
from app.users.repository import UserRepository
from collections.abc import Sequence
from app.roles.repository import RoleRepository


class UserService:
    def __init__(
        self,
        user_repository: UserRepository,
        role_repository: RoleRepository,
    ):
        self.repository = user_repository
        self.role_repository = role_repository

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
        sort: str,
        search: str | None = None,
        active: bool | None = None,
        email: str | None = None,
    ):
        return self.repository.get_all(
            page=page, size=size, sort=sort, search=search, active=active, email=email
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

    def assign_role(
        self,
        user_id,
        role_id,
    ):
        user = self.repository.get_by_id(user_id)

        if user is None:
            raise ValueError("User not found.")

        role = self.role_repository.get_by_id(role_id)

        if role is None:
            raise ValueError("Role not found.")

        return self.repository.assign_role(
            user_id,
            role_id,
        )

    def has_permission(
        self,
        user_id,
        permission_name,
    ):

        user = self.repository.get_by_id(user_id)

        print("Inside has_permission")
        print("Role:", user.role)

        if user is None:
            return False

        if user.role is None:
            return False

        for permission in user.role.permissions:

            if permission.name == permission_name:
                return True

        return False

    def remove_role(self, user_id):

        user = self.repository.get_by_id(user_id)

        if user is None:
            raise ValueError("User not found.")

        return self.repository.remove_role(user_id)
