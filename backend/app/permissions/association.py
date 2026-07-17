from sqlalchemy import Table
from sqlalchemy import Column
from sqlalchemy import ForeignKey

from app.database.base import Base

role_permissions = Table(
    "role_permissions",
    Base.metadata,
    Column(
        "role_id",
        ForeignKey("roles.id"),
        primary_key=True,
    ),
    Column(
        "permission_id",
        ForeignKey("permissions.id"),
        primary_key=True,
    ),
)
