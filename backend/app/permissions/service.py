from app.permissions.repository import PermissionRepository
from app.permissions.permission_model import Permission


class PermissionService:

    def __init__(
        self,
        repository: PermissionRepository,
    ):
        self.repository = repository

    def get_permissions(self):
        return self.repository.get_all()

    def get_permission(self, permission_id):

        permission = self.repository.get_by_id(permission_id)

        if permission is None:
            raise ValueError("Permission not found.")

        return permission

    def create_permission(
        self,
        name: str,
        description: str | None = None,
    ):

        existing = self.repository.get_by_name(name)

        if existing:
            raise ValueError("Permission already exists.")

        permission = Permission(
            name=name,
            description=description,
        )

        return self.repository.create(permission)
