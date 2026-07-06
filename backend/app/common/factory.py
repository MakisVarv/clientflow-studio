from app.database.session import get_db
from app.users.repository import UserRepository
from app.users.service import UserService


def get_user_service() -> UserService:
    """
    Create a UserService instance.
    """

    db = next(get_db())

    repository = UserRepository(db)

    return UserService(repository)
