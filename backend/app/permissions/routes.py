from flask import Blueprint
from flask import jsonify
from flask import request

from marshmallow import ValidationError

from app.permissions.repository import PermissionRepository
from app.permissions.schema import (
    create_permission_schema,
    permission_schema,
    permissions_schema,
)
from app.permissions.service import PermissionService
from app.core import db

permission_bp = Blueprint(
    "permissions",
    __name__,
    url_prefix="/permissions",
)


def get_service():

    repository = PermissionRepository(db.session)

    return PermissionService(repository)


@permission_bp.get("")
def get_permissions():

    service = get_service()

    permissions = service.get_permissions()

    return permissions_schema.dump(permissions), 200


@permission_bp.get("/<uuid:permission_id>")
def get_permission(permission_id):

    service = get_service()

    permission = service.get_permission(permission_id)

    return permission_schema.dump(permission), 200


@permission_bp.post("")
def create_permission():

    json_data = request.get_json()

    try:

        data = create_permission_schema.load(json_data)

    except ValidationError as err:

        return jsonify(err.messages), 400

    service = get_service()

    permission = service.create_permission(
        name=data["name"],
        description=data.get("description"),
    )

    return (
        permission_schema.dump(permission),
        201,
    )
