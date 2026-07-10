import bcrypt

from app.users.repository import UserRepository


class AuthService:

    def __init__(self, repository: UserRepository):
        self.repository = repository

    def login(
        self,
        email: str,
        password: str,
    ):

        user = self.repository.get_by_email(email)

        if user is None:
            raise ValueError("Invalid email or password.")

        password_ok = bcrypt.checkpw(
            password.encode("utf-8"),
            user.password_hash.encode("utf-8"),
        )

        if not password_ok:
            raise ValueError("Invalid email or password.")

        return user
