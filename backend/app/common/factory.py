from sqlalchemy.orm import Session

from app.roles.repository import RoleRepository
from app.roles.service import RoleService
from app.users.repository import UserRepository
from app.users.service import UserService


def get_user_service(db: Session) -> UserService:

    user_repository = UserRepository(db)

    role_repository = RoleRepository(db)

    return UserService(
        user_repository,
        role_repository,
    )


def get_role_service(db: Session) -> RoleService:

    repository = RoleRepository(db)

    return RoleService(repository)
