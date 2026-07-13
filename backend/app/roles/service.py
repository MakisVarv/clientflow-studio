from app.roles.model import Role
from app.roles.repository import RoleRepository


class RoleService:

    def __init__(self, repository: RoleRepository):
        self.repository = repository

    def create_role(
        self,
        name: str,
        description: str | None = None,
    ) -> Role:

        if self.repository.exists(name):
            raise ValueError("Role already exists.")

        role = Role(
            name=name,
            description=description,
        )

        return self.repository.add(role)

    def get_roles(self):
        return self.repository.get_all()

    def get_role(self, role_id):

        role = self.repository.get_by_id(role_id)

        if role is None:
            raise ValueError("Role not found.")

        return role

    def update_role(
        self,
        role_id,
        name: str,
        description: str | None = None,
    ) -> Role:
        """
        Update an existing role.
        """

        role = self.get_role(role_id)

        role.name = name
        role.description = description

        return self.repository.update(role)

    def delete_role(self, role_id):

        role = self.get_role(role_id)

        self.repository.delete(role)
