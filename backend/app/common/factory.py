from app.database.session import get_db
from app.users.repository import UserRepository
from app.users.service import UserService
from app.roles.repository import RoleRepository
from app.roles.service import RoleService


def get_user_service() -> UserService:
    """
    Create a UserService instance.
    """

    db = next(get_db())

    repository = UserRepository(db)

    return UserService(repository)


def get_role_service() -> RoleService:
    """
    Create a UserService instance.
    """

    db = next(get_db())

    repository = RoleRepository(db)

    return RoleService(repository)
